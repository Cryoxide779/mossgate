/* ---------- Regions of Ashveil Reach, level bands 1–70, the level cap and Mastery ---------- */
/* Seven regions ship now (cap 35). Seven more are reserved; each raises the cap by 5 when it is built. */
const REGIONS=[
  {id:'cresthollow',n:'CrestHollow',lv:[1,5],built:1},
  {id:'whisper',n:'Whisper Woods',lv:[5,10],built:1},
  {id:'stonebridge',n:'Stonebridge',lv:[10,15],built:1},
  {id:'mistyfen',n:'Misty Fen Lake',lv:[15,20],built:1},
  {id:'marrowbog',n:'Marrowbog',lv:[20,25],built:1},
  {id:'watchtower',n:'Old Watchtower',lv:[25,30],built:1},
  {id:'scar',n:'The Sundering Scar',lv:[30,35],built:1},
  {id:'golden',n:'The Golden Plains',lv:[35,40]},
  {id:'silverwood',n:'Silverwood Wilds',lv:[40,45]},
  {id:'verdant',n:'The Verdant Coast',lv:[45,50]},
  {id:'emerald',n:'Emerald Isles',lv:[50,55]},
  {id:'saltsong',n:'Saltsong Desert',lv:[55,60]},
  {id:'frostveil',n:'Frostveil Expanse',lv:[60,65]},
  {id:'crown',n:'The Shattered Crown',lv:[65,70]}];
const CAP=Math.max(...REGIONS.filter(r=>r.built).map(r=>r.lv[1])),CAP_MAX=70;
/* zone → region and level band */
const ZBAND={town:['cresthollow',1,1],hearth:['cresthollow',1,1],home:['cresthollow',1,1],hunt:['cresthollow',2,2],road:['cresthollow',1,2],ruins:['cresthollow',2,4],under:['cresthollow',3,4],cellar:['cresthollow',4,4],cistern:['cresthollow',5,5],riversmeet:['cresthollow',2,3],stonefield:['cresthollow',3,4],mirefen:['cresthollow',4,5],highsteps:['cresthollow',1,1],
  outskirts:['whisper',5,6],briarwood:['whisper',6,7],oak:['whisper',6,8],briarlair:['whisper',7,7],whisperwood:['whisper',5,5],whispergrove:['whisper',6,7],moonpetal:['whisper',7,8],thornveil:['whisper',8,9],elderwood:['whisper',9,10],hermit:['whisper',7,8],sawmill:['whisper',8,10],mossroot:['whisper',9,10],
  stonebridge:['stonebridge',10,10],quarry:['stonebridge',11,13],qfort:['stonebridge',14,14],rivermere:['stonebridge',10,10],ironvale:['stonebridge',11,11],granite:['stonebridge',12,13],blackgate:['stonebridge',13,14],stonewatch:['stonebridge',14,15],
  falls:['mistyfen',15,17],shrine:['mistyfen',17,19],fenwater:['mistyfen',15,15],reedshore:['mistyfen',16,17],glasswater:['mistyfen',17,18],serpent:['mistyfen',18,19],archive:['mistyfen',19,20],
  bog:['marrowbog',20,22],lab:['marrowbog',21,23],reach:['marrowbog',23,25],vats:['marrowbog',24,24],
  tower:['watchtower',25,27],siege:['watchtower',26,28],gate:['watchtower',27,29],outcrop:['watchtower',28,30],
  scar:['scar',30,32],inner:['scar',32,34],hollow:['scar',35,35]};
const REG=id=>REGIONS.find(r=>r.id===id);
const zoneRegion=z=>{const b=ZBAND[z.id];return b?REG(b[0]):null};
/* Emberwatch is Emberbrook on the CrestHollow sheet */
{const rn=s=>typeof s==='string'?s.replace(/Emberwatch/g,'Emberbrook'):s;for(const z of ZONES){z.name=rn(z.name);if(z.labels)z.labels.forEach(l=>l[1]=rn(l[1]))}
 for(const q of Object.values(QUESTS))for(const k of['title','offer','desc','where','prog','done'])q[k]=rn(q[k]);for(const L of Object.values(LORE)){L.t=rn(L.t);L.txt=rn(L.txt)}
 for(const n of Object.values(NPCS)){n.title=rn(n.title);if(n.lines)n.lines=n.lines.map(rn)}if(BARKS.hadda)BARKS.hadda=BARKS.hadda.map(rn)}
