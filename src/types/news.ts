export type NewsSentiment = "Positive" | "Neutral" | "Negative";

export interface NewsArticle {
  id: string;
  firmId: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  /** 3-tier label for UI (color/badge). Derived from sentimentScore when available. */
  sentiment: NewsSentiment;
  /** Continuous sentiment in [-1, 1]. Optional — when missing, callers fall back to sentiment enum. */
  sentimentScore?: number;
  relevanceScore: number;
}
