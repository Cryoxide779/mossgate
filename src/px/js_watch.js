/* ---------- Old Watchtower, expanded to its sheet: Ravengate Crossing, Bastion Fields and the Memorial Plains, Graystone Holds, Sentinel Pass, Talonreach Outpost and the Shattered Vale ---------- */
const HTH=THEMES.heath;
THEMES.ravengate={...HTH,fog:'rgba(150,140,120,.12)',ray:'255,226,170',rayA:1.5,amb:'mote'};
THEMES.bastion={...HTH,ramps:{...HTH.ramps,far:R(['#2a2422','#3a302c','#4e403a','#665248','#806858','#9c826c','#bca084'])},fog:'rgba(140,110,90,.16)',ray:'255,190,140',rayA:1.3,amb:'ember',vig:'8,4,2'};
THEMES.graystone={...(THEMES.quarry||HTH),fog:'rgba(120,120,120,.14)',ray:'235,235,230',rayA:1.2,amb:'mote'};
THEMES.sentinel={...(THEMES.peaks||HTH),fog:'rgba(210,220,230,.14)',ray:'245,250,255',rayA:1.5,amb:'mote'};
THEMES.talonreach={...(THEMES.siege||HTH),ramps:{...(THEMES.siege||HTH).ramps,far:R(['#1e1a22','#2a2430','#3a3040','#4e4052','#665468','#806c80','#a08aa0'])},fog:'rgba(110,90,110,.18)',ray:'255,170,140',rayA:1.1,amb:'ember',vig:'6,2,6'};
Object.assign(WX,{ravengate:['clear','clear','rain'],bastion:['clear','rain','clear'],graystone:['clear','clear'],sentinel:['clear','rain','clear'],talonreach:['clear','rain','rain']});
/* materials: wool (shorn, never killed for) and reclaimed battlefield metal */
Object.assign(RES,{wool:{n:'Wool',c:'#e8e0d0',d:'handling',reg:'watchtower'},reclaimed:{n:'Reclaimed Metal',c:'#8a8076',d:'salvage',reg:'watchtower'}});
MAT_BASE.reclaimed=['salvage','#8a8076'];
RECIPES.push({id:'watchcloak',d:'leather',r:5,n:'Watch Cloak',set:'bastion',make:['chest'],need:{wool:4,hide:2},prop:'Wool: warm, padded, quiet. The watch never ends; neither does the cold.',tune:{hp:1.2},add:{mp:.3}},
  {id:'woolhood',d:'leather',r:4,n:'Woollen Watch Hood',set:'bastion',make:['head'],need:{wool:3,hide:1},prop:'A sentry’s hood. Keeps the wind out and the ears open.',add:{crit:.5}},
  {id:'reclblade',d:'smith',r:6,n:'Reclaimed Blade',set:'bastion',make:['weapon','katana'],need:{reclaimed:3,coal:1},prop:'Battlefield metal, reforged. Iron that has already proven itself.',tune:{atk:1.05},add:{hp:.4}},
  {id:'reclgaunt',d:'smith',r:5,n:'Bastion Gauntlets',set:'bastion',make:['hands'],need:{reclaimed:2,wool:1,ore:1},prop:'Reclaimed plate, wool-lined.',add:{def:.5}},
  {id:'memcharm',d:'smith',r:6,n:'Memorial Token',set:'bastion',make:['charm'],need:{reclaimed:1,granite:1,silver:1},prop:'A token cut from memorial stone. For those who stood.',add:{def:.6}});
