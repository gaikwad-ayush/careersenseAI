"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Compass,
  Target,
  GraduationCap,
  Briefcase,
  Bot,
  History,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/resume", label: "Resume Analysis", icon: FileText },
  { href: "/dashboard/roles", label: "Role Matching", icon: Compass },
  { href: "/dashboard/skills", label: "Skill-Gap Analysis", icon: Target },
  { href: "/dashboard/roadmap", label: "Learning Roadmap", icon: GraduationCap },
  { href: "/dashboard/jobs", label: "Live Job Search", icon: Briefcase },
  { href: "/dashboard/assistant", label: "AI Career Coach", icon: Bot },
  { href: "/dashboard/history", label: "Analysis History", icon: History },
  { href: "/dashboard/profile", label: "Profile & Settings", icon: Settings },
  { href: "/dashboard/admin", label: "Catalog Manager", icon: ShieldAlert, adminOnly: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string; fullName?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.authenticated) {
          setUser({
            email: data.user.email,
            role: data.user.role,
            fullName: data.profile?.fullName,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading Career Sense AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">Career Sense AI</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-white dark:bg-slate-900/90 border-r border-slate-200 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="hidden md:flex items-center gap-2.5 px-6 h-16 border-b border-slate-100 dark:border-slate-800/60">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                Career Sense <span className="text-blue-600 dark:text-blue-400">AI</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              if (item.adminOnly && user?.role !== "admin") return null;
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-sm shadow-blue-500/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer in Sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60">
          <div className="flex items-center justify-between gap-2 px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 mb-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-slate-900 dark:text-white">
                {user?.fullName || "Candidate"}
              </p>
              <p className="text-[11px] truncate text-slate-500 dark:text-slate-400">{user?.email}</p>
            </div>
            {user?.role === "admin" && (
              <span className="shrink-0 px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Admin
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
