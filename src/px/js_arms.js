/* ---------- new arms and magic: basic attacks, techniques, wards, heals, exorcism ---------- */
const SPIRITS={wisp:1,husk:1,lantern:1,fiend:1,unbound:1,warden:1,shardslime:1,rootheart:1};
TREES.restore.find(n=>n.id==='e_kin').d=r=>`+${6*r}% max HP; Mend also restores ${5*r} MP`;
const parryWin=()=>WEAP()==='shield'?.32:.22;
const guardCost=()=>Math.max(.3,1-(pl.sm.blockP||0)-(WEAP()==='shield'?.25:0));
const armsReflect=()=>(pl.rampart>0||pl.bastion>0);
function healPl(n,label){const h=Math.round(n*(1+(pl.sm.healP||0)));pl.hp=Math.min(pl.mhp,pl.hp+h);S.nums.push({x:pl.x+6,y:pl.y-36,v:h,t:0,c:'#9bd04c'});
  for(let i=0;i<10;i++)S.parts.push({x:pl.x+rnd(-8,8),y:pl.y-rnd(2,30),vx:rnd(-8,8),vy:rnd(-40,-15),t:0,life:.8,c:i%2?'#fff4c2':'#9bd04c',g:-20,s:1});if(label)S.nums.push({x:pl.x,y:pl.y-50,txt:label,t:-.1,c:'#fff4c2'})}
function armsBlock(fromX,src){if(!(pl.bulwark>0))return false;const front=Math.sign(fromX-pl.x)===pl.face||Math.abs(fromX-pl.x)<2;if(!front)return false;
  parryFX(pl.x+pl.face*10,pl.y-18);pl.inv=.15;if(src&&!src.dead){hitMob(src,(.8+pl.bulwarkP)*1,pl.face);src.kb=pl.face*120}return true}
function armsAbsorb(d){if(pl.rampart>0)d=Math.round(d*.5);if(pl.wardHP>0){const a=Math.min(pl.wardHP,d);pl.wardHP-=a;d-=a;S.nums.push({x:pl.x,y:pl.y-40,txt:'WARD '+a,t:0,c:'#6ee6ee'});
    if(pl.wardHP<=0){pl.wardHP=0;S.nums.push({x:pl.x,y:pl.y-50,txt:'WARD BROKEN',t:-.1,c:'#6ee6ee'});if(rk('v_echo'))aoe(pl.x,pl.y-14,40,.6+.3*rk('v_echo'));tone(400,.3,'triangle',.04,-200)}}return d}
/* basic attacks */
const ARMS_BASIC={
  axe:sm=>anim(PA.atk,[.11,.07,.13],1,()=>{doHit(34,1);noise(.06,.05,900)}),
  hammer:sm=>anim(PA.atk,[.15,.08,.16],1,()=>{doHit(32,1);S.hs=Math.max(S.hs||0,.04);for(let i=0;i<8;i++)S.parts.push({x:pl.x+pl.face*22+rnd(-6,6),y:pl.y-2,vx:rnd(-40,40),vy:rnd(-80,-20),t:0,life:.5,c:'#a08e70',g:300,s:1});tone(110,.12,'square',.05,-40)}),
  spear:sm=>anim(PA.atk,[.08,.06,.1],1,()=>doHit(46,.95)),
  shield:sm=>anim(PA.atk,[.05,.07,.09],1,()=>doHit(26,.95))};
