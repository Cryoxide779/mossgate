/* ---------- player housing: Hearthrow, CrestHollow's rebuilt residential quarter (Bible ch.18: housing types, interior functions, customization) ---------- */
THEMES.home={...THEMES.town,fog:'rgba(0,0,0,0)',fog2:'rgba(0,0,0,0)',rayA:0,canopy:'none',amb:'mote',noFern:1,vig:'10,6,2'};
const HOME_TIERS=[{n:'Lodging Room',ww:520,slots:4,win:1},{n:'Cottage',ww:760,slots:7,win:2},{n:'Townhouse',ww:1000,slots:10,win:3}];
const LOTS=[300,520,740,960,1180];
{const z={id:'hearth',name:'Hearthrow',ch:'Ashveil Reach',safe:1,theme:'town',lv:[1,1],req:1,ww:1400,start:70,
  seg:[[0,1400,250]],mobs:[],portals:[{x:22,to:zIdx('town'),tx:1270}],
  labels:[[150,'Housing Office',62]],npcs:['fenn'],
  props:[['palisade',0,1],['banner',100],['board',225],['lantern',410],['crates',440],['lantern',630],['fire',850],['lantern',1070],['well',1290],['palisade',1360,1]],
  trees:[[1310,1380,58,null]]};prepZone(z);z.nodes=[];z.stations=[];ZONES.push(z)}
WX.hearth=WX.town;MAPXY.hearth=[15,68];
const HR=zIdx('hearth'),HOMEI=ZONES.length;
{const z={id:'home',name:'Home',ch:'Hearthrow',theme:'home',safe:1,interior:1,lv:[1,1],req:1,ww:520,start:60,seg:[[0,520,250]],mobs:[],portals:[],props:[],trees:[]};prepZone(z);z.nodes=[];z.stations=[];ZONES.push(z)}
{const t=ZONES[zIdx('town')];t.portals.push({x:1270+EDGE,to:HR,tx:70+EDGE})}
const HM=()=>pl.home||null;
/* furniture catalogue */
const FURN={
  bed:{n:'Bed',d:'Rest to recover fully and wake Well Rested (+10% EXP for 30 minutes). Your companion gains trust too.',price:120,act:'Rest'},
  chest:{n:'Storage Chest',d:'Keeps up to 30 items and any amount of materials, shared between visits.',price:100,act:'Storage'},
  hearth:{n:'Hearth',d:'A cooking fire. Works like any campfire.',price:160,act:'Cook'},
  bench:{n:'Workbench',d:'Smithing, woodworking and leatherwork at home.',price:220,act:'Craft'},
  still:{n:'Alchemy Still',d:'Brew tonics and draughts at home.',price:180,act:'Brew'},
  planter:{n:'Herb Planter',d:'Grows an herb every 8 minutes, up to 6, even while you are away.',price:90,act:'Harvest'},
  shrooms:{n:'Mushroom Bed',d:'Grows a dark mushroom every 10 minutes, up to 5, even while you are away.',price:110,act:'Harvest'},
  shelf:{n:'Bookshelf',d:'Read for a moment of study: a little Investigation practice once an hour.',price:80,act:'Study'},
  hstone:{n:'Hearthstone',d:'Lets any attuned waystone carry you home.',price:300},
  petbed:{n:'Companion Bed',d:'Your active companion sleeps here. When you rest, it gains extra trust.',price:90},
  trophy:{n:'Trophy Mount',d:'Keeps count of every quest you have finished.',price:70},
  lamp:{n:'Standing Lamp',d:'Warm light. Purely for comfort.',price:40},
  rug:{n:'Woven Rug',d:'A rug in your colors.',price:30},
  plant:{n:'Potted Fern',d:'A green thing that does not try to eat you.',price:25}};
RECIPES.push(
  {id:'f_bed',d:'wood',r:1,n:'Bed (furniture)',use:'furn',furn:'bed',need:{timber:6,hide:2}},
  {id:'f_chest',d:'wood',r:1,n:'Storage Chest (furniture)',use:'furn',furn:'chest',need:{timber:5,ore:1}},
  {id:'f_planter',d:'wood',r:1,n:'Herb Planter (furniture)',use:'furn',furn:'planter',need:{timber:3,herb:2}},
  {id:'f_shelf',d:'wood',r:2,n:'Bookshelf (furniture)',use:'furn',furn:'shelf',need:{timber:5,salvage:1}},
  {id:'f_bench',d:'wood',r:2,n:'Workbench (furniture)',use:'furn',furn:'bench',need:{timber:6,ore:3}},
  {id:'f_still',d:'wood',r:2,n:'Alchemy Still (furniture)',use:'furn',furn:'still',need:{timber:3,ore:1,herb:2,mush:1}},
  {id:'f_shrooms',d:'wood',r:2,n:'Mushroom Bed (furniture)',use:'furn',furn:'shrooms',need:{timber:3,mush:3}},
  {id:'f_hearth',d:'smith',r:1,n:'Hearth (furniture)',use:'furn',furn:'hearth',need:{ore:4,timber:2}},
  {id:'f_lamp',d:'smith',r:1,n:'Standing Lamp (furniture)',use:'furn',furn:'lamp',need:{ore:2,shard:1}},
  {id:'f_hstone',d:'smith',r:3,n:'Hearthstone (furniture)',use:'furn',furn:'hstone',need:{shard:4,ore:2}},
  {id:'f_trophy',d:'wood',r:1,n:'Trophy Mount (furniture)',use:'furn',furn:'trophy',need:{timber:4,hide:1}},
  {id:'f_rug',d:'leather',r:1,n:'Woven Rug (furniture)',use:'furn',furn:'rug',need:{hide:3}},
  {id:'f_petbed',d:'leather',r:1,n:'Companion Bed (furniture)',use:'furn',furn:'petbed',need:{hide:3,herb:1}});
