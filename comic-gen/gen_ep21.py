#!/usr/bin/env python3
# 고릴라 헌터스 Ep21 "고릴라의 뼈대 ① 독점 아키텍처" — 시즌 3 (31p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep21 · Moore 4기준 1번(Proprietary Architecture) · Ep18 FOURCARD 1행 채움 · Ep16 CUDA 복습 · 김선일(TPU=NPU 계열) 반영
# ※ 실존 인물 얼굴·실제 로고 금지. 회사명은 보드 라벨로만. 가상 종목 A·B·C는 가상 고지.
# usage: python3 gen_ep21.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP21"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep21")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP21 NOTE: the '고릴라 4기준' card is always a clean hand-drawn whiteboard card with EXACTLY the rows listed. "
               "Company and product names appear ONLY as the clean labels specified on the whiteboard; NEVER real logos, real product photos or real executives' faces. "
               "Smartphones in the cast's hands are generic black slabs with NO brand mark and the screen OFF unless specified.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NA = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

FOURCARD_Q = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → ?' / '전환비용 → ?' / '네트워크 효과 → ?' / '완전완비제품 → ?'; nothing else written on the card")
FOURCARD_1 = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → ?' / '네트워크 효과 → ?' / '완전완비제품 → ?'; the first row underlined in red; nothing else written on the card")
Q1 = ("the single heading line '① 따라 하려면 처음부터 다시 만들어야 하는가' written large across the top of the whiteboard")
PROP2 = ("a hand-drawn two-column comparison table titled '독점 아키텍처 vs 개방 표준' with column headers '독점 아키텍처' (left) and '개방 표준' (right), three row labels down the far left '규격을 누가 정하나', '옮길 수 있나', '정글', and cell texts row by row '한 회사' / '표준기구' ; '못 옮긴다' / '옮긴다' ; '영장류' / '킹덤'; nothing else on the board")
MEAS1 = ("a hand-drawn card titled '측정법 셋' with three numbered lines exactly: '① 이 위에서만 도는 것이 몇 개인가' / '② 경쟁사 제품으로 그대로 옮겨지는가' / '③ 규격을 누가 정하나'; a small ruler icon")
FENCE2 = ("on the LEFT a hand sketch of a small fenced yard with a single house inside, labeled '특허 = 담장'; on the RIGHT a hand sketch of a city street grid with many small houses along the streets, labeled '아키텍처 = 도시 계획'; ONLY these two labels")
CARDS3 = ("three small blank cards pinned in a row labeled ONLY 'A', 'B', 'C', each with three tiny empty boxes beneath it")
CARDS3F = ("three small cards pinned in a row labeled 'A', 'B', 'C'; beneath card A three tiny boxes reading 'O', 'O', 'O'; beneath card B three tiny boxes reading 'X', 'O', 'X'; beneath card C three tiny boxes reading 'X', 'X', 'X'; nothing else")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a large gorilla drawn as a translucent ink silhouette seen from the side, inside which four bones (the skull, the spine, the ribcage, one forearm) glow warm gold against a dark jungle background; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL opening the new season with a relaxed smile, the whole group present including the TALC five and HAN TANG-SU; the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM opening a fresh page of his kraft hunting log, eager.",
 "p03":f"One panel (~100%). The whiteboard shows {FOURCARD_Q}; JU BON-JIL to the side, pointing at the four question marks; ONLY these labels.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {FOURCARD_Q}; HAN TANG-SU (red cap) slumping comically. (2 ~45%) close on JU BON-JIL's calm face.",
 "p05":f"One panel (~100%). The whiteboard shows ONLY {Q1}; the rest of the board is blank; JU BON-JIL to the side, marker capped, looking at the group; ONLY this one line.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard corner (his speech balloon tail points at HIM), the corner showing a hand sketch of a padlock with a single oddly shaped key beside it, and next to that a plain standard screw with a nut; ONLY the two labels '열쇠' and '규격 나사'. (2 ~45%) NA BAE-UM (black hair, no glasses, charcoal shirt) asking, the balloon tail pointing at him; plain background.",
 "p07":"Two panels. (1 ~55%) JU BON-JIL writing ONLY two short lines on the board: '안은 잠그고' and '밖은 연다'; nothing else on the board. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p08":f"One panel (~100%). A flashback inset of the Ep16 research lab {INK}(no readable text in the inset): rows of monitors all showing ONLY abstract green code blocks, anonymous young researchers at desks, NONE of the study-group cast inside the inset; a single clean label box '모든 코드가 CUDA' at the top; beneath the inset a narrow strip of the study room with JU BON-JIL speaking.",
 "p09":"Two panels. (1 ~45%) CHOI SIN-SANG (headphones around neck) holding up a generic black smartphone with the screen OFF and NO brand mark, excited. (2 ~55%) the whiteboard: a hand sketch of a phone drawn as two stacked layers bolted together labeled '운영체제' (top layer) and '칩' (bottom layer), and above the phone a cloud of many tiny app squares with the single label '앱은 누구나'; ONLY these three labels; JU BON-JIL to the side of the board, his speech balloon tail pointing at HIM.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the letters 'TPU' with a small square chip sketch beside it and a short line beneath '자기 스택'; nothing else on the board. (2 ~45%) GO BI-JEON (navy suit, tablet under arm (screen OFF)) asking from the table.",
 "p11":"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY the letters 'TPU', a small square chip sketch and the line '자기 스택'; HAN SIL-SOK nodding. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '사례 셋 · CUDA · 폰의 OS+칩 · TPU' / '방식은 달라도 내 위에서만 돌게'.",
 "p12":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK writing ONLY the letters 'JEDEC' and beneath them '표준 DRAM' on the whiteboard; nothing else on the board. (2 ~45%) close on HAN SIL-SOK, precise and calm.",
 "p13":"Two panels. (1 ~55%) the whiteboard corner: a hand sketch of an opened desktop PC case with parts floating out of it (a board, a drive, a memory stick), with the single label '조립 PC'; JU BON-JIL to the side. (2 ~45%) AN MID-EO (stern, flip phone) muttering from the table.",
 "p14":f"One panel (~100%). The whiteboard shows {PROP2}; JU BON-JIL stands fully to the side so that no hand covers any cell; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {PROP2}; NA BAE-UM copying fast. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p16":f"One panel (~100%). The whiteboard shows {MEAS1}; JU BON-JIL to the side; ONLY these labels.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL tapping line ① beside the whiteboard which shows {MEAS1}; the group attentive. (2 ~45%) CHOI SIN-SANG counting on his fingers, bright.",
 "p18":f"One panel (~100%). {LOCK_NA}The whiteboard shows {MEAS1} on the left and, on the right, {CARDS3}; every tiny box is completely EMPTY (nothing written yet); ONLY the card labels and the three letters.",
 "p19":f"One panel (~100%). {LOCK_NA}The whiteboard shows {MEAS1} on the left and, on the right, {CARDS3F}; NA BAE-UM pointing at card B; ONLY these labels and marks.",
 "p20":"Two panels. (1 ~55%) HAN TANG-SU (red cap) raising his hand high, phone (screen OFF) in the other hand; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL amused, one eyebrow up.",
 "p21":f"One panel (~100%). The whiteboard shows {FENCE2}; JU BON-JIL to the side; nothing else on the board.",
 "p22":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {FENCE2}; the group following. (2 ~45%) SHIN JUNG-HAE (cardigan) asking gently from the table.",
 "p23":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the line '이 회사가 사라지면 카테고리가 멈추는가' on the whiteboard; nothing else on the board. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p24":f"One panel (~100%). The whiteboard shows {FOURCARD_1}; JU BON-JIL has just finished writing the first row and steps back; ONLY these labels.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '① 자체 아키텍처 = 규격을 내가 쥔다' / '비밀이 아니라 길, 안은 잠그고 밖은 연다'.",
 "p26":"Two panels. (1 ~55%) AN MID-EO (stern, flip phone pointed like a gavel) objecting, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL nodding fairly, not defensive.",
 "p27":"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) writing the objection into the club log, the recorder role; the kraft log open with NO readable text. (2 ~45%) HAN TANG-SU grinning at AN MID-EO, the group lightly amused; the whiteboard behind is completely BLANK.",
 "p28":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL a question, the balloon tail pointing at NA BAE-UM; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL smiling, hand on the door frame.",
 "p29":f"One panel (~100%). A quiet image {INK}a stone castle with its great gate standing wide open, and inside the walls a crowd of small anonymous people going about their day, none of them walking toward the open gate; soft evening light; NO readable text anywhere.",
 "p30":f"Two panels, quiet beat. (1 ~60%) evening, the room emptying, NA BAE-UM looking at the whiteboard which shows ONLY {FOURCARD_1}. (2 ~40%) NA BAE-UM's face, satisfied and curious.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK}the castle silhouette from before far away, the open gate glowing, a desk with the kraft notebook in the foreground; NA BAE-UM and JU BON-JIL small figures walking home; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 21\n고릴라의 뼈대 ① 독점 아키텍처\n등급은 배웠다, 이제 뼈대를 본다\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','주본질: 시즌 3 첫 시간이야\n18화의 4기준 카드를 기억하지?'),
        (1,'C','speech','나배움: 세레브라스가 넷 중 하나였죠'),
        (2,'C','narr','새 시즌, 새 장')],
 "p03":[(1,'C','label','고릴라 4기준'),(1,'C','label','자체 아키텍처 → ?'),(1,'C','label','전환비용 → ?'),(1,'C','label','네트워크 효과 → ?'),(1,'C','label','완전완비제품 → ?'),
        (1,'C','speech','주본질: 그때는 채점만 했어\n이번 시즌엔 한 화에 하나씩, 뼈대까지 해부한다')],
 "p04":[(1,'C','speech','한탕수: 네 개면 네 시간이에요?'),
        (2,'C','speech','주본질: 등급은 결과고 뼈대는 이유야\n이유를 알아야 균열도 보여')],
 "p05":[(1,'C','label','① 따라 하려면 처음부터 다시 만들어야 하는가'),
        (1,'C','speech','주본질: 첫째 질문은 이거 하나야\n경쟁자가 따라 하려면\n처음부터 다시 만들어야 하는가')],
 "p06":[(1,'C','label','열쇠'),(1,'C','label','규격 나사'),
        (1,'C','speech','주본질: 남의 열쇠로는 못 여는 자물쇠, 그게 독점이야\n규격 나사는 어느 공장 것이든 맞지'),
        (2,'C','speech','나배움: 그럼 독점은 비밀이라는 뜻이에요?')],
 "p07":[(1,'C','label','안은 잠그고'),(1,'C','label','밖은 연다'),
        (1,'C','speech','주본질: 아니, 독점이면서 공개야\n설계는 내가 쥐고\n그 위에 올라오는 건 누구나 환영'),
        (2,'C','think','나배움: 비밀이 아니라 규격을 쥐는 거구나')],
 "p08":[(1,'C','label','모든 코드가 CUDA'),
        (1,'C','narr','16화의 그 연구실'),
        (1,'C','speech','주본질: 칩을 바꾸면 처음부터 다시 짜야 했지\n첫째 질문에 예라고 답하는 회사야')],
 "p09":[(1,'C','speech','최신상: 제 폰도 그래요\n앱은 아무나 만들 수 있는데 칩은 못 바꿔요'),
        (2,'C','label','운영체제'),(2,'C','label','칩'),(2,'C','label','앱은 누구나'),
        (2,'C','speech','주본질: 하드웨어와 운영체제를 한 몸으로 잠갔어\n그 위의 앱은 열어 두고')],
 "p10":[(1,'C','label','TPU'),(1,'C','label','자기 스택'),
        (2,'C','speech','고비전: 그 검색 회사의 칩은 GPU와 다른 건가요?'),
        (2,'C','speech','주본질: 계열이 달라\n자기 도구와 자기 클라우드 위에서 도는 자기 스택이야\n남의 규격을 빌리지 않았지')],
 "p11":[(1,'C','speech','주본질: 셋 다 방식은 달라\n공통점은 하나, 내 위에서만 돌게 만들었다는 것'),
        (2,'C','narr','두 줄')],
 "p12":[(1,'C','label','JEDEC'),(1,'C','label','표준 DRAM'),
        (1,'C','speech','한실속: 반례는 제 분야예요\n표준 메모리는 규격을 표준기구가 정해요\n그래서 누구 걸 써도 같고 서로 대체되죠'),
        (2,'C','speech','한실속: 첫째 질문에 아니오예요')],
 "p13":[(1,'C','label','조립 PC'),
        (1,'C','speech','주본질: PC도 마찬가지였어\n열린 규격 위에서 누구나 조립했지\n1등은 많았지만 다 영주였어'),
        (2,'C','speech','안믿어: 그래서 내 컴퓨터가 쌌군')],
 "p14":[(1,'C','label','독점 아키텍처 vs 개방 표준'),(1,'C','label','독점 아키텍처'),(1,'C','label','개방 표준'),
        (1,'C','label','규격을 누가 정하나'),(1,'C','label','옮길 수 있나'),(1,'C','label','정글')],
 "p15":[(1,'C','speech','주본질: 15화의 두 정글이 여기서 갈려\n규격을 누가 쥐느냐, 그 한 줄로'),
        (2,'C','think','나배움: 영장류와 킹덤의 뿌리가 이 표였구나')],
 "p16":[(1,'C','label','측정법 셋'),(1,'C','label','① 이 위에서만 도는 것이 몇 개인가'),(1,'C','label','② 경쟁사 제품으로 그대로 옮겨지는가'),(1,'C','label','③ 규격을 누가 정하나'),
        (1,'C','speech','주본질: 느낌 말고 숫자로 확인하는 법이야')],
 "p17":[(1,'C','speech','주본질: 첫째, 이 회사 제품 위에서만 도는 게 몇 개인지 세\n도구, 앱, 부품, 논문'),
        (2,'C','speech','최신상: 라이브러리 수는 공개돼 있어요\n제가 세어 볼 수 있어요')],
 "p18":[(1,'C','label','A'),(1,'C','label','B'),(1,'C','label','C'),
        (1,'C','speech','나배움: 가상 종목 세 장으로 해 볼게요\n셋 다 측정법 세 줄로'),
        (1,'C','narr','A, B, C는 가상의 회사다')],
 "p19":[(1,'C','label','A'),(1,'C','label','B'),(1,'C','label','C'),
        (1,'C','speech','나배움: A는 셋 다 O, 독점 아키텍처예요\nB는 옮겨지진 않는데 규격은 남이 정해요\nC는 열린 규격 위의 조립이에요'),
        (1,'C','speech','주본질: B가 핵심이야\n묶여는 있는데 규격은 없는 경우, 그건 다음 화의 질문이야')],
 "p20":[(1,'C','speech','한탕수: 그럼 특허 많은 회사가 고릴라죠?\n특허도 남이 못 따라 하잖아요'),
        (2,'C','speech','주본질: 좋은 질문이야, 그런데 다른 얘기야')],
 "p21":[(1,'C','label','특허 = 담장'),(1,'C','label','아키텍처 = 도시 계획'),
        (1,'C','speech','주본질: 특허는 내 마당의 담장이야\n아키텍처는 도시 계획이지\n남들이 그 길 위에 집을 짓게 만드는 것')],
 "p22":[(1,'C','speech','주본질: 특허가 많아도 아무도 그 위에 안 올라오면\n담장 안에 혼자 사는 거야'),
        (2,'C','speech','신중해: 담장이 높아도 길이 아니면 소용없다는 거군요')],
 "p23":[(1,'C','label','이 회사가 사라지면 카테고리가 멈추는가'),
        (1,'C','speech','주본질: 첫째 기준을 통과했는지 확인하는 마지막 질문\n이 회사가 사라지면 그 카테고리가 같이 멈추는가'),
        (2,'C','think','나배움: 멈춘다면 길을 쥔 거다')],
 "p24":[(1,'C','label','고릴라 4기준'),(1,'C','label','자체 아키텍처 → 규격을 내가 쥔다'),
        (1,'C','speech','주본질: 첫 행을 채웠다\n규격을 내가 쥔다')],
 "p25":[(1,'C','speech','주본질: 오늘의 두 줄'),
        (2,'C','narr','두 줄을 적었다')],
 "p26":[(1,'C','speech','안믿어: 규격을 한 회사가 쥐면 독과점 아니오\n정부가 가만있소?'),
        (2,'C','speech','주본질: 맞아, 그게 고릴라의 그림자야\n규제는 균열의 한 종류고, 이번 시즌 뒤에서 다룬다')],
 "p27":[(1,'C','speech','신중해: 반론 기록했어요, 규제 리스크'),
        (2,'C','speech','한탕수: 안믿어 선생님 반론은 매번 기록이 남네요')],
 "p28":[(1,'C','speech','나배움: 그런데 규격을 쥐면 고객은 왜 못 떠나요?\n문은 열려 있다면서요'),
        (2,'C','speech','주본질: 문은 열려 있어\n그런데 아무도 안 나가, 그 이유가 다음 시간이야')],
 "p29":[(1,'C','narr','열린 문, 나가지 않는 사람들')],
 "p30":[(1,'C','narr','첫 행이 채워졌다'),
        (2,'C','think','나배움: 세 행이 남았다')],
 "p31":[(1,'C','caption','Episode 21 끝 · 다음 화 · 고릴라의 뼈대 ② 전환비용\n(문은 열려 있다, 그런데 왜 아무도 안 나가나)')],
}

