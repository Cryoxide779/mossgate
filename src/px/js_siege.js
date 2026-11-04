/* ---------- Old Watchtower Siege (Bible 22.25: large-scale roles, defense, rescue, supply, rebuilding) ---------- */
THEMES.siege={...THEMES.heath,fog:'rgba(110,70,50,.18)',ray:'255,180,120',rayA:1,amb:'ember',vig:'10,4,2'};
WX.siege=['clear','clear','rain'];
Object.assign(MOBS,{
  breaker:{name:'Freeband Breaker',kind:'gob',ai:'lunger',hp:200,atk:22,exp:46,w:12,h:18,spd:30,shard:[7,13],aggro:140},
  sapper:{name:'Freeband Sapper',kind:'gob',ai:'lunger',hp:90,atk:30,exp:40,w:12,h:18,spd:52,shard:[6,11],aggro:0},
  warhound:{name:'Warhound',kind:'quad',ai:'lunger',hp:150,atk:20,exp:40,w:22,h:14,spd:50,shard:[6,11],aggro:150},
  gorrak:{name:'Warchief Gorrak',kind:'gen',ai:'lunger',elite:1,bb:1,hp:2400,atk:34,exp:1300,w:22,h:46,spd:24,shard:[70,110],aggro:220,resp:120}});
Object.assign(GEAR,{
  breaker:{set:'Freeband Breaker',drop:.13,pal:['#5a3a2a','#3a2418','#7a5038','#c8a050','#b23a2e'],head:{n:'Breaker Helm',s:'visor'},chest:{n:'Studded Jack',s:'leather'},hands:{n:'Ram Gloves'},feet:{n:'Stomp Boots'},
    charm:{n:'Freeband Token',s:'sigil'},weap:{katana:'Breaker Blade',daggers:'Shank Pair',bow:'Raider Bow',staff:'Ram Pole',tome:'Siege Orders',axe:'Gatebreaker Axe',hammer:'Battering Maul',spear:'Pike',shield:'Breaker Shield'}},
  sapper:{set:'Freeband Sapper',drop:.13,pal:['#4a4038','#2a221c','#6a5a4a','#e0a040','#b23a2e'],head:{n:'Sapper’s Cap',s:'goggles'},chest:{n:'Powder Vest',s:'leather'},hands:{n:'Singed Gloves'},feet:{n:'Running Boots'},
    charm:{n:'Short Fuse',s:'lamp'},weap:{katana:'Sapper’s Blade',daggers:'Fuse Knives',bow:'Firepot Bow',staff:'Fuse Staff',tome:'Mining Charts',axe:'Sapper Axe',hammer:'Charge Hammer',spear:'Fuse Pike',shield:'Powder Keg Lid'}},
  warhound:{set:'Warhound',drop:.13,pal:['#3a2e26','#1e1814','#5a4a3e','#b23a2e','#c8a050'],head:{n:'Warhound Cowl',s:'pelt'},chest:{n:'Spiked Barding',s:'plate'},hands:{n:'Chain Grips'},feet:{n:'Hound Greaves'},
    charm:{n:'War Collar',s:'fang'},weap:{katana:'Warfang Blade',daggers:'Hound Knives',bow:'Pack Bow',staff:'Kennel Staff',tome:'Pack Roster',axe:'Hound Axe',hammer:'Chain Maul',spear:'Hound Pike',shield:'Barding Shield'}},
  gorrak:{set:'Warchief Gorrak',drop:1,drops:2,pal:['#4a5a2a','#2a3418','#6a7a3a','#b23a2e','#c8a050'],head:{n:'Gorrak’s Horned Helm',s:'horns'},chest:{n:'Warchief’s Hauberk',s:'plate'},hands:{n:'Skullcrusher Gauntlets'},feet:{n:'Siegewalker Boots'},
    charm:{n:'Warchief’s Tusk',s:'fang'},weap:{katana:'Gorrak’s Cleaver',daggers:'Tusk Knives',bow:'Warbow of Gorrak',staff:'War Totem',tome:'Book of Grudges',axe:'Headsman Axe',hammer:'Gatecrusher',spear:'Warchief’s Pike',shield:'Tower Shield'}}});
