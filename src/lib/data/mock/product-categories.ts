import type { ProductCategory } from "@/types/product-category";

/**
 * Stage E-1a — AI > memory-storage layer의 4개 product category로 시작.
 * 다른 layer는 후속 단계에서 점진 확장.
 *
 * 핵심 메시지(유 회장님 비전):
 * - 같은 메모리 layer지만 HBM은 Tornado, DRAM은 Maturing, HDD는 Declining
 * - SK하이닉스는 HBM Gorilla지만 DRAM에서는 도전자급
 * - DRAM 쇠퇴 → DRAM-heavy firm sell, HBM 부상 → HBM 강자 매수
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
];
