#!/usr/bin/env python3
# 고릴라 헌터스 Ep24 "고릴라의 뼈대 ④ 완전완비제품과 생태계" — 시즌 3 (32p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep24 · Moore 4번 기준(Whole Product & Ecosystem) · 젠슨 황 5단 케이크(Ep10 p03 라벨 동일) · 김정호 교수 버티컬 스택(강의 재구성) · 맥스 토비 피라미드 계약(Ep4 p13b 회수, F3-2)
# 검토자 반영: 김경윤("MCP 표준" → "표준") · 김선일(설계 외주 파트너는 해설에만) · 실존 인물·로고 금지
# 연결: Ep18 FOURCARD → 4행 완성(FOURCARD_FULL) → SCORE4(NVIDIA 4/4 · Cerebras 1/4 · 표준 DRAM 0/4 · Tesla 보류) → Ep29 왕좌의 균열 · Ep30 SCORE8
# usage: python3 gen_ep24.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP24"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep24")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP24 NOTE: every diagram is a clean hand-drawn whiteboard sketch with EXACTLY the labels listed. Company names appear ONLY as the clean labels specified; NEVER real logos, product photos or real executives' faces. "
               "Storybook insets about MAX the inventor, TOBY the salesman and the ORACLE are soft vintage tone with ONLY anonymous ancient-era people and props (no modern cast, no smartphones). "
               "The 'app marketplace' and the 'chip with allies' sketches use GENERIC icons with NO brand marks.")

SPEAKERS_EXTRA = {'토비':'the salesman Toby in the storybook inset (an anonymous ancient-era man with a satchel and a scroll, NOT a study-group member)',
                  '감독관':'the anonymous pyramid foreman in the storybook inset (ancient-era man with a measuring rod, NOT a study-group member)'}

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; "
           "JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

Q4 = "the single hand-written question line '고객이 필요로 하는 모든 것이 이 회사 주변에 모여 있는가'"
WP7 = ("a hand-drawn card titled '완전완비제품' with a small core circle at the center labeled '핵심 제품' and six small boxes arranged around it labeled exactly '보조 제품', '서비스', '표준', '도구', '교육', '커뮤니티'; "
       "thin lines join each box to the core; nothing else written")
CAKE5 = ("a hand-drawn 5-TIER CAKE diagram, tiers stacked bottom to top, with clean labels exactly: '① Energy' (bottom tier), '② Chips / Compute', '③ Infrastructure', '④ Models', '⑤ Applications' (top tier); ONLY these five labels")
CAKE5H = ("a hand-drawn 5-TIER CAKE diagram, tiers stacked bottom to top, with clean labels exactly: '① Energy' (bottom tier), '② Chips / Compute', '③ Infrastructure', '④ Models', '⑤ Applications' (top tier); "
          "tiers ② and ③ shaded mustard yellow, and one small bracket to the right of those two tiers with the label '②③ 장악, 위아래로 확장'; ONLY these six labels")
VSTACK = ("a hand-drawn vertical stack of six blocks, labeled top to bottom exactly: 'AI 디바이스' / 'AI 서비스·플랫폼' / 'AI 모델' / '데이터' / '데이터센터' / '반도체'; "
          "on the right a tall bracket spanning all six blocks with the label '한 회사가 전 층'; a small upward arrow on the left with no words; nothing else written")
GAP3 = ("a small hand-drawn card titled '빈틈' with three short lines exactly: '핵심 설계 외주' / '패키징·파운드리 외주' / 'HBM 의존'")
PATH2 = ("a hand-drawn two-column card: LEFT column header '혼자 다 갖는다 · 수직통합' above a single tall tower icon; RIGHT column header '동맹으로 층층이 · 분업' above a tower built of blocks in different shades; "
         "ONLY these two headers")
