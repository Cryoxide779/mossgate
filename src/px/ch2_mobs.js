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
