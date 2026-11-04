const C=document.getElementById('c'),CX=C.getContext('2d');
const G=document.createElement('canvas'),g=G.getContext('2d');
let W=420,H=230,SCL=1,WW=1400,WH=300;const BGH=300;
const $=id=>document.getElementById(id);

/* ---------- colour + noise helpers ---------- */
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const R=a=>a.map(hex);
const RAMP={
  rock:R(['#0e1114','#1a2024','#283034','#384142','#4e5652','#687062','#878c74']),
  rockW:R(['#130f0d','#211915','#33281f','#4a3b2e','#63503d','#7e6950','#9a8466']),
  moss:R(['#13291a','#1f4420','#2f6127','#467f2d','#63a136','#8dc546']),
  grass:R(['#1a4220','#2a6326','#408a2e','#64b03a','#9ad853','#cff27c']),
  bark:R(['#160d08','#26170e','#3b2416','#55331d','#714426','#8f5a31','#ad7440']),
  leaf:R(['#0b1f10','#123018','#1b451f','#285e26','#3b7c2d','#58a036','#82c444','#b2e061']),
  wall:R(['#070f10','#0d181a','#132224','#1a2e2f','#233a39','#2f4845','#3c5753']),
  far:R(['#0b1a1c','#112628','#183433','#21433d','#2d5548','#3d6a55']),
  cliff:R(['#090f10','#101b1c','#182627','#213333','#2b403d','#38514a','#486555']),
  wood:R(['#1b0d06','#34190c','#542b15','#76401f','#96582a','#b8773d','#d39a5a']),
  water:R(['#09202c','#0e3346','#154c66','#1e6b88','#3594b6','#6cc4e0','#bff0ff','#ffffff']),
  slime:R(['#0f1a26','#1a2c40','#264259','#355c75','#4a7a93']),
};
function hash(x,y,s){let h=(x|0)*374761393+(y|0)*668265263+(s|0)*1442695041;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296}
function vn(x,y,s){const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi,a=hash(xi,yi,s),b=hash(xi+1,yi,s),c=hash(xi,yi+1,s),d=hash(xi+1,yi+1,s),u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf);
  return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v}
const fbm=(x,y,s)=>vn(x,y,s)*.55+vn(x*2.1,y*2.1,s+7)*.3+vn(x*4.3,y*4.3,s+13)*.15;
const BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function pick(r,t,x,y){t+=(BY[((y|0)&3)*4+((x|0)&3)]/16-.47)/r.length*1.3;let i=Math.floor(t*r.length);return r[i<0?0:i>=r.length?r.length-1:i]}
const rnd=(a,b)=>a+Math.random()*(b-a),clamp=(v,a,b)=>v<a?a:v>b?b:v,ri=Math.round;
function layer(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),im=x.createImageData(w,h);return{c,x,im,d:im.data,w,h}}
function sp(L,x,y,col,a=255){x|=0;y|=0;if(x<0||y<0||x>=L.w||y>=L.h)return;const i=(y*L.w+x)*4;L.d[i]=col[0];L.d[i+1]=col[1];L.d[i+2]=col[2];L.d[i+3]=a}
const has=(L,x,y)=>x>=0&&y>=0&&x<L.w&&y<L.h&&L.d[(y*L.w+x)*4+3]>0;
const commit=L=>L.x.putImageData(L.im,0,0);
function outlineL(L,col,onlyBelow){const o=new Uint8Array(L.w*L.h);for(let i=0;i<L.w*L.h;i++)o[i]=L.d[i*4+3]>0?1:0;
  for(let y=0;y<L.h;y++)for(let x=0;x<L.w;x++){const i=y*L.w+x;if(o[i])continue;
    const n=(y>0&&o[i-L.w])||(!onlyBelow&&((x>0&&o[i-1])||(x<L.w-1&&o[i+1])||(y<L.h-1&&o[i+L.w])));if(n)sp(L,x,y,col)}}
