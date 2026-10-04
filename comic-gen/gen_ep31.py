#!/usr/bin/env python3
# 고릴라 헌터스 Ep31 "서식지를 찾아라: 정찰의 다섯 길" — 시즌 4 오프닝 (31p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep31 · v4 Ep36(서식지 정찰·4서칭 방법론) 계승 + 김경윤 피드백(⑤ 첨단기술 동향 소스 추가)
# 시즌 4 톤: 나배움이 혼자 사냥하는 두 번째 바퀴, 주본질은 한 걸음 물러난다. 정찰 5방법은 TALC 5인이 한 명씩 발표(발표자 잠금)
# ※ 작화 직전 season34-facts.md 갱신: 사이버보안 ARR, 전력 공급 갭, 한국 개인 투자자 수치, 테슬라 무감독 도시
# usage: python3 gen_ep31.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP31"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep31")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP31 NOTE: all presentation boards are clean hand-drawn whiteboard sketches with EXACTLY the labels listed. "
               "Company or sector names appear ONLY as clean labels; NEVER real logos, app icons, real product photos or real people. "
               "Any phone or laptop screen that is mentioned shows ONLY blurred abstract shapes with NO readable text. "
               "The hunting log is a plain kraft-cover notebook.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "

LOCK_GB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is GO BI-JEON (40s, sharp NAVY SUIT, confident gaze, tablet under his arm (screen OFF)) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_HT = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is HAN TANG-SU (early-20s, RED CAP, mustard-orange hoodie) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_CS = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is CHOI SIN-SANG (20s, HEADPHONES around his neck, gadget vest) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_HS = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_SJ = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is SHIN JUNG-HAE (50s WOMAN, warm BROWN CARDIGAN, reserved kind face) "
           "and her speech balloon tail points at HER; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s MAN, short BLACK hair, NO glasses, charcoal button shirt) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

