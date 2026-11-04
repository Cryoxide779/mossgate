/* ---------- Misty Fen Lake, expanded to its sheet: Fenwater Port, Reedshore Village, Glasswater Reef, the Serpent Islands and Lighthouse Spire, the Sunken Archive ---------- */
const LK=THEMES.moonlake||THEMES.river;
THEMES.port={...THEMES.river,fog:'rgba(170,190,210,.12)',fog2:'rgba(200,210,230,.05)',ray:'255,236,200',rayA:1.5,amb:'mote'};
THEMES.reedshore={...THEMES.river,ramps:{...THEMES.river.ramps,far:R(['#1e2a2a','#2a3a38','#3a4e4a','#4e6a60','#68867a','#8aa492','#b0c4ac'])},fog:'rgba(190,200,190,.16)',ray:'240,240,210',rayA:1.1,amb:'mote'};
THEMES.reef={...THEMES.river,ramps:{...THEMES.river.ramps,far:R(['#0e2a3a','#12384a','#18485c','#20607a','#2a7c96','#3a98b0','#5ab4c8'])},canopy:'none',top:[170,40],fog:'rgba(90,190,210,.12)',fog2:'rgba(140,220,230,.06)',ray:'220,255,250',rayA:1.6,amb:'mote',vig:'0,6,8'};
THEMES.serpent={...THEMES.river,ramps:{...THEMES.river.ramps,far:R(['#1a2230','#222e40','#2c3c52','#3a4e66','#4c647e','#627e98','#84a0b6'])},canopy:'none',top:[160,50],fog:'rgba(120,140,170,.2)',fog2:'rgba(150,170,200,.08)',ray:'230,236,255',rayA:1,amb:'mote',vig:'2,4,8'};
THEMES.archive={...THEMES.under,fog:'rgba(20,80,110,.3)',fog2:'rgba(40,120,150,.1)',ray:'120,220,255',rayA:.9,vig:'0,4,8'};
Object.assign(WX,{fenwater:['clear','clear','rain'],reedshore:['clear','rain','clear'],glasswater:['clear','clear','clear'],serpent:['clear','rain','rain'],archive:['clear']});
/* lake materials from the sheet */
Object.assign(RES,{pearl:{n:'Lake Pearl',c:'#f2eee6',d:'fishing',reg:'mistyfen'},coral:{n:'Reef Coral',c:'#e86a8a',d:'fishing',reg:'mistyfen'}});
MAT_BASE.pearl=['salvage','#f2eee6'];MAT_BASE.coral=['herb','#e86a8a'];
RECIPES.push({id:'pearlcharm',d:'smith',r:4,n:'Lake Pearl Charm',set:'fenwright',make:['charm'],need:{pearl:2,silver:1},prop:'Lake pearl in a silver cup. The lake gives, the lake takes.',add:{atk:.4}},
  {id:'coralknives',d:'smith',r:4,n:'Coral-edged Knives',set:'fenwright',make:['weapon','daggers'],need:{coral:3,ore:1},prop:'Reef coral ground to an edge. Brittle, wickedly sharp.',tune:{atk:1.05},add:{crit:.7}},
  {id:'pearlhelm',d:'smith',r:5,n:'Shell-crest Helm',set:'fenwright',make:['head'],need:{shell:2,pearl:1,ore:2},prop:'A harbour guard’s helm, pearl at the brow.',add:{mp:.5}});
/* creatures */
Object.assign(MOBS,{
  riverotter:{name:'River Otter',kind:'quad',ai:'lunger',passive:1,hp:45,atk:9,exp:13,w:18,h:10,spd:56,shard:[2,4],aggro:60},
  fenturtle:{name:'Fen Turtle',kind:'quad',ai:'lunger',hp:120,atk:10,exp:18,w:26,h:16,spd:14,shard:[2,5],aggro:70},
  reefstrider:{name:'Reef Strider',kind:'quad',ai:'lunger',hp:66,atk:12,exp:17,w:24,h:18,spd:46,shard:[2,5],aggro:130},
  lakeserpent:{name:'Lake Serpent',kind:'fly',ai:'flyer',fly:1,hp:62,atk:12,exp:18,w:26,h:14,spd:44,shard:[2,5],aggro:160},
  wavestag:{name:'Wavecrest Stag',kind:'quad',ai:'lunger',passive:1,elite:1,hp:380,atk:12,exp:200,w:24,h:30,spd:46,shard:[16,28],aggro:90,resp:90},
  shellcrab:{name:'Shellback Crab',kind:'quad',ai:'lunger',elite:1,bb:1,hp:640,atk:14,exp:360,w:44,h:24,spd:22,shard:[34,54],aggro:170,resp:90},
  stormdrake:{name:'Stormtide Drake',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:900,atk:16,exp:520,w:40,h:30,spd:46,shard:[50,80],aggro:210,resp:110},
  spiritmanta:{name:'The Spirit Manta',kind:'fly',ai:'flyer',fly:1,elite:1,bb:1,hp:1500,atk:17,exp:900,w:56,h:26,spd:38,shard:[80,120],aggro:220,resp:120}});
