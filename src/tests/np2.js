const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:740,height:360},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);const sh=async n=>p.screenshot({path:'audit/np2_'+n+'.png'});
await p.tap('#go');await p.waitForTimeout(300);await p.tap('#begin');await p.waitForTimeout(400);await p.tap('#prgo');await p.waitForTimeout(3600);
await ev(()=>{window.__T.inp.right=1});await p.waitForTimeout(2600);await ev(()=>{window.__T.inp.right=0});
await p.tap('#talkbtn');await p.waitForTimeout(400);await sh('1talk');
for(let i=0;i<6;i++){const bs=await ev(()=>[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a+'|'+b.textContent));if(!bs.length)break;console.log(bs.join(' ; '));const pick=bs.find(x=>x.startsWith('acc:'))||bs.find(x=>/more|next|go on/i.test(x))||bs[0];await ev(a=>document.querySelector(`#dlga button[data-a="${a}"]`).click(),pick.split('|')[0]);await p.waitForTimeout(300)}
await sh('2after');console.log(await ev(()=>JSON.stringify(window.__T.pl.q)+' track '+document.getElementById('qtrack').innerText.replace(/\n/g,' / ')));
await p.waitForTimeout(1500);await sh('3guide');
// die
await ev(()=>{const T=window.__T;T.pl.hp=1;const m=T.S.mobs.filter(m=>!m.dead).sort((a,b)=>Math.abs(a.x-T.pl.x)-Math.abs(b.x-T.pl.x))[0];T.pl.x=m.x-10;});await p.waitForTimeout(4000);await sh('4dead');
console.log('dead',await ev(()=>!document.getElementById('dead').hidden+' hp '+window.__T.pl.hp));
await p.tap('#rise').catch(e=>console.log('no rise'));await p.waitForTimeout(800);await sh('5rise');
await p.reload();await p.waitForTimeout(800);await sh('6title');console.log('cont visible',await ev(()=>!document.getElementById('cont').hidden));await p.tap('#cont');await p.waitForTimeout(1500);await sh('7cont');
console.log(await ev(()=>window.__T.GZ.id+' '+JSON.stringify(window.__T.pl.q)));
console.log('ERR',errs.join('\n'));await b.close()})();
