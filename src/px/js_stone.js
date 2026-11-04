/* ---------- Stonebridge, expanded to its sheet: Ironvale and the Blackwheel Forges, Granite Peaks, Blackgate Pass, Rivermere Docks, Stonewatch Fort and Eastgate Pass ---------- */
THEMES.ironvale={...THEMES.quarry,fog:'rgba(70,50,40,.2)',fog2:'rgba(90,60,40,.08)',ray:'255,170,100',rayA:1.2,amb:'ember',vig:'8,4,2'};
THEMES.peaks={...THEMES.plains,ramps:{...THEMES.plains.ramps,far:R(['#3a4250','#4e5868','#687486','#8a96a6','#b0bac6','#d8dee6','#f4f6f8'])},fog:'rgba(200,210,220,.1)',fog2:'rgba(230,236,240,.05)',ray:'240,246,255',rayA:1.3,amb:'mote',vig:'4,4,6'};
THEMES.blackgate={...THEMES.under,fog:'rgba(40,30,30,.26)',ray:'255,140,80',rayA:.7,vig:'6,2,2'};
THEMES.docks={...THEMES.river,fog:'rgba(150,170,190,.12)',ray:'255,236,200',rayA:1.3};
THEMES.stonewatch={...THEMES.siege,fog:'rgba(120,120,130,.14)',ray:'240,230,210',rayA:1.2,amb:'mote',vig:'4,4,6'};
Object.assign(WX,{ironvale:['clear','clear','rain'],granite:['clear','clear','clear','rain'],blackgate:['clear'],rivermere:['clear','clear','rain'],stonewatch:['clear','rain','clear']});
/* materials: silver and coal from the sheet */
Object.assign(RES,{silver:{n:'Silver Ore',c:'#d8dce4',d:'mining'},coal:{n:'Coal',c:'#4a4a52',d:'mining'}});
const _bns=buildNodeArt;buildNodeArt=function(){_bns();
  NODE_SPR.silver=NODE_SPR.ore.map(c=>recolor(c,(r,g,b)=>{const l=(r+g+b)/3;return Math.abs(r-g)<30&&Math.abs(g-b)<30?[Math.min(255,l*1.35),Math.min(255,l*1.38),Math.min(255,l*1.5)]:null}));
  NODE_SPR.coal=NODE_SPR.ore.map(c=>recolor(c,(r,g,b)=>{const l=(r+g+b)/3;return[l*.45,l*.45,l*.5]}))};
RECIPES.push({id:'silvblade',d:'smith',r:3,n:'Silversteel Blade',make:['weapon','katana'],need:{silver:2,ore:2,coal:1}},
  {id:'silvcharm',d:'smith',r:2,n:'Silver Ward Charm',make:['charm'],need:{silver:2,coal:1}},
  {id:'coalplate',d:'smith',r:4,n:'Blackwheel Plate',make:['chest'],need:{ore:5,coal:3,hide:1}},
  {id:'silvspear',d:'smith',r:3,n:'Silver-tipped Spear',make:['weapon','spear'],need:{silver:2,timber:2,coal:1}});
/* creatures */
Object.assign(MOBS,{
  mtngoat:{name:'Mountain Goat',kind:'quad',ai:'lunger',passive:1,hp:60,atk:9,exp:14,w:18,h:18,spd:44,shard:[2,4],aggro:80},
  rockhound:{name:'Rock Hound',kind:'quad',ai:'lunger',hp:68,atk:11,exp:17,w:22,h:14,spd:42,shard:[2,5],aggro:130},
  cliffstrider:{name:'Cliff Strider',kind:'quad',ai:'lunger',hp:70,atk:12,exp:18,w:18,h:26,spd:50,shard:[2,5],aggro:150},
  cavedrake:{name:'Cave Drake',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:560,atk:14,w:40,h:30,exp:360,spd:42,shard:[34,54],aggro:200,resp:90},
  ironhide:{name:'Ironhide Golem',kind:'gen',ai:'lunger',elite:1,bb:1,hp:950,atk:15,exp:460,w:26,h:46,spd:12,shard:[40,60],aggro:170,resp:100}});
