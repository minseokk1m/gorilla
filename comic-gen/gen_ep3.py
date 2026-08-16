#!/usr/bin/env python3
# 고릴라 헌터스 Ep3 "죽음의 계곡, 캐즘" (전기차가 증거) — gpt-image-2 텍스트 채움 (~30장)
# usage: python3 gen_ep3.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g   # STYLE, CHARS base, MODEL, save_b64 (경로 무관)

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep3")
KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f):
            key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

CHARS = (g.CHARS +
    " EP3 RECURRING: HAN SIL-SOK (40s pragmatist 'Early Majority' everyman, neat shirt and knit "
    "vest, metal glasses, calm and careful, by a laptop); GO BI-JEON (30s visionary 'Early Adopter', "
    "sharp stylish, bold confident). "
    "EP3 CRITICAL CONSISTENCY: NA BAE-UM is EXACTLY 39 years old and must look late-30s on EVERY "
    "page. STUDY GROUP ROOM: one whiteboard, long table, bookshelves; NO trading desks, NO "
    "multi-monitor setups, NO wall posters.")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. "
    "SPEAKER RULE: each balloon's tail must point at the character named for that line; a thought "
    "balloon belongs ONLY to the character named. "
    "BACKGROUND TEXT RULE: NO readable text anywhere except the lines and diagram labels explicitly "
    "specified below. If the content of a whiteboard, notebook, phone screen, book, sign or any prop "
    "is NOT explicitly specified, it must be completely BLANK: no writing, no diagrams, no charts, no "
    "logos, no brand names. Never invent labels, tickers, flowcharts or lists that are not specified. "
    "SCREEN RULE: every background laptop/tablet/phone in any scene is switched OFF with a plain dark screen unless its content is explicitly specified; NEVER draw any stock chart, graph, arrow or text on any screen. NEVER print any text, sound-effect or logo on clothing. "
    "FLASHBACK RULE: period/flashback scenes contain ONLY period-appropriate anonymous people and props; never the modern cast, smartphones or modern clothing.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic dark chapter-title page. A faint cracked CHASM canyon glows in the dark; a pure electric car (BEV) silhouette has fallen into the canyon, while hybrid/EREV cars detour around the rim; a spotlight on the canyon. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover, ominous tone.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM puzzled, asking JU BON-JIL about the chasm; JU BON-JIL calm, knowing. (2 ~45% close-up) JU BON-JIL with a slight serious smile, ready to explain.",
 "p02b":"Two panels, why EVs at all (F3-1). (1 ~55%) JU BON-JIL at the whiteboard with a simple hand-drawn three-arrow sketch: three labeled arrows '친환경', '화석연료 고갈', '자율주행의 약속' converging into a small electric car icon; NA BAE-UM listening. (2 ~45%) a 1990s vintage-tone inset (keep webtoon linework): a sleek 1990s two-seat experimental electric coupe on a test road, hopeful dawn light.",
 "p02c":"Two panels, the too-early pioneer (vintage tone continues). (1 ~55%) the SAME sleek 1990s two-seat electric coupe from the previous page being loaded onto a tow truck at dusk; a small crowd of anonymous 1990s bystanders in period clothing watching wistfully (NO smartphones, NO red cap, NONE of the study-group members); melancholy. (2 ~45%) back to present: JU BON-JIL closing the story, NA BAE-UM curious; the whiteboard behind still shows the SAME three labeled arrows '친환경', '화석연료 고갈', '자율주행의 약속' converging into a small electric car icon.",
 "p03":"Two panels. (1 ~60%) NA BAE-UM alone at a cafe table looking at his laptop; on screen ONE chart with rising bars (sales still growing every year) and a growth-rate LINE above them that bends downward recently; the chart title reads exactly '글로벌 BEV 판매 증가율' and nothing else is written on screen. (2 ~40%) NA BAE-UM's puzzled, curious face lit by the screen.",
 "p04":"Two panels. (1 ~55%) SAME night-time home living room as the previous page (NO whiteboard, NO study room): close on the same laptop chart, the bars still rise but the growth-rate line clearly bends down; the ONLY text on the chart is the title '글로벌 BEV 판매 증가율'. (2 ~45%) NA BAE-UM leaning back on his sofa, thinking, scratching his head.",
 "p05":"Two panels, study room. (1 ~55%) NA BAE-UM turning to HAN SIL-SOK (40s, neat shirt and knit vest, metal glasses, by a laptop) to ask a question; calm atmosphere. (2 ~45%) HAN SIL-SOK's calm, careful everyman face.",
 "p06":"Two panels. (1 ~55%) the speaker in BOTH panels is HAN SIL-SOK: BLACK hair, 40s, knit VEST over a neat shirt, thin metal glasses — NOT grey hair, NOT a navy crewneck sweater; JU BON-JIL does NOT appear on this page. HAN SIL-SOK explaining his hesitation, measured, gesturing mildly; NA BAE-UM listening. (2 ~45%) HAN SIL-SOK slightly firm close-up (black hair, vest, glasses).",
 "p07":"One panel (~100%). HAN SIL-SOK on the left, and on the right a clean small horizontal bar-survey chart with three bars labeled cleanly: '너무 비쌈 63%', '충전 어려움 48%', '주행거리 걱정 47%'; JU BON-JIL's voice-over emphasis. Bright study room, clear infographic.",
 "p08":"Two panels. (1 ~60%) JU BON-JIL at the clean whiteboard drawing a cracked CHASM canyon, with one pure electric car (BEV) fallen inside it; NA BAE-UM watching. (2 ~40%) close on the whiteboard canyon drawing.",
 "p09":"One panel (~100%). The whiteboard CHASM canyon: along the rim a detour road is drawn, and hybrid/EREV cars drive around it crossing to the far side, bypassing the canyon; small clean labels on the detour cars: '현대 GV70 EREV', 'Li Auto', '스텔란티스 RAM'; JU BON-JIL pointing.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL pointing at the detouring EREV cars, explaining; a small label near them. (2 ~45%) NA BAE-UM's dawning realization.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL firm, gesturing at the whole canyon-and-detour drawing, making the key point; NA BAE-UM nodding seriously. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL side view at the whiteboard, behind him bold typographic space; serious teaching pose. (2 ~45%) NA BAE-UM absorbing it, brow furrowed.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL making a grave point, hand flat, steady; NA BAE-UM listening. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p14":"One split panel (~100%). LEFT: GO BI-JEON (visionary) pointing forward enthusiastically; RIGHT: HAN SIL-SOK (pragmatist) shaking his head, wary; a big RED X between the two halves; clean contrast.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL summarizing, calm and clear; NA BAE-UM writing in his notebook. (2 ~45%) NA BAE-UM's notebook close-up with a small chasm doodle.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM looking up, asking whether it is only EVs; JU BON-JIL smiling. (2 ~45%) JU BON-JIL about to give other examples.",
 "p17":"One panel (~100%, comparison infographic, three columns). LEFT: an electric car (BEV) with the slowing curve, label 'EREV로 우회 = 캐즘'. CENTER: a consumer satellite-communication device with a flashy launch then a flat adoption chart, label '선각수용자 폭발 후 침묵'. RIGHT: Google Glass, a 2014 cheering launch then a 2015 'discontinued' tag, label '캐즘에 빠짐'. A top banner ties them together.",
 "p18":"Two panels. (1 ~55%) JU BON-JIL pointing across the three examples, NA BAE-UM impressed at the common pattern. (2 ~45%) NA BAE-UM connecting it, eyes widening.",
 "p19":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky grin and a question; JU BON-JIL beside with a dry amused look. (2 ~45%) HAN TANG-SU deflating sheepishly as JU BON-JIL retorts.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM pulling out his phone with his own halved AI-stock chart, applying the lesson to himself, a rueful look. (2 ~45%) close on the red chart on his phone: NO axis numbers anywhere; the line falls to roughly HALF of its peak with a dashed halfway line — a 50% drop, not a 90% crash.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL explaining how to tell a chasm apart, calm and clear; NA BAE-UM taking notes. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p22":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean note line, JU BON-JIL nodding in the soft background. (2 ~40%) the notebook close-up, the line written, a small chasm-and-bridge doodle.",
 "p23":"Two panels. (1 ~55%) NA BAE-UM resolved, a small understanding settling; warm light. (2 ~45%) NA BAE-UM's thoughtful close-up.",
 "p24":"Two panels. (1 ~55%) NA BAE-UM leaning forward eagerly to ask a pointed question; JU BON-JIL raising a hand to gently defer. (2 ~45%) NA BAE-UM's curious, eager face.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL answering with a knowing smile, deferring the topic; NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p26":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, the chasm idea sinking in, lots of negative space. (2 ~40%) NA BAE-UM's resolved eyes extreme close-up.",
 "p27":"Two panels, tone warming with hope. (1 ~55%) JU BON-JIL turning encouraging, a hopeful look, as if to say not all is lost; NA BAE-UM looking up. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL gesturing as if pointing to a way across the canyon; NA BAE-UM hopeful. (2 ~45%) a small sketch of a bridge beginning to span the canyon.",
 "p29":"One panel (~100%). The dark study room; behind JU BON-JIL a faint sepia silhouette of the 1944 Normandy landing rises like a memory; JU BON-JIL smiles, delivering the cliffhanger. Cinematic.",
 "p30":"One panel (~100%). Closing chapter-end: the canyon with a faint bridge and the Normandy silhouette; NA BAE-UM and JU BON-JIL small silhouettes looking ahead; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption, lettered in white INSIDE this bottom black band; NO white caption box, NO text anywhere else on the page.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 03\n죽음의 계곡, 캐즘\n일시적이 아니라 구조적이다\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','캐즘이 대체 뭐예요?\n전기차가 거기 빠졌다고요?'),
        (2,'C','speech','직접 한번 들여다보자\n근데 먼저, 전기차가 왜 나왔는지부터')],
 "p02b":[(1,'C','speech','배기가스 문제, 언젠가 마를 기름\n그리고 자율주행이라는 약속\n이 셋이 모여 전기차를 불러냈지'),
        (2,'C','narr','가장 먼저 움직인 건 90년대의 GM이었다\n양산 전기차를 세상에 처음 내놨다')],
 "p02c":[(1,'C','narr','하지만 너무 일렀다\n충전도, 배터리도, 세상도 준비가 안 됐다\n그 차는 조용히 회수되어 사라졌다'),
        (2,'C','speech','20년 뒤에야 판이 다시 열렸어\n그럼 이번엔 잘 가고 있을까?')],
 "p03":[(1,'C','narr','집에 와서 전기차 판매 그래프를 켜봤다'),
        (2,'C','think','판매는 아직 늘고 있네?\n근데 왜 증가율이 꺾이지?')],
 "p04":[(1,'C','narr','추락이 아니다\n계속 팔리는데, 퍼지는 속도가 줄고 있다'),
        (2,'C','think','산 사람은 샀는데\n다음 사람들이 안 움직이는 건가?')],
 "p05":[(1,'C','caption','실용주의자 · 한실속 (Early Majority 34%)'),
        (1,'C','speech','실속 씨는 전기차 어때요?')],
 "p06":[(1,'C','speech','전기차요?\n충전이 불안하고, 불날까 걱정되고'),
        (2,'C','speech','주행거리도 애매해서 아직요\n세컨드카면 몰라도')],
 "p07":[(1,'L','label','너무 비쌈 63%'),
        (1,'C','label','충전 어려움 48%'),
        (1,'R','label','주행거리 걱정 47%'),
        (1,'C','emph','실용주의자가 안 산다 = 캐즘')],
 "p08":[(1,'C','speech','이게 바로 캐즘이야\n갈라진 골짜기에 전기차가 빠진 거지'),
        (2,'C','think','정말 골짜기에 빠진 것 같네…')],
 "p09":[(1,'C','speech','근데 봐, 시장이 하이브리드와\nEREV로 우회하기 시작했어'),
        (1,'R','caption','주행 중 충전, 1주유 장거리')],
 "p10":[(1,'C','speech','이 우회 자체가\nBEV가 캐즘에 빠졌다는 증거야'),
        (2,'C','think','우회로가 곧 증거구나')],
 "p11":[(1,'C','speech','충전이라는 완전완비제품이\n아직 안 갖춰졌으니까'),
        (2,'C','think','완전완비제품이 없으면 대중은 안 사는구나')],
 "p12":[(1,'C','emph','캐즘은 일시적이 아니라\n장기적·구조적 정체'),
        (2,'C','think','시간이 풀어주는 게 아니라고?')],
 "p13":[(1,'C','speech','이건 시간이 풀어주는 게 아니야\n인간 의사결정의 구조다'),
        (2,'C','think','구조라면, 저절로 안 풀리겠네')],
 "p14":[(1,'L','speech','이게 미래야!'),
        (1,'R','speech','동료가 안 써서요'),
        (1,'C','emph','선각수용자의 성공은\n실용주의자에게 참조사례가 안 된다')],
 "p15":[(1,'C','speech','대중은 비전이 아니라\n옆자리 동료가 쓰는 걸 봐'),
        (2,'C','think','참조사례가 끊기면 캐즘')],
 "p16":[(1,'C','speech','전기차만 그런 거예요?'),
        (2,'C','speech','아니, 패턴은 늘 똑같아\n몇 개만 더 보자')],
 "p17":[(1,'L','label','전기차 · EREV로 우회 = 캐즘'),
        (1,'C','label','위성통신 · 선각수용자 폭발 후 침묵'),
        (1,'R','label','구글 글래스 · 캐즘에 빠짐')],
 "p18":[(1,'C','speech','선각수용자 폭발 → 실용주의자 침묵 → 캐즘\n셋 다 똑같지?'),
        (2,'C','think','패턴이 진짜 똑같네')],
 "p19":[(1,'C','speech','그럼 핫한 건 다 캐즘이에요?'),
        (2,'C','speech','넌 일단 끝까지 들어\n핫한 거 말고')],
 "p20":[(1,'C','narr','내가 샀던 AI 종목도 다시 떠올렸다'),
        (2,'C','think','이것도 참조사례가 없었구나')],
 "p21":[(1,'C','speech','핵심은 완전완비제품이 갖춰졌는지\n그걸로 캐즘을 구별해'),
        (2,'C','think','완전완비제품 여부가 잣대구나')],
 "p22":[(1,'C','speech','그러니까 캐즘은…'),
        (2,'C','caption','캐즘 = 구조적 정체 · 완전완비제품 없으면 대중은 안 산다')],
 "p23":[(1,'C','think','멋있다고 다 팔리는 게 아니구나'),
        (2,'C','think','대중이 살 이유, 그게 먼저다')],
 "p24":[(1,'C','speech','그럼 테슬라도…?'),
        (2,'C','speech','그 얘긴 시즌2에서 제대로 다뤄')],
 "p25":[(1,'C','speech','테슬라는 전기차 + 자율주행인데\n둘 다 아직 캐즘이거든'),
        (2,'C','think','테슬라도 골짜기 위에 있구나')],
 "p26":[(1,'C','think','캐즘은 구조다\n시간이 아니라 사람의 선택'),
        (2,'C','think','그럼, 건너는 법은?')],
 "p27":[(1,'C','speech','캐즘에 빠진다고 다 끝은 아니야'),
        (2,'C','think','건널 수 있다고…?')],
 "p28":[(1,'C','speech','캐즘을 건너는 법이 있어'),
        (2,'C','narr','골짜기 위로, 다리 하나가 떠올랐다')],
 "p29":[(1,'C','speech','다음 시간,\n노르망디 상륙작전')],
 "p30":[(1,'C','caption','Episode 3 끝 · 다음 화 · 노르망디 상륙작전\n(교두보 + 완전완비제품)')],
}

