#!/usr/bin/env python3
# 고릴라 헌터스 Ep9 "중심가의 평화" — TALC와 PLC, 윈텔의 몰락 — gpt-image-2 (~30장)
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.expanduser("~/Desktop/고릴라헌터스_EP9")
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
    "(TALC, PLC, Wintel, Winvidia, Windows, Intel, NVIDIA) cleanly and correctly.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic chapter-title page. A peaceful main-street townscape with a gorilla seated on a throne in silhouette; a warm sunset on one side of the sky hinting at decline; the throne lit by a warm spotlight. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM relaxed, asking GU BON-JIL; GU BON-JIL calm. (2 ~45% close-up) GU BON-JIL with a slight knowing look.",
 "p03":"One panel (~100%). A main-street scene: a gorilla peacefully on a throne, a growth-rate curve that has flattened but revenue resting on a high stable plateau; a clean label '중심가 = 성숙기'; calm and prosperous.",
 "p04":"Two panels. (1 ~55%) NA BAE-UM reassured, asking if the gorilla lasts forever; GU BON-JIL's face turning slightly serious, raising a finger. (2 ~45%) GU BON-JIL's pointed look.",
 "p05":"Two panels. (1 ~55%) the sunset behind the throne deepening, a shadow falling; NA BAE-UM uneasy. (2 ~45%) the throne with a longer shadow.",
 "p06":"Two panels. (1 ~55%) GU BON-JIL turning to the whiteboard to draw two curves; NA BAE-UM ready. (2 ~45%) GU BON-JIL picking up the marker.",
 "p07":"One panel (~100%). A whiteboard with TWO curves side by side: a bell-shaped 'TALC' curve (adopter distribution) and a 'PLC' revenue curve that peaks and then declines; a clean label noting they are different curves; GU BON-JIL pointing.",
 "p08":"Two panels. (1 ~55%) GU BON-JIL explaining the difference between the two curves; NA BAE-UM following. (2 ~45%) close on the PLC peak-and-decline section.",
 "p09":"Two panels. (1 ~55%) GU BON-JIL noting even main-street products pass PLC's peak and decline; NA BAE-UM noting. (2 ~45%) NA BAE-UM's concerned face.",
 "p10":"One panel (~100%). NA BAE-UM's notebook close-up: 'татС = 누가 사는가' corrected to two clean lines 'TALC = 누가 사는가' and 'PLC = 얼마나 팔리는가'; a small two-curve doodle.",
 "p11":"Two panels. (1 ~55%) GU BON-JIL turning to a bigger point about standard replacement; NA BAE-UM attentive. (2 ~45%) GU BON-JIL serious look.",
 "p12":"One panel (~100%). A whiteboard standard-replacement diagram: LEFT a faded 'Wintel (Windows + Intel)' dominating PCs for 40 years; RIGHT a bright 'Winvidia (Windows + NVIDIA)' 2026; an arrow handing the standard over; beside Intel, faint tombstone silhouettes of Motorola and Nokia; clean English labels.",
 "p13":"Two panels. (1 ~55%) GU BON-JIL explaining the Wintel-to-Winvidia shift; NA BAE-UM amazed. (2 ~45%) close on the bright Winvidia side.",
 "p14":"Two panels. (1 ~55%) GU BON-JIL noting Intel is becoming a past gorilla like Motorola and Nokia; NA BAE-UM grave. (2 ~45%) the tombstone silhouettes close-up.",
 "p15":"Two panels. (1 ~55%) NA BAE-UM saying even the No.1 gets pushed out when the category changes; GU BON-JIL nodding. (2 ~45%) NA BAE-UM's realization.",
 "p16":"One panel (~100%). A timeline of gorilla replacement across eras with each era's leader icon: 아날로그 → 피처폰 → 스마트폰, and Wintel → Winvidia; each step replacing the last; GU BON-JIL beside.",
 "p17":"Two panels. (1 ~55%) GU BON-JIL explaining each era had its own gorilla; NA BAE-UM noting. (2 ~45%) close on the timeline handoff.",
 "p18":"Two panels. (1 ~55%) NA BAE-UM asking gravely whether the gorilla is safe; GU BON-JIL raising a finger. (2 ~45%) GU BON-JIL serious close-up.",
 "p19":"One panel (~100%). A dramatic image: a category dying and the gorilla fading away with it in silhouette; ominous.",
 "p20":"Two panels. (1 ~55%) GU BON-JIL stating that when the category dies, the gorilla dies; NA BAE-UM absorbing. (2 ~45%) NA BAE-UM's sober face.",
 "p21":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky question; GU BON-JIL with a dry amused look. (2 ~45%) HAN TANG-SU deflating as GU BON-JIL retorts.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM applying it, thoughtful about category risk. (2 ~45%) his analytical face.",
 "p23":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line; GU BON-JIL nodding behind. (2 ~40%) the notebook close-up with a sunset-throne doodle.",
 "p24":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM resolved with new understanding; GU BON-JIL warm. (2 ~45%) NA BAE-UM thoughtful.",
 "p26":"Two panels. (1 ~55%) GU BON-JIL noting the selling rule will come in a later season; NA BAE-UM nodding. (2 ~45%) GU BON-JIL knowing look.",
 "p27":"Two panels. (1 ~55%) GU BON-JIL turning encouraging, hinting at NA BAE-UM's own upcoming test; a memory-chip silhouette in the background. (2 ~45%) NA BAE-UM surprised but eager.",
 "p28":"Two panels. (1 ~55%) GU BON-JIL smiling, delivering the cliffhanger about NA BAE-UM doing the staging himself; NA BAE-UM determined. (2 ~45%) the memory-chip silhouette glowing.",
 "p29":"One panel (~100%). A memory-chip silhouette glows in the dark as NA BAE-UM looks toward it, ready for his first test; anticipatory.",
 "p30":"One panel (~100%). Closing chapter-end: the sunset throne and a memory-chip silhouette; NA BAE-UM and GU BON-JIL small figures; reserve a black caption band across the very bottom for the next-episode preview.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 09\n중심가의 평화\n영원한 고릴라는 없다\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','표준을 잡으면\n이제 좀 편해지는 거예요?'),
        (2,'C','speech','평화가 오긴 와\n근데 말이지')],
 "p03":[(1,'C','speech','성장률은 완만해져도\n매출은 높은 고원에서 안정돼'),
        (1,'C','narr','이걸 중심가, 성숙기라 한다')],
 "p04":[(1,'C','speech','이제 고릴라가\n영원히 가는 거죠?'),
        (2,'C','speech','그게 함정이야')],
 "p05":[(1,'C','think','평화가 함정이라고…?'),
        (2,'C','narr','왕좌 뒤로, 노을이 짙어졌다')],
 "p06":[(1,'C','speech','곡선 두 개를\n같이 봐야 해'),
        (2,'C','think','두 곡선…?')],
 "p07":[(1,'C','speech','TALC는 채택자 분포, 누가 사는가\nPLC는 매출 곡선, 얼마나 팔리는가'),
        (1,'C','narr','둘은 전혀 다른 곡선이다')],
 "p08":[(1,'C','speech','중심가 제품도\nPLC의 정점과 쇠퇴를 지나'),
        (2,'C','think','매출도 결국 꺾이는구나')],
 "p09":[(1,'C','speech','누가 사느냐와\n얼마나 팔리느냐는 다른 얘기야'),
        (2,'C','think','두 개를 헷갈리면 안 되겠다')],
 "p10":[(1,'C','label','TALC = 누가 사는가'),
        (1,'C','label','PLC = 얼마나 팔리는가')],
 "p11":[(1,'C','speech','더 무서운 건\n표준 자체가 바뀌는 거야'),
        (2,'C','think','표준이 바뀐다고?')],
 "p12":[(1,'C','speech','40년간 PC를 지배한 윈텔\n근데 2026년, 젠슨황이 윈비디아를 선언했어'),
        (2,'C','think','윈텔에서 윈비디아로…')],
 "p13":[(1,'C','speech','NVIDIA가 두뇌, MS가 OS\n표준이 통째로 넘어가는 거야'),
        (2,'C','think','한 시대가 저무네')],
 "p14":[(1,'C','speech','인텔은 모토롤라·노키아처럼\n표준 교체기에 밀려나는 과거 고릴라가 되어가고 있어'),
        (2,'C','think','한때 1등도 저렇게…')],
 "p15":[(1,'C','speech','1등도 카테고리가 바뀌면\n밀리는군요…'),
        (2,'C','think','맞아, 라는 눈빛')],
 "p16":[(1,'C','speech','아날로그, 피처폰, 스마트폰\n각 시대의 고릴라가 다 달랐어'),
        (1,'C','narr','카테고리가 바뀌니 고릴라도 바뀌었다')],
 "p17":[(1,'C','speech','그 시대의 왕도\n다음 시대엔 평민이 돼'),
        (2,'C','think','영원한 1등은 없구나')],
 "p18":[(1,'C','speech','그럼 고릴라도\n안전하지 않은 거네요?'),
        (2,'C','speech','맞아, 잘 들어')],
 "p19":[(1,'C','emph','카테고리가 죽으면, 고릴라도 죽는다')],
 "p20":[(1,'C','speech','회사가 멀쩡해도\n카테고리가 저물면 같이 저물어'),
        (2,'C','think','그래서 단계를 봐야 하는구나')],
 "p21":[(1,'C','speech','그럼 영원한 1등은 없어요?'),
        (2,'C','speech','없어, 핫한 것도 마찬가지'),],
 "p22":[(1,'C','think','내 종목의 카테고리는\n지금 어느 단계지?'),
        (2,'C','think','회사가 아니라 단계를 보자')],
 "p23":[(1,'C','speech','그러니까 평화는…'),
        (2,'C','caption','중심가 = 성숙기 · 단, 카테고리가 바뀌면 고릴라도 바뀐다')],
 "p24":[(1,'C','think','왕좌도, 시대가 끝나면 빈다'),
        (2,'C','think','단계가 전부구나')],
 "p25":[(1,'C','think','회사를 사랑하지 말고\n단계를 보라'),
        (2,'C','think','이제 좀 알 것 같다')],
 "p26":[(1,'C','speech','언제 파느냐, 매도 원칙은\n시즌4에서 제대로 다뤄'),
        (2,'C','think','파는 것도 원칙이 있구나')],
 "p27":[(1,'C','speech','자, 그럼 이제\n네가 직접 단계를 판별해보자'),
        (2,'C','think','제가 직접요?')],
 "p28":[(1,'C','speech','다음 화,\n네 첫 시험이야'),
        (2,'C','narr','어둠 속에서, 메모리 칩 하나가 빛났다')],
 "p29":[(1,'C','emph','회사가 아니라, 카테고리의 단계를 보라'),
        (1,'C','think','드디어 내가 해보는구나')],
 "p30":[(1,'C','caption','Episode 9 끝 · 다음 화 · 나배움의 첫 시험\n(메모리 한 섹터로 단계를 다 본다)')],
}

BANDS = {
 "p03":'중심가 = 성숙기(성장률↓, 매출은 높은 고원에서 안정) · 단 평화는 영원하지 않다',
 "p07":'TALC(누가 사는가) vs PLC(얼마나 팔리는가)는 다른 곡선 · 중심가 제품도 PLC 정점·쇠퇴를 지난다',
 "p12":'윈텔(Windows+Intel) 40년 지배 → 윈비디아(Windows+NVIDIA, 2026 젠슨황) · 인텔=모토롤라·노키아처럼 과거 고릴라',
 "p19":'카테고리가 죽으면 그 고릴라도 같이 죽는다 (매도 원칙은 시즌4)',
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
    print("generating EP9", pid, g.MODEL, "...")
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
