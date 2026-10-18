const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't",
  "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have",
  "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him",
  "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't",
  "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out",
  "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some",
  "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there",
  "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's",
  "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're",
  "you've", "your", "yours", "yourself", "yourselves"
]);

/**
 * Tokenizes text preserving technical tokens (e.g. c++, c#, .net, ci/cd)
 */
export function tokenize(text: string): string[] {
  if (!text) return [];

  // Preserve technical tokens
  const normalized = text
    .toLowerCase()
    .replace(/\bc\+\+/gi, " cplusplus ")
    .replace(/\bc#/gi, " csharp ")
    .replace(/(?:^|\s|\/|\()\.(?:net)(?:$|\s|\/|\)|,)/gi, " dotnet ")
    .replace(/\bci\/cd\b/gi, " cicd ")
    .replace(/\bnode\.js\b/g, " nodejs ")
    .replace(/\bnext\.js\b/g, " nextjs ")
    .replace(/\bvue\.js\b/g, " vuejs ");

  // Extract alphanumeric tokens
  const rawTokens = normalized.match(/[a-z0-9_]{2,}/g) || [];

  return rawTokens.filter((token) => !STOP_WORDS.has(token));
}

export interface Vector {
  [term: string]: number;
}

export class TfIdfEngine {
  private corpus: string[] = [];
  private tokenizedCorpus: string[][] = [];
  private docFrequencies: Map<string, number> = new Map();
  private vocabulary: Set<string> = new Set();

  constructor(corpus: string[] = []) {
    if (corpus.length > 0) {
      this.buildCorpus(corpus);
    }
  }

  public buildCorpus(corpus: string[]) {
    this.corpus = corpus;
    this.tokenizedCorpus = corpus.map((doc) => tokenize(doc));
    this.docFrequencies.clear();
    this.vocabulary.clear();

    for (const tokens of this.tokenizedCorpus) {
      const uniqueInDoc = new Set(tokens);
      for (const term of uniqueInDoc) {
        this.vocabulary.add(term);
        const currentDf = this.docFrequencies.get(term) || 0;
        this.docFrequencies.set(term, currentDf + 1);
      }
    }
  }

  /**
   * Calculate smoothed Inverse Document Frequency:
   * IDF(t) = ln(1 + (N / (1 + df(t)))) + 1
   */
  public getIDF(term: string): number {
    const N = Math.max(this.corpus.length, 1);
    const df = this.docFrequencies.get(term) || 0;
    return Math.log(1 + N / (1 + df)) + 1;
  }

  /**
   * Vectorize a document into TF-IDF weighted vector
   */
  public vectorize(text: string): Vector {
    const tokens = tokenize(text);
    if (tokens.length === 0) return {};

    const termCounts: Map<string, number> = new Map();
    for (const t of tokens) {
      termCounts.set(t, (termCounts.get(t) || 0) + 1);
    }

    const vector: Vector = {};
    const totalTokens = tokens.length;

    for (const [term, count] of termCounts.entries()) {
      // Augmented term frequency to prevent bias towards long documents
      const tf = count / totalTokens;
      const idf = this.getIDF(term);
      vector[term] = tf * idf;
    }

    return vector;
  }
}

/**
 * Calculates Cosine Similarity between two term vectors:
 * cos(theta) = (u . v) / (||u|| * ||v||)
 */
export function cosineSimilarity(v1: Vector, v2: Vector): number {
  const keys1 = Object.keys(v1);
  const keys2 = Object.keys(v2);

  if (keys1.length === 0 || keys2.length === 0) {
    return 0;
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (const k of keys1) {
    const val1 = v1[k];
    norm1 += val1 * val1;
    if (v2[k] !== undefined) {
      dotProduct += val1 * v2[k];
    }
  }

  for (const k of keys2) {
    const val2 = v2[k];
    norm2 += val2 * val2;
  }

  const denominator = Math.sqrt(norm1) * Math.sqrt(norm2);
  if (denominator === 0) return 0;

  const similarity = dotProduct / denominator;
  // Bound to [0, 1]
  return Math.max(0, Math.min(1, similarity));
}
