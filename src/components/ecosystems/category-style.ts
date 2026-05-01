import type {
  ProductCategoryPhase,
  FirmCategoryRole,
} from "@/types/product-category";

/**
 * Phase 색상·라벨 매핑 — Tornado와 Declining 강조, 나머지는 중립.
 * Stage F의 매도/리밸런싱 신호에서도 같은 색상 체계 재사용.
 */
export const PHASE_BADGE: Record<
  ProductCategoryPhase,
  { bg: string; text: string; emoji: string }
> = {
  "Emerging":               { bg: "bg-sky-100",     text: "text-sky-700",     emoji: "🌱" },
  "Bowling Alley":          { bg: "bg-indigo-100",  text: "text-indigo-700",  emoji: "🎳" },
  "Tornado":                { bg: "bg-emerald-500", text: "text-white",       emoji: "🌪️" },
  "Thriving Main Street":   { bg: "bg-emerald-100", text: "text-emerald-700", emoji: "📈" },
  "Maturing Main Street":   { bg: "bg-gray-100",    text: "text-gray-700",    emoji: "🏢" },
  "Declining Main Street":  { bg: "bg-amber-100",   text: "text-amber-800",   emoji: "📉" },
  "Fault Line":             { bg: "bg-orange-100",  text: "text-orange-800",  emoji: "⚡" },
  "End of Life":            { bg: "bg-rose-100",    text: "text-rose-800",    emoji: "🛑" },
};

export const PHASE_LABEL_KO: Record<ProductCategoryPhase, string> = {
  "Emerging": "초기 시장",
  "Bowling Alley": "볼링 앨리",
  "Tornado": "토네이도",
  "Thriving Main Street": "성장 메인",
  "Maturing Main Street": "성숙 메인",
  "Declining Main Street": "쇠퇴 메인",
  "Fault Line": "단층선",
  "End of Life": "수명 종료",
};

/**
 * Role 색상 — Gorilla 압도적 강조, Niche는 가장 약함.
 */
export const ROLE_BADGE: Record<
  FirmCategoryRole,
  { bg: string; text: string }
> = {
  "Gorilla":    { bg: "bg-emerald-500", text: "text-white" },
  "King":       { bg: "bg-blue-500",    text: "text-white" },
  "Prince":     { bg: "bg-blue-100",    text: "text-blue-700" },
  "Challenger": { bg: "bg-amber-100",   text: "text-amber-800" },
  "Niche":      { bg: "bg-gray-200",    text: "text-gray-600" },
};

export const ROLE_LABEL_KO: Record<FirmCategoryRole, string> = {
  "Gorilla": "고릴라",
  "King": "왕",
  "Prince": "왕자",
  "Challenger": "도전자",
  "Niche": "니치",
};

export function phaseLabel(phase: ProductCategoryPhase, locale: string): string {
  return locale === "ko" ? PHASE_LABEL_KO[phase] : phase;
}

export function roleLabel(role: FirmCategoryRole, locale: string): string {
  return locale === "ko" ? ROLE_LABEL_KO[role] : role;
}
