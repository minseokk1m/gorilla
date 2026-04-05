"use client";

import { useState, useEffect, useCallback } from "react";

interface Annotation {
  id: string;
  principle_number: number;
  author_name: string;
  body: string;
  created_at: string;
}

interface Props {
  principleNumber: number;
}

export default function PrincipleAnnotations({ principleNumber }: Props) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchAnnotations = useCallback(async () => {
    const res = await fetch(`/api/annotations?principle=${principleNumber}`);
    if (res.ok) {
      const { data } = await res.json();
      setAnnotations(data ?? []);
    }
  }, [principleNumber]);

  useEffect(() => {
    if (expanded) fetchAnnotations();
  }, [expanded, fetchAnnotations]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          principleNumber,
          authorName: authorName || "Anonymous",
          body: newComment,
        }),
      });
      setNewComment("");
      fetchAnnotations();
    } finally {
      setSubmitting(false);
    }
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-xs font-bold text-[#0064FF] hover:underline flex items-center gap-1"
      >
        {expanded ? "△ 접기" : "▽ 멤버 의견"}
        {annotations.length > 0 && !expanded && (
          <span className="toss-pill bg-[#E8F0FE] text-[#0064FF] text-[10px] ml-1">{annotations.length}</span>
        )}
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 pl-3 border-l-2 border-[#0064FF]/20">
          {/* Existing annotations */}
          {annotations.map((a) => (
            <div key={a.id} className="flex gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#0064FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-extrabold text-[#0064FF]">{a.author_name[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-900">{a.author_name}</span>
                  <span className="text-[10px] text-gray-400">{formatTime(a.created_at)}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mt-0.5 whitespace-pre-wrap">{a.body}</p>
              </div>
            </div>
          ))}

          {annotations.length === 0 && (
            <p className="text-xs text-gray-400">아직 의견이 없습니다. 이 원칙에 대한 경험이나 관찰을 공유해주세요.</p>
          )}

          {/* New annotation form */}
          <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="이름"
              className="w-20 px-2 py-1.5 rounded-lg bg-gray-50 text-xs font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
            />
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="경험, 관찰, 수정 의견..."
              className="flex-1 px-2 py-1.5 rounded-lg bg-gray-50 text-xs text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
            />
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#0064FF] text-white font-bold text-xs hover:bg-[#0050CC] transition-colors disabled:opacity-50 shrink-0"
            >
              등록
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
