/* ---------- regional crisis engine (Bible 2.10–2.12, 3.17: pressure → disruption → escalation → breaking point → recovery → legacy) ---------- */
const STN=['Pressure','Disruption','Escalation','Breaking Point','Recovery','Legacy'];
const qd=k=>!!(pl.q&&pl.q[k]&&pl.q[k].s==='d');
const CRISES={
  herd:{n:'Herd Without a Home',reg:'Fallen Oak Grove',col:'#e0a25a',rgb:'224,162,90',zones:['oak','outskirts','road'],gate:()=>qd('m2'),
    intro:'Rotstags are fleeing Fallen Oak Grove. Something drove the herd off its old ground, and the panic is rolling toward Logger’s Rest and the Ash Road.',
    st:['Rotstags have been seen far outside the Grove. Loggers report broken fences and trampled saplings.',
      'The herd is spilling into Whisper Woods. Logging crews have pulled back, and hide and herbs are scarce.',
      'An Antlered Bull is leading the panic toward Logger’s Rest. The Logger’s Rest board has closed while crews hold the line.',
      'The Stampede Matriarch has turned the herd onto the Ash Road. If she reaches the caravan camps, the road is lost for a season.',
      'The herd has scattered. Fences, saplings and camps need rebuilding.'],
    marks:{t:'rotstag',z:['oak','outskirts'],nm:'Panicked Rotstag',calm:1},lt:{t:'rotstag',z:'outskirts',nm:'Antlered Bull'},champ:{t:'rotstag',z:'road',nm:'Stampede Matriarch'},
    want:['timber','herb','hide'],relief:['calm','barricade'],svc:{board:'outskirts',txt:'Logger’s Rest board closed: crews are holding the herd line.'},
    clues:[{z:'oak',x:330,t:'Scorched Bedding Ground',txt:'The herd’s bedding ground is burned in a neat ring. Not lightning. Someone set it, and left a Freeband toll-knot tied to a stump.'},
      {z:'oak',x:1040,t:'Rotted Salt Lick',txt:'The old salt lick is black with creeping rot. The herd will not come back to it. The rot smells like the Reach to the north.'},
      {z:'outskirts',x:980,t:'Stampede Trail',txt:'Hundreds of hoofprints, all heading east toward the road. Moss-fur is snagged on every low branch.'}],
    cause:'Freeband raiders burned the bedding ground to drive the herd onto the road, where panicked caravans drop their cargo. Rot from the Reach finished the job.',
    barks:['The herd’s moving again.','Lost a fence line to stags last night.','Don’t run at them. Walk slow.','Hide prices have gone mad.','Stags on the road. Stags!'],
    win:{n:'Herd Accord',txt:'The herd settled back into the Grove. Gathering in the Grove and Whisper Woods sometimes yields an extra bundle.'},
    fail:{n:'Trampled Commons',txt:'The herd broke apart for good. The scattered beasts crowd the hunting grounds: hunting yields more hide and meat.'},
    mem:{z:'oak',x:620}},
  bridge:{n:'Broken Bridge Season',reg:'Stonebridge',col:'#6ec6e2',rgb:'110,198,226',zones:['stonebridge','falls','bog'],gate:()=>qd('m3')&&pl.lv>=3,
    intro:'Misty Fen Lake is rising. Floodwater is chewing at the southern piers of Stonebridge, and every caravan in the Reach crosses there.',
    st:['The Fen is rising. The waterline on the piers sits a hand higher every morning.',
      'Floodwater has cracked the southern piers. Freight through Stonebridge is slowing and prices are drifting apart.',
      'Swamp creatures nest in the flooded footings. The Iron Market Forge has shut so its smiths can shore up the piers.',
      'The Floodmaw has come up from the lake. If it tears out the last piers, Stonebridge goes dark for the season.',
      'The water is falling. The piers need timber, pitch and iron.'],
    marks:{t:'lurker',z:['falls','bog'],nm:'Flood-Swollen Lurker'},lt:{t:'stalker',z:'bog',nm:'Pier-Breaker'},champ:{t:'lurker',z:'falls',nm:'The Floodmaw'},
    want:['timber','ore','fish'],relief:['truss','pitch'],svc:{station:'stonebridge',txt:'Iron Market Forge closed: the smiths are shoring up the piers.'},
    clues:[{z:'stonebridge',x:600,t:'Waterline Stake',txt:'The survey stake shows the river a full hand above any flood on record. This is not a wet season.'},
      {z:'falls',x:820,t:'Jammed Sluice',txt:'The old Fen sluice has been jammed open with a wedge of new iron. Somebody let this flood in.'},
      {z:'bog',x:900,t:'Gnawed Footing',txt:'Lurkers nest in the pier footings, chewing the old pitch. Fresh caulking would drive them out.'}],
    cause:'Someone wedged the Fen sluice open on purpose. The flood was made to break the bridge, and whoever did it profits while freight stops.',
    barks:['Water’s up again.','No carts over the south span.','Freight’s stuck at the piers.','Bring timber if you have it.','The bridge groans at night.'],
    win:{n:'Ironbound Crossing',txt:'Stonebridge was rebuilt stronger, with iron bands on every pier. Freight contracts pay 15% more.'},
    fail:{n:'Ferry Crossing',txt:'The south piers went out and a rope ferry carries goods now. Freight contracts pay 10% more for the trouble.'},
    mem:{z:'stonebridge',x:880}},
  signal:{n:'Signal From the Dead',reg:'Old Watchtower',col:'#ff6a4a',rgb:'255,106,74',zones:['tower','gate','road'],gate:()=>qd('m8'),
    intro:'The Old Watchtower’s beacon is flashing route orders nobody sent. Caravans are trusting it, and some of them are not arriving.',
    st:['The beacon flashes at night in a pattern nobody sent.',
      'Caravans are following false route orders off the safe road. Freight is dangerous.',
      'Freeband raiders wait where the false orders send people. The Watchtower Board has closed until the signal is fixed.',
      'Signal Captain Hask is running the ambush himself. If he holds the spur, the tower’s charter fails.',
      'The true signal is back. The tower needs a new lens and fresh codes.'],
    marks:{t:'raider',z:['tower','gate'],nm:'Freeband Ambusher'},lt:{t:'gob',z:'tower',nm:'False Signalman'},champ:{t:'raider',z:'gate',nm:'Signal Captain Hask'},
    want:['salvage','ore','shard'],relief:['lens','flare'],svc:{board:'tower',txt:'Watchtower Board closed until the signal is fixed.'},
    clues:[{z:'tower',x:700,t:'Cut Shutter Cords',txt:'The beacon’s shutter cords were cut and re-knotted in a Freeband pattern. Someone has been signalling from inside.'},
      {z:'road',x:1150,t:'False Route Order',txt:'A waystation order in a clerk’s hand sends caravans onto the broken spur. The seal is real. The clerk is not.'},
      {z:'gate',x:1000,t:'Ambush Cache',txt:'Stolen crates and a shuttered red lantern. They have been waiting here for caravans.'}],
    cause:'A Freeband crew stole a tower seal and is signalling false routes from the Old Watchtower, steering caravans into its ambush.',
    barks:['Don’t trust the night beacon.','Another cart missing on the spur.','Check your orders twice.','Freeband are bold this season.'],
    win:{n:'True Beacon',txt:'The beacon burns true over Ashveil Reach. Bounty contracts pay 15% more.'},
    fail:{n:'Freeband Toll',txt:'The Freeband hold the broken spur. Their raiders still roam, but they carry more salvage.'},
    mem:{z:'tower',x:1080}},
  scar:{n:'Scar Pressure',reg:'Outer Scar',col:'#c9a8ff',rgb:'201,168,255',zones:['scar','inner'],gate:()=>qd('m9')&&pl.lv>=8,
    intro:'Shardstone is erupting through the Outer Scar. The ground hums, the vents glow, and the northern camps are packing.',
    st:['Shardstone is erupting through the Outer Scar. The ground hums.',
      'Corruption spreads from the new vents. Scar creatures hit harder near them.',
      'A Shard Matron is seeding new vents. The northern camps are evacuating.',
      'A guardian has formed from the eruptions. If it reaches the northern camps, the Scar grows a mile.',
      'The vents are cooling. They need ward stakes, purging and fresh stone.'],
    marks:{t:'shardslime',z:['scar','inner'],nm:'Vent-Born Slime'},lt:{t:'shardslime',z:'inner',nm:'Shard Matron'},champ:{t:'bear',z:'scar',nm:'Scar-Grown Guardian'},
    want:['shard','ore','herb'],relief:['stake','salve'],svc:null,
    clues:[{z:'scar',x:600,t:'Fresh Vent',txt:'A vent split the rock overnight. The shardstone around it is still warm and pulses about once a minute.'},
      {z:'scar',x:1300,t:'Exorcist Survey Stone',txt:'An Exorcist’s survey stone, its readings scratched over and over: “rhythm, not pressure. Something is keeping time.”'},
      {z:'inner',x:900,t:'Resonance Scar',txt:'Here the pulses all point the same way: deeper into the Inner Scar, toward the place the Unbound walks.'}],
    cause:'The Veinway under the Scar is pulsing on a rhythm, and each pulse pushes shardstone up. Something deep in the Inner Scar is calling it.',
    barks:['The ground hums up north.','Camps are coming south.','Shardstone’s cheap and nobody wants it.','Wards. We need wards.'],
    win:{n:'Ward Line',txt:'Ward stakes ring the cooled vents. You take 15% less damage in the Scar.'},
    fail:{n:'Shard Bloom',txt:'The vents never closed. Shardstone crusts the Scar: Scar creatures hit 10% harder, but they shed more shards.'},
    mem:{z:'scar',x:1100}}};
