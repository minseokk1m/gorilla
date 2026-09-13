#!/usr/bin/env python3
# 고릴라 헌터스 Ep13 "초기시장의 과열: 양자컴퓨터" — 시즌 2 (32p)
# 2026-09-13 작성. season2-plan.md Ep13 · F3-8(최신 테크 사례, 초기시장+정점 판별 → 단기 수익 안목) · RIDE/EXIT(v4 Ep31-32 계승)
# 팩트(2026-09-13 웹 확인): 양자컴퓨팅주 2024 급등(12개월 최대 +6,200%) → 2025-01 젠슨 황 "실용화 15년+" 발언에 업종 급락(-60% 안팎)
#   → 2025-03 발언 철회 → 2025-06 "변곡점" → 재급등 → 2026-07 고점 대비 60~76% 하락 → IonQ 2026 2분기 매출 8,010만 달러(+287%), 연 가이던스 2.8~2.9억 달러
# ※ 작화 직전 수치 갱신 필수 (season2-plan.md 부록 B)
# usage: python3 gen_ep13.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP13"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep13")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP13 NOTE: the quantum-computer motif is an abstract cluster of glowing spheres linked by thin lines, or a golden chandelier-like cryostat, NEVER a real company's machine or logo. "
               "Any price chart is a clean hand-drawn whiteboard line with ONLY the labels listed, no numbers.")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A golden chandelier-like cryostat (abstract quantum computer) glows in the dark; above it a thin RED curve rises to a sharp peak; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) HAN TANG-SU (red cap) bursting in waving his phone (screen OFF), breathless; the members turning. (2 ~45%) CHOI SIN-SANG (headphones, gadget vest) raising a hand eagerly, a small laptop open in front of him showing ONLY an abstract cluster of glowing dots (no text).",
 "p03":"Two panels. (1 ~55%) GO BI-JEON (navy suit) standing with a visionary gesture toward the window. (2 ~45%) HAN SIL-SOK (knit vest, glasses) shrugging calmly with open palms; SHIN JUNG-HAE (cardigan) beside him uncertain.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL at the whiteboard which shows ONLY a big hand-drawn question mark; he looks pleased at the debate. (2 ~45%) JU BON-JIL uncapping the marker, glancing at NA BAE-UM.",
 "p05":"One panel (~100%). A hand-drawn whiteboard strip of three small scenes with ONE clean Korean label under each: LEFT a government building with a flag and a money-bag icon labeled '정부 프로그램', CENTER a laboratory with a cryostat and lab coats labeled '연구소', RIGHT a bank tower with a small test-tube icon labeled '금융사 실험'; JU BON-JIL to the side; ONLY these three labels.",
 "p06":"One panel (~100%). The whiteboard shows the FIVE-row checklist table titled '초기시장인가, 골짜기를 건넜나' with column headers '초기시장' and '골짜기 건넘', row labels '누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출' and cells '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; '없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴'; a far-right column headed '양자' with check marks on the '초기시장' side for rows 1, 2, 3 and 5 and a small circled '?' for row 4; NA BAE-UM presenting; ONLY these labels and marks.",
 "p07":"Two panels. (1 ~55%) NA BAE-UM explaining row four, marker hovering at the circled '?'; JU BON-JIL listening. (2 ~45%) JU BON-JIL nodding slowly, one finger raised.",
 "p08":"Two panels. (1 ~55%) JU BON-JIL writing on a corner of the board ONLY the words '매출은 생기는 중' in a small box; NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p09":"Two panels. (1 ~55%) JU BON-JIL erasing the board, HAN TANG-SU impatient. (2 ~45%) JU BON-JIL drawing the first stroke of a long timeline.",
 "p10":"One panel (~100%). The whiteboard: a hand-drawn price line over a timeline, shaped as: a low flat start, a steep climb to a high peak, a sudden cliff drop to less than half, a partial rebound, another climb to a higher peak, then a long slide down to about a third; FIVE small clean Korean labels at these points in order: '2024 급등', '2025년 1월 한마디', '철회', '재급등', '2026 조정'; JU BON-JIL to the side; ONLY these five labels, no numbers.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL tapping the cliff drop; NA BAE-UM wide-eyed. (2 ~45%) a small inset in vintage tone (no readable text): an anonymous executive figure at a podium and a crowd of anonymous traders throwing papers, comic exaggeration, NO real person's likeness.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL tapping the rebound and the second peak; HAN TANG-SU brightening. (2 ~45%) JU BON-JIL's finger sliding down the long final slide; HAN TANG-SU deflating.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM standing with a realization, pointing at the timeline. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '한마디에 반이 사라지는 가격' / '= 기대가 지탱하는 가격'.",
 "p14":"One panel (~100%). The whiteboard: a simple 2x2 grid with row labels on the left '정점' (top) and '골' (bottom), column labels on top '초기시장' (left) and '골짜기 건넘' (right); the top-left cell is shaded red and holds a small star; ONLY these four labels; JU BON-JIL pointing at the red cell.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL explaining the red cell, hand on hip; the group attentive. (2 ~45%) close on JU BON-JIL's face, a mix of caution and amusement.",
 "p16":"Two panels. (1 ~55%) the whiteboard now shows two hand-drawn arrows leaving the red cell, labeled ONLY '관망' and '알고 탄다'; JU BON-JIL beside. (2 ~45%) HAN TANG-SU leaning in with sparkling eyes at the second arrow.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM asking, brow furrowed; JU BON-JIL considering. (2 ~45%) JU BON-JIL drawing a small gorilla sketch and a small rocket sketch side by side on the board (no text).",
 "p18":"One panel (~100%). The whiteboard: a hand-drawn RIDE rule card with the letters 'RIDE' as a heading and three short Korean lines beneath, exactly: '정점 전에, 소액으로' / '전체의 5% 이하' / '출구를 먼저 정한다'; a small rocket icon; JU BON-JIL presenting; ONLY these labels.",
 "p19":"Two panels. (1 ~55%) JU BON-JIL pointing at the gorilla sketch then the rocket; NA BAE-UM nodding. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '고릴라는 카테고리를 산다' / 'RIDE는 기대를 산다'.",
 "p20":"Two panels. (1 ~55%) HAN TANG-SU raising his hand high, eager to try; JU BON-JIL with a dry look. (2 ~45%) JU BON-JIL holding up three fingers, stern.",
 "p21":"One panel (~100%). The whiteboard: a hand-drawn EXIT rule card with the letters 'EXIT' as a heading and three short Korean lines beneath, exactly: '매출이 예상을 크게 밑돈다' / '경쟁이나 규제 뉴스가 뜬다' / '거래량은 폭증, 가격은 하락'; a small exit-door icon; JU BON-JIL presenting; ONLY these labels.",
 "p22":"Two panels. (1 ~55%) HAN TANG-SU writing the three EXIT lines on his own phone note (screen shows ONLY three short blurred lines, no readable text), serious for once. (2 ~45%) JU BON-JIL watching him, a hint of approval.",
 "p23":"Two panels, the practice run. (1 ~55%) a montage strip: HAN TANG-SU tapping buy on his phone (screen shows ONLY a simple curve with a dot before its peak, no text), then a calendar flipping. (2 ~45%) HAN TANG-SU's phone showing ONLY the curve now past the peak with a red downward segment, his face tense.",
 "p24":"Two panels. (1 ~55%) HAN TANG-SU looking at JU BON-JIL, torn; JU BON-JIL silent, pointing at the EXIT card on the board (labels as p21). (2 ~45%) HAN TANG-SU pressing a button on his phone with a grimace, eyes shut.",
 "p25":"Two panels. (1 ~55%) HAN TANG-SU slumped, then looking up as JU BON-JIL speaks; NA BAE-UM beside, supportive. (2 ~45%) close on HAN TANG-SU's face, a small brave nod.",
 "p26":"Two panels. (1 ~55%) NA BAE-UM at the table summarizing to himself; JU BON-JIL in the background. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '초기시장이 진짜여도' / '가격이 초기시장을 넘어섰으면 하입' / '타려면 작게, 출구부터'.",
 "p27":"Two panels. (1 ~55%) HAN SIL-SOK asking a grounded question from the table; JU BON-JIL turning to him. (2 ~45%) JU BON-JIL answering, calm and clear.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL writing on the board ONLY one short line: '손절은 다음 라운드 출전권'; HAN TANG-SU staring at it. (2 ~45%) close on HAN TANG-SU's face, something settling in.",
 "p29":"Two panels, quiet beat. (1 ~60%) evening, HAN TANG-SU and NA BAE-UM walking out together, HAN TANG-SU quieter than usual, NA BAE-UM patting his shoulder. (2 ~40%) NA BAE-UM's thoughtful face under the streetlight.",
 "p30":"Two panels. (1 ~55%) at the door JU BON-JIL calls after them with a teasing look. (2 ~45%) JU BON-JIL holding up four fingers, then drawing a small cross-shaped grid in the air.",
 "p31":"One panel (~100%). A dark moody image: a large empty 2x2 board like a game board, and four small game pieces (a sphere, a car, a memory chip, a magnifying glass) scattered around it waiting to be placed; NO text; keep webtoon ink style.",
 "p32":"One panel (~100%). Closing chapter-end: the timeline silhouette and the 2x2 board in the distance; NA BAE-UM, JU BON-JIL and HAN TANG-SU small figures; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 13\n초기시장의 과열: 양자컴퓨터\n초기시장은 진짜다, 그런데 가격은 미래를 다 당겨 썼다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','한탕수: 형! 양자컴퓨터가 다음 AI래요!\n이번엔 진짜예요!'),
        (2,'C','speech','최신상: 저 벌써 클라우드로 큐비트 빌려서 돌려봤어요\n아직 오류가 많긴 한데요')],
 "p03":[(1,'C','speech','고비전: 암호도, 신약도, 판이 통째로 바뀝니다\n먼저 올라타야죠'),
        (2,'C','speech','한실속: 우리 회사엔 쓸 데가 없는데요\n뭘 계산하는지도 모르겠고')],
 "p04":[(1,'C','speech','주본질: 좋아, 시즌 1과 똑같은 다섯 반응이지?\n그럼 표부터 채워보자'),
        (2,'C','speech','주본질: 배움이, 앞으로')],
 "p05":[(1,'L','label','정부 프로그램'),(1,'C','label','연구소'),(1,'R','label','금융사 실험'),
        (1,'C','speech','주본질: 먼저 누가 사고 있나\n정부, 연구소, 그리고 실험해 보는 금융사들')],
 "p06":[(1,'C','label','양자'),
        (1,'C','speech','나배움: 누가 사나는 선구자만, 참조사례는 논문과 시연\n완전완비제품은 오류 정정이 안 돼서 없음\n시총 대비 매출은 매출 없이 시총만')],
 "p07":[(1,'C','speech','나배움: 근데 넷째 줄 매출이 애매해요\n분기마다 몇 배씩 늘고는 있거든요'),
        (2,'C','speech','주본질: 잘 봤어\n그게 이 사례가 재미있는 이유야')],
 "p08":[(1,'C','speech','주본질: 매출은 생기는 중이야\n초기시장이 진짜라는 뜻이지\n다만 시총이 그 매출의 수십 배야'),
        (2,'C','think','나배움: 초기시장은 진짜, 가격은 미래')],
 "p09":[(1,'C','speech','한탕수: 그래서 사라는 거예요, 말라는 거예요?'),
        (2,'C','speech','주본질: 먼저 이 가격이 어떻게 움직였는지 보자')],
 "p10":[(1,'L','label','2024 급등'),(1,'C','label','2025년 1월 한마디'),(1,'C','label','철회'),(1,'C','label','재급등'),(1,'R','label','2026 조정'),
        (1,'C','narr','2년 동안 이 가격은 두 번 치솟고 두 번 무너졌다')],
 "p11":[(1,'C','speech','주본질: 2025년 1월, 반도체 업계의 거물이 한마디 했어\n쓸 만해지려면 15년은 더 걸린다고\n업종 전체가 며칠 만에 반토막 났지'),
        (2,'C','narr','한 사람의 한마디에 절반이 사라졌다')],
 "p12":[(1,'C','speech','주본질: 두 달 뒤 그 사람이 말을 거뒀고\n여름엔 변곡점이라고까지 했어, 가격은 다시 치솟았지'),
        (2,'C','speech','주본질: 그리고 이듬해, 고점에서 다시 크게 미끄러졌어\n회사들은 그동안 매출을 몇 배로 키웠는데도')],
 "p13":[(1,'C','speech','나배움: 회사가 아니라 말 한마디가 가격을 움직였네요\n기대가 지탱하는 가격이라서'),
        (2,'C','narr','두 줄을 적었다')],
 "p14":[(1,'C','label','초기시장'),(1,'C','label','골짜기 건넘'),(1,'L','label','정점'),(1,'L','label','골'),
        (1,'C','speech','주본질: 채택은 초기시장, 기대는 정점\n이 칸에 이름을 붙이자\n초기시장의 과열')],
 "p15":[(1,'C','speech','주본질: 고수들이 가장 조심하는 칸이자\n가장 재미있어하는 칸이야'),
        (2,'C','think','주본질: 여기서 배움이가 뭘 고르는지 보자')],
 "p16":[(1,'C','label','관망'),(1,'C','label','알고 탄다'),
        (1,'C','speech','주본질: 이 칸에서 길은 둘이야\n실용주의자가 들어올 때까지 기다리거나\n기대를 알고 짧게 타거나'),
        (2,'C','think','한탕수: 두 번째요, 두 번째!')],
 "p17":[(1,'C','speech','나배움: 알고 타는 게 고릴라 사냥이랑 뭐가 달라요?'),
        (2,'C','speech','주본질: 완전히 다른 동물이야')],
 "p18":[(1,'C','label','정점 전에, 소액으로'),(1,'C','label','전체의 5% 이하'),(1,'C','label','출구를 먼저 정한다'),
        (1,'C','speech','주본질: 이걸 RIDE라고 부르자\n정점 전에 소액으로, 전체 돈의 5% 이하로\n그리고 내릴 곳을 타기 전에 정한다')],
 "p19":[(1,'C','speech','주본질: 고릴라는 카테고리를 사서 몇 년을 들고 가\nRIDE는 사람들의 기대를 사서 몇 주 안에 내려'),
        (2,'C','narr','노트에 두 줄')],
 "p20":[(1,'C','speech','한탕수: 저 할래요! 5%면 되죠?'),
        (2,'C','speech','주본질: 출구 세 개를 먼저 외워\n못 외우면 못 탄다')],
 "p21":[(1,'C','label','매출이 예상을 크게 밑돈다'),(1,'C','label','경쟁이나 규제 뉴스가 뜬다'),(1,'C','label','거래량은 폭증, 가격은 하락'),
        (1,'C','speech','주본질: 셋 중 하나라도 켜지면 그날 내린다\n더 오를 것 같아도, 특히 더 오를 것 같을 때')],
 "p22":[(1,'C','narr','탕수가 처음으로 규칙을 받아 적었다'),
        (2,'C','think','주본질: 받아 적는 것만도 어디냐')],
 "p23":[(1,'C','narr','탕수는 정말로 5%만 샀다\n그리고 삼 주가 지났다'),
        (2,'C','speech','한탕수: 형… 거래량은 터졌는데 가격이 내려요\n세 번째 신호예요')],
 "p24":[(1,'C','speech','한탕수: 조금만 더 보면 안 돼요?\n뉴스는 아직 좋은데'),
        (2,'C','narr','탕수는 눈을 감고 팔았다\n마이너스 30%였다')],
 "p25":[(1,'C','speech','주본질: 잘했어\n팔 수 있는 사람만 다음 판에 들어와'),
        (2,'C','think','한탕수: 처음으로 규칙대로 졌다')],
 "p26":[(1,'C','narr','정리는 세 줄이었다'),
        (2,'C','think','나배움: 초기시장의 과열, 이 칸을 알아보는 눈')],
 "p27":[(1,'C','speech','한실속: 그럼 저 같은 사람은요?\n애초에 이 칸엔 안 들어가는 게 맞죠?'),
        (2,'C','speech','주본질: 맞아, 실용주의자는 관망이 정답이야\n이 칸에서 돈을 잃는 건 늘 서두른 쪽이지')],
 "p28":[(1,'C','label','손절은 다음 라운드 출전권'),
        (2,'C','think','한탕수: 출전권…')],
 "p29":[(1,'C','narr','그날 탕수는 30%를 잃고\n규칙 하나를 얻었다'),
        (2,'C','think','나배움: 판별표가 매수도, 매도도 정해 주는구나')],
 "p30":[(1,'C','speech','주본질: 다음 시간엔 종목 넷을 한 판에 올린다\n채택과 기대, 두 축으로'),
        (2,'C','speech','주본질: 칸마다 사는 법이 달라\n그걸 다 외우면 시즌 2의 반은 끝이야')],
 "p31":[(1,'C','emph','같은 상승도 칸이 다르면 다른 게임이다')],
 "p32":[(1,'C','caption','Episode 13 끝 · 다음 화 · 두 곡선 겹쳐 읽기\n(2축 판별 훈련: 네 종목을 한 판에)')],
}

