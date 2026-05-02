import { NextResponse } from "next/server";
import { getCachedLayerMomentum } from "@/lib/data/providers/layer-momentum";
import type { EcosystemId } from "@/types/ecosystem";

// 30분 ISR — layer momentum은 yahoo historical(layer firm 5-15개) 호출 후 집계.
// ecosystem detail 페이지에서 layer card 마다 client mount 시 fetch.
export const revalidate = 1800;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ ecoId: string; layerId: string }> },
) {
  const { ecoId, layerId } = await ctx.params;
  try {
    const m = await getCachedLayerMomentum(ecoId as EcosystemId, layerId);
    return NextResponse.json(m);
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
