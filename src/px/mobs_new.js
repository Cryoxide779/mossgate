/* ---------- Ashveil Reach roster (Bible ch.3.15) ---------- */
const SLIME_S={
  moss:{body:RAMP.slime,top:RAMP.moss,deco:'flower'},
  bogslime:{body:R(['#1e2618','#2e3a24','#4a5a3a','#6a7a4e','#8a9a64']),top:R(['#2a2014','#3a2c1c','#54402a','#6a5038','#8a6a48','#a08058']),deco:'reed'},
  shardslime:{body:R(['#1a1028','#2a1a40','#3e2a5a','#5a4278','#7a5a9a']),top:null,deco:'crystal'},
  lantern:{body:R(['#4a3a14','#6a5a2a','#8a7a3e','#b0a050','#d8c870']),top:null,deco:'glow'}};
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
    if(S0.deco==='glow'){sp(L,tx,ty,[255,226,160]);sp(L,tx,ty-1,[255,178,74])}
    sp(L,cx-5,cy+ry,S0.body[1]);sp(L,cx+4,cy+ry,S0.body[1])}
  outlineL(L,hex(K.out));commit(L);return c}

const QUAD={
  wolf:{cw:36,ch:22,cx:15,len:18,bh:8,leg:6,lw:2,c:['#3a3a42','#6a6a72','#8e8e96','#b8b8c0','#ffd27a'],head:'wolf',tail:'bushy'},
  boar:{cw:36,ch:22,cx:15,len:20,bh:10,leg:4,lw:3,c:['#3a2418','#6b4a33','#8f6a48','#5a3a26','#d4483a'],head:'boar',tail:'thin'},
  rotstag:{cw:36,ch:38,cx:14,len:18,bh:9,leg:10,lw:2,c:['#3a3026','#7a6a52','#a08e70','#d9c9a0','#1a1220'],head:'stag',tail:'stub'},
  bear:{cw:48,ch:32,cx:21,len:28,bh:14,leg:6,lw:4,c:['#2a201a','#4a3a32','#6a5448','#3a2e28','#c9a8ff'],head:'bear',tail:'stub'},
  lurker:{cw:50,ch:16,cx:20,len:24,bh:6,leg:3,lw:2,c:['#1e3026','#3a5a4a','#5a7a64','#c8c8a0','#c8d468'],head:'lurker',tail:'long'},
  stalker:{cw:42,ch:22,cx:18,len:20,bh:6,leg:7,lw:1,c:['#0e0e18','#2a2a3a','#44445a','#18182a','#c9a8ff'],head:'stalker',tail:'whip'}};
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
    P(x,y,ny<-.5?lt:ny>.45?(Q.head==='boar'||Q.head==='bear'?dk:bl):((x+y)%5===0?dk:md))}
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
},flash)}

