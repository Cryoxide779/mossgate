/* ---------- the rest of Ashveil Reach: waystone network + map (Bible 20.16–20.17), Overgrown Shrine, Old Hermit's Hut,
   Shardstone Outcrop, Hunter's Camp, Creature Green ---------- */
const zIdx=id=>ZONES.findIndex(z=>z.id===id);
/* set dressing */
Object.assign(PROPS,{
  shrinegate(x,X,Y){const P=px3(x),S=TH.rock,M=TH.moss,L=TH.leaf;
    for(let y=0;y<10;y++)for(let k=-60;k<=60;k++){const row=y/5|0;P(X+k,Y-y,(k+60+(row%2)*6)%12===0||y%5===4?S[1]:pick(S,.55-(k+60)/240+(y%5===0?.15:0),X+k,y))}
    for(const sx of[-46,46]){for(let y=10;y<92;y++)for(let k=-7;k<=7;k++){const u=(k+7)/14,crack=fbm(k*.5,y*.2,sx+9)>.72;P(X+sx+k,Y-y,crack?S[1]:pick(S,.75-u*.5+(fbm(k*.4,y*.3,sx)-.5)*.3,X+k,y))}
      for(let y=14;y<90;y+=3){const k=Math.round(Math.sin(y*.3+sx)*6);P(X+sx+k,Y-y,pick(M,.6,X,y));P(X+sx+k+1,Y-y,pick(M,.4,X,y));if(y%9===0){P(X+sx+k-1,Y-y+1,pick(L,.7,X,y));P(X+sx+k+2,Y-y-1,[212,72,58])}}}
    for(let y=92;y<104;y++){const sag=y<96?0:1;for(let k=-62;k<=62;k++)P(X+k,Y-y+sag*Math.round(Math.abs(k)/40),y===103?S[6]:pick(S,.6-(y-92)*.03+(fbm(k*.3,y*.4,4)-.5)*.3,X+k,y))}
    for(let k=-66;k<=66;k+=2){const d=Math.round(Math.sin(k*.21)*2+(fbm(k*.1,1,7)*6));for(let j=0;j<d;j++){P(X+k,Y-104+j+4,pick(M,.7-j*.08,X+k,j));P(X+k+1,Y-104+j+4,pick(M,.5,X+k,j))}}
    for(let i=0;i<14;i++){const k=-58+Math.floor(hash(i,1,X)*116),len=6+Math.floor(hash(i,2,X)*18);for(let j=0;j<len;j++){P(X+k+Math.round(Math.sin(j*.5+i)),Y-100+j,pick(L,.4+j*.02,X+k,j))}P(X+k,Y-100+len,[226,214,186])}
    for(let y=0;y<4;y++)for(let k=-16;k<=16;k++)P(X+k,Y-10-y,pick(S,.7-y*.08,X+k,y));
    Z.glows.push([X,Y-60,40,'150,255,210'])},
  hut(x,X,Y){const P=px3(x),W=TH.wood,B=TH.bark,M=TH.moss,S=TH.rock;
    for(let y=0;y<8;y++)for(let k=-46;k<=46;k++)P(X+k,Y-y,pick(S,.55-k/200+(fbm(k*.4,y*.4,3)-.5)*.3,X+k,y));
    for(let y=8;y<48;y++)for(let k=-42;k<=42;k++){const log=Math.floor((y-8)/6),edge=(y-8)%6===5;P(X+k,Y-y,edge?B[1]:pick(B,.6-(k+42)/170+((y-8)%6===0?.2:0)+(fbm(k*.6,y*.2,5)-.5)*.25,X+k,y))}
    for(let y=8;y<48;y++)for(const k of[-44,-43,43,44])P(X+k,Y-y,pick(B,.35,X+k,y));
    for(let y=8;y<34;y++)for(let k=-8;k<=8;k++)P(X+k,Y-y,k===-8||k===8||y===33?B[1]:pick(W,.5-(k+8)/40+((k+8)%4===0?-.2:0),X+k,y));P(X+5,Y-20,[226,190,90]);
    for(const wx of[-30,22]){for(let y=26;y<38;y++)for(let k=0;k<10;k++)P(X+wx+k,Y-y,k===0||k===9||y===26||y===37||k===5||y===31?B[1]:[255,214,140]);}
    for(let y=48;y<82;y++){const hw=Math.round(56*(1-(y-48)/36));for(let k=-hw;k<=hw;k++){const thatch=(k*3+y*7)%5;P(X+k,Y-y,Math.abs(k)>hw-2?M[1]:pick(M,.45+(thatch===0?.3:0)-(y-48)*.004+(fbm(k*.3,y*.5,8)-.5)*.4,X+k,y))}}
    for(let k=-58;k<=58;k+=3){const d=2+Math.round(hash(k,1,X)*5);for(let j=0;j<d;j++)P(X+k,Y-48+j,pick(M,.5-j*.08,X+k,j))}
    for(let y=72;y<96;y++)for(let k=24;k<32;k++)P(X+k,Y-y,y===95?S[6]:pick(S,.6-(k-24)/20,X+k,y));
    for(let i=0;i<10;i++){const k=24+Math.floor(hash(i,4,X)*8),y=98+i*3;P(X+k+Math.round(Math.sin(i)*2),Y-y,[180,176,170])}
    for(const[k,c]of[[-36,[184,74,66]],[-30,[226,190,90]],[30,[134,180,127]],[38,[184,74,66]]]){P(X+k,Y-1,[90,140,60]);P(X+k,Y-2,[90,140,60]);P(X+k,Y-3,c);P(X+k+1,Y-3,c);P(X+k-1,Y-3,c);P(X+k,Y-4,c)}
    Z.glows.push([X-25,Y-32,22,'255,200,120']);Z.glows.push([X+27,Y-32,22,'255,200,120'])},
  pen(x,X,Y){const P=px3(x),W=TH.wood;for(const k of[-40,-20,0,20,40]){for(let y=0;y<20;y++){P(X+k,Y-y,pick(W,.7,X,y));P(X+k+1,Y-y,pick(W,.35,X,y))}P(X+k,Y-20,W[6])}
    for(const y of[7,15])for(let k=-40;k<=41;k++){P(X+k,Y-y,pick(W,.6,X+k,y));P(X+k,Y-y+1,W[2])}
    for(let y=0;y<9;y++){const hw=Math.round(12*(1-y/9));for(let k=-hw;k<=hw;k++)P(X+56+k,Y-y,pick(R(['#5a4a1a','#8a7a2a','#b8a03a','#e0c860','#f6e8a0']),.7-y*.04+(hash(k,y,3)-.5)*.4,X+k,y))}
    for(let k=-36;k<=36;k+=6)if(hash(k,2,X)>.4){P(X+k,Y-1,[90,140,60]);P(X+k+1,Y-2,[120,170,80])}}});
{const t=ZONES[zIdx('town')];t.props.push(['pen',1560+EDGE]);t.labels.push([1560+EDGE,'Creature Green',66]);t.npcs.push('odette');
 const h=ZONES[zIdx('hunt')];h.stations.push({x:440+EDGE,k:'cook',n:'Trackers’ Fire'},{x:560+EDGE,k:'board',n:'Hunter’s Camp Board'});h.props.push(['board',560+EDGE]);
 const add=(id,L)=>{ZONES[zIdx(id)].nodes=L.map(([r,x])=>({r,x:x+EDGE,ch:3,regrow:0}))};
 add('outcrop',[['shard',520],['shard',700],['shard',880],['ore',980],['shard',1080],['shard',1260]]);add('hermit',[['herb',300],['mush',560],['herb',780],['timber',920]]);add('shrine',[['herb',240],['herb',640],['timber',1120]]);add('hunt',[]);
 ZONES[zIdx('hermit')].stations=[{x:560+EDGE,k:'alchemy',n:'Ambry’s Still',req:'ha1'}];}
