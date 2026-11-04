/* ---------- The Marrowbog Laboratory (Bible 22.25: toxins, water, evidence, alchemy, failed experiments) ---------- */
THEMES.lab={ramps:{far:R(['#08100e','#0c1614','#10201c','#162a24','#1c362c','#244436','#2e5442']),
    wall:R(['#0c100f','#131a18','#1a2421','#22302b','#2c3c36','#384a42','#465a50']),
    rock:R(['#0c0f0e','#151a18','#1f2623','#2a332f','#36413c','#45514b','#56625b']),rockW:R(['#0f0f0c','#1a1a14','#26261e','#333328','#424234','#545442','#686852']),
    grass:R(['#1e2a1e','#283826','#34482e','#425a36','#526c40','#66804c']),moss:R(['#16201a','#1e2c22','#28382a','#324634','#3e563e','#4c684a']),
    leaf:R(['#0c120e','#141c16','#1c281e','#243426','#2e422e','#3a5238','#486444','#587852']),
    water:R(['#0e1a08','#16280c','#203a10','#2e5214','#447018','#68962a','#9cc84a','#d4f080'])},
  mid:'ruins',canopy:'chains',fog:'rgba(40,70,20,.26)',fog2:'rgba(50,90,24,.12)',ray:'190,255,120',rayA:.5,amb:'mote',vig:'2,10,4',glow:.55,noFern:1};
THEMES.vat={...THEMES.lab,ramps:{...THEMES.lab.ramps,wall:R(['#070a09','#0c110f','#121915','#18221d','#1f2b25','#28362f','#32423a'])},fog:'rgba(24,46,14,.34)',vig:'0,8,2'};
WX.lab=['clear','clear'];WX.vats=['clear'];
/* creatures */
Object.assign(MOBS,{
  vatslime:{name:'Vat Spill',kind:'slime',ai:'slime',hp:190,atk:24,exp:44,w:18,h:12,spd:18,shard:[7,13],aggro:80,tox:1},
  plaguerat:{name:'Marrow Rat',kind:'quad',ai:'lunger',hp:120,atk:20,exp:36,w:20,h:10,spd:54,shard:[5,10],aggro:130},
  stitched:{name:'Stitched Subject',kind:'gen',ai:'lunger',hp:300,atk:30,exp:64,w:16,h:30,spd:26,shard:[10,18],aggro:130},
  subject9:{name:'Subject Nine',kind:'quad',ai:'lunger',elite:1,bb:1,hp:3200,atk:40,exp:1500,w:44,h:34,spd:24,shard:[90,140],aggro:200,resp:90,tox:1}});
Object.assign(GEAR,{
  vatslime:{set:'Vat Spill',drop:.13,pal:['#4a7a1a','#2a4a10','#8cc23a','#e8ffb0','#9ab4c0'],head:{n:'Spill-Glass Goggles',s:'goggles'},chest:{n:'Sealed Apron',s:'leather'},hands:{n:'Acid Gloves'},feet:{n:'Drainwalk Boots'},
    charm:{n:'Stoppered Vial',s:'gel'},weap:{katana:'Etched Blade',daggers:'Scalpel Pair',bow:'Pipette Bow',staff:'Stirring Rod',tome:'Reagent Index',axe:'Vat Cleaver',hammer:'Pestle Maul',spear:'Drip Lance',shield:'Splash Guard'}},
  plaguerat:{set:'Marrow Rat',drop:.13,pal:['#5a4e44','#2a2420','#7e7062','#d4483a','#c8d468'],head:{n:'Ratskin Hood',s:'hood'},chest:{n:'Patched Hide Vest',s:'pelt'},hands:{n:'Gnawed Wraps'},feet:{n:'Sewer Treads'},
    charm:{n:'Rat-Tooth Charm',s:'fang'},weap:{katana:'Gnawblade',daggers:'Incisor Pair',bow:'Tailstring Bow',staff:'Burrow Staff',tome:'Pest Ledger',axe:'Gnaw Axe',hammer:'Sewer Maul',spear:'Ratcatcher Pike',shield:'Lid Shield'}},
  stitched:{set:'Stitched Subject',drop:.13,pal:['#5e6a5a','#3a4238','#86927e','#c84a3a','#8cc23a'],head:{n:'Surgeon’s Mask',s:'mask'},chest:{n:'Stitched Smock',s:'wraps'},hands:{n:'Sutured Gauntlets'},feet:{n:'Restraint Boots'},
    charm:{n:'Specimen Tag',s:'sigil'},weap:{katana:'Bonesaw Blade',daggers:'Suture Needles',bow:'Sinew Bow',staff:'Drip Stand',tome:'Case Notes',axe:'Amputation Axe',hammer:'Mallet of Subjects',spear:'Probe Lance',shield:'Gurney Shield'}},
  subject9:{set:'Subject Nine',drop:1,drops:2,pal:['#8a7278','#4a3a40','#b8a0a2','#c8f070','#a8b0b8'],head:{n:'Vat Nine Visor',s:'visor'},chest:{n:'Chimera Hide Plate',s:'plate'},hands:{n:'Grafted Talons'},feet:{n:'Brace-Iron Greaves'},
    charm:{n:'Heart in a Jar',s:'core'},weap:{katana:'Chimera Fang',daggers:'Grafted Claws',bow:'Tendon Bow',staff:'Vat Nine Conduit',tome:'Varn’s Last Folio',axe:'Graft Splitter',hammer:'Vat Breaker',spear:'Tube Lance',shield:'Vat Lid Bulwark'}}});
