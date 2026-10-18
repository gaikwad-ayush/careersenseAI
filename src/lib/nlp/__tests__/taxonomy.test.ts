import { describe, it, expect } from "vitest";
import { normalizeSkill, SKILL_TAXONOMY, getAllCanonicalSkills } from "../taxonomy";

describe("Skill Taxonomy & Normalization", () => {
  it("should normalize exact canonical names", () => {
    const res = normalizeSkill("Python");
    expect(res).not.toBeNull();
    expect(res?.canonical).toBe("Python");
    expect(res?.category).toBe("languages");
  });

  it("should normalize case-insensitive synonyms", () => {
    expect(normalizeSkill("ts")?.canonical).toBe("TypeScript");
    expect(normalizeSkill("react.js")?.canonical).toBe("React");
    expect(normalizeSkill("k8s")?.canonical).toBe("Kubernetes");
    expect(normalizeSkill("psql")?.canonical).toBe("PostgreSQL");
    expect(normalizeSkill("golang")?.canonical).toBe("Go");
  });

  it("should return null for non-existent skills", () => {
    expect(normalizeSkill("randomUnrealTech1234")).toBeNull();
  });

  it("should provide canonical skills list", () => {
    const canonicals = getAllCanonicalSkills();
    expect(canonicals.length).toBeGreaterThanOrEqual(25);
    expect(canonicals).toContain("React");
    expect(canonicals).toContain("Docker");
    expect(canonicals).toContain("Machine Learning");
  });
});
