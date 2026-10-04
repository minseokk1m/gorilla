#!/usr/bin/env python3
# 고릴라 헌터스 Ep25 "AI 가치사슬 대해부: 층마다 고릴라가 다르다" — 시즌 3 (32p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep25 · v4 Ep25(NVIDIA 공급망 지도)·클라우드 DC vs AI DC·김정호 건축 3분업 계승
# 검토자 반영: 김경윤("턴키 시공사" → "종합 설계사"), 김선일(Broadcom은 반도체 카테고리). 팩트: season34-facts.md A1·A9·A10·A14(2026-10-04)
# usage: python3 gen_ep25.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP25"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep25")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP25 NOTE: the supply-chain MAP is always a large sheet of kraft paper pinned over the whiteboard, hand-drawn in marker, with EXACTLY the box titles and company-name cards specified and nothing else; "
               "company names appear ONLY as clean lettered cards, NEVER real logos, real product photos or real executives' faces. The study room has NO server racks, NO data-center photos.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the map holding the marker is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and every speech balloon on this page whose speaker is NA BAE-UM has its tail pointing at HIM; "
           "JU BON-JIL (grey hair, glasses, navy knit) sits at the table and does NOT present (a grey-haired man at the map would be WRONG). ")

MAP_T = ("a large hand-drawn SUPPLY-CHAIN MAP on a big sheet of kraft paper pinned over the whiteboard: a 2-by-4 grid of eight boxes, each with ONE title lettered at its top, "
         "top row left to right '연산', '파운드리', '메모리', '장비', bottom row left to right '패키징', '통신', '전원·방열', 'PCB·ODM'")
MAP_HW = (MAP_T + "; inside the boxes ONLY these small white company-name cards: the '연산' box holds 'NVIDIA'; the '파운드리' box holds 'TSMC' and '삼성전자'; the '메모리' box holds 'SK하이닉스', '삼성전자' and '마이크론'; "
          "the '장비' box holds 'ASML'; the '패키징' box holds 'ASE' and 'Amkor'; the '통신' box holds 'Coherent' and 'Amphenol'; the '전원·방열' box holds 'Vertiv'; the 'PCB·ODM' box holds 'Flex' and 'Jabil'; nothing else is written on the map")
MAP_SW = (MAP_HW + "; ABOVE the eight-box grid two long horizontal bands are drawn stacked on top of it, the lower band lettered '④ 모델' and the upper band lettered '⑤ 앱·에이전트', with NO other text inside the bands")
GOR_TOP = (MAP_HW + "; a small round STICKER is pinned inside each box of the TOP row only, each sticker with ONE short label: the '연산' sticker reads '고릴라', the '파운드리' sticker reads '고릴라', "
           "the '메모리' sticker reads '고릴라 후보 / 영주', the '장비' sticker reads '고릴라'; the four BOTTOM-row boxes have NO sticker at all")
GOR_MAP = (MAP_HW + "; a small round STICKER is pinned inside every box, each with ONE short label: '연산' reads '고릴라', '파운드리' reads '고릴라', '메모리' reads '고릴라 후보 / 영주', '장비' reads '고릴라', "
           "'패키징' reads '영주', '통신' reads '기사', '전원·방열' reads '영주', 'PCB·ODM' reads '소작농'")
DC2 = ("a hand-drawn two-column table on the whiteboard with column headers '클라우드 DC' and 'AI DC', three row labels down the left '진영', '단계', '메모리', and cell texts row by row "
       "'클라우드 회사들' / '모델 회사들이 수요 폭발' ; '캐즘 넘는 중' / '계측 전' ; '표준 DRAM 끝물' / 'HBM 새 사이클'; every cell filled exactly, nothing else on the board")
BUILD4 = ("a hand-drawn row of four small house-shaped boxes on the whiteboard under the heading '집 짓기 네 가지', each house with a role label on its roof and ONE company-name card inside: "
          "'설계 전문' with 'Broadcom', '시공 전문' with 'TSMC', '종합 설계사' with 'NVIDIA', '토탈 솔루션' with '삼성전자'; nothing else on the board")
