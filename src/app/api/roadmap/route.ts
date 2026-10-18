import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { LearningRoadmap } from "@/lib/db/models/LearningRoadmap";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";
import { assessSkillGaps, generatePersonalizedRoadmap } from "@/lib/nlp/skillGap";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const roadmap = await LearningRoadmap.findOne({
      userId: user._id,
      status: "active",
    })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({ success: true, roadmap });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load roadmap";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const roleSlug = body.roleSlug || "full-stack-developer";

    await connectDB();

    let role = await RoleProfile.findOne({ slug: roleSlug }).lean();
    if (!role) {
      const seedRole = SEED_ROLES.find((r) => r.slug === roleSlug) || SEED_ROLES[0];
      role = (await RoleProfile.create(seedRole)).toObject();
    }

    const profile = await UserProfile.findOne({ userId: user._id }).lean();
    const weeklyHours = profile?.weeklyLearningHours || 10;

    // Load candidate skills
    let candidateSkills: string[] = [];
    const latestResume = await Resume.findOne({ userId: user._id, status: "parsed" })
      .sort({ createdAt: -1 })
      .lean();

    if (latestResume) {
      const latestAnalysis = await ResumeAnalysis.findOne({ resumeId: latestResume._id }).lean();
      if (latestAnalysis?.normalizedSkills) {
        candidateSkills = latestAnalysis.normalizedSkills;
      }
    }

    if (profile?.existingTechnicalSkills) {
      candidateSkills = Array.from(new Set([...candidateSkills, ...profile.existingTechnicalSkills]));
    }

    // Assess gaps
    const gap = assessSkillGaps(candidateSkills, role as unknown as (typeof SEED_ROLES)[0]);

    // Generate roadmap
    const generated = generatePersonalizedRoadmap(
      role as unknown as (typeof SEED_ROLES)[0],
      gap.prioritizedGaps,
      weeklyHours
    );

    // Calculate total topics
    let totalTopics = 0;
    for (const phase of generated.phases) {
      totalTopics += phase.topics.length;
    }

    // Create or update roadmap
    const roadmap = await LearningRoadmap.create({
      userId: user._id,
      targetRole: role.title,
      roleId: role._id,
      weeklyCommitmentHours: weeklyHours,
      totalDurationWeeks: generated.totalDurationWeeks,
      progressPercentage: 0,
      completedTopicsCount: 0,
      totalTopicsCount: totalTopics,
      status: "active",
      phases: generated.phases,
    });

    return NextResponse.json({ success: true, roadmap });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Roadmap generation failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { roadmapId, phaseId, topicId, isCompleted } = body;

    if (!roadmapId || !topicId) {
      return NextResponse.json({ success: false, error: "Missing roadmapId or topicId" }, { status: 400 });
    }

    await connectDB();

    const roadmap = await LearningRoadmap.findOne({ _id: roadmapId, userId: user._id });
    if (!roadmap) {
      return NextResponse.json({ success: false, error: "Roadmap not found" }, { status: 404 });
    }

    let found = false;
    let completedCount = 0;
    let totalCount = 0;

    for (const phase of roadmap.phases) {
      for (const topic of phase.topics) {
        totalCount++;
        if (topic.id === topicId) {
          topic.isCompleted = Boolean(isCompleted);
          topic.completedAt = isCompleted ? new Date() : undefined;
          found = true;
        }
        if (topic.isCompleted) {
          completedCount++;
        }
      }
    }

    if (!found) {
      return NextResponse.json({ success: false, error: "Topic not found in roadmap" }, { status: 404 });
    }

    roadmap.completedTopicsCount = completedCount;
    roadmap.totalTopicsCount = totalCount;
    roadmap.progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    if (roadmap.progressPercentage === 100) {
      roadmap.status = "completed";
    }

    await roadmap.save();

    return NextResponse.json({
      success: true,
      progressPercentage: roadmap.progressPercentage,
      completedTopicsCount: completedCount,
      roadmap,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update roadmap topic";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
