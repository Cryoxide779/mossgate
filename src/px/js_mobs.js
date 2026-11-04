/* ---------- creature sprites ---------- */
function sprite(w,h,draw,flash){const c=document.createElement('canvas');c.width=w;c.height=h;const f=c.getContext('2d');
  const P=(x,y,col)=>{f.fillStyle=col;f.fillRect(x|0,y|0,1,1)},Rc=(x,y,ww,hh,col)=>{f.fillStyle=col;f.fillRect(x|0,y|0,ww,hh)};draw(P,Rc,f);
  const im=f.getImageData(0,0,w,h),d=im.data,o=new Uint8Array(w*h),oc=hex(K.out);for(let i=0;i<w*h;i++){o[i]=d[i*4+3]>0?1:0;if(flash&&o[i]){d[i*4]=d[i*4+1]=d[i*4+2]=255}}
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(o[i])continue;if((x>0&&o[i-1])||(x<w-1&&o[i+1])||(y>0&&o[i-w])||(y<h-1&&o[i+w])){d[i*4]=oc[0];d[i*4+1]=oc[1];d[i*4+2]=oc[2];d[i*4+3]=255}}
  f.putImageData(im,0,0);return c}
const MSP={};
function mossFrame(rx,ry,flash){const c=document.createElement('canvas');c.width=26;c.height=20;const L={x:c.getContext('2d'),w:26,h:20};L.im=L.x.createImageData(26,20);L.d=L.im.data;
  const cx=13,cy=19-ry-1;
  for(let y=0;y<20;y++)for(let x=0;x<26;x++){const nx=(x-cx)/rx,ny=(y-cy)/ry,r=Math.hypot(nx,ny*(ny>0?1.3:1));if(r>1||y>18)continue;
    const t=.3+(-nx*.4-ny*.55)*.6+Math.sqrt(Math.max(0,1-r*r))*.25;let col=pick(RAMP.slime,t,x,y);
    if(ny<-.05+Math.sin(x*1.3)*.25)col=pick(RAMP.moss,t+.15,x,y);if(flash)col=[255,255,255];sp(L,x,y,col)}
  if(!flash){const ex=cx+3,ey=cy+1;[[0,0],[1,0],[0,1],[1,1],[-1,0],[-1,1],[0,-1]].forEach(([a,b])=>sp(L,ex+a,ey+b,[246,239,224]));sp(L,ex+1,ey,[212,72,58]);sp(L,ex+1,ey+1,[90,20,20]);
    sp(L,cx-3,cy-ry,[236,226,190]);sp(L,cx-3,cy-ry-1,[212,72,58]);sp(L,cx-4,cy-ry-1,[212,72,58]);sp(L,cx-2,cy-ry-1,[212,72,58]);sp(L,cx-3,cy-ry-2,[236,120,96]);
    sp(L,cx-5,cy+ry,RAMP.slime[1]);sp(L,cx+4,cy+ry,RAMP.slime[1])}
  outlineL(L,hex(K.out));commit(L);return c}
