const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:740,height:360},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);const sh=async n=>p.screenshot({path:'audit/np_'+n+'.png'});
await p.tap('#go');await p.waitForTimeout(400);await sh('1creator');
await ev(()=>document.querySelector('#creator .panel').lastElementChild.scrollTop=9999);await p.waitForTimeout(200);await sh('2creator_bottom');
await p.tap('#begin');await p.waitForTimeout(600);await sh('3prolog');
const pb=await ev(()=>[...document.querySelectorAll('#prolog button')].map(b=>b.id+':'+b.textContent));console.log(pb);
for(const t of pb){const id=t.split(':')[0];if(id){await p.tap('#'+id).catch(()=>{});await p.waitForTimeout(500)}}
await p.waitForTimeout(2500);await sh('4start');
console.log(await ev(()=>{const T=window.__T;return T.GZ.id+' '+Math.round(T.pl.x)+' quests '+JSON.stringify(T.pl.q)+' paused '+T.S.paused}));
// walk right with stick for 3 seconds
await ev(()=>{window.__T.inp.right=1});await p.waitForTimeout(3000);await ev(()=>{window.__T.inp.right=0});await sh('5walk');
console.log(await ev(()=>{const T=window.__T;return 'x '+Math.round(T.pl.x)+' nearNpc '+T.S.nearNpc+' talk '+document.getElementById('talkbtn').textContent}));
console.log('ERR',errs.join('\n'));await b.close()})();
