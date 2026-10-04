#!/usr/bin/env python3
# 고릴라 헌터스 Ep38 "다음 고릴라는 어디에" — 시즌 4 (32p, ④ 실전)
# 2026-10-04 작성. season4-plan.md Ep38 · v4 Ep40 "다음 고릴라(HBF·온디바이스·에이전틱)" 계승 · Ep14 GRID·Ep12 TABLE5 재사용 · 김선일 "찻잔 속 돌풍 vs 구조적 돌풍" · 맥스 오라클 모티프(Ep9 회수)
# ※ 이 회차는 나배움이 처음부터 끝까지 발표한다(주본질은 테이블에 앉아 질문만). 실존 인물·로고 금지. 팩트는 season34-facts.md A5·A8·B3·B12·B13(2026-10-04 기준, 작화 직전 갱신)
# usage: python3 gen_ep38.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP38"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep38")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP38 NOTE: in this episode NA BAE-UM is the presenter on EVERY whiteboard page and JU BON-JIL stays SEATED at the table asking questions. "
               "The 2x2 board is always a clean hand sketch on the whiteboard with EXACTLY the labels listed; candidate cards are small white paper cards pinned into cells, bearing ONLY the specified words. "
               "Robots, AI PCs and memory chips appear ONLY as generic hand-drawn icons on the whiteboard; NEVER real products, logos, or executives. The storybook inset about the ORACLE is soft vintage tone with ONLY anonymous ancient-era people.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit, glasses) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
