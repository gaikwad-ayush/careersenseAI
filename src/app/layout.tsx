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
    "Intelligent career guidance and skill-gap assessment platform for engineering undergraduates and tech job seekers. Features deterministic TF-IDF cosine role matching, ATS resume evaluation, and personalized roadmaps with verified resources.",
  keywords: [
    "Career Sense AI",
    "Resume Analysis",
    "ATS Readability Score",
    "Skill Gap Assessment",
    "TF-IDF Role Matching",
    "Engineering Career Guidance",
    "Personalized Learning Roadmap",
  ],
  authors: [{ name: "Career Sense AI Team" }],
  openGraph: {
    title: "Career Sense AI - Algorithmic Career Guidance for Engineers",
    description:
      "Deterministic resume analysis, TF-IDF cosine role matching, and personalized learning roadmaps with verified educational resources.",
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
