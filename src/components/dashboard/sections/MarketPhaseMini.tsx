import type { ClassificationResult, MarketPhase } from "@/types/classification";
import { Link } from "@/i18n/routing";

const PHASE_ORDER: MarketPhase[] = [
  "Early Market",
  "Bowling Alley",
  "Tornado",
  "Thriving Main Street",
  "Maturing Main Street",
  "Declining Main Street",
  "Fault Line",
  "End of Life",
];

const PHASE_COLOR: Record<MarketPhase, string> = {
  "Early Market":            "bg-sky-200",
  "Bowling Alley":           "bg-indigo-300",
  "Tornado":                 "bg-emerald-500",
  "Thriving Main Street":    "bg-emerald-300",
  "Maturing Main Street":    "bg-gray-300",
  "Declining Main Street":   "bg-amber-300",
  "Fault Line":              "bg-orange-400",
  "End of Life":             "bg-rose-400",
};

const PHASE_LABEL_KO: Record<MarketPhase, string> = {
  "Early Market": "초기시장",
  "Bowling Alley": "볼링앨리",
  "Tornado": "토네이도",
  "Thriving Main Street": "성장 메인",
  "Maturing Main Street": "성숙 메인",
  "Declining Main Street": "쇠퇴 메인",
  "Fault Line": "단층선",
  "End of Life": "수명 종료",
};

/**
 * 홈용 mini market phase overview — 145 firm이 8단계 어디에 모여있는지
 * 한 줄 stacked bar + 카운트로 요약. 큰 TALC 곡선은 /landscape 페이지로.
 */
export function MarketPhaseMini({
  classifications,
  locale,
  viewAllHref = "/landscape",
  viewAllLabel,
}: {
  classifications: Map<string, ClassificationResult>;
  locale: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const counts = new Map<MarketPhase, number>();
  for (const c of classifications.values()) {
    counts.set(c.marketPhase, (counts.get(c.marketPhase) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;

  return (
    <section className="toss-card">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="!text-base">
          {locale === "ko" ? "8단계 시장 수명주기 분포" : "8-Stage market lifecycle"}
        </h3>
        <Link
          href={viewAllHref}
          className="text-[0.6875rem] font-bold text-[#0064FF] hover:underline shrink-0"
        >
          {viewAllLabel ?? (locale === "ko" ? "곡선 전체 보기 →" : "See full curve →")}
        </Link>
      </div>
      <p className="text-xs text-gray-500 leading-snug mb-3">
        {locale === "ko"
          ? "145개 firm이 Moore 8단계 어디에 분포 — 토네이도(폭발 매수)와 메인 스트리트(캐시카우)의 비중을 보면 시장 위치가 한 눈에."
          : "Distribution of 145 firms across Moore's 8 stages — Tornado vs Main Street weight tells you where the market sits."}
      </p>

      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 mb-2">
        {PHASE_ORDER.map((phase) => {
          const n = counts.get(phase) ?? 0;
          if (n === 0) return null;
          const pct = (n / total) * 100;
          return (
            <div
              key={phase}
              className={PHASE_COLOR[phase]}
              style={{ width: `${pct}%` }}
              title={`${PHASE_LABEL_KO[phase]}: ${n} (${pct.toFixed(0)}%)`}
            />
          );
        })}
      </div>

      {/* Inline counts */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.6875rem] font-bold">
        {PHASE_ORDER.filter((p) => (counts.get(p) ?? 0) > 0).map((phase) => (
          <span key={phase} className="flex items-center gap-1 text-gray-600">
            <span className={`inline-block w-1.5 h-1.5 rounded-sm ${PHASE_COLOR[phase]}`} />
            {locale === "ko" ? PHASE_LABEL_KO[phase] : phase} {counts.get(phase)}
          </span>
        ))}
      </div>
    </section>
  );
}
