/* ---------- The Sundering Scar, expanded to its sheet: Riftwatch Bastion, the Bleeding Fields, Mirror Basin, Echo Hollows, Veinfall Chasm and the Shardspire ---------- */
const SCT=THEMES.scar,INT=THEMES.inner||THEMES.scar;
THEMES.riftwatch={...SCT,fog:'rgba(90,60,120,.18)',ray:'220,190,255',rayA:1.3,amb:'mote'};
THEMES.bleeding={...SCT,ramps:{...SCT.ramps,far:R(['#1e0a1a','#2e1028','#42183a','#5a2050','#742a68','#903882','#b04aa0'])},fog:'rgba(160,50,120,.2)',fog2:'rgba(200,80,160,.08)',ray:'255,140,220',rayA:1.2,amb:'mote',vig:'10,0,6'};
THEMES.mirror={...SCT,ramps:{...SCT.ramps,far:R(['#141a24','#1e2634','#2a3446','#384660','#4c5e7e','#667ca0','#8aa0c4'])},canopy:'none',top:[160,60],fog:'rgba(170,190,230,.14)',fog2:'rgba(210,220,250,.06)',ray:'230,240,255',rayA:1.6,amb:'mote',vig:'2,4,8'};
THEMES.echo={...INT,fog:'rgba(100,80,140,.24)',ray:'200,180,255',rayA:.9,amb:'mote'};
THEMES.veinfall={...INT,ramps:{...INT.ramps,far:R(['#06040a','#0c0814','#140e20','#1e1430','#2a1c42','#382656','#4a326e'])},fog:'rgba(60,30,100,.3)',fog2:'rgba(90,50,140,.12)',ray:'170,120,255',rayA:.8,vig:'4,0,10'};
THEMES.shardspire={...INT,ramps:{...INT.ramps,far:R(['#100820','#1c0e34','#2a1650','#3c2070','#522c90','#6c3cb0','#8c50d0'])},fog:'rgba(150,90,255,.24)',fog2:'rgba(190,140,255,.1)',ray:'210,170,255',rayA:1.8,amb:'mote',vig:'6,0,12'};
Object.assign(WX,{riftwatch:['clear','clear','rain'],bleeding:['clear','clear'],mirror:['clear','clear'],echo:['clear'],veinfall:['clear'],shardspire:['clear']});
/* crystals and resources from the sheet */
Object.assign(RES,{veincrystal:{n:'Vein Crystal',c:'#6ec6e2',d:'mining',reg:'scar'},cindershard:{n:'Cinder Shard',c:'#ff7a3a',d:'mining',reg:'scar'},voidessence:{n:'Void Essence',c:'#5a3a8a',d:'salvage',reg:'scar'},stabfrag:{n:'Stabilized Fragment',c:'#e8d8ff',d:'mining',reg:'scar'}});
Object.assign(MAT_BASE,{veincrystal:['shard','#6ec6e2'],cindershard:['shard','#ff7a3a'],voidessence:['shard','#5a3a8a'],stabfrag:['shard','#e8d8ff']});
RECIPES.push({id:'veinfocus',d:'smith',r:6,n:'Vein Crystal Focus',set:'riftwork',make:['charm'],need:{veincrystal:2,silver:1},prop:'Vein crystal: a magic conduit. Routes power the way the Veinways once did.',add:{mp:.4,crit:.3}},
  {id:'cinderblade',d:'smith',r:6,n:'Cinder Shard Blade',set:'riftwork',make:['weapon','katana'],need:{cindershard:2,ore:3,coal:1},prop:'Where fire and shard collide. Runs hot; hits hotter.',tune:{atk:1.1}},
  {id:'voidtome',d:'wood',r:6,n:'Void Essence Codex',set:'riftwork',make:['weapon','tome'],need:{voidessence:2,hollowglass:1,witherroot:1},prop:'Void essence: a ritual material. The pages are blank until you need them.',add:{mp:.6,crit:.4}},
  {id:'riftvisor',d:'smith',r:6,n:'Hollowglass Visor',set:'riftwork',make:['head'],need:{hollowglass:2,veincrystal:1,ore:2},prop:'See through the shimmer. Mostly.',add:{crit:.5}},
  {id:'stabward',d:'smith',r:6,n:'Stabilized Ward',set:'riftwork',make:['weapon','shield'],need:{stabfrag:1,riftdust:2,ore:3},prop:'Shard-resistant equipment, properly contained. The rarest thing in the Scar: something stable.',tune:{atk:.9},add:{def:1,mp:.3}});
