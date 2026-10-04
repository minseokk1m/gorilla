#!/usr/bin/env python3
# 고릴라 헌터스 Ep37 "사냥 일지 1년: 네 번의 분기 회의" — 시즌 4 (32p, ④ 실전)
# 2026-10-04 작성. season4-plan.md Ep37 · 민성원 v4 피드백 ④ Playbook(1년 운영기) · Ep19 FAIL4·Ep20 클럽 규칙 회수 · 시즌 4 도구(Ep31-36) 4분기 몽타주
# ※ 실제 투자클럽·웹사이트·앱은 보여주지 않는다(민석님 확정). 클럽 도구는 종이 눈금판(TOOL2)으로만. 종목은 전부 가상(A·B·C), 수익률 수치 없음
# usage: python3 gen_ep37.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP37"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep37")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP37 NOTE: the four quarterly meetings are all in the SAME study room; the season is shown ONLY by a small window view (spring blossoms / summer green / autumn leaves / winter snow) and the members' clothing layers. "
               "The '사냥 일지' is a plain kraft-cover notebook; this episode uses FOUR of them stacked. Stock candidates are ONLY the letters 'A', 'B', 'C' on white paper cards; NEVER real tickers or logos. "
               "NO phone screens, NO website, NO app, NO dashboard, NO monitor anywhere in this episode; the club tool is a PAPER card with two drawn gauges. NO numbers for returns anywhere.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