for(const k of['vatslime','plaguerat','stitched','subject9']){const W=GEAR[k].weap;for(const w of Object.keys(WPN))if(!W[w])W[w]=GEAR[k].set+' '+WEAP_N[w]}
SLIME_S.vatslime={body:R(['#16300a','#2a5010','#467a18','#6aa628','#9cd040']),top:null,deco:'glass'};
const RATQ={cw:36,ch:20,cx:15,len:16,bh:7,leg:3,lw:2,c:['#2a2420','#5a4e44','#7e7062','#3e342c','#ff4a3a'],head:'none',tail:'long',extra:(P,Rc,o)=>{
  const hx=Math.round(o.cx+o.L/2-2),hy=o.cy-1+(o.mode==='wind'?1:0),open=o.mode==='lunge';
  Rc(hx,hy-3,5,5,'#5a4e44');Rc(hx,hy-3,5,1,'#7e7062');for(let i=0;i<5;i++)Rc(hx+4+i,hy-2+Math.floor(i/2),1,Math.max(1,3-Math.floor(i/2)),i<2?'#5a4e44':'#7e7062');P(hx+9,hy,'#e89a9a');P(hx+9,hy+1,'#c86a6a');
  P(hx+1,hy-4,'#7e7062');P(hx+1,hy-5,'#c88a8a');P(hx+2,hy-5,'#c88a8a');P(hx+2,hy-4,'#7e7062');P(hx+4,hy-2,'#ff4a3a');P(hx+4,hy-3,'#ffc0a0');
  if(open){P(hx+7,hy+2,'#efe4c8');P(hx+8,hy+2,'#efe4c8')}P(hx+10,hy-1,'#9a8e80');P(hx+10,hy+1,'#9a8e80');P(hx+11,hy-2,'#9a8e80');
  for(const[dx,dy]of[[-5,-2],[-1,-3],[3,-1]]){P(o.cx+dx,o.cy+dy,'#8cc23a');P(o.cx+dx+1,o.cy+dy,'#c8f070')}}};
