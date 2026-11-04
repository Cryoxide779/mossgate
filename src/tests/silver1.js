const {chromium}=require('playwright');
const NOON=`(()=>{const r=Date.now.bind(Date),b=(Math.floor(r()/960000)+0.08)*960000,s=r();window.__off=0;Date.now=()=>b+window.__off+(r()-s)})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});await ctx.addInitScript(NOON);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:44,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999}});
console.log('cap',await ev(()=>window.__T.CAP),await ev(()=>{const T=window.__T;const t=T.ZONES.find(z=>z.id==='stonecircle');return JSON.stringify(t.portals.map(p=>[p.x,T.ZONES[p.to].id]))}));
const ids=['greenwood','mistreach','silentcanopy','moonshade','thornroot','feylight','starfalls','deepwood','emeraldspire','starfallhollow'];
for(const id of ids){console.log(await ev(id=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id===id);const z=T.ZONES[i];T.enterZone(i);T.pl.x=z.ww*.5;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp=99999;
  return id+' lv'+z.lv+' nodes:'+z.nodes.map(n=>n.r)+' portals:'+z.portals.map(p=>T.ZONES[p.to].id)+' mobs:'+[...new Set(T.S.mobs.map(m=>m.t+':'+m.lv+':'+m.mhp+':'+m.atk))].join(',')},id));await p.waitForTimeout(1300);await p.screenshot({path:`sv_${id}.png`})}
// charting gate
console.log(await ev(async()=>{const T=window.__T;T.pl.flags.seen={};const i=T.ZONES.findIndex(z=>z.id==='mistreach');T.enterZone(i);const z=T.Z;const po=z.portals.find(p=>T.ZONES[p.to].id==='silentcanopy');T.travel(po);await new Promise(r=>setTimeout(r,500));const a=T.Z.id;
  const tm=z.props.find(p=>p[0]==='trailmark');T.pl.x=tm[1];T.pl.y=T.topAt(T.pl.x)-1;const n=T.crNear();const lab=n&&n.k;T.crUse(n);T.travel(po);await new Promise(r=>setTimeout(r,500));return 'blocked->'+a+' near:'+lab+' after:'+T.Z.id}));
// accord chain
console.log(await ev(()=>{const T=window.__T;const q=T.pl.q;['mr3','fg1'].forEach(k=>q[k]={s:'d'});q.sl1={s:'a',n:0};const i=T.ZONES.findIndex(z=>z.id==='deepwood');T.enterZone(i);const r=[];for(const k of [480,1100,1580]){T.pl.x=k+190;const n=T.crNear();r.push(n&&n.k);if(n)T.crUse(n)}
  r.push(JSON.stringify(q.sl1));q.sl1={s:'d'};q.sl2={s:'d'};r.push('avail sl3:'+T.qAvail('sl3'));q.sl3={s:'a',n:0};const j=T.ZONES.findIndex(z=>z.id==='starfalls');T.enterZone(j);T.pl.x=1400+190;T.pl.y=T.topAt(T.pl.x)-1;const n=T.crNear();r.push(n&&n.k);if(n)T.crUse(n);r.push(JSON.stringify(q.sl3));return r.join(' ')}));
await p.waitForTimeout(800);await p.screenshot({path:'sv_levi.png'});
console.log('errs',errs.slice(0,5));await b.close()})();
