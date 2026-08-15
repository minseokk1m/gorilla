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