GRID = ("a hand-drawn 2x2 grid: column labels on top '초기시장 · 캐즘' (left) and '토네이도 · 중심가' (right); row labels on the left '정점' (top) and '골 · 언덕' (bottom); the grid title above reads '채택 × 기대'")
GRID0 = (GRID + "; ALL FOUR cells are completely BLANK WHITE with NOTHING inside")
GRID1 = (GRID + "; EXACTLY ONE small white card bearing ONLY the letters 'HBF' pinned in the TOP-LEFT cell; the other three cells are completely BLANK WHITE with NOTHING inside")
GRID2 = (GRID + "; EXACTLY TWO small white cards: one bearing ONLY 'HBF' in the TOP-LEFT cell, one bearing ONLY '온디바이스 AI' in the BOTTOM-LEFT cell; the two RIGHT cells are completely BLANK WHITE with NOTHING inside")
GRID3 = (GRID + "; EXACTLY THREE small white cards: 'HBF' in the TOP-LEFT cell, '온디바이스 AI' in the BOTTOM-LEFT cell, and '에이전틱 AI' pinned in the TOP-LEFT cell beside 'HBF' with a small pencil arrow pointing DOWN from it toward the bottom-left cell; both RIGHT cells are completely BLANK WHITE with NOTHING inside")
TABLE5 = ("the FIVE-row checklist TABLE titled '초기시장인가, 골짜기를 건넜나' with column headers '초기시장' and '골짜기 건넘', row labels down the left '누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출', and cell texts row by row '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; '없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴' (the fifth row in RED marker)")
STORM2 = ("a hand-drawn contrast: LEFT a teacup with a tiny swirl inside, labeled '유행: 인프라 그대로'; RIGHT a horizon with a large tornado and, beneath it, a row of new power lines and factories being built, labeled '구조: 새 인프라·가치사슬'; nothing else written")
SIG3 = ("a hand-drawn card titled '진입 3신호' with three small traffic lights and ONE label each exactly: '① 참조사례 확산' / '② 매출 가속' / '③ 완전완비제품'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a lone figure seen from behind on a grassy hilltop at dawn, holding a marker like a pointer toward a far horizon where THREE small tornadoes stand over a jungle; NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL SEATED at the long table, sliding the marker across the table toward NA BAE-UM; the whole club present (HAN TANG-SU, the TALC five); the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM taking the marker, standing up, nervous but resolved.",
 "p03":f"One panel (~100%). {LOCK_NB}NA BAE-UM at the whiteboard which shows {GRID0}; he stands fully to the side; ONLY the grid title and the four axis labels.",
 "p04":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {GRID0}; JU BON-JIL seated, arms folded, asking the first question. (2 ~45%) NA BAE-UM taking a breath, three white cards fanned in his hand (their faces turned away, no readable text).",
 "p05":"Two panels. (1 ~55%) JU BON-JIL SEATED, holding up one finger, asking about the first candidate; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM writing ONLY the letters 'HBF' beside a small sketch of stacked flash blocks on the whiteboard corner.",
 "p06":f"One panel (~100%). {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TABLE5}; he stands fully to the side; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TABLE5} with four small pencil ticks in the LEFT column (rows 1 to 4) and the fifth row left unticked; HAN SIL-SOK nodding. (2 ~45%) close on NA BAE-UM's face, thinking carefully.",
 "p08":f"One panel (~100%). {LOCK_NB}NA BAE-UM pinning a card onto the whiteboard which shows {GRID1}; ONLY the grid labels and the one card.",
 "p09":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {GRID1}; CHOI SIN-SANG (headphones) leaning forward excitedly. (2 ~45%) CHOI SIN-SANG speaking from the table, his balloon tail pointing at him; AN MID-EO beside him unimpressed.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL SEATED, nodding once, holding up two fingers for the second candidate; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM writing ONLY '온디바이스 AI' beside a small sketch of a laptop and a phone (both screens blank) on the whiteboard corner.",
 "p11":f"One panel (~100%). {LOCK_NB}NA BAE-UM beside the whiteboard which shows {TABLE5} with small pencil ticks: rows 1, 2 and 3 ticked in the RIGHT column, rows 4 and 5 ticked in the LEFT column; he stands fully to the side; ONLY these labels.",
 "p12":"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) speaking from the table with a wry shrug, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM at the board listening, marker paused, a small smile.",
 "p13":f"One panel (~100%). {LOCK_NB}NA BAE-UM pinning the second card onto the whiteboard which shows {GRID2}; ONLY the grid labels and the two cards.",
 "p14":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {GRID2}; GO BI-JEON (navy suit) raising a confident hand. (2 ~45%) GO BI-JEON speaking from the table, his balloon tail pointing at him; SHIN JUNG-HAE beside him listening politely.",
 "p15":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: 'HBF → 초기시장 + 기대 상승 → 바구니 관찰' / '온디바이스 AI → 캐즘 건너는 중 + 공급 역풍 → 판별표 분기마다'. (2 ~45%) JU BON-JIL SEATED, holding up three fingers, the third question.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM writing ONLY '에이전틱 AI' beside a small sketch of a bell-shaped hype curve with a dot at its peak on the whiteboard corner; nothing else written. (2 ~45%) NA BAE-UM turning to the group, explaining, his balloon tail pointing at him.",
 "p17":"Two panels. (1 ~55%) HAN SIL-SOK (black hair, glasses, knit vest) reporting from the table, counting three on his fingers, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM at the board nodding, writing ONLY the two words '워싱 체크' in a small box on the whiteboard corner.",
 "p18":f"One panel (~100%). {LOCK_NB}NA BAE-UM beside the whiteboard which shows {SIG3}, the first traffic light circled in pencil; he stands fully to the side; ONLY these labels.",
 "p19":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {SIG3}; HAN TANG-SU listening, cap off for once. (2 ~45%) close on NA BAE-UM, confident now.",
 "p20":f"One panel (~100%). {LOCK_NB}NA BAE-UM pinning the third card onto the whiteboard which shows {GRID3}; ONLY the grid labels and the three cards.",
 "p21":f"Two panels. (1 ~55%) the whole club looking at the whiteboard which shows {GRID3}; SHIN JUNG-HAE (cardigan) speaking warmly, her balloon tail pointing at her. (2 ~45%) AN MID-EO (flip phone) muttering, his balloon tail pointing at him; HAN TANG-SU grinning beside him.",
 "p22":"Two panels. (1 ~55%) JU BON-JIL SEATED, asking a harder question with a raised eyebrow; the whiteboard behind is out of focus with no readable text. (2 ~45%) NA BAE-UM pausing, then erasing a corner of the board to make room (board corner BLANK).",
 "p23":f"One panel (~100%). {LOCK_NB}NA BAE-UM beside the whiteboard which shows {STORM2}; he stands fully to the side; ONLY these two labels.",
 "p24":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {STORM2}; a small inset in the corner of the panel recalling Ep1: a hand-drawn staircase of transport (a horse, a carriage, a train, a car) with NO text. (2 ~45%) close on NA BAE-UM tapping the tornado side of the board.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '찻잔 속 돌풍 = 인프라 그대로' / '구조적 돌풍 = 인프라와 가치사슬이 통째로 바뀐다' / '구조적 돌풍만 고릴라를 낳는다'. (2 ~45%) JU BON-JIL SEATED, a satisfied nod, asking one bonus question.",
 "p26":"Two panels. (1 ~55%) NA BAE-UM writing ONLY '피지컬 AI' beside a small generic hand-drawn humanoid robot icon on the whiteboard corner; nothing else written. (2 ~45%) NA BAE-UM explaining to the group, his balloon tail pointing at him; the small 3x3 grid with a shaded center cell sketched in the far corner of the board, no text.",
 "p27":f"Two panels, storybook inset {INK}soft vintage tone, ONLY anonymous ancient-era people, NO readable text. (1 ~55%) the old bearded ORACLE by a dying fire, speaking to a young bearded inventor who holds a wooden wheel. (2 ~45%) the inventor turning away from a cart full of old wheels toward a workbench with a new, unfinished device.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary at the table, marker set down; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '세 후보, 세 위치, 세 스탠스' / '찻잔인지 구조인지' / '멘토 없이 채웠다'.",
 "p29":"Two panels. (1 ~55%) JU BON-JIL SEATED at the table, leaning back, speaking to NA BAE-UM with a rare wide smile, his balloon tail pointing at him; the whiteboard behind is completely BLANK. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p30":"Two panels. (1 ~55%) the club applauding lightly; HAN TANG-SU clapping loudest; the whiteboard behind is completely BLANK. (2 ~45%) at the door JU BON-JIL turns back with the hook for the next episode, exactly ONE balloon.",
 "p31":f"One panel (~100%). A faint dreamy image {INK}a wide canyon with a half-built wooden bridge reaching across it and a small crowd of ordinary people waiting at the near edge; the top of the page has NO band and NO text box; NO readable text anywhere on this page.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}the study room at dusk, the whiteboard wiped BLANK except for three small white cards still pinned in a row (their faces too small to read), NA BAE-UM and JU BON-JIL as small figures leaving together; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 38\n다음 고릴라는 어디에\n네 눈으로 가리켜라\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','주본질: 오늘은 내가 묻고 네가 답해\n판도 네가 그려'),
        (2,'C','think','나배움: 2년 만에 처음, 혼자서')],
 "p03":[(1,'C','label','채택 × 기대'),(1,'C','label','초기시장 · 캐즘'),(1,'C','label','토네이도 · 중심가'),(1,'C','label','정점'),(1,'C','label','골 · 언덕'),
        (1,'C','speech','나배움: 14화의 판입니다\n후보 셋을 여기에 놓겠습니다')],
 "p04":[(1,'C','speech','주본질: 첫째 후보부터\n왜 그걸 골랐지?'),
        (2,'C','think','나배움: 서식지에서 고른 셋, 순서대로')],
 "p05":[(1,'C','speech','주본질: 메모리 다음 메모리라던 그거군'),
        (2,'C','label','HBF'),
        (2,'C','speech','나배움: 26화의 후보입니다\n먼저 12화 판별표로 위치를 잡겠습니다')],
 "p06":[(1,'C','narr','판별표 다섯 행, 세 번째 보는 표였다')],
 "p07":[(1,'C','speech','나배움: 규격은 나왔는데 샘플은 내년, 양산은 그다음\n사는 사람은 아직 연구소뿐, 참조사례도 시연뿐\n매출은 없고 기대만 올라갑니다'),
        (2,'C','think','나배움: 넷이 왼쪽, 초기시장')],
 "p08":[(1,'C','label','HBF'),
        (1,'C','speech','나배움: 초기시장, 그리고 기대는 올라가는 중\n왼쪽 위, 스탠스는 바구니 관찰입니다')],
 "p09":[(1,'C','speech','나배움: 아직 살 수 있는 종목이 아니라\n규격이 정해지고 샘플이 나오는지 분기마다 봅니다'),
        (2,'C','speech','최신상: 저 벌써 보고 있어요\n설명회 여섯 시간짜리를 다 들었어요')],
 "p10":[(1,'C','speech','주본질: 둘째'),
        (2,'C','label','온디바이스 AI'),
        (2,'C','speech','나배움: 노트북과 폰 안에서 도는 AI입니다')],
 "p11":[(1,'C','speech','나배움: 실용주의자도 삽니다, 동료가 쓴다고 하고\n완전완비제품도 갖춰졌어요\n그런데 매출 가속이 끊겼습니다, 메모리 값 때문에')],
 "p12":[(1,'C','speech','한실속: 저희 회사 노트북 교체 주기에 AI PC가 들어왔어요\n근데 메모리 값이 올라서 반년 미뤘어요'),
        (2,'C','speech','나배움: 그게 바로 공급 역풍이에요')],
 "p13":[(1,'C','label','온디바이스 AI'),
        (1,'C','speech','나배움: 골짜기를 건너는 중인데 역풍이 붑니다\n왼쪽 아래, 캐즘과 골\n판별표를 분기마다 다시 채웁니다')],
 "p14":[(1,'C','speech','나배움: 건넜다고 확인되면 오른쪽으로 옮깁니다\n그때 진입 신호를 봅니다'),
        (2,'C','speech','고비전: 온디바이스가 미래예요\n저는 벌써 다 바꿨습니다')],
 "p15":[(1,'C','narr','두 장, 두 위치'),
        (2,'C','speech','주본질: 셋째, 제일 시끄러운 놈')],
 "p16":[(1,'C','label','에이전틱 AI'),
        (1,'C','narr','기대 곡선의 꼭대기에 점 하나'),
        (2,'C','speech','나배움: 11화의 곡선으로 보면 지금 정점입니다\n올해 발표된 곡선에서 생성형은 골짜기로 내려갔고\n에이전트는 정점에 서 있습니다')],
 "p17":[(1,'C','speech','한실속: 저희도 에이전트 셋을 돌려요\n도입은 했는데 이익은 아직이에요\n하나는 보니까 예전 매크로더라고요'),
        (2,'C','label','워싱 체크'),
        (2,'C','speech','나배움: 14화의 워싱, 하나 걸렸네요')],
 "p18":[(1,'C','label','진입 3신호'),(1,'C','label','① 참조사례 확산'),(1,'C','label','② 매출 가속'),(1,'C','label','③ 완전완비제품'),
        (1,'C','speech','나배움: 응용 소프트웨어라 원칙 1, 볼링앨리에서 삽니다\n그래서 보는 신호는 첫째, 참조사례가 퍼지는가')],
 "p19":[(1,'C','speech','나배움: 실속 씨 회사 같은 실용주의자가\n옆 회사한테 쓴다고 말하기 시작하면 그때가 교두보예요'),
        (2,'C','think','나배움: 신호 하나, 아직 꺼져 있다')],
 "p20":[(1,'C','label','에이전틱 AI'),
        (1,'C','speech','나배움: 정점, 그리고 골짜기로 내려가는 길목\n스탠스는 관찰, 볼링앨리 신호가 켜지면 후보')],
 "p21":[(1,'C','speech','신중해: AI는 이제 익숙해요\n세 장이 다 다른 칸이네요'),
        (2,'C','speech','안믿어: 글쎄…\n셋 다 아직 살 게 없다는 소리 아니오')],
 "p22":[(1,'C','speech','주본질: 그럼 하나 더 묻자\n이 셋이 유행인지 구조인지는 어떻게 가르지?'),
        (2,'C','narr','판 옆을 지우고 그림 하나를 더 그렸다')],
 "p23":[(1,'C','label','유행: 인프라 그대로'),(1,'C','label','구조: 새 인프라·가치사슬'),
        (1,'C','speech','나배움: 찻잔 속 돌풍은 인프라가 그대로예요\n구조적 돌풍은 전선과 공장이 새로 깔립니다')],
 "p24":[(1,'C','speech','나배움: 1화의 계단이에요\n말에서 기차로 갈 때 길이 통째로 바뀌었듯이\n세 후보 다 새 인프라를 요구합니다'),
        (2,'C','speech','나배움: 구조적 돌풍만 고릴라를 낳습니다')],
 "p25":[(1,'C','narr','세 줄'),
        (2,'C','speech','주본질: 보너스 하나, 로봇은?')],
 "p26":[(1,'C','label','피지컬 AI'),
        (2,'C','speech','나배움: 초기시장입니다, 사는 곳은 자기 공장과 선도 고객뿐\n대부분 비상장이라 정중앙의 자리도 아직 아니고요\n18화의 알처럼 바구니 관찰만 합니다')],
 "p27":[(1,'C','narr','맥스도 마지막에 같은 말을 들었다'),
        (2,'C','speech','오라클: 일용품이 된 바퀴는 팔게\n그 돈으로 아직 이름 없는 것을 만들게')],
 "p28":[(1,'C','speech','나배움: 오늘의 세 줄은 제가 적겠습니다'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','speech','주본질: 하나도 안 고쳐 줄 게 없네\n내가 할 말이 없어졌어'),
        (2,'C','think','나배움: 처음으로, 내 눈으로 가리켰다')],
 "p30":[(1,'C','narr','박수는 짧았고, 탕수가 제일 컸다'),
        (2,'C','speech','주본질: 그런데 이렇게 좋은 걸 왜 다들 안 살까\n그게 다음 시간이야')],
 "p31":[(1,'C','narr','골짜기 앞에 사람들이 서 있었다, 다리는 반쯤 놓여 있었다')],
 "p32":[(1,'C','caption','Episode 38 끝 · 다음 화 · 왜 다들 안 사는가\n(두 개의 캐즘, 그리고 다리)')],
}

