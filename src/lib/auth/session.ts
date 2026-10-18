import { cookies } from "next/headers";
import { signToken, verifyToken, SessionPayload } from "./jwt";
import { connectDB } from "../db/connection";
import { User, IUser } from "../db/models/User";
import { NextRequest } from "next/server";

export const SESSION_COOKIE_NAME = "career_sense_session";

export async function setSessionCookie(payload: SessionPayload) {
  const token = await signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return token;
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSessionPayload(req?: NextRequest): Promise<SessionPayload | null> {
  let token: string | undefined;

  if (req) {
    token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  } else {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      return null;
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

export async function getAuthUser(req?: NextRequest): Promise<IUser | null> {
  const payload = await getSessionPayload(req);
  if (!payload?.userId) return null;

  await connectDB();
  const user = await User.findById(payload.userId).lean();
  return user as unknown as IUser;
}
