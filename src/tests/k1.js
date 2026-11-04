const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);const out=[];
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:5,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d',n:5},m2:{s:'d'},w0:{s:'a',n:0},h1:{s:'a',n:0}}});T.pl.eq.weapon=T.makeItem('r_start','weapon','katana',0,1)});
// walk to a timber node and gather via up key
await ev(()=>{const T=window.__T;T.enterZone(0);const nd=T.Z.nodes.find(n=>n.r==='timber');T.pl.x=nd.x;T.pl.y=T.topAt(nd.x);T.pl.vy=0});await p.waitForTimeout(500);await p.screenshot({path:'k_node.png'});
for(let i=0;i<3;i++){await p.keyboard.down('ArrowUp');await p.waitForTimeout(80);await p.keyboard.up('ArrowUp');await p.waitForTimeout(800)}
out.push('mat '+await ev(()=>JSON.stringify(window.__T.pl.mat))+' w0 '+await ev(()=>JSON.stringify(window.__T.pl.q.w0))+' logging '+await ev(()=>window.__T.dRank('logging')));
// hunting
await ev(()=>{const T=window.__T;for(let i=0;i<10;i++){const m=T.S.mobs.find(q=>!q.dead&&(q.t==='wolf'||q.t==='boar'));if(!m)break;T.killMob(m);Object.assign(m,T.spawnMob(m.def))}});
out.push('after hunt '+await ev(()=>JSON.stringify(window.__T.pl.mat)));
// craft at workyard
await ev(()=>{const T=window.__T;T.pl.mat.ore=10;T.pl.mat.herb=5;T.pl.mat.mush=3;T.pl.mat.fish=2;T.enterZone(5);const st=T.Z.stations.find(s=>s.k==='forge');T.pl.x=st.x;T.pl.y=150});await p.waitForTimeout(500);await p.screenshot({path:'k_station.png'});
await p.keyboard.down('ArrowUp');await p.waitForTimeout(80);await p.keyboard.up('ArrowUp');await p.waitForTimeout(300);
await ev(()=>document.querySelector('[data-crdo]').click());await p.waitForTimeout(200);await p.screenshot({path:'k_craft.png'});
out.push('bag '+await ev(()=>window.__T.pl.bag.map(i=>window.__T.itemName(i)+(i.by?'*':'')+':'+i.r).join(','))+' h1 '+await ev(()=>JSON.stringify(window.__T.pl.q.h1)));
await ev(()=>document.querySelector('#crclose').click());
// cook stew at campfire
await ev(()=>{const T=window.__T;const st=T.Z.stations.find(s=>s.k==='cook');T.pl.x=st.x;T.openCraft(st);document.querySelector('[data-crdo]').click();document.querySelector('#crclose').click()});await p.waitForTimeout(300);
out.push('buffs '+await ev(()=>JSON.stringify(window.__T.pl.buffs)));
await ev(()=>window.__T.openInv());await p.waitForTimeout(200);await p.screenshot({path:'k_inv.png'});await ev(()=>window.__T.unpause('inv'));
await ev(()=>{window.__T.openTree();document.querySelector('[data-dt="field"]').click()});await p.waitForTimeout(200);await p.screenshot({path:'k_field.png'});
console.log(out.join('\n'),errs);await b.close()})();
