import { NextResponse } from "next/server";
import { getCachedEcosystemMomentum } from "@/lib/data/providers/layer-momentum";
import type { EcosystemId } from "@/types/ecosystem";

// 30분 ISR — yahoo overlay 부담 회피 + ecosystem detail 페이지의 client lazy load 대상.
export const revalidate = 1800;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ ecoId: string }> },
) {
  const { ecoId } = await ctx.params;
  try {
    const m = await getCachedEcosystemMomentum(ecoId as EcosystemId);
    return NextResponse.json(m);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
