#!/usr/bin/env python3
# 고릴라 헌터스 Ep36 "매도의 기술: 이때만 판다" — 시즌 4 (32p, ④ 실전 · 고릴라 사냥꾼)
# 2026-10-04 작성. season4-plan.md Ep36 · Moore 원칙 4·6·7·10 + Ep13 EXIT 3신호 + Ep29 대체 위협 3단계 + Ep32 밸류에이션 함정을 매도 한 장(SELL5)으로 종합
# 김경윤 검토 반영: 원칙 10은 "뉴스를 무시"가 아니라 "뉴스에서 잡음을 무시". 한탕수 첫 규칙 매도(반면교사 졸업) · 나배움 첫 매도 결정(클럽 규칙 ⑤ 결정은 회의에서만)
# ※ 가상 종목만 사용(종목 K · RIDE 종목), 실존 인물·로고 금지. 역사 인셋(피처폰 시대)은 FLASHBACK RULE 적용(익명 인물·구형 폰만)
# usage: python3 gen_ep36.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP36"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep36")
STAGE = "④ 실전 · 고릴라 사냥꾼"

EXTRA_CHARS = ("EP36 NOTE: all stocks in this episode are FICTIONAL and appear only as the labels specified (e.g. '종목 K'); NEVER real tickers or logos. "
               "HAN TANG-SU's phone shows ONLY what is specified (a blurred flood of notification shapes, or a single red falling line); otherwise its screen is OFF. "
               "Memory insets of HAN TANG-SU's past are small soft-toned panels in the SAME inked webtoon style. "
               "The feature-phone era inset contains ONLY anonymous people of that era with old-style flip phones and candy-bar phones, NO brand marks, NO smartphones, NONE of the cast.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal shirt) "
           "and his speech balloon tail points at HIM; JU BON-JIL (grey hair, navy knit, glasses) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

SELL5 = ("a clean hand-drawn card titled '파는 이유는 다섯뿐' with FIVE short numbered Korean lines exactly: '① 고릴라는 대체 위협이 입증될 때만' / '② 영주와 기사는 흔들리면 개별, 썰물이면 카테고리' / "
         "'③ 고릴라 못 될 종목은 즉시' / '④ RIDE는 EXIT 신호에' / '⑤ 비싸다는 이유만으로는 팔지 않는다' (the fifth line in RED marker)")
SUB3 = ("a hand-drawn card titled '대체 위협 3단계' with three short lines exactly: '① 새 카테고리가 생겼나' / '② 실용주의자가 옮기기 시작했나' / '③ 옛 전환비용이 녹고 있나'; "
        "each of the three lines has a small lit lamp icon beside it")
EBB = ("a hand-drawn bar sketch titled '썰물' with four quarterly bars in a row labeled beneath '1분기', '2분기', '3분기', '4분기'; the first two bars tall, the third lower, the fourth lower still; "
       "a small red bracket over the last two bars with the label '두 분기 연속 둔화'; no numbers")
P7CARD = ("a hand-drawn card titled '원칙 7' with two short lines exactly: '고릴라 못 될 종목은 즉시 판다' / '가격은 보지 않는다'; a small scissors icon")
EXITCARD = ("a hand-drawn EXIT rule card with the letters 'EXIT' as a heading and three short Korean lines beneath, exactly: '매출이 예상을 크게 밑돈다' / '경쟁이나 규제 뉴스가 뜬다' / '거래량은 폭증, 가격은 하락'; a small exit-door icon; nothing else on the board")
EXITCARD_1 = ("a hand-drawn EXIT rule card with the letters 'EXIT' as a heading and three short Korean lines beneath, exactly: '매출이 예상을 크게 밑돈다' / '경쟁이나 규제 뉴스가 뜬다' / '거래량은 폭증, 가격은 하락'; a small exit-door icon; the FIRST line circled in red marker; nothing else on the board")
VAL2 = ("a hand-drawn contrast of two bars: LEFT a tall bar labeled '지금 · PER 높다', RIGHT a bar half as tall labeled '매출 두 배 뒤 · PER 절반'; a small arrow from left to right; no numbers")
NEWSF = ("a hand-drawn funnel-shaped sieve titled '뉴스의 체' with ONE question written across the sieve exactly '10대 원칙 중 하나를 건드리나?'; below the sieve two small bins labeled '예 → 남긴다' and '아니오 → 버린다'")
NEWSF_CARDS = ("a hand-drawn funnel-shaped sieve titled '뉴스의 체' with ONE question written across the sieve exactly '10대 원칙 중 하나를 건드리나?'; below the sieve two small bins labeled '예 → 남긴다' and '아니오 → 버린다'; "
               "three small paper cards lie in the '아니오 → 버린다' bin labeled 'CEO 발언', '한 분기 미스', '금리 뉴스'; ONE card lies in the '예 → 남긴다' bin labeled '경쟁 표준 채택'")
RULE5 = ("a small hand-drawn card with one line exactly '⑤ 결정은 회의에서만' and a small calendar icon")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a tall open doorway cut into a jungle wall, warm light pouring through it, and a human hunter silhouette standing calmly before it holding a kraft notebook, a gorilla silhouette resting peacefully on a hill behind; NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM confessing to JU BON-JIL, a little tense; the whole club at the long table; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL holding up five fingers with a reassuring smile.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the heading '파는 이유는 다섯뿐' on the whiteboard; nothing else on the board. (2 ~45%) HAN TANG-SU (red cap) groaning comically, hands on his cap.",
 "p04":f"One panel (~100%). The whiteboard shows {SELL5}; JU BON-JIL stands fully to the side so that no hand covers any label; ONLY these labels.",
 "p05":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {SELL5}; the group attentive. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p06":f"One panel (~100%). The whiteboard shows {SUB3}; JU BON-JIL to the side pointing at the three lit lamps; ONLY these labels.",
 "p07":f"One panel (~100%). The whiteboard shows {EBB}; JU BON-JIL to the side; ONLY these labels.",
 "p08":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {EBB}; HAN SIL-SOK (knit vest, glasses) nodding carefully. (2 ~45%) HAN SIL-SOK adding a practical remark, calm.",
 "p09":f"One panel (~100%). The whiteboard shows {P7CARD}; JU BON-JIL to the side; a small memory inset in the corner {INK}of HAN TANG-SU from Ep33 with a determined face, NO text in the inset; ONLY the card labels.",
 "p10":f"One panel (~100%). The whiteboard shows {EXITCARD}; JU BON-JIL to the side; ONLY these labels.",
 "p11":f"One panel (~100%). The whiteboard shows {VAL2}; JU BON-JIL to the side, tapping the right bar; ONLY these labels.",
 "p12":f"One panel (~100%). The whiteboard shows {NEWSF}; JU BON-JIL to the side; ONLY these labels.",
 "p13":"Two panels. (1 ~55%) HAN TANG-SU holding up his phone whose screen shows ONLY a blurred flood of notification shapes (no readable text), overwhelmed; the group amused. (2 ~45%) JU BON-JIL taking the phone gently and turning it face down on the table.",
 "p14":f"One panel (~100%). The whiteboard shows {NEWSF_CARDS}; JU BON-JIL standing fully to the side; ONLY these labels.",
 "p15":f"Two panels. (1 ~55%) JU BON-JIL explaining beside the whiteboard which shows {NEWSF_CARDS}; NA BAE-UM copying. (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '뉴스를 무시하라가 아니라' / '뉴스에서 잡음을 무시하라'.",
 "p16":f"Two panels, HAN TANG-SU's past as memory insets {INK}(no readable text). (1 ~50%) memory inset: HAN TANG-SU (same red cap, mustard hoodie) at a cafe table tapping his phone whose screen is OFF, a regretful face; draw NO balloon inside the inset itself (the narration box sits at the panel edge). (2 ~50%) HAN TANG-SU in the present at the study table, head down, embarrassed; the whiteboard behind is out of focus with no readable text.",
 "p17":"Two panels. (1 ~50%) memory inset: HAN TANG-SU in a dark room staring at his phone whose screen shows ONLY a single red falling line, no text, sweating. (2 ~50%) present: JU BON-JIL recounting the two failures kindly; HAN TANG-SU nodding, small.",
 "p18":f"One panel (~100%). The whiteboard shows {EXITCARD_1}; HAN TANG-SU (red cap, mustard hoodie) standing in front of it with the marker, having just circled the first line, serious; his speech balloon tail points at HIM; JU BON-JIL watches from the table; ONLY the card labels.",
 "p19":"Two panels. (1 ~55%) HAN TANG-SU putting his phone face down on the table after a single tap, exhaling; the phone screen is OFF. (2 ~45%) SHIN JUNG-HAE (cardigan) writing in the club log, warm smile.",
 "p20":"Two panels. (1 ~55%) JU BON-JIL putting a hand on HAN TANG-SU's shoulder. (2 ~45%) close on HAN TANG-SU's face, red cap pushed up, a mix of loss and relief.",
 "p21":f"One panel (~100%). {LOCK_NB}The whiteboard shows {EBB} with a small header card above it labeled '종목 K'; NA BAE-UM presenting, standing fully to the side; ONLY these labels.",
 "p22":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {EBB} with the small header card '종목 K'; the group listening. (2 ~45%) the whiteboard corner: {RULE5}; ONLY this label.",
 "p23":"Two panels. (1 ~55%) AN MID-EO (stern, flip phone raised like a gavel) objecting; NA BAE-UM (black hair, no glasses, charcoal shirt) answering steadily, the balloon tail pointing at NA BAE-UM; the whiteboard behind is out of focus with no readable text. (2 ~45%) close on AN MID-EO, grudgingly satisfied.",
 "p24":"Two panels. (1 ~55%) SHIN JUNG-HAE writing the objection and the decision into the club log; the others raising hands in a vote. (2 ~45%) JU BON-JIL, who did not vote, watching NA BAE-UM with quiet pride.",
 "p25":"Two panels. (1 ~55%) NA BAE-UM (black hair, no glasses, charcoal shirt) sitting back down, exhaling, his balloon tail pointing at him; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL answering from across the table.",
 "p26":f"One panel (~100%). A historical inset {INK}soft vintage tone: an anonymous middle-aged investor of the flip-phone era sitting proudly at a desk stacked with old flip phones and candy-bar phones, while through the window behind him anonymous young people on the street all hold flat touchscreen slabs; NO brand marks, NO readable text, NONE of the cast.",
 "p27":"Two panels. (1 ~55%) JU BON-JIL explaining, back in the study room, beside the whiteboard which is completely BLANK. (2 ~45%) close on JU BON-JIL's calm face.",
 "p28":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '파는 이유는 다섯뿐' / '입증을 기다리되 부정하지 않는다' / '원칙대로 판 매도는 후회가 없다'.",
 "p29":"Two panels. (1 ~55%) AN MID-EO holding up his old flip phone with a straight face; the whole club bursting into laughter. (2 ~45%) JU BON-JIL laughing too, wiping an eye.",
 "p30":"Two panels. (1 ~55%) at the door NA BAE-UM (black hair, no glasses, charcoal shirt) asks JU BON-JIL what comes next, the balloon tail pointing at NA BAE-UM; JU BON-JIL smiles; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL holding up four fingers at the doorway.",
 "p31":f"One panel (~100%). A quiet mood shot {INK}: the study room at night, the club log lying closed on the long table with a pen on it, a single lamp; the whiteboard is completely BLANK; NO readable text anywhere.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}four kraft notebooks laid in a row on a wooden desk under a window showing four seasons blended across the glass (spring blossoms to winter snow), NO people; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 36\n매도의 기술: 이때만 판다\n안 판다가 아니라 이때만 판다\n시즌 4 · 고릴라 사냥꾼')],
 "p02":[(1,'C','speech','나배움: 사는 법은 다 배웠는데요\n솔직히 파는 게 제일 무서워요'),
        (2,'C','speech','주본질: 그럴 만해\n그런데 파는 이유는 다섯 개뿐이야')],
 "p03":[(1,'C','label','파는 이유는 다섯뿐'),
        (2,'C','speech','한탕수: 저는 이유 없이도 백 번은 팔았는데요')],
 "p04":[(1,'C','label','파는 이유는 다섯뿐'),(1,'C','label','① 고릴라는 대체 위협이 입증될 때만'),(1,'C','label','② 영주와 기사는 흔들리면 개별, 썰물이면 카테고리'),
        (1,'C','label','③ 고릴라 못 될 종목은 즉시'),(1,'C','label','④ RIDE는 EXIT 신호에'),(1,'C','label','⑤ 비싸다는 이유만으로는 팔지 않는다')],
 "p05":[(1,'C','speech','주본질: 열 원칙 중 파는 쪽만 모아서 다시 줄 세운 거야\n다섯 중 어디에도 안 걸리면 안 판다\n그래서 안 판다가 아니라 이때만 판다'),
        (2,'C','think','나배움: 무서운 게 아니라 조건이 다섯 개였구나')],
 "p06":[(1,'C','label','대체 위협 3단계'),(1,'C','label','① 새 카테고리가 생겼나'),(1,'C','label','② 실용주의자가 옮기기 시작했나'),(1,'C','label','③ 옛 전환비용이 녹고 있나'),
        (1,'C','speech','주본질: 첫째, 고릴라는 29화의 세 등이 다 켜질 때만\n하나나 둘이면 관찰이지 매도가 아니야')],
 "p07":[(1,'C','label','썰물'),(1,'C','label','1분기'),(1,'C','label','2분기'),(1,'C','label','3분기'),(1,'C','label','4분기'),(1,'C','label','두 분기 연속 둔화')],
 "p08":[(1,'C','speech','주본질: 둘째, 영주와 기사는 원칙 6\n시장이 흔들리면 개별 종목을 팔고\n성장률이 두 분기 연속 꺾이면 썰물, 카테고리째 판다'),
        (2,'C','speech','한실속: 저희 업계는 썰물 신호가 분기 보고서에 먼저 찍혀요\n매출 증가율부터 둔해지죠')],
 "p09":[(1,'C','label','원칙 7'),(1,'C','label','고릴라 못 될 종목은 즉시 판다'),(1,'C','label','가격은 보지 않는다'),
        (1,'C','speech','주본질: 셋째, 33화에서 탕수가 한 그 매도\n고릴라가 될 수 없다는 판단만 보고 그날 판다')],
 "p10":[(1,'C','label','매출이 예상을 크게 밑돈다'),(1,'C','label','경쟁이나 규제 뉴스가 뜬다'),(1,'C','label','거래량은 폭증, 가격은 하락'),
        (1,'C','speech','주본질: 넷째, RIDE는 13화의 출구 세 개\n하나라도 켜지면 그날 내린다')],
 "p11":[(1,'C','label','지금 · PER 높다'),(1,'C','label','매출 두 배 뒤 · PER 절반'),
        (1,'C','speech','주본질: 그리고 다섯째, 비싸다는 이유만으로는 팔지 않는다\n토네이도 중이면 매출이 따라와서 비쌈은 뒤늦게 정당화돼\n32화의 그 그림이야')],
 "p12":[(1,'C','label','뉴스의 체'),(1,'C','label','10대 원칙 중 하나를 건드리나?'),(1,'C','label','예 → 남긴다'),(1,'C','label','아니오 → 버린다'),
        (1,'C','speech','주본질: 다섯 이유 밖에서 사람을 팔게 만드는 게 뉴스야\n그래서 체가 하나 필요해')],
 "p13":[(1,'C','speech','한탕수: 형, 오늘 알림만 사십 개예요\n이걸 어떻게 다 걸러요'),
        (2,'C','speech','주본질: 질문은 하나뿐이야\n열 원칙 중 하나를 건드리나')],
 "p14":[(1,'C','label','CEO 발언'),(1,'C','label','한 분기 미스'),(1,'C','label','금리 뉴스'),(1,'C','label','경쟁 표준 채택'),
        (1,'C','speech','주본질: 대표의 말 한마디, 한 분기 미스, 금리 뉴스는 버려\n경쟁 표준을 고객들이 채택했다는 소식만 남아')],
 "p15":[(1,'C','speech','주본질: 원칙 10은 뉴스를 무시하라가 아니야\n뉴스에서 잡음을 무시하라는 뜻이지\n남은 한 장이 29화의 세 등을 켜는지만 봐'),
        (2,'C','narr','두 줄')],
 "p16":[(1,'C','narr','탕수의 과거 하나, 비싸 보여서 판 날'),
        (2,'C','speech','한탕수: 그때 그 회사가 그 뒤로 세 배가 됐어요\n비싸다는 이유 하나로 팔았거든요')],
 "p17":[(1,'C','narr','과거 둘, 출구를 외면한 날'),
        (2,'C','speech','주본질: 둘 다 다섯 이유 밖에서 판 거고, 하나는 다섯 이유 안에서 안 판 거야\n오늘은 다르게 해 보자')],
 "p18":[(1,'C','label','매출이 예상을 크게 밑돈다'),(1,'C','label','경쟁이나 규제 뉴스가 뜬다'),(1,'C','label','거래량은 폭증, 가격은 하락'),
        (1,'C','speech','한탕수: 제 RIDE 종목, 어제 분기 매출이 예상을 크게 밑돌았어요\n첫째 등이 켜졌으니까 오늘 내립니다')],
 "p19":[(1,'C','narr','버튼 하나, 그리고 폰을 엎었다'),
        (2,'C','speech','신중해: 기록할게요\n탕수 씨의 첫 번째 규칙 매도')],
 "p20":[(1,'C','speech','주본질: 손절은 패배가 아니야\n다음 라운드 출전권이지'),
        (2,'C','think','한탕수: 처음으로 떨어지는 걸 보면서 안 떨었다')],
 "p21":[(1,'C','label','종목 K'),(1,'C','label','썰물'),(1,'C','label','두 분기 연속 둔화'),
        (1,'C','speech','나배움: 다음은 제 차례입니다\n제가 들고 있는 영주 종목, 성장률이 두 분기 연속 둔해졌어요')],
 "p22":[(1,'C','speech','나배움: 원칙 6, 썰물이면 카테고리째 판다\n그래서 오늘 회의에 매도 안건으로 올립니다'),
        (2,'C','label','⑤ 결정은 회의에서만')],
 "p23":[(1,'C','speech','안믿어: 한 분기 더 보면 어떻소\n두 분기면 우연일 수도 있지'),
        (1,'C','speech','나배움: 우연이면 다음 분기에 다시 사면 됩니다\n원칙은 두 분기라고 적혀 있고, 저는 원칙을 따르겠습니다'),
        (2,'C','narr','반론 담당이 고개를 끄덕였다')],
 "p24":[(1,'C','speech','신중해: 반론 기록, 그리고 표결\n매도 다섯, 보류 하나'),
        (2,'C','think','주본질: 내가 말 안 해도 되는 날이 왔구나')],
 "p25":[(1,'C','speech','나배움: 팔고 나니 이상하게 홀가분하네요\n무서울 줄 알았는데'),
        (2,'C','speech','주본질: 원칙대로 판 매도는 후회가 없어\n후회는 이유 없이 팔았을 때만 생기지')],
 "p26":[(1,'C','narr','옛날 어떤 투자자는 1등 폰 회사를 끝까지 들고 있었다\n창밖에선 모두가 새 기계를 쥐고 있었는데')],
 "p27":[(1,'C','speech','주본질: 그 사람은 입증을 기다린 게 아니라 부정한 거야\n세 등이 다 켜졌는데도 눈을 감았지'),
        (2,'C','speech','주본질: 기다리는 것과 부정하는 건 달라\n그 차이가 29화의 세 단계야')],
 "p28":[(1,'C','speech','주본질: 오늘도 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p29":[(1,'C','speech','안믿어: 참고로 나는 아직 폴더폰이오\n입증을 기다리는 중이지'),
        (2,'C','speech','주본질: 당신은 네트워크 밖의 마지막 사람이야\n그래서 소중해')],
 "p30":[(1,'C','speech','나배움: 찾고, 사고, 들고, 팔고\n이제 뭐가 남았어요?'),
        (2,'C','speech','주본질: 그걸 1년으로 돌려 보는 거야\n네 번의 분기 회의')],
 "p31":[(1,'C','narr','일지가 조용히 덮였다')],
 "p32":[(1,'C','caption','Episode 36 끝 · 다음 화 · 사냥 일지 1년: 네 번의 분기 회의\n(봄 서식지, 여름 심사표, 가을 충돌, 겨울 결산)')],
}

BANDS = {
 "p04":'파는 이유는 다섯뿐 · ① 대체 위협 입증 ② 영주·기사의 썰물 ③ 고릴라 못 될 종목 ④ RIDE의 EXIT ⑤ 비쌈만으로는 팔지 않는다',
 "p07":'원칙 6의 썰물 · 성장률이 두 분기 연속 둔화하면 카테고리째 판다 (본 만화의 보조 기준)',
 "p12":'뉴스의 체 · 10대 원칙 중 하나를 건드리나? · 예면 남기고 아니오면 버린다',
 "p15":'원칙 10 · 뉴스를 무시하라가 아니라 뉴스에서 잡음을 무시하라',
 "p20":'손절은 패배가 아니라 다음 라운드 출전권 · 한탕수의 첫 규칙 매도',
 "p25":'원칙대로 판 매도는 후회가 없다 · 결정은 회의에서만(클럽 규칙 ⑤)',
}

NOTES = {
 "p04":'해설: 다섯 가지 매도 이유는 Moore 10대 원칙 중 매도에 관한 원칙 4·6·7과 13화의 EXIT 3신호, 32화의 밸류에이션 함정을 매도 기준으로 다시 배열한 것이다. 원문: 원칙 4 "Hold gorilla stocks for the long term. Sell only on proven substitution threat." 원칙 6 "Hold kings and princes lightly, selling individual stocks on a marketplace stumble and the category upon deceleration of hypergrowth." 원칙 7 "Once it becomes clear a company will never become a gorilla, sell its stock."',
 "p06":'해설: 대체 위협 3단계(새 카테고리·실용주의자의 이동·옛 전환비용의 해체)는 29화에서 정리한 본 만화의 보조 체크다. Moore 원문은 "입증된 대체 위협(proven substitution threat)"만을 매도 조건으로 든다. 세 단계가 모두 켜졌을 때를 "입증"으로 본다',
 "p07":'해설: 원칙 6의 "초고성장 썰물(deceleration of hypergrowth)"을 본 만화는 "분기 매출 증가율이 두 분기 연속 둔화"라는 보조 기준으로 읽는다. Moore 원문에는 분기 수가 없으며, 클럽이 정한 운영 기준이다. 단일 분기의 둔화는 계절성·일회성일 수 있어 판단 근거로 삼지 않는다',
 "p11":'해설: "비싸다는 이유만으로 팔지 않는다"는 토네이도 진입이 확인된 고릴라 후보에 한정된 원칙이다. 토네이도가 끝났거나 대체 위협이 입증된 경우에는 적용되지 않는다. PER(주가수익비율)은 주가를 주당순이익으로 나눈 값으로, 매출과 이익이 두 배가 되면 같은 주가에서 절반이 된다(32화)',
 "p12":'해설: Moore 원칙 10 원문: "Most news has nothing to do with the gorilla game. Learn to ignore it." 검토자 의견을 반영해 "뉴스를 무시"가 아니라 "뉴스에서 잡음을 무시"로 풀었다. 남길 뉴스는 10대 원칙 중 하나를 건드리는 뉴스, 즉 대체 위협·카테고리 썰물·고릴라 자격 상실에 관한 소식뿐이다',
 "p16":'해설: 한탕수의 두 과거 장면과 RIDE 종목, 나배움의 "종목 K"는 모두 가상의 예시이며 특정 종목의 매수·매도를 권하지 않는다',
 "p22":'해설: 클럽 규칙 ⑤ "사고파는 결정은 분기 회의에서만"(20화). 매도 안건은 발표 → 반론 → 기록 → 표결의 순서로 다루며, 반론 담당의 이견은 결론과 함께 일지에 남긴다. 회의 밖에서 누른 버튼은 클럽 계좌가 아니다',
 "p26":'해설: 피처폰 시대의 1등이 스마트폰이라는 새 카테고리에 교체된 사례는 29화의 역사 인셋과 같은 창고 사례(v4 기획 "통신 3대")다. 특정 회사·인물을 가리키지 않는 재구성이며, 교훈은 "입증을 기다리는 것"과 "입증을 부정하는 것"의 차이다',
}

if __name__ == "__main__": run(globals())
