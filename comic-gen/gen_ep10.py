#!/usr/bin/env python3
# 고릴라 헌터스 Ep10 "나배움의 첫 시험" — 메모리 한 섹터로 단계를 다 본다 (시즌1 피날레) — gpt-image-2 (~30장)
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep10"); KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

CHARS = (g.CHARS +
    " EP10 RECURRING: HAN SIL-SOK (40s pragmatist everyman, neat shirt and knit vest, metal glasses, calm).")

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
    "SCREEN RULE: every background laptop/tablet/phone in any scene is switched OFF with a plain dark screen unless its content is explicitly specified; NEVER draw any stock chart, graph, arrow or text on any screen. NEVER print any text, sound-effect or logo on clothing. "
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
 "p01":"A cinematic chapter-title page. A 5-tier cake silhouette and a stacked memory-chip (HBM) silhouette stand together, both lit by a spotlight. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover, season-finale tone.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL telling NA BAE-UM it is time for his first test; NA BAE-UM surprised but eager. (2 ~45% close-up) NA BAE-UM determined.",
 "p03":"One panel (~100%). A whiteboard with a 5-TIER CAKE diagram (bottom to top) with clean labels: ① Energy, ② Chips / Compute (GPU·memory), ③ Infrastructure (cloud data center), ④ Models (Gemini, GPT, Claude), ⑤ Applications; tier ② has a yellow highlight box '오늘 여기'; JU BON-JIL presenting.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL explaining the cake and pointing at tier 2; NA BAE-UM following. (2 ~45%) close on the highlighted Chips tier.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL saying even within memory, each category is at a different stage; NA BAE-UM noting. (2 ~45%) NA BAE-UM's focused face.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL gesturing to NA BAE-UM to come present; members watching. (2 ~45%) NA BAE-UM standing up, nervous-determined.",
 "p07":"Two panels. (1 ~55%) NA BAE-UM stepping to the whiteboard for his first test, members in silhouette watching. (2 ~45%) NA BAE-UM taking a breath, marker in hand.",
 "p07b":"One panel (~100%). The whiteboard with a clean hand-drawn 2x2 SWOT quadrant titled 'SWOT'; four cells labeled '강점 S', '약점 W', '기회 O', '위협 T'; JU BON-JIL beside it handing the marker to NA BAE-UM; ONLY these labels on the board.",
 "p08":"One panel (~100%). NA BAE-UM presenting at the whiteboard, beside him a stacked HBM chip illustration with a 'Tornado' label and arrows: SK Hynix leading, Samsung and Micron chasing, AI big-tech buying it all; confident.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM explaining HBM as high-bandwidth memory stacked on AI GPUs; members nodding. (2 ~45%) close on the stacked HBM chip.",
 "p10":"Two panels. (1 ~55%) NA BAE-UM pointing at the buying arrows; JU BON-JIL giving a small approving check mark. (2 ~45%) JU BON-JIL's small satisfied nod.",
 "p11":"Two panels. (1 ~55%) NA BAE-UM gaining confidence as he presents; members impressed. (2 ~45%) NA BAE-UM's confident face.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL gesturing for NA BAE-UM to continue to the other categories; NA BAE-UM ready. (2 ~45%) NA BAE-UM turning to the next part.",
 "p13":"One panel (~100%). A DRAM illustration (PC/server standard memory) with a stable high plateau curve; a clean label 'DRAM = Main Street'; NA BAE-UM presenting it.",
 "p14":"Two panels. (1 ~55%) NA BAE-UM explaining DRAM as a 30-year mature category, a Samsung+SK duopoly; members noting. (2 ~45%) close on the stable plateau curve.",
 "p15":"One panel (~100%). An SSD pushing out HDD illustration, SSD share rising with arrows; a clean label 'NAND/SSD = Main Street 진입 중'; NA BAE-UM presenting.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM explaining SSD nearly replacing HDD, moving from late tornado into main street; members following. (2 ~45%) close on the SSD-vs-HDD share arrows.",
 "p17":"One panel (~100%). An HDD illustration (Seagate, WD) with a declining downward curve in a sunset tone; a clean label 'HDD = Declining'; NA BAE-UM presenting.",
 "p18":"Two panels. (1 ~55%) NA BAE-UM explaining HDD makers yielding to SSD; JU BON-JIL adding a grave voice-over point. (2 ~45%) the declining HDD curve close-up.",
 "p19":"Two panels. (1 ~55%) JU BON-JIL emphasizing the category-death point; NA BAE-UM sober. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM connecting all the stages, the picture forming. (2 ~45%) NA BAE-UM's understanding face.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL turning to a deeper twist with HAN SIL-SOK; HAN SIL-SOK ready to add. (2 ~45%) HAN SIL-SOK calm close-up.",
 "p22":"One panel (~100%). A whiteboard CROSS diagram: a <DRAM cycle> curve with an <HBM cycle> curve rising up and crossing over it with arrows; a clean label noting standard memory swaps 1·2·3 ranks while HBM's high switching cost keeps the leader stable; HAN SIL-SOK pointing.",
 "p23":"Two panels. (1 ~55%) HAN SIL-SOK explaining the cross and HBM's stickiness; NA BAE-UM intent. (2 ~45%) close on the crossing curves.",
 "p23b":"One split panel (~100%), LEFT vs RIGHT contrast of two jungles. LEFT half (deep green): one massive calm gorilla on a high rock, a wide deep moat around it, label box inside left half '고릴라 게임 · 전환비용 큰 정글'. RIGHT half (lighter tone): three similar-sized lions circling a rotating crown on a pedestal, label box inside right half '킹덤 게임 · 전환비용 작은 정글'. A bold VS badge center, webtoon ink tone.",
 "p24":"One panel (~100%). A Samsung-Electronics-style single logo at top, with FOUR arrows branching down to four categories (HBM, DRAM, NAND, HDD), each arrow ending in a different stage label (Tornado / Main Street / 진입 / Declining); NA BAE-UM pointing.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM realizing one company spans four categories with different signals each; JU BON-JIL approving. (2 ~45%) NA BAE-UM's bright realization.",
 "p26":"Two panels. (1 ~55%) JU BON-JIL making the key takeaway with a finger raised; NA BAE-UM noting. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p27":"One panel (~100%). NA BAE-UM's notebook close-up: a clean line '회사가 아니라 카테고리 단위로 본다'; a small four-branch doodle; satisfying.",
 "p27b":"One panel (~100%). The whiteboard with a simple compound-interest sketch: a hand-written formula '72 ÷ 10 = 7.2년' and a small two-step stair doodle showing money doubling twice over the years; JU BON-JIL presenting warmly, NA BAE-UM and HAN TANG-SU wide-eyed; ONLY these figures on the board.",
 "p27c":"Two panels, the club closing. (1 ~60%) the whole study group around the long table, hands stacked together in the middle like a team huddle, warm laughter; notebooks and a corkboard with blank cards behind. (2 ~40%) JU BON-JIL's warm face delivering the final line of the season's lesson.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL smiling warmly, congratulating NA BAE-UM on passing his first test; the group warm. (2 ~45%) NA BAE-UM proud and moved.",
 "p29":"One panel (~100%). In the background two jungle silhouettes appear (a primate jungle and a kingdom jungle); JU BON-JIL smiling, delivering the season-2 hook.",
 "p30":"One panel (~100%). Closing SEASON-1 finale: two jungle silhouettes in the distance; NA BAE-UM and JU BON-JIL and the study members together as a group; reserve a black caption band across the very bottom for the season-2 preview. Triumphant, warm.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 10\n나배움의 첫 시험\n메모리 한 섹터로 단계를 다 본다\n시즌 1 종합 · 정글에 입장하다')],
 "p02":[(1,'C','speech','자, 이제 네가 직접 해볼 차례야\n첫 시험이다'),
        (2,'C','think','드디어 내가…!')],
 "p03":[(1,'C','speech','AI는 5층 케이크야\n에너지, 칩, 인프라, 모델, 앱'),
        (2,'C','think','오늘은 ②층, 칩이구나')],
 "p04":[(1,'C','speech','오늘은 그중 ②층\n메모리 한 섹터로 단계를 다 본다'),
        (2,'C','think','한 섹터로 다 본다고?')],
 "p05":[(1,'C','speech','같은 메모리 안에서도\n카테고리마다 단계가 달라'),
        (2,'C','think','메모리도 종류별로 다르구나')],
 "p06":[(1,'C','speech','자, 네가 직접 판별해봐'),
        (2,'C','think','떨리지만, 해보자')],
 "p07":[(1,'C','narr','처음으로 내가 화이트보드 앞에 섰다'),
        (2,'C','think','배운 걸 다 꺼내보자')],
 "p07b":[(1,'C','speech','판별 전에 도구를 하나 주지\n강점, 약점, 기회, 위협\n네 칸에 나눠 적으면서 봐'),
        (1,'C','narr','감이 아니라 틀로 본다\n그게 시험의 규칙이었다')],
 "p08":[(1,'C','speech','HBM은 AI 학습 GPU에 적층되는\n고대역폭 메모리예요'),
        (1,'C','narr','SK하이닉스 선두, 삼성·마이크론 추격')],
 "p09":[(1,'C','speech','AI 빅테크가 다 사고 있어요\n그러니까 Tornado죠'),
        (2,'C','think','가속 + 대중 진입, 신호가 맞아')],
 "p10":[(1,'C','speech','매출도 비선형으로 가속하고요'),
        (2,'C','speech','✓')],
 "p11":[(1,'C','think','맞췄다… 떨리지만 해냈어'),
        (2,'C','think','멤버들이 끄덕인다')],
 "p12":[(1,'C','speech','좋아, 다른 메모리도 봐'),
        (2,'C','think','다음은 DRAM이다')],
 "p13":[(1,'C','speech','PC·서버용 표준 DRAM은\n30년 된 카테고리, 삼성+SK 과점이에요'),
        (1,'C','narr','사이클 따라 오르내려도 카테고리는 안정')],
 "p14":[(1,'C','speech','그래서 DRAM은\n중심가(Main Street)예요'),
        (2,'C','think','성숙한 표준 시장이구나')],
 "p15":[(1,'C','speech','SSD가 HDD를 거의 대체했어요\nLate Tornado에서 중심가(Main Street) 진입 중'),
        (2,'C','think','막 성숙기로 들어가는 중')],
 "p16":[(1,'C','speech','NAND·SSD는\n아직 쏠림이 남아 있어요'),
        (2,'C','think','단계가 한 칸씩 다르네')],
 "p17":[(1,'C','speech','Seagate·WD는 SSD에\n자리를 내주는 중이에요'),
        (1,'C','narr','HDD는 Declining, 저무는 카테고리')],
 "p18":[(1,'C','speech','쇠퇴하는 카테고리는\n1등이라도 위험하죠'),
        (2,'C','speech','카테고리가 죽으면\n그 고릴라도 같이 죽는다')],
 "p19":[(1,'C','speech','그래서 회사가 멀쩡해도\n카테고리를 봐야 해'),
        (2,'C','think','단계가 곧 운명이구나')],
 "p20":[(1,'C','think','HBM, DRAM, NAND, HDD\n단계가 다 다르네'),
        (2,'C','think','한 섹터에 네 단계가 다 있어')],
 "p21":[(1,'C','speech','여기 한 가지 더 봐\n실속 씨가 짚어줄게'),
        (2,'C','think','뭐가 더 있다고?')],
 "p22":[(1,'C','speech','DRAM 사이클 위로\nHBM 사이클이 치고 올라오며 교차하고 있어'),
        (2,'C','speech','표준 메모리는 1·2·3등이 자리바꿈하지만\nHBM은 전환비용이 높아 1등 교체가 잘 안 일어나')],
 "p23":[(1,'C','speech','그래서 같은 메모리라도\nHBM 1등은 더 단단해'),
        (2,'C','think','전환비용이 해자구나')],
 "p23b":[(1,'C','speech','방금 그게 두 정글의 차이야\n전환비용이 크면 고릴라 게임\n작으면 왕관이 계속 도는 킹덤 게임'),
        (1,'C','narr','표준 DRAM은 킹덤,\nHBM은 고릴라의 정글에 가깝다')],
 "p24":[(1,'C','speech','삼성전자 한 회사가\n4개 카테고리에 다 있는데'),
        (1,'C','speech','카테고리별로\n신호가 다 다르겠네요!')],
 "p25":[(1,'C','think','한 회사 안에\n네 개의 시계가 따로 돈다'),
        (2,'C','think','이걸 묶어 보면 안 되는 거였어')],
 "p26":[(1,'C','emph','그래서 회사가 아니라, 카테고리 단위로 본다'),
        (2,'C','think','이게 시즌1의 결론이구나')],
 "p27":[(1,'C','label','회사가 아니라 카테고리 단위로 본다'),
        (1,'C','think','드디어 다 연결됐다')],
 "p27b":[(1,'C','speech','마지막으로 목표 얘기야\n우리는 은행 이자보다 나은 10%를\n복리로 쌓는 걸 노려'),
        (1,'C','speech','72를 수익률로 나누면 두 배 되는 시간\n10%면 7년 남짓마다 돈이 두 배가 돼')],
 "p27c":[(1,'C','speech','그리고 이 게임은 혼자 하는 게 아니야\n각자 본 걸 모으고, 기록하고, 검증한다\n의미 없는 논쟁 말고, 관찰을 모으는 거야'),
        (2,'C','speech','그게 우리 투자클럽이\n존재하는 이유다')],
 "p28":[(1,'C','speech','잘했어\n첫 시험, 합격이야'),
        (2,'C','think','1년 전의 나는, 더 이상 없다')],
 "p29":[(1,'C','speech','시즌1은 여기까지\n근데 같은 단계 안에서 누가 진짜 1등일까'),
        (2,'C','speech','영장류 정글과 킹덤 정글\n두 정글이 있어')],
 "p30":[(1,'C','caption','Episode 10 끝 · 시즌 1 완결 · 다음 시즌 · 정글의 서열\n(영장류 vs 킹덤)')],
}