/* creatures */
Object.assign(MOBS,{
  shardhound:{name:'Shard Hound',kind:'quad',ai:'lunger',hp:62,atk:12,exp:18,w:22,h:14,spd:48,shard:[3,6],aggro:140},
  riftstalker:{name:'Rift Stalker',kind:'quad',ai:'lunger',stealth:1,hp:66,atk:13,exp:19,w:26,h:14,spd:46,shard:[3,6],aggro:140},
  crystalboar:{name:'Crystalback Boar',kind:'quad',ai:'lunger',hp:96,atk:13,exp:21,w:26,h:20,spd:30,shard:[3,7],aggro:120},
  hollowwraith:{name:'Hollow Wraith',kind:'gen',ai:'lunger',hp:70,atk:13,exp:20,w:16,h:34,spd:30,shard:[3,6],aggro:160},
  fracdrake:{name:'Fractured Drake',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:620,atk:15,exp:480,w:40,h:30,spd:46,shard:[40,60],aggro:210,resp:90},
  voidspawn:{name:'Voidspawn',kind:'gen',ai:'lunger',blink:1,elite:1,bb:1,hp:640,atk:15,exp:480,w:24,h:40,spd:28,shard:[40,60],aggro:190,resp:90},
  mirrorserpent:{name:'Mirror Serpent',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:600,atk:15,exp:470,w:52,h:24,spd:44,shard:[40,60],aggro:200,resp:90},
  etherealstag:{name:'The Ethereal Stag',kind:'quad',ai:'lunger',passive:1,elite:1,bb:1,hp:900,atk:14,exp:600,w:28,h:34,spd:44,shard:[50,80],aggro:120,resp:120},
  shardtitan:{name:'The Shard Titan',kind:'gen',ai:'lunger',elite:1,bb:1,hp:1350,atk:15,exp:1400,w:52,h:100,spd:10,shard:[120,170],aggro:230,resp:120}});
const RFK=['shardhound','riftstalker','crystalboar','hollowwraith','fracdrake','voidspawn','mirrorserpent','etherealstag','shardtitan'];for(const k of RFK)MOBS[k].base1=1;
Object.assign(GEAR,{
  shardhound:GS('Shard Hound',['#4a3a6a','#2a2040','#6a5a9a','#c9a8ff','#6ec6e2'],{n:'Shard Hound Hood',s:'pelt'},{n:'Crystal-studded Vest',s:'leather'},'Shard Claws','Hound Boots',{n:'Hound Shard',s:'shard'},{daggers:'Shardfang Knives',spear:'Hound Spear'}),
  riftstalker:GS('Rift Stalker',['#2a2a3a','#14141e','#4a4a62','#c9a8ff','#ff6aa0'],{n:'Rift Hood',s:'hood'},{n:'Riftstalker Cloak',s:'ink'},'Silent Rift Gloves','Riftstep Boots',{n:'Stalker Eye',s:'scale'},{daggers:'Riftfang Knives',bow:'Riftstalker Bow'}),
  crystalboar:GS('Crystalback',['#4a3a4a','#2a1e2a','#6a5a6a','#c9a8ff','#6ec6e2'],{n:'Crystalback Helm',s:'horns'},{n:'Crystalback Plate',s:'plate'},'Crystal Grips','Crystalback Greaves',{n:'Back-Crystal',s:'crystal'},{axe:'Crystal Cleaver',hammer:'Crystalback Maul'}),
  hollowwraith:GS('Hollow Wraith',['#3a2a5a','#1e1430','#6a5a8a','#e8d8ff','#c9a8ff'],{n:'Hollow Veil',s:'hood'},{n:'Echo Shroud',s:'shroud'},'Hollow Wraps','Echostep Boots',{n:'Hollow Lantern',s:'lamp'},{tome:'Book of Echoes',staff:'Hollow Staff'}),
  fracdrake:{...GS('Fractured',['#3a2a5a','#1e1434','#7a5aaa','#e8d8ff','#ff7a3a'],{n:'Fractured Helm',s:'horns'},{n:'Fractured Scale',s:'plate'},'Fractured Talons','Fractured Greaves',{n:'Fractured Heartscale',s:'core'},{spear:'Shatterlance',katana:'Faultline',bow:'Splitwing Bow'}),drop:1,drops:2},
  voidspawn:{...GS('Voidspawn',['#1e1430','#0e0a18','#3a2a5a','#c9a8ff','#9bd04c'],{n:'Void Cowl',s:'cowl'},{n:'Void-touched Robe',s:'shroud'},'Void Grips','Void Boots',{n:'Void Essence Vial',s:'core'},{tome:'The Void Primer',daggers:'Voidteeth',staff:'Hollow Rod'}),drop:1,drops:2},
  mirrorserpent:{...GS('Mirror Serpent',['#8a92a0','#4a525e','#c8d0dc','#ffffff','#6ec6e2'],{n:'Mirrorscale Hood',s:'hood'},{n:'Mirrorscale Mail',s:'plate'},'Mirror Gloves','Mirror Greaves',{n:'Serpent’s Reflection',s:'crystal'},{spear:'Reflection Lance',staff:'Looking-glass Staff'}),drop:1,drops:2},
  etherealstag:{...GS('Ethereal Stag',['#d8e8ff','#8a9ac8','#f2f8ff','#c9a8ff','#6ec6e2'],{n:'Ethereal Antlers',s:'antlers'},{n:'Starlight Mantle',s:'robe'},'Ethereal Gloves','Starstep Boots',{n:'Shed Ethereal Tine',s:'crystal'},{staff:'Starlit Staff',bow:'Ethereal Bow'}),drop:1,drops:2},
  shardtitan:{...GS('Shard Titan',['#4a2a7a','#24143e','#8a5ac8','#e8d8ff','#ff6aa0'],{n:'Titan’s Crown',s:'crystal'},{n:'Titan Shardplate',s:'plate'},'Titan Gauntlets','Titan Sabatons',{n:'Heart of the Spire',s:'core'},{hammer:'Spirebreaker',katana:'The Wound',shield:'Shardwall',staff:'Riftcaller'}),drop:1,drops:3}});
