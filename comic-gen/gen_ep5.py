#!/usr/bin/env python3
# 고릴라 헌터스 Ep5 "볼링 핀이 쓰러진다" — 볼링앨리·인접 niche 연쇄 — gpt-image-2 (~30장)
# usage: python3 gen_ep5.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.expanduser("~/Desktop/고릴라헌터스_EP5")
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
    " EP5 RECURRING: HAN SIL-SOK (40s pragmatist 'Early Majority' everyman, neat shirt and knit "
    "vest, metal glasses, calm, often by a laptop).")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. Render English labels "
    "(CrowdStrike, Falcon, endpoint) and diagram text cleanly and correctly when specified.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic chapter-title page. A bowling lane with pins lined up; the FIRST pin (the beachhead) is lit by a bright spotlight, the rear pins waiting faintly in shadow. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking GU BON-JIL what comes after taking the first beachhead; GU BON-JIL calm and knowing. (2 ~45% close-up) GU BON-JIL with a slight smile, ready to give a real example.",
 "p03":"Two panels, study room. (1 ~55%) HAN SIL-SOK (40s pragmatist, knit vest, metal glasses) turning his laptop to show the members; on the screen a CrowdStrike Falcon-style cybersecurity dashboard with a clean label 'endpoint security = 첫 핀'. (2 ~45%) close on the dashboard screen, clean.",
 "p04":"Two panels. (1 ~55%) HAN SIL-SOK explaining the CrowdStrike example, gesturing at the laptop; members listening. (2 ~45%) HAN SIL-SOK's confident calm face.",
 "p05":"One panel (~100%). A clean bowling-lane illustration: the front pin (the beachhead) falls darkly/strongly, and icons of other same-industry security teams receive its reference and join via arrows toward the next pins; clear diagram.",
 "p06":"Two panels. (1 ~55%) GU BON-JIL adding the voice-over point about same-industry teams joining; NA BAE-UM noting. (2 ~45%) GU BON-JIL confident close-up.",
 "p07":"One panel (~100%). NA BAE-UM's open notebook close-up, two hand-written lines: '첫 핀 = 엔드포인트 탐지를 완전 점령' and '→ 동종업계 reference 자동 생성'; a small bowling-pin doodle.",
 "p08":"Two panels. (1 ~55%) NA BAE-UM looking up, asking in which direction it spreads; GU BON-JIL smiling, about to draw. (2 ~45%) GU BON-JIL picking up the marker.",
 "p09":"One panel (~100%). GU BON-JIL side view drawing on the clean whiteboard the BOWLING ALLEY two-axis grid: a horizontal axis to the right and a vertical axis upward, with a big dark-green pin labeled '거점' at the bottom-left corner, and lighter pins fanning right and up with two red arrows. Hand-drawn diagram feel, bright whiteboard.",
 "p10":"Two panels. (1 ~55%) GU BON-JIL pointing at the horizontal axis of the grid, explaining; NA BAE-UM following. (2 ~45%) close on the horizontal arrow toward adjacent industries.",
 "p11":"Two panels. (1 ~55%) GU BON-JIL pointing at the vertical axis upward, explaining; NA BAE-UM nodding. (2 ~45%) close on the vertical arrow upward.",
 "p12":"Two panels. (1 ~55%) GU BON-JIL gesturing both directions on the grid, energetic; NA BAE-UM impressed. (2 ~45%) GU BON-JIL emphatic.",
 "p13":"Two panels. (1 ~55%) GU BON-JIL simplifying the jargon with an easy gesture (sideways and up); NA BAE-UM relieved and getting it. (2 ~45%) NA BAE-UM's understanding face.",
 "p14":"One panel (~100%). A chain diagram on the whiteboard: 엔드포인트 → 클라우드 보안 → 신원·로그 분석 → … with each pin generating an arrow to the next pin's reference; GU BON-JIL beside it. Clean, legible labels.",
 "p15":"Two panels. (1 ~55%) GU BON-JIL explaining the auto-generated reference chain; NA BAE-UM tracing it with his eyes. (2 ~45%) close on two pins, one tipping into the next.",
 "p16":"Two panels. (1 ~55%) GU BON-JIL making the key chain point, the pins toppling in sequence behind him; NA BAE-UM impressed. (2 ~45%) NA BAE-UM's eyes following the chain.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM nodding, the model clicking into place. (2 ~45%) NA BAE-UM's satisfied realization.",
 "p18":"Two panels. (1 ~55%) NA BAE-UM summarizing while pointing at the whiteboard pins; GU BON-JIL nodding in an inset. (2 ~45%) GU BON-JIL's approving nod close-up.",
 "p19":"Two panels. (1 ~55%) GU BON-JIL adding the investor angle, calm and clear; NA BAE-UM taking notes. (2 ~45%) GU BON-JIL confident close-up.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM applying it, checking whether a company's pins are toppling in a chain; thoughtful. (2 ~45%) NA BAE-UM's analytical face.",
 "p21":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky question; GU BON-JIL with a dry amused look. (2 ~45%) HAN TANG-SU deflating as GU BON-JIL retorts.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM checking his own past stock against the chain idea, rueful. (2 ~45%) close on his red chart, no chain.",
 "p23":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line, GU BON-JIL nodding softly in the background. (2 ~40%) the notebook close-up, a bowling-chain doodle.",
 "p24":"Two panels. (1 ~55%) NA BAE-UM resolved, a small understanding settling in. (2 ~45%) his thoughtful close-up.",
 "p25":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, the bowling-alley idea sinking in, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p26":"One panel (~100%). A bowling-lane illustration where only HALF the pins have fallen and the rest still stand; a clear sense that it is not finished yet; clean.",
 "p27":"Two panels. (1 ~55%) GU BON-JIL turning serious-hopeful, gesturing at the standing pins; NA BAE-UM attentive. (2 ~45%) GU BON-JIL's steady look.",
 "p28":"One panel (~100%). In the distance behind the bowling lane, a faint TORNADO storm silhouette approaches on the horizon; ominous-anticipatory mood; GU BON-JIL's small silhouette looking toward it.",
 "p29":"Two panels. (1 ~55%) GU BON-JIL in warm light delivering the cliffhanger about the coming storm; NA BAE-UM listening. (2 ~45%) the tornado silhouette looming closer.",
 "p30":"One panel (~100%). Closing chapter-end: the bowling lane with half-fallen pins and a distant tornado; NA BAE-UM and GU BON-JIL small silhouettes; reserve a black caption band across the very bottom for the next-episode preview.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 05\n볼링 핀이 쓰러진다\n첫 핀이 쓰러지면 인접 핀이 연쇄로\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','거점을 잡은 다음은\n어떻게 되는 거예요?'),
        (2,'C','speech','실제 사례 하나 보자\n보안 회사 CrowdStrike')],
 "p03":[(1,'C','speech','CrowdStrike 봐\nFalcon으로 엔드포인트 보안 첫 핀을 잡았어'),
        (2,'C','speech','거기서 인접 영역으로 계속 번졌지\n이게 볼링앨리의 교과서야')],
 "p04":[(1,'C','speech','한 곳을 확실히 잡으니\n같은 업계가 따라오더라고'),
        (2,'C','think','첫 핀 하나가 시작이구나')],
 "p05":[(1,'C','speech','한 거점을 완전 점령하면\n같은 업계 보안팀들이\nreference를 받고 합류해'),
        (1,'C','narr','첫 핀이 쓰러지자, 옆 핀들이 따라왔다')],
 "p06":[(1,'C','speech','거점의 신뢰가\n다음 고객의 판단 근거가 되는 거지'),
        (2,'C','think','reference가 핀을 넘어뜨린다')],
 "p07":[(1,'C','label','첫 핀 = 엔드포인트 탐지를 완전 점령'),
        (1,'C','label','→ 동종업계 reference 자동 생성')],
 "p08":[(1,'C','speech','근데 어느 방향으로 번지는 거예요?'),
        (2,'C','speech','핀은 두 방향으로 쓰러져\n그려줄게')],
 "p09":[(1,'C','speech','왼쪽 아래가 거점\n여기서 옆으로, 위로 번진다'),
        (2,'C','think','두 축이 있구나')],
 "p10":[(1,'C','speech','① 옆 업종으로,\n같은 기능을 다른 고객군에 그대로 팔고'),
        (2,'C','think','세그먼트 확장이네')],
 "p11":[(1,'C','speech','② 같은 업종의 다른 용도로,\n한 고객이 만족하면 새 기능으로 번져'),
        (2,'C','think','앱 확장이구나')],
 "p12":[(1,'C','speech','옆으로 한 칸, 위로 한 칸\n핀이 두 방향으로 쓰러지는 거야'),
        (2,'C','think','격자처럼 퍼지네')],
 "p13":[(1,'C','speech','어렵게는 완전제품·입소문 레버리지\n쉽게는 그냥 옆으로, 위로 번진다는 뜻이야'),
        (2,'C','think','아, 별거 아니네')],
 "p14":[(1,'C','speech','엔드포인트 → 클라우드 보안 → 신원·로그 분석\n이렇게 핀이 줄줄이 이어져'),
        (1,'C','narr','핀마다 다음 핀의 reference가 자동으로')],
 "p15":[(1,'C','speech','거점 핀 하나가 쓰러지면\n인접 핀이 연쇄로 쓰러진다'),
        (2,'C','think','한 번 터지면 줄줄이…')],
 "p16":[(1,'C','speech','핀마다 다음 핀의\nreference가 저절로 생기거든'),
        (2,'C','think','연쇄가 핵심이구나')],
 "p17":[(1,'C','think','거점 하나가 도미노의 시작이네'),
        (2,'C','think','이제 그림이 그려진다')],
 "p18":[(1,'C','speech','핵심은 첫 거점 위치 선정과\n핀 사이 reference 흐름이네요'),
        (2,'C','think','정확해, 라는 눈빛')],
 "p19":[(1,'C','speech','그래서 투자자는\n이 회사가 옆·위로 번지고 있는지를 봐'),
        (2,'C','think','연쇄가 돌고 있는가')],
 "p20":[(1,'C','think','이 회사 핀은\n지금 어디까지 쓰러졌지?'),
        (2,'C','think','다음 핀 reference가 보이나')],
 "p21":[(1,'C','speech','그럼 핀 많은 데 사면 되잖아요?'),
        (2,'C','speech','첫 핀부터, 핫한 거 말고')],
 "p22":[(1,'C','narr','내 종목엔 다음 핀이 없었다'),
        (2,'C','think','거점도, 연쇄도 없었구나')],
 "p23":[(1,'C','speech','그러니까 볼링앨리는…'),
        (2,'C','caption','첫 거점 완전 점령 → 옆·위로 reference 연쇄 → 시장 확장')],
 "p24":[(1,'C','think','한 핀을 깊게, 그 다음은 연쇄'),
        (2,'C','think','순서가 다 있었네')],
 "p25":[(1,'C','think','넓게가 아니라, 줄을 세우는 거구나'),
        (2,'C','think','첫 핀의 위치가 전부다')],
 "p26":[(1,'C','narr','아직 절반의 핀은\n그대로 서 있었다'),
        (2,'C','think','아직 끝이 아니구나')],
 "p27":[(1,'C','speech','모든 핀이 쓰러질 때까진\n아직 토네이도가 아니야'),
        (2,'C','think','토네이도…?')],
 "p28":[(1,'C','emph','모든 핀이 쓰러지는 순간, 폭풍이 온다')],
 "p29":[(1,'C','speech','다음 화,\n그 폭풍이 진짜 오는 순간'),
        (2,'C','narr','멀리서, 토네이도가 다가오고 있었다')],
 "p30":[(1,'C','caption','Episode 5 끝 · 다음 화 · 폭풍이 온다, 토네이도\n(AI가 표준을 잡는 순간)')],
}

BANDS = {
 "p05":'거점 완전 점령 → 동종업계가 reference 받고 합류 = 볼링앨리의 시작 (CrowdStrike Falcon)',
 "p13":'핀은 두 방향으로 · ① 옆 업종, 같은 기능·다른 고객군(세그먼트 확장) ② 같은 업종, 새 용도(앱 확장)',
 "p16":'핀마다 다음 핀의 reference가 자동 생성 → 거점 하나가 인접 핀을 연쇄로 쓰러뜨린다',
 "p19":'투자 관점 · 이 회사가 거점에서 옆·위로 reference 연쇄로 번지고 있는가',
 "p27":'모든 핀이 다 쓰러질 때까진 아직 토네이도가 아니다 (다음 화)',
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
    print("generating EP5", pid, g.MODEL, "...")
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