BANDS = {
 "p05":'4기준 ① 독점 아키텍처 · 경쟁자가 따라 하려면 처음부터 다시 만들어야 하는가',
 "p07":'독점이면서 공개 · 설계(규격)는 내가 쥐고, 그 위에 올라오는 것은 누구나 · 비밀이 아니라 길',
 "p14":'독점 아키텍처 vs 개방 표준 · 규격을 한 회사가 정하면 영장류, 표준기구가 정하면 킹덤 (15화 두 정글의 뿌리)',
 "p16":'측정법 셋 · 이 위에서만 도는 것의 수 · 경쟁사로 그대로 옮겨지는가 · 규격을 누가 정하나',
 "p24":'4기준 1행 채움 · 자체 아키텍처 = 규격을 내가 쥔다 · 사라지면 카테고리가 멈추는가',
}

NOTES = {
 "p05":'해설: Moore의 고릴라 판별 기준 1 "Proprietary Architecture(독점 아키텍처)"는 경쟁자가 모방하려면 처음부터 다시 설계해야 하는 구조를 뜻한다. 회장님 강연 자료의 "폐쇄적이면서 공개된 설계 구조"(폐쇄 = 미래 표준을 통제, 공개 = 가치사슬이 고릴라에 의존)와 같은 개념이다(출처: 제프리 무어 고릴라 게임, © The Chasm Group)',
 "p08":'해설: CUDA는 NVIDIA GPU용 프로그래밍 플랫폼이다. AI 연구·개발 코드와 라이브러리 대부분이 그 위에 쌓여 있어 다른 칩으로 옮기려면 재작성·재검증이 필요하다(16화). 2026년 들어 경쟁사의 호환 소프트웨어가 개선됐다는 보도가 있으나 주요 개발 도구의 생태계는 여전히 CUDA 우위다(2026-10 기준)',
 "p11":'해설: 구글의 TPU는 GPU와 다른 계열(NPU)의 가속기로, 자체 컴파일러·도구와 자체 클라우드 위에서 도는 "자기 스택"이다(김선일 검토자 의견 반영). 2026년에는 외부 AI 회사와 대규모 공급 계약도 맺었지만 주로 구글 클라우드를 통해 공급된다(2026-10 기준). 방식은 다르지만 "남의 규격을 빌리지 않았다"는 점에서 1번 기준에 해당한다',
 "p12":'해설: JEDEC는 반도체 업계의 표준화 기구다. 표준 DRAM은 JEDEC 규격에 맞춰 삼성전자·SK하이닉스·마이크론이 서로 대체 가능한 제품을 만들기 때문에 규격을 한 회사가 쥐지 못한다(10화·17화의 "표준 DRAM = 킹덤" 결론과 같다)',
 "p22":'해설: 특허는 특정 기술의 모방을 일정 기간 막는 법적 담장이고, 독점 아키텍처는 남들이 그 위에서 제품과 서비스를 만들게 하는 설계의 길이다. 특허가 많아도 생태계가 그 위에 올라오지 않으면 1번 기준을 통과하지 못한다',
 "p26":'해설: 한 회사가 규격을 쥐면 각국의 경쟁 당국이 독과점·플랫폼 규제를 검토할 수 있다. 규제는 고릴라의 "내부 균열" 중 하나이며 29화 「왕좌의 균열」에서 대체 위협과 함께 다룬다. 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
