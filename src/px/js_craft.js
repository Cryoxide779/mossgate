/* ---------- field work + crafting (Bible ch.15–17, region resources ch.3.14) ---------- */
const RES={timber:{n:'Timber',c:'#8f5a31',d:'logging'},herb:{n:'Herbs',c:'#86b47f',d:'herbalism'},ore:{n:'Iron Ore',c:'#9aa0a8',d:'mining'},mush:{n:'Dark Mushrooms',c:'#7a4aa0',d:'herbalism'},
  shard:{n:'Shardstone',c:'#c9a8ff',d:'mining'},fish:{n:'Fish',c:'#6ec6e2',d:'fishing'},salvage:{n:'Salvage',c:'#c8a050',d:'salvage'},hide:{n:'Leather',c:'#a0704a',d:'hunting'},meat:{n:'Meat',c:'#d4483a',d:'hunting'}};
const NODES={road:[['herb',150],['salvage',360],['timber',1000],['herb',1150]],outskirts:[['timber',300],['herb',600],['timber',800],['herb',1100],['timber',1250]],
  oak:[['timber',400],['herb',700],['timber',1150],['mush',1320]],falls:[['herb',250],['fish',495],['herb',1200]],stonebridge:[['fish',700]],
  bog:[['mush',120],['fish',410],['mush',650],['mush',1200],['herb',1450]],tower:[['ore',350],['salvage',600],['salvage',1000],['ore',1250]],
  gate:[['ore',300],['ore',900],['salvage',1300]],scar:[['shard',360],['shard',760],['ore',1000],['shard',1480]],
  sawmill:[['timber',400],['salvage',620],['salvage',860],['timber',1360],['ore',1540]],reach:[['mush',180],['herb',600],['mush',820],['mush',1310],['shard',1450]],mossroot:[['mush',250],['herb',560],['timber',700],['mush',1010],['herb',1290]]};
const STATIONS={town:[{x:250,k:'cook',n:'Wayfarer Campfire'},{x:560,k:'forge',n:'Workyard'},{x:670,k:'alchemy',n:'Herbalist’s Rack'}],stonebridge:[{x:450,k:'forge',n:'Iron Market Forge'}],
  road:[{x:726,k:'cook',n:'Ren’s Campfire'}],outskirts:[{x:492,k:'cook',n:'Logger’s Campfire'}],bog:[{x:240,k:'alchemy',n:'Sef’s Rack'}],sawmill:[{x:300,k:'forge',n:'Scrapcap Workshop',req:'m14'}],mossroot:[{x:420,k:'alchemy',n:'Burrow Stillroom',req:'m16'}]};
const ST_DISC={forge:['smith','wood','leather'],alchemy:['alchemy'],cook:['cooking']};
for(const z of ZONES){z.nodes=(NODES[z.id]||[]).map(([r,x])=>({r,x:x+EDGE,ch:3,regrow:0}));z.stations=(STATIONS[z.id]||[]).map(s=>({...s,x:s.x+EDGE}));
  if(z.id==='bog')z.props.push(['rack',240+EDGE])}
