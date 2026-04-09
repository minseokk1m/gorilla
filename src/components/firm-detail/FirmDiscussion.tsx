"use client";

import { useState, useEffect, useCallback } from "react";
import DiscussionThread from "@/components/discuss/DiscussionThread";

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

export default function FirmDiscussion({ firmId }: { firmId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [cRes, pRes] = await Promise.all([
        fetch(`/api/discuss?firmId=${firmId}`),
        fetch(`/api/proposals?firmId=${firmId}`),
      ]);
      if (cRes.ok) {
        const cJson = await cRes.json();
        setComments(Array.isArray(cJson) ? cJson : cJson.data ?? []);
      }
      if (pRes.ok) {
        const pJson = await pRes.json();
        setProposals(Array.isArray(pJson) ? pJson : pJson.data ?? []);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [firmId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (loading) {
    return (
      <div className="text-center py-8 text-sm text-gray-400 font-medium">
        토론 불러오는 중...
      </div>
    );
  }

  return (
    <DiscussionThread
      firmId={firmId}
      comments={comments}
      proposals={proposals}
      onRefresh={fetchData}
    />
  );
}