const mixC=(a,b,t)=>{const A=hex(a),B=hex(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};

/* ---------- themes ---------- */
const THEMES={
  grove:{ramps:{far:R(['#16241a','#1f3220','#2c4426','#3e5a2c','#587434','#7c9440','#a8b456']),cliff:R(['#0d1410','#16211a','#202f22','#2b3d2b','#3a4f35','#4c6342','#647a52']),
      leaf:R(['#0f2410','#183818','#24501f','#356b28','#4c8a30','#6aab3a','#93c94a','#c4e66a'])},
    mid:'cliff',top:[130,70],canopy:'leaf',fog:'rgba(36,44,18,.26)',fog2:'rgba(30,40,14,.1)',ray:'255,226,140',rayA:1.3,amb:'leaf',vig:'2,6,2',glow:.5},
  falls:{ramps:{},mid:'cliff',top:[40,90],canopy:'leaf',fog:'rgba(10,34,38,.32)',fog2:'rgba(14,40,44,.14)',ray:'200,255,170',rayA:1,amb:'mote',vig:'2,8,10',glow:.53},
  dusk:{ramps:{far:R(['#1a1226','#26183a','#36204a','#4a2a58','#653a66','#8a4e70','#b4687a']),wall:R(['#120d18','#1b1424','#261c31','#32263f','#40324d','#4f405c','#62526c']),
      leaf:R(['#141a14','#1f2a1c','#2c3a24','#3d4c2c','#536234','#6c7a3e','#8a9450','#aab066']),grass:R(['#2a3a24','#3a4e2c','#506436','#6a7c40','#8c9a52','#b4bc6a']),
      moss:R(['#1e2a1c','#2c3c24','#3c502c','#506634','#6a7e40','#86964e']),rock:R(['#100d14','#1b1720','#28222e','#38303d','#4a4150','#5f5664','#787080']),
      rockW:R(['#140f0e','#221915','#33261f','#47362a','#5e4a39','#786049','#93795c'])},
    mid:'ruins',canopy:'dead',fog:'rgba(30,14,40,.3)',fog2:'rgba(40,18,46,.12)',ray:'255,170,200',rayA:.8,amb:'firefly',vig:'8,2,12',glow:.55},
  blood:{ramps:{far:R(['#14070a','#200b10','#2e1016','#42161c','#5c1e22','#7c2a26','#a83a2c']),cliff:R(['#0e0809','#170d0f','#221316','#2e1a1d','#3b2225','#4c2c2e','#603838']),
      rock:R(['#0f0a0b','#1a1214','#271b1d','#352527','#463133','#5a3f40','#714f4e']),rockW:R(['#140c08','#22140e','#331e15','#47291c','#5e3824','#78492f','#935b3a']),
      grass:R(['#2a1e1c','#3a2824','#4e342c','#664236','#825442','#a06a52']),moss:R(['#2a1212','#3c1a18','#52241e','#6c3026','#883e2e','#a85038']),
      leaf:R(['#100606','#1a0a0a','#2a1010','#3c1614','#521e18','#6c281e','#8a3424','#a8442c'])},
    mid:'cave',canopy:'chains',fog:'rgba(40,6,8,.3)',fog2:'rgba(50,8,10,.12)',ray:'255,90,60',rayA:.7,amb:'ember',vig:'12,0,2',glow:.5,noFern:1},
  oak:{ramps:{far:R(['#1a1e1a','#242a22','#30382c','#3e4836','#4e5a42','#64704e','#7e8a60']),cliff:R(['#0d100d','#151a15','#1e241d','#283026','#333d30','#40493a','#525a48']),
      leaf:R(['#141812','#1e241a','#2a3222','#38422a','#485434','#5c6840','#76804e','#94985e']),grass:R(['#2a3420','#384428','#4a5832','#5e6c3c','#788448','#949c58']),
      moss:R(['#1e241a','#2a3222','#38422a','#4a5634','#5e6a3e','#76804a']),bark:R(['#120e0c','#1e1814','#2c241e','#3a3028','#4a3e34','#5c4e42','#6e6052'])},
    mid:'cliff',top:[110,80],canopy:'dead',fog:'rgba(30,36,28,.3)',fog2:'rgba(30,34,26,.12)',ray:'200,220,170',rayA:.9,amb:'mote',vig:'4,6,4',glow:.45},
  bog:{ramps:{far:R(['#0e1612','#142019','#1b2a20','#243628','#2e4230','#3c5238','#4c6442']),cliff:R(['#0a0e0b','#111712','#18201a','#212b22','#2b372b','#374535','#455440']),
      leaf:R(['#0c140c','#132012','#1c2e18','#26401e','#335226','#43662e','#567a38','#6e8e44']),grass:R(['#26301a','#344020','#44522a','#566632','#6c7a3c','#869248']),
      moss:R(['#1a2414','#26341c','#344624','#46582c','#586a34','#6e7e3e']),rock:R(['#0e100c','#181a14','#24261e','#323428','#424434','#545542','#6a6a52']),
      water:R(['#0c1610','#122018','#1a2e20','#243e2a','#345234','#4c6a44','#7a9a64','#b0c890'])},
    mid:'cliff',top:[150,40],canopy:'leaf',fog:'rgba(26,40,24,.38)',fog2:'rgba(30,44,26,.16)',ray:'190,220,140',rayA:.6,amb:'firefly',vig:'2,8,4',glow:.4},
  heath:{ramps:{far:R(['#2a2030','#3a2a3a','#523a40','#6e4c44','#8e6448','#b2824e','#d4a45c']),cliff:R(['#120e10','#1c1618','#282022','#342a2a','#423634','#52443e','#64544a']),
      grass:R(['#3a3a1e','#4c4c24','#62602c','#7a7634','#968e40','#b4aa50']),moss:R(['#2a2a18','#3a3a1e','#4c4c24','#5e5e2c','#727234','#88883e']),
      leaf:R(['#1a1a10','#262616','#34341c','#444422','#56562a','#6a6a32','#80803c','#9a9848'])},
    mid:'cliff',top:[140,60],canopy:'dead',fog:'rgba(60,40,24,.2)',fog2:'rgba(50,34,20,.08)',ray:'255,200,130',rayA:1.2,amb:'mote',vig:'8,4,2',glow:.7},
  scar:{ramps:{far:R(['#0c0812','#140c1c','#1e1028','#2a1436','#3a1a44','#4e2252','#6a2c5e']),cliff:R(['#08060a','#100c12','#18121c','#201826','#2a2032','#36283e','#44324c']),
      rock:R(['#0c0a0e','#16121a','#201a26','#2c2432','#3a3040','#4a3e50','#5e5064']),rockW:R(['#0e0a0c','#1a1216','#261a20','#34242a','#443036','#563e44','#6a4e54']),
      grass:R(['#241a2a','#302236','#3e2c44','#4e3854','#604666','#765878']),moss:R(['#1e1424','#2a1c32','#382642','#483252','#5a3e64','#6e4c78']),
      leaf:R(['#100a14','#1a1020','#24162c','#301c3a','#3e2448','#4e2e58','#62386a','#7a447e'])},
    mid:'cave',canopy:'none',fog:'rgba(30,10,40,.32)',fog2:'rgba(40,12,50,.12)',ray:'200,140,255',rayA:.6,amb:'ember',vig:'8,0,12',glow:.5,noFern:1},
  inner:{ramps:{far:R(['#0e0408','#1a0810','#2a0c1a','#3e1226','#561a34','#742446','#963058']),cliff:R(['#08040a','#120810','#1c0c18','#281222','#36182e','#46203a','#582a48']),
      rock:R(['#0c080c','#160e16','#221622','#30202e','#40283c','#52344c','#684260']),rockW:R(['#100808','#1c0e10','#2a1418','#3a1c22','#4c262c','#603238','#784046']),
      grass:R(['#2a1424','#381a30','#48223e','#5a2c4e','#6e3860','#864672']),moss:R(['#241020','#32162c','#421e3a','#542848','#683258','#7e3e6a']),
      leaf:R(['#100810','#1c0c1a','#2a1226','#3a1834','#4c2044','#602a56','#78346a','#904080'])},
    mid:'cave',canopy:'chains',fog:'rgba(50,8,30,.3)',fog2:'rgba(60,10,40,.12)',ray:'255,90,140',rayA:.5,amb:'ember',vig:'14,0,8',glow:.5,noFern:1},
  mill:{ramps:{far:R(['#22180e','#33241a','#4a3222','#64442a','#7e5a32','#9c7440','#c09454']),cliff:R(['#120d09','#1c150f','#281e15','#35281c','#443424','#56422e','#6a5238']),
      leaf:R(['#1a1608','#2a220c','#3e3212','#58461a','#765c22','#96742c','#b8903a','#d8b050']),grass:R(['#2e2a14','#40381a','#565022','#6e682c','#8a8238','#aca048']),
      moss:R(['#22200e','#323014','#44421c','#585624','#6e6c2e','#868438']),bark:R(['#140c06','#22140a','#341e10','#4a2c18','#603a20','#7a4c2a','#946036'])},
    mid:'cliff',top:[120,70],canopy:'leaf',fog:'rgba(60,40,18,.22)',fog2:'rgba(50,34,14,.1)',ray:'255,196,110',rayA:1.25,amb:'leaf',vig:'8,4,0',glow:.62},
  rot:{ramps:{far:R(['#140c12','#1e121a','#2a1824','#38202e','#482a38','#5a3644','#704450']),cliff:R(['#0c080a','#140e12','#1c141a','#261c22','#30242a','#3e2e34','#4e3a40']),
      leaf:R(['#120e0e','#1c1614','#28201a','#363020','#463e26','#5a4e2e','#6e6034','#867440']),grass:R(['#2a1e22','#38282c','#483438','#5a4246','#6e5256','#866468']),
      moss:R(['#241a22','#32242e','#42303c','#563e4c','#6c4e5e','#866072']),rock:R(['#0e0b0c','#181314','#241c1e','#30272a','#3e3236','#4e4044','#625256']),
      water:R(['#140c10','#1e1218','#2a1a20','#38242a','#4a3236','#604448','#7c5c5e','#a07e7c'])},
    mid:'cliff',top:[150,50],canopy:'dead',fog:'rgba(48,26,40,.38)',fog2:'rgba(56,30,44,.16)',ray:'230,160,210',rayA:.5,amb:'mote',vig:'8,2,8',glow:.4},
  den:{ramps:{far:R(['#08120e','#0c1a14','#12241c','#183026','#203e30','#2c4e3c','#3a604a']),cliff:R(['#060c0a','#0a1410','#101c16','#16261e','#1e3226','#283e30','#344c3a']),
      leaf:R(['#0a1a10','#102616','#18361e','#224828','#2e5c32','#3c723c','#4e8a46','#68a454']),grass:R(['#1a3420','#22462a','#2c5a34','#3a7040','#4c884e','#64a060']),
      moss:R(['#12301c','#1a4226','#245632','#306c3e','#3e844c','#52a05e']),rock:R(['#0a0e0c','#121a16','#1c2620','#26322a','#304036','#3e4e42','#4e6052'])},
    mid:'cave',canopy:'leaf',fog:'rgba(12,40,30,.3)',fog2:'rgba(14,44,32,.12)',ray:'150,255,200',rayA:.5,amb:'firefly',vig:'0,8,6',glow:.5},
  town:{ramps:{far:R(['#2a1a24','#3e2430','#5a3038','#7c4038','#a25a3a','#c87e44','#eaa852']),cliff:R(['#120d0c','#1d1614','#2a201b','#382b22','#48382a','#5c4934','#735c40']),
      wall:R(['#1a1216','#2a1c1e','#3c2826','#50362e','#664638','#7e5a44','#9a7052']),roof:R(['#14080a','#24100e','#3a1814','#52221a','#6c2e20','#8a3c26']),
      leaf:R(['#141e10','#1e2e16','#2c4220','#3c5828','#507030','#6a8a3a','#8aa448','#b0c260']),grass:R(['#2a3a1c','#3c5224','#56702e','#74903a','#9ab04c','#c8d468']),
      moss:R(['#1c2614','#2a3a1c','#3c5024','#52682c','#6c8436','#8aa044'])},
    mid:'town',canopy:'bunting',fog:'rgba(60,32,14,.16)',fog2:'rgba(60,30,10,.06)',ray:'255,200,120',rayA:1.2,amb:'firefly',vig:'10,5,2',glow:.62,noFern:1}
};

/* ---------- zones ---------- */
const ZONES=[
 {id:'outskirts',name:'Whisper Woods',ch:'Ashveil Reach',theme:'grove',lv:[2,4],req:1,ww:1520,start:110,
  seg:[[0,260,250],[260,110,236],[370,310,250],[680,60,228],[740,260,212],[1000,520,250],[290,80,196,'f'],[430,90,208,'f'],[540,80,172,'f'],[820,90,172,'f'],[1100,100,208,'f'],[1240,90,170,'f'],[1380,90,210,'f']],
  mobs:[['moss',2,420],['wolf',2,610],['moss',4,860],['boar',5,1150],['wolf',5,1300],['moss',5,1430],['moss',8,580],['moss',11,1285],['boar',2,470],['moss',0,200]],
  portals:[{x:22,to:5,tx:1740},{x:1494,to:6,tx:70},{x:1040,to:12,tx:70}],
  labels:[[470,'Logger\u2019s Rest',44]],props:[['lantern',232],['board',360],['crates',405],['fire',492],['tent',540],['lantern',710],['gatepiece',610],['pillar',965],['lantern',1200],['sign',1460]],
  trees:[[24,112,41,[110,70,250,40]],[1080,1165,43,[1082,60,950,34]]]},
 {id:'falls',name:'Misty Fen Lake',ch:'Ashveil Reach',theme:'falls',lv:[3,5],req:2,ww:1400,start:60,
  seg:[[0,180,236],[180,250,250],[430,130,276,'bed'],[452,18,257,'stone'],[500,20,255,'stone'],[536,18,259,'stone'],[560,182,244],[742,58,222],[800,200,198],[1000,72,224],[1072,328,252],
       [256,44,214,'f'],[300,92,168,'f'],[1060,38,214],[1110,112,178,'f']],
  pool:{x0:430,x1:560,y:263},wf:{x:352,w:34,b:250},
  mobs:[['bogslime',1,330],['moss',6,640],['bogslime',6,700],['moss',10,1150],['bogslime',10,1300],['lurker',2,480],['wisp',-2,620],['wisp',-2,1180],['wisp',-2,260]],
  portals:[{x:22,to:7,tx:1440},{x:1380,to:8,tx:70},{x:1240,to:15,tx:70}],props:[['shrine',862],['reeds',140],['reeds',640],['cart',1200]],shrine:{x0:870,x1:930,y:198},
  trees:[[24,112,41,[110,70,250,40]],[1110,1200,43,[1112,60,980,34]]]},
 {id:'gate',name:'The Broken Road',ch:'The Sundering Scar',theme:'dusk',lv:[5,8],req:5,ww:1800,start:70,
  seg:[[0,240,250],[240,140,232],[380,260,250],[640,70,230],[710,300,214],[1010,110,236],[1120,380,250],[1500,300,236],
       [270,80,192,'f'],[450,100,208,'f'],[560,80,170,'f'],[780,100,174,'f'],[930,80,136,'f'],[1180,100,208,'f'],[1300,90,170,'f'],[1560,100,196,'f']],
  mobs:[['husk',0,160],['husk',2,520],['husk',4,840],['husk',6,1240],['husk',6,1420],['husk',7,1660],['raider',2,600],['raider',6,1300],['wolf',7,1700],
        ['wisp',-2,400],['wisp',-2,900],['wisp',-2,1320],['wisp',-2,1650]],
  portals:[{x:22,to:9,tx:1340},{x:1778,to:10,tx:70},{x:1300,to:17,tx:70}],
  props:[['blade',120],['banner',300],['grave',470],['blade',560],['lantern',690],['gatearch',1300],['banner',1180],['grave',1440],['blade',1370],['lantern',1530],['banner',1700],['blade',1600]],
  trees:[[40,105,51,null,1],[1610,1680,53,[1612,80,1500,50],1]]},
 {id:'hollow',name:'Scar Heart',ch:'The Sundering Scar',theme:'blood',lv:[12,12],req:10,ww:960,start:70,
  seg:[[0,960,252],[150,110,206,'f'],[700,110,206,'f'],[390,180,168,'f']],
  mobs:[['warden',0,640]],portals:[{x:22,to:10,tx:1640}],props:[['brazier',110],['pillar',300],['pillar',660],['brazier',860]],trees:[]},
 {id:'road',name:'The Ash Road',ch:'Ashveil Reach',theme:'grove',lv:[1,3],req:1,ww:1300,start:90,
  seg:[[0,300,250],[300,120,240],[420,280,250],[700,90,234],[790,510,250],[330,80,200,'plank'],[560,90,206,'f'],[900,90,204,'f'],[1060,80,196,'f']],
  mobs:[['moss',2,500],['moss',2,640],['moss',4,960],['moss',4,1120],['moss',6,600],['moss',0,250]],
  portals:[{x:1278,to:5,tx:70},{x:1060,to:18,tx:70}],npcs:['ysel','ren'],
  props:[['sign',40],['crates',170],['grave',200],['cart',300],['tent',350],['cart',420],['cairn',520],['fire',726],['tent',770],['lantern',880],['grave',980],['crates',1130],['sign',1220]],
  trees:[[60,140,47,[142,60,260,40]],[1000,1080,49,null]]},
 {id:'town',name:'CrestHollow',ch:'Ashveil Reach',safe:1,theme:'town',lv:[1,1],req:1,ww:1800,start:70,
  seg:[[0,1800,250],[268,64,212,'plank']],
  mobs:[],portals:[{x:22,to:4,tx:1240},{x:1010,to:9,tx:60},{x:1480,to:7,tx:60},{x:1778,to:0,tx:60}],
  labels:[[160,'Wayfarer House',98],[390,'Lantern Annex',62],[560,'Workyard',80],[760,'Charter Hall',98],[900,'Hollow Square',66],[1010,'North Gate',56],[1210,'Founders’ Market',56],[1330,'Freight Yard',98],[1480,'South Gate',56]],
  npcs:['tobin','wren','hesk','nell','holt','pip','tamsin','bram'],
  props:[['palisade',0,1],['house',160,2],['fire',250],['lshrine',390],['forge',560],['rack',670],['house',760,1],['banner',830],['board',900],['banner',960],['well',1100],['crates',1150],['stall',1210],['house',1330,0],['cart',1405],['crates',1430],['palisade',1560,1]],
  trees:[[30,90,57,[92,70,250,44]],[1640,1700,59,null]]},
 {id:'oak',name:'Fallen Oak Grove',ch:'Ashveil Reach',theme:'oak',lv:[3,5],req:2,ww:1500,start:70,
  seg:[[0,300,250],[300,140,234],[440,300,250],[740,120,226],[860,240,214],[1100,400,250],[350,80,192,'f'],[560,100,206,'f'],[900,90,172,'f'],[1180,90,206,'f'],[1320,80,180,'f']],
  mobs:[['moss',0,200],['rotstag',2,520],['moss',2,650],['treant',4,980],['rotstag',5,1250],['moss',5,1400],['boar',5,1150],['moss',7,600],['wisp',-2,380]],
  portals:[{x:22,to:0,tx:1440},{x:1478,to:14,tx:70},{x:1200,to:16,tx:70}],
  props:[['sign',140],['grave',300],['cairn',500],['lantern',760],['deadoak',980],['grave',1250],['pillar',1420]],
  trees:[[40,110,61,null,1],[1300,1370,63,[1302,70,1200,46],1]]},
 {id:'stonebridge',name:'Stonebridge',ch:'Ashveil Reach',safe:1,theme:'town',lv:[2,2],req:2,ww:1500,start:70,
  seg:[[0,540,250],[540,380,296,'bed'],[530,400,250,'bridge'],[920,580,250],[548,18,272,'stone'],[894,18,272,'stone']],
  pools:[{x0:540,x1:920,y:270}],
  mobs:[],portals:[{x:22,to:5,tx:1440},{x:1478,to:1,tx:70}],
  labels:[[140,'Road Company Hall',98],[310,'Caravan Exchange',56],[450,'Iron Market',80],[730,'The Great Bridge',44],[1060,'South Warehouses',98],[1290,'Bridgewright Yard',48]],
  npcs:['marga','oswin','dov'],
  props:[['house',140,0],['stall',310],['forge',450],['banner',525],['banner',935],['house',1060,1],['crates',1150],['cart',1200],['board',1290],['crates',1340],['house',1410,2]],
  trees:[]},
 {id:'bog',name:'Marrowbog',ch:'Ashveil Reach',theme:'bog',lv:[4,6],req:3,ww:1600,start:70,
  seg:[[0,260,250],[260,300,296,'bed'],[560,220,246],[780,260,296,'bed'],[1040,560,250],[300,60,240,'plank'],[420,70,236,'plank'],[820,70,240,'plank'],[930,80,236,'plank'],[1150,90,206,'f'],[1350,80,196,'f'],[275,18,272,'stone'],[540,18,272,'stone'],[795,18,272,'stone'],[1020,18,272,'stone']],
  pools:[{x0:260,x1:560,y:268},{x0:780,x1:1040,y:268}],
  mobs:[['bogslime',0,150],['lurker',1,400],['stalker',2,650],['lurker',3,900],['bogslime',4,1100],['stalker',4,1300],['bogslime',4,1500],['wisp',-2,400],['wisp',-2,1400]],
  portals:[{x:22,to:1,tx:1330},{x:1578,to:13,tx:70}],
  props:[['grave',120],['reeds',250],['reeds',575],['lantern',640],['cart',720],['reeds',770],['reeds',1060],['grave',1150],['cairn',1260],['reeds',1420],['sign',1560]],
  trees:[[40,100,71,null,1],[1180,1240,73,null,1]]},
 {id:'tower',name:'Old Watchtower',ch:'Ashveil Reach',theme:'heath',lv:[3,5],req:3,ww:1400,start:70,
  seg:[[0,300,250],[300,200,236],[500,160,222],[660,300,208],[960,140,224],[1100,300,250],[340,80,196,'f'],[700,100,170,'f'],[1000,80,186,'f']],
  mobs:[['lantern',0,200],['gob',3,720],['gob',3,900],['lantern',5,1200],['wisp',-2,500],['gob',1,400],['husk',5,1300],['wolf',2,560]],
  portals:[{x:22,to:5,tx:1010},{x:1378,to:2,tx:70}],
  props:[['sign',120],['grave',260],['cairn',450],['blade',600],['watchtower',810],['board',880],['crates',1000],['lantern',1150],['banner',1250]],
  trees:[[40,110,81,[112,70,250,44]],[1180,1250,83,null,1]]},
 {id:'scar',name:'Outer Scar',ch:'The Sundering Scar',theme:'scar',lv:[7,9],req:7,ww:1700,start:70,
  seg:[[0,240,250],[240,120,234],[360,200,250],[560,100,228],[660,240,212],[900,120,232],[1020,300,250],[1320,380,236],[290,70,196,'f'],[700,90,170,'f'],[1200,80,200,'f'],[1400,90,192,'f']],
  mobs:[['husk',0,160],['shardslime',2,450],['drake',-2,500],['bear',4,780],['husk',6,1050],['drake',-2,1000],['bear',7,1500],['shardslime',7,1600],['shardslime',6,1250]],
  portals:[{x:22,to:2,tx:1740},{x:960,to:11,tx:70},{x:1678,to:3,tx:70}],shrine:{x0:1108,x1:1168,y:250},
  props:[['shard',120],['shard',330],['gatepiece',470],['shard',620],['shard',760],['banner',920],['shrine',1100],['shard',1290],['shard',1480],['brazier',1600]],
  trees:[]},
 {id:'inner',name:'Inner Scar',ch:'The Sundering Scar',theme:'inner',lv:[9,11],req:9,ww:1600,start:70,
  seg:[[0,260,250],[260,140,232],[400,240,250],[640,120,222],[760,220,206],[980,140,226],[1120,480,250],[300,80,190,'f'],[700,90,160,'f'],[1040,90,186,'f'],[1250,100,200,'f']],
  mobs:[['fiend',0,200],['scargob',2,520],['bear',2,600],['fiend',4,860],['drake',-2,700],['scargob',5,1040],['fiend',6,1200],['shardslime',6,1300],['unbound',6,1480]],
  portals:[{x:22,to:10,tx:930}],
  props:[['shard',140],['sealstone',420],['shard',560],['gatepiece',700],['brazier',830],['shard',1000],['sealstone',1250],['shard',1380],['banner',1560]],
  trees:[]}
,
 {id:'sawmill',name:'Abandoned Sawmill',ch:'Ashveil Reach',theme:'mill',lv:[8,10],req:7,ww:1600,start:70,
  seg:[[0,300,250],[300,140,236],[440,380,250],[820,240,222],[1060,240,296,'bed'],[1300,300,250],[340,90,198,'plank'],[520,120,204,'plank'],[700,90,172,'plank'],[880,110,186,'f'],[1075,18,272,'stone'],[1282,18,272,'stone'],[1140,80,240,'plank'],[1380,90,206,'f']],
  pools:[{x0:1060,x1:1300,y:268}],
  mobs:[['sapslime',2,520],['husk',2,760],['sapslime',7,560],['wolf',3,900],['sapslime',3,1000],['husk',8,740],['sapslime',9,920],['sawtusk',5,1460],['sapslime',13,1420]],
  portals:[{x:22,to:0,tx:980}],
  labels:[[210,'Scrapcap Camp',44]],props:[['sign',120],['crates',176],['fire',236],['tent',318],['logpile',476],['sawblade',600],['mill',700],['logpile',900],['cart',980],['crates',1340],['lantern',1404],['logpile',1530]],
  trees:[[24,96,101,null],[1440,1520,103,[1442,62,1340,40]]]},
 {id:'reach',name:'The Rotting Reach',ch:'Ashveil Reach',theme:'rot',lv:[10,12],req:9,ww:1600,start:70,
  seg:[[0,260,250],[260,280,296,'bed'],[540,240,246],[780,200,232],[980,260,296,'bed'],[1240,360,250],[300,70,238,'plank'],[440,70,234,'plank'],[620,90,200,'f'],[820,90,186,'f'],[1040,70,236,'plank'],[1150,70,232,'plank'],[1300,90,204,'f'],[275,18,272,'stone'],[520,18,272,'stone'],[995,18,272,'stone'],[1220,18,272,'stone']],
  pools:[{x0:260,x1:540,y:268},{x0:980,x1:1240,y:268}],
  mobs:[['sporecap',0,200],['rotfly',-2,420],['sporecap',2,640],['lurker',3,860],['rotfly',-2,880],['sporecap',5,1290],['rotqueen',-2,1120],['rootheart',5,1500],['sporecap',12,1340]],
  portals:[{x:22,to:8,tx:1530}],
  props:[['grave',150],['reeds',282],['shroom',600],['rootmass',720],['deadoak',880],['shroom',1010],['reeds',1250],['rootmass',1390],['shroom',1570]],
  trees:[[30,100,105,null,1]]},
 {id:'mossroot',name:'Mossroot Hollow',ch:'Ashveil Reach',theme:'den',lv:[8,10],req:7,ww:1500,start:70,
  seg:[[0,320,250],[320,160,236],[480,300,250],[780,140,230],[920,200,214],[1120,380,250],[360,90,196,'f'],[560,100,204,'f'],[960,90,174,'f'],[1200,90,206,'f']],
  mobs:[['sporecap',2,720],['rotstag',2,620],['boar',5,1250],['sporecap',4,1000],['wolf',5,1380],['sporecap',8,1000]],
  portals:[{x:22,to:6,tx:1420}],
  labels:[[250,'Mossroot Burrows',44]],props:[['burrow',140],['shroom',226],['lantern',296],['fire',372],['burrow',462],['shroom',640],['shroom',860],['burrow',1070],['shroom',1310],['sign',1440]],
  trees:[]}
,
 {id:'shrine',name:'The Overgrown Shrine',ch:'Ashveil Reach',theme:'grove',lv:[4,6],req:3,ww:1300,start:70,
  seg:[[0,280,250],[280,140,236],[420,300,222],[720,160,236],[880,420,250],[320,80,190,'f'],[500,110,172,'f'],[760,80,196,'f']],
  mobs:[['wisp',-2,380],['lantern',2,600],['wisp',-2,760],['husk',3,780],['lantern',4,1150],['wisp',-2,1180]],
  portals:[{x:22,to:1,tx:1240}],
  props:[['lantern',160],['grave',330],['pillar',480],['shrinegate',1010],['cairn',1200],['lantern',1270]],
  trees:[[40,120,111,[122,64,240,40]],[1190,1270,113,null]]},
 {id:'hermit',name:'Old Hermit’s Hut',ch:'Ashveil Reach',theme:'oak',lv:[3,5],req:3,ww:1000,start:70,
  seg:[[0,360,250],[360,120,238],[480,520,250],[400,80,196,'f'],[720,90,206,'f']],
  mobs:[['rotstag',2,820],['moss',0,250]],
  portals:[{x:22,to:6,tx:1180}],
  props:[['deadoak',190],['lantern',470],['hut',650],['cairn',870]],
  trees:[[880,960,115,null,1]]},
 {id:'outcrop',name:'Shardstone Outcrop',ch:'The Sundering Scar',theme:'scar',lv:[6,8],req:6,ww:1400,start:70,
  seg:[[0,260,250],[260,160,234],[420,260,250],[680,120,228],[800,200,212],[1000,400,250],[300,80,192,'f'],[560,100,200,'f'],[840,90,170,'f'],[1120,90,206,'f']],
  mobs:[['shardslime',2,520],['scargob',4,900],['shardslime',5,1150],['drake',-2,700],['husk',0,180]],
  portals:[{x:22,to:2,tx:1300}],
  props:[['shard',200],['tent',320],['crates',380],['shard',600],['sealstone',760],['shard',960],['shard',1230],['brazier',1330]],
  trees:[]},
 {id:'hunt',name:'Hunter’s Camp',ch:'Ashveil Reach',safe:1,theme:'grove',lv:[2,2],req:2,ww:1000,start:70,
  seg:[[0,1000,250],[300,80,206,'plank']],
  mobs:[],portals:[{x:22,to:4,tx:1060}],
  labels:[[500,'Hunter’s Camp',56]],props:[['tent',220],['rack',330],['fire',440],['tent',680],['crates',770],['cart',860]],
  trees:[[30,110,117,[112,60,250,40]],[880,960,119,null]]}
];
/* Edge margin: every zone gets extra walkable-looking ground past its exits, so the camera can keep
   the player and the edge portals clear of the touch controls. */
const EDGE=190;
function prepZone(z){const E=EDGE,ww=z.ww;z.seg=z.seg.map(([x,w,y,t])=>[x+E,w,y,t]);
  const L0=z.seg.filter(s=>!s[3]&&s[0]===E).sort((a,b)=>a[2]-b[2])[0],R0=z.seg.filter(s=>!s[3]&&s[0]+s[1]===ww+E).sort((a,b)=>a[2]-b[2])[0];
  if(L0)z.seg.push([0,E,L0[2]]);if(R0)z.seg.push([ww+E,E,R0[2]]);
  z.mobs=z.mobs.map(([t,si,x])=>[t,si,x+E]);z.portals.forEach(p=>{p.x+=E;p.tx+=E});(z.props||[]).forEach(p=>p[1]+=E);(z.labels||[]).forEach(p=>p[0]+=E);
  (z.pools||(z.pool?[z.pool]:[])).forEach(p=>{p.x0+=E;p.x1+=E});if(z.wf)z.wf.x+=E;if(z.shrine){z.shrine.x0+=E;z.shrine.x1+=E}z.start+=E;
  const tE=Math.round(E*.85);z.trees=(z.trees||[]).map(([a,b,s,br,d])=>[a+tE,b+tE,s,br?[br[0]+tE,br[1],br[2]+tE,br[3]]:br,d]);
  z.ww=ww+2*E;z.x0=E;z.x1=ww+E;prepZone2(z)}
function prepZone2(z){z.npcs=z.npcs||[];z.mobs.forEach((d,i)=>{d[3]=z.lv[0]+Math.floor(hash(i,z.lv[0]*31+z.ww,7)*(z.lv[1]-z.lv[0]+1))});z.pools=z.pools||(z.pool?[z.pool]:[]);z.SEG=z.seg.map(([x,w,y,t])=>({x,w,y,t:t==='f'||t==='stone'||t==='plank'||t==='bridge'?'float':'solid',stone:t==='stone',bed:t==='bed',plank:t==='plank',bridge:t==='bridge'}))}
ZONES.forEach(prepZone);
let Z=ZONES[0],TH={...RAMP},SEG=Z.SEG;
/* where a person can stand: the ground, or a bridge/dock/plank deck above water */
function standAt(x){const g=topAt(x),pool=(Z.pools||[]).find(p=>x>=p.x0&&x<=p.x1);if(!pool||g<=pool.y)return g;let best=null;for(const s of SEG)if(s.t==='float'&&x>=s.x+4&&x<=s.x+s.w-4&&s.y<=pool.y+2&&s.y>pool.y-60&&(best===null||s.y>best))best=s.y;return best??g}
const dryAt=x=>{const pool=(Z.pools||[]).find(p=>x>=p.x0&&x<=p.x1);return !pool||standAt(x)<=pool.y+2};
function topAt(x){let best=null;for(const s of SEG)if(s.t==='solid'&&x>=s.x&&x<=s.x+s.w&&(best===null||s.y<best))best=s.y;return best??(250+((Z&&Z.tall)||0))}

/* ---------- terrain ---------- */
function boulder(L,cx,cy,rx,ry,ramp,seed,moss,clip){
  for(let y=Math.floor(cy-ry-2);y<=cy+ry+2;y++)for(let x=Math.floor(cx-rx-2);x<=cx+rx+2;x++){
    if(clip&&(x<clip[0]||x>clip[1]||y<clip[2]))continue;
    const nx=(x-cx)/rx,ny=(y-cy)/ry,h0=nx*nx+ny*ny;if(h0>1.4161)continue;const ang=Math.atan2(ny,nx),edge=1+(vn(ang*2+seed*.13,seed*.7,seed)-.5)*.38,r=Math.hypot(nx,ny)/edge;if(r>1)continue;
    const nz=Math.sqrt(Math.max(0,1-r*r)),light=-.55*nx/edge-.7*ny/edge+.5*nz;let t=.22+light*.62+(fbm(x*.16,y*.16,seed)-.5)*.42;
    let col;if(r>1-1.5/Math.min(rx,ry))col=ramp[0];
    else if(moss&&ny<-.15&&fbm(x*.22,y*.22,seed+3)>.36+(ny+1)*.42)col=pick(TH.moss,t+.1,x,y);
    else{col=pick(ramp,t,x,y);if(r<.8&&fbm(x*.5,y*.08,seed+9)>.74)col=ramp[1]}
    sp(L,x,y,col)}}
function grassTop(L,x0,x1,y,seed){
  for(let x=Math.floor(x0);x<x1;x++){const hh=1+Math.floor(hash(x,y,seed)*3)+(hash(x,1,seed)>.86?3:0);
    sp(L,x,y,TH.grass[2]);sp(L,x,y+1,TH.moss[2]);sp(L,x,y+2,TH.moss[1]);if(hash(x,3,seed)>.45)sp(L,x,y+3,TH.moss[0]);
    if(hash(x,5,seed)>.9)for(let k=0;k<2+hash(x,6,seed)*6;k++)sp(L,x,y+3+k,TH.moss[k<2?1:0]);
    for(let k=0;k<hh;k++)sp(L,x,y-1-k,TH.grass[Math.min(5,2+k+(hash(x,k,seed)>.55?1:0))]);
    if(hash(x,8,seed)>.965){const c=hash(x,9,seed)>.5?[236,226,190]:[226,96,80];sp(L,x,y-hh-1,c);sp(L,x-1,y-hh,c);sp(L,x+1,y-hh,c)}}}
function fern(L,x,y,seed){for(let i=-3;i<=3;i++){const len=6+Math.abs(3-Math.abs(i))*2;for(let k=0;k<len;k++){const px=x+i*k*.45,py=y-k*(1-Math.abs(i)*.12)+(k*k*.04*Math.abs(i));sp(L,px,py,TH.leaf[Math.min(7,2+(k>len*.6?2:1)+(i<0?0:1))])}}}
function fillSeg(L,s,seed){
  if(s.bridge){const r=TH.rock,bt=300;for(const px of[s.x+70,s.x+s.w/2,s.x+s.w-70])for(let y=s.y+8;y<bt;y++)for(let x=px-9;x<px+9;x++){const e=x<px-7||x>px+6;sp(L,x,y,e?r[1]:pick(r,.45+(px-x)/30+(fbm(x*.3,y*.3,7)-.5)*.3,x,y))}
    for(let k=0;k<2;k++){const a0=[s.x+70,s.x+s.w/2][k],a1=[s.x+s.w/2,s.x+s.w-70][k],mid=(a0+a1)/2,hw=(a1-a0)/2-9;for(let x=a0+9;x<a1-9;x++){const u=(x-mid)/hw,yy=s.y+8+Math.round(28*(1-Math.sqrt(Math.max(0,1-u*u))));for(let y=s.y+6;y<yy;y++)sp(L,x,y,pick(r,.4+(fbm(x*.3,y*.3,9)-.5)*.3,x,y));sp(L,x,yy,r[1])}}
    for(let x=s.x;x<s.x+s.w;x++){for(let y=s.y;y<s.y+7;y++){const row=y-s.y,edge=(x+(row>3?4:0))%9===0||row===3;sp(L,x,y,row===0?r[5]:edge?r[1]:pick(r,.5+hash(Math.floor(x/9),row>3?1:0,4)*.25,x,y))}
      if((x-s.x)%40<3)for(let y=s.y-9;y<s.y;y++)sp(L,x,y,(x-s.x)%40===0?r[5]:r[3]);else{sp(L,x,s.y-7,r[4]);sp(L,x,s.y-6,r[2])}}return}
  if(s.plank){const w=TH.wood,gy=topAt(s.x+s.w/2);for(const px of[s.x+6,s.x+s.w-8])for(let y=s.y+4;y<gy;y++){sp(L,px,y,w[2]);sp(L,px+1,y,w[3]);sp(L,px+2,y,w[1])}
    for(let k=0;k<s.w-16;k++){const y=s.y+5+Math.round(k*(gy-s.y-8)/(s.w-16)*.35);sp(L,s.x+8+k,y,w[1])}
    for(let x=s.x;x<s.x+s.w;x++){sp(L,x,s.y,w[5]);sp(L,x,s.y+1,w[4]);sp(L,x,s.y+2,(x-s.x)%9===0?w[1]:w[3]);sp(L,x,s.y+3,w[2]);sp(L,x,s.y+4,w[0])}return}
  const bottom=s.t==='float'?s.y+(s.stone?10:22):WH+10,rows=[];for(let yy=s.y+3;yy<bottom;yy+=13)rows.push(yy);
  const clip=[s.x-3,s.x+s.w+3,s.y-3];
  for(let ri2=rows.length-1;ri2>=0;ri2--){let xx=s.x-6+(ri2%2)*7;
    while(xx<s.x+s.w+4){const small=s.bed||s.stone,rx=(small?5:7)+hash(xx,ri2,seed)*(small?5:8),ry=(small?4:6)+hash(ri2,xx,seed)*(small?3:5);
      const cy=ri2===0?s.y+ry-2:rows[ri2]+ry*.45;
      if(s.t==='float'&&ri2>0&&(xx<s.x+12||xx>s.x+s.w-12)){xx+=rx;continue}
      const ramp=s.bed?TH.rockW:hash(xx,7,seed)>.72?TH.rockW:TH.rock;
      boulder(L,xx+rx*.8,cy,rx,ry,ramp,seed+xx*3+ri2*17,ri2===0&&!s.bed,clip);xx+=rx*1.45+hash(xx,9,seed)*4}}
  if(!s.bed)grassTop(L,s.x-1,s.x+s.w+1,s.y,seed);
}
function buildTerrain(){
  const L=layer(WW,WH);
  SEG.forEach((s,i)=>fillSeg(L,s,i*101+5+Z.ww));
  if(!THEMES[Z.theme].noFern)SEG.forEach((s,i)=>{if(s.bed||s.stone)return;for(let x=s.x+8;x<s.x+s.w-8;x+=18+hash(x,i,3)*30){if(hash(x,i,4)>.55)fern(L,x,s.y-1,i);else if(hash(x,i,5)>.7){sp(L,x,s.y-2,[226,214,186]);sp(L,x-1,s.y-3,[212,72,58]);sp(L,x,s.y-3,[212,72,58]);sp(L,x+1,s.y-3,[212,72,58]);sp(L,x,s.y-4,[236,120,96])}}});
  if(Z.theme==='town')SEG.forEach((sg,i)=>{if(sg.t!=='solid')return;for(let x=sg.x;x<sg.x+sg.w;x++){for(let y=sg.y-7;y<sg.y-1;y++)if(hash(x,y,9)>.12||y<sg.y-3)sp(L,x,y,[0,0,0],0);
    const bx=Math.floor((x+(hash(Math.floor(x/7),1,4)*3|0))/7);for(let y=sg.y-1;y<sg.y+4;y++){const row=Math.floor((y-sg.y+1)/3),edge=(x+row*3)%7===0||(y-sg.y+1)%3===2;sp(L,x,y,edge?TH.rock[1]:pick(TH.rock,.45+hash(bx,row,5)*.35,x,y))}}});
  commit(L);Z.glows=[];for(const[k,x,v]of Z.props)PROPS[k](L.x,x,topAt(x),v);
  for(const po of Z.portals){po.y=po.yy??topAt(po.x);if(po.cave)caveMouth(L.x,po.x,po.y);else portalArch(L.x,po.x,po.y)}
  for(const id of Z.npcs){const n=NPCS[id];n.y=standAt(n.x);if(n.sprite==='elder')elder(L.x,n.x,n.y)}
  return L.c}

/* ---------- props (pixel rects) ---------- */
const rgb=c=>`rgb(${c})`;
function rr(x){return(a,b,c,d,col)=>{x.fillStyle=col;x.fillRect(a|0,b|0,c,d)}}
const PROPS={
  shrine(x,X0,Y){const w=TH.wood.map(rgb),Rr=rr(x);
    Rr(X0-6,Y-38,84,36,w[0]);
    Rr(X0+30,Y-18,10,12,'#3d4243');Rr(X0+31,Y-18,8,2,'#687062');Rr(X0+34,Y-22,2,4,'#ffd27a');Rr(X0+33,Y-23,4,1,'#ffb24a');Z.glows.push([X0+35,Y-20,24,'255,200,110']);
    [[X0+2,w[1]],[X0+62,w[1]]].forEach(([px,c])=>Rr(px,Y-46,5,40,c));
    [X0+8,X0+56].forEach(px=>{Rr(px,Y-48,7,44,w[3]);Rr(px,Y-48,2,44,w[5]);Rr(px+5,Y-48,2,44,w[2]);[Y-40,Y-14].forEach(b=>{Rr(px-1,b,9,2,w[4]);Rr(px-1,b+2,9,1,w[1])});Rr(px-2,Y-6,11,3,w[2])});
    Rr(X0-6,Y-6,84,5,w[3]);Rr(X0-6,Y-6,84,1,w[5]);Rr(X0-6,Y-2,84,2,w[1]);Rr(X0+22,Y-1,26,2,w[2]);
    Rr(X0-4,Y-54,80,6,w[3]);Rr(X0-4,Y-54,80,1,w[5]);Rr(X0,Y-48,72,3,w[1]);for(let i=0;i<12;i++)Rr(X0+2+i*6,Y-52,3,2,i%2?w[5]:w[1]);
    x.strokeStyle='#c9a86a';x.lineWidth=2;x.beginPath();x.moveTo(X0+8,Y-44);x.quadraticCurveTo(X0+35,Y-36,X0+62,Y-44);x.stroke();
    for(let i=0;i<9;i++)Rr(X0+10+i*6,Y-44+Math.round(Math.sin(i/8*Math.PI)*5),1,2,'#6b5530');
    [X0+16,X0+35,X0+54].forEach(px=>{const py=Y-41+(px===X0+35?3:0);Rr(px,py,2,2,'#fff');Rr(px+1,py+2,2,2,'#e8e8e8');Rr(px,py+4,2,2,'#fff')});
    Rr(X0-12,Y-62,96,8,w[2]);Rr(X0-12,Y-62,96,2,w[4]);Rr(X0-12,Y-55,96,1,w[0]);Rr(X0-16,Y-64,6,4,w[3]);Rr(X0+82,Y-64,6,4,w[3]);Rr(X0-18,Y-67,4,3,w[4]);Rr(X0+86,Y-67,4,3,w[4]);
    Rr(X0-2,Y-72,76,10,w[3]);Rr(X0-2,Y-72,76,2,w[5]);for(let i=0;i<19;i++)Rr(X0+i*4,Y-69,1,6,w[1]);
    Rr(X0+4,Y-78,64,6,w[2]);Rr(X0+4,Y-78,64,1,w[4]);
    [[X0+2,1],[X0+66,1],[X0+34,1.4]].forEach(([px,s])=>{const b=Math.round(4*s);Rr(px-b/2,Y-82,b+2,4,w[2]);Rr(px-b/2+1,Y-88,b,6,w[4]);Rr(px-b/2+1,Y-88,2,6,w[6]);Rr(px,Y-92,2,4,w[3]);Rr(px,Y-94,2,2,w[5])});
    const m=TH.moss.map(rgb);for(let i=0;i<40;i++){const px=X0-10+Math.floor(hash(i,1,77)*92),py=Y-64+Math.floor(hash(i,2,77)*3)-(hash(i,3,77)>.5?14:0);Rr(px,py,2+Math.floor(hash(i,4,77)*3),1,m[2+Math.floor(hash(i,5,77)*3)])}
    for(let i=0;i<5;i++){const px=X0+60+i*2;for(let k=0;k<8+i*3;k++)Rr(px+(k%3===0?1:0),Y-46+k,1,1,m[k%2?3:4])}
    Rr(X0+80,Y-16,22,2,w[3]);Rr(X0+80,Y-16,22,1,w[5]);[X0+82,X0+92,X0+100].forEach(px=>Rr(px,Y-14,2,12,w[2]))},
  lantern(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);Rr(X-6,Y-3,12,3,s[3]);Rr(X-6,Y-3,12,1,s[5]);Rr(X-2,Y-13,4,10,s[3]);Rr(X-2,Y-13,1,10,s[5]);
    Rr(X-5,Y-21,10,8,s[2]);Rr(X-3,Y-19,6,4,'#ffb24a');Rr(X-2,Y-18,4,2,'#ffe2a0');Rr(X-7,Y-24,14,3,s[4]);Rr(X-7,Y-24,14,1,s[6]);Rr(X-3,Y-26,6,2,s[4]);Rr(X-1,Y-28,2,2,s[5]);
    Rr(X-7,Y-25,5,1,rgb(TH.moss[3]));Z.glows.push([X,Y-17,18,'255,190,110'])},
  sign(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);Rr(X-1,Y-20,3,20,w[2]);Rr(X-1,Y-20,1,20,w[4]);Rr(X-9,Y-22,18,7,w[3]);Rr(X-9,Y-22,18,1,w[5]);Rr(X-9,Y-16,18,1,w[1]);Rr(X-6,Y-20,4,1,w[1]);Rr(X+1,Y-20,6,1,w[1]);Rr(X-5,Y-18,9,1,w[1])},
  pillar(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);Rr(X-6,Y-44,12,44,s[3]);Rr(X-6,Y-44,3,44,s[5]);Rr(X+3,Y-44,3,44,s[2]);Rr(X-8,Y-6,16,6,s[3]);Rr(X-8,Y-6,16,1,s[5]);
    Rr(X-6,Y-48,4,4,s[3]);Rr(X+1,Y-46,5,2,s[3]);[[1,-38],[2,-34],[1,-30],[0,-26]].forEach(([dx,dy])=>Rr(X+dx,Y+dy,1,3,s[0]));Rr(X-6,Y-45,12,2,rgb(TH.moss[3]));Rr(X-4,Y-43,2,6,rgb(TH.moss[2]))},
  gatepiece(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);Rr(X-22,Y-14,44,14,s[3]);Rr(X-22,Y-14,44,2,s[5]);Rr(X-22,Y-2,44,2,s[1]);Rr(X-18,Y-11,36,2,'#8f2a22');Rr(X-18,Y-9,36,1,'#d4483a');
    for(let i=0;i<6;i++)Rr(X-16+i*6,Y-7,3,3,s[1]);Rr(X+12,Y-26,10,12,s[3]);Rr(X+12,Y-26,10,2,s[5]);Rr(X+14,Y-22,6,1,'#d4483a');Rr(X-22,Y-15,16,2,rgb(TH.moss[3]))},
  banner(x,X,Y){const Rr=rr(x);Rr(X,Y-46,2,46,'#1c1420');Rr(X-1,Y-48,4,2,'#e3b04b');Rr(X+2,Y-44,10,20,'#8f2a22');Rr(X+2,Y-44,10,1,'#d4483a');Rr(X+3,Y-43,8,18,'#b23a2e');
    [[3,-24],[6,-23],[9,-25],[11,-22]].forEach(([dx,dy])=>Rr(X+dx,Y+dy,2,2,'#8f2a22'));Rr(X+5,Y-38,4,4,'#f2e6c8');Rr(X+6,Y-37,2,2,'#8f2a22')},
  grave(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);Rr(X-1,Y-18,3,18,w[2]);Rr(X-6,Y-14,13,3,w[3]);Rr(X-6,Y-14,13,1,w[5]);Rr(X-3,Y-11,2,8,'#b23a2e');Rr(X-2,Y-4,1,3,'#8f2a22');Rr(X-5,Y-1,11,2,rgb(TH.moss[2]))},
  blade(x,X,Y){const Rr=rr(x);for(let i=0;i<20;i++)Rr(X+Math.round(i*.3),Y-i,1,1,i>17?'#ffffff':'#c8d2d8');for(let i=0;i<20;i++)Rr(X+1+Math.round(i*.3),Y-i,1,1,'#7d8a94');
    Rr(X+4,Y-22,5,2,'#e3b04b');Rr(X+6,Y-28,2,6,'#1c1420');Rr(X+6,Y-27,2,1,'#d4483a');Rr(X+6,Y-25,2,1,'#d4483a');Rr(X+5,Y-30,4,2,'#e3b04b')},
  gatearch(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);[X-40,X+26].forEach(px=>{Rr(px,Y-86,14,86,s[3]);Rr(px,Y-86,4,86,s[5]);Rr(px+10,Y-86,4,86,s[2]);for(let k=0;k<6;k++)Rr(px,Y-80+k*14,14,1,s[1]);Rr(px-3,Y-8,20,8,s[3])});
    Rr(X-46,Y-96,50,12,s[3]);Rr(X-46,Y-96,50,2,s[5]);Rr(X-42,Y-90,40,2,'#8f2a22');Rr(X+16,Y-92,26,8,s[3]);Rr(X+16,Y-92,26,1,s[5]);Rr(X+22,Y-88,14,1,'#8f2a22');
    Rr(X+4,Y-96,6,4,s[2]);Rr(X+8,Y-12,10,12,s[3]);Rr(X-2,Y-6,8,6,s[2]);Rr(X-46,Y-97,22,2,rgb(TH.moss[3]));Rr(X+26,Y-87,14,2,rgb(TH.moss[3]))},
  brazier(x,X,Y){const Rr=rr(x);Rr(X-1,Y-14,3,14,'#2a2226');Rr(X-6,Y-1,13,2,'#2a2226');Rr(X-7,Y-18,15,4,'#3a3036');Rr(X-7,Y-18,15,1,'#5a4a50');Rr(X-5,Y-21,11,3,'#ff7a3d');Rr(X-3,Y-23,7,2,'#ffb24a');Rr(X-1,Y-25,3,2,'#ffe2a0');
    Z.glows.push([X,Y-20,30,'255,110,60'])},
  house(x,X,Y,v){v=v|0;const w=TH.wood.map(rgb),s=TH.rock.map(rgb),Rr=rr(x),PL=[['#d9c9a0','#b8a47c','#efe2c0'],['#c9b48e','#a08a66','#e0d0aa'],['#cdbf9e','#a89a78','#e6dcc0']][v%3],
    RF=[['#3a1814','#52221a','#6c2e20','#8a3c26'],['#1e2a24','#2c3e32','#3c5240','#506a50'],['#2a1e30','#3c2a40','#523a52','#6a4c66']][v%3];
    Rr(X+20,Y-88,9,30,s[2]);Rr(X+20,Y-88,3,30,s[4]);Rr(X+19,Y-90,11,3,s[3]);
    Rr(X-44,Y-50,88,40,PL[0]);for(let i=0;i<60;i++)Rr(X-44+Math.floor(hash(i,1,X)*86),Y-50+Math.floor(hash(i,2,X)*38),2,1,hash(i,3,X)>.5?PL[1]:PL[2]);
    Rr(X-44,Y-50,88,3,PL[1]);
    [X-46,X-16,X+13,X+42].forEach(px=>{Rr(px,Y-50,4,40,w[2]);Rr(px,Y-50,1,40,w[4])});Rr(X-46,Y-32,92,3,w[2]);Rr(X-46,Y-32,92,1,w[4]);Rr(X-46,Y-52,92,3,w[1]);
    for(let k=0;k<17;k++){Rr(X-42+k,Y-49+k,2,1,w[2]);Rr(X+40-k,Y-49+k,2,1,w[2])}
    Rr(X-7,Y-30,14,20,w[0]);Rr(X-6,Y-29,12,19,w[2]);for(let px=X-6;px<X+6;px+=3)Rr(px,Y-29,1,19,w[1]);Rr(X-8,Y-31,16,2,w[4]);Rr(X+3,Y-20,2,2,'#e3b04b');
    [[X-36],[X+22]].forEach(([px])=>{Rr(px,Y-44,14,10,w[1]);Rr(px+1,Y-43,12,8,'#ffb24a');Rr(px+2,Y-42,10,3,'#ffe2a0');Rr(px+7,Y-43,1,8,w[1]);Rr(px+1,Y-39,12,1,w[1]);Rr(px-1,Y-34,16,2,w[3]);Z.glows.push([px+7,Y-39,20,'255,190,110'])});
    Rr(X-22,Y-24,10,8,w[1]);Rr(X-21,Y-23,8,6,'#3a2416');Rr(X-21,Y-17,8,2,'#4c8a30');Rr(X-20,Y-18,2,1,'#d4483a');Rr(X-16,Y-18,2,1,'#e8a0b4');
    for(let k=0;k<30;k++){const xl=X-54+k*1.75,ww=108-k*3.5;if(ww<2)break;Rr(xl,Y-52-k,ww,1,k%4===3?RF[0]:k<3?RF[3]:RF[1+(k>>3)%2])}
    for(let k=0;k<30;k++){const xl=X-54+k*1.75;Rr(xl,Y-52-k,2,1,RF[3])}
    Rr(X-56,Y-52,112,2,RF[0]);const m=TH.moss.map(rgb);for(let i=0;i<24;i++){const k=Math.floor(hash(i,4,X)*20);Rr(X-50+k*1.75+hash(i,5,X)*(100-k*3.5),Y-52-k,2,1,m[2+(i%3)])}
    Rr(X-50,Y-10,100,10,s[3]);Rr(X-50,Y-10,100,1,s[5]);for(let i=0;i<10;i++)Rr(X-48+i*10+(i%2)*4,Y-6,1,6,s[1]);Rr(X-50,Y-5,100,1,s[1]);
    Rr(X-9,Y-10,18,3,s[4]);Rr(X-12,Y-7,24,3,s[3])},
  stall(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-26,X+24].forEach(px=>{Rr(px,Y-40,3,40,w[2]);Rr(px,Y-40,1,40,w[4])});
    for(let i=0;i<9;i++){Rr(X-30+i*7,Y-46,7,8,i%2?'#f2e6c8':'#b23a2e');Rr(X-30+i*7,Y-38,7,2,i%2?'#d9c9a0':'#8f2a22');Rr(X-28+i*7,Y-36,3,2,i%2?'#d9c9a0':'#8f2a22')}Rr(X-31,Y-47,64,2,w[1]);
    Rr(X-28,Y-18,56,4,w[4]);Rr(X-28,Y-18,56,1,w[6]);Rr(X-26,Y-14,52,14,w[2]);for(let px=X-26;px<X+26;px+=6)Rr(px,Y-14,1,14,w[1]);
    [['#c8d468',-22],['#d4483a',-15],['#e3b04b',-8],['#86b47f',0],['#6ec6e2',8],['#d4483a',16]].forEach(([c,dx],i)=>{Rr(X+dx,Y-22,5,4,c);Rr(X+dx+1,Y-23,3,1,c);Rr(X+dx+1,Y-21,1,1,'#fff')});
    Rr(X-20,Y-33,3,5,'#86b47f');Rr(X-12,Y-34,3,6,'#d4483a');Rr(X+10,Y-32,4,4,'#e3b04b');Rr(X-21,Y-35,40,1,'#5a3a20')},
  well(x,X,Y){const w=TH.wood.map(rgb),s=TH.rock.map(rgb),Rr=rr(x);Rr(X-16,Y-14,32,14,s[3]);Rr(X-16,Y-14,32,2,s[5]);for(let i=0;i<4;i++)Rr(X-15+i*8+(i%2)*3,Y-11,1,10,s[1]);Rr(X-16,Y-7,32,1,s[1]);
    [X-14,X+11].forEach(px=>{Rr(px,Y-40,3,26,w[2]);Rr(px,Y-40,1,26,w[4])});for(let k=0;k<8;k++)Rr(X-20+k*2,Y-42-k,40-k*4,1,k%3?'#52221a':'#3a1814');Rr(X-12,Y-34,24,2,w[1]);
    Rr(X-1,Y-33,1,10,'#8a7a60');Rr(X-4,Y-24,7,6,w[3]);Rr(X-4,Y-24,7,1,w[5]);Rr(X-3,Y-22,5,1,'#6ec6e2')},
  board(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-14,X+12].forEach(px=>Rr(px,Y-36,3,36,w[2]));Rr(X-18,Y-38,36,3,w[4]);Rr(X-16,Y-34,32,20,w[3]);Rr(X-16,Y-34,32,1,w[5]);
    [[-13,-31,8,9],[-3,-32,7,7],[6,-30,8,10],[-9,-21,9,6]].forEach(([a,b,c,d],i)=>{Rr(X+a,Y+b,c,d,i===3?'#e8c890':'#efe4c8');Rr(X+a+1,Y+b+2,c-2,1,'#8a7a60');Rr(X+a+1,Y+b+4,c-3,1,'#8a7a60');Rr(X+a+c/2|0,Y+b,1,1,'#d4483a')})},
  palisade(x,X,Y,v){const w=TH.wood.map(rgb),Rr=rr(x),d=v?1:-1;for(let i=0;i<9;i++){const px=X+d*(i*7),hh=60+(i%3)*4;Rr(px-3,Y-hh,7,hh,w[2]);Rr(px-3,Y-hh,2,hh,w[4]);Rr(px+3,Y-hh,1,hh,w[0]);Rr(px-2,Y-hh-3,5,3,w[3]);Rr(px-1,Y-hh-5,3,2,w[4])}
    Rr(Math.min(X,X+d*56)-3,Y-42,62,3,w[1]);Rr(Math.min(X,X+d*56)-3,Y-20,62,3,w[1]);const tx=X+d*62;Rr(tx-8,Y-84,16,84,w[3]);Rr(tx-8,Y-84,3,84,w[5]);Rr(tx-12,Y-90,24,6,w[2]);Rr(tx-12,Y-90,24,1,w[4]);
    for(let k=0;k<10;k++)Rr(tx-14+k,Y-90-k,28-k*2,1,k%3?'#52221a':'#3a1814');Rr(tx-3,Y-78,6,6,'#ffb24a');Rr(tx-2,Y-77,4,2,'#ffe2a0');Z.glows.push([tx,Y-75,22,'255,190,110']);Rr(tx-6,Y-46,12,2,w[1])},
  forge(x,X,Y){const s=TH.rock.map(rgb),w=TH.wood.map(rgb),Rr=rr(x);Rr(X-6,Y-70,14,40,s[2]);Rr(X-6,Y-70,4,40,s[4]);Rr(X-20,Y-30,40,30,s[3]);Rr(X-20,Y-30,40,2,s[5]);for(let i=0;i<4;i++)Rr(X-19,Y-24+i*6,38,1,s[1]);
    Rr(X-10,Y-22,20,12,'#1a0d08');Rr(X-8,Y-16,16,6,'#ff7a3d');Rr(X-6,Y-18,12,3,'#ffb24a');Rr(X-3,Y-19,6,2,'#ffe2a0');Z.glows.push([X,Y-16,34,'255,120,50']);
    Rr(X+28,Y-12,18,4,'#3a3540');Rr(X+28,Y-12,18,1,'#6a6578');Rr(X+33,Y-8,8,8,'#2a2630');Rr(X+26,Y-11,4,2,'#3a3540');
    Rr(X-40,Y-16,14,10,w[3]);Rr(X-40,Y-16,14,1,w[5]);Rr(X-26,Y-13,6,3,w[1]);Rr(X-38,Y-6,2,6,w[1]);Rr(X-30,Y-6,2,6,w[1]);
    Rr(X+22,Y-30,2,30,w[2]);Rr(X+20,Y-30,8,2,w[3]);[0,4,8].forEach(k=>Rr(X+24,Y-26+k,6,1,'#9aa6ae'))},
  fire(x,X,Y){const Rr=rr(x),w=TH.wood.map(rgb),s=TH.rock.map(rgb);for(let i=0;i<5;i++)Rr(X-10+i*4,Y-3,4,3,s[2+(i%2)]);Rr(X-8,Y-5,16,2,w[2]);Rr(X-6,Y-7,12,2,w[3]);
    Rr(X-5,Y-12,10,6,'#ff7a3d');Rr(X-3,Y-16,6,6,'#ffb24a');Rr(X-1,Y-19,3,5,'#ffe2a0');Rr(X+2,Y-14,2,3,'#ffb24a');Z.glows.push([X,Y-10,30,'255,140,60'])},
  tent(x,X,Y){const Rr=rr(x);for(let k=0;k<28;k++){const ww=48-k*1.7;Rr(X-ww/2,Y-1-k,ww,1,k%5===0?'#a08a66':'#cdbf9e');Rr(X-ww/2,Y-1-k,2,1,'#8a7a5a')}
    for(let k=0;k<20;k++)Rr(X-k*.4,Y-1-k,Math.max(1,10-k*.5),1,'#3a2a20');Rr(X-1,Y-32,2,6,TH.wood.map(rgb)[2]);Rr(X+1,Y-32,6,3,'#b23a2e')},
  cart(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);Rr(X-20,Y-16,36,8,w[3]);Rr(X-20,Y-16,36,1,w[5]);for(let px=X-20;px<X+16;px+=6)Rr(px,Y-16,1,8,w[1]);Rr(X+16,Y-12,14,2,w[2]);
    [[X-12,0],[X+8,1]].forEach(([cx,b])=>{for(let a=0;a<12;a++){const an=a/12*6.28;Rr(cx+Math.cos(an)*6,Y-6+Math.sin(an)*6,2,2,b&&a>7?'#000':w[1])}Rr(cx-1,Y-7,2,2,w[4])});Rr(X-18,Y-20,10,4,'#a08a66');Rr(X-4,Y-21,8,5,'#8a6a48')},
  crates(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);const box=(a,b,sz)=>{Rr(a,b-sz,sz,sz,w[3]);Rr(a,b-sz,sz,1,w[5]);Rr(a,b-sz,1,sz,w[4]);Rr(a+sz-1,b-sz,1,sz,w[1]);for(let k=1;k<sz-1;k++)Rr(a+k,b-sz+k,1,1,w[2])};
    box(X-14,Y,14);box(X,Y,12);box(X-9,Y-14,11);Rr(X+14,Y-14,9,14,w[2]);Rr(X+14,Y-11,9,1,'#3a3540');Rr(X+14,Y-4,9,1,'#3a3540');Rr(X+15,Y-14,2,14,w[4])},
  cairn(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);[[0,0,16,6],[2,-6,12,6],[4,-11,8,5],[5,-15,6,4]].forEach(([a,b,c,d],i)=>{Rr(X-8+a,Y-d+b,c,d,s[3+(i%2)]);Rr(X-8+a,Y-d+b,c,1,s[5])});Rr(X-2,Y-18,4,3,'#d4483a');Rr(X-1,Y-21,2,3,'#f2e6c8')},
  lshrine(x,X,Y){const s=TH.rock.map(rgb),w=TH.wood.map(rgb),Rr=rr(x);Rr(X-8,Y-46,16,40,s[3]);Rr(X-8,Y-46,4,40,s[5]);Rr(X-10,Y-50,20,5,s[4]);Rr(X-10,Y-50,20,1,s[6]);Rr(X-4,Y-38,8,10,s[1]);Rr(X-2,Y-36,4,6,'#ffd27a');Z.glows.push([X,Y-33,26,'255,210,130']);
    Rr(X-14,Y-6,28,6,s[3]);Rr(X-14,Y-6,28,1,s[5]);for(const dx of[-26,22]){Rr(X+dx,Y-40,2,40,w[2]);Rr(X+dx-3,Y-30,8,8,'#b23a2e');Rr(X+dx-2,Y-29,6,6,'#ffb24a');Z.glows.push([X+dx+1,Y-26,16,'255,170,90'])}
    Rr(X-26,Y-42,50,1,'#c9a86a');[-20,-12,10,16].forEach((dx,i)=>Rr(X+dx,Y-41,2,6+i%2*2,i%2?'#f2e6c8':'#d4483a'));[-10,-5,4,9].forEach(dx=>{Rr(X+dx,Y-10,2,4,'#efe4c8');Rr(X+dx,Y-12,2,2,'#ffb24a')})},
  deadoak(x,X,Y){const b=TH.bark.map(rgb),m=TH.moss.map(rgb),Rr=rr(x);for(let y=0;y<150;y++){const hw=18+Math.max(0,(y-110)*.9)+Math.sin(y*.15)*2;for(let k=-hw;k<hw;k+=1){const u=(k+hw)/(2*hw);Rr(X+k,Y-y,1,1,b[Math.min(6,Math.max(0,Math.round(1+Math.sin(u*Math.PI)*3.5-(hash(X+k|0,y,7)>.8?1:0))))])}}
    [[-1,150,-60,190],[1,140,70,175],[-1,120,-48,140],[1,105,40,118]].forEach(([d,y0,dx,y1],i)=>{for(let t=0;t<=40;t++){const u=t/40,px=X+dx*u,py=Y-(y0+(y1-y0)*u)+Math.sin(u*3.14)*-8,w=6*(1-u)+1;Rr(px-w/2,py-w/2,w,w,b[2+(t%3===0?1:0)])}});
    Rr(X-6,Y-70,12,18,'#0a0806');Rr(X-4,Y-66,8,12,'#1a1210');for(let i=0;i<50;i++){const y=Math.floor(hash(i,1,X)*140),k=Math.floor((hash(i,2,X)-.5)*30);Rr(X+k,Y-y,2,1,m[2+(i%3)])}
    for(let i=0;i<8;i++){const rx=X-40+i*11,len=8+hash(i,3,X)*10;for(let t=0;t<len;t++)Rr(rx+(i<4?-t*.6:t*.6),Y-2+t*.15,2,2,b[2])}Rr(X-3,Y-62,6,4,'#9bd04c');Z.glows.push([X,Y-60,22,'155,208,76'])},
  reeds(x,X,Y){const Rr=rr(x),c=TH.grass.map(rgb);for(let i=0;i<9;i++){const px=X-12+i*3,h=12+hash(i,X,5)*14;for(let k=0;k<h;k++)Rr(px+Math.round(Math.sin(k*.1+i)*1),Y-k,1,1,c[1+(k>h-4?2:i%2)]);if(i%3===0){Rr(px,Y-h-4,2,5,'#5a3a20');Rr(px,Y-h-5,2,1,'#7a5430')}}},
  watchtower(x,X,Y){const s=TH.rock.map(rgb),w=TH.wood.map(rgb),Rr=rr(x),m=TH.moss.map(rgb);Rr(X-26,Y-10,52,10,s[3]);Rr(X-26,Y-10,52,1,s[5]);
    for(let y=10;y<150;y++){const hw=20-Math.floor(y/40),broken=y>128&&((X+y)%7<3);if(broken)continue;for(let k=-hw;k<hw;k++){const row=Math.floor(y/8),e=(k+hw+(row%2)*5)%10===0||y%8===0;Rr(X+k,Y-y,1,1,e?s[1]:k<-hw+4?s[5]:k>hw-4?s[2]:s[3+(hash(row,Math.floor((k+hw)/10),3)>.6?1:0)])}}
    [[-6,40],[-6,80],[-6,115]].forEach(([dx,y])=>{Rr(X+dx,Y-y-12,12,14,'#0a0810');Rr(X+dx+1,Y-y-11,10,2,s[1])});Rr(X-6,Y-12,12,12,w[1]);Rr(X-5,Y-11,10,11,w[2]);
    Rr(X-24,Y-136,48,6,s[4]);Rr(X-24,Y-136,48,1,s[6]);for(let i=0;i<6;i++)Rr(X-24+i*9,Y-142,5,6,s[4]);Rr(X-8,Y-156,16,14,w[2]);Rr(X-6,Y-154,12,10,'#ffe2a0');Rr(X-4,Y-152,8,6,'#ffffff');
    Z.glows.push([X,Y-149,44,'255,230,150']);Z.glows.push([X,Y-149,18,'255,255,220']);for(let i=0;i<30;i++)Rr(X-20+Math.floor(hash(i,1,X)*40),Y-20-Math.floor(hash(i,2,X)*110),2,1,m[2+(i%3)]);
    Rr(X+22,Y-60,3,60,w[2]);Rr(X+16,Y-58,14,2,w[3]);Rr(X+26,Y-40,8,8,w[3])},
  shard(x,X,Y){const Rr=rr(x),cs=['#2a1436','#4e2252','#8a4ab0','#c9a8ff','#f0e0ff'];[[0,26,6],[-8,16,5],[7,18,4],[-14,9,3],[13,10,3]].forEach(([dx,h,w])=>{for(let k=0;k<h;k++){const ww=Math.max(1,Math.round(w*(1-k/h)));Rr(X+dx-ww,Y-k,ww,1,cs[2]);Rr(X+dx,Y-k,ww,1,cs[3]);if(k%5===2)Rr(X+dx,Y-k,1,1,cs[4])}Rr(X+dx-w,Y,w*2,1,cs[0])});
    Z.glows.push([X,Y-12,30,'201,168,255'])},
  sealstone(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);Rr(X-12,Y-6,24,6,s[3]);Rr(X-12,Y-6,24,1,s[5]);
    for(let y=6;y<70;y++){const hw=9-Math.floor(y/30),cut=y>52&&(X+y)%5<2;if(cut)continue;Rr(X-hw,Y-y,hw*2,1,s[2]);Rr(X-hw,Y-y,2,1,s[4]);Rr(X+hw-2,Y-y,2,1,s[1])}
    for(let y=12;y<60;y+=6){const k=(y/6)%3;Rr(X-3+k,Y-y,3,2,'#ff5a3a');Rr(X-2+k,Y-y,1,1,'#ffb27a')}Rr(X-1,Y-70,1,18,'#0b0910');Rr(X,Y-55,1,10,'#0b0910');
    for(let i=0;i<5;i++){Rr(X+9+i*2,Y-40+i*4,2,2,'#5a4a50');Rr(X+10+i*2,Y-39+i*4,1,1,'#8a7a80')}Z.glows.push([X,Y-36,30,'255,90,60'])},
  rack(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-16,X+14].forEach(px=>Rr(px,Y-30,2,30,w[2]));Rr(X-18,Y-30,36,2,w[3]);Rr(X-18,Y-18,36,2,w[3]);
    for(let i=0;i<7;i++){const px=X-14+i*4,c=['#507030','#6a8a3a','#8a6a48','#86b47f'][i%4];Rr(px,Y-28,3,6+(i%3)*2,c);Rr(px,Y-16,3,5+(i%2)*3,['#a85038','#6a8a3a','#c8d468'][i%3])}}

};
function portalArch(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);Rr(X-13,Y-34,4,34,s[3]);Rr(X+9,Y-34,4,34,s[3]);Rr(X-13,Y-34,1,34,s[5]);Rr(X+9,Y-34,1,34,s[5]);
  Rr(X-15,Y-38,30,4,s[4]);Rr(X-15,Y-38,30,1,s[6]);Rr(X-9,Y-32,18,32,'#0b0910');Rr(X-11,Y-40,4,2,s[3]);Rr(X+7,Y-40,4,2,s[3])}
