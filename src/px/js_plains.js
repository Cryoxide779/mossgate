/* ---------- The Golden Plains (35–40), the first territory beyond the launch world ----------
   Built from the Proposed Zone Map Packages and the Proposed Creatures and Materials Bible.
   The bible's invariant holds here: every wild species can be befriended, wild creatures that are fought
   are driven off rather than killed, and creature materials come from care (shearing, shed horn), never loot.
   The fights are with people: Longroad bandits, poachers, and the Toll-Lord of the Redoubt. */
REG_NAME.golden='The Golden Plains';
THEMES.prairie={...THEMES.plains,ramps:{...THEMES.plains.ramps,far:R(['#5a6a8a','#7484a2','#90a0b8','#aebacb','#ccd4dc','#e4e6e0','#f6f0dc']),grass:R(['#6a5a1e','#8a7a2a','#a8963a','#c4b04a','#dcc860','#f0dc7a'])},fog:'rgba(240,210,140,.08)',ray:'255,232,170',rayA:1.6,amb:'mote',vig:'8,6,2'};
THEMES.sunfield={...THEMES.prairie,fog:'rgba(240,220,170,.08)',ray:'255,236,180',rayA:1.8};
THEMES.wildherd={...THEMES.prairie,ramps:{...THEMES.prairie.ramps,grass:R(['#4a5a1e','#62722a','#7a8c34','#94a640','#b0bc4e','#c8d062'])}};
THEMES.mesa={...THEMES.prairie,ramps:{...THEMES.prairie.ramps,far:R(['#6a3a2a','#84503a','#9e684a','#b8825c','#d09e72','#e4bc90','#f4dab4'])},fog:'rgba(230,170,120,.1)',ray:'255,200,140',rayA:1.5};
THEMES.stormwell={...(THEMES.under||THEMES.cellar),fog:'rgba(80,110,130,.24)',ray:'170,220,255',rayA:.9,vig:'0,4,8'};
THEMES.redoubt={...THEMES.prairie,fog:'rgba(150,110,80,.14)',ray:'255,190,130',rayA:1.2,amb:'ember'};
/* materials from the bible's Golden Plains catalogue */
Object.assign(RES,{sunwood:{n:'Sunwood',c:'#e0a050',d:'logging',reg:'golden'},skyfiber:{n:'Skybloom Fiber',c:'#a8c8f0',d:'herbalism',reg:'golden'},ambergrain:{n:'Ambergrain',c:'#e8c860',d:'herbalism',reg:'golden'},
  prairieclay:{n:'Prairie Clay',c:'#c08050',d:'mining',reg:'golden'},stormglass:{n:'Stormglass Sand',c:'#c8e0f0',d:'mining',reg:'golden'},fieldlime:{n:'Fieldstone Lime',c:'#ece6d4',d:'mining',reg:'golden'},
  prairieresin:{n:'Prairie Resin',c:'#d89030',d:'logging',reg:'golden'},emberwool:{n:'Emberhorn Wool',c:'#e8a070',d:'handling',reg:'golden'},hornflake:{n:'Aurox Hornflake',c:'#a89880',d:'handling',reg:'golden'}});
Object.assign(MAT_BASE,{sunwood:['timber','#e0a050'],skyfiber:['herb','#a8c8f0'],ambergrain:['herb','#e8c860'],prairieclay:['ore','#c08050'],stormglass:['shard','#c8e0f0'],fieldlime:['ore','#ece6d4'],prairieresin:['timber','#d89030']});
CSET('plainswright','Plainswright',['#8a6a3a','#5a4424','#c8a060','#f2e6c8','#4a6a9a'],['Skybloom Hat','kasa','Emberwool Cloak','leather','Skybloom Wraps','Longroad Boots','Hornflake Charm','coin'],{bow:'Sunwood Bow',spear:'Sunwood Lance',staff:'Stormglass Staff',shield:'Lime-faced Shield'});
RECIPES.push(
  {id:'sunbow',d:'wood',r:6,n:'Sunwood Bow',set:'plainswright',make:['weapon','bow'],need:{sunwood:3,prairieresin:1,hide:1},prop:'Sunwood: heat-tolerant, never splits. Rotationally pruned from the windbreaks.',tune:{atk:1.06},add:{crit:.4}},
  {id:'sunlance',d:'wood',r:6,n:'Sunwood Lance',set:'plainswright',make:['weapon','spear'],need:{sunwood:2,ore:2},prop:'A caravan guard’s lance. Long reach, light hand.',add:{hp:.5}},
  {id:'emberwoolcloak',d:'leather',r:6,n:'Emberwool Cloak',set:'plainswright',make:['chest'],need:{emberwool:3,hide:2},prop:'Emberhorn wool: fire-resistant, warm on cold nights. Shorn, never taken.',tune:{hp:1.2},add:{def:.3}},
  {id:'skywraps',d:'leather',r:5,n:'Skybloom Wraps',set:'plainswright',make:['hands'],need:{skyfiber:3,hide:1},prop:'Breathable skybloom cloth. Harvested after flowering, so the seed sets first.',add:{mp:.5}},
  {id:'hornflakecharm',d:'smith',r:6,n:'Hornflake Charm',set:'plainswright',make:['charm'],need:{hornflake:2,silver:1},prop:'Laminated aurox hornflake, gathered from the migration lanes with the herd’s leave.',add:{def:.6,hp:.3}},
  {id:'glassstaff',d:'wood',r:6,n:'Stormglass Staff',set:'plainswright',make:['weapon','staff'],need:{stormglass:2,fieldlime:1,sunwood:1},prop:'A stormglass lens in a sunwood shaft. It still remembers the lightning.',add:{mp:.8}},
  {id:'limeshield',d:'smith',r:6,n:'Lime-faced Shield',set:'plainswright',make:['weapon','shield'],need:{fieldlime:2,prairieclay:1,ore:2},prop:'Kiln lime over fired clay over iron. Cheap, heavy, honest.',tune:{atk:.9},add:{def:.9}},
  {id:'harvestloaf',d:'cooking',r:4,n:'Sunfield Harvest Loaf ×3',use:'pots3',need:{ambergrain:2,meat:1},desc:'Ambergrain bread and smoked meat. The Longroad runs on it: three tonics.'},
  {id:'plainshat',d:'leather',r:5,n:'Skybloom Hat',set:'plainswright',make:['head'],need:{skyfiber:2,ambergrain:1},prop:'Woven skybloom over a straw brim.',add:{crit:.4}},
  {id:'longboots',d:'leather',r:5,n:'Longroad Boots',set:'plainswright',make:['feet'],need:{hide:2,prairieresin:1},prop:'Waxed caravan leather. A thousand miles in them, and a thousand more.',tune:{def:1.1}});
