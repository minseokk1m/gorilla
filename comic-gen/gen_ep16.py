#!/usr/bin/env python3
# 고릴라 헌터스 Ep16 "고릴라·침팬지·원숭이" — 시즌 2 (32p)
# 2026-09-13 작성. season2-plan.md Ep16 · v4 Ep12-15 압축 · Moore 원칙 5(침팬지의 종류)
# 팩트(2026-09-13 웹 확인): NVIDIA AI 가속기 매출 점유 약 75~81%(2026), AMD 5~7% · AMD Helios 랙스케일 2026-07-23 출시,
#   OpenAI·Meta 각 6GW 계약, MI450 2026 하반기 출하, Microsoft Azure 배치 발표 · ASML EUV 사실상 독점(ZEISS 협업, 초당 5만 회 레이저)
# ※ 작화 직전 수치 갱신 필수 (season2-plan.md 부록 B)
# usage: python3 gen_ep16.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP16"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep16")
STAGE = "③ 투자와 연결"
SPEAKERS_EXTRA = {'연구원': 'the anonymous researcher in the foreground of the lab scene'}

EXTRA_CHARS = ("EP16 NOTE: company names appear ONLY as the clean English/Korean labels specified on whiteboards; NEVER draw real logos, real product photos or real executives' faces. "
               "Chips are abstract dark rectangles with gold pins; servers are plain gray racks.")