const SBK=['mtngoat','rockhound','cliffstrider','cavedrake','ironhide'];for(const k of SBK)MOBS[k].base1=1;
Object.assign(GEAR,{
  mtngoat:GS('Mountain Goat',['#d8d0c0','#8a8070','#efe8d8','#4a3a2a','#a8302a'],{n:'Curled-Horn Helm',s:'horns'},{n:'Goatwool Coat',s:'leather'},'Wool Mittens','Cliffhoof Boots',{n:'Goat Bell',s:'coin'},{spear:'Ridge Spear',hammer:'Ramhorn Maul'}),
  rockhound:GS('Rock Hound',['#6a625a','#3e3a34','#8a8276','#ffb04a','#4a4440'],{n:'Gravel Hood',s:'pelt'},{n:'Slatehide Vest',s:'leather'},'Gravel Claws','Rockpad Boots',{n:'Hound Flint',s:'fang'},{daggers:'Flint Fangs',axe:'Hound Hatchet'}),
  cliffstrider:GS('Cliff Strider',['#8a6a3a','#4a3a24','#b08a52','#e8dcc0','#3a6a5a'],{n:'Strider Crest',s:'feather'},{n:'Ridgerunner Vest',s:'leather'},'Grip Talons','Strider Boots',{n:'Strider Claw',s:'fang'},{spear:'Strider Pike',bow:'Ridge Bow'}),
  cavedrake:{...GS('Cave Drake',['#3a3a42','#1e1e24','#5a5a66','#ff8a3a','#ffd27a'],{n:'Cave Drake Helm',s:'horns'},{n:'Drakeslate Mail',s:'plate'},'Drakeslate Talons','Cave Drake Greaves',{n:'Ember Gizzard Stone',s:'core'},{katana:'Drakefang',spear:'Cavewing Lance',bow:'Ashwing Bow'}),drop:1,drops:2},
  ironhide:{...GS('Ironhide',['#5a5e66','#2e3036','#8a8e98','#ff9a4a','#c84a3a'],{n:'Ironhide Helm',s:'visor'},{n:'Ironhide Plate',s:'plate'},'Ironhide Gauntlets','Ironhide Sabatons',{n:'Golem Core',s:'core'},{hammer:'Golemfist Maul',shield:'Ironhide Bulwark',axe:'Rivetsplitter'}),drop:1,drops:2}});
