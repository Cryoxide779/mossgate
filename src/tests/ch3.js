const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
await p.evaluate(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.5-cur+1)%1)*D});
const r=await p.evaluate(()=>{const T=window.__T,o=[];const q={};['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11'].forEach(k=>q[k]={s:'d'});T.beginWith({name:'A',cls:'ronin',look:{...T.DEF_LOOK}},{lv:11,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:5,q,fl:{crIntro:1}});T.pl.cr={id:null,wait:9999};
 const zi=id=>T.ZONES.findIndex(z=>z.id===id);
 const talk=(n,z)=>{if(T.DLG)T.closeDlg();T.enterZone(zi(z));T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);o.push(n+':'+btn.join(','));const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG){const a2=document.querySelector('[data-a^="acc:"]');if(a2)a2.click()}if(T.DLG)T.closeDlg()};
 talk('wren','town');talk('holt','town');talk('holt','town');talk('nib','sawmill');talk('nib','sawmill');T.pl.q.m14.n=6;talk('nib','sawmill');talk('nib','sawmill');
 const killT=t=>{const m=T.S.mobs.find(q=>q.t===t);T.killMob(m)};T.enterZone(zi('sawmill'));killT('sawtusk');talk('nib','sawmill');talk('nib','sawmill');talk('tansy','mossroot');talk('tansy','mossroot');
 T.pl.q.m17.n=6;talk('tansy','mossroot');talk('tansy','mossroot');T.enterZone(zi('reach'));killT('rootheart');talk('tansy','mossroot');talk('tansy','mossroot');talk('holt','town');talk('holt','town');talk('wren','town');
 o.push(JSON.stringify(Object.fromEntries(['m12','m13','m14','m15','m16','m17','m18','m19','m20'].map(k=>[k,T.pl.q[k]&&T.pl.q[k].s]))));T.openQuests();o.push(document.querySelector('#qch').textContent);T.unpause('quests');
 o.push('missing gear '+JSON.stringify(T.GEAR_MISSING));o.push('mats '+JSON.stringify(T.pl.bag.map(i=>i.src+':'+i.slot)));return o.join('\n')});
console.log(r);
for(const [z,x,n] of [['sawmill',300,'z_mill1'],['sawmill',820,'z_mill2'],['sawmill',1420,'z_mill3'],['reach',560,'z_reach1'],['reach',1250,'z_reach2'],['mossroot',300,'z_moss1'],['mossroot',900,'z_moss2']]){
 await p.evaluate(([z,x])=>{const T=window.__T;T.enterZone(T.ZONES.findIndex(q=>q.id===z));T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x);T.pl.hp=T.pl.mhp=99999;T.S.mobs.forEach(m=>{if(Math.abs(m.x-T.pl.x)<200)m.aggro=0})},[z,x]);await p.waitForTimeout(2900);await p.screenshot({path:n+'.png'})}
console.log(errs);await b.close()})();
