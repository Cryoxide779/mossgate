/* ---------- sprites ---------- */
const K={out:'#0b0910',scab:'#3a2433',gold:'#e3b04b',hilt:'#1c1420',wrap:'#efe4c8',blade:'#eef5f8',bladeD:'#8fa6b4',tabi:'#efe4c8',tabiD:'#bdb196',sand:'#6b4226',
  hak:'#2f2a52',hakD:'#1e1a36',hakL:'#4a4277',cream:'#f2e6c8',red:'#d4483a',wood:'#8a5a2b',woodD:'#5e3a1c',moss:'#5d8a6a',mossL:'#86b47f',orb:'#9bd04c'};
/* appearance options */
const LOOK={sex:['Male','Female'],build:['Lean','Balanced','Broad'],face:['Oval','Round','Square','Long','Sharp'],
  hair:['Ronin Tail','Spiked','Long Fall','Bun','Shaved','Wild Mane','Braid'],beard:['None','Stubble','Goatee','Short','Full','Braided'],
  skin:[['#f3d0ad','#cf9f78'],['#e8b88c','#bf8a5e'],['#e3ad7d','#b47b4f'],['#b9794a','#8a5532'],['#8a5434','#633a22'],['#5e3824','#42261a'],['#a9b4bf','#7d8894']],
  hairC:[['#2a1d2e','#4d3a57'],['#3d2618','#64432d'],['#7a3f22','#a65a32'],['#b8914f','#dcb872'],['#8d8aa3','#b4b1c8'],['#e6dcc6','#ffffff'],['#3f6e4a','#5f9468'],['#b8433f','#e0675c']],
  eye:['#1a1220','#3e6fa0','#3f7a3f','#a07a3a','#d4483a'],
  outfit:[['#5b8db0','#3d6482','#8fc0dc','#d4483a','#d4483a','#8f2a22'],['#5d8a6a','#3e6650','#86b47f','#f2e6c8','#c9502f','#8a3420'],['#b8433f','#7d2a2f','#e06a5e','#f2e6c8','#2a1d2e','#15111c'],
    ['#8d8aa3','#5f5c78','#b4b1c8','#d4483a','#d4483a','#8f2a22'],['#2f2b48','#1d1a2e','#4a4570','#f59a4a','#f59a4a','#a8601f'],['#e6d6b0','#b8a681','#fff4d6','#5a86a3','#3b3466','#26223f']]};
let WT={guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a',tome:'#3a2440',clasp:'#d9d2bc'};
function tomeP(P,x,y,open){const c=WT.tome,cl=WT.clasp;if(open){for(let i=0;i<7;i++)for(let j=0;j<4;j++)P(x+i,y+j,'#efe4c8');for(let j=0;j<4;j++)P(x+3,y+j,c);for(let i=0;i<7;i++)P(x+i,y+4,c);P(x+1,y+1,'#9a927a');P(x+5,y+1,'#9a927a');P(x+1,y+2,'#9a927a');P(x+5,y+2,'#7a4aa0')}
  else{for(let i=0;i<4;i++)for(let j=0;j<5;j++)P(x+i,y+j,c);for(let j=0;j<5;j++)P(x+3,y+j,cl);P(x+1,y+2,'#9bd04c');P(x,y,cl)}}
const CHARM_C={knot:['#d4483a','#8f2a22'],eye:['#f2e6c8','#d4483a'],sigil:['#d4483a','#f2e6c8'],core:['#15131f','#f59a4a'],keystone:['#4a4766','#86b47f'],vein:['#1a1020','#ff5a3a'],void:['#0b0910','#c9a8ff'],fang:['#efe4c8','#9a927a'],tusk:['#e6d6b0','#8f6a48'],antler:['#a08e70','#d9c9a0'],bark:['#55331d','#9bd04c'],gel:['#c8d468','#6a7a4e'],scale:['#5a7a64','#c8d468'],claw:['#18182a','#c9a8ff'],cog:['#c8a050','#6a6a3a'],coin:['#e3b04b','#8a6a20'],shard:['#8a4ab0','#c9a8ff'],lamp:['#f59a4a','#ffe2a0']};
function previewEq(key){if(!key||key==='none')return{};const e={};for(const sl of SLOTS)e[sl]={src:key,slot:sl,weap:null};return e}
function resolve(ch,eq){eq=eq||{};const L=ch.look,[sk,skD]=LOOK.skin[L.skin],[hr,hrL]=LOOK.hairC[L.hairC];
  const OL=LOOK.outfit[L.outfit]||LOOK.outfit[0],pal=s=>{if(!eq[s])return null;const g=GEAR[eq[s].src]||GEAR.wanderer;return g.start&&s!=='weapon'?OL.slice(0,5):g.pal},def=s=>eq[s]?(eq[s].slot==='weapon'?null:(GEAR[eq[s].src]||GEAR.wanderer)[s]):null;
  const cp=pal('chest'),hp=pal('head'),hd=pal('hands'),ft=eq.feet&&!(GEAR[eq.feet.src]||{}).sandals?pal('feet'):null,wp=pal('weapon'),ch2=def('charm');
  const O=cp?[cp[0],cp[1],cp[2],cp[3],cp[4],mixC(cp[4],'#000000',.35)]:LOOK.outfit[L.outfit];
  const hs=def('head');
  return{sk,skD,hr,hrL,eye:LOOK.eye[L.eye],O,hand:hd?hd[0]:sk,handD:hd?mixC(hd[0],'#000000',.35):skD,boot:ft?[mixC(ft[1],'#000000',.15),ft[2]]:null,
    sex:L.sex,build:L.build,face:L.face,hs:L.hair,bd:L.beard,head:hs?hs.s:null,hat:hp?hp[2]:null,hg:hp,chest:def('chest')?def('chest').s:null,
    charm:ch2?ch2.s:null,weap:(eq.weapon&&eq.weapon.weap)||(CLASSES[ch.cls]||CLASSES.ronin).weap,
    wt:wp?{guard:wp[3]==='#f2e6c8'?'#e3b04b':wp[3],wood:wp[0],woodD:wp[1],orb:wp[3]==='#f2e6c8'?'#9bd04c':wp[3],orbL:mixC(wp[3],'#ffffff',.5),tome:mixC(wp[1],'#3a2440',.4),clasp:wp[3]==='#f2e6c8'?'#d9d2bc':wp[3]}:null}}
const TW=[[21,8],[20,9],[19,11]];
function bres(x0,y0,x1,y1,fn){x0|=0;y0|=0;x1|=0;y1|=0;const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1;let e=dx+dy;
  for(;;){fn(x0,y0);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx}if(e2<=dx){e+=dx;y0+=sy}}}
