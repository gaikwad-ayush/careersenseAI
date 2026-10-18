export interface SeedRoleData {
  title: string;
  slug: string;
  category: string;
  description: string;
  experienceLevel: "entry" | "mid" | "senior";
  requiredSkills: string[];
  preferredSkills: string[];
  responsibilities: string[];
  version: string;
  isVerified: boolean;
  source: string;
}

export const SEED_ROLES: SeedRoleData[] = [
  {
    title: "Full-Stack Developer",
    slug: "full-stack-developer",
    category: "Software Development",
    description:
      "Builds and maintains complete client-side and server-side web applications. Responsible for responsive UI, RESTful/GraphQL APIs, database persistence, and system integration.",
    experienceLevel: "entry",
    requiredSkills: ["JavaScript", "TypeScript", "React", "Node.js", "Express.js", "PostgreSQL", "Git"],
    preferredSkills: ["Next.js", "Docker", "Tailwind CSS", "MongoDB", "REST APIs", "Unit Testing"],
    responsibilities: [
      "Develop responsive user interfaces using React and modern CSS",
      "Architect and implement RESTful API services with Node.js and TypeScript",
      "Design database schemas, migrations, and queries in PostgreSQL or MongoDB",
      "Write unit and integration tests to ensure application reliability",
    ],
    version: "2025.1",
    isVerified: true,
    source: "IEEE/ACM Computer Science Curriculum & Tech Hiring Benchmarks 2025",
  },
  {
    title: "Frontend Developer",
    slug: "frontend-developer",
    category: "Software Development",
    description:
      "Specializes in user interfaces, browser performance, accessibility, and modern interactive web experiences using component-driven architectures.",
    experienceLevel: "entry",
    requiredSkills: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Git"],
    preferredSkills: ["Next.js", "Tailwind CSS", "Vue.js", "Unit Testing", "REST APIs"],
    responsibilities: [
      "Implement pixel-perfect, accessible component hierarchies using React and TypeScript",
      "Optimize client-side bundle size, rendering performance, and Core Web Vitals",
      "Collaborate with UX designers to translate wireframes into interactive software",
    ],
    version: "2025.1",
    isVerified: true,
    source: "W3C Standards & Industry Role Specifications",
  },
  {
    title: "Backend Developer",
    slug: "backend-developer",
    category: "Software Development",
    description:
      "Designs, develops, and maintains server-side architecture, business logic, microservices, database schemas, and external API integrations.",
    experienceLevel: "entry",
    requiredSkills: ["Node.js", "Express.js", "Python", "SQL", "PostgreSQL", "REST APIs", "Git"],
    preferredSkills: ["Docker", "Redis", "FastAPI", "MongoDB", "System Design", "Unit Testing"],
    responsibilities: [
      "Design secure, high-throughput backend services and microservices",
      "Optimize complex relational database queries, indexing, and connection pools",
      "Implement authentication, authorization, caching, and rate-limiting middleware",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Backend Engineering Industry Matrix 2025",
  },
  {
    title: "Software Engineer",
    slug: "software-engineer",
    category: "Software Engineering",
    description:
      "Generalist software engineering role emphasizing data structures, algorithmic problem solving, clean architecture, and object-oriented design.",
    experienceLevel: "entry",
    requiredSkills: ["Java", "C++", "Python", "Data Structures", "Algorithms", "Object-Oriented Programming", "Git"],
    preferredSkills: ["SQL", "Linux", "System Design", "Unit Testing"],
    responsibilities: [
      "Design and implement scalable algorithms and robust data structures",
      "Apply OOP principles, design patterns, and code modularity",
      "Collaborate on version-controlled codebases with CI/CD workflows",
    ],
    version: "2025.1",
    isVerified: true,
    source: "ABET Accredited CS Standards & Major Tech Hiring Criteria",
  },
  {
    title: "Data Analyst",
    slug: "data-analyst",
    category: "Data & Analytics",
    description:
      "Transforms raw enterprise and product data into actionable insights through statistical analysis, SQL queries, and visual reporting.",
    experienceLevel: "entry",
    requiredSkills: ["SQL", "Python", "Pandas", "NumPy", "Git"],
    preferredSkills: ["PostgreSQL", "Problem Solving", "Machine Learning"],
    responsibilities: [
      "Extract, clean, and validate data across relational databases using advanced SQL",
      "Perform exploratory data analysis and statistical modeling using Pandas and NumPy",
      "Build insightful dashboards and reports for cross-functional stakeholders",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Industry Data Science & Analytics Guidelines 2025",
  },
  {
    title: "Data Scientist",
    slug: "data-scientist",
    category: "Data & Analytics",
    description:
      "Develops statistical models, machine learning algorithms, and predictive analytics to solve complex business problems from large structured and unstructured datasets.",
    experienceLevel: "entry",
    requiredSkills: ["Python", "Machine Learning", "Pandas", "NumPy", "SQL", "Algorithms", "Git"],
    preferredSkills: ["PyTorch", "TensorFlow", "Deep Learning", "PostgreSQL"],
    responsibilities: [
      "Formulate predictive models and evaluate validation metrics (precision, recall, F1-score)",
      "Design feature engineering pipelines for structured tabular and unstructured data",
      "Translate research experiments into reproducible production pipelines",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Kaggle & ACM SIGKDD Industry Guidelines",
  },
  {
    title: "Machine Learning Engineer",
    slug: "machine-learning-engineer",
    category: "Artificial Intelligence",
    description:
      "Bridges the gap between data science prototypes and production infrastructure by deploying, serving, and monitoring scalable ML/DL models.",
    experienceLevel: "entry",
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "Docker", "Git", "Algorithms"],
    preferredSkills: ["TensorFlow", "FastAPI", "Linux", "Kubernetes", "AWS"],
    responsibilities: [
      "Train, fine-tune, and optimize deep neural networks using PyTorch or TensorFlow",
      "Containerize models with Docker and serve low-latency inference APIs",
      "Monitor model drift, data quality, and compute utilization in production",
    ],
    version: "2025.1",
    isVerified: true,
    source: "MLOps World & Production AI Standards 2025",
  },
  {
    title: "DevOps Engineer",
    slug: "devops-engineer",
    category: "Infrastructure & Operations",
    description:
      "Automates infrastructure provisioning, continuous integration, continuous delivery pipelines, and system reliability monitoring.",
    experienceLevel: "entry",
    requiredSkills: ["Linux", "Docker", "CI/CD", "Git", "Python", "Kubernetes"],
    preferredSkills: ["AWS", "System Design", "Redis", "PostgreSQL"],
    responsibilities: [
      "Configure and maintain automated CI/CD deployment pipelines using GitHub Actions/GitLab",
      "Manage containerized microservices deployments with Docker and Kubernetes",
      "Administer Linux servers, access controls, network configurations, and observability",
    ],
    version: "2025.1",
    isVerified: true,
    source: "CNCF Cloud Native Guidelines 2025",
  },
  {
    title: "Cloud Engineer",
    slug: "cloud-engineer",
    category: "Infrastructure & Operations",
    description:
      "Architects, secures, and maintains cloud compute, storage, networking, and serverless infrastructure on major public cloud platforms.",
    experienceLevel: "entry",
    requiredSkills: ["AWS", "Linux", "Docker", "Git", "Python", "CI/CD"],
    preferredSkills: ["Kubernetes", "PostgreSQL", "System Design", "Cybersecurity"],
    responsibilities: [
      "Deploy and manage scalable cloud computing clusters, VPCs, and storage services",
      "Implement cloud security policies, IAM roles, and automated backup routines",
      "Optimize cloud infrastructure cost and compute efficiency",
    ],
    version: "2025.1",
    isVerified: true,
    source: "AWS Well-Architected Framework & Industry Matrix",
  },
  {
    title: "Cybersecurity Analyst",
    slug: "cybersecurity-analyst",
    category: "Information Security",
    description:
      "Protects enterprise networks, applications, and data assets against vulnerabilities, intrusions, and security breaches.",
    experienceLevel: "entry",
    requiredSkills: ["Cybersecurity", "Linux", "Python", "Algorithms", "Git"],
    preferredSkills: ["Docker", "SQL", "Unit Testing", "System Design"],
    responsibilities: [
      "Perform vulnerability scans, application code audits, and penetration tests",
      "Implement OWASP security best practices across web applications and APIs",
      "Monitor security event logs, intrusion detection systems, and incident response",
    ],
    version: "2025.1",
    isVerified: true,
    source: "NIST Cybersecurity Framework & OWASP Standards",
  },
  {
    title: "QA Automation Engineer",
    slug: "qa-automation-engineer",
    category: "Quality Engineering",
    description:
      "Builds robust automated testing suites, regression pipelines, and performance test frameworks to guarantee software quality across platforms.",
    experienceLevel: "entry",
    requiredSkills: ["Python", "JavaScript", "Unit Testing", "Git", "HTML5", "CSS3"],
    preferredSkills: ["TypeScript", "CI/CD", "Docker", "REST APIs", "React"],
    responsibilities: [
      "Develop comprehensive end-to-end and integration test suites",
      "Integrate automated testing into CI/CD build pipelines",
      "Analyze bug regression patterns and maintain test documentation",
    ],
    version: "2025.1",
    isVerified: true,
    source: "ISTQB Software Testing Standards 2025",
  },

  // Product & Business Strategy
  {
    title: "Product Manager",
    slug: "product-manager",
    category: "Product & Strategy",
    description:
      "Guides the success of a product from discovery to launch, aligning customer needs, business objectives, and cross-functional engineering and design teams.",
    experienceLevel: "entry",
    requiredSkills: ["Product Management", "User Stories", "Agile Methodology", "Stakeholder Management", "Market Research"],
    preferredSkills: ["Jira", "Figma", "Data Analysis", "SQL", "Public Speaking"],
    responsibilities: [
      "Define product strategy, roadmaps, and requirements documents (PRDs)",
      "Prioritize feature backlogs across engineering, design, and business teams",
      "Conduct customer discovery interviews and analyze product usage metrics",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Product Management Professional Benchmarks 2025",
  },
  {
    title: "Business Analyst",
    slug: "business-analyst",
    category: "Product & Strategy",
    description:
      "Analyzes business processes, models data, and translates stakeholder needs into structured requirements to improve operational efficiency and commercial outcomes.",
    experienceLevel: "entry",
    requiredSkills: ["Business Analysis", "Microsoft Excel", "Stakeholder Management", "Process Optimization"],
    preferredSkills: ["SQL", "Jira", "Agile Methodology", "Public Speaking", "Data Analysis"],
    responsibilities: [
      "Elicit, validate, and document business and technical requirements",
      "Model current-state and future-state business processes",
      "Analyze financial and operational metrics to identify growth opportunities",
    ],
    version: "2025.1",
    isVerified: true,
    source: "International Institute of Business Analysis (IIBA) 2025",
  },
  {
    title: "Management Consultant",
    slug: "management-consultant",
    category: "Product & Strategy",
    description:
      "Advises executive leaders on high-stakes strategic, operational, and organizational challenges through structured problem-solving and rigorous quantitative analysis.",
    experienceLevel: "entry",
    requiredSkills: ["Management Consulting", "Business Analysis", "Financial Analysis", "Critical Thinking", "Written Communication"],
    preferredSkills: ["Microsoft Excel", "Stakeholder Management", "Public Speaking", "Market Research"],
    responsibilities: [
      "Structure complex strategic problems using MECE and hypothesis-driven frameworks",
      "Conduct quantitative analysis, financial modeling, and competitive benchmarking",
      "Present executive recommendations and change management plans to leadership",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Management Consulting Standards & Industry Hiring Matrix 2025",
  },

  // Design & Creative
  {
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    category: "Design & Creative",
    description:
      "Designs intuitive digital experiences, high-fidelity user interfaces, and interactive prototypes backed by usability research and design system foundations.",
    experienceLevel: "entry",
    requiredSkills: ["UI Design", "UX Research", "Figma", "Wireframing", "Prototyping"],
    preferredSkills: ["Design Systems", "Usability Testing", "Adobe Illustrator", "HTML5", "CSS3"],
    responsibilities: [
      "Design intuitive, accessible workflows and high-fidelity interface mockups",
      "Build and maintain scalable design systems with reusable component libraries",
      "Conduct user research sessions, usability audits, and iterative prototype testing",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Nielsen Norman Group UX Guidelines 2025",
  },
  {
    title: "Graphic & Brand Designer",
    slug: "graphic-brand-designer",
    category: "Design & Creative",
    description:
      "Crafts memorable visual identities, brand systems, marketing collateral, and digital illustrations that communicate company messaging clearly.",
    experienceLevel: "entry",
    requiredSkills: ["Adobe Illustrator", "Adobe Photoshop", "Brand Strategy", "UI Design"],
    preferredSkills: ["Figma", "Copywriting", "Social Media Strategy", "Visual Design"],
    responsibilities: [
      "Create high-impact visual identities, brand assets, and marketing collateral",
      "Collaborate with marketing teams to produce digital, social, and print campaign materials",
      "Maintain brand consistency across all visual touchpoints and corporate guidelines",
    ],
    version: "2025.1",
    isVerified: true,
    source: "AIGA Design Standards 2025",
  },
  {
    title: "Content Strategist & Copywriter",
    slug: "content-strategist-copywriter",
    category: "Design & Creative",
    description:
      "Creates persuasive, clear, and audience-tailored written content across product landing pages, editorial blogs, marketing campaigns, and thought leadership.",
    experienceLevel: "entry",
    requiredSkills: ["Content Marketing", "Copywriting", "Written Communication", "Search Engine Optimization"],
    preferredSkills: ["Social Media Strategy", "Google Analytics", "Brand Strategy", "Market Research"],
    responsibilities: [
      "Develop cross-channel editorial plans and high-converting marketing copy",
      "Optimize articles, case studies, and landing pages for organic search visibility",
      "Measure engagement and conversion performance across published content",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Content Marketing Institute Benchmarks 2025",
  },

  // Marketing & Growth
  {
    title: "Digital Marketing Specialist",
    slug: "digital-marketing-specialist",
    category: "Marketing & Growth",
    description:
      "Drives measurable customer acquisition and brand visibility across organic search, paid channels, email campaigns, and analytics funnels.",
    experienceLevel: "entry",
    requiredSkills: ["Search Engine Optimization", "Google Analytics", "Performance Marketing", "Content Marketing"],
    preferredSkills: ["Social Media Strategy", "Email Marketing", "HubSpot", "Copywriting"],
    responsibilities: [
      "Execute and optimize multi-channel customer acquisition and inbound campaigns",
      "Analyze web traffic, funnel drop-offs, and conversion rates in Google Analytics",
      "Manage SEO keyword targets, on-page optimization, and content distribution",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Digital Marketing Institute Framework 2025",
  },
  {
    title: "Growth Marketer",
    slug: "growth-marketer",
    category: "Marketing & Growth",
    description:
      "Rapidly experiments across product, paid channels, viral loops, and conversion funnels to scale customer acquisition, activation, and retention.",
    experienceLevel: "entry",
    requiredSkills: ["Performance Marketing", "Google Analytics", "Market Research", "Copywriting"],
    preferredSkills: ["Email Marketing", "Search Engine Optimization", "HubSpot", "SQL"],
    responsibilities: [
      "Design and run rapid growth experiments across paid and organic channels",
      "Optimize customer acquisition costs (CAC) and return on ad spend (ROAS)",
      "Analyze retention loops, viral coefficients, and onboarding drop-offs",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Growth Marketing Hub Benchmarks 2025",
  },
  {
    title: "Social Media & Community Manager",
    slug: "social-media-community-manager",
    category: "Marketing & Growth",
    description:
      "Cultivates brand community, crafts engaging daily social content, and monitors brand sentiment across modern social channels and forums.",
    experienceLevel: "entry",
    requiredSkills: ["Social Media Strategy", "Content Marketing", "Copywriting", "Written Communication"],
    preferredSkills: ["Google Analytics", "Adobe Photoshop", "Public Speaking", "Brand Strategy"],
    responsibilities: [
      "Plan, create, and schedule daily organic social content across key networks",
      "Engage with communities, prospective customers, and industry influencers",
      "Track reach, engagement rates, follower growth, and campaign attribution",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Social Media Examiner Industry Report 2025",
  },

  // Finance & Accounting
  {
    title: "Financial Analyst",
    slug: "financial-analyst",
    category: "Finance & Accounting",
    description:
      "Analyzes financial data, prepares financial forecasts, evaluates variances, and develops predictive models to guide executive decision-making.",
    experienceLevel: "entry",
    requiredSkills: ["Financial Analysis", "Microsoft Excel", "Financial Modeling", "Accounting"],
    preferredSkills: ["Valuation", "Budgeting & Forecasting", "Corporate Finance", "SQL"],
    responsibilities: [
      "Build comprehensive three-statement financial models and scenario forecasts",
      "Analyze monthly variance between actual financial results and budget targets",
      "Prepare financial reporting decks and performance commentary for leadership",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Corporate Finance Institute (CFI) Standards 2025",
  },
  {
    title: "Investment Banking Analyst",
    slug: "investment-banking-analyst",
    category: "Finance & Accounting",
    description:
      "Supports corporate valuation, M&A advisory, debt and equity capital raises, financial modeling, and investor presentation preparation.",
    experienceLevel: "entry",
    requiredSkills: ["Financial Modeling", "Valuation", "Corporate Finance", "Microsoft Excel"],
    preferredSkills: ["Financial Analysis", "Accounting", "Written Communication", "Public Speaking"],
    responsibilities: [
      "Perform discounted cash flow (DCF), comparable company, and precedent transaction valuations",
      "Assemble pitchbooks, confidential information memorandums (CIM), and management decks",
      "Conduct financial due diligence and transaction structuring analysis",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Wall Street Prep & Investment Banking Hiring Criteria 2025",
  },
  {
    title: "Corporate Accountant",
    slug: "corporate-accountant",
    category: "Finance & Accounting",
    description:
      "Maintains financial records, performs monthly journal reconciliations, ensures compliance with accounting standards, and prepares trial balances.",
    experienceLevel: "entry",
    requiredSkills: ["Accounting", "Financial Analysis", "Microsoft Excel", "Budgeting & Forecasting"],
    preferredSkills: ["QuickBooks", "Risk Management", "Corporate Finance"],
    responsibilities: [
      "Manage month-end and year-end financial close, journal entries, and reconciliations",
      "Ensure adherence to GAAP/IFRS accounting standards and internal controls",
      "Collaborate with external auditors and support tax preparation workflows",
    ],
    version: "2025.1",
    isVerified: true,
    source: "AICPA Accounting Curriculum Benchmarks 2025",
  },

  // Sales & Business Development
  {
    title: "Business Development Representative",
    slug: "business-development-representative",
    category: "Sales & Business Development",
    description:
      "Identifies, qualifies, and initiates contact with prospective commercial accounts, filling the sales pipeline with high-value opportunities.",
    experienceLevel: "entry",
    requiredSkills: ["Sales Development", "Salesforce", "Written Communication", "Cold Outreach"],
    preferredSkills: ["HubSpot", "Negotiation", "B2B Sales", "Time Management"],
    responsibilities: [
      "Source, qualify, and engage prospective B2B clients via email, phone, and LinkedIn",
      "Run discovery calls to understand client pain points and assess purchase intent",
      "Maintain CRM pipeline hygiene and book qualified demo meetings for Account Executives",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Sales Development Benchmark Report 2025",
  },
  {
    title: "Account Executive",
    slug: "account-executive",
    category: "Sales & Business Development",
    description:
      "Conducts high-impact discovery demos, handles objections, negotiates enterprise commercial terms, and closes sales opportunities.",
    experienceLevel: "entry",
    requiredSkills: ["B2B Sales", "Negotiation", "Salesforce", "Customer Success"],
    preferredSkills: ["Sales Development", "Public Speaking", "Account Management", "Stakeholder Management"],
    responsibilities: [
      "Lead consultative product demonstrations and manage full-cycle sales deals",
      "Negotiate commercial contract terms and close annual recurring revenue (ARR)",
      "Collaborate with Customer Success to ensure seamless client handoff and onboarding",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Bridge Group B2B Sales Benchmarks 2025",
  },

  // Human Resources & People
  {
    title: "Human Resources Specialist",
    slug: "human-resources-specialist",
    category: "Human Resources & People",
    description:
      "Oversees people operations, new hire onboarding, workplace policy adherence, employee engagement initiatives, and cultural programs.",
    experienceLevel: "entry",
    requiredSkills: ["Employee Relations", "Employee Onboarding", "Talent Acquisition", "Written Communication"],
    preferredSkills: ["HR Information Systems", "Performance Management", "Leadership"],
    responsibilities: [
      "Coordinate employee onboarding, training programs, and workplace policies",
      "Facilitate resolution of employee relations issues with empathy and discretion",
      "Administer performance review cycles, engagement surveys, and benefits programs",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Society for Human Resource Management (SHRM) Standards 2025",
  },
  {
    title: "Talent Acquisition Specialist",
    slug: "talent-acquisition-specialist",
    category: "Human Resources & People",
    description:
      "Partners with hiring teams to source, interview, evaluate, and attract top candidates across all departments.",
    experienceLevel: "entry",
    requiredSkills: ["Talent Acquisition", "Stakeholder Management", "Written Communication", "Public Speaking"],
    preferredSkills: ["Employee Onboarding", "HR Information Systems", "Negotiation"],
    responsibilities: [
      "Manage full-lifecycle recruitment from candidate sourcing to offer letter negotiation",
      "Partner with hiring managers to define job requirements and interview scorecards",
      "Deliver an exceptional candidate experience and build diverse talent pipelines",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Recruiting Trends & Benchmarks Matrix 2025",
  },

  // Operations & Logistics
  {
    title: "Operations Manager",
    slug: "operations-manager",
    category: "Operations & Logistics",
    description:
      "Streamlines organizational workflows, enforces operational quality standards, coordinates supply logistics, and drives business efficiency.",
    experienceLevel: "entry",
    requiredSkills: ["Operations Management", "Process Optimization", "Microsoft Excel", "Stakeholder Management"],
    preferredSkills: ["Supply Chain Management", "Business Analysis", "Leadership", "Time Management"],
    responsibilities: [
      "Oversee day-to-day business operations and ensure service-level agreement (SLA) fulfillment",
      "Map and eliminate operational bottlenecks through continuous process improvement",
      "Manage cross-functional operational budgets, vendor relationships, and KPI dashboards",
    ],
    version: "2025.1",
    isVerified: true,
    source: "Association for Supply Chain Management (ASCM) 2025",
  },
];
