#!/usr/bin/env python3
# 고릴라 헌터스 Ep2 "기술은 어떻게 퍼지는가" — gpt-image-2 텍스트 채움 완성본 (~30장)
# usage: python3 gen_ep2.py all | rest | p05 p06 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g   # STYLE, CHARS base, MODEL, save_b64 재사용(경로 무관)

BASE = os.path.expanduser("~/Desktop/고릴라헌터스_EP2")
FINAL = os.path.join(BASE, "final")
KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f):
            key = open(f).read().strip()
    if not key:
        sys.exit("API 키 없음: " + KEYF + " 에 키 한 줄 넣어줘")
    return OpenAI(api_key=key)

CHARS = (g.CHARS +
    " EP2 CAMEOS (technology-adoption types, minor recurring): "
    "CHOI SHIN-SANG (early-20s techie/enthusiast, trendy, gadget-covered, excited eyes); "
    "GO BI-JEON (30s visionary, sharp stylish, ambitious confident); "
    "HAN SIL-SOK (40s ordinary pragmatic everyman, cautious-practical); "
    "SHIN JUNG-HAE (50s conservative, careful, traditional neat); "
    "AN MIT-EO (60s grumpy skeptic, holds an old flip phone).")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, separated by thin "
    "white gutters. RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their "
    "balloons/boxes, natural Korean webtoon lettering, perfect spelling and spacing, NO garbled or "
    "invented characters. Place each line in the right panel and speaker. "
    "CRITICAL RULE: draw a speech balloon, thought balloon or narration/caption box ONLY for each "
    "Korean line listed below, exactly that many, NO MORE. EVERY balloon/box MUST contain its "
    "Korean text. Do NOT draw any empty, blank, leftover, extra or decorative balloons anywhere. "
    "Render English/diagram labels (TALC, CHASM, ChatGPT, Galaxy S, %) cleanly when specified.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

