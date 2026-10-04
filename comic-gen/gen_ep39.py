#!/usr/bin/env python3
# 고릴라 헌터스 Ep39 "왜 다들 안 사는가: 두 개의 캐즘과 다리" — 시즌 4 (30p, ④ 실전)
# 2026-10-04 작성. season4-plan.md Ep39 · v4 외전 5 흡수(ETF의 캐즘·전기차의 캐즘·이 만화의 역할) · 김선일 포지셔닝 반영 · Ep3 전기차 캐즘 복습 · Ep20 한실속 가입 회수
# ※ 실존 인물·로고 금지. 실제 투자클럽 언급 없음. 특정 종목 권유 아님 고지 유지
# usage: python3 gen_ep39.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP39"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep39")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP39 NOTE: the study room is the same as always (one whiteboard, long table, bookshelves). Cars are generic sleek electric sedans with NO badge or logo. "
               "Any phone or laptop screen shows ONLY blurred rectangular thumbnail shapes with NO readable text when specified, otherwise it is OFF. "
               "The anonymous COWORKER in the office-pantry memory scene (30s male, plain white office shirt, lanyard, no glasses) is NOT a study-group member and never appears in the study room.")

SPEAKERS_EXTRA = {'동료': 'the anonymous COWORKER (30s man, plain white office shirt, lanyard, no glasses; NOT a study-group member)'}

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

