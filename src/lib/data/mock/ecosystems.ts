import type { Ecosystem } from "@/types/ecosystem";

/**
 * 9 macro ecosystems. 각 ecosystem 안의 layer는 upstream(소재·장비) → downstream(앱·서비스)
 * 순서로 position 부여. 같은 layer에서 고릴라는 하나라는 Moore 원칙으로 자동 검증된다.
 *
 * v2 (Stage A 재정비): foundry/memory 분리, networking을 optical에 흡수,
 * ai-platform과 dev-tools 분리, ai-apps를 enterprise-saas와 consumer-ai-apps로 분리,
 * ai-security는 별도 Cybersecurity ecosystem으로 독립, Energy에 energy-storage 추가.
 */
export const ECOSYSTEMS: Ecosystem[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. AI — 가장 큰 ecosystem. 장비부터 최종 앱까지 전 가치사슬
  // ─────────────────────────────────────────────────────────────
  {
    id: "ai",
    slug: "ai",
    name: "AI",
    nameKo: "인공지능 인프라·플랫폼·앱",
    tagline: "반도체 장비부터 최종 AI 앱까지 — 전 가치사슬에서 누가 표준이 되는가",
    thesis:
      "AI는 단일 카테고리가 아니라 12개 layer로 쌓인 가치사슬이다. Moore 관점에서 각 layer의 고릴라는 다르고, 한 layer의 표준이 다른 layer의 whole product 완성도를 좌우한다. 장비(ASML)·파운드리(TSMC)·메모리(SK하이닉스)·컴퓨트(NVIDIA)·클라우드(MSFT/AWS)·플랫폼(PLTR)·앱(CRM Agentforce) 흐름을 한 곳에서 본다.",
    layers: [
      {
        id: "semi-equipment",
        name: "Semiconductor Equipment",
        nameKo: "반도체 장비",
        description: "노광기·식각기 등 첨단 공정 장비 — 파운드리의 whole product 전제 조건",
        position: 1,
      },
      {
        id: "foundry",
        name: "Foundry",
        nameKo: "파운드리",
        description: "첨단 노드 위탁 생산 — 컴퓨트 칩의 물리적 생산 거점",
        position: 2,
      },
      {
        id: "memory",
        name: "Memory",
        nameKo: "메모리",
        description: "HBM·DRAM·NAND — AI 학습·추론의 데이터 보관층",
        position: 3,
      },
      {
        id: "compute",
        name: "Compute (GPU/CPU/IP)",
        nameKo: "컴퓨트(GPU·CPU·IP)",
        description: "AI 학습·추론용 가속기와 명령어 아키텍처 — 모델 학습의 표준",
        position: 4,
      },
      {
        id: "optical-networking",
        name: "Optical & Networking",
        nameKo: "광학·네트워킹",
        description: "데이터센터 광통신·스위칭·라우팅 — GPU 간·DC 간 대역폭",
        position: 5,
      },
      {
        id: "dc-power",
        name: "Data Center Power & Cooling",
        nameKo: "데이터센터 전력·냉각",
        description: "AI 클러스터의 전력·냉각 인프라 — GPU 밀도가 만드는 새 병목",
        position: 6,
      },
      {
        id: "cloud",
        name: "Cloud Infrastructure",
        nameKo: "클라우드 인프라",
        description: "IaaS·PaaS 하이퍼스케일러 — AI 워크로드의 기본 배포 표면",
        position: 7,
      },
      {
        id: "data-platform",
        name: "Data & Analytics Platform",
        nameKo: "데이터·분석 플랫폼",
        description: "데이터 웨어하우스·레이크하우스·이벤트 스트림 — AI의 학습·추론 입력층",
        position: 8,
      },
      {
        id: "ai-platform",
        name: "AI Platform & Observability",
        nameKo: "AI 플랫폼·옵저버빌리티",
        description: "AI 워크로드 플랫폼·모델 관제·MLOps — 모델 운영의 표준",
        position: 9,
      },
      {
        id: "dev-tools",
        name: "Developer Tools & Integration",
        nameKo: "개발도구·통합",
        description: "소스관리·아티팩트·인프라 코드·통신 API — 코드와 시스템 연결층",
        position: 10,
      },
      {
        id: "enterprise-saas",
        name: "Enterprise SaaS",
        nameKo: "기업용 SaaS",
        description: "CRM·ITSM·HCM·창작·협업 등 B2B SaaS — AI가 차별점을 만드는 거대 카테고리 묶음",
        position: 11,
      },
      {
        id: "consumer-ai-apps",
        name: "Consumer AI Apps",
        nameKo: "소비자 AI 앱",
        description: "검색·SNS·디바이스 — 사용자 단에서 AI가 바로 닿는 표면",
        position: 12,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 2. Cybersecurity — AI ecosystem에서 분리한 독립 ecosystem
  // ─────────────────────────────────────────────────────────────
  {
    id: "cybersecurity",
    slug: "cybersecurity",
    name: "Cybersecurity",
    nameKo: "사이버 보안",
    tagline: "엔드포인트·네트워크·아이덴티티 — 보안 통합의 가속",
    thesis:
      "AI 도입으로 위협 탐지·대응이 자동화되며 단일 플랫폼화가 빨라진 카테고리. 엔드포인트(EDR)·네트워크 방화벽(NGFW)·아이덴티티(IAM) 3축에서 각자 토네이도가 진행 중. AI ecosystem과 인접하지만 본업이 보안이라 별도 ecosystem으로 분리.",
    layers: [
      {
        id: "endpoint",
        name: "Endpoint Security",
        nameKo: "엔드포인트 보안",
        description: "EDR·XDR — 단말 단위 위협 탐지·대응의 통합층",
        position: 1,
      },
      {
        id: "network-firewall",
        name: "Network & Firewall",
        nameKo: "네트워크·방화벽",
        description: "차세대 방화벽·SASE — 트래픽 단위 보안",
        position: 2,
      },
      {
        id: "identity",
        name: "Identity & Access",
        nameKo: "아이덴티티·접근관리",
        description: "SSO·MFA·IAM — 사용자·기기 신원 표준",
        position: 3,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 3. Energy Transition — 원자력·재생·저장·그리드·석유
  // ─────────────────────────────────────────────────────────────
  {
    id: "energy-transition",
    slug: "energy-transition",
    name: "Energy Transition",
    nameKo: "에너지 대전환",
    tagline: "원자력 부활·AI 전력 수요·재생·저장·석유의 동시 변화",
    thesis:
      "AI 데이터센터의 전력 수요 폭증과 탄소중립 압력이 만드는 에너지 가치사슬 재편. 원자력(SMR 부활)·재생(태양·풍력)·저장(ESS)·그리드 인프라·기존 석유의 5축이 동시에 움직인다. AI ecosystem의 dc-power layer와 직접 맞물림.",
    layers: [
      {
        id: "nuclear-fuel",
        name: "Nuclear Fuel",
        nameKo: "원자력 연료",
        description: "우라늄 채굴·정제·전환 — SMR 부활의 upstream",
        position: 1,
      },
      {
        id: "nuclear-reactor",
        name: "Nuclear Reactor & SMR",
        nameKo: "원자로·SMR",
        description: "기존 대형 원자로 부품과 차세대 소형모듈원자로(SMR)",
        position: 2,
      },
      {
        id: "renewables",
        name: "Renewables Generation",
        nameKo: "재생에너지 발전",
        description: "태양·풍력·연료전지 등 무탄소 발전 — 발전 자체",
        position: 3,
      },
      {
        id: "energy-storage",
        name: "Energy Storage (ESS)",
        nameKo: "에너지 저장(ESS)",
        description: "그리드·산업용 저장 — 재생 변동성을 흡수하는 향후 토네이도",
        position: 4,
      },
      {
        id: "grid-infrastructure",
        name: "Grid & Power Infrastructure",
        nameKo: "송전·전력 인프라",
        description: "변압기·송전망·EPC — AI/재생전력 연결의 병목",
        position: 5,
      },
      {
        id: "critical-materials",
        name: "Critical Materials",
        nameKo: "핵심 광물",
        description: "리튬·구리 등 전환의 원자재",
        position: 6,
      },
      {
        id: "oil-gas",
        name: "Oil & Gas Incumbent",
        nameKo: "석유·가스(기존)",
        description: "전환기 캐시카우 — 자본배분이 신에너지로 흐르는지가 관건",
        position: 7,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 4. Defense Resurgence
  // ─────────────────────────────────────────────────────────────
  {
    id: "defense",
    slug: "defense",
    name: "Defense Resurgence",
    nameKo: "방산 부활",
    tagline: "지정학 격변 — 프라임 컨트랙터부터 차세대 자율무기까지",
    thesis:
      "우크라이나·중동·인태 동시 위기로 G7+한국 방위비가 구조적으로 상승. 기존 프라임(LMT/RTX)이 안정 매출을 회복하는 한편, 자율 드론·차세대 항전이 신생 진입자(KTOS)에게 토네이도 기회를 만든다. Korean Industrial의 방산 layer와 교차.",
    layers: [
      {
        id: "prime-contractors",
        name: "Prime Contractors",
        nameKo: "프라임 계약자",
        description: "전 영역 대형 계약자 — 정부 조달의 주체",
        position: 1,
      },
      {
        id: "aerospace-systems",
        name: "Aerospace Engines & Systems",
        nameKo: "항공 엔진·시스템",
        description: "엔진·항전·서브시스템 — 플랫폼당 lock-in이 강함",
        position: 2,
      },
      {
        id: "naval-shipbuilding",
        name: "Naval Shipbuilding",
        nameKo: "해군 조선",
        description: "함정 건조 — 미·한 동맹 협력 확대 중",
        position: 3,
      },
      {
        id: "defense-electronics",
        name: "Defense Electronics & Comms",
        nameKo: "방산 전자·통신",
        description: "위성·통신·센서·전자전 — 정보전의 인프라",
        position: 4,
      },
      {
        id: "nextgen-autonomy",
        name: "Next-Gen Autonomy",
        nameKo: "차세대 자율 무기",
        description: "자율 드론·무인 플랫폼 — 비대칭 전력의 토네이도 후보",
        position: 5,
      },
      {
        id: "defense-materials",
        name: "Defense Materials",
        nameKo: "방산 특수 소재",
        description: "고온합금·특수강 — 엔진·미사일의 재료 표준",
        position: 6,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 5. Korean Industrial — 한국 산업 렌즈
  // ─────────────────────────────────────────────────────────────
  {
    id: "korean-industrial",
    slug: "korean-industrial",
    name: "Korean Industrial",
    nameKo: "한국 산업",
    tagline: "한국 거시 산업 전체를 한 화면에 — 반도체부터 바이오까지",
    thesis:
      "Korean Industrial은 가치사슬이 아니라 '한국 시장' lens다. 반도체·조선·방산·자동차·배터리·인터넷·바이오·소재 8개 수직을 한 곳에 모아 한국 기업끼리 비교한다. AI/Defense/Auto-EV-Battery/Biotech ecosystem과 secondary로 교차 — 같은 기업이 두 시각에서 모두 등장.",
    layers: [
      {
        id: "semi-memory",
        name: "Semiconductor & Memory",
        nameKo: "반도체·메모리",
        description: "한국 메모리 양강 — 글로벌 AI 메모리 표준의 주축",
        position: 1,
      },
      {
        id: "shipbuilding",
        name: "Shipbuilding",
        nameKo: "조선",
        description: "LNG선·해양플랜트·함정 — 슈퍼사이클 진입",
        position: 2,
      },
      {
        id: "defense",
        name: "Defense",
        nameKo: "방산",
        description: "자주포·전차·미사일·항공 — K-방산 수출 가속",
        position: 3,
      },
      {
        id: "auto",
        name: "Automotive OEM",
        nameKo: "자동차",
        description: "현대차·기아 — EV 전환과 글로벌 점유 확대",
        position: 4,
      },
      {
        id: "battery",
        name: "Battery",
        nameKo: "배터리",
        description: "셀 제조·소재 — IRA 후 미국 생산 거점화",
        position: 5,
      },
      {
        id: "internet",
        name: "Internet & Platform",
        nameKo: "인터넷·플랫폼",
        description: "네이버·카카오 — 한국 디지털 경제의 양대 축",
        position: 6,
      },
      {
        id: "bio",
        name: "Biotech & CDMO",
        nameKo: "바이오·CDMO",
        description: "셀트리온·삼성바이오 — 바이오시밀러·CDMO 글로벌 확장",
        position: 7,
      },
      {
        id: "materials",
        name: "Materials",
        nameKo: "소재",
        description: "철강·이차전지 소재 — 산업 전반의 원료층",
        position: 8,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 6. Crypto & Digital Assets
  // ─────────────────────────────────────────────────────────────
  {
    id: "crypto",
    slug: "crypto",
    name: "Crypto & Digital Assets",
    nameKo: "암호화폐·디지털 자산",
    tagline: "거래소·트레저리·스테이블코인 — 디지털 자산의 인프라 층",
    thesis:
      "BTC ETF 통과 후 제도권 진입이 본격화된 인프라 layer. 거래소·브로커가 사용자 접점을, 트레저리 기업(MSTR)이 자본 배분을, 스테이블코인이 결제·정산 표준을 담당한다. 토네이도 진입 여부는 규제 환경에 의존.",
    layers: [
      {
        id: "exchange-broker",
        name: "Exchange & Broker",
        nameKo: "거래소·브로커",
        description: "암호화폐 매매·수탁 — 사용자 접점",
        position: 1,
      },
      {
        id: "treasury",
        name: "Treasury Strategy",
        nameKo: "BTC 트레저리 전략",
        description: "BTC를 기업 재무 자산으로 — 하입사이클 단골",
        position: 2,
      },
      {
        id: "stablecoin",
        name: "Stablecoin & Settlement",
        nameKo: "스테이블코인·결제 인프라",
        description: "USDC 등 결제·정산 표준 — 향후 토네이도 후보",
        position: 3,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 7. Biotech & Pharma
  // ─────────────────────────────────────────────────────────────
  {
    id: "biotech",
    slug: "biotech",
    name: "Biotech & Pharma",
    nameKo: "바이오·제약",
    tagline: "GLP-1 토네이도·CDMO 외주화·헬스케어 통합 흐름",
    thesis:
      "GLP-1(비만·당뇨)이 토네이도 진입한 가운데 빅파마는 R&D·M&A 자본 사이클을, 한국 CDMO는 외주 생산의 수혜를 본다. 헬스케어 서비스(UNH)는 결제·관리의 통합 layer.",
    layers: [
      {
        id: "big-pharma",
        name: "Big Pharma",
        nameKo: "빅파마",
        description: "통합 R&D·판매 — GLP-1 등 블록버스터 보유",
        position: 1,
      },
      {
        id: "cdmo",
        name: "CDMO & Bio Services",
        nameKo: "CDMO·바이오 서비스",
        description: "위탁 생산·임상 — 제약 외주화의 수혜층",
        position: 2,
      },
      {
        id: "healthcare-services",
        name: "Healthcare Services",
        nameKo: "헬스케어 서비스",
        description: "보험·진료·약제 통합 — 결제와 관리의 표준",
        position: 3,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 8. Auto-EV-Battery
  // ─────────────────────────────────────────────────────────────
  {
    id: "auto-ev-battery",
    slug: "auto-ev-battery",
    name: "Auto-EV-Battery",
    nameKo: "자동차·전기차·배터리",
    tagline: "OEM·셀·소재 — EV 토네이도 둔화 후 마진 게임",
    thesis:
      "EV 보급률이 메인스트리트 진입 단계로 들어서며 토네이도 성장이 둔화. 이제는 OEM-셀-소재 가치사슬에서 누가 마진을 가져가는지의 게임. Korean Industrial의 자동차·배터리 layer와 직접 교차.",
    layers: [
      {
        id: "oem",
        name: "OEM",
        nameKo: "완성차",
        description: "Tesla·현대차·기아 등 — EV 모델·플랫폼 차별화",
        position: 1,
      },
      {
        id: "battery-cell",
        name: "Battery Cell",
        nameKo: "배터리 셀",
        description: "한국 3사 중심 셀 제조 — IRA 후 미국 생산 가속",
        position: 2,
      },
      {
        id: "battery-materials",
        name: "Battery Materials",
        nameKo: "배터리 소재",
        description: "리튬·양극재 등 — 셀의 원료층",
        position: 3,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // 9. Space Economy
  // ─────────────────────────────────────────────────────────────
  {
    id: "space",
    slug: "space",
    name: "Space Economy",
    nameKo: "우주 경제",
    tagline: "발사체·위성통신·지구관측 — 새 메가테마",
    thesis:
      "SpaceX의 비상장 점유에도 발사 단가 하락이 위성통신·지구관측의 신생 카테고리를 열었다. RKLB(소형 발사)·ASTS(위성-스마트폰 직통신)·PL(지구관측)이 각자의 카테고리에서 토네이도 후보.",
    layers: [
      {
        id: "launch",
        name: "Launch",
        nameKo: "발사체",
        description: "소형·중형 발사 — 위성 군집의 enabling layer",
        position: 1,
      },
      {
        id: "satellite-comms",
        name: "Satellite Communications",
        nameKo: "위성 통신",
        description: "위성-스마트폰 직통신 등 차세대 위성통신",
        position: 2,
      },
      {
        id: "earth-observation",
        name: "Earth Observation",
        nameKo: "지구 관측",
        description: "다일별·고해상 위성 영상 — 데이터 SaaS화",
        position: 3,
      },
    ],
  },
];

/** Slug 또는 id로 ecosystem 조회 */
export function findEcosystem(slugOrId: string): Ecosystem | undefined {
  return ECOSYSTEMS.find((e) => e.slug === slugOrId || e.id === slugOrId);
}
