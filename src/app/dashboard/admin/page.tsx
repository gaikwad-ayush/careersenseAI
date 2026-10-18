"use client";

import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Database,
  Layers,
} from "lucide-react";

interface RoleRecord {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  experienceLevel: string;
  requiredSkills: string[];
  preferredSkills: string[];
  version: string;
  source: string;
}

export default function AdminCatalogPage() {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // New role form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Product & Strategy");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [preferredSkills, setPreferredSkills] = useState("");

  const loadRoles = () => {
    setLoading(true);
    fetch("/api/admin/roles")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or forbidden");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setRoles(data.roles || []);
        } else {
          setError(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    setMessage(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        loadRoles();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSeeding(false);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const reqArr = requiredSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const prefArr = preferredSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          description,
          requiredSkills: reqArr,
          preferredSkills: prefArr,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Role "${title}" added to verified catalog.`);
        setTitle("");
        setDescription("");
        setRequiredSkills("");
        setPreferredSkills("");
        loadRoles();
      } else {
        setError(data.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error creating role");
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            Administrative Role Catalog Manager
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Maintain versioned career benchmarks and verified industry skill requirements.
          </p>
        </div>

        <button
          onClick={handleSeed}
          disabled={seeding}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs shadow-sm"
        >
          <Database className="w-4 h-4" />
          <span>{seeding ? "Syncing..." : "Sync Seed Catalog"}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Add Role Form */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Plus className="w-4 h-4 text-blue-600" />
          Register New Verified Career Role
        </h2>

        <form onSubmit={handleCreateRole} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Systems Architect"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of responsibilities and scope..."
              rows={2}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Required Skills (Comma separated)
              </label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="Python, PyTorch, Docker, Git"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Skills (Comma separated)
              </label>
              <input
                type="text"
                value={preferredSkills}
                onChange={(e) => setPreferredSkills(e.target.value)}
                placeholder="FastAPI, Kubernetes, AWS"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
            >
              Add Role to Catalog
            </button>
          </div>
        </form>
      </div>

      {/* Role Catalog Table */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          Active Verified Role Catalog ({roles.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-3">Role Title</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Required Skills</th>
                <th className="py-3 px-3">Version</th>
                <th className="py-3 px-3">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {roles.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{r.title}</td>
                  <td className="py-3 px-3 text-slate-500">{r.category}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                    {r.requiredSkills.join(", ")}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{r.version}</td>
                  <td className="py-3 px-3 capitalize text-slate-500">{r.experienceLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
