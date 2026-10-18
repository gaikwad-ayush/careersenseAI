import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../password";

describe("Password Hashing & Verification", () => {
  it("should securely hash a plaintext password with bcrypt", async () => {
    const plain = "StrongEngine3rP@ss!";
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash.startsWith("$2")).toBe(true);

    const isMatch = await verifyPassword(plain, hash);
    expect(isMatch).toBe(true);
  });

  it("should reject incorrect passwords", async () => {
    const plain = "MySecret12345";
    const hash = await hashPassword(plain);

    const wrongMatch = await verifyPassword("WrongPassword!", hash);
    expect(wrongMatch).toBe(false);
  });
});
