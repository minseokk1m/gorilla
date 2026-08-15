#!/usr/bin/env python3
# 텍스트 채움 테스트: gpt-image-2가 말풍선에 한글까지 깨끗이 넣는지 확인
import sys, os
import gen_images as g

RULES_TEXT = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, separated by thin "
    "white gutters. Draw speech balloons and narration boxes, and RENDER THE KOREAN TEXT below "
    "cleanly and CORRECTLY INSIDE the matching balloons/boxes, with natural Korean webtoon "
    "lettering, perfect spelling, no garbled or invented characters. Match each line to the right "
    "speaker/box as described. Korean text must be crisp and legible."
)

TEXTS = {
 "p05":"KOREAN TEXT TO LETTER: small caption near the value friend: ‘가치파 친구 · 싸게 사서 기다린다’. "
       "Value friend speech balloon (panel 1): ‘주식은 말이야, PER 낮은 걸 싸게 사서 기다리는 거야’. "
       "Value friend speech balloon (panel 2 close-up): ‘지금 AI주 중에 저평가된 거, 그거 사’.",
 "p18":"KOREAN TEXT TO LETTER: GU BON-JIL speech balloon (panel 1): ‘자네가 본 건 전부 결과야, PER·매출·주가’. "
       "GU BON-JIL speech balloon (panel 2): ‘우린 구조를 봐. 왜 이 회사가 구조적으로 안 무너지는가’. "
       "NA BAE-UM thought balloon (panel 3): ‘결과가 아니라… 구조?’.",
}

def gen(pid):
    c = g.client()
    spec = g.PAGES[pid]
    prompt = f"{RULES_TEXT}\n\nPAGE CONTENT: {spec}\n\n{TEXTS[pid]}\n\n{g.CHARS}\n\nSTYLE: {g.STYLE}"
    print("generating", pid, "with text, model", g.MODEL, "...")
    r = c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    out = os.path.join("/tmp", pid+"_txt.png")
    g.save_b64(r.data[0].b64_json, out)

for pid in sys.argv[1:] or ["p05","p18"]:
    try: gen(pid)
    except Exception as e: print("ERROR", pid, e)