ENERGY = ("the whiteboard shows ONLY a hand-drawn five-tier cake with NO tier labels, a small electric plug sketch under the bottom tier, and the single line '전기가 없으면 케이크가 안 구워진다' written beneath")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a vast hand-drawn map seen from above, its land divided into irregular regions by inked borders, and on several regions a small gorilla silhouette stands, each one a different size; a magnifying glass rests on one corner of the map; NO readable text anywhere in the illustration. The bottom quarter of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL unrolling a large blank sheet of kraft paper on the long table, the whole group leaning in curious; the whiteboard behind is completely BLANK; the sheet is BLANK. (2 ~45%) HAN TANG-SU (red cap) peeking over the edge of the blank sheet, comic.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL holding up one finger, the blank kraft sheet still on the table; NA BAE-UM attentive. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL pinning the big kraft sheet over the whiteboard with four magnets; the sheet is completely BLANK (no lines yet). (2 ~45%) HAN SIL-SOK (knit vest, glasses) adjusting his glasses with a small smile.",
 "p05":f"One panel (~100%). {MAP_T}; every box is completely EMPTY inside (no company names yet); JU BON-JIL to the side with the marker; ONLY these eight titles are written.",
 "p06":f"One panel (~100%). {MAP_T}; inside the boxes ONLY these cards so far: the '연산' box holds 'NVIDIA', the '파운드리' box holds 'TSMC' and '삼성전자', the '장비' box holds 'ASML'; the other five boxes are completely EMPTY inside; JU BON-JIL pointing at the '연산' box; nothing else written.",
 "p07":f"One panel (~100%). {MAP_T}; inside the boxes ONLY these cards so far: '연산' holds 'NVIDIA'; '파운드리' holds 'TSMC' and '삼성전자'; '장비' holds 'ASML'; '메모리' holds 'SK하이닉스', '삼성전자' and '마이크론'; '패키징' holds 'ASE' and 'Amkor'; the '통신', '전원·방열' and 'PCB·ODM' boxes are completely EMPTY inside; HAN SIL-SOK (knit vest, glasses) standing beside the map pointing at the '메모리' box, his balloon tail pointing at him; JU BON-JIL seated; nothing else written.",
 "p08":f"One panel (~100%). {MAP_HW}; JU BON-JIL finishing the last card in the 'PCB·ODM' box; the group watching; ONLY the titles and cards listed.",
 "p09":f"Two panels. (1 ~60%) wide shot pulling back: the full map ({MAP_HW}) fills the wall, the eight members small in front of it; NO other text. (2 ~40%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p10":f"One panel (~100%). {MAP_SW}; JU BON-JIL drawing the upper band; ONLY the titles, cards and the two band labels.",
 "p11":f"Two panels. (1 ~55%) GO BI-JEON (navy suit, tablet under arm (screen OFF)) asking a question from the table; the map behind shows {MAP_SW}. (2 ~45%) JU BON-JIL tapping the upper band labeled '⑤ 앱·에이전트' with the marker, a serious look.",
 "p12":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '지도 = 반도체 여덟 칸 + 소프트웨어 두 층' / '에이전트가 앱을 흔든다 → 대체 신호 후보'. (2 ~45%) NA BAE-UM's thoughtful face, plain background.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL holding out the marker to NA BAE-UM, a sheet of small round blank stickers in his other hand; the map behind is out of focus with no readable text. (2 ~45%) NA BAE-UM standing up, taking the marker and the stickers, determined.",
 "p14":f"One panel (~100%). {LOCK_NB}The map shows {GOR_TOP}; NA BAE-UM pressing the sticker onto the '장비' box; ONLY the titles, cards and the four top-row sticker labels.",
 "p15":f"One panel (~100%). {LOCK_NB}The map shows {GOR_MAP}; NA BAE-UM stepping back from the map, all eight stickers in place; ONLY the titles, cards and the eight sticker labels.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL applauding once from the table, pleased; the map behind shows {GOR_MAP}. (2 ~45%) HAN SIL-SOK (knit vest, glasses) raising a hand with a realization, his balloon tail pointing at him.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL answering with a knowing half-smile beside the map which shows {GOR_MAP}. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p18":f"One panel (~100%). The kraft map has been rolled up and leans in the corner; the whiteboard shows {DC2}; JU BON-JIL to the side; AN MID-EO (flip phone) frowning at the table; ONLY the table labels.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL explaining the first two rows beside the whiteboard which shows {DC2}; SHIN JUNG-HAE (cardigan) listening carefully. (2 ~45%) close on JU BON-JIL's hand tapping the cell '계측 전'.",
 "p20":f"Two panels. (1 ~55%) JU BON-JIL pointing at the third row of the whiteboard which shows {DC2}; HAN SIL-SOK nodding with recognition, his balloon tail pointing at him. (2 ~45%) a small inset in the SAME inked style: HAN SIL-SOK at a whiteboard in an earlier lesson with two crossing hand-drawn curves and NO text, soft tone.",
 "p21":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '같은 건물, 다른 사이클' / '클라우드 DC는 캐즘, AI DC는 계측 전'. (2 ~45%) SHIN JUNG-HAE (cardigan) shaking her head slowly in wonder, her balloon tail pointing at her.",
 "p22":f"One panel (~100%). The whiteboard shows {BUILD4}; JU BON-JIL to the side; ONLY these labels and cards.",
 "p23":f"Two panels. (1 ~55%) JU BON-JIL pointing at the first two houses of the whiteboard which shows {BUILD4}; NA BAE-UM copying. (2 ~45%) close on the two houses '설계 전문' with 'Broadcom' and '시공 전문' with 'TSMC', the marker tip between them.",
 "p24":f"Two panels. (1 ~55%) JU BON-JIL pointing at the third and fourth houses of the whiteboard which shows {BUILD4}; GO BI-JEON nodding. (2 ~45%) close on the two houses '종합 설계사' with 'NVIDIA' and '토탈 솔루션' with '삼성전자'.",
 "p25":f"Two panels. (1 ~55%) JU BON-JIL drawing a small arrow joining the '설계 전문' house and the '시공 전문' house on the whiteboard which shows {BUILD4} plus that one small arrow; HAN SIL-SOK speaking from the table, his balloon tail pointing at him. (2 ~45%) close on HAN SIL-SOK, a fond memory.",
 "p26":f"Two panels. (1 ~55%) HAN TANG-SU (red cap) asking eagerly, phone in hand with its screen OFF; the whiteboard behind shows {BUILD4}. (2 ~45%) JU BON-JIL holding up a finger, patient.",
 "p27":f"One panel (~100%). {ENERGY}; JU BON-JIL to the side; ONLY that one line of text.",
 "p28":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {ENERGY}; AN MID-EO grudgingly nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '한 종목이 아니라 지도' / '칸마다 고릴라가 다르다' / '같은 DC도 사이클이 다르다'.",
 "p30":"Two panels, quiet beat. (1 ~60%) evening, the others leaving; NA BAE-UM alone unrolling the kraft map again on the table, looking at it; the map shows the eight box titles '연산', '파운드리', '메모리', '장비', '패키징', '통신', '전원·방열', 'PCB·ODM' and nothing else legible (cards too small to read). (2 ~40%) NA BAE-UM's face, a new question forming.",
 "p31":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL turning back with the hook, exactly ONE balloon, NO reply balloon.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}a tall tower of stacked chips glowing faintly in a dark hall, a second tower just beginning to rise beside it; NA BAE-UM and JU BON-JIL as small silhouettes looking up; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 25\nAI 가치사슬 대해부\n한 종목이 아니라 지도를 본다\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','주본질: 오늘은 보드가 좁아서\n종이를 가져왔어'),
        (2,'C','think','한탕수: 아무것도 없는데…')],
 "p03":[(1,'C','speech','주본질: 지난주 그 회사 실적 발표 봤지\n숫자 하나가 어디로 퍼지는지 볼 거야'),
        (2,'C','think','나배움: 한 회사가 아니라 퍼지는 길을 본다고?')],
 "p04":[(1,'C','narr','종이가 보드를 덮었다'),
        (2,'C','speech','한실속: 지도네요')],
 "p05":[(1,'C','speech','주본질: 여덟 칸, 칸마다 하는 일이 달라\n먼저 칸 이름만 적자')],
 "p06":[(1,'C','speech','주본질: 연산은 그 회사 하나\n칩을 찍어 주는 게 파운드리, 찍는 기계가 장비야\n이 세 칸이 지도의 척추지')],
 "p07":[(1,'C','speech','한실속: 메모리는 세 회사예요\n제 업계니까 이건 제가 쓸게요'),
        (1,'C','speech','주본질: 그리고 칩을 포장하고 시험하는 패키징')],
 "p08":[(1,'C','speech','주본질: 칩을 잇고, 식히고, 보드에 얹는 칸들\n이름은 낯설어도 다 돈이 흐르는 길이야')],
 "p09":[(1,'C','narr','여덟 칸이 벽 하나를 채웠다'),
        (2,'C','think','나배움: 한 회사가 아니라 길이구나')],
 "p10":[(1,'C','label','④ 모델'),(1,'C','label','⑤ 앱·에이전트'),
        (1,'C','speech','주본질: 그 위에 소프트웨어 두 층\n모델, 그리고 앱과 에이전트')],
 "p11":[(1,'C','speech','고비전: 요즘 앱 회사들 주가가 많이 흔들리던데요'),
        (2,'C','speech','주본질: 챗봇에서 에이전트로 넘어가면서\n전통 소프트웨어가 흔들려\n그건 왕좌의 균열 때 다시 보자')],
 "p12":[(1,'C','narr','두 줄'),
        (2,'C','think','나배움: 위층이 흔들리면 아래층은 어떻게 되지')],
 "p13":[(1,'C','speech','주본질: 이제 네 차례야\n칸마다 물어봐, 여기 고릴라는 누구지?'),
        (2,'C','think','나배움: 스티커 여덟 장')],
 "p14":[(1,'C','speech','나배움: 연산, 파운드리, 장비는 고릴라\n따라 하려면 처음부터 다시 만들어야 하니까요\n메모리는 HBM이면 고릴라 후보, DRAM이면 영주')],
 "p15":[(1,'C','speech','나배움: 패키징과 전원은 영주, 통신은 기사\nODM은 소작농이에요, 누구나 대체되니까')],
 "p16":[(1,'C','speech','주본질: 완벽해\n칸마다 고릴라가 다르다, 그게 오늘의 문장이야'),
        (2,'C','speech','한실속: 그래서 ETF가 지도를 통째로 담는 거군요')],
 "p17":[(1,'C','speech','주본질: 담긴 하지\n그런데 통째로 담으면 생기는 역설이 있어\n이번 시즌 마지막에 보자'),
        (2,'C','think','나배움: 통째로 담는데 역설이라니')],
 "p18":[(1,'C','speech','안믿어: 같은 데이터센터 아니오?\n왜 둘로 나누시오'),
        (1,'C','speech','주본질: 아니, 다른 사이클이야')],
 "p19":[(1,'C','speech','주본질: 클라우드 데이터센터는 회사들이 서버를 옮기는 중\n캐즘을 넘느냐의 문제지\nAI 데이터센터는 모델 회사들이 수요를 터뜨렸는데 아직 재지도 못했어'),
        (2,'C','narr','계측 전')],
 "p20":[(1,'C','speech','주본질: 그래서 메모리가 갈려\n클라우드 시대의 표준 DRAM은 끝물이었는데\nAI 데이터센터가 새 사이클을 열었지'),
        (1,'C','speech','한실속: 10화에서 제가 그린 교차 도식이 이거였군요'),
        (2,'C','narr','두 곡선이 다시 떠올랐다')],
 "p21":[(1,'C','narr','두 줄'),
        (2,'C','speech','신중해: 같은 건물인데 다른 사이클이라니')],
 "p22":[(1,'C','label','집 짓기 네 가지'),
        (1,'C','speech','주본질: 지도 다음은 짓는 법이야\n어떤 교수가 집 짓기에 빗댔는데 이게 제일 쉬워')],
 "p23":[(1,'C','speech','주본질: 설계만 하는 회사가 있고, 시공만 하는 회사가 있어\n설계도를 주면 만들어 드려요, 그게 파운드리야'),
        (2,'C','narr','설계와 시공')],
 "p24":[(1,'C','speech','주본질: 설계와 시스템 조립을 맡고 제조는 파운드리에 맡기는 종합 설계사\n그리고 파운드리에 메모리에 패키징까지 혼자 하는 토탈 솔루션'),
        (2,'C','narr','종합 설계사와 토탈 솔루션')],
 "p25":[(1,'C','speech','주본질: 설계와 시공이 만나면 집 한 채\n완전완비제품은 혼자 짓거나 동맹으로 짓는다, 지난 시간 그대로야'),
        (1,'C','speech','한실속: 저희 회사가 집 지을 때 딱 그랬어요\n설계사 따로, 시공사 따로'),
        (2,'C','narr','실용주의자의 경험담')],
 "p26":[(1,'C','speech','한탕수: 그럼 집 짓는 회사 다 사요?'),
        (2,'C','speech','주본질: 칸마다 등급이 다르다니까\n시공 전문은 고릴라, 설계 전문은 반도체 칸의 영주 후보\n지도에 붙인 스티커를 봐')],
 "p27":[(1,'C','label','전기가 없으면 케이크가 안 구워진다'),
        (1,'C','speech','주본질: 마지막으로 케이크 맨 아래 층\n전기가 없으면 케이크가 안 구워져')],
 "p28":[(1,'C','speech','주본질: 데이터센터를 지을 땅보다 전기가 먼저 모자라\n전원과 방열 칸이 영주인 이유야\n고릴라는 아니지만 줄을 서게 만들거든'),
        (2,'C','think','나배움: 맨 아래 층이 병목이 될 수도 있구나')],
 "p29":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p30":[(1,'C','narr','지도를 다시 펼쳤다'),
        (2,'C','think','나배움: 이 지도의 심장은 어디지')],
 "p31":[(1,'C','speech','나배움: 다음 시간은요?'),
        (2,'C','speech','주본질: 지도의 심장, 메모리\n지금 전쟁이 한창이야')],
 "p32":[(1,'C','caption','Episode 25 끝 · 다음 화 · 메모리 전쟁: HBM에서 HBF로\n(메모리가 연산을 삼킨다는 관점, 사이클의 교차, 다음 고릴라의 탄생)')],
}

