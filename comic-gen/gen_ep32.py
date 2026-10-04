#!/usr/bin/env python3
# 고릴라 헌터스 Ep32 "언제, 얼마에: 진입 3신호와 매수 4원칙" — 시즌 4 (31p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep32 · v4 Ep30(토네이도 진입 3신호)·Ep34(매수 가격 4원칙·밸류에이션 함정) 계승 + 김경윤 피드백(RIDE는 전술)
# 진입 3신호·매수 4원칙은 Moore 원전이 아닌 v4 기획의 보조 도구임을 해설에 고지. 2023년 1분기 회상은 보드 위 도식만, 실존 인물·로고 금지
# ※ 작화 직전 season34-facts.md 갱신: 2023년 데이터센터 매출 급증 분기 서술 재확인
# usage: python3 gen_ep32.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP32"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep32")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP32 NOTE: every chart in this episode is a clean hand-drawn whiteboard sketch with ONLY the labels listed, NO numbers unless specified. "
               "Company names appear ONLY as clean labels if specified; NEVER real logos, real product photos or real people. "
               "HAN TANG-SU's phone screen is always OFF unless a page specifies blurred shapes. The hunting log is a plain kraft-cover notebook.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "

LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s MAN, short BLACK hair, NO glasses, charcoal button shirt) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