USE_D.furn='Furniture for your home in Hearthrow. Place it with the house ledger by your door.';
BUFF_N.rested='Well Rested';
function addFurn(id,n=1){const H=HM();if(!H)return false;H.inv[id]=(H.inv[id]||0)+n;return true}
/* people and quests */
NPCS.fenn={name:'Registrar Fenn',title:'Hearthrow Housing Office',x:150+EDGE,cls:'weaver',look:{sex:0,build:1,face:1,hair:1,hairC:4,beard:2,skin:2,eye:0,outfit:3},eq:{chest:'w_start'},
  lines:['Every lot in Hearthrow burned in the Gatefall. Every one we rebuild is a family that stays.','Deeds, permits, furniture, complaints. Mostly complaints.','Build what you need, not what you can afford. A house is a promise to come back.']};
BARKS.fenn=['Deeds! Deeds here.','Mind the scaffolds.','Another roof up today.'];
Object.assign(QUESTS,{
  hm1:{title:'A Roof of Your Own',giver:'fenn',pre:'m2',lv:3,
    offer:'Hearthrow was the old residential quarter. We are rebuilding it lot by lot, and a deed to a lodging room costs 150 shards. It is small. It is yours. It comes with a bed and a chest, and nobody can take it from you.',
    desc:'Buy a deed to a lodging room in Hearthrow.',goal:{t:'pay',n:150},where:'Hearthrow, east of the Workyard in CrestHollow',
    prog:'Bring 150 shards to Registrar Fenn.',done:'Signed, sealed, yours. Your door is the first lot on the street. Walk up and go in. The ledger by the door lets you arrange your furniture.',reward:{exp:300,fl:{deed:1}}},
  hm2:{title:'Raise the Walls',giver:'fenn',pre:'hm1',lv:5,
    offer:'Want more room? I can have your lodging rebuilt into a proper cottage: seven spaces for furniture, two windows, a real kitchen corner. The crew needs twelve timber, which you gather. The Charter pays their wages, because every cottage is another family that stays.',
    desc:'Gather 12 Timber so the crew can rebuild your lodging as a cottage.',goal:{t:'gather',res:'timber',n:12},where:'Whisper Woods, Fallen Oak Grove, the Sawmill',
    prog:'Twelve timber for the crew.',done:'Good wood. The crew starts tonight. By the time you get home it will be a cottage.',reward:{exp:600,fl:{tier1:1}}},
  hm3:{title:'A House in Hearthrow',giver:'fenn',pre:'hm2',lv:9,
    offer:'A townhouse is the best Hearthrow offers: ten spaces, three windows, a hall big enough for guests. It costs 1,200 shards and the respect of your neighbors. I can only help with the first part.',
    desc:'Pay 1,200 shards to rebuild your cottage as a townhouse.',goal:{t:'pay',n:1200},where:'Hearthrow',
    prog:'1,200 shards to Registrar Fenn.',done:'A townhouse. Your name goes on the street register in brass. Welcome home, properly.',reward:{exp:1200,fl:{tier2:1}}}});
const _qf=questFlag;questFlag=function(fl){_qf(fl);if(fl.deed){pl.home={lot:0,tier:0,lay:['bed',null,'chest',null],inv:{},stash:[],smat:{},grow:{},open:false};banner('Home','Your lodging room in Hearthrow is ready');save()}
  if(fl.tier1&&HM()){pl.home.tier=Math.max(1,pl.home.tier);fitLay();banner('Cottage','Your home now has seven furniture spaces');save()}
  if(fl.tier2&&HM()){pl.home.tier=2;fitLay();banner('Townhouse','Your home now has ten furniture spaces');save()}};
function fitLay(){const H=HM(),n=HOME_TIERS[H.tier].slots;while(H.lay.length<n)H.lay.push(null);if(H.lay.length>n)H.lay.length=n}
/* ---------- Hearthrow street ---------- */
const HOUSE_SPR={};
function houseSpr(v){if(HOUSE_SPR[v])return HOUSE_SPR[v];const c=document.createElement('canvas');c.width=200;c.height=170;const x=c.getContext('2d');const keep=Z.glows;Z.glows=[];
  if(v<0){const P=px3(x),S=TH.rock,W=TH.wood;for(let y=0;y<10;y++)for(let k=-50;k<=50;k++)if(y<4||Math.abs(k)>44||hash(k,y,3)>.5)P(100+k,169-y,pick(S,.5-k/200+(hash(k,y,2)-.5)*.3,k,y));
    for(const k of[-40,40])for(let y=10;y<70;y++){P(100+k,169-y,pick(W,.6,k,y));P(101+k,169-y,pick(W,.3,k,y))}for(let k=-42;k<=42;k++){P(100+k,169-70,W[4]);P(100+k,169-40,W[3])}
    for(let i=0;i<20;i++){const k=-44+Math.floor(hash(i,1,7)*88),h=2+Math.floor(hash(i,2,7)*6);for(let y=0;y<h;y++)P(100+k,169-10-y,pick(S,.4,k,y))}}
  else PROPS.house(x,100,169,v);Z.glows=keep;return HOUSE_SPR[v]=c}
