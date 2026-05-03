import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllFirms } from "@/lib/data/providers/firm-provider";
import { getFunnelCounts, getFirmsAtStage } from "@/lib/data/providers/funnel-engine";
import type { FunnelStage } from "@/types/funnel";

export async function FunnelSection({ locale }: { locale: string }) {
  const tEco = await getTranslations({ locale, namespace: "ecosystems" });
  const [firms, funnelCounts, holdFirms, confirmedFirms, potentialFirms] = await Promise.all([
    getAllFirms(),
    getFunnelCounts(),
    getFirmsAtStage("Hold"),
    getFirmsAtStage("Confirmed"),
    getFirmsAtStage("Potential"),
  ]);

  return (
    <section className="toss-card">
      <div className="flex items-baseline justify-between mb-1">
        <h2 className="!text-base">{tEco("funnelTitle")}</h2>
        <span className="text-[0.6875rem] font-bold text-gray-400">
          {firms.length} → {funnelCounts.Potential} → {funnelCounts.Confirmed} → {funnelCounts.Hold}
        </span>
      </div>
      <p className="text-xs text-gray-500 leading-snug mb-4">{tEco("funnelHint")}</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {(
          [
            { stage: "Candidate" as FunnelStage, count: funnelCounts.Candidate, top: [], bg: "bg-gray-50",     ring: "ring-gray-200",     accent: "text-gray-600",   labelKey: "stageCandidate", widthClass: "w-full" },
            { stage: "Potential" as FunnelStage, count: funnelCounts.Potential, top: potentialFirms.slice(0, 3), bg: "bg-blue-50",     ring: "ring-blue-200",     accent: "text-blue-700",   labelKey: "stagePotential", widthClass: "w-[88%]" },
            { stage: "Confirmed" as FunnelStage, count: funnelCounts.Confirmed, top: confirmedFirms.slice(0, 3), bg: "bg-emerald-50",  ring: "ring-emerald-200",  accent: "text-emerald-700",labelKey: "stageConfirmed", widthClass: "w-[76%]" },
            { stage: "Hold" as FunnelStage,      count: funnelCounts.Hold,      top: holdFirms.slice(0, 5),      bg: "bg-emerald-100", ring: "ring-emerald-300",  accent: "text-emerald-800",labelKey: "stageHold", widthClass: "w-[64%]" },
          ] as const
        ).map((s, i) => {
          // Candidate 단계는 전체 firm이라 필터 없이 /firms로 이동.
          const href = s.stage === "Candidate" ? "/firms" : `/firms?funnel=${s.stage}`;
          return (
            <Link
              key={s.stage}
              href={href}
              className={`group relative rounded-2xl ${s.bg} ring-1 ${s.ring} p-3 mx-auto ${s.widthClass} block transition-all hover:ring-2 hover:shadow-sm`}
              title={`${s.count}개 firm 전체 리스트 보기 →`}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <span className={`text-[0.6875rem] font-extrabold uppercase tracking-wider ${s.accent}`}>
                  {i + 1}. {tEco(s.labelKey as "stageCandidate")}
                </span>
                <span className={`text-lg font-extrabold ${s.accent}`}>{s.count}</span>
              </div>
              {s.top.length === 0 ? (
                <div className="text-[0.6875rem] text-gray-400 italic">
                  {s.stage === "Candidate" ? `전체 ${firms.length}` : "—"}
                </div>
              ) : (
                <div className="space-y-0.5">
                  {s.top.map((p) => {
                    const f = firms.find((x) => x.id === p.firmId);
                    if (!f) return null;
                    return (
                      <span
                        key={p.firmId}
                        className="block text-[0.6875rem] font-bold text-gray-700 truncate"
                      >
                        · {f.name}
                      </span>
                    );
                  })}
                </div>
              )}
              <div className={`mt-2 text-[0.625rem] font-bold ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                전체 {s.count}개 보기 →
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
