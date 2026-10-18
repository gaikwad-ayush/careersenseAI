import { SeedRoleData } from "../catalog/seedRoles";
import { IPrioritySkill } from "../db/models/SkillGapAssessment";
import { IPhase, ITopic } from "../db/models/LearningRoadmap";
import { getVerifiedResourcesForSkill } from "../catalog/verifiedResources";
import { normalizeSkill } from "./taxonomy";

// Estimated foundational hours by skill category
const CATEGORY_HOURS: Record<string, number> = {
  languages: 24,
  frameworks: 18,
  databases: 14,
  cloud_devops: 16,
  fundamentals: 20,
  tools: 8,
  soft_skills: 6,
};

export function assessSkillGaps(
  candidateSkills: string[],
  role: SeedRoleData
): {
  matchedSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  prioritizedGaps: IPrioritySkill[];
  totalEstimatedHours: number;
} {
  const candidateLower = new Set(candidateSkills.map((s) => s.toLowerCase()));
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const partialSkills: string[] = [];
  let prioritizedGaps: IPrioritySkill[] = [];

  const allRoleSkills = [
    ...role.requiredSkills.map((s) => ({ name: s, isRequired: true })),
    ...role.preferredSkills.map((s) => ({ name: s, isRequired: false })),
  ];

  const gaps: IPrioritySkill[] = [];
  let totalHours = 0;

  for (const item of allRoleSkills) {
    const def = normalizeSkill(item.name);
    const canonical = def ? def.canonical : item.name;
    const lower = canonical.toLowerCase();

    if (candidateLower.has(lower)) {
      if (!matchedSkills.includes(canonical)) {
        matchedSkills.push(canonical);
      }
    } else {
      // Check if candidate has related skill
      let isPartial = false;
      if (def?.relatedSkills) {
        for (const rel of def.relatedSkills) {
          if (candidateLower.has(rel.toLowerCase())) {
            partialSkills.push(`${canonical} (transferable from ${rel})`);
            isPartial = true;
            break;
          }
        }
      }

      if (!missingSkills.includes(canonical)) {
        missingSkills.push(canonical);
      }

      const category = def?.category || "frameworks";
      const baseHours = CATEGORY_HOURS[category] || 15;
      // Discount hours if candidate has related skill
      const adjustedHours = isPartial ? Math.round(baseHours * 0.6) : baseHours;
      totalHours += adjustedHours;

      // Priority determination
      let priority: "high" | "medium" | "low" = "medium";
      let reason = "";

      if (item.isRequired) {
        if (category === "languages" || category === "fundamentals") {
          priority = "high";
          reason = `Critical prerequisite foundation for ${role.title}. Must be mastered first.`;
        } else {
          priority = "high";
          reason = `Mandatory requirement for ${role.title} day-to-day responsibilities.`;
        }
      } else {
        priority = "low";
        reason = `Preferred differentiator that improves portfolio competitiveness.`;
      }

      const prerequisites: string[] = [];
      if (category === "frameworks" && def?.relatedSkills) {
        // e.g. React -> JavaScript, Django -> Python
        prerequisites.push(...def.relatedSkills.slice(0, 2));
      }

      gaps.push({
        name: canonical,
        priority,
        reason,
        prerequisites,
        estimatedHours: adjustedHours,
      });
    }
  }

  // Sort gaps: high -> medium -> low
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  prioritizedGaps = gaps.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return {
    matchedSkills,
    missingSkills,
    partialSkills,
    prioritizedGaps,
    totalEstimatedHours: totalHours,
  };
}

export function generatePersonalizedRoadmap(
  targetRole: SeedRoleData,
  missingGaps: IPrioritySkill[],
  weeklyHours: number = 10
): {
  phases: IPhase[];
  totalDurationWeeks: number;
} {
  const safeWeeklyHours = Math.max(weeklyHours, 4);

  // Group missing skills into logical phases
  // Phase 1: High priority languages & fundamentals
  // Phase 2: Core frameworks & storage/DevOps
  // Phase 3: Capstone synthesis & advanced topics
  const phase1Skills = missingGaps.filter(
    (g) => g.priority === "high" && (g.prerequisites.length === 0 || g.estimatedHours >= 20)
  );
  const phase2Skills = missingGaps.filter(
    (g) => g.priority === "high" && !phase1Skills.includes(g)
  );
  const phase3Skills = missingGaps.filter((g) => g.priority !== "high");

  // If some phases are empty, distribute evenly
  const phaseGroups: { title: string; skills: IPrioritySkill[]; phaseNumber: number }[] = [];

  if (phase1Skills.length > 0) {
    phaseGroups.push({
      title: "Foundational Architecture & Core Prerequisites",
      skills: phase1Skills,
      phaseNumber: 1,
    });
  }

  if (phase2Skills.length > 0) {
    phaseGroups.push({
      title: "Core Technologies & Practical Implementation",
      skills: phase2Skills,
      phaseNumber: phaseGroups.length + 1,
    });
  }

  if (phase3Skills.length > 0 || phaseGroups.length === 0) {
    phaseGroups.push({
      title: "Advanced Specialization & Production Capstone",
      skills: phase3Skills.length > 0 ? phase3Skills : missingGaps.slice(0, 2),
      phaseNumber: phaseGroups.length + 1,
    });
  }

  const phases: IPhase[] = [];
  let cumulativeWeeks = 0;

  for (const group of phaseGroups) {
    const topics: ITopic[] = [];
    let groupHours = 0;

    for (const skill of group.skills) {
      groupHours += skill.estimatedHours;
      const resources = getVerifiedResourcesForSkill(skill.name);

      topics.push({
        id: `topic-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name: `Mastering ${skill.name}`,
        description: skill.reason,
        estimatedHours: skill.estimatedHours,
        isCompleted: false,
        resources,
      });
    }

    const durationWeeks = Math.max(1, Math.ceil(groupHours / safeWeeklyHours));
    cumulativeWeeks += durationWeeks;

    phases.push({
      id: `phase-${group.phaseNumber}`,
      phaseNumber: group.phaseNumber,
      title: group.title,
      description: `Targeting mastery of: ${group.skills.map((s) => s.name).join(", ")}.`,
      targetSkill: group.skills.map((s) => s.name).join(", "),
      durationWeeks,
      topics,
      milestoneProject: {
        title: `${targetRole.title} Milestone Project #${group.phaseNumber}`,
        description: `Build an end-to-end hands-on project demonstrating proficiency in ${group.skills.map((s) => s.name).join(", ")}.`,
        deliverables: [
          `Public GitHub repository with clean commit history and documentation`,
          `Unit test suite verifying core business logic`,
          `Live deployment or executable demonstration`,
        ],
        isCompleted: false,
      },
    });
  }

  return {
    phases,
    totalDurationWeeks: cumulativeWeeks,
  };
}