# ---- 장면(연출) ----
PAGES = {
 "p01":"A cinematic chapter-title page. A dark study room; on the whiteboard a faint bell-shaped curve (TALC) is sketched, and in one corner a faint sepia silhouette of an Iowa cornfield; a single spotlight hits the whiteboard. Leave a clean dark band across the center for the episode title. Calm, cinematic Korean webtoon chapter cover.",
 "p02":"Two panels, study room continuing from last episode. (1 ~55%) NA BAE-UM leaning forward earnest, asking GU BON-JIL; GU BON-JIL calm with a knowing smile, marker in hand; warm light. (2 ~45% close-up) GU BON-JIL's confident eyes, raising one finger as he begins a story.",
 "p03":"Two panels. (1 ~50%) GU BON-JIL at the whiteboard gesturing widely, beginning to tell a story; NA BAE-UM and a couple of study members listening, intrigued. (2 ~50%) a faint dreamy transition, the room edges dissolving toward a warm sepia memory.",
 "p04":"Two panels, warm SEPIA vintage 1943 American farm flashback. (1 ~60%) a vast Iowa cornfield under a big sky, two farmers in old work clothes holding a hybrid seed-corn sack, talking; a small hand-written label 'Ryan & Gross, 1943' on a wooden post. (2 ~40%) closer, the two farmers, one eager and one doubtful, examining the seed; warm nostalgic light.",
 "p05":"Two panels, sepia farm. (1 ~55%) a montage of several farms across a season; some farmers plant the new hybrid corn early, others watch warily from their fences, others not at all; a sense of an order of adoption. (2 ~45%) on the ground/dirt, a simple hand-drawn S-shaped adoption curve traced with a stick, a few farmer figures dotted along it.",
 "p06":"Two panels, transition from sepia back to present. (1 ~50%) split: left sepia cornfield fading, right a modern smartphone with a glowing AI chat app; an arrow connecting corn to AI, suggesting the same pattern. (2 ~50%) GU BON-JIL in the present study room, warm, explaining that Rogers organized this into a law.",
 "p07":"Two panels. (1 ~60%) GU BON-JIL side view at the clean whiteboard beginning to draw a large smooth BELL-SHAPED curve with a marker; NA BAE-UM copying into his notebook. (2 ~40%) close-up of the marker tracing the bell curve on the white whiteboard.",
 "p08":"One large panel (~100%). The finished bell-shaped TALC curve on the whiteboard, divided into FIVE colored segments left to right with clean English/Korean labels: 기술애호가 2.5% (purple), 선각자 13.5% (blue), then a RED dashed vertical line labeled CHASM, 실용주의자 34% (green), 보수주의자 34% (orange), 회의론자 16% (gray); GU BON-JIL standing beside pointing, NA BAE-UM noting. Clean infographic, bright whiteboard.",
 "p09":"Two panels. (1 ~55%) the bell curve with the FIRST segment glowing; beside it CHOI SHIN-SANG (early-20s techie) excitedly holding up a phone with a brand-new AI app, gadgets all over him. (2 ~45% close-up) CHOI SHIN-SANG's thrilled face.",
 "p10":"Two panels. (1 ~55%) the curve's second segment glowing; GO BI-JEON (30s visionary, sharp stylish) gesturing toward the horizon with bold conviction, a forward-looking pose. (2 ~45%) GO BI-JEON confident close-up.",
 "p11":"One dramatic panel (~100%). On the bell curve a deep RED jagged CHASM crack opens between the visionary (blue) side and the pragmatist (green) side, a literal canyon splitting the chart; GO BI-JEON on one edge, HAN SIL-SOK hesitating on the far edge; tense dramatic lighting. A bold 'CHASM' label.",
 "p12":"Two panels. (1 ~55%) the curve's middle (largest) segment glowing; HAN SIL-SOK (40s ordinary pragmatist) arms crossed, cautious, glancing sideways to see what coworkers do. (2 ~45%) HAN SIL-SOK's careful everyman face.",
 "p13":"Two panels. (1 ~50%) the curve's fourth segment; SHIN JUNG-HAE (50s conservative, neat traditional) waiting with patient skepticism. (2 ~50%) the curve's last segment; AN MIT-EO (60s grumpy skeptic) holding up an old FLIP PHONE dismissively.",
 "p14":"One wide panel (~100%). The full bell curve with ALL FIVE cameo characters standing at their positions along it (CHOI SHIN-SANG, GO BI-JEON, then the chasm, HAN SIL-SOK, SHIN JUNG-HAE, AN MIT-EO); GU BON-JIL presenting the whole picture, NA BAE-UM impressed; clean colorful infographic with characters.",
 "p15":"Two panels. (1 ~55%) NA BAE-UM looking up from his notes, raising a question, a bit puzzled. (2 ~45%) GU BON-JIL smiling, holding up two fingers, about to give two conditions.",
 "p16":"Two panels, condition ONE. (1 ~55%) a bright glowing ChatGPT-style AI chat screen appears like the birth of a new category, arrows merging '대화·문서·코드' into one; GU BON-JIL gesturing to it. (2 ~45%) NA BAE-UM leaning in, intrigued.",
 "p17":"One split panel + small strip. LEFT a glowing new-category AI chat screen labeled 불연속 Discontinuous; RIGHT a row of five near-identical Galaxy-S-style phones (S21 to S25) with only the camera lens slightly bigger each year, labeled 연속 Continuous; a clear visual contrast. Bottom strip for a caption.",
 "p18":"Two panels. (1 ~55%) GU BON-JIL at the whiteboard explaining, pointing between the two sides, serious; NA BAE-UM nodding. (2 ~45%) NA BAE-UM's dawning understanding close-up.",
 "p19":"Two panels, condition TWO. (1 ~55%) a tired office worker buried under a mountain of documents and code, working late, despairing; an AI copilot/chatbot screen appears beside like a rescuing light, a clock showing the work time halving. (2 ~45%) the worker's relieved face as the AI helps.",
 "p20":"One panel (~100%). A flashy but hollow product launch event: a presenter on a bright stage showing a shiny new gadget, the small audience clapping awkwardly with unconvinced, head-tilted expressions; a sense of 'why would I buy this'. ",
 "p21":"Two panels. (1 ~55%) GU BON-JIL firm and clear, contrasting the two: real pain solved vs no real pain; NA BAE-UM absorbing it. (2 ~45%) GU BON-JIL's emphatic look, finger raised.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM thoughtfully connecting the dots, a small realization forming. (2 ~45%) close-up, his eyes narrowing as he thinks of his own past purchases.",
 "p23":"Two panels. (1 ~50%) NA BAE-UM pulling out his smartphone showing his own halved (red) AI-stock chart, a little ashamed; warm low light. (2 ~50%) close on the phone screen, the red declining chart.",
 "p24":"One panel (~100%). NA BAE-UM's open notebook close-up with a two-line checklist hand-written, each with an X mark: a line for '불연속 Discontinuous?' marked ✗, a line for 'Compelling Reason?' marked ✗; his pen resting; a small gorilla doodle in the corner.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM looking up from the checklist with a wry self-aware half-smile, the penny dropping; GU BON-JIL nodding warmly in the soft background. (2 ~45%) NA BAE-UM close-up, rueful but a little wiser.",
 "p26":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone for a moment, exhaling, looking at the halved chart, contemplative, lots of negative space. (2 ~40%) extreme close-up of his resolved eyes, a new understanding settling in.",
 "p27":"Two panels, tone darkening. (1 ~55%) the study room lights dim; GU BON-JIL turns serious, pointing a finger up into the air as if naming something. (2 ~45%) NA BAE-UM looking up, curious and a little uneasy.",
 "p28":"One dramatic panel (~100%). A huge word 'CHASM 캐즘' rises in the dark as a cracked, splitting canyon/valley; a small electric car (BEV) silhouette dangles at the canyon's edge about to fall in; ominous dramatic lighting; GU BON-JIL's silhouette gesturing toward it.",
 "p29":"Two panels. (1 ~55%) GU BON-JIL in dramatic low light delivering the cliffhanger about the chasm and the electric car; NA BAE-UM listening intently. (2 ~45%) the electric car teetering at the chasm edge, a tense final image.",
 "p30":"One panel (~100%). A closing chapter-end composition: the dark chasm with the EV at its edge, NA BAE-UM and GU BON-JIL small silhouettes looking toward it; reserve a black caption band across the very bottom for the next-episode preview. Cinematic Korean webtoon episode-end.",
}