const BUFF_N={stew:'Fisher’s Stew',skewer:'Hunter’s Skewer',ward:'Ward Draught',vigor:'Vigor Draught'};
const RECIPES=[
  {id:'katana',d:'smith',r:1,n:'Iron Katana',make:['weapon','katana'],need:{ore:3,timber:1}},
  {id:'knives',d:'smith',r:1,n:'Iron Knives',make:['weapon','daggers'],need:{ore:2,hide:1}},
  {id:'greaves',d:'smith',r:1,n:'Iron Greaves',make:['feet'],need:{ore:3}},
  {id:'gaunt',d:'smith',r:2,n:'Iron Gauntlets',make:['hands'],need:{ore:3,hide:1}},
  {id:'helm',d:'smith',r:2,n:'Ironbound Helm',make:['head'],need:{ore:4,hide:1}},
  {id:'plate',d:'smith',r:3,n:'Iron Plate',make:['chest'],need:{ore:6,hide:2}},
  {id:'scharm',d:'smith',r:3,n:'Shardstone Charm',make:['charm'],need:{shard:3,ore:1}},
  {id:'sblade',d:'smith',r:6,n:'Shardsteel Blade',set:'shardsteel',min:2,make:['weapon','katana'],need:{ore:4,shard:3}},
  {id:'sknives',d:'smith',r:6,n:'Shardsteel Knives',set:'shardsteel',min:2,make:['weapon','daggers'],need:{ore:3,shard:3}},
  {id:'bow',d:'wood',r:1,n:'Ash Bow',make:['weapon','bow'],need:{timber:3,hide:1}},
  {id:'staff',d:'wood',r:1,n:'Oak Staff',make:['weapon','staff'],need:{timber:3,herb:1}},
  {id:'sbow',d:'wood',r:5,n:'Shardstring Bow',set:'shardsteel',min:2,make:['weapon','bow'],need:{timber:3,shard:2,hide:1}},
  {id:'sstaff',d:'wood',r:5,n:'Shard-tipped Staff',set:'shardsteel',min:2,make:['weapon','staff'],need:{timber:3,shard:2}},
  {id:'jerkin',d:'leather',r:1,n:'Leather Jerkin',set:'leatherwork',make:['chest'],need:{hide:4}},
  {id:'hood',d:'leather',r:1,n:'Leather Hood',set:'leatherwork',make:['head'],need:{hide:2}},
  {id:'boots',d:'leather',r:1,n:'Leather Boots',set:'leatherwork',make:['feet'],need:{hide:2,timber:1}},
  {id:'gloves',d:'leather',r:1,n:'Leather Gloves',set:'leatherwork',make:['hands'],need:{hide:2}},
  {id:'tome',d:'leather',r:2,n:'Bound Grimoire',set:'leatherwork',make:['weapon','tome'],need:{hide:2,herb:2,mush:1}},
  {id:'stome',d:'leather',r:6,n:'Shardbound Codex',set:'shardsteel',min:2,make:['weapon','tome'],need:{hide:2,shard:3,mush:1}},
  {id:'tonic',d:'alchemy',r:1,n:'Moss Tonic ×2',use:'pots',need:{herb:2,mush:1}},
  {id:'ward',d:'alchemy',r:3,n:'Ward Draught',use:'ward',need:{herb:2,shard:1}},
  {id:'vigor',d:'alchemy',r:2,n:'Vigor Draught',use:'vigor',need:{mush:2,herb:1}},
  {id:'stew',d:'cooking',r:1,n:'Fisher’s Stew',use:'stew',need:{fish:2,herb:1}},
  {id:'skewer',d:'cooking',r:1,n:'Hunter’s Skewer',use:'skewer',need:{meat:2,herb:1}}];
const USE_D={pots:'Adds 2 tonics.',ward:'+15 defense for 2 minutes.',vigor:'Doubles MP recovery for 2 minutes.',stew:'Recover 3 HP every second for 2 minutes.',skewer:'+10% attack for 2 minutes.'};
const mat=k=>(pl.mat&&pl.mat[k])||0;
function addMat(k,n,x,y){pl.mat=pl.mat||{};pl.mat[k]=mat(k)+n;S.nums.push({x:x??pl.x,y:(y??pl.y)-40,txt:'+'+n+' '+RES[k].n.toUpperCase(),t:-.1,c:RES[k].c});qGather(k,n)}
/* gathering */
function nearNode(){for(const nd of Z.nodes||[]){if(nd.ch<=0)continue;if(nd.r==='fish'){const P0=Z.pools.find(q=>nd.x>=q.x0&&nd.x<=q.x1);if(P0&&pl.x>P0.x0-12&&pl.x<P0.x1+12&&Math.abs(pl.x-nd.x)<60)return nd;continue}
  if(Math.abs(pl.x-nd.x)<18&&Math.abs(pl.y-topAt(nd.x))<26)return nd}return null}
