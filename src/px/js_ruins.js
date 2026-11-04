/* ---------- Ash Road Ruins: Emberwatch Inn (Bible 22.25: storytelling, salvage, rescue, hidden passage) ---------- */
THEMES.ashruin={...THEMES.heath,ramps:{...THEMES.heath.ramps,far:R(['#1e1a1e','#2c2428','#40322e','#5a4232','#7a5636','#9e6c3a','#c4884a']),
    grass:R(['#2e2c22','#3c3a2a','#4c4834','#5e583e','#726a48','#888054']),leaf:R(['#141210','#1e1a16','#28221c','#342c24','#40362c','#4e4234','#5e503e','#706048'])},
  fog:'rgba(80,70,64,.22)',fog2:'rgba(100,84,70,.1)',ray:'255,170,110',rayA:.8,amb:'ember',vig:'8,4,2',noFern:1};
THEMES.cellar={...THEMES.under,fog:'rgba(60,36,20,.24)',ray:'255,150,80',vig:'8,3,0'};
WX.ruins=['clear','clear'];WX.cellar=['clear'];
Object.assign(MOBS,{
  cinderghoul:{name:'Cinder Ghoul',kind:'gen',ai:'lunger',hp:130,atk:15,exp:30,w:12,h:26,spd:24,shard:[5,10],aggro:110},
  ashhound:{name:'Ash Hound',kind:'quad',ai:'lunger',hp:90,atk:14,exp:26,w:22,h:14,spd:46,shard:[4,8],aggro:130},
  scavenger:{name:'Ash Scavenger',kind:'gob',ai:'lunger',hp:110,atk:14,exp:26,w:12,h:18,spd:34,shard:[5,11],aggro:120},
  hollowhost:{name:'The Hollow Host',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1300,atk:24,exp:700,w:18,h:36,spd:22,shard:[50,80],aggro:200,resp:90}});
Object.assign(GEAR,{
  cinderghoul:{set:'Cinder Ghoul',drop:.14,pal:['#3a302c','#1e1814','#5a4a40','#ff7a3a','#8a7a6a'],head:{n:'Charred Hood',s:'hood'},chest:{n:'Scorched Wraps',s:'wraps'},hands:{n:'Ember-Cracked Gloves'},feet:{n:'Cinderwalk Boots'},
    charm:{n:'Warm Coal',s:'core'},weap:{katana:'Ashen Blade',daggers:'Cinder Knives',bow:'Smokewood Bow',staff:'Charred Staff',tome:'Burnt Ledger',axe:'Hearth Axe',hammer:'Coal Hammer',spear:'Poker Spear',shield:'Scorched Lid'}},
  ashhound:{set:'Ash Hound',drop:.14,pal:['#4a4440','#2a2420','#6a625a','#ff8a4a','#a89a8a'],head:{n:'Hound-Skull Cap',s:'pelt'},chest:{n:'Ashfur Mantle',s:'pelt'},hands:{n:'Pawpad Gloves'},feet:{n:'Trackless Boots'},
    charm:{n:'Ember Fang',s:'fang'},weap:{katana:'Houndtooth Blade',daggers:'Fang Pair',bow:'Hunt Bow',staff:'Leash Staff',tome:'Kennel Book',axe:'Gnaw Axe',hammer:'Bone Maul',spear:'Hound Spear',shield:'Collar Shield'}},
  scavenger:{set:'Ash Scavenger',drop:.14,pal:['#5a4a38','#3a2e22','#7a6650','#c8a050','#b23a2e'],head:{n:'Salvager’s Goggles',s:'goggles'},chest:{n:'Many-Pocket Coat',s:'leather'},hands:{n:'Grabbing Gloves'},feet:{n:'Rubble Boots'},
    charm:{n:'Lucky Button',s:'sigil'},weap:{katana:'Found Blade',daggers:'Pry Knives',bow:'Scrap Bow',staff:'Salvage Pole',tome:'Inventory List',axe:'Junk Axe',hammer:'Scrap Maul',spear:'Hook Pole',shield:'Door Shield'}},
  hollowhost:{set:'The Hollow Host',drop:1,drops:2,pal:['#3a2a24','#1e1410','#6a4a3a','#ff9a4a','#d8c8a8'],head:{n:'Host’s Smoke Crown',s:'kasa'},chest:{n:'Innkeeper’s Burnt Apron',s:'robe'},hands:{n:'Ladle Gauntlets'},feet:{n:'Cellar Boots'},
    charm:{n:'Inn Key',s:'sigil'},weap:{katana:'Carving Blade',daggers:'Kitchen Knives',bow:'Hearthsmoke Bow',staff:'Lantern Pole',tome:'Guest Register',axe:'Cleaver',hammer:'Tun Mallet',spear:'Roasting Spit',shield:'Tavern Sign'}}});