BANDS = {
 "p06":'양자컴퓨터 판별 · 4행 초기시장 쪽 + 매출은 "생기는 중" · 초기시장은 진짜, 시총은 매출의 수십 배',
 "p10":'양자컴퓨팅주 2024-2026 · 급등 → 한마디에 급락 → 철회·재급등 → 조정 · 기대가 지탱하는 가격의 전형',
 "p14":'초기시장의 과열 = 채택은 초기시장, 기대는 정점 · 고수들이 가장 조심하고 가장 재미있어하는 칸',
 "p18":'RIDE · 정점 전에 소액(전체의 5% 이하) · 출구를 먼저 정한다 · 고릴라 매수가 아니라 기대에 짧게 올라타는 보조 전략',
 "p21":'EXIT 3신호 · 매출 컨센서스 미스 · 경쟁·규제 뉴스 · 거래량 폭증+가격 하락 · 하나라도 켜지면 그날 내린다',
}

NOTES = {
 "p02":'해설: 양자컴퓨터는 0과 1을 동시에 갖는 큐비트로 특정 문제(암호 해독·분자 시뮬레이션·최적화)를 기존 컴퓨터보다 빠르게 풀 것으로 기대되는 기술이다. 오류 정정이 아직 미완이라 범용 실용화 시점은 논쟁 중이다',
 "p06":'사실 확인: 양자컴퓨팅 상장사 IonQ는 2026년 2분기 매출 8,010만 달러(전년 대비 +287%)를 발표하고 연간 가이던스를 2.8~2.9억 달러로 올렸다. 주요 고객은 정부·연구기관·클라우드 실험 고객이다(2026-09 기준, 작화 시 갱신)',
 "p10":'사실 확인: 양자컴퓨팅주(IonQ·리게티·D-Wave 등)는 2024년 급등(12개월 최대 수십 배) 후 2025년 1월 NVIDIA CEO의 "실용화까지 15~30년" 발언에 업종이 며칠 만에 절반 가까이 하락했고, 3월 발언 철회·6월 "변곡점" 언급 뒤 재급등했다가 2026년 중반 고점 대비 60~76% 하락했다(2026-07 기준)',
 "p14":'해설: "초기시장의 과열"이라는 사분면 명칭은 Moore 원전이 아니라 본 만화(고릴라 헌터스 클럽)의 해석이다. 기술수용주기(채택)와 하입사이클(기대)을 겹쳐 읽을 때만 보이는 칸이다',
 "p18":'해설: RIDE는 고릴라 게임의 본 전략이 아닌 보조 전략이다. 포트폴리오의 5% 이하, 정점 전 진입, 사전 출구 설정이 조건이며, 이 셋 중 하나라도 지킬 수 없으면 관망이 정답이다',
 "p21":'해설: EXIT 3신호는 서사가 깨지는 순간을 잡기 위한 규칙이다. 정점 뒤의 하락은 실용주의자가 받쳐주지 않아 빠르고 깊다. 손절은 패배가 아니라 다음 라운드의 출전권이다',
 "p26":'본 회차의 종목·가격 서술은 교육 목적이며 특정 종목의 매수·매도를 권하지 않습니다. 탕수의 매매는 가상의 예시입니다',
}

if __name__ == "__main__": run(globals())
