/* ---------- Silverwood Wilds (40–45), from the Proposed Map Packages and the Creatures and Materials Bible ----------
   Kept distinct from Whisper Woods the way the package asks: remoteness, navigation uncertainty and canopy layers.
   - The wilds are uncharted: past Greenwood Enclave, each place hides a trail marker. Until you find it, the way
     deeper is lost in the green (you can always go back the way you came).
   - The canopy is the road: places are built in tiers, with the forest floor drowned or thorned and the
     safe routes running along root bridges high above.
   - There are no roads and only three places to rest: the Enclave, Thornroot Camp and Fallsward Hamlet.
   - Every wild species can be befriended; fought, they are driven off. The enemies are illegal clearcutters,
     trappers and the Starblight, a crystal growth spreading from the Starfall Hollow impact. */
REG_NAME.silverwood='Silverwood Wilds';
const SVT=THEMES.grove;
THEMES.silverwood={...SVT,ramps:{...SVT.ramps,far:R(['#0e1a1a','#142424','#1c3230','#26443e','#34584e','#4a7060','#6a8c78']),leaf:R(['#0e1e16','#14281e','#1c3628','#264634','#345a42','#467052','#5e8866','#7ea07e']),
  bark:R(['#3a3e44','#585e66','#7a828a','#a0a8b0','#c8ced4','#e6eaee'])},canopy:'leaf',fog:'rgba(170,200,200,.14)',fog2:'rgba(200,220,220,.06)',ray:'220,255,240',rayA:1.4,amb:'mote',vig:'2,6,6'};
THEMES.silvercanopy={...THEMES.silverwood,fog:'rgba(120,170,150,.2)',ray:'200,255,220',rayA:1.8};
THEMES.moonshade={...THEMES.silverwood,ramps:{...THEMES.silverwood.ramps,far:R(['#06081a','#0c1028','#141a3a','#1e264e','#2a3464','#3a467c','#505e96'])},fog:'rgba(60,70,140,.26)',fog2:'rgba(100,110,190,.1)',ray:'190,200,255',rayA:.9,vig:'0,0,10'};
THEMES.feylight={...THEMES.silverwood,ramps:{...THEMES.silverwood.ramps,far:R(['#0e1a24','#122834','#183846','#20505c','#2c6c74','#3c8a8c','#5aaaa4'])},fog:'rgba(120,220,210,.16)',fog2:'rgba(200,170,255,.08)',ray:'200,255,240',rayA:1.6,amb:'mote'};
THEMES.starfall={...(THEMES.shardspire||THEMES.silverwood),fog:'rgba(150,120,230,.22)',ray:'230,200,255',rayA:1.4};
THEMES.thornroot={...THEMES.silverwood,ramps:{...THEMES.silverwood.ramps,far:R(['#141a12','#1e2618','#2a3420','#38462a','#4a5a36','#5e7046','#7a8a5a'])},fog:'rgba(140,160,110,.18)',ray:'230,240,200',rayA:1.1};
THEMES.deepwood={...(THEMES.cellar||THEMES.under),fog:'rgba(60,90,80,.28)',ray:'160,230,200',rayA:.8,vig:'0,6,4'};
/* canopy: a drowned, thorny floor, with the real route on three tiers of root bridge (jump ~48px dry, ~35 wet) */
SEG_PRE.canopy=w=>{const o=[[0,240,250],[w-240,240,250],[240,w-480,282,'bed']];
  for(let x=330;x<w-300;x+=420)o.push([x,18,258,'stone']);
  for(let x=262,i=0;x<w-330;x+=340,i++)o.push([x,128,214,'plank']);
  for(let x=400;x<w-420;x+=340)o.push([x,118,176,'plank']);
  for(let x=560;x<w-560;x+=680)o.push([x,110,140,'plank']);
  return{seg:o,pools:[{x0:240,x1:w-240,y:262}]}};
SEG_PRE.enclave=w=>{const o=[[0,w,250]];for(let x=420,i=0;x<w-300;x+=360,i++){o.push([x,150,212,'plank']);if(i%2===0)o.push([x+90,130,176,'plank'])}return o};
SEG_PRE.cliffs=w=>{const n=Math.max(5,Math.round(w/320)),s=w/n,o=[];for(let i=0;i<n;i++)o.push([Math.round(i*s),(i<n-1?Math.round((i+1)*s):w)-Math.round(i*s),250-Math.min(4,i)*26]);
  for(let i=1;i<Math.min(5,n);i++)o.push([Math.round(i*s-70),60,250-i*26+12,'plank']);return o};
/* materials */
Object.assign(RES,{silverwood:{n:'Silverwood',c:'#d8dee6',d:'logging',reg:'silverwood'},feysilk:{n:'Feysilk',c:'#e8d8ff',d:'herbalism',reg:'silverwood'},moonresin:{n:'Moon Resin',c:'#9ab0ff',d:'logging',reg:'silverwood'},
  starorchid:{n:'Starlight Orchid',c:'#f0e0ff',d:'herbalism',reg:'silverwood'},pearlstone:{n:'Mistreach Pearlstone',c:'#e8f4f4',d:'fishing',reg:'silverwood'},spineplate:{n:'Spineback Plate',c:'#5aa070',d:'handling',reg:'silverwood'},vinecord:{n:'Living Vinecord',c:'#6aab3a',d:'herbalism',reg:'silverwood'}});
