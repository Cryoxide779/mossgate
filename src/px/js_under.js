/* ---------- CrestHollow Underworks (Bible 22.25: utilities, maintenance routes, social access, civic hazards) ---------- */
THEMES.under={ramps:{far:R(['#06080a','#0a0e12','#0e141a','#121a22','#18222c','#1e2a36','#263442']),
    wall:R(['#0e0c0c','#181414','#221c1a','#2e2622','#3a302a','#4a3e34','#5a4c40']),
    rock:R(['#0c0b0a','#161412','#211d1a','#2c2723','#38322d','#463e38','#564c44']),rockW:R(['#100c0a','#1c1612','#2a201a','#382c22','#48382c','#5a4636','#6e5642']),
    grass:R(['#1a2018','#222a1e','#2c3626','#36422e','#425038','#506044']),moss:R(['#141a14','#1c241a','#243022','#2e3c2a','#384832','#44563c']),
    leaf:R(['#0a0c0a','#121612','#1a201a','#222a22','#2c362c','#364236','#424e40','#4e5c4c']),
    water:R(['#08100e','#0e1a18','#142624','#1c3432','#264644','#345a56','#4a7670','#6a9a90'])},
  mid:'ruins',canopy:'chains',fog:'rgba(30,40,40,.24)',fog2:'rgba(40,52,50,.1)',ray:'255,200,130',rayA:.35,amb:'mote',vig:'2,4,6',glow:.75,noFern:1};
WX.under=['clear'];WX.cistern=['clear'];
Object.assign(MOBS,{
  sumprat:{name:'Sump Rat',kind:'quad',ai:'lunger',hp:110,atk:16,exp:28,w:20,h:10,spd:56,shard:[4,8],aggro:130},
  drainooze:{name:'Drain Ooze',kind:'slime',ai:'slime',hp:170,atk:18,exp:34,w:18,h:12,spd:16,shard:[5,10],aggro:80},
  gasmoth:{name:'Gaslight Moth',kind:'fly',ai:'flyer',fly:1,hp:120,atk:18,exp:36,w:16,h:12,spd:46,shard:[5,10],aggro:160},
  oldpale:{name:'Old Pale',kind:'quad',ai:'lunger',elite:1,bb:1,hp:2200,atk:30,exp:1100,w:60,h:22,spd:26,shard:[70,110],aggro:200,resp:90}});
Object.assign(GEAR,{
  sumprat:{set:'Sump Rat',drop:.13,pal:['#3a3430','#1e1a18','#5a524a','#c84a3a','#a8a090'],head:{n:'Sumpskin Cap',s:'hood'},chest:{n:'Drainrunner Vest',s:'leather'},hands:{n:'Gnaw-Patched Gloves'},feet:{n:'Gutter Boots'},
    charm:{n:'Lucky Rat Tail',s:'fang'},weap:{katana:'Gutter Blade',daggers:'Sump Shivs',bow:'Drainpipe Bow',staff:'Sewer Staff',tome:'Rat Census',axe:'Grate Axe',hammer:'Drain Maul',spear:'Gutter Pike',shield:'Manhole Shield'}},
  drainooze:{set:'Drain Ooze',drop:.13,pal:['#4a4a3a','#2a2a20','#6a6a52','#c8c890','#7a8a7a'],head:{n:'Ooze-Slick Hood',s:'hood'},chest:{n:'Oilcloth Coat',s:'leather'},hands:{n:'Waxed Gloves'},feet:{n:'Waders'},
    charm:{n:'Clotted Pearl',s:'gel'},weap:{katana:'Silt Blade',daggers:'Drip Knives',bow:'Siphon Bow',staff:'Plunger Staff',tome:'Drainage Plans',axe:'Clog Axe',hammer:'Sump Hammer',spear:'Drain Rod',shield:'Grate Shield'}},
  gasmoth:{set:'Gaslight Moth',drop:.13,pal:['#d8d0b8','#8a8270','#f2ead2','#ffd27a','#6a5a40'],head:{n:'Moth-Dust Veil',s:'feather'},chest:{n:'Powderwing Mantle',s:'robe'},hands:{n:'Dusted Gloves'},feet:{n:'Silent Slippers'},
    charm:{n:'Gaslight Wick',s:'lamp'},weap:{katana:'Wingedge Blade',daggers:'Dust Needles',bow:'Moonwing Bow',staff:'Wick Staff',tome:'Lamplighter’s Log',axe:'Wing Axe',hammer:'Lantern Maul',spear:'Wick Spear',shield:'Lampshade Shield'}},
  oldpale:{set:'Old Pale',drop:1,drops:2,pal:['#d8d4c4','#8a8676','#f2eee0','#c84a3a','#6a7a72'],head:{n:'Pale Jaw Helm',s:'horns'},chest:{n:'Albino Scale Coat',s:'plate'},hands:{n:'Cistern Claws'},feet:{n:'Sluice Greaves'},
    charm:{n:'Pale Eye',s:'core'},weap:{katana:'Pale Tooth',daggers:'Scute Knives',bow:'Sinew-of-Pale Bow',staff:'Cistern Staff',tome:'Waterworks Register',axe:'Jaw Axe',hammer:'Sluice Hammer',spear:'Croc Spear',shield:'Scute Shield'}}});