const GOB_S={gob:{sk:'#6a8a3a',skd:'#4a6a28',c:['#6a6a3a','#4a4a24','#8a8a4e'],hat:'goggles',wp:'wrench'},raider:{sk:'#8a8a4a',skd:'#5a6a32',c:['#5a3a2a','#3a2418','#7a5038'],hat:'kerchief',wp:'knife'}};
function gobFrame(Gs,mode,flash){return sprite(28,26,(P,Rc)=>{const g=24,b=mode==='walk1'?1:0,lg=mode==='walk0'?1:mode==='walk1'?-1:0,[c0,c1,c2]=Gs.c;
  Rc(10+lg,20,2,4,c1);Rc(14-lg,20,2,4,c1);Rc(9+lg,g-1,3,1,'#1a1410');Rc(14-lg,g-1,3,1,'#1a1410');
  Rc(9,13+b,7,8,c0);Rc(9,13+b,2,8,c1);Rc(9,19+b,7,1,'#3a2a20');P(12,19+b,'#c8a050');
  Rc(9,5+b,8,8,Gs.sk);Rc(9,5+b,2,8,Gs.skd);for(let i=0;i<4;i++){P(8-i,7+b+Math.floor(i/2),Gs.sk);P(17+i,7+b+Math.floor(i/2),Gs.sk)}P(4,9+b,Gs.skd);P(21,9+b,Gs.skd);
  P(15,8+b,'#ffd27a');P(13,8+b,'#ffd27a');P(17,10+b,Gs.skd);Rc(13,11+b,3,1,'#2a1a10');
  if(Gs.hat==='goggles'){Rc(9,6+b,8,1,c1);Rc(12,5+b,2,2,'#c8a050');Rc(15,5+b,2,2,'#c8a050');P(12,5+b,'#6ec6e2');P(15,5+b,'#6ec6e2');Rc(9,4+b,8,1,c2)}
  else{Rc(9,9+b,8,3,'#b23a2e');P(17,10+b,'#b23a2e');Rc(9,4+b,8,2,c1);P(8,6+b,c1)}
  let hx,hy;if(mode==='wind'){hx=8;hy=9+b}else if(mode==='lunge'){hx=20;hy=14}else{hx=16;hy=16+b}
  Rc(Math.min(15,hx),Math.min(14+b,hy),Math.abs(hx-15)+1,1,c0);P(hx,hy,Gs.sk);
  if(Gs.wp==='wrench'){if(mode==='wind'){Rc(hx-1,hy-6,1,6,'#9aa6ae');Rc(hx-2,hy-7,3,2,'#6a7078')}else{Rc(hx,hy-1,6,1,'#9aa6ae');Rc(hx+5,hy-2,2,3,'#6a7078')}}
  else{if(mode==='wind'){for(let i=0;i<6;i++)P(hx-1+Math.round(i*.3),hy-1-i,'#eef5f8')}else for(let i=0;i<6;i++)P(hx+1+i,hy-Math.round(i*.2),'#eef5f8');P(hx,hy-1,'#3a2418')}
},flash)}

function treantFrame(mode,flash){return sprite(52,58,(P,Rc)=>{const g=56,cx=25,b=mode==='walk1'?1:0,sw=mode==='walk0'?1:mode==='walk1'?-1:0,bk=TH&&RAMP.bark.map(rgb),gl=mode==='wind'?'#c9ff6a':'#9bd04c';
  const B=['#160d08','#26170e','#3b2416','#55331d','#714426','#8f5a31'],M=['#2f6127','#467f2d','#63a136'];
  const line=(x0,y0,x1,y1,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n)-(w>>1),Math.round(y0+(y1-y0)*i/n),w,1,col)};
  line(cx-4,46,cx-6+sw*2,g,4,B[2]);line(cx+4,46,cx+6-sw*2,g,4,B[3]);Rc(cx-9+sw*2,g-1,6,2,B[1]);Rc(cx+3-sw*2,g-1,6,2,B[2]);
  for(let y=16;y<48;y++){const hw=7+Math.round(Math.sin(y*.3)*1)+(y>40?2:0);for(let x=cx-hw;x<=cx+hw;x++){const u=(x-cx+hw)/(2*hw);P(x,y+b,B[Math.max(1,Math.min(5,Math.round(1+Math.sin(u*Math.PI)*3.5-((x*7+y*3)%11===0?1:0))))])}}
  [[cx-5,22],[cx-3,34],[cx+4,28],[cx+2,40]].forEach(([x,y])=>{Rc(x,y+b,3,1,M[1]);P(x+1,y-1+b,M[2])});
  Rc(cx-4,23+b,3,3,'#0a0604');Rc(cx+2,23+b,3,3,'#0a0604');P(cx-3,24+b,gl);P(cx+3,24+b,gl);Rc(cx-3,30+b,7,1,'#0a0604');P(cx-1,31+b,'#0a0604');P(cx+2,31+b,'#0a0604');
  let lh,rh;if(mode==='wind'){lh=[cx-14,6];rh=[cx+14,6]}else if(mode==='lunge'){lh=[cx+18,44];rh=[cx+22,40]}else{lh=[cx-15,40+sw];rh=[cx+15,40-sw]}
  line(cx-6,24+b,lh[0],lh[1],3,B[3]);line(cx+6,24+b,rh[0],rh[1],3,B[2]);[lh,rh].forEach(([x,y])=>{P(x-2,y+2,B[2]);P(x+2,y+2,B[2]);P(x,y+3,B[2]);P(x-1,y-1,M[1])});
  for(const[x0,y0,x1,y1]of[[cx-2,17,cx-10,4],[cx+2,17,cx+9,2],[cx,17,cx+1,0],[cx-6,10,cx-14,8],[cx+6,9,cx+15,10]])line(x0,y0+b,x1,y1+b,2,B[2]);
  [[cx-10,3],[cx+9,1],[cx+1,0],[cx-14,7],[cx+15,9],[cx-4,6]].forEach(([x,y],i)=>{Rc(x-2,y+b,4,3,M[i%2]);P(x,y-1+b,M[2])});
},flash)}

