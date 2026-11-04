/* ---------- Stonebridge Quarry Fortress (Bible 22.25: vertical combat, machinery, freight, labor conflict) ---------- */
THEMES.quarry={ramps:{far:R(['#2a2224','#3e3030','#58423a','#765844','#987250','#ba9260','#dcb878']),
    cliff:R(['#3e3230','#4c3e38','#5a4a40','#6a584a','#7a6654','#8a765e','#9c876a']),
    rock:R(['#16130f','#241f19','#352d24','#483e31','#5e5140','#776851','#928266']),rockW:R(['#1a140e','#2a2016','#3c2e20','#52402c','#6a5438','#846a46','#a08456']),
    grass:R(['#3a3420','#4c4428','#625830','#7a6e3a','#968846','#b4a456']),moss:R(['#2e2a1a','#3c3620','#4e4628','#625830','#786c3a','#908246']),
    leaf:R(['#1a1a10','#26261a','#343422','#44442c','#565636','#6a6a40','#80804c','#989858'])},
  mid:'cliff',top:[150,60],canopy:'none',fog:'rgba(150,110,60,.18)',fog2:'rgba(140,110,60,.08)',ray:'255,220,150',rayA:1.2,amb:'mote',vig:'10,6,2',glow:.6,noFern:1};
THEMES.qfort={...THEMES.quarry,ramps:{...THEMES.quarry.ramps,far:R(['#1a1418','#2a2024','#3e2c2c','#583a32','#764c38','#9a643e','#c08048'])},fog:'rgba(90,50,30,.2)',ray:'255,170,100',vig:'12,4,0'};
WX.quarry=['clear','clear','clear'];WX.qfort=['clear','clear'];
Object.assign(MOBS,{
  blaster:{name:'Freeband Blaster',kind:'gob',ai:'ranged',hp:240,atk:30,exp:70,w:12,h:18,spd:32,shard:[10,18],aggro:170},
  gravelmite:{name:'Gravel Mite',kind:'quad',ai:'lunger',hp:320,atk:30,exp:72,w:24,h:12,spd:30,shard:[10,18],aggro:110},
  drillback:{name:'Drillback',kind:'quad',ai:'lunger',hp:420,atk:36,exp:90,w:30,h:18,spd:22,shard:[14,24],aggro:120},
  crusher:{name:'The Crusher',kind:'gen',ai:'lunger',elite:1,bb:1,hp:5200,atk:48,exp:2400,w:40,h:56,spd:18,shard:[120,180],aggro:220,resp:120}});
