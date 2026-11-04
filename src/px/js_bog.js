/* ---------- Marrowbog, expanded to its sheet: Mudcarver Village, the Grasping Reeds, Fenwatch Outpost, Veilfen Hollows, Rotmire Deep and the Sinking Spire ---------- */
const BGT=THEMES.bog;
THEMES.mudcarver={...BGT,fog:'rgba(70,60,40,.22)',ray:'255,200,130',rayA:1.2,amb:'mote'};
THEMES.reeds={...BGT,ramps:{...BGT.ramps,far:R(['#141a10','#1e2616','#2a341c','#384624','#4a5a2e','#5e7038','#788a46'])},fog:'rgba(90,100,60,.2)',ray:'230,240,180',rayA:1};
THEMES.fenwatch={...BGT,fog:'rgba(60,70,70,.24)',ray:'220,230,220',rayA:1,amb:'mote'};
THEMES.veilfen={...BGT,ramps:{...BGT.ramps,far:R(['#120a1a','#1c1028','#281838','#36204a','#462a5e','#583676','#70469a'])},fog:'rgba(110,50,150,.24)',fog2:'rgba(140,80,190,.1)',ray:'200,150,255',rayA:1.2,amb:'mote',vig:'6,0,10'};
THEMES.rotmire={...BGT,ramps:{...BGT.ramps,far:R(['#0a100c','#101a12','#16241a','#1e3022','#283e2c','#344e36','#445e42'])},canopy:'none',top:[150,60],fog:'rgba(30,60,40,.3)',fog2:'rgba(50,90,60,.12)',ray:'150,220,170',rayA:.8,vig:'0,6,2'};
Object.assign(WX,{mudcarver:['clear','rain','clear'],grasping:['clear','rain','rain'],fenwatch:['clear','rain'],veilfen:['clear','clear'],rotmire:['rain','rain','clear']});
/* materials from the sheet */
Object.assign(RES,{mirereed:{n:'Mire Reed',c:'#a8a060',d:'herbalism',reg:'marrowbog'},cinderbloom:{n:'Cinderbloom',c:'#e05a3a',d:'herbalism',reg:'marrowbog'},sporesack:{n:'Spore Sack',c:'#8a6ab0',d:'herbalism',reg:'marrowbog'},witherroot:{n:'Witherroot',c:'#7a5a4a',d:'logging',reg:'marrowbog'}});
Object.assign(MAT_BASE,{mirereed:['herb','#a8a060'],cinderbloom:['herb','#e05a3a'],sporesack:['mush','#8a6ab0'],witherroot:['timber','#7a5a4a']});
RECIPES.push({id:'reedvest',d:'leather',r:4,n:'Mire-reed Vest',set:'mirecraft',make:['chest'],need:{mirereed:3,hide:2},prop:'Woven mire reed over leather. Floats, insulates, does not rot.',add:{mp:.4},tune:{hp:1.1}},
  {id:'cinderdraught',d:'alchemy',r:4,n:'Cinderbloom Draught',use:'vigor',need:{cinderbloom:2,herb:1},desc:'Cinderbloom: heat resistance and purification. Doubles MP recovery for 2 minutes.'},
  {id:'sporepoultice',d:'alchemy',r:5,n:'Spore Poultice ×3',use:'pots3',need:{sporesack:2,boglotus:1},desc:'Spore sacks, carefully, with bog lotus. Three tonics. Wash your hands.'},
  {id:'withercharm',d:'wood',r:5,n:'Witherroot Fetish',set:'mirecraft',make:['charm'],need:{witherroot:2,veilcap:1},prop:'Witherroot: a ritual material. It remembers what it was tied to.',add:{atk:.5}},
  {id:'witherstaff',d:'wood',r:5,n:'Witherroot Staff',set:'mirecraft',make:['weapon','staff'],need:{witherroot:3,fencrystal:1},prop:'Fen crystal bound in witherroot. Good for exorcism, better for necromancy.',add:{mp:.7}});
