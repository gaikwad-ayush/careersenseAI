import { describe, it, expect } from "vitest";
import { TfIdfEngine, cosineSimilarity, tokenize } from "../tfidf";

describe("TF-IDF & Cosine Similarity Engine", () => {
  it("should correctly tokenize text and preserve special technical tokens", () => {
    const tokens = tokenize("I have experience in C++, C#, .NET, Node.js, and CI/CD pipelines.");
    expect(tokens).toContain("cplusplus");
    expect(tokens).toContain("csharp");
    expect(tokens).toContain("dotnet");
    expect(tokens).toContain("nodejs");
    expect(tokens).toContain("cicd");
    expect(tokens).not.toContain("and");
    expect(tokens).not.toContain("have");
  });

  it("should calculate exact cosine similarity of identical texts as 1.0", () => {
    const doc = "React TypeScript Node.js PostgreSQL Docker";
    const engine = new TfIdfEngine([doc]);
    const v1 = engine.vectorize(doc);
    const v2 = engine.vectorize(doc);

    const sim = cosineSimilarity(v1, v2);
    expect(sim).toBeCloseTo(1.0, 4);
  });

  it("should return 0 cosine similarity for orthogonal vocabularies", () => {
    const doc1 = "React TypeScript Frontend Web";
    const doc2 = "Accounting Audit Finance Taxation";
    const engine = new TfIdfEngine([doc1, doc2]);
    const v1 = engine.vectorize(doc1);
    const v2 = engine.vectorize(doc2);

    const sim = cosineSimilarity(v1, v2);
    expect(sim).toBe(0);
  });

  it("should return higher similarity for documents with higher overlap", () => {
    const candidate = "Full stack engineer with React, TypeScript, Node.js, and PostgreSQL";
    const roleDev = "Looking for Full stack engineer proficient in React, TypeScript, Node.js, and PostgreSQL";
    const roleData = "Looking for Data Analyst with SQL, Tableau, Excel, and Statistics";

    const engine = new TfIdfEngine([candidate, roleDev, roleData]);
    const vCand = engine.vectorize(candidate);
    const vDev = engine.vectorize(roleDev);
    const vData = engine.vectorize(roleData);

    const simDev = cosineSimilarity(vCand, vDev);
    const simData = cosineSimilarity(vCand, vData);

    expect(simDev).toBeGreaterThan(simData);
    expect(simDev).toBeGreaterThan(0.6);
  });
});
