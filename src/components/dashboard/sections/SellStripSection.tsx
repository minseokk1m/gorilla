import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getAllFirms } from "@/lib/data/providers/firm-provider";
import { getGroupedSellCandidates } from "@/lib/data/providers/sell-signal-engine";

export async function SellStripSection({ locale }: { locale: string }) {
  const tEco = await getTranslations({ locale, namespace: "ecosystems" });
  const [firms, sellGroups] = await Promise.all([
    getAllFirms(),
    getGroupedSellCandidates(),
  ]);
  const firmName = (id: string) => firms.find((f) => f.id === id)?.name ?? id;
  const firmSlug = (id: string) => firms.find((f) => f.id === id)?.slug ?? id;

  if (sellGroups.exit.length === 0 && sellGroups.rebalance.length === 0 && sellGroups.warn.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* EXIT */}
      <div className="toss-card !bg-gradient-to-br !from-rose-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("sellExitTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-rose-700">{sellGroups.exit.length}</div>
        </div>
        {sellGroups.exit.length === 0 ? (
          <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
        ) : (
          <div className="space-y-1">
            {sellGroups.exit.slice(0, 4).map((c) => (
              <Link
                key={c.firmId}
                href={`/firms/${firmSlug(c.firmId)}`}
                className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                title={c.topSignal.reasonKo}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                  <span className="shrink-0 text-[0.625rem] font-extrabold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">
                    {c.topSignal.kind.replace("EXIT-", "")}
                  </span>
                </div>
                <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                  {c.topSignal.reasonKo}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* REBALANCE */}
      <div className="toss-card !bg-gradient-to-br !from-amber-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("sellRebalanceTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-amber-700">{sellGroups.rebalance.length}</div>
        </div>
        {sellGroups.rebalance.length === 0 ? (
          <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
        ) : (
          <div className="space-y-1">
            {sellGroups.rebalance.slice(0, 4).map((c) => (
              <Link
                key={c.firmId}
                href={`/firms/${firmSlug(c.firmId)}`}
                className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                title={c.topSignal.reasonKo}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                  <span className="shrink-0 text-[0.625rem] font-extrabold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                    REBAL
                  </span>
                </div>
                <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                  {c.topSignal.reasonKo}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* WARN */}
      <div className="toss-card !bg-gradient-to-br !from-yellow-50 !to-white">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-extrabold text-gray-900">{tEco("sellWarnTitle")}</div>
          <div className="text-[0.6875rem] font-bold text-yellow-700">{sellGroups.warn.length}</div>
        </div>
        {sellGroups.warn.length === 0 ? (
          <div className="text-xs text-gray-400 italic">{tEco("sellEmpty")}</div>
        ) : (
          <div className="space-y-1">
            {sellGroups.warn.slice(0, 4).map((c) => (
              <Link
                key={c.firmId}
                href={`/firms/${firmSlug(c.firmId)}`}
                className="block rounded-lg px-2.5 py-1.5 hover:bg-white/60 transition-colors"
                title={c.topSignal.reasonKo}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-gray-900 truncate">{firmName(c.firmId)}</span>
                  <span className="shrink-0 text-[0.625rem] font-extrabold text-yellow-700 bg-yellow-100 px-1.5 py-0.5 rounded">
                    {c.topSignal.kind.replace("WARN-", "")}
                  </span>
                </div>
                <div className="text-[0.6875rem] text-gray-500 mt-0.5 line-clamp-1">
                  {c.topSignal.reasonKo}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
