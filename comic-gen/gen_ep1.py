#!/usr/bin/env python3
# 고릴라 헌터스 Ep1 v2 "내가 할 수 있는 단 하나의 투자법" — gpt-image-2 (~37장)
# 2026-08-15 전면 재작성: 회장님 피드백 배치1·2 반영 (feedback-chairman.md 참조)
#   서문 신설(B1·B2) · 개념 스토리텔링 보강(F1-4~6, 육상 교통수단의 변천) · 3×3 통합(F1-7)
#   투자클럽 도입(F1-9) · 삼파전 도식(F1-3·10) · 전환비용/킹덤(F1-14) · 레버리지 팩트(F1-15)
#   단타vs퀀트(C2) · 주본질 실전 이력(B4) · +28% 내레이션 보완 · 분기 점검(F1-13)
# usage: python3 gen_ep1.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final")
KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key)

CHARS = (g.CHARS +
    " EP1 CRITICAL CONSISTENCY: NA BAE-UM is EXACTLY 39 years old and must look late-30s on EVERY "
    "page (never a fresh-faced 20s youth, never a weathered 50s man), same slim average build. "
    "EP1 RECURRING: VALUE friend AN JEONG-MAN (late-30s, round glasses, navy cardigan, carries a "
    "thick finance book). GROWTH friend GO SEONG-JANG (late-30s, energetic, blue shirt, tablet with "
    "a rising revenue chart). STUDY GROUP ROOM: a modest shared study room with ONE whiteboard, "
    "bookshelves and a long table; NO trading desks, NO multi-monitor setups, NO wall posters.")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. "
    "SPEAKER RULE: each balloon's tail must point at the character named for that line; a thought "
    "balloon belongs ONLY to the character named. "
    "BACKGROUND TEXT RULE: NO readable text anywhere except the lines and diagram labels specified "
    "below; book spines, posters, frames, mugs, notebooks and whiteboards in the background carry NO "
    "readable writing (leave them blank or abstract). "
    "Render English/diagram labels (NVIDIA, CUDA, TPU, FSD, AMD, Helios, PER) cleanly when specified.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked webtoon linework even in this cinematic cover, NO photoreal or glossy render). A dim cozy cafe interior at sunset, warm spotlight falling on a single table with the book 'The Gorilla Game' and a coffee cup, no people. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"A calm magazine-style intro page, warm beige background, webtoon-friendly flat illustration, three stacked panels with white gutters. (1 ~40%) a tidy desk seen from above: a worn notebook, a phone showing a falling red stock chart, and the book 'The Gorilla Game'. (2 ~30%) silhouettes of ordinary commuters on a subway, one figure (NA BAE-UM) highlighted in warm color. (3 ~30%) a simple warm illustration of a study room door with light leaking out.",
 "p03":"Two panels, prologue hook. (1 ~60%) a bright cafe window seat in the morning; NA BAE-UM (39) smiles softly showing his phone screen with a green +28.02% yearly return chart; the book and a notebook on the table. (2 ~40%) close on the phone screen: +28.02%, five trade marks on a one-year chart.",
 "p04":"Three stacked panels introducing NA BAE-UM, muted everyday tones. (1 ~34%) crowded Seoul subway commute, NA BAE-UM (39) holding the rail, tired. (2 ~33%) a plain office, NA BAE-UM at his desk among rows of workers. (3 ~33%) evening convenience store front, NA BAE-UM checking a falling KOSPI chart on his phone.",
 "p05":"Two panels, night. (1 ~55%) NA BAE-UM's small apartment at night, lit by his phone; he stares at a stock app showing a fictional stock '(주)톤톤기업' bought at 123,500원. (2 ~45%) months later, same room: the same stock at 61,540원, -50.2%, red chart; NA BAE-UM's hollow face lit blue.",
 "p06":"Two panels. (1 ~55%) NA BAE-UM lying on his bed typing into a Kakao-style group chat; the chat window shows his one message clearly. (2 ~45%) exterior of a cafe named '브릿지 커피' in the evening; three friends' silhouettes arriving.",
 "p07":"Two panels, comedy beat. (1 ~55%) cafe table: VALUE friend AN JEONG-MAN (round glasses, navy cardigan, thick finance book) and GROWTH friend GO SEONG-JANG (blue shirt, tablet with rising revenue chart) leaning toward each other arguing, sparks between their eyes, NA BAE-UM between them shrinking. (2 ~45%) the two friends nose to nose, comically intense, NA BAE-UM's sweat drop.",
 "p08":"Two panels. (1 ~55%) HAN TANG-SU (red cap, mustard hoodie) bursts in holding his phone with a hot-stock ranking screen, grinning wide; the two friends turn. (2 ~45%) all three friends now point at NA BAE-UM from three directions, each holding their prop (book / tablet / phone); NA BAE-UM cornered, dizzy spiral eyes, comic style.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM alone at the table after the friends left, lightbulb moment, slapping his fist into his palm with a naive bright face. (2 ~45%) close-up of NA BAE-UM's confident naive grin; a dark ironic narration box sits at the panel bottom.",
 "p10":"Two panels. (1 ~55%) NA BAE-UM's phone: three rapid buy orders stacked (three fictional stock names 대한미래에너지, 세진바이오, 하늘반도체), three 'buy complete' toasts, his thumb tapping. (2 ~45%) days later: a dark red market board (KOSPI, KOSDAQ indexes falling), NA BAE-UM's face lit red from below, jaw dropped.",
 "p11":"Two panels, new scene: the day-trading spiral. (1 ~55%) NA BAE-UM at midnight hunched over his laptop with candle charts and moving-average lines, energy drink cans, dark circles under his eyes; wall clock at 2:40. (2 ~45%) his trading app log: a column of small buys and sells with mostly red results, total -8,400,000원; his trembling thumb over the sell button.",
 "p12":"Two panels, cool tone. (1 ~55%) a dark professional trading floor seen from behind: rows of fund managers, six-monitor desks, glowing charts and order books, one silhouette turning slightly. (2 ~45%) a server room with racks and blinking lights, an abstract flow of numbers, suggesting algorithmic quant trading; cold blue light. NO Korean text in the scene except the specified narration boxes.",
 "p13":"Two panels, transition back to warm tone. (1 ~55%) evening neighborhood bookstore, warm light; NA BAE-UM wandering into the economics shelves, deflated posture. (2 ~45%) his hand pulling one book from the shelf: cover reads 'The Gorilla Game' with a gorilla silhouette; his eyes slightly widening.",
 "p14":"Two panels. (1 ~55%) NA BAE-UM reading the book's back cover; an inset shows a small printed card tucked in the book: 'GORILLA HUNTERS investment study' with a simple map mark. (2 ~45%) NA BAE-UM on the street at night holding the card, hesitant but curious, streetlight halo.",
 "p15":"Two panels. (1 ~55%) a modest building hallway, NA BAE-UM knocking on a door with a small plate 'GORILLA HUNTERS'; warm light through the door gap. (2 ~45%) the door opens: a modest study room (one whiteboard, long table, bookshelves), five members turning to look at him warmly; no trading equipment anywhere.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL (mentor, late-40s, salt-and-pepper hair, thin metal glasses, navy knit) rises and offers a handshake, warm calm smile; NA BAE-UM bowing awkwardly. (2 ~45%) close on JU BON-JIL's face, steady warm eyes.",
 "p17":"Two panels, flashback in a clearly different warm vintage tone (soft grain, faded warm colors, keep webtoon linework). (1 ~55%) 1990s Silicon Valley: a younger JU BON-JIL (30s, same face structure, no glasses) at a chip-design workstation in a semiconductor office, exhausted, a falling chart printout in his hand. (2 ~45%) the same young JU BON-JIL in a small US cafe holding the book 'The Gorilla Game', a colleague sliding it across the table to him.",
 "p18":"Two panels, back to present. (1 ~55%) JU BON-JIL sitting across from NA BAE-UM at the study room table, listening to his story with hands folded; NA BAE-UM mid-gesture, embarrassed. (2 ~45%) JU BON-JIL leaning in slightly with a gentle but piercing question, one eyebrow raised.",
 "p19":"Two panels. (1 ~60%) the study room whiteboard, JU BON-JIL beside it; the whiteboard shows ONLY three big hand-written words in a row: 'PER', '매출', '차트', each crossed with a single red diagonal line. (2 ~40%) NA BAE-UM blinking, confused; small question marks around his head.",
 "p20":"One large panel (~100%), the key concept infographic drawn as a hand sketch on the whiteboard, JU BON-JIL drawing it side-view, NA BAE-UM and two members watching. The sketch: a staircase diagram titled '육상 교통 수단의 변천' — a rising sequence of short horizontal bars from bottom-left to top-right, labeled in order: 걷기·달리기 (one low green bar), then separate higher bars 말, 마차, 기차, 자동차, 전철, 자기부상열차; vertical axis label '불연속적 혁신', horizontal axis label '시대'. Hand-drawn marker feel, clean readable labels.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL pointing at the gap between the 걷기·달리기 bar and the 말 bar on the staircase sketch, making the key distinction; NA BAE-UM leaning in. (2 ~45%) a small clean inset diagram: a horse and a train with a broken arrow between them, labels '말 시대의 인프라' (a stable, a saddle) fading out and '기차 시대의 인프라' (rails, a station) appearing new.",
 "p22":"Two panels. (1 ~60%) the whiteboard now shows a simple two-column hand-written table: left column titled '결과' listing 'PER · 매출 · 주가' , right column titled '구조' listing '판이 바뀌나 · 표준을 잡나 · 안 무너지나'; JU BON-JIL tapping the right column. (2 ~40%) NA BAE-UM's face, the first real spark of understanding.",
 "p23":"One large panel (~100%). The whiteboard with a clean hand-drawn 3x3 grid; horizontal axis below: '주식 투자 지식: 낮음 → 중간 → 높음'; vertical axis left: '하이테크 산업 지식: 낮음 → 중간 → 높음'. Cell labels hand-written small: top row '하이테크 경영진', 'VC', '테크 펀드매니저'; middle row '비즈니스 언론', '★ 고릴라 게임 투자자', '그로스 펀드매니저'; bottom row '초보 투자자', '리테일 브로커', '일반 펀드매니저'. The CENTER cell has a big star and a mustard-yellow highlight box. JU BON-JIL pointing at the center, NA BAE-UM taking notes. Labels must be exactly as written, clean.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL's finger moves from the center cell toward NA BAE-UM (the finger crossing the panel edge toward him), warm decisive moment. (2 ~45%) NA BAE-UM pointing at himself, half doubtful half hopeful.",
 "p25":"Two panels, the study group as a team. (1 ~60%) the whole study group around the long table, each doing a different task: one member reading a thick report, one comparing charts on a laptop, HAN TANG-SU scrolling news on his phone, a member pinning a note card to a corkboard with a few blank cards; warm cooperative energy, NA BAE-UM watching moved. (2 ~40%) JU BON-JIL beside NA BAE-UM, hand on his shoulder, gesturing at the group.",
 "p26":"One large panel (~100%). The whiteboard with a hand-drawn 'AI 표준 전쟁' map: THREE big circles labeled 'NVIDIA · CUDA', '구글 · TPU', '테슬라 · FSD', arrows between them clashing at a center marked '표준?'; below the three circles, one smaller rising circle labeled 'AMD · Helios' with a small upward arrow toward the big three. JU BON-JIL presenting, members watching. Labels exactly as specified, clean English rendering.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL calm and firm, marker lowered, delivering the caution; behind him the AI-war sketch slightly out of focus. (2 ~45%) NA BAE-UM writing in his notebook, thoughtful; the notebook shows ONLY the two specified hand-written lines.",
 "p28":"Two panels. (1 ~60%) whiteboard close-up: a hand-drawn sketch of a deep moat around a castle labeled '전환비용'; small figures of customers standing inside the moat, arrows showing they cannot easily leave; JU BON-JIL explaining. (2 ~40%) JU BON-JIL with a knowing smile holding up one finger, teasing a future topic.",
 "p29":"Two panels. (1 ~55%) NA BAE-UM's brief daydream: a jungle throne scene drawn in the SAME webtoon ink style (no hyper-detailed painting), a calm gorilla seated on a stone throne, smaller monkeys and chimps below holding bananas; slightly comic, clearly a fantasy bubble. (2 ~45%) NA BAE-UM's open notebook close-up: ONLY these hand-written lines: '고릴라 = 판의 표준을 잡은 1등' / '결과가 아니라 구조를 본다' / '전환비용이 해자다'.",
 "p30":"Two panels. (1 ~55%) NA BAE-UM holding up his phone showing a blurred generic video app grid (thumbnails abstract, NO readable titles), asking his honest question. (2 ~45%) JU BON-JIL amused, not offended, leaning back with arms crossed.",
 "p31":"One split panel (~100%), a clear LEFT vs RIGHT contrast with a bold VS badge in the middle. LEFT half (cold blue tone): a trader at 3 AM, six monitors, energy drinks, alarm clock showing 03:00, exhausted face; the label box '매일 차트 보는 게임' sits INSIDE the left half at its bottom. RIGHT half (warm tone): NA BAE-UM at a family dinner table laughing, phone face-down on a shelf far away; the label box '분기에 한 번 점검하는 게임' sits INSIDE the right half at its bottom. Labels must stay each inside its own half.",
 "p32":"Two panels. (1 ~60%) whiteboard with three simple hand-drawn icons in a row: a calendar with one circled day and label '결정은 1년에 한두 번', a briefcase with label '본업과 양립', a chess piece with label '프로가 못 하는 게임'; JU BON-JIL presenting. (2 ~40%) NA BAE-UM nodding slowly, relieved warm face.",
 "p33":"Two panels. (1 ~55%) JU BON-JIL pointing warmly at NA BAE-UM, the group behind smiling; golden late-afternoon light in the study room. (2 ~45%) NA BAE-UM's face: for the first time, quiet determination instead of confusion.",
 "p34":"Two panels, comedy then ominous. (1 ~55%) HAN TANG-SU jumps up waving his phone showing a 2x leverage ETF screen, over-excited grin, members startled. (2 ~45%) JU BON-JIL's face hardening just a little, the room tone cooling.",
 "p35":"Two panels. (1 ~60%) whiteboard quick sketch: a jagged line going up and down around a flat dashed line, and below it a second line stepping lower each swing, labeled '2배 레버리지'; JU BON-JIL serious. (2 ~40%) HAN TANG-SU still grinning but with one drop of cold sweat; a dark narration box at the bottom.",
 "p36":"Two panels, quiet night ending. (1 ~55%) the study room after everyone left, warm lamp; NA BAE-UM alone, holding the book 'The Gorilla Game' against his chest, looking at the whiteboard sketches. (2 ~45%) close on his tired but clear eyes reflecting the whiteboard light.",
 "p37":"Two panels, closing. (1 ~55%) JU BON-JIL at the door turning back with a warm smile, pointing lightly at NA BAE-UM (and through him, at the reader). (2 ~45%) a faint dreamy background image: a golden Iowa cornfield at dusk with a faint bell-curve line over it; a black caption band across the very bottom.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 01\n내가 할 수 있는 단 하나의 투자법\n고릴라 게임이란 무엇인가'),
        (1,'C','caption','시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','narr','이 만화는 주식 전문가가 만들지 않았다'),
        (2,'C','narr','차트도 못 읽던 평범한 직장인이\n검증된 이론 하나를 만나 배워가는 기록이다'),
        (3,'C','narr','목표는 하나, 일하면서도 할 수 있는 투자를\n제대로 배우는 것\n가끔은 웃으면서')],
 "p03":[(1,'C','narr','2026년, 1년 만에 +28%\n거래는 단 5번, 매일 차트도 안 봤다'),
        (1,'C','speech','1년 전엔 반토막이었는데…'),
        (2,'C','narr','미리 말해두면, 운도 따른 해였다\n목표는 늘 은행 이자보다 나은 수익을\n복리로 쌓는 것, 그거면 충분하다')],
 "p04":[(1,'C','narr','나배움, 39세'),
        (2,'C','narr','평범한 회사원, 특별할 것 없는 하루'),
        (3,'C','narr','남들 다 한다는 주식,\n작년에 처음 시작했다')],
 "p05":[(1,'C','narr','첫 매수, (주)톤톤기업'),
        (2,'C','speech','반…토막?'),
        (2,'C','narr','반년 만에 -50%')],
 "p06":[(1,'C','speech','얘들아 나 주식 좀 물어보자\n주말에 커피 한잔 어때'),
        (2,'C','narr','주식 좀 안다는 친구 셋이 모였다')],
 "p07":[(1,'C','speech','안정만: PER 낮은 걸 사\n싸게 사서 기다리는 거야'),
        (1,'C','speech','고성장: 무슨 소리야\n매출 40%씩 크는 델 사야지'),
        (2,'C','narr','가치파와 성장파는\n만나기만 하면 싸운다')],
 "p08":[(1,'C','speech','형님들 다 틀렸어요\n지금 핫한 게 답이에요!'),
        (2,'C','think','셋이 다 다른 말을 하네…')],
 "p09":[(1,'C','speech','아, 그럼\n셋 다 사면 되잖아?'),
        (2,'C','narr','그게 첫 번째 실수였다')],
 "p10":[(1,'C','sfx','탭 탭 탭'),
        (1,'C','narr','가치주 하나, 성장주 하나, 핫한 주 하나'),
        (2,'C','speech','셋 다… 반토막?')],
 "p11":[(1,'C','narr','오기가 생겼다\n차트를 배워서 짧게 먹고 나오면 되잖아'),
        (2,'C','narr','한 달 뒤, 잔고는 더 줄어 있었다'),
        (2,'C','think','왜 내가 사면 떨어지고\n팔면 오르지…')],
 "p12":[(1,'C','narr','알게 된 건 나중이었다\n이 판에는 같은 데이터를 나보다 빨리 보는\n프로들이 있다'),
        (2,'C','narr','그리고 사람보다 빠른 기계, 퀀트가 있다\n개인이 단타로 이길 수 있는 판이 아니었다')],
 "p13":[(1,'C','narr','그날도 그냥, 집에 가기 싫었다'),
        (2,'C','think','고릴라… 게임?')],
 "p14":[(1,'C','narr','뒤표지에 작은 카드가 끼워져 있었다'),
        (1,'C','label','GORILLA HUNTERS · 투자 스터디'),
        (2,'C','think','이런 델… 내가?')],
 "p15":[(1,'C','sfx','똑 똑'),
        (2,'C','narr','문이 열리자, 평범한 사람들이 있었다\n모니터 여섯 개 같은 건 없었다')],
 "p16":[(1,'C','speech','잘 왔어요\n여기 좌장을 맡고 있는 주본질입니다'),
        (1,'C','caption','주본질 · 반도체 엔지니어 출신 투자자'),
        (2,'C','narr','왠지 이 사람은, 안 망해봤을 것 같았다')],
 "p17":[(1,'C','narr','착각이었다\n90년대 실리콘밸리, 그도 차트만 보다 잃었다'),
        (1,'C','speech','젊은 주본질: 이번에도 물렸네…'),
        (2,'C','speech','동료: 차트 말고 이걸 읽어봐\n판이 어떻게 굴러가는지가 나와'),
        (2,'C','narr','그 뒤로 그는 불연속 혁신에만 투자했다\n실리콘밸리에서 검증하고 돌아온 방법이었다')],
 "p18":[(1,'C','speech','반년 만에 반토막이 났고요\n단타로 만회하려다 더 잃었습니다'),
        (2,'C','speech','근데, 자네가 왜 졌는지는 아나?')],
 "p19":[(1,'C','speech','PER, 매출, 차트\n자네가 본 건 전부 결과야\n결과는 프로가 자네보다 빠르지'),
        (2,'C','think','결과가… 아니면 뭘 보지?')],
 "p20":[(1,'C','speech','이 그림 하나면 돼\n걷기가 아무리 늘어도 달리기지\n말은 아예 다른 물건이잖아'),
        (1,'C','speech','한탕수: 축지법은요?'),
        (1,'C','speech','축지법이야말로 완벽한 불연속이지\n실존했다면 말이야'),
        (1,'C','narr','걷기에서 달리기는 연속적 개선\n말, 기차, 자동차는 판을 새로 까는\n불연속적 혁신이다')],
 "p21":[(1,'C','speech','말에서 기차로 넘어갈 때\n마구간과 안장은 필요가 없어져\n대신 철로와 역이 새로 깔리지'),
        (2,'C','narr','판이 바뀌면 인프라가 통째로 새로 깔린다\n그 새 판 위에서, 표준을 잡는 자가 나온다')],
 "p22":[(1,'C','speech','우리는 결과 대신 구조를 봐\n지금 판이 바뀌고 있는가\n누가 그 판의 표준을 잡는가'),
        (2,'C','think','주식을 보는 게 아니라\n판을 보는 거구나')],
 "p23":[(1,'C','speech','무어가 그린 지도야\n산업도 주식도 중간쯤인 보통 사람\n그 정중앙이 고릴라 게임 투자자지'),
        (1,'C','narr','VC도 펀드매니저도 아니고\n완전 초보도 아닌 사람의 자리')],
 "p24":[(1,'C','speech','그게 바로 자네야'),
        (2,'C','speech','제가요? 조건이 있을 거 아녜요'),
        (2,'C','speech','둘이면 돼\n배울 자세, 그리고\n일관성 있는 투자원칙')],
 "p25":[(1,'C','speech','대신 이건 혼자서는 못 해\n정보를 모으고, 분석하고, 원칙을 지키는 걸\n혼자 다 하는 사람은 없거든'),
        (1,'C','narr','그래서 이 스터디가 있다\n각자 한 조각씩, 같이 판을 읽는다'),
        (2,'C','speech','우리는 이걸 투자클럽이라고 불러')],
 "p26":[(1,'C','speech','지금 AI 판에서는 표준 전쟁이 한창이야\nNVIDIA 진영, 구글 진영, 테슬라 진영\n그리고 AMD가 Helios로 도전장을 냈지'),
        (1,'C','narr','2026년, AMD의 Helios는\n마이크로소프트와 OpenAI가 도입을 시작했다')],
 "p27":[(1,'C','speech','명심해, 아직 아무도 왕관을 못 썼어\nAI 데이터센터가 커지면서\n판 자체가 또 바뀔 수 있거든'),
        (2,'C','narr','고릴라는 선언하는 게 아니라\n관찰해서 확인하는 것이다'),
        (2,'C','label','누가 표준이 되는지, 계속 지켜본다\n고릴라는 아직 후보다')],
 "p28":[(1,'C','speech','고릴라의 진짜 힘은 전환비용이야\n한번 이 성에 들어오면\n이사 비용이 너무 커서 못 나가'),
        (2,'C','speech','그런데 전환비용이 낮은 정글도 있어\n그 얘긴 나중에, 킹덤 게임이라고 하지'),
        (2,'C','caption','전환비용 큰 판 = 고릴라 게임 · 작은 판 = 킹덤 게임')],
 "p29":[(1,'C','think','핫한 동물들을 산 게 아니라\n왕을 찾았어야 했구나'),
        (2,'C','narr','노트에 오늘의 세 줄을 적었다')],
 "p30":[(1,'C','speech','근데 유튜브 보면 다들\n매일 실적에 차트 분석하던데\n그게 더 정석 아니에요?'),
        (2,'C','speech','좋은 질문이야\n그 게임과 우리 게임은 종목이 달라')],
 "p31":[(1,'C','narr','같은 주식시장, 전혀 다른 두 게임')],
 "p32":[(1,'C','speech','우리 게임은 결정이 1년에 한두 번\n나머지는 분기에 한 번 점검이면 충분해'),
        (2,'C','think','이건… 회사 다니면서도 되겠는데')],
 "p33":[(1,'C','speech','프로는 분기마다 성적표가 나와서\n이 게임을 못 해\n기다림은 개인만 가진 무기야'),
        (2,'C','narr','처음으로, 내가 이길 수 있는 판이 보였다')],
 "p34":[(1,'C','speech','에이 그래도 핫한 게 최고죠\n2배 레버리지 들어갑니다!'),
        (2,'C','speech','한탕수, 그 상품이 어떻게 생겼는지는 알고?')],
 "p35":[(1,'C','speech','2배 레버리지는 내리면 두 배로 잃고\n오르내리기만 반복해도 원금이 조금씩 녹아\n지수가 제자리로 와도 내 돈은 제자리가 아니야'),
        (2,'C','narr','그 말을, 한탕수는 곧 몸으로 배우게 된다')],
 "p36":[(1,'C','narr','내가 산 건, 고릴라가 아니었다'),
        (2,'C','think','이제, 진짜를 찾고 싶다')],
 "p37":[(1,'C','speech','다음엔 기술이 어떻게 퍼지는지 보자\n이 법칙, 사실 80년 전\n아이오와 옥수수밭에서 시작됐거든'),
        (2,'C','caption','Episode 1 끝 · 다음 화 · 기술은 어떻게 퍼지는가\n(옥수수밭에서 태어난 기술수용주기)')],
}

