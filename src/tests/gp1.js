const {chromium}=require('playwright');
const NOON=`(()=>{const r=Date.now.bind(Date),b=(Math.floor(r()/960000)+0.08)*960000,s=r();window.__off=0;Date.now=()=>b+window.__off+(r()-s)})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});await ctx.addInitScript(NOON);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:40,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999}});
console.log('cap',await ev(()=>window.__T.CAP),'town portals',await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='town');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
const ids=['sunfield','longroad','skybloom','ambergrain','wildherd','southwind','stormwell','redoubt','stonecircle'];
for(const id of ids){console.log(await ev(id=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id===id);const z=T.ZONES[i];T.enterZone(i);T.pl.x=z.ww*.5;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp=99999;
  return id+' lv'+z.lv+' req'+z.req+' '+z.ch+' nodes:'+z.nodes.map(n=>n.r)+' mobs:'+[...new Set(T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk))].join(',')},id));await p.waitForTimeout(1400);await p.screenshot({path:`gp_${id}.png`})}
// colossus view and accord
console.log(await ev(()=>{const T=window.__T;const st=T.pl.q;st.ca1={s:'d'};st.wh1={s:'d'};st.rd3={s:'d'};const i=T.ZONES.findIndex(z=>z.id==='wildherd');T.enterZone(i);T.pl.x=T.NPCS.oriel.x;T.openTalk('oriel');const a=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const acc=document.querySelector('[data-a="acc:ca2"]');if(acc)acc.click();T.closeDlg();return a.join(',')}));
await ev(()=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id==='stonecircle');T.enterZone(i);const z=T.Z;T.pl.x=z.ww-420-60;T.pl.y=T.topAt(T.pl.x)-1});await p.waitForTimeout(1500);await p.screenshot({path:'gp_colossus.png'});
console.log('accord',await ev(()=>{const T=window.__T;const n=T.crNear();if(n)T.crUse(n);return (n&&n.k)+' '+JSON.stringify(T.pl.q.ca2)}));
console.log(await ev(()=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id==='wildherd');T.enterZone(i);T.pl.x=T.NPCS.oriel.x;T.openTalk('oriel');const btns=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a).join(',');const d=document.querySelector('[data-a="done:ca2"]');if(d)d.click();T.closeDlg();return btns+' | '+JSON.stringify(T.pl.q.ca2)+' '+JSON.stringify(T.pl.comp&&T.pl.comp.own)+' act='+(T.pl.comp&&T.pl.comp.act)}));
await p.waitForTimeout(1200);await p.screenshot({path:'gp_calf.png'});
// sluice + shear
console.log(await ev(()=>{const T=window.__T;T.pl.q.ca1={s:'a',n:0};T.pl.flags.sluice={};const i=T.ZONES.findIndex(z=>z.id==='stormwell');T.enterZone(i);const out=[];for(const x of[520,1000,1500]){T.pl.x=x+190;const n=T.crNear();if(n)T.crUse(n);out.push(n&&n.k)}return out+' '+JSON.stringify(T.pl.q.ca1)}));
await ev(()=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id==='southwind');T.enterZone(i)});await p.waitForTimeout(400);
console.log(await ev(()=>{const T=window.__T;const m=T.S.mobs.find(m=>m.t==='emberram');T.pl.x=m.x-10;T.pl.y=m.y;const n=T.crNear();if(n)T.crUse(n);return (n&&n.k)+' wool '+T.pl.mat.emberwool}));
console.log('errs',errs);await b.close()})();