/* techniques */
function armsCast(d,i,sm,info){const p1=1+(sm.s1P||0),p2=1+(sm.s2P||0),r=info.r||1;
  if(d==='axes'){if(i==='1')anim(PA.atk,[.08,.06,.12],1,()=>{const f=pl.face,b={l:f>0?pl.x-8:pl.x-46,r:f>0?pl.x+46:pl.x+8,t:pl.y-40,b:pl.y+4};for(const m of S.mobs)if(!m.dead&&ov(b,mbox(m)))hitMob(m,1.6*p1,f);
      AFX.push({k:'arc',x:pl.x,y:pl.y-18,f,t:0,life:.25,c:'#f59a4a'});noise(.15,.07,700)});
    else if(i==='2')anim(PA.atk,[.08,.06,.1],1,()=>{shot('axe',0,230,{mult:1.4*p2,pierce:true,life:1.1,ret:.5});tone(330,.2,'square',.03,-100)});
    else{pl.whirl=1.4;pl.whirlT=0;pl.inv=Math.max(pl.inv,.4);tone(200,.5,'sawtooth',.04,200)}}
  else if(d==='hammer'){if(i==='1')anim(PA.atk,[.12,.06,.14],1,()=>{for(const dir of[-1,1])shot('quake',0,170,{y:pl.y-6,x:pl.x+dir*10,vx:dir*170,f:dir,mult:1.2*p1,pierce:true,life:.55,stun:.6+.2*rk('h_quake')});S.hs=.06;noise(.3,.08,400);tone(70,.4,'sawtooth',.06,-20)});
    else if(i==='2')anim(PA.atk,[.22,.06,.16],1,()=>{const f=pl.face,b={l:f>0?pl.x:pl.x-38,r:f>0?pl.x+38:pl.x,t:pl.y-36,b:pl.y+2};for(const m of S.mobs)if(!m.dead&&ov(b,mbox(m))){m.poise=0;hitMob(m,2.4*p2,f)}S.hs=.08;
      AFX.push({k:'crack',x:pl.x+f*24,y:pl.y,t:0,life:.6});noise(.25,.08,500)});
    else{pl.vy=-300;pl.onG=false;pl.eb={r,air:0};tone(160,.3,'triangle',.04,300)}}
  else if(d==='polearm'){if(i==='1'){pl.dash={t:.16,v:300,mult:1.5*p1,hit:new Set()};pl.inv=Math.max(pl.inv,.2);anim(PA.atk.slice(1),[.1,.1],9,null);sfx.slash()}
    else if(i==='2')anim(PA.atk,[.1,.05,.1],1,()=>{shot('jav',aimAt(pl.x+pl.face*12,pl.y-19,260),330,{mult:1.7*p2,pierce:true,life:.9});noise(.2,.05,1000)});
    else{pl.phal={n:8,t:0,r}}}
  else if(d==='shield'){if(i==='1'){pl.dash={t:.12,v:240,mult:1.1*p1,hit:new Set(),stun:.8+.2*rk('g_bash')};pl.inv=Math.max(pl.inv,.2);pl.atk={frames:[PA.bash||PA.atk[1]],durs:[.2],hit:9,fn:null,i:0,t:0};tone(220,.15,'square',.05,-80)}
    else if(i==='2'){pl.bulwark=2+.5*rk('g_bulw');pl.bulwarkP=.25*rk('g_bulw');S.nums.push({x:pl.x,y:pl.y-44,txt:'BULWARK',t:0,c:'#ffd27a'});tone(300,.2,'triangle',.04)}
    else{pl.rampart=4+r;pl.rampR=r;banner('Rampart','Missiles turn back, damage halved');tone(196,.6,'triangle',.05,100)}}
  else if(d==='restore'){if(i==='1')anim(PA.atk,[.08,.08,.1],1,()=>{healPl(pl.mhp*.25*p1,'MEND');const k=rk('e_kin');if(k)pl.mp=Math.min(pl.mmp,pl.mp+5*k);tone(660,.3,'sine',.04,200)});
    else if(i==='2'){pl.renew={t:6,tick:0,amt:pl.mhp*.05*p2};pl.psn=null;S.nums.push({x:pl.x,y:pl.y-44,txt:'RENEWAL',t:0,c:'#9bd04c'});tone(523,.4,'sine',.04,260)}
    else{healPl(pl.mhp,'SANCTUARY');pl.inv=Math.max(pl.inv,1+.5*r);AFX.push({k:'sanct',x:pl.x,y:pl.y,t:0,life:1.2+.5*r});[523,659,784,1046].forEach((f,j)=>setTimeout(()=>tone(f,.3,'sine',.05),j*90))}}
  else if(d==='ward'){if(i==='1'){pl.wardHP=Math.round(pl.mhp*.3*p1*(1+(pl.sm.wardP||0)));pl.wardT=8;S.nums.push({x:pl.x,y:pl.y-44,txt:'AEGIS',t:0,c:'#6ee6ee'});tone(880,.3,'triangle',.04,-200)}
    else if(i==='2'){AFX.push({k:'barrier',x:pl.x+pl.face*38,y:pl.y,t:0,life:4+1.5*(sm.s2P||0),mult:.5*p2,tick:0});tone(500,.3,'triangle',.04,300)}
    else{pl.wardHP=Math.round(pl.mhp*(.6+.2*r)*(1+(pl.sm.wardP||0)));pl.wardT=6;pl.bastion=6;banner('Bastion','The dome turns missiles back');tone(392,.6,'triangle',.05,200)}}
  else if(d==='exorcism'){if(i==='1')anim(PA.atk,[.07,.06,.1],1,()=>{shot('light',aimAt(pl.x+pl.face*12,pl.y-19,220),230,{mult:1.15*p1,holy:1,life:1});tone(1046,.15,'triangle',.04,-300)});
    else if(i==='2')anim(PA.atk,[.08,.08,.12],1,()=>{const R=50*(1+.1*rk('o_circle'));AFX.push({k:'circle',x:pl.x,y:pl.y,r:R,t:0,life:.8});
      for(const m of S.mobs){if(m.dead||Math.abs(m.x-pl.x)>R+m.d.w/2||Math.abs(m.y-pl.y)>R*.7+m.d.h)continue;const sp=SPIRITS[m.t];hitMob(m,1.3*p2*(sp?2*(1+pl.sm.holyP):1),Math.sign(m.x-pl.x)||1);if(sp&&!m.dead)m.stun=Math.max(m.stun,m.d.boss?.8:1.6)}tone(784,.4,'triangle',.05,-200)});
    else anim(PA.atk,[.08,.08,.12],1,()=>{for(const m of S.mobs){if(m.dead||Math.abs(m.x-pl.x)>W/2+30)continue;AFX.push({k:'pillar',x:m.x,y:m.d.fly?m.y+12:m.y,t:0,life:.7});hitMob(m,(2+.5*r)*(SPIRITS[m.t]?3:1),Math.sign(m.x-pl.x)||1)}S.hs=.08;noise(.4,.06,2000)})}}