CHASM2 = ("a hand-drawn whiteboard sketch of TWO canyons side by side: the LEFT canyon labeled 'ETF' at its top with three short lines written on the canyon floor exactly '참조사례' / '시작법' / '매도법'; the RIGHT canyon labeled '전기차' at its top with three short lines on its floor exactly '충전' / '안전' / '완전완비'; small anonymous stick figures standing at the left rim of each canyon, nobody on the far side; ONLY these eight labels")
WP_ETF = ("a hand-drawn whiteboard sketch of a large circle labeled 'ETF' at its center, surrounded by four smaller circles attached to it like petals, labeled exactly '시작법', '매도법', '참조사례', '루틴'; above the sketch the heading 'ETF의 완전완비제품'; ONLY these six labels")
BRIDGE = ("a hand-drawn whiteboard sketch of a single canyon with a plank bridge across it; the bridge has exactly FOUR planks, each plank carrying ONE word: '원리', '루틴', '참조사례', '클럽'; small anonymous stick figures crossing from left to right; ONLY these four labels")
POS2 = ("a hand-drawn whiteboard card split in two: on the LEFT the sentence '일반인이 프로를 이긴다' with a thick red strike-through line across it; on the RIGHT the sentence '보통 사람의 능력을 최대로 이끈다' circled in green; ONLY these two sentences")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a wide canyon under a soft morning sky, a long plank bridge spanning it, and a line of ordinary people in everyday clothes walking across the bridge from left to right, seen from a distance; NO people's faces in detail, NO whiteboard, NO study room, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL two questions at once, counting on two fingers; the TALC five and HAN TANG-SU at the table; the whiteboard behind is completely BLANK. (2 ~45%) close on NA BAE-UM's genuinely puzzled face; exactly ONE balloon on this panel, NO reply balloon.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL smiling as if he had waited for this question, tapping the blank whiteboard with his marker; the whiteboard is completely BLANK. (2 ~45%) JU BON-JIL writing ONLY the single word '캐즘' large on the board.",
 "p04":f"One panel (~100%). The whiteboard shows {CHASM2}; JU BON-JIL to the side so that no hand covers any label; ONLY these labels.",
 "p05":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {CHASM2}; NA BAE-UM copying into his kraft hunting log. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p06":"Two panels. (1 ~55%) SHIN JUNG-HAE (50s, brown cardigan) raising a hand shyly, admitting she does not know what an ETF is; the group kind, nobody laughing; the whiteboard behind is out of focus with no readable text. (2 ~45%) HAN SIL-SOK (knit vest, glasses) turning to her with a warm nod.",
 "p07":"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) speaking from his seat, his balloon tail pointing at HIM, recalling how he only watched from the side until recently; JU BON-JIL listening. (2 ~45%) a small memory inset of Ep20 (present-day cast): HAN SIL-SOK raising his hand hesitantly at the round table, no readable text.",
 "p08":"Two panels. (1 ~55%) HAN TANG-SU (red cap) holding up his phone whose screen shows ONLY a dense grid of blurred rectangular thumbnail shapes with NO readable text; the group wincing at the noise. (2 ~45%) JU BON-JIL covering his ears comically.",
 "p09":f"One panel (~100%). The whiteboard shows {WP_ETF}; JU BON-JIL to the side so that no hand covers any label; ONLY these labels.",
 "p10":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {WP_ETF}; SHIN JUNG-HAE nodding slowly, understanding. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: 'ETF도 완전완비제품이 필요하다' / '상품만으로는 실용주의자가 안 산다'.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL drawing a car icon on the board beside a canyon sketch (no text); NA BAE-UM recognizing Ep3. (2 ~45%) a small inset of Ep3: a generic electric sedan silhouette fallen into a canyon while hybrid cars detour around the rim, no readable text, no badges.",
 "p12":"One panel (~100%). The whiteboard: a hand-drawn canyon with a generic electric sedan at the bottom and THREE small icons on the canyon floor with ONE label each: a charging plug labeled '충전', a flame labeled '안전', a puzzle piece with a missing corner labeled '완전완비'; a detour road around the rim with two small hybrid cars (no badges) and a small label on the road '우회'; JU BON-JIL to the side; ONLY these four labels.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY the canyon with the fallen electric sedan, the three icons labeled '충전', '안전', '완전완비', and the detour road labeled '우회'; AN MID-EO (flip phone) grunting in agreement. (2 ~45%) close on JU BON-JIL, firm and kind.",
 "p14":"Two panels. (1 ~55%) GO BI-JEON (navy suit) objecting that people are simply slow; JU BON-JIL shaking his head. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '캐즘은 구조적이다' / '사람이 바보라서가 아니다'.",
 "p15":f"One panel (~100%). The whiteboard shows {BRIDGE}; JU BON-JIL to the side so that no hand covers any label; ONLY these labels.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {BRIDGE}, pointing at the first plank; the group attentive. (2 ~45%) JU BON-JIL tapping the fourth plank '클럽' with a small smile, the same board ({BRIDGE}) behind him.",
 "p17":f"One panel (~100%). The whiteboard shows {POS2}; JU BON-JIL to the side so that no hand covers any sentence; ONLY these two sentences.",
 "p18":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {POS2}; HAN TANG-SU slightly deflated, NA BAE-UM nodding. (2 ~45%) a small inset of Ep1: the simple 3x3 grid with ONLY the center cell shaded mustard with a star, no other labels, no text.",
 "p19":"Two panels. (1 ~55%) JU BON-JIL looking around the table at all eight members, warm; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '이기는 게임이 아니라' / '최대로 이끄는 방법'.",
 "p20":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK standing beside the whiteboard which is completely BLANK, holding his own kraft hunting log, about to tell a story. (2 ~45%) close on HAN SIL-SOK's face, a little shy.",
 "p21":f"One panel (~100%), a recent-memory scene (last week, present day, NOT a period flashback) {INK}an ordinary office pantry with two coffee mugs: HAN SIL-SOK (knit vest, glasses) showing his open kraft hunting log to an anonymous COWORKER (30s male, plain white office shirt, lanyard, no glasses, NOT a study-group member); the log page shows ONLY faint blurred hand-written lines with NO readable text; NO other cast members appear.",
 "p22":f"Two panels, the same recent-memory office pantry scene (present day) {INK}(1 ~55%) the anonymous COWORKER (white shirt, lanyard) leaning in with interest, pointing at the log; his balloon tail points at HIM. (2 ~45%) HAN SIL-SOK answering with a modest shrug, his balloon tail pointing at HIM; NO other cast members appear.",
 "p23":f"Two panels. (1 ~55%) back in the study room: {LOCK_HS}HAN SIL-SOK finishing the story beside the completely BLANK whiteboard, the group quiet and moved. (2 ~45%) JU BON-JIL standing up from his seat, walking toward HAN SIL-SOK.",
 "p24":f"Two panels. (1 ~55%) JU BON-JIL beside HAN SIL-SOK, pointing back at the whiteboard which now shows {BRIDGE}, his finger on the plank '참조사례'. (2 ~45%) the whole group turning toward the reader with gentle faces, a direct-address beat; the whiteboard behind shows {BRIDGE}.",
 "p25":"One panel (~100%). A quiet wide shot of the study room from the doorway: the eight members around the long table under warm light, the whiteboard at the back completely BLANK; a large narration box at the top.",
 "p26":"One panel (~100%), five small vertical panels side by side (a five-strip), each with ONE member and ONE balloon: CHOI SIN-SANG (headphones) grinning; GO BI-JEON (navy suit) confident; HAN SIL-SOK (knit vest) calm; SHIN JUNG-HAE (cardigan) warm; AN MID-EO (flip phone) stern; plain backgrounds, no readable text.",
 "p27":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '캐즘은 구조적이다' / '참조사례가 다리다' / '보통 사람의 최대치'.",
 "p28":"Two panels. (1 ~55%) at the door NA BAE-UM asks JU BON-JIL what is left, the balloon tail pointing at NA BAE-UM (black hair, no glasses, charcoal shirt); JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL's face, half turned, the last lesson in his eyes; exactly ONE balloon on this panel.",
 "p29":f"One panel (~100%), {INK}a faint dreamy image: a vast jungle at dusk seen from a high ridge, one gorilla silhouette on a far hill, and in the foreground a kraft hunting log lying closed on a rock; NO people, NO readable text; exactly ONE narration box.",
 "p30":f"One panel (~100%). Closing chapter-end, {INK}the plank bridge over the canyon at sunset with the eight members as small silhouettes standing on the far side looking back; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 39\n왜 다들 안 사는가: 두 개의 캐즘과 다리\n참조사례가 다리다\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','나배움: 두 가지가 계속 걸려요\n좋은 AI ETF가 있는데 왜 다들 안 사요?\n전기차도 좋다면서 왜 하이브리드로 가요?'),
        (2,'C','speech','나배움: 둘 다 답은 아는 것 같은데 말이 안 돼요')],
 "p03":[(1,'C','speech','주본질: 두 질문의 답이 하나야\n3화에서 배운 그 단어'),
        (2,'C','label','캐즘')],
 "p04":[(1,'C','label','ETF'),(1,'C','label','전기차'),
        (1,'C','label','참조사례'),(1,'C','label','시작법'),(1,'C','label','매도법'),
        (1,'C','speech','주본질: 골짜기가 둘이야\n왼쪽은 ETF, 오른쪽은 전기차\n바닥에 적힌 게 빠진 조각이고')],
 "p05":[(1,'C','speech','주본질: 좋은 상품이 있어도\n보통 사람은 골짜기 이쪽에 서 있어\n건너갈 다리가 없으니까'),
        (2,'C','think','나배움: 상품이 좋은 것과 사는 건 다른 문제구나')],
 "p06":[(1,'C','speech','신중해: 저는 사실 ETF가 뭔지도 잘 몰라요\n어디서 어떻게 시작하는지도'),
        (2,'C','speech','한실속: 저도 그랬어요')],
 "p07":[(1,'C','speech','한실속: 20화 전까지 저는 옆에서 보기만 했어요\n상품이 나빠서가 아니라\n먼저 해 본 동료가 없어서요'),
        (2,'C','narr','참조사례가 없었다')],
 "p08":[(1,'C','speech','한탕수: 그리고 이거요, 매일 백 개씩 떠요\n오늘 사라, 내일 팔아라, 급등주'),
        (2,'C','speech','주본질: 잡음이 다리를 가려')],
 "p09":[(1,'C','label','ETF의 완전완비제품'),(1,'C','label','ETF'),
        (1,'C','label','시작법'),(1,'C','label','매도법'),(1,'C','label','참조사례'),(1,'C','label','루틴')],
 "p10":[(1,'C','speech','주본질: 4화에서 배운 완전완비제품이야\n상품 하나로는 실용주의자가 안 사\n어떻게 시작하고 언제 파는지, 누가 먼저 했는지\n그게 다 붙어야 완전완비제품이지'),
        (2,'C','narr','두 줄')],
 "p11":[(1,'C','speech','주본질: 전기차도 똑같아\n3화를 떠올려 봐'),
        (2,'C','narr','골짜기에 빠진 전기차, 가장자리로 돌아가는 하이브리드')],
 "p12":[(1,'C','label','충전'),(1,'C','label','안전'),(1,'C','label','완전완비'),(1,'C','label','우회'),
        (1,'C','speech','주본질: 충전이 불편하고, 안전이 불안하고\n완전완비제품이 아직 안 됐으니\n실용주의자는 하이브리드로 돌아가')],
 "p13":[(1,'C','speech','주본질: 자율주행도 몇 개 도시에서만 운전자 없이 달려\n골짜기를 건너는 중이지, 건넌 게 아니야'),
        (2,'C','speech','주본질: 캐즘은 구조야\n사람이 바보라서가 아니라')],
 "p14":[(1,'C','speech','고비전: 그래도 사람들이 너무 느린 거 아닌가요?\n저는 벌써 다 보이는데'),
        (1,'C','speech','주본질: 그게 선구자의 말투야\n실용주의자는 느린 게 아니라 다리를 기다리는 거야'),
        (2,'C','narr','두 줄')],
 "p15":[(1,'C','label','원리'),(1,'C','label','루틴'),(1,'C','label','참조사례'),(1,'C','label','클럽'),
        (1,'C','speech','주본질: 그래서 다리야\n판자 네 장이면 건너')],
 "p16":[(1,'C','speech','주본질: 원리는 이 만화 서른아홉 편이고\n루틴은 네 일지야'),
        (2,'C','speech','주본질: 그리고 참조사례와 클럽\n이 스터디가 한 일이 그거야')],
 "p17":[(1,'C','label','일반인이 프로를 이긴다'),(1,'C','label','보통 사람의 능력을 최대로 이끈다'),
        (1,'C','speech','주본질: 하나 바로잡자\n우리는 프로를 이기는 게임을 하는 게 아니야')],
 "p18":[(1,'C','speech','주본질: 산업도 주식도 지식이 중간인 보통 사람이\n자기 능력을 최대로 끌어내는 방법\n그게 고릴라 헌터스야'),
        (2,'C','narr','1화의 그 정중앙')],
 "p19":[(1,'C','speech','주본질: 정중앙이 너였고\n이 자리의 여덟이 전부 정중앙이야'),
        (2,'C','narr','두 줄')],
 "p20":[(1,'C','speech','한실속: 저도 하나 얘기해도 될까요\n지난주에 있었던 일인데요'),
        (2,'C','narr','실용주의자가 일지를 들고 일어섰다')],
 "p21":[(1,'C','narr','회사 탕비실, 지난주'),
        (1,'C','speech','한실속: 이게 제 분기 점검표예요\n한 분기에 네 칸만 채워요')],
 "p22":[(1,'C','speech','동료: 실속 씨가 한다니까 믿음이 가네\n나도 그 네 칸부터 해 볼까'),
        (2,'C','speech','한실속: 저도 옆에서 보기만 하다가 시작했어요\n먼저 한 사람이 있으면 쉬워요')],
 "p23":[(1,'C','speech','한실속: 그 동료가 어제 첫 칸을 채웠대요\n제가 누군가의 참조사례가 됐어요'),
        (2,'C','narr','주본질이 일어났다')],
 "p24":[(1,'C','speech','주본질: 그게 다리의 마지막 판자야\n실용주의자는 동료의 참조사례만 믿어\n당신이 그 판자가 된 거야'),
        (2,'C','narr','옆자리의 한실속에게 이 이야기를 권해 주세요\n그 참조사례가 누군가의 캐즘을 건너게 합니다')],
 "p25":[(1,'C','narr','이 만화는 다리를 놓으려고 그렸다\n원리와 루틴은 책이 주지만\n참조사례는 사람만 줄 수 있다')],
 "p26":[(1,'C','speech','최신상: 저는 벌써 건너가서 기다리고 있어요'),
        (2,'C','speech','고비전: 다리가 놓이기 전에 뛰어넘는 게 제 일이죠'),
        (3,'C','speech','한실속: 저는 판자 네 장을 확인하고 건넜어요'),
        (4,'C','speech','신중해: 저는 다들 건너면 따라갈게요'),
        (5,'C','speech','안믿어: 나는 이쪽이 좋소')],
 "p27":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p28":[(1,'C','speech','나배움: 그럼 이제 뭐가 남았어요?'),
        (2,'C','speech','주본질: 마지막 한 시간\n정글의 법칙, 그리고 다음 고릴라')],
 "p29":[(1,'C','narr','다음 시간이 마지막이다')],
 "p30":[(1,'C','caption','Episode 39 끝 · 다음 화 · 정글의 법칙\n(마지막 화 · 다음 고릴라는 네 눈으로)')],
}

