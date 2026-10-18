import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/connection";
import { User } from "@/lib/db/models/User";
import { UserProfile } from "@/lib/db/models/UserProfile";
import { AuditEvent } from "@/lib/db/models/AuditEvent";
import { hashPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";

const registerSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, fullName } = result.data;

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Make first user admin if wanted, or normal user
    const totalUsers = await User.countDocuments();
    const role = totalUsers === 0 ? "admin" : "user";

    const user = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      role,
    });

    await UserProfile.create({
      userId: user._id,
      fullName,
      preferredDomains: [],
      existingTechnicalSkills: [],
      targetRoles: [],
    });

    await AuditEvent.create({
      userId: user._id,
      action: "user_registered",
      ipAddress: req.headers.get("x-forwarded-for") || "127.0.0.1",
      userAgent: req.headers.get("user-agent") || "unknown",
    });

    await setSessionCookie({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
