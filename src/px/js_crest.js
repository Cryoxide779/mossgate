/* ---------- CrestHollow region, expanded to its sheet: Riversmeet Crossing, Stonefield Plains, Mirefen Wetlands, the High Steps ---------- */
THEMES.plains={...THEMES.heath,ramps:{...THEMES.heath.ramps,far:R(['#3a4a6a','#4e6488','#6a82a4','#8aa2bc','#aec2d2','#d2dee4','#eef2ee']),
    grass:R(['#3e4a1e','#52622a','#6a7c34','#86983e','#a4b44c','#c4cc62']),leaf:R(['#1e2814','#2a361a','#384622','#48582a','#5a6c34','#6e823e','#86984a','#a0ae58'])},
  mid:'cliff',top:[180,40],canopy:'none',fog:'rgba(200,190,150,.08)',fog2:'rgba(220,210,170,.04)',ray:'255,240,190',rayA:1.4,amb:'mote',vig:'6,4,2',noFern:1};
THEMES.river={...THEMES.grove,fog:'rgba(170,200,210,.1)',ray:'255,240,200',rayA:1.2};
THEMES.temple={...THEMES.town,fog:'rgba(230,210,170,.08)',ray:'255,230,170',rayA:1.6,amb:'mote'};
WX.riversmeet=['clear','clear','rain'];WX.stonefield=['clear','clear','clear','rain'];WX.mirefen=['clear','rain','rain'];WX.highsteps=WX.town;
Object.assign(MOBS,{
  mossrabbit:{name:'Mossrabbit',kind:'quad',ai:'lunger',passive:1,hp:30,atk:5,exp:8,w:14,h:10,spd:52,shard:[1,3],aggro:40},
  ashenstag:{name:'Ashen Stag',kind:'quad',ai:'lunger',passive:1,hp:80,atk:11,exp:16,w:22,h:28,spd:40,shard:[2,5],aggro:90},
  stoneboar:{name:'Stoneback Boar',kind:'quad',ai:'lunger',hp:90,atk:11,exp:17,w:24,h:16,spd:36,shard:[2,5],aggro:120},
  glenhawk:{name:'Glenwing Hawk',kind:'fly',ai:'flyer',fly:1,hp:50,atk:9,exp:13,w:16,h:12,spd:50,shard:[2,4],aggro:170},
  marshstalker:{name:'Marshstalker',kind:'quad',ai:'lunger',hp:85,atk:12,exp:17,w:26,h:12,spd:34,shard:[2,5],aggro:110},
  emberling:{name:'Emberling',kind:'slime',ai:'slime',hp:55,atk:10,exp:14,w:14,h:12,spd:22,shard:[2,4],aggro:90},
  greyantler:{name:'Greyantler',kind:'quad',ai:'lunger',elite:1,bb:1,hp:700,atk:14,exp:300,w:34,h:40,spd:40,shard:[30,50],aggro:180,resp:90},
  mudjaw:{name:'Old Mudjaw',kind:'quad',ai:'lunger',elite:1,bb:1,hp:800,atk:15,exp:340,w:52,h:18,spd:30,shard:[30,50],aggro:180,resp:90}});
