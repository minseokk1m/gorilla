import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabase = getSupabase();
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

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
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
