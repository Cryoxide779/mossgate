/* ---------- state ---------- */
const S={allies:[],t:0,cam:0,camY:60,parts:[],nums:[],mobs:[],proj:[],eproj:[],waves:[],drops:[],fx:[],started:false,paused:false,zone:0,portalCd:0,shrineT:0,nearPortal:null,wantPortal:false};
const pl={ch:null,eq:{},bag:[],sk:{},lv:1,exp:0,hp:100,mhp:100,mp:40,mmp:40,shards:0,pots:3,gs:{atk:0,def:0,hp:0,mp:0,crit:0},sm:{...SM0},
  x:100,y:250,vx:0,vy:0,face:1,onG:true,inv:0,kb:0,atk:null,drawnT:0,sheathT:0,cd:0,st:100,mst:100,stRe:0,roll:null,gT:-9,guard:false,stag:0,slotCd:[0,0,0],slotMax:[1,1,1],lo:[],dx:{},potCd:0,walk:0,dead:false,wet:false,dash:null,ultT:0,ultTick:0,lastHurt:-9,regen:0,drop:0,cmb:0};
let PA=null;
const KIT=()=>CLASSES[pl.ch.cls]||CLASSES.ronin,WEAP=()=>(pl.eq.weapon&&pl.eq.weapon.weap)||KIT().weap;
function gearStats(){const t={atk:0,def:0,hp:0,mp:0,crit:0};for(const s of SLOTS){const it=pl.eq[s];if(it)for(const k in it.st)t[k]+=it.st[k]}return t}
const rk=id=>(pl.sk&&pl.sk[id])||0,tree=d=>TREES[DISC[d||S.dtab||KIT().disc].tree]||TREES.ronin,ultNode=d=>tree(d).find(n=>n.t===3);
/* discipline practice */
const dXP=d=>(pl.dx&&pl.dx[d])||0;
function dRank(d){const x=dXP(d);let r=0;while(r<DMAX&&x>=dCum(r+1))r++;return r}
function markUse(d){pl.used=pl.used||{};pl.used[d]=S.t}
function dGain(d,amt){if(!amt)return;pl.dx=pl.dx||{};const r0=dRank(d);pl.dx[d]=Math.min(dCum(DMAX),dXP(d)+amt);const r1=dRank(d);
  if(r1>r0){S.nums.push({x:pl.x,y:pl.y-54,txt:DISC[d].n.toUpperCase()+' '+r1,t:-.3,c:'#ffd27a'});banner(TIER_N[r1]+' · Rank '+r1,DISC[d].n);[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.15,'triangle',.04),i*70));recalc();setupClassUI()}}
function practice(amt,win){const t=S.t,u=pl.used||{},act=COMBAT_D.filter(d=>t-(u[d]??-99)<win);for(const d of act)dGain(d,amt/act.length)}
const armorClass=()=>{const c=pl.eq.chest&&(GEAR[pl.eq.chest.src]||{}).chest;return c&&ARMOR_OF[c.s]||'robes'};
function skillMods(){const m={...SM0,tech:{}};for(const k in TREES){const d=TREE_DISC[k],tm=m.tech[d]={s1P:0,s1cd:0,s2P:0,s2cd:0};for(const n of TREES[k]){const r=rk(n.id);if(r){const f=n.fx(r);for(const q in f){if(q in tm)tm[q]+=f[q];else m[q]+=f[q]}}}}
  const ac=armorClass(),af=ARMOR_FX[ac](dRank(ac));m.mpR=1;m.kbR=0;for(const q in af){if(q==='mpR'||q==='kbR')m[q]=af[q];else m[q]+=af[q]}return buffMods(m)}
const spTotal=()=>1+2*(pl.lv-1)+(pl.bsp||0),spSpent=()=>Object.values(TREES).flat().reduce((a,n)=>a+rk(n.id),0),spFree=()=>spTotal()-spSpent();
const reqMet=n=>!n.req||n.req[0].split('|').some(id=>rk(id)>=n.req[1]);
const canLearn=n=>spFree()>0&&rk(n.id)<n.max&&dRank(NODE_DISC[n.id])>=GATES[n.t]&&reqMet(n);
function recalc(){const c=BASE;pl.gs=gearStats();pl.sm=skillMods();pl.mhp=Math.round((c.hp+(pl.lv-1)*c.hpG+pl.gs.hp)*(1+pl.sm.hpP));pl.mmp=Math.round((c.mp+(pl.lv-1)*c.mpG+pl.gs.mp)*(1+pl.sm.mpP))}
const atkPow=()=>{const c=BASE;return Math.round((c.atk+pl.lv*c.atkG+pl.gs.atk)*(1+pl.sm.atkP)*(WPN[WEAP()]||WPN.katana).m)};
/* techniques + prepared loadout */
function techInfo(id){if(!id)return null;const d=id.slice(0,-1),i=id.slice(-1),D=DISC[d];if(!D||D.armor)return null;
  if(i==='U'){const u=TREES[D.tree].find(n=>n.t===3),r=rk(u.id);return{id,d,i,n:u.n,mp:u.mp,cd:u.cd,r,learned:r>0,desc:u.d(Math.max(1,r)),ult:1}}
  const t=D.t[+i-1];return t?{id,d,i,n:t.n,mp:t.mp,cd:t.cd,learned:dRank(d)>=1,desc:t.d}:null}
function techWhy(info){if(!info)return'Empty';const D=DISC[info.d];if(!info.learned)return info.ult?'Learn '+info.n+' in the '+D.n+' tree':'Train '+D.n+' to rank 1';if(!D.focus&&WEAP()!==D.weap)return(D.weap==='axe'?'Needs an axe':'Needs a '+WEAP_N[D.weap].toLowerCase().replace(/s$/,'')+(D.weap==='daggers'?' pair':''));return''}
function defaultLoadout(){const d=KIT().disc;return[d+'1',d+'2',d+'U']}
function castTech(info){const D=DISC[info.d],sm={...pl.sm,...(pl.sm.tech[info.d]||{})};markUse(info.d);
  if(D.cast)armsCast(info.d,info.i,sm,info);else if(info.i==='1')skill1(D.weap,sm);else if(info.i==='2')skill2(D.weap,sm,info);else skill3(D.weap,info.r);
  return info.i==='1'?Math.max(.3,info.cd-sm.s1cd):info.i==='2'?Math.max(.3,info.cd-sm.s2cd):info.cd}
const need=lv=>Math.floor(30*Math.pow(lv,1.85));
function rebuildPA(){PA=buildChar(pl.ch,pl.eq);WT_PROJ.orb=WT.orb}
function applyGear(){const r=pl.mhp?pl.hp/pl.mhp:1,rm=pl.mmp?pl.mp/pl.mmp:1;recalc();pl.hp=Math.max(1,Math.round(pl.mhp*r));pl.mp=Math.round(pl.mmp*rm);rebuildPA();save()}
const lvDmg=m=>m.lv>pl.lv?Math.max(.4,1-.08*(m.lv-pl.lv)):1,lvHurt=m=>m.lv>pl.lv?1+.06*(m.lv-pl.lv):1;
const expFor=m=>{const gp=pl.lv-m.lv;return Math.max(1,Math.round(m.exp*(gp>=4?Math.max(.1,1-.2*(gp-3)):1)))};

/* ---------- save ---------- */
function save(){if(!pl.ch)return;try{localStorage.setItem('mossgate-px2',JSON.stringify({ch:pl.ch,lv:pl.lv,exp:pl.exp,sh:pl.shards,pt:pl.pots,inv:pl.bag,eq:pl.eq,sk:pl.sk,zone:Z&&Z.id==='deep'?5:Z&&Z.id==='home'?zIdx('hearth'):S.zone,dp:pl.deep||null,hm:pl.home||null,q:pl.q||{},bsp:pl.bsp||0,dx:pl.dx,lo:pl.lo,mat:pl.mat||{},con:pl.con||null,stall:pl.stall||null,tr:pl.track,tmin:!!pl.tmin,comp:pl.comp||null,fl:pl.flags||{},cr:pl.cr||null,leg:pl.leg||{},rl:pl.relief||{},crH:pl.crH||[]}))}catch(e){}}
function loadSave(){try{return JSON.parse(localStorage.getItem('mossgate-px2')||'null')}catch(e){return null}}

