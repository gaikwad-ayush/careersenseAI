import Link from "next/link";
import {
  FileText,
  Compass,
  Target,
  GraduationCap,
  Briefcase,
  Bot,
  Shield,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const FEATURES = [
  {
    icon: FileText,
    title: "Resume Analysis & ATS Diagnostic",
    description:
      "Performs deep text extraction with file signature validation (%PDF-). Evaluates standard section presence, quantifies skill inventory, and identifies weak bullet points starting with passive verbs.",
    badge: "Document NLP",
  },
  {
    icon: Compass,
    title: "TF-IDF Vector Space Role Matching",
    description:
      "Vectorizes candidate experience against 11 standardized industry role specifications to compute smoothed inverse document frequencies and exact cosine angles.",
    badge: "Vector Mathematics",
  },
  {
    icon: Target,
    title: "Deterministic Skill-Gap Assessment",
    description:
      "Pinpoints exact missing technologies, calculates required-skill coverage percentage, and establishes prerequisite chains with realistic study hour estimates.",
    badge: "Gap Diagnosis",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning Roadmaps",
    description:
      "Constructs realistic multi-week schedules tailored to your weekly availability. Links directly to verified resources from Harvard, Google, HubSpot, Figma, Coursera, and official documentation.",
    badge: "Curriculum Generation",
  },
  {
    icon: Briefcase,
    title: "Live Job Market Integration",
    description:
      "Retrieves real-time job postings across all career fields from verified external feeds with real application URLs and publisher metadata. No fake jobs.",
    badge: "Real-Time Openings",
  },
  {
    icon: Bot,
    title: "Grounded AI Career Coach",
    description:
      "Provides contextual interview preparation, skill gap explanations, and resume bullet rewriting grounded strictly in your verified proficiencies and targeted roles.",
    badge: "LLM Mentorship",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Platform Architecture
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Engineered for Scientific Accuracy & Real Results
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every module in Career Sense AI is built with genuine processing logic, database persistence, and transparent algorithmic standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {f.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/30 text-center max-w-2xl mx-auto space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Experience the Full Pipeline
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Upload your PDF resume now to generate role matches and inspect your skill gaps.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 shadow-sm"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