BOARDS.hunt={n:'Hunter’s Camp Board',town:'Hunter’s Camp',want:['hide','meat','herb'],to:['town','outskirts'],kinds:{bounty:3,supply:1,freight:1}};
/* people */
Object.assign(NPCS,{
  ivo:{name:'Sister Ivo',title:'Keeper of the Overgrown Shrine',x:860,cls:'weaver',look:{sex:1,build:0,face:2,hair:5,hairC:6,beard:0,skin:5,eye:2,outfit:3},eq:{head:'w_start',chest:'w_start'},
    lines:['The waystones were never magic doors. They are promises the old roads made to each other. This shrine keeps the promises.','The spirits here are not wicked. They are lost, and loud about it.','Fix one stone and the next one remembers how to listen.']},
  ambry:{name:'Old Ambry',title:'Hermit of the Grove',x:560,cls:'necro',look:{sex:0,build:0,face:4,hair:6,hairC:7,beard:4,skin:3,eye:3,outfit:4},eq:{head:'moss',chest:'n_start'},
    lines:['Everyone in CrestHollow knows my name and nobody visits. That suits me and it suits them.','I remember the Grove before the loggers. Before the Wardens. Before MossGate, almost.','Ask a question you can stand to hear answered.']},
  brannoc:{name:'Brannoc Vey',title:'Free Claim Prospector',x:340,cls:'ronin',look:{sex:0,build:2,face:3,hair:2,hairC:2,beard:3,skin:2,eye:0,outfit:1},eq:{head:'scargob',chest:'leatherwork'},
    lines:['Shardstone is the only honest money left in the Reach. It does not lie about what it is worth.','The Exorcists want to count every stone we lift. Let them dig it themselves.','Mind the hum. When the ground starts singing, step back.']},
  sel:{name:'Auditor Sel',title:'Exorcist Survey',x:450,cls:'weaver',look:{sex:1,build:1,face:1,hair:3,hairC:0,beard:0,skin:6,eye:4,outfit:4},eq:{head:'wisp',chest:'shardsteel'},
    lines:['Every stone lifted here changes the resonance under the Scar. Someone has to keep count.','I am not here to stop the mining. I am here so the mining does not stop us.','Shardstone remembers being part of something larger. It wants to go back.']},
  tess:{train:['archery','hunting','handling'],name:'Tracker Tess',title:'Hunter’s Camp',x:500,cls:'ashbow',look:{sex:1,build:1,face:2,hair:4,hairC:3,beard:0,skin:2,eye:1,outfit:1},eq:{head:'wolf',chest:'a_start'},
    lines:['Read the ground before you read the map. The ground is newer.','We send out maps and weather from here. Half the caravans read them.','If you see a lantern flashing three times in the woods, that is one of mine in trouble.']},
  odette:{train:['handling'],name:'Odette',title:'Creature Green Handler',x:1600,cls:'weaver',look:{sex:1,build:2,face:0,hair:2,hairC:5,beard:0,skin:4,eye:0,outfit:2},eq:{head:'rotstag',chest:'leatherwork'},
    lines:['Every creature that walks into CrestHollow gets registered, fed and looked at by a healer. Including yours.','A companion that trusts you will tell you things a map cannot.','Feed them what they like, not what you have. They notice.']}});
{const ZN2={shrine:['ivo'],hermit:['ambry'],outcrop:['brannoc','sel'],hunt:['tess']};for(const z of ZONES)if(ZN2[z.id])z.npcs.push(...ZN2[z.id])}
for(const id of['ivo','ambry','brannoc','sel','tess','odette'])NPCS[id].x+=EDGE;
Object.assign(BARKS,{ivo:['Quiet, little ones.','The stones remember.','Mind the roots.'],ambry:['Hm.','Mind the herbs.','Visitors. Again.'],brannoc:['Hear it hum?','Claim’s mine.','Good seam today.'],sel:['Counting.','Too loud today.','Step back from the vent.'],tess:['Wind’s turning.','Tracks are fresh.','Keep your bow dry.'],odette:['Next!','Gentle with that one.','Who’s hungry?']});
Object.assign(LORE,{
  hermA:{z:'hermit',x:150,k:'stone',t:'Moss-Eaten Marker',txt:'Older than the Warden roads: a circle of cut stones, one carved with a gate and a tree growing through it. Somebody built MossGate on top of something that was already here.'},
  hermB:{z:'hermit',x:900,k:'book',t:'Ambry’s Journal',txt:'“The Concordance came asking about the grove again. Wanted the old root-maps. I burned them in front of the clerk. The Chair’s seal was on his letter.”'},
  trap:{z:'outskirts',x:1120,k:'note',t:'Trapper’s Flag',txt:'A torn red flag tied to a branch, and three arrow notches cut beneath it: the Hunter’s Camp signal for a trapper hurt and holed up. Tracks lead toward the Grove.'}});