const FNK=['riverotter','fenturtle','reefstrider','lakeserpent','wavestag','shellcrab','stormdrake','spiritmanta'];for(const k of FNK)MOBS[k].base1=1;
Object.assign(GEAR,{
  riverotter:GS('River Otter',['#6a4a2a','#3e2a18','#8f6a48','#e6d6b0','#4a8a9a'],{n:'Otterskin Cap',s:'pelt'},{n:'Sleek Otter Vest',s:'leather'},'Webbed Grips','Riverbank Boots',{n:'Smooth River Stone',s:'coin'},{daggers:'Otter Fangs',spear:'Fishing Spear'}),
  fenturtle:GS('Fen Turtle',['#4a6a3a','#2a3e22','#6a8a4a','#d8c890','#3a6a6a'],{n:'Shellcap Helm',s:'visor'},{n:'Fen Shell Plate',s:'plate'},'Shell Gloves','Wading Boots',{n:'Turtle Scute',s:'scale'},{shield:'Fen Shell Bulwark',hammer:'Shellcrusher'}),
  reefstrider:GS('Reef Strider',['#c84a3a','#7a2a20','#e87a5a','#f2e6c8','#3a8aa0'],{n:'Strider Carapace Helm',s:'horns'},{n:'Reef Chitin Vest',s:'plate'},'Pincer Gauntlets','Strider Greaves',{n:'Strider Claw',s:'fang'},{daggers:'Pincer Knives',spear:'Reef Pike'}),
  lakeserpent:GS('Lake Serpent',['#2a6a7a','#164050','#4a9aaa','#d8f0f0','#e0c050'],{n:'Serpent Scale Hood',s:'hood'},{n:'Serpentscale Mail',s:'plate'},'Scaled Gloves','Serpent Boots',{n:'Serpent Fang',s:'fang'},{spear:'Serpent Lance',bow:'Tidestring Bow'}),
  wavestag:{...GS('Wavecrest',['#d8e8f0','#6a8aa0','#f2f8fc','#3a6a8a','#6ec6e2'],{n:'Wavecrest Antlers',s:'antlers'},{n:'Seafoam Mantle',s:'robe'},'Foam Gloves','Wavestep Boots',{n:'Shed Wavecrest Tine',s:'crystal'},{staff:'Tideborn Staff',bow:'Wavecrest Bow'}),drop:.5},
  shellcrab:{...GS('Shellback',['#8a3a2a','#4a1e16','#c8604a','#f2e6c8','#e0c050'],{n:'Shellback Helm',s:'horns'},{n:'Shellback Cuirass',s:'plate'},'Crusher Claws','Shellback Greaves',{n:'Shellback Pearl',s:'core'},{hammer:'Crabclaw Maul',shield:'Shellback Aegis'}),drop:1,drops:2},
  stormdrake:{...GS('Stormtide',['#2a3a5a','#141e34','#4a6a9a','#c8e0ff','#ffe066'],{n:'Stormtide Helm',s:'horns'},{n:'Stormscale Mail',s:'plate'},'Stormtide Talons','Stormtide Greaves',{n:'Captured Lightning',s:'core'},{spear:'Stormtide Lance',katana:'Thunderwake',bow:'Galecall Bow'}),drop:1,drops:2},
  spiritmanta:{...GS('Spirit Manta',['#1e4a6a','#0e2638','#3a7aa0','#bff0ff','#c9a8ff'],{n:'Manta Veil',s:'hood'},{n:'Deepglow Robe',s:'robe'},'Tideglow Wraps','Abyssal Slippers',{n:'Spirit Manta Heart',s:'crystal'},{staff:'Deepcurrent Staff',tome:'The Drowned Codex'}),drop:1,drops:3}});
for(const k of FNK){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
QUAD.riverotter={cw:32,ch:16,cx:13,len:16,bh:5,leg:2,lw:2,c:['#2a1e12','#6a4a2a','#8f6a48','#4a3420','#1a1210'],head:'none',tail:'long',extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2),hy=o.cy-2+(o.mode==='lunge'?1:0);
  Rc(hx-1,hy-1,5,4,'#6a4a2a');Rc(hx,hy+1,4,2,'#d8c8a8');P(hx+2,hy-1,'#1a1210');P(hx+4,hy,'#1a1210');P(hx,hy-2,'#4a3420');for(let x=Math.floor(o.cx-o.L/2+1);x<o.cx+o.L/2;x+=3)P(x,o.cy+Math.floor(o.bh/2),'#d8c8a8')}};
