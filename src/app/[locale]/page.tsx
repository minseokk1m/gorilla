import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import type { ClassificationResult, ClassificationTier } from "@/types/classification";
import type { Firm } from "@/types/firm";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { getSupabase } from "@/lib/supabase/admin";
import SignalBadge from "@/components/firms/SignalBadge";

/* ── Tier styling ── */
const TIER_STYLE: Record<string, { dot: string; bg: string; text: string }> = {
  Gorilla:           { dot: "bg-emerald-500", bg: "bg-emerald-50",  text: "text-emerald-700" },
  "Potential Gorilla": { dot: "bg-teal-500",  bg: "bg-teal-50",    text: "text-teal-700" },
  King:              { dot: "bg-[#0064FF]",   bg: "bg-blue-50",    text: "text-[#0064FF]" },
  Prince:            { dot: "bg-indigo-400",  bg: "bg-indigo-50",  text: "text-indigo-600" },
  Chimpanzee:        { dot: "bg-yellow-500",  bg: "bg-yellow-50",  text: "text-yellow-700" },
  Monkey:            { dot: "bg-orange-500",  bg: "bg-orange-50",  text: "text-orange-700" },
  Serf:              { dot: "bg-stone-400",   bg: "bg-stone-50",   text: "text-stone-600" },
  "In Chasm":        { dot: "bg-red-500",     bg: "bg-red-50",     text: "text-red-600" },
};

const TIER_EMOJI: Record<string, string> = {
  Gorilla: "🦍", "Potential Gorilla": "🦍", King: "👑", Prince: "🤴",
  Chimpanzee: "🐵", Monkey: "🐒", Serf: "⛏️", "In Chasm": "🕳️",
};