# ---- 대사 (panel, hint, role, text) ----
DLG = {
 "p01":[(1,'C','title','EPISODE 02\n기술은 어떻게 퍼지는가\n아이오와 옥수수밭에서 시작된 기술수용주기\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','고릴라가 표준 잡은 1등인 건 알겠는데\n그게 대체 어떻게 1등이 되는 거예요?'),
        (2,'C','speech','좋은 질문이야\n기술이 퍼지는 데엔 정해진 순서가 있거든')],
 "p03":[(1,'C','speech','그 순서를 처음 밝힌 게\n놀랍게도 80년 전 옥수수밭이었어'),
        (2,'C','narr','1943년, 미국 아이오와')],
 "p04":[(1,'C','narr','잡종 옥수수라는 신품종이\n농부들 사이에 퍼지고 있었다'),
        (2,'L','speech','이거 진짜 수확이 두 배라던데?'),
        (2,'R','speech','글쎄, 남들 먼저 해보고 나면…')],
 "p05":[(1,'C','narr','누구는 첫 해에 바로 심었고\n누구는 몇 년을 지켜봤다'),
        (2,'C','narr','그 받아들이는 순서가\n매끈한 S자 곡선을 그렸다')],
 "p06":[(1,'C','emph','옥수수든 AI든, 퍼지는 순서는 똑같다'),
        (2,'C','speech','이걸 Rogers가 법칙으로 정리했어\n기술수용주기, TALC')],
 "p07":[(1,'C','speech','사람들을 받아들이는 속도에 따라\n다섯 부류로 나눠 보자'),
        (2,'C','think','종 모양 곡선이네…')],
 "p08":[(1,'C','label','기술애호가 2.5%'),
        (1,'C','label','선각자 13.5%'),
        (1,'C','label','캐즘'),
        (1,'C','label','실용주의자 34%'),
        (1,'C','label','보수주의자 34%'),
        (1,'C','label','회의론자 16%')],
 "p09":[(1,'L','caption','기술애호가 · 최신상'),
        (1,'C','speech','새 AI 모델?\n첫 주에 바로 깔았지!')],
 "p10":[(1,'L','caption','선각자 · 고비전'),
        (1,'C','speech','이게 미래야\n남들보다 먼저 잡아야지')],
 "p11":[(1,'C','emph','캐즘 (CHASM)'),
        (1,'C','narr','선각자와 실용주의자 사이,\n가장 깊은 균열')],
 "p12":[(1,'L','caption','실용주의자 · 한실속'),
        (1,'C','speech','동료가 잘 쓰는 거 보면\n그때 가서 나도')],
 "p13":[(1,'L','caption','보수주의자 · 신중해'),
        (1,'L','speech','남들 다 쓰면 그때 사지'),
        (2,'R','caption','회의론자 · 안믿어'),
        (2,'R','speech','난 폴더폰이 더 좋은데')],
 "p14":[(1,'C','speech','한 기술이 이 골짜기를 건너\n오른쪽 대중까지 가면\n그게 표준, 고릴라가 되는 거야'),
        (1,'C','think','퍼지는 순서가\n옥수수든 AI든 똑같구나')],
 "p15":[(1,'C','speech','근데 이게 투자랑\n무슨 상관이에요?'),
        (2,'C','speech','정글 게임이 작동하려면\n조건이 딱 둘 있어')],
 "p16":[(1,'C','speech','첫째, 이 기술이\n‘불연속’이어야 해'),
        (2,'C','think','불연속…?')],
 "p17":[(1,'L','label','불연속 Discontinuous\n새 카테고리'),
        (1,'R','label','연속 Continuous\n매년 카메라만 좋아짐')],
 "p18":[(1,'C','speech','연속 개선만 있는 시장은\n1등 격차가 안 벌어져'),
        (2,'C','think','갤럭시는 매년 비슷했지…')],
 "p19":[(1,'C','speech','둘째, 살 수밖에 없는\n진짜 고통을 풀어줘야 해'),
        (2,'L','label','compelling reason\n진짜 pain 해결')],
 "p20":[(1,'C','label','고통 없음\n= 캐즘에서 죽음'),
        (1,'C','speech','와… 근데 이걸\n왜 사야 하지?')],
 "p21":[(1,'C','emph','불연속 + 진짜 고통 해결\n둘 다 있어야 고릴라 후보'),
        (2,'C','speech','하나라도 없으면\n캐즘에서 죽어')],
 "p22":[(1,'C','think','잠깐, 그럼 내가 샀던 그건…'),
        (2,'C','think','둘 다 없었잖아')],
 "p23":[(1,'C','narr','반토막 난 내 AI 종목을\n다시 꺼내 봤다'),
        (2,'C','think','연속 개선이고,\n진짜 고통도 안 풀어주고…')],
 "p24":[(1,'C','label','불연속 Discontinuous? ✗'),
        (1,'C','label','Compelling Reason? ✗')],
 "p25":[(1,'C','speech','내가 산 건\n고릴라가 될 수 없는 거였네요'),
        (2,'C','narr','이제야 이유를 알겠다')],
 "p26":[(1,'C','think','결과가 아니라 구조,\n그리고 퍼지는 법칙')],
 "p27":[(1,'C','speech','근데 말이야\n멋있는데도 죽는 기술이 있어'),
        (2,'C','think','죽는다고…?')],
 "p28":[(1,'C','emph','죽음의 계곡, 캐즘 (CHASM)')],
 "p29":[(1,'C','speech','다음 시간엔,\n왜 멋있는 기술도 죽는지\n바로 그 캐즘 이야기야'),
        (2,'C','narr','마침 지금, 전기차가\n그 골짜기에 빠져 있어')],
 "p30":[(1,'C','caption','Episode 2 끝 · 다음 화 · 죽음의 계곡, 캐즘\n(전기차가 그 증거)')],
}

# ---- 설명 캡션 띠 (개념 장) ----
BANDS = {
 "p06":'기술수용주기(TALC) · 모든 신기술은 정해진 순서로 퍼진다, 옥수수든 AI든',
 "p08":'사람은 받아들이는 속도에 따라 5부류 · 선각자와 실용주의자 사이의 깊은 골이 ‘캐즘’',
 "p11":'캐즘 · 소수 선각자에서 다수 대중으로 넘어가는 가장 어려운 구간, 여기서 대부분 죽는다',
 "p17":'불연속 = 판을 새로 까는 기술(ChatGPT) · 연속 = 매년 조금씩 개선(갤럭시 S)',
 "p21":'고릴라 후보의 2조건 · ① 불연속(새 카테고리) ② Compelling Reason(살 수밖에 없는 진짜 고통 해결)',
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
    print("generating EP2", pid, g.MODEL, "...")
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