const NINEQ={cw:78,ch:62,cx:33,len:42,bh:19,leg:12,lw:5,c:['#2a1e24','#8a7278','#b8a0a2','#5a4048','#d8ff70'],head:'bear',tail:'long',extra:(P,Rc,o)=>{
  /* glass vat strapped to the back, tubes into the spine, stitches, vestigial second head, leg braces */
  const vx=o.cx-11,vy=o.cy-o.bh/2-22,vw=18,vh=23;
  for(let y=0;y<vh;y++)for(let x=0;x<vw;x++){const edge=x===0||x===vw-1,cap=y<2;const lvl=y>5;let col=cap?'#7e868e':edge?'#b8d8e0':lvl?((x+y)%7===0?'#e8ffb0':y>13?'#467a18':'#6aa628'):'#1a2a2a';if(!cap&&x===2)col='#e0f4f8';P(vx+x,vy+y,col)}
  for(const[bx,by]of[[5,9],[9,12],[11,8],[6,14]])P(vx+bx,vy+by,'#f4ffd0');Rc(vx-1,vy+vh,vw+2,2,'#4a5058');Rc(vx+3,vy+5,2,2,'#2a3a2e');P(vx+4,vy+4,'#2a3a2e');
  for(let i=0;i<9;i++){P(vx+vw+i,vy+6+Math.round(i*.9),'#8a9aa2');P(vx+vw+i,vy+7+Math.round(i*.9),'#4a5058')}for(let i=0;i<7;i++){P(vx-1-i,vy+10+i,'#8a9aa2');P(vx-1-i,vy+11+i,'#4a5058')}
  for(let x=Math.floor(o.cx-o.L/2+6);x<o.cx+o.L/2-6;x+=1)if(x%3!==0)P(x,o.cy+1,'#2a1a1a');for(let x=Math.floor(o.cx-o.L/2+6);x<o.cx+o.L/2-6;x+=3){P(x,o.cy,'#c8b8a0');P(x,o.cy+2,'#c8b8a0')}
  for(let y=-6;y<6;y++)if(y%2===0){P(o.cx+8,o.cy+y,'#2a1a1a');P(o.cx+7,o.cy+y,'#c8b8a0');P(o.cx+9,o.cy+y,'#c8b8a0')}
  const sx=o.cx+12,sy=o.cy-o.bh/2-4;Rc(sx,sy,6,5,'#8a7278');Rc(sx,sy,6,1,'#b8a0a2');P(sx+4,sy+2,'#d8ff70');P(sx+2,sy+2,'#d8ff70');P(sx+5,sy+4,'#efe4c8');P(sx+3,sy-1,'#5a4048');for(const[bx2,by2]of[[-12,-3],[-4,4],[6,-5],[14,2]]){P(o.cx+bx2,o.cy+by2,'#6a4a7a');P(o.cx+bx2+1,o.cy+by2,'#8a5a9a');P(o.cx+bx2,o.cy+by2+1,'#4a3458')}
  for(const lx of[o.bx+1,o.fx+3])for(let k=0;k<3;k++)Rc(lx-1,o.g-5-k*3,7,1,'#8a9aa2');
  for(let i=0;i<6;i++)P(o.cx+o.L/2+6+i,o.cy+4+Math.round(Math.sin(i)*1),i%2?'#c8f070':'#8cc23a')}};
