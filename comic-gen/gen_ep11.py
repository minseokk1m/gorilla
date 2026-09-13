#!/usr/bin/env python3
# 고릴라 헌터스 Ep11 "두 번째 곡선: 하입사이클" — 시즌 2 「두 번째 곡선과 정글의 서열」 (32p)
# 2026-09-13 작성. season2-plan.md Ep11 · 회장님 피드백 F3-8(TALC×하입 결합·구분) · F3-2(맥스 모티프: 목재 바퀴 유행)
# usage: python3 gen_ep11.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP11"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep11")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP11 NOTE: HAN TANG-SU's phone may show ONLY a simple green rising line chart when specified, no tickers, no numbers. "
               "Storybook insets about MAX are soft vintage tone with ONLY anonymous ancient-era people; MAX is a bearded inventor in a plain tunic.")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A dark backdrop; a plain bell-shaped curve drawn in thin white line low on the page, and over it a thin glowing RED curve that rockets up to a sharp peak above the bell's left half, plunges, then rises gently to the right; no labels on either curve. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) HAN TANG-SU (red cap, mustard hoodie) standing on his chair waving his phone which shows ONLY a simple steep green rising line (no numbers, no ticker); the members startled; NA BAE-UM half-amused. (2 ~45%) close on HAN TANG-SU's ecstatic face, sparkle eyes, comic style.",
 "p03":"Two panels. (1 ~55%) NA BAE-UM asking HAN TANG-SU a calm question, notebook in hand; HAN TANG-SU mid-shrug. (2 ~45%) HAN TANG-SU's grinning answer, thumbs up, a small comic sweat drop on NA BAE-UM in the corner.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL at the head of the long wooden table, marker in hand, a knowing dry smile, watching HAN TANG-SU; on the table ONLY notebooks and books, NO monitors, NO laptops, NO screens of any kind. (2 ~45%) JU BON-JIL turning to the whiteboard which is completely BLANK, uncapping the marker.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL drawing on the whiteboard: ONLY a plain bell-shaped curve with a red dashed vertical line between its 2nd and 3rd fifths; NO labels; NA BAE-UM watching. (2 ~45%) NA BAE-UM's face, recognizing the curve, a small nod.",
 "p06":"One panel (~100%). The whiteboard with the HYPE CYCLE drawn alone as a clean hand sketch: a thin RED line starting low, rocketing to a sharp peak, plunging into a deep trough, then rising gently to a long plateau; five small clean Korean labels along the line in order: '기대 급등', '과잉 기대 정점', '환멸의 골짜기', '계몽의 언덕', '생산성 안정기'; JU BON-JIL to the side; ONLY these five labels on the board.",
 "p07":"Two panels, stage 1 and 2 vignettes (no modern cast). (1 ~50%) a montage of newspaper front pages and phone screens with blurred illegible headlines and rocket emojis, a crowd of anonymous people pointing up excitedly; NO readable text. (2 ~50%) a glossy conference stage with confetti and a presenter unveiling a glowing generic gadget to a cheering crowd; NO readable text, NO logos.",
 "p08":"Two panels, stage 3 and 4 vignettes (no modern cast). (1 ~50%) the same conference hall now half-empty, chairs stacked, a janitor sweeping confetti, a single sad newspaper on the floor (illegible); dim light. (2 ~50%) a quiet ordinary office where a few workers use the gadget matter-of-factly at their desks, no fanfare, warm plain light.",
 "p09":"Two panels. (1 ~55%) stage 5 vignette: the gadget is now a boring everyday object on a kitchen counter next to a kettle, a family ignoring it; comic anticlimax. (2 ~45%) back to the study room: JU BON-JIL capping the marker, NA BAE-UM writing, HAN TANG-SU frowning at his phone (screen OFF).",
 "p10":"One panel (~100%). The whiteboard now shows BOTH curves overlaid exactly like this: a plain bell-shaped TALC curve drawn in five plain segments (NO segment labels, NO percentages) with a RED dashed vertical CHASM line between the 2nd and 3rd segments; over it the taller thin RED hype curve whose sharp peak sits directly above the 2nd segment, whose trough sits directly above the red dashed line, and whose gentle rise spans the 3rd and 4th segments; ONLY two small labels: '정점' at the red peak and '골' at the red trough; JU BON-JIL pointing at the peak; NA BAE-UM and HAN TANG-SU watching.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL tapping the red peak, explaining; behind him the same overlaid board (labels '정점', '골' only). (2 ~45%) close on GO BI-JEON (navy suit) at the table, eyes shining, tablet under arm, mid-speech, excited.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL's finger slides down the red curve to the trough right above the dashed line; HAN SIL-SOK (knit vest, glasses) at the table with arms crossed, unmoved. (2 ~45%) close on HAN SIL-SOK's calm careful face.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM standing up with a realization, pointing at the board; JU BON-JIL pleased. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '정점 = 선구자가 떠들 때' / '골 = 실용주의자가 관망할 때' / '두 곡선을 만드는 건 같은 사람들'.",
 "p14":"One panel (~100%). The whiteboard with four simple hand-drawn icons in a row, each with ONE small Korean label under it: a newspaper icon labeled '언론', a smartphone with chat bubbles labeled 'SNS', a document with an upward arrow labeled '증권사 목표가', a stage podium labeled '컨퍼런스'; a curved arrow from all four up to a small red peak sketch on the right; JU BON-JIL presenting; ONLY these labels.",
 "p15":"Two panels. (1 ~55%) HAN TANG-SU holding up his phone showing a blurred mosaic of video thumbnails (no readable text), proud; NA BAE-UM peering. (2 ~45%) JU BON-JIL with a wry look, one finger raised.",
 "p16":"Two panels. (1 ~55%) a split image: LEFT a crowd of anonymous people shouting into megaphones (expectation), RIGHT a single ordinary person quietly handing cash over a shop counter (adoption); a thin vertical divider; NO readable text. (2 ~45%) JU BON-JIL's calm face delivering the line.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these two hand-written lines, large and clean: '기대는 공짜' / '채택은 돈'. (2 ~45%) NA BAE-UM tapping his pen on the page, thoughtful; HAN TANG-SU peeking, uneasy; in this second panel the notebook is seen from a distance and its page shows NO readable writing at all (blank lines only), and no other text anywhere.",
 "p18":"Two panels, storybook inset (soft vintage tone, keep webtoon linework; ONLY anonymous ancient-era people, NO modern cast, NO readable text). (1 ~55%) MAX the bearded inventor in a plain tunic reads a papyrus magazine whose cover shows a big drawing of a WOODEN WHEEL; his young assistant beside him looks worried. (2 ~45%) MAX tossing the papyrus into a clay waste jar with a dismissive wave.",
 "p19":"Two panels, storybook inset continues (vintage tone, NO modern cast, NO readable text). (1 ~55%) a grand sledge-maker's workshop with its doors chained shut and a crowd of laborers leaving, while across the street a cart-maker's yard bustles with customers buying wooden-wheeled carts. (2 ~45%) MAX peeking around a corner at the busy cart yard, stunned, hand on his forehead.",
 "p20":"Two panels, back to the present. (1 ~55%) JU BON-JIL holding the plain orange book whose cover reads ONLY '마케팅 천재가 된 맥스' (the same book as Ep1), closing it with a smile; NA BAE-UM listening. (2 ~45%) HAN SIL-SOK at the table, one eyebrow raised, pointing at himself.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL pointing from the orange book toward HAN SIL-SOK, making the connection; NA BAE-UM nodding hard. (2 ~45%) NA BAE-UM's notebook close-up: ONLY one hand-written line: '유행인지 진짜인지는 실용주의자가 사느냐로 갈린다'.",
 "p22":"Two panels. (1 ~55%) JU BON-JIL picking up his own phone and showing the group a screen with ONLY a simple hand-drawn-style hype curve with ONE small dot near its peak (NO text, NO logos). (2 ~45%) CHOI SIN-SANG (headphones) leaning in excited, GO BI-JEON nodding, HAN SIL-SOK skeptical, SHIN JUNG-HAE (cardigan) uncertain, AN MID-EO (flip phone) scoffing; ensemble reaction shot.",
 "p23":"Two panels. (1 ~55%) HAN SIL-SOK speaking calmly, hands folded; the others listening. (2 ~45%) JU BON-JIL snapping his fingers, pleased, pointing at HAN SIL-SOK.",
 "p24":"One panel (~100%). A hand-drawn timeline on the whiteboard: three small bubbles in a row each with a burst mark, labeled cleanly '닷컴 2000', 'SPAC 2021', 'AI 에이전트 2026', and above all three ONE shared speech-cloud sketch containing ONLY the words '이번엔 다르다'; JU BON-JIL beside; ONLY these labels.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL serious, standing beside the timeline board from the previous page which shows ONLY the three labeled bubbles '닷컴 2000', 'SPAC 2021', 'AI 에이전트 2026' and the shared cloud '이번엔 다르다' (nothing else written on the board), tapping the third bubble; NA BAE-UM sober. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU staring at his phone which now shows ONLY a simple green line that has turned and dropped steeply (no numbers, no ticker), his face draining; the members glancing over. (2 ~45%) close on HAN TANG-SU's stricken face, comic soul-leaving-body style.",
 "p27":"Two panels. (1 ~55%) HAN TANG-SU pleading toward JU BON-JIL; JU BON-JIL calm, not unkind. (2 ~45%) JU BON-JIL pointing back at the overlaid board (labels '정점', '골' only), his finger on the falling part of the red curve.",
 "p28":"Two panels. (1 ~55%) NA BAE-UM writing three lines; JU BON-JIL in the soft background. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '기대는 채택보다 먼저, 높게' / '정점은 선구자 위, 골은 캐즘 위' / '기대가 먼저 꺾인다'.",
 "p29":"Two panels, quiet beat. (1 ~60%) evening study room, members packing up, HAN TANG-SU slumped, NA BAE-UM quietly closing his notebook, JU BON-JIL watching him kindly. (2 ~40%) NA BAE-UM's resolved eyes close-up.",
 "p30":"Two panels. (1 ~55%) NA BAE-UM asking JU BON-JIL a pointed question at the door; JU BON-JIL turning back with a smile. (2 ~45%) JU BON-JIL holding up five fingers, teasing the next lesson.",
 "p31":"One panel (~100%). A dark moody image: a large old-fashioned thermometer with a red column rising high (NO numbers on its scale), and beside it a small stock-chart silhouette (bare line, no text); anticipatory tone; keep webtoon ink style. The single emphasis caption is lettered WITHOUT any quotation marks or apostrophes around it.",
 "p32":"One panel (~100%). Closing chapter-end: the overlaid two-curve silhouette in the distance, NA BAE-UM and JU BON-JIL small figures looking at it, HAN TANG-SU trailing behind; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band; NO other caption anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 11\n두 번째 곡선: 하입사이클\n기대는 채택보다 먼저, 그리고 높게 움직인다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','한탕수: 형! 저 천재예요!\n한 달 만에 두 배가 넘었어요'),
        (2,'C','think','한탕수: 이제 나도 고릴라 헌터')],
 "p03":[(1,'C','speech','나배움: 축하해\n근데 그 회사가 뭘 파는데 오르는 거야?'),
        (2,'C','speech','한탕수: 그야 AI니까요!')],
 "p04":[(1,'C','speech','주본질: 좋아, 오늘 배울 곡선이\n방금 탕수 입에서 나왔다'),
        (2,'C','narr','시즌 2의 첫 시간이었다')],
 "p05":[(1,'C','speech','주본질: 시즌 1에서 배운 이 곡선은\n누가 언제 사느냐, 채택의 곡선이야'),
        (2,'C','think','나배움: 기술수용주기, 그리고 캐즘')],
 "p06":[(1,'C','speech','주본질: 그런데 사람 마음엔\n곡선이 하나 더 있어\n기대의 곡선, 하입사이클'),
        (1,'C','narr','가트너가 정리한 다섯 단계')],
 "p07":[(1,'C','narr','기대 급등\n뉴스가 쏟아지고 모두가 손가락으로 하늘을 가리킨다'),
        (2,'C','narr','과잉 기대 정점\n무대 위엔 색종이, 기대는 현실을 한참 앞선다')],
 "p08":[(1,'C','narr','환멸의 골짜기\n약속한 만큼 안 되자 사람들이 떠난다'),
        (2,'C','narr','계몽의 언덕\n조용히, 쓸 데가 있는 곳부터 다시 쓰인다')],
 "p09":[(1,'C','narr','생산성 안정기\n아무도 신기해하지 않는다, 그냥 쓴다'),
        (2,'C','speech','주본질: 기술은 대개 이 다섯 칸을 지나\n문제는 어느 칸에서 돈이 움직이느냐지')],
 "p10":[(1,'C','speech','주본질: 두 곡선을 겹쳐 보자\n기대의 정점은 선구자 구간 위에\n환멸의 골은 캐즘 위에 온다'),
        (1,'C','emph','기대의 곡선은 채택의 곡선보다\n항상 먼저, 항상 높게 움직인다')],
 "p11":[(1,'C','speech','주본질: 정점이 왜 하필 여기냐면\n선구자들이 가장 크게 떠드는 때거든'),
        (2,'C','speech','고비전: 맞아요, 그땐 저도\n판이 바뀐다고 온 동네에 말하고 다녔죠')],
 "p12":[(1,'C','speech','주본질: 그리고 골이 여기인 이유는\n실용주의자들이 팔짱을 끼고 관망하는 때라서야'),
        (2,'C','speech','한실속: 떠드는 건 자유인데\n제 돈은 아직이죠')],
 "p13":[(1,'C','speech','나배움: 그럼 두 곡선을 만드는 건\n결국 같은 사람들이네요!'),
        (2,'C','narr','노트에 세 줄을 적었다')],
 "p14":[(1,'C','speech','주본질: 기대는 누가 만드나\n언론, SNS, 증권사 목표가, 컨퍼런스\n넷이 합창하면 정점이 온다'),
        (1,'L','label','언론'),(1,'C','label','SNS'),(1,'C','label','증권사 목표가'),(1,'R','label','컨퍼런스')],
 "p15":[(1,'C','speech','한탕수: 저는 유튜브에서 봤어요\n다들 이 회사가 다음 대장이래요'),
        (2,'C','speech','주본질: 그 영상들이 곡선의 어느 칸을\n만들고 있는지는 생각해 봤나?')],
 "p16":[(1,'C','narr','왼쪽은 떠드는 사람들, 오른쪽은 사는 사람\n두 무리는 거의 겹치지 않는다'),
        (2,'C','speech','주본질: 기대는 공짜야\n채택은 돈이 들지')],
 "p17":[(1,'C','narr','두 줄이면 충분했다'),
        (2,'C','think','한탕수: 나는 어느 쪽에 있는 거지')],
 "p18":[(1,'C','narr','맥스도 한 번 틀렸다\n어느 날 잡지 표지에 목재 바퀴가 실렸다'),
        (2,'C','speech','맥스: 목재 바퀴? 오래 못 가\n일시적인 유행일 뿐이야')],
 "p19":[(1,'C','narr','하지만 골리앗 썰매 회사가 문을 닫고\n우마차 회사가 밤낮으로 바퀴를 팔았다'),
        (2,'C','speech','맥스: 유행이 아니었어\n사람들이 정말로 사고 있잖아')],
 "p20":[(1,'C','speech','주본질: 맥스가 틀린 건 기대를 읽어서가 아니야\n누가 사는지를 안 봤기 때문이지'),
        (2,'C','speech','한실속: 그러니까 저 같은 사람이\n지갑을 여는지 보라는 거죠?')],
 "p21":[(1,'C','speech','주본질: 바로 그거야\n유행인지 진짜인지는 기대가 아니라\n실용주의자가 사느냐로 갈려'),
        (2,'C','narr','한 줄을 크게 적었다')],
 "p22":[(1,'C','speech','주본질: 자, 요즘 정점에 있는 게 뭘까\nAI 에이전트, 다들 한마디씩 해보자'),
        (2,'C','narr','다섯 사람, 다섯 가지 반응\n시즌 1과 똑같은 순서로')],
 "p23":[(1,'C','speech','한실속: 우리 회사도 도입한다고 발표는 했어요\n근데 실제로 돌아가는 건 아직 하나뿐이에요'),
        (2,'C','speech','주본질: 그게 정점의 냄새야\n발표는 많고, 돌아가는 건 적다')],
 "p24":[(1,'C','speech','주본질: 정점마다 똑같은 말이 들려\n이번엔 다르다'),
        (1,'L','label','닷컴 2000'),(1,'C','label','SPAC 2021'),(1,'R','label','AI 에이전트 2026'),
        (1,'C','label','이번엔 다르다')],
 "p25":[(1,'C','speech','주본질: 기술은 정말 다를 수 있어\n하지만 사람의 기대가 움직이는 모양은\n한 번도 다른 적이 없었지'),
        (2,'C','think','나배움: 기술이 아니라 사람을 보는 거구나')],
 "p26":[(1,'C','narr','그리고 그날 저녁'),
        (2,'C','speech','한탕수: 형… 왜 떨어져요?\n아직 AI인데요?')],
 "p27":[(1,'C','speech','한탕수: 회사는 그대로잖아요\n뉴스도 좋은 것만 나오는데'),
        (2,'C','speech','주본질: 회사가 바뀐 게 아니야\n기대가 채택보다 먼저 꺾인 거지\n곡선이 그렇게 생겼어')],
 "p28":[(1,'C','speech','주본질: 오늘은 세 줄만 가져가'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','narr','탕수는 처음으로 조용했다'),
        (2,'C','think','나배움: 기대를 볼 줄 알면\n먼저 내릴 수도 있겠구나')],
 "p30":[(1,'C','speech','나배움: 근데 기대는 눈에 안 보이잖아요\n그걸 어떻게 재요?'),
        (2,'C','speech','주본질: 좋은 질문이야\n심리는 흔적을 남겨, 다섯 군데에')],
 "p31":[(1,'C','emph','기대에도 온도계가 있다')],
 "p32":[(1,'C','caption','Episode 11 끝 · 다음 화 · 하입은 어떻게 재는가\n(심리를 재는 다섯 가지 도구)')],
}

