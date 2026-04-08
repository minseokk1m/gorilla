import type { NewsArticle, NewsSentiment } from "@/types/news";
import { MOCK_NEWS } from "../mock/news";
import { DATA_SOURCE } from "../api/config";
import { getLiveNews } from "../api/market-data-service";
import { MOCK_FIRMS } from "../mock/firms";

/**
 * Simple keyword-based sentiment heuristic.
 * Not AI — just a rough signal until Phase 2 AI integration.
 */
const POSITIVE_KEYWORDS = [
  "surge", "soar", "beat", "record", "growth", "gains", "rally", "upgrade",
  "outperform", "bullish", "momentum", "strong", "accelerat", "expand",
  "win", "deal", "partner", "launch", "innovati", "breakthrough", "demand",
  "profit", "revenue", "adoption", "milestone",
];
const NEGATIVE_KEYWORDS = [
  "drop", "fall", "decline", "loss", "cut", "layoff", "slash", "warn",
  "downgrade", "bearish", "miss", "weak", "slow", "risk", "threat",
  "lawsuit", "regulat", "investig", "delay", "concern", "trouble",
  "sell-off", "selloff", "crash", "plunge", "bankrupt",
];

function inferSentiment(title: string): NewsSentiment {
  const lower = title.toLowerCase();
  let pos = 0;
  let neg = 0;
  for (const kw of POSITIVE_KEYWORDS) {
    if (lower.includes(kw)) pos++;
  }
  for (const kw of NEGATIVE_KEYWORDS) {
    if (lower.includes(kw)) neg++;
  }
  if (pos > neg) return "Positive";
  if (neg > pos) return "Negative";
  return "Neutral";
}

/**
 * Convert Yahoo Finance news items to our NewsArticle format.
 */
function toNewsArticle(
  item: { uuid: string; title: string; publisher: string; link: string; publishedAt: string },
  firmId: string,
): NewsArticle {
  return {
    id: item.uuid,
    firmId,
    title: item.title,
    summary: "", // Yahoo Finance search doesn't provide summaries
    source: item.publisher,
    publishedAt: item.publishedAt,
    url: item.link,
    sentiment: inferSentiment(item.title),
    relevanceScore: 0.8, // default; no relevance scoring without AI
  };
}

export async function getNewsByFirmId(firmId: string): Promise<NewsArticle[]> {
  if (DATA_SOURCE !== "mock") {
    const firm = MOCK_FIRMS.find((f) => f.id === firmId);
    if (firm) {
      const liveNews = await getLiveNews(firm.yahooTicker ?? firm.ticker);
      if (liveNews && liveNews.length > 0) {
        return liveNews.map((n) => toNewsArticle(n, firmId));
      }
      if (DATA_SOURCE === "live") return [];
    }
  }
  // Fallback to mock
  return MOCK_NEWS.filter((a) => a.firmId === firmId).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  if (DATA_SOURCE !== "mock") {
    // Fetch news for a subset of key firms (top gorilla candidates)
    const keyTickers = MOCK_FIRMS.slice(0, 15); // top firms by definition order

    const results = await Promise.all(
      keyTickers.map(async (firm) => {
        const liveNews = await getLiveNews(firm.yahooTicker ?? firm.ticker);
        return liveNews ? liveNews.map((n) => toNewsArticle(n, firm.id)) : [];
      })
    );
    const allNews = results.flat();

    if (allNews.length > 0) {
      return allNews
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
    }

    if (DATA_SOURCE === "live") return [];
  }
  // Fallback to mock
  return [...MOCK_NEWS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