BANDS = {
 "p05":'젠슨황 5단 케이크 (Energy·Chips·Infra·Models·Apps) · 같은 메모리 안에서도 카테고리마다 단계가 다르다',
 "p09":'HBM = AI GPU에 적층되는 고대역폭 메모리, AI 빅테크가 다 산다 → Tornado (SK하이닉스 선두)',
 "p18":'카테고리별 단계 · DRAM=중심가, NAND/SSD=중심가 진입 중, HDD=Declining (카테고리가 죽으면 고릴라도 죽는다)',
 "p26":'회사가 아니라 카테고리 단위로 본다 · 삼성 한 회사도 4개 카테고리 신호가 다 다르다',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성(이미지 미포함), 선별 부여
NOTES = {
 "p03":'해설: AI 산업 5층 구조(에너지→칩→인프라→모델→앱)는 젠슨 황의 "5단 케이크" 비유와 김정호 교수의 AI 가치사슬 버티컬 스택을 결합한 도식이다',
 "p07b":'해설: SWOT(강점·약점·기회·위협)는 기업·카테고리를 감이 아닌 틀로 점검하는 기본 분석 도구다. 단계 판별(TALC)과 함께 쓰면 관찰이 구조화된다',
 "p22":'해설: 표준(commodity) 메모리는 세대 교체마다 1·2·3위가 바뀌는 낮은 전환비용 시장, HBM은 검증·설계 종속으로 전환비용이 높아 선두가 유지되기 쉽다',
 "p23b":'해설: 고릴라 게임(전환비용 큰 정글, 1등 장기 지배) vs 킹덤 게임(전환비용 작은 정글, 왕관이 순환 — 예: 표준 메모리/DRAM). 상세 분류는 시즌 2',
 "p27b":'해설: Rule of 72 — 원금이 두 배 되는 기간 ≈ 72 ÷ 연수익률(%). 연 10%면 약 7.2년, 20년이면 약 4배. 복리는 시간이 만드는 지렛대다',
 "p27c":'해설: 정보수집·분석·원칙 적용·일관성 유지는 혼자 하기 어렵다(1화 참조). 서식지 판별을 돕는 ETF 같은 도구도 등장했지만, 판단의 틀은 클럽의 집단지성이 기른다',
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
    print("generating EP10", pid, g.MODEL, "...")
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
