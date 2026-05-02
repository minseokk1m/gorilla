"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { EcosystemMomentum } from "@/lib/data/providers/layer-momentum";
import { InlineSparkline } from "./InlineSparkline";

/**
 * Server-side로 호출하면 ecosystem (~30 firm) yahoo historical 모두 await — vercel
 * function timeout 위험. client mount 후 lazy fetch.
 */
export function EcosystemMacroBandLazy({
  ecoId,
  locale,
}: {
  ecoId: string;
  locale: string;
}) {
  const t = useTranslations("ecosystems");
  const [m, setM] = useState<EcosystemMomentum | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/ecosystem-momentum/${ecoId}/macro`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: EcosystemMomentum | null) => {
        if (cancelled) return;
        if (!data) setFailed(true);
        else setM(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [ecoId]);

  if (failed) return null; // 거시 모멘텀 없으면 그냥 안 보여줌
  if (!m || m.priceMomentum === null) {
    return (
      <section className="toss-card mb-6 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
          <div>
            <div className="h-3 bg-gray-200 rounded w-32 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-12 bg-gray-100 rounded mb-2" />
            <div className="h-3 bg-gray-100 rounded w-40" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-7 bg-gray-100 rounded" />
              ))}
            </div>
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2" />
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-7 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const priceMomentum = m.priceMomentum;
  const oneWeek = m.priceMomentumByTimeframe["1w"];
  const twelveWeek = m.priceMomentumByTimeframe["12w"];

  return (
    <section className="toss-card mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5">
        {/* Left: numbers + sparkline */}
        <div>
          <div className="text-[0.6875rem] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
            {locale === "ko" ? "이코시스템 거시 모멘텀" : "Ecosystem macro momentum"}
          </div>
          <div className="flex items-baseline gap-3 mb-2">
            <span
              className={`text-3xl font-extrabold ${
                priceMomentum >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {priceMomentum > 0 ? "+" : ""}
              {(priceMomentum * 100).toFixed(1)}%
            </span>
            <span className="text-xs font-bold text-gray-400 uppercase">4w</span>
          </div>
          {m.priceSparkline && (
            <div className="mb-3">
              <InlineSparkline
                data={m.priceSparkline}
                width={260}
                height={50}
                color={priceMomentum >= 0 ? "#10b981" : "#f43f5e"}
                strokeWidth={1.5}
              />
              <div className="text-[0.625rem] font-bold text-gray-400 mt-1">
                {t("trendBase")}
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 text-[0.6875rem] font-bold text-gray-500">
            <span>
              1w{" "}
              <span className={oneWeek !== null && oneWeek >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {oneWeek !== null
                  ? `${oneWeek > 0 ? "+" : ""}${(oneWeek * 100).toFixed(1)}%`
                  : "—"}
              </span>
            </span>
            <span className="text-gray-300">·</span>
            <span>
              12w{" "}
              <span className={twelveWeek !== null && twelveWeek >= 0 ? "text-emerald-600" : "text-rose-600"}>
                {twelveWeek !== null
                  ? `${twelveWeek > 0 ? "+" : ""}${(twelveWeek * 100).toFixed(1)}%`
                  : "—"}
              </span>
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">
              {m.sampleSize.firms} firms · {m.sampleSize.layers} layers
            </span>
          </div>
        </div>

        {/* Right: top/bottom layer movers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="text-[0.6875rem] font-extrabold text-emerald-700 uppercase tracking-wider mb-2">
              ↗ {locale === "ko" ? "주도 layer" : "Top movers"} (4w)
            </div>
            <div className="space-y-1.5">
              {m.topMovers.map((mv) => (
                <a
                  key={mv.layerId}
                  href={`#layer-${mv.layerId}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 bg-emerald-50/60 hover:bg-emerald-100 transition-colors"
                >
                  <span className="text-xs font-bold text-gray-800 truncate">
                    {locale === "ko" ? mv.layerNameKo : mv.layerName}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 shrink-0">
                    {mv.change > 0 ? "+" : ""}
                    {(mv.change * 100).toFixed(1)}%
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[0.6875rem] font-extrabold text-rose-700 uppercase tracking-wider mb-2">
              ↘ {locale === "ko" ? "약세 layer" : "Bottom movers"} (4w)
            </div>
            <div className="space-y-1.5">
              {m.bottomMovers.map((mv) => (
                <a
                  key={mv.layerId}
                  href={`#layer-${mv.layerId}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 bg-rose-50/60 hover:bg-rose-100 transition-colors"
                >
                  <span className="text-xs font-bold text-gray-800 truncate">
                    {locale === "ko" ? mv.layerNameKo : mv.layerName}
                  </span>
                  <span className="text-xs font-extrabold text-rose-700 shrink-0">
                    {mv.change > 0 ? "+" : ""}
                    {(mv.change * 100).toFixed(1)}%
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