const turtleX=(sh,dk,lt,hd)=>(P,Rc,o)=>{const cx=Math.round(o.cx),cy=Math.round(o.cy)-2,hw=12;for(let x=-hw;x<=hw;x++){const h=Math.round(Math.sqrt(1-(x*x)/(hw*hw))*8);for(let y=0;y<=h;y++)P(cx+x,cy-y,y===h?lt:((x+30)%6===0||y%4===0)?dk:sh)}
  const hx=cx+hw+1+(o.mode==='lunge'?3:o.mode==='wind'?-2:0);Rc(hx,cy-1,5,4,hd);P(hx+3,cy,'#1a1210')};
QUAD.fenturtle={cw:42,ch:22,cx:18,len:20,bh:6,leg:3,lw:3,c:['#1e2614','#4a5a32','#6a7a46','#2a3420','#c8a050'],head:'none',tail:'stub',extra:turtleX('#4a6a3a','#2a3e22','#8aa060','#7a8a50')};
QUAD.reefstrider={cw:40,ch:28,cx:17,len:12,bh:7,leg:9,lw:1,c:['#4a1e16','#c84a3a','#e87a5a','#7a2a20','#ffd27a'],head:'none',tail:'stub',extra:(P,Rc,o)=>{const cx=Math.round(o.cx),cy=Math.round(o.cy),op=o.mode==='lunge'?3:o.mode==='wind'?-1:0;
  for(const s of[-1,1])for(let k=0;k<4;k++){P(cx+s*(4+k),cy-1-k,'#c84a3a');P(cx+s*(8+k),cy-4+k*2,'#7a2a20')}
  const px0=cx+Math.round(o.L/2)+1;for(let k=0;k<6;k++)P(px0+k+op,cy-2-(k>>1),'#e87a5a');Rc(px0+5+op,cy-6,4,3,'#c84a3a');P(px0+8+op,cy-6,'#f2e6c8');P(px0+8+op,cy-4,'#f2e6c8');
  for(const dx of[-2,2]){P(cx+dx,cy-6,'#c84a3a');P(cx+dx,cy-7,'#1a1210')}}};
QUAD.shellcrab={...QUAD.reefstrider,cw:76,ch:40,cx:34,len:26,bh:12,leg:9,lw:2,c:['#4a1e16','#8a3a2a','#c8604a','#4a1e16','#ffd27a'],extra:(P,Rc,o)=>{const cx=Math.round(o.cx),cy=Math.round(o.cy),op=o.mode==='lunge'?5:o.mode==='wind'?-2:0;
  for(let x=-16;x<=16;x++){const h=Math.round(Math.sqrt(1-(x*x)/256)*12);for(let y=0;y<=h;y++)P(cx+x,cy-3-y,y===h?'#e87a5a':(x+40)%7===0?'#4a1e16':'#8a3a2a')}for(const dx of[-10,-4,2,8])P(cx+dx,cy-13+Math.abs(dx)/4,'#f2e6c8');
  for(const s of[1]){const px0=cx+17;for(let k=0;k<8;k++)Rc(px0+k+op,cy-4-(k>>1),2,2,'#c8604a');Rc(px0+7+op,cy-11,7,5,'#8a3a2a');Rc(px0+12+op,cy-12,2,3,'#f2e6c8');Rc(px0+12+op,cy-7,2,2,'#f2e6c8')}
  for(const dx of[-4,4]){Rc(cx+dx,cy-18,1,3,'#8a3a2a');P(cx+dx,cy-19,'#1a1210')}}};
QUAD.wavestag={...QUAD.rotstag,c:['#3a5a6a','#d8e8f0','#f2f8fc','#9ac0d0','#1a2a40'],extra:(P,Rc,o)=>{for(let i=0;i<5;i++)P(Math.round(o.cx-o.L/2+2+i*3),Math.floor(o.cy-o.bh/2)-1,'#6ec6e2')}};
function serpentFrame(ph,charge,flash){return sprite(44,22,(P,Rc)=>{const cy=12;for(let i=0;i<34;i++){const x=4+i,y=cy+Math.round(Math.sin(i*.35+ph*2.1)*3),w=i<6?1:i<26?3:2;for(let j=0;j<w;j++)P(x,y-1+j,j===0?'#4a9aaa':j===w-1?'#164050':'#2a6a7a');if(i%4===0&&i>6&&i<28)P(x,y-2,'#e0c050')}
  const hx=37,hy=cy+Math.round(Math.sin(34*.35+ph*2.1)*3)-1;Rc(hx,hy-2,6,4,'#2a6a7a');Rc(hx+1,hy-2,5,1,'#4a9aaa');P(hx+3,hy-1,charge?'#ff6a3a':'#e0c050');if(charge){P(hx+6,hy,'#f2e6c8');P(hx+6,hy+1,'#f2e6c8')}
  for(let k=0;k<3;k++)P(hx-1-k,hy-3-k,'#4a9aaa')},flash)}
