#!/usr/bin/env python3
# 고릴라 헌터스 Ep14 "두 곡선 겹쳐 읽기: 2축 판별 훈련" — 시즌 2 (30p)
# 2026-09-13 작성. season2-plan.md Ep14 · F3-8(결합·구분 훈련 완결) · F3-7(독자 판별 능력) · 에이전트 워싱·SPC(v4 Ep33 계승)
# usage: python3 gen_ep14.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP14"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep14")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP14 NOTE: the 2x2 board is always drawn as a clean hand sketch on the whiteboard with EXACTLY the labels listed; "
               "game pieces are small simple icons: a glowing sphere (quantum), a small car (EV), a stacked memory chip (HBM), a magnifying glass (search ads).")

GRID = ("a hand-drawn 2x2 grid: column labels on top '초기시장 · 캐즘' (left) and '토네이도 · 중심가' (right); row labels on the left "
        "'정점' (top) and '골 · 언덕' (bottom); the grid title above reads '채택 × 기대'")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A large dark game board divided into four squares, four small pieces (a glowing sphere, a small car, a stacked chip, a magnifying glass) resting on its edge waiting; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL at the whiteboard drawing the first lines of a grid; NA BAE-UM and the members watching. (2 ~45%) close on the marker finishing a cross shape (no labels yet).",
 "p03":f"One panel (~100%). The whiteboard shows {GRID}; the four cells are EMPTY; JU BON-JIL to the side; ONLY these five labels.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL explaining the two axes with two fingers; NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL handing NA BAE-UM four small paper cards, each showing ONLY a simple icon (sphere, car, stacked chip, magnifying glass), no text. (2 ~45%) NA BAE-UM at the board holding the sphere card, thinking.",
 "p06":f"One panel (~100%). The whiteboard {GRID}; the sphere icon is now placed in the TOP-LEFT cell; NA BAE-UM pressing it on; ONLY the five grid labels.",
 "p07":"Two panels. (1 ~55%) NA BAE-UM explaining the sphere placement, confident; HAN TANG-SU wincing at the memory. (2 ~45%) JU BON-JIL nodding once.",
 "p08":f"One panel (~100%). The whiteboard {GRID}; the sphere in the top-left cell and now the small car icon placed in the BOTTOM-LEFT cell; NA BAE-UM stepping back; ONLY the five grid labels.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM explaining the car, gesturing a canyon with his hands; HAN SIL-SOK nodding (he still drives a hybrid). (2 ~45%) JU BON-JIL adding a small hand-drawn basket sketch under the car (no text).",
 "p10":f"One panel (~100%). The whiteboard {GRID}; sphere top-left, car bottom-left, and now the stacked chip icon placed in the BOTTOM-RIGHT cell; NA BAE-UM pressing it on; ONLY the five grid labels.",
 "p11":"Two panels. (1 ~55%) NA BAE-UM explaining HBM, both curves rising together gesture; JU BON-JIL pleased. (2 ~45%) JU BON-JIL drawing a small gorilla sketch next to the chip (no text).",
 "p12":f"One panel (~100%). The whiteboard {GRID} with all four pieces: sphere top-left, car bottom-left, stacked chip bottom-right, and the magnifying glass icon placed in the BOTTOM-RIGHT cell to the right of the chip but slightly lower, with a small hand-drawn sunset icon beside it; ONLY the five grid labels.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM explaining the magnifying glass, calmer tone; SHIN JUNG-HAE (cardigan) nodding, she uses search every day. (2 ~45%) JU BON-JIL pointing at the empty TOP-RIGHT cell with a raised eyebrow.",
 "p14":"Two panels. (1 ~55%) NA BAE-UM puzzled at the empty top-right cell; JU BON-JIL waiting. (2 ~45%) NA BAE-UM's face lighting up.",
 "p15":"One panel (~100%). The whiteboard: a clean hand-drawn STANCE table with four rows, each row a cell name on the left and a stance on the right, exactly: '초기시장 + 정점' → '관망 또는 RIDE' ; '캐즘 + 골' → '바구니에 담고 건너는지 관찰' ; '토네이도 + 언덕' → '고릴라 매수·보유' ; '중심가 + 안정기' → '보유, 카테고리 교체 감시'; JU BON-JIL to the side; ONLY these labels.",
 "p16":"Two panels. (1 ~55%) HAN TANG-SU asking with a grin; JU BON-JIL with a dry look. (2 ~45%) JU BON-JIL tapping each row of the stance table in turn.",
 "p17":"Two panels. (1 ~55%) NA BAE-UM copying the stance table; the notebook shows ONLY the four stance lines hand-written: '정점 → 관망·RIDE' / '골 → 바구니 관찰' / '언덕 → 고릴라 매수' / '안정기 → 보유·교체 감시'. (2 ~45%) NA BAE-UM's satisfied face.",
 "p18":"Two panels. (1 ~55%) HAN SIL-SOK raising a hand with a wry look, phone (screen OFF) in hand. (2 ~45%) close on HAN SIL-SOK, a knowing half-smile.",
 "p19":"Two panels. (1 ~55%) a small inset vignette (no readable text): an anonymous salesperson pointing at a slide that shows ONLY a robot icon, while behind the curtain a tiny old-fashioned wind-up toy robot does the actual work; comic. (2 ~45%) JU BON-JIL nodding grimly at HAN SIL-SOK's story.",
 "p20":"One panel (~100%). The whiteboard: a hand-drawn two-column card titled '워싱 판별' with three rows, exactly: '스스로 판단하나' / '정해진 순서만 따르나' ; '실패를 고치나' / '멈추나' ; '새 일에도 쓰나' / '한 가지만 하나'; the left column headed '에이전트', the right column headed '매크로'; JU BON-JIL to the side; ONLY these labels.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL explaining the card; HAN SIL-SOK ticking the right column mentally, nodding. (2 ~45%) NA BAE-UM's notebook close-up: ONLY one hand-written line: '이름표가 아니라 하는 일을 본다'.",
 "p22":"Two panels. (1 ~55%) JU BON-JIL turning to a new point, holding up one finger and drawing a small single box on the board (no text). (2 ~45%) HAN TANG-SU curious.",
 "p23":"One panel (~100%). The whiteboard: a hand-drawn contrast: LEFT a single tall tower labeled '제품 하나' with a shaky base, RIGHT a low wide platform of several blocks labeled '완전완비제품'; between them a small red arrow pointing at the tower with the word '함정'; JU BON-JIL presenting; ONLY these three labels.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL explaining the single-product trap; NA BAE-UM sober. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL pulling three fresh blank cards from his pocket like a card dealer, playful. (2 ~45%) NA BAE-UM rolling up his sleeves, ready.",
 "p26":"Two panels, the test. (1 ~55%) JU BON-JIL holding up the first card (blank, no text), describing it; NA BAE-UM answering instantly, pointing at the top-left cell of the grid (labels as p03). (2 ~45%) JU BON-JIL holding up the second card; NA BAE-UM pointing at the bottom-right cell.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL holding up the third card with a sly look; NA BAE-UM hesitating, then pointing at the tower sketch (as p23) instead of the grid. (2 ~45%) JU BON-JIL laughing, clapping once.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '채택 한 축, 기대 한 축' / '칸마다 사는 법이 다르다' / '이름표 말고 하는 일'.",
 "p29":"Two panels. (1 ~55%) at the door JU BON-JIL turns with a new question for the group. (2 ~45%) a faint dreamy background image drawn in webtoon ink style: two jungles side by side, one with a gorilla silhouette on a throne, one with a crowned king silhouette on a castle wall; NO text.",
 "p30":"One panel (~100%). Closing chapter-end: the two jungles in the distance; NA BAE-UM and JU BON-JIL small figures at a forked path; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 14\n두 곡선 겹쳐 읽기\n채택 한 축, 기대 한 축, 칸마다 사는 법이 다르다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','주본질: 오늘은 두 곡선을 한 판에 놓는다\n가로는 채택, 세로는 기대'),
        (2,'C','narr','판이 하나 그려졌다')],
 "p03":[(1,'C','label','채택 × 기대'),(1,'C','label','초기시장 · 캐즘'),(1,'C','label','토네이도 · 중심가'),(1,'L','label','정점'),(1,'L','label','골 · 언덕'),
        (1,'C','speech','주본질: 왼쪽은 아직 실용주의자가 안 온 곳\n오른쪽은 온 곳\n위는 기대가 뜨거운 때, 아래는 식은 때')],
 "p04":[(1,'C','speech','주본질: 종목 하나를 보면 두 가지를 물어\n실용주의자가 사고 있나, 그리고 기대는 어디쯤인가'),
        (2,'C','think','나배움: 시즌 1의 질문과 시즌 2의 질문')],
 "p05":[(1,'C','speech','주본질: 카드 넷이야\n양자컴퓨터, 전기차, HBM, 검색광고\n네가 놓아봐'),
        (2,'C','think','나배움: 양자부터')],
 "p06":[(1,'C','speech','나배움: 양자는 초기시장에 정점\n지난주에 본 그 칸이죠')],
 "p07":[(1,'C','speech','나배움: 실용주의자는 아직 없고\n기대는 뉴스 한 줄에 반토막이 날 만큼 뜨거워요'),
        (2,'C','speech','주본질: 그 칸의 스탠스는 뭐였지?\n관망 아니면 RIDE')],
 "p08":[(1,'C','speech','나배움: 전기차는 캐즘에 골\n3화에서 봤듯이 실용주의자가 관망 중이고\n기대는 이미 식었어요')],
 "p09":[(1,'C','speech','나배움: 충전이라는 완전완비제품이 안 채워져서\n하이브리드로 우회 중이죠'),
        (2,'C','speech','주본질: 이 칸은 바구니에 담고\n골짜기를 건너는지 지켜보는 칸이야')],
 "p10":[(1,'C','speech','나배움: HBM은 토네이도에 언덕\n실용주의자, 그러니까 빅테크가 줄을 섰고\n기대도 높지만 매출이 받쳐요')],
 "p11":[(1,'C','speech','나배움: 가격과 매출이 나란히 올라가는\n12화의 왼쪽 그림이요'),
        (2,'C','speech','주본질: 이 칸이 고릴라를 사는 칸이야\n시즌 1 전체가 이 칸을 찾는 법이었지')],
 "p12":[(1,'C','speech','나배움: 검색광고는 중심가에 안정기\n다들 매일 쓰는데 아무도 신기해하지 않아요')],
 "p13":[(1,'C','speech','신중해: 저도 검색은 하루에 스무 번 해요\n근데 그게 회사 이름인지도 몰랐어요'),
        (2,'C','speech','주본질: 그게 안정기의 얼굴이야\n근데 배움아, 오른쪽 위 칸이 비었네')],
 "p14":[(1,'C','speech','나배움: 토네이도인데 기대가 정점인 칸…\n어, 이건 그냥 좋은 거 아니에요?'),
        (2,'C','speech','나배움: 아, 토네이도 초입이구나\n실용주의자가 막 들어오는데 기대도 최고인 때')],
 "p15":[(1,'C','speech','주본질: 칸마다 스탠스를 정해두자\n한 번 정해두면 뉴스가 와도 안 흔들려'),
        (1,'C','label','초기시장 + 정점 → 관망 또는 RIDE'),(1,'C','label','캐즘 + 골 → 바구니에 담고 건너는지 관찰'),
        (1,'C','label','토네이도 + 언덕 → 고릴라 매수·보유'),(1,'C','label','중심가 + 안정기 → 보유, 카테고리 교체 감시')],
 "p16":[(1,'C','speech','한탕수: 그럼 네 칸 다 사면 되는 거죠?'),
        (2,'C','speech','주본질: 칸마다 사는 법이 달라\n위 칸은 작게 짧게, 아래 오른쪽은 크게 길게\n왼쪽 아래는 사는 게 아니라 지켜보는 거야')],
 "p17":[(1,'C','narr','네 줄이 노트에 자리를 잡았다'),
        (2,'C','think','나배움: 판 하나에 시즌 1과 2가 다 들어갔다')],
 "p18":[(1,'C','speech','한실속: 하나 여쭤볼게요\n우리 회사가 AI 에이전트를 도입했다고 발표했는데요'),
        (2,'C','speech','한실속: 열어보니까 그냥 매크로던데요\n정해진 버튼만 누르는')],
 "p19":[(1,'C','narr','포장은 에이전트, 속은 태엽 장난감'),
        (2,'C','speech','주본질: 그걸 에이전트 워싱이라고 해\n정점마다 꼭 나타나는 장사야')],
 "p20":[(1,'C','label','워싱 판별'),(1,'C','label','에이전트'),(1,'C','label','매크로'),
        (1,'C','speech','주본질: 이름표 말고 하는 일을 봐\n스스로 판단하나, 실패를 고치나, 새 일에도 쓰나\n셋 다 아니면 매크로야')],
 "p21":[(1,'C','speech','주본질: 이걸로 12화의 판별표 셋째 줄\n완전완비제품을 채우는 거야\n워싱이면 제품이 없는 거니까'),
        (2,'C','narr','한 줄을 크게 적었다')],
 "p22":[(1,'C','speech','주본질: 하나 더, 이 판에서 가장 헷갈리는 함정'),
        (2,'C','think','한탕수: 또 함정이야?')],
 "p23":[(1,'L','label','제품 하나'),(1,'R','label','완전완비제품'),(1,'C','label','함정'),
        (1,'C','speech','주본질: 제품 하나에 운명을 건 회사야\n초기시장 매출이 빨리 뜨면\n토네이도처럼 보이거든')],
 "p24":[(1,'C','speech','주본질: 그런데 완전완비제품도 생태계도 없어서\n골짜기에서 무너져\n상장 직후 폭등했다 폭락하는 회사들이 대개 이거야'),
        (2,'C','think','나배움: 매출 속도가 아니라 받침대를 본다')],
 "p25":[(1,'C','speech','주본질: 시험이다, 카드 셋\n즉답해'),
        (2,'C','think','나배움: 좋아')],
 "p26":[(1,'C','speech','주본질: 정부와 연구소만 사고, 시총은 매출의 오십 배'),
        (1,'C','speech','나배움: 초기시장에 정점, 관망'),
        (2,'C','speech','주본질: 빅테크가 줄을 섰고, 매출이 분기마다 가속'),
        (2,'C','speech','나배움: 토네이도에 언덕, 고릴라 매수')],
 "p27":[(1,'C','speech','주본질: 제품 하나로 상장 첫날 두 배, 고객은 둘'),
        (1,'C','speech','나배움: 그건… 칸이 아니라 함정이요\n4화의 그 회사'),
        (2,'C','speech','주본질: 합격\n시즌 2의 반이 끝났다')],
 "p28":[(1,'C','speech','주본질: 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','speech','주본질: 자, 이제 같은 칸 안의 질문이야\n토네이도에서 누가 진짜 1등인가'),
        (2,'C','narr','정글은 둘이었다')],
 "p30":[(1,'C','caption','Episode 14 끝 · 다음 화 · 두 정글: 영장류와 킹덤\n(독점 아키텍처인가, 개방형인가)')],
}