/* wildlife: every species can be befriended; fought, they flee rather than die */
Object.assign(MOBS,{
  courser:{name:'Sunmane Courser',kind:'quad',ai:'lunger',passive:1,yields:1,hp:80,atk:11,exp:20,w:24,h:30,spd:62,shard:[3,6],aggro:90},
  burrower:{name:'Prairie Burrower',kind:'quad',ai:'lunger',passive:1,yields:1,hp:60,atk:11,exp:16,w:18,h:12,spd:36,shard:[2,5],aggro:70},
  crane:{name:'Skybloom Crane',kind:'fly',ai:'flyer',fly:1,passive:1,yields:1,hp:50,atk:9,exp:16,w:18,h:16,spd:40,shard:[2,5],aggro:80},
  emberram:{name:'Emberhorn Ram',kind:'quad',ai:'lunger',passive:1,yields:1,hp:110,atk:13,exp:22,w:22,h:22,spd:40,shard:[3,6],aggro:90},
  roadhound:{name:'Longroad Hound',kind:'quad',ai:'lunger',yields:1,hp:70,atk:12,exp:19,w:22,h:16,spd:52,shard:[3,6],aggro:120},
  roc:{name:'Stormcrest Roc',kind:'fly',ai:'flyer',fly:1,passive:1,yields:1,elite:1,hp:520,atk:15,exp:400,w:40,h:30,spd:50,shard:[30,50],aggro:200,resp:90},
  aurox:{name:'Stonecircle Aurox',kind:'quad',ai:'lunger',passive:1,yields:1,elite:1,hp:420,atk:14,exp:420,w:40,h:36,spd:30,shard:[30,50],aggro:120,resp:90},
  colossuscalf:{name:'Colossus Calf',kind:'quad',ai:'lunger',passive:1,yields:1,hp:120,atk:12,exp:20,w:30,h:26,spd:36,shard:[3,6],aggro:60},
/* people */
  bandit:{name:'Longroad Bandit',kind:'gen',ai:'lunger',hp:72,atk:13,exp:20,w:14,h:30,spd:40,shard:[4,8],aggro:150},
  poacher:{name:'Poacher',kind:'gen',ai:'lunger',hp:66,atk:14,exp:20,w:14,h:30,spd:42,shard:[4,8],aggro:160},
  tolllord:{name:'Toll-Lord Varro',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1400,atk:16,exp:1100,w:20,h:40,spd:30,shard:[100,140],aggro:210,resp:120}});
const GPK=['courser','burrower','crane','emberram','roadhound','roc','aurox','colossuscalf','bandit','poacher','tolllord'];for(const k of GPK)MOBS[k].base1=1;
Object.assign(GEAR,{
  courser:GS('Sunmane',['#c89040','#7a5a2a','#e8b860','#2a2018','#f2e6c8'],{n:'Sunmane Crest',s:'feather'},{n:'Courser Riding Coat',s:'leather'},'Rein Gloves','Gallop Boots',{n:'Brushed Mane Token',s:'knot'},{spear:'Courser Lance',bow:'Horsebow'}),
  burrower:GS('Burrower',['#6a5a4a','#3a2e24','#8a7a66','#efe4c8','#2a2018'],{n:'Burrower Cap',s:'pelt'},{n:'Digger’s Vest',s:'leather'},'Shovel Gloves','Warren Boots',{n:'Shed Claw',s:'fang'},{daggers:'Claw Knives',hammer:'Digger’s Mallet'}),
  crane:GS('Skybloom Crane',['#e8eef4','#8a9aaa','#ffffff','#4a6a9a','#e0b040'],{n:'Crane Plume Cap',s:'feather'},{n:'Skybloom Robe',s:'robe'},'Feather Gloves','Wading Boots',{n:'Molted Crane Feather',s:'lamp'},{staff:'Cranewing Staff',bow:'Skybloom Bow'}),
  emberram:GS('Emberhorn',['#e8d8c0','#8a6a4a','#f4ecdc','#c84a2a','#4a3a2a'],{n:'Spiral Horn Helm',s:'horns'},{n:'Emberwool Coat',s:'leather'},'Woolen Gloves','Hoofstep Boots',{n:'Horn Layer',s:'fang'},{hammer:'Ramhead Maul',shield:'Horn-rimmed Shield'}),
  roadhound:GS('Longroad Hound',['#8a6a4a','#4a3a2a','#b08a62','#efe4c8','#3a5a8a'],{n:'Hound-ear Hood',s:'hood'},{n:'Caravan Guard Vest',s:'leather'},'Paw Guards','Roadrunner Boots',{n:'Scent Kit',s:'coin'},{daggers:'Hound Knives',axe:'Caravan Hatchet'}),
  roc:{...GS('Stormcrest',['#a8b0c0','#5a6070','#e0e6ee','#3a4a6a','#ffe066'],{n:'Stormcrest Plume',s:'feather'},{n:'Storm-feather Mantle',s:'robe'},'Talon-sheath Gloves','Thermal Boots',{n:'Molted Storm Feather',s:'lamp'},{bow:'Stormcrest Bow',spear:'Thermal Lance'}),drop:.6},
  aurox:{...GS('Aurox',['#6a5a4a','#3a3028','#8a7a62','#a8a090','#4c8a30'],{n:'Stonehorn Helm',s:'horns'},{n:'Herdguard Plate',s:'plate'},'Yoke Gauntlets','Migration Boots',{n:'Hornflake Talisman',s:'coin'},{hammer:'Herdguard Maul',shield:'Aurox Shield'}),drop:.6},
  colossuscalf:GS('Colossus Calf',['#8a7a4a','#4a4228','#a8964e','#c4e66a','#6a8a3a'],{n:'Grass-crown',s:'leafcrown'},{n:'Meadow Mantle',s:'moss'},'Meadow Gloves','Meadow Boots',{n:'Horn-bark Chip',s:'coin'},{staff:'Meadow Staff'}),
  bandit:GS('Longroad Bandit',['#6a4a3a','#3a2a20','#8a6a52','#c8a050','#a8302a'],{n:'Bandit Scarf',s:'hood'},{n:'Road Leathers',s:'leather'},'Grab Gloves','Highway Boots',{n:'Stolen Toll Coin',s:'coin'},{katana:'Highway Sabre',daggers:'Cutpurse Knives',axe:'Road Axe'}),
  poacher:GS('Poacher',['#4a5a3a','#2a3420','#6a7a52','#c8a050','#7a3a2a'],{n:'Poacher’s Hood',s:'hood'},{n:'Ghillie Coat',s:'leather'},'Snare Gloves','Stalker Boots',{n:'Confiscated Snare',s:'knot'},{bow:'Poacher’s Bow',daggers:'Skinning Knives'}),
  tolllord:{...GS('Toll-Lord',['#3a2a3a','#1e141e','#6a4a6a','#e3b04b','#a8302a'],{n:'Toll-Lord’s Hat',s:'kasa'},{n:'Toll-Lord’s Brigandine',s:'plate'},'Collector’s Gauntlets','Toll-road Boots',{n:'The Toll Ledger',s:'core'},{katana:'Tollbreaker',axe:'Gatebreaker',hammer:'Toll-Lord’s Mace'}),drop:1,drops:3}});
