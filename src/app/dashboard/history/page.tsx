"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  History,
  FileText,
  Trash2,
  ExternalLink,
  Calendar,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
} from "lucide-react";

interface ResumeRecord {
  _id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
  analysis: {
    completenessScore: number;
    normalizedSkills: string[];
    weakBulletPoints: Array<unknown>;
  } | null;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = () => {
    setLoading(true);
    fetch("/api/resume/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHistory(data.history || []);
        } else {
          setError(data.error || "Failed to load history");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this resume record and its analysis?")) {
      return;
    }
    try {
      const res = await fetch(`/api/resume/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setHistory(history.filter((h) => h._id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Resume Upload & Analysis History
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review previous versions of your resume, compare ATS score trends, or permanently delete documents.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {item.fileName}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span>{(item.fileSize / 1024).toFixed(1)} KB</span>
                    {item.analysis && (
                      <>
                        <span>•</span>
                        <span>{item.analysis.normalizedSkills.length} skills detected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {item.analysis && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    ATS Score: {item.analysis.completenessScore}%
                  </span>
                )}

                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
          <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            No resume records found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Upload your first resume to inspect ATS feedback and track analysis history.
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
  );
}
