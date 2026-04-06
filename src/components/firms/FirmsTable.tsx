"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import ClassificationBadge from "./ClassificationBadge";
import SignalBadge from "./SignalBadge";
import { formatMarketCap, formatPercent, formatPrice } from "@/lib/utils/formatters";
import type { ClassificationTier, Signal } from "@/types/classification";

const MARKET_TYPE: Record<ClassificationTier, "proprietary" | "open" | "chasm"> = {
  Gorilla: "proprietary",
  "Potential Gorilla": "proprietary",
  Chimpanzee: "proprietary",
  Monkey: "proprietary",
  King: "open",
  Prince: "open",
  Serf: "open",
  "In Chasm": "chasm",
};

interface FirmRow {
  id: string;
  slug: string;
  ticker: string;
  name: string;
  sector: string;
  marketCapUSD: number;
  revenueGrowthYoY: number;
  tier: ClassificationTier;
  signal: Signal;
  totalScore: number;
  currentPrice?: number;
  priceChange1D?: number;
}

export default function FirmsTable({ rows }: { rows: FirmRow[] }) {
  const t = useTranslations("firms");
  const [query, setQuery] = useState("");
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());
  const tableRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.ticker.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.sector.toLowerCase().includes(q),
    );
  }, [rows, q]);

  // Scroll to first match when searching
  useEffect(() => {
    if (q && filtered.length > 0) {
      const el = rowRefs.current.get(filtered[0].id);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [q, filtered]);

  // Keyboard shortcut: Cmd+K or Ctrl+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      {/* Search bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-20 py-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0064FF]/20 focus:border-[#0064FF] transition-all"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-400 border border-gray-200">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </div>
        </div>
        {q && (
          <div className="mt-2 text-xs font-medium text-gray-400">
            {filtered.length}개 결과 {filtered.length < rows.length && `(전체 ${rows.length}개 중)`}
          </div>
        )}
      </div>

      {/* Table */}
      <div ref={tableRef} className="toss-card !p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colFirm")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden md:table-cell">{t("colSector")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden sm:table-cell">{t("colMarketType")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colClassification")}</th>
              <th className="text-left px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colSignal")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide">{t("colScore")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("colPrice")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">{t("col1D")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colMktCap")}</th>
              <th className="text-right px-3 sm:px-5 py-2.5 sm:py-3.5 text-gray-400 font-bold text-xs uppercase tracking-wide hidden xl:table-cell">{t("colRevGrowth")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const mt = MARKET_TYPE[row.tier];
              const isHighlight = q && (
                row.ticker.toLowerCase() === q || row.name.toLowerCase().startsWith(q)
              );
              return (
                <tr
                  key={row.id}
                  ref={(el) => { if (el) rowRefs.current.set(row.id, el); }}
                  className={`border-b border-gray-50 hover:bg-[#F8F9FA] transition-colors relative cursor-pointer group ${
                    isHighlight ? "bg-[#E8F0FE]/40" : ""
                  }`}
                >
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                    <Link href={`/firms/${row.slug}`} className="flex items-center gap-3 after:absolute after:inset-0 after:content-['']">
                      <div>
                        <div className="font-extrabold text-gray-900 group-hover:text-[#0064FF] transition-colors">{row.ticker}</div>
                        <div className="text-gray-400 text-xs font-medium">{row.name}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 hidden md:table-cell">
                    <span className="text-gray-500 text-xs font-medium">{row.sector}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 hidden sm:table-cell">
                    <span className={`toss-pill text-[10px] !py-0.5 ${
                      mt === "proprietary" ? "bg-amber-100 text-amber-700" :
                      mt === "open" ? "bg-indigo-100 text-indigo-600" :
                      "bg-gray-100 text-gray-500"
                    }`}>
                      {t(`marketType.${mt}`)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                    <ClassificationBadge tier={row.tier} size="sm" />
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4">
                    <SignalBadge signal={row.signal} size="sm" />
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 hidden sm:block">
                        <div className="h-1.5 rounded-full bg-[#0064FF]" style={{ width: `${row.totalScore}%` }} />
                      </div>
                      <span className="text-gray-900 font-extrabold">{row.totalScore}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden lg:table-cell">
                    <span className="text-gray-900 font-bold">{row.currentPrice ? formatPrice(row.currentPrice) : "—"}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden lg:table-cell">
                    {row.priceChange1D != null && (
                      <span className={`font-bold ${row.priceChange1D >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        {formatPercent(row.priceChange1D, true)}
                      </span>
                    )}
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden xl:table-cell">
                    <span className="text-gray-500 font-medium">{formatMarketCap(row.marketCapUSD)}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-2.5 sm:py-4 text-right hidden xl:table-cell">
                    <span className={`font-bold ${row.revenueGrowthYoY >= 0.2 ? "text-emerald-600" : row.revenueGrowthYoY >= 0.1 ? "text-[#0064FF]" : "text-gray-500"}`}>
                      {formatPercent(row.revenueGrowthYoY, true)}
                    </span>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-5 py-12 text-center text-gray-400 text-sm">
                  &quot;{query}&quot;에 대한 검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
