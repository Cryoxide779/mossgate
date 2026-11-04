const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:420}});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'shade',look:{...T.DEF_LOOK,sex:1,hair:6}},null)});await p.waitForTimeout(400);
await p.screenshot({path:'b_prolog.png'});await p.click('#prgo');
await p.evaluate(()=>{window.__T.pl.x=250});await p.waitForTimeout(900);await p.screenshot({path:'b_road.png'});
await p.evaluate(()=>window.__T.openTalk('ysel'));await p.waitForTimeout(200);await p.screenshot({path:'b_ysel.png'});await p.click('#dlga button');
await p.evaluate(()=>{const T=window.__T;T.pl.q.m1.n=5});await p.evaluate(()=>window.__T.openTalk('ysel'));await p.click('#dlga button');await p.click('#dlga button');
await p.evaluate(()=>window.__T.enterZone(5,70));await p.waitForTimeout(700);
for(const x of[200,560,900,1200]){await p.evaluate(x=>{const T=window.__T;T.pl.x=x},x);await p.waitForTimeout(900);await p.screenshot({path:'b_town'+x+'.png'})}
await p.evaluate(()=>{window.__T.pl.x=872});await p.waitForTimeout(600);await p.evaluate(()=>window.__T.openTalk('holt'));await p.waitForTimeout(200);await p.screenshot({path:'b_holt.png'});
console.log(await p.evaluate(()=>JSON.stringify(window.__T.pl.q)),errs);await b.close()})();