Q4 = ("a hand-drawn board with FOUR boxes in a row, each with a tiny season icon (a blossom, a sun, a leaf, a snowflake) and ONE label each exactly: '1분기 서식지·바구니' / '2분기 심사표·분할 매수' / '3분기 충돌·정리' / '4분기 리밸런싱·결산'")
HABMAP = ("a hand-drawn HABITAT MAP of six cells in a 2x3 grid with ONE label per cell exactly: 'AI 인프라 · 토네이도' / '메모리 · 토네이도, 킹덤 섞임' / '사이버보안 · 볼링앨리에서 토네이도로' / '전력·냉각 · 영주들' / '피지컬 AI · 초기시장' / '전기차 · 캐즘, 관찰 칸'; nothing else written")
BSK3 = ("a hand-drawn card titled '바구니의 세 조건' with three short lines exactly: '① 같은 카테고리의 후보들' / '② 각자 4기준을 절반 이상' / '③ 서식지 하나에 바구니 하나'; a small basket icon")
BLUE = ("a hand-drawn blue-tinted form titled 'Blue Sheet' with six field labels down the left exactly: '목표' / '영향력' / '구매 영향자 4' / '강점' / '레드플래그' / '승리 조건', each field followed by a short line of unreadable pencil scribble (filled in, but NOT legible)")
SPLIT = ("a hand-drawn chart of TWO bars of exactly the SAME height side by side, each bar topped by a small crown, with a small label '50 : 50' between them and nothing else written")
BASK_T3 = ("a hand-drawn timeline strip with four quarter marks; above it three white cards 'A', 'B', 'C'; the card 'A' has a red X drawn over it and a small arrow from 'A' to 'B'; the card 'B' is circled; nothing else written")
LOG_Y = ("the open kraft log's year-end page with ONLY these four hand-written lines: '결정 5번' / '분기 점검 4번' / '반론 기록 12건' / '본업 결근 0일'; nothing else on the page")
TOOL2 = ("a PAPER card (NOT a screen) with two hand-drawn semicircular gauges side by side, the left gauge labeled '펀더멘털 점수' and the right gauge labeled '심리 점수', each with a single pencil needle and NO numbers")
FAIL4 = ("four hand-drawn icons in a row with ONE label each: a drooping battery labeled '동기 저하', a pair of glasses with only one lens labeled '확증편향', a single narrow pipe labeled '정보 편식', a broken chain labeled '원칙 이탈'")
FAIL4_OK = (FAIL4 + "; a big GREEN check mark drawn over EACH of the four icons")
LOCK_GB = "ABSOLUTE RULE: the presenter standing at the whiteboard is GO BI-JEON (40s, sharp NAVY SUIT, tablet under arm (screen OFF), confident) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: four plain kraft-cover notebooks standing in a row on a wooden shelf, each with a tiny season token resting on it (a cherry blossom, a green leaf, a red maple leaf, a snowflake); warm lamp light; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room, spring blossoms visible through the window. (1 ~55%) JU BON-JIL placing four kraft notebooks on the table in a row; the whole club present (NA BAE-UM, HAN TANG-SU, the TALC five); the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM looking at the four notebooks, curious.",
 "p03":f"One panel (~100%). The whiteboard shows {Q4}; JU BON-JIL to the side, marker in hand; ONLY these four labels.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {Q4}; HAN TANG-SU counting the boxes on his fingers. (2 ~45%) close on the first box of the same board ({Q4}) as JU BON-JIL taps '1분기 서식지·바구니'.",
 "p05":"Two panels, spring. (1 ~55%) a recent-memory panel (present day, NOT a period flashback) of the first quarterly meeting: the club seated, JU BON-JIL giving the twenty-minute lesson; the whiteboard shows ONLY a hand-drawn four-row card titled '고릴라 4기준' with rows exactly '자체 아키텍처' / '전환비용' / '네트워크 효과' / '완전완비제품' (no O or X marks); a small kitchen timer on the table. (2 ~45%) SHIN JUNG-HAE (cardigan) opening the first kraft notebook to a fresh page.",
 "p06":f"One panel (~100%). {LOCK_GB}GO BI-JEON presents beside the whiteboard which shows {HABMAP}; he stands fully to the side so no hand covers any label; ONLY these six labels.",
 "p07":f"Two panels. (1 ~55%) {LOCK_NB}the club at the table; the whiteboard shows {BSK3}; NA BAE-UM pinning three white cards 'A', 'B', 'C' in a row under the card; ONLY these labels and the three letters. (2 ~45%) AN MID-EO (stern, flip phone raised like a gavel) objecting, his balloon tail pointing at him; HAN SIL-SOK listening calmly.",
 "p08":"Two panels. (1 ~55%) SHIN JUNG-HAE writing the objection into the kraft log, the recorder role; NA BAE-UM nodding to her. (2 ~45%) a transition strip: the window view changing from blossoms to deep summer green; the whiteboard behind is completely BLANK; no people in focus.",
 "p09":f"One panel (~100%). Summer, the second quarterly meeting. {LOCK_HS}HAN SIL-SOK presents beside the whiteboard which shows {BLUE}; he stands fully to the side; ONLY these six field labels plus the title.",
 "p10":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK explaining beside the whiteboard which shows {BLUE}; NA BAE-UM copying into the second kraft notebook. (2 ~45%) the whiteboard corner: a hand-drawn calendar strip of six boxes, three of them ticked, the label '분할 매수 6개월' above; nothing else written.",
 "p11":"Two panels. (1 ~55%) CHOI SIN-SANG (headphones) reporting from the table with an excited gesture, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) AN MID-EO raising the objection hand again; SHIN JUNG-HAE already writing; the group half-amused.",
 "p12":"Two panels. (1 ~55%) a transition strip: the window view changing to red autumn leaves; the four kraft notebooks on the table, the third one being opened; no readable text. (2 ~45%) JU BON-JIL at the table (NOT presenting), tapping the third notebook with a serious look.",
 "p13":f"One panel (~100%). Autumn, the third quarterly meeting. {LOCK_NB}NA BAE-UM presents beside the whiteboard which shows {SPLIT}; he stands fully to the side; ONLY the label '50 : 50'.",
 "p14":f"One panel (~100%). {LOCK_NB}NA BAE-UM beside the whiteboard which shows {BASK_T3}; he is drawing the red X over the card 'A'; ONLY the three letters.",
 "p15":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {BASK_T3}; HAN TANG-SU listening with an unusually serious face. (2 ~45%) close on HAN TANG-SU (red cap) raising his hand slowly, his balloon tail pointing at him; no phone in his hand.",
 "p16":"Two panels. (1 ~55%) HAN TANG-SU standing (NOT at the whiteboard, beside his chair), cap in his hands, speaking to the group with his balloon tail pointing at him; JU BON-JIL watching with quiet approval; the whiteboard behind is out of focus with no readable text. (2 ~45%) SHIN JUNG-HAE writing into the third notebook with a small smile.",
 "p17":"Two panels. (1 ~55%) a transition strip: the window view now shows falling snow; the fourth kraft notebook opened; the club in warm layers (scarves, cardigans). (2 ~45%) JU BON-JIL at the table holding up five fingers and folding one down, referring to a rule.",
 "p18":"Two panels, winter, the fourth quarterly meeting. (1 ~55%) the whiteboard shows ONLY a hand-drawn chart of five quarterly bars whose heights rise less and less, the last two bars almost flat, with a small label '증가율 둔화 두 분기' beneath; NA BAE-UM at the table pointing at it; the group deciding. (2 ~45%) HAN SIL-SOK and NA BAE-UM both raising a hand for a vote, calm.",
 "p19":f"One panel (~100%). A close-up of the OPEN kraft notebook on the wooden desk (NO whiteboard, NO people, NO room): {LOG_Y}.",
 "p20":f"Two panels. (1 ~55%) JU BON-JIL holding up {TOOL2} for the group to see, the card small in his hands; NA BAE-UM leaning in. (2 ~45%) close on the paper card ONLY ({TOOL2}), filling the panel, held by two hands; NO screen, NO device.",
 "p21":f"One panel (~100%). The whiteboard shows {FAIL4_OK}; JU BON-JIL to the side; ONLY these four labels.",
 "p22":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {FAIL4_OK}; the TALC five at the table each unconsciously matching one icon, comic. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '동기 저하 → 회의 날짜' / '확증편향 → 반론 담당' / '정보 편식 → 다섯 길 정찰' / '원칙 이탈 → 회의에서만 결정'.",
 "p23":f"One panel (~100%). A quiet beat, {INK}NA BAE-UM alone at the long table in the evening with the four kraft notebooks stacked, closing the last one; NO phone, NO screen, NO whiteboard text; the window dark with snow; warm lamp.",
 "p24":"Two panels. (1 ~60%) NA BAE-UM looking at the stacked notebooks, calm and content; the whiteboard behind is completely BLANK. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '벤치마크를 조금 웃돌았다' / '운이 아니라 규칙의 해'.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL writing ONLY '72 ÷ 10 = 7.2년' on the whiteboard; NA BAE-UM nodding, remembering. (2 ~45%) close on JU BON-JIL, warm.",
 "p26":"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) speaking to the group with a shy smile, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL's face, a knowing look.",
 "p27":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '결정은 네 번, 나머지는 본업' / '혼자 새는 네 곳을 클럽이 막는다' / '평범한 해가 복리의 해'.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL standing up, putting the marker down on the table in front of NA BAE-UM; the whiteboard behind is completely BLANK. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"Two panels. (1 ~55%) NA BAE-UM picking up the marker, looking at the BLANK whiteboard, a mix of fear and resolve; the group watching him warmly. (2 ~45%) HAN TANG-SU giving a small thumbs-up, cap tilted.",
 "p30":"Two panels. (1 ~55%) at the door JU BON-JIL turns back with the hook for the next episode; the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM alone, marker in hand, facing the BLANK whiteboard, exactly ONE thought balloon.",
 "p31":f"One panel (~100%). A faint dreamy image {INK}three small tornadoes far on a horizon beyond a jungle, seen from a hilltop where a single small figure stands with a marker; the top of the page has NO band and NO text box; NO readable text anywhere on this page.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}the study room empty at night, the whiteboard BLANK, a marker resting on its ledge and the four kraft notebooks stacked on the table; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 37\n사냥 일지 1년: 네 번의 분기 회의\n결정은 네 번, 나머지는 본업\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','주본질: 오늘은 수업이 아니야\n지난 1년을 일지 네 권으로 돌려 보는 거야'),
        (2,'C','think','나배움: 봄, 여름, 가을, 겨울')],
 "p03":[(1,'C','label','1분기 서식지·바구니'),(1,'C','label','2분기 심사표·분할 매수'),(1,'C','label','3분기 충돌·정리'),(1,'C','label','4분기 리밸런싱·결산'),
        (1,'C','speech','주본질: 결정은 네 번이면 돼\n나머지 361일은 본업')],
 "p04":[(1,'C','speech','주본질: 회의 순서는 20화 그대로야\n교육 20분, 후보 발표, 표로 검증, 반론과 기록'),
        (2,'C','speech','주본질: 첫 분기부터 가자')],
 "p05":[(1,'C','label','고릴라 4기준'),
        (1,'C','narr','봄, 첫 회의\n교육 20분은 4기준 복습이었다'),
        (2,'C','speech','신중해: 기록 시작할게요')],
 "p06":[(1,'C','label','AI 인프라 · 토네이도'),(1,'C','label','사이버보안 · 볼링앨리에서 토네이도로'),(1,'C','label','피지컬 AI · 초기시장'),
        (1,'C','speech','고비전: 정찰 결과입니다\n다섯 길로 훑어 보니 서식지는 여섯 칸\n오늘 바구니는 사이버보안 칸에서 꾸리겠습니다')],
 "p07":[(1,'C','label','바구니의 세 조건'),
        (1,'C','speech','나배움: 같은 칸의 후보 셋, A, B, C\n각자 4기준 절반 이상입니다'),
        (2,'C','speech','안믿어: C는 둘밖에 안 되지 않소\n절반이면 둘인데 턱걸이요')],
 "p08":[(1,'C','speech','신중해: 반론 기록했어요\nC는 다음 분기에 다시 심사'),
        (2,'C','narr','그리고 여름이 왔다')],
 "p09":[(1,'C','label','Blue Sheet'),
        (1,'C','speech','한실속: 둘째 분기, 후보 B의 심사표입니다\n구매 영향자 넷이 전부 B로 모였습니다\n레드플래그 셋은 아직 하나도 안 켜졌고요')],
 "p10":[(1,'C','speech','한실속: 승리 조건은 목표 달성, 아니면\n4기준 중 하나가 깨지면 나갑니다'),
        (2,'C','label','분할 매수 6개월'),
        (2,'C','speech','주본질: 좋아, 석 달째 분할 매수 중이지')],
 "p11":[(1,'C','speech','최신상: 개발자 쪽에서도 신호가 와요\nB의 규격으로 짠 코드가 눈에 띄게 늘어요'),
        (2,'C','speech','안믿어: 늘었다는 근거를 숫자로 가져오시오'),
        (2,'C','narr','기록, 두 번째 반론')],
 "p12":[(1,'C','narr','가을, 셋째 회의\n제일 결정이 많은 분기였다'),
        (2,'C','speech','주본질: 오늘은 배움이가 발표해')],
 "p13":[(1,'C','label','50 : 50'),
        (1,'C','speech','나배움: 결제망 두 고릴라는 그대로 양쪽 보유\n대체 위협 세 단계 중 켜진 게 없습니다')],
 "p14":[(1,'C','label','A'),(1,'C','label','B'),(1,'C','label','C'),
        (1,'C','speech','나배움: 그리고 A는 고릴라가 될 수 없다고 판단했습니다\n원칙 7, 가격은 보지 않고 팝니다\n뺀 돈은 원칙 8, B로 갑니다')],
 "p15":[(1,'C','speech','나배움: C는 응용 소프트웨어 침팬지로 판정\n원칙 5, 시장 확대 여지가 있으니 보유합니다'),
        (2,'C','speech','한탕수: 저도 하나 보고할 게 있는데요')],
 "p16":[(1,'C','speech','한탕수: 제 RIDE 종목, 출구 첫째가 켜졌어요\n매출이 예상을 크게 밑돌아서, 그날 내렸어요\n더 오를 것 같았는데도요'),
        (2,'C','speech','신중해: 탕수 씨 첫 규칙 매도, 기록했어요')],
 "p17":[(1,'C','narr','겨울, 넷째 회의'),
        (2,'C','speech','주본질: 규칙 다섯째, 사고파는 결정은 오늘 여기서만')],
 "p18":[(1,'C','label','증가율 둔화 두 분기'),
        (1,'C','speech','나배움: 영주 종목 하나가 두 분기 연속 썰물입니다\n원칙 6, 카테고리째 정리하자는 안입니다'),
        (2,'C','narr','반론 하나, 기록 하나, 그리고 표결')],
 "p19":[(1,'C','label','결정 5번'),(1,'C','label','분기 점검 4번'),(1,'C','label','반론 기록 12건'),(1,'C','label','본업 결근 0일'),
        (1,'C','narr','일지 마지막 장, 1년의 숫자')],
 "p20":[(1,'C','speech','주본질: 우리 클럽 도구는 이게 전부야\n종이 한 장에 눈금 둘'),
        (2,'C','label','펀더멘털 점수'),(2,'C','label','심리 점수'),
        (2,'C','speech','주본질: 왼쪽이 오른쪽보다 앞서면 토네이도\n오른쪽만 올라가면 12화의 하입이지')],
 "p21":[(1,'C','label','동기 저하'),(1,'C','label','확증편향'),(1,'C','label','정보 편식'),(1,'C','label','원칙 이탈'),
        (1,'C','speech','주본질: 19화의 네 구멍이야\n올해 클럽이 넷 다 막았어')],
 "p22":[(1,'C','speech','주본질: 회의 날짜가 동기를, 반론 담당이 편향을\n다섯 길 정찰이 편식을, 회의에서만 결정이 이탈을'),
        (2,'C','narr','네 줄')],
 "p23":[(1,'C','narr','회의가 끝나고, 혼자 남아 네 권을 덮었다')],
 "p24":[(1,'C','think','나배움: 숫자는 적지 않기로 했다\n올해는 운이 좋았던 해가 아니라 규칙의 해였으니까'),
        (2,'C','narr','벤치마크를 조금 웃돌았다')],
 "p25":[(1,'C','label','72 ÷ 10 = 7.2년'),
        (1,'C','speech','주본질: 20화에서 적은 그 식이야\n평범한 해를 일곱 번 겹치면 두 배'),
        (2,'C','speech','주본질: 복리는 화려한 해가 아니라 평범한 해로 쌓여')],
 "p26":[(1,'C','speech','한실속: 저… 이제 옆자리 동료한테\n이 일지를 보여줘도 될 것 같아요'),
        (2,'C','think','주본질: 실용주의자가 참조사례가 되는 순간')],
 "p27":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p28":[(1,'C','speech','주본질: 이제 네가 가리킬 차례야\n다음 고릴라는 어디 있지?'),
        (2,'C','think','나배움: 멘토 없이, 내 눈으로')],
 "p29":[(1,'C','narr','마커가 손에 들어왔다'),
        (2,'C','speech','한탕수: 형, 할 수 있어요')],
 "p30":[(1,'C','speech','주본질: 다음 시간엔 내가 묻고 네가 답해\n후보 셋을 네가 판에 놓는 거야'),
        (2,'C','think','나배움: 세 후보, 세 위치')],
 "p31":[(1,'C','narr','지평선 너머에 작은 돌풍 셋이 보였다')],
 "p32":[(1,'C','caption','Episode 37 끝 · 다음 화 · 다음 고릴라는 어디에\n(나배움이 혼자 판에 놓는 세 후보)')],
}