for(const k of['sumprat','drainooze','gasmoth','oldpale']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
SLIME_S.drainooze={body:R(['#1e1e16','#34342a','#4e4e3e','#6a6a52','#8a8a6a']),top:null,deco:'glass'};
QUAD.sumprat={...RATQ,c:['#1a1614','#3a3430','#5a524a','#2a2420','#ff4a3a'],extra:(P,Rc,o)=>{RATQ.extra((x,y,c)=>P(x,y,c==='#5a4e44'?'#3a3430':c==='#7e7062'?'#5a524a':c==='#8cc23a'?'#5a524a':c==='#c8f070'?'#7a7268':c),Rc,o)}};
QUAD.oldpale={cw:100,ch:30,cx:44,len:56,bh:12,leg:5,lw:4,c:['#3a3630','#b8b4a4','#e2ded0','#8a8676','#c84a3a'],head:'none',tail:'long',extra:(P,Rc,o)=>{
  const top=Math.floor(o.cy-o.bh/2);for(let x=Math.floor(o.cx-o.L/2+4);x<o.cx+o.L/2-2;x+=3){P(x,top-1,'#8a8676');P(x+1,top-1,'#e2ded0')}
  for(let x=Math.floor(o.cx-o.L/2+6);x<o.cx+o.L/2-4;x+=6)for(let y=1;y<o.bh-3;y+=4)P(x+(y%8?2:0),top+y,'#a8a494');
  const hx=Math.round(o.cx+o.L/2-3),hy=o.cy-1,op=o.mode==='lunge'?4:o.mode==='wind'?2:0;
  for(let k=0;k<22;k++){const h=Math.max(2,5-Math.floor(k/6));Rc(hx+k,hy-h-op*(k/22),1,h,k<3?'#b8b4a4':'#d2cebe');Rc(hx+k,hy+op*(k/22),1,Math.max(2,4-Math.floor(k/7)),'#b8b4a4')}
  for(let k=2;k<22;k+=2){P(hx+k,hy-1-Math.round(op*(k/22)),'#f6f2e6');P(hx+k+1,hy+Math.round(op*(k/22)),'#f6f2e6')}if(op)for(let k=3;k<20;k++)P(hx+k,hy-Math.round(op*(k/44)),'#5a1a1a');
  P(hx+3,hy-5,'#c84a3a');P(hx+4,hy-5,'#ff8a7a');P(hx+3,hy-6,'#8a8676');P(hx+20,hy-4,'#3a3630');
  for(let i=0;i<10;i++)P(Math.round(o.cx-o.L/2-6-i*1.8),o.cy+1+Math.round(Math.sin(i*.8)),i%2?'#8a8676':'#b8b4a4')}};
function mothFrame(ph,charge,flash){return sprite(32,26,(P,Rc)=>{const cx=16,cy=14;const W1=['#8a8270','#b8b09a','#d8d0b8','#f2ead2'],B=['#3a3428','#5a5040','#7a6e58'];
  const wa=[-1,0,1][ph%3];for(const s of[-1,1]){for(let i=0;i<9;i++)for(let j=0;j<6;j++){const x=cx+s*(2+i),y=cy-2-Math.round(j*(wa===-1?1.1:wa===0?.6:-.2))-Math.round(i*.15*(wa+1));if(j>5-Math.floor(i/2))continue;P(x,y,W1[Math.min(3,(i+j)%4)])}
    P(cx+s*6,cy-4,'#6a5a40');P(cx+s*7,cy-4,'#3a3428');P(cx+s*7,cy-5,'#ffd27a')}
  for(let y=-3;y<6;y++)for(let x=-1;x<=1;x++)P(cx+x,cy+y,y>2?(charge?'#fff4c2':'#ffd27a'):B[1+(x===-1?0:1)]);for(let x=-2;x<=2;x++)P(cx+x,cy+4,charge?'#ffffff':'#ffe8a0');
  P(cx-1,cy-4,'#ff6a3a');P(cx+1,cy-4,'#ff6a3a');P(cx-2,cy-6,'#8a8270');P(cx+2,cy-6,'#8a8270');P(cx-3,cy-7,'#8a8270');P(cx+3,cy-7,'#8a8270')},flash)}
const _bru=buildRoster;buildRoster=function(){_bru();MSP.gasmoth={kind:'fly',ax:16,ay:16,fl:[0,1,2].map(p=>mothFrame(p,0,0)),ch:mothFrame(1,1,0),F:{fl:[0,1,2].map(p=>mothFrame(p,0,1)),ch:mothFrame(1,1,1)}}};
/* props */
Object.assign(PROPS,{
  grate(x,X,Y){const P=px3(x),I=IRONC;for(let y=0;y<30;y++)for(let k=-14;k<=14;k++){const r=Math.hypot(k/14,(y-15)/15);if(r>1)continue;P(X+k,Y-y,r>.86?I[1]:(k%4===0||(y%5===0))?I[2]:[10,12,12])}for(let k=-3;k<=3;k++)P(X+k,Y-14,I[3])},
  sluice(x,X,Y){const P=px3(x),I=IRONC,W=TH.wood||RAMP.wood;for(const k of[-22,20])for(let y=0;y<80;y++)for(let j=0;j<3;j++)P(X+k+j,Y-y,pick(TH.rock,.55-j*.1,X+k,y));
    for(let y=10;y<60;y++)for(let k=-19;k<=19;k++)P(X+k,Y-y,(y%10===0)?I[1]:pick(W,.55-(k+19)/120+(hash(k,y,X)-.5)*.1,X+k,y));for(let k=-19;k<=19;k+=8)for(let y=10;y<60;y++)P(X+k,Y-y,I[2]);
    for(let i=0;i<9;i++){const a=i/9*Math.PI*2;P(X+Math.round(Math.cos(a)*6),Y-70+Math.round(Math.sin(a)*6),I[3])}for(let k=-6;k<=6;k++)P(X+k,Y-70,I[2]);for(let y=-6;y<=6;y++)P(X,Y-70+y,I[2])},
  stall2(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-18,17])for(let y=0;y<34;y++){P(X+k,Y-y,pick(W,.6,X,y));P(X+k+1,Y-y,W[2])}
    for(let y=34;y<42;y++)for(let k=-22;k<=22;k++)P(X+k,Y-y,((k+22)>>2)%2?[122,54,46]:[200,176,120]);for(let k=-18;k<=18;k++){P(X+k,Y-14,W[4]);P(X+k,Y-13,W[2])}
    for(const[k,c]of[[-12,[200,160,70]],[-6,[150,190,110]],[0,[190,90,70]],[6,[120,150,190]],[12,[220,200,160]]])for(let y=0;y<4;y++)for(let j=0;j<3;j++)P(X+k+j,Y-15-y,c);Z.glows.push([X,Y-24,22,'255,190,110'])},
  vent(x,X,Y){const P=px3(x),I=IRONC;for(let y=0;y<6;y++)for(let k=-10;k<=10;k++)P(X+k,Y-y,y===5?I[3]:k%3===0?[10,10,10]:I[1]);for(let k=-12;k<=12;k++)P(X+k,Y-6,I[2])}});
