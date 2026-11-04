/* ---------- map pass: a world view of the regions, and one region at a time with room for every place ----------
   The original renderMap still runs (it fills the detail panel and waystone travel); this replaces the grid. */
(()=>{const st=document.createElement('style');st.textContent=`
#maptabs{display:flex;gap:4px;margin:0 0 6px;overflow-x:auto;scrollbar-width:none;-webkit-mask:linear-gradient(90deg,#000 92%,transparent)}
#maptabs button{flex:none;font:inherit;font-size:8px;padding:4px 7px;border:2px solid #000;background:#1a2a24;color:var(--cream);cursor:pointer;box-shadow:inset 0 0 0 1px rgba(242,230,200,.2);white-space:nowrap}
#maptabs button.on{background:#2f4a3a;box-shadow:inset 0 0 0 1px #9bd04c}#maptabs button.here::after{content:" ●";color:#fff4c2}
.mpr{position:absolute;transform:translate(-50%,-50%);border:2px solid #000;background:#21342c;color:var(--cream);font:inherit;font-size:9px;padding:5px 8px;cursor:pointer;text-align:center;box-shadow:inset 0 0 0 1px rgba(242,230,200,.3);white-space:nowrap}
.mpr small{display:block;font-size:7px;opacity:.75;margin-top:2px}.mpr.here{box-shadow:inset 0 0 0 2px #fff4c2}.mpr.unk{opacity:.6}
.mpx{position:absolute;transform:translate(-50%,-50%);border:1px dashed rgba(242,230,200,.45);background:rgba(8,18,20,.75);color:#ffd27a;font:inherit;font-size:7px;padding:2px 5px;cursor:pointer;white-space:nowrap}
.mpfr{position:absolute;left:2%;right:2%;bottom:2%;display:flex;flex-wrap:wrap;gap:3px;justify-content:center;align-items:center;font-size:7px;color:#8d8aa3}.mpfr b{font-weight:normal;color:#c8c0d8;margin-right:2px}.mpf{border:1px dashed #4a4a5a;padding:1px 4px;white-space:nowrap;background:rgba(8,18,20,.7)}
#mapgrid svg.full{inset:0;width:100%;height:100%}
#mapgrid[data-tight="1"] .mpr small{display:none}
#mapgrid[data-tight="2"] .mpr small{display:none}#mapgrid[data-tight="2"] .mpr,#mapgrid[data-tight="2"] .mpn,#mapgrid[data-tight="2"] .mpx{font-size:7px!important;padding:2px 4px!important}
#mapgrid[data-tight="3"] .mpr small{display:none}#mapgrid[data-tight="3"] .mpr,#mapgrid[data-tight="3"] .mpn,#mapgrid[data-tight="3"] .mpx{font-size:6px!important;padding:1px 3px!important}`;document.head.appendChild(st)})();
const MAPV={view:null};
const regOfId=id=>{const z=ZONES[zIdx(id)];const r=z&&zoneRegion(z);return r?r.id:null};
const MAP_IDS=()=>Object.keys(MAPXY).filter(id=>{const i=zIdx(id);return i>=0&&!ZONES[i].interior&&regOfId(id)});
/* spread labelled boxes apart inside a 100×100 box drawn at 16:9, keeping each near where it started */
function relax(items,iters=260){const ax=9/16;for(let it=0;it<iters;it++){let moved=0;
    for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){const a=items[i],b=items[j],dx=b.x-a.x,dy=(b.y-a.y)*ax,ox=(a.w+b.w)/2+1.5-Math.abs(dx),oy=(a.h+b.h)/2*ax+1.2-Math.abs(dy);
      if(ox>0&&oy>0){moved=1;if(ox/(a.w+b.w)<oy/((a.h+b.h)*ax)){const s=(dx>=0?1:-1)*ox/2;a.x-=s;b.x+=s}else{const s=(dy>=0?1:-1)*oy/2/ax;a.y-=s;b.y+=s}}}
    for(const a of items){a.x+=(a.ox-a.x)*.02;a.y+=(a.oy-a.y)*.02;a.x=Math.max(a.w/2+1,Math.min(99-a.w/2,a.x));a.y=Math.max(a.h/2+2,Math.min((MAPV.view==='world'?80:92)-a.h/2,a.y))}if(!moved&&it>20)break}return items}
const LAYOUT={};
function regionLayout(rid){if(LAYOUT[rid])return LAYOUT[rid];const ids=MAP_IDS().filter(id=>regOfId(id)===rid);const xs=ids.map(id=>MAPXY[id][0]),ys=ids.map(id=>MAPXY[id][1]);
  const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys),sx=x1-x0||1,sy=y1-y0||1;
  const items=ids.map(id=>{const z=ZONES[zIdx(id)],nm=z.name.replace(/^The /,''),x=12+(MAPXY[id][0]-x0)/sx*76,y=12+(MAPXY[id][1]-y0)/sy*70;return{id,x,y,ox:x,oy:y,w:Math.min(30,nm.length*1.35+5),h:7}});
  relax(items);return LAYOUT[rid]=Object.fromEntries(items.map(a=>[a.id,[a.x,a.y]]))}
