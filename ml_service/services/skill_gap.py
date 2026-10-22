"""Skill gap analysis and readiness prediction service."""
from typing import List, Dict
from .taxonomy import normalize_skill
from ..schemas import RoleDefinition, PrioritySkill, SkillGapResponse

CATEGORY_HOURS: Dict[str, int] = {
    "languages": 24,
    "frameworks": 18,
    "databases": 14,
    "cloud_devops": 16,
    "fundamentals": 20,
    "tools": 8,
    "soft_skills": 6,
    "business_management": 16,
    "marketing_sales": 14,
    "design_creative": 16,
    "finance_accounting": 18,
    "operations_logistics": 14,
}


def analyze_skill_gaps(candidate_skills: List[str], role: RoleDefinition) -> SkillGapResponse:
    candidate_lower = set(s.strip().lower() for s in candidate_skills)
    matched_skills: List[str] = []
    missing_skills: List[str] = []
    partial_skills: List[str] = []

    all_role_skills = [
        {"name": s, "is_required": True} for s in role.requiredSkills
    ] + [
        {"name": s, "is_required": False} for s in role.preferredSkills
    ]

    gaps: List[PrioritySkill] = []
    total_hours = 0

    for item in all_role_skills:
        name = item["name"]
        is_required = item["is_required"]

        skill_def = normalize_skill(name)
        canonical = skill_def["canonical"] if skill_def else name
        lower = canonical.lower()

        if lower in candidate_lower:
            if canonical not in matched_skills:
                matched_skills.append(canonical)
        else:
            # Check related skills for partial credit
            is_partial = False
            if skill_def and "relatedSkills" in skill_def:
                for rel in skill_def["relatedSkills"]:
                    if rel.lower() in candidate_lower:
                        is_partial = True
                        if canonical not in partial_skills:
                            partial_skills.append(canonical)
                        break

            if not is_partial and canonical not in missing_skills:
                missing_skills.append(canonical)

            category = skill_def["category"] if skill_def else "fundamentals"
            est_hours = CATEGORY_HOURS.get(category, 15)
            if is_partial:
                est_hours = max(4, est_hours // 2)

            total_hours += est_hours

            importance = "high" if is_required else ("medium" if is_partial else "low")
            why_important = (
                f"Essential prerequisite for {role.title} day-to-day responsibilities."
                if is_required
                else f"Competitive advantage skill for {role.title} candidates."
            )
            recommended_action = (
                f"Build a capstone project utilizing {canonical} to demonstrate proficiency."
                if is_required
                else f"Complete tutorial and practice implementing {canonical}."
            )

            gaps.append(
                PrioritySkill(
                    name=canonical,
                    category=category,
                    importance=importance,
                    isRequired=is_required,
                    estimatedHours=est_hours,
                    whyImportant=why_important,
                    recommendedAction=recommended_action,
                )
            )

    # Sort gaps: High priority first, then by estimated hours
    importance_rank = {"high": 0, "medium": 1, "low": 2}
    gaps.sort(key=lambda g: (importance_rank.get(g.importance, 3), -g.estimatedHours))

    # Calculate Readiness Score
    total_skills_count = max(len(role.requiredSkills) + len(role.preferredSkills), 1)
    req_weight = len([s for s in matched_skills if s in role.requiredSkills]) / max(len(role.requiredSkills), 1) * 70
    pref_weight = len([s for s in matched_skills if s in role.preferredSkills]) / max(len(role.preferredSkills), 1) * 20
    partial_weight = min(len(partial_skills) * 3, 10)

    readiness_score = int(round(min(100, req_weight + pref_weight + partial_weight)))

    if readiness_score >= 80:
        readiness_level = "Interview Ready"
    elif readiness_score >= 50:
        readiness_level = "Growth Phase"
    else:
        readiness_level = "Foundational Phase"

    return SkillGapResponse(
        matchedSkills=matched_skills,
        missingSkills=missing_skills,
        partialSkills=partial_skills,
        prioritizedGaps=gaps,
        totalEstimatedHours=total_hours,
        readinessScore=readiness_score,
        readinessLevel=readiness_level,
    )
