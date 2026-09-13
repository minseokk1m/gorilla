#!/usr/bin/env python3
# 고릴라 헌터스 Ep18 "캐즘 위치의 후보들: 테슬라·잠재 고릴라·Cerebras" — 시즌 2 (32p)
# 2026-09-13 작성. season2-plan.md Ep18 · v4 Ep18-19 계승 · Ep4 Cerebras 연결 · 4기준 판별
# 팩트(2026-09-13 웹 확인): 테슬라 2026-04-18 댈러스·휴스턴 무감독 로보택시 개시(오스틴 포함 3도시), 상반기 7도시·연내 12개 주 목표,
#   베이에어리어 500대+는 안전요원 동승(캘리포니아 규제) · Cerebras 2026-05-14 나스닥 상장(공모가 185달러, 첫날 350달러 개장),
#   2025 매출 5.1억 달러 중 86%가 UAE 계열 2사(MBZUAI 62%·G42 24%), 2025-12 OpenAI 계약
# ※ 작화 직전 수치 갱신 필수 (season2-plan.md 부록 B)
# usage: python3 gen_ep18.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP18"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep18")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP18 NOTE: cars are generic sleek electric sedans with NO badge or logo; robotaxis have an empty driver seat. "
               "Company names appear ONLY as clean labels on the whiteboard; NEVER real logos, real product photos or real executives' faces. "
               "The 'egg with a gorilla shape inside' is a hand-drawn whiteboard icon for '잠재 고릴라'.")