/* ink wisps drift through the old courier tunnels under CrestHollow */
{const u=ZONES[zIdx('under')];u.mobs.push(['wisp',-2,620],['wisp',-2,1240])}
/* creature stats were tuned for their old zone; bring every creature to a level-1 baseline so level alone sets its strength */
{const nat={};for(const z of ZONES){if(z.interior||z.id==='deep'||!ZBAND[z.id])continue;for(const d of z.mobs){const t=d[0];nat[t]=Math.min(nat[t]??99,z.lv[0])}}Object.assign(nat,{breaker:6,sapper:6,warhound:6,gorrak:7});
 for(const[t,n]of Object.entries(nat)){const d=MOBS[t];if(!d||n<=1||d.base1)continue;const b=d.boss;d.hp=Math.max(1,Math.round(d.hp/(1+(b?.14:.25)*(n-1))));d.atk=Math.max(1,Math.round(d.atk/(1+(b?.12:.2)*(n-1))));
   d.exp=Math.max(1,Math.round(d.exp/(1+.3*(n-1))));if(d.shard)d.shard=d.shard.map(v=>Math.max(1,Math.round(v/(1+.12*(n-1)))))}}
/* apply the bands */
const OLD_LV={};
for(const z of ZONES){OLD_LV[z.id]=[...z.lv];const b=ZBAND[z.id];if(!b)continue;z.lv=[b[1],b[2]];z.ch=REG(b[0]).n;z.req=z.safe?1:Math.max(1,b[1]-1);
  z.mobs.forEach((d,i)=>{d[3]=z.lv[0]+Math.floor(hash(i,z.lv[0]*31+z.ww,7)*(z.lv[1]-z.lv[0]+1))})}
/* ---------- the main story, re-routed one chapter per region ---------- */
const MQ=QUESTS;
const setQ=(k,o)=>{MQ[k]=Object.assign(MQ[k]||{main:1},o)};
setQ('m3',{ch:1,lv:3,pre:'m2',to:'wren',title:'Lanterns Below',
  offer:'Lantern Archive couriers carried signals between the districts through the old service tunnels under CrestHollow. When the Gatefall came, many died down there. Their memories still drift as Ink Wisps, each holding an ember of what it saw. Archivist Wren can read them. Bring her four from the Underworks.',
  desc:'Gather Lantern Embers from Ink Wisps in the Underworks and bring them to Archivist Wren.',goal:{t:'collect',mob:'wisp',item:'Lantern Ember',n:4,p:.6,zone:'under'},where:'CrestHollow Underworks, through the hatch on the main street',
  prog:'The wisps drift through the Underworks tunnels. Take the embers to Wren at the Lantern Annex, not to me.'});
setQ('c1',{main:1,ch:1,title:'Three Stamps',giver:'wren',pre:'m3',lv:4,
  offer:'Before you go, look at these papers again. Three stamps, not one. The Archive split every seal pattern between three keepers: the Lector, the Warden-Captain and the Concordance Chair. No keeper could open a containment alone. Whoever opened MossGate held all three. Sit with me a moment. I need to tell you who they were.',
  desc:'Hear Archivist Wren out about the three seal-keepers.',goal:{t:'talk',npc:'wren'},where:'CrestHollow, Lantern Annex',prog:'Wren is at the Lantern Annex.',
  done:'Lector Aurin, my teacher, lost in the fall. The Concordance Chair, whoever held it that night; the records are sealed. And the Warden-Captain of MossGate... was Maren Holt’s mother. Three keepers, three seals, one open gate. We start with the one closest to home. That is the end of the beginning.',reward:{exp:200,sh:30,sp:1}});