for(const k of GPK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
/* shapes */
QUAD.courser={...QUAD.rotstag,cw:44,ch:46,len:22,bh:10,leg:14,c:['#3a2818','#c89040','#e8b860','#7a5a2a','#2a2018'],extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2),top=Math.floor(o.cy-o.bh/2);for(let k=0;k<9;k++){P(hx-1-k,top-1-(k%2),'#f2d880');P(hx-1-k,top-2,'#e8c060')}for(let k=0;k<4;k++)P(Math.round(o.cx-o.L/2-1-k),o.cy-2+k,'#f2d880');
  }};
QUAD.burrower={cw:30,ch:16,cx:12,len:14,bh:7,leg:2,lw:3,c:['#2a2018','#6a5a4a','#8a7a66','#3a2e24','#1a1210'],head:'none',tail:'stub',extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2),hy=o.cy-2;Rc(hx-1,hy-1,6,5,'#6a5a4a');for(let k=0;k<5;k++)P(hx+k-1,hy-1,'#efe4c8');P(hx+2,hy,'#1a1210');P(hx+5,hy+1,'#1a1210');for(let k=0;k<3;k++)P(hx+k,hy+4,'#d8d0c0')}};
QUAD.emberram={...QUAD.mtngoat,cw:36,ch:30,len:17,bh:11,c:['#4a3a2a','#e8d8c0','#f4ecdc','#c8b8a0','#1a1210'],extra:(P,Rc,o)=>{QUAD.mtngoat.extra(P,Rc,o);const hx=Math.round(o.cx+o.L/2),hy=Math.floor(o.cy-o.bh/2)-3+(o.mode==='lunge'?3:0);for(let i=0;i<10;i++){const a=Math.PI*(.6+i*.2),r=3+i*.25;P(hx+1+Math.round(Math.cos(a)*r),hy+1+Math.round(Math.sin(a)*r),i%2?'#c84a2a':'#e86a3a')}}};
QUAD.roadhound={...QUAD.wolf,c:['#3a2a1e','#8a6a4a','#b08a62','#5a4430','#ffd27a'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<4;i++)P(Math.round(o.cx-4+i*2),top,'#3a5a8a');for(let i=0;i<3;i++)P(Math.round(o.cx-6+i*5),o.cy+1,'#5a4430')}};
QUAD.aurox={...QUAD.boar,cw:66,ch:44,cx:28,len:34,bh:17,leg:9,lw:5,c:['#2a221c','#6a5a4a','#8a7a62','#4a3e32','#4c8a30'],head:'boar',extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let k=-6;k<=6;k++)P(Math.round(o.cx+k),top-3+Math.round(Math.abs(k)/3),'#6a5a4a');
  for(let i=0;i<7;i++)P(Math.round(o.cx-o.L/2+4+i*4.5),top+2+(i%2),'#4c8a30');const hx=Math.round(o.cx+o.L/2)+1;for(let k=0;k<7;k++){P(hx+k,top-2-Math.round(k*.5),'#a8a090');P(hx+k,top-1-Math.round(k*.5),'#7a7266')}}};
QUAD.colossuscalf={...QUAD.boar,cw:52,ch:36,cx:22,len:26,bh:13,leg:6,lw:4,c:['#3a3418','#8a7a4a','#a8964e','#5a5230','#1a1210'],extra:(P,Rc,o)=>{const top=Math.floor(o.cy-o.bh/2);for(let x=Math.floor(o.cx-o.L/2+2);x<o.cx+o.L/2-2;x++){P(x,top-1,(x%3)?'#6aab3a':'#9bd04c');if(x%2)P(x,top-2,'#4c8a30');if(x%5===0){P(x,top-3,'#c4e66a');P(x,top-4,'#e8f0a0')}}
  const hx=Math.round(o.cx+o.L/2);for(let k=0;k<4;k++){P(hx+k,top-1-k,'#8a6a3a');P(hx+k-2,top-2-k,'#8a6a3a')}}};
const BANDIT={h:30,tw:5,lw:2,leg:['#3a2e24','#4a3a2c'],boot:'#1e1610',body:['#3a2a20','#6a4a3a','#8a6a52'],skin:['#8a5a3a','#c8906a','#e0b088'],eye:'#1a1210',
  hat:(P,Rc,hx,hy)=>{for(let i=-4;i<=4;i++){P(hx+i,hy+3,'#a8302a');P(hx+i,hy+4,'#7a2420')}Rc(hx-3,hy-2,7,2,'#3a2a20')},
  hand:(P,Rc,x,y,mode)=>{for(let k=0;k<8;k++)P(x+1+k,y-Math.round(k*(mode==='wind'?.8:.2)),k<2?'#5a3a26':'#c8ccd4')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let k=-4;k<=4;k++)P(x+k,hip-1+b,'#c8a050')}};
