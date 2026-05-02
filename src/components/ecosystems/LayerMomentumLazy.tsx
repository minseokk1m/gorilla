"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { LayerMomentum } from "@/lib/data/providers/layer-momentum";
import { MomentumPanel } from "./MomentumPanel";

/**
 * Server-side로 호출하면 yahoo historical(layer 5-15 firm)이 ecosystem detail
 * 페이지의 12 layer × 6 ecosystem 등으로 vercel function timeout(10s)을 넘기 쉬움.
 * client mount 후 /api/ecosystem-momentum/* 로 lazy fetch — 각 API 호출이 독립
 * function이라 layer 단위 timeout budget 가짐.
 */
export function LayerMomentumLazy({
  ecoId,
  layerId,
  locale,
}: {
  ecoId: string;
  layerId: string;
  locale: string;
}) {
  const t = useTranslations("ecosystems");
  const [m, setM] = useState<LayerMomentum | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/ecosystem-momentum/${ecoId}/layer/${layerId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: LayerMomentum) => {
        if (!cancelled) setM(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [ecoId, layerId]);

  if (failed) {
    return (
      <div className="text-[0.6875rem] font-medium text-gray-400 italic mt-3">
        {t("noData")}
      </div>
    );
  }

  if (!m) {
    return (
      <div className="mt-3 animate-pulse space-y-2">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-8 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded w-32" />
      </div>
    );
  }

  return (
    <MomentumPanel
      m={m}
      locale={locale}
      labels={{
        title: t("momentumTitle"),
        priceLabel: t("priceLabel"),
        newsLabel: t("newsLabel"),
        sampleSize: (n: number) => t("sampleSize", { n }),
        noData: t("noData"),
        tf: { "1w": t("tf1w"), "4w": t("tf4w"), "12w": t("tf12w") },
        trendBase: t("trendBase"),
      }}
    />
  );
}
