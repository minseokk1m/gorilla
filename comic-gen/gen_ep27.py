#!/usr/bin/env python3
# 고릴라 헌터스 Ep27 "AI 70년사와 표준 동맹의 교체" — 시즌 3 (31p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep27 · v4 Ep27(AI 70년사·윈텔→윈비디아)·전쟁의 양상(독자 vs 동맹)·젠슨 황 방한 계승
# 검토자 반영: 김경윤·김선일(윈비디아 톤다운: "움직임이 보이는 중, 지켜볼 일", 본류는 서버·AI DC)
# 팩트: season34-facts.md A6(방한 2회: 2025-10-31 APEC 경주, 2026-06-05~08 재방한) · A7(NVIDIA-인텔 2025-09 $50억, 공동 칩 미출시, 인텔 2026 +25% 회복 시도) · A8(RTX Spark 노트북 2026-10 출시)
# ※ 실존 인물(젠슨 황)은 절대 그리지 않고 대사에서는 "그 회사 대표", 실명·회사명은 해설에만. 회상 장면은 FLASHBACK RULE(익명 인물, 캐스트 없음)
# usage: python3 gen_ep27.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP27"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep27")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP27 NOTE: historical flashback insets (1956 seminar, empty 1990s lab, 2012 image-recognition contest, 2016 go match, 2022 chatbot launch) contain ONLY anonymous period-appropriate people and props, NEVER the study-group cast, NEVER a real person's face, NEVER a real logo. "
               "The 'company CEO visiting Korea' scene is drawn ONLY as faceless silhouettes (an airport corridor, a meeting room seen from behind); NO recognizable face, NO leather jacket, NO logo, NO readable text. "
               "Company names appear ONLY as clean labels on the whiteboard where specified; NEVER real logos.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "

TL5 = ("a hand-drawn horizontal TIMELINE on the whiteboard: a long line with FIVE dots and ONE short label under each dot, exactly '1956 탄생' / 'AI 겨울' / '2012 부활' / '2016 알파고' / '2022 챗GPT'; the long stretch between the first and third dots is shaded light grey as a valley; the line rises steeply after the last dot into a small tornado doodle; NO other writing")
ALLY2 = ("a hand-drawn two-column card: LEFT column headed '40년 PC 동맹' with one line beneath '운영체제 + CPU' and a small old beige desktop computer sketch; RIGHT column headed '새 동맹의 움직임' with one line beneath '운영체제 + GPU' and a small thin laptop sketch; between the two columns a large hand-drawn question mark with the small label '지켜볼 일'; NO other writing")
WAR3 = ("a hand-drawn table with THREE rows and TWO columns; column headers on top exactly '독자 (수직통합)' (left) and '동맹 (분업)' (right); row labels down the far left exactly '폰', '차', 'AI'; cell texts row by row exactly '한 회사가 전부' / '운영체제 + 제조사' ; '차·배터리·충전 전부' / '차 OS + 완성차' ; '자체 스택' / '칩 + 동맹군'; a tiny phone icon, car icon and chip icon beside the row labels; NO other writing")
PIECE3 = ("a hand-drawn jigsaw sketch: a large central puzzle piece with a small gorilla doodle inside and NO text, and THREE missing-piece gaps around it, each gap labeled exactly '메모리' / '피지컬 AI (차·로봇)' / '클라우드·데이터'; NO company names, NO other writing")
LOCK_NB = "ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal shirt) and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit, glasses) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). "

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a vast flat horizon at dusk drawn as a single long timeline-like road with five small milestone stones along it, and at the far end a tall tornado funnel lit by the last light; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL while the whole group (TALC five and HAN TANG-SU) sits at the long table; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL drawing a long horizontal line across the whole whiteboard with the marker, nothing written yet.",
 "p03":f"One panel (~100%). The whiteboard shows {TL5}; JU BON-JIL standing fully to the side pointing at the first dot; ONLY these five labels.",
 "p04":"Two panels, historical flashback insets drawn in soft vintage tone, ONLY anonymous period people, NO readable text anywhere. (1 ~50%) 1956: a small college seminar room, a few anonymous men in 1950s suits around a blackboard covered with abstract chalk scribbles (no legible letters), excited. (2 ~50%) 1990s: a dim, empty computer lab with dust sheets over bulky monitors, one anonymous researcher alone switching off the light.",
 "p05":"Two panels, historical flashback insets drawn in soft vintage tone, ONLY anonymous people, NO readable text anywhere. (1 ~50%) 2012: a conference hall where an anonymous young researcher presents a projected grid of blurry photo thumbnails, the audience leaning forward. (2 ~50%) 2016: a go board under TV lights, an anonymous human player holding his head while a screen beside the board shows ONLY a plain blank window.",
 "p06":f"Two panels. (1 ~55%) 2022 flashback inset in soft vintage tone, ONLY anonymous people: a crowd of office workers and students all looking at phones and laptops that show ONLY a plain gray chat window with blurred lines, a sense of a wave. (2 ~45%) back in the study room, JU BON-JIL beside the whiteboard which shows {TL5}, tapping the last dot.",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {TL5}, his hand sweeping over the shaded valley between the first and third dots; the group quiet. (2 ~45%) close on SHIN JUNG-HAE (50s, brown cardigan) raising her hand carefully, her balloon tail pointing at her.",
 "p08":f"Two panels. (1 ~55%) JU BON-JIL nodding seriously to SHIN JUNG-HAE, beside the whiteboard which shows {TL5}. (2 ~45%) a small inset recalling Ep18: a hand-drawn luggage tag labeled '캐즘 위치' lying on the table next to a woven basket, no other text.",
 "p09":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '한 카테고리가 70년' / '캐즘에 30년도 갇힌다' / '캐즘 위치는 바구니 관찰'. (2 ~45%) NA BAE-UM's face, sober.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL erasing the board and writing ONLY the heading '표준 동맹의 교체'; HAN TANG-SU perking up. (2 ~45%) close on JU BON-JIL's calm face, marker raised.",
 "p11":f"One panel (~100%). The whiteboard shows {ALLY2}; JU BON-JIL standing fully to the side so no hand covers any label; ONLY these labels.",
 "p12":f"Two panels. (1 ~55%) AN MID-EO (50s, stern, flip phone in hand) objecting from the table, his balloon tail pointing at him; the whiteboard behind shows {ALLY2}. (2 ~45%) JU BON-JIL answering with a measured gesture, one hand flat, beside the whiteboard which shows {ALLY2}.",
 "p13":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {ALLY2}; HAN SIL-SOK nodding. (2 ~45%) a small inset: two anonymous office workers unboxing a thin new laptop (plain dark screen, no logo), one anonymous worker at a desk nearby still using a beige older desktop; NO readable text.",
 "p14":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {ALLY2}, now with a small hand-drawn crack doodle added at the base of the LEFT column; GO BI-JEON (navy suit) leaning forward. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '동맹의 재편 = 관찰' / '옛 고릴라의 균열 = 29화'.",
 "p15":"Two panels. (1 ~55%) JU BON-JIL erasing and writing ONLY the heading '전쟁의 양상' on the board, a small sword-and-shield doodle beside it; CHOI SIN-SANG (headphones) curious. (2 ~45%) JU BON-JIL drawing the empty outline of a three-row table (no text inside yet).",
 "p16":f"One panel (~100%). The whiteboard shows {WAR3}; JU BON-JIL standing fully to the side; ONLY these labels.",
 "p17":f"Two panels. (1 ~55%) JU BON-JIL pointing at the FIRST row ('폰') of the whiteboard which shows {WAR3}; CHOI SIN-SANG holding up his own smartphone (screen OFF, no logo). (2 ~45%) a small inset: two anonymous shoppers in a phone store comparing two plain phones, NO readable text, NO logos.",
 "p18":f"Two panels. (1 ~55%) JU BON-JIL pointing at the SECOND row ('차') of the whiteboard which shows {WAR3}; HAN SIL-SOK nodding. (2 ~45%) a small inset: a sleek generic electric sedan with NO badge at a charging post on the left, a conventional family car with a plain dashboard screen on the right, NO readable text.",
 "p19":f"Two panels. (1 ~55%) JU BON-JIL pointing at the THIRD row ('AI') of the whiteboard which shows {WAR3}; GO BI-JEON intent. (2 ~45%) close on the third row of the same table ({WAR3}), the two cells '자체 스택' and '칩 + 동맹군' circled.",
 "p20":f"Two panels. (1 ~55%) JU BON-JIL stepping back from the whiteboard which shows {WAR3}, summing up; the whole group attentive. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '독자든 동맹이든' / '목적은 완전완비제품' / '둘 다 고릴라를 낳았다'.",
 "p21":"Two panels. (1 ~55%) JU BON-JIL with a reminiscing look, hands in pockets; the whiteboard behind is completely BLANK. (2 ~45%) a faceless scene: an airport arrival corridor seen from behind, a small group of silhouetted figures in dark suits walking away, cameras' flashes as abstract white bursts, NO faces, NO logos, NO readable text.",
 "p22":"One panel (~100%). A faceless meeting scene seen entirely from behind: a long conference table, silhouetted figures on both sides shaking hands across it, large windows with a city skyline, NO faces visible, NO logos, NO readable text, NO leather jacket; a narration box only.",
 "p23":f"One panel (~100%). The whiteboard shows {PIECE3}; JU BON-JIL standing fully to the side; ONLY these three labels.",
 "p24":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {PIECE3}, pointing at the gap '메모리' then '피지컬 AI (차·로봇)'; HAN SIL-SOK and CHOI SIN-SANG listening. (2 ~45%) close on the gap labeled '클라우드·데이터' on the same board ({PIECE3}).",
 "p25":f"Two panels. (1 ~55%) GO BI-JEON (40s, navy suit, tablet under arm) speaking with conviction, his balloon tail pointing at him, beside the whiteboard which shows {PIECE3}. (2 ~45%) JU BON-JIL's pleased face.",
 "p26":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '카테고리 하나가 70년' / '풀리면 동맹이 통째로 바뀐다' / '독자든 동맹이든 완전완비제품이 목적'.",
 "p27":"Two panels. (1 ~55%) HAN TANG-SU (red cap) raising his hand eagerly, phone (screen OFF) in the other hand; JU BON-JIL with a dry look; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL drawing ONLY a small feather on the board corner (no text).",
 "p28":"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY a small feather doodle; HAN TANG-SU deflating comically. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p29":"Two panels. (1 ~55%) JU BON-JIL at the door turning back with a new question, the group packing up; the whiteboard behind is completely BLANK. (2 ~45%) NA BAE-UM caught mid-thought, notebook half closed.",
 "p30":f"One panel (~100%). A quiet beat, {INK} the empty study room at evening, the whiteboard completely BLANK, two chairs left pulled out side by side at the head of the table as if for two equals; no people; one narration box only.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK} a wide jungle clearing at dusk with TWO stone thrones standing side by side on a hill, both empty, a faint sunset behind; NA BAE-UM and JU BON-JIL as small figures looking up from below; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 27\nAI 70년사와 표준 동맹의 교체\n어제 시작된 게 아니다\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','나배움: AI는 언제부터 시작된 거예요?\n챗GPT가 나온 그해부터인가요?'),
        (2,'C','speech','주본질: 아니, 어제 시작된 게 아니야\n선을 하나 길게 긋자, 70년짜리')],
 "p03":[(1,'C','label','1956 탄생'),(1,'C','label','AI 겨울'),(1,'C','label','2012 부활'),(1,'C','label','2016 알파고'),(1,'C','label','2022 챗GPT'),
        (1,'C','speech','주본질: 다섯 점이야\n한 카테고리의 기술수용주기가 70년')],
 "p04":[(1,'C','narr','1956년, 한 대학의 여름 세미나에서\n인공지능이라는 이름이 태어났다'),
        (2,'C','narr','그리고 겨울이 왔다\n기대는 컸고, 되는 건 없었다')],
 "p05":[(1,'C','narr','2012년, 이미지 인식 대회에서\n딥러닝이 압도적인 차이로 이겼다'),
        (2,'C','narr','2016년, 바둑판 위에서\n세상이 처음으로 놀랐다')],
 "p06":[(1,'C','narr','2022년, 두 달 만에 1억 명\n30년 캐즘이 몇 달 만에 토네이도가 됐다'),
        (2,'C','speech','주본질: 2화에서 본 그 장면이야\n왓슨은 크랙, 알파고는 초기시장, 챗GPT는 캐즘 돌파')],
 "p07":[(1,'C','speech','주본질: 여기 회색 골짜기를 봐\n선구자는 열광했는데 실용주의자가 30년을 안 샀어'),
        (2,'C','speech','신중해: 그럼 지금 캐즘에 있는 것들도\n30년이 걸릴 수 있다는 말씀이에요?')],
 "p08":[(1,'C','speech','주본질: 그럴 수 있어, 그래서 18화에서 그랬지\n캐즘 위치는 바구니 관찰이지 매수가 아니라고'),
        (2,'C','narr','이름표는 등급이 아니라 위치다')],
 "p09":[(1,'C','narr','세 줄'),
        (2,'C','think','나배움: 70년이라는 숫자가\n조급함을 눌러 준다')],
 "p10":[(1,'C','label','표준 동맹의 교체'),
        (1,'C','speech','주본질: 그런데 캐즘이 풀리는 순간\n또 하나가 통째로 바뀌어'),
        (2,'C','speech','주본질: 표준을 쥔 동맹이야')],
 "p11":[(1,'C','label','40년 PC 동맹'),(1,'C','label','운영체제 + CPU'),(1,'C','label','새 동맹의 움직임'),(1,'C','label','운영체제 + GPU'),(1,'C','label','지켜볼 일'),
        (1,'C','speech','주본질: 40년 동안 PC는 운영체제 회사와 CPU 회사의 동맹이 표준이었어\n지금 오른쪽에 움직임이 보여')],
 "p12":[(1,'C','speech','안믿어: 그래서 바뀌었소?\n신문에선 벌써 새 이름까지 붙였던데'),
        (2,'C','speech','주본질: 움직임이 보이는 거야, 바뀐 건 아니야\n이름은 언론이 붙인 거고')],
 "p13":[(1,'C','speech','주본질: 올해 GPU 회사 칩을 넣은 노트북이 나오긴 해\n그런데 그 회사 본류는 서버와 AI 데이터센터야\n옛 CPU 회사도 올해 실적이 다시 늘었고'),
        (2,'C','narr','한쪽의 몰락이 아니라 동맹의 재편이다')],
 "p14":[(1,'C','speech','주본질: 투자자가 볼 건 하나야\n옛 고릴라의 왕좌에 금이 가는지\n그게 원칙 4의 대체 위협이고, 29화에서 본다'),
        (2,'C','narr','두 줄')],
 "p15":[(1,'C','label','전쟁의 양상'),
        (1,'C','speech','주본질: 동맹 얘기가 나왔으니\n전쟁의 양상을 보자, 폰, 차, AI가 같은 전쟁을 반복해'),
        (2,'C','narr','세 줄짜리 표의 테두리가 그려졌다')],
 "p16":[(1,'C','label','독자 (수직통합)'),(1,'C','label','동맹 (분업)'),
        (1,'C','label','한 회사가 전부'),(1,'C','label','운영체제 + 제조사'),
        (1,'C','speech','주본질: 왼쪽은 한 회사가 다 갖는 길\n오른쪽은 나눠서 층층이 채우는 길')],
 "p17":[(1,'C','speech','주본질: 폰부터, 한쪽은 운영체제와 칩과 하드웨어를 한 회사가 전부\n다른 쪽은 운영체제 회사와 제조사가 나눠 맡았지'),
        (2,'C','speech','최신상: 둘 다 아직 잘 팔리잖아요\n둘 다 이긴 거예요?')],
 "p18":[(1,'C','speech','주본질: 차도 같아\n한쪽은 차와 배터리와 충전망까지 혼자\n다른 쪽은 차 운영체제 회사와 완성차가 분업'),
        (2,'C','narr','18화의 수직통합이 여기서 다시 나온다')],
 "p19":[(1,'C','speech','주본질: 그리고 AI\n한쪽은 자체 스택으로 전 층을 혼자\n다른 쪽은 칩을 쥔 고릴라와 동맹군'),
        (2,'C','label','자체 스택'),(2,'C','label','칩 + 동맹군')],
 "p20":[(1,'C','speech','주본질: 두 길 다 목적은 하나야, 완전완비제품\n그리고 폰에서도 차에서도 두 길 모두 고릴라를 낳았어'),
        (2,'C','narr','세 줄')],
 "p21":[(1,'C','speech','주본질: 동맹을 맺는 현장을 우리는 이미 봤어\n그 회사 대표가 한국에 두 번 왔지'),
        (2,'C','narr','첫 번째는 가을, GPU 26만 장 약속\n두 번째는 이듬해 여름, 동맹군을 하나씩 만났다')],
 "p22":[(1,'C','narr','메모리 회사, 자동차 회사, 로봇 회사, 클라우드 회사\n혼자 다 가지지 못한 고릴라가\n빠진 조각을 들고 올 손을 찾았다')],
 "p23":[(1,'C','label','메모리'),(1,'C','label','피지컬 AI (차·로봇)'),(1,'C','label','클라우드·데이터'),
        (1,'C','speech','주본질: 그 회사 케이크에 빠진 조각이 세 개였어\n이 나라에 그 셋이 다 있었지')],
 "p24":[(1,'C','speech','주본질: 메모리는 HBM 공급사들이\n차와 로봇은 완성차 회사가 피지컬 AI 허브를\n클라우드는 포털 회사가 AI 팩토리를 맡아'),
        (2,'C','narr','마지막 조각, 클라우드와 데이터')],
 "p25":[(1,'C','speech','고비전: 혼자 다 못 가진 고릴라가\n동맹으로 완전완비제품을 완성하는 장면이군요'),
        (2,'C','speech','주본질: 24화의 두 경로 중 오른쪽 길이지')],
 "p26":[(1,'C','speech','주본질: 오늘도 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p27":[(1,'C','speech','한탕수: 그럼 동맹군을 다 사면 되는 거죠?\n메모리, 차, 로봇, 포털 전부'),
        (2,'C','speech','주본질: 원칙 6이야')],
 "p28":[(1,'C','speech','주본질: 동맹군은 대부분 영주와 기사야\n가볍게 들고, 썰물이면 카테고리째 내린다\n고릴라와 같은 무게로 들면 안 돼'),
        (2,'C','think','나배움: 동맹에 들었다고 고릴라가 되는 건 아니다')],
 "p29":[(1,'C','speech','주본질: 그런데 하나 남았어\n한 시장에 고릴라가 둘일 수 있을까?'),
        (2,'C','think','나배움: 교과서는 하나라고 했는데…')],
 "p30":[(1,'C','narr','빈 방에 의자 두 개가 나란히 남아 있었다')],
 "p31":[(1,'C','caption','Episode 27 끝 · 다음 화 · 한 시장에 고릴라가 둘: 과점의 예외\n(결제망 · 메모리 · 클라우드, 그리고 원칙 9)')],
}