TABLE5 = ("the FIVE-row checklist table titled '초기시장인가, 골짜기를 건넜나' with column headers '초기시장' and '골짜기 건넘', row labels "
          "'누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출' and cells '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; "
          "'없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴'")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A canyon at dusk: a sleek generic electric car with an EMPTY driver seat halfway across a half-built bridge, and beyond the canyon a large egg with a faint gorilla silhouette inside; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking eagerly, phone in hand showing ONLY a blurred news-photo shape of a car (no text, no logo). (2 ~45%) JU BON-JIL with a patient smile, not yet answering.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the label 'Tesla' on the board with two small boxes under it labeled '전기차' and '자율주행'. (2 ~45%) close on the two boxes with a small canyon sketch under each (no more text).",
 "p04":"One panel (~100%). The whiteboard: a hand-drawn diagram: a car icon at the top labeled 'Tesla'; two arrows down to two canyon sketches labeled '전기차 · 캐즘' and '자율주행 · 캐즘'; under the first canyon three tiny icons (a charging plug, a flame, a road) with NO text; under the second canyon a tiny steering wheel with a question mark; JU BON-JIL to the side; ONLY these three labels.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL recalling Ep3: a small inset of the Ep3 canyon sketch with the car fallen in (no text); NA BAE-UM nodding. (2 ~45%) NA BAE-UM insisting, pointing at his phone (blurred shape).",
 "p06":"One panel (~100%). A street scene in inked webtoon style (no readable text, no logos): a sleek generic electric sedan with an EMPTY driver seat gliding past a sunny downtown corner, a few anonymous pedestrians staring, one filming with a phone; a small clean label box: '2026 · 무감독 로보택시'.",
 "p07":"Two panels. (1 ~55%) JU BON-JIL acknowledging fairly, hand open; NA BAE-UM hopeful. (2 ~45%) JU BON-JIL writing ONLY '3개 도시' and '안전요원 동승' as two short lines on the board corner.",
 "p08":f"One panel (~100%). The whiteboard shows {TABLE5}; a far-right column headed '자율주행' with marks: row 1 a small circled '?', row 2 a check on the '초기시장' side, row 3 a check on the '초기시장' side, row 4 a check on the '초기시장' side, row 5 a check on the '초기시장' side; NA BAE-UM presenting; ONLY these labels and marks.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM explaining row one (who buys) with a torn expression; JU BON-JIL listening. (2 ~45%) HAN SIL-SOK (knit vest, glasses) speaking up from the table, calm.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL summing up: still in the chasm, but moving; NA BAE-UM nodding slowly. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '자율주행: 건너는 중, 아직 안 건넘' / '참조사례가 도시마다 쌓이기 시작'.",
 "p11":"Two panels. (1 ~55%) HAN SIL-SOK raising a point about charging, his phone (screen OFF) in hand; JU BON-JIL pointing at him. (2 ~45%) the whiteboard corner: ONLY a small charging-plug sketch with the label 'NACS' and three tiny other-brand car icons (no badges) queuing toward it.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL explaining the standard asset; NA BAE-UM's eyes widening. (2 ~45%) JU BON-JIL drawing ONLY a small vertical stack of four blocks on the board with tiny icons (a chip, a battery, a plug, a server) and NO words.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL explaining vertical integration with the stack; HAN SIL-SOK nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p14":"One panel (~100%). The whiteboard: a hand-drawn luggage-tag labeled '캐즘 위치의 고릴라 후보' tied to a small car icon, and next to it a small basket sketch with the label '바구니에 담고 관찰'; JU BON-JIL to the side; ONLY these two labels.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL delivering the stance; NA BAE-UM writing. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '고릴라가 아니다가 아니라 아직 아니다' / '배제가 아니라 바구니 관찰'.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL erasing and drawing a large egg on the board with a faint gorilla shape inside (no text); the group curious. (2 ~45%) close on the egg sketch.",
 "p17":"One panel (~100%). The whiteboard: the egg with the label '잠재 고릴라'; around it three small cloud-shaped sketches each with ONE label: '파운데이션 모델 A', '파운데이션 모델 B', '파운데이션 모델 C'; arrows from the clouds toward a small tornado sketch on the right; JU BON-JIL to the side; ONLY these four labels.",
 "p18":"Two panels. (1 ~55%) JU BON-JIL explaining that the winner is decided inside the tornado; NA BAE-UM noting. (2 ~45%) HAN TANG-SU (red cap) bursting in with a question, eyes gleaming.",
 "p19":"One panel (~100%). The whiteboard: the 3x3 knowledge grid from Ep1 redrawn simply: a 3x3 grid with ONLY the center cell shaded mustard with a star, the top-right cell marked with a small 'VC' label, and a small red X drawn over an arrow from the center cell to the top-right cell; JU BON-JIL to the side; ONLY the label 'VC'.",
 "p20":"Two panels. (1 ~55%) JU BON-JIL firm, pointing at the red X; HAN TANG-SU deflating. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '비상장 초기 단계는 정중앙의 자리가 아니다' / '살 수 있는 토네이도만 우리 게임'.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the label 'Cerebras' with a small wafer-sized square chip sketch; NA BAE-UM recognizing it from Ep4. (2 ~45%) HAN TANG-SU groaning, remembering.",
 "p22":"One panel (~100%). The whiteboard: a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → O' / '전환비용 → X' / '네트워크 효과 → X' / '완전완비제품 → X'; a small tally at the bottom reading ONLY '1 / 4'; JU BON-JIL presenting; ONLY these labels.",
 "p23":"Two panels. (1 ~55%) JU BON-JIL explaining each X; NA BAE-UM sober. (2 ~45%) JU BON-JIL drawing a small chimp sketch next to the tally (no text).",
 "p24":"Two panels. (1 ~55%) JU BON-JIL recalling Ep4's pie: a small inset of the pie with one huge slice labeled ONLY '고객 두 곳'; NA BAE-UM nodding. (2 ~45%) the whiteboard corner: ONLY a simple price line with a tall first-day spike and a long drift down (no numbers).",
 "p25":"Two panels. (1 ~55%) JU BON-JIL summing up Cerebras: chimp-class, hype evidence; HAN TANG-SU nodding grimly. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '4기준 1/4 = 침팬지급' / '상장 후 흐름은 하입의 증거' / '본 매수 대상이 아니다'.",
 "p26":"Two panels. (1 ~55%) HAN SIL-SOK asking whether a niche king is possible; JU BON-JIL nodding fairly. (2 ~45%) JU BON-JIL writing ONLY 'RIDE 5%' in a small box on the board corner with a small question mark.",
 "p27":"One panel (~100%). The whiteboard: two hand-drawn luggage tags side by side labeled '캐즘 위치' and '잠재 고릴라', and under them a short line '위치는 등급이 아니다'; a small car icon under the first, a small egg icon under the second; JU BON-JIL to the side; ONLY these three labels.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL closing part ③ of the roadmap: a small inset of the LEARNING ROADMAP with boxes '① 기술수용주기 이해', '② 사례로 익히기', '③ 투자와 연결', '④ 실전', with ①②③ each carrying a green check; NA BAE-UM moved. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '두 분야 결합체는 둘 다 건너야 한다' / '비상장 초기는 우리 자리가 아니다' / '4기준으로 도전자를 심사한다'.",
 "p30":"Two panels, quiet beat. (1 ~60%) evening, NA BAE-UM looking at the three checked boxes on the roadmap inset, the others leaving. (2 ~40%) NA BAE-UM's face, a mix of pride and a new question.",
 "p31":"Two panels. (1 ~55%) at the door NA BAE-UM asks JU BON-JIL a practical question; JU BON-JIL smiles. (2 ~45%) a faint dreamy image in webtoon ink style: a plain notebook labeled ONLY '사냥 일지' on a desk with a calendar showing four circled marks in a year (no other text).",
 "p32":"One panel (~100%). Closing chapter-end: the canyon and the egg behind, a desk with a notebook ahead; NA BAE-UM and JU BON-JIL small figures; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 18\n캐즘 위치의 후보들\n고릴라가 아니다가 아니라, 아직 아니다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','나배움: 테슬라는 이제 고릴라죠?\n올해 운전자 없는 택시가 진짜로 다니잖아요'),
        (2,'C','think','주본질: 3화에서 미뤄둔 숙제가 돌아왔다')],
 "p03":[(1,'C','label','Tesla'),(1,'C','label','전기차'),(1,'C','label','자율주행'),
        (1,'C','speech','주본질: 이 회사는 두 분야의 결합체야\n둘 다 골짜기를 건너야 고릴라지'),
        (2,'C','narr','골짜기가 둘')],
 "p04":[(1,'C','label','Tesla'),(1,'C','label','전기차 · 캐즘'),(1,'C','label','자율주행 · 캐즘'),
        (1,'C','speech','주본질: 전기차는 3화에서 봤지\n충전, 화재, 주행거리\n실용주의자가 세컨드카로 미뤄두는 이유들')],
 "p05":[(1,'C','speech','주본질: 그 골짜기는 아직 그대로야\n하이브리드로 우회하는 것도 그대로고'),
        (2,'C','speech','나배움: 근데 자율주행은 달라졌잖아요\n올해 4월부터 진짜로 사람 없이 다녀요')],
 "p06":[(1,'C','label','2026 · 무감독 로보택시'),
        (1,'C','narr','2026년 봄, 몇몇 도시에서 운전석이 빈 차가 손님을 태우기 시작했다')],
 "p07":[(1,'C','speech','주본질: 맞아, 공정하게 말하면 큰 변화야\n그런데 표로 보자'),
        (2,'C','speech','주본질: 무감독은 세 도시, 다른 큰 도시들은 아직 안전요원이 타\n규제가 도시마다 다르거든')],
 "p08":[(1,'C','label','자율주행'),
        (1,'C','speech','나배움: 누가 사나는… 애매해요\n참조사례는 도시별 데이터가 막 쌓이는 중이고\n완전완비제품은 규제, 보험, 인프라가 아직이에요')],
 "p09":[(1,'C','speech','나배움: 매출은 아직 띄엄띄엄이고\n시총은 자율주행 매출 없이도 이미 커요'),
        (2,'C','speech','한실속: 저라면요? 제 차 열쇠를 넘기기엔\n옆 동네 사람이 타는 걸 좀 더 봐야겠어요')],
 "p10":[(1,'C','speech','주본질: 그게 답이야\n골짜기를 건너는 중이지, 건넌 게 아니야\n다만 참조사례가 쌓이기 시작한 건 진짜야'),
        (2,'C','narr','두 줄')],
 "p11":[(1,'C','speech','한실속: 근데 충전 쪽은 얘기가 다르지 않나요?\n다른 회사 차들도 이 회사 충전기를 쓰기 시작했잖아요'),
        (2,'C','label','NACS')],
 "p12":[(1,'C','speech','주본질: 좋은 지적이야\n완성차로는 아직 고릴라가 아닌데\n충전 표준에선 고릴라적 자산을 쥐고 있어'),
        (2,'C','narr','칩, 배터리, 충전, 데이터센터까지')],
 "p13":[(1,'C','speech','주본질: 게다가 이 회사는 위에서 아래까지 직접 만들어\n한 회사가 완전완비제품을 스스로 채우려는 구조지\n고릴라가 될 잠재력은 충분해'),
        (2,'C','think','나배움: 아직 아닌데, 될 수는 있다')],
 "p14":[(1,'C','label','캐즘 위치의 고릴라 후보'),(1,'C','label','바구니에 담고 관찰'),
        (1,'C','speech','주본질: 그래서 정확한 이름표는 이거야\n캐즘 위치의 고릴라 후보')],
 "p15":[(1,'C','speech','주본질: 고릴라가 아니다가 아니라, 아직 아니다\n배제할 게 아니라 바구니에 담고\n골짜기를 건너는지 분기마다 보는 거야'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','speech','주본질: 다음 이름표, 알 속의 고릴라'),
        (2,'C','think','나배움: 아직 태어나지 않은 고릴라')],
 "p17":[(1,'C','label','잠재 고릴라'),(1,'C','label','파운데이션 모델 A'),(1,'C','label','파운데이션 모델 B'),(1,'C','label','파운데이션 모델 C'),
        (1,'C','speech','주본질: AI 모델 회사들이야\n누가 영주가 될지 아직 아무도 몰라\n토네이도 안에서 결정되거든')],
 "p18":[(1,'C','speech','주본질: 지금은 누가 참조사례와 생태계를\n더 빨리 쌓는지 보는 단계야'),
        (2,'C','speech','한탕수: 그럼 지금 들어가면 대박 아니에요?\n비상장인데 어떻게든 사면요!')],
 "p19":[(1,'C','label','VC'),
        (1,'C','speech','주본질: 1화의 이 표 기억하지?\n비상장 초기 단계는 오른쪽 위, 벤처캐피털의 자리야\n정중앙의 우리 자리가 아니야')],
 "p20":[(1,'C','speech','주본질: 그건 초기 하입이지 토네이도가 아니야\n살 수 있는 토네이도만 우리 게임이야'),
        (2,'C','narr','두 줄')],
 "p21":[(1,'C','label','Cerebras'),
        (1,'C','speech','주본질: 마지막 후보, 4화에서 본 그 회사\n이번엔 4기준으로 정식 심사를 하자'),
        (2,'C','think','한탕수: 첫날 두 배였던 그 회사…')],
 "p22":[(1,'C','label','고릴라 4기준'),
        (1,'C','label','자체 아키텍처 → O'),(1,'C','label','전환비용 → X'),(1,'C','label','네트워크 효과 → X'),(1,'C','label','완전완비제품 → X'),
        (1,'C','label','1 / 4')],
 "p23":[(1,'C','speech','주본질: 웨이퍼 한 장짜리 칩, 아키텍처는 분명 독자적이야\n그런데 고객을 묶는 전환비용이 없고\n개발자 생태계도, 완전완비제품도 없어'),
        (2,'C','narr','넷 중 하나')],
 "p24":[(1,'C','label','고객 두 곳'),
        (1,'C','speech','주본질: 매출은 여전히 고객 두 곳에 몰려 있고\n상장 첫날 뛴 가격은 그 뒤로 흘러내렸지'),
        (2,'C','narr','기대가 먼저 갔다가 먼저 내려온 모양')],
 "p25":[(1,'C','speech','주본질: 4기준 하나면 침팬지급이야\n고릴라의 본 매수 대상이 아니지'),
        (2,'C','narr','세 줄')],
 "p26":[(1,'C','speech','한실속: 그래도 특정 분야에서 영주는 될 수 있지 않나요?'),
        (1,'C','speech','주본질: 가능해, 그건 킹덤의 질문이지\n그리고 13화의 RIDE라면 5% 이하로는 몰라도\n본 사냥감은 아니야'),
        (2,'C','label','RIDE 5%')],
 "p27":[(1,'C','label','캐즘 위치'),(1,'C','label','잠재 고릴라'),(1,'C','label','위치는 등급이 아니다'),
        (1,'C','speech','주본질: 두 이름표는 등급이 아니라 위치야\n등급은 토네이도가 정하고\n우리는 그때까지 관찰한다')],
 "p28":[(1,'C','label','① 기술수용주기 이해'),(1,'C','label','② 사례로 익히기'),(1,'C','label','③ 투자와 연결'),(1,'C','label','④ 실전'),
        (1,'C','speech','주본질: 지도의 셋째 칸이 끝났어\n법칙, 사례, 그리고 투자와의 연결'),
        (2,'C','think','나배움: 이제 마지막 칸')],
 "p29":[(1,'C','speech','주본질: 오늘도 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p30":[(1,'C','narr','체크 세 개가 나란히 섰다'),
        (2,'C','think','나배움: 근데 이걸 매 분기 어떻게 반복하지?')],
 "p31":[(1,'C','speech','나배움: 배운 건 많은데요\n실제로 매일 뭘 해야 하는지 모르겠어요'),
        (2,'C','speech','주본질: 매일은 아무것도 안 해\n그 얘기가 다음 시간이야')],
 "p32":[(1,'C','caption','Episode 18 끝 · 다음 화 · 루틴: 분기 한 번의 사냥 일지\n(④ 실전 · 10대 원칙과 분기 점검표)')],
}

BANDS = {
 "p04":'두 분야 결합체 · 전기차도 자율주행도 캐즘 · 둘 다 건너야 고릴라',
 "p10":'자율주행 2026 · 골짜기를 건너는 중, 건넌 게 아니다 · 참조사례가 도시별로 쌓이기 시작',
 "p14":'캐즘 위치의 고릴라 후보 · 충전 표준(NACS)+수직통합 = 후보 자격 · 배제가 아니라 바구니 관찰',
 "p19":'비상장 초기 단계는 3×3의 오른쪽 위(VC)의 자리 · 정중앙(개미)의 자리가 아니다 · 살 수 있는 토네이도만 우리 게임',
 "p22":'Cerebras 4기준 · 자체 아키텍처 O · 전환비용 X · 네트워크 효과 X · 완전완비제품 X → 1/4 침팬지급',
}

NOTES = {
 "p04":'해설: 테슬라를 "전기차 + 자율주행 두 분야의 결합체"로 보는 틀은 v4 기획서의 도식을 따른다. 결합체는 두 캐즘을 모두 건너야 고릴라가 된다',
 "p07":'사실 확인: 테슬라는 2026년 4월 18일 댈러스·휴스턴에서 운전자 없는 무감독 로보택시를 시작했다(오스틴 포함 3개 도시). 상반기 7개 도시, 연내 약 12개 주 확대를 목표로 했으며, 캘리포니아 베이에어리어의 500대 이상 차량은 규제상 안전요원이 동승한다(2026-09 기준, 작화 시 갱신)',
 "p11":'사실 확인: 테슬라의 충전 커넥터 NACS는 2023년 이후 포드·GM 등 다수 완성차가 채택해 북미 충전 표준이 됐다. 완성차 카테고리와 별개로 충전 표준에서 고릴라적 자산을 가진 셈이다',
 "p13":'해설: 수직통합(vertical integration)은 칩·소프트웨어·차체·배터리·충전망·데이터센터를 한 회사가 직접 갖는 구조다. 완전완비제품을 스스로 채우려는 시도라는 점에서 고릴라 후보 자격이 된다',
 "p19":'해설: 1화의 3×3 지식 매트릭스에서 비상장 초기 투자는 오른쪽 위(VC·테크 펀드)의 영역이다. 정중앙(산업·투자 지식이 모두 중간인 보통 사람)은 상장된 토네이도에서만 우위가 있다. "잠재 고릴라"는 Moore의 등급이 아닌 보조 라벨이다',
 "p22":'해설: 고릴라 4기준(자체 아키텍처·전환비용·네트워크 효과·완전완비제품)은 시즌 3 「고릴라의 해부학」에서 본격적으로 다루는 판별 틀이다. 여기서는 도전자 심사에 미리 적용했다',
 "p24":'사실 확인: 세레브라스(Cerebras)는 2026년 5월 14일 나스닥 상장(공모가 185달러, 첫날 350달러 개장) 후 주가가 조정됐다. 2025년 매출 5.1억 달러의 86%가 UAE 계열 두 고객(MBZUAI 62%, G42 24%)이었고, 2025년 12월 OpenAI와 공급 계약을 맺었다(S-1 및 보도, 2026-09 기준). 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