/* creatures: Mountain Goat and Cliff Strider walk here too */
Object.assign(MOBS,{
  highwolf:{name:'Highland Wolf',kind:'quad',ai:'lunger',hp:60,atk:11,exp:17,w:22,h:14,spd:46,shard:[2,5],aggro:140},
  ironboar:{name:'Ironcrest Boar',kind:'quad',ai:'lunger',hp:85,atk:12,exp:20,w:26,h:18,spd:32,shard:[2,5],aggro:120},
  skyhawk:{name:'Skyreaver Hawk',kind:'fly',ai:'flyer',fly:1,elite:1,hp:360,atk:14,exp:220,w:20,h:14,spd:58,shard:[16,28],aggro:200,resp:90},
  stoneursine:{name:'Stonehide Ursine',kind:'quad',ai:'lunger',elite:1,bb:1,hp:700,atk:15,exp:400,w:40,h:30,spd:24,shard:[34,54],aggro:150,resp:90},
  wargryphon:{name:'War Gryphon',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:680,atk:16,exp:420,w:40,h:30,spd:50,shard:[34,54],aggro:210,resp:90},
  stormwing:{name:'The Stormwing Drake',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:1300,atk:16,exp:1000,w:40,h:30,spd:46,shard:[90,130],aggro:230,resp:120},
  siegebreaker:{name:'The Siegebreaker',kind:'quad',ai:'lunger',elite:1,bb:1,hp:1500,atk:16,exp:1100,w:80,h:44,spd:16,shard:[100,140],aggro:200,resp:120}});
const WTK=['highwolf','ironboar','skyhawk','stoneursine','wargryphon','stormwing','siegebreaker'];for(const k of WTK)MOBS[k].base1=1;
Object.assign(GEAR,{
  highwolf:GS('Highland Wolf',['#8a8a90','#4a4a52','#b8b8c0','#efe8d8','#4a6a9a'],{n:'Highland Wolf Hood',s:'pelt'},{n:'Highland Pelt Coat',s:'leather'},'Highland Claws','Snowpad Boots',{n:'Highland Fang',s:'fang'},{daggers:'Highland Fangs',spear:'Ranger Spear'}),
  ironboar:GS('Ironcrest',['#5a4a3a','#2e241c','#7a6a5a','#a8aab2','#c84a3a'],{n:'Ironcrest Helm',s:'horns'},{n:'Ironcrest Hide',s:'leather'},'Ironcrest Grips','Ironcrest Boots',{n:'Ironcrest Tusk',s:'fang'},{axe:'Crestcleaver',hammer:'Ironcrest Maul'}),
  skyhawk:{...GS('Skyreaver',['#3a2a24','#1e1410','#6a4a3a','#efe4c8','#c84a3a'],{n:'Skyreaver Crest',s:'feather'},{n:'Skyreaver Mantle',s:'robe'},'Reaver Talons','Skyreaver Boots',{n:'Reaver Feather',s:'lamp'},{bow:'Skyreaver Bow',spear:'Diving Lance'}),drop:.5},
  stoneursine:{...GS('Stonehide',['#6a5a4a','#3a2e24','#8a7a66','#c8b8a0','#4a6a3a'],{n:'Stonehide Helm',s:'pelt'},{n:'Stonehide Plate',s:'plate'},'Ursine Paws','Stonehide Greaves',{n:'Ursine Claw',s:'fang'},{hammer:'Ursine Maul',axe:'Stonehide Cleaver',shield:'Stonehide Bulwark'}),drop:1,drops:2},
  wargryphon:{...GS('War Gryphon',['#8a6a3a','#4a3a20','#c8a060','#f2e6c8','#3a5a8a'],{n:'Gryphon Crest Helm',s:'feather'},{n:'Gryphon-feather Mail',s:'plate'},'Gryphon Talons','Gryphon Greaves',{n:'Gryphon Quill',s:'lamp'},{spear:'Gryphon Lance',bow:'Gryphonwing Bow',katana:'Talonblade'}),drop:1,drops:2},
  stormwing:{...GS('Stormwing',['#3a2a5a','#1e1434','#6a4a9a','#d8c8ff','#ffe066'],{n:'Stormwing Helm',s:'horns'},{n:'Stormwing Scale',s:'plate'},'Stormwing Talons','Stormwing Greaves',{n:'Bottled Thunder',s:'core'},{spear:'Thundercall Lance',katana:'Stormwing Edge',staff:'Tempest Staff'}),drop:1,drops:3},
  siegebreaker:{...GS('Siegebreaker',['#4a4a52','#26262c','#7a7a86','#c84a3a','#e3b04b'],{n:'Siegebreaker Helm',s:'visor'},{n:'Siegebreaker Plate',s:'plate'},'Ram Gauntlets','Siegebreaker Sabatons',{n:'Siegebreaker Horn',s:'fang'},{hammer:'Gatecrusher',shield:'The Last Wall',axe:'Breachaxe'}),drop:1,drops:3}});
