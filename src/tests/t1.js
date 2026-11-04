const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);const out=[];const clk=sel=>p.evaluate(s=>{const e=document.querySelector(s);if(e&&!e.disabled){e.click();return 1}return 0},sel);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:6,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}}});T.pl.eq.weapon=T.makeItem('r_start','weapon','katana',0,1);T.pl.mat={ore:10,timber:6,hide:6,herb:5}});
// go to board and open via up
await ev(()=>{const T=window.__T;const st=T.Z.stations.find(s=>s.k==='board');T.pl.x=st.x+20;T.pl.y=T.topAt(st.x)});await p.waitForTimeout(500);
out.push('btn '+await ev(()=>document.querySelector('#talkbtn').textContent));
await p.keyboard.down('ArrowUp');await p.waitForTimeout(80);await p.keyboard.up('ArrowUp');await p.waitForTimeout(300);await p.screenshot({path:'t_board.png'});
// take all 3: select each posted and take
for(let i=0;i<4;i++){const ids=await ev(()=>[...document.querySelectorAll('[data-bc]')].map(e=>e.dataset.bc));const T=0;await ev(id=>document.querySelector(`[data-bc="${id}"]`).click(),ids[ids.length-1-i>=0?ids.length-1:0]);await clk('[data-bact="take"]')}
out.push('act '+await ev(()=>window.__T.CON().act.map(c=>c.k+':'+c.t).join(' | ')));
out.push('shards '+await ev(()=>window.__T.pl.shards));
// complete supply if any
const r=await ev(()=>{const T=window.__T,C=T.CON(),o=[];for(const c of [...C.act]){if(c.k==='supply'){T.pl.mat[c.r]=(T.pl.mat[c.r]||0)+c.n;T.conTurnIn(c,'town');o.push('supply paid')}if(c.k==='bounty'){c.c=c.n;T.conTurnIn(c,'town');o.push('bounty paid')}}return o.join(',')+' rep '+C.rep});out.push(r);
await p.waitForTimeout(200);await p.screenshot({path:'t_board2.png'});await clk('#bdclose');
// market
await ev(()=>{const T=window.__T;T.pl.bag.push(T.makeItem('wolf','chest',null,2,6));T.openMarket()});await clk('[data-mk="rent"]');await p.waitForTimeout(100);
await clk('[data-ms="G0"]');await clk('[data-mp="0.8"]');await clk('[data-mk="list"]');await clk('[data-mt="mat"]');await clk('[data-ms="G0"]');await clk('[data-mk="list"]');
await p.waitForTimeout(150);await p.screenshot({path:'t_market.png'});
out.push('stall '+await ev(()=>JSON.stringify(window.__T.ST().list.map(l=>l.price))));
await ev(()=>window.__T.marketRoll(200));out.push('after sim '+await ev(()=>JSON.stringify({earn:window.__T.ST().earn,left:window.__T.ST().list.length,log:window.__T.ST().log})));
await clk('#mkclose');
// freight: take at stonebridge? check cargo slow + crate draw
await ev(()=>{const T=window.__T;const C=T.CON();const f=T.boardList('town').find(c=>c.k==='freight');if(f&&C.act.length<3){T.pl.shards-=f.col;C.act.push(f)}T.enterZone(7)});await p.waitForTimeout(600);await p.screenshot({path:'t_cargo.png'});
out.push('cargo '+await ev(()=>window.__T.CON().act.filter(c=>c.k==='freight').length));
console.log(out.join('\n'),errs);await b.close()})();