function drawHearth(cx,cy){if(Z.id!=='hearth')return;const H=HM();LOTS.forEach((lx,i)=>{const X=lx+EDGE,x=ri(X-cx);if(x<-110||x>W+110)return;const y=ri(topAt(X)-cy),mine=H&&H.lot===i;
    g.drawImage(houseSpr(mine?H.tier:-1),x-100,y-169);if(mine){ptext(String(pl.ch.name).toUpperCase()+'’S '+HOME_TIERS[H.tier].n.toUpperCase(),x,y-120,'#ffd27a');if(S.nearCr&&S.nearCr.k==='door')ptext('▲ ENTER',x,y-60+Math.sin(S.t*4),'#f2e6c8')}
    else ptext(H?'LOT '+(i+1)+' · REBUILDING':'LOT '+(i+1)+' · FOR SALE',x,y-84,'#8d8aa3')})}
/* ---------- interior ---------- */
function slotX(i,n,ww){return 130+i*((ww-200)/Math.max(1,n-1))}
function buildInterior(){const T=HOME_TIERS[(Z.host?Z.host.tier:(HM()||{tier:0}).tier)|0],L=layer(WW,WH),P=(x,y,c)=>sp(L,x,y,c),gy=250,top=120;
  const PL=R(['#2a1810','#3e2416','#56331e','#704428','#8a5634','#a46a42','#be8252']),BM=R(['#140a06','#24140c','#341e12','#4a2c1a']),ST=RAMP.rock;
  for(let y=0;y<top-14;y++)for(let x=0;x<WW;x++)P(x,y,pick(BM,.3+(fbm(x*.05,y*.08,3)-.5)*.3,x,y));
  for(let y=top-14;y<gy;y++)for(let x=0;x<WW;x++){const board=Math.floor((y-top)/9),seam=(y-top)%9===8,joint=(x+board*37)%64===0;P(x,y,seam||joint?PL[1]:pick(PL,.55+(fbm(x*.9,y*.12,board)-.5)*.35+((y-top)%9===0?.12:0),x,y))}
  for(let y=gy-26;y<gy;y++)for(let x=0;x<WW;x++)P(x,y,y===gy-26?PL[6]:(x%22===0?PL[1]:pick(PL,.35+(y-gy+26)*.006,x,y)));
  for(let x=0;x<WW;x++){for(let y=top-18;y<top-10;y++)P(x,y,pick(BM,.75-(y-top+18)*.05,x,y));P(x,top-10,BM[0])}
  for(let bx=60;bx<WW;bx+=180)for(let y=top-18;y<gy;y++)for(let k=0;k<7;k++)P(bx+k,y,pick(BM,.7-k/10,bx+k,y));
  const wins=T.win;for(let i=0;i<wins;i++){const wx=Math.round((i+1)*WW/(wins+1))-14,wy=top+20;for(let y=0;y<36;y++)for(let x=0;x<28;x++){const fr=x<3||x>24||y<3||y>32||x===13||x===14||y===17;
      P(wx+x,wy+y,fr?PL[2]:pick(R(['#3a5a6a','#5a8aa0','#8ec4d8','#c8ecf8']),.7-y/50+(x<13?.1:0),x,y))}for(let x=-2;x<30;x++){P(wx+x,wy+37,PL[5]);P(wx+x,wy+38,PL[2])}}
  for(let y=gy;y<WH;y++)for(let x=0;x<WW;x++){const plank=Math.floor(x/26),seam=x%26===0||(y-gy)%40===39;P(x,y,seam?PL[0]:pick(PL,.6-(y-gy)*.004+(hash(plank,Math.floor((y-gy)/40),5)-.5)*.2,x,y))}
  for(let x=0;x<WW;x++){P(x,gy,PL[6]);P(x,gy+1,PL[5])}
  /* door */const dx=EDGE+22;for(let y=gy-46;y<gy;y++)for(let x=-12;x<=12;x++){const fr=Math.abs(x)>=11||y===gy-46;P(dx+x,y,fr?BM[1]:pick(PL,.5+(x%6===0?-.2:0),x,y))}P(dx+7,gy-22,[226,190,90]);
  for(let x=0;x<EDGE;x++)for(let y=top-18;y<WH;y++)P(x,y,BM[0]);for(let x=WW-EDGE;x<WW;x++)for(let y=top-18;y<WH;y++)P(x,y,BM[0]);
  commit(L);return L.c}
const _uz=useZone;useZone=function(i){const z=ZONES[i];if(!z.interior)return _uz(i);Z=z;TH={...RAMP,...THEMES[Z.theme].ramps};SEG=Z.SEG;WW=Z.ww;
  if(!ZCACHE[i]){const blank=document.createElement('canvas');blank.width=2;blank.height=2;ZCACHE[i]={far:blank,mid:blank,tree:blank,ter:buildInterior(),can:blank,fg:blank,glows:[]}}return ZCACHE[i]};