function frame(draw,smear){const c=document.createElement('canvas');c.width=64;c.height=42;const f=c.getContext('2d');
  const P=(x,y,col)=>{f.fillStyle=col;f.fillRect(x,y,1,1)},Rc=(x,y,w,h,col)=>{f.fillStyle=col;f.fillRect(x,y,w,h)},E=(x,y)=>f.clearRect(x,y,1,1);draw(P,Rc,E);
  const im=f.getImageData(0,0,64,42),d=im.data,o=new Uint8Array(64*42),oc=hex(K.out);for(let i=0;i<64*42;i++)o[i]=d[i*4+3]>0?1:0;
  for(let y=0;y<42;y++)for(let x=0;x<64;x++){const i=y*64+x;if(o[i])continue;if((x>0&&o[i-1])||(x<63&&o[i+1])||(y>0&&o[i-64])||(y<41&&o[i+64])){d[i*4]=oc[0];d[i*4+1]=oc[1];d[i*4+2]=oc[2];d[i*4+3]=255}}
  f.putImageData(im,0,0);if(smear)smear(P);return c}
function hairBack(P,Rc,A,b,wv){const h=A.hr,l=A.hrL;
  switch(A.hs){
  case 0:Rc(15,12+b+wv,5,2,h);Rc(13,13+b+wv,3,2,h);P(12,14+b+wv,h);P(16,12+b+wv,l);break;
  case 2:Rc(18,9+b,3,10,h);Rc(17,12+b+wv,2,8,h);P(19,19+b,h);P(19,11+b,l);P(18,15+b,l);break;
  case 3:Rc(17,6+b,4,4,h);P(18,6+b,l);P(16,9+b,K.red);P(15,10+b,K.red);break;
  case 5:Rc(15,7+b+wv,6,9,h);P(14,8+b+wv,h);P(13,10+b+wv,h);P(14,13+b+wv,h);P(15,16+b+wv,h);P(17,16+b+wv,h);P(16,9+b+wv,l);P(17,12+b+wv,l);break;
  case 6:for(let i=0;i<6;i++)Rc(18-(i>3?1:0)+(i>2?wv:0),11+b+i*2,2,2,i%2?h:l);P(17,23+b+wv,K.red);break}}
function hairFront(P,Rc,A,b){const h=A.hr,l=A.hrL;
  switch(A.hs){
  case 0:Rc(20,7+b,8,3,h);Rc(20,10+b,4,3,h);P(24,10+b,h);P(27,10+b,h);P(21,6+b,h);P(24,6+b,h);P(26,5+b,h);P(27,6+b,h);P(19,9+b,h);P(19,11+b,h);P(28,8+b,h);P(22,7+b,l);P(23,7+b,l);P(25,7+b,l);P(26,8+b,l);break;
  case 1:Rc(20,7+b,8,3,h);Rc(20,10+b,3,2,h);[[20,6],[21,4],[22,6],[23,5],[24,3],[25,5],[26,4],[27,5],[28,6],[29,7],[28,8],[19,8],[19,10]].forEach(([x,y])=>P(x,y+b,h));P(22,7+b,l);P(24,5+b,l);P(26,6+b,l);break;
  case 2:Rc(20,7+b,8,3,h);Rc(20,10+b,4,3,h);P(27,10+b,h);P(28,8+b,h);P(28,9+b,h);P(28,10+b,h);P(22,7+b,l);P(25,7+b,l);P(27,8+b,l);break;
  case 3:case 6:Rc(20,7+b,8,3,h);Rc(20,10+b,3,2,h);P(23,10+b,h);P(27,10+b,h);P(21,7+b,l);P(22,7+b,l);P(25,7+b,l);P(26,7+b,l);break;
  case 4:Rc(21,8+b,7,2,mixC(A.sk,h,.45));Rc(20,10+b,8,1,K.red);P(19,10+b,K.red);P(18,11+b,K.red);P(17,12+b,K.red);break;
  case 5:Rc(20,6+b,9,4,h);Rc(19,10+b,5,3,h);[[20,5],[22,4],[23,5],[24,3],[26,4],[27,3],[28,5],[29,6],[29,8],[18,9],[18,12]].forEach(([x,y])=>P(x,y+b,h));P(22,6+b,l);P(25,5+b,l);P(27,6+b,l);P(21,8+b,l);break}
  if(A.hs!==4){P(25,11+b,h);P(26,11+b,h);if(A.sex===0)P(27,11+b,h)}}
function head(P,Rc,E,A,b,blink){const s=A.sk,d=A.skD;
  if(A.face===3){Rc(21,9+b,7,9,s);E(21,9+b);E(27,9+b);E(21,17+b);E(27,17+b)}else Rc(21,9+b,7,8,s);
  if(A.face===0){E(21,9+b);E(27,9+b);E(21,16+b);E(27,16+b)}
  if(A.face===1){E(21,9+b);E(27,9+b);E(21,16+b);P(28,12+b,s);P(28,13+b,s);P(28,14+b,d)}
  if(A.face===2){Rc(21,16+b,7,1,s);P(21,16+b,d);P(27,16+b,d)}
  if(A.face===4){E(21,9+b);E(27,9+b);E(21,16+b);E(21,15+b);E(22,16+b);P(26,17+b,d)}
  Rc(21,13+b,2,3,d);P(27,16+b,d);P(22,12+b,d);P(22,13+b,mixC(d,'#000000',.2));
  if(blink)P(26,12+b,d);else{P(26,12+b,A.eye==='#1a1220'?'#1a1220':A.eye);P(27,12+b,'#ffffff');P(26,13+b,mixC(s,A.eye,.25))}
  P(28,14+b,d);
  if(A.sex===1){P(28,11+b,'#1a1220');P(28,12+b,'#1a1220');P(27,11+b,'#1a1220');P(27,14+b,mixC(s,K.red,.3));P(26,15+b,'#c2555a');P(25,15+b,mixC(s,'#c2555a',.5));if(A.face===2)E(27,16+b)}
  else P(26,15+b,mixC(d,'#5a2a1a',.4))}
function beard(P,Rc,A,b){const h=A.hr,l=A.hrL;
  switch(A.bd){
  case 1:{const c=mixC(A.sk,h,.5);[[22,15],[23,16],[25,16],[27,16],[24,15],[26,16]].forEach(([x,y])=>P(x,y+b,c));break}
  case 2:Rc(25,16+b,3,2,h);P(26,15+b,h);break;
  case 3:Rc(21,14+b,2,3,h);Rc(23,15+b,5,2,h);P(27,14+b,h);P(26,15+b,mixC(A.skD,'#000000',.3));break;
  case 4:case 5:Rc(21,13+b,2,4,h);Rc(22,15+b,6,3,h);P(28,15+b,h);P(27,14+b,h);P(26,14+b,h);P(24,16+b,l);P(26,17+b,l);
    if(A.bd===5){for(let i=0;i<4;i++)Rc(25,18+b+i,2,1,i%2?h:l);P(25,22+b,K.red);P(26,22+b,K.red)}break}}