for(const k of['cinderghoul','ashhound','scavenger','hollowhost']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
GOB_S.scavenger={sk:'#8a7a5a',skd:'#5e5038',c:['#5a4a38','#3a2e22','#7a6650'],hat:'goggles',wp:'knife'};
QUAD.ashhound={...QUAD.wolf,c:['#2a2420','#4a4440','#6a625a','#8a8076','#ff8a4a'],extra:(P,Rc,o)=>{for(const[dx,dy]of[[-6,-2],[-1,0],[4,-1],[-3,2]]){P(o.cx+dx,o.cy+dy,'#ff7a3a');P(o.cx+dx+1,o.cy+dy,'#ffd27a')}for(let i=0;i<3;i++)P(o.cx-o.L/2-2-i,o.cy-3-i*2,i%2?'#8a8076':'#5a524a')}};
/* a simple shared humanoid painter for the ruins folk */
function humanoid(w,h,ax,spec,mode,flash){return sprite(w,h,(P,Rc)=>{const g=h-2,cx=ax,b=mode==='walk1'?1:0,sw=mode==='walk0'?1:mode==='walk1'?-1:0,lun=mode==='lunge'?2:0,cr=mode==='wind'?1:0,S0=spec,H=S0.h;
  const line=(x0,y0,x1,y1,wd,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n)-(wd>>1),Math.round(y0+(y1-y0)*i/n),wd,1,col)};
  const hip=g-Math.round(H*.42),sh=g-Math.round(H*.78),hd=g-H;
  line(cx-2,hip,cx-3+sw*2,g,S0.lw||2,S0.leg[0]);line(cx+2,hip,cx+3-sw*2,g,S0.lw||2,S0.leg[1]);Rc(cx-5+sw*2,g-1,4,2,S0.boot);Rc(cx+2-sw*2,g-1,4,2,S0.boot);
  for(let y=sh+cr;y<=hip+2;y++){const hw=S0.tw+(y>hip-3?1:0);for(let x=-hw;x<=hw;x++)P(cx+x+lun,y+b,x<=-hw+1?S0.body[0]:x>=hw-1?S0.body[2]:S0.body[1])}
  if(S0.apron)for(let y=hip-4;y<=hip+5;y++)Rc(cx-S0.tw+1+lun,y+b,S0.tw*2-1,1,S0.apron);
  const hx=cx+lun,hy=hd+cr+b;Rc(hx-3,hy,7,7,S0.skin[1]);Rc(hx-3,hy,2,7,S0.skin[0]);Rc(hx+3,hy+1,1,5,S0.skin[2]);P(hx+1,hy+3,S0.eye);P(hx+3,hy+3,S0.eye);if(S0.hat)S0.hat(P,Rc,hx,hy);
  let a1,a2;if(mode==='wind'){a1=[cx-7,sh-4];a2=[cx+7,sh-6]}else if(lun){a1=[cx+4,sh+6];a2=[cx+12,sh+2]}else{a1=[cx-6,hip+sw];a2=[cx+7,hip-sw]}
  line(cx-S0.tw+lun,sh+1+b,a1[0],a1[1],2,S0.body[0]);line(cx+S0.tw+lun,sh+1+b,a2[0],a2[1],2,S0.body[2]);P(a1[0],a1[1]+1,S0.skin[1]);P(a2[0],a2[1]+1,S0.skin[1]);
  if(S0.hand)S0.hand(P,Rc,a2[0],a2[1],mode);if(S0.fx)S0.fx(P,Rc,cx+lun,hy,hip,g,mode,b)},flash)}