CRISES.reach={n:'The Rotting Reach',reg:'Rotting Reach',col:'#c8d468',rgb:'200,212,104',zones:['reach','bog','sawmill'],gate:()=>qd('m17'),
    intro:'Fungal growth is spreading out of the Rotting Reach, along the roots and the logging routes. Brother Alder says it is moving toward CrestHollow’s water stores.',
    st:['Pale growth is creeping along the logging routes. Timber from the Reach comes in spotted.',
      'The rot has reached Marrowbog’s boardwalks and the sawmill road. Logging has slowed and herbs are scarce.',
      'A swollen rotfly is carrying spores from pool to pool. The Scrapcap Workshop has shut to keep the spores out of its gears.',
      'The Sporemass has risen in the Reach. If its spores reach the streams, CrestHollow’s water stores sour for a season.',
      'The growth is dying back. The streams need filters, clean timber and fresh herbs.'],
    marks:{t:'sporecap',z:['reach','sawmill'],nm:'Spore-Swollen Sporecap'},lt:{t:'rotfly',z:'bog',nm:'Bloated Rotfly'},champ:{t:'sporecap',z:'reach',nm:'The Sporemass'},
    want:['herb','timber','mush'],relief:['fireoil','filter'],svc:{station:'sawmill',txt:'Scrapcap Workshop closed: spores in the gears.'},
    clues:[{z:'reach',x:420,t:'Seeded Stump',txt:'A stump packed with fungal stock and wrapped in waxed cloth. Someone planted this.'},
      {z:'bog',x:1300,t:'Spore-Choked Inlet',txt:'The inlet that feeds CrestHollow’s cistern stream is crusted with pale growth, thickest where the current runs toward town.'},
      {z:'sawmill',x:820,t:'Contaminated Timber',txt:'A load of logs bound for CrestHollow, each one seeded through the bark with rot. The bill of lading carries a Concordance countersign.'}],
    cause:'The rot is being cultivated and seeded into timber and water bound for CrestHollow. The bills carry a Concordance countersign.',
    barks:['Don’t drink from the east streams.','My logs came in spotted.','The Reach is moving, I swear it.','Boil your water. Twice.'],
    win:{n:'Clean Springs',txt:'The streams run clean and the Reach is pushed back. Herbs and mushrooms gathered in the Reach, Marrowbog and the mill grounds sometimes yield extra.'},
    fail:{n:'Spore Season',txt:'The rot settled into the bog for good. Mushrooms in Marrowbog grow thick: mushroom gathering there yields extra, but sporecaps roam its edges.'},
    mem:{z:'reach',x:150}};
RECIPES.push({id:'fireoil',d:'alchemy',r:3,n:'Clearing Fire-Oil',use:'crisis',cr:'reach',need:{mush:2,timber:2,salvage:1},desc:'Reach relief. A slow-burning oil that clears rot without torching the forest.'},
  {id:'filter',d:'wood',r:3,n:'Charcoal Filter',use:'crisis',cr:'reach',need:{timber:3,herb:2},desc:'Reach relief. Charcoal and moss packed in a timber frame to clean the streams.'});
const CR_ORDER=['herd','bridge','signal','scar','reach'];
const LANE_N={combat:'Combat',creature:'Creature work',invest:'Investigation',gather:'Gathering',supply:'Supply',craft:'Crafting',transport:'Transport'};
RECIPES.push(
  {id:'calm',d:'alchemy',r:1,n:'Calming Draught',use:'crisis',cr:'herd',need:{herb:3,mush:1},desc:'Herd relief. Scented with dark mushroom; poured on the herd line it settles panicked beasts.'},
  {id:'barricade',d:'wood',r:1,n:'Field Barricade',use:'crisis',cr:'herd',need:{timber:4,hide:1},desc:'Herd relief. Hide-lashed stakes to turn a stampede away from the camps.'},
  {id:'truss',d:'wood',r:2,n:'Bridge Truss',use:'crisis',cr:'bridge',need:{timber:5,ore:2},desc:'Bridge relief. An iron-pinned truss to brace a cracked pier.'},
  {id:'pitch',d:'alchemy',r:1,n:'Caulking Pitch',use:'crisis',cr:'bridge',need:{mush:2,fish:1,timber:1},desc:'Bridge relief. Fish oil and mushroom resin that seals footings and drives out nesting lurkers.'},
  {id:'lens',d:'smith',r:3,n:'Beacon Lens',use:'crisis',cr:'signal',need:{shard:2,salvage:3},desc:'Signal relief. A ground shardstone lens to restore the true beacon.'},
  {id:'flare',d:'alchemy',r:2,n:'True-Signal Flare',use:'crisis',cr:'signal',need:{salvage:2,herb:2},desc:'Signal relief. Flares in the real tower colors to call caravans back to the safe road.'},
  {id:'stake',d:'smith',r:3,n:'Ward Stake',use:'crisis',cr:'scar',need:{shard:3,ore:2},desc:'Scar relief. An iron stake etched with a ward line, driven into a vent.'},
  {id:'salve',d:'alchemy',r:2,n:'Purging Salve',use:'crisis',cr:'scar',need:{herb:3,shard:1},desc:'Scar relief. Treats corruption burns for evacuated camps.'});
const rcpById=id=>RECIPES.find(R=>R.id===id);
const CR=()=>pl.cr||(pl.cr={id:null,wait:60});
const crAct=()=>{const C=CR();return C.id?C:null};
const crD=()=>{const C=crAct();return C?CRISES[C.id]:null};
const inReg=()=>{const D=crD();return!!D&&D.zones.includes(Z.id)};
const relief=k=>(pl.relief&&pl.relief[k])||0;
/* lifecycle */
function pickCrisis(){const hist=pl.crH||[],ok=CR_ORDER.filter(id=>CRISES[id].gate());if(!ok.length)return null;
  const fresh=ok.filter(id=>!pl.leg||!pl.leg[id]);if(fresh.length)return fresh[0];const last=hist.length?hist[hist.length-1].id:null;const pool=ok.filter(id=>id!==last);return(pool.length?pool:ok)[Math.random()*(pool.length||ok.length)|0]}
function startCrisis(id){pl.cr={id,st:0,th:0,rv:0,ln:{},clues:[],ltK:0,chK:0,out:null,season:(pl.crH||[]).filter(h=>h.id===id).length+1,mk:0};
  const D=CRISES[id];banner('Regional Crisis · '+STN[0],D.n);crSting(0);crPopulate();crHudK='';
  if(!pl.flags.crIntro){pl.flags.crIntro=1;setTimeout(()=>{if(!S.paused&&!pl.dead)openCrisis(D.intro)},2600)}save()}
function crSting(st){if(st>=3){[98,92,87].forEach((f,i)=>setTimeout(()=>tone(f,.5,'sawtooth',.05,-20),i*260));noise(.6,.05,300)}
  else if(st===4){[392,494,587,784].forEach((f,i)=>setTimeout(()=>tone(f,.25,'triangle',.04),i*120))}
  else{tone(147,.5,'sawtooth',.035,-30);setTimeout(()=>tone(139,.6,'sawtooth',.035,-30),300)}}
