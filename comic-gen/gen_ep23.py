#!/usr/bin/env python3
# 고릴라 헌터스 Ep23 "고릴라의 뼈대 ③ 수확체증과 네트워크 효과" — 시즌 3 (31p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep23 · Moore 3번 기준(Increasing Returns / Network Effects) · Ep7 떼거리 심리·Ep16 "표준이 표준을 강화한다" 회수
# 연결: Ep18 FOURCARD 3행 채움 → Ep24 완전완비제품(4행) → Ep24 SCORE4
# usage: python3 gen_ep23.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP23"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep23")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP23 NOTE: every diagram is a clean hand-drawn whiteboard sketch with EXACTLY the labels listed; loops are drawn as three nodes joined by curved clockwise arrows. "
               "Everyday-example icons (a chat bubble, a payment card terminal, a storefront of app tiles) are GENERIC with NO brand logos and NO readable text. "
               "Company names never appear except where a label is explicitly specified. NA BAE-UM's notebook is a plain kraft-cover notebook.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; "
           "JU BON-JIL (grey hair, navy knit) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

Q3 = "the single hand-written question line '사용자가 늘수록 가치가 비선형으로 커지는가'"
RET2 = ("a hand-drawn two-column contrast: LEFT a small factory icon under the header '공장 · 수확체감' with two short lines beneath exactly '직원 2배' and '매출 1.5배'; "
        "RIGHT a jungle-tree icon under the header '정글 · 수확체증' with two short lines beneath exactly '사용자 2배' and '가치 4배'; ONLY these six labels")
PHONES = ("a hand-drawn row of three tiny sketches: two phone icons joined by one line, four phone icons joined by six lines, ten phone icons joined by a dense web of lines; "
          "beneath them three small numbers exactly '1', '6', '45'; nothing else written")
LOOP3 = ("a hand-drawn circular loop of three nodes joined by three curved clockwise arrows, the nodes labeled exactly '크리에이터', '시청자', '광고주', "
         "and one small caption inside the loop exactly '다시 크리에이터'; no other text")
LOOPC = ("a hand-drawn circular loop of three nodes joined by three curved clockwise arrows, the nodes labeled exactly '개발자', '도구·논문', '더 많은 개발자'; "
         "a small chip icon at the center of the loop; no other text")
FAD = ("a hand-drawn small chart: a line that shoots up steeply and then falls back down just as fast, with ONE label under it exactly '한 시즌 유행'; nothing else")
COMBO = ("a hand-drawn card titled '셋이 함께 있을 때' with three stacked blocks labeled exactly '① 독점 아키텍처', '② 전환비용', '③ 네트워크 효과' "
         "and a single arrow from the stack to a small gorilla sketch labeled '고릴라'; nothing else")
MEAS3 = ("a hand-drawn card titled '측정법 셋' with three numbered lines exactly: '① 참여자 수보다 가치가 빨리 느는가' / '② 공급자와 사용자가 둘 다 느는가' / '③ 한 명 더 받는 비용이 0에 가까운가'")
LINEAR2 = ("a hand-drawn two-chart comparison: LEFT a small chart headed '가상 종목 A' with a straight rising line; RIGHT a small chart headed '가상 종목 B' with a curve that bends upward ever more steeply; "
           "under both charts the axis word '참여자' along the bottom and '가치' along the side; ONLY these labels")
FOURCARD_2 = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → 떠나려면 더 든다' / '네트워크 효과 → ?' / '완전완비제품 → ?'; "
              "the first two rows ticked in green, the last two rows still question marks")