function mantaFrame(ph,charge,flash){return sprite(44,24,(P,Rc)=>{const cx=22,cy=12,wa=[-2,0,2][ph%3];
  for(let x=-20;x<=20;x++){const ax=Math.abs(x),t=Math.max(0,5-ax/4),y0=cy-Math.round(t)+Math.round(wa*ax/20),y1=cy+Math.round(t*.6)+Math.round(wa*ax/20);for(let y=y0;y<=y1;y++)P(cx+x,y,y===y0?'#bff0ff':ax>14?'#1e4a6a':'#3a7aa0');if(ax%5===0)P(cx+x,y0+1,'#c9a8ff')}
  for(let k=0;k<12;k++)P(cx-k-2,cy+1+Math.round(Math.sin(k*.6+ph)*1),'#1e4a6a');Rc(cx+16,cy-1,3,2,'#3a7aa0');P(cx+18,cy-1,charge?'#ffffff':'#bff0ff');
  if(charge)for(let i=0;i<8;i++)P(cx+Math.round(Math.cos(i*.8)*18),cy+Math.round(Math.sin(i*.8)*8),'#bff0ff')},flash)}
const _brf=buildRoster;buildRoster=function(){_brf();
  MSP.lakeserpent={kind:'fly',ax:22,ay:14,fl:[0,1,2].map(p=>serpentFrame(p,0,0)),ch:serpentFrame(1,1,0),F:{fl:[0,1,2].map(p=>serpentFrame(p,0,1)),ch:serpentFrame(1,1,1)}};
  const m2=(p,c,f)=>scale2(mantaFrame(p,c,f));MSP.spiritmanta={kind:'fly',ax:44,ay:28,fl:[0,1,2].map(p=>m2(p,0,0)),ch:m2(1,1,0),F:{fl:[0,1,2].map(p=>m2(p,0,1)),ch:m2(1,1,1)}};
  const toStorm=(r,g,b)=>{const l=(r+g+b)/3;return b>r+8?[l*.55,l*.75,Math.min(255,l*1.5)]:r>g+30?[255,224,102]:null},D=MSP.drake,sc=c=>scale2(recolor(c,toStorm));
  MSP.stormdrake={kind:'fly',ax:D.ax*2,ay:D.ay*2,fl:D.fl.map(sc),ch:sc(D.ch),F:{fl:D.F.fl.map(c=>scale2(c)),ch:scale2(D.F.ch)}}};
/* set dressing */
Object.assign(PROPS,{
  stilthouse(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-20,-6,8,20])for(let y=0;y<34;y++){P(X+k,Y-y,W[1]);P(X+k+1,Y-y,W[3])}for(let k=-26;k<=26;k++){P(X+k,Y-34,W[4]);P(X+k,Y-35,W[2])}
    for(let y=36;y<64;y++)for(let k=-22;k<=22;k++){const win=Math.abs(k-10)<4&&y>44&&y<52;P(X+k,Y-y,win?[255,206,120]:(k+y)%9===0?W[1]:pick(W,.55,X+k,y))}for(let y=64;y<80;y++){const w=Math.round(28-(y-64)*1.75);for(let k=-w;k<=w;k++)P(X+k,Y-y,(k*3+y)%4?[150,140,90]:[120,110,70])}Z.glows.push([X+10,Y-48,14,'255,200,120'])},
  lighthouse(x,X,Y){const P=px3(x),S=R(['#5a5248','#7a7064','#9a8e80','#b8ac9a','#e6dccc']);for(let y=0;y<140;y++){const hw=Math.round(16-y*.06);for(let k=-hw;k<=hw;k++)P(X+k,Y-y,(Math.floor(y/18)%2?[180,60,50]:pick(S,.7-(k+hw)/(hw*4),X+k,y)))}
    for(let y=140;y<156;y++)for(let k=-9;k<=9;k++)P(X+k,Y-y,Math.abs(k)<7&&y<152?[255,236,160]:[60,60,66]);for(let y=156;y<164;y++){const w=12-(y-156);for(let k=-w;k<=w;k++)P(X+k,Y-y,[60,60,66])}Z.glows.push([X,Y-147,46,'255,236,160'])},
  coral(x,X,Y){const P=px3(x);for(let i=0;i<6;i++){const k=-14+i*6,h=6+Math.floor(hash(i,3,X)*12),c=i%3===0?[232,106,138]:i%3===1?[240,160,90]:[160,110,220];for(let y=0;y<h;y++){P(X+k,Y-y,c);if(y%4===2){P(X+k-1,Y-y,c);P(X+k+1,Y-y-1,c)}}}},
  archivearch(x,X,Y){const P=px3(x),S=R(['#1e2e3a','#2a3e4c','#3a5262','#4e6a7a','#6a8a96']);for(let y=0;y<96;y++)for(let k=-46;k<=46;k++){const inA=Math.abs(k)<22&&(y<60||(k*k)/484+((y-60)*(y-60))/900<1);if(inA)continue;P(X+k,Y-y,pick(S,.5-(k+46)/300+(y%12===0?.1:0),X+k,y))}
    for(let k=-18;k<=18;k+=6)for(let y=4;y<40;y++)P(X+k,Y-y,[30,46,58]);Z.glows.push([X,Y-40,30,'110,220,255'])},
  shelves(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<50;y++)for(let k=-16;k<=16;k++){const sh=y%12===0,bk=!sh&&y%12<9&&(k+y)%3!==0;P(X+k,Y-y,sh?W[4]:bk?[[110,60,50],[60,80,110],[90,100,60]][(k+30)%3]:W[1])}}});
