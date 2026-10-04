#!/usr/bin/env python3
# 고릴라 헌터스 Ep22 "고릴라의 뼈대 ② 전환비용" — 시즌 3 (31p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep22 · Moore 4기준 2번(High Switching Costs) · Ep1 p28 성곽 재호출 · Ep17 HBM 검증 종속 복습 · 원전 "3가지 지배력"
# ※ 이전 견적 장면(p05-08)은 익명 AI 팀(캐스트 등장 금지, SPEAKERS_EXTRA '팀장'). 가상 종목 A·B는 가상 고지. 실제 로고·실존 인물 금지.
# usage: python3 gen_ep22.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP22"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep22")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP22 NOTE: the '고릴라 4기준' card is always a clean hand-drawn whiteboard card with EXACTLY the rows listed. "
               "The anonymous AI-team scenes (p05-p08) contain ONLY anonymous office workers in a glass meeting room; NONE of the study-group cast appears there. "
               "Company and product names appear ONLY as the clean labels specified; NEVER real logos. Phones in the cast's hands are generic black slabs, screen OFF unless specified.")

SPEAKERS_EXTRA = {'팀장': 'the anonymous young AI team leader in a grey blazer standing at the glass board in the office scene (NOT a study-group member)'}

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NA = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, short BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "
OFFICE = "an anonymous modern office meeting room with a glass wall and a glass writing board, " + INK + "NONE of the study-group cast appears; a young team leader in a grey blazer and four anonymous engineers with laptops that are switched OFF (plain dark screens); NO readable text except the labels specified; "

