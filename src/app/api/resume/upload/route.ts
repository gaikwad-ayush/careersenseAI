import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { parsePdfBuffer } from "@/lib/pdf/parser";
import { extractResumeWithML } from "@/lib/ml/client";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const manualText = formData.get("text") as string | null;

    let rawText = "";
    let fileName = "pasted-resume.txt";
    let fileSize = 0;
    let mimeType = "text/plain";
    let fileHash = "";

    if (file && typeof file === "object" && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: "File exceeds 5MB upload limit." },
          { status: 400 }
        );
      }

      fileName = file.name;
      fileSize = file.size;
      mimeType = file.type || "application/pdf";

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fileHash = crypto.createHash("sha256").update(buffer).digest("hex");

      // PDF text extraction with magic signature validation
      const parseResult = await parsePdfBuffer(buffer);
      rawText = parseResult.text;
    } else if (manualText && manualText.trim().length >= 50) {
      rawText = manualText.trim();
      fileSize = Buffer.byteLength(rawText, "utf8");
      fileHash = crypto.createHash("sha256").update(rawText).digest("hex");
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid PDF file (under 5MB) or paste your resume text.",
        },
        { status: 400 }
      );
    }

    // Run NLP Extraction, ATS evaluation, and Section Parsing (FastAPI ML with local fallback)
    const analysisResult = await extractResumeWithML(rawText);

    await connectDB();

    // 1. Create Resume Record
    const resumeDoc = await Resume.create({
      userId: user._id,
      fileName,
      fileSize,
      mimeType,
      fileHash,
      rawText,
      status: "parsed",
    });

    // 2. Create Analysis Record
    const analysisDoc = await ResumeAnalysis.create({
      userId: user._id,
      resumeId: resumeDoc._id,
      completenessScore: analysisResult.completenessScore,
      sectionBreakdown: analysisResult.sectionBreakdown,
      contactInfo: analysisResult.contactInfo,
      extractedSkills: analysisResult.extractedSkills,
      normalizedSkills: analysisResult.normalizedSkills,
      weakBulletPoints: analysisResult.weakBulletPoints,
      atsRecommendations: analysisResult.atsRecommendations,
    });

    // 3. Update User Profile skills with newly found skills
    if (analysisResult.normalizedSkills.length > 0) {
      await UserProfile.findOneAndUpdate(
        { userId: user._id },
        {
          $addToSet: {
            existingTechnicalSkills: { $each: analysisResult.normalizedSkills },
          },
        }
      );
    }

    return NextResponse.json({
      success: true,
      resumeId: resumeDoc._id,
      analysis: analysisDoc,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Resume processing failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