/* zones */
const FLI=zIdx('falls'),FPI=ZONES.length,RSI=FPI+1,GWI=FPI+2,SII=FPI+3,SAI=FPI+4;
{const node=(r,x)=>({r,x:x+EDGE,ch:3,regrow:0});
 const Fp={id:'fenwater',name:'Fenwater Port',ch:'Misty Fen Lake',theme:'port',safe:1,lv:[15,15],req:14,ww:1700,start:70,
  seg:[[0,1000,250],[1000,700,292,'bed'],[980,18,272,'stone'],[1060,120,250,'plank'],[1300,120,250,'plank'],[1540,140,250,'plank']],pools:[{x0:1000,x1:1700,y:264}],mobs:[],
  portals:[{x:22,to:FLI,tx:760},{x:1110,to:RSI,tx:70},{x:1360,to:GWI,tx:70},{x:1610,to:SII,tx:70}],npcs:['quill','bosk'],
  labels:[[300,'Fenwater Port',110],[700,'Shipwright’s Yard',70],[1110,'Ferry · Reedshore',70],[1360,'Ferry · Glasswater Reef',70],[1610,'Ferry · Serpent Islands',70]],
  props:[['stall',160],['crates',260],['banner',360],['crane',560],['scaff',740],['crates',880],['dock',1110],['dock',1360],['dock',1610]],trees:[]};
 const Rs={id:'reedshore',name:'Reedshore Village',ch:'Misty Fen Lake',theme:'reedshore',lv:[16,17],req:15,ww:1800,start:70,
  seg:[[0,600,250],[600,300,282,'bed'],[900,500,250],[1400,400,280,'bed'],[590,18,268,'stone'],[1390,18,268,'stone'],[680,120,250,'plank'],[1480,120,250,'plank']],pools:[{x0:600,x1:900,y:262},{x0:1400,x1:1800,y:262}],
  mobs:[['riverotter',0,420],['fenturtle',1,760],['riverotter',2,1000],['reefstrider',2,1200],['fenturtle',2,1300],['reefstrider',3,1560],['riverotter',3,1700]],
  portals:[{x:22,to:FPI,tx:1110}],npcs:['nessa'],labels:[[220,'Reedshore Village',100],[1100,'The Net Flats',60]],
  props:[['stilthouse',160],['stilthouse',380],['reeds',560],['reeds',900],['stilthouse',1180],['reeds',1380],['reeds',1640]],trees:[]};
 const Gw={id:'glasswater',name:'Glasswater Reef',ch:'Misty Fen Lake',theme:'reef',lv:[17,18],req:16,ww:1800,start:70,
  seg:[[0,300,250],[300,300,276,'bed'],[600,200,250],[800,300,276,'bed'],[1100,200,250],[1300,200,276,'bed'],[1500,300,250],[290,18,262,'stone'],[590,18,262,'stone'],[790,18,262,'stone'],[1090,18,262,'stone'],[1290,18,262,'stone'],[1490,18,262,'stone']],pools:[{x0:300,x1:600,y:262},{x0:800,x1:1100,y:262},{x0:1300,x1:1500,y:262}],
  mobs:[['reefstrider',1,420],['fenturtle',2,680],['reefstrider',3,900],['lakeserpent',-2,900],['reefstrider',4,1180],['fenturtle',5,1380],['shellcrab',6,1640]],
  portals:[{x:22,to:FPI,tx:1360}],npcs:[],labels:[[800,'Glasswater Reef',100],[1640,'Shellback Shoal',70]],
  props:[['coral',380],['coral',560],['coral',760],['coral',1000],['coral',1180],['coral',1400],['reeds',1560]],trees:[]};
 const Si={id:'serpent',name:'Serpent Islands',ch:'Misty Fen Lake',theme:'serpent',lv:[18,19],req:17,ww:2000,start:70,
  seg:[[0,500,250],[500,260,288,'bed'],[490,18,268,'stone'],[760,500,244],[1260,260,288,'bed'],[1250,18,268,'stone'],[1520,480,250],[560,140,250,'plank'],[1320,140,250,'plank']],pools:[{x0:500,x1:760,y:262},{x0:1260,x1:1520,y:262}],
  mobs:[['lakeserpent',-2,300],['reefstrider',0,380],['lakeserpent',-2,640],['wavestag',3,980],['lakeserpent',-2,1120],['reefstrider',3,1160],['lakeserpent',-2,1380],['stormdrake',-2,1760]],
  portals:[{x:22,to:FPI,tx:1610},{x:1978,to:SAI,tx:70}],npcs:['aldo'],labels:[[1000,'Serpent Islands',100],[1700,'Lighthouse Spire',180],[1960,'The Sunken Archive',78]],
  props:[['cairn',200],['reeds',460],['deadoak',900],['cairn',1080],['reeds',1480],['lighthouse',1700]],trees:[]};
 const Sa={id:'archive',name:'The Sunken Archive',ch:'Misty Fen Lake',theme:'archive',lv:[19,20],req:18,ww:1700,start:70,
  seg:[[0,1700,250],[460,140,212,'plank'],[980,140,212,'plank']],
  mobs:[['lakeserpent',-2,400],['reefstrider',0,560],['lakeserpent',-2,860],['reefstrider',0,1040],['lakeserpent',-2,1200],['spiritmanta',-2,1520]],
  portals:[{x:22,to:SII,tx:1960}],npcs:['verity'],labels:[[300,'The Sunken Archive',110],[1500,'The Reading Room',90]],
  props:[['archivearch',220],['shelves',420],['shelves',700],['archivearch',900],['shelves',1160],['shelves',1300],['archivearch',1520]],trees:[]};
 const NN={fenwater:[['fish',1200],['fish',1460]],reedshore:[['kelp',740],['pearl',1500],['driftwood',1100],['fish',760]],glasswater:[['coral',460],['pearl',700],['coral',960],['tidecrystal',1200],['coral',1380]],
   serpent:[['driftwood',300],['pearl',620],['tidecrystal',1000],['coral',1400],['kelp',1600]],archive:[['tidecrystal',640],['pearl',1100]]};
 for(const z of[Fp,Rs,Gw,Si,Sa]){prepZone(z);z.nodes=NN[z.id].map(([r,x])=>node(r,x));z.stations=[];ZONES.push(z)}
 Fp.stations=[{x:640+EDGE,k:'forge',n:'Shipwright’s Forge'},{x:460+EDGE,k:'cook',n:'Harbour Galley'}];Rs.stations=[{x:280+EDGE,k:'alchemy',n:'Reedshore Drying Racks'}];
 const F=ZONES[FLI];F.portals.push({x:760+EDGE,to:FPI,tx:70+EDGE});(F.labels=F.labels||[]).push([760+EDGE,'Fenwater Port',78])}
