import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Binary, FileSearch, CheckCircle2, ShieldCheck } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Methodology & Technical Transparency
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              How Career Sense AI Works
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
              A comprehensive technical overview of the algorithmic vector models, deterministic extraction algorithms, and scoring criteria powering the system.
            </p>
          </div>

          {/* Section 1 */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                PDF Verification & Serverless Text Extraction
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              When a candidate uploads a resume, the backend checks the file header magic bytes (<code>%PDF-</code> or <code>0x25 0x50 0x44 0x46 0x2D</code>) to guarantee the file is a genuine PDF rather than a renamed executable or corrupted payload. The file is parsed in-memory using a pure TypeScript/JavaScript PDF parser compatible with Vercel serverless functions.
            </p>
          </div>

          {/* Section 2 */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-sm flex items-center justify-center">
                2
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Taxonomy Normalization & Section Segmentation
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Natural language text is matched against a maintainable taxonomy map of canonical engineering technologies and synonyms. For example, entries like <code>k8s</code> are normalized to <code>Kubernetes</code>, <code>ts</code> to <code>TypeScript</code>, and <code>drf</code> to <code>Django</code>. Technologies are categorized into Languages, Frameworks, Databases, Cloud & DevOps, and CS Fundamentals.
            </p>
          </div>

          {/* Section 3 */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 font-bold text-sm flex items-center justify-center">
                3
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                TF-IDF Vector Space Modeling & Cosine Similarity
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              To match candidates to verified role profiles, the engine constructs a Term Frequency-Inverse Document Frequency (TF-IDF) vector space. The formula prevents generic technical terms that appear in every role (like &quot;experience&quot; or &quot;software&quot;) from dominating the score:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs space-y-1.5 border border-slate-200 dark:border-slate-800">
              <p className="text-blue-600 dark:text-blue-400">TF(term, doc) = frequency / doc_length</p>
              <p className="text-blue-600 dark:text-blue-400">IDF(term) = ln(1 + N / (1 + doc_freq)) + 1</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">Cosine_Similarity(u, v) = (u · v) / (||u|| × ||v||)</p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center justify-center">
                4
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Distinction Between Similarity and Hiring Probability
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never fabricate match scores as hiring probability. Real hiring depends on multiple external factors including interview communication, behavioral fit, background checks, and live coding performance. Our Match Score strictly indicates algorithmic text and skill similarity against the role profile requirements.
            </p>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
            >
              <span>Try Career Sense AI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