function huskFrame(mode,flash){return sprite(34,38,(P,Rc)=>{const b=mode==='walk1'||mode==='wind'?1:0,lean=mode==='lunge'?2:mode==='wind'?-1:0;
  const rb='#3a3550',rd='#26233a',rl='#55507a',ash='#8d8aa3',mk='#f2e6c8',mkd='#cfc3a4',red='#d4483a';
  for(let y=12;y<=32;y++){const sh=Math.round(lean*(1-(y-12)/20)),x0=10-Math.round((y-12)*.2)+sh,x1=20+Math.round((y-12)*.1)+sh;Rc(x0,y+b,x1-x0,1,rb);Rc(x0,y+b,3,1,rd);if(y%2===0)P(14+sh,y+b,rd);if(y%3===0)P(17+sh,y+b,rl)}
  Rc(9+lean,9+b,8,4,rd);Rc(9+lean,9+b,8,1,rl);
  [[8,33],[10,34],[13,33],[16,34],[19,33],[21,34]].forEach(([x,y])=>P(x,y+b,rd));P(12,36,'#15111c');P(13,36,'#15111c');P(18,36,'#15111c');P(19,36,'#15111c');
  Rc(9+lean,21+b,12,1,red);P(20+lean,22+b,red);P(20+lean,23+b,'#8f2a22');
  const hx=13+lean*2;Rc(hx,4+b,8,9,rd);Rc(hx+4,5+b,5,7,mk);Rc(hx+4,10+b,3,2,mkd);P(hx+7,6+b,'#8a8170');P(hx+6,7+b,'#8a8170');
  if(mode==='wind'){P(hx+7,8+b,'#ffb27a');P(hx+6,8+b,red);P(hx+7,7+b,red);P(hx+7,9+b,red);P(hx+8,8+b,red)}else{P(hx+7,8+b,red);P(hx+6,8+b,'#5a1a1a')}
  if(mode==='wind'){Rc(6,14+b,5,3,rb);Rc(4,15+b,2,2,ash);P(3,14+b,mkd);P(2,16+b,mkd)}
  else if(mode==='lunge'){Rc(19+lean,16,9,3,rb);Rc(28,16,2,2,ash);[[30,15],[31,14],[30,17],[32,17],[29,19],[30,20]].forEach(([x,y])=>P(x,y,mkd))}
  else{Rc(19+lean,15+b,5,3,rb);Rc(24,16+b,2,2,ash);[[26,15],[27,14],[26,17],[28,17],[25,19],[26,20]].forEach(([x,y])=>P(x,y+b,mkd))}
},flash)}
function wispFrame(ph,charge,flash){return sprite(30,24,(P,Rc)=>{const cx=18,cy=12,r=6;
  for(let k=0;k<3;k++)for(let x=3;x<12;x++){const y=Math.round(cy-2+k*2+Math.sin(x*.8+ph+k)*1.5);P(x,y,'#15131f');if(x>7-k)P(x,y+1,'#15131f')}
  for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++){const d=Math.hypot(x,y);if(d>r)continue;P(cx+x,cy+y,d<r-1.5&&x+y<-3?'#2e2848':'#15131f')}
  const cr=charge?2:1;Rc(cx-cr,cy-cr,cr*2+1,cr*2+1,'#f59a4a');P(cx,cy,'#ffe2a0');if(charge){P(cx-1,cy,'#ffd27a');P(cx,cy-1,'#ffd27a')}
},flash)}
function wardenFrame(mode,flash){const oy=30;return sprite(86,104,(P,Rc)=>{const crouch=mode==='crouch'?5:0,b=(mode==='idle1'?1:0)+crouch,Y=v=>v+oy+b;
  const pl='#4a4766',pd='#33304f',pL='#6a6788',dk='#26233a',ms='#5d8a6a',mL='#86b47f',red='#d4483a',rD='#8f2a22',cr='#f2e6c8',sl='#3b3466',sL='#5b4f86';
  const legH=14-crouch;Rc(26,56+oy+b,8,legH,pd);Rc(38,56+oy+b,9,legH,pl);Rc(24,66+oy,11,4,dk);Rc(37,66+oy,12,4,dk);
  if(mode==='wind'){Rc(46,Y(-2),6,30,pl);Rc(36,Y(-12),4,22,'#5e3a1c');Rc(26,Y(-26),20,14,sl);Rc(26,Y(-26),20,2,sL);Rc(26,Y(-26),5,14,pd);P(32,Y(-20),'#f59a4a');P(38,Y(-18),'#f59a4a');P(35,Y(-16),'#f59a4a')}
  Rc(33,Y(44),8,18,red);Rc(33,Y(44),8,1,'#e06a5e');Rc(36,Y(50),2,6,rD);Rc(34,Y(52),6,2,rD);
  Rc(22,Y(24),28,22,pl);Rc(22,Y(24),8,22,pd);Rc(44,Y(26),4,16,pL);Rc(22,Y(34),28,1,dk);Rc(22,Y(44),28,3,dk);Rc(34,Y(44),4,3,'#e3b04b');
  [[26,28],[26,38],[46,28],[46,38]].forEach(([x,y])=>P(x,Y(y),cr));
  Rc(14,Y(20),14,8,pl);Rc(44,Y(20),14,8,pl);Rc(14,Y(20),4,8,pd);Rc(14,Y(18),14,3,ms);Rc(44,Y(18),14,3,ms);Rc(16,Y(18),5,1,mL);Rc(47,Y(18),5,1,mL);
  [[15,6],[18,4],[21,7],[24,3],[45,5],[49,7],[53,4],[56,6]].forEach(([x,l])=>{for(let k=0;k<l;k++)P(x,Y(28+k),k%2?ms:mL)});
  Rc(30,Y(6),13,18,dk);Rc(30,Y(6),3,18,'#1a1828');Rc(33,Y(14),10,2,mode==='wind'||mode==='slam'?'#ff7a3d':red);P(42,Y(14),'#ffb27a');
  Rc(32,Y(3),8,3,ms);P(33,Y(2),mL);P(36,Y(1),mL);P(39,Y(2),mL);
  if(mode==='slam'){Rc(48,Y(26),6,12,pl);Rc(50,Y(38),6,4,dk);Rc(55,Y(40),3,20,'#5e3a1c');Rc(56,Y(54),22,16,sl);Rc(56,Y(54),22,2,sL);Rc(56,Y(54),5,16,pd);[[62,60],[68,58],[72,63]].forEach(([x,y])=>P(x,Y(y),'#f59a4a'))}
  else if(mode!=='wind'){Rc(48,Y(26),6,14,pl);Rc(48,Y(26),2,14,pd);Rc(49,Y(40),5,4,dk);Rc(52,Y(42),3,18,'#5e3a1c');Rc(50,Y(54),16,16-crouch,sl);Rc(50,Y(54),16,2,sL);Rc(50,Y(54),4,16-crouch,pd);P(58,Y(60),'#f59a4a');P(62,Y(64),'#f59a4a')}
  else{Rc(44,Y(8),6,18,pl)}
},flash)}
function thrallFrame(mode){return sprite(20,28,(P,Rc)=>{const bn='#d9d2bc',bd='#9a927a',dk='#2a2420',ms='#5d8a6a',ml='#86b47f',gl='#9bd04c',st=mode==='walk1'?1:0;
  const lA=mode==='walk1'?-2:mode==='walk0'?2:0;
  for(let y=19;y<=25;y++){P(7+Math.round(lA*(y-19)/6),y,bd);P(11-Math.round(lA*(y-19)/6),y,bn)}P(6+lA,26,bd);P(7+lA,26,bd);P(11-lA,26,bn);P(12-lA,26,bn);
  Rc(6,18,7,2,bn);P(9,11,bd);for(let y=11;y<=17;y++)P(9,y,bd);Rc(6,12,7,1,bn);Rc(6,14,7,1,bn);Rc(7,16,5,1,bd);
  Rc(7,4,7,7,bn);Rc(7,4,2,7,bd);Rc(8,11,5,1,bd);P(11,7,dk);P(12,7,gl);P(10,7,dk);P(12,9,dk);Rc(7,3,5,1,ms);P(8,2,ml);P(6,12,ms);P(5,13,ml);P(13,18,ms);
  if(mode==='atk'){for(let i=0;i<6;i++)P(12+i,12-Math.round(i*.4),bn);for(let i=0;i<6;i++)P(16+i,10-Math.round(i*.6),'#8a8f94');P(21,6,'#cfd4d8')}
  else{P(12,12,bn);P(13,13+st,bn);P(13,14+st,bn);P(14,15+st,bd);P(4,13,bd);P(4,14,bd)}
})}
function wraithFrame(ph){return sprite(22,18,(P,Rc)=>{const b='#4a2e6a',l='#7a5aa0',sk='#efe4c8',gl='#9bd04c';
  for(let x=1;x<9;x++){const y=Math.round(9+Math.sin(x*.9+ph)*2);P(x,y,b);P(x,y+1,x>4?b:l)}
  for(let y=-5;y<=5;y++)for(let x=-5;x<=5;x++){if(Math.hypot(x,y*1.1)<=5)P(13+x,9+y,x+y<-3?l:b)}
  Rc(13,6,5,5,sk);P(14,8,'#15131f');P(16,8,gl);P(15,10,'#15131f');P(17,10,'#15131f');Rc(9,13,3,1,b);P(8,14,b)})}
function buildMobSprites(){
  MSP.thrall={walk0:thrallFrame('walk0'),walk1:thrallFrame('walk1'),atk:thrallFrame('atk')};MSP.wraith=[0,2,4].map(wraithFrame);
  MSP.moss=[mossFrame(9,7),mossFrame(10,6),mossFrame(8,8)];MSP.mossF=[mossFrame(9,7,1),mossFrame(10,6,1),mossFrame(8,8,1)];
  for(const f of[0,1])for(const m of['walk0','walk1','wind','lunge']){(MSP['husk'+(f?'F':'')]=MSP['husk'+(f?'F':'')]||{})[m]=huskFrame(m,f)}
  buildRoster();MSP.wisp=[0,2,4].map(p=>wispFrame(p,0));MSP.wispC=wispFrame(0,1);MSP.wispF=wispFrame(0,0,1);
  for(const f of[0,1])for(const m of['idle0','idle1','wind','slam','crouch']){(MSP['warden'+(f?'F':'')]=MSP['warden'+(f?'F':'')]||{})[m]=wardenFrame(m,f)}}

/* ---------- Ashveil Reach roster (Bible ch.3.15) ---------- */
const SLIME_S={
  moss:{body:RAMP.slime,top:RAMP.moss,deco:'flower'},
  bogslime:{body:R(['#1e2618','#2e3a24','#4a5a3a','#6a7a4e','#8a9a64']),top:R(['#2a2014','#3a2c1c','#54402a','#6a5038','#8a6a48','#a08058']),deco:'reed'},
  shardslime:{body:R(['#1a1028','#2a1a40','#3e2a5a','#5a4278','#7a5a9a']),top:null,deco:'crystal'},
  lantern:{body:R(['#4a3a14','#6a5a2a','#8a7a3e','#b0a050','#d8c870']),top:null,deco:'glow'},
  sapslime:{body:R(['#3e2006','#6a3c0c','#9a6014','#c88a24','#ecb84a']),top:null,deco:'sap'}};