const GHOUL={h:26,tw:4,leg:['#1e1814','#2a221c'],boot:'#120e0a',body:['#1e1814','#3a302c','#4a3e36'],skin:['#2a221e','#3a302c','#5a4a40'],eye:'#ff9a4a',
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(const[dx,dy]of[[-2,8],[1,12],[3,16],[-3,18],[0,4]])P(x+dx,hy+dy+b,dy%3?'#ff7a3a':'#ffd27a');if(mode==='lunge')for(let i=0;i<5;i++)P(x+10+i,hy+10-i,i%2?'#ffd27a':'#ff7a3a')}};
const HOST={h:34,tw:6,lw:3,leg:['#1e1410','#2a1c16'],boot:'#0e0a08',body:['#2a1c16','#4a3228','#6a4a3a'],skin:['#3a2a24','#5a4034','#7a5a48'],eye:'#ffd27a',apron:'#8a7a5a',
  hat:(P,Rc,hx,hy)=>{for(let i=0;i<6;i++){P(hx-2+i,hy-1-(i%2),'#3a3030');P(hx-1+i,hy-3-(i%3),'#5a5050')}},
  hand:(P,Rc,x,y,mode)=>{Rc(x-1,y-6,1,7,'#3a3030');Rc(x-3,y-1,6,6,'#2a2420');Rc(x-2,y,4,4,mode==='wind'?'#fff4c2':'#ffb04a');P(x-1,y+1,'#ffffff')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let i=0;i<8;i++){const fx2=x-5+((i*7)%11),fy=hy+6+((i*5)%20);P(fx2,fy+b,i%2?'#ff7a3a':'#ffd27a')}for(let i=0;i<4;i++)P(x-1+i,hy-6-i*2,'rgba(160,150,140,.6)')}};
const _brr=buildRoster;buildRoster=function(){_brr();for(const[t,sp,w,h,ax]of[['cinderghoul',GHOUL,30,32,14],['hollowhost',HOST,40,42,18]]){const o={kind:'gen',ax,ay:h-2,fps:4},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=humanoid(w,h,ax,sp,md);F[md]=humanoid(w,h,ax,sp,md,1)}o.F=F;MSP[t]=o}};
/* props */
Object.assign(PROPS,{
  ruinhouse(x,X,Y,v){const P=px3(x),S=R(['#2a2220','#3e322c','#54443a','#6a5648','#806856','#967a64','#ac8e74']),W=TH.wood||RAMP.wood;const w=v?40:52,h=v?50:64;
    for(let y=0;y<h;y++)for(let k=-w;k<=w;k++){const broken=y>h*.55&&hash(Math.floor(k/6),Math.floor(y/6),X+v)>(1-(y-h*.55)/(h*.6));if(broken)continue;const brick=((y>>2)+((k+(y>>2)%2*3)>>3))%2;const win=Math.abs(k-(v?0:-20))<7&&y>h*.35&&y<h*.6||(!v&&Math.abs(k-20)<7&&y>h*.35&&y<h*.6);
      if(win){P(X+k,Y-y,[18,12,10]);continue}P(X+k,Y-y,pick(S,.5+(brick?.08:-.04)-(k+w)/(6*w)+(y<3?-.15:0)+(hash(k,y,X)-.5)*.12,X+k,y))}
    for(let i=0;i<6;i++){const k=-w+8+i*(2*w-16)/5;for(let y=h-10;y<h+6;y++){if(hash(i,y,X)>.6)continue;P(X+Math.round(k+(y-h)*.3),Y-y,W[1])}}
    for(let i=0;i<40;i++){const k=-w+Math.floor(hash(i,7,X)*2*w),y=Math.floor(hash(i,8,X)*8);P(X+k,Y-y,y<3?[40,34,30]:[70,60,54])}for(let i=0;i<8;i++)P(X-w+Math.floor(hash(i,9,X)*2*w),Y-1-Math.floor(hash(i,10,X)*3),[255,120,60])},
  chimney(x,X,Y){const P=px3(x),S=R(['#2a2220','#3e322c','#54443a','#6a5648','#806856','#967a64','#ac8e74']);for(let y=0;y<90;y++)for(let k=-9;k<=9;k++){const brick=((y>>2)+((k+(y>>2)%2*3)>>3))%2;P(X+k,Y-y,pick(S,.55+(brick?.08:-.04)-(k+9)/60,X+k,y))}for(let k=-11;k<=11;k++){P(X+k,Y-90,S[5]);P(X+k,Y-91,S[6])}
    if(!pl.flags||!pl.flags.cellar)for(const[a,b]of[[-3,10],[-1,13],[1,15],[3,18],[0,22],[-2,25],[2,28]])P(X+a,Y-b,[20,14,12])},
  rubble(x,X,Y){const P=px3(x),S=TH.rock,W=TH.wood||RAMP.wood;for(let i=0;i<70;i++){const k=-16+Math.floor(hash(i,1,X)*32),h=Math.floor((1-Math.abs(k)/18)*14*hash(i,2,X));for(let y=0;y<h;y++)P(X+k,Y-y,pick(S,.45+hash(i,y,X)*.25,X+k,y))}
    for(let i=0;i<3;i++){const k=-12+i*10;for(let j=0;j<14;j++)P(X+k+j,Y-6-Math.round(j*(i%2?.5:-.3))-i*3,W[1+i%2])}}});
