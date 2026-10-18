"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Target,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface PriorityGap {
  name: string;
  priority: "high" | "medium" | "low";
  reason: string;
  prerequisites: string[];
  estimatedHours: number;
}

interface SkillGapData {
  role: {
    title: string;
    slug: string;
    category: string;
    description: string;
    experienceLevel: string;
  };
  assessment: {
    matchScore: number;
    requiredCoverageScore: number;
    preferredCoverageScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    partialSkills: string[];
    prioritizedGaps: PriorityGap[];
    totalEstimatedHours: number;
    explanation: string;
    limitationsDisclaimer: string;
  };
}

function SkillGapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleParam = searchParams.get("role") || "full-stack-developer";

  const [data, setData] = useState<SkillGapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const loadGapData = (roleSlug: string) => {
    setLoading(true);
    fetch(`/api/skill-gap?role=${roleSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load skill gap assessment.");
        return res.json();
      })
      .then((res) => {
        if (res.success) {
          setData(res);
        } else {
          setError(res.error || "Failed to load skill gap data.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadGapData(roleParam);
  }, [roleParam]);

  const handleRoleChange = (newSlug: string) => {
    startTransition(() => {
      router.push(`/dashboard/skills?role=${newSlug}`);
    });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300">
        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" /> Error Loading Assessment
        </h3>
        <p className="text-sm">{error || "Unable to retrieve skill gap assessment."}</p>
        <button
          onClick={() => loadGapData(roleParam)}
          className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  const { role, assessment } = data;

  return (
    <div className="space-y-8">
      {/* Header with Role Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            Diagnostic Skill-Gap Assessment
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Target Role: <span className="font-semibold text-slate-900 dark:text-white">{role.title}</span>
          </p>
        </div>

        {/* Quick Role Switcher */}
        <select
          value={roleParam}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="full-stack-developer">Full-Stack Developer</option>
          <option value="frontend-developer">Frontend Developer</option>
          <option value="backend-developer">Backend Developer</option>
          <option value="software-engineer">Software Engineer</option>
          <option value="data-analyst">Data Analyst</option>
          <option value="data-scientist">Data Scientist</option>
          <option value="machine-learning-engineer">Machine Learning Engineer</option>
          <option value="devops-engineer">DevOps Engineer</option>
          <option value="cloud-engineer">Cloud Engineer</option>
          <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
          <option value="qa-automation-engineer">QA Automation Engineer</option>
        </select>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500">TF-IDF Match Score</span>
          <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
            {assessment.matchScore}%
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Cosine vector similarity</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500">Required Skills Met</span>
          <p className="mt-2 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {assessment.requiredCoverageScore}%
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{assessment.matchedSkills.length} skills verified</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500">Estimated Study Effort</span>
          <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ~{assessment.totalEstimatedHours}h
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Estimated foundational hours</p>
        </div>

        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs font-medium text-slate-500">Identified Gaps</span>
          <p className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
            {assessment.prioritizedGaps.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Missing required & preferred skills</p>
        </div>
      </div>

      {/* Prioritized Gaps Table / Cards */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Prioritized Skill Gaps & Action Items
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Prioritized by curriculum dependency and prerequisite chains.
          </p>
        </div>

        {assessment.prioritizedGaps.length > 0 ? (
          <div className="space-y-3">
            {assessment.prioritizedGaps.map((gap) => (
              <div
                key={gap.name}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {gap.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        gap.priority === "high"
                          ? "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                          : gap.priority === "medium"
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {gap.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {gap.reason}
                  </p>
                  {gap.prerequisites.length > 0 && (
                    <p className="text-[11px] text-slate-500">
                      Recommended prerequisites: {gap.prerequisites.join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      ~{gap.estimatedHours} hours
                    </span>
                    <span className="text-[10px] text-slate-400">estimated study</span>
                  </div>

                  <Link
                    href={`/dashboard/roadmap`}
                    className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
                    title="Generate Roadmap with this Skill"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-bold text-base">Exceptional Alignment!</h3>
            <p className="text-xs mt-1">
              No skill gaps detected for {role.title}. You have demonstrated coverage across all required and preferred technologies.
            </p>
          </div>
        )}

        {/* CTA to Roadmap */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Ready to close these gaps systematically?
          </p>
          <Link
            href="/dashboard/roadmap"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <span>Generate Roadmap for {role.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SkillGapPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-xs text-slate-400 animate-pulse">
          Loading diagnostic skill gaps...
        </div>
      }
    >
      <SkillGapContent />
    </Suspense>
  );
}
