"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, GraduationCap, CheckCircle2, RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const CAREER_DOMAINS = [
  "Full-Stack Web Development",
  "Backend & Cloud Systems",
  "Frontend Engineering",
  "Data Science & Analytics",
  "Machine Learning & AI",
  "DevOps & Infrastructure",
  "Cybersecurity",
  "QA & Test Automation",
];

const TARGET_ROLES = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Data Analyst",
  "Data Scientist",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "QA Automation Engineer",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [educationLevel, setEducationLevel] = useState("Undergraduate");
  const [degree, setDegree] = useState("B.Tech / B.E.");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [graduationYear, setGraduationYear] = useState(2026);
  const [currentExperienceLevel, setCurrentExperienceLevel] = useState("fresher");
  const [selectedDomains, setSelectedDomains] = useState<string[]>(["Full-Stack Web Development"]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Full-Stack Developer"]);
  const [existingSkillsInput, setExistingSkillsInput] = useState("JavaScript, React, Python, Git");
  const [weeklyLearningHours, setWeeklyLearningHours] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleDomain = (domain: string) => {
    setSelectedDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const skillsArray = existingSkillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim() || "Engineering Student",
          educationLevel,
          degree,
          branch,
          graduationYear,
          currentExperienceLevel,
          preferredDomains: selectedDomains,
          targetRoles: selectedRoles.length > 0 ? selectedRoles : ["Full-Stack Developer"],
          existingTechnicalSkills: skillsArray,
          weeklyLearningHours,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save onboarding details.");
      }

      // Proceed immediately to resume upload
      router.push("/dashboard/resume");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Onboarding submission error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              Career Sense <span className="text-blue-600 dark:text-blue-400">AI</span>
            </span>
          </div>
          <ThemeToggle />
        </div>

        {/* Form Container */}
        <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Step 1 of 2
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Engineering Profile & Career Goals
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Provide your academic details so we can calibrate role match scores and roadmap duration to your goals.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Academic Information */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Academic Background
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="B.Tech, B.E., B.S., M.Tech"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Branch / Major
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science, IT, ECE, AI&DS"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    min={2020}
                    max={2035}
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(parseInt(e.target.value, 10))}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Target Roles */}
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                2. Target Career Roles
              </h2>
              <div className="flex flex-wrap gap-2">
                {TARGET_ROLES.map((r) => {
                  const isChecked = selectedRoles.includes(r);
                  return (
                    <button
                      type="button"
                      key={r}
                      onClick={() => toggleRole(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isChecked
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Technical Skills */}
            <div className="space-y-2 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Existing Technical Skills
              </h2>
              <p className="text-[11px] text-slate-400">
                List the languages, frameworks, or databases you already know (comma separated).
              </p>
              <textarea
                value={existingSkillsInput}
                onChange={(e) => setExistingSkillsInput(e.target.value)}
                rows={2}
                placeholder="Python, C++, JavaScript, React, SQL, Git..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Study Availability */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  4. Weekly Learning Availability
                </h2>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {weeklyLearningHours} Hours / Week
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={40}
                step={2}
                value={weeklyLearningHours}
                onChange={(e) => setWeeklyLearningHours(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
              <p className="text-[11px] text-slate-400">
                Realistic pacing helps generate achievable milestones without burnout.
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Proceed to Resume Upload</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
