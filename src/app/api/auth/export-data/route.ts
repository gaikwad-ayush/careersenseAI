import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { SkillGapAssessment } from "@/lib/db/models/SkillGapAssessment";
import { LearningRoadmap } from "@/lib/db/models/LearningRoadmap";
import { AIConversation } from "@/lib/db/models/AIConversation";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = user._id;

    const [profile, resumes, analyses, gaps, roadmaps, conversations] = await Promise.all([
      UserProfile.findOne({ userId }).lean(),
      Resume.find({ userId }).select("-rawText").lean(),
      ResumeAnalysis.find({ userId }).lean(),
      SkillGapAssessment.find({ userId }).lean(),
      LearningRoadmap.find({ userId }).lean(),
      AIConversation.find({ userId }).lean(),
    ]);

    const exportData = {
      exportTimestamp: new Date().toISOString(),
      account: {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile,
      resumes,
      analyses,
      skillGapAssessments: gaps,
      learningRoadmaps: roadmaps,
      aiConversations: conversations,
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="career-sense-data-export-${new Date().toISOString().split("T")[0]}.json"`,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Data export failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
