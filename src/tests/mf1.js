const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:19,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:9},mat:{herb:5,meat:2},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='falls');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
for(const [z,xs] of [['fenwater',[300,700,1300]],['reedshore',[300,800,1500]],['glasswater',[300,900,1600]],['serpent',[300,1000,1700]],['archive',[300,1000,1500]]]){for(const x of xs){await go(z,x);await p.waitForTimeout(1600);await p.screenshot({path:`mf_${z}_${x}.png`})}
  console.log(z,await ev(()=>{const T=window.__T;return JSON.stringify({lv:T.Z.lv,nodes:T.Z.nodes.map(n=>n.r),mobs:T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk)})}))}
await go('fenwater',250);console.log(await talk('quill'),await talk('bosk'));await go('reedshore',280);console.log(await talk('nessa'),await talk('nessa'));
await go('serpent',1640);console.log(await talk('aldo'),await talk('aldo'));
await go('serpent',980);await p.waitForTimeout(400);console.log('wave',await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='wavestag');T.pl.x=m.x-20;T.pl.y=T.topAt(T.pl.x)-1;return JSON.stringify(T.crNear()&&T.crNear().k)}));
await ev(()=>{const T=window.__T;const n=T.crNear();if(n)T.crUse(n)});console.log(await ev(()=>JSON.stringify(window.__T.pl.q.ls2)));
await go('archive',260);console.log(await talk('verity'));for(const k of['saA','saB','saC'])await ev(k=>{const T=window.__T;T.openLore(k);T.closeDlg()},k);console.log(await ev(()=>JSON.stringify(window.__T.pl.q.sa1)));
// companion toggle
console.log('comp',await ev(()=>{const T=window.__T;T.pl.comp={own:['c1'],act:'c1',b:{c1:{t:'wolf',n:'Ash, Forest Wolf',tr:40,lv:10,xp:0}}};T.spawnComp&&T.spawnComp();
  const r=[];const press=()=>dispatchEvent(new KeyboardEvent('keydown',{code:'KeyR'}));press();r.push(T.pl.comp.act);press();r.push(T.pl.comp.act);
  document.getElementById('morebtn').click();const row=document.getElementById('comptog');r.push(row.hidden,row.textContent);row.click();r.push(T.pl.comp.act);return JSON.stringify(r)}));
await p.waitForTimeout(300);await p.screenshot({path:'mf_more.png'});
console.log('errs',errs);await b.close()})();
