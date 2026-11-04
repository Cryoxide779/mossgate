/* ---------- living world: clock, weather, soundscape, barks, townsfolk, lore ---------- */
/* clock: one full day every 16 real minutes, shared across sessions */
const DAY_LEN=16*60;
const dayT=()=>((Date.now()/1000)/DAY_LEN+.42)%1; // 0 midnight · .25 dawn · .5 noon · .75 dusk
function nightAmt(){const c=Math.cos((dayT()-.5)*Math.PI*2);return clamp((.25-c)/.85,0,1)}
function duskAmt(){const t=dayT();return Math.max(0,1-Math.abs(t-.75)/.07,1-Math.abs(t-.25)/.07)}
function timeName(){const t=dayT();return t<.2||t>.82?'Night':t<.3?'Dawn':t<.7?'Day':'Dusk'}
/* weather */
const WX={road:['clear','clear','rain'],outskirts:['clear','rain','fog'],oak:['fog','fog','clear'],falls:['rain','fog','clear'],bog:['fog','storm','fog'],tower:['clear','rain','wind'],
  gate:['ash','ash','clear'],scar:['embers','embers','ash'],hollow:['embers'],inner:['embers','ash'],town:['clear','clear','rain'],stonebridge:['clear','rain','clear']};
const WX_N={clear:'',rain:'Rain',storm:'Storm',fog:'Fog',wind:'Wind',ash:'Ashfall',embers:'Ember storm'};
function weather(){const L=WX[Z.id]||['clear'],b=Math.floor(Date.now()/1000/180);return L[Math.floor(hash(b,Z.id.charCodeAt(0)*13+Z.id.length,7)*L.length)]}
const WP=[...Array(140)].map(()=>({x:Math.random(),y:Math.random(),v:.6+Math.random()*.6,s:Math.random()}));let FLASH=0,FOGC=null;
function fogTex(){if(FOGC)return FOGC;const L=layer(320,90);for(let y=0;y<90;y++)for(let x=0;x<320;x++){const v=fbm(x*.02,y*.05,11)*fbm(x*.05+3,y*.07,12),fade=Math.sin(y/90*Math.PI);const a=clamp((v-.18)*3.2,0,1)*fade;if(a>.04)sp(L,x,y,[214,222,220],Math.round(a*255))}commit(L);FOGC=L.c;return FOGC}
function drawWeather(cx,cy,dt){const w=weather();
  if(w==='fog'){const f=fogTex();g.globalAlpha=.34;for(let k=0;k<2;k++){const ox=((-cx*(.3+k*.35)-S.t*(4+k*5))%320+320)%320-320;for(let x=ox;x<W;x+=320)g.drawImage(f,ri(x),ri(H*.38+k*22-cy*.05))}g.globalAlpha=1}
  if(w==='rain'||w==='storm'){g.fillStyle='rgba(16,24,40,.16)';g.fillRect(0,0,W,H);g.fillStyle='rgba(190,210,235,.55)';
    for(const p of WP){p.y+=dt*1.6*p.v;p.x-=dt*.25*p.v;if(p.y>1){p.y=0;p.x=Math.random()}if(p.x<0)p.x+=1;const x=ri(p.x*W),y=ri(p.y*H);g.fillRect(x,y,1,3+ri(p.s*3));
      const gy=ri(topAt(x+cx)-cy);if(Math.abs(y-gy)<3&&p.s>.6){g.fillRect(x-1,gy-1,1,1);g.fillRect(x+1,gy-1,1,1)}}
    if(w==='storm'){if(FLASH<=0&&Math.random()<dt*.06){FLASH=.35;setTimeout(()=>noise(1.6,.05*sndVol(),90),400+Math.random()*900)}if(FLASH>0){g.fillStyle=`rgba(230,240,255,${FLASH})`;g.fillRect(0,0,W,H);FLASH-=dt}}}
  if(w==='wind'){g.fillStyle='rgba(200,180,120,.7)';for(const p of WP.slice(0,30)){p.x-=dt*.5*p.v;p.y+=Math.sin(S.t*3+p.s*9)*dt*.05;if(p.x<0){p.x=1;p.y=Math.random()*.8}g.fillRect(ri(p.x*W),ri(p.y*H),2,1)}}
  if(w==='ash'){for(const p of WP.slice(0,80)){p.y+=dt*.08*p.v;p.x+=Math.sin(S.t+p.s*7)*dt*.02;if(p.y>1){p.y=0;p.x=Math.random()}g.fillStyle=p.s>.5?'#8d8aa3':'#55505a';g.fillRect(ri(p.x*W),ri(p.y*H),p.s>.8?2:1,1)}}
  if(w==='embers'){g.fillStyle='rgba(60,10,20,.1)';g.fillRect(0,0,W,H);for(const p of WP.slice(0,60)){p.y-=dt*.12*p.v;p.x+=Math.sin(S.t*2+p.s*9)*dt*.03;if(p.y<0){p.y=1;p.x=Math.random()}g.fillStyle=p.s>.6?'#ffb24a':'#d4483a';g.globalAlpha=.5+p.s*.5;g.fillRect(ri(p.x*W),ri(p.y*H),1,1)}g.globalAlpha=1}}
