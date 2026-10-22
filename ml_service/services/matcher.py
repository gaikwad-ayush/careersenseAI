"""Role matching service using Scikit-Learn TF-IDF Cosine Similarity."""
from typing import List
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .taxonomy import normalize_skill
from ..schemas import RoleDefinition, RoleMatchItem, RoleMatchResponse


def match_candidate_against_roles(
    candidate_text: str,
    candidate_skills: List[str],
    roles: List[RoleDefinition]
) -> RoleMatchResponse:
    if not roles:
        return RoleMatchResponse(results=[])

    # 1. Build documents for TF-IDF Vectorizer
    role_docs = []
    for r in roles:
        doc = " ".join([
            r.title,
            r.description,
            " ".join(r.requiredSkills),
            " ".join(r.preferredSkills),
            " ".join(r.responsibilities),
        ])
        role_docs.append(doc)

    corpus = [candidate_text] + role_docs

    # Scikit-learn TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(
        stop_words="english",
        lowercase=True,
        ngram_range=(1, 2),
        sublinear_tf=True
    )
    
    tfidf_matrix = vectorizer.fit_transform(corpus)
    candidate_vec = tfidf_matrix[0:1]
    role_matrix = tfidf_matrix[1:]

    # Calculate Cosine Similarities in vector space
    similarities = cosine_similarity(candidate_vec, role_matrix)[0]

    candidate_skill_set = set(s.strip().lower() for s in candidate_skills)
    results: List[RoleMatchItem] = []

    for i, role in enumerate(roles):
        raw_sim = float(similarities[i])
        match_score = int(round(raw_sim * 100))

        # Skill coverage calculation
        matched: List[str] = []
        missing_req: List[str] = []
        missing_pref: List[str] = []

        for req in role.requiredSkills:
            def_skill = normalize_skill(req)
            canonical = def_skill["canonical"] if def_skill else req
            if canonical.lower() in candidate_skill_set:
                matched.append(canonical)
            else:
                missing_req.append(canonical)

        for pref in role.preferredSkills:
            def_skill = normalize_skill(pref)
            canonical = def_skill["canonical"] if def_skill else pref
            if canonical.lower() in candidate_skill_set:
                if canonical not in matched:
                    matched.append(canonical)
            else:
                missing_pref.append(canonical)

        req_coverage = int(round((len(role.requiredSkills) - len(missing_req)) / max(len(role.requiredSkills), 1) * 100))
        pref_coverage = int(round((len(role.preferredSkills) - len(missing_pref)) / max(len(role.preferredSkills), 1) * 100))

        # Rationale generation
        if req_coverage >= 75:
            rationale = f"Strong alignment for {role.title} with {req_coverage}% of core required skills satisfied."
        elif req_coverage >= 40:
            rationale = f"Moderate fit for {role.title}. Candidate possesses foundational technical overlap with actionable skill gaps."
        else:
            rationale = f"Emerging fit for {role.title}. Targeted skill acquisition required across core domains."

        # Suggested steps
        next_steps = []
        if missing_req:
            top_missing = missing_req[:3]
            next_steps.append(f"Focus on mastering core prerequisite skills: {', '.join(top_missing)}.")
        if pref_coverage < 50 and missing_pref:
            next_steps.append(f"Build a portfolio project demonstrating {missing_pref[0]} to stand out.")
        next_steps.append("Tailor resume bullet points with quantified engineering metrics.")

        limitations = "Match scoring is deterministic based on TF-IDF textual overlap and skill taxonomy coverage."

        results.append(
            RoleMatchItem(
                roleSlug=role.slug,
                roleTitle=role.title,
                matchScore=match_score,
                requiredCoverageScore=req_coverage,
                preferredCoverageScore=pref_coverage,
                matchedSkills=matched,
                missingRequiredSkills=missing_req,
                missingPreferredSkills=missing_pref,
                rationale=rationale,
                suggestedNextSteps=next_steps,
                limitations=limitations,
            )
        )

    # Sort results by matchScore descending
    results.sort(key=lambda x: (x.matchScore, x.requiredCoverageScore), reverse=True)
    return RoleMatchResponse(results=results)
