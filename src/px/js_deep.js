/* ---------- The Veinway Deep: 100 floors under CrestHollow, built for parties (Bible 22: Veinway Complex, anchors, party instances) ---------- */
const DEEP_BANDS=[
  {t:'den',n:'Root Caverns',mobs:['sporecap','wolf','sapslime','boar'],props:['shroom','lantern','cairn','reeds'],boss:'sawtusk'},
  {t:'dusk',n:'Drowned Ruins',mobs:['husk','gob','raider','wisp'],props:['pillar','gatepiece','grave','banner'],boss:'rotqueen'},
  {t:'heath',n:'Warden Bastion',mobs:['gob','raider','husk','lantern'],props:['banner','brazier','crates','blade'],boss:'warden'},
  {t:'oak',n:'Ossuary of the Orders',mobs:['husk','wisp','stalker','treant'],props:['grave','cairn','deadoak','pillar'],boss:'rootheart'},
  {t:'scar',n:'Concordance Laboratories',mobs:['shardslime','scargob','drake','bear'],props:['shard','sealstone','brazier','gatepiece'],boss:'unbound'},
  {t:'falls',n:'Flooded Sanctum',mobs:['lurker','bogslime','wisp','drake'],props:['reeds','pillar','lantern','gatepiece'],boss:'sawtusk'},
  {t:'bog',n:'Brood Warrens',mobs:['rotfly','lurker','stalker','sporecap'],props:['reeds','shroom','grave','rootmass'],boss:'rotqueen'},
  {t:'rot',n:'Rot Gardens',mobs:['sporecap','rotfly','sapslime','treant'],props:['shroom','rootmass','deadoak','reeds'],boss:'rootheart'},
  {t:'inner',n:'Veinway Fractures',mobs:['fiend','scargob','shardslime','drake'],props:['shard','sealstone','brazier','banner'],boss:'warden'},
  {t:'blood',n:'The Heart Below',mobs:['fiend','bear','husk','scargob'],props:['brazier','shard','sealstone','gatearch'],boss:'unbound'}];
