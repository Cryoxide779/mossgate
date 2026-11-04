function headgear(P,Rc,A,b,wv){const g=A.head;if(!g)return;const fem=A.sex===1,h=A.hr,hl=A.hrL,G=A.hg||['#9a7a52','#6e5536','#c4a474','#f2e6c8','#d4483a'];
  if(g==='kasa'){const c=A.hat,dk=mixC(c,'#000000',.35),lt=mixC(c,'#ffffff',.3);Rc(15,7+b,19,2,c);Rc(18,6+b,13,1,c);Rc(21,5+b,7,1,c);Rc(23,4+b,3,1,lt);Rc(15,9+b,19,1,dk);[[19,7],[24,6],[29,7]].forEach(([x,y])=>P(x,y+b,dk));Rc(20,6+b,4,1,lt);
    if(fem){const v=mixC(c,'#ffffff',.6);for(let y=10;y<=17;y++){if(y%2)P(15,y+b,v);P(16,y+b+(y%2),v);P(32,y+b,v);if(y%2===0)P(33,y+b,v)}P(24,3+b,K.red)}}
  if(g==='mosscap'){Rc(20,6+b,9,4,K.moss);Rc(19,8+b,1,3,K.moss);P(21,10+b,K.moss);P(24,10+b,K.moss);P(28,10+b,K.moss);P(29,8+b,K.moss);Rc(21,6+b,4,1,K.mossL);P(22,7+b,K.cream);P(26,7+b,K.cream);P(24,5+b,K.red);P(23,5+b,K.red);P(25,5+b,K.red);P(24,4+b,'#e8806a');
    if(fem){P(19,7+b,K.cream);P(18,7+b,'#e8a0b4');P(19,6+b,'#e8a0b4');P(20,7+b,'#e8a0b4');P(19,8+b,'#e8a0b4');Rc(18,10+b,1,4,K.mossL)}}
  if(g==='mask'){if(fem){Rc(25,10+b,4,3,K.cream);P(28,13+b,K.cream);P(26,12+b,K.red);P(27,12+b,K.red);P(27,10+b,'#8a8170');P(20,11+b,K.red);P(19,12+b,K.red);P(18,13+b,K.red)}
    else{Rc(25,10+b,4,5,K.cream);P(28,15+b,K.cream);Rc(25,14+b,3,1,'#d9cfb2');P(26,12+b,K.red);P(27,12+b,K.red);P(27,10+b,'#8a8170');P(26,11+b,'#8a8170')}}
  if(g==='hood'){const hc='#221e36',l='#3a3456';Rc(19,6+b,10,11,hc);Rc(24,10+b,4,6,'#0b0910');Rc(16,10+b+wv,3,2,hc);P(15,11+b+wv,hc);Rc(28,7+b,1,4,l);P(22,7+b,l);P(26,12+b,'#f59a4a');P(27,12+b,'#ffd27a');
    if(fem){for(let y=11;y<=18;y++)P(27+(y>15?1:0),y+b,y%2?h:hl);P(26,14+b,mixC(A.sk,'#c2555a',.5))}}
  if(g==='visor'){Rc(20,6+b,9,10,'#33304f');Rc(20,6+b,2,10,'#26233a');Rc(24,12+b,5,1,K.red);P(28,12+b,'#ffb27a');P(21,9+b,K.cream);P(21,14+b,K.cream);[[22,4],[23,5],[24,3],[25,4],[26,5],[27,4]].forEach(([x,y])=>P(x,y+b,x%2?K.moss:K.mossL));Rc(22,5+b,6,1,K.moss);
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
  if(cs==='plate'&&fem){Rc(tx,26+b,tw,3,'#33304f');for(let x=tx+1;x<tr;x+=3)P(x,27+b,'#6a6788');Rc(tx,28+b,tw,1,'#26233a')}
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
  if(cs==='plate'){if(fem){Rc(tx-1,17+b,2,3,'#33304f');Rc(tr,17+b,2,3,'#33304f');P(tx-1,17+b,K.moss);P(tr+1,17+b,K.moss);P(tr,20+b,'#6a6788');P(tr+1,21+b,'#6a6788');P(tx+3,20+b,'#6a6788')}
    else{Rc(tx-1,17+b,3,4,'#33304f');Rc(tr-1,17+b,3,4,'#33304f');Rc(tx-1,17+b,3,1,K.moss);Rc(tr-1,17+b,3,1,K.moss);P(tx,19+b,K.cream);P(tr,19+b,K.cream)}}
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
