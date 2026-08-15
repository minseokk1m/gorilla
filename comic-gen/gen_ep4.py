#!/usr/bin/env python3
# 고릴라 헌터스 Ep4 "노르망디 상륙작전" — 첫 거점 + 완전제품 — gpt-image-2 (~30장)
# usage: python3 gen_ep4.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.expanduser("~/Desktop/고릴라헌터스_EP4")
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
    " EP4 RECURRING: HAN SIL-SOK (40s pragmatist 'Early Majority' everyman, neat shirt and knit "
    "vest, metal glasses, calm and careful).")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. Render English/diagram "
    "labels (Whole Product, beachhead, AI copilot, %, layer stack) cleanly when specified.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic chapter-title page. A 1944 Normandy coastline silhouette at dawn over a dark sea; bold arrows of firepower converging onto ONE single beachhead point under a spotlight. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover, epic tone.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM leaning in to ask GU BON-JIL how to cross the chasm; GU BON-JIL calm, knowing. (2 ~45% close-up) GU BON-JIL with a confident look, about to use a war analogy.",
 "p03":"Two panels, warm SEPIA 1944 war-memory tone. (1 ~60%) a wide Normandy beach; faint scattered arrows spread thin across the whole coast fading away. (2 ~40%) by contrast, all the firepower arrows converge into ONE concentrated point on a single beachhead, a small inset of GU BON-JIL at a whiteboard pointing.",
 "p04":"Two panels, sepia. (1 ~55%) the single beachhead being taken with concentrated force, dramatic. (2 ~45%) a faded image of forces spread thin and failing across the wide beach, contrast.",
 "p05":"Two panels. (1 ~55%) GU BON-JIL firm at the whiteboard pointing at the single converging point; NA BAE-UM noting. (2 ~45%) GU BON-JIL emphatic close-up, finger raised.",
 "p06":"Two panels. (1 ~55%) on the whiteboard a contrast sketch: scattered arrows labeled die vs one concentrated arrow labeled live; GU BON-JIL explaining. (2 ~45%) NA BAE-UM nodding, getting it.",
 "p07":"Two panels, modern IT. (1 ~55%) a developer at a desk using an AI copilot screen with code auto-completing; a clean label '개발자 = 첫 거점'; other office roles (marketing, accounting, design) faintly waiting in the background. (2 ~45%) close on the AI copilot code screen.",
 "p08":"Two panels. (1 ~55%) GU BON-JIL explaining the copilot-beachhead idea, gesturing; NA BAE-UM impressed. (2 ~45%) GU BON-JIL confident close-up.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM asking why only one beachhead; GU BON-JIL smiling. (2 ~45%) GU BON-JIL about to explain whole product.",
 "p10":"One panel (~100%). NA BAE-UM's open notebook close-up, hand-written two lines: '첫 거점 = 한 시장을 완전 점령' and '분산 = 죽음 / 집중 = 생존'; a small beachhead doodle.",
 "p11":"Two panels. (1 ~55%) GU BON-JIL at the whiteboard making the point that the core product alone is not enough; HAN SIL-SOK (pragmatist) in an inset shaking his head slightly. (2 ~45%) HAN SIL-SOK's careful face.",
 "p12":"One panel (~100%). The whiteboard showing TWO concentric circles: the INNER circle labeled '핵심 제품' (an AI copilot engine icon), the OUTER ring labeled '완전제품 Whole Product'; GU BON-JIL pointing, HAN SIL-SOK nodding at the outer ring. Clean infographic.",
 "p13":"One panel (~100%). The same two-circle diagram, with the OUTER ring's components labeled cleanly around it: '보안', '사내 데이터 연동', '교육', '지원', '주변 도구'; GU BON-JIL explaining.",
 "p14":"Two panels. (1 ~55%) HAN SIL-SOK (pragmatist) pointing at the outer ring, finally convinced, nodding. (2 ~45%) HAN SIL-SOK's satisfied careful face.",
 "p15":"One panel (~100%). A clean 4-layer technology STACK diagram drawn bottom-to-top with small icons: 반도체 → 하드웨어 → OS → 앱; arrows showing the layers interlocking within one scenario; GU BON-JIL beside it.",
 "p16":"Two panels. (1 ~55%) GU BON-JIL explaining that the whole product is complete only when these layers interlock in one scenario; NA BAE-UM following. (2 ~45%) NA BAE-UM's concentrated face.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM slapping his knee with a bright realization. (2 ~45%) NA BAE-UM's eyes lighting up.",
 "p18":"One panel (~100%). A reference-spread arrow diagram: a dark first beachhead market, with word-of-mouth arrows spreading outward to adjacent markets that get progressively lighter in color; GU BON-JIL gesturing.",
 "p19":"Two panels. (1 ~55%) GU BON-JIL explaining how a secured beachhead's reference becomes the next market's reference; NA BAE-UM noting. (2 ~45%) GU BON-JIL confident close-up.",
 "p20":"One split panel (~100%). LEFT (red tone): a company spreading thin everywhere at once, falling into the chasm, label 죽음. RIGHT (green tone): a company fully dominating one spot and spreading, label 건널 신호. A clear contrast.",
 "p21":"Two panels. (1 ~55%) GU BON-JIL making the key investor point, a big magnifying-glass diagnostic icon behind him; NA BAE-UM intent. (2 ~45%) GU BON-JIL emphatic, finger raised.",
 "p22":"Two panels. (1 ~55%) GU BON-JIL delivering the emphasized takeaway with a serious warm look; NA BAE-UM absorbing it. (2 ~45%) NA BAE-UM's understanding close-up.",
 "p23":"Two panels. (1 ~55%) NA BAE-UM pulling out his phone, applying the diagnostic to his own past stock, rueful. (2 ~45%) close on his red chart.",
 "p24":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky question; GU BON-JIL with a dry amused look. (2 ~45%) HAN TANG-SU deflating as GU BON-JIL retorts.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line in his notebook, GU BON-JIL nodding in the soft background. (2 ~40%) the notebook close-up, a small beachhead-to-markets doodle.",
 "p26":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, the beachhead idea settling, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p27":"Two panels. (1 ~55%) GU BON-JIL turning toward the next idea, a knowing smile; NA BAE-UM curious. (2 ~45%) a small sketch of one bowling pin starting to tip toward the next.",
 "p28":"One panel (~100%). A dramatic dark image: a single bowling pin falling and tipping into the next pin, a chain about to start; ominous-anticipatory lighting.",
 "p29":"Two panels. (1 ~55%) GU BON-JIL in warm light delivering the cliffhanger about bowling pins; NA BAE-UM listening. (2 ~45%) the bowling pins lined up, the first one tipping.",
 "p30":"One panel (~100%). Closing chapter-end: bowling pins with the first tipping into the rest; NA BAE-UM and GU BON-JIL small silhouettes; reserve a black caption band across the very bottom for the next-episode preview.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 04\n노르망디 상륙작전\n캐즘을 건너는 단 하나의 방법, 한 점 집중\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','그럼 캐즘은 대체 어떻게 건너요?'),
        (2,'C','speech','80년 전, 노르망디에 답이 있어')],
 "p03":[(1,'C','narr','1944년, 노르망디 해안'),
        (2,'C','narr','넓게 흩뿌리지 않고\n한 점에 모든 화력을 모았다')],
 "p04":[(1,'C','narr','한 거점을 확실히 뚫자\n전선이 열렸다'),
        (2,'C','narr','넓게 분산한 화력은\n아무것도 못 뚫는다')],
 "p05":[(1,'C','speech','캐즘을 건너는 유일한 방법은\n한 점에 모든 화력을 집중하는 거야'),
        (2,'C','think','전체 해안에 분산하면 죽는다…')],
 "p06":[(1,'C','speech','넓게 벌이면 죽고\n한 곳에 모으면 산다'),
        (2,'C','think','선택과 집중이구나')],
 "p07":[(1,'L','caption','개발자 = 첫 거점 (beachhead)'),
        (1,'C','speech','AI 코파일럿도 전체 사무직을\n한꺼번에 노린 게 아니야')],
 "p08":[(1,'C','speech','개발자라는 한 거점을\n먼저 완전 점령했지'),
        (2,'C','think','구글도 신규 코드 상당 부분이\nAI가 짠 거라던데')],
 "p09":[(1,'C','speech','근데 왜 하필 한 거점만요?'),
        (2,'C','speech','한 시장을 ‘완전’ 점령해야\n다음으로 번지거든')],
 "p10":[(1,'C','label','첫 거점 = 한 시장을 완전 점령'),
        (1,'C','label','분산 = 죽음 / 집중 = 생존')],
 "p11":[(1,'C','speech','핵심 제품만으론\n실용주의자가 안 사'),
        (2,'C','think','한실속 씨가 고개를 젓네')],
 "p12":[(1,'C','speech','필요한 건 완전제품이야\nWhole Product'),
        (2,'C','think','안쪽은 핵심, 바깥은 완전제품…')],
 "p13":[(1,'C','speech','보안, 사내 데이터 연동, 교육, 지원, 주변 도구\n한 시나리오의 모든 디테일이 채워져야 산다')],
 "p14":[(1,'C','speech','이 정도 다 갖춰지면\n그제야 우리도 쓰죠'),
        (2,'C','think','실용주의자가 끄덕인다')],
 "p15":[(1,'C','speech','완전제품은 이 층위가\n한 시나리오 안에서 다 맞물릴 때 완성돼'),
        (2,'C','think','반도체부터 앱까지…')],
 "p16":[(1,'C','speech','한 층이라도 비면\n시나리오가 안 돌아가'),
        (2,'C','think','전부 맞물려야 하는구나')],
 "p17":[(1,'C','speech','거점의 reference가\n다음 reference가 되는 거군요!'),
        (2,'C','think','이제 좀 보인다')],
 "p18":[(1,'C','speech','한 거점을 확실히 잡으면\n그 reference가 다음 시장의 reference가 돼'),
        (1,'C','narr','입소문이 옆 시장으로 번진다')],
 "p19":[(1,'C','speech','대중은 옆자리 동료의\n‘잘 쓰더라’ 한마디에 움직여'),
        (2,'C','think','reference가 다리가 되는구나')],
 "p20":[(1,'L','label','여기저기 동시에 → 캐즘에서 죽음'),
        (1,'R','label','한 곳 완전 장악 → 건널 신호')],
 "p21":[(1,'C','speech','그래서 투자자는\n‘이 회사가 한 거점을 확실히 점령했는가’로\n캐즘 통과 가능성을 가늠해'),
        (2,'C','think','이게 진단 기준이구나')],
 "p22":[(1,'C','emph','거점·완전제품은 ‘사는 신호’가 아니라\n‘살아남을지 읽는 진단 도구’'),
        (2,'C','think','사라는 게 아니라, 읽으라는 거였어')],
 "p23":[(1,'C','narr','내가 샀던 종목엔\n확실한 거점이 없었다'),
        (2,'C','think','넓게만 벌이다 캐즘에 빠진 거였네')],
 "p24":[(1,'C','speech','그럼 다 점령하면 되잖아요?'),
        (2,'C','speech','한 곳부터, 핫한 거 말고')],
 "p25":[(1,'C','speech','그러니까 정리하면…'),
        (2,'C','caption','한 거점 완전 점령 → reference 번짐 → 캐즘 통과')],
 "p26":[(1,'C','think','넓게가 아니라, 깊게 먼저'),
        (2,'C','think','한 점을 확실히')],
 "p27":[(1,'C','speech','한 거점이 잡히면\n그 다음은 생각보다 빨라'),
        (2,'C','think','연쇄로 번진다고…?')],
 "p28":[(1,'C','emph','첫 핀이 쓰러지면, 옆 핀이 쓰러진다')],
 "p29":[(1,'C','speech','다음 화,\n볼링 핀이 쓰러진다'),
        (2,'C','narr','첫 핀 하나가, 옆 핀을 건드렸다')],
 "p30":[(1,'C','caption','Episode 4 끝 · 다음 화 · 볼링 핀이 쓰러진다\n(인접 niche 연쇄 공략)')],
}

