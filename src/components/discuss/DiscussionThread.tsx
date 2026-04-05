"use client";

import { useState } from "react";

interface Comment {
  id: string;
  firm_id: string;
  author_name: string;
  body: string;
  created_at: string;
  proposal_id: string | null;
}

interface Proposal {
  id: string;
  firm_id: string;
  signal_field: string;
  current_value: string;
  proposed_value: string;
  rationale: string | null;
  status: "open" | "accepted" | "rejected";
  created_at: string;
}

interface Props {
  firmId: string;
  comments: Comment[];
  proposals: Proposal[];
  onRefresh: () => void;
}

const STATUS_STYLE = {
  open: "bg-yellow-50 text-yellow-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-600",
};

const STATUS_LABEL = {
  open: "논의 중",
  accepted: "승인됨",
  rejected: "반려됨",
};

const FIELD_LABELS: Record<string, string> = {
  estimatedNicheMarketShare: "시장 점유율",
  netRevenueRetention: "NRR",
  ecosystemPartnerCount: "파트너 수",
  isDefactoStandard: "사실상 표준",
  competitorCount: "경쟁자 수",
  hasProprietaryProtocol: "독점 프로토콜",
};

export default function DiscussionThread({ firmId, comments, proposals, onRefresh }: Props) {
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await fetch("/api/discuss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firmId,
          authorName: authorName || "Anonymous",
          body: newComment,
        }),
      });
      setNewComment("");
      onRefresh();
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProposalAction(proposalId: string, action: "accept" | "reject") {
    await fetch("/api/proposals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proposalId, action }),
    });
    onRefresh();
  }

  function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="space-y-6">
      {/* Proposals */}
      {proposals.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-gray-700">변경 제안</h3>
          {proposals.map((p) => (
            <div key={p.id} className="toss-card !p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-900">{FIELD_LABELS[p.signal_field] ?? p.signal_field}</span>
                  <span className="text-xs text-gray-400">{p.current_value}</span>
                  <span className="text-xs text-gray-400">→</span>
                  <span className="text-sm font-extrabold text-[#0064FF]">{p.proposed_value}</span>
                </div>
                <span className={`toss-pill text-[10px] ${STATUS_STYLE[p.status]}`}>
                  {STATUS_LABEL[p.status]}
                </span>
              </div>
              {p.rationale && (
                <p className="text-xs text-gray-500 leading-relaxed">{p.rationale}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{formatTime(p.created_at)}</span>
                {p.status === "open" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleProposalAction(p.id, "accept")}
                      className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      승인
                    </button>
                    <button
                      onClick={() => handleProposalAction(p.id, "reject")}
                      className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      반려
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comments */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-gray-700">토론 ({comments.length})</h3>
        {comments.length === 0 && (
          <p className="text-sm text-gray-400">아직 의견이 없습니다. 첫 번째 의견을 남겨보세요.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0064FF]/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-extrabold text-[#0064FF]">{c.author_name[0]?.toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900">{c.author_name}</span>
                <span className="text-xs text-gray-400">{formatTime(c.created_at)}</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-0.5 whitespace-pre-wrap">{c.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmitComment} className="space-y-2 pt-2 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="이름"
            className="w-24 px-3 py-2 rounded-xl bg-gray-50 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
          />
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="의견을 남겨주세요..."
            className="flex-1 px-3 py-2 rounded-xl bg-gray-50 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="px-4 py-2 rounded-xl bg-[#0064FF] text-white font-bold text-sm hover:bg-[#0050CC] transition-colors disabled:opacity-50 shrink-0"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
