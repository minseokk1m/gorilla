#!/usr/bin/env python3
# 고릴라 헌터스 Ep15 "두 정글: 영장류와 킹덤" — 시즌 2 (30p)
# 2026-09-13 작성. season2-plan.md Ep15 · v4 Ep11 계승 · Moore 6등급(영장류/킹덤) + 보조 라벨 · Ep1 p28 전환비용 성곽 연결
# usage: python3 gen_ep15.py all | rest | prompt | p05 ...
import os
from ep_common import run

EP = "EP15"
BASE = os.path.dirname(os.path.abspath(__file__))
FINAL = os.path.join(BASE, "final_ep15")
STAGE = "③ 투자와 연결"

EXTRA_CHARS = ("EP15 NOTE: jungle metaphor scenes are drawn in the SAME inked webtoon style as the study room (no painterly fantasy): "
               "PRIMATE JUNGLE = a calm big gorilla on a stone throne, a smaller chimp below, tiny monkeys with bananas; "
               "KINGDOM JUNGLE = a crowned king on a castle wall, an armored knight below with a raised sword, peasants in a field. Never mix the two jungles in one scene unless specified.")

GRADES = ("a clean hand-drawn SIX-GRADE table with two columns headed '영장류 정글 (독점)' and '킹덤 정글 (개방형)' and three rows: '고릴라' / '영주' ; '침팬지' / '기사' ; '원숭이' / '소작농'; beneath the table a small line '+ 위치 라벨: 캐즘 위치 · 잠재 고릴라'")
INK = "drawn in the SAME inked Korean webtoon style as the study-room pages (visible ink linework, flat colors, absolutely NO photoreal, NO painterly or 3D render); "

