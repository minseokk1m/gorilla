import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// GET /api/annotations?principle=1
export async function GET(req: NextRequest) {
  const supabase = getSupabase();
  const principle = req.nextUrl.searchParams.get("principle");

  let query = supabase
    .from("principle_annotations")
    .select("*")
    .order("created_at", { ascending: true });

  if (principle) {
    query = query.eq("principle_number", Number(principle));
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

// POST /api/annotations
export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const body = await req.json();
  const { principleNumber, authorName, body: commentBody } = body;

  if (!principleNumber || !commentBody) {
    return NextResponse.json({ error: "principleNumber and body are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("principle_annotations")
    .insert({
      principle_number: principleNumber,
      author_name: authorName || "Anonymous",
      body: commentBody,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
