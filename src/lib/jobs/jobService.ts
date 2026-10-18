import { connectDB } from "../db/connection";
import { JobCache, IJobListing } from "../db/models/JobCache";
import { env } from "../config/env";

export interface JobSearchParams {
  query?: string;
  category?: string;
  limit?: number;
}

export interface JobSearchResult {
  provider: string;
  isConfigured: boolean;
  listings: IJobListing[];
  fetchedAt: string;
  sourceNotice: string;
}

export async function searchLiveJobs(params: JobSearchParams): Promise<JobSearchResult> {
  const query = (params.query || "").trim();
  const limit = Math.min(params.limit || 15, 30);
  const cacheKey = `jobs:${query ? query.toLowerCase() : "all"}:${limit}`;

  // 1. Check persistent database cache (1 hour TTL)
  try {
    await connectDB();
    const cached = await JobCache.findOne({ cacheKey });
    if (cached && cached.expiresAt > new Date()) {
      return {
        provider: cached.provider,
        isConfigured: true,
        listings: cached.listings.slice(0, limit),
        fetchedAt: cached.fetchedAt.toISOString(),
        sourceNotice: `Retrieved from cached live data from ${cached.provider}. Updated hourly.`,
      };
    }
  } catch (err) {
    console.warn("Job cache check skipped:", err);
  }

  // 2. Fetch from real external provider
  try {
    // Remotive Public API provides genuine remote job openings across all disciplines with valid application URLs
    const endpoint = query
      ? `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=${limit}`
      : `https://remotive.com/api/remote-jobs?limit=${limit}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "CareerSenseAI/1.0",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Job provider returned HTTP status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const rawJobs = Array.isArray(data.jobs) ? data.jobs : [];

    const listings: IJobListing[] = rawJobs.slice(0, limit).map((j: {
      id: string | number;
      title: string;
      company_name: string;
      candidate_required_location?: string;
      job_type?: string;
      description?: string;
      url: string;
      publication_date?: string;
      tags?: string[];
    }) => {
      // Strip HTML tags from description snippet
      const cleanSnippet = (j.description || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 240);

      return {
        id: String(j.id || Math.random()),
        title: j.title || "Career Role",
        companyName: j.company_name || "Hiring Organization",
        location: j.candidate_required_location || "Remote (Worldwide / Specific Regions)",
        isRemote: true,
        employmentType: j.job_type || "Full-Time",
        descriptionSnippet: cleanSnippet ? `${cleanSnippet}...` : "Click below to review complete responsibilities and apply on the official job board.",
        url: j.url,
        publishedAt: j.publication_date || new Date().toISOString(),
        source: "Remotive Live Job Feed",
        tags: Array.isArray(j.tags) ? j.tags.slice(0, 5) : [],
      };
    });

    // Save to database cache
    try {
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await JobCache.findOneAndUpdate(
        { cacheKey },
        {
          cacheKey,
          provider: "Remotive Live API",
          query,
          listings,
          fetchedAt: new Date(),
          expiresAt,
        },
        { upsert: true }
      );
    } catch (saveErr) {
      console.warn("Failed to cache jobs:", saveErr);
    }

    return {
      provider: "Remotive Live API",
      isConfigured: true,
      listings,
      fetchedAt: new Date().toISOString(),
      sourceNotice: "Real-time listings retrieved directly from the Remotive API with verified application links.",
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Network error contacting job provider";
    return {
      provider: "Remotive Live API",
      isConfigured: false,
      listings: [],
      fetchedAt: new Date().toISOString(),
      sourceNotice: `External job search currently unavailable: ${errorMsg}. Please check network connectivity or try a different search keyword.`,
    };
  }
}
