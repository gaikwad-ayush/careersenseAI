export interface SkillDefinition {
  canonical: string;
  category: "languages" | "frameworks" | "databases" | "cloud_devops" | "tools" | "fundamentals" | "soft_skills";
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
    synonyms: ["teamwork", "team collaboration", "cross-functional collaboration", "agile", "scrum"],
    relatedSkills: ["Git"],
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