Object.assign(GEAR,{
  blaster:{set:'Freeband Blaster',drop:.13,pal:['#4a4a52','#2a2a32','#6a6a74','#e0a040','#b23a2e'],head:{n:'Blast Goggles',s:'goggles'},chest:{n:'Powder Coat',s:'leather'},hands:{n:'Fuse Gloves'},feet:{n:'Scree Boots'},
    charm:{n:'Spent Fuse',s:'lamp'},weap:{katana:'Blasting Blade',daggers:'Fuse Knives',bow:'Charge Bow',staff:'Tamping Rod',tome:'Powder Ledger',axe:'Demolition Axe',hammer:'Breaker Maul',spear:'Pry Lance',shield:'Blast Shield'}},
  gravelmite:{set:'Gravel Mite',drop:.13,pal:['#6a5a44','#3a3226','#8a7a5e','#c8a050','#2a2420'],head:{n:'Carapace Helm',s:'visor'},chest:{n:'Plated Shell',s:'plate'},hands:{n:'Mandible Grips'},feet:{n:'Scuttle Boots'},
    charm:{n:'Gravel Pearl',s:'scale'},weap:{katana:'Mandible Blade',daggers:'Pincer Pair',bow:'Chitin Bow',staff:'Burrower Staff',tome:'Stratum Notes',axe:'Shell Splitter',hammer:'Gravel Maul',spear:'Mandible Pike',shield:'Carapace Shield'}},
  drillback:{set:'Drillback',drop:.13,pal:['#5a4e46','#2e2824','#8a7a6a','#e0a040','#a8b0b8'],head:{n:'Drill-Crown Helm',s:'horns'},chest:{n:'Riveted Harness',s:'plate'},hands:{n:'Bit Gauntlets'},feet:{n:'Treadplate Boots'},
    charm:{n:'Worn Drill Bit',s:'cog'},weap:{katana:'Auger Blade',daggers:'Bit Pair',bow:'Gearspring Bow',staff:'Drive Staff',tome:'Machine Manual',axe:'Rotary Axe',hammer:'Piston Hammer',spear:'Auger Lance',shield:'Riveted Shield'}},
  crusher:{set:'The Crusher',drop:1,drops:2,pal:['#4a4048','#22202a','#7a6e74','#ff8a3a','#c8a050'],head:{n:'Furnace Helm',s:'visor'},chest:{n:'Boilerplate',s:'plate'},hands:{n:'Piston Fists'},feet:{n:'Stamp-Mill Greaves'},
    charm:{n:'Crusher Core',s:'core'},weap:{katana:'Stampcut Blade',daggers:'Rivet Spikes',bow:'Steam Bow',staff:'Furnace Rod',tome:'Company Charter',axe:'Ore Cleaver',hammer:'The Stamp',spear:'Piston Lance',shield:'Boiler Door'}}});
for(const k of['blaster','gravelmite','drillback','crusher']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
GOB_S.blaster={sk:'#9a8a6a',skd:'#6a5e44',c:['#4a4a52','#2a2a32','#6a6a74'],hat:'goggles',wp:'wrench'};
QUAD.gravelmite={cw:40,ch:22,cx:18,len:22,bh:9,leg:3,lw:2,c:['#2a2420','#6a5a44','#8a7a5e','#3a3226','#ffb040'],head:'none',tail:'stub',extra:(P,Rc,o)=>{
  for(let i=0;i<4;i++){const px=Math.round(o.cx-o.L/2+3+i*5);for(let k=0;k<4;k++)P(px+k,Math.floor(o.cy-o.bh/2)-1,k===0?'#3a3226':'#a8987a');for(let y=0;y<o.bh-2;y++)P(px,Math.floor(o.cy-o.bh/2)+y,'#3a3226')}
  const hx=Math.round(o.cx+o.L/2-2),hy=o.cy;Rc(hx,hy-3,5,5,'#5a4a38');Rc(hx,hy-3,5,1,'#8a7a5e');P(hx+3,hy-2,'#ffb040');P(hx+1,hy-2,'#ffb040');
  const op=o.mode==='lunge'?2:0;for(let k=0;k<4;k++){P(hx+5+k,hy-2-op+Math.floor(k/2),'#c8b890');P(hx+5+k,hy+2+op-Math.floor(k/2),'#c8b890')}
  for(const[dx,dy]of[[-7,-1],[2,1],[-2,-2]])P(o.cx+dx,o.cy+dy,'#c8a050')}};
QUAD.drillback={cw:50,ch:30,cx:22,len:26,bh:13,leg:4,lw:3,c:['#1e1a18','#5a4e46','#8a7a6a','#3a322c','#ff8a3a'],head:'none',tail:'stub',extra:(P,Rc,o)=>{
  const top=Math.floor(o.cy-o.bh/2);for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2-2;x+=4){P(x,top+2,'#c8b8a0');P(x,o.cy+o.bh/2-2,'#c8b8a0')}
  Rc(o.cx-6,top-6,6,6,'#3a322c');Rc(o.cx-5,top-5,4,4,'#5a4e46');Rc(o.cx-5,top-9,2,4,'#2a2420');P(o.cx-5,top-10,'#6a6060');
  P(o.cx-3,top-3,'#ff8a3a');P(o.cx-4,top-3,'#ffd27a');
  const hx=Math.round(o.cx+o.L/2-1),hy=o.cy,spin=o.mode==='walk1'?1:0;Rc(hx-1,hy-5,3,10,'#4a4048');
  for(let k=0;k<11;k++){const h=Math.max(0,4-Math.floor(k/2.8));for(let j=-h;j<=h;j++)P(hx+2+k,hy+j,((k+j+spin)%3===0)?'#f2f8fb':(j<0?'#a8b0b8':'#6a7078'))}
  if(o.mode==='lunge')for(let i=0;i<6;i++)P(hx+14+i,hy-3+i,i%2?'#ffd27a':'#c8a050')}};