PAGES = {
 "p01":"A cinematic episode-title page, Korean webtoon ink style (keep inked linework, NO photoreal). A big calm gorilla on a stone throne at the top, a chimp holding a shiny new sword on a rock below, tiny monkeys at the bottom; dark jungle; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL at the whiteboard which shows ONLY a small gorilla sketch and the label 'NVIDIA' beside it; NA BAE-UM ready. (2 ~45%) JU BON-JIL holding up three fingers.",
 "p03":"One panel (~100%). A modern AI research lab scene (no readable text): rows of monitors all showing ONLY abstract green code blocks, researchers at desks; one researcher in the foreground shrugging at a colleague with a helpless smile; a small clean label box in the corner: '모든 코드가 CUDA'.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL explaining switching cost at the board where ONLY a small hand-drawn list of four icons is shown: a code page with a rewrite arrow, a checklist, a classroom, a wrench; NO words. (2 ~45%) NA BAE-UM wincing at the imagined cost.",
 "p05":"One panel (~100%). The whiteboard: a hand-drawn circular loop of four arrows with ONE short label at each node: '개발자 증가' → '도구·논문 증가' → '새 개발자 유입' → '표준 강화' → back to start; a small gorilla sketch in the center; JU BON-JIL to the side; ONLY these four labels.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL tapping the loop; NA BAE-UM's eyes following the arrows. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '고릴라 세 요소' / '독점 아키텍처 · 전환비용 · 네트워크 효과' / '표준이 표준을 강화한다'.",
 "p07":"Two panels. (1 ~55%) HAN TANG-SU asking about market share, phone (screen OFF) in hand; JU BON-JIL nodding. (2 ~45%) the whiteboard corner: ONLY a simple pie sketch with one very large slice and two thin slivers, and ONE label on the large slice: '고릴라'; no numbers.",
 "p08":"Two panels. (1 ~55%) JU BON-JIL erasing and writing ONLY the label 'ASML' with a small lithography-machine sketch (a boxy machine with a beam); NA BAE-UM curious. (2 ~45%) close on the sketch.",
 "p09":"One panel (~100%). A clean-room scene in inked webtoon style (no readable text, no logos): engineers in white suits around a huge boxy machine the size of a bus, a thin violet beam inside, a tiny droplet being hit by a laser flash shown in a small round inset; a small clean label box: '극자외선 · EUV'.",
 "p10":"Two panels. (1 ~55%) HAN SIL-SOK (knit vest, glasses) explaining from the table with a calm precise gesture. (2 ~45%) JU BON-JIL nodding, writing ONLY two short lines on the board: '따라 하려면 수십 년' and '두 회사, 한 사업'.",
 "p11":"One panel (~100%). The whiteboard: two hand-drawn portraits-as-silhouettes (plain oval heads, NO faces) side by side, labeled ONLY 'Gordon Moore' and 'Geoffrey Moore'; under the left a tiny chip icon with the text '무어의 법칙', under the right a tiny gorilla icon with the text '고릴라 게임'; a small bridge arrow between them; JU BON-JIL to the side; ONLY these four labels.",
 "p12":"Two panels. (1 ~55%) JU BON-JIL enjoying the coincidence, hands spread; NA BAE-UM smiling. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p13":"Two panels. (1 ~55%) HAN TANG-SU standing with a confession, cap in hand; the group turning. (2 ~45%) JU BON-JIL with a patient look, writing ONLY the label 'AMD' with a small chimp sketch on the board.",
 "p14":"Two panels. (1 ~55%) the whiteboard: ONLY a hand-drawn spec bar comparison with two unlabeled bars of similar height and a small price tag icon under the shorter one; JU BON-JIL pointing. (2 ~45%) HAN TANG-SU nodding eagerly, hopeful.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL asking the question back, finger raised; HAN TANG-SU blank. (2 ~45%) JU BON-JIL pointing back at the loop diagram now redrawn small in the corner (labels '개발자 증가', '도구·논문 증가', '새 개발자 유입', '표준 강화').",
 "p16":"One panel (~100%). The whiteboard: a hand-drawn timeline strip with three small icons and ONE label each: a lone chip labeled '스펙 좋은 칩', a full server rack with a small crowd of tiny customer figures labeled '2026 헬리오스 랙', and a wall labeled '그래도 CUDA의 벽'; JU BON-JIL to the side; ONLY these three labels.",
 "p17":"Two panels. (1 ~55%) JU BON-JIL explaining the 2026 rack and its big customers, fair-minded; NA BAE-UM noting. (2 ~45%) JU BON-JIL tapping the wall icon, firm.",
 "p18":"One panel (~100%). The whiteboard: a hand-drawn two-column card titled '원칙 5 · 침팬지의 종류' with two rows, exactly: '응용 소프트웨어 침팬지' → '시장 확대 잠재력 있으면 보유' ; '지원 기술 침팬지' → '보유하지 않는다'; a small chip icon next to the second row; JU BON-JIL presenting; ONLY these labels.",
 "p19":"Two panels. (1 ~55%) HAN TANG-SU deflating but nodding; JU BON-JIL not unkind. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '침팬지는 스펙이 아니라 생태계에서 진다' / '지원 기술 침팬지는 보유 X'.",
 "p20":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the label 'TPU' with a small different-shaped animal sketch (a lemur-like creature) on the board; NA BAE-UM puzzled. (2 ~45%) close on the odd creature sketch.",
 "p21":"One panel (~100%). The whiteboard: a hand-drawn castle-moat sketch (the CUDA moat) with a small figure on the far bank building a bridge of planks across it, the planks labeled ONLY '호환 도구'; beside the figure a tiny stack of coins labeled '자본'; JU BON-JIL to the side; ONLY these two labels.",
 "p22":"Two panels. (1 ~55%) JU BON-JIL explaining why this challenger is different, measured; HAN SIL-SOK listening. (2 ~45%) JU BON-JIL adding a small fence around the figure's own yard on the sketch (no text).",
 "p23":"Two panels. (1 ~55%) HAN TANG-SU bursting with a phone held up: the screen shows ONLY a blurred news headline shape with a small flag-like icon (no readable text). (2 ~45%) JU BON-JIL sighing with a smile, writing ONLY a small monkey sketch on the board.",
 "p24":"One panel (~100%). The whiteboard: a hand-drawn bar sketch: a tall bar labeled '고릴라 가격' and a short bar labeled '원숭이 가격'; then a downward arrow on the tall bar to a lower dotted level, and the short bar crossed out with a red X; JU BON-JIL to the side; ONLY these two labels.",
 "p25":"Two panels. (1 ~55%) JU BON-JIL explaining pricing power; HAN TANG-SU crestfallen. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '원숭이 = 고릴라 흉내의 저가 클론' / '가격 결정권은 고릴라에게만'.",
 "p26":"Two panels. (1 ~55%) HAN SIL-SOK asking whether the gorilla is invincible; JU BON-JIL shaking his head slowly. (2 ~45%) JU BON-JIL drawing a thin crack on the gorilla's throne sketch (no text).",
 "p27":"One panel (~100%). The whiteboard: a hand-drawn stack of two blocks labeled '연산' (top) and '메모리' (bottom), the bottom block narrower with a small bottleneck-funnel icon beside it; a small note-card sketch beside the stack with ONLY the text '병목은 메모리'; JU BON-JIL to the side; ONLY these three labels.",
 "p28":"Two panels. (1 ~55%) JU BON-JIL explaining the crack, balanced; NA BAE-UM noting. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '고릴라도 균열은 생긴다' / '균열은 다음 시즌의 주제'.",
 "p29":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background. (2 ~40%) the notebook close-up: ONLY these hand-written lines: '고릴라: 아키텍처·전환비용·네트워크' / '침팬지: 스펙이 아니라 생태계' / '원숭이: 가격 결정권 없음'.",
 "p30":"Two panels, quiet beat. (1 ~60%) evening, HAN TANG-SU quietly erasing a name from his phone note (screen shows ONLY a blurred short line), NA BAE-UM beside him. (2 ~40%) NA BAE-UM's thoughtful face.",
 "p31":"Two panels. (1 ~55%) at the door JU BON-JIL turns back with the next hook. (2 ~45%) a faint dreamy image in webtoon ink style: a crowned king on a castle wall glancing nervously at a knight below; NO text.",
 "p32":"One panel (~100%). Closing chapter-end: the primate jungle behind, the kingdom castle ahead; NA BAE-UM, JU BON-JIL and HAN TANG-SU small figures; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 16\n고릴라·침팬지·원숭이\n스펙이 아니라 생태계가 등급을 정한다\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','label','NVIDIA'),
        (1,'C','speech','주본질: 영장류 정글의 첫 동물\n교과서에 실릴 만한 고릴라부터'),
        (2,'C','speech','주본질: 고릴라의 힘은 셋이야\n하나씩 보자')],
 "p03":[(1,'C','label','모든 코드가 CUDA'),
        (1,'C','speech','연구원: 여기 코드가 전부 이 언어예요\n칩을 바꾸면 처음부터 다시 짜야 해요'),
        (1,'C','narr','첫째, 독점 아키텍처')],
 "p04":[(1,'C','speech','주본질: 둘째, 전환비용\n다시 짜고, 다시 검증하고, 다시 가르치고, 다시 맞추고\n몇 년과 막대한 돈이 들어'),
        (2,'C','think','나배움: 그래서 아무도 안 옮기는구나')],
 "p05":[(1,'C','label','개발자 증가'),(1,'C','label','도구·논문 증가'),(1,'C','label','새 개발자 유입'),(1,'C','label','표준 강화'),
        (1,'C','speech','주본질: 셋째, 네트워크 효과\n쓰는 사람이 늘수록 도구와 논문이 늘고\n그게 또 새 사람을 끌어와')],
 "p06":[(1,'C','speech','주본질: 표준이 표준을 강화하는 거야\n7화의 떼거리 심리가 여기서 완성돼'),
        (2,'C','narr','세 줄')],
 "p07":[(1,'C','speech','한탕수: 그래서 점유율이 얼마나 돼요?'),
        (2,'C','speech','주본질: AI 가속기 매출의 대략 넷 중 셋 이상\n나머지를 여럿이 나눠 먹지\n숫자는 해설에 있어, 대략치만 기억해')],
 "p08":[(1,'C','label','ASML'),
        (1,'C','speech','주본질: 더 극단적인 고릴라가 있어\n첨단 반도체를 찍는 기계를 사실상 혼자 만드는 회사'),
        (2,'C','narr','버스만 한 기계 하나에 천문학적 값')],
 "p09":[(1,'C','label','극자외선 · EUV'),
        (1,'C','narr','주석 방울에 레이저를 초당 수만 번 쏘아 빛을 만든다\n거울의 정밀도는 원자보다 작은 수준')],
 "p10":[(1,'C','speech','한실속: 저희 업계에서도 유명해요\n광학 회사와 두 회사가 한 사업처럼 붙어 있어서\n부품 대부분을 협력사가 만들죠'),
        (2,'C','speech','주본질: 그래서 따라 하려면 수십 년\n삼성도, TSMC도, 인텔도 이 기계 없인 첨단 칩을 못 만들어')],
 "p11":[(1,'C','label','Gordon Moore'),(1,'C','label','Geoffrey Moore'),(1,'C','label','무어의 법칙'),(1,'C','label','고릴라 게임'),
        (1,'C','speech','주본질: 재밌는 게, 이 게임의 뿌리엔 무어가 둘이야\n고든 무어의 법칙이 이 회사가 좇는 길이고\n제프리 무어의 고릴라 게임이 우리가 좇는 길이지')],
 "p12":[(1,'C','speech','주본질: 이 회사는 무어의 법칙을 이어가는\n길목을 쥔 고릴라야'),
        (2,'C','think','나배움: 두 무어가 한 회사에서 만난다')],
 "p13":[(1,'C','speech','한탕수: 저… 고백할 게 있어요\n1등이 너무 비싸서 2등을 샀어요'),
        (2,'C','label','AMD'),
        (2,'C','speech','주본질: 좋아, 침팬지 얘기를 할 때가 됐네')],
 "p14":[(1,'C','speech','주본질: 이 회사 칩은 스펙이 좋아\n어떤 건 1등보다 메모리를 더 많이 달았고, 값도 싸'),
        (2,'C','speech','한탕수: 그렇죠? 그러니까 오르겠죠?')],
 "p15":[(1,'C','speech','주본질: 그런데 왜 다들 1등 걸 살까?'),
        (2,'C','speech','주본질: 아까 그 고리 때문이야\n스펙이 아니라 생태계에서 지는 거지\n호환 도구는 일부뿐이거든')],
 "p16":[(1,'C','label','스펙 좋은 칩'),(1,'C','label','2026 헬리오스 랙'),(1,'C','label','그래도 CUDA의 벽'),
        (1,'C','speech','주본질: 공정하게 말하면, 2026년에 이 회사는\n랙 단위 시스템을 내놨고 큰 고객 계약도 여럿 땄어')],
 "p17":[(1,'C','speech','주본질: 침팬지의 반격은 진짜야\n그래서 지켜볼 침팬지지'),
        (2,'C','speech','주본질: 하지만 코드가 옮겨 가기 전엔\n여전히 침팬지야, 벽이 그대로니까')],
 "p18":[(1,'C','label','원칙 5 · 침팬지의 종류'),(1,'C','label','응용 소프트웨어 침팬지 → 시장 확대 잠재력 있으면 보유'),(1,'C','label','지원 기술 침팬지 → 보유하지 않는다'),
        (1,'C','speech','주본질: 그래서 원칙 5가 있어\n침팬지에도 종류가 있다\n칩 같은 지원 기술의 침팬지는 들고 가지 않는다')],
 "p19":[(1,'C','speech','한탕수: 그럼 저는요…'),
        (1,'C','speech','주본질: 원칙대로면 답은 정해져 있지\n다만 지켜볼 침팬지라는 건 기억해 둬'),
        (2,'C','narr','두 줄')],
 "p20":[(1,'C','label','TPU'),
        (1,'C','speech','주본질: 그런데 같은 2등이라도\n차원이 다른 도전자가 하나 있어'),
        (2,'C','think','나배움: 침팬지가 아닌 다른 동물?')],
 "p21":[(1,'C','label','호환 도구'),(1,'C','label','자본'),
        (1,'C','speech','주본질: 이 회사는 검색, 동영상, 스마트폰까지 다 가진 회사야\n자기 칩에 맞는 스택을 통째로 만들고\n호환 도구로 해자에 다리를 놓고 있어')],
 "p22":[(1,'C','speech','주본질: 침팬지가 못 넘은 해자를\n정면으로 파고드는 거지'),
        (2,'C','speech','주본질: 다만 주로 자기 클라우드 안에서 강해\n자기 영토의 영주에 가까운 성격이야')],
 "p23":[(1,'C','speech','한탕수: 형! 중국에서 자체 칩 만들었대요!\n싸잖아요, 이거 사야죠?'),
        (2,'C','speech','주본질: 마지막 동물이 딱 맞춰 나왔네\n원숭이')],
 "p24":[(1,'C','label','고릴라 가격'),(1,'C','label','원숭이 가격'),
        (1,'C','speech','주본질: 원숭이는 고릴라를 흉내 낸 저가 클론이야\n고릴라가 값을 조금만 내리면\n원숭이의 매출은 그날로 사라져')],
 "p25":[(1,'C','speech','주본질: 가격 결정권이 고릴라에게만 있거든\n싸다는 건 무기가 아니라 약점이야'),
        (2,'C','narr','두 줄')],
 "p26":[(1,'C','speech','한실속: 그럼 고릴라는 무적인가요?'),
        (2,'C','speech','주본질: 아니, 고릴라도 균열은 생겨')],
 "p27":[(1,'C','label','연산'),(1,'C','label','메모리'),(1,'C','label','병목은 메모리'),
        (1,'C','speech','주본질: 어떤 교수는 연산보다 메모리가 병목이 된다고 봐\n최근 성능 향상엔 정밀도를 낮춘 부분도 있다는 비판도 있고')],
 "p28":[(1,'C','speech','주본질: 균열이 왕좌를 무너뜨리는지는\n다음 시즌의 주제야\n지금은 균열이 있다는 것만 기억해'),
        (2,'C','narr','두 줄')],
 "p29":[(1,'C','speech','주본질: 세 동물, 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p30":[(1,'C','narr','탕수는 그날 밤 종목 하나를 지웠다'),
        (2,'C','think','나배움: 지우는 것도 사냥이다')],
 "p31":[(1,'C','speech','주본질: 다음 시간은 둘째 정글\n성벽 위의 영주는 왜 늘 불안한가'),
        (2,'C','narr','성벽 아래, 기사가 칼을 갈고 있었다')],
 "p32":[(1,'C','caption','Episode 16 끝 · 다음 화 · 영주·기사·소작농, 그리고 메모리\n(킹덤 정글의 규칙 · 원칙 6)')],
}