RECIPES.push(
  {id:'ritualmortar',d:'alchemy',r:1,n:'Ritual Mortar',use:'crisis',qe:'mortar',need:{herb:2,shard:1,timber:1},desc:'Shrine mortar mixed with shardstone dust, for re-seating a waystone. Sister Ivo needs one.'},
  {id:'eldertonic',d:'alchemy',r:2,n:'Ambry’s Elder Tonic ×3',use:'pots3',flag:'ambry',need:{herb:3,mush:2},desc:'The hermit’s own recipe. Three tonics from one brew.'},
  {id:'deepward',d:'alchemy',r:3,n:'Hermit’s Deepward',use:'ward',flag:'ambry',need:{herb:2,mush:1,shard:1},desc:'An older, stronger Ward Draught: +15 defense for 2 minutes, brewed the hermit’s way.'},
  {id:'purgesalt',d:'alchemy',r:2,n:'Purging Salts',use:'purge',flag:'auditor',need:{herb:2,shard:1},desc:'Exorcist salts that drain resonance from shardstone. Use at the Outcrop to calm the ground.'});
USE_D.pots3='Adds 3 tonics.';USE_D.purge='Lowers Shardstone Outcrop resonance by 50.';
/* quests */
Object.assign(QUESTS,{
  ws1:{title:'The Silent Waystone',giver:'ivo',lv:4,
    offer:'Every waystone in the Reach is tied to this one, and this one has gone silent. The spirits here woke when it did, and they are frightened. Quiet five of the wisps around the shrine so I can hear the stone again.',
    desc:'Quiet the restless wisps around the Overgrown Shrine.',goal:{t:'kill',mob:'wisp',n:5,zone:'shrine',lab:'Restless spirits quieted'},where:'The Overgrown Shrine, past Misty Fen Lake',
    prog:'The wisps drift above the shrine paths.',done:'Listen. There: a hum under the stone. It is not dead, only unseated. It needs mortar, the old kind.',reward:{exp:420,sh:40}},
  ws2:{title:'Ritual Mortar',giver:'ivo',pre:'ws1',
    offer:'The old keepers bound waystones with mortar mixed from herbs, timber ash and a pinch of shardstone. Any alchemy rack can make it. Brew one batch of Ritual Mortar and bring it here.',
    desc:'Craft Ritual Mortar at an alchemy rack.',goal:{t:'event',id:'mortar',n:1,lab:'Craft Ritual Mortar at an alchemy rack'},where:'Any alchemy rack (CrestHollow, Marrowbog, Mossroot Hollow)',
    prog:'Two herbs, one shardstone, one timber.',done:'Good mortar. It smells like rain on old stone. Now the hard part: when I re-seat the stone, everything lost around here will come running toward it.',reward:{exp:380,sh:30}},
  ws3:{title:'Hold the Shrine',giver:'ivo',pre:'ws2',lv:5,
    offer:'When the stone wakes it will call every spirit within a mile, and some of them are not wisps. Touch the waystone under the gate when you are ready, then hold until it settles. Bring friends if you have them.',
    desc:'Touch the shrine waystone and hold off what it calls.',goal:{t:'event',id:'shrinedef',n:1,lab:'Touch the shrine waystone and hold the shrine'},where:'The Overgrown Shrine, under the great gate',
    prog:'Three waves, then the stone settles.',done:'Feel that? Every waystone you have touched just remembered this one. You can travel between any you have found now. Touch a stone, open the map, and go.',reward:{exp:900,sh:80,fl:{waynet:1}}},
  ha1:{title:'Roots and Rumors',giver:'ambry',lv:4,
    offer:'You want something from me. Everybody does. Fine: bring me five herbs from the Grove, the good ones, and I will tell you one true thing and let you use my still.',
    desc:'Gather 5 Herbs for Old Ambry.',goal:{t:'gather',res:'herb',n:5},where:'Fallen Oak Grove and the hermit’s clearing',
    prog:'Leave the roots in the ground.',done:'One true thing: MossGate was built on a root-circle older than the Wardens, and the Concordance has been trying to find the old maps of it ever since. Use my still. My recipes are better than the Hollow’s.',reward:{exp:500,sh:30,fl:{ambry:1}}},
  ha2:{title:'The Grove Ledger',giver:'ambry',pre:'ha1',lv:5,to:'garr',
    offer:'Garr’s crew at Logger’s Rest cut the old grove last winter. Illegally. I have their tally ledger, and I want you to take it to Garr. What you do when you get there is your business. That is the point.',
    desc:'Take Ambry’s ledger to Garr at Logger’s Rest and decide what happens.',goal:{t:'talk',npc:'garr'},where:'Logger’s Rest, Whisper Woods',
    prog:'Garr is at Logger’s Rest.',done:'...Where did you get that? Look. The Concordance paid us to clear those trees, and paid well. We did not ask why. What happens now is up to you.',reward:{exp:600},
    choices:[{n:'Expose the crew',d:'Take the ledger to Captain Holt. The crew is fined and the grove is protected.',flag:'grove_exposed',reward:{sh:40,item:['treant','head',2]}},
      {n:'Let Garr make it right',d:'Garr replants the grove and pays you for your silence.',flag:'grove_replant',reward:{sh:160}},
      {n:'Ask who paid',d:'Garr names the Concordance clerk who signed the order. A lead, but nothing else.',flag:'grove_lead',reward:{exp:400,sp:1}}]},
  ha3:{title:'Older Than the Wardens',giver:'ambry',pre:'ha2',lv:6,
    offer:'There is a marker in my clearing older than any road. Read it. Then read my journal by the cairn. Then ask me again why I live out here.',
    desc:'Read Ambry’s journal by the cairn.',goal:{t:'lore',id:'hermB',n:1},where:'Old Hermit’s Hut, by the cairn',
    prog:'The journal is by the cairn on the far side of the clearing.',done:'The Chair’s seal, on a letter asking for root-maps, years before the Gatefall. Your Archivist will want to know. Tell her the hermit says hello, and that she was right about everything.',reward:{exp:900,sh:60,item:['rotstag','charm',2]}},
  oc1:{title:'Claim Dispute',giver:'sel',lv:6,to:'brannoc',
    offer:'I need a resonance sample, and the Free Claim crew will not let me near their seams. Mine six shardstone here, watch how the ground answers, then talk to Brannoc. Someone has to settle this claim.',
    desc:'Mine 6 Shardstone at the Outcrop, then settle the claim with Brannoc.',goal:{t:'gather',res:'shard',n:6},where:'Shardstone Outcrop',
    prog:'Watch the resonance meter while you mine. If it fills, the ground erupts.',done:'So the Exorcists sent you. Fine. Here is the truth: we mine fast because the Concordance buys everything we lift and asks no questions. Sel wants it slow and counted. You have seen the ground. You decide.',reward:{exp:800},
    choices:[{n:'Back the miners',d:'Free Claim keeps mining. Shard nodes here yield an extra stone more often.',flag:'claim_miners',reward:{sh:150}},
      {n:'Back the audit',d:'Mining is counted and slowed. Resonance builds a third slower, and Sel teaches you Purging Salts.',flag:'claim_audit',reward:{exp:400,fl:{auditor:1}}},
      {n:'Split the claim',d:'Half the seams each. A little of both.',flag:'claim_split',reward:{sh:70,exp:200}}]},
  hc1:{title:'Three Flashes',giver:'tess',lv:2,
    offer:'One of my trappers missed the evening call. Red flag, three notches: that is our signal for hurt and hiding. It was spotted near the east end of Whisper Woods. Find the flag and tell me which way the tracks go.',
    desc:'Find the trapper’s signal flag in Whisper Woods.',goal:{t:'lore',id:'trap',n:1},where:'Whisper Woods, near the east end',
    prog:'Look for a red flag on a branch.',done:'Toward the Grove. Good, there is shelter there. I will send a team. Here: every tracker should own a decent pair of boots.',reward:{exp:260,sh:30,item:['wolf','feet',1]}},
  hc2:{title:'Route Intelligence',giver:'tess',pre:'hc1',lv:3,
    offer:'Caravans buy our route reports. I need eyes on the roads. Visit the Overgrown Shrine and Hunter’s Camp waystones... no, start simpler: clear five wolves off the Whisper Woods trail and I will mark it safe.',
    desc:'Clear wolves from the Whisper Woods trail.',goal:{t:'kill',mob:'wolf',n:5,zone:'outskirts',lab:'Wolves cleared'},where:'Whisper Woods',
    prog:'Wolves run the middle of the trail.',done:'Trail marked safe on tonight’s report. That is fifty caravans that will not lose a mule. Not bad for an afternoon.',reward:{exp:320,sh:40}},
  cg1:{title:'Registration',giver:'odette',lv:2,
    offer:'Every creature in CrestHollow gets registered at the Green. If you want to walk around town with one, befriend it first. Break its guard or find a gentle one, offer it food it likes, and bring it home.',
    desc:'Befriend any creature and register it at the Creature Green.',goal:{t:'bond',n:1},where:'Anywhere; Mossroot Hollow is gentlest',
    prog:'Beasts eat meat, slimes herbs, sporecaps mushrooms, goblins salvage, spirits shardstone.',done:'Registered and fed. If it ever gets hurt, the Green’s healers are free for registered companions. Here, a treat bag. They will love you for it.',reward:{exp:300,sh:30,pots:2}}});