FOURCARD_3 = ("a hand-drawn four-row card titled '고릴라 4기준' with rows exactly: '자체 아키텍처 → 규격을 내가 쥔다' / '전환비용 → 떠나려면 더 든다' / '네트워크 효과 → 늘수록 가치가 커진다' / '완전완비제품 → ?'; "
              "the first three rows ticked in green, the fourth row still a question mark")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a huge snowball rolling down a long snowy slope, growing as it goes, tiny human figures far below looking up, early morning light; NO whiteboard, NO study room, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM (late-30s, plain black hair, no glasses, charcoal shirt) asking JU BON-JIL, two fingers raised as if counting two walls; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL smiling, making a fist like an engine piston.",
 "p03":f"Two panels. (1 ~55%) JU BON-JIL writing ONLY {Q3} on the whiteboard; the rest of the board BLANK. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p04":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows ONLY {Q3}; the TALC five at the table listening. (2 ~45%) JU BON-JIL drawing two tiny arrows on the board corner, one straight and one curving upward, with no words.",
 "p05":f"One panel (~100%). The whiteboard shows {RET2}; JU BON-JIL stands fully to the side pointing at the LEFT factory column; ONLY these six labels.",
 "p06":f"Two panels. (1 ~55%) SHIN JUNG-HAE (50s woman, brown cardigan) asking doubtfully, her balloon tail pointing at HER, beside the whiteboard which shows {RET2}. (2 ~45%) JU BON-JIL answering warmly, pointing at the RIGHT jungle column of the same board ({RET2}).",
 "p07":f"Two panels. (1 ~55%) JU BON-JIL drawing ONLY {PHONES} on a clean part of the board. (2 ~45%) NA BAE-UM counting on his fingers, eyes wide; plain background.",
 "p08":"Two panels. (1 ~55%) HAN TANG-SU (red cap) asking eagerly, phone (screen OFF) in hand; the whiteboard behind is out of focus with no readable text. (2 ~45%) JU BON-JIL raising a finger with a 'not yet'.",
 "p09":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '수확체감 = 공장, 둘이면 둘보다 적다' / '수확체증 = 정글, 둘이면 넷'.",
 "p10":f"One panel (~100%). The whiteboard shows {LOOP3}; JU BON-JIL stands fully to the side tracing the arrows with his marker held away from the labels; ONLY these labels.",
 "p11":f"Two panels. (1 ~55%) CHOI SIN-SANG (20s, headphones around neck, gadget vest) speaking from the table with a grin, his balloon tail pointing at HIM; the whiteboard behind shows {LOOP3}. (2 ~45%) JU BON-JIL nodding, tapping the first arrow of the loop on the same board ({LOOP3}).",
 "p12":f"Two panels. (1 ~55%) GO BI-JEON (40s, navy suit, tablet under arm) speaking, his balloon tail pointing at HIM; beside him the whiteboard shows {LOOP3}. (2 ~45%) close on JU BON-JIL's face, firm.",
 "p13":"Two panels. (1 ~55%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '양의 피드백 루프' / '한 바퀴마다 다음 바퀴가 쉬워진다'. (2 ~45%) NA BAE-UM's face, absorbed; plain background.",
 "p14":f"One panel (~100%). The whiteboard shows {LOOPC}; JU BON-JIL stands fully to the side; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) a flashback inset {INK}recalling Ep7: a long line of anonymous office workers in neat shirts queueing patiently toward a single counter, the line growing as more join at the back, NO readable text, NONE of the cast inside the inset. (2 ~45%) JU BON-JIL in the study room explaining beside the whiteboard which shows {LOOPC}.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the line '표준이 표준을 강화한다' on a clean part of the board, nothing else written. (2 ~45%) NA BAE-UM nodding slowly, recognizing the line from Ep16.",
 "p17":"One panel (~100%). Close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt), chin on his hand, looking at the board off-frame; JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM; plain background with no readable text.",
 "p18":"Three small panels stacked (each ~33%), everyday examples with GENERIC icons and NO logos or readable text: (1) a plain chat app screen with gray bubbles and a group of friends laughing at a cafe; (2) a card terminal at a shop counter with a customer tapping a plain card; (3) a storefront wall of blank app tiles with people browsing. In each panel ONE narration box as specified; NO brand marks anywhere.",
 "p19":"Two panels. (1 ~55%) AN MID-EO (50s, stern brow) holding up his old FLIP PHONE proudly, his balloon tail pointing at HIM; the whole group turning to him. (2 ~45%) the whole group bursting into laughter, HAN TANG-SU slapping the table; the whiteboard behind is completely BLANK.",
 "p20":"Two panels. (1 ~55%) JU BON-JIL pointing at AN MID-EO with an affectionate smile. (2 ~45%) AN MID-EO, flip phone clutched to his chest, stubborn and dignified.",
 "p21":"Two panels. (1 ~55%) SHIN JUNG-HAE (brown cardigan) speaking shyly, her balloon tail pointing at HER; her plain smartphone on the table with a DARK screen. (2 ~45%) JU BON-JIL spreading his hands as if to say 'exactly'.",
 "p22":f"Two panels. (1 ~55%) JU BON-JIL drawing ONLY {FAD} on the board, face serious. (2 ~45%) HAN TANG-SU wincing as if remembering a lost app, phone (screen OFF) in hand.",
 "p23":f"One panel (~100%). The whiteboard shows {COMBO}; JU BON-JIL stands fully to the side with the marker held away; ONLY these labels.",
 "p24":f"One panel (~100%). The whiteboard shows {MEAS3}; JU BON-JIL stands fully to the side; NA BAE-UM copying at the table; ONLY these labels.",
 "p25":f"Two panels. (1 ~55%) HAN SIL-SOK (40s, black hair, thin glasses, knit vest) speaking from the table with a practical gesture, his balloon tail pointing at HIM; the whiteboard behind shows {MEAS3}. (2 ~45%) JU BON-JIL nodding to him.",
 "p26":f"One panel (~100%). {LOCK_NB}The whiteboard shows {LINEAR2}; NA BAE-UM points at the RIGHT chart; JU BON-JIL seated, watching; ONLY these labels.",
 "p27":f"One panel (~100%). The whiteboard shows {FOURCARD_3}; JU BON-JIL stands fully to the side, having just ticked the third row; ONLY these labels.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '엔진은 사람이 사람을 부르는 것' / '성벽 없는 엔진은 한 시즌'.",
 "p29":"Two panels. (1 ~55%) HAN TANG-SU asking, hopeful; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL at the door turning back with a grin, holding up four fingers.",
 "p30":f"Two panels, quiet beat, {INK}(1 ~60%) evening study room, NA BAE-UM alone looking at the whiteboard which shows ONLY {FOURCARD_3}; the others' chairs empty. (2 ~40%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p31":f"One panel (~100%). Closing chapter-end, {INK}a gorilla skeleton silhouette with three bones glowing gold and the fourth still faint, against a dawn sky; NA BAE-UM and JU BON-JIL small figures walking away; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 23\n고릴라의 뼈대 ③ 수확체증과 네트워크 효과\n정글의 엔진\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','나배움: 성벽 두 개는 알겠어요\n그런데 성벽만으로 1등이 압도적이 되진 않잖아요'),
        (2,'C','speech','주본질: 맞아, 지금까지는 수비였어\n오늘은 엔진이야, 공격')],
 "p03":[(1,'C','label','사용자가 늘수록 가치가 비선형으로 커지는가'),
        (1,'C','speech','주본질: 세 번째 질문\n사용자가 늘수록 가치가 비선형으로 커지는가'),
        (2,'C','think','나배움: 비선형이 뭐지\n두 배가 두 배가 아니라는 건가')],
 "p04":[(1,'C','speech','주본질: 선형은 둘이면 둘, 비선형은 둘이면 넷\n고릴라의 엔진은 이 뒤에 숨어 있어'),
        (2,'C','narr','수확체증, 사용자가 늘수록 가치가 더 빨리 느는 것')],
 "p05":[(1,'C','label','공장 · 수확체감'),(1,'C','label','정글 · 수확체증'),
        (1,'C','speech','주본질: 공장은 직원이 둘이 되면 매출이 둘이 안 돼\n기계도 땅도 같이 늘려야 하니까')],
 "p06":[(1,'C','speech','신중해: 사용자가 둘이면 가치가 넷이라니\n그게 정말 가능해요?'),
        (2,'C','speech','주본질: 사람이 사람을 부르니까요\n새로 온 사람이 이미 있던 사람에게도 가치를 더해요')],
 "p07":[(1,'C','speech','주본질: 전화기가 둘이면 선은 하나\n넷이면 여섯, 열이면 마흔다섯'),
        (2,'C','think','나배움: 전화기는 다섯 배인데 선은 마흔다섯 배')],
 "p08":[(1,'C','speech','한탕수: 그럼 사람 많은 데가 무조건 이기는 거네요?'),
        (2,'C','speech','주본질: 엔진은 맞는데 성벽이 같이 있어야 해\n그 얘긴 조금 뒤에')],
 "p09":[(1,'C','speech','주본질: 두 줄만 적어 둬'),
        (2,'C','narr','두 줄')],
 "p10":[(1,'C','label','크리에이터'),(1,'C','label','시청자'),(1,'C','label','광고주'),
        (1,'C','speech','주본질: 동영상 플랫폼을 봐\n만드는 사람이 늘면 보는 사람이 늘고\n보는 사람이 늘면 광고주가 오고, 또 만드는 사람이 와')],
 "p11":[(1,'C','speech','최신상: 제가 영상 올리는 이유가 그거예요\n사람이 거기 다 있으니까요'),
        (2,'C','speech','주본질: 그게 루프의 첫 바퀴야\n한 바퀴 돌 때마다 다음 바퀴가 쉬워져')],
 "p12":[(1,'C','speech','고비전: 그래서 2등 플랫폼이 아무리 돈을 써도\n못 따라오는 거군요'),
        (2,'C','speech','주본질: 돈으로 사람을 못 사\n사람이 사람을 사지')],
 "p13":[(1,'C','narr','두 줄'),
        (2,'C','think','나배움: 바퀴가 돌수록 가벼워지는 수레')],
 "p14":[(1,'C','label','개발자'),(1,'C','label','도구·논문'),(1,'C','label','더 많은 개발자'),
        (1,'C','speech','주본질: 16화의 그 연구실로 돌아가 보자\n개발자가 늘면 도구와 논문이 늘고\n도구가 늘면 더 많은 개발자가 와')],
 "p15":[(1,'C','narr','7화의 떼거리 심리가 여기서 완성된다'),
        (2,'C','speech','주본질: 실용주의자는 무리와 함께 가지\n무리가 커질수록 무리에 드는 가치도 커져')],
 "p16":[(1,'C','label','표준이 표준을 강화한다'),
        (1,'C','speech','주본질: 16화에서 한 줄로 끝낸 말이야\n오늘은 그 엔진의 설계도를 본 거지'),
        (2,'C','think','나배움: 그때는 외웠고 지금은 보인다')],
 "p17":[(1,'C','think','나배움: 성벽이 사람을 가두고\n엔진이 사람을 부른다')],
 "p18":[(1,'C','narr','메신저, 친구가 다 쓰니까 나도'),
        (2,'C','narr','결제망, 받는 가게가 많으니까 쓰고, 쓰는 사람이 많으니까 받는다'),
        (3,'C','narr','앱 장터, 앱이 많으니까 사람이 오고, 사람이 오니까 앱이 온다')],
 "p19":[(1,'C','speech','안믿어: 나는 폴더폰인데'),
        (2,'C','narr','모두가 웃었다')],
 "p20":[(1,'C','speech','주본질: 그래서 당신이 회의론자예요\n네트워크 밖에 서 있는 마지막 사람'),
        (2,'C','speech','안믿어: 마지막까지 서 있을 거요')],
 "p21":[(1,'C','speech','신중해: 나도 메신저는 딸이 깔아 줘서 쓰는 거예요'),
        (2,'C','speech','주본질: 그게 바로 사람이 사람을 부른다는 거예요')],
 "p22":[(1,'C','label','한 시즌 유행'),
        (1,'C','speech','주본질: 그런데 엔진만 있고 성벽이 없으면\n한 시즌 유행으로 끝나\n한 번 탭하면 다들 옮겨 가니까'),
        (2,'C','think','한탕수: 작년에 다 같이 깔았다가 다 같이 지운 그 앱')],
 "p23":[(1,'C','label','셋이 함께 있을 때'),(1,'C','label','① 독점 아키텍처'),(1,'C','label','② 전환비용'),(1,'C','label','③ 네트워크 효과'),(1,'C','label','고릴라'),
        (1,'C','speech','주본질: 셋이 함께 있을 때만 고릴라야\n규격을 쥐고, 못 떠나게 하고, 사람이 사람을 부르고')],
 "p24":[(1,'C','label','측정법 셋'),(1,'C','label','① 참여자 수보다 가치가 빨리 느는가'),(1,'C','label','② 공급자와 사용자가 둘 다 느는가'),(1,'C','label','③ 한 명 더 받는 비용이 0에 가까운가'),
        (1,'C','speech','주본질: 숫자로 확인하는 법도 셋이야\n감으로 말고 표로 봐')],
 "p25":[(1,'C','speech','한실속: 세 번째가 제일 와닿아요\n저희 공장은 손님 한 명 더 받으려면 라인을 늘려야 하거든요'),
        (2,'C','speech','주본질: 그래서 공장은 수확체감이에요\n정글은 한 명 더 받는 데 돈이 거의 안 들죠')],
 "p26":[(1,'C','label','가상 종목 A'),(1,'C','label','가상 종목 B'),
        (1,'C','speech','나배움: A는 참여자가 늘어도 가치가 같은 비율로만 늘어요\nB는 뒤로 갈수록 가파르죠\nB가 비선형이에요')],
 "p27":[(1,'C','label','고릴라 4기준'),(1,'C','label','자체 아키텍처 → 규격을 내가 쥔다'),(1,'C','label','전환비용 → 떠나려면 더 든다'),(1,'C','label','네트워크 효과 → 늘수록 가치가 커진다'),(1,'C','label','완전완비제품 → ?'),
        (1,'C','speech','주본질: 세 번째 행을 채운다\n네트워크 효과, 늘수록 가치가 커진다')],
 "p28":[(1,'C','speech','주본질: 오늘도 두 줄'),
        (2,'C','narr','두 줄을 적었다')],
 "p29":[(1,'C','speech','한탕수: 그럼 셋 다 있으면 끝이에요?'),
        (2,'C','speech','주본질: 뼈대 셋이 모여도 살이 붙어야 걷지\n다음 시간은 살, 완전완비제품과 생태계')],
 "p30":[(1,'C','narr','뼈대 셋이 섰다'),
        (2,'C','think','나배움: 넷째 행이 비어 있다')],
 "p31":[(1,'C','caption','Episode 23 끝 · 다음 화 · 고릴라의 뼈대 ④ 완전완비제품과 생태계\n(5단 케이크, 수직통합과 동맹, 4기준 종합 채점)')],
}

