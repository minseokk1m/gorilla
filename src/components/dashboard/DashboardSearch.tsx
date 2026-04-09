"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/routing";

interface FirmEntry {
  slug: string;
  ticker: string;
  name: string;
  tier: string;
  score: number;
}

export default function DashboardSearch({ firms }: { firms: FirmEntry[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const q = query.trim().toLowerCase();
  const results = q.length > 0
    ? firms.filter(
        (f) =>
          f.ticker.toLowerCase().includes(q) ||
          f.name.toLowerCase().includes(q),
      ).slice(0, 8)
    : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="기업 검색 (티커 또는 이름)"
          className="w-full pl-9 pr-3 py-2 rounded-xl bg-white text-sm font-medium text-gray-900 placeholder:text-gray-400 outline-none ring-1 ring-gray-200 focus:ring-2 focus:ring-[#0064FF]/30 transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1.5 w-full bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden">
          {results.map((f) => (
            <button
              key={f.slug}
              onClick={() => { router.push(`/firms/${f.slug}`); setOpen(false); setQuery(""); }}
              className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-extrabold text-sm text-gray-900">{f.ticker}</span>
              <span className="text-xs text-gray-400 truncate">{f.name}</span>
              <span className="ml-auto text-[10px] font-bold text-gray-400">{f.tier} · {f.score}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
