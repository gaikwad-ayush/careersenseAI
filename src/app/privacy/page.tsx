import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck, Lock, Trash2, Download } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Data Privacy & Security
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Privacy Policy & Candidate Data Rights
            </h1>
            <p className="mt-2 text-xs text-slate-500">
              Last Updated: October 2025 • Governing Career Sense AI
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                1. Data Minimization & Collection
              </h2>
              <p>
                Career Sense AI collects only the data strictly required to analyze your technical qualifications: email address, password hash (salted using bcrypt), name, educational credentials, uploaded resume documents, and declared learning hours. We do not request financial information, government identity numbers, or biometric data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                2. Resume Document Security & Storage
              </h2>
              <p>
                Uploaded resumes are accessed strictly by authenticated endpoints enforcing per-user ownership verification. Candidate documents are never indexed in public storage buckets, search engines, or third-party web crawlers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                3. Third-Party AI Processing Disclosures
              </h2>
              <p>
                When utilizing the AI Career Coach, sanitized technical queries along with extracted skill context are transmitted to the configured model provider (Google Gemini API). In accordance with enterprise provider terms, API data is not used to train foundation models. Private identifiers (such as phone numbers and physical addresses) are stripped prior to contextual query transmission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                4. Data Portability & Complete Erasure
              </h2>
              <p>
                You retain complete ownership over your data. You may download an exhaustive machine-readable JSON archive of your account records at any time from your Profile & Settings. Clicking &quot;Delete Account&quot; immediately triggers an irreversible cascade deletion purging your user account, uploaded resumes, analysis scores, and roadmaps from MongoDB Atlas.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