Object.assign(MAT_BASE,{silverwood:['timber','#d8dee6'],feysilk:['herb','#e8d8ff'],moonresin:['timber','#9ab0ff'],starorchid:['herb','#f0e0ff'],pearlstone:['salvage','#e8f4f4'],vinecord:['herb','#6aab3a']});
CSET('wildward','Wildward',['#5a6a70','#2e3a40','#a0aeb4','#e8f0f0','#6aab3a'],['Moonshade Hood','hood','Feysilk Mantle','robe','Vinecord Grips','Canopy Boots','Starlight Charm','crystal'],{bow:'Silverwood Longbow',staff:'Starlight Staff',shield:'Spineplate Shield',daggers:'Moonshade Knives',spear:'Silverwood Spear'});
RECIPES.push(
  {id:'silverbow',d:'wood',r:7,n:'Silverwood Longbow',set:'wildward',make:['weapon','bow'],need:{silverwood:3,moonresin:1,vinecord:1},prop:'Silverwood: pale, flexible, answers to moonlight. Only fallen limbs, never felled.',tune:{atk:1.08},add:{crit:.5}},
  {id:'silverspear',d:'wood',r:7,n:'Silverwood Spear',set:'wildward',make:['weapon','spear'],need:{silverwood:2,pearlstone:1,ore:2},prop:'A pearlstone-set head on a silverwood shaft. Expedition kit.',add:{hp:.5,crit:.3}},
  {id:'feymantle',d:'leather',r:7,n:'Feysilk Mantle',set:'wildward',make:['chest'],need:{feysilk:3,hide:2},prop:'Feysilk from empty cocoons, never from living moths. Light as breath.',add:{mp:.8},tune:{hp:1.05}},
  {id:'spineshield',d:'smith',r:7,n:'Spineplate Shield',set:'wildward',make:['weapon','shield'],need:{spineplate:2,ironroot:2,moonresin:1},prop:'Naturally shed spineback plate on an ironroot laminate.',tune:{atk:.92},add:{def:1}},
  {id:'starstaff',d:'wood',r:7,n:'Starlight Staff',set:'wildward',make:['weapon','staff'],need:{silverwood:2,starorchid:2},prop:'Starlight orchid distilled into the grain. Navigation and focus.',add:{mp:.9}},
  {id:'vinegrips',d:'leather',r:6,n:'Vinecord Grips',set:'wildward',make:['hands'],need:{vinecord:3,hide:1},prop:'Living vinecord, braided while green. For canopy climbing.',add:{crit:.5}},
  {id:'canopyboots',d:'leather',r:6,n:'Canopy Boots',set:'wildward',make:['feet'],need:{vinecord:2,hide:2,moonresin:1},prop:'Soft-soled, resin-gripped. Built for root bridges.',tune:{def:1.05},add:{hp:.4}},
  {id:'starcharm',d:'smith',r:7,n:'Starlight Charm',set:'wildward',make:['charm'],need:{starorchid:1,pearlstone:2,silver:1},prop:'A pearlstone lens holding a pressed orchid.',add:{mp:.5,def:.3}},
  {id:'orchidtonic',d:'alchemy',r:6,n:'Starlight Tonic ×3',use:'pots3',need:{starorchid:1,herb:2},desc:'Focus recovery in a bottle. Three tonics, faintly glowing.'});
/* creatures: the bible's nine species, plus the people and the blight that threaten them */
Object.assign(MOBS,{
  silverhare:{name:'Silverbrush Hare',kind:'quad',ai:'lunger',passive:1,yields:1,hp:50,atk:9,exp:16,w:16,h:12,spd:64,shard:[2,5],aggro:60},
  mistotter:{name:'Mistreach Otter',kind:'quad',ai:'lunger',passive:1,yields:1,hp:66,atk:11,exp:18,w:20,h:11,spd:56,shard:[2,5],aggro:70},
  glider:{name:'Canopy Glider',kind:'fly',ai:'flyer',fly:1,passive:1,yields:1,hp:44,atk:9,exp:16,w:16,h:10,spd:48,shard:[2,5],aggro:70},
  tapir:{name:'Thornroot Tapir',kind:'quad',ai:'lunger',passive:1,yields:1,hp:130,atk:13,exp:24,w:30,h:22,spd:32,shard:[3,6],aggro:80},
  moonlynx:{name:'Moonshade Lynx',kind:'quad',ai:'lunger',yields:1,hp:80,atk:14,exp:22,w:24,h:15,spd:56,shard:[3,6],aggro:130},
  feymoth:{name:'Feylight Moth',kind:'fly',ai:'flyer',fly:1,passive:1,yields:1,elite:1,hp:420,atk:13,exp:380,w:40,h:30,spd:38,shard:[30,50],aggro:120,resp:90},
  spineback:{name:'Emerald Spineback',kind:'quad',ai:'lunger',passive:1,yields:1,elite:1,hp:520,atk:15,exp:440,w:52,h:28,spd:30,shard:[30,50],aggro:120,resp:90},
  rootsong:{name:'Rootsong Warden',kind:'gen',ai:'lunger',passive:1,yields:1,elite:1,hp:560,atk:15,exp:460,w:26,h:46,spd:14,shard:[30,50],aggro:120,resp:90},
  wyrmling:{name:'Silverwood Wyrmling',kind:'quad',ai:'lunger',passive:1,yields:1,hp:120,atk:12,exp:20,w:34,h:14,spd:40,shard:[3,6],aggro:60},
  clearcutter:{name:'Clearcutter',kind:'gen',ai:'lunger',hp:80,atk:14,exp:22,w:14,h:30,spd:38,shard:[4,9],aggro:150},
  trapper:{name:'Trapper',kind:'gen',ai:'lunger',hp:72,atk:15,exp:22,w:14,h:30,spd:42,shard:[4,9],aggro:160},
  starblight:{name:'Starblight Husk',kind:'gen',ai:'lunger',hp:90,atk:15,exp:24,w:16,h:32,spd:26,shard:[4,9],aggro:150},
  brask:{name:'Foreman Brask',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1300,atk:16,exp:1200,w:20,h:40,spd:28,shard:[100,140],aggro:210,resp:120},
  starheart:{name:'The Starblight Heart',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1600,atk:17,exp:1500,w:52,h:96,spd:6,shard:[120,170],aggro:230,resp:150}});