function nearStation(){return(Z.stations||[]).find(s=>Math.abs(pl.x-s.x)<34&&pl.onG)||null}
function gather(nd){if(S.t-(pl.gT||-9)<.7)return;pl.gT=S.t;const R0=RES[nd.r],d=R0.d,rk2=dRank(d),n=1+(Math.random()<.25+.06*rk2?1:0);nd.ch--;if(nd.ch<=0)nd.regrow=45;
  addMat(nd.r,n,nd.x,topAt(nd.x));crGather(nd);regionGather(nd);dGain(d,6+rk2);for(let i=0;i<8;i++)S.parts.push({x:nd.x+rnd(-6,6),y:topAt(nd.x)-6,vx:rnd(-40,40),vy:rnd(-90,-30),t:0,life:.5,c:R0.c,g:300,s:1});
  ({timber:()=>noise(.08,.06,700),ore:()=>tone(1200,.06,'square',.03,-300),shard:()=>tone(1600,.2,'triangle',.03,400),fish:()=>tone(300,.2,'sine',.04,200)}[nd.r]||(()=>sfx.pick()))();save()}
function tickNodes(dt){for(const nd of Z.nodes||[])if(nd.ch<=0){nd.regrow-=dt;if(nd.regrow<=0)nd.ch=3}}
/* hunting: beasts give hide and meat */
const BEAST={wolf:1,boar:1,rotstag:1,bear:1,lurker:1,stalker:1};
function huntDrops(m){if(BEAST[m.t]){const h=dRank('hunting');if(Math.random()<.45+.04*h+crHunt())addMat('hide',1,m.x,m.y-10);if(Math.random()<.4+.03*h+crHunt())addMat('meat',1,m.x,m.y-20);dGain('hunting',4)}
  if((m.t==='gob'||m.t==='raider'||m.t==='husk')&&Math.random()<.3)addMat('salvage',1,m.x,m.y-10)}
/* buffs */
function useBuff(k){pl.buffs=pl.buffs||{};pl.buffs[k]=120;recalc();hudK='';banner('2:00',BUFF_N[k])}
function tickBuffs(dt){if(!pl.buffs)return;let ch=0;for(const k in pl.buffs){pl.buffs[k]-=dt;if(pl.buffs[k]<=0){delete pl.buffs[k];ch=1}}if(ch)recalc();
  if(pl.buffs.stew){pl.stewT=(pl.stewT||0)+dt;if(pl.stewT>=1){pl.stewT=0;if(pl.hp<pl.mhp)pl.hp=Math.min(pl.mhp,pl.hp+3)}}}