/* zones */
const ROADI=zIdx('road'),RUI=ZONES.length,CEI=RUI+1;
{const Ru={id:'ruins',name:'Emberwatch Ruins',ch:'Ashveil Reach',theme:'ashruin',lv:[3,4],req:2,ww:1600,start:70,
  seg:[[0,380,250],[380,160,238],[540,360,250],[900,140,236],[1040,560,250],[420,80,204,'plank'],[620,90,198,'f'],[780,90,206,'f'],[960,80,196,'plank'],[1180,90,200,'f'],[1360,90,190,'f']],
  mobs:[['ashhound',0,280],['cinderghoul',2,640],['scavenger',2,820],['ashhound',4,1120],['cinderghoul',4,1300],['scavenger',4,1480],['cinderghoul',7,800]],
  portals:[{x:22,to:ROADI,tx:860}],labels:[[700,'Emberwatch Inn',110],[1400,'Stable Yard',70]],npcs:['hadda'],
  props:[['cart',150],['ruinhouse',380,1],['rubble',520],['ruinhouse',700,0],['chimney',800],['rubble',940],['grave',1060],['deadoak',1180],['ruinhouse',1400,1],['rubble',1520]],trees:[],
  salv:[300,560,960,1240,1560],trapped:[520,940,1520],hatch:800};
 const Ce={id:'cellar',name:'Emberwatch Cellar',ch:'Ashveil Reach',theme:'cellar',lv:[5,5],req:3,ww:900,start:60,
  seg:[[0,900,250],[300,80,212,'plank'],[540,80,212,'plank']],mobs:[['hollowhost',0,700],['cinderghoul',0,360]],portals:[{x:22,to:RUI,tx:800}],
  labels:[[450,'The Wine Cellar',100]],props:[['crates',140],['crates',420],['fire',600],['crates',820]],trees:[]};
 prepZone(Ru);prepZone(Ce);for(const z of[Ru,Ce]){z.nodes=[];z.stations=[]}Ru.salv=Ru.salv.map(x=>x+EDGE);Ru.trapped=Ru.trapped.map(x=>x+EDGE);Ru.hatch+=EDGE;ZONES.push(Ru,Ce);
 const Rd=ZONES[ROADI];Rd.portals.push({x:860+EDGE,to:RUI,tx:70+EDGE});(Rd.labels=Rd.labels||[]).push([860+EDGE,'Emberwatch',78])}
MAPXY.ruins=[11,74];MAPXY.cellar=[10,88];
NPCS.hadda={name:'Caravaneer Hadda',title:'Survivor of Emberwatch',x:150+EDGE,cls:'ronin',look:{sex:1,build:1,face:1,hair:6,hairC:5,beard:0,skin:2,eye:3,outfit:3},eq:{head:'scavenger',chest:'r_start'},
  lines:['Emberwatch was the last good bed on the Ash Road. Then the Gatefall came down the road on fire.','Some of my people are still under that rubble. I can hear them when the wind drops.','Maeve kept the inn for thirty years. She would not leave her cellar. She still has not.']};
