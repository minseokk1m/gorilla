#!/usr/bin/env python3
# 고릴라 헌터스 Ep20 "고릴라 헌터스 투자클럽" — 시즌 2 피날레 (33p, ④ 실전)
# 2026-09-13 작성. season2-plan.md Ep20 · F3-9(클럽 필요→IRL 클럽 입구) · 민성원 v4 피드백 ④ Playbook · v4 Ep20(TIME ETF 6등급)·Ep39(ETF의 역설) 계승
# 참고: BetterInvesting(NAIC) 투자클럽 관행(6~15명, 파트너십 계약·바이로, 월례 모임 안건·의사록, 매 모임 교육 시간)
# ※ p33 IRL 클럽 안내 문구는 회장님 확정 후 교체 (현재는 자리 표시)
# ※ 작화 직전 TIME ETF 보유 종목·비중 갱신 (season2-plan.md 부록 B)
# usage: python3 gen_ep20.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP20"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep20")
STAGE = "④ 실전"

EXTRA_CHARS = ("EP20 NOTE: the club meets at the same study room; a small round side table may appear for the 'first meeting'. "
               "Company names appear ONLY as clean labels on cards or the whiteboard; NEVER real logos. NA BAE-UM's phone on p30 shows ONLY a green rising line and the text '+28%'.")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A warm round table seen from above with eight chairs, a kraft notebook at each seat, one candle-like lamp at center; no readable text. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, leaning forward; the whole group present including the TALC five and HAN TANG-SU. (2 ~45%) JU BON-JIL holding up five fingers with a smile.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the heading '클럽의 다섯 규칙' on the board. (2 ~45%) NA BAE-UM opening a fresh page of his kraft hunting log.",
 "p04":"One panel (~100%). The whiteboard: under the heading '클럽의 다섯 규칙', rule one drawn as a hand sketch: a row of small stick figures with a bracket, and the label '① 여섯에서 열다섯 명'; JU BON-JIL to the side; ONLY these two labels.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL explaining the size (too few = no debate, too many = no decision); the group counting themselves, comic. (2 ~45%) HAN TANG-SU counting on his fingers, lips moving.",
 "p06":"One panel (~100%). The whiteboard: rule two as a hand sketch of a rolled scroll with a wax seal, labeled '② 회칙을 먼저 쓴다'; beside it three tiny sub-icons with NO text (a coin, a calendar, a door); JU BON-JIL to the side; ONLY this one label plus the heading.",
 "p07":"Two panels. (1 ~55%) JU BON-JIL explaining what the charter covers (money, meetings, joining and leaving), counting three fingers; HAN SIL-SOK nodding approvingly. (2 ~45%) close on HAN SIL-SOK, reassured.",
 "p08":"One panel (~100%). The whiteboard: rule three as five small icons in a row with ONE label each: a hawk labeled '정찰', a camel labeled '완비 분석', an ox labeled '참조사례', an elephant labeled '기록·회계', and a small devil-horned mask labeled '반론'; above them the label '③ 역할 다섯'; JU BON-JIL to the side; ONLY these six labels plus the heading.",
 "p09":"Two panels. (1 ~55%) JU BON-JIL pointing at the devil-mask icon, grinning; AN MID-EO (flip phone) raising his hand slowly, the group laughing. (2 ~45%) close on AN MID-EO's stern face with the faintest smile.",
 "p10":"One panel (~100%). The whiteboard: rule four as a hand-drawn meeting agenda card labeled '④ 월례 안건' with four short lines exactly: '교육 20분' / '후보 발표' / '판별표로 검증' / '반론과 기록'; a small clock icon; JU BON-JIL to the side; ONLY these labels plus the heading.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL explaining the agenda order; NA BAE-UM copying. (2 ~45%) JU BON-JIL tapping the line '반론과 기록' twice.",
 "p12":"One panel (~100%). The whiteboard: rule five as a hand-drawn calendar strip with four circled marks and the label '⑤ 분기 리밸런싱'; beneath it a small line '결정은 회의에서만'; JU BON-JIL stepping back; ONLY these two labels plus the heading.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM's log close-up: ONLY these hand-written lines: '① 6~15명' / '② 회칙' / '③ 역할 5' / '④ 월례 안건' / '⑤ 분기 리밸런싱'. (2 ~45%) NA BAE-UM's satisfied face.",
 "p14":"One panel (~100%). A clean hand-drawn LOG FORM on the whiteboard titled '사냥 일지 양식' with these fields exactly, each as a short line with an empty box after it: '종목·카테고리' / '① 채택 위치' / '② 기대 위치' / '③ 등급' / '④ 신호' / '스탠스' / '반론' / '다음 점검일'; JU BON-JIL to the side; ONLY these labels.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL explaining the two new fields (objection, next check date); NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL clapping once, announcing the first official meeting; the group straightening up. (2 ~45%) the group rearranging chairs into a circle around the long table, HAN TANG-SU dragging a chair, comic energy.",
 "p17":"Two panels. (1 ~55%) JU BON-JIL placing a small stack of blank cards on the table, one card face-up showing ONLY the letters 'TIME ETF'. (2 ~45%) HAN SIL-SOK picking up the stack, reading glasses on, ready to present.",
 "p18":"One panel (~100%). The whiteboard: the six-grade table from Ep15 redrawn with headers '영장류 정글' and '킹덤 정글' and rows '고릴라 / 영주', '침팬지 / 기사', '원숭이 / 소작농', plus a side box labeled '위치 라벨'; all cells EMPTY, waiting for cards; HAN SIL-SOK at the board; ONLY these labels.",
 "p19":"One panel (~100%). The same six-grade board with small paper cards now pinned in cells, each card bearing ONLY a company name: in the '고릴라' cell the cards 'NVIDIA', 'ASML', 'TSMC', 'ARM'; in the '침팬지' cell 'AMD'; in the '위치 라벨' box 'Tesla'; HAN SIL-SOK pinning the last card; ONLY these labels and names.",
 "p20":"One panel (~100%). The same board with more cards: in the '영주' cell 'Oracle'; in the '원숭이' cell three cards 'SanDisk', 'WDC', 'Seagate'; a card 'SK하이닉스' placed on the line between '고릴라' and '영주' with a small hand-drawn arrow pointing both ways; HAN SIL-SOK explaining; ONLY these labels and names.",
 "p21":"Two panels. (1 ~55%) HAN SIL-SOK explaining the SK하이닉스 card straddling the line; NA BAE-UM nodding (Ep17). (2 ~45%) AN MID-EO raising the objection hand, the group turning with mock dread.",
 "p22":"Two panels. (1 ~55%) AN MID-EO objecting, flip phone pointed like a gavel; HAN SIL-SOK taking it calmly. (2 ~45%) SHIN JUNG-HAE (cardigan) writing the objection into a log, the recorder role.",
 "p23":"One panel (~100%). The whiteboard corner: a hand-drawn pie chart with a small slice labeled '확실한 고릴라' and a large slice labeled '나머지'; no numbers; HAN SIL-SOK pointing at the small slice, puzzled; ONLY these two labels.",
 "p24":"Two panels. (1 ~55%) HAN SIL-SOK voicing the discovery; the group surprised. (2 ~45%) JU BON-JIL's face, a knowing smile, as if he was waiting for this.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL naming it the next season's question; NA BAE-UM writing fast. (2 ~45%) NA BAE-UM's log close-up: ONLY these hand-written lines: 'ETF는 후보를 찾아준다' / '고릴라에 집중하는 건 우리 몫' / '다음 시즌의 질문'.",
 "p26":"Two panels. (1 ~55%) HAN SIL-SOK sitting down, then hesitantly raising a hand again with a personal question; the group softening. (2 ~45%) close on HAN SIL-SOK, sincere.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL walking over to HAN SIL-SOK and putting a hand on his shoulder; NA BAE-UM moved. (2 ~45%) the whole group turning toward HAN SIL-SOK with warm nods; SHIN JUNG-HAE smiling.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL explaining why this moment matters (the pragmatist joining = the club crossing its own chasm); NA BAE-UM's eyes shining. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"One panel (~100%). A time-skip transition: a calendar page motif with a soft blurred band sweeping across, four circled dates, the study room in the background growing warmer; no readable text.",
 "p30":"Two panels, mirroring Ep1 p03. (1 ~60%) a bright cafe window seat in the morning; NA BAE-UM (39) smiles softly showing his phone screen with ONLY a green rising line and the text '+28%'; on the table the book 'The Gorilla Game' (English title, gorilla silhouette) and the kraft hunting log. (2 ~40%) close on the phone: ONLY the green line and '+28%', four small marks along the year.",
 "p31":"Two panels. (1 ~55%) NA BAE-UM closing the phone, looking out the window, content but level-headed. (2 ~45%) the hunting log close-up: ONLY these hand-written lines: '운이 좋았던 해' / '목표는 은행 이자보다 나은 복리' / '72 ÷ 10 = 7.2년'.",
 "p32":"One panel (~100%). The whiteboard with the LEARNING ROADMAP: four boxes '① 기술수용주기 이해', '② 사례로 익히기', '③ 투자와 연결', '④ 실전', ALL FOUR carrying big GREEN check marks, brackets '시즌 1' under ①② and '시즌 2' under ③④; the whole club gathered in front of it, JU BON-JIL at the side, NA BAE-UM at center holding his log; warm; ONLY these labels.",
 "p33":"One panel (~100%). Closing SEASON-2 finale: the club silhouettes together looking out over a jungle at sunrise, a gorilla silhouette on a far hill with a faint crack of light through it; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band; NO other caption anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 20\n고릴라 헌터스 투자클럽\n혼자 못 하는 게임을 같이 하는 법\n시즌 2 최종화 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','나배움: 그래서 클럽은 어떻게 만들어요?\n우리처럼 모이면 되는 거예요?'),
        (2,'C','speech','주본질: 규칙 다섯 개면 돼\n우리도 그 다섯으로 굴러왔어')],
 "p03":[(1,'C','label','클럽의 다섯 규칙'),
        (2,'C','narr','일지의 새 장을 폈다')],
 "p04":[(1,'C','label','클럽의 다섯 규칙'),(1,'C','label','① 여섯에서 열다섯 명'),
        (1,'C','speech','주본질: 첫째, 사람 수\n여섯보다 적으면 토론이 안 되고\n열다섯보다 많으면 결정이 안 돼')],
 "p05":[(1,'C','speech','주본질: 우리가 지금 몇이지?'),
        (2,'C','speech','한탕수: 주본질 형, 배움이 형, 저, 다섯 분…\n여덟이요! 딱이네요')],
 "p06":[(1,'C','label','클럽의 다섯 규칙'),(1,'C','label','② 회칙을 먼저 쓴다'),
        (1,'C','speech','주본질: 둘째, 돈이 오가기 전에 회칙부터\n돈은 어떻게 모으고 나누는지\n모임은 언제, 들어오고 나가는 건 어떻게')],
 "p07":[(1,'C','speech','주본질: 이 셋을 종이에 적고 다 같이 서명해\n친한 사이일수록 먼저 써야 돼'),
        (2,'C','speech','한실속: 그건 제 스타일이네요\n종이가 있어야 마음이 놓여요')],
 "p08":[(1,'C','label','클럽의 다섯 규칙'),(1,'C','label','③ 역할 다섯'),
        (1,'C','label','정찰'),(1,'C','label','완비 분석'),(1,'C','label','참조사례'),(1,'C','label','기록·회계'),(1,'C','label','반론')],
 "p09":[(1,'C','speech','주본질: 19화의 네 짐승에 하나를 더해\n반론 담당, 회의마다 반드시 반대하는 사람'),
        (2,'C','speech','안믿어: 그건 내가 하지\n평생 해온 일이니까')],
 "p10":[(1,'C','label','클럽의 다섯 규칙'),(1,'C','label','④ 월례 안건'),
        (1,'C','label','교육 20분'),(1,'C','label','후보 발표'),(1,'C','label','판별표로 검증'),(1,'C','label','반론과 기록'),
        (1,'C','speech','주본질: 넷째, 한 달에 한 번, 순서는 늘 같아')],
 "p11":[(1,'C','speech','주본질: 배우고, 후보를 내고, 표로 검증하고\n반드시 반론을 듣고 기록해'),
        (2,'C','speech','주본질: 의미 없는 논쟁 말고, 관찰을 모으는 거야\n10화에서 한 말 그대로')],
 "p12":[(1,'C','label','클럽의 다섯 규칙'),(1,'C','label','⑤ 분기 리밸런싱'),(1,'C','label','결정은 회의에서만'),
        (1,'C','speech','주본질: 다섯째, 사고파는 결정은 분기 회의에서만\n회의 밖에서 누른 버튼은 클럽 계좌가 아니야')],
 "p13":[(1,'C','narr','다섯 줄'),
        (2,'C','think','나배움: 규칙이 다섯이면 지킬 수 있다')],
 "p14":[(1,'C','label','사냥 일지 양식'),
        (1,'C','label','종목·카테고리'),(1,'C','label','① 채택 위치'),(1,'C','label','② 기대 위치'),(1,'C','label','③ 등급'),
        (1,'C','label','④ 신호'),(1,'C','label','스탠스'),(1,'C','label','반론'),(1,'C','label','다음 점검일')],
 "p15":[(1,'C','speech','주본질: 19화의 네 칸에 두 칸을 더했어\n반론 한 줄, 그리고 다음 점검일\n이 두 칸이 혼자서 새는 걸 막아'),
        (2,'C','think','나배움: 반론이 있어야 표가 완성된다')],
 "p16":[(1,'C','speech','주본질: 자, 그럼 첫 정식 회의를 열자\n오늘 안건은 하나야'),
        (2,'C','narr','의자가 둥글게 모였다')],
 "p17":[(1,'C','label','TIME ETF'),
        (1,'C','speech','주본질: AI 회사들을 모아놓은 ETF 하나를\n우리 여섯 등급으로 분류해 보는 거야'),
        (2,'C','speech','한실속: 후보 발표는 제가 하겠습니다')],
 "p18":[(1,'C','label','영장류 정글'),(1,'C','label','킹덤 정글'),(1,'C','label','고릴라 / 영주'),(1,'C','label','침팬지 / 기사'),(1,'C','label','원숭이 / 소작농'),(1,'C','label','위치 라벨'),
        (1,'C','speech','한실속: 카드를 한 장씩 칸에 꽂겠습니다')],
 "p19":[(1,'C','label','NVIDIA'),(1,'C','label','ASML'),(1,'C','label','TSMC'),(1,'C','label','ARM'),(1,'C','label','AMD'),(1,'C','label','Tesla'),
        (1,'C','speech','한실속: 고릴라 넷, 침팬지 하나\n그리고 테슬라는 캐즘 위치 라벨로')],
 "p20":[(1,'C','label','Oracle'),(1,'C','label','SanDisk'),(1,'C','label','WDC'),(1,'C','label','Seagate'),(1,'C','label','SK하이닉스'),
        (1,'C','speech','한실속: 데이터베이스는 영주, 저장장치 셋은 원숭이\n그리고 SK하이닉스는 선 위에 놓겠습니다\nDRAM은 영주, HBM은 고릴라 후보니까')],
 "p21":[(1,'C','speech','한실속: 17화에서 배운 대로\n한 회사 안에 두 정글이 있는 경우입니다'),
        (2,'C','narr','반론 담당이 손을 들었다')],
 "p22":[(1,'C','speech','안믿어: 저장장치 셋을 원숭이로 묶은 근거가 뭐요\n표를 채웠소, 감으로 놓은 거요?'),
        (2,'C','speech','신중해: 반론 기록했어요\n다음 회의까지 표를 채워 오기로')],
 "p23":[(1,'C','label','확실한 고릴라'),(1,'C','label','나머지'),
        (1,'C','speech','한실속: 그런데 이상한 게 있어요\n비중을 더해 보니 확실한 고릴라가 이만큼밖에 안 돼요')],
 "p24":[(1,'C','speech','한실속: AI ETF인데 고릴라만 담는 게 아니네요\n기대와 유행까지 같이 담겨 있어요'),
        (2,'C','think','주본질: 실용주의자가 스스로 찾아냈다')],
 "p25":[(1,'C','speech','주본질: 좋은 발견이야\nETF는 후보를 찾아주는 데까지야\n고릴라에 집중하는 건 우리 몫이지\n그게 다음 시즌의 질문이 될 거야'),
        (2,'C','narr','세 줄')],
 "p26":[(1,'C','speech','한실속: 저… 하나만 여쭤볼게요\n저 같은 사람도 정식으로 들어와도 되나요?'),
        (2,'C','speech','한실속: 여태 옆에서 보기만 했는데\n이제 제 돈도 넣어보고 싶어서요')],
 "p27":[(1,'C','speech','주본질: 실속 씨, 당신이 들어오는 순간이\n이 클럽이 골짜기를 건너는 순간이야'),
        (2,'C','narr','모두가 고개를 끄덕였다')],
 "p28":[(1,'C','speech','주본질: 선구자만 모인 클럽은 초기시장이야\n실용주의자가 들어와야 진짜 시장이 되지\n당신이 우리의 참조사례야'),
        (2,'C','think','나배움: 만화 스무 편이 이 한 장면을 위한 거였구나')],
 "p29":[(1,'C','narr','그리고 네 번의 분기 회의가 지났다')],
 "p30":[(1,'C','narr','1년 뒤, 같은 카페, 같은 자리'),
        (2,'C','label','+28%')],
 "p31":[(1,'C','think','나배움: 운이 좋았던 해였다\n목표는 늘 은행 이자보다 나은 복리\n72를 10으로 나누면 7.2년'),
        (2,'C','narr','일지 마지막 장')],
 "p32":[(1,'C','label','① 기술수용주기 이해'),(1,'C','label','② 사례로 익히기'),(1,'C','label','③ 투자와 연결'),(1,'C','label','④ 실전'),
        (1,'C','speech','주본질: 지도의 네 칸이 다 찼어\n이제 너희가 사냥꾼이야'),
        (1,'C','speech','나배움: 다음 시즌은요?'),
        (1,'C','speech','주본질: 고릴라의 해부학\n왕좌의 균열을 들여다본다')],
 "p33":[(1,'C','caption','Episode 20 끝 · 시즌 2 완결 · 다음 시즌 · 고릴라의 해부학\n(고릴라 헌터스 투자클럽 안내: 회장님 확정 후 문구 삽입)')],
}

