import { describe, it, expect } from "vitest";
import { signToken, verifyToken, SessionPayload } from "../jwt";

describe("JWT Session Tokens", () => {
  const samplePayload: SessionPayload = {
    userId: "64e0a7b45f1234567890abcd",
    email: "student@engineering.edu",
    role: "user",
  };

  it("should sign a token and verify its payload correctly", async () => {
    const token = await signToken(samplePayload);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);

    const decoded = await verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(samplePayload.userId);
    expect(decoded?.email).toBe(samplePayload.email);
    expect(decoded?.role).toBe("user");
  });

  it("should return null for malformed or tampered tokens", async () => {
    const invalid = await verifyToken("malformed.jwt.token.string");
    expect(invalid).toBeNull();
  });
});
