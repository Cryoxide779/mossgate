/* ---------- tall places: worlds taller than one screen ----------
   A tall place keeps its old ground and layout at the bottom and gains open height above it. The camera follows
   you up; the background stays behind and drops away as you climb, so high up you are above the treeline.
   The new height is filled with tiers of rock ledges joined by plank climbs, with creatures on the ledges,
   fliers in the open air, and a cache at the very top. */
const TALL={
  emeraldspire:{t:320,n:'The Spire Summit'},observation:{t:260,n:'The Highest Platform'},silentnest:{t:240,n:'The Crown Nests'},
  shardspire:{t:300,n:'The Shardspire Crown'},granite:{t:280,n:'The High Peaks'},fracplateau:{t:200,n:'The Upper Plateau'},
  starfalls:{t:240,n:'Above the Headwaters'},veinfall:{t:260,n:'The Chasm Rim'},deepwood:{t:220,n:'The Canopy Ruins'},
  rootchambers:{t:200,n:'The Root Vaults'},echo:{t:220,n:'The High Galleries'},tower:{t:260,n:'The Watchtower Top'},
  sentinel:{t:240,n:'The Sentinel Heights'},stormwell:{t:200,n:'The Upper Cisterns'}};
function makeTall(z,T,topName){z.tall=T;
  z.seg=z.seg.map(([x,w,y,t])=>[x,w,y+T,t]);(z.pools||[]).forEach(p=>p.y+=T);for(const po of z.portals)if(po.yy)po.yy+=T;if(z.cache&&z.cache[1])z.cache[1]+=T;
  const x0=z.x0??EDGE,x1=z.x1??z.ww-EDGE,base=z.seg.filter(s=>!s[3]||s[3]==='bed').reduce((m,s)=>Math.min(m,s[2]),999);
  /* tiers: the first a comfortable climb above the highest old ground, then every ~70px to near the top */
  const tiers=[];for(let y=Math.min(base-95,T+150);y>=46;y-=72)tiers.push(Math.round(y));
  const slabs=[],W2=270;
  tiers.forEach((y,j)=>{const off=(j%2)*200+80;for(let x=x0+off;x<x1-260;x+=400){const s=[x,W2,y,'f'];z.seg.push(s);slabs.push({j,x,y,i:z.seg.length-1})}});
  const step=(x,yFrom,yTo)=>{const n=Math.max(2,Math.ceil((yFrom-yTo)/30));for(let i=1;i<n;i++){const y=Math.round(yFrom-(yFrom-yTo)*i/n);z.seg.push([x+(i%2?-26:26)-34,68,y,'stone'])}};
  /* ground to tier 0: a climb under every other first-tier ledge */
  const gAt=x=>{let b=null;for(const s of z.seg)if((!s[3]||s[3]==='bed')&&x>=s[0]&&x<=s[0]+s[1]&&(b===null||s[2]<b))b=s[2];return b??250+T};
  const wet=x=>(z.pools||[]).some(p=>x>=p.x0-20&&x<=p.x1+20);
  slabs.filter(s=>s.j===0).forEach((s,k)=>{if(k%2)return;let x=s.x+60;if(wet(x))x=s.x+W2-60;if(wet(x))return;
    const g=Math.max(gAt(x-60),gAt(x),gAt(x+60));step(x,g,s.y)});
  /* tier to tier: from each ledge to the next ledge above it where they overlap */
  for(const s of slabs){const up=slabs.filter(u=>u.j===s.j+1&&u.x<s.x+W2-30&&u.x+W2>s.x+30);for(const u of up){const ox=Math.round((Math.max(s.x,u.x)+Math.min(s.x+W2,u.x+W2))/2);step(ox,s.y,u.y)}}
  /* creatures on the ledges and fliers in the open air */
  const kinds=[...new Set(z.mobs.map(m=>m[0]))].filter(k=>MOBS[k]&&!MOBS[k].elite&&!MOBS[k].boss),walk=kinds.filter(k=>!MOBS[k].fly),fly=kinds.filter(k=>MOBS[k].fly);
  const lvAt=i=>z.lv[0]+(i%2?Math.min(1,z.lv[1]-z.lv[0]):0);
  slabs.forEach((s,i)=>{if(i%2===0&&walk.length)z.mobs.push([walk[i%walk.length],s.i,s.x+W2/2,lvAt(i)])});
  if(fly.length)for(let k=0;k<Math.max(2,Math.round(z.ww/700));k++){const t=tiers[Math.min(tiers.length-1,1+k%Math.max(1,tiers.length-1))];z.mobs.push([fly[k%fly.length],-2,x0+300+k*600,lvAt(k),t-30])}
  /* the summit: the topmost ledge gets the cache and a name */
  const top=slabs.filter(s=>s.j===tiers.length-1);const sm=top[Math.floor(top.length/2)]||slabs[slabs.length-1];
  if(sm){z.cache=[sm.x+W2/2,sm.y];z.summit=[sm.x+W2/2,sm.y,topName]}
  z.SEG=z.seg.map(segObj)}
for(const[id,o]of Object.entries(TALL)){const z=zid(id);if(z)makeTall(z,o.t,o.n)}
/* the summit name floats above its ledge */
function drawTall(cx,cy){const z=Z;if(!z||!z.summit)return;const[x,y,n]=z.summit,sx=ri(x-cx),sy=ri(y-cy);if(sx>-80&&sx<W+80&&sy>-20&&sy<H+40){g.globalAlpha=.85;ptext(n.toUpperCase(),sx,sy-26,'#fff4c2');g.globalAlpha=1}}
const _dsT=drawSealed;drawSealed=function(cx,cy){_dsT(cx,cy);drawTall(cx,cy)};
