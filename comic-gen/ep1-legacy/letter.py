#!/usr/bin/env python3
# 웹툰 식자 도구: 빈 말풍선/내레이션/효과음 자리에 한국어 텍스트를 얹는다.
# usage: python3 letter.py <raw.png> <out.png> <config.json>
import sys, json
from PIL import Image, ImageDraw, ImageFont

FONTS = {
    "B":  "/Users/minseokkim/Library/Fonts/NanumSquareOTF_acB.otf",   # 본문(볼드)
    "EB": "/Users/minseokkim/Library/Fonts/NanumSquareOTF_acEB.otf",  # 강조/효과음
    "R":  "/Users/minseokkim/Library/Fonts/NanumSquareOTF_acR.otf",   # 가벼운 본문
    "L":  "/Users/minseokkim/Library/Fonts/NanumSquareOTF_acL.otf",
    "HG": "/Users/minseokkim/Library/Fonts/NanumBarunGothicBold.ttf",
}

def load_font(key, size):
    return ImageFont.truetype(FONTS.get(key, FONTS["B"]), size)

def wrap(draw, text, font, max_w):
    """공백 우선 줄바꿈, 한 단어가 너무 길면 글자 단위로 분해. \n은 강제 개행."""
    out_lines = []
    for para in text.split("\n"):
        if para == "":
            out_lines.append("")
            continue
        words = para.split(" ")
        cur = ""
        for w in words:
            trial = w if cur == "" else cur + " " + w
            if draw.textlength(trial, font=font) <= max_w:
                cur = trial
            else:
                if cur:
                    out_lines.append(cur)
                # 단어 자체가 길면 글자 단위
                if draw.textlength(w, font=font) <= max_w:
                    cur = w
                else:
                    piece = ""
                    for ch in w:
                        if draw.textlength(piece + ch, font=font) <= max_w:
                            piece += ch
                        else:
                            out_lines.append(piece); piece = ch
                    cur = piece
        out_lines.append(cur)
    return out_lines

def draw_item(img, draw, it):
    size = it.get("size", 30)
    font = load_font(it.get("font", "B"), size)
    max_w = it.get("w", 200)
    lh = it.get("lh", 1.18)
    color = it.get("color", "#141414")
    align = it.get("align", "center")
    rot = it.get("rot", 0)
    stroke = it.get("stroke", 0)
    stroke_fill = it.get("stroke_fill", "#ffffff")
    lines = wrap(draw, it["text"], font, max_w)
    asc, desc = font.getmetrics()
    line_h = int((asc + desc) * lh)
    block_h = line_h * len(lines)
    block_w = max(draw.textlength(l, font=font) for l in lines) if lines else 0

    if rot:
        # 회전 텍스트는 별도 레이어에 그려 합성
        pad = stroke * 2 + 6
        layer = Image.new("RGBA", (int(block_w) + pad * 2, block_h + pad * 2), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        y = pad
        for l in lines:
            lw = ld.textlength(l, font=font)
            x = pad + (block_w - lw) / 2 if align == "center" else pad
            ld.text((x, y), l, font=font, fill=color, stroke_width=stroke, stroke_fill=stroke_fill)
            y += line_h
        layer = layer.rotate(rot, expand=True, resample=Image.BICUBIC)
        cx, cy = it["cx"], it["cy"]
        img.paste(layer, (int(cx - layer.width / 2), int(cy - layer.height / 2)), layer)
        return

    cx, cy = it["cx"], it["cy"]
    y = cy - block_h / 2
    for l in lines:
        lw = draw.textlength(l, font=font)
        if align == "center":
            x = cx - lw / 2
        elif align == "left":
            x = cx - block_w / 2
        else:
            x = cx - lw + block_w / 2
        draw.text((x, y), l, font=font, fill=color, stroke_width=stroke, stroke_fill=stroke_fill)
        y += line_h

def main():
    raw, out, cfg = sys.argv[1], sys.argv[2], sys.argv[3]
    with open(cfg, encoding="utf-8") as f:
        items = json.load(f)
    img = Image.open(raw).convert("RGBA")
    draw = ImageDraw.Draw(img)
    for it in items:
        draw_item(img, draw, it)
    img.convert("RGB").save(out, quality=95)
    print("saved", out, img.size)

if __name__ == "__main__":
    main()
