/* ---------- Whisper Woods, expanded to its sheet: Whisperwood Village, Grove of Whispers, Moonpetal Lake, Thornveil Hollows, Elderwood Sanctuary ---------- */
const GR=THEMES.grove,GRR=GR.ramps;
THEMES.wwvillage={...GR,fog:'rgba(60,44,18,.18)',ray:'255,214,140',rayA:1.6,amb:'mote'};
THEMES.spiritgrove={...GR,ramps:{...GRR,far:R(['#122420','#1a3228','#244434','#30583e','#46744c','#64905a','#8cb070'])},fog:'rgba(40,90,80,.2)',fog2:'rgba(60,120,110,.08)',ray:'190,255,220',rayA:1.2,amb:'mote',vig:'2,8,8'};
THEMES.moonlake={...GR,ramps:{...GRR,far:R(['#0a1020','#101a30','#182644','#22345a','#2e4672','#40608e','#5a7eaa']),leaf:R(['#0a1418','#102028','#163036','#1e4044','#285450','#346a5e','#4a8470','#6aa088'])},
  canopy:'none',top:[160,50],fog:'rgba(30,40,90,.24)',fog2:'rgba(80,90,160,.1)',ray:'200,210,255',rayA:.8,amb:'mote',vig:'2,2,10'};
THEMES.thornveil={...THEMES.oak,ramps:{...THEMES.oak.ramps,far:R(['#1e0e12','#2c1218','#3e1820','#52202a','#6a2a32','#84383c','#a04a46']),leaf:R(['#1a080c','#2a0e14','#3e141c','#561c24','#72262c','#903234','#b04440','#d0644e'])},
  canopy:'leaf',fog:'rgba(110,20,30,.2)',fog2:'rgba(140,30,40,.08)',ray:'255,140,120',rayA:1,amb:'mote',vig:'10,2,2'};
THEMES.elderwood={...THEMES.oak,ramps:{...THEMES.oak.ramps,far:R(['#1a1e12','#26301a','#344424','#46582e','#5e723a','#7c8e4a','#a4b062']),leaf:GRR.leaf},canopy:'leaf',fog:'rgba(80,70,20,.16)',ray:'255,230,150',rayA:1.8,amb:'leaf',vig:'4,4,0'};
Object.assign(WX,{whisperwood:['clear','clear','rain'],whispergrove:['clear','clear','rain'],moonpetal:['clear','clear','clear','rain'],thornveil:['clear','rain','rain'],elderwood:['clear','clear','rain']});
/* recolour a finished canvas pixel by pixel */
function recolor(src,f){const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');x.drawImage(src,0,0);const d=x.getImageData(0,0,c.width,c.height),a=d.data;
  for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;const o=f(a[i],a[i+1],a[i+2]);if(o){a[i]=o[0];a[i+1]=o[1];a[i+2]=o[2]}}x.putImageData(d,0,0);return c}
function scale2(src){const c=document.createElement('canvas');c.width=src.width*2;c.height=src.height*2;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(src,0,0,c.width,c.height);return c}
/* materials from the sheet */
Object.assign(RES,{whisperbloom:{n:'Whisperbloom',c:'#9ad8c8',d:'herbalism'},moonpetal:{n:'Moonpetal',c:'#a8a0ff',d:'herbalism'},glowcap:{n:'Glowcap',c:'#ffc86a',d:'herbalism'},heartwood:{n:'Heartwood',c:'#c8783a',d:'logging'}});
const _bna=buildNodeArt;buildNodeArt=function(){_bna();
  const hueTo=(t)=>(r,g,b)=>{if(g>r+10&&g>=b){const l=(r+g+b)/3;return[Math.min(255,l*t[0]),Math.min(255,l*t[1]),Math.min(255,l*t[2])]}if(r>180&&b>180)return[t[3],t[4],t[5]];return null};
  NODE_SPR.whisperbloom=NODE_SPR.herb.map(c=>recolor(c,hueTo([.7,1.35,1.2,220,255,240])));
  NODE_SPR.moonpetal=NODE_SPR.herb.map(c=>recolor(c,hueTo([.75,.8,1.6,190,170,255])));
  NODE_SPR.glowcap=NODE_SPR.mush.map(c=>recolor(c,(r,g,b)=>b>r&&b>g?[Math.min(255,b*1.5),Math.min(255,b*1.1),60]:null));
  NODE_SPR.heartwood=NODE_SPR.timber.map(c=>recolor(c,(r,g,b)=>r>g&&r>b?[Math.min(255,r*1.25),Math.min(255,g*.95),b*.6]:null))};
RECIPES.push({id:'moonsalve',d:'alchemy',r:2,n:'Moonpetal Salve ×3',use:'pots3',need:{moonpetal:2,whisperbloom:1},desc:'Sorrel’s recipe. Three tonics that smell of lake water at night.'},
  {id:'heartbow',d:'wood',r:3,n:'Heartwood Bow',make:['weapon','bow'],need:{heartwood:2,timber:2,hide:1}},
  {id:'heartstaff',d:'wood',r:3,n:'Heartwood Staff',make:['weapon','staff'],need:{heartwood:2,glowcap:1}},
  {id:'glowbrew',d:'cooking',r:2,n:'Glowcap Stew',use:'pots3',need:{glowcap:2,meat:1},desc:'Thornveil foragers swear by it. Three tonics’ worth of warmth.'});