PAGES = {
 "p01":f"A cinematic episode-title page, {INK} A forked jungle path in the dark: the left fork leads to a stone throne with a gorilla silhouette, the right fork to a castle wall with a crowned king silhouette; no labels. A clean dark band across the middle for the title text, a thin band at the bottom.",
 "p02":"Two panels, study room. (1 ~55%) NA BAE-UM asking JU BON-JIL, a puzzled frown; the whiteboard behind is BLANK. (2 ~45%) JU BON-JIL drawing a forked path on the board (no text).",
 "p03":"Two panels. (1 ~55%) JU BON-JIL at the board where ONLY two words are written at the ends of the fork: '영장류' (left) and '킹덤' (right); HAN TANG-SU mouthing the words. (2 ~45%) close on JU BON-JIL's knowing smile.",
 "p04":f"One panel (~100%). A jungle metaphor scene {INK} a calm big gorilla seated on a stone throne at the top, a smaller chimpanzee on a lower rock looking up, and three tiny monkeys at the bottom clutching bananas; three small clean labels beside them: '고릴라', '침팬지', '원숭이'; ONLY these labels.",
 "p05":"Two panels. (1 ~55%) JU BON-JIL pointing at the gorilla in a small inset of the jungle scene; NA BAE-UM noting. (2 ~45%) close on the chimp looking up at the throne, unable to climb.",
 "p06":"Two panels. (1 ~55%) JU BON-JIL drawing on the board ONLY a thick horizontal line between a small gorilla sketch above and a chimp sketch below, with a small 'X' on the line (no words). (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '영장류 정글' / '종 사이 교배 불가' / '격차가 오래간다'.",
 "p07":"Two panels. (1 ~55%) HAN TANG-SU asking with a smirk; JU BON-JIL amused. (2 ~45%) close on the tiny monkeys with bananas, one monkey dropping its banana.",
 "p08":f"One panel (~100%). A kingdom metaphor scene {INK} a crowned king standing on a castle wall at the top, an armored knight on horseback below raising a sword toward the wall, and peasants working a field at the bottom; three small clean labels: '영주', '기사', '소작농'; ONLY these labels.",
 "p09":"Two panels. (1 ~55%) JU BON-JIL pointing at the knight in a small inset; NA BAE-UM intrigued. (2 ~45%) close on the knight's raised sword and the king glancing down nervously.",
 "p10":"Two panels. (1 ~55%) JU BON-JIL drawing on the board ONLY a vertical ladder sketch between a crown sketch above and a helmet sketch below, with a small upward arrow (no words). (2 ~45%) NA BAE-UM's notebook close-up: ONLY these hand-written lines: '킹덤 정글' / '같은 종족 안의 신분상승' / '왕좌가 영원하지 않다'.",
 "p11":"Two panels. (1 ~55%) NA BAE-UM asking the key question, hand raised; JU BON-JIL pleased. (2 ~45%) JU BON-JIL writing ONE line on the board: '독점 아키텍처인가, 개방형인가'.",
 "p12":"One panel (~100%). The whiteboard: the line '독점 아키텍처인가, 개방형인가' at the top; below it two arrows down to two words: left '독점 → 영장류', right '개방형 → 킹덤'; under the left word a small castle-moat sketch, under the right a small open gate sketch; JU BON-JIL to the side; ONLY these labels.",
 "p13":"Two panels. (1 ~55%) JU BON-JIL recalling Ep1: a small inset of the moat-and-castle sketch from Ep1 labeled ONLY '전환비용'; NA BAE-UM nodding in recognition. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p14":"Two panels. (1 ~55%) JU BON-JIL explaining with both hands: one hand closed like a fist (proprietary), one open (open); HAN SIL-SOK listening carefully. (2 ~45%) close on the two hands.",
 "p15":"One split panel (~100%), LEFT vs RIGHT. LEFT half: an AI research lab where every monitor shows ONLY abstract green code blocks (no readable text), a small clean label 'CUDA · 못 옮긴다'; RIGHT half: a corporate database room where two identical server racks stand side by side with a simple arrow between them, a small clean label 'SQL · 옮길 수 있다'; a bold VS badge center; ONLY these two labels.",
 "p16":"Two panels. (1 ~55%) JU BON-JIL tapping the left half; NA BAE-UM writing. (2 ~45%) JU BON-JIL tapping the right half; HAN SIL-SOK nodding (his company uses such databases).",
 "p17":"Two panels. (1 ~55%) NA BAE-UM asking about memory chips, recalling Ep10; JU BON-JIL smiling. (2 ~45%) the whiteboard corner showing ONLY two short lines: 'DRAM → 킹덤' and 'HBM → 영장류'.",
 "p18":"Two panels. (1 ~55%) NA BAE-UM's face, the season-1 finale clicking into place; JU BON-JIL nodding. (2 ~45%) the notebook close-up: ONLY these hand-written lines: '한 질문: 독점인가 개방인가' / '전환비용이 정글을 가른다' / '회사가 아니라 카테고리로'.",
 "p19":"Two panels. (1 ~55%) HAN TANG-SU asking which jungle is better to invest in; JU BON-JIL considering. (2 ~45%) JU BON-JIL drawing a small balance scale on the board (no text).",
 "p20":"Two panels. (1 ~55%) JU BON-JIL explaining: gorilla is structurally safe, king can wobble; the board shows ONLY the two sketches: a gorilla with a solid base line, a king on a wobbling wall. (2 ~45%) close on the wobbling wall.",
 "p21":"Two panels. (1 ~55%) NA BAE-UM asking about companies that fit neither; JU BON-JIL raising a finger. (2 ~45%) JU BON-JIL drawing two small tags on the board (no text yet).",
 "p22":"One panel (~100%). The whiteboard: two hand-drawn luggage-tag shapes with ONE label each: '캐즘 위치' and '잠재 고릴라'; beneath them a short line '등급이 아니라 위치'; a small car icon under the first tag and a small egg icon under the second; JU BON-JIL to the side; ONLY these labels.",
 "p23":"Two panels. (1 ~55%) JU BON-JIL explaining the two tags; NA BAE-UM thinking of Ep3's Tesla mention. (2 ~45%) close-up of NA BAE-UM ONLY (late-30s, plain black hair, NO glasses, charcoal shirt); JU BON-JIL must NOT appear; the thought balloon belongs to NA BAE-UM.",
 "p24":"Two panels. (1 ~55%) JU BON-JIL erasing and preparing the final board; the group settling. (2 ~45%) NA BAE-UM turning to a fresh notebook page.",
 "p25":f"One panel (~100%). The whiteboard shows {GRADES}; JU BON-JIL to the side, NA BAE-UM copying; ONLY these labels.",
 "p26":f"Two panels. (1 ~55%) JU BON-JIL summarizing with the marker across the whiteboard which shows {GRADES}; the group attentive. (2 ~45%) NA BAE-UM's notebook close-up with the same six-grade table hand-copied: '고릴라 / 영주', '침팬지 / 기사', '원숭이 / 소작농' and nothing else.",
 "p27":"Two panels. (1 ~55%) HAN SIL-SOK asking a practical question; JU BON-JIL turning. (2 ~45%) JU BON-JIL answering with a calm nod.",
 "p28":f"Two panels, quiet beat. (1 ~60%) evening study room, NA BAE-UM looking at the whiteboard which shows {GRADES}, the others leaving. (2 ~40%) NA BAE-UM's resolved face.",
 "p29":f"Two panels. (1 ~55%) at the door JU BON-JIL turns back, teasing the next lesson; the whiteboard behind is completely BLANK. (2 ~45%) a faint dreamy image {INK} a big calm gorilla on a throne, a chimp with a shiny new sword below, tiny monkeys copying it; NO text.",
 "p30":f"One panel (~100%). Closing chapter-end, {INK}the two jungles side by side in the distance, the left one lit; NA BAE-UM and JU BON-JIL small figures walking toward it; a black caption band across the very bottom. THE ONLY TEXT ON THIS ENTIRE PAGE is the specified caption lettered in white INSIDE the bottom black band.",
}