for(const k of RFK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
const crys=(P,o,col,n,sp)=>{const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<n;i++){const x=Math.round(o.cx-o.L/2+3+i*sp),h=3+(i%3);for(let y=0;y<h;y++){P(x,top-1-y,y===h-1?'#ffffff':col);if(y<h-2)P(x+1,top-1-y,'#4a3a6a')}}};
QUAD.shardhound={...QUAD.wolf,c:['#1e1430','#4a3a6a','#6a5a9a','#2a2040','#6ec6e2'],extra:(P,Rc,o)=>crys(P,o,'#c9a8ff',4,4)};
QUAD.riftstalker={...(QUAD.stalker||QUAD.wolf),c:['#0e0e18','#2a2a3a','#4a4a62','#18182a','#ff6aa0']};
QUAD.crystalboar={...QUAD.boar,c:['#1e141e','#4a3a4a','#6a5a6a','#2a1e2a','#6ec6e2'],extra:(P,Rc,o)=>crys(P,o,'#6ec6e2',6,3)};
QUAD.etherealstag={...QUAD.rotstag,cw:44,ch:46,len:21,bh:10,leg:13,c:['#6a7aa8','#d8e8ff','#f2f8ff','#a8b8e8','#c9a8ff'],extra:(P,Rc,o)=>{for(let i=0;i<6;i++)P(Math.round(o.cx-o.L/2+2+i*3.5),Math.floor(o.cy-o.bh/2)-1-(i%2),'#ffffff');for(let i=0;i<4;i++)P(Math.round(o.cx-o.L/2-2-i*2),o.cy-2+i,'#c9a8ff')}};
const HWRAITH={...WRAITH,body:['#2a1e48','#4a3a6a','#6a5a9a'],skin:['#3a2a5a','#6a5a8a','#9a8ab8'],eye:'#e8d8ff',hand:(P,Rc,x,y,mode)=>{Rc(x-1,y-1,3,3,'#c9a8ff');if(mode==='wind')P(x,y-2,'#ffffff')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let y=hip;y<g;y++){const w=Math.max(0,5-Math.floor((y-hip)/2));for(let k=-w;k<=w;k++)if((k+y)%3)P(x+k,y+b,'#4a3a6a')}for(let i=0;i<5;i++)P(x-6+i*3,hy+8+(i%2)*6,'#e8d8ff')}};
const VOIDS={h:36,tw:6,lw:2,leg:['#140e20','#1e1430'],boot:'#0a0610',body:['#140e20','#2a1e40','#3a2a5a'],skin:['#1e1430','#3a2a5a','#5a4a7a'],eye:'#9bd04c',
  hat:(P,Rc,hx,hy)=>{for(let i=0;i<5;i++){P(hx-3+i*2,hy-1-(i%2)*2,'#3a2a5a');P(hx-3+i*2,hy-2-(i%2)*2,'#c9a8ff')}},
  hand:(P,Rc,x,y,mode)=>{for(let k=0;k<4;k++)P(x+k,y+(k%2),'#3a2a5a');P(x+4,y,mode==='wind'?'#9bd04c':'#c9a8ff')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(let i=0;i<6;i++){const tx=x-7+i*3;for(let y=0;y<5;y++)P(tx+Math.round(Math.sin(y+i)*1),hip+2+y+b,'#2a1e40')}for(const[dx,dy]of[[-3,10],[2,14],[0,20]])P(x+dx,hy+dy+b,'#9bd04c')}};
