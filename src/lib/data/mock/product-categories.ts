import type { ProductCategory } from "@/types/product-category";

/**
 * 51개 layer × 평균 3-5 카테고리. 단계별 확장:
 *  E-1a (✅): AI memory-storage (HBM/DRAM/NAND/HDD)
 *  E-1b (✅): AI 인프라 6 layer (semi-equipment/foundry/compute/optical-networking/dc-power/cloud)
 *  E-1c~e: 나머지 layer 점진 확장
 *
 * 핵심 메시지(유 회장님 비전):
 * - 같은 layer 안에 phase가 다른 카테고리 공존 (HBM Tornado vs DRAM Maturing)
 * - 같은 firm이 카테고리마다 다른 role (SK = HBM Gorilla / DRAM Prince)
 * - 카테고리 phase 전환이 매도/매수 결정의 1차 신호
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  // ─────────────────────────────────────────────────────────────
  // HBM — 토네이도 단계, AI 학습 GPU의 종속 부품
  // ─────────────────────────────────────────────────────────────
  {
    id: "hbm",
    name: "HBM",
    nameKo: "HBM (고대역폭 메모리)",
    ecosystemId: "ai",
    layerId: "memory-storage",
    description: "AI 학습용 GPU 옆에 적층 — NVIDIA 학습 가속기의 lock-in 부품",
    phase: "Tornado",
    phaseRationale:
      "AI 학습 수요 폭발로 공급 부족이 2년간 지속, 가격·물량 모두 토네이도 곡선. NVIDIA Blackwell·Rubin이 HBM 사양을 시장 표준으로 결정.",
    participants: [
      {
        firmId: "skhynix",
        role: "Gorilla",
        revenueWeight: 0.45,
        rationale: "HBM3E 12-Hi 단독 양산, NVIDIA 학습 GPU 주력 공급. 사실상 표준 결정자.",
      },
      {
        firmId: "sec",
        role: "Prince",
        revenueWeight: 0.18,
        rationale: "HBM3E 양산 진입했으나 NVIDIA 인증 일부 제한, 차세대(HBM4)에서 추격 중.",
      },
      {
        firmId: "mu",
        role: "Prince",
        revenueWeight: 0.20,
        rationale: "HBM3E 8-Hi NVIDIA 인증 통과, 공급 확대. SK·삼성 대비 늦었지만 빠르게 따라잡음.",
      },
    ],
    successorCategoryId: undefined, // 아직 후계 카테고리 미정 (HBM4가 진화형)
  },

  // ─────────────────────────────────────────────────────────────
  // DRAM — 메인 스트리트 성숙 단계, 메모리의 기존 캐시카우
  // ─────────────────────────────────────────────────────────────
  {
    id: "dram",
    name: "DRAM",
    nameKo: "DRAM (서버·PC 메모리)",
    ecosystemId: "ai",
    layerId: "memory-storage",
    description: "서버·PC·모바일용 휘발성 메모리 — oligopoly 안정 캐시카우",
    phase: "Maturing Main Street",
    phaseRationale:
      "PC·서버·모바일 수요는 구조적 성숙 단계, 가격 사이클성이 큼. AI 워크로드가 DRAM에서 HBM으로 일부 이전 중이라 점진 비중 축소 압력.",
    participants: [
      {
        firmId: "sec",
        role: "Gorilla",
        revenueWeight: 0.30,
        rationale: "글로벌 DRAM 점유 1위, 종합 cost leader. 전 product mix 보유.",
      },
      {
        firmId: "skhynix",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "글로벌 DRAM 점유 2위, HBM 강세가 일반 DRAM 점유율도 끌어올림.",
      },
      {
        firmId: "mu",
        role: "Challenger",
        revenueWeight: 0.45,
        rationale: "글로벌 DRAM #3 — 한·미 양강과 격차 있으나 안정적 점유.",
      },
    ],
    successorCategoryId: "hbm",
  },

  // ─────────────────────────────────────────────────────────────
  // NAND — 메인 스트리트 성숙·일부 선언 단계
  // ─────────────────────────────────────────────────────────────
  {
    id: "nand",
    name: "NAND Flash",
    nameKo: "NAND 플래시",
    ecosystemId: "ai",
    layerId: "memory-storage",
    description: "SSD·모바일·서버용 비휘발성 메모리 — 플레이어 다수, 가격 변동성 큼",
    phase: "Maturing Main Street",
    phaseRationale:
      "공급 과잉으로 가격 사이클성이 가장 큰 메모리. 6대 플레이어(삼성·SK·키옥시아·WDC·Micron·Sandisk) 균열 지속.",
    participants: [
      {
        firmId: "sec",
        role: "King",
        revenueWeight: 0.20,
        rationale: "글로벌 NAND 점유 1위, 적층(layer count) 기술 선도.",
      },
      {
        firmId: "skhynix",
        role: "Prince",
        revenueWeight: 0.20,
        rationale: "솔리다임 인수 후 enterprise SSD까지 확장.",
      },
      {
        firmId: "mu",
        role: "Challenger",
        revenueWeight: 0.30,
        rationale: "Micron NAND 사업 — DRAM 대비 비중 작음.",
      },
      {
        firmId: "wdc",
        role: "Challenger",
        revenueWeight: 0.40,
        rationale: "Western Digital의 NAND 사업(과거 SanDisk 통합), HDD와 별개 운영.",
      },
      {
        firmId: "sndk",
        role: "Niche",
        revenueWeight: 0.95,
        rationale: "WDC 분할 후 독립 SanDisk — NAND 전용 specialist.",
      },
    ],
    successorCategoryId: undefined, // 아직 명확한 후계 없음 (3D XPoint는 실패)
  },

  // ─────────────────────────────────────────────────────────────
  // HDD — Declining Main Street (점진 쇠퇴)
  // ─────────────────────────────────────────────────────────────
  {
    id: "hdd",
    name: "HDD",
    nameKo: "HDD (하드디스크)",
    ecosystemId: "ai",
    layerId: "memory-storage",
    description: "콜드 스토리지·아카이브용 회전 디스크 — SSD에 자리 내어주는 중",
    phase: "Declining Main Street",
    phaseRationale:
      "PC·소비자 시장은 SSD에 거의 잠식, 데이터센터 콜드 스토리지(저비용 대용량)에서만 유의미한 신규 수요. AI 워크로드가 HDD에 추가 수요(데이터 lake)를 일부 만들고 있어 declining 속도는 느림.",
    participants: [
      {
        firmId: "stx",
        role: "Gorilla",
        revenueWeight: 1.0,
        rationale: "Seagate — HDD 글로벌 점유 1위, HDD 전용 specialist.",
      },
      {
        firmId: "wdc",
        role: "Prince",
        revenueWeight: 0.55,
        rationale: "Western Digital HDD 사업 — Seagate 다음 #2, NAND와 분리 운영.",
      },
    ],
    successorCategoryId: "nand", // 데이터 보관층이 NAND/SSD로 이전
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > semi-equipment (반도체 장비)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "euv-litho",
    name: "EUV Lithography",
    nameKo: "EUV 노광기",
    ecosystemId: "ai",
    layerId: "semi-equipment",
    description: "5nm 이하 첨단 노드의 패턴 형성 — 사실상 단독 공급",
    phase: "Tornado",
    phaseRationale:
      "TSMC·삼성·Intel 첨단 fab 모두 EUV에 종속. ASML 외 대안 0, 신규 노드 도입마다 high-NA EUV로 신규 수요. AI 칩 수요 폭발이 lock-in 강화.",
    participants: [
      {
        firmId: "asml",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "EUV 100% 독점. 1대당 약 1.5억 달러, 연간 50대 미만 출하 — 세계에서 가장 비싼 단일 장비.",
      },
    ],
  },
  {
    id: "duv-litho",
    name: "DUV Lithography",
    nameKo: "DUV 노광기",
    ecosystemId: "ai",
    layerId: "semi-equipment",
    description: "성숙 노드(28nm 이상) 패턴 형성 — 메모리·analog 등 광범위 사용",
    phase: "Maturing Main Street",
    phaseRationale:
      "EUV로 일부 첨단 노드는 이전했으나 메모리·analog·legacy fab 수요는 안정. ASML 점유 압도적이지만 Nikon/Canon 잔존, 중국 fab 자급 압력.",
    participants: [
      {
        firmId: "asml",
        role: "Gorilla",
        revenueWeight: 0.30,
        rationale: "DUV 점유 ~80%. EUV 대비 가격 낮지만 물량은 훨씬 많음.",
      },
    ],
  },
  {
    id: "wafer-etch",
    name: "Wafer Etch",
    nameKo: "웨이퍼 식각",
    ecosystemId: "ai",
    layerId: "semi-equipment",
    description: "웨이퍼에 회로 패턴을 새기는 화학·물리 에칭 — 첨단 노드 핵심 공정",
    phase: "Maturing Main Street",
    phaseRationale:
      "GAA·3D NAND·HBM 모두 etch 공정 의존도 상승 중이지만 업체 구도 안정. AMAT vs LRCX 양강 oligopoly.",
    participants: [
      {
        firmId: "lrcx",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "Lam Research — etch 글로벌 #1, 특히 첨단 메모리 etch 압도적.",
      },
      {
        firmId: "amat",
        role: "Prince",
        revenueWeight: 0.20,
        rationale: "Applied Materials etch 사업부 — LRCX 추격, deposition이 본업.",
      },
    ],
  },
  {
    id: "thin-film-deposition",
    name: "Thin Film Deposition",
    nameKo: "박막 증착(CVD/ALD)",
    ecosystemId: "ai",
    layerId: "semi-equipment",
    description: "웨이퍼 위에 원자/분자층 증착 — 3D 구조·HBM 적층의 핵심",
    phase: "Maturing Main Street",
    phaseRationale:
      "HBM 적층·3D NAND 적층 수요로 ALD 비중 증가, 그러나 카테고리 자체는 성숙. AMAT가 종합 1위, LRCX가 특정 segment 강세.",
    participants: [
      {
        firmId: "amat",
        role: "Gorilla",
        revenueWeight: 0.60,
        rationale: "deposition 글로벌 #1 — CVD·PVD·ALD 전 영역.",
      },
      {
        firmId: "lrcx",
        role: "Prince",
        revenueWeight: 0.15,
        rationale: "특정 deposition segment(ALD)에서 점유.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > foundry (파운드리)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "leading-edge-foundry",
    name: "Leading-edge Foundry (≤5nm)",
    nameKo: "첨단 노드 파운드리(5nm↓)",
    ecosystemId: "ai",
    layerId: "foundry",
    description: "AI/HPC/모바일 SoC 첨단 노드 위탁 생산 — TSMC 사실상 독점",
    phase: "Tornado",
    phaseRationale:
      "AI GPU·CPU·모바일 SoC 모두 ≤5nm로 이전, NVIDIA Blackwell·Apple M4·AMD MI300 등 핵심 칩 모두 TSMC. 삼성 추격 중, Intel Foundry 진입 초기.",
    participants: [
      {
        firmId: "tsm",
        role: "Gorilla",
        revenueWeight: 0.65,
        rationale: "TSMC — ≤5nm 점유 90%+. AI 호황의 직접 수혜자, 가격 결정력 회복.",
      },
      {
        firmId: "sec",
        role: "Prince",
        revenueWeight: 0.10,
        rationale: "삼성 파운드리 — Exynos 등 자체 설계 외 외부 수주 부진, GAA 양산은 진행.",
      },
      {
        firmId: "intc",
        role: "Challenger",
        revenueWeight: 0.05,
        rationale: "Intel Foundry Services — 18A 노드 진입 초기, 외부 고객 소수.",
      },
    ],
  },
  {
    id: "mature-foundry",
    name: "Mature Foundry (28-7nm)",
    nameKo: "성숙 노드 파운드리(28-7nm)",
    ecosystemId: "ai",
    layerId: "foundry",
    description: "자동차·산업·소비자 SoC 위탁 생산 — 안정 캐시카우",
    phase: "Maturing Main Street",
    phaseRationale:
      "자동차·산업·소비자 chip 수요로 안정. 중국 fab 증설로 공급 과잉 압력. TSMC·삼성·UMC·SMIC oligopoly.",
    participants: [
      {
        firmId: "tsm",
        role: "King",
        revenueWeight: 0.30,
        rationale: "TSMC mature 노드 — 첨단보다 마진 낮으나 안정.",
      },
      {
        firmId: "sec",
        role: "Prince",
        revenueWeight: 0.10,
        rationale: "삼성 mature 파운드리 — 외부 수주 비중 작음.",
      },
    ],
  },
  {
    id: "specialty-foundry",
    name: "Specialty Foundry (Analog/RF)",
    nameKo: "Specialty 파운드리(Analog/RF)",
    ecosystemId: "ai",
    layerId: "foundry",
    description: "200mm 위주 analog/RF/power IC 위탁 생산 — niche oligopoly",
    phase: "Maturing Main Street",
    phaseRationale:
      "디지털 첨단 노드와 별도 시장. 자동차·5G·전력 반도체 수요로 안정. Tower·X-FAB·SMIC analog oligopoly.",
    participants: [
      {
        firmId: "tsem",
        role: "King",
        revenueWeight: 1.0,
        rationale: "Tower Semiconductor — analog/RF specialty 강자, Intel 인수 추진은 무산.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > compute (GPU·CPU·IP)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ai-training-gpu",
    name: "AI Training GPU",
    nameKo: "AI 학습 GPU",
    ecosystemId: "ai",
    layerId: "compute",
    description: "대규모 모델 학습용 가속기 — CUDA 표준이 lock-in의 핵심",
    phase: "Tornado",
    phaseRationale:
      "Hyperscaler CapEx 상한 없음. NVIDIA Blackwell·Rubin이 사실상 시장 표준 결정. 다른 모든 AI layer가 NVIDIA에 종속.",
    participants: [
      {
        firmId: "nvda",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "AI 학습 GPU 점유 95%+. CUDA·NVLink·NVSwitch 생태계 lock-in.",
      },
      {
        firmId: "amd",
        role: "Prince",
        revenueWeight: 0.20,
        rationale: "MI300X — Meta·Microsoft 도입 확대, 그러나 CUDA 호환 부재가 한계.",
      },
    ],
  },
  {
    id: "ai-inference-asic",
    name: "AI Inference ASIC",
    nameKo: "AI 추론 ASIC",
    ecosystemId: "ai",
    layerId: "compute",
    description: "추론 전용 custom silicon — hyperscaler 자체 설계 가속",
    phase: "Bowling Alley",
    phaseRationale:
      "Google TPU·AWS Trainium·Meta MTIA 등 hyperscaler 전용 chip 시장 형성. AVGO가 Google TPU 설계 파트너로 중요 위치.",
    participants: [
      {
        firmId: "avgo",
        role: "King",
        revenueWeight: 0.30,
        rationale: "Broadcom — Google TPU·Meta MTIA 설계 파트너. AI 매출 비중 빠르게 확대.",
      },
      {
        firmId: "amd",
        role: "Challenger",
        revenueWeight: 0.10,
        rationale: "AMD 추론 가속기 — 일부 hyperscaler 채택.",
      },
    ],
  },
  {
    id: "datacenter-cpu",
    name: "Datacenter CPU",
    nameKo: "데이터센터 CPU",
    ecosystemId: "ai",
    layerId: "compute",
    description: "서버 범용 CPU — x86 oligopoly + ARM-based 대두",
    phase: "Maturing Main Street",
    phaseRationale:
      "AMD EPYC가 Intel Xeon 점유 잠식 중. AWS Graviton(ARM-based) 등 자체 설계 hyperscaler 증가가 양강 모두에 위협.",
    participants: [
      {
        firmId: "intc",
        role: "King",
        revenueWeight: 0.30,
        rationale: "Intel Xeon — 점유 1위지만 EPYC에 share 잠식 중. Sapphire Rapids/Granite Rapids로 반격.",
      },
      {
        firmId: "amd",
        role: "Prince",
        revenueWeight: 0.40,
        rationale: "AMD EPYC — 데이터센터 점유 30%+ 돌파, AI 호황의 부수 수혜.",
      },
    ],
  },
  {
    id: "pc-cpu",
    name: "PC CPU",
    nameKo: "PC CPU",
    ecosystemId: "ai",
    layerId: "compute",
    description: "데스크톱·노트북 CPU — Intel·AMD 양강 + Apple Silicon 외부 위협",
    phase: "Maturing Main Street",
    phaseRationale:
      "PC 수요는 구조적 정체. Apple Silicon이 Mac에서 Intel 완전 대체, MS Surface도 Snapdragon으로 일부 이전.",
    participants: [
      {
        firmId: "intc",
        role: "Gorilla",
        revenueWeight: 0.40,
        rationale: "PC CPU 점유 1위지만 Apple/Snapdragon에 일부 잠식.",
      },
      {
        firmId: "amd",
        role: "Prince",
        revenueWeight: 0.25,
        rationale: "Ryzen — 게이밍·고성능 PC에서 강세, Intel 추격.",
      },
    ],
  },
  {
    id: "mobile-edge-ip",
    name: "Mobile/Edge CPU IP",
    nameKo: "모바일·엣지 CPU IP",
    ecosystemId: "ai",
    layerId: "compute",
    description: "스마트폰·IoT·자동차용 CPU IP 라이선싱 — ARM 사실상 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "스마트폰 시장 성숙, 자동차·IoT가 신규 성장. Qualcomm·Apple·MediaTek 모두 ARM 라이선스에 의존. RISC-V 부상은 점진적.",
    participants: [
      {
        firmId: "arm",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "ARM IP — 모바일·엣지 사실상 100% 표준. 라이선스+로열티 모델.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > optical-networking (광학·네트워킹)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "dc-optical-transceiver",
    name: "DC Optical Transceiver",
    nameKo: "데이터센터 광 트랜시버",
    ecosystemId: "ai",
    layerId: "optical-networking",
    description: "AI 클러스터 GPU 간 광통신 모듈 — 800G/1.6T로 빠르게 진화",
    phase: "Tornado",
    phaseRationale:
      "AI 학습 클러스터의 GPU 수가 늘수록 광 트랜시버 수요 폭발. 800G→1.6T 전환 진행, 가격·물량 모두 토네이도.",
    participants: [
      {
        firmId: "cohr",
        role: "King",
        revenueWeight: 0.35,
        rationale: "Coherent — DC 광 트랜시버 강자, 800G 양산 진입.",
      },
      {
        firmId: "lite",
        role: "Prince",
        revenueWeight: 0.40,
        rationale: "Lumentum — 광부품 강자, AI 호황 직접 수혜.",
      },
      {
        firmId: "aaoi",
        role: "Challenger",
        revenueWeight: 0.85,
        rationale: "Applied Optoelectronics — 800G 트랜시버에서 hyperscaler 일부 수주.",
      },
    ],
  },
  {
    id: "specialty-optical-fiber",
    name: "Specialty Optical Fiber",
    nameKo: "Specialty 광섬유",
    ecosystemId: "ai",
    layerId: "optical-networking",
    description: "DC·통신·산업용 특수 광섬유·연결재 — Corning 사실상 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "광섬유 자체는 성숙 시장이지만 hollow-core·multi-core 등 차세대로 점진 진화. Corning이 종합 leader.",
    participants: [
      {
        firmId: "glw",
        role: "Gorilla",
        revenueWeight: 0.30,
        rationale: "Corning — 광섬유·디스플레이 유리 종합 leader, AI DC 광배선 수혜.",
      },
    ],
  },
  {
    id: "optical-network-equipment",
    name: "Optical Network Equipment",
    nameKo: "광 네트워크 장비",
    ecosystemId: "ai",
    layerId: "optical-networking",
    description: "통신사·DC 간 장거리 광전송 장비 — Ciena 강자",
    phase: "Maturing Main Street",
    phaseRationale:
      "통신사 capex 사이클 의존, AI DC 간 연결 수요로 부분 호황. Ciena·Nokia·Cisco oligopoly.",
    participants: [
      {
        firmId: "cien",
        role: "King",
        revenueWeight: 0.85,
        rationale: "Ciena — 장거리 광전송 강자, hyperscaler DC 간 연결 수주.",
      },
    ],
  },
  {
    id: "industrial-fiber-laser",
    name: "Industrial Fiber Laser",
    nameKo: "산업용 광섬유 레이저",
    ecosystemId: "ai",
    layerId: "optical-networking",
    description: "산업 가공·의료용 고출력 광섬유 레이저 — 별도 niche 시장",
    phase: "Maturing Main Street",
    phaseRationale:
      "EV·반도체 가공 수요로 안정. AI와 직접 무관하지만 광학 layer에 함께 분류.",
    participants: [
      {
        firmId: "ipgp",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "IPG Photonics — 산업용 광섬유 레이저 글로벌 1위.",
      },
    ],
  },
  {
    id: "enterprise-network-switching",
    name: "Enterprise Network Switching",
    nameKo: "엔터프라이즈 네트워크 스위칭",
    ecosystemId: "ai",
    layerId: "optical-networking",
    description: "기업 내부 라우터·스위치 — 클라우드 전환에 자리 일부 빼앗김",
    phase: "Declining Main Street",
    phaseRationale:
      "기업 IT가 클라우드로 이전하며 on-prem 네트워크 장비 수요 감소. AI DC 내부 네트워크는 White Box·custom silicon으로 이전 중.",
    participants: [
      {
        firmId: "csco",
        role: "Gorilla",
        revenueWeight: 0.60,
        rationale: "Cisco — enterprise 네트워크 표준이지만 hyperscaler에는 없음. AI Data Center용 신제품으로 반격 시도.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > dc-power (데이터센터 전력·냉각)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "dc-power-cooling",
    name: "DC Power & Liquid Cooling",
    nameKo: "DC 전력·액체 냉각",
    ecosystemId: "ai",
    layerId: "dc-power",
    description: "AI 클러스터의 UPS·rack 단위 전력·액체 냉각 — Vertiv가 핵심 공급",
    phase: "Tornado",
    phaseRationale:
      "GPU rack당 전력 100kW 돌파로 액체 냉각·고밀도 PDU 폭발 수요. Vertiv·Schneider·Eaton oligopoly.",
    participants: [
      {
        firmId: "vrt",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "Vertiv — DC 전력·냉각 종합 leader, 액체 냉각 솔루션 선도.",
      },
    ],
  },
  {
    id: "gas-turbine-generation",
    name: "Gas Turbine Generation",
    nameKo: "가스터빈 발전",
    ecosystemId: "ai",
    layerId: "dc-power",
    description: "DC향 대형 가스터빈 발전기 — AI 전력 수요로 부활",
    phase: "Tornado",
    phaseRationale:
      "원자력·재생만으로 AI DC 전력 못 채워 가스터빈이 brownfield/greenfield 양쪽 부활. GE Vernova 본업, Siemens Energy 추격.",
    participants: [
      {
        firmId: "gev",
        role: "Gorilla",
        revenueWeight: 0.40,
        rationale: "GE Vernova — 가스터빈 글로벌 1위, AI DC 직접 수혜.",
      },
    ],
  },
  {
    id: "transmission-epc",
    name: "Transmission & DC EPC",
    nameKo: "송전·DC EPC",
    ecosystemId: "ai",
    layerId: "dc-power",
    description: "송전망 확충·DC 건설 EPC — 미국 그리드 capex 사이클",
    phase: "Bowling Alley",
    phaseRationale:
      "AI DC 신설로 송전망 보틀넥 노출, EPC backlog 폭증. Quanta Services 직접 수혜.",
    participants: [
      {
        firmId: "pwr",
        role: "King",
        revenueWeight: 0.50,
        rationale: "Quanta Services — 미국 송전·DC EPC backlog 1위.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > cloud (클라우드 인프라)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "public-iaas",
    name: "Public IaaS",
    nameKo: "퍼블릭 IaaS",
    ecosystemId: "ai",
    layerId: "cloud",
    description: "범용 컴퓨트·스토리지·네트워크 — hyperscaler 3강",
    phase: "Maturing Main Street",
    phaseRationale:
      "시장 자체는 안정 oligopoly. AI 워크로드가 새 수요축이지만 IaaS 카테고리 자체는 성숙. AWS·Azure·GCP 3강.",
    participants: [
      {
        firmId: "amzn",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "AWS — IaaS 글로벌 #1, 안정 oligopoly leader.",
      },
      {
        firmId: "msft",
        role: "King",
        revenueWeight: 0.40,
        rationale: "Azure — Office365·Active Directory lock-in으로 enterprise 점유 강화.",
      },
    ],
  },
  {
    id: "enterprise-paas",
    name: "Enterprise PaaS & AI Platform",
    nameKo: "엔터프라이즈 PaaS·AI 플랫폼",
    ecosystemId: "ai",
    layerId: "cloud",
    description: "Copilot·Bedrock·Vertex 등 hyperscaler 기본 AI 플랫폼",
    phase: "Tornado",
    phaseRationale:
      "Copilot·Bedrock·Vertex 등이 빠르게 확장 중. enterprise AI 도입의 default surface — IaaS 위에 올라가는 신규 토네이도.",
    participants: [
      {
        firmId: "msft",
        role: "Gorilla",
        revenueWeight: 0.30,
        rationale: "Microsoft Copilot·Azure AI Foundry — OpenAI 파트너십, 365 통합으로 표준 굳히기.",
      },
      {
        firmId: "amzn",
        role: "Prince",
        revenueWeight: 0.15,
        rationale: "AWS Bedrock — 모델 다양성으로 차별화, Anthropic 파트너십.",
      },
    ],
  },
  {
    id: "database-cloud",
    name: "Database Cloud",
    nameKo: "데이터베이스 클라우드",
    ecosystemId: "ai",
    layerId: "cloud",
    description: "엔터프라이즈 데이터베이스 SaaS — Oracle legacy + cloud-native 신구 갈등",
    phase: "Maturing Main Street",
    phaseRationale:
      "Oracle legacy lock-in 강력, 그러나 신규 워크로드는 PostgreSQL·cloud-native로 이전. AI 23ai로 Oracle도 반격.",
    participants: [
      {
        firmId: "orcl",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "Oracle Database — enterprise legacy 표준, OCI로 cloud 이전.",
      },
      {
        firmId: "amzn",
        role: "Prince",
        revenueWeight: 0.10,
        rationale: "AWS RDS·DynamoDB·Aurora — cloud-native 신규 워크로드의 기본.",
      },
    ],
  },
  {
    id: "hybrid-private-cloud",
    name: "Hybrid & Private Cloud",
    nameKo: "하이브리드·프라이빗 클라우드",
    ecosystemId: "ai",
    layerId: "cloud",
    description: "온프렘+퍼블릭 통합 — 규제·데이터 주권 수요",
    phase: "Maturing Main Street",
    phaseRationale:
      "금융·정부·헬스케어 등 데이터 주권 수요로 안정. IBM Red Hat OpenShift가 표준, hyperscaler들이 자체 hybrid 솔루션으로 잠식 시도.",
    participants: [
      {
        firmId: "ibm",
        role: "King",
        revenueWeight: 0.30,
        rationale: "IBM Red Hat OpenShift — hybrid 표준, 금융·정부 수주.",
      },
    ],
  },
];