function questFlag(fl){if(fl.waynet){for(const id in(pl.flags.ways||{}))pl.flags.ways[id]=2;pl.flags.ways=pl.flags.ways||{};pl.flags.ways.shrine=2;banner('The waystone network wakes','Touch any waystone you have found to travel');[392,523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.3,'triangle',.05),i*110));save()}}
function qEvent(id){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='event'&&g.id===id&&st.n<g.n){st.n=g.n;qProgress(k,'Done')}}}
/* ---------- waystones and the map ---------- */
const WAYS={town:500,outskirts:1260,stonebridge:1180,falls:1000,tower:1040,bog:1460,hunt:940,shrine:1010,scar:1040,mossroot:760,sawmill:180,outcrop:250};
const MAPXY={road:[8,58],hunt:[14,80],town:[24,58],outskirts:[38,48],oak:[52,40],mossroot:[66,30],hermit:[56,22],sawmill:[38,26],stonebridge:[30,74],falls:[42,84],shrine:[54,92],bog:[60,74],reach:[76,78],tower:[24,34],gate:[22,14],outcrop:[38,6],scar:[10,8],inner:[4,24],hollow:[16,22]};
const WAYS_ST=id=>(pl.flags.ways||{})[id]|0;
function markSeen(){pl.flags=pl.flags||{};pl.flags.seen=pl.flags.seen||{};if(Z.id!=='deep')pl.flags.seen[Z.id]=1}
function wayX(){const x=WAYS[Z.id];return x==null?null:x+EDGE}
function wayNear(){const x=wayX();if(x==null)return null;return Math.abs(pl.x-x)<18&&Math.abs(pl.y-topAt(x))<26?{k:'way'}:null}
function useWay(){pl.flags.ways=pl.flags.ways||{};const net=!!pl.flags.waynet,was=WAYS_ST(Z.id);
  if(Z.id==='shrine'&&!net){const k=qActive().find(q=>q==='ws3');if(k){startShrineDef();return}banner('A silent waystone','Sister Ivo is trying to wake it');return}
  pl.flags.ways[Z.id]=net?2:1;if(!was){S.nums.push({x:pl.x,y:pl.y-44,txt:net?'WAYSTONE ATTUNED':'WAYSTONE FOUND',t:0,c:'#6ee6ee'});tone(880,.2,'triangle',.04);setTimeout(()=>tone(1320,.25,'triangle',.04),120)}
  save();if(!net&&!was){banner('A dormant waystone','Its network is anchored at the Overgrown Shrine, past Misty Fen Lake');return}openMap(true)}