BANDS = {
 "p05":'가치사슬 지도 · 반도체 공급망 여덟 칸: 연산 · 파운드리 · 메모리 · 장비 · 패키징 · 통신 · 전원·방열 · PCB·ODM',
 "p15":'칸마다 고릴라가 다르다 · 연산·파운드리·장비 = 고릴라 · HBM = 고릴라 후보, DRAM = 영주 · 패키징·전원 = 영주 · 통신 = 기사 · ODM = 소작농',
 "p18":'클라우드 DC vs AI DC · 같은 건물, 다른 사이클 · 클라우드 DC는 캐즘을 넘느냐, AI DC는 계측 전',
 "p22":'집 짓기 네 가지 · 설계 전문 · 시공 전문 · 종합 설계사 · 토탈 솔루션 · 설계와 시공이 만나면 집 한 채 = 완전완비제품',
 "p27":'① 에너지 층 · 전기가 없으면 케이크가 안 구워진다 · 전원·방열 칸이 영주인 이유',
}

NOTES = {
 "p05":'해설: 이 지도는 NVIDIA 실적 발표의 파급 경로를 그린 공급망 지도(moomoo "NVIDIA\'s Big Moment")를 본 만화가 여덟 칸으로 재구성한 개념 지도다(v4 기획서). 칸 구분과 회사 배치는 2026-10 기준 예시이며 작화 시 갱신한다. 특정 종목의 매수·매도를 권하지 않는다',
 "p06":'사실 확인: NVIDIA의 2026 회계연도 2분기(2026년 7월 말 종료) 매출은 약 962억 달러, 그중 데이터센터가 약 890억 달러(92%)였다. 2026년 AI 가속기 점유율은 공식 통계가 없고 리서치별로 70~85%로 갈려 본 만화는 "약 75~80%(추정)"로 표기한다. ASML은 EUV 노광장비를 사실상 독점하며 2026년 매출 가이던스를 430~450억 유로로 올렸다. TSMC는 2026년 2분기 매출 396억 달러, AI 가속기가 매출의 약 3분의 1이다(2026-10-04 기준, 작화 시 갱신)',
 "p07":'사실 확인: 2026년 HBM 점유율 전망은 SK하이닉스 54~60%, 삼성전자 28~30%, 마이크론 17~20%이며 세 회사 모두 HBM4를 양산한다. 마이크론은 2026 회계연도 매출 1,332억 달러로 역대 최고를 기록했다. 패키징·테스트는 ASE·Amkor 등 전문 업체가 맡는다(2026-10-04 기준)',
 "p08":'해설: 통신 칸은 광모듈(Coherent 등)과 커넥터(Amphenol 등), 전원·방열 칸은 냉각·전원 장비(Vertiv 등), PCB·ODM 칸은 기판과 서버 조립(Flex·Jabil 등)이다. 모두 2026년 AI 투자 확대의 수혜를 받지만, 경쟁자가 같은 규격으로 만들 수 있어 대부분 킹덤 정글에 속한다. 약어: ODM은 주문자 설계 생산(위탁 설계·제조), PCB는 인쇄회로기판',
 "p11":'사실 확인: 2026년 2월 한 AI 회사가 업무용 에이전트 도구를 공개한 직후 이틀 만에 소프트웨어 기업 시가총액 약 2,850억 달러가 증발해 언론이 "SaaS포칼립스"라 불렀다. 좌석당 과금 모델이 에이전트에 위협받는다는 논쟁이 이어지고 있으며 "과매도"라는 반론도 있다(2026-10-04 기준). 에이전트가 앱을 대체하는지는 29화의 대체 위협 3단계로 다시 본다',
 "p14":'해설: 칸마다 붙인 등급 스티커는 15~17화의 6등급(영장류: 고릴라·침팬지·원숭이 / 킹덤: 영주·기사·소작농)을 본 만화가 2026-10 기준으로 적용한 예시이지 기업 평가가 아니다. 메모리 칸은 17화 결론대로 HBM(검증 종속으로 전환비용 높음)과 표준 DRAM(공통 규격)을 나누어 본다',
 "p18":'해설: 클라우드 데이터센터(기존)와 AI 데이터센터(신규)를 다른 제품 사이클로 보는 틀은 v4 기획서를 따른다. 클라우드 DC는 기업들이 온프레미스 서버를 옮기는 중이라 "캐즘을 넘느냐"의 단계이고, AI DC는 모델 회사들이 수요를 폭발시켰으나 아직 초기시장인지 캐즘을 넘었는지 계측되지 않았다. 2026년 2분기 클라우드 인프라 시장은 1,434억 달러(+43%)로 8년 내 최고 성장률을 기록했다(Synergy, 2026-10-04 기준)',
 "p24":'해설: "집 짓기" 비유는 김정호 KAIST 교수가 AI 반도체 산업을 건축업에 빗댄 강의를 본 만화가 재구성한 것이다. 검토 의견(TSMC 없이는 NVIDIA도 칩을 만들 수 없다)을 반영해 NVIDIA를 "턴키 시공사"가 아니라 "설계와 시스템 조립을 맡고 제조는 파운드리에 맡기는 종합 설계사"로 표현했다. Broadcom은 2026 회계연도 3분기 AI 반도체 매출 167억 달러(+221%)로 빅테크 커스텀 칩 설계를 맡으며, 분류상 소프트웨어가 아니라 반도체 카테고리다. 삼성전자는 파운드리·메모리·패키징을 한 회사가 갖추고 있으나 2나노 공정 지연이 보도됐다(2026-10-04 기준)',
 "p27":'사실 확인: 모건스탠리는 2026~28년 미국 데이터센터 신규 전력 수요 68GW 가운데 공급이 확보된 30GW를 빼면 약 38GW가 부족하다고 추정했다(2026-08). 2026년 완공 예정 12GW 중 약 7GW가 지연됐고, 냉각·전원 장비 업체 Vertiv의 수주잔고는 150억 달러를 넘었다(2026-10-04 기준). 전력은 젠슨 황의 5단 케이크(10화·24화) 맨 아래 층이다',
}

if __name__ == "__main__": run(globals())
