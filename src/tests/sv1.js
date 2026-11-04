const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:800,height:400},deviceScaleFactor:2,isMobile:true,hasTouch:true,permissions:['clipboard-read','clipboard-write']});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:9,exp:5,sh:321,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'}},fl:{crIntro:1}})});
await p.click('#menubtn');await p.waitForTimeout(200);await p.click('[data-gm="show"]');await p.waitForTimeout(200);await p.screenshot({path:'sv_menu.png'});
const code=await p.$eval('#gmexp textarea',t=>t.value);console.log('code len',code.length,code.slice(0,20));
// new device
const p2=await ctx.newPage();await ctx.clearCookies();await p2.goto('file://'+process.cwd()+'/dbgp.html?x');await p2.evaluate(()=>localStorage.clear());await p2.reload();await p2.waitForTimeout(700);
await p2.click('#impbtn');await p2.fill('#gmin',code.slice(0,-3)+'zzz');await p2.click('[data-gm="imp"]');console.log('bad:',await p2.$eval('#gmimp .warn',e=>e.textContent));
await p2.fill('#gmin',code);await p2.click('[data-gm="imp"]');await p2.waitForTimeout(1500);
console.log('after import cont:',await p2.$eval('#cont',e=>e.hidden+' '+e.textContent));await p2.screenshot({path:'sv_title.png'});
console.log(errs);await b.close()})();