for(const k of WTK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.highwolf={...QUAD.wolf,c:['#3a3a42','#a8a8b0','#d8d8e0','#7a7a84','#9ac0ff']};
QUAD.ironboar={...QUAD.boar,c:['#1e1610','#5a4a3a','#7a6a5a','#3e3228','#c84a3a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<6;i++){const x=Math.round(o.cx-o.L/2+3+i*3);Rc(x,top-3+(i%2),2,4,'#8a8e98');P(x,top-3+(i%2),'#c8ccd4')}}};
QUAD.stoneursine={...QUAD.bear,cw:60,ch:40,cx:26,len:34,bh:17,leg:8,lw:5,c:['#2a221c','#6a5a4a','#8a7a66','#4a3e32','#9bd04c'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<6;i++){const x=Math.round(o.cx-o.L/2+4+i*5);Rc(x,top-2,4,3,'#9a948a');P(x,top-2,'#c8c0b4');P(x+3,top,'#5a544c')}}};
QUAD.siegebreaker={...QUAD.boar,cw:116,ch:60,cx:52,len:62,bh:26,leg:12,lw:8,c:['#1a1a1e','#4a4a52','#6a6a76','#2e2e34','#c84a3a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);
  for(let i=0;i<8;i++){const x=Math.round(o.cx-o.L/2+4+i*7.5);Rc(x,top-4,6,6,'#7a7a86');Rc(x+1,top-4,4,1,'#a8a8b2');P(x+5,top+1,'#2e2e34')}
  const hx=Math.round(o.cx+o.L/2),hy=Math.round(o.cy)-2,lu=o.mode==='lunge'?6:o.mode==='wind'?-3:0;Rc(hx+lu,hy-8,14,14,'#4a4a52');Rc(hx+lu,hy-8,14,2,'#7a7a86');for(let k=0;k<10;k++)Rc(hx+12+lu+k,hy-6-Math.round(k*.6),3,2,'#d8d0c0');P(hx+6+lu,hy-4,'#c84a3a');P(hx+7+lu,hy-4,'#ffd27a');
  for(let i=0;i<4;i++)Rc(Math.round(o.cx-o.L/2+8+i*14),Math.round(o.cy)+2,6,2,'#a8302a')}};
const _brWt=buildRoster;buildRoster=function(){_brWt();
  const hB=['#1e1410','#3a2a24','#6a4a3a','#efe4c8'];MSP.skyhawk={kind:'fly',ax:17,ay:16,fl:[0,1,2].map(p=>birdFrame(hB,0,p,0,0)),ch:birdFrame(hB,0,1,1,0),F:{fl:[0,1,2].map(p=>birdFrame(hB,0,p,0,1)),ch:birdFrame(hB,0,1,1,1)}};
  const gB=['#4a3a20','#8a6a3a','#c8a060','#f2e6c8'],g2=(p,c,f)=>scale2(birdFrame(gB,0,p,c,f));MSP.wargryphon={kind:'fly',ax:34,ay:32,fl:[0,1,2].map(p=>g2(p,0,0)),ch:g2(1,1,0),F:{fl:[0,1,2].map(p=>g2(p,0,1)),ch:g2(1,1,1)}};
  const toWing=(r,g,b)=>{const l=(r+g+b)/3;return b>r+8?[Math.min(255,l*1.05),l*.7,Math.min(255,l*1.5)]:null},D=MSP.drake,sc=c=>scale2(recolor(c,toWing));
  MSP.stormwing={kind:'fly',ax:D.ax*2,ay:D.ay*2,fl:D.fl.map(sc),ch:sc(D.ch),F:{fl:D.F.fl.map(c=>scale2(c)),ch:scale2(D.F.ch)}}};
/* set dressing */
Object.assign(PROPS,{
  memorial(x,X,Y){const P=px3(x),S=R(['#3a3a40','#52525a','#6a6a74','#8a8a94','#b0b0b8']);for(let y=0;y<54;y++){const hw=y>46?Math.round(6-(y-46)*.7):6;for(let k=-hw;k<=hw;k++)P(X+k,Y-y,pick(S,.6-(k+6)/40+(y%9===0?.08:0),X+k,y))}
    for(let k=-10;k<=10;k++)for(let y=0;y<4;y++)P(X+k,Y-y,S[1]);for(let y=12;y<40;y+=5)for(let k=-3;k<=3;k++)if((k+y)%2)P(X+k,Y-y,S[0]);for(let i=0;i<3;i++)P(X-6+i*6,Y-5,[200,60,50])},
  battlefield(x,X,Y){const P=px3(x),M=R(['#2a2622','#4a4440','#6a625a','#8a8276']);for(let i=0;i<9;i++){const k=-36+i*9,tl=hash(i,2,X)>.5;for(let y=0;y<12+Math.floor(hash(i,3,X)*10);y++)P(X+k+(tl?Math.floor(y/3):0),Y-y,M[2+(y%2)]);P(X+k,Y-1,M[0])}
    for(let k=-30;k<=-18;k++)for(let y=0;y<6;y++)if((k+30)*(k+30)/36+(y-3)*(y-3)/9<1)P(X+k,Y-y,M[1]);for(let k=10;k<26;k++)P(X+k,Y-2,[120,24,28])},
  citadelwall(x,X,Y){const P=px3(x),S=TH.rock;for(let y=0;y<110;y++)for(let k=-60;k<=60;k++){const win=(Math.abs(k+30)<3||Math.abs(k-30)<3)&&y>70&&y<84;P(X+k,Y-y,win?[255,200,120]:pick(S,.55-(k+60)/400+(y%10===0?.1:0),X+k,y))}
    for(let k=-62;k<=62;k+=10)for(let y=110;y<120;y++)for(let j=0;j<6;j++)P(X+k+j,Y-y,pick(S,.7,X+k,y));for(const c of[-20,20])for(let y=86;y<108;y++)for(let j=-4;j<=4;j++)P(X+c+j,Y-y,(y+j)%5?[47,78,134]:[200,170,90]);Z.glows.push([X-30,Y-77,14,'255,200,120'],[X+30,Y-77,14,'255,200,120'])},
  signaltower(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-8,8])for(let y=0;y<80;y++){P(X+k-Math.round(y*k/160),Y-y,W[1]);P(X+k+1-Math.round(y*k/160),Y-y,W[3])}for(let y=10;y<80;y+=14)for(let k=-7;k<=7;k++)P(X+k,Y-y,W[2]);
    for(let k=-6;k<=6;k++)for(let y=80;y<86;y++)P(X+k,Y-y,W[4]);for(let i=0;i<8;i++)P(X-3+Math.floor(hash(i,1,X)*7),Y-87-Math.floor(hash(i,2,X)*6),i%2?[255,160,60]:[255,220,120]);Z.glows.push([X,Y-89,22,'255,170,80'])}});