BARKS.hadda=['Listen for knocking.','Mind the hounds.','Thirty years of hospitality.'];
Object.assign(LORE,{
  arA:{z:'ruins',x:240,k:'note',t:'Guest Register',txt:'“Emberwatch Inn. Night of the Gate. Twelve guests, two caravans, one pilgrim. All paid. Maeve says no one leaves before breakfast, Gate or no Gate.”'},
  arB:{z:'ruins',x:880,k:'book',t:'Maeve’s Note',txt:'“If the roof comes down, get to the cellar. The hatch is behind the chimney stones; push the loose ones. There is wine, bread and a stout door. I will keep the lantern lit.”'},
  arC:{z:'cellar',x:200,k:'note',t:'Lantern Log',txt:'“Day 3. The guests stopped answering. Day 9. The lantern will not go out. Day 40. I do not get hungry. I do not sleep. Someone has to keep the lantern lit.”'}});
Object.assign(QUESTS,{
  ar1:{title:'Knocking Under Stone',giver:'hadda',lv:2,
    offer:'Three of my caravaners are trapped under the inn’s rubble. They knock when the hounds are far. Find the knocking, clear the stones, and send them back to me.',
    desc:'Free three trapped survivors in the Emberwatch Ruins.',goal:{t:'event',id:'rescue',n:3,lab:'Survivors freed'},where:'Emberwatch Ruins, off the Ash Road',
    prog:'Look for rubble with someone knocking beneath it.',done:'Three faces I thought I would never see again. You do not know what you have given me.',reward:{exp:450,sh:40}},
  ar2:{title:'What the Fire Left',giver:'hadda',pre:'ar1',
    offer:'We need to rebuild the wagons before we can leave. The ruins are full of good salvage: hinges, nails, tack. Pick through the piles and bring back six.',
    desc:'Gather 6 Salvage from the piles in the ruins.',goal:{t:'event',id:'salv',n:6,lab:'Salvage gathered'},where:'Salvage piles around the inn and stable yard',
    prog:'Look for heaps of charred timber and metal.',done:'Enough for two axles and a harness. We leave at first light. Except… there is Maeve.',reward:{exp:400,sh:30}},
  ar3:{title:'The Lantern in the Cellar',giver:'hadda',pre:'ar2',lv:4,
    offer:'Maeve, the innkeeper. She went down to the cellar the night of the Gate and never came up. People say there is a light down there that never goes out. Find the way down. Find her. Whatever she is now.',
    desc:'Find the hidden cellar of Emberwatch Inn and lay the Hollow Host to rest.',goal:{t:'kill',mob:'hollowhost',n:1,lab:'The Hollow Host laid to rest'},where:'Somewhere beneath Emberwatch Inn',
    prog:'Maeve’s note may say where the cellar is.',done:'So the lantern is out. Good. She kept it lit long enough.',reward:{exp:900,sh:70,sp:1}},
  ar4:{title:'Maeve’s Key',giver:'hadda',pre:'ar3',
    offer:'You brought back her key. The inn belonged to Maeve, and Maeve has a niece in CrestHollow. Or we could use the key ourselves: rebuild Emberwatch as a caravan stop. Or leave it closed, a grave for twelve guests.',
    desc:'Decide what becomes of Emberwatch Inn.',goal:{t:'talk',npc:'hadda'},where:'Caravaneer Hadda, at the ruins',
    prog:'Tell Hadda your choice.',done:'Then that is Emberwatch’s story now. Thank you for finishing it.',
    choices:[{n:'Give it to Maeve’s niece',d:'Family keeps the inn. The road remembers kindness.',flag:'inn_niece',reward:{exp:900}},
      {n:'Rebuild it as a caravan stop',d:'Hadda’s caravaners settle here. Unlocks Emberwatch Stew.',flag:'inn_caravan',reward:{sh:120,fl:{emberstew:1}}},
      {n:'Leave it as a memorial',d:'Twelve guests rest here. The ash settles.',flag:'inn_memorial',reward:{exp:500,item:['hollowhost','charm',2]}}],reward:{exp:500}}});
RECIPES.push({id:'emberstew',d:'cooking',r:1,n:'Emberwatch Stew ×3',use:'pots3',flag:'emberstew',need:{herb:2,hide:1},desc:'Maeve’s recipe, kept by Hadda: three hearty bowls.'});
/* interactions: salvage piles, trapped survivors, the chimney hatch */
function ruinsNear(){if(Z.id!=='ruins')return null;const f=pl.flags;
  if(Math.abs(pl.x-Z.hatch)<16&&(f.cellar||pl.lore&&pl.lore.arB))return{k:'hatch'};
  for(let i=0;i<Z.trapped.length;i++)if(!((f.rescued||0)&(1<<i))&&Math.abs(pl.x-Z.trapped[i])<18)return{k:'trap',i};
  for(let i=0;i<Z.salv.length;i++)if(Math.abs(pl.x-Z.salv[i])<14&&!(S.salvDone&&S.salvDone[i]))return{k:'salv',i};return null}
