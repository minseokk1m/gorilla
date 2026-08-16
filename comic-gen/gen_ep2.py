#!/usr/bin/env python3
# 고릴라 헌터스 Ep2 v2 "기술은 어떻게 퍼지는가" — gpt-image-2 (~28장)
# 2026-08-15 전면 재구성: 회장님 피드백 반영 (feedback-chairman.md F2-1~10, A2)
#   개념 먼저→투자 적용 순서(F2-9) · 공동묘지로 간 첨단기술(F2-3, LG 기고문) · 옥수수 대화극(F2-1)
#   TALC 5유형 내러티브 대화극+정식명 매핑(F2-5·A2) · AI의 역사 왓슨→알파고→ChatGPT(F2-7)
#   구글 제미나이 방어전(F2-8) · 갤럭시 제거→무브랜드(F2-4) · 할루시네이션 도식 제거(F2-6·10)
# usage: python3 gen_ep2.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep2")
KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

CHARS = (g.CHARS +
    " EP2 CRITICAL CONSISTENCY: NA BAE-UM is EXACTLY 39 years old and must look late-30s on EVERY "
    "page. STUDY GROUP ROOM: one whiteboard, long table, bookshelves; NO trading desks, NO "
    "multi-monitor setups, NO wall posters. "
    "EP2 RECURRING (TALC five archetypes, keep identical): "
    "CHOI SIN-SANG 'tech enthusiast' (20s male, headphones around neck, gadget vest, bright curious); "
    "GO BI-JEON 'visionary' (40s male, sharp navy suit, confident gaze, tablet under arm); "
    "HAN SIL-SOK 'pragmatist' (40s male, neat shirt and knit vest, metal glasses, calm careful); "
    "SHIN JUNG-HAE 'conservative' (50s female, warm brown cardigan, reserved kind face); "
    "AN MID-EO 'skeptic' (50s male, stern brow, old flip phone always in hand).")

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
    "FLASHBACK RULE: period/flashback scenes contain ONLY period-appropriate anonymous people and props; never the modern cast, smartphones or modern clothing.")

DESC = {'title':'the big title text in the dark title area','subtitle':'the subtitle',
 'narr':'a narration box','speech':'a speech balloon','think':'a thought (cloud) balloon',
 'caption':'a small caption tab','sfx':'a bold sound-effect',
 'emph':'a bold mustard-yellow emphasis caption','label':'a label box'}

