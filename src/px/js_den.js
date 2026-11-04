/* ---------- Whisper Woods Den: Briarwood (Bible 22.25: creature habitat, nonlethal resolution, recruitment, ecology) ---------- */
WX.briarwood=['clear','rain','clear'];WX.briarlair=['clear'];
Object.assign(MOBS,{
  poacher:{name:'Poacher',kind:'gob',ai:'ranged',hp:110,atk:14,exp:28,w:12,h:18,spd:32,shard:[5,10],aggro:160},
  snarehound:{name:'Snarehound',kind:'quad',ai:'lunger',hp:100,atk:14,exp:26,w:22,h:14,spd:46,shard:[4,8],aggro:130},
  bramblecub:{name:'Bramble Cub',kind:'quad',ai:'lunger',passive:1,hp:90,atk:10,exp:20,w:18,h:12,spd:30,shard:[2,5],aggro:60},
  briarhide:{name:'Briarhide',kind:'quad',ai:'lunger',elite:1,bb:1,hp:1500,atk:24,exp:800,w:42,h:28,spd:28,shard:[40,70],aggro:200,resp:120}});
Object.assign(GEAR,{
  poacher:{set:'Poacher',drop:.14,pal:['#4a3e2a','#2a2218','#6a5a3a','#b8a070','#7a2a22'],head:{n:'Poacher’s Hood',s:'hood'},chest:{n:'Snare-Hung Coat',s:'leather'},hands:{n:'Trapper’s Gloves'},feet:{n:'Quiet Boots'},
    charm:{n:'Bundle of Tags',s:'sigil'},weap:{katana:'Skinning Blade',daggers:'Gutting Knives',bow:'Poacher’s Bow',staff:'Snare Pole',tome:'Bounty Tally',axe:'Hatchet',hammer:'Trap Mallet',spear:'Boar Spear',shield:'Hide Shield'}},
  snarehound:{set:'Snarehound',drop:.14,pal:['#5a4a36','#32281c','#7a6648','#c8a050','#a8302a'],head:{n:'Muzzle Cap',s:'pelt'},chest:{n:'Collar-Studded Vest',s:'leather'},hands:{n:'Leash Wraps'},feet:{n:'Tracker Boots'},
    charm:{n:'Spiked Collar',s:'fang'},weap:{katana:'Houndsblade',daggers:'Bite Knives',bow:'Kennel Bow',staff:'Leash Staff',tome:'Scent Notes',axe:'Kennel Axe',hammer:'Chain Maul',spear:'Catchpole',shield:'Kennel Gate'}},
  bramblecub:{set:'Bramble Cub',drop:.08,pal:['#6a4a2a','#3e2a18','#8a6a42','#9bd04c','#d8b888'],head:{n:'Cub-Ear Cap',s:'pelt'},chest:{n:'Soft Fur Vest',s:'pelt'},hands:{n:'Paw Mittens'},feet:{n:'Padded Boots'},
    charm:{n:'Honeycomb',s:'gel'},weap:{katana:'Cubclaw Blade',daggers:'Little Claws',bow:'Bramble Bow',staff:'Honey Staff',tome:'Den Notes',axe:'Bramble Axe',hammer:'Bear Paw Maul',spear:'Thorn Spear',shield:'Bark Shield'}},
  briarhide:{set:'Briarhide',drop:1,drops:2,pal:['#5a3a22','#2e1e12','#7a5432','#9bd04c','#c84a3a'],head:{n:'Briar Crown',s:'antlers'},chest:{n:'Thornhide Coat',s:'pelt'},hands:{n:'Bramble Claws'},feet:{n:'Den Mother Greaves'},
    charm:{n:'Mother’s Thorn',s:'core'},weap:{katana:'Briar Fang',daggers:'Thorn Claws',bow:'Briarwood Bow',staff:'Den Staff',tome:'Book of the Den',axe:'Briar Axe',hammer:'Mother’s Paw',spear:'Thornspear',shield:'Briar Shield'}}});