function drakeFrame(ph,charge,flash){return sprite(36,26,(P,Rc)=>{const bd='#3a4a5a',dk='#24303c',lt='#5a7088',vn='#6ec6e2',cx=17,cy=14;
  for(let i=0;i<10;i++)P(cx-6-i,cy+Math.round(Math.sin(i*.6+ph)*1.5),i%3?bd:dk);
  for(let y=-3;y<=3;y++)for(let x=-7;x<=7;x++)if((x/7)**2+(y/3)**2<=1)P(cx+x,cy+y,y<-1?lt:y>1?dk:bd);
  Rc(cx+6,cy-4,3,3,bd);Rc(cx+8,cy-5,5,3,bd);Rc(cx+8,cy-5,5,1,lt);P(cx+11,cy-4,vn);P(cx+12,cy-3,charge?'#ffe2a0':dk);if(charge){P(cx+13,cy-3,'#f0e0ff');P(cx+14,cy-3,vn)}P(cx+9,cy-6,dk);P(cx+10,cy-7,dk);
  const tips=ph===0?[[-6,-12],[4,-12]]:ph===1?[[-10,-4],[8,-5]]:[[-6,6],[4,7]];
  for(const[txx,tyy]of tips){const x0=cx-1,y0=cy-2,x1=cx+txx,y1=cy+tyy,n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));for(let i=0;i<=n;i++){const x=Math.round(x0+(x1-x0)*i/n),y=Math.round(y0+(y1-y0)*i/n);P(x,y,dk);for(let k=1;k<4-Math.floor(i/n*3);k++)P(x+(txx<0?k:-k),y+(tyy<0?k:-k),k===2?vn:lt)}}
  P(cx-2,cy+3,dk);P(cx+3,cy+3,dk);P(cx-2,cy+4,dk);P(cx+3,cy+4,dk);for(let x=-4;x<=4;x+=2)P(cx+x,cy,vn)},flash)}

function buildRoster(){
  for(const t in SLIME_S){if(t==='moss')continue;const S0=SLIME_S[t];MSP[t]=[slimeFrame(S0,9,7),slimeFrame(S0,10,6),slimeFrame(S0,8,8)];MSP[t+'F']=[slimeFrame(S0,9,7,1),slimeFrame(S0,10,6,1),slimeFrame(S0,8,8,1)]}
  const modes=['walk0','walk1','wind','lunge'];
  for(const t in QUAD){const Q=QUAD[t],o={kind:'gen',ax:Q.cx,ay:Q.ch-2,fps:Q.head==='lurker'?3:5},F={};for(const m of modes){o[m]=quadFrame(Q,m);F[m]=quadFrame(Q,m,1)}o.F=F;MSP[t]=o}
  for(const t in GOB_S){const o={kind:'gen',ax:12,ay:24,fps:6},F={};for(const m of modes){o[m]=gobFrame(GOB_S[t],m);F[m]=gobFrame(GOB_S[t],m,1)}o.F=F;MSP[t]=o}
  {const o={kind:'gen',ax:25,ay:56,fps:2},F={};for(const m of modes){o[m]=treantFrame(m);F[m]=treantFrame(m,1)}o.F=F;MSP.treant=o}
  MSP.drake={kind:'drake',ax:17,ay:20,fl:[0,1,2].map(p=>drakeFrame(p,0)),ch:drakeFrame(1,1),F:{fl:[0,1,2].map(p=>drakeFrame(p,0,1)),ch:drakeFrame(1,1,1)}}}