function drawWays(cx,cy){const x0=wayX();if(x0==null)return;const x=ri(x0-cx);if(x<-30||x>W+30)return;const y=ri(topAt(x0)-cy),st=WAYS_ST(Z.id),on=st===2||(!!pl.flags.waynet&&st);
  CR_SPR['way'+(on?1:0)]=CR_SPR['way'+(on?1:0)]||nodeLayer(18,40,L=>{const P=(a,b,c)=>sp(L,a,b,c);for(let yy=4;yy<38;yy++){const w=yy<8?Math.max(2,Math.round((yy-3)*1.4)):6;for(let k=-w;k<=w;k++)P(9+k,yy,pick(RAMP.rock,.65-(k+w)/(2*w+1)*.45+(fbm(k*.5,yy*.3,4)-.5)*.3,9+k,yy))}
    for(let k=-8;k<=8;k++){P(9+k,38,RAMP.rock[3]);P(9+k,39,RAMP.rock[2])}for(const yy of[14,20,26])for(let k=-2;k<=2;k++)P(9+k,yy+(Math.abs(k)===2?1:0),on?RUNE[3]:RAMP.rock[1]);
    for(let yy=10;yy<36;yy+=4)P(3+(yy%8===2?1:0),yy,pick(RAMP.moss,.6,3,yy));P(15,30,pick(RAMP.moss,.6,15,30));if(on){P(9,15,RUNE[4]);P(9,21,RUNE[4]);P(9,27,RUNE[4])}});
  if(on){g.save();g.globalCompositeOperation='lighter';glow(x,y-20,22,'110,230,240',.28+Math.sin(S.t*2.5)*.08);g.restore()}g.drawImage(CR_SPR['way'+(on?1:0)],x-9,y-39);
  if(S.nearCr&&S.nearCr.k==='way')ptext(on?'▲ TRAVEL':'▲ WAYSTONE',x,y-50+Math.sin(S.t*4),'#6ee6ee')}
