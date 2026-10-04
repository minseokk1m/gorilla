#!/usr/bin/env python3
# 고릴라 헌터스 Ep30 "ETF의 역설: 시즌 3 종합 시험" — 시즌 3 피날레 (32p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep30 · Ep20 p23-25 "ETF의 역설" 복선 회수 · 4기준(Ep21-24) 종합 시험 · v4 Ep39·외전1 계승
# 팩트 근거: season34-facts.md B4(TIME 글로벌AI인공지능액티브 ETF 상위 10, 2026-10-02) · A13(샌디스크 YTD) · A7(인텔 회복) · A4(HBM)
# ※ 작화 직전 TIME ETF 상위 종목·비중 재갱신 필수(카드 라벨이 바뀔 수 있음). 실존 인물 금지, 로고 금지, 특정 종목 권유 아님 고지
# usage: python3 gen_ep30.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP30"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep30")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP30 NOTE: company names appear ONLY as clean labels on white paper cards or the whiteboard; NEVER real logos, real product photos or real executives' faces. "
               "The score table is always a clean hand-drawn whiteboard grid with EXACTLY the labels listed; cells not listed are completely BLANK WHITE. "
               "The pie chart is a plain hand-drawn circle with ONE very thin slice and NO numbers.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

SCHEAD = ("a clean hand-drawn SCORE TABLE titled '4기준 채점판' with EIGHT column headers across the top exactly '인텔', 'AMD', '샌디스크', 'SK하이닉스', '델', '삼성전기', '메타', '엔비디아' and five ROW LABELS down the left exactly '자체 아키텍처', '전환비용', '네트워크 효과', '완전완비제품', '합계'")
SC0 = (SCHEAD + "; EVERY cell of the table is completely BLANK WHITE with nothing written")
SC2 = (SCHEAD + "; the '인텔' column filled top to bottom 'O', 'X', 'X', 'X', '1/4'; the 'AMD' column filled 'O', 'X', 'X', 'X', '1/4'; ALL other six columns completely BLANK WHITE with nothing written")
SC4 = (SCHEAD + "; '인텔' column 'O', 'X', 'X', 'X', '1/4'; 'AMD' column 'O', 'X', 'X', 'X', '1/4'; '샌디스크' column 'X', 'X', 'X', 'X', '0/4'; 'SK하이닉스' column 'X', 'O', 'X', 'O', '2/4'; the remaining four columns completely BLANK WHITE")
SC6 = (SCHEAD + "; '인텔' 'O', 'X', 'X', 'X', '1/4'; 'AMD' 'O', 'X', 'X', 'X', '1/4'; '샌디스크' 'X', 'X', 'X', 'X', '0/4'; 'SK하이닉스' 'X', 'O', 'X', 'O', '2/4'; '델' 'X', 'X', 'X', 'O', '1/4'; '삼성전기' 'X', 'X', 'X', 'X', '0/4'; the last two columns completely BLANK WHITE")
SC8 = (SCHEAD + "; all eight columns filled: '인텔' 'O', 'X', 'X', 'X', '1/4'; 'AMD' 'O', 'X', 'X', 'X', '1/4'; '샌디스크' 'X', 'X', 'X', 'X', '0/4'; 'SK하이닉스' 'X', 'O', 'X', 'O', '2/4'; '델' 'X', 'X', 'X', 'O', '1/4'; '삼성전기' 'X', 'X', 'X', 'X', '0/4'; '메타' 'O', 'X', 'O', 'O', '3/4'; '엔비디아' 'O', 'O', 'O', 'O', '4/4' with the '4/4' circled in red")
CARDS = ("a row of eight small white paper cards pinned on the whiteboard, each bearing ONLY one name: '인텔', 'AMD', '샌디스크', 'SK하이닉스', '델', '삼성전기', '메타', '엔비디아'; to the right two grey cards bearing ONLY '선물' and '다른 ETF'; above the row one label 'TIME ETF 상위 10'")
PIE2 = ("a hand-drawn pie chart with one very thin slice labeled '확실한 고릴라' and the large remainder labeled '나머지'; NO numbers anywhere")
WHY3 = ("a hand-drawn card titled '왜 그런가' with three numbered lines exactly: '① 종목당 비중 상한' / '② 정기 리밸런싱' / '③ 사이클과 기대도 함께 담는다'")
ROLE2 = ("a hand-drawn two-row card: first row 'ETF → 후보 식별 · 사이클 탑승', second row '사냥꾼 → 고릴라 집중 · 썰물 전 하차'; a small arrow between the rows")
ETF3 = ("three hand-drawn boxes in a row with ONE label each: a wide flat box labeled '지수형', a focused narrow box labeled '세분시장 특화형', a box with a jagged red zigzag labeled '레버리지'; above them the heading 'ETF 세 종류'")
TOOLS = ("a hand-drawn two-column card: LEFT column headed 'Moore 원전' with one line '4기준 · 6등급 · 10대 원칙'; RIGHT column headed '클럽 보조 도구' with one line '위치 라벨 · 2축 매트릭스 · 대체 위협 3단계'; a vertical line between the columns")
ROADMAP = ("the LEARNING ROADMAP: four boxes '① 기술수용주기 이해', '② 사례로 익히기', '③ 투자와 연결', '④ 실전', ALL FOUR carrying big GREEN check marks, and a small round badge pinned beside box ③ reading ONLY '심화'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a large hand-drawn pie chart lying on a wooden desk, one very thin slice of it glowing gold, a big magnifying glass held over that slice by a hand entering from the edge, a kraft notebook and a pencil beside; NO people's faces, NO whiteboard, NO numbers, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL announcing the season's final test, the whole group present including the TALC five and HAN TANG-SU; the whiteboard behind is completely BLANK. (2 ~45%) HAN SIL-SOK (black hair, glasses, knit vest) raising his hand with quiet resolve, his balloon tail pointing at him.",
 "p03":f"Two panels. (1 ~55%) JU BON-JIL handing the marker to HAN SIL-SOK with a nod. (2 ~45%) {LOCK_HS}HAN SIL-SOK pinning ONE white card bearing ONLY the letters 'TIME ETF' on the otherwise BLANK whiteboard.",
 "p04":f"One panel (~100%). {LOCK_HS}The whiteboard shows {CARDS}; HAN SIL-SOK to the side so that no hand covers any card; ONLY these labels.",
 "p05":f"Two panels. (1 ~55%) NA BAE-UM (late-30s, black hair, no glasses, charcoal shirt) at the table, surprised, his balloon tail pointing at HIM; the whiteboard behind shows {CARDS}. (2 ~45%) JU BON-JIL (seated at the table, NOT at the board) answering calmly; plain background.",
 "p06":f"One panel (~100%). {LOCK_HS}The whiteboard shows {SC0}; HAN SIL-SOK standing fully to the side; ONLY these labels.",
 "p07":f"One panel (~100%). {LOCK_HS}The whiteboard shows {SC2}; HAN SIL-SOK pointing at the second column from the side; ONLY these labels.",
 "p08":f"One panel (~100%). {LOCK_HS}The whiteboard shows {SC4}; HAN SIL-SOK to the side; ONLY these labels.",
 "p09":f"One panel (~100%). {LOCK_HS}The whiteboard shows {SC6}; HAN SIL-SOK to the side; ONLY these labels.",
 "p10":f"One panel (~100%). {LOCK_HS}The whiteboard shows {SC8}; HAN SIL-SOK stepping back, marker lowered; ONLY these labels.",
 "p11":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK summing up beside the whiteboard which shows {SC8}; the group looking at the single circled '4/4'. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p12":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone raised like a gavel) objecting from the table, his balloon tail pointing at him; the whiteboard behind shows {SC8}. (2 ~45%) JU BON-JIL (seated) raising a finger, pleased by the objection.",
 "p13":f"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) writing the objection into the log; HAN SIL-SOK waiting at the board which shows {SC8}. (2 ~45%) {LOCK_HS}HAN SIL-SOK erasing a corner of the board and drawing the outline of a circle (no words yet).",
 "p14":f"One panel (~100%). {LOCK_HS}The whiteboard corner shows {PIE2}; HAN SIL-SOK pointing at the thin slice; ONLY these two labels.",
 "p15":f"Two panels. (1 ~55%) HAN TANG-SU (red cap) bursting in with his phone held up showing ONLY a steep green rising line (no numbers, no tickers); the whiteboard behind shows {PIE2}. (2 ~45%) JU BON-JIL's face, a knowing smile.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL now standing beside the whiteboard which shows {PIE2}, HAN SIL-SOK having sat down; JU BON-JIL explaining. (2 ~45%) close-up of HAN SIL-SOK ONLY (40s, black hair, thin metal glasses, knit vest); JU BON-JIL must NOT appear; the thought balloon belongs to HAN SIL-SOK.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM asking anxiously; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL shaking his head with a reassuring smile.",
 "p18":f"One panel (~100%). The whiteboard shows {WHY3}; JU BON-JIL to the side; ONLY these labels.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL pointing at lines ① and ② of the whiteboard which shows {WHY3}; NA BAE-UM copying. (2 ~45%) JU BON-JIL pointing at line ③ of the same card ({WHY3}).",
 "p20":f"Two panels. (1 ~55%) AN MID-EO asking sharply, flip phone in hand; the whiteboard behind shows {WHY3}. (2 ~45%) JU BON-JIL answering evenly, both palms open.",
 "p21":f"One panel (~100%). The whiteboard shows {ROLE2}; JU BON-JIL to the side; ONLY these labels.",
 "p22":f"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) restating it from the table, his balloon tail pointing at him; the whiteboard behind shows {ROLE2}. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: 'ETF는 후보를 찾아주고 사이클을 태운다' / '우리는 고릴라에 집중하고 썰물 전에 내린다'.",
 "p23":f"One panel (~100%). The whiteboard shows {ETF3}; JU BON-JIL to the side; ONLY these labels.",
 "p24":f"Two panels. (1 ~55%) JU BON-JIL pointing at the first two boxes of the whiteboard which shows {ETF3}. (2 ~45%) a small inset recalling Ep1: HAN TANG-SU sweating in front of a phone showing ONLY a red falling line (no numbers), while JU BON-JIL in the main scene points at the third box labeled '레버리지'.",
 "p25":"Two panels. (1 ~55%) GO BI-JEON (navy suit, tablet under arm) asking with a confident smile; the whiteboard behind is out of focus with no readable text. (2 ~45%) HAN SIL-SOK nodding slowly, reassured.",
 "p26":"Two panels. (1 ~55%) JU BON-JIL cautioning with one raised hand, sincere; the whiteboard behind is completely BLANK. (2 ~45%) SHIN JUNG-HAE writing in the log, a small smile.",
 "p27":f"One panel (~100%). The whiteboard shows {TOOLS}; JU BON-JIL to the side; ONLY these labels.",
 "p28":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {TOOLS}, one hand on each column. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '뼈대는 Moore' / '도구는 우리 것' / '섞지 않는다'.",
 "p29":f"Two panels. (1 ~55%) AN MID-EO asking one more time, half a smile; the whiteboard behind shows {TOOLS}. (2 ~45%) JU BON-JIL answering lightly, tapping the LEFT column of the card ({TOOLS}).",
 "p30":f"One panel (~100%). The whiteboard shows ONLY {ROADMAP}; the whole group gathered in front of it, JU BON-JIL at the side, NA BAE-UM at center holding his log; warm; ONLY these labels.",
 "p31":f"Two panels. (1 ~55%) NA BAE-UM asking, log in hand; the whiteboard behind shows {ROADMAP}. (2 ~45%) JU BON-JIL pointing at NA BAE-UM's chest, smiling.",
 "p32":f"One panel (~100%). Closing SEASON-3 finale, {INK}the group silhouettes walking out of the jungle clearing toward open grassland at dawn, NA BAE-UM a step ahead of the others carrying his notebook, a faint gorilla silhouette far behind on a hill; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 30\nETF의 역설: 시즌 3 종합 시험\nETF는 후보를 찾아주고, 집중은 우리가 한다\n시즌 3 최종화 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','주본질: 시즌 3의 마지막은 종합 시험이야\n4기준을 전부 꺼내서 한 ETF를 통째로 해부한다'),
        (2,'C','speech','한실속: 20화의 제 질문이에요\n왜 확실한 고릴라가 그렇게 적었는지')],
 "p03":[(1,'C','speech','주본질: 오늘은 네가 직접 답해'),
        (2,'C','label','TIME ETF'),
        (2,'C','speech','한실속: 같은 ETF를 다시 꺼냈습니다\n그런데 상위 종목이 그때와 다릅니다')],
 "p04":[(1,'C','label','TIME ETF 상위 10'),
        (1,'C','speech','한실속: 상위 열 개 중 종목은 여덟\n둘은 선물과 다른 ETF라 채점에서 뺍니다')],
 "p05":[(1,'C','speech','나배움: 20화 때 카드랑 완전히 다르네요'),
        (2,'C','speech','주본질: ETF는 구성이 바뀐다\n그래서 분기마다 다시 보는 거야')],
 "p06":[(1,'C','label','4기준 채점판'),(1,'C','label','자체 아키텍처'),(1,'C','label','전환비용'),(1,'C','label','네트워크 효과'),(1,'C','label','완전완비제품'),
        (1,'C','speech','한실속: 한 장씩 채우겠습니다')],
 "p07":[(1,'C','label','인텔'),(1,'C','label','AMD'),
        (1,'C','speech','한실속: 인텔은 아키텍처는 자기 것이지만 나머지는 지난 시대의 것, 1/4\nAMD는 16화의 지켜볼 침팬지, 역시 1/4')],
 "p08":[(1,'C','label','샌디스크'),(1,'C','label','SK하이닉스'),
        (1,'C','speech','한실속: 샌디스크는 규격 메모리라 0/4, 킹덤입니다\nSK하이닉스는 HBM 덕에 2/4\n17화의 한 회사 안에 두 정글')],
 "p09":[(1,'C','label','델'),(1,'C','label','삼성전기'),
        (1,'C','speech','한실속: 델은 서버를 완비해 주지만 아키텍처는 남의 것, 1/4\n삼성전기는 부품 킹덤, 0/4')],
 "p10":[(1,'C','label','메타'),(1,'C','label','엔비디아'),(1,'C','label','4/4'),
        (1,'C','speech','한실속: 메타는 네트워크 효과와 생태계는 있는데 전환비용이 낮아 3/4\n그리고 엔비디아, 4/4')],
 "p11":[(1,'C','speech','한실속: 여덟 장 중 4/4는 하나뿐입니다'),
        (2,'C','think','나배움: 시즌 3을 통째로 한 판에 쓴 것 같다')],
 "p12":[(1,'C','speech','안믿어: 1/4짜리 인텔이 왜 비중은 제일 크오?\n표가 틀렸거나 ETF가 틀렸거나'),
        (2,'C','speech','주본질: 좋은 반론이야, 그게 다음 질문이지\n먼저 비중을 더해 보자')],
 "p13":[(1,'C','speech','신중해: 반론 기록했어요\n1/4 종목이 비중 1위'),
        (2,'C','speech','한실속: 4/4의 비중을 모아 보겠습니다')],
 "p14":[(1,'C','label','확실한 고릴라'),(1,'C','label','나머지'),
        (1,'C','speech','한실속: 4/4는 하나뿐이고 비중은 3% 남짓이에요\n20화 때보다 조각이 더 얇아졌어요')],
 "p15":[(1,'C','speech','한탕수: 근데 이 ETF 올해 엄청 올랐잖아요\n샌디스크는 여섯 배래요!'),
        (2,'C','speech','주본질: 그게 ETF의 역설이야\n그리고 두 번째 교훈이 있어')],
 "p16":[(1,'C','speech','주본질: 고릴라를 거의 안 담아도 오를 수 있어\n올해는 메모리 킹덤의 물때가 맞아떨어졌거든'),
        (2,'C','think','한실속: 20화의 조각이 더 작아졌는데 더 올랐다')],
 "p17":[(1,'C','speech','나배움: 그럼 고릴라 게임이 틀린 거예요?'),
        (2,'C','speech','주본질: 틀린 게 아니라 다른 게임이야\n왜 그런지 보자')],
 "p18":[(1,'C','label','왜 그런가'),(1,'C','label','① 종목당 비중 상한'),(1,'C','label','② 정기 리밸런싱'),(1,'C','label','③ 사이클과 기대도 함께 담는다'),
        (1,'C','speech','주본질: 이유는 셋이야')],
 "p19":[(1,'C','speech','주본질: 종목당 비중에 상한이 있고 정기적으로 다시 맞춰\n확신이 있어도 한 종목에 몰 수가 없어'),
        (2,'C','speech','주본질: 그리고 사이클과 기대도 같이 담아\n올해는 그 사이클이 맞아떨어진 거고')],
 "p20":[(1,'C','speech','안믿어: 그럼 ETF가 나쁘오?\n올해는 고릴라보다 더 올랐는데'),
        (2,'C','speech','주본질: 아니, 다른 게임이야\n킹덤의 물때를 타는 게임\n좋은 게임이지만 고릴라 게임은 아니지')],
 "p21":[(1,'C','label','ETF → 후보 식별 · 사이클 탑승'),(1,'C','label','사냥꾼 → 고릴라 집중 · 썰물 전 하차'),
        (1,'C','speech','주본질: 둘을 섞으면 17화의 원칙 6을 잊게 돼\n물때에는 썰물이 있어')],
 "p22":[(1,'C','speech','한실속: ETF가 후보를 찾아주고 사이클을 태워 주면\n우리는 고릴라에 집중하고 썰물 전에 내린다'),
        (2,'C','narr','두 줄')],
 "p23":[(1,'C','label','ETF 세 종류'),(1,'C','label','지수형'),(1,'C','label','세분시장 특화형'),(1,'C','label','레버리지'),
        (1,'C','speech','주본질: 그리고 ETF에도 세 종류가 있어')],
 "p24":[(1,'C','speech','주본질: 지수형은 지도 전체, 특화형은 우리 정글\n특화형이 우리 지도와 맞아'),
        (2,'C','speech','주본질: 레버리지는 1화의 그 함정\n오를 때도 내릴 때도 두 배, 흔들리면 원금이 녹아')],
 "p25":[(1,'C','speech','고비전: 그럼 특화형 ETF 하나에 확신 종목 둘?'),
        (2,'C','speech','한실속: 실용주의자의 시작점으로는 그게 합리적이네요')],
 "p26":[(1,'C','speech','주본질: 시작점으로는 좋아\n단 특정 상품을 권하는 게 아니라 구조를 말하는 거야'),
        (2,'C','speech','신중해: 기록할게요, 시작점')],
 "p27":[(1,'C','label','Moore 원전'),(1,'C','label','클럽 보조 도구'),
        (1,'C','speech','주본질: 마지막으로 솔직하게 하나')],
 "p28":[(1,'C','speech','주본질: 본 뼈대는 Moore의 것\n보조 도구는 우리가 만든 것, 둘을 섞지 않는다'),
        (2,'C','narr','세 줄')],
 "p29":[(1,'C','speech','안믿어: 보조 도구가 틀리면 어쩌오?'),
        (2,'C','speech','주본질: 그러면 버려\n뼈대는 남아')],
 "p30":[(1,'C','label','① 기술수용주기 이해'),(1,'C','label','② 사례로 익히기'),(1,'C','label','③ 투자와 연결'),(1,'C','label','④ 실전'),(1,'C','label','심화'),
        (1,'C','speech','주본질: 시즌 3 끝\n지도의 셋째 칸을 한 번 더 깊게 팠어')],
 "p31":[(1,'C','speech','나배움: 이제 뭐가 남았어요?'),
        (2,'C','speech','주본질: 네가 혼자 사냥하는 것\n다음 시즌은 네 손으로')],
 "p32":[(1,'C','caption','Episode 30 끝 · 시즌 3 완결 · 다음 시즌 · 고릴라 사냥꾼\n(서식지 정찰, 매수와 매도의 실전, 다음 고릴라)')],
}

