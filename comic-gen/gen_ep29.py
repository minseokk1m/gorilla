#!/usr/bin/env python3
# 고릴라 헌터스 Ep29 "왕좌의 균열: 고릴라는 언제 죽는가" — 시즌 3 (32p, ③ 심화)
# 2026-10-04 작성. season3-plan.md Ep29 · Moore 원칙 4(대체 위협 입증 시에만 매도) · Ep16 "균열" 복선 회수 · Ep9 PLC·카테고리 교체 · Ep27 옛 동맹 회상
# 팩트 근거: season34-facts.md A1(NVLink·ROCm) · A3(TPU 외부 공급) · A7(인텔 회복) · A12(중국 칩) · B12(SaaS포칼립스)
# ※ 실존 인물은 그리지 않고 실명은 해설에만. 회사명은 보드 라벨로만, 로고 금지. 옛 CPU 회사는 "쇠락" 단정 금지(2026 실적 반등)
# usage: python3 gen_ep29.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP29"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep29")
STAGE = "③ 심화 · 고릴라의 해부학"

EXTRA_CHARS = ("EP29 NOTE: the 'cracked throne' is a hand-drawn stone throne with a gorilla silhouette and a thin crack, used ONLY as a whiteboard sketch or cover motif. "
               "Flashback insets about the old feature-phone era show ONLY anonymous people in 2000s clothing with generic flip phones and one generic glass-slab phone, NO brand, NO logo, NO readable text. "
               "Company names appear ONLY as clean labels on the whiteboard; NEVER real logos, real product photos or real executives' faces.")

INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "
LOCK_NB = ("ABSOLUTE RULE: the presenter standing at the whiteboard holding the marker is NA BAE-UM (late-30s, plain BLACK hair, NO glasses, charcoal button shirt) and his speech balloon tail points at HIM; "
           "JU BON-JIL (grey hair, navy knit, glasses) sits at the table and does NOT present (a grey-haired man at the board would be WRONG). ")

