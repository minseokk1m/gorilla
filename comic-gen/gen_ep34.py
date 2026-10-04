#!/usr/bin/env python3
# 고릴라 헌터스 Ep34 "자격심사표를 채워라: Blue Sheet와 SHARES" — 시즌 4 (32p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep34 · Blue Sheet(Miller Heiman 『전략적 판매』 4 구매 영향자, Moore가 투자에도 권함) · SHARES 6단계(세미나 프로세스, v4 오타 SAHREAS 교정) · 사이버보안 후보 심층 심사(season34-facts.md B8)
# ※ 회사명은 보드 라벨 'CrowdStrike' 하나만, 로고·실존 인물 금지. 수치(ARR 등)는 해설에만. 특정 종목 권유 아님
# usage: python3 gen_ep34.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP34"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep34")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP34 NOTE: the 'Blue Sheet' is a single light-BLUE sheet of paper with a hand-drawn form; on the whiteboard it is redrawn as a blue-outlined form card. "
               "Company names appear ONLY as the clean label 'CrowdStrike' on cards or the whiteboard; NEVER real logos, product screenshots or executives. "
               "FLASHBACK scenes of HAN SIL-SOK's company show ONLY anonymous office workers in a plain meeting room; NONE of the study-group cast appears inside a flashback; no readable text on any screen or paper in flashbacks.")

SPEAKERS_EXTRA = {'임원':'the anonymous grey-suited executive in the flashback meeting room (NOT a study-group member)',
                  '보안팀원':'the anonymous young security-team worker in the flashback (NOT a study-group member)'}

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s MAN, short plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, glasses, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
FLASH = "FLASHBACK panel in a slightly muted tone: a plain corporate meeting room with ONLY anonymous office workers (no study-group member, no modern logos, every screen OFF, no readable text); "

