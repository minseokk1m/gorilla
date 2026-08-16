#!/usr/bin/env python3
# 고릴라 헌터스 Ep7 "실용주의자의 떼거리 심리" — 양의 피드백과 표준의 탄생 — gpt-image-2 (~30장)
# usage: python3 gen_ep7.py all | rest | p05 ...
import os, sys, re, time
from openai import OpenAI
import gen_images as g

BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep7"); KEYF = os.path.join(BASE, "openai_key.txt")
os.makedirs(FINAL, exist_ok=True)

def client():
    key = os.environ.get("OPENAI_API_KEY")
    for f in (KEYF, getattr(g, "KEYF", "")):
        if not key and f and os.path.exists(f): key = open(f).read().strip()
    if not key: sys.exit("API 키 없음: " + KEYF)
    return OpenAI(api_key=key, timeout=420.0, max_retries=2)

CHARS = (g.CHARS +
    " EP7 RECURRING: HAN SIL-SOK (40s pragmatist 'Early Majority' everyman, neat shirt and knit vest, "
    "metal glasses, calm and careful).")

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
 "p01":"A cinematic chapter-title page. A crowd silhouette all rushing the same direction toward a single '1등' flag on a hill that is lit by a spotlight; the herd converges on the leader. Leave a clean dark band across the center for the episode title. Korean webtoon chapter cover.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL why the crowd all moves one way; JU BON-JIL calm. (2 ~45% close-up) JU BON-JIL with a knowing look.",
 "p03":"Two panels, study room. (1 ~55%) HAN TANG-SU (red cap) proudly holding up his smartphone showing a 'buy' screen for a 3rd-place cloud-related stock; cocky. (2 ~45%) NA BAE-UM glancing at him with mild worry.",
 "p04":"Two panels. (1 ~55%) HAN TANG-SU boasting about buying the cheap 3rd-place stock; members reacting. (2 ~45%) HAN TANG-SU's confident grin.",
 "p05":"One panel (~100%). A whiteboard cloud market-share bar chart: a tall 'AWS' bar (leader), a tall 'Azure' bar (2nd), and small '그 외' bars; 1st and 2nd overwhelmingly large; JU BON-JIL pointing. Clean English labels AWS, Azure.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL explaining that pragmatists only buy the verified 1st and 2nd; NA BAE-UM noting. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p07":"Two panels. (1 ~55%) HAN TANG-SU's confident face starting to waver, uneasy. (2 ~45%) a small share-chart shadow behind him.",
 "p08":"Two panels. (1 ~55%) NA BAE-UM asking why only 1st and 2nd; JU BON-JIL turning to HAN SIL-SOK. (2 ~45%) HAN SIL-SOK's calm face. Panel 2 shows JU BON-JIL's face ONLY (grey-streaked hair, navy crewneck sweater, NO vest).",
 "p09":"Two panels. (1 ~55%) HAN SIL-SOK (pragmatist) explaining his choice calmly; NA BAE-UM listening. (2 ~45%) HAN SIL-SOK matter-of-fact close-up. HAN SIL-SOK ONLY speaks on this page: BLACK hair, 40s, knit VEST over a neat shirt, thin metal glasses; JU BON-JIL (grey hair, navy sweater) must NOT appear.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL turning to the whiteboard to draw a loop; NA BAE-UM ready. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p11":"One panel (~100%). A whiteboard POSITIVE FEEDBACK LOOP drawn as a circular arrow diagram with clean Korean labels around the circle: '실용주의자가 1등 선택' → '도구·파트너·교육이 더 붙음' → '또 새 실용주의자가 1등 선택' → (loops back); the circle growing larger as the leader strengthens; JU BON-JIL beside.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL tracing the loop, explaining the first half; NA BAE-UM following. (2 ~45%) close on the loop arrows.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL completing the loop point, emphatic; NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p14":"One panel (~100%). The same loop diagram, now with the circle clearly enlarged and the leader bar towering; a small side label 'AI 빅테크가 HBM을 사면 SK하이닉스·삼성에 자본·생태계가 쏠린다'; JU BON-JIL pointing. The whiteboard shows EXACTLY one circular 3-label loop diagram (arrows in a circle), labels ONLY: '실용주의자가 1등 선택' / '도구·파트너·교육이 더 붙음' / '또 새 실용주의자가 1등 선택'; NO hub-and-spoke shape, NO other node labels.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL adding that memory follows the same path; NA BAE-UM impressed. (2 ~45%) NA BAE-UM's understanding face.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM with a realization, the winner-takes-more idea clicking. (2 ~45%) NA BAE-UM's eyes lighting up.",
 "p17":"Two panels. (1 ~55%) JU BON-JIL summarizing the investor takeaway; NA BAE-UM noting. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p18":"Two panels. (1 ~55%) JU BON-JIL describing the loop as the gorilla's moat, calm and clear; NA BAE-UM absorbing. (2 ~45%) NA BAE-UM thoughtful.",
 "p19":"Two panels. (1 ~55%) NA BAE-UM applying it to his own past pick, rueful. (2 ~45%) close on his red chart.",
 "p20":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing a clean summary line; JU BON-JIL nodding in the background. (2 ~40%) the notebook close-up with a small loop doodle.",
 "p21":"Two panels. (1 ~55%) NA BAE-UM resolved, understanding settling. (2 ~45%) his thoughtful close-up.",
 "p22":"Two panels, quiet beat. (1 ~60%) NA BAE-UM alone, contemplative, negative space. (2 ~40%) his resolved eyes extreme close-up.",
 "p23":"Two panels. (1 ~55%) JU BON-JIL turning back to the group; HAN TANG-SU shrinking a little, anxious. (2 ~45%) HAN TANG-SU's worried face.",
 "p24":"Two panels. (1 ~55%) HAN TANG-SU anxiously asking about his 3rd-place stock; JU BON-JIL with a measured look. (2 ~45%) HAN TANG-SU's worried close-up.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL answering plainly about the fate of non-leaders; NA BAE-UM watching. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p26":"One panel (~100%). HAN TANG-SU's smartphone screen showing a red loss, his shoulders slumping; a small label '또 모멘텀만 쫓다 물림'; rueful comic-foil mood.",
 "p27":"Two panels. (1 ~55%) NA BAE-UM giving HAN TANG-SU a wry sympathetic glance. (2 ~45%) HAN TANG-SU dejected.",
 "p28":"One panel (~100%). In the background, two flags clash on a hilltop in silhouette (a standards war); JU BON-JIL's small figure in front, serious.",
 "p29":"Two panels. (1 ~55%) JU BON-JIL delivering the cliffhanger about the coming standards war; NA BAE-UM listening intently. (2 ~45%) the two clashing flags, dramatic.",
 "p30":"One panel (~100%). Closing chapter-end: two flags clashing on a hilltop; NA BAE-UM and JU BON-JIL small figures; reserve a black caption band across the very bottom for the next-episode preview. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band; NO white caption box; the two figures are SMALL distant silhouettes watching, NOT holding the flags; flag colors blue and red matching the previous page.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 07\n실용주의자의 떼거리 심리\n안전한 선택이 표준을 굳힌다\n시즌 1 · 정글에 입장하다')],
 "p02":[(1,'C','speech','이 군중은 왜\n다 같은 데로 몰리는 거예요?'),
        (2,'C','speech','마침 좋은 예가\n여기 하나 있네')],
 "p03":[(1,'C','speech','형, 저 3등 클라우드 관련주 샀어요\n싸 보여서!'),
        (2,'C','think','또 싼 거에 혹했네…')],
 "p04":[(1,'C','speech','3등이라 더 오를 거 같아서요'),
        (2,'C','think','불안한데, 라는 표정')],
 "p05":[(1,'C','speech','클라우드 점유율은\nAWS·Azure가 선두야'),
        (1,'C','narr','1·2등 막대가 압도적이었다')],
 "p06":[(1,'C','speech','한실속 같은 실용주의자는\n무조건 검증된 1·2등만 사'),
        (2,'C','think','3등은 잘 안 사는구나')],
 "p07":[(1,'C','think','어… 제 건 3등인데'),
        (2,'C','narr','한탕수 얼굴이 살짝 흔들렸다')],
 "p08":[(1,'C','speech','왜 1·2등만 사는 거예요?'),
        (2,'C','speech','실속 씨한테 직접 들어보자')],
 "p09":[(1,'C','speech','3등이요?\n우리 IT팀이 안 써봐서…'),
        (2,'C','speech','다들 쓰는 데로 가요')],
 "p10":[(1,'C','speech','여기서 무서운 구조가 생겨\n그려줄게'),
        (2,'C','think','구조라면…')],
 "p11":[(1,'C','speech','실용주의자가 1등을 더 사면\n도구·파트너·교육이 더 붙어'),
        (2,'C','think','원이 점점 커지네')],
 "p12":[(1,'C','speech','그럼 또 새 실용주의자가\n안심하고 1등을 선택해'),
        (2,'C','think','돌고 도는 루프구나')],
 "p13":[(1,'C','emph','안전한 선택이, 표준을 더 굳힌다'),
        (2,'C','think','선택이 표준을 만든다고?')],
 "p14":[(1,'C','speech','메모리도 같은 길목이야\nAI 빅테크가 HBM을 사면'),
        (1,'C','narr','SK하이닉스·삼성에 자본과 생태계가 쏠린다')],
 "p15":[(1,'C','speech','1등 곁에 다 모이니까\n격차가 더 벌어져'),
        (2,'C','think','쏠림이 가속되는구나')],
 "p16":[(1,'C','speech','이기는 쪽이\n더 이기는 구조네요…'),
        (2,'C','think','이게 고릴라의 힘이구나')],
 "p17":[(1,'C','speech','그래서 투자자는\n2등이 아니라 1등에 집중해'),
        (2,'C','think','루프를 탄 1등')],
 "p18":[(1,'C','speech','이 양의 피드백이\n고릴라의 해자야'),
        (2,'C','think','쉽게 안 무너지겠네')],
 "p19":[(1,'C','narr','내가 산 건 1등이 아니었다'),
        (2,'C','think','싸다고 산 게 함정이었네')],
 "p20":[(1,'C','speech','그러니까 떼거리 심리는…'),
        (2,'C','caption','실용주의자가 안전하게 1등으로 쏠림 → 양의 피드백 → 표준이 굳는다')],
 "p21":[(1,'C','think','싼 게 아니라, 표준을 사야 한다'),
        (2,'C','think','1등의 쏠림을 보라')],
 "p22":[(1,'C','think','군중은 비합리가 아니라\n안전을 택한 거였어'),
        (2,'C','think','그 안전이 표준을 만든다')],
 "p23":[(1,'C','speech','자, 그럼 한탕수\n네 3등주는 어떻게 될까'),
        (2,'C','think','어… 제 건…')],
 "p24":[(1,'C','speech','그럼 제 3등주는…?'),
        (2,'C','think','불안이 커진다')],
 "p25":[(1,'C','speech','기술이 좋아도\n실용주의자가 안 사면 2등에 머물기 쉬워'),
        (2,'C','think','쏠림을 못 타면 끝이구나')],
 "p26":[(1,'C','narr','한탕수의 화면이\n또 빨갛게 물들었다')],
 "p27":[(1,'C','think','또 모멘텀만 쫓다 물렸네…'),
        (2,'C','think','반면교사가 따로 없다')],
 "p28":[(1,'C','speech','근데 그 1등 자리\n어떻게 정해지는지 알아?'),
        (2,'C','think','표준 전쟁…?')],
 "p29":[(1,'C','speech','다음 화, 표준 전쟁의 본질\n더 좋은 기술이 이기는 게 아니야'),
        (2,'C','narr','두 깃발이, 고지에서 맞붙고 있었다')],
 "p30":[(1,'C','caption','Episode 7 끝 · 다음 화 · 아키텍처 전쟁\n(표준화는 전쟁이다)')],
}