for(const k of['poacher','snarehound','bramblecub','briarhide']){const W2=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W2[w])W2[w]=GEAR[k].set+' '+WEAP_N[w]}
GOB_S.poacher={sk:'#a08a68',skd:'#6e5c44',c:['#4a3e2a','#2a2218','#6a5a3a'],hat:'kerchief',wp:'knife'};
QUAD.snarehound={...QUAD.wolf,c:['#2a2018','#5a4a36','#7a6648','#9a845e','#ffd27a'],extra:(P,Rc,o)=>{const hx=Math.round(o.cx+o.L/2-3);for(let y=-3;y<=2;y++)P(hx,o.cy+y,'#a8302a');P(hx,o.cy-1,'#c8a050');for(const dx of[-7,-2,3])P(o.cx+dx,Math.floor(o.cy-o.bh/2),'#32281c')}};
const bearHead=(P,Rc,o,s,col)=>{const hx=Math.round(o.cx+o.L/2-2),hy=o.cy-2+(o.mode==='wind'?1:0),op=o.mode==='lunge';const [dk,md,lt,mz]=col;
  Rc(hx,hy-3*s,6*s,6*s,md);Rc(hx,hy-3*s,6*s,1,lt);Rc(hx+4*s,hy-1*s,3*s,3*s,mz);P(hx+7*s-1,hy-s,'#1a1210');P(hx+3*s,hy-2*s,'#1a1210');Rc(hx,hy-4*s,2*s,2*s,md);P(hx,hy-4*s,dk);
  if(op){Rc(hx+4*s,hy+2*s,3*s,1,'#5a1a1a');P(hx+5*s,hy+2*s,'#efe4c8')}};
QUAD.bramblecub={cw:30,ch:20,cx:12,len:14,bh:8,leg:3,lw:2,c:['#2a1c10','#6a4a2a','#8a6a42','#4a3420','#ffd27a'],head:'none',tail:'stub',extra:(P,Rc,o)=>{bearHead(P,Rc,o,1,['#3e2a18','#6a4a2a','#8a6a42','#c8a878']);P(o.cx-2,Math.floor(o.cy-o.bh/2),'#9bd04c');P(o.cx+2,Math.floor(o.cy-o.bh/2)-1,'#9bd04c')}};
QUAD.briarhide={cw:76,ch:44,cx:30,len:40,bh:18,leg:9,lw:5,c:['#1e140c','#5a3a22','#7a5432','#3e2816','#ffd27a'],head:'none',tail:'stub',extra:(P,Rc,o)=>{bearHead(P,Rc,o,2,['#2e1e12','#5a3a22','#7a5432','#b89068']);
  const top=Math.floor(o.cy-o.bh/2);for(let i=0;i<9;i++){const x=Math.round(o.cx-o.L/2+5+i*4);const h=2+((i*5)%4);for(let k=0;k<h;k++)P(x+(k>>1),top-k,k===h-1?'#c84a3a':'#4a6a2a');P(x+1,top-1,'#7aa04a')}
  for(let i=0;i<6;i++)P(o.cx-12+i*5,o.cy+2+(i%2),'#3a5a22');if(o.mode==='wind')for(let i=0;i<4;i++)P(o.cx+o.L/2+12+i,o.cy-8-i,'#efe4c8')}};
/* props */
Object.assign(PROPS,{
  snarepost(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let y=0;y<18;y++){P(X,Y-y,W[3]);P(X+1,Y-y,W[1])}for(let i=0;i<12;i++)P(X+1+i,Y-17+Math.round(i*i*.06),[150,140,120])},
  poachcamp(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(const k of[-16,16])for(let y=0;y<30;y++){P(X+k,Y-y,W[3]);P(X+k+1,Y-y,W[1])}for(let k=-17;k<=17;k++)P(X+k,Y-29,W[4]);
    for(const[k,h,c]of[[-10,14,[120,100,80]],[-2,12,[140,110,70]],[6,16,[110,90,70]]]){for(let y=0;y<h;y++)for(let j=-2;j<=2;j++)if(Math.abs(j)<3-y/h*2)P(X+k+j,Y-28+y,c);P(X+k,Y-29,[60,50,40])}
    for(let k=-6;k<=6;k++)for(let y=0;y<9;y++)if(Math.abs(k)<9-y)P(X+k+30,Y-y,[(y+k)%3?110:90,(y+k)%3?80:66,50])},
  spring(x,X,Y){const P=px3(x),S=TH.rock;for(let k=-22;k<=22;k++)for(let y=0;y<4;y++)P(X+k,Y-y,Math.abs(k)>18?pick(S,.5,X+k,y):y<2?[60,90,110]:[90,140,160]);for(const k of[-24,-20,20,24])for(let y=0;y<6;y++)P(X+k,Y-y,pick(S,.6,k,y))}});