BANDS = {
 "p06":'하입사이클(Gartner) · 기대 급등 → 과잉 기대 정점 → 환멸의 골짜기 → 계몽의 언덕 → 생산성 안정기',
 "p10":'기대의 곡선(하입) vs 채택의 곡선(TALC) · 정점은 선각수용자 위, 골은 캐즘 위 · 두 곡선을 만드는 건 같은 사람들',
 "p16":'기대는 공짜, 채택은 돈 · 떠드는 무리와 사는 무리는 거의 겹치지 않는다',
 "p21":'유행인지 진짜인지는 기대가 아니라 실용주의자가 사느냐로 갈린다',
 "p27":'기대는 채택보다 먼저 오르고, 먼저 꺾인다 · 회사가 바뀌지 않아도 주가는 곡선을 따라 내려온다',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성, 선별 부여
NOTES = {
 "p01":'본 만화는 교육 목적이며 투자 권유·자문이 아닙니다. 열람은 NDA에 준하는 대외비 조건을 따릅니다. 이론·도식 © Geoffrey A. Moore, The Chasm Group · Hype Cycle은 Gartner의 상표입니다',
 "p06":'해설: 하입사이클(Hype Cycle)은 가트너(Gartner)가 1995년부터 매년 발표하는 기술 기대치 곡선이다. 다섯 단계 한글 표기는 본 만화의 정본 용어로, 9화의 도식과 동일하다',
 "p10":'해설: 두 곡선의 겹치기는 유승삼 대표(벤처테크)의 기술수용주기 강의 도식을 따른다. 기대의 정점이 선각수용자 구간 위에, 환멸의 골이 캐즘 위에 놓이는 이유는 두 곡선을 만드는 사람들이 같기 때문이다',
 "p18":'해설: 『마케팅 천재가 된 맥스』에서 맥스는 목재 바퀴를 "일시적 유행"이라며 무시했다가 시장을 빼앗긴다. 기대(유행)와 채택(실제 구매)을 혼동한 대가다',
 "p23":'사실 확인: 가트너 2025년 AI 하입사이클에서 AI 에이전트는 과잉 기대 정점에 위치했다. 조사 기업의 17%만 실제 배포했고 60% 이상이 2년 내 배포를 계획했으며, 2027년까지 에이전틱 AI 프로젝트의 40% 이상이 취소될 것으로 전망했다(2026-09 기준)',
 "p24":'해설: 2000년 닷컴 버블, 2021년 SPAC(기업인수목적회사) 열풍은 각각 "이번엔 다르다"는 합창과 함께 정점을 지났다. 기술은 달랐지만 기대의 모양은 같았다',
 "p27":'해설: 기대 곡선은 채택 곡선보다 먼저 오르고 먼저 꺾인다. 실적이 나쁘지 않아도 "기대가 실적을 앞질러 있었다"는 이유만으로 주가가 내려오는 구간이 환멸의 골짜기다',
}

if __name__ == "__main__": run(globals())