function headgear(P,Rc,A,b,wv){const g=A.head;if(!g)return;const fem=A.sex===1,h=A.hr,hl=A.hrL,G=A.hg||['#9a7a52','#6e5536','#c4a474','#f2e6c8','#d4483a'];
  if(g==='horns'){Rc(20,8+b,9,1,G[1]);[[21,7],[20,6],[19,5],[19,4],[20,3]].forEach(([x,y])=>P(x,y+b,G[4]));[[27,7],[28,6],[29,5],[29,4],[28,3]].forEach(([x,y])=>P(x,y+b,G[4]));P(24,8+b,G[3]);if(!fem){P(18,4+b,G[4]);P(30,4+b,G[4])}else P(23,7+b,G[3])}
  if(g==='pelt'){Rc(19,6+b,10,4,G[0]);Rc(19,6+b,10,1,G[2]);Rc(19,10+b,3,fem?3:6,G[0]);P(20,5+b,G[0]);P(21,4+b,G[0]);P(21,5+b,G[2]);P(26,5+b,G[0]);P(27,4+b,G[0]);P(27,5+b,G[2]);Rc(26,9+b,3,1,G[1]);P(28,9+b,G[3]);if(fem){P(18,12+b,G[4]);P(18,13+b,G[4])}else{Rc(17,13+b+wv,3,3,G[0]);P(16,15+b+wv,G[1])}}
  if(g==='antlers'){Rc(20,8+b,9,1,G[1]);[[21,7],[20,6],[19,5],[20,4],[18,4],[22,5]].forEach(([x,y])=>P(x,y+b,G[3]));[[27,7],[28,6],[29,5],[28,4],[30,4],[26,5]].forEach(([x,y])=>P(x,y+b,G[3]));if(fem){P(24,7+b,G[4]);P(23,7+b,'#e8a0b4')}else{P(19,3+b,G[3]);P(29,3+b,G[3])}}
  if(g==='goggles'){Rc(20,9+b,9,1,G[1]);Rc(24,8+b,3,3,G[3]);P(25,9+b,'#6ec6e2');Rc(27,8+b,2,3,G[3]);P(28,9+b,'#6ec6e2');if(!fem){Rc(20,6+b,9,3,G[0]);Rc(20,6+b,9,1,G[2])}else P(20,8+b,G[4])}
  if(g==='crystal'){Rc(20,8+b,9,1,G[1]);[[21,7,2],[23,6,3],[25,5,4],[27,6,3]].forEach(([x,y,h])=>{for(let k=0;k<h;k++)P(x,y-k+b,k===h-1?'#f0e0ff':G[3])});if(fem)P(22,5+b,G[4])}
  if(g==='kasa'){const c=A.hat,dk=mixC(c,'#000000',.35),lt=mixC(c,'#ffffff',.3);Rc(15,7+b,19,2,c);Rc(18,6+b,13,1,c);Rc(21,5+b,7,1,c);Rc(23,4+b,3,1,lt);Rc(15,9+b,19,1,dk);[[19,7],[24,6],[29,7]].forEach(([x,y])=>P(x,y+b,dk));Rc(20,6+b,4,1,lt);
    if(fem){const v=mixC(c,'#ffffff',.6);for(let y=10;y<=17;y++){if(y%2)P(15,y+b,v);P(16,y+b+(y%2),v);P(32,y+b,v);if(y%2===0)P(33,y+b,v)}P(24,3+b,K.red)}}
  if(g==='mosscap'){const KM2=A.hg?G[0]:K.moss,KL2=A.hg?G[2]:K.mossL;Rc(20,6+b,9,4,KM2);Rc(19,8+b,1,3,KM2);P(21,10+b,KM2);P(24,10+b,KM2);P(28,10+b,KM2);P(29,8+b,KM2);Rc(21,6+b,4,1,KL2);P(22,7+b,K.cream);P(26,7+b,K.cream);P(24,5+b,K.red);P(23,5+b,K.red);P(25,5+b,K.red);P(24,4+b,'#e8806a');
    if(fem){P(19,7+b,K.cream);P(18,7+b,'#e8a0b4');P(19,6+b,'#e8a0b4');P(20,7+b,'#e8a0b4');P(19,8+b,'#e8a0b4');Rc(18,10+b,1,4,K.mossL)}}
  if(g==='mask'){const MK=A.hg&&A.hg[0]!=='#3a3550'?A.hg[0]:K.cream;if(fem){Rc(25,10+b,4,3,MK);P(28,13+b,K.cream);P(26,12+b,K.red);P(27,12+b,K.red);P(27,10+b,'#8a8170');P(20,11+b,K.red);P(19,12+b,K.red);P(18,13+b,K.red)}
    else{Rc(25,10+b,4,5,K.cream);P(28,15+b,K.cream);Rc(25,14+b,3,1,'#d9cfb2');P(26,12+b,K.red);P(27,12+b,K.red);P(27,10+b,'#8a8170');P(26,11+b,'#8a8170')}}
  if(g==='hood'){const hc=A.hg?G[0]:'#221e36',l=A.hg?G[2]:'#3a3456';Rc(19,6+b,10,11,hc);Rc(24,10+b,4,6,'#0b0910');Rc(16,10+b+wv,3,2,hc);P(15,11+b+wv,hc);Rc(28,7+b,1,4,l);P(22,7+b,l);P(26,12+b,'#f59a4a');P(27,12+b,'#ffd27a');
    if(fem){for(let y=11;y<=18;y++)P(27+(y>15?1:0),y+b,y%2?h:hl);P(26,14+b,mixC(A.sk,'#c2555a',.5))}}
  if(g==='visor'){const V1=A.hg?A.hg[1]:'#33304f';Rc(20,6+b,9,10,V1);Rc(20,6+b,2,10,mixC(V1,'#000000',.3));Rc(24,12+b,5,1,K.red);P(28,12+b,'#ffb27a');P(21,9+b,K.cream);P(21,14+b,K.cream);[[22,4],[23,5],[24,3],[25,4],[26,5],[27,4]].forEach(([x,y])=>P(x,y+b,x%2?K.moss:K.mossL));Rc(22,5+b,6,1,K.moss);
    if(fem){for(let i=0;i<6;i++)Rc(18-(i>3?1:0)+(i>2?wv:0),12+b+i*2,2,2,i%2?h:hl);P(17,24+b+wv,K.red);Rc(28,9+b,1,3,'#26233a')}}
  if(g==='hachimaki'){if(fem){[[17,9],[18,8],[19,7],[20,6]].forEach(([x,y])=>P(x,y+b,'#e3b04b'));Rc(19,5+b,2,2,K.red);P(21,6+b,'#f2a0a0');P(18,6+b,'#f2a0a0');P(17,10+b,'#e3b04b');P(17,11+b,K.red)}
    else{Rc(20,9+b,9,1,G[4]);P(28,9+b,K.cream);P(19,9+b,G[4]);P(18,10+b+wv,G[4]);P(17,10+b+wv,G[4]);P(16,11+b+wv,G[4]);P(17,11+b+wv,mixC(G[4],'#000000',.3))}}
  if(g==='shinobi'){const sc=fem?G[2]:G[0];if(fem){Rc(23,13+b,6,3,sc);P(28,16+b,sc);Rc(20,9+b,9,1,G[4]);P(19,10+b+wv,G[4]);P(18,11+b+wv,G[4]);P(17,11+b+wv,G[4])}
    else{Rc(20,7+b,9,3,G[0]);Rc(22,13+b,7,4,sc);P(28,17+b,sc);P(23,12+b,sc);Rc(18,13+b+wv,4,2,G[0]);P(17,14+b+wv,G[0])}}
  if(g==='feather'){if(fem){Rc(20,9+b,8,1,G[0]);[[19,8],[18,7],[17,6],[16,5],[15,4]].forEach(([x,y],i)=>{P(x,y+b,i%2?G[3]:'#b8433f');P(x+1,y+b,G[3])})}
    else{Rc(20,6+b,9,4,G[0]);Rc(20,6+b,9,1,G[2]);Rc(28,9+b,2,1,G[1]);[[19,6],[18,5],[17,4],[16,3],[15,2]].forEach(([x,y],i)=>{P(x,y+b,i%2?G[3]:'#b8433f');P(x,y+b+1,G[3])})}}
  if(g==='leafcrown'){const lf=[K.moss,K.mossL];for(let x=20;x<=28;x+=2)P(x,8+b-(x%4===0?1:0),lf[(x/2)%2]);Rc(20,9+b,9,1,G[4]);
    if(fem){P(22,7+b,'#e8a0b4');P(26,7+b,K.cream);P(24,6+b,'#e8a0b4');P(19,10+b,K.mossL);P(18,11+b,K.moss)}else{Rc(17,15+b,4,4,G[1]);Rc(16,16+b,2,3,G[1])}}
  if(g==='cowl'){if(fem){const v=G[1];for(let y=6;y<=21;y++){for(let x=16;x<=21;x++)if((x+y)%2===0||x>19)P(x-(y>14?1:0),y+b,v)}Rc(20,7+b,9,1,K.cream);P(24,6+b,K.cream);P(22,6+b,'#9a927a');P(26,6+b,'#9a927a');P(24,5+b,G[4])}
    else{Rc(19,6+b,10,4,G[0]);Rc(19,10+b,4,8,G[0]);Rc(28,7+b,1,5,G[1]);Rc(20,6+b,8,1,G[2]);P(22,16+b,K.cream);P(23,17+b,K.cream);Rc(16,11+b+wv,3,3,G[0])}}}
