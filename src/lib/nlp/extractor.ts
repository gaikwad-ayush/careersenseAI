import { SKILL_TAXONOMY, normalizeSkill } from "./taxonomy";
import { IExtractedSkill, IWeakBulletPoint } from "../db/models/ResumeAnalysis";

export interface ExtractedResumeData {
  rawText: string;
  contactInfo: {
    name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  sectionBreakdown: {
    contact: boolean;
    education: boolean;
    skills: boolean;
    experience: boolean;
    projects: boolean;
    certifications: boolean;
  };
  extractedSkills: IExtractedSkill[];
  normalizedSkills: string[];
  weakBulletPoints: IWeakBulletPoint[];
  atsRecommendations: string[];
  completenessScore: number;
}

const WEAK_VERB_PATTERNS = [
  /^(responsible for|worked on|helped with|assisted in|tasked with|handled|was involved in|participated in)\b/i,
  /^(did|made|managed stuff|worked with|supported)\b/i,
];

const METRIC_PATTERNS = /\b(\d+%\s*|\d+x\s*|\$\d+|\d+\s*users|\d+\s*ms|\d+\s*req|\d+\s*(gb|mb|tb)|\d+\+?\s*(projects|services|apis|tests))\b/i;

export function extractContactInfo(text: string) {
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
  const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+/i);

  // Extract top line or first non-empty line as likely name if under 5 words
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  let likelyName: string | undefined;
  if (lines.length > 0 && lines[0].split(/\s+/).length <= 4 && !lines[0].includes("@")) {
    likelyName = lines[0];
  }

  return {
    name: likelyName,
    email: emailMatch ? emailMatch[0] : undefined,
    phone: phoneMatch ? phoneMatch[0] : undefined,
    linkedin: linkedinMatch ? linkedinMatch[0] : undefined,
    github: githubMatch ? githubMatch[0] : undefined,
  };
}

export function detectSections(text: string) {
  const lower = text.toLowerCase();
  return {
    contact: Boolean(lower.includes("@") || lower.match(/\b(phone|email|linkedin|github)\b/)),
    education: Boolean(lower.match(/\b(education|university|college|b\.tech|bachelor|master|degree|gpa|cgpa)\b/)),
    skills: Boolean(lower.match(/\b(skills|technical skills|technologies|proficiencies|tech stack)\b/)),
    experience: Boolean(lower.match(/\b(experience|work experience|employment|internship|professional experience)\b/)),
    projects: Boolean(lower.match(/\b(projects|academic projects|personal projects|key projects)\b/)),
    certifications: Boolean(lower.match(/\b(certifications|certificates|courses|licenses)\b/)),
  };
}