function homeLayout(){return Z.host?Z.host.lay:(HM()||{lay:[]}).lay}
function enterHome(host){const tier=host?host.tier|0:HM().tier,T=HOME_TIERS[tier];const z={id:'home',name:host?String(host.nm||'A friend').slice(0,12)+'’s Home':'Your '+T.n,ch:'Hearthrow',theme:'home',safe:1,interior:1,lv:[1,1],req:1,ww:T.ww,start:50,seg:[[0,T.ww,250]],mobs:[],portals:[],props:[],trees:[]};
  prepZone(z);z.nodes=[];z.stations=[];z.folk=[];z.host=host||null;z.exit={to:HR,tx:(host?LOTS[0]:LOTS[HM().lot])+30+EDGE};ZONES[HOMEI]=z;delete ZCACHE[HOMEI];const f=$('fade');f.style.opacity=1;S.paused=true;sfx.portal();
  setTimeout(()=>{enterZone(HOMEI,z.x0+40);S.paused=false;f.style.opacity=0;growTick(true)},300)}
/* furniture sprites */
const SP0=sp;
const FSPR={};
function furnArt(id){if(FSPR[id])return FSPR[id];const sp=(L,x,y,c)=>SP0(L,x,y,typeof c==='string'?hex(c):c);const PL=R(['#2a1810','#3e2416','#56331e','#704428','#8a5634','#a46a42','#be8252']),IR=IRONC;
  const box=(L,x0,y0,w,h,ramp,t0=.6)=>{for(let y=y0;y<y0+h;y++)for(let x=x0;x<x0+w;x++){const e=x===x0||x===x0+w-1||y===y0||y===y0+h-1;sp(L,x,y,e?ramp[1]:pick(ramp,t0-(x-x0)/(w*3)+(y===y0+1?.15:0)+(fbm(x*.6,y*.3,7)-.5)*.2,x,y))}};
  const A=pl.ch?LOOK.outfit[pl.ch.look.outfit|0]:['#3f6e4a','#2a4a32','#6a9a5a','#e6d6b0','#b8914f'];
  const S0={
    bed:[44,24,L=>{box(L,0,10,44,12,PL);box(L,2,4,40,8,R(['#4a3a2a','#8a7a5a','#d9c9a0','#efe2c0','#fff8e8']),.7);for(let x=3;x<20;x++)for(let y=5;y<11;y++)sp(L,x,y,pick(R([A[1],A[0],A[2]]),.5-(y-5)*.06+(x<5?.2:0),x,y));
      box(L,30,5,11,6,R(['#a89a80','#d9c9a0','#f2e6c8','#fff8e8']),.8);for(const x of[0,41])for(let y=0;y<24;y++){sp(L,x,y,PL[2]);sp(L,x+2,y,PL[4]);sp(L,x+1,y,PL[3])}}],
    chest:[24,18,L=>{box(L,0,4,24,14,PL);for(let x=1;x<23;x++){sp(L,x,4,PL[6]);sp(L,x,3,PL[5]);sp(L,x,2,PL[4])}for(const x of[3,20])for(let y=2;y<18;y++)sp(L,x,y,IR[1]);for(let x=10;x<14;x++)for(let y=7;y<11;y++)sp(L,x,y,y===7?IR[4]:IR[2]);sp(L,11,9,'#000')}],
    hearth:[34,38,L=>{for(let y=0;y<38;y++)for(let x=0;x<34;x++){const inner=x>7&&x<26&&y>14;if(inner)continue;const row=y/5|0;sp(L,x,y,(x+(row%2)*4)%9===0||y%5===4?RAMP.rock[1]:pick(RAMP.rock,.6-x/90+(hash(x,y,3)-.5)*.2,x,y))}
      for(let x=8;x<26;x++)for(let y=15;y<38;y++)sp(L,x,y,y>33?'#2a1810':'#120a06');for(let x=0;x<34;x++){sp(L,x,0,RAMP.rock[6]);sp(L,x,1,RAMP.rock[5])}for(const[x,y]of[[12,34],[16,33],[20,34],[14,35],[18,35]]){sp(L,x,y,PL[4]);sp(L,x+1,y,PL[2])}}],
    bench:[40,26,L=>{box(L,0,6,40,4,PL,.75);for(const x of[2,35])for(let y=10;y<26;y++){sp(L,x,y,PL[3]);sp(L,x+1,y,PL[2]);sp(L,x+2,y,PL[1])}for(let x=4;x<36;x++)sp(L,x,18,PL[2]);
      for(let i=0;i<8;i++)sp(L,6+i,5,IR[3]);sp(L,6,4,IR[2]);for(let i=0;i<5;i++)sp(L,22,5-i,PL[5]);for(let x=20;x<25;x++)sp(L,x,0,IR[2]);box(L,28,1,8,5,IR,.6)}],
    still:[28,36,L=>{for(let y=0;y<36;y+=1){for(const x of[1,26]){sp(L,x,y,PL[3]);sp(L,x+1,y,PL[1])}}for(const y of[10,22,34])for(let x=1;x<28;x++)sp(L,x,y,PL[5]);
      for(const[x,y,c]of[[5,6,'#9bd04c'],[11,5,'#c9a8ff'],[18,6,'#ffd27a'],[6,18,'#d4483a'],[13,17,'#6ec6e2'],[20,18,'#86b47f'],[9,30,'#7a4aa0'],[17,30,'#c8a050']]){for(let k=0;k<4;k++)for(let j=0;j<4;j++)sp(L,x+k,y+j,j===0?'#e6f0f2':k===0?'#ffffff':c);sp(L,x+1,y-1,PL[4]);sp(L,x+2,y-1,PL[4])}}],
    planter:[30,20,L=>{box(L,0,10,30,10,PL);for(let x=1;x<29;x++)sp(L,x,10,'#3a2a1a')}],
    shrooms:[30,16,L=>{box(L,0,8,30,8,PL);for(let x=1;x<29;x++)sp(L,x,8,'#2a1e14')}],
    shelf:[30,44,L=>{box(L,0,0,30,44,PL,.45);for(const y of[1,15,29])for(let x=2;x<28;x++){for(let j=0;j<12;j++){const bk=Math.floor((x+y)/3)%6;sp(L,x,y+j,j===11?PL[5]:['#7a2a2a','#2a4a6a','#5a6a2a','#6a4a2a','#4a2a5a','#8a6a2a'][bk])}}for(const y of[13,27,41])for(let x=1;x<29;x++)sp(L,x,y,PL[5])}],
    hstone:[18,30,L=>{for(let y=4;y<26;y++){const w=y<8?Math.max(2,Math.round((y-3)*1.3)):5;for(let k=-w;k<=w;k++)sp(L,9+k,y,pick(RAMP.rock,.65-(k+w)/(2*w+1)*.45,9+k,y))}for(let y=26;y<30;y++)for(let x=1;x<17;x++)sp(L,x,y,pick(PL,.6,x,y));for(const y of[12,18])for(let k=-2;k<=2;k++)sp(L,9+k,y,RUNE[3]);sp(L,9,13,RUNE[4])}],
    petbed:[28,12,L=>{for(let y=0;y<12;y++)for(let x=0;x<28;x++){const nx=(x-13.5)/14,ny=(y-8)/6;if(nx*nx+ny*ny>1)continue;const inner=nx*nx/.6+ (ny+.3)*(ny+.3)/.3<1;sp(L,x,y,inner?pick(R([A[1],A[0],A[2]]),.5,x,y):pick(R(['#5a3a1a','#8a6a3a','#b8945a','#d8b878']),.6-ny*.3,x,y))}}],
    trophy:[26,26,L=>{for(let y=10;y<26;y++)for(let x=6;x<20;x++)sp(L,x,y,pick(PL,.6-(x-6)/30,x,y));cAntler(L,11,12,-1);cAntler(L,15,12,1)}],
    lamp:[12,40,L=>{for(let y=12;y<38;y++){sp(L,6,y,IR[2]);sp(L,5,y,IR[1])}for(let x=2;x<10;x++){sp(L,x,38,IR[1]);sp(L,x,39,IR[0])}for(let y=0;y<12;y++){const w=Math.round(2+y*.35);for(let k=-w;k<=w;k++)sp(L,6+k,y,y>9?IR[2]:pick(R(['#b8742a','#e0a040','#ffd27a','#fff4c2']),.9-y/16,6+k,y))}}],
    rug:[48,6,L=>{for(let y=0;y<6;y++)for(let x=0;x<48;x++){const b=x<2||x>45||y===0||y===5,st=(x+y*3)%8<2;sp(L,x,y,b?A[4]||'#b8914f':st?A[2]:A[0])}for(let x=0;x<48;x+=3){sp(L,x,6,A[4]||'#b8914f')}}],
    plant:[16,26,L=>{box(L,3,16,10,10,R(['#4a2a1a','#7a4a2a','#a86a3a','#c88a4a']),.7);for(let i=0;i<9;i++){const a=-1.4+i*.35;for(let j=0;j<12;j++)sp(L,8+Math.round(Math.cos(a)*j*.8),16-Math.round(Math.abs(Math.sin(a))*j*.9+j*.3),pick(RAMP.leaf,.4+j*.04,i,j))}}]};
  const[w,h,fn]=S0[id];return FSPR[id]=nodeLayer(w,h,fn)}