/* tick: timed effects */
const AFX=[];
function armsTick(dt){
  if(pl.whirl>0){pl.whirl-=dt;pl.whirlT-=dt;if(pl.whirlT<=0){pl.whirlT=.16;aoe(pl.x,pl.y-14,44,.8+.25*rk('x_ult'));AFX.push({k:'spin',x:pl.x,y:pl.y-16,t:0,life:.18});noise(.08,.05,800)}}
  if(pl.eb){pl.eb.air+=dt;if(pl.onG&&pl.eb.air>.15){const r=pl.eb.r;for(const m of S.mobs){if(m.dead||Math.abs(m.x-pl.x)>80||Math.abs(m.y-pl.y)>60)continue;hitMob(m,2.8+.6*r,Math.sign(m.x-pl.x)||1);if(!m.dead)m.stun=Math.max(m.stun,m.d.boss?1:2)}
      AFX.push({k:'crack',x:pl.x,y:pl.y,t:0,life:.8,big:1});S.hs=.12;noise(.5,.1,300);tone(55,.6,'sawtooth',.07,-10);pl.eb=null}else if(pl.eb.air>3)pl.eb=null}
  if(pl.phal){const P=pl.phal;P.t-=dt;if(P.t<=0&&P.n>0){P.t=.09;P.n--;const f=pl.face,b={l:f>0?pl.x:pl.x-72,r:f>0?pl.x+72:pl.x,t:pl.y-30,b:pl.y};for(const m of S.mobs)if(!m.dead&&ov(b,mbox(m)))hitMob(m,.7+.2*P.r,f);AFX.push({k:'thrust',x:pl.x,y:pl.y-19+rnd(-5,5),f,t:0,life:.12});sfx.slash()}if(P.n<=0)pl.phal=null}
  if(pl.bulwark>0)pl.bulwark-=dt;
  if(pl.rampart>0){pl.rampart-=dt;if(pl.rampart<=0){aoe(pl.x,pl.y-14,70,2+.5*(pl.rampR||1));AFX.push({k:'crack',x:pl.x,y:pl.y,t:0,life:.6,big:1});noise(.3,.08,500)}}
  if(pl.bastion>0)pl.bastion-=dt;
  if(pl.wardT>0){pl.wardT-=dt;if(pl.wardT<=0)pl.wardHP=0}
  if(pl.renew){const R=pl.renew;R.t-=dt;R.tick-=dt;if(R.tick<=0){R.tick=1;healPl(R.amt)}if(R.t<=0)pl.renew=null}
  if(pl.dash&&pl.dash.stun)for(const m of pl.dash.hit)if(!m.dead&&!m.bashed){m.bashed=1;m.stun=Math.max(m.stun,pl.dash.stun);m.kb=pl.face*140}
  for(const pr of S.proj){if(pr.ret&&pr.t>pr.ret&&!pr.back){pr.back=1;pr.vx=-pr.vx;pr.hit=new Set()}if(pr.stun)for(const m of pr.hit)if(!m.dead&&!m.qk){m.qk=1;m.stun=Math.max(m.stun,pr.stun)}}
  for(let j=AFX.length-1;j>=0;j--){const a=AFX[j];a.t+=dt;
    if(a.k==='barrier'){a.tick-=dt;for(const e of S.eproj)if(Math.abs(e.x-a.x)<6&&Math.abs(e.y-(a.y-16))<24){e.t=9;parryFX(e.x,e.y)}
      if(a.tick<=0){a.tick=.5;for(const m of S.mobs)if(!m.dead&&Math.abs(m.x-a.x)<10+m.d.w/2&&Math.abs(m.y-a.y)<30){hitMob(m,a.mult,Math.sign(m.x-a.x)||1);m.kb=(Math.sign(m.x-a.x)||1)*120}}}
    if(a.t>=a.life)AFX.splice(j,1)}}