const POACH={...BANDIT,body:['#2a3420','#4a5a3a','#6a7a52'],hat:(P,Rc,hx,hy)=>{for(let i=-5;i<=5;i++)for(let j=0;j<3;j++)if(Math.abs(i)+j<6)P(hx+i,hy-1+j,'#2a3420')},
  hand:(P,Rc,x,y,mode)=>{for(let k=-5;k<=5;k++)P(x+2+Math.round((25-k*k)/10)*(mode==='wind'?0:1),y+k,'#5a3a26');for(let k=-5;k<=5;k++)P(x+1,y+k,'#d8d0b8')}};
const TOLL={h:38,tw:7,lw:3,leg:['#2a1e2a','#3a2a3a'],boot:'#140e14',body:['#2a1e2a','#4a344a','#6a4a6a'],skin:['#7a4a30','#b07a58','#d09a74'],eye:'#e3b04b',
  hat:(P,Rc,hx,hy)=>{Rc(hx-7,hy-1,15,2,'#1e141e');Rc(hx-4,hy-6,9,5,'#2a1e2a');P(hx+3,hy-6,'#e3b04b');P(hx+4,hy-7,'#a8302a')},
  hand:(P,Rc,x,y,mode)=>{Rc(x-1,y-1,3,3,'#e3b04b');for(let k=0;k<12;k++)P(x+2+k,y-Math.round(k*(mode==='wind'?1:.3)),k<3?'#3a2a20':'#d8dce4')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let k=-6;k<=6;k++)P(x+k,hip-2+b,'#e3b04b');for(const dx of[-5,0,5])P(x+dx,hy+12+b,'#e3b04b')}};
const _brG=buildRoster;buildRoster=function(){_brG();const md=['walk0','walk1','wind','lunge'];
  const H=(k,w,h,ax,ay,spec,fps)=>{const o={kind:'gen',ax,ay,fps},F={};for(const m of md){o[m]=humanoid(w,h,ax,spec,m);F[m]=humanoid(w,h,ax,spec,m,1)}o.F=F;MSP[k]=o};
  H('bandit',34,38,14,36,BANDIT,4);H('poacher',34,38,14,36,POACH,4);H('tolllord',44,48,18,46,TOLL,3);
  const cB=['#4a6a9a','#e8eef4','#ffffff','#d0d8e0'];MSP.crane={kind:'fly',ax:17,ay:16,fl:[0,1,2].map(p=>birdFrame(cB,0,p,0,0)),ch:birdFrame(cB,0,1,1,0),F:{fl:[0,1,2].map(p=>birdFrame(cB,0,p,0,1)),ch:birdFrame(cB,0,1,1,1)}};
  const rB=['#3a4a6a','#5a6070','#a8b0c0','#e0e6ee'],r2=(p,c,f)=>scale2(birdFrame(rB,0,p,c,f));MSP.roc={kind:'fly',ax:34,ay:32,fl:[0,1,2].map(p=>r2(p,0,0)),ch:r2(1,1,0),F:{fl:[0,1,2].map(p=>r2(p,0,1)),ch:r2(1,1,1)}}};
/* driven off, not killed */
const _kmY=killMob;killMob=function(m){_kmY(m);if(m.d&&m.d.yields){S.nums.push({x:m.x,y:m.y-m.d.h-26,txt:'Driven off',t:-.2,c:'#9bd04c'});for(let i=0;i<10;i++)S.parts.push({x:m.x,y:m.y-4,vx:(Math.random()-.5)*80+(m.x>pl.x?60:-60),vy:-20-Math.random()*30,t:0,life:.6,c:'#c8b080',g:40,s:2})}};
/* the Prairie Colossus: a living landmark, never a fight */
function colossusSprite(ph){return scale2(sprite(150,84,(P,Rc)=>{const bx=20,by=26,bw=104,bh=34;
  for(let x=0;x<bw;x++){const t=Math.sin(x/bw*Math.PI),top=by+Math.round((1-t)*10);for(let y=top;y<by+bh;y++)P(bx+x,y,y<top+3?'#8a7a4a':y>by+bh-5?'#4a4228':(x+y)%7===0?'#6a5e38':'#7a6c40');
    for(let k=0;k<4;k++){const gy=top-1-k;if((x*7+k*3)%5<3-k)P(bx+x,gy,k<2?'#6aab3a':'#9bd04c')}if(x%11===0){for(let k=0;k<6;k++)P(bx+x,top-3-k,'#4c8a30');P(bx+x-1,top-8,'#c4e66a');P(bx+x+1,top-8,'#c4e66a')}}
  for(let i=0;i<6;i++){const lift=(i+ph)%2?2:0,lx=bx+8+i*17+(i>2?4:0),ly=by+bh-4;for(let y=0;y<20-lift;y++){const w=y<6?9:y<14?7:8,o=y<6?0:1;for(let k=0;k<w;k++)P(lx+o+k,ly+y,y>=17-lift?'#2a2418':k<2?'#4a4228':k>w-3?'#8a7a4a':'#6a5e38')}}
  const hx=bx+bw-4,hy=by+8;Rc(hx,hy,22,16,'#7a6c40');Rc(hx,hy,22,3,'#8a7a4a');Rc(hx+14,hy+5,3,3,'#1a1210');P(hx+15,hy+5,'#ffe08a');for(let k=0;k<5;k++)Rc(hx+18+k,hy+12+k,3,1,'#5a4e30');
  for(let k=0;k<16;k++){P(hx+4-Math.round(k*.4),hy-1-k,'#6a4a2a');P(hx+5-Math.round(k*.4),hy-1-k,'#8a6a3a');if(k%4===3){P(hx+6-Math.round(k*.4),hy-2-k,'#6aab3a');P(hx+3-Math.round(k*.4),hy-2-k,'#6aab3a')}}
  for(let k=0;k<14;k++){P(hx+12+Math.round(k*.3),hy-1-k,'#6a4a2a');if(k%4===3)P(hx+13+Math.round(k*.3),hy-2-k,'#6aab3a')}
  for(let k=0;k<8;k++)P(bx-k,by+12+Math.round(Math.sin(k*.8+ph)*1.5),'#4a4228')}))}