/* creatures: Marshstalker already walks the CrestHollow wetlands and comes home here */
Object.assign(MOBS,{
  bogleech:{name:'Bog Leech',kind:'quad',ai:'lunger',hp:58,atk:12,exp:16,w:24,h:10,spd:30,shard:[2,4],aggro:110},
  rotfenboar:{name:'Rotfen Boar',kind:'quad',ai:'lunger',hp:92,atk:14,exp:19,w:26,h:18,spd:34,shard:[2,5],aggro:120},
  mireshell:{name:'Mire Shell',kind:'quad',ai:'lunger',hp:140,atk:12,exp:20,w:28,h:16,spd:14,shard:[3,6],aggro:80},
  fenwraith:{name:'Fen Wraith',kind:'gen',ai:'lunger',elite:1,hp:420,atk:14,exp:240,w:16,h:34,spd:30,shard:[18,30],aggro:180,resp:90},
  hollowstag:{name:'Hollow Stag',kind:'quad',ai:'lunger',passive:1,elite:1,hp:420,atk:13,exp:220,w:24,h:30,spd:42,shard:[16,28],aggro:90,resp:90},
  sporehorror:{name:'The Spore Horror',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1200,atk:16,exp:900,w:44,h:96,spd:10,shard:[80,120],aggro:210,resp:120},
  bogleviathan:{name:'The Bog Leviathan',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:1300,atk:16,exp:1000,w:70,h:30,spd:34,shard:[90,130],aggro:230,resp:120}});
const BGK=['bogleech','rotfenboar','mireshell','fenwraith','hollowstag','sporehorror','bogleviathan'];for(const k of BGK)MOBS[k].base1=1;
Object.assign(GEAR,{
  bogleech:GS('Bog Leech',['#4a2a2a','#2a1414','#6a3a36','#d8a090','#a83a3a'],{n:'Leechskin Hood',s:'hood'},{n:'Slick Leech Vest',s:'leather'},'Sucker Gloves','Leech Boots',{n:'Leech Ring',s:'fang'},{daggers:'Bloodletters',tome:'Leechcraft Notes'}),
  rotfenboar:GS('Rotfen Boar',['#4a4a2a','#2a2a16','#6a6a3a','#c8d468','#8a3a2a'],{n:'Rotfen Tusk Helm',s:'horns'},{n:'Rotfen Hide',s:'leather'},'Rotfen Grips','Mudstomp Boots',{n:'Rotfen Tusk',s:'fang'},{axe:'Tuskcleaver',hammer:'Rotfen Maul'}),
  mireshell:GS('Mire Shell',['#3a4a2a','#1e2614','#5a6a3a','#c8b070','#6a3a2a'],{n:'Mireshell Helm',s:'visor'},{n:'Mireshell Plate',s:'plate'},'Mireshell Gauntlets','Mireshell Greaves',{n:'Mire Pearl',s:'core'},{shield:'Mireshell Bulwark',hammer:'Shellmaw Maul'}),
  fenwraith:{...GS('Fen Wraith',['#3a4a5a','#1e2630','#6a7a8a','#b8f0d8','#9bd04c'],{n:'Wraith Veil',s:'hood'},{n:'Fogwoven Shroud',s:'shroud'},'Wraith Wraps','Mistwalk Boots',{n:'Wraith Lantern',s:'lamp'},{tome:'Book of the Drowned',staff:'Fenlight Staff',daggers:'Mist Knives'}),drop:.6},
  hollowstag:{...GS('Hollow Stag',['#c8c0b0','#6a645a','#e8e0d0','#9bd04c','#1a1220'],{n:'Hollow Antler Crown',s:'antlers'},{n:'Bone-pale Mantle',s:'robe'},'Pale Gloves','Hollowstep Boots',{n:'Shed Hollow Tine',s:'crystal'},{staff:'Hollowtine Staff',bow:'Pale Antler Bow'}),drop:.5},
  sporehorror:{...GS('Spore Horror',['#5a3a6a','#2e1e38','#8a6aa0','#e8d0ff','#9bd04c'],{n:'Sporecrown',s:'mosscap'},{n:'Mycelial Carapace',s:'moss'},'Rootgrip Mitts','Mycelial Boots',{n:'Heart Spore',s:'core'},{tome:'The Spore Codex',staff:'Sporestalk Staff',hammer:'Fungal Maul'}),drop:1,drops:3},
  bogleviathan:{...GS('Bog Leviathan',['#2a3a2a','#141e14','#4a5a3a','#d8e8a0','#e0c050'],{n:'Leviathan Helm',s:'horns'},{n:'Leviathan Scale Mail',s:'plate'},'Leviathan Grips','Leviathan Greaves',{n:'Leviathan Scale',s:'scale'},{spear:'Deepmaw Lance',katana:'Bogtooth Blade',shield:'Leviathan Scale Aegis'}),drop:1,drops:3}});
