export interface SkillDefinition {
  canonical: string;
  category:
    | "languages"
    | "frameworks"
    | "databases"
    | "cloud_devops"
    | "tools"
    | "fundamentals"
    | "soft_skills"
    | "business_management"
    | "marketing_sales"
    | "design_creative"
    | "finance_accounting"
    | "operations_logistics";
  synonyms: string[];
  relatedSkills?: string[];
}

export const SKILL_TAXONOMY: SkillDefinition[] = [
  // Programming Languages
  {
    canonical: "Python",
    category: "languages",
    synonyms: ["python", "py", "python3", "python 3"],
    relatedSkills: ["Django", "FastAPI", "Flask", "Pandas"],
  },
  {
    canonical: "JavaScript",
    category: "languages",
    synonyms: ["javascript", "js", "ecmascript", "es6", "es6+"],
    relatedSkills: ["TypeScript", "Node.js", "React"],
  },
  {
    canonical: "TypeScript",
    category: "languages",
    synonyms: ["typescript", "ts"],
    relatedSkills: ["JavaScript", "React", "Next.js", "Node.js"],
  },
  {
    canonical: "Java",
    category: "languages",
    synonyms: ["java", "core java", "java 8", "java 17", "java 21"],
    relatedSkills: ["Spring Boot", "Kotlin", "Hibernate"],
  },
  {
    canonical: "C++",
    category: "languages",
    synonyms: ["c++", "cpp", "c plus plus"],
    relatedSkills: ["C", "Data Structures", "Algorithms"],
  },
  {
    canonical: "C",
    category: "languages",
    synonyms: ["c language", "ansi c"],
    relatedSkills: ["C++", "Embedded Systems"],
  },
  {
    canonical: "C#",
    category: "languages",
    synonyms: ["c#", "csharp", "c sharp", ".net"],
    relatedSkills: ["ASP.NET Core", "Entity Framework"],
  },
  {
    canonical: "Go",
    category: "languages",
    synonyms: ["golang", "go language"],
    relatedSkills: ["Kubernetes", "Docker", "Microservices"],
  },
  {
    canonical: "Rust",
    category: "languages",
    synonyms: ["rust", "rustlang"],
    relatedSkills: ["WebAssembly", "Systems Programming"],
  },
  {
    canonical: "SQL",
    category: "languages",
    synonyms: ["sql", "structured query language", "t-sql", "pl/sql"],
    relatedSkills: ["PostgreSQL", "MySQL", "Database Design"],
  },
  {
    canonical: "HTML5",
    category: "languages",
    synonyms: ["html", "html5", "semantic html"],
    relatedSkills: ["CSS3", "JavaScript"],
  },
  {
    canonical: "CSS3",
    category: "languages",
    synonyms: ["css", "css3", "vanilla css", "flexbox", "css grid"],
    relatedSkills: ["Tailwind CSS", "SASS", "HTML5"],
  },

  // Frameworks & Libraries
  {
    canonical: "React",
    category: "frameworks",
    synonyms: ["react", "react.js", "reactjs"],
    relatedSkills: ["Next.js", "Redux", "TypeScript"],
  },
  {
    canonical: "Next.js",
    category: "frameworks",
    synonyms: ["next.js", "nextjs", "next"],
    relatedSkills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    canonical: "Node.js",
    category: "frameworks",
    synonyms: ["node.js", "nodejs", "node"],
    relatedSkills: ["Express.js", "JavaScript", "TypeScript"],
  },
  {
    canonical: "Express.js",
    category: "frameworks",
    synonyms: ["express", "express.js", "expressjs"],
    relatedSkills: ["Node.js", "REST APIs"],
  },
  {
    canonical: "Django",
    category: "frameworks",
    synonyms: ["django", "django rest framework", "drf"],
    relatedSkills: ["Python", "PostgreSQL"],
  },
  {
    canonical: "FastAPI",
    category: "frameworks",
    synonyms: ["fastapi", "fast api"],
    relatedSkills: ["Python", "REST APIs", "Pydantic"],
  },
  {
    canonical: "Spring Boot",
    category: "frameworks",
    synonyms: ["spring boot", "springboot", "spring framework", "spring"],
    relatedSkills: ["Java", "Hibernate", "Microservices"],
  },
  {
    canonical: "Tailwind CSS",
    category: "frameworks",
    synonyms: ["tailwind", "tailwindcss", "tailwind-css"],
    relatedSkills: ["CSS3", "React"],
  },
  {
    canonical: "Vue.js",
    category: "frameworks",
    synonyms: ["vue", "vue.js", "vuejs", "vue3"],
    relatedSkills: ["Nuxt.js", "JavaScript"],
  },
  {
    canonical: "Angular",
    category: "frameworks",
    synonyms: ["angular", "angularjs", "angular 2+"],
    relatedSkills: ["TypeScript", "RxJS"],
  },

  // Databases
  {
    canonical: "PostgreSQL",
    category: "databases",
    synonyms: ["postgresql", "postgres", "psql"],
    relatedSkills: ["SQL", "Relational Databases"],
  },
  {
    canonical: "MongoDB",
    category: "databases",
    synonyms: ["mongodb", "mongo", "mongoose", "nosql"],
    relatedSkills: ["Node.js", "Express.js"],
  },
  {
    canonical: "MySQL",
    category: "databases",
    synonyms: ["mysql", "mariadb"],
    relatedSkills: ["SQL", "Relational Databases"],
  },
  {
    canonical: "Redis",
    category: "databases",
    synonyms: ["redis", "in-memory cache", "caching"],
    relatedSkills: ["Backend Architecture", "System Design"],
  },

  // Cloud & DevOps
  {
    canonical: "AWS",
    category: "cloud_devops",
    synonyms: ["aws", "amazon web services", "ec2", "s3", "aws lambda"],
    relatedSkills: ["Cloud Computing", "Docker"],
  },
  {
    canonical: "Docker",
    category: "cloud_devops",
    synonyms: ["docker", "containerization", "containers", "dockerfile", "docker-compose"],
    relatedSkills: ["Kubernetes", "CI/CD"],
  },
  {
    canonical: "Kubernetes",
    category: "cloud_devops",
    synonyms: ["kubernetes", "k8s", "container orchestration"],
    relatedSkills: ["Docker", "Cloud Computing"],
  },
  {
    canonical: "CI/CD",
    category: "cloud_devops",
    synonyms: ["ci/cd", "continuous integration", "continuous deployment", "github actions", "gitlab ci", "jenkins"],
    relatedSkills: ["DevOps", "Docker"],
  },
  {
    canonical: "Linux",
    category: "cloud_devops",
    synonyms: ["linux", "ubuntu", "bash", "shell scripting", "unix"],
    relatedSkills: ["DevOps", "Operating Systems"],
  },
  {
    canonical: "Git",
    category: "tools",
    synonyms: ["git", "github", "gitlab", "version control"],
    relatedSkills: ["Collaboration", "Software Engineering"],
  },

  // Data Science & AI/ML
  {
    canonical: "Machine Learning",
    category: "fundamentals",
    synonyms: ["machine learning", "ml", "supervised learning", "unsupervised learning"],
    relatedSkills: ["Python", "Scikit-Learn", "Deep Learning"],
  },
  {
    canonical: "Deep Learning",
    category: "fundamentals",
    synonyms: ["deep learning", "neural networks", "cnn", "rnn", "transformers"],
    relatedSkills: ["PyTorch", "TensorFlow"],
  },
  {
    canonical: "PyTorch",
    category: "frameworks",
    synonyms: ["pytorch", "torch"],
    relatedSkills: ["Deep Learning", "Python"],
  },
  {
    canonical: "TensorFlow",
    category: "frameworks",
    synonyms: ["tensorflow", "tf", "keras"],
    relatedSkills: ["Deep Learning", "Python"],
  },
  {
    canonical: "Pandas",
    category: "tools",
    synonyms: ["pandas", "dataframe analysis"],
    relatedSkills: ["Python", "NumPy", "Data Analysis"],
  },
  {
    canonical: "NumPy",
    category: "tools",
    synonyms: ["numpy", "numerical python"],
    relatedSkills: ["Python", "Data Analysis"],
  },

  // CS Fundamentals & Architecture
  {
    canonical: "Data Structures",
    category: "fundamentals",
    synonyms: ["data structures", "dsa", "arrays", "trees", "graphs", "linked lists"],
    relatedSkills: ["Algorithms", "Problem Solving"],
  },
  {
    canonical: "Algorithms",
    category: "fundamentals",
    synonyms: ["algorithms", "algorithmic problem solving", "dynamic programming", "sorting"],
    relatedSkills: ["Data Structures", "C++", "Java", "Python"],
  },
  {
    canonical: "System Design",
    category: "fundamentals",
    synonyms: ["system design", "distributed systems", "high availability", "scalability"],
    relatedSkills: ["Microservices", "REST APIs", "Redis"],
  },
  {
    canonical: "REST APIs",
    category: "fundamentals",
    synonyms: ["rest", "restful api", "rest api", "restful services", "api development"],
    relatedSkills: ["Node.js", "Express.js", "FastAPI"],
  },
  {
    canonical: "Object-Oriented Programming",
    category: "fundamentals",
    synonyms: ["oop", "oops", "object oriented programming", "encapsulation", "polymorphism"],
    relatedSkills: ["Java", "C++", "Design Patterns"],
  },

  // Testing & QA
  {
    canonical: "Unit Testing",
    category: "tools",
    synonyms: ["unit testing", "tdd", "test driven development", "jest", "vitest", "pytest", "junit"],
    relatedSkills: ["Software Quality", "Automation"],
  },
  {
    canonical: "Cybersecurity",
    category: "fundamentals",
    synonyms: ["cybersecurity", "information security", "infosec", "network security", "owasp"],
    relatedSkills: ["Cryptography", "Linux"],
  },

  // Soft Skills
  {
    canonical: "Problem Solving",
    category: "soft_skills",
    synonyms: ["problem solving", "analytical thinking", "debugging"],
    relatedSkills: ["Algorithms"],
  },
  {
    canonical: "Team Collaboration",
    category: "soft_skills",
    synonyms: ["teamwork", "team collaboration", "cross-functional collaboration", "cross-functional teams"],
    relatedSkills: ["Agile Methodology", "Leadership"],
  },

  // Finance & Accounting
  {
    canonical: "Financial Modeling",
    category: "finance_accounting",
    synonyms: ["financial modeling", "financial model", "dcf modeling", "3-statement model", "projections"],
    relatedSkills: ["Valuation", "Microsoft Excel", "Financial Analysis"],
  },
  {
    canonical: "Valuation",
    category: "finance_accounting",
    synonyms: ["valuation", "dcf", "discounted cash flow", "comparable company analysis", "precedent transactions"],
    relatedSkills: ["Financial Modeling", "Corporate Finance"],
  },
  {
    canonical: "Financial Analysis",
    category: "finance_accounting",
    synonyms: ["financial analysis", "p&l analysis", "ratio analysis", "variance analysis", "financial statements"],
    relatedSkills: ["Financial Modeling", "Accounting", "Microsoft Excel"],
  },
  {
    canonical: "Corporate Finance",
    category: "finance_accounting",
    synonyms: ["corporate finance", "capital budgeting", "working capital", "npv", "irr", "wacc"],
    relatedSkills: ["Valuation", "Financial Analysis"],
  },
  {
    canonical: "Accounting",
    category: "finance_accounting",
    synonyms: ["accounting", "financial accounting", "gaap", "ifrs", "general ledger", "balance sheet", "journal entries"],
    relatedSkills: ["Financial Analysis", "QuickBooks"],
  },
  {
    canonical: "Budgeting & Forecasting",
    category: "finance_accounting",
    synonyms: ["budgeting", "financial forecasting", "budget management", "opex", "capex", "run rate"],
    relatedSkills: ["Financial Analysis", "Microsoft Excel"],
  },
  {
    canonical: "QuickBooks",
    category: "tools",
    synonyms: ["quickbooks", "quickbooks online", "qbo", "xero", "bookkeeping software"],
    relatedSkills: ["Accounting"],
  },
  {
    canonical: "Microsoft Excel",
    category: "tools",
    synonyms: ["excel", "ms excel", "spreadsheets", "vlookup", "index match", "pivot tables", "xlookup", "google sheets"],
    relatedSkills: ["Financial Modeling", "Data Analysis", "Financial Analysis"],
  },
  {
    canonical: "Risk Management",
    category: "finance_accounting",
    synonyms: ["risk management", "credit risk", "market risk", "risk assessment", "compliance risk", "internal controls"],
    relatedSkills: ["Financial Analysis", "Corporate Finance"],
  },

  // Marketing & Growth
  {
    canonical: "Search Engine Optimization",
    category: "marketing_sales",
    synonyms: ["seo", "search engine optimization", "organic search", "on-page seo", "technical seo", "backlinks", "keyword research"],
    relatedSkills: ["Google Analytics", "Content Marketing"],
  },
  {
    canonical: "Performance Marketing",
    category: "marketing_sales",
    synonyms: ["performance marketing", "paid ads", "google ads", "meta ads", "facebook ads", "ppc", "roas", "cac", "media buying"],
    relatedSkills: ["Google Analytics", "A/B Testing"],
  },
  {
    canonical: "Content Marketing",
    category: "marketing_sales",
    synonyms: ["content marketing", "content strategy", "editorial calendar", "blogging", "thought leadership"],
    relatedSkills: ["Copywriting", "Search Engine Optimization"],
  },
  {
    canonical: "Copywriting",
    category: "marketing_sales",
    synonyms: ["copywriting", "copy writer", "ad copy", "landing page copy", "sales copy", "conversion copywriting"],
    relatedSkills: ["Content Marketing", "Written Communication"],
  },
  {
    canonical: "Social Media Strategy",
    category: "marketing_sales",
    synonyms: ["social media", "social media marketing", "smm", "community management", "linkedin marketing", "instagram growth"],
    relatedSkills: ["Content Marketing", "Brand Strategy"],
  },
  {
    canonical: "Email Marketing",
    category: "marketing_sales",
    synonyms: ["email marketing", "email campaigns", "newsletter", "klaviyo", "mailchimp", "drip campaigns", "email automation"],
    relatedSkills: ["Copywriting", "HubSpot"],
  },
  {
    canonical: "Google Analytics",
    category: "tools",
    synonyms: ["google analytics", "ga4", "web analytics", "event tracking", "utm tracking", "traffic analysis"],
    relatedSkills: ["Search Engine Optimization", "Data Analysis"],
  },
  {
    canonical: "Brand Strategy",
    category: "marketing_sales",
    synonyms: ["brand strategy", "brand positioning", "branding", "brand identity", "brand messaging", "value proposition"],
    relatedSkills: ["Content Marketing", "Market Research"],
  },
  {
    canonical: "Market Research",
    category: "marketing_sales",
    synonyms: ["market research", "customer discovery", "competitor analysis", "market sizing", "tam sam som", "user surveys"],
    relatedSkills: ["Business Analysis", "Brand Strategy"],
  },
  {
    canonical: "HubSpot",
    category: "tools",
    synonyms: ["hubspot", "hubspot crm", "inbound marketing", "crm automation"],
    relatedSkills: ["Email Marketing", "Sales Development"],
  },

  // Design & Creative
  {
    canonical: "UI Design",
    category: "design_creative",
    synonyms: ["ui design", "user interface design", "visual design", "ui/ux", "interface design", "layout design"],
    relatedSkills: ["Figma", "Design Systems", "UX Research"],
  },
  {
    canonical: "UX Research",
    category: "design_creative",
    synonyms: ["ux research", "user research", "usability testing", "user testing", "user personas", "journey mapping", "heuristic evaluation"],
    relatedSkills: ["UI Design", "Wireframing"],
  },
  {
    canonical: "Figma",
    category: "tools",
    synonyms: ["figma", "figjam", "figma components", "auto layout", "figma prototyping"],
    relatedSkills: ["UI Design", "Prototyping", "Design Systems"],
  },
  {
    canonical: "Wireframing",
    category: "design_creative",
    synonyms: ["wireframing", "wireframes", "low-fidelity mockups", "information architecture", "user flows", "balsamiq"],
    relatedSkills: ["UI Design", "Figma", "UX Research"],
  },
  {
    canonical: "Prototyping",
    category: "design_creative",
    synonyms: ["prototyping", "interactive prototypes", "clickable prototypes", "micro-interactions"],
    relatedSkills: ["Figma", "UI Design"],
  },
  {
    canonical: "Design Systems",
    category: "design_creative",
    synonyms: ["design systems", "design system", "design tokens", "component libraries", "style guide"],
    relatedSkills: ["Figma", "UI Design"],
  },
  {
    canonical: "Adobe Illustrator",
    category: "tools",
    synonyms: ["illustrator", "adobe illustrator", "vector graphics", "vector illustration", "logo design"],
    relatedSkills: ["UI Design", "Adobe Photoshop"],
  },
  {
    canonical: "Adobe Photoshop",
    category: "tools",
    synonyms: ["photoshop", "adobe photoshop", "image editing", "photo manipulation", "visual assets"],
    relatedSkills: ["Adobe Illustrator", "UI Design"],
  },

  // Product & Project Management
  {
    canonical: "Product Management",
    category: "business_management",
    synonyms: ["product management", "product strategy", "product lifecycle", "prd", "feature prioritization", "product discovery"],
    relatedSkills: ["Agile Methodology", "User Stories", "Stakeholder Management"],
  },
  {
    canonical: "Agile Methodology",
    category: "business_management",
    synonyms: ["agile", "agile methodology", "agile frameworks", "sprint planning", "retrospectives", "standups"],
    relatedSkills: ["Scrum", "Jira", "Product Management"],
  },
  {
    canonical: "Scrum",
    category: "business_management",
    synonyms: ["scrum", "scrum master", "scrum framework", "sprint backlog", "burndown chart"],
    relatedSkills: ["Agile Methodology", "Jira"],
  },
  {
    canonical: "Jira",
    category: "tools",
    synonyms: ["jira", "atlassian jira", "confluence", "trello", "jira software", "issue tracking"],
    relatedSkills: ["Agile Methodology", "Scrum"],
  },
  {
    canonical: "User Stories",
    category: "business_management",
    synonyms: ["user stories", "acceptance criteria", "epic breakdown", "product backlog", "story mapping"],
    relatedSkills: ["Product Management", "Agile Methodology"],
  },
  {
    canonical: "Stakeholder Management",
    category: "business_management",
    synonyms: ["stakeholder management", "cross-functional alignment", "executive communication", "client management"],
    relatedSkills: ["Leadership", "Written Communication"],
  },
  {
    canonical: "Business Analysis",
    category: "business_management",
    synonyms: ["business analysis", "requirements gathering", "process modeling", "bpmn", "gap analysis", "functional requirements"],
    relatedSkills: ["Product Management", "Stakeholder Management", "Data Analysis"],
  },

  // Sales & Business Development
  {
    canonical: "Sales Development",
    category: "marketing_sales",
    synonyms: ["sales development", "sdr", "bdr", "lead generation", "cold outreach", "prospecting", "lead qualification"],
    relatedSkills: ["Salesforce", "B2B Sales", "HubSpot"],
  },
  {
    canonical: "Salesforce",
    category: "tools",
    synonyms: ["salesforce", "sfdc", "salesforce crm", "crm pipeline"],
    relatedSkills: ["Sales Development", "B2B Sales"],
  },
  {
    canonical: "B2B Sales",
    category: "marketing_sales",
    synonyms: ["b2b sales", "enterprise sales", "solution selling", "deal closing", "sales cycle", "quota attainment"],
    relatedSkills: ["Sales Development", "Negotiation", "Account Management"],
  },
  {
    canonical: "Customer Success",
    category: "marketing_sales",
    synonyms: ["customer success", "csm", "client retention", "customer health score", "nps", "churn reduction", "onboarding clients"],
    relatedSkills: ["Account Management", "Stakeholder Management"],
  },
  {
    canonical: "Negotiation",
    category: "marketing_sales",
    synonyms: ["negotiation", "contract negotiation", "deal negotiation", "commercial terms", "objection handling"],
    relatedSkills: ["B2B Sales", "Client Communication"],
  },
  {
    canonical: "Account Management",
    category: "marketing_sales",
    synonyms: ["account management", "client relationship", "upselling", "cross-selling", "renewal management"],
    relatedSkills: ["Customer Success", "B2B Sales"],
  },

  // Human Resources & People
  {
    canonical: "Talent Acquisition",
    category: "business_management",
    synonyms: ["talent acquisition", "recruiting", "recruitment", "candidate sourcing", "headhunting", "interviewing candidates"],
    relatedSkills: ["Employee Onboarding", "Stakeholder Management"],
  },
  {
    canonical: "Employee Relations",
    category: "business_management",
    synonyms: ["employee relations", "workplace conflict", "hr policies", "employee engagement", "culture initiatives"],
    relatedSkills: ["Human Resources", "Leadership"],
  },
  {
    canonical: "Employee Onboarding",
    category: "business_management",
    synonyms: ["onboarding", "new hire orientation", "employee training", "ramp-up program"],
    relatedSkills: ["Talent Acquisition", "Employee Relations"],
  },
  {
    canonical: "HR Information Systems",
    category: "tools",
    synonyms: ["hris", "workday", "bamboohr", "gusto", "adp", "people operations software"],
    relatedSkills: ["Talent Acquisition", "Human Resources"],
  },
  {
    canonical: "Performance Management",
    category: "business_management",
    synonyms: ["performance management", "okrs", "kpis", "360 reviews", "performance reviews", "pip"],
    relatedSkills: ["Leadership", "Employee Relations"],
  },

  // Operations & Strategy
  {
    canonical: "Operations Management",
    category: "operations_logistics",
    synonyms: ["operations management", "operations", "business operations", "bizops", "service delivery", "capacity planning"],
    relatedSkills: ["Process Optimization", "Supply Chain Management"],
  },
  {
    canonical: "Supply Chain Management",
    category: "operations_logistics",
    synonyms: ["supply chain", "logistics", "procurement", "inventory management", "vendor management"],
    relatedSkills: ["Operations Management", "Process Optimization"],
  },
  {
    canonical: "Process Optimization",
    category: "operations_logistics",
    synonyms: ["process optimization", "process improvement", "lean", "six sigma", "kaizen", "workflow automation", "efficiency"],
    relatedSkills: ["Operations Management", "Business Analysis"],
  },
  {
    canonical: "Management Consulting",
    category: "business_management",
    synonyms: ["management consulting", "consulting", "strategic advisory", "mece", "case study framework", "business strategy"],
    relatedSkills: ["Business Analysis", "Financial Analysis", "Stakeholder Management"],
  },

  // Soft Skills & Professional Attributes
  {
    canonical: "Public Speaking",
    category: "soft_skills",
    synonyms: ["public speaking", "presentation skills", "pitching", "keynote", "oral communication"],
    relatedSkills: ["Leadership", "Stakeholder Management"],
  },
  {
    canonical: "Critical Thinking",
    category: "soft_skills",
    synonyms: ["critical thinking", "logical reasoning", "deductive reasoning", "first principles thinking"],
    relatedSkills: ["Problem Solving"],
  },
  {
    canonical: "Time Management",
    category: "soft_skills",
    synonyms: ["time management", "prioritization", "task management", "deadline driven", "work organization"],
    relatedSkills: ["Team Collaboration"],
  },
  {
    canonical: "Written Communication",
    category: "soft_skills",
    synonyms: ["written communication", "business writing", "technical writing", "memo writing", "report writing"],
    relatedSkills: ["Public Speaking", "Stakeholder Management"],
  },
  {
    canonical: "Leadership",
    category: "soft_skills",
    synonyms: ["leadership", "team leadership", "mentorship", "people management", "delegation"],
    relatedSkills: ["Team Collaboration", "Stakeholder Management"],
  },
];

// Fast synonym lookup map: normalized lowercase synonym -> canonical skill name
const SYNONYM_MAP: Map<string, SkillDefinition> = new Map();

for (const skill of SKILL_TAXONOMY) {
  SYNONYM_MAP.set(skill.canonical.toLowerCase(), skill);
  for (const syn of skill.synonyms) {
    SYNONYM_MAP.set(syn.toLowerCase(), skill);
  }
}

export function normalizeSkill(input: string): SkillDefinition | null {
  const cleaned = input.trim().toLowerCase();
  if (SYNONYM_MAP.has(cleaned)) {
    return SYNONYM_MAP.get(cleaned)!;
  }
  return null;
}

export function getAllCanonicalSkills(): string[] {
  return SKILL_TAXONOMY.map((s) => s.canonical);
}