FOURCARD_1 = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → ?' / '네트워크 효과 → ?' / '완전완비제품 → ?'; nothing else written on the card")
FOURCARD_2 = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → 떠나려면 더 든다' / '네트워크 효과 → ?' / '완전완비제품 → ?'; the second row underlined in red; nothing else written on the card")
Q2 = ("the single heading line '② 떠나려면 얼마를 더 써야 하는가' written large across the top of the whiteboard")
COST4 = ("a hand-drawn estimate card titled '이전 견적' with four short lines exactly: '코드 다시 짜기' / '라이브러리 재검증' / '엔지니어 재교육' / '성능 재튜닝'; nothing else on the card")
COST4T = ("a hand-drawn estimate card titled '이전 견적' with four short lines exactly: '코드 다시 짜기' / '라이브러리 재검증' / '엔지니어 재교육' / '성능 재튜닝', and beneath them one more line circled in red '1년 반'; nothing else on the card")
SW4 = ("four hand-drawn icons in a row with ONE label each: a stack of coins labeled '돈', an hourglass labeled '시간', an open hand labeled '습관', a chain of three linked boxes labeled '연동'; above them the heading '전환비용 넷'")
NRR1 = ("a hand-drawn sketch: a row of many tiny dots labeled '올해 고객 100', beneath it a slightly LONGER bar labeled '내년 같은 고객이 120만큼', and a small boxed label 'NRR 120%'; nothing else on the board")
TAP1 = ("a hand sketch of a phone screen with two plain app icons side by side and a finger tapping between them, with the single label '한 번 탭'")
HBMLOCK = ("a hand-drawn sketch of a stacked memory chip bolted onto a large GPU chip with a small padlock icon on the bolt, and a small clean label '검증에 묶인다'")
LOCK3 = ("a hand-drawn card with three short lines exactly: '고객을 묶는다' / '협력사를 묶는다' / '경쟁사를 밀어낸다'; a small padlock icon beside the card")
CARDS2 = ("two blank cards pinned side by side labeled ONLY 'A' and 'B'; beneath EACH card four tiny empty boxes with the tiny labels '돈', '시간', '습관', '연동'")
CARDS2F = ("two cards pinned side by side labeled 'A' and 'B'; beneath card A four tiny boxes labeled '돈', '시간', '습관', '연동' reading '크다', '길다', '깊다', '많다'; beneath card B four tiny boxes labeled '돈', '시간', '습관', '연동' reading '0', '0', '얕다', '없다'; nothing else")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a tall stone castle wall with its great gate standing wide open, warm light inside, and a crowd of small anonymous people inside the walls busy at their work, none of them walking toward the gate; a single empty road leads out of the gate into dusk; NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) JU BON-JIL drawing ONLY a simple castle-wall sketch with a gate on the whiteboard (no words); the whole group present. (2 ~45%) NA BAE-UM recognizing it, pointing at his own notebook.",
 "p03":f"One panel (~100%). The whiteboard shows {FOURCARD_1} and beside it the simple castle-wall sketch (no words); JU BON-JIL tapping the second row; ONLY these labels.",
 "p04":f"One panel (~100%). The whiteboard shows ONLY {Q2}; the rest of the board is blank; JU BON-JIL to the side looking at the group; ONLY this one line.",
 "p05":f"One panel (~100%). {OFFICE}the team leader standing at the glass board which is completely BLANK, the four engineers seated; a tense, practical mood.",
 "p06":f"One panel (~100%). {OFFICE}the glass board now shows {COST4}; the team leader writing the last line; the engineers' faces falling one by one; ONLY these labels.",
 "p07":f"Two panels. (1 ~55%) {OFFICE}the team leader adding the circled line beneath the card so the board shows {COST4T}; ONLY these labels. (2 ~45%) {OFFICE}close on the four engineers, nobody raising a hand, the glass board out of focus.",
 "p08":f"Two panels. (1 ~55%) {OFFICE}the team leader closing a laptop with a resigned, decided face; the glass board behind out of focus with no readable text. (2 ~45%) back in the study room: JU BON-JIL finishing the story at the table, the whiteboard behind completely BLANK.",
 "p09":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY {COST4T} redrawn in his hand; NA BAE-UM listening. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p10":f"One panel (~100%). The whiteboard shows {SW4}; JU BON-JIL to the side; ONLY these labels.",
 "p11":f"Two panels. (1 ~55%) HAN SIL-SOK (knit vest, glasses) giving testimony from the table with a tired honest gesture, his balloon tail pointing at him; the whiteboard behind shows {SW4}. (2 ~45%) JU BON-JIL pointing at the chain icon labeled '연동' on the whiteboard which shows {SW4}.",
 "p12":f"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) confessing with a shy smile, her balloon tail pointing at her; the whiteboard behind shows {SW4}. (2 ~45%) JU BON-JIL smiling warmly, the group chuckling.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '돈 · 시간 · 습관 · 연동' / '넷이 겹칠수록 성벽이 높다'. (2 ~45%) JU BON-JIL writing ONLY the letters 'NRR' on a clean part of the board.",
 "p14":f"One panel (~100%). The whiteboard shows {NRR1}; JU BON-JIL to the side so that no hand covers the labels; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) GO BI-JEON (navy suit) asking from the table, tablet under arm; the whiteboard behind shows {NRR1}. (2 ~45%) JU BON-JIL nodding, tapping the boxed label on the whiteboard which shows {NRR1}.",
 "p16":f"Two panels. (1 ~55%) the whiteboard corner shows {TAP1}; JU BON-JIL to the side; ONLY this one label. (2 ~45%) HAN TANG-SU (red cap) holding up his phone (screen OFF), sheepish grin.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY {TAP1}; HAN SIL-SOK nodding at the mention of memory. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '전환비용 0 = 고릴라 없음' / 'NRR 100 초과 = 성벽 있음'.",
 "p18":f"One panel (~100%). A flashback inset of the Ep17 whiteboard {INK}showing ONLY {HBMLOCK}; beneath the inset a narrow strip of the study room with JU BON-JIL speaking; ONLY this one label.",
 "p19":f"One panel (~100%). The whiteboard shows {LOCK3}; JU BON-JIL to the side; ONLY these labels.",
 "p20":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {LOCK3}; GO BI-JEON leaning in. (2 ~45%) close on GO BI-JEON, impressed.",
 "p21":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY this hand-written line: '세 겹 · 고객 · 협력사 · 경쟁사'. (2 ~45%) JU BON-JIL holding out the marker to NA BAE-UM, who stands up.",
 "p22":f"One panel (~100%). {LOCK_NA}The whiteboard shows {CARDS2}; every tiny box is completely EMPTY; ONLY the two letters and the tiny box labels.",
 "p23":f"One panel (~100%). {LOCK_NA}The whiteboard shows {CARDS2F}; NA BAE-UM pointing at card B; ONLY these labels and marks.",
 "p24":f"One panel (~100%). The whiteboard shows {FOURCARD_2}; JU BON-JIL has just finished the second row and steps back; ONLY these labels.",
 "p25":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {FOURCARD_2}; NA BAE-UM nodding. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p26":"Two panels. (1 ~55%) HAN TANG-SU (red cap) bragging, holding up his phone with the screen OFF; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL with a dry deadpan look.",
 "p27":"Two panels. (1 ~55%) the group laughing, HAN TANG-SU sheepish with his cap pulled down; the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '② 전환비용 = 떠나는 값' / '넷으로 쪼개고 NRR로 확인한다'.",
 "p28":"Two panels. (1 ~55%) AN MID-EO (stern, flip phone) objecting, his balloon tail pointing at him; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL conceding with a nod while SHIN JUNG-HAE writes in the club log (no readable text in the log).",
 "p29":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL a question, the balloon tail pointing at NA BAE-UM; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL smiling, hand on the door frame.",
 "p30":f"One panel (~100%). A quiet image {INK}a snowball rolling down a long snowy slope, growing larger with each turn, small at the top and huge at the bottom; soft winter light; NO people, NO readable text anywhere.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK}the castle with the open gate far behind, the snowy slope ahead, a desk with the kraft notebook in the foreground; NA BAE-UM and JU BON-JIL small figures walking home; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 22\n고릴라의 뼈대 ② 전환비용\n문은 열려 있다, 그런데 왜 아무도 안 나가나\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','주본질: 1화에서 이 성곽을 그렸지\n오늘은 성벽의 높이를 잰다'),
        (2,'C','speech','나배움: 전환비용 성곽이요\n제 노트 첫 장에 있어요')],
 "p03":[(1,'C','label','고릴라 4기준'),(1,'C','label','자체 아키텍처 → 규격을 내가 쥔다'),(1,'C','label','전환비용 → ?'),
        (1,'C','speech','주본질: 둘째 행이야\n규격을 쥔 다음, 고객이 왜 못 떠나는가')],
 "p04":[(1,'C','label','② 떠나려면 얼마를 더 써야 하는가'),
        (1,'C','speech','주본질: 질문은 하나\n떠나려면 얼마를 더 써야 하는가\n셀 수 없이 크면 통과야')],
 "p05":[(1,'C','narr','어느 회사 AI 팀, 칩을 바꾸자는 회의'),
        (1,'C','speech','팀장: 다른 회사 칩이 더 싸다고 합니다\n옮기면 얼마가 드는지 적어 보죠')],
 "p06":[(1,'C','label','이전 견적'),(1,'C','label','코드 다시 짜기'),(1,'C','label','라이브러리 재검증'),(1,'C','label','엔지니어 재교육'),(1,'C','label','성능 재튜닝'),
        (1,'C','speech','팀장: 넷 다 처음부터입니다')],
 "p07":[(1,'C','label','1년 반'),
        (1,'C','speech','팀장: 1년 반\n그동안 경쟁사는 앞서갑니다'),
        (2,'C','narr','아무도 손을 들지 않았다')],
 "p08":[(1,'C','speech','팀장: 안 옮깁니다\n싼 게 싼 게 아니에요'),
        (2,'C','speech','주본질: 이게 매일 어딘가에서 벌어지는 회의야')],
 "p09":[(1,'C','speech','주본질: 문은 열려 있었어\n나가는 값이 너무 비쌌을 뿐이지'),
        (2,'C','think','나배움: 성벽은 문이 아니라 값이구나')],
 "p10":[(1,'C','label','전환비용 넷'),(1,'C','label','돈'),(1,'C','label','시간'),(1,'C','label','습관'),(1,'C','label','연동'),
        (1,'C','speech','주본질: 떠나는 값은 넷으로 쪼개져')],
 "p11":[(1,'C','speech','한실속: 저희 회사 전산 시스템이 딱 그래요\n싫은데 못 바꿔요, 다른 시스템이 다 붙어 있어서'),
        (2,'C','speech','주본질: 그게 연동이야\n가장 두꺼운 벽')],
 "p12":[(1,'C','speech','신중해: 나는 은행 앱도 못 바꿔요\n손이 거길 기억해서'),
        (2,'C','speech','주본질: 습관도 전환비용이야\n보수주의자의 손이 제일 정직하지')],
 "p13":[(1,'C','narr','두 줄'),
        (2,'C','label','NRR'),
        (2,'C','speech','주본질: 이걸 숫자로 보는 법이 있어')],
 "p14":[(1,'C','label','올해 고객 100'),(1,'C','label','내년 같은 고객이 120만큼'),(1,'C','label','NRR 120%'),
        (1,'C','speech','주본질: 작년 고객들이 올해 더 많이 쓰면 100을 넘어\n잠금의 결과가 매출로 보이는 거야')],
 "p15":[(1,'C','speech','고비전: 새 고객 없이도 매출이 는다는 뜻이군요'),
        (2,'C','speech','주본질: 떠나지도 않고 더 쓰니까\n100을 넘는 회사는 성벽이 있다는 증거야')],
 "p16":[(1,'C','label','한 번 탭'),
        (1,'C','speech','주본질: 반례야, 소비자 앱은 한 번 탭으로 갈아타\n전환비용이 0이면 사람이 많아도 고릴라가 못 돼'),
        (2,'C','speech','한탕수: 저 배달 앱 세 개 번갈아 써요')],
 "p17":[(1,'C','speech','주본질: 21화의 표준 메모리도 같아\n규격이 같으니 떠나는 값이 0이지'),
        (2,'C','narr','두 줄')],
 "p18":[(1,'C','label','검증에 묶인다'),
        (1,'C','narr','17화의 그 그림'),
        (1,'C','speech','주본질: 고객만 묶는 게 아니야\n협력사도 같이 검증에 묶이지')],
 "p19":[(1,'C','label','고객을 묶는다'),(1,'C','label','협력사를 묶는다'),(1,'C','label','경쟁사를 밀어낸다'),
        (1,'C','speech','주본질: 고릴라의 성벽은 세 겹이야')],
 "p20":[(1,'C','speech','주본질: 고객을 묶고, 협력사를 묶고\n그 둘이 묶이면 경쟁사가 들어올 틈이 없어'),
        (2,'C','speech','고비전: 그래서 생태계가 곧 해자군요')],
 "p21":[(1,'C','narr','한 줄'),
        (2,'C','speech','주본질: 이제 네가 견적을 내 봐')],
 "p22":[(1,'C','label','A'),(1,'C','label','B'),
        (1,'C','speech','나배움: 가상 종목 두 장\n떠나는 값을 네 칸으로 적어 볼게요'),
        (1,'C','narr','A와 B는 가상의 회사다')],
 "p23":[(1,'C','label','A'),(1,'C','label','B'),
        (1,'C','speech','나배움: A는 넷 다 커요, 떠나려면 회사를 다시 짓는 수준\nB는 견적이 안 나와요, 그냥 나가면 돼요'),
        (1,'C','speech','주본질: B는 21화 질문엔 O였지\n규격은 쥐었는데 아무도 안 묶였어')],
 "p24":[(1,'C','label','고릴라 4기준'),(1,'C','label','전환비용 → 떠나려면 더 든다'),
        (1,'C','speech','주본질: 둘째 행을 채웠다')],
 "p25":[(1,'C','speech','주본질: 두 행이 같이 O여야 성이 돼\n규격만 쥐고 아무도 안 묶이면 빈 성이야'),
        (2,'C','think','나배움: 빈 성, B가 그거구나')],
 "p26":[(1,'C','speech','한탕수: 저는 증권사 앱을 다섯 개 써요\n수수료 싼 데로 매번 옮겨요'),
        (2,'C','speech','주본질: 너는 전환비용이 0인 고객이야\n그래서 아무도 널 못 잡지')],
 "p27":[(1,'C','speech','한탕수: 그게 칭찬이에요?'),
        (1,'C','speech','주본질: 고객으로선 똑똑하고, 종목으로선 최악이지'),
        (2,'C','narr','두 줄')],
 "p28":[(1,'C','speech','안믿어: 묶인 고객이 많으면 회사가 게을러지지 않소'),
        (2,'C','speech','주본질: 맞아, 그래서 성벽만으론 부족해\n공격이 필요해'),
        (2,'C','speech','신중해: 기록했어요')],
 "p29":[(1,'C','speech','나배움: 성벽은 수비잖아요\n공격은요?'),
        (2,'C','speech','주본질: 사람이 사람을 부르는 엔진\n그게 다음 시간이야')],
 "p30":[(1,'C','narr','굴러갈수록 커지는 것')],
 "p31":[(1,'C','caption','Episode 22 끝 · 다음 화 · 고릴라의 뼈대 ③ 수확체증과 네트워크 효과\n(정글의 엔진, 사람이 사람을 부른다)')],
}