/* ---------- input ---------- */
const inp={left:0,right:0,up:0,down:0,jump:0,attack:0,s1:0,s2:0,s3:0,pot:0,roll:0,guard:0},prev={};
const KM={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'up',KeyW:'up',ArrowDown:'down',KeyS:'down',KeyZ:'jump',Space:'jump',KeyK:'jump',
  KeyX:'attack',KeyJ:'attack',KeyC:'s1',KeyL:'s1',KeyV:'s2',Semicolon:'s2',KeyB:'s3',KeyN:'s3',KeyP:'pot',KeyH:'pot',ShiftLeft:'roll',ShiftRight:'roll',KeyO:'roll',KeyF:'guard',KeyU:'guard'};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;const k=KM[e.code];if(k){inp[k]=1;e.preventDefault();initAudio()}});
addEventListener('keyup',e=>{if(e.target.tagName==='INPUT')return;const k=KM[e.code];if(k){inp[k]=0;e.preventDefault()}});
const isTouch=('ontouchstart' in window)||matchMedia('(pointer:coarse)').matches;
const pressed=k=>inp[k]&&!prev[k];

/* ---------- audio ---------- */
let AC=null;function initAudio(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume&&AC.resume()}catch(e){}}
function tone(f,d,type='square',v=.04,sl=0){if(!AC)return;try{const o=AC.createOscillator(),gn=AC.createGain(),t=AC.currentTime;o.type=type;o.frequency.setValueAtTime(f,t);if(sl)o.frequency.exponentialRampToValueAtTime(Math.max(30,f+sl),t+d);
  gn.gain.setValueAtTime(v,t);gn.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(gn);gn.connect(outNode());o.start(t);o.stop(t+d)}catch(e){}}
function noise(d,v=.06,hp=2400){if(!AC)return;try{const n=AC.sampleRate*d|0,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=(Math.random()*2-1)*(1-i/n);
  const s=AC.createBufferSource(),f=AC.createBiquadFilter(),gn=AC.createGain();f.type='highpass';f.frequency.value=hp;gn.gain.value=v;s.buffer=b;s.connect(f);f.connect(gn);gn.connect(outNode());s.start()}catch(e){}}
const sfx={slash:()=>noise(.1,.07,2600),hit:()=>tone(150,.1,'triangle',.08,-60),hurt:()=>tone(210,.18,'sawtooth',.05,-120),pick:()=>tone(880,.06,'square',.025,400),
  lvl:()=>[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.18,'triangle',.06),i*90)),shoot:()=>noise(.06,.05,3200),spell:()=>tone(520,.18,'sine',.05,380),
  slam:()=>{tone(70,.4,'sawtooth',.1,-30);noise(.3,.08,200)},portal:()=>tone(330,.35,'sine',.05,500),jump:()=>tone(330,.08,'square',.02,180)};

/* ---------- physics ---------- */
const GRAV=760,JV=272,SPD=86;
function landY(x,py,ny){if(ny<py)return null;let best=null;for(const s of SEG)if(x>=s.x-1&&x<=s.x+s.w+1&&py<=s.y+.5&&ny>=s.y&&(best===null||s.y<best))best=s.y;return best}
function wallPush(o,dx){for(const s of SEG){if(s.t==='float')continue;if(o.x+5>s.x&&o.x-5<s.x+s.w&&o.y>s.y+1){if(dx>0)o.x=s.x-5;else if(dx<0)o.x=s.x+s.w+5}}}
const pbox=()=>({l:pl.x-5,r:pl.x+5,t:pl.y-28,b:pl.y});
const mbox=m=>({l:m.x-m.d.w/2,r:m.x+m.d.w/2,t:m.y-m.d.h,b:m.y});
const ov=(a,b)=>a.l<b.r&&a.r>b.l&&a.t<b.b&&a.b>b.t;

/* ---------- creatures ---------- */
function spawnMob(def,lvl){const[t,si,x]=def,d=MOBS[t],lv=lvl??def[3]??(Z.lv[0]+Math.floor(Math.random()*(Z.lv[1]-Z.lv[0]+1)));let minX,maxX,y,baseY=0;
  if(si===-2){minX=Math.max(30,x-150);maxX=Math.min(WW-30,x+150);baseY=150+Math.random()*50;y=baseY}else{const s=SEG[si];minX=s.x+d.w/2+2;maxX=s.x+s.w-d.w/2-2;y=s.y}
  const mhp=Math.round(d.hp*(1+(d.boss?.14:.25)*(lv-1))),atk=Math.round(d.atk*(1+(d.boss?.12:.2)*(lv-1))),exp=Math.round(d.exp*(1+.3*(lv-1)));
  const mpoise=Math.round((d.w*1.5+d.hp/12)*(d.elite?2:1)*(d.boss?3:1));return{mpoise,poise:mpoise,pT:0,t,d,def,lv,mhp,hp:mhp,atk,exp,x,y,baseY,minX,maxX,dir:Math.random()<.5?-1:1,face:1,flash:0,kb:0,ph:Math.random()*6,dead:0,resp:0,aggro:0,turn:rnd(1,3),st:'walk',stT:3,cd:rnd(1,3),sum:[],enr:0,stun:0,psn:null,lx0:0,lx1:0}}
function hitMob(m,mult,dir){if(m.dead)return;const crit=Math.random()<.12+(pl.gs.crit+pl.sm.crit)/100,d=Math.max(1,Math.round(atkPow()*mult*lvDmg(m)*rnd(.85,1.15)*(crit?1.8:1)*(m.stun>0?1.3:1)));
  m.poise-=mult*12*(crit?1.5:1);m.pT=S.t;if(m.poise<=0&&!(m.stun>0)){m.stun=m.d.boss?.9:1.2;m.poise=m.mpoise;S.nums.push({x:m.x,y:m.y-m.d.h-16,txt:'BREAK',t:-.1,c:'#ffd27a'});tone(520,.12,'square',.03,-200);S.hs=.05}
  if(pl.sm.poison)m.psn={t:3,a:0,dps:Math.max(1,Math.round(atkPow()*pl.sm.poison))};
  m.hp-=d;netHit(m);m.flash=.12;m.aggro=6;if(!m.d.boss){m.kb=dir*90;if(m.st==='wind'||m.st==='lunge'){m.st='walk';m.cd=1.2}}
  S.nums.push({x:m.x+rnd(-4,4),y:m.y-m.d.h-4,v:d,t:0,c:crit?'#ffb24a':'#fff4c2'});sfx.hit();
  for(let i=0;i<5;i++)S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:rnd(-60,60)+dir*40,vy:rnd(-90,-20),t:0,life:.45,c:i%2?'#f2e6c8':'#3a3550',g:300,s:1});
  practice(.4,1.6);if(m.hp<=0)killMob(m)}
function killMob(m){if(pl.sm.corpse>0&&!m.bloomed){m.bloomed=1;for(let i=0;i<10;i++){const a=i/10*6.28;S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:Math.cos(a)*70,vy:Math.sin(a)*70,t:0,life:.4,c:i%2?'#9bd04c':'#7a4aa0',g:0,s:2})}
    setTimeout(()=>aoe(m.x,m.y-m.d.h/2,30,pl.sm.corpse),0)}
  m.dead=1;m.resp=m.d.resp||6;qKill(m);huntDrops(m);conKill(m);crKill(m);crDrops(m);compKill(m);netKill(m);{const dx=expFor(m)*.6;practice(dx,5);dGain(armorClass(),dx*.25)}const ge=expFor(m);gainExp(ge);S.nums.push({x:m.x,y:m.y-m.d.h-14,txt:'+'+ge+' EXP',t:-.1,c:'#f2e6c8'});
  for(let i=0;i<(m.d.boss?40:14);i++)S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:rnd(-90,90),vy:rnd(-150,-30),t:0,life:.8,c:['#9bd04c','#f2e6c8','#3a3550','#d4483a'][i%4],g:320,s:Math.random()<.3?2:1});
  const gd=GEAR[m.t];if(gd)for(let i=0;i<(gd.drops||1);i++)if(Math.random()<gd.drop)S.drops.push({k:'gear',it:rollDrop(m.t,!!m.d.boss,m.lv),x:m.x,y:m.y-8,vx:rnd(-50,50),vy:rnd(-200,-140),t:0});
  const n=m.d.boss?8:1+(Math.random()*2|0);for(let i=0;i<n;i++)S.drops.push({k:'shard',amt:Math.max(1,Math.round(rnd(...m.d.shard)/n)),x:m.x,y:m.y-8,vx:rnd(-60,60),vy:rnd(-190,-110),t:0});
  if(Math.random()<(m.d.boss?1:.06))S.drops.push({k:'pot',x:m.x,y:m.y-8,vx:rnd(-40,40),vy:-160,t:0});
  if(m.d.boss){banner('Victory',m.d.name+(m.t==='unbound'?' scatters':' falls'));sfx.lvl();if(m.t==='unbound')S.mobs.forEach(o=>{if(o.temp&&!o.dead){o.dead=1}})}}