QUAD.plaguerat=RATQ;QUAD.subject9=NINEQ;
function stitchedFrame(mode,flash){return sprite(36,40,(P,Rc)=>{const g=38,cx=16,b=mode==='walk1'?1:0,sw=mode==='walk0'?1:mode==='walk1'?-1:0,cr=mode==='wind'?2:0,lun=mode==='lunge'?3:0;
  const sk='#5e6a5a',skd='#3a4238',skl='#86927e',st='#c8b8a0',ap='#6a5a42',apd='#4a3e2c',tank='#b8d8e0',fl='#6aa628',flg='#c8f070',eye='#e8ffb0';
  const line=(x0,y0,x1,y1,w,col)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++)Rc(Math.round(x0+(x1-x0)*i/n)-(w>>1),Math.round(y0+(y1-y0)*i/n),w,1,col)};
  line(cx-2,26+cr,cx-4+sw*2,g,3,skd);line(cx+3,26+cr,cx+5-sw*2,g,3,sk);Rc(cx-6+sw*2,g-1,5,2,'#2a2420');Rc(cx+3-sw*2,g-1,5,2,'#2a2420');Rc(cx-5+sw*2,g-5,4,1,'#8a9aa2');
  /* tank on the back */const tx=cx-11,ty=9+cr+b;for(let y=0;y<14;y++)for(let x=0;x<7;x++){const e=x===0||x===6||y===0||y===13;P(tx+x,ty+y,e?tank:y<4?'#1a2a2a':((x+y)%5===0?flg:fl))}P(tx+3,ty+6,'#f4ffd0');P(tx+2,ty+10,'#f4ffd0');Rc(tx+2,ty-2,3,2,'#7e868e');
  for(let i=0;i<6;i++)P(tx+7+i,ty+3+Math.round(i*.5),'#8a9aa2');
  /* hunched torso */for(let y=12+cr;y<28+cr;y++){const hw=Math.round(5+Math.sin((y-12)/16*Math.PI)*2),sh=Math.round((28+cr-y)*.15)+lun;for(let x=cx-hw+sh;x<=cx+hw+sh;x++)P(x,y+b,x<cx-hw+sh+2?skd:x>cx+hw+sh-2?skl:sk)}
  for(let y=18+cr;y<28+cr;y++)Rc(cx-4+lun,y+b,9,1,y%3?ap:apd);for(let y=13;y<25;y+=2){P(cx+1+lun,y+b+cr,'#2a1a1a');P(cx+lun,y+b+cr,st);P(cx+2+lun,y+b+cr,st)}
  /* head, low and forward */const hx=cx+3+lun,hy=6+cr+b;Rc(hx,hy,7,7,sk);Rc(hx,hy,7,1,skl);Rc(hx,hy+3,7,1,'#2a1a1a');for(let x=hx;x<hx+7;x+=2)P(x,hy+2,st);P(hx+5,hy+4,eye);P(hx+3,hy+4,'#ff4a3a');Rc(hx+4,hy+6,3,1,'#2a1a1a');P(hx+5,hy+6,'#efe4c8');
  /* arms: one normal, one graft-claw */let a1,a2;if(mode==='wind'){a1=[cx-8,4];a2=[cx+12,2]}else if(lun){a1=[cx+6,22];a2=[cx+22,16]}else{a1=[cx-6,27+sw];a2=[cx+11,28-sw]}
  line(cx-3+lun,14+b+cr,a1[0],a1[1],2,skd);line(cx+5+lun,14+b+cr,a2[0],a2[1],4,'#4a5e48');Rc(a2[0]-2,a2[1],5,2,'#2a3a2e');for(const d of[-2,0,2]){P(a2[0]+d,a2[1]+2,'#efe4c8');P(a2[0]+d,a2[1]+3,'#c8b8a0')}
  for(let k=0;k<3;k++)Rc(Math.round((cx+5+lun+a2[0])/2)-2,Math.round((14+b+cr+a2[1])/2)-2+k*2,5,1,'#8a9aa2');
  if(lun)for(let i=0;i<7;i++)P(cx+14+i,10+i,i%2?flg:fl)},flash)}