BLUE = ("a hand-drawn FORM card with a blue outline titled 'Blue Sheet' and six labeled fields stacked top to bottom, each a short label followed by an EMPTY box, exactly: '목표' / '영향력' / '구매 영향자 4' / '강점' / '레드플래그' / '승리 조건'")
BLUE_F2 = ("the Blue Sheet form card (blue outline, title 'Blue Sheet', fields '목표', '영향력', '구매 영향자 4', '강점', '레드플래그', '승리 조건') with a small company card 'CrowdStrike' pinned at its top; the first two boxes filled with short hand-writing exactly: '3년 두 배' and '엔드포인트 보안 표준'; the other four boxes completely EMPTY")
BLUE_F4 = ("the Blue Sheet form card (blue outline, title 'Blue Sheet', fields '목표', '영향력', '구매 영향자 4', '강점', '레드플래그', '승리 조건') with the company card 'CrowdStrike' at its top; the first four boxes filled exactly: '3년 두 배' / '엔드포인트 보안 표준' / '넷 다 한 회사로' / '플랫폼 + 소비형 계약'; the last two boxes completely EMPTY")
BLUE_FULL = ("the Blue Sheet form card (blue outline, title 'Blue Sheet', fields '목표', '영향력', '구매 영향자 4', '강점', '레드플래그', '승리 조건') with the company card 'CrowdStrike' at its top and ALL six boxes filled exactly: '3년 두 배' / '엔드포인트 보안 표준' / '넷 다 한 회사로' / '플랫폼 + 소비형 계약' / '둔화 · 번들 · 사고' / '달성, 또는 4기준 하나 깨지면 EXIT'")
BUYER4 = ("a hand-drawn card titled '구매 영향자 넷' with four numbered lines exactly: '① 경제적 구매자 · 예산 승인' / '② 사용자 구매자 · 실제 사용' / '③ 기술적 구매자 · 스펙 심사' / '④ 코치 · 내부 조력자'")
RED3 = ("a hand-drawn card titled '레드플래그 셋' with three short lines exactly: 'ARR 성장 둔화' / '대형 플랫폼사의 번들 잠식' / '대형 보안 사고'; a small red flag icon")
WIN = ("a hand-drawn card titled '승리 조건' with two short lines exactly: '목표 달성' / '4기준 중 하나가 깨지면 EXIT'; a small checkered-flag icon")
SH_HEAD = ("a hand-drawn card titled 'SHARES' with six rows, each row a big capital letter on the left and a short Korean-and-English phrase on the right")
SH_3 = ("rows exactly: 'S · 검토 Scan' / 'H · 가설 Hypothesize' / 'A · 가치사슬 분석 Analyze'; the lower three rows are completely BLANK WHITE with NOTHING written")
SH_6 = ("rows exactly: 'S · 검토 Scan' / 'H · 가설 Hypothesize' / 'A · 가치사슬 분석 Analyze' / 'R · 매입 Respond' / 'E · 평가 Evaluate' / 'S · 강화 Strengthen'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a single light-blue sheet of paper lying on a dark wooden desk beside a fountain pen, a warm desk lamp, the sheet showing ONLY faint blank ruled boxes with NO writing; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL holding up a single light-blue sheet of paper (blank, no writing) in front of the group; NA BAE-UM and HAN TANG-SU leaning in; the whiteboard behind is completely BLANK. (2 ~45%) close on the blank blue sheet in JU BON-JIL's hand, NO writing on it.",
 "p03":f"One panel (~100%). The whiteboard shows {BLUE}; JU BON-JIL to the side, no hand covering any label; ONLY these labels.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {BLUE}; HAN SIL-SOK (knit vest, glasses) nodding slowly. (2 ~45%) close on the lower half of the same form card showing ONLY the fields '강점', '레드플래그', '승리 조건' with EMPTY boxes, JU BON-JIL's finger beside '레드플래그'.",
 "p05":"Two panels. (1 ~55%) NA BAE-UM asking why a sales tool; JU BON-JIL amused; the whiteboard behind shows ONLY the title 'Blue Sheet' at the top of a blank form outline. (2 ~45%) JU BON-JIL writing ONLY one short line on a clean part of the board: '누가 사기로 결정하나'.",
 "p06":f"One panel (~100%). The whiteboard shows {BUYER4}; JU BON-JIL to the side; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL turning to HAN SIL-SOK with an invitation, beside the whiteboard which shows {BUYER4}. (2 ~45%) HAN SIL-SOK (knit vest, glasses) adjusting his glasses, beginning to recall.",
 "p08":f"Two panels. (1 ~55%) {FLASH}a grey-suited executive at the head of the table signing a document, two anonymous staff waiting. (2 ~45%) back in the study room: HAN SIL-SOK speaking from the table, his balloon tail pointing at him; the whiteboard behind shows {BUYER4}.",
 "p09":f"Two panels. (1 ~55%) {FLASH}a young security-team worker at a desk with three monitors, ALL screens OFF, pointing at one dark monitor and talking to a colleague. (2 ~45%) back in the study room: HAN SIL-SOK speaking, his balloon tail pointing at him; the whiteboard behind shows {BUYER4}.",
 "p10":f"Two panels. (1 ~55%) {FLASH}two anonymous IT staff comparing two blank paper spec sheets side by side at a table (no readable text). (2 ~45%) {FLASH}one anonymous worker quietly whispering to another in a corridor, a thumbs-up half hidden.",
 "p11":f"Two panels. (1 ~55%) JU BON-JIL summing up beside the whiteboard which shows {BUYER4} with a circle drawn around all four lines; HAN SIL-SOK sitting back. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '넷이 다 한 회사로 모이면' / '전환비용은 이미 성벽'.",
 "p12":f"One panel (~100%). {LOCK_NB}The whiteboard shows {BLUE_F2}; NA BAE-UM has just written the second box; ONLY the specified labels and the two filled entries.",
 "p13":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {BLUE_F2}; GO BI-JEON nodding. (2 ~45%) AN MID-EO (flip phone) narrowing his eyes, skeptical; plain background.",
 "p14":f"One panel (~100%). {LOCK_NB}The whiteboard shows {BLUE_F4}; NA BAE-UM pointing at the third box; ONLY the specified labels and the four filled entries.",
 "p15":f"One panel (~100%). The whiteboard shows {RED3} on the left and {WIN} on the right; JU BON-JIL to the side; ONLY these labels.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL explaining the red flags beside the whiteboard which shows {RED3} and {WIN}; NA BAE-UM copying. (2 ~45%) close on the '레드플래그 셋' card ({RED3}) with JU BON-JIL's finger under the second line.",
 "p17":f"One panel (~100%). {LOCK_NB}The whiteboard shows {BLUE_FULL}; NA BAE-UM stepping back from the finished form, marker lowered; the group looking; ONLY the specified labels and entries.",
 "p18":f"One panel (~100%). The whiteboard shows {SH_HEAD} with {SH_3}; JU BON-JIL to the side; ONLY the specified labels.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {SH_HEAD} with {SH_3}; CHOI SIN-SANG (headphones) curious. (2 ~45%) a small inset sketch on the board corner: a magnifying glass over a blank map (no text).",
 "p20":f"One panel (~100%). The whiteboard shows {SH_HEAD} with {SH_6}; JU BON-JIL pointing at the fourth row; ONLY the specified labels.",
 "p21":f"Two panels. (1 ~55%) JU BON-JIL explaining the last three rows beside the whiteboard which shows {SH_HEAD} with {SH_6}; NA BAE-UM nodding. (2 ~45%) JU BON-JIL writing ONLY one short line on a clean part of the board: '종목보다 시기'.",
 "p22":"Two panels. (1 ~55%) GO BI-JEON (navy suit) speaking with a thoughtful smile, his balloon tail pointing at him; the whiteboard behind shows ONLY the line '종목보다 시기'. (2 ~45%) JU BON-JIL nodding, pleased.",
 "p23":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '가설을 먼저 쓴다' / '가치사슬로 검증한다' / '시기가 종목보다 먼저'. (2 ~45%) NA BAE-UM's determined face, plain background.",
 "p24":"Two panels. (1 ~55%) AN MID-EO (stern, flip phone pointed like a gavel) objecting; the group turning; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL answering calmly, holding the blue sheet up.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL explaining why the sheet exists to be proven wrong; HAN SIL-SOK agreeing; the whiteboard behind is completely BLANK. (2 ~45%) close on HAN SIL-SOK (black hair, glasses, knit vest), his balloon tail pointing at him, sincere.",
 "p26":"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) writing the objection into the club log; the log page shows NO readable text. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p27":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '누가 사기로 결정하나' / '레드플래그를 먼저 적는다' / '표는 틀리기 위해 쓴다'.",
 "p28":"Two panels. (1 ~55%) HAN TANG-SU (red cap, mustard hoodie) proudly holding up his own light-blue sheet; the sheet shows ONLY a hand-drawn form outline with three small red flags drawn in one box and NO readable text. (2 ~45%) the group leaning to look; JU BON-JIL raising an eyebrow.",
 "p29":"Two panels. (1 ~55%) close on HAN TANG-SU's blue sheet in his hands: ONLY a form outline with three small red flags all colored in, NO readable text. (2 ~45%) JU BON-JIL's dry smile; HAN TANG-SU sheepish.",
 "p30":"Two panels. (1 ~55%) HAN TANG-SU folding the sheet with a sigh, the group laughing warmly; the whiteboard behind is completely BLANK. (2 ~45%) SHIN JUNG-HAE writing again in the log, smiling; no readable text.",
 "p31":f"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL a last question, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) a faint dreamy image {INK}two stone thrones side by side on a hill with a small figure standing between them; no readable text.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}the study room at dusk, the light-blue sheet pinned to the corner of the empty whiteboard, NA BAE-UM and JU BON-JIL small figures leaving; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 34\n자격심사표를 채워라\n차트 말고 표를 본다\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','주본질: 바구니에 담은 후보 하나를 깊이 심사하자\n이 파란 종이 한 장으로'),
        (2,'C','narr','영업 사원들이 쓰던 표였다')],
 "p03":[(1,'C','label','Blue Sheet'),(1,'C','label','목표'),(1,'C','label','영향력'),(1,'C','label','구매 영향자 4'),
        (1,'C','speech','주본질: 칸은 여섯이야\n위에서부터 목표, 영향력, 구매 영향자 넷')],
 "p04":[(1,'C','speech','주본질: 아래 셋은 강점, 레드플래그, 승리 조건\n사기 전에 팔 조건과 이길 조건을 먼저 적어'),
        (2,'C','label','강점'),(2,'C','label','레드플래그'),(2,'C','label','승리 조건')],
 "p05":[(1,'C','speech','나배움: 그런데 왜 영업 도구로 주식을 봐요?'),
        (2,'C','label','누가 사기로 결정하나'),
        (2,'C','speech','주본질: 영업 사원이 묻는 질문이 투자자가 물을 질문과 같거든\n이 회사 제품을 누가 사기로 결정하나')],
 "p06":[(1,'C','label','구매 영향자 넷'),(1,'C','label','① 경제적 구매자 · 예산 승인'),(1,'C','label','② 사용자 구매자 · 실제 사용'),(1,'C','label','③ 기술적 구매자 · 스펙 심사'),(1,'C','label','④ 코치 · 내부 조력자'),
        (1,'C','speech','주본질: 한 회사가 물건을 살 땐 네 사람이 움직여')],
 "p07":[(1,'C','speech','주본질: 실속 씨, 회사에서 보안 솔루션 바꿀 때 어땠어요'),
        (2,'C','speech','한실속: 아, 작년이네요\n네 사람이 다 있었어요')],
 "p08":[(1,'C','speech','임원: 예산은 승인하겠네\n대신 사고 나면 내 책임이야'),
        (2,'C','speech','한실속: 첫째, 예산을 승인한 임원\n돈을 쥔 사람이죠')],
 "p09":[(1,'C','speech','보안팀원: 저희가 매일 보는 화면이에요\n이게 불편하면 다 불편해져요'),
        (2,'C','speech','한실속: 둘째, 매일 쓰는 보안팀\n셋째가 스펙을 심사한 전산팀이고요')],
 "p10":[(1,'C','narr','기술적 구매자는 두 회사의 사양서를 나란히 놓고 비교했다'),
        (2,'C','narr','그리고 안에서 조용히 밀어준 동료가 한 명\n네 번째, 코치')],
 "p11":[(1,'C','speech','주본질: 네 부류가 다 같은 한 회사로 모이면\n그 회사의 전환비용은 이미 성벽이야\n22화의 성벽을 네 사람이 쌓는 거지'),
        (2,'C','narr','두 줄')],
 "p12":[(1,'C','label','CrowdStrike'),(1,'C','label','3년 두 배'),(1,'C','label','엔드포인트 보안 표준'),
        (1,'C','speech','나배움: 31화 서식지에서 고른 사이버보안 후보예요\n목표는 3년에 두 배, 영향력은 엔드포인트 보안의 표준')],
 "p13":[(1,'C','speech','나배움: 표준이라는 건, 회사들이 보안 솔루션을 고를 때\n이 회사를 기준으로 비교한다는 뜻이에요'),
        (2,'C','think','안믿어: 표준이라는 말을 너무 쉽게 쓰는군')],
 "p14":[(1,'C','label','넷 다 한 회사로'),(1,'C','label','플랫폼 + 소비형 계약'),
        (1,'C','speech','나배움: 구매 영향자는 실속 씨 회사처럼 넷이 다 모였고\n강점은 플랫폼, 그리고 쓴 만큼 내는 계약이에요')],
 "p15":[(1,'C','label','레드플래그 셋'),(1,'C','label','ARR 성장 둔화'),(1,'C','label','대형 플랫폼사의 번들 잠식'),(1,'C','label','대형 보안 사고'),
        (1,'C','label','승리 조건'),
        (1,'C','speech','주본질: 이제 제일 중요한 두 칸\n팔 조건과 이길 조건을 사기 전에 적는다')],
 "p16":[(1,'C','speech','주본질: 반복 매출 성장이 둔해지거나\n큰 플랫폼 회사가 끼워팔기로 잠식하거나\n대형 사고가 나면, 그날 표를 다시 편다'),
        (2,'C','speech','주본질: 특히 둘째, 끼워팔기는 24화의 완전완비제품 싸움이야')],
 "p17":[(1,'C','label','둔화 · 번들 · 사고'),(1,'C','label','달성, 또는 4기준 하나 깨지면 EXIT'),
        (1,'C','speech','나배움: 다 채웠어요\n승리 조건은 목표 달성, 아니면 4기준 중 하나가 깨지면 나가기')],
 "p18":[(1,'C','label','SHARES'),(1,'C','label','S · 검토 Scan'),(1,'C','label','H · 가설 Hypothesize'),(1,'C','label','A · 가치사슬 분석 Analyze'),
        (1,'C','speech','주본질: 표를 채우는 순서에도 이름이 있어\n여섯 글자, 샤레스')],
 "p19":[(1,'C','speech','주본질: 먼저 서식지를 검토하고\n이 회사가 고릴라가 된다는 가설을 쓰고\n가치사슬 지도로 그 가설을 분석해'),
        (2,'C','narr','검토, 가설, 분석')],
 "p20":[(1,'C','label','R · 매입 Respond'),(1,'C','label','E · 평가 Evaluate'),(1,'C','label','S · 강화 Strengthen'),
        (1,'C','speech','주본질: 그다음에야 산다\n사고 나서는 분기마다 평가하고\n가설이 맞으면 비중을 강화해')],
 "p21":[(1,'C','speech','주본질: 여섯 단계 중 매입은 네 번째야\n사는 건 과정의 중간이지 시작이 아니야'),
        (2,'C','label','종목보다 시기'),
        (2,'C','speech','주본질: 그리고 이 한 줄')],
 "p22":[(1,'C','speech','고비전: 가설을 먼저 쓰고 나중에 검증하는 게\n과학이랑 똑같네요'),
        (2,'C','speech','주본질: 좋은 종목을 나쁜 시기에 사면 나쁜 투자야\n시기가 종목보다 먼저')],
 "p23":[(1,'C','narr','세 줄'),
        (2,'C','think','나배움: 표 한 장이 1년 치 순서를 정해 준다')],
 "p24":[(1,'C','speech','안믿어: 표를 채우면 다 맞소?\n종이에 적는다고 회사가 달라지오?'),
        (2,'C','speech','주본질: 아니, 이 표는 틀리기 위해 쓰는 거야')],
 "p25":[(1,'C','speech','주본질: 레드플래그가 켜지면 내가 틀렸다는 걸\n빨리, 분명하게 알 수 있게\n감으로 산 사람은 틀린 줄도 몰라'),
        (2,'C','speech','한실속: 이게 진짜 분석이죠\n차트 보고 사는 게 아니라')],
 "p26":[(1,'C','speech','신중해: 반론 기록했어요\n종이가 회사를 바꾸진 않는다, 라고'),
        (2,'C','think','나배움: 종이는 회사가 아니라 나를 바꾼다')],
 "p27":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p28":[(1,'C','speech','한탕수: 저도 제 종목으로 하나 채웠어요!'),
        (2,'C','narr','모두가 들여다봤다')],
 "p29":[(1,'C','narr','레드플래그 칸에 깃발 셋이 전부 칠해져 있었다'),
        (2,'C','speech','주본질: 탕수야, 표가 너한테 팔라고 말하네')],
 "p30":[(1,'C','speech','한탕수: 표 채우기 전엔 몰랐어요\n제가 틀린 줄을'),
        (2,'C','speech','신중해: 그것도 기록할게요')],
 "p31":[(1,'C','speech','나배움: 그런데 한 칸에 고릴라가 둘이면\n표를 두 장 써요?'),
        (1,'C','speech','주본질: 두 장 쓰고, 둘 다 들어\n그 얘기가 다음 시간이야'),
        (2,'C','narr','왕좌가 둘인 언덕')],
 "p32":[(1,'C','caption','Episode 34 끝 · 다음 화 · 고릴라 충돌: 양쪽을 든다\n(원칙 9 실전 · 헷지가 아니라 정공법)')],
}

