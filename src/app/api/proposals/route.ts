import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { invalidateFirmCaches } from "@/lib/data/providers/firm-provider";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const dynamic = "force-dynamic";

// GET /api/proposals?firmId=msft&status=open
export async function GET(req: NextRequest) {
  const firmId = req.nextUrl.searchParams.get("firmId");
  const status = req.nextUrl.searchParams.get("status");

  let query = supabase
    .from("signal_proposals")
    .select("*")
    .order("created_at", { ascending: false });

  if (firmId) query = query.eq("firm_id", firmId);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

// POST /api/proposals — create a new signal change proposal
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firmId, signalField, currentValue, proposedValue, rationale, proposedByName } = body;

  if (!firmId || !signalField || proposedValue == null) {
    return NextResponse.json({ error: "firmId, signalField, and proposedValue are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("signal_proposals")
    .insert({
      firm_id: firmId,
      signal_field: signalField,
      current_value: String(currentValue ?? ""),
      proposed_value: String(proposedValue),
      rationale: rationale || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Also create a discussion comment for the proposal
  if (rationale) {
    await supabase.from("discussions").insert({
      firm_id: firmId,
      proposal_id: data.id,
      author_name: proposedByName || "Anonymous",
      body: `**제안:** ${signalField}를 ${currentValue} → ${proposedValue}로 변경\n\n${rationale}`,
    });
  }

  return NextResponse.json({ data });
}

// PATCH /api/proposals — accept or reject a proposal
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { proposalId, action } = body; // action: "accept" | "reject"

  if (!proposalId || !["accept", "reject"].includes(action)) {
    return NextResponse.json({ error: "proposalId and action (accept/reject) are required" }, { status: 400 });
  }

  // Get the proposal
  const { data: proposal, error: fetchError } = await supabase
    .from("signal_proposals")
    .select("*")
    .eq("id", proposalId)
    .single();

  if (fetchError || !proposal) {
    return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
  }

  // Update proposal status
  await supabase
    .from("signal_proposals")
    .update({
      status: action === "accept" ? "accepted" : "rejected",
      resolved_at: new Date().toISOString(),
    })
    .eq("id", proposalId);

  // If accepted, apply the signal override
  if (action === "accept") {
    const field = proposal.signal_field;
    const value = proposal.proposed_value;

    // Map camelCase field to snake_case column
    const fieldMap: Record<string, string> = {
      estimatedNicheMarketShare: "estimated_niche_market_share",
      netRevenueRetention: "net_revenue_retention",
      ecosystemPartnerCount: "ecosystem_partner_count",
      isDefactoStandard: "is_defacto_standard",
      competitorCount: "competitor_count",
      hasProprietaryProtocol: "has_proprietary_protocol",
    };

    const dbField = fieldMap[field];
    if (!dbField) {
      return NextResponse.json({ error: "Unknown signal field" }, { status: 400 });
    }

    // Parse value based on field type
    let parsedValue: number | boolean;
    if (field === "isDefactoStandard" || field === "hasProprietaryProtocol") {
      parsedValue = value === "true" || value === "1";
    } else {
      parsedValue = Number(value);
    }

    // Upsert the signal override
    const { error: upsertError } = await supabase
      .from("signal_overrides")
      .upsert(
        {
          firm_id: proposal.firm_id,
          [dbField]: parsedValue,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "firm_id" },
      );

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    // Invalidate caches so classification recalculates
    invalidateFirmCaches();
  }

  return NextResponse.json({ success: true, action });
}
