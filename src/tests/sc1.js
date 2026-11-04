const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:34,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:9},mat:{herb:5,meat:2},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='scar');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))+' npcs '+t.npcs.map(n=>T.NPCS[n].x)}));
for(const [z,xs] of [['riftwatch',[300,700,1300]],['bleeding',[300,900,1600]],['mirror',[300,1000,1700]],['echo',[300,1000,1600]],['veinfall',[300,1000,1700]],['shardspire',[300,900,1500]]]){for(const x of xs){await go(z,x);await p.waitForTimeout(1600);await p.screenshot({path:`sc_${z}_${x}.png`})}
  console.log(z,await ev(()=>{const T=window.__T;return JSON.stringify({lv:T.Z.lv,nodes:T.Z.nodes.map(n=>n.r),mobs:T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk)})}))}
await go('riftwatch',300);console.log(await talk('varga'),await talk('ysolde'));await go('echo',240);console.log(await talk('iona'));
for(const k of['ehA','ehB','ehC'])await ev(k=>{const T=window.__T;T.openLore(k);T.closeDlg()},k);console.log(await ev(()=>JSON.stringify(window.__T.pl.q.eh1)));
await ev(()=>{const T=window.__T;T.pl.q.rw2={s:'d'};T.pl.q.bs2={s:'a',n:0};T.pl.mat.stabfrag=1});await go('mirror',1600);await p.waitForTimeout(400);
console.log('stag',await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='etherealstag');T.pl.x=m.x-20;T.pl.y=T.topAt(T.pl.x)-1;const n=T.crNear();if(n)T.crUse(n);return (n&&n.k)+' '+JSON.stringify(T.pl.q.bs2)}));
await ev(()=>{const T=window.__T;T.pl.q.ss1={s:'d'}});await go('riftwatch',1060);console.log(await ev(()=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk('ysolde');const a=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const acc=document.querySelector('[data-a="acc:ss2"]');if(acc)acc.click();if(T.DLG)T.closeDlg();T.openTalk('ysolde');return a.join(',')+' → '+[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a+'|'+b.textContent).join(' ; ')}));
console.log('errs',errs);await b.close()})();
