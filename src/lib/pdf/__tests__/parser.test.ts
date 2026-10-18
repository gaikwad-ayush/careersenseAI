import { describe, it, expect } from "vitest";
import { validatePdfSignature } from "../parser";

describe("PDF Parser & Signature Validation", () => {
  it("should validate valid %PDF- magic bytes", () => {
    // 0x25, 0x50, 0x44, 0x46, 0x2D is %PDF-
    const validBuffer = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    expect(validatePdfSignature(validBuffer)).toBe(true);
  });

  it("should reject invalid file signatures (e.g. text or executable)", () => {
    const invalidBuffer = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]); // GIF header
    expect(validatePdfSignature(invalidBuffer)).toBe(false);

    const textBuffer = new TextEncoder().encode("Hello world this is not a PDF");
    expect(validatePdfSignature(textBuffer)).toBe(false);

    const emptyBuffer = new Uint8Array([]);
    expect(validatePdfSignature(emptyBuffer)).toBe(false);
  });
});