setQ('m12',{ch:2,pre:'c1',lv:5});
setQ('m13',{ch:2});setQ('m14',{ch:2});setQ('m15',{ch:2});setQ('m16',{ch:2,lv:8});
setQ('m17',{ch:2,done:'Hear that? The tunnels are humming again. The spirit is awake, and she is not happy. The rot did not climb the roots on its own. Wagons dumped Scar slag in the Hollow: wagons with Concordance freight marks, out of Stonebridge. The rot took your captain’s ring east with it, toward Marrowbog. Find where those wagons came from.'});
setQ('c3a',{main:1,ch:3,title:'Concordance Freight',giver:'tansy',pre:'m17',lv:10,to:'oswin',
  offer:'The spirit showed me the wagons. Grey canvas, iron bands, a stamp like a closed eye. Your bridge people in Stonebridge will know that mark. Ask the Bridgewarden.',
  desc:'Ask Oswin in Stonebridge about the Concordance freight mark.',goal:{t:'talk',npc:'oswin'},where:'Stonebridge, across from CrestHollow',prog:'Oswin keeps the Great Bridge in Stonebridge.',
  done:'A closed eye. Concordance bonded freight: nobody opens it, nobody weighs it, nobody asks. Those wagons run out of the quarry works. The manifests are kept in the fortress at the top of the quarry, and the Freeband sit on it now. If you want to know what the Concordance has been moving, that is where it is written.',reward:{exp:900,sh:60}});
setQ('c3b',{main:1,ch:3,title:'The Manifest',giver:'oswin',pre:'c3a',lv:13,
  offer:'Get up to the Quarry Fortress and find the bonded manifest. The Freeband will not hand it over, and the engine they keep up there does not care who you are. Bring me whatever is written.',
  desc:'Find the Concordance manifest in the Quarry Fortress.',goal:{t:'lore',id:'qrM',n:1},where:'Quarry Fortress, at the top of Stonebridge Quarry',prog:'The manifest will be in the fortress. Look for something written.',
  done:'Slag from the Scar, carried west on the fen road, signed for by a Lantern courier seal. Lantern couriers have been dead since the Gatefall. Someone is using a dead courier’s seal to move Scar cargo across Misty Fen Lake. Tilla runs the lake ferries. Start with her.',reward:{exp:1800,sh:120,sp:1}});
LORE.qrM={z:'qfort',x:1040,k:'book',t:'Bonded Manifest',txt:'“Concordance bond. Cargo: Scar slag, forty carts. Route: Fenwatch, the fen road, Marrowbog landing. Receiving seal: Lantern Courier 7. Countersigned: the Chair.” The Chair’s mark is a closed eye.'};
setQ('c4a',{main:1,ch:4,title:'Lanterns in the Fen',giver:'tilla',pre:'c3b',lv:15,to:'ivo',
  offer:'Lantern couriers carried signals across the fen road. When the Gatefall came, many drowned out here. Their memories still drift over the lake as Ink Wisps, each holding an ember of what it saw. If a dead courier is signing for cargo, the wisps saw who. Bring four embers to Sister Ivo at the Overgrown Shrine. She reads them better than I do.',
  desc:'Gather Lantern Embers from Ink Wisps on Misty Fen Lake and bring them to Sister Ivo.',goal:{t:'collect',mob:'wisp',item:'Lantern Ember',n:4,p:.6,zone:'falls'},where:'Misty Fen Lake',
  prog:'The wisps drift over the lake. Take the embers to Sister Ivo at the Overgrown Shrine.',
  done:'Courier Seven drowned the night of the Gatefall. These embers show his satchel taken from the water by someone in a Lector’s grey. The Lector’s people are using the dead courier’s seal. And they have been coming to the shrine stone at night.',reward:{exp:2000,sh:120}});
setQ('c4b',{main:1,ch:4,title:'The Drowned Seal',giver:'ivo',pre:'c4a',lv:17,
  offer:'They come for the waystone. Something in the shrine still answers a Lector’s seal, and they want it. When the stone wakes tonight, hold the shrine. Whatever comes through, do not let them have it.',
  desc:'Hold the Overgrown Shrine when the waystone wakes.',goal:{t:'event',id:'shrinedef',n:1,lab:'The shrine held'},where:'The Overgrown Shrine, past Misty Fen Lake',prog:'Wake the waystone and hold the shrine.',
  done:'Held. And this was in the stone’s hollow: delivery orders, sealed with the same courier seal, addressed to Marrowbog. Sef in Marrowbog reads drowned orders. Take them to her.',reward:{exp:2600,sh:150,sp:1}});
