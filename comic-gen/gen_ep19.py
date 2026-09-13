#!/usr/bin/env python3
# 고릴라 헌터스 Ep19 "루틴: 분기 한 번의 사냥 일지" — 시즌 2 (31p, ④ 실전)
# 2026-09-13 작성. season2-plan.md Ep19 · F3-9(루틴화→지속가능 사이클→클럽 필요) · F3-1(④ 실전) · Moore 10대 원칙(v4 Ep35 계승) · 맥스 네 짐승
# usage: python3 gen_ep19.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP19"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep19")
STAGE = "④ 실전"

EXTRA_CHARS = ("EP19 NOTE: the '사냥 일지' is a plain kraft-cover notebook; the quarterly checklist is always a clean hand-drawn whiteboard card with EXACTLY the labels listed. "
               "Storybook insets about the ORACLE and the four beasts (a hawk, a camel, an ox, an elephant) are soft vintage tone with ONLY anonymous ancient-era people.")

CHECK4 = ("a hand-drawn card titled '분기 점검표' with four numbered boxes in a row labeled exactly '① 채택 위치', '② 기대 위치', '③ 등급', '④ 신호'")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A plain kraft-cover notebook on a wooden desk under a lamp, a wall calendar behind it with exactly four dates circled in red across the year; no readable text. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, arms spread helplessly; JU BON-JIL calm. (2 ~45%) JU BON-JIL holding up one finger and shaking his head slowly.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL recalling Ep1: a small inset of the Ep1 contrast (a tired trader at six monitors at 3 AM vs NA BAE-UM relaxed at a dinner table), NO text. (2 ~45%) JU BON-JIL writing ONLY '1년에 한두 번' and '분기에 한 번' as two short lines on the board.",
 "p04":"Two panels. (1 ~55%) HAN TANG-SU (red cap) protesting that this sounds boring; JU BON-JIL amused. (2 ~45%) JU BON-JIL erasing and drawing the outline of a card (no text yet).",
 "p05":f"One panel (~100%). The whiteboard shows {CHECK4}; each box is EMPTY inside; JU BON-JIL to the side; ONLY these five labels.",
 "p06":f"One panel (~100%). The whiteboard {CHECK4}; inside box ① a tiny sketch of the five-row table from Ep12 (a small grid, no words) and beneath the box a small label '판별표 5행'; the other boxes empty; JU BON-JIL pointing at box ①; ONLY the five card labels plus '판별표 5행'.",
 "p07":f"One panel (~100%). The whiteboard {CHECK4}; box ① holds the tiny grid, box ② holds a tiny thermometer sketch with a small label beneath '측정 5도구', the other boxes empty; JU BON-JIL pointing at box ②; ONLY the card labels plus '판별표 5행' and '측정 5도구'.",
 "p08":f"One panel (~100%). The whiteboard {CHECK4}; box ① the grid, box ② the thermometer, box ③ a tiny gorilla-and-crown sketch with a small label beneath '6등급 + 위치', box ④ empty; JU BON-JIL pointing at box ③; ONLY the card labels plus the three small labels.",
 "p09":f"One panel (~100%). The whiteboard {CHECK4} fully filled: box ① grid, box ② thermometer, box ③ gorilla-and-crown, box ④ a tiny traffic-light sketch with a small label beneath '매수 3신호 · EXIT 3신호 · 대체 위협'; JU BON-JIL stepping back; NA BAE-UM copying; ONLY the card labels plus the four small labels.",
 "p10":"Two panels. (1 ~55%) NA BAE-UM's face lighting up as the whole series fits into one card; JU BON-JIL pleased. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '① 채택 위치 = 시즌 1 + 판별표' / '② 기대 위치 = 11~13화' / '③ 등급 = 15~18화' / '④ 신호 = 매수 3 · EXIT 3 · 대체 위협'.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL turning to a new board section, holding up ten fingers; HAN TANG-SU groaning comically. (2 ~45%) JU BON-JIL writing ONLY the heading '10대 원칙' on the board.",
 "p12":"One panel (~100%). The whiteboard: a clean hand-drawn list under the heading '10대 원칙' with FIVE short numbered Korean lines exactly: '1 응용SW는 볼링앨리에서 산다' / '2 지원기술은 토네이도 뒤에 산다' / '3 후보는 바구니로, 넷 이하' / '4 고릴라는 길게, 대체 위협에만 판다' / '5 응용SW 침팬지만 보유'; a small label under the list '매수와 보유'; JU BON-JIL to the side; ONLY these lines.",
 "p12b":"One panel (~100%). The whiteboard: the list continues under the same heading '10대 원칙' with FIVE short numbered Korean lines exactly: '6 영주·기사는 가볍게' / '7 고릴라 못 될 종목은 즉시 판다' / '8 뺀 돈은 남은 후보에 재투자' / '9 고릴라 충돌은 결판까지 보유' / '10 대부분의 뉴스는 무시한다'; a small label under the list '매도와 잡음'; the tenth line circled in red; JU BON-JIL to the side; ONLY these lines.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL tapping line 10 with emphasis; the group attentive. (2 ~45%) close on JU BON-JIL's calm face.",
 "p14":"Two panels. (1 ~55%) HAN TANG-SU holding up his phone with a blurred flood of notification shapes (no readable text), overwhelmed. (2 ~45%) JU BON-JIL drawing ONLY a small funnel sketch on the board with a big pile of dots entering and one dot leaving.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL explaining the filter (only ten triggers pass); NA BAE-UM nodding. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '뉴스는 10대 원칙 중 하나를 건드릴 때만' / '나머지는 소음'.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL handing NA BAE-UM a plain kraft-cover notebook; NA BAE-UM receiving it with both hands. (2 ~45%) close on the notebook cover with ONLY the hand-written words '사냥 일지'.",
 "p17":"One panel (~100%). NA BAE-UM's open hunting log close-up: a clean hand-drawn page with a small header 'HBM' and four short lines exactly: '① 토네이도' / '② 언덕' / '③ 고릴라 후보' / '④ 신호 없음 → 보유'; and a small date-less checkbox ticked; nothing else written.",
 "p18":"One panel (~100%). The hunting log next page: header '전기차' with four lines exactly: '① 캐즘' / '② 골' / '③ 캐즘 위치' / '④ 신호 없음 → 바구니 관찰'; a ticked checkbox; nothing else.",
 "p19":"One panel (~100%). The hunting log next page: header '양자' with four lines exactly: '① 초기시장' / '② 정점 지남' / '③ 등급 없음' / '④ EXIT 켜짐 → 관망'; a ticked checkbox; nothing else.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM closing the log with a satisfied breath; JU BON-JIL nodding. (2 ~45%) JU BON-JIL's face turning serious, a 'but' coming.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL asking a hard question, leaning on the table; NA BAE-UM caught off guard. (2 ~45%) HAN TANG-SU looking away guiltily, cap pulled down.",
 "p22":"One panel (~100%). The whiteboard: four hand-drawn icons in a row with ONE label each: a drooping battery labeled '동기 저하', a pair of glasses with only one lens labeled '확증편향', a single narrow pipe labeled '정보 편식', a broken chain labeled '원칙 이탈'; JU BON-JIL to the side; ONLY these four labels.",
 "p23":"Two panels, the four failures as HAN TANG-SU vignettes (small inset panels). (1 ~50%) HAN TANG-SU asleep over his log (battery); HAN TANG-SU reading only cheering posts on his phone (blurred, no text) (one-lens glasses). (2 ~50%) HAN TANG-SU watching one channel only (narrow pipe); HAN TANG-SU tapping buy while the EXIT card is visible on the board behind him (broken chain).",
 "p24":"Two panels. (1 ~55%) JU BON-JIL summing up: the log works, the person fails; NA BAE-UM sober. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p25":"Two panels, storybook inset (vintage tone, ONLY anonymous ancient-era people, NO readable text). (1 ~55%) the old bearded ORACLE by a dying fire drawing four beasts on a cave wall with a charred stick: a hawk, a camel, an ox, an elephant; MAX and his wife watching. (2 ~45%) the oracle drawing a single tiny harness trying to yoke all four beasts at once, the beasts pulling in four directions, comic.",
 "p26":"One panel (~100%). The whiteboard: the four beasts redrawn as simple icons in a row with ONE label each: a hawk labeled '정찰', a camel labeled '완비 분석', an ox labeled '참조사례 확인', an elephant labeled '운영·기록'; beneath them a short line '한 사람이 네 짐승에 마구를 달 수 없다'; JU BON-JIL to the side; ONLY these five labels.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL explaining the four roles; the TALC five at the table each unconsciously matching a beast (SIN-SANG hawk-eyed, SIL-SOK ox-steady, etc.), comic. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '루틴은 혼자 못 지킨다' / '역할을 나눈다' / '그래서 클럽'.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '분기에 한 번, 네 칸' / '뉴스는 열 원칙의 체로' / '혼자선 새고, 같이면 버틴다'.",
 "p29":"Two panels. (1 ~55%) at the door JU BON-JIL turns back with the final hook of the season. (2 ~45%) a faint dreamy image in webtoon ink style: a round table with empty chairs and one kraft notebook at each seat; NO text.",
 "p30":"One panel (~100%). Closing chapter-end: the round table in the distance, chairs waiting; NA BAE-UM and JU BON-JIL small figures walking toward it; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 19\n루틴: 분기 한 번의 사냥 일지\n매일은 아무것도 하지 않는다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','나배움: 표도 있고 곡선도 있고 등급도 있는데\n매일 뭘 봐야 하는지 모르겠어요'),
        (2,'C','speech','주본질: 매일은 아무것도 안 봐\n그게 이 게임의 규칙이야')],
 "p03":[(1,'C','narr','1화에서 본 두 게임\n매일 보는 게임과, 분기에 한 번 보는 게임'),
        (2,'C','speech','주본질: 결정은 1년에 한두 번\n나머지는 분기에 한 번 점검이면 충분해')],
 "p04":[(1,'C','speech','한탕수: 그게 다예요? 너무 심심한데요'),
        (2,'C','speech','주본질: 심심해야 이겨\n대신 그 한 번을 제대로 하는 표를 만들자')],
 "p05":[(1,'C','label','분기 점검표'),(1,'C','label','① 채택 위치'),(1,'C','label','② 기대 위치'),(1,'C','label','③ 등급'),(1,'C','label','④ 신호'),
        (1,'C','speech','주본질: 네 칸이야\n시즌 1과 2에서 배운 게 전부 여기 들어가')],
 "p06":[(1,'C','label','판별표 5행'),
        (1,'C','speech','주본질: 첫째 칸, 채택 위치\n12화의 다섯 줄 판별표로 초기시장인지 골짜기를 건넜는지')],
 "p07":[(1,'C','label','측정 5도구'),
        (1,'C','speech','주본질: 둘째 칸, 기대 위치\n온도계 다섯 개로 정점인지 골인지')],
 "p08":[(1,'C','label','6등급 + 위치'),
        (1,'C','speech','주본질: 셋째 칸, 등급\n어느 정글의 무슨 동물인지, 아니면 아직 위치뿐인지')],
 "p09":[(1,'C','label','매수 3신호 · EXIT 3신호 · 대체 위협'),
        (1,'C','speech','주본질: 넷째 칸, 신호\n들어갈 신호, 나올 신호, 그리고 고릴라를 파는 유일한 이유\n대체 위협이 입증됐는가')],
 "p10":[(1,'C','speech','나배움: 열아홉 화가 한 장에 다 들어가네요'),
        (2,'C','narr','네 줄로 정리했다')],
 "p11":[(1,'C','speech','주본질: 그리고 이 네 칸 뒤에 무어의 원칙 열 개가 서 있어'),
        (2,'C','label','10대 원칙')],
 "p12":[(1,'C','label','10대 원칙'),(1,'C','label','1 응용SW는 볼링앨리에서 산다'),(1,'C','label','2 지원기술은 토네이도 뒤에 산다'),(1,'C','label','3 후보는 바구니로, 넷 이하'),
        (1,'C','label','4 고릴라는 길게, 대체 위협에만 판다'),(1,'C','label','5 응용SW 침팬지만 보유'),(1,'C','label','매수와 보유')],
 "p12b":[(1,'C','label','10대 원칙'),(1,'C','label','6 영주·기사는 가볍게'),(1,'C','label','7 고릴라 못 될 종목은 즉시 판다'),(1,'C','label','8 뺀 돈은 남은 후보에 재투자'),
        (1,'C','label','9 고릴라 충돌은 결판까지 보유'),(1,'C','label','10 대부분의 뉴스는 무시한다'),(1,'C','label','매도와 잡음')],
 "p13":[(1,'C','speech','주본질: 열 번째가 제일 어려워\n대부분의 뉴스는 이 게임과 상관이 없어'),
        (2,'C','speech','주본질: 무시하는 법을 배워야 해')],
 "p14":[(1,'C','speech','한탕수: 근데 하루에 알림이 백 개는 와요\n어떻게 무시해요?'),
        (2,'C','narr','체 하나')],
 "p15":[(1,'C','speech','주본질: 뉴스가 열 원칙 중 하나를 건드리나\n건드리면 점검, 아니면 소음\n체를 통과하는 건 한 달에 한두 개야'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','speech','주본질: 자, 네 첫 사냥 일지야\n오늘 분기 점검을 해보자'),
        (2,'C','label','사냥 일지')],
 "p17":[(1,'C','label','HBM'),(1,'C','label','① 토네이도'),(1,'C','label','② 언덕'),(1,'C','label','③ 고릴라 후보'),(1,'C','label','④ 신호 없음 → 보유'),
        (1,'C','narr','첫 장은 HBM')],
 "p18":[(1,'C','label','전기차'),(1,'C','label','① 캐즘'),(1,'C','label','② 골'),(1,'C','label','③ 캐즘 위치'),(1,'C','label','④ 신호 없음 → 바구니 관찰'),
        (1,'C','narr','둘째 장은 전기차')],
 "p19":[(1,'C','label','양자'),(1,'C','label','① 초기시장'),(1,'C','label','② 정점 지남'),(1,'C','label','③ 등급 없음'),(1,'C','label','④ EXIT 켜짐 → 관망'),
        (1,'C','narr','셋째 장은 양자, 석 장에 십오 분이 걸렸다')],
 "p20":[(1,'C','speech','나배움: 이게 분기 점검이면\n정말 회사 다니면서도 되겠어요'),
        (2,'C','speech','주본질: 표는 완벽해\n문제는 표가 아니라 사람이야')],
 "p21":[(1,'C','speech','주본질: 이 표를 혼자서 4년 동안 열여섯 번\n한 번도 안 빼먹고 쓸 자신 있나?'),
        (2,'C','think','한탕수: 나는 지난달 것도 안 썼는데')],
 "p22":[(1,'C','label','동기 저하'),(1,'C','label','확증편향'),(1,'C','label','정보 편식'),(1,'C','label','원칙 이탈'),
        (1,'C','speech','주본질: 혼자면 넷 중 하나에서 반드시 새\n지루해지고, 보고 싶은 것만 보고\n한 군데서만 듣고, 원칙을 슬쩍 넘어')],
 "p23":[(1,'C','narr','탕수가 넷을 다 보여줬다\n졸고, 응원 글만 읽고, 한 채널만 보고'),
        (2,'C','narr','그리고 출구 카드 앞에서 매수 버튼을 눌렀다')],
 "p24":[(1,'C','speech','주본질: 표가 실패하는 게 아니야\n표를 든 사람이 혼자라서 실패해'),
        (2,'C','think','나배움: 나도 혼자였으면 여기까지 못 왔다')],
 "p25":[(1,'C','narr','맥스도 이 벽에 부딪혔다\n오라클은 동굴 벽에 짐승 넷을 그렸다'),
        (2,'C','speech','오라클: 매, 낙타, 소, 코끼리\n이 넷에 마구 하나를 동시에 달 수 있겠나')],
 "p26":[(1,'C','label','정찰'),(1,'C','label','완비 분석'),(1,'C','label','참조사례 확인'),(1,'C','label','운영·기록'),
        (1,'C','label','한 사람이 네 짐승에 마구를 달 수 없다'),
        (1,'C','speech','주본질: 우리 게임도 짐승이 넷이야\n멀리 보는 매, 길게 가는 낙타\n묵묵히 확인하는 소, 무거운 걸 지는 코끼리')],
 "p27":[(1,'C','speech','주본질: 한 사람이 넷을 다 하려다 새는 거야\n나눠 들면 버텨\n그래서 클럽이야'),
        (2,'C','narr','세 줄')],
 "p28":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','speech','주본질: 다음 시간이 시즌 2의 마지막이야\n클럽을 어떻게 만들고, 어떻게 굴리는지\n그리고 첫 회의'),
        (2,'C','narr','빈 의자마다 일지가 한 권씩 놓여 있었다')],
 "p30":[(1,'C','caption','Episode 19 끝 · 다음 화 · 고릴라 헌터스 투자클럽\n(결성과 운영의 다섯 규칙 · 첫 회의)')],
}