def clean_spec(spec):
    s = re.sub(r',?\s*(an?|one|two|three|four|small|large|bold|emphasized|tiny)?\s*empty[^.;]*?(balloon|box|space|tab)s?', '', spec, flags=re.I)
    s = re.sub(r'\bempty\b','',s,flags=re.I); s = re.sub(r'\s{2,}',' ',s); return s

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked webtoon linework, NO photoreal). A golden Iowa cornfield at dusk; over the field, a faint white bell-curve line floats in the sky like a constellation. A clean dark band across the middle for the title text, thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM leaning forward asking JU BON-JIL an eager question, notebook ready; members around. (2 ~45%) JU BON-JIL with a calm knowing smile, holding up a finger.",
 "p03":"Two panels, the graveyard of high tech. (1 ~55%) a moody but slightly comic illustration: a foggy hill with tombstones, each tombstone shaped like a retro gadget: a LaserDisc player with a big disc, an early videophone, a pen-input laptop, a pager; NO readable text on tombstones. (2 ~45%) JU BON-JIL presenting this scene like a tour guide, mock-solemn.",
 "p04":"Two panels, two case vignettes. (1 ~55%) a 1988 Seoul Olympics-era living room: a bulky early digital TV prototype glowing proudly, a Korean family looking at it with wonder; slightly vintage warm tone but keep webtoon linework. (2 ~45%) a timeline bar drawn as a simple hand sketch: a long dim bar labeled '1975' at left and '1995' at right, with a lamp lighting up only at the right end.",
 "p05":"Two panels. (1 ~55%) NA BAE-UM puzzled, scratching his head, the graveyard image small in his thought bubble. (2 ~45%) JU BON-JIL tapping the whiteboard which shows ONLY one big hand-written question mark.",
 "p06":"Two panels, 1943 Iowa flashback (soft vintage warm tone, keep webtoon linework). (1 ~55%) a wide Iowa cornfield, two farmers by a wooden fence, one holding a bag labeled 'HYBRID SEED CORN', a small wooden sign 'Ryan & Gross, 1943'. (2 ~45%) close on the two farmers' weathered friendly faces mid-conversation.",
 "p07":"Two panels, the corn dialogue (vintage tone continues). (1 ~55%) the SAME two 1943 farmers from the previous page (anonymous period farmers: flat cap + denim overalls / wide-brim hat + suspenders; NOT any study-group member, NO smartphones, NO modern clothing): the first farmer confidently planting the new seed in his plot while the second watches from the fence with crossed arms, curious but cautious. (2 ~45%) autumn: the first farmer's plot visibly taller and fuller; the second farmer now leaning over the fence wide-eyed, a third farmer approaching in the background.",
 "p08":"Two panels. (1 ~55%) the field seen from above: adoption spreading plot by plot like a wave, drawn as a simple map with plots shading from dark (early) to light (late); a small hand-drawn S-curve in the corner of the sketch. (2 ~45%) back to present: JU BON-JIL at the whiteboard which shows ONLY a clean hand-drawn S-curve with axis labels '채택률' and '시간'.",
 "p09":"Two panels, the study-room experiment begins. (1 ~55%) JU BON-JIL holds up his phone showing a generic AI chat app interface (abstract chat bubbles, NO readable text) and addresses the whole group playfully. (2 ~45%) the FIVE TALC archetypes ONLY in a row, left to right: CHOI SIN-SANG (headphones), GO BI-JEON (navy suit), HAN SIL-SOK (knit vest), SHIN JUNG-HAE (50s woman, brown cardigan), AN MID-EO (stern, flip phone); do NOT include NA BAE-UM or HAN TANG-SU (red cap); each reacting differently (excited / intrigued / neutral / wary / dismissive), comic ensemble shot.",
 "p10":"Two panels, archetype 1. (1 ~55%) CHOI SIN-SANG (headphones, gadget vest) enthusiastically demonstrating the AI app on three devices at once at the table, eyes sparkling; a small clean label box near him. (2 ~45%) his proud grin, holding up his phone like a trophy.",
 "p11":"Two panels, archetype 2. (1 ~55%) GO BI-JEON (navy suit, tablet) standing, gesturing at a rising arrow he sketched on a note pad (simple arrow only, no text), visionary pose, slight dramatic lighting; a small clean label box near him. (2 ~45%) his confident face, eyes toward a window as if seeing the future.",
 "p12":"Two panels, archetype 3. (1 ~55%) HAN SIL-SOK (knit vest, glasses) arms crossed, calmly observing SIN-SANG's demo from his seat, thoughtful but unmoved; a small clean label box near him. (2 ~45%) his careful face with one raised eyebrow.",
 "p13":"Two panels, archetypes 4 and 5. (1 ~50%) SHIN JUNG-HAE (brown cardigan) waving a gentle 'not yet' hand with an apologetic smile; a small clean label box near her. (2 ~50%) AN MID-EO (stern, flip phone) snapping his flip phone shut decisively; a small clean label box near him.",
 "p14":"One large panel (~100%). The whiteboard with the finished bell-shaped TALC curve divided into FIVE colored segments left to right, each labeled in TWO lines (formal name on top, nickname below): '혁신수용자 / 기술애호가 2.5%' (purple), '선각수용자 / 선구자 13.5%' (blue), '전기다수 수용자 / 실용주의자 34%' (green), '후기다수 수용자 / 보수주의자 34%' (orange), '지각수용자 / 회의론자 16%' (gray); a RED dashed vertical line between the 2nd and 3rd segments labeled 'CHASM'. JU BON-JIL beside it, NA BAE-UM taking notes. Labels exactly as written, clean.",
 "p15":"One large panel (~100%). The same TALC curve smaller at the top, completely UNLABELED (NO title, NO letters, NO segment names, NO English words on or near the curve); below it the five archetype members standing on their segment positions, each with ONE short slogan balloon: SIN-SANG '시험해 보자!', BI-JEON '무리보다 앞서 가자!', SIL-SOK '무리와 함께 가자!', JUNG-HAE '버틸 만큼 버텨보자!', MID-EO '절대 안 간다!'. Clean ensemble infographic, webtoon tone.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM asking a sharp question, hand raised; JU BON-JIL pleased. (2 ~45%) whiteboard corner: a tiny reminder sketch of the transportation staircase from Ep1 (three small ascending bars only, labels '말', '기차', '자동차'), JU BON-JIL pointing at it.",
 "p17":"One split panel (~100%), LEFT vs RIGHT contrast. LEFT half: a glowing AI chat screen creating a document, code and a picture at once, label box inside left half '불연속 · 판을 새로 깐다'. RIGHT half: a row of five nearly identical generic smartphones (no brand, no logos) with only the camera lens slightly larger each year, label box inside right half '연속 · 매년 조금씩 좋아진다'. Clean contrast, each label stays inside its own half.",
 "p18":"Two panels, compelling reason. (1 ~55%) a night office: an exhausted developer buried in paper stacks and a glowing screen; beside him the same scene transformed — an AI copilot pane suggested as abstract blurred colored bars (NO readable characters or code), the stack shrunk, the clock moved from 23:00 to 18:00 (two small clock faces). (2 ~45%) JU BON-JIL snapping his fingers with the point.",
 "p19":"Two panels, the counter-example. (1 ~55%) a flashy tech launch event stage: a presenter unveiling a shiny gadget (generic, no brand) with confetti; the audience of ordinary people looking politely puzzled, one yawning. (2 ~45%) the same gadget in a closet gathering dust, a sad spotlight; comic melancholy.",
 "p20":"Two panels, AI history part 1. (1 ~55%) a 2011-era TV quiz-show stage rendered simply: a computer terminal on a podium defeating two human champions (abstract, no network logos, no readable text); vintage tone. (2 ~45%) then: a deep dark crack in the ground (the chasm) with a small robot figure sitting at the bottom, dusty and forgotten, a single spotlight from above.",
 "p21":"Two panels, AI history part 2. (1 ~55%) 2016: a Go (baduk) board seen from above, a human hand hesitating over a stone, a small screen showing a move number; crowd silhouettes shocked in the background; NO readable text beyond the specified narration. (2 ~45%) ordinary people watching a street screen showing ONLY the Go board image (NO caption, NO chyron, NO names, no readable text), amazed, but then walking on unchanged, hands in pockets.",
 "p22":"Two panels, AI history part 3. (1 ~55%) 2022: an ordinary desk at night, a person typing into a chat interface and a finished document appearing; warm light of usefulness, the crack from p20 shown healing/bridged in a small inset sketch. (2 ~45%) JU BON-JIL concluding at the whiteboard which shows ONLY three hand-written years in a row: '2011', '2016', '2022' with a small curve dipping into a crack and climbing out.",
 "p23":"Two panels, the gorilla defends. (1 ~55%) a symbolic webtoon-style scene: a big calm gorilla sitting on a hill labeled with a simple hand-drawn magnifying-glass icon (search), while a nimble challenger monkey with a chat-bubble flag charges up; the gorilla raises one massive arm to block, twin stars glinting in its eyes. (2 ~45%) the gorilla now holding its OWN chat-bubble flag too, standing firm; the challenger monkey pausing mid-charge.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL explaining with both palms up, balanced; NA BAE-UM absorbing. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '고릴라는 공격도 받지만 방어도 한다' / '누가 이길지는 관찰로 확인'.",
 "p25":"Two panels, the pivot to investing. (1 ~55%) JU BON-JIL closing the marker cap, shifting tone, warm firm look at the group; his sweater is plain with NO lettering. (2 ~45%) the whiteboard with ONLY two hand-written phrases connected by an arrow: '마케팅 이론' → '투자에 적용'.",
 "p26":"Two panels, self application, calm constructive mood. (1 ~55%) NA BAE-UM at the table calmly reviewing a red declining line chart on his phone, nodding slightly like a student checking an answer, a small wry learning smile. (2 ~45%) his notebook close-up: ONLY a hand-written two-line checklist: '불연속인가? ✗' / '살 수밖에 없는 이유가 있나? ✗'.",
 "p27":"Two panels, quiet close. (1 ~55%) the study room in warm evening light, members packing up, NA BAE-UM still writing, JU BON-JIL watching him kindly. (2 ~45%) close on NA BAE-UM's notebook cover closing, his determined half-smile.",
 "p28":"Two panels, next-episode hook. (1 ~55%) JU BON-JIL at the whiteboard drawing a deep canyon between two cliffs, a small car shape teetering at the edge of the left cliff; ominous-playful tone. (2 ~45%) a black caption band across the very bottom; above it NA BAE-UM and HAN TANG-SU leaning in, curious.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 02\n기술은 어떻게 퍼지는가\n아이오와 옥수수밭에서 태어난 기술수용주기'),
        (1,'C','caption','시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','나배움: 고릴라가 어떻게 1등이 되는 거예요?'),
        (2,'C','speech','주본질: 좋은 질문이야\n근데 그 전에, 무덤부터 보러 가자')],
 "p03":[(1,'C','narr','잘 나갈 것 같던 첨단기술들이\n조용히 묻히는 곳이 있다'),
        (2,'C','speech','레이저디스크, 화상전화, 펜 노트북, 삐삐\n다들 한때는 미래라고 불렸지')],
 "p04":[(1,'C','narr','88올림픽 무렵, 한국은 디지털 TV를\n세계 두 번째로 개발했다\n그리고 15년을 동면했다'),
        (2,'C','narr','인터넷은 1975년에 태어나\n20년을 잠복하고서야 세상을 뒤집었다')],
 "p05":[(1,'C','speech','나배움: 죽거나, 십 년 넘게 잠수하거나…\n대체 왜 그런 거예요?'),
        (2,'C','speech','주본질: 기술이 퍼지는 순서를 모르면\n영영 안 보이는 답이야\n80년 전 옥수수밭으로 가자')],
 "p06":[(1,'C','narr','1943년, 미국 아이오와\n수확량이 두 배라는 잡종 옥수수가 나왔다'),
        (2,'C','speech','동료: 자네 이거 심어볼 텐가?')],
 "p07":[(1,'C','speech','첫 농부는 바로 심었다\n"새건 내가 먼저 해봐야지"'),
        (1,'C','speech','옆 농부는 팔짱을 꼈다\n"자네 밭 되는 거 보고"'),
        (2,'C','narr','가을, 첫 밭이 두 배로 여물자\n그제야 옆 밭이, 그다음 밭이 움직였다')],
 "p08":[(1,'C','narr','채택은 밭에서 밭으로\n물결처럼 순서대로 번졌다'),
        (2,'C','speech','주본질: 이 순서를 Ryan과 Gross가 기록했고\nRogers가 법칙으로 정리했지\n옥수수든 AI든, 퍼지는 순서는 같아')],
 "p09":[(1,'C','speech','주본질: 자, 실험해 보자\n다들 요즘 AI 챗봇 써봤나?'),
        (2,'C','narr','다섯 사람, 다섯 가지 반응')],
 "p10":[(1,'C','speech','최신상: 나온 첫 주에 깔았죠\n폰, 패드, 노트북 전부요'),
        (1,'C','label','혁신수용자 · 기술애호가 · 최신상'),
        (2,'C','speech','최신상: 새 기능은 제가 제일 먼저 씁니다')],
 "p11":[(1,'C','speech','고비전: 이건 판을 바꿔요\n남들보다 먼저 올라타야\n격차를 벌릴 수 있죠'),
        (1,'C','label','선각수용자 · 선구자 · 고비전'),
        (2,'C','narr','미래를 먼저 보고, 먼저 베팅하는 사람')],
 "p12":[(1,'C','speech','한실속: 저는 아직요\n옆 팀이 써서 일이 실제로 빨라지면\n그때 시작해도 안 늦어요'),
        (1,'C','label','전기다수 수용자 · 실용주의자 · 한실속'),
        (2,'C','think','한실속: 검증 안 된 건 내 일에 못 쓰지')],
 "p13":[(1,'C','speech','신중해: 난 남들 다 쓰면 그때 할게요'),
        (1,'C','label','후기다수 수용자 · 보수주의자 · 신중해'),
        (2,'C','speech','안믿어: 난 이거면 충분해'),
        (2,'C','label','지각수용자 · 회의론자 · 안믿어')],
 "p14":[(1,'C','speech','주본질: 다섯 유형을 곡선에 올리면 이렇게 돼\n이게 기술수용주기, TALC야'),
        (1,'C','narr','옥수수밭의 순서가\n80년 뒤 AI에도 그대로 반복된다')],
 "p15":[(1,'C','narr','다섯 사람의 한마디가\n다섯 구간의 본심이다')],
 "p16":[(1,'C','speech','나배움: 그럼 아무 신기술이나\n이 곡선을 타는 거예요?'),
        (2,'C','speech','주본질: 아니, 조건이 둘 있어\n1화의 그 계단, 기억하지?')],
 "p17":[(1,'C','narr','첫째 조건, 불연속\n판을 새로 까는 기술이어야 한다')],
 "p18":[(1,'C','narr','둘째 조건, 살 수밖에 없는 이유\n진짜 고통을 절반으로 줄여줘야 한다'),
        (2,'C','speech','주본질: 이 둘이 없으면\n곡선은 시작도 안 돼')],
 "p19":[(1,'C','narr','화려한데 고통을 안 풀어주는 신제품은'),
        (2,'C','narr','박수만 받고, 옷장으로 간다')],
 "p20":[(1,'C','narr','AI도 이 곡선을 탔다가, 죽어봤다\n2011년 퀴즈쇼를 이긴 AI가 있었다'),
        (2,'C','narr','하지만 대중이 쓸 이유가 없었다\nAI는 골짜기 바닥에서 십 년을 보냈다')],
 "p21":[(1,'C','narr','2016년, 바둑에서 인간이 졌다\n세상이 놀랐다'),
        (2,'C','narr','놀라기만 했다\n내 일과는 상관없었으니까')],
 "p22":[(1,'C','narr','2022년, 채팅창 하나가 나왔다\n보고서가, 코드가, 번역이 반나절에서 한 시간으로'),
        (2,'C','speech','주본질: 살 수밖에 없는 이유가 생긴 순간\nAI는 골짜기에서 기어 나왔어')],
 "p23":[(1,'C','narr','그 채팅창은 검색의 왕좌까지 넘봤다\n하지만 왕좌의 고릴라는 만만치 않았다'),
        (2,'C','narr','고릴라는 제 손으로 챗봇을 만들어\n온 제품에 깔며 반격했다')],
 "p24":[(1,'C','speech','주본질: 도전자가 항상 이기는 게 아니야\n고릴라에겐 지킬 힘도 있거든\n이 전쟁 얘긴 나중에 제대로 하자'),
        (2,'C','narr','노트에 적었다')],
 "p25":[(1,'C','speech','주본질: 기억해 둬, TALC는 원래\n물건을 파는 쪽의 마케팅 이론이야'),
        (2,'C','speech','주본질: 우리는 그 지도를 거꾸로 들고\n어디에 돈을 둘지 읽는 거지')],
 "p26":[(1,'C','speech','나배움: 내가 샀던 그 종목은…\n둘 다 없었네'),
        (2,'C','narr','체크 두 줄이면 충분했다')],
 "p27":[(1,'C','narr','오늘 배운 건 곡선 하나\n하지만 그 곡선엔 사람들이 살고 있었다'),
        (2,'C','think','나배움: 다음엔 저 골짜기다')],
 "p28":[(1,'C','speech','주본질: 다음 시간엔 저 골짜기로 내려간다\n선구자와 실용주의자 사이,\n기술이 가장 많이 죽는 곳'),
        (2,'C','caption','Episode 2 끝 · 다음 화 · 죽음의 계곡, 캐즘\n(전기차는 왜 거기 빠졌나)')],
}