SIG3 = ("a hand-drawn card titled '진입 3신호' showing three small traffic-light icons in a row, each with ONE label beneath, exactly: '① 참조사례 확산' / '② 매출 가속' / '③ 완전완비제품'")
SIG3_OFF = (SIG3 + "; all three lights are drawn DARK (unlit)")
SIG3_ON = (SIG3 + "; all three lights are drawn bright GREEN")
SIG3_TWO = (SIG3 + "; the first two lights are GREEN and the third is DARK")
ACC = ("a hand-drawn bar chart of four quarterly bars that rise more steeply each time (the fourth bar far taller than the third), with ONE label above: '분기 매출', NO numbers")
WP7 = ("a hand-drawn ring of seven small boxes around a center circle labeled '핵심', the seven boxes labeled exactly '보조 제품', '서비스', '표준', '도구', '교육', '커뮤니티', '협력사'")
VAL2 = ("a hand-drawn two-bar sketch: LEFT a tall bar labeled '지금 · PER 높다', RIGHT a bar half as tall labeled '매출 두 배 뒤 · PER 절반', with a small arrow from left to right")
BUY4 = ("a hand-drawn card titled '매수 4원칙' with four lettered lines exactly: 'A 밸류에이션만으로 미루지 않는다' / 'B 3~6개월 분할 매수' / 'C 후보가 여럿이면 바구니' / 'D 거시 폭락은 보너스 매수'")
CAL6 = ("a hand-drawn calendar strip of six boxes in a row labeled '1월' through '6월' in order ('1월', '2월', '3월', '4월', '5월', '6월'), each box holding one small check mark, with ONE label above: '분할 매수'")
TL23 = ("a hand-drawn timeline strip with three small marks and ONE short label each, exactly: '참조사례 확산', '매출 가속', '완전완비제품', all three marks circled together with a single big circle labeled '동시에'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: three tall traffic lights standing side by side on a dark empty road at night, all three showing GREEN at the same moment, their glow reflected on wet asphalt; a small figure with a notebook stepping forward from the left edge; NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM at the table with the hunting log open, asking JU BON-JIL who sits at the far end with folded arms; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL raising three fingers, calm.",
 "p03":f"One panel (~100%). JU BON-JIL standing beside the whiteboard which shows {SIG3_OFF}; he stands fully to the side so that NO hand covers any label; ONLY the title and these three labels on the board.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {SIG3_OFF}, tapping the big circle he has just drawn around all three lights (no extra text). (2 ~45%) HAN TANG-SU (red cap) raising a hand with a hopeful grin.",
 "p05":f"Two panels. (1 ~55%) JU BON-JIL shaking his head slowly at HAN TANG-SU, beside the whiteboard which shows {SIG3_TWO}. (2 ~45%) close on the board: {SIG3_TWO}; nothing else.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL recalling Ep5: a small inset shows ONLY a hand-drawn bowling lane with the head pin falling into the next pins in a chain, NO text; the group watching. (2 ~45%) HAN SIL-SOK (knit vest, glasses) nodding, his balloon tail pointing at him.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {SIG3_OFF} with ONLY the FIRST light now GREEN; he points at it. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '① 참조사례 확산' / '실용주의자가 동료 얘기를 한다'.",
 "p08":f"One panel (~100%). The whiteboard shows {ACC}; JU BON-JIL to the side tracing the steepening tops of the bars with the marker without covering the label; ONLY this one label on the board.",
 "p09":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {ACC}; GO BI-JEON (navy suit) leaning forward. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '② 매출 가속' / '두세 분기 연속, 점점 가파르게'.",
 "p10":f"One panel (~100%). The whiteboard shows {WP7}; JU BON-JIL to the side; ONLY these eight labels on the board.",
 "p11":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {SIG3_TWO}, holding up two fingers with a firm look. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '③ 완전완비제품' / '셋 중 둘이면 아직'.",
 "p12":f"One panel (~100%). The whiteboard shows {TL23}; JU BON-JIL to the side, pointing at the big circle; NO company name, NO year, NO numbers anywhere on the board; ONLY these four labels.",
 "p13":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {TL23}, speaking of a past spring; the group listening; a small inset in the corner shows ONLY a hand-drawn calendar page with NO readable text. (2 ~45%) CHOI SIN-SANG (headphones) wide-eyed, remembering.",
 "p14":"Two panels. (1 ~55%) HAN TANG-SU (red cap) slumping, confessing, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) close on HAN TANG-SU's regretful face, cap pushed back.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL turning to a fresh section of the board, marker raised, about to name the trap; the whiteboard behind him is completely BLANK. (2 ~45%) JU BON-JIL writing ONLY the three words '밸류에이션 함정' on the board.",
 "p16":f"One panel (~100%). The whiteboard shows {VAL2}; JU BON-JIL to the side so that NO hand covers any label; ONLY these two labels on the board.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {VAL2}, tapping the shorter right bar. (2 ~45%) close on JU BON-JIL's calm face, one eyebrow raised.",
 "p18":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone) objecting with his chin up, his balloon tail pointing at him; behind him the whiteboard shows {VAL2}. (2 ~45%) the group turning toward JU BON-JIL for the answer.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL answering beside the whiteboard which shows {VAL2}, pointing back at the small circle around the three lights drawn in the corner of the board ({SIG3_ON} drawn small in the top corner). (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '비쌈이 아니라 토네이도의 끝을 두려워한다' / '단, 세 신호가 켜졌을 때만'.",
 "p20":f"One panel (~100%). The whiteboard shows {BUY4}; JU BON-JIL to the side; ONLY the title and these four lines on the board.",
 "p21":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {BUY4}, tapping line A. (2 ~45%) a small inset: NA BAE-UM at a cafe table hesitating over his phone whose screen shows ONLY one blurred rising line and NO text, drawn as a memory.",
 "p22":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {BUY4}, tapping line B; SHIN JUNG-HAE (cardigan) relieved. (2 ~45%) JU BON-JIL drawing ONLY a small staircase of six equal steps beside the card (no text).",
 "p23":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {BUY4}, tapping line C, and a small inset shows ONLY a hand-drawn basket holding three eggs with NO text. (2 ~45%) NA BAE-UM nodding, writing.",
 "p24":f"Two panels. (1 ~55%) SHIN JUNG-HAE (brown cardigan) asking anxiously, her balloon tail pointing at her; behind her the whiteboard shows {BUY4}. (2 ~45%) JU BON-JIL answering gently beside the board, tapping line D, then pointing back to line B.",
 "p25":f"One panel (~100%). {LOCK_NB}The whiteboard shows {CAL6}; NA BAE-UM finishing the sixth check mark; JU BON-JIL watching from the table; ONLY the title and the six month labels on the board.",
 "p26":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM beside the whiteboard which shows {CAL6}, explaining his plan for a made-up candidate; HAN SIL-SOK nodding. (2 ~45%) JU BON-JIL from the table adding one reminder, one finger raised.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL from the table recalling Ep13 briefly; a small inset shows ONLY a hand-drawn rocket icon with a small exit-door icon beside it and NO text. (2 ~45%) NA BAE-UM's hunting log close-up: ONLY these hand-written lines: '응용 소프트웨어는 볼링앨리에서' / '지원 기술은 토네이도 뒤에' / 'RIDE는 전술, 전략이 아니다'.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary at the table; JU BON-JIL in the soft background; the whiteboard behind is out of focus with no readable text. (2 ~40%) the hunting log close-up: ONLY these hand-written lines: '세 신호가 동시에' / '비쌈이 아니라 끝을 두려워한다' / '여섯 달에 나눠 산다'.",
 "p29":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL the next practical question, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL answering with a cupped-hands gesture as if holding a basket.",
 "p30":f"One panel (~100%). A quiet transition image {INK}a wicker basket on a wooden table holding three eggs, one of them faintly golden, soft window light; NO people, NO readable text anywhere.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK}the three green traffic lights from the cover now small in the distance, a lone figure with a notebook walking past them toward a horizon where a faint tornado funnel stands; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 32\n언제, 얼마에\n비쌈이 아니라 토네이도의 끝을 두려워하라\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','나배움: 서식지는 찾았는데요\n언제 들어가야 해요?'),
        (2,'C','speech','주본질: 신호가 셋이야\n셋이 동시에 켜질 때')],
 "p03":[(1,'C','label','진입 3신호'),(1,'C','label','① 참조사례 확산'),(1,'C','label','② 매출 가속'),(1,'C','label','③ 완전완비제품'),
        (1,'C','speech','주본질: 토네이도에 들어가는 신호등 셋\n지금은 다 꺼져 있어')],
 "p04":[(1,'C','speech','주본질: 핵심은 동시에, 야\n하나씩 켜지는 건 흔해, 셋이 같이 켜지는 날이 드물지'),
        (2,'C','speech','한탕수: 하나만 켜져도 미리 타면 더 싸게 사잖아요')],
 "p05":[(1,'C','speech','주본질: 그게 13화의 RIDE고, 그건 다음에 다시 얘기해\n오늘은 고릴라를 사는 날의 얘기야'),
        (2,'C','narr','둘은 켜지고 하나는 꺼진 채였다')],
 "p06":[(1,'C','speech','주본질: 첫째 신호, 5화의 볼링앨리를 기억해\n첫 핀이 넘어지면 옆 핀이 따라 넘어졌지'),
        (2,'C','speech','한실속: 실용주의자가 동료 얘기를 하기 시작하면\n그게 첫째 신호군요')],
 "p07":[(1,'C','speech','주본질: 맞아, 참조사례가 한 업종에서 옆 업종으로 번지면\n첫 번째 불이 켜진 거야'),
        (2,'C','narr','첫째 신호, 두 줄')],
 "p08":[(1,'C','label','분기 매출'),
        (1,'C','speech','주본질: 둘째 신호는 숫자야\n분기 매출이 두세 분기 연속, 점점 가파르게 늘어야 해\n한 분기 반짝은 신호가 아니야')],
 "p09":[(1,'C','speech','고비전: 가속이지 성장이 아니군요\n늘어나는 속도가 빨라져야 한다는'),
        (1,'C','speech','주본질: 그래, 막대가 계단이 아니라 활처럼 휘어야 해'),
        (2,'C','narr','둘째 신호, 두 줄')],
 "p10":[(1,'C','label','핵심'),(1,'C','label','보조 제품'),(1,'C','label','서비스'),(1,'C','label','표준'),
        (1,'C','speech','주본질: 셋째 신호, 24화의 완전완비제품\n핵심 둘레의 일곱 조각이 다 채워졌나')],
 "p11":[(1,'C','speech','주본질: 참조사례도 번지고 매출도 가속인데\n완전완비제품이 비어 있으면 아직이야\n셋 중 둘이면 아직'),
        (2,'C','narr','셋째 신호, 두 줄')],
 "p12":[(1,'C','label','참조사례 확산'),(1,'C','label','매출 가속'),(1,'C','label','완전완비제품'),(1,'C','label','동시에'),
        (1,'C','speech','주본질: 셋이 동시에 켜진 날을 하나 보여 줄게\n2023년 봄, 그 GPU 회사의 분기 실적 발표 때야')],
 "p13":[(1,'C','speech','주본질: 연구실마다 그 칩을 쓴다는 얘기가 번지고\n데이터센터 매출이 한 분기 만에 급가속했고\n개발 도구와 협력사는 이미 다 갖춰져 있었지'),
        (2,'C','speech','최신상: 저 그때 뉴스 봤어요\n하루 만에 회사 값이 엄청 뛰었다고')],
 "p14":[(1,'C','speech','한탕수: 저도 그때 봤는데요\n너무 비싸 보여서 못 샀어요\n이미 많이 올랐으니까'),
        (2,'C','think','한탕수: 그 뒤로 몇 배가 더 올랐지')],
 "p15":[(1,'C','speech','주본질: 그게 사냥꾼이 가장 많이 빠지는 함정이야'),
        (2,'C','label','밸류에이션 함정')],
 "p16":[(1,'C','label','지금 · PER 높다'),(1,'C','label','매출 두 배 뒤 · PER 절반'),
        (1,'C','speech','주본질: 토네이도 안에선 매출이 두 배가 돼\n그러면 같은 가격이라도 PER은 절반이 되지\n비쌈은 사후에 정당화되는 거야')],
 "p17":[(1,'C','speech','주본질: 그러니까 두려워할 건 비쌈이 아니야\n토네이도가 끝났는지를 두려워해야 해'),
        (2,'C','think','주본질: 이 한 줄을 못 넘어서 다들 밖에 서 있지')],
 "p18":[(1,'C','speech','안믿어: 그럼 비싸도 사라는 거요?\n그게 한탕수 소리랑 뭐가 다르오'),
        (2,'C','narr','모두가 주본질을 돌아봤다')],
 "p19":[(1,'C','speech','주본질: 다르지, 조건이 있어\n세 신호가 동시에 켜졌을 때만이야\n그 조건을 빼면 안믿어 씨 말대로 한탕수가 돼'),
        (2,'C','narr','두 줄')],
 "p20":[(1,'C','label','매수 4원칙'),(1,'C','label','A 밸류에이션만으로 미루지 않는다'),(1,'C','label','B 3~6개월 분할 매수'),(1,'C','label','C 후보가 여럿이면 바구니'),(1,'C','label','D 거시 폭락은 보너스 매수'),
        (1,'C','speech','주본질: 그래서 사는 법도 네 줄로 정해 둬')],
 "p21":[(1,'C','speech','주본질: A, 토네이도 진입이 확인됐으면\n비싸 보인다는 이유로 미루지 않는다'),
        (2,'C','narr','카페에서 망설이던 날이 떠올랐다')],
 "p22":[(1,'C','speech','주본질: B, 한 번에 사지 않고 서너 달에서 여섯 달에 나눠 산다\n타이밍을 맞추려 하지 말고 평균을 사는 거야'),
        (2,'C','speech','신중해: 그건 저도 할 수 있겠어요')],
 "p23":[(1,'C','speech','주본질: C, 누가 1등이 될지 모르면 후보를 바구니로\n이건 다음 시간에 길게'),
        (2,'C','think','나배움: 알 셋, 하나만 금빛')],
 "p24":[(1,'C','speech','신중해: D는 무서워요\n폭락할 때 사라니, 다들 파는데'),
        (2,'C','speech','주본질: 금리나 환율 때문에 시장 전체가 빠지는 건\n고릴라의 성벽과 상관없어, 그래서 보너스야\n그리고 B가 있잖아, 나눠 사니까 덜 무서워')],
 "p25":[(1,'C','label','분할 매수'),(1,'C','label','1월'),(1,'C','label','6월'),
        (1,'C','speech','나배움: 가상의 후보 하나로 해 볼게요\n1월부터 6월까지 매달 같은 금액, 여섯 번')],
 "p26":[(1,'C','speech','나배움: 중간에 떨어지면 D가 켜진 거니까\n그달은 조금 더 사는 걸로요'),
        (2,'C','speech','주본질: 좋아, 단 19화의 원칙 1과 2는 잊지 마\n카테고리에 따라 들어가는 시점이 달라')],
 "p27":[(1,'C','speech','주본질: 그리고 13화의 RIDE는 전술이야\n이 네 원칙이 전략이고\n전술을 전략으로 착각하면 탕수가 돼'),
        (2,'C','narr','세 줄')],
 "p28":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','speech','나배움: 그런데 토네이도 직전엔\n누가 1등이 될지 모르잖아요'),
        (2,'C','speech','주본질: 그래서 바구니야\n다음 시간')],
 "p30":[(1,'C','narr','알 셋 중 어느 것이 금빛인지는 아직 아무도 몰랐다')],
 "p31":[(1,'C','caption','Episode 32 끝 · 다음 화 · 바구니를 만들어라\n(원칙 3 · 7 · 8, 바구니에서 집중으로)')],
}

