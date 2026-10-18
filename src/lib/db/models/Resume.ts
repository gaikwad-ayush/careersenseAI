import mongoose, { Schema, Document, Model } from "mongoose";

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  fileSize: number;
  mimeType: string;
  fileHash: string;
  rawText: string;
  status: "uploaded" | "parsed" | "error";
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResume>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fileName: { type: String, required: true },
    fileSize: { type: Number, required: true },
    mimeType: { type: String, required: true },
    fileHash: { type: String, required: true },
    rawText: { type: String, default: "" },
    status: {
      type: String,
      enum: ["uploaded", "parsed", "error"],
      default: "uploaded",
    },
    errorMessage: { type: String },
  },
  { timestamps: true }
);

export const Resume: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
