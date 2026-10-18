import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserProfile extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  educationLevel: string;
  degree: string;
  branch: string;
  graduationYear: number;
  currentExperienceLevel: "fresher" | "intern" | "junior" | "mid";
  preferredDomains: string[];
  existingTechnicalSkills: string[];
  weeklyLearningHours: number;
  targetRoles: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    educationLevel: { type: String, default: "Undergraduate" },
    degree: { type: String, default: "Bachelor's Degree" },
    branch: { type: String, default: "General / Undecided" },
    graduationYear: { type: Number, default: 2026 },
    currentExperienceLevel: {
      type: String,
      enum: ["fresher", "intern", "junior", "mid"],
      default: "fresher",
    },
    preferredDomains: { type: [String], default: [] },
    existingTechnicalSkills: { type: [String], default: [] },
    weeklyLearningHours: { type: Number, default: 10 },
    targetRoles: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const UserProfile: Model<IUserProfile> =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