for(const k of BGK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.bogleech={cw:36,ch:14,cx:16,len:22,bh:6,leg:1,lw:1,c:['#2a1414','#4a2a2a','#6a3a36','#2a1414','#d8a090'],head:'none',tail:'thin',extra:(P,Rc,o)=>{const cx=Math.round(o.cx),cy=Math.round(o.cy);
  for(let x=Math.floor(o.cx-o.L/2);x<o.cx+o.L/2;x+=3)for(let y=-2;y<=2;y++)P(x,cy+y,'#2a1414');const hx=cx+Math.round(o.L/2),op=o.mode==='lunge'?2:0;Rc(hx,cy-3,3,6,'#6a3a36');
  for(let y=-2;y<=2;y++)P(hx+3+op,cy+y,y===0?'#1a0a0a':'#d8a090');for(let i=0;i<4;i++)P(cx-8+i*5,cy-3,'#a83a3a')}};
QUAD.rotfenboar={...QUAD.boar,c:['#1e1e10','#4a4a2a','#6a6a3a','#2a2a16','#c8d468'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<5;i++){const x=Math.round(o.cx-o.L/2+3+i*3.5);P(x,top-1,'#d8d0b8');P(x,top-2,'#d8d0b8');P(x,top-3,'#a8a090')}
  for(const[dx,dy]of[[-5,1],[0,-1],[5,2]]){P(o.cx+dx,o.cy+dy,'#9bd04c');P(o.cx+dx+1,o.cy+dy,'#c8d468')}}};
QUAD.mireshell={cw:44,ch:24,cx:19,len:22,bh:6,leg:3,lw:3,c:['#1e2614','#3a4a2a','#5a6a3a','#1e2614','#c8b070'],head:'none',tail:'stub',extra:(P,Rc,o)=>{turtleX('#3a4a2a','#1e2614','#6a8a3a','#5a6a3a')(P,Rc,o);
  const cx=Math.round(o.cx),cy=Math.round(o.cy)-2,hx=cx+13+(o.mode==='lunge'?3:0);if(o.mode==='lunge'||o.mode==='wind')for(let k=0;k<4;k++){P(hx+1+k,cy-2,'#f2e6c8');P(hx+1+k,cy+2,'#f2e6c8')}
  for(const dx of[-8,-2,4,9])for(let y=0;y<3;y++)P(cx+dx,cy-6-y+Math.abs(dx)/3,'#4c8a30')}};
QUAD.hollowstag={...QUAD.rotstag,c:['#4a4440','#c8c0b0','#e8e0d0','#8a8276','#9bd04c'],extra:(P,Rc,o)=>{for(let i=0;i<4;i++){const x=Math.round(o.cx-o.L/2+3+i*4);P(x,o.cy-1,'#4a4440');P(x,o.cy+1,'#4a4440')}P(Math.round(o.cx+o.L/2+3),o.cy-6,'#9bd04c')}};
const WRAITH={h:30,tw:4,lw:1,leg:['rgba(0,0,0,0)','rgba(0,0,0,0)'],boot:'rgba(0,0,0,0)',body:['#2a3a48','#4a5a6a','#6a7a8a'],skin:['#3a4a5a','#6a7a8a','#9aaab8'],eye:'#b8f0d8',
  hat:(P,Rc,hx,hy)=>{for(let i=-4;i<=4;i++)for(let j=0;j<4;j++)if(Math.abs(i)+j<6)P(hx+i,hy-1+j-(Math.abs(i)>2?0:1),'#2a3a48')},
  hand:(P,Rc,x,y,mode)=>{Rc(x-1,y-1,3,3,'#b8f0d8');if(mode==='wind')P(x,y-2,'#ffffff')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let y=hip;y<g;y++){const w=Math.max(0,5-Math.floor((y-hip)/2));for(let k=-w;k<=w;k++)if((k+y)%3)P(x+k,y+b,'#4a5a6a')}for(let i=0;i<5;i++)P(x-6+i*3,hy+8+(i%2)*6,'#b8f0d8')}};
