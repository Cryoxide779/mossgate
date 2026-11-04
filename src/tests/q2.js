const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:420}});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
const r=await p.evaluate(()=>{const T=window.__T,out=[];T.beginWith({name:'Q',cls:'ronin',look:{...T.DEF_LOOK}},null);T.unpause('prolog');
 T.pl.q={m1:{s:'d',n:5},m2:{s:'d',n:0}};T.enterZone(4,700);T.pl.q.s_ren={s:'a',n:0};
 const kill=t=>{const m=T.S.mobs.find(m=>!m.dead&&m.t===t);if(m)T.killMob(m)};for(let i=0;i<8;i++){kill('moss');T.S.mobs.forEach(m=>{if(m.dead)Object.assign(m,T.spawnMob(m.def))})}
 out.push('ren '+JSON.stringify(T.pl.q.s_ren));
 T.pl.q.s_nell={s:'a',n:0};for(let i=0;i<30;i++){kill('moss');T.S.mobs.forEach(m=>{if(m.dead)Object.assign(m,T.spawnMob(m.def))})}out.push('nell '+JSON.stringify(T.pl.q.s_nell));
 T.pl.q.s_wren={s:'a',n:0};T.enterZone(1,880);T.qShrine();out.push('wren '+JSON.stringify(T.pl.q.s_wren));
 T.pl.q.s_hesk={s:'a',n:0};T.qReward('s_hesk');out.push('bag '+T.pl.bag.map(i=>T.itemName(i)+':'+i.r).join(','));
 out.push('sp '+T.pl.bsp);T.qReward('s_wren');out.push('sp '+T.pl.bsp);return out.join('\n')});
console.log(r);await p.evaluate(()=>window.__T.enterZone(0,60));await p.waitForTimeout(500);await p.screenshot({path:'q_out.png'});console.log(errs);await b.close()})();
