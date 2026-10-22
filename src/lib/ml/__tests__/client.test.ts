import { describe, it, expect } from "vitest";
import {
  checkFastApiHealth,
  extractResumeWithML,
  matchRolesWithML,
  assessSkillGapsWithML,
} from "../client";
import { SEED_ROLES } from "../../catalog/seedRoles";

describe("Python FastAPI ML Service Client", () => {
  it("should connect to the live FastAPI ML service and return healthy status", async () => {
    const isHealthy = await checkFastApiHealth();
    expect(isHealthy).toBe(true);
  });

  it("should extract resume data via FastAPI engine", async () => {
    const resumeText = `Jane Developer
Email: jane@example.com
Phone: +1 555-123-4567
LinkedIn: linkedin.com/in/janedev
GitHub: github.com/janedev

Technical Skills:
Python, FastAPI, Docker, PostgreSQL, React, Next.js, Git

Experience:
Software Engineer at Acme Corp
- Engineered scalable microservices using FastAPI and PostgreSQL handling 50k requests/sec.
`;

    const result = await extractResumeWithML(resumeText);
    expect(result.engine).toBe("fastapi");
    expect(result.contactInfo.email).toBe("jane@example.com");
    expect(result.normalizedSkills).toContain("Python");
    expect(result.normalizedSkills).toContain("FastAPI");
    expect(result.completenessScore).toBeGreaterThanOrEqual(50);
  });

  it("should match candidate profile against roles using Scikit-Learn TF-IDF via FastAPI", async () => {
    const candidateText = "Full stack engineer building high scale Python and FastAPI APIs with React frontends.";
    const candidateSkills = ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"];

    const { results, engine } = await matchRolesWithML(
      candidateText,
      candidateSkills,
      SEED_ROLES
    );

    expect(engine).toBe("fastapi");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].matchScore).toBeGreaterThanOrEqual(0);
    expect(results[0].requiredCoverageScore).toBeGreaterThanOrEqual(0);
  });

  it("should assess skill gaps via FastAPI ML service", async () => {
    const candidateSkills = ["Python", "FastAPI"];
    const targetRole = SEED_ROLES[0]; // Full-Stack Developer

    const gapResult = await assessSkillGapsWithML(candidateSkills, targetRole);
    expect(gapResult.engine).toBe("fastapi");
    expect(gapResult.totalEstimatedHours).toBeGreaterThan(0);
    expect(gapResult.readinessScore).toBeDefined();
    expect(gapResult.readinessLevel).toBeDefined();
  });
});
