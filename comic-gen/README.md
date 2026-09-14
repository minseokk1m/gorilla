# 고릴라 헌터스 — 작화 생성 파이프라인 (콘티 = 코드)

Ep2~10의 실질 콘티. 데스크탑 `~/Desktop/고릴라헌터스/고릴라헌터스_EPn/`에서 2026-08-15 리포로 백업함 (원본 작성 2026-06-18).

## 구조

- `gen_images.py` — 공용 엔진 + 시리즈 Bible. `STYLE`(그림체 앵커), `CHARS`(캐릭터 시트: 구본질·나배움·한탕수·조연), `RULES`(포맷·말풍선 규칙), OpenAI 이미지 API 호출부. 모델: `gpt-image-2` (env `IMG_MODEL`로 교체 가능)
- `gen_ep{2..10}.py` — 회차별 콘티. `PAGES`(페이지별 장면 프롬프트, 영문) + `DLG`(페이지별 한국어 대사·내레이션 전문, 말풍선 타입 지정) + 회차 한정 캐릭터(`CHARS` 추가분)
- `ep1-legacy/` — Ep1 초기 파이프라인(구버전): cfg_*.json 페이지 정의 + build/식자 스크립트. Ep2부터 gen_epN.py 방식으로 통합됨

## 실행 (원본 폴더 기준)

```bash
cd ~/Desktop/고릴라헌터스/고릴라헌터스_EPn
python3 gen_epN.py all    # 전체 페이지
python3 gen_epN.py p05    # 특정 페이지만 재생성
```

API 키는 각 폴더의 `openai_key.txt`(리포 미포함) 또는 `OPENAI_API_KEY`. 출력은 `final/pNN.png`, 이후 PDF로 묶어 `comic-episodes/`의 완성본이 됨.

## 수정 워크플로 (회장님 피드백 반영 사이클)

1. 피드백을 회차·페이지 단위로 매핑
2. 해당 `gen_epN.py`의 `PAGES`/`DLG` 항목 수정 (또는 `gen_images.py`의 STYLE/CHARS 수정)
3. 바뀐 페이지만 `python3 gen_epN.py pNN`으로 재생성 후 PDF 재조립


## 시즌 2 (Ep11-20) — 2026-09-14 작화 전권 완성 (v3)

기획: `season2-plan.md`(회차별 이론·사례·페이지 비트·해설·팩트 재확인 목록). 콘티: `gen_ep11.py` ~ `gen_ep20.py`(총 314p). 학습 지도 ③(Ep11-18)·④(Ep19-20).

- `ep_common.py` — 시즌 2 공용 엔진. 회차 파일은 `PAGES / DLG / BANDS / NOTES / STAGE / EXTRA_CHARS / SPEAKERS_EXTRA`만 정의하고 `run(globals())`로 실행. 룰(로고·묘비·따옴표 금지, 도식 라벨 가림 방지, 화자 지정)은 여기서 한 번만 고친다
- `precheck.py epN` — API 호출 전 콘티 검사(PAGES/DLG 키 일치, 화자 등록, 온점·em dash, NOTES/BANDS 키, 말풍선 밀도). **생성 전 반드시 오류 0 확인**
- `python3 gen_epN.py prompt` — API 호출 없이 전 페이지 프롬프트 출력(검토용)

작화 절차(시즌 3 이후 동일): ① `season2-plan.md` 부록 B의 시사 팩트를 웹으로 갱신(양자컴 주가·IonQ 실적, NVIDIA 점유율·AMD 계약, 테슬라 로보택시, Cerebras, TIME ETF 구성, 가트너 최신판) → 해당 NOTES 수정 ② `precheck.py` 전 회차 오류 0 ③ 1장 테스트 ④ 회차별 생성(2~3 병렬 스트림, `caffeinate -i`) → 전수 검수 → 결함 재생성 → `assemble.py epN` → 데스크탑 `고릴라헌터스_v3완성본/`(시즌 2 첫 판은 v3 번호 체계를 따름). 예상 비용 ≈ 314장 × $0.2 + 재생성 ≈ $70~80.

확정(2026-09-13): Ep13 양자컴 사례 OK · 회차당 30~33p OK · 실제 투자클럽은 언급하지 않고 필요성만 노출(Ep20 p33 예고 캡션으로 마무리). Ep10 말미 ④ 실전 맛보기(p28c·p28d 분기 점검표 첫 칸) 추가 완료(2026-09-13). 대사 톤: '발라먹다' 등 속어 사용 금지(민석님 지시), 개인 투자자 표기는 '개미' 대신 '개인 투자자'. 미확정: Ep13 RIDE 규칙의 보수성(회장님 성향 확인).
