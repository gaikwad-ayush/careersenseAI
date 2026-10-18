import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResource {
  title: string;
  url: string;
  provider: string;
  type: "documentation" | "interactive" | "course" | "project";
  isVerified: boolean;
}

export interface ITopic {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  isCompleted: boolean;
  completedAt?: Date;
  resources: IResource[];
}

export interface IPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  targetSkill: string;
  durationWeeks: number;
  topics: ITopic[];
  milestoneProject: {
    title: string;
    description: string;
    deliverables: string[];
    isCompleted: boolean;
  };
}

export interface ILearningRoadmap extends Document {
  userId: mongoose.Types.ObjectId;
  targetRole: string;
  roleId?: mongoose.Types.ObjectId;
  weeklyCommitmentHours: number;
  totalDurationWeeks: number;
  progressPercentage: number;
  completedTopicsCount: number;
  totalTopicsCount: number;
  status: "active" | "completed" | "paused";
  phases: IPhase[];
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    provider: { type: String, required: true },
    type: {
      type: String,
      enum: ["documentation", "interactive", "course", "project"],
      default: "documentation",
    },
    isVerified: { type: Boolean, default: true },
  },
  { _id: false }
);

const TopicSchema = new Schema<ITopic>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    estimatedHours: { type: Number, default: 4 },
    isCompleted: { type: Boolean, default: false },
    completedAt: { type: Date },
    resources: { type: [ResourceSchema], default: [] },
  },
  { _id: false }
);

const PhaseSchema = new Schema<IPhase>(
  {
    id: { type: String, required: true },
    phaseNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetSkill: { type: String, required: true },
    durationWeeks: { type: Number, default: 2 },
    topics: { type: [TopicSchema], default: [] },
    milestoneProject: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      deliverables: { type: [String], default: [] },
      isCompleted: { type: Boolean, default: false },
    },
  },
  { _id: false }
);

const LearningRoadmapSchema = new Schema<ILearningRoadmap>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetRole: { type: String, required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "RoleProfile" },
    weeklyCommitmentHours: { type: Number, default: 10 },
    totalDurationWeeks: { type: Number, default: 8 },
    progressPercentage: { type: Number, default: 0 },
    completedTopicsCount: { type: Number, default: 0 },
    totalTopicsCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
    phases: { type: [PhaseSchema], default: [] },
  },
  { timestamps: true }
);

export const LearningRoadmap: Model<ILearningRoadmap> =
  mongoose.models.LearningRoadmap ||
  mongoose.model<ILearningRoadmap>("LearningRoadmap", LearningRoadmapSchema);
