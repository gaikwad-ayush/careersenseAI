"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  FolderGit2,
  RefreshCw,
} from "lucide-react";

interface Resource {
  title: string;
  url: string;
  provider: string;
  type: string;
  isVerified: boolean;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  isCompleted: boolean;
  resources: Resource[];
}

interface Phase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  targetSkill: string;
  durationWeeks: number;
  topics: Topic[];
  milestoneProject: {
    title: string;
    description: string;
    deliverables: string[];
    isCompleted: boolean;
  };
}

interface RoadmapData {
  _id: string;
  targetRole: string;
  weeklyCommitmentHours: number;
  totalDurationWeeks: number;
  progressPercentage: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  phases: Phase[];
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [targetRoleInput, setTargetRoleInput] = useState("full-stack-developer");

  const loadRoadmap = () => {
    setLoading(true);
    fetch("/api/roadmap")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.roadmap) {
          setRoadmap(data.roadmap);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRoadmap();
  }, []);

  const handleGenerateRoadmap = async () => {
    setGenerating(true);
    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleSlug: targetRoleInput }),
      });
      const data = await res.json();
      if (data.success) {
        setRoadmap(data.roadmap);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTopic = async (phaseId: string, topicId: string, currentStatus: boolean) => {
    if (!roadmap) return;

    // Optimistic UI update
    const newStatus = !currentStatus;
    const updatedPhases = roadmap.phases.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          topics: phase.topics.map((t) => (t.id === topicId ? { ...t, isCompleted: newStatus } : t)),
        };
      }
      return phase;
    });

    let completedCount = 0;
    let totalCount = 0;
    for (const p of updatedPhases) {
      for (const t of p.topics) {
        totalCount++;
        if (t.isCompleted) completedCount++;
      }
    }

    const newProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    setRoadmap({
      ...roadmap,
      phases: updatedPhases,
      completedTopicsCount: completedCount,
      progressPercentage: newProgress,
    });

    try {
      await fetch("/api/roadmap", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roadmapId: roadmap._id,
          phaseId,
          topicId,
          isCompleted: newStatus,
        }),
      });
    } catch (err) {
      console.error("Failed to persist topic completion:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            Learning Roadmap
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A week-by-week study plan built from your skill gaps, with verified resources at each step.
          </p>
        </div>

        {/* Regenerate controls */}
        <div className="flex items-center gap-2">
          <select
            value={targetRoleInput}
            onChange={(e) => setTargetRoleInput(e.target.value)}
            className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm"
          >
            <optgroup label="Product & Strategy">
              <option value="product-manager">Product Manager</option>
              <option value="business-analyst">Business Analyst</option>
              <option value="management-consultant">Management Consultant</option>
            </optgroup>
            <optgroup label="Design & Creative">
              <option value="ui-ux-designer">UI/UX Designer</option>
              <option value="graphic-brand-designer">Graphic & Brand Designer</option>
              <option value="content-strategist-copywriter">Content Strategist</option>
            </optgroup>
            <optgroup label="Marketing & Growth">
              <option value="digital-marketing-specialist">Digital Marketing Specialist</option>
              <option value="growth-marketer">Growth Marketer</option>
              <option value="social-media-community-manager">Social Media Manager</option>
            </optgroup>
            <optgroup label="Finance & Accounting">
              <option value="financial-analyst">Financial Analyst</option>
              <option value="investment-banking-analyst">Investment Banking Analyst</option>
              <option value="corporate-accountant">Corporate Accountant</option>
            </optgroup>
            <optgroup label="Sales & Business Development">
              <option value="business-development-representative">Business Development Rep</option>
              <option value="account-executive">Account Executive</option>
            </optgroup>
            <optgroup label="Human Resources & People">
              <option value="human-resources-specialist">HR Specialist</option>
              <option value="talent-acquisition-specialist">Talent Acquisition Specialist</option>
            </optgroup>
            <optgroup label="Operations & Logistics">
              <option value="operations-manager">Operations Manager</option>
            </optgroup>
            <optgroup label="Software & Infrastructure">
              <option value="full-stack-developer">Full-Stack Developer</option>
              <option value="frontend-developer">Frontend Developer</option>
              <option value="backend-developer">Backend Developer</option>
              <option value="software-engineer">Software Engineer</option>
              <option value="cloud-engineer">Cloud Engineer</option>
              <option value="devops-engineer">DevOps Engineer</option>
              <option value="cybersecurity-analyst">Cybersecurity Analyst</option>
              <option value="qa-automation-engineer">QA Automation Engineer</option>
            </optgroup>
            <optgroup label="Data & Artificial Intelligence">
              <option value="data-analyst">Data Analyst</option>
              <option value="data-scientist">Data Scientist</option>
              <option value="machine-learning-engineer">ML Engineer</option>
            </optgroup>
          </select>
          <button
            onClick={handleGenerateRoadmap}
            disabled={generating}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            {generating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Roadmap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {!roadmap ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
          <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Active Roadmap Generated
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Choose your target role above and click &quot;Generate Roadmap&quot; to build a personalized study plan mapped to your weekly availability.
          </p>
          <button
            onClick={handleGenerateRoadmap}
            className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-sm"
          >
            Generate My Roadmap
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Roadmap Progress Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Active Study Plan
                </span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {roadmap.targetRole}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {roadmap.totalDurationWeeks} Weeks Total
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {roadmap.weeklyCommitmentHours}h / week availability
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {roadmap.progressPercentage}%
                </span>
                <p className="text-xs text-slate-500">
                  {roadmap.completedTopicsCount} of {roadmap.totalTopicsCount} topics completed
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${roadmap.progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Phases Timeline */}
          <div className="space-y-6">
            {roadmap.phases.map((phase) => (
              <div
                key={phase.id}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6"
              >
                {/* Phase Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                      {phase.phaseNumber}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Phase {phase.phaseNumber}: {phase.title}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Duration: ~{phase.durationWeeks} weeks • Targeting: {phase.targetSkill}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Topics Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Topics & Verified Study Resources
                  </h4>
                  {phase.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className={`p-4 rounded-xl border transition-all ${
                        topic.isCompleted
                          ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/60 opacity-85"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => handleToggleTopic(phase.id, topic.id, topic.isCompleted)}
                            className="mt-0.5 text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform"
                            title={topic.isCompleted ? "Mark incomplete" : "Mark as completed"}
                          >
                            {topic.isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                          <div>
                            <span
                              className={`text-sm font-bold ${
                                topic.isCompleted
                                  ? "line-through text-slate-500 dark:text-slate-400"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {topic.name}
                            </span>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                          ~{topic.estimatedHours}h
                        </span>
                      </div>

                      {/* Verified Resources Links */}
                      {topic.resources.length > 0 && (
                        <div className="mt-3 pl-8 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mr-1">
                            Verified Resources:
                          </span>
                          {topic.resources.map((r, idx) => (
                            <a
                              key={idx}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 transition-colors"
                            >
                              <span>{r.title}</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Milestone Project */}
                {phase.milestoneProject && (
                  <div className="p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/15 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200 font-bold text-xs">
                      <FolderGit2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>{phase.milestoneProject.title}</span>
                    </div>
                    <p className="text-xs text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
                      {phase.milestoneProject.description}
                    </p>
                    <div className="pt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Deliverables:</span>
                      {phase.milestoneProject.deliverables.map((d, i) => (
                        <p key={i}>• {d}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