/* zones */
const OWT=zIdx('tower'),RGI=ZONES.length,BFI=RGI+1,GHI=RGI+2,SPI=RGI+3,TRI=RGI+4;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Rg={id:'ravengate',name:'Ravengate Crossing',ch:'Old Watchtower',theme:'ravengate',safe:1,lv:[25,25],req:24,ww:1700,start:70,
  seg:[[0,1700,250]],mobs:[],portals:[{x:22,to:OWT,tx:900},{x:1678,to:BFI,tx:70},{x:1240,to:GHI,tx:70}],npcs:['brisa'],
  labels:[[320,'Ravengate Crossing',110],[760,'Stonewatch Citadel',150],[1240,'Graystone Holds',78],[1660,'Bastion Fields',78]],
  props:[['stall',160],['banner',300],['crates',420],['citadelwall',760],['banner',1000],['cart',1120],['sign',1500]],trees:[]};
 const Bf={id:'bastion',name:'Bastion Fields',ch:'Old Watchtower',theme:'bastion',lv:[26,27],req:25,ww:2000,start:70,
  seg:[[0,700,250],[700,300,240],[1000,1000,250]],
  mobs:[['highwolf',0,320],['ironboar',0,560],['highwolf',1,820],['ironboar',2,1120],['highwolf',2,1300],['mtngoat',2,1460],['ironboar',2,1700]],
  portals:[{x:22,to:RGI,tx:1660},{x:1978,to:SPI,tx:70}],npcs:['odran','aurek'],labels:[[300,'Bastion Fields',110],[1500,'The Memorial Plains',110],[1960,'Sentinel Pass',78]],
  props:[['battlefield',420],['banner',540],['battlefield',760],['battlefield',1060],['memorial',1380],['memorial',1480],['memorial',1580],['battlefield',1800]],trees:[]};
 const Gh={id:'graystone',name:'Graystone Holds',ch:'Old Watchtower',theme:'graystone',lv:[27,28],req:26,ww:1800,start:70,
  seg:[[0,500,250],[500,400,236],[900,400,222],[1300,500,250],[600,90,190,'f'],[1000,90,178,'f']],
  mobs:[['mtngoat',0,320],['cliffstrider',1,640],['mtngoat',1,800],['cliffstrider',2,1060],['highwolf',3,1380],['stoneursine',3,1640]],
  portals:[{x:22,to:RGI,tx:1240}],npcs:['maddox'],labels:[[260,'Graystone Holds',110],[1100,'The Masons’ Cut',150],[1640,'Ursine Den',70]],
  props:[['crane',200],['stoneblocks',360],['scaff',520],['stoneblocks',940],['crane',1200],['cairn',1500]],trees:[]};
 const Sp={id:'sentinel',name:'Sentinel Pass',ch:'Old Watchtower',theme:'sentinel',lv:[28,29],req:27,ww:2000,start:70,
  seg:[[0,500,250],[500,400,230],[900,400,210],[1300,400,230],[1700,300,250],[640,90,178,'f'],[1060,90,160,'f'],[1440,90,178,'f']],
  mobs:[['highwolf',0,320],['skyhawk',-2,620],['cliffstrider',2,1000],['highwolf',2,1180],['wargryphon',-2,1320],['skyhawk',-2,1500],['stormwing',-2,1820]],
  portals:[{x:22,to:BFI,tx:1960},{x:1978,to:TRI,tx:70}],npcs:[],labels:[[1100,'Sentinel Pass',190],[1820,'Stormwing Roost',120],[1960,'Talonreach Outpost',78]],
  props:[['cairn',240],['signaltower',700],['cairn',1100],['signaltower',1500],['sign',1900]],trees:[]};
 const Tr={id:'talonreach',name:'Talonreach Outpost',ch:'Old Watchtower',theme:'talonreach',lv:[29,30],req:28,ww:2100,start:70,
  seg:[[0,700,250],[700,1400,250],[180,200,184,'plank']],
  mobs:[['highwolf',1,900],['ironboar',1,1060],['highwolf',1,1240],['ironboar',1,1420],['skyhawk',-2,1300],['siegebreaker',1,1820]],
  portals:[{x:22,to:SPI,tx:1960}],npcs:['kestrel'],labels:[[280,'Talonreach Outpost',130],[1000,'The Ember Road',70],[1800,'The Shattered Vale',130]],
  props:[['gatewall',200],['signaltower',420],['siegetent',540],['barricade',700],['battlefield',1200],['battlefield',1560],['memorial',2000]],trees:[]};
 const NN={ravengate:[],bastion:[['reclaimed',460],['reclaimed',800],['granite',1000],['reclaimed',1140],['reclaimed',1820]],graystone:[['granite',420],['limestone',700],['ore',980],['granite',1200],['slate',1440]],
   sentinel:[['slate',300],['herb',800],['granite',1200],['shard',1620]],talonreach:[['reclaimed',1100],['ore',1360],['reclaimed',1600]]};
 for(const z of[Rg,Bf,Gh,Sp,Tr]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Rg.stations=[{x:560+EDGE,k:'forge',n:'Coalition Smithy'},{x:1360+EDGE,k:'cook',n:'Crossing Inn'}];Gh.stations=[{x:200+EDGE,k:'forge',n:'Masons’ Forge'}];Tr.stations=[{x:360+EDGE,k:'cook',n:'Ranger Mess'}];
 const T=ZONES[OWT];T.portals.push({x:900+EDGE,to:RGI,tx:70+EDGE});(T.labels=T.labels||[]).push([900+EDGE,'Ravengate Crossing',78])}