function longGarment(P,Rc,A,o,b,tx,tr,fem,flare){const O=A.O,top=26+b,bot=(o.tuck?31:34);
  for(let r=top;r<=bot;r++){const t=(r-top)/(bot-top),fl=Math.round(t*(fem?flare+1:flare)),xl=tx-1-fl+Math.round((o.lb||0)*t*.3),xr=tr+1+fl+Math.round((o.lf||0)*t*.3);
    Rc(xl,r,xr-xl+1,1,O[0]);Rc(xl,r,2,1,O[1]);if(fem&&r%2===0)P(xl+Math.round((xr-xl)/2),r,O[1]);if(!fem)P(Math.round((xl+xr)/2)+1,r,O[3])}
  const t=1,fl=fem?flare+1:flare;Rc(tx-1-fl,bot,tr-tx+3+fl*2,1,O[3])}
function body(P,Rc,E,A,o){const b=o.bob||0,wv=o.wave||0,[tx,tw]=TW[A.build],tr=tx+tw-1,fem=A.sex===1,O=A.O,cs=A.chest,cover=A.head==='hood'||A.head==='visor'||(A.head==='cowl'&&!fem);
  if(!cover)hairBack(P,Rc,A,b,wv);
  // sash tails / back details
  if(cs==='haori'&&fem){Rc(tx-5,21+b,5,5,O[4]);Rc(tx-5,21+b,5,1,mixC(O[4],'#ffffff',.25));Rc(tx-5,25+b,5,1,O[5]);P(tx-6,22+b,O[4]);P(tx-6,24+b,O[4])}
  else{Rc(tx-6,25+b,6,2,O[5]);Rc(tx-8,26+b+wv,3,2,O[5]);P(tx-9,27+b+wv,O[5]);if(fem){P(tx-10,28+b+wv,O[5]);P(tx-9,28+b+wv,O[5])}}
  if(cs==='wraps'){Rc(tx-4,17+b+wv,4,2,O[4]);P(tx-5,18+b+wv,O[4]);P(tx-6,19+b+wv,O[4]);if(fem){P(tx-7,20+b+wv,O[4]);P(tx-8,21+b+wv,O[4])}}
  if(A.weap==='bow'){Rc(tx-2,13+b,3,10,'#6b4a33');P(tx-1,14+b,'#8a6444');P(tx-2,11+b,K.red);P(tx-1,10+b,K.cream);P(tx,11+b,K.red);P(tx-1,12+b,'#3a2a20');
    if(!o.bowInHand){for(let y=11;y<=31;y++){const x=tx-4-Math.round(3*Math.sin(Math.PI*(y-11)/20));P(x,y+b,y===11||y===31?K.red:WT.wood)}for(let y=12;y<=30;y++)P(tx-4,y+b,K.cream)}}
  if(cs==='ink'){[[3,20],[4,21],[5,19],[6,20],[7,22],[5,22]].forEach(([dx,y])=>P(tx-dx,y+b+(dx%2?wv:0),'#15131f'));if(fem)for(let i=0;i<9;i++)P(tx-1-i,30+b+Math.round(Math.sin(i*.8+wv)*1)+(i>5?1:0),'#15131f')}
  if(cs==='leather'&&fem){Rc(tx-3,17+b,4,3,O[3]);P(tx-4,18+b,O[3])}
  Rc(tx-2,19+b,3,6,O[1]);if(cs==='haori'&&fem)Rc(tx-2,25+b,3,3,O[1]);Rc(tx-2,25+b,2,2,A.handD);
  // legs: hakama, or andon-bakama skirt for the female body
  const top=26+b,bot=o.tuck?32:35,hw=fem?7:6;
  if(fem){for(let r=top;r<=bot;r++){const t=(r-top)/(bot-top),xl=Math.round(tx-1+(o.lb||0)*t-t*2),xr=Math.round(tx+3+(o.lf||0)*t+hw+t*2);Rc(xl,r,xr-xl+1,1,K.hak);Rc(xl,r,2,1,K.hakD);for(let x=xl+3;x<xr;x+=3)P(x,r,K.hakD);P(xr-1,r,K.hakL)}
    const t=1,xl=Math.round(tx-1+(o.lb||0)-2),xr=Math.round(tx+3+(o.lf||0)+hw+2);Rc(xl,bot,xr-xl+1,1,K.hakD)}
  else for(let r=top;r<=bot;r++){const t=(r-top)/(bot-top),xb=Math.round(tx+(o.lb||0)*t),xf=Math.round(tx+4+(o.lf||0)*t);Rc(xb,r,5,1,K.hakD);Rc(xf,r,hw,1,K.hak);P(xf+2,r,K.hakL);P(xf+4,r,K.hakD)}
  const fb=Math.round(tx+(o.lb||0)),ff=Math.round(tx+4+(o.lf||0)),yb=bot+1-(o.liftB||0),yf=bot+1-(o.liftF||0);
  if(A.boot){const[bc,ba]=A.boot,bd=mixC(bc,'#000000',.3);
    if(fem){Rc(fb+1,yb-3,4,5,bd);Rc(fb+1,yb+2,5,1,'#120e14');P(fb+1,yb+2,'#000');P(fb+1,yb-3,ba);Rc(ff,yf-3,4,5,bc);Rc(ff,yf+2,6,1,'#120e14');P(ff,yf+2,'#000');Rc(ff,yf-3,4,1,ba);P(ff+4,yf+1,bc)}
    else{Rc(fb,yb-2,5,4,bd);Rc(fb,yb+2,6,1,'#120e14');P(fb,yb-2,ba);Rc(ff,yf-2,5,4,bc);Rc(ff+1,yf+2,6,1,'#120e14');Rc(ff,yf-2,5,1,ba);P(ff+4,yf+1,bc)}}
  else{const tw2=fem?4:5;Rc(fb+(fem?1:0),yb,tw2,2,K.tabiD);Rc(fb,yb+2,6,1,K.sand);P(fb+1,yb,O[5]);Rc(ff,yf,tw2,2,K.tabi);Rc(ff+1,yf+2,6,1,K.sand);P(ff+1,yf,O[4])}
  // long garments over the legs
  if(cs==='robe')longGarment(P,Rc,A,o,b,tx,tr,fem,1);
  if(cs==='gown')longGarment(P,Rc,A,o,b,tx,tr,fem,fem?2:0);
  if(cs==='shroud'){if(fem){for(let r=26;r<=32;r++)for(let x=tx-1;x<=tr+2;x++)if((x+r)%3===0)P(x,r+b,O[1]);[[0,33],[2,34],[4,33],[6,34],[8,33]].forEach(([dx,y])=>P(tx-1+dx,y+b,O[1]))}
    else{Rc(tx,26+b,tw,1,O[1]);[[0,27],[2,28],[3,27],[5,27],[6,28],[tw-2,27],[tw-1,28]].forEach(([dx,y])=>P(tx+dx,y+b,O[1]))}}
  if(cs==='plate'&&fem){Rc(tx,26+b,tw,3,O[1]);for(let x=tx+1;x<tr;x+=3)P(x,27+b,O[2]);Rc(tx,28+b,tw,1,O[5])}
  // torso
  if(fem){Rc(tx+1,18+b,tw-2,1,O[0]);Rc(tx,19+b,tw,3,O[0]);Rc(tr+1,20+b,1,2,O[0]);Rc(tx+1,22+b,tw-2,2,O[0]);Rc(tx,19+b,2,3,O[1]);P(tx+1,22+b,O[1]);P(tx+1,23+b,O[1]);
    P(tr+1,20+b,O[2]);P(tr,19+b,O[2]);P(tr,22+b,O[1]);P(tr+1,21+b,mixC(O[0],'#000000',.15))}
  else{Rc(tx,18+b,tw,8,O[0]);Rc(tx,18+b,2,8,O[1]);P(tr,19+b,O[2]);P(tr,20+b,O[2]);P(tr-1,21+b,O[2])}
  if(cs!=='wraps'&&cs!=='leather'){P(tx+2,20+b,O[3]);P(tx+4,22+b,O[3]);if(!fem){P(tx+2,23+b,O[3]);P(tr-1,23+b,O[3])}P(tx+5,19+b,O[3])}
  Rc(25,18+b,2,2,K.cream);P(25,20+b,K.cream);P(24,18+b,O[1]);P(27,18+b,O[1]);P(26,20+b,O[1]);
  const ox=fem?tx+1:tx,ow=fem?tw-1:tw;
  if(cs==='haori'&&fem){Rc(tx,23+b,tw+1,3,O[4]);Rc(tx,24+b,tw+1,1,O[3]);P(tr+1,23+b,O[4])}else{Rc(ox,24+b,ow,2,O[4]);Rc(ox,25+b,ow,1,O[5]);P(tr+1,24+b,O[4]);P(tr+1,25+b,O[4]);P(tr+2,26+b,O[5])}
  // chest styles
  if(cs==='moss'){if(fem){P(tx+2,18+b,K.moss);P(tx+1,18+b,'#e8a0b4');P(tr,19+b,K.moss);P(tr+1,20+b,K.mossL);P(tx-1,27+b,K.moss);P(tx-1,28+b,K.mossL)}else{P(tx+1,17+b,K.mossL);P(tx+2,17+b,K.moss);Rc(tx,18+b,2,1,K.moss);P(tr-1,17+b,K.moss);P(tr,18+b,K.mossL);P(tx+3,18+b,K.moss)}}
  if(cs==='plate'){if(fem){Rc(tx-1,17+b,2,3,O[1]);Rc(tr,17+b,2,3,O[1]);P(tx-1,17+b,O[3]);P(tr+1,17+b,O[3]);P(tr,20+b,O[2]);P(tr+1,21+b,O[2]);P(tx+3,20+b,O[2])}
    else{Rc(tx-1,17+b,3,4,O[1]);Rc(tr-1,17+b,3,4,O[1]);Rc(tx-1,17+b,3,1,O[3]);Rc(tr-1,17+b,3,1,O[3]);P(tx,19+b,K.cream);P(tr,19+b,K.cream)}}
  if(cs==='ink'&&fem){Rc(tx+1,18+b,tw-2,1,'#15131f');P(tr,19+b,'#3a3456')}
  if(cs==='haori'&&!fem){for(let y=18;y<=25;y++)P(25,y+b,O[3]);Rc(tx+1,19+b,2,2,O[3]);P(tx+1,19+b,O[1])}
  if(cs==='haori'&&fem){P(tr,19+b,O[3]);P(tr-1,20+b,O[3]);P(tx+1,25+b,O[3])}
  if(cs==='wraps'){bres(tx,18+b,tr,24+b,(x,y)=>P(x,y,O[4]));bres(tr,18+b,tx,24+b,(x,y)=>P(x,y,O[1]));if(fem)Rc(tx+1,21+b,tw-1,1,O[4])}
  if(cs==='leather'){Rc(tx,17+b,tw,2,O[3]);P(tx+1,16+b,O[3]);P(tr-1,16+b,O[3]);for(let x=tx;x<=tr;x+=2)P(x,18+b,O[2]);
    if(fem){[[26,20],[25,21],[26,22],[25,23]].forEach(([x,y])=>P(x,y+b,O[3]))}else{Rc(25,19+b,2,6,O[1])}Rc(ox,24+b,ow,1,'#3a2a20');P(26,24+b,'#e3b04b')}
  if(cs==='robe'){if(!fem)Rc(tx-2,16+b,4,3,O[1]);else{P(tr,24+b,'#e8a0b4');P(tr+1,23+b,K.cream)}P(25,21+b,O[3]);P(25,23+b,O[3])}
  if(cs==='gown'){if(fem){[[26,20],[25,21],[26,22],[25,23]].forEach(([x,y])=>P(x,y+b,O[3]));Rc(tx+1,18+b,tw-2,1,O[3])}else{Rc(tx,16+b,3,3,O[1]);for(let y=19;y<=25;y+=2)P(26,y+b,K.cream)}}
  if(A.charm){const[c1,c2]=CHARM_C[A.charm]||CHARM_C.knot;P(tx+3,26+b,'#6b4a33');Rc(tx+2,27+b,2,2,c1);P(tx+3,28+b,c2)}
  if(A.weap==='katana'&&o.sheath){bres(tx-5,31+b,tx+7,24+b,(x,y)=>{P(x,y,K.scab);P(x,y+1,K.scab)});P(tx-1,29+b,'#6a4560');P(tx+3,27+b,'#6a4560');
    if(o.sheath==='full'){Rc(tx+7,22+b,2,4,WT.guard);Rc(tx+9,21+b,5,2,K.hilt);P(tx+10,21+b,K.wrap);P(tx+12,21+b,K.wrap);P(tx+11,22+b,K.wrap)}else P(tx+7,24+b,'#000')}
  if(A.weap==='daggers'){[[0,0],[3,1]].forEach(([dx,dy])=>{Rc(tx-2+dx,23+b+dy,2,1,K.hilt);P(tx-3+dx,24+b+dy,WT.guard);bres(tx-4+dx,25+b+dy,tx-7+dx,28+b+dy,(x,y)=>P(x,y,K.blade))})}
  if(fem)Rc(24,16+b,2,2,A.skD);else Rc(23,16+b,3,2,A.skD);
  head(P,Rc,E,A,b,o.blink);
  if(!fem)beard(P,Rc,A,b);
  if(!cover)hairFront(P,Rc,A,b);
  headgear(P,Rc,A,b,wv);
  if(o.arm==='idle'||o.arm==='tome'){const a=o.armSw||0,aw=fem?2:3;Rc(tr-2+a+(fem?1:0),19+b,aw,6,O[0]);P(tr-2+a+(fem?1:0),19+b,O[1]);P(tr+a,20+b,O[2]);if(o.arm==='tome')tomeP(P,tr-1+a,23+b,false);Rc(tr-1+a,25+b,2,2,A.hand)}
  if(o.arm==='staff'){const a=o.armSw||0,sx=tr+3+a;bres(sx,37,sx,5+b,(x,y)=>{P(x,y,WT.wood)});P(sx,20+b,WT.woodD);P(sx,28,WT.woodD);
    Rc(sx-1,1+b,3,3,WT.orb);P(sx,1+b,WT.orbL);P(sx-2,3+b,K.moss);P(sx+2,3+b,K.moss);P(sx-2,4+b,K.mossL);
    armTo(P,tr-2,20+b,sx-1,23+b,A)}}
