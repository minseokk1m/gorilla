#!/usr/bin/env python3
# 고릴라 헌터스 Ep1 작화 자동 생성 (OpenAI gpt-image-1) — 고급 프롬프트판
# usage:
#   python3 gen_images.py smoke   # 캐릭터시트 + P1 (테스트)
#   python3 gen_images.py sheet   # 캐릭터 시트만
#   python3 gen_images.py p07     # 특정 페이지만
#   python3 gen_images.py all     # 캐릭터시트(없으면) + P1~P35 전부
# (USEREF=1 환경변수를 주면 캐릭터시트를 레퍼런스로 사용. 기본은 미사용=더 풍부)
import os, sys, base64, time
from openai import OpenAI

MODEL = os.environ.get("IMG_MODEL", "gpt-image-2")  # gpt-image-2 / chatgpt-image-latest / gpt-image-1
BASE = os.path.expanduser("~/Desktop/고릴라헌터스_Ep1_식자")
OUT  = os.path.join(BASE, "raw_v3")
SHEET = os.path.join(OUT, "char_sheet.png")
KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(OUT, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    if not key and os.path.exists(KEYF):
        key = open(KEYF).read().strip()
    if not key:
        sys.exit("API 키 없음: openai_key.txt 에 키를 넣거나 OPENAI_API_KEY 설정")
    return OpenAI(api_key=key)

STYLE = (
    "A FULLY COLORED, highly detailed Korean webtoon page (NOT a black-and-white or sepia ink "
    "drawing). Confident crisp inked linework with varied line weight and fine hatching used as "
    "ACCENTS for shadows and fabric texture, combined with clean professional COLORING in natural, "
    "clearly readable LOCAL colors. "
    "CRITICAL COLOR: every object keeps its own true local color with NO global sepia / amber / "
    "brown tint over the image. A navy knit is saturated NAVY BLUE, a mustard hoodie is golden "
    "mustard, a red cap is RED, denim is blue, skin is natural warm, whiteboards / paper / walls "
    "are clean neutral white-gray. A restrained earthy but distinctly COLORFUL palette in bright "
    "natural daylight. "
    "Detailed, grounded, mature realism with dense expressive linework in the manner of 윤태호 "
    "Misaeng and 광진 Itaewon Class premium Korean webtoons; expressive realistic Korean faces, "
    "modest eyes, honest subtle expressions (mild exaggeration only for comedy). Sharp, crisp, "
    "intricately drawn and richly detailed. "
    "AVOID: sepia or amber wash, monochrome, aged-paper or vintage tone, one uniform brown or "
    "olive tone, any global color filter over the whole image, flat smooth vector cel-shading "
    "without linework, coloring-book look, 3D/CGI, glossy 3D render, plastic skin, rim light, big "
    "anime eyes, perfect symmetry, oversaturation, card-news grid, watermark, any garbled text."
)
CHARS = (
    "CHARACTERS (keep identical every page): "
    "JU BON-JIL (mentor) late-40s, fit, neat salt-and-pepper short hair, thin metal-rim glasses, "
    "calm sharp eyes with a warm slight smile, deep teal/navy crew-neck knit over a light collared "
    "shirt with rolled sleeves, beige chinos, a wristwatch, holds a marker. "
    "NA BAE-UM (protagonist) late-30s ordinary office worker, average build, short neat black hair, "
    "no glasses, gentle rounded eyebrows, very expressive honest everyman face, charcoal-gray button "
    "shirt and beige slacks, holds a notebook. "
    "HAN TANG-SU (comic foil) early-20s, slightly chubby, messy dark hair under a RED cap, "
    "mustard-orange oversized hoodie and blue jeans, always holding a smartphone, cocky restless. "
    "Minor: VALUE friend (late-20s, glasses, thick finance book), GROWTH friend (late-20s, "
    "energetic, holds a tablet that is ALWAYS switched OFF with a plain dark screen), FUND MANAGER (back/silhouette, six monitors)."
)
RULES = (
    "FORMAT: a single vertical Korean webtoon PAGE with the panels described, separated by thin "
    "white gutters, asymmetric panel heights. "
    "CRITICAL: render ABSOLUTELY NO words, letters, titles, captions or typography anywhere. Every "
    "speech balloon, narration box, title area and SFX space must be COMPLETELY BLANK/EMPTY for "
    "later hand-lettering. The ONLY text allowed is tiny content already on a phone/monitor screen "
    "(a chart number) or the specific English diagram/book labels explicitly named in the page "
    "content. Do NOT write mood words like VALUE, GROWTH, etc. Invent nothing beyond the description."
)

SHEET_PROMPT = (
    "A polished, production-ready CHARACTER REFERENCE SHEET for a premium Korean webtoon, three "
    "Korean male characters standing full-body front view on a clean off-white seamless background, "
    "evenly spaced left to right with a clear height and age difference. Highly detailed, refined, "
    "professional Naver/Kakao webtoon character design. "
    "LEFT, JU BON-JIL, late-40s mentor, dignified and fit, neat salt-and-pepper short hair with "
    "individual strands, thin metal-rim glasses, calm intelligent eyes with a warm slight knowing "
    "smile, fine age lines; deep teal-navy crew-neck knit over a light collared shirt with sleeves "
    "rolled, beige chinos with realistic folds, brown leather shoes, a wristwatch, holding a marker. "
    "MIDDLE, NA BAE-UM, late-30s ordinary office worker, average build, short neat black hair, no "
    "glasses, gentle rounded eyebrows, an earnest honest hopeful face; charcoal-gray button shirt "
    "and beige slacks, holding a notebook to his chest. "
    "RIGHT, HAN TANG-SU, early-20s, slightly chubby, messy dark hair under a RED baseball cap, a "
    "cocky restless smirk; mustard-orange oversized hoodie, blue jeans, sneakers, one hand in his "
    "pocket, the other holding a smartphone. "
    "Crisp confident clean ink linework, refined soft cel shading, natural balanced full color, "
    "expressive lifelike Korean faces, detailed hair and realistic clothing texture. A small neat "
    "Korean name label centered under each. Consistent series character design, bright and clean. "
    "STYLE: " + STYLE
)

# 35 페이지 — 고급(두꺼운) 미술지시 프롬프트
PAGES = {
 "p01":"A tall two-panel page. TOP PANEL (~50%): a quiet dim investment study room at dusk; a large clean whiteboard and empty wooden chairs in soft shadow; warm orange sunset light pours through a side window casting long gentle rays; on the foreground wooden table, lit by a single soft warm spotlight, rest ONLY an open book and a steaming coffee cup, no people; calm, cinematic, faintly melancholic; leave a clean darker area at center for a title. BOTTOM PANEL (~50%): present day, a BRIGHT airy cafe by a sunlit window; NA BAE-UM sits relaxed and quietly happy, holding up his smartphone showing a green rising stock chart and a small positive return; warm natural daylight, a notebook and coffee beside him; an EMPTY narration box at top-left and one EMPTY speech balloon; the very bottom edge softly blurs (flashback).",
 "p02":"Three stacked slice-of-life panels. (1) a packed morning subway car, NA BAE-UM squeezed shoulder-to-shoulder among tired commuters, gripping a handrail, glancing dully at his phone, cool flat fluorescent light, muted palette; empty narration box. (2) a generic open-plan office, NA BAE-UM small at his cubicle among rows of identical workers under cold overhead lights, mildly weary; empty narration box. (3) evening, NA BAE-UM walking home alone down a quiet street past the glow of a convenience store, loosening his tie, worried eyes on a stock app, warm streetlight against blue dusk; empty narration box.",
 "p03":"Two panels with strong warm-to-cold contrast. (1 ~45%) flashback, a cozy night room months earlier; NA BAE-UM at his desk under a warm lamp, hopeful but a little nervous, thumb pressing 'buy' on a stock app for the first time, a bankbook and small stack of savings beside him; intimate warm amber light; empty thought balloon. (2 ~55%) present, the same desk now cold and blue-toned; the app screen deep red, his account halved; NA BAE-UM stares stunned and drained, one hand on his forehead, shoulders slumped; harsh cold shadow; empty narration box and empty thought balloon.",
 "p04":"Two panels. (1 ~50%) NA BAE-UM at home at night, slightly desperate, hunched over his phone typing into a group chat showing three blurred friend avatars; a faint hopeful 'maybe they know' look; warm low room light; empty narration box. (2 ~50%) dusk exterior, NA BAE-UM walking toward the warm glowing entrance of a cozy cafe, clutching his phone, the posture of grasping at straws; through the lit window three young men are faintly visible at a table; soft blue evening vs warm cafe light; empty narration box.",
 "p05":"Two panels in a warm bright cafe with detailed background. (1 ~55%) the VALUE friend (late-20s, glasses, tidy, a thick finance book in hand) leans toward NA BAE-UM, earnest and a little professorial, tapping the book cover; NA BAE-UM listens, leaning in attentively; empty speech balloon and a small empty caption tab beside the friend. (2 ~45% close-up) the VALUE friend's calm confident face as he pushes his glasses up, utterly certain; crisp detail; empty speech balloon.",
 "p06":"Two panels, same bright cafe. (1 ~55%) the GROWTH friend (late-20s, energetic) leans in holding up a tablet displaying a rising revenue bar graph, waving his free hand dismissively at the VALUE friend; NA BAE-UM's head turns between them, caught in the middle; animated body language; empty speech balloon and a small empty caption tab. (2 ~45%) the VALUE friend and GROWTH friend lean across the table bickering face to face with mild comedic friction, NA BAE-UM squeezed between glancing back and forth; two empty speech balloons.",
 "p07":"Three panels. (1 ~34%) HAN TANG-SU (red cap, mustard hoodie) bursts in waving his smartphone with a cocky grin and a thumbs-up, brimming with baseless confidence, lively comedic energy; empty speech balloon and a small empty caption tab. (2 ~34%, slight high angle) all three friends talk over each other around NA BAE-UM in a chaotic three-way crossfire of gestures, each certain; NA BAE-UM at center overwhelmed with a faint comedic sweat drop; three empty speech balloons crowding in. (3 ~32% close-up) NA BAE-UM's face caught helpless, eyes darting side to side, a confused half-smile; small empty thought balloon.",
 "p08":"Two panels. (1 ~50%) NA BAE-UM sits alone at the cafe after the friends leave; three faint translucent thought-images hover around his head (a value book, a rising growth graph, a red-cap hype figure); he looks from one to another, unable to choose, a reckless idea slowly dawning; contemplative warm light; empty narration box and empty thought balloon. (2 ~50% close-up) his face brightening into a fateful, slightly foolish 'aha' grin with a tiny lightbulb spark above his head, as if he cleverly solved it (ironically wrong); emphasized empty speech balloon.",
 "p09":"Three panels. (1 ~30%, a montage strip of three small frames) NA BAE-UM's thumb decisively tapping 'buy' three times, each mini-frame a different blurred ticker, his face determined and hopeful; small empty SFX spaces. (2 ~30%) he leans back and closes the app with a satisfied, relieved expression as if the problem is solved; warm light; empty thought balloon. (3 ~40%, transition) a calendar and clock motif with a softly blurred passage-of-time band sweeping across, the color cooling from warm to neutral as NA BAE-UM goes about ordinary days in the background; empty narration box.",
 "p10":"Two panels. (1 ~60%) three red plunging candlestick charts crash steeply downward across the panel at once, a cold blue-gray gloom flooding the scene; NA BAE-UM in the foreground, jaw dropped, blank dazed dot-eyes, frozen in disbelief; a large empty SFX space. (2 ~40% close-up) NA BAE-UM slumped, his comedic soul-leaving-body despair hardening into a real bitter question, one fist clenched on the table; somber light; empty thought balloon.",
 "p11":"Two panels, cinematic cold contrast. (1 ~40%) NA BAE-UM alone at the cafe, the light gone cold around him, staring blankly and defeated at his phone; empty thought balloon. (2 ~60%, cold dark tone) a dim professional trading floor; the imposing back/silhouette of a fund manager seated before six glowing monitors streaming charts, order books and volume at high speed; a night city skyline glitters through the window; fast, powerful, untouchable; a bold empty title space and an empty yellow narration box.",
 "p12":"Two panels. (1 ~55%) a late-evening city street after work; NA BAE-UM walks home alone, shoulders slumped, hands in his pockets, tired and defeated; cool blue-gray palette, blurred neon signs and passing commuters, his long shadow on the damp pavement; empty narration box at top. (2 ~45%) he slows and looks up at the warm amber glow spilling from the window of a small cozy bookstore across the street, a single pocket of warmth in the cold night; a faint flicker of curiosity softens his face; empty narration box.",
 "p13":"Two panels, render the Latin title cleanly. (1 ~55%) inside the evening bookstore, warm light over economics shelves; NA BAE-UM's hand pulls out one book whose cover shows a gorilla silhouette and the clean Latin title 'The Gorilla Game'; a soft beam of light falls on the book as if by fate; his face curious, quietly drawn in; detailed shelves. (2 ~45% close-up) the book cover fills the frame, the gorilla on it seeming to gaze back at the reader, NA BAE-UM's faint reflection in the cover sheen; quiet, fateful; one tiny empty thought balloon.",
 "p14":"Two panels, render Latin cleanly. (1 ~50%) a warm close-up at home under a desk lamp of the book's back cover in NA BAE-UM's hands; a small printed flyer tucked in it shows a gorilla logo and the clean Latin words 'GORILLA HUNTERS investment study'; his thumb traces the line, intrigued. (2 ~50%) a few days of hesitation: NA BAE-UM at his desk glancing sideways at the flyer propped beside his laptop, a wall calendar with one date circled, biting his lip, uncertain; quiet domestic light; empty thought balloon.",
 "p15":"Two panels, render the Latin sign cleanly. (1 ~50%) NA BAE-UM stands in a building hallway before a door bearing a small 'GORILLA HUNTERS' sign, hand raised to knock, drawing a deep breath, nervous but resolved; warm light leaks invitingly from under the door into the cooler hallway; empty narration box. (2 ~50%, from behind NA BAE-UM) the door swings open into a cozy warmly lit study-group room; the seated members are a small DIVERSE group of ordinary adults of varied ages and both genders, clearly DIFFERENT people from the cafe friends (do NOT draw a bespectacled value-friend holding a book or an energetic growth-friend with a tablet), though HAN TANG-SU in his red cap is among them; depth and warmth; empty narration box.",
 "p16":"Three panels, detailed cozy interior. (1 ~36%) a study room; a big clean whiteboard with hand-written Latin 'GORILLA HUNTERS' and a small gorilla poster; the members around the wooden table are a small DIVERSE group of ordinary adults of varied ages and both genders (a middle-aged man, a young woman, an older member, one with a laptop), plus HAN TANG-SU in his red cap; these study members are clearly DIFFERENT people from the cafe friends (do NOT draw the bespectacled value-friend with a book or the energetic growth-friend with a tablet); they turn to welcome NA BAE-UM; warm inviting light; reserve a clean horizontal caption band along the bottom edge; empty speech balloon. (2 ~34%) JU BON-JIL at the head of the table, salt-and-pepper hair, thin glasses, deep navy knit, calm warm sharp smile, a marker in hand and 'The Gorilla Game' on the table; he radiates trust; empty speech balloon and a small empty caption tab. (3 ~30%) NA BAE-UM seated, nervous but hopeful, the book in his hands; empty speech balloon.",
 "p17":"Two panels, warm study-room light. (1 ~50%) NA BAE-UM sheepishly recounting his losses, scratching the back of his head with an awkward smile; JU BON-JIL listens with calm knowing patience, hands folded; two empty speech balloons. (2 ~50% close-up) JU BON-JIL leans forward slightly and raises one finger, posing a gentle but pointed question, eyes sharp and warm; NA BAE-UM blinks, caught off guard; emphasized empty speech balloon.",
 "p18":"Three panels, keep the whiteboard bright and crisp. (1 ~40%) JU BON-JIL at the clean whiteboard with a marker; two columns: a LEFT column with its header box left BLANK, beneath it small English items 'PER / sales / price' lightly crossed out; a RIGHT column with its header box left BLANK and circled in red; empty speech balloon. (2 ~32%) a close two-shot: JU BON-JIL taps the right (blank, circled) column while NA BAE-UM watches with a dawning realization; emphasized empty speech balloon. (3 ~28% close-up) NA BAE-UM's face with the first real spark of interest, leaning in; small empty thought balloon.",
 "p19":"Two panels. (1 ~52%) over the whiteboard a small inset recalls the cold fund-manager silhouette at six fast monitors while JU BON-JIL gestures toward it, explaining; NA BAE-UM nods grimly, recognizing his own past defeat; empty speech balloon. (2 ~48%) JU BON-JIL turns back warm and firm, his marker pointing at the right column; NA BAE-UM straightens with understanding; bright study room; two empty speech balloons.",
 "p20":"Two panels, keep all labels clean and legible. (1 ~64%) JU BON-JIL in side view at the clean whiteboard drawing a neat hand-written 3x3 grid with a marker; render English labels cleanly: along the bottom 'Stock knowledge: Low / Medium / High', up the left side 'Industry knowledge: Low / Medium / High'; the exact center cell is boxed and filled mustard-yellow with a big star; the surrounding eight cells hold short role labels in small neat handwriting (VC, Fund Manager, Industry Expert, Novice, Operator, Press, Hobbyist, Trader); NA BAE-UM in the corner copying it into his notebook, impressed; empty speech balloon. (2 ~36%) NA BAE-UM studying the grid, brow furrowed, trying to find where he fits; small empty thought balloon.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL taps the central mustard star cell of the grid and a bold arrow extends from his fingertip out of the panel toward the reader; behind him a bold empty mustard-yellow typographic space; confident warm light; empty speech balloon. (2 ~45% close-up) NA BAE-UM pointing at his own chest, surprised and deeply moved, eyes wide; empty speech balloon and an empty yellow narration box.",
 "p22":"Three panels. (1 ~32% close-up) NA BAE-UM moved, eyes shining with sincere realization; empty speech balloon. (2 ~36% comedic) HAN TANG-SU (red cap) butts in from the side with a cocky thumbs-up and a big grin; beside him JU BON-JIL wears a dry amused smirk, one eyebrow raised; lighter comedic tone, slight white flash; two empty speech balloons. (3 ~32%) HAN TANG-SU deflating, sheepish; NA BAE-UM gives him a wry sidelong look; empty speech balloon.",
 "p23":"Two panels, warm room. (1 ~55%) JU BON-JIL warm and steady, holding up two fingers as if listing conditions; NA BAE-UM beside takes notes earnestly; HAN TANG-SU sulks in the corner; empty speech balloon. (2 ~45% close-up) JU BON-JIL's warm sharp eyes and a slight confident smile, fully assured; empty speech balloon.",
 "p24":"Two panels. (1 ~70%) JU BON-JIL in side view at the clean whiteboard; at the center a boxed label 'NVIDIA / CUDA' with arrows converging into it from company names around it: OpenAI, Google, Meta, Tesla, Anthropic, Microsoft, Amazon, Oracle (render all Latin names cleanly, no garbling); faintly sketched above the central box, a small gorilla seated on a throne; hand-drawn diagram feel; NA BAE-UM in the corner taking notes, clearly impressed; empty speech balloon. (2 ~30% close-up) NA BAE-UM's face lighting up with realization, sparkle lines and a faint green glow behind him, lips parted; small empty thought balloon.",
 "p25":"Two panels. (1 ~58%, a bold metaphor splash) a striking sketch-style image of a powerful gorilla seated upon a jungle throne, smaller animals (rival companies) gathered below all depending on it; dramatic warm light, hand-drawn webtoon texture, overlaid as a vision within the study-room scene; empty narration box. (2 ~42%) NA BAE-UM gazing up at the metaphor forming in his mind, realization settling into firm conviction; small empty thought balloon.",
 "p26":"Two panels, warm desk light. (1 ~60%, over-the-shoulder) NA BAE-UM writing two neat lines in his open notebook (leave the written lines BLANK for later lettering), with small hand-drawn underlines and a star; JU BON-JIL in the soft background nodding warmly; empty speech balloon. (2 ~40%) a clean close-up of the notebook page, the two lines left blank, a small star and a tiny doodle of a gorilla in the corner.",
 "p27":"Two panels, bright study room. (1 ~52%) NA BAE-UM holds up his smartphone showing a blurred mosaic of Korean stock-YouTube thumbnails (no readable text), asking earnestly; JU BON-JIL listens with a patient knowing smile; empty speech balloon. (2 ~48%) JU BON-JIL gently shakes his head and raises a finger to correct a common myth, calm and clear; empty speech balloon.",
 "p28":"A single large split panel with a thin bottom strip, strong cold-vs-warm contrast. LEFT HALF (cold blue tone): 3 AM, a tired trader hunched before six monitors, an energy drink, a wall clock reading 03:00, exhausted and wired, harsh screen glow; leave label space empty. RIGHT HALF (warm tone): NA BAE-UM relaxed at a dinner table with family or colleagues, glancing only once briefly at a stock app, content; warm cozy light; leave label space empty. A round 'VS' badge sits between the two halves. BOTTOM STRIP: an empty voice-over box spanning the full width.",
 "p29":"Two panels, bright crisp whiteboard. (1 ~58%) JU BON-JIL gestures toward three simple clean hand-drawn icons in a row: a calendar with only a couple of marks, an office worker with a laptop, and a fund-manager figure with an X crossed over it; NA BAE-UM notes each; empty speech balloon. (2 ~42%) NA BAE-UM counting the three points off on his fingers, ideas clicking into place, a small confident smile; empty thought balloon.",
 "p30":"A bold emphasis panel with a small reaction strip. MAIN PANEL (~70%): a strong confident composition, JU BON-JIL pointing firmly at NA BAE-UM, behind them a bold empty mustard-yellow typographic banner space; warm assured lighting; empty speech balloon. BOTTOM STRIP (~30%): a close-up of NA BAE-UM, resolved and quietly emotional; empty narration box.",
 "p31":"Two panels, deadpan comedic contrast. (1 ~55%) HAN TANG-SU springs to his feet, red cap, waving his smartphone whose screen shows a blurred '2x leverage' buy interface, eyes shining with reckless confidence, comic speed-lines; the other members lean back warily; empty speech balloon. (2 ~45%) JU BON-JIL stays calm with a dry knowing look, slowly shaking his head; NA BAE-UM beside, half-amused half-worried, palm to his forehead; two empty speech balloons.",
 "p32":"Two panels. (1 ~50% close-up) JU BON-JIL's calm but serious face delivering a quiet warning, eyes steady and grave; subdued warm light; empty speech balloon. (2 ~50%) HAN TANG-SU pauses for a split second, then shrugs it off with a careless dismissive grin (foreshadowing he won't listen); empty speech balloon.",
 "p33":"Two quiet, minimal panels, lots of negative space. (1 ~60%, atmospheric) NA BAE-UM sits alone at the study-room table after the others have drifted off, in warm low light, looking down at his own halved red chart on his phone; self-reflective, a little ashamed; soft shadow; one tiny empty thought balloon. (2 ~40%, extreme close-up) his hand resting on the closed book 'The Gorilla Game' (render the Latin title cleanly), a single warm highlight catching it; contemplative; small empty thought balloon.",
 "p34":"Two panels. (1 ~55%) in the study room, NA BAE-UM hugs 'The Gorilla Game' book (Latin title clean) to his chest with a determined, deeply moved expression, the room's tone resolving warm around him; empty speech balloon. (2 ~45% close-up) his eyes now clear and resolved, a firm set to his jaw, quiet strength; empty thought balloon.",
 "p35":"Three panels. (1 ~30%) JU BON-JIL bathed in warm light with a knowing smile, his hand pointing toward the reader, behind him a bold empty mustard typographic space; empty speech balloon. (2 ~22%) NA BAE-UM straightening with new resolve, notebook in hand; empty speech balloon. (3 ~48%) behind JU BON-JIL the scene dissolves into a sepia-toned 1943 Iowa cornfield with two farmers and a faint hand-drawn bell-shaped adoption curve overlaid across the sky; nostalgic time-blend; a black caption band across the very bottom left EMPTY for a next-episode preview.",
}

def save_b64(b64, path):
    with open(path, "wb") as f:
        f.write(base64.b64decode(b64))
    print("saved", path)

def gen_sheet(c):
    print("generating character sheet ...")
    r = c.images.generate(model=MODEL, prompt=SHEET_PROMPT,
                          size="1536x1024", quality="high")
    save_b64(r.data[0].b64_json, SHEET)

def gen_page(c, pid):
    spec = PAGES[pid]
    prompt = f"{RULES}\n\nPAGE CONTENT: {spec}\n\n{CHARS}\n\nSTYLE: {STYLE}"
    out = os.path.join(OUT, pid + ".png")
    print("generating", pid, "...")
    use_ref = os.environ.get("USEREF") == "1" and os.path.exists(SHEET)
    if use_ref:
        with open(SHEET, "rb") as ref:
            r = c.images.edit(model=MODEL, image=[ref], prompt=prompt,
                              size="1024x1536", quality="high")
    else:
        r = c.images.generate(model=MODEL, prompt=prompt,
                              size="1024x1536", quality="high")
    save_b64(r.data[0].b64_json, out)

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "smoke"
    c = client()
    if cmd == "sheet":
        gen_sheet(c)
    elif cmd == "smoke":
        if not os.path.exists(SHEET): gen_sheet(c)
        gen_page(c, "p01")
    elif cmd in ("all", "rest"):
        if not os.path.exists(SHEET): gen_sheet(c)
        # rest = 새 화풍으로 이미 뽑은 p01~p06,p24 빼고 남은 것만
        done = {"p01","p02","p03","p04","p05","p06","p24"}
        ids = [f"p{i:02d}" for i in range(1, 36)]
        if cmd == "rest":
            ids = [p for p in ids if p not in done]
        for pid in ids:
            try:
                gen_page(c, pid); time.sleep(1)
            except Exception as e:
                print("ERROR", pid, e)
    elif cmd in PAGES:
        gen_page(c, cmd)
    else:
        sys.exit("unknown cmd: " + cmd)

if __name__ == "__main__":
    main()
