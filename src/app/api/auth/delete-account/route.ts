import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, clearSessionCookie } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { User } from "@/lib/db/models/User";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { SkillGapAssessment } from "@/lib/db/models/SkillGapAssessment";
import { LearningRoadmap } from "@/lib/db/models/LearningRoadmap";
import { AIConversation } from "@/lib/db/models/AIConversation";
import { AuditEvent } from "@/lib/db/models/AuditEvent";

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userId = user._id;

    // Delete all user related resources (strict cascade)
    await Promise.all([
      User.findByIdAndDelete(userId),
      UserProfile.deleteMany({ userId }),
      Resume.deleteMany({ userId }),
      ResumeAnalysis.deleteMany({ userId }),
      SkillGapAssessment.deleteMany({ userId }),
      LearningRoadmap.deleteMany({ userId }),
      AIConversation.deleteMany({ userId }),
      AuditEvent.create({
        action: "user_account_deleted",
        details: { email: user.email },
      }),
    ]);

    await clearSessionCookie();

    return NextResponse.json({
      success: true,
      message: "Your account and all associated personal records have been permanently erased.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Account deletion failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
