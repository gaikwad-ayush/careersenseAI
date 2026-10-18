import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface IAIConversation extends Document {
  userId: mongoose.Types.ObjectId;
  targetRole?: string;
  messages: IChatMessage[];
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const AIConversationSchema = new Schema<IAIConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetRole: { type: String },
    messages: { type: [ChatMessageSchema], default: [] },
  },
  { timestamps: true }
);

export const AIConversation: Model<IAIConversation> =
  mongoose.models.AIConversation ||
  mongoose.model<IAIConversation>("AIConversation", AIConversationSchema);
