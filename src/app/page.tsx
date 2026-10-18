import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  FileText,
  Target,
  Compass,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Binary,
  Layers,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Built for Engineering Students & Placement Preparation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Deterministic Career Guidance &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Skill-Gap Assessment
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Upload your PDF resume to extract verified skills, diagnose ATS readability, calculate transparent TF-IDF cosine role similarities, and generate realistic learning roadmaps with official educational resources.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 hover:scale-105"
              >
                <span>Analyze Your Resume Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm transition-colors"
              >
                <span>Explore Methodology</span>
              </Link>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Pure Mathematical Matching
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                11 Standardized Tech Roles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Verified Real-World Resources
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Workflow Section */}
      <section className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              The Architecture
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              End-to-End Diagnostic Pipeline
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Every phase executes deterministic logic with strict database persistence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">PDF Ingestion</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Magic byte file signature verification (%PDF-) with pure JavaScript serverless text parsing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">NLP Normalization</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Canonical skill mapping using a versioned taxonomy across 50+ languages, frameworks, and databases.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">TF-IDF Vector Space</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Smooth term frequency-inverse document frequency vectorization and exact cosine angle computation.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Skill-Gap Diagnosis</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Deterministic required coverage % calculation, prerequisite chains, and study hour estimates.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
                5
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Actionable Roadmaps</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Structured phases with verified URLs from MDN, Harvard CS50, and MIT OCW, tracked in MongoDB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical Transparency Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <Binary className="w-3.5 h-3.5 text-indigo-500" />
                <span>Explainable AI Principles</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                No Blackbox Hallucinations. Pure Mathematical Modeling.
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Most career platforms rely entirely on unstructured LLM text generation that hallucinates random scores or invents non-existent courses. Career Sense AI uses rigorous Vector Space Information Retrieval combined with deterministic taxonomy normalization:
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                      TF-IDF Vector Space Matrix
                    </h4>
                    <p className="text-slate-500">
                      Calculates smoothed inverse document frequencies across the verified career role corpus to prevent bias toward common stop words.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">
                      Explicit Coverage vs. Vector Similarity
                    </h4>
                    <p className="text-slate-500">
                      We explicitly differentiate between text cosine similarity and mandatory required skill coverage so students know exactly what they lack.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula Visual Box */}
            <div className="p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-6">
              <h3 className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Mathematical Formulations
              </h3>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 font-mono text-xs space-y-2">
                <p className="text-slate-400 text-[11px]">// Term Frequency</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold">
                  TF(t, d) = count(t in d) / total_tokens(d)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 font-mono text-xs space-y-2">
                <p className="text-slate-400 text-[11px]">// Inverse Document Frequency</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold">
                  IDF(t, D) = ln(1 + |D| / (1 + df(t))) + 1
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 font-mono text-xs space-y-2">
                <p className="text-slate-400 text-[11px]">// Cosine Similarity Angle</p>
                <p className="text-slate-800 dark:text-slate-200 font-bold">
                  cos(theta) = (u . v) / (||u|| * ||v||) * 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Commitment */}
      <section className="py-16 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Student Privacy & Ethical AI Standards
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Resumes contain private personal records. We enforce enterprise-grade data security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Zero Public Storage
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Uploaded resumes are stored with user ownership barriers. No candidate document is ever publicly indexable or exposed to third-party scrapers.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Full Data Portability
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Candidates can export an archive of their entire record history (skills, analyses, roadmaps) as standard JSON at any time.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                Right to Permanent Erasure
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Clicking delete account triggers an immediate cascade delete across all MongoDB collections, permanently purging your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-tr from-blue-700 via-indigo-700 to-blue-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Accelerate Your Placement Preparation?
          </h2>
          <p className="mt-3 text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Diagnose your resume ATS completeness, identify your skill gaps, and begin an achievable learning roadmap today.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-lg shadow-black/10 transition-all hover:scale-105"
            >
              Get Started with Career Sense AI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