BANDS = {
 "p04":'4기준 ② 전환비용 · 떠나려면 얼마를 더 써야 하는가 · 셀 수 없이 크면 통과',
 "p10":'전환비용 넷 · 돈(재구매·재구축) · 시간(재검증·재교육) · 습관(사람의 손) · 연동(붙어 있는 다른 시스템)',
 "p14":'NRR(순매출유지율) · 작년 고객이 올해 쓰는 금액의 비율 · 100%를 넘으면 떠나지 않고 더 쓴다는 뜻',
 "p19":'고릴라의 성벽은 세 겹 · 고객을 묶고 · 협력사를 묶고 · 경쟁사를 밀어낸다 (원전: 3가지 지배력)',
 "p24":'4기준 2행 채움 · 전환비용 = 떠나려면 더 든다 · 1행과 2행이 같이 O여야 성이 된다',
}

NOTES = {
 "p04":'해설: Moore의 고릴라 판별 기준 2 "High Switching Costs(높은 전환비용)"는 고객이 다른 회사 제품으로 옮기려 할 때 드는 비용·시간이 매우 커서 사실상 옮기지 못하는 상태를 뜻한다. 회장님 강연 자료의 "고릴라 힘의 기반 ② 높은 전환비용(고객·협력사 잠금 + 경쟁사 배제)"과 같은 개념이다(출처: 제프리 무어 고릴라 게임, © The Chasm Group)',
 "p06":'해설: 이 회의 장면과 "1년 반"은 전환비용을 설명하기 위한 가상의 견적이다. 실제로 AI 개발 코드·라이브러리 대부분이 특정 GPU 플랫폼 위에 쌓여 있어, 다른 칩으로 옮기려면 코드 재작성·라이브러리 재검증·인력 재교육·성능 재튜닝이 필요하다는 것은 업계의 일반적인 설명이다(16화·21화)',
 "p14":'해설: NRR(Net Revenue Retention, 순매출유지율)은 1년 전 고객 집단이 올해 내는 매출을 1년 전 매출로 나눈 비율이다. 100%를 넘으면 이탈·축소보다 추가 사용·업그레이드가 더 크다는 뜻으로, 기업용 소프트웨어 회사의 잠금 강도를 보는 대표 지표다. 수치 예시(120%)는 설명용이다',
 "p18":'해설: HBM은 GPU 패키지 위에 적층되어 함께 검증(qualification)을 받는다. 검증 통과 후 공급사를 바꾸려면 재검증 비용이 커 전환비용이 높다(17화). 고릴라의 전환비용이 고객뿐 아니라 협력사까지 묶는 예다',
 "p20":'해설: 회장님 강연 자료는 고릴라의 힘을 세 가지 지배력으로 정리한다. 공급자 지배력(고객에 대해), 가치사슬 지배력(협력자에 대해), 시장 선도자 지배력(경쟁자에 대해). 이 화의 "세 겹 성벽"은 그 요약이다(© The Chasm Group / 한글판 VentureTek)',
 "p22":'해설: A사와 B사는 가상의 회사다. B처럼 규격은 쥐었지만(21화 기준 통과) 고객이 묶이지 않은 경우가 실제로 있으며, 그런 회사는 1등이어도 고릴라가 되지 못한다. 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