const SPOREH={h:46,tw:9,lw:4,leg:['#3a2a44','#4a3656'],boot:'#2a1e30',body:['#3a2a44','#5a3a6a','#8a6aa0'],skin:['#4a3656','#7a5a8a','#a888c0'],eye:'#c8f070',
  hat:(P,Rc,hx,hy)=>{for(let i=-9;i<=9;i++){const h=Math.round(Math.sqrt(1-(i*i)/81)*6);for(let j=0;j<h;j++)P(hx+i,hy-1-j,j===h-1?'#e8d0ff':(i+j)%4===0?'#e8d0ff':'#8a6aa0')}},
  hand:(P,Rc,x,y,mode)=>{Rc(x-3,y-1,6,5,'#5a3a6a');for(let k=0;k<3;k++)P(x-2+k*2,y-2,'#c8f070')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(const[dx,dy]of[[-6,12],[5,16],[-3,22],[6,26],[0,30],[-7,30]]){Rc(x+dx,hy+dy+b,3,3,'#8a6aa0');P(x+dx+1,hy+dy+b,'#e8d0ff')}
    if(mode==='wind')for(let i=0;i<10;i++)P(x-10+((i*7)%21),hy-8-((i*5)%10),'#c8f070')}};
const _brg=buildRoster;buildRoster=function(){_brg();const md=['walk0','walk1','wind','lunge'];
  {const o={kind:'gen',ax:14,ay:40,fps:3},F={};for(const m of md){o[m]=humanoid(30,42,14,WRAITH,m);F[m]=humanoid(30,42,14,WRAITH,m,1)}o.F=F;MSP.fenwraith=o}
  {const o={kind:'gen',ax:44,ay:104,fps:2},F={};for(const m of md){o[m]=scale2(humanoid(48,54,22,SPOREH,m));F[m]=scale2(humanoid(48,54,22,SPOREH,m,1))}o.F=F;MSP.sporehorror=o}
  const toBog=(r,g,b)=>{const l=(r+g+b)/3;return g>r||b>r?[l*.6,Math.min(255,l*.95),l*.5]:null},L=MSP.lakeserpent,sc=c=>scale2(recolor(c,toBog));
  MSP.bogleviathan={kind:'fly',ax:L.ax*2,ay:L.ay*2,fl:L.fl.map(sc),ch:sc(L.ch),F:{fl:L.F.fl.map(c=>scale2(c)),ch:scale2(L.F.ch)}}};
/* set dressing */
Object.assign(PROPS,{
  boardwalk(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let k=-50;k<=50;k++){P(X+k,Y-1,(k%7===0)?W[1]:W[4]);P(X+k,Y,W[2])}for(let k=-48;k<=48;k+=16)for(let y=1;y<18;y++){P(X+k,Y+y,W[1]);P(X+k+1,Y+y,W[2])}},
  bonearch(x,X,Y){const P=px3(x);for(let a=0;a<=Math.PI;a+=.01){for(let t=-2;t<=2;t++){const r=40+t,px=X+Math.round(Math.cos(a)*r),py=Y-Math.round(Math.sin(a)*r*1.5);P(px,py,t===0?[232,224,208]:[180,170,150])}}
    for(let i=1;i<8;i++){const a=i/8*Math.PI,px=X+Math.round(Math.cos(a)*40),py=Y-Math.round(Math.sin(a)*60);for(let k=0;k<5;k++)P(px,py+k,[200,190,170])}},
  warnstandard(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<56;y++){P(X,Y-y,W[1]);P(X+1,Y-y,W[3])}for(let y=30;y<54;y++)for(let k=2;k<16;k++){const tear=y<34&&(k%4===0);if(!tear)P(X+k,Y-y,[120,24,28])}
    for(let k=6;k<12;k++)for(let y=40;y<46;y++)if((k-9)*(k-9)+(y-43)*(y-43)<9)P(X+k,Y-y,[232,224,208])},
  swamphut(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-18,18])for(let y=0;y<22;y++)P(X+k,Y-y,W[1]);for(let y=22;y<48;y++)for(let k=-20;k<=20;k++){const win=Math.abs(k-8)<3&&y>30&&y<36;P(X+k,Y-y,win?[255,190,110]:pick(W,.4+((k+y)%6===0?-.1:0),X+k,y))}
    for(let y=48;y<66;y++){const w=Math.round(26-(y-48)*1.4);for(let k=-w;k<=w;k++)P(X+k,Y-y,(k*5+y)%4?[90,90,50]:[70,70,40])}Z.glows.push([X+8,Y-33,14,'255,190,110'])},
  sinkspire(x,X,Y){const P=px3(x),S=R(['#1e1a22','#2a2430','#3a3240','#4a4252','#5e5468']);for(let y=0;y<170;y++){const hw=Math.round(18-y*.08),tilt=Math.round(y*.12);for(let k=-hw;k<=hw;k++){const win=Math.abs(k)<3&&y%30>10&&y%30<20;P(X+k+tilt,Y-y,win?[180,255,200]:pick(S,.55-(k+hw)/(hw*5)+(y%15===0?.1:0),X+k,y))}}
    for(let y=170;y<196;y++){const w=Math.round(5-(y-170)*.2);for(let k=-w;k<=w;k++)P(X+k+20,Y-y,S[1])}Z.glows.push([X+6,Y-45,16,'180,255,200'],[X+12,Y-105,16,'180,255,200'])},
  veilrift(x,X,Y){const P=px3(x);for(let y=0;y<80;y++)for(let k=-14;k<=14;k++){const e=(k*k)/196+((y-40)*(y-40))/1600;if(e<1){const ed=e>.7;P(X+k,Y-y,ed?[200,150,255]:(k+y)%5?[60,20,90]:[120,60,170])}}Z.glows.push([X,Y-40,40,'170,100,255'])}});