const _br=buildRoster;buildRoster=function(){_br();const o={kind:'gen',ax:16,ay:38,fps:4},F={};for(const md of['walk0','walk1','wind','lunge']){o[md]=stitchedFrame(md);F[md]=stitchedFrame(md,1)}o.F=F;MSP.stitched=o};
/* props */
Object.assign(PROPS,{
  vat(x,X,Y,v){const P=px3(x),M=IRONC,G=R(['#0e1e0a','#1a3410','#2c5216','#447a1e','#6aa628','#9cd040','#d4f080']);
    for(let y=0;y<8;y++)for(let k=-16;k<=16;k++)P(X+k,Y-y,y===7?M[3]:pick(R(M),.55-(k+16)/80,X+k,y));
    for(let y=8;y<64;y++)for(let k=-13;k<=13;k++){const e=Math.abs(k)>=12,lvl=y<54;let col=e?[184,216,224]:lvl?pick(G,.4+(y-8)/120+(hash(k,y,X)-.5)*.2+(k<-6?.15:0),X+k,y):[22,34,34];if(!e&&k===-9)col=[224,244,248];P(X+k,Y-y,col)}
    if(v!==1){for(let y=18;y<46;y++){const w=y<26?3:y<40?5:3;for(let k=-w;k<=w;k++)P(X+k+1,Y-y,y<26?[46,70,40]:[38,60,34])}P(X,Y-23,[200,255,120]);P(X+2,Y-23,[200,255,120])}
    for(let i=0;i<12;i++){const k=-10+Math.floor(hash(i,1,X)*20),y=10+Math.floor(hash(i,2,X)*40);P(X+k,Y-y,[230,255,190])}
    for(let y=64;y<72;y++)for(let k=-15;k<=15;k++)P(X+k,Y-y,y===64?M[1]:pick(R(M),.6-(k+15)/70,X+k,y));for(let y=72;y<150;y++){P(X-2,Y-y,M[2]);P(X-1,Y-y,M[3]);P(X,Y-y,M[1])}
    for(let k=-14;k<14;k+=7){P(X+k,Y-66,[200,80,60]);P(X+k+1,Y-66,[255,140,90])}Z.glows.push([X,Y-34,30,'150,230,90'])},
  labbench(x,X,Y){const P=px3(x),W=TH.wood||RAMP.wood;for(let k=-26;k<=26;k++){P(X+k,Y-20,pick(W,.75,X+k,1));P(X+k,Y-19,pick(W,.55,X+k,2));P(X+k,Y-18,W[1])}
    for(const k of[-24,22])for(let y=0;y<18;y++){P(X+k,Y-y,pick(W,.5,X,y));P(X+k+1,Y-y,W[1])}for(let k=-23;k<=22;k++)P(X+k,Y-6,W[2]);
    for(const[k,h,c]of[[-20,8,[150,230,90]],[-14,6,[220,90,70]],[-8,10,[120,190,230]],[-1,7,[230,200,90]],[12,9,[180,120,230]]]){for(let y=0;y<h;y++){const w=y<h-3?2:1;for(let j=-w;j<=w;j++)P(X+k+j,Y-21-y,y<h*.6?c:[200,220,226])}P(X+k,Y-21-h,[110,90,70])}
    for(let y=0;y<3;y++)for(let k=2;k<9;k++)P(X+k,Y-21-y,y===2?[240,230,200]:[214,200,170]);for(let k=3;k<8;k++)P(X+k,Y-22,[90,80,70]);Z.glows.push([X-8,Y-26,14,'150,220,255'])},
  pipes(x,X,Y){const P=px3(x),M=IRONC;for(let y=0;y<140;y++)for(let j=0;j<4;j++){P(X-14+j,Y-y,M[j<1?1:j<3?2:3]);P(X+10+j,Y-y,M[j<1?1:j<3?2:3])}
    for(let k=-14;k<=14;k++)for(let j=0;j<4;j++)P(X+k,Y-60-j,M[j<1?3:j<3?2:1]);for(const[a,b]of[[-12,60],[12,60],[-12,110],[12,30]]){for(let y=-3;y<=3;y++)for(let k=-3;k<=3;k++)if(Math.abs(k)+Math.abs(y)<5)P(X+a+k,Y-b-y,[160,60,50])}
    for(let i=0;i<5;i++)P(X-1,Y-56+i*4,[150,230,90]);for(let k=-6;k<=6;k++)P(X+k,Y-1,[90,140,40])},
  cage(x,X,Y){const P=px3(x),M=IRONC;for(let k=-14;k<=14;k+=4)for(let y=0;y<34;y++)P(X+k,Y-y,M[k<0?2:1]);for(const y of[0,17,34])for(let k=-15;k<=15;k++)P(X+k,Y-y,M[3]);
    for(const[k,y]of[[-6,2],[-4,3],[-2,2],[2,2],[4,4],[6,2]])P(X+k,Y-y,[220,210,180]);for(let k=-3;k<=3;k++)P(X+k,Y-5,[200,190,160]);P(X,Y-7,[220,210,180]);P(X-1,Y-8,[220,210,180]);P(X+1,Y-8,[220,210,180])},
  tbarrel(x,X,Y){const P=px3(x);for(const o of[-9,8])for(let y=0;y<20;y++){const w=y<2||y>17?6:7;for(let k=-w;k<=w;k++){const band=y===5||y===14;P(X+o+k,Y-y,band?[200,170,40]:pick(R(['#1a2418','#2a3a26','#3e5236','#526a46']),.6-(k+w)/(3*w),X+k,y))}}
    for(const o of[-9,8]){P(X+o,Y-9,[230,220,90]);P(X+o-1,Y-10,[230,220,90]);P(X+o+1,Y-10,[230,220,90])}for(let k=-16;k<=16;k++)if(hash(k,1,X)>.3)P(X+k,Y-1,[110,180,40]);for(let y=0;y<6;y++)P(X+1,Y-20+y,[150,230,90]);Z.glows.push([X,Y-4,16,'150,230,90'])}});
