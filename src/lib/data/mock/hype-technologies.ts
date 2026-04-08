import type { HypeTechnology } from "@/types/classification";

/**
 * Hype Cycle — Peak of Inflated Expectations only.
 *
 * We only track two statuses:
 *   - rising: 과열 오르막 진입 → 단기 매수 신호 (하입을 타고 수익)
 *   - falling: 과열 꺾임 → 매도/회피 신호 (거품 붕괴 시작)
 */
export const HYPE_TECHNOLOGIES: HypeTechnology[] = [
  // ── RISING — 과열 오르막 (매수 신호) ──
  {
    id: "genai",
    name: "Generative AI Infrastructure",
    nameKo: "생성형 AI 인프라",
    peakStatus: "rising",
    description: "GPUs, LLMs, and AI platforms powering the generative AI boom. Fastest enterprise adoption in history.",
    descriptionKo: "GPU·LLM·AI 플랫폼이 이끄는 생성형 AI 붐. 역사상 가장 빠른 기업 도입 속도. AI capex 급증이 하입 오르막의 핵심 동력.",
    firmIds: ["nvda", "msft", "googl", "meta", "pltr", "amd"],
  },
  {
    id: "hbm",
    name: "HBM / AI Memory",
    nameKo: "HBM / AI 메모리",
    peakStatus: "rising",
    description: "High Bandwidth Memory is the bottleneck for AI accelerators. Demand vastly outstrips supply — classic hype-driven shortage.",
    descriptionKo: "AI 가속기의 병목인 고대역폭 메모리. 수요가 공급을 압도하는 전형적 과열 오르막. SK하이닉스 선두, 삼성전자 추격.",
    firmIds: ["skhynix", "sec", "mu"],
  },
  {
    id: "k-defense",
    name: "K-Defense Export Boom",
    nameKo: "K-방산 수출 붐",
    peakStatus: "rising",
    description: "Korean defense exports surging to Europe and Middle East. Geopolitical tensions driving unprecedented demand.",
    descriptionKo: "폴란드·호주·사우디 대형 수출 계약 연이어 체결. 지정학적 긴장이 K-방산 과열의 촉매. 수주 잔고 사상 최대.",
    firmIds: ["hwa", "hrt", "lig", "hho"],
  },
  {
    id: "glp1",
    name: "GLP-1 Obesity/Diabetes Drugs",
    nameKo: "GLP-1 비만·당뇨 치료제",
    peakStatus: "rising",
    description: "Mounjaro, Zepbound, Ozempic reshaping healthcare. The biggest pharma hype wave in decades.",
    descriptionKo: "Mounjaro·Zepbound·Ozempic가 비만 치료 패러다임 전환. 10년 내 $100B+ 시장 예상. 공급 부족이 과열을 가속.",
    firmIds: ["lly"],
  },
  {
    id: "commercial-space",
    name: "Commercial Space Launch",
    nameKo: "상업 우주 발사",
    peakStatus: "rising",
    description: "Rocket Lab, SpaceX driving down launch costs. Constellation deployments fueling demand.",
    descriptionKo: "Rocket Lab·SpaceX가 발사 비용 급감. 위성 군집 배치 수요 폭증이나 매출 대비 설비투자 과중. 오르막 초입.",
    firmIds: ["rklb", "pl"],
  },
  {
    id: "smr",
    name: "Small Modular Reactors (SMR)",
    nameKo: "소형모듈원전 (SMR)",
    peakStatus: "rising",
    description: "AI data center power demand catalyzing nuclear renaissance. Government backing + Big Tech interest accelerating.",
    descriptionKo: "AI 데이터센터 전력 수요가 원전 르네상스 촉발. 정부 지원 + 빅테크 관심으로 하입 상승 시작.",
    firmIds: ["bwxt", "uec", "uuuu"],
  },

  // ── FALLING — 과열 꺾임 (매도/회피 신호) ──
  {
    id: "metaverse",
    name: "Metaverse / XR",
    nameKo: "메타버스 / XR",
    peakStatus: "falling",
    description: "Meta invested $50B+ with limited adoption. Apple Vision Pro underperformed. Consumer VR remains niche.",
    descriptionKo: "Meta $50B+ 투자에도 대중 채택 실패. Vision Pro 판매 부진. 과열 정점을 지나 급격히 하락 중.",
    firmIds: ["meta"],
  },
  {
    id: "autonomous-driving",
    name: "Autonomous Driving (L4+)",
    nameKo: "완전 자율주행 (L4+)",
    peakStatus: "falling",
    description: "Cruise shutdown, Tesla FSD still L2+. Structural barriers: regulation, liability, edge cases.",
    descriptionKo: "Cruise 운영 중단, 테슬라 FSD 아직 L2+. 규제·책임소재·엣지케이스 등 구조적 장벽. 과열 후 기대 급락.",
    firmIds: ["tsla", "googl"],
  },
  {
    id: "battery-materials",
    name: "Battery Materials (Lithium/Cathode)",
    nameKo: "2차전지 소재 (리튬·양극재)",
    peakStatus: "falling",
    description: "Lithium prices crashed 80%+ from peak. Chinese oversupply + EV demand slowdown.",
    descriptionKo: "리튬 가격 고점 대비 80%+ 폭락. 중국발 과잉 공급 + EV 수요 둔화. 전형적 과열 붕괴 패턴.",
    firmIds: ["alb", "posco", "lges", "sdi"],
  },
  {
    id: "ev",
    name: "Electric Vehicles (mass market)",
    nameKo: "전기차 대중화",
    peakStatus: "falling",
    description: "Post-hype normalization. Charging speed, battery cost, fire safety remain structural barriers to chasm-crossing.",
    descriptionKo: "충전 속도·배터리 가격·화재 안전 등 구조적 장벽 미해결. 테슬라 주가 고점 대비 급락이 과열 꺾임의 증거.",
    firmIds: ["tsla", "hyundai", "kia"],
  },
];
