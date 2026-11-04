/* ---------- verticality: places below the ground and above it ----------
   - Places that are underground open from a cave mouth in the ground (▼ to go down) instead of a side path.
   - Places that are high up open from a ledge at the top of a climb of root-bridges and planks (▲ to go up).
   - The dungeon sites the map packages list now exist: the Buried Road, the Stonecircle Chambers, the Silent Nest,
     the Deepwood Root Chambers and the Spire's Observation Platform.
   - Every outdoor place has a high route: a climb to a perch with a one-time hidden cache at the top. */
THEMES.silversky={...THEMES.silverwood,ramps:{...THEMES.silverwood.ramps,far:R(['#6a8ca0','#7a9cb0','#8aacbe','#9cbccc','#b0cad8','#c4d8e2','#dce8ee'])},fog:'rgba(230,240,250,.16)',fog2:'rgba(255,255,255,.08)',ray:'255,250,230',rayA:2,vig:'10,14,18'};
const segObj=([x,w,y,t])=>({x,w,y,t:t==='f'||t==='stone'||t==='plank'||t==='bridge'?'float':'solid',stone:t==='stone',bed:t==='bed',plank:t==='plank',bridge:t==='bridge'});
const groundAt=(z,x)=>{let b=null;for(const s of z.seg)if((!s[3]||s[3]==='bed')&&x>=s[0]&&x<=s[0]+s[1]&&(b===null||s[2]<b))b=s[2];return b??250};
const wetAt=(z,x)=>(z.pools||[]).some(p=>x>=p.x0&&x<=p.x1);
/* sky: floating islands joined by root bridges; a fall drops you back to the start */
SEG_PRE.sky=w=>{const o=[],n=Math.max(4,Math.round(w/330)),s=w/n;for(let i=0;i<n;i++){const x0=Math.round(i*s)+(i?40:0),x1=i<n-1?Math.round((i+1)*s)-40:w,y=[236,214,226,200,220,206][i%6];o.push([x0,x1-x0,y]);
    if(i<n-1){const ny=[236,214,226,200,220,206][(i+1)%6];o.push([x1-6,92,Math.max(y,ny)+4,'plank'])}}return o};
/* a zig-zag climb of planks from the ground at x up to a platform at height top; returns the platform's y */
function climb(z,x,rise,tw=110){const g0=Math.max(groundAt(z,x-70),groundAt(z,x),groundAt(z,x+70)),wet=wetAt(z,x)||g0>256,g=wet?g0-28:g0,top=Math.max(70,Math.min(g,250)-rise),n=Math.max(2,Math.ceil((g-top)/32))+(wet?1:0),add=[];
  if(wet)add.push([x-6-36,72,g,'plank']);const n2=n-(wet?1:0);
  for(let i=0;i<n2-1;i++){const y=Math.round(g-(g-top)*(i+1)/n2),cx=x+(i%2?-30:30);add.push([cx-36,72,y,'plank'])}
  add.push([x-Math.round(tw/2),tw,top,'plank']);for(const s of add){z.seg.push(s);(z.SEG=z.SEG||[]).push(segObj(s))}return top}