BANDS = {
 "p06":'실용주의자는 검증된 1·2등만 산다 (AWS·Azure) · 3등은 안전하지 않다고 본다',
 "p13":'양의 피드백 루프 · 1등 선택 → 도구·파트너·교육이 더 붙음 → 또 1등 선택, 안전한 선택이 표준을 굳힌다',
 "p16":'이기는 쪽이 더 이긴다 = 고릴라의 해자 · 메모리도 같은 길(HBM→SK하이닉스·삼성 쏠림)',
 "p25":'기술이 좋아도 실용주의자의 쏠림을 못 타면 2등에 머문다 (한탕수의 3등주, 반면교사)',
}

# 이원복식 하단 해설 — PDF 조립 시 텍스트 합성(이미지 미포함), 선별 부여
NOTES = {
 "p01":'해설: 실용주의자의 행동 원리는 "무리와 함께 가자(Stick with the herd!)"다. 위험 관리·동료 참조사례·검증이 우선인 이 심리가 표준을 굳힌다',
 "p13":'해설: 양의 피드백(positive feedback) — 1등이 선택될수록 생태계(도구·인력·파트너)가 붙어 다음 선택도 1등으로 쏠린다. 하이테크 시장의 승자독식 원리',
 "p16":'해설: "이기는 쪽이 더 이긴다"는 고릴라 힘의 기반(폐쇄적이면서 공개된 구조, 높은 전환비용, 3가지 지배력)과 연결된다. 유승삼 강연 자료 참조',
 "p25":'투자 적용: 기술 우위만 보고 저평가 2·3등을 사는 것은 실용주의자의 쏠림 구조를 거스르는 베팅이다. 쏠림이 향하는 곳을 관찰하라',
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
    print("generating EP7", pid, g.MODEL, "...")
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