DLG = {
 "p01":[(1,'C','title','EPISODE 15\n두 정글: 영장류와 킹덤\n한 질문이 정글을 가른다, 독점인가 개방인가\n시즌 2 · 두 번째 곡선과 정글의 서열')],
 "p02":[(1,'C','speech','나배움: 같은 토네이도인데\n왜 어떤 1등은 십 년을 가고 어떤 1등은 금방 바뀌어요?'),
        (2,'C','speech','주본질: 정글이 둘이기 때문이야')],
 "p03":[(1,'L','label','영장류'),(1,'R','label','킹덤'),
        (1,'C','speech','주본질: 어느 정글에 들어가느냐가\n그 뒤의 모든 걸 결정해'),
        (2,'C','think','주본질: 시즌 1 마지막에 예고한 그 두 정글')],
 "p04":[(1,'C','label','고릴라'),(1,'C','label','침팬지'),(1,'C','label','원숭이'),
        (1,'C','narr','첫째 정글, 영장류\n왕좌 위의 고릴라, 그 아래 침팬지, 바닥의 원숭이')],
 "p05":[(1,'C','speech','주본질: 고릴라는 판의 표준을 쥔 1등\n침팬지는 2등인데, 문제는 이거야'),
        (2,'C','narr','침팬지는 아무리 커도 고릴라가 되지 못한다')],
 "p06":[(1,'C','speech','주본질: 종이 달라서 교배가 안 돼\n한번 고릴라면 침팬지가 못 따라잡아\n격차가 오래가는 정글이지'),
        (2,'C','narr','세 줄')],
 "p07":[(1,'C','speech','한탕수: 그럼 원숭이는요?\n원숭이도 열심히 하면…'),
        (2,'C','speech','주본질: 원숭이는 고릴라 흉내를 내는 저가 클론이야\n고릴라가 값을 내리면 바나나가 사라져')],
 "p08":[(1,'C','label','영주'),(1,'C','label','기사'),(1,'C','label','소작농'),
        (1,'C','narr','둘째 정글, 킹덤\n성벽 위의 영주, 그 아래 기사, 들판의 소작농')],
 "p09":[(1,'C','speech','주본질: 여긴 같은 종족 안의 신분상승 게임이야\n기사가 영주에게 도전할 수 있고'),
        (2,'C','narr','영주는 아래를 내려다보며 늘 조금 불안하다')],
 "p10":[(1,'C','speech','주본질: 영주 자리도 영원하지 않아\n기사가 영주를 베고 올라갈 수 있는 정글이지'),
        (2,'C','narr','세 줄')],
 "p11":[(1,'C','speech','나배움: 그럼 어떤 시장이 영장류고\n어떤 시장이 킹덤인지 어떻게 알아요?'),
        (2,'C','speech','주본질: 질문 하나면 돼')],
 "p12":[(1,'C','label','독점 아키텍처인가, 개방형인가'),(1,'L','label','독점 → 영장류'),(1,'R','label','개방형 → 킹덤'),
        (1,'C','speech','주본질: 이 시장의 핵심 설계를 한 회사가 쥐고 있나\n아니면 누구나 쓰는 공통 표준인가\n독점이면 영장류, 개방형이면 킹덤')],
 "p13":[(1,'C','label','전환비용'),
        (1,'C','speech','주본질: 1화에서 본 이 성 기억하지?\n해자가 깊으면 영장류, 얕으면 킹덤이야'),
        (2,'C','think','나배움: 전환비용이 정글을 가르는구나')],
 "p14":[(1,'C','speech','주본질: 독점은 이렇게 쥔 손이야\n한번 들어오면 못 나가\n개방형은 편 손이지, 언제든 옮길 수 있어'),
        (2,'C','narr','쥔 손과 편 손')],
 "p15":[(1,'L','label','CUDA · 못 옮긴다'),(1,'R','label','SQL · 옮길 수 있다'),
        (1,'C','narr','왼쪽 연구소의 코드는 전부 한 회사의 언어로 쓰였다\n오른쪽 서버는 다른 회사 것으로 바꿔 끼울 수 있다')],
 "p16":[(1,'C','speech','주본질: 그래서 AI 칩의 1등은 영장류의 고릴라고'),
        (2,'C','speech','주본질: 데이터베이스의 1등은 킹덤의 영주야\n점유율이 높아도 옮길 수 있으니까')],
 "p17":[(1,'C','speech','나배움: 그럼 10화의 메모리는요?'),
        (2,'C','speech','주본질: 표준 DRAM은 누구 걸 써도 같으니 킹덤\nHBM은 검증에 묶여서 못 옮기니 영장류\n같은 회사 안에 두 정글이 있는 거야')],
 "p18":[(1,'C','speech','나배움: 회사가 아니라 카테고리로 본다\n시즌 1 결론이 여기서 다시 나오네요'),
        (2,'C','narr','세 줄을 적었다')],
 "p19":[(1,'C','speech','한탕수: 그래서 어느 정글이 돈이 돼요?'),
        (2,'C','speech','주본질: 돈은 둘 다 돼\n다만 잡는 법이 달라')],
 "p20":[(1,'C','speech','주본질: 영장류 고릴라는 구조적으로 안전해서 길게 들고\n킹덤 영주는 흔들릴 수 있어서 관찰하며 가볍게'),
        (2,'C','narr','왕좌는 단단하고, 성벽은 흔들린다')],
 "p21":[(1,'C','speech','나배움: 근데 어느 등급에도 안 들어가는 회사도 있잖아요\n3화의 테슬라처럼'),
        (2,'C','speech','주본질: 그건 등급이 아니라 위치야')],
 "p22":[(1,'C','label','캐즘 위치'),(1,'C','label','잠재 고릴라'),(1,'C','label','등급이 아니라 위치'),
        (1,'C','speech','주본질: 아직 골짜기를 못 건넌 회사는 캐즘 위치\n토네이도 전인데 표준을 노리는 회사는 잠재 고릴라\n둘 다 등급이 정해지기 전의 이름표야')],
 "p23":[(1,'C','speech','주본질: 이 두 이름표는 18화에서 제대로 다룬다\n테슬라도, 파운데이션 모델 회사들도'),
        (2,'C','think','나배움: 아직 이름이 없는 동물들')],
 "p24":[(1,'C','speech','주본질: 자, 한 장으로 정리하자'),
        (2,'C','narr','새 페이지를 폈다')],
 "p25":[(1,'C','label','영장류 정글 (독점)'),(1,'C','label','킹덤 정글 (개방형)'),
        (1,'C','label','고릴라 / 영주'),(1,'C','label','침팬지 / 기사'),(1,'C','label','원숭이 / 소작농'),
        (1,'C','label','+ 위치 라벨: 캐즘 위치 · 잠재 고릴라')],
 "p26":[(1,'C','speech','주본질: 여섯 등급에 위치 라벨 둘\n시즌 2의 나머지는 이 표의 칸을 하나씩 채우는 시간이야'),
        (2,'C','narr','표를 그대로 옮겨 적었다')],
 "p27":[(1,'C','speech','한실속: 저 같은 사람은 그냥 고릴라만 사면 되나요?'),
        (2,'C','speech','주본질: 그게 가장 단순하고 가장 강한 답이야\n다만 고릴라인지 침팬지인지 가르는 눈은 있어야지')],
 "p28":[(1,'C','narr','표 하나가 정글 둘을 담았다'),
        (2,'C','think','나배움: 다음은 고릴라를 직접 만나는 시간')],
 "p29":[(1,'C','speech','주본질: 다음 시간, 영장류 정글부터\n고릴라와 침팬지와 원숭이, 진짜 이름으로'),
        (2,'C','narr','왕좌 아래, 침팬지가 새 칼을 들고 있었다')],
 "p30":[(1,'C','caption','Episode 15 끝 · 다음 화 · 고릴라·침팬지·원숭이\n(NVIDIA · ASML · AMD · 구글 · 중국 클론)')],
}