/* zones */
const BOI=zIdx('bog'),MVI=ZONES.length,GRI=MVI+1,FWI=MVI+2,VFI=MVI+3,RMD=MVI+4;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Mv={id:'mudcarver',name:'Mudcarver Village',ch:'Marrowbog',theme:'mudcarver',safe:1,lv:[20,20],req:19,ww:1600,start:70,
  seg:[[0,1600,250],[420,200,206,'plank'],[900,200,206,'plank']],mobs:[],portals:[{x:22,to:BOI,tx:900},{x:1578,to:GRI,tx:70}],npcs:['grell','hesper'],
  labels:[[300,'Mudcarver Village',110],[1420,'The Grasping Reeds',78]],props:[['swamphut',180],['boardwalk',420],['swamphut',520],['warnstandard',720],['swamphut',1000],['fire',1160],['boardwalk',1300]],trees:[]};
 const Gr={id:'grasping',name:'The Grasping Reeds',ch:'Marrowbog',theme:'reeds',lv:[21,22],req:20,ww:1900,start:70,
  seg:[[0,400,250],[400,300,282,'bed'],[700,400,250],[1100,300,282,'bed'],[1400,500,250],[390,18,266,'stone'],[690,18,266,'stone'],[1090,18,266,'stone'],[1390,18,266,'stone'],[450,180,250,'plank'],[1150,180,250,'plank']],
  pools:[{x0:400,x1:700,y:262},{x0:1100,x1:1400,y:262}],
  mobs:[['bogleech',0,280],['marshstalker',1,560],['bogleech',2,820],['mireshell',2,980],['marshstalker',3,1250],['bogleech',4,1520],['mireshell',4,1700]],
  portals:[{x:22,to:MVI,tx:1560},{x:1878,to:FWI,tx:70}],npcs:[],labels:[[900,'The Grasping Reeds',90],[1860,'Fenwatch Outpost',78]],
  props:[['reeds',200],['reeds',360],['reeds',600],['warnstandard',760],['reeds',1000],['reeds',1300],['reeds',1600]],trees:[]};
 const Fw={id:'fenwatch',name:'Fenwatch Outpost',ch:'Marrowbog',theme:'fenwatch',lv:[22,23],req:21,ww:2000,start:70,
  seg:[[0,700,250],[700,400,282,'bed'],[1100,900,250],[690,18,266,'stone'],[1090,18,266,'stone'],[760,280,250,'plank'],[180,180,180,'plank']],pools:[{x0:700,x1:1100,y:262}],
  mobs:[['rotfenboar',2,1200],['bogleech',1,900],['rotfenboar',2,1400],['fenwraith',2,1600],['mireshell',2,1760],['bogleech',2,1880]],
  portals:[{x:22,to:GRI,tx:1860},{x:1978,to:VFI,tx:70},{x:560,to:RMD,tx:70}],npcs:['tamas'],labels:[[260,'Fenwatch Outpost',130],[560,'Rotmire Deep',78],[1960,'Veilfen Hollows',78]],
  props:[['watchtower',200],['banner',380],['siegetent',460],['warnstandard',640],['boardwalk',900],['bonearch',1500],['warnstandard',1800]],trees:[]};
 const Vf={id:'veilfen',name:'Veilfen Hollows',ch:'Marrowbog',theme:'veilfen',lv:[23,24],req:22,ww:1900,start:70,
  seg:[[0,600,250],[600,400,240],[1000,900,250],[680,90,200,'f']],
  mobs:[['fenwraith',0,360],['bogleech',0,520],['hollowstag',1,800],['rotfenboar',2,1080],['fenwraith',2,1260],['sporehorror',2,1700]],
  portals:[{x:22,to:FWI,tx:1960}],npcs:['ruel'],labels:[[900,'Veilfen Hollows',110],[1500,'The Thin Place',100],[1720,'The Withered Basin',150]],
  props:[['shroom',200],['bonearch',420],['shroom',620],['deadoak',1000],['veilrift',1500],['bonearch',1720]],trees:[]};
 const Rm={id:'rotmire',name:'Rotmire Deep',ch:'Marrowbog',theme:'rotmire',lv:[24,25],req:23,ww:1900,start:70,
  seg:[[0,400,250],[400,1200,290,'bed'],[390,18,270,'stone'],[1600,300,250],[1590,18,270,'stone'],[520,140,254,'plank'],[820,140,252,'plank'],[1120,140,254,'plank'],[1420,120,254,'plank']],
  pools:[{x0:400,x1:1600,y:262}],
  mobs:[['bogleech',0,260],['mireshell',1,600],['bogleech',1,900],['marshstalker',1,1100],['mireshell',1,1300],['bogleviathan',-2,1500]],
  portals:[{x:22,to:FWI,tx:560}],npcs:[],labels:[[900,'Rotmire Deep',100],[1700,'The Sinking Spire',210]],
  props:[['reeds',200],['deadoak',380],['reeds',760],['reeds',1240],['sinkspire',1720]],trees:[]};
 const NN={mudcarver:[],grasping:[['mirereed',260],['mirereed',800],['boglotus',1000],['mirereed',1560],['cinderbloom',1720]],fenwatch:[['witherroot',1300],['cinderbloom',1500],['bogstone',1840]],
   veilfen:[['sporesack',300],['veilcap',560],['sporesack',1120],['witherroot',1300],['fencrystal',1420]],rotmire:[['mirewood',300],['boglotus',600],['bogstone',1000],['cinderbloom',1700]]};
 for(const z of[Mv,Gr,Fw,Vf,Rm]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Mv.stations=[{x:640+EDGE,k:'alchemy',n:'Mudcarver Stillroom'},{x:1160+EDGE,k:'cook',n:'Village Firepit'}];Fw.stations=[{x:420+EDGE,k:'forge',n:'Outpost Armoury'}];
 const B=ZONES[BOI];B.portals.push({x:900+EDGE,to:MVI,tx:70+EDGE});(B.labels=B.labels||[]).push([900+EDGE,'Mudcarver Village',78])}