HAB3 = ("a hand-drawn card titled '서식지 체크 3' with three numbered lines exactly: '① 불연속 혁신이 진행 중인가' / '② 토네이도 직전인가, 끝물이 아닌가' / '③ 독점 아키텍처가 가능한 구조인가'")
SCOUT5 = ("a hand-drawn card titled '정찰의 다섯 길' with five numbered lines exactly: '① 가치사슬 병목' / '② 군중 심리' / '③ 개발자 생태계' / '④ 기관의 발자국' / '⑤ 기술 동향 소스', each line with a small icon to its left (a pipe with a clog, a crowd of dots, a code bracket, a large footprint, a stack of papers)")
HABMAP_FRAME = ("a hand-drawn SIX-CELL board titled '서식지 스캔' drawn as a 2x3 grid (two rows, three columns)")
HABMAP_2 = (HABMAP_FRAME + " in which ONLY the top-left cell carries the label 'AI 인프라 · 토네이도' and ONLY the top-middle cell carries the label '메모리 · 토네이도, 킹덤 섞임'; the other FOUR cells are completely BLANK WHITE with nothing inside")
HABMAP_4 = (HABMAP_FRAME + " in which the top row reads, left to right, 'AI 인프라 · 토네이도', '메모리 · 토네이도, 킹덤 섞임', '사이버보안 · 볼링앨리에서 토네이도로' and the bottom-left cell reads '전력·냉각 · 영주들'; the bottom-middle and bottom-right cells are completely BLANK WHITE with nothing inside")
HABMAP_6 = (HABMAP_FRAME + " fully filled: top row left to right 'AI 인프라 · 토네이도', '메모리 · 토네이도, 킹덤 섞임', '사이버보안 · 볼링앨리에서 토네이도로'; bottom row left to right '전력·냉각 · 영주들', '피지컬 AI · 초기시장', '전기차 · 캐즘, 관찰 칸'; the last cell drawn with a dashed border")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: the silhouette of a lone hunter (NA BAE-UM's build, plain clothes) seen from behind on a ridge at dawn, holding a small brass telescope to his eye; far below, five separate patches of dark jungle scattered across a misty plain, each under its own thin column of morning light; NO people other than the silhouette, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL standing by the table, NOT at the board, hands in his chino pockets, addressing NA BAE-UM; the whole club present (the TALC five and HAN TANG-SU); the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM half rising from his chair, surprised, kraft hunting log in hand.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the single line '서식지 = 고릴라가 나올 시장' on the whiteboard and then stepping back from it. (2 ~45%) close on NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p04":"Two panels. (1 ~55%) NA BAE-UM (black hair, no glasses, charcoal shirt) asking a question, the balloon tail pointing at HIM; the whiteboard behind shows ONLY the line '서식지 = 고릴라가 나올 시장'. (2 ~45%) JU BON-JIL answering from a chair at the table, one hand open, relaxed.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL sitting down at the far end of the table and folding his arms with a small smile, visibly stepping back; HAN TANG-SU (red cap) gaping. (2 ~45%) the kraft hunting log close-up, a fresh page with ONLY the hand-written heading '시즌 4 · 혼자 사냥하기' and nothing else.",
 "p06":f"One panel (~100%). The whiteboard shows {HAB3}; JU BON-JIL stands to the side pointing at the title with the marker; ONLY these four labels on the board.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {HAB3}, tapping line ①; a small inset in the corner of the panel shows ONLY a hand-drawn staircase of five steps with tiny vehicle silhouettes (a horse, a carriage, a steam train, a car, an electric car) and NO text. (2 ~45%) NA BAE-UM nodding, remembering, pen moving.",
 "p08":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {HAB3}, tapping line ②; a small inset shows ONLY a hand-drawn bell curve with a short vertical mark just left of its highest point and NO text. (2 ~45%) SHIN JUNG-HAE (brown cardigan) asking carefully, her balloon tail pointing at her.",
 "p09":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {HAB3}, tapping line ③; a small inset shows ONLY a hand-drawn castle wall with a closed gate and NO text. (2 ~45%) AN MID-EO (stern, flip phone) muttering, his balloon tail pointing at him.",
 "p10":f"One panel (~100%). The whiteboard shows {SCOUT5}; JU BON-JIL stands fully to the side so that NO hand covers any label, gesturing toward the five members at the table; ONLY these six labels on the board.",
 "p11":f"Two panels. (1 ~55%) {LOCK_GB}GO BI-JEON at the whiteboard which shows {SCOUT5}, circling line ① with the marker. (2 ~45%) close on GO BI-JEON, confident, the balloon tail pointing at him.",
 "p12":f"Two panels. (1 ~55%) {LOCK_GB}GO BI-JEON beside the whiteboard which now shows ONLY a hand-drawn sketch of a wide pipe narrowing to a thin neck with a small clog drawn inside the neck and the single label '병목'; the group listening. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '① 병목' / '못 구해서, 라는 말이 나오는 곳'.",
 "p13":f"Two panels. (1 ~55%) {LOCK_HT}HAN TANG-SU at the whiteboard which shows {SCOUT5}, pointing proudly at line ②, phone in his other hand with its screen OFF. (2 ~45%) the group's mixed reactions, AN MID-EO rolling his eyes, SHIN JUNG-HAE smiling.",
 "p14":f"Two panels. (1 ~55%) {LOCK_HT}HAN TANG-SU beside the whiteboard which now shows ONLY a hand-drawn sketch of a thermometer with the mercury near the top and a small bell icon beside it labeled '경보'; JU BON-JIL at the table raising one finger to add a correction. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '② 군중 심리' / '열기는 서식지가 아니라 경보'.",
 "p15":f"Two panels. (1 ~55%) {LOCK_CS}CHOI SIN-SANG at the whiteboard which shows {SCOUT5}, tapping line ③, headphones around his neck. (2 ~45%) CHOI SIN-SANG drawing ONLY a hand-drawn bar chart of three bars of different heights with a small code-bracket icon above and NO text.",
 "p16":f"Two panels. (1 ~55%) {LOCK_CS}CHOI SIN-SANG beside the whiteboard which shows ONLY the three-bar sketch with the code-bracket icon and ONE label under the tallest bar: '표준이 기우는 쪽'; GO BI-JEON nodding. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '③ 개발자 생태계' / '코드가 모이는 쪽이 표준'.",
 "p17":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK at the whiteboard which shows {SCOUT5}, tapping line ④, reading glasses on. (2 ~45%) HAN SIL-SOK drawing ONLY a hand-drawn large footprint with a small calendar icon beside it labeled '분기 공시'.",
 "p18":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK beside the whiteboard which shows ONLY the large footprint sketch with the small calendar icon labeled '분기 공시'; JU BON-JIL at the table nodding approvingly. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '④ 기관의 발자국' / '큰손의 매수는 참조사례의 거울'.",
 "p19":f"Two panels. (1 ~55%) {LOCK_SJ}SHIN JUNG-HAE at the whiteboard which shows {SCOUT5}, tapping line ⑤ gently. (2 ~45%) SHIN JUNG-HAE drawing ONLY a hand-drawn stack of three papers with a small ribbon seal and NO text.",
 "p20":f"Two panels. (1 ~55%) {LOCK_SJ}SHIN JUNG-HAE beside the whiteboard which shows ONLY the stack-of-papers sketch with ONE label beneath it: '느리지만 정확하다'; HAN TANG-SU looking surprised that she presented. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '⑤ 기술 동향 소스' / '학회, 표준기구, 산업 리포트'.",
 "p21":f"One panel (~100%). {LOCK_NB}The whiteboard shows {HABMAP_2}; NA BAE-UM pinning the second label; JU BON-JIL watching from the table; ONLY the title and these two cell labels on the board.",
 "p22":f"One panel (~100%). {LOCK_NB}The whiteboard shows {HABMAP_4}; NA BAE-UM explaining, standing fully to the side so that NO hand covers any label; ONLY the title and these four cell labels on the board.",
 "p23":f"One panel (~100%). {LOCK_NB}The whiteboard shows {HABMAP_6}; NA BAE-UM stepping back from the board; ONLY the title and these six cell labels on the board.",
 "p24":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone raised like a gavel) objecting, his balloon tail pointing at him; behind him the whiteboard shows {HABMAP_6}. (2 ~45%) HAN SIL-SOK (black hair, glasses, knit vest) answering calmly from his chair, his balloon tail pointing at him.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary at the table; JU BON-JIL in the soft background; the whiteboard behind is out of focus with no readable text. (2 ~40%) the hunting log close-up: ONLY these hand-written lines: '종목 전에 서식지' / '다섯 길로 정찰' / '열기는 경보, 참조사례가 신호'.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU (red cap) puffing out his chest, pleased with himself; NA BAE-UM amused. (2 ~45%) JU BON-JIL deadpan from the table, the group bursting into laughter, SHIN JUNG-HAE covering her mouth.",
 "p27":f"Two panels. (1 ~55%) NA BAE-UM standing alone in front of the whiteboard which shows {HABMAP_6}, arms folded, studying it; the others gathering their things in the background. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL pausing beside NA BAE-UM on his way out, a hand briefly on his shoulder, speaking quietly; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM's face, steady and a little nervous, nodding.",
 "p29":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL the practical follow-up, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL answering with three fingers raised, already half out the door.",
 "p30":f"One panel (~100%). A quiet transition image {INK}three small traffic lights standing in a row on an empty night road, all three still dark, a faint figure with a notebook waiting beside them; NO readable text anywhere.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK}the ridge from the cover seen again at full daylight, the lone hunter now walking down toward the nearest jungle patch, a kraft notebook under his arm; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 31\n서식지를 찾아라\n정찰의 다섯 길\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','주본질: 자, 오늘부터는 네가 혼자 사냥하는 시간이야\n나는 뒤에 앉아 있을게'),
        (2,'C','speech','나배움: 혼자요? 뭐부터 하면 돼요?')],
 "p03":[(1,'C','label','서식지 = 고릴라가 나올 시장'),
        (1,'C','speech','주본질: 종목이 아니라 서식지부터\n고릴라가 나올 만한 시장을 먼저 고르는 거야'),
        (2,'C','think','나배움: 종목이 아니라 시장부터')],
 "p04":[(1,'C','speech','나배움: 그건 ETF가 찾아준다면서요\n30화에서 그랬잖아요'),
        (2,'C','speech','주본질: 후보 식별까지야\n서식지는 네가 먼저 골라야 어떤 ETF를 볼지도 정해져')],
 "p05":[(1,'C','speech','주본질: 그러니까 오늘은 질문만 할 거야\n답은 너희가 채워'),
        (1,'C','speech','한탕수: 형이 뒤에 앉는 거 처음 봐요'),
        (2,'C','label','시즌 4 · 혼자 사냥하기')],
 "p06":[(1,'C','label','서식지 체크 3'),(1,'C','label','① 불연속 혁신이 진행 중인가'),(1,'C','label','② 토네이도 직전인가, 끝물이 아닌가'),(1,'C','label','③ 독점 아키텍처가 가능한 구조인가'),
        (1,'C','speech','주본질: 서식지인지 아닌지는 세 가지만 물어\n하나라도 아니면 거긴 고릴라가 안 나와')],
 "p07":[(1,'C','speech','주본질: 첫째, 1화의 계단이야\n말에서 기차로 넘어가듯 인프라가 통째로 바뀌고 있나'),
        (2,'C','think','나배움: 연속 개선은 서식지가 아니다')],
 "p08":[(1,'C','speech','주본질: 둘째, 곡선 위의 위치\n토네이도 직전이어야지, 9화의 끝물이면 늦었어'),
        (2,'C','speech','신중해: 끝물인지 직전인지는 어떻게 알아요?\n저한텐 다 비슷해 보여서')],
 "p09":[(1,'C','speech','주본질: 그래서 셋째가 있어\n성곽을 쌓을 수 있는 구조인가\n모두가 같은 규격을 쓰는 시장엔 고릴라가 없어'),
        (2,'C','speech','안믿어: 질문 셋에 아니오가 하나면 끝이라\n내 취향이군')],
 "p10":[(1,'C','label','정찰의 다섯 길'),(1,'C','label','① 가치사슬 병목'),(1,'C','label','② 군중 심리'),(1,'C','label','③ 개발자 생태계'),(1,'C','label','④ 기관의 발자국'),
        (1,'C','speech','주본질: 서식지를 찾는 길은 다섯이야\n한 길에 한 사람씩, 맡은 길을 발표해')],
 "p11":[(1,'C','label','⑤ 기술 동향 소스'),
        (1,'C','speech','고비전: 첫째 길, 가치사슬 병목은 제가 맡겠습니다'),
        (2,'C','speech','고비전: 큰 회사들 투자 발표를 들어 보면\n못 구해서, 라는 말이 꼭 나옵니다\n그 못 구하는 데가 병목이에요')],
 "p12":[(1,'C','label','병목'),
        (1,'C','speech','고비전: 칩이 모자라면 칩, 전기가 모자라면 전기\n병목 위에 고릴라가 앉습니다'),
        (2,'C','narr','첫째 길, 두 줄')],
 "p13":[(1,'C','speech','한탕수: 둘째 길은 저죠, 군중 심리\n검색량이랑 커뮤니티 열기요'),
        (2,'C','speech','안믿어: 자네가 제일 잘 알겠군'),
        (2,'C','narr','모두가 웃었다')],
 "p14":[(1,'C','label','경보'),
        (1,'C','speech','한탕수: 올해 개인 투자자들이 반도체에 몰린 것도\n검색량에 다 보였어요'),
        (1,'C','speech','주본질: 좋아, 단 하나만 고쳐\n열기는 서식지가 아니라 경보야\n12화의 온도계를 기억해'),
        (2,'C','narr','둘째 길, 두 줄')],
 "p15":[(1,'C','speech','최신상: 셋째 길, 개발자 생태계\n코드 저장소에서 어느 표준이 늘고 있나 봅니다'),
        (2,'C','speech','최신상: 개발자들은 돈보다 먼저 움직여요\n코드가 모이는 쪽이 다음 표준이에요')],
 "p16":[(1,'C','label','표준이 기우는 쪽'),
        (1,'C','speech','고비전: 23화의 루프가 시작되는 지점이군요'),
        (2,'C','narr','셋째 길, 두 줄')],
 "p17":[(1,'C','speech','한실속: 넷째 길은 제가 하겠습니다\n기관의 발자국, 분기마다 나오는 보유 공시입니다'),
        (2,'C','label','분기 공시')],
 "p18":[(1,'C','label','분기 공시'),
        (1,'C','speech','한실속: 큰손이 들어왔다는 건\n참조사례의 거울 같은 거예요\n누군가 먼저 검증하고 샀다는 뜻이니까'),
        (2,'C','narr','넷째 길, 두 줄')],
 "p19":[(1,'C','speech','신중해: 다섯째 길은 제가 해 볼게요\n학회랑 표준기구, 산업 리포트요'),
        (2,'C','narr','조용한 사람이 마커를 잡았다')],
 "p20":[(1,'C','label','느리지만 정확하다'),
        (1,'C','speech','신중해: 유행보다 느리지만 틀리지는 않아요\n규격이 정해지는 자리에 미래가 먼저 적혀요'),
        (1,'C','speech','한탕수: 누나 발표 처음 봐요'),
        (2,'C','narr','다섯째 길, 두 줄')],
 "p21":[(1,'C','label','서식지 스캔'),(1,'C','label','AI 인프라 · 토네이도'),(1,'C','label','메모리 · 토네이도, 킹덤 섞임'),
        (1,'C','speech','나배움: 다섯 길에서 나온 걸 한 판에 모아 볼게요\nAI 인프라는 토네이도, 메모리도 토네이도인데 킹덤이 섞여 있어요')],
 "p22":[(1,'C','label','사이버보안 · 볼링앨리에서 토네이도로'),(1,'C','label','전력·냉각 · 영주들'),
        (1,'C','speech','나배움: 사이버보안은 응용 소프트웨어라 볼링앨리에서 토네이도로 가는 중\n전력과 냉각은 병목인데 규격이 공통이라 영주들의 자리예요')],
 "p23":[(1,'C','label','피지컬 AI · 초기시장'),(1,'C','label','전기차 · 캐즘, 관찰 칸'),
        (1,'C','speech','나배움: 로봇은 아직 초기시장\n전기차는 캐즘이라 서식지가 아니라 관찰 칸에 둘게요'),
        (1,'C','narr','여섯 칸이 찼다')],
 "p24":[(1,'C','speech','안믿어: 사이버보안은 왜 서식지요\n해킹 뉴스가 많다고 고릴라가 나오오?'),
        (2,'C','speech','한실속: 저희 회사가 올해 보안 예산을 두 배로 올렸어요\n실용주의자가 사기 시작한 거죠\n그게 서식지 신호예요')],
 "p25":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p26":[(1,'C','speech','한탕수: 커뮤니티 열기도 정찰이면\n저도 정찰병이네요'),
        (2,'C','speech','주본질: 경보병이지')],
 "p27":[(1,'C','narr','처음으로 내가 채운 판이었다'),
        (2,'C','think','나배움: 여섯 칸 중에 진짜 들어갈 자리는 어디지')],
 "p28":[(1,'C','speech','주본질: 오늘 보드는 네가 다 채웠어\n나는 질문만 했고'),
        (2,'C','speech','나배움: 다음은 뭘 물으실 거예요?')],
 "p29":[(1,'C','speech','나배움: 서식지는 찾았는데요\n언제, 얼마에 들어가야 하는지는 아직 모르겠어요'),
        (2,'C','speech','주본질: 신호 세 개가 동시에 켜질 때\n그 얘기가 다음 시간이야')],
 "p30":[(1,'C','narr','신호등 셋은 아직 꺼져 있었다')],
 "p31":[(1,'C','caption','Episode 31 끝 · 다음 화 · 언제, 얼마에\n(토네이도 진입 3신호와 매수 4원칙)')],
}