for(const k of['breaker','sapper','warhound','gorrak']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
GOB_S.breaker={sk:'#8a8a4a',skd:'#5a6a32',c:['#5a3a2a','#3a2418','#7a5038'],hat:'goggles',wp:'wrench'};
GOB_S.sapper={sk:'#9a9a5a',skd:'#6a7040',c:['#4a4038','#2a221c','#6a5a4a'],hat:'kerchief',wp:'none'};
QUAD.warhound={...QUAD.wolf,c:['#1e1814','#3a2e26','#5a4a3e','#7a6656','#ff4a3a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let x=Math.floor(o.cx-o.L/2+3);x<o.cx+o.L/2-3;x+=3){P(x,top-1,'#8a9aa2');P(x,top,'#4a5058')}const hx=Math.round(o.cx+o.L/2-3);for(let y=-3;y<=2;y++)P(hx,o.cy+y,'#b23a2e')}};
const GORRAK={h:44,tw:8,lw:4,leg:['#2a3418','#3a4420'],boot:'#1a1410',body:['#3a2418','#5a3a2a','#7a5038'],skin:['#3a4a22','#5a6a32','#7a8a4a'],eye:'#ffd27a',
  hat:(P,Rc,hx,hy)=>{Rc(hx-4,hy-2,9,3,'#6a6070');Rc(hx-4,hy-2,9,1,'#a8a0b0');for(const s of[-1,1])for(let i=0;i<6;i++)P(hx+s*(4+Math.floor(i/2)),hy-2-i,'#e8dcc0')},
  hand:(P,Rc,x,y,mode)=>{Rc(x,y-10,2,12,'#4a3a2a');for(let i=0;i<8;i++)Rc(x+1,y-12+i,6-Math.abs(i-4)/2,1,i<2?'#e8eef2':'#a8b0b8');if(mode==='lunge')for(let i=0;i<6;i++)P(x+8+i,y-6+i,'#ffd27a')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let i=-6;i<=6;i+=3)P(x+i,hy+12+b,'#c8a050');for(let i=0;i<3;i++)P(x-9-i,hy+10+i*3+b,'#e8dcc0')}};
const _brs=buildRoster;buildRoster=function(){_brs();const o={kind:'gen',ax:22,ay:52,fps:3},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=humanoid(48,54,22,GORRAK,md);F[md]=humanoid(48,54,22,GORRAK,md,1)}o.F=F;MSP.gorrak=o};
/* props */
Object.assign(PROPS,{
  gatewall(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let k=-30;k<=30;k+=5)for(let y=0;y<60;y++){if(Math.abs(k)<12&&y<44){P(X+k,Y-y,y%8===0?W[1]:pick(W,.45,X+k,y));P(X+k+1,Y-y,pick(W,.32,X+k,y));if(k===-2||k===3)P(X+k+(k<0?2:-1),Y-y,W[0]);continue}P(X+k,Y-y,pick(W,.6-(k%10?0:.1),X+k,y));P(X+k+1,Y-y,pick(W,.4,X+k,y));if(y===59){P(X+k,Y-y-1,W[5]);P(X+k+1,Y-y-2,W[4])}}
    for(let k=-12;k<=12;k++)for(let y=44;y<50;y++)P(X+k,Y-y,W[1]);for(const k of[-30,30])for(let y=60;y<80;y++){P(X+k,Y-y,W[2]);P(X+k+1,Y-y,W[3])}for(let k=-32;k<=32;k++)P(X+k,Y-78,W[5])},
  depot(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const[ox,oy]of[[-16,0],[-2,0],[12,0],[-9,12],[5,12]])for(let y=0;y<12;y++)for(let k=0;k<13;k++){const e=k===0||k===12||y===0||y===11;P(X+ox+k,Y-oy-y,e?W[1]:(k===6||y===6)?W[2]:pick(W,.6,X+ox+k,y))}},
  siegetent(x,X,Y){const P=px3(x);for(let y=0;y<30;y++){const w=Math.round(26-y*.8);for(let k=-w;k<=w;k++)P(X+k,Y-y,(k+y)%9===0?[90,30,24]:y>24?[120,40,30]:[150,52,40])}for(let y=30;y<40;y++)P(X,Y-y,[60,40,30]);for(let i=0;i<6;i++)P(X+1+i,Y-39+(i>>1),[178,58,46])}});
