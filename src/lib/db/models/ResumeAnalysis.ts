import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExtractedSkill {
  name: string;
  category: string;
  source: "explicit" | "inferred";
  confidence: number;
}

export interface IWeakBulletPoint {
  original: string;
  issue: string;
  recommendation: string;
}

export interface IResumeAnalysis extends Document {
  userId: mongoose.Types.ObjectId;
  resumeId: mongoose.Types.ObjectId;
  completenessScore: number;
  sectionBreakdown: {
    contact: boolean;
    education: boolean;
    skills: boolean;
    experience: boolean;
    projects: boolean;
    certifications: boolean;
  };
  contactInfo: {
    name?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  extractedSkills: IExtractedSkill[];
  normalizedSkills: string[];
  weakBulletPoints: IWeakBulletPoint[];
  atsRecommendations: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ResumeAnalysisSchema = new Schema<IResumeAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
      index: true,
    },
    completenessScore: { type: Number, required: true },
    sectionBreakdown: {
      contact: { type: Boolean, default: false },
      education: { type: Boolean, default: false },
      skills: { type: Boolean, default: false },
      experience: { type: Boolean, default: false },
      projects: { type: Boolean, default: false },
      certifications: { type: Boolean, default: false },
    },
    contactInfo: {
      name: String,
      email: String,
      phone: String,
      linkedin: String,
      github: String,
    },
    extractedSkills: [
      {
        name: { type: String, required: true },
        category: { type: String, required: true },
        source: { type: String, enum: ["explicit", "inferred"], default: "explicit" },
        confidence: { type: Number, default: 1.0 },
      },
    ],
    normalizedSkills: { type: [String], default: [] },
    weakBulletPoints: [
      {
        original: String,
        issue: String,
        recommendation: String,
      },
    ],
    atsRecommendations: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const ResumeAnalysis: Model<IResumeAnalysis> =
  mongoose.models.ResumeAnalysis ||
  mongoose.model<IResumeAnalysis>("ResumeAnalysis", ResumeAnalysisSchema);