BANDS = {
 "p05":'ETF는 구성이 바뀐다 · 20화의 카드와 30화의 카드가 다르다 · 그래서 분기마다 다시 본다',
 "p11":'4기준 채점 · 여덟 종목 중 4/4는 하나 · 나머지는 영주·기사·침팬지·킹덤 (본 만화의 예시)',
 "p14":'ETF의 역설 · 확실한 고릴라의 비중은 3% 남짓 · 그런데 ETF는 올해 크게 올랐다',
 "p21":'ETF → 후보 식별·사이클 탑승 / 사냥꾼 → 고릴라 집중·썰물 전 하차 · 둘은 다른 게임',
 "p24":'ETF 세 종류 · 지수형(지도 전체) · 세분시장 특화형(우리 정글) · 레버리지(한탕수의 함정)',
 "p28":'본 뼈대는 Moore(4기준·6등급·10대 원칙) · 보조 도구는 클럽의 것(위치 라벨·2축 매트릭스·대체 위협 3단계) · 섞지 않는다',
}

NOTES = {
 "p04":'사실 확인: TIME 글로벌AI인공지능액티브 ETF(타임폴리오자산운용)의 2026-10-02 기준 상위 10 보유: 인텔 5.8% / AMD 4.7% / 샌디스크 4.4% / 나스닥100 선물 4.3% / SK하이닉스 4.0% / 델 3.7% / 삼성전기 3.3% / 메타 3.3% / 엔비디아 3.1% / TIME 차이나AI테크액티브 ETF 3.1%, 순자산 약 2조 1,100억 원. 액티브 ETF의 구성과 비중은 수시로 바뀌므로 작화 시 최신 구성으로 갱신한다. 본 만화는 특정 ETF·종목의 매수·매도를 권하지 않는다',
 "p07":'해설: 채점은 본 만화의 교육용 예시이며 기업 평가가 아니다. 인텔은 x86 아키텍처는 자기 것이지만 PC 카테고리의 전환비용·네트워크 효과가 옛 판의 것이고, 2026년 2분기 매출이 25% 늘어 회복을 시도 중이다(29화 해설). AMD는 16화에서 "지켜볼 침팬지"로 분류했다(2026-10-04 기준)',
 "p08":'해설: 샌디스크(NAND)와 삼성전기(부품)는 공통 규격 위의 킹덤 정글이다(17화). SK하이닉스는 표준 DRAM에서는 영주이지만 HBM에서는 GPU와 함께 검증받아 전환비용이 높고(17화 "검증에 묶인다"), 2026년 HBM 점유율 약 54~60%(전망치)로 선두다. 그래서 "한 회사 안에 두 정글"로 2/4를 준다(2026-10 기준)',
 "p10":'해설: 메타는 소비자 플랫폼으로 네트워크 효과와 생태계(완전완비제품)는 강하지만, 사용자가 한 번의 탭으로 옮길 수 있어 전환비용이 낮다(22·23화). 엔비디아는 21~24화에서 4기준을 모두 통과한 교과서적 고릴라다. 채점은 본 만화의 예시이며 특정 종목 권유가 아니다',
 "p14":'해설: 20화에서 한실속은 가상의 카드로 "확실한 고릴라 합이 20% 안팎"을 발견했다. 2026-10-02 실제 상위 10에서는 4/4 고릴라가 엔비디아 하나(3.1%)뿐이어서 조각이 더 얇다. 이것이 "ETF의 역설": 분산형·테마형 ETF는 고릴라만 담지 않으며, 확신에 따른 집중을 구조적으로 하지 못한다',
 "p16":'사실 확인: 2026년 메모리 가격 상승 사이클(4분기 DRAM 계약가 +10~15% 전망, TrendForce 2026-09-30)과 함께 샌디스크 주가는 연초 대비 약 6배(S&P500 최고 수익 종목, 2026-09 말 기준), 마이크론은 2026 회계연도 매출 1,332억 달러(전년 374억 달러)를 기록했다. 킹덤 정글의 상승 사이클이 ETF 수익을 끌어올린 해였다. 수치는 2026-10-04 기준이며 특정 종목 권유가 아니다',
 "p19":'해설: 공모펀드·ETF는 종목당 비중 상한과 정기 리밸런싱 규칙을 둔다(국내 공모펀드는 동일 종목 10% 상한이 원칙, 지수 추종 등 예외 있음). 그래서 운용자가 확신하는 종목에도 비중을 몰지 못한다. 액티브 ETF는 사이클과 기대를 함께 담아 성과를 내며, 이는 고릴라 게임의 "집중"과는 다른 게임이다(원칙 6: 영주·기사는 썰물 전에 카테고리 전체를 판다)',
 "p24":'해설: 레버리지 ETF는 일간 수익률의 배수를 추종하므로 지수가 오르내리며 제자리로 돌아와도 원금은 변동성 잠식으로 줄어든다(1화 해설). 본 만화는 레버리지 ETF를 한탕수의 함정으로 분류한다',
 "p28":'해설: 본 만화의 뼈대는 Moore 원전의 4기준(21~24화)·6등급(15~17화)·10대 원칙(19화)이다. 캐즘 위치·잠재 고릴라 라벨(18화), 2축 매트릭스(14화), 대체 위협 3단계(29화), 측정 5도구(12화)는 클럽이 만든 보조 도구이며 Moore 원전이 아니다. 본 자료는 NDA에 준하는 대외비이며 투자 권유가 아니다',
}

if __name__ == "__main__": run(globals())
