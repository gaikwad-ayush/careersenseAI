import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const resumes = await Resume.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .select("-rawText")
      .lean();

    const resumeIds = resumes.map((r) => r._id);
    const analyses = await ResumeAnalysis.find({
      userId: user._id,
      resumeId: { $in: resumeIds },
    }).lean();

    const analysisMap = new Map();
    for (const a of analyses) {
      analysisMap.set(a.resumeId.toString(), a);
    }

    const history = resumes.map((r) => ({
      ...r,
      analysis: analysisMap.get(r._id.toString()) || null,
    }));

    return NextResponse.json({ success: true, history });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load resume history";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