/* zones */
const TWI=zIdx('tower'),SGI=ZONES.length;
{const Sg={id:'siege',name:'Watchtower Siege',ch:'Ashveil Reach',theme:'siege',lv:[6,7],req:5,ww:1700,start:70,
  seg:[[0,1700,250],[260,90,214,'plank'],[520,90,206,'plank'],[1180,90,210,'f'],[1420,90,200,'f']],
  mobs:[],portals:[{x:22,to:TWI,tx:1180}],labels:[[160,'Supply Depot',50],[880,'The Palisade Gate',96],[1500,'Freeband Siege Camp',60]],npcs:['vell'],
  props:[['depot',160],['banner',300],['watchtower',420],['banner',560],['gatewall',880],['siegetent',1280],['fire',1380],['siegetent',1520],['cart',1620]],trees:[],gateX:880,depotX:160};
 prepZone(Sg);Sg.nodes=[];Sg.stations=[];Sg.gateX+=EDGE;Sg.depotX+=EDGE;ZONES.push(Sg);
 const Tw=ZONES[TWI];Tw.portals.push({x:1180+EDGE,to:SGI,tx:70+EDGE});(Tw.labels=Tw.labels||[]).push([1180+EDGE,'The Siege Line',78])}
MAPXY.siege=[24,40];
NPCS.vell={name:'Sergeant Vell',title:'Charter Militia, Old Watchtower',x:240+EDGE,cls:'ronin',look:{sex:0,build:2,face:4,hair:3,hairC:2,beard:3,skin:3,eye:0,outfit:3},eq:{head:'warden',chest:'warden',feet:'warden'},
  lines:['Twelve militia, one gate, and a Freeband warchief who wants this tower for his own toll road.','Every soldier has a job in a siege. Even the cook. Especially the cook.','The tower stood through the Gatefall. It is not falling to bandits.']};
BARKS.vell=['Hold the line!','Crates to the gate!','Eyes on the camp.'];
Object.assign(LORE,{
  sgA:{z:'siege',x:350,k:'note',t:'Duty Roster',txt:'“Gate: Pell, Ostra, Kip. Supply: Marn and whoever is free. Wall: everyone else. Cook: Vell, apparently. Morale: also Vell.”'},
  sgB:{z:'siege',x:1460,k:'book',t:'Gorrak’s Tally',txt:'“Tower takes the north road. North road takes the toll. Toll pays the band. Charter men in the tower: twelve. Freeband: plenty. Sappers first, then the hounds, then me.”'}});
Object.assign(QUESTS,{
  sg1:{title:'Hold the Gate',giver:'vell',lv:5,
    offer:'Gorrak’s Freeband are camped below the wall. They will come in waves: breakers, hounds, and sappers carrying powder for my gate. Keep the gate standing. If it takes damage, haul supply crates from the depot to patch it. And if you see any of my people down outside the wall, get them back in.',
    desc:'Defend the palisade gate through three waves.',goal:{t:'event',id:'siege',n:1,lab:'Siege waves held'},where:'Watchtower Siege, past the Old Watchtower',
    prog:'Talk to Sergeant Vell when you are ready, then hold the gate.',done:'Three waves and the gate still stands. Gorrak will come himself now.',reward:{exp:1200,sh:90}},
  sg2:{title:'Gorrak',giver:'vell',pre:'sg1',lv:7,
    offer:'His waves are broken. Gorrak is in his camp licking his pride. Go down there and end the siege.',
    desc:'Defeat Warchief Gorrak in the Freeband siege camp.',goal:{t:'kill',mob:'gorrak',n:1,lab:'Warchief Gorrak defeated'},where:'The Freeband Siege Camp, beyond the gate',
    prog:'Out through the gate, into the camp.',done:'The Freeband are scattering down the north road. The siege is over. Now we rebuild.',reward:{exp:1500,sh:120,sp:1}},
  sg3:{title:'Raise the Tower',giver:'vell',pre:'sg2',
    offer:'The tower survived, but the walls are kindling and the stores are empty. Bring me twelve timber and we will put her back together. The militia will owe you more than they can say.',
    desc:'Gather 12 Timber to rebuild the watchtower’s defences.',goal:{t:'gather',res:'timber',n:12},where:'Whisper Woods, Fallen Oak Grove, the Sawmill',
    prog:'Twelve timber for the rebuild.',done:'',reward:{exp:900,sh:60},
    choices:[{n:'Rebuild the walls first',d:'Stronger walls; the militia hold the north road for good.',flag:'tower_walls',reward:{exp:600}},
      {n:'Build a beacon fire',d:'A signal beacon that links to the waystone network. Opens a waystone here.',flag:'tower_beacon',reward:{fl:{siegeway:1}}},
      {n:'Restock the armoury',d:'The militia share their kit with you.',flag:'tower_armoury',reward:{item:['gorrak','charm',2]}}]}});