function mapHops(a,b){const q=[[a,0]],seen={[a]:1};while(q.length){const[z,d]=q.shift();if(z===b)return d;for(const p of ZONES[zIdx(z)].portals){const t=ZONES[p.to];if(!t||t.id==='deep'||seen[t.id])continue;seen[t.id]=1;q.push([t.id,d+1])}}return 6}
const wayFee=id=>4+3*mapHops(Z.id==='deep'?'town':Z.id,id);
let MAP=null;
function openMap(atWay){MAP={at:!!atWay,sel:Z.id==='deep'?'town':Z.id,msg:''};pauseFor('mapov');renderMap()}
function renderMap(){if(!MAP)return;const seen=(pl.flags.seen||{}),C=crAct(),cz=C?CRISES[C.id].zones:[];const ids=Object.keys(MAPXY).filter(id=>zIdx(id)>=0);
  const lines=[];for(const id of ids){if(!seen[id])continue;for(const p of ZONES[zIdx(id)].portals){const t=ZONES[p.to];if(!t||!MAPXY[t.id]||id>t.id&&seen[t.id])continue;const[a,b]=MAPXY[id],[c,d]=MAPXY[t.id];lines.push(`<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" class="${seen[t.id]?'':'unk'}"/>`)}}
  const here=Z.id==='deep'?'town':Z.id;
  $('mapgrid').innerHTML=`<svg viewBox="0 0 100 100" preserveAspectRatio="none">${lines.join('')}</svg>`+ids.map(id=>{const z=ZONES[zIdx(id)],[x,y]=MAPXY[id],s=seen[id],w=WAYS[id]!=null?WAYS_ST(id):-1;
    return`<button class="mpn${s?'':' unk'}${id===here?' here':''}${id===MAP.sel?' sel':''}${z.safe?' safe':''}${cz.includes(id)?' cris':''}" style="left:${4+x*.92}%;top:${4+y*.92}%" data-mz="${id}">${w>0?`<i class="ws${w===2||(pl.flags.waynet&&w)?' on':''}"></i>`:''}<span>${s?z.name.replace(/^The /,''):'?'}</span></button>`}).join('');
  const id=MAP.sel,z=ZONES[zIdx(id)],s=seen[id],w=WAYS[id]!=null?WAYS_ST(id):-1,net=!!pl.flags.waynet,canGo=MAP.at&&net&&w>=1&&id!==here,fee=wayFee(id);
  $('mapdet').innerHTML=`<div class="dn">${s?z.name:'Unexplored'}</div><div class="dm">${s?(z.safe?'Safe haven':'Level '+z.lv[0]+'–'+z.lv[1])+' · '+z.ch:'Find the road there to learn more.'}${id===here?' · You are here':''}</div>
    ${s&&cz.includes(id)?`<p class="crp" style="color:var(--ember)">Crisis: ${CRISES[C.id].n}</p>`:''}
    ${w<0?'':`<p class="crp">${w===0?'There is a waystone here you have not found.':net?'Waystone attuned.':'Waystone found, but dormant until the Overgrown Shrine is restored.'}</p>`}
    ${id==='town'&&s?'<p class="crp dim">The Veinway Stair to the Deep is in the east of CrestHollow.</p>':''}
    ${canGo?`<button class="btn sm" data-mgo="${id}" ${pl.shards<fee?'disabled':''}>Travel · ${fee} shards</button>`:MAP.at?'':(net?'<p class="crp dim">Stand at a waystone to travel.</p>':'')}
    ${MAP.msg?`<div class="warn">${MAP.msg}</div>`:''}`;
  $('mapfoot').textContent=net?'Waystones: travel between any you have touched. They move people, not cargo.':'The waystone network is silent. Sister Ivo at the Overgrown Shrine, past Misty Fen Lake, is trying to wake it.'}
