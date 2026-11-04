const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:844,height:390}})).newPage();
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);await p.click('#go');await p.waitForTimeout(300);
for(const k of['ashbow','traveler','scout','guard','aspirant','gatherer']){await p.click(`.cls[data-c="${k}"]`);await p.waitForTimeout(500);await p.screenshot({path:`kc_${k}.png`,clip:{x:100,y:90,width:180,height:160}})}
await b.close()})();
