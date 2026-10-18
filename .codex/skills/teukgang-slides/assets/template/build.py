from pathlib import Path
import json,re,base64,mimetypes,html
root=Path(__file__).parent
source=json.loads((root/'slides.json').read_text(encoding='utf-8'))
css=(root/'style.css').read_text(encoding='utf-8')
def assets(text):
    def sub(m):
        base=(root/'assets').resolve();p=(base/m[1]).resolve()
        if not p.is_relative_to(base):raise ValueError('Asset must stay in assets directory')
        return 'data:'+str(mimetypes.guess_type(p.name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(p.read_bytes()).decode()
    return re.sub(r'\{\{asset:([^}]+)\}\}',sub,text)
slides=[];elapsed=0
for i,s in enumerate(source['slides'],1):
    seconds=s['seconds'];assert isinstance(seconds,int) and seconds>=0
    start=elapsed;elapsed+=seconds
    fmt=lambda t:f'{t//60:02}:{t%60:02}'
    span=f'{fmt(start)}–{fmt(elapsed)}' if seconds else '참고자료 · 발표 시간 제외'
    title=html.escape(s['title']);chapter=html.escape(s.get('chapter',''));kind=s.get('kind','content')
    body=assets(s.get('body',''))
    if 'motion' in s:
        config=dict(s['motion']);config['html']=assets(config['html'])
        js=(root/'assets/flow-live.js').read_text(encoding='utf-8').replace('</script','<\\/script')
        cfg=json.dumps(config,ensure_ascii=False).replace('<','\\u003c')
        body=f'<div id="flow-live" data-sr-opaque style="width:1152px;height:438px"></div><script id="flow-config" type="application/json">{cfg}</script><script>{js}</script>'
    if kind=='intro':inside=f'<div class="intro"><h1>{title}</h1>{body}</div>'
    elif kind=='divider':inside=f'<div class="divider"><h1>{title}</h1></div>'
    else:inside=f'<div class="kicker">{chapter}</div><h1 data-kind="text">{title}</h1><div class="content">{body}</div><footer class="footer"><span>{html.escape(source["title"])}</span><span class="right">{span} · {i:02} / {len(source["slides"])}</span></footer>'
    page=f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>{css}</style></head><body><section data-slide="{i}">{inside}</section></body></html>'
    slides.append(dict(id=str(i),key=s['key'],name=s['title'],minutes=seconds/60,range=span,html=page,notes=s.get('notes','')))
assert elapsed==source['targetSeconds'],f'{elapsed} seconds != {source["targetSeconds"]}'
project=dict(version=1,title=source['title'],slides=slides)
shell=(root/'shell.html').read_text(encoding='utf-8').replace('特講_TITLE',html.escape(source['title']))
(root/'lecture.html').write_text(shell.replace('__PROJECT_DATA__',json.dumps(project,ensure_ascii=False).replace('<','\\u003c')),encoding='utf-8')
(root/'slides-built.json').write_text(json.dumps(project,ensure_ascii=False),encoding='utf-8')
(root/'발표자-노트.md').write_text('\n\n'.join(f'## {i}. {s["name"]} · {s["range"]}\n\n{s["notes"]}' for i,s in enumerate(slides,1)),encoding='utf-8')
print(f'{len(slides)} slides, {elapsed} seconds: {root / "lecture.html"}')
