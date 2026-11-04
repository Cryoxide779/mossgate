const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:4,exp:0,sh:12,pt:3,inv:[],eq:null,sk:{},zone:5,q:{},fl:{crIntro:1}})});
await p.tap('#menubtn');await p.waitForTimeout(200);await p.tap('[data-gm="ctl"]');await p.waitForTimeout(300);await p.screenshot({path:'ct_a.png'});
const box=await p.$eval('#b-atk',e=>{const r=e.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]});
// drag via pointer events
await p.mouse.move(box[0],box[1]);await p.mouse.down();for(let i=1;i<=10;i++)await p.mouse.move(box[0]-i*30,box[1]-i*12);await p.mouse.up();await p.waitForTimeout(100);
await p.$eval('[data-ct="size"]',e=>{e.value=150;e.dispatchEvent(new Event('input',{bubbles:true}))});
await p.mouse.move(90,310);await p.mouse.down();for(let i=1;i<=8;i++)await p.mouse.move(90+i*10,310-i*8);await p.mouse.up();
await p.waitForTimeout(200);await p.screenshot({path:'ct_b.png'});
await p.click('[data-ct="done"]');await p.waitForTimeout(300);await p.screenshot({path:'ct_c.png'});
console.log(await ev(()=>localStorage.getItem('mossgate-ctl')));
await p.reload();await p.waitForTimeout(700);await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},null);T.unpause('prolog')});await p.waitForTimeout(400);
console.log('after reload atk',await p.$eval('#b-atk',e=>e.style.left+' '+e.style.width),'stick',await p.$eval('#stick',e=>e.style.left+' '+e.style.top));
console.log(errs);await b.close()})();
