/* ---------- regional materials, following the Ashveil Reach material usage framework ----------
   Each built region gathers the materials the framework names for it, and each material feeds recipes
   whose crafted sets carry that region's character (a property, not just a bigger number). */
const MAT_REG={
  cresthollow:{ashwood:['Ashwood','logging','timber','#c8a070'],clay:['River Clay','mining','ore','#b0704a'],ashleaf:['Ashleaf','herbalism','herb','#a8b080'],riverreed:['Riverreed','herbalism','herb','#c8c070'],emberstone:['Emberstone','mining','ore','#ff8a3a']},
  whisper:{ironroot:['Ironroot','logging','timber','#5a4a3a'],spiritmoss:['Spiritmoss','herbalism','herb','#7ad8c0'],resin:['Resin','logging','timber','#e0a040']},
  stonebridge:{copper:['Copper Ore','mining','ore','#d0783a'],granite:['Granite','mining','ore','#a8a4a0'],limestone:['Limestone','mining','ore','#e8e0c8']},
  mistyfen:{driftwood:['Driftwood','logging','timber','#b8b0a0'],kelp:['Kelp Fiber','fishing','herb','#4a8a6a'],shell:['Shell','fishing','salvage','#f0d8c8'],tidecrystal:['Tide Crystal','mining','shard','#6ec6e2']},
  marrowbog:{mirewood:['Mirewood','logging','timber','#4a5a3a'],bogstone:['Bogstone','mining','ore','#6a6a4a'],boglotus:['Bog Lotus','herbalism','herb','#e8a0c8'],veilcap:['Veilcap','herbalism','mush','#a090c8'],fencrystal:['Fen Crystal','mining','shard','#9bd04c']},
  watchtower:{slate:['Slate','mining','ore','#5a6270']},
  scar:{hollowglass:['Hollowglass','salvage','shard','#d8d0ff'],echobloom:['Echo Bloom','herbalism','herb','#c9a8ff'],riftdust:['Rift Dust','mining','shard','#8a8296']}};
const MAT_BASE={};
for(const r in MAT_REG)for(const[k,[n,d,base,c]]of Object.entries(MAT_REG[r])){RES[k]={n,c,d,reg:r};MAT_BASE[k]=[base,c]}
RES.heartwood.n='Elderwood';
/* node art: the base art, tinted toward the material's colour */
function tintArt(src,hc){const c3=[parseInt(hc.slice(1,3),16),parseInt(hc.slice(3,5),16),parseInt(hc.slice(5,7),16)];
  return recolor(src,(r,g,b)=>{const l=(r*.3+g*.59+b*.11)/255;if(l<.09)return null;const k=.35+l*1.25;return[Math.min(255,c3[0]*k),Math.min(255,c3[1]*k),Math.min(255,c3[2]*k)]})}
const _bnm=buildNodeArt;buildNodeArt=function(){_bnm();for(const[k,[base,c]]of Object.entries(MAT_BASE))NODE_SPR[k]=(NODE_SPR[base]||NODE_SPR.herb).map(s=>tintArt(s,c))};
/* where each material grows, by zone */
const MAT_AT={road:['ashwood','ashleaf'],hunt:['ashleaf','clay','ashwood'],riversmeet:['riverreed','clay','riverreed'],stonefield:['ashwood','ashleaf'],mirefen:['emberstone','riverreed','emberstone'],ruins:['emberstone','clay'],
  outskirts:['resin'],oak:['ironroot','resin'],hermit:['spiritmoss'],whispergrove:['spiritmoss','resin'],moonpetal:['spiritmoss'],thornveil:['ironroot','ironroot'],mossroot:['spiritmoss'],sawmill:['ironroot','resin'],elderwood:['ironroot'],
  quarry:['granite','limestone','copper'],granite:['granite','copper'],blackgate:['copper','copper'],stonewatch:['granite','limestone'],
  falls:['driftwood','kelp','shell','tidecrystal'],shrine:['tidecrystal','shell','kelp','driftwood'],
  bog:['mirewood','boglotus','bogstone'],lab:['fencrystal','veilcap','bogstone'],reach:['mirewood','veilcap','boglotus'],vats:['fencrystal','bogstone'],
  tower:['slate','granite'],siege:['slate','slate'],gate:['slate','granite'],outcrop:['slate'],
  scar:['hollowglass','riftdust','echobloom'],inner:['echobloom','riftdust','hollowglass'],hollow:['hollowglass']};
