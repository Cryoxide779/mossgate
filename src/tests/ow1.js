const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:29,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:9},mat:{herb:5,meat:2},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='tower');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))+' npcs '+t.npcs.map(n=>T.NPCS[n].x)}));
for(const [z,xs] of [['ravengate',[300,760,1400]],['bastion',[300,900,1500]],['graystone',[300,1000,1600]],['sentinel',[300,1100,1800]],['talonreach',[300,1100,1800]]]){for(const x of xs){await go(z,x);await p.waitForTimeout(1600);await p.screenshot({path:`ow_${z}_${x}.png`})}
  console.log(z,await ev(()=>{const T=window.__T;return JSON.stringify({lv:T.Z.lv,nodes:T.Z.nodes.map(n=>n.r),mobs:T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk)})}))}
await go('ravengate',300);console.log(await talk('brisa'),await talk('brisa'));await go('bastion',260);console.log(await talk('odran'));await go('bastion',1300);console.log(await talk('aurek'));
for(const k of['bfA','bfB','bfC'])await ev(k=>{const T=window.__T;T.openLore(k);T.closeDlg()},k);console.log(await ev(()=>JSON.stringify(window.__T.pl.q.bf2)));
await go('graystone',300);console.log(await talk('maddox'));await go('talonreach',300);console.log(await talk('kestrel'));
await go('graystone',300);await p.waitForTimeout(500);console.log('shear',await ev(()=>{const T=window.__T;T.pl.q.rg2={s:'a',n:0};const m=T.S.mobs.find(m=>m.t==='mtngoat');T.pl.x=m.x-10;T.pl.y=m.y;const n=T.crNear();const lab=n&&T.crLabel?n.k:'-';if(n)T.crUse(n);const n2=T.crNear();return lab+' wool='+T.pl.mat.wool+' q='+JSON.stringify(T.pl.q.rg2)+' after='+(n2&&n2.k)}));
console.log('errs',errs);await b.close()})();
