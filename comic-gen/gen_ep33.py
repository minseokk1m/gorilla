#!/usr/bin/env python3
# 고릴라 헌터스 Ep33 "바구니를 만들어라" — 시즌 4 (30p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep33 · Moore 원칙 3·7·8(바구니 → 집중) · 원칙 5(응용 SW 침팬지 보유) · Ep18 비상장 노출 대체 · 김경윤 v4 피드백(바구니 "최대 4" 숫자 집착 경계)
# ※ 바구니 시뮬레이션의 A·B·C는 전부 가상 종목. 파운데이션 모델 선두 둘은 2026-10 현재 비상장이나 상장 신청 완료(season34-facts.md B2)
# usage: python3 gen_ep33.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP33"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep33")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP33 NOTE: the basket motif is a plain wicker basket sketch holding paper cards; the cards 'A', 'B', 'C' are small white index cards with ONLY that single letter. "
               "Company and category names appear ONLY as clean labels on the whiteboard; NEVER real logos. Phone screens stay OFF. "
               "The quarter timeline board is always drawn exactly as specified for that page; later-quarter states must NEVER appear early.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s MAN, short plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, glasses, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

P3CARD = ("a hand-drawn card titled '원칙 3 · 바구니' with three short lines exactly: '후보를 바구니로' / '보통 둘셋, 넷은 넘기지 않는다' / '숫자보다 후보의 자격'; a small wicker-basket icon")
BSK3 = ("a hand-drawn card titled '바구니의 세 조건' with three numbered lines exactly: '① 같은 카테고리의 후보들' / '② 각자 4기준을 절반 이상' / '③ 서식지 하나에 바구니 하나'")
MAP3 = ("a hand-drawn strip of three boxes side by side labeled exactly '연산', '파운드리', '장비', each box containing ONE small gorilla sketch and NOTHING else")
SUB2 = ("a hand-drawn card titled '비상장 후보는' with a small padlock icon at the top and two arrows pointing down to two short lines exactly: '지분을 가진 상장사' / '특화 ETF'")
BASK_HEAD = ("a hand-drawn TIMELINE board titled '바구니 → 집중': along the top three small white index cards bearing ONLY the letters 'A', 'B', 'C'; beneath them four columns headed exactly '1분기', '2분기', '3분기', '4분기'")
Q1 = ("in the '1분기' column three equal short bars, one under each card")
Q2 = ("in the '2분기' column three bars with the middle bar (under 'B') slightly taller than the other two")
Q3 = ("in the '3분기' column the bar under 'A' crossed out with a red X and a tiny tag '원칙 7', a red arrow from that X to the bar under 'B' with a tiny tag '원칙 8', the 'B' bar now tall")
Q4 = ("in the '4분기' column the 'B' bar tallest, the 'C' bar short with a tiny tag '침팬지 · 보유', and no bar under 'A'")
RESULT = ("a small hand-drawn result card reading exactly '결과 · B 집중 + C 보유'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a plain wicker basket on a wooden table holding three large eggs, two pale and ONE glowing golden, soft morning light from a window; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL with an open hunting log, worried; the TALC five and HAN TANG-SU at the table; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL lifting an imaginary basket with both hands, smiling.",
 "p03":f"One panel (~100%). The whiteboard shows {P3CARD}; JU BON-JIL to the side, no hand covering any label; ONLY these labels.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {P3CARD}; HAN TANG-SU counting four fingers. (2 ~45%) JU BON-JIL tapping the third line of the card, firm but kind.",
 "p05":"Two panels. (1 ~55%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '바구니 = 토네이도 전 후보들' / '넷은 넘기지 않는다' / '숫자보다 자격'. (2 ~45%) NA BAE-UM looking up with a new question, plain background.",
 "p06":f"One panel (~100%). The whiteboard shows {BSK3}; JU BON-JIL to the side; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL explaining condition ① beside the whiteboard which shows {BSK3}; GO BI-JEON (navy suit) nodding. (2 ~45%) close on the card's second line '② 각자 4기준을 절반 이상' with JU BON-JIL's finger beside it, nothing else on the board.",
 "p08":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone in hand) raising the objection hand; the whiteboard behind shows {BSK3}. (2 ~45%) JU BON-JIL answering with a dry smile, drawing ONLY a very wide shallow basket sketch on a corner of the board (no text).",
 "p09":"Two panels. (1 ~55%) the whiteboard corner: ONLY a wide shallow basket sketch stuffed with ten tiny blank cards, and beside it a small normal basket holding three cards; JU BON-JIL pointing from the wide one to the small one. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '열 개는 바구니가 아니라 지도 전체' / '그건 ETF의 일'.",
 "p10":f"One panel (~100%). {LOCK_NB}NA BAE-UM at the whiteboard has drawn a basket sketch with three index cards inside bearing ONLY the words '연산', '파운드리', '장비'; the rest of the board is BLANK; the group watching.",
 "p11":f"Two panels. (1 ~55%) JU BON-JIL from the table shaking his head gently; NA BAE-UM (black hair, no glasses, charcoal shirt) at the board turning around, puzzled; the board still shows ONLY the basket with the three cards '연산', '파운드리', '장비'. (2 ~45%) JU BON-JIL walking up and drawing {MAP3} next to the basket; ONLY these three labels on the strip.",
 "p12":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {MAP3} (the basket sketch erased); NA BAE-UM getting it. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p13":"Two panels. (1 ~55%) GO BI-JEON (navy suit, tablet under arm, tablet screen OFF) proposing the foundation-model basket; JU BON-JIL writing ONLY the heading '파운데이션 모델' on the board with four small blank index-card outlines beneath it. (2 ~45%) JU BON-JIL drawing a tiny padlock on three of the four card outlines; no other text.",
 "p14":f"One panel (~100%). The whiteboard shows {SUB2}; beside it the heading '파운데이션 모델' with four card outlines, three bearing a tiny padlock; JU BON-JIL to the side; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {SUB2}; HAN SIL-SOK (knit vest, glasses) listening carefully. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '비상장 후보 → 지분 가진 상장사, 특화 ETF' / '상장 직후는 정점 주의'.",
 "p16":f"One panel (~100%). The whiteboard shows {BASK_HEAD}; {Q1}; the '2분기', '3분기' and '4분기' columns are completely BLANK WHITE with NOTHING in them; JU BON-JIL to the side; ONLY the specified labels.",
 "p17":f"One panel (~100%). The whiteboard shows {BASK_HEAD}; {Q1}; {Q2}; the '3분기' and '4분기' columns are completely BLANK WHITE with NOTHING in them, NO X marks, NO arrows, NO tags anywhere; JU BON-JIL pointing at the '2분기' column; ONLY the specified labels.",
 "p18":f"One panel (~100%). The whiteboard shows {BASK_HEAD}; {Q1}; {Q2}; {Q3}; the '4분기' column is completely BLANK WHITE with NOTHING in it; JU BON-JIL pointing at the red X; ONLY the specified labels.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {BASK_HEAD}; {Q1}; {Q2}; {Q3}; the '4분기' column completely BLANK; NA BAE-UM copying fast. (2 ~45%) HAN TANG-SU (red cap) wincing at the red X, hand on his chest.",
 "p20":f"One panel (~100%). The whiteboard shows {BASK_HEAD}; {Q1}; {Q2}; {Q3}; {Q4}; beneath the timeline {RESULT}; JU BON-JIL stepping back; ONLY the specified labels.",
 "p21":f"Two panels. (1 ~55%) HAN TANG-SU (red cap, mustard hoodie) asking anxiously, his balloon tail pointing at him; the whiteboard behind shows {BASK_HEAD} with all four quarters filled ({Q1}; {Q2}; {Q3}; {Q4}) and {RESULT}. (2 ~45%) JU BON-JIL's calm face, close.",
 "p22":"Two panels. (1 ~55%) JU BON-JIL writing ONLY two short lines on a clean part of the board: '원칙 7은 가격을 보지 않는다' and '고릴라가 될 수 없다는 판단만'; HAN TANG-SU staring. (2 ~45%) close on HAN TANG-SU's face, the cockiness gone, thinking hard.",
 "p23":"Two panels. (1 ~55%) HAN TANG-SU standing up with his phone held face-down against his chest (screen NOT visible), a decided face; the group turning; the whiteboard behind is out of focus with no readable text. (2 ~45%) SHIN JUNG-HAE (cardigan) writing in the club log, a warm look; the log page shows NO readable text.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL putting a hand on HAN TANG-SU's shoulder; HAN TANG-SU embarrassed but proud; the whiteboard behind is completely BLANK. (2 ~45%) close on SHIN JUNG-HAE's pen finishing a line, the page shows NO readable text.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '바구니는 같은 칸의 후보들' / '못 될 놈은 가격 안 보고 판다' / '뺀 돈은 남은 후보로'.",
 "p26":"Two panels. (1 ~55%) HAN SIL-SOK (knit vest, glasses) speaking from the table with his careful smile, his balloon tail pointing at him; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL nodding, pleased.",
 "p27":"Two panels. (1 ~55%) AN MID-EO (flip phone) muttering a last objection, the group laughing softly; the whiteboard behind is completely BLANK. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL holding up a single blank blue sheet of paper, teasing the next lesson; the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM leaning in, curious; HAN TANG-SU peeking.",
 "p29":f"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL a last question, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) a faint dreamy image {INK}a single golden egg in a basket cracking with a thin line of light; no readable text.",
 "p30":f"One panel (~100%). Closing chapter-end, {INK}the study room at dusk, the wicker basket on the table with three cards inside, NA BAE-UM and JU BON-JIL small figures by the window; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 33\n바구니를 만들어라\n누가 1등이 될지 모를 때\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','나배움: 서식지도 찾고 신호도 봤는데요\n토네이도 직전엔 누가 영주가 될지 모르겠어요'),
        (2,'C','speech','주본질: 그래서 바구니야')],
 "p03":[(1,'C','label','원칙 3 · 바구니'),(1,'C','label','후보를 바구니로'),(1,'C','label','보통 둘셋, 넷은 넘기지 않는다'),(1,'C','label','숫자보다 후보의 자격'),
        (1,'C','speech','주본질: 후보를 전부 바구니에 담고\n토네이도 안에서 1등이 정해지길 기다려')],
 "p04":[(1,'C','speech','한탕수: 넷까지면 넷 다 사면 되죠?'),
        (2,'C','speech','주본질: 숫자에 매달리지 마\n자격 있는 후보가 둘이면 둘, 셋이면 셋이야\n넷이라는 숫자가 본질이 아니야')],
 "p05":[(1,'C','narr','세 줄'),
        (2,'C','speech','나배움: 그럼 아무거나 담으면 안 되겠네요')],
 "p06":[(1,'C','label','바구니의 세 조건'),(1,'C','label','① 같은 카테고리의 후보들'),(1,'C','label','② 각자 4기준을 절반 이상'),(1,'C','label','③ 서식지 하나에 바구니 하나'),
        (1,'C','speech','주본질: 바구니에도 조건이 셋 있어')],
 "p07":[(1,'C','speech','주본질: 첫째, 같은 칸에서 1등을 다투는 후보들이어야 해\n서로 경쟁하는 사이여야 한 놈이 이기지'),
        (2,'C','speech','주본질: 둘째, 넷 중 둘은 통과해야 후보 자격이야')],
 "p08":[(1,'C','speech','안믿어: 그냥 열 개쯤 사면 안전하지 않소?'),
        (2,'C','speech','주본질: 그건 바구니가 아니라\n지도 전체를 사는 거야')],
 "p09":[(1,'C','speech','주본질: 지도 전체를 사는 건 ETF의 일이지\n바구니는 한 칸의 1등을 맞히는 도구야'),
        (2,'C','narr','두 줄')],
 "p10":[(1,'C','label','연산'),(1,'C','label','파운드리'),(1,'C','label','장비'),
        (1,'C','speech','나배움: 첫 바구니예요\nAI 인프라에서 셋을 골랐어요')],
 "p11":[(1,'C','speech','주본질: 배움아, 그 셋은 서로 경쟁하는 사이가 아니야'),
        (2,'C','speech','주본질: 지도의 세 칸이고\n칸마다 이미 고릴라가 정해져 있어')],
 "p12":[(1,'C','speech','주본질: 그건 바구니가 아니라 지도 세 칸을 산 거야\n바구니는 같은 칸 안의 후보들이야'),
        (2,'C','think','나배움: 칸을 먼저 고르고, 그 칸 안에서 후보를 담는다')],
 "p13":[(1,'C','label','파운데이션 모델'),
        (1,'C','speech','고비전: 그럼 파운데이션 모델은 어떤가요\n후보 넷이 한 칸에서 다투잖아요'),
        (2,'C','speech','주본질: 좋은 칸이야, 그런데 넷 중 셋이 아직 비상장이지')],
 "p14":[(1,'C','label','비상장 후보는'),(1,'C','label','지분을 가진 상장사'),(1,'C','label','특화 ETF'),
        (1,'C','speech','주본질: 못 사는 후보는 두 길로 대신 담아\n지분을 가진 상장사, 아니면 특화 ETF')],
 "p15":[(1,'C','speech','주본질: 선두 둘은 상장 신청을 했다지\n그래도 상장 직후는 13화의 정점이기 쉬워\n살 수 있게 되는 날과 사는 날은 달라'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','label','바구니 → 집중'),(1,'C','label','1분기'),
        (1,'C','speech','주본질: 가상의 응용 소프트웨어 후보 셋이야\n1분기, 같은 돈으로 똑같이 담는다')],
 "p17":[(1,'C','label','2분기'),
        (1,'C','speech','주본질: 2분기, B의 매출이 먼저 가속해\n아직은 손대지 않아, 지켜본다')],
 "p18":[(1,'C','label','3분기'),(1,'C','label','원칙 7'),(1,'C','label','원칙 8'),
        (1,'C','speech','주본질: 3분기, B가 토네이도에 들어섰어\nA는 고릴라가 될 수 없다는 게 분명해졌지\n원칙 7로 팔고, 원칙 8로 그 돈을 B에 넣는다')],
 "p19":[(1,'C','speech','주본질: 매도와 재투자는 한 묶음이야\n팔기만 하고 쥐고 있으면 반쪽이지'),
        (2,'C','think','한탕수: A를 손해 보고 파는 거 아닌가…')],
 "p20":[(1,'C','label','4분기'),(1,'C','label','침팬지 · 보유'),(1,'C','label','결과 · B 집중 + C 보유'),
        (1,'C','speech','주본질: 4분기, C는 침팬지로 판정\n응용 소프트웨어 침팬지는 원칙 5대로 보유\n결과는 B에 집중, C는 가볍게')],
 "p21":[(1,'C','speech','한탕수: 형, A 팔 때 손해면요?\n본전 올 때까지 기다리면 안 돼요?'),
        (2,'C','speech','주본질: 그 질문이 제일 많이 나와')],
 "p22":[(1,'C','label','원칙 7은 가격을 보지 않는다'),(1,'C','label','고릴라가 될 수 없다는 판단만'),
        (1,'C','speech','주본질: 원칙 7은 네 매수가를 안 봐\n고릴라가 될 수 없다는 판단, 그것만 봐'),
        (2,'C','think','한탕수: 가격이 아니라 판단…')],
 "p23":[(1,'C','speech','한탕수: 저, 제 바구니에도 A 같은 게 하나 있어요\n오늘 규칙대로 팔겠습니다'),
        (2,'C','speech','신중해: 기록할게요\n탕수 씨의 첫 규칙 매도')],
 "p24":[(1,'C','speech','주본질: 손해를 확정한 게 아니야\n남은 후보에 쓸 돈을 되찾은 거지'),
        (2,'C','narr','기록 담당의 펜이 멈췄다')],
 "p25":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p26":[(1,'C','speech','한실속: 실용주의자 눈엔 바구니가 제일 안전해 보이네요\n한 놈을 맞히려 하지 않아도 되니까'),
        (2,'C','speech','주본질: 맞아, 바구니는 겸손의 도구야')],
 "p27":[(1,'C','speech','안믿어: 겸손한 사람이 왜 셋이나 사는지는 모르겠소만'),
        (2,'C','think','나배움: 그래도 열 개보다는 셋이 겸손하지')],
 "p28":[(1,'C','speech','주본질: 바구니에 담은 후보 하나를\n이번엔 깊이 심사해 볼 거야\n파란 표 한 장으로'),
        (2,'C','speech','나배움: 파란 표요?')],
 "p29":[(1,'C','speech','나배움: 그 표는 누가 만든 거예요?'),
        (1,'C','speech','주본질: 영업 사원들이야\n왜 영업 도구로 주식을 보는지는 다음 시간에'),
        (2,'C','narr','알 하나에 금이 갔다')],
 "p30":[(1,'C','caption','Episode 33 끝 · 다음 화 · 자격심사표를 채워라\n(Blue Sheet와 SHARES · 누가 사기로 결정하나)')],
}