let COLO=null;function drawGolden(cx,cy){if(Z.id!=='stonecircle')return;if(!COLO)COLO=[colossusSprite(0),colossusSprite(1)];const X=COLX(),f=COLO[Math.floor(S.t*.8)%2],x=ri(X-cx-150),y=ri(topAt(X)-cy-150+Math.sin(S.t*.5)*1.5);
  if(x>W||x+300<0)return;g.drawImage(f,x,y);if(pl.flags&&pl.flags.colossusAccord){ptext('THE PRAIRIE COLOSSUS · ACCORD',ri(X-cx),y-6,'#9bd04c')}}
const COLX=()=>ZONES[zIdx('stonecircle')].ww-420;
const _dsG=drawSealed;drawSealed=function(cx,cy){_dsG(cx,cy);drawGolden(cx,cy)};
/* set dressing for the plains */
Object.assign(PROPS,{
  windmill(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<70;y++){const hw=Math.round(10-y*.06);for(let k=-hw;k<=hw;k++)P(X+k,Y-y,pick(W,.55-(k+hw)/(hw*5)+(y%8===0?-.1:0),X+k,y))}
    for(let y=70;y<80;y++){const w=12-(y-70);for(let k=-w;k<=w;k++)P(X+k,Y-y,[150,60,46])}const hy=Y-66;for(let i=0;i<4;i++){const a=i*Math.PI/2+.4;for(let t=4;t<34;t++){const px=X+Math.round(Math.cos(a)*t),py=hy+Math.round(Math.sin(a)*t);P(px,py,W[1]);if(t>8)for(let j=1;j<5;j++)P(px+Math.round(-Math.sin(a)*j),py+Math.round(Math.cos(a)*j),(t+j)%3?[230,220,190]:[200,190,160])}}},
  flowers(x,X,Y){const P=px3(x);for(let i=0;i<16;i++){const k=-28+Math.floor(hash(i,7,X)*56),h=3+Math.floor(hash(i,8,X)*7),c=[[168,200,240],[240,220,120],[220,140,200],[255,255,255]][i%4];for(let y=0;y<h;y++)P(X+k,Y-y,[90,130,50]);P(X+k,Y-h,c);P(X+k-1,Y-h,c);P(X+k+1,Y-h,c);P(X+k,Y-h-1,c)}},
  silo(x,X,Y){const P=px3(x),S=R(['#5a4a3a','#7a6650','#9a8266','#b89e7e','#d6bc98']);for(let y=0;y<90;y++)for(let k=-16;k<=16;k++)P(X+k,Y-y,pick(S,.6-(k+16)/90+(y%12===0?-.15:0),X+k,y));for(let y=90;y<104;y++){const w=Math.round(16*Math.sqrt(1-((y-90)/14)**2));for(let k=-w;k<=w;k++)P(X+k,Y-y,[150,60,46])}},
  burned(x,X,Y){const P=px3(x);for(let k=-36;k<=36;k++)for(let y=0;y<3;y++)P(X+k,Y-y,[30,26,24]);for(const k of[-30,-10,12,30])for(let y=0;y<26+((k*7)%14);y++){P(X+k,Y-y,[34,28,24]);if(y%5===0)P(X+k+1,Y-y,[60,40,30])}for(let k=-30;k<=30;k++)if(k%3)P(X+k,Y-24-Math.round(Math.abs(k)/8),[40,32,28])},
  nest(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<60;y++)for(let k=-10;k<=10;k++)P(X+k,Y-y,pick(TH.rock,.5-(k+10)/60,X+k,y));for(let k=-24;k<=24;k++)for(let y=0;y<8;y++)if((k*k)/576+(y-4)*(y-4)/16<1)P(X+k,Y-60-y,(k+y)%3?W[2]:W[4])},
  valve(x,X,Y){const P=px3(x),M=R(['#22262a','#3a3e44','#585e66','#7a828a','#a8b0b8']);for(let y=0;y<30;y++)for(let k=-4;k<=4;k++)P(X+k,Y-y,pick(M,.5,X+k,y));const r=14;for(let a=0;a<6.28;a+=.03){P(X+Math.round(Math.cos(a)*r),Y-34+Math.round(Math.sin(a)*r),M[3]);P(X+Math.round(Math.cos(a)*(r-1)),Y-34+Math.round(Math.sin(a)*(r-1)),M[1])}
    for(let i=0;i<4;i++){const a=i*Math.PI/4;for(let t=-r;t<=r;t++)P(X+Math.round(Math.cos(a)*t),Y-34+Math.round(Math.sin(a)*t),M[2])}Z.glows.push([X,Y-34,14,'120,200,255'])}});
/* zones: Sunfield is reached by the south road from CrestHollow */
const TWN2=zIdx('town');
addPlace({id:'sunfield',name:'Sunfield',reg:'golden',lv:[35,35],from:'town',at:.97,theme:'sunfield',terrain:'flat',ww:2000,safe:1,
  props:['windmill','stall','banner','crates','cart','well','banner','windmill','stall'],stations:[['forge','Caravan Court Smithy'],['alchemy','Grain Exchange Apothecary'],['cook','Sunfield Bakehouse']],
  labels:[[600,'The Grain Exchange',90],[1300,'The Animal Market',80]],
  npc:{id:'aldane',name:'Steward Aldane',cls:'traveler',head:'tv_start',chest:'tv_start',lines:['Wide horizons. Enduring people. And a great deal of paperwork about grain.','Sunfield feeds half the Reach. The other half complains about the price.','The herds are moving early this year. The Colossus is moving early. I do not like it.']},
  quests:{gs1:{title:'Beyond the Reach',lv:35,offer:'You came down the south road from CrestHollow? Then you are the first in a long while. The Plains are open, but they are not quiet: bandits on the Longroad, poachers in the herds, and a Toll-Lord who thinks the road is his. Walk the Longroad and see for yourself.',
      desc:'Travel the Longroad.',goal:{t:'kill',mob:'bandit',n:4,lab:'Bandits driven from the road'},where:'The Longroad, east of Sunfield',prog:'Bandits work the caravan road.',done:'Four fewer highwaymen. The caravans will hear of it by nightfall.',reward:{exp:900,sh:90}},
    gs2:{title:'Bread for the Road',lv:36,offer:'The bakehouse needs ambergrain, and the Ambergrain Belt is short of hands since the fires. Bring four sheaves.',desc:'Gather 4 Ambergrain.',goal:{t:'gather',res:'ambergrain',n:4},where:'The Ambergrain Belt and the Longroad',prog:'Golden sheaves along the fields.',done:'Bread for a hundred wagons. You may have just saved the caravan season.',reward:{exp:950,sh:90}}}});