SUB3 = ("a hand-drawn card titled '대체 위협 3단계' with three numbered lines exactly: '① 새 카테고리가 생겼나' / '② 실용주의자가 옮기기 시작했나' / '③ 옛 전환비용이 녹고 있나'")
SUB3V = (SUB3 + "; beneath the card two short verdict lines exactly: '셋 다 → 입증' and '하나 → 관찰'")
P4CARD = ("a hand-drawn card titled '원칙 4' with two short lines exactly: '고릴라는 길게 보유한다' / '대체 위협이 입증될 때만 판다'; a small padlock icon")
CRACK3 = ("three hand-drawn icons in a row with ONE label each: an arrow coming in from outside a castle wall labeled '외부 대체', a wall with a thin crack labeled '내부 균열', a small figure walking away from the wall labeled '동맹 이탈'; above them the heading '균열의 종류'")
NVHEAD = ("a hand-drawn SCORE TABLE titled '균열 후보 채점' with column headers across the top exactly '①', '②', '③', '결론' and four ROW LABELS down the left exactly '메모리 병목', '클라우드 자체 칩', 'TPU 외부 공급', '중국 자체 칩'")
NV1 = (NVHEAD + "; the FIRST row filled with 'X', 'X', 'X' and the conclusion '관찰'; the other three rows completely BLANK WHITE with nothing written")
NV2 = (NVHEAD + "; the FIRST row filled 'X', 'X', 'X', '관찰'; the SECOND row filled 'O', 'X', 'X', '관찰'; the remaining two rows completely BLANK WHITE")
NV3 = (NVHEAD + "; the FIRST row 'X', 'X', 'X', '관찰'; the SECOND row 'O', 'X', 'X', '관찰'; the THIRD row 'O', 'X', 'X', '관찰'; the LAST row completely BLANK WHITE")
NV4 = (NVHEAD + "; all four rows filled: FIRST 'X', 'X', 'X', '관찰'; SECOND 'O', 'X', 'X', '관찰'; THIRD 'O', 'X', 'X', '관찰'; FOURTH 'X', 'X', 'X', '관찰'; beneath the table one short line '입증 0 · 관찰 4'")
SAASCARD = ("a small hand-drawn card titled '소프트웨어 → 에이전트' with three lines exactly: '① O' / '② 관찰' / '③ 관찰'")
CPUCARD = ("a small hand-drawn card titled '옛 CPU 고릴라' with three lines exactly: '① O' / '② O' / '③ 관찰' and beneath it one short line '입증에 가장 가까운 관찰'")
ALLY2 = ("two hand-drawn alliance boxes side by side: LEFT labeled '40년 PC 동맹: 운영체제 + CPU', RIGHT labeled '새 동맹의 움직임: 운영체제 + GPU', between them a small question mark with the words '지켜볼 일'")
INVALID = ("two hand-drawn columns: LEFT headed '옛 카테고리' with four short rows each ending in a green 'O'; RIGHT headed '새 카테고리' with the SAME four rows each struck through in red and one word beside them '무효'; above both the heading '카테고리가 바뀌면'")

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} The ENTIRE page is ONE single illustration with NO panel borders and NO second scene: a massive stone throne in a dim jungle clearing with a thin bright crack running from its seat to the ground, a gorilla silhouette seated on it looking down at the crack, shafts of morning light; NO people, NO whiteboard, NO readable text anywhere in the illustration. The bottom third of the page is a clean dark band containing ONLY the title block below; nothing is drawn beneath the band.",
 "p02":"Two panels, study room. (1 ~55%) AN MID-EO (stern, flip phone in hand) repeating his question from last time, the group turning to him; the whiteboard behind is completely BLANK. (2 ~45%) JU BON-JIL shaking his head slowly with a faint smile.",
 "p03":"Two panels. (1 ~55%) JU BON-JIL writing ONLY the line '경쟁자가 아니라 카테고리에 진다' on the whiteboard; nothing else on the board. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p04":"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows ONLY the line '경쟁자가 아니라 카테고리에 진다' and a small hand-drawn stone throne with a thin crack (no words on the sketch); HAN TANG-SU (red cap) leaning in. (2 ~45%) HAN TANG-SU asking eagerly, phone (screen OFF) in hand.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL holding up a finger, patient; the whiteboard behind shows ONLY the line '경쟁자가 아니라 카테고리에 진다' and the cracked-throne sketch. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p06":f"One panel (~100%). A flashback inset {INK}soft muted tone: a bustling 2000s-era phone shop with rows of generic flip phones on a wall display and anonymous shoppers in 2000s clothing; one anonymous salesman proudly holding up a thin flip phone; NO brand, NO logo, NO readable text anywhere; NONE of the modern cast appears.",
 "p07":f"Two panels. (1 ~55%) flashback inset {INK}soft muted tone: a long queue of anonymous people in late-2000s clothing outside a plain glass storefront, each holding a generic glass-slab phone with a blank dark screen; in the corner a bargain bin of old flip phones with NO sign; NO brand, NO logo, NO readable text; NONE of the modern cast. (2 ~45%) back in the study room, JU BON-JIL explaining, the whiteboard behind completely BLANK.",
 "p08":f"One panel (~100%). The whiteboard shows {INVALID}; JU BON-JIL to the side so that no hand covers any label; ONLY these labels.",
 "p09":f"Two panels. (1 ~55%) SHIN JUNG-HAE (cardigan) asking gently; the whiteboard behind shows {INVALID}. (2 ~45%) JU BON-JIL answering with a calm gesture of building a wall on new ground (mime, no props).",
 "p10":f"One panel (~100%). The whiteboard shows {SUB3}; every line fully visible; JU BON-JIL to the side; ONLY these labels.",
 "p11":f"Two panels. (1 ~55%) JU BON-JIL pointing at line ① of the whiteboard which shows {SUB3}; a tiny inset in the corner of the panel recalls the Ep1 staircase sketch (a few rising steps, no words). (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p12":f"Two panels. (1 ~55%) JU BON-JIL pointing at line ② of the whiteboard which shows {SUB3}; HAN SIL-SOK nodding. (2 ~45%) JU BON-JIL pointing at line ③ of the same board ({SUB3}); a small melting-ice sketch beside line ③ with no words.",
 "p13":f"One panel (~100%). The whiteboard shows {SUB3V}; JU BON-JIL stepping back; NA BAE-UM copying; ONLY these labels.",
 "p14":f"Two panels. (1 ~55%) The whiteboard shows {P4CARD}; JU BON-JIL to the side; HAN TANG-SU raising his hand with a question. (2 ~45%) JU BON-JIL making a sieve gesture with both hands, dry smile; the whiteboard behind shows {P4CARD}.",
 "p15":f"One panel (~100%). The whiteboard shows {CRACK3}; JU BON-JIL to the side; ONLY these labels.",
 "p16":f"Two panels. (1 ~55%) JU BON-JIL beside the whiteboard which shows {CRACK3}, writing ONLY a small gorilla sketch in the corner (no words). (2 ~45%) JU BON-JIL handing the marker to NA BAE-UM, who stands up.",
 "p17":f"One panel (~100%). {LOCK_NB}The whiteboard shows {NV1}; NA BAE-UM standing fully to the side so that NO hand covers any label; ONLY these labels.",
 "p18":f"Two panels. (1 ~55%) {LOCK_NB}NA BAE-UM explaining beside the whiteboard which shows {NV2}; HAN SIL-SOK listening. (2 ~45%) close on the same table ({NV2}) as NA BAE-UM taps the second row.",
 "p19":f"One panel (~100%). {LOCK_NB}The whiteboard shows {NV3}; NA BAE-UM to the side; ONLY these labels.",
 "p20":f"Two panels. (1 ~60%) {LOCK_NB}NA BAE-UM finishing beside the whiteboard which shows {NV4}; the group attentive. (2 ~40%) JU BON-JIL (seated) nodding once, pleased; plain background.",
 "p21":f"Two panels. (1 ~55%) JU BON-JIL back at the whiteboard which shows ONLY {SAASCARD}; NA BAE-UM sitting down. (2 ~45%) close on the same card ({SAASCARD}).",
 "p22":f"Two panels. (1 ~55%) HAN SIL-SOK (40s, black hair, thin metal glasses, knit vest) speaking from the table, his balloon tail pointing at him; the whiteboard behind shows ONLY {SAASCARD}. (2 ~45%) JU BON-JIL pointing at line ② of the card ({SAASCARD}).",
 "p23":"Two panels. (1 ~55%) JU BON-JIL turning to HAN SIL-SOK with a warm, serious look, the group quiet; the whiteboard behind is out of focus with no readable text. (2 ~45%) close-up of HAN SIL-SOK ONLY (40s, black hair, thin metal glasses, knit vest); JU BON-JIL must NOT appear; the thought balloon belongs to HAN SIL-SOK.",
 "p24":f"One panel (~100%). The whiteboard shows {ALLY2}; JU BON-JIL to the side; ONLY these labels.",
 "p25":f"One panel (~100%). The whiteboard shows {ALLY2} and, beneath it, {CPUCARD}; JU BON-JIL pointing at the small card; ONLY these labels.",
 "p26":f"Two panels. (1 ~55%) JU BON-JIL firm, one hand raised in caution, beside the whiteboard which shows {ALLY2} and {CPUCARD}; AN MID-EO listening closely. (2 ~45%) JU BON-JIL closing the point, calm; the whiteboard behind shows ONLY {CPUCARD}.",
 "p27":"Two panels. (1 ~60%, over-the-shoulder) NA BAE-UM writing the summary; JU BON-JIL in the soft background; the whiteboard behind is completely BLANK (no writing of any kind). (2 ~40%) the notebook close-up: ONLY these hand-written lines: '경쟁자가 아니라 카테고리' / '세 단계가 다 켜질 때만' / '균열은 관찰, 입증은 매도'.",
 "p28":"Two panels. (1 ~55%) AN MID-EO leaning back with his flip phone, a rare satisfied look, the group laughing warmly; the whiteboard behind is completely BLANK. (2 ~45%) HAN TANG-SU grinning and pointing at AN MID-EO.",
 "p29":"Two panels. (1 ~55%) HAN TANG-SU asking about next time; JU BON-JIL amused. (2 ~45%) JU BON-JIL drawing ONLY a small pie sketch on the whiteboard corner with one very thin slice (no words).",
 "p30":"Two panels, quiet beat. (1 ~60%) HAN SIL-SOK (black hair, glasses, knit vest) looking at the small pie sketch on the whiteboard corner (one thin slice, no words), the others gathering their things. (2 ~40%) close-up of HAN SIL-SOK ONLY; JU BON-JIL must NOT appear; the thought balloon belongs to HAN SIL-SOK.",
 "p31":f"Two panels. (1 ~55%) at the door JU BON-JIL turns back with the final hook; the whiteboard behind shows ONLY the small pie sketch with one thin slice. (2 ~45%) a faint dreamy image {INK}a magnifying glass hovering over a pie chart with one thin slice, no readable text.",
 "p32":f"One panel (~100%). Closing chapter-end, {INK}the cracked throne far in the background now in soft dusk light, a desk with a notebook ahead; NA BAE-UM and JU BON-JIL small figures; the top of the page has NO band and NO text box; a solid BLACK caption band runs across the very BOTTOM edge of the page (bottom 10%), and THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE that bottom black band, centered; do NOT invent any other sentence anywhere.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 29\n왕좌의 균열: 고릴라는 언제 죽는가\n고릴라는 경쟁자가 아니라 카테고리에 진다\n시즌 3 · 고릴라의 해부학')],
 "p02":[(1,'C','speech','안믿어: 지난번에 내가 물었소\n네 기준을 다 통과하면 영원하오?'),
        (2,'C','speech','주본질: 아니\n그런데 지는 방식이 정해져 있어')],
 "p03":[(1,'C','label','경쟁자가 아니라 카테고리에 진다'),
        (1,'C','speech','주본질: 고릴라는 경쟁자에게 안 져\n카테고리가 바뀔 때 져'),
        (2,'C','think','나배움: 9화의 카테고리 교체가 여기로 오는구나')],
 "p04":[(1,'C','speech','주본질: 16화에서 균열이 있다고만 했지\n오늘은 그 균열이 언제 왕좌를 무너뜨리는지 본다'),
        (2,'C','speech','한탕수: 그럼 드디어 파는 법이에요?')],
 "p05":[(1,'C','speech','주본질: 파는 날의 기술은 다음 시즌에\n오늘은 그 전에, 신호를 읽는 법이야'),
        (2,'C','think','나배움: 경쟁자가 아니라 카테고리')],
 "p06":[(1,'C','narr','이십 년 전, 어느 휴대폰 회사가 세계 1등이었다\n더 얇게, 더 튼튼하게, 더 싸게 만들었다')],
 "p07":[(1,'C','narr','그런데 사람들이 줄을 선 건\n더 좋은 접는 전화가 아니었다'),
        (2,'C','speech','주본질: 더 좋은 피처폰을 만들었는데 졌어\n카테고리가 바뀌었거든')],
 "p08":[(1,'C','label','카테고리가 바뀌면'),(1,'C','label','옛 카테고리'),(1,'C','label','새 카테고리'),(1,'C','label','무효'),
        (1,'C','speech','주본질: 카테고리가 바뀌면 옛 고릴라의 4기준이 통째로 무효가 돼\n아키텍처도 전환비용도 새 판에서는 안 통해')],
 "p09":[(1,'C','speech','신중해: 그럼 1등이 더 열심히 해도 소용이 없어요?'),
        (2,'C','speech','주본질: 열심히의 문제가 아니야\n성벽을 다른 땅에 다시 지어야 하는 문제지')],
 "p10":[(1,'C','label','대체 위협 3단계'),(1,'C','label','① 새 카테고리가 생겼나'),(1,'C','label','② 실용주의자가 옮기기 시작했나'),(1,'C','label','③ 옛 전환비용이 녹고 있나'),
        (1,'C','speech','주본질: 그래서 세 가지를 묻는다')],
 "p11":[(1,'C','speech','주본질: 첫째, 새 카테고리가 생겼나\n1화의 계단에 불연속 혁신이 하나 더 올라왔나'),
        (2,'C','think','나배움: 말에서 기차로, 그 계단')],
 "p12":[(1,'C','speech','주본질: 둘째, 실용주의자가 옮기기 시작했나\n참조사례와 매출이 새 쪽으로 가고 있나'),
        (2,'C','speech','주본질: 셋째, 옛 전환비용이 녹고 있나\n옮긴 사례가 늘면 성벽이 녹는 거야')],
 "p13":[(1,'C','label','셋 다 → 입증'),(1,'C','label','하나 → 관찰'),
        (1,'C','speech','주본질: 셋 다 켜지면 입증, 하나면 관찰\n그리고 입증일 때만 판다')],
 "p14":[(1,'C','label','원칙 4'),(1,'C','label','고릴라는 길게 보유한다'),(1,'C','label','대체 위협이 입증될 때만 판다'),
        (1,'C','speech','한탕수: 그럼 뉴스에서 위협이라고 하면요?'),
        (2,'C','speech','주본질: 원칙 10이야, 체로 거른다\n세 단계 중 하나를 건드리는 뉴스만 남겨')],
 "p15":[(1,'C','label','균열의 종류'),(1,'C','label','외부 대체'),(1,'C','label','내부 균열'),(1,'C','label','동맹 이탈'),
        (1,'C','speech','주본질: 균열에도 종류가 있어\n밖에서 오는 것, 안에서 생기는 것, 동맹이 떠나는 것')],
 "p16":[(1,'C','speech','주본질: 16화의 그 고릴라를 다시 보자\n균열 후보가 넷이야'),
        (2,'C','speech','주본질: 채점은 네가 해')],
 "p17":[(1,'C','label','균열 후보 채점'),(1,'C','label','메모리 병목'),(1,'C','label','관찰'),
        (1,'C','speech','나배움: 첫째, 메모리 병목\n새 카테고리가 아니라 안의 균열이고, 한 관점입니다\n세 칸 다 아직이라 관찰')],
 "p18":[(1,'C','label','클라우드 자체 칩'),
        (1,'C','speech','나배움: 둘째, 클라우드 회사들의 자체 칩\n새 종류가 생긴 건 맞아요'),
        (2,'C','speech','나배움: 그런데 실용주의자가 옮겨 간 매출은 아직이에요\n관찰')],
 "p19":[(1,'C','label','TPU 외부 공급'),
        (1,'C','speech','나배움: 셋째, 구글의 TPU가 클라우드 밖으로 나가기 시작했어요\n빌려 쓰는 데까지는 사실, 직접 파는 건 아직\n옛 전환비용이 녹았다는 증거도 아직입니다')],
 "p20":[(1,'C','label','중국 자체 칩'),(1,'C','label','입증 0 · 관찰 4'),
        (1,'C','speech','나배움: 넷째, 중국의 자체 칩은 장비 격차 때문에 다른 정글이에요\n결론, 입증은 없고 관찰이 넷'),
        (2,'C','speech','주본질: 정확해')],
 "p21":[(1,'C','label','소프트웨어 → 에이전트'),
        (1,'C','speech','주본질: 25화의 복선 하나 더\n전통 소프트웨어 대 에이전트'),
        (2,'C','narr','① 켜짐, ② 관찰, ③ 관찰')],
 "p22":[(1,'C','speech','한실속: 저희 회사는 아직 둘 다 써요\n에이전트가 일을 다 하진 못해서요'),
        (2,'C','speech','주본질: 그게 ②가 관찰인 이유야\n실용주의자가 옮기면 그때 입증이지')],
 "p23":[(1,'C','speech','주본질: 당신이 옮기는 날이 신호야\n20화에서 말했지, 당신이 우리 참조사례라고'),
        (2,'C','think','한실속: 내가 신호라니')],
 "p24":[(1,'C','label','40년 PC 동맹: 운영체제 + CPU'),(1,'C','label','새 동맹의 움직임: 운영체제 + GPU'),(1,'C','label','지켜볼 일'),
        (1,'C','speech','주본질: 27화의 옛 동맹을 다시 보자\nPC의 왕좌가 AI 데이터센터로 무게를 옮겼지')],
 "p25":[(1,'C','label','옛 CPU 고릴라'),(1,'C','label','입증에 가장 가까운 관찰'),
        (1,'C','speech','주본질: ① 새 카테고리 켜짐, ② 실용주의자 이동 켜짐\n③ 전환비용은 아직 녹는 중\n입증에 가장 가까운 관찰이야')],
 "p26":[(1,'C','speech','주본질: 그런데 그 회사는 지금 회복을 시도 중이야\n숫자가 다시 올라왔어, 쇠락이라 단정하지 마'),
        (2,'C','speech','주본질: 그래서 원칙 4는 안 판다가 아니라 이때만 판다야\n파는 날의 기술은 다음 시즌에')],
 "p27":[(1,'C','speech','주본질: 오늘의 세 줄'),
        (2,'C','narr','세 줄을 적었다')],
 "p28":[(1,'C','speech','안믿어: 내 질문 하나가 한 화를 만들었군'),
        (2,'C','speech','한탕수: 형님이 오늘의 주인공이네요')],
 "p29":[(1,'C','speech','한탕수: 그럼 다음 시간은요?'),
        (2,'C','speech','주본질: 시즌 3의 마지막\nETF는 왜 고릴라만 담지 못하나')],
 "p30":[(1,'C','narr','조각이 하나 그려졌다'),
        (2,'C','think','한실속: 20화의 그 조각이다')],
 "p31":[(1,'C','speech','주본질: 실속 씨, 다음 시간은 당신 차례야\n그 조각을 당신이 직접 재 봐'),
        (2,'C','narr','돋보기가 조각 위에 멈췄다')],
 "p32":[(1,'C','caption','Episode 29 끝 · 다음 화 · ETF의 역설: 시즌 3 종합 시험\n(4기준으로 ETF를 전수 해부한다)')],
}

