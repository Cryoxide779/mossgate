/* ---------- resource node art (pre-rendered, shaded, outlined) ---------- */
const NODE_SPR={};
function nodeLayer(w,h,draw){const L=layer(w,h);const keep=TH;TH={...RAMP};draw(L);TH=keep;outlineL(L,hex(K.out));commit(L);return L.c}
function rockBody(L,cx,cy,rx,ry,seed,ramp){for(let y=Math.floor(cy-ry-1);y<=cy+ry+1;y++)for(let x=Math.floor(cx-rx-1);x<=cx+rx+1;x++){
  const nx=(x-cx)/rx,ny=(y-cy)/ry,a=Math.atan2(ny,nx),edge=1+(vn(a*2.2+seed,seed*.3,seed)-.5)*.28,r=Math.hypot(nx,ny)/edge;if(r>1||y>cy+ry*.82)continue;
  const nz=Math.sqrt(Math.max(0,1-r*r)),light=-.55*nx-.75*ny+.55*nz;let t=.2+light*.55+(fbm(x*.35,y*.35,seed)-.5)*.35;
  if(r>.9)t-=.18;if(fbm(x*.6,y*.15,seed+4)>.7)t-=.2;sp(L,x,y,pick(ramp,t,x,y))}}
function oreArt(dep){return nodeLayer(30,22,L=>{const R0=RAMP.rock,cx=15,cy=13;
  if(dep){rockBody(L,cx-3,cy+3,7,5,31,R0);rockBody(L,cx+6,cy+5,4,3,37,R0);[[cx+1,cy+1],[cx-6,cy+4]].forEach(([x,y])=>{sp(L,x,y,[90,60,40]);sp(L,x+1,y,[60,40,28])});return}
  rockBody(L,cx+7,cy+4,5,4,23,R0);rockBody(L,cx-1,cy,10,8,17,R0);rockBody(L,cx-9,cy+5,4,3,29,R0);
  const vein=(x,y)=>{const v=Math.abs(Math.sin(x*.55+y*.9+Math.sin(y*.4)*2));return v<.16};
  for(let y=0;y<22;y++)for(let x=0;x<30;x++){if(!has(L,x,y))continue;const nx=(x-(cx-1))/10,ny=(y-cy)/8;if(nx*nx+ny*ny>.8)continue;
    if(vein(x,y)){const top=ny<-.1;sp(L,x,y,top?[224,164,96]:[176,108,58]);if(hash(x,y,5)>.82)sp(L,x,y,[255,236,190])}}
  [[cx-4,cy-4],[cx+3,cy-2],[cx-1,cy+2]].forEach(([x,y])=>{sp(L,x,y,[255,250,230]);sp(L,x+1,y,[214,200,170]);sp(L,x,y+1,[160,140,110])});
  for(let i=0;i<6;i++){const x=cx-7+Math.floor(hash(i,1,9)*16),y=cy-7+Math.floor(hash(i,2,9)*3);if(has(L,x,y)&&!has(L,x,y-1))sp(L,x,y,pick(RAMP.moss,.55,x,y))}
  sp(L,cx-12,cy+7,R0[3]);sp(L,cx-11,cy+7,R0[4]);sp(L,cx+12,cy+7,R0[3])})}
function shardArt(dep){return nodeLayer(30,30,L=>{const R0=RAMP.rock,cx=15,cy=24,C=[[42,20,54],[78,34,82],[138,74,176],[201,168,255],[240,224,255]];
  rockBody(L,cx,cy,11,5,41,R0);if(dep){[[cx-3,3],[cx+4,2]].forEach(([x,h])=>{for(let k=0;k<h;k++)sp(L,x,cy-5-k,C[1])});return}
  const crys=(bx,by,h,w,lean)=>{for(let k=0;k<h;k++){const ww=Math.max(1,Math.round(w*(1-k/h*.75))),x0=Math.round(bx+lean*k);for(let i=-ww;i<=ww;i++){const face=i<0?(k%3?C[2]:C[1]):C[3];sp(L,x0+i,by-k,face)}if(k>h-3)sp(L,x0,by-k,C[4])}sp(L,Math.round(bx+lean*(h-1)),by-h,C[4])};
  crys(cx-1,cy-4,16,3,.12);crys(cx-7,cy-3,10,2,-.3);crys(cx+6,cy-3,11,2,.35);crys(cx+2,cy-2,6,1,.6)})}
function timberArt(dep){return nodeLayer(34,16,L=>{const B=RAMP.bark,M=RAMP.moss,cy=10;
  if(dep){for(let y=4;y<15;y++)for(let x=11;x<23;x++){const u=(x-11)/12;sp(L,x,y,pick(B,.25+Math.sin(u*Math.PI)*.45,x,y))}for(let x=11;x<23;x++){const d=Math.abs(x-17);sp(L,x,4,d%3===0?[120,80,46]:[200,160,110]);sp(L,x,5,[170,128,82])}sp(L,17,4,[90,58,34]);return}
  for(let x=2;x<28;x++)for(let y=cy-5;y<=cy+4;y++){const v=(y-cy)/5,t=.55-v*.45+(fbm(x*.25,y*.9,3)-.5)*.3-(x%7===0&&Math.abs(v)<.7?.2:0);sp(L,x,y,pick(B,t,x,y))}
  for(let y=cy-5;y<=cy+4;y++)for(let x=27;x<32;x++){const dx=(x-29.5)/2.6,dy=(y-cy+.5)/4.8;const r=Math.hypot(dx,dy);if(r>1)continue;const ring=Math.floor(r*4)%2;sp(L,x,y,r>.85?[90,58,34]:ring?[198,152,98]:[226,186,128])}
  sp(L,29,cy,[140,96,58]);for(let k=0;k<4;k++)sp(L,9+k,cy-6-k,B[3]);sp(L,13,cy-10,M[4]);sp(L,12,cy-10,M[3]);
  for(let i=0;i<14;i++){const x=4+Math.floor(hash(i,1,7)*22),y=cy-5+Math.floor(hash(i,2,7)*2);sp(L,x,y,pick(M,.5+hash(i,3,7)*.3,x,y))}
  [[6,cy+3],[20,cy+4]].forEach(([x,y])=>{sp(L,x,y-1,[220,200,170]);sp(L,x-1,y-2,[200,80,60]);sp(L,x,y-2,[232,96,70]);sp(L,x+1,y-2,[200,80,60])})})}
