#!/usr/bin/env python3
# 최종본: gpt-image-2가 말풍선·박스에 한글 대사까지 채운 완성 만화 (한 방에)
# usage: python3 gen_final.py all  /  python3 gen_final.py p05 p18
import os, sys
import gen_images as g
import build_v3 as b   # DLG, BANDS 재사용 (import 시 pptx 한번 빌드되지만 무해)

FINAL = os.path.join(g.BASE, "final")
os.makedirs(FINAL, exist_ok=True)

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, separated by thin "
    "white gutters. RENDER THE KOREAN LINES listed below cleanly and CORRECTLY inside their "
    "balloons/boxes, with natural Korean webtoon lettering, perfect spelling and spacing, NO "
    "garbled or invented characters. Place each line in the right panel and speaker. "
    "CRITICAL RULE: draw a speech balloon, thought balloon or narration/caption box ONLY for each "
    "Korean line listed below — exactly that many, NO MORE. EVERY balloon and box in the image MUST "
    "contain its Korean text. Do NOT draw any empty, blank, leftover, extra or decorative balloons "
    "or boxes anywhere on the page. Size each balloon to comfortably fit its text."
)

def clean_spec(spec):
    # 빈 말풍선 지시 제거 (텍스트 채움 모드)
    import re
    s = spec
    s = re.sub(r',?\s*(an?|one|two|three|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', s, flags=re.I)
    s = re.sub(r'\bempty\b', '', s, flags=re.I)
    s = re.sub(r'\s{2,}', ' ', s)
    return s

DESC = {
 'title':'the big title text in the dark title area', 'subtitle':'the subtitle',
 'narr':'a narration box', 'speech':'a speech balloon', 'think':'a thought (cloud) balloon',
 'caption':'a small caption tab', 'sfx':'a bold hand-drawn sound-effect',
 'emph':'a bold mustard-yellow emphasis caption', 'label':'a label box',
}

def instruction(pid):
    parts = []
    for panel,hint,role,text in b.DLG[pid]:
        t = text.replace("\n", " ")
        parts.append(f"(panel {panel}) in {DESC.get(role,'a balloon')}: ‘{t}’")
    band = b.BANDS.get(pid)
    if band:
        parts.append("at the very bottom, a parchment caption band reading: ‘"
                     + band.replace("\n"," ") + "’")
    return "KOREAN LINES TO LETTER (render each cleanly inside its balloon/box):\n" + "\n".join(parts)

def gen(c, pid):
    spec = clean_spec(g.PAGES[pid])
    prompt = f"{RULES_TEXT}\n\nPAGE CONTENT: {spec}\n\n{instruction(pid)}\n\n{g.CHARS}\n\nSTYLE: {g.STYLE}"
    print("generating FINAL", pid, "model", g.MODEL, "...")
    r = c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(FINAL, pid+".png"))

def main():
    args = sys.argv[1:] or ["all"]
    allids = [f"p{i:02d}" for i in range(1,36)]
    if args == ["all"]:
        ids = allids
    elif args == ["rest"]:   # final/에 아직 없는 것만
        ids = [p for p in allids if not os.path.exists(os.path.join(FINAL, p+".png"))]
    else:
        ids = args
    c = g.client()
    import time
    for pid in ids:
        try: gen(c, pid); time.sleep(1)
        except Exception as e: print("ERROR", pid, e)

if __name__ == "__main__":
    main()