/* zones */
const BOGI=zIdx('bog'),LABI=ZONES.length,VATI=LABI+1;
{const L={id:'lab',name:'Marrowbog Laboratory',ch:'Ashveil Reach',theme:'lab',lv:[7,8],req:6,ww:1700,start:70,
  seg:[[0,300,250],[300,260,296,'bed'],[560,320,250],[880,140,236],[1020,240,296,'bed'],[1260,440,250],[330,70,236,'plank'],[450,70,232,'plank'],[640,90,200,'f'],[900,80,196,'f'],[1050,70,236,'plank'],[1160,70,232,'plank'],[1320,90,204,'f'],[1500,90,190,'f'],[315,18,272,'stone'],[540,18,272,'stone'],[1035,18,272,'stone'],[1240,18,272,'stone']],
  pools:[{x0:300,x1:560,y:268},{x0:1020,x1:1260,y:268}],
  mobs:[['plaguerat',0,180],['vatslime',2,640],['stitched',2,820],['plaguerat',2,700],['plaguerat',3,940],['vatslime',5,1320],['stitched',5,1480],['plaguerat',5,1620],['stitched',8,670]],
  portals:[{x:22,to:BOGI,tx:1430},{x:1678,to:VATI,tx:60}],
  labels:[[740,'Records Hall',56],[1420,'Vat Ward',86]],
  props:[['tbarrel',120],['pipes',236],['vat',600],['labbench',740],['vat',870,1],['cage',960],['pipes',1290],['vat',1420],['labbench',1560],['tbarrel',1640]],trees:[]};
 const V={id:'vats',name:'Vat Nine',ch:'Ashveil Reach',theme:'vat',lv:[9,9],req:8,ww:1100,start:60,
  seg:[[0,1100,250],[280,90,204,'f'],[700,90,204,'f']],mobs:[['subject9',0,820],['vatslime',0,420]],portals:[{x:22,to:LABI,tx:1630}],
  labels:[[560,'Vat Nine',100]],props:[['pipes',130],['vat',240,1],['vat',420],['tbarrel',540],['vat',660,1],['cage',980]],trees:[]};
 prepZone(L);prepZone(V);L.nodes=[];V.nodes=[];L.stations=[];V.stations=[];ZONES.push(L,V);
 const B=ZONES[BOGI];B.portals.push({x:1470+EDGE,to:LABI,tx:60+EDGE});(B.labels=B.labels||[]).push([1470+EDGE,'Laboratory',78]);B.npcs.push('mirelle')}
MAPXY.lab=[70,66];MAPXY.vats=[80,60];WAYS.lab=150;
/* the assistant who got out */
NPCS.mirelle={name:'Mirelle Varn',title:'Former laboratory assistant',x:1400+EDGE,cls:'weaver',look:{sex:1,build:0,face:4,hair:2,hairC:7,beard:0,skin:1,eye:1,outfit:5},eq:{head:'vatslime',chest:'w_start'},
  lines:['I washed the glassware. That is all I did. That is what I keep telling myself.','My father ran that place. The Concordance paid. Nobody asked what was in the vats.','If you go in, do not breathe the green and do not wade in it.']};
BARKS.mirelle=['Do not go in there.','Nine. It was always nine.','Mind the green water.'];
Object.assign(LORE,{
  labA:{z:'lab',x:250,k:'note',t:'Intake Log',txt:'“Subjects received from the Concordance: four, from the Gatefall road. Condition: frightened, unharmed. Assigned vats one through four. Payment received in full.” The last line is underlined twice.'},
  labB:{z:'lab',x:760,k:'book',t:'Dr. Varn’s Notes',txt:'“Shardstone dissolved in marrow-water makes a living thing remember being something else. The rats take it well. The subjects do not. Nine is different. Nine wants to be bigger.”'},
  labC:{z:'lab',x:1580,k:'note',t:'Pressure Report',txt:'“Vat Nine has cracked its glass twice. Sealed with iron bands. Feeding increased. Mirelle refuses to go into the ward. I have told her it is only a big animal now.”'},
  labD:{z:'vats',x:180,k:'book',t:'Final Entry',txt:'“The Charter will want this. The Concordance will pay more. Whoever reads this: the formula is in the folio on my desk. Burn it, or sell it. I could not decide. That is why Nine is loose.”'}});
