/* ---------- Chapter III set dressing: the Abandoned Sawmill, the Rotting Reach, Mossroot Hollow ---------- */
const hx3=(c)=>Array.isArray(c)?rgb(c):c;
function px3(x){return(a,b,col)=>{x.fillStyle=hx3(col);x.fillRect(a|0,b|0,1,1)}}
Object.assign(PROPS,{
  mill(x,X,Y){const P=px3(x),W=TH.wood,B=TH.bark,S=TH.rock,M=TH.moss;
    // stone footing
    for(let y=0;y<16;y++)for(let k=-74;k<52;k++){const row=y/5|0,mort=y%5===4||((k+80+(row%2)*6)%12===0);P(X+k,Y-y,mort?S[1]:pick(S,.6-(k+74)/126*.35+(fbm(k*.3,y*.4,7)-.5)*.35+(y%5===0?.12:0),X+k,y))}
    // plank walls
    for(let y=16;y<84;y++)for(let k=-70;k<48;k++){const pl=(k+70)%7,gap=pl===6,hole=fbm(k*.08,y*.06,11)>.74&&y>30&&y<74;let t=.55-(k+70)/118*.3+(fbm(k*.9,y*.08,3)-.5)*.35+(pl===0?.12:0);
      P(X+k,Y-y,hole?(y%9===0?W[2]:'#0a0706'):gap?W[1]:pick(W,t,X+k,y))}
    const beam=(x0,y0,x1,y1,wd)=>{const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0),1);for(let i=0;i<=n;i++){const xx=Math.round(x0+(x1-x0)*i/n),yy=Math.round(y0+(y1-y0)*i/n);for(let j=0;j<wd;j++){P(X+xx+(y0===y1?0:j),Y-yy-(y0===y1?j:0),j===0?B[5]:j===wd-1?B[1]:B[3])}}};
    beam(-72,84,50,84,4);beam(-72,52,50,52,3);beam(-72,17,50,17,3);for(const k of[-72,-24,46])beam(k,17,k,84,4);beam(-68,20,-28,50,2);beam(-20,20,40,50,2);
    // windows and door
    for(const[wx,wy]of[[-58,70],[-6,70],[24,40]]){for(let y=0;y<12;y++)for(let k=0;k<10;k++)P(X+wx+k,Y-wy+y,k===0||y===0?'#000':y<3?'#1a120e':'#0c0806');for(let k=-1;k<11;k++)P(X+wx+k,Y-wy+12,B[5]);P(X+wx+11,Y-wy+3,W[3]);for(let y=0;y<11;y++)P(X+wx+11+(y>6?1:0),Y-wy+y,W[2+(y%2)])}
    for(let y=17;y<44;y++)for(let k=-46;k<-30;k++){const ajar=k>=-38;P(X+k+(ajar?3:0),Y-y,k===-46||k===-31||y===43?B[1]:pick(W,.4+(ajar?-.15:0)+((k+46)%4===0?-.2:0),X+k,y))}for(let y=17;y<44;y++)for(let k=-38;k<-35;k++)P(X+k,Y-y,'#060404');P(X-42,Y-30,S[5]);P(X-33,Y-30,S[5]);
    // gable roof with shingles and a torn hole
    for(let y=84;y<126;y++){const hw=Math.round(66*(1-(y-84)/44));for(let k=-hw-6;k<=hw-6;k++){const kk=k+6,row=(y-84)/4|0,edge=Math.abs(kk)>hw-2,hole=Math.hypot(k+28,y-104)<8;if(hole){P(X+k,Y-y,(k+28)%5===0?B[3]:'#0a0706');continue}
      P(X+k-6+6,Y-y,edge?B[1]:pick(TH.bark,.55+((kk+(row%2)*3)%6===0?-.3:0)+(y%4===0?.15:0)+(fbm(k*.2,y*.3,5)-.5)*.3,X+k,y))}}
    for(let k=-72;k<60;k++)P(X+k,Y-84,B[1]);for(let i=0;i<18;i++){const k=-60+Math.floor(hash(i,1,X)*110),y=86+Math.floor(hash(i,2,X)*20);P(X+k,Y-y,pick(M,.6,X+k,y));P(X+k+1,Y-y,pick(M,.4,X+k,y))}
    // chute and waterwheel
    for(let i=0;i<26;i++){const xx=46+i,yy=74-Math.round(i*.35);for(let j=0;j<4;j++)P(X+xx,Y-yy+j,j===0?W[5]:j===3?W[1]:W[3])}
    const wx=X+76,wy=Y-34,R0=30;for(let y=-R0;y<=R0;y++)for(let k=-R0;k<=R0;k++){const r=Math.hypot(k,y),a=Math.atan2(y,k);if(r>R0)continue;
      const rim=r>R0-4,hub=r<5,spoke=Math.abs(((a+Math.PI)*8/(2*Math.PI))%1-.5)>.43&&r<R0-3,pad=r>R0-4&&Math.abs(((a+Math.PI)*16/(2*Math.PI))%1-.5)>.3;
      if(!(rim||hub||spoke||pad))continue;const lt=-.5*k/R0-.6*y/R0;P(wx+k,wy+y,pick(hub?B:W,.4+lt*.45+(pad?.15:0),wx+k,wy+y))}
    for(let y=0;y<4;y++)for(let k=-3;k<4;k++)P(wx+k,wy+y-2,S[4-Math.abs(k)%3]);
    for(let i=0;i<34;i++){const yy=Y-72+i*1.3,xx=X+72+Math.round(Math.sin(i*.6)*1.2);P(xx,yy,i%3?'#6cc4e0':'#bff0ff');if(i%2)P(xx+1,yy,'#3594b6')}
    // sawdust heap
    for(let y=0;y<10;y++){const hw=Math.round(14*(1-y/10));for(let k=-hw;k<=hw;k++)P(X-86+k,Y-y,pick(W,.82-y*.02+(hash(k,y,3)-.5)*.3,X+k,y))}
    Z.glows.push([X-1,Y-64,18,'255,200,120'])},
  logpile(x,X,Y){const P=px3(x),W=TH.wood,B=TH.bark;
    const log=(cx,cy,r)=>{for(let y=-r;y<=r;y++)for(let k=-r-14;k<=0;k++){if(Math.abs(y)>r)continue;P(X+cx+k,Y-cy+y,pick(B,.45-y/r*.35+((k*3+y*7)%11===0?-.25:0),X+k,y))}
      for(let y=-r;y<=r;y++)for(let k=-r;k<=r;k++){const d=Math.hypot(k,y);if(d>r)continue;const ring=d>r-1.2?B[2]:Math.floor(d*1.4)%2?W[5]:W[4];P(X+cx+k,Y-cy+y,d<1?W[3]:ring)}P(X+cx-1,Y-cy-1,W[6])};
    [[-8,4,4],[2,4,4],[12,4,4],[-3,12,4],[7,12,4],[2,20,4]].forEach(([cx,cy,r])=>log(cx,cy,r));for(let k=-24;k<18;k++)P(X+k,Y,B[1])},
  sawblade(x,X,Y){const P=px3(x),W=TH.wood,B=TH.bark;for(let y=0;y<10;y++)for(let k=-9;k<9;k++)P(X+k,Y-y,pick(B,.5-k/24+(y===9?.25:0),X+k,y));for(let k=-9;k<9;k++)P(X+k,Y-10,W[5]);
    const cx=X+2,cy=Y-24,R0=14;for(let y=-R0-2;y<=R0+2;y++)for(let k=-R0-2;k<=R0+2;k++){const r=Math.hypot(k,y),a=Math.atan2(y,k),tooth=((a+Math.PI)*24/(2*Math.PI))%1<.5;if(r>R0+(tooth?2:0)-(tooth?0:0)||r>R0+2)continue;if(r>R0&&!tooth)continue;
      const rust=fbm(k*.3,y*.3,17)>.6;const lt=-.45*k/R0-.55*y/R0;let c=rust?[150,84,40]:r<3?[60,64,70]:r>R0-1?[220,226,232]:lt>.2?[180,188,196]:lt>-.2?[128,136,146]:[86,92,100];if(r<1.5)c=[30,32,36];P(cx+k,cy+y,c)}
    P(cx-6,cy-7,[255,255,255]);P(cx-5,cy-8,[255,255,255])},
  shroom(x,X,Y){const P=px3(x),rot=Z.theme==='rot',h=rot?38:44,cap=rot?[[42,16,30],[74,30,48],[108,46,66],[140,66,84],[176,96,104]]:[[16,50,48],[24,80,72],[36,112,98],[60,150,128],[110,200,170]],
      gl=rot?[200,212,104]:[140,255,220],stem=[[60,50,52],[104,90,88],[150,134,126],[200,186,172],[236,226,212]];
    for(let y=0;y<h-8;y++){const hw=3+(y<4?2:0)+Math.round(Math.sin(y*.2));for(let k=-hw;k<=hw;k++)P(X+k+Math.round(Math.sin(y*.08)*2),Y-y,stem[Math.max(0,Math.min(4,Math.round(3.4-(k+hw)/(2*hw)*3)))])}
    for(let k=-6;k<=6;k++)P(X+k+1,Y-h*.55|0,stem[k<0?3:1]);const cy=Y-h+6,rx=18,ry=11;
    for(let y=-ry;y<=2;y++)for(let k=-rx;k<=rx;k++){const nx=k/rx,ny=y/ry;if(nx*nx+ny*ny>1)continue;const t=2.3-nx*1.3-ny*1.4+(fbm(k*.3,y*.4,5)-.5)*.8;P(X+k+2,cy+y,cap[Math.max(0,Math.min(4,Math.round(t)))])}
    for(let k=-rx+2;k<rx-1;k++){P(X+k+2,cy+3,k%2?[40,24,30]:[24,14,18]);if(k%3===0)P(X+k+2,cy+4,gl)}
    for(const[k,y,s]of[[-8,-6,3],[3,-9,2],[10,-4,2],[-2,-3,1],[-13,-2,1]])for(let a=0;a<s;a++)for(let b2=0;b2<s;b2++)P(X+k+2+a,cy+y+b2,rot?[226,210,176]:gl);
    Z.glows.push([X+2,cy+4,22,rot?'200,212,104':'120,255,210'])},
  burrow(x,X,Y){const P=px3(x),W=TH.wood,S=TH.rock,M=TH.moss,G=TH.grass;
    for(let y=0;y<30;y++){const hw=Math.round(30*Math.sqrt(1-(y/30)**2));for(let k=-hw;k<=hw;k++)P(X+k,Y-y,pick(TH.rockW||S,.45-k/80-y/90+(fbm(k*.2,y*.2,9)-.5)*.4,X+k,y))}
    for(let k=-30;k<=30;k++){const hw=Math.round(30*Math.sqrt(Math.max(0,1-(k/30)**2)));for(let j=0;j<3;j++)P(X+k,Y-hw-j+1,pick(j?G:M,.7-j*.15,X+k,j))}
    for(let y=0;y<18;y++)for(let k=-9;k<=9;k++){const d=Math.hypot(k,y-9);if(y<9&&d>9)continue;const plank=(k+9)%4===3;P(X+k,Y-y,d>8&&y<10?W[1]:plank?W[2]:pick(W,.6-k/30,X+k,y))}
    for(const y of[4,12])for(let k=-8;k<=-2;k++)P(X+k,Y-y,[58,62,70]);P(X+5,Y-8,[226,190,90]);P(X+5,Y-9,[255,236,160]);
    for(let y=0;y<26;y++)P(X+20,Y-y,W[y%3?3:2]);for(let k=17;k<24;k++)P(X+k,Y-26,W[4]);for(let y=27;y<33;y++)for(let k=17;k<23;k++)P(X+k,Y-y,k===17||k===22||y===27||y===32?[40,34,30]:y>29?[255,220,140]:[255,190,90]);
    Z.glows.push([X+20,Y-30,22,'255,200,120']);for(const[k,c]of[[-22,[184,74,66]],[-16,[226,122,106]],[14,[184,74,66]]]){P(X+k,Y-2,[236,226,212]);P(X+k,Y-3,[236,226,212]);for(let a=-2;a<=2;a++)P(X+k+a,Y-4,c);P(X+k,Y-5,c)}},
  rootmass(x,X,Y){const P=px3(x),B=['#120a0e','#22141a','#341e26','#4a2a34','#5e3842','#764a52'];const root=(x0,x1,hgt,th,ph)=>{for(let i=0;i<=60;i++){const t=i/60,xx=x0+(x1-x0)*t,yy=Math.sin(t*Math.PI)*hgt+Math.sin(t*9+ph)*2;
        for(let j=0;j<th;j++)P(X+Math.round(xx),Y-Math.round(yy)-j,B[j===0?1:j===th-1?5:3+((i+j)%3===0?-1:0)])}};
    root(-40,30,34,5,0);root(-26,44,22,4,2);root(-48,-6,16,3,4);root(4,40,40,4,1);
    for(const[k,y]of[[-30,24],[-12,36],[10,40],[28,30],[-36,12]]){for(let a=0;a<5;a++){P(X+k+a,Y-y,a===0?'#c8d468':'#8a5478');P(X+k+a,Y-y+1,'#6a3e5e')}P(X+k+1,Y-y-1,'#c8d468')}
    for(let i=0;i<18;i++){const t=hash(i,3,X),k=-40+Math.round(t*70),yy=Math.round(Math.sin(t*Math.PI)*34);P(X+k,Y-yy-2,'#ff6aa0')}Z.glows.push([X,Y-26,26,'255,90,150'])}});