function slimeFrame(S0,rx,ry,flash){const c=document.createElement('canvas');c.width=26;c.height=20;const L={x:c.getContext('2d'),w:26,h:20};L.im=L.x.createImageData(26,20);L.d=L.im.data;
  const cx=13,cy=19-ry-1;
  for(let y=0;y<20;y++)for(let x=0;x<26;x++){const nx=(x-cx)/rx,ny=(y-cy)/ry,r=Math.hypot(nx,ny*(ny>0?1.3:1));if(r>1||y>18)continue;
    const t=.3+(-nx*.4-ny*.55)*.6+Math.sqrt(Math.max(0,1-r*r))*.25;let col=pick(S0.body,t,x,y);
    if(S0.top&&ny<-.05+Math.sin(x*1.3)*.25)col=pick(S0.top,t+.15,x,y);if(S0.deco==='glow'&&r<.45)col=r<.25?[255,240,190]:[255,200,110];if(flash)col=[255,255,255];sp(L,x,y,col)}
  if(!flash){const ex=cx+3,ey=cy+1,eyc=S0.deco==='crystal'?[240,224,255]:[246,239,224];[[0,0],[1,0],[0,1],[1,1],[-1,0],[-1,1],[0,-1]].forEach(([a,b])=>sp(L,ex+a,ey+b,eyc));sp(L,ex+1,ey,S0.deco==='crystal'?[110,198,226]:[212,72,58]);sp(L,ex+1,ey+1,[30,16,30]);
    const tx=cx-3,ty=cy-ry;
    if(S0.deco==='flower'){sp(L,tx,ty,[236,226,190]);sp(L,tx,ty-1,[212,72,58]);sp(L,tx-1,ty-1,[212,72,58]);sp(L,tx+1,ty-1,[212,72,58]);sp(L,tx,ty-2,[236,120,96])}
    if(S0.deco==='reed'){for(let k=0;k<5;k++){sp(L,tx,ty-k,[106,122,78]);sp(L,tx+3,ty-k+1,[106,122,78])}sp(L,tx,ty-5,[90,58,32]);sp(L,tx,ty-6,[90,58,32]);sp(L,tx+3,ty-4,[90,58,32])}
    if(S0.deco==='crystal')[[-3,4],[0,6],[3,3]].forEach(([dx,h])=>{for(let k=0;k<h;k++){sp(L,cx+dx,ty+1-k,k===h-1?[240,224,255]:[201,168,255]);if(k<h-2)sp(L,cx+dx-1,ty+1-k,[138,74,176])}});
    if(S0.deco==='glass'){[[-4,3],[1,5],[4,2]].forEach(([dx,h])=>{for(let k=0;k<h;k++)sp(L,cx+dx,ty+1-k,k===h-1?[240,252,255]:[184,216,224])});sp(L,cx-3,cy+2,[232,255,176]);sp(L,cx+5,cy-1,[232,255,176]);sp(L,cx,cy+3,[200,240,140])}
    if(S0.deco==='glow'){sp(L,tx,ty,[255,226,160]);sp(L,tx,ty-1,[255,178,74])}
    if(S0.deco==='sap'){for(let k=0;k<5;k++)sp(L,tx-2+k,ty+1-Math.round(k*.8),k%2?[74,46,22]:[104,66,32]);sp(L,tx+3,ty-4,[150,196,96]);sp(L,tx+4,ty-4,[96,146,60]);sp(L,tx+4,ty-5,[150,196,96]);sp(L,tx+5,ty-5,[96,146,60]);
      sp(L,cx-4,cy+2,[40,20,8]);sp(L,cx-3,cy+2,[40,20,8]);sp(L,cx-4,cy+1,[90,50,20]);sp(L,cx+5,cy-1,[255,236,180]);sp(L,cx-1,cy+3,[255,220,140])}
    sp(L,cx-5,cy+ry,S0.body[1]);sp(L,cx+4,cy+ry,S0.body[1])}
  outlineL(L,hex(K.out));commit(L);return c}

const QUAD={
  wolf:{cw:36,ch:22,cx:15,len:18,bh:8,leg:6,lw:2,c:['#3a3a42','#6a6a72','#8e8e96','#b8b8c0','#ffd27a'],head:'wolf',tail:'bushy'},
  boar:{cw:36,ch:22,cx:15,len:20,bh:10,leg:4,lw:3,c:['#3a2418','#6b4a33','#8f6a48','#5a3a26','#d4483a'],head:'boar',tail:'thin'},
  rotstag:{cw:36,ch:38,cx:14,len:18,bh:9,leg:10,lw:2,c:['#3a3026','#7a6a52','#a08e70','#d9c9a0','#1a1220'],head:'stag',tail:'stub'},
  bear:{cw:48,ch:32,cx:21,len:28,bh:14,leg:6,lw:4,c:['#2a201a','#4a3a32','#6a5448','#3a2e28','#c9a8ff'],head:'bear',tail:'stub'},
  lurker:{cw:50,ch:16,cx:20,len:24,bh:6,leg:3,lw:2,c:['#1e3026','#3a5a4a','#5a7a64','#c8c8a0','#c8d468'],head:'lurker',tail:'long'},
  stalker:{cw:42,ch:22,cx:18,len:20,bh:6,leg:7,lw:1,c:['#0e0e18','#2a2a3a','#44445a','#18182a','#c9a8ff'],head:'stalker',tail:'whip'},
  sawtusk:{cw:54,ch:36,cx:24,len:30,bh:15,leg:6,lw:4,c:['#2e1a10','#5e3820','#8a5a34','#4a2c1c','#ff8a3a'],head:'boar',tail:'thin',extra:(P,Rc,o)=>{
    const bcx=o.cx-3,bcy=o.cy-Math.floor(o.bh/2)-3,R0=7;for(let y=-R0;y<=0;y++)for(let x=-R0;x<=R0;x++){const r=Math.hypot(x,y);if(r>R0)continue;const tooth=r>R0-1.6&&((Math.atan2(y,x)*8/Math.PI+8)|0)%2===0;if(r>R0-1.6&&!tooth)continue;
      P(bcx+x,bcy+y,r<2?'#3a3e44':r>R0-2.4?'#d8e0e6':x<-y*.3?'#a8b2ba':'#6e7880')}P(bcx,bcy-1,'#ffffff');P(bcx-3,bcy-4,'#ffffff');
    for(let x=-R0+1;x<R0;x++)P(bcx+x,bcy+1,'#7a2a1a');
    const nx=o.fx-2,ny=o.cy-2;for(let k=0;k<6;k++){P(nx-k+3,ny+k-2,'#4a5058');P(nx-k+4,ny+k-2,'#7a848c')}Rc(nx-3,ny+2,3,2,'#c8963a');P(nx-2,ny+2,'#fff0a8');
    for(const[dx,dy]of[[-10,-2],[-6,1],[4,-1],[8,2]])P(o.cx+dx,o.cy+dy,'#b8723a')}}};