const TITAN={h:46,tw:10,lw:5,leg:['#3a2060','#4a2a7a'],boot:'#24143e',body:['#3a2060','#5a3a90','#8a5ac8'],skin:['#4a2a7a','#7a4ab8','#b08ae8'],eye:'#ff6aa0',
  hat:(P,Rc,hx,hy)=>{for(const[dx,h]of[[-3,6],[0,9],[3,6],[-5,3],[5,3]])for(let y=0;y<h;y++)P(hx+dx,hy-1-y,y===h-1?'#ffffff':'#c9a8ff')},
  hand:(P,Rc,x,y,mode)=>{Rc(x-3,y-1,7,6,'#5a3a90');for(let k=0;k<3;k++)P(x-2+k*2,y-2,'#e8d8ff');if(mode==='wind')Rc(x-1,y-5,3,3,'#ff6aa0')},
  fx:(P,Rc,x,hy,hip,g,mode,b)=>{for(const[dx,dy,h]of[[-8,10,6],[7,12,5],[-4,22,4],[5,24,6],[0,16,3]])for(let y=0;y<h;y++){P(x+dx,hy+dy-y+b,y===h-1?'#ffffff':'#c9a8ff');P(x+dx+1,hy+dy-y+b,'#7a4ab8')}
    if(mode==='wind')for(let i=0;i<10;i++)P(x-12+((i*7)%25),hy-10-((i*5)%10),'#ff6aa0')}};
const _brRf=buildRoster;buildRoster=function(){_brRf();const md=['walk0','walk1','wind','lunge'];
  {const o={kind:'gen',ax:14,ay:40,fps:3},F={};for(const m of md){o[m]=humanoid(30,42,14,HWRAITH,m);F[m]=humanoid(30,42,14,HWRAITH,m,1)}o.F=F;MSP.hollowwraith=o}
  {const o={kind:'gen',ax:18,ay:46,fps:4},F={};for(const m of md){o[m]=humanoid(40,48,18,VOIDS,m);F[m]=humanoid(40,48,18,VOIDS,m,1)}o.F=F;MSP.voidspawn=o}
  {const o={kind:'gen',ax:44,ay:104,fps:2},F={};for(const m of md){o[m]=scale2(humanoid(48,54,22,TITAN,m));F[m]=scale2(humanoid(48,54,22,TITAN,m,1))}o.F=F;MSP.shardtitan=o}
  const toFrac=(r,g,b)=>{const l=(r+g+b)/3;return b>r+8?[Math.min(255,l*1.2),l*.65,Math.min(255,l*1.6)]:null},D=MSP.drake,sc=c=>scale2(recolor(c,toFrac));
  MSP.fracdrake={kind:'fly',ax:D.ax*2,ay:D.ay*2,fl:D.fl.map(sc),ch:sc(D.ch),F:{fl:D.F.fl.map(c=>scale2(c)),ch:scale2(D.F.ch)}};
  const toMir=(r,g,b)=>{const l=(r+g+b)/3;return[Math.min(255,l*1.4),Math.min(255,l*1.45),Math.min(255,l*1.6)]},L=MSP.lakeserpent,sm=c=>scale2(recolor(c,toMir));
  MSP.mirrorserpent={kind:'fly',ax:L.ax*2,ay:L.ay*2,fl:L.fl.map(sm),ch:sm(L.ch),F:{fl:L.F.fl.map(c=>scale2(c)),ch:scale2(L.F.ch)}}};
/* set dressing */
Object.assign(PROPS,{
  riftbastion(x,X,Y){const P=px3(x),S=R(['#1e1a28','#2a2438','#3a3250','#4e4468','#665a84']);for(let y=0;y<120;y++)for(let k=-50;k<=50;k++){const win=(Math.abs(k+24)<3||Math.abs(k-24)<3)&&y>80&&y<94,door=Math.abs(k)<10&&y<34;
      if(door){P(X+k,Y-y,[30,20,40]);continue}P(X+k,Y-y,win?[200,160,255]:pick(S,.55-(k+50)/360+(y%10===0?.1:0),X+k,y))}
    for(let k=-52;k<=52;k+=9)for(let y=120;y<130;y++)for(let j=0;j<5;j++)P(X+k+j,Y-y,pick(S,.7,X+k,y));for(let y=130;y<170;y++){const w=Math.round(6-(y-130)*.15);for(let k=-w;k<=w;k++)P(X+k,Y-y,y>160?[230,210,255]:[150,110,220])}
    Z.glows.push([X-24,Y-87,14,'200,160,255'],[X+24,Y-87,14,'200,160,255'],[X,Y-166,30,'200,160,255'])},
  shardshrine(x,X,Y){const P=px3(x);for(let y=0;y<8;y++)for(let k=-16;k<=16;k++)P(X+k,Y-y,[60,50,80]);for(const[dx,h,c]of[[-8,30,[150,110,220]],[0,46,[200,160,255]],[8,26,[120,90,200]]])for(let y=8;y<8+h;y++){const w=Math.max(0,3-Math.floor((y-8)/(h/3)));for(let k=-w;k<=w;k++)P(X+dx+k,Y-y,y>h?[255,255,255]:c)}Z.glows.push([X,Y-30,32,'180,130,255'])},
  floatrock(x,X,Y){const P=px3(x),S=R(['#1e1a28','#2a2438','#3a3250','#4e4468']);const fy=Y-90-Math.round(hash(1,2,X)*40);for(let k=-24;k<=24;k++){const d=Math.round((1-(k*k)/576)*16);for(let y=0;y<d;y++)P(X+k,fy+y,pick(S,.5+y/40,X+k,y))}for(let k=-20;k<=20;k+=6)P(X+k,fy-1,[150,110,220])},
  mirrorpool(x,X,Y){const P=px3(x);for(let k=-40;k<=40;k++)for(let y=0;y<3;y++)P(X+k,Y-y,(k+y)%7===0?[255,255,255]:[180,196,230]);Z.glows.push([X,Y-4,40,'220,230,255'])},
  echoarch(x,X,Y){const P=px3(x),S=R(['#2a2438','#3a3250','#4e4468','#665a84','#8a7cac']);for(let a=0;a<=Math.PI;a+=.01)for(let t=-4;t<=4;t++){const r=44+t,px=X+Math.round(Math.cos(a)*r),py=Y-Math.round(Math.sin(a)*r*1.4);if(!(a>1.3&&a<1.45))P(px,py,pick(S,.5+t/10,px,py))}
    for(const k of[-44,44])for(let y=0;y<10;y++)for(let j=-4;j<=4;j++)P(X+k+j,Y-y,S[2])}});
