#!/usr/bin/env python3
# 고릴라 헌터스 Ep40 "정글의 법칙: 다음 고릴라는 네 눈으로" — 시즌 4 최종화 · 본편 완결 (33p, ④ 실전)
# 2026-10-04 작성. season4-plan.md Ep40 · v4 Ep40(정글의 법칙·다음 고릴라) 계승 · Ep1 첫 질문 수미상관 · 학습 지도 완성 · 외전 예고
# ※ 보드 발표자는 나배움(ABSOLUTE RULE 잠금). 실존 인물·로고 금지. 익명 신입은 캐스트가 아님. 수익률 수치는 적지 않는다
# usage: python3 gen_ep40.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP40"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep40")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP40 NOTE: the study room is the same as always. In this episode NA BAE-UM presents at the whiteboard and JU BON-JIL sits at the table unless stated otherwise. "
               "The anonymous NEWCOMER on the last pages (late-20s female, simple grey blouse, ponytail, holding a brand-new kraft notebook) is NOT a study-group member and appears ONLY on p30 and p31. "
               "AN MID-EO's smartphone on p29 is a plain dark slab with its screen OFF. No readable text on any phone, notebook or book unless specified.")

SPEAKERS_EXTRA = {'신입': 'the anonymous NEWCOMER (late-20s woman, grey blouse, ponytail, new kraft notebook; NOT a study-group member)'}

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, thin glasses, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

