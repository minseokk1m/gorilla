// ISR: 30분 캐시 (layer momentum + yahoo 호출 다수)
export const revalidate = 1800;

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { ClassificationTier } from "@/types/classification";
import type { EcosystemId, Ecosystem } from "@/types/ecosystem";
import { findEcosystem } from "@/lib/data/mock/ecosystems";
import {
  getLayerMemberships,
  getFirmIdsForEcosystem,
  detectMooreConflictsForEcosystem,
  type MooreConflict,
} from "@/lib/data/providers/ecosystem-provider";
import {
  getFirmsByIds,
  getClassificationsByIds,
} from "@/lib/data/providers/firm-provider";
import { LayerMomentumLazy } from "@/components/ecosystems/LayerMomentumLazy";
import { EcosystemMacroBandLazy } from "@/components/ecosystems/EcosystemMacroBandLazy";
import { getCategoriesByLayer, getCategoryById } from "@/lib/data/providers/product-category-provider";
import { PHASE_BADGE, ROLE_BADGE, phaseLabel, roleLabel } from "@/components/ecosystems/category-style";

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

// ── Top-level page (sync-fast — Hero 즉시 stream, 나머지 Suspense child) ──

export default async function EcosystemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const eco = findEcosystem(slug);
  if (!eco) notFound();

  const tList = await getTranslations({ locale, namespace: "ecosystems" });
  const accent = ECO_ACCENT[eco.id];

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <Link
        href="/ecosystems"
        className="text-xs font-bold text-gray-500 hover:text-gray-900 mb-4 inline-block"
      >
        ← {tList("title")}
      </Link>

      {/* Hero — sync, no data deps */}
      <Hero eco={eco} locale={locale} accent={accent} tList={tList} />

      {/* Macro band — client lazy (yahoo on /api/ecosystem-momentum/[ecoId]/macro) */}
      <EcosystemMacroBandLazy ecoId={eco.id} locale={locale} />

      {/* Layer cards — Suspense (firm + classification + conflicts; momentum은 client lazy) */}
      <Suspense fallback={<LayerCardsSkeleton layerCount={eco.layers.length} />}>
        <LayerCards eco={eco} locale={locale} accent={accent} />
      </Suspense>
    </main>
  );
}

// ── Hero (sync) ──

function Hero({
  eco,
  locale,
  accent,
  tList,
}: {
  eco: Ecosystem;
  locale: string;
  accent: { bar: string; tint: string; ring: string };
  tList: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const totalPrimary = eco.layers.reduce(
    (sum, l) => sum + getLayerMemberships(eco.id, l.id).filter((m) => m.role === "primary").length,
    0,
  );

  return (
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
  );
}

// ── LayerCards (async, Suspense child) ──

async function LayerCards({
  eco,
  locale,
  accent,
}: {
  eco: Ecosystem;
  locale: string;
  accent: { bar: string; tint: string; ring: string };
}) {
  const tList = await getTranslations({ locale, namespace: "ecosystems" });

  // Scoped fetch — only this ecosystem's firms (not all 145).
  // momentum/macro는 client lazy로 분리(LayerMomentumLazy / EcosystemMacroBandLazy)
  // — 각 API 호출이 독립 vercel function이라 layer 단위 timeout budget 가짐.
  const ids = getFirmIdsForEcosystem(eco.id);

  const [firms, classifications, conflicts] = await Promise.all([
    getFirmsByIds(ids),
    getClassificationsByIds(ids, locale),
    detectMooreConflictsForEcosystem(eco.id, locale as "en" | "ko"),
  ]);

  const firmById = new Map(firms.map((f) => [f.id, f]));
  const conflictByLayer = new Map<string, MooreConflict>();
  for (const c of conflicts) conflictByLayer.set(c.layerId, c);

  return (
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

        return (
          <section
            key={layer.id}
            id={`layer-${layer.id}`}
            className="toss-card grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 scroll-mt-6"
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

              {/* Momentum bar — client lazy fetch */}
              <LayerMomentumLazy ecoId={eco.id} layerId={layer.id} locale={locale} />

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

            {/* Firm grid + categories (right) */}
            <div className="space-y-4">
              {/* Product Category list */}
              <CategoryListForLayer
                ecosystemId={eco.id}
                layerId={layer.id}
                locale={locale}
                headingLabel={tList("categoriesInLayer")}
                noCatLabel={tList("noCategoriesInLayer")}
              />

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
  );
}

// ── Skeletons (Suspense fallback) ──

function LayerCardsSkeleton({ layerCount }: { layerCount: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: layerCount }).map((_, i) => (
        <section
          key={i}
          className="toss-card grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5 animate-pulse"
        >
          <div>
            <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-full mb-1" />
            <div className="h-3 bg-gray-100 rounded w-3/4 mb-4" />
            <div className="h-16 bg-gray-100 rounded" />
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-100 rounded w-32" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="h-12 bg-gray-100 rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// ── Category list (sync — pure data) ──

function CategoryListForLayer({
  ecosystemId,
  layerId,
  locale,
  headingLabel,
  noCatLabel,
}: {
  ecosystemId: EcosystemId;
  layerId: string;
  locale: string;
  headingLabel: string;
  noCatLabel: string;
}) {
  const cats = getCategoriesByLayer(ecosystemId, layerId);
  if (cats.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/40 px-3 py-2 text-[0.6875rem] font-medium text-gray-400">
        {noCatLabel}
      </div>
    );
  }
  return (
    <div>
      <div className="text-[0.625rem] font-extrabold text-gray-500 uppercase tracking-wider mb-1.5">
        {headingLabel}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {cats.map((c) => {
          const phaseStyle = PHASE_BADGE[c.phase];
          const leader = c.participants[0];
          const leaderRole = leader ? ROLE_BADGE[leader.role] : null;
          const successor = c.successorCategoryId ? getCategoryById(c.successorCategoryId) : null;
          return (
            <div
              key={c.id}
              className="rounded-lg border border-gray-100 bg-white px-2.5 py-1.5"
              title={c.phaseRationale}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${phaseStyle.bg} ${phaseStyle.text}`}>
                      {phaseStyle.emoji} {phaseLabel(c.phase, locale)}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-gray-800 mt-0.5 truncate">
                    {locale === "ko" ? c.nameKo : c.name}
                  </div>
                </div>
                {leader && leaderRole && (
                  <span
                    className={`shrink-0 text-[0.625rem] font-extrabold px-1.5 py-0.5 rounded ${leaderRole.bg} ${leaderRole.text}`}
                    title={leader.rationale}
                  >
                    {roleLabel(leader.role, locale)} · {leader.firmId.toUpperCase()}
                  </span>
                )}
              </div>
              {successor && (
                <div className="mt-1 pt-1 border-t border-gray-100 text-[0.6875rem] text-gray-500">
                  <span className="text-gray-400">→</span>{" "}
                  <Link
                    href={`/ecosystems/${successor.ecosystemId}#layer-${successor.layerId}`}
                    className="font-bold text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    {locale === "ko" ? successor.nameKo : successor.name}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