/* zones */
const OUTI=zIdx('outskirts'),BWI=ZONES.length,BLI=BWI+1;
{const Bw={id:'briarwood',name:'Briarwood',ch:'Ashveil Reach',theme:'grove',lv:[3,4],req:2,ww:1600,start:70,
  seg:[[0,400,250],[400,200,236],[600,400,250],[1000,160,236],[1160,440,250],[440,80,204,'f'],[700,90,196,'f'],[880,80,208,'f'],[1200,90,200,'f'],[1380,80,192,'f']],
  mobs:[['snarehound',0,300],['poacher',2,720],['poacher',2,900],['bramblecub',1,500],['snarehound',4,1260],['poacher',4,1420],['bramblecub',3,1080],['poacher',6,740]],
  portals:[{x:22,to:OUTI,tx:860},{x:1578,to:BLI,tx:60}],labels:[[820,'Poachers’ Camp',70],[1300,'The Spring',60]],npcs:['bryn'],
  props:[['snarepost',260],['snarepost',560],['poachcamp',820],['snarepost',1040],['spring',1300],['snarepost',1480]],
  trees:[],snares:[260,560,1040,1480],springX:1300};
 const Bl={id:'briarlair',name:'Briarhide’s Den',ch:'Ashveil Reach',theme:'den',lv:[5,5],req:3,ww:1000,start:60,
  seg:[[0,1000,250],[320,90,214,'f'],[620,90,206,'f']],mobs:[['briarhide',0,760],['bramblecub',0,600],['bramblecub',0,880]],portals:[{x:22,to:BWI,tx:1520}],
  labels:[[520,'The Den',100]],props:[['rootmass',200],['shroom',460],['rootmass',900]],trees:[]};
 prepZone(Bw);prepZone(Bl);for(const z of[Bw,Bl]){z.nodes=[];z.stations=[]}Bw.snares=Bw.snares.map(x=>x+EDGE);Bw.springX+=EDGE;ZONES.push(Bw,Bl);
 ZONES[OUTI].portals.push({x:860+EDGE,to:BWI,tx:70+EDGE});(ZONES[OUTI].labels=ZONES[OUTI].labels||[]).push([860+EDGE,'Briarwood',78])}
MAPXY.briarwood=[48,58];MAPXY.briarlair=[58,54];
NPCS.bryn={name:'Ranger Bryn',title:'Keeper of Briarwood',x:150+EDGE,cls:'weaver',look:{sex:1,build:1,face:3,hair:2,hairC:1,beard:0,skin:2,eye:2,outfit:2},eq:{head:'moss',chest:'moss',feet:'wolf'},
  lines:['Briarwood is a nursery. Bears, boar, every fox in the Reach is born here. The poachers know it too.','Kill what threatens you, sure. But a mother bear protecting cubs is not a monster.','I would rather talk an animal down than put one down. Takes longer. Works better.']};
BARKS.bryn=['Easy, easy.','Watch for snares.','The cubs are watching.'];
Object.assign(LORE,{
  dnA:{z:'briarwood',x:780,k:'note',t:'Bounty Slip',txt:'“Wanted, alive: bear cubs, any colour. Paid by the head in Stonebridge, no questions. Mother is worth more dead; her hide sells.” The stamp is a Road Company freight mark.'},
  dnB:{z:'briarwood',x:1340,k:'book',t:'Ranger’s Journal',txt:'“The spring has gone sour. Rot from the Scar came down with the last rains. Briarhide drinks here, and the cubs. If the water stays bad, she will turn mean, and then someone will kill her for it.”'}});