const _cnr=crNear;crNear=function(){return ruinsNear()||_cnr()};
const RK=['hatch','trap','salv'];
const _cur=crUse;crUse=function(n){if(n&&RK.includes(n.k)){const f=pl.flags;
  if(n.k==='hatch'){if(!f.cellar){f.cellar=1;banner('Hidden passage','The loose chimney stones swing inward');tone(120,.6,'square',.04,-40);delete ZCACHE[S.zone];save();return}return travel({to:CEI,tx:60+EDGE})}
  if(n.k==='trap'){f.rescued=(f.rescued||0)|(1<<n.i);S.fleeing=S.fleeing||[];S.fleeing.push({x:Z.trapped[n.i],t:0});banner('Freed','A caravaner scrambles out and runs for the road');sfx.pick();
    const st=qSt('ar1');if(st&&st.s==='a'){st.n=[0,1,2].filter(i=>(f.rescued||0)&(1<<i)).length;qProgress('ar1','Survivor')}save();return}
  if(n.k==='salv'){S.salvDone=S.salvDone||{};S.salvDone[n.i]=1;const k=1+(Math.random()<.4?1:0);addMat('salvage',k,pl.x,pl.y);dGain('salvage',8);const st=qSt('ar2');if(st&&st.s==='a'&&st.n<6){st.n=Math.min(6,st.n+k);qProgress('ar2','Salvage')}return}}return _cur(n)};
const _clr=crLabel;crLabel=function(n){if(n&&RK.includes(n.k))return n.k==='hatch'?(pl.flags.cellar?'Enter · Hidden cellar':'Push · Loose chimney stones'):n.k==='trap'?'Free · Trapped caravaner':'Salvage · Charred heap';return _clr(n)};
const _ezr=enterZone;enterZone=function(...a){S.salvDone=null;S.fleeing=null;return _ezr(...a)};
function drawRuins(cx,cy){if(Z.id!=='ruins')return;const f=pl.flags;
  for(let i=0;i<Z.trapped.length;i++){if((f.rescued||0)&(1<<i))continue;const X=Z.trapped[i],x=ri(X-cx),y=ri(topAt(X)-cy);if(x<-30||x>W+30)continue;
    g.fillStyle='#d8c8a8';g.fillRect(x+6,y-6,2,2);g.fillStyle='#5a4a3a';g.fillRect(x+5,y-4,4,3);if(Math.sin(S.t*3+i)>.6){ptext('knock knock',x,y-26,'#c8b8a0')}}
  for(let i=0;i<Z.salv.length;i++){if(S.salvDone&&S.salvDone[i])continue;const X=Z.salv[i],x=ri(X-cx),y=ri(topAt(X)-cy);if(x<-20||x>W+20)continue;
    for(let k=-7;k<=7;k++){const h=Math.round((1-Math.abs(k)/8)*6);for(let j=0;j<h;j++){g.fillStyle=(k+j)%4===0?'#c8a050':(k+j)%3===0?'#7a6a5a':'#3a2e26';g.fillRect(x+k,y-1-j,1,1)}}if(Math.sin(S.t*4+i*2)>.85){g.fillStyle='#fff4c2';g.fillRect(x-2+i%4,y-5,1,1)}}
  for(const r of S.fleeing||[]){r.t+=1/60;r.x-=1.4;const x=ri(r.x-cx),y=ri(topAt(r.x)-cy);g.fillStyle='#000';g.fillRect(x-3,y-17,7,17);g.fillStyle='#7a5a3a';g.fillRect(x-2,y-12,5,8);g.fillStyle='#d8b890';g.fillRect(x-2,y-16,5,4);g.fillStyle='#3a2a20';g.fillRect(x-2+(Math.floor(S.t*8)%2),y-4,2,4)}
  if(S.fleeing)S.fleeing=S.fleeing.filter(r=>r.t<6)}