const SVK=['silverhare','mistotter','glider','tapir','moonlynx','feymoth','spineback','rootsong','wyrmling','clearcutter','trapper','starblight','brask','starheart'];for(const k of SVK)MOBS[k].base1=1;
Object.assign(GEAR,{
  silverhare:GS('Silverbrush',['#c8ced4','#7a828a','#eef2f4','#4a6a5a','#e8a0a0'],{n:'Long-ear Hood',s:'hood'},{n:'Silverbrush Vest',s:'leather'},'Soft Paws','Swift Boots',{n:'Nesting Fiber Knot',s:'knot'},{daggers:'Hare-quick Knives',bow:'Glade Bow'}),
  mistotter:GS('Mistreach',['#6a5a4a','#3a2e24','#9a8a72','#e8f4f4','#6ec6e2'],{n:'Whisker Cap',s:'pelt'},{n:'Riverslick Vest',s:'leather'},'Webbed Grips','Riverstep Boots',{n:'Shed Whisker',s:'fang'},{spear:'River Spear',staff:'Mistreach Staff'}),
  glider:GS('Canopy Glider',['#8a7a5a','#4a4230','#b8a882','#f2e6c8','#6aab3a'],{n:'Membrane Hood',s:'hood'},{n:'Glider Cloak',s:'robe'},'Climbing Gloves','Treetop Boots',{n:'Nesting Fiber Charm',s:'knot'},{bow:'Glider Bow',daggers:'Canopy Knives'}),
  tapir:GS('Thornroot',['#3a3a44','#1e1e24','#5a5a66','#c8c0b0','#4c8a30'],{n:'Bristle Helm',s:'pelt'},{n:'Barkhide Coat',s:'leather'},'Thorn Gloves','Mudpath Boots',{n:'Worn Hoof Charm',s:'coin'},{hammer:'Rootpath Maul',shield:'Barkhide Shield'}),
  moonlynx:GS('Moonshade',['#2a2e3a','#14161e','#4a5062','#c8d0e8','#9ac0ff'],{n:'Ear-fan Hood',s:'hood'},{n:'Moonshade Coat',s:'ink'},'Silent Gloves','Moonstep Boots',{n:'Shed Claw Sheath',s:'fang'},{daggers:'Moonshade Fangs',katana:'Moonshade Edge'}),
  feymoth:{...GS('Feylight',['#c8b0e8','#6a5a8a','#f0e8ff','#9af0d8','#ffd27a'],{n:'Feylight Veil',s:'feather'},{n:'Shed-scale Robe',s:'robe'},'Lantern Gloves','Mothstep Slippers',{n:'Empty Cocoon',s:'lamp'},{staff:'Lanternwing Staff',tome:'Book of Night Routes'}),drop:.6},
  spineback:{...GS('Spineback',['#3a6a4a','#1e3a28','#5aa070','#c8e66a','#8a6a3a'],{n:'Plate-crest Helm',s:'horns'},{n:'Shed-plate Mail',s:'plate'},'Climbing Talons','Spineback Greaves',{n:'Shed Plate Chip',s:'scale'},{shield:'Spineback Aegis',hammer:'Spinebreaker'}),drop:.6},
  rootsong:{...GS('Rootsong',['#4a3a2a','#2a2018','#6a5a42','#9af0d8','#6aab3a'],{n:'Woven Antler Crown',s:'antlers'},{n:'Living Fiber Mantle',s:'moss'},'Rootsong Wraps','Rootsong Boots',{n:'Fallen Bark Charm',s:'core'},{staff:'Rootsong Staff',tome:'The Warden’s Memory'}),drop:.6},
  wyrmling:GS('Wyrmling',['#4a6a5a','#22382e','#7aa08a','#d8e8e0','#c4e66a'],{n:'Antler-bark Circlet',s:'antlers'},{n:'Mossed-scale Vest',s:'moss'},'Wyrmling Gloves','Wyrmling Boots',{n:'Shed Scale',s:'scale'},{spear:'Wyrm Lance',staff:'Headwater Staff'}),
  clearcutter:GS('Clearcutter',['#6a4a2a','#3a2a18','#8a6a42','#c8a050','#a8302a'],{n:'Logger’s Cap',s:'kasa'},{n:'Sawdust Coat',s:'leather'},'Axe-callused Gloves','Hobnail Boots',{n:'Confiscated Permit',s:'coin'},{axe:'Felling Axe',hammer:'Splitting Maul'}),
  trapper:GS('Trapper',['#4a4030','#2a2418','#6a5e48','#c8b080','#7a3a2a'],{n:'Trapper’s Hood',s:'hood'},{n:'Trapline Coat',s:'leather'},'Snare Gloves','Trapline Boots',{n:'Sprung Trap',s:'knot'},{bow:'Trapper’s Bow',daggers:'Trapline Knives'}),
  starblight:GS('Starblight',['#4a3a6a','#24183e','#8a6ac8','#e8d8ff','#6ec6e2'],{n:'Crystal-grown Hood',s:'crystal'},{n:'Starblight Shell',s:'plate'},'Crystalline Grips','Starblight Greaves',{n:'Inert Star Shard',s:'shard'},{staff:'Blightglass Staff',daggers:'Shard Knives'}),
  brask:{...GS('Foreman',['#5a3a24','#2e1e12','#8a5a3a','#e3b04b','#a8302a'],{n:'Foreman’s Hat',s:'kasa'},{n:'Foreman’s Coat',s:'leather'},'Foreman’s Gloves','Foreman’s Boots',{n:'The Cutting Contract',s:'core'},{axe:'Clearcut',hammer:'The Foreman’s Maul'}),drop:1,drops:3},
  starheart:{...GS('Starblight Heart',['#3a2a6a','#1e1440','#6a4ab8','#f0e8ff','#9af0d8'],{n:'Cleansed Star Crown',s:'crystal'},{n:'Starfall Plate',s:'plate'},'Starfall Gauntlets','Starfall Greaves',{n:'The Cleansed Heart',s:'core'},{staff:'Starfall Staff',katana:'Skyfall Blade',bow:'Meteor Bow'}),drop:1,drops:3}});
for(const k of SVK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.silverhare={...QUAD.mossrabbit,c:['#3a3e44','#c8ced4','#eef2f4','#7a828a','#1a1210']};
QUAD.mistotter={...QUAD.riverotter,c:['#2a2018','#6a5a4a','#9a8a72','#4a3e30','#1a1210'],extra:(P,Rc,o)=>{QUAD.riverotter.extra(P,Rc,o);const hx=Math.round(o.cx+o.L/2);for(let k=0;k<3;k++){P(hx+4+k,o.cy-1,'#e8f4f4');P(hx+4+k,o.cy+1,'#e8f4f4')}}};
QUAD.tapir={...QUAD.boar,cw:48,ch:30,cx:20,len:26,bh:12,leg:6,lw:4,c:['#14141a','#3a3a44','#5a5a66','#22222a','#1a1210'],extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2);for(let k=0;k<6;k++)Rc(hx+k,o.cy-3+Math.round(k*.4),2,3,'#3a3a44');
  for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2-2;x+=2)P(x,Math.floor(o.cy-o.bh/2)-1,'#5a5a66');for(let i=0;i<4;i++)P(Math.round(o.cx-8+i*5),o.cy,'#4c8a30')}};