Object.assign(MAPXY,{mudcarver:[74,58],grasping:[82,56],fenwatch:[88,62],veilfen:[94,56],rotmire:[90,70]});WAYS.mudcarver=200;WAYS.fenwatch=300;
/* people */
Object.assign(NPCS,{
  grell:{name:'Headwoman Grell',title:'Mudcarver Village',x:300+EDGE,cls:'gatherer',look:{sex:1,build:2,face:5,hair:1,hairC:7,beard:0,skin:3,eye:0,outfit:3},eq:{head:'ga_start',chest:'ga_start'},
    lines:['A stubborn community. We carve our homes out of mud because the mud does not argue.','Not all that rots is lost. Some things simply wait.','Watch for unstable ground and hidden water. Mostly hidden water.']},
  hesper:{name:'Hesper the Mender',title:'Mudcarver Village',x:600+EDGE,cls:'aspirant',look:{sex:0,build:0,face:2,hair:3,hairC:2,beard:2,skin:1,eye:1,outfit:4},eq:{head:'as_start',chest:'as_start'},
    lines:['Disease and containment. Mostly containment.','Bog lotus for the fever, cinderbloom for the burn, and luck for the rest.','I heal what comes out of the bog. Some days that is a lot.']},
  tamas:{name:'Sergeant Tamas',title:'Fenwatch Outpost',x:300+EDGE,cls:'guard',look:{sex:0,build:2,face:3,hair:2,hairC:4,beard:3,skin:2,eye:0,outfit:2},eq:{head:'gd_start',chest:'gd_start'},
    lines:['Supplies, safety and observation. Two out of three on a good day.','The Veil is thin out east. The animals know it before we do.','Rotmire Deep is below us. Do not go swimming.']},
  ruel:{name:'Ruel the Veil-reader',title:'Veilfen Hollows',x:260+EDGE,cls:'necro',look:{sex:0,build:0,face:1,hair:6,hairC:0,beard:1,skin:0,eye:1,outfit:4},eq:{head:'wisp',chest:'n_start'},
    lines:['Where the Veil runs thin, the dead lean close to listen.','Necromancy, exorcism, restoration. Three answers to one question.','In the bog, every ending is a beginning.']}});