/* zones */
const TOWNI=zIdx('town'),UI=ZONES.length,CI=UI+1;
{const U={id:'under',name:'CrestHollow Underworks',ch:'Ashveil Reach',theme:'under',lv:[5,6],req:4,ww:1900,start:70,
  seg:[[0,520,250],[520,220,292,'bed'],[740,420,250],[1160,200,292,'bed'],[1360,540,250],[560,60,236,'plank'],[650,60,232,'plank'],[800,90,206,'f'],[980,90,196,'f'],[1190,60,236,'plank'],[1280,60,232,'plank'],[1480,90,204,'f'],[1660,100,196,'f'],[540,18,272,'stone'],[730,18,272,'stone'],[1176,18,272,'stone'],[1344,18,272,'stone']],
  pools:[{x0:520,x1:740,y:262},{x0:1160,x1:1360,y:262}],
  mobs:[['sumprat',0,420],['drainooze',2,860],['gasmoth',-2,900],['sumprat',2,1060],['drainooze',4,1460],['gasmoth',-2,1560],['sumprat',4,1700],['sumprat',7,830]],
  portals:[{x:22,to:TOWNI,tx:430},{x:1878,to:CI,tx:60}],labels:[[260,'Sump Market',70],[1000,'Valve Gallery',110],[1740,'Cistern Gate',100]],npcs:['corra','wen'],
  props:[['lantern',110],['stall2',220],['tent',300],['stall2',380],['crates',460],['pipes',800],['grate',940],['pipes',1080],['vent',1420],['pipes',1520],['vent',1600],['sluice',1760]],trees:[],vents:[1420,1600],valves:[880,1090,1560]};
 const C={id:'cistern',name:'The Great Cistern',ch:'Ashveil Reach',theme:'under',lv:[7,7],req:6,ww:1200,start:60,
  seg:[[0,300,250],[300,560,286,'bed'],[860,340,250],[340,90,232,'plank'],[480,90,222,'f'],[640,90,232,'plank'],[300,18,268,'stone'],[842,18,268,'stone']],
  pools:[{x0:300,x1:860,y:258}],mobs:[['oldpale',2,1000],['drainooze',0,200]],portals:[{x:22,to:UI,tx:1830}],labels:[[580,'The Great Cistern',120]],
  props:[['pipes',140],['sluice',260],['vent',940],['grate',1080]],trees:[],vents:[940]};
 prepZone(U);prepZone(C);for(const z of[U,C]){z.nodes=[];z.stations=[];z.vents=z.vents.map(x=>x+EDGE);if(z.valves)z.valves=z.valves.map(x=>x+EDGE)}ZONES.push(U,C);
 const T=ZONES[TOWNI];T.portals.push({x:430+EDGE,to:UI,tx:70+EDGE});(T.labels=T.labels||[]).push([430+EDGE,'Underworks',30])}