Object.assign(MAPXY,{ravengate:[30,32],bastion:[38,26],graystone:[22,24],sentinel:[34,16],talonreach:[46,14]});WAYS.ravengate=200;WAYS.talonreach=300;
/* people: the factions on the sheet */
Object.assign(NPCS,{
  brisa:{name:'Quartermaster Brisa',title:'Reach Coalition · Ravengate',x:300+EDGE,cls:'traveler',look:{sex:1,build:1,face:3,hair:2,hairC:4,beard:0,skin:2,eye:1,outfit:2},eq:{head:'tv_start',chest:'gd_start'},
    lines:['Trade, travel and watchful eyes. The Coalition supplies all three.','Borders hold more than enemies. They hold tomorrows.','The Citadel is the second line. Pray it stays the second.']},
  odran:{name:'Odran of the Reclamation Corps',title:'Bastion Fields',x:260+EDGE,cls:'gatherer',look:{sex:0,build:1,face:4,hair:1,hairC:6,beard:4,skin:3,eye:0,outfit:3},eq:{head:'ga_start',chest:'ga_start'},
    lines:['A land that remembers. We help it remember properly.','Every plate we pull from this field was someone’s. We note whose, when we can.','From ashes, we build stronger.']},
  aurek:{name:'Aurek of the Veteran Order',title:'The Memorial Plains',x:1300+EDGE,cls:'guard',look:{sex:0,build:2,face:5,hair:0,hairC:7,beard:5,skin:1,eye:0,outfit:2},eq:{head:'gd_start',chest:'gd_start'},
    lines:['For those who stood. I stood. Most of them did not get up.','The watch never ends. It only changes hands.','Tend the stones if you pass them. It costs nothing and it means a great deal.']},
  maddox:{name:'Master Mason Maddox',title:'Graystone Holds',x:300+EDGE,cls:'gatherer',look:{sex:0,build:2,face:2,hair:0,hairC:1,beard:5,skin:4,eye:0,outfit:3},eq:{head:'raider',chest:'ga_start'},
    lines:['Miners, masons and defenders. Most of us are all three by Tuesday.','Granite for walls, limestone for mortar, sweat for everything else.','The ursine in the upper cut has eaten two of my apprentices’ lunches. And one apprentice.']},
  kestrel:{name:'Ranger-Captain Kestrel',title:'Frontier Rangers · Talonreach',x:300+EDGE,cls:'scout',look:{sex:1,build:1,face:1,hair:5,hairC:5,beard:0,skin:2,eye:2,outfit:1},eq:{head:'sc_start',chest:'sc_start'},
    lines:['A frontier against the unknown. Mostly against the known, lately.','Mountains keep their secrets, but the watch keeps the peace.','The Ember Road runs east to the Scar. Nothing good comes up it.']}});