Object.assign(BARKS,{grell:['Mind the mud.','Stubborn, us.','Hold fast.'],hesper:['Wash your hands!','Fever again.','Breathe.'],tamas:['Eyes east.','Watch the water.','Steady.'],ruel:['It’s thin here.','Listen…','The Veil stirs.']});
Object.assign(LORE,{
  vfA:{z:'veilfen',x:1440,k:'stone',t:'The Thin Place',txt:'“Here the Veil is a curtain, not a wall. Things lean through. Some are lost. Some are hungry. Some only want to be remembered.”'},
  rmA:{z:'rotmire',x:1640,k:'note',t:'Spire Survey, Unfinished',txt:'“The Sinking Spire drops a hand’s width every year. Something below is pulling. The Fenwatch says it is the soil. The soil does not have teeth.”'},
  gwA:{z:'grasping',x:900,k:'stone',t:'Reed-cutter’s Mark',txt:'“Grasping Reeds: beauty that bites. Cut low, step high, and never sleep near the water.”'}});
Object.assign(QUESTS,{
  mc1:{title:'Mud and Welcome',giver:'grell',lv:20,
    offer:'Every newcomer earns their mud. Ours needs mire reed for the roofs before the rains. Bring me four bundles from the Grasping Reeds.',
    desc:'Gather 4 Mire Reed.',goal:{t:'gather',res:'mirereed',n:4},where:'The Grasping Reeds',prog:'Tall pale reeds along the water.',
    done:'Good reed. You cut it low, too. You can stay.',reward:{exp:200,sh:40}},
  mc2:{title:'Leeches in the Wells',giver:'grell',lv:21,
    offer:'Bog leeches crawl up the well shafts after rain. Hesper has her hands full. Clear eight of them out of the reeds where they breed.',
    desc:'Clear 8 Bog Leeches.',goal:{t:'kill',mob:'bogleech',n:8,lab:'Bog Leeches cleared'},where:'The Grasping Reeds and Fenwatch',prog:'They breed in the warm shallows.',
    done:'Clean water for a week. In Marrowbog, that’s a festival.',reward:{exp:260,sh:45}},
  mc3:{title:'Hesper’s Remedy',giver:'hesper',lv:21,
    offer:'The Fenwatch soldiers are coming in burned and blistered from the eastern fens. Cinderbloom cools a burn like nothing else. Bring three, and I can make enough for the outpost.',
    desc:'Gather 3 Cinderbloom.',goal:{t:'gather',res:'cinderbloom',n:3},where:'The Grasping Reeds, Fenwatch, Rotmire Deep',prog:'Red blooms that are warm to the touch.',
    done:'Perfect. I’ll send a crate east tonight. Learn the draught yourself; the rack is open to you.',reward:{exp:240,sh:40}},
  fw1:{title:'Rotfen Boars',giver:'tamas',lv:22,
    offer:'Rotfen boars have been charging the boardwalks. Rotten, angry, and too stupid to fall in. Thin them out: six.',
    desc:'Thin out 6 Rotfen Boars.',goal:{t:'kill',mob:'rotfenboar',n:6,lab:'Rotfen Boars thinned'},where:'Fenwatch Outpost and Veilfen Hollows',prog:'East of the outpost.',
    done:'The boardwalks will hold another season.',reward:{exp:300,sh:50}},
  fw2:{title:'Shells for the Wall',giver:'tamas',lv:23,
    offer:'Mire shell plates make better palisade facing than any timber. Hunt four mire shells and bring me their shed plates.',
    desc:'Collect 4 Mire Shell Plates.',goal:{t:'collect',mob:'mireshell',item:'Mire Shell Plate',n:4,p:.6},where:'Grasping Reeds, Fenwatch, Rotmire Deep',prog:'Slow, armoured, and bad-tempered.',
    done:'These will stop a boar and most of a wraith. Thank you.',reward:{exp:320,sh:50}},
  fw3:{title:'The Bog Leviathan',giver:'tamas',pre:'fw1',lv:25,
    offer:'Rotmire Deep, under the Sinking Spire. Something has been pulling it down for a hundred years. My scouts finally saw it: a leviathan in the deep water. It took two of them. End it.',
    desc:'Defeat the Bog Leviathan beneath the Sinking Spire.',goal:{t:'kill',mob:'bogleviathan',n:1,lab:'Bog Leviathan defeated'},where:'Rotmire Deep, under the Sinking Spire',prog:'Deep water, east end of Rotmire.',
    done:'The ground remembers every step. Today it will remember yours. The Spire might even stop sinking.',reward:{exp:1100,sh:150}},
  vf1:{title:'The Hollow Stag',giver:'ruel',lv:23,
    offer:'A hollow stag walks these hollows, half here, half through the Veil. It is not dangerous unless you make it so. Find it and watch it. If it is still mostly here, the Veil has not torn.',
    desc:'Find the Hollow Stag and watch it without harming it.',goal:{t:'event',id:'hollowwatch',n:1,lab:'Hollow Stag observed'},where:'The middle of Veilfen Hollows',prog:'On the raised ground in the middle of the Hollows.',
    done:'Mostly here. Good. That means we still have time.',reward:{exp:300,sh:40,sp:1}},
  vf2:{title:'The Spore Horror',giver:'ruel',pre:'vf1',lv:24,
    offer:'Something came through the Thin Place and took root. The Spore Horror. Every spore it sheds makes the Veil thinner. Bring it down, and then we must decide what to do with the Thin Place itself.',
    desc:'Defeat the Spore Horror at the Thin Place.',goal:{t:'kill',mob:'sporehorror',n:1,lab:'Spore Horror defeated'},where:'The Thin Place, east Veilfen Hollows',prog:'At the far east of the Hollows.',
    done:'It is done. The rift is still open. That is the real question.',reward:{exp:900,sh:120}},
  vf3:{title:'The Thin Place',giver:'ruel',pre:'vf2',lv:25,
    offer:'The rift is open and quiet, for now. I can cleanse it, which closes it forever. I can preserve it and study it, which is dangerous but teaches us much. Or I can bind it, and make something of it. Marrowbog has always been a place of choices. This one is yours.',
    desc:'Decide what happens to the Thin Place.',goal:{t:'talk',npc:'ruel'},where:'Ruel, in Veilfen Hollows',prog:'Tell Ruel what you decided.',
    done:'Then that is what it will be. The bog will remember.',
    choices:[{n:'Cleanse it',d:'Close the rift for good. Restoration and redemption. The hollows will heal.',flag:'veil_cleansed',reward:{exp:900,sh:120}},
      {n:'Preserve it',d:'Keep it open and study it. Investigation and knowledge, at a risk.',flag:'veil_preserved',reward:{exp:600,sp:1}},
      {n:'Bind it',d:'Shape it into a ward-stone. Necromantic influence, made useful.',flag:'veil_bound',reward:{item:['sporehorror','charm',2]}}],reward:{exp:500}}});
/* watching the Hollow Stag */
function hstagNear(){if(Z.id!=='veilfen')return null;const st=qSt('vf1');if(!st||st.s!=='a'||st.n>=1)return null;const m=S.mobs.find(m=>m.t==='hollowstag'&&!m.dead);if(m&&Math.abs(m.x-pl.x)<60&&!m.aggro)return{k:'hstag',m};return null}
const _cnh=crNear;crNear=function(){return hstagNear()||_cnh()};
const _cuh=crUse;crUse=function(n){if(n&&n.k==='hstag'){qEvent('hollowwatch');banner('The Hollow Stag','For a moment you can see through it. Then it is solid again');[392,494,587].forEach((f,i)=>setTimeout(()=>tone(f,.35,'sine',.04),i*170));return}return _cuh(n)};
const _clh=crLabel;crLabel=function(n){if(n&&n.k==='hstag')return'Watch quietly · Hollow Stag';return _clh(n)};