BANDS = {
 "p05":'분기 점검표 4칸 · ① 채택 위치(판별표 5행) ② 기대 위치(측정 5도구) ③ 등급(6등급+위치) ④ 신호(매수 3·EXIT 3·대체 위협)',
 "p12":'Moore 10대 원칙 (1~5) · 매수 타이밍(1·2) · 바구니(3) · 고릴라 보유(4) · 침팬지(5)',
 "p12b":'Moore 10대 원칙 (6~10) · 영주·기사(6) · 매도·재투자(7·8) · 충돌(9) · 뉴스 무시(10)',
 "p15":'원칙 10 · 뉴스가 열 원칙 중 하나를 건드릴 때만 점검, 나머지는 소음 · 체를 통과하는 건 한 달에 한두 개',
 "p22":'혼자서 새는 네 곳 · 동기 저하 · 확증편향 · 정보 편식 · 원칙 이탈',
 "p26":'네 짐승 = 네 역할 · 정찰(매) · 완비 분석(낙타) · 참조사례 확인(소) · 운영·기록(코끼리) · 한 사람이 다 할 수 없다',
}

NOTES = {
 "p03":'해설: "결정은 1년에 한두 번, 점검은 분기에 한 번"은 1화에서 세운 고릴라 게임의 시간 규칙이다. 결정 횟수가 적고 장기 보유이며 매일의 압박이 없기에 보통 사람이 프로보다 잘할 수 있다',
 "p05":'해설: 분기 점검표는 시즌 1·2의 도구를 네 칸으로 접은 고릴라 헌터스 클럽의 실전 양식이다. ① 채택 위치는 3·12화 판별표, ② 기대 위치는 11~13화, ③ 등급은 15~18화, ④ 신호는 6화(매수)·13화(EXIT)·9화(대체 위협)에서 왔다',
 "p12":'해설: Moore, 『The Gorilla Game』의 매수·매도 10대 원칙을 한 줄씩 압축했다. 원칙 2의 "enabling"은 번역서에 오역 소지가 있어 "지원 기술(enabling hardware or software)"로 병기한다. 원문은 v4 기획서 시즌 4 표 참조',
 "p13":'해설: 원칙 10 원문: "Most news has nothing to do with the gorilla game. Learn to ignore it." 어닝 미스 한 번, 경영진 발언, 단기 매크로 변동은 열 원칙 중 하나를 건드리지 않는 한 매도 사유가 아니다',
 "p22":'해설: 확증편향은 보고 싶은 정보만 받아들이는 심리 경향이다. 혼자 투자할 때 루틴이 무너지는 네 경로(동기 저하·확증편향·정보 편식·원칙 이탈)는 투자클럽이 필요한 이유이며, 20화의 클럽 규칙은 이 넷을 막도록 설계됐다',
 "p25":'해설: 『마케팅 천재가 된 맥스』에서 오라클은 네 세일즈맨을 매·낙타·소·코끼리에 비유하며 "네 짐승에 동시에 마구를 달 수 없다"고 말한다. 시장마다 다른 역할이 필요하다는 뜻으로, 본 만화는 이를 투자클럽의 역할 분담에 빌려 썼다',
}

if __name__ == "__main__": run(globals())
