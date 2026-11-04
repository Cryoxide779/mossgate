const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:24,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:9},mat:{herb:5,meat:2},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='bog');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
for(const [z,xs] of [['mudcarver',[300,700,1300]],['grasping',[300,900,1600]],['fenwatch',[300,900,1600]],['veilfen',[300,800,1600]],['rotmire',[300,900,1600]]]){for(const x of xs){await go(z,x);await p.waitForTimeout(1600);await p.screenshot({path:`mb_${z}_${x}.png`})}
  console.log(z,await ev(()=>{const T=window.__T;return JSON.stringify({lv:T.Z.lv,nodes:T.Z.nodes.map(n=>n.r),mobs:T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk)})}))}
await go('mudcarver',300);console.log(await talk('grell'),await talk('hesper'));await go('fenwatch',300);console.log(await talk('tamas'));
await go('veilfen',260);console.log(await talk('ruel'));
await go('veilfen',800);await p.waitForTimeout(400);console.log('hstag',await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='hollowstag');T.pl.x=m.x-20;T.pl.y=T.topAt(T.pl.x)-1;const n=T.crNear();if(n&&n.k==='hstag')T.crUse(n);return JSON.stringify(T.pl.q.vf1)}));
await ev(()=>{const T=window.__T;T.pl.q.vf2={s:'d'};T.pl.q.vf1={s:'d'}});await go('veilfen',260);console.log(await ev(()=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk('ruel');document.querySelector('[data-a^="acc:"]').click();if(T.DLG)T.closeDlg();T.openTalk('ruel');return [...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a+'|'+b.textContent).join(' ; ')}));
console.log('errs',errs);await b.close()})();
