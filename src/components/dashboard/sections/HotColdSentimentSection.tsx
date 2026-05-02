import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllFirms } from "@/lib/data/providers/firm-provider";
import { getHotColdLayers } from "@/lib/data/providers/layer-momentum";
import { getTopSentimentDrivenFirms } from "@/lib/data/providers/sentiment-driven-engine";
import { findEcosystem } from "@/lib/data/mock/ecosystems";
import type { EcosystemId } from "@/types/ecosystem";

const ECO_DOT: Record<EcosystemId, string> = {
  "ai": "bg-blue-500",
  "cybersecurity": "bg-rose-500",
  "energy-transition": "bg-emerald-500",
  "defense": "bg-slate-600",
  "korean-industrial": "bg-orange-500",
  "crypto": "bg-violet-500",
  "biotech": "bg-teal-500",
  "auto-ev-battery": "bg-yellow-500",
  "space": "bg-indigo-600",
};

export async function HotColdSentimentSection({ locale }: { locale: string }) {
  const tEco = await getTranslations({ locale, namespace: "ecosystems" });
  const [firms, hotCold, topSentimentFirms] = await Promise.all([
    getAllFirms(),
    getHotColdLayers(3),
    getTopSentimentDrivenFirms(5),
  ]);

  if (hotCold.hot.length === 0 && hotCold.cold.length === 0 && topSentimentFirms.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Hot */}
      <div className="toss-card !bg-gradient-to-br !from-emerald-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("hotLayersTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-gray-400">4w · Yahoo</div>
        </div>
        <div className="space-y-1.5">
          {hotCold.hot.map((m) => {
            const eco = findEcosystem(m.ecosystemId);
            const layer = eco?.layers.find((l) => l.id === m.layerId);
            if (!eco || !layer || m.priceMomentum === null) return null;
            return (
              <Link
                key={`${m.ecosystemId}-${m.layerId}`}
                href={`/ecosystems/${eco.slug}`}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white/60 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 inline-block w-2 h-2 rounded-full ${ECO_DOT[m.ecosystemId]}`} />
                  <span className="text-xs font-bold text-gray-700 truncate">
                    {locale === "ko" ? eco.nameKo : eco.name}
                  </span>
                  <span className="text-gray-300">›</span>
                  <span className="text-xs font-bold text-gray-900 truncate">
                    {locale === "ko" ? layer.nameKo : layer.name}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-emerald-600">
                  +{(m.priceMomentum * 100).toFixed(1)}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cold */}
      <div className="toss-card !bg-gradient-to-br !from-rose-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("coldLayersTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-gray-400">4w · Yahoo</div>
        </div>
        <div className="space-y-1.5">
          {hotCold.cold.map((m) => {
            const eco = findEcosystem(m.ecosystemId);
            const layer = eco?.layers.find((l) => l.id === m.layerId);
            if (!eco || !layer || m.priceMomentum === null) return null;
            return (
              <Link
                key={`${m.ecosystemId}-${m.layerId}`}
                href={`/ecosystems/${eco.slug}`}
                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-white/60 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 inline-block w-2 h-2 rounded-full ${ECO_DOT[m.ecosystemId]}`} />
                  <span className="text-xs font-bold text-gray-700 truncate">
                    {locale === "ko" ? eco.nameKo : eco.name}
                  </span>
                  <span className="text-gray-300">›</span>
                  <span className="text-xs font-bold text-gray-900 truncate">
                    {locale === "ko" ? layer.nameKo : layer.name}
                  </span>
                </div>
                <span className="shrink-0 text-sm font-extrabold text-rose-600">
                  {(m.priceMomentum * 100).toFixed(1)}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sentiment-driven */}
      <div className="toss-card !bg-gradient-to-br !from-indigo-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("sentimentDrivenTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-gray-400">/100</div>
        </div>
        <div className="space-y-1">
          {topSentimentFirms.map((p) => {
            const f = firms.find((x) => x.id === p.firmId);
            if (!f) return null;
            const tone = p.score >= 70 ? "text-indigo-700" : p.score >= 50 ? "text-indigo-600" : "text-gray-600";
            return (
              <Link
                key={p.firmId}
                href={`/firms/${f.slug}`}
                className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                title={p.topDriversKo[0] ?? ""}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-gray-900 truncate">{f.name}</span>
                  <span className={`shrink-0 text-sm font-extrabold ${tone}`}>{p.score}</span>
                </div>
                <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                  {locale === "ko" ? p.topDriversKo[0] ?? p.level : p.topDriversEn[0] ?? p.level}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