function buffMods(m){const b=pl.buffs||{};if(b.ward)m.def+=15;if(b.skewer)m.atkP+=.1;if(b.vigor)m.mpR=(m.mpR||1)*2;return m}
/* crafting */
const rcpOk=R=>(!R.flag||!!(pl.flags&&pl.flags[R.flag]))&&(dRank(R.d)>=R.r||(R.r===1&&dRank(R.d)>=0));
const hasMats=R=>Object.entries(R.need).every(([k,n])=>mat(k)>=n);
function craftRarity(R){const r=dRank(R.d),x=Math.random();let q=x<.02+.04*Math.max(0,r-5)?3:x<.1+.05*r?2:x<.4+.04*r?1:0;return Math.max(q,R.min||0)}
function doCraft(R){if(!hasMats(R)||!rcpOk(R))return;for(const[k,n]of Object.entries(R.need))pl.mat[k]-=n;let msg;
  if(R.use==='crisis'){pl.relief=pl.relief||{};pl.relief[R.id]=(pl.relief[R.id]||0)+1;msg=R.n+(R.qe?'':' (relief supply)');if(R.qe)qEvent(R.qe)}else if(R.use==='pots3'){pl.pots=Math.min(9,pl.pots+3);msg='+3 tonics'}else if(R.use==='purge'){usePurge();msg='Resonance calmed'}else if(R.use){if(R.use==='pots'){pl.pots=Math.min(9,pl.pots+2);msg='+2 tonics'}else{useBuff(R.use);msg=BUFF_N[R.use]}}
  else{const[slot,weap]=R.make,rar=craftRarity(R),it=makeItem(R.set||'ironwork',slot,weap||null,rar,Math.max(1,pl.lv));for(const k in it.st)it.st[k]=Math.round(it.st[k]*1.15);if(R.tune)for(const k in R.tune)if(it.st[k])it.st[k]=Math.max(1,Math.round(it.st[k]*R.tune[k]));if(R.add)for(const k in R.add)it.st[k]=(it.st[k]||0)+Math.max(1,Math.round(BASE_ST[k]*(k==='crit'?1+.08*(it.lv-1):1+.25*(it.lv-1))*RAR[rar].m*1.15*R.add[k]));it.by=pl.ch.name;it.rcp=R.id;
    if(pl.bag.length<BAG_MAX)pl.bag.push(it);else S.drops.push({k:'gear',it,x:pl.x,y:pl.y-8,vx:0,vy:-160,t:0});msg=RAR[rar].n+' '+itemName(it)}
  dGain(R.d,10+Object.values(R.need).reduce((a,b)=>a+b,0)*3);qCraft();[523,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.12,'square',.03),i*80));S.craftMsg=msg;save()}
let CRAFT=null;
function openCraft(st){CRAFT={st,d:ST_DISC[st.k][0],sel:null};pauseFor('craft');renderCraft()}
function renderCraft(){if(!CRAFT)return;const st=CRAFT.st,ds=ST_DISC[st.k],list=RECIPES.filter(R=>R.d===CRAFT.d&&(!R.flag||(pl.flags&&pl.flags[R.flag])));if(!CRAFT.sel||!list.some(R=>R.id===CRAFT.sel))CRAFT.sel=list[0].id;const R=list.find(x=>x.id===CRAFT.sel);
  $('crname').textContent=st.n;
  $('crtabs').innerHTML=ds.map(d=>`<button class="dtab${d===CRAFT.d?' sel':''}" data-cd="${d}">${DISC[d].n}<b>${dRank(d)}</b></button>`).join('');
  $('crlist').innerHTML=list.map(x=>`<button class="qi${x.id===CRAFT.sel?' sel':''}${rcpOk(x)?'':' dn'}" data-cr="${x.id}"><b>${x.n}</b><span>${rcpOk(x)?(hasMats(x)?'Ready to make':'Missing materials'):'Needs '+DISC[x.d].n+' rank '+x.r}</span></button>`).join('');
  const needH=Object.entries(R.need).map(([k,n])=>`<li style="color:${mat(k)>=n?'var(--cream)':'#ff6b6b'}">${RES[k].n} <b>${mat(k)}/${n}</b></li>`).join(''),r=dRank(R.d);
  const what=R.use?(R.desc||USE_D[R.use])+(R.use==='crisis'?' You hold '+relief(R.id)+'.':''):`${R.make[1]?WEAP_N[R.make[1]]:SLOT_N[R.make[0]]} · item level ${pl.lv} · crafted gear is 15% stronger and carries your name`+(R.min?' · always Rare or better':'')+(R.prop?'<br><i>'+R.prop+'</i>':'')+(R.add?' · adds '+Object.keys(R.add).map(k=>STAT_N[k]||k).join(', '):'');
  $('crdet').innerHTML=`<div class="dn">${R.n}</div><div class="dm">${DISC[R.d].n} · rank ${R.r} recipe · your rank ${r}</div><p>${what}</p><ul>${needH}</ul>
    ${R.use?'':`<p class="dm">Higher ${DISC[R.d].n} rank raises the chance of Fine, Rare and Relic results.</p>`}${S.craftMsg?`<p style="color:var(--moss)">Made: ${S.craftMsg}</p>`:''}
    <div class="acts"><button class="btn sm" data-crdo="1" ${hasMats(R)&&rcpOk(R)?'':'disabled'}>Craft</button></div>`;
  $('crmat').innerHTML=Object.keys(RES).map(k=>`<span style="--c:${RES[k].c}">${RES[k].n} <b>${mat(k)}</b></span>`).join('')}