function quadFrame(Q,mode,flash){return sprite(Q.cw,Q.ch,(P,Rc)=>{const g=Q.ch-2,cr=mode==='wind'?2:0,st=mode==='lunge'?3:0,[dk,md,lt,bl,ey]=Q.c,L=Q.len+st,bh=Q.bh,cx=Q.cx+(st?1:0),cy=g-Q.leg-Math.ceil(bh/2)+cr;
  const line=(x0,y0,x1,y1,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n),Math.round(y0+(y1-y0)*i/n),w,1,col)};
  const sw=mode==='walk0'?2:mode==='walk1'?-2:0,bx=cx-L/2+2,fx=cx+L/2-3-Q.lw,top=cy+Math.floor(bh/2)-2;
  // far legs
  line(bx+1,top,bx+1+(st?-3:-sw),g,Q.lw,dk);line(fx+1,top,fx+1+(st?3:sw),g,Q.lw,dk);
  // tail
  const tx=cx-L/2,ty=cy-1;
  if(Q.tail==='bushy'){for(let i=0;i<7;i++){Rc(tx-i,ty-2+Math.round(i*.6)+(mode==='wind'?-1:0),3,3,i>4?lt:md)}}
  else if(Q.tail==='thin'){P(tx-1,ty,dk);P(tx-2,ty-1,dk);P(tx-3,ty,dk)}
  else if(Q.tail==='long'){for(let i=0;i<14;i++)Rc(tx-i,cy-1+Math.round(Math.sin(i*.4+(mode==='walk1'?1:0))*1),1,Math.max(1,3-Math.floor(i/5)),i%3?md:dk)}
  else if(Q.tail==='whip'){for(let i=0;i<14;i++)P(tx-i,cy-2-Math.round(Math.sin(i*.35+(mode==='walk1'?1.5:0))*3),md)}
  else Rc(tx-2,ty-1,3,2,md);
  // body
  for(let y=Math.floor(cy-bh/2);y<=cy+bh/2;y++)for(let x=Math.floor(cx-L/2);x<=cx+L/2;x++){const nx=(x-cx)/(L/2),ny=(y-cy)/(bh/2),r=nx*nx+ny*ny;if(r>1)continue;
    P(x,y,ny<-.5?lt:ny>.45?(Q.head==='boar'||Q.head==='bear'?dk:bl):((x*3+y*7)%11===0?dk:md))}
  if(Q.head==='boar')for(let x=Math.floor(cx-L/2+3);x<cx+L/2-2;x+=2)P(x,Math.floor(cy-bh/2)-1,dk);
  if(Q.head==='bear')[[-6,4],[-2,6],[2,5],[6,3]].forEach(([dx,h])=>{for(let k=0;k<h;k++){P(cx+dx,Math.floor(cy-bh/2)-k,k===h-1?'#f0e0ff':ey);if(k<h-2)P(cx+dx-1,Math.floor(cy-bh/2)-k,'#8a4ab0')}});
  if(Q.head==='stag')[[-4,-1],[2,0],[-1,2]].forEach(([dx,dy])=>{P(cx+dx,cy+dy-2,'#86b47f');P(cx+dx+1,cy+dy-2,'#5d8a6a')});
  if(Q.head==='stalker')for(let x=Math.floor(cx-L/2+2);x<cx+L/2-2;x+=3)P(x,Math.floor(cy-bh/2)-1-((x+(mode==='walk1'?1:0))%2),'#44445a');
  // near legs
  line(bx+3,top,bx+3+(st?-4:sw),g,Q.lw,md);line(fx+3,top,fx+3+(st?4:-sw),g,Q.lw,md);
  // head
  const hx=Math.round(cx+L/2-1),open=mode==='lunge';
  if(Q.head==='wolf'){const hy=cy-3+cr;Rc(hx,hy-3,6,6,md);Rc(hx,hy-3,6,1,lt);Rc(hx+5,hy-1,5,2,lt);P(hx+9,hy-1,dk);if(open){Rc(hx+5,hy+2,4,1,md);P(hx+6,hy+1,'#efe4c8')}else Rc(hx+5,hy+1,4,1,md);
    P(hx+1,hy-5,md);P(hx+1,hy-4,md);P(hx+2,hy-4,md);P(hx+3,hy-5,dk);P(hx+4,hy-2,ey)}
  else if(Q.head==='boar'){const hy=cy+cr;Rc(hx-1,hy-4,7,8,md);Rc(hx-1,hy-4,7,1,lt);Rc(hx+6,hy-1,3,4,'#b88a68');P(hx+8,hy,dk);P(hx+8,hy+2,dk);[[6,2],[7,1],[7,0],[8,-1]].forEach(([a,b2])=>P(hx+a,hy+b2-(open?1:0),'#efe4c8'));P(hx,hy-5,dk);P(hx+1,hy-6,dk);P(hx+3,hy-2,ey)}
  else if(Q.head==='stag'){const hy=cy-9+cr*2;line(hx-1,cy-2,hx+2,hy+2,3,md);Rc(hx+1,hy-1,5,4,md);Rc(hx+1,hy-1,5,1,lt);Rc(hx+5,hy+1,3,2,bl);P(hx+7,hy+1,dk);P(hx+3,hy,ey);P(hx+1,hy-2,md);
    const ac=Q.c[3];[[0,-2],[-1,-3],[-1,-4],[-2,-5],[0,-5],[-3,-6],[1,-6],[-2,-7]].forEach(([a,b2])=>P(hx+2+a,hy+b2,ac));[[2,-2],[3,-3],[3,-4],[4,-5],[2,-5],[5,-6],[3,-6],[4,-7]].forEach(([a,b2])=>P(hx+2+a,hy+b2,ac));P(hx+1,hy-6,'#86b47f');P(hx+5,hy-5,'#5d8a6a')}
  else if(Q.head==='bear'){const hy=cy-2+cr;Rc(hx-1,hy-5,9,9,md);Rc(hx-1,hy-5,9,1,lt);Rc(hx+7,hy-1,4,4,lt);P(hx+10,hy-1,dk);if(open){Rc(hx+7,hy+3,4,2,dk);P(hx+8,hy+3,'#efe4c8');P(hx+10,hy+3,'#efe4c8')}P(hx,hy-6,md);P(hx+1,hy-7,md);P(hx+5,hy-6,md);P(hx+4,hy-3,'#ffd27a')}
  else if(Q.head==='lurker'){const hy=cy+cr;Rc(hx-2,hy-2,5,4,md);for(let i=0;i<11;i++){Rc(hx+2+i,hy-1-(open&&i>3?1:0),1,i>8?1:2,i%2?md:lt);if(i%2===0&&i>1)P(hx+2+i,hy+1+(open?1:0),'#efe4c8')}Rc(hx+1,hy-3,2,1,lt);P(hx+1,hy-3,ey);if(open)Rc(hx+4,hy+1,8,1,'#2a0a0a')}
  else if(Q.head==='stalker'){const hy=cy-2+cr;Rc(hx,hy-2,6,4,md);Rc(hx+5,hy-1,3,2,md);P(hx+3,hy-1,ey);P(hx+5,hy-1,ey);P(hx+1,hy-3,dk);P(hx+2,hy-4,dk);if(open)Rc(hx+5,hy+1,3,1,'#efe4c8')}
  if(Q.extra)Q.extra(P,Rc,{cx,cy,bh,L,top,mode,g,bx,fx});
},flash)}