const FF=[...Array(24)].map(()=>({x:Math.random(),y:Math.random(),p:Math.random()*6}));
function drawLighting(cx,cy,L){const n=nightAmt(),d=duskAmt()*(1-n);
  if(d>0){g.save();g.globalCompositeOperation='multiply';g.fillStyle=`rgb(255,${ri(255-70*d)},${ri(255-120*d)})`;g.fillRect(0,0,W,H);g.restore()}
  if(n<=0)return;g.save();g.globalCompositeOperation='multiply';g.fillStyle=`rgb(${ri(255-140*n)},${ri(255-122*n)},${ri(255-70*n)})`;g.fillRect(0,0,W,H);g.restore();
  g.save();g.globalCompositeOperation='lighter';for(const[gx,gy,r,col]of L.glows){const x=gx-cx,y=gy-cy;if(x<-r*2||x>W+r*2)continue;glow(x,y,r*1.7,col,.3*n)}
  glow(ri(pl.x-cx),ri(pl.y-cy)-16,44,'255,200,140',.11*n);for(const a of S.allies)if(a.t==='lantern')glow(ri(a.x-cx),ri(a.y-cy)-6,34,'255,200,110',.25*n);
  if(!THEMES[Z.theme].noFern&&Z.theme!=='town')for(const f of FF){f.p+=.02;const x=ri(f.x*W+Math.sin(f.p)*12),y=ri(H*.35+f.y*H*.5+Math.cos(f.p*.7)*8),a=(.5+Math.sin(f.p*3)*.5)*n;g.fillStyle=`rgba(244,255,154,${a})`;g.fillRect(x,y,1,1);g.fillStyle=`rgba(244,255,154,${a*.25})`;g.fillRect(x-1,y-1,3,3)}
  g.restore()}
/* soundscape: wind, rain, water, wildlife and a soft generative score. Mute persists. */
let OUT=null,SND={on:true},AMB2=null;try{SND.on=localStorage.getItem('mg-snd')!=='0'}catch(e){}
const sndVol=()=>SND.on?1:0;
function outNode(){if(!OUT&&AC){OUT=AC.createGain();OUT.gain.value=SND.on?1:0;OUT.connect(AC.destination)}return OUT||AC.destination}
function ambInit(){if(AMB2||!AC)return;try{const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),a=b.getChannelData(0);let l=0;for(let i=0;i<n;i++){const w=Math.random()*2-1;l=(l+.02*w)/1.02;a[i]=w*.5+l*3}
  const mk=(type,f,q)=>{const s=AC.createBufferSource();s.buffer=b;s.loop=true;s.playbackRate.value=.7+Math.random()*.6;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const gn=AC.createGain();gn.gain.value=0;s.connect(fl);fl.connect(gn);gn.connect(outNode());s.start();return gn};
  AMB2={wind:mk('lowpass',380,.7),rain:mk('highpass',1600,.5),water:mk('bandpass',700,.8),fire:mk('bandpass',260,.6),next:0,mus:0,chord:0}}catch(e){}}