function rollDrop(src,boss,lv){const slot=SLOTS[Math.random()*SLOTS.length|0];const weap=slot==='weapon'?(Math.random()<.65?WEAP():WEAPS[Math.random()*WEAPS.length|0]):null;return makeItem(src,slot,weap,rollRar(boss),lv)}
function parryFX(x,y){S.hs=.12;[1600,2400].forEach(f=>tone(f,.18,'square',.035,-300));for(let i=0;i<12;i++){const a=i/12*6.28;S.parts.push({x,y,vx:Math.cos(a)*90,vy:Math.sin(a)*90,t:0,life:.3,c:i%2?'#ffd27a':'#fff',g:0,s:1})}
  S.nums.push({x:pl.x,y:pl.y-40,txt:'PARRY',t:-.1,c:'#ffd27a'});pl.st=Math.min(pl.mst,pl.st+15);qParry();dGain(armorClass(),3)}
function hurtPl(dmg,fromX,src){if(pl.dead)return;dmg*=crHurt()*compGuard();if(pl.roll){if(S.t-(pl.dodgeT||-9)>.4){pl.dodgeT=S.t;S.nums.push({x:pl.x,y:pl.y-34,txt:'DODGE',t:0,c:'#c8d468'})}return}if(pl.inv>0||pl.dash)return;if(armsBlock(fromX,src))return;
  if(pl.guard&&(Math.sign(fromX-pl.x)===pl.face||Math.abs(fromX-pl.x)<2)){
    if(S.t-pl.gT<parryWin()){parryFX(pl.x+pl.face*10,pl.y-18);pl.inv=.3;if(src&&!src.dead){src.stun=Math.max(src.stun||0,src.d.boss?.9:1.4);src.poise=0;src.kb=pl.face*90;if(src.st==='lunge'||src.st==='wind')src.st='walk'}return}
    pl.st-=(8+dmg*.9)*guardCost();pl.stRe=.8;dGain(armorClass(),.6);
    if(pl.st>0){const chip=Math.max(1,Math.round(dmg*.2*60/(60+pl.gs.def+pl.sm.def)));pl.hp-=chip;pl.inv=.3;pl.vx=(pl.x<fromX?-1:1)*50;S.nums.push({x:pl.x,y:pl.y-34,v:chip,t:0,c:'#9a927a'});tone(700,.08,'square',.03,-250);noise(.05,.03,1800);if(pl.hp<=0){pl.hp=0;pl.dead=true;downOrDie();conDeath()}return}
    pl.st=0;pl.stag=.9;S.nums.push({x:pl.x,y:pl.y-44,txt:'GUARD BREAK',t:0,c:'#ff6b6b'});tone(160,.3,'sawtooth',.05,-60)}dmg=Math.max(1,Math.round(dmg*rnd(.9,1.1)*60/(60+pl.gs.def+pl.sm.def)-pl.lv*.5));dmg=armsAbsorb(dmg);if(dmg<=0)return;
  pl.hp-=dmg;pl.lastHurt=S.t;pl.inv=1;const kr=1-(pl.sm.kbR||0);pl.kb=.25*kr;pl.vx=(pl.x<fromX?-1:1)*110*kr;dGain(armorClass(),1.5);pl.vy=-150;pl.onG=false;pl.atk=null;
  S.nums.push({x:pl.x,y:pl.y-34,v:dmg,t:0,c:'#ff6b6b'});sfx.hurt();
  if(pl.hp<=0){pl.hp=0;pl.dead=true;downOrDie();conDeath()}}
function gainExp(e){pl.exp+=e;while(pl.exp>=need(pl.lv)){pl.exp-=need(pl.lv);pl.lv++;recalc();pl.hp=pl.mhp;pl.mp=pl.mmp;
  S.nums.push({x:pl.x,y:pl.y-46,txt:'LEVEL UP',t:-.2,c:'#ffd27a',big:1});S.nums.push({x:pl.x,y:pl.y-38,txt:'+2 LEARNING',t:-.4,c:'#9bd04c'});
  for(let i=0;i<20;i++)S.parts.push({x:pl.x+rnd(-12,12),y:pl.y-rnd(0,30),vx:rnd(-10,10),vy:rnd(-60,-20),t:0,life:1.1,c:i%2?'#ffd27a':'#fff4c2',g:-10,s:1});sfx.lvl();save()}}

/* ---------- player attacks & skills ---------- */
function aimAt(ox,oy,range){let best=null,bd=1e9;for(const m of S.mobs){if(m.dead)continue;const b=mbox(m),dx=((b.l+b.r)/2-ox)*pl.face,dy=(b.t+(b.b-b.t)*.55)-oy;if(dx<-4||dx>range||Math.abs(dy)>80)continue;const d=dx+Math.abs(dy)*1.5;if(d<bd){bd=d;best=[Math.max(dx,8),dy]}}
  return best?clamp(Math.atan2(best[1],best[0]),-.75,.75):0}
function shot(k,a,sp,o={}){const ox=o.x??pl.x+pl.face*12,oy=o.y??pl.y-19;S.proj.push(Object.assign({k,x:ox,y:oy,vx:pl.face*Math.cos(a)*sp,vy:Math.sin(a)*sp,t:0,life:1,mult:1,pierce:false,hit:new Set(),f:pl.face,dl:0},o))}
function doHit(range,mult=1){sfx.slash();const f=pl.face,b={l:f>0?pl.x:pl.x-range,r:f>0?pl.x+range:pl.x,t:pl.y-32,b:pl.y+2};for(const m of S.mobs)if(!m.dead&&ov(b,mbox(m)))hitMob(m,mult,f)}
function aoe(x,y,r,mult){for(const m of S.mobs){if(m.dead)continue;const b=mbox(m),cx=(b.l+b.r)/2,cy=(b.t+b.b)/2;if(Math.abs(cx-x)<r+m.d.w/2&&Math.abs(cy-y)<r*.7+m.d.h/2)hitMob(m,mult,Math.sign(cx-x)||1)}}
function anim(frames,durs,hit,fn){pl.atk={frames:frames.slice(0,durs.length),durs,hit,fn,i:0,t:0}}
function katanaUse(){pl.drawnT=1.6;pl.sheathT=0}
function basicAttack(){const w=WEAP(),sm=pl.sm;pl.cd=(WPN[w]||WPN.katana).cd*(1-sm.cdP);markUse(WEAP_DISC[w]);if(ARMS_BASIC[w])return ARMS_BASIC[w](sm);
  if(w==='katana'){const drawn=pl.drawnT>0||pl.sheathT>0;katanaUse();
    if(drawn){anim(PA.cut,[.06,.08,.12],1,()=>doHit(30))}else{anim(PA.iai,[.05,.05,.08,.12],2,()=>doHit(30));tone(980,.05,'triangle',.03,500)}}
  else if(w==='daggers')anim(PA.atk,[.04,.07,.09],1,()=>doHit(24,.85));
  else if(w==='bow')anim(PA.atk,[.1,.06,.12],1,()=>{const a=aimAt(pl.x+pl.face*12,pl.y-19,240);shot('arrow',a,260);sfx.shoot();if(Math.random()<sm.shot2)shot('arrow',a+.06,250,{dl:.08})});
  else if(w==='tome')anim(PA.atk,[.08,.07,.12],1,()=>{shot('soul',aimAt(pl.x+pl.face*12,pl.y-19,200),150,{mult:1.1,life:1.4,home:1});tone(300,.2,'triangle',.04,-120)});
  else anim(PA.atk,[.08,.07,.12],1,()=>{shot('bolt',aimAt(pl.x+pl.face*12,pl.y-19,180),170,{mult:1.05*(1+sm.spellP),life:1.1});sfx.spell()})}
