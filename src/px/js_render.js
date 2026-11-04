/* ---------- rendering ---------- */
const wfC=document.createElement('canvas');let wfX=null,wfI=null,wcols=[];
function drawWaterfall(wf){if(!wfX||wfC.width!==wf.w){wfC.width=wf.w;wfC.height=wf.b;wfX=wfC.getContext('2d');wfI=wfX.createImageData(wf.w,wf.b);wcols=[...Array(wf.w)].map((_,i)=>({v:90+hash(i,1,5)*80,ph:hash(i,2,5),len:18+hash(i,3,5)*30}))}
  const d=wfI.data,t=S.t,Wd=wf.w;for(let y=0;y<wf.b;y++)for(let x=0;x<Wd;x++){const c=wcols[x],e=x===0||x===Wd-1,u=((((y-t*c.v)/c.len+c.ph)%1)+1)%1;
    let col=e?RAMP.water[2]:u>.82?RAMP.water[6]:u>.62?RAMP.water[5]:u>.3?RAMP.water[4]:RAMP.water[3];if(x===1||x===Wd-2)col=RAMP.water[3];
    if(y>wf.b-14&&hash(x,(y+Math.floor(t*30))|0,3)>.45)col=RAMP.water[7];const i=(y*Wd+x)*4;d[i]=col[0];d[i+1]=col[1];d[i+2]=col[2];d[i+3]=255}
  wfX.putImageData(wfI,0,0)}
const DIG={'0':'111101101101111','1':'110010010010111','2':'111001111100111','3':'111001111001111','4':'101101111001001','5':'111100111001111','6':'111100111101111','7':'111001010010010','8':'111101111101111','9':'111101111001111'};
function num(n,x,y,col){const s=String(n);let ox=ri(x-s.length*2);for(const ch of s){const p=DIG[ch];if(!p){ox+=4;continue}for(let i=0;i<15;i++)if(p[i]==='1'){g.fillStyle='#000';g.fillRect(ox+i%3-1,ri(y)+(i/3|0)-1,3,3)}
  for(let i=0;i<15;i++)if(p[i]==='1'){g.fillStyle=col;g.fillRect(ox+i%3,ri(y)+(i/3|0),1,1)}ox+=4}}
function ptext(t,x,y,col,big){g.font=(big?'10px':'8px')+' Silkscreen, monospace';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';
  for(const[a,b]of[[-1,0],[1,0],[0,-1],[0,1]])g.fillText(t,ri(x)+a,ri(y)+b);g.fillStyle=col;g.fillText(t,ri(x),ri(y))}
let AMB=[];function resetAmb(){AMB=[...Array(40)].map(()=>({x:Math.random()*WW,y:Math.random()*WH,p:Math.random()*6,v:.5+Math.random()}))}
function drawAmb(cx,cy){const a=THEMES[Z.theme].amb;
  for(const m of AMB){m.p+=.016*m.v;
    if(a==='ember'){m.y-=.35*m.v;m.x+=Math.sin(m.p)*.2;if(m.y<0){m.y=WH;m.x=Math.random()*WW}const x=ri(m.x-cx),y=ri(m.y-cy);g.fillStyle=m.v>1?'#ffb24a':'#d4483a';g.globalAlpha=.8;g.fillRect(x,y,1,1);continue}
    if(a==='leaf'){m.y+=.3*m.v;m.x+=Math.sin(m.p*2)*.35-.15;if(m.y>WH){m.y=-4;m.x=Math.random()*WW}const x=ri(m.x-cx),y=ri(m.y-cy);g.globalAlpha=1;g.fillStyle=m.v>1.2?'#d4a03a':m.v>.9?'#93c94a':'#c4e66a';g.fillRect(x,y,2,1);g.fillRect(x+(Math.sin(m.p*4)>0?1:0),y+1,1,1);continue}
    const x=ri(m.x+Math.sin(m.p)*10-cx),y=ri(m.y+Math.cos(m.p*.8)*8-cy);if(x<-4||x>W+4)continue;const al=.45+Math.sin(m.p*3)*.35,col=a==='firefly'?['#f4ff9a','#ffffe0']:['#d8ff8a','#f4ffc8'];
    g.globalAlpha=Math.max(0,al)*.35;g.fillStyle=col[0];g.fillRect(x-1,y-1,3,3);g.globalAlpha=Math.max(.1,al);g.fillStyle=col[1];g.fillRect(x,y,1,1)}
  g.globalAlpha=1}