const KEYS={safe:[[261.6,329.6,392,493.9],[220,261.6,329.6,392],[174.6,220,261.6,329.6],[196,246.9,293.7,392]],wild:[[220,261.6,329.6],[174.6,220,261.6],[261.6,329.6,392],[164.8,196,246.9]],dark:[[146.8,174.6,207.7],[138.6,164.8,207.7],[155.6,185,233.1],[146.8,185,220]]};
function pad(fr,v){if(!AC)return;const t=AC.currentTime;for(const f of fr){const o=AC.createOscillator(),o2=AC.createOscillator(),gn=AC.createGain();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*1.004;
  gn.gain.setValueAtTime(0,t);gn.gain.linearRampToValueAtTime(v,t+2.2);gn.gain.linearRampToValueAtTime(0,t+7.5);o.connect(gn);o2.connect(gn);gn.connect(outNode());o.start(t);o2.start(t);o.stop(t+7.6);o2.stop(t+7.6)}}
function pluck(f,v){if(!AC)return;const t=AC.currentTime,o=AC.createOscillator(),gn=AC.createGain();o.type='triangle';o.frequency.value=f;gn.gain.setValueAtTime(v,t);gn.gain.exponentialRampToValueAtTime(.0001,t+1.6);o.connect(gn);gn.connect(outNode());o.start(t);o.stop(t+1.7)}
function ambUpdate(dt){if(!AC||!S.started)return;ambInit();if(!AMB2)return;const w=weather(),n=nightAmt(),t=AC.currentTime,set=(k,v)=>AMB2[k].gain.setTargetAtTime(v,t,1.2);
  const wet=Z.id==='falls'||Z.id==='stonebridge'||Z.id==='bog';set('wind',(Z.theme==='scar'||Z.theme==='dusk'||w==='wind'?.05:.016)+(w==='storm'?.03:0));set('rain',w==='rain'?.035:w==='storm'?.06:0);set('water',wet?.03:0);
  set('fire',(Z.props||[]).some(([k,x])=>(k==='fire'||k==='forge'||k==='brazier')&&Math.abs(pl.x-x)<120)?.05:0);
  AMB2.next-=dt;if(AMB2.next<=0){AMB2.next=1.5+Math.random()*3.5;const wild=!Z.safe;
    if(n<.4&&(Z.theme==='grove'||Z.theme==='oak'||Z.theme==='heath')&&w!=='rain'){const b0=2400+Math.random()*1400;for(let i=0;i<2+Math.floor(Math.random()*3);i++)setTimeout(()=>tone(b0+Math.random()*500,.07,'sine',.012,600),i*110)}
    else if(n>.5&&!Z.theme.match(/scar|blood/)){for(let i=0;i<3;i++)setTimeout(()=>tone(4200,.03,'square',.004),i*60);if(Z.id==='bog')tone(170,.25,'triangle',.02,-40)}
    if(Z.safe&&Math.abs(pl.x-(560+EDGE))<200&&Z.id==='town')[1800,2710].forEach(f=>tone(f,.25,'triangle',.012));
    if(Z.theme==='scar'&&Math.random()<.4)tone(90+Math.random()*40,1.2,'sawtooth',.006,-20)}
  AMB2.mus-=dt;if(AMB2.mus<=0){AMB2.mus=7.4;const key=Z.safe?KEYS.safe:(Z.theme==='scar'||Z.theme==='blood'||Z.theme==='dusk')?KEYS.dark:KEYS.wild,ch=key[AMB2.chord++%key.length];pad(ch.map(f=>f/2),.006);
    for(let i=0;i<3;i++)if(Math.random()<.55)setTimeout(()=>pluck(ch[Math.floor(Math.random()*ch.length)]*(Math.random()<.5?1:2),.012),900+i*1700+Math.random()*500)}}