function armTo(P,sx,sy,hx,hy,A){const O=A.O;bres(sx,sy,hx,hy,(x,y)=>{P(x,y,O[0]);P(x,y+1,O[0]);P(x-1,y,O[1])});bres(sx,sy+2,hx,hy+1,(x,y)=>P(x,y,O[1]));
  P(hx,hy,A.hand);P(hx+1,hy,A.hand);P(hx,hy+1,A.hand);P(hx+1,hy+1,A.handD)}
function blade(P,hx,hy,tx,ty){bres(hx,hy+1,tx,ty+1,(x,y)=>P(x,y,K.bladeD));bres(hx,hy,tx,ty,(x,y)=>P(x,y,K.blade));P(tx,ty,'#fff');P(hx,hy,WT.guard);P(hx,hy+1,WT.guard);P(hx-1,hy,K.hilt)}
function smearArc(P,cx,cy,r0,r1,a0,a1,fade,col){const lo=Math.min(a0,a1),hi=Math.max(a0,a1);for(let y=cy-r1-1;y<=cy+r1+1;y++)for(let x=cx-r1-1;x<=cx+r1+1;x++){const d=Math.hypot(x-cx,y-cy);if(d<r0||d>r1)continue;
  const a=Math.atan2(y-cy,x-cx);if(a<lo||a>hi)continue;const k=(a-lo)/(hi-lo),lead=a0<a1?k:1-k;if(fade&&hash(x,y,9)>lead*.9+.1)continue;
  P(x,y,col?(d>r1-1.5?col[0]:col[1]):(d>r1-1.5?'#9fd8f0':lead>.6?'#ffffff':'#d8f2ff'))}}