Object.assign(BARKS,{brisa:['Supplies!','Next wagon.','Coalition business.'],odran:['Careful, that’s someone’s.','Note it down.','Reclaimed!'],aurek:['For those who stood.','Tend the stones.','Remember.'],maddox:['Mind the cut!','More mortar.','Granite!'],kestrel:['Eyes up.','Rangers, out.','East is quiet. Too quiet.']});
Object.assign(LORE,{
  bfA:{z:'bastion',x:1380,k:'stone',t:'Memorial: The First Line',txt:'“Here stood the first line of the Watch, two hundred and six, against the Freeband host. They held for three days. The Citadel was built with the time they bought.”'},
  bfB:{z:'bastion',x:1480,k:'stone',t:'Memorial: The Reclaimers',txt:'“To those who came after, and carried the fallen home. Their names are not on any wall. They are on every wall.”'},
  bfC:{z:'bastion',x:1580,k:'stone',t:'Memorial: The Unnamed',txt:'“For those we could not name. You are remembered anyway.” Fresh wildflowers lie at the base.'},
  trA:{z:'talonreach',x:1700,k:'note',t:'Ranger Report, Shattered Vale',txt:'“The Siegebreaker is moving again. Old war-beast, armoured by the Freeband in the last war and turned loose when they lost. It does not know the war ended.”'}});