addPlace({id:'longroad',name:'The Longroad',reg:'golden',lv:[35,36],from:'sunfield',at:.9,theme:'prairie',terrain:'hills',ww:2200,
  mobs:['bandit','courser','roadhound','bandit','courser','bandit','roadhound'],props:['sign','cart','well','stall','cairn','cart','sign'],nodes:['sunwood','ambergrain','prairieresin','prairieclay'],
  labels:[[1700,'Prairie’s Rest',90]],
  npc:{id:'imre',name:'Factor Imre',cls:'traveler',lines:['The Longroad: a continent-scale caravan spine. And a continent-scale target.','Longroad hounds were bred to guard the wagons. Half of them went wild when the caravans stopped.','A hound that trusts you is worth three guards.']},
  quests:{lr1:{title:'Highwaymen',lv:35,offer:'Bandits hit two wagons this week. Drive off six of them and the convoys can run on schedule.',desc:'Drive off 6 Longroad Bandits.',goal:{t:'kill',mob:'bandit',n:6,lab:'Bandits driven off'},where:'The Longroad and the Ambergrain Belt',prog:'They work the road in small crews.',done:'Six. The convoy masters owe you a round each, which is a lot of rounds.',reward:{exp:1000,sh:100}},
    lr2:{title:'A Hound for the Road',lv:36,offer:'The wild Longroad hounds were caravan dogs once. Befriend one: food, patience, no blades. The road is safer with a hound on it.',desc:'Befriend any creature on the Plains. A Longroad Hound is best.',goal:{t:'bond',n:1},where:'The Longroad',prog:'Offer food to a calm creature and earn its trust.',done:'Look at that. A road dog again. It will remember the scent of every mile you walk together.',reward:{exp:1000,sh:80}}}});
addPlace({id:'skybloom',name:'Skybloom Fields',reg:'golden',lv:[36,37],from:'longroad',at:.35,map:[0,-6],theme:'prairie',terrain:'water',ww:2000,
  mobs:['crane','burrower','poacher','crane','burrower','poacher'],props:['flowers','cairn','flowers','sealstone','flowers','reeds'],nodes:['skyfiber','skyfiber','herb','ambergrain'],
  npc:{id:'senna',name:'Bloomkeeper Senna',cls:'aspirant',head:'as_start',chest:'as_start',lines:['The cranes dance before the flowers open. Nobody knows which causes which.','Harvest skybloom after it seeds, never before.','Poachers want crane eggs. I want poachers somewhere else.']},
  quests:{sk1:{title:'Nests and Nets',lv:36,offer:'Poachers are netting the crane nesting grounds and digging out the burrower warrens. Drive off six.',desc:'Drive off 6 Poachers in Skybloom Fields.',goal:{t:'kill',mob:'poacher',n:6,zone:'skybloom',lab:'Poachers driven off'},where:'Skybloom Fields',prog:'They work the nesting grounds.',done:'The cranes are already settling back down. Thank you.',reward:{exp:1050,sh:100}},
    sk2:{title:'After the Seed',lv:37,offer:'The skybloom has set its seed. Now we can cut. Three bundles of fiber for the banner-weavers.',desc:'Gather 3 Skybloom Fiber.',goal:{t:'gather',res:'skyfiber',n:3},where:'Skybloom Fields',prog:'Blue flowering stalks.',done:'Lovely long fibers. The banners for the harvest will be the best in years.',reward:{exp:1050,sh:90}}}});
addPlace({id:'ambergrain',name:'The Ambergrain Belt',reg:'golden',lv:[37,38],from:'longroad',at:.65,map:[4,6],theme:'prairie',terrain:'hills',ww:2000,
  mobs:['bandit','burrower','roadhound','bandit','burrower','bandit'],props:['windmill','silo','cart','silo','windmill','burned'],nodes:['ambergrain','ambergrain','prairieclay','fieldlime'],
  labels:[[1500,'The Ashen Farmstead',90]],
  npc:{id:'hollis',name:'Silo-master Hollis',cls:'gatherer',head:'ga_start',chest:'ga_start',lines:['Mills, silos, firebreaks, and nobody sleeping during the dry months.','The Ashen Farmstead burned last summer. Bandits, or a lamp. I mean to find out which.','Burrowers aerate the fields. Leave them be.']},
  quests:{ab1:{title:'The Ashen Farmstead',lv:37,offer:'Bandits have been camping in the burned farmstead and raiding the silos at night. Clear eight of them out.',desc:'Drive off 8 Longroad Bandits.',goal:{t:'kill',mob:'bandit',n:8,lab:'Bandits driven off'},where:'The Ambergrain Belt and the Longroad',prog:'They camp in the burned farmstead.',done:'Bandits, then. Not a lamp. The family can rebuild knowing that, at least.',reward:{exp:1100,sh:110}},
    ab2:{title:'Clay for the Kilns',lv:38,offer:'Rebuilding means bricks. Prairie clay from the floodplain, four loads, and only from the marked pits.',desc:'Dig 4 Prairie Clay.',goal:{t:'gather',res:'prairieclay',n:4},where:'The Ambergrain Belt and the Longroad',prog:'Red clay pits.',done:'Good wet clay. The kilns will be firing by the end of the week.',reward:{exp:1100,sh:100}}}});
