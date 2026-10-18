import { describe, it, expect, beforeAll } from "vitest";
import { connectDB } from "../db/connection";
import { User } from "../db/models/User";
import { UserProfile } from "../db/models/UserProfile";
import { RoleProfile } from "../db/models/RoleProfile";
import { Resume } from "../db/models/Resume";
import { ResumeAnalysis } from "../db/models/ResumeAnalysis";
import { LearningRoadmap } from "../db/models/LearningRoadmap";
import { SEED_ROLES } from "../catalog/seedRoles";
import { hashPassword, verifyPassword } from "../auth/password";
import { parseAndAnalyzeResume } from "../nlp/extractor";
import { matchResumeAgainstRoles } from "../nlp/matcher";
import { assessSkillGaps, generatePersonalizedRoadmap } from "../nlp/skillGap";

describe("Career Sense AI End-to-End System Verification", () => {
  beforeAll(async () => {
    await connectDB();
  });

  it("should seed and verify the 11 career roles in the catalog", async () => {
    for (const r of SEED_ROLES) {
      await RoleProfile.findOneAndUpdate({ slug: r.slug }, r, { upsert: true });
    }
    const count = await RoleProfile.countDocuments();
    expect(count).toBeGreaterThanOrEqual(11);
  });

  it("should register a test candidate and hash their password securely", async () => {
    const testEmail = `e2e_student_${Date.now()}@university.edu`;
    const password = "ProductionSecurePassword123!";
    const passwordHash = await hashPassword(password);

    const user = await User.create({
      email: testEmail,
      passwordHash,
      role: "user",
    });

    expect(user._id).toBeDefined();
    expect(await verifyPassword(password, user.passwordHash)).toBe(true);

    const profile = await UserProfile.create({
      userId: user._id,
      fullName: "Ananya Patel",
      educationLevel: "Undergraduate",
      degree: "B.Tech",
      branch: "Computer Science",
      graduationYear: 2026,
      weeklyLearningHours: 12,
      targetRoles: ["Full-Stack Developer"],
    });

    expect(profile.fullName).toBe("Ananya Patel");

    // Clean up test candidate
    await User.findByIdAndDelete(user._id);
    await UserProfile.deleteMany({ userId: user._id });
  });

  it("should analyze a resume, calculate ATS score, and compute TF-IDF role matches", async () => {
    const resumeText = `
Ananya Patel
ananya.patel@eng.edu | (555) 987-6543 | github.com/ananyap | linkedin.com/in/ananyap

EDUCATION
B.Tech in Computer Science and Engineering, Class of 2026
GPA: 3.9/4.0

TECHNICAL SKILLS
Languages: Python, TypeScript, JavaScript, SQL, HTML5, CSS3
Frameworks: React, Node.js, Express.js, Next.js, Tailwind CSS
Databases: PostgreSQL, MongoDB, Redis
Cloud & Tools: Docker, Git, CI/CD, Linux

EXPERIENCE
Software Development Intern
• Architected scalable RESTful API microservices in Node.js and TypeScript handling 20,000 requests per minute.
• Implemented interactive React component tree with Tailwind CSS, improving page load speeds by 35%.

PROJECTS
• Built real-time collaborative code editor using Next.js, WebSockets, and Redis.
    `;

    const analysis = parseAndAnalyzeResume(resumeText);
    expect(analysis.completenessScore).toBeGreaterThanOrEqual(80);
    expect(analysis.normalizedSkills).toContain("TypeScript");
    expect(analysis.normalizedSkills).toContain("React");
    expect(analysis.normalizedSkills).toContain("PostgreSQL");

    const matches = matchResumeAgainstRoles(resumeText, analysis.normalizedSkills, SEED_ROLES);
    expect(matches[0].role.title).toBe("Full-Stack Developer");
    expect(matches[0].requiredCoverageScore).toBe(100);

    // Assess gaps for Machine Learning Engineer
    const mlRole = SEED_ROLES.find((r) => r.slug === "machine-learning-engineer")!;
    const mlGap = assessSkillGaps(analysis.normalizedSkills, mlRole);
    expect(mlGap.missingSkills).toContain("PyTorch");

    const roadmap = generatePersonalizedRoadmap(mlRole, mlGap.prioritizedGaps, 12);
    expect(roadmap.phases.length).toBeGreaterThan(0);
    expect(roadmap.phases[0].topics[0].resources[0].url).toMatch(/^https?:\/\//);
  });
});