QUESTS.sg3.done='Then that is how we raise her. The Old Watchtower will stand another hundred years.';
const _qfs=questFlag;questFlag=function(fl){_qfs(fl);if(fl.siegeway){WAYS.siege=330;banner('A beacon burns on the tower','The waystone at the Siege Line is lit');save()}};
setTimeout(()=>{if(pl.flags&&pl.flags.siegeway)WAYS.siege=330},0);
/* the siege itself */
const SG_W=[['breaker','breaker','warhound','sapper'],['breaker','warhound','sapper','breaker','sapper'],['warhound','breaker','sapper','breaker','warhound','sapper']];
function startSiege(){if(S.siege)return;S.siege={wave:-1,t:2,gate:100,rescue:[],carry:0};banner('To the walls!','Hold the palisade gate');tone(98,1,'sawtooth',.05,40)}
function siegeTick(dt){const D=S.siege;if(!D)return;if(Z.id!=='siege'||pl.dead){S.siege=null;S.mobs=S.mobs.filter(m=>!m.sg);S.carry=0;banner('The siege goes on','Talk to Sergeant Vell to try again');return}
  const G=Z.gateX;for(const m of S.mobs){if(!m.sg||m.dead)continue;if(m.t==='sapper'){m.stun=1e9;m.face=-1;m.x-=MOBS.sapper.spd*dt;m.y=topAt(m.x);
      if(Math.abs(m.x-pl.x)<16&&Math.abs(m.y-pl.y)<20){blast(m);hurtPl(m.atk*lvHurt(m),m.x,m)}else if(m.x<=G+14){blast(m);D.gate-=18;S.shake=Math.max(S.shake||0,.4);if(D.gate<=0)return siegeLost()}}
    else if(m.x<G+20&&Math.abs(pl.x-m.x)>60){m.x=G+20;D.gateT=(D.gateT||0)+dt;if(D.gateT>1.2){D.gateT=0;D.gate-=4;if(D.gate<=0)return siegeLost()}}}
  for(const r of D.rescue){if(r.saved&&!r.gone){r.x-=60*dt;if(r.x<G-40)r.gone=1}}
  const alive=S.mobs.filter(m=>m.sg&&!m.dead).length;if(D.wave>=0&&alive)return;D.t-=dt;if(D.t>0)return;
  D.wave++;if(D.wave>=SG_W.length){S.siege=null;S.mobs=S.mobs.filter(m=>!m.sg);qEvent('siege');pl.flags.siegeheld=1;banner('The gate holds','Report to Sergeant Vell');save();return}
  D.t=4;banner('Wave '+(D.wave+1)+' of '+SG_W.length,'Freeband at the wall');if(D.wave===1)for(const off of[120,260])D.rescue.push({x:G+off,saved:0,gone:0});
  SG_W[D.wave].forEach((t,i)=>{const x=G+300+i*36,m=spawnMob([t,0,x],Z.lv[1]);m.x=x;m.y=topAt(x);m.sg=1;m.temp=1;m.aggro=t==='sapper'?0:99;S.mobs.push(m)})}
function blast(m){m.dead=1;m.resp=99999;for(let i=0;i<22;i++)S.parts.push({x:m.x,y:m.y-8,vx:rnd(-110,110),vy:rnd(-170,-40),t:0,life:.7,c:i%3?'#ffb04a':'#5a4a3a',g:300,s:i%4?1:2});tone(60,.4,'sawtooth',.08,-20)}
function siegeLost(){S.siege=null;S.mobs=S.mobs.filter(m=>!m.sg);S.carry=0;banner('The gate is breached','Fall back! Talk to Sergeant Vell to try again');tone(80,1,'sawtooth',.06,-40)}
function siegeNear(){if(Z.id!=='siege')return null;const D=S.siege;
  if(D){for(const r of D.rescue)if(!r.saved&&Math.abs(pl.x-r.x)<16)return{k:'sgres',r};if(!S.carry&&Math.abs(pl.x-Z.depotX)<26)return{k:'sgcrate'};if(S.carry&&Math.abs(pl.x-Z.gateX)<34)return{k:'sgfix'}}
  else if(Math.abs(pl.x-Z.gateX)<20&&!pl.flags.siegeheld){const st=qSt('sg1');if(st&&st.s==='a')return{k:'sgstart'}}return null}