Object.assign(MAPXY,{fenwater:[58,82],reedshore:[64,74],glasswater:[66,88],serpent:[74,80],archive:[82,74]});WAYS.fenwater=200;
/* people */
Object.assign(NPCS,{
  quill:{name:'Harbourmaster Quill',title:'Fenwater Port',x:260+EDGE,cls:'traveler',look:{sex:1,build:1,face:2,hair:4,hairC:3,beard:0,skin:2,eye:1,outfit:2},eq:{head:'tv_start',chest:'tv_start'},
    lines:['Trade, travel and new horizons. Pay your berth first.','Many currents, one world. Mostly one fee.','The ferries run to Reedshore, Glasswater and the Serpent Islands. Pick a dock.']},
  bosk:{name:'Shipwright Bosk',title:'Fenwater Port',x:700+EDGE,cls:'gatherer',look:{sex:0,build:2,face:4,hair:0,hairC:6,beard:4,skin:3,eye:0,outfit:3},eq:{head:'ga_start',chest:'ga_start'},
    lines:['A boat is just a box that disagrees with the water.','Driftwood for the hull, kelp for the rope, pitch for the prayers.','I have built fishing skiffs and trader cogs. One day, a caravel.']},
  nessa:{name:'Nessa of Reedshore',title:'Reedshore Village',x:280+EDGE,cls:'ashbow',look:{sex:1,build:1,face:1,hair:2,hairC:5,beard:0,skin:4,eye:2,outfit:1},eq:{head:'a_start',chest:'a_start'},
    lines:['A quiet home on the water. Usually quiet.','The otters steal the nets, the striders steal the catch. We steal it back.','The lake gives, the lake takes, but it always leads somewhere.']},
  aldo:{name:'Keeper Aldo',title:'Lighthouse Spire',x:1640+EDGE,cls:'guard',look:{sex:0,build:1,face:5,hair:1,hairC:7,beard:5,skin:1,eye:0,outfit:2},eq:{head:'a_start',chest:'gd_start'},
    lines:['A beacon for all. Even the ones who do not deserve it.','Forty years I have kept this light. The serpents have kept me company.','The lake remembers every voyage.']},
  verity:{name:'Archivist Verity',title:'The Sunken Archive',x:260+EDGE,cls:'necro',look:{sex:1,build:0,face:0,hair:6,hairC:0,beard:0,skin:0,eye:1,outfit:4},eq:{head:'wisp',chest:'n_start'},
    lines:['Knowledge beneath the waves. The ink runs, but the words stay.','I drowned with my books. I saw no reason to leave them.','Read gently. The pages are older than the lake.']}});
