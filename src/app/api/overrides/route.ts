import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const dynamic = "force-dynamic";

// GET /api/overrides — get all signal overrides
export async function GET() {
  const { data, error } = await supabase
    .from("signal_overrides")
    .select("*");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}