Object.assign(QUESTS,{
  dn1:{title:'Snares in the Brush',giver:'bryn',lv:2,
    offer:'Poachers have strung snares all through Briarwood. Wire nooses at cub height. Pull up four of them before something small walks into one.',
    desc:'Pull up four poacher snares in Briarwood.',goal:{t:'event',id:'snare',n:4,lab:'Snares pulled'},where:'Briarwood, off Whisper Woods',
    prog:'Look for short posts with wire loops.',done:'Four less ways for a cub to die. Thank you.',reward:{exp:400,sh:30}},
  dn2:{title:'Sour Water',giver:'bryn',pre:'dn1',
    offer:'The spring the den drinks from has gone bad. Rot washed down from the Scar. Three good herbs crushed into it will clear it for a season. It will also calm the mother. Bad water makes for bad tempers.',
    desc:'Cleanse the Briarwood spring with 3 herbs.',goal:{t:'event',id:'spring',n:1,lab:'Spring cleansed'},where:'The Spring, east Briarwood',
    prog:'Three herbs at the spring.',done:'Clear water. You can hear the birds come back. Now the hard part.',reward:{exp:400,sh:30}},
  dn3:{title:'Briarhide',giver:'bryn',pre:'dn2',lv:4,
    offer:'The mother bear in the den has been hurt by snares and soured by the water. She attacks anything that comes near the cubs. If you can wear her down without killing her, she will back off; then you can calm her with an offering of meat. If you have to kill her… I will understand.',
    desc:'Calm Briarhide, or put her down if you must.',goal:{t:'event',id:'briar',n:1,lab:'Briarhide resolved'},where:'Briarhide’s Den, past the Spring',
    prog:'Wear her down, then offer meat to calm her.',done:'',reward:{exp:900,sh:60,sp:1}},
  dn4:{title:'The Cub',giver:'bryn',pre:'dn3',
    offer:'One of the cubs has been following you since the den. It will not leave you alone. It has decided you are family. What do you want to do?',
    desc:'Decide what happens to the cub that followed you.',goal:{t:'talk',npc:'bryn'},where:'Ranger Bryn, Briarwood',
    prog:'Tell Bryn what you have decided.',done:'Then that is settled. Briarwood will remember you kindly.',
    choices:[{n:'Take the cub with you',d:'The cub becomes your companion.',flag:'cub_adopt',reward:{exp:300,fl:{cubadopt:1}}},
      {n:'Leave it with its family',d:'Bryn teaches you what she knows about handling wild creatures.',flag:'cub_den',reward:{exp:900}},
      {n:'Take it to Creature Green',d:'The handlers in the Rotting Reach will raise it well and pay a finder’s fee.',flag:'cub_green',reward:{sh:150,item:['bramblecub','charm',2]}}],reward:{exp:400}}});
const _qfd=questFlag;questFlag=function(fl){_qfd(fl);if(fl.cubadopt){const c=CB(),id='bramblecub-'+cid();c.b[id]={t:'bramblecub',n:'Burr, Bramble Cub',tr:40,lv:Math.max(1,pl.lv-1),xp:0};c.own.push(id);if(!c.act){c.act=id;spawnComp()}banner('Burr will follow you','Bramble Cub · a new companion');save()}
  if(fl.cub_den)dGain('handling',200)};
/* the mother yields instead of dying; calm her with meat */
const _hmd=hitMob;hitMob=function(m,...a){const r=_hmd(m,...a);if(m&&m.t==='briarhide'&&!m.dead&&!m.yield&&m.hp<m.mhp*.25){m.yield=1;m.hp=Math.max(1,m.hp);m.aggro=0;m.stun=1e9;banner('Briarhide yields','She backs away, protecting the cubs. Offer meat to calm her.');for(const c of S.mobs)if(c.t==='bramblecub')c.aggro=0}return r};
const _kmd=killMob;killMob=function(m,...a){if(m&&m.t==='briarhide'&&!S.briarKill){const st=qSt('dn3');if(st&&st.s==='a'){st.n=1;pl.flags.briar='killed';QUESTS.dn3.done='So she is gone. The cubs will need someone now. One of them has already chosen you.';qProgress('dn3','Briarhide')}}return _kmd(m,...a)};
function denNear(){if(Z.id==='briarwood'){for(let i=0;i<Z.snares.length;i++)if(!((pl.flags.snares||0)&(1<<i))&&Math.abs(pl.x-Z.snares[i])<14)return{k:'snare',i};if(!pl.flags.spring&&Math.abs(pl.x-Z.springX)<24)return{k:'spring'}}
  if(Z.id==='briarlair'){const m=S.mobs.find(m=>m.t==='briarhide'&&m.yield&&!m.dead);if(m&&Math.abs(pl.x-m.x)<50)return{k:'calm',m}}return null}
