import { Link } from "@/i18n/routing";

/**
 * 페이지 섹션 헤더 — 큰 그룹 사이 시각 구분 + "왜 보여주는가" 한 줄 설명.
 * 첫 방문자가 페이지 위계를 파악할 수 있게 함.
 *
 * id 부여 시 페이지 상단 anchor nav에서 jump 가능 (scroll-mt-20).
 */
export function SectionHeader({
  id,
  emoji,
  title,
  subtitle,
  viewAllHref,
  viewAllLabel,
}: {
  id?: string;
  emoji: string;
  title: string;
  subtitle: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  return (
    <div
      id={id}
      className="pt-6 pb-1 flex items-baseline justify-between gap-3 border-t border-gray-100 first:border-t-0 first:pt-2 scroll-mt-20"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl shrink-0">{emoji}</span>
          <h2 className="!text-lg !mb-0">{title}</h2>
        </div>
        <p className="text-xs text-gray-500 leading-snug">{subtitle}</p>
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="text-[0.6875rem] font-bold text-[#0064FF] hover:underline shrink-0 whitespace-nowrap"
        >
          {viewAllLabel ?? "전체 보기 →"}
        </Link>
      )}
    </div>
  );
}