function growTick(silent){const H=HM();if(!H)return;H.grow=H.grow||{};const now=Date.now();H.lay.forEach((f,i)=>{if(f!=='planter'&&f!=='shrooms')return;const g0=H.grow[i]||(H.grow[i]={n:0,t:now}),per=f==='planter'?480000:600000,cap=f==='planter'?6:5;
    const add=Math.floor((now-g0.t)/per);if(add>0){g0.n=Math.min(cap,g0.n+add);g0.t+=add*per;if(g0.n>=cap)g0.t=now}})}
function drawHome(cx,cy){if(Z.id!=='home')return;const lay=homeLayout()||[],n=lay.length,H=HM();
  lay.forEach((f,i)=>{const X=Z.x0+slotX(i,n,Z.ww-2*EDGE),x=ri(X-cx),y=ri(250-cy);if(f){const img=furnArt(f);g.drawImage(img,x-ri(img.width/2),y-img.height+(f==='rug'?2:0));
      if(f==='hearth'){g.save();g.globalCompositeOperation='lighter';glow(x,y-10,26,'255,150,60',.35+Math.sin(S.t*7)*.08);g.restore();for(let k=0;k<5;k++){const fh=4+ri(Math.abs(Math.sin(S.t*9+k))*6);g.fillStyle=k%2?'#ffd27a':'#e05a1c';g.fillRect(x-6+k*3,y-4-fh,2,fh)}}
      if(f==='lamp'){g.save();g.globalCompositeOperation='lighter';glow(x,y-34,30,'255,210,130',.3);g.restore()}
      if(f==='hstone'){g.save();g.globalCompositeOperation='lighter';glow(x,y-16,16,'110,230,240',.25+Math.sin(S.t*2)*.06);g.restore()}
      if((f==='planter'||f==='shrooms')&&!Z.host){const g0=(H.grow||{})[i]||{n:0};for(let k=0;k<g0.n;k++){const px2=x-12+k*5;if(f==='planter'){g.fillStyle='#3b7c2d';g.fillRect(px2,y-14,1,5);g.fillStyle='#82c444';g.fillRect(px2-1,y-15,3,2);g.fillStyle='#d4483a';g.fillRect(px2,y-16,1,1)}else{g.fillStyle='#d9c9b0';g.fillRect(px2,y-12,1,4);g.fillStyle='#7a4aa0';g.fillRect(px2-2,y-14,5,2);g.fillStyle='#c9a8ff';g.fillRect(px2-1,y-15,2,1)}}}
      if(f==='trophy'&&!Z.host)ptext(String(Object.values(pl.q||{}).filter(q=>q&&q.s==='d').length),x,y-4,'#ffd27a')}
    else if(!Z.host&&S.homeEdit){g.fillStyle='rgba(242,230,200,.25)';g.fillRect(x-10,y-1,20,1)}});
  const dx=ri(Z.x0+22-cx),dy=ri(250-cy);if(S.nearCr&&S.nearCr.k==='hdoor')ptext('▲ LEAVE',dx,dy-56+Math.sin(S.t*4),'#f2e6c8');
  if(!Z.host){const lx=ri(Z.x0+56-cx);g.fillStyle='#000';g.fillRect(lx-5,dy-22,11,22);g.fillStyle='#704428';g.fillRect(lx-4,dy-21,9,20);g.fillStyle='#efe2c0';g.fillRect(lx-3,dy-19,7,6);g.fillStyle='#56331e';for(let k=0;k<3;k++)g.fillRect(lx-2,dy-18+k*2,5,1);
    if(S.nearCr&&S.nearCr.k==='ledger')ptext('▲ ARRANGE',lx,dy-32+Math.sin(S.t*4),'#ffd27a')}
  const nf=S.nearCr&&S.nearCr.k==='furn'?S.nearCr:null;if(nf){const X=Z.x0+slotX(nf.i,n,Z.ww-2*EDGE);ptext('▲ '+(FURN[nf.f].act||'').toUpperCase(),ri(X-cx),dy-50+Math.sin(S.t*4),'#f2e6c8')}}
