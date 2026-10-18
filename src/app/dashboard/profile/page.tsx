"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  User,
  GraduationCap,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Save,
  Shield,
} from "lucide-react";

interface ProfileState {
  fullName: string;
  educationLevel: string;
  degree: string;
  branch: string;
  graduationYear: number;
  currentExperienceLevel: string;
  weeklyLearningHours: number;
  targetRoles: string[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileState>({
    fullName: "",
    educationLevel: "Undergraduate",
    degree: "B.Tech",
    branch: "Computer Science",
    graduationYear: 2026,
    currentExperienceLevel: "fresher",
    weeklyLearningHours: 10,
    targetRoles: ["Full-Stack Developer"],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setProfile({
            fullName: data.profile.fullName || "",
            educationLevel: data.profile.educationLevel || "Undergraduate",
            degree: data.profile.degree || "B.Tech",
            branch: data.profile.branch || "Computer Science",
            graduationYear: data.profile.graduationYear || 2026,
            currentExperienceLevel: data.profile.currentExperienceLevel || "fresher",
            weeklyLearningHours: data.profile.weeklyLearningHours || 10,
            targetRoles: data.profile.targetRoles || ["Full-Stack Developer"],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Changes saved.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = prompt(
      "Type 'DELETE' to confirm permanent account and data erasure. This action cannot be undone:"
    );
    if (confirmation !== "DELETE") return;

    try {
      const res = await fetch("/api/auth/delete-account", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Your account and personal data have been completely erased.");
        router.push("/login");
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          Profile & Account Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your academic background, career goals, weekly study commitment, and privacy rights.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {/* Profile Form */}
      <form
        onSubmit={handleSave}
        className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-5"
      >
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <User className="w-4 h-4 text-blue-600" />
          Personal & Academic Profile
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Degree & Program
            </label>
            <input
              type="text"
              value={profile.degree}
              onChange={(e) => setProfile({ ...profile, degree: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Branch / Department
            </label>
            <input
              type="text"
              value={profile.branch}
              onChange={(e) => setProfile({ ...profile, branch: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Graduation Year
            </label>
            <input
              type="number"
              value={profile.graduationYear}
              onChange={(e) => setProfile({ ...profile, graduationYear: parseInt(e.target.value, 10) })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Weekly Learning Availability (Hours)
            </label>
            <input
              type="number"
              min={2}
              max={60}
              value={profile.weeklyLearningHours}
              onChange={(e) => setProfile({ ...profile, weeklyLearningHours: parseInt(e.target.value, 10) })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Experience Level
            </label>
            <select
              value={profile.currentExperienceLevel}
              onChange={(e) => setProfile({ ...profile, currentExperienceLevel: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fresher">Fresher / Undergraduate Student</option>
              <option value="intern">Internship Completed</option>
              <option value="junior">Junior Developer (0-2 Yrs)</option>
              <option value="mid">Mid-level (2+ Yrs)</option>
            </select>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>

      {/* Data Privacy & Compliance Portal */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Shield className="w-4 h-4 text-emerald-600" />
          Data Rights & Security
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80">
          <div>
            <h3 className="font-semibold text-xs text-slate-900 dark:text-white">
              Export Candidate Archive (JSON)
            </h3>
            <p className="text-[11px] text-slate-500">
              Download a complete JSON export of your profile, parsed resumes, ATS analyses, and roadmaps.
            </p>
          </div>
          <a
            href="/api/auth/export-data"
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900">
          <div>
            <h3 className="font-semibold text-xs text-rose-900 dark:text-rose-200">
              Permanently Delete Account & Data
            </h3>
            <p className="text-[11px] text-rose-700 dark:text-rose-400">
              Irrevocably erase your user account, uploaded resumes, analysis logs, and roadmaps.
            </p>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