for(const k of SBK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.mtngoat={cw:32,ch:28,cx:13,len:15,bh:9,leg:8,lw:2,c:['#4a4238','#d8d0c0','#efe8d8','#a89e8c','#1a1210'],head:'none',tail:'stub',extra:(P,Rc,o)=>{
  const hx=Math.round(o.cx+o.L/2),hy=Math.floor(o.cy-o.bh/2)-3+(o.mode==='lunge'?3:0);Rc(hx-1,hy,5,5,'#d8d0c0');Rc(hx+3,hy+2,2,3,'#c8c0b0');P(hx+2,hy+1,'#1a1210');for(let i=0;i<3;i++)P(hx+4,hy+5+i,'#a89e8c');
  for(let i=0;i<6;i++){const a=Math.PI*(.9+i*.25);P(hx+1+Math.round(Math.cos(a)*3),hy-1+Math.round(Math.sin(a)*3),i<3?'#6a5e4c':'#4a4238')}for(let x=Math.floor(o.cx-o.L/2);x<o.cx+o.L/2;x+=3)P(x,o.cy+Math.floor(o.bh/2),'#efe8d8')}};
QUAD.rockhound={...QUAD.wolf,c:['#2a2622','#5a544c','#7a7268','#9a9284','#ffb04a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<4;i++){const x=Math.round(o.cx-o.L/2+3+i*4);Rc(x,top-2,3,3,'#8a8276');P(x,top-2,'#a8a094');P(x+2,top,'#3e3a34')}P(Math.round(o.cx+o.L/2+2),o.cy-3,'#ffb04a')}};
QUAD.cliffstrider={cw:36,ch:38,cx:15,len:12,bh:8,leg:12,lw:2,c:['#2a2014','#8a6a3a','#b08a52','#5a4424','#ffd27a'],head:'none',tail:'long',extra:(P,Rc,o)=>{
  const nx=Math.round(o.cx+o.L/2-1),ny=Math.floor(o.cy-o.bh/2),lu=o.mode==='lunge'?4:o.mode==='wind'?-2:0;for(let k=0;k<8;k++)Rc(nx+Math.round(k*.5)+(k>5?lu:0),ny-k,3,1,k<4?'#8a6a3a':'#b08a52');
  const hx=nx+4+lu,hy=ny-10;Rc(hx,hy,7,3,'#b08a52');Rc(hx+5,hy+2,3,1,'#8a6a3a');P(hx+3,hy,'#ffd27a');P(hx+3,hy+1,'#1a1210');if(lu>0)for(let k=0;k<3;k++)P(hx+5+k,hy+3,'#efe4c8');
  for(let k=0;k<4;k++)P(hx+1-k,hy-1-(k%2),'#3a6a5a');for(let x=Math.floor(o.cx-o.L/2);x<o.cx+o.L/2;x+=2)P(x,ny,'#5a4424')}};
const IRONHIDE={h:44,tw:9,lw:5,leg:['#3e4048','#4e525a'],boot:'#26282e',body:['#3e4048','#5a5e66','#7a7e88'],skin:['#3e4048','#6a6e78','#8a8e98'],eye:'#ff9a4a',
  hat:(P,Rc,hx,hy)=>{Rc(hx-4,hy-2,9,2,'#4e525a');P(hx-4,hy-3,'#8a8e98');P(hx+4,hy-3,'#8a8e98')},
  hand:(P,Rc,x,y,mode)=>{Rc(x-3,y-1,7,6,'#4e525a');Rc(x-2,y,5,4,'#6a6e78');if(mode==='wind')P(x,y-2,'#ffd27a')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(const[dx,dy]of[[-6,10],[6,10],[-6,18],[6,18],[0,14],[-3,24],[3,24]])P(x+dx,hy+dy+b,'#a8aab2');for(let i=0;i<5;i++)P(x-2+i,hy+14+b,mode==='wind'?'#ffd27a':'#ff7a3a');Rc(x-1,hy+13+b,3,3,'#ff9a4a')}};
const _brb=buildRoster;buildRoster=function(){_brb();
  const toCave=(r,g,b)=>{const l=(r+g+b)/3;return b>r+8?[l*.75,l*.72,l*.78]:null},D=MSP.drake,sc=c=>scale2(recolor(c,toCave));
  MSP.cavedrake={kind:'fly',ax:D.ax*2,ay:D.ay*2,fl:D.fl.map(sc),ch:sc(D.ch),F:{fl:D.F.fl.map(c=>scale2(c)),ch:scale2(D.F.ch)}};
  const o={kind:'gen',ax:22,ay:52,fps:2.5},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=humanoid(48,54,22,IRONHIDE,md);F[md]=humanoid(48,54,22,IRONHIDE,md,1)}o.F=F;MSP.ironhide=o};
/* set dressing */
Object.assign(PROPS,{
  forgeworks(x,X,Y){const P=px3(x),S=R(['#2a2422','#3e3430','#544640','#6e5c52','#8a7666','#a8927e']);for(let y=0;y<64;y++)for(let k=-44;k<=44;k++){const door=Math.abs(k)<12&&y<30,win=(Math.abs(k+28)<5||Math.abs(k-28)<5)&&y>34&&y<48;
      P(X+k,Y-y,door?(y<26?[255,120,40+((k+y)%4)*10]:[60,40,30]):win?[255,170,80]:pick(S,.5-(k+44)/300+(y%8===0?.08:0),X+k,y))}
    for(let y=64;y<78;y++){const w=Math.round(48-(y-64)*2.6);for(let k=-w;k<=w;k++)P(X+k,Y-y,pick(S,.3,X+k,y))}for(const c of[-30,24])for(let y=64;y<110;y++)for(let j=-3;j<=3;j++)P(X+c+j,Y-y,pick(S,.35+j/12,X,y));
    for(let k=-9;k<=9;k++)P(X+k,Y-32,[40,30,26]);Z.glows.push([X,Y-14,34,'255,120,40'],[X-28,Y-41,14,'255,170,80'],[X+28,Y-41,14,'255,170,80'])},
  waterwheel(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;const r=30;for(let a=0;a<6.28;a+=.01){P(X+Math.round(Math.cos(a)*r),Y-r-Math.round(Math.sin(a)*r),W[2]);P(X+Math.round(Math.cos(a)*(r-2)),Y-r-Math.round(Math.sin(a)*(r-2)),W[4])}
    for(let i=0;i<12;i++){const a=i/12*6.28;for(let t=0;t<r;t++)P(X+Math.round(Math.cos(a)*t),Y-r-Math.round(Math.sin(a)*t),W[3]);for(let t=0;t<5;t++)P(X+Math.round(Math.cos(a)*(r+t)),Y-r-Math.round(Math.sin(a)*(r+t)),W[5])}},
  dock(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let k=-60;k<=60;k++){P(X+k,Y-1,W[4]);P(X+k,Y,W[2])}for(let k=-60;k<=60;k+=12)for(let y=0;y<22;y++){P(X+k,Y+y,W[1]);P(X+k+1,Y+y,W[3])}
    for(let k=20;k<44;k++)for(let y=2;y<10;y++)P(X+k,Y-y,y===9?[110,70,40]:[140,90,50]);for(let y=10;y<40;y++)P(X+32,Y-y,W[3]);for(let y=14;y<36;y++)for(let k=33;k<33+Math.round((y-14)*.6);k++)P(X+k,Y-y,[220,210,180])},
  bridgegate(x,X,Y){const P=px3(x),S=TH.rock;for(let y=0;y<80;y++)for(let k=-40;k<=40;k++){const arch=Math.abs(k)<16&&y<40&&(k*k)/256+((y-24)*(y-24))/256<1.6||Math.abs(k)<16&&y<24;if(arch)continue;P(X+k,Y-y,pick(S,.55-(k+40)/260+(y%9===0?.1:0),X+k,y))}
    for(let k=-44;k<=44;k+=8)for(let y=80;y<88;y++)for(let j=0;j<5;j++)P(X+k+j,Y-y,pick(S,.7,X+k,y));for(const c of[-28,28])for(let y=44;y<64;y++)for(let j=-3;j<=3;j++)P(X+c+j,Y-y,(y+j)%4?[47,78,134]:[36,60,110]);Z.glows.push([X,Y-20,18,'255,200,120'])},
  minecart(x,X,Y){const P=px3(x),M=R(['#22262a','#3a3e44','#585e66','#7a828a']);for(let k=-40;k<=40;k++){P(X+k,Y-1,M[2]);if(k%6===0)for(let j=-1;j<=1;j++)P(X+k+j,Y,[80,56,36])}for(let y=3;y<14;y++)for(let k=-10;k<=10;k++)P(X+k,Y-y,y===13?M[3]:pick(M,.4,X+k,y));for(let k=-8;k<=8;k++)P(X+k,Y-14,k%3?[30,30,34]:[60,60,66]);for(const c of[-6,6]){P(X+c,Y-2,M[0]);P(X+c,Y-1,M[1])}}});
/* zones */
const SBZ=zIdx('stonebridge'),IVI=ZONES.length,GPI=IVI+1,BGI=IVI+2,RVI=IVI+3,SWI=IVI+4;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Iv={id:'ironvale',name:'Ironvale',ch:'Stonebridge',theme:'ironvale',safe:1,lv:[11,11],req:10,ww:1600,start:70,
  seg:[[0,1600,250],[880,200,196,'plank']],mobs:[],portals:[{x:22,to:SBZ,tx:760},{x:1578,to:GPI,tx:70}],npcs:['brann','tilda'],
  labels:[[300,'Ironvale',100],[700,'The Blackwheel Forges',110],[1420,'Granite Peaks',78]],props:[['gatewall',120],['banner',260],['forgeworks',700],['crates',920],['minecart',1060],['crane',1220],['banner',1380]],trees:[]};
 const Gp={id:'granite',name:'Granite Peaks',ch:'Stonebridge',theme:'peaks',lv:[12,13],req:11,ww:1900,start:70,
  seg:[[0,420,250],[420,300,232],[720,300,214],[1020,300,232],[1320,580,250],[560,90,196,'f'],[860,90,178,'f'],[1160,90,196,'f']],
  mobs:[['mtngoat',0,240],['mtngoat',1,520],['rockhound',2,820],['cliffstrider',2,920],['stoneboar',3,1120],['rockhound',4,1420],['cliffstrider',4,1560],['mtngoat',4,1700]],
  portals:[{x:22,to:IVI,tx:1560},{x:1878,to:BGI,tx:70}],npcs:[],labels:[[860,'The High Ledge',150],[1860,'Blackgate Pass',78]],
  props:[['cairn',200],['pillar',600],['cairn',870],['stoneblocks',1200],['cairn',1500],['sign',1780]],trees:[]};
 const Bg={id:'blackgate',name:'Blackgate Pass',ch:'Stonebridge',theme:'blackgate',lv:[13,14],req:12,ww:1700,start:70,
  seg:[[0,500,250],[500,400,262],[900,400,250],[1300,400,256],[620,100,216,'plank'],[1040,100,212,'plank']],
  mobs:[['rockhound',0,320],['rockhound',1,640],['cliffstrider',2,1000],['rockhound',2,1150],['cliffstrider',3,1380],['cavedrake',-2,1560]],
  portals:[{x:22,to:GPI,tx:1860}],npcs:[],labels:[[800,'The Old Toll Tunnel',80],[1540,'Drake’s Gullet',90]],
  props:[['scaff',200],['minecart',500],['vent',760],['railcart',980],['barricade',1240],['vent',1440]],trees:[]};
 const Rv={id:'rivermere',name:'Rivermere Docks',ch:'Stonebridge',theme:'docks',safe:1,lv:[10,10],req:9,ww:1500,start:70,
  seg:[[0,560,250],[560,940,294,'bed'],[540,18,272,'stone']],pools:[{x0:560,x1:1500,y:262}],mobs:[],
  portals:[{x:22,to:SBZ,tx:1420},{x:520,to:SWI,tx:70}],npcs:['odalys','merrick'],
  labels:[[240,'Rivermere Docks',100],[520,'Stonewatch Fort',78],[900,'Trade Pier',60]],props:[['stall',150],['crates',260],['cart',360],['waterwheel',640],['dock',800],['dock',1180],['crates',1300]],trees:[]};
 const Sw={id:'stonewatch',name:'Stonewatch Fort',ch:'Stonebridge',theme:'stonewatch',lv:[14,15],req:13,ww:1900,start:70,
  seg:[[0,600,250],[600,500,240],[1100,800,250],[160,200,186,'plank']],
  mobs:[['rockhound',1,760],['cliffstrider',1,900],['rockhound',2,1180],['stoneboar',2,1320],['rockhound',2,1480],['cliffstrider',2,1600],['ironhide',2,1760]],
  portals:[{x:22,to:RVI,tx:520}],npcs:['halvard'],labels:[[260,'Stonewatch Fort',130],[1100,'The Frontier Road',70],[1760,'Eastgate Pass',110]],
  props:[['gatewall',200],['banner',360],['siegetent',460],['depot',560],['barricade',700],['cairn',1300],['bridgegate',1760]],trees:[]};
 const NN={ironvale:[],granite:[['ore',300],['silver',780],['coal',1100],['silver',1460],['ore',1680]],blackgate:[['coal',420],['silver',880],['coal',1100],['shard',1340]],rivermere:[['fish',900],['fish',1250]],stonewatch:[['ore',980],['coal',1400]]};
 for(const z of[Iv,Gp,Bg,Rv,Sw]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Iv.stations=[{x:700+EDGE,k:'forge',n:'The Blackwheel Forges'}];Sw.stations=[{x:400+EDGE,k:'cook',n:'Garrison Mess'}];Rv.stations=[{x:420+EDGE,k:'cook',n:'Dockside Galley'}];
 const B=ZONES[SBZ];B.portals.push({x:760+EDGE,to:IVI,tx:70+EDGE},{x:1420+EDGE,to:RVI,tx:70+EDGE});(B.labels=B.labels||[]).push([760+EDGE,'Ironvale',78],[1420+EDGE,'Rivermere Docks',78])}
{const q=ZONES[zIdx('quarry')];q.name='The Deepcut Quarry';QUESTS&&Object.values(QUESTS).forEach(Q=>{for(const k of['where','desc','offer'])if(typeof Q[k]==='string')Q[k]=Q[k].replace(/Stonebridge Quarry/g,'the Deepcut Quarry')})}
Object.assign(MAPXY,{ironvale:[35,92],granite:[44,94],blackgate:[52,95],rivermere:[26,84],stonewatch:[18,90]});WAYS.ironvale=200;WAYS.stonewatch=300;
/* people */
Object.assign(NPCS,{
  brann:{name:'Forgemaster Brann',title:'The Blackwheel Forges',x:620+EDGE,cls:'guard',look:{sex:0,build:2,face:5,hair:0,hairC:1,beard:5,skin:3,eye:0,outfit:2},eq:{head:'raider',chest:'gd_start'},
    lines:['Fire, craft and mastery. Mostly fire.','Ironvale makes the iron. Stonebridge takes the credit.','Bring me coal and I will make you something worth dying in.']},
  tilda:{name:'Engineer Tilda',title:'Ironvale',x:1000+EDGE,cls:'gatherer',look:{sex:1,build:1,face:2,hair:5,hairC:4,beard:0,skin:1,eye:2,outfit:3},eq:{head:'ga_start',chest:'ga_start'},
    lines:['People build more than structures here. They build possibilities.','The lift needs a new chain. The chain needs silver. The silver needs you.','If it moves and shouldn’t, I fix it. If it doesn’t and should, I fix that too.']},
  odalys:{name:'Dockmaster Odalys',title:'Rivermere Docks',x:220+EDGE,cls:'traveler',look:{sex:1,build:2,face:3,hair:1,hairC:2,beard:0,skin:4,eye:0,outfit:2},eq:{head:'tv_start',chest:'tv_start'},
    lines:['Commerce across the Reach. Every barrel, every bolt of cloth.','The river does not care who you are. Neither do I, if you pay your berth.','Stonewatch is up the bank road. Bring them fish; soldiers always forget to.']},
  merrick:{name:'Merrick the Factor',title:'Rivermere Docks',x:330+EDGE,cls:'ronin',look:{sex:0,build:1,face:1,hair:3,hairC:6,beard:1,skin:0,eye:1,outfit:1},eq:{head:'s_start',chest:'r_start'},
    lines:['Silver up, coal steady, goat wool… do not ask about goat wool.','Everything has a price. Most things have two.','I buy what the mountains give up.']},
  halvard:{name:'Captain Halvard',title:'Stonewatch Fort',x:300+EDGE,cls:'guard',look:{sex:0,build:2,face:4,hair:2,hairC:7,beard:3,skin:2,eye:0,outfit:2},eq:{head:'gd_start',chest:'gd_start'},
    lines:['Stone endures. So do its people.','Defence on the frontier is nine parts waiting and one part terror.','Eastgate has held for two hundred years. I intend to keep the streak.']}});
Object.assign(BARKS,{brann:['More coal!','Mind the sparks.','Hot iron, cold hands.'],tilda:['Gears!','Nearly…','Who moved my wrench?'],odalys:['Berths open.','Mind the ropes.','Tide’s turning.'],merrick:['Fair prices!','Silver wanted.','Buying ore.'],halvard:['Eyes east.','Steady.','Hold the line.']});
Object.assign(LORE,{
  ivA:{z:'ironvale',x:540,k:'note',t:'Blackwheel Ledger',txt:'“Coal short again. Silver shorter. The Concordance wants plate for the frontier by spring. The forges want coal by Tuesday. Something has to give, and it will not be the forges.”'},
  gpA:{z:'granite',x:880,k:'stone',t:'Surveyor’s Cairn',txt:'“Granite Peaks: silver seams on the high ledge, coal below. Mind the striders. They hunt in pairs and they hunt from above.”'},
  bgA:{z:'blackgate',x:800,k:'note',t:'Toll Tunnel Notice',txt:'“Blackgate toll tunnel CLOSED by order of Stonewatch. Drake sighted in the Gullet. Travellers proceed at own risk, which is to say, do not proceed.”'},
  swA:{z:'stonewatch',x:1700,k:'stone',t:'Eastgate Foundation Stone',txt:'“Raised by the masons of Stonebridge, that the road east be kept. Here, effort becomes legacy.” Something heavy has scraped the stone recently, in a straight line.'}});
Object.assign(QUESTS,{
  iv1:{title:'Coal for Blackwheel',giver:'brann',lv:11,
    offer:'The forges are starving. Coal seams run all through Granite Peaks and the Blackgate tunnels. Mine me five and the fires stay lit another week.',
    desc:'Mine 5 Coal in Granite Peaks or Blackgate Pass.',goal:{t:'gather',res:'coal',n:5},where:'Granite Peaks and Blackgate Pass',prog:'Dark seams in the rock.',
    done:'Good black coal. The Blackwheel thanks you. Use the forge whenever you like; my silver recipes are yours.',reward:{exp:120,sh:30}},
  iv2:{title:'The Silver Chain',giver:'tilda',lv:12,
    offer:'The ore lift has a cracked chain. Iron cracks in the cold; silver alloy doesn’t. Bring me four silver ore from the high ledges and I’ll cast a new one.',
    desc:'Mine 4 Silver Ore.',goal:{t:'gather',res:'silver',n:4},where:'Granite Peaks, the High Ledge',prog:'Bright seams on the high ground.',
    done:'Beautiful. The lift will run by nightfall. Ironvale owes you.',reward:{exp:150,sh:35}},
  iv3:{title:'Strays on the Lift',giver:'tilda',lv:12,
    offer:'Mountain goats keep wandering onto the ore lift. The miners love them, I don’t. Bring me four tufts of goat wool and I’ll pad the lift guards so nobody gets hurt. Goats included.',
    desc:'Collect 4 Goat Wool from Mountain Goats.',goal:{t:'collect',mob:'mtngoat',item:'Goat Wool',n:4,p:.6},where:'Granite Peaks',prog:'They graze the low slopes.',
    done:'Soft as anything. The goats can keep their dignity and their legs.',reward:{exp:130,sh:30}},
  gp1:{title:'Striders from Above',giver:'brann',pre:'iv1',lv:13,
    offer:'Cliff striders have been dropping on the coal carts from the ledges. Two of my haulers are laid up. Bring down six.',
    desc:'Bring down 6 Cliff Striders.',goal:{t:'kill',mob:'cliffstrider',n:6,lab:'Cliff Striders brought down'},where:'Granite Peaks and Blackgate Pass',prog:'They hunt from the high ledges.',
    done:'My haulers will sleep easier. So will I.',reward:{exp:200,sh:40}},
  bg1:{title:'Drake’s Gullet',giver:'tilda',pre:'iv2',lv:14,
    offer:'The Blackgate toll tunnel has been shut since a cave drake moved into the Gullet. Half our trade goes the long way round because of it. You have seen what you can do. Open the tunnel.',
    desc:'Defeat the Cave Drake in Drake’s Gullet.',goal:{t:'kill',mob:'cavedrake',n:1,lab:'Cave Drake defeated'},where:'Drake’s Gullet, east Blackgate Pass',prog:'At the far end of the tunnels.',
    done:'The tunnel’s open! Caravans will be through by morning. Do you know how much faster that makes everything? I do. I calculated it.',reward:{exp:480,sh:80}},
  rd1:{title:'Fish for the Fort',giver:'odalys',lv:10,
    offer:'Stonewatch always forgets to order food until the soldiers start eating their boots. Catch four fish off the pier and take them to Captain Halvard.',
    desc:'Catch 4 Fish at Rivermere Docks.',goal:{t:'gather',res:'fish',n:4},where:'Rivermere Docks, the Trade Pier',to:'halvard',prog:'Cast off the Trade Pier.',
    done:'Fish? From Odalys? She says that every month and every month she is right. Thank you.',reward:{exp:110,sh:25}},
  rd2:{title:'A Factor’s Favour',giver:'merrick',lv:11,
    offer:'Rock hound hides fetch a fine price in the south. The hounds fetch a fine price in blood. Bring me four hides and we will both come out ahead.',
    desc:'Collect 4 Rock Hound Hides.',goal:{t:'collect',mob:'rockhound',item:'Rock Hound Hide',n:4,p:.6},where:'Granite Peaks, Blackgate Pass, Stonewatch',prog:'Wherever the hounds run.',
    done:'Splendid. A little bloodied. That adds character, and ten percent.',reward:{exp:140,sh:45}},
  sw1:{title:'Hounds at the Wall',giver:'halvard',lv:14,
    offer:'Rock hounds have been testing the frontier road all season. They are not hungry, they are pushed. Something big is moving out by Eastgate. Clear eight of them and I will send a patrol.',
    desc:'Clear 8 Rock Hounds near Stonewatch Fort.',goal:{t:'kill',mob:'rockhound',n:8,zone:'stonewatch',lab:'Rock hounds cleared'},where:'The Frontier Road, Stonewatch',prog:'Along the frontier road.',
    done:'Good. The patrol is ready. And they found what was pushing the hounds. You will not like it.',reward:{exp:240,sh:45}},
  sw2:{title:'The Ironhide',giver:'halvard',pre:'sw1',lv:15,
    offer:'An ironhide golem. Old masonry war-engine, from before the Gatefall. Something woke it, and it is walking the Eastgate Pass toward my wall in a perfectly straight line. Stop it before it arrives.',
    desc:'Stop the Ironhide Golem at Eastgate Pass.',goal:{t:'kill',mob:'ironhide',n:1,lab:'Ironhide Golem stopped'},where:'Eastgate Pass, far east of Stonewatch',prog:'It walks the pass toward the fort.',
    done:'Two hundred years, Eastgate has held. Two hundred and one, now. Stonebridge will hear of this; I will make sure of it.',reward:{exp:600,sh:100}}});
