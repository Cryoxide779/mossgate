,
  house(x,X,Y,v){v=v|0;const w=TH.wood.map(rgb),s=TH.rock.map(rgb),Rr=rr(x),PL=[['#d9c9a0','#b8a47c','#efe2c0'],['#c9b48e','#a08a66','#e0d0aa'],['#cdbf9e','#a89a78','#e6dcc0']][v%3],
    RF=[['#3a1814','#52221a','#6c2e20','#8a3c26'],['#1e2a24','#2c3e32','#3c5240','#506a50'],['#2a1e30','#3c2a40','#523a52','#6a4c66']][v%3];
    Rr(X+20,Y-88,9,30,s[2]);Rr(X+20,Y-88,3,30,s[4]);Rr(X+19,Y-90,11,3,s[3]);
    Rr(X-44,Y-50,88,40,PL[0]);for(let i=0;i<60;i++)Rr(X-44+Math.floor(hash(i,1,X)*86),Y-50+Math.floor(hash(i,2,X)*38),2,1,hash(i,3,X)>.5?PL[1]:PL[2]);
    Rr(X-44,Y-50,88,3,PL[1]);
    [X-46,X-16,X+13,X+42].forEach(px=>{Rr(px,Y-50,4,40,w[2]);Rr(px,Y-50,1,40,w[4])});Rr(X-46,Y-32,92,3,w[2]);Rr(X-46,Y-32,92,1,w[4]);Rr(X-46,Y-52,92,3,w[1]);
    for(let k=0;k<17;k++){Rr(X-42+k,Y-49+k,2,1,w[2]);Rr(X+40-k,Y-49+k,2,1,w[2])}
    Rr(X-7,Y-30,14,20,w[0]);Rr(X-6,Y-29,12,19,w[2]);for(let px=X-6;px<X+6;px+=3)Rr(px,Y-29,1,19,w[1]);Rr(X-8,Y-31,16,2,w[4]);Rr(X+3,Y-20,2,2,'#e3b04b');
    [[X-36],[X+22]].forEach(([px])=>{Rr(px,Y-44,14,10,w[1]);Rr(px+1,Y-43,12,8,'#ffb24a');Rr(px+2,Y-42,10,3,'#ffe2a0');Rr(px+7,Y-43,1,8,w[1]);Rr(px+1,Y-39,12,1,w[1]);Rr(px-1,Y-34,16,2,w[3]);Z.glows.push([px+7,Y-39,20,'255,190,110'])});
    Rr(X-22,Y-24,10,8,w[1]);Rr(X-21,Y-23,8,6,'#3a2416');Rr(X-21,Y-17,8,2,'#4c8a30');Rr(X-20,Y-18,2,1,'#d4483a');Rr(X-16,Y-18,2,1,'#e8a0b4');
    for(let k=0;k<30;k++){const xl=X-54+k*1.75,ww=108-k*3.5;if(ww<2)break;Rr(xl,Y-52-k,ww,1,k%4===3?RF[0]:k<3?RF[3]:RF[1+(k>>3)%2])}
    for(let k=0;k<30;k++){const xl=X-54+k*1.75;Rr(xl,Y-52-k,2,1,RF[3])}
    Rr(X-56,Y-52,112,2,RF[0]);const m=TH.moss.map(rgb);for(let i=0;i<24;i++){const k=Math.floor(hash(i,4,X)*20);Rr(X-50+k*1.75+hash(i,5,X)*(100-k*3.5),Y-52-k,2,1,m[2+(i%3)])}
    Rr(X-50,Y-10,100,10,s[3]);Rr(X-50,Y-10,100,1,s[5]);for(let i=0;i<10;i++)Rr(X-48+i*10+(i%2)*4,Y-6,1,6,s[1]);Rr(X-50,Y-5,100,1,s[1]);
    Rr(X-9,Y-10,18,3,s[4]);Rr(X-12,Y-7,24,3,s[3])},
  stall(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-26,X+24].forEach(px=>{Rr(px,Y-40,3,40,w[2]);Rr(px,Y-40,1,40,w[4])});
    for(let i=0;i<9;i++){Rr(X-30+i*7,Y-46,7,8,i%2?'#f2e6c8':'#b23a2e');Rr(X-30+i*7,Y-38,7,2,i%2?'#d9c9a0':'#8f2a22');Rr(X-28+i*7,Y-36,3,2,i%2?'#d9c9a0':'#8f2a22')}Rr(X-31,Y-47,64,2,w[1]);
    Rr(X-28,Y-18,56,4,w[4]);Rr(X-28,Y-18,56,1,w[6]);Rr(X-26,Y-14,52,14,w[2]);for(let px=X-26;px<X+26;px+=6)Rr(px,Y-14,1,14,w[1]);
    [['#c8d468',-22],['#d4483a',-15],['#e3b04b',-8],['#86b47f',0],['#6ec6e2',8],['#d4483a',16]].forEach(([c,dx],i)=>{Rr(X+dx,Y-22,5,4,c);Rr(X+dx+1,Y-23,3,1,c);Rr(X+dx+1,Y-21,1,1,'#fff')});
    Rr(X-20,Y-33,3,5,'#86b47f');Rr(X-12,Y-34,3,6,'#d4483a');Rr(X+10,Y-32,4,4,'#e3b04b');Rr(X-21,Y-35,40,1,'#5a3a20')},
  well(x,X,Y){const w=TH.wood.map(rgb),s=TH.rock.map(rgb),Rr=rr(x);Rr(X-16,Y-14,32,14,s[3]);Rr(X-16,Y-14,32,2,s[5]);for(let i=0;i<4;i++)Rr(X-15+i*8+(i%2)*3,Y-11,1,10,s[1]);Rr(X-16,Y-7,32,1,s[1]);
    [X-14,X+11].forEach(px=>{Rr(px,Y-40,3,26,w[2]);Rr(px,Y-40,1,26,w[4])});for(let k=0;k<8;k++)Rr(X-20+k*2,Y-42-k,40-k*4,1,k%3?'#52221a':'#3a1814');Rr(X-12,Y-34,24,2,w[1]);
    Rr(X-1,Y-33,1,10,'#8a7a60');Rr(X-4,Y-24,7,6,w[3]);Rr(X-4,Y-24,7,1,w[5]);Rr(X-3,Y-22,5,1,'#6ec6e2')},
  board(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-14,X+12].forEach(px=>Rr(px,Y-36,3,36,w[2]));Rr(X-18,Y-38,36,3,w[4]);Rr(X-16,Y-34,32,20,w[3]);Rr(X-16,Y-34,32,1,w[5]);
    [[-13,-31,8,9],[-3,-32,7,7],[6,-30,8,10],[-9,-21,9,6]].forEach(([a,b,c,d],i)=>{Rr(X+a,Y+b,c,d,i===3?'#e8c890':'#efe4c8');Rr(X+a+1,Y+b+2,c-2,1,'#8a7a60');Rr(X+a+1,Y+b+4,c-3,1,'#8a7a60');Rr(X+a+c/2|0,Y+b,1,1,'#d4483a')})},
  palisade(x,X,Y,v){const w=TH.wood.map(rgb),Rr=rr(x),d=v?1:-1;for(let i=0;i<9;i++){const px=X+d*(i*7),hh=60+(i%3)*4;Rr(px-3,Y-hh,7,hh,w[2]);Rr(px-3,Y-hh,2,hh,w[4]);Rr(px+3,Y-hh,1,hh,w[0]);Rr(px-2,Y-hh-3,5,3,w[3]);Rr(px-1,Y-hh-5,3,2,w[4])}
    Rr(Math.min(X,X+d*56)-3,Y-42,62,3,w[1]);Rr(Math.min(X,X+d*56)-3,Y-20,62,3,w[1]);const tx=X+d*62;Rr(tx-8,Y-84,16,84,w[3]);Rr(tx-8,Y-84,3,84,w[5]);Rr(tx-12,Y-90,24,6,w[2]);Rr(tx-12,Y-90,24,1,w[4]);
    for(let k=0;k<10;k++)Rr(tx-14+k,Y-90-k,28-k*2,1,k%3?'#52221a':'#3a1814');Rr(tx-3,Y-78,6,6,'#ffb24a');Rr(tx-2,Y-77,4,2,'#ffe2a0');Z.glows.push([tx,Y-75,22,'255,190,110']);Rr(tx-6,Y-46,12,2,w[1])},
  forge(x,X,Y){const s=TH.rock.map(rgb),w=TH.wood.map(rgb),Rr=rr(x);Rr(X-6,Y-70,14,40,s[2]);Rr(X-6,Y-70,4,40,s[4]);Rr(X-20,Y-30,40,30,s[3]);Rr(X-20,Y-30,40,2,s[5]);for(let i=0;i<4;i++)Rr(X-19,Y-24+i*6,38,1,s[1]);
    Rr(X-10,Y-22,20,12,'#1a0d08');Rr(X-8,Y-16,16,6,'#ff7a3d');Rr(X-6,Y-18,12,3,'#ffb24a');Rr(X-3,Y-19,6,2,'#ffe2a0');Z.glows.push([X,Y-16,34,'255,120,50']);
    Rr(X+28,Y-12,18,4,'#3a3540');Rr(X+28,Y-12,18,1,'#6a6578');Rr(X+33,Y-8,8,8,'#2a2630');Rr(X+26,Y-11,4,2,'#3a3540');
    Rr(X-40,Y-16,14,10,w[3]);Rr(X-40,Y-16,14,1,w[5]);Rr(X-26,Y-13,6,3,w[1]);Rr(X-38,Y-6,2,6,w[1]);Rr(X-30,Y-6,2,6,w[1]);
    Rr(X+22,Y-30,2,30,w[2]);Rr(X+20,Y-30,8,2,w[3]);[0,4,8].forEach(k=>Rr(X+24,Y-26+k,6,1,'#9aa6ae'))},
  fire(x,X,Y){const Rr=rr(x),w=TH.wood.map(rgb),s=TH.rock.map(rgb);for(let i=0;i<5;i++)Rr(X-10+i*4,Y-3,4,3,s[2+(i%2)]);Rr(X-8,Y-5,16,2,w[2]);Rr(X-6,Y-7,12,2,w[3]);
    Rr(X-5,Y-12,10,6,'#ff7a3d');Rr(X-3,Y-16,6,6,'#ffb24a');Rr(X-1,Y-19,3,5,'#ffe2a0');Rr(X+2,Y-14,2,3,'#ffb24a');Z.glows.push([X,Y-10,30,'255,140,60'])},
  tent(x,X,Y){const Rr=rr(x);for(let k=0;k<28;k++){const ww=48-k*1.7;Rr(X-ww/2,Y-1-k,ww,1,k%5===0?'#a08a66':'#cdbf9e');Rr(X-ww/2,Y-1-k,2,1,'#8a7a5a')}
    for(let k=0;k<20;k++)Rr(X-k*.4,Y-1-k,Math.max(1,10-k*.5),1,'#3a2a20');Rr(X-1,Y-32,2,6,TH.wood.map(rgb)[2]);Rr(X+1,Y-32,6,3,'#b23a2e')},
  cart(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);Rr(X-20,Y-16,36,8,w[3]);Rr(X-20,Y-16,36,1,w[5]);for(let px=X-20;px<X+16;px+=6)Rr(px,Y-16,1,8,w[1]);Rr(X+16,Y-12,14,2,w[2]);
    [[X-12,0],[X+8,1]].forEach(([cx,b])=>{for(let a=0;a<12;a++){const an=a/12*6.28;Rr(cx+Math.cos(an)*6,Y-6+Math.sin(an)*6,2,2,b&&a>7?'#000':w[1])}Rr(cx-1,Y-7,2,2,w[4])});Rr(X-18,Y-20,10,4,'#a08a66');Rr(X-4,Y-21,8,5,'#8a6a48')},
  crates(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);const box=(a,b,sz)=>{Rr(a,b-sz,sz,sz,w[3]);Rr(a,b-sz,sz,1,w[5]);Rr(a,b-sz,1,sz,w[4]);Rr(a+sz-1,b-sz,1,sz,w[1]);for(let k=1;k<sz-1;k++)Rr(a+k,b-sz+k,1,1,w[2])};
    box(X-14,Y,14);box(X,Y,12);box(X-9,Y-14,11);Rr(X+14,Y-14,9,14,w[2]);Rr(X+14,Y-11,9,1,'#3a3540');Rr(X+14,Y-4,9,1,'#3a3540');Rr(X+15,Y-14,2,14,w[4])},
  cairn(x,X,Y){const s=TH.rock.map(rgb),Rr=rr(x);[[0,0,16,6],[2,-6,12,6],[4,-11,8,5],[5,-15,6,4]].forEach(([a,b,c,d],i)=>{Rr(X-8+a,Y-d+b,c,d,s[3+(i%2)]);Rr(X-8+a,Y-d+b,c,1,s[5])});Rr(X-2,Y-18,4,3,'#d4483a');Rr(X-1,Y-21,2,3,'#f2e6c8')},
  lshrine(x,X,Y){const s=TH.rock.map(rgb),w=TH.wood.map(rgb),Rr=rr(x);Rr(X-8,Y-46,16,40,s[3]);Rr(X-8,Y-46,4,40,s[5]);Rr(X-10,Y-50,20,5,s[4]);Rr(X-10,Y-50,20,1,s[6]);Rr(X-4,Y-38,8,10,s[1]);Rr(X-2,Y-36,4,6,'#ffd27a');Z.glows.push([X,Y-33,26,'255,210,130']);
    Rr(X-14,Y-6,28,6,s[3]);Rr(X-14,Y-6,28,1,s[5]);for(const dx of[-26,22]){Rr(X+dx,Y-40,2,40,w[2]);Rr(X+dx-3,Y-30,8,8,'#b23a2e');Rr(X+dx-2,Y-29,6,6,'#ffb24a');Z.glows.push([X+dx+1,Y-26,16,'255,170,90'])}
    Rr(X-26,Y-42,50,1,'#c9a86a');[-20,-12,10,16].forEach((dx,i)=>Rr(X+dx,Y-41,2,6+i%2*2,i%2?'#f2e6c8':'#d4483a'));[-10,-5,4,9].forEach(dx=>{Rr(X+dx,Y-10,2,4,'#efe4c8');Rr(X+dx,Y-12,2,2,'#ffb24a')})},
  rack(x,X,Y){const w=TH.wood.map(rgb),Rr=rr(x);[X-16,X+14].forEach(px=>Rr(px,Y-30,2,30,w[2]));Rr(X-18,Y-30,36,2,w[3]);Rr(X-18,Y-18,36,2,w[3]);
    for(let i=0;i<7;i++){const px=X-14+i*4,c=['#507030','#6a8a3a','#8a6a48','#86b47f'][i%4];Rr(px,Y-28,3,6+(i%3)*2,c);Rr(px,Y-16,3,5+(i%2)*3,['#a85038','#6a8a3a','#c8d468'][i%3])}}