for(const[id,list]of Object.entries(MAT_AT)){const i=ZONES.findIndex(z=>z.id===id);if(i<0)continue;const z=ZONES[i];z.nodes=z.nodes||[];
  const busy=[...(z.portals||[]).map(p=>p.x),...(z.npcs||[]).map(n=>NPCS[n]&&NPCS[n].x).filter(Boolean),...(z.stations||[]).map(s=>s.x),...z.nodes.map(n=>n.x),
    ...Object.values(LORE).filter(l=>l.z===id).map(l=>l.x+EDGE)];
  const wet=x=>(z.pools||[]).some(p=>x>p.x0-20&&x<p.x1+20)||(z.pools||[]).some(p=>x>p.x0+EDGE-20&&x<p.x1+EDGE+20);
  const free=[];for(let x=320;x<z.ww-320;x+=29)if(!busy.some(b=>Math.abs(b-x)<64)&&!wet(x))free.push(x);if(!free.length)continue;
  list.forEach((r,j)=>{const x=free[Math.min(free.length-1,Math.floor((j+.5)/list.length*free.length))];z.nodes.push({r,x,ch:3,regrow:0});busy.push(x)})}
/* crafted sets: each region's workshops have a look and a property */
const CSET=(key,set,pal,p,weap)=>{GEAR[key]={set,drop:0,craft:1,pal,head:{n:p[0],s:p[1]},chest:{n:p[2],s:p[3]},hands:{n:p[4]},feet:{n:p[5]},charm:{n:p[6],s:p[7]},weap:{...weap}};
  for(const w of Object.keys(WPN))if(!GEAR[key].weap[w])GEAR[key].weap[w]=set+' '+WEAP_N[w]};