function regionCentres(){if(LAYOUT._w)return LAYOUT._w;const c={};for(const id of MAP_IDS()){const r=regOfId(id);(c[r]=c[r]||[]).push(MAPXY[id])}
  const items=REGIONS.filter(r=>r.built&&c[r.id]).map(r=>{const p=c[r.id],x=p.reduce((a,q)=>a+q[0],0)/p.length,y=p.reduce((a,q)=>a+q[1],0)/p.length;return{id:r.id,x:8+x*.84,y:8+y*.76,ox:8+x*.84,oy:8+y*.76,w:r.n.length*1.5+8,h:10}});
  {const xs=items.map(a=>a.x),ys=items.map(a=>a.y),x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);for(const a of items){a.x=a.ox=12+(a.x-x0)/((x1-x0)||1)*76;a.y=a.oy=10+(a.y-y0)/((y1-y0)||1)*80}}
  relax(items);return LAYOUT._w=Object.fromEntries(items.map(a=>[a.id,[a.x,a.y]]))}
const _rmM=renderMap;renderMap=function(){_rmM();if(!MAP)return;const seen=pl.flags.seen||{},here=Z.id==='deep'?'town':Z.id,hereR=regOfId(here)||'cresthollow';
  if(!MAPV.view||MAPV.reset){MAPV.view=regOfId(MAP.sel)||hereR;MAPV.reset=0}
  const built=REGIONS.filter(r=>r.built),tabs=`<button data-mv="world" class="${MAPV.view==='world'?'on':''}">Ashveil Reach</button>`+built.map(r=>`<button data-mv="${r.id}" class="${MAPV.view===r.id?'on':''}${r.id===hereR?' here':''}">${r.n.replace(/^The /,'')}</button>`).join('');
  let tb=$('maptabs');if(!tb){tb=document.createElement('div');tb.id='maptabs';$('mapgrid').parentNode.insertBefore(tb,$('mapgrid'))}tb.innerHTML=tabs;
  const C=crAct(),cz=C?CRISES[C.id].zones:[];
  if(MAPV.view==='world'){const pos=regionCentres(),lines=new Set();
    for(const id of MAP_IDS())for(const p of ZONES[zIdx(id)].portals){const t=ZONES[p.to];if(!t)continue;const a=regOfId(id),b=regOfId(t.id);if(a&&b&&a!==b&&pos[a]&&pos[b])lines.add([a,b].sort().join('|'))}
    const L=[...lines].map(k=>{const[a,b]=k.split('|');return`<line data-a="${a}" data-b="${b}" x1="${pos[a][0]}" y1="${pos[a][1]}" x2="${pos[b][0]}" y2="${pos[b][1]}"/>`}).join('');
    const nodes=built.map(r=>{const ids=MAP_IDS().filter(id=>regOfId(id)===r.id),n=ids.filter(id=>seen[id]).length,[x,y]=pos[r.id];
      return`<button class="mpr${n?'':' unk'}${r.id===hereR?' here':''}" style="left:${x}%;top:${y}%" data-mv="${r.id}">${r.n}<small>Lv ${r.lv[0]}–${r.lv[1]} · ${n}/${ids.length} explored</small></button>`}).join('');
    const fut=REGIONS.filter(r=>!r.built),fl='<div class="mpfr"><b>Beyond the Reach:</b>'+fut.map(r=>`<span class="mpf">${r.n.replace(/^The /,'')} ${r.lv[0]}–${r.lv[1]}</span>`).join('')+'</div>';
    $('mapgrid').innerHTML=`<svg class="full" viewBox="0 0 100 100" preserveAspectRatio="none">${L}</svg>${nodes}`;fitMap();return}
  const rid=MAPV.view,pos=regionLayout(rid),ids=Object.keys(pos),wc=regionCentres(),me=wc[rid],lines=[],exits={};
  for(const id of ids){if(!seen[id])continue;for(const p of ZONES[zIdx(id)].portals){const t=ZONES[p.to];if(!t||!MAPXY[t.id])continue;const tr=regOfId(t.id);
      if(tr&&tr!==rid){(exits[tr]=exits[tr]||[]).push(id);continue}if(!pos[t.id]||id>t.id&&seen[t.id])continue;
      lines.push(`<line data-a="${id}" data-b="${t.id}" x1="${pos[id][0]}" y1="${pos[id][1]}" x2="${pos[t.id][0]}" y2="${pos[t.id][1]}" class="${seen[t.id]?'':'unk'}"/>`)}}
  const ex=Object.entries(exits).map(([tr,from])=>{const o=wc[tr]||[50,50],dx=o[0]-me[0],dy=o[1]-me[1],m=Math.max(Math.abs(dx)/44,Math.abs(dy)/42)||1,x=50+dx/m,y=48+dy/m,f=pos[from[0]];
    lines.push(`<line data-a="${from[0]}" data-b="x:${tr}" x1="${f[0]}" y1="${f[1]}" x2="${x}" y2="${y}" class="unk"/>`);const R0=REGIONS.find(r=>r.id===tr);return`<button class="mpx" data-k="x:${tr}" style="left:${Math.max(7,Math.min(93,x))}%;top:${Math.max(5,Math.min(93,y))}%" data-mv="${tr}">→ ${R0.n.replace(/^The /,'')}</button>`}).join('');
  const nodes=ids.map(id=>{const z=ZONES[zIdx(id)],[x,y]=pos[id],s=seen[id],w=WAYS[id]!=null?WAYS_ST(id):-1;
    return`<button class="mpn${s?'':' unk'}${id===here?' here':''}${id===MAP.sel?' sel':''}${z.safe?' safe':''}${cz.includes(id)?' cris':''}" style="left:${x}%;top:${y}%" data-mz="${id}">${w>0?`<i class="ws${w===2||(pl.flags.waynet&&w)?' on':''}"></i>`:''}<span>${s?(VMARK[id]||'')+z.name.replace(/^The /,''):'?'}</span></button>`}).join('');
  $('mapgrid').innerHTML=`<svg class="full" viewBox="0 0 100 100" preserveAspectRatio="none">${lines.join('')}</svg>${nodes}${ex}`;fitMap()};
