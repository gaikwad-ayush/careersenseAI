import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { LearningRoadmap } from "@/lib/db/models/LearningRoadmap";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";
import { matchResumeAgainstRoles } from "@/lib/nlp/matcher";
import { searchLiveJobs } from "@/lib/jobs/jobService";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 1. Fetch User Profile
    const profile = await UserProfile.findOne({ userId: user._id }).lean();

    // 2. Fetch Latest Resume & Analysis
    const latestResume = await Resume.findOne({ userId: user._id, status: "parsed" })
      .sort({ createdAt: -1 })
      .lean();

    let latestAnalysis = null;
    let candidateSkills: string[] = profile?.existingTechnicalSkills || [];
    let candidateText = "";

    if (latestResume) {
      latestAnalysis = await ResumeAnalysis.findOne({ resumeId: latestResume._id }).lean();
      if (latestAnalysis) {
        candidateSkills = Array.from(new Set([...candidateSkills, ...latestAnalysis.normalizedSkills]));
        candidateText = latestResume.rawText || "";
      }
    }

    if (!candidateText && candidateSkills.length > 0) {
      candidateText = candidateSkills.join(" ");
    }

    // 3. Fetch Active Learning Roadmap
    const activeRoadmap = await LearningRoadmap.findOne({
      userId: user._id,
      status: "active",
    })
      .sort({ updatedAt: -1 })
      .lean();

    let nextTopic = null;
    if (activeRoadmap) {
      for (const phase of activeRoadmap.phases) {
        for (const topic of phase.topics) {
          if (!topic.isCompleted) {
            nextTopic = {
              phaseTitle: phase.title,
              topicName: topic.name,
              estimatedHours: topic.estimatedHours,
              resourceCount: topic.resources.length,
            };
            break;
          }
        }
        if (nextTopic) break;
      }
    }

    // 4. Compute Top Recommendations if candidate has skills or resume
    let topRecommendations: ReturnType<typeof matchResumeAgainstRoles> = [];
    if (candidateSkills.length > 0 || candidateText) {
      let roles = await RoleProfile.find().lean();
      if (roles.length === 0) {
        await RoleProfile.insertMany(SEED_ROLES);
        roles = await RoleProfile.find().lean();
      }
      const allMatches = matchResumeAgainstRoles(
        candidateText || "engineer",
        candidateSkills,
        roles as unknown as typeof SEED_ROLES
      );
      topRecommendations = allMatches.slice(0, 3);
    }

    // 5. Fetch Target Role or Top Recommended Role Jobs
    const primaryTarget = profile?.targetRoles?.[0] || topRecommendations[0]?.role.title || "Software Engineer";
    const jobResults = await searchLiveJobs({ query: primaryTarget, limit: 3 });

    // 6. Formulate Deterministic Next Action
    let nextRecommendedAction = {
      title: "Upload Your Resume",
      description: "Upload your PDF resume to extract skills, compute your ATS score, and receive matching career paths.",
      actionUrl: "/dashboard/resume",
      actionText: "Upload Resume",
    };

    if (!profile?.branch || !profile?.degree) {
      nextRecommendedAction = {
        title: "Complete Onboarding Profile",
        description: "Specify your degree, branch, graduation year, and target career domains.",
        actionUrl: "/onboarding",
        actionText: "Complete Profile",
      };
    } else if (!latestResume && candidateSkills.length === 0) {
      nextRecommendedAction = {
        title: "Upload Your Engineering Resume",
        description: "Analyze your resume with our TF-IDF and NLP parser to diagnose skill gaps.",
        actionUrl: "/dashboard/resume",
        actionText: "Analyze Resume",
      };
    } else if (!activeRoadmap) {
      nextRecommendedAction = {
        title: `Generate Learning Roadmap for ${primaryTarget}`,
        description: "Generate a personalized study roadmap with verified resources from MDN, MIT, and Harvard.",
        actionUrl: "/dashboard/roadmap",
        actionText: "Generate Roadmap",
      };
    } else if (nextTopic) {
      nextRecommendedAction = {
        title: `Next Up: ${nextTopic.topicName}`,
        description: `Continue in "${nextTopic.phaseTitle}" (${nextTopic.estimatedHours}h est. study time).`,
        actionUrl: "/dashboard/roadmap",
        actionText: "Continue Roadmap",
      };
    }

    return NextResponse.json({
      success: true,
      data: {
        profile,
        hasResume: Boolean(latestResume),
        latestResume: latestResume
          ? {
              id: latestResume._id,
              fileName: latestResume.fileName,
              createdAt: latestResume.createdAt,
              fileSize: latestResume.fileSize,
              completenessScore: latestAnalysis?.completenessScore || 0,
              extractedSkillsCount: latestAnalysis?.normalizedSkills.length || 0,
              weakBulletsCount: latestAnalysis?.weakBulletPoints.length || 0,
            }
          : null,
        topRecommendations,
        activeRoadmap: activeRoadmap
          ? {
              id: activeRoadmap._id,
              targetRole: activeRoadmap.targetRole,
              progressPercentage: activeRoadmap.progressPercentage,
              completedTopicsCount: activeRoadmap.completedTopicsCount,
              totalTopicsCount: activeRoadmap.totalTopicsCount,
              totalDurationWeeks: activeRoadmap.totalDurationWeeks,
              nextTopic,
            }
          : null,
        totalSkillsDetected: candidateSkills.length,
        recentJobs: jobResults.listings,
        jobProviderNotice: jobResults.sourceNotice,
        nextRecommendedAction,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Dashboard data retrieval failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