RECIPES.push({id:'antitoxin',d:'alchemy',r:1,n:'Marrow Antitoxin',use:'antitox',flag:'mirelle',need:{herb:2,mush:1},desc:'Mirelle’s antidote. For 5 minutes the laboratory’s green water cannot hurt you.'});
BUFF_N.antitox='Marrow Antitoxin';USE_D.antitox='Toxic water is harmless for 5 minutes.';
Object.assign(QUESTS,{
  lb1:{title:'Lights in the Bog',giver:'mirelle',lv:6,
    offer:'There is a laboratory under the east end of the bog. My father built it. He is dead now, I think, and something in there is still alive. I need to know what happened after I ran. Find his records. Three of them, at least.',
    desc:'Read three records inside the Marrowbog Laboratory.',goal:{t:'event',id:'labrec',n:3,lab:'Laboratory records read'},where:'Marrowbog Laboratory, east end of Marrowbog',
    prog:'Look for logs and notebooks among the benches.',done:'Four subjects from the Gatefall road. Paid for. And Nine. I knew. I washed the glass and I knew. Let me make you something before you go deeper.',reward:{exp:700,sh:50,fl:{mirelle:1}}},
  lb2:{title:'Breathe Easy',giver:'mirelle',pre:'lb1',
    offer:'The green water eats through boots. I used to brew an antidote for the staff. Herbs and dark mushrooms at any alchemy rack. Make one Marrow Antitoxin so you can cross the ward.',
    desc:'Brew a Marrow Antitoxin at an alchemy rack.',goal:{t:'event',id:'antitox',n:1,lab:'Brew a Marrow Antitoxin'},where:'Any alchemy rack',
    prog:'Two herbs and a dark mushroom.',done:'You brew cleaner than he did. Drink it before you wade, not after.',reward:{exp:400,sh:30,pots:2}},
  lb3:{title:'Subject Nine',giver:'mirelle',pre:'lb2',lv:8,
    offer:'Nine is in the last chamber. It was a bear once, I think, before the vats. It is not a bear now. It is hungry and it is in pain. End it, please.',
    desc:'Put an end to Subject Nine in the Vat Nine chamber.',goal:{t:'kill',mob:'subject9',n:1,lab:'Subject Nine laid to rest'},where:'Vat Nine, through the Marrowbog Laboratory',
    prog:'Through the Vat Ward, past the last door.',done:'It is quiet. For the first time since I was twelve, that place is quiet. There is one more thing.',reward:{exp:1600,sh:120,sp:1}},
  lb4:{title:'The Varn Folio',giver:'mirelle',pre:'lb3',
    offer:'His folio. The formula. The Charter wants it to understand what the Concordance paid for. The Concordance wants it back. I want it gone. You found it. You choose.',
    desc:'Decide what happens to Dr. Varn’s formula.',goal:{t:'talk',npc:'mirelle'},where:'Mirelle, at the laboratory door',
    prog:'Tell Mirelle what you decided.',done:'Then that is what it is. Thank you for going in where I could not.',
    choices:[{n:'Give it to the Charter',d:'Captain Holt’s people will use it as evidence against the Concordance.',flag:'folio_charter',reward:{sh:220,item:['subject9','charm',2]}},
      {n:'Burn it with Mirelle',d:'Nobody makes another Nine. Mirelle sleeps tonight.',flag:'folio_burned',reward:{exp:1400}},
      {n:'Keep the alchemy notes',d:'Tear out the dangerous pages and keep the useful ones. Unlocks Varn’s Restorative.',flag:'folio_kept',reward:{fl:{varn:1}}}],reward:{exp:900}}});