BANDS = {
 "p03":'AI 70년 타임라인 · 1956 탄생 → AI 겨울(30년 캐즘) → 2012 부활 → 2016 알파고 → 2022 챗GPT · 한 카테고리의 기술수용주기가 70년일 수 있다',
 "p08":'캐즘은 30년도 간다 · 캐즘 위치는 바구니 관찰이지 매수가 아니다(18화)',
 "p11":'표준 동맹의 교체 · 40년 PC 동맹(운영체제 + CPU) → 새 동맹의 움직임(운영체제 + GPU) · 바뀐 것이 아니라 지켜볼 일',
 "p16":'전쟁의 양상 · 독자(수직통합) vs 동맹(분업) · 폰·차·AI가 같은 전쟁을 반복한다 · 둘 다 완전완비제품이 목적',
 "p23":'동맹 결성의 현장 · 빠진 조각 셋 = 메모리 · 피지컬 AI(차·로봇) · 클라우드·데이터 · 혼자 다 못 가진 고릴라가 동맹으로 완전완비제품을 완성한다',
 "p28":'원칙 6 · 동맹군은 대부분 영주와 기사 · 가볍게 보유, 썰물이면 카테고리 전체 매도',
}

NOTES = {
 "p03":'해설: 1956년 다트머스 여름 워크숍에서 "인공지능(Artificial Intelligence)"이라는 용어가 처음 쓰였다. 1970~90년대 두 차례의 "AI 겨울"(연구비·기대의 급감), 2012년 이미지넷 대회에서 딥러닝(AlexNet)의 압승, 2016년 알파고의 바둑 승리, 2022년 11월 챗GPT 공개가 다섯 점이다. 연표는 통상적 AI 역사 서술을 따른다',
 "p06":'해설: 챗GPT는 공개 두 달 만에 월간 사용자 1억 명에 이르렀다(2023-01, UBS 추정). 2화의 프레임(왓슨 = 크랙, 알파고 = 초기시장, 챗GPT = 캐즘 돌파)을 70년 축 위에 다시 놓은 것이다',
 "p11":'사실 확인: 2025년 9월 NVIDIA는 인텔에 50억 달러를 투자하고 PC용 x86 + RTX GPU 칩렛 SoC와 데이터센터용 커스텀 x86 CPU를 공동 개발하기로 발표했다. 2026년 10월 현재 그 공동 칩은 출시되지 않았고, NVIDIA의 Arm 기반 PC 칩(RTX Spark)을 넣은 노트북이 2026년 10월 출시된다. "윈비디아(Windows + NVIDIA)"는 한국 언론이 "윈텔(Windows + Intel)"에 빗대 붙인 조어이며 공식 용어가 아니다. 인텔은 2026년 2분기 매출이 전년 대비 25% 늘며 회복을 시도 중이다(2026-10 기준, 작화 시 갱신). 검토자 의견(김선일)대로 NVIDIA의 본류는 PC가 아니라 서버·AI 데이터센터이며, 본 만화는 이를 "움직임이 보이는 중, 지켜볼 일"로 서술한다',
 "p16":'해설: "독자(수직통합) vs 동맹(분업)" 프레임은 『마케팅 전쟁』·『포지셔닝』(Al Ries & Jack Trout)의 진영 관점을 v4 기획서가 폰·자동차·AI에 적용한 것이다. 수직통합은 한 회사가 완전완비제품을 혼자 완성하고, 동맹은 층층이 나눠 채운다(24화 PATH2)',
 "p21":'사실 확인: NVIDIA CEO는 2025년 10월 31일 APEC 경주 CEO 서밋에서 블랙웰 GPU 26만 장의 한국 공급(삼성·SK·현대차 각 5만, 네이버클라우드 6만, 정부 5만)과 AI 팩토리 구축을 발표했고, 2026년 6월 5~8일 다시 방한해 SK(GW급 AI 팩토리), 삼성(HBM4 공급·파운드리), 현대차(새만금 AI·로봇 허브 검토), LG·두산(로봇), 네이버(AI 팩토리 확장)와 협력을 논의했다(2026-10 기준). 만난 사실과 협력 분야는 공식 발표이며 일부 적용 범위는 전망이다. 본 만화는 실존 인물을 그리지 않는다',
 "p24":'해설: 피지컬 AI(Physical AI)는 로봇·자율주행차처럼 물리 세계에서 움직이는 기계에 AI를 넣는 분야를 가리키는 업계 용어다. HBM은 고대역폭 메모리(High Bandwidth Memory), AI 팩토리는 AI 학습·추론 전용 데이터센터를 뜻한다',
 "p28":'해설: Moore 원칙 6 원문: "Hold kings and princes lightly, selling individual stocks on a marketplace stumble and the category upon deceleration of hypergrowth." 동맹에 참여한 회사 대부분은 개방형 시장의 영주·기사이며(17화), 고릴라와 같은 무게로 보유하지 않는다. 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
