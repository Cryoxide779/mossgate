const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const r=await p.evaluate(()=>{const T=window.__T,o=[];const q={};['m1','m2','m3','m4','m5','m6'].forEach(k=>q[k]={s:'d'});T.beginWith({name:'A',cls:'ronin',look:{...T.DEF_LOOK}},{lv:11,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:5,q});
 const talk=(n,z)=>{if(T.DLG)T.closeDlg();T.enterZone(z);T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);o.push(n+':'+btn.join(','));const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG){const a2=document.querySelector('[data-a^="acc:"]');if(a2)a2.click()}if(T.DLG)T.closeDlg()};
 talk('wren',5);talk('sef',8);T.pl.q.m8.n=3;talk('ilse',9);T.pl.q.m9.n=1;talk('corwin',10);T.pl.q.m10.n=1;talk('corwin',10);talk('wren',5);
 o.push(JSON.stringify(Object.fromEntries(['m7','m8','m9','m10','m11'].map(k=>[k,T.pl.q[k]&&T.pl.q[k].s]))));T.openQuests();o.push(document.querySelector('#qch').textContent);return o.join('\n')});
console.log(r,errs);await b.close()})();
