/* ---------- HUD ---------- */
let banT;function banner(s,t){$('bans').textContent=s;$('bant').textContent=t;const z=$('zone');z.style.transition='none';z.style.opacity=1;clearTimeout(banT);banT=setTimeout(()=>{z.style.transition='opacity 1s';z.style.opacity=0},2400)}
let hudK='';
function hud(){if(!pl.ch)return;
  $('stf').style.width=(pl.st/pl.mst*100)+'%';$('stf').parentNode.classList.toggle('low',pl.st<22);
  const k=[pl.lv,pl.hp|0,pl.mp|0,pl.mhp,pl.mmp,pl.exp,pl.shards,pl.pots].join();if(k!==hudK){hudK=k;
    $('lvn').textContent=pl.lv;$('hpf').style.width=(pl.hp/pl.mhp*100)+'%';$('mpf').style.width=(pl.mp/pl.mmp*100)+'%';$('hpt').textContent=(pl.hp|0)+'/'+pl.mhp;$('mpt').textContent=(pl.mp|0)+'/'+pl.mmp;
    $('expf').style.width=(pl.exp/need(pl.lv)*100)+'%';$('shn').textContent=pl.shards;$('ptn').textContent=pl.pots;$('b-pot').querySelector('small').textContent='×'+pl.pots}
  const cd=(id,v,max,mp)=>{const b=$(id);b.style.setProperty('--cd',max?v/max:0);b.classList.toggle('lowmp',pl.mp<mp)};
  for(let i=0;i<3;i++){const info=techInfo(pl.lo[i]);cd('b-s'+(i+1),pl.slotCd[i],pl.slotMax[i],info?info.mp:0);$('b-s'+(i+1)).classList.toggle('lk',!!info&&!!techWhy(info))}cd('b-pot',pl.potCd,4,0);
  $('treebtn').classList.toggle('dot',spFree()>0);
  const tm=S.nearPortal?ZONES[S.nearPortal.to]:null,ek=tm?(S.nearPortal.next?'Floor '+(S.deep.n+1):tm.name)+(pl.lv<tm.req?'|'+tm.req:''):'';if(ek!==S.ek){S.ek=ek;$('enterbtn').hidden=!tm;if(tm){const lk=pl.lv<tm.req;$('enterbtn').disabled=lk;$('enterbtn').textContent=lk?'Sealed · Lv '+tm.req:S.nearPortal.next?'Descend · Floor '+(S.deep.n+1):'Enter · '+tm.name}}
  const tk=DLG||S.nearPortal?'':S.nearNpc?'n:'+S.nearNpc:S.nearSt?'s:'+S.nearSt.n:S.nearLore?'l:'+S.nearLore:S.nearCr?'c:'+S.nearCr.k+(S.nearCr.i??S.mobs.indexOf(S.nearCr.m)):S.nearNode?'g:'+S.nearNode.r:'';if(tk!==S.tk2){S.tk2=tk;$('talkbtn').hidden=!tk;if(S.nearNpc&&tk){const m=npcMark(S.nearNpc);$('talkbtn').textContent=(m==='!'?'! ':m==='?'?'? ':'')+'Talk · '+NPCS[S.nearNpc].name}else if(S.nearSt&&tk)$('talkbtn').textContent=({board:'Contracts',stall:'Market'}[S.nearSt.k]||'Craft')+' · '+S.nearSt.n;else if(S.nearLore&&tk)$('talkbtn').textContent='Read · '+LORE[S.nearLore].t;else if(S.nearCr&&tk)$('talkbtn').textContent=crLabel(S.nearCr);else if(tk)$('talkbtn').textContent='Gather · '+RES[S.nearNode.r].n}
  qTrack()}
function titleOf(){let b=KIT().disc;for(const d of COMBAT_D)if(dXP(d)>dXP(b))b=d;const r=dRank(b);return r?DISC[b].n+' '+TIER_N[r]:'Wanderer'}
function setupClassUI(){if(!pl.ch)return;$('nmt').textContent=pl.ch.name+' · '+titleOf();const w=WEAP(),verb=w==='bow'?'shoot':w==='staff'||w==='tome'?'cast':'slash',nm=[];
  for(let i=0;i<3;i++){const info=techInfo(pl.lo[i]),b=$('b-s'+(i+1));b.hidden=!info||(!!info.ult&&!info.learned);nm.push(info?info.n:'-');if(info)b.innerHTML=`<span>${info.n.split(' ')[0]}<small>${info.mp}</small></span>`}
  $('b-atk').innerHTML=`<span>${verb[0].toUpperCase()+verb.slice(1)}</span>`;
  $('keys').innerHTML=`<b>←→</b> move · <b>Z</b> jump · <b>X</b> ${verb} · <b>C</b> ${nm[0]} · <b>V</b> ${nm[1]} · <b>B</b> ${nm[2]} · <b>Shift</b> roll · <b>F</b> guard/parry · <b>P</b> tonic · <b>I</b> bag · <b>T</b> disciplines · <b>Q</b> quests · <b>Y</b> crisis · <b>M</b> map · <b>G</b> companion command · <b>↑</b> talk/portal`}