BANDS = {
 "p07":'실용주의자(대중의 첫 관문)가 안 사기 시작하면 = 캐즘 · 선각수용자에서 대중으로 못 넘어가는 골짜기',
 "p11":'EREV·하이브리드로 시장이 우회 = BEV가 캐즘에 빠졌다는 증거 · 충전이라는 완전완비제품이 아직 없어서',
 "p13":'캐즘은 일시적이 아니라 장기적·구조적 정체 · 시간이 아니라 인간 의사결정의 구조',
 "p15":'선각수용자의 성공은 실용주의자에게 참조사례가 안 된다 · 대중은 비전이 아니라 동종업계 동료를 본다',
 "p18":'선각수용자 폭발 → 실용주의자 침묵 → 캐즘 · 위성통신·구글 글래스도 같은 패턴',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성(이미지 미포함), 필요한 컷에만 선별 부여
NOTES = {
 "p02b":'해설: 전기차 부활의 배경은 배출가스 규제(친환경), 화석연료 고갈 전망, 자율주행 기대의 결합이다. 양산 전기차의 첫 시도는 GM의 EV1(1996)이었다',
 "p02c":'사실 확인: GM EV1은 1996년 리스 방식으로 출시됐으나 2000년대 초 사업이 중단되고 차량 대부분이 회수·폐기됐다. 너무 이른 불연속 혁신의 대표 사례',
 "p04":'해설: 캐즘기의 특징은 판매 급락이 아니라 "확산 속도의 둔화"다. 선각수용자까지는 팔렸지만 전기다수 수용자가 관망하며 증가율이 꺾인다',
 "p07":'해설: 설문 수치는 미국 소비자 조사(CivicScience 등)의 전기차 구매 장애 요인 응답. 실용주의자가 움직이지 않는 이유가 곧 완전완비제품의 결핍 목록이다',
 "p12":'해설: Moore는 캐즘을 시간이 해결하는 일시 정체가 아니라, 수용자 집단 간 가치관 차이에서 오는 구조적 단절로 정의한다. © The Chasm Group',
 "p17":'사실 확인: 구글 글래스는 2013-14년 발표·판매 후 2015년 초 일반 소비자 판매를 중단했다. 선각수용자 열광 후 대중 침묵의 전형',
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
    print("generating EP3", pid, g.MODEL, "...")
    r=c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(FINAL, pid+".png"))

def main():
    args=sys.argv[1:] or ["all"]
    allids=sorted(PAGES.keys())
    if args==["all"]: ids=allids
    elif args==["rest"]: ids=[p for p in allids if not os.path.exists(os.path.join(FINAL,p+".png"))]
    else: ids=args
    c=client()
    for pid in ids:
        try: gen(c,pid); time.sleep(1)
        except Exception as e: print("ERROR",pid,e)

if __name__=="__main__": main()