/* zones */
const OSZ=zIdx('scar'),RWI=ZONES.length,BLI2=RWI+1,MBI=RWI+2,EHI=RWI+3,VCI=RWI+4,SSI=RWI+5;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Rw={id:'riftwatch',name:'Riftwatch Bastion',ch:'The Sundering Scar',theme:'riftwatch',safe:1,lv:[30,30],req:29,ww:1700,start:70,
  seg:[[0,1700,250],[300,180,186,'plank']],mobs:[],portals:[{x:22,to:OSZ,tx:420},{x:1678,to:BLI2,tx:70}],npcs:['varga','ysolde'],
  labels:[[600,'Riftwatch Bastion',180],[1500,'The Bleeding Fields',78]],props:[['banner',160],['riftbastion',600],['banner',860],['crates',980],['shardshrine',1180],['siegetent',1340],['floatrock',1000]],trees:[]};
 const Bl={id:'bleeding',name:'The Bleeding Fields',ch:'The Sundering Scar',theme:'bleeding',lv:[30,31],req:29,ww:2000,start:70,
  seg:[[0,600,250],[600,400,240],[1000,1000,250],[700,90,200,'f']],
  mobs:[['shardhound',0,300],['crystalboar',0,480],['shardhound',1,760],['riftstalker',2,1060],['crystalboar',2,1260],['shardhound',2,1480],['riftstalker',2,1700]],
  portals:[{x:22,to:RWI,tx:1660},{x:1978,to:MBI,tx:70}],npcs:[],labels:[[900,'The Bleeding Fields',110],[1960,'Mirror Basin',78]],
  props:[['shard',200],['shard',360],['shardshrine',560],['shard',900],['floatrock',1100],['shard',1300],['shard',1600],['floatrock',1700]],trees:[]};
 const Mb={id:'mirror',name:'Mirror Basin',ch:'The Sundering Scar',theme:'mirror',lv:[31,32],req:30,ww:1900,start:70,
  seg:[[0,500,250],[500,900,276,'bed'],[490,18,262,'stone'],[1400,500,250],[1390,18,262,'stone'],[640,140,250,'plank'],[960,140,250,'plank'],[1240,120,250,'plank']],pools:[{x0:500,x1:1400,y:262}],
  mobs:[['hollowwraith',0,300],['shardhound',0,420],['hollowwraith',1,800],['mirrorserpent',-2,1000],['crystalboar',2,1560],['etherealstag',2,1720]],
  portals:[{x:22,to:BLI2,tx:1960},{x:1878,to:EHI,tx:70}],npcs:[],labels:[[950,'Mirror Basin',100],[1720,'Where the Stag Drinks',90],[1860,'Echo Hollows',78]],
  props:[['shard',200],['mirrorpool',380],['floatrock',700],['floatrock',1100],['mirrorpool',1500],['shard',1800]],trees:[]};
 const Eh={id:'echo',name:'Echo Hollows',ch:'The Sundering Scar',theme:'echo',lv:[32,33],req:31,ww:1900,start:70,
  seg:[[0,500,250],[500,400,236],[900,500,250],[1400,500,240],[560,90,196,'f'],[1460,90,196,'f']],
  mobs:[['hollowwraith',0,300],['riftstalker',1,640],['hollowwraith',2,1000],['voidspawn',2,1200],['hollowwraith',3,1540],['riftstalker',3,1720]],
  portals:[{x:22,to:MBI,tx:1860},{x:1878,to:VCI,tx:70}],npcs:['iona'],labels:[[260,'Echo Hollows',110],[1000,'The Voices',90],[1860,'Veinfall Chasm',78]],
  props:[['echoarch',420],['sealstone',700],['echoarch',900],['shard',1100],['echoarch',1340],['sealstone',1600]],trees:[]};
 const Vc={id:'veinfall',name:'Veinfall Chasm',ch:'The Sundering Scar',theme:'veinfall',lv:[33,34],req:32,ww:2000,start:70,
  seg:[[0,400,250],[400,200,262],[600,300,250],[900,300,266],[1200,300,250],[1500,500,256],[480,100,214,'plank'],[980,120,222,'plank'],[1300,100,212,'plank']],
  mobs:[['riftstalker',0,300],['voidspawn',2,700],['crystalboar',3,1000],['riftstalker',4,1300],['fracdrake',-2,1500],['shardhound',5,1700],['voidspawn',5,1860]],
  portals:[{x:22,to:EHI,tx:1860},{x:1978,to:SSI,tx:70}],npcs:[],labels:[[1000,'Veinfall Chasm',110],[1960,'The Shardspire',78]],
  props:[['floatrock',300],['shard',500],['floatrock',800],['shard',1100],['floatrock',1400],['shard',1700]],trees:[]};
 const Ss={id:'shardspire',name:'The Shardspire',ch:'The Sundering Scar',theme:'shardspire',lv:[34,35],req:33,ww:1800,start:70,
  seg:[[0,1800,250],[500,120,206,'plank'],[900,120,196,'plank']],
  mobs:[['shardhound',0,300],['voidspawn',0,600],['hollowwraith',0,900],['shardtitan',0,1560]],
  portals:[{x:22,to:VCI,tx:1960}],npcs:[],labels:[[800,'The Shardspire',110],[1560,'The Wound',150]],
  props:[['shard',200],['floatrock',400],['shardshrine',700],['floatrock',1000],['shard',1200],['shardshrine',1560],['floatrock',1700]],trees:[]};
 const NN={riftwatch:[],bleeding:[['veincrystal',380],['shard',640],['cindershard',1160],['veincrystal',1580],['riftdust',1800]],mirror:[['hollowglass',300],['veincrystal',1460],['echobloom',1640]],
   echo:[['echobloom',400],['voidessence',800],['hollowglass',1300],['voidessence',1640]],veinfall:[['cindershard',560],['voidessence',1100],['veincrystal',1640],['stabfrag',1900]],shardspire:[['stabfrag',460],['cindershard',800],['voidessence',1100]]};
 for(const z of[Rw,Bl,Mb,Eh,Vc,Ss]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Rw.stations=[{x:860+EDGE,k:'forge',n:'Riftwatch Armoury'},{x:1000+EDGE,k:'alchemy',n:'Containment Lab'},{x:1460+EDGE,k:'cook',n:'Bastion Mess'}];
 const O=ZONES[OSZ];O.portals.push({x:420+EDGE,to:RWI,tx:70+EDGE});(O.labels=O.labels||[]).push([420+EDGE,'Riftwatch Bastion',78])}