const TIER_ORDER: ClassificationTier[] = [
  "Gorilla", "Potential Gorilla", "King", "Prince", "Chimpanzee", "Monkey", "Serf", "In Chasm",
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  const tTiers = await getTranslations({ locale, namespace: "tiers" });
  const tPipeline = await getTranslations({ locale, namespace: "pipeline" });

  const [firms, classificationsMap] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);

  // Fetch discussion activity
  let openProposals = 0;
  let totalComments = 0;
  try {
    const supabase = getSupabase();
    const [pRes, cRes] = await Promise.all([
      supabase.from("signal_proposals").select("id", { count: "exact", head: true }).eq("status", "open"),
      supabase.from("discussions").select("id", { count: "exact", head: true }),
    ]);
    openProposals = pRes.count ?? 0;
    totalComments = cRes.count ?? 0;
  } catch {}

  // Group firms by tier
  const tierGroups = new Map<ClassificationTier, { firm: Firm; cls: ClassificationResult }[]>();
  TIER_ORDER.forEach((tier) => tierGroups.set(tier, []));
  for (const firm of firms) {
    const cls = classificationsMap.get(firm.id);
    if (!cls) continue;
    tierGroups.get(cls.tier)?.push({ firm, cls });
  }
  for (const arr of tierGroups.values()) {
    arr.sort((a, b) => b.cls.totalScore - a.cls.totalScore);
  }

  const gorillas = tierGroups.get("Gorilla") ?? [];
  const potentials = tierGroups.get("Potential Gorilla") ?? [];
  const kings = tierGroups.get("King") ?? [];
  const princes = tierGroups.get("Prince") ?? [];
  const chimps = tierGroups.get("Chimpanzee") ?? [];
  const monkeys = tierGroups.get("Monkey") ?? [];
  const serfs = tierGroups.get("Serf") ?? [];
  const inChasm = tierGroups.get("In Chasm") ?? [];

  const buyCount = gorillas.length + potentials.length;
  const watchCount = kings.length + princes.length;
  const sellCount = chimps.length;
  const avoidCount = monkeys.length + serfs.length + inChasm.length;

  // Latest classification timestamp
  const latestDate = Array.from(classificationsMap.values())
    .map((c) => c.classifiedAt)
    .filter(Boolean)
    .sort()
    .pop();
  const evalDate = latestDate ? new Date(latestDate) : new Date();
  const evalDateStr = evalDate.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* ── Header with evaluation timestamp ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="mb-0">{t("title")}</h1>
          <span className="toss-pill bg-[#0064FF] text-white text-[10px]">v1.0</span>
        </div>
        <p className="text-gray-500 max-w-2xl text-[0.9375rem] leading-relaxed mb-3">{t("subtitle")}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {evalDateStr} 기준 평가
          </span>
          <span className="text-gray-400 font-medium">{firms.length}개 기업 · 7차원 가중 점수 · 이중 트랙 8등급</span>
        </div>
      </div>

      {/* ── Tier distribution bar ── */}
      <div className="space-y-2">
        <div className="flex items-center gap-0.5 h-4 rounded-full overflow-hidden">
          {TIER_ORDER.map((tier) => {
            const count = tierGroups.get(tier)?.length ?? 0;
            if (count === 0) return null;
            return (
              <div
                key={tier}
                className={`h-full ${TIER_STYLE[tier].dot} opacity-80 rounded-sm transition-all relative group`}
                style={{ flex: count }}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-[9px] font-extrabold drop-shadow-sm">{count}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500 font-bold">
          {TIER_ORDER.map((tier) => {
            const count = tierGroups.get(tier)?.length ?? 0;
            if (count === 0) return null;
            return (
              <span key={tier} className="flex items-center gap-1">
                <span className={`w-2 h-2 rounded-sm ${TIER_STYLE[tier].dot}`} />
                {tTiers(`${tier}.label` as "Gorilla.label")} {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Gorilla Scorecard — Hero Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* LEFT: Gorillas (BUY) — 3 cols */}
        <div className="lg:col-span-3 rounded-2xl bg-emerald-50/60 ring-1 ring-emerald-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🦍</span>
                <h2 className="!text-base mb-0 text-emerald-800">고릴라를 사서 보유하라</h2>
              </div>
              <p className="text-xs text-emerald-600/70 mt-0.5">독점 아키텍처 + 높은 전환비용 + 시장 지배력을 갖춘 기업</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-emerald-700">{buyCount}</div>
                <div className="text-[10px] font-bold text-emerald-500">BUY</div>
              </div>
            </div>
          </div>

          {/* Gorilla tier */}
          {gorillas.length > 0 && (
            <div className="mb-3">
              <div className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider mb-2">
                Gorilla — {gorillas.length}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {gorillas.map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-extrabold text-gray-900 text-sm">{firm.ticker}</span>
                      <span className="text-xs text-gray-400 truncate hidden sm:inline">{firm.name}</span>
                      <span className="ml-auto text-xs font-extrabold text-emerald-700">{cls.totalScore}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Potential Gorilla tier */}
          {potentials.length > 0 && (
            <div>
              <div className="text-[10px] font-extrabold text-teal-600 uppercase tracking-wider mb-2">
                Potential Gorilla — {potentials.length}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {potentials.slice(0, 10).map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      <span className="font-extrabold text-gray-900 text-sm">{firm.ticker}</span>
                      <span className="text-xs text-gray-400 truncate hidden sm:inline">{firm.name}</span>
                      <span className="ml-auto text-xs font-extrabold text-teal-600">{cls.totalScore}</span>
                    </div>
                  </Link>
                ))}
                {potentials.length > 10 && (
                  <Link href="/firms">
                    <div className="text-center text-xs text-teal-600 font-bold py-2 hover:underline cursor-pointer col-span-2">
                      +{potentials.length - 10}개 더 보기 →
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Non-Gorillas summary — 2 cols */}
        <div className="lg:col-span-2 space-y-3">

          {/* WATCH */}
          <div className="rounded-2xl bg-blue-50/50 ring-1 ring-blue-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🔵</span>
                <div>
                  <span className="font-extrabold text-sm text-[#0064FF]">관망</span>
                  <span className="text-[10px] text-gray-400 font-medium ml-2">WATCH · {watchCount}개</span>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              {[...kings, ...princes].slice(0, 6).map(({ firm, cls }) => (
                <Link key={firm.id} href={`/firms/${firm.slug}`}>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/60 hover:bg-white transition-all cursor-pointer">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${TIER_STYLE[cls.tier].dot}`} />
                    <span className="font-extrabold text-gray-900 text-xs">{firm.ticker}</span>
                    <span className="text-[10px] text-gray-400 truncate">{firm.name}</span>
                    <span className="ml-auto text-[10px] font-bold text-gray-400">{cls.totalScore}</span>
                  </div>
                </Link>
              ))}
              {watchCount > 6 && (
                <Link href="/firms">
                  <div className="text-center text-[10px] text-[#0064FF] font-bold py-1 hover:underline">
                    +{watchCount - 6}개 더 보기 →
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* SELL (Chimps) */}
          {chimps.length > 0 && (
            <div className="rounded-2xl bg-orange-50/40 ring-1 ring-orange-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">🟠</span>
                <span className="font-extrabold text-sm text-orange-600">토네이도에서만</span>
                <span className="text-[10px] text-gray-400 font-medium">SELL · {sellCount}개</span>
              </div>
              <div className="space-y-1">
                {chimps.slice(0, 5).map(({ firm, cls }) => (
                  <Link key={firm.id} href={`/firms/${firm.slug}`}>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/60 hover:bg-white transition-all cursor-pointer">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                      <span className="font-extrabold text-gray-900 text-xs">{firm.ticker}</span>
                      <span className="text-[10px] text-gray-400 truncate">{firm.name}</span>
                      <span className="ml-auto text-[10px] font-bold text-gray-400">{cls.totalScore}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* AVOID */}
          <div className="rounded-2xl bg-red-50/30 ring-1 ring-red-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">🔴</span>
              <span className="font-extrabold text-sm text-red-500">회피</span>
              <span className="text-[10px] text-gray-400 font-medium">AVOID · {avoidCount}개</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[...monkeys, ...serfs, ...inChasm].slice(0, 20).map(({ firm, cls }) => (
                <Link key={firm.id} href={`/firms/${firm.slug}`}>
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/60 hover:bg-white transition-all cursor-pointer text-[10px] font-bold text-gray-500">
                    {firm.ticker}
                    <span className="text-gray-300">{cls.totalScore}</span>
                  </span>
                </Link>
              ))}
              {avoidCount > 20 && (
                <Link href="/firms">
                  <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold text-red-400 hover:underline cursor-pointer">
                    +{avoidCount - 20}개 →
                  </span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Investment Principle Strip ── */}
      <div className="toss-card !bg-gray-50/80">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg mb-1">🟢</div>
            <div className="text-sm font-extrabold text-gray-900">고릴라를 사서 보유</div>
            <div className="text-xs text-gray-400 mt-0.5">Gorilla + Potential Gorilla = BUY</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">{buyCount}개</div>
          </div>
          <div>
            <div className="text-lg mb-1">🟠</div>
            <div className="text-sm font-extrabold text-gray-900">침프는 토네이도에서만</div>
            <div className="text-xs text-gray-400 mt-0.5">토네이도 종료 시 매도</div>
            <div className="text-2xl font-extrabold text-orange-600 mt-1">{sellCount}개</div>
          </div>
          <div>
            <div className="text-lg mb-1">🔴</div>
            <div className="text-sm font-extrabold text-gray-900">원숭이는 피하라</div>
            <div className="text-xs text-gray-400 mt-0.5">아키텍처 없는 상품화 시장</div>
            <div className="text-2xl font-extrabold text-red-500 mt-1">{avoidCount}개</div>
          </div>
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/categories">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">🗺️</div>
            <div className="text-sm font-extrabold text-gray-900">카테고리 TALC</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">19개 섹터별 분류</div>
          </div>
        </Link>
        <Link href="/firms">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">📊</div>
            <div className="text-sm font-extrabold text-gray-900">전체 기업 분류</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">{firms.length}개 기업 · 7차원 점수</div>
          </div>
        </Link>
        <Link href="/discuss">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">💬</div>
            <div className="text-sm font-extrabold text-gray-900">토론 게시판</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              {openProposals > 0 ? `${openProposals}건 제안` : "합의 기반 편집"}
              {totalComments > 0 && ` · ${totalComments} 댓글`}
            </div>
          </div>
        </Link>
        <Link href="/learn">
          <div className="toss-card-interactive !p-4 text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-sm font-extrabold text-gray-900">10대 원칙 & 학습</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">GG 원칙 · 멤버 주석</div>
          </div>
        </Link>
      </div>

      <div className="text-center py-4">
        <Link
          href="/learn"
          className="inline-flex items-center gap-2 text-[#0064FF] hover:underline font-bold text-[0.9375rem]"
        >
          {t("learnMore")}
        </Link>
      </div>
    </main>
  );
}