function crAdvance(n){const C=crAct(),D=crD();if(n>=3)return crBreak(true);C.st=n;C.th=0;banner('Crisis worsens · '+STN[n],D.n);crSting(n);crPopulate();save()}
function crBreak(forced){const C=crAct(),D=crD();C.st=3;C.rv=0;C.th=forced?40:0;C.forced=forced;C.chK=0;banner('Breaking Point',forced?D.n+' · it came to a head before you were ready':D.n+' · you are ready for it');crSting(3);crPopulate();save()}
function crResolve(win){const C=crAct(),D=crD();C.out=win?'win':'fail';C.st=4;C.rv=0;C.th=0;crSting(4);
  for(const m of S.mobs)if(m.cr==='champ'&&!m.dead){m.dead=1;for(let i=0;i<20;i++)S.parts.push({x:m.x,y:m.y-10,vx:rnd(-60,60),vy:rnd(-90,-20),t:0,life:.8,c:D.col,g:120,s:1})}
  if(win){const sh=60+pl.lv*15;pl.shards+=sh;gainExp(Math.round(need(pl.lv)*.25));banner('The crisis is held · +'+sh+' shards','Recovery begins')}
  else banner('The crisis broke through','Recovery will be harder');crPopulate();save()}
function crLegacy(){const C=crAct(),D=crD(),L=C.out==='win'?D.win:D.fail;pl.leg=pl.leg||{};if(pl.leg[C.id]!=='win')pl.leg[C.id]=C.out;
  pl.crH=pl.crH||[];pl.crH.push({id:C.id,out:C.out,season:C.season,ln:C.ln});const sh=40+pl.lv*10;pl.shards+=sh;gainExp(Math.round(need(pl.lv)*.15));
  banner('Legacy · '+L.n,L.txt.split('.')[0]+'.');[523,659,784,1046,1318].forEach((f,i)=>setTimeout(()=>tone(f,.3,'triangle',.04),i*110));
  pl.cr={id:null,wait:480};crPopulate();crHudK='';save()}
function crAdd(lane,p,x,y){const C=crAct();if(!C||C.st>4||p<=0)return;const D=CRISES[C.id];C.rv+=p;C.ln[lane]=(C.ln[lane]||0)+p;if(C.st<=3)C.th=Math.max(0,C.th-p*.3);
  S.nums.push({x:x??pl.x,y:(y??pl.y)-52,txt:'+'+p+' '+(C.st===4?'RECOVERY':'RESOLVE'),t:-.35,c:D.col});
  if(C.st<=2&&C.rv>=100)crBreak(false);else if(C.st===3&&C.rv>=100)crResolve(true);else if(C.st===4&&C.rv>=(C.out==='win'?100:150))crLegacy();crHudK=''}
function crTick(dt){if(!pl.ch||!S.started)return;const C=CR();
  if(!C.id){C.wait=(C.wait??60)-dt;if(C.wait<=0){const id=pickCrisis();if(id)startCrisis(id);else C.wait=30}crHud();return}
  if(C.st<=2){C.th+=dt*100/420;if(C.th>=100)crAdvance(C.st+1)}else if(C.st===3){C.th+=dt*100/300;if(C.th>=100)crResolve(false)}
  S.crT=(S.crT||0)+dt;if(S.crT>18){S.crT=0;crTopUp()}crHud()}
/* creatures */
function crTarget(){const C=crAct(),D=crD();if(!C||!D.marks.z.includes(Z.id))return 0;if(C.st<=3)return[1,2,3,2][C.st];return C.out==='fail'?1:0}
function spawnCr(t,kind,nm,far){const segs=SEG.map((s,i)=>[s,i]).filter(([s])=>s.w>60&&!s.bed&&s.x>EDGE-20&&s.x+s.w<WW-EDGE+20);if(!segs.length)return null;
  let pickS=kind==='champ'?segs.sort((a,b)=>b[0].w-a[0].w)[0]:segs[Math.random()*segs.length|0];
  if(far){for(let k=0;k<8;k++){const c=segs[Math.random()*segs.length|0];if(Math.abs(c[0].x+c[0].w/2-pl.x)>160){pickS=c;break}}}
  const[s,si0]=pickS,x=s.x+s.w*(.3+Math.random()*.4),si=MOBS[t].fly?-2:si0,bump=kind==='champ'?2:kind==='lt'?1:0,m=spawnMob([t,si,x],Math.min(Z.lv[1]+bump,Z.lv[1]+2)),D=crD();
  m.d={...MOBS[t],name:nm,passive:kind==='mark'&&D.marks.calm?1:0,elite:kind!=='mark'?1:MOBS[t].elite};m.cr=kind;m.temp=1;m.x=x;
  const k=kind==='champ'?{hp:7,atk:1.4,exp:8,p:3}:kind==='lt'?{hp:3.5,atk:1.25,exp:4,p:2}:{hp:1.3,atk:1.1,exp:1.5,p:1.2};
  m.mhp=m.hp=Math.round(m.mhp*k.hp);m.atk=Math.round(m.atk*k.atk);m.exp=Math.round(m.exp*k.exp);m.mpoise=m.poise=Math.round(m.mpoise*k.p);S.mobs.push(m);return m}
function crPopulate(){S.mobs=S.mobs.filter(m=>!m.cr);const C=crAct();crMobMods();if(!C)return;const D=CRISES[C.id];
  for(let i=0;i<crTarget();i++)spawnCr(D.marks.t,'mark',D.marks.nm,1);
  if(C.st===2&&!C.ltK&&Z.id===D.lt.z)spawnCr(D.lt.t,'lt',D.lt.nm,1);
  if(C.st===3&&!C.chK&&Z.id===D.champ.z){const m=spawnCr(D.champ.t,'champ',D.champ.nm,1);if(m)setTimeout(()=>{if(S.mobs.includes(m)&&!m.dead)banner(D.champ.nm,'A crisis champion is here')},900)}}
function crTopUp(){const n=crTarget(),D=crD();if(!n)return;if(S.mobs.filter(m=>m.cr==='mark'&&!m.dead).length<n)spawnCr(D.marks.t,'mark',D.marks.nm,1)}
function crMobMods(){let mul=1;const C=crAct();if(C&&C.id==='scar'&&C.st>=1&&C.st<=3&&CRISES.scar.zones.includes(Z.id))mul*=1.15;if(pl.leg&&pl.leg.scar==='fail'&&CRISES.scar.zones.includes(Z.id))mul*=1.1;
  for(const m of S.mobs)if(!m.cr&&!m.crM){m.crM=1;if(mul!==1)m.atk=Math.round(m.atk*mul)}}
function crKill(m){const C=crAct();if(!C)return;const D=CRISES[C.id];
  if(m.cr==='champ'){C.chK=1;crAdd('combat',50,m.x,m.y);banner(D.champ.nm+' falls','The breaking point turns')}
  else if(m.cr==='lt'){C.ltK=1;crAdd('combat',25,m.x,m.y);banner(D.lt.nm+' falls','The escalation slows')}
  else if(m.cr==='mark')crAdd('combat',C.st===4?6:5,m.x,m.y);
  else if(C.st<=3&&D.zones.includes(Z.id))crAdd('combat',1,m.x,m.y)}
function crCalm(m){const D=crD();if(!m||m.dead)return;m.dead=1;m.calmed=1;crAdd('creature',7,m.x,m.y);dGain('hunting',6);gainExp(Math.round(m.exp*.6));
  for(let i=0;i<16;i++)S.parts.push({x:m.x+rnd(-8,8),y:m.y-rnd(4,20),vx:rnd(-20,20),vy:rnd(-40,-10),t:0,life:1,c:i%2?'#f2e6c8':D.col,g:-20,s:1});
  S.nums.push({x:m.x,y:m.y-34,txt:'CALMED',t:-.1,c:'#c8d468'});[392,523,659].forEach((f,i)=>setTimeout(()=>tone(f,.25,'sine',.04),i*140))}
/* interaction: calm, clues */
function crNear(){const C=crAct();if(!C)return reviveNear()||wayNear()||bondNear();const D=CRISES[C.id];
  if(D.marks.calm)for(const m of S.mobs)if(m.cr==='mark'&&!m.dead&&!m.aggro&&Math.abs(m.x-pl.x)<30&&Math.abs(m.y-pl.y)<26)return{k:'calm',m};
  if(C.st<=3)for(let i=0;i<D.clues.length;i++){const c=D.clues[i];if(c.z!==Z.id||C.clues.includes(i))continue;const x=c.x+EDGE;if(Math.abs(pl.x-x)<16&&Math.abs(pl.y-topAt(x))<26)return{k:'clue',i}}return reviveNear()||wayNear()||bondNear()}