Object.assign(MAPXY,{riftwatch:[58,16],bleeding:[64,10],mirror:[72,14],echo:[80,10],veinfall:[86,16],shardspire:[92,10]});WAYS.riftwatch=200;WAYS.echo=300;
/* people */
Object.assign(NPCS,{
  varga:{name:'Commander Varga',title:'Riftwatch Bastion',x:300+EDGE,cls:'guard',look:{sex:1,build:2,face:4,hair:1,hairC:7,beard:0,skin:3,eye:0,outfit:2},eq:{head:'gd_start',chest:'siegebreaker'},
    lines:['A last line of defence. We are very aware of the word “last”.','Carry proper equipment. Conditions change quickly. Sometimes mid-sentence.','Multiple factions operate in the Scar. Most of them are lying to me.']},
  ysolde:{name:'Scholar Ysolde',title:'Riftwatch Containment',x:1060+EDGE,cls:'aspirant',look:{sex:1,build:0,face:0,hair:4,hairC:1,beard:0,skin:0,eye:1,outfit:4},eq:{head:'as_start',chest:'n_start'},
    lines:['What was broken did not disappear. It changed.','Every crystal here is a sentence in a language we almost understand.','Stabilized fragments are the rarest thing in the Scar. Bring me any you find.']},
  iona:{name:'Iona the Listener',title:'Echo Hollows',x:240+EDGE,cls:'necro',look:{sex:1,build:0,face:1,hair:6,hairC:0,beard:0,skin:1,eye:2,outfit:4},eq:{head:'wisp',chest:'hollowwraith'},
    lines:['Voices from another time. Some from tomorrow, I think.','Same sky. A different reality. Proceed with purpose.','Some places end the world. Others give it a second chance.']}});
