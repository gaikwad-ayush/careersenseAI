"""Pydantic request and response schemas for CareerSense AI ML service."""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


# ----------------- Resume Extraction Schemas -----------------
class ContactInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None


class SectionBreakdown(BaseModel):
    contact: bool
    education: bool
    skills: bool
    experience: bool
    projects: bool
    certifications: bool


class ExtractedSkill(BaseModel):
    name: str
    category: str
    source: str = "explicit"
    confidence: float = 1.0


class WeakBulletPoint(BaseModel):
    original: str
    issue: str
    recommendation: str


class ResumeExtractRequest(BaseModel):
    text: str = Field(..., min_length=10, description="Raw text of the candidate resume")


class ResumeExtractResponse(BaseModel):
    contactInfo: ContactInfo
    sectionBreakdown: SectionBreakdown
    extractedSkills: List[ExtractedSkill]
    normalizedSkills: List[str]
    weakBulletPoints: List[WeakBulletPoint]
    atsRecommendations: List[str]
    completenessScore: int


# ----------------- Role Matching Schemas -----------------
class RoleDefinition(BaseModel):
    id: Optional[str] = None
    slug: str
    title: str
    category: str
    level: str
    description: str
    requiredSkills: List[str]
    preferredSkills: List[str] = []
    responsibilities: List[str] = []


class RoleMatchRequest(BaseModel):
    candidateText: str
    candidateSkills: List[str]
    roles: List[RoleDefinition]


class RoleMatchItem(BaseModel):
    roleSlug: str
    roleTitle: str
    matchScore: int  # Cosine similarity (0-100)
    requiredCoverageScore: int  # 0-100
    preferredCoverageScore: int  # 0-100
    matchedSkills: List[str]
    missingRequiredSkills: List[str]
    missingPreferredSkills: List[str]
    rationale: str
    suggestedNextSteps: List[str]
    limitations: str


class RoleMatchResponse(BaseModel):
    results: List[RoleMatchItem]


# ----------------- Skill Gap & Roadmap Schemas -----------------
class PrioritySkill(BaseModel):
    name: str
    category: str
    importance: str  # "high" | "medium" | "low"
    isRequired: bool
    estimatedHours: int
    whyImportant: str
    recommendedAction: str


class SkillGapRequest(BaseModel):
    candidateSkills: List[str]
    role: RoleDefinition


class SkillGapResponse(BaseModel):
    matchedSkills: List[str]
    missingSkills: List[str]
    partialSkills: List[str]
    prioritizedGaps: List[PrioritySkill]
    totalEstimatedHours: int
    readinessScore: int
    readinessLevel: str
