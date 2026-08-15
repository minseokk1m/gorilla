#!/usr/bin/env python3
# 고릴라 헌터스 Ep8 "아키텍처 전쟁" — 표준화는 전쟁이다 — gpt-image-2 (~30장)
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.expanduser("~/Desktop/고릴라헌터스_EP8")
FINAL = os.path.join(BASE, "final"); KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key)

CHARS = g.CHARS

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. Render English labels "
    "(CUDA, ROCm, TPU, NVIDIA, AMD, Google, JAX, XLA, PyTorch, VHS, Betamax) cleanly and correctly.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic chapter-title page. Two armies face off over a flag on a hilltop in silhouette, a strategy-map tone, the summit flag lit by a spotlight. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover, war-strategy mood.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking GU BON-JIL how the No.1 standard position is decided; GU BON-JIL calm. (2 ~45% close-up) GU BON-JIL with a sharp confident look.",
 "p03":"Two panels. (1 ~55%) GU BON-JIL at the whiteboard with a strategy map and a hill drawing, two books in an inset: '마케팅 전쟁' and a Clausewitz '전쟁론' silhouette; explaining. (2 ~45%) GU BON-JIL pointing at the hilltop flag.",
 "p04":"One panel (~100%). A whiteboard three-camp standoff diagram: a huge 'CUDA' camp (NVIDIA) crowded with library, tutorial and researcher icons; a smaller 'ROCm' camp (AMD) that is technically fine but sparse; a 'TPU' camp (Google); GU BON-JIL beside. Clean English labels.",
 "p05":"Two panels. (1 ~55%) GU BON-JIL pointing at the crowded CUDA camp vs the empty ROCm camp; NA BAE-UM noting. (2 ~45%) close on the dense icons around CUDA.",
 "p06":"Two panels. (1 ~55%) GU BON-JIL explaining that everyone codes in CUDA; NA BAE-UM following. (2 ~45%) GU BON-JIL emphatic close-up.",
 "p07":"Two panels. (1 ~55%) GU BON-JIL making the key point with a finger raised; NA BAE-UM nodding. (2 ~45%) NA BAE-UM's understanding face.",
 "p08":"One panel (~100%). NA BAE-UM's notebook close-up: two lines '표준 = 더 좋은 기술 X' and '표준 = 생태계 O'; a small flag-on-hill doodle.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM asking if history shows the same; GU BON-JIL smiling, turning nostalgic. (2 ~45%) a faint sepia transition begins.",
 "p10":"One panel (~100%, warm SEPIA 1980s flashback). VHS tapes vs Betamax tapes face off; video rental shops and content all pile onto the VHS camp; a clean label 'VHS vs Betamax'; the better tech (Betamax) losing because of ecosystem.",
 "p11":"Two panels. (1 ~55%) GU BON-JIL (present) noting that VHS vs Betamax was the same; NA BAE-UM realizing. (2 ~45%) NA BAE-UM's dawning face.",
 "p12":"Two panels. (1 ~55%) NA BAE-UM saying you can't just buy the better tech; GU BON-JIL nodding. (2 ~45%) GU BON-JIL approving look.",
 "p13":"Two panels. (1 ~55%) GU BON-JIL turning to add a twist about Google; NA BAE-UM curious. (2 ~45%) GU BON-JIL picking up the marker.",
 "p14":"One panel (~100%). A whiteboard diagram of Google's counterattack: 'TPU + JAX·XLA' lowering CUDA dependence, and 'PyTorch/XLA' compatible tools attacking the switching-cost itself with arrows; a small crack appearing in the CUDA moat; clean English labels.",
 "p15":"Two panels. (1 ~55%) GU BON-JIL explaining Google's different approach, serious; NA BAE-UM intent. (2 ~45%) close on the crack in the CUDA moat.",
 "p16":"Two panels. (1 ~55%) GU BON-JIL noting Google is a different class of challenger with capital and vertical integration; NA BAE-UM noting. (2 ~45%) GU BON-JIL confident close-up.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM comparing AMD and Google in his mind, thoughtful. (2 ~45%) NA BAE-UM analytical.",
 "p18":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky question; GU BON-JIL with a dry amused look. (2 ~45%) HAN TANG-SU deflating as GU BON-JIL retorts.",
 "p19":"Two panels. (1 ~55%) NA BAE-UM applying the ecosystem idea to a stock, thoughtful. (2 ~45%) his focused face.",
 "p20":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line; GU BON-JIL nodding behind. (2 ~40%) the notebook close-up with a flag doodle.",
 "p21":"Two panels. (1 ~55%) NA BAE-UM resolved, understanding settling. (2 ~45%) his thoughtful close-up.",
 "p22":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p23":"Two panels. (1 ~55%) GU BON-JIL raising a finger for the key bet; NA BAE-UM attentive. (2 ~45%) GU BON-JIL emphatic.",
 "p24":"One panel (~100%). GU BON-JIL upper body, finger raised, behind him a single flag on a hilltop summit; a strong emphatic composition.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM nodding and writing; GU BON-JIL approving. (2 ~45%) the notebook line close-up.",
 "p26":"Two panels, tone calming. (1 ~55%) the scene tone becomes peaceful; a gorilla on a throne silhouette appears faintly in the distance; GU BON-JIL warm. (2 ~45%) NA BAE-UM looking toward the throne.",
 "p27":"Two panels. (1 ~55%) GU BON-JIL hinting that peace follows when a standard is set, but it is not eternal; NA BAE-UM curious. (2 ~45%) the gorilla-throne silhouette, calm but with a faint sunset.",
 "p28":"One panel (~100%). A peaceful main-street tone with the gorilla on a distant throne, a faint sunset hinting decline; GU BON-JIL's small figure.",
 "p29":"Two panels. (1 ~55%) GU BON-JIL delivering the cliffhanger about coming peace and its impermanence; NA BAE-UM listening. (2 ~45%) the distant throne under a faint sunset.",
 "p30":"One panel (~100%). Closing chapter-end: the gorilla on a distant throne at dusk; NA BAE-UM and GU BON-JIL small figures; reserve a black caption band across the very bottom for the next-episode preview.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 08\n아키텍처 전쟁\n더 좋은 기술이 이기는 게 아니다\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','그 1등 자리는\n대체 어떻게 정해지는 거예요?'),
        (2,'C','speech','한마디로, 전쟁이야')],
 "p03":[(1,'C','speech','표준을 잡는 건 전쟁이야\n『마케팅 전쟁』이 클라우제비츠에서 빌려온 시각이지'),
        (2,'C','speech','누가 고지를 점령하느냐가\n전부를 결정한다')],
 "p04":[(1,'C','speech','지금 AI 칩은 세 진영이야\nCUDA, ROCm, TPU'),
        (1,'C','narr','CUDA 진영에 다 몰려 있었다')],
 "p05":[(1,'C','speech','AMD ROCm이 기술적으로 나쁘지 않아도\n주변이 한산하지'),
        (2,'C','think','CUDA만 사람이 바글바글하네')],
 "p06":[(1,'C','speech','모든 AI 연구자가 CUDA로 코드를 짜\n라이브러리·튜토리얼·인력이 다 CUDA야'),
        (2,'C','think','그럼 옮기기가 힘들겠다')],
 "p07":[(1,'C','emph','기술이 아니라, 생태계가 표준을 만든다'),
        (2,'C','think','기술력이 다가 아니구나')],
 "p08":[(1,'C','label','표준 = 더 좋은 기술 X'),
        (1,'C','label','표준 = 생태계 O')],
 "p09":[(1,'C','speech','역사에도 똑같은 게 있었나요?'),
        (2,'C','speech','VHS와 Betamax 알아?')],
 "p10":[(1,'C','narr','더 좋은 기술이라던 Betamax가\n생태계에 밀려 사라졌다')],
 "p11":[(1,'C','speech','비디오 가게도, 콘텐츠도\n전부 VHS로 몰렸거든'),
        (2,'C','think','더 좋은 게 진 거였어')],
 "p12":[(1,'C','speech','그럼 기술이 좋다고\n사면 안 되겠네요'),
        (2,'C','speech','바로 그거야')],
 "p13":[(1,'C','speech','단, 구글은 좀 달라'),
        (2,'C','think','CUDA가 무너질 수도 있다고?')],
 "p14":[(1,'C','speech','TPU와 JAX·XLA로\nCUDA 의존을 낮추고'),
        (1,'C','narr','PyTorch·XLA로 전환비용 자체를 공격한다')],
 "p15":[(1,'C','speech','호환 도구로 갈아타는 비용을 줄이면\n해자에 균열이 가'),
        (2,'C','think','CUDA도 안전하진 않구나')],
 "p16":[(1,'C','speech','자본과 수직계열을 가진 도전자라\nAMD와는 체급이 달라'),
        (2,'C','think','같은 2등이 아니구나')],
 "p17":[(1,'C','think','생태계를 흔들 수 있는 2등인가'),
        (2,'C','think','이건 따로 봐야겠다')],
 "p18":[(1,'C','speech','그럼 그냥 1등만 사면 되죠?'),
        (2,'C','speech','생태계부터 봐, 핫한 거 말고')],
 "p19":[(1,'C','think','이 회사 주변엔\n생태계가 몰리고 있나?'),
        (2,'C','think','그게 진짜 해자다')],
 "p20":[(1,'C','speech','그러니까 표준 전쟁은…'),
        (2,'C','caption','기술이 아니라 생태계 · 표준을 쥔 자가 고지를 가진다')],
 "p21":[(1,'C','think','더 좋은 기술이 아니라, 더 모인 쪽'),
        (2,'C','think','생태계를 보라')],
 "p22":[(1,'C','think','전쟁의 승부는 화력이 아니라 보급이었어'),
        (2,'C','think','생태계가 보급선이구나')],
 "p23":[(1,'C','speech','그래서 결론은 하나야'),
        (2,'C','think','베팅 대상이…')],
 "p24":[(1,'C','emph','기술이 아니라, 표준을 잡는 자에게 베팅해'),
        (1,'C','narr','고지의 깃발은 하나뿐이다')],
 "p25":[(1,'C','speech','기술 우위가\n곧 승리는 아니네요'),
        (2,'C','caption','베팅 대상 = 표준을 쥔 1등 · 기술 우위 ≠ 승리')],
 "p26":[(1,'C','narr','표준이 잡히자\n전쟁터에 평화가 찾아왔다'),
        (2,'C','think','이제 고릴라가 왕좌에 앉았네')],
 "p27":[(1,'C','speech','근데 그 평화도\n영원하진 않아'),
        (2,'C','think','영원한 고릴라는 없다…?')],
 "p28":[(1,'C','emph','표준이 잡히면 평화가 온다, 단 영원하진 않다')],
 "p29":[(1,'C','speech','다음 화, 표준이 잡힌 뒤 찾아오는 평화\n그리고 그 평화의 끝'),
        (2,'C','narr','왕좌 너머로, 옅은 노을이 지고 있었다')],
 "p30":[(1,'C','caption','Episode 8 끝 · 다음 화 · 중심가의 평화\n(TALC와 PLC, 윈텔의 몰락)')],
}

BANDS = {
 "p07":'기술이 아니라 생태계가 표준을 만든다 · CUDA에 라이브러리·튜토리얼·연구자가 다 몰린다',
 "p11":'VHS vs Betamax · 더 좋은 기술(Betamax)이 진 이유 = 생태계',
 "p15":'구글의 반격 · TPU+JAX·XLA로 CUDA 의존↓, PyTorch·XLA로 전환비용 자체 공격 (자본·수직계열, AMD와 체급 다름)',
 "p24":'기술 우위 ≠ 승리 · 표준을 잡는 자에게 베팅한다',
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
    print("generating EP8", pid, g.MODEL, "...")
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
