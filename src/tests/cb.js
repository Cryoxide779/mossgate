const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);const out=[];
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:6,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:2,q:{m1:{s:'d'},m2:{s:'d'},drill:{s:'a',n:0}}});T.pl.eq.weapon=T.makeItem('r_start','weapon','katana',0,1)});
// direct hurtPl tests via mob contact
const res=await ev(async()=>{const T=window.__T,o=[],m=T.S.mobs.find(q=>q.t==='husk');T.pl.face=1;
  const hp0=T.pl.hp;T.inp.guard=1;await new Promise(r=>setTimeout(r,60));T.hurtPl(20,T.pl.x+10,m);o.push('parry hp '+(T.pl.hp-hp0)+' mobstun '+m.stun.toFixed(2)+' q '+JSON.stringify(T.pl.q.drill));
  await new Promise(r=>setTimeout(r,400));const st0=T.pl.st;T.pl.inv=0;T.hurtPl(20,T.pl.x+10,m);o.push('block hp '+(T.pl.hp-hp0)+' st '+(T.pl.st-st0).toFixed(0));
  T.pl.inv=0;T.pl.st=3;T.hurtPl(20,T.pl.x+10,m);o.push('break stag '+T.pl.stag.toFixed(2));T.inp.guard=0;
  await new Promise(r=>setTimeout(r,1200));T.pl.inv=0;T.pl.st=100;T.inp.roll=1;await new Promise(r=>setTimeout(r,60));T.inp.roll=0;const h1=T.pl.hp;T.hurtPl(30,T.pl.x+10,m);o.push('roll dmg '+(h1-T.pl.hp)+' roll '+!!T.pl.roll);
  // poise
  const m2=T.S.mobs.find(q=>q.t==='raider')||m;const p0=m2.poise;for(let i=0;i<5;i++)T.hitMob(m2,1,1);o.push('poise '+p0+'->'+m2.poise+' stun '+m2.stun.toFixed(2));
  return o.join('\n')});out.push(res);
// screenshots: guard pose and roll and telegraph
await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp=9999;const m=T.S.mobs.find(q=>q.t==='husk'&&!q.dead);T.pl.x=m.x-40;T.pl.y=m.y;T.pl.face=1;m.aggro=5;m.cd=0});await p.waitForTimeout(250);await p.screenshot({path:'cb_tell.png'});
await ev(()=>{window.__T.inp.guard=1});await p.waitForTimeout(80);await p.screenshot({path:'cb_guard.png'});await ev(()=>{window.__T.inp.guard=0;window.__T.inp.roll=1});await p.waitForTimeout(150);await p.screenshot({path:'cb_roll.png'});await ev(()=>{window.__T.inp.roll=0});
console.log(out.join('\n'),errs);await b.close()})();
