import { NextRequest, NextResponse } from "next/server";
import { searchLiveJobs } from "@/lib/jobs/jobService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "software engineer";
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const result = await searchLiveJobs({ query, limit });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Job search query failed";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
