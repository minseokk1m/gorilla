#!/usr/bin/env python3
# 고릴라 헌터스 Ep17 "영주·기사·소작농, 그리고 메모리는 고릴라인가" — 시즌 2 (30p)
# 2026-09-13 작성. season2-plan.md Ep17 · v4 Ep16-17 계승 · Moore 원칙 6 · Ep10 메모리 4단계·킹덤 vs 고릴라 연결
# usage: python3 gen_ep17.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP17"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep17")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP17 NOTE: kingdom metaphor scenes in the SAME inked webtoon style: a crowned king on a castle wall, an armored knight below, peasants in a field. "
               "Company names appear ONLY as clean labels on the whiteboard; NEVER real logos or product photos. Memory chips are abstract dark rectangles.")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A crowned king on a castle wall at dusk glancing down at an armored knight raising a sword; in the far field tiny peasants; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL at the whiteboard which shows ONLY a small crown sketch; NA BAE-UM ready; the members settled. (2 ~45%) JU BON-JIL writing ONLY the label 'Cisco' beside a small network-node sketch (dots connected by lines).",
 "p03":"One panel (~100%). The whiteboard: a hand-drawn sketch of two office buildings side by side each with a small router box on the roof, a thick line connecting them, and a small label on the line reading ONLY '같은 표준'; a second router box drawn in dotted outline next to the first with a swap arrow; JU BON-JIL to the side; ONLY this one label.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL explaining that the leader can be swapped; HAN SIL-SOK nodding (his company swapped vendors once). (2 ~45%) close on HAN SIL-SOK, a knowing look.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the label 'Oracle' beside a small database-cylinder sketch; NA BAE-UM noting. (2 ~45%) the whiteboard corner: ONLY two cylinders side by side with a swap arrow and the small label 'SQL'.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL summarizing the two kings; NA BAE-UM writing. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '영주 = 개방형 시장의 1등' / '점유율은 높지만 옮길 수 있다' / '왕좌가 흔들릴 수 있다'.",
 "p07":"Two panels. (1 ~55%) HAN TANG-SU asking about the knight, mimicking a sword swing; the group amused. (2 ~45%) JU BON-JIL drawing a small helmet sketch (no text).",
 "p08":"One panel (~100%). A kingdom metaphor scene in inked webtoon style: an armored knight on horseback charging up a ramp toward the castle wall where a nervous king stands; at the bottom of the ramp two small fallen knights; a small clean label box: '기사 · 도전자'; ONLY this label.",
 "p09":"Two panels. (1 ~55%) JU BON-JIL explaining that most knights fail but some succeed; NA BAE-UM intrigued. (2 ~45%) close on the charging knight's determined face inside the helmet.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL comparing with the primate jungle, two fingers up; the board shows ONLY a small gorilla sketch with a thick bar under it and a small crown sketch with a ladder under it (no words). (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '기사는 영주를 벨 수 있다' / '침팬지는 고릴라가 못 된다'.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL turning to a new sketch: a small field with tiny identical huts (no text); NA BAE-UM curious. (2 ~45%) close on the identical huts.",
 "p12":"One panel (~100%). The whiteboard: a hand-drawn chart with two lines: a blue line labeled '매출' rising steadily, and a red line labeled '주가' staying flat; beneath the chart a row of five identical small app icons (plain squares) with a small label '똑같은 기능 100개'; JU BON-JIL to the side; ONLY these three labels.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL explaining the serf, hands spread flat; HAN SIL-SOK nodding grimly. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '소작농 = 차별화 없는 바닥' / '아키텍처도 전환비용도 네트워크도 없음' / '매출이 늘어도 주가는 제자리'.",
 "p14":"Two panels. (1 ~55%) HAN SIL-SOK standing up with his laptop (screen OFF), asking to present; JU BON-JIL gesturing him to the board. (2 ~45%) HAN SIL-SOK at the whiteboard for the first time, slightly nervous, marker in hand; the board BLANK.",
 "p15":"One panel (~100%). The whiteboard: a hand-drawn five-row check card titled '표준 DRAM · 고릴라 5조건' with rows exactly: '독점 아키텍처 → X (공통 표준)' / '전환비용 → X (대체 가능)' / '네트워크 효과 → X' / '가격 결정권 → X (수급 사이클)' / '완전완비제품 → 해당 없음'; a small memory-chip icon; HAN SIL-SOK presenting; ONLY these labels.",
 "p16":"Two panels. (1 ~55%) HAN SIL-SOK explaining row by row, precise; NA BAE-UM impressed. (2 ~45%) JU BON-JIL nodding with a pleased look.",
 "p17":"Two panels. (1 ~55%) HAN SIL-SOK concluding, pointing at the crown sketch; HAN TANG-SU surprised. (2 ~45%) the notebook close-up: ONLY one hand-written line: '표준 DRAM은 킹덤이다'.",
 "p18":"Two panels. (1 ~55%) JU BON-JIL raising a finger with a 'but'; HAN SIL-SOK turning. (2 ~45%) JU BON-JIL writing ONLY the label 'HBM' beside a small stacked-chip sketch.",
 "p19":"One panel (~100%). The whiteboard: a hand-drawn sketch of a stacked memory chip bolted onto a large GPU chip with a small padlock icon on the bolt, and a small clean label '검증에 묶인다'; beside it a small crown sketch crossed out and a small gorilla sketch circled; JU BON-JIL to the side; ONLY this one label.",
 "p20":"Two panels. (1 ~55%) JU BON-JIL explaining why HBM is different; HAN SIL-SOK nodding slowly. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p21":"One split panel (~100%), LEFT vs RIGHT, the same company in two jungles. LEFT half: a castle wall with a crown and a small label 'DRAM · 킹덤'; RIGHT half: a stone throne with a gorilla and a small label 'HBM · 영장류'; between them a single company-shaped building silhouette straddling the divider; ONLY these two labels.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM standing with the season-1 conclusion clicking again; JU BON-JIL pleased. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '한 회사 안에 두 정글' / '회사가 아니라 카테고리로 본다'.",
 "p23":"Two panels. (1 ~55%) HAN TANG-SU asking how to invest in kings and knights; JU BON-JIL considering. (2 ~45%) JU BON-JIL drawing a small feather on the board (no text).",
 "p24":"One panel (~100%). The whiteboard: a hand-drawn card titled '원칙 6 · 영주와 기사' with three short lines exactly: '가볍게 보유한다' / '시장이 흔들리면 개별 종목을 판다' / '초고성장이 썰물이면 카테고리 전체를 판다'; a small feather icon; JU BON-JIL presenting; ONLY these labels.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL explaining the feather (light holding); NA BAE-UM noting. (2 ~45%) JU BON-JIL writing ONLY the word 'WATCH' in a small box on the board corner.",
 "p26":"Two panels. (1 ~55%) NA BAE-UM asking the difference from gorilla holding; JU BON-JIL answering with a rock-versus-feather gesture. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '고릴라는 바위처럼 들고' / '영주는 깃털처럼 들고' / '영주는 매수 확정이 아니라 관찰'.",
 "p27":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '영주: 옮길 수 있는 1등' / '기사: 영주를 벨 수 있는 도전자' / '소작농: 차별화 없는 바닥'.",
 "p28":"Two panels, quiet beat. (1 ~60%) evening, HAN SIL-SOK packing his laptop with a small proud smile, NA BAE-UM giving him a thumbs up. (2 ~40%) NA BAE-UM's warm face.",
 "p29":"Two panels. (1 ~55%) at the door JU BON-JIL turns back with the next hook. (2 ~45%) a faint dreamy image in webtoon ink style: a small car teetering at a canyon edge, and beyond the canyon an egg with a faint gorilla shape inside; NO text.",
 "p30":"One panel (~100%). Closing chapter-end: the castle behind, the canyon ahead; NA BAE-UM, JU BON-JIL and HAN SIL-SOK small figures; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 17\n영주·기사·소작농, 그리고 메모리\n성벽 위의 1등은 왜 늘 불안한가\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','주본질: 둘째 정글, 킹덤\n성벽 위의 영주부터 만나자'),
        (2,'C','label','Cisco'),
        (2,'C','speech','주본질: 네트워크 장비의 1등이야')],
 "p03":[(1,'C','label','같은 표준'),
        (1,'C','speech','주본질: 점유율은 높아\n그런데 경쟁사도 같은 표준을 써\n마음먹으면 장비를 바꿔 끼울 수 있지')],
 "p04":[(1,'C','speech','주본질: 고릴라처럼 못 옮기는 구조가 아니야\n그래서 영주야'),
        (2,'C','speech','한실속: 저희도 한 번 바꿨어요\n비용은 들었는데, 못 바꿀 정도는 아니었죠')],
 "p05":[(1,'C','label','Oracle'),
        (1,'C','speech','주본질: 데이터베이스의 1등도 마찬가지야\n공통 언어 위에 있으니 옮길 수 있어'),
        (2,'C','label','SQL')],
 "p06":[(1,'C','speech','주본질: 두 영주 다 대단한 회사야\n다만 왕좌가 흔들릴 수 있는 자리라는 것뿐'),
        (2,'C','narr','세 줄')],
 "p07":[(1,'C','speech','한탕수: 그럼 기사는요? 칼 들고 올라가는 거예요?'),
        (2,'C','speech','주본질: 정확히 그거야')],
 "p08":[(1,'C','label','기사 · 도전자'),
        (1,'C','narr','기사는 영주에게 도전한다\n대부분은 성벽 아래에서 멈추지만')],
 "p09":[(1,'C','speech','주본질: 가끔 진짜로 성을 차지하는 기사가 나와\n같은 게임이라 가능한 거야'),
        (2,'C','narr','기사에게는 늘 가능성이 있다')],
 "p10":[(1,'C','speech','주본질: 영장류 정글의 침팬지와 여기가 달라\n침팬지는 종이 달라서 못 올라가지만\n기사는 같은 종족이라 올라갈 수 있어'),
        (2,'C','narr','두 줄')],
 "p11":[(1,'C','speech','주본질: 그리고 들판의 소작농'),
        (2,'C','think','나배움: 다 똑같이 생긴 집들')],
 "p12":[(1,'C','label','매출'),(1,'C','label','주가'),(1,'C','label','똑같은 기능 100개'),
        (1,'C','speech','주본질: 기능은 다른 백 개와 비슷하고\n가격으로만 경쟁하는 회사야\n매출이 늘어도 주가는 제자리지')],
 "p13":[(1,'C','speech','주본질: 아키텍처도, 전환비용도, 네트워크 효과도 없어\n차별화가 없으면 아무리 열심히 해도 소작농이야'),
        (2,'C','narr','세 줄')],
 "p14":[(1,'C','speech','한실속: 제가 하나 발표해도 될까요?\n10화 이후로 계속 따져본 게 있어서요'),
        (2,'C','speech','주본질: 앞으로 나와')],
 "p15":[(1,'C','label','표준 DRAM · 고릴라 5조건'),
        (1,'C','label','독점 아키텍처 → X (공통 표준)'),(1,'C','label','전환비용 → X (대체 가능)'),(1,'C','label','네트워크 효과 → X'),
        (1,'C','label','가격 결정권 → X (수급 사이클)'),(1,'C','label','완전완비제품 → 해당 없음')],
 "p16":[(1,'C','speech','한실속: 표준 메모리는 공통 규격이라 누구 걸 써도 같아요\n삼성, SK, 마이크론 서로 대체가 되고\n가격은 수급 사이클이 정하죠'),
        (2,'C','speech','주본질: 완벽해\n실용주의자가 표를 채우면 이렇게 되는구나')],
 "p17":[(1,'C','speech','한실속: 그러니까 표준 DRAM은 고릴라가 아니라\n킹덤의 영주예요, 왕관이 세대마다 돌아가는'),
        (2,'C','narr','한 줄')],
 "p18":[(1,'C','speech','주본질: 단, 하나만 덧붙이자'),
        (2,'C','label','HBM'),
        (2,'C','speech','주본질: 같은 메모리라도 이건 달라')],
 "p19":[(1,'C','label','검증에 묶인다'),
        (1,'C','speech','주본질: HBM은 GPU 위에 얹혀서 함께 검증을 받아\n한번 검증되면 바꾸기가 아주 어렵지\n전환비용이 높은 거야')],
 "p20":[(1,'C','speech','주본질: 그래서 HBM에선 선두가 유지되기 쉬워\n토네이도 속의 작은 고릴라 후보지'),
        (2,'C','think','나배움: 10화의 그 교차 도식이 여기 있었구나')],
 "p21":[(1,'L','label','DRAM · 킹덤'),(1,'R','label','HBM · 영장류'),
        (1,'C','narr','같은 회사가 왼발은 킹덤에, 오른발은 영장류에 서 있다')],
 "p22":[(1,'C','speech','나배움: 회사가 아니라 카테고리로 본다\n이게 이렇게까지 이어지네요'),
        (2,'C','narr','두 줄')],
 "p23":[(1,'C','speech','한탕수: 그래서 영주랑 기사는 어떻게 사요?\n사도 되는 거예요?'),
        (2,'C','speech','주본질: 원칙 6이야')],
 "p24":[(1,'C','label','원칙 6 · 영주와 기사'),
        (1,'C','label','가볍게 보유한다'),(1,'C','label','시장이 흔들리면 개별 종목을 판다'),(1,'C','label','초고성장이 썰물이면 카테고리 전체를 판다')],
 "p25":[(1,'C','speech','주본질: 깃털처럼 가볍게 들어\n시장이 흔들리면 그 종목을 팔고\n카테고리 성장이 꺾이면 전부 판다'),
        (2,'C','label','WATCH')],
 "p26":[(1,'C','speech','나배움: 고릴라랑은 완전히 다르네요'),
        (1,'C','speech','주본질: 고릴라는 바위처럼, 영주는 깃털처럼\n영주는 매수 확정이 아니라 관찰 대상이야'),
        (2,'C','narr','세 줄')],
 "p27":[(1,'C','speech','주본질: 세 등급, 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p28":[(1,'C','narr','실속 씨가 처음으로 앞에 나간 날이었다'),
        (2,'C','think','나배움: 실용주의자가 표를 채우면 이렇게 단단하구나')],
 "p29":[(1,'C','speech','주본질: 다음 시간엔 등급이 아직 없는 동물들\n골짜기 앞의 차와, 알 속의 고릴라'),
        (2,'C','narr','골짜기 너머, 알 하나가 놓여 있었다')],
 "p30":[(1,'C','caption','Episode 17 끝 · 다음 화 · 캐즘 위치의 후보들\n(테슬라 · 잠재 고릴라 · Cerebras 4기준 심사)')],
}