function skill1(w,sm){
  if(w==='katana'||w==='daggers'){const k=w==='katana';if(k)katanaUse();pl.dash={t:k?.17:.12,v:k?230:290,mult:(k?1.6:1.25)*(1+sm.s1P),hit:new Set()};pl.inv=Math.max(pl.inv,.2);sfx.slash();
    anim(k?PA.cut.slice(1):PA.atk.slice(1),[.1,.1],9,null)}
  else if(w==='bow'){const n=3+sm.volleyN,a=aimAt(pl.x+pl.face*12,pl.y-19,240);anim(PA.atk,[.06,.06,.1],1,()=>{for(let i=0;i<n;i++)shot('arrow',a+(i-(n-1)/2)*.07,260-i*10,{mult:.85*(1+sm.s1P)});sfx.shoot()})}
  else if(w==='tome')anim(PA.atk,[.08,.08,.1],1,summonThrall);
  else{const ox=pl.x;burst(pl.x,pl.y-14,'#9bd04c');let nx=clamp(pl.x+pl.face*(70+sm.blinkD),12,WW-12);const o={x:nx,y:pl.y};wallPush(o,pl.face);pl.x=o.x;pl.inv=Math.max(pl.inv,.35);
    burst(pl.x,pl.y-14,'#d8ff9a');aoe(pl.x,pl.y-14,24,.9*(1+sm.s1P));sfx.spell();for(let i=0;i<8;i++)S.parts.push({x:ox+(pl.x-ox)*i/8,y:pl.y-14+rnd(-6,6),vx:0,vy:rnd(-10,10),t:0,life:.4,c:'#9bd04c',g:0,s:1})}}
function skill2(w,sm,info){const p=1+sm.s2P;
  if(w==='katana'){katanaUse();anim(PA.cut,[.05,.07,.1],1,()=>{shot('wave',0,200,{y:pl.y-18,mult:1.35*p,pierce:true,life:.6});if(sm.twin)shot('wave',0,200,{y:pl.y-18,x:pl.x-pl.face*10,vx:-pl.face*200,f:-pl.face,mult:1.35*p,pierce:true,life:.6});noise(.25,.06,900)})}
  else if(w==='daggers'){const n=3+sm.starsN,a=aimAt(pl.x+pl.face*12,pl.y-19,200);anim(PA.atk,[.04,.06,.08],1,()=>{for(let i=0;i<n;i++)shot('star',a+(i-(n-1)/2)*.2,220,{mult:.95*p,life:.55});sfx.slash()})}
  else if(w==='bow')anim(PA.atk,[.12,.06,.12],1,()=>{shot('pierce',aimAt(pl.x+pl.face*12,pl.y-19,260),320,{mult:1.8*p,pierce:true,life:.8});noise(.25,.06,900)});
  else if(w==='tome')anim(PA.atk,[.06,.12,.12],1,()=>{let best=null,bd=141;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-pl.x,(m.y-m.d.h/2)-(pl.y-16));if(d<bd&&Math.sign(m.x-pl.x||pl.face)===pl.face){bd=d;best=m}}
    if(!best){S.nums.push({x:pl.x,y:pl.y-40,txt:'NO TARGET',t:0,c:'#c9a8ff'});pl.mp+=info.mp;pl.slotCd[info.slot]=0;return}
    const heal=Math.round(atkPow()*1.4*p*(.3+sm.drainP));hitMob(best,1.4*p,pl.face);pl.hp=Math.min(pl.mhp,pl.hp+heal);S.nums.push({x:pl.x+6,y:pl.y-34,v:heal,t:0,c:'#9bd04c'});S.fx.push({k:'beam',m:best,t:0,life:.45});tone(180,.4,'sawtooth',.03,240)});
  else anim(PA.atk,[.06,.08,.12],1,()=>{const r=55*(1+sm.thornsR);S.fx.push({k:'thorns',x:pl.x,y:pl.y,r,t:0,life:.55});aoe(pl.x,pl.y-14,r,1.7*p);sfx.slam()})}
function skill3(w,r){
  if(w==='katana'){katanaUse();pl.ultT=.9;pl.ultTick=0;pl.inv=Math.max(pl.inv,1);noise(.25,.06,900)}
  else if(w==='daggers'){const list=S.mobs.filter(o=>!o.dead&&Math.abs(o.x-pl.x)<190&&Math.abs(o.y-pl.y)<90).sort((a,b)=>Math.abs(a.x-pl.x)-Math.abs(b.x-pl.x)).slice(0,5);
    pl.inv=Math.max(pl.inv,1.2);burst(pl.x,pl.y-14,'#c79ae0');list.forEach(o=>{S.fx.push({k:'after',x:o.x-10,y:o.y,t:0,life:.4,img:PA.atk[1],f:1});S.fx.push({k:'cut',x:o.x,y:o.y-o.d.h/2,a:rnd(0,3),t:0,life:.25,c:'#e8c8ff'});hitMob(o,2.2+.4*r,Math.sign(o.x-pl.x)||1)});
    if(list.length){const L=list[list.length-1],q={x:clamp(L.x-pl.face*14,12,WW-12),y:pl.y};wallPush(q,pl.face);pl.x=q.x}sfx.slash()}
  else if(w==='bow'){const n2=14+4*r;anim(PA.atk,[.06,.06,.1],1,()=>{for(let i=0;i<n2;i++)shot('arrow',0,0,{x:pl.x+pl.face*(20+Math.random()*170),y:pl.y-130-Math.random()*40,vx:pl.face*20,vy:300,dl:i*.045,life:.9,mult:1.1+.2*r});sfx.shoot()})}
  else if(w==='tome')anim(PA.atk,[.06,.12,.12],1,()=>{for(let i=0;i<4+r;i++){const a=i/(4+r)*6.28;S.allies.push({k:'wraith',x:pl.x+Math.cos(a)*20,y:pl.y-20+Math.sin(a)*12,vx:Math.cos(a)*40,vy:Math.sin(a)*40,life:5,hits:new Map(),mult:1.2+.2*r,face:1,ph:i})}
    burst(pl.x,pl.y-16,'#c9a8ff');tone(140,.6,'sawtooth',.05,300);noise(.4,.05,600)});
  else anim(PA.atk,[.06,.08,.12],1,()=>{S.fx.push({k:'thorns',x:pl.x,y:pl.y,r:40,t:0,life:.6});for(const o of S.mobs){if(o.dead||Math.abs(o.x-pl.x)>W/2+30)continue;S.fx.push({k:'thorns',x:o.x,y:o.d.fly?o.y+10:o.y,r:16,t:0,life:.6});hitMob(o,2.5+.5*r,Math.sign(o.x-pl.x)||1);if(!o.dead)o.stun=o.d.boss?1:2}sfx.slam()})}
function summonThrall(){const th=S.allies.filter(a=>a.k==='thrall'),max=2+pl.sm.thrallN;if(th.length>=max){th.sort((a,b)=>a.life-b.life);S.allies.splice(S.allies.indexOf(th[0]),1)}
  const o={x:clamp(pl.x+pl.face*16,8,WW-8),y:pl.y};wallPush(o,pl.face);
  S.allies.push({k:'thrall',x:o.x,y:pl.y,vx:0,vy:0,onG:true,face:pl.face,life:20,rise:.4,cd:.3,atkT:0,mult:.6*(1+pl.sm.s1P)});
  for(let i=0;i<12;i++)S.parts.push({x:o.x+rnd(-8,8),y:pl.y,vx:rnd(-20,20),vy:rnd(-70,-20),t:0,life:.6,c:i%3?'#5d8a6a':'#d9d2bc',g:200,s:1});tone(120,.35,'sawtooth',.05,180)}