BANDS = {
 "p03":'토네이도 진입 3신호 · 참조사례 확산 · 매출 가속(두세 분기 연속) · 완전완비제품 완비 · 셋이 동시에 켜질 때',
 "p08":'매출 가속 · 성장이 아니라 가속 · 막대가 계단이 아니라 활처럼 휘어야 신호',
 "p16":'밸류에이션 함정 · 토네이도 안에선 매출이 두 배가 되며 PER이 사후 정당화된다 · 비쌈이 아니라 토네이도의 끝을 두려워하라',
 "p19":'조건 · 세 신호가 동시에 켜졌을 때만 · 조건을 빼면 한탕수가 된다',
 "p20":'매수 4원칙 · A 밸류에이션만으로 미루지 않는다 · B 3~6개월 분할 · C 후보가 여럿이면 바구니 · D 거시 폭락은 보너스',
 "p27":'원칙 1·2 · 응용 소프트웨어는 볼링앨리에서, 지원 기술은 토네이도 뒤에 · RIDE는 전술이지 전략이 아니다',
}

NOTES = {
 "p03":'해설: 토네이도 진입 3신호(참조사례 확산·매출 가속·완전완비제품 완비)는 Moore의 토네이도 정의(실용주의자가 시장 선도자 제품만 사려고 줄을 서는 단계)를 본 만화가 관찰 가능한 세 지표로 정리한 보조 도구다. Moore 원문의 원칙은 19화의 10대 원칙이며, 이 세 신호는 그 보조 장치다',
 "p06":'해설: Moore 원칙 1·2 원문: "If the category is application software, begin buying in the bowling alley. If the category is enabling hardware or software, begin buying after the tornado has formed." 응용 소프트웨어는 볼링앨리 후반(첫째 신호)에서, 칩·메모리 같은 지원 기술은 토네이도가 형성된 뒤(세 신호 모두)에 사라는 뜻이다',
 "p12":'사실 확인: 2023년 5월 NVIDIA의 분기 실적 발표에서 다음 분기 매출 전망이 시장 예상을 크게 웃돌았고, 이후 데이터센터 매출이 분기마다 급가속했다. 당시 연구소·클라우드의 CUDA 기반 수요 확산(참조사례), 매출 가속, 개발 도구·협력사 생태계(완전완비제품)가 함께 확인된 사례로 본 만화는 해석한다. 구체 수치와 날짜는 작화 시 공시로 재확인한다. 특정 종목의 매수·매도를 권하지 않는다',
 "p16":'해설: PER(주가수익비율)은 주가를 주당순이익으로 나눈 값이다. 토네이도 안에서 매출과 이익이 두 배가 되면 주가가 그대로여도 PER은 절반이 된다. "비쌈은 사후에 정당화된다"는 말은 이 조건, 즉 토네이도 진입이 확인된 경우에만 성립하며, 하입(11~13화)에는 적용되지 않는다',
 "p20":'해설: 매수 4원칙(A 밸류에이션만으로 미루지 않는다, B 3~6개월 분할, C 바구니, D 거시 폭락은 보너스)은 v4 기획서에서 정리한 본 만화의 보조 도구이며 Moore 원문의 10대 원칙과는 구분한다. C는 원칙 3(바구니)과 이어진다',
 "p22":'해설: 분할 매수는 일정 기간에 걸쳐 같은 금액을 나눠 사서 매수 단가를 평균하는 방법이다. 토네이도 진입이 확인된 뒤 단기 가격 변동에 흔들리지 않으려는 장치이며, 하락장에서의 손실을 없애 주는 것은 아니다',
 "p25":'해설: 25~26화의 분할 매수 캘린더는 가상의 후보를 예로 든 연습이며 실제 종목이 아니다. 거시 폭락(원칙 D)은 고릴라의 구조(성곽)와 무관하게 시장 전체가 빠지는 경우를 말하며, 그 회사 자체의 대체 위협(29화)과는 구별해야 한다. 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