MAPXY.under=[12,46];MAPXY.cistern=[5,38];WAYS.under=140;
NPCS.corra={name:'Waterwarden Corra',title:'Keeper of the Underworks',x:150+EDGE,cls:'weaver',look:{sex:1,build:1,face:2,hair:3,hairC:3,beard:0,skin:3,eye:2,outfit:4},eq:{head:'drainooze',chest:'drainooze',feet:'drainooze'},
  lines:['Every street above has a drain below. Every drain has someone keeping it clear. Lately that is just me.','The Charter fixes roofs because people can see roofs.','Down here we do not ask why you came. We ask whether you can turn a valve.']};
NPCS.wen={name:'Old Wen',title:'Sump Market trader',x:340+EDGE,cls:'ronin',look:{sex:0,build:1,face:5,hair:5,hairC:6,beard:4,skin:1,eye:0,outfit:1},eq:{head:'sumprat',chest:'w_start'},
  lines:['Lost my stall in the Gatefall. Found a better one down here. Nobody taxes a drain.','Forty families in the Sump. More every month.','Buy something or tell me news from above. Either is currency.']};
BARKS.corra=['Mind the vents.','Valves before vanity.','Drains do not wait.'];BARKS.wen=['Fresh from upstairs!','Fair prices, dry goods.','News is currency.'];
Object.assign(LORE,{
  unA:{z:'under',x:600,k:'note',t:'Maintenance Card',txt:'“Valve Gallery: three mains feed the upper wards. If they seize, the Hollow Square floods first, then the Workyard. Turn clockwise. Pray.” The card is signed by six different keepers. The last name is Corra.'},
  unB:{z:'under',x:1300,k:'note',t:'Charter Memo',txt:'“Underworks repair deferred until after the bridge. The residents below are not on the census and are therefore not a priority.” Someone has written “WE ARE HERE” across it in tar.'},
  unC:{z:'cistern',x:160,k:'book',t:'Waterworks Register',txt:'“Year of the Gate: a pale crocodile reported in the Great Cistern. Thought to be an escaped menagerie animal. Fed by sump scraps. Named Old Pale by the children. Do not let the children name it.”'}});
