import Link from "next/link";
import { Sparkles, Shield, Cpu, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950/70 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 dark:text-white">
                Career Sense <span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Algorithmic career guidance, resume ATS diagnostic analysis, and deterministic skill-gap assessment for engineering undergraduates and job seekers.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/dashboard/resume" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Resume ATS Analysis
                </Link>
              </li>
              <li>
                <Link href="/dashboard/roles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  TF-IDF Role Matching
                </Link>
              </li>
              <li>
                <Link href="/dashboard/skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Skill-Gap Diagnosis
                </Link>
              </li>
              <li>
                <Link href="/dashboard/roadmap" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Personalized Roadmaps
                </Link>
              </li>
              <li>
                <Link href="/dashboard/jobs" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Live Job Discovery
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Methodology */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Methodology & Standards
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  TF-IDF Vector Formulation
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Skill Taxonomy Standards
                </Link>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">IEEE/ACM Curriculum Mappings</span>
              </li>
              <li>
                <span className="text-slate-400 dark:text-slate-500">Google Gemini API Integration</span>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Privacy & Governance
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy & Data Rights
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Data Export & Erasure Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 Career Sense AI. Built for engineering graduates.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            Algorithmic similarity does not guarantee employment offers. Powered by deterministic vector mathematics.
          </p>
        </div>
      </div>
    </footer>
  );
}