BANDS = {
 "p03":'고릴라는 경쟁자에게 지지 않는다 · 카테고리가 바뀔 때 진다 (9화 카테고리 교체 · 16화 균열)',
 "p08":'카테고리가 바뀌면 옛 고릴라의 4기준은 통째로 무효 · 성벽을 다른 땅에 다시 지어야 한다',
 "p13":'대체 위협 3단계 · ① 새 카테고리 ② 실용주의자 이동 ③ 옛 전환비용 용해 · 셋 다 켜지면 입증, 하나면 관찰',
 "p15":'균열의 종류 · 외부 대체(새 카테고리) · 내부 균열(병목·규제) · 동맹 이탈(협력사의 자체 칩)',
 "p20":'균열 후보 넷 · 입증 0 · 관찰 4 · 관찰은 매도 사유가 아니다, 분기 점검표 ④ 신호 칸에 적는다',
 "p26":'원칙 4 · 안 판다가 아니라 이때만 판다 · 입증에 가장 가까운 관찰도 아직 관찰이다',
}

NOTES = {
 "p02":'해설: Moore 원칙 4 원문: "Hold gorilla stocks for the long term. Sell only on proven substitution threat." 고릴라는 장기 보유하되, 대체 위협이 입증되었을 때에만 판다. 이 화는 "입증"을 어떻게 읽는지를 다룬다',
 "p06":'해설: 2000년대 피처폰 1위 기업이 스마트폰이라는 새 카테고리에 자리를 내준 사례는 v4 기획의 창고 사례(통신 3대: 아날로그 → 피처폰 → 스마트폰)를 재구성한 것이다. 특정 기업·제품을 그리지 않았으며, "더 좋은 옛 제품을 만들고도 카테고리 교체에 진다"는 구조만 가져왔다',
 "p10":'해설: "대체 위협 3단계"는 Moore 원문의 "입증된 대체 위협"을 읽기 위한 본 만화의 보조 체크이며 Moore 원전의 공식 도구는 아니다. ① 불연속 혁신(1화 계단) ② 실용주의자 이동(3화 판별표) ③ 전환비용 용해(22화 측정법)를 한 카드에 모은 것이다',
 "p17":'해설: "메모리 병목" 관점은 16화 해설과 같다(KAIST 김정호 교수: AI 연산의 병목은 GPU보다 메모리). 이는 새 카테고리가 아니라 고릴라 내부의 균열에 해당하며, 한 관점임을 전제로 "관찰"로 둔다',
 "p18":'사실 확인: 2026년 구글은 7세대 TPU(Ironwood)를 Anthropic에 5년간 5GW 규모로 공급하는 계약(최대 400억 달러 투자 포함, 2026-04-24)을 맺었고, Meta는 구글클라우드를 통해 TPU를 임대하는 계약(2026-02)을 체결했다. TPU를 클라우드 밖에서 직접 판매하는 것은 2026-10 기준 확정 보도가 없다. AMD는 2026-07 Helios 랙 시스템을 출시했고 ROCm 10.0(2026-09)으로 소프트웨어 격차를 좁히는 중이나, PyTorch·JAX 생태계는 여전히 CUDA 우위다(2026-10-04 기준, 작화 시 갱신)',
 "p20":'사실 확인: 중국 화웨이의 Ascend 950 계열은 2026년 양산에 들어갔으나(출하 목표 75만 개), 첨단 장비 규제와 자국산 HBM 생산 부족이 병목이다(16화 해설 참조, 2026-10 기준). 그래서 "다른 정글"로 분류하고 관찰로 둔다. 본 채점은 본 만화의 예시이며 특정 종목의 매수·매도를 권하지 않는다',
 "p22":'사실 확인: 2026년 2월 한 AI 회사가 업무용 에이전트 기능을 공개한 직후 48시간 동안 소프트웨어 기업들의 시가총액이 약 2,850억 달러 줄어든 일을 언론은 "SaaS포칼립스"라 불렀다. 반면 2026 McKinsey 조사에서 대기업의 40%가 에이전트를 한 기능 이상에 확산했지만 이익 기여 응답은 전년과 같은 37%였다. 즉 ① 새 카테고리는 켜졌고 ② 실용주의자의 이동은 아직 관찰 단계다(2026-10-04 기준)',
 "p25":'사실 확인: 옛 PC 시대 CPU 1위 기업은 2025년 9월 GPU 회사로부터 50억 달러 지분 투자를 받고 공동 칩을 개발하기로 했으며(공동 PC용 칩은 2026-10 현재 미출시), 2026년 2분기 매출이 전년 대비 25% 늘어 15년 만에 가장 높은 성장률을 기록했다(18A 공정 제품 출시). 따라서 본 만화는 "쇠락"이 아니라 "왕좌의 무게 이동 + 회복 시도 중"으로 서술한다(2026-10-04 기준, 작화 시 갱신)',
}

if __name__ == "__main__": run(globals())
