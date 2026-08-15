#!/usr/bin/env python3
# 고릴라 헌터스 Ep6 "폭풍이 온다: 토네이도" — AI가 표준 잡는 순간 — gpt-image-2 (~30장)
# usage: python3 gen_ep6.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep6"); KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

CHARS = (g.CHARS +
    " EP6 RECURRING: HAN SIL-SOK (40s pragmatist 'Early Majority' everyman, neat shirt and knit vest, "
    "metal glasses, calm, in an office with colleagues).")

CHARS = CHARS + (" CRITICAL CONSISTENCY: NA BAE-UM is EXACTLY 39 years old and must look late-30s on EVERY page. STUDY GROUP ROOM: one whiteboard, long table, bookshelves; NO trading desks, NO multi-monitor setups, NO wall posters.")

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
    "SCREEN RULE: laptop/tablet/phone screens in any scene must be BLANK or dark unless their content is explicitly specified. NEVER print any text, sound-effect or logo on clothing. "
    "FLASHBACK RULE: period/flashback scenes contain ONLY period-appropriate anonymous people and props; never the modern cast, smartphones or modern clothing. "
    "When a page DOES specify diagram labels, render exactly those labels cleanly and nowhere else.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic chapter-title page. A massive TORNADO storm silhouette sweeps over a city skyline, lightning and churning clouds, a spotlight at the storm's core. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover, epic stormy tone.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL what comes when all the bowling pins finally fall; JU BON-JIL calm. (2 ~45% close-up) JU BON-JIL with a knowing look, about to explain the storm.",
 "p03":"Two panels, late-2022 vibe. (1 ~55%) a ChatGPT-style AI chat screen spreading explosively, glowing, shared everywhere. (2 ~45%) close on the screen, a sense of viral explosion.",
 "p04":"One panel (~100%). A big bold counter graphic '2개월 만에 1억 사용자' over a montage of many people on phones/laptops all using the AI chat at once; explosive adoption.",
 "p05":"Two panels, office. (1 ~55%) HAN SIL-SOK (pragmatist) in an office where he and all his colleagues are using the AI tool together at their desks; ordinary everyday adoption. (2 ~45%) HAN SIL-SOK's matter-of-fact face.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL making the key point that this is the tornado, gesturing; NA BAE-UM nodding. (2 ~45%) NA BAE-UM's thoughtful reaction close-up, the thought bubble clearly belonging to NA BAE-UM.",
 "p07":"One split panel (~100%). LEFT (dry, cold): a barren cracked canyon labeled 캐즘. RIGHT (stormy): a swirling tornado labeled 토네이도. Between them a small bridge (교두보·볼링앨리) connecting the two. Clear contrast.",
 "p08":"Two panels. (1 ~55%) JU BON-JIL explaining the bridge between chasm and tornado; NA BAE-UM following. (2 ~45%) NA BAE-UM's understanding face.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM asking where the storm's energy flowed; JU BON-JIL turning to the whiteboard. (2 ~45%) JU BON-JIL picking up the marker.",
 "p10":"One panel (~100%). A whiteboard sales chart: NVIDIA data-center revenue exploding in a steep non-linear curve, and below it parallel rising arrows for SK Hynix, Samsung, Micron HBM memory; clean labels 'NVIDIA GPU' and 'HBM'; JU BON-JIL pointing.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL explaining that AI big-tech bought all of it; NA BAE-UM amazed. (2 ~45%) close on the steep non-linear part of the curve.",
 "p12":"Two panels. (1 ~55%) NA BAE-UM pointing at the soaring chart, astonished. (2 ~45%) NA BAE-UM's amazed close-up.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL raising a finger to mark an important principle; NA BAE-UM ready to note. (2 ~45%) NA BAE-UM's thoughtful reaction close-up, the thought bubble clearly belonging to NA BAE-UM.",
 "p14":"One panel (~100%). A whiteboard with TWO labeled rows for buy-timing: '응용 소프트웨어 → 볼링앨리부터' and '지원 하드웨어(칩·메모리) → 토네이도 형성 후'; NVIDIA and HBM icons placed in the 'after tornado' row; JU BON-JIL beside.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL explaining that timing differs by category type; NA BAE-UM nodding. (2 ~45%) NA BAE-UM's focused face.",
 "p16":"One panel (~100%). NA BAE-UM's notebook close-up, two hand-written lines: '원칙1 SW = 볼링앨리부터' and '원칙2 칩·메모리 = 토네이도 후'; a small tornado doodle.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM raising his hand to ask how to detect tornado entry; JU BON-JIL smiling. (2 ~45%) JU BON-JIL pointing at a chart.",
 "p18":"Two panels. (1 ~55%) JU BON-JIL pointing at a non-linear accelerating revenue curve; NA BAE-UM watching. (2 ~45%) close on the accelerating curve.",
 "p19":"Two panels. (1 ~55%) JU BON-JIL making the detection point clearly; NA BAE-UM noting. (2 ~45%) NA BAE-UM's thoughtful reaction close-up, the thought bubble clearly belonging to NA BAE-UM.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM connecting it, eyes widening. (2 ~45%) NA BAE-UM's realization.",
 "p21":"Two panels, comedic. (1 ~55%) HAN TANG-SU (red cap) butts in with a cocky question; JU BON-JIL with a dry amused look. (2 ~45%) HAN TANG-SU deflating as JU BON-JIL retorts.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM applying it to himself thoughtfully. (2 ~45%) his analytical face.",
 "p23":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line; JU BON-JIL nodding in the background. (2 ~40%) the notebook close-up with a tornado-and-bridge doodle.",
 "p24":"Two panels. (1 ~55%) NA BAE-UM resolved, understanding settling. (2 ~45%) his thoughtful close-up.",
 "p25":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p26":"One panel (~100%). A crowd of people (pragmatist masses) rushing together in the same direction in silhouette; a sense of herd movement.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL turning toward the crowd idea, a knowing smile; NA BAE-UM curious. (2 ~45%) the crowd silhouette in the background.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL delivering the cliffhanger about herd psychology; NA BAE-UM listening. (2 ~45%) the crowd rushing one way, stronger.",
 "p29":"One panel (~100%). The crowd surging toward one direction with JU BON-JIL's small silhouette watching; dramatic.",
 "p30":"One panel (~100%). Closing chapter-end: the herd crowd silhouette; NA BAE-UM and JU BON-JIL small figures; reserve a black caption band across the very bottom for the next-episode preview.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 06\n폭풍이 온다: 토네이도\n실용주의자가 한꺼번에 사는 순간\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','모든 핀이 쓰러지면\n그 다음엔 뭐가 와요?'),
        (2,'C','speech','폭풍이 와\n토네이도라고 부르지')],
 "p03":[(1,'C','narr','2022년 말, 한 AI 채팅이\n폭발적으로 퍼졌다'),
        (2,'C','think','이게 그렇게 빨리 퍼진다고?')],
 "p04":[(1,'C','emph','2개월 만에 1억 사용자')],
 "p05":[(1,'C','speech','이거 우리 회사도 다 써요'),
        (2,'C','narr','실용주의자들이 한꺼번에 움직였다')],
 "p06":[(1,'C','speech','실용주의자가 동시에 움직이는 순간\n그게 바로 토네이도야'),
        (2,'C','think','한꺼번에 우르르…')],
 "p07":[(1,'L','label','캐즘 = 안 사는 시기'),
        (1,'R','label','토네이도 = 우르르 사는 시기'),
        (1,'C','speech','토네이도는 캐즘의 정반대야\n그 사이에 교두보·볼링앨리가 다리를 놓았지')],
 "p08":[(1,'C','speech','다리를 건너면\n메마른 골짜기가 폭풍으로 바뀌는 거야'),
        (2,'C','think','캐즘을 건너야 토네이도구나')],
 "p09":[(1,'C','speech','근데 그 폭풍이\n어디로 흘렀을까요?'),
        (2,'C','speech','좋은 질문이야\n칩과 메모리로 갔지')],
 "p10":[(1,'C','speech','NVIDIA GPU와 HBM 메모리야\nAI 빅테크가 다 사들였거든'),
        (1,'C','narr','매출이 비선형으로 폭발했다')],
 "p11":[(1,'C','speech','SK하이닉스·삼성·마이크론\nHBM이 같이 치솟았어'),
        (2,'C','think','폭풍이 칩으로 흘렀구나')],
 "p12":[(1,'C','speech','이게 토네이도의 흔적이군요…'),
        (2,'C','think','이 가파른 구간이 폭풍이었어')],
 "p13":[(1,'C','speech','여기서 중요한 원칙 하나'),
        (2,'C','think','매수 타이밍이 다르다고?')],
 "p14":[(1,'C','speech','지원 하드웨어, 칩·메모리는\n토네이도가 형성된 뒤 매수하는 거야'),
        (2,'C','speech','응용 소프트웨어는 볼링앨리부터\n칩·메모리는 토네이도 확인 후')],
 "p15":[(1,'C','speech','카테고리 유형에 따라\n매수 타이밍이 달라'),
        (2,'C','think','종류마다 때가 다르구나')],
 "p16":[(1,'C','label','원칙1 SW = 볼링앨리부터'),
        (1,'C','label','원칙2 칩·메모리 = 토네이도 후')],
 "p17":[(1,'C','speech','토네이도 진입을\n어떻게 알아채요?'),
        (2,'C','speech','두 가지를 봐')],
 "p18":[(1,'C','speech','첫째, 매출이\n비선형으로 가속하는가'),
        (2,'C','think','직선이 아니라 곡선…')],
 "p19":[(1,'C','speech','둘째, 실용주의자가\n사고 있는가'),
        (2,'C','think','대중이 들어왔는가구나')],
 "p20":[(1,'C','think','가속 + 대중 진입\n이게 토네이도 신호'),
        (2,'C','think','이제 좀 보인다')],
 "p21":[(1,'C','speech','그럼 지금 막 사면 돼요?'),
        (2,'C','speech','신호부터 확인해, 핫한 거 말고')],
 "p22":[(1,'C','think','내 종목엔\n그 신호가 있었나?'),
        (2,'C','think','가속도, 대중도 없었지')],
 "p23":[(1,'C','speech','그러니까 토네이도는…'),
        (2,'C','caption','캐즘을 건넌 뒤, 실용주의자가 우르르 사는 폭풍의 시기')],
 "p24":[(1,'C','think','때를 읽는 게 핵심이구나'),
        (2,'C','think','종류와 타이밍, 둘 다')],
 "p25":[(1,'C','think','폭풍은 갑자기 오는 게 아니었어'),
        (2,'C','think','다리를 건넌 자에게만 온다')],
 "p26":[(1,'C','narr','사람들이 같은 방향으로\n우르르 몰려갔다')],
 "p27":[(1,'C','speech','근데 이 군중이\n왜 같은 데로 몰릴까?'),
        (2,'C','think','떼거리…?')],
 "p28":[(1,'C','speech','다음 화,\n실용주의자의 떼거리 심리'),
        (2,'C','narr','폭풍의 진짜 연료는, 사람의 심리였다')],
 "p29":[(1,'C','emph','안전한 선택이, 표준을 만든다'),
        (1,'C','narr','군중은 한 곳으로만 쏠렸다')],
 "p30":[(1,'C','caption','Episode 6 끝 · 다음 화 · 실용주의자의 떼거리 심리\n(양의 피드백과 표준의 탄생)')],
}