/* ---------- touch ---------- */
$('touch').hidden=!isTouch;$('keys').hidden=isTouch;
document.querySelectorAll('.pb').forEach(b=>{const k=b.dataset.k;
  b.addEventListener('pointerdown',e=>{e.preventDefault();initAudio();inp[k]=1;b.classList.add('on');try{b.setPointerCapture(e.pointerId)}catch(_){}});
  ['pointerup','pointercancel','lostpointercapture'].forEach(ev=>b.addEventListener(ev,()=>{inp[k]=0;b.classList.remove('on')}))});
const lz=$('lz'),stick=$('stick'),knob=$('knob');let sid=null,sx0=0,sy0=0;
lz.addEventListener('pointerdown',e=>{e.preventDefault();initAudio();sid=e.pointerId;if(CTL.stick.mode==='fixed'){sx0=parseFloat(stick.style.left);sy0=parseFloat(stick.style.top)}else{sx0=e.clientX;sy0=e.clientY;stick.style.left=sx0+'px';stick.style.top=sy0+'px'}try{lz.setPointerCapture(sid)}catch(_){}});
lz.addEventListener('pointermove',e=>{if(e.pointerId!==sid)return;let dx=e.clientX-sx0,dy=e.clientY-sy0;const L=Math.hypot(dx,dy);if(L>42){dx*=42/L;dy*=42/L}
  knob.style.transform=`translate(${dx}px,${dy}px)`;inp.left=dx<-14?1:0;inp.right=dx>14?1:0;inp.up=dy<-24?1:0;inp.down=dy>24?1:0});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>lz.addEventListener(ev,e=>{if(e.pointerId!==sid)return;sid=null;inp.left=inp.right=inp.up=inp.down=0;stickRest()}));
addEventListener('contextmenu',e=>e.preventDefault());
$('enterbtn').addEventListener('pointerdown',e=>{e.preventDefault();S.wantPortal=true});

/* ---------- character creator ---------- */
const DEF_LOOK={sex:0,build:1,face:0,hair:0,hairC:0,beard:0,skin:2,eye:0,outfit:0};
const draft={name:'Wanderer',cls:'ronin',look:{...DEF_LOOK},gear:'class'};let PV=null,pvT=0;
const PREVIEW_SETS=['class','none','wanderer','moss','husk','wisp','warden'];
const CYC=[['sex','Body'],['build','Build'],['face','Face'],['hair','Hair'],['beard','Beard']],SWS=[['skin','Skin'],['hairC','Hair color'],['eye','Eyes'],['outfit','Outfit']];
const swCol=(k,v)=>k==='outfit'?`linear-gradient(135deg,${v[0]} 58%,${v[4]} 58%)`:Array.isArray(v)?v[0]:v;
function buildCreator(){
  $('classes').innerHTML=Object.entries(CLASSES).map(([k,c])=>`<button class="cls" data-c="${k}">${c.name}<span>${c.desc}</span></button>`).join('');
  $('rows').innerHTML=CYC.map(([k,l])=>`<div class="row" data-row="${k}"><span>${l}</span><button class="cy" data-k="${k}" data-d="-1" aria-label="Previous ${l}">‹</button><span class="rv" id="rv-${k}"></span><button class="cy" data-k="${k}" data-d="1" aria-label="Next ${l}">›</button></div>`).join('')
    +SWS.map(([k,l])=>`<div class="row" data-row="${k}"><span>${l}</span><div class="sw">${LOOK[k].map((v,i)=>`<button class="swb" data-k="${k}" data-i="${i}" aria-label="${l} ${i+1}" style="background:${swCol(k,v)}"></button>`).join('')}</div></div>`).join('');
  $('gearrow').innerHTML=`<div class="row"><span>Preview</span><button class="cy" data-g="-1" aria-label="Previous gear set">‹</button><span class="rv" id="rv-gear"></span><button class="cy" data-g="1" aria-label="Next gear set">›</button></div>`;
  refreshCreator()}
function refreshCreator(){
  CYC.forEach(([k])=>{$('rv-'+k).textContent=LOOK[k][draft.look[k]]});$('rv-gear').textContent=draft.gear==='none'?'No gear':draft.gear==='class'?GEAR[START[draft.cls]].set+' (kit)':GEAR[draft.gear].set;
  document.querySelector('[data-row="beard"]').hidden=draft.look.sex===1;
  document.querySelectorAll('.swb').forEach(b=>b.classList.toggle('sel',draft.look[b.dataset.k]==b.dataset.i));
  document.querySelectorAll('.cls').forEach(b=>b.classList.toggle('sel',b.dataset.c===draft.cls));
  const c=CLASSES[draft.cls];$('ccinfo').innerHTML=`<b>${c.name}</b><br>${c.desc}<br>A kit is only where you start. Any weapon, armor or discipline can be learned later by using it.`;
  PV=buildChar(draft,previewEq(draft.gear==='class'?START[draft.cls]:draft.gear));pvT=0}