function crUse(n){if(n.k==='way')return useWay();if(n.k==='rev')return netRevive(n.p);if(n.k==='bef')return befriend(n.m);const C=crAct();if(!C)return;const D=CRISES[C.id];if(n.k==='calm')return crCalm(n.m);
  if(n.k==='clue'&&!C.clues.includes(n.i)){C.clues.push(n.i);crAdd('invest',8);dGain('commerce',2);const c=D.clues[n.i];tone(660,.15,'triangle',.04);setTimeout(()=>tone(880,.2,'triangle',.04),120);
    let msg='<b>'+c.t+'.</b> '+c.txt;if(C.clues.length===D.clues.length){crAdd('invest',10);msg+='<br><br><b>The cause is clear.</b> '+D.cause}openCrisis(msg);save()}}
function crLabel(n){return n.k==='way'?(pl.flags&&pl.flags.waynet?'Waystone · Travel':'Waystone · Examine'):n.k==='rev'?'Revive · '+String((n.p.presence||{}).nm||'ally').slice(0,14):n.k==='bef'?bondLabel(n):n.k==='calm'?'Calm · '+n.m.d.name:'Investigate · '+crD().clues[n.i].t}
/* economy and legacy hooks */
function crPayMul(c){let m=1;const C=crAct(),L=pl.leg||{};if(C&&C.st>=1&&C.st<=3&&c.k==='supply'&&CRISES[C.id].want.includes(c.r))m*=1.5;
  if(c.k==='freight'){if(L.bridge==='win')m*=1.15;else if(L.bridge==='fail')m*=1.1}if(c.k==='bounty'&&L.signal==='win')m*=1.15;return m}
function crHurt(){return(pl.leg&&pl.leg.scar==='win'&&CRISES.scar.zones.includes(Z.id))?.85:1}
function crHunt(){return pl.leg&&pl.leg.herd==='fail'?.15:0}
function crGather(nd){const C=crAct();if(C&&C.st<=3&&CRISES[C.id].zones.includes(Z.id))crAdd('gather',1,nd.x,topAt(nd.x));
  if(pl.leg&&pl.leg.herd==='win'&&(Z.id==='oak'||Z.id==='outskirts')&&Math.random()<.25)addMat(nd.r,1,nd.x,topAt(nd.x)-10);
  if(pl.leg&&pl.leg.reach==='win'&&CRISES.reach.zones.includes(Z.id)&&(nd.r==='herb'||nd.r==='mush')&&Math.random()<.25)addMat(nd.r,1,nd.x,topAt(nd.x)-10);
  if(pl.leg&&pl.leg.reach==='fail'&&Z.id==='bog'&&nd.r==='mush'&&Math.random()<.35)addMat(nd.r,1,nd.x,topAt(nd.x)-10)}
function crDrops(m){const L=pl.leg||{};if(L.signal==='fail'&&m.t==='raider'&&Math.random()<.35)addMat('salvage',1,m.x,m.y-16);
  if(L.scar==='fail'&&CRISES.scar.zones.includes(Z.id)&&Math.random()<.3)S.drops.push({k:'shard',amt:3+(Math.random()*4|0),x:m.x,y:m.y-8,vx:rnd(-40,40),vy:-150,t:0})}
function crClosed(kind,id){const C=crAct();if(!C||C.st<2||(C.st===4&&C.out==='win'))return null;const s=CRISES[C.id].svc;if(!s)return null;
  if(kind==='board'&&s.board===id)return s.txt;if(kind==='station'&&s.station===id)return s.txt;return null}
function crBark(list){const C=crAct();if(!C||C.st>3)return list;const D=CRISES[C.id];if(!(Z.safe||D.zones.includes(Z.id)))return list;return Math.random()<.5?D.barks:list}
/* deliveries */
const canDeliver=()=>{const D=crD();return!!D&&(Z.safe||D.zones.includes(Z.id)||!!BOARDS[Z.id])};
function crDeliver(kind,k){const C=crAct();if(!C||!canDeliver())return;const rec=C.st===4;
  if(kind==='mat'){if(mat(k)<5)return;pl.mat[k]-=5;crAdd(rec?'supply':'supply',rec?15:12);dGain('transport',4);dGain('commerce',3)}
  else if(kind==='rel'){if(relief(k)<1)return;pl.relief[k]--;crAdd('craft',rec?25:20)}sfx.pick();save()}
/* ---------- crisis art ---------- */
const CR_SPR={};
const IRON=R(['#121417','#1e2226','#2c3238','#3e464e','#58626a','#7a868e','#a4b0b6']),BONE=R(['#3a3226','#6a5e48','#9a8c6c','#c8b892','#e8dcbc','#fff6e0']),
  BRASS=R(['#3a2610','#6a4618','#9a6a24','#c8963a','#e8c060','#fff0a8']),CLOTH=R(['#2a0806','#4a100c','#741c14','#9a2a1c','#c43a2a','#e86048']),
  CRYS=R(['#1e1236','#3a2a5e','#5a4290','#8a6ad0','#c9a8ff','#f0e2ff']),FLAME=R(['#6a1008','#b42a10','#e05a1c','#ff9a30','#ffd27a','#fff6d8']),RUNE=R(['#0e3a40','#1a6a72','#36a8b0','#6ee6ee','#d8ffff']);
/* shaded vertical post, lit from the left */
function cPost(L,x0,w,y0,y1,ramp,seed){for(let y=y0;y<=y1;y++)for(let x=x0;x<x0+w;x++){const u=(x-x0+.5)/w;let t=.78-u*.62+(fbm(x*.6,y*.18,seed)-.5)*.3;if(x===x0+w-1)t-=.15;sp(L,x,y,pick(ramp,t,x,y))}}
function cDisc(L,cx,cy,rx,ry,ramp,seed,bias=0){for(let y=Math.floor(cy-ry);y<=cy+ry;y++)for(let x=Math.floor(cx-rx);x<=cx+rx;x++){const nx=(x-cx)/rx,ny=(y-cy)/ry,r=nx*nx+ny*ny;if(r>1)continue;sp(L,x,y,pick(ramp,.55-nx*.25-ny*.3+bias+(fbm(x*.5,y*.5,seed)-.5)*.35-(r>.75?.15:0),x,y))}}
function cCrys(L,x0,yb,h,w,lean){for(let y=0;y<h;y++){const ww=Math.max(1,Math.round(w*(1-y/h)+.3));for(let k=0;k<ww;k++){const x=x0+k+Math.round(y*lean),u=ww>1?k/(ww-1):.5;
  sp(L,x,yb-y,k===0&&ww>1?CRYS[5]:pick(CRYS,.25+(1-u)*.45+y/h*.25,x,yb-y))}}sp(L,x0+Math.round(h*lean),yb-h+1,CRYS[5])}
function cAntler(L,bx,by,dir){const pts=[];let x=bx,y=by;for(let i=0;i<13;i++){pts.push([x,y]);y--;if(i%2===0)x+=dir;if(i>9)x+=dir}
  for(const[x,y]of pts){sp(L,x,y,BONE[4]);sp(L,x+dir,y,BONE[3]);sp(L,x,y+1,BONE[2])}
  for(const[i,len]of[[4,3],[8,3],[11,2]]){let[x,y]=pts[i];for(let k=0;k<len;k++){x-=dir;y--;sp(L,x,y,k===len-1?BONE[5]:BONE[4]);sp(L,x,y+1,BONE[2])}}sp(L,pts[12][0],pts[12][1]-1,BONE[5])}