function crusherFrame(mode,flash){return sprite(70,70,(P,Rc)=>{const g=68,cx=32,b=mode==='walk1'?1:0,sw=mode==='walk0'?2:mode==='walk1'?-2:0,cr=mode==='wind'?3:0,lun=mode==='lunge';
  const ir='#4a4048',ird='#22202a',irl='#7a6e74',irh='#a89ca2',br='#c8a050',brd='#8a6a30',fire='#ff8a3a',fir2='#ffd27a';
  /* legs: pistons */for(const[lx,s]of[[cx-12,sw],[cx+8,-sw]]){Rc(lx+s,44+cr,8,g-44-cr,ird);Rc(lx+1+s,44+cr,6,g-44-cr,ir);Rc(lx+2+s,48+cr,2,g-52-cr,irh);Rc(lx-2+s,g-4,12,4,ird);Rc(lx-1+s,g-4,10,1,irl);for(let y=50;y<g-6;y+=5)Rc(lx+s,y,8,1,br)}
  /* boiler torso */for(let y=16+cr;y<46+cr;y++){const hw=Math.round(15-Math.abs(y-30-cr)*.18);for(let x=cx-hw;x<=cx+hw;x++){let c=x<cx-hw+3?ird:x>cx+hw-3?irl:((x+y)%9===0?irl:ir);P(x,y+b,c)}}
  for(const y of[22,32,42])for(let x=cx-14;x<=cx+14;x++){P(x,y+cr+b,br);if(x%4===0)P(x,y+cr+b-1,brd)}
  /* furnace mouth */for(let y=34;y<41;y++)for(let x=cx-6;x<=cx+6;x++)P(x,y+cr+b,(y===34||Math.abs(x-cx)===6)?ird:(y<37?fir2:fire));for(let x=cx-5;x<=cx+5;x+=2)P(x,36+cr+b,'#2a1a10');
  /* head: riveted helm with one furnace eye */const hy=6+cr+b;Rc(cx-7,hy,15,11,ird);Rc(cx-6,hy+1,13,9,ir);Rc(cx-6,hy+1,13,1,irh);Rc(cx-3,hy+4,7,3,'#1a0e08');Rc(cx-2,hy+5,5,1,mode==='wind'?'#ffffff':fir2);P(cx,hy+5,'#ffffff');for(const x of[cx-6,cx+6])P(x,hy+2,br);
  /* chimney */Rc(cx+9,6+cr+b,5,12,ird);Rc(cx+10,6+cr+b,3,12,ir);Rc(cx+8,4+cr+b,7,2,irl);
  /* piston arms with hammer fists */let L1,L2;if(mode==='wind'){L1=[cx-26,4];L2=[cx+26,2]}else if(lun){L1=[cx-20,42];L2=[cx+30,44]}else{L1=[cx-24,44+sw];L2=[cx+24,44-sw]}
  const arm=(x0,y0,[x1,y1])=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++){const x=Math.round(x0+(x1-x0)*i/n),y=Math.round(y0+(y1-y0)*i/n);Rc(x-2,y-2,5,5,i%6<3?ird:ir);P(x,y-1,irh)}
    Rc(x1-6,y1-5,12,10,ird);Rc(x1-5,y1-4,10,8,irl);Rc(x1-5,y1-4,10,2,irh);for(const dx of[-4,0,4])P(x1+dx,y1+2,br)};
  arm(cx-13,20+cr+b,L1);arm(cx+13,20+cr+b,L2);
  if(lun)for(let i=0;i<10;i++)P(cx+20+i,58+(i%3),i%2?fir2:'#c8b890')},flash)}
