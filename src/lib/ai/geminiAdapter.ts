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
    .replace(/[<>{}"]/g, "")
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
        reply: "I am Career Sense AI, your focused career guidance advisor. I can only assist with your resume analysis, role matching, technical preparation, and skill roadmaps.",
        isAiGenerated: false,
        modelUsed: "Safety Guardrail Filter",
        disclaimer: "Request filtered by safety controls.",
      };
    }
  }

  // Check if Gemini API key is configured
  if (!env.GEMINI_API_KEY) {
    // Provide deterministic, grounded expert advice based on user's real context
    return generateDeterministicAdvice(sanitizedPrompt, context);
  }

  try {
    const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

    const systemInstruction = `You are Career Sense AI, an expert career advisor and technical mentor for engineering students and job seekers.
Candidate Profile Context:
- Name: ${context.fullName || "Candidate"}
- Degree & Branch: ${context.degree || "B.Tech"} in ${context.branch || "Computer Science"}
- Target Role: ${context.targetRole || "Software Engineer"}
- Verified Matched Skills: ${context.matchedSkills?.join(", ") || "Foundational CS skills"}
- Identified Missing Skills / Gaps: ${context.missingSkills?.join(", ") || "None recorded"}
- Current Resume ATS Completeness: ${context.completenessScore ?? "Not evaluated"}/100

Guidelines:
1. Ground all recommendations strictly in the candidate's actual extracted skills and stated target role.
2. Never invent qualifications, companies, or credentials that the candidate did not mention.
3. For resume bullet improvement, recommend the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
4. Provide structured, actionable, and encouraging technical advice.`;

    const chat = ai.chats.create({
      model: env.GEMINI_MODEL || "gemini-2.0-flash",
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    // Feed recent history (limit to last 6 messages)
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
      disclaimer:
        "Generated using Google Gemini API. AI recommendations should be reviewed and verified by the candidate.",
    };
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Error contacting Gemini API";
    console.warn("Gemini API call failed, falling back to deterministic response:", errMsg);
    return generateDeterministicAdvice(sanitizedPrompt, context, `Gemini API notice: ${errMsg}. Showing deterministic career guidance.`);
  }
}

function generateDeterministicAdvice(
  prompt: string,
  context: AIContext,
  providerNotice?: string
): AIChatResponse {
  const p = prompt.toLowerCase();
  let advice = "";

  if (p.includes("resume") || p.includes("bullet") || p.includes("score")) {
    advice = `### Resume Enhancement Strategy for ${context.targetRole || "Tech Roles"}\n\n` +
      `Your current resume completeness score is **${context.completenessScore || "in progress"}%**.\n\n` +
      `**Actionable Recommendations:**\n` +
      `1. **Quantify Accomplishments:** Use the standard formula: *Accomplished [X] measured by [Y], by doing [Z]*.\n` +
      `2. **Highlight Matched Skills:** Prominently feature your verified proficiencies: **${context.matchedSkills?.slice(0, 5).join(", ") || "Languages & Frameworks"}** in your technical skills block.\n` +
      `3. **Address Skill Gaps:** If you're building projects for **${context.missingSkills?.slice(0, 3).join(", ") || "Target technologies"}**, list them under a dedicated 'Projects' section with GitHub repositories.`;
  } else if (p.includes("interview") || p.includes("prepare") || p.includes("question")) {
    advice = `### Technical Interview Preparation for ${context.targetRole || "Engineering Roles"}\n\n` +
      `Based on your target role, focus your interview preparation on these pillars:\n\n` +
      `1. **Core Problem Solving:** Practice Data Structures & Algorithms (Arrays, Hash Maps, Trees, Dynamic Programming).\n` +
      `2. **Target Role Foundations:** Be prepared to explain architectural choices in **${context.matchedSkills?.slice(0, 4).join(", ") || "your core stack"}**.\n` +
      `3. **Handling Gaps:** For missing technologies like **${context.missingSkills?.slice(0, 2).join(", ") || "cloud/databases"}**, explain how your experience with related tools enables rapid ramp-up.`;
  } else {
    advice = `### Career Path Advisory: ${context.targetRole || "Software Engineering"}\n\n` +
      `Hello ${context.fullName || "there"}! Based on your ${context.degree || "engineering"} background:\n\n` +
      `* **Your Strengths:** You have verified competencies in **${context.matchedSkills?.join(", ") || "fundamental engineering skills"}**.\n` +
      `* **Key Priority Skills to Acquire:** Focus your learning efforts on **${context.missingSkills?.slice(0, 3).join(", ") || "advanced technologies"}** to maximize role alignment.\n` +
      `* **Next Step:** Check your active personalized Learning Roadmap to complete hands-on milestone projects with verified learning resources.`;
  }

  return {
    reply: advice,
    isAiGenerated: false,
    modelUsed: "Deterministic Career Guidance Engine",
    disclaimer: providerNotice || "External LLM key not configured. Displaying deterministic guidance grounded in your profile data.",
  };
}