function setSnd(on){SND.on=on;try{localStorage.setItem('mg-snd',on?'1':'0')}catch(e){}if(OUT)OUT.gain.value=on?1:0;$('sndbtn').classList.toggle('off',!on)}
/* speech bubbles */
const BARKS={ysel:['Mind the grain sacks.','Thirty mouths to feed.','East. Always east.'],ren:['Road is quiet. Too quiet.','Stew is still warm.','Watch the ditches.'],
  holt:['Names on the board. Read them.','Hold the line, CrestHollow.','Another caravan due.'],wren:['The lanterns hum tonight.','Records lie. Embers don’t.','Mind the candles.'],
  hesk:['Hot iron waits for no one.','Bring me ore!','Hammer, anvil, heat.'],nell:['That jar bites.','Fresh tonics. Mostly.','Slimes are not pests!'],
  tamsin:['Tonics! Wraps! Hope!','Shards only, love.','Fair prices. Fairer than most.'],pip:['Are you a hero?','Mum is on watch.','Tobin lies about the moss.'],
  bram:['Wipe your boots.','East gate, Whisper Woods.','Moss spreads. Keep moving.'],tobin:['~ the bells rang out ~','Need a better ending.','Songs are cheap.'],
  marga:['Freight, insurance, collateral.','Who is escorting the iron?','Prices are mad again.'],oswin:['Toll is fair.','Mind the second pier.','Bridge holds. For now.'],dov:['Wagons arrive. That is all.','Fee first, then road.'],
  garr:['Fallen wood first!','Wolves at dusk.','Clean cuts only.'],yenna:['The herd is restless.','Listen to the roots.'],tilla:['Ferry runs. Mostly.','Mind the lurkers.'],
  sef:['The bog remembers.','Hush. They are speaking.'],ilse:['That beacon should be dead.','Valid signal. Wrong world.'],ves:['Lawful work or steel.','Toll-takers ahead.'],corwin:['Do not listen to the shards.','Something is waking.']};
const FOLK_B=['Bread went up again.','Heard the watchtower is lit.','Another caravan lost.','Gate shards for rope? Robbery.','My cousin made it out.','Keep your lantern close tonight.','The moss is in my boots.','Stonebridge pays better.','Who rang the bells that night?','Rain again.'];
function bubble(x,y,txt){const words=txt.split(' '),lines=[];let cur='';for(const w of words){if((cur+' '+w).trim().length>20){lines.push(cur.trim());cur=w}else cur+=' '+w}if(cur.trim())lines.push(cur.trim());
  g.font='8px Silkscreen, monospace';const tw=Math.max(...lines.map(l=>g.measureText(l).width)),bw=ri(tw)+8,bh=lines.length*9+4,bx=ri(x-bw/2),by=ri(y-bh-6);
  g.fillStyle='#0b0910';g.fillRect(bx-1,by,bw+2,bh);g.fillRect(bx,by-1,bw,bh+2);g.fillStyle='#f2e6c8';g.fillRect(bx,by,bw,bh);g.fillStyle='#0b0910';g.fillRect(ri(x)-2,by+bh,5,2);g.fillRect(ri(x)-1,by+bh+2,3,1);g.fillStyle='#f2e6c8';g.fillRect(ri(x)-1,by+bh,3,1);
  g.fillStyle='#2a1d2e';g.textAlign='left';g.textBaseline='top';lines.forEach((l,i)=>g.fillText(l,bx+4,by+3+i*9))}
function barkTick(who,x,y,list,key){const now=S.t;who.bt=who.bt??(now-Math.random()*10);if(who.bub&&now-who.bub.t>3.6)who.bub=null;
  if(!who.bub&&!DLG&&now-(S.lastBark||-9)>3&&Math.abs(pl.x-x)<90&&Math.abs(pl.y-y)<40&&now-who.bt>11+Math.random()*4){who.bt=now;S.lastBark=now;who.bub={txt:list[Math.floor(Math.random()*list.length)],t:now}}}
/* wandering townsfolk */
const FOLK_LOOKS=[['wanderer',0],['r_start',1],['moss',0],['a_start',1],['w_start',0],['boar',0],['leatherwork',1],['n_start',1]];
function makeFolk(z){const n=z.id==='town'?6:4,F=[];for(let i=0;i<n;i++){const sx=Math.random()<.5?1:0,set=FOLK_LOOKS[(i*3+z.id.length)%FOLK_LOOKS.length][0];
    const ch={cls:'ronin',look:{sex:sx,build:Math.floor(Math.random()*3),face:Math.floor(Math.random()*5),hair:[0,1,2,3,5,6][Math.floor(Math.random()*6)],hairC:Math.floor(Math.random()*8),beard:sx?0:Math.floor(Math.random()*6),skin:Math.floor(Math.random()*6),eye:Math.floor(Math.random()*5),outfit:Math.floor(Math.random()*6)}};
    const eq={chest:{src:set,slot:'chest'}};if(Math.random()<.5)eq.head={src:set,slot:'head'};
    F.push({C:null,ch,eq,x:z.x0+80+Math.random()*(z.x1-z.x0-160),tx:0,face:1,wait:Math.random()*4,spd:18+Math.random()*12,crate:Math.random()<.3,night:i<2,walk:0})}return F}
