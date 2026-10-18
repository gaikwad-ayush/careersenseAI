"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ExternalLink,
  UploadCloud,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface DashboardData {
  profile: {
    fullName?: string;
    degree?: string;
    branch?: string;
    targetRoles?: string[];
    weeklyLearningHours?: number;
  } | null;
  hasResume: boolean;
  latestResume: {
    id: string;
    fileName: string;
    fileSize: number;
    createdAt: string;
    completenessScore: number;
    extractedSkillsCount: number;
    weakBulletsCount: number;
  } | null;
  topRecommendations: Array<{
    role: { title: string; category: string; slug: string };
    matchScore: number;
    requiredCoverageScore: number;
    matchedSkills: string[];
    missingRequiredSkills: string[];
    rationale: string;
  }>;
  activeRoadmap: {
    id: string;
    targetRole: string;
    progressPercentage: number;
    completedTopicsCount: number;
    totalTopicsCount: number;
    totalDurationWeeks: number;
    nextTopic: {
      phaseTitle: string;
      topicName: string;
      estimatedHours: number;
      resourceCount: number;
    } | null;
  } | null;
  totalSkillsDetected: number;
  recentJobs: Array<{
    id: string;
    title: string;
    companyName: string;
    location: string;
    url: string;
    publishedAt: string;
    tags: string[];
  }>;
  jobProviderNotice: string;
  nextRecommendedAction: {
    title: string;
    description: string;
    actionUrl: string;
    actionText: string;
  };
}

