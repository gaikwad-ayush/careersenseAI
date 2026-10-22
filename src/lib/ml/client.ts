import { env } from "../config/env";
import { parseAndAnalyzeResume, ExtractedResumeData } from "../nlp/extractor";
import { matchResumeAgainstRoles, RoleMatchResult } from "../nlp/matcher";
import { assessSkillGaps } from "../nlp/skillGap";
import { SeedRoleData } from "../catalog/seedRoles";
import { IPrioritySkill } from "../db/models/SkillGapAssessment";

const FASTAPI_URL = env.FASTAPI_ML_URL || "http://127.0.0.1:8000";
const REQUEST_TIMEOUT_MS = 2500;

async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Health check for the Python FastAPI ML microservice.
 */
export async function checkFastApiHealth(): Promise<boolean> {
  try {
    const res = await fetchWithTimeout(`${FASTAPI_URL}/health`);
    if (!res.ok) return false;
    const data = await res.json();
    return data?.status === "ok";
  } catch {
    return false;
  }
}

/**
 * Extract resume details, ATS score, and skills using FastAPI ML service with automatic local fallback.
 */
export async function extractResumeWithML(rawText: string): Promise<ExtractedResumeData & { engine: "fastapi" | "typescript" }> {
  try {
    const res = await fetchWithTimeout(`${FASTAPI_URL}/api/ml/extract-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: rawText }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        rawText,
        contactInfo: data.contactInfo,
        sectionBreakdown: data.sectionBreakdown,
        extractedSkills: data.extractedSkills,
        normalizedSkills: data.normalizedSkills,
        weakBulletPoints: data.weakBulletPoints,
        atsRecommendations: data.atsRecommendations,
        completenessScore: data.completenessScore,
        engine: "fastapi",
      };
    }
  } catch {
    // Graceful fallback to local engine if FastAPI service is offline
  }

  const localResult = parseAndAnalyzeResume(rawText);
  return {
    ...localResult,
    engine: "typescript",
  };
}

/**
 * Match candidate profile against roles using Python Scikit-Learn TF-IDF Cosine Similarity with fallback.
 */
export async function matchRolesWithML(
  candidateText: string,
  candidateSkills: string[],
  roles: SeedRoleData[]
): Promise<{ results: RoleMatchResult[]; engine: "fastapi" | "typescript" }> {
  try {
    const res = await fetchWithTimeout(`${FASTAPI_URL}/api/ml/match-roles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateText,
        candidateSkills,
        roles: roles.map((r) => ({
          slug: r.slug,
          title: r.title,
          category: r.category,
          level: r.experienceLevel,
          description: r.description,
          requiredSkills: r.requiredSkills,
          preferredSkills: r.preferredSkills,
          responsibilities: r.responsibilities,
        })),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const results: RoleMatchResult[] = data.results.map((item: any) => {
        const fullRole = roles.find((r) => r.slug === item.roleSlug) || {
          slug: item.roleSlug,
          title: item.roleTitle,
          category: "General",
          experienceLevel: "mid" as const,
          description: "",
          requiredSkills: item.matchedSkills.concat(item.missingRequiredSkills),
          preferredSkills: item.missingPreferredSkills,
          responsibilities: [],
          version: "1.0",
          isVerified: true,
          source: "ml-service",
        };

        return {
          role: fullRole as SeedRoleData,
          matchScore: item.matchScore,
          requiredCoverageScore: item.requiredCoverageScore,
          preferredCoverageScore: item.preferredCoverageScore,
          matchedSkills: item.matchedSkills,
          missingRequiredSkills: item.missingRequiredSkills,
          missingPreferredSkills: item.missingPreferredSkills,
          partialSkills: [],
          rationale: item.rationale,
          suggestedNextSteps: item.suggestedNextSteps,
          limitations: item.limitations,
        };
      });

      return { results, engine: "fastapi" };
    }
  } catch {
    // Graceful fallback
  }

  const localResults = matchResumeAgainstRoles(candidateText, candidateSkills, roles);
  return { results: localResults, engine: "typescript" };
}

/**
 * Evaluate skill gaps and readiness score using FastAPI with fallback.
 */
export async function assessSkillGapsWithML(
  candidateSkills: string[],
  role: SeedRoleData
): Promise<{
  matchedSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  prioritizedGaps: IPrioritySkill[];
  totalEstimatedHours: number;
  readinessScore?: number;
  readinessLevel?: string;
  engine: "fastapi" | "typescript";
}> {
  try {
    const res = await fetchWithTimeout(`${FASTAPI_URL}/api/ml/skill-gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateSkills,
        role: {
          slug: role.slug,
          title: role.title,
          category: role.category,
          level: role.experienceLevel,
          description: role.description,
          requiredSkills: role.requiredSkills,
          preferredSkills: role.preferredSkills,
          responsibilities: role.responsibilities,
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        matchedSkills: data.matchedSkills,
        missingSkills: data.missingSkills,
        partialSkills: data.partialSkills,
        prioritizedGaps: data.prioritizedGaps,
        totalEstimatedHours: data.totalEstimatedHours,
        readinessScore: data.readinessScore,
        readinessLevel: data.readinessLevel,
        engine: "fastapi",
      };
    }
  } catch {
    // Graceful fallback
  }

  const localGap = assessSkillGaps(candidateSkills, role);
  return {
    ...localGap,
    engine: "typescript",
  };
}
