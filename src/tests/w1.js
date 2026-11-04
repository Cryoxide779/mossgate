const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);const out=[];
// time control: patch Date.now offset
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off});
const setTime=async t=>ev(t=>{const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((t-cur+1)%1)*D},t);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:11,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'},m3:{s:'d'},m4:{s:'d'},m5:{s:'d'},m6:{s:'d'}},fl:{t3:'road'}});T.pl.eq.weapon=T.makeItem('r_start','weapon','katana',0,1)});
await setTime(.5);await ev(()=>{const T=window.__T;T.enterZone(5,900+190)});await p.waitForTimeout(2500);await p.screenshot({path:'w_town_day.png'});
await setTime(.95);await p.waitForTimeout(1200);await p.screenshot({path:'w_town_night.png'});
await setTime(.74);await p.waitForTimeout(800);await p.screenshot({path:'w_town_dusk.png'});
// weather samples: find bucket offsets
for(const [z,want,file] of [[8,'storm','w_bog'],[6,'fog','w_oak'],[1,'rain','w_falls']]){await setTime(.6);await ev(z=>window.__T.enterZone(z),z);
  for(let i=0;i<40;i++){const w=await ev(()=>window.__T.weather());if(w===want)break;await ev(()=>{window.__off+=180000})}
  await p.waitForTimeout(900);out.push(file+' '+await ev(()=>window.__T.weather()));await p.screenshot({path:file+'.png'})}
// lore + quests m7..; inner scar boss
await setTime(.55);await ev(()=>{const T=window.__T;T.enterZone(11);const l=T.LORE.innerA;T.pl.x=l.x+190;T.pl.y=T.topAt(T.pl.x)});await p.waitForTimeout(600);
await p.keyboard.down('ArrowUp');await p.waitForTimeout(80);await p.keyboard.up('ArrowUp');await p.waitForTimeout(300);await p.screenshot({path:'w_lore.png'});await ev(()=>{const e=document.querySelector('[data-a="bye"]');if(e)e.click()});
await ev(()=>{const T=window.__T;const m=T.S.mobs.find(q=>q.t==='unbound');T.pl.x=m.x-110;T.pl.y=T.topAt(T.pl.x);T.pl.hp=T.pl.mhp=99999});await p.waitForTimeout(4000);await p.screenshot({path:'w_boss.png'});
out.push('boss '+await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.t==='unbound');return m.st+' hp '+m.hp+' temps '+T.S.mobs.filter(o=>o.temp).length+' eproj '+T.S.eproj.length}));
await ev(()=>{const T=window.__T;const m=T.S.mobs.find(q=>q.t==='unbound');m.hp=m.mhp*.4});await p.waitForTimeout(2500);await p.screenshot({path:'w_boss2.png'});
await ev(()=>{const T=window.__T;const m=T.S.mobs.find(q=>q.t==='unbound');T.killMob(m)});await p.waitForTimeout(300);out.push('drops '+await ev(()=>window.__T.S.drops.filter(d=>d.k==='gear').map(d=>window.__T.itemName(d.it)).join(',')));
// outpost board
await ev(()=>{const T=window.__T;T.enterZone(9);T.openBoard({})});await p.waitForTimeout(200);await p.screenshot({path:'w_board.png'});out.push('tower board '+await ev(()=>window.__T.boardList('tower').map(c=>c.t).join(' | ')));
console.log(out.join('\n'),errs.slice(0,3));await b.close()})();