$('creator').addEventListener('click',e=>{const cy=e.target.closest('.cy'),sw=e.target.closest('.swb'),cl=e.target.closest('.cls');
  if(cy&&cy.dataset.g){const i=PREVIEW_SETS.indexOf(draft.gear),n=PREVIEW_SETS.length;draft.gear=PREVIEW_SETS[(i+(+cy.dataset.g)+n)%n]}
  else if(cy){const k=cy.dataset.k,n=LOOK[k].length;draft.look[k]=(draft.look[k]+(+cy.dataset.d)+n)%n}
  else if(sw)draft.look[sw.dataset.k]=+sw.dataset.i;else if(cl)draft.cls=cl.dataset.c;else return;
  initAudio();tone(880,.05,'square',.02,300);refreshCreator()});
$('rand').onclick=()=>{for(const k in DEF_LOOK)draft.look[k]=Math.random()*LOOK[k].length|0;if(draft.look.sex===1)draft.look.beard=0;refreshCreator()};
$('back').onclick=()=>{$('creator').hidden=true;$('title').hidden=false};
const pvc=$('pv'),pvx=pvc.getContext('2d');
function stageBg(x,w,h,feet){const L=ZCACHE[0]||S.L;x.drawImage(L.mid,330,150,w,h,0,0,w,h);x.fillStyle='rgba(10,34,38,.35)';x.fillRect(0,0,w,h);x.drawImage(L.ter,384,250-feet,w,h,0,0,w,h)}
function drawPreview(dt){if(!PV)return;pvT+=dt;pvx.imageSmoothingEnabled=false;stageBg(pvx,112,84,73);
  const T=pvT%4.6,kat=!!PV.idleD;let img;
  if(T<1.4)img=(T%3.7<.12)?PV.blinkS:PV.idleS[Math.floor(T*1.6)%2];
  else if(T<2.6)img=PV.runS[Math.floor(T*11)%6];
  else{const seq=PV.atk,durs=kat?[.05,.05,.08,.12]:[.09,.07,.12];let t=T-2.6,i=0;while(i<seq.length&&t>durs[i]*2.2){t-=durs[i]*2.2;i++}
    if(i<seq.length)img=seq[i];else if(kat){const r=T-2.6-durs.reduce((a,b)=>a+b,0)*2.2;img=r<1.1?PV.idleD[Math.floor(T*1.6)%2]:r<1.35?PV.sheath[0]:PV.idleS[0]}else img=PV.idleS[Math.floor(T*1.6)%2]}
  pvx.fillStyle='rgba(0,0,0,.35)';pvx.fillRect(50,73,12,1);pvx.drawImage(img,56-24,73-39)}

/* ---------- start / continue ---------- */
function beginWith(ch,sv){pl.ch={name:ch.name,cls:CLASSES[ch.cls]?ch.cls:'ronin',look:{...DEF_LOOK,...ch.look}};
  if(sv){pl.lv=sv.lv||1;pl.exp=sv.exp||0;pl.shards=sv.sh||0;pl.pots=sv.pt??3;pl.bag=(sv.inv||[]).filter(i=>i&&GEAR[i.src]);pl.eq={};for(const k in(sv.eq||{}))if(sv.eq[k]&&GEAR[sv.eq[k].src])pl.eq[k]=sv.eq[k];pl.sk=sv.sk||{};pl.q=sv.q||{};pl.bsp=sv.bsp||0;pl.track=sv.tr||null;pl.mat=sv.mat||{};pl.con=sv.con||null;pl.stall=sv.stall||null;pl.buffs={};pl.tmin=!!sv.tmin;pl.comp=sv.comp||{own:[],act:null};pl.flags=sv.fl||{};pl.deep=sv.dp||null;pl.home=sv.hm||null;if(pl.home){pl.home.inv=pl.home.inv||{};pl.home.stash=pl.home.stash||[];pl.home.smat=pl.home.smat||{};pl.home.grow=pl.home.grow||{};pl.home.open=!!pl.home.open;fitLay()}pl.cr=sv.cr||null;pl.leg=sv.leg||{};pl.relief=sv.rl||{};pl.crH=sv.crH||[];const K=KIT();pl.dx=sv.dx||{[K.disc]:dCum(Math.min(9,pl.lv)),[K.armor]:dCum(Math.min(5,pl.lv))};pl.lo=sv.lo||defaultLoadout()}
  else{pl.lv=1;pl.exp=0;pl.shards=0;pl.pots=3;pl.sk={};pl.q={};pl.bsp=0;pl.track=null;pl.tmin=false;pl.mat={};pl.con=null;pl.stall=null;pl.buffs={};pl.comp={own:[],act:null};pl.flags={};pl.cr=null;pl.leg={};pl.relief={};pl.crH=[];const st=START[pl.ch.cls]||'r_start';pl.eq={weapon:makeItem(st,'weapon',CLASSES[pl.ch.cls].weap,0)};for(const sl of['head','chest','hands','feet'])pl.eq[sl]=makeItem(st,sl,null,0);pl.bag=[makeItem('wanderer','head',null,0),makeItem('wanderer','charm',null,0)];const K=KIT();pl.dx={[K.disc]:dCum(1),[K.armor]:dCum(1)};pl.lo=defaultLoadout()}
  recalc();pl.hp=pl.mhp;pl.mp=pl.mmp;pl.dead=false;pl.atk=null;pl.drawnT=0;pl.sheathT=0;pl.slotCd=[0,0,0];pl.slotMax=[1,1,1];pl.used={};rebuildPA();setupClassUI();hudK='';
  $('title').hidden=true;$('creator').hidden=true;S.started=true;catchUpMarket();enterZone(sv?clamp(sv.zone|0,0,ZONES.length-1):4);S.tk2=null;qtK='';if(!sv)pauseFor('prolog')}
