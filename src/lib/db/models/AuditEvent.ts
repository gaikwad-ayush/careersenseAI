import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuditEvent extends Document {
  userId?: mongoose.Types.ObjectId;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

const AuditEventSchema = new Schema<IAuditEvent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    action: { type: String, required: true, index: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    details: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const AuditEvent: Model<IAuditEvent> =
  mongoose.models.AuditEvent ||
  mongoose.model<IAuditEvent>("AuditEvent", AuditEventSchema);