$('craft').addEventListener('click',e=>{const b=e.target.closest('[data-cd],[data-cr],[data-crdo],#crclose');if(!b)return;
  if(b.id==='crclose'){CRAFT=null;S.craftMsg='';return unpause('craft')}
  if(b.dataset.cd){CRAFT.d=b.dataset.cd;CRAFT.sel=null;S.craftMsg=''}else if(b.dataset.cr){CRAFT.sel=b.dataset.cr;S.craftMsg=''}else if(b.dataset.crdo){doCraft(RECIPES.find(x=>x.id===CRAFT.sel))}
  renderCraft()});
/* ---------- resource node art (pre-rendered, shaded, outlined) ---------- */
const NODE_SPR={};
function nodeLayer(w,h,draw){const L=layer(w,h);let keep=TH;TH={...RAMP};draw(L);TH=keep;outlineL(L,hex(K.out));commit(L);return L.c}
function rockBody(L,cx,cy,rx,ry,seed,ramp){for(let y=Math.floor(cy-ry-1);y<=cy+ry+1;y++)for(let x=Math.floor(cx-rx-1);x<=cx+rx+1;x++){
  const nx=(x-cx)/rx,ny=(y-cy)/ry,a=Math.atan2(ny,nx),edge=1+(vn(a*2.2+seed,seed*.3,seed)-.5)*.28,r=Math.hypot(nx,ny)/edge;if(r>1||y>cy+ry*.82)continue;
  const nz=Math.sqrt(Math.max(0,1-r*r)),light=-.55*nx-.75*ny+.55*nz;let t=.2+light*.55+(fbm(x*.35,y*.35,seed)-.5)*.35;
  if(r>.9)t-=.18;if(fbm(x*.6,y*.15,seed+4)>.7)t-=.2;sp(L,x,y,pick(ramp,t,x,y))}}
function oreArt(dep){return nodeLayer(32,24,L=>{const R0=R(['#151a1c','#22292b','#323b3b','#46504c','#5e6862','#7c867a','#9aa290']),cx=15,cy=14;
  if(dep){rockBody(L,cx-3,cy+4,8,5,31,R0);rockBody(L,cx+7,cy+6,4,3,37,R0);[[cx-2,cy+2],[cx+4,cy+3],[cx-7,cy+5]].forEach(([x,y])=>{sp(L,x,y,[120,74,42]);sp(L,x+1,y,[84,52,32])});return}
  rockBody(L,cx+8,cy+5,5,4,23,R0);rockBody(L,cx,cy,11,9,17,R0);rockBody(L,cx-10,cy+6,4,3,29,R0);
  const inR=(x,y)=>{const nx=(x-cx)/10.5,ny=(y-cy)/8.5;return nx*nx+ny*ny<.82&&has(L,x,y)};
  const vein=(x0,x1,y0,amp,ph,w)=>{for(let x=x0;x<=x1;x++){const y=Math.round(y0+Math.sin(x*.45+ph)*amp+(x-x0)*.18);for(let k=0;k<w;k++){if(!inR(x,y+k))continue;sp(L,x,y+k,k===0?[226,150,82]:[164,92,46])}if(inR(x,y-1))sp(L,x,y-1,[90,58,40])}};
  vein(cx-8,cx+2,cy-3,1.6,0,2);vein(cx-3,cx+8,cy+2,1.2,2,2);vein(cx-6,cx-1,cy+5,.8,4,1);
  const nug=(x,y)=>{if(!inR(x,y))return;sp(L,x,y,[255,236,196]);sp(L,x+1,y,[214,168,110]);sp(L,x,y+1,[176,120,70]);sp(L,x+1,y+1,[120,78,46]);sp(L,x-1,y,[150,100,60])};
  nug(cx-5,cy-5);nug(cx+3,cy-1);nug(cx-1,cy+3);nug(cx+6,cy+4);
  for(let x=cx-9;x<=cx+9;x++)for(let y=cy-9;y<cy;y++){if(has(L,x,y)&&!has(L,x,y-1)&&hash(x,3,11)>.45){sp(L,x,y,pick(RAMP.moss,.6,x,y));if(hash(x,4,11)>.6&&has(L,x,y+1))sp(L,x,y+1,pick(RAMP.moss,.4,x,y))}}
  for(const[x,y]of[[cx-13,cy+8],[cx-12,cy+8],[cx+13,cy+8],[cx+3,cy+9]])sp(L,x,y,R0[3])})}
