/**
 * signal_overrides Supabase 시드 스크립트
 *
 * 멤버 토론을 거쳐 결정된 ClassificationSignals 보정값을 Supabase에 박는다.
 * 등급 점수가 카테고리 정의(글로벌 vs 한국 시장 등)와 어긋날 때 임시로 보정해서
 * 분류 엔진의 결과를 정합화한다.
 *
 * 실행: npx tsx scripts/seed-overrides.ts
 *
 * 안전장치:
 * - 기본 read-only. --apply 플래그 있을 때만 실제 upsert.
 * - --dry-run으로 어떤 row가 박힐지 미리 확인.
 *
 * 환경: .env.local의 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 사용.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

interface SignalOverrideSeed {
  firmId: string;
  /** 사람이 읽는 컨텍스트 — 왜 이 보정이 필요한가 */
  reason: string;
  /** 토론·검토 라운드 식별 (예: "2026-05-01 점검 3 — 한국 방산") */
  source: string;
  signals: {
    estimatedNicheMarketShare?: number;
    netRevenueRetention?: number;
    ecosystemPartnerCount?: number;
    isDefactoStandard?: boolean;
    competitorCount?: number;
    hasProprietaryProtocol?: boolean;
  };
}

// ─────────────────────────────────────────────────────────────
// SEED VALUES — 이 배열에만 추가/수정. 코드 로직은 건드리지 말 것.
// ─────────────────────────────────────────────────────────────
const SEEDS: SignalOverrideSeed[] = [
  {
    firmId: "hwa",
    source: "2026-05-01 점검 3 — 한국 방산 점수 정합화",
    reason:
      "한화에어로는 K9 자주포 글로벌 점유 50%+ (폴란드·이집트·노르웨이 메가 수출), K-방산 통합 표준이지만 mock 기본값에서 share=0.15, isDefactoStandard=false로 잡혀 Prince(41점)가 됨. 글로벌 자주포 카테고리 기준으로 보정.",
    signals: {
      estimatedNicheMarketShare: 0.55,
      isDefactoStandard: true,
      ecosystemPartnerCount: 1000,
    },
  },
  {
    firmId: "hrt",
    source: "2026-05-01 점검 3 — 한국 방산 점수 정합화",
    reason:
      "현대로템(K2 전차)은 한국 시장 기준 점수가 글로벌 카테고리 점수처럼 잡혀 share=0.90, isDefactoStandard=true로 Gorilla(76점). 글로벌 전차 시장에서는 Leopard 2(독일)·Abrams(미)가 더 큰 표준이라 도전자급으로 보정.",
    signals: {
      estimatedNicheMarketShare: 0.45,
      isDefactoStandard: false,
    },
  },
  {
    firmId: "lig",
    source: "2026-05-01 점검 3 — 한국 방산 점수 정합화",
    reason:
      "LIG넥스원은 한국 #1 유도무기지만 글로벌 미사일 카테고리에서는 Lockheed Martin 등이 더 큰 표준. 한국 시장 기준 share=0.80, isDefactoStandard=true로 Pot Gorilla(73점)이던 것을 글로벌 카테고리 기준 25-35% 점유로 보정.",
    signals: {
      estimatedNicheMarketShare: 0.35,
      isDefactoStandard: false,
    },
  },
];

// ─────────────────────────────────────────────────────────────
// Driver
// ─────────────────────────────────────────────────────────────

function loadEnv() {
  try {
    const content = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
    for (const line of content.split("\n")) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {
    // .env.local 없어도 환경변수가 직접 주입됐으면 OK
  }
}

function rowFromSeed(s: SignalOverrideSeed) {
  const row: Record<string, unknown> = { firm_id: s.firmId };
  if (s.signals.estimatedNicheMarketShare !== undefined)
    row.estimated_niche_market_share = s.signals.estimatedNicheMarketShare;
  if (s.signals.netRevenueRetention !== undefined)
    row.net_revenue_retention = s.signals.netRevenueRetention;
  if (s.signals.ecosystemPartnerCount !== undefined)
    row.ecosystem_partner_count = s.signals.ecosystemPartnerCount;
  if (s.signals.isDefactoStandard !== undefined)
    row.is_defacto_standard = s.signals.isDefactoStandard;
  if (s.signals.competitorCount !== undefined)
    row.competitor_count = s.signals.competitorCount;
  if (s.signals.hasProprietaryProtocol !== undefined)
    row.has_proprietary_protocol = s.signals.hasProprietaryProtocol;
  return row;
}

async function main() {
  loadEnv();

  const apply = process.argv.includes("--apply");
  const dryRun = process.argv.includes("--dry-run");

  console.log(`Loaded ${SEEDS.length} seeds:`);
  for (const s of SEEDS) {
    console.log(`  • ${s.firmId}: ${Object.keys(s.signals).join(", ")}`);
    console.log(`    source: ${s.source}`);
    console.log(`    reason: ${s.reason}`);
    console.log("");
  }

  if (dryRun) {
    console.log("Rows to upsert:");
    for (const s of SEEDS) console.log(JSON.stringify(rowFromSeed(s), null, 2));
    return;
  }

  if (!apply) {
    console.log("Read-only mode. Use --apply to actually write to Supabase, or --dry-run to preview rows.");
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
    process.exit(1);
  }
  const supabase = createClient(url, key);

  const rows = SEEDS.map(rowFromSeed);
  const { data, error } = await supabase
    .from("signal_overrides")
    .upsert(rows, { onConflict: "firm_id" })
    .select();

  if (error) {
    console.error("Write error:", error.message);
    process.exit(1);
  }
  console.log(`Wrote ${data?.length ?? 0} rows.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
