import { extractText } from "unpdf";

export interface PdfParseResult {
  text: string;
  totalPages: number;
}

export function validatePdfSignature(buffer: Uint8Array): boolean {
  if (buffer.length < 5) return false;
  // %PDF- magic bytes: 0x25, 0x50, 0x44, 0x46, 0x2D
  return (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  );
}

export async function parsePdfBuffer(buffer: Buffer | Uint8Array): Promise<PdfParseResult> {
  const uint8 = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  if (!validatePdfSignature(uint8)) {
    throw new Error("Invalid file signature: The uploaded file is not a valid PDF document.");
  }

  try {
    const { text, totalPages } = await extractText(uint8, { mergePages: true });

    const trimmed = (text || "").trim();
    if (trimmed.length < 20) {
      throw new Error(
        "No selectable text found in the PDF. Scanned image-only PDFs require OCR processing or a digitally formatted PDF resume."
      );
    }

    return {
      text: trimmed,
      totalPages: totalPages || 1,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("No selectable text")) {
      throw err;
    }
    const msg = err instanceof Error ? err.message : "Failed to extract text from PDF document.";
    throw new Error(`PDF Parsing failed: ${msg}`);
  }
}