$('go').onclick=()=>{initAudio();$('title').hidden=true;$('creator').hidden=false;buildCreator()};
$('begin').onclick=()=>{draft.name=($('cname').value||'').trim().slice(0,12)||'Wanderer';beginWith(draft,null)};
$('rise').onclick=()=>{if(deepRise()){$('dead').hidden=true;pl.hp=pl.mhp;pl.mp=pl.mmp;pl.inv=1.5;setTimeout(spawnComp,400);return}pl.dead=false;setTimeout(spawnComp,400);pl.exp=Math.max(0,pl.exp-Math.floor(need(pl.lv)*.1));pl.hp=pl.mhp;pl.mp=pl.mmp;pl.inv=1.5;$('dead').hidden=true;enterZone(S.zone===3?10:S.zone)};

/* ---------- inventory ---------- */
const DC=$('dc'),DX=DC.getContext('2d');
function pauseFor(id){S.paused=true;$(id).hidden=false;for(const k in inp)inp[k]=0}
function unpause(id){if($(id))$(id).hidden=true;S.paused=['inv','tree','quests','prolog','craft','board','market','crisis','deepm','gmenu','mapov','arrange','stash','visit'].some(k=>!$(k).hidden)||!!DLG}
function openInv(){if(!S.started||pl.dead)return;pauseFor('inv');renderInv()}
function slotHTML(it,label,data,sel){return `<button class="slot${sel?' sel':''}" ${data} style="--rc:${it?RAR[it.r].c:'rgba(242,230,200,.2)'}" aria-label="${it?itemName(it):label+' (empty)'}">${it?`<img src="${iconURL(it)}" alt="">`:`<span class="lb">${label}</span>`}</button>`}
function statLines(it,cmp){return Object.keys(STAT_N).filter(k=>it.st[k]||(cmp&&cmp.st[k])).map(k=>{const v=it.st[k]||0,d=cmp?v-(cmp.st[k]||0):0;return `<li>${STAT_N[k]} <b>+${v}</b>${cmp&&d?` <span class="${d>0?'up':'down'}">${d>0?'▲':'▼'}${Math.abs(d)}</span>`:''}</li>`}).join('')}
function renderInv(){const sel=S.sel,eqS=s=>slotHTML(pl.eq[s],SLOT_N[s],`data-eq="${s}"`,sel&&sel.eq===s);
  $('dollL').innerHTML=['head','chest','hands'].map(eqS).join('');$('dollR').innerHTML=['weapon','feet','charm'].map(eqS).join('');
  let bag='';for(let i=0;i<BAG_MAX;i++)bag+=slotHTML(pl.bag[i],'',`data-bag="${i}"`,sel&&sel.bag===i);$('bag').innerHTML=bag;$('bagn').textContent=pl.bag.length+' / '+BAG_MAX;
  $('stats').innerHTML=`<span>ATK <b>${atkPow()}</b></span><span>DEF <b>${pl.gs.def+pl.sm.def}</b></span><span>CRIT <b>${(12+pl.gs.crit+pl.sm.crit).toFixed(0)}%</b></span><span>HP <b>${pl.mhp}</b></span><span>MP <b>${pl.mmp}</b></span><span>SHARDS <b>${pl.shards}</b></span>`;$('imat').innerHTML=Object.keys(RES).filter(k=>mat(k)).map(k=>`<span style="--c:${RES[k].c}">${RES[k].n} <b>${mat(k)}</b></span>`).join('')||'<span>No materials yet. Gather in the field and hunt beasts.</span>';
  const it=sel?(sel.eq?pl.eq[sel.eq]:pl.bag[sel.bag]):null,d=$('detail');
  if(!it){d.innerHTML=`<div class="dm">Tap an item. Creatures drop gear made from their own hide, masks and cores, and it shows on your character.</div>`;return}
  const g=GEAR[it.src]||GEAR.wanderer,cmp=sel.bag!=null?pl.eq[it.slot]:null,okW=true,okL=pl.lv>=(it.lv||1);
  const typ=it.slot==='weapon'?WEAP_N[it.weap]:SLOT_N[it.slot],dnote=it.slot==='weapon'?`<div class="dm">Trains ${DISC[WEAP_DISC[it.weap]].n} (your rank ${dRank(WEAP_DISC[it.weap])})</div>`:it.slot==='chest'?`<div class="dm">${DISC[ARMOR_OF[(GEAR[it.src]||GEAR.wanderer).chest.s]||'robes'].n} · trains as you wear it</div>`:'';
  const warn=(!okW?`<div class="warn">Only a ${Object.values(CLASSES).find(c=>c.weap===it.weap).name} can wield ${WEAP_N[it.weap].toLowerCase()}.</div>`:'')+(!okL&&sel.bag!=null?`<div class="warn">Requires level ${it.lv}.</div>`:'');
  d.innerHTML=`<div class="dn" style="color:${RAR[it.r].c}">${itemName(it)}</div><div class="dm">Lv ${it.lv||1} · ${RAR[it.r].n} ${typ} · ${g.set} set</div>${dnote}${it.by?`<div class="dm" style="color:var(--moss)">Crafted by ${it.by}</div>`:''}<ul>${statLines(it,cmp)}</ul>${warn}
    <div class="acts">${sel.eq?`<button class="btn sm alt" data-act="unequip">Unequip</button>`:`<button class="btn sm" data-act="equip" ${okW&&okL?'':'disabled'}>Equip</button><button class="btn sm alt" data-act="salvage">Salvage +${itemValue(it)}</button>`}</div>`}
