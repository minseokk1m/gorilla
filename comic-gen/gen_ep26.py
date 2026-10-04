#!/usr/bin/env python3
# 고릴라 헌터스 Ep26 "메모리 전쟁: HBM에서 HBF로" — 시즌 3 (32p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep26 · v4 Ep26(메모리가 GPU를 삼킨다·사이클 교차·HBF) 계승 · Ep10 교차 도식·Ep17 DRAMCARD 회수
# 팩트: season34-facts.md A4·A5·A11·A13(2026-10-04). HBF = OCP 규격 2026-08 공개, 샘플 2027·양산 2028. 실존 인물은 그리지 않고 해설에만 실명
# usage: python3 gen_ep26.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP26"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep26")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP26 NOTE: memory chips are drawn as simple stacked rectangular blocks, never real product photos; company names appear ONLY as clean lettered cards on the whiteboard, NEVER real logos or real executives' faces. "
               "HAN TANG-SU's phone, when specified, shows ONLY a steep green rising line with NO tickers, NO numbers, NO text.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

PYR4 = ("a hand-drawn four-tier PYRAMID on the whiteboard, tiers lettered top to bottom 'SRAM', 'HBM', 'HBF', 'SSD'; on the LEFT of the pyramid an arrow pointing UP with the label '빠름·작음', on the RIGHT an arrow pointing DOWN with the label '큼·느림'; nothing else on the board")
EAT2 = ("a hand-drawn comparison on the whiteboard: LEFT a single large square labeled '연산' with the small note '2~4개'; RIGHT a tall stack of sixteen thin rectangles labeled 'HBM' with the small note '16층'; beneath both the line '면적은 메모리가 더 크다'; nothing else on the board")
VIEW2 = ("a hand-drawn two-column card on the whiteboard titled '두 관점': LEFT column headed '병목은 메모리' with the line '수요가 폭발한다'; RIGHT column headed '공급이 제한' with the line '사이클이 길다'; a small upward arrow under each column; nothing else on the board")
CROSS3 = ("a hand-drawn chart on the whiteboard with a horizontal time axis labeled '시간' and a vertical axis labeled '매출': a low gentle maturing curve labeled 'DRAM', a steep rising curve labeled 'HBM' that crosses above it, and a DOTTED curve labeled 'HBF' just beginning to rise at the far right; the two crossing points marked with small circles; nothing else on the board")
CROSS2 = ("a hand-drawn chart on the whiteboard with a horizontal time axis labeled '시간' and a vertical axis labeled '매출': a low gentle maturing curve labeled 'DRAM' and a steep rising curve labeled 'HBM' that crosses above it, the crossing point marked with a small circle; NO third curve; nothing else on the board")
HBF1 = ("a hand-drawn sketch on the whiteboard: a tall stack of eight thick blocks labeled 'HBF' beside a much shorter stack of eight thin blocks labeled 'HBM', and beneath them the line 'DRAM보다 용량이 훨씬 크다'; nothing else on the board")
HBF1C = (HBF1.replace("; nothing else on the board", "") + "; to the right two small white company-name cards pinned, 'SanDisk' and 'SK하이닉스'; nothing else on the board")
TABLE5 = ("the FIVE-row checklist TABLE titled '초기시장인가, 골짜기를 건넜나' with column headers '초기시장' and '골짜기 건넘', row labels down the left '누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출', and cell texts row by row '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; '없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴' (the fifth row in RED marker)")
TABLE5_HBF = (TABLE5 + "; a small card lettered 'HBF' pinned above the table, and a RED check mark drawn in the LEFT ('초기시장') cell of ALL FIVE rows, the right cells unmarked")
DRAMCARD = ("a hand-drawn five-row check card titled '표준 DRAM · 고릴라 5조건' with rows exactly: '독점 아키텍처 → X (공통 표준)' / '전환비용 → X (대체 가능)' / '네트워크 효과 → X' / '가격 결정권 → X (수급 사이클)' / '완전완비제품 → 해당 없음'; a small memory-chip icon")
MEM3 = ("a hand-drawn three-line card on the whiteboard titled '메모리 재판정' with lines exactly: '표준 DRAM → 킹덤' / 'HBM → 토네이도 속 니치 고릴라 후보' / 'HBF → 초기시장, 아직 등급 없음'; nothing else on the board")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a tall tower of stacked rectangular chips rising from a dark plain, lit from within, and beside it a second, taller tower just beginning to rise, its upper blocks still faint outlines; NO people, NO readable text anywhere in the illustration. The bottom quarter of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL at the table, NOT at the board, gesturing toward HAN SIL-SOK with an open hand; the whiteboard is completely BLANK. (2 ~45%) HAN SIL-SOK (knit vest, glasses) standing up and buttoning his vest, calm and ready, his balloon tail pointing at him.",
 "p03":f"One panel (~100%). {LOCK_HS}The whiteboard shows {PYR4}; HAN SIL-SOK beside it with the marker; ONLY these labels.",
 "p04":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK pointing at the top tier of the whiteboard which shows {PYR4}; NA BAE-UM copying. (2 ~45%) CHOI SIN-SANG (headphones around neck) raising a hand, puzzled, his balloon tail pointing at him.",
 "p05":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK tapping the third tier 'HBF' of the whiteboard which shows {PYR4}, the tier drawn as a dotted outline; the group curious. (2 ~45%) close on the dotted 'HBF' tier of the pyramid.",
 "p06":f"One panel (~100%). {LOCK_HS}The whiteboard shows {EAT2}; HAN SIL-SOK to the side; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK explaining beside the whiteboard which shows {EAT2}, one hand spanning the tall stack. (2 ~45%) close on the tall sixteen-block stack labeled 'HBM' next to the single square labeled '연산'.",
 "p08":f"Two panels. (1 ~55%) JU BON-JIL speaking from the table beside the whiteboard which shows {EAT2}; HAN SIL-SOK nodding at the board. (2 ~45%) close on HAN SIL-SOK (black hair, glasses, knit vest), his balloon tail pointing at him.",
 "p09":f"Two panels. (1 ~55%) JU BON-JIL standing up and raising one finger, a but coming; the whiteboard behind shows {EAT2}. (2 ~45%) AN MID-EO (flip phone) leaning in with sudden interest, exactly ONE balloon, NO reply balloon.",
 "p10":f"One panel (~100%). The whiteboard shows {VIEW2}; JU BON-JIL to the side; HAN SIL-SOK now seated; ONLY these labels.",
 "p11":f"Two panels. (1 ~55%) JU BON-JIL pointing at the RIGHT column of the whiteboard which shows {VIEW2}; GO BI-JEON nodding. (2 ~45%) close on the two small upward arrows under the two columns of the card.",
 "p12":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone) objecting from the table, his balloon tail pointing at him; the whiteboard behind shows {VIEW2}. (2 ~45%) JU BON-JIL answering calmly, exactly ONE balloon.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '두 관점, 같은 방향, 다른 끝' / '언제 끝나는지가 투자 질문'. (2 ~45%) NA BAE-UM's focused face, plain background.",
 "p14":f"One panel (~100%). The whiteboard shows {CROSS2}; JU BON-JIL drawing the HBM curve; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {CROSS2}; HAN SIL-SOK speaking from the table with recognition, his balloon tail pointing at him. (2 ~45%) a small inset in the SAME inked style, soft tone: HAN SIL-SOK at a whiteboard in an earlier lesson drawing two crossing curves, NO readable text.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL turning back to the board which shows {CROSS2}, marker raised toward the empty far right of the chart. (2 ~45%) close on the marker tip beginning a dotted line at the far right of the chart, no new label yet.",
 "p17":f"One panel (~100%). The whiteboard shows {CROSS3}; JU BON-JIL to the side; NA BAE-UM's eyes wide; ONLY these labels.",
 "p18":"Two panels. (1 ~55%) HAN TANG-SU (red cap) jumping up holding his phone toward JU BON-JIL, the screen showing ONLY a steep green rising line (no text, no numbers); the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL glancing at the phone, unimpressed but kind.",
 "p19":"Two panels. (1 ~55%) JU BON-JIL drawing ONLY a small tide sketch on a corner of the whiteboard: a shoreline with a high-water line and a low-water line, NO text; HAN TANG-SU deflating. (2 ~45%) SHIN JUNG-HAE (cardigan) writing in the log, the recorder role.",
 "p20":f"One panel (~100%). {LOCK_HS}The whiteboard shows {HBF1}; HAN SIL-SOK beside it; ONLY these labels.",
 "p21":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK pinning two cards beside the sketch on the whiteboard which shows {HBF1C}. (2 ~45%) CHOI SIN-SANG (headphones) excited, phone in hand with its screen OFF, his balloon tail pointing at him.",
 "p22":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK answering CHOI SIN-SANG with a careful correcting gesture beside the whiteboard which shows {HBF1C}. (2 ~45%) JU BON-JIL from the table pointing at NA BAE-UM's notebook, exactly ONE balloon.",
 "p23":f"One panel (~100%). {LOCK_HS}The whiteboard shows {TABLE5_HBF}; HAN SIL-SOK drawing the last red check in the fifth row; ONLY the table labels, the 'HBF' card and the five red checks.",
 "p24":f"Two panels. (1 ~55%) JU BON-JIL asking NA BAE-UM from the table; the whiteboard behind shows {TABLE5_HBF}. (2 ~45%) NA BAE-UM (black hair, no glasses, charcoal shirt) answering from his seat, confident, his balloon tail pointing at him.",
 "p25":f"Two panels. (1 ~55%) JU BON-JIL at the board again, the table now erased, holding up a small card; the whiteboard is completely BLANK. (2 ~45%) a small inset in the SAME inked style, soft tone: the whiteboard from an earlier lesson showing {DRAMCARD}; no people.",
 "p26":"Two panels. (1 ~55%) JU BON-JIL drawing ONLY a stacked memory chip bolted onto a large square chip with a small padlock icon on the bolt and the single label '검증에 묶인다'; NA BAE-UM nodding. (2 ~45%) close on the padlock and the label '검증에 묶인다'.",
 "p27":f"One panel (~100%). The whiteboard shows {MEM3}; JU BON-JIL to the side; the group attentive; ONLY these labels.",
 "p28":f"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) speaking from the table beside the whiteboard which shows {MEM3}, his balloon tail pointing at him; JU BON-JIL pleased. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '병목인가 공급인가, 두 관점' / '곡선이 셋, 교체가 눈앞' / 'HBF는 초기시장, 바구니 관찰'.",
 "p30":"Two panels. (1 ~55%) HAN TANG-SU (red cap) asking again, hopeful, phone screen OFF; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL holding up a feather he picked from the desk, dry humor, exactly ONE balloon.",
 "p31":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL turning back with the hook, exactly ONE balloon, NO reply balloon.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}a long road stretching to the horizon with five faint milestones along it and a storm cloud far at the end; NA BAE-UM and JU BON-JIL as small silhouettes at the near end of the road; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 26\n메모리 전쟁: HBM에서 HBF로\n다음 고릴라가 태어나는 현장\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','주본질: 오늘은 지도의 심장, 메모리\n그런데 발표는 내가 안 해'),
        (2,'C','speech','한실속: 제 회사 일이니까 제가 하겠습니다')],
 "p03":[(1,'C','label','SRAM'),(1,'C','label','HBM'),(1,'C','label','HBF'),(1,'C','label','SSD'),
        (1,'C','speech','한실속: 메모리는 피라미드예요\n위로 갈수록 빠르고 작고, 아래로 갈수록 크고 느려요')],
 "p04":[(1,'C','speech','한실속: 맨 위는 연산 칩 안에 든 캐시\n그 옆에 붙는 게 HBM, 맨 아래가 저장장치예요'),
        (2,'C','speech','최신상: HBF는 처음 들어요')],
 "p05":[(1,'C','speech','한실속: 저장장치를 HBM처럼 쌓아 올린 거예요\n아직 세상에 나오지도 않은 층이죠'),
        (2,'C','narr','점선으로 그린 층')],
 "p06":[(1,'C','label','연산'),(1,'C','label','HBM'),(1,'C','label','면적은 메모리가 더 크다'),
        (1,'C','speech','한실속: 어떤 교수는 메모리가 연산을 삼킨다고 해요')],
 "p07":[(1,'C','speech','한실속: 연산 칩은 열 때문에 두서너 개가 한계인데\nHBM은 열여섯 층씩 쌓여요\n면적으로 보면 메모리가 더 커요'),
        (2,'C','narr','두서너 개와 열여섯 층')],
 "p08":[(1,'C','speech','주본질: 그래서 그 교수는 메모리가 주인이 되고\n연산이 부품이 된다고 보지'),
        (2,'C','speech','한실속: 저희 업계에선 꽤 유명한 말이에요')],
 "p09":[(1,'C','speech','주본질: 단, 한 관점이야\n반대편에서 보는 관점도 있어'),
        (2,'C','speech','안믿어: 반대 관점이라면 나도 듣고 싶소')],
 "p10":[(1,'C','label','두 관점'),(1,'C','label','병목은 메모리'),(1,'C','label','공급이 제한'),
        (1,'C','speech','주본질: 왼쪽, 병목은 메모리라 수요가 폭발한다\n오른쪽, 제조사들이 투자를 미뤄 공급이 제한돼 사이클이 길다')],
 "p11":[(1,'C','speech','주본질: 오른쪽 관점에선 비싸 보여도 아직 고점이 아니라는 거야\n두 관점이 다른 이유로 같은 방향을 가리켜'),
        (2,'C','narr','화살표 둘, 방향은 하나')],
 "p12":[(1,'C','speech','안믿어: 둘 다 사라는 소리 아니오'),
        (2,'C','speech','주본질: 둘 다 지금은 올라간다는 뜻이고\n언제 끝나는지는 서로 달라\n그 차이가 투자 질문이야')],
 "p13":[(1,'C','narr','두 줄'),
        (2,'C','think','나배움: 올라간다는 건 같은데 끝이 다르다')],
 "p14":[(1,'C','label','DRAM'),(1,'C','label','HBM'),
        (1,'C','speech','주본질: 이제 시간 축으로 보자')],
 "p15":[(1,'C','speech','주본질: 표준 DRAM 곡선은 성숙해서 완만하고\n그 위로 HBM 곡선이 가파르게 올라왔어'),
        (1,'C','speech','한실속: 10화에서 제가 그린 교차 도식이에요'),
        (2,'C','narr','그때는 두 곡선이었다')],
 "p16":[(1,'C','speech','주본질: 그때는 둘이었지\n지금은 셋이야'),
        (2,'C','narr','점선이 시작됐다')],
 "p17":[(1,'C','label','HBF'),
        (1,'C','speech','주본질: 점선, HBF\n9화에서 본 카테고리 교체가 눈앞에서 또 시작되는 거야'),
        (1,'C','think','나배움: 다음 고릴라가 태어나는 현장')],
 "p18":[(1,'C','speech','한탕수: 형, 이 저장장치 회사 올해 여섯 배래요!\n메모리 전쟁이면 이게 대장 아니에요?'),
        (2,'C','speech','주본질: 그건 킹덤 사이클의 물때야')],
 "p19":[(1,'C','speech','주본질: 물이 들 땐 배가 다 뜨지\n원칙 6, 영주는 가볍게, 썰물 전에 내려야 해'),
        (2,'C','speech','신중해: 기록했어요, 썰물 전에')],
 "p20":[(1,'C','label','HBF'),(1,'C','label','HBM'),(1,'C','label','DRAM보다 용량이 훨씬 크다'),
        (1,'C','speech','한실속: HBF는 저장장치용 칩을 쌓아 올린 거예요\n같은 높이면 용량이 훨씬 크죠')],
 "p21":[(1,'C','label','SanDisk'),(1,'C','label','SK하이닉스'),
        (1,'C','speech','한실속: 규격을 두 회사가 같이 냈어요'),
        (2,'C','speech','최신상: 벌써 규격이 공개됐대요\n저 다 읽어봤어요')],
 "p22":[(1,'C','speech','한실속: 규격은 나왔는데 샘플은 내후년\n양산은 그다음이에요'),
        (2,'C','speech','주본질: 초기시장이야\n12화 판별표를 꺼내')],
 "p23":[(1,'C','label','HBF'),
        (1,'C','speech','한실속: 누가 사나는 아직 아무도, 참조사례는 시뮬레이션\n완전완비제품 없음, 매출 없음, 시총은 기대뿐\n다섯 줄 전부 왼쪽, 초기시장입니다')],
 "p24":[(1,'C','speech','주본질: 초기시장이면 우리는 뭘 하지?'),
        (2,'C','speech','나배움: 바구니에 담고 관찰이요\n사는 건 토네이도에서')],
 "p25":[(1,'C','speech','주본질: 그럼 17화 결론을 다시 묻자\n메모리는 킹덤인가, 고릴라인가'),
        (2,'C','narr','그때의 카드')],
 "p26":[(1,'C','label','검증에 묶인다'),
        (1,'C','speech','주본질: HBM은 연산 칩 위에 얹혀서 같이 검증을 받아\n바꾸기 어렵지, 그래서 선두가 유지되기 쉬워'),
        (2,'C','narr','자물쇠')],
 "p27":[(1,'C','label','메모리 재판정'),
        (1,'C','speech','주본질: 그래도 두세 회사가 만드는 구조라 영주 성격을 못 벗어\n영원한 1등은 없다, 세대마다 바뀔 수 있다는 말이 그 뜻이야')],
 "p28":[(1,'C','speech','한실속: 토네이도 속 니치 고릴라 후보\n딱 그 말이네요'),
        (2,'C','think','나배움: 같은 메모리인데 세 줄이 다 다르다')],
 "p29":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p30":[(1,'C','speech','한탕수: 그럼 메모리 다 사요?'),
        (2,'C','speech','주본질: 원칙 6, 영주는 가볍게\nHBF는 바구니 관찰, 사는 건 토네이도에서\n깃털 하나 무게로')],
 "p31":[(1,'C','speech','나배움: 다음 시간은요?'),
        (2,'C','speech','주본질: 70년이야\nAI는 어제 시작된 게 아니거든')],
 "p32":[(1,'C','caption','Episode 26 끝 · 다음 화 · AI 70년사와 표준 동맹의 교체\n(30년의 캐즘, 그리고 동맹이 통째로 바뀌는 순간)')],
}