/* interaction */
function homeNear(){if(Z.id==='hearth'){if(NET.cap&&Math.abs(pl.x-(VBX+EDGE))<14)return{k:'vbook'};const H=HM();if(H){const X=LOTS[H.lot]+EDGE;if(Math.abs(pl.x-X)<22)return{k:'door'}}return null}
  if(Z.id!=='home')return null;if(Math.abs(pl.x-(Z.x0+22))<16)return{k:'hdoor'};if(!Z.host&&Math.abs(pl.x-(Z.x0+56))<12)return{k:'ledger'};if(Z.host)return null;
  const lay=homeLayout(),n=lay.length;for(let i=0;i<n;i++){const f=lay[i];if(!f||!FURN[f].act)continue;if(Math.abs(pl.x-(Z.x0+slotX(i,n,Z.ww-2*EDGE)))<18)return{k:'furn',f,i}}return null}
function homeLabel(n){return n.k==='vbook'?'Read · Visiting Book':n.k==='door'?'Enter · Your Home':n.k==='hdoor'?'Leave · Hearthrow':n.k==='ledger'?'Arrange · House Ledger':FURN[n.f].act+' · '+FURN[n.f].n}
function homeUse(n){if(n.k==='door')return enterHome(null);if(n.k==='hdoor')return travel(Z.exit);if(n.k==='vbook')return openVisit();if(n.k==='ledger')return openArrange();const f=n.f,H=HM();
  if(f==='bed'){pl.hp=pl.mhp;pl.mp=pl.mmp;pl.st=pl.mst;pl.buffs=pl.buffs||{};pl.buffs.rested=1800;const b=actBond();if(b)addTrust(b,H.lay.includes('petbed')?4:1);banner('Well Rested','+10% EXP for 30 minutes');[392,494,587].forEach((q,i)=>setTimeout(()=>tone(q,.4,'sine',.04),i*200));save()}
  else if(f==='chest')openStash();else if(f==='hearth')openCraft({k:'cook',n:'Your Hearth'});else if(f==='bench')openCraft({k:'forge',n:'Your Workbench'});else if(f==='still')openCraft({k:'alchemy',n:'Your Still'});
  else if(f==='planter'||f==='shrooms'){growTick();const g0=H.grow[n.i]||{n:0};if(!g0.n){banner('Not yet',f==='planter'?'The herbs are still growing':'The mushrooms are still growing');return}addMat(f==='planter'?'herb':'mush',g0.n,pl.x,pl.y);dGain('herbalism',3*g0.n);g0.n=0;g0.t=Date.now();save()}
  else if(f==='shelf'){const t=pl.flags.study||0;if(Date.now()-t<3600000){banner('You have read enough for now','Come back in an hour');return}pl.flags.study=Date.now();dGain('investigation',40);banner('A quiet hour of study','Investigation practice');save()}}