function caveMouth(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);
  for(let k=-26;k<=26;k++){const h=Math.round(Math.sqrt(Math.max(0,1-(k*k)/676))*46);Rr(X+k,Y-h,1,h,s[(k+40)%3+2]);if(h>2)Rr(X+k,Y-h,1,2,s[5])}
  for(let k=-14;k<=14;k++){const h=Math.round(Math.sqrt(Math.max(0,1-(k*k)/196))*34);Rr(X+k,Y-h,1,h,k*k<60?'#030204':'#0b0910')}
  Rr(X-15,Y-32,3,32,'#5e3a1c');Rr(X+12,Y-32,3,32,'#5e3a1c');Rr(X-16,Y-34,32,3,'#7a4e26');Rr(X-16,Y-34,32,1,'#9a6a36');
  for(let i=0;i<4;i++)Rr(X-9+i*2,Y-3-i*3,18-i*4,2,'#3a2e28');Rr(X-1,Y-31,3,4,'#ffb24a');Z.glows.push([X,Y-30,16,'255,190,110'])}
function elder(x,X,Y){const Rr=rr(x);Rr(X-5,Y-16,10,16,'#3b3466');Rr(X-5,Y-16,3,16,'#2a2547');Rr(X-4,Y-20,8,4,'#3f6580');Rr(X-3,Y-25,6,5,'#8d8aa3');Rr(X+1,Y-23,1,1,'#1a1220');
  Rr(X-4,Y-29,8,4,'#2a2547');Rr(X-2,Y-31,4,2,'#2a2547');Rr(X-3,Y-21,6,3,'#e6dcc6');Rr(X+6,Y-30,1,30,'#5e3a1c');Rr(X+5,Y-33,3,3,'#ffb24a');Z.glows.push([X+6,Y-32,14,'255,190,110'])}

