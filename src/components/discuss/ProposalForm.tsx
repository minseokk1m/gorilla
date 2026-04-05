"use client";

import { useState } from "react";

interface Props {
  firmId: string;
  signalField: string;
  signalLabel: string;
  currentValue: string;
  onClose: () => void;
  onSubmitted: () => void;
}

export default function ProposalForm({ firmId, signalField, signalLabel, currentValue, onClose, onSubmitted }: Props) {
  const [proposedValue, setProposedValue] = useState("");
  const [rationale, setRationale] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!proposedValue) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firmId,
          signalField,
          currentValue,
          proposedValue,
          rationale,
          proposedByName: authorName || "Anonymous",
        }),
      });
      if (res.ok) {
        onSubmitted();
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-extrabold text-gray-900">변경 제안</h3>
        <div className="text-sm text-gray-500">
          <span className="font-bold text-gray-700">{signalLabel}</span> 현재 값: <span className="font-extrabold text-gray-900">{currentValue}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">제안 값</label>
            <input
              type="text"
              value={proposedValue}
              onChange={(e) => setProposedValue(e.target.value)}
              placeholder="예: 0.65 또는 true"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border-none text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">근거 (선택)</label>
            <textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="왜 이 값이 더 적절한지 설명해주세요..."
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30 resize-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">이름</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="닉네임"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border-none text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0064FF]/30"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={submitting || !proposedValue}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#0064FF] text-white font-bold text-sm hover:bg-[#0050CC] transition-colors disabled:opacity-50"
            >
              {submitting ? "제출 중..." : "제안하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