BANDS = {
 "p03":'2축 판별 · 가로 = 채택(실용주의자가 왔나) · 세로 = 기대(정점인가 골인가) · 종목 하나에 두 질문',
 "p15":'칸마다 스탠스 · 정점=관망·RIDE · 골=바구니 관찰 · 언덕=고릴라 매수 · 안정기=보유·교체 감시',
 "p20":'에이전트 워싱 판별 · 이름표가 아니라 하는 일 · 스스로 판단·실패 수정·새 일 적용, 셋 다 아니면 매크로',
 "p23":'단일 제품 기업의 함정 · 초기시장 매출이 빨리 뜨면 토네이도처럼 보인다 · 받침대(완전완비제품·생태계)를 본다',
}

NOTES = {
 "p03":'해설: 2축 판별판은 기술수용주기(채택)와 하입사이클(기대)을 한 판에 놓기 위한 고릴라 헌터스 클럽의 도구다. Moore 원전의 도식이 아니며, 두 곡선을 겹쳐 읽는 법(11화)을 실습용으로 단순화한 것이다',
 "p12":'해설: 각 카드의 위치는 2026-09 기준의 예시다. 양자컴퓨터(13화), 전기차 BEV(3화), HBM(6·10화), 검색광고(2화의 고릴라 방어전)를 시즌 1·2에서 배운 그대로 배치했다. 시간이 지나면 위치는 옮겨 간다',
 "p15":'해설: 네 스탠스는 Moore의 매수·매도 원칙(19화에서 정리)을 칸별로 압축한 것이다. 토네이도 칸의 매수는 원칙 1·2(카테고리 유형별 타이밍), 캐즘 칸의 바구니 관찰은 원칙 3과 이어진다',
 "p19":'사실 확인: 가트너는 2025년 단순 자동화·챗봇을 "AI 에이전트"로 재포장해 파는 "에이전트 워싱(agent washing)"을 경고하며, 2027년까지 에이전틱 AI 프로젝트의 40% 이상이 취소될 것으로 전망했다',
 "p23":'해설: 단일 제품 기업(SPC, Single Product Company)은 초기시장에서 매출이 급증해 토네이도처럼 보이지만 완전완비제품·생태계가 없어 캐즘에서 무너지기 쉽다. 상장 직후 폭등 후 폭락한 다수의 사례가 이 유형이다(4화의 Cerebras 참조)',
 "p27":'해설: 시험 카드 세 장은 가상의 요약이며 특정 종목의 매수·매도를 권하지 않는다. 세 번째 카드는 4화에서 다룬 상장 사례의 구조를 요약한 것이다',
}

if __name__ == "__main__": run(globals())