function tickFolk(dt){if(!Z.safe)return;Z.folk=Z.folk||makeFolk(Z);{const f=Z.folk.find(q=>!q.C);if(f){const keep=WT;f.C=buildChar(f.ch,f.eq);WT=keep}}const n=nightAmt();for(const f of Z.folk){if(n>.5&&!f.night){f.hide=true;continue}f.hide=false;
  if(f.wait>0){f.wait-=dt;if(f.wait<=0)f.tx=clamp(f.x+(Math.random()-.5)*400,Z.x0+60,Z.x1-60);continue}const d=f.tx-f.x;if(Math.abs(d)<3){f.wait=2+Math.random()*6;continue}
  f.face=Math.sign(d);f.x+=f.face*f.spd*dt;f.walk+=dt*f.spd*.12;barkTick(f,f.x,topAt(f.x),crBark(FOLK_B))}}
function drawFolk(cx,cy){if(!Z.safe||!Z.folk)return;for(const f of Z.folk){if(f.hide||!f.C)continue;const x=ri(f.x-cx),y=ri(topAt(f.x)-cy);if(x<-30||x>W+30)continue;
  const img=f.wait>0?f.C.idleS[Math.floor(S.t*1.6+f.x)%2]:f.C.runS[Math.floor(f.walk)%6];g.fillStyle='rgba(0,0,0,.3)';g.fillRect(x-6,y,12,1);g.save();g.translate(x,0);if(f.face<0)g.scale(-1,1);g.drawImage(img,-24,y-39);g.restore();
  if(f.crate){const bx=x-f.face*12-4,by=y-24;g.fillStyle='#000';g.fillRect(bx-1,by-1,10,9);g.fillStyle='#8f5a31';g.fillRect(bx,by,8,7);g.fillStyle='#b8773d';g.fillRect(bx,by,8,1);g.fillStyle='#55331d';g.fillRect(bx+3,by,1,7)}
  if(f.bub)bubble(x,y-38,f.bub.txt)}}
