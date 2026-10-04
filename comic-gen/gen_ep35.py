#!/usr/bin/env python3
# 고릴라 헌터스 Ep35 "고릴라 충돌: 양쪽을 든다" — 시즌 4 (30p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep35 · Moore 원칙 9(고릴라 충돌 시 결판까지 보유) 실전 · Ep28 과점 조건 셋(COND3) 재사용 · v4 Ep38 계승
# 사례(팩트 기준일 2026-10-04, season34-facts.md): 결제망(Visa·Mastercard 미국 카드 구매액 약 87%) · 메모리(삼성·SK하이닉스, 3위 마이크론) · 클라우드(양강 → 3강으로 변하는 중) · 파운데이션 모델(비상장이나 상장 신청 완료)
# ※ 실존 인물 얼굴 금지, 회사명은 보드 라벨로만, 로고 금지. 작화 직전 클라우드 점유율·상장 일정 재확인
# usage: python3 gen_ep35.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP35"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep35")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP35 NOTE: company names appear ONLY as clean labels on whiteboard cards; NEVER real logos, card designs, bank marks or executives' faces. "
               "Throne motifs are simple hand-drawn stone thrones with a gorilla silhouette; NO real products. "
               "NA BAE-UM's kraft hunting log is a plain notebook; when its lines are specified, ONLY those lines are written.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_HS = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal shirt) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit, glasses) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

P9CARD = ("a hand-drawn card titled '원칙 9 · 고릴라 충돌' with two short lines exactly: '고릴라 충돌 시 결판까지 보유' / '양쪽 다 보유는 헷지가 아니라 정공법'; "
          "a small icon of two gorilla silhouettes facing each other")
COND3 = ("a hand-drawn card titled '진짜 과점의 세 조건' with three short lines exactly: '① 둘 다 4기준 통과' / '② 고객 기반과 쓰임이 갈린다' / '③ 한쪽이 무너지면 시장이 위험'")
DUO4_EMPTY = ("a hand-drawn FOUR-ROW table titled '결제망' with two column headers 'Visa' (left) and 'Mastercard' (right) and four row labels down the left exactly "
              "'자체 아키텍처', '전환비용', '네트워크 효과', '완전완비제품'; ALL EIGHT cells are completely EMPTY (nothing written inside any cell)")
DUO4 = ("a hand-drawn FOUR-ROW table titled '결제망' with two column headers 'Visa' (left) and 'Mastercard' (right) and four row labels down the left exactly "
        "'자체 아키텍처', '전환비용', '네트워크 효과', '완전완비제품'; every one of the eight cells contains a single clean 'O' and nothing else")
SPLIT = ("a hand-drawn bar sketch titled '양쪽 보유' with two bars of EXACTLY the same height side by side, labeled beneath 'Visa' and 'Mastercard'; "
         "no numbers, no other labels")
SUB3 = ("a hand-drawn card titled '대체 위협 3단계' with three short lines exactly: '① 새 카테고리가 생겼나' / '② 실용주의자가 옮기기 시작했나' / '③ 옛 전환비용이 녹고 있나'")
CLOUD3 = ("a hand-drawn bar sketch titled '클라우드' with three bars of decreasing height labeled beneath '1위', '2위', '3위', and a bold red UP-ARROW drawn next to the third bar; "
          "no numbers, no company names")
MEM_SPLIT = ("a hand-drawn board titled '메모리' with two row labels on the left exactly 'HBM' (top) and 'DRAM' (bottom); two tall paper cards each spanning BOTH rows, "
             "labeled '삼성전자' and 'SK하이닉스'; one small card to the right labeled '마이크론'; and a small note card beneath reading exactly '원칙 9 + 원칙 6'; nothing else on the board")
MEM_SPLIT_A = ("a hand-drawn board titled '메모리' with two row labels on the left exactly 'HBM' (top) and 'DRAM' (bottom); two tall paper cards each spanning BOTH rows, "
               "labeled '삼성전자' and 'SK하이닉스'; the rest of the board completely EMPTY (NO third card, NO note card)")