Object.assign(QUESTS,{
  uw1:{title:'Pressure in the Pipes',giver:'corra',lv:4,
    offer:'Three main valves in the Valve Gallery are seizing up. If they go, the Hollow Square floods by morning. I cannot be in three places. Find the wheels and turn them. Watch the steam vents by the far end.',
    desc:'Turn the three main valves in the Valve Gallery.',goal:{t:'event',id:'valve',n:3,lab:'Valves turned'},where:'CrestHollow Underworks, the Valve Gallery',
    prog:'Look for the big iron wheels along the gallery.',done:'I heard the pipes sing all the way from here. The Square stays dry another season. Thank you.',reward:{exp:500,sh:40}},
  uw2:{title:'The Folk Below',giver:'corra',pre:'uw1',
    offer:'People live down here. Forty families, more since the Gatefall. Old Wen at the Sump Market speaks for most of them. Go and listen to him. Nobody from above ever does.',
    desc:'Talk to Old Wen at the Sump Market.',goal:{t:'talk',npc:'wen'},where:'Sump Market, just inside the Underworks',
    prog:'Old Wen, at the market stalls.',done:'He says you listened. That is rarer than coin down here.',reward:{exp:300,sh:25,pots:2}},
  uw3:{title:'Old Pale',giver:'corra',pre:'uw2',lv:6,
    offer:'Something big is eating the sump scraps in the Great Cistern, and lately it has started on the people who bring them. The children named it Old Pale. I would rather you moved it on, but it will not be moved.',
    desc:'Deal with Old Pale in the Great Cistern.',goal:{t:'kill',mob:'oldpale',n:1,lab:'Old Pale dealt with'},where:'The Great Cistern, past the Cistern Gate',
    prog:'Through the Cistern Gate at the far end.',done:'The Cistern is quiet. The children will be sad. Their parents will not.',reward:{exp:1200,sh:90,sp:1}},
  uw4:{title:'Who Speaks for the Sump',giver:'corra',pre:'uw3',
    offer:'The Charter will hear about Old Pale and the valves. They will send clerks. Clerks mean a census, repairs, maybe rules. Wen wants to stay hidden. I want the pipes fixed. You have seen both sides. What do we tell them?',
    desc:'Decide how the Underworks meets the Charter.',goal:{t:'talk',npc:'corra'},where:'Waterwarden Corra, at the Sump Market',
    prog:'Tell Corra what you think.',done:'Then that is what we tell them. Down here, a promise is kept or it is not. Yours was kept.',
    choices:[{n:'Petition the Charter for repairs',d:'The Underworks goes on the census and the mains get fixed properly. Unlocks Waterwarden’s Kit.',flag:'sump_census',reward:{exp:700,fl:{wardenkit:1}}},
      {n:'Keep the Sump hidden',d:'The folk below stay off the books and look after their own. Old Wen remembers it.',flag:'sump_hidden',reward:{sh:160,item:['oldpale','charm',2]}},
      {n:'Open the Sump Market to the city',d:'Trade flows both ways. More traffic, more trouble, more coin.',flag:'sump_market',reward:{sh:280}}],reward:{exp:600}}});
RECIPES.push({id:'wardenkit',d:'alchemy',r:1,n:'Waterwarden’s Kit ×3',use:'pots3',flag:'wardenkit',need:{herb:2,hide:1},desc:'Corra’s field kit: three tonics from one bundle.'});
/* valves, vents */
function valveNear(){if(Z.id!=='under'||!Z.valves)return null;for(let i=0;i<Z.valves.length;i++)if(Math.abs(pl.x-Z.valves[i])<16)return{k:'valve',i};return null}
function valveTurned(i){return!!((pl.flags.valves||0)&(1<<i))}
const _cnu=crNear;crNear=function(){return valveNear()||_cnu()};
const _cuu=crUse;crUse=function(n){if(n&&n.k==='valve'){if(valveTurned(n.i)){banner('Already turned','That main is flowing');return}pl.flags.valves=(pl.flags.valves||0)|(1<<n.i);S.valveSpin={i:n.i,t:0};tone(150,.4,'square',.04,-40);setTimeout(()=>tone(220,.3,'triangle',.04),250);
  const st=qSt('uw1');if(st&&st.s==='a'){st.n=[0,1,2].filter(valveTurned).length;qProgress('uw1','Valve')}save();return}return _cuu(n)};