/* lore: readable objects. Survivors, factions and records disagree (Bible ch.2.13). */
const LORE={
  courier:{z:'road',x:560,k:'note',t:'A Courier’s Last Note',txt:'Delivered the Concordance pouch to the north gate at the second bell. The gate-ward said the seal was wrong, then said it was right, then let me through. I keep thinking about how his face changed. Like he had been told to agree.'},
  tally:{z:'outskirts',x:330,k:'book',t:'Logger’s Tally',txt:'Fallen 14, storm-split 6, live 0. Wolves took two mules. The pack came from the north, all at once, like something drove them. Garr says log the facts, not the fear. Fact: they were running from something.'},
  stag:{z:'oak',x:620,k:'stone',t:'Carved Root-Stone',txt:'An old carving: a stag with branches for antlers, standing over a sleeping tree. Beneath, in a newer hand: THE ROOTS HELD THE WEST TOGETHER. WE FORGOT TO HOLD THE ROOTS.'},
  reed:{z:'falls',x:180,k:'stone',t:'Reedfoot Water-Mark',txt:'Notches cut by Reedfoot ferrymen mark the lake’s height each season for two hundred years. The last notch is a hand higher than any before it. Beside it someone scratched a tiny shard.'},
  depot:{z:'bog',x:980,k:'book',t:'Drowned Depot Ledger',txt:'Concordance Depot 9. Received: 40 crates sealed cargo, no manifest, priority seal. Instructions: do not open, do not move, do not record. I am recording it anyway. If the water takes this place I want someone to know what we held.'},
  duty:{z:'tower',x:740,k:'book',t:'Watch Duty Log',txt:'Day 3 of the Gatefall. Beacon cold. Day 9. Beacon cold. Day 400 or so, I stopped counting. Last night it lit. Nobody touched it. It is broadcasting our old route codes, but the destinations are wrong. They point into the Scar.'},
  order:{z:'gate',x:600,k:'note',t:'A Warden’s Last Order',txt:'All patrols: hold the Broken Road. Admit no traffic. Burn the moss. Signed by command seal. I checked the seal three times. It was valid. It was also issued an hour before the first alarm. Who knew to give it?'},
  exorcist:{z:'scar',x:240,k:'book',t:'Exorcist’s Field Notes',txt:'Pattern is invasive, not natural. Marks repeat in sevens. Something is using the Veinway like a door. A naturalist argues the Scar is a wound reacting in pain. We may both be right. A wound is also a door.'},
  witnessA:{z:'town',x:300,k:'note',t:'Testimony: a Merchant',txt:'It was an attack. I saw the towers burn before the bells. Someone opened the trade gates to the enemy. The Merchant Compact will see them hanged, whoever they are.'},
  witnessB:{z:'town',x:1000,k:'note',t:'Testimony: a Warden',txt:'There was no enemy at the gates. The seals opened from inside. We were ordered to stand down and then ordered to hold. Both orders were valid. I followed the second one. Most of my patrol is still on the Broken Road.'},
  witnessC:{z:'stonebridge',x:1120,k:'note',t:'Testimony: a Child',txt:'The lanterns all went out at once and then came back on blue. Mum said that is what happens when the Archive is scared. Then she told me to run and not look back. I looked back.'},
  toll:{z:'stonebridge',x:620,k:'book',t:'Great Bridge Toll Ledger',txt:'Refugees, waived. Medicine, waived. Sealed MossGate cargo, three crates, northbound, paid in full in Lantern Archive scrip. Northbound. Toward the city that just fell. Why would anyone take cargo back in?'},
  annex:{z:'town',x:420,k:'book',t:'Lantern Annex Fragment',txt:'...the seal patterns are kept in three parts so that no single keeper can open a containment. Lector of the Archive, Warden-Captain, and Concordance Chair. Should one keeper be lost, the remaining two may...'},
  innerA:{z:'inner',x:420,k:'stone',t:'Cracked Seal-Stone',txt:'A containment marker of the Warden Orders, split down the middle. The inscription survives on one half: HERE IS HELD WHAT ANSWERS WHEN CALLED. DO NOT CALL.'},
  millJ:{z:'sawmill',x:1240,k:'note',t:'Foreman’s Tally',txt:'Last tally before the wheel stopped: “Forty Warden refugees fed. Captain asks for the west road. Told her the hog is loose on the mill floor. She went anyway, with the wounded first.”'},
  mossA:{z:'mossroot',x:820,k:'stone',t:'The Accord Stone',txt:'Carved in goblin hands and older ones beneath: Take, and leave. Never the last cap. Never the mother-root. The Hollow keeps those who keep this.'},
  reachS:{z:'reach',x:760,k:'stone',t:'Order Boundary Marker',txt:'A Lantern Order marker, freshly re-cut: “Rot advancing roughly a rod a week. Not natural. Fungal stock shows deliberate cultivation.” The handwriting is careful and very afraid.'},
  innerB:{z:'inner',x:1250,k:'book',t:'The Lector’s Seal-Book',txt:'Signed requisitions, all stamped with the Lector’s seal of the Lantern Archive. The newest is dated last week. Lector Aurin was declared dead in the Gatefall. His seal does not seem to have heard.'}};
