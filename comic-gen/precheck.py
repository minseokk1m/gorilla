#!/usr/bin/env python3
# 고릴라 헌터스 — 콘티 사전 검사기 (API 호출 전, 비용 0)
# usage: python3 precheck.py ep11 [ep12 ...]      # gen_epN.py를 import해 검사
# 검사 항목:
#  1. PAGES / DLG 키 일치, 정렬 순서(pNN, pNNb 형식)
#  2. 화자 접두어("이름: ")가 SPEAKERS에 있는 이름인지 (오타 → 말풍선에 이름이 그대로 찍힘)
#  3. 한국어 대사 규칙: 문장 끝 온점(.) 금지, em dash(—) 금지, 따옴표(‘ ’ " ") 금지
#  4. (라벨을 PAGES와 DLG 양쪽에 적는 것은 정상 관행이라 검사하지 않음)
#  5. NOTES / BANDS 키가 PAGES에 존재하는지
#  6. 페이지당 말풍선 수(>6이면 경고: 식자 밀도 과다)
#  7. 표지(p01)에 title 역할이 있는지, 마지막 페이지에 caption(예고)이 있는지
import sys, re, importlib

def check(ep):
    mod = importlib.import_module(f"gen_{ep}")
    P, D = mod.PAGES, mod.DLG
    errs, warns = [], []
    ids = sorted(P)
    for k in ids:
        if not re.fullmatch(r'p\d{2}[a-z]?', k): errs.append(f"{k}: 페이지 id 형식 오류")
    for k in P:
        if k not in D: errs.append(f"{k}: DLG 없음")
    for k in D:
        if k not in P: errs.append(f"{k}: PAGES 없음(DLG만 있음)")
    speakers = set(getattr(mod, "SPEAKERS", {}) or {})
    try:
        import ep_common; speakers |= set(ep_common.SPEAKERS)
    except Exception: pass
    speakers |= set(getattr(mod, "SPEAKERS_EXTRA", {}) or {})
    for k, lines in D.items():
        if len(lines) > 6: warns.append(f"{k}: 말풍선 {len(lines)}개(밀도 과다)")
        for panel, hint, role, text in lines:
            m = re.match(r'([가-힣A-Za-z ]{1,8}): ', text)
            if m and m.group(1) not in speakers and role in ('speech','think'):
                errs.append(f"{k}: 화자 '{m.group(1)}' 미등록(오타?)")
            body = text.split(': ',1)[1] if m else text
            for ln in body.split('\n'):
                ln = ln.strip()
                if not ln: continue
                if role in ('speech','think','narr','emph') and ln.endswith('.') and not ln.endswith('...'):
                    errs.append(f"{k}: 온점 종결 '{ln[-12:]}'")
                if '—' in ln: errs.append(f"{k}: em dash '{ln[:20]}'")
                if any(q in ln for q in ('‘','’','“','”')): warns.append(f"{k}: 대사 속 따옴표(간헐 오식자 위험) '{ln[:20]}'")
    for name in ('NOTES','BANDS'):
        for k in (getattr(mod, name, {}) or {}):
            if k not in P: errs.append(f"{name} {k}: PAGES에 없는 페이지")
    if ids and not any(r=='title' for _,_,r,_ in D.get(ids[0],[])): warns.append(f"{ids[0]}: 표지 title 없음")
    if ids and not any(r=='caption' for _,_,r,_ in D.get(ids[-1],[])): warns.append(f"{ids[-1]}: 마지막 페이지 예고 caption 없음")
    n_notes = len(getattr(mod,'NOTES',{}) or {})
    print(f"[{ep}] {len(ids)}p · 해설 {n_notes}곳 · 오류 {len(errs)} · 경고 {len(warns)}")
    for e in errs: print("  ERR ", e)
    for w in warns: print("  WARN", w)
    return not errs

if __name__ == "__main__":
    eps = sys.argv[1:] or ["ep11"]
    ok = all([check(e) for e in eps])
    sys.exit(0 if ok else 1)
