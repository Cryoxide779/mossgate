const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:7,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
await go('town',420);await p.waitForTimeout(1500);await p.screenshot({path:'uw_town.png'});
for(const x of [200,880,1420,1740]){await go('under',x);await p.waitForTimeout(x===200?1800:900);await p.screenshot({path:'uw_'+x+'.png'})}
console.log(await talk('corra'));
for(const vx of [880,1090,1560]){await go('under',vx);await p.waitForTimeout(250);const n=await ev(()=>JSON.stringify(window.__T.S.nearCr)+' '+document.getElementById('talkbtn').textContent);console.log('near',n);await ev(()=>{const T=window.__T;T.crUse(T.S.nearCr)});await p.waitForTimeout(150)}
await p.waitForTimeout(400);await p.screenshot({path:'uw_valve.png'});
console.log('uw1',await ev(()=>JSON.stringify(window.__T.pl.q.uw1)));console.log(await talk('corra'));await p.waitForTimeout(500);console.log(await talk('corra'));console.log(await talk('wen'));await p.waitForTimeout(500);console.log(await talk('corra'));await p.waitForTimeout(500);console.log(await talk('corra'));
await go('under',1420);await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp=3000});await p.waitForTimeout(4500);console.log('hp after vent',await ev(()=>window.__T.pl.hp));
await go('cistern',700);await p.waitForTimeout(1700);await p.screenshot({path:'uw_cistern.png'});
await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp=99999;const m=T.S.mobs.find(m=>m.t==='oldpale');m.aggro=9;T.hitMob(m,0,1);m.hp=Math.round(m.mhp*.45);T.pl.x=m.x-90});await p.waitForTimeout(800);await p.screenshot({path:'uw_dive.png'});console.log('dive',await ev(()=>{const m=window.__T.S.mobs.find(m=>m.t==='oldpale');return m.dive+' ph2 '+m.ph2}));
await p.waitForTimeout(2500);await p.screenshot({path:'uw_surf.png'});
await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='oldpale');m.dive=0;T.killMob(m)});await p.waitForTimeout(400);console.log('uw3',await ev(()=>JSON.stringify(window.__T.pl.q.uw3)));
console.log(await talk('corra'));await p.waitForTimeout(500);console.log(await talk('corra'));await ev(()=>{window.__T.openTalk('corra')});await p.waitForTimeout(200);await ev(()=>{const b=[...document.querySelectorAll('#dlga button')].find(b=>/Petition/.test(b.textContent));b&&b.click()});await p.waitForTimeout(600);
console.log('uw4',await ev(()=>JSON.stringify(window.__T.pl.q.uw4)+' '+window.__T.pl.flags.uw4+' kit '+window.__T.pl.flags.wardenkit));
console.log('ERR',errs.join('\n'));await b.close()})();