Object.assign(BARKS,{quill:['Berths open!','Ferry leaving!','Mind the ropes.'],bosk:['Caulk it!','More pitch.','She floats!'],nessa:['Nets out!','Otters again.','Tide’s low.'],aldo:['Light’s lit.','Serpents.','Storm coming.'],verity:['Shh.','Read gently.','The ink runs.']});
Object.assign(LORE,{
  saA:{z:'archive',x:560,k:'stone',t:'Waterlogged Folio: The Founding',txt:'“Before the lake there was a valley, and before the valley a library. The water came slowly. We had time to save the books. We chose to stay with them.”'},
  saB:{z:'archive',x:1060,k:'stone',t:'Waterlogged Folio: The Veinways',txt:'“The Veinways ran beneath the old valley, and the Archive kept their maps. When MossGate fell the maps went dark too. Someone wanted them dark.”'},
  saC:{z:'archive',x:1380,k:'stone',t:'Waterlogged Folio: The Manta',txt:'“The great manta came to the Reading Room the year the water rose. It eats nothing but words. It has been eating ours ever since.”'},
  siA:{z:'serpent',x:1180,k:'note',t:'Ferryman’s Warning',txt:'“Serpent Islands. Serpents: yes. Islands: yes. Ferry: at your own risk. Stormtide drake seen over the spire, twice this month.”'}});