const GOB_S={scargob:{sk:'#8a7aa0',skd:'#5a4a78',c:['#3a2a4e','#241838','#5a4278'],hat:'crystal',wp:'none'},reed:{sk:'#7a9a5a',skd:'#5a7a3a',c:['#3a6a7a','#24485a','#5a8a9a'],hat:'reed',wp:'none'},gob:{sk:'#6a8a3a',skd:'#4a6a28',c:['#6a6a3a','#4a4a24','#8a8a4e'],hat:'goggles',wp:'wrench'},mossgob:{sk:'#7aa05a',skd:'#4e7a3a',c:['#4a5a2e','#2e3a1c','#6a7a42'],hat:'shroom',wp:'none'},raider:{sk:'#8a8a4a',skd:'#5a6a32',c:['#5a3a2a','#3a2418','#7a5038'],hat:'kerchief',wp:'knife'}};
function gobFrame(Gs,mode,flash){return sprite(28,26,(P,Rc)=>{const g=24,b=mode==='walk1'?1:0,lg=mode==='walk0'?1:mode==='walk1'?-1:0,[c0,c1,c2]=Gs.c;
  Rc(10+lg,20,2,4,c1);Rc(14-lg,20,2,4,c1);Rc(9+lg,g-1,3,1,'#1a1410');Rc(14-lg,g-1,3,1,'#1a1410');
  Rc(9,13+b,7,8,c0);Rc(9,13+b,2,8,c1);Rc(9,19+b,7,1,'#3a2a20');P(12,19+b,'#c8a050');
  Rc(9,5+b,8,8,Gs.sk);Rc(9,5+b,2,8,Gs.skd);for(let i=0;i<4;i++){P(8-i,7+b+Math.floor(i/2),Gs.sk);P(17+i,7+b+Math.floor(i/2),Gs.sk)}P(4,9+b,Gs.skd);P(21,9+b,Gs.skd);
  P(15,8+b,'#ffd27a');P(13,8+b,'#ffd27a');P(17,10+b,Gs.skd);Rc(13,11+b,3,1,'#2a1a10');
  if(Gs.hat==='goggles'){Rc(9,6+b,8,1,c1);Rc(12,5+b,2,2,'#c8a050');Rc(15,5+b,2,2,'#c8a050');P(12,5+b,'#6ec6e2');P(15,5+b,'#6ec6e2');Rc(9,4+b,8,1,c2)}
  else if(Gs.hat==='crystal'){[[10,3],[12,2],[14,3],[16,2]].forEach(([x,h],i)=>{for(let k=0;k<h+2;k++)P(x,4+b-k,k>h?'#f0e0ff':'#c9a8ff');P(x-1,4+b,'#8a4ab0')});P(11,10+b,'#c9a8ff');P(15,12+b,'#c9a8ff');P(10,16+b,'#c9a8ff')}
  else if(Gs.hat==='reed'){for(let k=0;k<5;k++)Rc(8+k,5+b-k,11-k*2,1,k%2?'#c8b070':'#a89050');Rc(6,5+b,15,1,'#8a7040')}
  else if(Gs.hat==='shroom'){for(let y=0;y<6;y++){const hw=[3,5,6,7,7,8][y];for(let x=-hw;x<=hw;x++){const xx=13+x,yy=y-1+b;P(xx,yy,y===5?'#3a1a20':x<-hw+2?'#e07a6a':x>hw-3?'#7a2a2e':'#b84a42')}}
    for(const[x,y]of[[10,1],[15,0],[13,3],[18,3],[8,3]])P(x,y+b,'#f6e8d0');Rc(6,5+b,15,1,'#3a1a20');P(11,6+b,'#c8d468');P(16,6+b,'#c8d468')}
  else{Rc(9,9+b,8,3,'#b23a2e');P(17,10+b,'#b23a2e');Rc(9,4+b,8,2,c1);P(8,6+b,c1)}
  let hx,hy;if(mode==='wind'){hx=8;hy=9+b}else if(mode==='lunge'){hx=20;hy=14}else{hx=16;hy=16+b}
  Rc(Math.min(15,hx),Math.min(14+b,hy),Math.abs(hx-15)+1,1,c0);P(hx,hy,Gs.sk);
  if(Gs.wp==='none'){}else if(Gs.wp==='wrench'){if(mode==='wind'){Rc(hx-1,hy-6,1,6,'#9aa6ae');Rc(hx-2,hy-7,3,2,'#6a7078')}else{Rc(hx,hy-1,6,1,'#9aa6ae');Rc(hx+5,hy-2,2,3,'#6a7078')}}
  else{if(mode==='wind'){for(let i=0;i<6;i++)P(hx-1+Math.round(i*.3),hy-1-i,'#eef5f8')}else for(let i=0;i<6;i++)P(hx+1+i,hy-Math.round(i*.2),'#eef5f8');P(hx,hy-1,'#3a2418')}
},flash)}

function treantFrame(mode,flash,PL){return sprite(52,58,(P,Rc)=>{const g=56,cx=25,b=mode==='walk1'?1:0,sw=mode==='walk0'?1:mode==='walk1'?-1:0,bk=TH&&RAMP.bark.map(rgb),gl=PL?(mode==='wind'?PL.gl2:PL.gl):mode==='wind'?'#c9ff6a':'#9bd04c';
  const B=PL?PL.B:['#160d08','#26170e','#3b2416','#55331d','#714426','#8f5a31'],M=PL?PL.M:['#2f6127','#467f2d','#63a136'];
  const line=(x0,y0,x1,y1,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n)-(w>>1),Math.round(y0+(y1-y0)*i/n),w,1,col)};
  line(cx-4,46,cx-6+sw*2,g,4,B[2]);line(cx+4,46,cx+6-sw*2,g,4,B[3]);Rc(cx-9+sw*2,g-1,6,2,B[1]);Rc(cx+3-sw*2,g-1,6,2,B[2]);
  for(let y=16;y<48;y++){const hw=7+Math.round(Math.sin(y*.3)*1)+(y>40?2:0);for(let x=cx-hw;x<=cx+hw;x++){const u=(x-cx+hw)/(2*hw);P(x,y+b,B[Math.max(1,Math.min(5,Math.round(1+Math.sin(u*Math.PI)*3.5-((x*7+y*3)%11===0?1:0))))])}}
  [[cx-5,22],[cx-3,34],[cx+4,28],[cx+2,40]].forEach(([x,y])=>{Rc(x,y+b,3,1,M[1]);P(x+1,y-1+b,M[2])});
  Rc(cx-4,23+b,3,3,'#0a0604');Rc(cx+2,23+b,3,3,'#0a0604');P(cx-3,24+b,gl);P(cx+3,24+b,gl);Rc(cx-3,30+b,7,1,'#0a0604');P(cx-1,31+b,'#0a0604');P(cx+2,31+b,'#0a0604');
  let lh,rh;if(mode==='wind'){lh=[cx-14,6];rh=[cx+14,6]}else if(mode==='lunge'){lh=[cx+18,44];rh=[cx+22,40]}else{lh=[cx-15,40+sw];rh=[cx+15,40-sw]}
  line(cx-6,24+b,lh[0],lh[1],3,B[3]);line(cx+6,24+b,rh[0],rh[1],3,B[2]);[lh,rh].forEach(([x,y])=>{P(x-2,y+2,B[2]);P(x+2,y+2,B[2]);P(x,y+3,B[2]);P(x-1,y-1,M[1])});
  for(const[x0,y0,x1,y1]of[[cx-2,17,cx-10,4],[cx+2,17,cx+9,2],[cx,17,cx+1,0],[cx-6,10,cx-14,8],[cx+6,9,cx+15,10]])line(x0,y0+b,x1,y1+b,2,B[2]);
  [[cx-10,3],[cx+9,1],[cx+1,0],[cx-14,7],[cx+15,9],[cx-4,6]].forEach(([x,y],i)=>{Rc(x-2,y+b,4,3,M[i%2]);P(x,y-1+b,M[2])});
  if(PL){for(const[x,y,w]of[[cx-8,30,5],[cx+5,22,4],[cx-6,40,4],[cx+6,36,5]]){for(let k=0;k<w;k++){P(x+k,y+b,k===0?M[2]:M[1]);P(x+k,y+1+b,M[0])}P(x+1,y-1+b,M[2])}
    for(const[x,y]of[[cx-3,28],[cx+3,33],[cx,38],[cx-1,44]])P(x,y+b,gl);for(let y=48;y<56;y++){P(cx-10-(y-48),y,B[2]);P(cx+10+(y-48),y,B[3])}}
},flash)}

