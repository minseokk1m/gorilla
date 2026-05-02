import type { NewsArticle, NewsSentiment } from "@/types/news";
import { MOCK_NEWS } from "../mock/news";
import { DATA_SOURCE } from "../api/config";
import { getLiveNews } from "../api/market-data-service";
import { MOCK_FIRMS } from "../mock/firms";

/**
 * Headline-based sentiment heuristic — weighted strong/weak keywords + simple
 * negation handling + Korean keywords. Not LLM. The same headline may yield
 * a continuous score in [-1, 1] (sentimentScore) and a 3-tier enum label
 * (sentiment) derived from that score.
 *
 * Signal strength:
 * - STRONG_* keywords carry weight 2 (e.g. "soar", "bankrupt").
 * - WEAK_* carry weight 1 (e.g. "growth", "miss").
 * - Negation modifiers ("not", "no", "fails to", "won't") dampen both sides
 *   to avoid flipping rather than zeroing scores incorrectly.
 * - Title is weighted 2x relative to summary when both present.
 */

const STRONG_POS = [
  "surge", "soar", "skyrocket", "record-high", "blockbuster", "breakthrough",
  "outperform", "beat estimates", "blowout", "all-time high", "rally",
];
const WEAK_POS = [
  "beat", "record", "growth", "gains", "upgrade", "bullish", "momentum", "strong",
  "accelerat", "expand", "win", "deal", "partner", "launch", "innovati",
  "demand", "profit", "revenue", "adoption", "milestone", "boost", "raises",
];
const STRONG_NEG = [
  "crash", "plunge", "bankrupt", "lawsuit", "fraud", "investigat", "halt",
  "downgrade", "sell-off", "selloff", "guidance cut", "all-time low",
  "criminal", "indict",
  // earnings/momentum collapse phrases — common in headlines
  "stall", "stalls", "stalling", "slowest", "workforce reduction",
  "revenue miss", "guidance miss", "growth slows",
];
const WEAK_NEG = [
  "drop", "fall", "decline", "loss", "cut", "layoff", "slash", "warn",
  "bearish", "miss", "weak", "slow", "risk", "threat", "regulat", "delay",
  "concern", "trouble", "headwind", "softer", "softness",
  "consolidate on", // SaaS-specific: "consolidate on competitor" = losing share
  "loses", "losing", "lost ",
  // NOTE: avoid words like "displacing" / "alternative to" — they're sentiment-
  // ambiguous (positive for one firm, negative for the other in the same headline).
  // Headline-level firm attribution is a known heuristic limitation.
];

// Korean keywords (for KR-firm news once live data covers them)
const KO_STRONG_POS = ["급등", "최고치", "역대 최대", "흑자전환", "수출 호조", "잭팟"];
const KO_WEAK_POS = ["상승", "성장", "확대", "수출", "체결", "수주", "흑자", "호실적"];
const KO_STRONG_NEG = ["급락", "폭락", "사기", "구속", "리콜", "파산"];
const KO_WEAK_NEG = ["하락", "감소", "축소", "지연", "부진", "위기", "적자", "경고"];

