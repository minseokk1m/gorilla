/**
 * Firm 출처 링크 모음 — 만화 thesis "출처 명시" 정책의 웹 구현.
 *
 * - 미국 firm (yahooTicker .KS/.KQ 외): SEC EDGAR 10-K 필터 검색
 * - 한국 firm (yahooTicker .KS, .KQ): DART 검색 (회사명 기반)
 * - 공통: Yahoo Finance 페이지
 *
 * SEC는 ticker로 직접 검색 가능 (CIK 매핑 불필요).
 */

interface Props {
  ticker: string;
  yahooTicker?: string;
  name: string;
}

function isKoreanFirm(yahooTicker?: string, ticker?: string): boolean {
  const t = (yahooTicker ?? ticker ?? "").toUpperCase();
  return t.endsWith(".KS") || t.endsWith(".KQ");
}

export default function FirmSources({ ticker, yahooTicker, name }: Props) {
  const isKorean = isKoreanFirm(yahooTicker, ticker);
  const yahoo = yahooTicker ?? ticker;
  const secUrl = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${encodeURIComponent(ticker)}&type=10-K&dateb=&owner=include&count=40`;
  const dartUrl = `https://dart.fss.or.kr/dsab007/main.do?option=corp&textCrpNm=${encodeURIComponent(name)}`;
  const yahooUrl = `https://finance.yahoo.com/quote/${encodeURIComponent(yahoo)}`;

  return (
    <div className="border-t border-gray-100 mt-3 pt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
      <span className="font-bold text-gray-400 uppercase tracking-wide">출처</span>
      {!isKorean && (
        <a
          href={secUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-gray-600 hover:text-[#0064FF] transition-colors"
          title="SEC EDGAR — 미국 상장사 공식 공시 (10-K 등)"
        >
          SEC 10-K ↗
        </a>
      )}
      {isKorean && (
        <a
          href={dartUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-gray-600 hover:text-[#0064FF] transition-colors"
          title="DART — 한국 금융감독원 전자공시"
        >
          DART ↗
        </a>
      )}
      <a
        href={yahooUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-gray-600 hover:text-[#0064FF] transition-colors"
        title="Yahoo Finance — 가격·시총·뉴스"
      >
        Yahoo Finance ↗
      </a>
      <span className="text-gray-400 font-medium">
        만화 thesis와 일관: 사례 수치는 SEC 10-K · DART · IR 공식자료에서.
      </span>
    </div>
  );
}
