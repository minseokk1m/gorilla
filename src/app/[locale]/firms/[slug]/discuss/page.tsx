"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import SignalPanel from "@/components/discuss/SignalPanel";
import ProposalForm from "@/components/discuss/ProposalForm";
import DiscussionThread from "@/components/discuss/DiscussionThread";

interface FirmData {
  firm: {
    id: string;
    slug: string;
    name: string;
    ticker: string;
    classificationSignals: Record<string, number | boolean>;
  };
  classification: {
    tier: string;
    signal: string;
    totalScore: number;
    marketPhase: string;
  };
}

export default function FirmDiscussPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [firmData, setFirmData] = useState<FirmData | null>(null);
  const [comments, setComments] = useState<[]>([]);
  const [proposals, setProposals] = useState<[]>([]);
  const [proposalModal, setProposalModal] = useState<{ field: string; currentValue: string; label: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [firmRes, commentsRes, proposalsRes] = await Promise.all([
        fetch(`/api/firms/${slug}`),
        fetch(`/api/discuss?firmId=${slug}`),
        fetch(`/api/proposals?firmId=${slug}`),
      ]);

      if (firmRes.ok) {
        const { data } = await firmRes.json();
        setFirmData(data);

        // Re-fetch discussions with the actual firm id
        const firmId = data.firm.id;
        const [cRes, pRes] = await Promise.all([
          fetch(`/api/discuss?firmId=${firmId}`),
          fetch(`/api/proposals?firmId=${firmId}`),
        ]);
        if (cRes.ok) setComments((await cRes.json()).data ?? []);
        if (pRes.ok) setProposals((await pRes.json()).data ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="text-center text-gray-400 py-20">로딩 중...</div>
      </main>
    );
  }

  if (!firmData) {
    return (
      <main className="max-w-5xl mx-auto px-5 py-10">
        <div className="text-center text-gray-400 py-20">기업을 찾을 수 없습니다.</div>
      </main>
    );
  }

  const { firm, classification } = firmData;

  const TIER_COLORS: Record<string, string> = {
    Gorilla: "bg-emerald-50 text-emerald-700",
    "Potential Gorilla": "bg-teal-50 text-teal-700",
    King: "bg-blue-50 text-[#0064FF]",
    Chimpanzee: "bg-yellow-50 text-yellow-700",
    Monkey: "bg-orange-50 text-orange-700",
    "In Chasm": "bg-red-50 text-red-600",
  };

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
        <Link href="/firms" className="hover:text-gray-900 transition-colors">기업</Link>
        <span>/</span>
        <Link href={`/firms/${slug}`} className="hover:text-gray-900 transition-colors">{firm.ticker}</Link>
        <span>/</span>
        <span className="text-gray-900 font-bold">토론</span>
      </div>

      {/* Header */}
      <div className="toss-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">{firm.ticker} 분류 신호 토론</h1>
            <p className="text-gray-500 font-medium mt-1">{firm.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`toss-pill ${TIER_COLORS[classification.tier] ?? "bg-gray-100 text-gray-600"}`}>
              {classification.tier}
            </span>
            <span className="text-sm font-extrabold text-gray-900">Score {classification.totalScore}</span>
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Signal Panel */}
        <div className="lg:col-span-2">
          <div className="toss-card space-y-4">
            <h2 className="text-base font-extrabold text-gray-900">분류 신호</h2>
            <p className="text-xs text-gray-400 font-medium">각 항목에 마우스를 올리면 변경 제안 버튼이 나타납니다.</p>
            <SignalPanel
              firmId={firm.id}
              signals={firm.classificationSignals as any}
              onPropose={(field, currentValue, label) =>
                setProposalModal({ field, currentValue, label })
              }
            />
          </div>
        </div>

        {/* Right: Discussion */}
        <div className="lg:col-span-3">
          <div className="toss-card">
            <DiscussionThread
              firmId={firm.id}
              comments={comments}
              proposals={proposals}
              onRefresh={fetchAll}
            />
          </div>
        </div>
      </div>

      {/* Proposal Modal */}
      {proposalModal && (
        <ProposalForm
          firmId={firm.id}
          signalField={proposalModal.field}
          signalLabel={proposalModal.label}
          currentValue={proposalModal.currentValue}
          onClose={() => setProposalModal(null)}
          onSubmitted={fetchAll}
        />
      )}
    </main>
  );
}
