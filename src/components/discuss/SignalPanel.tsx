"use client";

import { useState } from "react";
import type { ClassificationSignals } from "@/types/firm";

interface Props {
  firmId: string;
  signals: ClassificationSignals;
  onPropose: (field: string, currentValue: string, label: string) => void;
}

const SIGNAL_LABELS: Record<keyof ClassificationSignals, { label: string; format: (v: number | boolean) => string }> = {
  estimatedNicheMarketShare: { label: "시장 점유율", format: (v) => `${Math.round(Number(v) * 100)}%` },
  netRevenueRetention: { label: "순수익 유지율 (NRR)", format: (v) => `${Math.round(Number(v) * 100)}%` },
  ecosystemPartnerCount: { label: "생태계 파트너 수", format: (v) => Number(v).toLocaleString() },
  isDefactoStandard: { label: "사실상 표준 여부", format: (v) => v ? "Yes" : "No" },
  competitorCount: { label: "경쟁자 수", format: (v) => String(v) },
  hasProprietaryProtocol: { label: "독점 프로토콜", format: (v) => v ? "Yes" : "No" },
};

export default function SignalPanel({ firmId, signals, onPropose }: Props) {
  return (
    <div className="space-y-2">
      {(Object.keys(SIGNAL_LABELS) as (keyof ClassificationSignals)[]).map((key) => {
        const { label, format } = SIGNAL_LABELS[key];
        const value = signals[key];
        return (
          <div
            key={key}
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#E8F0FE]/50 transition-colors group"
          >
            <div>
              <div className="text-sm font-bold text-gray-700">{label}</div>
              <div className="text-lg font-extrabold text-gray-900">{format(value)}</div>
            </div>
            <button
              onClick={() => onPropose(key, String(value), label)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-[#0064FF] bg-[#E8F0FE] px-3 py-1.5 rounded-lg hover:bg-[#0064FF] hover:text-white"
            >
              변경 제안
            </button>
          </div>
        );
      })}
    </div>
  );
}