LAW1 = ("a hand-drawn CIRCULAR flow on the whiteboard titled '정글의 법칙': seven boxes arranged clockwise around a circle, connected by arrows, labeled in order exactly '불연속 혁신', '초기시장', '캐즘', '볼링앨리', '토네이도', '고릴라', '대체 위협', with the last arrow from '대체 위협' pointing back to '불연속 혁신' to close the loop; ONLY these eight labels (title plus seven boxes)")
TOOLMAP = ("a hand-drawn whiteboard card titled '도구 지도' with four stacked rows, each row a season name on the left and its tools on the right, exactly: '시즌 1 → 판별표 · 3×3' / '시즌 2 → 두 곡선 · 6등급 · 10대 원칙' / '시즌 3 → 4기준 · 대체 위협 · ETF의 역설' / '시즌 4 → 서식지 · 바구니 · 심사표 · 매도'; ONLY these labels")
EDGE3 = ("three hand-drawn icons in a row on the whiteboard with ONE label each: a single big button labeled '결정이 적다', a long road labeled '길게 든다', a calm clock labeled '단기 압박이 없다'; above them the heading '보통 사람의 우위'; ONLY these four labels")
GRID33 = ("a simple hand-drawn 3x3 grid with ONLY the center cell shaded mustard with a star, no other labels, no text in any other cell")
CHECK4 = ("a hand-drawn card titled '분기 점검표' with four numbered boxes in a row labeled exactly '① 채택 위치', '② 기대 위치', '③ 등급', '④ 신호'")
ROADMAP = ("the LEARNING ROADMAP: four boxes '① 기술수용주기 이해', '② 사례로 익히기', '③ 투자와 연결', '④ 실전', ALL FOUR carrying big GREEN check marks, brackets '시즌 1' under ①② and '시즌 2' under ③④; beneath box ③ a small extra tag '심화' with a second green check, and beneath box ④ a small extra tag '실전 2' with a second green check; ONLY these labels")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a vast jungle panorama at golden hour, a gorilla silhouette on a far misty hill, and in the near foreground two hunters' silhouettes (one taller with a marker in hand, one with a notebook) standing side by side on a ridge looking out; NO faces in detail, NO whiteboard, NO study room, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL to sum up two years; the whole group present including the TALC five and HAN TANG-SU; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL shaking his head with a smile and holding out his marker toward NA BAE-UM.",
 "p03":f"Two panels. (1 ~55%) NA BAE-UM taking the marker, surprised; JU BON-JIL sitting down at the table. (2 ~45%) {LOCK_NB}NA BAE-UM standing in front of the completely BLANK whiteboard, taking a breath, marker raised; exactly ONE balloon on this panel.",
 "p04":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM writing ONLY the heading '정글의 법칙' on the board. (2 ~45%) close on the marker finishing a large circle under the heading (no boxes yet, no other text).",
 "p05":f"One panel (~100%). {LOCK_NB}The whiteboard shows {LAW1}; NA BAE-UM stands fully to the side so that NO hand covers any label; ONLY these labels.",
 "p06":f"One panel (~100%). {LOCK_NB}The whiteboard shows {LAW1}; NA BAE-UM pointing at the box '불연속 혁신', then '초기시장'; a small inset at the lower corner of the panel: an old Iowa cornfield with anonymous farmers in 1940s clothes (no readable text).",
 "p07":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {LAW1}, tapping '캐즘' and '볼링앨리'; small inset: a generic electric sedan in a canyon (no badge). (2 ~45%) small inset: bowling pins falling in a chain, no text.",
 "p08":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {LAW1}, tapping '토네이도' and '고릴라'; small inset: a tornado over a server rack, no text. (2 ~45%) {LOCK_NB}NA BAE-UM tapping '대체 위협' and the closing arrow; small inset: a cracked throne, no text.",
 "p09":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM stepping back from the whiteboard which shows {LAW1}, the group quiet. (2 ~45%) close on JU BON-JIL at the table, eyes a little wet, proud; exactly ONE balloon on this panel.",
 "p10":"Two panels. (1 ~55%) HAN TANG-SU (red cap) raising a hand, asking whether the picture ever changes; NA BAE-UM at the board turning to him. (2 ~45%) NA BAE-UM's notebook on the table, close-up: ONLY these hand-written lines: '70년 전 옥수수밭' / '오늘의 AI' / '같은 그림'.",
 "p11":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM answering firmly beside the whiteboard which shows {LAW1}. (2 ~45%) NA BAE-UM erasing a side section of the board, the circle still visible on the other side (no new text yet).",
 "p12":f"One panel (~100%). {LOCK_NB}The whiteboard shows {TOOLMAP}; NA BAE-UM stands fully to the side so that NO hand covers any label; ONLY these labels.",
 "p13":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TOOLMAP}, pointing at the row '시즌 1'; small inset: the five-row checklist grid from Ep12 drawn tiny with no readable words. (2 ~45%) small inset: two overlapping curves (a bell and a hump) with no labels.",
 "p14":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TOOLMAP}, pointing at the rows '시즌 3' and '시즌 4'; small inset: a four-row card with no readable words. (2 ~45%) small inset: a blue sheet form with blank boxes, no readable words.",
 "p15":f"Two panels. (1 ~55%) AN MID-EO (flip phone) grumbling that there are too many tools; the whiteboard behind shows {TOOLMAP}. (2 ~45%) {LOCK_NB}NA BAE-UM drawing a small card next to the tool map: the whiteboard now shows {TOOLMAP} and, to its right, {CHECK4}; ONLY these labels.",
 "p16":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TOOLMAP} and {CHECK4}, holding up four fingers; AN MID-EO reluctantly satisfied. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '도구는 많아도' / '분기에 한 번, 네 칸'.",
 "p17":f"One panel (~100%). {LOCK_NB}The whiteboard shows {EDGE3}; NA BAE-UM stands fully to the side so that NO hand covers any label; ONLY these labels.",
 "p18":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {EDGE3}; HAN SIL-SOK nodding. (2 ~45%) {LOCK_NB}NA BAE-UM drawing {GRID33} in the corner of the board beside {EDGE3}; ONLY the EDGE labels, nothing written in the grid.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL speaking from his seat at the table, looking at the grid, his balloon tail pointing at HIM (seated, grey hair); the whiteboard behind shows {GRID33} beside {EDGE3}. (2 ~45%) the whole group around the table, each face lit a little; the whiteboard behind shows {GRID33} beside {EDGE3}.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM (black hair, no glasses, charcoal shirt) pausing, a little overwhelmed, the balloon tail pointing at HIM; the whiteboard behind is out of focus with no readable text. (2 ~45%) close-up of NA BAE-UM ONLY; JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p21":"One panel (~100%). NA BAE-UM's open kraft hunting log on the table, close-up, the last page: ONLY these hand-written lines: '2년 차 결산' / '거래 5번' / '분기 점검 4번' / '본업 그대로'; a small ticked checkbox; nothing else written, NO numbers other than these.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM at the table closing the log with a level, content face; JU BON-JIL beside him; the whiteboard behind is out of focus with no readable text. (2 ~45%) a small inset of Ep20: the cafe window seat, NA BAE-UM with the Gorilla Game book, no readable text on any screen.",
 "p23":"Two panels. (1 ~55%) HAN TANG-SU (red cap) standing up suddenly, declaring something, the group turning with wide eyes; the whiteboard behind is completely BLANK. (2 ~45%) SHIN JUNG-HAE (cardigan) holding up her record notebook with a small smile, its page showing ONLY faint blurred lines with no readable text.",
 "p24":"Two panels. (1 ~55%) the whole group laughing warmly, HAN TANG-SU bowing comically with his cap off; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL wiping an eye, laughing; exactly ONE balloon on this panel.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL turning to the TALC five with a final question, gesturing around the table; the whiteboard behind is completely BLANK. (2 ~45%) the five of them exchanging looks, the same order as always about to repeat; NO balloons on this panel.",
 "p26":"One panel (~100%), five small vertical panels side by side (a five-strip), each with ONE member and ONE balloon: CHOI SIN-SANG (headphones) eager; GO BI-JEON (navy suit) visionary; HAN SIL-SOK (knit vest) matter-of-fact; SHIN JUNG-HAE (cardigan) comfortable; AN MID-EO (flip phone) looking down at his flip phone; plain backgrounds, no readable text.",
 "p27":"Two panels. (1 ~55%) AN MID-EO slowly putting his old flip phone down on the table. (2 ~45%) AN MID-EO's hand picking up a plain dark smartphone (screen OFF) from the table for the first time, the group frozen in disbelief; NO balloons on this panel.",
 "p28":"Two panels. (1 ~55%) the whole group bursting into laughter and applause, HAN TANG-SU pointing at AN MID-EO's hand; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL laughing hardest, pointing at AN MID-EO.",
 "p29":"Two panels. (1 ~55%) JU BON-JIL explaining with a grin, the group still chuckling; AN MID-EO stern but holding the dark smartphone; the whiteboard behind is completely BLANK. (2 ~45%) AN MID-EO's face, the faintest smile, the smartphone in his hand with its screen OFF; exactly ONE balloon on this panel.",
 "p30":f"One panel (~100%), time skip. The study room on a different day, lit by afternoon sun: {LOCK_NB}NA BAE-UM standing alone at the completely BLANK whiteboard, marker in hand; at the long table sits ONLY the anonymous NEWCOMER (late-20s woman, grey blouse, ponytail) with a brand-new kraft notebook; NO other members present; JU BON-JIL is NOT in the room in this panel.",
 "p31":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM at the BLANK whiteboard asking the newcomer the very first question, warm; the NEWCOMER opening her notebook. (2 ~45%) the doorway: JU BON-JIL leaning on the door frame outside the room, half in shadow, smiling, speaking quietly; his balloon tail points at HIM; exactly ONE balloon on this panel.",
 "p32":f"One panel (~100%). The whiteboard shows ONLY {ROADMAP}; the whole club gathered in front of it in a group pose, JU BON-JIL at the side, NA BAE-UM at center holding his log, the newcomer at the edge; warm; ONLY these labels.",
 "p33":f"One panel (~100%). Closing SERIES finale, {INK}the jungle at sunrise seen from the ridge, the gorilla silhouette on the far hill, and the whole club as small silhouettes walking down into the jungle with notebooks; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 40\n정글의 법칙: 다음 고릴라는 네 눈으로\n정글의 법칙은 변하지 않는다\n시즌 4 최종화 · 본편 완결')],
 "p02":[(1,'C','speech','나배움: 2년 동안 배운 걸 한 번만 정리해 주세요\n마지막이잖아요'),
        (2,'C','speech','주본질: 아니, 네가 정리해\n오늘은 내가 앉아서 듣는다')],
 "p03":[(1,'C','speech','나배움: 제가요?'),
        (2,'C','think','나배움: 1화 때 이 자리에 선 분을 보기만 했는데')],
 "p04":[(1,'C','label','정글의 법칙'),
        (2,'C','narr','동그라미부터 그렸다')],
 "p05":[(1,'C','label','정글의 법칙'),(1,'C','label','불연속 혁신'),(1,'C','label','초기시장'),(1,'C','label','캐즘'),
        (1,'C','speech','나배움: 일곱 칸이 한 바퀴예요\n기술과 회사는 바뀌어도 이 바퀴는 안 바뀌어요')],
 "p06":[(1,'C','label','볼링앨리'),(1,'C','label','토네이도'),(1,'C','label','고릴라'),(1,'C','label','대체 위협'),
        (1,'C','speech','나배움: 불연속 혁신이 오면 선구자들이 초기시장을 만들어요\n70년 전 아이오와 옥수수밭도 그랬죠')],
 "p07":[(1,'C','speech','나배움: 그다음 골짜기, 전기차가 지금 거기 있고요\n건너면 핀이 하나씩 넘어가요, 코파일럿처럼'),
        (2,'C','narr','핀이 연쇄로 넘어간다')],
 "p08":[(1,'C','speech','나배움: 실용주의자가 줄을 서면 토네이도\n거기서 고릴라가 태어나요, 그 GPU 회사처럼'),
        (2,'C','speech','나배움: 그리고 언젠가 대체 위협이 와서\n왕좌의 무게가 옮겨 가요, 옛 CPU 회사처럼\n그러면 바퀴는 처음으로 돌아가요')],
 "p09":[(1,'C','speech','나배움: 70년 전 옥수수밭과 오늘 AI가 같은 그림이에요'),
        (2,'C','think','주본질: 다 들어 있다')],
 "p10":[(1,'C','speech','한탕수: 이 그림, 진짜 안 바뀌어요?\n이번엔 다르다는 말이 매번 나오잖아요'),
        (2,'C','narr','세 줄')],
 "p11":[(1,'C','speech','나배움: 이번엔 다르다는 말이 나올 때마다\n바퀴는 똑같이 돌았어요\n바뀌는 건 바퀴가 아니라 이름이에요'),
        (2,'C','narr','옆 칸을 지웠다')],
 "p12":[(1,'C','label','도구 지도'),(1,'C','label','시즌 1 → 판별표 · 3×3'),(1,'C','label','시즌 2 → 두 곡선 · 6등급 · 10대 원칙'),
        (1,'C','label','시즌 3 → 4기준 · 대체 위협 · ETF의 역설'),(1,'C','label','시즌 4 → 서식지 · 바구니 · 심사표 · 매도'),
        (1,'C','speech','나배움: 바퀴의 어디에 서 있는지 보는 도구들이에요')],
 "p13":[(1,'C','speech','나배움: 판별표로 초기시장인지 골짜기를 건넜는지 보고\n두 곡선으로 기대와 채택을 따로 봐요'),
        (2,'C','narr','겹친 두 곡선')],
 "p14":[(1,'C','speech','나배움: 4기준으로 진짜 고릴라인지 해부하고\n서식지에서 바구니로, 심사표로, 그리고 매도까지'),
        (2,'C','narr','파란 서식 한 장')],
 "p15":[(1,'C','speech','안믿어: 도구가 너무 많소\n나 같은 사람은 못 외우오'),
        (2,'C','label','분기 점검표'),(2,'C','label','① 채택 위치'),(2,'C','label','② 기대 위치'),(2,'C','label','③ 등급'),(2,'C','label','④ 신호')],
 "p16":[(1,'C','speech','나배움: 외울 필요 없어요\n분기에 한 번, 이 네 칸만 채우면\n도구들은 알아서 따라와요'),
        (2,'C','narr','두 줄')],
 "p17":[(1,'C','label','보통 사람의 우위'),(1,'C','label','결정이 적다'),(1,'C','label','길게 든다'),(1,'C','label','단기 압박이 없다'),
        (1,'C','speech','나배움: 마지막 한 장이에요\n왜 이 게임이 우리 같은 사람한테 맞는지')],
 "p18":[(1,'C','speech','나배움: 결정이 적고, 길게 들고, 매일 볼 필요가 없어요\n전문가가 못 가진 세 가지를 우리가 가졌어요'),
        (2,'C','narr','구석에 작은 격자를 그렸다')],
 "p19":[(1,'C','speech','주본질: 1화의 그 정중앙이 너였어\n그리고 이 자리의 여덟이 전부'),
        (2,'C','narr','아무도 말을 잇지 않았다')],
 "p20":[(1,'C','speech','나배움: 잠깐만요, 숨 좀 돌리고요'),
        (2,'C','think','나배움: 내가 이 그림을 다 그렸구나')],
 "p21":[(1,'C','label','2년 차 결산'),(1,'C','label','거래 5번'),(1,'C','label','분기 점검 4번'),(1,'C','label','본업 그대로'),
        (1,'C','narr','일지의 마지막 장')],
 "p22":[(1,'C','narr','평범한 해였다, 그래서 복리의 해였다\n숫자는 적지 않았다, 적을 필요가 없었다'),
        (2,'C','narr','작년의 그 카페 자리는 이제 가끔만 들른다')],
 "p23":[(1,'C','speech','한탕수: 저도요! 저도 올해 규칙을 다 지켰어요\n하나도 안 어겼어요'),
        (2,'C','speech','신중해: 기록에 있어요\n정말이에요')],
 "p24":[(1,'C','narr','모두가 웃었다, 탕수가 제일 크게'),
        (2,'C','speech','주본질: 2년 걸렸지만 결국 왔네')],
 "p25":[(1,'C','speech','주본질: 마지막 질문\n다음 고릴라, 다들 어디쯤 서 있어?')],
 "p26":[(1,'C','speech','최신상: 저는 HBF 벌써 보고 있어요'),
        (2,'C','speech','고비전: 온디바이스가 미래예요'),
        (3,'C','speech','한실속: 에이전트는 회사도 도입했어요'),
        (4,'C','speech','신중해: AI는 이제 익숙해요'),
        (5,'C','speech','안믿어: 글쎄…')],
 "p27":[(1,'C','narr','그런데 그날, 폴더폰이 테이블에 내려놓였다')],
 "p28":[(1,'C','speech','한탕수: 어르신이 스마트폰을!'),
        (2,'C','speech','주본질: 이걸 보려고 2년을 기다렸어')],
 "p29":[(1,'C','speech','주본질: 회의론자가 움직이면 완전동화야\n기술수용주기의 마지막 칸이 닫힌 거지'),
        (2,'C','speech','안믿어: 전화만 걸 거요')],
 "p30":[(1,'C','narr','그리고 몇 달 뒤')],
 "p31":[(1,'C','speech','나배움: 왜 고릴라 헌터스인지부터 얘기해 볼까요'),
        (1,'C','speech','신입: 네, 처음이라 아무것도 몰라요'),
        (2,'C','speech','주본질: 다음 고릴라는, 네 눈으로 찾을 수 있잖아')],
 "p32":[(1,'C','label','① 기술수용주기 이해'),(1,'C','label','② 사례로 익히기'),(1,'C','label','③ 투자와 연결'),(1,'C','label','④ 실전'),
        (1,'C','label','심화'),(1,'C','label','실전 2')],
 "p33":[(1,'C','caption','고릴라 헌터스 본편 끝 · 40화 완결 · 외전 시장 라이브로 이어집니다\n(분기 1회 · 지금 정글에서 무슨 일이)')],
}