function drakeFrame(ph,charge,flash){return sprite(36,26,(P,Rc)=>{const bd='#3a4a5a',dk='#24303c',lt='#5a7088',vn='#6ec6e2',cx=17,cy=14;
  for(let i=0;i<10;i++)P(cx-6-i,cy+Math.round(Math.sin(i*.6+ph)*1.5),i%3?bd:dk);
  for(let y=-3;y<=3;y++)for(let x=-7;x<=7;x++)if((x/7)**2+(y/3)**2<=1)P(cx+x,cy+y,y<-1?lt:y>1?dk:bd);
  Rc(cx+6,cy-4,3,3,bd);Rc(cx+8,cy-5,5,3,bd);Rc(cx+8,cy-5,5,1,lt);P(cx+11,cy-4,vn);P(cx+12,cy-3,charge?'#ffe2a0':dk);if(charge){P(cx+13,cy-3,'#f0e0ff');P(cx+14,cy-3,vn)}P(cx+9,cy-6,dk);P(cx+10,cy-7,dk);
  const tips=ph===0?[[-6,-12],[4,-12]]:ph===1?[[-10,-4],[8,-5]]:[[-6,6],[4,7]];
  for(const[txx,tyy]of tips){const x0=cx-1,y0=cy-2,x1=cx+txx,y1=cy+tyy,n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));for(let i=0;i<=n;i++){const x=Math.round(x0+(x1-x0)*i/n),y=Math.round(y0+(y1-y0)*i/n);P(x,y,dk);for(let k=1;k<4-Math.floor(i/n*3);k++)P(x+(txx<0?k:-k),y+(tyy<0?k:-k),k===2?vn:lt)}}
  P(cx-2,cy+3,dk);P(cx+3,cy+3,dk);P(cx-2,cy+4,dk);P(cx+3,cy+4,dk);for(let x=-4;x<=4;x+=2)P(cx+x,cy,vn)},flash)}

/* ---------- Chapter II: Inner Scar creatures ---------- */
function fiendFrame(mode,flash){return sprite(38,36,(P,Rc)=>{const g=34,cx=18,b=mode==='walk1'?1:0,sw=mode==='walk0'?1:mode==='walk1'?-1:0,crouch=mode==='wind'?2:0;
  const dk='#120a18',bd='#24142e',lt='#3a2448',vn='#ff5a3a',vl='#ffb27a',eye='#ff3020';
  const line=(x0,y0,x1,y1,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n)-(w>>1),Math.round(y0+(y1-y0)*i/n),w,1,col)};
  line(cx-3,24+crouch,cx-5+sw*2,g,3,dk);line(cx+3,24+crouch,cx+5-sw*2,g,3,bd);Rc(cx-7+sw*2,g-1,5,2,dk);Rc(cx+3-sw*2,g-1,5,2,dk);
  for(let y=10+crouch;y<26+crouch;y++){const hw=Math.round(5+Math.sin((y-10)/16*Math.PI)*2);for(let x=cx-hw;x<=cx+hw;x++)P(x,y+b,x<cx-hw+2?dk:x>cx+hw-2?lt:bd)}
  [[cx-2,13],[cx-1,15],[cx,17],[cx+1,18],[cx+2,20],[cx-3,19],[cx-4,21],[cx+3,15],[cx+4,14]].forEach(([x,y],i)=>P(x,y+b+crouch,i%3?vn:vl));
  const hy=4+crouch+b;Rc(cx-1,hy,7,7,bd);Rc(cx-1,hy,7,1,lt);P(cx+3,hy+3,eye);P(cx+5,hy+3,eye);P(cx+4,hy+5,vn);
  [[0,-1],[-1,-2],[-2,-3],[-2,-4],[-1,-5]].forEach(([a,c])=>P(cx+a,hy+c,'#d9d2bc'));[[5,-1],[6,-2],[7,-2],[8,-3]].forEach(([a,c])=>P(cx+a,hy+c,'#d9d2bc'));
  let h1,h2;if(mode==='wind'){h1=[cx-10,2];h2=[cx+10,2]}else if(mode==='lunge'){h1=[cx+16,20];h2=[cx+18,16]}else{h1=[cx-8,26+sw];h2=[cx+9,27-sw]}
  line(cx-4,12+b+crouch,h1[0],h1[1],2,bd);line(cx+5,12+b+crouch,h2[0],h2[1],2,lt);[h1,h2].forEach(([x,y])=>{P(x-1,y+1,'#efe4c8');P(x+1,y+1,'#efe4c8');P(x,y+2,'#efe4c8')});
  if(mode==='lunge')for(let i=0;i<8;i++)P(cx+12+i,10+i,i%2?vl:vn)},flash)}
function unboundFrame(ph,cast,flash){return sprite(66,74,(P,Rc)=>{const cx=33,top=8,vd='#0b0910',v2='#1a1028',v3='#2e1c44',m1='#efe4d8',m2='#c8bcb0',m3='#8a8090',gl=cast?'#f0e0ff':'#c9a8ff';
  for(let y=34;y<72;y++){const hw=Math.round(14+(y-34)*.25+Math.sin(y*.3+ph)*2);for(let x=cx-hw;x<=cx+hw;x++){if(y>58&&((x+Math.round(Math.sin(y*.5+ph)*3))%5===0||hash(x,y,ph|0)>.7+((72-y)/30)))continue;P(x,y,x<cx-hw+3?vd:x>cx+hw-3?v3:v2)}}
  for(let y=top;y<top+30;y++){const t=(y-top)/30,hw=Math.round(13*Math.sqrt(1-Math.pow(t*2-1,2))+(t<.5?1:0));for(let x=cx-hw;x<=cx+hw;x++){const e=x<cx-hw+2;P(x,y,e?m3:x>cx+hw-3?m2:m1)}}
  [[cx-7,top+10],[cx+3,top+10]].forEach(([x,y])=>{Rc(x,y,5,6,vd);Rc(x+1,y+1,3,4,v2);P(x+2,y+2,gl);P(x+2,y+3,gl);if(cast){P(x+1,y+2,gl);P(x+3,y+2,gl)}});
  Rc(cx-4,top+21,9,2,vd);for(let i=0;i<9;i+=2)P(cx-4+i,top+23,vd);
  [[cx-1,top],[cx,top+1],[cx-1,top+2],[cx,top+3],[cx+1,top+4],[cx+2,top+5],[cx+1,top+6],[cx+2,top+7],[cx+3,top+8]].forEach(([x,y])=>P(x,y,vd));[[cx-9,top+24],[cx-8,top+25],[cx-9,top+26],[cx-10,top+27]].forEach(([x,y])=>P(x,y,vd));
  for(let i=0;i<6;i++){const x=cx-12+i*5;P(x,top+29,m3);P(x+1,top+30,m3)}
  if(cast)for(let i=0;i<10;i++){const a=i/10*6.28;P(Math.round(cx+Math.cos(a)*20),Math.round(top+14+Math.sin(a)*20),gl)}},flash)}

