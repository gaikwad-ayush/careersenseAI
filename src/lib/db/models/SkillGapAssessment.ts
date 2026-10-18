import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrioritySkill {
  name: string;
  priority: "high" | "medium" | "low";
  reason: string;
  prerequisites: string[];
  estimatedHours: number;
}

export interface ISkillGapAssessment extends Document {
  userId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
  roleTitle: string;
  matchScore: number; // TF-IDF Cosine similarity percentage (0-100)
  requiredCoverageScore: number; // Required skills matched / total required (0-100)
  preferredCoverageScore: number; // Preferred skills matched / total preferred (0-100)
  matchedSkills: string[];
  missingSkills: string[];
  partialSkills: string[];
  prioritizedGaps: IPrioritySkill[];
  totalEstimatedHours: number;
  explanation: string;
  limitationsDisclaimer: string;
  createdAt: Date;
  updatedAt: Date;
}

const SkillGapAssessmentSchema = new Schema<ISkillGapAssessment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "RoleProfile",
      required: true,
      index: true,
    },
    roleTitle: { type: String, required: true },
    matchScore: { type: Number, required: true },
    requiredCoverageScore: { type: Number, required: true },
    preferredCoverageScore: { type: Number, default: 0 },
    matchedSkills: { type: [String], default: [] },
    missingSkills: { type: [String], default: [] },
    partialSkills: { type: [String], default: [] },
    prioritizedGaps: [
      {
        name: { type: String, required: true },
        priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
        reason: { type: String, required: true },
        prerequisites: { type: [String], default: [] },
        estimatedHours: { type: Number, default: 10 },
      },
    ],
    totalEstimatedHours: { type: Number, default: 0 },
    explanation: { type: String, default: "" },
    limitationsDisclaimer: {
      type: String,
      default:
        "The match score represents algorithmic text similarity (TF-IDF vector cosine angle) and explicit skill coverage. It does not measure interview performance, behavioral fit, or real hiring probability.",
    },
  },
  { timestamps: true }
);

export const SkillGapAssessment: Model<ISkillGapAssessment> =
  mongoose.models.SkillGapAssessment ||
  mongoose.model<ISkillGapAssessment>("SkillGapAssessment", SkillGapAssessmentSchema);