/* creatures */
Object.assign(MOBS,{
  foreststag:{name:'Forest Stag',kind:'quad',ai:'lunger',passive:1,hp:70,atk:11,exp:16,w:22,h:28,spd:40,shard:[2,5],aggro:90},
  mossboar:{name:'Mossback Boar',kind:'quad',ai:'lunger',hp:80,atk:12,exp:18,w:24,h:16,spd:30,shard:[2,5],aggro:110},
  grovewolf:{name:'Grove Wolf',kind:'quad',ai:'lunger',hp:58,atk:13,exp:17,w:22,h:14,spd:44,shard:[2,5],aggro:130},
  bramblelynx:{name:'Bramblelaw Lynx',kind:'quad',ai:'lunger',hp:62,atk:15,exp:19,w:22,h:14,spd:52,shard:[2,6],aggro:140},
  thornturtle:{name:'Thornshell Turtle',kind:'quad',ai:'lunger',hp:130,atk:11,exp:20,w:28,h:16,spd:14,shard:[3,6],aggro:70},
  sylvanowl:{name:'Sylvan Owl',kind:'fly',ai:'flyer',fly:1,hp:45,atk:10,exp:14,w:16,h:14,spd:46,shard:[2,4],aggro:170},
  willowsprite:{name:'Willow Sprite',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:320,atk:13,exp:220,w:14,h:16,spd:54,shard:[20,34],aggro:190,resp:90},
  leafdrake:{name:'Leafdrake',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:500,atk:15,exp:320,w:20,h:16,spd:44,shard:[30,50],aggro:190,resp:90},
  rootwarden:{name:'Root Warden',kind:'gen',ai:'lunger',elite:1,bb:1,hp:650,atk:16,exp:380,w:26,h:46,spd:14,shard:[34,54],aggro:170,resp:90},
  eldertreant:{name:'The Elder Treant',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1700,atk:19,exp:900,w:52,h:96,spd:10,shard:[80,120],aggro:220,resp:120}});
const WWK=['foreststag','mossboar','grovewolf','bramblelynx','thornturtle','sylvanowl','willowsprite','leafdrake','rootwarden','eldertreant'];for(const k of WWK)MOBS[k].base1=1;
Object.assign(GEAR,{
  foreststag:GS('Forest Stag',['#6a4a2a','#3e2a18','#8f6a48','#e6d6b0','#4a6a3a'],{n:'Stagcrown Circlet',s:'antlers'},{n:'Forest Hide Coat',s:'leather'},'Stag-Hide Gloves','Forest Runners',{n:'Forest Antler',s:'fang'},{katana:'Antlerbrand',bow:'Stagbow',staff:'Forest Staff'}),
  mossboar:GS('Mossback',['#4a3a28','#2a2018','#6a5438','#9bd04c','#5a7a3a'],{n:'Mossback Helm',s:'mosscap'},{n:'Mossback Jerkin',s:'moss'},'Moss Gloves','Mossback Boots',{n:'Mossy Tusk',s:'fang'},{axe:'Tuskaxe',hammer:'Mossmaul'}),
  grovewolf:GS('Grove Wolf',['#4a5a42','#2a3424','#6a7a5a','#c8d4a0','#ffd27a'],{n:'Grove Wolf Hood',s:'pelt'},{n:'Leafpelt Vest',s:'leather'},'Grove Claws','Pack Boots',{n:'Grove Fang',s:'fang'},{daggers:'Grovefang Knives',spear:'Packhunter Spear'}),
  bramblelynx:GS('Bramblelaw',['#8a6a3a','#5a4224','#b08a52','#f2e6c8','#a8302a'],{n:'Tufted Hood',s:'hood'},{n:'Bramblelaw Vest',s:'leather'},'Thornclaw Gloves','Silentpad Boots',{n:'Lynx Eye',s:'scale'},{daggers:'Bramble Claws',katana:'Thornlash'}),
  thornturtle:GS('Thornshell',['#4a5a32','#2a3420','#6a7a46','#c8a050','#3a6a5a'],{n:'Shell Helm',s:'visor'},{n:'Thornshell Plate',s:'plate'},'Shell Gauntlets','Shell Greaves',{n:'Shell Spike',s:'fang'},{shield:'Thornshell Bulwark',hammer:'Shellbreaker'}),
  sylvanowl:GS('Sylvan Owl',['#5a4a3a','#3a2e24','#8a7458','#efe4c8','#e0a040'],{n:'Owl-Feather Cap',s:'feather'},{n:'Nightwing Mantle',s:'robe'},'Talon Wraps','Hush Boots',{n:'Owl Pellet Charm',s:'lamp'},{bow:'Nightwing Bow',tome:'Owl’s Almanac'}),
  willowsprite:{...GS('Willow Sprite',['#6a9a5a','#3a5a32','#a0c878','#e8ffd8','#c8a0ff'],{n:'Willow Crown',s:'leafcrown'},{n:'Willowweave Gown',s:'robe'},'Petal Gloves','Dewstep Slippers',{n:'Sprite Lantern',s:'lamp'},{staff:'Willow Wand',tome:'Book of Small Wishes'}),drop:1,drops:2},
  leafdrake:{...GS('Leafdrake',['#3a6a2a','#22401a','#5a8a3a','#c8e66a','#e0a040'],{n:'Leafdrake Helm',s:'horns'},{n:'Leafscale Mail',s:'plate'},'Leafdrake Talons','Leafdrake Greaves',{n:'Leafdrake Heartscale',s:'scale'},{spear:'Drakeleaf Lance',bow:'Leafwing Bow'}),drop:1,drops:2},
  rootwarden:{...GS('Root Warden',['#4a3a2a','#2a2018','#6a5a42','#9bd04c','#a8c070'],{n:'Warden Burl Helm',s:'visor'},{n:'Rootbound Plate',s:'plate'},'Rootgrip Gauntlets','Taproot Boots',{n:'Warden’s Seed',s:'core'},{hammer:'Rootmaul',shield:'Burlwood Aegis'}),drop:1,drops:2},
  eldertreant:{...GS('Elder Treant',['#6a4a2a','#3b2416','#8f6a42','#ffe08a','#9bd04c'],{n:'Crown of the Elder',s:'leafcrown'},{n:'Elderbark Hauberk',s:'plate'},'Elderbark Grips','Elderroot Greaves',{n:'Heart of the Elder',s:'core'},{staff:'Elderbough',katana:'Heartgrain Blade',bow:'Elderwood Longbow'}),drop:1,drops:3}});
