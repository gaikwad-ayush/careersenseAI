import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { connectDB } from "@/lib/db/connection";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    await connectDB();
    const profile = await UserProfile.findOne({ userId: user._id }).lean();

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      profile,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Authentication check failed";
    return NextResponse.json({ authenticated: false, error: message }, { status: 500 });
  }
}