const GS=(set,pal,head,chest,hands,feet,charm,weap)=>({set,drop:.14,pal,head,chest,hands:{n:hands},feet:{n:feet},charm,weap});
Object.assign(GEAR,{
  mossrabbit:GS('Mossrabbit',['#7a8a4a','#4a5a2a','#a0b060','#e8dcc0','#c86a5a'],{n:'Long-Ear Hood',s:'hood'},{n:'Moss-Down Vest',s:'pelt'},'Soft-Pad Gloves','Hopper Boots',{n:'Lucky Foot',s:'fang'},{katana:'Clover Blade',daggers:'Burrow Knives',bow:'Warren Bow',staff:'Thicket Staff',tome:'Field Almanac'}),
  ashenstag:GS('Ashen Stag',['#7a6a5a','#4a3e34','#a8967e','#e8dcc0','#5a6a7a'],{n:'Antler Circlet',s:'antlers'},{n:'Ashen Hide Coat',s:'pelt'},'Hide Gloves','Fleetfoot Boots',{n:'Velvet Antler',s:'fang'},{katana:'Antler Blade',daggers:'Tine Knives',bow:'Stagbone Bow',staff:'Antler Staff',tome:'Herd Lore'}),
  stoneboar:GS('Stoneback Boar',['#4a4440','#2a2420','#6a625a','#a89a8a','#c84a3a'],{n:'Stonehide Cap',s:'visor'},{n:'Slab-Back Jerkin',s:'plate'},'Grit Gloves','Rockfoot Boots',{n:'Flint Tusk',s:'fang'},{katana:'Tuskedge',daggers:'Flint Knives',bow:'Boar Bow',staff:'Rooting Staff',tome:'Stone Ledger'}),
  glenhawk:GS('Glenwing Hawk',['#6a4a2a','#3a2818','#a0784a','#f2e6c8','#e0a040'],{n:'Feathered Cap',s:'feather'},{n:'Windcut Mantle',s:'robe'},'Talon Grips','Perch Boots',{n:'Glenwing Feather',s:'lamp'},{katana:'Talon Blade',daggers:'Talon Pair',bow:'Glenwing Bow',staff:'Skywatch Staff',tome:'Falconer’s Book'}),
  marshstalker:GS('Marshstalker',['#4a6a3a','#2a3e22','#6a8a4a','#c8d468','#a05a3a'],{n:'Reed-Scale Hood',s:'hood'},{n:'Stalker Scale Vest',s:'leather'},'Webbed Gloves','Mud Boots',{n:'Stalker Eye',s:'scale'},{katana:'Reedcutter',daggers:'Fang Knives',bow:'Marsh Bow',staff:'Bog Staff',tome:'Wetland Notes'}),
  emberling:GS('Emberling',['#8a3a1a','#4a1e0e','#d4683a','#ffd27a','#3a3030'],{n:'Cinder Cap',s:'kasa'},{n:'Smoulder Robe',s:'robe'},'Ashen Gloves','Warmstep Boots',{n:'Living Coal',s:'core'},{katana:'Ember Blade',daggers:'Spark Knives',bow:'Smoke Bow',staff:'Kindling Staff',tome:'Book of Small Fires'}),
  greyantler:{...GS('Greyantler',['#8a8076','#4e463e','#b4a896','#efe4c8','#c84a3a'],{n:'Greyantler Crown',s:'antlers'},{n:'Herdlord Mantle',s:'pelt'},'Herdlord Grips','Plainsrunner Boots',{n:'Greyantler Tine',s:'core'},{katana:'Herdlord Blade',daggers:'Grey Tines',bow:'Plainsong Bow',staff:'Old Antler Staff',tome:'Herd Chronicle'}),drop:1,drops:2},
  mudjaw:{...GS('Old Mudjaw',['#3a5a2a','#1e2e16','#5a7a3a','#c8d468','#a05a3a'],{n:'Mudjaw Helm',s:'horns'},{n:'Bogscale Hauberk',s:'plate'},'Mudjaw Claws','Mire Greaves',{n:'Mudjaw Tooth',s:'fang'},{katana:'Mudjaw Fang',daggers:'Bog Teeth',bow:'Reedline Bow',staff:'Mire Staff',tome:'Book of the Wetlands'}),drop:1,drops:2}});