BANDS = {
 "p05":'수확체감(공장) vs 수확체증(정글) · 정글에서는 사용자가 늘수록 가치가 더 빨리 는다',
 "p10":'네트워크 효과 · 만드는 사람 → 보는 사람 → 광고주 → 다시 만드는 사람 · 양의 피드백 루프',
 "p14":'개발자 루프 · 개발자 → 도구·논문 → 더 많은 개발자 · 표준이 표준을 강화한다(16화)',
 "p23":'독점 아키텍처 + 전환비용 + 네트워크 효과 · 셋이 함께 있을 때만 고릴라 · 성벽 없는 엔진은 한 시즌 유행',
 "p24":'측정법 셋 · 참여자보다 가치가 빨리 느는가 · 양쪽이 다 느는가 · 한 명 더 받는 비용이 0에 가까운가',
 "p27":'고릴라 4기준 3행 · 네트워크 효과 → 늘수록 가치가 커진다 · 남은 행은 완전완비제품',
}

NOTES = {
 "p04":'해설: Moore의 고릴라 판별 3번 기준은 수확체증(increasing returns)과 네트워크 효과다. 원문 취지: "사용자가 늘수록 제품의 가치가 비선형으로 커지는가". 수확체증 경제학은 브라이언 아서(W. Brian Arthur)가 1990년대에 정리한 개념으로, 하이테크 산업에서 1등의 격차가 전통 산업보다 훨씬 커지는 이유를 설명한다',
 "p06":'해설: 수확체감(diminishing returns)은 투입을 늘릴수록 추가로 얻는 산출이 줄어드는 현상이다. 공장·항공·정유처럼 설비와 땅이 함께 늘어야 하는 산업이 대표적이며, 그래서 1등과 2등의 점유율 차이가 작다. 전화기 n대의 연결 가능 수는 n(n-1)/2로, 2대 1개, 4대 6개, 10대 45개다',
 "p10":'해설: 네트워크 효과는 사용자가 늘수록 기존 사용자에게도 가치가 커지는 현상이다. 동영상 플랫폼처럼 공급자(크리에이터)와 수요자(시청자)가 서로를 끌어들이는 구조를 양면 시장(two-sided market)이라 한다. 특정 플랫폼의 이름은 본 만화에서 생략했다',
 "p14":'해설: CUDA 개발자 생태계는 16화의 "표준이 표준을 강화한다"의 실체다. NVIDIA는 CUDA 개발자 수를 수백만 명 규모로 밝혀 왔으며, 경쟁 소프트웨어 스택(ROCm 등)이 2026년에 주요 추론 프레임워크 지원을 넓혔지만 학습·연구 생태계는 여전히 CUDA 우위다(2026-10 기준, 작화 시 갱신)',
 "p22":'해설: 네트워크 효과만 있고 전환비용이 없는 소비자 앱은 한 시즌 유행으로 끝나기 쉽다. 사용자가 한 번의 탭으로 통째로 옮겨 가기 때문이다. 특정 앱 이름은 생략했으며, 3번 기준은 1번(독점 아키텍처)·2번(전환비용)과 함께 있을 때만 고릴라의 힘이 된다',
 "p26":'해설: 가상 종목 A·B는 설명을 위한 예시이며 실존 기업과 무관하다. 참여자 수 대비 가치(매출·거래량)의 곡선이 직선이면 선형, 뒤로 갈수록 가팔라지면 비선형(수확체증)으로 본다. 본 만화는 특정 종목의 매수·매도를 권하지 않는다',
}

if __name__ == "__main__": run(globals())