const _brq=buildRoster;buildRoster=function(){_brq();const o={kind:'gen',ax:32,ay:68,fps:2},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=crusherFrame(md);F[md]=crusherFrame(md,1)}o.F=F;MSP.crusher=o};
/* props */
Object.assign(PROPS,{
  crane(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<150;y++){for(const k of[-8,8]){P(X+k,Y-y,pick(W,.6,X,y));P(X+k+1,Y-y,W[2])}if(y%14===0)for(let k=-8;k<=9;k++)P(X+k,Y-y,pick(W,.5,X+k,y))}
    for(let k=-60;k<=40;k++){P(X+k,Y-150,W[5]);P(X+k,Y-149,W[3]);P(X+k,Y-148,W[2])}for(let i=0;i<30;i++){P(X-8-i*1.6,Y-118-i,W[3]);P(X+8+i,Y-120-i*.9,W[3])}
    for(let y=148;y>80;y--)P(X-56,Y-y,[60,56,52]);for(let k=-4;k<=4;k++)P(X-56+k,Y-80,[120,110,100]);for(let y=0;y<6;y++)P(X-56+(y<3?3:2-y+3),Y-79+y,[150,140,130]);
    for(let y=0;y<14;y++)for(let k=-9;k<=9;k++)P(X-56+k,Y-62-y,pick(R(['#3a3226','#5a4e3a','#7a6a50','#9a8a68']),.6-(k+9)/50,X+k,y))},
  railcart(x,X,Y){const P=px3(x),I=IRONC;for(let k=-40;k<=40;k++){P(X+k,Y-1,I[2]);if(k%8===0)for(let j=-1;j<=1;j++)P(X+k+j,Y,[90,70,50])}
    for(let y=4;y<16;y++){const w=14-Math.round((16-y)*.2);for(let k=-w;k<=w;k++)P(X+k,Y-y,y===15?I[3]:pick(R(I),.55-(k+w)/(4*w),X+k,y))}for(const k of[-9,8])for(let y=0;y<5;y++)for(let j=-2;j<=2;j++)if(j*j+(y-2)*(y-2)<6)P(X+k+j,Y-y,y===2&&j===0?I[3]:I[0]);
    for(let i=0;i<14;i++){const k=-11+Math.floor(hash(i,1,X)*22),y=16+Math.floor(hash(i,2,X)*4);P(X+k,Y-y,pick(R(['#3a3a40','#6a6a74','#9aa0a8','#c8a050']),hash(i,3,X),k,y))}},
  stoneblocks(x,X,Y){const P=px3(x),S=TH.rock;for(const[ox,oy,w,h]of[[-22,0,20,12],[0,0,22,12],[-12,12,20,11],[10,12,14,10],[-4,23,16,9]])for(let y=0;y<h;y++)for(let k=0;k<w;k++){const e=k===0||y===h-1;P(X+ox+k,Y-oy-y,e?S[1]:pick(S,.62-(k/w)*.25+(y===0?.12:0)+(hash(k,y,ox+X)-.5)*.15,X+ox+k,y))}},
  scaff(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-20,20])for(let y=0;y<90;y++){P(X+k,Y-y,pick(W,.6,X,y));P(X+k+1,Y-y,W[2])}for(const y of[30,60,90])for(let k=-22;k<=22;k++){P(X+k,Y-y,W[5]);P(X+k,Y-y+1,W[2])}
    for(let i=0;i<30;i++){P(X-20+i*1.33,Y-30-i,W[3]);P(X+20-i*1.33,Y-60-i,W[3])}},
  barricade(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let i=0;i<5;i++){const k=-20+i*10;for(let y=0;y<26;y++){const t=y/26;P(X+k+Math.round(t*8),Y-y,pick(W,.6-t*.2,X+k,y));P(X+k+1+Math.round(t*8),Y-y,W[2])}P(X+k+8,Y-26,[220,210,190]);P(X+k+9,Y-27,[240,232,214])}
    for(let k=-24;k<=24;k++){P(X+k,Y-8,W[4]);P(X+k,Y-7,W[2])}for(let y=10;y<22;y++)for(let k=-2;k<=8;k++)P(X+k,Y-y,y<14?[178,58,46]:[140,40,32])}});