for(const k of['mossrabbit','ashenstag','stoneboar','glenhawk','marshstalker','emberling','greyantler','mudjaw'])MOBS[k].base1=1;
for(const k of['mossrabbit','ashenstag','stoneboar','glenhawk','marshstalker','emberling','greyantler','mudjaw']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
SLIME_S.emberling={body:R(['#4a1408','#8a2a10','#c84a1a','#f07a2a','#ffc04a']),top:null,deco:'flame'};
QUAD.mossrabbit={cw:24,ch:18,cx:10,len:10,bh:6,leg:2,lw:2,c:['#2a2418','#7a6a4a','#a08a62','#5a4a32','#1a1210'],head:'none',tail:'stub',extra:(P,Rc,o)=>{
  const hx=Math.round(o.cx+o.L/2-1),hy=o.cy-2;Rc(hx,hy-2,4,4,'#7a6a4a');Rc(hx,hy-2,4,1,'#a08a62');P(hx+3,hy-1,'#1a1210');P(hx+4,hy,'#d8a8a0');
  for(let k=0;k<6;k++){P(hx+1-(o.mode==='wind'?1:0),hy-3-k,k<4?'#7a6a4a':'#a08a62');P(hx+2,hy-3-k+(k>3?1:0),'#c8a8a0')}
  for(let x=Math.floor(o.cx-o.L/2+1);x<o.cx+o.L/2-1;x+=2)P(x,Math.floor(o.cy-o.bh/2)-1,'#6a8a3a');P(Math.round(o.cx-o.L/2-1),o.cy-2,'#efe4c8');P(Math.round(o.cx-o.L/2-2),o.cy-2,'#efe4c8')}};
QUAD.ashenstag={...QUAD.rotstag,c:['#2a221c','#7a6a5a','#a8967e','#d8c8b0','#1a1220']};
QUAD.greyantler={...QUAD.rotstag,cw:56,ch:56,cx:22,len:28,bh:13,leg:14,lw:3,c:['#2a2622','#8a8076','#b4a896','#efe4c8','#ffd27a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<10;i++)P(Math.round(o.cx-o.L/2+3+i*2.5),top-1,'#c8bca8');for(let i=0;i<4;i++)P(o.cx-6+i*4,o.cy+2,'#6e6458')}};
QUAD.stoneboar={...QUAD.boar,c:['#1e1a18','#4a4440','#6a625a','#3a3430','#c84a3a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<5;i++){const x=Math.round(o.cx-o.L/2+3+i*3.5);Rc(x,top-2,3,3,'#8a8276');P(x,top-2,'#aaa296');P(x+2,top,'#5a544c')}}};
QUAD.marshstalker={cw:44,ch:18,cx:18,len:24,bh:7,leg:3,lw:2,c:['#1a2614','#4a6a3a','#6a8a4a','#2a3e22','#c8d468'],head:'none',tail:'long',extra:(P,Rc,o)=>{
  const hx=Math.round(o.cx+o.L/2-2),hy=o.cy-1,op=o.mode==='lunge'?3:o.mode==='wind'?1:0;for(let k=0;k<11;k++){Rc(hx+k,hy-3-Math.round(op*k/11),1,3,k<2?'#4a6a3a':'#5a7a42');Rc(hx+k,hy+Math.round(op*k/11),1,2,'#3e5a30')}
  P(hx+2,hy-4,'#c8d468');P(hx+3,hy-4,'#1a1210');if(op)for(let k=3;k<10;k+=2)P(hx+k,hy-1,'#efe4c8');for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2-2;x+=3)P(x,Math.floor(o.cy-o.bh/2)-1,'#2a3e22')}};
QUAD.mudjaw={...QUAD.marshstalker,cw:80,ch:28,cx:34,len:44,bh:11,leg:5,lw:4,c:['#141e10','#3a5a2a','#5a7a3a','#22321a','#ffd27a'],extra:(P,Rc,o)=>{QUAD.marshstalker.extra((x,y,c)=>P(x,y,c),(x,y,w,h,c)=>Rc(x,y,w*1,h,c),o);const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<8;i++){const x=Math.round(o.cx-o.L/2+5+i*4.5);P(x,top-2,'#6a8a4a');P(x,top-3,'#8aa060')}for(let i=0;i<5;i++)P(o.cx-14+i*6,o.cy+3,'#6a4a2a')}};
function hawkFrame(ph,charge,flash){return sprite(34,24,(P,Rc)=>{const cx=17,cy=13,B=['#3a2818','#6a4a2a','#a0784a'],wa=[-1,0,1][ph%3];
  for(const s of[-1,1])for(let i=0;i<12;i++){const y=cy-1-Math.round(i*(wa===-1?.8:wa===0?.15:-.45)),x=cx+s*(2+i);for(let j=0;j<Math.max(1,3-Math.floor(i/5));j++)P(x,y+j,i>8?'#3a2818':j?B[1]:B[2]);if(i>9)P(x,y+1,'#f2e6c8')}
  for(let y=-2;y<4;y++)for(let x=-2;x<=2;x++)P(cx+x,cy+y,y>1?'#f2e6c8':B[1+(x>0?1:0)]);Rc(cx-1,cy+4,3,2,B[0]);for(let i=0;i<3;i++)P(cx-1+i,cy+6,B[1]);
  const hx=cx+3+(charge?2:0),hy=cy-3+(charge?2:0);Rc(hx,hy-1,4,3,'#efe4c8');P(hx+2,hy,'#1a1210');P(hx+4,hy,'#e0a040');P(hx+4,hy+1,'#e0a040');if(charge){P(cx-1,cy+7,'#e0a040');P(cx+1,cy+7,'#e0a040')}},flash)}
const _brc=buildRoster;buildRoster=function(){_brc();MSP.glenhawk={kind:'fly',ax:17,ay:16,fl:[0,1,2].map(p=>hawkFrame(p,0,0)),ch:hawkFrame(1,1,0),F:{fl:[0,1,2].map(p=>hawkFrame(p,0,1)),ch:hawkFrame(1,1,1)}}};
/* props */
Object.assign(PROPS,{
  stonebridge2(x,X,Y){const P=px3(x),S=TH.rock;for(let k=-70;k<=70;k++){const arch=Math.abs(k)<54?Math.round(Math.sqrt(54*54-k*k)*.5):0;for(let y=0;y<10;y++)P(X+k,Y-26+y-(y<2?0:0),y<2?S[5]:pick(S,.55-(k+70)/400,X+k,y));for(let y=10;y<34-arch;y++)P(X+k,Y-26+y,pick(S,.45+(y%6===0?-.1:0),X+k,y))}
    for(let k=-70;k<=70;k+=10)for(let y=0;y<5;y++)P(X+k,Y-27-y,S[4])},
  waystation(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-22,22])for(let y=0;y<36;y++){P(X+k,Y-y,pick(W,.6,X,y));P(X+k+1,Y-y,W[2])}for(let y=36;y<44;y++){const w=28-(y-36)*2;for(let k=-w;k<=w;k++)P(X+k,Y-y,(k+y)%5?[150,60,46]:[120,44,34])}
    for(let k=-20;k<=20;k++){P(X+k,Y-14,W[4]);P(X+k,Y-13,W[2])}for(let y=0;y<10;y++)for(let k=6;k<18;k++)P(X+k,Y-y,y===9?W[5]:pick(W,.5,k,y));Z.glows.push([X-10,Y-24,18,'255,190,110'])},
  peatfire(x,X,Y){const P=px3(x);for(let k=-10;k<=10;k++)for(let y=0;y<3;y++)P(X+k,Y-y,[40,28,20]);for(let i=0;i<10;i++){const k=-8+Math.floor(hash(i,1,X)*16);P(X+k,Y-3-Math.floor(hash(i,2,X)*4),i%2?[255,140,60]:[200,70,30])}Z.glows.push([X,Y-4,16,'255,140,60'])},
  steps(x,X,Y){const P=px3(x),S=R(['#5a5248','#7a7064','#9a8e80','#b8ac9a','#d6ccb8']);for(let s=0;s<8;s++)for(let k=-40+s*4;k<=40-s*4;k++)for(let y=0;y<5;y++)P(X+k,Y-s*5-y,y===4?S[4]:pick(S,.6-(k+40)/200,X+k,y))},
  temple(x,X,Y){const P=px3(x),S=R(['#5a5248','#7a7064','#9a8e80','#b8ac9a','#d6ccb8','#ece4d4']);for(let y=0;y<70;y++)for(let k=-46;k<=46;k++){const col=Math.abs(k)%18<4,door=Math.abs(k)<8&&y<26;if(door){P(X+k,Y-y,y>22?[90,70,40]:[30,22,18]);continue}P(X+k,Y-y,pick(S,(col?.75:.5)-(k+46)/300+(y%10===0?.08:0),X+k,y))}
    for(let y=70;y<92;y++){const w=Math.round(52-(y-70)*2.3);for(let k=-w;k<=w;k++)P(X+k,Y-y,pick(S,.62-(y-70)/80,X+k,y))}for(let y=92;y<100;y++){P(X,Y-y,[200,170,90]);if(y===95)for(let k=-3;k<=3;k++)P(X+k,Y-y,[200,170,90])}
    for(let k=-6;k<=6;k++)for(let y=30;y<44;y++)if((k*k)/36+((y-37)*(y-37))/49<1)P(X+k,Y-y,[255,214,140]);Z.glows.push([X,Y-37,26,'255,214,140'])}});
/* zones */
const TWN=zIdx('town'),SBR=zIdx('stonebridge'),RMI=ZONES.length,SFI=RMI+1,MFI=RMI+2,HSI=RMI+3;
{const Rm={id:'riversmeet',name:'Riversmeet Crossing',ch:'CrestHollow',theme:'river',lv:[2,3],req:1,ww:1700,start:70,
  seg:[[0,560,250],[560,560,292,'bed'],[540,600,236,'bridge'],[1120,580,250],[530,18,272,'stone'],[1106,18,272,'stone'],[240,90,206,'f'],[1300,90,204,'f']],pools:[{x0:560,x1:1120,y:268}],
  mobs:[['mossrabbit',0,200],['glenhawk',-2,420],['stoneboar',3,1260],['mossrabbit',3,1400],['glenhawk',-2,1500],['stoneboar',0,420]],
  portals:[{x:22,to:TWN,tx:1480},{x:1678,to:SBR,tx:70},{x:330,to:SFI,tx:70},{x:1460,to:MFI,tx:70}],npcs:['dell'],
  labels:[[150,'Caravan Waystation',66],[840,'Riversmeet Bridge',70]],props:[['waystation',150],['cart',260],['crates',380],['stonebridge2',840],['banner',1180],['fire',1240],['tent',1580]],trees:[]};
 const Sf={id:'stonefield',name:'Stonefield Plains',ch:'CrestHollow',theme:'plains',lv:[3,4],req:2,ww:1900,start:70,
  seg:[[0,500,250],[500,300,242],[800,500,250],[1300,300,240],[1600,300,250],[600,90,208,'f'],[1380,90,206,'f']],
  mobs:[['ashenstag',0,320],['ashenstag',0,420],['stoneboar',2,980],['glenhawk',-2,700],['ashenstag',2,1160],['stoneboar',3,1420],['mossrabbit',4,1700],['greyantler',4,1780],['glenhawk',-2,1500]],
  portals:[{x:22,to:RMI,tx:330}],npcs:['aldis'],labels:[[160,'Herders’ Rest',60],[1000,'The Standing Stones',90],[1760,'Greyantler’s Ground',70]],
  props:[['tent',120],['fire',200],['cairn',560],['pillar',960],['pillar',1040],['cairn',1300],['grave',1600]],trees:[]};
 const Mf={id:'mirefen',name:'Mirefen Wetlands',ch:'CrestHollow',theme:'bog',lv:[4,5],req:3,ww:1600,start:70,
  seg:[[0,420,250],[420,240,290,'bed'],[660,360,250],[1020,220,290,'bed'],[1240,360,250],[410,18,268,'stone'],[650,18,268,'stone'],[1006,18,268,'stone'],[1230,18,268,'stone'],[480,80,230,'plank'],[1080,80,230,'plank']],
  pools:[{x0:420,x1:660,y:264},{x0:1020,x1:1240,y:264}],
  mobs:[['marshstalker',0,300],['emberling',2,760],['emberling',2,900],['bogslime',2,980],['marshstalker',4,1320],['emberling',4,1420],['mudjaw',4,1520]],
  portals:[{x:22,to:RMI,tx:1460}],npcs:['jorun'],labels:[[140,'Peat-cutters’ Hut',60],[840,'The Smoulder Beds',70],[1500,'Mudjaw’s Wallow',60]],
  props:[['hut',140],['reeds',300],['peatfire',760],['peatfire',900],['reeds',1100],['peatfire',1400],['reeds',1560]],trees:[]};
 const Hs={id:'highsteps',name:'The High Steps',ch:'CrestHollow',theme:'temple',safe:1,lv:[1,1],req:1,ww:1200,start:60,
  seg:[[0,1200,250],[300,120,226,'plank'],[760,120,226,'plank']],mobs:[],portals:[{x:22,to:TWN,tx:1150}],npcs:['halden'],
  labels:[[600,'Hall of Lanterns',110],[220,'The Teaching Stones',60]],props:[['banner',100],['lantern',180],['steps',600],['temple',600],['lantern',1020],['banner',1100]],trees:[]};
 for(const z of[Rm,Sf,Mf,Hs]){prepZone(z);z.nodes=[];z.stations=[];ZONES.push(z)}
 const T=ZONES[TWN];const pS=T.portals.find(p=>p.to===SBR);pS.to=RMI;pS.tx=70+EDGE;T.portals.push({x:1150+EDGE,to:HSI,tx:60+EDGE});(T.labels=T.labels||[]).push([1150+EDGE,'The High Steps',78],[70+EDGE,'CrestHollow Gates',96]);
 const B=ZONES[SBR];const pT=B.portals.find(p=>p.to===TWN);pT.to=RMI;pT.tx=1640+EDGE}
Object.assign(MAPXY,{riversmeet:[24,66],stonefield:[24,80],mirefen:[36,82],highsteps:[33,54]});WAYS.riversmeet=180;
/* people */
Object.assign(NPCS,{
  dell:{name:'Ferrymaster Dell',title:'Riversmeet Crossing',x:200+EDGE,cls:'ronin',look:{sex:0,build:2,face:2,hair:5,hairC:3,beard:4,skin:3,eye:0,outfit:2},eq:{head:'raider',chest:'r_start'},
    lines:['Every caravan in the Reach crosses here or swims. Most cross.','Contracts, cargo, gossip. I sell all three by weight.','The Ash Road goes south from here to the whole wide world.']},
  aldis:{name:'Herder Aldis',title:'Stonefield Plains',x:160+EDGE,cls:'ashbow',look:{sex:1,build:1,face:1,hair:2,hairC:5,beard:0,skin:2,eye:2,outfit:1},eq:{head:'wolf',chest:'a_start'},
    lines:['The herds have walked these plains since before MossGate had walls.','You can tell the weather by the stags. They lie down before rain.','Wide horizons, hard people. That is Stonefield.']},
  jorun:{name:'Peat-cutter Jorun',title:'Mirefen Wetlands',x:200+EDGE,cls:'necro',look:{sex:0,build:1,face:5,hair:1,hairC:6,beard:2,skin:1,eye:0,outfit:4},eq:{head:'bogslime',chest:'w_start'},
    lines:['Peat burns slow and warm. Lately it burns on its own, and that is not right.','Beauty and danger in equal measure, the wetlands. Mostly danger.','Mind the black water. Things live under it.']},
  halden:{name:'Sister Halden',title:'Teacher of the High Steps',x:420+EDGE,cls:'weaver',look:{sex:1,build:0,face:0,hair:3,hairC:1,beard:0,skin:0,eye:1,outfit:4},eq:{head:'lantern',chest:'w_start'},
    lines:['Faith, learning and guidance. We offer all three, and ask only that you come back and teach.','The stones by the door hold the first lessons. Read them slowly.','Every journey begins somewhere. Yours began at our gate.']}});
Object.assign(BARKS,{dell:['Mind the bridge!','Contracts, fresh today.','Wagons south!'],aldis:['Easy with the herd.','Rain coming.','Stags are skittish.'],jorun:['Fires again.','Smell that smoke?','Mind the water.'],halden:['Peace on the Steps.','Read the stones.','Welcome, traveller.']});
Object.assign(LORE,{
  hsA:{z:'highsteps',x:180,k:'stone',t:'The First Stone: Gather',txt:'“Take what the land offers and no more than it can grow back. Herbs, timber, ore: every craft starts with a hand on the earth.”'},
  hsB:{z:'highsteps',x:250,k:'stone',t:'The Second Stone: Befriend',txt:'“Not every creature is an enemy. Worn down, fed, and treated kindly, many will walk beside you. Ask first. Feed always.”'},
  hsC:{z:'highsteps',x:320,k:'stone',t:'The Third Stone: Belong',txt:'“CrestHollow was built by people who had nowhere else. Help them, and you will never be without a door to knock on.”'},
  rmA:{z:'riversmeet',x:980,k:'note',t:'Toll Board',txt:'“Riversmeet Crossing. Wagons one shard, beasts half, pilgrims free. Concordance bonded freight: free, by order.” The last line has been scratched at by many knives.'},
  sfA:{z:'stonefield',x:1000,k:'stone',t:'The Standing Stones',txt:'“Here the herds were counted before the Gatefall. Here they are counted still.” Fresh chalk tallies run down the stone.'},
  mfA:{z:'mirefen',x:620,k:'note',t:'Peat Ledger',txt:'“Third fire this month. No flint, no lamp, no person. The peat lights itself where the Scar runoff pools, and the little burning things crawl out of it.”'}});
Object.assign(QUESTS,{
  hs1:{title:'The First Lessons',giver:'halden',pre:'m2',lv:1,
    offer:'Every traveller who comes up the Steps reads the Teaching Stones. Three of them, just inside the gate. Read them, and come back to me. They will tell you more about living in the Reach than any map.',
    desc:'Read the three Teaching Stones on the High Steps.',goal:{t:'event',id:'hsread',n:3,lab:'Teaching Stones read'},where:'The High Steps, inside the gate',prog:'The stones stand just inside the gate.',
    done:'Gather, befriend, belong. Simple words. The hard part is living them. Take this, and come back when you have learned a craft.',reward:{exp:30,sh:15,sp:1}},
  hs2:{title:'Learn a Craft',giver:'halden',pre:'hs1',lv:2,
    offer:'Make something with your own hands. Anything: a tonic, a blade, a bowl of stew. The Workyard forge and the alchemy racks are open to everyone.',
    desc:'Craft anything at a forge, rack or campfire.',goal:{t:'craft',n:1},where:'The Workyard in CrestHollow, or any campfire',prog:'Craft anything at all.',
    done:'There. Now you are someone who makes things. The Reach needs more of those than it needs heroes.',reward:{exp:60,sh:20}},
  rv1:{title:'Wings Over the Wagons',giver:'dell',lv:2,
    offer:'Glenwing hawks have learned that caravans mean food. They dive the wagons and spook the oxen. Bring down five of them and the drovers will buy you a drink.',
    desc:'Bring down 5 Glenwing Hawks around Riversmeet Crossing.',goal:{t:'kill',mob:'glenhawk',n:5,lab:'Hawks brought down'},where:'Riversmeet Crossing and Stonefield Plains',prog:'They circle above the road.',
    done:'Clear skies over the crossing. The drovers owe you, and so do I.',reward:{exp:50,sh:20}},
  rv2:{title:'Spilled Cargo',giver:'dell',pre:'rv1',lv:3,
    offer:'A wagon overturned near the bridge and the boars got into it. Bundles of trade cloth, scattered and trampled. Stoneback boars carry them off in their tusks, if you can believe it. Bring back four.',
    desc:'Recover 4 Trade Bundles from Stoneback Boars.',goal:{t:'collect',mob:'stoneboar',item:'Trade Bundle',n:4,p:.6},where:'Riversmeet Crossing',prog:'The boars root along both banks.',
    done:'Muddy, chewed, still sellable. That is the Ash Road in a sentence. Here, a cut of the profit, and a word: Stonebridge is the next big town south. They pay well for people like you.',reward:{exp:80,sh:30}},
  sf1:{title:'Thin the Boars',giver:'aldis',lv:3,
    offer:'Stoneback boars are tearing up the grazing. The stags will not come down to the low grass while they are rooting there. Drive off six.',
    desc:'Drive off 6 Stoneback Boars on Stonefield Plains.',goal:{t:'kill',mob:'stoneboar',n:6,zone:'stonefield',lab:'Boars driven off'},where:'Stonefield Plains',prog:'They root in the low grass.',
    done:'Look, the herd is coming down already. Thank you.',reward:{exp:90,sh:30}},
  sf2:{title:'Greyantler',giver:'aldis',pre:'sf1',lv:4,
    offer:'The old herd stag, Greyantler, has gone wrong. Scar dust in his feed, I think. He gores anyone who comes near the stones, even me. I cannot bring him down myself. Would you?',
    desc:'Face Greyantler at the far end of the plains.',goal:{t:'kill',mob:'greyantler',n:1,lab:'Greyantler faced'},where:'Greyantler’s Ground, east Stonefield',prog:'He keeps to the far end of the plains.',
    done:'He was the best stag I ever knew. The herd will choose a new one. Take his tine: herders say it brings fair weather.',reward:{exp:300,sh:60}},
  mf1:{title:'Peat That Burns Itself',giver:'jorun',lv:4,
    offer:'The peat beds are catching fire with nobody near them, and little burning things crawl out of the smoke. Emberlings, the old folk call them. Put out six before they set the whole fen alight.',
    desc:'Put out 6 Emberlings in Mirefen Wetlands.',goal:{t:'kill',mob:'emberling',n:6,lab:'Emberlings put out'},where:'The Smoulder Beds, Mirefen Wetlands',prog:'They crawl around the burning peat.',
    done:'The beds are only smoking now. Smoking I can live with.',reward:{exp:110,sh:30}},
  mf2:{title:'Old Mudjaw',giver:'jorun',pre:'mf1',lv:5,
    offer:'The marshstalkers have a king. Old Mudjaw, bigger than a boat, lies in the wallow at the east end and takes anyone who wades too near. Since the fires, he has been hungrier. End it.',
    desc:'Defeat Old Mudjaw in his wallow.',goal:{t:'kill',mob:'mudjaw',n:1,lab:'Old Mudjaw defeated'},where:'Mudjaw’s Wallow, east Mirefen',prog:'East, where the water is blackest.',
    done:'Old Mudjaw. My grandfather lost a boot to that beast. I will tell him tonight; he will not believe me.',reward:{exp:360,sh:70}}});
/* reading the teaching stones counts for the lesson */
const HSR=['hsA','hsB','hsC'];
const _olh=openLore;openLore=function(id){const r=_olh(id);if(HSR.includes(id)){const st=qSt('hs1');if(st&&st.s==='a'){st.n=HSR.filter(k=>pl.lore&&pl.lore[k]).length;qProgress('hs1','Stone')}}return r};
/* ---------- starting kits from the CrestHollow sheet: Traveler, Scout, Guard, Aspirant, Gatherer ---------- */
Object.assign(CLASSES,{
  traveler:{name:"Traveler's Kit",weap:'spear',disc:'polearm',armor:'medium',desc:'Walking spear and a road-worn cloak. Starts trained in Spear & Polearm and Medium Armor.'},
  scout:{name:"Scout's Kit",weap:'axe',disc:'axes',armor:'light',desc:'Hand axe and a hooded green jerkin. Starts trained in Axecraft and Light Armor.'},
  guard:{name:"Guard's Kit",weap:'shield',disc:'shield',armor:'heavy',desc:'Arming sword, round shield and gate mail. Starts trained in Shieldcraft and Heavy Armor.'},
  aspirant:{name:"Aspirant's Kit",weap:'staff',disc:'restore',armor:'robes',desc:'Lantern staff and a blue novice robe from the High Steps. Starts trained in Restoration and Robes.'},
  gatherer:{name:"Gatherer's Kit",weap:'hammer',disc:'hammer',armor:'medium',extra:['herbalism','mining','logging'],mat:{herb:4,ore:4,timber:4},
    desc:'Work hammer, sturdy leathers and a full pack. Starts trained in Hammer & Mace and Medium Armor, with a start in Herbalism, Mining and Logging, and a few materials.'}});
const KS=(set,pal,head,chest,hands,feet,charm)=>({set,drop:0,start:1,pal,head,chest,hands,feet,charm:charm||{n:'Red Cord Knot',s:'knot'},weap:{}});
Object.assign(GEAR,{
  tv_start:KS('Traveler',['#5a4632','#3a2c20','#7a6248','#e6d6b0','#4a6a3a'],{n:'Traveler Hood',nf:'Traveler Hood',s:'hood'},{n:'Road Cloak',nf:'Road Cloak',s:'leather'},{n:'Road Gloves',nf:'Road Gloves'},{n:'Trail Boots',nf:'Trail Boots'},{n:'Waystone Token',s:'coin'}),
  sc_start:KS('Scout',['#3e5a32','#26381e','#5e7a46','#e6d6b0','#8a6a3a'],{n:'Scout Hood',nf:'Scout Hood',s:'hood'},{n:'Scout Jerkin',nf:'Scout Jerkin',s:'leather'},{n:'Scout Bracers',nf:'Scout Bracers'},{n:'Soft Boots',nf:'Soft Boots'}),
  gd_start:KS('Guard',['#6a707a','#3e434a','#9aa0a8','#e6d6b0','#2f4e86'],{n:'Gate Helm',nf:'Gate Helm',s:'visor'},{n:'Gate Mail',nf:'Gate Mail',s:'plate'},{n:'Mail Gauntlets',nf:'Mail Gauntlets'},{n:'Guard Greaves',nf:'Guard Greaves'},{n:'Gate Badge',s:'coin'}),
  as_start:KS('Aspirant',['#3a5a8a','#24385a','#5a7aaa','#f2e6c8','#e3b04b'],{n:'Novice Hood',nf:'Novice Hood',s:'cowl'},{n:'Novice Robe',nf:'Novice Robe',s:'robe'},{n:'Lantern Cuffs',nf:'Lantern Cuffs'},{n:'Step Sandals',nf:'Step Sandals'},{n:'Lantern Charm',s:'lamp'}),
  ga_start:KS('Gatherer',['#7a5a3a','#4a3624','#9a7a54','#e6d6b0','#6a8a3a'],{n:'Gatherer Hat',nf:'Gatherer Hat',s:'kasa'},{n:'Gatherer Leathers',nf:'Gatherer Leathers',s:'leather'},{n:'Work Gloves',nf:'Work Gloves'},{n:'Mud Boots',nf:'Mud Boots'},{n:'Seed Pouch',s:'knot'})});
Object.assign(START,{traveler:'tv_start',scout:'sc_start',guard:'gd_start',aspirant:'as_start',gatherer:'ga_start'});
{const WN={tv_start:{spear:'Walking Spear'},sc_start:{axe:'Scout Hatchet'},gd_start:{shield:'Arming Sword & Round Shield'},as_start:{staff:'Lantern Staff'},ga_start:{hammer:'Work Hammer'}};
 for(const k of Object.keys(WN)){const W2=GEAR[k].weap;Object.assign(W2,WN[k]);for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
 for(const k of['r_start','s_start','a_start','w_start','n_start']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}}
/* a new Gatherer starts with the gathering trades and a full pack */
const _bwk=beginWith;beginWith=function(ch,sv){const r=_bwk(ch,sv);if(!sv){const K=CLASSES[pl.ch.cls];if(K&&K.extra)for(const d of K.extra)pl.dx[d]=Math.max(pl.dx[d]||0,dCum(1));if(K&&K.mat)for(const[m,n]of Object.entries(K.mat))pl.mat[m]=(pl.mat[m]||0)+n}return r};