QUAD.moonlynx={...QUAD.bramblelynx,c:['#0e1018','#2a2e3a','#4a5062','#14161e','#9ac0ff'],extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2+1),hy=Math.floor(o.cy-o.bh/2)-4;for(const dx of[0,3]){P(hx+dx,hy,'#c8d0e8');P(hx+dx-1,hy-1,'#c8d0e8');P(hx+dx+1,hy-1,'#c8d0e8')}P(hx+4,hy+3,'#9ac0ff')}};
QUAD.spineback={...QUAD.marshstalker,cw:80,ch:36,cx:34,len:44,bh:13,leg:7,lw:4,c:['#14281c','#3a6a4a','#5aa070','#22402c','#c8e66a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<9;i++){const x=Math.round(o.cx-o.L/2+3+i*4.6),h=4+(i%3);for(let y=0;y<h;y++)for(let k=0;k<3-Math.floor(y/2);k++)P(x+k,top-1-y,y===h-1?'#c8e66a':'#5aa070')}
  for(const dx of[-4,6])for(let y=0;y<o.leg;y++)Rc(Math.round(o.cx+dx),Math.round(o.cy+o.bh/2)+y,3,1,'#22402c');const hx=Math.round(o.cx+o.L/2-2);P(hx+3,o.cy-4,'#c8e66a')}};
QUAD.wyrmling={...QUAD.marshstalker,cw:54,ch:20,cx:24,len:30,bh:6,leg:2,lw:2,c:['#14261e','#4a6a5a','#7aa08a','#22382e','#c4e66a'],extra:(P,Rc,o)=>{QUAD.marshstalker.extra(P,Rc,o);const hx=Math.round(o.cx+o.L/2+2),hy=o.cy-5;for(let k=0;k<5;k++){P(hx+Math.round(k*.6),hy-k,'#8a6a3a');P(hx+3+Math.round(k*.3),hy-k,'#8a6a3a')}P(hx+1,hy-5,'#6aab3a');for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2;x+=4)P(x,Math.floor(o.cy-o.bh/2)-1,'#6aab3a')}};
const CUTTER={...BANDIT,body:['#3a2a18','#6a4a2a','#8a6a42'],hat:(P,Rc,hx,hy)=>{Rc(hx-6,hy-1,13,2,'#5a4a2a');Rc(hx-3,hy-4,7,3,'#6a5a32')},hand:(P,Rc,x,y,mode)=>{for(let k=0;k<9;k++)P(x+1+Math.round(k*.3),y-k*(mode==='wind'?1:.5),'#5a3a26');Rc(x+3,y-(mode==='wind'?11:6),5,4,'#c8ccd4')}};
const TRAPR={...POACH,body:['#2a2418','#4a4030','#6a5e48']};
const BLIGHT={h:32,tw:5,lw:2,leg:['#24183e','#3a2a5a'],boot:'#140e24',body:['#24183e','#4a3a6a','#6a5a8a'],skin:['#3a2a5a','#6a5a8a','#9a8ab8'],eye:'#9af0d8',
  hat:(P,Rc,hx,hy)=>{for(const[dx,h]of[[-3,5],[0,7],[3,4]])for(let y=0;y<h;y++)P(hx+dx,hy-1-y,y===h-1?'#ffffff':'#c9a8ff')},
  hand:(P,Rc,x,y,mode)=>{for(let k=0;k<4;k++)P(x+k,y-k,'#c9a8ff');if(mode==='wind')P(x+4,y-4,'#ffffff')},fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(const[dx,dy]of[[-4,10],[3,14],[0,20]]){P(x+dx,hy+dy+b,'#9af0d8');P(x+dx,hy+dy-1+b,'#ffffff')}}};
const FOREMAN={...TOLL,body:['#3a2414','#6a4a2a','#8a6a42'],hat:(P,Rc,hx,hy)=>{Rc(hx-7,hy-1,15,2,'#5a4a2a');Rc(hx-4,hy-5,9,4,'#6a5a32');P(hx+3,hy-5,'#e3b04b')},
  hand:(P,Rc,x,y,mode)=>{for(let k=0;k<13;k++)P(x+1+Math.round(k*.2),y-k*(mode==='wind'?1:.6),'#5a3a26');Rc(x+3,y-(mode==='wind'?15:9),7,6,'#d8dce4');Rc(x+3,y-(mode==='wind'?15:9),2,6,'#a8acb4')}};
const STARH={...TITAN,body:['#2a1e48','#4a3a7a','#7a6ab8'],skin:['#3a2a6a','#6a5aa8','#a898e0'],eye:'#9af0d8'};
const _brS=buildRoster;buildRoster=function(){_brS();const md=['walk0','walk1','wind','lunge'];
  const H=(k,w,h,ax,ay,spec,fps,s2)=>{const o={kind:'gen',ax:s2?ax*2:ax,ay:s2?ay*2:ay,fps},F={};for(const m of md){const a=humanoid(w,h,ax,spec,m),b=humanoid(w,h,ax,spec,m,1);o[m]=s2?scale2(a):a;F[m]=s2?scale2(b):b}o.F=F;MSP[k]=o};
  H('clearcutter',34,38,14,36,CUTTER,4);H('trapper',34,38,14,36,TRAPR,4);H('starblight',34,40,14,38,BLIGHT,3);H('brask',44,48,18,46,FOREMAN,3);H('starheart',48,54,22,52,STARH,2,1);
  {const o={kind:'gen',ax:25,ay:56,fps:2},F={},PL={B:['#1a1410','#2a2018','#4a3a2a','#6a5a42','#8a7a5a','#a8987a'],M:['#356b28','#6aab3a','#9af0d8'],gl:'#9af0d8',gl2:'#e8fff8'};for(const m of md){o[m]=treantFrame(m,0,PL);F[m]=treantFrame(m,1,PL)}o.F=F;MSP.rootsong=o}
  const gB=['#4a4230','#8a7a5a','#b8a882','#f2e6c8'];MSP.glider={kind:'fly',ax:17,ay:16,fl:[0,1,2].map(p=>birdFrame(gB,0,p,0,0)),ch:birdFrame(gB,0,1,1,0),F:{fl:[0,1,2].map(p=>birdFrame(gB,0,p,0,1)),ch:birdFrame(gB,0,1,1,1)}};
  const toFey=(r,g,b)=>{const l=(r+g+b)/3;return l>150?[Math.min(255,l*.95),Math.min(255,l*.9),255]:l>90?[l*.9,Math.min(255,l*1.25),Math.min(255,l*1.2)]:null},fm=c=>scale2(recolor(c,toFey));
  if(typeof mothFrame==='function')MSP.feymoth={kind:'fly',ax:32,ay:28,fl:[0,1,2].map(p=>fm(mothFrame(p,0,0))),ch:fm(mothFrame(1,1,0)),F:{fl:[0,1,2].map(p=>scale2(mothFrame(p,0,1))),ch:scale2(mothFrame(1,1,1))}}};
