export type NewsSentiment = "Positive" | "Neutral" | "Negative";

export interface NewsArticle {
  id: string;
  firmId: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  sentiment: NewsSentiment;
  relevanceScore: number;
}
