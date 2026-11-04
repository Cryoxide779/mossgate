const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const n=document.querySelector('#title button, #newbtn');});
await p.click('#go');await p.waitForTimeout(300);await p.click('.cls[data-c="gatherer"]');await p.waitForTimeout(400);await p.screenshot({path:'kit_creator.png'});await ev(()=>{document.querySelector('#creator .panel, #creator').scrollTop=9999});await p.screenshot({path:'kit_creator2.png'});
for(const k of['traveler','scout','guard','aspirant','gatherer']){
  console.log(k,await ev(k=>{const T=window.__T;T.beginWith({name:'Kit',cls:k,look:{...T.DEF_LOOK}},null);T.pl.flags.hints=9;T.pl.cr={id:null,wait:9999};const i=T.ZONES.findIndex(z=>z.id==='riversmeet');T.enterZone(i);T.pl.x=420+190;T.pl.y=T.topAt(T.pl.x)-1;
   if(!document.getElementById('prolog').hidden)document.getElementById('prgo').click();return JSON.stringify({eq:Object.fromEntries(Object.entries(T.pl.eq).map(([s,it])=>[s,T.itemName?T.itemName(it):it.src])),lo:T.pl.lo.map(t=>{const i=T.techInfo(t);return i?i.n+(i.learned?'':'(lk)'):'-'}),dx:Object.keys(T.pl.dx),mat:T.pl.mat})},k));
  await p.waitForTimeout(1300);await ev(()=>{window.__T.inp.atk=1});await p.waitForTimeout(150);await ev(()=>{window.__T.inp.atk=0});await p.waitForTimeout(100);await p.screenshot({path:`kit_${k}.png`,clip:{x:250,y:170,width:340,height:150}});
  await ev(()=>{window.__T.inp.s1=1});await p.waitForTimeout(200);await ev(()=>{window.__T.inp.s1=0});await p.waitForTimeout(600)}

console.log('errs',errs);await b.close()})();