setQ('m7',{ch:5,giver:'ivo',pre:'c4b',lv:20,
  offer:'Take these orders to Sef in Marrowbog. She has been finding the same seal on drowned deliveries in the bog. I need to know if this is coincidence or a pattern.',
  prog:'Sef is in Marrowbog, south across the fen.',
  done:'Not coincidence. Every phantom order routes the same way: to the Old Watchtower, then north into the Scar. Someone is using a dead beacon to direct sealed cargo. And the rot that came through the Hollow? It pooled here, in the Rotting Reach. Your captain’s ring went with it.'});
setQ('m18',{ch:5,giver:'sef',pre:'m7',lv:23,
  offer:'Past the bog, the Rotting Reach. The rot from Mossroot pooled there and grew a heart. The Rootheart sits at the far end, where every sick root meets. Cut it out. Take back what it swallowed. Brother Alder of the Lantern Order camps at the Reach’s edge. He will tell you what the rot does to the careless.',
  done:'Here. Your captain’s seal-ring, clean of rot. The Mossroot folk will be glad, and so will her daughter. Take it to Maren. She has waited long enough.'});
setQ('m19',{ch:5,giver:'sef',pre:'m18',offer:'Go. A daughter should hold her mother’s ring before anyone else does.',
  done:'Her ring. She gave it away so nobody could take it from her hand. That was her: stubborn to the last. So my mother’s seal is safe, with me. The Lector’s seal is moving through dead couriers. And the orders all run to the Old Watchtower. Go and find out what that beacon is saying.'});
setQ('m8',{ch:6,giver:'holt',pre:'m19',lv:25,
  offer:'The phantom orders all route through the Old Watchtower beacon. The wisps around the tower carry echoes of its signal. Bring Ilse three Signal Echoes. She reads route codes.'});
setQ('m4',{ch:6,giver:'ilse',pre:'m8',lv:27,
  offer:'Before anyone goes into the Scar, the Broken Road has to be cleared. The Concordance road wardens who died there still walk it, all ash and habit, stopping every wagon that passes. Captain Holt calls them her old patrol. Give them rest, and the road north is open.',
  done:'Thank you. Maren will carve their names on the Hollow Square board tonight, under "found". This came from a Warden cache on the road. And the road to the Scar is open.'});
setQ('m9',{ch:7,giver:'ilse',pre:'m4',lv:30});
MQ.m4.goal={...MQ.m4.goal,zone:'gate'};
setQ('m10',{ch:7,lv:32});
setQ('m11',{ch:7,pre:'m10',done:'Lector Aurin’s seal-book. He was my teacher. If his seal is still moving, he is alive, or someone has his hand. The Warden seal is safe with Maren. Two of three keepers accounted for. And the thing that guarded the chamber at the heart of the Scar is still standing. Corwin says it must come down.'});
setQ('m5',{ch:7,giver:'wren',pre:'m11',lv:34,
  offer:'At the heart of the Sundering Scar stands a Seal Warden: a relic construct the Warden Orders built to guard the containment chamber. It is still following its last instruction, and it kills anything that comes near. If someone ordered the seals open, that construct heard the order. Break it, and bring me its core.',
  where:'Scar Heart, beyond the Outer Scar',prog:'The Scar Heart lies past the Outer Scar. Its boundary shifts against the unprepared.',
  done:'It is down? Then the Orders’ last guardian rests. Take this: the construct’s own steel. Now give me the core and give me a moment with it.'});
setQ('m6',{ch:7,giver:'wren',pre:'m5',goal:{t:'talk',npc:'holt'},to:'holt',title:'What Was Beneath',
  offer:'Go and fetch Maren. She should hear this from both of us.',desc:'Bring Captain Holt to hear what the Seal Warden’s core holds.',where:'CrestHollow, the Warden barracks',prog:'Holt is at the barracks.',
  done:'Wren read it to me. Its last instruction was not "hold the seal". It was "release", issued with all three seals, three days before the Gatefall. My mother’s ring was never used, so someone forged hers. Someone inside MossGate opened the seals on purpose. Go back to Wren. Ask her the question I cannot make myself ask.'});