/* ---------- background layers ---------- */
function buildFar(){const th=THEMES[Z.theme],w=Math.ceil(WW*.25+700),L=layer(w,BGH),gx=w*th.glow;
  if(Z.theme==='dusk'){
    for(let y=0;y<BGH;y++)for(let x=0;x<w;x++){const t=.12+(y/BGH)*.55+Math.max(0,1-Math.hypot((x-gx)/260,(y-120)/110))*.3+(fbm(x*.015,y*.02,4)-.5)*.14;sp(L,x,y,pick(TH.far,t,x,y))}
    for(let y=-32;y<=32;y++)for(let x=-32;x<=32;x++){const r=Math.hypot(x,y);if(r<=32){const t=.55+(-x-y)/64*.4+(fbm((x+gx)*.2,(y+80)*.2,9)-.5)*.2;sp(L,gx+x,80+y,pick(R(['#8a5a78','#b07a8a','#d4a0a0','#f0cab4','#fbe6d0']),t,x,y))}}
    const gc=TH.far[1];[[gx-90,160,26,110],[gx+64,170,24,100]].forEach(([x0,y0,ww,hh])=>{for(let y=y0-hh+20;y<BGH;y++)for(let x=x0;x<x0+ww;x++)if(y>y0-hh+ (hash(x,1,3)*10|0))sp(L,x,y,gc)});
    for(let x=gx-66;x<gx-8;x++){const a=(x-gx+66)/58,yy=130-Math.sin(a*Math.PI*.6)*20;for(let y=yy;y<yy+12;y++)sp(L,x,y,gc)}
    for(let i=0;i<12;i++){const cx=i*80+hash(i,1,5)*40,hh=60+hash(i,2,5)*60;for(let y=BGH-hh;y<BGH;y++)for(let x=cx-3;x<cx+3;x++)sp(L,x,y,TH.far[1]);for(let k=0;k<4;k++){const by=BGH-hh+k*12,len=10+hash(i,k,6)*14,d=k%2?1:-1;for(let j=0;j<len;j++)sp(L,cx+d*j,by-j*.5,TH.far[1])}}
  }else{
    for(let y=0;y<BGH;y++)for(let x=0;x<w;x++){const glow=Math.max(0,1-Math.hypot((x-gx)/300,(y-(Z.theme==='blood'?250:60))/150));const t=.18+glow*.62+(fbm(x*.015,y*.02,4)-.5)*.18;sp(L,x,y,pick(TH.far,t,x,y))}
    const n=Z.theme==='blood'?10:16;for(let i=0;i<n;i++){const cx=i*(w/n)+hash(i,1,5)*40,tw=10+hash(i,2,5)*18,dark=hash(i,3,5)*.12,spire=Z.theme==='blood';
      for(let y=0;y<BGH;y++){if(spire&&y<120+hash(i,4,5)*80)continue;const ww=(spire?tw*(y/BGH):tw)+(y>240?(y-240)*.5:0);for(let x=cx-ww/2;x<cx+ww/2;x++){const u=(x-cx+ww/2)/ww,t=.04+dark+Math.sin(u*Math.PI)*.16*(1-u*.5)+(fbm(x*.2,y*.03,i)-.5)*.1;sp(L,x,y,pick(TH.far,t,x,y))}}}
    if(Z.theme!=='blood')for(let i=0;i<24;i++){const cx=i*40+hash(i,4,6)*30,cy=hash(i,5,6)*50,rw=30+hash(i,6,6)*30;for(let y=cy-24;y<cy+24;y++)for(let x=cx-rw;x<cx+rw;x++){if(Math.hypot((x-cx)/rw,(y-cy)/22)<1&&fbm(x*.15,y*.15,i)>.42)sp(L,x,y,pick(TH.far,.06+(fbm(x*.3,y*.3,i+1)-.5)*.2,x,y))}}
  }
  commit(L);return L.c}
