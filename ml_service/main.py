"""CareerSense AI - Machine Learning & NLP Microservice (FastAPI + Python)."""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from .schemas import (
    ResumeExtractRequest,
    ResumeExtractResponse,
    RoleMatchRequest,
    RoleMatchResponse,
    SkillGapRequest,
    SkillGapResponse,
)
from .services.extractor import parse_and_analyze_resume
from .services.matcher import match_candidate_against_roles
from .services.skill_gap import analyze_skill_gaps

app = FastAPI(
    title="CareerSense AI - ML & NLP Microservice",
    description="Python FastAPI microservice powering resume parsing, TF-IDF role matching, and skill gap intelligence.",
    version="1.0.0",
)

# Enable CORS for Next.js frontend and local services
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "service": "CareerSense AI ML Microservice",
        "framework": "FastAPI (Python)",
        "status": "healthy",
        "endpoints": [
            "/docs",
            "/health",
            "/api/ml/extract-resume",
            "/api/ml/match-roles",
            "/api/ml/skill-gap",
        ],
    }


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "career-sense-ml", "version": "1.0.0"}


@app.post("/api/ml/extract-resume", response_model=ResumeExtractResponse)
def extract_resume(payload: ResumeExtractRequest):
    """Extract contact details, skills, section breakdown, ATS score, and bullet point feedback from resume text."""
    if not payload.text or len(payload.text.strip()) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Resume text must contain at least 10 characters.",
        )
    return parse_and_analyze_resume(payload.text)


@app.post("/api/ml/match-roles", response_model=RoleMatchResponse)
def match_roles(payload: RoleMatchRequest):
    """Calculate TF-IDF Cosine Similarity and skill coverage against career catalog roles using Scikit-Learn."""
    return match_candidate_against_roles(
        candidate_text=payload.candidateText,
        candidate_skills=payload.candidateSkills,
        roles=payload.roles,
    )


@app.post("/api/ml/skill-gap", response_model=SkillGapResponse)
def compute_skill_gap(payload: SkillGapRequest):
    """Perform deterministic gap analysis, calculate readiness score, and prioritize missing competencies."""
    return analyze_skill_gaps(
        candidate_skills=payload.candidateSkills,
        role=payload.role,
    )