Object.assign(BARKS,{varga:['Hold the line.','Check your gear.','Eyes on the rift.'],ysolde:['Fascinating.','Contain it!','Write that down.'],iona:['Listen…','They are talking.','Shh.']});
Object.assign(LORE,{
  ehA:{z:'echo',x:900,k:'stone',t:'Echo: A Watch Sergeant',txt:'“Hold the gate! Hold the— why are the seals open? Who gave the order? WHO GAVE THE ORDER?”'},
  ehB:{z:'echo',x:1060,k:'stone',t:'Echo: A Child',txt:'“Mama says the sky was a different colour before. I think purple is nicer.”'},
  ehC:{z:'echo',x:1240,k:'stone',t:'Echo: Someone Not Yet Born',txt:'“They rebuilt it, you know. All of it. It took a hundred years, and it was worth it. Tell them it was worth it.”'},
  ssA:{z:'shardspire',x:1300,k:'stone',t:'The Wound',txt:'“The wound that changed everything.” Beneath it, in many hands: “stabilize”, “exploit”, “research”, “transform”. Someone has crossed them all out and written “decide”.'}});
Object.assign(QUESTS,{
  rw1:{title:'The Last Line',giver:'varga',lv:30,
    offer:'Shard hounds are running the Bleeding Fields in packs and testing the bastion walls at night. Eight of them, before dawn.',
    desc:'Drive off 8 Shard Hounds.',goal:{t:'kill',mob:'shardhound',n:8,lab:'Shard Hounds driven off'},where:'The Bleeding Fields',prog:'They run in packs across the fields.',
    done:'The walls held. Thank you.',reward:{exp:600,sh:80}},
  rw2:{title:'Crystal Samples',giver:'ysolde',lv:31,
    offer:'Vein crystal grows wild across the Fields. It is the closest thing the Scar has to a nervous system. I need three samples, intact.',
    desc:'Gather 3 Vein Crystal.',goal:{t:'gather',res:'veincrystal',n:3},where:'The Bleeding Fields, Mirror Basin, Veinfall Chasm',prog:'Blue crystal spurs.',
    done:'Perfect. Look at the lattice. The Veinways ran on this, once. Use the armoury forge if you want to try working it.',reward:{exp:620,sh:80}},
  rw3:{title:'Crystalback',giver:'varga',pre:'rw1',lv:31,
    offer:'Crystalback boars are rooting up the supply road and the crystals on their backs cut the wagon wheels to ribbons. Six of them.',
    desc:'Drive off 6 Crystalback Boars.',goal:{t:'kill',mob:'crystalboar',n:6,lab:'Crystalback Boars driven off'},where:'The Bleeding Fields and Mirror Basin',prog:'They root along the road.',
    done:'Supply wagons are running again. Good work.',reward:{exp:640,sh:85}},
  bs1:{title:'Reflections Lie',giver:'ysolde',lv:32,
    offer:'A mirror serpent hunts the Basin. It shows you yourself, then strikes while you are looking. My survey team will not go near the water. Clear it.',
    desc:'Defeat the Mirror Serpent over Mirror Basin.',goal:{t:'kill',mob:'mirrorserpent',n:1,lab:'Mirror Serpent defeated'},where:'Mirror Basin',prog:'It rises over the still water.',
    done:'My team can survey the Basin. They say the water shows tomorrow’s weather. They are probably joking.',reward:{exp:1300,sh:140}},
  bs2:{title:'The Ethereal Stag',giver:'ysolde',pre:'rw2',lv:33,
    offer:'There is a stag at the far end of the Basin made of starlight. It is not hostile, but it is wounded by the Scar, and it is fading. A stabilized fragment, offered freely, might hold it together. I have never had one to spare. Find one in the Chasm or the Spire, and bring it to the stag.',
    desc:'Offer a Stabilized Fragment to the Ethereal Stag.',goal:{t:'event',id:'stagmend',n:1,lab:'Ethereal Stag mended'},where:'Where the Stag Drinks, east Mirror Basin',prog:'Bring a Stabilized Fragment to the stag.',
    done:'It is holding together. Some things in the Scar can be healed. Remember that.',reward:{exp:1400,sh:120,sp:1}},
  eh1:{title:'Voices',giver:'iona',lv:33,
    offer:'Three echoes repeat in the Hollows. One from the Gatefall, one from after, one from… later. Listen to all three. Then tell me if you still think time runs in a straight line.',
    desc:'Listen to the three echoes in the Hollows.',goal:{t:'event',id:'ehvoice',n:3,lab:'Echoes heard'},where:'The Voices, middle of Echo Hollows',prog:'Stones that whisper.',
    done:'“Tell them it was worth it.” I have heard that one a thousand times and it still makes me cry. Take this.',reward:{exp:800,sh:90,sp:1}},
  eh2:{title:'Voidspawn',giver:'iona',lv:33,
    offer:'Voidspawn crawl out of the thin places and drown out the echoes. One nests in the Hollows; another in the Chasm. Silence two.',
    desc:'Defeat 2 Voidspawn.',goal:{t:'kill',mob:'voidspawn',n:2,lab:'Voidspawn silenced'},where:'Echo Hollows and Veinfall Chasm',prog:'They lurk where the Veil is thinnest.',
    done:'I can hear the voices again. Thank you.',reward:{exp:1300,sh:140}},
  vc1:{title:'The Fractured Drake',giver:'varga',pre:'rw3',lv:34,
    offer:'A fractured drake hunts the Chasm. Half of it is here and half of it is somewhere else, and both halves bite. My scouts cannot reach the Spire while it lives.',
    desc:'Defeat the Fractured Drake in Veinfall Chasm.',goal:{t:'kill',mob:'fracdrake',n:1,lab:'Fractured Drake defeated'},where:'Veinfall Chasm',prog:'It hunts the depths of the Chasm.',
    done:'The road to the Spire is open. What waits there is worse. I am sorry; you knew that.',reward:{exp:1400,sh:150}},
  ss1:{title:'The Shard Titan',giver:'varga',pre:'vc1',lv:35,
    offer:'The Shard Titan stands at the Wound and grows. Every day it is a little larger and the Scar a little wider. It has to fall. Then Ysolde has a decision for you.',
    desc:'Defeat the Shard Titan at the Wound.',goal:{t:'kill',mob:'shardtitan',n:1,lab:'Shard Titan defeated'},where:'The Wound, heart of the Shardspire',prog:'At the heart of the Shardspire.',
    done:'It is done. The Wound is still open, but nothing is guarding it now. Go to Ysolde.',reward:{exp:1800,sh:200}},
  ss2:{title:'Decide',giver:'ysolde',pre:'ss1',lv:35,
    offer:'With the Titan gone, the Wound can be worked. We can stabilize it, which makes the Scar safer and slower. We can exploit it, which makes Riftwatch rich. We can research it, which may answer everything, or we can try to transform it into something new. The factions all want different things. You earned the choice.',
    desc:'Decide what happens to the Wound at the Shardspire.',goal:{t:'talk',npc:'ysolde'},where:'Scholar Ysolde, Riftwatch Bastion',prog:'Tell Ysolde what you decided.',
    done:'Then that is the Scar’s future. Some places end the world. Others give it a second chance.',
    choices:[{n:'Stabilize it',d:'Contain the Wound. The Scar grows safer, slowly. Redemption and renewal.',flag:'scar_stabilized',reward:{exp:1600,sh:200}},
      {n:'Exploit it',d:'Mine the Wound for power. Riftwatch and the factions grow rich. Risk and reward.',flag:'scar_exploited',reward:{sh:600}},
      {n:'Research it',d:'Study the Wound. Knowledge, at a cost no one can price yet.',flag:'scar_researched',reward:{exp:800,sp:2}},
      {n:'Transform it',d:'Shape the Wound into something new. Nobody knows what.',flag:'scar_transformed',reward:{item:['shardtitan','charm',3]}}],reward:{exp:1000}}});
