import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { ClassificationTier } from "@/types/classification";
import type { EcosystemId } from "@/types/ecosystem";
import { findEcosystem } from "@/lib/data/mock/ecosystems";
import {
  getLayerMemberships,
  detectMooreConflicts,
  type MooreConflict,
} from "@/lib/data/providers/ecosystem-provider";
import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { getCachedLayerMomentum, type LayerMomentum } from "@/lib/data/providers/layer-momentum";

const TIER_ORDER: ClassificationTier[] = [
  "Gorilla",
  "Potential Gorilla",
  "King",
  "Prince",
  "Chimpanzee",
  "Monkey",
  "Serf",
  "In Chasm",
];

const TIER_WEIGHT: Record<ClassificationTier, number> = {
  "Gorilla": 0,
  "Potential Gorilla": 1,
  "King": 2,
  "Prince": 3,
  "Chimpanzee": 4,
  "Monkey": 5,
  "Serf": 6,
  "In Chasm": 7,
};

const TIER_BADGE: Record<ClassificationTier, string> = {
  "Gorilla": "bg-emerald-500 text-white",
  "Potential Gorilla": "bg-emerald-100 text-emerald-700",
  "King": "bg-blue-500 text-white",
  "Prince": "bg-blue-100 text-blue-700",
  "Chimpanzee": "bg-amber-500 text-white",
  "Monkey": "bg-amber-100 text-amber-700",
  "Serf": "bg-gray-300 text-gray-700",
  "In Chasm": "bg-rose-500 text-white",
};

const TIER_LABEL_KO: Record<ClassificationTier, string> = {
  "Gorilla": "고릴라",
  "Potential Gorilla": "잠재 고릴라",
  "King": "왕",
  "Prince": "왕자",
  "Chimpanzee": "침팬지",
  "Monkey": "원숭이",
  "Serf": "농노",
  "In Chasm": "캐즘 추락",
};

const ECO_ACCENT: Record<EcosystemId, { bar: string; tint: string; ring: string }> = {
  "ai": { bar: "bg-blue-500", tint: "bg-blue-50", ring: "ring-blue-200" },
  "cybersecurity": { bar: "bg-rose-500", tint: "bg-rose-50", ring: "ring-rose-200" },
  "energy-transition": { bar: "bg-emerald-500", tint: "bg-emerald-50", ring: "ring-emerald-200" },
  "defense": { bar: "bg-slate-600", tint: "bg-slate-50", ring: "ring-slate-200" },
  "korean-industrial": { bar: "bg-orange-500", tint: "bg-orange-50", ring: "ring-orange-200" },
  "crypto": { bar: "bg-violet-500", tint: "bg-violet-50", ring: "ring-violet-200" },
  "biotech": { bar: "bg-teal-500", tint: "bg-teal-50", ring: "ring-teal-200" },
  "auto-ev-battery": { bar: "bg-yellow-500", tint: "bg-yellow-50", ring: "ring-yellow-200" },
  "space": { bar: "bg-indigo-600", tint: "bg-indigo-50", ring: "ring-indigo-200" },
};

/**
 * 충돌의 본질에 대한 사람-주석. detectMooreConflicts가 자동 검출해도
 * "왜 이 충돌이 났고 어떻게 봐야 하나"는 토론 기반 해석이 필요함.
 *
 * - oligopoly: Moore 이론도 인정하는 구조 (Hyperscaler, DRAM/HBM 등)
 * - sub-category: 큰 단위 layer 묶음의 부산물 — sub-카테고리별로 다 자기 카테고리 고릴라
 * - data-error: 점수 산정 자체가 어긋난 경우 (현재 0건, 한국 방산은 v3.1에서 보정됨)
 */
type ConflictKind = "oligopoly" | "sub-category" | "data-error";

