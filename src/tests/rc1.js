const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.45-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:8,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:10,shard:5,timber:5,mush:4},fl:{crIntro:1},tmin:true});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x);T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();const ch=document.querySelector('[data-a^="ch:"]')||document.querySelector('[data-ch]');if(ch)ch.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
// town waystone discover
await go('town',500);await p.waitForTimeout(300);console.log('near',await ev(()=>JSON.stringify(window.__T.S.nearCr)));await ev(()=>window.__T.useWay());
await go('outskirts',1260);await ev(()=>window.__T.useWay());
await go('shrine',840);await p.waitForTimeout(2500);await p.screenshot({path:'rc_shrine.png'});
console.log(await talk('ivo'));await ev(()=>{const T=window.__T;T.pl.q.ws1.n=5});console.log(await talk('ivo'));
console.log(await talk('ivo'));await ev(()=>{const T=window.__T;T.doCraft(T.RECIPES.find(r=>r.id==='ritualmortar'))});console.log('ws2',await ev(()=>JSON.stringify(window.__T.pl.q.ws2)));console.log(await talk('ivo'));console.log(await talk('ivo'));
await ev(()=>{const T=window.__T;T.pl.x=1010+190;T.pl.y=T.topAt(T.pl.x);T.pl.hp=T.pl.mhp=99999;T.useWay()});
console.log('sdef',await ev(()=>JSON.stringify(window.__T.S.sdef)+' paused '+window.__T.S.paused+' z '+window.__T.GZ.id));for(let w=0;w<3;w++){await p.waitForTimeout(3600);console.log('w',await ev(()=>JSON.stringify(window.__T.S.sdef)+' sd '+window.__T.S.mobs.filter(m=>m.sd).length));await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp;for(const m of T.S.mobs)if(m.sd&&!m.dead)T.killMob(m)})}
await p.waitForTimeout(3600);await p.screenshot({path:'rc_def.png'});console.log('ws3',await ev(()=>JSON.stringify(window.__T.pl.q.ws3)));console.log(await talk('ivo'));
console.log('net',await ev(()=>JSON.stringify(window.__T.pl.flags.ways)+' '+window.__T.pl.flags.waynet));
await ev(()=>{const T=window.__T;T.useWay()});await p.waitForTimeout(300);await p.screenshot({path:'rc_map.png'});
console.log(errs);await p.click('[data-mz="outskirts"]');await p.waitForTimeout(100);await p.click('[data-mgo="outskirts"]');await p.waitForTimeout(900);console.log('after travel',await ev(()=>window.__T.GZ.id+' sh '+window.__T.pl.shards));
await go('hermit',520);await p.waitForTimeout(2600);await p.screenshot({path:'rc_hermit.png'});
console.log(await talk('ambry'));await ev(()=>{window.__T.pl.q.ha1.n=5});console.log(await talk('ambry'));console.log('ambry flag',await ev(()=>window.__T.pl.flags.ambry));
await go('outcrop',700);await p.waitForTimeout(2600);console.log(await talk('sel'));
for(let i=0;i<8;i++){await ev(()=>{const T=window.__T,nd=T.GZ.nodes.find(n=>n.r==='shard'&&n.ch>0);T.pl.gT=-9;if(nd)T.gather(nd)})}
console.log('res',await ev(()=>window.__T.pl.flags.res),'oc mobs',await ev(()=>window.__T.S.mobs.filter(m=>m.oc).length));await p.waitForTimeout(500);await p.screenshot({path:'rc_outcrop.png'});
await go('hunt',480);await p.waitForTimeout(2600);await p.screenshot({path:'rc_hunt.png'});console.log(await talk('tess'));
await go('town',1560);await p.waitForTimeout(2600);await p.screenshot({path:'rc_green.png'});
console.log(errs);await b.close()})();
