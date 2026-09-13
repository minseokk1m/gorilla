#!/usr/bin/env python3
# 고릴라 헌터스 Ep12 "하입은 어떻게 재는가" — 시즌 2 (32p)
# 2026-09-13 작성. season2-plan.md Ep12 · F3-8(측정법: 심리) · F3-7(판별표 5행 확장)
# usage: python3 gen_ep12.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP12"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep12")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP12 NOTE: whenever a chart is specified it is a clean hand-drawn whiteboard sketch with ONLY the labels listed; "
               "never add numbers, tickers, dates or axis values that are not listed.")

TABLE5 = ("the FIVE-row checklist TABLE titled '초기시장인가, 골짜기를 건넜나' with column headers '초기시장' and '골짜기 건넘', row labels down the left '누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출', and cell texts row by row '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; '없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴' (the fifth row in RED marker)")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A large old-fashioned glass thermometer with a RED column risen near the top, and beside it a bare stock-chart silhouette (thin line, no text); dark backdrop. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, hands spread as if holding something invisible; JU BON-JIL amused. (2 ~45%) JU BON-JIL holding up an open hand, five fingers spread.",
 "p03":"Two panels. (1 ~55%) the whiteboard: ONLY a big hand-drawn number '5' inside a circle with five short empty spokes radiating from it (no words); JU BON-JIL beside it. (2 ~45%) HAN TANG-SU (red cap) leaning forward, curious despite himself; NA BAE-UM ready with his notebook.",
 "p04":"One panel (~100%). The whiteboard: two hand-drawn curves rising together from the left, labeled at their right ends '가격' (red) and '매출' (blue); they stay close for the first half, then the red '가격' curve shoots far above while the blue '매출' curve keeps a gentle slope; the vertical gap between them is shaded lightly and labeled '기대'; ONLY these three labels; JU BON-JIL pointing at the shaded gap.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL explaining the gap, calm; NA BAE-UM tracing the gap with his eyes. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear in this panel; the thought balloon belongs to NA BAE-UM.",
 "p06":"One split panel (~100%), LEFT vs RIGHT. LEFT half: two curves rising together nearly overlapping, a small clean label 'HBM'; RIGHT half: a red curve far above a flat blue curve, a small clean label '탕수의 종목'; a bold VS badge center; ONLY these two labels.",
 "p07":"Two panels. (1 ~55%) HAN TANG-SU wincing at the right half of the board; JU BON-JIL not unkind. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '도구 1 · 가격과 매출의 거리' / '벌어진 만큼이 기대'.",
 "p08":"Two panels. (1 ~55%) JU BON-JIL turning to a laptop on the table whose screen shows ONLY a simple line chart with a gentle wave that spikes sharply at the right end (no text, no numbers, no logos); the group leaning in. (2 ~45%) JU BON-JIL tapping the spike.",
 "p09":"One panel (~100%). The whiteboard: a hand-drawn search-volume curve with a sharp spike, axis labels ONLY '검색량' (vertical) and '시간' (horizontal); under the spike a small cluster of newspaper icons; beside the curve a small magnifying-glass icon; JU BON-JIL presenting; ONLY these two labels.",
 "p10":"Two panels. (1 ~55%) HAN SIL-SOK (knit vest, glasses) speaking from the table, one hand raised mildly. (2 ~45%) JU BON-JIL nodding, pointing at HAN SIL-SOK with the marker.",
 "p11":"Two panels. (1 ~55%) NA BAE-UM writing; HAN TANG-SU peeking at his own phone (screen OFF). (2 ~45%) the notebook close-up: ONLY these hand-written lines: '도구 2 · 검색량과 뉴스량' / '검색은 기대, 구매는 채택'.",
 "p12":"One panel (~100%). The whiteboard with three simple hand-drawn icons in a row, each with ONE small Korean label under it: a crowd of small stick figures with coins labeled '개인 순매수', a tilted balance scale with a coin stack labeled '신용잔고', a new bank passbook labeled '신규 계좌'; JU BON-JIL to the side; ONLY these three labels.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL explaining, serious; AN MID-EO (flip phone) at the table snorting skeptically. (2 ~45%) close on AN MID-EO's stern face, flip phone in hand.",
 "p14":"One panel (~100%). The whiteboard with two hand-drawn icons and ONE label each: a report page with three upward arrows labeled '목표가 상향 러시'; a podium microphone with a small speech cloud that contains ONLY the letters 'AI' repeated three times, labeled '실적발표 AI 언급'; JU BON-JIL presenting; ONLY these labels and the letters AI.",
 "p15":"One panel (~100%). The whiteboard with two hand-drawn icons and ONE label each: a row of five identical new boxes on a shelf labeled '테마 ETF 러시'; a ringing bell over a stock-exchange floor sketch labeled 'IPO 러시'; JU BON-JIL presenting; ONLY these labels.",
 "p16":"Two panels. (1 ~55%) NA BAE-UM counting on five fingers, JU BON-JIL beside; the whiteboard behind is BLANK. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '1 가격과 매출' / '2 검색량' / '3 개인 순매수' / '4 목표가·AI 언급' / '5 테마 ETF·IPO'.",
 "p17":"Two panels. (1 ~55%) JU BON-JIL erasing the board with a cloth, turning with a new idea; NA BAE-UM curious. (2 ~45%) JU BON-JIL holding up the notebook from Ep3 (a plain notebook, no text visible) as if recalling something.",
 "p18":"One panel (~100%). The whiteboard shows the checklist TABLE from Ep3 now with FIVE rows, titled '초기시장인가, 골짜기를 건넜나'; column headers '초기시장' and '골짜기 건넘'; row labels down the left: '누가 사나', '참조사례', '완전완비제품', '매출', '시총 대비 매출'; cell texts row by row: '선구자만' / '실용주의자도' ; '비전을 말함' / '동료가 쓴다고 함' ; '없음' / '있음' ; '띄엄띄엄' / '가속' ; '매출 없이 시총만' / '매출이 시총을 따라옴'; the fifth row is drawn in RED marker to show it is new; JU BON-JIL to the side; ONLY these labels, every cell filled exactly.",
 "p19":f"Two panels. (1 ~55%) the whiteboard shows {TABLE5}; JU BON-JIL tapping the red fifth row; NA BAE-UM nodding; every cell filled exactly as written, nothing else on the board. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p20":f"Two panels. (1 ~55%) JU BON-JIL handing NA BAE-UM two blank index cards; NA BAE-UM taking them, determined; the whiteboard in the background is out of focus. (2 ~45%) NA BAE-UM at the whiteboard for the first time this season, marker in hand; the whiteboard shows {TABLE5}; every cell filled exactly as written, nothing else on the board.",
 "p21":f"One panel (~100%). ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and the speech balloon tail points at HIM; JU BON-JIL (grey hair, glasses, navy knit) is seated at the table listening and does NOT speak (a grey-haired man at the board would be WRONG). The whiteboard shows {TABLE5}, now with an extra column at the far right headed 'HBM' containing five check marks aligned with the '골짜기 건넘' side; ONLY the table labels, the header 'HBM' and check marks.",
 "p22":"Two panels. (1 ~55%) NA BAE-UM (black hair, no glasses, charcoal shirt) standing at the table explaining HBM row by row, confident, holding his notebook; HAN SIL-SOK nodding; the whiteboard behind them is out of frame or completely BLANK (NO writing, NO table, NO drawings). (2 ~45%) JU BON-JIL's approving face, plain background.",
 "p23":f"One panel (~100%). ABSOLUTE RULE: the presenter standing at the whiteboard is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and the speech balloon tail points at HIM; JU BON-JIL (grey hair, glasses) is seated and silent (a grey-haired man at the board would be WRONG). The whiteboard shows {TABLE5}, with two extra columns at the far right: one headed 'HBM' with five check marks on the '골짜기 건넘' side, and one headed '탕수의 종목' with five X marks on the '초기시장' side; NA BAE-UM presenting, HAN TANG-SU sinking in his chair; ONLY the table labels, the two headers, check and X marks.",
 "p24":"Two panels. (1 ~55%) HAN TANG-SU protesting weakly; NA BAE-UM apologetic but firm. (2 ~45%) JU BON-JIL summarizing with two fingers up.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL writing on a corner of the board ONLY: '4/5 이상 → 토네이도' and '3/5 이하 → 하입 의심' as two short lines; NA BAE-UM copying. (2 ~45%) the notebook close-up: ONLY those same two lines hand-written.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU asking, half hopeful; JU BON-JIL with a sly smile. (2 ~45%) close on JU BON-JIL's eyes behind the glasses, a glint.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL holding his phone toward HAN TANG-SU: the screen shows ONLY a simple curve with a single dot near its peak (no text, no logo); HAN TANG-SU gulps. (2 ~45%) NA BAE-UM watching them both, thoughtful.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the day's summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '기대는 다섯 군데에 흔적을 남긴다' / '판별표는 이제 다섯 줄' / '넷 이상 우측이면 토네이도'.",
 "p29":"Two panels, quiet beat. (1 ~60%) evening study room, members leaving, NA BAE-UM folding the two index cards into his notebook. (2 ~40%) NA BAE-UM's face, a quiet confidence.",
 "p30":"Two panels. (1 ~55%) at the door JU BON-JIL turns back with a teasing question; NA BAE-UM stops. (2 ~45%) JU BON-JIL's knowing smile as he mentions the next case.",
 "p31":"One panel (~100%). A dark moody image: a glowing cluster of small spheres connected by faint lines (an abstract quantum-computer motif, NO text), and above it a thin red peak silhouette; anticipatory; keep webtoon ink style.",
 "p32":"One panel (~100%). Closing chapter-end: a large old-fashioned thermometer silhouette standing on a hill and a faint five-row grid silhouette in the sky; NA BAE-UM and JU BON-JIL small figures looking at them; the top of the page has NO band and NO text; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered, nothing written anywhere else.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 12\n하입은 어떻게 재는가\n심리는 흔적을 남긴다, 다섯 군데에\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','나배움: 기대는 눈에 안 보이잖아요\n온도계를 어디에 꽂아요?'),
        (2,'C','speech','주본질: 심리는 반드시 흔적을 남겨\n오늘은 그 흔적 다섯 개를 배운다')],
 "p03":[(1,'C','speech','주본질: 하나씩 가자\n첫째는 가장 정직한 흔적이야'),
        (2,'C','think','한탕수: 다섯 개나 봐야 한다고?')],
 "p04":[(1,'C','speech','주본질: 가격과 매출을 같은 판에 그려\n둘 사이가 벌어진 만큼이 기대야'),
        (1,'L','label','가격'),(1,'L','label','매출'),(1,'C','label','기대')],
 "p05":[(1,'C','speech','주본질: 매출이 가격을 따라오면 채택이 기대를 받쳐주는 거고\n못 따라오면 기대 혼자 앞서 달리는 거지'),
        (2,'C','think','나배움: 시총 대비 매출, 그 비율이 온도구나')],
 "p06":[(1,'L','label','HBM'),(1,'R','label','탕수의 종목'),
        (1,'C','narr','같은 상승, 다른 거리')],
 "p07":[(1,'C','speech','주본질: HBM은 가격이 뛴 만큼 매출이 뛰었어\n탕수 종목은 가격만 뛰었지'),
        (2,'C','narr','첫 번째 도구를 적었다')],
 "p08":[(1,'C','speech','주본질: 둘째, 사람들이 뭘 찾아보는지\n검색량과 뉴스량이야'),
        (2,'C','speech','주본질: 이 뾰족한 데가 기대의 정점과 거의 같이 와')],
 "p09":[(1,'C','label','검색량'),(1,'C','label','시간'),
        (1,'C','narr','검색은 공짜다\n그래서 기대의 온도를 제일 빨리 보여준다')],
 "p10":[(1,'C','speech','한실속: 우리 회사 사람들도 검색은 다 해봤어요\n근데 산 사람은 없어요'),
        (2,'C','speech','주본질: 그게 핵심이야\n검색은 기대고, 구매는 채택이지')],
 "p11":[(1,'C','narr','두 번째 도구'),
        (2,'C','think','한탕수: 나도 검색만 했나…')],
 "p12":[(1,'C','speech','주본질: 셋째, 돈의 흔적\n개인 순매수, 신용잔고, 신규 계좌\n셋이 같이 뛰면 기대가 시장에 들어온 거야'),
        (1,'L','label','개인 순매수'),(1,'C','label','신용잔고'),(1,'R','label','신규 계좌')],
 "p13":[(1,'C','speech','주본질: 특히 빚내서 사는 돈이 늘면\n정점이 가까운 신호야'),
        (2,'C','speech','안믿어: 난 빚은 절대 안 내\n그래서 여태 산 게 없지만')],
 "p14":[(1,'C','speech','주본질: 넷째, 전문가의 흔적\n증권사 목표가가 줄줄이 오르고\n실적발표에서 AI라는 말이 늘면'),
        (1,'L','label','목표가 상향 러시'),(1,'R','label','실적발표 AI 언급')],
 "p15":[(1,'C','speech','주본질: 다섯째, 상품의 흔적\n같은 테마 ETF가 줄줄이 나오고\n그 테마로 상장하는 회사가 줄을 서면'),
        (1,'L','label','테마 ETF 러시'),(1,'R','label','IPO 러시')],
 "p16":[(1,'C','speech','나배움: 가격과 매출, 검색량, 개인 순매수\n목표가와 AI 언급, 테마 ETF와 IPO\n다섯 개 다 외웠어요'),
        (2,'C','narr','다섯 줄이 노트에 자리를 잡았다')],
 "p17":[(1,'C','speech','주본질: 자, 이제 3화에서 만든\n그 판별표를 꺼내 보자'),
        (2,'C','speech','주본질: 네 줄이었지\n오늘 한 줄을 더 붙인다')],
 "p18":[(1,'C','speech','주본질: 다섯째 줄, 시총 대비 매출\n첫째 도구를 판별표에 그대로 넣는 거야')],
 "p19":[(1,'C','speech','주본질: 이제 이 표 하나로\n채택도 보고 기대도 본다'),
        (2,'C','think','나배움: 시즌 1의 표가 자랐다')],
 "p20":[(1,'C','speech','주본질: 실습이다\nHBM과 탕수의 종목, 둘 다 채워봐'),
        (2,'C','think','나배움: 이번엔 내가 앞에 선다')],
 "p21":[(1,'C','label','HBM'),
        (1,'C','speech','나배움: 실용주의자도 삽니다, 빅테크가 줄을 섰으니까\n동료 참조사례 있음, 완전완비제품 있음\n매출 가속, 시총을 매출이 따라옴')],
 "p22":[(1,'C','speech','나배움: 다섯 줄 전부 오른쪽\n토네이도 맞네요'),
        (2,'C','speech','주본질: 정확해\n기대도 높지만 채택이 받치고 있지')],
 "p23":[(1,'C','label','탕수의 종목'),
        (1,'C','speech','나배움: 선구자만, 비전만, 완전완비제품 없음\n매출 띄엄띄엄, 시총만 컸어요\n다섯 줄 전부 왼쪽입니다')],
 "p24":[(1,'C','speech','한탕수: 형, 너무 냉정한 거 아니에요?'),
        (2,'C','speech','주본질: 표가 냉정한 거지 배움이가 냉정한 게 아니야\n표를 들고 다니라는 게 그 뜻이야')],
 "p25":[(1,'C','speech','주본질: 우리 클럽의 규칙은 이래\n다섯 중 넷 이상 오른쪽이면 토네이도\n셋 이하면 하입을 의심한다'),
        (2,'C','narr','두 줄을 적었다')],
 "p26":[(1,'C','speech','한탕수: 그럼 하입은 무조건 피하는 거예요?'),
        (2,'C','speech','주본질: 아니\n알고 타는 법이 따로 있어')],
 "p27":[(1,'C','speech','주본질: 다음 시간엔 지금 정점 근처에 있는\n진짜 회사들로 그걸 해본다'),
        (2,'C','think','나배움: 알고 탄다고?')],
 "p28":[(1,'C','speech','주본질: 오늘도 세 줄이면 돼'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','narr','카드 두 장을 노트에 끼웠다\n하나는 HBM, 하나는 반면교사'),
        (2,'C','think','나배움: 이제 온도계는 있다')],
 "p30":[(1,'C','speech','주본질: 배움아, 양자컴퓨터 뉴스 봤나?'),
        (2,'C','speech','주본질: 초기시장은 진짜인데\n가격이 미래를 다 당겨 쓴 사례야')],
 "p31":[(1,'C','emph','초기시장은 진짜다\n그런데 가격이 초기시장을 넘어섰다면')],
 "p32":[(1,'C','caption','Episode 12 끝 · 다음 화 · 초기시장의 과열: 양자컴퓨터\n(알고 타는 법, RIDE와 EXIT)')],
}

