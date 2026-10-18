import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth/session";
import { connectDB } from "@/lib/db/connection";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    let roles = await RoleProfile.find().sort({ title: 1 }).lean();
    if (roles.length === 0) {
      await RoleProfile.insertMany(SEED_ROLES);
      roles = await RoleProfile.find().sort({ title: 1 }).lean();
    }

    return NextResponse.json({ success: true, roles, isAdmin: user.role === "admin" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load roles";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ success: false, error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    const body = await req.json();
    const { title, category, description, requiredSkills, preferredSkills, responsibilities, experienceLevel } = body;

    if (!title || !description || !requiredSkills || !Array.isArray(requiredSkills)) {
      return NextResponse.json({ success: false, error: "Missing required role fields" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    await connectDB();
    const existing = await RoleProfile.findOne({ slug });
    if (existing) {
      return NextResponse.json({ success: false, error: "Role with this title already exists" }, { status: 409 });
    }

    const newRole = await RoleProfile.create({
      title,
      slug,
      category: category || "General Professional",
      description,
      requiredSkills,
      preferredSkills: preferredSkills || [],
      responsibilities: responsibilities || [],
      experienceLevel: experienceLevel || "entry",
      version: "custom-1.0",
      isVerified: true,
      source: "Admin Managed Custom Role",
    });

    return NextResponse.json({ success: true, role: newRole });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create role";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