BANDS = {
 "p04":'두 개의 캐즘 · ETF에는 참조사례·시작법·매도법이, 전기차에는 충전·안전·완전완비제품이 빠져 있다',
 "p09":'ETF의 완전완비제품 · 상품 + 시작법 + 매도법 + 참조사례 + 루틴 · 상품만으로는 실용주의자가 사지 않는다',
 "p13":'캐즘은 구조적이다 · 사람이 느린 게 아니라 다리가 없는 것',
 "p15":'다리의 판자 넷 · 원리(만화) · 루틴(일지) · 참조사례(동료) · 클럽',
 "p17":'프로를 이기는 게임이 아니다 · 지식이 중간인 보통 사람의 능력을 최대로 이끄는 방법',
 "p24":'실용주의자는 동료의 참조사례만 믿는다 · 당신이 누군가의 판자가 된다',
}

NOTES = {
 "p04":'해설: "두 개의 캐즘" 프레임은 v4 기획서의 외전 5(왜 다들 안 사는가)를 본편에 흡수한 것이다. 좋은 상품이 있어도 실용주의자·보수주의자가 사지 않는 이유를 Moore의 캐즘(선각수용자와 전기다수 사이의 골짜기)으로 설명한다',
 "p09":'해설: Moore의 완전완비제품(whole product)은 핵심 제품에 보조 제품·서비스·교육·커뮤니티가 붙어야 실용주의자가 산다는 개념이다(4화·24화). 이를 ETF에 적용하면 상품 자체 외에 시작법·매도법·참조사례·루틴이 완전완비제품의 조각이 된다. 본 만화의 해석이며 투자 권유가 아니다',
 "p12":'사실 확인: 전기차 캐즘은 3화의 프레임이다. 2026-10 기준 운전자 없는 로보택시는 텍사스·플로리다의 일부 도시에서만 운행되고 캘리포니아는 안전요원 동승 또는 리무진 허가 방식이며, 소비자용 무감독 자율주행은 출시되지 않았다(18화 해설 갱신). 골짜기를 "건너는 중"이지 건넌 것이 아니다',
 "p17":'해설: 포지셔닝 문장은 검토자 의견(김선일)을 반영해 수정했다. 고릴라 게임은 전문가를 이기는 기법이 아니라, 산업·주식 지식이 중간 수준인 보통 사람이 결정 횟수를 줄이고 길게 보유하는 방식으로 자기 능력을 최대로 끌어내는 방법론이다(1화 3×3 매트릭스의 정중앙)',
 "p22":'해설: Moore 원전의 캐즘 발생 원인은 가치관 차이다. "실용주의자들은 선구자들을 참조사례로 신뢰하지 않는다"(2화). 실용주의자는 자기와 같은 실용주의자 동료의 참조사례만 믿기 때문에, 한 명의 실용주의자가 먼저 건너는 것이 캐즘을 건너는 가장 강한 다리가 된다',
 "p25":'해설: 본 만화의 역할 선언이다. 본편(원리) + 사냥 일지(루틴) + 옆자리 동료(참조사례)가 ETF와 고릴라 게임의 완전완비제품을 채운다. 특정 상품·종목의 매수를 권하지 않으며, 본 자료는 NDA에 준하는 대외비다',
}

if __name__ == "__main__": run(globals())