BANDS = {
 "p03":'원칙 3 · 고릴라 후보를 바구니로 산다 · 보통 둘셋, 넷은 넘기지 않되 숫자가 본질은 아니다',
 "p06":'바구니의 세 조건 · 같은 카테고리의 후보들 · 각자 4기준 절반 이상 · 서식지 하나에 바구니 하나',
 "p12":'바구니는 같은 칸의 후보들이다 · 지도의 서로 다른 칸을 담는 것은 바구니가 아니라 ETF의 일',
 "p14":'비상장 후보는 지분을 가진 상장사나 특화 ETF로 대신 담는다 · 상장 직후는 하입 정점 주의',
 "p18":'원칙 7 · 고릴라가 될 수 없으면 즉시 판다 · 원칙 8 · 뺀 돈은 남은 후보에 바로 재투자',
 "p22":'원칙 7은 매수 가격을 보지 않는다 · 고릴라가 될 수 없다는 판단만 본다',
}

NOTES = {
 "p03":'해설: Moore 원칙 3 원문: "Buy a basket comprising all the gorilla candidates, usually two, sometimes three, normally no more than four." 토네이도 직전에는 누가 고릴라가 될지 알 수 없으므로 후보 전체를 담는다. 검토자 의견(김경윤)을 반영해 "넷"이라는 숫자보다 후보의 자격을 강조한다. 시장 속도가 빨라진 지금, 숫자 자체에 집착하는 것을 경계한다',
 "p09":'해설: 바구니와 분산투자는 다르다. 분산투자는 서로 무관한 자산을 넓게 담아 위험을 줄이는 것이고, 바구니는 한 카테고리의 1등 자리를 다투는 후보들을 함께 담아 "누가 이길지"의 불확실성만 없애는 것이다. 지도 전체를 담는 일은 ETF의 역할이다(30화)',
 "p12":'해설: 25화의 가치사슬 지도에서 연산·파운드리·장비는 서로 다른 칸이며 칸마다 이미 고릴라가 정해져 있다. 같은 칸 안에서 경쟁하지 않는 종목들을 함께 사는 것은 바구니(원칙 3)가 아니라 각 칸의 고릴라를 따로 사는 것이다',
 "p15":'사실 확인: 파운데이션 모델 선두 두 회사는 2026년 10월 기준 모두 비상장이나 상장 신청을 마쳤다(한 곳은 2026년 11월, 한 곳은 2027년 상장 목표로 보도됨). 비상장 후보는 지분을 보유한 상장사나 특화 ETF로 간접 노출한다(18화). 상장 직후는 기대가 가격을 앞서는 정점이기 쉬우므로(13화) "살 수 있게 되는 날"과 "사는 날"을 구분한다',
 "p18":'해설: Moore 원칙 7 원문: "Once it becomes clear a company will never become a gorilla, sell its stock." 원칙 8 원문: "Money from non-gorilla stocks should immediately be reinvested in the remaining gorilla candidates." 두 원칙은 한 묶음이며, 이 시뮬레이션의 A·B·C는 전부 가상 종목이다',
 "p20":'해설: Moore 원칙 5: 응용 소프트웨어 침팬지는 시장 확대 잠재력이 있는 한 보유하고, 지원 기술 침팬지는 보유하지 않는다(16화). 이 시뮬레이션의 C는 응용 소프트웨어 후보이므로 침팬지 판정 뒤에도 가볍게 보유한다',
 "p22":'해설: 원칙 7은 매수 가격과 무관하다. "본전까지 기다린다"는 판단은 고릴라가 될 수 없다는 사실과 아무 관계가 없으며, 그 사이 남은 후보에 넣을 돈이 묶인다(원칙 8). 손절은 손실의 확정이 아니라 다음 후보를 위한 자금 회수다(13화)',
}

if __name__ == "__main__": run(globals())