/* ---------- Chapter III creatures ---------- */
function sporecapFrame(mode,flash){return sprite(32,30,(P,Rc)=>{const g=28,cx=15,b=mode==='walk1'?1:0,lg=mode==='walk0'?1:mode==='walk1'?-1:0,ln=mode==='lunge'?3:0,pf=mode==='wind'?2:0;
  const ST=['#3e3032','#64504e','#8e7670','#b8a096','#e0cfc2'],CAP=['#2a1018','#4a1c28','#6e2c3a','#94404c','#b85a60','#d87e78'],GL='#c8d468';
  Rc(cx-5+lg,g-5,3,5,ST[1]);Rc(cx-6+lg,g-1,5,1,ST[0]);Rc(cx+2-lg,g-5,3,5,ST[2]);Rc(cx+2-lg,g-1,5,1,ST[1]);P(cx-7+lg,g-1,ST[1]);P(cx+7-lg,g-1,ST[2]);
  for(let y=12;y<g-4;y++){const hw=4+(y>g-9?1:0);for(let x=-hw;x<=hw;x++){const u=(x+hw)/(2*hw);P(cx+x+ln*(1-(y-12)/16),y+b,ST[Math.max(0,Math.min(4,Math.round(3.6-u*3+((x*5+y*3)%7===0?-1:0))))])}}
  for(const[y,s]of[[16,-1],[20,1]])for(let k=0;k<4;k++)P(cx+(s<0?-5-k:5+k)+ln,y+b+Math.round(k*.6)+(mode==='wind'?-k:0),k===3?ST[3]:ST[1]);
  P(cx-2+ln,15+b,'#0a0608');P(cx+2+ln,15+b,'#0a0608');P(cx-2+ln,14+b,GL);P(cx+2+ln,14+b,GL);Rc(cx-1+ln,18+b,3,1,'#2a1a1a');
  const ccx=cx+ln,ccy=11+b-pf,rx=12+pf,ry=7+pf;for(let y=-ry;y<=1;y++)for(let x=-rx;x<=rx;x++){const nx=x/rx,ny=y/ry;if(nx*nx+ny*ny>1)continue;
    const l=-.55*nx-.8*ny,t=Math.round(2.4+l*2.2+((x*3+y*7)%9===0?-.6:0));P(ccx+x,ccy+y,CAP[Math.max(0,Math.min(5,t))])}
  for(let x=-rx+1;x<rx;x++){P(ccx+x,ccy+2,x%2?'#5a3a2a':'#3a2018');if(x%3===0)P(ccx+x,ccy+3,GL)}
  for(const[x,y,s]of[[-6,-4,2],[1,-6,2],[6,-3,1],[-2,-1,1],[9,-1,1],[-9,-1,1]]){Rc(ccx+x,ccy+y,s,s,'#f2e2cc');P(ccx+x,ccy+y,'#fff8ec')}
  if(mode==='wind')for(const[x,y]of[[-12,-10],[-4,-13],[6,-12],[13,-8],[0,-15]])P(ccx+x,ccy+y,GL)},flash)}
function rotflyFrame(ph,charge,flash,big){const k=big?1.5:1,w=Math.round(32*k),h=Math.round(26*k);return sprite(w,h,(P,Rc)=>{const cx=Math.round(w*.5),cy=Math.round(h*.5)+1;
  const CH=['#120a10','#24141e','#3a2230','#563446','#744a5e'],AB=['#1e1418','#3a2428','#5a3a36','#7e5a44','#a07e52'],E=['#5a0a0a','#a01e1a','#e04a3a','#ff9a7a'];
  const ell=(ex,ey,rx,ry,ramp,stripe)=>{for(let y=Math.floor(-ry);y<=ry;y++)for(let x=Math.floor(-rx);x<=rx;x++){const nx=x/rx,ny=y/ry,r=nx*nx+ny*ny;if(r>1)continue;let t=2.2-nx*1.1-ny*1.6;if(stripe&&((x+Math.round(rx*2))%3===0))t-=1.2;if(r>.7)t-=.6;P(ex+x,ey+y,ramp[Math.max(0,Math.min(ramp.length-1,Math.round(t)))])}};
  const wa=[-1,0,1][ph%3];for(const[off,al]of[[-2*k,'rgba(170,200,214,.5)'],[1*k,'rgba(200,226,236,.62)']]){const wx=cx+off,wy=cy-4*k;for(let i=0;i<10*k;i++){const yy=Math.round(wy-(wa===-1?i*.9:wa===0?i*.25:-i*.4)),xx=Math.round(wx-i*.55);for(let j=-Math.round(2.2*k);j<=Math.round(2.2*k);j++)P(xx+j*.3,yy+j,al)}
    for(let i=0;i<10*k;i+=2)P(Math.round(wx-i*.55),Math.round(wy-(wa===-1?i*.9:wa===0?i*.25:-i*.4)),'rgba(255,255,255,.7)')}
  const ab=charge?{x:cx-2*k,y:cy+5*k}:{x:cx-7*k,y:cy+2*k};ell(Math.round(ab.x),Math.round(ab.y),7*k,4.4*k,AB,1);
  const tip=charge?[Math.round(ab.x+3*k),Math.round(ab.y+5*k)]:[Math.round(ab.x-8*k),Math.round(ab.y+1)];P(tip[0],tip[1],'#e8dcc0');P(tip[0]+(charge?1:-1),tip[1]+(charge?1:0),'#fff6e0');
  if(big){for(let i=0;i<4;i++)P(Math.round(ab.x-3*k+i*3),Math.round(ab.y+1),'#ff9a3a')}
  ell(cx+1,cy-1,4.6*k,4*k,CH,0);P(cx-1,cy-3*k,'#a07a90');P(cx,cy-3*k,'#c8a0b4');
  const hx=Math.round(cx+6*k),hy=Math.round(cy);ell(hx,hy,3*k,3*k,CH,0);for(let y=-1;y<=Math.round(k);y++)for(let x=0;x<=Math.round(1.5*k);x++)P(hx+x+1,hy+y-1,E[charge?3:Math.min(3,2-((x+y)%2))]);P(hx+1,hy-1,'#ffffff');
  if(big)for(const[x,h]of[[-2,3],[0,5],[2,3]])for(let i=0;i<h;i++)P(hx+x,hy-3*k-i,i===h-1?'#f0e0ff':'#c9a8ff');
  for(let i=0;i<3;i++){const lx=cx-2+i*3;for(let j=0;j<4*k;j++)P(lx+Math.round(j*.3),cy+3*k+j,CH[2])}P(hx+3*k,hy+2,'#3a2230');P(hx+3*k+1,hy+3,'#3a2230')},flash)}
const ROT_TREANT={B:['#100a0e','#20141a','#321e26','#462a34','#5a3842','#704a52'],M:['#6a3e5e','#8a5478','#c8d468'],gl:'#ff6aa0',gl2:'#ffd0e0'};
function buildRoster(){
  for(const t in SLIME_S){if(t==='moss')continue;const S0=SLIME_S[t];MSP[t]=[slimeFrame(S0,9,7),slimeFrame(S0,10,6),slimeFrame(S0,8,8)];MSP[t+'F']=[slimeFrame(S0,9,7,1),slimeFrame(S0,10,6,1),slimeFrame(S0,8,8,1)]}
  const modes=['walk0','walk1','wind','lunge'];
  for(const t in QUAD){const Q=QUAD[t],o={kind:'gen',ax:Q.cx,ay:Q.ch-2,fps:Q.head==='lurker'?3:5},F={};for(const m of modes){o[m]=quadFrame(Q,m);F[m]=quadFrame(Q,m,1)}o.F=F;MSP[t]=o}
  for(const t in GOB_S){const o={kind:'gen',ax:12,ay:24,fps:6},F={};for(const m of modes){o[m]=gobFrame(GOB_S[t],m);F[m]=gobFrame(GOB_S[t],m,1)}o.F=F;MSP[t]=o}
  {const o={kind:'gen',ax:25,ay:56,fps:2},F={};for(const m of modes){o[m]=treantFrame(m);F[m]=treantFrame(m,1)}o.F=F;MSP.treant=o}
  {const o={kind:'gen',ax:18,ay:34,fps:5},F={};for(const md of modes){o[md]=fiendFrame(md);F[md]=fiendFrame(md,1)}o.F=F;MSP.fiend=o}
  MSP.unbound={idle:[0,2,4].map(p=>unboundFrame(p,0)),cast:unboundFrame(1,1),F:unboundFrame(0,0,1)};
  {const o={kind:'gen',ax:15,ay:28,fps:3},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=sporecapFrame(md);F[md]=sporecapFrame(md,1)}o.F=F;MSP.sporecap=o}
  {const o={kind:'gen',ax:25,ay:56,fps:2},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=treantFrame(md,0,ROT_TREANT);F[md]=treantFrame(md,1,ROT_TREANT)}o.F=F;MSP.rootheart=o}
  for(const[t,big]of[['rotfly',0],['rotqueen',1]])MSP[t]={kind:'fly',ax:big?24:16,ay:big?24:16,fl:[0,1,2].map(p=>rotflyFrame(p,0,0,big)),ch:rotflyFrame(1,1,0,big),F:{fl:[0,1,2].map(p=>rotflyFrame(p,0,1,big)),ch:rotflyFrame(1,1,1,big)}};
  MSP.drake={kind:'drake',ax:17,ay:20,fl:[0,1,2].map(p=>drakeFrame(p,0)),ch:drakeFrame(1,1),F:{fl:[0,1,2].map(p=>drakeFrame(p,0,1)),ch:drakeFrame(1,1,1)}}}

