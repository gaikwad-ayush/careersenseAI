"""Skill taxonomy and categorization for CareerSense AI ML service."""
from typing import Dict, List, Optional, Any

SKILL_TAXONOMY: List[Dict[str, Any]] = [
    # Languages
    {"canonical": "Python", "category": "languages", "synonyms": ["python", "py", "python3", "python 3"], "relatedSkills": ["Django", "FastAPI", "Flask", "Pandas"]},
    {"canonical": "JavaScript", "category": "languages", "synonyms": ["javascript", "js", "ecmascript", "es6", "es6+"], "relatedSkills": ["TypeScript", "Node.js", "React"]},
    {"canonical": "TypeScript", "category": "languages", "synonyms": ["typescript", "ts"], "relatedSkills": ["JavaScript", "React", "Next.js", "Node.js"]},
    {"canonical": "Java", "category": "languages", "synonyms": ["java", "core java", "java 8", "java 17", "java 21"], "relatedSkills": ["Spring Boot", "Kotlin", "Hibernate"]},
    {"canonical": "C++", "category": "languages", "synonyms": ["c++", "cpp", "c plus plus"], "relatedSkills": ["C", "Data Structures", "Algorithms"]},
    {"canonical": "C", "category": "languages", "synonyms": ["c language", "ansi c"], "relatedSkills": ["C++", "Embedded Systems"]},
    {"canonical": "C#", "category": "languages", "synonyms": ["c#", "c sharp", "csharp", ".net c#"], "relatedSkills": [".NET Core", "ASP.NET", "Unity"]},
    {"canonical": "Go", "category": "languages", "synonyms": ["go", "golang"], "relatedSkills": ["Docker", "Kubernetes", "Microservices"]},
    {"canonical": "Rust", "category": "languages", "synonyms": ["rust", "rustlang"], "relatedSkills": ["Systems Programming", "WebAssembly"]},
    {"canonical": "SQL", "category": "languages", "synonyms": ["sql", "structured query language", "ansi sql"], "relatedSkills": ["PostgreSQL", "MySQL"]},
    {"canonical": "HTML", "category": "languages", "synonyms": ["html", "html5"], "relatedSkills": ["CSS", "Web Development"]},
    {"canonical": "CSS", "category": "languages", "synonyms": ["css", "css3"], "relatedSkills": ["Tailwind CSS", "Sass", "Responsive Design"]},
    
    # Frameworks & Libraries
    {"canonical": "React", "category": "frameworks", "synonyms": ["react", "react.js", "reactjs"], "relatedSkills": ["Next.js", "Redux", "TypeScript"]},
    {"canonical": "Next.js", "category": "frameworks", "synonyms": ["next.js", "nextjs", "next"], "relatedSkills": ["React", "TypeScript", "Server Components"]},
    {"canonical": "Node.js", "category": "frameworks", "synonyms": ["node.js", "nodejs", "node"], "relatedSkills": ["Express.js", "JavaScript", "TypeScript"]},
    {"canonical": "Express.js", "category": "frameworks", "synonyms": ["express", "express.js", "expressjs"], "relatedSkills": ["Node.js", "REST APIs"]},
    {"canonical": "FastAPI", "category": "frameworks", "synonyms": ["fastapi", "fast api"], "relatedSkills": ["Python", "Pydantic", "Uvicorn", "REST APIs"]},
    {"canonical": "Django", "category": "frameworks", "synonyms": ["django", "django rest framework", "drf"], "relatedSkills": ["Python", "PostgreSQL"]},
    {"canonical": "Flask", "category": "frameworks", "synonyms": ["flask"], "relatedSkills": ["Python", "REST APIs"]},
    {"canonical": "Spring Boot", "category": "frameworks", "synonyms": ["spring boot", "springboot", "spring framework"], "relatedSkills": ["Java", "Hibernate"]},
    {"canonical": "Tailwind CSS", "category": "frameworks", "synonyms": ["tailwind", "tailwindcss", "tailwind-css"], "relatedSkills": ["CSS", "Responsive Design"]},
    {"canonical": "PyTorch", "category": "frameworks", "synonyms": ["pytorch", "torch"], "relatedSkills": ["Deep Learning", "TensorFlow", "Python"]},
    {"canonical": "TensorFlow", "category": "frameworks", "synonyms": ["tensorflow", "tf", "keras"], "relatedSkills": ["Deep Learning", "PyTorch", "Python"]},
    {"canonical": "Scikit-Learn", "category": "frameworks", "synonyms": ["scikit-learn", "sklearn", "scikit learn"], "relatedSkills": ["Machine Learning", "Python", "Pandas"]},
    {"canonical": "Pandas", "category": "frameworks", "synonyms": ["pandas"], "relatedSkills": ["NumPy", "Python", "Data Analysis"]},
    {"canonical": "NumPy", "category": "frameworks", "synonyms": ["numpy"], "relatedSkills": ["Pandas", "Python", "SciPy"]},

    # Databases
    {"canonical": "MongoDB", "category": "databases", "synonyms": ["mongodb", "mongo", "nosql mongodb"], "relatedSkills": ["Mongoose", "NoSQL", "Express.js"]},
    {"canonical": "PostgreSQL", "category": "databases", "synonyms": ["postgresql", "postgres", "psql"], "relatedSkills": ["SQL", "Relational Databases"]},
    {"canonical": "MySQL", "category": "databases", "synonyms": ["mysql"], "relatedSkills": ["SQL", "Relational Databases"]},
    {"canonical": "Redis", "category": "databases", "synonyms": ["redis", "redis cache"], "relatedSkills": ["Caching", "Message Queues"]},

    # Cloud & DevOps
    {"canonical": "Docker", "category": "cloud_devops", "synonyms": ["docker", "containerization", "docker-compose"], "relatedSkills": ["Kubernetes", "CI/CD"]},
    {"canonical": "Kubernetes", "category": "cloud_devops", "synonyms": ["kubernetes", "k8s"], "relatedSkills": ["Docker", "Cloud Native"]},
    {"canonical": "AWS", "category": "cloud_devops", "synonyms": ["aws", "amazon web services", "ec2", "s3", "lambda"], "relatedSkills": ["Cloud Computing"]},
    {"canonical": "CI/CD", "category": "cloud_devops", "synonyms": ["ci/cd", "ci cd", "continuous integration", "github actions"], "relatedSkills": ["DevOps", "Docker"]},
    {"canonical": "Linux", "category": "cloud_devops", "synonyms": ["linux", "bash", "unix", "shell scripting"], "relatedSkills": ["DevOps", "Terminal"]},

    # Fundamentals & ML Concepts
    {"canonical": "Data Structures", "category": "fundamentals", "synonyms": ["dsa", "data structures", "data structures and algorithms"], "relatedSkills": ["Algorithms"]},
    {"canonical": "Algorithms", "category": "fundamentals", "synonyms": ["algorithms", "algo", "problem solving"], "relatedSkills": ["Data Structures"]},
    {"canonical": "Machine Learning", "category": "fundamentals", "synonyms": ["machine learning", "ml", "statistical learning"], "relatedSkills": ["Deep Learning", "Python"]},
    {"canonical": "Deep Learning", "category": "fundamentals", "synonyms": ["deep learning", "neural networks", "dl"], "relatedSkills": ["PyTorch", "TensorFlow"]},
    {"canonical": "Natural Language Processing", "category": "fundamentals", "synonyms": ["nlp", "natural language processing", "llm", "large language models"], "relatedSkills": ["Machine Learning", "Transformers"]},
    {"canonical": "System Design", "category": "fundamentals", "synonyms": ["system design", "distributed systems", "software architecture"], "relatedSkills": ["Microservices", "Scalability"]},
    {"canonical": "REST APIs", "category": "fundamentals", "synonyms": ["rest", "restful", "rest api", "rest apis", "api design"], "relatedSkills": ["FastAPI", "Express.js"]},

    # Tools
    {"canonical": "Git", "category": "tools", "synonyms": ["git", "version control", "github", "gitlab"], "relatedSkills": ["CI/CD"]},
    {"canonical": "Postman", "category": "tools", "synonyms": ["postman", "api testing"], "relatedSkills": ["REST APIs"]},

    # Soft Skills
    {"canonical": "Communication", "category": "soft_skills", "synonyms": ["communication", "technical communication", "presentation skills"], "relatedSkills": ["Team Leadership"]},
    {"canonical": "Problem Solving", "category": "soft_skills", "synonyms": ["problem solving", "analytical thinking", "critical thinking"], "relatedSkills": []},
]

# Lookup dictionary by lowercased canonical & synonym
_LOOKUP: Dict[str, Dict[str, Any]] = {}
for entry in SKILL_TAXONOMY:
    _LOOKUP[entry["canonical"].lower()] = entry
    for syn in entry["synonyms"]:
        _LOOKUP[syn.lower()] = entry


def normalize_skill(skill_name: str) -> Optional[Dict[str, Any]]:
    """Normalize a raw skill string to its canonical taxonomy definition."""
    cleaned = skill_name.strip().lower()
    return _LOOKUP.get(cleaned)


def get_canonical_name(skill_name: str) -> str:
    """Return the canonical name for a skill, or the original if not found."""
    found = normalize_skill(skill_name)
    return found["canonical"] if found else skill_name.strip()