function burst(x,y,c){for(let i=0;i<10;i++){const a=i/10*6.28;S.parts.push({x,y,vx:Math.cos(a)*60,vy:Math.sin(a)*60,t:0,life:.35,c,g:0,s:1})}}

/* ---------- zone travel ---------- */
function enterZone(i,tx){S.zone=i;const L=useZone(i);S.L=L;S.mobs=Z.mobs.map(d=>spawnMob(d));S.proj=[];S.eproj=[];S.waves=[];S.allies=[];S.drops=[];S.fx=[];S.parts=[];S.nums=[];
  pl.x=tx??Z.start;pl.y=topAt(pl.x);pl.vx=pl.vy=0;pl.onG=true;pl.dash=null;S.portalCd=.8;S.cam=clamp(pl.x-W*.45,0,Math.max(0,WW-W));S.camY=clamp(pl.y-H*.64,0,WH-H);
  spawnComp();crPopulate();netZone();markSeen();banner((Z.safe?Z.ch+' · Safe haven':Z.ch+' · Lv '+(Z.lv[0]===Z.lv[1]?Z.lv[0]:Z.lv[0]+'–'+Z.lv[1]))+' · '+timeName()+(WX_N[weather()]?' · '+WX_N[weather()]:''),Z.name);resetAmb();save()}
function travel(po){if(deepTravel(po))return;S.paused=true;const f=$('fade');f.style.opacity=1;sfx.portal();setTimeout(()=>{enterZone(po.to,po.tx);S.paused=false;f.style.opacity=0},320)}

