import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { normalizeSkill } from "@/lib/nlp/taxonomy";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const profile = await UserProfile.findOne({ userId: user._id }).lean();
    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load profile";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (body.existingTechnicalSkills && Array.isArray(body.existingTechnicalSkills)) {
      body.existingTechnicalSkills = Array.from(
        new Set(
          body.existingTechnicalSkills.map((s: string) => {
            const def = normalizeSkill(s);
            return def ? def.canonical : s;
          })
        )
      );
    }

    await connectDB();
    const profile = await UserProfile.findOneAndUpdate(
      { userId: user._id },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
