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
];
