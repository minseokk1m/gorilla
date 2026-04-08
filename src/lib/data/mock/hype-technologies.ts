import type { HypeTechnology } from "@/types/classification";

/**
 * Technology themes mapped to Gartner Hype Cycle phases.
 *
 * These represent pre-chasm or early-market technologies where
 * hype dynamics create distinct investment opportunities:
 *   - Peak → 과열 구간: 단기 수익 가능하나 거품 위험
 *   - Trough → 환멸 구간: 기술이 진짜라면 매수 기회
 *   - Slope → 계몽 구간: 캐즘 건너기 직전, 토네이도 진입 대기
 */
export const HYPE_TECHNOLOGIES: HypeTechnology[] = [
  // ── Innovation Trigger (기술 촉발) ──
  {
    id: "smr",
    name: "Small Modular Reactors (SMR)",
    nameKo: "소형모듈원전 (SMR)",
    hypePhase: "Innovation Trigger",
    description: "Next-gen nuclear reactors with factory-built modules. NuScale, BWXT, and others racing to commercialize. AI data center power demand is the catalyst.",
    descriptionKo: "공장에서 모듈식으로 제조하는 차세대 원자로. AI 데이터센터의 폭발적 전력 수요가 촉매제. 아직 상용화 전 단계이나 정부 지원 + 빅테크 관심으로 가속 중.",
    firmIds: ["bwxt", "uec", "uuuu"],
  },
  {
    id: "combat-drone",
    name: "Autonomous Combat Drones",
    nameKo: "자율 전투 드론",
    hypePhase: "Innovation Trigger",
    description: "Collaborative Combat Aircraft (CCA) and autonomous drone swarms. Pentagon investing heavily but operational deployment is years away.",
    descriptionKo: "협동전투기(CCA)와 자율 드론 군집. 미 국방부와 한국 등이 투자하나 실전 배치는 수년 뒤. 우크라이나 전쟁이 필요성 입증.",
    firmIds: ["ktos", "hwa"],
  },
  {
    id: "satellite-direct",
    name: "Satellite Direct-to-Cell",
    nameKo: "위성-단말 직접통신",
    hypePhase: "Innovation Trigger",
    description: "Connecting standard smartphones directly to satellites. AST SpaceMobile and T-Mobile/SpaceX are early movers in a nascent market.",
    descriptionKo: "일반 스마트폰이 위성과 직접 통신하는 기술. AST SpaceMobile, T-Mobile+SpaceX 등이 초기 시장 개척 중. 통신 사각지대 해소.",
    firmIds: ["asts", "tmus"],
  },

  // ── Peak of Inflated Expectations (과대 기대의 정점) ──
  {
    id: "genai",
    name: "Generative AI Infrastructure",
    nameKo: "생성형 AI 인프라",
    hypePhase: "Peak of Inflated Expectations",
    description: "GPUs, LLMs, and AI platforms powering the generative AI boom. NVIDIA, hyperscalers, and AI-native firms at the center of the hype.",
    descriptionKo: "GPU·LLM·AI 플랫폼이 이끄는 생성형 AI 붐. 역사상 가장 빠른 기업 도입 속도이나, 실제 ROI 입증은 아직 초기. 과열 신호: AI capex 급증 vs 수익화 갭.",
    firmIds: ["nvda", "msft", "googl", "meta", "pltr", "amd"],
  },
  {
    id: "hbm",
    name: "HBM / AI Memory",
    nameKo: "HBM / AI 메모리",
    hypePhase: "Peak of Inflated Expectations",
    description: "High Bandwidth Memory is the bottleneck for AI accelerators. SK hynix leads, Samsung catching up. Demand vastly outstrips supply.",
    descriptionKo: "AI 가속기의 병목인 고대역폭 메모리. SK하이닉스가 선두, 삼성전자 추격. 수요가 공급을 압도하나, AI capex 감소 시 반전 가능.",
    firmIds: ["skhynix", "sec", "mu"],
  },
  {
    id: "k-defense",
    name: "K-Defense Export Boom",
    nameKo: "K-방산 수출 붐",
    hypePhase: "Peak of Inflated Expectations",
    description: "Korean defense exports surging to Europe and Middle East. Poland, Australia, Saudi mega-contracts driving unprecedented growth.",
    descriptionKo: "폴란드·호주·사우디 등 대형 수출 계약 체결. K9 자주포·K2 전차·잠수함이 유럽·중동으로 수출 급증. 지정학적 긴장이 촉매이나 장기 수주 지속 여부가 관건.",
    firmIds: ["hwa", "hrt", "lig", "hho"],
  },
  {
    id: "glp1",
    name: "GLP-1 Obesity/Diabetes Drugs",
    nameKo: "GLP-1 비만·당뇨 치료제",
    hypePhase: "Peak of Inflated Expectations",
    description: "Mounjaro, Zepbound, Ozempic are reshaping healthcare. The biggest pharma tornado in decades — but pricing and access remain barriers.",
    descriptionKo: "Mounjaro·Zepbound·Ozempic가 비만 치료의 패러다임 전환. 10년 내 $100B+ 시장 예상이나, 보험 적용·가격·부작용 리스크 상존.",
    firmIds: ["lly"],
  },
  {
    id: "commercial-space",
    name: "Commercial Space Launch",
    nameKo: "상업 우주 발사",
    hypePhase: "Peak of Inflated Expectations",
    description: "Rocket Lab, SpaceX driving down launch costs. Constellation deployments creating demand, but revenue remains thin vs. capex.",
    descriptionKo: "Rocket Lab·SpaceX가 발사 비용을 급격히 낮추는 중. 위성 군집 배치 수요 증가이나, 매출 대비 설비투자 과중.",
    firmIds: ["rklb", "pl"],
  },

  // ── Trough of Disillusionment (환멸의 골짜기) ──
  {
    id: "metaverse",
    name: "Metaverse / XR",
    nameKo: "메타버스 / XR",
    hypePhase: "Trough of Disillusionment",
    description: "Meta's Reality Labs has invested $50B+ with limited adoption. Apple Vision Pro sold poorly. Consumer VR remains niche.",
    descriptionKo: "Meta Reality Labs $50B+ 투자에도 대중 채택 미미. Apple Vision Pro 판매 부진. 소비자 VR은 여전히 니치. 하지만 기업용 AR(산업·의료)은 조용히 성장 중.",
    firmIds: ["meta"],
  },
  {
    id: "autonomous-driving",
    name: "Autonomous Driving (L4+)",
    nameKo: "완전 자율주행 (L4+)",
    hypePhase: "Trough of Disillusionment",
    description: "Cruise shutdown, Waymo limited. Full autonomy pushed back years. Tesla FSD still L2+. Structural barriers: regulation, liability, edge cases.",
    descriptionKo: "Cruise 운영 중단, Waymo 제한적 확장. 테슬라 FSD는 아직 L2+. 규제·책임소재·엣지케이스 등 구조적 장벽. 완전 자율주행 상용화는 수년 이상 소요.",
    firmIds: ["tsla", "googl"],
  },
  {
    id: "battery-materials",
    name: "Battery Materials (Lithium/Cathode)",
    nameKo: "2차전지 소재 (리튬·양극재)",
    hypePhase: "Trough of Disillusionment",
    description: "Lithium prices crashed 80%+ from peak. Chinese oversupply. Western supply chain buildout slower than expected.",
    descriptionKo: "리튬 가격 고점 대비 80%+ 폭락. 중국발 과잉 공급 + 서방 공급망 구축 지연. EV 수요 둔화와 맞물려 소재 기업 실적 악화. 바닥 확인이 관건.",
    firmIds: ["alb", "posco", "lges", "sdi"],
  },

  // ── Slope of Enlightenment (계몽의 경사) ──
  {
    id: "ev",
    name: "Electric Vehicles",
    nameKo: "전기차 (EV)",
    hypePhase: "Slope of Enlightenment",
    description: "Post-hype rationalization. Charging infra improving, battery costs declining. But fire safety, charging speed, price parity still barriers to chasm-crossing.",
    descriptionKo: "거품 빠진 후 합리적 성장 단계. 충전 인프라 확충, 배터리 가격 하락 진행 중. 하지만 화재 안전·충전 속도·가격 동등성이 캐즘 돌파의 구조적 장벽. 테슬라가 대표 사례.",
    firmIds: ["tsla", "hyundai", "kia", "lges", "sdi"],
  },
  {
    id: "biosimilar",
    name: "Biosimilars / CDMO",
    nameKo: "바이오시밀러 / CDMO",
    hypePhase: "Slope of Enlightenment",
    description: "Biosimilar adoption accelerating as originator patents expire. CDMO demand rising as big pharma outsources manufacturing.",
    descriptionKo: "오리지널 약 특허 만료에 따른 바이오시밀러 채택 가속. 빅파마의 생산 외주화로 CDMO 수요 증가. 셀트리온·삼성바이오가 선두.",
    firmIds: ["celltrion", "sbiologics"],
  },
  {
    id: "crypto-defi",
    name: "Crypto & Digital Assets",
    nameKo: "암호화폐 · 디지털 자산",
    hypePhase: "Slope of Enlightenment",
    description: "Post-FTX recovery. Bitcoin ETF approved, institutional adoption rising. Regulatory clarity improving but still fragmented.",
    descriptionKo: "FTX 사태 후 회복기. 비트코인 ETF 승인 + 기관 투자 증가. 규제 명확화 진행 중이나 국가별 편차 큼. 인프라는 성숙해가는 단계.",
    firmIds: ["coin", "mstr"],
  },
  {
    id: "lng-shipbuilding",
    name: "LNG Carrier Shipbuilding",
    nameKo: "LNG 운반선 건조",
    hypePhase: "Slope of Enlightenment",
    description: "Global LNG demand surge + aging fleet creating sustained orderbook. Korean Big 3 dominate with 60%+ global share.",
    descriptionKo: "글로벌 LNG 수요 급증 + 노후 선박 교체 수요로 수주 폭증. 한국 빅3가 전 세계 수주의 60%+ 장악. 캐즘을 넘어 토네이도 진입 직전.",
    firmIds: ["hhih", "hho", "shi"],
  },
];