Object.assign(QUESTS,{
  fp1:{title:'Fresh off the Boat',giver:'quill',lv:15,
    offer:'New faces get the same advice from me: take the Reedshore ferry, meet Nessa, learn how the lake actually works. Then come back and tell me what you think of my port.',
    desc:'Take the ferry to Reedshore and speak with Nessa.',goal:{t:'talk',npc:'nessa'},where:'Reedshore Village, by ferry from Fenwater Port',
    done:'Quill sent you? She sends everyone. Sit down, then; the nets need mending anyway.',reward:{exp:60,sh:20}},
  fp2:{title:'Pearls for the Exchange',giver:'quill',lv:17,
    offer:'Lake pearls are the only currency nobody argues about. The Reef has them, and the Serpent Islands, if you are brave. Bring me three.',
    desc:'Gather 3 Lake Pearls.',goal:{t:'gather',res:'pearl',n:3},where:'Glasswater Reef, Reedshore, the Serpent Islands',prog:'Shell beds in the shallows.',
    done:'Lovely lustre. That is a month of berths for someone, and a fair cut for you.',reward:{exp:160,sh:50}},
  fp3:{title:'Hull Timber',giver:'bosk',lv:16,
    offer:'I am building a trader cog and I am four planks short. Driftwood seasons itself on this lake; bring me four good pieces.',
    desc:'Gather 4 Driftwood.',goal:{t:'gather',res:'driftwood',n:4},where:'Reedshore and the Serpent Islands, also Misty Fen Lake',prog:'Pale, salt-dried timber on the shores.',
    done:'Look at that grain. She’ll float for fifty years. The yard is yours to use.',reward:{exp:130,sh:35}},
  fp4:{title:'Kelp Rope',giver:'bosk',pre:'fp3',lv:16,
    offer:'Planks need rope, and hemp rots out here. Kelp fiber doesn’t. Four bundles, please.',
    desc:'Gather 4 Kelp Fiber.',goal:{t:'gather',res:'kelp',n:4},where:'Reedshore, the Serpent Islands, the Overgrown Shrine',prog:'Long green strands in the shallows.',
    done:'Twist, twist, there. Rope that likes the water. The cog launches next week; you’re invited.',reward:{exp:140,sh:35}},
  rs1:{title:'Otters in the Nets',giver:'nessa',pre:'fp1',lv:16,
    offer:'The otters are not bad creatures, just clever ones. They tear the nets to get at the catch. Bring back four torn nets they’ve dragged off, and I’ll mend them.',
    desc:'Recover 4 Torn Nets from River Otters.',goal:{t:'collect',mob:'riverotter',item:'Torn Net',n:4,p:.6},where:'Reedshore Village',prog:'Otters play along the banks.',
    done:'Mended by nightfall. And you didn’t hurt more of them than you had to, I hope. They were here first.',reward:{exp:150,sh:30}},
  rs2:{title:'Strider Season',giver:'nessa',lv:17,
    offer:'Reef striders come up the flats every year and every year they get bolder. Six of them have taken the net flats. Push them back to the reef.',
    desc:'Drive off 6 Reef Striders.',goal:{t:'kill',mob:'reefstrider',n:6,lab:'Reef Striders driven off'},where:'Reedshore and Glasswater Reef',prog:'They scuttle along the flats.',
    done:'The flats are ours again. Thank you.',reward:{exp:200,sh:40}},
  rs3:{title:'The Shellback',giver:'nessa',pre:'rs2',lv:18,
    offer:'The striders only grew bold because the Shellback drove them out of the reef. A crab the size of a boat, with a pearl in its shell as big as your fist. End it, and the reef settles.',
    desc:'Defeat the Shellback Crab at Shellback Shoal.',goal:{t:'kill',mob:'shellcrab',n:1,lab:'Shellback defeated'},where:'Shellback Shoal, east Glasswater Reef',prog:'At the far end of the reef.',
    done:'The reef is quiet. The striders will go home. And that pearl… well, it’s yours.',reward:{exp:480,sh:80}},
  ls1:{title:'Serpents in the Lane',giver:'aldo',lv:18,
    offer:'The ferry lane runs right past my spire, and the lake serpents have started rising at the boats. Six of them, at least. Thin them so the ferry can run.',
    desc:'Drive off 6 Lake Serpents.',goal:{t:'kill',mob:'lakeserpent',n:6,lab:'Lake Serpents driven off'},where:'Serpent Islands and Glasswater Reef',prog:'They rise above the water.',
    done:'Clear water. The ferry will be back by morning.',reward:{exp:220,sh:45}},
  ls2:{title:'The Wavecrest Stag',giver:'aldo',lv:18,
    offer:'There is a stag on these islands made of seafoam and moonlight. Wavecrest, we call it. I have seen it three times in forty years. Find it, watch it, and tell me it is still well. Do not hunt it.',
    desc:'Find the Wavecrest Stag and watch it without harming it.',goal:{t:'event',id:'wavewatch',n:1,lab:'Wavecrest Stag observed'},where:'The middle island, Serpent Islands',prog:'It grazes on the middle island.',
    done:'Still well. Good. It sheds its tines in spring; if you are ever lucky, you might find one. That is the only way to take anything from it.',reward:{exp:240,sh:40,sp:1}},
  ls3:{title:'Stormtide',giver:'aldo',pre:'ls1',lv:19,
    offer:'The Stormtide drake roosts on my spire when the weather turns. It calls lightning down on the boats, and last week on me. Drive it from the spire for good.',
    desc:'Defeat the Stormtide Drake over Lighthouse Spire.',goal:{t:'kill',mob:'stormdrake',n:1,lab:'Stormtide Drake defeated'},where:'Lighthouse Spire, east Serpent Islands',prog:'It circles the spire.',
    done:'Calm skies. The light burns clear. Forty years, and that is the first storm anyone has ever ended for me.',reward:{exp:640,sh:100}},
  sa1:{title:'Waterlogged Pages',giver:'verity',lv:19,
    offer:'Three folios still hold their words. Read them for me, aloud if you can. I have not heard them in a very long time.',
    desc:'Read the three waterlogged folios in the Archive.',goal:{t:'event',id:'saread',n:3,lab:'Folios read'},where:'The Sunken Archive',prog:'Stone lecterns along the halls.',
    done:'Someone wanted the maps dark. Yes. I remember now. Thank you. Take this; the Archive owes you a lesson.',reward:{exp:220,sh:40,sp:1}},
  sa2:{title:'The Spirit Manta',giver:'verity',pre:'sa1',lv:20,
    offer:'The manta in the Reading Room eats words. It has nearly finished ours. I cannot fight it; I am mostly ink now. You can.',
    desc:'Defeat the Spirit Manta in the Reading Room.',goal:{t:'kill',mob:'spiritmanta',n:1,lab:'Spirit Manta defeated'},where:'The Reading Room, east Sunken Archive',prog:'At the far end of the Archive.',
    done:'The words are coming back. I can feel them. Go on to Marrowbog, if you must, but come back and read to me sometimes.',reward:{exp:900,sh:130}}});
const SAR=['saA','saB','saC'];
const _olf=openLore;openLore=function(id){const r=_olf(id);if(SAR.includes(id)){pl.lore=pl.lore||{};pl.lore[id]=pl.lore[id]||1;const st=qSt('sa1');if(st&&st.s==='a'){st.n=SAR.filter(k=>pl.lore[k]).length;qProgress('sa1','Folio')}}return r};
/* watching the Wavecrest Stag, without a fight */
function waveNear(){if(Z.id!=='serpent')return null;const st=qSt('ls2');if(!st||st.s!=='a'||st.n>=1)return null;const m=S.mobs.find(m=>m.t==='wavestag'&&!m.dead);if(m&&Math.abs(m.x-pl.x)<60&&!m.aggro)return{k:'wave',m};return null}
const _cnw=crNear;crNear=function(){return waveNear()||_cnw()};
const _cuw=crUse;crUse=function(n){if(n&&n.k==='wave'){qEvent('wavewatch');banner('The Wavecrest Stag','It lifts its head, looks at you, and goes back to grazing');[523,659,880].forEach((f,i)=>setTimeout(()=>tone(f,.3,'sine',.04),i*160));return}return _cuw(n)};
const _clw=crLabel;crLabel=function(n){if(n&&n.k==='wave')return'Watch quietly · Wavecrest Stag';return _clw(n)};
