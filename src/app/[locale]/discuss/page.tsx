import { getAllFirms, getAllClassifications } from "@/lib/data/providers/firm-provider";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function DiscussIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const [firms, classifications] = await Promise.all([
    getAllFirms(),
    getAllClassifications(locale),
  ]);

  // Fetch proposal counts per firm
  const { data: proposals } = await supabase
    .from("signal_proposals")
    .select("firm_id, status");

  const { data: comments } = await supabase
    .from("discussions")
    .select("firm_id");

  // Count open proposals and comments per firm
  const proposalCounts = new Map<string, { open: number; total: number }>();
  const commentCounts = new Map<string, number>();

  for (const p of proposals ?? []) {
    const existing = proposalCounts.get(p.firm_id) ?? { open: 0, total: 0 };
    existing.total++;
    if (p.status === "open") existing.open++;
    proposalCounts.set(p.firm_id, existing);
  }

  for (const c of comments ?? []) {
    commentCounts.set(c.firm_id, (commentCounts.get(c.firm_id) ?? 0) + 1);
  }

  // Sort firms: those with open proposals first, then by total activity
  const sortedFirms = [...firms].sort((a, b) => {
    const aOpen = proposalCounts.get(a.id)?.open ?? 0;
    const bOpen = proposalCounts.get(b.id)?.open ?? 0;
    if (aOpen !== bOpen) return bOpen - aOpen;
    const aActivity = (proposalCounts.get(a.id)?.total ?? 0) + (commentCounts.get(a.id) ?? 0);
    const bActivity = (proposalCounts.get(b.id)?.total ?? 0) + (commentCounts.get(b.id) ?? 0);
    return bActivity - aActivity;
  });

  const TIER_COLORS: Record<string, string> = {
    Gorilla: "bg-emerald-50 text-emerald-700",
    "Potential Gorilla": "bg-teal-50 text-teal-700",
    King: "bg-blue-50 text-[#0064FF]",
    Chimpanzee: "bg-yellow-50 text-yellow-700",
    Monkey: "bg-orange-50 text-orange-700",
    "In Chasm": "bg-red-50 text-red-600",
  };

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="mb-2">분류 신호 토론 게시판</h1>
        <p className="text-gray-500 text-[0.9375rem] leading-relaxed">
          각 기업의 고릴라 게임 분류 신호를 멤버들이 토론하고, 합의한 값으로 편집할 수 있습니다.
        </p>
      </div>

      <div className="space-y-2">
        {sortedFirms.map((firm) => {
          const cls = classifications.get(firm.id);
          const pCount = proposalCounts.get(firm.id);
          const cCount = commentCounts.get(firm.id) ?? 0;
          const hasActivity = (pCount?.total ?? 0) > 0 || cCount > 0;

          return (
            <Link key={firm.id} href={`/firms/${firm.slug}/discuss`}>
              <div className="toss-card-interactive !p-4 !rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-gray-900">{firm.ticker}</span>
                      <span className="text-sm text-gray-400 truncate">{firm.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {cls && (
                        <span className={`toss-pill text-[10px] ${TIER_COLORS[cls.tier] ?? ""}`}>
                          {cls.tier}
                        </span>
                      )}
                      {cls && (
                        <span className="text-xs font-bold text-gray-400">Score {cls.totalScore}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {(pCount?.open ?? 0) > 0 && (
                    <span className="toss-pill bg-yellow-50 text-yellow-700 text-[10px]">
                      {pCount!.open} 제안
                    </span>
                  )}
                  {cCount > 0 && (
                    <span className="text-xs font-bold text-gray-400">{cCount} 댓글</span>
                  )}
                  {!hasActivity && (
                    <span className="text-xs text-gray-300">토론 없음</span>
                  )}
                  <span className="text-gray-300 text-sm">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
