import { describe, it, expect } from "vitest";
import { matchResumeAgainstRoles } from "../matcher";
import { SEED_ROLES } from "../../catalog/seedRoles";

describe("Role Matcher Engine", () => {
  it("should rank Full-Stack Developer highest for a candidate with Full-Stack skills", () => {
    const resumeText =
      "Full stack developer experienced in React, TypeScript, Node.js, Express.js, PostgreSQL, and Git. Built web applications with REST APIs.";
    const candidateSkills = ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Git"];

    const matches = matchResumeAgainstRoles(resumeText, candidateSkills, SEED_ROLES);

    expect(matches.length).toBe(SEED_ROLES.length);
    const topMatch = matches[0];
    expect(topMatch.role.title).toBe("Full-Stack Developer");
    expect(topMatch.requiredCoverageScore).toBe(100);
    expect(topMatch.matchScore).toBeGreaterThan(35);
    expect(topMatch.matchedSkills).toContain("React");
    expect(topMatch.matchedSkills).toContain("TypeScript");
    expect(topMatch.limitations).toContain("algorithmic match score");
  });

  it("should calculate partial transferable skills when candidate knows related tech", () => {
    // Candidate knows React, role requires Frontend Developer
    const resumeText = "Frontend engineer proficient in React, HTML5, CSS3, JavaScript, Git.";
    const candidateSkills = ["React", "HTML5", "CSS3", "JavaScript", "Git"];

    const matches = matchResumeAgainstRoles(resumeText, candidateSkills, SEED_ROLES);
    const frontendMatch = matches.find((m) => m.role.slug === "frontend-developer");

    expect(frontendMatch).toBeDefined();
    expect(frontendMatch?.requiredCoverageScore).toBeGreaterThanOrEqual(80);
  });
});