function glow(x,y,r,col,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,`rgba(${col},${a})`);gr.addColorStop(1,`rgba(${col},0)`);g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2)}
function drawMob(m,cx,cy){const sx=ri(m.x-cx),sy=ri(m.y-cy),f=m.flash>0;let img,ax,ay;
  if(m.d.kind==='slime'){const fr=m.aggro?2:(Math.floor(m.ph*3)%2),hop=m.aggro?ri(Math.abs(Math.sin(m.ph*9))*4):0;img=(f?MSP[m.t+'F']:MSP[m.t])[fr];ax=13;ay=19+hop;
    if(m.t==='lantern'||m.t==='shardslime'){g.save();g.globalCompositeOperation='lighter';glow(sx,sy-5,12,m.t==='lantern'?'255,200,110':'201,168,255',.25);g.restore()}}
  else if(MSP[m.t]&&MSP[m.t].kind==='gen'){const S2=MSP[m.t],src=f?S2.F:S2,md=m.st==='wind'?'wind':m.st==='lunge'||m.thr>0?'lunge':(Math.floor(m.ph*S2.fps*(m.aggro?1.6:1))%2?'walk1':'walk0');img=src[md];ax=S2.ax;ay=S2.ay;
    if(m.st==='wind')ax+=ri(Math.sin(S.t*70));if(m.d.stealth&&!(m.aggro>0||Math.abs(pl.x-m.x)<70)){g.globalAlpha=.2+Math.sin(S.t*3+m.x)*.06}}
  else if(m.t==='unbound'){const S2=MSP.unbound;img=f?S2.F:m.cast>0?S2.cast:S2.idle[Math.floor(m.ph*4)%3];ax=33;ay=58;if(m.st==='blink')g.globalAlpha=.25;
    g.save();g.globalCompositeOperation='lighter';glow(sx,sy-28,40,m.enr?'255,90,140':'201,168,255',.22+Math.sin(S.t*5)*.05);g.restore();
    for(let i=0;i<6;i++){const a=S.t*(m.enr?2.4:1.4)+i*1.047,ox=ri(Math.cos(a)*26),oy=ri(Math.sin(a)*9);g.fillStyle='#000';g.fillRect(sx+ox-1,sy-30+oy-3,4,6);g.fillStyle='#c9a8ff';g.fillRect(sx+ox,sy-30+oy-2,2,4);g.fillStyle='#f0e0ff';g.fillRect(sx+ox,sy-30+oy-2,1,1)}}
  else if(m.t==='drake'||(MSP[m.t]&&MSP[m.t].kind==='fly')){const S2=MSP[m.t],src=f?S2.F:S2;img=m.cd<.4?src.ch:src.fl[Math.floor(m.ph*(m.t==='drake'?9:14))%3];ax=S2.ax;ay=S2.ay;g.save();g.globalCompositeOperation='lighter';glow(sx,sy-6,m.t==='rotqueen'?18:10,m.t==='drake'?'110,198,226':'224,90,74',m.t==='drake'?.2:.14);g.restore()}
  else if(m.t==='husk'){const md=m.st==='wind'?'wind':m.st==='lunge'?'lunge':(Math.floor(m.ph*4)%2?'walk1':'walk0');img=(f?MSP.huskF:MSP.husk)[md];ax=16;ay=36;
    if(m.st==='wind'){ax+=ri(Math.sin(S.t*70))}if(Math.random()<.04)S.parts.push({x:m.x+rnd(-6,6),y:m.y-20,vx:rnd(-5,5),vy:rnd(5,15),t:0,life:1,c:'#8d8aa3',g:0,s:1})}
  else if(m.t==='wisp'){img=f?MSP.wispF:m.cd<.4?MSP.wispC:MSP.wisp[Math.floor(m.ph*6)%3];ax=18;ay=19;g.save();g.globalCompositeOperation='lighter';glow(sx,sy-7,10,'245,154,74',.25);g.restore()}
  else{const md=m.st==='wind'?'wind':m.st==='slam'?'slam':m.st==='lwind'?'crouch':(Math.floor(m.ph*2)%2?'idle1':'idle0');img=(f?MSP.wardenF:MSP.warden)[md];ax=36;ay=100;
    if(m.enr){g.save();g.globalCompositeOperation='lighter';glow(sx,sy-30,46,'255,60,40',.18+Math.sin(S.t*8)*.05);g.restore()}
    if(m.st==='leap'){g.globalAlpha=.4+Math.sin(S.t*20)*.2;g.fillStyle='#d4483a';g.fillRect(ri(m.lx1-cx)-26,ri(SEG[0].y-cy),52,2);g.globalAlpha=1}}
  g.fillStyle='rgba(0,0,0,.35)';if(!m.d.fly)g.fillRect(sx-ri(m.d.w/2),ri((m.d.boss&&m.st==='leap'?SEG[0].y:m.y)-cy),m.d.w,1);
  if(m.cr)crAura(m,sx,sy);g.save();g.translate(sx,0);if((m.face||1)<0)g.scale(-1,1);g.drawImage(img,-ax,sy-ay);g.restore();g.globalAlpha=1;
  {const tell=m.st==='wind'||m.st==='lwind'||(m.d.ai==='ranged'&&m.aggro>0&&m.cd<.4)||(m.d.fly&&m.aggro>0&&m.cd<.45)||(m.t==='unbound'&&m.cd<.5&&m.st!=='blink');
    if(tell&&!(m.stun>0)&&Math.floor(S.t*10)%2===0){const ty=sy-m.d.h-(m.d.boss?40:m.d.fly?24:18);g.fillStyle='#000';g.fillRect(sx-2,ty-6,5,10);g.fillStyle='#ff5a3a';g.fillRect(sx-1,ty-5,3,5);g.fillRect(sx-1,ty+1,3,2)}}
  if(m.stun>0){g.fillStyle='#9bd04c';for(let i=0;i<3;i++){const a=S.t*4+i*2.1;g.fillRect(sx+ri(Math.cos(a)*m.d.w*.6),sy-2+ri(Math.sin(a)*2),2,1)}}
  if(m.psn&&m.psn.t>0){g.fillStyle='#9bd04c';g.fillRect(sx+ri(Math.sin(S.t*5)*6),sy-m.d.h-6-ri((S.t*20)%8),1,1)}
  const dl=m.lv-pl.lv,lc=dl>=3?'#ff6b6b':dl<=-4?'#8d8aa3':'#f2e6c8';
  if(m.d.boss||(m.d.bb&&m.aggro>0)){const w=90,y=26;g.fillStyle='#000';g.fillRect(ri(W/2-w/2)-1,y-1,w+2,5);g.fillStyle='#d4483a';g.fillRect(ri(W/2-w/2),y,ri(w*Math.max(0,m.hp/m.mhp)),3);g.fillStyle='#000';g.fillRect(ri(W/2-w/2)-1,y+4,w+2,3);g.fillStyle=m.stun>0?'#ffd27a':'#c8a050';g.fillRect(ri(W/2-w/2),y+5,m.stun>0?w:ri(w*Math.max(0,m.poise/m.mpoise)),1);ptext('LV '+m.lv+' · '+m.d.name.toUpperCase()+(m.enr?' · ENRAGED':''),W/2,y+10,'#f2e6c8')}
  else{const ty=sy-m.d.h-(m.d.fly?12:6);if(m.hp<m.mhp||m.poise<m.mpoise){g.fillStyle='#000';g.fillRect(sx-8,ty-1,16,5);g.fillStyle='#d4483a';g.fillRect(sx-7,ty,Math.max(0,ri(14*m.hp/m.mhp)),1);g.fillStyle=m.stun>0?'#ffd27a':'#c8a050';g.fillRect(sx-7,ty+2,m.stun>0?14:Math.max(0,ri(14*m.poise/m.mpoise)),1)}ptext('LV'+m.lv,sx,ty-6,lc);if(m.cr)ptext(crTag(m),sx,ty-14,m.cr==='mark'?crD().col:'#ffd27a')}}