const _clu=crLabel;crLabel=function(n){if(n&&n.k==='valve')return valveTurned(n.i)?'Valve · flowing':'Turn · Main valve';return _clu(n)};
function underTick(dt){if(!Z.vents){S.vent=null;return}S.vent=S.vent||{t:0};S.vent.t+=dt;const cyc=4,ph=S.vent.t%cyc;
  for(const vx of Z.vents){if(ph>2.6&&ph<3.4){if(Math.random()<dt*40)S.parts.push({x:vx+rnd(-8,8),y:topAt(vx)-6,vx:rnd(-12,12),vy:rnd(-160,-90),t:0,life:.7,c:'rgba(220,226,230,.8)',g:-30,s:2});
      if(Math.abs(pl.x-vx)<12&&pl.y>topAt(vx)-60&&!S.ventHit){S.ventHit=1;hurtPl(Math.round(pl.mhp*.1),vx);pl.vy=-260}}
    else if(ph>1.8&&ph<2.6&&Math.random()<dt*8)S.parts.push({x:vx+rnd(-6,6),y:topAt(vx)-6,vx:0,vy:-30,t:0,life:.4,c:'rgba(200,206,210,.5)',g:0,s:1})}
  if(ph<2.6)S.ventHit=0;if(S.valveSpin){S.valveSpin.t+=dt;if(S.valveSpin.t>1.2)S.valveSpin=null}
  if(Z.id==='cistern')for(const m of S.mobs){if(m.t!=='oldpale'||m.dead)continue;if(!m.ph2&&m.hp<m.mhp*.5){m.ph2=1;banner('Old Pale','It slides into the deep water');m.dive=2.2}
    if(m.dive>0){m.dive-=dt;if(m.dive<=0){m.x=clamp(pl.x+(Math.random()<.5?-70:70),Z.x0+40,Z.x1-40);m.aggro=9;S.shake=Math.max(S.shake||0,.3);for(let i=0;i<16;i++)S.parts.push({x:m.x,y:m.y-6,vx:rnd(-90,90),vy:rnd(-160,-40),t:0,life:.8,c:'#6a9a90',g:300,s:1})}}
    else if(m.ph2){m.diveT=(m.diveT??7)-dt;if(m.diveT<=0){m.diveT=7;m.dive=1.6}}}}
function drawUnder(cx,cy){if(Z.id!=='under')return;for(let i=0;i<Z.valves.length;i++){const X=Z.valves[i],x=ri(X-cx),y=ri(topAt(X)-cy);if(x<-20||x>W+20)continue;const on=valveTurned(i),spin=S.valveSpin&&S.valveSpin.i===i?S.valveSpin.t*8:0;
    g.fillStyle='#000';g.fillRect(x-2,y-24,5,24);g.fillStyle='#4a4048';g.fillRect(x-1,y-24,3,24);
    for(let k=0;k<10;k++){const a=k/10*Math.PI*2+spin+(on?.3:0);g.fillStyle=on?'#8ab0a0':'#a84a3a';g.fillRect(x+ri(Math.cos(a)*7),y-30+ri(Math.sin(a)*7),2,2)}
    for(let k=0;k<4;k++){const a=k/4*Math.PI*2+spin+(on?.3:0);for(let r=1;r<7;r+=2){g.fillStyle='#6a6070';g.fillRect(x+ri(Math.cos(a)*r),y-30+ri(Math.sin(a)*r),1,1)}}
    g.fillStyle='#c8a050';g.fillRect(x-1,y-31,3,3);if(!on&&qSt('uw1')&&qSt('uw1').s==='a')ptext('!',x,y-44+Math.sin(S.t*5)*2,'#ffd27a')}}
/* while Old Pale is under the water it can't be hit, can't hit you, and only shows as a ripple */
const _hmu=hitMob;hitMob=function(m,...a){if(m&&m.dive>0)return;return _hmu(m,...a)};
const _hpu=hurtPl;hurtPl=function(d,x,m,...a){if(m&&m.dive>0)return;return _hpu(d,x,m,...a)};
const _dmu=drawMob;drawMob=function(m,cx,cy){if(m.dive>0){const x=ri(m.x-cx),y=ri(m.y-cy);g.fillStyle='rgba(180,220,210,.5)';const w=ri(10+Math.sin(S.t*6)*4);g.fillRect(x-w,y-2,w*2,1);g.fillRect(x-w/2,y-4,w,1);return}return _dmu(m,cx,cy)};
