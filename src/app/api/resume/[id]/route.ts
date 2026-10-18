import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const resume = await Resume.findOne({ _id: id, userId: user._id }).lean();
    if (!resume) {
      return NextResponse.json({ success: false, error: "Resume not found" }, { status: 404 });
    }

    const analysis = await ResumeAnalysis.findOne({ resumeId: id, userId: user._id }).lean();

    return NextResponse.json({ success: true, resume, analysis });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve resume";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deleted = await Resume.findOneAndDelete({ _id: id, userId: user._id });
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Resume not found" }, { status: 404 });
    }

    await ResumeAnalysis.deleteMany({ resumeId: id, userId: user._id });

    return NextResponse.json({ success: true, message: "Resume and analysis deleted successfully." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete resume";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