addPlace({id:'wildherd',name:'Wildherd Basin',reg:'golden',lv:[37,38],from:'skybloom',at:.8,map:[6,-2],theme:'wildherd',terrain:'hills',ww:2200,
  mobs:['courser','poacher','courser','aurox','poacher','courser','poacher'],props:['cairn','tent','cairn','flowers','tent','cairn'],nodes:['skyfiber','sunwood','herb'],
  labels:[[1100,'Wildherd Crossing',100]],
  npc:{id:'oriel',name:'Herd-speaker Oriel',cls:'ashbow',head:'a_start',chest:'a_start',lines:['The herds do not belong to anyone. Least of all to the poachers.','The Colossus walks the far basin. Smaller things follow it, and the grass grows back behind it.','An accord, not a capture. You do not own a mountain that walks.']},
  quests:{wh1:{title:'The Corridor',lv:37,offer:'Poachers have strung wire across the migration corridor. The coursers panic and break legs. Drive off eight poachers and I will cut the wire behind you.',desc:'Drive off 8 Poachers.',goal:{t:'kill',mob:'poacher',n:8,lab:'Poachers driven off'},where:'Wildherd Basin and Skybloom Fields',prog:'They wait along the corridor.',done:'The wire is down. The herd will run clean through the Crossing this year.',reward:{exp:1100,sh:110}}}});
addPlace({id:'southwind',name:'Southwind Uplands',reg:'golden',lv:[38,39],from:'ambergrain',at:.85,map:[6,4],theme:'mesa',terrain:'ledges',ww:2000,
  mobs:['emberram','bandit','emberram','roadhound','bandit','emberram'],props:['cairn','fence','tent','cairn','signaltower','nest'],nodes:['prairieresin','stormglass','sunwood','stormglass'],
  labels:[[300,'Windcrest Ranch',90],[1800,'Stormcrest Nest',130]],
  npc:{id:'brenna',name:'Ranchmaster Brenna',cls:'gatherer',head:'ga_start',chest:'ga_start',lines:['Windcrest Ranch: paddocks, breeding controls, and a great many stubborn rams.','Emberhorn wool does not burn. That is why we shear, not slaughter.','The roc on the ridge lost her egg to bandits. She has not left the nest since.']},
  quests:{sw3:{title:'Shearing Season',lv:38,offer:'The emberhorns need shearing before the heat. Walk up calm, shear gently. Three fleeces.',desc:'Shear 3 Emberhorn Wool.',goal:{t:'gather',res:'emberwool',n:3},where:'Southwind Uplands',prog:'Walk up to a calm Emberhorn Ram and shear it.',done:'Not a nick on them. Windcrest would hire you tomorrow.',reward:{exp:1150,sh:110}},
    sw4:{title:'The Stolen Egg',lv:39,offer:'Bandits took the Stormcrest roc’s egg to sell. Find it on one of them, then bring it back to the nest on the ridge. Do not keep it. Do not even think about keeping it.',desc:'Recover the Stormcrest Egg from bandits, then return it to the nest.',goal:{t:'event',id:'eggreturn',n:1,lab:'Egg returned to the nest'},where:'Bandits in Southwind, then the Stormcrest Nest on the east ridge',prog:'Recover the egg from a bandit, then return it to the nest.',done:'She took it back. She let you stand there while she did. That is trust, from a roc. Nothing else in the world earns it.',reward:{exp:1300,sh:120,sp:1}}}});
addPlace({id:'stormwell',name:'Stormwell',reg:'golden',lv:[38,39],from:'wildherd',at:.55,map:[0,8],theme:'stormwell',terrain:'flat',ww:1900,
  mobs:['bandit','poacher','husk','bandit','husk','poacher'],props:['pipes','pipes','sealstone','pipes'],nodes:['stormglass','fieldlime','tidecrystal'],
  labels:[[300,'Stormwell',110],[1500,'The Great Sluice',90]],
  npc:{id:'tavin',name:'Waterwright Tavin',cls:'gatherer',head:'ga_start',chest:'ga_start',lines:['Ancient waterworks beneath a dry basin. Whoever built it understood water better than we do.','Three sluice gates. Open all three and the basin drinks again.','Scavengers keep stripping the pipes for copper.']}});
addPlace({id:'redoubt',name:'Longroad Redoubt',reg:'golden',lv:[39,40],from:'longroad',at:.98,map:[8,2],theme:'redoubt',terrain:'flat',ww:2000,
  mobs:['bandit','bandit','roadhound','bandit','bandit'],elite:'tolllord',props:['gatewall','barricade','tent','banner','barricade','gatewall'],nodes:['ore','prairieclay'],
  labels:[[1700,'The Toll Gate',120]],
  npc:{id:'ilka',name:'Captain Ilka',cls:'guard',head:'gd_start',chest:'gd_start',lines:['The Redoubt was a Watch fort. Now it is a toll booth with a moat.','Varro charges everything that moves. Herds included.','Fight, infiltrate, negotiate. I tried negotiating. I am done negotiating.']},
  quests:{rd3:{title:'The Toll-Lord',lv:40,offer:'Varro has strung toll fences clean across the migration corridor and charges the herds by the head. Herds do not pay. They break their legs on his fences. End his toll.',desc:'Defeat Toll-Lord Varro at the Toll Gate.',goal:{t:'kill',mob:'tolllord',n:1,lab:'Toll-Lord defeated'},where:'The Toll Gate, east end of the Redoubt',prog:'At the far end of the Redoubt.',done:'The fences are coming down as we speak. The road is free and so is the corridor.',reward:{exp:2000,sh:200}}}});
addPlace({id:'stonecircle',name:'Stonecircle March',reg:'golden',lv:[39,40],from:'wildherd',at:.95,map:[8,-4],theme:'wildherd',terrain:'hills',ww:2400,
  mobs:['aurox','courser','crane','aurox','burrower'],props:['sealstone','cairn','sealstone','pillar','sealstone','pillar'],nodes:['skyfiber','fieldlime','stormglass'],
  labels:[[500,'The Stone Circle',110],[1900,'The Colossus Basin',190]]});
