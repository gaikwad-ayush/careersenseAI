import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { normalizeSkill } from "@/lib/nlp/taxonomy";

const onboardingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  educationLevel: z.string().default("Undergraduate"),
  degree: z.string().default("B.Tech"),
  branch: z.string().default("Computer Science"),
  graduationYear: z.number().int().min(2020).max(2035).default(2026),
  currentExperienceLevel: z.enum(["fresher", "intern", "junior", "mid"]).default("fresher"),
  preferredDomains: z.array(z.string()).default([]),
  existingTechnicalSkills: z.array(z.string()).default([]),
  weeklyLearningHours: z.number().min(2).max(60).default(10),
  targetRoles: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const result = onboardingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // Normalize any provided technical skills
    const normalizedSkills: string[] = [];
    for (const raw of data.existingTechnicalSkills) {
      const def = normalizeSkill(raw);
      normalizedSkills.push(def ? def.canonical : raw);
    }

    await connectDB();

    const profile = await UserProfile.findOneAndUpdate(
      { userId: user._id },
      {
        ...data,
        existingTechnicalSkills: Array.from(new Set(normalizedSkills)),
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Onboarding failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