Object.assign(QUESTS,{
  rg1:{title:'Wolves on the Highroad',giver:'brisa',lv:25,
    offer:'Highland wolves have learned that Coalition wagons carry meat. Eight of them are working the road between here and the Fields. Thin the pack.',
    desc:'Thin out 8 Highland Wolves.',goal:{t:'kill',mob:'highwolf',n:8,lab:'Highland Wolves thinned'},where:'Bastion Fields and Sentinel Pass',prog:'They run in packs along the road.',
    done:'The drovers will sleep tonight. So will I.',reward:{exp:400,sh:60}},
  rg2:{title:'Wool for the Watch',giver:'brisa',lv:26,
    offer:'Winter comes early on the frontier and the rangers are short of cloaks. The mountain goats in the Holds and on the Fields grow thick coats. Shear five fleeces. Shear, mind; we need the goats next year too.',
    desc:'Shear 5 Wool from Mountain Goats.',goal:{t:'gather',res:'wool',n:5},where:'Mountain Goats in Graystone Holds and Bastion Fields',prog:'Walk up to a calm goat and shear it.',
    done:'Good thick fleece, and not a goat harmed. The Coalition thanks you. So will the rangers, come snow.',reward:{exp:420,sh:60}},
  bf1:{title:'What the Field Remembers',giver:'odran',lv:26,
    offer:'The Fields are full of old metal: blades, plate, wagon iron. We reclaim it, record whose it was when we can, and forge it into something useful. Bring me five pieces.',
    desc:'Recover 5 Reclaimed Metal from Bastion Fields.',goal:{t:'gather',res:'reclaimed',n:5},where:'Bastion Fields and Talonreach',prog:'Rusted metal in the old battle lines.',
    done:'Noted, every piece. That blade there was a Watch sergeant’s; the family will want to know. Thank you.',reward:{exp:460,sh:60}},
  bf2:{title:'Tend the Stones',giver:'aurek',lv:27,
    offer:'Three memorial stones on the Plains. Read them. Clear the moss if there is any. That is all the dead ask of us, and most people cannot spare even that.',
    desc:'Read the three memorial stones on the Memorial Plains.',goal:{t:'event',id:'bfstone',n:3,lab:'Memorials tended'},where:'The Memorial Plains, east Bastion Fields',prog:'Three grey stones on the plain.',
    done:'You read them all. Good. Take this; the Order gives it to those who remember.',reward:{exp:420,sh:50,sp:1}},
  bf3:{title:'Ironcrest',giver:'aurek',lv:27,
    offer:'Ironcrest boars root in the grave-mounds. They do not mean anything by it. I do not care. Drive off six.',
    desc:'Drive off 6 Ironcrest Boars.',goal:{t:'kill',mob:'ironboar',n:6,lab:'Ironcrest Boars driven off'},where:'Bastion Fields and Talonreach',prog:'They root in the old mounds.',
    done:'The mounds are quiet. Thank you, from them and from me.',reward:{exp:460,sh:60}},
  gh1:{title:'Granite for the Holds',giver:'maddox',lv:27,
    offer:'The Citadel needs a new course of granite before the frost. My masons are cutting as fast as they can. Cut five blocks yourself and we’ll finish a day early.',
    desc:'Quarry 5 Granite.',goal:{t:'gather',res:'granite',n:5},where:'Graystone Holds, Bastion Fields, Sentinel Pass',prog:'Grey seams in the cut.',
    done:'Square and true. You have a mason’s eye. Use my forge whenever you like.',reward:{exp:440,sh:55}},
  gh2:{title:'The Stonehide',giver:'maddox',pre:'gh1',lv:28,
    offer:'A stonehide ursine has denned at the top of the Masons’ Cut. It is the size of a cart and nothing we have dents it. Drive it out, or put it down.',
    desc:'Defeat the Stonehide Ursine at the Ursine Den.',goal:{t:'kill',mob:'stoneursine',n:1,lab:'Stonehide Ursine defeated'},where:'The Ursine Den, top of Graystone Holds',prog:'At the far end of the Holds.',
    done:'The cut is ours again. The apprentices are already arguing about who gets its claws.',reward:{exp:900,sh:110}},
  tr1:{title:'Skyreavers',giver:'kestrel',lv:28,
    offer:'Skyreaver hawks dive the signal towers and tear the fire-baskets loose. Without the towers, the Citadel goes blind. Bring down three.',
    desc:'Bring down 3 Skyreaver Hawks.',goal:{t:'kill',mob:'skyhawk',n:3,lab:'Skyreavers brought down'},where:'Sentinel Pass and Talonreach',prog:'They circle the signal towers.',
    done:'The towers are lit end to end. The Citadel can see again.',reward:{exp:520,sh:70}},
  tr2:{title:'The War Gryphon',giver:'kestrel',pre:'tr1',lv:29,
    offer:'A war gryphon, Freeband-trained, gone feral since the war. It hunts the pass and it hunts my rangers. I have lost two to it. End it.',
    desc:'Defeat the War Gryphon over Sentinel Pass.',goal:{t:'kill',mob:'wargryphon',n:1,lab:'War Gryphon defeated'},where:'Sentinel Pass',prog:'It hunts the middle of the pass.',
    done:'Two names I can tell their families now. Thank you.',reward:{exp:1000,sh:120}},
  tr3:{title:'The Stormwing',giver:'kestrel',pre:'tr1',lv:29,
    offer:'The Stormwing drake roosts at the top of Sentinel Pass and calls storms down on anything that climbs. It has turned the Highroad into a graveyard. Clear the roost.',
    desc:'Defeat the Stormwing Drake at its roost.',goal:{t:'kill',mob:'stormwing',n:1,lab:'Stormwing Drake defeated'},where:'Stormwing Roost, east Sentinel Pass',prog:'At the top of the pass.',
    done:'Clear skies over the Highroad for the first time in a decade. The Rangers will not forget it.',reward:{exp:1300,sh:150}},
  tr4:{title:'The Siegebreaker',giver:'kestrel',pre:'tr2',lv:30,
    offer:'The Siegebreaker. An armoured war-beast the Freeband left behind. It does not know the war is over, and it is walking toward the Citadel. It has to be stopped in the Shattered Vale, before it reaches a wall.',
    desc:'Stop the Siegebreaker in the Shattered Vale.',goal:{t:'kill',mob:'siegebreaker',n:1,lab:'Siegebreaker stopped'},where:'The Shattered Vale, east Talonreach',prog:'At the far east of the outpost lands.',
    done:'It is over. Its war, finally. We will raise a stone for it on the Memorial Plains; Aurek insists. Beyond here is only the Scar.',reward:{exp:1500,sh:180}}});
