#!/usr/bin/env python3
# 고릴라 헌터스 — 시즌 2 공용 콘티 엔진 (gen_ep11~20.py가 import)
# 회차 파일은 PAGES / DLG / BANDS / NOTES / STAGE / EXTRA_CHARS / SPEAKERS_EXTRA 만 정의하고
#   from ep_common import run; run(__name__)  또는  if __name__=="__main__": run(globals())
# usage (회차 파일에서): python3 gen_ep11.py all | rest | p05 p05b ...
import os, sys, re, time
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
KEYF = os.path.join(BASE, "openai_key.txt")

# ---------- 시즌 2 공용 캐릭터(시즌 1 Bible + TALC 5인 + 일관성 룰) ----------
CHARS_S2 = (g.CHARS +
    " CRITICAL CONSISTENCY: NA BAE-UM is EXACTLY 39 years old, a MAN, and must look late-30s on EVERY "
    "page (never a woman, never a 20s youth, never a 50s man). STUDY GROUP ROOM: one whiteboard, long "
    "table, bookshelves; NO trading desks, NO multi-monitor setups, NO wall posters. "
    "RECURRING TALC FIVE (keep identical): "
    "CHOI SIN-SANG 'tech enthusiast' (20s male, headphones around neck, gadget vest, bright curious); "
    "GO BI-JEON 'visionary' (40s male, sharp navy suit, confident gaze, tablet under arm); "
    "HAN SIL-SOK 'pragmatist' (40s male, neat shirt and knit vest, thin metal glasses, calm careful); "
    "SHIN JUNG-HAE 'conservative' (50s female, warm brown cardigan, reserved kind face); "
    "AN MID-EO 'skeptic' (50s male, stern brow, old flip phone always in hand).")

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, thin white gutters. "
    "RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their balloons/boxes, natural "
    "Korean webtoon lettering, perfect spelling and spacing, NO garbled or invented characters. "
    "Letter each line WITHOUT any surrounding quotation marks or apostrophes. "
    "CRITICAL RULE: draw a speech/thought balloon or narration/caption box ONLY for each Korean line "
    "listed below, exactly that many, NO MORE; EVERY balloon/box MUST contain its Korean text; do NOT "
    "draw any empty, blank, leftover, extra or decorative balloons anywhere. "
    "SPEAKER RULE: each balloon's tail must point at the character named for that line; a thought "
    "balloon belongs ONLY to the character named. "
    "BACKGROUND TEXT RULE: NO readable text anywhere except the lines and diagram labels explicitly "
    "specified below. If the content of a whiteboard, notebook, phone screen, book, sign or any prop "
    "is NOT explicitly specified, it must be completely BLANK: no writing, no diagrams, no charts, no "
    "logos, no brand names. Never invent labels, tickers, flowcharts, dates, names or lists that are not specified. "
    "SCREEN RULE: every background laptop/tablet/phone in any scene is switched OFF with a plain dark screen unless its content is explicitly specified; NEVER draw any stock chart, graph, arrow or text on any screen unless specified. NEVER print any text, sound-effect or logo on clothing. "
    "LOGO RULE: NO real company logos, app icons or brand marks anywhere (no green chat-app knot, no fruit, no search-engine letters); chat and app interfaces are generic gray-and-white. "
    "NO tombstones, memorial portraits, or dates unless explicitly specified. "
    "FLASHBACK RULE: period/flashback/storybook scenes contain ONLY period-appropriate anonymous people and props; never the modern cast, smartphones or modern clothing. "
    "DIAGRAM RULE: when a page specifies diagram labels, render exactly those labels cleanly, every one of them fully visible; the presenter stands to the side so that NO hand, marker or body covers any label; nothing else is written on the board.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

SPEAKERS = {'한탕수':'HAN TANG-SU (red cap)', '나배움':'NA BAE-UM', '주본질':'JU BON-JIL (mentor)',
 '최신상':'CHOI SIN-SANG (tech enthusiast, headphones)', '고비전':'GO BI-JEON (visionary, navy suit)',
 '한실속':'HAN SIL-SOK (pragmatist, knit vest, glasses)', '신중해':'SHIN JUNG-HAE (conservative, cardigan)',
 '안믿어':'AN MID-EO (skeptic, flip phone)', '오라클':'the old bearded oracle in the storybook inset',
 '맥스':'the bearded inventor Max in the storybook inset'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

def client():
    from openai import OpenAI
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

def instruction(mod, pid):
    speakers = dict(SPEAKERS); speakers.update(getattr(mod, "SPEAKERS_EXTRA", {}))
    parts=[]
    for panel,hint,role,text in mod.DLG[pid]:
        spk=""
        for name,desc in speakers.items():
            if text.startswith(name+": "):
                text=text[len(name)+2:]; spk=f", spoken by {desc}, balloon tail pointing at that character, do NOT letter the speaker's name"
                break
        # 2026-09-14: 따옴표 오식자(짧은 말풍선·캡션)가 반복돼 모든 역할을 따옴표 없는 원문 제시로 통일
        parts.append(f"(panel {panel}{spk}) in {DESC.get(role,'a balloon')}, whose exact text (lettered with NO quotation marks or apostrophes of any kind around it) is: {text.replace(chr(10),' ')}")
    bands = getattr(mod, "BANDS", {})
    if pid in bands:
        parts.append("at the very bottom, a parchment caption band whose exact text (no quotation marks) is: "+bands[pid].replace(chr(10),' '))
    return "KOREAN LINES TO LETTER (render each cleanly inside its balloon/box):\n"+"\n".join(parts)

def build_prompt(mod, pid):
    chars = CHARS_S2 + " " + getattr(mod, "EXTRA_CHARS", "")
    return f"{RULES_TEXT}\n\nPAGE CONTENT: {clean_spec(mod.PAGES[pid])}\n\n{instruction(mod, pid)}\n\n{chars}\n\nSTYLE: {g.STYLE}"

def gen(c, mod, pid):
    prompt = build_prompt(mod, pid)
    print("generating", mod.EP, pid, g.MODEL, "...")
    r=c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(mod.FINAL, pid+".png"))

class _Mod:  # globals() dict를 모듈처럼 다루기 위한 래퍼
    def __init__(self, d): self.__dict__.update(d)

def run(ns):
    mod = _Mod(ns) if isinstance(ns, dict) else ns
    os.makedirs(mod.FINAL, exist_ok=True)
    args=sys.argv[1:] or ["all"]
    allids=sorted(mod.PAGES.keys())
    if args==["all"]: ids=allids
    elif args==["rest"]: ids=[p for p in allids if not os.path.exists(os.path.join(mod.FINAL,p+".png"))]
    elif args==["prompt"]:  # API 호출 없이 프롬프트만 출력(검토용)
        for p in allids: print("="*20, p); print(build_prompt(mod, p)); print()
        return
    else: ids=args
    c=client()
    for pid in ids:
        try: gen(c, mod, pid); time.sleep(1)
        except Exception as e: print("ERROR",pid,e)