/* rendering */
const PROJX={
  axe(pr,x,y){const a=S.t*24;g.fillStyle='#000';g.fillRect(x-4,y-4,9,9);for(let i=0;i<4;i++){const c=Math.cos(a+i*1.57),s=Math.sin(a+i*1.57);g.fillStyle=i%2?'#8a5a2b':'#c4d0d8';g.fillRect(ri(x+c*3),ri(y+s*3),2,2)}g.fillStyle='#f2f8fb';g.fillRect(x,y,1,1)},
  quake(pr,x,y){const f=pr.f;for(let j=0;j<10;j++){const h=ri((1-j/10)*8+Math.sin(S.t*40+j)*2);g.fillStyle=j<2?'#d9c9a0':'#8a7458';g.fillRect(x-f*j,y-h+6,1,h)}},
  jav(pr,x,y,ux,uy){for(let i=0;i<16;i++){g.fillStyle=i<3?'#f2f8fb':i===14||i===15?'#d4483a':'#8a5a2b';g.fillRect(ri(x-ux*i),ri(y-uy*i),1,i<3?2:1)}},
  light(pr,x,y,ux,uy){g.save();g.globalCompositeOperation='lighter';glow(x,y,10,'255,240,180',.5);g.restore();g.fillStyle='#000';g.fillRect(x-2,y-2,5,5);g.fillStyle='#fff4c2';g.fillRect(x-1,y-1,3,3);g.fillStyle='#ffffff';g.fillRect(x,y,1,1);
    for(let i=1;i<6;i++){g.globalAlpha=1-i/6;g.fillStyle='#ffd27a';g.fillRect(ri(x-ux*i*2),ri(y-uy*i*2),1,1)}g.globalAlpha=1}};