CSET('ashroad','Ash Road',['#7a5a3a','#4a3624','#a07a52','#e6d6b0','#c86a3a'],['Riverreed Hat','kasa','Ash Road Coat','leather','Ashwood Grips','Riverreed Sandals','Emberstone Charm','coin'],{bow:'Ashwood Bow',spear:'Ashwood Spear',staff:'Ashwood Staff',axe:'Ashwood Hatchet'});
CSET('grovecraft','Grovecraft',['#4a5a32','#2a3420','#6a7a46','#9ad8c8','#c8783a'],['Spiritmoss Hood','hood','Ironroot-backed Vest','leather','Resin Grips','Grovewalker Boots','Spiritmoss Locket','lamp'],{bow:'Elderwood Bow',staff:'Elderwood Staff',shield:'Ironroot Shield',tome:'Resin-bound Tome'});
CSET('blackwheel','Blackwheel',['#4a4a52','#26262c','#7a7a86','#d0783a','#d8dce4'],['Blackwheel Helm','visor','Blackwheel Plate','plate','Copper-wired Gauntlets','Granite-shod Greaves','Silver Ward Charm','coin'],{katana:'Silversteel Blade',spear:'Silver-tipped Spear',hammer:'Granite Maul',staff:'Copper Conduit Staff'});
CSET('fenwright','Fenwright',['#3a6a6a','#22403e','#6a9a96','#f0d8c8','#6ec6e2'],['Shell-crest Helm','visor','Kelp-weave Vest','leather','Kelp Gloves','Kelp-weave Boots','Tide Crystal Charm','crystal'],{spear:'Driftwood Spear',shield:'Shellplate Shield',bow:'Driftwood Bow',staff:'Tidecaller Staff'});
CSET('mirecraft','Mirecraft',['#4a5a3a','#2a3420','#6a7a52','#e8a0c8','#9bd04c'],['Bogstone Helm','visor','Mirewood Brigandine','leather','Lotus-waxed Gloves','Mirewood Clogs','Fen Crystal Focus','crystal'],{spear:'Mirewood Pike',tome:'Veilcap Grimoire',staff:'Mirewood Staff',daggers:'Bog-glass Knives'});
CSET('bastion','Bastion',['#5a6270','#343a44','#8a929e','#e3b04b','#a8302a'],['Watch Helm','visor','Slate-lined Plate','plate','Bastion Gauntlets','Watch Greaves','Signal Whistle','coin'],{axe:'Reforged Battle Axe',shield:'Bastion Shield',hammer:'Wallbreaker',katana:'Watch Blade'});
CSET('riftwork','Riftwork',['#3a3456','#221e34','#6a62a0','#d8d0ff','#c9a8ff'],['Hollowglass Visor','visor','Riftwork Mail','plate','Riftdust Grips','Riftwork Greaves','Echo Bloom Ward','crystal'],{staff:'Hollowglass Staff',daggers:'Riftdust Knives',tome:'Echo Codex',bow:'Rift-strung Bow'});
/* recipes. tune scales the stats a piece already has; add gives it a stat the slot does not normally carry (as a share of a normal piece at that level) */
const MREC=[
  /* CrestHollow: accessible, repairable starter craft */
  {id:'ashbow',d:'wood',r:1,n:'Ashwood Bow',set:'ashroad',make:['weapon','bow'],need:{ashwood:3,hide:1},prop:'Ashwood: flexible and shock-resistant. Quick to repair, never useless.',add:{crit:.5}},
  {id:'ashspear',d:'wood',r:1,n:'Ashwood Spear',set:'ashroad',make:['weapon','spear'],need:{ashwood:2,ore:1},prop:'Ashwood shaft, iron head. The Ash Road’s working spear.',add:{hp:.5}},
  {id:'reedsandal',d:'leather',r:1,n:'Riverreed Sandals',set:'ashroad',make:['feet'],need:{riverreed:3,hide:1},prop:'Woven reed: light and cool.',tune:{def:.85},add:{crit:.6}},
  {id:'embercharm',d:'smith',r:2,n:'Emberstone Charm',set:'ashroad',make:['charm'],need:{emberstone:2,clay:1},prop:'Emberstone in a fired-clay setting. Holds a little warmth.',add:{atk:.5}},
  {id:'ashsalve',d:'alchemy',r:1,n:'Ashleaf Salve ×3',use:'pots3',need:{ashleaf:2,clay:1},desc:'Ashleaf in a river-clay jar. The Ash Road’s oldest remedy: three tonics.'},
  {id:'reedhat',d:'leather',r:1,n:'Riverreed Hat',set:'ashroad',make:['head'],need:{riverreed:2,ashleaf:1},prop:'Wide reed brim. Shade and a clear head.',tune:{def:.8},add:{hp:.6}},
  /* Whisper Woods: stewardship, lightweight construction, spirit sensitivity */
  {id:'heartbow',d:'wood',r:3,n:'Elderwood Bow',set:'grovecraft',make:['weapon','bow'],need:{heartwood:2,resin:1,hide:1},prop:'Elderwood: strong for its weight, holds bond resonance.',add:{mp:.6}},
  {id:'heartstaff',d:'wood',r:3,n:'Elderwood Staff',set:'grovecraft',make:['weapon','staff'],need:{heartwood:2,spiritmoss:1},prop:'Spirit-sensitive grain. Focuses quietly.',add:{mp:.8}},
  {id:'irshield',d:'wood',r:3,n:'Ironroot Shield',set:'grovecraft',make:['weapon','shield'],need:{ironroot:3,resin:1,ore:1},prop:'Ironroot: extremely dense, strong under compression.',tune:{atk:.9},add:{def:.8}},
  {id:'mosshood',d:'leather',r:2,n:'Spiritmoss Hood',set:'grovecraft',make:['head'],need:{spiritmoss:2,hide:2},prop:'Spiritmoss lining. The forest feels closer.',tune:{def:.85},add:{crit:.5}},
  {id:'resintome',d:'wood',r:2,n:'Resin-bound Tome',set:'grovecraft',make:['weapon','tome'],need:{resin:2,timber:1,whisperbloom:1},prop:'Pages sealed in amber resin. Whisperbloom pressed between them.',add:{mp:.6}},
  {id:'irvest',d:'leather',r:3,n:'Ironroot-backed Vest',set:'grovecraft',make:['chest'],need:{ironroot:2,hide:3},prop:'Leather over an ironroot frame. Light, and stiff where it matters.',tune:{hp:1.15}},
  /* Stonebridge: standardised, industrial */
  {id:'silvblade',d:'smith',r:3,n:'Silversteel Blade',set:'blackwheel',make:['weapon','katana'],need:{silver:2,ore:2,coal:1},prop:'Silver inlay. Not a monster-killer by itself, but it takes a ritual edge well.',add:{crit:.5}},
  {id:'silvcharm',d:'smith',r:2,n:'Silver Ward Charm',set:'blackwheel',make:['charm'],need:{silver:2,coal:1},prop:'Silver wire in a Blackwheel setting.'},
  {id:'coalplate',d:'smith',r:4,n:'Blackwheel Plate',set:'blackwheel',make:['chest'],need:{ore:5,coal:3,hide:1},prop:'Standardised Stonebridge steel. Every rivet in the same place.',tune:{def:1.15}},
  {id:'silvspear',d:'smith',r:3,n:'Silver-tipped Spear',set:'blackwheel',make:['weapon','spear'],need:{silver:2,timber:2,coal:1},prop:'Silver head on a coal-fired steel socket.',add:{crit:.4}},
  {id:'copstaff',d:'smith',r:2,n:'Copper Conduit Staff',set:'blackwheel',make:['weapon','staff'],need:{copper:3,timber:1},prop:'Copper: highly conductive. Routes magic like a pipe routes water.',tune:{atk:.95},add:{mp:1}},
  {id:'granmaul',d:'smith',r:3,n:'Granite Maul',set:'blackwheel',make:['weapon','hammer'],need:{granite:3,ore:2},prop:'A granite head, iron-banded. Heavy as a foundation.',tune:{atk:1.12}},
  {id:'granboots',d:'smith',r:2,n:'Granite-shod Greaves',set:'blackwheel',make:['feet'],need:{granite:2,ore:1,limestone:1},prop:'Granite soles set in lime mortar.',tune:{def:1.15}},
  {id:'copgaunt',d:'smith',r:3,n:'Copper-wired Gauntlets',set:'blackwheel',make:['hands'],need:{copper:2,ore:2,hide:1},prop:'Copper wiring along each finger.',add:{mp:.6}},
  {id:'limejerk',d:'leather',r:2,n:'Lime-cured Jerkin',set:'leatherwork',make:['chest'],need:{hide:3,limestone:1},prop:'Leather cured in limestone. Stiffer, and it lasts.',tune:{def:1.1}},
  /* Misty Fen Lake: maritime */
  {id:'driftspear',d:'wood',r:4,n:'Driftwood Spear',set:'fenwright',make:['weapon','spear'],need:{driftwood:3,shell:1},prop:'Salt-treated driftwood. Irregular, light, never rots.',add:{hp:.6}},
  {id:'kelpboots',d:'leather',r:3,n:'Kelp-weave Boots',set:'fenwright',make:['feet'],need:{kelp:3,hide:1},prop:'Kelp fiber: water-tolerant and flexible.',add:{mp:.5}},
  {id:'shellshield',d:'smith',r:4,n:'Shellplate Shield',set:'fenwright',make:['weapon','shield'],need:{shell:3,ore:2},prop:'Layered shell over an iron rim.',tune:{atk:.9},add:{def:.9}},
  {id:'tidecharm',d:'smith',r:4,n:'Tide Crystal Charm',set:'fenwright',make:['charm'],need:{tidecrystal:2,silver:1},prop:'Tide crystal: feels the weather before it comes.',add:{def:.5}},
  {id:'kelpvest',d:'leather',r:3,n:'Kelp-weave Vest',set:'fenwright',make:['chest'],need:{kelp:3,shell:1,hide:1},prop:'Woven kelp with shell scales. Swims as well as it fights.',add:{mp:.5}},
  {id:'driftstew',d:'cooking',r:2,n:'Fenside Chowder ×3',use:'pots3',need:{fish:2,kelp:1},desc:'Fish and kelp, the way the ferryfolk make it. Three tonics.'},
  /* Marrowbog: medicine, containment, water resistance */
  {id:'mirepike',d:'wood',r:5,n:'Mirewood Pike',set:'mirecraft',make:['weapon','spear'],need:{mirewood:3,resin:1},prop:'Mirewood: dense and naturally water-resistant.',tune:{atk:1.05},add:{hp:.5}},
  {id:'boghelm',d:'smith',r:5,n:'Bogstone Helm',set:'mirecraft',make:['head'],need:{bogstone:3,ore:2},prop:'Bogstone absorbs contamination before you do.',tune:{def:1.1},add:{hp:.6}},
  {id:'lotusdraught',d:'alchemy',r:4,n:'Bog Lotus Draught ×3',use:'pots3',need:{boglotus:2,herb:1},desc:'Marrowbog medicine. Bitter, fast and reliable: three tonics.'},
  {id:'veiltome',d:'wood',r:5,n:'Veilcap Grimoire',set:'mirecraft',make:['weapon','tome'],need:{veilcap:2,mirewood:2},prop:'Veilcap: exorcism, necromancy, spirit detection. Handle with gloves.',add:{crit:.6}},
  {id:'fenfocus',d:'smith',r:5,n:'Fen Crystal Focus',set:'mirecraft',make:['charm'],need:{fencrystal:2,copper:1},prop:'Fen crystal stores residue; copper routes it away.',add:{def:.5}},
  {id:'mireclogs',d:'wood',r:4,n:'Mirewood Clogs',set:'mirecraft',make:['feet'],need:{mirewood:2,bogstone:1},prop:'Dry feet in the deepest bog.',tune:{hp:1.2}},
  /* Old Watchtower: fortification, recovery, reconstruction */
  {id:'slateplate',d:'smith',r:6,n:'Slate-lined Plate',set:'bastion',make:['chest'],need:{slate:3,ore:3,hide:1},prop:'Slate inserts behind the plate. Heat-resistant, and it does not dent.',tune:{def:1.2}},
  {id:'watchgreaves',d:'smith',r:6,n:'Watch Greaves',set:'bastion',make:['feet'],need:{slate:2,granite:2},prop:'Built for standing on a wall for twelve hours.',tune:{def:1.15,hp:1.1}},
  {id:'reforgeaxe',d:'smith',r:6,n:'Reforged Battle Axe',set:'bastion',make:['weapon','axe'],need:{salvage:4,slate:1,coal:1},prop:'Battlefield salvage, reforged. Someone carried this before you.',tune:{atk:1.08},add:{hp:.4}},
  {id:'bastshield',d:'smith',r:6,n:'Bastion Shield',set:'bastion',make:['weapon','shield'],need:{slate:2,ore:3,granite:1},prop:'Granite boss, slate face, iron rim.',tune:{atk:.9},add:{def:1}},
  /* The Sundering Scar: research, containment, high risk */
  {id:'hglassstaff',d:'wood',r:6,n:'Hollowglass Staff',set:'riftwork',make:['weapon','staff'],need:{hollowglass:2,shard:2,heartwood:1},prop:'Hollowglass: magical optics, dangerous conduits. Amplifies whatever you put in.',tune:{atk:1.1},add:{mp:.8}},
  {id:'riftknives',d:'smith',r:6,n:'Riftdust Knives',set:'riftwork',make:['weapon','daggers'],need:{riftdust:2,silver:2,ore:2},prop:'Rift dust in the temper. Unpredictable, which is the point.',add:{crit:.9}},
  {id:'echoward',d:'alchemy',r:6,n:'Echo Bloom Ward',use:'ward',need:{echobloom:2,silver:1},desc:'Echo bloom and silver, burned. +15 defense for 2 minutes.'},
  {id:'riftmail',d:'smith',r:6,n:'Riftwork Mail',set:'riftwork',make:['chest'],need:{riftdust:2,shard:2,ore:3},prop:'Shard-resistant mail, stabilised. Hums faintly.',tune:{def:1.1},add:{mp:.5}}];
{const ids=new Set(MREC.map(r=>r.id));for(let i=RECIPES.length-1;i>=0;i--)if(ids.has(RECIPES[i].id))RECIPES.splice(i,1);RECIPES.push(...MREC)}
/* region tag for the bag */
const REG_NAME={cresthollow:'CrestHollow',whisper:'Whisper Woods',stonebridge:'Stonebridge',mistyfen:'Misty Fen Lake',marrowbog:'Marrowbog',watchtower:'Old Watchtower',scar:'The Sundering Scar'};
Object.assign(RES.whisperbloom,{reg:'whisper'});Object.assign(RES.moonpetal,{reg:'whisper'});Object.assign(RES.glowcap,{reg:'whisper'});Object.assign(RES.heartwood,{reg:'whisper'});Object.assign(RES.silver,{reg:'stonebridge'});Object.assign(RES.coal,{reg:'stonebridge'});
{const q=QUESTS.ew1;if(q)for(const k of['title','offer','desc','where','prog','done'])if(typeof q[k]==='string')q[k]=q[k].replace(/heartwood/g,'elderwood').replace(/Heartwood/g,'Elderwood');
 if(NPCS.sorrel)NPCS.sorrel.lines=NPCS.sorrel.lines.map(l=>l.replace('heartwood','elderwood'))}