BANDS = {
 "p03":'서식지(Habitat) · 종목이 아니라 고릴라가 나올 시장부터 고른다 · ETF는 후보 식별까지, 서식지 선택은 사냥꾼의 몫',
 "p06":'서식지 체크 3 · 불연속 혁신 진행 중인가 · 토네이도 직전인가 · 독점 아키텍처가 가능한 구조인가',
 "p10":'정찰의 다섯 길 · 가치사슬 병목 · 군중 심리(경보) · 개발자 생태계 · 기관의 발자국 · 기술 동향 소스',
 "p14":'군중 심리는 서식지가 아니라 경보 · 12화 측정 5도구와 같은 자료, 쓰임은 다르다',
 "p23":'서식지 스캔 예시(2026-10 기준) · 토네이도 2 · 볼링앨리 1 · 영주들 1 · 초기시장 1 · 캐즘 관찰 칸 1',
 "p24":'실용주의자가 사기 시작했다는 증언이 서식지 신호 · 뉴스의 양이 아니라 구매의 주체',
}

NOTES = {
 "p03":'해설: "서식지(habitat)"는 Moore의 고릴라 게임에서 고릴라가 태어날 수 있는 시장을 가리키는 비유를 본 만화가 정찰 단계의 용어로 정리한 것이다. 30화의 결론대로 ETF는 후보를 식별해 주지만, 어느 시장을 볼지 고르는 일은 투자자가 먼저 해야 한다',
 "p08":'해설: 서식지 체크 ②는 9화의 제품수명주기(PLC)와 기술수용주기를 함께 본다. 카테고리가 중심가 후반이나 완전동화 단계이면 새 고릴라가 나올 자리가 없다. 토네이도 직전(볼링앨리 후반)이 사냥꾼의 자리다',
 "p14":'사실 확인: 2026년 1월 2일부터 10월 2일까지 국내 개인 투자자 순매수 1·2위는 삼성전자(약 43조 원)와 SK하이닉스(약 39조 원)로 합계 82조 원이 넘었고, 신용융자잔고는 2026년 6월 24일 약 38.6조 원으로 역대 최고를 기록했다(2026-10 기준, 작화 시 갱신). 쏠림은 서식지 신호가 아니라 12화의 하입 경보로 읽는다',
 "p16":'해설: 개발자 생태계 지표란 공개 코드 저장소와 모델 공유 사이트에서 특정 표준이나 도구가 얼마나 빨리 늘고 있는지를 보는 것이다. 23화의 네트워크 효과 루프가 시작되는 가장 이른 신호이며, 특정 서비스명은 수시로 바뀌므로 본문에는 적지 않는다',
 "p18":'해설: 13F는 미국에서 운용자산 1억 달러 이상인 기관이 분기마다 제출하는 보유 종목 공시다. 큰 기관이 새로 사기 시작한 서식지는 누군가 먼저 검증했다는 뜻이지만, 공시는 분기가 끝난 뒤 45일 안에 나오므로 느린 신호다',
 "p20":'해설: 기술 동향 소스란 학회 발표, 표준기구(예: 반도체의 JEDEC, 서버 설계의 OCP)의 규격 공개, 산업 리서치 리포트 같은 1차 자료를 말한다. 유행보다 느리지만 규격이 정해지는 순간을 가장 먼저 보여 준다(검토자 의견 반영)',
 "p23":'사실 확인: 서식지 스캔은 2026-10 기준 본 만화의 예시이며 투자 권유가 아니다. 전력 병목은 미국 데이터센터의 2026~28년 신규 전력 수요 68GW 중 약 38GW가 공급 미확보라는 추정(2026-08)을, 전기차의 캐즘 위치는 3화·18화를 따른다. 테슬라의 무감독 로보택시는 2026-10 기준 텍사스·플로리다 일부 도시에서만 운행되며 캘리포니아는 아니다',
 "p24":'사실 확인: 사이버보안을 응용 소프트웨어 서식지로 보는 근거는 실용주의자 기업의 구매 확산이다. 예시로 든 업계 1위 플랫폼사의 연간 반복 매출(ARR)은 2026년 7월 말 분기 기준 약 58억 달러로 전년 대비 25% 늘었고 순신규 ARR은 사상 최대였다(2026-10 기준, 작화 시 갱신). 한실속의 회사 사례는 가상이다',
}

if __name__ == "__main__": run(globals())