const DK=['snare','spring','calm'];
const _cnd=crNear;crNear=function(){return denNear()||_cnd()};
const _cud=crUse;crUse=function(n){if(n&&DK.includes(n.k)){
  if(n.k==='snare'){pl.flags.snares=(pl.flags.snares||0)|(1<<n.i);addMat('salvage',1,pl.x,pl.y);sfx.pick();const st=qSt('dn1');if(st&&st.s==='a'){st.n=[0,1,2,3].filter(i=>pl.flags.snares&(1<<i)).length;qProgress('dn1','Snare')}save();return}
  if(n.k==='spring'){if(mat('herb')<3){banner('Not enough herbs','You need 3 herbs to cleanse the spring');return}pl.mat.herb-=3;pl.flags.spring=1;dGain('herbalism',30);banner('The spring runs clear','Birdsong returns to Briarwood');[392,523,659].forEach((q,i)=>setTimeout(()=>tone(q,.3,'sine',.04),i*150));qEvent('spring');save();return}
  if(n.k==='calm'){if(mat('meat')<1){banner('You need an offering','1 Meat to calm Briarhide');return}pl.mat.meat--;const m=n.m;S.briarKill=1;m.dead=1;m.resp=99999;S.briarKill=0;pl.flags.briar='calmed';dGain('handling',80);
    for(let i=0;i<24;i++){const a=i/24*6.28;S.parts.push({x:m.x,y:m.y-20,vx:Math.cos(a)*60,vy:Math.sin(a)*60-20,t:0,life:1,c:i%3?'#ff8aa0':'#9bd04c',g:-10,s:i%4?1:2})}
    banner('Briarhide is calm','She gathers the cubs and retreats into the deep den');const st=qSt('dn3');if(st&&st.s==='a'){st.n=1;QUESTS.dn3.done='You calmed her. In thirty years I have seen that done twice. The cubs are safe. One of them seems to have decided you are family.';qProgress('dn3','Briarhide')}
    for(let i=0;i<GEAR.briarhide.drops;i++)S.drops.push({k:'gear',it:rollDrop('briarhide',false,m.lv),x:m.x,y:m.y-8,vx:rnd(-50,50),vy:rnd(-200,-140),t:0});save();return}}return _cud(n)};
const _cld=crLabel;crLabel=function(n){if(n&&DK.includes(n.k))return n.k==='snare'?'Pull up · Poacher snare':n.k==='spring'?'Cleanse · Spring (3 herbs)':'Calm · Briarhide (offer 1 meat)';return _cld(n)};
function drawDen(cx,cy){if(Z.id==='briarwood'){for(let i=0;i<Z.snares.length;i++){if((pl.flags.snares||0)&(1<<i))continue;const X=Z.snares[i],x=ri(X-cx),y=ri(topAt(X)-cy);if(Math.sin(S.t*3+i)>.7){g.fillStyle='#fff4c2';g.fillRect(x+6,y-12,1,1)}}
    if(!pl.flags.spring){const X=Z.springX,x=ri(X-cx),y=ri(topAt(X)-cy);for(let k=-17;k<=17;k++)if((k+Math.floor(S.t*6))%5===0){g.fillStyle='rgba(120,160,40,.7)';g.fillRect(x+k,y-3,1,1)}}}
  if(Z.id==='briarlair'){const m=S.mobs.find(m=>m.t==='briarhide'&&m.yield&&!m.dead);if(m){const x=ri(m.x-cx),y=ri(m.y-cy);ptext('♥?',x,y-46+Math.sin(S.t*3)*2,'#ff8aa0')}}}

