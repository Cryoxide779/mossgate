const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});await ctx.addInitScript({content:fs.readFileSync('fakefb.js','utf8')});
const errs=[];const mkp=async(nm,sex,out,zone)=>{const p=await ctx.newPage();p.on('pageerror',e=>errs.push(nm+e.stack));await p.goto('file://'+process.cwd()+'/dbgfb.html');await p.waitForTimeout(800);
  await p.evaluate(([nm,sex,out,zone])=>{const T=window.__T;T.beginWith({name:nm,cls:sex?'weaver':'ronin',look:{...T.DEF_LOOK,sex,outfit:out,hair:sex?3:1}},{lv:6,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone,q:{m1:{s:'d'},m2:{s:'d'},w1:{s:'a',n:0}},fl:{crIntro:1}});T.pl.cr={id:null,wait:9999};T.pl.hp=T.pl.mhp=5000},[nm,sex,out,zone]);return p};
const A=await mkp('Aya',1,2,0);await A.waitForTimeout(400);
// A kills a mob before B arrives
const killed=await A.evaluate(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.t==='wolf');T.killMob(m);return m.ni});await A.waitForTimeout(300);
const B=await mkp('Bram',0,5,0);await B.waitForTimeout(1500);
console.log('levels match',await A.evaluate(()=>window.__T.S.mobs.map(m=>m.lv).join()),'|',await B.evaluate(()=>window.__T.S.mobs.map(m=>m.lv).join()));
console.log('B sees killed mob dead',await B.evaluate(i=>window.__T.S.mobs.find(m=>m.ni===i).dead,killed),'peers',await A.evaluate(()=>window.__T.netPeers().length),await B.evaluate(()=>window.__T.netPeers().length));
// both hit same wolf; A finishes; B should get shared exp + quest credit (w1 is wolves quest?)
const r=await B.evaluate(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.t==='wolf'&&!q.dead);T.pl.x=m.x+30;T.pl.y=m.y;T.hitMob(m,.5,1);return {i:m.ni,exp:T.pl.exp,q:JSON.stringify(T.pl.q.w1)}});await A.waitForTimeout(400);
await A.evaluate(i=>{const T=window.__T,m=T.S.mobs.find(q=>q.ni===i);T.pl.x=m.x-40;T.pl.y=m.y;T.killMob(m)},r.i);await B.waitForTimeout(500);
console.log('B before',r,'after',await B.evaluate(i=>{const T=window.__T;return{dead:T.S.mobs.find(q=>q.ni===i).dead,exp:T.pl.exp,q:JSON.stringify(T.pl.q.w1)}},r.i));
await B.evaluate(()=>{const s=document.getElementById('saytg');s.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});await B.waitForTimeout(200);await B.screenshot({path:'mp2_say.png'});
await B.evaluate(()=>document.querySelectorAll('#saylist button')[0].dispatchEvent(new PointerEvent('pointerdown',{bubbles:true})));await A.waitForTimeout(700);await A.screenshot({path:'mp2_A.png'});
// solo deep: no room
await A.evaluate(()=>{window.__T.DP().solo=true;window.__T.deepEnter(2,true)});await A.waitForTimeout(1500);console.log('solo deep room',await A.evaluate(()=>!!window.__T.NET.room+' key '+window.__T.NET.key));
await B.evaluate(()=>window.__T.deepEnter(2,false));await B.waitForTimeout(1500);console.log('B open deep peers',await B.evaluate(()=>window.__T.netPeers().length+' key '+window.__T.NET.key));
console.log(errs);await b.close()})();
