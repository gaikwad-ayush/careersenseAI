import { describe, it, expect } from "vitest";
import {
  extractContactInfo,
  detectSections,
  extractSkillsFromText,
  analyzeBulletPoints,
  parseAndAnalyzeResume,
} from "../extractor";

describe("Resume Extractor & ATS Analysis", () => {
  const sampleResume = `
Alex Kumar
alex.kumar@example.com | (555) 123-4567 | github.com/alexkumar | linkedin.com/in/alexkumar

EDUCATION
B.Tech in Computer Science and Engineering, 2026
GPA: 3.8/4.0

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, C++
Frameworks: React, Node.js, Express.js, Tailwind CSS
Databases: PostgreSQL, MongoDB

EXPERIENCE
Software Engineering Intern
• Responsible for working on the backend API services.
• Engineered low-latency caching layer reducing response times by 40% across 500k daily requests.
• Built user interface for analytics dashboard.

PROJECTS
• Architected full-stack e-commerce application using Next.js, TypeScript, and PostgreSQL.
  `;

  it("should accurately extract contact information", () => {
    const contact = extractContactInfo(sampleResume);
    expect(contact.email).toBe("alex.kumar@example.com");
    expect(contact.phone).toBe("(555) 123-4567");
    expect(contact.github).toBe("github.com/alexkumar");
    expect(contact.linkedin).toBe("linkedin.com/in/alexkumar");
  });

  it("should detect all key resume sections", () => {
    const sections = detectSections(sampleResume);
    expect(sections.education).toBe(true);
    expect(sections.skills).toBe(true);
    expect(sections.experience).toBe(true);
    expect(sections.projects).toBe(true);
  });

  it("should extract normalized skills from text", () => {
    const { normalized } = extractSkillsFromText(sampleResume);
    expect(normalized).toContain("Python");
    expect(normalized).toContain("JavaScript");
    expect(normalized).toContain("TypeScript");
    expect(normalized).toContain("React");
    expect(normalized).toContain("PostgreSQL");
  });

  it("should detect weak passive bullet points and provide recommendations", () => {
    const weakBullets = analyzeBulletPoints(sampleResume);
    expect(weakBullets.length).toBeGreaterThan(0);
    const passiveBullet = weakBullets.find((b) => b.original.includes("Responsible for"));
    expect(passiveBullet).toBeDefined();
    expect(passiveBullet?.issue).toContain("passive phrasing");
  });

  it("should calculate an explainable ATS score", () => {
    const analysis = parseAndAnalyzeResume(sampleResume);
    expect(analysis.completenessScore).toBeGreaterThanOrEqual(70);
    expect(analysis.sectionBreakdown.education).toBe(true);
    expect(analysis.atsRecommendations).toBeDefined();
  });
});