function render(){
  g.imageSmoothingEnabled=false;const cx=ri(S.cam),cy=ri(S.camY),th=THEMES[Z.theme],L=S.L;if(!L)return;
  g.drawImage(L.far,ri(-cx*.25),ri(-cy*.25));
  g.drawImage(L.mid,ri(-cx*.55),ri(-cy*.55));
  if(Z.wf){drawWaterfall(Z.wf);const wx=ri(Z.wf.x-cx*.55),wy=ri(-cy*.55);g.drawImage(wfC,wx,wy);g.save();g.globalAlpha=.35;for(let i=0;i<5;i++){const r=10+i*6+Math.sin(S.t*2+i)*2;g.fillStyle='#d8f6ff';g.beginPath();g.ellipse(wx+Z.wf.w/2+Math.sin(S.t+i)*10,wy+Z.wf.b-2,r*1.6,r*.5,0,0,7);g.fill()}g.restore()}
  g.fillStyle=th.fog;g.fillRect(0,0,W,H);
  g.save();g.globalCompositeOperation='lighter';for(let i=0;i<4;i++){const bx=((ri(60+i*150-cx*.4)%(W+300))+W+300)%(W+300)-80,a=(.05+Math.sin(S.t*.6+i*1.7)*.02)*th.rayA,gr=g.createLinearGradient(0,0,0,H);
    gr.addColorStop(0,`rgba(${th.ray},${a*1.6})`);gr.addColorStop(1,`rgba(${th.ray},0)`);g.fillStyle=gr;g.beginPath();g.moveTo(bx,0);g.lineTo(bx+22+i*4,0);g.lineTo(bx+110+i*4,H);g.lineTo(bx+60,H);g.fill()}g.restore();
  g.drawImage(L.tree,ri(-cx*.85),ri(-cy*.85));
  g.fillStyle=th.fog2;g.fillRect(0,0,W,H);
  g.drawImage(L.ter,-cx,-cy);
  g.save();g.globalCompositeOperation='lighter';for(const[gx,gy,r,col]of L.glows){const x=gx-cx,y=gy-cy;if(x<-r||x>W+r)continue;glow(x,y,r,col,.22+Math.sin(S.t*3+gx)*.05)}
  for(const po of Z.portals){const x=po.x-cx,y=po.y-cy;if(x<-30||x>W+30)continue;const lk=pl.lv<ZONES[po.to].req;glow(x,y-16,22,lk?'255,80,60':'120,220,255',.3)}g.restore();
  for(const po of Z.portals){const x=po.x-cx,y=po.y-cy;if(x<-30||x>W+30)continue;const lk=pl.lv<ZONES[po.to].req;
    for(let i=0;i<14;i++){const a=S.t*3+i*.45,r=3+(i%5)*1.4;g.fillStyle=lk?(i%2?'#d4483a':'#ff9a7a'):(i%2?'#6ec6e2':'#d8f6ff');g.fillRect(ri(x+Math.cos(a)*r*.8),ri(y-16+Math.sin(a)*r*1.6),1,1)}
    if(S.nearPortal===po)ptext(po.next?'▲ DESCEND TO FLOOR '+(S.deep.n+1):lk?'SEALED · LV '+ZONES[po.to].req:'▲ '+ZONES[po.to].name.toUpperCase(),x,y-48+Math.sin(S.t*4),lk?'#ff6b6b':'#f2e6c8')}
  for(const w of S.waves){if(w.t<0)continue;const x=ri(w.x-cx),y=ri(SEG[0].y-cy),hgt=6+ri(Math.sin(w.t*30)*2);g.fillStyle='#5a4a50';g.fillRect(x-3,y-hgt,6,hgt);g.fillStyle='#8a7a80';g.fillRect(x-2,y-hgt,2,hgt);g.fillStyle='#ffb24a';g.fillRect(x-1,y-3,2,2)}
  drawFolk(cx,cy);drawNpcs(cx,cy);drawNodes(cx,cy);drawLore(cx,cy);drawCrisis(cx,cy);drawDeep(cx,cy);drawReach(cx,cy);drawHearth(cx,cy);drawHome(cx,cy);drawLab(cx,cy);drawQuarry(cx,cy);drawUnder(cx,cy);drawRuins(cx,cy);drawDen(cx,cy);drawSiege(cx,cy);drawArms(cx,cy);drawPeers(cx,cy);
  for(const m of S.mobs)if(!m.dead)drawMob(m,cx,cy);
  for(const dr of S.drops){const x=ri(dr.x-cx),y=ri(dr.y-cy)-ri(Math.sin(S.t*4+dr.x)*1.5)-(dr.g?2:0);
    if(dr.k==='shard'){g.fillStyle='#000';g.fillRect(x-2,y-3,5,7);g.fillStyle='#d4483a';g.fillRect(x-1,y-2,3,5);g.fillRect(x-2,y,5,1);g.fillStyle='#ffd0c0';g.fillRect(x-1,y-2,1,1)}
    else if(dr.k==='pot'){g.fillStyle='#000';g.fillRect(x-3,y-6,7,8);g.fillStyle='#86b47f';g.fillRect(x-2,y-3,5,4);g.fillStyle='#f2e6c8';g.fillRect(x-1,y-5,3,2)}
    else{const rc=RAR[dr.it.r].c;if(dr.it.r>=2){g.globalAlpha=.25+Math.sin(S.t*4)*.1;g.fillStyle=rc;g.fillRect(x-1,y-50,3,50);g.globalAlpha=1}g.fillStyle='#000';g.fillRect(x-4,y-6,9,8);g.fillStyle='#3a2a20';g.fillRect(x-3,y-4,7,5);g.fillStyle=rc;g.fillRect(x-3,y-5,7,1);g.fillRect(x,y-7,1,2)}}
  for(const f of S.fx){const k=f.t/f.life;
    if(f.k==='after'&&f.img){g.globalAlpha=(1-k)*.45;g.save();g.translate(ri(f.x-cx),0);if(f.f<0)g.scale(-1,1);g.drawImage(f.img,-24,ri(f.y-cy)-39);g.restore();g.globalAlpha=1}
    else if(f.k==='cut'){g.globalAlpha=1-k;g.strokeStyle=f.c||'#fff';g.lineWidth=1;g.beginPath();const l=18;g.moveTo(ri(f.x-cx-Math.cos(f.a)*l),ri(f.y-cy-Math.sin(f.a)*l));g.lineTo(ri(f.x-cx+Math.cos(f.a)*l),ri(f.y-cy+Math.sin(f.a)*l));g.stroke();g.globalAlpha=1}
    else if(f.k==='beam'&&f.m){const x0=pl.x-cx+pl.face*10,y0=pl.y-cy-18,x1=f.m.x-cx,y1=f.m.y-cy-f.m.d.h/2,n=Math.ceil(Math.hypot(x1-x0,y1-y0)/2);
      for(let i=0;i<=n;i++){const u=i/n,w=Math.sin(u*14-S.t*30)*2*(1-k);g.fillStyle=i%3?'#c9a8ff':'#9bd04c';g.globalAlpha=1-k*.6;g.fillRect(ri(x0+(x1-x0)*u),ri(y0+(y1-y0)*u+w),1,1)}g.globalAlpha=1}
    else if(f.k==='thorns'){const gr2=Math.min(1,k*4),n=Math.max(2,ri(f.r/7));for(let i=-n;i<=n;i++){const x=ri(f.x-cx+i*7),y=ri(f.y-cy),hh=ri((f.r*.5-Math.abs(i)*2.5)*gr2*(k<.75?1:(1-k)*4));if(hh<=0)continue;
      for(let j=0;j<hh;j++){const wdt=Math.max(1,ri(3*(1-j/hh)));g.fillStyle=j===hh-1?'#cff27c':i%2?'#408a2e':'#64b03a';g.fillRect(x-(wdt>>1),y-j,wdt,1)}g.fillStyle='#000';g.fillRect(x-2,y,5,1)}}}
  for(const a of S.allies){const x=ri(a.x-cx),y=ri(a.y-cy);if(a.life<1.2&&Math.floor(S.t*12)%2)continue;
    if(a.k==='comp'){const[img,ax2,ay2]=compSprite(a.t,a);
      if(a.t==='lantern'){g.save();g.globalCompositeOperation='lighter';glow(x,y-5,16,'255,200,110',.3);g.restore()}g.save();g.translate(x,0);if(a.face<0)g.scale(-1,1);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-6,y,12,1);g.drawImage(img,-ax2,y-ay2);g.restore();
      {const b=actBond(),tc=b?TRUST_T[tierOf(b.tr)][2]:'#9bd04c',hy=y-ay2-4;g.fillStyle='#000';g.fillRect(x-3,hy-1,7,5);g.fillStyle=tc;g.fillRect(x-2,hy,2,2);g.fillRect(x+1,hy,2,2);g.fillRect(x-1,hy+2,3,1);g.fillRect(x,hy+3,1,1)}continue}
    if(a.k==='thrall'){const img=a.atkT>0?MSP.thrall.atk:MSP.thrall[Math.floor(a.walk||0)%2?'walk1':'walk0'];g.save();g.translate(x,0);if(a.face<0)g.scale(-1,1);
      if(a.rise>0){const k=1-a.rise/.4,hh=Math.max(1,ri(28*k));g.drawImage(img,0,0,20,hh,-9,y-hh+1,20,hh)}else{g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-5,y,10,1);g.drawImage(img,-9,y-27)}g.restore()}
    else{g.save();g.globalAlpha=.85;g.globalCompositeOperation='lighter';glow(x,y,10,'150,100,220',.2);g.restore();g.save();g.globalAlpha=.9;g.translate(x,0);if(a.face<0)g.scale(-1,1);g.drawImage(MSP.wraith[Math.floor(S.t*8+a.ph*3)%3],-13,y-9);g.restore()}}
  // player
  if(PA&&!pl.dead&&pl.roll){const k=1-pl.roll.t/.34,q=Math.min(3,Math.floor(k*4)),x=ri(pl.x-cx),y=ri(pl.y-cy);g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-6,y,12,1);
    g.save();g.translate(x,y-10);if(pl.face<0)g.scale(-1,1);g.rotate(q*Math.PI/2);g.drawImage(PA.jumpS,-24,-29);g.restore()}
  else if(PA&&!pl.dead&&!(pl.inv>0&&!pl.dash&&Math.floor(S.t*16)%2)){let img;const D=!!PA.idleD&&(pl.drawnT>0||!!pl.atk);
    if(pl.atk)img=pl.atk.frames[Math.min(pl.atk.i,pl.atk.frames.length-1)];
    else if(pl.sheathT>0&&PA.sheath)img=PA.sheath[pl.sheathT>.11?0:1];
    else if(!pl.onG)img=pl.vy<0?(D?PA.jumpD:PA.jumpS):(D?PA.fallD:PA.fallS);
    else if(Math.abs(pl.vx)>1)img=(D?PA.runD:PA.runS)[Math.floor(pl.walk)%6];
    else img=D?PA.idleD[Math.floor(S.t*1.6)%2]:((S.t%3.7)<.12?PA.blinkS:PA.idleS[Math.floor(S.t*1.6)%2]);
    g.fillStyle='rgba(0,0,0,.35)';if(pl.onG)g.fillRect(ri(pl.x-cx-6),ri(pl.y-cy),12,1);;if(hasCargo()){const bx=ri(pl.x-cx)-pl.face*12-4,by=ri(pl.y-cy)-24+(Math.floor(pl.walk)%2);g.fillStyle='#000';g.fillRect(bx-1,by-1,10,9);g.fillStyle='#8f5a31';g.fillRect(bx,by,8,7);g.fillStyle='#b8773d';g.fillRect(bx,by,8,1);g.fillStyle='#55331d';g.fillRect(bx+3,by,1,7);g.fillRect(bx,by+3,8,1);g.fillStyle='#d4483a';g.fillRect(bx+3,by+3,2,1)}
    g.save();g.translate(ri(pl.x-cx),0);if(pl.face<0)g.scale(-1,1);g.drawImage(img,-24,ri(pl.y-cy)-39);g.restore()}
  if(!pl.dead&&pl.guard){const x=ri(pl.x-cx)+pl.face*11,y=ri(pl.y-cy)-16,pw=S.t-pl.gT<.22,c=pw?'#ffd27a':'rgba(242,230,200,.75)';g.fillStyle=c;for(let i=-6;i<=6;i++){const yy=y+i*2,xx=x+pl.face*ri(3-Math.abs(i)*Math.abs(i)/12);g.fillRect(xx,yy,1,2)}
    if(pw){g.save();g.globalCompositeOperation='lighter';glow(x,y,12,'255,210,120',.35);g.restore()}}
  if(!pl.dead&&pl.stag>0){g.fillStyle='#ffd27a';for(let i=0;i<3;i++){const a=S.t*6+i*2.1;g.fillRect(ri(pl.x-cx+Math.cos(a)*7),ri(pl.y-cy-34+Math.sin(a)*2),2,1)}}
  for(const P0 of Z.pools){const px0=ri(P0.x0-cx),py0=ri(P0.y-cy),pw=P0.x1-P0.x0;for(let y=0;y<18;y++){const col=TH.water[y<1?6:y<2?5:y<5?4:y<10?3:2];g.globalAlpha=y<1?.95:.55+y*.015;g.fillStyle=rgb(col);g.fillRect(px0+(y<1?2:0),py0+y,pw-(y<1?4:0),1)}
    g.globalAlpha=.35;for(let x=0;x<pw;x+=3){g.fillStyle='#3594b6';g.fillRect(px0+x,py0+5+ri(Math.sin(x*.21+S.t*1.3)*3+3),2,1)}
    g.globalAlpha=1;for(let x=0;x<pw;x++)if(Math.sin(x*.37+S.t*3.2)+Math.sin(x*.11-S.t*1.7)>1.5){g.fillStyle='#fff';g.fillRect(px0+x,py0+1+(x%4===0?2:0),1,1)}}
  for(const e of S.eproj){const x=ri(e.x-cx),y=ri(e.y-cy);if(e.sh){g.fillStyle='#000';g.fillRect(x-2,y-2,5,5);g.fillStyle='#c9a8ff';g.fillRect(x-1,y-1,3,3);g.fillStyle='#f0e0ff';g.fillRect(x,y-1,1,1);continue}g.fillStyle='#15131f';g.fillRect(x-2,y-2,5,5);g.fillRect(ri(x-e.vx*.03)-1,ri(y-e.vy*.03)-1,3,3);g.fillStyle='#f59a4a';g.fillRect(x-1,y-1,2,2);g.fillStyle='#ffe2a0';g.fillRect(x,y,1,1)}
  for(const pr of S.proj){if(pr.dl>0)continue;const x=ri(pr.x-cx),y=ri(pr.y-cy),sp2=Math.hypot(pr.vx,pr.vy)||1,ux=pr.vx/sp2,uy=pr.vy/sp2;
    if(pr.k==='arrow'||pr.k==='pierce'){const L2=pr.k==='pierce'?12:8;if(pr.k==='pierce'){g.globalAlpha=.5;g.fillStyle='#ffb24a';for(let i=0;i<16;i++)g.fillRect(ri(x-ux*(i+6)),ri(y-uy*(i+6)),1,1);g.globalAlpha=1}
      for(let i=0;i<L2;i++){g.fillStyle=i===0?'#f2e6c8':i>L2-3?'#d4483a':'#8a5a2b';g.fillRect(ri(x-ux*i),ri(y-uy*i),1,pr.k==='pierce'?2:1)}}
    else if(pr.k==='bolt'){g.globalAlpha=.4;g.fillStyle=WT_PROJ.orb;g.fillRect(x-2,y-2,5,5);g.globalAlpha=1;g.fillStyle=WT_PROJ.orb;g.fillRect(x-1,y-1,3,3);g.fillStyle='#e8ffb0';g.fillRect(x,y,1,1)}
    else if(pr.k==='soul'){g.globalAlpha=.45;g.fillStyle='#7a4aa0';g.fillRect(x-3,y-3,7,7);g.globalAlpha=1;g.fillStyle='#000';g.fillRect(x-2,y-2,5,5);g.fillStyle='#efe4c8';g.fillRect(x-1,y-2,3,3);g.fillRect(x-1,y+1,3,1);g.fillStyle='#15131f';g.fillRect(x-1,y-1,1,1);g.fillStyle='#9bd04c';g.fillRect(x+1,y-1,1,1)}
    else if(pr.k==='star'){const r=Math.floor(S.t*20)%2;g.fillStyle='#000';g.fillRect(x-2,y-2,5,5);g.fillStyle='#e8f0f4';if(r){g.fillRect(x-2,y,5,1);g.fillRect(x,y-2,1,5)}else{g.fillRect(x-1,y-1,1,1);g.fillRect(x+1,y-1,1,1);g.fillRect(x-1,y+1,1,1);g.fillRect(x+1,y+1,1,1);g.fillRect(x,y,1,1)}}
    else if(PROJX[pr.k])PROJX[pr.k](pr,x,y,ux,uy);else if(pr.k==='wave'){const f=pr.f;for(let j=-12;j<=12;j++){const off=ri(Math.cos(j/12*1.3)*6*f);g.fillStyle=Math.abs(j)>9?'#9fd8f0':'#ffffff';g.fillRect(x+off,y+j,2,1);g.fillStyle='#d8f2ff';g.fillRect(x+off-2*f,y+j,2,1)}}}
  for(const p of S.parts){g.globalAlpha=Math.min(1,(1-p.t/p.life)*1.5);g.fillStyle=p.c;g.fillRect(ri(p.x-cx),ri(p.y-cy),p.s,p.s)}g.globalAlpha=1;
  for(const n of S.nums){if(n.t<0)continue;if(n.txt)ptext(n.txt,n.x-cx,n.y-cy,n.c,n.big);else num(n.v,n.x-cx,n.y-cy,n.c)}
  if(S.atShrine&&!pl.dead)ptext('▲ REST',pl.x-cx,pl.y-cy-46+Math.sin(S.t*4),'#ffd27a');
  g.drawImage(L.can,-cx,ri(-cy*.25)-14);
  g.drawImage(L.fg,ri(-cx*1.25),H-80+ri((WH-H-cy)*.3));
  drawAmb(cx,cy);{const dtR=Math.min(.05,S.t-(S.lastR??S.t));S.lastR=S.t;drawLighting(cx,cy,L);drawWeather(cx,cy,dtR);drawCrisisFx();drawGuide(cx,cy);drawHint()}
  const vg=g.createRadialGradient(W/2,H/2,H*.3,W/2,H/2,W*.75);vg.addColorStop(0,`rgba(${th.vig},0)`);vg.addColorStop(1,`rgba(${th.vig},.55)`);g.fillStyle=vg;g.fillRect(0,0,W,H);
  CX.imageSmoothingEnabled=false;CX.drawImage(G,0,0,W*SCL,H*SCL);
}