BANDS = {
 "p03":'Blue Sheet · 목표 · 영향력 · 구매 영향자 4 · 강점 · 레드플래그 · 승리 조건 · 사기 전에 팔 조건과 이길 조건을 적는다',
 "p06":'구매 영향자 넷 · 경제적(예산) · 사용자(실제 사용) · 기술적(스펙) · 코치(내부 조력자) · 누가 사기로 결정하나',
 "p11":'네 구매 영향자가 한 회사로 모이면 완전완비제품과 전환비용이 강하다 · 22화의 성벽을 네 사람이 쌓는다',
 "p15":'레드플래그 셋 · ARR 성장 둔화 · 대형 플랫폼사의 번들 잠식 · 대형 보안 사고 · 승리 조건 · 목표 달성 또는 4기준 하나 깨지면 EXIT',
 "p20":'SHARES · 검토 → 가설 → 가치사슬 분석 → 매입 → 평가 → 강화 · 매입은 여섯 중 네 번째',
 "p25":'표는 틀리기 위해 쓴다 · 레드플래그가 켜지면 틀렸음을 빨리 안다 · 감으로 산 사람은 틀린 줄도 모른다',
}

NOTES = {
 "p02":'해설: Blue Sheet는 Miller Heiman의 『전략적 판매(Strategic Selling)』에서 영업 기회를 분석하는 한 장짜리 양식이다. Geoffrey Moore는 고릴라 게임에서 이 영업 도구의 질문법을 투자 분석에도 적용하라고 권했다. 본 만화의 여섯 칸 양식은 그 취지를 투자용으로 재구성한 것이다',
 "p06":'해설: 4 구매 영향자(Four Buying Influences) 원문: Economic Buyer(예산을 승인하는 사람), User Buyer(실제로 쓰는 사람), Technical Buyer(사양과 조건을 심사하는 사람), Coach(구매 조직 안에서 도와주는 사람). 네 부류가 모두 한 공급사로 모이면 그 회사의 완전완비제품과 전환비용이 강하다는 신호다',
 "p12":'사실 확인: 사이버보안 후보로 든 회사는 2026년 7월 31일 종료 분기 기준 연간 반복 매출(ARR) 약 58.4억 달러(전년 대비 +25%), 분기 순신규 ARR 3.33억 달러(사상 최대), 사용량 기반 계약(Flex) ARR 약 22.9억 달러(+101%)를 발표했다(2026-10 기준, 작화 시 갱신). 2026년 7월 2일 4대 1 주식 분할을 했으므로 주가는 분할 후 기준으로 본다. 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
 "p14":'해설: ARR(Annual Recurring Revenue, 연간 반복 매출)은 구독·계약으로 매년 반복해서 들어오는 매출을 연 단위로 환산한 지표다. 소비형(사용량 기반) 계약은 고객이 쓴 만큼 내는 방식으로, 고객이 플랫폼 안에서 모듈을 늘릴수록 ARR이 자란다(22화 NRR과 같은 결의 지표)',
 "p16":'사실 확인: 레드플래그 둘째의 "대형 플랫폼사의 번들 잠식"은 운영체제·클라우드를 가진 대형 회사가 보안 기능을 끼워 파는 경쟁을 뜻한다(2026년 기준 업계에서 가장 자주 거론되는 위협). EXIT 조건은 13화의 EXIT 3신호와 같은 원리로, 사기 전에 정해 둔다',
 "p18":'해설: SHARES는 Scan(검토)·Hypothesize(가설)·Analyze(가치사슬 분석)·Respond(매입)·Evaluate(평가)·Strengthen(강화)의 머리글자다. v4 기획서의 표기 오류(SAHREAS)를 검토자 의견(이관호)에 따라 SHARES로 교정했다. 세미나에서 정리된 투자 프로세스이며 Moore 원전의 용어는 아니다',
 "p22":'해설: "종목보다 시기"는 같은 회사라도 기술수용주기의 어느 위치에서 사느냐가 수익을 가른다는 뜻이다(32화 진입 3신호). 가설을 먼저 쓰고 검증하는 순서는 확증편향(19화)을 막는 장치이기도 하다',
 "p29":'해설: 한탕수의 표는 가상의 예시다. 레드플래그 세 개가 모두 켜진 종목은 원칙 7(고릴라가 될 수 없으면 즉시 판다)의 대상이며, 표를 채우는 행위 자체가 "내가 틀렸는지"를 확인하는 절차다',
}

if __name__ == "__main__": run(globals())