/* set dressing */
Object.assign(PROPS,{
  silvertree(x,X,Y){const P=px3(x),B=R(['#585e66','#7a828a','#a0a8b0','#c8ced4','#e6eaee']),L=RAMP.leaf;for(let y=0;y<200;y++){const hw=12+(y<16?Math.round((16-y)*.9):0);for(let k=-hw;k<=hw;k++)P(X+k,Y-y,pick(B,.6-(k+hw)/(hw*4)+((y*7+k)%23===0?-.2:0),X+k,y))}
    for(let i=0;i<140;i++){const a=hash(i,1,X)*6.28,r=20+hash(i,2,X)*44;P(X+Math.round(Math.cos(a)*r),Y-200+Math.round(Math.sin(a)*r*.5),pick(L,.3+hash(i,3,X)*.6,X,i))}},
  rootbridge(x,X,Y){const P=px3(x),B=R(['#3a2e22','#5a4a36','#7a6650','#9a8466']);for(let k=-70;k<=70;k++){const sag=Math.round((1-(k*k)/4900)*6);for(let t=0;t<4;t++)P(X+k,Y-80+sag+t,pick(B,.3+t/8,X+k,t))}for(const k of[-70,70])for(let y=0;y<80;y++)for(let t=-3;t<=3;t++)P(X+k+t,Y-y,pick(B,.5+t/10,X,y))},
  trailmark(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<26;y++){P(X,Y-y,W[2]);P(X+1,Y-y,W[4])}for(let k=-6;k<=6;k++)for(let y=18;y<24;y++)P(X+k+(y>20?1:0),Y-y,[200,40,40])},
  cocoon(x,X,Y){const P=px3(x);for(const dx of[-14,6,20]){for(let y=0;y<40;y++)P(X+dx,Y-60+y,[90,110,90]);for(let y=0;y<14;y++){const w=Math.round(Math.sin(y/14*Math.PI)*5);for(let k=-w;k<=w;k++)P(X+dx+k,Y-20+y-14,(k+y)%3?[232,216,255]:[200,190,230])}}Z.glows.push([X,Y-28,20,'220,200,255'])},
  falls(x,X,Y){const P=px3(x);for(let y=0;y<200;y++)for(let k=-22;k<=22;k++){const s=(y+k*3+Math.floor(hash(k,1,X)*20))%9;P(X+k,Y-y,s<2?[255,255,255]:s<5?[180,220,230]:[120,180,200])}for(let k=-40;k<=40;k++)for(let y=0;y<6;y++)if(hash(k,y,X)>.5)P(X+k,Y-y,[230,245,250])},
  crater(x,X,Y){const P=px3(x);for(let k=-60;k<=60;k++){const d=Math.round((1-(k*k)/3600)*10);for(let y=0;y<d;y++)P(X+k,Y-y,[40,30,60])}for(const[dx,h]of[[-30,30],[-8,48],[16,36],[40,22]])for(let y=0;y<h;y++){const w=Math.max(0,4-Math.floor(y/(h/4)));for(let k=-w;k<=w;k++)P(X+dx+k,Y-y,y>h-4?[255,255,255]:[180,150,255])}Z.glows.push([X,Y-30,50,'180,150,255'])}});
/* places: entered from the far east of the Golden Plains */
const BASE_SV={reg:'silverwood',wx:['clear','clear','rain','rain']};
addPlace({...BASE_SV,id:'greenwood',name:'Greenwood Enclave',lv:[40,40],from:'stonecircle',at:.25,theme:'silverwood',terrain:'enclave',ww:2000,safe:1,
  props:['silvertree','rootbridge','silvertree','rootbridge','silvertree'],nodes:['pearlstone'],stations:[['forge','Expedition Workshop'],['alchemy','Field Clinic'],['cook','Root-terrace Kitchen']],
  labels:[[400,'The Expedition Hall',150],[1500,'The Seed Vault',150]],
  npc:{id:'thessa',name:'Expedition-master Thessa',cls:'scout',head:'sc_start',chest:'sc_start',lines:['Untamed beauty. Hidden wonders. Bad maps.','Half the Wilds are charted. The other half is charted wrong. Find the trail markers; they are the only maps that never lie.','We build light here. Root terraces, rope, nothing that does not grow back.']},
  quests:{sv1:{title:'Into the Uncharted',lv:40,offer:'Beyond the Enclave nothing is charted reliably. In every place, the rangers left a red trail marker before the trails moved. Find the one at Mistreach River and the way deeper will open for you.',desc:'Find the trail marker at Mistreach River.',goal:{t:'event',id:'chart_mistreach',n:1,lab:'Mistreach River charted'},where:'Mistreach River, east of the Enclave',prog:'A red-flagged post somewhere along the river.',done:'Charted. One down, and a forest to go. Each place deeper has its own marker; find them as you go.',reward:{exp:1500,sh:140}},
    sv2:{title:'Fallen Limbs Only',lv:41,offer:'The workshop needs silverwood. Fallen limbs only: we do not fell here, ever. Three pieces.',desc:'Gather 3 Silverwood.',goal:{t:'gather',res:'silverwood',n:3},where:'Mistreach River and the Silent Canopy',prog:'Pale, silver-barked limbs on the forest floor.',done:'Air-seasoned under low light. Beautiful. The workshop will make bows from these the Plains would trade a herd for.',reward:{exp:1500,sh:140}}}});
addPlace({...BASE_SV,id:'mistreach',name:'Mistreach River',lv:[40,41],from:'greenwood',at:.95,theme:'silverwood',terrain:'water',ww:2200,
  mobs:['mistotter','silverhare','clearcutter','mistotter','silverhare','clearcutter'],props:['silvertree','reeds','trailmark','silvertree','reeds','silvertree'],nodes:['pearlstone','silverwood','vinecord','pearlstone'],
  labels:[[1700,'Mistreach Station',100]],
  npc:{id:'calder',name:'Surveyor Calder',cls:'gatherer',head:'ga_start',chest:'ga_start',lines:['Mistreach Station: weather instruments, sample jars, and a very small emergency shelter.','The otters bring me pearlstone if I ask nicely. The clearcutters bring me headaches.','Clearcutters dam the side channels to float their logs out. It kills the river.']},
  quests:{mr3:{title:'Dams on the River',lv:41,offer:'Clearcutters dam the side channels to float stolen silverwood out. Drive off six of them and I will break their dams behind you.',desc:'Drive off 6 Clearcutters.',goal:{t:'kill',mob:'clearcutter',n:6,lab:'Clearcutters driven off'},where:'Mistreach River and the Silent Canopy',prog:'They work the riverbanks with axes.',done:'The channels are running again. The otters will be back by spring.',reward:{exp:1550,sh:140}}}});