const EHV=['ehA','ehB','ehC'];
const _olRf=openLore;openLore=function(id){const r=_olRf(id);if(EHV.includes(id)){pl.lore=pl.lore||{};pl.lore[id]=pl.lore[id]||1;const st=qSt('eh1');if(st&&st.s==='a'){st.n=EHV.filter(k=>pl.lore[k]).length;qProgress('eh1','Echo')}}return r};
/* mending the Ethereal Stag with a stabilized fragment */
function stagNear(){if(Z.id!=='mirror')return null;const st=qSt('bs2');if(!st||st.s!=='a'||st.n>=1)return null;const m=S.mobs.find(m=>m.t==='etherealstag'&&!m.dead);if(m&&Math.abs(m.x-pl.x)<60&&!m.aggro)return{k:'emend',m};return null}
const _cnRf=crNear;crNear=function(){return stagNear()||_cnRf()};
const _cuRf=crUse;crUse=function(n){if(n&&n.k==='emend'){if(mat('stabfrag')<1){banner('You need a Stabilized Fragment','They grow in Veinfall Chasm and the Shardspire');return}pl.mat.stabfrag--;qEvent('stagmend');
    for(let i=0;i<24;i++){const a=i/24*6.28;S.parts.push({x:n.m.x,y:n.m.y-20,vx:Math.cos(a)*60,vy:Math.sin(a)*60-20,t:0,life:1,c:i%2?'#e8d8ff':'#6ec6e2',g:-10,s:i%4?1:2})}
    banner('The Ethereal Stag','The light in it steadies. It bows its head, once');[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.35,'sine',.04),i*160));save();return}return _cuRf(n)};
const _clRf=crLabel;crLabel=function(n){if(n&&n.k==='emend')return'Offer · Stabilized Fragment ('+mat('stabfrag')+')';return _clRf(n)};
