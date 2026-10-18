import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobListing {
  id: string;
  title: string;
  companyName: string;
  location: string;
  isRemote: boolean;
  employmentType: string;
  descriptionSnippet: string;
  url: string;
  publishedAt: string;
  source: string;
  tags: string[];
}

export interface IJobCache extends Document {
  cacheKey: string;
  provider: string;
  query: string;
  listings: IJobListing[];
  fetchedAt: Date;
  expiresAt: Date;
}

const JobListingSchema = new Schema<IJobListing>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, default: "Remote / Multiple Locations" },
    isRemote: { type: Boolean, default: false },
    employmentType: { type: String, default: "Full-Time" },
    descriptionSnippet: { type: String, default: "" },
    url: { type: String, required: true },
    publishedAt: { type: String, default: "" },
    source: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  { _id: false }
);

const JobCacheSchema = new Schema<IJobCache>(
  {
    cacheKey: { type: String, required: true, unique: true, index: true },
    provider: { type: String, required: true },
    query: { type: String, required: true },
    listings: { type: [JobListingSchema], default: [] },
    fetchedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true, index: { expires: "1h" } },
  },
  { timestamps: true }
);

export const JobCache: Model<IJobCache> =
  mongoose.models.JobCache ||
  mongoose.model<IJobCache>("JobCache", JobCacheSchema);