TRI = ("a hand-drawn triangle with its three corners labeled exactly '개발자', '앱', '고객', and a small storefront icon at the center; nothing else written")
ALLIES = ("a hand-drawn large chip square at the center with four generic icons around it joined by lines: a factory, a stacked-memory chip, a server rack, a cloud; NO words on this sketch")
MEAS4 = ("a hand-drawn card titled '측정법 셋' with three numbered lines exactly: '① 보조 제품을 남들이 만들어 주나' / '② 표준과 인증 프로그램이 있나' / '③ 빠진 조각은 무엇인가'")
DCARD = ("a hand-drawn card titled '가상 종목 D' with three short lines exactly: '보조 제품 → 전부 자체 제작' / '인증 프로그램 → 없음' / '빠진 조각 → 동맹'")
FOURCARD_3Q = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → 떠나려면 더 든다' / '네트워크 효과 → 늘수록 가치가 커진다' / '완전완비제품 → ?'; "
               "the first three rows ticked in green, the fourth row still a question mark")
FOURCARD_FULL = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → 떠나려면 더 든다' / '네트워크 효과 → 늘수록 가치가 커진다' / '완전완비제품 → 주변에 다 모인다'; "
                 "all four rows ticked in green")
SCORE4 = ("a hand-drawn scoring grid titled '4기준 채점' with four column headers across the top exactly 'NVIDIA', 'Cerebras', '표준 DRAM', 'Tesla', four row labels down the left exactly '자체 아키텍처', '전환비용', '네트워크 효과', '완전완비제품', "
          "and a bottom row labeled '합계'")
