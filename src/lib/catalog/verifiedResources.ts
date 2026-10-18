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

  // Finance & Accounting
  "Financial Modeling": [
    {
      title: "Corporate Finance Institute (CFI): Financial Modeling Fundamentals",
      url: "https://corporatefinanceinstitute.com/resources/financial-modeling/",
      provider: "Corporate Finance Institute",
      type: "course",
      isVerified: true,
    },
    {
      title: "Wall Street Prep: Building a 3-Statement Financial Model",
      url: "https://www.wallstreetprep.com/knowledge/financial-modeling/",
      provider: "Wall Street Prep",
      type: "interactive",
      isVerified: true,
    },
  ],
  Valuation: [
    {
      title: "Damodaran Online: Corporate Finance & Valuation Lectures",
      url: "https://pages.stern.nyu.edu/~adamodar/",
      provider: "NYU Stern (Aswath Damodaran)",
      type: "course",
      isVerified: true,
    },
  ],
  "Financial Analysis": [
    {
      title: "Khan Academy: Finance and Capital Markets",
      url: "https://www.khanacademy.org/economics-finance-domain/core-finance",
      provider: "Khan Academy",
      type: "course",
      isVerified: true,
    },
  ],
  Accounting: [
    {
      title: "AccountingCoach: Free Accounting Principles & Concepts",
      url: "https://www.accountingcoach.com/",
      provider: "AccountingCoach",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Microsoft Excel": [
    {
      title: "Microsoft Learn: Excel Video Training & Formulas",
      url: "https://support.microsoft.com/en-us/office/excel-video-training-9bc05390-e94c-46af-a5b3-d7c22f6990bb",
      provider: "Microsoft",
      type: "interactive",
      isVerified: true,
    },
    {
      title: "Exceljet: Excel Formulas and Shortcuts Library",
      url: "https://exceljet.net/",
      provider: "Exceljet",
      type: "documentation",
      isVerified: true,
    },
  ],

  // Marketing & Growth
  "Search Engine Optimization": [
    {
      title: "Google Search Central: SEO Starter Guide",
      url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
      provider: "Google",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Moz: The Beginner's Guide to SEO",
      url: "https://moz.com/beginners-guide-to-seo",
      provider: "Moz",
      type: "course",
      isVerified: true,
    },
  ],
  "Performance Marketing": [
    {
      title: "Google Skillshop: Google Ads Search Certification",
      url: "https://skillshop.withgoogle.com/",
      provider: "Google",
      type: "course",
      isVerified: true,
    },
    {
      title: "Meta Blueprint: Performance Marketing & Ad Campaigns",
      url: "https://www.facebook.com/business/learn",
      provider: "Meta",
      type: "course",
      isVerified: true,
    },
  ],
  "Google Analytics": [
    {
      title: "Google Analytics 4 (GA4) Certification Training",
      url: "https://skillshop.docebosaas.com/learn/course/internal/view/elearning/109/google-analytics-certification",
      provider: "Google",
      type: "course",
      isVerified: true,
    },
  ],
  "Content Marketing": [
    {
      title: "HubSpot Academy: Content Marketing Certification",
      url: "https://academy.hubspot.com/courses/content-marketing",
      provider: "HubSpot Academy",
      type: "course",
      isVerified: true,
    },
  ],
  Copywriting: [
    {
      title: "Copyblogger: Copywriting 101 - How to Craft Compelling Copy",
      url: "https://copyblogger.com/copywriting-101/",
      provider: "Copyblogger",
      type: "documentation",
      isVerified: true,
    },
  ],

  // Design & Creative
  "UI Design": [
    {
      title: "Refactoring UI: Practical Design Guidelines for Digital Products",
      url: "https://www.refactoringui.com/",
      provider: "Adam Wathan & Steve Schoger",
      type: "documentation",
      isVerified: true,
    },
  ],
  "UX Research": [
    {
      title: "Nielsen Norman Group: UX Research Articles & Heuristics",
      url: "https://www.nngroup.com/articles/",
      provider: "Nielsen Norman Group",
      type: "documentation",
      isVerified: true,
    },
  ],
  Figma: [
    {
      title: "Figma Learn: Video Tutorials & Getting Started Track",
      url: "https://help.figma.com/hc/en-us/categories/360002042553-Figma-design",
      provider: "Figma",
      type: "interactive",
      isVerified: true,
    },
  ],

  // Product & Strategy
  "Product Management": [
    {
      title: "Product School: The Ultimate Product Management Guide",
      url: "https://productschool.com/blog/product-management-2/",
      provider: "Product School",
      type: "documentation",
      isVerified: true,
    },
    {
      title: "Mind the Product: Best Practice Product Guides & Frameworks",
      url: "https://www.mindtheproduct.com/",
      provider: "Mind the Product",
      type: "course",
      isVerified: true,
    },
  ],
  "Agile Methodology": [
    {
      title: "Atlassian Agile Coach: The Agile Guide to Scrum & Kanban",
      url: "https://www.atlassian.com/agile",
      provider: "Atlassian",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Business Analysis": [
    {
      title: "IIBA KnowledgeHub: Core Business Analysis Standard",
      url: "https://www.iiba.org/career-resources/a-guide-to-the-business-analysis-body-of-knowledge-babok-guide/",
      provider: "IIBA",
      type: "documentation",
      isVerified: true,
    },
  ],

  // Sales & Business Development
  "B2B Sales": [
    {
      title: "HubSpot Academy: Inbound Sales Certification Course",
      url: "https://academy.hubspot.com/courses/inbound-sales",
      provider: "HubSpot Academy",
      type: "course",
      isVerified: true,
    },
  ],
  Salesforce: [
    {
      title: "Salesforce Trailhead: Administrator & Sales Fundamentals",
      url: "https://trailhead.salesforce.com/",
      provider: "Salesforce",
      type: "interactive",
      isVerified: true,
    },
  ],

  // Human Resources & People
  "Talent Acquisition": [
    {
      title: "LinkedIn Talent Solutions: Sourcing & Recruitment Best Practices",
      url: "https://business.linkedin.com/talent-solutions/resources",
      provider: "LinkedIn",
      type: "documentation",
      isVerified: true,
    },
  ],
  "Employee Relations": [
    {
      title: "SHRM: Human Resources Foundation & Policy Guidelines",
      url: "https://www.shrm.org/resourcesandtools/",
      provider: "SHRM",
      type: "documentation",
      isVerified: true,
    },
  ],

  // Operations & Logistics
  "Operations Management": [
    {
      title: "Coursera: Operations Management & Process Analysis (Wharton)",
      url: "https://www.coursera.org/learn/wharton-operations",
      provider: "University of Pennsylvania (Wharton)",
      type: "course",
      isVerified: true,
    },
  ],
  "Process Optimization": [
    {
      title: "ASQ: Lean and Six Sigma Fundamentals & Tools",
      url: "https://asq.org/quality-resources/six-sigma",
      provider: "American Society for Quality",
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