function shardArt(dep){return nodeLayer(30,30,L=>{const R0=RAMP.rock,cx=15,cy=24,C=[[42,20,54],[78,34,82],[138,74,176],[201,168,255],[240,224,255]];
  rockBody(L,cx,cy,11,5,41,R0);if(dep){[[cx-3,3],[cx+4,2]].forEach(([x,h])=>{for(let k=0;k<h;k++)sp(L,x,cy-5-k,C[1])});return}
  const crys=(bx,by,h,w,lean)=>{for(let k=0;k<h;k++){const ww=Math.max(1,Math.round(w*(1-k/h*.75))),x0=Math.round(bx+lean*k);for(let i=-ww;i<=ww;i++){const face=i<0?(k%3?C[2]:C[1]):C[3];sp(L,x0+i,by-k,face)}if(k>h-3)sp(L,x0,by-k,C[4])}sp(L,Math.round(bx+lean*(h-1)),by-h,C[4])};
  crys(cx-1,cy-4,16,3,.12);crys(cx-7,cy-3,10,2,-.3);crys(cx+6,cy-3,11,2,.35);crys(cx+2,cy-2,6,1,.6)})}
function timberArt(dep){return nodeLayer(34,16,L=>{const B=RAMP.bark,M=RAMP.moss,cy=10;
  if(dep){for(let y=4;y<15;y++)for(let x=11;x<23;x++){const u=(x-11)/12;sp(L,x,y,pick(B,.25+Math.sin(u*Math.PI)*.45,x,y))}for(let x=11;x<23;x++){const d=Math.abs(x-17);sp(L,x,4,d%3===0?[120,80,46]:[200,160,110]);sp(L,x,5,[170,128,82])}sp(L,17,4,[90,58,34]);return}
  for(let x=2;x<28;x++)for(let y=cy-5;y<=cy+4;y++){const v=(y-cy)/5;if(x<5&&Math.abs(v)>(x-1)/4+.1+hash(y,1,5)*.2)continue;const t=.6-v*.5+(fbm(x*.18,y*1.4,3)-.5)*.35-(hash(x,y,9)>.86?.25:0);sp(L,x,y,pick(B,t,x,y))}
  for(let x=3;x<27;x+=5)for(let k=0;k<3;k++)sp(L,x+k,cy-3+((x+k)%3),B[1]);
  for(let y=cy-5;y<=cy+4;y++)for(let x=27;x<32;x++){const dx=(x-29.5)/2.6,dy=(y-cy+.5)/4.8;const r=Math.hypot(dx,dy);if(r>1)continue;const ring=Math.floor(r*4)%2;sp(L,x,y,r>.85?[90,58,34]:ring?[198,152,98]:[226,186,128])}
  sp(L,29,cy,[140,96,58]);for(let k=0;k<4;k++)sp(L,9+k,cy-6-k,B[3]);sp(L,13,cy-10,M[4]);sp(L,12,cy-10,M[3]);
  for(let i=0;i<14;i++){const x=4+Math.floor(hash(i,1,7)*22),y=cy-5+Math.floor(hash(i,2,7)*2);sp(L,x,y,pick(M,.5+hash(i,3,7)*.3,x,y))}
  [[6,cy+3],[20,cy+4]].forEach(([x,y])=>{sp(L,x,y-1,[220,200,170]);sp(L,x-1,y-2,[200,80,60]);sp(L,x,y-2,[232,96,70]);sp(L,x+1,y-2,[200,80,60])})})}