$('inv').addEventListener('click',e=>{const b=e.target.closest('[data-bag],[data-eq],[data-act],#invclose');if(!b)return;
  if(b.id==='invclose')return unpause('inv');
  if(b.dataset.bag!=null){const i=+b.dataset.bag;S.sel=pl.bag[i]?{bag:i}:null}
  else if(b.dataset.eq){S.sel=pl.eq[b.dataset.eq]?{eq:b.dataset.eq}:null}
  else{const a=b.dataset.act,sel=S.sel;
    if(a==='equip'){const it=pl.bag[sel.bag];if(pl.lv<(it.lv||1))return;const old=pl.eq[it.slot];pl.eq[it.slot]=it;pl.bag.splice(sel.bag,1);if(old)pl.bag.push(old);S.sel={eq:it.slot};sfx.pick();setTimeout(setupClassUI,0)}
    else if(a==='unequip'){if(sel.eq==='weapon'){$('detail').insertAdjacentHTML('beforeend','<div class="warn">Swap weapons by equipping another from your bag.</div>');return}if(pl.bag.length>=BAG_MAX){$('detail').insertAdjacentHTML('beforeend','<div class="warn">Your bag is full.</div>');return}pl.bag.push(pl.eq[sel.eq]);pl.eq[sel.eq]=null;S.sel={bag:pl.bag.length-1}}
    else if(a==='salvage'){const it=pl.bag[sel.bag];pl.shards+=itemValue(it);pl.bag.splice(sel.bag,1);S.sel=null;sfx.pick()}
    applyGear()}
  renderInv()});
function drawDoll(){if(!PA)return;const w=DC.width,h=DC.height;DX.imageSmoothingEnabled=false;stageBg(DX,w,h,h-11);const img=(S.t%3.7)<.12?PA.blinkS:PA.idleS[Math.floor(S.t*1.6)%2];DX.fillStyle='rgba(0,0,0,.35)';DX.fillRect(w/2-6,h-11,12,1);DX.drawImage(img,w/2-24,h-11-39)}

/* ---------- skill tree ---------- */
const ICS={skull:'M12 3a7 7 0 0 0-7 7c0 3 1.5 4.5 3 5.5V19h8v-3.5c1.5-1 3-2.5 3-5.5a7 7 0 0 0-7-7zM9 10h.01M15 10h.01M10 19v-2M14 19v-2',drain:'M4 12c4-6 12-6 16 0M4 12c4 6 12 6 16 0M12 9v6',blade:'M4 20L17 7l3-3-1 4L6 21zM3 17l4 4',shield:'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z',dash:'M3 12h12M11 7l6 5-6 5M3 8h5M3 16h5',wave:'M6 4c10 3 10 13 0 16 6-5 6-11 0-16z',
  crit:'M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z',heart:'M12 20C4 14 3 9 6 6c2.5-2 5-1 6 1 1-2 3.5-3 6-1 3 3 2 8-6 14z',star:'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3z',speed:'M4 18l6-6-6-6M11 18l6-6-6-6',
  bow:'M7 3c10 4 10 14 0 18M7 3v18M7 12h13M17 9l3 3-3 3',eye:'M2 12c4-6 16-6 20 0-4 6-16 6-20 0zM12 9a3 3 0 1 0 .01 0',leaf:'M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8',
  poison:'M12 3c4 6 6 9 6 12a6 6 0 0 1-12 0c0-3 2-6 6-12z',ult:'M12 2l2.5 6.5L21 9l-5 4.5 1.5 7L12 17l-5.5 3.5 1.5-7L3 9l6.5-.5z',thorns:'M3 20L7 8l2 12M9 20l4-16 2 16M15 20l3-10 3 10',roots:'M12 3v9M12 12c-4 2-6 5-7 9M12 12c4 2 6 5 7 9M12 12v9'};