const AFFIX={frenzied:{n:'Frenzied',d:'Enemies hit 25% harder'},ironhide:{n:'Ironhide',d:'Enemies have 40% more health'},swift:{n:'Swift',d:'Enemies move 30% faster'},bountiful:{n:'Bountiful',d:'50% more shards and experience'},stalwart:{n:'Stalwart',d:'Enemy poise is doubled'}};
const DEEP_STAIR=1640;
const DI=ZONES.length;
{const z={id:'deep',name:'The Veinway Deep',ch:'Veinway Deep',theme:'den',lv:[5,5],req:5,ww:900,start:70,seg:[[0,900,250]],mobs:[],portals:[{x:22,to:5,tx:DEEP_STAIR}],props:[],trees:[]};prepZone(z);z.nodes=[];z.stations=[];ZONES.push(z)}
{const t=ZONES.find(z=>z.id==='town');t.portals.push({x:DEEP_STAIR+EDGE,to:DI,tx:70});t.labels.push([DEEP_STAIR+EDGE,'Veinway Stair',56]);t.props.push(['gatearch',DEEP_STAIR+EDGE])}
const DP=()=>pl.deep||(pl.deep={best:0,anchor:0,runs:0});
function mulberry(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function floorAffixes(n){if(n<11)return[];const r=mulberry(n*7919+3),k=Object.keys(AFFIX),o=[];const cnt=n>=51?2:1;while(o.length<cnt){const a=k[r()*k.length|0];if(!o.includes(a))o.push(a)}return o}
function genFloor(n){const r=mulberry(n*9973+17),bi=Math.min(9,Math.floor((n-1)/10)),B=DEEP_BANDS[bi],boss=n%10===0,lv=deepLv(n);
  const ww=boss?960:Math.min(1700,1100+bi*40+Math.round(r()*260)),seg=[],mobs=[],props=[];
  if(boss){seg.push([0,ww,250]);seg.push([260,90,206,'f']);seg.push([ww-350,90,206,'f'])}
  else{let x=0,y=250;while(x<ww){let w=Math.round(170+r()*190);if(ww-x-w<140)w=ww-x;seg.push([x,w,y]);x+=w;const ny=y+(r()<.5?-1:1)*Math.round(8+r()*10);y=clamp(ny,214,252)}
    const ground=seg.length;for(let i=0;i<ground;i++){const s=seg[i];if(s[1]>220&&r()<.8)seg.push([Math.round(s[0]+40+r()*(s[1]-140)),Math.round(70+r()*40),s[2]-Math.round(40+r()*18),'f'])}
    const nm=Math.min(16,6+Math.floor(n/7));for(let i=0;i<nm;i++){const t=B.mobs[r()*B.mobs.length|0];if(MOBS[t].fly){mobs.push([t,-2,Math.round(240+r()*(ww-320))]);continue}
      let si=1+Math.floor(r()*(seg.length-1));if(seg[si][0]<220)si=Math.min(seg.length-1,si+1);mobs.push([t,si,seg[si][0]+seg[si][1]/2])}
    for(let i=0;i<5;i++)props.push([B.props[r()*B.props.length|0],Math.round(120+i*(ww-200)/5+r()*60)])}
  if(boss)mobs.push([B.boss,0,ww-240]);
  const z={id:'deep',name:'Veinway Deep · Floor '+n,ch:B.n,theme:B.t,lv:[lv,Math.min(CAP,lv+(boss?0:1))],req:5,ww,start:70,seg,mobs,portals:[{x:22,to:5,tx:DEEP_STAIR}],props,trees:[],floor:n,band:bi};
  prepZone(z);z.nodes=[];z.stations=[];return z}
/* run state */
function deepEnter(n,solo){const D=DP();S.deep={n,solo:!!solo,clear:false,aff:floorAffixes(n),t0:S.t,stair:null};ZONES[DI]=genFloor(n);delete ZCACHE[DI];
  const f=$('fade');f.style.opacity=1;S.paused=true;sfx.portal();
  setTimeout(()=>{enterZone(DI,ZONES[DI].start);S.paused=false;f.style.opacity=0;deepSetup()},320)}
function deepSetup(){const n=S.deep.n,aff=S.deep.aff,boss=n%10===0;let i=0;
  for(const m of S.mobs){if(m.cr)continue;Object.assign(m,spawnMob(m.def,Z.lv[0]+(hash(n,i,77)>.5?Z.lv[1]-Z.lv[0]:0)));m.dir=1;m.di=i++;m.temp=1;deepOverMob(m,n);if(aff.includes('ironhide')){m.mhp=m.hp=Math.round(m.mhp*1.4)}if(aff.includes('frenzied'))m.atk=Math.round(m.atk*1.25);
    if(aff.includes('swift')||aff.includes('stalwart')){m.d={...m.d};if(aff.includes('swift'))m.d.spd*=1.3}if(aff.includes('stalwart'))m.mpoise=m.poise=m.mpoise*2;
    if(aff.includes('bountiful'))m.exp=Math.round(m.exp*1.5);if(m.d.boss||m.d.bb){m.d={...m.d,name:(n>50?'Veinbound ':'')+m.d.name,bb:1}}m.bmhp=m.mhp}
  netScale();banner((boss?'Guardian floor · ':'')+ZONES[DI].ch+(aff.length?' · '+aff.map(a=>AFFIX[a].n).join(', '):''),'Floor '+n+' of 100')}
function deepTick(dt){{const sb=$('shoutbar'),hid=!NET.cap;if(sb.hidden!==hid)sb.hidden=hid}if(pl.down>0){pl.down-=dt;if(pl.down<=0){pl.down=0;$('dead').hidden=false}}
  if(Z.id!=='deep'||!S.deep)return;
  S.deep.ck=(S.deep.ck||0)+dt;if(S.deep.ck<.4)return;S.deep.ck=0;
  if(!S.deep.clear&&S.mobs.filter(m=>m.di!=null).every(m=>m.dead)){S.deep.clear=true;deepCleared()}}
function deepCleared(){const n=S.deep.n,D=DP(),bount=S.deep.aff.includes('bountiful')?1.5:1,sh=Math.round((20+n*6)*bount);pl.shards+=sh;gainExp(Math.round(need(pl.lv)*.04*bount));
  if(n%10===0){const src=ZONES[DI].mobs.length?ZONES[DI].mobs[ZONES[DI].mobs.length-1][0]:'warden';const it=rollDrop(GEAR[src]?src:'warden',true,4+n);if(pl.bag.length<BAG_MAX)pl.bag.push(it);else S.drops.push({k:'gear',it,x:pl.x,y:pl.y-8,vx:0,vy:-160,t:0});setTimeout(()=>banner('Guardian’s cache',RAR[it.rar].n+' '+itemName(it)),2600)}
  D.best=Math.max(D.best,n);if(n%5===0)D.anchor=Math.max(D.anchor,n);netBoard();
  const x=Z.x1-30;S.deep.stair={x,to:DI,tx:70,next:1,y:topAt(x)};Z.portals.push(S.deep.stair);
  banner('Floor '+n+' cleared · +'+sh+' shards',n===100?'The Heart of the Veinway is quiet. You reached the bottom.':n%5===0?'Anchor set · you can start here next time':'The stair down is open');[392,523,659,784].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.04),i*100));save()}