function buildMid(){const th=THEMES[Z.theme],w=Math.ceil(WW*.55+700),L=layer(w,BGH),wf=Z.wf;
  if(th.mid==='town'){const top=x=>150+fbm(x*.006,1,3)*40;
    for(let row=0;row<16;row++){const yy=BGH-6-row*11;let x=-10+(row%2)*9;while(x<w+10){const rx=8+hash(x,row,11)*9,ry=6+hash(row,x,11)*5;if(yy-ry>top(x)+6)boulder(L,x,yy,rx,ry,TH.cliff,x*7+row*31,true,null);x+=rx*1.55+hash(x,row,12)*3}}
    for(let i=0;i<w/62;i++){const hx=Math.floor(i*62+hash(i,1,41)*24),hw=Math.floor(30+hash(i,2,41)*30),hh=Math.floor(16+hash(i,3,41)*18),base=Math.floor(top(hx+hw/2))+10,rh=Math.floor(hw*.45),tower=hash(i,6,41)>.86;
      const H2=tower?hh+30:hh,W2=tower?Math.floor(hw*.5):hw;
      for(let y=base-H2;y<base+30;y++)for(let x=hx;x<hx+W2;x++){const t=.3+(x<hx+3?.2:0)-(x>hx+W2-3?.15:0)+(fbm(x*.2,y*.2,i)-.5)*.2;sp(L,x,y,pick(TH.wall,t,x,y))}
      for(let k=0;k<rh;k++){const x0=hx-3+k*(W2/2+3)/rh,x1=hx+W2+3-k*(W2/2+3)/rh;for(let x=Math.floor(x0);x<x1;x++)sp(L,x,base-H2-k,pick(TH.roof,.25+(k%3===0?-.15:0)+(x<(x0+x1)/2?.25:0),x,base-H2-k))}
      for(let wy=base-H2+5;wy<base-4;wy+=9)for(let wx=hx+4;wx<hx+W2-5;wx+=9)if(hash(wx,wy,i)>.45){const lit=hash(wy,wx,i)>.35;for(let a=0;a<3;a++)for(let b=0;b<4;b++)sp(L,wx+a,wy+b,lit?(b<1?[255,226,160]:[255,178,74]):[20,12,12])}
      if(hash(i,7,41)>.6){const cx=hx+W2-8;for(let y=base-H2-rh+2;y<base-H2;y++)for(let x=cx;x<cx+4;x++)sp(L,x,y-4,TH.wall[2])}}
  }else if(th.mid==='ruins'){
    const top=x=>70+fbm(x*.01,1,3)*80+(hash(Math.floor(x/26),2,4)>.75?30:0);
    let y=0;while(y<BGH){const bh=12+Math.floor(hash(y,1,11)*12);let x=-Math.floor(hash(y,2,11)*20);
      while(x<w){const bw=16+Math.floor(hash(x,y,12)*22),base=.25+hash(x,y,13)*.35+(1-y/BGH)*.1,arch=(x%260)>90&&(x%260)<150&&y>110&&y<210;
        if(y+bh>top(x)&&!arch)for(let yy=y;yy<y+bh;yy++)for(let xx=x;xx<x+bw;xx++){const ex=xx-x,ey=yy-y;if(ex===0||ey===0||yy<top(xx))continue;
          let t=base+(ex<3||ey<3?.2:0)-(ex>bw-3||ey>bh-3?.22:0)+(fbm(xx*.18,yy*.18,7)-.5)*.3;let col=pick(TH.wall,t,xx,yy);
          if(fbm(xx*.05,yy*.06,21)>.64&&fbm(xx*.3,yy*.3,22)>.45)col=pick(TH.moss,t*.6+.1,xx,yy);sp(L,xx,yy,col)}
        x+=bw}
      y+=bh}
  }else{
    const cave=th.mid==='cave',[tb,tv]=cave?[-20,0]:th.top,top=x=>tb+fbm(x*.008,1,3)*tv+(wf&&Math.abs(x-wf.x-wf.w/2)<70?-60:0);
    for(let row=0;row<28;row++){const yy=BGH-6-row*11;let x=-10+(row%2)*9;
      while(x<w+10){const rx=8+hash(x,row,11)*9,ry=6+hash(row,x,11)*5;if(yy-ry>top(x)){const wet=wf&&Math.abs(x-wf.x-wf.w/2)<wf.w/2+20;
        boulder(L,x,yy,rx,ry,TH.cliff,x*7+row*31,!wet&&!cave,null)}x+=rx*1.55+hash(x,row,12)*3}}
    if(cave)for(let i=0;i<w/24;i++){const cx=i*24+hash(i,1,7)*16,len=14+hash(i,2,7)*40,wd=3+hash(i,3,7)*5;for(let y=0;y<len;y++){const hw=wd*(1-y/len);for(let x=cx-hw;x<=cx+hw;x++)sp(L,x,y,pick(TH.cliff,.2+(cx-x)/wd*.2,x,y))}}
    if(!cave)for(let i=0;i<50;i++){const vx=Math.floor(hash(i,1,31)*w);if(wf&&Math.abs(vx-wf.x-wf.w/2)<wf.w)continue;const st=Math.floor(top(vx))+4,len=16+hash(i,2,31)*80;
      for(let k=0;k<len;k++){const px=vx+Math.round(Math.sin(k*.15+i)*1.5);if(!has(L,px,st+k))continue;sp(L,px,st+k,TH.leaf[k%5===0?4:2]);if(k%4===0)sp(L,px+1,st+k,TH.leaf[3])}}
  }
  commit(L);
  const gr=L.x.createLinearGradient(0,0,0,BGH);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.75,'rgba(0,0,0,0)');gr.addColorStop(1,'rgba(4,8,10,.45)');L.x.globalCompositeOperation='source-atop';L.x.fillStyle=gr;L.x.fillRect(0,0,w,BGH);
  if(wf){L.x.fillStyle='#050b0c';L.x.fillRect(wf.x-6,0,wf.w+12,wf.b)}L.x.globalCompositeOperation='source-over';
  return L.c}
