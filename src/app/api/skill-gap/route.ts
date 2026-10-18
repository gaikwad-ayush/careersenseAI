import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { SkillGapAssessment } from "@/lib/db/models/SkillGapAssessment";
import { assessSkillGaps } from "@/lib/nlp/skillGap";
import { matchResumeAgainstRoles } from "@/lib/nlp/matcher";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("role") || "full-stack-developer";

    await connectDB();

    let role = await RoleProfile.findOne({ slug }).lean();
    if (!role) {
      // Fallback search in seed roles or default
      const seedMatch = SEED_ROLES.find((r) => r.slug === slug);
      if (seedMatch) {
        role = (await RoleProfile.create(seedMatch)).toObject();
      } else {
        return NextResponse.json({ success: false, error: "Role not found" }, { status: 404 });
      }
    }

    // Retrieve candidate skills
    const latestResume = await Resume.findOne({ userId: user._id, status: "parsed" })
      .sort({ createdAt: -1 })
      .lean();

    const profile = await UserProfile.findOne({ userId: user._id }).lean();

    let candidateSkills: string[] = [];
    let candidateText = "";

    if (latestResume) {
      candidateText = latestResume.rawText;
      const latestAnalysis = await ResumeAnalysis.findOne({ resumeId: latestResume._id }).lean();
      if (latestAnalysis?.normalizedSkills) {
        candidateSkills = latestAnalysis.normalizedSkills;
      }
    }

    if (profile?.existingTechnicalSkills) {
      candidateSkills = Array.from(new Set([...candidateSkills, ...profile.existingTechnicalSkills]));
      if (!candidateText) candidateText = candidateSkills.join(" ");
    }

    // Calculate deterministic gap breakdown
    const gapData = assessSkillGaps(candidateSkills, role as unknown as (typeof SEED_ROLES)[0]);

    // Calculate TF-IDF similarity for this role
    const matchResults = matchResumeAgainstRoles(
      candidateText || role.title,
      candidateSkills,
      [role as unknown as (typeof SEED_ROLES)[0]]
    );
    const match = matchResults[0];

    // Persist assessment to DB
    const assessment = await SkillGapAssessment.findOneAndUpdate(
      { userId: user._id, roleId: role._id },
      {
        userId: user._id,
        roleId: role._id,
        roleTitle: role.title,
        matchScore: match.matchScore,
        requiredCoverageScore: match.requiredCoverageScore,
        preferredCoverageScore: match.preferredCoverageScore,
        matchedSkills: gapData.matchedSkills,
        missingSkills: gapData.missingSkills,
        partialSkills: gapData.partialSkills,
        prioritizedGaps: gapData.prioritizedGaps,
        totalEstimatedHours: gapData.totalEstimatedHours,
        explanation: match.rationale,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      role,
      assessment,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Skill gap assessment failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