const NEGATION_RE = /\b(not|no\b|never|fails? to|won['’]?t|cannot)\b/g;
const KO_NEGATION_RE = /(아니|안 |못 |실패|중단)/g;

function countMatches(haystack: string, needles: readonly string[]): number {
  let n = 0;
  for (const needle of needles) {
    if (haystack.includes(needle)) n += 1;
  }
  return n;
}

function negationCount(s: string): number {
  return ((s.match(NEGATION_RE) || []).length) + ((s.match(KO_NEGATION_RE) || []).length);
}

/**
 * Continuous sentiment score in [-1, 1] from a single text block.
 * Use the public `inferSentimentScore(title, summary?)` for proper title weighting.
 */
function rawScore(text: string): { pos: number; neg: number } {
  const lower = text.toLowerCase();
  let pos =
    countMatches(lower, STRONG_POS) * 2 +
    countMatches(lower, WEAK_POS) +
    countMatches(text, KO_STRONG_POS) * 2 +
    countMatches(text, KO_WEAK_POS);
  let neg =
    countMatches(lower, STRONG_NEG) * 2 +
    countMatches(lower, WEAK_NEG) +
    countMatches(text, KO_STRONG_NEG) * 2 +
    countMatches(text, KO_WEAK_NEG);

  // Negation dampens both sides — avoids spurious flips. Each negation halves
  // the strength of the dominant side once.
  const neg_mods = negationCount(lower) + negationCount(text);
  if (neg_mods > 0) {
    const damp = 1 / (1 + neg_mods * 0.5);
    pos *= damp;
    neg *= damp;
  }
  return { pos, neg };
}

export function inferSentimentScore(title: string, summary?: string): number {
  const t = rawScore(title);
  const s = summary ? rawScore(summary) : { pos: 0, neg: 0 };
  // Title weighted 2x vs summary
  const pos = t.pos * 2 + s.pos;
  const neg = t.neg * 2 + s.neg;
  if (pos === 0 && neg === 0) return 0;
  return Math.max(-1, Math.min(1, (pos - neg) / (pos + neg)));
}

export function scoreToLabel(score: number): NewsSentiment {
  if (score >= 0.3) return "Positive";
  if (score <= -0.3) return "Negative";
  return "Neutral";
}

/** Backwards-compatible label-only API (uses scoreToLabel under the hood). */
function inferSentiment(title: string): NewsSentiment {
  return scoreToLabel(inferSentimentScore(title));
}

/**
 * Convert Yahoo Finance news items to our NewsArticle format.
 */
function toNewsArticle(
  item: { uuid: string; title: string; publisher: string; link: string; publishedAt: string },
  firmId: string,
): NewsArticle {
  const score = inferSentimentScore(item.title);
  return {
    id: item.uuid,
    firmId,
    title: item.title,
    summary: "", // Yahoo Finance search doesn't provide summaries
    source: item.publisher,
    publishedAt: item.publishedAt,
    url: item.link,
    sentiment: scoreToLabel(score),
    sentimentScore: score,
    relevanceScore: 0.8,
  };
}

/**
 * Mock news in the seed file only carries the categorical sentiment label.
 * Compute a continuous score on read so downstream code (layer-momentum) can
 * use the unified continuous signal regardless of source.
 */
function hydrateMockSentiment(article: NewsArticle): NewsArticle {
  if (typeof article.sentimentScore === "number") return article;
  return {
    ...article,
    sentimentScore: inferSentimentScore(article.title, article.summary),
  };
}

/**
 * Light dedup: remove items where title (normalised) matches a previously seen
 * title for the same firm. Yahoo aggregators sometimes echo the same story.
 */
function dedupNews(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  const out: NewsArticle[] = [];
  for (const a of articles) {
    const k = `${a.firmId}::${a.title.toLowerCase().replace(/\s+/g, " ").slice(0, 80)}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(a);
  }
  return out;
}

export async function getNewsByFirmId(firmId: string): Promise<NewsArticle[]> {
  if (DATA_SOURCE === "mock") {
    return dedupNews(
      MOCK_NEWS.filter((a) => a.firmId === firmId)
        .map(hydrateMockSentiment)
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        ),
    );
  }
  const firm = MOCK_FIRMS.find((f) => f.id === firmId);
  if (!firm) return [];
  const liveNews = await getLiveNews(firm.yahooTicker ?? firm.ticker);
  if (!liveNews || liveNews.length === 0) return [];
  return dedupNews(liveNews.map((n) => toNewsArticle(n, firmId)));
}

export async function getLatestNews(limit = 10): Promise<NewsArticle[]> {
  if (DATA_SOURCE === "mock") {
    return dedupNews([...MOCK_NEWS].map(hydrateMockSentiment))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, limit);
  }
  // Fetch news for a subset of key firms (top gorilla candidates)
  const keyTickers = MOCK_FIRMS.slice(0, 15);
  const results = await Promise.all(
    keyTickers.map(async (firm) => {
      const liveNews = await getLiveNews(firm.yahooTicker ?? firm.ticker);
      return liveNews ? liveNews.map((n) => toNewsArticle(n, firm.id)) : [];
    }),
  );
  const allNews = results.flat();
  return dedupNews(allNews)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