const BFS=['bfA','bfB','bfC'];
const _olWt=openLore;openLore=function(id){const r=_olWt(id);if(BFS.includes(id)){pl.lore=pl.lore||{};pl.lore[id]=pl.lore[id]||1;const st=qSt('bf2');if(st&&st.s==='a'){st.n=BFS.filter(k=>pl.lore[k]).length;qProgress('bf2','Memorial')}}return r};
/* shearing calm mountain goats for wool: nonlethal, and each goat regrows its coat */
function shearNear(){const m=S.mobs.find(m=>m.t==='mtngoat'&&!m.dead&&!m.aggro&&Math.abs(m.x-pl.x)<28&&Math.abs(m.y-pl.y)<26);if(!m)return null;return{k:'shear',m}}
const _cnSh=crNear;crNear=function(){const sh=shearNear();if(sh&&!(sh.m.shorn&&S.t-sh.m.shorn<90))return sh;return _cnSh()||sh};
const _cuSh=crUse;crUse=function(n){if(n&&n.k==='shear'){const m=n.m;if(m.shorn&&S.t-m.shorn<90){banner('Already shorn','Its coat is still growing back');return}m.shorn=S.t;addMat('wool',1+(Math.random()<.3+.04*dRank('handling')?1:0),m.x,m.y);dGain('handling',8);sfx.pick();save();return}return _cuSh(n)};
const _clSh=crLabel;crLabel=function(n){if(n&&n.k==='shear')return n.m.shorn&&S.t-n.m.shorn<90?'Shorn · Mountain Goat':'Shear · Mountain Goat (wool)';return _clSh(n)};