const LORE_SPR={};
function loreArt(k){return nodeLayer(18,22,L=>{const W0=RAMP.wood,R0=RAMP.rock;
  if(k==='note'){for(let y=6;y<22;y++){sp(L,8,y,W0[2]);sp(L,9,y,W0[3])}for(let y=3;y<13;y++)for(let x=3;x<15;x++){const e=(x===3||x===14||y===3||y===12);sp(L,x,y,e?[200,184,150]:[236,226,196])}
    for(let y=5;y<11;y+=2)for(let x=5;x<13;x++)if(hash(x,y,3)>.25)sp(L,x,y,[110,96,80]);sp(L,8,3,[212,72,58]);sp(L,9,3,[143,42,34])}
  else if(k==='book'){for(let y=14;y<22;y++)for(let x=2;x<16;x++)sp(L,x,y,pick(W0,.4+(y===14?.3:0),x,y));for(let y=9;y<14;y++)for(let x=3;x<15;x++)sp(L,x,y,x===8||x===9?[90,40,40]:y===9?[248,240,220]:[226,214,190]);for(let x=3;x<15;x++)sp(L,x,14,[110,50,50]);sp(L,12,8,[212,72,58]);sp(L,12,7,[212,72,58])}
  else{for(let y=4;y<22;y++)for(let x=3;x<15;x++){const top=y<7&&(x<5+(7-y)||x>12-(7-y));if(top)continue;sp(L,x,y,pick(R0,.55-(x-3)/24+(fbm(x*.4,y*.4,5)-.5)*.3,x,y))}
    for(let y=8;y<19;y+=3)for(let x=5;x<13;x++)if(hash(x,y,8)>.35)sp(L,x,y,R0[1]);for(let x=3;x<15;x++)if(hash(x,1,9)>.5)sp(L,x,6,pick(RAMP.moss,.6,x,6))}})}
function loresIn(){return Object.entries(LORE).filter(([,l])=>l.z===Z.id)}
function nearLore(){for(const[id,l]of loresIn()){const x=l.x+EDGE;if(Math.abs(pl.x-x)<16&&Math.abs(pl.y-topAt(x))<24)return id}return null}
function drawLore(cx,cy){for(const[id,l]of loresIn()){const x=ri(l.x+EDGE-cx);if(x<-20||x>W+20)continue;const y=ri(topAt(l.x+EDGE)-cy);LORE_SPR[l.k]=LORE_SPR[l.k]||loreArt(l.k);g.drawImage(LORE_SPR[l.k],x-9,y-21);
  if(!(pl.lore||{})[id]){const a=.5+Math.sin(S.t*4+l.x)*.5;g.fillStyle=`rgba(255,226,160,${a})`;g.fillRect(x+6,y-24,1,3);g.fillRect(x+5,y-23,3,1)}
  if(S.nearLore===id)ptext('▲ READ',x,y-30+Math.sin(S.t*4),'#f2e6c8')}}
function openLore(id){const l=LORE[id];if(DLG)return;DLG={lore:id};for(const k in inp)inp[k]=0;S.paused=true;$('dlg').hidden=false;$('dlgbg').hidden=false;$('talkbtn').hidden=true;S.tk2='';
  const c=$('dlgpv'),x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#0b1a1c';x.fillRect(0,0,c.width,c.height);LORE_SPR[l.k]=LORE_SPR[l.k]||loreArt(l.k);x.drawImage(LORE_SPR[l.k],0,0,18,22,8,4,c.width-16,c.height-8);
  $('dlgn').textContent=l.t;$('dlgt').textContent=ZONES.find(z=>z.id===l.z).name;const first=!(pl.lore||{})[id];
  $('dlgx').innerHTML=`<p>${l.txt}</p>${first?'<div class="dq"><b>Recorded in your Lore codex</b><span>Investigation practice gained</span></div>':''}`;$('dlga').innerHTML='<button class="btn sm alt" data-a="bye">Close</button>';
  if(first){pl.lore=pl.lore||{};pl.lore[id]=1;gainExp(20+8*pl.lv);dGain('investigation',14);qLore(id);save()}}
function loreHTML(){const all=Object.keys(LORE),got=all.filter(k=>(pl.lore||{})[k]);return`<div class="qh">Lore · ${got.length}/${all.length}</div>`+(got.length?got.map(k=>`<button class="qi${S.qsel==='lore:'+k?' sel':''}" data-q="lore:${k}"><b>${LORE[k].t}</b><span>${ZONES.find(z=>z.id===LORE[k].z).name}</span></button>`).join(''):'<div class="note">Look for notes, ledgers and carved stones with a glint above them.</div>')}