function deepTravel(po){if(po.next){if(S.deep.n>=100){banner('The bottom','There is nothing deeper. Yet.');return true}deepEnter(S.deep.n+1,S.deep.solo);return true}
  if(Z.id!=='deep'&&ZONES[po.to]&&ZONES[po.to].id==='deep'){openDeep();return true}
  if(Z.id==='deep'){netLeave();S.deep=null}return false}
function deepRise(){pl.dead=false;pl.down=0;if(Z.id==='deep'){netLeave();S.deep=null;enterZone(5,DEEP_STAIR+EDGE-30);return true}return false}
function downOrDie(){if(netPeers().length){pl.down=15;banner('You are down','An ally can revive you · 15 seconds');return}$('dead').hidden=false}
function drawDeep(cx,cy){if(Z.id!=='deep'||!S.deep)return;const st=S.deep.stair;
  if(st){const x=ri(st.x-cx),y=ri(st.y-cy);g.save();g.globalCompositeOperation='lighter';glow(x,y-20,30,'201,168,255',.3+Math.sin(S.t*3)*.08);g.restore();
    for(let i=0;i<5;i++){const w=22-i*3;g.fillStyle='#000';g.fillRect(x-w/2-1,y-2-i*5,w+2,4);g.fillStyle=i%2?'#3a2a5e':'#5a4290';g.fillRect(x-w/2,y-1-i*5,w,2);g.fillStyle='#c9a8ff';g.fillRect(x-w/2,y-1-i*5,w,1)}
}
  const left=S.mobs.filter(m=>m.di!=null&&!m.dead).length;ptext('FLOOR '+S.deep.n+(S.deep.clear?' · CLEARED':' · '+left+' REMAIN')+(netPeers().length?' · PARTY OF '+(netPeers().length+1):''),W/2,49,S.deep.clear?'#9bd04c':'#f2e6c8')}