/* zones */
const SBI=zIdx('stonebridge'),QI=ZONES.length,QFI=QI+1;
{const Q={id:'quarry',name:'Stonebridge Quarry',ch:'Ashveil Reach',theme:'quarry',lv:[10,11],req:9,ww:1800,start:70,
  seg:[[0,420,250],[420,300,262],[720,360,240],[1080,300,226],[1380,420,250],[470,80,236,'plank'],[600,70,212,'plank'],[760,90,200,'f'],[900,80,176,'f'],[1110,90,190,'plank'],[1250,80,160,'f'],[1440,90,214,'plank'],[1600,80,186,'f']],
  mobs:[['gravelmite',0,320],['blaster',2,820],['raider',2,980],['drillback',3,1200],['blaster',8,1290],['gravelmite',4,1500],['blaster',4,1700],['raider',1,560],['drillback',2,1000]],
  portals:[{x:22,to:SBI,tx:1000},{x:1778,to:QFI,tx:60}],labels:[[150,'Strikers’ Camp',60],[1180,'The Long Face',120]],npcs:['dagna'],
  props:[['fire',110],['tent',200],['crates',260],['barricade',380],['stoneblocks',520],['crane',700],['railcart',880],['scaff',1000],['stoneblocks',1260],['crane',1420],['railcart',1560],['barricade',1700]],trees:[],rockfall:[640,960,1160,1520]};
 const F={id:'qfort',name:'Quarry Fortress',ch:'Ashveil Reach',theme:'qfort',lv:[12,12],req:11,ww:1200,start:60,
  seg:[[0,1200,250],[260,100,204,'plank'],[560,90,186,'f'],[840,100,204,'plank']],mobs:[['crusher',0,900],['blaster',1,300],['blaster',3,880]],
  portals:[{x:22,to:QI,tx:1730}],labels:[[600,'The Stamp Floor',110]],props:[['barricade',140],['stoneblocks',420],['crane',620],['railcart',760],['scaff',1060]],trees:[],rockfall:[480,760]};
 prepZone(Q);prepZone(F);for(const z of[Q,F]){z.nodes=[];z.stations=[];z.rockfall=z.rockfall.map(x=>x+EDGE)}ZONES.push(Q,F);
 const SB=ZONES[SBI];SB.portals.push({x:990+EDGE,to:QI,tx:70+EDGE});(SB.labels=SB.labels||[]).push([990+EDGE,'Quarry Road',78])}
MAPXY.quarry=[27,90];MAPXY.qfort=[17,96];WAYS.quarry=110;
NPCS.dagna={name:'Foreman Dagna',title:'Quarry strike leader',x:150+EDGE,cls:'ronin',look:{sex:1,build:2,face:3,hair:4,hairC:2,beard:0,skin:4,eye:0,outfit:2},eq:{head:'gob',chest:'r_start',hands:'gob'},
  lines:['The Road Company cut wages to rebuild the bridge. We put our picks down. Then the Freeband walked in and picked them up.','Forty years I have cut that face. I will not watch bandits run my crane.','Stone does not care who owns it. People do.']};