BANDS = {
 "p06":'영주(King) · 개방형 시장의 1등 · 점유율은 높지만 옮길 수 있다 · 왕좌가 흔들릴 수 있다',
 "p10":'기사(Prince) · 영주에게 도전하는 자 · 침팬지와 달리 같은 종족이라 신분상승이 가능하다',
 "p13":'소작농(Serf) · 차별화 없는 바닥 · 아키텍처·전환비용·네트워크 효과 없음 · 매출이 늘어도 주가는 제자리',
 "p17":'표준 DRAM 5조건 전부 X · 공통 표준·대체 가능·수급 사이클 = 킹덤의 영주, 왕관이 세대마다 돌아간다',
 "p24":'원칙 6 · 영주·기사는 가볍게 보유 · 시장 하락에 개별 종목 매도 · 초고성장 썰물엔 카테고리 전체 매도',
}

NOTES = {
 "p03":'해설: Cisco는 네트워크 장비 시장의 오랜 1등이지만, 경쟁사도 같은 인터넷 표준(IP·Ethernet)을 쓰기 때문에 고객이 장비를 교체할 수 있다. 점유율이 높아도 구조가 개방형이면 영주다',
 "p05":'해설: Oracle 데이터베이스는 SQL이라는 공통 표준 위에 있어 다른 DB로 이전이 가능하다. 전환비용은 있지만 영장류 정글만큼 살벌하지 않다. 두 사례 모두 v4 기획서의 분류를 따른다',
 "p08":'해설: 기사(Prince)는 개방형 시장의 도전자다. Moore는 킹덤에서 신분상승이 가능하다고 보았으며, 이것이 영장류 정글(침팬지는 고릴라가 될 수 없다)과의 결정적 차이다',
 "p15":'해설: 고릴라 판별 기준(독점 아키텍처·전환비용·네트워크 효과·가격 결정권·완전완비제품)으로 본 표준 DRAM. JEDEC 규격 아래 삼성전자·SK하이닉스·마이크론이 상호 대체 가능하고 가격은 수급 사이클이 정한다. 10화의 "DRAM = 킹덤" 결론과 같다',
 "p19":'해설: HBM은 GPU 패키지 위에 적층되어 함께 검증(qualification)을 받는다. 검증 통과 후 공급사 교체는 재검증 비용이 커 전환비용이 높다. 그래서 같은 메모리라도 HBM은 "토네이도 속의 니치 고릴라" 후보가 된다(10화 한실속의 교차 도식)',
 "p24":'해설: Moore 원칙 6 원문: "Hold kings and princes lightly, selling individual stocks on a marketplace stumble and the category upon deceleration of hypergrowth." 영주·기사는 매수 확정이 아니라 관찰(WATCH) 대상이다',
}

if __name__ == "__main__": run(globals())