/* hub menu */
let DEEPM=null;
function openDeep(){DEEPM={sel:null,board:null};pauseFor('deepm');renderDeep();netBoardLoad().then(L=>{if(DEEPM){DEEPM.board=L;renderDeep()}})}
function renderDeep(){if(!DEEPM)return;const D=DP(),starts=[1];for(let a=5;a<=D.anchor;a+=5)starts.push(a+ (a<100?1:0));
  const uniq=[...new Set(starts.filter(s=>s<=100))];const lob=netLobby();
  $('dmleft').innerHTML=`<p class="crp">An old Concordance stair under the Hollow, opened by the Gatefall. It goes down a hundred floors through caverns, ruins, laboratories and worse, into the Veinway itself. Every tenth floor is held by a guardian. Every fifth floor leaves an anchor you can start from next time.</p>
    <div class="crbl"><span>Deepest floor ${D.best}</span><span>Anchor ${D.anchor||'none'}</span></div>
    ${NET.cap?`<div class="qh">Descent</div><div class="crbtns"><button class="btn sm${D.solo?' alt':''}" data-dsolo="0">Open floor</button><button class="btn sm${D.solo?'':' alt'}" data-dsolo="1">Solo</button></div><p class="crp dim">${D.solo?'A private descent: just you and your companion. Nobody else can enter your floors.':'Anyone who reaches the same floor joins you. If no one else is there, you play it alone.'}</p>`:''}<div class="qh">Descend</div><div class="crbtns">${uniq.map(s=>`<button class="btn sm${s===uniq[uniq.length-1]?'':' alt'}" data-df="${s}">Floor ${s}</button>`).join('')}</div>
    ${NET.cap?`<p class="crp dim">Party up: anyone on the same floor at the same time shares that floor. Enemies grow stronger with each ally, damage and kills are shared, everyone gets the clear reward, and you can revive a fallen ally by standing over them.</p>`:''}
    ${lob.length?'<div class="qh">Delvers below now</div>'+lob.map(p=>`<div class="crl"><div class="crlh"><b>${esc(p.nm)} · Lv ${p.lv|0}</b><span>Floor ${p.deep|0}</span></div>${(p.deep|0)<=Math.max(D.best+5,10)?`<div class="crbtns"><button class="btn sm" data-df="${p.deep|0}">Join on floor ${p.deep|0}</button></div>`:'<span>Too deep to join yet</span>'}</div>`).join(''):''}`;
  const B=DEEPM.board;$('dmright').innerHTML=B===null?'<p class="crp dim">Loading the delvers’ ledger…</p>':!B?'<p class="crp dim">Co-op parties and the shared delvers’ ledger are coming in a future update. For now the Deep is a solo descent, and your deepest floor is saved on this device.</p>':
    !B.length?'<p class="crp dim">No one has signed the ledger yet. Clear a floor to be first.</p>':'<ol class="dmlb">'+B.map((r,i)=>`<li${r.me?' class="me"':''}><b>${i+1}</b><span>${esc(r.nm)}</span><em>Floor ${r.best|0}</em><small>Lv ${r.lv|0}</small></li>`).join('')+'</ol>'}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])).slice(0,24);
$('deepm').addEventListener('click',e=>{const b=e.target.closest('[data-df],[data-dsolo],#dmclose');if(!b)return;if(b.id==='dmclose'){DEEPM=null;return unpause('deepm')}if(b.dataset.dsolo!=null){DP().solo=b.dataset.dsolo==='1';save();return renderDeep()}
  const n=clamp(b.dataset.df|0,1,100);DEEPM=null;unpause('deepm');DP().runs++;deepEnter(n,!!DP().solo&&!b.closest('.crl'))});
/* ---------- multiplayer: presence, shared damage, revive, shouts, ledger ---------- */
const NET={cap:null,room:null,db:null,user:null,uid:null,me:null,peers:[],fl:0,hq:new Map(),hT:0,pT:0,tried:false,CH:{}};
async function netInit(){if(NET.tried)return;NET.tried=true;const C=window.claude;if(!C||!C.use)return;
  try{NET.cap=await C.use('room')}catch(_){}try{NET.db=await C.use('db')}catch(_){}try{NET.user=await C.use('user');NET.uid=NET.user?await NET.user.id():null}catch(_){}
  if(NET.cap){try{NET.cap.onPeers(()=>{if(DEEPM)renderDeep()})}catch(_){}netLobbyPres();if(pl.ch&&Z&&S.zone!=null)netZone()}}