function clueArt(id){return nodeLayer(24,24,L=>{const P=(x,y,c)=>sp(L,x,y,c);
  if(id==='herd'){cDisc(L,12,20,11,3.5,RAMP.rockW,4,-.05);for(const[x,y]of[[4,19],[9,21],[15,20],[19,18]]){P(x,y,[22,16,12]);P(x+1,y,[22,16,12]);P(x,y+1,[22,16,12]);P(x+2,y+1,[22,16,12]);P(x+1,y-1,RAMP.rockW[4])}
    for(let x=3;x<10;x++){const y=16-((x*5)%3);P(x,y,x%2?[30,22,18]:[52,36,26]);P(x,y+1,[22,16,12])}P(5,15,[255,140,60]);P(7,14,[255,90,40]);
    const ax=13,ay=17;for(let i=0;i<8;i++){const x=ax+i,y=ay-Math.round(i*.55);P(x,y,BONE[4]);P(x,y+1,BONE[2]);P(x,y-1,i<2?BONE[3]:BONE[5])}P(ax+3,ay-4,BONE[4]);P(ax+3,ay-5,BONE[5]);P(ax+6,ay-6,BONE[4]);P(ax+6,ay-7,BONE[5]);P(ax-1,ay,BONE[1]);
    for(let i=0;i<5;i++){P(11+i,12+(i%2),i%2?[180,40,30]:[230,70,50])}P(10,13,[120,26,20]);P(16,11,[120,26,20]);P(12,14,[180,40,30]);
    for(let x=1;x<23;x++)if(hash(x,9,4)>.55)P(x,17-((x*3)%2),pick(RAMP.moss,.6,x,1))}
  else if(id==='bridge'){cPost(L,10,4,3,20,RAMP.wood,3);for(let x=9;x<15;x++)P(x,2,x<11?RAMP.wood[6]:RAMP.wood[4]);P(12,1,RAMP.wood[5]);
    for(const y of[6,9,12,15]){for(let x=10;x<14;x++)P(x,y,y===6?[255,255,255]:[110,198,226]);P(14,y,[30,90,120])}for(let y=10;y<13;y++){P(9,y,[160,130,80]);P(14,y,[120,96,60])}P(9,11,[200,170,110]);
    for(let x=2;x<22;x++){for(let y=20;y<24;y++){const nx=(x-12)/10,ny=(y-21.5)/2.5;if(nx*nx+ny*ny<=1)P(x,y,pick(RAMP.water,.35+(y-20)*.08+Math.sin(x*.9)*.08,x,y))}}for(const x of[4,8,16,19])P(x,21,[191,240,255]);for(let x=7;x<17;x++)if(x%3)P(x,20,[150,220,240]);
    P(15,17,[212,72,58]);P(16,17,[212,72,58]);P(16,18,[143,42,34])}
  else if(id==='signal'){const fx=7,fy=7;for(let y=fy;y<fy+12;y++)for(let x=fx;x<fx+10;x++){const e=x===fx||x===fx+9||y===fy||y===fy+11,mid=x===fx+5&&y>fy&&y<fy+11;if(e||mid){P(x,y,pick(IRON,.6-(x-fx)/20,x,y));continue}
      const cr=(x-fx===2&&y>fy+3&&y<fy+8)||(y-fy===5&&x>fx+1&&x<fx+5)||(x-fx===7&&y-fy===8)||(x-fx===8&&y-fy===7);P(x,y,cr?[255,236,210]:pick(CLOTH,.25+(fx+9-x)/10*.35+(y<fy+5?.2:0)+(Math.abs(x-fx-3)+Math.abs(y-fy-6)<3?.3:0),x,y))}
    for(let x=fx+1;x<fx+9;x++){P(x,fy-1,IRON[3]);P(x,fy+12,IRON[2])}for(let x=fx+3;x<fx+7;x++)P(x,fy-2,IRON[4]);P(fx+3,fy-3,IRON[4]);P(fx+6,fy-3,IRON[3]);P(fx+4,fy-4,IRON[5]);P(fx+5,fy-4,IRON[4]);
    for(let x=2;x<22;x++){const y=21+((x*7)%2);P(x,y,pick(RAMP.rockW,.4,x,y));P(x,y+1,pick(RAMP.rockW,.2,x,y))}for(const[x,y]of[[3,20],[18,20],[20,19],[5,19]]){P(x,y,[255,120,90]);P(x+1,y,[154,42,28])}P(fx+3,fy+6,[255,246,220])}
  else if(id==='reach'){for(let y=10;y<22;y++)for(let x=4;x<20;x++){const top=y<12&&(x<6||x>17);if(top)continue;const d=Math.hypot(x-12,(y-10)*.5);P(x,y,y===10||y===11?(d<2?RAMP.wood[2]:Math.floor(d)%2?RAMP.wood[5]:RAMP.wood[4]):pick(RAMP.bark,.55-(x-4)/32+(fbm(x*.5,y*.3,3)-.5)*.3,x,y))}
    for(const[x,y,w]of[[3,15,5],[14,13,6],[6,19,4],[16,18,5]]){for(let k=0;k<w;k++){P(x+k,y,k===0?[236,226,212]:[200,212,104]);P(x+k,y+1,[120,90,110])}P(x+1,y-1,[236,226,212])}
    for(let x=5;x<19;x++){P(x,8+((x*5)%3===0?1:0),[226,214,190]);if(x%4===0)P(x,7,[248,240,224])}P(11,9,[200,212,104]);P(12,9,[200,212,104])}
  else{cDisc(L,12,21,11,4,RAMP.rock,9,-.05);for(let x=5;x<19;x++)if(Math.abs(x-12)>2){P(x,18+(x%3===0?1:0),[201,168,255]);P(x,19,[90,56,140])}
    cCrys(L,10,19,15,4,0);cCrys(L,6,19,8,2,-.18);cCrys(L,15,19,10,3,.2);cCrys(L,18,20,5,2,.25);for(const[x,y]of[[4,17],[20,15],[8,10]])P(x,y,[240,226,255])}})}
