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

  // ═══════════════════════════════════════════════════════════════
  // AI > data-platform (데이터·분석 플랫폼)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "cloud-data-warehouse",
    name: "Cloud Data Warehouse",
    nameKo: "클라우드 데이터 웨어하우스",
    ecosystemId: "ai",
    layerId: "data-platform",
    description: "엔터프라이즈 분석용 데이터 웨어하우스 — Snowflake vs Databricks 양강",
    phase: "Maturing Main Street",
    phaseRationale:
      "초기 폭발 성장 후 안정화. Databricks(비상장)·BigQuery·Redshift와 oligopoly. AI 워크로드의 데이터 허브로 안정 수요.",
    participants: [
      {
        firmId: "snow",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Snowflake — 멀티 클라우드 데이터 공유 표준, 엔터프라이즈 도입 1위.",
      },
    ],
  },
  {
    id: "nosql-document-db",
    name: "NoSQL Document Database",
    nameKo: "NoSQL 도큐먼트 DB",
    ecosystemId: "ai",
    layerId: "data-platform",
    description: "JSON 문서 기반 NoSQL DB — 신규 앱의 default 선택 중 하나",
    phase: "Maturing Main Street",
    phaseRationale:
      "MongoDB가 표준이지만 AWS DynamoDB·Cosmos DB가 cloud-native 워크로드 잠식. Vector search 추가로 AI 시대 재포지셔닝.",
    participants: [
      {
        firmId: "mdb",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "MongoDB — 도큐먼트 DB 사실상 표준, Atlas로 cloud 매출 확대.",
      },
    ],
  },
  {
    id: "search-analytics",
    name: "Search & Analytics Engine",
    nameKo: "검색·분석 엔진",
    ecosystemId: "ai",
    layerId: "data-platform",
    description: "엔터프라이즈 검색·로그 분석·옵저버빌리티 — Elastic stack",
    phase: "Maturing Main Street",
    phaseRationale:
      "ELK stack 사실상 표준이지만 OpenSearch fork·observability 경쟁사 잠식. AI 검색(vector)으로 재포지셔닝 중.",
    participants: [
      {
        firmId: "elastic",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "Elastic — ELK stack open-source, 엔터프라이즈 검색·로그 표준.",
      },
    ],
  },
  {
    id: "event-streaming-kafka",
    name: "Event Streaming (Kafka)",
    nameKo: "이벤트 스트리밍(Kafka)",
    ecosystemId: "ai",
    layerId: "data-platform",
    description: "Apache Kafka 기반 실시간 이벤트 처리 — 데이터 파이프라인 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Kafka가 사실상 표준 protocol. Confluent Cloud가 commercial leader, AWS MSK·Redpanda 경쟁.",
    participants: [
      {
        firmId: "cflt",
        role: "Gorilla",
        revenueWeight: 0.90,
        rationale: "Confluent — Kafka 창업자, 사실상 commercial 표준.",
      },
    ],
  },
  {
    id: "product-analytics",
    name: "Product Analytics",
    nameKo: "제품 분석",
    ecosystemId: "ai",
    layerId: "data-platform",
    description: "B2C/B2B 제품 사용 데이터 분석 — Mixpanel/Amplitude/Pendo oligopoly",
    phase: "Maturing Main Street",
    phaseRationale:
      "PMF 후 안정 시장. Amplitude·Mixpanel·Pendo 분할.",
    participants: [
      {
        firmId: "ampl",
        role: "Prince",
        revenueWeight: 0.95,
        rationale: "Amplitude — Mixpanel과 양분 경쟁.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > ai-platform (AI 플랫폼·옵저버빌리티)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "enterprise-ai-platform",
    name: "Enterprise AI Application Platform",
    nameKo: "엔터프라이즈 AI 애플리케이션 플랫폼",
    ecosystemId: "ai",
    layerId: "ai-platform",
    description: "Ontology 기반 의사결정/운영 OS — 정부·국방·산업 도입 가속",
    phase: "Tornado",
    phaseRationale:
      "Palantir AIP가 미 정부·국방·F500 도입 폭발. 경쟁 부재(C3.ai 추격 미미). 토네이도 단계.",
    participants: [
      {
        firmId: "pltr",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Palantir AIP/Foundry/Apollo — 엔터프라이즈 AI OS 표준 굳히기.",
      },
      {
        firmId: "c3ai",
        role: "Challenger",
        revenueWeight: 0.95,
        rationale: "C3.ai — Palantir에 비해 sales·tech 모두 열세, 점유 격차 확대.",
      },
    ],
  },
  {
    id: "application-observability",
    name: "Application Observability (APM)",
    nameKo: "애플리케이션 옵저버빌리티 (APM)",
    ecosystemId: "ai",
    layerId: "ai-platform",
    description: "분산 시스템 모니터링·트레이싱·메트릭 — Datadog 종합 leader",
    phase: "Maturing Main Street",
    phaseRationale:
      "DDOG·DT·NR oligopoly 안정. AI 워크로드 옵저버빌리티(LLM cost, latency)로 일부 신규 수요.",
    participants: [
      {
        firmId: "ddog",
        role: "King",
        revenueWeight: 0.90,
        rationale: "Datadog — APM·인프라·로그 통합 platform 종합 leader.",
      },
      {
        firmId: "dynt",
        role: "Prince",
        revenueWeight: 0.90,
        rationale: "Dynatrace — 엔터프라이즈 deep-instrumentation 강자.",
      },
      {
        firmId: "nrg",
        role: "Niche",
        revenueWeight: 0.95,
        rationale: "New Relic — DDOG에 점유 잠식, 사모펀드에 인수돼 비상장 전환.",
      },
    ],
  },
  {
    id: "log-siem-analytics",
    name: "Log & SIEM Analytics",
    nameKo: "로그·SIEM 분석",
    ecosystemId: "ai",
    layerId: "ai-platform",
    description: "엔터프라이즈 로그 분석·보안 정보 이벤트 관리 — Splunk legacy + Cisco 통합",
    phase: "Maturing Main Street",
    phaseRationale:
      "Splunk가 enterprise SIEM 표준이지만 Datadog·Microsoft Sentinel 등 cloud-native에 점유 잠식. Cisco 인수로 enterprise 통합 강화.",
    participants: [
      {
        firmId: "splk",
        role: "Gorilla",
        revenueWeight: 0.90,
        rationale: "Splunk — 엔터프라이즈 SIEM 표준, Cisco 인수 후 비상장.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > dev-tools (개발도구·통합)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "artifact-repository",
    name: "Binary Artifact Repository",
    nameKo: "바이너리 아티팩트 저장소",
    ecosystemId: "ai",
    layerId: "dev-tools",
    description: "엔터프라이즈 빌드 산출물·컨테이너 이미지 저장소 — JFrog 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "JFrog Artifactory가 enterprise 표준. GitHub Packages·Cloud-native registry 경쟁이지만 enterprise lock-in 강함.",
    participants: [
      {
        firmId: "frog",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "JFrog Artifactory — enterprise binary repo 사실상 표준.",
      },
    ],
  },
  {
    id: "devops-platform",
    name: "End-to-End DevOps Platform",
    nameKo: "통합 DevOps 플랫폼",
    ecosystemId: "ai",
    layerId: "dev-tools",
    description: "소스관리+CI/CD+이슈 통합 플랫폼 — GitHub vs GitLab 양강",
    phase: "Maturing Main Street",
    phaseRationale:
      "GitHub(Microsoft 산하)이 점유 1위, GitLab이 self-hosted·enterprise에서 강세. AI Copilot 통합 경쟁.",
    participants: [
      {
        firmId: "gtlb",
        role: "Prince",
        revenueWeight: 0.95,
        rationale: "GitLab — self-hosted·regulated industry에서 GitHub 대안.",
      },
    ],
  },
  {
    id: "iac-infra-automation",
    name: "Infrastructure as Code",
    nameKo: "인프라 코드 자동화 (IaC)",
    ecosystemId: "ai",
    layerId: "dev-tools",
    description: "Terraform·Vault 등 인프라 자동화 — HashiCorp 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Terraform이 사실상 IaC 표준, OpenTofu fork와 라이선스 갈등. IBM 인수 후 비상장.",
    participants: [
      {
        firmId: "hashi",
        role: "Gorilla",
        revenueWeight: 0.90,
        rationale: "HashiCorp Terraform·Vault — IaC 표준, IBM 인수 진행.",
      },
    ],
  },
  {
    id: "communications-api",
    name: "Communications API (CPaaS)",
    nameKo: "통신 API (CPaaS)",
    ecosystemId: "ai",
    layerId: "dev-tools",
    description: "SMS·voice·video API — Twilio 종합 leader, 가격 압박 큼",
    phase: "Maturing Main Street",
    phaseRationale:
      "Twilio가 종합 leader지만 Sinch·Bandwidth 등 가격 경쟁 심화. AWS Connect·MS Teams 통합 위협.",
    participants: [
      {
        firmId: "twlo",
        role: "King",
        revenueWeight: 0.85,
        rationale: "Twilio — 통신 API 종합 leader, 마진 압박으로 구조조정 진행.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > enterprise-saas (기업용 SaaS — 가장 sub-카테고리 많음)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "sales-crm",
    name: "Sales CRM",
    nameKo: "영업 CRM",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "영업·고객관계 관리 SaaS — Salesforce 압도적 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Salesforce가 enterprise CRM 표준, HubSpot이 SMB·marketing 자동화 강세. Agentforce(Salesforce)·Breeze(HubSpot) AI agent 경쟁.",
    participants: [
      {
        firmId: "crm",
        role: "Gorilla",
        revenueWeight: 0.70,
        rationale: "Salesforce — enterprise CRM 표준, AppExchange 생태계 lock-in.",
      },
      {
        firmId: "hubs",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "HubSpot — SMB·marketing 자동화 1위, enterprise 진입 가속.",
      },
    ],
  },
  {
    id: "itsm-workflow",
    name: "ITSM & Enterprise Workflow",
    nameKo: "ITSM·엔터프라이즈 워크플로",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "IT 서비스 관리·전사 워크플로 OS — ServiceNow 사실상 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "ServiceNow가 ITSM 표준, HR/finance/customer ops로 확장 중. Now Assist AI agent로 토네이도 재진입 시도.",
    participants: [
      {
        firmId: "now",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "ServiceNow — ITSM 표준, F500 90%+ 도입.",
      },
    ],
  },
  {
    id: "hcm-payroll",
    name: "Cloud HCM & Payroll",
    nameKo: "클라우드 HCM·급여",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "인사·급여·재무 클라우드 SaaS — Workday enterprise 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Workday가 enterprise HCM 표준, SAP SuccessFactors 점유 꾸준히 잠식. AI 기능으로 upsell.",
    participants: [
      {
        firmId: "wday",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Workday — enterprise HCM 사실상 표준, 재무까지 확장.",
      },
    ],
  },
  {
    id: "smb-financial-saas",
    name: "SMB Financial & Tax SaaS",
    nameKo: "SMB 재무·세무 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "QuickBooks·TurboTax·Mailchimp 통합 — Intuit 압도",
    phase: "Maturing Main Street",
    phaseRationale:
      "Intuit가 미국 SMB·소비자 세무 사실상 독점. TurboTax 정부 무료 세무 시도 위협, 그러나 lock-in 강력.",
    participants: [
      {
        firmId: "intu",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Intuit — QuickBooks·TurboTax·Credit Karma·Mailchimp 통합.",
      },
    ],
  },
  {
    id: "erp-suite",
    name: "Enterprise ERP",
    nameKo: "엔터프라이즈 ERP",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "전사 통합 ERP 시스템 — SAP S/4HANA 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "SAP S/4HANA cloud 이전 진행, Oracle Fusion·Workday Financials 잠식. AI Joule로 업셀.",
    participants: [
      {
        firmId: "sap",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "SAP — 글로벌 enterprise ERP 표준, S/4HANA cloud 전환 진행.",
      },
    ],
  },
  {
    id: "creative-design-saas",
    name: "Creative & Design SaaS",
    nameKo: "창작·디자인 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "Photoshop·Premiere·Figma — Adobe 종합 + 생성 AI Firefly",
    phase: "Tornado",
    phaseRationale:
      "Generative AI(Firefly)가 창작 SaaS 카테고리에 토네이도 재점화. Canva·Figma(Adobe 인수 무산) 경쟁.",
    participants: [
      {
        firmId: "adbe",
        role: "Gorilla",
        revenueWeight: 0.90,
        rationale: "Adobe Creative Cloud + Firefly — 창작 SaaS 사실상 표준, 생성 AI 통합 leader.",
      },
    ],
  },
  {
    id: "ad-tech-dsp",
    name: "Programmatic Ad Tech (DSP)",
    nameKo: "프로그래매틱 광고 (DSP)",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "오픈 인터넷 광고 입찰 자동화 — The Trade Desk 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "TTD가 오픈 인터넷 DSP 사실상 표준, UID 2.0이 post-cookie 표준 선점. Google Privacy Sandbox 위협.",
    participants: [
      {
        firmId: "ttd",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "The Trade Desk — 오픈 인터넷 DSP·UID 2.0 표준 주도.",
      },
    ],
  },
  {
    id: "life-sciences-vertical-saas",
    name: "Life Sciences Vertical SaaS",
    nameKo: "생명과학 수직 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "제약·바이오 임상시험·CRM·QMS — Veeva 사실상 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Veeva가 글로벌 제약·바이오 SaaS 표준 (Salesforce platform 이탈 후 자체 platform 구축).",
    participants: [
      {
        firmId: "veeva",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Veeva Systems — 글로벌 제약·바이오 SaaS 표준.",
      },
    ],
  },
  {
    id: "video-conferencing",
    name: "Video Conferencing",
    nameKo: "영상 회의",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "Zoom·Teams·Meet — 코로나 토네이도 후 Maturing",
    phase: "Maturing Main Street",
    phaseRationale:
      "MS Teams 번들에 enterprise share 잠식, Zoom 성장 정체. AI Companion으로 차별화 시도.",
    participants: [
      {
        firmId: "zm",
        role: "Prince",
        revenueWeight: 0.90,
        rationale: "Zoom — UI 우수하지만 Teams 번들에 enterprise share 잠식.",
      },
    ],
  },
  {
    id: "ucaas-business-comms",
    name: "Cloud Business Communications (UCaaS)",
    nameKo: "기업 통합 통신 (UCaaS)",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "기업 전화·통합 메시징 클라우드 — RingCentral 종합",
    phase: "Maturing Main Street",
    phaseRationale:
      "MS Teams Phone, Zoom Phone에 점유 압박. RingCentral 구조조정 진행.",
    participants: [
      {
        firmId: "rng",
        role: "King",
        revenueWeight: 0.95,
        rationale: "RingCentral — 독립 UCaaS 1위, MS Teams Phone에 점유 압박.",
      },
    ],
  },
  {
    id: "ccaas-contact-center",
    name: "Cloud Contact Center (CCaaS)",
    nameKo: "클라우드 컨택센터 (CCaaS)",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "고객센터 클라우드·AI agent 통합 — Five9·Sprinklr·NICE 분할",
    phase: "Maturing Main Street",
    phaseRationale:
      "AI agent 통합으로 카테고리 재정의 중. AWS Connect·MS Dynamics 경쟁.",
    participants: [
      {
        firmId: "fivn",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Five9 — 독립 CCaaS 강자.",
      },
      {
        firmId: "spk",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "Sprinklr — 소셜·고객 경험 통합 platform.",
      },
      {
        firmId: "lspn",
        role: "Niche",
        revenueWeight: 0.95,
        rationale: "LivePerson — 채팅 봇 강자였으나 점유 잠식.",
      },
    ],
  },
  {
    id: "customer-support-saas",
    name: "Customer Support SaaS",
    nameKo: "고객 지원 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "Zendesk 등 헬프데스크·티켓팅 — AI agent 시대 재정의",
    phase: "Maturing Main Street",
    phaseRationale:
      "Zendesk PE 인수 후 비상장. AI agent(Sierra·Decagon 등 비상장)가 카테고리 재정의 중.",
    participants: [
      {
        firmId: "zen",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Zendesk — 헬프데스크 SaaS 표준, PE 인수 후 비상장.",
      },
    ],
  },
  {
    id: "esignature",
    name: "E-signature",
    nameKo: "전자서명",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "DocuSign·Adobe Sign — 카테고리 표준 굳어짐",
    phase: "Maturing Main Street",
    phaseRationale:
      "DocuSign 카테고리 표준이지만 성장 정체, Adobe Sign·HelloSign 등 경쟁.",
    participants: [
      {
        firmId: "dxcm",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "DocuSign — 전자서명 카테고리 표준, IAM(Identity·Agreement Mgmt)으로 확장 시도.",
      },
    ],
  },
  {
    id: "file-sync-share",
    name: "File Sync & Share",
    nameKo: "파일 공유·동기화",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "Box·Dropbox — 클라우드 파일 저장·협업, MS·Google에 점유 잠식",
    phase: "Maturing Main Street",
    phaseRationale:
      "MS OneDrive·Google Drive 번들 위협으로 enterprise·소비자 양쪽 점유 잠식. AI 통합으로 일부 차별화.",
    participants: [
      {
        firmId: "box",
        role: "Niche",
        revenueWeight: 0.95,
        rationale: "Box — enterprise 파일 협업 niche.",
      },
      {
        firmId: "drp",
        role: "Niche",
        revenueWeight: 0.95,
        rationale: "Dropbox — 소비자 파일 동기화 niche, AI 기능 통합.",
      },
    ],
  },
  {
    id: "work-management",
    name: "Work Management",
    nameKo: "업무 관리",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "프로젝트·태스크 관리 SaaS — Asana·Monday·ClickUp 분할",
    phase: "Maturing Main Street",
    phaseRationale:
      "PMF 완료 후 안정 분할. AI 기능 통합으로 차별화 경쟁.",
    participants: [
      {
        firmId: "asan",
        role: "Challenger",
        revenueWeight: 0.95,
        rationale: "Asana — 업무 관리 SaaS 분할 시장의 한 축.",
      },
    ],
  },
  {
    id: "rpa-automation",
    name: "Robotic Process Automation (RPA)",
    nameKo: "로봇 프로세스 자동화 (RPA)",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "UI 자동화·문서 처리 — UiPath 표준이지만 AI agent에 위협",
    phase: "Declining Main Street",
    phaseRationale:
      "AI agent(LLM-기반)가 RPA의 brittle UI 자동화 대체 시도. UiPath가 AI agent로 재포지셔닝 중이지만 카테고리 자체 위협.",
    participants: [
      {
        firmId: "path",
        role: "King",
        revenueWeight: 0.95,
        rationale: "UiPath — RPA 카테고리 1위, AI agent 통합으로 재포지셔닝.",
      },
    ],
    successorCategoryId: "enterprise-ai-platform",
  },
  {
    id: "customer-engagement-marketing",
    name: "Customer Engagement & Marketing Automation",
    nameKo: "고객 인게이지먼트·마케팅 자동화",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "Braze·Iterable·Salesforce Marketing — 푸시·이메일·SMS 자동화",
    phase: "Maturing Main Street",
    phaseRationale:
      "PMF 완료, Salesforce Marketing Cloud·HubSpot과 경쟁.",
    participants: [
      {
        firmId: "brze",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Braze — 모바일 우선 고객 인게이지먼트 강자.",
      },
    ],
  },
  {
    id: "legal-vertical-saas",
    name: "Legal & Professional Services Vertical SaaS",
    nameKo: "법률·전문서비스 수직 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "법무법인·회계법인 운영 SaaS — Intapp 강자",
    phase: "Maturing Main Street",
    phaseRationale:
      "고도 vertical로 niche 경쟁자 적음, AI 통합 진행.",
    participants: [
      {
        firmId: "ints",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Intapp — 법무·회계 vertical SaaS 강자.",
      },
    ],
  },
  {
    id: "real-estate-saas",
    name: "Property Management SaaS",
    nameKo: "부동산 관리 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "주택·상업 부동산 관리 SaaS — AppFolio 강자",
    phase: "Maturing Main Street",
    phaseRationale:
      "Niche vertical, AppFolio·RealPage·Yardi 분할 안정.",
    participants: [
      {
        firmId: "appf",
        role: "King",
        revenueWeight: 0.95,
        rationale: "AppFolio — 중소형 부동산 관리 SaaS 강자.",
      },
    ],
  },
  {
    id: "industrial-process-optimization",
    name: "Industrial Process Optimization",
    nameKo: "산업 공정 최적화 SaaS",
    ecosystemId: "ai",
    layerId: "enterprise-saas",
    description: "정유·화학·제조 공정 최적화 — AspenTech 강자",
    phase: "Maturing Main Street",
    phaseRationale:
      "정유·화학 vertical, Emerson 인수 후 비상장. AI/디지털 트윈 진화.",
    participants: [
      {
        firmId: "azpn",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "AspenTech — 정유·화학 공정 최적화 표준, Emerson 인수.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // AI > consumer-ai-apps (소비자 AI 앱)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "internet-search",
    name: "Internet Search",
    nameKo: "인터넷 검색",
    ecosystemId: "ai",
    layerId: "consumer-ai-apps",
    description: "글로벌 검색·광고 — Google 사실상 독점, AI 검색이 첫 위협",
    phase: "Maturing Main Street",
    phaseRationale:
      "Google이 글로벌 검색 독점이지만 ChatGPT·Perplexity 등 AI 검색이 처음으로 의미있는 위협 등장. Gemini 통합으로 반격.",
    participants: [
      {
        firmId: "googl",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "Google Search — 글로벌 검색·광고 독점, Gemini AI 통합.",
      },
    ],
  },
  {
    id: "social-network",
    name: "Social Network & Messaging",
    nameKo: "소셜 네트워크·메신저",
    ecosystemId: "ai",
    layerId: "consumer-ai-apps",
    description: "Facebook·Instagram·WhatsApp — Meta family of apps, 광고 매출",
    phase: "Maturing Main Street",
    phaseRationale:
      "TikTok 위협에 Reels로 대응. 광고 ROAS 회복, Llama AI로 반격.",
    participants: [
      {
        firmId: "meta",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Meta — Facebook·Instagram·WhatsApp 글로벌 SNS·메신저 표준.",
      },
    ],
  },
  {
    id: "consumer-device-os",
    name: "Consumer Devices & OS Ecosystem",
    nameKo: "소비자 디바이스·OS 생태계",
    ecosystemId: "ai",
    layerId: "consumer-ai-apps",
    description: "iPhone·Mac·iPad+Apple Intelligence — 디바이스+OS+서비스 lock-in",
    phase: "Maturing Main Street",
    phaseRationale:
      "스마트폰 시장 성숙, Services 매출이 새 성장축. Apple Intelligence(on-device LLM)로 AI 통합.",
    participants: [
      {
        firmId: "aapl",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Apple — 디바이스+OS+서비스 lock-in 생태계 표준.",
      },
    ],
  },
  {
    id: "streaming-content",
    name: "Streaming Content",
    nameKo: "스트리밍 콘텐츠",
    ecosystemId: "ai",
    layerId: "consumer-ai-apps",
    description: "Netflix·Disney+·Prime Video — SVOD 카테고리, AI 추천 알고리즘이 핵심",
    phase: "Maturing Main Street",
    phaseRationale:
      "SVOD 가입자 성장 둔화, 광고 tier·번들 경쟁. AI 추천 알고리즘이 시청 시간 차별화의 핵심.",
    participants: [
      {
        firmId: "nflx",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Netflix — 글로벌 SVOD 1위, AI 추천이 핵심 lock-in.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Cybersecurity > endpoint
  // ═══════════════════════════════════════════════════════════════
  {
    id: "edr-xdr-platform",
    name: "EDR/XDR Platform",
    nameKo: "엔드포인트 EDR/XDR 플랫폼",
    ecosystemId: "cybersecurity",
    layerId: "endpoint",
    description: "단말 위협 탐지·대응 통합 플랫폼 — Microsoft Defender 외부 위협",
    phase: "Maturing Main Street",
    phaseRationale:
      "CrowdStrike Falcon이 cloud-native EDR 표준이지만 Microsoft Defender 번들 위협. 2024 outage 후 SentinelOne 점유 일부 회복.",
    participants: [
      {
        firmId: "crwd",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "CrowdStrike Falcon — cloud-native EDR/XDR 표준, F500 60%+ 도입.",
      },
      {
        firmId: "sent",
        role: "Prince",
        revenueWeight: 0.95,
        rationale: "SentinelOne — AI-native EDR로 CRWD 추격, 2024 outage 수혜.",
      },
    ],
  },
  {
    id: "threat-intel-services",
    name: "Threat Intelligence & MDR",
    nameKo: "위협 인텔리전스·관리형 탐지대응 (MDR)",
    ecosystemId: "cybersecurity",
    layerId: "endpoint",
    description: "AI 기반 threat hunting + 24x7 MDR 서비스 — EDR 위 layer",
    phase: "Bowling Alley",
    phaseRationale:
      "EDR 도입 완료 후 enterprise가 MDR 외주화 가속. CrowdStrike·SentinelOne 모두 핵심 upsell 영역.",
    participants: [
      {
        firmId: "crwd",
        role: "King",
        revenueWeight: 0.20,
        rationale: "Falcon Complete MDR — 가장 큰 MDR 서비스 매출.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Cybersecurity > network-firewall
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ngfw-physical",
    name: "Next-Gen Firewall (NGFW)",
    nameKo: "차세대 방화벽 (NGFW)",
    ecosystemId: "cybersecurity",
    layerId: "network-firewall",
    description: "온프렘 NGFW 어플라이언스 — Palo Alto·Fortinet 양강",
    phase: "Maturing Main Street",
    phaseRationale:
      "온프렘 방화벽 시장은 cloud SASE로 일부 잠식되지만 enterprise·정부 lock-in 강함. PANW가 종합 leader, FTNT가 가성비 강자.",
    participants: [
      {
        firmId: "panw",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "Palo Alto Networks — NGFW 종합 leader, 정부·F500 도입 1위.",
      },
      {
        firmId: "ftnt",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "Fortinet — FortiGate 가성비 강자, mid-market·국제 강세.",
      },
    ],
  },
  {
    id: "sase-zero-trust",
    name: "SASE & Zero Trust",
    nameKo: "SASE·제로 트러스트",
    ecosystemId: "cybersecurity",
    layerId: "network-firewall",
    description: "클라우드형 보안 엣지·제로 트러스트 — Zscaler/Cloudflare 외부 + Prisma",
    phase: "Tornado",
    phaseRationale:
      "재택·클라우드 전환으로 SASE 토네이도 진입. Zscaler·Cloudflare(외부)와 Prisma·FortiSASE 경쟁.",
    participants: [
      {
        firmId: "panw",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "Prisma SASE — 고성장 segment, NGFW와 통합 강점.",
      },
      {
        firmId: "ftnt",
        role: "Challenger",
        revenueWeight: 0.10,
        rationale: "FortiSASE — Fortinet ecosystem 통합으로 추격.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Cybersecurity > identity
  // ═══════════════════════════════════════════════════════════════
  {
    id: "iam-sso-mfa",
    name: "Workforce IAM & SSO",
    nameKo: "인력 IAM·SSO",
    ecosystemId: "cybersecurity",
    layerId: "identity",
    description: "직원 신원관리·SSO·MFA — Okta vs Microsoft Entra",
    phase: "Maturing Main Street",
    phaseRationale:
      "Okta가 cloud-native IAM 표준이지만 Microsoft Entra 번들에 점유 잠식. CIAM(Auth0)으로 확장.",
    participants: [
      {
        firmId: "okta",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Okta — cloud-native IAM 표준, Auth0 인수로 CIAM 확장.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > shipbuilding
  // ═══════════════════════════════════════════════════════════════
  {
    id: "lng-carrier-orderbook",
    name: "LNG Carrier",
    nameKo: "LNG 운반선",
    ecosystemId: "korean-industrial",
    layerId: "shipbuilding",
    description: "LNG 운반선 — 한국 3사 글로벌 점유 90%+ 카르텔에 가까움",
    phase: "Tornado",
    phaseRationale:
      "유럽 가스 위기 + 미국 LNG 수출 확대로 발주 폭발, 2030년까지 도크 만석. 한국 3사가 사실상 글로벌 oligopoly.",
    participants: [
      {
        firmId: "hhih",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "HD한국조선해양 — 글로벌 LNG 운반선 점유 1위.",
      },
      {
        firmId: "shi",
        role: "Prince",
        revenueWeight: 0.50,
        rationale: "삼성중공업 — LNG 운반선 #2, 도크 만석.",
      },
      {
        firmId: "hho",
        role: "Prince",
        revenueWeight: 0.40,
        rationale: "한화오션(구 대우조선) — 한화 인수 후 흑자 전환, LNG 운반선 강자.",
      },
    ],
  },
  {
    id: "offshore-energy-platform",
    name: "Offshore Energy Platform",
    nameKo: "해양 에너지 플랜트",
    ecosystemId: "korean-industrial",
    layerId: "shipbuilding",
    description: "FPSO·해양 시추 설비 — 유가 사이클 의존",
    phase: "Maturing Main Street",
    phaseRationale:
      "유가 회복으로 FPSO 발주 회복, 그러나 LNG 운반선만큼 토네이도는 아님.",
    participants: [
      {
        firmId: "hhih",
        role: "King",
        revenueWeight: 0.20,
        rationale: "HD한국조선해양 — FPSO 강자.",
      },
      {
        firmId: "shi",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "삼성중공업 — FPSO 글로벌 강자.",
      },
    ],
  },
  {
    id: "naval-shipbuilding-export",
    name: "Naval Shipbuilding Export",
    nameKo: "함정 수출 (해군 조선)",
    ecosystemId: "korean-industrial",
    layerId: "shipbuilding",
    description: "잠수함·구축함 수출 — 미·호주·캐나다 협력 가속",
    phase: "Bowling Alley",
    phaseRationale:
      "미 해군 함정 정비·신조 협력 논의 진전, 호주·캐나다 잠수함 입찰. 한화오션·HD한국조선해양 양강 입찰 경쟁.",
    participants: [
      {
        firmId: "hho",
        role: "King",
        revenueWeight: 0.20,
        rationale: "한화오션 — 호주 잠수함·미 해군 정비 협력 추진.",
      },
      {
        firmId: "hhih",
        role: "Prince",
        revenueWeight: 0.10,
        rationale: "HD한국조선해양 — 캐나다 잠수함·함정 수출 입찰.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > defense (한국 방산)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "k9-self-propelled-artillery",
    name: "Self-Propelled Artillery (K9)",
    nameKo: "K9 자주포",
    ecosystemId: "korean-industrial",
    layerId: "defense",
    description: "K9 자주포 — 글로벌 자주포 카테고리 사실상 표준",
    phase: "Tornado",
    phaseRationale:
      "폴란드 1차 계약 후 이집트·노르웨이·핀란드·루마니아 추가 수주. 글로벌 자주포 카테고리에서 K9이 사실상 표준.",
    participants: [
      {
        firmId: "hwa",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "한화에어로스페이스 — K9 자주포 글로벌 점유 50%+, 사실상 카테고리 표준.",
      },
    ],
  },
  {
    id: "k2-tank-export",
    name: "K2 Tank Export",
    nameKo: "K2 전차 수출",
    ecosystemId: "korean-industrial",
    layerId: "defense",
    description: "K2 흑표 전차 — 폴란드 1000대 + 추가 수주, 글로벌 전차 시장 진입",
    phase: "Tornado",
    phaseRationale:
      "폴란드 K2 1차 180대 + 2차 820대 협상 진행, 루마니아·노르웨이 등 추가 입찰. 글로벌 전차 시장에서 Leopard 2(독일)·Abrams(미)와 차별화된 가격·납기로 점유 확대.",
    participants: [
      {
        firmId: "hrt",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "현대로템 — K2 전차 단독 제조, 폴란드 등 수출 가속.",
      },
    ],
  },
  {
    id: "precision-guided-missile-kr",
    name: "Korean Precision-Guided Missile",
    nameKo: "한국 정밀유도무기·미사일",
    ecosystemId: "korean-industrial",
    layerId: "defense",
    description: "천궁(M-SAM)·해성·현무 — UAE·사우디 수출 확대",
    phase: "Bowling Alley",
    phaseRationale:
      "한국 시장에서는 사실상 독점이지만 글로벌 미사일 카테고리에서는 도전자급. UAE·사우디 천궁 수출이 첫 글로벌 토네이도 신호.",
    participants: [
      {
        firmId: "lig",
        role: "King",
        revenueWeight: 0.95,
        rationale: "LIG넥스원 — 한국 유도무기·미사일 표준, 글로벌 수출 확대.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > auto (한국 자동차)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "korean-ev-platform",
    name: "Korean EV Platform (E-GMP)",
    nameKo: "한국 EV 플랫폼 (E-GMP)",
    ecosystemId: "korean-industrial",
    layerId: "auto",
    description: "Ioniq 5/6/9·EV6/EV9 — 800V 플랫폼 글로벌 EV 카테고리 강자",
    phase: "Tornado",
    phaseRationale:
      "E-GMP 플랫폼이 800V·400kW 충전 기술로 글로벌 EV 차별화. 미 IRA 거점 조지아 메타플랜트 가동, 유럽·미국 점유 확대.",
    participants: [
      {
        firmId: "hyundai",
        role: "King",
        revenueWeight: 0.20,
        rationale: "현대차 — Ioniq 라인업, 글로벌 EV 점유 상위.",
      },
      {
        firmId: "kia",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "기아 — EV6/EV9, E-GMP 플랫폼 공유, 가격 차별화.",
      },
    ],
  },
  {
    id: "korean-ice-vehicle",
    name: "Korean ICE/Hybrid Vehicle",
    nameKo: "한국 ICE·하이브리드 차량",
    ecosystemId: "korean-industrial",
    layerId: "auto",
    description: "Sonata·Tucson·K5·Sportage 등 — 캐시카우 본업",
    phase: "Maturing Main Street",
    phaseRationale:
      "글로벌 ICE/하이브리드 시장은 성숙. 현대·기아가 미·유럽 점유 안정 확대. EV 전환 가속이 장기적 declining 압력.",
    participants: [
      {
        firmId: "hyundai",
        role: "King",
        revenueWeight: 0.70,
        rationale: "현대차 — ICE/하이브리드 본업, 글로벌 점유 상위.",
      },
      {
        firmId: "kia",
        role: "Prince",
        revenueWeight: 0.65,
        rationale: "기아 — Sportage·K5 등 안정 캐시카우.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > battery (한국 배터리)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "ev-battery-cell-pouch",
    name: "EV Battery Cell (Pouch)",
    nameKo: "EV 배터리 셀 (파우치형)",
    ecosystemId: "korean-industrial",
    layerId: "battery",
    description: "파우치형 배터리 셀 — 현대·GM·VW 등 OEM 공급",
    phase: "Tornado",
    phaseRationale:
      "EV 토네이도 둔화에도 IRA 보조금 + 미국 거점화로 한국 셀 메이커 안정. 파우치형은 LGES가 leader.",
    participants: [
      {
        firmId: "lges",
        role: "King",
        revenueWeight: 0.85,
        rationale: "LG에너지솔루션 — 파우치형 셀 글로벌 #1, GM·VW·Stellantis 공급.",
      },
    ],
  },
  {
    id: "ev-battery-cell-prismatic",
    name: "EV Battery Cell (Prismatic)",
    nameKo: "EV 배터리 셀 (각형)",
    ecosystemId: "korean-industrial",
    layerId: "battery",
    description: "각형 배터리 셀 — BMW·Audi 등 프리미엄 OEM 공급",
    phase: "Tornado",
    phaseRationale:
      "각형 셀 비중 점진 확대(중국 CATL·BYD 영향). SDI가 한국 각형 leader.",
    participants: [
      {
        firmId: "sdi",
        role: "King",
        revenueWeight: 0.85,
        rationale: "삼성SDI — 각형 셀 글로벌 강자, BMW·Audi·Stellantis 공급.",
      },
    ],
  },
  {
    id: "grid-ess-battery",
    name: "Grid Energy Storage Battery",
    nameKo: "그리드 ESS 배터리",
    ecosystemId: "korean-industrial",
    layerId: "battery",
    description: "그리드·산업용 ESS — 재생에너지 backup 수요 증가",
    phase: "Bowling Alley",
    phaseRationale:
      "재생에너지 변동성 흡수 + AI DC backup 수요로 ESS 시장 진입. 한국·미·중 oligopoly 경쟁.",
    participants: [
      {
        firmId: "lges",
        role: "King",
        revenueWeight: 0.10,
        rationale: "LG에너지솔루션 — ESS 셀 공급, 미국 IRA 거점.",
      },
      {
        firmId: "sdi",
        role: "Prince",
        revenueWeight: 0.10,
        rationale: "삼성SDI — ESS 셀, 데이터센터 backup 시장.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > internet
  // ═══════════════════════════════════════════════════════════════
  {
    id: "korean-search",
    name: "Korean Search & Web Portal",
    nameKo: "한국 검색·웹 포털",
    ecosystemId: "korean-industrial",
    layerId: "internet",
    description: "NAVER 검색·뉴스·쇼핑 — 한국 검색 카테고리 표준",
    phase: "Maturing Main Street",
    phaseRationale:
      "Google에 일부 검색 점유 잠식되었으나 한국에서는 여전히 #1. 쇼핑·페이로 슈퍼앱화 시도.",
    participants: [
      {
        firmId: "naver",
        role: "Gorilla",
        revenueWeight: 0.65,
        rationale: "NAVER — 한국 검색·포털 표준, 쇼핑·페이로 확장.",
      },
    ],
  },
  {
    id: "korean-messenger-platform",
    name: "Korean Messenger Platform",
    nameKo: "한국 메신저 플랫폼",
    ecosystemId: "korean-industrial",
    layerId: "internet",
    description: "카카오톡·카카오페이·카카오뱅크 — 한국 메신저 슈퍼앱",
    phase: "Maturing Main Street",
    phaseRationale:
      "카카오톡 한국 메신저 표준 확고하지만 부속 사업(페이·뱅크·모빌리티) 성장 둔화 + 규제 압박.",
    participants: [
      {
        firmId: "kakao",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "카카오 — 한국 메신저 표준, 슈퍼앱 lock-in.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > bio
  // ═══════════════════════════════════════════════════════════════
  {
    id: "biosimilars-global",
    name: "Global Biosimilars",
    nameKo: "글로벌 바이오시밀러",
    ecosystemId: "korean-industrial",
    layerId: "bio",
    description: "휴미라·아바스틴·허셉틴 등 바이오시밀러 — 글로벌 가격 경쟁",
    phase: "Tornado",
    phaseRationale:
      "오리지널 바이오 의약품 특허 만료 가속 + 미·유럽 보험사 바이오시밀러 우대로 토네이도 진입. 셀트리온·삼바·산도즈 oligopoly.",
    participants: [
      {
        firmId: "celltrion",
        role: "King",
        revenueWeight: 0.95,
        rationale: "셀트리온 — 글로벌 바이오시밀러 강자, 휴미라 시밀러 등 다수 보유.",
      },
    ],
  },
  {
    id: "biopharma-cdmo",
    name: "Biopharma CDMO",
    nameKo: "바이오 의약품 CDMO",
    ecosystemId: "korean-industrial",
    layerId: "bio",
    description: "바이오 의약품 위탁 생산 — 글로벌 빅파마 외주 거점",
    phase: "Tornado",
    phaseRationale:
      "GLP-1·항암·백신 등 바이오 수요 폭발로 CDMO capa 부족. 삼성바이오로직스가 글로벌 1위 capa.",
    participants: [
      {
        firmId: "sbiologics",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "삼성바이오로직스 — 글로벌 바이오 CDMO capa 1위, 4·5공장 가동·증설.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Korean Industrial > materials
  // ═══════════════════════════════════════════════════════════════
  {
    id: "korean-steel",
    name: "Korean Steel",
    nameKo: "한국 철강",
    ecosystemId: "korean-industrial",
    layerId: "materials",
    description: "조선·자동차용 후판·고급강 — 글로벌 oligopoly 안정",
    phase: "Maturing Main Street",
    phaseRationale:
      "글로벌 철강은 성숙·중국 공급과잉 압력. POSCO가 후판·고급강에서 안정 점유.",
    participants: [
      {
        firmId: "posco",
        role: "King",
        revenueWeight: 0.65,
        rationale: "POSCO — 한국 철강 표준, 후판·고급강 글로벌 점유.",
      },
    ],
  },
  {
    id: "battery-cathode-precursor",
    name: "Battery Cathode & Precursor",
    nameKo: "배터리 양극재·전구체",
    ecosystemId: "korean-industrial",
    layerId: "materials",
    description: "EV 배터리 양극재·전구체 — 한국 셀 3사 전·후방 통합",
    phase: "Maturing Main Street",
    phaseRationale:
      "EV 토네이도 둔화로 양극재 가격·물량 압박, 그러나 IRA 미국 거점화 수혜는 지속. POSCO Future M(POSCO 계열).",
    participants: [
      {
        firmId: "posco",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "POSCO Future M — 한국 양극재·전구체 leader, IRA 미국 생산 거점화.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense Resurgence > prime-contractors
  // ═══════════════════════════════════════════════════════════════
  {
    id: "missile-defense-systems",
    name: "Missile Defense Systems",
    nameKo: "미사일 방어 시스템",
    ecosystemId: "defense",
    layerId: "prime-contractors",
    description: "패트리어트·THAAD·이지스 — 글로벌 방공망 수요 폭발",
    phase: "Tornado",
    phaseRationale:
      "우크라전·중동·인태 동시 위기로 패트리어트·THAAD·이지스 수요 사상 최대. 미·동맹국 방공망 증설 발주 폭증.",
    participants: [
      {
        firmId: "rtx",
        role: "Gorilla",
        revenueWeight: 0.30,
        rationale: "RTX(Raytheon) — Patriot 미사일·SM-6/3 단독 공급, 우크라 + 중동 수요 폭발.",
      },
      {
        firmId: "lmt",
        role: "Prince",
        revenueWeight: 0.25,
        rationale: "Lockheed Martin — THAAD/Aegis 통합·PAC-3 미사일 생산.",
      },
    ],
  },
  {
    id: "next-gen-fighter-bomber",
    name: "Next-Gen Fighter & Bomber",
    nameKo: "차세대 전투기·폭격기",
    ecosystemId: "defense",
    layerId: "prime-contractors",
    description: "F-35·B-21·NGAD — 5/6세대 전투/폭격 플랫폼",
    phase: "Bowling Alley",
    phaseRationale:
      "F-35 안정 양산 + B-21 시제기 비행, NGAD 차세대 전투기 사업 진행. 일부 성숙·일부 도입 초기 혼재.",
    participants: [
      {
        firmId: "lmt",
        role: "Gorilla",
        revenueWeight: 0.40,
        rationale: "Lockheed Martin — F-35 전 세계 단독 공급, NGAD 입찰 참여.",
      },
      {
        firmId: "noc",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "Northrop Grumman — B-21 Raider 단독 개발·양산.",
      },
    ],
  },
  {
    id: "munitions-stockpile",
    name: "Munitions Stockpile Replenishment",
    nameKo: "탄약·재고 보충",
    ecosystemId: "defense",
    layerId: "prime-contractors",
    description: "포탄·미사일 등 소모성 탄약 재고 보충 — 우크라전 인한 다년 capex 사이클",
    phase: "Tornado",
    phaseRationale:
      "우크라 지원으로 미·NATO 탄약 재고 고갈, 다년 capex 사이클 진행. GD·LMT·HII 등이 양산 capa 증설.",
    participants: [
      {
        firmId: "gd",
        role: "King",
        revenueWeight: 0.30,
        rationale: "General Dynamics — 155mm 포탄·전차포탄 미 정부 단독 공급.",
      },
      {
        firmId: "lmt",
        role: "Prince",
        revenueWeight: 0.15,
        rationale: "LMT — JAVELIN·HIMARS 미사일 양산 capa 2배 증설.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense > aerospace-systems
  // ═══════════════════════════════════════════════════════════════
  {
    id: "commercial-jet-engines",
    name: "Commercial Jet Engines",
    nameKo: "민항기 엔진",
    ecosystemId: "defense",
    layerId: "aerospace-systems",
    description: "GE9X·LEAP·GTF 등 민항기 엔진 — 안정 oligopoly + AS service",
    phase: "Maturing Main Street",
    phaseRationale:
      "GE Aerospace·RTX(Pratt&Whitney)·Rolls-Royce 3강 oligopoly. 항공 수요 회복으로 aftermarket 호황.",
    participants: [
      {
        firmId: "ge",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "GE Aerospace — LEAP·GE9X 글로벌 점유 1위, aftermarket 캐시카우.",
      },
      {
        firmId: "rtx",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "RTX Pratt & Whitney — GTF 엔진, A320neo 일부 점유.",
      },
    ],
  },
  {
    id: "aerospace-suppliers",
    name: "Aerospace Component Suppliers",
    nameKo: "항공 부품 공급사",
    ecosystemId: "defense",
    layerId: "aerospace-systems",
    description: "액추에이터·항전·구조 부품 — Honeywell·Moog·Curtiss-Wright",
    phase: "Maturing Main Street",
    phaseRationale:
      "민항기·방산 양쪽 수요. 한화에어로(secondary)도 항공 부품 공급망에 일부 참여.",
    participants: [
      {
        firmId: "hon",
        role: "King",
        revenueWeight: 0.35,
        rationale: "Honeywell Aerospace — 항전·APU·기계 부품 종합 강자.",
      },
      {
        firmId: "moga",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "Moog — 항공·방산 액추에이터 specialist.",
      },
      {
        firmId: "cw",
        role: "Challenger",
        revenueWeight: 0.50,
        rationale: "Curtiss-Wright — 항공·방산 부품, 원자력도 함께.",
      },
    ],
  },
  {
    id: "engine-aftermarket-leasing",
    name: "Engine Aftermarket & Leasing",
    nameKo: "엔진 정비·리스",
    ecosystemId: "defense",
    layerId: "aerospace-systems",
    description: "민항기 엔진 정비·리스·부품 거래 — 항공 수요 회복 직접 수혜",
    phase: "Tornado",
    phaseRationale:
      "팬데믹 후 항공 수요 회복 + 신조 엔진 인도 지연으로 aftermarket·리스 수요 폭발. FTAI Aviation 직접 수혜.",
    participants: [
      {
        firmId: "ftai",
        role: "King",
        revenueWeight: 0.95,
        rationale: "FTAI Aviation — CFM56 엔진 PMA 부품·리스, 고마진 토네이도 segment.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense > naval-shipbuilding
  // ═══════════════════════════════════════════════════════════════
  {
    id: "us-naval-shipbuilding",
    name: "US Naval Shipbuilding",
    nameKo: "미 해군 함정 건조",
    ecosystemId: "defense",
    layerId: "naval-shipbuilding",
    description: "미 해군 함정 건조·정비 — 단독 공급, 한국 협력 논의",
    phase: "Bowling Alley",
    phaseRationale:
      "미 해군 함정 부족 + 정비 backlog로 capex 사이클. 한국 조선소(한화오션·HD현대)와 협력 논의.",
    participants: [
      {
        firmId: "hii",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Huntington Ingalls — 미 해군 함정·잠수함 단독 건조.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense > defense-electronics
  // ═══════════════════════════════════════════════════════════════
  {
    id: "tactical-comms-ew",
    name: "Tactical Comms & Electronic Warfare",
    nameKo: "전술 통신·전자전",
    ecosystemId: "defense",
    layerId: "defense-electronics",
    description: "전술 무전기·재머·전자전 시스템 — L3Harris 종합",
    phase: "Maturing Main Street",
    phaseRationale:
      "우크라전이 전자전 가치 재발견. 점진 capex 사이클. L3Harris 종합 leader.",
    participants: [
      {
        firmId: "lhx",
        role: "King",
        revenueWeight: 0.85,
        rationale: "L3Harris — 미군 전술 통신·전자전 종합 표준.",
      },
    ],
  },
  {
    id: "sensor-imaging-defense",
    name: "Defense Sensor & Imaging",
    nameKo: "방산 센서·이미징",
    ecosystemId: "defense",
    layerId: "defense-electronics",
    description: "EO/IR 센서·열화상·정찰 카메라 — Teledyne 강자",
    phase: "Maturing Main Street",
    phaseRationale:
      "방산·우주·산업 센서 수요 안정. AI/자율 무기에 센서 비중 증가.",
    participants: [
      {
        firmId: "tdy",
        role: "King",
        revenueWeight: 0.85,
        rationale: "Teledyne — EO/IR 센서·이미징 종합 강자.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense > nextgen-autonomy
  // ═══════════════════════════════════════════════════════════════
  {
    id: "autonomous-target-drone",
    name: "Autonomous Target & Tactical Drone",
    nameKo: "자율 표적기·전술 드론",
    ecosystemId: "defense",
    layerId: "nextgen-autonomy",
    description: "Kratos Valkyrie·표적기·자율 드론 — CCA(Collaborative Combat Aircraft)",
    phase: "Tornado",
    phaseRationale:
      "미 공군 CCA 사업 + 무인기 수요 폭발. Kratos가 저비용 자율 무기에서 신생 강자.",
    participants: [
      {
        firmId: "ktos",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "Kratos — Valkyrie·표적기 자율 무기 leader, CCA 입찰.",
      },
    ],
  },
  {
    id: "battle-management-ai",
    name: "Battle Management AI",
    nameKo: "전장 관리 AI",
    ecosystemId: "defense",
    layerId: "nextgen-autonomy",
    description: "지휘·통제 AI 운영체제 — Palantir AIP/Maven Smart System",
    phase: "Tornado",
    phaseRationale:
      "미 국방부 Maven Smart System(Palantir 단독), 우크라전·이스라엘 적용 사례. 차세대 자율 의사결정 OS 토네이도.",
    participants: [
      {
        firmId: "pltr",
        role: "Gorilla",
        revenueWeight: 0.40,
        rationale: "Palantir — Maven Smart System 단독 공급, 미 국방부 표준화.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Defense > defense-materials
  // ═══════════════════════════════════════════════════════════════
  {
    id: "high-temp-aerospace-alloys",
    name: "High-Temp Aerospace Alloys",
    nameKo: "고온 항공 합금",
    ecosystemId: "defense",
    layerId: "defense-materials",
    description: "Ni 기 고온 합금·티타늄 — 제트 엔진·미사일 핵심 소재",
    phase: "Maturing Main Street",
    phaseRationale:
      "민항·방산 엔진 수요 안정. 차세대 엔진(GE9X·LEAP) 소재 lock-in.",
    participants: [
      {
        firmId: "crs",
        role: "King",
        revenueWeight: 0.85,
        rationale: "Carpenter Technology — 항공·방산 specialty alloys 강자.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > nuclear-fuel
  // ═══════════════════════════════════════════════════════════════
  {
    id: "uranium-mining-conversion",
    name: "Uranium Mining & Conversion",
    nameKo: "우라늄 채굴·전환",
    ecosystemId: "energy-transition",
    layerId: "nuclear-fuel",
    description: "U3O8 채굴·UF6 전환 — 원자력 부활의 upstream",
    phase: "Tornado",
    phaseRationale:
      "원전 신설·재가동 + SMR 수요로 우라늄 가격 다년 상승 사이클. 미 정부 전략 비축 정책으로 미 본토 채굴사 직접 수혜.",
    participants: [
      {
        firmId: "uec",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Uranium Energy Corp — 미 본토 ISR 채굴·전략 비축 핵심 공급자.",
      },
      {
        firmId: "uuuu",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "Energy Fuels — 미 본토 우라늄 + 희토류 다각화.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > nuclear-reactor
  // ═══════════════════════════════════════════════════════════════
  {
    id: "smr-reactor",
    name: "Small Modular Reactor (SMR)",
    nameKo: "소형 모듈 원자로 (SMR)",
    ecosystemId: "energy-transition",
    layerId: "nuclear-reactor",
    description: "차세대 SMR — AI DC 전력 수요와 결합",
    phase: "Bowling Alley",
    phaseRationale:
      "Microsoft·Amazon·Google이 SMR PPA 체결로 시장 형성. NRC 인허가 진행 중, 2030년 전후 상업 가동 예정.",
    participants: [
      {
        firmId: "bwxt",
        role: "King",
        revenueWeight: 0.30,
        rationale: "BWX Technologies — SMR 원자로 압력용기·핵연료 핵심 공급자.",
      },
    ],
  },
  {
    id: "naval-civil-reactor-components",
    name: "Naval & Civil Reactor Components",
    nameKo: "해군·민간 원자로 부품",
    ecosystemId: "energy-transition",
    layerId: "nuclear-reactor",
    description: "미 해군 잠수함·항모 원자로 + 민간 원전 부품",
    phase: "Maturing Main Street",
    phaseRationale:
      "미 해군 잠수함·항모 신조·정비 안정 사이클 + 민간 원전 재가동·수명 연장 수요.",
    participants: [
      {
        firmId: "bwxt",
        role: "Gorilla",
        revenueWeight: 0.55,
        rationale: "BWX — 미 해군 원자로 단독 공급(50년+).",
      },
      {
        firmId: "cw",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "Curtiss-Wright — 해군·민간 원전 부품, 항공과 dual segment.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > renewables
  // ═══════════════════════════════════════════════════════════════
  {
    id: "utility-scale-renewables",
    name: "Utility-Scale Solar & Wind",
    nameKo: "유틸리티급 태양·풍력",
    ecosystemId: "energy-transition",
    layerId: "renewables",
    description: "대형 태양·풍력 발전 utility — 미 IRA 보조금 수혜",
    phase: "Maturing Main Street",
    phaseRationale:
      "IRA 보조금으로 안정 capex 사이클. 그러나 트럼프 정책 방향에 의한 정책 risk.",
    participants: [
      {
        firmId: "nee",
        role: "Gorilla",
        revenueWeight: 0.70,
        rationale: "NextEra Energy — 미 최대 재생에너지 utility, 태양·풍력 종합.",
      },
    ],
  },
  {
    id: "hydrogen-fuel-cell",
    name: "Hydrogen & Fuel Cell",
    nameKo: "수소·연료전지",
    ecosystemId: "energy-transition",
    layerId: "renewables",
    description: "고체산화물 연료전지(SOFC) — DC 전력·산업용 분산형 발전",
    phase: "Bowling Alley",
    phaseRationale:
      "수소 자체는 토네이도 미진입이나 연료전지의 데이터센터·산업 분산 발전 수요 점진. Bloom Energy가 niche leader.",
    participants: [
      {
        firmId: "be",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Bloom Energy — SOFC 연료전지 leader, 데이터센터 backup·prime power.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > grid-infrastructure
  // ═══════════════════════════════════════════════════════════════
  {
    id: "power-transmission-grid",
    name: "Power Transmission Grid",
    nameKo: "송전망",
    ecosystemId: "energy-transition",
    layerId: "grid-infrastructure",
    description: "변압기·송전선·HVDC 등 송전망 capex — AI DC 수요 폭발",
    phase: "Tornado",
    phaseRationale:
      "AI 데이터센터 전력 수요 + 재생에너지 연결로 송전망 capex 폭증. 변압기 lead time 다년화.",
    participants: [
      {
        firmId: "gev",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "GE Vernova — 변압기·송전 솔루션 글로벌 leader, AI DC 직접 수혜.",
      },
      {
        firmId: "pwr",
        role: "King",
        revenueWeight: 0.50,
        rationale: "Quanta Services — 송전망 EPC 미 1위, backlog 사상 최대.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > critical-materials
  // ═══════════════════════════════════════════════════════════════
  {
    id: "lithium-extraction-refining",
    name: "Lithium Extraction & Refining",
    nameKo: "리튬 채굴·정제",
    ecosystemId: "energy-transition",
    layerId: "critical-materials",
    description: "EV 배터리 리튬 — 가격 사이클 큰 변동성",
    phase: "Bowling Alley",
    phaseRationale:
      "EV 토네이도 둔화로 2024 리튬 가격 폭락 후 바닥 다지기. 장기 EV·ESS 수요로 회복 가능성.",
    participants: [
      {
        firmId: "alb",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Albemarle — 글로벌 리튬 정제 1위, 가격 사이클 직격탄.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Energy Transition > oil-gas
  // ═══════════════════════════════════════════════════════════════
  {
    id: "integrated-oil-major",
    name: "Integrated Oil Major",
    nameKo: "통합 석유 메이저",
    ecosystemId: "energy-transition",
    layerId: "oil-gas",
    description: "ExxonMobil·Chevron — upstream+downstream 통합, 캐시카우",
    phase: "Maturing Main Street",
    phaseRationale:
      "고배당·자사주 매입 캐시카우 모드. 자본배분의 일부가 LNG·바이오 연료·CCUS로 전환.",
    participants: [
      {
        firmId: "xom",
        role: "Gorilla",
        revenueWeight: 0.85,
        rationale: "ExxonMobil — 통합 메이저 #1, Permian + Guyana 핵심 자산.",
      },
      {
        firmId: "cvx",
        role: "Prince",
        revenueWeight: 0.85,
        rationale: "Chevron — 통합 메이저 #2, Permian + Hess 인수 추진.",
      },
    ],
  },
  {
    id: "shale-e-and-p",
    name: "Shale E&P",
    nameKo: "셰일 E&P",
    ecosystemId: "energy-transition",
    layerId: "oil-gas",
    description: "Permian 등 셰일 시추·생산 — 자본 효율 위주",
    phase: "Maturing Main Street",
    phaseRationale:
      "성장보다 캐시플로 위주, M&A 통합 사이클(Diamondback + Endeavor 등).",
    participants: [
      {
        firmId: "fang",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Diamondback Energy — Permian 셰일 강자, Endeavor 인수.",
      },
    ],
  },
  {
    id: "oilfield-services",
    name: "Oilfield Services & LNG Equipment",
    nameKo: "유전 서비스·LNG 장비",
    ecosystemId: "energy-transition",
    layerId: "oil-gas",
    description: "시추 서비스·LNG 액화 장비 — Baker Hughes 종합",
    phase: "Maturing Main Street",
    phaseRationale:
      "유가 회복 + LNG 신증설 capex 사이클. SLB·Halliburton과 oligopoly.",
    participants: [
      {
        firmId: "bkr",
        role: "Prince",
        revenueWeight: 0.80,
        rationale: "Baker Hughes — 유전 서비스 + LNG 액화 장비 dual segment.",
      },
    ],
  },
  {
    id: "refining-marketing",
    name: "Refining & Marketing",
    nameKo: "정유·마케팅",
    ecosystemId: "energy-transition",
    layerId: "oil-gas",
    description: "원유 정제·소매 — crack spread 사이클",
    phase: "Maturing Main Street",
    phaseRationale:
      "정유 마진(crack spread) 변동성 큼. Valero가 미 독립 정유 1위.",
    participants: [
      {
        firmId: "vlo",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Valero — 미 독립 정유 #1, 마진 사이클 직접 노출.",
      },
    ],
  },
  {
    id: "tanker-shipping",
    name: "Crude Tanker Shipping",
    nameKo: "원유 탱커 운송",
    ecosystemId: "energy-transition",
    layerId: "oil-gas",
    description: "VLCC·Suezmax 원유 운송 — 톤마일 수요·운임 사이클",
    phase: "Maturing Main Street",
    phaseRationale:
      "러시아 제재로 인한 ton-mile 증가 + 노후 선박 폐선으로 운임 회복. 사이클 카테고리.",
    participants: [
      {
        firmId: "insw",
        role: "Prince",
        revenueWeight: 0.95,
        rationale: "International Seaways — Suezmax·VLCC 운영, 운임 사이클 노출.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Crypto
  // ═══════════════════════════════════════════════════════════════
  {
    id: "us-retail-crypto-exchange",
    name: "US Retail Crypto Exchange",
    nameKo: "미국 리테일 암호화폐 거래소",
    ecosystemId: "crypto",
    layerId: "exchange-broker",
    description: "리테일 매매·수탁·스테이킹 — Coinbase 미 1위",
    phase: "Maturing Main Street",
    phaseRationale:
      "BTC ETF 통과 후 제도권 진입, Coinbase가 ETF 수탁사로 fee 매출 확대. 그러나 수수료 압박과 규제 risk.",
    participants: [
      {
        firmId: "coin",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Coinbase — 미 리테일 거래소 #1, BTC ETF 수탁사.",
      },
    ],
  },
  {
    id: "btc-corporate-treasury",
    name: "BTC Corporate Treasury",
    nameKo: "BTC 기업 트레저리 전략",
    ecosystemId: "crypto",
    layerId: "treasury",
    description: "기업 재무에 BTC를 핵심 자산으로 보유 — MSTR 단독 카테고리",
    phase: "Bowling Alley",
    phaseRationale:
      "MicroStrategy(Strategy)가 단독 카테고리 정의·표준 형성. 일부 기업 모방 시도 — niche but growing.",
    participants: [
      {
        firmId: "mstr",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "Strategy(MSTR) — BTC 기업 트레저리 전략 카테고리 사실상 표준.",
      },
    ],
  },
  {
    id: "usd-stablecoin-issuer",
    name: "USD Stablecoin Issuer",
    nameKo: "USD 스테이블코인 발행사",
    ecosystemId: "crypto",
    layerId: "stablecoin",
    description: "USDC 등 USD 페그 스테이블코인 — 결제·정산 인프라",
    phase: "Tornado",
    phaseRationale:
      "GENIUS 법안 통과로 미 스테이블코인 제도권 진입. Tether·USDC 양강 구도, Circle이 규제 친화 이점.",
    participants: [
      {
        firmId: "crcl",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Circle — USDC 발행, 미 규제 친화 + 미 IPO 후 제도권 토네이도.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Biotech & Pharma > big-pharma
  // ═══════════════════════════════════════════════════════════════
  {
    id: "glp-1-obesity-diabetes",
    name: "GLP-1 (Obesity & Diabetes)",
    nameKo: "GLP-1 (비만·당뇨)",
    ecosystemId: "biotech",
    layerId: "big-pharma",
    description: "Mounjaro·Ozempic·Wegovy — 21세기 최대 블록버스터",
    phase: "Tornado",
    phaseRationale:
      "비만·당뇨·심혈관 적응증 확대로 매출 폭발. Lilly·Novo Nordisk 양강, 다른 빅파마 진입은 늦음.",
    participants: [
      {
        firmId: "lly",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "Eli Lilly — Mounjaro/Zepbound 단독, 글로벌 GLP-1 leader.",
      },
    ],
  },
  {
    id: "oncology-immunology",
    name: "Oncology & Immunology",
    nameKo: "항암·면역학",
    ecosystemId: "biotech",
    layerId: "big-pharma",
    description: "Keytruda·Stelara 등 면역항암제 — 안정 캐시카우",
    phase: "Maturing Main Street",
    phaseRationale:
      "Keytruda(Merck) 2028 특허 만료 + Stelara(JNJ) 2024 만료로 빅파마 R&D·M&A 사이클. ADC·이중특이항체 등 차세대 토네이도 후보.",
    participants: [
      {
        firmId: "mrk",
        role: "Gorilla",
        revenueWeight: 0.50,
        rationale: "Merck — Keytruda 글로벌 #1 항암제, ADC 파이프라인 보강.",
      },
      {
        firmId: "jnj",
        role: "Prince",
        revenueWeight: 0.30,
        rationale: "JNJ — Stelara·Darzalex 등 면역·혈액암 다각화.",
      },
    ],
  },
  {
    id: "vaccines-rare-disease",
    name: "Vaccines & Rare Disease",
    nameKo: "백신·희귀질환",
    ecosystemId: "biotech",
    layerId: "big-pharma",
    description: "백신·희귀질환 — 안정 캐시카우",
    phase: "Maturing Main Street",
    phaseRationale:
      "코로나 후 일반 백신 수요 정상화, RSV 등 신규 백신 토네이도 후 정착.",
    participants: [
      {
        firmId: "mrk",
        role: "King",
        revenueWeight: 0.20,
        rationale: "Merck — Gardasil(HPV) 글로벌 #1 + 폐렴구균.",
      },
      {
        firmId: "jnj",
        role: "Prince",
        revenueWeight: 0.15,
        rationale: "JNJ — RSV 백신·희귀질환 파이프라인.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Biotech > healthcare-services
  // ═══════════════════════════════════════════════════════════════
  {
    id: "us-managed-care",
    name: "US Managed Care",
    nameKo: "미 의료보험 관리",
    ecosystemId: "biotech",
    layerId: "healthcare-services",
    description: "Medicare Advantage·약제급여(PBM) — UNH 종합 leader",
    phase: "Maturing Main Street",
    phaseRationale:
      "Medicare Advantage 안정 성장이지만 PBM 정치 risk. UNH 종합이지만 사업 분리 압박.",
    participants: [
      {
        firmId: "unh",
        role: "Gorilla",
        revenueWeight: 0.95,
        rationale: "UnitedHealth — 의료보험 + PBM(OptumRx) + 진료(Optum) 통합 1위.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Auto-EV-Battery > oem
  // ═══════════════════════════════════════════════════════════════
  {
    id: "us-ev-pure-play",
    name: "US EV Pure-Play OEM",
    nameKo: "미 EV 순수 OEM",
    ecosystemId: "auto-ev-battery",
    layerId: "oem",
    description: "Tesla — 미 EV 토네이도 졸업 후 자율주행·로봇으로 재포지셔닝",
    phase: "Maturing Main Street",
    phaseRationale:
      "EV 자체는 메인스트리트 진입, 가격 인하 사이클. FSD/Robotaxi/Optimus가 차세대 토네이도 후보.",
    participants: [
      {
        firmId: "tsla",
        role: "King",
        revenueWeight: 0.85,
        rationale: "Tesla — 미 EV 점유 1위, FSD/Optimus로 신규 카테고리 시도.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // Space Economy
  // ═══════════════════════════════════════════════════════════════
  {
    id: "small-medium-launch",
    name: "Small/Medium Launch Vehicle",
    nameKo: "소형·중형 발사체",
    ecosystemId: "space",
    layerId: "launch",
    description: "Electron·Neutron — 위성 군집 시대의 enabling launch",
    phase: "Tornado",
    phaseRationale:
      "위성 군집·정부 정찰 위성 발주 폭발. SpaceX는 비상장. RKLB의 Electron이 소형, Neutron이 중형 진입.",
    participants: [
      {
        firmId: "rklb",
        role: "King",
        revenueWeight: 0.55,
        rationale: "Rocket Lab — Electron 소형 발사 글로벌 #2(SpaceX 다음), Neutron 진입.",
      },
    ],
  },
  {
    id: "satellite-direct-to-cell",
    name: "Satellite Direct-to-Cell",
    nameKo: "위성-스마트폰 직통신",
    ecosystemId: "space",
    layerId: "satellite-comms",
    description: "기존 스마트폰을 위성에 직접 연결 — 통신 카테고리 재정의",
    phase: "Tornado",
    phaseRationale:
      "AT&T·Verizon·라쿠텐 모바일 등 통신사 협력 확정. 위성-셀룰러 통합 신 카테고리 토네이도.",
    participants: [
      {
        firmId: "asts",
        role: "King",
        revenueWeight: 0.95,
        rationale: "AST SpaceMobile — 위성-스마트폰 직통신 카테고리 선구자, AT&T·Verizon 협력.",
      },
    ],
  },
  {
    id: "satellite-broadband-tv",
    name: "Satellite Broadband & TV",
    nameKo: "위성 광대역·TV",
    ecosystemId: "space",
    layerId: "satellite-comms",
    description: "위성 인터넷·TV — Starlink에 점유 잠식 중인 legacy 카테고리",
    phase: "Declining Main Street",
    phaseRationale:
      "Starlink가 소비자 광대역 점유 잠식, EchoStar 등 legacy 사업자는 declining. EchoStar는 5G 스펙트럼 자산 매각으로 변화.",
    participants: [
      {
        firmId: "sats",
        role: "Niche",
        revenueWeight: 0.85,
        rationale: "EchoStar — 위성 TV/광대역 legacy, 스펙트럼 자산 가치가 핵심.",
      },
    ],
    successorCategoryId: "satellite-direct-to-cell",
  },
  {
    id: "earth-observation-imaging",
    name: "Earth Observation Imaging",
    nameKo: "지구 관측 영상",
    ecosystemId: "space",
    layerId: "earth-observation",
    description: "다일별·고해상 위성 영상 SaaS — 정부·농업·환경 수요",
    phase: "Bowling Alley",
    phaseRationale:
      "정부 정찰·국방 + 상업 농업·환경 모니터링 수요 점진. SaaS 모델로 전환 진행.",
    participants: [
      {
        firmId: "pl",
        role: "King",
        revenueWeight: 0.95,
        rationale: "Planet Labs — 다일별 지구 관측 영상 SaaS leader.",
      },
    ],
  },
];