addPlace({...BASE_SV,id:'silentcanopy',name:'The Silent Canopy',lv:[41,42],from:'mistreach',at:.9,map:[0,-6],theme:'silvercanopy',terrain:'canopy',ww:2400,
  mobs:['glider','clearcutter','glider','silverhare','clearcutter','glider','clearcutter'],elite:'brask',props:['silvertree','rootbridge','silvertree','trailmark','rootbridge','silvertree','rootbridge'],nodes:['silverwood','vinecord','moonresin','silverwood'],
  labels:[[1200,'The Silent Nest',170]],
  npc:{id:'maelin',name:'Canopy-runner Maelin',cls:'scout',head:'sc_start',chest:'sc_start',lines:['Down there is thorn and bog. Up here is the road. Stay up here.','The gliders nest in the high canopy. The clearcutters want the trees they nest in.','Brask runs the cutting crews. Brask runs everything that cuts.']},
  quests:{sc4:{title:'Foreman Brask',lv:42,offer:'Brask runs every illegal cutting crew in the Wilds from a camp at the east end of the canopy. Break the camp and the crews scatter.',desc:'Defeat Foreman Brask.',goal:{t:'kill',mob:'brask',n:1,lab:'Foreman Brask defeated'},where:'The east end of the Silent Canopy',prog:'His camp is at the far end of the canopy.',done:'Brask is done. The crews are already running for the Plains. The gliders will keep their trees.',reward:{exp:2200,sh:200}}}});
addPlace({...BASE_SV,id:'moonshade',name:'Moonshade Grove',lv:[42,43],from:'silentcanopy',at:.5,map:[6,-4],theme:'moonshade',terrain:'hills',ww:2000,
  mobs:['moonlynx','silverhare','trapper','moonlynx','trapper','moonlynx'],props:['silvertree','shroom','trailmark','silvertree','lshrine','silvertree'],nodes:['moonresin','starorchid','moonresin'],
  labels:[[1500,'Moonshade Refuge',100]],
  npc:{id:'ysra',name:'Refuge-keeper Ysra',cls:'necro',head:'wisp',chest:'n_start',lines:['A protected grove. Quiet voices, low light, slow steps.','The lynxes leave if the grove grows loud. They come back if it grows safe.','Trappers set snares on the lynx paths. I cut them. They set more.']},
  quests:{mg1:{title:'Snares on the Lynx Paths',lv:42,offer:'Trappers are snaring the Moonshade lynx paths. Drive off six and I can cut the lines in peace.',desc:'Drive off 6 Trappers.',goal:{t:'kill',mob:'trapper',n:6,lab:'Trappers driven off'},where:'Moonshade Grove and Thornroot Pass',prog:'They work the lynx paths at dusk.',done:'The lines are cut. The lynxes will return to the paths, in time.',reward:{exp:1600,sh:150}},
    mg2:{title:'Moon Resin',lv:43,offer:'Moon resin, night-tapped, small amounts. Three measures for the refuge medicines. Tap gently.',desc:'Gather 3 Moon Resin.',goal:{t:'gather',res:'moonresin',n:3},where:'Moonshade Grove and the Silent Canopy',prog:'Blue-glinting resin on mature trunks.',done:'Pure and cool. The refuge thanks you, quietly.',reward:{exp:1600,sh:140}}}});
addPlace({...BASE_SV,id:'thornroot',name:'Thornroot Pass',lv:[42,43],from:'mistreach',at:.5,map:[6,6],theme:'thornroot',terrain:'hills',ww:2000,
  mobs:['tapir','trapper','tapir','silverhare','trapper','tapir'],props:['thornarch','trailmark','tent','thornarch','fire','thornarch'],nodes:['vinecord','ironroot','vinecord'],
  labels:[[900,'Thornroot Camp',100]],
  npc:{id:'quillon',name:'Ranger Quillon',cls:'traveler',lines:['Thornroot Camp moves when the pass moves. Today it is here.','The tapirs make the paths. Follow a tapir and you will never be lost.','Living barriers, predators, shifting access. A normal Tuesday.']},
  quests:{tr5:{title:'Follow the Tapirs',lv:43,offer:'The tapirs open the paths through the thorns. Befriend one and the pass opens to you for good.',desc:'Befriend any creature in the Wilds; a Thornroot Tapir is best.',goal:{t:'bond',n:1},where:'Thornroot Pass',prog:'Offer food to a calm creature.',done:'There. Now you will never be lost in the thorns.',reward:{exp:1650,sh:140}}}});
addPlace({...BASE_SV,id:'feylight',name:'Feylight Glade',lv:[43,44],from:'moonshade',at:.9,map:[6,-2],theme:'feylight',terrain:'water',ww:2000,
  mobs:['feymoth','glider','trapper','starblight','glider','trapper'],props:['cocoon','reeds','trailmark','cocoon','moonflowers','cocoon'],nodes:['feysilk','starorchid','feysilk','pearlstone'],
  labels:[[1100,'The Feylight Mirrors',120]],
  npc:{id:'lenne',name:'Lenne of the Glade',cls:'aspirant',head:'as_start',chest:'as_start',lines:['The mirrors in the pools show the path you took, not the one you are on. Do not trust them.','The moths migrate through here. They are harmless unless frightened.','Feysilk from empty cocoons only. Never from a living moth.']},
  quests:{fg1:{title:'The Migration',lv:43,offer:'Trappers net the moths for their scales. The migration is now. Drive off six trappers before the moths reach the glade.',desc:'Drive off 6 Trappers.',goal:{t:'kill',mob:'trapper',n:6,lab:'Trappers driven off'},where:'Feylight Glade and Moonshade Grove',prog:'They set nets by the pools.',done:'The moths are coming through clean. Look up tonight; it is something to see.',reward:{exp:1700,sh:150}},
    fg2:{title:'Empty Cocoons',lv:44,offer:'Feysilk comes from cocoons the moths have already left. Gather three lengths.',desc:'Gather 3 Feysilk.',goal:{t:'gather',res:'feysilk',n:3},where:'Feylight Glade',prog:'Pale silk cocoons, already empty.',done:'Empty, every one. Thank you for checking.',reward:{exp:1700,sh:140}}}});