BARKS.dagna=['Picks down, heads up.','Mind the overhang.','No scabs, no bandits.'];
Object.assign(LORE,{
  qrA:{z:'quarry',x:300,k:'note',t:'Strike Notice',txt:'“By vote of the cutters: no stone leaves this quarry until the Road Company restores the old wage. The bridge was built by our hands. It can wait for our pay.” Forty-one marks beneath it.'},
  qrB:{z:'quarry',x:1300,k:'book',t:'Company Ledger',txt:'“Freeband retained to ‘secure the works’ during the dispute. Fee: one third of all stone moved. Crusher unit leased to them at no charge.” Signed by a Road Company clerk.'},
  qrC:{z:'qfort',x:200,k:'note',t:'Freeband Orders',txt:'“Keep the Crusher fed and pointed at the strikers’ camp. When the cutters break, the Company pays us twice: once to clear them, once to stay.”'}});
Object.assign(QUESTS,{
  qf1:{title:'Picket Lines',giver:'dagna',lv:9,
    offer:'The Freeband took the quarry the day we walked out. They have blasters on the scaffolds and they are cutting stone with our tools. Drive six of them off the lower terraces so my people can breathe.',
    desc:'Drive off six Freeband in Stonebridge Quarry.',goal:{t:'kill',mob:'blaster',alt:['raider'],n:6,zone:'quarry',lab:'Freeband driven off'},where:'Stonebridge Quarry, past the Strikers’ Camp',
    prog:'Blasters and toll-takers on the terraces.',done:'Six. They will be back, but now they know we have friends.',reward:{exp:1200,sh:90}},
  qf2:{title:'Hoist and Haul',giver:'dagna',pre:'qf1',
    offer:'The crane by the Long Face is ours, and the Freeband jammed its winch. I can fix it with iron. Mine me ten ore, and mind the rockfall where the face is loose. Dust first, then stone.',
    desc:'Mine 10 Iron Ore so Dagna can repair the quarry crane.',goal:{t:'gather',res:'ore',n:10},where:'Any ore vein; the Outcrop and the Quarry are rich',
    prog:'Mine ten iron ore from any vein.',done:'Good iron. The crane will lift again, and from the top I can see the fortress. And the thing in it.',reward:{exp:900,sh:60}},
  qf3:{title:'The Crusher',giver:'dagna',pre:'qf2',lv:11,
    offer:'The Company leased the Freeband a stamp-mill engine. They call it the Crusher. It walks. It is meant to break rock, and they are pointing it at us. Go up to the fortress and stop it.',
    desc:'Stop the Crusher in the Quarry Fortress.',goal:{t:'kill',mob:'crusher',n:1,lab:'The Crusher stopped'},where:'Quarry Fortress, at the top of the quarry',
    prog:'Up through the Long Face to the fortress.',done:'The whole camp heard it fall. Some of them are crying. Come back when you can; there is a vote to have.',reward:{exp:2600,sh:180,sp:1}},
  qf4:{title:'Who Cuts the Stone',giver:'dagna',pre:'qf3',
    offer:'The Freeband are gone. The Company wants its quarry back. The cutters want to run it ourselves. Captain Holt would take it for the Charter. You broke the Crusher; they will listen to you.',
    desc:'Decide who runs Stonebridge Quarry.',goal:{t:'talk',npc:'dagna'},where:'Foreman Dagna, at the Strikers’ Camp',
    prog:'Tell Dagna what you think.',done:'Then that is the way we go. The stone will remember who stood here.',
    choices:[{n:'The cutters run it',d:'A cooperative quarry. Fair wages, slower stone. The strikers remember you.',flag:'quarry_coop',reward:{exp:1600,item:['crusher','charm',2]}},
      {n:'Back to the Company',d:'The Company restores the old wage and pays you a finder’s fee. Dagna is not happy.',flag:'quarry_company',reward:{sh:400}},
      {n:'The Charter takes it',d:'Captain Holt’s clerks run the works as public stone for rebuilding. Unlocks Quarryman’s Draught.',flag:'quarry_charter',reward:{exp:800,fl:{quarrydraught:1}}}],reward:{exp:1000}}});
