const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:6,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:5,meat:2},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='town');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
console.log(await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='stonebridge');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
for(const [z,xs] of [['riversmeet',[150,840,1400]],['stonefield',[160,1000,1700]],['mirefen',[150,800,1450]],['highsteps',[250,600]]]){for(const x of xs){await go(z,x);await p.waitForTimeout(1600);await p.screenshot({path:`cs_${z}_${x}.png`})}
  console.log(z,await ev(()=>{const T=window.__T;return JSON.stringify({lv:T.Z.lv,ch:T.Z.ch,mobs:T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp)})}))}
await go('highsteps',250);console.log(await talk('halden'));for(const k of['hsA','hsB','hsC']){await ev(k=>{const T=window.__T;T.openLore(k);T.closeDlg()},k)}console.log(await ev(()=>JSON.stringify(window.__T.pl.q.hs1)));console.log(await talk('halden'));
await go('riversmeet',200);console.log(await talk('dell'));await go('stonefield',160);console.log(await talk('aldis'));await go('mirefen',200);console.log(await talk('jorun'));
await ev(()=>window.__T.openMap());await p.waitForTimeout(400);await p.screenshot({path:'cs_map.png'});
console.log('errs',errs);await b.close()})();