BANDS = {
 "p06":'실용주의자가 한꺼번에 사는 순간 = 토네이도 (캐즘의 정반대, 그 사이를 교두보·볼링앨리가 잇는다)',
 "p11":'폭풍이 흘러간 곳 = NVIDIA GPU + HBM 메모리 · AI 빅테크 수요로 매출이 비선형 폭발',
 "p14":'원칙1 응용 소프트웨어 = 볼링앨리부터 / 원칙2 칩·메모리(지원 하드웨어) = 토네이도 형성 후 매수',
 "p19":'토네이도 감지 = ① 매출이 비선형으로 가속 ② 실용주의자(대중)가 사고 있는가',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성(이미지 미포함), 선별 부여
NOTES = {
 "p01":'해설: 토네이도(Tornado)는 실용주의자 대중이 한꺼번에 구매에 나서는 초고속 성장기다. Moore, 『토네이도 마케팅』(Inside the Tornado, 유승삼 역)',
 "p06":'해설: 토네이도기의 원칙은 수요 창출이 아니라 공급이다 — "무조건 물량을 출하하라(On time delivery)". 이때 최대 80%를 점유하는 고릴라가 탄생한다',
 "p11":'사실 확인: 생성형 AI 확산으로 AI 가속기(GPU)와 고대역폭 메모리(HBM) 수요가 폭발했고, 관련 기업 매출이 비선형 성장을 보였다(2023~)',
 "p19":'투자 적용: 토네이도 감지 신호 = ①매출의 비선형 가속 ②구매 주체가 선각수용자가 아닌 실용주의자 대중인가. 두 신호가 겹칠 때가 진짜 폭풍이다',
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
    print("generating EP6", pid, g.MODEL, "...")
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