/* arrange panel */
let ARR=null;
function openArrange(){ARR={sel:0,msg:''};S.homeEdit=1;pauseFor('arrange');renderArrange()}
function closeArrange(){ARR=null;S.homeEdit=0;unpause('arrange')}
function renderArrange(){if(!ARR)return;const H=HM(),T=HOME_TIERS[H.tier],sel=ARR.sel,cur=H.lay[sel];
  $('arrslots').innerHTML=H.lay.map((f,i)=>`<button class="qi${i===sel?' sel':''}" data-as="${i}"><b>Space ${i+1}</b><span>${f?FURN[f].n:'Empty'}</span></button>`).join('');
  const owned=Object.entries(H.inv).filter(([,n])=>n>0);
  $('arrdet').innerHTML=`<div class="dn">${T.n} · space ${sel+1}</div><div class="dm">${cur?FURN[cur].d:'Empty. Place furniture you own, or buy some below.'}</div>
    ${cur?`<div class="crbtns"><button class="btn sm alt" data-aa="take">Pick up ${FURN[cur].n}</button></div>`:''}
    <div class="qh">Your furniture</div>${owned.length?'<div class="crbtns">'+owned.map(([id,n])=>`<button class="btn sm" data-ap="${id}">${FURN[id].n} ×${n}</button>`).join('')+'</div>':'<p class="crp dim">None stored. Craft furniture at a workbench or forge, or buy it here.</p>'}
    <div class="qh">Buy from Fenn’s office · you have ${pl.shards} shards</div><div class="crbtns">${Object.entries(FURN).map(([id,f])=>`<button class="btn sm alt" data-ab="${id}" ${pl.shards<f.price?'disabled':''}>${f.n} · ${f.price}</button>`).join('')}</div>
    ${NET.cap?`<div class="qh">Open house</div><div class="crbtns"><button class="btn sm${H.open?'':' alt'}" data-aa="open">${H.open?'Visitors welcome':'Closed to visitors'}</button></div><p class="crp dim">${H.open?'Other players online can visit while you are home.':'Only you can come in.'}</p>
    `:''}${ARR.msg?`<p class="crp" style="color:var(--moss)">${ARR.msg}</p>`:''}`}
$('arrange').addEventListener('click',e=>{const b=e.target.closest('[data-as],[data-aa],[data-ap],[data-ab],#arrclose');if(!b||!ARR)return;if(b.id==='arrclose')return closeArrange();const H=HM();ARR.msg='';
  if(b.dataset.as)ARR.sel=+b.dataset.as;
  else if(b.dataset.aa==='take'){const f=H.lay[ARR.sel];if(f){H.lay[ARR.sel]=null;addFurn(f);ARR.msg=FURN[f].n+' stored.'}}
  else if(b.dataset.aa==='open'){H.open=!H.open;netLobbyPres()}
  else if(b.dataset.ap){const id=b.dataset.ap;if(H.lay[ARR.sel])addFurn(H.lay[ARR.sel]);H.lay[ARR.sel]=id;H.inv[id]--;ARR.msg=FURN[id].n+' placed.';tone(440,.12,'triangle',.04);growTick()}
  else if(b.dataset.ab){const id=b.dataset.ab;if(pl.shards<FURN[id].price)return;pl.shards-=FURN[id].price;addFurn(id);ARR.msg='Bought '+FURN[id].n+'. Place it in a space.';sfx.pick()}
  save();renderArrange()});
/* storage */
let STA=null;
function openStash(){STA={};pauseFor('stash');renderStash()}
function renderStash(){if(!STA)return;const H=HM();H.stash=H.stash||[];H.smat=H.smat||{};
  const row=(it,src,i)=>`<button class="qi" data-sx="${src}:${i}" ><b style="color:${RAR[it.r].c}">${itemName(it)}</b><span>${SLOT_N[it.slot]||it.slot} · Lv ${it.lv||1}</span></button>`;
  $('stbag').innerHTML=`<div class="qh">Your bag · ${pl.bag.length}/${BAG_MAX}</div>`+(pl.bag.map((it,i)=>row(it,'b',i)).join('')||'<p class="crp dim">Empty.</p>');
  $('stchest').innerHTML=`<div class="qh">Chest · ${H.stash.length}/30</div>`+(H.stash.map((it,i)=>row(it,'c',i)).join('')||'<p class="crp dim">Empty.</p>')+
    `<div class="qh">Materials in the chest</div><div class="mats">${Object.keys(RES).map(k=>`<span style="--c:${RES[k].c}">${RES[k].n} <b>${H.smat[k]|0}</b></span>`).join('')}</div>
    <div class="crbtns"><button class="btn sm" data-sm="in">Store all materials</button><button class="btn sm alt" data-sm="out">Take all materials</button></div>`}
$('stash').addEventListener('click',e=>{const b=e.target.closest('[data-sx],[data-sm],#stclose');if(!b||!STA)return;if(b.id==='stclose'){STA=null;return unpause('stash')}const H=HM();
  if(b.dataset.sx){const[src,i]=b.dataset.sx.split(':');if(src==='b'){if(H.stash.length>=30)return;H.stash.push(pl.bag.splice(+i,1)[0])}else{if(pl.bag.length>=BAG_MAX)return;pl.bag.push(H.stash.splice(+i,1)[0])}}
  else if(b.dataset.sm==='in'){for(const k in pl.mat){H.smat[k]=(H.smat[k]|0)+(pl.mat[k]|0);pl.mat[k]=0}}
  else{for(const k in H.smat){pl.mat[k]=(pl.mat[k]|0)+(H.smat[k]|0);H.smat[k]=0}}
  sfx.pick();save();renderStash()});