BANDS = {
 "p03":'메모리 피라미드 · SRAM → HBM → HBF → SSD · 위로 빠르고 작게, 아래로 크고 느리게',
 "p10":'두 관점 · 병목은 메모리(수요 폭발) vs 공급이 제한(사이클이 길다) · 같은 방향, 다른 끝',
 "p17":'사이클의 교차 · DRAM 위로 HBM, 그 위로 HBF 점선 · 9화의 카테고리 교체를 실시간으로',
 "p23":'HBF 판별표 · 다섯 줄 전부 초기시장 · 바구니 관찰, 매수는 토네이도에서',
 "p27":'메모리 재판정 · 표준 DRAM = 킹덤 · HBM = 토네이도 속 니치 고릴라 후보 · HBF = 초기시장',
}

NOTES = {
 "p03":'해설: 약어 풀이. SRAM은 연산 칩 안에 든 가장 빠른 캐시 메모리, HBM(High Bandwidth Memory)은 DRAM을 여러 층 쌓아 연산 칩 옆에 붙이는 고대역폭 메모리, HBF(High Bandwidth Flash)는 낸드 플래시(저장장치용 칩)를 HBM처럼 쌓는 차세대 후보, SSD는 낸드 기반 저장장치다. 메모리 피라미드 도식은 v4 기획서를 따른다',
 "p06":'해설: "메모리가 GPU를 삼킨다"는 김정호 KAIST 교수(HBM 연구로 알려짐)의 관점이다. 그는 AI 연산의 병목이 GPU보다 메모리 대역폭에 있으며, 앞으로는 HBM·HBF 안에 GPU가 들어가고 GPU·CPU는 부품이 된다고 본다(2026-02 KAIST HBF 로드맵 설명회, 2026-03 언론 인터뷰). 본 만화는 이를 "한 관점"으로 소개하며 단정하지 않는다',
 "p10":'해설: 오른쪽 관점은 이선엽 대표(전 신한투자증권 투자전략팀장, 2026년 6월부터 AFW파트너스 대표)의 견해를 재구성한 것이다. 그는 제조사들이 투자를 미뤄 공급이 제한된 사이클이라 비싸 보여도 고점이 아니며, 공급 정점 시점은 계산이 불가능하다는 게 업계 정설이라고 말했다(2026-09-21 포럼). 실제로 2026년 4분기 범용 DRAM 계약가는 전 분기 대비 10~15% 상승이 전망됐다(TrendForce, 2026-09-30, 작화 시 갱신)',
 "p14":'해설: 표준 DRAM 사이클 위로 HBM 사이클이 올라와 교차한다는 도식은 v4 기획서의 개념 도식이며 10화에서 한실속이 처음 그렸다. 9화의 제품수명주기(PLC)에서 본 "카테고리 교체"가 메모리 안에서 반복되는 모습이다',
 "p19":'사실 확인: 2026년 메모리 가격 상승으로 낸드·저장장치 회사 SanDisk(2025년 WD에서 분사)의 주가는 연초 대비 여섯 배 넘게 올라 S&P500 최고 수익 종목이 됐다(2026-09 말 기준). 본 만화는 이를 킹덤 사이클의 "물때"로 해석하며, 특정 종목의 매수·매도를 권하지 않는다. 원칙 6 원문: Hold kings and princes lightly, selling individual stocks on a marketplace stumble and the category upon deceleration of hypergrowth',
 "p21":'사실 확인: SanDisk와 SK하이닉스는 2026년 8월 OCP를 통해 첫 HBF 기술 규격(오픈 표준)을 공개했다. SanDisk는 첫 HBF 제품의 설계를 마쳤고 샘플은 2027년, 양산은 2028년으로 안내했다(당초 2026년 하반기 샘플에서 순연). SK하이닉스는 HBM과 HBF를 함께 쓴 시뮬레이션에서 와트당 처리량 2.69배를 제시했다. GPU 회사의 공식 채택 발표는 확인되지 않았다(2026-10-04 기준, 작화 시 갱신)',
 "p23":'해설: 12화의 5행 판별표를 HBF에 적용한 결과는 본 만화의 예시 판정이다. 2026-10 기준 HBF는 고객·매출이 없고 규격과 시뮬레이션만 있는 초기시장이며, 18화의 "위치 라벨"로 보면 등급을 매기기 전 단계다',
 "p27":'해설: 17화 결론의 재확인이다. 표준 DRAM은 JEDEC 공통 규격이라 삼성전자·SK하이닉스·마이크론이 상호 대체 가능한 킹덤이고, HBM은 GPU와 함께 검증받아 전환비용이 높지만 2~3개 공급사 구조라 영주 성격을 벗지 못한다. 2026년 HBM 점유율 전망은 SK하이닉스 54~60%, 삼성전자 28~30%, 마이크론 17~20%이며 세 회사 모두 HBM4를 양산한다. "영원한 1등은 없다, 세대마다 바뀔 수 있다"는 김정호 교수의 말이다(2026-10-04 기준)',
}

if __name__ == "__main__": run(globals())