BANDS = {
 "p08":'옥수수의 채택 순서(Ryan & Gross 1943 → Rogers) = 모든 불연속 혁신이 퍼지는 순서',
 "p14":'기술수용주기(TALC) · 혁신수용자 2.5 → 선각수용자 13.5 → 전기다수 34 → 후기다수 34 → 지각수용자 16%',
 "p22":'불연속 + 살 수밖에 없는 이유, 둘이 갖춰진 순간 곡선이 다시 달린다',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성(이미지 미포함), 필요한 컷에만 선별 부여
NOTES = {
 "p03":'해설: 레이저디스크·화상전화·펜 컴퓨팅·무선호출기(삐삐)는 모두 상용화 초기에 사라지거나 대체된 실제 사례다. 유승삼, 「첨단기술 신제품 마케팅 성공 공식」(LG Ad Journal, 2003)에서 인용',
 "p04":'해설: 국내 가전 3사는 1988년 무렵 디지털 TV·고선명 TV를 세계 두 번째로 개발했으나 시장 개화까지 15년이 걸렸다. 인터넷은 1975년 태동 후 브라우저·WWW와 함께 1995년에야 부상했다(같은 기고문)',
 "p06":'해설: Ryan & Gross(1943)의 아이오와 잡종 옥수수 확산 연구가 수용자 유형 구분의 기원이다. Rogers가 『Diffusion of Innovations』(1962)로 이론화했고, Moore가 하이테크 시장에 수정 적용했다',
 "p14":'해설: 다섯 유형의 정식 명칭과 비율은 Moore·유승삼 번역 체계를 따른다. 캐즘(Chasm)은 선각수용자와 전기다수 수용자 사이의 단절이다. © The Chasm Group',
 "p22":'사실 확인: IBM 왓슨의 퀴즈쇼(제퍼디!) 우승 2011년, 알파고-이세돌 대국 2016년, ChatGPT 공개 2022년 11월',
 "p23":'사실 확인: ChatGPT 급부상 이후 구글은 2023년 제미나이(Gemini)를 출시하고 검색·워크스페이스 등 전 제품군에 통합하며 검색 시장 지위를 방어했다',
}

SPEAKERS = {'한탕수':'HAN TANG-SU (red cap)', '나배움':'NA BAE-UM', '주본질':'JU BON-JIL (mentor)',
 '최신상':'CHOI SIN-SANG (tech enthusiast)', '고비전':'GO BI-JEON (visionary, navy suit)',
 '한실속':'HAN SIL-SOK (pragmatist, knit vest)', '신중해':'SHIN JUNG-HAE (conservative, cardigan)',
 '안믿어':'AN MID-EO (skeptic, flip phone)', '동료':'the fellow farmer in the flashback'}

def instruction(pid):
    parts=[]
    for panel,hint,role,text in DLG[pid]:
        spk=""
        for name,desc in SPEAKERS.items():
            if text.startswith(name+": "):
                text=text[len(name)+2:]; spk=f", spoken by {desc}, balloon tail pointing at that character, do NOT letter the speaker's name"
                break
        parts.append(f"(panel {panel}{spk}) in {DESC.get(role,'a balloon')}: ‘{text.replace(chr(10),' ')}’")
    if pid in BANDS:
        parts.append("at the very bottom, a parchment caption band reading: ‘"+BANDS[pid].replace(chr(10),' ')+"’")
    return "KOREAN LINES TO LETTER (render each cleanly inside its balloon/box):\n"+"\n".join(parts)

def gen(c,pid):
    spec=clean_spec(PAGES[pid])
    prompt=f"{RULES_TEXT}\n\nPAGE CONTENT: {spec}\n\n{instruction(pid)}\n\n{CHARS}\n\nSTYLE: {g.STYLE}"
    print("generating EP2v2", pid, g.MODEL, "...")
    r=c.images.generate(model=g.MODEL, prompt=prompt, size="1024x1536", quality="high")
    g.save_b64(r.data[0].b64_json, os.path.join(FINAL, pid+".png"))

def main():
    args=sys.argv[1:] or ["all"]
    allids=[f"p{i:02d}" for i in range(1,29)]
    if args==["all"]: ids=allids
    elif args==["rest"]: ids=[p for p in allids if not os.path.exists(os.path.join(FINAL,p+".png"))]
    else: ids=args
    c=client()
    for pid in ids:
        try: gen(c,pid); time.sleep(1)
        except Exception as e: print("ERROR",pid,e)

if __name__=="__main__": main()
