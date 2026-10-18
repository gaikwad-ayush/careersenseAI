import { describe, it, expect } from "vitest";
import { assessSkillGaps, generatePersonalizedRoadmap } from "../skillGap";
import { SEED_ROLES } from "../../catalog/seedRoles";

describe("Skill Gap & Roadmap Engine", () => {
  const backendRole = SEED_ROLES.find((r) => r.slug === "backend-developer")!;

  it("should detect matched vs missing skills correctly", () => {
    // Candidate has Python and SQL, but missing Node.js, Express.js, PostgreSQL
    const candidateSkills = ["Python", "SQL", "Git"];
    const gap = assessSkillGaps(candidateSkills, backendRole);

    expect(gap.matchedSkills).toContain("Python");
    expect(gap.matchedSkills).toContain("SQL");
    expect(gap.missingSkills).toContain("Node.js");
    expect(gap.missingSkills).toContain("PostgreSQL");
    expect(gap.totalEstimatedHours).toBeGreaterThan(0);
    expect(gap.prioritizedGaps.length).toBeGreaterThan(0);
  });

  it("should generate a realistic roadmap with structured phases and verified resources", () => {
    const candidateSkills = ["Python", "SQL"];
    const gap = assessSkillGaps(candidateSkills, backendRole);
    const roadmap = generatePersonalizedRoadmap(backendRole, gap.prioritizedGaps, 10);

    expect(roadmap.phases.length).toBeGreaterThan(0);
    expect(roadmap.totalDurationWeeks).toBeGreaterThanOrEqual(1);

    const firstTopic = roadmap.phases[0].topics[0];
    expect(firstTopic).toBeDefined();
    expect(firstTopic.resources.length).toBeGreaterThan(0);
    expect(firstTopic.resources[0].url).toMatch(/^https?:\/\//);
  });
});