$('mapov').addEventListener('click',e=>{const b=e.target.closest('[data-mz],[data-mgo],#mapclose');if(!b)return;if(b.id==='mapclose'){MAP=null;return unpause('mapov')}
  if(b.dataset.mz){MAP.sel=b.dataset.mz;MAP.msg='';return renderMap()}
  const id=b.dataset.mgo,fee=wayFee(id);if(hasCargo()){MAP.msg='Waystones carry people, not cargo. Deliver or drop your freight first.';return renderMap()}
  if(S.mobs.some(m=>!m.dead&&m.aggro>0&&Math.abs(m.x-pl.x)<160)){MAP.msg='Too dangerous to focus. Get clear of the fight first.';return renderMap()}
  if(pl.shards<fee)return;pl.shards-=fee;MAP=null;unpause('mapov');const zi=zIdx(id);S.paused=true;const f=$('fade');f.style.opacity=1;tone(660,.4,'sine',.05,600);
  setTimeout(()=>{enterZone(zi,WAYS[id]+EDGE+20);S.paused=false;f.style.opacity=0;for(let i=0;i<24;i++){const a=i/24*6.28;S.parts.push({x:pl.x,y:pl.y-16,vx:Math.cos(a)*60,vy:Math.sin(a)*60,t:0,life:.7,c:i%2?'#6ee6ee':'#d8ffff',g:0,s:1})}},420)});
/* ---------- Overgrown Shrine defense ---------- */
const SDEF_W=[['wisp','wisp','husk'],['lantern','wisp','husk','wisp'],['husk','husk','lantern','wisp','treant']];
function startShrineDef(){if(S.sdef)return;S.sdef={wave:-1,t:1.5};banner('The waystone wakes','Hold the shrine');tone(98,1,'sawtooth',.05,40)}
function shrineDefTick(dt){const D=S.sdef;if(!D)return;if(Z.id!=='shrine'||pl.dead){S.sdef=null;S.mobs=S.mobs.filter(m=>!m.sd);banner('The stone falls silent','Try again when you are ready');return}
  const alive=S.mobs.filter(m=>m.sd&&!m.dead).length;if(D.wave>=0&&alive)return;D.t-=dt;if(D.t>0)return;
  D.wave++;if(D.wave>=SDEF_W.length){S.sdef=null;S.mobs=S.mobs.filter(m=>!m.sd);qEvent('shrinedef');banner('The shrine holds','Return to Sister Ivo');return}
  D.t=3;banner('Wave '+(D.wave+1)+' of '+SDEF_W.length,'They come for the stone');const X=WAYS.shrine+EDGE;
  SDEF_W[D.wave].forEach((t,i)=>{const fly=MOBS[t].fly,side=i%2?1:-1,x=X+side*(140+i*20),si=SEG.findIndex(s=>s.t==='solid'&&x>=s.x&&x<=s.x+s.w);const m=spawnMob([t,fly?-2:Math.max(0,si),x],Z.lv[1]+(t==='treant'?0:0));m.x=x;m.sd=1;m.temp=1;m.aggro=99;if(t==='treant'){m.d={...m.d,name:'Shrine-Sick Treant'};m.mhp=m.hp=Math.round(m.mhp*.7)}S.mobs.push(m)})}