function memArt(id,win){return nodeLayer(40,50,L=>{const P=(x,y,c)=>sp(L,x,y,c),gy=48;
  if(id==='herd'&&win){rockBody(L,20,gy-5,15,7,41,RAMP.rock);rockBody(L,19,gy-15,11,6,43,RAMP.rock);rockBody(L,21,gy-24,7,5,47,RAMP.rock);rockBody(L,20,gy-30,4,3,53,RAMP.rock);
    for(let x=4;x<37;x++)for(let y=gy-12;y<gy-1;y++)if(has(L,x,y)&&!has(L,x,y-1)&&hash(x,y,5)>.3){P(x,y,pick(RAMP.moss,.65,x,y));P(x,y+1,pick(RAMP.moss,.4,x,y))}
    cAntler(L,18,gy-32,-1);cAntler(L,22,gy-32,1);
    for(let x=6;x<35;x++){const y=gy-11+Math.round(Math.sin(x*.42)*1.6+Math.abs(x-20)*.08);P(x,y,pick(RAMP.leaf,.65,x,y));P(x,y+1,pick(RAMP.leaf,.35,x,y));if(x%5===1){P(x,y-1,[255,214,120]);P(x+1,y-1,[255,240,190]);P(x,y,[230,150,60])}if(x%7===3){P(x,y-1,[212,72,58]);P(x,y,[255,140,120])}}
    for(let x=2;x<39;x++)if(hash(x,gy,3)>.45){P(x,gy-1,pick(RAMP.grass,.6,x,gy));if(hash(x,gy,4)>.6)P(x,gy-2,pick(RAMP.grass,.8,x,gy))}}
  else if(id==='herd'){for(let y=gy-2;y<=gy;y++)for(let x=1;x<39;x++)P(x,y,pick(RAMP.rockW,.35+hash(x,y,2)*.25,x,y));for(const[x,y]of[[6,gy-1],[14,gy],[23,gy-1],[31,gy]]){P(x,y,[18,12,8]);P(x+1,y,[18,12,8]);P(x,y+1,[18,12,8])}
    const posts=[[5,22,0],[16,13,1],[27,19,0],[35,9,1]];for(const[x,h,br]of posts){cPost(L,x,3,gy-h,gy-1,RAMP.wood,x);if(br){P(x,gy-h-1,RAMP.wood[5]);P(x+2,gy-h,RAMP.wood[2]);P(x+1,gy-h-2,RAMP.wood[6])}else for(let k=0;k<3;k++)P(x+k,gy-h-1,RAMP.wood[k?3:5])}
    const rail=(x0,y0,x1,y1)=>{const n=Math.max(Math.abs(x1-x0),1);for(let i=0;i<=n;i++){const x=Math.round(x0+(x1-x0)*i/n),y=Math.round(y0+(y1-y0)*i/n);P(x,y,pick(RAMP.wood,.7,x,y));P(x,y+1,pick(RAMP.wood,.35,x,y));P(x,y+2,RAMP.wood[1])}};
    rail(7,gy-18,16,gy-11);rail(18,gy-9,27,gy-14);rail(29,gy-6,37,gy-2);rail(2,gy-4,10,gy-3);
    for(const[x,y]of[[12,gy-14],[22,gy-12]]){P(x,y,[120,104,80]);P(x+1,y-1,[160,146,118])}for(let x=2;x<38;x+=4)if(hash(x,1,8)>.4)P(x,gy-3,pick(RAMP.grass,.5,x,1))}
  else if(id==='bridge'&&win){for(let y=10;y<=gy;y++)for(let x=11;x<29;x++){const row=Math.floor((y-10)/6),off=row%2?4:0,mortar=(y-10)%6===5||(x-11+off)%9===8;
      P(x,y,mortar?RAMP.rock[1]:pick(RAMP.rock,.62-(x-11)/18*.38+(fbm(x*.4,y*.3,5)-.5)*.35+((y-10)%6===0?.12:0),x,y))}
    for(let x=10;x<30;x++){P(x,8,RAMP.rock[6]);P(x,9,RAMP.rock[5]);P(x,7,x%3?RAMP.rock[4]:RAMP.rock[5])}
    for(const y of[16,30,42]){for(let x=10;x<30;x++){P(x,y,pick(IRON,.7-(x-10)/40,x,y));P(x,y+1,pick(IRON,.35,x,y));P(x,y+2,IRON[1])}for(let x=12;x<29;x+=4)P(x,y+1,[230,236,240])}
    for(let y=20;y<27;y++)for(let x=15;x<25;x++){const e=y===20||y===26||x===15||x===24;P(x,y,e?BRASS[2]:pick(BRASS,.75-(x-15)/18-(y-20)/30,x,y))}for(let x=17;x<23;x+=2)P(x,23,BRASS[1]);P(16,21,BRASS[5]);
    for(let y=gy-6;y<=gy;y++)for(let x=11;x<29;x++)if(hash(x,y,7)>.55)P(x,y,pick(RAMP.moss,.5+(y-gy+6)*.04,x,y));for(let x=11;x<29;x++)if(x%2)P(x,gy-8,[110,198,226])}
  else if(id==='bridge'){cPost(L,17,5,4,gy-2,RAMP.wood,11);for(let x=16;x<23;x++)P(x,3,RAMP.wood[x<19?6:4]);
    for(let x=6;x<34;x++)for(let y=8;y<11;y++)P(x,y,pick(RAMP.wood,.7-(y-8)*.2-(x>20?.1:0),x,y));
    const bx=9;for(let y=11;y<13;y++)P(bx+2,y,IRON[3]);for(let y=13;y<20;y++){const w=Math.min(3+Math.floor((y-13)*.7),6);for(let x=bx+2-w;x<=bx+2+w;x++)P(x,y,pick(BRASS,.8-(x-bx+w)/(2*w+1)*.6+(y===19?-.3:0),x,y))}P(bx+2,20,BRASS[1]);P(bx+2,21,IRON[2]);P(bx,15,BRASS[5]);
    for(let i=0;i<40;i++){const t=i/40,x=Math.round(24+t*15),y=Math.round(11+t*24+Math.sin(t*3.14)*-4);P(x,y,i%3?[214,190,140]:[160,130,90])}
    for(let k=0;k<3;k++)for(let a=0;a<14;a++){const x=19+Math.round(Math.cos(a/14*6.28)*(3+k)),y=gy-4+Math.round(Math.sin(a/14*6.28)*1.5);P(x,y,a%2?[214,190,140]:[150,120,80])}
    for(let y=gy-1;y<=gy;y++)for(let x=8;x<32;x++)P(x,y,pick(RAMP.rockW,.45,x,y));for(let x=26;x<38;x++)P(x,gy-1,pick(RAMP.water,.5+Math.sin(x)*.1,x,1))}
  else if(id==='signal'&&win){const lg=(x0,x1)=>{for(let i=0;i<=26;i++){const x=Math.round(x0+(x1-x0)*i/26),y=gy-i;P(x,y,IRON[4]);P(x+1,y,IRON[2])}};lg(9,17);lg(31,22);cPost(L,19,3,gy-26,gy,IRON,4);
    for(let y=gy-30;y<gy-24;y++){const w=10-(gy-24-y);for(let x=20-w;x<=21+w;x++)P(x,y,y===gy-30?IRON[6]:pick(IRON,.65-(x-20+w)/(2*w+2)*.5,x,y))}for(let x=11;x<31;x+=3)P(x,gy-29,[230,236,240]);
    for(let x=11;x<31;x++){const h=6+Math.round(Math.abs(Math.sin(x*1.1))*5+Math.abs(Math.sin(x*.4))*4);for(let y=0;y<h;y++){const t=1-y/h;P(x,gy-31-y,pick(FLAME,.15+t*.7+(Math.abs(x-20.5)<4?.15:0),x,y))}}
    for(const[x,y]of[[14,gy-46],[26,gy-44],[20,gy-49],[17,gy-43]])P(x,y,FLAME[4]);for(let x=6;x<35;x++)P(x,gy,pick(RAMP.rock,.4,x,1))}
  else if(id==='signal'){cPost(L,9,2,6,gy,RAMP.wood,6);for(let y=1;y<6;y++){P(9,y,IRON[5]);P(10,y,IRON[3])}P(9,0,IRON[6]);P(8,4,IRON[4]);P(11,4,IRON[3]);
    for(let y=7;y<30;y++){const w=18-Math.round((y-7)*.25)+Math.round(Math.sin(y*.5+1)*1.6);for(let x=11;x<11+w;x++){const fold=Math.sin((x-11)*.7+y*.15);P(x,y,pick(CLOTH,.55+fold*.18-(x-11)/w*.25+(fbm(x*.3,y*.3,4)-.5)*.2,x,y))}if(y>26)for(let x=11;x<11+w;x+=3)P(x+((y*3)%2),y,[0,0,0,0]),L.d[((y*L.w)+x)*4+3]=0}
    for(let x=15;x<23;x++){P(x,13,[30,14,10]);P(x,20,[30,14,10])}for(let y=13;y<21;y++){P(15,y,[30,14,10]);P(22,y,[30,14,10])}P(18,16,[230,210,170]);P(19,17,[230,210,170]);P(18,17,[30,14,10]);P(19,16,[30,14,10]);
    for(let y=gy-9;y<=gy;y++)for(let x=20;x<37;x++){const e=y===gy-9||x===20||x===36;P(x,y,e?RAMP.wood[1]:pick(RAMP.wood,.6-(x-20)/30+((y-gy)%4===0?-.2:0),x,y))}for(let x=22;x<36;x+=4)P(x,gy-5,IRON[4])}
  else if(id==='reach'&&win){for(let y=gy-12;y<=gy;y++)for(let x=6;x<34;x++){const nx=(x-20)/14,ny=(y-gy)/12;if(nx*nx+ny*ny>1)continue;P(x,y,pick(RAMP.rock,.55-nx*.25-(y-gy+12)*.02+(fbm(x*.4,y*.4,3)-.5)*.3,x,y))}
    for(let x=9;x<31;x++)for(let y=gy-10;y<gy-6;y++){const nx=(x-20)/11;if(nx*nx>1)continue;P(x,y,pick(RAMP.water,.55+(y-gy+10)*.08+Math.sin(x*.8)*.06,x,y))}for(const x of[12,17,23,28])P(x,gy-10,[255,255,255]);
    cPost(L,18,4,gy-34,gy-11,RAMP.rock,9);for(let y=gy-30;y<gy-14;y+=5){P(19,y,RUNE[3]);P(20,y-1,RUNE[4])}for(let x=16;x<24;x++)P(x,gy-35,RAMP.rock[6]);
    for(const x of[6,9,31,34])for(let k=0;k<4;k++)P(x,gy-k,pick(RAMP.grass,.5+k*.1,x,k));P(7,gy-5,[255,214,120]);P(32,gy-4,[226,122,106])}
  else if(id==='reach'){for(const[x,h,s]of[[20,30,0],[10,20,1],[29,22,2],[4,12,3],[35,10,4]]){const rx=Math.round(h*.45),ry=Math.max(3,Math.round(h*.22)),cy=gy-h+ry;
      for(let y=cy;y<=gy;y++)for(let k=-1;k<=1;k++)P(x+k,y,[200,186,172]);for(let y=-ry;y<=1;y++)for(let k=-rx;k<=rx;k++){const nx=k/rx,ny=y/ry;if(nx*nx+ny*ny>1)continue;P(x+k,cy+y,pick(R(['#2a1c24','#4a2c3a','#6e4256','#946076','#b88496']),.6-nx*.3-ny*.35,x+k,y))}
      for(let k=-rx+1;k<rx;k+=2)P(x+k,cy+2,[200,212,104])}for(let x=0;x<40;x++)P(x,gy,pick(RAMP.rockW,.4,x,1))}
  else if(win){for(const[x0,h,w]of[[6,24,5],[17,34,6],[29,26,5]]){for(let y=0;y<h;y++){const ww=y>h-4?w-(y-(h-4)):w;for(let x=x0;x<x0+ww;x++)P(x+(w-ww>>1),gy-y,pick(RAMP.rock,.6-(x-x0)/w*.45+(fbm(x*.5,y*.3,x0)-.5)*.3,x,y))}
      for(let y=5;y<h-5;y+=5){const cx=x0+(w>>1);P(cx,gy-y,RUNE[4]);P(cx-1,gy-y-1,RUNE[3]);P(cx+1,gy-y-1,RUNE[3]);P(cx,gy-y-2,RUNE[2])}}
    for(let x=10;x<18;x++)P(x,gy-16+Math.round(Math.abs(x-14)*.4),IRON[x%2?4:2]);for(let x=23;x<30;x++)P(x,gy-18+Math.round(Math.abs(x-26)*.4),IRON[x%2?4:2]);for(let x=2;x<38;x++)P(x,gy,pick(RAMP.rock,.35,x,1))}
  else{cDisc(L,20,gy-1,18,4,RAMP.rock,13,-.1);cCrys(L,16,gy-2,32,7,0);cCrys(L,8,gy-2,20,5,-.2);cCrys(L,25,gy-2,24,5,.2);cCrys(L,31,gy-1,12,3,.3);cCrys(L,4,gy-1,9,3,-.3);for(const[x,y]of[[12,20],[28,16],[21,10]])P(x,y,CRYS[5])}})}