function bowInHand(P,sx,y0,pull){for(let dy=-9;dy<=9;dy++){const x=sx+Math.round(3*(1-(dy/9)*(dy/9)));P(x,y0+dy,Math.abs(dy)>7?K.red:WT.wood);if(dy===0)P(x,y0,'#3a2a20')}
  const mx=sx-pull;bres(sx,y0-9,mx,y0,(x,y)=>P(x,y,K.cream));bres(mx,y0,sx,y0+9,(x,y)=>P(x,y,K.cream))}

/* ---------- new arms: axe, hammer, spear, sword & shield ---------- */
const IRONC=['#2a3038','#4e5a64','#8796a2','#c4d0d8','#f2f8fb'];
const HAFT=['#a8723a','#6e4422'];function haft(P,x0,y0,x1,y1){bres(x0,y0,x1,y1,(x,y)=>P(x,y,HAFT[0]));bres(x0+1,y0,x1+1,y1,(x,y)=>P(x,y,HAFT[1]))}
function axeHead(P,x,y,f){/* f: 1 blade faces right, -1 left; x,y = haft top */for(let i=0;i<6;i++){const h=1+Math.round(i*.7);for(let j=-h;j<=h;j++)P(x+f*(i+1),y+j,i===5?IRONC[4]:j===-h?IRONC[3]:j===h?IRONC[1]:IRONC[2])}P(x,y-1,IRONC[1]);P(x,y,IRONC[1]);P(x,y+1,IRONC[1]);P(x-f,y,IRONC[0])}
function hamHead(P,x,y){for(let j=-3;j<=2;j++)for(let i=-4;i<=4;i++)P(x+i,y+j,j===-3?IRONC[4]:j===2?IRONC[0]:i===-4||i===4?IRONC[1]:i<0?IRONC[3]:IRONC[2]);P(x-1,y,IRONC[1]);P(x+1,y,IRONC[1]);P(x,y-1,IRONC[1])}
function spearShaft(P,x0,y0,x1,y1){bres(x0,y0,x1,y1,(x,y)=>P(x,y,HAFT[0]));const dx=Math.sign(x1-x0)||0,dy=Math.sign(y1-y0)||0;
  if(Math.abs(x1-x0)>=Math.abs(y1-y0)){P(x1+dx,y1,IRONC[3]);P(x1+2*dx,y1,IRONC[4]);P(x1+3*dx,y1,IRONC[4]);P(x1+dx,y1-1,IRONC[2]);P(x1+dx,y1+1,IRONC[1]);P(x1+2*dx,y1-1,IRONC[3]);P(x1+2*dx,y1+1,IRONC[1]);P(x1-dx,y1+1,K.red);P(x1-dx,y1+2,K.red);P(x1-2*dx,y1+2,K.red)}
  else{P(x1,y1+dy,IRONC[3]);P(x1,y1+2*dy,IRONC[4]);P(x1,y1+3*dy,IRONC[4]);P(x1-1,y1+dy,IRONC[2]);P(x1+1,y1+dy,IRONC[1]);P(x1-1,y1+2*dy,IRONC[3]);P(x1+1,y1+2*dy,IRONC[1]);P(x1+1,y1-dy,K.red);P(x1+2,y1-dy,K.red);P(x1+2,y1,K.red)}}
