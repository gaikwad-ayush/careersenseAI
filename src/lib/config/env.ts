import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MONGODB_URI: z.string().default("mongodb://127.0.0.1:27017/career_sense_ai"),
  JWT_SECRET: z.string().default("career-sense-ai-super-secure-production-jwt-token-key-2025"),
  APP_URL: z.string().default("http://localhost:3000"),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),
  JOB_API_KEY: z.string().optional(),
  JOB_API_PROVIDER: z.enum(["remotive", "adzuna", "jsearch"]).default("remotive"),
  FASTAPI_ML_URL: z.string().default("http://127.0.0.1:8000"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  JOB_API_KEY: process.env.JOB_API_KEY,
  JOB_API_PROVIDER: process.env.JOB_API_PROVIDER,
  FASTAPI_ML_URL: process.env.FASTAPI_ML_URL || "http://127.0.0.1:8000",
});

export type Env = z.infer<typeof envSchema>;