const curD=()=>S.dtab||KIT().disc;
function openTree(){if(!S.started||pl.dead)return;pauseFor('tree');if(!S.dtab){let b=KIT().disc;for(const d of COMBAT_D)if(dXP(d)>dXP(b))b=d;S.dtab=b}S.tsel=null;S.resetArm=0;renderTree()}
function xpBar(d){const r=dRank(d),a=dCum(r),b=dCum(Math.min(DMAX,r+1)),x=dXP(d);return`<div class="xpb"><i style="width:${r>=DMAX?100:Math.min(100,(x-a)/(b-a)*100)}%"></i></div><div class="xpt">${r>=DMAX?'Mastered':Math.floor(x-a)+' / '+(b-a)+' practice to rank '+(r+1)}</div>`}
const safePrep=()=>!!Z.safe||(Z.props||[]).some(([k,x])=>k==='fire'&&Math.abs(pl.x-x)<90);
function renderLoadout(){$('lo').innerHTML=[0,1,2].map(i=>{const t=techInfo(pl.lo[i]),why=t?techWhy(t):'';return`<div class="los${S.tsel&&S.tsel.length<12&&techInfo(S.tsel)?' can':''}"><small>${['C','V','B'][i]} · Slot ${i+1}</small><b>${t?t.n:'Empty'}</b><span>${t?DISC[t.d].n:''}${why?' · <em>'+why+'</em>':''}</span>${t?`<button class="x" data-clr="${i}" aria-label="Clear slot ${i+1}">×</button>`:''}</div>`}).join('')
  +`<div class="note">${safePrep()?'You are somewhere safe: changes are ready at once.':'Field preparation: techniques you swap in here start on cooldown. Prepare in town or at a campfire to skip it.'}</div>`}