setQ('m20',{ch:7,giver:'holt',pre:'m6',done:'The Concordance Chair on the night of the Gatefall was Ossery Vale. He survived. He sits on the CrestHollow council today, and he countersigns every caravan charter that leaves this town. Last week he was in this room, asking very politely after the Lector’s seal-book. I told him it was lost. To be continued: The Concordance.'});
const MAIN_ORDER=['m1','m2','m3','c1','m12','m13','m14','m15','m16','m17','c3a','c3b','c4a','c4b','m7','m18','m19','m8','m4','m9','m10','m11','m5','m6','m20'];
const CH_NAMES=['Chapter I · Papers That Disagree','Chapter II · The Captain’s Daughter','Chapter III · Concordance Freight','Chapter IV · Lanterns in the Fen','Chapter V · Rot at the Root','Chapter VI · The Lit Tower','Chapter VII · The Third Seal'];
/* chapter labels */
for(const k in MQ){const q=MQ[k];if(q.main&&!q.ch)q.ch=1}
/* ---------- side quests: level gates and rewards follow their region ---------- */
const MAINLV={m1:1,m2:1,m3:3,c1:4,m12:5,m13:6,m14:7,m15:9,m16:9,m17:9,c3a:10,c3b:13,c4a:15,c4b:17,m7:20,m18:23,m19:24,m8:25,m4:27,m9:30,m10:32,m11:33,m5:34,m6:34,m20:34};
const NEW_Q=['c1','c3a','c3b','c4a','c4b'];
{const zoneOfNpc={};for(const z of ZONES)(z.npcs||[]).forEach(n=>{if(zoneOfNpc[n]==null)zoneOfNpc[n]=z.id});
 const zoneOfMob={};for(const z of ZONES){if(z.interior||z.id==='deep'||!ZBAND[z.id])continue;for(const d of z.mobs)if(zoneOfMob[d[0]]==null)zoneOfMob[d[0]]=z.id}
 const NL={},OL={};
 const newLv=k=>{if(NL[k])return NL[k];const q=MQ[k];if(!q)return 1;if(MAINLV[k])return NL[k]=MAINLV[k];const g=q.goal||{};const zid=g.zone||(g.mob&&zoneOfMob[g.mob])||zoneOfNpc[q.giver];const nb=ZBAND[zid];
   let v=nb?nb[1]:1;if(q.pre&&MQ[q.pre])v=Math.max(v,newLv(q.pre));return NL[k]=v};
 /* every quest pays a fixed share of a level at its own level: talk 12%, tasks 28%, boss kills 70% */
 const share=q=>{const g=q.goal||{};if(g.t==='talk')return.12;if(g.t==='kill'&&MOBS[g.mob]&&(MOBS[g.mob].boss||MOBS[g.mob].bb))return.7;return.28};
 for(const[k,q]of Object.entries(MQ)){const nl=newLv(k);if(q.lv||MAINLV[k])q.lv=nl;const xp=Math.round(need(nl)*share(q)),sh=Math.round((8+nl*4)*(share(q)/.28));
   if(q.reward){if(q.reward.exp)q.reward.exp=xp;if(q.reward.sh)q.reward.sh=sh}
   if(q.choices)for(const c of q.choices)if(c.reward){if(c.reward.exp)c.reward.exp=Math.round(xp*.8);if(c.reward.sh)c.reward.sh=Math.round(sh*2)}
   if(q.where)q.where=q.where.replace(/ \(sealed until Lv \d+\)/,'')}}
/* a region's quests together pay at most what its levels need, so fighting still matters where side quests are plentiful */
{const rq={},ql={},lvOf=k=>{if(ql[k])return ql[k];const q=MQ[k];return ql[k]=q.lv||(q.pre&&MQ[q.pre]&&q.pre!==k?lvOf(q.pre):1)};for(const[k,q]of Object.entries(MQ)){const l=lvOf(k),r=REGIONS.find(r=>r.built&&l>=r.lv[0]&&l<r.lv[1]);if(!r)continue;(rq[r.id]=rq[r.id]||[]).push(q)}
 for(const r of REGIONS){const qs=rq[r.id];if(!qs)continue;let nd=0;for(let l=r.lv[0];l<r.lv[1];l++)nd+=need(l);const tot=qs.reduce((a,q)=>a+((q.reward&&q.reward.exp)||0),0),cap=nd*.75;if(tot<=cap)continue;const f=cap/tot;
  for(const q of qs){if(q.reward&&q.reward.exp)q.reward.exp=Math.max(5,Math.round(q.reward.exp*f));if(q.choices)for(const c of q.choices)if(c.reward&&c.reward.exp)c.reward.exp=Math.max(5,Math.round(c.reward.exp*f))}}}