function netLobbyPres(){if(!NET.cap||!pl.ch)return;NET.cap.presence({nm:pl.ch.name,lv:pl.lv,zn:Z.name,deep:Z.id==='deep'&&S.deep&&!S.deep.solo?S.deep.n:null,home:typeof homeOpenFor==='function'?homeOpenFor():null}).catch(()=>{})}
function netLobby(){if(!NET.cap)return[];try{return NET.cap.peers().filter(p=>!p.isMe&&p.presence&&p.presence.deep).map(p=>({nm:p.presence.nm,lv:p.presence.lv,deep:p.presence.deep}))}catch(_){return[]}}
const netOnline=()=>{if(!NET.cap)return 0;try{return NET.cap.peers().length}catch(_){return 0}};
/* every zone is a shared room; each Veinway floor is its own room unless the descent is solo */
const netKey=()=>Z.id==='home'?homeRoom():Z.id==='deep'?(S.deep&&!S.deep.solo?'veinway-floor-'+S.deep.n:null):'zone-'+Z.id;
function netZone(){let i=0;for(const m of S.mobs){if(m.cr)continue;m.ni=i++}NET.key=netKey();netLobbyPres();netJoin(NET.key)}
async function netJoin(key){if(!NET.cap)return;const old=NET.room;NET.room=null;NET.peers=[];if(old)try{await old.leave()}catch(_){}if(!key||NET.key!==key)return;
  try{const R=await NET.cap.join(key);if(NET.key!==key){R.leave();return}NET.room=R;NET.joinT=S.t;
    R.onPeers(ch=>{NET.peers=ch.peers.filter(p=>!p.isMe&&p.presence&&p.presence.k===key);const me=ch.peers.find(p=>p.isMe);if(me)NET.me=me.peer;
      const j=ch.joined.find(p=>!p.isMe);if(j&&Z.id==='deep')banner('An ally arrives','Another delver is on this floor');
      if(S.t-NET.joinT<3)for(const p of NET.peers)for(const i of(p.presence.dm||[])){const m=S.mobs.find(q=>q.ni===i);if(m&&!m.dead){m.dead=1;m.remote=1;m.resp=Z.id==='deep'?999:2+Math.random()*4}}
      netScale()});
    R.on('hp',msg=>{if(msg.isMe||!msg.data||msg.data.k!==NET.key)return;for(const[i,hp]of(msg.data.h||[])){const m=S.mobs.find(q=>q.ni===i);if(!m||m.dead)continue;const nh=Math.round(m.mhp*clamp(+hp||0,0,1));if(nh<m.hp){m.hp=nh;m.flash=.08;m.aggro=Math.max(m.aggro,3)}if(m.hp<=0)netRemoteKill(m)}});
    R.on('kill',msg=>{if(msg.isMe||!msg.data||msg.data.k!==NET.key)return;const m=S.mobs.find(q=>q.ni===msg.data.i);if(m&&!m.dead)netRemoteKill(m)});
    R.on('revive',msg=>{if(msg.isMe||msg.data.to!==NET.me||!pl.dead||!(pl.down>0))return;pl.dead=false;pl.down=0;pl.hp=Math.round(pl.mhp*.4);pl.inv=1.5;banner('Revived',String(msg.data.by||'An ally').slice(0,14)+' pulled you up')});
    R.on('shout',msg=>{const k=SHOUTS[msg.data&&msg.data.k|0];if(!k)return;if(msg.isMe){S.myShout={txt:k,t:S.t};return}const st=NET.CH[msg.peer]=NET.CH[msg.peer]||{};st.shout={txt:k,t:S.t}})}catch(_){NET.room=null}}