function trunk(L,x0,x1,seed,branch,dead){
  for(let y=0;y<BGH;y++){const fl=y>215?Math.pow(y-215,1.35)*.9:0,l=x0+(vn(y*.05,1,seed)-.5)*8-fl,r=x1+(vn(y*.05,2,seed)-.5)*8+fl;
    for(let x=Math.floor(l);x<r;x++){const u=(x-l)/(r-l);let t=.18+Math.sin(u*Math.PI)*.55*(1.15-u*.7);const gr=fbm(x*.16,y*.03,seed);
      if(gr>.6)t-=.32;else if(gr>.54)t+=.14;if(u<.06||u>.95)t=.02;if(dead)t*=.8;
      let col=pick(TH.bark,t,x,y);if(!dead&&fbm(x*.11,y*.05,seed+5)>.68&&fbm(x*.4,y*.4,seed+6)>.4)col=pick(TH.leaf,t*.7+.12,x,y);sp(L,x,y,col)}}
  if(branch){const[bx,by,ex,ey]=branch;for(let i=0;i<=60;i++){const k=i/60,cx=bx+(ex-bx)*k,cy=by+(ey-by)*k-Math.sin(k*Math.PI)*10,rr2=9-k*5;
    for(let yy=-rr2;yy<=rr2;yy++)for(let xx=-2;xx<=2;xx++){const t=.5-yy/rr2*.35+(fbm(cx*.2,cy*.2+yy,seed)-.5)*.3;sp(L,cx+xx,cy+yy,yy>rr2-1.5||yy<-rr2+1?TH.bark[0]:pick(TH.bark,t,cx+xx,cy+yy))}}}}
