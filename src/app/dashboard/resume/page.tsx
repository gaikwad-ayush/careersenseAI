"use client";

import { useState, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Plus,
  X,
  FileCheck,
} from "lucide-react";

interface ExtractedSkill {
  name: string;
  category: string;
  source: "explicit" | "inferred";
  confidence: number;
}

interface WeakBullet {
  original: string;
  issue: string;
  recommendation: string;
}

interface AnalysisData {
  _id: string;
  resumeId: string;
  completenessScore: number;
  sectionBreakdown: {
    contact: boolean;
    education: boolean;
    skills: boolean;
    experience: boolean;
    projects: boolean;
    certifications: boolean;
  };
  contactInfo: {
    name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  extractedSkills: ExtractedSkill[];
  normalizedSkills: string[];
  weakBulletPoints: WeakBullet[];
  atsRecommendations: string[];
}

export default function ResumeAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [mode, setMode] = useState<"file" | "paste">("file");
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newSkillInput, setNewSkillInput] = useState("");

  // Load existing analysis on mount
  useEffect(() => {
    fetch("/api/resume/history")
      .then((res) => res.json())
      .then((data) => {
        if (data?.history && data.history.length > 0 && data.history[0].analysis) {
          setAnalysis(data.history[0].analysis);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      if (mode === "file") {
        if (!file) throw new Error("Please select a PDF resume file to upload.");
        formData.append("file", file);
      } else {
        if (pasteText.trim().length < 50) {
          throw new Error("Please paste at least 50 characters of resume text.");
        }
        formData.append("text", pasteText);
      }

      const res = await fetch("/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Resume analysis failed");
      }

      setAnalysis(data.analysis);
      setFile(null);
      setPasteText("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkillInput.trim() || !analysis) return;
    const skillName = newSkillInput.trim();

    const updatedSkills = Array.from(new Set([...analysis.normalizedSkills, skillName]));
    const updatedExtracted = [
      ...analysis.extractedSkills,
      { name: skillName, category: "tools", source: "explicit" as const, confidence: 1.0 },
    ];

    setAnalysis({
      ...analysis,
      normalizedSkills: updatedSkills,
      extractedSkills: updatedExtracted,
    });
    setNewSkillInput("");

    // Sync to profile
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ existingTechnicalSkills: updatedSkills }),
      });
    } catch (e) {
      console.warn("Failed to update profile skills:", e);
    }
  };

  const handleRemoveSkill = async (skillToRemove: string) => {
    if (!analysis) return;
    const updatedSkills = analysis.normalizedSkills.filter((s) => s !== skillToRemove);
    const updatedExtracted = analysis.extractedSkills.filter((s) => s.name !== skillToRemove);

    setAnalysis({
      ...analysis,
      normalizedSkills: updatedSkills,
      extractedSkills: updatedExtracted,
    });

    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ existingTechnicalSkills: updatedSkills }),
      });
    } catch (e) {
      console.warn("Failed to update profile skills:", e);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Resume Analysis
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Upload your PDF to extract skills, get an ATS readability score, and spot weak bullet points.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setMode("file")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                mode === "file"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Upload PDF File
            </button>
            <button
              onClick={() => setMode("paste")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                mode === "paste"
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Paste Text Directly
            </button>
          </div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            Private & Encrypted Upload
          </span>
        </div>

        <form onSubmit={handleUpload}>
          {mode === "file" ? (
            <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="resume-file-input"
              />
              <UploadCloud className="w-10 h-10 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {file ? file.name : "Click or drag & drop your PDF resume here"}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PDF only, up to 5MB.
              </p>
            </div>
          ) : (
            <div>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder="Paste the plain text of your resume here (Education, Skills, Experience, Projects)..."
                rows={7}
                className="w-full p-4 text-xs font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          )}

          {error && (
            <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <div className="mt-4 flex items-center justify-end">
            <button
              type="submit"
              disabled={uploading || (mode === "file" && !file) || (mode === "paste" && !pasteText)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-all disabled:opacity-50 shadow-sm"
            >
              {uploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Parsing & Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Resume</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* ATS Score Card */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Diagnostic Evaluation
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  ATS Completeness Score: {analysis.completenessScore}%
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Scored across: contact info, section headers, skill density, active verb usage, and format clarity.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex items-center justify-center font-bold text-xl text-blue-600 dark:text-blue-400">
                  {analysis.completenessScore}
                </div>
              </div>
            </div>

            {/* Sections Found Breakdown */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Section Header Detection
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
                {Object.entries(analysis.sectionBreakdown).map(([section, detected]) => (
                  <div
                    key={section}
                    className={`p-3 rounded-xl border flex items-center gap-2 capitalize font-medium ${
                      detected
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                        : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400"
                    }`}
                  >
                    {detected ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span>{section}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ATS Recommendations */}
            {analysis.atsRecommendations.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 text-xs">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ATS Optimization Checklist
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-amber-800 dark:text-amber-300">
                  {analysis.atsRecommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Extracted Skills & Taxonomy Normalization */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Skills ({analysis.normalizedSkills.length} detected)
                </h3>
                <p className="text-xs text-slate-500">
                  Extracted from your document and mapped to canonical names. You can add or remove skills here.
                </p>
              </div>

              {/* Add manual skill */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Add skill (e.g. Docker)..."
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  title="Add Skill"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {analysis.extractedSkills.map((skill) => (
                <span
                  key={skill.name}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${
                    skill.source === "explicit"
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] opacity-60">({skill.category})</span>
                  <button
                    onClick={() => handleRemoveSkill(skill.name)}
                    className="hover:text-rose-500 transition-colors ml-1"
                    title="Remove skill"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Weak Bullet Points Diagnostic */}
          {analysis.weakBulletPoints.length > 0 && (
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Experience Bullet Point Diagnostic ({analysis.weakBulletPoints.length} Identified)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Identified bullet points that use passive phrasing or lack measurable impact.
              </p>

              <div className="space-y-3">
                {analysis.weakBulletPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/10 text-xs space-y-1.5"
                  >
                    <p className="font-mono text-slate-800 dark:text-slate-200 bg-white/70 dark:bg-slate-900/70 p-2 rounded border border-slate-200/60 dark:border-slate-800">
                      &quot;{item.original}&quot;
                    </p>
                    <p className="text-amber-800 dark:text-amber-300 font-semibold">
                      Issue: {item.issue}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                      Recommendation: {item.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