/* hardcoded spawn levels follow the zone */
/* ---------- level cap and Mastery ---------- */
const MASTERY=[{id:'might',n:'Might',d:'+1% attack per rank'},{id:'vigor',n:'Vigor',d:'+1% health per rank'},{id:'focus',n:'Focus',d:'+0.5% critical chance per rank'},
  {id:'fortune',n:'Fortune',d:'+2% shards per rank'},{id:'craft',n:'Craft',d:'+2% chance of a bonus gather per rank'}];
const MX_MAX=50,MX_TITLES=[[0,''],[5,'Veteran'],[15,'Champion'],[40,'Paragon'],[100,'Mythic'],[200,'Legend of the Reach']];
const MX=()=>pl.mx||(pl.mx={pts:0,tot:0,r:{}});
const mxRank=k=>(MX().r[k]|0);
function mxTitle(){const t=MX().tot;let s='';for(const[n,l]of MX_TITLES)if(t>=n)s=l;return s}
const _ge2=gainExp;gainExp=function(e){while(pl.lv<CAP){const toNext=need(pl.lv)-pl.exp;if(e<toNext){_ge2(e);return}_ge2(toNext);e-=toNext}if(e<=0)return;
  pl.exp+=e;let got=0;while(pl.exp>=need(CAP)){pl.exp-=need(CAP);const M=MX();M.pts++;M.tot++;got++}
  if(got){banner('Mastery +'+got,'Spend it from the menu · '+MX().pts+' unspent');[523,659,784].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.05),i*110));save()}};
const _skm=skillMods;skillMods=function(){const m=_skm();if(pl.mx){m.atkP=(m.atkP||0)+.01*mxRank('might');m.hpP=(m.hpP||0)+.01*mxRank('vigor');m.crit=(m.crit||0)+.5*mxRank('focus')}return m};
/* fortune: shard pickups grow; craft: bonus gathers */
const _amx=addMat;addMat=function(k,n,...a){if(pl.mx&&mxRank('craft')&&Math.random()<.02*mxRank('craft'))n+=1;return _amx(k,n,...a)};
/* ---------- the Veinway Deep across the full band ---------- */
function deepLv(n){return clamp(Math.round(n*CAP_MAX/100),1,CAP)}
function deepOver(n){return Math.max(0,Math.round(n*CAP_MAX/100)-CAP)}
function deepOverMob(m,n){const o=deepOver(n);if(!o)return;const k=1+.05*o;m.mhp=m.hp=Math.round(m.mhp*k);m.atk=Math.round(m.atk*(1+.03*o));m.exp=Math.round(m.exp*(1+.04*o))}
/* ---------- mastery panel ---------- */
let MXP=null;
function openMastery(){MXP={};pauseFor('mastery');renderMastery()}
function renderMastery(){if(!MXP)return;const M=MX(),capped=pl.lv>=CAP;
  $('mxbody').innerHTML=`<div class="dn">Mastery${mxTitle()?' · '+mxTitle():''}</div>
   <p class="crp">${capped?`You have reached the level cap of ${CAP}. Experience now earns Mastery points: <b>${M.pts}</b> unspent, ${M.tot} earned. Next point: ${Math.floor(pl.exp/need(CAP)*100)}%.`:`Mastery opens at level ${CAP}, the current cap. Each region still to come raises it by five, up to ${CAP_MAX}. After the cap, experience keeps paying out as Mastery points.`}</p>
   <div style="display:grid;gap:6px">${MASTERY.map(t=>`<div class="qi" style="display:grid;grid-template-columns:1fr auto;align-items:center;gap:8px"><span><b>${t.n} · ${mxRank(t.id)}/${MX_MAX}</b><br><small>${t.d}</small></span><button class="btn sm" data-mx="${t.id}" ${!capped||!M.pts||mxRank(t.id)>=MX_MAX?'disabled':''}>+1</button></div>`).join('')}</div>
   <div class="qh">Ashveil Reach</div><div class="crp" style="display:grid;gap:3px">${REGIONS.map(r=>`<span style="opacity:${r.built?1:.55}">${r.n} · Lv ${r.lv[0]}–${r.lv[1]}${r.built?'':' · uncharted'}</span>`).join('')}</div>`}