function herbArt(dep){return nodeLayer(24,18,L=>{const Lf=RAMP.leaf,cx=12,g=17;
  const leaf=(x,y,dx,dy,len)=>{for(let k=0;k<len;k++){const px=Math.round(x+dx*k),py=Math.round(y+dy*k);sp(L,px,py,pick(Lf,.35+k/len*.45,px,py));if(k>0&&k<len-1)sp(L,px+(dx>0?0:1),py+1,pick(Lf,.25,px,py))}};
  const n=dep?4:9;for(let i=0;i<n;i++){const a=-Math.PI*(.12+.76*i/(n-1)),len=(dep?4:7)+hash(i,4,2)*3;leaf(cx,g,Math.cos(a)*.9,Math.sin(a),len)}
  for(let x=cx-4;x<=cx+4;x++)sp(L,x,g,Lf[1]);if(dep)return;
  [[cx-5,g-8],[cx+5,g-7],[cx,g-11],[cx-2,g-6]].forEach(([x,y],i)=>{const c=i%2?[236,226,250]:[196,150,230];sp(L,x,y,c);sp(L,x-1,y,c);sp(L,x+1,y,c);sp(L,x,y-1,c);sp(L,x,y+1,c);sp(L,x,y,[255,230,140])})})}
function mushArt(dep){return nodeLayer(24,20,L=>{const g=19;
  const cap=(cx,top,w,h,stem)=>{for(let y=top+h;y<g;y++){sp(L,cx-1,y,[208,196,176]);sp(L,cx,y,[230,220,200]);if(stem>2)sp(L,cx+1,y,[180,168,150])}
    for(let y=0;y<h;y++){const ww=Math.round(w*Math.sqrt(1-((h-y)/h)**2*.85));for(let x=-ww;x<=ww;x++){const t=.25+(-x/w)*.25+(y/h)*-.2+.35;sp(L,cx+x,top+y,t>.55?[150,92,186]:t>.4?[112,62,150]:[74,38,104])}}
    for(let x=-w+1;x<w;x++)sp(L,cx+x,top+h,[60,40,60]);[[-w+2,1],[1,0],[w-3,2]].forEach(([dx,dy])=>{if(top+dy<top+h)sp(L,cx+dx,top+dy+1,[236,220,250])})};
  if(dep){cap(12,14,2,2,1);return}cap(8,8,5,4,3);cap(16,11,4,3,2);cap(12,4,3,3,2)})}
function salvageArt(dep){return nodeLayer(34,20,L=>{const W0=RAMP.wood,g=19;
  for(let i=0;i<3;i++){const y=g-2-i*3,x0=4+i*3,x1=26-i*2;for(let x=x0;x<x1;x++){sp(L,x,y,pick(W0,.5+(x%9===0?-.25:0)+(fbm(x*.3,y,i)-.5)*.3,x,y));sp(L,x,y+1,pick(W0,.25,x,y))}}
  if(dep)return;
  const wx=24,wy=g-7;for(let a=0;a<28;a++){const an=a/28*6.28;sp(L,Math.round(wx+Math.cos(an)*6),Math.round(wy+Math.sin(an)*6),W0[2]);sp(L,Math.round(wx+Math.cos(an)*5),Math.round(wy+Math.sin(an)*5),W0[4])}
  for(let k=-5;k<=5;k++){sp(L,wx+k,wy,W0[3]);sp(L,wx,wy+k,W0[3])}sp(L,wx,wy,[154,166,174]);
  for(let x=6;x<14;x++){sp(L,x,g-11,[154,166,174]);sp(L,x,g-10,[106,112,120])}sp(L,13,g-12,[200,206,212]);
  for(let y=g-14;y<g-9;y++)for(let x=15;x<19;x++)sp(L,x,y,(x+y)%2?[178,58,46]:[143,42,34]);
  [[9,g-1],[20,g-1]].forEach(([x,y])=>{sp(L,x,y,[200,160,80]);sp(L,x+1,y,[160,120,50])})})}
function buildNodeArt(){NODE_SPR.ore=[oreArt(0),oreArt(1)];NODE_SPR.shard=[shardArt(0),shardArt(1)];NODE_SPR.timber=[timberArt(0),timberArt(1)];NODE_SPR.herb=[herbArt(0),herbArt(1)];NODE_SPR.mush=[mushArt(0),mushArt(1)];NODE_SPR.salvage=[salvageArt(0),salvageArt(1)]}
