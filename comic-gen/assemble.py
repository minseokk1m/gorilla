#!/usr/bin/env python3
# 고릴라 헌터스 — PDF 조립기: 페이지 PNG + 선별 해설 밴드(이원복식, 후처리 합성) → 완성본 PDF
# usage: python3 assemble.py ep1            # gen_ep1.py의 NOTES·FINAL 사용
#        python3 assemble.py ep1 out.pdf
import os, sys, importlib, textwrap
from PIL import Image, ImageDraw, ImageFont

FONT_PATHS = [
    "/System/Library/Fonts/AppleSDGothicNeo.ttc",
    "/Library/Fonts/AppleGothic.ttf",
]

def load_font(size):
    for p in FONT_PATHS:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, size=size, index=0)
            except Exception: pass
    return ImageFont.load_default()

def note_band(width, text):
    """해설 밴드 이미지 생성: 연베이지 배경 + 다크 텍스트 + 상단 헤어라인"""
    margin, size, leading = 42, 26, 12
    font = load_font(size)
    probe = Image.new("RGB", (10, 10)); pd = ImageDraw.Draw(probe)
    # 글자폭 기준 줄바꿈 (한글 위주라 폭 근사)
    max_w = width - margin * 2
    lines = []
    for para in text.split("\n"):
        line = ""
        for ch in para:
            if pd.textlength(line + ch, font=font) <= max_w: line += ch
            else: lines.append(line.rstrip()); line = ch.lstrip()
        lines.append(line.rstrip())
    h = margin + len(lines) * (size + leading) + margin - leading
    band = Image.new("RGB", (width, h), "#f6f2ea")
    d = ImageDraw.Draw(band)
    d.rectangle([0, 0, width, 3], fill="#c8bfae")
    y = margin
    for ln in lines:
        d.text((margin, y), ln, font=font, fill="#3a3630")
        y += size + leading
    return band

def main():
    ep = sys.argv[1] if len(sys.argv) > 1 else "ep1"
    mod = importlib.import_module(f"gen_{ep}")
    final = mod.FINAL
    notes = getattr(mod, "NOTES", {})
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(final, f"고릴라헌터스_{ep.upper()}_완성본.pdf")
    pids = sorted(p[:-4] for p in os.listdir(final) if p.endswith(".png"))
    pages = []
    for pid in pids:
        img = Image.open(os.path.join(final, pid + ".png")).convert("RGB")
        if pid in notes:
            band = note_band(img.width, notes[pid])
            merged = Image.new("RGB", (img.width, img.height + band.height), "#ffffff")
            merged.paste(img, (0, 0)); merged.paste(band, (0, img.height))
            img = merged
        pages.append(img)
    if not pages: sys.exit("PNG 없음: " + final)
    pages[0].save(out, save_all=True, append_images=pages[1:], resolution=144.0)
    print(f"assembled {len(pages)}p (해설 {sum(1 for p in pids if p in notes)}곳) -> {out}")

if __name__ == "__main__": main()
