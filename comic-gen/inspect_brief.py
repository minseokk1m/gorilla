#!/usr/bin/env python3
# 검수용 기대치 요약: python3 inspect_brief.py ep21 [p05 p06 ...] → 페이지별 (화자·대사·라벨·핵심 제약) 텍스트
import sys, re, importlib
ep = sys.argv[1]; only = set(sys.argv[2:])
m = importlib.import_module(f"gen_{ep}")
import ep_common as ec
spk = dict(ec.SPEAKERS); spk.update(getattr(m, "SPEAKERS_EXTRA", {}))
for pid in sorted(m.PAGES):
    if only and pid not in only: continue
    spec = m.PAGES[pid]
    flags = []
    if 'ABSOLUTE RULE' in spec:
        mm = re.search(r'presenter standing at the whiteboard[^,]*is ([A-Z\- ]+?) \(', spec)
        flags.append('발표자 잠금: ' + (mm.group(1).strip() if mm else '있음'))
    if 'completely BLANK' in spec: flags.append('보드 BLANK')
    if 'ONLY' in spec and 'label' in spec.lower(): flags.append('보드에 지정 라벨만')
    if re.search(r'NA BAE-UM ONLY', spec): flags.append('나배움 단독 클로즈업(주본질 금지)')
    if re.search(r'flashback|storybook|period|historical', spec, re.I): flags.append('회상/스토리북(현대 캐스트 금지)')
    if re.search(r'bottom.*black|black.*bottom', spec, re.I): flags.append('하단 검은 캡션 띠')
    if re.search(r'ONE single illustration', spec): flags.append('표지 단일 일러스트')
    labels = [t for _,_,r,t in m.DLG[pid] if r=='label']
    lines = []
    for panel,_,r,t in m.DLG[pid]:
        if r=='label': continue
        who = ''
        mm = re.match(r'([가-힣A-Za-z ]{1,8}): ', t)
        if mm and mm.group(1) in spk: who = mm.group(1); t = t[len(who)+2:]
        lines.append(f"    [{r}{' '+who if who else ''}] " + t.replace('\n',' / '))
    print(f"## {pid}  {' · '.join(flags)}")
    if labels: print("    라벨: " + " | ".join(labels))
    print("\n".join(lines))
    if pid in getattr(m,'BANDS',{}): print("    [하단 밴드] " + m.BANDS[pid].replace('\n',' / '))
    # 장면 핵심(영문 지시문 앞 220자)
    print("    장면: " + re.sub(r'\s+',' ', spec)[:220] + " …")
