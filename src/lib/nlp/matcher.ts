import { TfIdfEngine, cosineSimilarity } from "./tfidf";
import { normalizeSkill } from "./taxonomy";
import { SeedRoleData } from "../catalog/seedRoles";

export interface RoleMatchResult {
  role: SeedRoleData;
  matchScore: number; // TF-IDF Cosine Similarity % (0-100)
  requiredCoverageScore: number; // % of required skills matched (0-100)
  preferredCoverageScore: number; // % of preferred skills matched (0-100)
  matchedSkills: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  partialSkills: {
    roleSkill: string;
    candidateSkill: string;
    relationship: string;
  }[];
  rationale: string;
  suggestedNextSteps: string[];
  limitations: string;
}

export function matchResumeAgainstRoles(
  candidateText: string,
  candidateSkills: string[],
  roles: SeedRoleData[]
): RoleMatchResult[] {
  // 1. Build TF-IDF corpus from all roles + candidate document
  const roleDocs = roles.map((r) => {
    return [
      r.title,
      r.description,
      r.requiredSkills.join(" "),
      r.preferredSkills.join(" "),
      r.responsibilities.join(" "),
    ].join(" ");
  });

  const fullCorpus = [candidateText, ...roleDocs];
  const engine = new TfIdfEngine(fullCorpus);

  const candidateVector = engine.vectorize(candidateText);

  // Normalize candidate skill set for O(1) membership checks
  const candidateSkillSet = new Set(
    candidateSkills.map((s) => s.trim().toLowerCase())
  );

  const results: RoleMatchResult[] = [];

  for (let i = 0; i < roles.length; i++) {
    const role = roles[i];
    const roleText = roleDocs[i];
    const roleVector = engine.vectorize(roleText);

    // Calculate Cosine Similarity (0 - 1)
    const rawSim = cosineSimilarity(candidateVector, roleVector);
    const matchScore = Math.round(rawSim * 100);

    // Skill coverage calculations
    const matchedSkills: string[] = [];
    const missingRequiredSkills: string[] = [];
    const missingPreferredSkills: string[] = [];
    const partialSkills: RoleMatchResult["partialSkills"] = [];

    // Check required skills
    for (const reqSkill of role.requiredSkills) {
      const normalizedDef = normalizeSkill(reqSkill);
      const canonicalLower = (normalizedDef ? normalizedDef.canonical : reqSkill).toLowerCase();

      if (candidateSkillSet.has(canonicalLower)) {
        matchedSkills.push(normalizedDef ? normalizedDef.canonical : reqSkill);
      } else {
        // Check for partial / related skills
        let foundRelated = false;
        if (normalizedDef?.relatedSkills) {
          for (const rel of normalizedDef.relatedSkills) {
            if (candidateSkillSet.has(rel.toLowerCase())) {
              partialSkills.push({
                roleSkill: normalizedDef.canonical,
                candidateSkill: rel,
                relationship: `Candidate has related skill '${rel}' which transfers well to '${normalizedDef.canonical}'`,
              });
              foundRelated = true;
              break;
            }
          }
        }
        if (!foundRelated) {
          missingRequiredSkills.push(normalizedDef ? normalizedDef.canonical : reqSkill);
        }
      }
    }

    // Check preferred skills
    for (const prefSkill of role.preferredSkills) {
      const normalizedDef = normalizeSkill(prefSkill);
      const canonicalLower = (normalizedDef ? normalizedDef.canonical : prefSkill).toLowerCase();

      if (candidateSkillSet.has(canonicalLower)) {
        if (!matchedSkills.includes(normalizedDef ? normalizedDef.canonical : prefSkill)) {
          matchedSkills.push(normalizedDef ? normalizedDef.canonical : prefSkill);
        }
      } else {
        missingPreferredSkills.push(normalizedDef ? normalizedDef.canonical : prefSkill);
      }
    }

    const requiredCoverageScore =
      role.requiredSkills.length > 0
        ? Math.round(
            ((role.requiredSkills.length - missingRequiredSkills.length) /
              role.requiredSkills.length) *
              100
          )
        : 100;

    const preferredCoverageScore =
      role.preferredSkills.length > 0
        ? Math.round(
            ((role.preferredSkills.length - missingPreferredSkills.length) /
              role.preferredSkills.length) *
              100
          )
        : 100;

    // Rationale generation
    let rationale = "";
    if (requiredCoverageScore >= 75) {
      rationale = `Strong candidate alignment. You possess ${matchedSkills.length} relevant technologies including core prerequisites for ${role.title}.`;
    } else if (requiredCoverageScore >= 40) {
      rationale = `Moderate alignment. You demonstrate solid foundations in ${matchedSkills.slice(0, 3).join(", ")}, with key gaps in ${missingRequiredSkills.slice(0, 2).join(", ")}.`;
    } else {
      rationale = `Growth opportunity. While you possess foundational transferable skills, this role requires mastering ${missingRequiredSkills.slice(0, 3).join(", ")}.`;
    }

    // Suggested next steps
    const suggestedNextSteps: string[] = [];
    if (missingRequiredSkills.length > 0) {
      suggestedNextSteps.push(
        `Focus roadmap on high-priority missing skill: ${missingRequiredSkills[0]}`
      );
    }
    if (partialSkills.length > 0) {
      suggestedNextSteps.push(
        `Leverage your background in ${partialSkills[0].candidateSkill} to rapidly onboard onto ${partialSkills[0].roleSkill}`
      );
    }
    suggestedNextSteps.push(`Review official documentation and complete a practical portfolio project targeted at ${role.title}`);

    results.push({
      role,
      matchScore,
      requiredCoverageScore,
      preferredCoverageScore,
      matchedSkills,
      missingRequiredSkills,
      missingPreferredSkills,
      partialSkills,
      rationale,
      suggestedNextSteps,
      limitations:
        "The algorithmic match score measures cosine similarity between resume text vectors and role definitions plus explicit skill keyword coverage. It is an objective diagnostic tool, not a guarantee or statistical prediction of hiring selection.",
    });
  }

  // Sort by combined score (weighted: 50% required coverage + 50% TF-IDF similarity)
  return results.sort((a, b) => {
    const scoreA = a.requiredCoverageScore * 0.5 + a.matchScore * 0.5;
    const scoreB = b.requiredCoverageScore * 0.5 + b.matchScore * 0.5;
    return scoreB - scoreA;
  });
}
