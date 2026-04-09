import type { NewsArticle } from "@/types/news";
import type { RevenueSegment } from "@/types/firm";

/**
 * Classification dimension metadata for display.
 */
export const DIMENSION_META: Record<string, { labelKo: string; labelEn: string; color: string }> = {
  architectureControl: { labelKo: "아키텍처 지배력", labelEn: "Architecture", color: "text-purple-600 bg-purple-50" },
  switchingCosts:      { labelKo: "전환비용",       labelEn: "Switching Costs", color: "text-blue-600 bg-blue-50" },
  marketShare:         { labelKo: "시장점유율",     labelEn: "Market Share", color: "text-emerald-600 bg-emerald-50" },
  networkEffects:      { labelKo: "네트워크 효과",  labelEn: "Network Effects", color: "text-orange-600 bg-orange-50" },
  ecosystemControl:    { labelKo: "생태계 지배력",  labelEn: "Ecosystem", color: "text-teal-600 bg-teal-50" },
  revenueGrowth:       { labelKo: "매출 성장",      labelEn: "Revenue Growth", color: "text-rose-600 bg-rose-50" },
  marketConcentration: { labelKo: "시장 집중도",    labelEn: "Concentration", color: "text-indigo-600 bg-indigo-50" },
};

/** Keywords → classification dimensions */
const DIMENSION_KEYWORDS: Record<string, string[]> = {
  architectureControl: [
    "standard", "architecture", "platform", "api", "protocol", "ecosystem lock", "proprietary",
    "표준", "아키텍처", "플랫폼", "독점", "프로토콜",
  ],
  switchingCosts: [
    "switching", "migration", "lock-in", "retention", "churn", "contract", "subscription",
    "전환", "이탈", "구독", "계약", "유지율", "잠금",
  ],
  marketShare: [
    "market share", "share gain", "market leader", "dominant", "overtake", "rank", "#1", "no.1",
    "점유율", "1위", "선두", "시장 지배",
  ],
  networkEffects: [
    "network effect", "user growth", "viral", "flywheel", "adoption", "install base", "MAU", "DAU",
    "네트워크 효과", "사용자 증가", "가입자", "이용자",
  ],
  ecosystemControl: [
    "ecosystem", "partner", "developer", "integration", "alliance", "app store", "marketplace",
    "생태계", "파트너", "개발자", "제휴", "협력",
  ],
  revenueGrowth: [
    "revenue", "sales", "growth", "earnings", "profit", "beat", "guidance", "forecast", "quarterly",
    "매출", "실적", "성장", "이익", "분기", "가이던스", "전망", "흑자", "적자",
  ],
  marketConcentration: [
    "acquisition", "acquire", "merger", "M&A", "consolidat", "antitrust", "monopoly", "regulat",
    "인수", "합병", "독점", "규제", "반독점",
  ],
};

export interface NewsImpact {
  segments: string[];       // matched revenue segment names
  dimensions: string[];     // matched classification dimension keys
}

/**
 * Analyze a news article to find related revenue segments and classification dimensions.
 * Uses keyword matching on title + summary.
 */
export function analyzeNewsImpact(
  article: NewsArticle,
  revenueSegments: RevenueSegment[] | undefined,
): NewsImpact {
  const text = `${article.title ?? ""} ${article.summary ?? ""}`.toLowerCase();

  // Match revenue segments by segment name keywords
  const segments: string[] = [];
  if (revenueSegments) {
    for (const seg of revenueSegments) {
      const segWords = seg.name.toLowerCase().split(/[\s·()（）,，]+/).filter(w => w.length > 1);
      const descWords = seg.description.toLowerCase().split(/[\s·()（）,，]+/).filter(w => w.length > 1);
      const allWords = [...segWords, ...descWords];
      if (allWords.some(w => text.includes(w))) {
        segments.push(seg.name);
      }
    }
  }

  // Match classification dimensions
  const dimensions: string[] = [];
  for (const [dim, keywords] of Object.entries(DIMENSION_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw.toLowerCase()))) {
      dimensions.push(dim);
    }
  }

  return { segments, dimensions };
}