const CONFLICT_ANNOTATIONS: Record<string, { kind: ConflictKind; noteKo: string; noteEn: string }> = {
  "ai:semi-equipment": {
    kind: "sub-category",
    noteKo: "노광(ASML) vs 식각·증착(AMAT/LRCX) — 같은 layer 안에 다른 sub-카테고리",
    noteEn: "Litho (ASML) vs etch/deposition (AMAT/LRCX) — different sub-categories",
  },
  "ai:compute": {
    kind: "sub-category",
    noteKo: "학습 GPU(NVDA) · networking ASIC(AVGO) · 모바일 IP(ARM) — 각자 자기 카테고리 고릴라",
    noteEn: "Training GPU (NVDA) · networking ASIC (AVGO) · mobile IP (ARM) — each gorilla in its own category",
  },
  "ai:cloud": {
    kind: "oligopoly",
    noteKo: "Hyperscaler는 oligopoly가 안정 구조 — Moore도 일부 카테고리 duopoly 인정",
    noteEn: "Hyperscaler is a stable oligopoly — Moore acknowledges some categories settle as duopoly",
  },
  "ai:enterprise-saas": {
    kind: "sub-category",
    noteKo: "CRM(영업) · NOW(ITSM) — 같은 layer 안에 24개 sub-카테고리",
    noteEn: "CRM (sales) · NOW (ITSM) — 24 sub-categories under one layer",
  },
  "ai:consumer-ai-apps": {
    kind: "sub-category",
    noteKo: "검색 · SNS · 디바이스 — 각자 다른 카테고리의 고릴라",
    noteEn: "Search · social · devices — gorillas in different categories",
  },
  "korean-industrial:semi-memory": {
    kind: "oligopoly",
    noteKo: "DRAM/HBM은 oligopoly가 안정 구조 — 삼성=DRAM 종합, SK=HBM 특화",
    noteEn: "DRAM/HBM is a stable oligopoly — Samsung leads DRAM, SK leads HBM",
  },
  "korean-industrial:internet": {
    kind: "sub-category",
    noteKo: "NAVER(검색) vs KAKAO(메신저) — 다른 카테고리의 한국 #1",
    noteEn: "NAVER (search) vs KAKAO (messenger) — Korea #1 in different categories",
  },
};

const KIND_BADGE: Record<ConflictKind, { bg: string; emoji: string; labelKo: string; labelEn: string }> = {
  "oligopoly": { bg: "bg-emerald-100 text-emerald-800", emoji: "🟢", labelKo: "Oligopoly 인정", labelEn: "Oligopoly accepted" },
  "sub-category": { bg: "bg-amber-100 text-amber-800", emoji: "🟡", labelKo: "Sub-카테고리", labelEn: "Sub-categories" },
  "data-error": { bg: "bg-rose-100 text-rose-800", emoji: "🔴", labelKo: "데이터 보정 후보", labelEn: "Data correction candidate" },
};

function priceColor(pct: number): string {
  if (pct >= 0.05) return "text-emerald-600";
  if (pct >= 0.01) return "text-emerald-500";
  if (pct <= -0.05) return "text-rose-600";
  if (pct <= -0.01) return "text-rose-500";
  return "text-gray-500";
}

function newsColor(s: number): string {
  if (s >= 0.4) return "text-emerald-600";
  if (s >= 0.1) return "text-emerald-500";
  if (s <= -0.4) return "text-rose-600";
  if (s <= -0.1) return "text-rose-500";
  return "text-gray-500";
}

function fmtPct(p: number): string {
  const sign = p > 0 ? "+" : "";
  return `${sign}${(p * 100).toFixed(1)}%`;
}

function fmtSentiment(s: number): string {
  if (s >= 0.6) return "매우 긍정";
  if (s >= 0.2) return "긍정";
  if (s <= -0.6) return "매우 부정";
  if (s <= -0.2) return "부정";
  return "중립";
}

function fmtSentimentEn(s: number): string {
  if (s >= 0.6) return "Very positive";
  if (s >= 0.2) return "Positive";
  if (s <= -0.6) return "Very negative";
  if (s <= -0.2) return "Negative";
  return "Neutral";
}

