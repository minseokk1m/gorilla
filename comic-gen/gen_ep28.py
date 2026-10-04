#!/usr/bin/env python3
# 고릴라 헌터스 Ep28 "한 시장에 고릴라가 둘: 과점의 예외" — 시즌 3 (30p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep28 · v4 Ep28(Oligopoly Exception)·Ep38(원칙 9) 계승
# 검토자 반영: 김경윤("Azure=엔터프라이즈, AWS=스타트업" 삭제 → "고객 기반과 쓰임이 갈린다")
# 팩트: season34-facts.md B9(Visa+MC 미국 카드 구매액 약 87%, Nilson 2025) · A4(HBM 점유율) · B1(클라우드 3강 28/20/15%, 3위 +82%) · B2(파운데이션 모델 선두 둘 비상장·상장 신청 완료)
# ※ 2026-10 기준 클라우드는 "양강"이 아니라 "3강으로 변하는 중" → 깨끗한 복점 사례는 결제망, 클라우드는 "과점은 고정이 아니다"의 사례
# usage: python3 gen_ep28.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP28"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep28")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP28 NOTE: company names appear ONLY as clean labels on whiteboard cards where specified ('Visa', 'Mastercard', '삼성', 'SK하이닉스', '마이크론'); NEVER real logos, NEVER real card designs, NEVER real executives. "
               "Payment-card props are plain blank rectangles with no numbers or brand marks. Throne and crown motifs are simple hand-drawn whiteboard doodles.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "

