import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";
import { matchRolesWithML } from "@/lib/ml/client";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Ensure seed roles exist in DB
    let roles = await RoleProfile.find().lean();
    if (roles.length === 0) {
      await RoleProfile.insertMany(SEED_ROLES);
      roles = await RoleProfile.find().lean();
    }

    // Get latest resume
    const latestResume = await Resume.findOne({ userId: user._id, status: "parsed" })
      .sort({ createdAt: -1 })
      .lean();

    const profile = await UserProfile.findOne({ userId: user._id }).lean();

    let candidateText = "";
    let candidateSkills: string[] = [];

    if (latestResume) {
      candidateText = latestResume.rawText || "";
      const latestAnalysis = await ResumeAnalysis.findOne({ resumeId: latestResume._id }).lean();
      if (latestAnalysis?.normalizedSkills) {
        candidateSkills = latestAnalysis.normalizedSkills;
      }
    }

    // Combine with profile skills if any
    if (profile?.existingTechnicalSkills) {
      candidateSkills = Array.from(new Set([...candidateSkills, ...profile.existingTechnicalSkills]));
      if (!candidateText) {
        candidateText = candidateSkills.join(" ");
      }
    }

    if (candidateSkills.length === 0 && !candidateText) {
      return NextResponse.json({
        success: true,
        hasData: false,
        message: "No resume or technical skills detected. Please upload your resume or add your technical proficiencies in your profile to view matches.",
        recommendations: [],
      });
    }

    const { results: recommendations, engine: mlEngine } = await matchRolesWithML(
      candidateText,
      candidateSkills,
      roles as unknown as typeof SEED_ROLES
    );

    return NextResponse.json({
      success: true,
      hasData: true,
      mlEngine,
      totalRolesEvaluated: roles.length,
      candidateSkillsCount: candidateSkills.length,
      recommendations,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Role matching failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