/* ---------- crisis rendering ---------- */
function crAura(m,sx,sy){const D=crD();if(!D)return;const r=m.cr==='champ'?26:m.cr==='lt'?18:12;g.save();g.globalCompositeOperation='lighter';glow(sx,sy-m.d.h/2,r,D.rgb,(m.cr==='mark'?.14:.24)+Math.sin(S.t*5)*.05);g.restore();
  if(m.cr!=='mark'){g.fillStyle=D.col;g.globalAlpha=.5+Math.sin(S.t*6)*.2;const w=m.d.w+8;for(let i=0;i<w;i+=2)g.fillRect(sx-w/2+i,sy,1,1);g.globalAlpha=1}}
function crTag(m){return m.cr==='champ'?'★ '+m.d.name.toUpperCase():m.cr==='lt'?'◆ '+m.d.name.toUpperCase():m.d.name.toUpperCase()}
function drawCrisis(cx,cy){const C=crAct(),D=C&&CRISES[C.id],L=pl.leg||{};
  for(const id in L){const D2=CRISES[id];if(D2.mem.z!==Z.id)continue;const k=id+L[id];CR_SPR[k]=CR_SPR[k]||memArt(id,L[id]==='win');const x=ri(D2.mem.x+EDGE-cx);if(x<-40||x>W+40)continue;const y=ri(topAt(D2.mem.x+EDGE)-cy);
    if(L[id]==='win'){g.save();g.globalCompositeOperation='lighter';glow(x,y-26,22,id==='scar'?'110,230,240':id==='signal'?'255,200,100':D2.rgb,.18+Math.sin(S.t*2)*.04);g.restore()}g.drawImage(CR_SPR[k],x-18,y-43);
    if(Math.abs(pl.x-(D2.mem.x+EDGE))<40)ptext((L[id]==='win'?D2.win.n:D2.fail.n).toUpperCase(),x,y-52,'#ffd27a')}
  if(!D)return;
  if(C.st<=3)D.clues.forEach((c,i)=>{if(c.z!==Z.id||C.clues.includes(i))return;CR_SPR['c'+C.id]=CR_SPR['c'+C.id]||clueArt(C.id);const X=c.x+EDGE,x=ri(X-cx);if(x<-30||x>W+30)return;const y=ri(topAt(X)-cy);
    g.save();g.globalCompositeOperation='lighter';glow(x,y-8,14,D.rgb,.2+Math.sin(S.t*3+i)*.08);g.restore();g.drawImage(CR_SPR['c'+C.id],x-10,y-21);
    const by=y-30+Math.round(Math.sin(S.t*3+i)*2);g.fillStyle='#000';g.fillRect(x-3,by-4,7,9);g.fillStyle=D.col;g.fillRect(x-2,by-3,5,1);g.fillRect(x+2,by-3,1,3);g.fillRect(x-1,by,3,1);g.fillRect(x-1,by+1,1,1);g.fillRect(x-1,by+3,1,1);
    if(S.nearCr&&S.nearCr.k==='clue'&&S.nearCr.i===i)ptext('▲ INVESTIGATE',x,y-42+Math.sin(S.t*4),'#f2e6c8')});
  if(S.nearCr&&S.nearCr.k==='bef'){const m=S.nearCr.m;ptext('▲ BEFRIEND',ri(m.x-cx),ri(m.y-cy)-m.d.h-20+Math.sin(S.t*4),'#ff8aa0')}
  if(S.nearCr&&S.nearCr.k==='calm'){const m=S.nearCr.m;ptext('▲ CALM',ri(m.x-cx),ri(m.y-cy)-m.d.h-20+Math.sin(S.t*4),'#c8d468')}
  if(!D.zones.includes(Z.id)||C.st>3)return;const st=C.st;
  if(C.id==='herd'&&Math.random()<.08+st*.05)S.parts.push({x:S.cam+Math.random()*W,y:topAt(S.cam+Math.random()*W)-1,vx:rnd(10,40)*(Math.random()<.5?-1:1),vy:rnd(-12,-4),t:0,life:1.4,c:Math.random()<.5?'#8a7458':'#a08e70',g:-4,s:Math.random()<.3?2:1});
  if(C.id==='bridge')for(const p of Z.pools){const x0=ri(p.x0-cx),x1=ri(p.x1-cx);if(x1<0||x0>W)continue;const rise=2+st*2,y=ri(p.y-cy)-rise;g.globalAlpha=.55;g.fillStyle='#1e6b88';g.fillRect(x0,y,x1-x0,rise+1);g.globalAlpha=.8;g.fillStyle='#bff0ff';
    for(let x=x0;x<x1;x+=2)if(Math.sin(x*.3+S.t*3)>.4)g.fillRect(x,y,1,1);g.globalAlpha=1;const lx=x0+((S.t*12)%(x1-x0||1));g.fillStyle='#54331d';g.fillRect(ri(lx),y-1,9,2);g.fillStyle='#8f5a31';g.fillRect(ri(lx)+1,y-1,7,1)}
  if(C.id==='bridge'&&Math.random()<.05+st*.04)S.parts.push({x:S.cam+Math.random()*W,y:S.camY-4,vx:-30,vy:180,t:0,life:1.2,c:'#9fd8ec',g:0,s:1});
  if(C.id==='signal'){const tw=(Z.props||[]).find(p=>p[0]==='watchtower');if(tw){const x=ri(tw[1]-cx),y=ri(topAt(tw[1])-cy)-149,on=Math.floor(S.t*3.3)%5<2;g.fillStyle=on?'#ff5a3a':'#5a1410';g.fillRect(x-6,y-5,12,10);if(on){g.fillStyle='#ffd0c0';g.fillRect(x-3,y-3,6,5)}g.save();g.globalCompositeOperation='lighter';if(on){glow(x,y,26,'255,60,40',.4);g.fillStyle='rgba(255,90,60,.12)';g.beginPath();g.moveTo(x,y);g.lineTo(x-140,y+40);g.lineTo(x-140,y+10);g.fill()}g.restore()}
    else if(Math.random()<.01){S.crFl={x:S.cam+Math.random()*W,t:0}}if(S.crFl){S.crFl.t+=.016;const f=S.crFl,x=ri(f.x-cx),y=ri(40-f.t*30-cy*.2);g.save();g.globalCompositeOperation='lighter';glow(x,y,10,'255,90,60',Math.max(0,.6-f.t*.25));g.restore();if(f.t>2.4)S.crFl=null}}
  if(C.id==='scar'){S.crE=S.crE||[];if(Math.random()<.012+st*.008){const x=pl.x+rnd(-140,140);S.crE.push({x,t:0})}
    S.crE=S.crE.filter(e=>{e.t+=.016;const x=ri(e.x-cx),y=ri(topAt(e.x)-cy),h=Math.min(1,e.t*4)*Math.max(0,1-(e.t-1.2)*1.5)*14;if(h>0){g.fillStyle='#000';g.fillRect(x-3,y-ri(h)-1,7,ri(h)+1);
      g.fillStyle='#5a4290';g.fillRect(x-2,y-ri(h),5,ri(h));g.fillStyle='#c9a8ff';g.fillRect(x-1,y-ri(h),2,ri(h));g.fillStyle='#f0e2ff';g.fillRect(x-1,y-ri(h),1,2);
      if(e.t<.1)for(let i=0;i<8;i++)S.parts.push({x:e.x,y:topAt(e.x)-2,vx:rnd(-50,50),vy:rnd(-110,-40),t:0,life:.6,c:i%2?'#c9a8ff':'#3a2a5e',g:260,s:1})}return e.t<2})}}