function buildTrees(){const w=Math.ceil(WW*.85+700),L=layer(w,BGH);for(const[a,b,s,br,dead]of Z.trees)trunk(L,a,b,s,br,dead);commit(L);return L.c}
function cluster(L,cx,cy,rw,rh,n,seed,ramp=TH.leaf){
  const blobs=[];for(let i=0;i<n;i++){const a=hash(i,1,seed)*6.28,d=Math.sqrt(hash(i,2,seed));blobs.push([cx+Math.cos(a)*rw*d,cy+Math.sin(a)*rh*d,3+hash(i,3,seed)*4])}
  blobs.sort((a,b)=>a[1]-b[1]).reverse();
  for(const[bx,by,br]of blobs)for(let y=Math.floor(by-br);y<=by+br;y++)for(let x=Math.floor(bx-br);x<=bx+br;x++){const dx=(x-bx)/br,dy=(y-by)/br,r=Math.hypot(dx,dy);if(r>1)continue;
    const t=.3+(-dx-dy)*.28+(1-(y-cy+rh)/(rh*2))*.35+(fbm(x*.3,y*.3,seed)-.5)*.25-(r>.82?.25:0);sp(L,x,y,pick(ramp,t,x,y))}}
function buildCanopy(){const th=THEMES[Z.theme],L=layer(WW,120);
  if(th.canopy==='leaf'){for(let i=0;i<WW/33;i++){const cx=i*33+hash(i,1,61)*30;cluster(L,cx,4+hash(i,2,61)*34,24+hash(i,3,61)*24,14+hash(i,5,61)*14,56,i*7+1)}
    outlineL(L,TH.leaf[0],true);
    for(let i=0;i<WW/30;i++){const vx=Math.floor(hash(i,1,71)*WW),top=10+Math.floor(hash(i,3,71)*30),len=20+hash(i,2,71)*70;if(!has(L,vx,top))continue;
      for(let k=0;k<len&&top+k<120;k++){const px=vx+Math.round(Math.sin(k*.18+i)*1.2);sp(L,px,top+k,TH.leaf[k%6===0?5:3]);if(k%5===0){sp(L,px-1,top+k,TH.leaf[4]);sp(L,px+1,top+k+1,TH.leaf[2])}}}}
  else if(th.canopy==='dead'){for(let i=0;i<WW/70;i++){const x0=i*70+hash(i,1,81)*40;let x=x0,y=0;const d=hash(i,2,81)>.5?1:-1;
      for(let k=0;k<50;k++){x+=d*(.6+hash(i,k,82)*.8);y+=.8+hash(k,i,83)*.6;for(let t=0;t<Math.max(1,3-k/18);t++)sp(L,x,y+t,TH.bark[k<10?2:1]);
        if(k%9===4){let bx=x,by=y;for(let j=0;j<14;j++){bx-=d*.8;by+=.6+hash(j,k,84)*.5;sp(L,bx,by,TH.bark[1])}}}
      if(hash(i,3,81)>.55)cluster(L,x0+d*16,10,14,8,16,i*11,TH.leaf)}
    outlineL(L,[8,6,10],true)}
  else if(th.canopy==='bunting'){const cols=[[212,72,58],[242,230,200],[227,176,75],[134,180,127],[110,198,226]];
    for(let i=0;i<WW/150;i++){const x0=i*150+hash(i,1,93)*30,x1=x0+150,sag=18+hash(i,2,93)*14,y0=4+hash(i,3,93)*8;
      for(let x=x0;x<x1;x++){const u=(x-x0)/(x1-x0),y=y0+Math.sin(u*Math.PI)*sag;sp(L,x,y,[30,20,18]);
        if(Math.floor(x-x0)%8===4){const c=cols[(Math.floor(x/8)+i)%5];for(let k=0;k<6;k++)for(let j=-3+Math.ceil(k/2);j<=3-Math.ceil(k/2);j++)sp(L,x+j,y+1+k,c.map(v=>k===0?Math.min(255,v+30):v))}
        if(Math.floor(x-x0)%37===18){for(let k=0;k<3;k++)sp(L,x,y+1+k,[30,20,18]);for(let a=-3;a<=3;a++)for(let b=0;b<8;b++)if(Math.abs(a)<3||b>0&&b<7)sp(L,x+a,y+4+b,b===0||b===7?[90,40,24]:a<-1?[178,58,46]:[230,120,70])}}}
    outlineL(L,[14,8,8],true)}
  else if(th.canopy==='chains'){for(let i=0;i<WW/48;i++){const cx=i*48+hash(i,1,91)*30,len=30+hash(i,2,91)*70;for(let y=0;y<len;y+=4){const off=y%8===0;sp(L,cx,y,[40,34,38]);sp(L,cx,y+1,[60,52,56]);sp(L,cx+(off?1:-1),y+2,[40,34,38]);sp(L,cx,y+3,[24,20,22])}
      sp(L,cx-1,len,[60,52,56]);sp(L,cx+1,len,[60,52,56]);sp(L,cx,len+1,[90,80,84])}
    for(let i=0;i<WW/20;i++){const cx=i*20+hash(i,4,92)*14,len=6+hash(i,5,92)*22,wd=2+hash(i,6,92)*4;for(let y=0;y<len;y++){const hw=wd*(1-y/len);for(let x=cx-hw;x<=cx+hw;x++)sp(L,x,y,pick(TH.cliff,.25+(cx-x)/wd*.2,x,y))}}}
  commit(L);return L.c}