async function netLeave(){NET.key=null;const R=NET.room;NET.room=null;NET.peers=[];if(R)try{await R.leave()}catch(_){}}
const netPeers=()=>NET.room?NET.peers:[];
function netScale(){if(Z.id!=='deep')return;const k=1+netPeers().length,f=1+.6*(k-1);for(const m of S.mobs){if(m.di==null||m.dead||!m.bmhp)continue;const frac=m.hp/m.mhp;m.mhp=Math.round(m.bmhp*f);m.hp=Math.max(1,Math.round(m.mhp*frac))}}
function netHit(m){m.mine=S.t;if(!NET.room||m.ni==null)return;NET.hq.set(m.ni,Math.max(0,m.hp/m.mhp))}
function netKill(m){if(!NET.room||m.ni==null||m.remote)return;NET.room.emit('kill',{k:NET.key,i:m.ni}).catch(()=>{})}
function netRemoteKill(m){m.remote=1;m.hp=0;m.dead=1;const deep=Z.id==='deep';m.resp=deep?999:(m.d.resp||6);
  for(let i=0;i<10;i++)S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:rnd(-80,80),vy:rnd(-140,-30),t:0,life:.7,c:['#9bd04c','#f2e6c8','#3a3550'][i%3],g:320,s:1});
  const helped=m.mine&&S.t-m.mine<15;if(!deep&&!helped)return;const ge=Math.round(expFor(m)*(deep?.6:.7));gainExp(ge);S.nums.push({x:m.x,y:m.y-m.d.h-14,txt:'+'+ge+' EXP · SHARED',t:-.1,c:'#c8d468'});
  if(helped){qKill(m);conKill(m);crKill(m);compKill(m)}}
const SHOUTS=['Hello!','Help!','Follow me','This way!','Group up?','Guardian ahead!','Well fought!','Thanks!'];
function netShout(k){if(NET.room)NET.room.emit('shout',{k}).catch(()=>{});else S.myShout={txt:SHOUTS[k],t:S.t};$('shoutbar').classList.remove('open')}
function netTick(dt){if(!NET.room)return;NET.hT+=dt;NET.pT+=dt;
  if(NET.hT>.15&&NET.hq.size){NET.hT=0;const h=[...NET.hq.entries()].slice(0,40);NET.hq.clear();NET.room.emit('hp',{k:NET.key,h}).catch(()=>{})}
  if(NET.pT>.1){NET.pT=0;const a=pl.dead?'d':pl.atk?'a':!pl.onG?(pl.vy<0?'j':'f'):Math.abs(pl.vx)>1?'r':'i',eq={};for(const k of['head','chest','hands','feet','weapon'])if(pl.eq[k])eq[k]=[pl.eq[k].src,pl.eq[k].weap||0];
    const dm=S.mobs.filter(m=>m.dead&&m.ni!=null).map(m=>m.ni).slice(0,40);
    NET.room.presence({k:NET.key,nm:pl.ch.name,lv:pl.lv,ch:{cls:pl.ch.cls,look:pl.ch.look},eq,x:Math.round(pl.x),y:Math.round(pl.y),f:pl.face,a,hp:Math.round(pl.hp/pl.mhp*100),dn:pl.down>0?1:0,dm}).catch(()=>{})}
  NET.cT=(NET.cT||0)+dt;if(NET.cT>1){NET.cT=0;const n=netPeers().length,el=$('saytg');const t=n?'Say · '+(n+1)+' here':'Say';if(el.textContent!==t)el.textContent=t}}