function kiteShield(P,x,y,A){/* x,y = top-left */const O=A.O,rim=IRONC[1];for(let j=0;j<13;j++){const w=j<8?8:Math.max(1,8-(j-7)*1.6|0),ox=Math.round((8-w)/2);for(let i=0;i<w;i++){const e=i===0||i===w-1||j===0;P(x+ox+i,y+j,e?rim:i<w/2?O[2]||O[1]:O[1])}}
  for(let j=2;j<9;j++)P(x+4,y+j,WT.guard);for(let i=2;i<7;i++)P(x+i,y+4,WT.guard);P(x+1,y+1,IRONC[4])}
function shortSword(P,hx,hy,tx,ty){bres(hx,hy,tx,ty,(x,y)=>P(x,y,K.blade));bres(hx,hy+1,tx,ty+1,(x,y)=>P(x,y,K.bladeD));P(tx,ty,'#fff');P(hx,hy,WT.guard);P(hx,hy-1,WT.guard);P(hx,hy+1,WT.guard);P(hx-1,hy,K.hilt)}
/* build every frame for one character */
function buildChar(ch,eq){const A=resolve(ch,eq);WT=A.wt||{guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a',tome:'#3a2440',clasp:'#d9d2bc'};const [tx,tw]=TW[A.build],tr=tx+tw-1,dx=tr-28,sx=tr-3,X={};
  const runL=[[4,-4,0,1],[2,-2,0,2],[-1,1,0,0],[-4,4,1,0],[-2,2,2,0],[1,-1,0,0]],bobs=[0,1,1,0,1,1],sw=[1,0,-1,-1,0,1];
  const W=A.weap,armMode=W==='staff'?'staff':W==='tome'?'tome':'idle',sh=W==='katana'?'full':null;
  const F=(o,extra,smear)=>frame((P,Rc,E)=>{body(P,Rc,E,A,o);if(extra)extra(P)},smear);
  X.idleS=[0,1].map(b=>F({bob:b,arm:armMode,sheath:sh,lf:1,lb:-1}));
  X.blinkS=F({bob:0,arm:armMode,sheath:sh,lf:1,lb:-1,blink:1});
  X.runS=runL.map(([lf,lb,lF,lB],i)=>F({bob:bobs[i],lf,lb,liftF:lF,liftB:lB,arm:armMode,armSw:W==='staff'?0:sw[i],sheath:sh,wave:i%3===0?1:0}));
  X.jumpS=F({lf:3,lb:-3,tuck:1,arm:armMode,armSw:W==='staff'?0:-1,sheath:sh,wave:-1});
  X.fallS=F({lf:1,lb:-2,arm:armMode,armSw:W==='staff'?0:1,sheath:sh,wave:1});
  if(W==='katana'){const guard=b=>P=>{armTo(P,sx,20+b,sx+5,23+b,A);blade(P,sx+6,22+b,sx+17,14+b)};
    X.idleD=[0,1].map(b=>F({bob:b,sheath:'empty',lf:3,lb:-3},guard(b)));
    X.runD=runL.map(([lf,lb,lF,lB],i)=>F({bob:bobs[i],lf,lb,liftF:lF,liftB:lB,sheath:'empty',wave:i%3===0?1:0},guard(bobs[i])));
    X.jumpD=F({lf:3,lb:-3,tuck:1,sheath:'empty',wave:-1},guard(0));X.fallD=F({lf:1,lb:-2,sheath:'empty',wave:1},guard(0));
    X.iai=[F({bob:1,lf:3,lb:-4,sheath:'full'},P=>armTo(P,sx,21,sx+5,22,A)),
      F({bob:1,lf:5,lb:-4,sheath:'empty'},P=>{blade(P,sx+8,22,sx+20,27);armTo(P,sx,21,sx+7,21,A)},P=>smearArc(P,sx+1,21,16,21,.35,.75,1)),
      F({lf:6,lb:-4,sheath:'empty'},P=>{blade(P,sx+10,16,sx+25,8);armTo(P,sx,20,sx+9,17,A)},P=>smearArc(P,sx+1,20,15,25,-.6,1.2)),
      F({lf:6,lb:-4,sheath:'empty'},P=>{blade(P,sx+9,14,sx+19,2);armTo(P,sx,20,sx+8,15,A)},P=>smearArc(P,sx+1,20,20,25,-1.1,.7,1))];
    X.cut=[F({lf:2,lb:-3,sheath:'empty'},P=>{blade(P,sx,12,sx-10,2);armTo(P,sx,20,sx,13,A)}),
      F({bob:1,lf:5,lb:-4,sheath:'empty'},P=>{blade(P,sx+10,22,sx+23,28);armTo(P,sx,21,sx+9,21,A)},P=>smearArc(P,sx+1,20,14,25,-1.9,.6)),
      F({bob:1,lf:5,lb:-4,sheath:'empty'},P=>{blade(P,sx+8,26,sx+17,34);armTo(P,sx,21,sx+7,25,A)},P=>smearArc(P,sx+1,20,19,25,-.4,1,1))];
    X.sheath=[F({lf:2,lb:-2,sheath:'empty'},P=>{blade(P,sx+6,21,sx-4,27);armTo(P,sx,20,sx+6,21,A)}),X.iai[0]];
    X.atk=X.iai}
  else if(W==='daggers'){const dag=(P,hx,hy,tx2,ty2)=>{bres(hx,hy,tx2,ty2,(x,y)=>P(x,y,K.blade));P(tx2,ty2,'#fff');P(hx,hy,WT.guard);P(hx-1,hy,K.hilt)};
    X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,20,sx-1,23,A);dag(P,sx-1,24,sx-4,28)}),
      F({bob:1,lf:5,lb:-4},P=>{armTo(P,sx,21,sx+9,21,A);dag(P,sx+11,21,sx+16,20)},P=>smearArc(P,sx+2,21,11,17,-.7,.7,0,['#c79ae0','#f0e0ff'])),
      F({bob:1,lf:4,lb:-4},P=>{armTo(P,sx,21,sx+7,22,A);dag(P,sx+9,22,sx+13,21)},P=>smearArc(P,sx+2,21,14,17,-.3,.7,1,['#c79ae0','#f0e0ff']))]}
  else if(W==='bow'){X.atk=[F({lf:3,lb:-3,bowInHand:1},P=>{armTo(P,sx,20,sx+8,20,A);bowInHand(P,sx+10,20,6);bres(sx+4,20,sx+16,20,(x,y)=>P(x,y,WT.wood));P(sx+17,20,K.cream);P(sx+4,19,K.red);P(sx+4,21,K.red)}),
      F({lf:3,lb:-3,bowInHand:1},P=>{armTo(P,sx,20,sx+8,20,A);bowInHand(P,sx+10,20,0)}),
      F({lf:2,lb:-2,bowInHand:1},P=>{armTo(P,sx,21,sx+7,22,A);bowInHand(P,sx+9,23,0)})]}
  else if(W==='tome'){X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,20,sx+2,17,A);tomeP(P,sx+2,13,false)}),
      F({bob:1,lf:4,lb:-4},P=>{armTo(P,sx,21,sx+8,20,A);tomeP(P,sx+9,17,true)},P=>smearArc(P,sx+12,18,5,8,-3.2,3.2,1,['#7a4aa0','#c9a8ff'])),
      F({lf:3,lb:-3},P=>{armTo(P,sx,21,sx+5,22,A);tomeP(P,sx+6,21,false)})]}
  else if(W==='axe'||W==='hammer'){const head=W==='axe'?(P,x,y,f)=>axeHead(P,x,y,f):(P,x,y)=>hamHead(P,x,y),sm=W==='axe'?['#f59a4a','#ffd0a0']:['#c8b090','#fff0d0'];
    const carry=b=>P=>{armTo(P,sx,20+b,sx+4,24+b,A);haft(P,sx+2,19+b,sx+10,33+b);head(P,sx+10,34+b,1)};
    X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,19,sx-2,13,A);haft(P,sx-1,15,sx-8,4);head(P,sx-8,3,-1)}),
      F({bob:1,lf:6,lb:-4},P=>{armTo(P,sx,21,sx+9,21,A);haft(P,sx+8,22,sx+20,14);head(P,sx+20,13,1)},P=>smearArc(P,sx+2,20,15,24,-1.6,.5,0,sm)),
      F({bob:1,lf:5,lb:-4},P=>{armTo(P,sx,21,sx+7,25,A);haft(P,sx+6,25,sx+15,33);head(P,sx+15,33,1)},P=>smearArc(P,sx+2,21,18,24,-.2,1.1,1,sm))];
    X.idleS=[0,1].map(b=>F({bob:b,lf:1,lb:-1},carry(b)));X.blinkS=X.idleS[0];X.runS=runL.map(([lf,lb,lF,lB],i)=>F({bob:bobs[i],lf,lb,liftF:lF,liftB:lB,wave:i%3===0?1:0},carry(bobs[i])));
    X.jumpS=F({lf:3,lb:-3,tuck:1,wave:-1},carry(0));X.fallS=F({lf:1,lb:-2,wave:1},carry(0))}
  else if(W==='spear'){const carry=b=>P=>{armTo(P,sx,20+b,sx+4,23+b,A);spearShaft(P,sx+5,36+b,sx+5,4+b)};
    X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,20,sx-1,21,A);spearShaft(P,sx-13,22,sx+12,20)}),
      F({bob:1,lf:7,lb:-4},P=>{armTo(P,sx,20,sx+9,20,A);spearShaft(P,sx-3,21,sx+27,19)},P=>{for(const y of[17,20,23])for(let x=sx+14;x<sx+30;x+=2)if((x+y)%3)P(x,y,'#d8f2ff')}),
      F({bob:1,lf:5,lb:-4},P=>{armTo(P,sx,21,sx+6,21,A);spearShaft(P,sx-7,22,sx+21,20)})];
    X.idleS=[0,1].map(b=>F({bob:b,lf:1,lb:-1},carry(b)));X.blinkS=X.idleS[0];X.runS=runL.map(([lf,lb,lF,lB],i)=>F({bob:bobs[i],lf,lb,liftF:lF,liftB:lB,wave:i%3===0?1:0},P=>{armTo(P,sx,20+bobs[i],sx+5,22+bobs[i],A);spearShaft(P,sx-10,25+bobs[i],sx+14,17+bobs[i])}));
    X.jumpS=F({lf:3,lb:-3,tuck:1,wave:-1},carry(0));X.fallS=F({lf:1,lb:-2,wave:1},carry(0))}
  else if(W==='shield'){const sh=b=>P=>kiteShield(P,sx-1,15+b,A),carry=b=>P=>{sh(b)(P);armTo(P,sx,20+b,sx+5,24+b,A);shortSword(P,sx+6,24+b,sx+12,30+b)};
    X.atk=[F({lf:2,lb:-3},P=>{sh(0)(P);armTo(P,sx,19,sx+2,13,A);shortSword(P,sx+2,13,sx-5,6)}),
      F({bob:1,lf:5,lb:-4},P=>{kiteShield(P,sx+1,15,A);armTo(P,sx,21,sx+10,20,A);shortSword(P,sx+11,20,sx+21,17)},P=>smearArc(P,sx+2,20,12,20,-1.5,.6,0)),
      F({bob:1,lf:4,lb:-4},P=>{kiteShield(P,sx,15,A);armTo(P,sx,21,sx+8,24,A);shortSword(P,sx+9,24,sx+16,30)},P=>smearArc(P,sx+2,21,15,20,-.3,1,1))];
    X.bash=F({bob:1,lf:6,lb:-4},P=>{kiteShield(P,sx+5,14,A);armTo(P,sx,21,sx+3,24,A);shortSword(P,sx+4,24,sx+8,31)});
    X.idleS=[0,1].map(b=>F({bob:b,lf:1,lb:-1},carry(b)));X.blinkS=X.idleS[0];X.runS=runL.map(([lf,lb,lF,lB],i)=>F({bob:bobs[i],lf,lb,liftF:lF,liftB:lB,wave:i%3===0?1:0},carry(bobs[i])));
    X.jumpS=F({lf:3,lb:-3,tuck:1,wave:-1},carry(0));X.fallS=F({lf:1,lb:-2,wave:1},carry(0))}
  else{const staff=(P,x0,y0,x1,y1,glow)=>{bres(x0,y0,x1,y1,(x,y)=>P(x,y,WT.wood));Rc3(P,x1-1,y1-1,WT.orb);P(x1,y1-1,WT.orbL);if(glow)[[-3,0],[3,0],[0,-3],[0,3],[-2,-2],[2,2],[2,-2],[-2,2]].forEach(([a,c])=>P(x1+a,y1+c,WT.orbL))};
    X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,20,sx+1,17,A);staff(P,sx+5,30,sx-2,3)}),
      F({bob:1,lf:5,lb:-4},P=>{armTo(P,sx,21,sx+7,19,A);staff(P,sx+2,31,sx+15,6,1)},P=>smearArc(P,sx+15,6,4,6,-3.2,3.2,1,['#63a136','#cff27c'])),
      F({lf:3,lb:-3},P=>{armTo(P,sx,21,sx+5,22,A);staff(P,sx+6,37,sx+8,6)})]}
  return X}
const Rc3=(P,x,y,c)=>{for(let i=0;i<3;i++)for(let j=0;j<3;j++)P(x+i,y+j,c)};
