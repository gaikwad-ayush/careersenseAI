import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoleProfile extends Document {
  _id: mongoose.Types.ObjectId;
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
  updatedAt: Date;
}

const RoleProfileSchema = new Schema<IRoleProfile>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior"],
      default: "entry",
    },
    requiredSkills: { type: [String], required: true },
    preferredSkills: { type: [String], default: [] },
    responsibilities: { type: [String], default: [] },
    version: { type: String, default: "1.0.0" },
    isVerified: { type: Boolean, default: true },
    source: { type: String, default: "Industry Standards & Curriculum 2025" },
  },
  { timestamps: true }
);

export const RoleProfile: Model<IRoleProfile> =
  mongoose.models.RoleProfile ||
  mongoose.model<IRoleProfile>("RoleProfile", RoleProfileSchema);