BANDS = {
 "p05":'정글의 법칙 · 불연속 혁신 → 초기시장 → 캐즘 → 볼링앨리 → 토네이도 → 고릴라 → 대체 위협 → 다시 처음',
 "p12":'도구 지도 · 시즌 1 판별표·3×3 · 시즌 2 두 곡선·6등급·10대 원칙 · 시즌 3 4기준·대체 위협·ETF의 역설 · 시즌 4 서식지·바구니·심사표·매도',
 "p16":'도구는 많아도 루틴은 하나 · 분기에 한 번, 네 칸(채택 위치·기대 위치·등급·신호)',
 "p17":'보통 사람의 우위 · 결정이 적다 · 길게 든다 · 단기 압박이 없다 · 3×3의 정중앙',
 "p21":'2년 차 결산 · 거래 다섯 번, 분기 점검 네 번, 본업 그대로 · 평범한 해가 복리의 해',
 "p29":'회의론자가 움직이면 완전동화 · 기술수용주기의 마지막 칸',
 "p32":'학습 지도 완성 · ①② 시즌 1 · ③④ 시즌 2 · 심화(시즌 3) · 실전 2(시즌 4)',
}

NOTES = {
 "p02":'해설: 마지막 화에서는 학습자 나배움이 화이트보드를 맡고 멘토 주본질은 테이블에 앉는다. 1화에서 멘토가 서 있던 자리를 학습자가 이어받는 구성이다',
 "p05":'해설: "정글의 법칙" 원형 도식은 Moore 3부작(Crossing the Chasm 1991, Inside the Tornado 1995, The Gorilla Game 1998)의 시장개발 모델(초기시장 → 캐즘 → 볼링앨리 → 토네이도 → 중심가 → 완전동화)과 고릴라 게임의 대체 위협(원칙 4)을 한 바퀴로 이은 본 만화의 요약 도식이다. 출처: 제프리 무어의 고릴라 게임, © The Chasm Group',
 "p06":'해설: 아이오와 옥수수밭은 확산 이론의 뿌리인 Ryan과 Gross의 잡종 옥수수 연구(1943)를 가리킨다(2화). 혁신수용자·선각수용자가 먼저 심고 실용주의자가 이웃의 결과를 보고 따라 심는 순서가 오늘의 기술수용주기와 같다',
 "p08":'사실 확인: "옛 CPU 회사"는 PC 시대 표준 동맹의 한 축이던 인텔을 가리킨다(27화·29화). 2026년 기준 이 회사는 매출이 반등하며 회복을 시도 중이므로 본 만화는 "쇠락"이 아니라 "왕좌의 무게가 AI 데이터센터로 옮겨 간 사례"로만 서술한다(2026-10 기준). 특정 종목의 매수·매도를 권하지 않는다',
 "p12":'해설: 도구 지도에서 Moore 원전의 개념은 기술수용주기·캐즘·토네이도·6등급·4기준·10대 원칙이고, 판별표 5행·두 곡선 겹치기·2축 매트릭스·대체 위협 3단계·서식지·심사표·매도 5가지는 본 만화와 클럽이 운영을 위해 만든 보조 도구다(30화 고지). 본 뼈대는 Moore에 한정한다',
 "p17":'해설: 1화의 3×3 지식 매트릭스에서 산업 지식과 투자 지식이 모두 중간인 정중앙이 이 만화의 독자다. 고릴라 게임은 결정 횟수가 적고 보유 기간이 길어 단기 압박이 없기 때문에, 본업을 가진 보통 사람이 전문가 대비 불리하지 않은 거의 유일한 투자 영역이다(39화 포지셔닝 참조)',
 "p21":'해설: 결산 수치는 가상이며 수익률은 의도적으로 적지 않았다. 20화의 +28%가 "운이 좋았던 해"였다면 2년 차는 평범한 해이고, 목표는 특정 해의 수익이 아니라 은행 이자보다 나은 수익을 복리로 오래 쌓는 것이다(10화 Rule of 72: 연 10%면 약 7.2년에 두 배)',
 "p29":'해설: 완전동화(End of Life)는 회장님 번역 체계에서 기술수용주기의 마지막 단계로, 지각수용자(회의론자)까지 받아들여 기술이 일상이 되는 시점이다. 이후에는 첨단기술 마케팅이 아니라 소비재 마케팅이 적용된다(terminology §3)',
 "p33":'출처: 제프리 무어의 고릴라 게임 · © The Chasm Group · 한글판 용어는 유승삼 역 캐즘마케팅·토네이도마케팅 기준 · 본 자료는 NDA에 준하는 대외비이며 특정 종목·상품의 매수·매도를 권하지 않습니다 · 외전 「시장 라이브」는 분기 1회 갱신 예정',
}

if __name__ == "__main__": run(globals())
