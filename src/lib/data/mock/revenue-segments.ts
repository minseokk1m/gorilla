import type { RevenueSegment } from "@/types/firm";

/**
 * Revenue segment data by firm ID.
 * Sources: latest 10-K filings, earnings reports, analyst estimates.
 * Percentages approximate total revenue contribution.
 */
export const REVENUE_SEGMENTS: Record<string, RevenueSegment[]> = {
  // ── GORILLAS ──
  msft: [
    { name: "Intelligent Cloud (Azure)", revenuePercent: 43, description: "Azure 클라우드, 서버, 엔터프라이즈 서비스", competitors: ["amazon", "google"] },
    { name: "Productivity & Business (Office 365)", revenuePercent: 33, description: "Office 365, LinkedIn, Dynamics 365", competitors: ["google", "salesforce"] },
    { name: "Personal Computing", revenuePercent: 24, description: "Windows, Xbox, Surface, 검색 광고(Bing)", competitors: ["apple", "google"] },
  ],
  nvda: [
    { name: "Data Center", revenuePercent: 78, description: "AI/ML GPU (H100, B200), 네트워킹(InfiniBand), CUDA", competitors: ["amd", "intel"] },
    { name: "Gaming", revenuePercent: 10, description: "GeForce GPU, 게이밍 플랫폼", competitors: ["amd", "intel"] },
    { name: "Professional Visualization", revenuePercent: 5, description: "Quadro/RTX 워크스테이션 GPU, Omniverse", competitors: ["amd"] },
    { name: "Automotive", revenuePercent: 4, description: "DRIVE 자율주행 플랫폼, 인포테인먼트", competitors: ["qualcomm", "intel"] },
    { name: "OEM & Others", revenuePercent: 3, description: "기타 OEM, 암호화폐 마이닝", competitors: [] },
  ],
  crm: [
    { name: "Sales Cloud", revenuePercent: 26, description: "CRM 핵심 — 영업 파이프라인, 리드 관리", competitors: ["hubspot", "oracle", "sap"] },
    { name: "Service Cloud", revenuePercent: 24, description: "고객 서비스, 콜센터, 필드 서비스", competitors: ["zendesk", "servicenow"] },
    { name: "Platform & Other (Slack, Tableau)", revenuePercent: 22, description: "Slack 협업, Tableau 분석, AppExchange", competitors: ["microsoft", "google"] },
    { name: "Marketing & Commerce Cloud", revenuePercent: 16, description: "마케팅 자동화, 이커머스", competitors: ["adobe", "hubspot"] },
    { name: "Data Cloud (MuleSoft)", revenuePercent: 12, description: "데이터 통합, API 관리, AI(Einstein)", competitors: ["informatica", "snowflake"] },
  ],
  now: [
    { name: "IT Workflows (ITSM)", revenuePercent: 45, description: "IT 서비스 관리, IT 운영 관리", competitors: ["ibm", "bmc"] },
    { name: "Employee Workflows", revenuePercent: 20, description: "HR 서비스 딜리버리, 직원 경험", competitors: ["workday", "sap"] },
    { name: "Customer Workflows", revenuePercent: 18, description: "고객 서비스 관리, 필드 서비스", competitors: ["salesforce", "zendesk"] },
    { name: "Creator Workflows", revenuePercent: 10, description: "로우코드 앱 개발, 통합 허브", competitors: ["microsoft"] },
    { name: "Security Operations", revenuePercent: 7, description: "보안 사고 대응, 취약점 관리", competitors: ["crowdstrike", "palo-alto"] },
  ],
  amzn: [
    { name: "Online Stores", revenuePercent: 40, description: "직접 이커머스 판매 (1P)", competitors: ["walmart", "shopify"] },
    { name: "AWS", revenuePercent: 17, description: "클라우드 인프라, AI/ML, 200+ 서비스", competitors: ["microsoft", "google"] },
    { name: "Third-Party Seller Services", revenuePercent: 24, description: "마켓플레이스 수수료, FBA 물류", competitors: ["shopify", "ebay"] },
    { name: "Advertising", revenuePercent: 8, description: "스폰서드 프로덕트, 디스플레이 광고", competitors: ["google", "meta"] },
    { name: "Subscriptions (Prime)", revenuePercent: 7, description: "Prime 멤버십, Prime Video", competitors: ["netflix", "walmart"] },
    { name: "Other", revenuePercent: 4, description: "Physical stores, 기타", competitors: [] },
  ],

  // ── POTENTIAL GORILLAS ──
  snow: [
    { name: "Compute Revenue", revenuePercent: 55, description: "데이터 웨어하우스 컴퓨팅 워크로드", competitors: ["databricks", "google"] },
    { name: "Storage Revenue", revenuePercent: 25, description: "데이터 레이크 스토리지", competitors: ["databricks", "amazon"] },
    { name: "Data Sharing & Marketplace", revenuePercent: 12, description: "Snowflake Marketplace, 데이터 공유", competitors: [] },
    { name: "Professional Services", revenuePercent: 8, description: "컨설팅, 교육, 구현 서비스", competitors: [] },
  ],
  ddog: [
    { name: "Infrastructure Monitoring", revenuePercent: 35, description: "클라우드 인프라 메트릭, 호스트 모니터링", competitors: ["newrelic", "dynatrace"] },
    { name: "APM & Tracing", revenuePercent: 25, description: "애플리케이션 성능 모니터링, 분산 추적", competitors: ["newrelic", "dynatrace", "elastic"] },
    { name: "Log Management", revenuePercent: 22, description: "로그 수집, 인덱싱, 분석", competitors: ["splunk", "elastic"] },
    { name: "Security & Other Products", revenuePercent: 18, description: "Cloud SIEM, CI Visibility, RUM, 합성 모니터링", competitors: ["crowdstrike", "palo-alto"] },
  ],
  crwd: [
    { name: "Endpoint Security (Falcon)", revenuePercent: 50, description: "EDR/XDR, 차세대 안티바이러스", competitors: ["sentinelone", "microsoft"] },
    { name: "Cloud Security", revenuePercent: 18, description: "CNAPP, 클라우드 워크로드 보호", competitors: ["palo-alto", "wiz"] },
    { name: "Identity Protection", revenuePercent: 12, description: "제로트러스트 ID 보호, AD 보안", competitors: ["microsoft", "okta"] },
    { name: "Log Management (LogScale)", revenuePercent: 10, description: "차세대 SIEM, 위협 사냥", competitors: ["splunk", "elastic"] },
    { name: "Managed Services (Falcon Complete)", revenuePercent: 10, description: "MDR, 인시던트 대응", competitors: [] },
  ],
  pltr: [
    { name: "Government (Gotham)", revenuePercent: 55, description: "국방·정보기관 데이터 통합, 작전 분석", competitors: [] },
    { name: "Commercial (Foundry)", revenuePercent: 35, description: "기업용 데이터 통합, 의사결정 플랫폼", competitors: ["snowflake", "databricks"] },
    { name: "AIP (AI Platform)", revenuePercent: 10, description: "LLM 통합 AI 운영 플랫폼", competitors: ["microsoft", "google"] },
  ],
  panw: [
    { name: "Network Security", revenuePercent: 38, description: "차세대 방화벽, SD-WAN, SASE", competitors: ["fortinet", "cisco"] },
    { name: "Cloud Security (Prisma Cloud)", revenuePercent: 28, description: "CNAPP, CSPM, 컨테이너 보안", competitors: ["crowdstrike", "wiz"] },
    { name: "Security Operations (Cortex)", revenuePercent: 22, description: "XDR, XSOAR, XSIAM", competitors: ["crowdstrike", "microsoft"] },
    { name: "Professional Services", revenuePercent: 12, description: "컨설팅, Unit 42 위협 인텔리전스", competitors: [] },
  ],

  // ── KINGS ──
  orcl: [
    { name: "Cloud Services (OCI)", revenuePercent: 37, description: "클라우드 인프라, SaaS(Fusion, NetSuite)", competitors: ["microsoft", "amazon", "sap"] },
    { name: "License Support", revenuePercent: 33, description: "온프레미스 DB/미들웨어 유지보수 수익", competitors: [] },
    { name: "Cloud License & On-Premise", revenuePercent: 18, description: "신규 라이선스 판매", competitors: ["microsoft", "sap"] },
    { name: "Hardware", revenuePercent: 6, description: "Exadata, 엔지니어드 시스템", competitors: [] },
    { name: "Services", revenuePercent: 6, description: "컨설팅, 교육", competitors: [] },
  ],
  adbe: [
    { name: "Digital Media (Creative Cloud)", revenuePercent: 56, description: "Photoshop, Illustrator, Premiere Pro", competitors: ["canva", "figma"] },
    { name: "Digital Experience", revenuePercent: 28, description: "AEM, Analytics, Campaign, Marketo", competitors: ["salesforce", "hubspot"] },
    { name: "Document Cloud (Acrobat)", revenuePercent: 14, description: "Acrobat, PDF, Sign", competitors: ["docusign", "microsoft"] },
    { name: "Publishing & Advertising", revenuePercent: 2, description: "레거시 퍼블리싱, 광고 클라우드", competitors: [] },
  ],
  csco: [
    { name: "Secure, Agile Networks", revenuePercent: 42, description: "스위칭, 라우팅, 무선 (Catalyst, Meraki)", competitors: ["arista", "juniper"] },
    { name: "Internet for the Future", revenuePercent: 15, description: "5G, 웹스케일, 실리콘 원", competitors: ["nokia", "ericsson"] },
    { name: "Security", revenuePercent: 13, description: "방화벽, SASE, SecureX", competitors: ["palo-alto", "fortinet"] },
    { name: "Collaboration", revenuePercent: 12, description: "Webex, 통합 커뮤니케이션", competitors: ["microsoft", "zoom"] },
    { name: "Observability", revenuePercent: 9, description: "AppDynamics, ThousandEyes", competitors: ["datadog", "dynatrace"] },
    { name: "Services", revenuePercent: 9, description: "기술 서비스, 고급 서비스", competitors: [] },
  ],
  intc: [
    { name: "Client Computing (CCG)", revenuePercent: 45, description: "PC용 CPU (Core, Core Ultra)", competitors: ["amd", "qualcomm"] },
    { name: "Data Center & AI (DCAI)", revenuePercent: 27, description: "서버 CPU (Xeon), AI 가속기(Gaudi)", competitors: ["amd", "nvidia"] },
    { name: "Network & Edge (NEX)", revenuePercent: 12, description: "네트워크 프로세서, 엣지 컴퓨팅", competitors: ["broadcom", "nvidia"] },
    { name: "Mobileye", revenuePercent: 8, description: "자율주행 ADAS 솔루션", competitors: ["nvidia", "qualcomm"] },
    { name: "Foundry Services (IFS)", revenuePercent: 5, description: "외부 파운드리 수탁 생산", competitors: ["tsmc", "samsung"] },
    { name: "Other (Altera)", revenuePercent: 3, description: "FPGA, 프로그래머블 칩", competitors: ["amd"] },
  ],

  // ── MEGA-CAPS ──
  googl: [
    { name: "Google Search & Other", revenuePercent: 57, description: "검색 광고, Google Maps, Google Play", competitors: ["microsoft"] },
    { name: "YouTube", revenuePercent: 10, description: "동영상 광고, YouTube Premium/TV", competitors: ["meta", "tiktok"] },
    { name: "Google Network", revenuePercent: 8, description: "AdSense, AdMob 등 제3자 광고", competitors: ["meta"] },
    { name: "Google Cloud (GCP)", revenuePercent: 13, description: "클라우드 인프라, Workspace, AI", competitors: ["amazon", "microsoft"] },
    { name: "Other Bets", revenuePercent: 1, description: "Waymo, Verily, Wing, DeepMind", competitors: [] },
    { name: "Subscriptions/Devices", revenuePercent: 11, description: "Pixel, Fitbit, Google One, Play 구독", competitors: ["apple", "samsung"] },
  ],
  meta: [
    { name: "Family of Apps — Advertising", revenuePercent: 92, description: "Facebook, Instagram, Messenger, WhatsApp 광고", competitors: ["google", "tiktok", "snapchat"] },
    { name: "Reality Labs", revenuePercent: 5, description: "Quest VR, Ray-Ban Meta, Horizon Worlds", competitors: ["apple", "sony"] },
    { name: "Other Revenue", revenuePercent: 3, description: "비즈니스 메시징, 결제 수수료", competitors: [] },
  ],
  aapl: [
    { name: "iPhone", revenuePercent: 46, description: "iPhone 하드웨어 판매", competitors: ["samsung", "google"] },
    { name: "Services", revenuePercent: 25, description: "App Store, iCloud, Apple Music, Apple TV+, AppleCare", competitors: ["google", "amazon", "spotify"] },
    { name: "Mac", revenuePercent: 10, description: "MacBook, iMac, Mac Pro", competitors: ["dell", "hp", "lenovo"] },
    { name: "iPad", revenuePercent: 7, description: "iPad, iPad Pro, iPad Air", competitors: ["samsung", "microsoft"] },
    { name: "Wearables & Accessories", revenuePercent: 12, description: "Apple Watch, AirPods, Vision Pro", competitors: ["samsung", "meta"] },
  ],
  tsla: [
    { name: "Automotive Sales", revenuePercent: 78, description: "Model 3/Y/S/X 차량 판매", competitors: ["byd", "volkswagen"] },
    { name: "Automotive Regulatory Credits", revenuePercent: 4, description: "탄소 크레딧 판매", competitors: [] },
    { name: "Energy Generation & Storage", revenuePercent: 10, description: "Megapack, Powerwall, 태양광", competitors: ["nextera", "enphase"] },
    { name: "Services & Other", revenuePercent: 5, description: "보험, 수리, 중고차, 슈퍼차저", competitors: [] },
    { name: "Automotive Leasing", revenuePercent: 3, description: "차량 리스", competitors: [] },
  ],
  avgo: [
    { name: "Semiconductor Solutions", revenuePercent: 50, description: "네트워킹 ASIC, 스토리지, 브로드밴드 칩", competitors: ["marvell", "intel"] },
    { name: "Infrastructure Software (VMware)", revenuePercent: 42, description: "가상화, 클라우드 관리 (VMware 인수)", competitors: ["microsoft", "redhat"] },
    { name: "Custom AI Accelerators", revenuePercent: 8, description: "Google TPU, Meta MTIA 등 커스텀 실리콘", competitors: ["nvidia", "marvell"] },
  ],
  asml: [
    { name: "EUV Lithography Systems", revenuePercent: 62, description: "최첨단 EUV 노광장비 (독점)", competitors: [] },
    { name: "DUV Lithography Systems", revenuePercent: 18, description: "기존 DUV 노광장비", competitors: ["nikon", "canon"] },
    { name: "Installed Base Management", revenuePercent: 20, description: "유지보수, 업그레이드, 부품", competitors: [] },
  ],
  tsm: [
    { name: "Advanced (≤7nm)", revenuePercent: 65, description: "최첨단 공정 (3nm, 5nm, 7nm) 수탁생산", competitors: ["samsung"] },
    { name: "Mature (>7nm)", revenuePercent: 28, description: "성숙 공정 (16nm~) 수탁생산", competitors: ["samsung", "globalfoundries", "smic"] },
    { name: "Advanced Packaging", revenuePercent: 7, description: "CoWoS, InFO 등 첨단 패키징", competitors: [] },
  ],
  amd: [
    { name: "Data Center", revenuePercent: 40, description: "EPYC 서버 CPU, Instinct AI GPU, DPU", competitors: ["intel", "nvidia"] },
    { name: "Client", revenuePercent: 25, description: "Ryzen 데스크톱/노트북 CPU", competitors: ["intel", "qualcomm"] },
    { name: "Gaming", revenuePercent: 15, description: "Radeon GPU, 콘솔 SoC (PS5, Xbox)", competitors: ["nvidia", "intel"] },
    { name: "Embedded", revenuePercent: 20, description: "Xilinx FPGA, 적응형 SoC", competitors: ["intel", "lattice"] },
  ],
  nflx: [
    { name: "Subscription (UCAN)", revenuePercent: 44, description: "미국·캐나다 구독 매출", competitors: ["disney", "apple", "amazon"] },
    { name: "Subscription (EMEA)", revenuePercent: 28, description: "유럽·중동·아프리카 구독", competitors: ["disney", "amazon"] },
    { name: "Subscription (APAC)", revenuePercent: 15, description: "아시아태평양 구독", competitors: ["disney", "amazon"] },
    { name: "Subscription (LATAM)", revenuePercent: 8, description: "라틴아메리카 구독", competitors: [] },
    { name: "Advertising", revenuePercent: 5, description: "광고 지원 요금제 매출", competitors: ["youtube", "disney"] },
  ],

  // ── DEFENSE ──
  lmt: [
    { name: "Aeronautics", revenuePercent: 40, description: "F-35, F-16, C-130, 차세대 전투기", competitors: ["northrop-grumman", "boeing"] },
    { name: "Rotary & Mission Systems", revenuePercent: 23, description: "헬기 (Black Hawk), 레이더, C4ISR", competitors: ["rtx", "ge"] },
    { name: "Missiles & Fire Control", revenuePercent: 19, description: "HIMARS, PAC-3, 레이저 무기", competitors: ["rtx", "northrop-grumman"] },
    { name: "Space", revenuePercent: 18, description: "Orion, GPS III, 우주 정찰 위성", competitors: ["northrop-grumman", "boeing"] },
  ],
  rtx: [
    { name: "Collins Aerospace", revenuePercent: 37, description: "항공전자, 기계 시스템, 인테리어", competitors: ["honeywell", "ge"] },
    { name: "Pratt & Whitney", revenuePercent: 30, description: "항공 엔진 (GTF, F135)", competitors: ["ge"] },
    { name: "Raytheon", revenuePercent: 33, description: "미사일, 방공 (Patriot, SM-6), 센서", competitors: ["lockheed-martin", "northrop-grumman"] },
  ],

  // ── FINANCE / PAYMENT ──
  v: [
    { name: "Service Revenue", revenuePercent: 40, description: "결제 처리량 기반 수수료", competitors: ["mastercard"] },
    { name: "Data Processing Revenue", revenuePercent: 35, description: "트랜잭션 처리 수수료", competitors: ["mastercard"] },
    { name: "International Transaction Revenue", revenuePercent: 20, description: "해외 거래 수수료", competitors: ["mastercard"] },
    { name: "Other Revenue", revenuePercent: 5, description: "부가 서비스, 컨설팅", competitors: [] },
  ],
  jpm: [
    { name: "Consumer & Community Banking", revenuePercent: 40, description: "소비자 뱅킹, 모기지, 카드, 자동차 금융", competitors: ["bofa", "wells-fargo"] },
    { name: "Corporate & Investment Bank", revenuePercent: 35, description: "IB, Markets, 증권 서비스", competitors: ["goldman", "morgan-stanley"] },
    { name: "Commercial Banking", revenuePercent: 10, description: "중소기업·중견기업 대출, 자문", competitors: ["bofa", "citi"] },
    { name: "Asset & Wealth Management", revenuePercent: 15, description: "자산 관리, 프라이빗 뱅킹", competitors: ["morgan-stanley", "goldman"] },
  ],

  // ── HEALTHCARE ──
  lly: [
    { name: "GLP-1 (Mounjaro/Zepbound)", revenuePercent: 40, description: "GLP-1 수용체 작용제 — 당뇨·비만 치료", competitors: ["novo-nordisk"] },
    { name: "Oncology (Verzenio)", revenuePercent: 15, description: "유방암 등 항암제", competitors: ["pfizer", "roche"] },
    { name: "Immunology", revenuePercent: 12, description: "면역학 파이프라인", competitors: ["abbvie", "jnj"] },
    { name: "Neuroscience", revenuePercent: 10, description: "알츠하이머 (Donanemab), 편두통", competitors: ["biogen", "roche"] },
    { name: "Diabetes (Trulicity/Humalog)", revenuePercent: 18, description: "기존 당뇨 포트폴리오", competitors: ["novo-nordisk", "sanofi"] },
    { name: "Other", revenuePercent: 5, description: "기타 파이프라인", competitors: [] },
  ],
  unh: [
    { name: "UnitedHealthcare", revenuePercent: 60, description: "의료 보험 (고용주, 개인, 메디케어)", competitors: ["elevance", "cigna"] },
    { name: "Optum Health", revenuePercent: 15, description: "의료 서비스, 외래 진료", competitors: ["cvs", "humana"] },
    { name: "Optum Rx", revenuePercent: 15, description: "약제비 관리(PBM), 약국", competitors: ["cvs-caremark", "cigna-express-scripts"] },
    { name: "Optum Insight", revenuePercent: 10, description: "헬스케어 IT, 데이터 분석", competitors: ["oracle-cerner", "epic"] },
  ],

  // ── ENERGY ──
  xom: [
    { name: "Upstream", revenuePercent: 55, description: "석유·가스 탐사·생산", competitors: ["chevron", "shell"] },
    { name: "Downstream (Refining)", revenuePercent: 30, description: "정제, 마케팅, 유통", competitors: ["chevron", "valero"] },
    { name: "Chemical", revenuePercent: 12, description: "석유화학, 특수화학", competitors: ["dow", "basf"] },
    { name: "Low Carbon", revenuePercent: 3, description: "CCS, 수소, 바이오연료", competitors: [] },
  ],

  // ── CONSUMER ──
  cost: [
    { name: "Merchandise Sales", revenuePercent: 86, description: "식품, 전자제품, 생활용품 도매", competitors: ["walmart", "target"] },
    { name: "Membership Fees", revenuePercent: 2, description: "연회비 (Gold Star, Executive)", competitors: ["walmart-sams"] },
    { name: "E-Commerce", revenuePercent: 8, description: "온라인 판매, 배달", competitors: ["amazon", "walmart"] },
    { name: "Gasoline & Other", revenuePercent: 4, description: "주유소, 약국, 옵티컬", competitors: [] },
  ],

  // ── SPACE / ROCKETRY ──
  rklb: [
    { name: "Launch Services", revenuePercent: 55, description: "Electron/Neutron 로켓 발사 서비스", competitors: ["spacex"] },
    { name: "Space Systems", revenuePercent: 40, description: "위성 제작, 컴포넌트, 반응 휠", competitors: ["northrop-grumman", "boeing"] },
    { name: "Other", revenuePercent: 5, description: "소프트웨어, 지상국", competitors: [] },
  ],

  // ── OTHERS ──
  wday: [
    { name: "HCM (Human Capital Management)", revenuePercent: 50, description: "HR, 급여, 인재 관리", competitors: ["sap", "oracle"] },
    { name: "Financial Management", revenuePercent: 35, description: "ERP, 회계, 기획·분석", competitors: ["oracle", "sap"] },
    { name: "Professional Services", revenuePercent: 15, description: "구현, 교육, 컨설팅", competitors: [] },
  ],
  coin: [
    { name: "Transaction Revenue", revenuePercent: 50, description: "매매 수수료 (리테일 + 기관)", competitors: ["binance", "kraken"] },
    { name: "Blockchain Rewards (Staking)", revenuePercent: 20, description: "스테이킹 수익, 검증자 보상", competitors: ["lido", "kraken"] },
    { name: "Custodial Fees", revenuePercent: 12, description: "기관 수탁 보관 수수료", competitors: ["bitgo", "fireblocks"] },
    { name: "Subscription & Services", revenuePercent: 13, description: "Coinbase One, Base L2, 데이터", competitors: [] },
    { name: "Interest & Other", revenuePercent: 5, description: "USDC 이자, 기타", competitors: [] },
  ],

  // ── KOREAN FIRMS ──

  sec: [
    { name: "반도체 (DS)", revenuePercent: 32, description: "DRAM, NAND, 파운드리, 시스템LSI", competitors: ["sk-hynix", "micron", "tsmc"] },
    { name: "MX (모바일)", revenuePercent: 30, description: "갤럭시 스마트폰, 태블릿, 웨어러블", competitors: ["apple"] },
    { name: "VD (영상디스플레이)", revenuePercent: 15, description: "TV, 모니터, 디지털 사이니지", competitors: ["lg-electronics", "sony"] },
    { name: "SDC (디스플레이)", revenuePercent: 12, description: "OLED 패널 (스마트폰·TV용)", competitors: ["lg-display", "boe"] },
    { name: "Harman", revenuePercent: 6, description: "차량용 인포테인먼트, JBL 오디오", competitors: [] },
    { name: "가전 (DA)", revenuePercent: 5, description: "냉장고, 세탁기, 에어컨", competitors: ["lg-electronics", "whirlpool"] },
  ],
  skhynix: [
    { name: "DRAM", revenuePercent: 68, description: "서버/모바일/PC용 DRAM, HBM 포함", competitors: ["samsung-electronics", "micron"] },
    { name: "NAND (Solidigm)", revenuePercent: 25, description: "SSD, eMMC, UFS (Solidigm 인수분 포함)", competitors: ["samsung-electronics", "micron", "western-digital"] },
    { name: "System IC & Others", revenuePercent: 7, description: "CIS, DDI 등 비메모리", competitors: [] },
  ],

  hhih: [
    { name: "조선 (HD현대중공업)", revenuePercent: 45, description: "LNG선, 컨테이너선, VLCC, 벌크선", competitors: ["hanwha-ocean", "samsung-heavy"] },
    { name: "엔진기계 (HD현대인프라코어)", revenuePercent: 18, description: "선박용 엔진, 건설기계, 발전설비", competitors: [] },
    { name: "해양플랜트", revenuePercent: 12, description: "FPSO, 해양구조물", competitors: ["samsung-heavy"] },
    { name: "전기전자 (HD현대일렉트릭)", revenuePercent: 15, description: "변압기, 배전반, 전력 인프라", competitors: [] },
    { name: "중·소형 조선 (현대미포)", revenuePercent: 10, description: "석유화학 운반선, 중소형 컨테이너선", competitors: [] },
  ],
  hho: [
    { name: "상선 (LNG·컨테이너)", revenuePercent: 50, description: "LNG 운반선, 컨테이너선 건조", competitors: ["hd-korea-shipbuilding", "samsung-heavy"] },
    { name: "해군 함정", revenuePercent: 25, description: "잠수함, 구축함, 호위함", competitors: [] },
    { name: "해양플랜트", revenuePercent: 15, description: "FPSO, 해양 구조물", competitors: ["samsung-heavy"] },
    { name: "특수선", revenuePercent: 10, description: "쇄빙선, 해양경찰선, 수출 함정", competitors: [] },
  ],
  shi: [
    { name: "LNG 운반선", revenuePercent: 50, description: "LNG 운반선 건조 (핵심 선종)", competitors: ["hd-korea-shipbuilding", "hanwha-ocean"] },
    { name: "해양플랜트 (FLNG/FPSO)", revenuePercent: 25, description: "부유식 LNG 생산설비, FPSO", competitors: ["hd-korea-shipbuilding"] },
    { name: "컨테이너선·기타 상선", revenuePercent: 20, description: "대형 컨테이너선, 셔틀 탱커", competitors: ["hd-korea-shipbuilding"] },
    { name: "풍력·기타", revenuePercent: 5, description: "해상풍력 하부구조물", competitors: [] },
  ],

  hwa: [
    { name: "지상 방산 (K9 자주포 등)", revenuePercent: 40, description: "K9 자주포, 장갑차, 탄약", competitors: ["hyundai-rotem"] },
    { name: "항공엔진", revenuePercent: 25, description: "T-50 엔진, 민수 항공엔진 MRO", competitors: ["ge-aerospace", "rtx"] },
    { name: "해외 방산 수출", revenuePercent: 20, description: "폴란드·호주·사우디 등 수출 계약", competitors: [] },
    { name: "기타 (방산전자·우주)", revenuePercent: 15, description: "위성, UAM, 방산전자", competitors: ["lig-nex1"] },
  ],
  lig: [
    { name: "유도무기", revenuePercent: 50, description: "천궁(M-SAM), 해성, 현무 등 미사일", competitors: [] },
    { name: "감시·정찰 체계", revenuePercent: 20, description: "레이더, 전자전, 정밀타격 체계", competitors: ["hanwha-aerospace"] },
    { name: "해외 수출", revenuePercent: 18, description: "UAE·사우디 등 중동 유도무기 수출", competitors: [] },
    { name: "수중 무기·기타", revenuePercent: 12, description: "어뢰, 기뢰, 무인체계", competitors: [] },
  ],
  hrt: [
    { name: "방산 (K2 전차·K21)", revenuePercent: 45, description: "K2 흑표전차, K21 보병전투장갑차", competitors: ["hanwha-aerospace"] },
    { name: "철도 (KTX·도시철도)", revenuePercent: 35, description: "KTX, 전동차, 해외 철도차량 수출", competitors: [] },
    { name: "방산 수출 (폴란드 등)", revenuePercent: 15, description: "K2PL 전차 폴란드 수출", competitors: [] },
    { name: "플랜트", revenuePercent: 5, description: "발전설비, 환경설비", competitors: [] },
  ],

  hyundai: [
    { name: "완성차 (내연기관)", revenuePercent: 55, description: "승용차, SUV, 상용차 (내연기관)", competitors: ["kia", "toyota"] },
    { name: "전기차 (아이오닉·E-GMP)", revenuePercent: 15, description: "아이오닉 5/6, 제네시스 EV", competitors: ["tesla", "byd"] },
    { name: "제네시스", revenuePercent: 10, description: "프리미엄 브랜드 (G80, GV80 등)", competitors: ["bmw", "mercedes"] },
    { name: "금융 (현대캐피탈 등)", revenuePercent: 12, description: "자동차 금융, 리스, 보험", competitors: [] },
    { name: "수소·기타", revenuePercent: 8, description: "넥쏘 수소차, 로보틱스(보스턴 다이나믹스)", competitors: ["toyota"] },
  ],
  kia: [
    { name: "승용차·SUV", revenuePercent: 65, description: "셀토스, 스포티지, 쏘렌토, K시리즈", competitors: ["hyundai-motor", "toyota"] },
    { name: "전기차 (EV6·EV9)", revenuePercent: 18, description: "EV6, EV9, EV3 등 E-GMP 전기차", competitors: ["tesla", "byd"] },
    { name: "PBV (목적기반차량)", revenuePercent: 5, description: "전기 상용차, MaaS 플랫폼", competitors: [] },
    { name: "기타 (부품·금융)", revenuePercent: 12, description: "A/S 부품, 금융 서비스", competitors: [] },
  ],

  lges: [
    { name: "EV 배터리 (파우치)", revenuePercent: 45, description: "GM Ultium, 현대·포드 등 파우치형 셀", competitors: ["catl", "samsung-sdi"] },
    { name: "EV 배터리 (원통형)", revenuePercent: 30, description: "테슬라 등 원통형 4680/2170 셀", competitors: ["panasonic", "catl"] },
    { name: "ESS (에너지저장장치)", revenuePercent: 15, description: "유틸리티·상업용 ESS 배터리", competitors: ["catl", "byd"] },
    { name: "소형 배터리·기타", revenuePercent: 10, description: "전동공구, e-모빌리티, 소형전지", competitors: [] },
  ],

  naver: [
    { name: "서치플랫폼 (검색·광고)", revenuePercent: 35, description: "검색 광고, 디스플레이 광고, 스마트스토어 광고", competitors: ["kakao", "google"] },
    { name: "커머스", revenuePercent: 22, description: "네이버쇼핑, 스마트스토어, 네이버페이", competitors: ["coupang", "kakao"] },
    { name: "핀테크", revenuePercent: 13, description: "네이버페이, 네이버파이낸셜", competitors: ["kakao"] },
    { name: "콘텐츠 (웹툰·스노우)", revenuePercent: 15, description: "네이버웹툰, 스노우, V LIVE", competitors: [] },
    { name: "클라우드", revenuePercent: 8, description: "네이버클라우드 (NCP), HyperCLOVA AI", competitors: ["amazon", "microsoft"] },
    { name: "LINE·기타", revenuePercent: 7, description: "LINE 메신저 (일본), 글로벌 자회사", competitors: ["kakao"] },
  ],
  kakao: [
    { name: "플랫폼 (광고·커머스)", revenuePercent: 30, description: "카카오톡 비즈보드, 톡스토어, 선물하기", competitors: ["naver"] },
    { name: "콘텐츠 (카카오엔터)", revenuePercent: 25, description: "카카오페이지(웹소설/웹툰), 음악(멜론), IP", competitors: ["naver"] },
    { name: "모빌리티", revenuePercent: 12, description: "카카오T (택시·대리·주차)", competitors: [] },
    { name: "페이·금융", revenuePercent: 18, description: "카카오페이, 카카오뱅크, 카카오보험", competitors: ["naver"] },
    { name: "클라우드·AI·기타", revenuePercent: 15, description: "카카오클라우드, 카카오브레인, 기타 자회사", competitors: ["naver"] },
  ],

  sbiologics: [
    { name: "CMO (위탁생산)", revenuePercent: 65, description: "글로벌 빅파마 항체의약품 위탁생산", competitors: ["lonza", "wuxi-biologics"] },
    { name: "CDO (위탁개발)", revenuePercent: 20, description: "바이오의약품 공정 개발, 세포주 개발", competitors: ["lonza", "wuxi-biologics"] },
    { name: "바이오시밀러 (셀트리온 등)", revenuePercent: 10, description: "자체 바이오시밀러 파이프라인", competitors: ["celltrion"] },
    { name: "기타", revenuePercent: 5, description: "mRNA 등 신규 모달리티", competitors: [] },
  ],
  posco: [
    { name: "철강", revenuePercent: 60, description: "열연·냉연·스테인리스 철강재", competitors: ["nippon-steel", "baowu-steel"] },
    { name: "2차전지 소재 (포스코퓨처엠)", revenuePercent: 15, description: "양극재·음극재 등 배터리 소재", competitors: ["lg-chem", "umicore"] },
    { name: "건설·인프라 (포스코건설)", revenuePercent: 10, description: "건설, 플랜트, 인프라", competitors: [] },
    { name: "에너지 (포스코인터내셔널)", revenuePercent: 10, description: "LNG 트레이딩, 해외자원개발", competitors: [] },
    { name: "리튬·니켈 (신소재)", revenuePercent: 5, description: "아르헨티나 리튬, 니켈 습식제련", competitors: ["albemarle", "ganfeng"] },
  ],
};
