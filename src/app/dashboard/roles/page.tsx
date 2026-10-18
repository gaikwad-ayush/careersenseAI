"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Info,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface RoleMatch {
  role: {
    title: string;
    slug: string;
    category: string;
    description: string;
    requiredSkills: string[];
    preferredSkills: string[];
    responsibilities: string[];
    experienceLevel: string;
    source: string;
  };
  matchScore: number;
  requiredCoverageScore: number;
  preferredCoverageScore: number;
  matchedSkills: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
  partialSkills: Array<{
    roleSkill: string;
    candidateSkill: string;
    relationship: string;
  }>;
  rationale: string;
  suggestedNextSteps: string[];
  limitations: string;
}

export default function CareerRolesPage() {
  const [matches, setMatches] = useState<RoleMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<RoleMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/recommendations")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.recommendations) {
          setMatches(res.recommendations);
          if (res.recommendations.length > 0) {
            setSelectedRole(res.recommendations[0]);
          }
        } else {
          setError(res.message || "Failed to load role recommendations.");
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
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-44 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Career Role Recommendations & Algorithmic Matching
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Evaluated against 11 standardized career categories using TF-IDF vector space modeling and required skill coverage.
        </p>
      </div>

      {/* Methodology Disclaimer Banner */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Algorithmic Match Score vs. Real Hiring Probability</p>
          <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
            The Match Score represents cosine similarity between your resume text vector and verified role specifications. It is an objective metric of textual & skill overlap. It does not measure interview problem-solving, soft skills, or real hiring probability.
          </p>
        </div>
      </div>

      {matches.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Profile or Resume Detected</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            To generate personalized role recommendations, please upload your resume or add your technical skills in onboarding.
          </p>
          <Link
            href="/dashboard/resume"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
          >
            Upload Resume Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List (1 span) */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ranked Roles ({matches.length})
            </h2>
            <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
              {matches.map((m) => {
                const isSelected = selectedRole?.role.slug === m.role.slug;
                return (
                  <button
                    key={m.role.slug}
                    onClick={() => setSelectedRole(m)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-sm"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {m.role.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        {m.matchScore}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>Req. Coverage: {m.requiredCoverageScore}%</span>
                      <span>•</span>
                      <span>{m.matchedSkills.length} matched</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role Detail View (2 spans) */}
          {selectedRole && (
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {selectedRole.role.category}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedRole.role.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Experience: {selectedRole.role.experienceLevel} • Source: {selectedRole.role.source}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                      <span className="block text-xl font-extrabold text-blue-600 dark:text-blue-400">
                        {selectedRole.matchScore}%
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Cosine Match
                      </span>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="block text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {selectedRole.requiredCoverageScore}%
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Req. Coverage
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Role Description
                  </h3>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedRole.role.description}
                  </p>
                </div>

                {/* Rationale */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                    Recommendation Rationale
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedRole.rationale}
                  </p>
                </div>

                {/* Skills Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Matched Skills */}
                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10">
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Matched Skills ({selectedRole.matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRole.matchedSkills.length > 0 ? (
                        selectedRole.matchedSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">None detected</span>
                      )}
                    </div>
                  </div>

                  {/* Missing Required Skills */}
                  <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10">
                    <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 mb-2.5 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      Missing Required Gaps ({selectedRole.missingRequiredSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRole.missingRequiredSkills.length > 0 ? (
                        selectedRole.missingRequiredSkills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200"
                          >
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600 font-medium">All required skills met!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Transferable Skills */}
                {selectedRole.partialSkills.length > 0 && (
                  <div className="p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/10 text-xs space-y-2">
                    <h4 className="font-bold text-indigo-900 dark:text-indigo-200">
                      Transferable & Related Skills Detected
                    </h4>
                    {selectedRole.partialSkills.map((p, idx) => (
                      <p key={idx} className="text-indigo-800 dark:text-indigo-300">
                        • {p.relationship}
                      </p>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    href={`/dashboard/skills?role=${selectedRole.role.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm"
                  >
                    <span>View Deep Skill Gap & Action Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/dashboard/jobs?query=${encodeURIComponent(selectedRole.role.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                  >
                    <span>Explore Live {selectedRole.role.title} Openings</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