function herbArt(dep){return nodeLayer(24,18,L=>{const Lf=RAMP.leaf,cx=12,g=17;
  const leaf=(x,y,dx,dy,len)=>{for(let k=0;k<len;k++){const px=Math.round(x+dx*k),py=Math.round(y+dy*k);sp(L,px,py,pick(Lf,.35+k/len*.45,px,py));if(k>0&&k<len-1)sp(L,px+(dx>0?0:1),py+1,pick(Lf,.25,px,py))}};
  const n=dep?4:9;for(let i=0;i<n;i++){const a=-Math.PI*(.12+.76*i/(n-1)),len=(dep?4:7)+hash(i,4,2)*3;leaf(cx,g,Math.cos(a)*.9,Math.sin(a),len)}
  for(let x=cx-4;x<=cx+4;x++)sp(L,x,g,Lf[1]);if(dep)return;
  [[cx-5,g-8],[cx+5,g-7],[cx,g-11],[cx-2,g-6]].forEach(([x,y],i)=>{const c=i%2?[236,226,250]:[196,150,230];sp(L,x,y,c);sp(L,x-1,y,c);sp(L,x+1,y,c);sp(L,x,y-1,c);sp(L,x,y+1,c);sp(L,x,y,[255,230,140])})})}
function mushArt(dep){return nodeLayer(24,20,L=>{const g=19;
  const cap=(cx,top,w,h,stem)=>{for(let y=top+h;y<g;y++){sp(L,cx-1,y,[208,196,176]);sp(L,cx,y,[230,220,200]);if(stem>2)sp(L,cx+1,y,[180,168,150])}
    for(let y=0;y<h;y++){const ww=Math.round(w*Math.sqrt(1-((h-y)/h)**2*.85));for(let x=-ww;x<=ww;x++){const t=.25+(-x/w)*.25+(y/h)*-.2+.35;sp(L,cx+x,top+y,t>.55?[150,92,186]:t>.4?[112,62,150]:[74,38,104])}}
    for(let x=-w+1;x<w;x++)sp(L,cx+x,top+h,[60,40,60]);[[-w+2,1],[1,0],[w-3,2]].forEach(([dx,dy])=>{if(top+dy<top+h)sp(L,cx+dx,top+dy+1,[236,220,250])})};
  if(dep){cap(12,14,2,2,1);return}cap(8,8,5,4,3);cap(16,11,4,3,2);cap(12,4,3,3,2)})}
function salvageArt(dep){return nodeLayer(34,20,L=>{const W0=RAMP.wood,g=19;
  for(let i=0;i<3;i++){const y=g-2-i*3,x0=4+i*3,x1=26-i*2;for(let x=x0;x<x1;x++){sp(L,x,y,pick(W0,.5+(x%9===0?-.25:0)+(fbm(x*.3,y,i)-.5)*.3,x,y));sp(L,x,y+1,pick(W0,.25,x,y))}}
  if(dep)return;
  const wx=24,wy=g-7;for(let a=0;a<28;a++){const an=a/28*6.28;sp(L,Math.round(wx+Math.cos(an)*6),Math.round(wy+Math.sin(an)*6),W0[2]);sp(L,Math.round(wx+Math.cos(an)*5),Math.round(wy+Math.sin(an)*5),W0[4])}
  for(let k=-5;k<=5;k++){sp(L,wx+k,wy,W0[3]);sp(L,wx,wy+k,W0[3])}sp(L,wx,wy,[154,166,174]);
  for(let x=6;x<14;x++){sp(L,x,g-11,[154,166,174]);sp(L,x,g-10,[106,112,120])}sp(L,13,g-12,[200,206,212]);
  for(let y=g-14;y<g-9;y++)for(let x=15;x<19;x++)sp(L,x,y,(x+y)%2?[178,58,46]:[143,42,34]);
  [[9,g-1],[20,g-1]].forEach(([x,y])=>{sp(L,x,y,[200,160,80]);sp(L,x+1,y,[160,120,50])})})}