BANDS = {
 "p05":'캐즘을 건너는 유일한 방법 · 넓게 분산 말고 한 거점(beachhead)에 모든 화력 집중',
 "p08":'AI 코파일럿은 전체 사무직이 아니라 개발자라는 한 거점을 먼저 완전 점령했다',
 "p13":'완전제품(Whole Product) · 핵심 제품 + 보안·데이터연동·교육·지원·주변도구, 한 시나리오의 모든 디테일',
 "p16":'기술 층위(반도체→하드웨어→OS→앱)가 한 시나리오 안에서 맞물릴 때 완전제품이 완성된다',
 "p22":'거점·완전제품은 내가 사는 신호가 아니라, 이 회사가 캐즘을 건널지 읽는 진단 도구',
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
    print("generating EP4", pid, g.MODEL, "...")
    r=c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(FINAL, pid+".png"))

def main():
    args=sys.argv[1:] or ["all"]
    allids=[f"p{i:02d}" for i in range(1,31)]
    if args==["all"]: ids=allids
    elif args==["rest"]: ids=[p for p in allids if not os.path.exists(os.path.join(FINAL,p+".png"))]
    else: ids=args
    c=client()
    for pid in ids:
        try: gen(c,pid); time.sleep(1)
        except Exception as e: print("ERROR",pid,e)

if __name__=="__main__": main()
