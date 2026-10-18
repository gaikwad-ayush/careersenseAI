import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Sense AI - Career Guidance, Resume Analysis & Skill-Gap Assessment",
  description:
    "Intelligent career guidance and skill-gap assessment platform for students, graduates, and professionals across all career disciplines. Features TF-IDF cosine role matching, ATS resume evaluation, and personalized study roadmaps with verified resources.",
  keywords: [
    "Career Sense AI",
    "Resume Analysis",
    "ATS Readability Score",
    "Skill Gap Assessment",
    "TF-IDF Role Matching",
    "Career Guidance",
    "Personalized Learning Roadmap",
    "Professional Development",
  ],
  authors: [{ name: "Career Sense AI Team" }],
  openGraph: {
    title: "Career Sense AI - Data-Driven Career Guidance for All Paths",
    description:
      "Resume analysis, TF-IDF cosine role matching across 24+ career paths, and personalized learning roadmaps with verified educational resources.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
