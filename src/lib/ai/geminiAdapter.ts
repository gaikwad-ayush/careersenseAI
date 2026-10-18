import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env";

export interface AIContext {
  fullName?: string;
  degree?: string;
  branch?: string;
  targetRole?: string;
  matchedSkills?: string[];
  missingSkills?: string[];
  completenessScore?: number;
  weakBulletPoints?: string[];
}

export interface AIChatResponse {
  reply: string;
  isAiGenerated: boolean;
  modelUsed: string;
  disclaimer: string;
}

export async function askCareerAssistant(
  prompt: string,
  context: AIContext,
  history: { role: "user" | "assistant"; content: string }[] = []
): Promise<AIChatResponse> {
  // Input sanitization & Prompt Injection Protection
  const sanitizedPrompt = prompt
    .replace(/[<>{}\"]/g, "")
    .trim()
    .slice(0, 1000);

  if (!sanitizedPrompt) {
    throw new Error("Prompt cannot be empty.");
  }

  // Guardrail against common prompt injections
  const injectionPatterns = [
    /ignore previous instructions/i,
    /reveal system prompt/i,
    /system password/i,
    /you are now in developer mode/i,
    /disregard rules/i,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(sanitizedPrompt)) {
      return {
        reply: "I can only help with your resume, skill gaps, role preparation, and career planning. What would you like to work on?",
        isAiGenerated: false,
        modelUsed: "Safety filter",
        disclaimer: "Request filtered.",
      };
    }
  }

  // Check if Gemini API key is configured
  if (!env.GEMINI_API_KEY) {
    return generateDeterministicAdvice(sanitizedPrompt, context);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

    // Build the skills context strings carefully
    const skillsOwned = context.matchedSkills?.length
      ? context.matchedSkills.join(", ")
      : "not yet assessed";
    const skillsGaps = context.missingSkills?.length
      ? context.missingSkills.join(", ")
      : "none identified";
    const atsScore =
      context.completenessScore !== undefined
        ? `${context.completenessScore}/100`
        : "not yet evaluated";
    const weakBulletsBlock =
      context.weakBulletPoints?.length
        ? `Weak bullet points flagged:\n${context.weakBulletPoints.map((b) => `- "${b}"`).join("\n")}`
        : "No weak bullet points flagged.";

    const systemInstruction = `You are a career advisor helping ${context.fullName || "a student"}, a ${context.degree || "B.Tech"} student in ${context.branch || "Computer Science"} who is preparing for a role as ${context.targetRole || "a software engineer"}.

Here is what you know about this person from their actual resume and profile:
- Skills they already have: ${skillsOwned}
- Skills they are missing for their target role: ${skillsGaps}
- ATS resume completeness score: ${atsScore}
- ${weakBulletsBlock}

Your job:
- Give advice that is specific to this person's actual skills and gaps. Don't repeat back generic advice that could apply to anyone.
- When asked about resume bullets, use the X-Y-Z format: "Accomplished [X] measured by [Y] by doing [Z]". If there are flagged weak bullets above, work with those specifically.
- When asked about interview prep, name concrete topics and questions relevant to their target role and the skills they already know.
- When discussing skill gaps, be honest about what is missing and roughly how long it takes to learn (in weeks, not vague timelines).
- Keep responses focused. Don't pad with compliments, motivational filler, or corporate phrasing.
- If you don't know something specific about the person (e.g. their GPA or internship history), say so rather than making assumptions.
- Write like a senior engineer giving direct, useful advice to a junior — not like a chatbot producing formatted output.
- Use plain text, not markdown headers. Short paragraphs are fine.`;

    const chat = ai.chats.create({
      model: env.GEMINI_MODEL || "gemini-2.0-flash",
      config: {
        systemInstruction,
        temperature: 0.35,
      },
    });

    // Feed recent history (last 6 messages for context continuity)
    const recentHistory = history.slice(-6);
    for (const msg of recentHistory) {
      if (msg.role === "user") {
        await chat.sendMessage({ message: msg.content });
      }
    }

    const response = await chat.sendMessage({ message: sanitizedPrompt });
    const replyText = response.text || "No response received from the model.";

    return {
      reply: replyText,
      isAiGenerated: true,
      modelUsed: env.GEMINI_MODEL || "gemini-2.0-flash",
      disclaimer: "Powered by Google Gemini. Verify recommendations before acting on them.",
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error contacting Gemini API";
    console.warn("Gemini API call failed, falling back to deterministic response:", errMsg);
    return generateDeterministicAdvice(
      sanitizedPrompt,
      context,
      `Gemini API unavailable. Showing profile-grounded guidance.`
    );
  }
}

function generateDeterministicAdvice(
  prompt: string,
  context: AIContext,
  providerNotice?: string
): AIChatResponse {
  const p = prompt.toLowerCase();
  const name = context.fullName?.split(" ")[0] || "there";
  const role = context.targetRole || "software engineer";
  const skills = context.matchedSkills || [];
  const gaps = context.missingSkills || [];
  const score = context.completenessScore;
  const bullets = context.weakBulletPoints || [];

  let advice = "";

  if (p.includes("resume") || p.includes("bullet") || p.includes("ats") || p.includes("score")) {
    if (score !== undefined) {
      advice = `Your resume currently scores ${score}/100 on the ATS completeness check.`;
      if (score < 60) {
        advice += ` That's below average — it will likely get filtered before a human reads it.`;
      } else if (score < 80) {
        advice += ` That's a reasonable starting point but there's room to improve.`;
      } else {
        advice += ` That's solid. Focus on the content quality rather than the structure now.`;
      }
    } else {
      advice = `Upload a resume first to get an ATS score and specific feedback.`;
    }

    if (bullets.length > 0) {
      advice += `\n\nThe bullet point flagged as weak: "${bullets[0]}"\n\nThe issue is it describes what you did, not what changed because you did it. Try rewriting it as: "Reduced [metric] by [amount] by [specific action you took]". Even an approximate number — "improved load time by ~40%" — is better than no number.`;
    } else if (skills.length > 0) {
      advice += `\n\nMake sure your skills section explicitly names ${skills.slice(0, 5).join(", ")} — these are matched against ${role} job descriptions, so exact terminology matters.`;
    }
  } else if (p.includes("interview") || p.includes("prepare") || p.includes("question")) {
    advice = `For ${role} interviews, expect questions across three areas:`;

    if (skills.length > 0) {
      advice += `\n\nOn your stack specifically: You know ${skills.slice(0, 4).join(", ")}, so you should be ready to explain architectural decisions — why you chose a particular library or approach, what its trade-offs are, and how you'd handle a failure case. Interviewers test depth, not just familiarity.`;
    }

    if (gaps.length > 0) {
      advice += `\n\nFor ${gaps.slice(0, 2).join(" and ")}, which you're still building: it's fine to say you're actively learning it. The honest answer "I know the fundamentals and I've been working through [specific resource]" is better than bluffing.`;
    }

    advice += `\n\nOn algorithms: Arrays, hash maps, and two-pointer problems come up most often. If ${role.toLowerCase().includes("data") || role.toLowerCase().includes("ml") ? "statistics and probability" : "system design (how you'd scale a service under load)"} is relevant to this role, that'll be the second major pillar.`;
  } else if (p.includes("skill") || p.includes("learn") || p.includes("gap") || p.includes("study")) {
    if (gaps.length > 0) {
      advice = `For ${role}, the most important gaps in your profile are: ${gaps.slice(0, 4).join(", ")}.`;
      const topGap = gaps[0];
      if (topGap.toLowerCase().includes("docker") || topGap.toLowerCase().includes("kubernetes")) {
        advice += `\n\nFor ${topGap}: expect to spend 15–25 hours before you can use it confidently in a project. Start with the official docs "Get Started" guide, not a YouTube playlist — the docs are better structured.`;
      } else if (topGap.toLowerCase().includes("sql") || topGap.toLowerCase().includes("database")) {
        advice += `\n\nFor ${topGap}: SQLZoo or the PostgreSQL tutorial are good starting points. 10–15 hours of practice queries on real datasets will give you enough for most interviews.`;
      } else {
        advice += `\n\nThe roadmap section has a week-by-week breakdown for your target role. Each topic includes verified resources — use those rather than searching from scratch.`;
      }
    } else {
      advice = `Your profile shows ${skills.length > 0 ? `${skills.length} matched skills` : "no skills yet detected"}. ${skills.length > 0 ? `The gaps for ${role} look manageable.` : `Upload your resume or complete the profile to get a proper gap analysis.`}`;
    }
  } else {
    // General career question
    if (skills.length > 0) {
      advice = `Based on your profile: you have ${skills.slice(0, 5).join(", ")} — that puts you in a reasonable position for ${role} roles.`;
    } else {
      advice = `Hi ${name}. I don't have your resume data yet, so I can only give general advice for now.`;
    }

    if (gaps.length > 0) {
      advice += `\n\nThe highest-priority gaps for your target role are ${gaps.slice(0, 3).join(", ")}. If you're not sure where to start, the skill gap page has them ranked by dependency — learn the prerequisites first.`;
    }

    advice += `\n\nWhat specifically would you like to work on — your resume, interview prep, or a learning plan?`;
  }

  return {
    reply: advice,
    isAiGenerated: false,
    modelUsed: "Profile-grounded guidance",
    disclaimer:
      providerNotice ||
      "No Gemini API key configured. This response is based on your actual profile data.",
  };
}