function renderTree(){const d=curD();$('trname').textContent='Disciplines';$('trsp').textContent=spFree()+' learning pts · Lv '+pl.lv;
  $('dtabs').innerHTML=[...COMBAT_D,'armor','field','craft'].map(k=>`<button class="dtab${k===d?' sel':''}" data-dt="${k}">${{armor:'Armor',field:'Field Work',craft:'Crafting'}[k]||DISC[k].n}${DISC[k]?`<b>${dRank(k)}</b>`:''}</button>`).join('');
  renderLoadout();
  if(d==='field'||d==='craft'){const L=d==='field'?FIELD_D:CRAFT_D;$('dinfo').innerHTML=`<div class="note">${d==='field'?'Press up or tap Gather beside a resource node. Hunting trains when beasts you defeat drop hide and meat. Higher rank yields more.':'Use a station: the Workyard or Iron Market forge, an herbalist\u2019s rack, or any campfire. Higher rank unlocks recipes and better results.'}</div>`;
    $('treeg').innerHTML=L.map(a=>`<div class="arow"><div class="drow"><b>${DISC[a].n}</b> · ${TIER_N[dRank(a)]} ${dRank(a)}/${DMAX}</div>${xpBar(a)}<div class="note">${DISC[a].d}</div></div>`).join('');
    $('trdet').innerHTML=`<div class="dn">${d==='field'?'Field work':'Crafting'}</div><p>${d==='field'?'Every region produces different materials. Nodes regrow about 45 seconds after you strip them, so harvest sustainably and move on.':'Crafted gear is 15% stronger than drops of the same level and carries your name. Food and draughts give two-minute boons.'}</p>`;$('trreset').disabled=true;return}
  if(d==='armor'){const ac=armorClass();$('dinfo').innerHTML=`<div class="note">Any armor can be worn. Fighting in it trains its discipline, which raises its benefits and shrinks its costs. You are wearing <b>${DISC[ac].n}</b>.</div>`;
    $('treeg').innerHTML=ARMOR_D.map(a=>`<div class="arow${a===ac?' on':''}"><div class="drow"><b>${DISC[a].n}</b> · ${TIER_N[dRank(a)]} ${dRank(a)}/${DMAX}${a===ac?' · worn':''}</div>${xpBar(a)}<div class="note">${DISC[a].d}</div><div class="xpt">${ARMOR_TXT[a](dRank(a))}</div></div>`).join('');
    $('trdet').innerHTML=`<div class="dn">Armor practice</div><p>Robes, Light, Medium and Heavy armor are trainable skill families, not class restrictions. Your body piece decides which one you are practicing.</p>`;$('trreset').disabled=true;return}
  const D=DISC[d],r=dRank(d),nodes=TREES[D.tree],gEl=$('treeg');if(!S.tsel||!(techInfo(S.tsel)&&S.tsel.startsWith(d)||nodes.some(n=>n.id===S.tsel)))S.tsel=d+'1';
  $('dinfo').innerHTML=`<div class="drow"><b>${D.n}</b> · ${D.fam}${D.focus?' magic':''} · ${TIER_N[r]} ${r}/${DMAX}</div>${xpBar(d)}
    <div class="techs">${['1','2','U'].map(i=>{const t=techInfo(d+i),on=pl.lo.includes(d+i);return`<button class="tech${S.tsel===d+i?' sel':''}${t.learned?'':' lk'}${on?' rd':''}" data-tech="${d+i}">${t.n}<small>${t.ult?'Ultimate':'Technique'}${on?(t.learned?' · ready':' · slotted'):''}</small></button>`}).join('')}</div>`;
  let h='<svg id="trlinks" aria-hidden="true"></svg>';
  for(let t=0;t<4;t++){h+=`<div class="tier"><span class="gate${r>=GATES[t]?' open':''}">Rank ${GATES[t]}</span><div class="trow">`;
    for(const n of nodes.filter(n=>n.t===t)){const k=rk(n.id),st=k>=n.max?'max':k?'got':canLearn(n)?'can':(r>=GATES[n.t]&&reqMet(n))?'open':'lock';
      h+=`<button class="node ${st}${n.t===3?' ult':''}${S.tsel===n.id?' sel':''}" data-n="${n.id}" aria-label="${n.n}, rank ${k} of ${n.max}"><svg viewBox="0 0 24 24"><path d="${ICS[n.ic]}"/></svg><span class="rk">${k}/${n.max}</span></button>`}
    h+='</div></div>'}
  gEl.innerHTML=h;const sv=$('trlinks'),gr=gEl.getBoundingClientRect();let Ls='';
  for(const n of nodes)if(n.req){const to=gEl.querySelector(`[data-n="${n.id}"]`).getBoundingClientRect();for(const id of n.req[0].split('|')){const fr=gEl.querySelector(`[data-n="${id}"]`).getBoundingClientRect();
    Ls+=`<line x1="${fr.left+fr.width/2-gr.left}" y1="${fr.bottom-gr.top}" x2="${to.left+to.width/2-gr.left}" y2="${to.top-gr.top}" class="${rk(id)>=n.req[1]?'on':''}"/>`}}
  sv.innerHTML=Ls;sv.setAttribute('width',gEl.scrollWidth);sv.setAttribute('height',gEl.scrollHeight);
  const tech=techInfo(S.tsel);
  if(tech){const why=techWhy(tech);$('trdet').innerHTML=`<div class="dn">${tech.n}</div><div class="dm">${D.n} ${tech.ult?'ultimate':'technique'} · ${tech.mp} MP · ${tech.cd}s</div><p>${tech.desc}</p>
      ${D.focus?'<p class="dm">Magic: works with any weapon in hand.</p>':`<p class="dm">Needs ${D.weap==='axe'?'an':'a'} ${WEAP_N[D.weap].toLowerCase()} equipped.</p>`}${why&&!tech.learned?`<div class="warn">${why}.</div>`:''}
      <div class="acts">${[0,1,2].map(i=>`<button class="btn sm${pl.lo[i]===tech.id?'':' alt'}" data-slot="${i}" ${tech.learned?'':'disabled'}>${pl.lo[i]===tech.id?'In':'Ready in'} slot ${i+1}</button>`).join('')}</div>`}
  else{const n=nodes.find(x=>x.id===S.tsel),k=rk(n.id);let why='';
    if(k<n.max&&!canLearn(n)){if(r<GATES[n.t])why=`Reach ${D.n} rank ${GATES[n.t]} by practicing it.`;else if(!reqMet(n))why=`Needs ${n.req[1]} point${n.req[1]>1?'s':''} in ${n.req[0].split('|').map(id=>nodes.find(x=>x.id===id).n).join(' or ')}.`;else if(spFree()<=0)why='No learning points left. You earn 2 each character level.'}
    $('trdet').innerHTML=`<div class="dn">${n.n}</div><div class="dm">${n.k} · Rank ${k} / ${n.max}</div>${k?`<p><b>Now</b> ${n.d(k)}</p>`:''}${k<n.max?`<p><b>${k?'Next':'Rank 1'}</b> ${n.d(k+1)}</p>`:'<p><b>Mastered</b></p>'}
      ${n.t===3?`<p class="dm">Learning it unlocks the ultimate technique for your loadout.</p>`:''}${why?`<div class="warn">${why}</div>`:''}<div class="acts"><button class="btn sm" data-tact="learn" ${canLearn(n)?'':'disabled'}>Learn${k?' next rank':''}</button></div>`}
  const cost=pl.lv*10;$('trreset').textContent=S.resetArm?`Tap again: reset for ${cost} shards`:'Reset points';$('trreset').disabled=!spSpent()||pl.shards<cost}