function drawArms(cx,cy){const px0=ri(pl.x-cx),py0=ri(pl.y-cy);
  if(pl.wardHP>0||pl.bastion>0){const big=pl.bastion>0,r=big?26:18,a=.18+Math.sin(S.t*4)*.05;g.save();g.globalCompositeOperation='lighter';glow(px0,py0-16,r+6,'110,230,240',a);g.restore();
    g.fillStyle='rgba(110,230,240,.6)';for(let i=0;i<40;i++){const t=i/40*6.28;if((i+Math.floor(S.t*8))%3)continue;g.fillRect(ri(px0+Math.cos(t)*r),ri(py0-16+Math.sin(t)*r*1.1),1,1)}}
  if(pl.rampart>0||pl.bulwark>0){const x=px0+pl.face*13;g.fillStyle='rgba(255,210,122,.75)';for(let i=-9;i<=9;i++)g.fillRect(x+pl.face*ri(3-Math.abs(i)*Math.abs(i)/30),py0-16+i*2,2,2);g.save();g.globalCompositeOperation='lighter';glow(x,py0-16,16,'255,210,120',.3);g.restore()}
  if(pl.renew){g.fillStyle='#9bd04c';for(let i=0;i<3;i++){const a=S.t*3+i*2.1;g.fillRect(ri(px0+Math.cos(a)*10),ri(py0-18+Math.sin(a)*14),1,2)}}
  if(pl.whirl>0){g.save();g.globalCompositeOperation='lighter';for(let i=0;i<24;i++){const a=S.t*30+i*.26,rr=30+(i%3)*4;g.fillStyle=i%2?'rgba(245,154,74,.6)':'rgba(255,220,180,.6)';g.fillRect(ri(px0+Math.cos(a)*rr),ri(py0-16+Math.sin(a)*rr*.35),2,1)}g.restore()}
  for(const a of AFX){const x=ri(a.x-cx),y=ri(a.y-cy),k=a.t/a.life;
    if(a.k==='arc'){g.fillStyle=a.c;for(let i=0;i<30;i++){const t=-1.4+i/30*2.4;g.globalAlpha=1-k;g.fillRect(ri(x+a.f*Math.cos(t)*40),ri(y+Math.sin(t)*22),2,1)}g.globalAlpha=1}
    else if(a.k==='spin'){g.globalAlpha=1-k;g.fillStyle='#ffd0a0';for(let i=0;i<20;i++){const t=i/20*6.28;g.fillRect(ri(x+Math.cos(t)*40),ri(y+Math.sin(t)*14),2,1)}g.globalAlpha=1}
    else if(a.k==='crack'){const w=a.big?70:26;g.globalAlpha=1-k;g.fillStyle='#000';for(let i=-w;i<=w;i+=3){const h=ri((1-Math.abs(i)/w)*(a.big?10:6)*(1-k));g.fillRect(x+i,y-h,2,h)}g.fillStyle='#d9c9a0';for(let i=-w;i<=w;i+=5)g.fillRect(x+i,y-1,3,1);g.globalAlpha=1}
    else if(a.k==='thrust'){g.fillStyle='#d8f2ff';g.globalAlpha=1-k;for(let i=0;i<60;i+=2)g.fillRect(x+a.f*(12+i),y,2,1);g.globalAlpha=1}
    else if(a.k==='barrier'){const fade=Math.min(1,(a.life-a.t)*2);g.save();g.globalAlpha=fade;g.globalCompositeOperation='lighter';glow(x,y-16,18,'110,230,240',.25);g.restore();g.globalAlpha=fade;
      for(let yy=0;yy<32;yy++){g.fillStyle=(yy+Math.floor(S.t*14))%4===0?'#d8ffff':'rgba(110,230,240,.7)';g.fillRect(x-1,y-yy,3,1)}g.fillStyle='#6ee6ee';for(let yy=4;yy<32;yy+=8){g.fillRect(x-3,y-yy,7,1)}g.globalAlpha=1}
    else if(a.k==='circle'){g.globalAlpha=1-k;g.strokeStyle='#fff4c2';g.lineWidth=1;g.beginPath();g.ellipse(x,y-2,a.r*(.6+.4*k),a.r*.25*(.6+.4*k),0,0,7);g.stroke();for(let i=0;i<16;i++){const t=i/16*6.28+S.t;g.fillStyle='#ffd27a';g.fillRect(ri(x+Math.cos(t)*a.r*.8),ri(y-2+Math.sin(t)*a.r*.2)-ri(k*20),1,2)}g.globalAlpha=1}
    else if(a.k==='pillar'){const h=200,w=ri(10*(1-k)+2);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;g.fillStyle='rgba(255,240,180,.5)';g.fillRect(x-w,y-h,w*2,h);g.fillStyle='rgba(255,255,255,.8)';g.fillRect(x-1,y-h,2,h);glow(x,y-6,16,'255,230,150',.5);g.restore()}
    else if(a.k==='sanct'){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=1-k;glow(x,y-14,40,'255,240,180',.35);g.restore();g.globalAlpha=1-k;g.strokeStyle='#fff4c2';g.beginPath();g.ellipse(x,y-1,36,8,0,0,7);g.stroke();g.globalAlpha=1}}
  if(pl.wardHP>0){ptext('WARD '+Math.ceil(pl.wardHP),px0,py0-58,'#6ee6ee')}}
/* trainers and starter shop */
NPCS.garr.train=['axes'];(NPCS.rivet.train=NPCS.rivet.train||[]).push('hammer');NPCS.tess.train.push('polearm');(NPCS.bram.train=NPCS.bram.train||[]).push('shield');
(NPCS.ivo.train=NPCS.ivo.train||[]).push('restore');NPCS.wren.train.push('ward');(NPCS.corwin.train=NPCS.corwin.train||[]).push('exorcism');(NPCS.sel.train=NPCS.sel.train||[]).push('exorcism');
