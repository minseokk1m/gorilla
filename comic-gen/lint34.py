#!/usr/bin/env python3
# 고릴라 헌터스 — 작화 캘리브레이션 린트 (precheck 보완, 비용 0)
# 시즌 2 작화 314장에서 재생성을 유발한 패턴을 콘티 단계에서 잡는다. 전부 WARN(판단은 사람이).
# usage: python3 lint34.py ep21 [ep22 ...]
#  L1 라벨 불일치: DLG의 label 텍스트가 그 페이지 PAGES 지시문에 없음 → 모델이 그리지 않은 라벨을 식자하거나 발명
#  L2 발표자 잠금 누락: 주본질이 아닌 인물이 speech를 하는데 PAGES에 board/whiteboard + present/explain/point가 있고 ABSOLUTE RULE이 없음
#  L3 회상/스토리북 + 현대 캐스트 동시 등장(FLASHBACK RULE 충돌)
#  L4 화자 부재: speech/think 화자가 PAGES 본문에 등장하지 않음(ONLY 지정 클로즈업 등) → 화자 오배치
#  L5 폰·스크린 지시가 있는데 OFF/내용 명시 없음 → 차트·텍스트 자생
#  L6 표지: 'ONE single illustration' 미명시 / 마지막 페이지: 하단 검은 띠 미명시
#  L7 미래 회차 번호 언급(대사에 "NN화"가 현재 회차보다 큼) → 독자 혼란
#  L8 PAGES에 실존 인물 이름·로고 단어
#  L9 보드 미지정: 'board' 언급 페이지에 라벨도 BLANK 지시도 없음
import sys, re, importlib

CAST = {'나배움':'NA BAE-UM','한탕수':'HAN TANG-SU','주본질':'JU BON-JIL','최신상':'CHOI SIN-SANG','고비전':'GO BI-JEON',
        '한실속':'HAN SIL-SOK','신중해':'SHIN JUNG-HAE','안믿어':'AN MID-EO'}
MODERN = ['NA BAE-UM','HAN TANG-SU','JU BON-JIL','CHOI SIN-SANG','GO BI-JEON','HAN SIL-SOK','SHIN JUNG-HAE','AN MID-EO']
REAL = ['Jensen','Huang','Musk','Altman','Lisa Su','Kim Joung','logo of','brand logo','real photo','Apple logo','Google logo']

def lint(ep):
    mod = importlib.import_module(f"gen_{ep}")
    epn = int(re.sub(r'\D','',ep))
    P, D = mod.PAGES, mod.DLG
    ids = sorted(P); warns = []
    for k in ids:
        spec = P[k]; low = spec.lower(); lines = D.get(k, [])
        labels = [t for _,_,r,t in lines if r=='label']
        for t in labels:
            core = t.split('\n')[0]
            if core not in spec and core.replace(' ', '') not in spec.replace(' ', ''):
                warns.append(f"{k} L1 라벨 '{core[:24]}' 가 PAGES에 없음")
        speakers = set()
        for _,_,r,t in lines:
            m = re.match(r'([가-힣A-Za-z ]{1,8}): ', t)
            if m and r in ('speech','think'): speakers.add(m.group(1))
        non_mentor = [s for s in speakers if s in CAST and s != '주본질']
        if non_mentor and 'ABSOLUTE RULE' not in spec:
            for s_ in non_mentor:
                for sent in re.split(r'[.;]', spec):
                    if CAST[s_] in sent and re.search(r'(at|to|beside|by|toward) the (white)?board|presenting|pinning|writing on|fills? in|ticking|drawing on', sent) \
                       and not re.search(r'JU BON-JIL[^,]*(at|to|beside|by) the (white)?board', sent):
                        warns.append(f"{k} L2 발표자 잠금 없음({s_} 가 보드에서 발표/필기)"); break
        if re.search(r'flashback|storybook|period|historical|vintage|ancient', low) and 'NOT a period flashback' not in spec:
            cast_in = [c for c in MODERN if c in spec]
            if cast_in and not re.search(r'inset|recall|remember|memory|imagin', low):
                warns.append(f"{k} L3 회상/스토리북 + 현대 캐스트 {cast_in[:2]}")
        for s in speakers:
            if s in CAST and CAST[s] not in spec and not re.search(r'off-panel|off panel|from off', low):
                warns.append(f"{k} L4 화자 {s} 가 PAGES 본문에 없음")
        if re.search(r'\bphone|screen|laptop|tablet|monitor', low.replace('flip phone','').replace('old flip',''))  and not re.search(r'off\b|blank|blurred|only (a|the|one|two|three|blurred|green|three|a single)|shows only|no readable', low):
            warns.append(f"{k} L5 스크린 내용·OFF 미명시")
        for w in REAL:
            if w.lower() in low: warns.append(f"{k} L8 실존 인물/로고 단어 '{w}'")
        if 'board' in low and not labels and not re.search(r'blank|no readable|out of focus|no writing|no text|nothing (is )?written|only|erased|shows|labeled|label|heading', low):
            warns.append(f"{k} L9 보드 언급인데 라벨도 BLANK 지시도 없음")
        for _,_,r,t in lines:
            for mm in re.findall(r'(\d{1,2})화', t):
                if int(mm) > epn: warns.append(f"{k} L7 미래 회차 '{mm}화' 언급: {t[:30]!r}")
    first, last = ids[0], ids[-1]
    if 'one single illustration' not in P[first].lower(): warns.append(f"{first} L6 표지 'ONE single illustration' 미명시")
    if not re.search(r'bottom.*black|black.*bottom', P[last].lower()): warns.append(f"{last} L6 마지막 페이지 하단 검은 띠 미명시")
    print(f"[{ep}] {len(ids)}p · 경고 {len(warns)}")
    for w in warns: print("  WARN", w)
    return warns

if __name__ == "__main__":
    tot = 0
    for e in (sys.argv[1:] or ["ep21"]): tot += len(lint(e))
    print("total warnings", tot)