const zid=id=>ZONES[zIdx(id)];
const portalTo=(par,child)=>{const ci=zIdx(child);return par.portals.find(p=>p.to===ci)};
const VMARK={};
function goDown(parent,child){VMARK[child]='▼ ';const p=zid(parent),po=p&&portalTo(p,child);if(po){po.cave=1;const c=zid(child),back=c&&portalTo(c,parent);if(back)back.rise=1}}
function goUp(parent,child,rise=130){VMARK[child]='▲ ';const p=zid(parent),po=p&&portalTo(p,child);if(!po||po.yy)return;po.yy=climb(p,po.x,rise);po.sky=1}
/* existing places that belong below or above their neighbours */
for(const[a,b]of[['town','under'],['town','deep'],['under','cistern'],['ruins','cellar'],['archive','deepcurrent'],['fenwatch','rotmire'],['mirror','echo'],['echo','veinfall'],['wildherd','stormwell'],['oak','mossroot'],['mossfen','brambledeep'],['bog','hollowfen']])if(zid(a)&&zid(b))goDown(a,b);
for(const[a,b,r]of[['veinfall','shardspire',150],['starfalls','emeraldspire',120],['shardspire','fracplateau',130],['ironvale','granite',120]])if(zid(a)&&zid(b))goUp(a,b,r);
/* the dungeon sites the map packages list */
function vPlace(P,dir,rise){const zi=addPlace({...P,map:P.map||[0,dir==='down'?7:-7]});const z=ZONES[zi];z.vert=dir;if(dir==='down')goDown(P.from,P.id);else goUp(P.from,P.id,rise);z.cache=[z.ww-EDGE-160,0];return zi}
vPlace({id:'buriedroad',name:'The Buried Road',reg:'golden',lv:[37,38],from:'longroad',at:.4,theme:'cellar',terrain:'ledges',ww:1800,
  mobs:['bandit','burrower','roadhound','bandit','burrower'],props:['pillar','sealstone','pillar','cairn','pillar'],nodes:['ore','shard','ambergrain'],
  labels:[[420,'A Collapsed Waystation',100],[1350,'Imperial Milestones',100]],
  lore:{br_mile:{x:900,t:'An Imperial Milestone',b:'Cut into the pavement: the distance to MossGate, in a unit nobody uses any more. The road ran straight under the Plains long before the Plains were grass.'}}},'down');
vPlace({id:'stonechambers',name:'The Stonecircle Chambers',reg:'golden',lv:[39,40],from:'stonecircle',at:.55,theme:'stormwell',terrain:'ledges',ww:1600,
  mobs:['poacher','bandit','poacher','burrower'],props:['sealstone','pillar','sealstone','lshrine','sealstone'],nodes:['shard','ore'],
  labels:[[1200,'The Alignment Chamber',100]],
  lore:{sc_align:{x:800,t:'The Alignment Chamber',b:'A shaft of light falls through a cut in the stone above and lands on a mark in the floor. Twice a year it lands dead centre. The poachers down here were digging for treasure; there is none. Just the sky, measured.'}}},'down');
vPlace({id:'silentnest',name:'The Silent Nest',reg:'silverwood',lv:[42,43],from:'silentcanopy',at:.5,theme:'silversky',terrain:'sky',ww:1600,
  mobs:['glider','glider','trapper','glider','silverhare','trapper'],props:['silvertree','cocoon','silvertree','rootbridge','silvertree'],nodes:['vinecord','feysilk','moonresin'],
  labels:[[1200,'High Canopy Rookery',100]],
  lore:{sn_rookery:{x:800,t:'The Rookery',b:'Woven nests the size of carts, strung between silverwood crowns. Nothing up here has ever seen an axe. Speak quietly.'}}},'up',150);
vPlace({id:'rootchambers',name:'The Root Chambers',reg:'silverwood',lv:[44,45],from:'deepwood',at:.6,theme:'deepwood',terrain:'water',ww:1800,
  mobs:['starblight','rootsong','starblight','wyrmling','starblight'],props:['rootmass','pillar','rootmass','sealstone','rootmass'],nodes:['ironroot','pearlstone','moonresin'],
  labels:[[1350,'The Flooded Archive',100]],
  lore:{rc_archive:{x:900,t:'The Flooded Archive',b:'Shelves of clay tablets, half underwater, wrapped in living root. The roots have been reading them for centuries. They seem to have liked the gardening ones best.'}}},'down');
vPlace({id:'observation',name:'The Observation Platform',reg:'silverwood',lv:[45,45],from:'emeraldspire',at:.75,theme:'silversky',terrain:'sky',ww:1600,
  mobs:['glider','spineback','glider','moonlynx'],props:['silvertree','cairn','rootbridge','silvertree'],nodes:['starorchid','silverwood'],
  labels:[[1250,'Above the Canopy',100]],
  lore:{op_view:{x:1200,t:'Above the Canopy',b:'From here the whole Wilds roll away to the east, silver and green, and you can see the trails move. Not much. But they move.'}}},'up',150);