RECIPES.push({id:'varnrest',d:'alchemy',r:2,n:'Varn’s Restorative ×3',use:'pots3',flag:'varn',need:{herb:3,mush:2,shard:1},desc:'The one good thing in the folio. Three tonics from a single brew.'});
/* hooks: lore counting, antitoxin, toxic water, Nine's second phase */
const LAB_REC=['labA','labB','labC','labD'];
const _ol=openLore;openLore=function(id){const r=_ol(id);if(LAB_REC.includes(id)){pl.lore=pl.lore||{};pl.lore[id]=pl.lore[id]||1;const n=LAB_REC.filter(k=>pl.lore[k]).length,st=qSt('lb1');if(st&&st.s==='a'&&st.n<n){st.n=Math.min(3,n);qProgress('lb1','Record')}}return r};
const _dcl=doCraft;doCraft=function(R0){const had=hasMats(R0)&&rcpOk(R0);const r=_dcl(R0);if(had&&R0.id==='antitoxin'){pl.buffs=pl.buffs||{};pl.buffs.antitox=300;recalc();qEvent('antitox')}return r};
function labTick(dt){if(Z.id!=='lab'&&Z.id!=='vats')return;
  for(const P0 of Z.pools){if(pl.x>P0.x0&&pl.x<P0.x1&&pl.y>P0.y+2&&!pl.dead){S.toxT=(S.toxT||0)+dt;if(S.toxT>.5){S.toxT=0;if(pl.buffs&&pl.buffs.antitox>0){if(!S.toxSaid){S.toxSaid=1;S.nums.push({x:pl.x,y:pl.y-40,txt:'ANTITOXIN HOLDS',t:0,c:'#c8f070'})}}
      else{const d=Math.max(2,Math.round(pl.mhp*.06));pl.hp-=d;S.nums.push({x:pl.x,y:pl.y-34,txt:'-'+d+' TOXIC',t:0,c:'#9cd040'});if(pl.hp<=0){pl.hp=0;pl.dead=true;downOrDie();conDeath()}}}
      if(Math.random()<dt*12)S.parts.push({x:pl.x+rnd(-6,6),y:P0.y,vx:rnd(-10,10),vy:rnd(-40,-10),t:0,life:.6,c:'#9cd040',g:-20,s:1})}}
  if(Z.id==='vats')for(const m of S.mobs){if(m.t!=='subject9'||m.dead){if(m.t==='subject9'&&m.dead)m.ph2=0;continue}
    if(!m.ph2&&m.hp<m.mhp*.5){m.ph2=1;banner('Subject Nine','The vat on its back splits open');for(let i=0;i<2;i++){const a=spawnMob(['vatslime',0,m.x+(i?-60:60)],Z.lv[1]);a.temp=1;a.aggro=9;S.mobs.push(a)}for(let i=0;i<30;i++)S.parts.push({x:m.x,y:m.y-40,vx:rnd(-120,120),vy:rnd(-160,-40),t:0,life:1,c:i%2?'#9cd040':'#e8ffb0',g:300,s:1});tone(110,.6,'sawtooth',.06,-60)}
    if(m.ph2&&m.aggro>0){m.spitT=(m.spitT||3)-dt;if(m.spitT<=0){m.spitT=2.6;const dir=Math.sign(pl.x-m.x)||1,a=Math.atan2(pl.y-14-(m.y-26),pl.x-(m.x+dir*24));for(const da of[-.12,0,.12])S.eproj.push({x:m.x+dir*24,y:m.y-26,vx:Math.cos(a+da)*130,vy:Math.sin(a+da)*130,t:0,dmg:m.atk*.6*lvHurt(m)});tone(180,.2,'sawtooth',.04,-80)}}}}
function drawLab(cx,cy){if(Z.id!=='lab'&&Z.id!=='vats')return;for(const P0 of Z.pools){const x0=ri(P0.x0-cx),y=ri(P0.y-cy);if(x0>W||x0+(P0.x1-P0.x0)<0)continue;for(let i=0;i<4;i++){const bx=x0+ri(((S.t*13+i*67)%1)*(P0.x1-P0.x0)),by=y-ri(((S.t*.7+i*.3)%1)*4);g.fillStyle='rgba(212,240,128,.7)';g.fillRect(bx,by,1,1)}}}
