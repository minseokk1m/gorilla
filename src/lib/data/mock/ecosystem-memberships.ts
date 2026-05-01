import type { FirmEcosystemMembership } from "@/types/ecosystem";

/**
 * Firm × Ecosystem × Layer 매핑.
 *
 * 원칙:
 * - 거의 모든 기업은 단일 primary로 1:1 매핑한다.
 * - 가치사슬 교차 기업만 secondary로 추가 매핑한다 (예: SK하이닉스는 Korean Industrial 본적이지만
 *   AI foundry-memory에서도 보이도록 secondary).
 * - 7개 ecosystem 어디에도 자연스럽게 안 들어가는 기업은 매핑하지 않는다(uncategorized).
 *   현재: nflx, v, jpm, brk, tmus, vz, t, cost, wmt, ko, pg, cat, lin (총 13개)
 *   이는 Stage A v1의 의도된 공백 — Financial/Telecom/Consumer Staples ecosystem은 추후 확장.
 */
export const ECOSYSTEM_MEMBERSHIPS: FirmEcosystemMembership[] = [
  // ─────────────────────────────────────────────────────────────
  // AI ecosystem (primary 75)
  // ─────────────────────────────────────────────────────────────

  // L1 semi-equipment
  { firmId: "asml", ecosystemId: "ai", layerId: "semi-equipment", role: "primary" },
  { firmId: "amat", ecosystemId: "ai", layerId: "semi-equipment", role: "primary" },
  { firmId: "lrcx", ecosystemId: "ai", layerId: "semi-equipment", role: "primary" },

  // L2 foundry-memory
  { firmId: "tsm", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "tsem", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "mu", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "sndk", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "wdc", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "stx", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },
  { firmId: "simo", ecosystemId: "ai", layerId: "foundry-memory", role: "primary" },

  // L3 compute
  { firmId: "nvda", ecosystemId: "ai", layerId: "compute", role: "primary" },
  { firmId: "amd", ecosystemId: "ai", layerId: "compute", role: "primary" },
  { firmId: "intc", ecosystemId: "ai", layerId: "compute", role: "primary" },
  { firmId: "avgo", ecosystemId: "ai", layerId: "compute", role: "primary" },
  { firmId: "arm", ecosystemId: "ai", layerId: "compute", role: "primary" },

  // L4 optical
  { firmId: "cohr", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "lite", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "aaoi", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "ipgp", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "glw", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "cien", ecosystemId: "ai", layerId: "optical", role: "primary" },
  { firmId: "axti", ecosystemId: "ai", layerId: "optical", role: "primary" },

  // L5 dc-power (Vertiv만 DC 전용; GEV/PWR은 grid가 본업, dc는 고객)
  { firmId: "vrt", ecosystemId: "ai", layerId: "dc-power", role: "primary" },

  // L6 networking
  { firmId: "csco", ecosystemId: "ai", layerId: "networking", role: "primary" },

  // L7 cloud
  { firmId: "msft", ecosystemId: "ai", layerId: "cloud", role: "primary" },
  { firmId: "amzn", ecosystemId: "ai", layerId: "cloud", role: "primary" },
  { firmId: "orcl", ecosystemId: "ai", layerId: "cloud", role: "primary" },
  { firmId: "ibm", ecosystemId: "ai", layerId: "cloud", role: "primary" },

  // L8 data-platform
  { firmId: "snow", ecosystemId: "ai", layerId: "data-platform", role: "primary" },
  { firmId: "mdb", ecosystemId: "ai", layerId: "data-platform", role: "primary" },
  { firmId: "elastic", ecosystemId: "ai", layerId: "data-platform", role: "primary" },
  { firmId: "cflt", ecosystemId: "ai", layerId: "data-platform", role: "primary" },
  { firmId: "splk", ecosystemId: "ai", layerId: "data-platform", role: "primary" },
  { firmId: "ampl", ecosystemId: "ai", layerId: "data-platform", role: "primary" },

  // L9 ai-platform (AI 플랫폼·옵저버빌리티·MLOps·dev tools)
  { firmId: "pltr", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "c3ai", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "ddog", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "dynt", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "nrg", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "frog", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "gtlb", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "hashi", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },
  { firmId: "twlo", ecosystemId: "ai", layerId: "ai-platform", role: "primary" },

  // L10 ai-apps (AI-native + AI-도입 SaaS — 둘 다 포함)
  { firmId: "crm", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "now", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "adbe", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "intu", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "googl", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "meta", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "aapl", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "sap", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "wday", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "hubs", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "path", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "brze", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "ttd", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "veeva", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "asan", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "ints", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "lspn", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "spk", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "zm", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "rng", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "fivn", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "box", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "drp", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "dxcm", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "zen", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "appf", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },
  { firmId: "azpn", ecosystemId: "ai", layerId: "ai-apps", role: "primary" },

  // L11 ai-security
  { firmId: "crwd", ecosystemId: "ai", layerId: "ai-security", role: "primary" },
  { firmId: "panw", ecosystemId: "ai", layerId: "ai-security", role: "primary" },
  { firmId: "ftnt", ecosystemId: "ai", layerId: "ai-security", role: "primary" },
  { firmId: "sent", ecosystemId: "ai", layerId: "ai-security", role: "primary" },
  { firmId: "okta", ecosystemId: "ai", layerId: "ai-security", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Energy Transition (primary 14)
  // ─────────────────────────────────────────────────────────────
  { firmId: "uec", ecosystemId: "energy-transition", layerId: "nuclear-fuel", role: "primary" },
  { firmId: "uuuu", ecosystemId: "energy-transition", layerId: "nuclear-fuel", role: "primary" },

  { firmId: "bwxt", ecosystemId: "energy-transition", layerId: "nuclear-reactor", role: "primary" },

  { firmId: "nee", ecosystemId: "energy-transition", layerId: "renewables", role: "primary" },
  { firmId: "be", ecosystemId: "energy-transition", layerId: "renewables", role: "primary" },

  { firmId: "gev", ecosystemId: "energy-transition", layerId: "grid-infrastructure", role: "primary" },
  { firmId: "pwr", ecosystemId: "energy-transition", layerId: "grid-infrastructure", role: "primary" },

  { firmId: "alb", ecosystemId: "energy-transition", layerId: "critical-materials", role: "primary" },

  { firmId: "xom", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },
  { firmId: "cvx", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },
  { firmId: "bkr", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },
  { firmId: "vlo", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },
  { firmId: "fang", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },
  { firmId: "insw", ecosystemId: "energy-transition", layerId: "oil-gas", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Defense Resurgence (primary 14)
  // ─────────────────────────────────────────────────────────────
  { firmId: "lmt", ecosystemId: "defense", layerId: "prime-contractors", role: "primary" },
  { firmId: "rtx", ecosystemId: "defense", layerId: "prime-contractors", role: "primary" },
  { firmId: "noc", ecosystemId: "defense", layerId: "prime-contractors", role: "primary" },
  { firmId: "gd", ecosystemId: "defense", layerId: "prime-contractors", role: "primary" },

  { firmId: "ge", ecosystemId: "defense", layerId: "aerospace-systems", role: "primary" },
  { firmId: "hon", ecosystemId: "defense", layerId: "aerospace-systems", role: "primary" },
  { firmId: "moga", ecosystemId: "defense", layerId: "aerospace-systems", role: "primary" },
  { firmId: "ftai", ecosystemId: "defense", layerId: "aerospace-systems", role: "primary" },
  { firmId: "cw", ecosystemId: "defense", layerId: "aerospace-systems", role: "primary" },

  { firmId: "hii", ecosystemId: "defense", layerId: "naval-shipbuilding", role: "primary" },

  { firmId: "lhx", ecosystemId: "defense", layerId: "defense-electronics", role: "primary" },
  { firmId: "tdy", ecosystemId: "defense", layerId: "defense-electronics", role: "primary" },

  { firmId: "ktos", ecosystemId: "defense", layerId: "nextgen-autonomy", role: "primary" },

  { firmId: "crs", ecosystemId: "defense", layerId: "defense-materials", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Korean Industrial (primary 17 — 한국 lens, 모든 한국 상장사)
  // ─────────────────────────────────────────────────────────────
  { firmId: "sec", ecosystemId: "korean-industrial", layerId: "semi-memory", role: "primary" },
  { firmId: "skhynix", ecosystemId: "korean-industrial", layerId: "semi-memory", role: "primary" },

  { firmId: "hhih", ecosystemId: "korean-industrial", layerId: "shipbuilding", role: "primary" },
  { firmId: "hho", ecosystemId: "korean-industrial", layerId: "shipbuilding", role: "primary" },
  { firmId: "shi", ecosystemId: "korean-industrial", layerId: "shipbuilding", role: "primary" },

  { firmId: "hwa", ecosystemId: "korean-industrial", layerId: "defense", role: "primary" },
  { firmId: "lig", ecosystemId: "korean-industrial", layerId: "defense", role: "primary" },
  { firmId: "hrt", ecosystemId: "korean-industrial", layerId: "defense", role: "primary" },

  { firmId: "hyundai", ecosystemId: "korean-industrial", layerId: "auto", role: "primary" },
  { firmId: "kia", ecosystemId: "korean-industrial", layerId: "auto", role: "primary" },

  { firmId: "lges", ecosystemId: "korean-industrial", layerId: "battery", role: "primary" },
  { firmId: "sdi", ecosystemId: "korean-industrial", layerId: "battery", role: "primary" },

  { firmId: "naver", ecosystemId: "korean-industrial", layerId: "internet", role: "primary" },
  { firmId: "kakao", ecosystemId: "korean-industrial", layerId: "internet", role: "primary" },

  { firmId: "celltrion", ecosystemId: "korean-industrial", layerId: "bio", role: "primary" },
  { firmId: "sbiologics", ecosystemId: "korean-industrial", layerId: "bio", role: "primary" },

  { firmId: "posco", ecosystemId: "korean-industrial", layerId: "materials", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Crypto (primary 3)
  // ─────────────────────────────────────────────────────────────
  { firmId: "coin", ecosystemId: "crypto", layerId: "exchange-broker", role: "primary" },
  { firmId: "mstr", ecosystemId: "crypto", layerId: "treasury", role: "primary" },
  { firmId: "crcl", ecosystemId: "crypto", layerId: "stablecoin", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Biotech & Pharma (primary 4)
  // ─────────────────────────────────────────────────────────────
  { firmId: "lly", ecosystemId: "biotech", layerId: "big-pharma", role: "primary" },
  { firmId: "jnj", ecosystemId: "biotech", layerId: "big-pharma", role: "primary" },
  { firmId: "mrk", ecosystemId: "biotech", layerId: "big-pharma", role: "primary" },

  { firmId: "unh", ecosystemId: "biotech", layerId: "healthcare-services", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Auto-EV-Battery (primary 1)
  // ─────────────────────────────────────────────────────────────
  { firmId: "tsla", ecosystemId: "auto-ev-battery", layerId: "oem", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Space Economy (primary 4)
  // ─────────────────────────────────────────────────────────────
  { firmId: "rklb", ecosystemId: "space", layerId: "launch", role: "primary" },
  { firmId: "asts", ecosystemId: "space", layerId: "satellite-comms", role: "primary" },
  { firmId: "sats", ecosystemId: "space", layerId: "satellite-comms", role: "primary" },
  { firmId: "pl", ecosystemId: "space", layerId: "earth-observation", role: "primary" },

  // ─────────────────────────────────────────────────────────────
  // Secondary (cross-cutting)
  // ─────────────────────────────────────────────────────────────

  // 한국 메모리 양강 → AI foundry-memory에서도 보임
  {
    firmId: "sec",
    ecosystemId: "ai",
    layerId: "foundry-memory",
    role: "secondary",
    rationale: "HBM·DRAM·NAND 글로벌 메모리 표준 — AI 컴퓨트의 핵심 입력",
  },
  {
    firmId: "skhynix",
    ecosystemId: "ai",
    layerId: "foundry-memory",
    role: "secondary",
    rationale: "HBM3E 단일 공급에 가까운 위치 — NVIDIA 학습 GPU의 종속 부품",
  },

  // 그리드 인프라 → AI dc-power 고객
  {
    firmId: "gev",
    ecosystemId: "ai",
    layerId: "dc-power",
    role: "secondary",
    rationale: "데이터센터향 가스터빈·송전 솔루션 — 본업은 grid",
  },
  {
    firmId: "pwr",
    ecosystemId: "ai",
    layerId: "dc-power",
    role: "secondary",
    rationale: "DC 송전 EPC 대규모 백로그 — 본업은 grid 전체",
  },

  // Vertiv → energy-transition grid 고객층
  {
    firmId: "vrt",
    ecosystemId: "energy-transition",
    layerId: "grid-infrastructure",
    role: "secondary",
    rationale: "변압기·UPS — 그리드 끝단 인프라이기도 함",
  },

  // 한국 방산 → 글로벌 Defense Resurgence에서도 보임
  {
    firmId: "hwa",
    ecosystemId: "defense",
    layerId: "aerospace-systems",
    role: "secondary",
    rationale: "K9 자주포·항공엔진 — 글로벌 방산 가치사슬에 엔진/플랫폼 부품 공급",
  },
  {
    firmId: "lig",
    ecosystemId: "defense",
    layerId: "defense-electronics",
    role: "secondary",
    rationale: "정밀유도무기·미사일 — 글로벌 방산 전자전 카테고리",
  },
  {
    firmId: "hrt",
    ecosystemId: "defense",
    layerId: "prime-contractors",
    role: "secondary",
    rationale: "K2 전차 등 통합 무기 플랫폼 공급사",
  },

  // Palantir → Defense에서도 핵심 (DoD 매출 비중 높음)
  {
    firmId: "pltr",
    ecosystemId: "defense",
    layerId: "nextgen-autonomy",
    role: "secondary",
    rationale: "AIP·Battle Management — 차세대 자율 의사결정 OS",
  },

  // 한국 바이오 → Biotech에서도 보임
  {
    firmId: "celltrion",
    ecosystemId: "biotech",
    layerId: "big-pharma",
    role: "secondary",
    rationale: "글로벌 바이오시밀러 강자 — 빅파마의 가격 대안",
  },
  {
    firmId: "sbiologics",
    ecosystemId: "biotech",
    layerId: "cdmo",
    role: "secondary",
    rationale: "글로벌 1위 CDMO — 빅파마 외주 생산의 핵심 거점",
  },

  // 한국 자동차/배터리 → Auto-EV-Battery에서도 보임
  {
    firmId: "hyundai",
    ecosystemId: "auto-ev-battery",
    layerId: "oem",
    role: "secondary",
    rationale: "Ioniq EV 라인업 — 글로벌 EV 점유율 상위",
  },
  {
    firmId: "kia",
    ecosystemId: "auto-ev-battery",
    layerId: "oem",
    role: "secondary",
    rationale: "EV6·EV9 — Ioniq 플랫폼 공유, 가격 차별화",
  },
  {
    firmId: "lges",
    ecosystemId: "auto-ev-battery",
    layerId: "battery-cell",
    role: "secondary",
    rationale: "글로벌 배터리 셀 점유 상위 — 미국 IRA 거점화",
  },
  {
    firmId: "sdi",
    ecosystemId: "auto-ev-battery",
    layerId: "battery-cell",
    role: "secondary",
    rationale: "프리미엄 EV향 셀 — Stellantis·BMW 공급",
  },

  // 소재 → Auto-EV-Battery에서도 보임
  {
    firmId: "alb",
    ecosystemId: "auto-ev-battery",
    layerId: "battery-materials",
    role: "secondary",
    rationale: "글로벌 리튬 정제 1위 — 셀 원료 공급",
  },
  {
    firmId: "posco",
    ecosystemId: "auto-ev-battery",
    layerId: "battery-materials",
    role: "secondary",
    rationale: "양극재·전구체 — 한국 셀 3사의 전·후방 통합",
  },
];

/**
 * Stage A v1에서 어디에도 매핑하지 않은 기업 — 추후 ecosystem 확장 시 검토용.
 * 주로 Financial / Telecom / Consumer Staples / 전통 산업.
 */
export const UNCATEGORIZED_FIRM_IDS: readonly string[] = [
  "nflx",
  "v",
  "jpm",
  "brk",
  "tmus",
  "vz",
  "t",
  "cost",
  "wmt",
  "ko",
  "pg",
  "cat",
  "lin",
];
