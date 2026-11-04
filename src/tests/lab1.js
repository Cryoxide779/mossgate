const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.45-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:9,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:10,mush:6,shard:4},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();const ch=document.querySelector('[data-a^="ch:"]');if(ch)ch.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
await go('bog',1420);await p.waitForTimeout(1500);await p.screenshot({path:'lab_bog.png'});
console.log(await talk('mirelle'));
for(const x of [150,700,1400]){await go('lab',x);await p.waitForTimeout(x===150?1800:700);await p.screenshot({path:'lab_'+x+'.png'})}
for(const id of ['labA','labB','labC']){await ev(id=>{const T=window.__T;T.openLore(id);T.closeDlg()},id)}
console.log('lb1',await ev(()=>JSON.stringify(window.__T.pl.q.lb1)));console.log(await talk('mirelle'));await p.waitForTimeout(600);console.log(await talk('mirelle'));
await ev(()=>{const T=window.__T;T.doCraft(T.RECIPES.find(r=>r.id==='antitoxin'))});console.log('lb2',await ev(()=>JSON.stringify(window.__T.pl.q.lb2)+' buff '+JSON.stringify(window.__T.pl.buffs)));console.log(await talk('mirelle'));console.log(await talk('mirelle'));
// toxic pool with and without antitoxin
await go('lab',1140);await ev(()=>{const T=window.__T;T.pl.y=285});await p.waitForTimeout(1200);console.log('hp with antitox',await ev(()=>window.__T.pl.hp+'/'+window.__T.pl.mhp));
await ev(()=>{delete window.__T.pl.buffs.antitox});await go('lab',1140);await ev(()=>{const T=window.__T;T.pl.y=285});await p.waitForTimeout(1300);console.log('hp without',await ev(()=>window.__T.pl.hp+'/'+window.__T.pl.mhp));await p.screenshot({path:'lab_tox.png'});
await go('vats',600);await p.waitForTimeout(1600);await p.screenshot({path:'lab_vats.png'});
await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp=99999;const m=T.S.mobs.find(m=>m.t==='subject9');m.aggro=9;T.hitMob(m,0,1);m.hp=Math.round(m.mhp*.45);T.pl.x=m.x-60});await p.waitForTimeout(3500);await p.screenshot({path:'lab_phase2.png'});
console.log('mobs',await ev(()=>window.__T.S.mobs.filter(m=>!m.dead).map(m=>m.t).join(',')+' eproj '+window.__T.S.eproj.length));
await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='subject9');T.killMob(m)});await p.waitForTimeout(500);
console.log('lb3',await ev(()=>JSON.stringify(window.__T.pl.q.lb3)+' bag '+window.__T.pl.bag.map(i=>i.src+':'+i.slot).join(',')));console.log(await talk('mirelle'));await p.waitForTimeout(600);console.log(await talk('mirelle'));
await ev(()=>{const T=window.__T;T.openTalk('mirelle')});await p.waitForTimeout(300);await p.screenshot({path:'lab_choice.png'});console.log(await ev(()=>[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a+'|'+b.textContent).join(' ; ')));
await ev(()=>{const b=[...document.querySelectorAll('#dlga button')].find(b=>/Keep/.test(b.textContent));b&&b.click()});await p.waitForTimeout(700);console.log('flags',await ev(()=>JSON.stringify({lb4:window.__T.pl.q.lb4,varn:window.__T.pl.flags.varn,f:window.__T.pl.flags.lb4})));
console.log('ERR',errs.join('\n'));await b.close()})();
