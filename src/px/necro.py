def patch(fn,pairs):
    s=open(fn).read()
    for a,b in pairs:
        assert s.count(a)==1,(fn,a[:80],s.count(a));s=s.replace(a,b)
    open(fn,'w').write(s)
# ---------- data ----------
patch('js_data.js',[
("  weaver:{name:'Mossweaver',weap:'staff',","  necro:{name:'Gravecaller',weap:'tome',desc:'Raises moss-bound dead and drains souls.',hp:70,hpG:11,mp:55,mpG:10,atk:11,atkG:4,cd:.48,s1:{n:'Raise',mp:12,cd:2.5},s2:{n:'Drain',mp:14,cd:2.4}},\n  weaver:{name:'Mossweaver',weap:'staff',"),
("const WEAP_N={katana:'Katana',daggers:'Daggers',bow:'Bow',staff:'Staff'};","const WEAP_N={katana:'Katana',daggers:'Daggers',bow:'Bow',staff:'Staff',tome:'Tome'};\nconst WEAPS=Object.keys(WEAP_N);"),
("bow:\"Wanderer's Bow\",staff:\"Wanderer's Staff\"}}","bow:\"Wanderer's Bow\",staff:\"Wanderer's Staff\",tome:\"Wanderer's Grimoire\"}}"),
("bow:'Vinestring Bow',staff:'Moss-eye Staff'}}","bow:'Vinestring Bow',staff:'Moss-eye Staff',tome:'Sporebound Codex'}}"),
("bow:'Gravebow',staff:'Cinder Rod'}}","bow:'Gravebow',staff:'Cinder Rod',tome:'Ashen Litany'}}"),
("bow:'Wispbow',staff:'Lantern of Ink'}}","bow:'Wispbow',staff:'Lantern of Ink',tome:'Ink-soaked Tome'}}"),
("bow:'Bastion Longbow',staff:'Gatestaff'}}","bow:'Bastion Longbow',staff:'Gatestaff',tome:'Keystone Codex'}}"),
("||!['katana','daggers','bow','staff'].every(w=>g.weap[w])});","||!WEAPS.every(w=>g.weap[w])});"),
(" weaver:[\n  {id:'w_roots'",""" necro:[
  {id:'n_pact',t:0,col:0,n:'Dark Pact',k:'Passive',max:5,ic:'skull',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'n_ward',t:0,col:1,n:'Bone Ward',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'n_horde',t:1,col:0,req:['n_pact',2],n:'Bone Horde',k:'Upgrade',max:3,ic:'skull',fx:r=>({s1P:.15*r,thrallN:r>=3?2:r>=2?1:0}),d:r=>`Thralls deal +${15*r}% damage${r>=2?`, +${r>=3?2:1} max thrall${r>=3?'s':''}`:''}`},
  {id:'n_siphon',t:1,col:1,req:['n_ward',2],n:'Soul Siphon',k:'Upgrade',max:3,ic:'drain',fx:r=>({s2P:.2*r,drainP:.1*r}),d:r=>`Drain deals +${20*r}% damage and heals ${30+10*r}% of it`},
  {id:'n_mark',t:2,col:0,req:['n_horde',1],n:'Death Mark',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'n_bloom',t:2,col:1,req:['n_siphon',1],n:'Corpse Bloom',k:'Passive',max:3,ic:'poison',fx:r=>({corpse:.25*r}),d:r=>`Slain foes burst for ${25*r}% of your attack around them`},
  {id:'n_ult',t:3,col:.5,req:['n_mark|n_bloom',1],n:'Army of the Fallen',k:'Ultimate',max:3,ic:'ult',mp:36,cd:14,fx:()=>({}),d:r=>`${4+r} wraiths rise and hunt your foes for 5s, hitting for ${120+20*r}%. 36 MP, 14s cooldown`}],
 weaver:[
  {id:'w_roots'"""),
("regen:0,poison:0};","regen:0,poison:0,thrallN:0,drainP:0,corpse:0};"),
])
# ---------- character sprite ----------
patch('js_char.js',[
("let WT={guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a'};","let WT={guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a',tome:'#3a2440',clasp:'#d9d2bc'};\nfunction tomeP(P,x,y,open){const c=WT.tome,cl=WT.clasp;if(open){for(let i=0;i<7;i++)for(let j=0;j<4;j++)P(x+i,y+j,'#efe4c8');for(let j=0;j<4;j++)P(x+3,y+j,c);for(let i=0;i<7;i++)P(x+i,y+4,c);P(x+1,y+1,'#9a927a');P(x+5,y+1,'#9a927a');P(x+1,y+2,'#9a927a');P(x+5,y+2,'#7a4aa0')}\n  else{for(let i=0;i<4;i++)for(let j=0;j<5;j++)P(x+i,y+j,c);for(let j=0;j<5;j++)P(x+3,y+j,cl);P(x+1,y+2,'#9bd04c');P(x,y,cl)}}"),
("orbL:mixC(wp[3],'#ffffff',.5)}:null}}","orbL:mixC(wp[3],'#ffffff',.5),tome:mixC(wp[1],'#3a2440',.4),clasp:wp[3]==='#f2e6c8'?'#d9d2bc':wp[3]}:null}}"),
("  if(o.arm==='idle'){const a=o.armSw||0;Rc(tr-2+a,19+b,3,6,O[0]);P(tr-2+a,19+b,O[1]);P(tr+a,20+b,O[2]);Rc(tr-1+a,25+b,2,2,A.hand)}",
 "  if(o.arm==='idle'||o.arm==='tome'){const a=o.armSw||0;Rc(tr-2+a,19+b,3,6,O[0]);P(tr-2+a,19+b,O[1]);P(tr+a,20+b,O[2]);if(o.arm==='tome')tomeP(P,tr-1+a,23+b,false);Rc(tr-1+a,25+b,2,2,A.hand)}"),
("WT=A.wt||{guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a'};","WT=A.wt||{guard:'#e3b04b',wood:'#8a5a2b',woodD:'#5e3a1c',orb:'#9bd04c',orbL:'#d8ff9a',tome:'#3a2440',clasp:'#d9d2bc'};"),
("armMode=W==='staff'?'staff':'idle',","armMode=W==='staff'?'staff':W==='tome'?'tome':'idle',"),
("  else{const staff=(P,x0,y0,x1,y1,glow)=>","""  else if(W==='tome'){X.atk=[F({lf:2,lb:-3},P=>{armTo(P,sx,20,sx+2,17,A);tomeP(P,sx+2,13,false)}),
      F({bob:1,lf:4,lb:-4},P=>{armTo(P,sx,21,sx+8,20,A);tomeP(P,sx+9,17,true)},P=>smearArc(P,sx+12,18,5,8,-3.2,3.2,1,['#7a4aa0','#c9a8ff'])),
      F({lf:3,lb:-3},P=>{armTo(P,sx,21,sx+5,22,A);tomeP(P,sx+6,21,false)})]}
  else{const staff=(P,x0,y0,x1,y1,glow)=>"""),
])
# ---------- creature + ally sprites, tome icon ----------
patch('js_mobs.js',[
("function buildMobSprites(){","""function thrallFrame(mode){return sprite(20,28,(P,Rc)=>{const bn='#d9d2bc',bd='#9a927a',dk='#2a2420',ms='#5d8a6a',ml='#86b47f',gl='#9bd04c',st=mode==='walk1'?1:0;
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
  MSP.thrall={walk0:thrallFrame('walk0'),walk1:thrallFrame('walk1'),atk:thrallFrame('atk')};MSP.wraith=[0,2,4].map(wraithFrame);"""),
("      else{for(let y=6;y<23;y++)P(12+(y>14?0:0),y,wd);","      else if(w==='tome'){Rc(6,5,12,15,mixC(pal[1],'#3a2440',.4));Rc(15,5,3,15,gd==='#e3b04b'?'#d9d2bc':gd);Rc(7,6,8,1,'#5a4466');Rc(9,10,4,4,'#d9d2bc');P(10,11,'#15131f');P(11,11,'#9bd04c');Rc(6,19,12,1,'#efe4c8')}\n      else{for(let y=6;y<23;y++)P(12+(y>14?0:0),y,wd);"),
])
# ---------- game logic ----------
patch('js_game.js',[
("weap=slot==='weapon'?(Math.random()<.65?WEAP():['katana','daggers','bow','staff'][Math.random()*4|0]):null;","weap=slot==='weapon'?(Math.random()<.65?WEAP():WEAPS[Math.random()*WEAPS.length|0]):null;"),
("function killMob(m){m.dead=1;","function killMob(m){if(pl.sm.corpse>0&&!m.bloomed){m.bloomed=1;for(let i=0;i<10;i++){const a=i/10*6.28;S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:Math.cos(a)*70,vy:Math.sin(a)*70,t:0,life:.4,c:i%2?'#9bd04c':'#7a4aa0',g:0,s:2})}\n    setTimeout(()=>aoe(m.x,m.y-m.d.h/2,30,pl.sm.corpse),0)}\n  m.dead=1;"),
("  else anim(PA.atk,[.08,.07,.12],1,()=>{shot('bolt',","  else if(w==='tome')anim(PA.atk,[.08,.07,.12],1,()=>{shot('soul',aimAt(pl.x+pl.face*12,pl.y-19,200),150,{mult:1.1,life:1.4,home:1});tone(300,.2,'triangle',.04,-120)});\n  else anim(PA.atk,[.08,.07,.12],1,()=>{shot('bolt',"),
("  else{const ox=pl.x;burst(pl.x,pl.y-14,'#9bd04c');","  else if(w==='tome')anim(PA.atk,[.08,.08,.1],1,summonThrall);\n  else{const ox=pl.x;burst(pl.x,pl.y-14,'#9bd04c');"),
("  else anim(PA.atk,[.06,.08,.12],1,()=>{const r=55*(1+sm.thornsR);","  else if(w==='tome')anim(PA.atk,[.06,.12,.12],1,()=>{let best=null,bd=141;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-pl.x,(m.y-m.d.h/2)-(pl.y-16));if(d<bd&&Math.sign(m.x-pl.x||pl.face)===pl.face){bd=d;best=m}}\n    if(!best){S.nums.push({x:pl.x,y:pl.y-40,txt:'NO TARGET',t:0,c:'#c9a8ff'});pl.mp+=CL().s2.mp;pl.s2Cd=0;return}\n    const heal=Math.round(atkPow()*1.4*p*(.3+sm.drainP));hitMob(best,1.4*p,pl.face);pl.hp=Math.min(pl.mhp,pl.hp+heal);S.nums.push({x:pl.x+6,y:pl.y-34,v:heal,t:0,c:'#9bd04c'});S.fx.push({k:'beam',m:best,t:0,life:.45});tone(180,.4,'sawtooth',.03,240)});\n  else anim(PA.atk,[.06,.08,.12],1,()=>{const r=55*(1+sm.thornsR);"),
("  else anim(PA.atk,[.06,.08,.12],1,()=>{S.fx.push({k:'thorns',x:pl.x,y:pl.y,r:40,","  else if(w==='tome')anim(PA.atk,[.06,.12,.12],1,()=>{for(let i=0;i<4+r;i++){const a=i/(4+r)*6.28;S.allies.push({k:'wraith',x:pl.x+Math.cos(a)*20,y:pl.y-20+Math.sin(a)*12,vx:Math.cos(a)*40,vy:Math.sin(a)*40,life:5,hits:new Map(),mult:1.2+.2*r,face:1,ph:i})}\n    burst(pl.x,pl.y-16,'#c9a8ff');tone(140,.6,'sawtooth',.05,300);noise(.4,.05,600)});\n  else anim(PA.atk,[.06,.08,.12],1,()=>{S.fx.push({k:'thorns',x:pl.x,y:pl.y,r:40,"),
("S.proj=[];S.eproj=[];S.waves=[];","S.proj=[];S.eproj=[];S.waves=[];S.allies=[];"),
("  S.mobs=S.mobs.filter(o=>!(o.temp&&o.dead));","""  S.mobs=S.mobs.filter(o=>!(o.temp&&o.dead));
  for(const a of S.allies){a.life-=dt;a.ph=(a.ph||0)+dt;
    if(a.k==='thrall'){if(a.rise>0){a.rise-=dt;continue}a.cd=Math.max(0,a.cd-dt);a.atkT=Math.max(0,a.atkT-dt);
      let tg=null,bd=140;for(const m of S.mobs){if(m.dead)continue;const d=Math.abs(m.x-a.x);if(d<bd&&Math.abs((m.y-(m.d.fly?0:0))-a.y)<(m.d.fly?60:30)){bd=d;tg=m}}
      let dir=0;if(tg){const dx=tg.x-a.x;a.face=Math.sign(dx)||a.face;if(Math.abs(dx)>10+tg.d.w/2)dir=Math.sign(dx);else if(a.cd<=0){a.cd=.9;a.atkT=.25;const t2=tg;setTimeout(()=>{if(!t2.dead)hitMob(t2,a.mult,a.face);noise(.06,.04,1800)},120)}}
      else{const dx=pl.x-pl.face*16-a.x;if(Math.abs(dx)>14){dir=Math.sign(dx);a.face=dir}}
      if(Math.abs(pl.x-a.x)>240||Math.abs(pl.y-a.y)>80){burst(a.x,a.y-10,'#9a927a');a.x=pl.x-pl.face*14;a.y=pl.y;a.vy=0;a.rise=.3}
      a.vx=dir*62;const ox=a.x;a.x=clamp(a.x+a.vx*dt,8,WW-8);wallPush(a,a.x-ox);if(a.x===ox&&dir&&a.onG){a.vy=-220;a.onG=false}
      a.vy=Math.min(a.vy+GRAV*dt,420);const py=a.y;a.y+=a.vy*dt;const ly=landY(a.x,py,a.y);if(ly!==null){a.y=ly;a.vy=0;a.onG=true}else a.onG=false;if(a.y>WH)a.y=pl.y,a.x=pl.x;a.walk=(a.walk||0)+Math.abs(a.vx)*dt*.12}
    else{let tg=null,bd=260;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-a.x,m.y-m.d.h/2-a.y);if(d<bd){bd=d;tg=m}}
      const tx=tg?tg.x:pl.x+Math.cos(a.ph*2)*30,ty=tg?tg.y-tg.d.h/2:pl.y-34+Math.sin(a.ph*3)*10,ang=Math.atan2(ty-a.y,tx-a.x);
      a.vx+=(Math.cos(ang)*150-a.vx)*Math.min(1,dt*3);a.vy+=(Math.sin(ang)*150-a.vy)*Math.min(1,dt*3);a.x+=a.vx*dt;a.y+=a.vy*dt;a.face=Math.sign(a.vx)||1;
      if(tg&&bd<12&&(a.hits.get(tg)||0)<=S.t){a.hits.set(tg,S.t+.5);hitMob(tg,a.mult,a.face)}
      if(Math.random()<.4)S.parts.push({x:a.x,y:a.y,vx:0,vy:rnd(-5,5),t:0,life:.4,c:Math.random()<.5?'#7a5aa0':'#4a2e6a',g:0,s:1})}
    if(a.life<=0)for(let i=0;i<8;i++)S.parts.push({x:a.x,y:a.y-(a.k==='thrall'?10:0),vx:rnd(-40,40),vy:rnd(-80,-10),t:0,life:.5,c:i%2?'#d9d2bc':'#5d8a6a',g:a.k==='thrall'?300:0,s:1})}
  S.allies=S.allies.filter(a=>a.life>0);"""),
("    if(pr.k==='bolt'&&Math.random()<.6)","""    if(pr.home){let tg=null,bd=130;for(const m of S.mobs){if(m.dead)continue;const d=Math.hypot(m.x-pr.x,m.y-m.d.h/2-pr.y);if(d<bd&&Math.sign(m.x-pr.x)===Math.sign(pr.vx)){bd=d;tg=m}}
      if(tg){const sp=Math.hypot(pr.vx,pr.vy),a0=Math.atan2(pr.vy,pr.vx),a1=Math.atan2(tg.y-tg.d.h/2-pr.y,tg.x-pr.x);let da=a1-a0;while(da>Math.PI)da-=6.28;while(da<-Math.PI)da+=6.28;const na=a0+clamp(da,-4*dt,4*dt);pr.vx=Math.cos(na)*sp;pr.vy=Math.sin(na)*sp}
      if(Math.random()<.7)S.parts.push({x:pr.x,y:pr.y,vx:rnd(-6,6),vy:rnd(-6,6),t:0,life:.35,c:Math.random()<.5?'#c9a8ff':'#9bd04c',g:0,s:1})}
    if(pr.k==='bolt'&&Math.random()<.6)"""),
("function burst(x,y,c){","""function summonThrall(){const th=S.allies.filter(a=>a.k==='thrall'),max=2+pl.sm.thrallN;if(th.length>=max){th.sort((a,b)=>a.life-b.life);S.allies.splice(S.allies.indexOf(th[0]),1)}
  const o={x:clamp(pl.x+pl.face*16,8,WW-8),y:pl.y};wallPush(o,pl.face);
  S.allies.push({k:'thrall',x:o.x,y:pl.y,vx:0,vy:0,onG:true,face:pl.face,life:20,rise:.4,cd:.3,atkT:0,mult:.6*(1+pl.sm.s1P)});
  for(let i=0;i<12;i++)S.parts.push({x:o.x+rnd(-8,8),y:pl.y,vx:rnd(-20,20),vy:rnd(-70,-20),t:0,life:.6,c:i%3?'#5d8a6a':'#d9d2bc',g:200,s:1});tone(120,.35,'sawtooth',.05,180)}
function burst(x,y,c){"""),
("const S={t:0,","const S={allies:[],t:0,"),
])
# ---------- render ----------
patch('js_render.js',[
("  // player\n","""  for(const a of S.allies){const x=ri(a.x-cx),y=ri(a.y-cy);if(a.life<1.2&&Math.floor(S.t*12)%2)continue;
    if(a.k==='thrall'){const img=a.atkT>0?MSP.thrall.atk:MSP.thrall[Math.floor(a.walk||0)%2?'walk1':'walk0'];g.save();g.translate(x,0);if(a.face<0)g.scale(-1,1);
      if(a.rise>0){const k=1-a.rise/.4,hh=Math.max(1,ri(28*k));g.drawImage(img,0,0,20,hh,-9,y-hh+1,20,hh)}else{g.fillStyle='rgba(0,0,0,.35)';g.fillRect(-5,y,10,1);g.drawImage(img,-9,y-27)}g.restore()}
    else{g.save();g.globalAlpha=.85;g.globalCompositeOperation='lighter';glow(x,y,10,'150,100,220',.2);g.restore();g.save();g.globalAlpha=.9;g.translate(x,0);if(a.face<0)g.scale(-1,1);g.drawImage(MSP.wraith[Math.floor(S.t*8+a.ph*3)%3],-13,y-9);g.restore()}}
  // player
"""),
("    else if(f.k==='thorns'){","""    else if(f.k==='beam'&&f.m){const x0=pl.x-cx+pl.face*10,y0=pl.y-cy-18,x1=f.m.x-cx,y1=f.m.y-cy-f.m.d.h/2,n=Math.ceil(Math.hypot(x1-x0,y1-y0)/2);
      for(let i=0;i<=n;i++){const u=i/n,w=Math.sin(u*14-S.t*30)*2*(1-k);g.fillStyle=i%3?'#c9a8ff':'#9bd04c';g.globalAlpha=1-k*.6;g.fillRect(ri(x0+(x1-x0)*u),ri(y0+(y1-y0)*u+w),1,1)}g.globalAlpha=1}
    else if(f.k==='thorns'){"""),
("    else if(pr.k==='star'){","""    else if(pr.k==='soul'){g.globalAlpha=.45;g.fillStyle='#7a4aa0';g.fillRect(x-3,y-3,7,7);g.globalAlpha=1;g.fillStyle='#000';g.fillRect(x-2,y-2,5,5);g.fillStyle='#efe4c8';g.fillRect(x-1,y-2,3,3);g.fillRect(x-1,y+1,3,1);g.fillStyle='#15131f';g.fillRect(x-1,y-1,1,1);g.fillStyle='#9bd04c';g.fillRect(x+1,y-1,1,1)}
    else if(pr.k==='star'){"""),
])
# ---------- UI ----------
patch('js_ui.js',[
("const ICS={blade:","const ICS={skull:'M12 3a7 7 0 0 0-7 7c0 3 1.5 4.5 3 5.5V19h8v-3.5c1.5-1 3-2.5 3-5.5a7 7 0 0 0-7-7zM9 10h.01M15 10h.01M10 19v-2M14 19v-2',drain:'M4 12c4-6 12-6 16 0M4 12c4 6 12 6 16 0M12 9v6',blade:"),
("const TREE_N={ronin:'Way of the Blade',","const TREE_N={necro:'The Grave Rite',ronin:'Way of the Blade',"),
("$('b-atk').innerHTML=`<span>${c.weap==='bow'?'Shoot':c.weap==='staff'?'Cast':'Slash'}</span>`;","$('b-atk').innerHTML=`<span>${c.weap==='bow'?'Shoot':c.weap==='staff'||c.weap==='tome'?'Cast':'Slash'}</span>`;"),
("<b>X</b> ${c.weap==='bow'?'shoot':c.weap==='staff'?'cast':'slash'}","<b>X</b> ${c.weap==='bow'?'shoot':c.weap==='staff'||c.weap==='tome'?'cast':'slash'}"),
])
print('patched')
