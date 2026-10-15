#!/usr/bin/env python3
# 고릴라 헌터스 — PDF 조립기: 페이지 PNG + 선별 해설 밴드(이원복식, 후처리 합성) → 완성본 PDF
# usage: python3 assemble.py ep1            # gen_ep1.py의 NOTES·FINAL 사용
#        python3 assemble.py ep1 out.pdf
#        python3 assemble.py ep21 out.pdf --numbered   # 상단 중앙 빨간 쪽번호 합성(회장님 코멘트용, API 비용 0)
# 각 gen_epN.py의 STAGE(학습 지도 단계)가 있으면 표지를 제외한 전 페이지 상단에 얇은 띠+배지로 합성됨
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

def stage_strip(img, text):
    """학습 지도 단계 띠: 페이지 위에 얇은 띠를 덧붙이고 우측에 머스타드 배지 (F3-1, 후처리 합성, 그림과 겹치지 않음)"""
    size = 22; font = load_font(size)
    pad_x, pad_y, margin, strip_h = 16, 6, 18, 48
    strip = Image.new("RGB", (img.width, strip_h), "#f6f2ea")
    d = ImageDraw.Draw(strip, "RGBA")
    d.rectangle([0, strip_h - 3, img.width, strip_h], fill="#c8bfae")
    tw = d.textlength(text, font=font)
    w, h = int(tw + pad_x * 2), size + pad_y * 2
    x0, y0 = img.width - margin - w, (strip_h - 3 - h) // 2
    d.rounded_rectangle([x0, y0, x0 + w, y0 + h], radius=h // 2, fill=(232, 181, 58, 255), outline=(58, 54, 48, 255), width=2)
    d.text((x0 + pad_x, y0 + pad_y - 3), text, font=font, fill=(58, 54, 48, 255))
    merged = Image.new("RGB", (img.width, img.height + strip_h), "#ffffff")
    merged.paste(strip, (0, 0)); merged.paste(img, (0, strip_h))
    return merged

def page_number(img, n):
    """쪽번호 합성: 상단 중앙에 큰 빨간 숫자(회장님 코멘트용, 수작업 버전과 같은 양식). 흰 테두리로 그림 위에서도 판독되게"""
    size = 72; font = load_font(size)
    d = ImageDraw.Draw(img)
    text = str(n)
    tw = d.textlength(text, font=font)
    x, y = (img.width - tw) / 2, 2
    for dx in (-3, 0, 3):
        for dy in (-3, 0, 3):
            if dx or dy: d.text((x + dx, y + dy), text, font=font, fill="#ffffff")
    d.text((x, y), text, font=font, fill="#e0202a")
    return img

def main():
    args = [x for x in sys.argv[1:] if x != "--numbered"]
    numbered = "--numbered" in sys.argv
    ep = args[0] if args else "ep1"
    mod = importlib.import_module(f"gen_{ep}")
    final = mod.FINAL
    notes = getattr(mod, "NOTES", {})
    stage = getattr(mod, "STAGE", None)
    out = args[1] if len(args) > 1 else os.path.join(final, f"고릴라헌터스_{ep.upper()}_완성본.pdf")
    pids = sorted(p[:-4] for p in os.listdir(final) if p.endswith(".png"))
    pages = []
    for n, pid in enumerate(pids, 1):
        img = Image.open(os.path.join(final, pid + ".png")).convert("RGB")
        if stage and pid != pids[0]:  # 표지 제외
            img = stage_strip(img, "학습 지도 " + stage)
        if numbered: img = page_number(img, n)
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