function MomentumPanel({
  m,
  locale,
  t,
}: {
  m: import("@/lib/data/providers/layer-momentum").LayerMomentum;
  locale: string;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  const ko = locale === "ko";
  const sentimentLabel = m.newsSentiment !== null
    ? (ko ? fmtSentiment(m.newsSentiment) : fmtSentimentEn(m.newsSentiment))
    : null;

  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3 space-y-2 mb-3">
      <div className="text-[0.625rem] font-extrabold text-gray-500 uppercase tracking-wider">
        {t("momentumTitle")}
      </div>
      <div className="space-y-1.5">
        {/* Price */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-500">📈 {t("priceLabel")}</span>
          {m.priceMomentum !== null ? (
            <span className={`font-extrabold ${priceColor(m.priceMomentum)}`}>
              {fmtPct(m.priceMomentum)}
              <span className="font-medium text-gray-400 ml-1">
                ({t("sampleSize", { n: m.sampleSize.price })})
              </span>
            </span>
          ) : (
            <span className="text-gray-400 font-bold">{t("noData")}</span>
          )}
        </div>
        {/* News */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gray-500">🗞️ {t("newsLabel")}</span>
          {m.newsSentiment !== null && sentimentLabel ? (
            <span className={`font-extrabold ${newsColor(m.newsSentiment)}`}>
              {sentimentLabel}
              <span className="font-medium text-gray-400 ml-1">
                ({t("sampleSize", { n: m.sampleSize.news })})
              </span>
            </span>
          ) : (
            <span className="text-gray-400 font-bold">{t("noData")}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "ecosystemDetail" });
  const tList = await getTranslations({ locale, namespace: "ecosystems" });

  const eco = findEcosystem(slug);
  if (!eco) notFound();

  const accent = ECO_ACCENT[eco.id];

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);
  const firmById = new Map(firms.map((f) => [f.id, f]));

  const conflicts = await detectMooreConflicts(locale as "en" | "ko");
  const conflictByLayer = new Map<string, MooreConflict>();
  for (const c of conflicts) {
    if (c.ecosystemId === eco.id) conflictByLayer.set(c.layerId, c);
  }

  // Fetch momentum for every layer in parallel
  const momentums = await Promise.all(
    eco.layers.map((l) => getCachedLayerMomentum(eco.id, l.id)),
  );
  const momentumByLayer = new Map<string, LayerMomentum>(
    momentums.map((m) => [m.layerId, m]),
  );

  const totalPrimary = eco.layers.reduce(
    (sum, l) => sum + getLayerMemberships(eco.id, l.id).filter((m) => m.role === "primary").length,
    0,
  );

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link
        href="/ecosystems"
        className="text-xs font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        ← {tList("title")}
      </Link>

      {/* Hero */}
      <section className={`toss-card mb-6 relative overflow-hidden ${accent.tint}`}>
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accent.bar}`} />
        <div className="pl-3">
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="!text-2xl">{locale === "ko" ? eco.nameKo : eco.name}</h1>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {locale === "ko" ? eco.name : eco.nameKo}
            </span>
          </div>
          <p className="text-[0.9375rem] text-gray-700 mb-4 leading-relaxed">{eco.tagline}</p>
          <div className="bg-white/60 rounded-xl p-4">
            <div className="text-[0.6875rem] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5">
              {tList("thesisLabel")}
            </div>
            <p className="text-sm text-gray-800 leading-relaxed">{eco.thesis}</p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-gray-500">
            <span>{tList("stats", { layers: eco.layers.length, firms: totalPrimary })}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400 font-medium">{tList("momentumExplain")}</span>
          </div>
        </div>
      </section>

      {/* Layer cards */}
      <div className="space-y-4">
        {eco.layers.map((layer) => {
          const memberships = getLayerMemberships(eco.id, layer.id);
          const rows = memberships
            .map((m) => {
              const firm = firmById.get(m.firmId);
              const cls = classifications.get(m.firmId);
              if (!firm || !cls) return null;
              return { firm, cls, membership: m };
            })
            .filter((r): r is NonNullable<typeof r> => Boolean(r))
            .sort((a, b) => {
              const dt = TIER_WEIGHT[a.cls.tier] - TIER_WEIGHT[b.cls.tier];
              if (dt !== 0) return dt;
              return b.cls.totalScore - a.cls.totalScore;
            });

          const conflict = conflictByLayer.get(layer.id);
          const annotation = conflict ? CONFLICT_ANNOTATIONS[`${eco.id}:${layer.id}`] : null;
          const kindBadge = annotation ? KIND_BADGE[annotation.kind] : null;
          const momentum = momentumByLayer.get(layer.id);

          return (
            <section
              key={layer.id}
              className="toss-card grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5"
            >
              {/* Layer info (left) */}
              <div>
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className={`text-[0.6875rem] font-extrabold px-1.5 py-0.5 rounded ${accent.bar} text-white`}>
                    L{layer.position}
                  </span>
                  <h3 className="font-extrabold text-gray-900">
                    {locale === "ko" ? layer.nameKo : layer.name}
                  </h3>
                </div>
                <p className="text-[0.8125rem] text-gray-600 leading-snug mb-3">
                  {layer.description}
                </p>
                <div className="text-xs font-bold text-gray-400 mb-3">
                  {rows.filter((r) => r.membership.role === "primary").length} primary
                  {rows.filter((r) => r.membership.role === "secondary").length > 0 && (
                    <span> · {rows.filter((r) => r.membership.role === "secondary").length} secondary</span>
                  )}
                </div>

                {/* Momentum bar */}
                {momentum && <MomentumPanel m={momentum} locale={locale} t={tList} />}

                {/* Conflict badge */}
                {conflict && kindBadge && annotation && (
                  <div className={`mt-4 rounded-lg p-3 ${kindBadge.bg}`}>
                    <div className="text-[0.6875rem] font-extrabold uppercase tracking-wider mb-1">
                      {kindBadge.emoji} {locale === "ko" ? kindBadge.labelKo : kindBadge.labelEn}
                    </div>
                    <p className="text-xs leading-snug">
                      {locale === "ko" ? annotation.noteKo : annotation.noteEn}
                    </p>
                  </div>
                )}
                {conflict && !annotation && (
                  <div className="mt-4 rounded-lg p-3 bg-gray-100">
                    <div className="text-[0.6875rem] font-extrabold uppercase tracking-wider mb-1 text-gray-700">
                      ⚠️ {conflict.kind === "gorilla-collision" ? "Gorilla 충돌" : "후계 압력"}
                    </div>
                    <p className="text-xs text-gray-600">
                      {conflict.firmIds.join(" · ")}
                    </p>
                  </div>
                )}
              </div>

              {/* Firm grid (right) */}
              <div>
                {rows.length === 0 ? (
                  <div className="text-sm text-gray-400 italic py-3">
                    {tList("noFirms")}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {rows.map(({ firm, cls, membership }) => {
                      const tierLabel = locale === "ko" ? TIER_LABEL_KO[cls.tier] : cls.tier;
                      return (
                        <Link
                          key={`${firm.id}-${membership.role}`}
                          href={`/firms/${firm.slug}`}
                          className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 border transition-colors ${
                            membership.role === "secondary"
                              ? "border-dashed border-gray-200 bg-gray-50 hover:border-gray-300"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-extrabold text-gray-900 truncate">
                                {firm.name}
                              </span>
                              {membership.role === "secondary" && (
                                <span className="text-[0.625rem] font-bold text-gray-400 uppercase">
                                  cross
                                </span>
                              )}
                            </div>
                            <div className="text-[0.6875rem] font-bold text-gray-400 mt-0.5">
                              {firm.ticker} · {cls.totalScore}점
                            </div>
                          </div>
                          <span className={`shrink-0 text-[0.6875rem] font-extrabold px-2 py-1 rounded-md ${TIER_BADGE[cls.tier]}`}>
                            {tierLabel}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