/* visiting: open houses advertised in the lobby */
function homeOpenFor(){const H=HM();return Z.id==='home'&&!Z.host&&H&&H.open?{t:H.tier,l:H.lay,nm:pl.ch.name}:null}
function openHouses(){if(!NET.cap)return[];try{return NET.cap.peers().filter(p=>!p.isMe&&p.presence&&p.presence.home).map(p=>({peer:p.peer,nm:String(p.presence.home.nm||p.presence.nm||'Someone').slice(0,12),tier:clamp(p.presence.home.t|0,0,2),lay:(Array.isArray(p.presence.home.l)?p.presence.home.l:[]).slice(0,10).map(f=>FURN[f]?f:null)}))}catch(_){return[]}}
/* hearthstone travel */
function hasHearthstone(){const H=HM();return!!(H&&H.lay.includes('hstone'))}
/* ---------- hooks ---------- */
const _dc=doCraft;doCraft=function(R){if(R.use==='furn'){if(!HM()){banner('No home yet','Buy a deed from Registrar Fenn in Hearthrow first');return}if(!hasMats(R)||!rcpOk(R))return;for(const[k,n]of Object.entries(R.need))pl.mat[k]-=n;addFurn(R.furn);dGain(R.d,12+Object.values(R.need).reduce((a,b)=>a+b,0)*3);S.craftMsg=FURN[R.furn].n+' (sent home)';tone(523,.12,'square',.03);save();return}return _dc(R)};
const _rp=renderMap;renderMap=function(){_rp();if(MAP&&MAP.at&&pl.flags.waynet&&hasHearthstone()&&Z.id!=='home'){const d=$('mapdet');d.insertAdjacentHTML('beforeend',`<button class="btn sm" data-mhome="1" ${pl.shards<6?'disabled':''}>Hearthstone · go home · 6 shards</button>`)}};
$('mapov').addEventListener('click',e=>{if(!e.target.closest('[data-mhome]'))return;if(hasCargo()){MAP.msg='Waystones carry people, not cargo.';return renderMap()}pl.shards-=6;MAP=null;unpause('mapov');enterHome(null)});

const VBX=262;
function homeRoom(){if(Z.host)return'home-'+Z.host.peer;const H=HM();if(!H||!H.open||!NET.cap)return null;try{const me=NET.cap.peers().find(p=>p.isMe);return me?'home-'+me.peer:null}catch(_){return null}}
/* visiting book: lists open houses of players online */
let VIS=null;
function openVisit(){VIS={};pauseFor('visit');renderVisit()}
function renderVisit(){if(!VIS)return;const L=openHouses();$('vislist').innerHTML=L.length?L.map((h,i)=>`<button class="qi" data-vh="${i}"><b>${esc(h.nm)}’s ${HOME_TIERS[h.tier].n}</b><span>Visitors welcome</span></button>`).join(''):'<p class="crp dim">No one has their door open right now. Open houses appear here while their owners are home.</p>';VIS.L=L}
$('visit').addEventListener('click',e=>{const b=e.target.closest('[data-vh],#visclose');if(!b||!VIS)return;if(b.id==='visclose'){VIS=null;return unpause('visit')}const h=VIS.L[+b.dataset.vh];VIS=null;unpause('visit');if(h)enterHome(h)});
/* the lectern beside Fenn's office */
const _dh=drawHearth;drawHearth=function(cx,cy){_dh(cx,cy);if(Z.id!=='hearth')return;const X=VBX+EDGE,x=ri(X-cx),y=ri(topAt(X)-cy);g.fillStyle='#000';g.fillRect(x-6,y-20,13,20);g.fillStyle='#56331e';g.fillRect(x-1,y-16,3,16);g.fillStyle='#8a5634';g.fillRect(x-5,y-19,11,4);g.fillStyle='#efe2c0';g.fillRect(x-4,y-21,9,2);
  if(S.nearCr&&S.nearCr.k==='vbook')ptext('▲ VISIT',x,y-32+Math.sin(S.t*4),'#f2e6c8')};
/* rest bonus */
const _ge=gainExp;gainExp=function(e){return _ge(pl.buffs&&pl.buffs.rested>0?Math.round(e*1.1):e)};
/* interaction chain */
const _cn=crNear;crNear=function(){return homeNear()||_cn()};
const _cu=crUse;crUse=function(n){if(n&&['door','hdoor','ledger','furn','vbook'].includes(n.k))return homeUse(n);return _cu(n)};
const _cl=crLabel;crLabel=function(n){if(n&&['door','hdoor','ledger','furn','vbook'].includes(n.k))return homeLabel(n);return _cl(n)};
/* indoors: no weather, gentle night, window light by day */
const _wx=weather;weather=function(){return Z.interior?'clear':_wx()};
const _dl=drawLighting;drawLighting=function(cx,cy,L){if(!Z.interior)return _dl(cx,cy,L);const n=nightAmt();g.save();g.globalCompositeOperation='multiply';g.fillStyle=`rgb(${ri(240-90*n)},${ri(222-90*n)},${ri(196-60*n)})`;g.fillRect(0,0,W,H);g.restore();
  g.save();g.globalCompositeOperation='lighter';const T=HOME_TIERS[(Z.host?Z.host.tier:(HM()||{tier:0}).tier)|0];for(let i=0;i<T.win;i++){const wx=Math.round((i+1)*WW/(T.win+1))-cx,wy=158-cy;glow(wx,wy,40,n>.5?'120,150,220':'255,236,190',.18*(1-n)+.05)}
  glow(ri(pl.x-cx),ri(pl.y-cy)-16,40,'255,200,140',.08+.1*n);g.restore()};