function buildFG(){const w=Math.ceil(WW*1.25+700),h=80,L=layer(w,h),blood=Z.theme==='blood';
  for(let i=0;i<w/240;i++){const cx=i*240+hash(i,1,81)*100,big=hash(i,2,81)>.5;
    if(blood){for(let j=0;j<3;j++){const rx=16+hash(i,j,85)*14;for(let y=h-30;y<h;y++)for(let x=cx+j*20-rx;x<cx+j*20+rx;x++)if(Math.hypot((x-cx-j*20)/rx,(y-h)/26)<1)sp(L,x,y,TH.cliff[1])}}
    else if(big){for(let j=0;j<5;j++)cluster(L,cx+j*14-28,h-10+hash(j,i,82)*6,18,16,30,i*31+j)}
    else for(let f=-4;f<=4;f++){for(let k=0;k<30;k++){const px=cx+f*k*.6,py=h-k*(1-Math.abs(f)*.1)+k*k*.02*Math.abs(f);sp(L,px,py,TH.leaf[1]);sp(L,px+1,py,TH.leaf[k%3?0:2])}}}
  for(let i=0;i<w*h;i++){if(L.d[i*4+3]){L.d[i*4]=Math.round(L.d[i*4]*.22);L.d[i*4+1]=Math.round(L.d[i*4+1]*.3);L.d[i*4+2]=Math.round(L.d[i*4+2]*.26)}}
  commit(L);return L.c}
const ZCACHE={};
function useZone(i){Z=ZONES[i];TH={...RAMP,...THEMES[Z.theme].ramps};SEG=Z.SEG;WW=Z.ww;WH=300+(Z.tall||0);
  if(!ZCACHE[i])ZCACHE[i]={far:buildFar(),mid:buildMid(),tree:buildTrees(),ter:buildTerrain(),can:buildCanopy(),fg:buildFG(),glows:Z.glows};
  if(Z.tall&&!ZCACHE[i].sky){try{const d=ZCACHE[i].far.getContext('2d').getImageData(4,1,1,1).data;ZCACHE[i].sky=`rgb(${d[0]},${d[1]},${d[2]})`}catch(e){ZCACHE[i].sky='#203040'}}
  return ZCACHE[i]}