BANDS = {
 "p04":'도구 1 · 가격과 매출을 같은 판에 그린다 · 벌어진 거리가 기대 = 시총 대비 매출',
 "p10":'도구 2 · 검색량·뉴스량은 기대의 온도 · 검색은 기대, 구매는 채택',
 "p12":'도구 3 · 개인 순매수·신용잔고·신규 계좌 · 빚내서 사는 돈이 늘면 정점이 가깝다',
 "p18":'판별표 5행 · 누가 사나 · 참조사례 · 완전완비제품 · 매출 · 시총 대비 매출',
 "p25":'클럽 규칙 · 5행 중 4행 이상 우측 = 토네이도 · 3행 이하 = 하입 의심',
}

NOTES = {
 "p04":'해설: 시총 대비 매출(PSR, 주가매출비율)은 기업 가치가 매출의 몇 배로 매겨졌는지를 뜻한다. 매출 없이 시총만 커지면 기대가 앞선 것이고, 매출이 시총을 따라오면 채택이 기대를 받치는 것이다',
 "p09":'해설: 검색량 추이는 네이버 데이터랩·구글 트렌드에서 누구나 무료로 볼 수 있다. 검색량 정점은 대개 기대의 정점과 겹치며, 실제 구매(채택)는 그보다 늦게 온다',
 "p12":'해설: 신용잔고(신용융자 잔고)는 증권사에서 돈을 빌려 산 주식의 총액이다. 개인 순매수·신용잔고·신규 계좌가 함께 급증하는 시기는 역사적으로 정점 부근이었다',
 "p14":'해설: 목표가 상향이 줄을 잇거나 실적발표에서 특정 키워드(예: AI) 언급 횟수가 급증하는 것도 기대의 흔적이다. 전문가도 정점을 만든다',
 "p18":'해설: 3화의 판별표 4행에 "시총 대비 매출" 행을 더한 5행 판별표가 이후 시즌 2의 기본 도구다. 4행까지는 채택(누가 사는가)을, 5행은 기대(얼마에 사는가)를 본다',
 "p21":'사실 확인: HBM(고대역폭 메모리)은 2023년 이후 AI 가속기 수요로 매출이 비선형으로 급증했고, SK하이닉스가 선두, 삼성전자·마이크론이 추격 중이다(2026-09 기준). 시즌 1 Ep6·Ep10 참조',
 "p25":'해설: "4/5 이상이면 토네이도, 3/5 이하면 하입 의심"은 Moore 원전이 아니라 고릴라 헌터스 클럽의 보조 규칙이다. 판단의 출발점이지 결론이 아니다',
}

if __name__ == "__main__": run(globals())
