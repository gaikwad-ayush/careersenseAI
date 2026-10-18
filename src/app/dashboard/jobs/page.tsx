"use client";

import { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  ExternalLink,
  Calendar,
  Building2,
  Tag,
  RefreshCw,
  AlertCircle,
  Info,
} from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  companyName: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  descriptionSnippet: string;
  url: string;
  publishedAt: string;
  source: string;
  tags: string[];
}

export default function JobDiscoveryPage() {
  const [query, setQuery] = useState("Software Engineer");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string>("");
  const [provider, setProvider] = useState<string>("");
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/jobs?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.listings || []);
        setNotice(data.sourceNotice || "");
        setProvider(data.provider || "Live Job Provider");
        setIsConfigured(data.isConfigured);
      } else {
        setError(data.error || "Failed to fetch job openings");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error contacting job search API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchJobs(query.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          Live Job Market Discovery & Application Feeds
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search real-time tech job openings with direct application URLs. No synthetic listings.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles (e.g. React Developer, Full Stack, Python Engineer)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            <span>Search Roles</span>
          )}
        </button>
      </form>

      {/* Provider Status Notice */}
      {notice && (
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{notice}</span>
          </div>
          <span className="shrink-0 text-[11px] font-semibold text-slate-500">
            Source: {provider}
          </span>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Job Listings Grid */}
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-1">
                    {job.title}
                  </h3>
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {job.employmentType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                    <Building2 className="w-3.5 h-3.5" />
                    {job.companyName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {job.location}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {job.descriptionSnippet}
                </p>

                {job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  {new Date(job.publishedAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>

                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Apply on Official Board</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              No matching listings found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try a broader query such as &quot;Python&quot;, &quot;React&quot;, &quot;Full Stack&quot;, or &quot;DevOps&quot;.
            </p>
          </div>
        )
      )}
    </div>
  );
}