function drawShrineDef(){if(!S.sdef)return;const n=S.mobs.filter(m=>m.sd&&!m.dead).length;ptext('HOLD THE SHRINE · WAVE '+Math.max(1,S.sdef.wave+1)+'/'+SDEF_W.length+(n?' · '+n+' LEFT':''),W/2,58,'#6ee6ee')}
/* ---------- Shardstone Outcrop resonance ---------- */
function outcropRes(){return pl.flags.res|0}
function regionGather(nd){if(Z.id!=='outcrop'||nd.r!=='shard')return;const f=pl.flags;f.res=(f.res|0)+(f.oc1==='claim_audit'?10:f.oc1==='claim_split'?13:15);
  if((f.oc1==='claim_miners'&&Math.random()<.35)||(f.oc1==='claim_split'&&Math.random()<.15))addMat('shard',1,nd.x,topAt(nd.x)-12);
  if(f.res>=100){f.res=20;outcropErupt()}else if(f.res>=50&&!(S.mobs.filter(m=>m.oc&&!m.dead).length>2)){const m=spawnMob(['shardslime',0,pl.x+rnd(-120,120)],Z.lv[1]);m.x=clamp(pl.x+(Math.random()<.5?-110:110),Z.x0+20,Z.x1-20);m.y=topAt(m.x);m.minX=m.x-80;m.maxX=m.x+80;m.oc=1;m.temp=1;m.aggro=8;S.mobs.push(m);S.nums.push({x:m.x,y:m.y-24,txt:'DRAWN BY THE HUM',t:-.1,c:'#c9a8ff'})}}
function outcropErupt(){banner('Shard eruption','The ground throws back what you took');tone(70,1,'sawtooth',.07,-20);noise(.8,.08,500);
  for(let i=0;i<30;i++){const a=i/30*6.28;S.parts.push({x:pl.x,y:pl.y-6,vx:Math.cos(a)*130,vy:Math.sin(a)*90-60,t:0,life:.9,c:i%2?'#c9a8ff':'#f0e2ff',g:200,s:2})}
  hurtPl(Math.round(pl.mhp*.3),pl.x+1,null);S.crE=S.crE||[];for(let i=0;i<6;i++)S.crE.push({x:pl.x+rnd(-90,90),t:0})}
function outcropTick(dt){if(Z.id!=='outcrop'){return}pl.flags.res=Math.max(0,(pl.flags.res|0)-dt*.6)}
function drawOutcrop(cx,cy){if(Z.id!=='outcrop')return;const r=outcropRes(),w=70,x=ri(W/2-w/2),y=40;g.fillStyle='#000';g.fillRect(x-1,y-1,w+2,5);g.fillStyle=r>75?'#ff6a8a':r>45?'#c9a8ff':'#6a5a9a';g.fillRect(x,y,ri(w*r/100),3);ptext('RESONANCE',W/2,y+9,r>75?'#ff6a8a':'#c9a8ff');
  if(S.crE&&S.crE.length){S.crE=S.crE.filter(e=>{e.t+=.016;const X=ri(e.x-cx),Y=ri(topAt(e.x)-cy),h=Math.min(1,e.t*4)*Math.max(0,1-(e.t-1)*1.5)*16;if(h>0){g.fillStyle='#000';g.fillRect(X-3,Y-ri(h)-1,7,ri(h)+1);g.fillStyle='#5a4290';g.fillRect(X-2,Y-ri(h),5,ri(h));g.fillStyle='#c9a8ff';g.fillRect(X-1,Y-ri(h),2,ri(h))}return e.t<1.8})}}
/* purge salts item effect */
function usePurge(){pl.flags.res=Math.max(0,(pl.flags.res|0)-50);banner('Purging Salts','The ground goes quiet');}
function reachTick(dt){shrineDefTick(dt);outcropTick(dt)}
function drawReach(cx,cy){drawWays(cx,cy);drawShrineDef();drawOutcrop(cx,cy)}
addEventListener('keydown',e=>{if(e.code==='KeyM'&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){if(!$('mapov').hidden){MAP=null;unpause('mapov')}else if(pl.ch&&S.started&&!S.paused)openMap(false)}});
