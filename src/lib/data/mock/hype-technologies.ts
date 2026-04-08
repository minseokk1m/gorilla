import type { HypeTechnology } from "@/types/classification";

/**
 * Hype Cycle — Peak of Inflated Expectations.
 *
 * Qualification framework (ALL must be true):
 *   1. TALC 분류상 캐즘 이전 (Early Market) — 주류 시장 PMF 미입증
 *   2. 시가총액 / 매출 비율 극단적 OR 매출 거의 없음
 *   3. 주가가 펀더멘털이 아닌 서사(narrative)에 의해 움직임
 *   4. 주류 고객(실용주의자)을 위한 whole product 미완성
 *
 * ❌ 캐즘 돌파 기업(볼링앨리·토네이도·메인스트리트)은 대상이 될 수 없음
 * ❌ 고릴라·잠재 고릴라·킹 등급 기업은 대상이 될 수 없음
 */
export const HYPE_TECHNOLOGIES: HypeTechnology[] = [
  // ── RISING — 과열 오르막 진입 ──
  {
    id: "satellite-direct",
    name: "Satellite Direct-to-Cell",
    nameKo: "위성-단말 직접통신",
    peakStatus: "rising",
    description: "AST SpaceMobile building space-based cellular network. Pre-revenue, $8B market cap on zero revenue. AT&T/Verizon partnerships fuel narrative.",
    descriptionKo: "AST SpaceMobile가 우주 기반 셀룰러 네트워크 구축 중. 매출 0인데 시총 $8B. AT&T·Verizon 파트너십 뉴스마다 주가 급등하는 전형적 과열 오르막.",
    firmIds: ["asts"],
  },
  {
    id: "combat-drone",
    name: "Autonomous Combat Drones (CCA)",
    nameKo: "자율 전투 드론 (CCA)",
    peakStatus: "rising",
    description: "Kratos Valkyrie drone in Pentagon CCA program. No production contracts yet, but defense hype driving stock. Proven tech at prototype level only.",
    descriptionKo: "Kratos Valkyrie 드론이 미 국방부 CCA 프로그램에 참여. 양산 계약 없이 기대감만으로 주가 상승. 프로토타입 단계의 기술에 과열된 밸류에이션.",
    firmIds: ["ktos"],
  },
  {
    id: "smr",
    name: "Small Modular Reactors (SMR)",
    nameKo: "소형모듈원전 (SMR)",
    peakStatus: "rising",
    description: "AI data center power demand catalyzing nuclear renaissance. No commercial SMR operational yet. BWXT rides narrative on naval reactor expertise.",
    descriptionKo: "AI 데이터센터 전력 수요가 촉매. 상용 SMR은 아직 없으나 빅테크의 원전 관심이 우라늄·원전주 과열을 유발. 서사가 펀더멘털을 압도.",
    firmIds: ["bwxt", "uec", "uuuu"],
  },

  // ── FALLING — 과열 꺾임 ──
  {
    id: "enterprise-ai-platform",
    name: "Enterprise AI Platform",
    nameKo: "엔터프라이즈 AI 플랫폼",
    peakStatus: "falling",
    description: "C3.ai IPO'd at $100+ on 'enterprise AI' narrative, now ~$25. 15 years in, PMF still unproven. Microsoft & Salesforce absorbing the market.",
    descriptionKo: "C3.ai는 '엔터프라이즈 AI' 서사로 IPO $100+에서 현재 ~$25. 15년째 PMF 미입증. Microsoft·Salesforce가 시장을 흡수하며 과열 정점 붕괴.",
    firmIds: ["c3ai"],
  },
  {
    id: "btc-treasury",
    name: "Bitcoin Treasury Company",
    nameKo: "비트코인 재무전략 기업",
    peakStatus: "falling",
    description: "Strategy (MicroStrategy) operates as leveraged BTC proxy. Software business is legacy. Stock purely driven by BTC narrative — no product-market fit.",
    descriptionKo: "Strategy(구 MicroStrategy)는 레버리지 BTC 프록시로 변모. 소프트웨어 사업은 레거시. 주가가 순전히 BTC 서사에 의존 — 기술 PMF 없음.",
    firmIds: ["mstr"],
  },
];