/* high routes: one climb and hidden cache in every outdoor place */
for(const z of ZONES){if(z.safe||z.interior||z.vert==='down'||['deep','town','hearth','home'].includes(z.id)||z.cache)continue;if(!z.seg||z.ww<1100)continue;
  let x=null;for(const f of[.62,.55,.7,.45,.78,.38,.3,.85]){const c=freeX(z,f),g=groundAt(z,c);if((z.pools||[]).some(p=>c>p.x0-100&&c<p.x1+100))continue;
    if([-100,-50,50,100].every(d=>groundAt(z,c+d)===g)&&!z.seg.some(sg=>sg[3]&&sg[0]<c+90&&sg[0]+sg[1]>c-90&&sg[2]>g-60)){x=c;break}}
  if(x!==null)z.cache=[x,climb(z,x,118,70)]}
const CACHE_Y=z=>z.cache[1]||topAt(z.cache[0]);
const cacheX=z=>z.cache[0];
function cacheOpen(){pl.flags.cache=pl.flags.cache||{};const z=Z,lv=z.lv[1],sh=Math.round(lv*7+20);pl.flags.cache[z.id]=1;pl.shards+=sh;
  const rs=(z.nodes||[]).map(n=>n.r).filter(r=>RES[r]);const r=rs.length?rs[Math.floor(Math.random()*rs.length)]:'herb';addMat(r,2,pl.x,pl.y);if(Math.random()<.5)pl.pots=(pl.pots||0)+1;
  S.nums.push({x:pl.x,y:pl.y-30,txt:'+'+sh+' shards',t:0,c:'#ffd27a'});banner(z.vert?'Hidden cache':'High cache','You found what someone left up here');sfx.pick();
  for(let i=0;i<16;i++)S.parts.push({x:pl.x,y:pl.y-10,vx:(Math.random()-.5)*80,vy:-40-Math.random()*40,t:0,life:.8,c:i%2?'#ffd27a':'#fff4c2',g:120,s:2});save()}
const _cnV=crNear;crNear=function(){const z=Z;if(z&&z.cache&&!(pl.flags.cache||{})[z.id]&&pl.onG){const x=cacheX(z),y=CACHE_Y(z);if(Math.abs(pl.x-x)<22&&Math.abs(pl.y-y)<4)return{k:'cache'}}return _cnV()};
const _cuV=crUse;crUse=function(n){if(n&&n.k==='cache')return cacheOpen();return _cuV(n)};
const _clV=crLabel;crLabel=function(n){if(n&&n.k==='cache')return'Open · '+(Z.vert?'Hidden cache':'High cache');return _clV(n)};
function drawVert(cx,cy){const z=Z;if(!z||!pl.flags)return;if(z.cache&&!(pl.flags.cache||{})[z.id]){const X=cacheX(z),x=ri(X-cx),y=ri(CACHE_Y(z)-cy);if(x>-20&&x<W+20){
    g.fillStyle='#000';g.fillRect(x-8,y-10,16,10);g.fillStyle='#7a4a24';g.fillRect(x-7,y-9,14,8);g.fillStyle='#a8682e';g.fillRect(x-7,y-9,14,2);g.fillStyle='#e3b04b';g.fillRect(x-1,y-6,3,3);
    if(Math.sin(S.t*3)>.3){g.fillStyle='#fff4c2';g.fillRect(x+5,y-13,1,1)}}}}
const _dsV=drawSealed;drawSealed=function(cx,cy){_dsV(cx,cy);drawVert(cx,cy)};
/* arrive on the ledge, not under it */
const _ezV=enterZone;enterZone=function(i,tx){const r=_ezV(i,tx);if(tx!=null){const po=Z.portals.find(p=>p.yy&&Math.abs(p.x-tx)<2);if(po){pl.y=po.yy;pl.onG=true;S.camY=clamp(pl.y-H*.64,0,WH-H)}}return r};