DUO4 = ("a hand-drawn comparison card titled '과점의 예외 · 결제망' with TWO columns headed exactly 'Visa' (left) and 'Mastercard' (right) and FOUR row labels down the far left exactly '자체 아키텍처', '전환비용', '네트워크 효과', '완전완비제품'; EVERY one of the eight cells contains a single large 'O'; a small tally line at the bottom reading ONLY '4 / 4 · 4 / 4'; NO other writing")
MEM2 = ("a hand-drawn card titled '과점의 예외 · 메모리' with TWO horizontal lanes labeled on the far left exactly 'HBM' (top lane) and 'DRAM' (bottom lane); two tall white paper cards labeled '삼성' and 'SK하이닉스' each pinned so that it spans BOTH lanes; one small white card labeled '마이크론' pinned in the corner of the bottom lane; NO other writing")
CLOUD3 = ("a hand-drawn bar sketch titled '클라우드' with THREE bars of decreasing height labeled beneath exactly '1위', '2위', '3위'; a bold upward arrow drawn beside the shortest ('3위') bar; a small note above the bars reading ONLY '2년 전엔 둘'; NO numbers, NO company names, NO other writing")
COND3 = ("a hand-drawn card titled '진짜 과점의 세 조건' with three short lines exactly: '① 둘 다 4기준 통과' / '② 고객 기반과 쓰임이 갈린다' / '③ 한쪽이 무너지면 시장이 위험'; a small double-throne icon; NO other writing")
P9CARD = ("a hand-drawn card titled '원칙 9 · 고릴라 충돌' with two short lines exactly: '고릴라 충돌 시 결판까지 보유' / '양쪽 다 보유는 헷지가 아니라 정공법'; a small icon of two gorilla silhouettes facing each other; NO other writing")
LOCK_HS = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is HAN SIL-SOK (40s, BLACK hair, thin metal glasses, neat shirt and knit VEST) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: TWO stone thrones standing side by side on a jungle hilltop, equal in size, each with a faint gorilla silhouette seated in shadow, morning mist around them; NO whiteboard, NO study room, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, puzzled, notebook open; the TALC five and HAN TANG-SU at the table; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL smiling as if he expected the question, uncapping the marker.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the heading '과점의 예외' on the board, a small sketch of two thrones beside it. (2 ~45%) close on AN MID-EO (50s, stern, flip phone) raising an eyebrow, skeptical.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY the heading '과점의 예외' and the two-throne sketch; NA BAE-UM writing. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '고릴라는 보통 하나' / '그런데 예외가 있다'.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL holding up two plain blank rectangular cards (no numbers, no brand marks) like playing cards; HAN TANG-SU curious. (2 ~45%) JU BON-JIL drawing the empty outline of a two-column four-row table (no text yet).",
 "p06":f"One panel (~100%). The whiteboard shows {DUO4}; JU BON-JIL standing fully to the side so no hand covers any label; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {DUO4}; the group nodding. (2 ~45%) a small inset: an anonymous shopper tapping a plain blank card at a plain card terminal in a cafe, NO readable text, NO logos.",
 "p08":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {DUO4}, drawing a small curved divider between the two columns with his free hand gesturing left and right; HAN SIL-SOK attentive. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '둘 다 4/4' / '발급 은행도 가맹점 망도 다르다' / '한쪽이 멈추면 결제가 멈춘다'.",
 "p09":f"Two panels. (1 ~55%) AN MID-EO (stern, flip phone held up) objecting from the table, his balloon tail pointing at him; the whiteboard behind shows {DUO4}. (2 ~45%) JU BON-JIL answering evenly, one hand raised in a 'wait' gesture, beside the whiteboard which shows {DUO4}.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the small word '관찰' in a circle on the corner of the board, the rest of the board erased and otherwise BLANK; SHIN JUNG-HAE writing in the record log. (2 ~45%) close on JU BON-JIL's calm face.",
 "p11":f"One panel (~100%). {LOCK_HS}The whiteboard shows {MEM2}; HAN SIL-SOK standing fully to the side; ONLY these labels.",
 "p12":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK explaining beside the whiteboard which shows {MEM2}, pointing at the two tall cards that span both lanes; NA BAE-UM nodding. (2 ~45%) {LOCK_HS}close on HAN SIL-SOK tapping the small '마이크론' card on the whiteboard which shows {MEM2}.",
 "p13":f"Two panels. (1 ~55%) {LOCK_HS}HAN SIL-SOK speaking seriously beside the whiteboard which shows {MEM2}; the group sober. (2 ~45%) JU BON-JIL at the table nodding with approval, the whiteboard behind him showing {MEM2}.",
 "p14":f"One panel (~100%). The whiteboard shows {CLOUD3}; JU BON-JIL (now presenting again) standing fully to the side; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {CLOUD3}, tapping the upward arrow; GO BI-JEON leaning in. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '과점은 고정이 아니다' / '조건 ②가 유지되는지 분기마다'.",
 "p16":f"One panel (~100%). The whiteboard shows {COND3}; JU BON-JIL standing fully to the side; ONLY these labels.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {COND3}, counting three fingers; HAN TANG-SU counting along on his own fingers, comic. (2 ~45%) close on the same card ({COND3}) with the first line '① 둘 다 4기준 통과' underlined twice.",
 "p18":"Two panels, kingdom metaphor insets drawn in the SAME inked webtoon style (no painterly fantasy), ONLY anonymous medieval figures, NO readable text. (1 ~55%) recalling Ep17: a castle wall where a crown is being passed from one anonymous king to another anonymous knight climbing up, a third figure waiting below. (2 ~45%) back in the study room, JU BON-JIL pointing at the inset in the air, the whiteboard behind showing ONLY the card titled '진짜 과점의 세 조건' with lines '① 둘 다 4기준 통과' / '② 고객 기반과 쓰임이 갈린다' / '③ 한쪽이 무너지면 시장이 위험'.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {COND3}; CHOI SIN-SANG asking brightly. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '조건 ①이 빠지면 영주와 기사' / '왕관이 돌면 킹덤'.",
 "p20":"Two panels. (1 ~55%) NA BAE-UM asking the practical question, leaning forward; JU BON-JIL nodding; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL writing ONLY the heading '원칙 9' on the board.",
 "p21":f"One panel (~100%). The whiteboard shows {P9CARD}; JU BON-JIL standing fully to the side; ONLY these labels.",
 "p22":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {P9CARD}; the group listening. (2 ~45%) a small inset: two equal stacks of coins side by side on a table, a plain scale balanced between them, NO readable text.",
 "p23":f"Two panels. (1 ~55%) GO BI-JEON (40s, navy suit, tablet under arm (screen OFF)) asking with a sharp gaze, his balloon tail pointing at him; the whiteboard behind shows {P9CARD}. (2 ~45%) JU BON-JIL thinking, finger on chin, beside the whiteboard which shows {P9CARD}.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL answering beside the whiteboard which now shows ONLY the small hand-drawn luggage tag labeled '잠재 고릴라' and a woven-basket doodle (recalling Ep18); GO BI-JEON nodding slowly. (2 ~45%) a small inset recalling Ep13: a hand-drawn rocket climbing to a red peak, NO text.",
 "p25":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '고릴라가 둘인 예외가 있다' / '세 조건이 다 맞을 때만' / '충돌은 양쪽을 든다'.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU (red cap) grinning, both thumbs up, phone (screen OFF) tucked under his arm; JU BON-JIL with a flat look; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL holding up three fingers, firm.",
 "p27":"Two panels. (1 ~55%) HAN TANG-SU deflating but writing in a small notebook of his own for once; SHIN JUNG-HAE smiling at him; the whiteboard behind is completely BLANK. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p28":"Two panels. (1 ~55%) AN MID-EO at the door turning back, flip phone in hand, with his question from Ep24 again; JU BON-JIL pausing, hand on the light switch; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL's face, serious, a hint of the next lesson.",
 "p29":f"One panel (~100%). A quiet beat, {INK} the whiteboard in the dim empty room, completely BLANK except for ONE hand-drawn stone throne doodle with a thin crack running down it; no people; one narration box only.",
 "p30":f"One panel (~100%). Closing chapter-end, {INK} a jungle hill at night where a single large stone throne stands with a visible crack glowing faintly at its base; NA BAE-UM and JU BON-JIL as small figures looking up from below; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 28\n한 시장에 고릴라가 둘: 과점의 예외\n둘이 나눠 갖는 정글\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','나배움: 교과서는 고릴라가 하나라는데\n클라우드는 두 회사가 다 잘 나가잖아요\n이건 어떻게 봐요?'),
        (2,'C','speech','주본질: 좋은 질문이야\nMoore도 인정한 예외가 하나 있어')],
 "p03":[(1,'C','label','과점의 예외'),
        (1,'C','speech','주본질: 어떤 카테고리는 1등과 2등 둘이\n안정적으로 나눠 갖아'),
        (2,'C','think','안믿어: 예외라는 말이 나오면 의심부터')],
 "p04":[(1,'C','speech','주본질: 단, 아무 1·2등이나 예외가 아니야\n조건이 있고, 오늘 그 조건을 셋으로 정리한다'),
        (2,'C','narr','두 줄')],
 "p05":[(1,'C','speech','주본질: 가장 깨끗한 사례부터\n지갑 속에 둘 다 있을걸'),
        (2,'C','narr','두 열, 네 행')],
 "p06":[(1,'C','label','과점의 예외 · 결제망'),(1,'C','label','Visa'),(1,'C','label','Mastercard'),
        (1,'C','label','4 / 4 · 4 / 4'),
        (1,'C','speech','주본질: 결제망 두 회사를 4기준에 넣으면\n둘 다 네 칸이 다 동그라미야')],
 "p07":[(1,'C','speech','주본질: 자기 망, 바꾸기 어려운 가맹점과 은행\n쓰는 사람이 늘수록 받는 곳이 늘고\n그리고 둘이서 이 나라 카드 결제의 대부분을 처리해'),
        (2,'C','narr','카드 한 장 뒤에 망이 하나씩 있다')],
 "p08":[(1,'C','speech','주본질: 그런데 둘이 정면으로 부딪히진 않아\n발급하는 은행도, 가맹점 망도 서로 갈려 있거든\n그리고 한쪽이 멈추면 결제 자체가 위험해져'),
        (2,'C','narr','세 줄')],
 "p09":[(1,'C','speech','안믿어: 요즘은 스테이블코인이\n저 둘을 위협한다고 하던데'),
        (2,'C','speech','주본질: 위협 서사는 있어\n그런데 거래량을 실제로 뺏었다는 증거는 아직 없어')],
 "p10":[(1,'C','label','관찰'),
        (1,'C','speech','주본질: 그래서 이건 관찰이야\n입증과 관찰을 가르는 법은 다음 시간에'),
        (2,'C','narr','기록 담당이 반론을 적었다')],
 "p11":[(1,'C','label','과점의 예외 · 메모리'),(1,'C','label','HBM'),(1,'C','label','DRAM'),
        (1,'C','label','삼성'),(1,'C','label','SK하이닉스'),
        (1,'C','speech','한실속: 둘째 사례는 제 업계라 제가 하겠습니다')],
 "p12":[(1,'C','speech','한실속: 두 회사가 HBM과 표준 DRAM 두 줄에 다 걸쳐 있어요\n둘이서 두 시장을 거의 양분하죠'),
        (2,'C','speech','한실속: 셋째 회사는 자기 몫을 지키는 전략이지\n둘을 밀어내는 전략이 아니에요')],
 "p13":[(1,'C','speech','한실속: 그리고 한쪽이 무너지면\n시장 자체가 위험해져요, 공급이 끊기니까'),
        (2,'C','speech','주본질: 완벽해, 단 17화를 기억해\nDRAM 줄은 킹덤이라 원칙 6도 같이 걸려')],
 "p14":[(1,'C','label','클라우드'),(1,'C','label','1위'),(1,'C','label','2위'),(1,'C','label','3위'),(1,'C','label','2년 전엔 둘'),
        (1,'C','speech','주본질: 그리고 네가 처음 물은 클라우드\n2년 전엔 둘이었는데 지금은 셋이야')],
 "p15":[(1,'C','speech','주본질: 3위가 가장 빨리 크고 있어\n과점은 고정이 아니야\n그래서 둘째 조건이 유지되는지 분기마다 묻는다'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','label','진짜 과점의 세 조건'),
        (1,'C','label','① 둘 다 4기준 통과'),(1,'C','label','② 고객 기반과 쓰임이 갈린다'),(1,'C','label','③ 한쪽이 무너지면 시장이 위험'),
        (1,'C','speech','주본질: 정리하면 셋이야')],
 "p17":[(1,'C','speech','주본질: 둘 다 4기준을 통과하고\n고객 기반과 쓰임이 갈려 정면충돌이 적고\n한쪽이 무너지면 시장 자체가 위험해야 해'),
        (2,'C','narr','첫째 조건에 밑줄이 두 번 그어졌다')],
 "p18":[(1,'C','narr','17화의 성벽을 떠올려 보자\n왕관은 돌고, 기사가 올라온다'),
        (2,'C','speech','주본질: 저기도 1등과 2등이 있지\n그런데 첫째 조건이 빠지면 그냥 영주와 기사야')],
 "p19":[(1,'C','speech','최신상: 그럼 1·2등이 다 과점은 아니라는 거네요\n킹덤의 1·2등은 자리바꿈을 하니까'),
        (2,'C','narr','두 줄')],
 "p20":[(1,'C','speech','나배움: 그럼 진짜 과점이면\n투자는 어떻게 해요? 둘 중 하나를 골라요?'),
        (2,'C','label','원칙 9')],
 "p21":[(1,'C','label','원칙 9 · 고릴라 충돌'),
        (1,'C','label','고릴라 충돌 시 결판까지 보유'),(1,'C','label','양쪽 다 보유는 헷지가 아니라 정공법'),
        (1,'C','speech','주본질: 고르지 않아, 양쪽을 다 들어\n결판이 날 때까지')],
 "p22":[(1,'C','speech','주본질: 한쪽이 지면 이긴 쪽이 그 몫을 가져가\n둘 다 들면 누가 이기든 카테고리의 가치를 잡는 거야\n헷지가 아니라 정공법이지'),
        (2,'C','narr','저울은 기울지 않는다')],
 "p23":[(1,'C','speech','고비전: 그럼 파운데이션 모델 회사들도\n충돌로 보고 양쪽을 들면 되나요?'),
        (2,'C','think','주본질: 좋은 질문인데, 순서가 다르다')],
 "p24":[(1,'C','label','잠재 고릴라'),
        (1,'C','speech','주본질: 거긴 아직 결판 전이고 아직 비상장이야\n곧 상장한다지만 상장 직후는 13화의 정점이기 쉬워\n그건 충돌이 아니라 바구니, 시즌 4에서 다룬다'),
        (2,'C','narr','정점 위의 로켓을 기억하라')],
 "p25":[(1,'C','speech','주본질: 오늘도 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p26":[(1,'C','speech','한탕수: 그럼 1·2등을 둘 다 사면\n무조건 이기는 거네요!'),
        (2,'C','speech','주본질: 진짜 과점인지 세 조건을 먼저 확인해\n하나라도 빠지면 영주와 기사야')],
 "p27":[(1,'C','narr','탕수가 세 조건을 받아 적었다'),
        (2,'C','think','나배움: 예외에도 규칙이 있다')],
 "p28":[(1,'C','speech','안믿어: 24화 때 내가 물었던 거 말이오\n4/4 고릴라면 영원하냐고'),
        (2,'C','speech','주본질: 다음 시간이 그 답이야\n왕좌의 균열')],
 "p29":[(1,'C','narr','보드에는 금이 간 왕좌 하나만 남았다')],
 "p30":[(1,'C','caption','Episode 28 끝 · 다음 화 · 왕좌의 균열: 고릴라는 언제 죽는가\n(원칙 4 · 대체 위협 3단계 · 균열의 종류)')],
}

BANDS = {
 "p03":'과점의 예외(Oligopoly Exception) · Moore도 인정한 예외 · 일부 카테고리는 1·2등 둘이 안정적으로 나눠 갖는다',
 "p06":'결제망 · 두 회사 모두 4기준 4/4 · 둘이 미국 카드 구매액의 대부분 · 가장 깨끗한 복점',
 "p11":'메모리 과점 · 두 회사가 HBM과 DRAM 두 줄에 걸쳐 양분 · 셋째 회사는 점유율 유지 전략 · DRAM 줄은 킹덤이라 원칙 6 병행(17화)',
 "p14":'클라우드 · 2년 전엔 둘, 지금은 셋 · 과점은 고정이 아니다 · 조건 ②가 유지되는지 분기마다 확인',
 "p16":'진짜 과점의 세 조건 · ① 둘 다 4기준 통과 ② 고객 기반과 쓰임이 갈린다 ③ 한쪽이 무너지면 시장이 위험 · ①이 빠지면 영주와 기사',
 "p21":'원칙 9 · 고릴라 충돌 시 결판까지 보유 · 양쪽 다 보유는 헷지가 아니라 정공법 · 실전은 시즌 4(35화)',
}

NOTES = {
 "p03":'해설: Moore는 『The Gorilla Game』에서 고릴라가 보통 하나이지만 일부 카테고리는 두 회사가 과점(oligopoly)으로 안정될 수 있다고 보았다. 본 만화는 이를 "과점의 예외"라 부르며, 영주·기사(17화)와 구별하기 위한 세 조건을 보조 도구로 정리했다',
 "p06":'사실 확인: 2025년 미국 카드 구매액은 Visa 약 7.0조 달러, Mastercard 약 3.0조 달러로, 두 회사가 4대 네트워크 합계(약 11.5조 달러)의 약 87%를 차지했다(Nilson Report 2025 연간, 2026-10 기준). 스테이블코인이 장기 위협이라는 논쟁은 있으나 두 회사는 자체 스테이블코인 검토 등 흡수 전략을 택했고, 카드 거래량이 실제로 잠식됐다는 데이터는 확인되지 않았다. 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
 "p11":'사실 확인: 2026년 HBM 점유율 전망은 SK하이닉스 약 54~60%, 삼성전자 약 28~30%, 마이크론 약 17~20%이며(대신증권·카운터포인트 등 종합), HBM4는 2026년 3사 모두 양산 단계다. 마이크론 경영진은 HBM 점유율을 DRAM 점유율(20%대) 수준으로 "유지"하는 전략을 밝혔다(2026-09-30 실적 발표). 표준 DRAM은 JEDEC 규격 아래 대체 가능한 킹덤이므로(17화) 과점이라도 원칙 6이 함께 적용된다(2026-10 기준, 작화 시 갱신)',
 "p14":'사실 확인: Synergy Research 기준 2026년 2분기 클라우드 인프라 점유율은 1위 약 28%, 2위 약 20%, 3위 약 15%이며, 지난 2년간 1·2위는 각각 4%p·3%p 줄고 3위는 3%p 늘었다. 분기 성장률은 3위 약 82%, 2위 약 43%, 1위 약 37%다(2026-10 기준, 작화 시 갱신). 검토자 의견(김경윤)에 따라 고객군을 "엔터프라이즈 vs 스타트업"으로 단정하는 표현은 쓰지 않고 "고객 기반과 쓰임이 갈린다"로 서술한다',
 "p21":'해설: Moore 원칙 9 원문: "In a gorilla collision, hold your candidates until there has been a definitive outcome." 두 후보가 결판나기 전에 한쪽을 고르면 카테고리의 가치를 놓칠 수 있다. 실전 적용(양쪽 비중·결판 신호)은 시즌 4 35화에서 다룬다',
 "p24":'사실 확인: 파운데이션 모델 상위 두 회사는 2026년 10월 현재 모두 비상장이나 상장 신청을 마친 상태다(한 곳은 2026년 11월 상장 목표, 한 곳은 2027년으로 연기). 18화에서 본 대로 비상장 초기 단계는 3×3 정중앙의 자리가 아니며, 상장 직후는 13화의 하입 정점이 되기 쉽다. 결판 전 후보들은 충돌이 아니라 바구니(시즌 4 33화)로 다룬다',
 "p28":'해설: 24화에서 안믿어가 던진 질문("4/4 고릴라면 영원한가")의 답이 29화 「왕좌의 균열」이다. 고릴라는 경쟁자가 아니라 카테고리 교체(대체 위협)에 진다는 것이 원칙 4의 전제다',
}

if __name__ == "__main__": run(globals())