/* ---------- item icons ---------- */
const ICONS={};
const MANNEQUIN={look:{sex:0,build:1,face:0,hair:-1,hairC:4,beard:0,skin:6,eye:0,outfit:3},cls:'ronin'};
function iconURL(it){const fx=isFem()?1:0,st=(GEAR[it.src]||{}).start,oc=st&&typeof pl!=='undefined'&&pl.ch?pl.ch.look.outfit|0:3,k=it.src+'|'+it.slot+'|'+(it.weap||'')+'|'+fx+'|'+oc;if(ICONS[k])return ICONS[k];
  const c=document.createElement('canvas');c.width=24;c.height=24;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
  const pal=st&&it.slot!=='weapon'?LOOK.outfit[oc].slice(0,5):(GEAR[it.src]||GEAR.wanderer).pal;
  if(it.slot==='head'||it.slot==='chest'||it.slot==='feet'){const MA=resolve({...MANNEQUIN,look:{...MANNEQUIN.look,sex:fx,outfit:oc}},{[it.slot]:it});MA.weap='none';const fr=frame((P,Rc,E)=>body(P,Rc,E,MA,{arm:'idle',lf:1,lb:-1}));
    const[sx,sy]=it.slot==='head'?[12,0]:it.slot==='chest'?[12,13]:[13,22];x.drawImage(fr,sx,sy,24,24,0,0,24,24)}
  else{const s=sprite(24,24,(P,Rc)=>{
    if(it.slot==='hands'){Rc(7,8,8,9,pal[0]);Rc(7,8,2,9,pal[1]);[[9,5],[11,4],[13,5],[15,7]].forEach(([a,b2])=>Rc(a,b2,2,4,pal[0]));Rc(6,16,10,3,pal[4]);Rc(16,11,3,3,pal[0])}
    else if(it.slot==='charm'){for(let i=0;i<6;i++){P(7+i,4+i*.5,'#6b4a33');P(16-i,4+i*.5,'#6b4a33')}const[c1,c2]=CHARM_C[(GEAR[it.src]||GEAR.wanderer).charm.s]||CHARM_C.knot;Rc(9,8,6,7,c1);Rc(11,10,2,3,c2);P(12,16,c2);P(12,17,c2)}
    else{const w=it.weap,wd=pal[0],gd=pal[3]==='#f2e6c8'?'#e3b04b':pal[3];
      if(w==='katana'){for(let i=0;i<14;i++){P(5+i,19-i,'#eef5f8');P(6+i,19-i,'#8fa6b4')}Rc(3,19,3,3,'#1c1420');P(4,20,'#efe4c8');Rc(5,17,3,2,gd);Rc(6,18,2,3,gd)}
      else if(w==='daggers'){for(const o of[0,6])for(let i=0;i<8;i++){P(6+i+o*.4,16-i+o,'#eef5f8')}Rc(4,16,3,2,'#1c1420');Rc(6,15,2,2,gd);Rc(8,20,3,2,'#1c1420');Rc(10,19,2,2,gd)}
      else if(w==='bow'){for(let y=2;y<22;y++){P(8+Math.round(5*Math.sin(Math.PI*(y-2)/20)),y,wd)}for(let y=3;y<21;y++)P(8,y,'#f2e6c8');P(8,2,pal[4]);P(8,21,pal[4]);Rc(12,11,2,2,pal[4])}
      else if(w==='tome'){Rc(6,5,12,15,mixC(pal[1],'#3a2440',.4));Rc(15,5,3,15,gd==='#e3b04b'?'#d9d2bc':gd);Rc(7,6,8,1,'#5a4466');Rc(9,10,4,4,'#d9d2bc');P(10,11,'#15131f');P(11,11,'#9bd04c');Rc(6,19,12,1,'#efe4c8')}
      else if(w==='axe'){for(let i=0;i<15;i++){P(7+i*.6,21-i,wd);P(8+i*.6,21-i,mixC(wd,'#000',.3))}for(let i=0;i<6;i++){const h=1+Math.round(i*.7);for(let j=-h;j<=h;j++)P(16+i,6+j,i===5?'#f2f8fb':j===-h?'#c4d0d8':'#8796a2')}P(15,6,'#4e5a64')}
      else if(w==='hammer'){for(let i=0;i<14;i++){P(8+i*.5,22-i,wd);P(9+i*.5,22-i,mixC(wd,'#000',.3))}Rc(10,3,10,6,'#8796a2');Rc(10,3,10,1,'#f2f8fb');Rc(10,8,10,1,'#2a3038');Rc(10,3,1,6,'#4e5a64');Rc(19,3,1,6,'#4e5a64')}
      else if(w==='spear'){for(let i=0;i<18;i++)P(4+i,21-i,wd);[[22,3],[21,3],[22,2],[20,4],[21,2],[23,1]].forEach(([x,y],k)=>P(x,y,k<2?'#f2f8fb':'#c4d0d8'));P(19,6,'#d4483a');P(18,6,'#d4483a');P(19,7,'#d4483a')}
      else if(w==='shield'){for(let j=0;j<15;j++){const ww=j<9?11:Math.max(1,11-(j-8)*2);const ox=Math.round((11-ww)/2);for(let i=0;i<ww;i++)P(2+ox+i,5+j,i===0||i===ww-1||j===0?'#8796a2':i<ww/2?pal[1]:pal[0])}for(let j=7;j<15;j++)P(7,j,gd);for(let i=4;i<11;i++)P(i,10,gd);for(let i=0;i<9;i++){P(14+i,19-i,'#eef5f8');P(15+i,19-i,'#8fa6b4')}Rc(13,18,3,2,gd);P(12,20,'#1c1420')}
      else{for(let y=6;y<23;y++)P(12+(y>14?0:0),y,wd);Rc(11,2,3,3,pal[3]==='#f2e6c8'?'#9bd04c':pal[3]);P(12,2,'#ffffff');P(10,5,'#5d8a6a');P(14,5,'#86b47f')}}});x.drawImage(s,0,0)}
  return ICONS[k]=c.toDataURL()}
