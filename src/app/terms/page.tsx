import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Legal Terms
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-1">
              Terms of Service
            </h1>
            <p className="mt-2 text-xs text-slate-500">
              Effective Date: October 2025 • Career Sense AI Platform
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed shadow-sm">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account or uploading documents to Career Sense AI, you agree to these Terms of Service. If you do not agree with any provision, please do not use the application.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                2. Algorithmic Match Scores Are Not Hiring Guarantees
              </h2>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                The TF-IDF cosine similarity score and required-skill coverage percentages calculated by Career Sense AI are objective, mathematical measurements of resume text similarity against verified role profiles. Under no circumstances should they be construed as employment offers, hiring guarantees, or legal representations of candidacy.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                3. Acceptable Use
              </h2>
              <p>
                You agree to upload only legitimate academic and professional resume documents that you have lawful authority to provide. You agree not to upload malicious payloads, automated spam, or executable binaries disguised as documents.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                4. Third-Party Job Listings & External Resources
              </h2>
              <p>
                Links to live job listings and educational resources (such as MDN, freeCodeCamp, MIT OCW, and Harvard CS50) lead to third-party domains. Career Sense AI does not administer third-party application processes or course enrollments.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
