"use client";

import { useState, useEffect } from "react";
import type { PriceHistory } from "@/types/market";
import type { NewsArticle } from "@/types/news";
import type { RevenueSegment } from "@/types/firm";
import StockChart from "./StockChart";
import RSIChart from "./RSIChart";

interface DimensionMeta {
  labelKo: string;
  labelEn: string;
  color: string;
}

interface Props {
  firmSlug: string;
  locale: string;
  priceChartTitle: string;
  rsiLabel: string;
  newsTitle: string;
  newsMockNote: string;
  noNews: string;
  revenueSegments?: RevenueSegment[];
  dimensionMeta: Record<string, DimensionMeta>;
  dimensionKeywords: Record<string, string[]>;
}

const SENTIMENT_COLORS: Record<string, string> = { Positive: "text-emerald-600", Neutral: "text-gray-500", Negative: "text-red-500" };
const SENTIMENT_DOTS: Record<string, string> = { Positive: "bg-emerald-500", Neutral: "bg-gray-400", Negative: "bg-red-500" };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric", year: "numeric" });
}

function analyzeImpact(article: NewsArticle, segments: RevenueSegment[] | undefined, dimKeywords: Record<string, string[]>) {
  const text = `${article.title ?? ""} ${article.summary ?? ""}`.toLowerCase();
  const matchedSegs: string[] = [];
  if (segments) {
    for (const seg of segments) {
      const words = `${seg.name} ${seg.description}`.toLowerCase().split(/[\s·()（）,，]+/).filter(w => w.length > 1);
      if (words.some(w => text.includes(w))) matchedSegs.push(seg.name);
    }
  }
  const matchedDims: string[] = [];
  for (const [dim, keywords] of Object.entries(dimKeywords)) {
    if (keywords.some(kw => text.includes(kw.toLowerCase()))) matchedDims.push(dim);
  }
  return { segments: matchedSegs, dimensions: matchedDims };
}

export default function LiveDataSection({
  firmSlug, locale, priceChartTitle, rsiLabel, newsTitle, newsMockNote, noNews,
  revenueSegments, dimensionMeta, dimensionKeywords,
}: Props) {
  const [priceHistory, setPriceHistory] = useState<PriceHistory | null>(null);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [priceLoading, setPriceLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    // Fetch price and news in parallel, but render each as it arrives
    fetch(`/api/firms/${firmSlug}?field=price`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.priceHistory) setPriceHistory(data.priceHistory); })
      .catch(() => {})
      .finally(() => setPriceLoading(false));

    fetch(`/api/firms/${firmSlug}?field=news`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.news) setNews(data.news); })
      .catch(() => {})
      .finally(() => setNewsLoading(false));
  }, [firmSlug]);

  return (
    <>
      {/* Stock Chart */}
      <div className="toss-card space-y-4">
        <h2>{priceChartTitle}</h2>
        {priceLoading ? (
          <div className="flex items-center justify-center py-16 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
            주가 데이터 로딩 중...
          </div>
        ) : priceHistory ? (
          <>
            <StockChart priceHistory={priceHistory} />
            <h3 className="text-gray-500 font-bold pt-2">{rsiLabel}</h3>
            <RSIChart rsi={priceHistory.rsi} dates={priceHistory.candles.map(c => c.date)} />
          </>
        ) : (
          <p className="text-gray-400 text-sm py-8 text-center">주가 데이터를 불러올 수 없습니다.</p>
        )}
      </div>

      {/* News */}
      <div className="toss-card">
        <div className="flex items-center justify-between mb-5">
          <h2 className="mb-0">{newsTitle}</h2>
          {!newsLoading && news.length > 0 && news[0].url !== "#" && (
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 shrink-0">
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
              <span>·</span>
              <span>{new Date().toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })} 기준</span>
            </div>
          )}
        </div>
        {newsLoading ? (
          <div className="flex items-center justify-center py-8 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
            뉴스 로딩 중...
          </div>
        ) : news.length === 0 ? (
          <p className="text-gray-400 text-sm font-medium">{noNews}</p>
        ) : (
          <div className="space-y-4">
            {news.map((article) => {
              const impact = analyzeImpact(article, revenueSegments, dimensionKeywords);
              const hasImpact = impact.segments.length > 0 || impact.dimensions.length > 0;
              return (
                <div key={article.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${SENTIMENT_DOTS[article.sentiment] ?? "bg-gray-400"}`} />
                    <div className="min-w-0">
                      {article.url && article.url !== "#" ? (
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 text-sm leading-snug mb-1 font-bold hover:text-[#0064FF] transition-colors block">
                          {article.title}
                        </a>
                      ) : (
                        <h3 className="text-gray-900 text-sm leading-snug mb-1">{article.title}</h3>
                      )}
                      {article.summary && (
                        <p className="text-gray-500 text-xs leading-relaxed mb-2">{article.summary}</p>
                      )}
                      <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-1.5">
                        <span>{article.source}</span>
                        <span>·</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>·</span>
                        <span className={SENTIMENT_COLORS[article.sentiment] ?? "text-gray-500"}>{article.sentiment}</span>
                      </div>
                      {hasImpact && (
                        <div className="flex flex-wrap gap-1.5">
                          {impact.segments.map(seg => (
                            <span key={seg} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600">
                              📊 {seg}
                            </span>
                          ))}
                          {impact.dimensions.map(dim => {
                            const meta = dimensionMeta[dim];
                            return meta ? (
                              <span key={dim} className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold ${meta.color}`}>
                                {locale === "ko" ? meta.labelKo : meta.labelEn}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
