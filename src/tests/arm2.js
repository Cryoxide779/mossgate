const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:12,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1},tmin:true});T.pl.dx.axes=5000;T.S.dtab='axes';T.openTree()});
await p.waitForTimeout(300);await p.screenshot({path:'arm_tree.png'});
await ev(()=>{const T=window.__T;T.unpause('tree');T.openTalk('bram');document.querySelector('[data-a="train"]')&&document.querySelector('[data-a="train"]').click()});await p.waitForTimeout(200);await p.screenshot({path:'arm_train.png'});
console.log(errs);await b.close()})();