function buildNodeArt(){NODE_SPR.ore=[oreArt(0),oreArt(1)];NODE_SPR.shard=[shardArt(0),shardArt(1)];NODE_SPR.timber=[timberArt(0),timberArt(1)];NODE_SPR.herb=[herbArt(0),herbArt(1)];NODE_SPR.mush=[mushArt(0),mushArt(1)];NODE_SPR.salvage=[salvageArt(0),salvageArt(1)]}

/* world drawing */
function drawNodes(cx,cy){for(const nd of Z.nodes||[]){const x=ri(nd.x-cx);if(x<-20||x>W+20)continue;const dep=nd.ch<=0;let y;
    if(nd.r==='fish'){const P0=Z.pools.find(q=>nd.x>=q.x0&&nd.x<=q.x1);if(!P0)continue;y=ri(P0.y-cy);if(dep)continue;for(let i=0;i<3;i++){const r=3+((S.t*8+i*5)%10);g.globalAlpha=.6*(1-r/13);g.fillStyle='#fff';g.fillRect(x-r,y+1,r*2,1)}g.globalAlpha=1;g.fillStyle='#bff0ff';g.fillRect(x+ri(Math.sin(S.t*3)*4),y-1,2,1);continue}
    y=ri(topAt(nd.x)-cy);const R0=RES[nd.r];if(!NODE_SPR.ore)buildNodeArt();const img=NODE_SPR[nd.r][dep?1:0];
    g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-ri(img.width*.35),y,ri(img.width*.7),1);g.globalAlpha=dep?.75:1;g.drawImage(img,x-(img.width>>1),y-img.height+(nd.r==='ore'||nd.r==='shard'?3:1));
    if(!dep&&(nd.r==='ore'||nd.r==='shard')&&Math.floor(S.t*2+nd.x)%7===0){g.fillStyle='#fff';const gx=x-4+((nd.x*7)%9),gy=y-8-((nd.x*3)%5);g.fillRect(gx,gy,1,1);g.globalAlpha=.6;g.fillRect(gx-1,gy,3,1);g.fillRect(gx,gy-1,1,3)}
    if(!dep&&nd.r==='shard'){g.save();g.globalCompositeOperation='lighter';glow(x,y-12,14,'201,168,255',.18);g.restore()}
    if(!dep&&nd.r==='mush'){g.save();g.globalCompositeOperation='lighter';glow(x,y-8,9,'150,92,186',.15);g.restore()}
    g.globalAlpha=1;if(!dep&&S.nearNode===nd){ptext('▲ '+R0.n.toUpperCase(),x,y-20+Math.sin(S.t*4),'#f2e6c8')}}
  for(const st of Z.stations||[]){if(S.nearSt===st){const x=ri(st.x-cx),y=ri(standAt(st.x)-cy);ptext('▲ '+st.n.toUpperCase(),x,y-34+Math.sin(S.t*4),'#ffd27a')}}
  const bk=Object.keys(pl.buffs||{});if(bk.length){bk.forEach((k,i)=>{const t=Math.ceil(pl.buffs[k]);ptext(BUFF_N[k].toUpperCase()+' '+Math.floor(t/60)+':'+String(t%60).padStart(2,'0'),W-70,H-120-i*10,'#c8d468')})}}
