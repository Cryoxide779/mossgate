const {chromium}=require('playwright');
(async()=>{const errs=[];const b=await chromium.launch();for(const [vw,vh,tag] of [[844,390,'ph'],[1280,720,'dt']]){const p=await (await b.newContext({viewport:{width:vw,height:vh}})).newPage();p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:T.DEF_LOOK},{lv:35,q:{m1:{s:'d'}},fl:{hints:9,waynet:1}});T.pl.cr={id:null,wait:9999};const seen={};for(const z of T.ZONES)if(Math.random()<.85)seen[z.id]=1;T.pl.flags.seen=seen;T.enterZone(T.ZONES.findIndex(z=>z.id==='fenwater'));T.openMap()});
await p.waitForTimeout(400);await p.screenshot({path:`mp3_${tag}_region.png`});
for(const v of ['world','whisper','cresthollow','scar','watchtower']){await p.click(`#maptabs [data-mv="${v}"]`);await p.waitForTimeout(250);await p.screenshot({path:`mp3_${tag}_${v}.png`})}
await p.click('#mapgrid [data-mv]');await p.waitForTimeout(200);console.log(tag,'after exit click',await ev(()=>document.querySelector('#maptabs .on').textContent));await p.close()}
console.log('errs',errs);await b.close()})();
