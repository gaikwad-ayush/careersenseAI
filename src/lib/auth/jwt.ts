import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env";

const SECRET = new TextEncoder().encode(env.JWT_SECRET);
const TOKEN_EXPIRY = "7d";

export interface SessionPayload {
  userId: string;
  email: string;
  role: "user" | "admin";
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as "user" | "admin",
    };
  } catch {
    return null;
  }
}