const SGK=['sgres','sgcrate','sgfix','sgstart'];
const _cns=crNear;crNear=function(){return siegeNear()||_cns()};
const _cus=crUse;crUse=function(n){if(n&&SGK.includes(n.k)){const D=S.siege;
  if(n.k==='sgstart')return startSiege();
  if(n.k==='sgres'){n.r.saved=1;sfx.pick();banner('Militia saved','A wounded soldier limps back inside the wall');D.saved=(D.saved||0)+1;return}
  if(n.k==='sgcrate'){S.carry=1;sfx.pick();return}
  if(n.k==='sgfix'){S.carry=0;D.gate=Math.min(100,D.gate+25);tone(330,.15,'square',.04);S.nums.push({x:Z.gateX,y:topAt(Z.gateX)-60,txt:'+25 GATE',t:0,c:'#9bd04c'});return}}return _cus(n)};
const _cls=crLabel;crLabel=function(n){if(n&&SGK.includes(n.k))return n.k==='sgstart'?'Begin · Hold the gate':n.k==='sgres'?'Help up · Wounded militia':n.k==='sgcrate'?'Lift · Supply crate':'Repair · Gate (+25)';return _cls(n)};
function drawSiege(cx,cy){if(Z.id!=='siege')return;const D=S.siege,G=Z.gateX;
  if(D&&!(+$('zone').style.opacity>.05)){const gh=D.gate;ptext('HOLD THE GATE · WAVE '+Math.max(1,D.wave+1)+'/'+SG_W.length,W/2,58,'#ffd27a');const bw=80;g.fillStyle='#000';g.fillRect(ri(W/2-bw/2)-1,63,bw+2,5);g.fillStyle=gh>50?'#9bd04c':gh>25?'#e0a040':'#d4483a';g.fillRect(ri(W/2-bw/2),64,ri(bw*gh/100),3);
  }if(D){for(const r of D.rescue){if(r.gone)continue;const x=ri(r.x-cx),y=ri(topAt(r.x)-cy);g.fillStyle='#000';g.fillRect(x-4,y-(r.saved?17:8),9,r.saved?17:8);g.fillStyle='#6a7a8a';g.fillRect(x-3,y-(r.saved?12:7),7,r.saved?8:5);g.fillStyle='#d8b890';g.fillRect(r.saved?x-2:x+3,y-(r.saved?16:7),4,4);if(!r.saved)ptext('HELP!',x,y-18+Math.sin(S.t*5)*2,'#ff8a7a')}}
  if(S.carry){const x=ri(pl.x-cx),y=ri(pl.y-cy)-34;g.fillStyle='#000';g.fillRect(x-6,y-1,13,10);g.fillStyle='#8a5634';g.fillRect(x-5,y,11,8);g.fillStyle='#56331e';g.fillRect(x-5,y+3,11,1);g.fillRect(x,y,1,8)}
  if(pl.flags.siegeheld){const x=ri(Z.x0+420-cx),y=ri(topAt(Z.x0+420)-cy);for(let i=0;i<3;i++){g.fillStyle=i%2?'#ffd27a':'#ff8a3a';g.fillRect(x-1+i,y-92-ri(Math.abs(Math.sin(S.t*8+i))*5),2,4)}}}
/* Gorrak only appears once the waves are broken */
const _pzs=crPopulate;crPopulate=function(...a){const r=_pzs(...a);if(Z.id==='siege'&&pl.flags.siegeheld&&!S.mobs.some(m=>m.t==='gorrak')){for(const[t,x]of[['gorrak',1460],['breaker',1340],['warhound',1580]]){const m=spawnMob([t,0,x+EDGE],t==='gorrak'?8:7);m.x=x+EDGE;m.y=topAt(m.x);S.mobs.push(m)}}return r};