export function extractSkillsFromText(text: string): {
  extracted: IExtractedSkill[];
  normalized: string[];
} {
  const extractedMap = new Map<string, IExtractedSkill>();

  // Scan through taxonomy
  for (const item of SKILL_TAXONOMY) {
    // Check canonical name
    const canonicalRegex = new RegExp(`\\b${escapeRegExp(item.canonical.toLowerCase())}\\b`, "i");
    let matched = canonicalRegex.test(text);

    if (!matched) {
      // Check synonyms
      for (const syn of item.synonyms) {
        // Special case for c++ or c#
        let pattern: RegExp;
        if (syn === "c++") {
          pattern = /(?:^|\s|\/|\()c\+\+(?:$|\s|\/|\)|,)/i;
        } else if (syn === "c#") {
          pattern = /(?:^|\s|\/|\()c#(?:$|\s|\/|\)|,)/i;
        } else {
          pattern = new RegExp(`\\b${escapeRegExp(syn)}\\b`, "i");
        }

        if (pattern.test(text)) {
          matched = true;
          break;
        }
      }
    }

    if (matched) {
      extractedMap.set(item.canonical, {
        name: item.canonical,
        category: item.category,
        source: "explicit",
        confidence: 1.0,
      });

      // Add inferred related skills with lower confidence if not explicit
      if (item.relatedSkills) {
        for (const rel of item.relatedSkills) {
          const relSkill = normalizeSkill(rel);
          if (relSkill && !extractedMap.has(relSkill.canonical)) {
            // Check if implicit
            extractedMap.set(relSkill.canonical, {
              name: relSkill.canonical,
              category: relSkill.category,
              source: "inferred",
              confidence: 0.7,
            });
          }
        }
      }
    }
  }

  const extracted = Array.from(extractedMap.values());
  const normalized = extracted.map((s) => s.name);
  return { extracted, normalized };
}

export function analyzeBulletPoints(text: string): IWeakBulletPoint[] {
  const lines = text.split("\n").map((l) => l.trim());
  const weakBullets: IWeakBulletPoint[] = [];

  for (const line of lines) {
    // Match lines starting with bullet indicators or dashes
    const cleanLine = line.replace(/^[•\-\*–—\d\.]+\s*/, "").trim();
    if (cleanLine.length < 15 || cleanLine.length > 250) continue;

    for (const weakPattern of WEAK_VERB_PATTERNS) {
      if (weakPattern.test(cleanLine)) {
        weakBullets.push({
          original: cleanLine,
          issue: "Starts with passive phrasing instead of a strong action verb.",
          recommendation:
            "Rewrite starting with an active verb (e.g. 'Engineered', 'Architected', 'Spearheaded') and specify your direct technical contribution.",
        });
        break;
      }
    }

    // Check if line describes work but has no metrics
    if (
      cleanLine.length > 40 &&
      !METRIC_PATTERNS.test(cleanLine) &&
      weakBullets.length < 5 &&
      !weakBullets.some((w) => w.original === cleanLine) &&
      /developed|built|created|designed|implemented|optimized/i.test(cleanLine)
    ) {
      weakBullets.push({
        original: cleanLine,
        issue: "Lacks measurable impact, scale, or metrics.",
        recommendation:
          "Include quantifiable metrics (e.g., percentage improvement in latency, number of concurrent users, reduction in deployment time).",
      });
    }

    if (weakBullets.length >= 6) break;
  }

  return weakBullets;
}

export function calculateAtsReadability(
  sections: ReturnType<typeof detectSections>,
  contact: ReturnType<typeof extractContactInfo>,
  skillsCount: number,
  weakBulletsCount: number
): { score: number; recommendations: string[] } {
  let score = 0;
  const recommendations: string[] = [];

  // 1. Contact Info (15 pts)
  let contactPts = 0;
  if (contact.email) contactPts += 5;
  else recommendations.push("Add a professional email address at the top.");
  if (contact.phone) contactPts += 4;
  else recommendations.push("Add a contact phone number.");
  if (contact.linkedin || contact.github) contactPts += 6;
  else recommendations.push("Include links to your GitHub or LinkedIn profile.");
  score += contactPts;

  // 2. Standard Sections (25 pts)
  let sectionPts = 0;
  if (sections.education) sectionPts += 7;
  else recommendations.push("Include a clearly labeled 'Education' section.");
  if (sections.skills) sectionPts += 7;
  else recommendations.push("Create a dedicated 'Technical Skills' section with categorized technologies.");
  if (sections.experience || sections.projects) sectionPts += 8;
  else recommendations.push("Provide an 'Experience' or 'Projects' section highlighting real software applications.");
  if (sections.certifications) sectionPts += 3;
  score += sectionPts;

  // 3. Technical Skills Volume & Quality (25 pts)
  if (skillsCount >= 10) {
    score += 25;
  } else if (skillsCount >= 5) {
    score += 18;
    recommendations.push("Expand your skill inventory to cover 10+ core technologies across languages, frameworks, and databases.");
  } else {
    score += 8;
    recommendations.push("Extractable technical skills are low. Ensure technologies are explicitly named using standard terminology.");
  }

  // 4. Action-oriented Bullets (20 pts)
  if (weakBulletsCount === 0) {
    score += 20;
  } else if (weakBulletsCount <= 2) {
    score += 14;
    recommendations.push("Replace remaining passive expressions in your experience bullets with active achievement verbs.");
  } else {
    score += 8;
    recommendations.push("Several bullets start with passive phrases. Use the Google X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.");
  }

  // 5. Overall ATS Readability & Hygiene (15 pts)
  score += 15;

  return {
    score: Math.min(100, Math.max(0, score)),
    recommendations,
  };
}

export function parseAndAnalyzeResume(rawText: string): ExtractedResumeData {
  const contactInfo = extractContactInfo(rawText);
  const sectionBreakdown = detectSections(rawText);
  const { extracted: extractedSkills, normalized: normalizedSkills } = extractSkillsFromText(rawText);
  const weakBulletPoints = analyzeBulletPoints(rawText);
  const { score: completenessScore, recommendations: atsRecommendations } = calculateAtsReadability(
    sectionBreakdown,
    contactInfo,
    normalizedSkills.length,
    weakBulletPoints.length
  );

  return {
    rawText,
    contactInfo,
    sectionBreakdown,
    extractedSkills,
    normalizedSkills,
    weakBulletPoints,
    atsRecommendations,
    completenessScore,
  };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