export default function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard metrics");
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.error || "Failed to load dashboard data");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-72 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-72 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300">
        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Error Loading Dashboard
        </h3>
        <p className="text-sm">{error || "Unable to retrieve dashboard metrics from server."}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const isNewUser = !data.hasResume && data.totalSkillsDetected === 0;

  return (
    <div className="space-y-8">
      {/* Welcome & Recommended Next Action Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 md:p-8 text-white shadow-lg shadow-blue-500/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium text-white backdrop-blur-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              <span>Recommended Next Action</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {data.nextRecommendedAction.title}
            </h1>
            <p className="mt-2 text-sm text-blue-100/90 leading-relaxed">
              {data.nextRecommendedAction.description}
            </p>
          </div>
          <Link
            href={data.nextRecommendedAction.actionUrl}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm transition-all shadow-md shrink-0 hover:scale-105"
          >
            <span>{data.nextRecommendedAction.actionText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ATS Score */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Resume ATS Score</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {data.latestResume ? `${data.latestResume.completenessScore}%` : "Not evaluated"}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {data.latestResume ? `${data.latestResume.fileName}` : "Upload a PDF resume to assess"}
          </p>
        </div>

        {/* Skills Detected */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verified Skills</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {data.totalSkillsDetected}
            </span>
            <span className="text-xs text-slate-500">skills in profile</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Across languages, tools & frameworks
          </p>
        </div>

        {/* Roadmap Progress */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Roadmap Progress</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {data.activeRoadmap ? `${data.activeRoadmap.progressPercentage}%` : "0%"}
            </span>
            {data.activeRoadmap && (
              <span className="text-xs text-slate-500">
                ({data.activeRoadmap.completedTopicsCount}/{data.activeRoadmap.totalTopicsCount} topics)
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
            {data.activeRoadmap ? data.activeRoadmap.targetRole : "No active roadmap"}
          </p>
        </div>

        {/* Target Role */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Target Role</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-base font-bold text-slate-900 dark:text-white block truncate">
              {data.profile?.targetRoles?.[0] || data.topRecommendations[0]?.role.title || "Not specified"}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {data.profile?.weeklyLearningHours || 10}h / week availability
          </p>
        </div>
      </div>

      {/* Onboarding Checklist for New Users */}
      {isNewUser && (
        <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Getting Started Checklist
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Follow these verified steps to diagnostic career insights based on real data:
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Complete Onboarding Questionnaire</p>
                  <p className="text-xs text-slate-500">Provide your degree, branch, target roles, and weekly availability</p>
                </div>
              </div>
              <Link href="/onboarding" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Start &rarr;
              </Link>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Upload Your Resume (PDF)</p>
                  <p className="text-xs text-slate-500">Extract skills, calculate ATS score, and detect passive bullet points</p>
                </div>
              </div>
              <Link href="/dashboard/resume" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Upload &rarr;
              </Link>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Generate Personalized Roadmap</p>
                  <p className="text-xs text-slate-500">Receive weekly curriculum with verified resources from MDN, Harvard, and MIT</p>
                </div>
              </div>
              <Link href="/dashboard/roadmap" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Generate &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Recommended Roles & Active Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Roles Column (2 spans) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Role Matches
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by TF-IDF cosine similarity and required skill coverage.
              </p>
            </div>
            <Link
              href="/dashboard/roles"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>View All 11 Roles</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {data.topRecommendations.length > 0 ? (
            <div className="space-y-3">
              {data.topRecommendations.map((match) => (
                <div
                  key={match.role.slug}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        {match.role.title}
                      </h3>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {match.role.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        Match Score: {match.matchScore}%
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        Required Coverage: {match.requiredCoverageScore}%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                    {match.rationale}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="text-[11px] font-semibold text-slate-500 mr-1">Matched:</span>
                    {match.matchedSkills.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40"
                      >
                        {s}
                      </span>
                    ))}
                    {match.missingRequiredSkills.length > 0 && (
                      <>
                        <span className="text-[11px] font-semibold text-slate-500 ml-2 mr-1">Gaps:</span>
                        {match.missingRequiredSkills.slice(0, 3).map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40"
                          >
                            {s}
                          </span>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs">
                    <Link
                      href={`/dashboard/skills?role=${match.role.slug}`}
                      className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Diagnose Skill Gaps</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/dashboard/jobs?query=${encodeURIComponent(match.role.title)}`}
                      className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 inline-flex items-center gap-1"
                    >
                      <span>Explore Live Openings</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
              <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                No matching evaluations yet
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Upload your resume or add your technical proficiencies to calculate deterministic TF-IDF cosine similarity against verified role profiles.
              </p>
              <Link
                href="/dashboard/resume"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
              >
                Upload Resume
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar Column: Active Roadmap & Live Openings */}
        <div className="space-y-6">
          {/* Active Roadmap Card */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Active Learning Roadmap
              </h3>
              <Link
                href="/dashboard/roadmap"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                View
              </Link>
            </div>

            {data.activeRoadmap ? (
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Target: {data.activeRoadmap.targetRole}
                </p>
                <div className="mt-2.5 mb-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>Progress</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {data.activeRoadmap.progressPercentage}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-4">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${data.activeRoadmap.progressPercentage}%` }}
                  ></div>
                </div>

                {data.activeRoadmap.nextTopic ? (
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                      Up Next
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {data.activeRoadmap.nextTopic.topicName}
                    </p>
                    <p className="text-slate-500 mt-0.5">
                      {data.activeRoadmap.nextTopic.phaseTitle} • {data.activeRoadmap.nextTopic.estimatedHours}h study
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    All topics completed! Great job.
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-xs text-slate-500">No active roadmap generated.</p>
                <Link
                  href="/dashboard/roadmap"
                  className="mt-2 inline-block px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100"
                >
                  Generate Roadmap
                </Link>
              </div>
            )}
          </div>

          {/* Live Job Openings Preview */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Live Job Feed
              </h3>
              <Link
                href="/dashboard/jobs"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Search
              </Link>
            </div>

            {data.recentJobs.length > 0 ? (
              <div className="space-y-3">
                {data.recentJobs.slice(0, 3).map((job) => (
                  <a
                    key={job.id}
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
                  >
                    <p className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1">
                      {job.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {job.companyName} • {job.location}
                    </p>
                  </a>
                ))}
                <p className="text-[10px] text-slate-400 mt-2">{data.jobProviderNotice}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                Search live tech roles in Job Discovery.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
