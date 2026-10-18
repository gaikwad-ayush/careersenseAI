import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import { RoleProfile } from "@/lib/db/models/RoleProfile";
import { SEED_ROLES } from "@/lib/catalog/seedRoles";

export async function POST() {
  try {
    await connectDB();

    let inserted = 0;
    let updated = 0;

    for (const roleData of SEED_ROLES) {
      const existing = await RoleProfile.findOne({ slug: roleData.slug });
      if (!existing) {
        await RoleProfile.create(roleData);
        inserted++;
      } else {
        await RoleProfile.updateOne({ slug: roleData.slug }, { $set: roleData });
        updated++;
      }
    }

    const total = await RoleProfile.countDocuments();

    return NextResponse.json({
      success: true,
      message: `Role catalog initialized successfully.`,
      inserted,
      updated,
      totalRoles: total,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database seeding failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const count = await RoleProfile.countDocuments();
    return NextResponse.json({ status: "healthy", rolesCount: count });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Database connection failed";
    return NextResponse.json({ status: "unhealthy", error: message }, { status: 500 });
  }
}