S4_0 = SCORE4 + "; every cell of the grid is completely EMPTY (no marks at all)"
S4_1 = SCORE4 + "; the 'NVIDIA' column reads top to bottom 'O', 'O', 'O', 'O' with '4/4' in its 합계 cell; the other three columns are completely EMPTY"
S4_2 = SCORE4 + "; the 'NVIDIA' column reads 'O', 'O', 'O', 'O' with '4/4' in its 합계 cell; the 'Cerebras' column reads 'O', 'X', 'X', 'X' with '1/4'; the other two columns are completely EMPTY"
S4_3 = SCORE4 + "; the 'NVIDIA' column reads 'O', 'O', 'O', 'O' with '4/4'; the 'Cerebras' column reads 'O', 'X', 'X', 'X' with '1/4'; the '표준 DRAM' column reads 'X', 'X', 'X', 'X' with '0/4'; the 'Tesla' column is completely EMPTY"
S4_4 = SCORE4 + "; the 'NVIDIA' column reads 'O', 'O', 'O', 'O' with '4/4'; the 'Cerebras' column reads 'O', 'X', 'X', 'X' with '1/4'; the '표준 DRAM' column reads 'X', 'X', 'X', 'X' with '0/4'; the 'Tesla' column has a short dash in each of its four cells and the word '보류' in its 합계 cell"

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a tall five-tier cake seen from a low angle, and on its top tier a small gorilla silhouette sitting calmly, warm spotlight, soft dark background; NO whiteboard, NO study room, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":f"Two panels, study room. (1 ~55%) JU BON-JIL writing ONLY {Q4} on the whiteboard; the rest of the board BLANK; NA BAE-UM and the TALC five at the table. (2 ~45%) JU BON-JIL turning to the group, holding up four fingers.",
 "p03":f"One panel (~100%). The whiteboard shows {WP7}; JU BON-JIL stands fully to the side; ONLY these labels.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {WP7}; NA BAE-UM recognizing the drawing from Ep4. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p05":f"Two panels, storybook inset ({INK}soft vintage tone, ONLY anonymous ancient-era people, NO readable text, NONE of the modern cast). (1 ~55%) the salesman TOBY (satchel, scroll) standing before a stern pyramid FOREMAN with a measuring rod, a half-built pyramid behind them, a wooden wheel at their feet. (2 ~45%) the foreman tapping the scroll with his rod, unmoved.",
 "p06":f"Two panels, storybook inset ({INK}soft vintage tone, ONLY anonymous ancient-era people, NO readable text, NONE of the modern cast). (1 ~55%) the bearded inventor MAX in his workshop frowning at Toby, a wheel on the bench. (2 ~45%) Toby answering calmly, pointing out the window toward the pyramid.",
 "p07":"Two panels, back in the study room. (1 ~55%) HAN SIL-SOK (40s, black hair, thin glasses, knit vest) speaking from the table with his usual careful calm, his balloon tail pointing at HIM; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL pointing at HAN SIL-SOK with a pleased smile.",
 "p08":f"One panel (~100%). The whiteboard shows {CAKE5}; JU BON-JIL stands fully to the side so that no hand covers any label; ONLY these five labels.",
 "p09":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {CAKE5}, sweeping his hand upward along the tiers. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p10":f"One panel (~100%). The whiteboard shows {CAKE5H}; JU BON-JIL stands fully to the side pointing at the two shaded tiers; ONLY these six labels.",
 "p11":f"Two panels. (1 ~55%) GO BI-JEON (40s, navy suit) asking, his balloon tail pointing at HIM; the whiteboard behind shows {CAKE5H}. (2 ~45%) JU BON-JIL raising one finger with a serious face.",
 "p12":f"One panel (~100%). The whiteboard shows {VSTACK}; JU BON-JIL stands fully to the side; ONLY these labels.",
 "p13":f"Two panels. (1 ~55%) GO BI-JEON speaking, impressed, his balloon tail pointing at HIM; the whiteboard behind shows {VSTACK}. (2 ~45%) JU BON-JIL pointing at the bottom block of the same board ({VSTACK}).",
 "p14":f"Two panels. (1 ~55%) JU BON-JIL raising a finger with a 'but'; the whiteboard behind shows {VSTACK}. (2 ~45%) JU BON-JIL drawing ONLY {GAP3} on a clean corner of the board beside the stack.",
 "p15":f"Two panels. (1 ~55%) AN MID-EO (50s, stern, flip phone) objecting, his balloon tail pointing at HIM; the whiteboard behind shows {VSTACK} and beside it {GAP3}. (2 ~45%) JU BON-JIL answering evenly, hands open.",
 "p16":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '전 층을 가진 회사도 빈틈은 있다' / '완전완비제품은 설계도 + 동맹'.",
 "p17":f"One panel (~100%). The whiteboard shows {PATH2}; JU BON-JIL stands fully to the side; ONLY these two headers.",
 "p18":f"Two panels. (1 ~55%) the whiteboard shows {TRI}; JU BON-JIL pointing at the triangle; ONLY these three labels. (2 ~45%) a small inset {INK}of a crowd of anonymous people gathered around a generic storefront of blank app tiles, NO readable text.",
 "p19":f"Two panels. (1 ~55%) the whiteboard shows {ALLIES}; JU BON-JIL beside it; NO words on the board. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p20":f"Two panels. (1 ~55%) HAN TANG-SU (red cap) asking which side wins, phone (screen OFF) in hand; the whiteboard behind shows {PATH2}. (2 ~45%) JU BON-JIL shaking his head slowly with a smile.",
 "p21":f"One panel (~100%). The whiteboard shows {MEAS4}; JU BON-JIL stands fully to the side; NA BAE-UM copying; ONLY these labels.",
 "p22":f"Two panels. (1 ~55%) {LOCK_NB}The whiteboard shows {DCARD}; NA BAE-UM points at the last line; ONLY these labels. (2 ~45%) JU BON-JIL seated, giving a verdict with a thumb pointing down.",
 "p23":f"One panel (~100%). The whiteboard shows {FOURCARD_FULL}; JU BON-JIL stands fully to the side, having just ticked the fourth row; ONLY these labels.",
 "p24":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '4기준 전부 통과 = 진짜 고릴라' / '하나라도 빠지면 후보'.",
 "p25":f"One panel (~100%). {LOCK_NB}The whiteboard shows {S4_0}; JU BON-JIL seated has just handed the marker over; NA BAE-UM at the board, marker up; ONLY these labels, every cell EMPTY.",
 "p26":f"One panel (~100%). {LOCK_NB}The whiteboard shows {S4_1}; NA BAE-UM points at the first column; the other three columns are completely EMPTY WHITE with NOTHING inside; ONLY these labels.",
 "p27":f"One panel (~100%). {LOCK_NB}The whiteboard shows {S4_2}; NA BAE-UM points at the second column; the last two columns are completely EMPTY WHITE with NOTHING inside; ONLY these labels.",
 "p28":f"Two panels. (1 ~55%) {LOCK_NB}The whiteboard shows {S4_3}; NA BAE-UM points at the third column; the 'Tesla' column is completely EMPTY WHITE; ONLY these labels. (2 ~45%) HAN SIL-SOK (black hair, glasses, knit vest) at the table nodding ruefully, his balloon tail pointing at HIM.",
 "p29":f"Two panels. (1 ~55%) HAN TANG-SU (red cap) at the table asking, his balloon tail pointing at HIM; the whiteboard behind shows {S4_4}. (2 ~45%) {LOCK_NB}NA BAE-UM at the board tapping the '보류' cell of the same grid ({S4_4}); ONLY these labels.",
 "p30":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone) raising his hand with a hard question, his balloon tail pointing at HIM; the whiteboard behind shows {S4_4}. (2 ~45%) JU BON-JIL's face, a slow knowing smile, as if he has waited for this question.",
 "p31":"Two panels. (1 ~55%) the notebook close-up: ONLY these hand-written lines: '뼈대 넷이 다 섰다' / '넷이 다 켜져도 영원하진 않다'. (2 ~45%) JU BON-JIL at the door turning back; the whiteboard behind is completely BLANK.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}a complete gorilla skeleton silhouette with all four bones glowing gold, standing over a vast map-like jungle at dawn; NA BAE-UM and JU BON-JIL small figures at the edge; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 24\n고릴라의 뼈대 ④ 완전완비제품과 생태계\n한 층만으론 아무도 사지 않는다\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','label','고객이 필요로 하는 모든 것이 이 회사 주변에 모여 있는가'),
        (1,'C','speech','주본질: 마지막 질문\n고객이 필요로 하는 모든 것이 이 회사 주변에 모여 있는가'),
        (2,'C','speech','주본질: 뼈대 셋에 오늘은 살을 붙인다')],
 "p03":[(1,'C','label','완전완비제품'),(1,'C','label','핵심 제품'),(1,'C','label','보조 제품'),(1,'C','label','서비스'),(1,'C','label','표준'),
        (1,'C','speech','주본질: 4화에서 배운 완전완비제품이야\n핵심 제품 하나에 여섯이 붙어야 완성이지')],
 "p04":[(1,'C','speech','주본질: 살이 없으면 실용주의자가 안 사\n뼈대가 아무리 좋아도'),
        (2,'C','think','나배움: 4화의 그 그림이 넷째 기준이었구나')],
 "p05":[(1,'C','narr','4화의 그 계약서를 다시 펴자'),
        (1,'C','speech','토비: 바퀴만 보내면 계약은 없던 걸로 하겠답니다\n장착, 교육, 지원까지 붙여야 산대요'),
        (2,'C','speech','감독관: 내가 사는 건 바퀴가 아니라\n돌을 제때 옮기는 일이오')],
 "p06":[(1,'C','speech','맥스: 바퀴가 좋으면 됐지\n뭘 더 붙이라는 건가'),
        (2,'C','speech','토비: 그들은 바퀴를 사는 게 아니라\n돌이 옮겨지는 결과를 삽니다')],
 "p07":[(1,'C','speech','한실속: 제품이 아직 완벽하지 않은데 제가 왜 써요\n완벽해져야 그제서야 돈을 쓰죠'),
        (2,'C','speech','주본질: 피라미드 감독관이 한 말이 바로 그거야\n실용주의자는 완전완비제품만 산다')],
 "p08":[(1,'C','label','① Energy'),(1,'C','label','② Chips / Compute'),(1,'C','label','③ Infrastructure'),(1,'C','label','④ Models'),(1,'C','label','⑤ Applications'),
        (1,'C','speech','주본질: 10화의 케이크를 다시 꺼내자\n에너지, 칩, 인프라, 모델, 앱\n완전완비제품의 층위가 이거야')],
 "p09":[(1,'C','speech','주본질: 한 층만 잘해선 부족해\n모든 층이 같이 커야 경제성이 나'),
        (2,'C','think','나배움: 케이크 한 층은 디저트가 안 된다')],
 "p10":[(1,'C','label','②③ 장악, 위아래로 확장'),
        (1,'C','speech','주본질: 그 GPU 회사는 지금 ②와 ③을 쥐고\n위아래로 넓히는 중이야\n한 층의 고릴라가 케이크 전체를 노리는 거지')],
 "p11":[(1,'C','speech','고비전: 그럼 다섯 층을 다 가진 회사는 없나요?'),
        (2,'C','speech','주본질: 하나 있어\n그래서 무서운 거야')],
 "p12":[(1,'C','label','AI 디바이스'),(1,'C','label','반도체'),(1,'C','label','한 회사가 전 층'),
        (1,'C','speech','주본질: 어떤 교수가 그린 세로 스택이야\n디바이스부터 반도체까지 여섯 층\n이걸 한 회사가 다 가졌어')],
 "p13":[(1,'C','speech','고비전: 그래서 그 회사가 무서운 거군요\n검색부터 칩까지'),
        (2,'C','speech','주본질: 위는 돈을 버는 생태계, 아래는 반도체\n비어 있던 반도체 칸을 자체 칩으로 메웠지')],
 "p14":[(1,'C','speech','주본질: 단, 빈틈도 있어'),
        (2,'C','label','빈틈'),(2,'C','label','핵심 설계 외주'),(2,'C','label','패키징·파운드리 외주'),(2,'C','label','HBM 의존'),
        (2,'C','speech','주본질: 핵심 설계는 다른 회사에 맡기고\n패키징과 파운드리도 밖에서\n메모리는 한국에 기대지')],
 "p15":[(1,'C','speech','안믿어: 그럼 다 가진 게 아니지 않소'),
        (2,'C','speech','주본질: 전 층을 가졌다는 건 설계도를 가졌다는 뜻이에요\n부품까지 다 만든다는 뜻은 아니죠\n그리고 그 회사는 표준까지 노리고 있어요')],
 "p16":[(1,'C','speech','주본질: 두 줄만'),
        (2,'C','narr','두 줄')],
 "p17":[(1,'C','label','혼자 다 갖는다 · 수직통합'),(1,'C','label','동맹으로 층층이 · 분업'),
        (1,'C','speech','주본질: 완전완비제품에 이르는 길은 둘이야\n혼자 다 갖거나, 동맹으로 층층이 채우거나')],
 "p18":[(1,'C','label','개발자'),(1,'C','label','앱'),(1,'C','label','고객'),
        (1,'C','speech','주본질: 앱 장터를 봐\n개발자와 앱과 고객이 한 회사 주변에 모여\n모인 쪽이 힘을 가져, 비대칭 권력이야'),
        (2,'C','narr','사람이 모인 곳이 장터가 된다')],
 "p19":[(1,'C','speech','주본질: 반대로 그 GPU 회사는 칩 하나를 쥐고\n파운드리, 메모리, 서버, 클라우드가 주변을 채워\n남들이 완전완비제품을 대신 완성해 주는 거야'),
        (2,'C','think','나배움: 가치사슬 지배력, 1화의 그 말이 이거구나')],
 "p20":[(1,'C','speech','한탕수: 그럼 혼자 다 갖는 쪽이 세요, 동맹이 세요?'),
        (2,'C','speech','주본질: 둘 다 고릴라를 낳았어\n질문은 어느 쪽이 세냐가 아니라\n빠진 조각이 있느냐야')],
 "p21":[(1,'C','label','측정법 셋'),(1,'C','label','① 보조 제품을 남들이 만들어 주나'),(1,'C','label','② 표준과 인증 프로그램이 있나'),(1,'C','label','③ 빠진 조각은 무엇인가'),
        (1,'C','speech','주본질: 측정법도 셋이야\n남들이 모여드는지를 숫자로 봐')],
 "p22":[(1,'C','label','가상 종목 D'),
        (1,'C','speech','나배움: 가상 종목 D는 보조 제품을 전부 자기가 만들어요\n인증 프로그램도 없고요\n남들이 안 모이는 거예요'),
        (2,'C','speech','주본질: 그럼 넷째 행은 X야\n혼자 다 하는 건 수직통합이 아니라 고립이지')],
 "p23":[(1,'C','label','자체 아키텍처 → 규격을 내가 쥔다'),(1,'C','label','전환비용 → 떠나려면 더 든다'),(1,'C','label','네트워크 효과 → 늘수록 가치가 커진다'),(1,'C','label','완전완비제품 → 주변에 다 모인다'),
        (1,'C','speech','주본질: 넷째 행, 완전완비제품\n주변에 다 모인다\n넷이 모두 켜지면 진짜 고릴라야')],
 "p24":[(1,'C','speech','주본질: 두 줄'),
        (2,'C','narr','두 줄을 적었다')],
 "p25":[(1,'C','label','NVIDIA'),(1,'C','label','Cerebras'),(1,'C','label','표준 DRAM'),(1,'C','label','Tesla'),
        (1,'C','speech','주본질: 이제 네가 채점해\n18화의 넷을 다시 불러오자')],
 "p26":[(1,'C','label','NVIDIA'),(1,'C','label','4/4'),
        (1,'C','speech','나배움: 첫 열, 넷 다 O, 사 분의 사\n16화에서 본 그대로예요')],
 "p27":[(1,'C','label','Cerebras'),(1,'C','label','1/4'),
        (1,'C','speech','나배움: 둘째 열은 18화 그대로 일 분의 사\n아키텍처만 독자적이에요')],
 "p28":[(1,'C','label','표준 DRAM'),(1,'C','label','0/4'),
        (1,'C','speech','나배움: 표준 메모리는 규격을 남이 정하니 넷 다 X\n17화의 결론이에요'),
        (2,'C','speech','한실속: 제 회사 일인데 제가 봐도 영 분의 사예요')],
 "p29":[(1,'C','speech','한탕수: 테슬라는 왜 보류예요?'),
        (2,'C','label','보류'),
        (2,'C','speech','나배움: 캐즘 위치는 채점 전이에요, 18화\n등급은 토네이도가 정하니까요')],
 "p30":[(1,'C','speech','안믿어: 사 분의 사면 영원하오?'),
        (2,'C','speech','주본질: 그 질문이 이번 시즌의 마지막 질문이야\n왕좌의 균열')],
 "p31":[(1,'C','narr','두 줄'),
        (2,'C','speech','주본질: 다음 시간부턴 이 네 기준을 들고\nAI 산업 지도를 통째로 해부한다')],
 "p32":[(1,'C','caption','Episode 24 끝 · 다음 화 · AI 가치사슬 대해부\n(층마다 고릴라가 다르다 · 클라우드 DC와 AI DC · 건축 3분업)')],
}