$('mastery').addEventListener('click',e=>{const b=e.target.closest('[data-mx],#mxclose');if(!b||!MXP)return;if(b.id==='mxclose'){MXP=null;return unpause('mastery')}
  const M=MX(),k=b.dataset.mx;if(!M.pts||mxRank(k)>=MX_MAX)return;M.pts--;M.r[k]=mxRank(k)+1;recalc();sfx.pick();save();renderMastery()});
/* ---------- the edges of the map: roads to regions not yet charted ---------- */
const SEALED={road:[{x:-90,r:'frostveil',t:'The Ash Road north'}],town:[{x:-150,r:'golden',t:'The south road'}],tower:[{x:-90,r:'crown',t:'Northwatch pass'}],
  falls:[{x:-120,r:'emerald',t:'Fenwater ferry'}],reach:[{x:160,r:'saltsong',t:'The dry road'}],hollow:[{x:-80,r:'verdant',t:'The cliff road west'}],elderwood:[{x:-60,r:'silverwood',t:'A silver-barked trail'}],stonewatch:[{x:-40,r:'golden',t:'The plains road east'}]};
const sX=s=>s.x<0?Z.x1+s.x:s.x+EDGE;
function sealedNear(){const L=SEALED[Z.id];if(!L)return null;for(const s of L)if(Math.abs(pl.x-sX(s))<18)return{k:'sealed',s};return null}
const _cnx=crNear;crNear=function(){return sealedNear()||_cnx()};
const _cux=crUse;crUse=function(n){if(n&&n.k==='sealed'){const r=REG(n.s.r);banner(r.n+' · Lv '+r.lv[0]+'–'+r.lv[1],'Uncharted. This road opens in a future update.');return}return _cux(n)};
const _clx=crLabel;crLabel=function(n){if(n&&n.k==='sealed')return'Look · '+n.s.t;return _clx(n)};
function drawSealed(cx,cy){const L=SEALED[Z.id];if(!L)return;for(const s of L){const X=sX(s),x=ri(X-cx),y=ri(topAt(X)-cy);if(x<-40||x>W+40)continue;
    g.fillStyle='#000';g.fillRect(x-1,y-34,4,34);g.fillStyle='#6a4a2a';g.fillRect(x,y-33,2,33);g.fillStyle='#000';g.fillRect(x-14,y-33,30,11);g.fillStyle='#8a6a42';g.fillRect(x-13,y-32,28,9);g.fillStyle='#3a2a1a';g.fillRect(x-10,y-28,22,1);
    for(let k=-16;k<=16;k+=4){g.fillStyle='#000';g.fillRect(x+k,y-12,3,12);g.fillStyle='#704428';g.fillRect(x+k,y-11,2,11)}g.fillStyle='#b23a2e';g.fillRect(x-17,y-8,35,2);
    ptext(REG(s.r).n.toUpperCase(),x,y-42,'#8d8aa3')}}
/* save + load */
const _bwr=beginWith;beginWith=function(ch,sv){const r=_bwr(ch,sv);pl.mx=(sv&&sv.mx)||null;if(pl.lv>CAP){pl.lv=CAP;recalc()}
  if(sv&&sv.q&&sv.q.m12&&!pl.q.c1)pl.q.c1={s:'d',n:0};if(sv&&sv.q&&(sv.q.m18||sv.q.m19)){for(const k of['c3a','c3b','c4a','c4b'])if(!pl.q[k])pl.q[k]={s:'d',n:0}}return r};

/* the map lists the regions still to come */
const _rmr=renderMap;renderMap=function(){_rmr();const d=$('mapdet');if(!d||!MAP)return;const z=ZONES.find(z=>z.id===MAP.sel),r=z&&zoneRegion(z);
  d.insertAdjacentHTML('beforeend',`${r?`<p class="crp" style="color:var(--moss)">Region: ${r.n} · Lv ${r.lv[0]}–${r.lv[1]}</p>`:''}<div class="qh">Beyond the Reach</div><p class="crp dim">${REGIONS.filter(r=>!r.built).map(r=>r.n+' (Lv '+r.lv[0]+'–'+r.lv[1]+')').join(' · ')}. Uncharted for now: their roads open in future updates.</p>`)};