function netNear(){for(const p of netPeers()){const q=p.presence||{};if(q.dn&&Math.abs((q.x|0)-pl.x)<26&&Math.abs((q.y|0)-pl.y)<30&&!pl.dead)return p}return null}
function netRevive(p){if(!NET.room)return;NET.room.emit('revive',{to:p.peer,by:pl.ch.name}).catch(()=>{});S.nums.push({x:pl.x,y:pl.y-40,txt:'REVIVING',t:0,c:'#9bd04c'});dGain('investigation',2)}
function peerFrames(q){const look={...DEF_LOOK},src=(q.ch&&q.ch.look)||{};for(const k in look)if(typeof src[k]==='number')look[k]=clamp(src[k]|0,0,12);
  const eq={};for(const k of['head','chest','hands','feet','weapon']){const e=q.eq&&q.eq[k];if(Array.isArray(e)&&GEAR[e[0]])eq[k]={src:e[0],slot:k,weap:k==='weapon'&&WEAP_N[e[1]]?e[1]:null,rar:0,st:{}}}
  const cls=CLASSES[q.ch&&q.ch.cls]?q.ch.cls:'ronin',key=JSON.stringify([cls,look,eq]);if(NET.CH[key])return NET.CH[key];const keep=WT;let fr=null;try{fr=buildChar({name:'',cls,look},eq)}catch(_){}WT=keep;return NET.CH[key]=fr}
function drawPeers(cx,cy){for(const p of netPeers()){const q=p.presence||{};if(typeof q.x!=='number')continue;const st=NET.CH[p.peer]=NET.CH[p.peer]||{x:q.x,y:q.y};st.x+=(q.x-st.x)*.35;st.y+=(q.y-st.y)*.35;
    const F=peerFrames(q);const x=ri(st.x-cx),y=ri(st.y-cy);if(x<-40||x>W+40)continue;g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-6,y,12,1);
    if(F){let img=q.a==='r'?F.runS[Math.floor(S.t*10)%6]:q.a==='j'?F.jumpS:q.a==='f'?F.fallS:q.a==='a'&&F.idleD?F.idleD[0]:F.idleS[Math.floor(S.t*1.6)%2];
      g.save();g.globalAlpha=.92;g.translate(x,0);if((q.f|0)<0)g.scale(-1,1);if(q.dn){g.translate(0,y);g.rotate(-Math.PI/2*(q.f<0?-1:1));g.drawImage(img,-24,-39+12);}else g.drawImage(img,-24,y-39);g.restore()}
    const hy=y-(q.dn?18:46);ptext(String(q.nm||'Delver').slice(0,14)+' · '+(q.lv|0),x,hy,'#6ec6e2');g.fillStyle='#000';g.fillRect(x-9,hy+5,18,3);g.fillStyle='#d4483a';g.fillRect(x-8,hy+6,ri(16*clamp(q.hp|0,0,100)/100),1);
    if(q.dn)ptext(netNear()===p?'▲ REVIVE':'DOWN',x,hy-10,'#9bd04c');const sh=st.shout;if(sh&&S.t-sh.t<3)bubble(x,hy-6,sh.txt)}
  if(S.myShout&&S.t-S.myShout.t<3)bubble(ri(pl.x-cx),ri(pl.y-cy)-50,S.myShout.txt)}
async function netBoard(){if(!NET.db||!NET.uid)return;const D=DP();try{const ref=NET.db.collection('veinway').doc(NET.uid);const cur=await ref.get();const old=cur.exists?cur.data():null;if(old&&(old.best|0)>=D.best&&(old.lv|0)>=pl.lv)return;
  await ref.set({nm:String(pl.ch.name).slice(0,12),best:Math.max(D.best,old?old.best|0:0),lv:pl.lv,t:Date.now()})}catch(_){}}
async function netBoardLoad(){if(!NET.db)return false;try{const s=await Promise.race([NET.db.collection('veinway').orderBy('best','desc').limit(20).get(),new Promise((_,j)=>setTimeout(()=>j(0),10000))]);return s.docs.map(d=>({...d.data(),me:d.id===NET.uid}))}catch(_){return false}}
setTimeout(netInit,50);
function reviveNear(){const p=netNear();return p?{k:'rev',p}:null}
document.querySelectorAll('#saylist button').forEach((b,i)=>b.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();netShout(i)}));$('saytg').addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();$('shoutbar').classList.toggle('open')});
