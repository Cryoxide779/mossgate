const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:400},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:4,exp:0,sh:12,pt:3,inv:[],eq:null,sk:{},zone:5,q:{},fl:{crIntro:1}})});
await p.keyboard.press('Escape');await p.waitForTimeout(200);await p.screenshot({path:'mn1.png'});
await p.click('[data-gm="title"]');await p.click('[data-gm="title"]');await p.waitForTimeout(1500);
console.log('title visible',await p.$eval('#title',e=>!e.hidden),await p.$eval('#cont',e=>e.textContent));console.log(errs);await b.close()})();
