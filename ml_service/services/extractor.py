"""Resume extraction and ATS scoring service."""
import re
from typing import Dict, List, Any
from .taxonomy import SKILL_TAXONOMY, normalize_skill
from ..schemas import ContactInfo, SectionBreakdown, ExtractedSkill, WeakBulletPoint, ResumeExtractResponse

WEAK_VERB_PATTERNS = [
    re.compile(r"^(responsible for|worked on|helped with|assisted in|tasked with|handled|was involved in|participated in)\b", re.I),
    re.compile(r"^(did|made|managed stuff|worked with|supported)\b", re.I),
]

METRIC_PATTERNS = re.compile(
    r"\b(\d+%\s*|\d+x\s*|\$\d+|\d+\s*users|\d+\s*ms|\d+\s*req|\d+\s*(gb|mb|tb)|\d+\+?\s*(projects|services|apis|tests))\b",
    re.I
)


def extract_contact_info(text: str) -> ContactInfo:
    email_match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    phone_match = re.search(r"(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}", text)
    linkedin_match = re.search(r"(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+", text, re.I)
    github_match = re.search(r"(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+", text, re.I)

    lines = [line.strip() for line in text.split("\n") if line.strip()]
    likely_name = None
    if lines and len(lines[0].split()) <= 4 and "@" not in lines[0] and not re.search(r"\b(resume|curriculum|cv)\b", lines[0], re.I):
        likely_name = lines[0]

    return ContactInfo(
        name=likely_name,
        email=email_match.group(0) if email_match else None,
        phone=phone_match.group(0) if phone_match else None,
        linkedin=linkedin_match.group(0) if linkedin_match else None,
        github=github_match.group(0) if github_match else None,
    )


def detect_sections(text: str) -> SectionBreakdown:
    lower = text.lower()
    return SectionBreakdown(
        contact=bool("@" in lower or re.search(r"\b(phone|email|linkedin|github)\b", lower)),
        education=bool(re.search(r"\b(education|university|college|b\.tech|bachelor|master|degree|gpa|cgpa)\b", lower)),
        skills=bool(re.search(r"\b(skills|technical skills|technologies|proficiencies|tech stack)\b", lower)),
        experience=bool(re.search(r"\b(experience|work experience|employment|internship|professional experience)\b", lower)),
        projects=bool(re.search(r"\b(projects|academic projects|personal projects|key projects)\b", lower)),
        certifications=bool(re.search(r"\b(certifications|certificates|courses|licenses)\b", lower)),
    )


def extract_skills_from_text(text: str) -> tuple[List[ExtractedSkill], List[str]]:
    extracted_map: Dict[str, ExtractedSkill] = {}

    for item in SKILL_TAXONOMY:
        canonical = item["canonical"]
        synonyms = item["synonyms"]
        category = item["category"]

        matched = False
        # Exact word boundary search
        canonical_pattern = re.compile(rf"\b{re.escape(canonical)}\b", re.I)
        if canonical_pattern.search(text):
            matched = True
        else:
            for syn in synonyms:
                if syn in ("c++", "c#"):
                    pattern = re.compile(rf"(?:^|\s|/|\(){re.escape(syn)}(?:$|\s|/|\)|,)", re.I)
                else:
                    pattern = re.compile(rf"\b{re.escape(syn)}\b", re.I)
                if pattern.search(text):
                    matched = True
                    break

        if matched:
            extracted_map[canonical] = ExtractedSkill(
                name=canonical,
                category=category,
                source="explicit",
                confidence=1.0,
            )
            # Inferred related skills
            for rel in item.get("relatedSkills", []):
                rel_def = normalize_skill(rel)
                if rel_def and rel_def["canonical"] not in extracted_map:
                    extracted_map[rel_def["canonical"]] = ExtractedSkill(
                        name=rel_def["canonical"],
                        category=rel_def["category"],
                        source="inferred",
                        confidence=0.7,
                    )

    skills_list = list(extracted_map.values())
    normalized = [s.name for s in skills_list]
    return skills_list, normalized


def analyze_bullet_points(text: str) -> List[WeakBulletPoint]:
    lines = [line.strip() for line in text.split("\n")]
    weak_bullets: List[WeakBulletPoint] = []

    for line in lines:
        clean_line = re.sub(r"^[•\-\*–—\d\.]+\s*", "", line).strip()
        if len(clean_line) < 15 or len(clean_line) > 250:
            continue

        for pattern in WEAK_VERB_PATTERNS:
            if pattern.search(clean_line):
                weak_bullets.append(
                    WeakBulletPoint(
                        original=clean_line,
                        issue="Starts with passive phrasing instead of a strong action verb.",
                        recommendation="Rewrite starting with an active verb (e.g. 'Engineered', 'Architected', 'Spearheaded') and specify your direct technical contribution.",
                    )
                )
                break
        else:
            # Check for lack of measurable metrics
            if (
                re.search(r"\b(improved|optimized|increased|reduced|built|developed|created|deployed)\b", clean_line, re.I)
                and not METRIC_PATTERNS.search(clean_line)
                and len(clean_line) > 40
            ):
                weak_bullets.append(
                    WeakBulletPoint(
                        original=clean_line,
                        issue="Claims impact/optimization but lacks quantified metrics or key results.",
                        recommendation="Add quantifiable indicators (e.g., 'reduced load time by 35%', 'supporting 10k+ daily users').",
                    )
                )

    return weak_bullets[:5]


def calculate_completeness_and_recommendations(
    sections: SectionBreakdown,
    skills_count: int,
    weak_bullet_count: int
) -> tuple[int, List[str]]:
    score = 0
    recommendations = []

    # Section weights (Total 70%)
    if sections.contact:
        score += 10
    else:
        recommendations.append("Add clear contact information (email, phone, LinkedIn, and GitHub links).")

    if sections.skills:
        score += 15
    else:
        recommendations.append("Include a dedicated 'Technical Skills' section categorizing languages, frameworks, and tools.")

    if sections.experience:
        score += 15
    else:
        recommendations.append("Highlight your professional experience or technical internships.")

    if sections.projects:
        score += 15
    else:
        recommendations.append("Add real-world engineering projects with measurable results.")

    if sections.education:
        score += 10
    else:
        recommendations.append("Specify your degree, university, graduation year, and academic coursework.")

    if sections.certifications:
        score += 5

    # Skill density (15%)
    if skills_count >= 8:
        score += 15
    elif skills_count >= 4:
        score += 10
    elif skills_count >= 1:
        score += 5
    else:
        recommendations.append("Add your key technical proficiencies and tooling to pass ATS keyword filters.")

    # Quality of impact (15%)
    if weak_bullet_count == 0 and sections.experience:
        score += 15
    elif weak_bullet_count <= 2:
        score += 10
    else:
        score += 5
        recommendations.append("Strengthen bullet points by removing passive phrasing and adding measurable impact.")

    return min(100, max(0, score)), recommendations


def parse_and_analyze_resume(text: str) -> ResumeExtractResponse:
    contact_info = extract_contact_info(text)
    sections = detect_sections(text)
    extracted_skills, normalized_skills = extract_skills_from_text(text)
    weak_bullets = analyze_bullet_points(text)
    score, recs = calculate_completeness_and_recommendations(sections, len(normalized_skills), len(weak_bullets))

    return ResumeExtractResponse(
        contactInfo=contact_info,
        sectionBreakdown=sections,
        extractedSkills=extracted_skills,
        normalizedSkills=normalized_skills,
        weakBulletPoints=weak_bullets,
        atsRecommendations=recs,
        completenessScore=score,
    )