addPlace({...BASE_SV,id:'starfalls',name:'Starlight Falls',lv:[43,44],from:'thornroot',at:.9,map:[6,0],theme:'silverwood',terrain:'cliffs',ww:2000,
  mobs:['mistotter','spineback','silverhare','moonlynx','mistotter'],props:['silvertree','trailmark','falls','rootbridge','silvertree'],nodes:['starorchid','pearlstone','silverwood'],
  labels:[[300,'Fallsward Hamlet',100],[1400,'The Headwaters',190]],
  npc:{id:'tarrow',name:'Climbmaster Tarrow',cls:'guard',head:'gd_start',chest:'sc_start',lines:['Fallsward: rope bridges, rescue services, and very strong arms.','Above the falls are the Headwaters. Above the Headwaters, something enormous sleeps.','Spinebacks shed plates on the cliff paths. Free armour, if you can climb to it.']}});
addPlace({...BASE_SV,id:'deepwood',name:'Deepwood Ruins',lv:[44,45],from:'feylight',at:.8,map:[6,4],theme:'deepwood',terrain:'ledges',ww:2000,
  mobs:['starblight','rootsong','starblight','clearcutter','starblight'],props:['pillar','trailmark','sealstone','pillar','rootmass','sealstone'],nodes:['ironroot','moonresin','starorchid'],
  labels:[[1000,'The Flooded Archive',120]]});
addPlace({...BASE_SV,id:'emeraldspire',name:'The Emerald Spire',lv:[44,45],from:'starfalls',at:.85,map:[6,-6],theme:'silverwood',terrain:'cliffs',ww:2000,
  mobs:['spineback','glider','moonlynx','spineback','glider'],props:['silvertree','trailmark','rootbridge','cairn','silvertree'],nodes:['silverwood','starorchid','vinecord'],
  labels:[[1700,'The Observation Platform',230]]});
addPlace({...BASE_SV,id:'starfallhollow',name:'Starfall Hollow',lv:[44,45],from:'deepwood',at:.9,map:[6,0],theme:'starfall',terrain:'hills',ww:2000,
  mobs:['starblight','starblight','starblight','starblight'],elite:'starheart',props:['crater','shard','crater','floatrock','crater'],nodes:['shard','starorchid','stabfrag'],
  labels:[[1000,'The Impact',120]]});
Object.assign(MAPXY,{greenwood:[70,92],mistreach:[78,92],silentcanopy:[78,82],moonshade:[86,78],thornroot:[86,96],feylight:[92,84],starfalls:[94,96],deepwood:[94,72],emeraldspire:[98,90],starfallhollow:[98,72]});
WAYS.greenwood=300;WAYS.thornroot=260;WAYS.starfalls=260;
/* the trail markers: each wild place must be charted before its way deeper opens */
const SV_IDS=['mistreach','silentcanopy','moonshade','thornroot','feylight','starfalls','deepwood','emeraldspire','starfallhollow'];
const TRAILX=id=>{const z=ZONES[zIdx(id)],pr=(z.props||[]).find(p=>p[0]==='trailmark');return pr?pr[1]:null};
const charted=id=>!!(pl.flags.chart&&pl.flags.chart[id]);
const _trS=travel;travel=function(po){const t=ZONES[po.to];if(t&&SV_IDS.includes(Z.id)&&SV_IDS.includes(t.id)&&!(pl.flags.seen||{})[t.id]&&!charted(Z.id)){banner('Uncharted','The way is lost in the green. Find this place’s trail marker first.');S.nums.push({x:pl.x,y:pl.y-40,txt:'UNCHARTED',t:0,c:'#ffd27a'});return}return _trS(po)};
const _ezS=enterZone;enterZone=function(...a){const r=_ezS(...a);if(SV_IDS.includes(Z.id)&&!charted(Z.id))setTimeout(()=>{if(SV_IDS.includes(Z.id)&&!charted(Z.id))S.nums.push({x:pl.x,y:pl.y-60,txt:'UNCHARTED · find the red trail marker',t:-.6,c:'#ffd27a'})},900);return r};
/* the Silverwood Leviathan accord: break the dams, protect the migration, mend the Rootsong Warden, cleanse the Starblight, then go to the Headwaters */
Object.assign(QUESTS,{
  sl1:{title:'The Warden’s Song',giver:'lenne',lv:44,
    offer:'A Rootsong Warden lies broken in the Deepwood Ruins: three of its root-knots torn out by the clearcutters. It remembers the Wilds before us. Mend the knots and it may sing again.',
    desc:'Mend the three torn root-knots in the Deepwood Ruins.',goal:{t:'event',id:'rootknot',n:3,lab:'Root-knots mended'},where:'Deepwood Ruins',prog:'Torn root-knots glow faintly along the ruins.',
    done:'It is singing. Can you hear it? Low, under everything. It is telling the Wilds that someone helped.',reward:{exp:1800,sh:150,sp:1}},
  sl2:{title:'The Starblight Heart',giver:'tarrow',lv:45,
    offer:'Something fell in the Hollow and it is spreading crystal through the roots like a sickness. The husks are its work. Break its heart and the Wilds can heal. The thing at the Headwaters will not wake while the Starblight spreads.',
    desc:'Destroy the Starblight Heart in Starfall Hollow.',goal:{t:'kill',mob:'starheart',n:1,lab:'Starblight Heart destroyed'},where:'The Impact, Starfall Hollow',prog:'At the centre of the impact.',
    done:'The crystal is going grey and brittle all through the roots. It is over. Now go up to the Headwaters.',reward:{exp:2600,sh:240}},
  sl3:{title:'The Living Route',giver:'thessa',pre:'sl2',lv:45,
    offer:'The rivers run, the moths fly, the Warden sings, the Starblight is dead. The Silverwood Leviathan is waking at the Headwaters above Starlight Falls. Go up. Do not take anything. Be seen.',
    desc:'Meet the Silverwood Leviathan at the Headwaters.',goal:{t:'event',id:'leviaccord',n:1,lab:'Accord made'},where:'The Headwaters, top of Starlight Falls',prog:'Climb to the Headwaters and wait.',
    done:'An accord with the Wilds itself. And one of its young followed you down. A wyrmling. It chose you. Walk well together.',reward:{exp:3000,sh:300,sp:2,fl:{leviAccord:1}}}});