/* ---------- update ---------- */
function update(dt){
  if(S.hs>0){S.hs-=dt;dt*=.15}
  tickNodes(dt);tickBuffs(dt);armsTick(dt);hintTick(dt);labTick(dt);tickMarket(dt);crTick(dt);compTick(dt);deepTick(dt);netTick(dt);reachTick(dt);tickFolk(dt);ambUpdate(dt);S.t+=dt;const dir=(inp.right?1:0)-(inp.left?1:0),sm=pl.sm;S.nearPortal=null;S.portalCd=Math.max(0,S.portalCd-dt);
  if(!pl.dead){
    for(const k of['inv','cd','potCd','drop'])pl[k]=Math.max(0,pl[k]-dt);for(let si=0;si<3;si++)pl.slotCd[si]=Math.max(0,pl.slotCd[si]-dt);
    pl.regen+=dt;if(pl.regen>=1){pl.regen=0;pl.mp=Math.min(pl.mmp,pl.mp+Math.round((2+pl.lv*.3)*(pl.sm.mpR||1)));if(S.t-pl.lastHurt>5)pl.hp=Math.min(pl.mhp,pl.hp+1+pl.lv*.2|0);
      if(sm.regen&&pl.hp<pl.mhp){pl.hp=Math.min(pl.mhp,pl.hp+sm.regen);S.nums.push({x:pl.x+6,y:pl.y-34,v:sm.regen,t:0,c:'#9bd04c'})}}
    if(pl.atk){const a=pl.atk;a.t+=dt;while(a&&a.i<a.frames.length&&a.t>=a.durs[a.i]){a.t-=a.durs[a.i];a.i++;if(a.i===a.hit&&a.fn)a.fn();if(a.i>=a.frames.length){pl.atk=null;if(WEAP()==='katana')katanaUse();break}}}
    else if(pl.drawnT>0){pl.drawnT-=dt;if(pl.drawnT<=0){pl.sheathT=.22;tone(720,.07,'triangle',.025,-300)}}
    if(pl.sheathT>0)pl.sheathT=Math.max(0,pl.sheathT-dt);
    if(pl.ultT>0){pl.ultT-=dt;pl.ultTick-=dt;if(pl.ultTick<=0){pl.ultTick=.15;aoe(pl.x,pl.y-14,70,.9+.3*rk('r_ult'));S.fx.push({k:'cut',x:pl.x+rnd(-60,60),y:pl.y-rnd(4,30),a:rnd(0,3.14),t:0,life:.25,c:'#ffffff'});sfx.slash()}}
    pl.stag=Math.max(0,pl.stag-dt);{const ac=armorClass(),stR=34*(ac==='heavy'?.72+.028*dRank('heavy'):ac==='medium'?1:1.15);
      pl.guard=!!inp.guard&&pl.onG&&!pl.atk&&!pl.roll&&pl.stag<=0&&!pl.dash&&pl.st>0;if(pl.guard&&!pl.wasG)pl.gT=S.t;pl.wasG=pl.guard;
      pl.stRe=Math.max(0,pl.stRe-dt);if(pl.stRe<=0&&!pl.guard)pl.st=Math.min(pl.mst,pl.st+stR*dt);
      if(pressed('roll')&&pl.onG&&!pl.roll&&pl.stag<=0&&!pl.dash){if(pl.st>=18){pl.roll={t:.34,d:dir||pl.face};pl.face=pl.roll.d;pl.st-=22;pl.stRe=.6;pl.atk=null;noise(.14,.03,700)}else S.nums.push({x:pl.x,y:pl.y-40,txt:'NO STAMINA',t:0,c:'#c8d468'})}}
    const busy=!!pl.atk||!!pl.dash||!!pl.roll||pl.stag>0||pl.guard;
    if(!busy&&!pl.climb){
      if(inp.attack&&pl.cd<=0)basicAttack();
      else for(let si=0;si<3;si++){if(!inp['s'+(si+1)]||pl.slotCd[si]>0)continue;const info=techInfo(pl.lo[si]);
        if(!info)continue;const why=techWhy(info);if(why||pl.mp<info.mp){if(S.t-(pl.whyT||-9)>1.2){pl.whyT=S.t;S.nums.push({x:pl.x,y:pl.y-44,txt:(why||'NOT ENOUGH MP').toUpperCase(),t:0,c:'#c9a8ff'})}continue}
        pl.mp-=info.mp;info.slot=si;pl.slotCd[si]=1;pl.slotMax[si]=pl.slotCd[si]=castTech(info);break}}
    if(inp.pot&&pl.potCd<=0&&pl.pots>0&&pl.hp<pl.mhp){pl.pots--;pl.potCd=4;const h=Math.round(pl.mhp*.4);pl.hp=Math.min(pl.mhp,pl.hp+h);S.nums.push({x:pl.x,y:pl.y-36,v:h,t:0,c:'#9bd04c'});sfx.pick()}
    if(pl.roll){pl.roll.t-=dt;pl.vx=pl.roll.d*205;if(Math.random()<.5)S.fx.push({k:'after',x:pl.x,y:pl.y,t:0,life:.14,img:PA.jumpS,f:pl.face});if(pl.roll.t<=0)pl.roll=null}
    else if(pl.dash){const d=pl.dash;d.t-=dt;pl.vx=pl.face*d.v;pl.vy=0;if(Math.random()<.7)S.fx.push({k:'after',x:pl.x,y:pl.y,t:0,life:.18,img:pl.atk?pl.atk.frames[0]:PA.idleS[0],f:pl.face});
      const b=pbox();b.l-=6;b.r+=6;for(const m of S.mobs)if(!m.dead&&!d.hit.has(m)&&ov(b,mbox(m))){d.hit.add(m);hitMob(m,d.mult,pl.face)}if(d.t<=0)pl.dash=null}
    else if(pl.kb>0){pl.kb-=dt;pl.vx*=.9}else{pl.vx=(pl.atk&&pl.onG)||pl.stag>0?0:dir*SPD*(1+sm.spd)*(pl.wet?.6:1)*(pl.guard?.35:1)*(hasCargo()?Math.min(.97,.85+.015*dRank('transport')):1);if(dir&&!pl.atk&&!pl.guard)pl.face=dir}
    if(pressed('jump')&&pl.onG&&!pl.atk&&!pl.dash){if(inp.down&&SEG.some(s=>s.t==='float'&&Math.abs(pl.y-s.y)<1&&pl.x>=s.x&&pl.x<=s.x+s.w)){pl.y+=2;pl.onG=false;pl.drop=.2}else{pl.vy=-JV*(pl.wet?.85:1);pl.onG=false;sfx.jump()}}
    if(!pl.dash)pl.vy=Math.min(pl.vy+GRAV*dt,420);
    const ox=pl.x;pl.x=clamp(pl.x+pl.vx*dt,Z.x0+8,Z.x1-8);wallPush(pl,pl.x-ox);
    const py=pl.y;pl.y+=pl.vy*dt;const ly=pl.drop>0?null:landY(pl.x,py,pl.y);
    if(ly!==null){pl.y=ly;if(!pl.onG&&pl.vy>200)for(let i=0;i<4;i++)S.parts.push({x:pl.x+rnd(-4,4),y:pl.y,vx:rnd(-30,30),vy:rnd(-30,-5),t:0,life:.3,c:'#cfc4a8',g:100,s:1});pl.vy=0;pl.onG=true}else if(!pl.dash)pl.onG=false;
    if(pl.y>WH+20){pl.x=Z.start;pl.y=topAt(pl.x)}
    if(Z.pools.length){const P0=Z.pools.find(q=>pl.x>q.x0&&pl.x<q.x1)||Z.pools[0],wet=pl.x>P0.x0&&pl.x<P0.x1&&pl.y>P0.y;if(wet&&!pl.wet){tone(200,.15,'sine',.05,-80);for(let i=0;i<10;i++)S.parts.push({x:pl.x+rnd(-6,6),y:P0.y,vx:rnd(-40,40),vy:rnd(-120,-40),t:0,life:.6,c:i%2?'#bff0ff':'#6cc4e0',g:420,s:1})}pl.wet=wet}else pl.wet=false;
    if(pl.onG&&Math.abs(pl.vx)>1)pl.walk+=dt*11;
    // shrine
    S.atShrine=!!(Z.shrine&&pl.onG&&Math.abs(pl.y-Z.shrine.y)<1&&pl.x>Z.shrine.x0&&pl.x<Z.shrine.x1);S.shrineT=Math.max(0,S.shrineT-dt);
    if(S.atShrine&&pressed('up')&&S.shrineT<=0){S.shrineT=3;pl.hp=pl.mhp;pl.mp=pl.mmp;[523,659,784].forEach((f,i)=>setTimeout(()=>tone(f,.25,'triangle',.05),i*110));S.nums.push({x:pl.x,y:pl.y-44,txt:'BLESSED',t:0,c:'#ffd27a'});qShrine();
      for(let i=0;i<24;i++)S.parts.push({x:pl.x+rnd(-14,14),y:pl.y-rnd(0,30),vx:rnd(-10,10),vy:rnd(-50,-15),t:0,life:1.2,c:i%2?'#ffd27a':'#fff4c2',g:-10,s:1})}
    // portals
    if(pl.onG)for(const po of Z.portals)if(Math.abs(pl.x-po.x)<16&&Math.abs(pl.y-po.y)<2)S.nearPortal=po;
    if(S.nearPortal&&S.portalCd<=0&&(inp.up||S.wantPortal)){const po=S.nearPortal,tz=ZONES[po.to];S.portalCd=1;
      if(pl.lv<tz.req){S.nums.push({x:pl.x,y:pl.y-40,txt:'SEALED · LV '+tz.req,t:0,c:'#ff6b6b'});sfx.hurt()}else travel(po)}
    S.wantPortal=false;
    S.nearNpc=null;let nd=28;for(const id of Z.npcs){const n=NPCS[id],d=Math.abs(pl.x-n.x);if(d<nd&&Math.abs(pl.y-n.y)<24){nd=d;S.nearNpc=id}}
    S.nearSt=S.nearNpc?null:nearStation();S.nearLore=S.nearNpc||S.nearSt?null:nearLore();S.nearCr=S.nearNpc||S.nearSt||S.nearLore?null:crNear();S.nearNode=S.nearNpc||S.nearSt||S.nearLore||S.nearCr?null:nearNode();
    if(!S.nearPortal&&!S.atShrine&&pressed('up')){if(S.nearNpc)openTalk(S.nearNpc);else if(S.nearSt)openStation(S.nearSt);else if(S.nearLore)openLore(S.nearLore);else if(S.nearCr)crUse(S.nearCr);else if(S.nearNode)gather(S.nearNode)}
  }
  // creatures
  for(const m of S.mobs){
    if(m.dead){if(m.temp)continue;m.resp-=dt;if(m.resp<=0&&!pl.dead)Object.assign(m,spawnMob(m.def));continue}
    const d=m.d;m.flash=Math.max(0,m.flash-dt);m.aggro=Math.max(0,m.aggro-dt);m.ph+=dt;
    if(m.psn&&m.psn.t>0){m.psn.t-=dt;m.psn.a+=dt;if(m.psn.a>=1){m.psn.a-=1;m.hp-=m.psn.dps;S.nums.push({x:m.x,y:m.y-d.h-4,v:m.psn.dps,t:0,c:'#9bd04c'});if(m.hp<=0){killMob(m);continue}}}
    if(S.t-(m.pT||0)>2)m.poise=Math.min(m.mpoise,m.poise+m.mpoise*.25*dt);
    if(m.stun>0){m.stun-=dt;continue}
    const dx=pl.x-m.x,near=Math.abs(dx)<d.aggro&&Math.abs(pl.y-m.y)<(d.fly?120:24);
    if(d.ai==='unbound'){unboundAI(m,dt,dx)}
    else if(d.boss){const enr=m.hp<m.mhp*.5,spd=enr?1.45:1;
      if(enr&&!m.enr){m.enr=1;banner('Phase two','The Seal Warden rages');sfx.slam()}
      for(const th of[.66,.33])if(m.hp<m.mhp*th&&!m.sum.includes(th)){m.sum.push(th);for(const o of[-110,110])S.mobs.push(Object.assign(spawnMob(['wisp',-2,clamp(m.x+o,60,WW-60)],m.lv-2),{temp:1,aggro:10}))}
      m.stT-=dt*spd;
      if(m.st==='walk'){m.dir=Math.sign(dx)||1;m.face=m.dir;m.x=clamp(m.x+m.dir*d.spd*spd*dt,m.minX,m.maxX);if(m.stT<=0){if(Math.abs(dx)>110||Math.random()<.35){m.st='lwind';m.stT=.6}else{m.st='wind';m.stT=.75}}}
      else if(m.st==='wind'){if(m.stT<=0){m.st='slam';m.stT=.5;slamWave(m,enr)}}
      else if(m.st==='slam'){if(m.stT<=0){m.st='walk';m.stT=rnd(1.8,2.8)}}
      else if(m.st==='lwind'){if(m.stT<=0){m.st='leap';m.stT=.75;m.lx0=m.x;m.lx1=clamp(pl.x,m.minX,m.maxX)}}
      else if(m.st==='leap'){const k=1-Math.max(0,m.stT)/.75;m.x=m.lx0+(m.lx1-m.lx0)*k;m.y=SEG[0].y-Math.sin(k*Math.PI)*70;
        if(m.stT<=0){m.y=SEG[0].y;m.st='slam';m.stT=.6;slamWave(m,enr);if(Math.abs(pl.x-m.x)<36&&pl.y>m.y-30)hurtPl(m.atk*1.2*lvHurt(m),m.x,m)}}}
    else if(d.fly){
      if(near||m.aggro){m.x+=Math.sign(dx)*d.spd*(Math.abs(dx)<50?-.5:1)*dt;m.y+=clamp(pl.y-24-m.y,-1,1)*d.spd*.7*dt}
      else{m.x+=m.dir*d.spd*.5*dt;m.y+=(m.baseY+Math.sin(m.ph*2)*10-m.y)*dt*2}
      if(m.x<m.minX||m.x>m.maxX){m.x=clamp(m.x,m.minX,m.maxX);m.dir*=-1}
      m.cd-=dt;if((near||m.aggro)&&m.cd<=0&&Math.abs(dx)<170){m.cd=rnd(2.2,3.2);m.face=Math.sign(dx)||1;const a=Math.atan2(pl.y-16-(m.y-7),dx);S.eproj.push({x:m.x,y:m.y-7,vx:Math.cos(a)*95,vy:Math.sin(a)*95,t:0,dmg:m.atk*lvHurt(m)});tone(260,.15,'sine',.03,-120)}}
    else{m.cd-=dt;
      if(m.st==='wind'){m.stT-=dt;if(m.stT<=0){m.st='lunge';m.stT=.3;m.kb=0;m.lv2=m.face*150}}
      else if(m.st==='lunge'){m.stT-=dt;m.x+=m.lv2*dt;if(m.stT<=0){m.st='walk';m.cd=rnd(2,3.2)}}
      else if(Math.abs(m.kb)>5){m.x+=m.kb*dt;m.kb*=.86}
      else{m.turn-=dt;if(m.turn<=0){m.turn=rnd(1.2,3);m.dir=Math.random()<.3?0:Math.random()<.5?-1:1}let dd=m.dir;const nr=near&&!d.passive;if((nr&&(d.ai!=='slime'||Math.abs(dx)<40))||m.aggro)dd=Math.sign(dx);if(d.ai==='ranged'&&(nr||m.aggro)&&Math.abs(dx)<75)dd=-Math.sign(dx)||1;
        m.x+=dd*(m.aggro?d.spd*1.6:d.spd)*dt;if(dd)m.face=dd;
        if(d.ai==='lunger'&&(nr||m.aggro)&&Math.abs(dx)<(d.elite?60:70)&&Math.abs(pl.y-m.y)<20&&m.cd<=0){m.st='wind';m.stT=d.elite?.7:.45;m.face=Math.sign(dx)||1}
        if(d.blink&&(nr||m.aggro)&&m.cd<=0&&Math.abs(dx)>90&&Math.abs(pl.y-m.y)<30){burst(m.x,m.y-12,'#ff5a3a');m.x=clamp(pl.x-Math.sign(dx)*28,m.minX,m.maxX);m.face=Math.sign(pl.x-m.x)||1;burst(m.x,m.y-12,'#ffb27a');m.cd=1.4;tone(140,.25,'sawtooth',.03,300)}
        if(d.ai==='ranged'){m.face=Math.sign(dx)||m.face;m.thr=Math.max(0,(m.thr||0)-dt);if((nr||m.aggro)&&m.cd<=0&&Math.abs(dx)<170&&Math.abs(pl.y-m.y)<40){m.cd=rnd(1.8,2.6);m.thr=.3;const a=Math.atan2(pl.y-14-(m.y-12),dx);S.eproj.push({x:m.x+m.face*6,y:m.y-12,vx:Math.cos(a)*120,vy:Math.sin(a)*120,t:0,dmg:m.atk*lvHurt(m)});noise(.05,.03,1400)}}}
      if(m.x<m.minX){m.x=m.minX;m.dir=1;if(m.st==='lunge')m.stT=0}if(m.x>m.maxX){m.x=m.maxX;m.dir=-1;if(m.st==='lunge')m.stT=0}}
    if(!pl.dead&&!(d.boss&&m.st==='leap')&&!(d.ai==='unbound'&&m.st==='blink')&&(!d.passive||m.aggro)&&ov(pbox(),mbox(m)))hurtPl(m.atk*lvHurt(m)*(m.st==='lunge'?1.3:1),m.x,m)}
  S.mobs=S.mobs.filter(o=>!(o.temp&&o.dead));
  for(const a of S.allies){a.life-=dt;a.ph=(a.ph||0)+dt;
    if(a.k==='thrall'||a.k==='comp'){if(a.rise>0){a.rise-=dt;continue}a.cd=Math.max(0,a.cd-dt);a.atkT=Math.max(0,a.atkT-dt);
      let tg=null,bd=a.k==='comp'?compRange():140;for(const m of S.mobs){if(m.dead)continue;const d=Math.abs(m.x-a.x);if(d<bd&&Math.abs(m.y-a.y)<(m.d.fly||a.fly?60:30)){bd=d;tg=m}}
      let dir=0;if(tg){const dx=tg.x-a.x;a.face=Math.sign(dx)||a.face;if(Math.abs(dx)>10+tg.d.w/2)dir=Math.sign(dx);else if(a.cd<=0){a.cd=a.k==='comp'&&compCmd()==='attack'?.7:.9;a.atkT=.25;const t2=tg;setTimeout(()=>{if(!t2.dead){if(a.k==='thrall')markUse('necro');hitMob(t2,a.k==='comp'?compMult():a.mult,a.face)};noise(.06,.04,1800)},120)}}
      else{const st2=a.k==='comp'&&compCmd()==='stay',dx=(st2?a.hx:pl.x-pl.face*(a.k==='comp'&&compCmd()==='guard'?8:16))-a.x;if(Math.abs(dx)>(st2?4:14)){dir=Math.sign(dx);a.face=dir}}
      if((Math.abs(pl.x-a.x)>(a.k==='comp'&&compCmd()==='stay'?420:240)||Math.abs(pl.y-a.y)>80)&&!(a.fly&&Math.abs(pl.x-a.x)<240)){burst(a.x,a.y-10,'#9a927a');a.x=pl.x-pl.face*14;a.y=pl.y;a.vy=0;a.rise=.3}
      a.vx=dir*62;const ox=a.x;a.x=clamp(a.x+a.vx*dt,8,WW-8);wallPush(a,a.x-ox);if(a.x===ox&&dir&&a.onG){a.vy=-220;a.onG=false}
      if(a.fly){a.y+=((tg?tg.y-(tg.d.fly?6:tg.d.h/2):pl.y-26)+Math.sin(S.t*3)*3-a.y)*Math.min(1,dt*4);a.vy=0;a.onG=true}else{a.vy=Math.min(a.vy+GRAV*dt,420);const py=a.y;a.y+=a.vy*dt;const ly=landY(a.x,py,a.y);if(ly!==null){a.y=ly;a.vy=0;a.onG=true}else a.onG=false;if(a.y>WH)a.y=pl.y,a.x=pl.x}a.walk=(a.walk||0)+Math.abs(a.vx)*dt*.12}
    else{let tg=null,bd=260;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-a.x,m.y-m.d.h/2-a.y);if(d<bd){bd=d;tg=m}}
      const tx=tg?tg.x:pl.x+Math.cos(a.ph*2)*30,ty=tg?tg.y-tg.d.h/2:pl.y-34+Math.sin(a.ph*3)*10,ang=Math.atan2(ty-a.y,tx-a.x);
      a.vx+=(Math.cos(ang)*150-a.vx)*Math.min(1,dt*3);a.vy+=(Math.sin(ang)*150-a.vy)*Math.min(1,dt*3);a.x+=a.vx*dt;a.y+=a.vy*dt;a.face=Math.sign(a.vx)||1;
      if(tg&&bd<12&&(a.hits.get(tg)||0)<=S.t){a.hits.set(tg,S.t+.5);markUse('necro');hitMob(tg,a.mult,a.face)}
      if(Math.random()<.4)S.parts.push({x:a.x,y:a.y,vx:0,vy:rnd(-5,5),t:0,life:.4,c:Math.random()<.5?'#7a5aa0':'#4a2e6a',g:0,s:1})}
    if(a.life<=0)for(let i=0;i<8;i++)S.parts.push({x:a.x,y:a.y-(a.k==='thrall'?10:0),vx:rnd(-40,40),vy:rnd(-80,-10),t:0,life:.5,c:i%2?'#d9d2bc':'#5d8a6a',g:a.k==='thrall'?300:0,s:1})}
  S.allies=S.allies.filter(a=>a.life>0);
  for(const w of S.waves){w.t+=dt;if(w.t<0)continue;w.x+=w.dir*140*dt;if(!pl.dead&&pl.onG&&Math.abs(pl.x-w.x)<9)hurtPl(w.dmg,w.x-w.dir*10)}S.waves=S.waves.filter(w=>w.t<1.4);
  for(const e of S.eproj){e.t+=dt;e.x+=e.vx*dt;e.y+=e.vy*dt;const b=pbox();if(!pl.dead&&e.x>b.l-2&&e.x<b.r+2&&e.y>b.t-2&&e.y<b.b){e.t=9;if((pl.guard&&Math.sign(e.x-pl.x)===pl.face&&S.t-pl.gT<parryWin())||armsReflect()){parryFX(e.x,e.y);S.proj.push({k:'bolt',x:e.x,y:e.y,vx:-e.vx*1.7,vy:-e.vy*1.7,t:0,life:1.4,mult:1.6,hit:new Set(),f:-Math.sign(e.vx)||pl.face,dl:0})}else hurtPl(e.dmg,e.x-e.vx*.1)}}S.eproj=S.eproj.filter(e=>e.t<2.4);
  for(const pr of S.proj){if(pr.dl>0){pr.dl-=dt;continue}pr.t+=dt;pr.x+=pr.vx*dt;pr.y+=pr.vy*dt;
    if(pr.home){let tg=null,bd=130;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-pr.x,m.y-m.d.h/2-pr.y);if(d<bd&&Math.sign(m.x-pr.x)===Math.sign(pr.vx)){bd=d;tg=m}}
      if(tg){const sp=Math.hypot(pr.vx,pr.vy),a0=Math.atan2(pr.vy,pr.vx),a1=Math.atan2(tg.y-tg.d.h/2-pr.y,tg.x-pr.x);let da=a1-a0;while(da>Math.PI)da-=6.28;while(da<-Math.PI)da+=6.28;const na=a0+clamp(da,-4*dt,4*dt);pr.vx=Math.cos(na)*sp;pr.vy=Math.sin(na)*sp}
      if(Math.random()<.7)S.parts.push({x:pr.x,y:pr.y,vx:rnd(-6,6),vy:rnd(-6,6),t:0,life:.35,c:Math.random()<.5?'#c9a8ff':'#9bd04c',g:0,s:1})}
    if(pr.k==='bolt'&&Math.random()<.6)S.parts.push({x:pr.x,y:pr.y,vx:rnd(-8,8),vy:rnd(-8,8),t:0,life:.35,c:Math.random()<.5?WT_PROJ.orb:'#d8ff9a',g:0,s:1});
    if(pr.vy>200&&pr.y>topAt(pr.x)+2){pr.t=9;continue}
    const R=pr.k==='wave'?10:pr.k==='pierce'?8:5,V=pr.k==='wave'?14:7;
    for(const m of S.mobs){if(m.dead||pr.hit.has(m))continue;const b=mbox(m);if(pr.x+R>b.l&&pr.x-R<b.r&&pr.y+V>b.t&&pr.y-V<b.b){pr.hit.add(m);hitMob(m,pr.mult*(pr.holy&&SPIRITS[m.t]?2*(1+pl.sm.holyP):1),pr.f);if(!pr.pierce){pr.t=9;break}}}}
  S.proj=S.proj.filter(p=>p.t<p.life);
  for(const dr of S.drops){dr.t+=dt;if(!dr.g){dr.vy=Math.min(dr.vy+GRAV*dt,400);dr.x=clamp(dr.x+dr.vx*dt,8,WW-8);const py=dr.y;dr.y+=dr.vy*dt;const ly=landY(dr.x,py,dr.y);if(ly!==null){dr.y=ly;dr.g=1}}
    if(!pl.dead&&dr.t>.35&&Math.abs(dr.x-pl.x)<14&&Math.abs(dr.y-(pl.y-6))<24){
      if(dr.k==='gear'){if(pl.bag.length>=BAG_MAX){if(S.t-(S.fullMsg||-9)>2.5){S.fullMsg=S.t;S.nums.push({x:pl.x,y:pl.y-40,txt:'BAG FULL',t:0,c:'#f2e6c8'})}continue}
        pl.bag.push(dr.it);S.nums.push({x:dr.x,y:dr.y-14,txt:itemName(dr.it),t:0,c:RAR[dr.it.r].c});save()}
      else if(dr.k==='shard'){pl.shards+=dr.amt;S.nums.push({x:dr.x,y:dr.y-10,v:dr.amt,t:0,c:'#d4483a'})}else pl.pots=Math.min(9,pl.pots+1);
      dr.got=1;sfx.pick()}}
  S.drops=S.drops.filter(d=>!d.got&&d.t<40);
  for(const f of S.fx)f.t+=dt;S.fx=S.fx.filter(f=>f.t<f.life);
  for(const p of S.parts){p.t+=dt;p.vy+=(p.g||0)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt}S.parts=S.parts.filter(p=>p.t<p.life);
  for(const n of S.nums){n.t+=dt;n.y-=18*dt}S.nums=S.nums.filter(n=>n.t<(n.txt?1.4:.9));
  const tx=clamp(pl.x-W*.45,0,Math.max(0,WW-W)),ty=clamp(pl.y-H*.64,0,WH-H);S.cam+=(tx-S.cam)*Math.min(1,dt*5);S.camY+=(ty-S.camY)*Math.min(1,dt*5);
  if(WW<W)S.cam=(WW-W)/2;
  for(const k in inp)prev[k]=inp[k];
}
function unboundAI(m,dt,dx){const enr=m.hp<m.mhp*.5;if(enr&&!m.enr){m.enr=1;banner('Phase two','The Unbound unravels');tone(70,1.2,'sawtooth',.06,40)}
  const gy=topAt(m.x),hover=gy-36+Math.sin(m.ph*1.6)*6,near=Math.abs(dx)<m.d.aggro;m.face=Math.sign(dx)||1;m.cast=Math.max(0,(m.cast||0)-dt);
  if(m.st==='blink'){m.stT-=dt;if(m.stT<=0){m.st='walk';m.x=clamp(pl.x+(Math.random()<.5?-1:1)*(90+Math.random()*40),m.minX,m.maxX);burst(m.x,m.y-20,'#c9a8ff');m.cd=1.2}return}
  if(!near&&!m.aggro){m.y+=(hover-m.y)*dt*2;return}
  const want=Math.abs(dx)<70?-Math.sign(dx):Math.abs(dx)>140?Math.sign(dx):0;m.x=clamp(m.x+want*m.d.spd*dt,m.minX,m.maxX);m.y+=(hover-m.y)*dt*2;
  m.cd-=dt*(enr?1.5:1);if(m.cd>0)return;const r=Math.random(),fiends=S.mobs.filter(o=>o.temp&&!o.dead).length;
  if(r<.5){const n=enr?11:7,a0=Math.atan2(pl.y-16-(m.y-24),dx);m.cast=.5;for(let i=0;i<n;i++){const a=a0+(i-(n-1)/2)*.16;S.eproj.push({x:m.x,y:m.y-24,vx:Math.cos(a)*105,vy:Math.sin(a)*105,t:0,dmg:m.atk*.7*lvHurt(m),sh:1})}tone(1300,.3,'triangle',.03,-700);m.cd=2.2}
  else if(r<.75&&fiends<2){m.cast=.8;for(let k=0;k<2;k++){const f=spawnMob(['fiend',m.def[1],m.x+(k?40:-40)],Math.max(1,m.lv-2));f.x=clamp(m.x+(k?40:-40),m.minX,m.maxX);f.temp=true;f.aggro=8;S.mobs.push(f);burst(f.x,f.y-12,'#ff5a3a')}tone(90,.8,'sawtooth',.05,60);m.cd=3}
  else{m.st='blink';m.stT=.5;burst(m.x,m.y-20,'#c9a8ff');m.cd=2}}
function slamWave(m,enr){sfx.slam();const dm=m.atk*.8*lvHurt(m);for(let i=0;i<14;i++)S.parts.push({x:m.x+rnd(-20,20),y:m.y,vx:rnd(-60,60),vy:rnd(-80,-20),t:0,life:.5,c:'#cfc4a8',g:300,s:2});
  S.waves.push({x:m.x-20,dir:-1,t:0,dmg:dm},{x:m.x+20,dir:1,t:0,dmg:dm});if(enr)S.waves.push({x:m.x-20,dir:-1,t:-.4,dmg:dm},{x:m.x+20,dir:1,t:-.4,dmg:dm})}
const WT_PROJ={orb:'#9bd04c'};
