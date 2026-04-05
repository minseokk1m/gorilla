import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const dynamic = "force-dynamic";

// GET /api/discuss?firmId=msft — get discussions for a firm
// GET /api/discuss — get all recent discussions
export async function GET(req: NextRequest) {
  const firmId = req.nextUrl.searchParams.get("firmId");

  let query = supabase
    .from("discussions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (firmId) {
    query = query.eq("firm_id", firmId);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

// POST /api/discuss — create a new discussion comment
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firmId, authorName, body: commentBody, proposalId } = body;

  if (!firmId || !commentBody) {
    return NextResponse.json({ error: "firmId and body are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("discussions")
    .insert({
      firm_id: firmId,
      author_name: authorName || "Anonymous",
      body: commentBody,
      proposal_id: proposalId || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