for(const k of WWK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.foreststag={...QUAD.rotstag,c:['#2a1e12','#6a4a2a','#8f6a48','#c8a878','#1a1220']};
QUAD.mossboar={...QUAD.boar,c:['#2a1e14','#4a3a28','#6a5438','#3a2c1e','#c84a3a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2-3;x++){P(x,top-1,(x%3)?'#4c8a30':'#6aab3a');if(x%2)P(x,top-2,'#356b28');if(x%4===0)P(x,top,'#93c94a')}}};
QUAD.grovewolf={...QUAD.wolf,c:['#2a3424','#4a5a42','#6a7a5a','#8a9a72','#ffd27a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(const dx of[-6,-1,4]){P(o.cx+dx,top-1,'#4c8a30');P(o.cx+dx+1,top-2,'#6aab3a')}}};
QUAD.bramblelynx={...QUAD.wolf,cw:36,ch:22,len:17,bh:7,leg:6,c:['#3a2a18','#8a6a3a','#b08a52','#d8b880','#c8d468'],tail:'stub',extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2+1),hy=Math.floor(o.cy-o.bh/2)-4;
  for(const dx of[0,3]){P(hx+dx,hy,'#3a2a18');P(hx+dx,hy-1,'#3a2a18');P(hx+dx,hy-2,'#1a1210')}for(const[dx,dy]of[[-6,-1],[-3,1],[0,-1],[3,1],[-8,1]])P(o.cx+dx,o.cy+dy,'#5a4224');
  const top=Math.floor(o.cy-o.bh/2);for(const dx of[-5,-1,3]){P(o.cx+dx,top-1,'#a8302a');P(o.cx+dx,top-2,'#6a1e1a')}}};
QUAD.thornturtle={cw:44,ch:24,cx:19,len:22,bh:6,leg:3,lw:3,c:['#1e2614','#4a5a32','#6a7a46','#2a3420','#c8a050'],head:'none',tail:'stub',extra:(P,Rc,o)=>{
  const cx=Math.round(o.cx),cy=Math.round(o.cy)-2,hw=13;for(let x=-hw;x<=hw;x++){const h=Math.round(Math.sqrt(1-(x*x)/(hw*hw))*9);for(let y=0;y<=h;y++)P(cx+x,cy-y,y===h?'#7a8a50':((x+30)%6===0||y%4===0)?'#2a3420':y>h-3?'#6a7a46':'#4a5a32')}
  for(const dx of[-9,-3,3,9]){const h=Math.round(Math.sqrt(1-(dx*dx)/(hw*hw))*9);P(cx+dx,cy-h-1,'#c8a050');P(cx+dx,cy-h-2,'#efe4c8')}
  const hx=cx+hw+1+(o.mode==='lunge'?3:o.mode==='wind'?-2:0);Rc(hx,cy-1,5,4,'#5a6a3a');Rc(hx+1,cy-1,4,1,'#7a8a50');P(hx+3,cy,'#1a1210');P(hx+4,cy+2,'#2a3420')}};
function birdFrame(B,owl,ph,charge,flash){return sprite(34,24,(P,Rc)=>{const cx=17,cy=13,wa=[-1,0,1][ph%3];
  for(const s of[-1,1])for(let i=0;i<(owl?10:12);i++){const y=cy-1-Math.round(i*(wa===-1?.8:wa===0?.15:-.45)),x=cx+s*(2+i);for(let j=0;j<Math.max(1,(owl?4:3)-Math.floor(i/4));j++)P(x,y+j,i>7?B[0]:j?B[1]:B[2]);if(i>7)P(x,y+1,B[3])}
  const bw=owl?3:2;for(let y=-3;y<5;y++)for(let x=-bw;x<=bw;x++)P(cx+x,cy+y,y>1?B[3]:B[1+(x>0?1:0)]);
  if(owl){const hy=cy-6;Rc(cx-3,hy,7,5,B[1]);P(cx-3,hy-1,B[0]);P(cx+3,hy-1,B[0]);P(cx-4,hy-2,B[0]);P(cx+4,hy-2,B[0]);Rc(cx-2,hy+1,2,2,B[3]);Rc(cx+1,hy+1,2,2,B[3]);P(cx-2,hy+1,charge?'#ff6a3a':'#ffd27a');P(cx+2,hy+1,charge?'#ff6a3a':'#ffd27a');P(cx,hy+3,'#c8a050')}
  else{const hx=cx+3,hy=cy-3;Rc(hx,hy-1,4,3,B[3]);P(hx+2,hy,'#1a1210');P(hx+4,hy,'#e0a040')}
  if(charge){P(cx-1,cy+6,'#e0a040');P(cx+1,cy+6,'#e0a040')}},flash)}
function spriteFrame(ph,charge,flash){return sprite(28,28,(P,Rc)=>{const cx=14,cy=14+[0,-1,0][ph%3],wa=[2,0,-2][ph%3];
  for(const s of[-1,1])for(let i=0;i<7;i++)for(let j=0;j<4-Math.floor(i/2);j++)P(cx+s*(2+i),cy-4-j+Math.round(i*wa/6),j===0?'#e8ffd8':(i+j)%2?'#a0c878':'#c8f0a8');
  Rc(cx-1,cy-2,3,7,'#6a9a5a');P(cx,cy-2,'#a0c878');Rc(cx-2,cy+5,5,3,'#3a5a32');P(cx-2,cy+7,'#6a9a5a');P(cx+2,cy+7,'#6a9a5a');
  Rc(cx-2,cy-7,5,5,'#e8d8b0');Rc(cx-2,cy-8,5,2,'#5a8a3a');P(cx-3,cy-6,'#5a8a3a');P(cx+3,cy-6,'#5a8a3a');P(cx-1,cy-5,charge?'#ff8ac8':'#3a2a5a');P(cx+1,cy-5,charge?'#ff8ac8':'#3a2a5a');
  for(let i=0;i<4;i++)P(cx-5+i*3,cy+9+(i%2),'#c8a0ff');if(charge)for(let i=0;i<6;i++)P(cx+Math.round(Math.cos(i)*9),cy+Math.round(Math.sin(i)*9),'#e8ffd8')},flash)}
const WARDEN_PL={B:['#141008','#241c10','#3a3020','#524634','#6a5e48','#847a62'],M:['#2f6127','#4c8a30','#93c94a'],gl:'#9bd04c',gl2:'#e8ffb0'};
const ELDER_PL={B:['#1a1008','#2e1c0e','#46301a','#624628','#7e5e36','#9a7848'],M:['#356b28','#6aab3a','#c4e66a'],gl:'#ffe08a',gl2:'#fff6c8'};
const _brw=buildRoster;buildRoster=function(){_brw();
  const owlB=['#3a2e24','#5a4a3a','#8a7458','#efe4c8'];MSP.sylvanowl={kind:'fly',ax:17,ay:16,fl:[0,1,2].map(p=>birdFrame(owlB,1,p,0,0)),ch:birdFrame(owlB,1,1,1,0),F:{fl:[0,1,2].map(p=>birdFrame(owlB,1,p,0,1)),ch:birdFrame(owlB,1,1,1,1)}};
  MSP.willowsprite={kind:'fly',ax:14,ay:20,fl:[0,1,2].map(p=>spriteFrame(p,0,0)),ch:spriteFrame(1,1,0),F:{fl:[0,1,2].map(p=>spriteFrame(p,0,1)),ch:spriteFrame(1,1,1)}};
  const toLeaf=(r,g,b)=>b>r+8&&b>=g?[Math.round(r*.7),Math.min(255,Math.round(b*1.25)),Math.round(g*.5)]:null,D=MSP.drake;
  MSP.leafdrake={kind:'fly',ax:D.ax,ay:D.ay,fl:D.fl.map(c=>recolor(c,toLeaf)),ch:recolor(D.ch,toLeaf),F:D.F};
  const md=['walk0','walk1','wind','lunge'];{const o={kind:'gen',ax:25,ay:56,fps:2},F={};for(const m of md){o[m]=treantFrame(m,0,WARDEN_PL);F[m]=treantFrame(m,1,WARDEN_PL)}o.F=F;MSP.rootwarden=o}
  {const o={kind:'gen',ax:50,ay:112,fps:1.5},F={};for(const m of md){o[m]=scale2(treantFrame(m,0,ELDER_PL));F[m]=scale2(treantFrame(m,1,ELDER_PL))}o.F=F;MSP.eldertreant=o}};
/* set dressing from the sheet */
Object.assign(PROPS,{
  treehouse(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood,Bk=RAMP.bark||W,Lf=RAMP.leaf;for(let y=0;y<120;y++){const hw=9+(y<12?Math.round((12-y)*.7):0);for(let k=-hw;k<=hw;k++)P(X+k,Y-y,pick(Bk,.62-(k+hw)/(hw*5),X+k,y))}
    for(let y=62;y<92;y++){const w=y<66?26:22;for(let k=-w;k<=w;k++){const win=(Math.abs(k+10)<3||Math.abs(k-10)<3)&&y>70&&y<78;P(X+k,Y-y,win?[255,206,120]:pick(W,.5+((k+40)%7===0?-.15:0),X+k,y))}}
    for(let y=92;y<108;y++){const w=Math.round(30-(y-92)*1.9);for(let k=-w;k<=w;k++)P(X+k,Y-y,pick(Lf,.3+((k*3+y)%5)/12,X+k,y))}
    for(let i=0;i<70;i++){const a=hash(i,1,X)*6.28,r=18+hash(i,2,X)*26;P(X+Math.round(Math.cos(a)*r),Y-112+Math.round(Math.sin(a)*r*.6),pick(Lf,.3+hash(i,3,X)*.6,X,i))}
    for(let k=-26;k<=26;k++)P(X+k,Y-61,W[1]);for(let y=0;y<62;y+=4)for(let k=-3;k<=3;k++)P(X+12+k,Y-y,W[5]);Z.glows.push([X-10,Y-74,20,'255,200,120'],[X+10,Y-74,20,'255,200,120'])},
  waymarker(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<30;y++){P(X,Y-y,W[3]);P(X+1,Y-y,W[1])}for(let y=22;y<29;y++)for(let k=-8;k<=9;k++)P(X+k+(y<25?0:1),Y-y,pick(W,.6,X+k,y));for(let k=-6;k<=6;k+=3)P(X+k,Y-25,[240,214,140])},
  fence(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let k=-30;k<=30;k++){P(X+k,Y-8,W[4]);P(X+k,Y-14,W[3])}for(let k=-30;k<=30;k+=10)for(let y=0;y<18;y++){P(X+k,Y-y,W[2]);P(X+k+1,Y-y,W[4])}},
  spiritshrine(x,X,Y){const P=px3(x),S=R(['#3a4440','#52605a','#6a7a72','#8a9a90','#b0c0b4']);for(let y=0;y<10;y++)for(let k=-22;k<=22;k++)P(X+k,Y-y,pick(S,.5-(k+22)/120,X+k,y));
    for(const k of[-16,16])for(let y=10;y<52;y++)for(let j=-3;j<=3;j++)P(X+k+j,Y-y,pick(S,.55+j/10,X+k,y));for(let y=52;y<58;y++)for(let k=-24;k<=24;k++)P(X+k,Y-y,pick(S,.7,X+k,y));
    for(let y=14;y<44;y++)for(let k=-8;k<=8;k++)if((k*k)/64+((y-29)*(y-29))/225<1)P(X+k,Y-y,[150,255,220]);Z.glows.push([X,Y-29,30,'150,255,220'])},
  moonflowers(x,X,Y){const P=px3(x);for(let i=0;i<9;i++){const k=-20+Math.floor(hash(i,7,X)*40),h=3+Math.floor(hash(i,8,X)*6);for(let y=0;y<h;y++)P(X+k,Y-y,[40,90,80]);const c=i%2?[200,180,255]:[160,200,255];P(X+k,Y-h,c);P(X+k-1,Y-h,c);P(X+k+1,Y-h,c);P(X+k,Y-h-1,[240,240,255])}Z.glows.push([X,Y-6,22,'170,160,255'])},
  thornarch(x,X,Y){const P=px3(x),Lf=RAMP.leaf;for(let a=0;a<=Math.PI;a+=.012){for(let t=-3;t<=3;t++){const r=46+t,px=X+Math.round(Math.cos(a)*r),py=Y-Math.round(Math.sin(a)*r*1.3);P(px,py,t===0?[110,30,36]:[60,16,22]);if(hash(Math.round(a*100),t,X)>.93)P(px,py-2,[200,80,70])}}},
  elderroots(x,X,Y){const P=px3(x),Bk=RAMP.bark||TH.wood;for(let i=0;i<6;i++){const s=i%2?1:-1,len=40+i*8;for(let k=0;k<len;k++){const xx=X+s*k*(1+i*.15),yy=Y-Math.round(Math.sin(k/len*Math.PI)*(10+i*3));for(let t=0;t<4;t++)P(Math.round(xx),yy-t,pick(Bk,.4+t/8,Math.round(xx),t))}}}});
/* zones */
const OSI=zIdx('outskirts'),WVI=ZONES.length,WGI=WVI+1,MLI=WVI+2,TVI=WVI+3,EWI=WVI+4;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Wv={id:'whisperwood',name:'Whisperwood Village',ch:'Whisper Woods',theme:'wwvillage',safe:1,lv:[5,5],req:4,ww:1500,start:70,
  seg:[[0,1500,250],[300,180,170,'plank'],[700,220,174,'plank'],[1060,160,170,'plank']],mobs:[],
  portals:[{x:22,to:OSI,tx:720},{x:1478,to:WGI,tx:70}],npcs:['maelis','sorrel'],
  labels:[[390,'Whisperwood Village',130],[1300,'Grove of Whispers',78]],props:[['treehouse',300],['fence',520],['lantern',600],['treehouse',820],['banner',980],['waymarker',1300],['treehouse',1150],['fire',640]],trees:[]};
 const Wg={id:'whispergrove',name:'Grove of Whispers',ch:'Whisper Woods',theme:'spiritgrove',lv:[6,7],req:5,ww:1800,start:70,
  seg:[[0,700,250],[700,400,240],[1100,700,250],[480,90,206,'f'],[1240,90,204,'f']],
  mobs:[['foreststag',0,300],['grovewolf',0,520],['sylvanowl',-2,620],['foreststag',1,900],['grovewolf',2,1200],['grovewolf',2,1400],['sylvanowl',-2,1300],['willowsprite',-2,1650]],
  portals:[{x:22,to:WVI,tx:1460},{x:1380,to:MLI,tx:70},{x:1778,to:TVI,tx:70}],npcs:['oona'],
  labels:[[900,'The Spirit Shrine',90],[1380,'Moonpetal Lake',78],[1760,'Thornveil Hollows',78]],props:[['waymarker',200],['shroom',420],['lshrine',760],['spiritshrine',900],['lantern',1040],['shroom',1500],['waymarker',1700]],trees:[]};
 const Ml={id:'moonpetal',name:'Moonpetal Lake',ch:'Whisper Woods',theme:'moonlake',lv:[7,8],req:6,ww:1700,start:70,
  seg:[[0,460,250],[460,780,292,'bed'],[1240,460,250],[450,18,272,'stone'],[1226,18,272,'stone'],[620,110,250,'plank'],[920,110,248,'plank']],pools:[{x0:460,x1:1240,y:266}],
  mobs:[['thornturtle',0,260],['mossboar',0,380],['sylvanowl',-2,700],['thornturtle',2,1320],['mossboar',2,1450],['sylvanowl',-2,1100],['leafdrake',-2,1560]],
  portals:[{x:22,to:WGI,tx:1380}],npcs:['thane'],labels:[[160,'Lakewarden’s Dock',60],[850,'Moonpetal Lake',100]],
  props:[['moonflowers',300],['reeds',440],['moonflowers',680],['moonflowers',980],['reeds',1260],['moonflowers',1400],['hut',140]],trees:[]};
 const Tv={id:'thornveil',name:'Thornveil Hollows',ch:'Whisper Woods',theme:'thornveil',lv:[8,9],req:7,ww:1800,start:70,
  seg:[[0,600,250],[600,300,262],[900,500,250],[1400,400,244],[420,90,210,'f'],[1060,90,208,'f']],
  mobs:[['bramblelynx',0,320],['bramblelynx',1,720],['grovewolf',2,1000],['bramblelynx',2,1200],['mossboar',2,1320],['bramblelynx',3,1500],['rootwarden',3,1650]],
  portals:[{x:22,to:WGI,tx:1760},{x:1778,to:EWI,tx:70}],npcs:[],labels:[[700,'The Red Hollow',80],[1620,'Warden’s Root',80],[1760,'Elderwood Sanctuary',78]],
  props:[['thornarch',240],['deadoak',520],['thornarch',860],['shroom',1100],['rootmass',1300],['thornarch',1560]],trees:[]};
 const Ew={id:'elderwood',name:'Elderwood Sanctuary',ch:'Whisper Woods',theme:'elderwood',lv:[9,10],req:8,ww:1900,start:70,
  seg:[[0,900,250],[900,500,244],[1400,500,250],[260,200,172,'plank'],[620,200,168,'plank']],
  mobs:[['foreststag',1,1000],['sylvanowl',-2,1150],['foreststag',1,1250],['willowsprite',-2,1500],['eldertreant',2,1720]],
  portals:[{x:22,to:TVI,tx:1760}],npcs:['ilyra'],labels:[[440,'Elderwood Sanctuary',140],[1700,'The Elder’s Rest',110]],
  props:[['treehouse',260],['lantern',420],['treehouse',620],['banner',800],['fence',940],['waymarker',1080],['elderroots',1720]],trees:[]};
 const NN={whisperwood:[],whispergrove:[['whisperbloom',360],['whisperbloom',820],['herb',1100],['whisperbloom',1560]],moonpetal:[['moonpetal',300],['fish',560],['moonpetal',980],['fish',1120],['moonpetal',1380]],
   thornveil:[['glowcap',460],['glowcap',980],['mush',1260],['glowcap',1460]],elderwood:[['heartwood',1080],['timber',1300],['heartwood',1560]]};
 for(const z of[Wv,Wg,Ml,Tv,Ew]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Wv.stations=[{x:560+EDGE,k:'alchemy',n:'Sorrel’s Drying Rack'},{x:640+EDGE,k:'cook',n:'Village Hearth'}];Ew.stations=[{x:760+EDGE,k:'forge',n:'Sanctuary Woodshop'}];
 const O=ZONES[OSI];O.portals.push({x:720+EDGE,to:WVI,tx:70+EDGE});(O.labels=O.labels||[]).push([720+EDGE,'Whisperwood Village',78])}
Object.assign(MAPXY,{whisperwood:[50,44],whispergrove:[57,36],moonpetal:[66,30],thornveil:[66,42],elderwood:[75,36]});WAYS.whisperwood=200;
/* people */
Object.assign(NPCS,{
  maelis:{name:'Elder Maelis',title:'Whisperwood Village',x:420+EDGE,cls:'weaver',look:{sex:1,build:0,face:4,hair:3,hairC:7,beard:0,skin:2,eye:2,outfit:4},eq:{head:'treant',chest:'w_start'},
    lines:['The forest does not hide. It simply waits for you to see.','Paths change, but the trees remember.','Walk with respect, and the forest will walk with you.']},
  sorrel:{name:'Herbalist Sorrel',title:'Whisperwood Village',x:520+EDGE,cls:'weaver',look:{sex:0,build:1,face:3,hair:4,hairC:2,beard:3,skin:1,eye:0,outfit:1},eq:{head:'a_start',chest:'a_start'},
    lines:['Whisperbloom for calm, moonpetal for sleep, glowcap for courage. And heartwood for everything else.','Never strip a patch. Take one in three.','The plants out here are older than any recipe I know.']},
  oona:{name:'Spirit-speaker Oona',title:'Grove of Whispers',x:820+EDGE,cls:'necro',look:{sex:1,build:0,face:1,hair:6,hairC:0,beard:0,skin:3,eye:1,outfit:4},eq:{head:'wisp',chest:'n_start'},
    lines:['Spirits speak, if you listen.','The grove remembers every footstep since the first.','Something in Thornveil is shouting. The spirits cannot hear themselves think.']},
  thane:{name:'Lakewarden Thane',title:'Moonpetal Lake',x:180+EDGE,cls:'ashbow',look:{sex:0,build:2,face:2,hair:1,hairC:4,beard:5,skin:2,eye:0,outfit:2},eq:{head:'wolf',chest:'a_start'},
    lines:['Beauty, mystery, and rare resources. Mostly mystery.','The moonpetals only open when nobody is looking. I look anyway.','Mind the shallows. The turtles bite.']},
  ilyra:{name:'Warden Ilyra',title:'Elderwood Sanctuary',x:500+EDGE,cls:'weaver',look:{sex:1,build:1,face:0,hair:2,hairC:3,beard:0,skin:1,eye:2,outfit:1},eq:{head:'treant',chest:'treant'},
    lines:['A place of balance, learning and reclamation. We take back what was lost, slowly.','The Elder has slept here since before the Gatefall. Lately it does not sleep well.','Heartwood is given, never taken.']}});
Object.assign(BARKS,{maelis:['Welcome, traveller.','Mind the bridges.','The trees are listening.'],sorrel:['One in three!','Fresh whisperbloom?','Smell that?'],oona:['Hush…','They are speaking.','Listen.'],thane:['Moonrise soon.','Mind the shallows.','Turtles!'],ilyra:['Balance.','Tread softly.','The Elder stirs.']});
Object.assign(LORE,{
  wgA:{z:'whispergrove',x:780,k:'stone',t:'Spirit Voice: The First Walker',txt:'“I planted the first oak with a stick and a promise. The promise grew faster.”'},
  wgB:{z:'whispergrove',x:1000,k:'stone',t:'Spirit Voice: The Logger',txt:'“I took more than I should have. The forest took my axe. It was a fair trade, in the end.”'},
  wgC:{z:'whispergrove',x:1080,k:'stone',t:'Spirit Voice: The Child',txt:'“There is a red place past the grove. Something there is hurting. It shouts so loud we cannot sleep.”'},
  mlA:{z:'moonpetal',x:840,k:'note',t:'Lakewarden’s Log',txt:'“Moonpetals opened twice this week, both times under no moon at all. Leafdrake seen over the far shore again. Turtles nesting on the path. Bring a lantern.”'},
  tvA:{z:'thornveil',x:700,k:'stone',t:'Bramble-Choked Marker',txt:'“Thornveil: beautiful places can still kill.” Someone has added, in fresher paint: “Turn back.”'},
  ewA:{z:'elderwood',x:1600,k:'stone',t:'The Elder’s Stone',txt:'“Here rests the Elder, first of the wood, who gave the heartwood that built Whisperwood. Wake it gently, or not at all.”'}});
Object.assign(QUESTS,{
  wv1:{title:'Under the Boughs',giver:'maelis',lv:5,
    offer:'You found us. Few do on their first try. If you mean to walk the deep woods, go to the Grove of Whispers first and speak with Oona. The spirits will want to know who you are.',
    desc:'Speak with Spirit-speaker Oona in the Grove of Whispers.',goal:{t:'talk',npc:'oona'},where:'Grove of Whispers, east of the village',
    done:'Maelis sent you? Good. The spirits have been restless. Sit a while, and listen with me.',reward:{exp:40,sh:15}},
  wv2:{title:'One in Three',giver:'sorrel',lv:6,
    offer:'Whisperbloom grows by the shrine in the Grove. It calms a fever like nothing else. Bring me four, and remember: take one stem in three, never the whole patch.',
    desc:'Gather 4 Whisperbloom in the Grove of Whispers.',goal:{t:'gather',res:'whisperbloom',n:4},where:'Grove of Whispers',prog:'Pale blue flowers near the shrine.',
    done:'Lovely. And you left the roots. You’ll do. Try my moonpetal salve at any alchemy rack; it uses these.',reward:{exp:80,sh:25}},
  wv3:{title:'Moonpetals for the Lanterns',giver:'sorrel',pre:'wv2',lv:7,
    offer:'Our lanterns burn moonpetal oil. The lake is thick with them this season, but the turtles have claimed the shore. Bring me three.',
    desc:'Gather 3 Moonpetal at Moonpetal Lake.',goal:{t:'gather',res:'moonpetal',n:3},where:'Moonpetal Lake',prog:'Violet blooms along the shore.',
    done:'Smell that? The village will be lit for a month.',reward:{exp:110,sh:30}},
  wg1:{title:'Voices in the Grove',giver:'oona',pre:'wv1',lv:6,
    offer:'Three old spirits linger at the shrine stones. Each has something to say to anyone who listens. Hear all three, then come back and tell me what they said.',
    desc:'Listen to the three spirit voices at the shrine.',goal:{t:'event',id:'wgvoice',n:3,lab:'Spirit voices heard'},where:'Grove of Whispers, around the shrine',prog:'The stones around the shrine.',
    done:'A red place, the child said. Thornveil. That is what has them so frightened. Here: the spirits want you to have this.',reward:{exp:70,sh:20,sp:1}},
  wg2:{title:'Wolves at the Shrine',giver:'oona',lv:6,
    offer:'The grove wolves are not themselves. They circle the shrine and snap at anyone who prays. Drive off six of them.',
    desc:'Drive off 6 Grove Wolves.',goal:{t:'kill',mob:'grovewolf',n:6,lab:'Grove wolves driven off'},where:'Grove of Whispers',prog:'They circle the shrine.',
    done:'Quiet again. Thank you. The spirits will remember your name.',reward:{exp:90,sh:25}},
  wg3:{title:'The Willow Sprite',giver:'oona',pre:'wg1',lv:7,
    offer:'A willow sprite has lost itself east of the shrine. It attacks anything that moves. Sprites do not die; they only scatter and reform. Scatter it, and it will come back itself.',
    desc:'Scatter the Willow Sprite at the east end of the grove.',goal:{t:'kill',mob:'willowsprite',n:1,lab:'Willow Sprite scattered'},where:'East Grove of Whispers',prog:'It flits near the east path.',
    done:'There. It will reform by the shrine tomorrow, itself again. Spirits are strange that way.',reward:{exp:250,sh:50}},
  wg4:{title:'Into Thornveil',giver:'oona',pre:'wg1',lv:8,
    offer:'The red place is Thornveil Hollows, past the end of the grove. Bramblelaw lynxes have gone wild there. Thin them, six at least, so the spirits can hear themselves again.',
    desc:'Thin out 6 Bramblelaw Lynxes in Thornveil Hollows.',goal:{t:'kill',mob:'bramblelynx',n:6,lab:'Lynxes thinned'},where:'Thornveil Hollows',prog:'They hunt in the red undergrowth.',
    done:'Better. But the shouting goes on. Something deeper in the Hollows is still wrong.',reward:{exp:150,sh:35}},
  wg5:{title:'The Root Warden',giver:'oona',pre:'wg4',lv:9,
    offer:'The spirits say a Root Warden guards the far end of Thornveil. Wardens were planted to protect the wood. This one has turned, and it is the thing that shouts. Silence it.',
    desc:'Defeat the Root Warden at Warden’s Root.',goal:{t:'kill',mob:'rootwarden',n:1,lab:'Root Warden silenced'},where:'Warden’s Root, east Thornveil',prog:'At the far east of the Hollows.',
    done:'Listen… nothing. Blessed nothing. The grove can sleep. Go on to Elderwood; Warden Ilyra will want to hear this.',reward:{exp:400,sh:70}},
  ml1:{title:'Shells on the Path',giver:'thane',lv:7,
    offer:'Thornshell turtles nest on the shore path every year, and every year they bite someone. Collect four shed shells so I can make warning charms for the path.',
    desc:'Collect 4 Shed Thornshells from Thornshell Turtles.',goal:{t:'collect',mob:'thornturtle',item:'Shed Thornshell',n:4,p:.6},where:'Moonpetal Lake shores',prog:'They nest on both shores.',
    done:'Good thick ones. These will warn people better than any sign.',reward:{exp:110,sh:30}},
  ml2:{title:'The Leafdrake',giver:'thane',pre:'ml1',lv:8,
    offer:'A leafdrake has taken the far shore. Rare as moonlight in daytime, and twice as dangerous. It has started diving at the dock. Drive it off for good.',
    desc:'Defeat the Leafdrake over the far shore.',goal:{t:'kill',mob:'leafdrake',n:1,lab:'Leafdrake defeated'},where:'East shore of Moonpetal Lake',prog:'It circles the far shore.',
    done:'I have kept this lake for twenty years and never seen one up close. Thank you, and stay away from my dock with that grin.',reward:{exp:360,sh:60}},
  ew1:{title:'Heartwood, Freely Given',giver:'ilyra',lv:9,
    offer:'The old trees here shed heartwood when they are ready. We never cut it. Gather two fallen pieces from the sanctuary floor, and I will show you what it makes.',
    desc:'Gather 2 Heartwood in Elderwood Sanctuary.',goal:{t:'gather',res:'heartwood',n:2},where:'Elderwood Sanctuary, beyond the woodshop',prog:'Look beneath the oldest trees.',
    done:'Freely given and gently taken. The woodshop is yours to use.',reward:{exp:160,sh:35}},
  ew2:{title:'The Elder Wakes',giver:'ilyra',pre:'ew1',lv:10,
    offer:'The Elder Treant has woken, and it is not itself. Scar dust in its roots, I think, the same sickness that turned the Root Warden. If it is beaten down, the dust will leave it and it will sleep again. Be careful. Be very careful.',
    desc:'Face the Elder Treant at the Elder’s Rest.',goal:{t:'kill',mob:'eldertreant',n:1,lab:'The Elder calmed'},where:'The Elder’s Rest, east Elderwood',prog:'At the far east end of the sanctuary.',
    done:'It sleeps. Truly sleeps. The forest is breathing again. Whisper Woods owes you more than it can say. When you go on to Stonebridge, go knowing that.',reward:{exp:900,sh:120}}});
/* a quest reward that unlocks Sorrel's recipe, and the spirit voices counting for Oona */
const WGV=['wgA','wgB','wgC'];
const _olw=openLore;openLore=function(id){const r=_olw(id);if(WGV.includes(id)){pl.lore=pl.lore||{};pl.lore[id]=pl.lore[id]||1;const st=qSt('wg1');if(st&&st.s==='a'){st.n=WGV.filter(k=>pl.lore[k]).length;qProgress('wg1','Voice')}}return r};