BANDS = {
 "p03":'1년 루틴 · 결정은 분기 회의 네 번뿐 · 나머지는 본업 (19화 분기 점검표 · 20화 클럽 규칙)',
 "p06":'1분기 · 정찰 다섯 길로 서식지 여섯 칸 (31화) → 바구니는 한 칸에서만 꾸린다 (33화)',
 "p09":'2분기 · Blue Sheet 구매 영향자 4 · 레드플래그 3 · 승리 조건 (34화) + 분할 매수 6개월 (32화)',
 "p14":'3분기 · 원칙 7 고릴라 못 될 종목은 가격을 보지 않고 즉시 · 원칙 8 뺀 돈은 남은 후보에 재투자',
 "p19":'1년 결산 · 결정 5번 · 분기 점검 4번 · 반론 기록 12건 · 본업 결근 0일 · 수익률 숫자는 적지 않는다',
 "p21":'혼자 새는 네 곳(19화)을 클럽이 막는다 · 회의 날짜 · 반론 담당 · 다섯 길 정찰 · 회의에서만 결정',
}

NOTES = {
 "p03":'해설: 분기 루틴은 19화의 분기 점검표(채택 위치·기대 위치·등급·신호)와 20화의 클럽 규칙 ⑤(사고파는 결정은 분기 회의에서만)를 1년 단위로 묶은 것이다. 본업을 유지하면서 적용할 수 있다는 것이 고릴라 게임의 핵심 전제다(1화)',
 "p05":'해설: 매 회의의 순서는 20화 클럽 규칙 ④ 월례 안건 그대로다. 교육 20분 → 후보 발표 → 판별표로 검증 → 반론과 기록. 반론 담당(안믿어)과 기록 담당(신중해)은 회의마다 바뀌지 않는다',
 "p09":'해설: Blue Sheet(34화)는 미국 Miller Heiman의 영업 도구 『전략적 판매』에서 온 양식으로, 4 구매 영향자(경제적·사용자·기술적 구매자와 코치)가 모두 한 회사로 모이는지를 본다. 표의 내용은 이 만화의 가상 후보 B에 대한 예시이며 실제 기업이 아니다',
 "p14":'해설: 원칙 7("어떤 종목이 고릴라가 될 가능성이 전혀 없다고 판단되면 즉각 매도하라")과 원칙 8("비고릴라에서 빼낸 돈은 즉시 남은 고릴라 후보에 재투자하라")은 한 묶음으로 실행한다. 매도 판단은 가격이 아니라 등급 판정에서 나온다(33화)',
 "p19":'해설: 결산의 숫자(결정 5번·분기 점검 4번·반론 12건·결근 0일)는 이 만화의 가상 클럽 예시다. 수익률은 일부러 적지 않았다. 20화의 +28%가 "운이 좋았던 해"였다면 이 해는 "규칙의 해"이며, 특정 해의 수익이 아니라 복리로 오래 쌓는 것이 목표다. 투자 권유가 아니다',
 "p20":'해설: 종이 눈금판의 두 점수(펀더멘털 점수·심리 점수)는 12화의 "가격 vs 매출 괴리" 개념을 클럽이 쓰기 쉽게 만든 보조 도구다. 30화에서 고지한 대로 Moore 원전의 분류(4기준·6등급·10대 원칙)와 구분되는 클럽 보조 장치다',
 "p21":'해설: 19화의 "혼자서 새는 네 곳"(동기 저하·확증편향·정보 편식·원칙 이탈)에 대한 클럽의 대응은 각각 정해진 회의 날짜, 반론 담당, 다섯 길 정찰(31화), 회의에서만 결정(20화 규칙 ⑤)이다',
 "p25":'해설: Rule of 72(10화·20화). 연 수익률 r%로 원금이 두 배가 되는 데 걸리는 햇수는 대략 72 ÷ r이다. 연 10%면 약 7.2년. 화려한 한 해보다 평범한 해를 꾸준히 겹치는 것이 복리의 본질이다',
}

if __name__ == "__main__": run(globals())