$('tree').addEventListener('click',e=>{const b=e.target.closest('[data-n],[data-tact],[data-dt],[data-tech],[data-slot],[data-clr],#trclose,#trreset');if(!b)return;
  if(b.id==='trclose')return unpause('tree');
  if(b.id==='trreset'){if(!S.resetArm)S.resetArm=1;else{pl.shards-=pl.lv*10;pl.sk={};S.resetArm=0;applyGear();setupClassUI()}return renderTree()}
  S.resetArm=0;
  if(b.dataset.dt){S.dtab=b.dataset.dt;S.tsel=null}
  else if(b.dataset.tech)S.tsel=b.dataset.tech;
  else if(b.dataset.n)S.tsel=b.dataset.n;
  else if(b.dataset.slot!=null){const i=+b.dataset.slot,id=S.tsel,j=pl.lo.indexOf(id);if(j>=0&&j!==i){pl.lo[j]=pl.lo[i];pl.slotCd[j]=0}pl.lo[i]=id;const t=techInfo(id);if(!safePrep()&&t){pl.slotCd[i]=pl.slotMax[i]=t.cd}sfx.pick();setupClassUI();save()}
  else if(b.dataset.clr!=null){pl.lo[+b.dataset.clr]=null;setupClassUI();save()}
  else if(b.dataset.tact==='learn'){const n=TREES[DISC[curD()].tree].find(x=>x.id===S.tsel);if(n&&canLearn(n)){pl.sk[n.id]=rk(n.id)+1;sfx.lvl();applyGear();setupClassUI()}}
  renderTree()});
$('treebtn').onclick=()=>$('tree').hidden?openTree():unpause('tree');
$('bagbtn').onclick=()=>$('inv').hidden?openInv():unpause('inv');
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.code==='KeyI')$('inv').hidden?openInv():unpause('inv');if(e.code==='KeyT')$('tree').hidden?openTree():unpause('tree');if(e.code==='KeyG')cycleCmd();if(e.code==='KeyY')$('crisis').hidden?openCrisis():closeCrisis();
  if(e.code==='Escape'){unpause('inv');unpause('tree')}});
if(GEAR_MISSING.length){const w=$('devwarn');w.hidden=false;w.textContent='Gear missing for creature: '+GEAR_MISSING.join(', ')+'. Add a GEAR entry for each creature.'}

/* ---------- boot ---------- */
function resize(){const dpr=Math.min(devicePixelRatio||1,3),dw=innerWidth*dpr,dh=innerHeight*dpr;C.width=dw|0;C.height=dh|0;
  SCL=Math.max(1,Math.round(dh/228));H=Math.min(WH,Math.ceil(dh/SCL));W=Math.ceil(dw/SCL);G.width=W;G.height=H;
  $('rot').hidden=!(isTouch&&innerHeight>innerWidth);stickRest();if(!$('tree').hidden)renderTree()}
addEventListener('resize',resize);
$('sndbtn').onclick=()=>{initAudio();setSnd(!SND.on)};setSnd(SND.on);
$('fs').onclick=async()=>{try{if(!document.fullscreenElement){await document.documentElement.requestFullscreen();await screen.orientation.lock('landscape')}else await document.exitFullscreen()}catch(e){}};
buildMobSprites();resize();
S.L=useZone(0);S.mobs=Z.mobs.map(d=>spawnMob(d));resetAmb();S.cam=0;S.camY=WH-H;
{const sv=loadSave(),old=(()=>{try{return JSON.parse(localStorage.getItem('mossgate-px')||'null')}catch(e){return null}})();
  if(sv&&sv.ch){$('cont').hidden=false;$('cont').textContent='Continue · '+sv.ch.name+' · Lv '+sv.lv;$('cont').onclick=()=>{initAudio();beginWith(sv.ch,sv)}}
  else if(old&&old.look){$('cont').hidden=false;$('cont').textContent='Continue · '+old.name;$('cont').onclick=()=>{initAudio();beginWith(old,null)}}}
setInterval(()=>S.started&&save(),10000);
let last=0;
function loop(ts){const dt=Math.min(.033,(ts-last)/1000||0);last=ts;
  if(S.started&&!S.paused&&$('rot').hidden&&!document.hidden)update(dt);else S.t+=dt;
  render();if(!$('creator').hidden)drawPreview(dt);if(!$('inv').hidden)drawDoll();hud();requestAnimationFrame(loop)}
requestAnimationFrame(loop);
/* scale menus and HUD up on tablets and large screens so text stays readable; keep the quest tracker clear of the HUD */
function uiScale(){const z=clamp(Math.min(innerWidth/780,innerHeight/380),1,2);UIZ=z;
  for(const el of document.querySelectorAll('.ov')){el.style.zoom=z;el.style.boxSizing='border-box';el.style.right='auto';el.style.bottom='auto';el.style.width=(innerWidth/z)+'px';el.style.height=(innerHeight/z)+'px'}
  for(const id of['hud','tr','qtrack','talk','dlg','crchip','morepn','shoutbar'])if($(id))$(id).style.zoom=z;
  const h=$('hud').getBoundingClientRect();if(h.height)$('qtrack').style.top=((h.bottom+4)/z)+'px'}
let UIZ=1;addEventListener('resize',()=>setTimeout(uiScale,30));uiScale();setInterval(()=>{const q=$('qtrack'),h=$('hud').getBoundingClientRect();if(h.height&&Math.abs(q.getBoundingClientRect().top-(h.bottom+4))>2)uiScale()},1000);
