import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { Resume } from "@/lib/db/models/Resume";
import { ResumeAnalysis } from "@/lib/db/models/ResumeAnalysis";
import { AIConversation } from "@/lib/db/models/AIConversation";
import { askCareerAssistant, AIContext } from "@/lib/ai/geminiAdapter";

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 });
    }

    await connectDB();

    // 1. Gather Candidate Context
    const profile = await UserProfile.findOne({ userId: user._id }).lean();
    const latestResume = await Resume.findOne({ userId: user._id, status: "parsed" })
      .sort({ createdAt: -1 })
      .lean();

    let completenessScore: number | undefined;
    let matchedSkills: string[] = profile?.existingTechnicalSkills || [];
    let weakBullets: string[] = [];

    if (latestResume) {
      const analysis = await ResumeAnalysis.findOne({ resumeId: latestResume._id }).lean();
      if (analysis) {
        completenessScore = analysis.completenessScore;
        matchedSkills = Array.from(new Set([...matchedSkills, ...analysis.normalizedSkills]));
        weakBullets = analysis.weakBulletPoints.map((w) => w.original);
      }
    }

    const targetRole = profile?.targetRoles?.[0] || "Software Engineer";

    const aiContext: AIContext = {
      fullName: profile?.fullName || "Candidate",
      degree: profile?.degree || "B.Tech",
      branch: profile?.branch || "Computer Science",
      targetRole,
      matchedSkills,
      completenessScore,
      weakBulletPoints: weakBullets.slice(0, 3),
    };

    // 2. Fetch or initialize conversation history
    let conversation = await AIConversation.findOne({ userId: user._id });
    if (!conversation) {
      conversation = await AIConversation.create({
        userId: user._id,
        targetRole,
        messages: [],
      });
    }

    const historyForAI = conversation.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    // 3. Call Assistant
    const result = await askCareerAssistant(prompt, aiContext, historyForAI);

    // 4. Persist messages
    conversation.messages.push({
      role: "user",
      content: prompt,
      timestamp: new Date(),
    });
    conversation.messages.push({
      role: "assistant",
      content: result.reply,
      timestamp: new Date(),
    });
    // Keep max 30 messages
    if (conversation.messages.length > 30) {
      conversation.messages = conversation.messages.slice(-30);
    }
    await conversation.save();

    return NextResponse.json({
      success: true,
      ...result,
      history: conversation.messages,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "AI conversation error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const conversation = await AIConversation.findOne({ userId: user._id }).lean();

    return NextResponse.json({
      success: true,
      messages: conversation?.messages || [],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load chat history";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