function drawCrisisFx(){const C=crAct();if(!C||C.st<2||C.st>3||!inReg())return;const D=CRISES[C.id],a=C.st===3?.16+Math.sin(S.t*2.4)*.06:.08;
  const vg=g.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,W*.7);vg.addColorStop(0,`rgba(${D.rgb},0)`);vg.addColorStop(1,`rgba(${D.rgb},${a})`);g.fillStyle=vg;g.fillRect(0,0,W,H)}
/* ---------- HUD chip and panel ---------- */
let crHudK='',crHudT=0;
function crHud(){crHudT-=1/60;const C=crAct(),el=$('crchip');if(!C){if(crHudK!=='none'){crHudK='none';el.hidden=true}return}
  const D=CRISES[C.id],k=[C.id,C.st,Math.round(C.th),Math.round(C.rv)].join();if(k===crHudK)return;crHudK=k;el.hidden=false;el.style.setProperty('--crc',D.col);
  const need=C.st===4?(C.out==='win'?100:150):100;$('crn').textContent=D.n;$('crs').textContent=STN[C.st]+(C.st===3?' · '+Math.max(0,Math.ceil((100-C.th)*3))+'s':'');
  $('crth').style.width=(C.st===4?0:Math.min(100,C.th))+'%';$('crrv').style.width=Math.min(100,C.rv/need*100)+'%';el.classList.toggle('brk',C.st===3)}
let CRP=null;
function openCrisis(msg){CRP={msg:msg||''};pauseFor('crisis');renderCrisis()}
function closeCrisis(){CRP=null;unpause('crisis')}
function renderCrisis(){if(!CRP)return;const C=crAct(),L=pl.leg||{};
  const legH=Object.keys(L).length?'<div class="qh">Legacy of the Reach</div>'+Object.entries(L).map(([id,o])=>{const D=CRISES[id],x=o==='win'?D.win:D.fail;return`<div class="crleg ${o}"><b>${x.n}</b><span>${D.n} · ${o==='win'?'held':'broke through'}</span><span>${x.txt}</span></div>`}).join(''):'';
  if(!C){$('crtitle').textContent='Ashveil Reach';$('crreg').textContent='No active crisis';$('crleft').innerHTML=`<p class="crp">The Reach is quiet for now. Crises grow out of the Gatefall’s aftermath: shortages, migrations, sabotage and corruption. When one starts, you’ll see it at the top right.</p>${legH}`;$('crright').innerHTML='<p class="crp">Nothing to contribute right now.</p>';return}
  const D=CRISES[C.id],need=C.st===4?(C.out==='win'?100:150):100;$('crtitle').textContent=D.n;$('crreg').textContent=D.reg+(C.season>1?' · season '+C.season:'');$('crisis').style.setProperty('--crc',D.col);
  const track=STN.map((n,i)=>`<div class="${i<C.st?'on':i===C.st?'cur':''}"><i></i><span>${n}</span></div>`).join('');
  const eff=[];if(C.st>=1&&C.st<=3)eff.push(`${D.want.map(r=>RES[r].n).join(', ')} supply contracts pay 50% more.`);const cl=crClosed('board',D.svc&&D.svc.board)||crClosed('station',D.svc&&D.svc.station);if(cl)eff.push(cl);
  if(C.id==='scar'&&C.st>=1&&C.st<=3)eff.push('Scar creatures hit 15% harder.');if(C.st<=3)eff.push(`${D.marks.nm}s roam ${D.marks.z.map(z=>ZONES.find(q=>q.id===z).name).join(' and ')}.`);
  if(C.st===2&&!C.ltK)eff.push(`${D.lt.nm} is loose in ${ZONES.find(q=>q.id===D.lt.z).name}.`);if(C.st===3&&!C.chK)eff.push(`${D.champ.nm} waits in ${ZONES.find(q=>q.id===D.champ.z).name}.`);
  if(C.st===4&&C.out==='fail')eff.push('The crisis broke through. Recovery needs half again as much work, and marked creatures still roam.');
  const bars=C.st<=3?`<div class="crbar th"><i style="width:${Math.min(100,C.th)}%"></i></div><div class="crbl"><span>Threat</span><span>${C.st===3?'If it fills, the crisis breaks through':'If it fills, the crisis worsens'}</span></div>`:'';
  const rvTxt=C.st<=2?'At 100 you force the breaking point on your terms':C.st===3?'At 100 the crisis is held':'At '+need+' the region recovers';
  const clues=C.clues.map(i=>`<li><b>${D.clues[i].t}.</b> ${D.clues[i].txt}</li>`).join('')+(C.clues.length===D.clues.length?`<li class="cause"><b>Cause.</b> ${D.cause}</li>`:'');
  $('crleft').innerHTML=`<div class="crtrack">${track}</div><p class="crp">${D.st[C.st]}</p>${bars}<div class="crbar rv"><i style="width:${Math.min(100,C.rv/need*100)}%"></i></div><div class="crbl"><span>Resolve ${Math.round(C.rv)}/${need}</span><span>${rvTxt}</span></div>
    ${CRP.msg?`<div class="crmsg">${CRP.msg}</div>`:''}${eff.length?'<div class="qh">What it is doing</div><ul class="creff">'+eff.map(e=>`<li>${e}</li>`).join('')+'</ul>':''}
    ${C.st<=3?`<div class="qh">Evidence ${C.clues.length}/${D.clues.length}</div>${clues?'<ul class="creff">'+clues+'</ul>':'<p class="crp dim">Look for marked sites in '+[...new Set(D.clues.map(c=>ZONES.find(q=>q.id===c.z).name))].join(', ')+'.</p>'}`:''}${legH}`;
  const ok=canDeliver(),rec=C.st===4,ln=k=>C.ln[k]?` <em>${Math.round(C.ln[k])}</em>`:'';
  const lane=(k,txt,body='')=>`<div class="crl"><div class="crlh"><b>${LANE_N[k]}</b>${ln(k)}</div><span>${txt}</span>${body}</div>`;
  const matB=D.want.map(r=>`<button class="btn sm${mat(r)>=5&&ok?'':' alt'}" data-crd="mat:${r}" ${mat(r)>=5&&ok?'':'disabled'}>5 ${RES[r].n} <small>${mat(r)}</small> +${rec?15:12}</button>`).join('');
  const relB=D.relief.map(id=>{const R=rcpById(id),n=relief(id);return`<button class="btn sm${n&&ok?'':' alt'}" data-crd="rel:${id}" ${n&&ok?'':'disabled'}>${R.n} <small>×${n}</small> +${rec?25:20}</button>`}).join('');
  const relHow=D.relief.map(id=>{const R=rcpById(id);return`${R.n} (${DISC[R.d].n}: ${Object.entries(R.need).map(([k,n])=>n+' '+RES[k].n).join(', ')})`}).join('; ');
  $('crright').innerHTML=(ok?'':'<div class="warn">Deliveries are taken in towns, at contract boards, or inside the crisis region.</div>')+
    (rec?'':lane('combat',`Defeat creatures in ${D.zones.map(z=>ZONES.find(q=>q.id===z).name).join(', ')} (+1). Marked creatures +5, the ${D.lt.nm} +25, the ${D.champ.nm} +50.`))+
    (D.marks.calm&&!rec?lane('creature','Walk up to a panicked rotstag before it is provoked and calm it (+7). No blood spilled.'):'')+
    (rec?'':lane('invest','Find and examine the marked evidence sites (+8 each, +10 for the full picture).'))+
    lane('supply',`Deliver bundles of what the region needs.${rec?' Rebuilding takes stock.':''}`,`<div class="crbtns">${matB}</div>`)+
    lane('craft',`Craft relief supplies at a station and deliver them. ${relHow}.`,`<div class="crbtns">${relB}</div>`)+
    lane('transport','Complete any freight contract while the crisis runs (+15).')+
    (rec?'':lane('gather',`Gather inside the region (+1 per gather).`))}
$('crisis').addEventListener('click',e=>{const b=e.target.closest('[data-crd],#crclose');if(!b)return;if(b.id==='crclose')return closeCrisis();const[k,v]=b.dataset.crd.split(':');crDeliver(k,v);CRP.msg='';renderCrisis()});
$('crchip').addEventListener('click',()=>openCrisis());