SUB2 = ("a hand-drawn card with one line exactly '비상장 후보 → 지분 가진 상장사 · 특화 ETF' and a small egg icon with a gorilla shape inside")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: two simple stone thrones stand side by side on a jungle clearing at dawn, each with a gorilla silhouette seated, and a small human hunter silhouette standing calmly in the gap between them holding a kraft notebook; NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, recalling the earlier lesson; the whole club at the long table; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL nodding, standing up with the marker.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the heading '원칙 9' on the whiteboard; nothing else on the board. (2 ~45%) NA BAE-UM opening his kraft hunting log to a fresh page (no writing visible).",
 "p04":f"One panel (~100%). The whiteboard shows {P9CARD}; JU BON-JIL stands fully to the side so that no hand covers any label; ONLY these labels.",
 "p05":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {P9CARD}; the group listening. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p06":f"One panel (~100%). The whiteboard shows {COND3}; JU BON-JIL to the side, tapping the title; ONLY these labels.",
 "p07":f"One panel (~100%). {LOCK_HS}The whiteboard shows {DUO4_EMPTY}; HAN SIL-SOK holding the marker, about to fill the first cell; ONLY these labels.",
 "p08":f"One panel (~100%). {LOCK_HS}The whiteboard shows {DUO4}; HAN SIL-SOK stepping back to the side so that no hand covers any label; ONLY these labels.",
 "p09":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK explaining beside the whiteboard which shows {DUO4}; AN MID-EO (flip phone) raising a hand with an objection. (2 ~45%) JU BON-JIL answering from the table, calm, one finger raised.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL at the whiteboard which shows ONLY a small hand-drawn castle wall with a crown passing between two small figures (a curved arrow) and ONE label '킹덤 · 왕관이 돌아간다'; nothing else on the board. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '셋 다 O면 충돌' / '하나라도 X면 영주와 기사, 원칙 6'.",
 "p11":f"One panel (~100%). The whiteboard shows {SPLIT}; JU BON-JIL to the side; ONLY these labels.",
 "p12":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {SPLIT}; NA BAE-UM copying. (2 ~45%) the whiteboard corner: {SUB3}; ONLY these labels.",
 "p13":"Two panels. (1 ~55%) AN MID-EO (stern, flip phone) throwing the objection; the group turning; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL grinning, as if he was waiting for it, picking up the marker.",
 "p14":f"One panel (~100%). The whiteboard shows {CLOUD3}; JU BON-JIL to the side; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {CLOUD3}; HAN TANG-SU surprised. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '과점은 고정이 아니다' / '셋이 되면 충돌이 아니라 바구니'.",
 "p16":f"One panel (~100%). {LOCK_HS}The whiteboard shows {MEM_SPLIT_A}; HAN SIL-SOK pinning the second card; ONLY these labels.",
 "p17":f"One panel (~100%). {LOCK_HS}The whiteboard shows {MEM_SPLIT}; HAN SIL-SOK standing fully to the side; ONLY these labels.",
 "p18":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK explaining beside the whiteboard which shows {MEM_SPLIT}; JU BON-JIL nodding from the table. (2 ~45%) a small memory inset {INK}: the Ep17 image of a stacked memory chip bolted onto a large GPU chip with a padlock icon, NO text.",
 "p19":f"Two panels. (1 ~55%) HAN TANG-SU (red cap) asking about the small third card, pointing at the whiteboard which shows {MEM_SPLIT}. (2 ~45%) JU BON-JIL answering, holding up two fingers.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '메모리는 양쪽을 들되' / 'HBM은 원칙 9, DRAM은 원칙 6'. (2 ~45%) HAN SIL-SOK sitting down, satisfied, glasses pushed up.",
 "p21":"Two panels. (1 ~55%) GO BI-JEON (navy suit, tablet under arm (screen OFF), tablet screen OFF) asking about the model companies, confident; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL shaking his head slowly with a half smile.",
 "p22":f"One panel (~100%). The whiteboard shows {SUB2}; JU BON-JIL to the side; ONLY this label.",
 "p23":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {SUB2}; GO BI-JEON nodding. (2 ~45%) close on JU BON-JIL's face, a warning look.",
 "p24":"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) writing in the club log, the recorder; CHOI SIN-SANG (headphones) leaning in with a comment. (2 ~45%) JU BON-JIL answering CHOI SIN-SANG, amused.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '진짜 충돌인지 세 조건' / '양쪽을 든다' / '결판 신호는 대체 위협'.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU (red cap) protesting, phone (screen OFF) in hand; the group amused. (2 ~45%) JU BON-JIL drawing ONLY two small bars on the whiteboard corner, one shrinking with a down-arrow and one growing with an up-arrow, NO text.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard corner which shows ONLY the two small bars (one with a down-arrow, one with an up-arrow) and no text; HAN TANG-SU finally nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p28":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL the next question, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL turning back at the doorway, one hand on the frame.",
 "p29":f"One panel (~100%). A quiet mood shot {INK}: the study room empty at dusk, two chairs pulled close together at the long table, a kraft notebook left open between them; the whiteboard is completely BLANK; NO readable text anywhere.",
 "p30":f"One panel (~100%). Closing chapter-end, {INK}the two stone thrones from the cover now far in the distance, a single open doorway of light ahead, NA BAE-UM and JU BON-JIL small figures walking toward it; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 35\n고릴라 충돌: 양쪽을 든다\n헷지가 아니라 정공법\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','나배움: 28화에서 한 시장에 고릴라가 둘일 수 있다고 하셨잖아요\n그 경우 실전에서는 어떻게 사요?'),
        (2,'C','speech','주본질: 오늘이 그 답이야\n원칙 하나로 끝나')],
 "p03":[(1,'C','label','원칙 9'),
        (2,'C','narr','일지의 새 장')],
 "p04":[(1,'C','label','원칙 9 · 고릴라 충돌'),(1,'C','label','고릴라 충돌 시 결판까지 보유'),(1,'C','label','양쪽 다 보유는 헷지가 아니라 정공법'),
        (1,'C','speech','주본질: 두 고릴라가 부딪히면\n결판이 날 때까지 둘 다 든다')],
 "p05":[(1,'C','speech','주본질: 누가 이기든 카테고리의 가치는 한쪽으로 모여\n둘 다 들고 있으면 그 가치를 놓치지 않지\n헷지가 아니라 정공법이야'),
        (2,'C','think','나배움: 둘 다 사는 게 겁쟁이 짓이 아니었구나')],
 "p06":[(1,'C','label','진짜 과점의 세 조건'),(1,'C','label','① 둘 다 4기준 통과'),(1,'C','label','② 고객 기반과 쓰임이 갈린다'),(1,'C','label','③ 한쪽이 무너지면 시장이 위험'),
        (1,'C','speech','주본질: 단, 원칙 9를 쓰기 전에\n28화의 세 조건으로 진짜 충돌인지 먼저 확인해')],
 "p07":[(1,'C','label','결제망'),(1,'C','label','Visa'),(1,'C','label','Mastercard'),
        (1,'C','speech','한실속: 결제망은 제가 채워 보겠습니다\n두 회사를 4기준으로 하나씩')],
 "p08":[(1,'C','label','자체 아키텍처'),(1,'C','label','전환비용'),(1,'C','label','네트워크 효과'),(1,'C','label','완전완비제품'),
        (1,'C','speech','한실속: 여덟 칸 전부 O입니다\n둘 다 4기준을 통과해요, 조건 ①')],
 "p09":[(1,'C','speech','한실속: 조건 ②, 발급 은행과 가맹점 망이 서로 달라서 정면충돌이 적고\n조건 ③, 한쪽이 멈추면 결제 자체가 위험해요'),
        (1,'C','speech','안믿어: 스테이블코인이 위협이라던데'),
        (2,'C','speech','주본질: 위협 서사는 있지만 거래량을 빼앗았다는 증거는 아직 없어\n29화의 관찰 단계지, 입증이 아니야')],
 "p10":[(1,'C','label','킹덤 · 왕관이 돌아간다'),
        (1,'C','speech','주본질: 반대로 조건 ①이 빠지면 그냥 1등과 2등이야\n왕관이 돌아가는 킹덤이지, 그건 원칙 6'),
        (2,'C','narr','두 줄')],
 "p11":[(1,'C','label','양쪽 보유'),(1,'C','label','Visa'),(1,'C','label','Mastercard'),
        (1,'C','speech','주본질: 세 조건을 다 통과했으니 원칙 9\n같은 높이로 양쪽을 든다')],
 "p12":[(1,'C','speech','주본질: 그러다 한쪽에서 결판이 나면 그쪽으로 옮겨\n결판의 신호는 29화의 세 단계가 한쪽에서 켜지는 거야'),
        (2,'C','label','대체 위협 3단계'),(2,'C','label','① 새 카테고리가 생겼나'),(2,'C','label','② 실용주의자가 옮기기 시작했나'),(2,'C','label','③ 옛 전환비용이 녹고 있나')],
 "p13":[(1,'C','speech','안믿어: 그럼 3등이 치고 올라오면 어쩔 거요\n둘만 들고 있다가 뒤통수 맞는 거 아니오'),
        (2,'C','speech','주본질: 좋은 질문이야, 마침 그런 시장이 있어')],
 "p14":[(1,'C','label','클라우드'),(1,'C','label','1위'),(1,'C','label','2위'),(1,'C','label','3위'),
        (1,'C','speech','주본질: 2년 전엔 둘이었는데 3위가 가장 빨리 커서 셋이 됐어\n조건 ②가 흔들리는 중이지')],
 "p15":[(1,'C','speech','주본질: 그러면 충돌 양쪽 보유가 아니라 바구니 셋으로 바꿔\n33화의 원칙 3이야\n과점은 고정이 아니니까 분기마다 다시 묻는다'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','label','메모리'),(1,'C','label','HBM'),(1,'C','label','DRAM'),(1,'C','label','삼성전자'),(1,'C','label','SK하이닉스'),
        (1,'C','speech','한실속: 두 번째 실습은 제 업계, 메모리입니다\n두 회사가 두 줄에 다 걸쳐 있어요')],
 "p17":[(1,'C','label','마이크론'),(1,'C','label','원칙 9 + 원칙 6'),
        (1,'C','speech','한실속: 그래서 양쪽을 들되 메모는 두 줄입니다\nHBM 줄은 원칙 9, DRAM 줄은 원칙 6')],
 "p18":[(1,'C','speech','한실속: 17화에서 배운 대로 HBM은 검증에 묶여서 영장류 쪽이고\nDRAM은 규격이 같아서 킹덤이에요\n한 회사 안에 두 정글이 있는 거죠'),
        (2,'C','narr','검증에 묶인 메모리, 17화의 그림')],
 "p19":[(1,'C','speech','한탕수: 그럼 저 작은 카드 3위는요?\n셋이 됐으니 클라우드처럼 바구니예요?'),
        (2,'C','speech','주본질: 아니, 저 회사는 점유율을 지키는 전략이지 치고 올라오는 전략이 아니야\n조건 ②는 아직 유지돼, 숫자는 해설에')],
 "p20":[(1,'C','narr','두 줄'),
        (2,'C','speech','한실속: 제 업계를 제 손으로 분류하니 이상하게 후련하네요')],
 "p21":[(1,'C','speech','고비전: 모델 회사들도 충돌 아닌가요?\n선두 둘이 세계를 양분하고 있잖아요'),
        (2,'C','speech','주본질: 그건 충돌이 아니라 바구니야')],
 "p22":[(1,'C','label','비상장 후보 → 지분 가진 상장사 · 특화 ETF'),
        (1,'C','speech','주본질: 결판 전이고, 아직 상장도 안 했어\n33화에서 한 대로 지분을 가진 상장사나 특화 ETF로 바구니에 담지')],
 "p23":[(1,'C','speech','주본질: 충돌은 토네이도가 지나고 둘만 남았을 때의 이야기야\n모델 회사들은 아직 셋 넷이 뛰고 있어'),
        (2,'C','speech','주본질: 그리고 곧 상장한다지만\n상장 직후는 13화의 정점이기 쉬워, 그때 들어가는 게 제일 위험해')],
 "p24":[(1,'C','speech','최신상: 저는 벌써 세 회사 모델 다 쓰고 있는데요'),
        (2,'C','speech','주본질: 그러니까 네가 기술애호가지\n실용주의자가 하나로 모일 때까지 기다리는 거야')],
 "p25":[(1,'C','speech','주본질: 오늘도 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p26":[(1,'C','speech','한탕수: 그런데 둘 다 사면 한쪽은 꼭 떨어지잖아요\n그럼 반은 손해 아니에요?'),
        (2,'C','narr','주본질이 막대 두 개를 그렸다')],
 "p27":[(1,'C','speech','주본질: 떨어진 쪽의 몫을 이긴 쪽이 가져가\n회사 둘을 사는 게 아니라 카테고리 하나를 사는 거야'),
        (2,'C','think','나배움: 종목이 아니라 카테고리, 또 그 말이다')],
 "p28":[(1,'C','speech','나배움: 사는 법, 들고 있는 법은 이제 알겠어요\n그런데 파는 건 언제 배워요?'),
        (2,'C','speech','주본질: 다음 시간이야\n파는 이유는 다섯 개뿐이라는 걸 보여 줄게')],
 "p29":[(1,'C','narr','의자 두 개가 나란히 남았다')],
 "p30":[(1,'C','caption','Episode 35 끝 · 다음 화 · 매도의 기술: 이때만 판다\n(파는 이유는 다섯 개뿐 · 뉴스에서 잡음을 거르는 체)')],
}

BANDS = {
 "p04":'원칙 9 · 고릴라 충돌 시 결판까지 보유 · 양쪽 다 보유는 헷지가 아니라 정공법',
 "p06":'진짜 충돌인가 세 조건 · ① 둘 다 4기준 통과 ② 고객 기반과 쓰임이 갈린다 ③ 한쪽이 무너지면 시장이 위험',
 "p11":'양쪽 보유 · 같은 높이로 들고, 대체 위협 3단계가 한쪽에서 켜지면 그쪽으로 옮긴다',
 "p14":'과점은 고정이 아니다 · 셋이 되면 충돌 양쪽 보유가 아니라 바구니 셋(원칙 3)',
 "p17":'메모리 · HBM 줄은 원칙 9, DRAM 줄은 원칙 6 · 한 회사 안의 두 정글',
 "p23":'충돌은 토네이도 뒤에 둘만 남았을 때 · 결판 전 비상장 후보는 바구니 · 상장 직후는 정점 주의',
}

NOTES = {
 "p04":'해설: Moore 원칙 9 원문: "In a gorilla collision, hold your candidates until there has been a definitive outcome." 두 고릴라 후보가 같은 카테고리에서 충돌할 때는 결정적 결과가 날 때까지 후보를 보유한다. 28화의 과점 예외와 짝을 이루는 원칙이다',
 "p06":'해설: 세 조건은 28화의 과점 예외 판별 기준이다. 사실 확인: 미국 카드 구매액 기준 Visa와 Mastercard의 합산 점유율은 약 87%(Nilson Report 2025년 연간, Visa 단독 약 70%)다. 스테이블코인이 장기 위협이라는 서사는 있으나 카드 거래량을 실제로 잠식했다는 데이터는 2026-10 기준 확인되지 않는다',
 "p11":'해설: 양쪽 보유 시뮬레이션은 가상의 예시이며 특정 종목의 매수를 권하지 않는다. 비중을 같은 높이로 두는 것은 "누가 이길지 모른다"는 전제의 표현이고, 결판의 신호(29화 대체 위협 3단계)가 한쪽에서 켜지면 비중을 옮긴다',
 "p14":'사실 확인: 2026년 2분기 클라우드 인프라 점유율은 1위 약 28%, 2위 약 20%, 3위 약 15%이며 3위의 성장률(약 82%)이 가장 높다(Synergy Research, 2026-10 기준, 작화 시 갱신). 2년 전의 "양강" 구도가 "3강으로 변하는 중"이라 조건 ②의 유지 여부를 분기마다 확인한다',
 "p17":'사실 확인: 2026년 HBM 점유율 전망은 SK하이닉스 과반, 삼성전자 약 30%, 마이크론 약 20%(업계 조사 종합, 2026-10 기준). 마이크론은 HBM 점유율을 자사 DRAM 점유율 수준(20%대)으로 유지하는 전략을 공식화해, 3위가 치고 올라오는 구도(클라우드)와는 다르다. 표준 DRAM은 17화의 결론대로 킹덤이라 원칙 6을 함께 적용한다',
 "p23":'사실 확인: 파운데이션 모델 선두 두 회사는 2026-10 현재 모두 비상장이나 상장 신청을 마쳤다(한 곳은 2026년 11월, 한 곳은 2027년 목표로 보도). 한 곳은 소비자 시장(주간 사용자 약 12억), 한 곳은 기업·API 시장이 중심이고, 3위의 앱 사용자는 약 10억으로 아직 셋 넷이 경쟁한다. 상장 직후는 13화의 과잉 기대 정점이 되기 쉽다',
 "p27":'해설: 원칙 9의 요점은 회사 둘을 사는 것이 아니라 카테고리 하나를 사는 것이다. 한쪽이 지면 그 몫은 사라지지 않고 이긴 쪽으로 이동한다. 본 만화는 특정 종목·ETF의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