BANDS = {
 "p03":'2축 판(14화) · 가로 = 채택 위치(초기시장·캐즘 / 토네이도·중심가) · 세로 = 기대 위치(정점 / 골·언덕)',
 "p08":'후보 ① HBF · 초기시장 + 기대 상승 → 바구니 관찰 (26화 · 규격 공개, 샘플은 2027)',
 "p13":'후보 ② 온디바이스 AI · 캐즘을 건너는 중 + 공급 역풍 → 판별표를 분기마다 (메모리 가격)',
 "p20":'후보 ③ 에이전틱 AI · 정점에서 골로 가는 길목 · 응용 소프트웨어는 볼링앨리에서 산다(원칙 1) → 참조사례 확산 신호 관찰',
 "p23":'찻잔 속 돌풍(유행, 인프라 그대로) vs 구조적 돌풍(새 인프라·가치사슬) · 구조적 돌풍만 고릴라를 낳는다',
 "p26":'피지컬 AI · 초기시장 · 비상장 다수 · 정중앙의 자리는 아직 아니다 (18화 잠재 고릴라)',
}

NOTES = {
 "p02":'해설: 38화는 학습자가 멘토 없이 판을 채우는 회차다. 1화의 3×3 매트릭스에서 "정중앙"(산업·투자 지식이 모두 중간인 보통 사람)이 스스로 후보의 위치를 정하는 것이 이 시리즈의 목표였다',
 "p08":'사실 확인: HBF(High Bandwidth Flash, NAND를 적층한 고대역폭 플래시)는 2026년 8월 OCP를 통해 첫 기술 규격(오픈 표준)이 공개됐고, 선두 업체는 첫 제품의 샘플을 2027년, 양산을 2028년으로 안내했다(당초 2026년 하반기에서 순연). GPU 회사의 공식 채택은 확인되지 않았다(2026-10 기준, 작화 시 갱신). 특정 종목의 매수·매도를 권하지 않는다',
 "p13":'사실 확인: 시장조사 기관은 2026년 AI PC가 PC 출하의 과반(약 55%)을 차지할 것으로 전망했고, GPU 회사 칩 기반의 윈도 노트북이 2026년 10월 출시됐다. 그러나 메모리 가격 급등으로 2026년 PC·스마트폰 출하는 두 자릿수 감소가 경고됐다(스마트폰 -13.9% 전망). "캐즘을 건넜는가"는 자료가 엇갈리므로 분기마다 판별표를 다시 채운다(2026-10 기준)',
 "p16":'사실 확인: 2026년판 가트너 AI 하입사이클에서 에이전틱 AI는 "과잉 기대 정점", 생성형 AI는 "환멸의 골짜기"에 놓였다. 기업의 AI 에이전트 배포율은 17%, 2년 내 배포 계획을 합치면 60%를 넘으며, 2027년 말까지 에이전틱 AI 프로젝트의 40% 이상이 취소될 것이라는 전망도 함께 인용된다(2026-10 기준). Hype Cycle은 Gartner의 상표이며 도식은 개념을 재구성한 것이다',
 "p17":'해설: 대기업의 40%가 한 개 이상의 업무에 AI 에이전트를 확산했지만 이익 기여 응답은 전년과 같은 수준이라는 2026년 조사가 있다(McKinsey State of AI 2026). "도입은 늘고 이익은 제자리"는 14화의 에이전트 워싱(단순 자동화를 AI 에이전트로 둔갑)을 걸러야 하는 이유다',
 "p18":'해설: 원칙 1 "카테고리가 응용 소프트웨어라면 볼링앨리 단계에서 매수를 시작하라"(19화). 진입 3신호(32화)는 v4 기획의 보조 도구이며, 응용 소프트웨어는 첫째 신호(실용주의자 참조사례의 확산)가 가장 먼저 켜진다',
 "p23":'해설: "찻잔 속 돌풍 vs 구조적 돌풍"은 검토자 의견을 반영한 구분이다. 구조적 돌풍은 1화의 육상 교통 계단처럼 인프라와 가치사슬이 통째로 바뀌는 불연속 혁신에서만 나오며, 유행은 기존 인프라 위에서 소비만 늘었다 줄어든다',
 "p26":'사실 확인: 휴머노이드·피지컬 AI는 2026년 현재 판매 대상이 자사 공장과 소수 선도 고객에 그치고 외부 판매와 범용 용도가 확립되지 않은 초기시장이다. 미국의 대표 로봇 기업들은 비상장이며, 중국의 한 로봇 기업은 2026년 8월 상하이에 상장했다(2026-10 기준). 비상장 초기 단계는 18화에서 정리한 대로 개인 투자자의 자리가 아니다',
 "p27":'해설: 『마케팅 천재가 된 맥스』의 오라클은 마지막에 "일용품이 된 라인은 팔고 신기술에 재투자하라"고 조언한다(9화 모티프). 다음 고릴라를 가리키는 일은 옛 고릴라의 사이클 말기를 알아보는 일과 짝이다',
}

if __name__ == "__main__": run(globals())