BANDS = {
 "p04":'클럽 규칙 ① 6~15명 · 적으면 토론이 안 되고 많으면 결정이 안 된다',
 "p08":'클럽 규칙 ③ 역할 다섯 · 정찰(매) · 완비 분석(낙타) · 참조사례(소) · 기록·회계(코끼리) · 반론',
 "p10":'클럽 규칙 ④ 월례 안건 · 교육 20분 → 후보 발표 → 판별표 검증 → 반론과 기록 · 논쟁 말고 관찰을 모은다',
 "p14":'사냥 일지 양식 · 분기 점검표 4칸 + 스탠스 + 반론 + 다음 점검일',
 "p25":'ETF의 역설 · AI ETF도 고릴라만 담지 않는다 · ETF는 후보 식별까지, 고릴라 집중은 클럽의 몫 (시즌 3의 질문)',
 "p28":'실용주의자가 들어오는 순간 클럽이 캐즘을 건넌다 · 선구자만 모인 클럽은 초기시장이다',
}

NOTES = {
 "p04":'해설: 투자클럽 운영 관행은 미국 BetterInvesting(구 NAIC)의 권고를 참고했다. 6~15명 규모, 파트너십 계약과 바이로(회칙), 월례 모임의 안건·의사록, 매 모임의 교육 시간이 공통 요소다. 국내에서 클럽 계좌를 공동 운용할 때의 법적 형태(조합 등)는 별도 검토가 필요하다',
 "p06":'해설: 회칙에는 최소 세 가지가 들어간다. 돈(출자·배분·회계), 모임(주기·정족수·의결), 가입과 탈퇴(절차·정산). 돈이 오가기 전에 서면으로 합의하는 것이 클럽이 오래가는 첫째 조건이다',
 "p08":'해설: 반론 담당(devil\'s advocate)은 회의마다 의무적으로 반대 논거를 내는 역할이다. 19화의 확증편향·정보 편식을 막는 장치이며, 기록 담당이 반론을 일지에 남긴다',
 "p14":'해설: 사냥 일지 양식은 19화의 분기 점검표(채택 위치·기대 위치·등급·신호)에 스탠스·반론·다음 점검일을 더한 클럽 표준 양식이다. 종목이 아니라 카테고리 단위로 쓴다(10화)',
 "p19":'사실 확인: 분류는 2026-09 기준 본 만화의 예시이며 TIME 글로벌AI인공지능액티브 ETF의 실제 보유 종목·비중은 수시로 바뀐다. 작화 시 최신 구성으로 갱신한다. 특정 종목·ETF의 매수·매도를 권하지 않는다',
 "p23":'해설: "ETF의 역설"은 AI 테마 ETF에서 확실한 고릴라의 합산 비중이 의외로 낮고(예시치 20% 안팎) 비고릴라·모멘텀 종목이 더 큰 비중을 차지한다는 관찰이다. 분산형 ETF는 종목당 비중 상한과 정기 리밸런싱 때문에 확신에 따른 집중을 하지 못한다. 시즌 3에서 다룬다',
 "p30":'해설: 1화 프롤로그의 +28%와 같은 장면이다. 이 수익률은 가상의 예시이며, 클럽의 목표는 특정 해의 수익이 아니라 은행 이자보다 나은 수익을 복리로 오래 쌓는 것이다(10화 Rule of 72)',
}

if __name__ == "__main__": run(globals())