const _omM=openMap;openMap=function(...a){MAPV.reset=1;return _omM(...a)};
$('mapov').addEventListener('click',e=>{const b=e.target.closest('[data-mv]');if(!b||!MAP)return;MAPV.view=b.dataset.mv;if(MAPV.view!=='world'){const ids=MAP_IDS().filter(id=>regOfId(id)===MAPV.view);const sel=ids.find(id=>id===(Z&&Z.id))||ids.find(id=>(pl.flags.seen||{})[id])||ids[0];if(sel&&regOfId(MAP.sel)!==MAPV.view)MAP.sel=sel}renderMap()});

/* measure the boxes as drawn and push them apart until none overlap; shrink the text if the screen is too small */
const mapKey=e=>e.dataset.mz||e.dataset.k||e.dataset.mv;
function fitMap(){const G=$('mapgrid');if(!G)return;G.style.height='';G.style.aspectRatio='';G.style.minHeight='';let gr=G.getBoundingClientRect();if(!gr.width){requestAnimationFrame(fitMap);return}
  const avail=innerHeight-gr.top-6;if(gr.height>avail){G.style.aspectRatio='auto';G.style.minHeight='0';G.style.height=Math.max(140,avail)+'px';gr=G.getBoundingClientRect()}
  const els=[...G.querySelectorAll('.mpr,.mpn,.mpx')];if(!els.length)return;const pad=3;let best=null;
  for(let tight=0;tight<4;tight++){G.dataset.tight=tight;
    const it=els.map(e=>{const r=e.getBoundingClientRect(),x=r.left+r.width/2-gr.left,y=r.top+r.height/2-gr.top;return{e,w:r.width+pad,h:r.height+pad,x:parseFloat(e.style.left)/100*gr.width,y:parseFloat(e.style.top)/100*gr.height,ox:0,oy:0}});
    it.forEach(a=>{a.ox=a.x;a.oy=a.y});const cl=a=>{a.x=Math.max(a.w/2,Math.min(gr.width-a.w/2,a.x));a.y=Math.max(a.h/2,Math.min(gr.height-a.h/2,a.y))};
    let ov=0;for(let k=0;k<700;k++){ov=0;for(let i=0;i<it.length;i++)for(let j=i+1;j<it.length;j++){const a=it[i],b=it[j],dx=b.x-a.x,dy=b.y-a.y,px=(a.w+b.w)/2-Math.abs(dx),py=(a.h+b.h)/2-Math.abs(dy);
        if(px>0&&py>0){ov++;if(px/(a.w+b.w)<py/(a.h+b.h)){const m=(dx>=0?1:-1)*px/2;a.x-=m;b.x+=m}else{const m=(dy>=0?1:-1)*py/2;a.y-=m;b.y+=m}}}
      for(const a of it){if(k>200){a.x+=(a.ox-a.x)*.004;a.y+=(a.oy-a.y)*.004}cl(a)}if(!ov&&k>30)break}
    best={it,tight};if(!ov)break}
  G.dataset.tight=best.tight;const P={};for(const a of best.it){const lx=a.x/gr.width*100,ly=a.y/gr.height*100;a.e.style.left=lx+'%';a.e.style.top=ly+'%';P[mapKey(a.e)]=[lx,ly]}
  for(const l of G.querySelectorAll('line[data-a]')){const A=P[l.dataset.a],B=P[l.dataset.b];if(A){l.setAttribute('x1',A[0]);l.setAttribute('y1',A[1])}if(B){l.setAttribute('x2',B[0]);l.setAttribute('y2',B[1])}}}
addEventListener('resize',()=>{if(MAP&&$('mapgrid')&&$('mapgrid').offsetWidth)renderMap()});