RECIPES.push({id:'qdraught',d:'alchemy',r:2,n:'Quarryman’s Draught',use:'ward',flag:'quarrydraught',need:{herb:2,ore:1},desc:'What the cutters drink before a long shift: +15 defense for 2 minutes.'});
/* kill credit: either Freeband type counts for Picket Lines */
const _kmq=killMob;killMob=function(m,...a){const r=_kmq(m,...a);if(m&&m.t==='raider'&&Z.id==='quarry'){const st=qSt('qf1');if(st&&st.s==='a'&&st.n<6){st.n++;qProgress('qf1','Freeband')}}return r};
/* rockfall: dust warns, then stone drops */
function quarryTick(dt){if(!Z.rockfall){S.rocks=null;return}S.rocks=S.rocks||[];S.rockT=(S.rockT??2)-dt;
  if(S.rockT<=0){S.rockT=Z.id==='qfort'?2.4:3.2;const near=Z.rockfall.filter(x=>Math.abs(x-pl.x)<260);if(near.length){const x=near[Math.floor(Math.random()*near.length)]+rnd(-14,14);S.rocks.push({x,y:0,warn:1.1,vy:0,ty:topAt(x),r:4+Math.floor(Math.random()*3)})}}
  const boss=Z.id==='qfort'&&S.mobs.find(m=>m.t==='crusher'&&!m.dead);
  if(boss){if(!boss.ph2&&boss.hp<boss.mhp*.5){boss.ph2=1;banner('The Crusher','Its furnace roars; the whole floor shakes')}if(boss.ph2&&boss.aggro>0){boss.stompT=(boss.stompT??2)-dt;if(boss.stompT<=0){boss.stompT=3;for(const d of[-80,-40,40,80])S.rocks.push({x:pl.x+d+rnd(-8,8),y:0,warn:.8,vy:0,ty:topAt(pl.x+d),r:4});tone(70,.5,'sawtooth',.07,-30);S.shake=Math.max(S.shake||0,.4)}}}
  for(const r of S.rocks){if(r.warn>0){r.warn-=dt;r.y=0;if(Math.random()<dt*20)S.parts.push({x:r.x+rnd(-5,5),y:r.ty-160+rnd(0,10),vx:0,vy:rnd(20,60),t:0,life:.6,c:'#b8a888',g:80,s:1});continue}
    r.vy+=700*dt;r.y+=r.vy*dt;const wy=r.ty-170+r.y;if(!r.hit&&Math.abs(pl.x-r.x)<r.r+6&&wy>pl.y-30&&wy<pl.y+2){r.hit=1;hurtPl(Math.round(pl.mhp*.12),r.x)}if(wy>=r.ty){r.done=1;for(let i=0;i<6;i++)S.parts.push({x:r.x,y:r.ty,vx:rnd(-60,60),vy:rnd(-90,-20),t:0,life:.5,c:'#8a7a5e',g:300,s:1})}}
  S.rocks=S.rocks.filter(r=>!r.done)}
function drawQuarry(cx,cy){if(!S.rocks)return;for(const r of S.rocks){const x=ri(r.x-cx);if(r.warn>0){const y=ri(r.ty-cy);g.fillStyle=`rgba(0,0,0,${.25+.25*Math.sin(S.t*20)})`;g.fillRect(x-r.r-2,y-1,r.r*2+4,2);continue}
    const y=ri(r.ty-170+r.y-cy);g.fillStyle='#000';g.fillRect(x-r.r-1,y-r.r-1,r.r*2+2,r.r*2+2);g.fillStyle='#7a6a50';g.fillRect(x-r.r,y-r.r,r.r*2,r.r*2);g.fillStyle='#a8987a';g.fillRect(x-r.r,y-r.r,r.r*2,1);g.fillRect(x-r.r,y-r.r,1,r.r)}}