Object.assign(MAPXY,{sunfield:[14,92],longroad:[26,92],skybloom:[26,82],ambergrain:[38,96],wildherd:[42,82],southwind:[52,96],stormwell:[46,72],redoubt:[36,88],stonecircle:[60,80]});
WAYS.sunfield=300;WAYS.wildherd=300;
/* the accord with the Prairie Colossus: restore water, clear the corridor, end the tolls, then meet it */
Object.assign(QUESTS,{
  ca1:{title:'Water for the Herds',giver:'tavin',lv:38,
    offer:'The Colossus walks to water, and the basin is dry. Stormwell could fix that: three great sluice gates, rusted shut for a century. Open all three. Scavengers will not thank you.',
    desc:'Open the three sluice gates in Stormwell.',goal:{t:'event',id:'sluice',n:3,lab:'Sluice gates opened'},where:'Stormwell',prog:'Three great wheels along the waterworks.',
    done:'Listen. That is the basin drinking for the first time in a hundred years. The Colossus will smell it from a day away.',reward:{exp:1300,sh:120}},
  ca2:{title:'The Accord',giver:'oriel',pre:'ca1',lv:40,
    offer:'Water restored. The corridor clear of poachers, and the Toll-Lord’s fences down. Now go to the Colossus Basin at the far end of Stonecircle March and stand where it can see you. Not to take anything. To be known.',
    desc:'Meet the Prairie Colossus in the Colossus Basin.',goal:{t:'event',id:'accord',n:1,lab:'Accord made'},where:'The Colossus Basin, far east Stonecircle March',prog:'Walk up to the Colossus and wait.',
    done:'An accord. Not ownership, not a bond of leash and saddle. And look who followed you back: one of the calves. It chose you. Walk well together.',reward:{exp:2400,sh:240,sp:2,fl:{colossusAccord:1}}}});
QUESTS.ca2.req=['wh1','rd3'];
const _qAvC=qAvail;qAvail=function(k){if(k==='ca2'&&!['wh1','rd3'].every(q=>qSt(q)&&qSt(q).s==='d'))return false;return _qAvC(k)};
const _qfC=questFlag;questFlag=function(fl){_qfC(fl);if(fl.colossusAccord){const c=CB(),id='colossuscalf-'+cid();c.b[id]={t:'colossuscalf',n:'Sprig, Colossus Calf',tr:60,lv:Math.max(1,pl.lv-1),xp:0};c.own.push(id);if(!c.act){c.act=id;spawnComp()}banner('Sprig will walk with you','Colossus Calf · a new companion')}};
/* interactions: sluice gates, the roc's nest, the Colossus, and caring for rams and aurox */
const SLUICE=[520,1000,1500];
function plainsNear(){const st=k=>qSt(k);
  if(Z.id==='stormwell'){const s=st('ca1');if(s&&s.s==='a'){pl.flags.sluice=pl.flags.sluice||{};for(const x of SLUICE)if(!pl.flags.sluice[x]&&Math.abs(pl.x-(x+EDGE))<34)return{k:'sluice',x}}}
  if(Z.id==='southwind'){const s=st('sw4');if(s&&s.s==='a'&&s.n<1&&Math.abs(pl.x-(1800+EDGE))<60)return{k:'nest'}}
  if(Z.id==='stonecircle'){const s=st('ca2');if(s&&s.s==='a'&&s.n<1&&Math.abs(pl.x-COLX())<150)return{k:'accord'}}
  const m=S.mobs.find(m=>(m.t==='emberram'||m.t==='aurox')&&!m.dead&&!m.aggro&&Math.abs(m.x-pl.x)<(m.t==='aurox'?40:28)&&Math.abs(m.y-pl.y)<30);if(m&&!(m.cared&&S.t-m.cared<90))return{k:'care',m};return null}
const _cnP=crNear;crNear=function(){return plainsNear()||_cnP()};
const _cuP=crUse;crUse=function(n){if(!n||!['sluice','nest','accord','care'].includes(n.k))return _cuP(n);
  if(n.k==='sluice'){pl.flags.sluice[n.x]=1;const s=qSt('ca1');s.n=Math.min(3,Object.keys(pl.flags.sluice).length);qProgress('ca1','Sluice gate');S.shake=.3;banner('The sluice groans open','Water pours into the dry channel');return}
  if(n.k==='nest'){if(!hasQItem('Stormcrest Egg')){banner('The nest is empty','Recover the egg from the bandits first');return}takeQItem('Stormcrest Egg');qEvent('eggreturn');banner('The roc takes her egg back','She watches you go. She does not strike.');return}
  if(n.k==='accord'){qEvent('accord');for(let i=0;i<30;i++)S.parts.push({x:pl.x+(Math.random()-.5)*200,y:pl.y-40-Math.random()*60,vx:0,vy:-20,t:0,life:1.4,c:i%2?'#9bd04c':'#ffe08a',g:-8,s:2});banner('The Prairie Colossus','It lowers its great head until you could touch it. You do.');return}
  if(n.k==='care'){const m=n.m;m.cared=S.t;if(m.t==='emberram'){addMat('emberwool',1+(Math.random()<.25+.04*dRank('handling')?1:0),m.x,m.y);banner('Sheared','The ram shakes itself and wanders off, lighter')}else{addMat('hornflake',1,m.x,m.y);banner('Shed hornflake','You pick it up from the grass where the aurox let it fall')}dGain('handling',10);sfx.pick();save()}};
const _clP=crLabel;crLabel=function(n){if(!n)return _clP(n);if(n.k==='sluice')return'Open · Sluice gate';if(n.k==='nest')return'Return · Stormcrest Egg';if(n.k==='accord')return'Approach · The Prairie Colossus';if(n.k==='care')return n.m.t==='emberram'?'Shear · Emberhorn Ram (wool)':'Gather · shed hornflake (Aurox)';return _clP(n)};
/* the egg is carried on one of the Southwind bandits */
const _qkE=qKill;qKill=function(m){_qkE(m);if(m.t==='bandit'&&Z.id==='southwind'){const s=qSt('sw4');if(s&&s.s==='a'&&!hasQItem('Stormcrest Egg')&&Math.random()<.35){giveQItem('Stormcrest Egg');banner('The Stormcrest Egg','Warm, whole, and heavier than it looks. Take it to the nest.')}}};
function hasQItem(n){return!!(pl.flags.qitems&&pl.flags.qitems[n])}function giveQItem(n){pl.flags.qitems=pl.flags.qitems||{};pl.flags.qitems[n]=1;save()}function takeQItem(n){if(pl.flags.qitems)delete pl.flags.qitems[n]}