BANDS = {
 "p03":'완전완비제품 · 핵심 제품 + 보조 제품 + 서비스 + 표준 + 도구 + 교육 + 커뮤니티 · 실용주의자는 완전완비제품만 산다',
 "p08":'5단 케이크 · ① 에너지 ② 칩 ③ 인프라 ④ 모델 ⑤ 앱 · 모든 층이 같이 커야 경제성이 난다(10화)',
 "p12":'버티컬 스택 · 디바이스 → 서비스·플랫폼 → 모델 → 데이터 → 데이터센터 → 반도체 · 전 층을 가진 회사도 빈틈은 있다',
 "p17":'완전완비제품에 이르는 두 길 · 수직통합(혼자 다 갖는다) vs 동맹(층층이 채운다) · 둘 다 고릴라를 낳았다',
 "p23":'고릴라 4기준 완성 · 자체 아키텍처 · 전환비용 · 네트워크 효과 · 완전완비제품 · 넷이 모두 켜지면 진짜 고릴라',
 "p29":'4기준 채점 · NVIDIA 4/4 · Cerebras 1/4 · 표준 DRAM 0/4 · Tesla 보류(캐즘 위치는 채점 전)',
}

NOTES = {
 "p02":'해설: Moore의 고릴라 판별 4번 기준은 완전완비제품과 생태계(whole product and ecosystem)다. 원문 취지: "고객이 필요로 하는 보조 제품·서비스가 이 회사 주변에 모여 있는가". 4화의 완전완비제품 정의(핵심 제품 + 보조 제품 + 서비스 + 표준 + 도구 + 교육 + 커뮤니티)를 고릴라 판별에 적용한 것이다',
 "p05":'해설: 『마케팅 천재가 된 맥스』(제프 콕스)의 토비 일화는 4화(p13b)에서 완전완비제품의 원형으로 소개했다. 피라미드 건설자는 바퀴 자체가 아니라 장착·교육·지원이 붙은 "돌을 옮기는 일"을 산다. 실용주의자가 사는 것은 핵심 제품이 아니라 완전완비제품이라는 Moore의 명제와 같다',
 "p08":'해설: 5단 케이크(에너지·칩·인프라·모델·앱)는 NVIDIA 젠슨 황 CEO가 AI 산업 구조를 설명하며 쓴 비유로, 10화에서 처음 소개했다. 본 만화는 이를 Moore의 기술 층위, 곧 완전완비제품의 층위로 읽는다. 2026년 기준 NVIDIA는 ②칩과 ③인프라(AI 데이터센터) 층을 사실상 장악하고 추론 소프트웨어 등으로 위층까지 확장 중이다(2026-10 기준)',
 "p12":'해설: 세로 스택(버티컬 스택)은 KAIST 김정호 교수가 구글을 분석하며 그린 도식을 본 만화가 재구성한 것이다. 디바이스·서비스·모델·데이터·데이터센터·반도체 여섯 층을 구글만 수직 통합했고, 모델 회사는 모델만, GPU 회사는 반도체만 가져 서로 동맹을 맺는다는 관점이다',
 "p15":'사실 확인: 구글의 빈틈. 자체 칩(TPU)의 핵심 설계는 외부 반도체 설계사와 함께 하고(7세대 Ironwood 이후 8세대는 학습용과 추론용을 서로 다른 파트너와 설계), 패키징·파운드리는 외부 파운드리에, 고대역폭 메모리(HBM)는 한국·미국 메모리 3사에 의존한다. 2026년에는 TPU를 클라우드 밖의 다른 AI 회사에 대규모로 공급하는 계약(5년 5GW)도 맺었다(2026-10 기준). "표준까지 노린다"는 에이전트 간 통신 규약 등 소프트웨어 표준 선점 시도를 뜻한다',
 "p17":'해설: 수직통합과 동맹은 『마케팅 전쟁』(리스·트라우트)의 관점으로 보면 혼자 완전완비제품을 짓는 쪽과 연합군으로 짓는 쪽의 두 진영이다. 폰·자동차·AI에서 반복되는 이 구도는 27화에서 다룬다. 어느 쪽이 우월한가가 아니라 빠진 조각이 있는가가 고릴라 판별의 질문이다',
 "p26":'해설: 채점은 본 만화의 교육용 예시이며 기업 평가나 투자 권유가 아니다. NVIDIA 4/4는 16화(CUDA·전환비용·개발자 생태계)와 본 화(파운드리·메모리·서버·클라우드 동맹)의 내용을 합한 것이고, Cerebras 1/4은 18화의 4기준 심사 결과를 그대로 가져왔다(2026-10 기준, 상장 후 주가는 공모가 아래로 내려온 상태)',
 "p28":'해설: 표준 DRAM 0/4는 17화의 결론(JEDEC 공통 규격·상호 대체·수급 사이클)과 같다. 테슬라는 18화에서 "캐즘 위치의 고릴라 후보"로 분류했으므로 등급 채점은 보류한다. 한편 4/4 기업은 그 지배력 때문에 각국의 플랫폼·독점 규제 논쟁의 대상이 되기 쉽다는 점도 투자자가 기억할 리스크다(일반론)',
}

if __name__ == "__main__": run(globals())