BANDS = {
 "p06":'고릴라 3요소 · 독점 아키텍처 + 높은 전환비용 + 네트워크 효과 · 표준이 표준을 강화한다',
 "p11":'두 무어 · 고든 무어의 법칙(집적도)은 ASML이 좇는 길, 제프리 무어의 고릴라 게임은 우리가 좇는 길',
 "p18":'원칙 5 · 응용SW 침팬지는 시장 확대 잠재력이 있는 한 보유 · 지원기술(enabling) 침팬지는 보유하지 마라',
 "p24":'원숭이 · 고릴라를 흉내 낸 저가 클론 · 가격 결정권은 고릴라에게만, 싸다는 것은 무기가 아니라 약점',
 "p27":'고릴라의 균열 · 연산보다 메모리가 병목이라는 시각 · 균열이 왕좌를 무너뜨리는지는 시즌 3의 주제',
}

NOTES = {
 "p03":'해설: CUDA는 NVIDIA GPU용 프로그래밍 플랫폼이다. AI 연구·개발 코드와 라이브러리 대부분이 CUDA 위에 쌓여 있어, 다른 회사 칩으로 옮기려면 코드 재작성·검증·재교육이 필요하다(전환비용)',
 "p07":'사실 확인: 2026년 AI 가속기(데이터센터 GPU) 매출 점유율은 NVIDIA 약 75~81%, AMD 약 5~7%, 나머지는 하이퍼스케일러의 자체 칩 등으로 추정된다(업계 조사 종합, 2026-09 기준, 작화 시 갱신)',
 "p10":'사실 확인: ASML은 극자외선(EUV) 노광장비를 사실상 독점 공급한다. 주석 방울에 레이저를 초당 약 5만 번 쏘아 EUV 빛을 만들고, 광학 파트너 ZEISS와 "두 회사, 한 사업"으로 협업하며 부품 대부분을 협력사가 제조한다. TSMC·삼성·인텔 모두 이 장비 없이 첨단 공정을 만들 수 없다',
 "p11":'해설: 무어의 법칙(Gordon Moore, 1965)은 반도체 집적도가 약 2년마다 두 배가 된다는 관찰이고, 고릴라 게임(Geoffrey Moore, 1998)은 기술 시장의 1등 투자 이론이다. 두 사람은 성만 같을 뿐 무관하다',
 "p16":'사실 확인: AMD는 2026년 7월 23일 Instinct MI450 계열 GPU 기반 랙스케일 시스템 Helios를 출시했고, OpenAI·Meta와 각 6GW 규모 공급 계약, Microsoft Azure 배치를 발표했다. MI450 출하는 2026년 하반기부터다(2026-09 기준, 작화 시 갱신). 그럼에도 CUDA 생태계 이전은 진행형이며, 본 만화는 "지켜볼 침팬지"로 분류한다',
 "p18":'해설: Moore 원칙 5 원문: "Hold application software chimp stocks as long as they exhibit potential for further market expansion. Do not hold enabling-technology chimps." 번역서의 "enabling(지원)" 표기에 오역 소지가 있어 영문을 병기한다',
 "p21":'해설: 구글의 TPU는 GPU와 다른 계열(NPU)의 가속기다. 검색·유튜브·안드로이드·데이터·자체 칩을 가진 수직 계열과 JAX·XLA, PyTorch/XLA 같은 호환 도구로 CUDA의 전환비용 자체를 공략한다. 다만 주로 구글 클라우드 안에서 강해 "자기 영토의 영주" 성격이 있다(김선일 검토자 의견 반영)',
 "p24":'해설: 중국의 자체 AI 칩·메모리 추격은 화제이지만, HBM 설계·수율과 ASML 등 첨단 장비 규제 때문에 세대 격차가 있다. "싸다"만으로는 영장류 정글에서 이길 수 없다는 것이 원숭이 등급의 교훈이다',
 "p27":'해설: 김정호 교수(KAIST)는 AI 연산의 병목이 GPU보다 메모리(대역폭)에 있다고 본다. NVIDIA의 최근 성능 향상에 FP4 등 낮은 정밀도 연산이 포함됐다는 비판도 있다. 고릴라의 균열은 시즌 3 「고릴라의 해부학」에서 다룬다',
}

if __name__ == "__main__": run(globals())