BANDS = {
 "p12":'같은 데이터, 더 빠른 프로와 퀀트 · 개인이 결과의 게임으로는 이길 수 없는 판',
 "p22":'결과(PER·매출·차트)가 아니라 구조(판의 교체·표준·전환비용)를 본다',
 "p27":'고릴라는 선언이 아니라 관찰로 확인한다 · 아직은 모두 후보',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트로 합성(이미지 생성에 미포함), 필요한 컷에만 선별 부여
NOTES = {
 "p02":'본 만화는 교육 목적이며 투자 권유·자문이 아닙니다. 열람은 NDA에 준하는 대외비 조건을 따릅니다. 이론·도식 © Geoffrey A. Moore, The Chasm Group',
 "p12":'해설: 퀀트(quant)는 수학 모델과 알고리즘으로 초단위 매매하는 기관 투자 방식. 속도와 데이터로 겨루는 단기 매매에서 개인은 구조적으로 불리하다',
 "p20":'해설: 불연속적 혁신(Discontinuous Innovation)은 기존 행동양식·인프라와 호환되지 않는 도약. 「육상 교통 수단의 변천」 도식은 유승삼 대표의 기술수용주기 강연(VentureTek)에서 인용',
 "p23":'해설: 3×3 지식 매트릭스는 Moore, 『The Gorilla Game』의 프레임. 산업 지식과 투자 지식이 모두 "중간"인 보통 사람이 고릴라 게임의 최적 플레이어다',
 "p26":'사실 확인: AMD는 2026년 7월 랙스케일 AI 시스템 Helios를 출시했고, Microsoft(Azure)·OpenAI·Meta·Anthropic이 도입을 발표·준비 중이다(2026-08 기준)',
 "p28":'해설: 전환비용(switching cost)이 높을수록 고객·생태계가 잠기는 고릴라형 시장, 낮으면 1등이 자주 바뀌는 킹덤형 시장(예: 표준 메모리). 상세는 시즌 2',
 "p35":'해설: 레버리지 ETF의 변동성 잠식(volatility decay) — 일간 수익률의 2배를 추적하므로 등락 반복 시 복리 효과로 원금이 침식된다. 장기 보유에 부적합',
}

def instruction(pid):
    parts=[]
    for panel,hint,role,text in DLG[pid]:
        parts.append(f"(panel {panel}) in {DESC.get(role,'a balloon')}: ‘{text.replace(chr(10),' ')}’")
    if pid in BANDS:
        parts.append("at the very bottom, a parchment caption band reading: ‘"+BANDS[pid].replace(chr(10),' ')+"’")
    return "KOREAN LINES TO LETTER (render each cleanly inside its balloon/box):\n"+"\n".join(parts)

def gen(c,pid):
    spec=clean_spec(PAGES[pid])
    prompt=f"{RULES_TEXT}\n\nPAGE CONTENT: {spec}\n\n{instruction(pid)}\n\n{CHARS}\n\nSTYLE: {g.STYLE}"
    print("generating EP1v2", pid, g.MODEL, "...")
    r=c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(FINAL, pid+".png"))

def main():
    args=sys.argv[1:] or ["all"]
    allids=[f"p{i:02d}" for i in range(1,38)]
    if args==["all"]: ids=allids
    elif args==["rest"]: ids=[p for p in allids if not os.path.exists(os.path.join(FINAL,p+".png"))]
    else: ids=args
    c=client()
    for pid in ids:
        try: gen(c,pid); time.sleep(1)
        except Exception as e: print("ERROR",pid,e)

if __name__=="__main__": main()
