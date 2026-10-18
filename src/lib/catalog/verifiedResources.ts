import { IResource } from "../db/models/LearningRoadmap";

export const VERIFIED_RESOURCE_CATALOG: Record<string, IResource[]> = {
  JavaScript: [
    {
      title: "MDN Web Docs: JavaScript Fundamentals",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      provider: "MDN",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "freeCodeCamp: JavaScript Algorithms and Data Structures",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      provider: "freeCodeCamp",
      type: "interactive",
      isVerified: true,
    },
  ],
  TypeScript: [
    {
      title: "Official TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/handbook/intro.html",
      provider: "Microsoft TypeScript",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Execute Program: TypeScript Track",
      url: "https://www.executeprogram.com/courses/typescript",
      provider: "Execute Program",
      type: "interactive",
      isVerified: true,
    },
  ],
  React: [
    {
      title: "React Official Documentation: Quick Start & Learn React",
      url: "https://react.dev/learn",
      provider: "Meta Open Source",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Full Stack Open: Deep Dive into Modern Web Development (React)",
      url: "https://fullstackopen.com/en/part1",
      provider: "University of Helsinki",
      type: "course",
      isVerified: true,
    },
  ],
  "Next.js": [
    {
      title: "Next.js Official Documentation & Foundations Course",
      url: "https://nextjs.org/learn",
      provider: "Vercel",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Node.js": [
    {
      title: "Node.js Official Documentation and Guides",
      url: "https://nodejs.org/en/docs/guides",
      provider: "OpenJS Foundation",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "freeCodeCamp: Back End Development and APIs",
      url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
      provider: "freeCodeCamp",
      type: "interactive",
      isVerified: true,
    },
  ],
  Python: [
    {
      title: "Official Python Tutorial (v3)",
      url: "https://docs.python.org/3/tutorial/index.html",
      provider: "Python Software Foundation",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Harvard CS50P: CS50's Introduction to Programming with Python",
      url: "https://cs50.harvard.edu/python/",
      provider: "Harvard University",
      type: "course",
      isVerified: true,
    },
  ],
  PostgreSQL: [
    {
      title: "PostgreSQL Official Documentation",
      url: "https://www.postgresql.org/docs/current/tutorial.html",
      provider: "The PostgreSQL Global Development Group",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "SQLBolt: Interactive Lessons for SQL",
      url: "https://sqlbolt.com/",
      provider: "SQLBolt",
      type: "interactive",
      isVerified: true,
    },
  ],
  MongoDB: [
    {
      title: "MongoDB Official Manual & University Basics",
      url: "https://www.mongodb.com/docs/manual/tutorial/getting-started/",
      provider: "MongoDB, Inc.",
      type: "documentation",
      isVerified: true,
    },
  ],
  Docker: [
    {
      title: "Docker Official Get Started Guide",
      url: "https://docs.docker.com/get-started/",
      provider: "Docker",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Play with Docker Interactive Lab",
      url: "https://labs.play-with-docker.com/",
      provider: "Docker Community",
      type: "interactive",
      isVerified: true,
    },
  ],
  Kubernetes: [
    {
      title: "Kubernetes Basics & Tutorials",
      url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
      provider: "CNCF",
      type: "documentation",
      isVerified: true,
    },
  ],
  AWS: [
    {
      title: "AWS Fundamentals & Getting Started Resource Center",
      url: "https://aws.amazon.com/getting-started/",
      provider: "Amazon Web Services",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Machine Learning": [
    {
      title: "Google Machine Learning Crash Course",
      url: "https://developers.google.com/machine-learning/crash-course",
      provider: "Google",
      type: "course",
      isVerified: true,
    },
    {
      title: "Scikit-Learn Official User Guide & Tutorials",
      url: "https://scikit-learn.org/stable/user_guide.html",
      provider: "Scikit-learn developers",
      type: "documentation",
      isVerified: true,
    },
  ],
  PyTorch: [
    {
      title: "PyTorch Official Tutorials: Deep Learning with PyTorch",
      url: "https://pytorch.org/tutorials/",
      provider: "PyTorch Foundation",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Data Structures": [
    {
      title: "MIT OpenCourseWare 6.006: Introduction to Algorithms",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/",
      provider: "MIT",
      type: "course",
      isVerified: true,
    },
    {
      title: "Open Data Structures in C++ / Java / Python",
      url: "https://opendatastructures.org/",
      provider: "Pat Morin (Carleton University)",
      type: "documentation",
      isVerified: true,
    },
  ],
  "System Design": [
    {
      title: "The System Design Primer",
      url: "https://github.com/donnemartin/system-design-primer",
      provider: "Open Source (Donne Martin)",
      type: "documentation",
      isVerified: true,
    },
  ],
  Cybersecurity: [
    {
      title: "OWASP Top Ten Web Application Security Risks",
      url: "https://owasp.org/www-project-top-ten/",
      provider: "OWASP Foundation",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Unit Testing": [
    {
      title: "Vitest Official Guide",
      url: "https://vitest.dev/guide/",
      provider: "Vitest Team",
      type: "documentation",
      isVerified: true,
    },
  ],
};

export function getVerifiedResourcesForSkill(skillName: string): IResource[] {
  return (
    VERIFIED_RESOURCE_CATALOG[skillName] || [
      {
        title: `Official Documentation for ${skillName}`,
        url: `https://www.google.com/search?q=${encodeURIComponent(skillName + " official documentation")}`,
        provider: "Official Docs",
        type: "documentation",
        isVerified: false,
      },
    ]
  );
}