const _qAvS=qAvail;qAvail=function(k){if(k==='sl3'&&!['mr3','fg1','sl1'].every(q=>qSt(q)&&qSt(q).s==='d'))return false;return _qAvS(k)};
const _qfS=questFlag;questFlag=function(fl){_qfS(fl);if(fl.leviAccord){const c=CB(),id='wyrmling-'+cid();c.b[id]={t:'wyrmling',n:'Brook, Silverwood Wyrmling',tr:60,lv:Math.max(1,pl.lv-1),xp:0};c.own.push(id);if(!c.act){c.act=id;spawnComp()}banner('Brook will walk with you','Silverwood Wyrmling · a new companion')}};
/* the Leviathan: a living route above the falls, drawn behind the world */
function leviSprite(ph){return scale2(sprite(200,60,(P,Rc)=>{for(let i=0;i<180;i++){const x=10+i,y=34+Math.round(Math.sin(i*.07+ph*.6)*8),w=i<20?Math.round(i/3)+2:i>150?Math.max(2,Math.round((180-i)/4)):9;
    for(let j=0;j<w;j++)P(x,y-Math.floor(w/2)+j,j===0?'#7aa08a':j===w-1?'#22382e':(i+j)%5===0?'#6aab3a':'#4a6a5a');if(i%9===0)for(let k=0;k<3;k++)P(x,y-Math.floor(w/2)-1-k,k<2?'#4c8a30':'#c4e66a')}
  const hx=190,hy=34+Math.round(Math.sin(180*.07+ph*.6)*8);Rc(hx-6,hy-6,14,10,'#4a6a5a');Rc(hx-6,hy-6,14,2,'#7aa08a');P(hx+3,hy-3,'#e8fff8');for(let k=0;k<10;k++){P(hx-4-Math.round(k*.4),hy-7-k,'#8a6a3a');P(hx+2+Math.round(k*.2),hy-7-k,'#8a6a3a');if(k%3===2){P(hx-5-Math.round(k*.4),hy-8-k,'#6aab3a');P(hx+3+Math.round(k*.2),hy-8-k,'#6aab3a')}}}))}
let LEVI=null;const LEVX=()=>1400+EDGE;
function drawSilver(cx,cy){if(Z.id==='starfalls'){if(!LEVI)LEVI=[leviSprite(0),leviSprite(1),leviSprite(2)];const f=LEVI[Math.floor(S.t*.7)%3],X=LEVX(),x=ri(X-cx-200),y=ri(topAt(X)-cy-140);if(x<W&&x+400>0)g.drawImage(f,x,y)}
  const tx=SV_IDS.includes(Z.id)&&!charted(Z.id)?TRAILX(Z.id):null;if(tx!=null){const X=tx,x=ri(X-cx),y=ri(topAt(X)-cy)-34+Math.sin(S.t*4)*2;if(x>-10&&x<W+10){g.fillStyle='rgba(255,90,70,.85)';g.fillRect(x-1,y,3,3)}}
  if(Z.id==='deepwood'){const s=qSt('sl1');if(s&&s.s==='a')for(const k of KNOTS)if(!(pl.flags.knots||{})[k]){const X=k+EDGE,x=ri(X-cx),y=ri(topAt(X)-cy)-10;if(x>-10&&x<W+10){g.fillStyle=`rgba(154,240,216,${.5+.4*Math.sin(S.t*3+k)})`;g.fillRect(x-3,y-3,7,7)}}}}
const _dsS=drawSealed;drawSealed=function(cx,cy){_dsS(cx,cy);drawSilver(cx,cy)};
const KNOTS=[480,1100,1580];
function silverNear(){if(SV_IDS.includes(Z.id)&&!charted(Z.id)){const tx=TRAILX(Z.id);if(tx!=null&&Math.abs(pl.x-tx)<34)return{k:'trail'}}
  if(Z.id==='deepwood'){const s=qSt('sl1');if(s&&s.s==='a'){pl.flags.knots=pl.flags.knots||{};for(const k of KNOTS)if(!pl.flags.knots[k]&&Math.abs(pl.x-(k+EDGE))<30)return{k:'knot',x:k}}}
  if(Z.id==='starfalls'){const s=qSt('sl3');if(s&&s.s==='a'&&s.n<1&&Math.abs(pl.x-LEVX())<160)return{k:'leviathan'}}
  const m=S.mobs.find(m=>m.t==='spineback'&&!m.dead&&!m.aggro&&Math.abs(m.x-pl.x)<44&&Math.abs(m.y-pl.y)<34);if(m&&!(m.cared&&S.t-m.cared<90))return{k:'plate',m};return null}
const _cnS=crNear;crNear=function(){return silverNear()||_cnS()};
const _cuS=crUse;crUse=function(n){if(!n||!['trail','knot','leviathan','plate'].includes(n.k))return _cuS(n);
  if(n.k==='trail'){pl.flags.chart=pl.flags.chart||{};pl.flags.chart[Z.id]=1;qEvent('chart_'+Z.id);banner('Charted · '+Z.name,'The trail marker shows the way deeper');sfx.pick();save();return}
  if(n.k==='knot'){pl.flags.knots[n.x]=1;const s=qSt('sl1');s.n=Math.min(3,Object.keys(pl.flags.knots).length);qProgress('sl1','Root-knot');for(let i=0;i<12;i++)S.parts.push({x:pl.x,y:pl.y-20,vx:(Math.random()-.5)*60,vy:-30-Math.random()*30,t:0,life:.8,c:'#9af0d8',g:-10,s:2});save();return}
  if(n.k==='leviathan'){qEvent('leviaccord');banner('The Silverwood Leviathan','It turns its great antlered head and looks at you for a long, long time');for(let i=0;i<30;i++)S.parts.push({x:pl.x+(Math.random()-.5)*240,y:pl.y-60-Math.random()*80,vx:0,vy:-14,t:0,life:1.6,c:i%2?'#9af0d8':'#c4e66a',g:-6,s:2});return}
  if(n.k==='plate'){n.m.cared=S.t;addMat('spineplate',1,n.m.x,n.m.y);banner('Shed plate','You pick up a plate the spineback let fall on the path');dGain('handling',10);sfx.pick();save()}};
const _clS=crLabel;crLabel=function(n){if(!n)return _clS(n);if(n.k==='trail')return'Read · Trail marker';if(n.k==='knot')return'Mend · Root-knot';if(n.k==='leviathan')return'Approach · The Silverwood Leviathan';if(n.k==='plate')return'Gather · shed plate (Spineback)';return _clS(n)};