BANDS = {
 "p06":'영장류 정글 · 고릴라(표준을 쥔 1등)·침팬지(2등)·원숭이(저가 클론) · 종 사이 교배 불가, 격차가 오래간다',
 "p10":'킹덤 정글 · 영주·기사·소작농 · 같은 종족 안의 신분상승, 왕좌가 영원하지 않다',
 "p12":'한 질문 · 독점 아키텍처(proprietary)면 영장류, 개방형(open)이면 킹덤 · 전환비용의 깊이가 정글을 가른다',
 "p22":'위치 라벨 · 캐즘 위치(골짜기를 못 건넌 회사) · 잠재 고릴라(토네이도 전 후보) · 등급이 정해지기 전의 이름표',
 "p25":'Moore 6등급 · 고릴라/영주 · 침팬지/기사 · 원숭이/소작농 + 위치 라벨 2',
}

NOTES = {
 "p04":'해설: 고릴라(Gorilla)·침팬지(Chimp)·원숭이(Monkey)는 Moore가 『The Gorilla Game』에서 독점 아키텍처 시장의 1·2·3등급에 붙인 이름이다. © Geoffrey A. Moore, The Chasm Group',
 "p08":'해설: 영주(King)·기사(Prince)·소작농(Serf)은 개방형 표준 시장의 등급이다. 우리 만화는 King을 "영주"로 옮겨 봉건 위계의 느낌을 살렸다. 시즌 1에서 "킹덤 게임"이라 부른 것이 이 정글이다',
 "p12":'해설: 독점 아키텍처(proprietary architecture)는 한 회사가 설계 표준을 쥐어 고객과 협력사가 그 회사에 묶이는 구조, 개방형(open)은 공통 표준이라 공급자를 바꿀 수 있는 구조다. 전환비용(1화)의 크기가 곧 이 차이다',
 "p16":'사실 확인: AI 연구·개발 코드의 대부분이 NVIDIA의 CUDA로 쓰여 있어 다른 칩으로 옮기려면 재작성·검증이 필요하다. 반면 관계형 데이터베이스는 SQL이라는 공통 표준 위에 있어 공급자 교체가 가능하다(전환비용은 있으나 구조적으로 개방형)',
 "p22":'해설: "캐즘 위치"와 "잠재 고릴라"는 Moore의 6등급이 아니라 본 만화가 운영을 위해 붙인 보조 라벨이다. 등급이 확정되기 전의 회사를 표에 올리기 위한 장치다',
 "p25":'해설: 영장류 정글의 격차는 오래가고(고릴라 장기 보유), 킹덤 정글은 신분상승이 가능하다(영주·기사는 가볍게, 관찰). 등급별 매수·보유·매도 원칙은 16·17화와 19화에서 정리한다',
}

if __name__ == "__main__": run(globals())
