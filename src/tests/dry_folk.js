const {chromium}=require('playwright');
const NOON=`(()=>{const r=Date.now.bind(Date),b=(Math.floor(r()/960000)+0.08)*960000,s=r();window.__off=0;Date.now=()=>b+window.__off+(r()-s)})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});await ctx.addInitScript(NOON);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:45,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999}});
console.log('wet npcs:',await ev(()=>{const T=window.__T,o=[];T.ZONES.forEach((z,i)=>{if(!z.pools||!z.pools.length||!(z.npcs||[]).length)return;T.enterZone(i);for(const id of z.npcs){const n=T.NPCS[id];if(!n)continue;const pool=z.pools.find(p=>n.x>=p.x0&&n.x<=p.x1);if(pool&&T.standAt(n.x)>pool.y+2)o.push(z.id+':'+id+'@'+n.x)}});return o.join(' ')||'none'}));
// simulate folk for 60s in stonebridge, track any wet
console.log('folk wet:',await ev(async()=>{const T=window.__T;T.enterZone(T.ZONES.findIndex(z=>z.id==='stonebridge'));await new Promise(r=>setTimeout(r,500));let bad=0,n=0;for(let k=0;k<60;k++){await new Promise(r=>setTimeout(r,250));for(const f of T.Z.folk||[]){n++;const pool=(T.Z.pools||[]).find(p=>f.x>=p.x0&&f.x<=p.x1);if(pool&&T.standAt(f.x)>pool.y+2)bad++}}return bad+'/'+n}));
await ev(()=>{const T=window.__T;const z=T.Z;T.pl.x=730+190;T.pl.y=T.standAt(T.pl.x);for(const f of z.folk)f.x=900+Math.random()*120});await p.waitForTimeout(1500);await p.screenshot({path:'np_bridge.png'});
await ev(()=>{const T=window.__T;T.enterZone(T.ZONES.findIndex(z=>z.id==='greenwood'));T.pl.x=600;T.pl.y=T.topAt(600)});await p.waitForTimeout(1500);await p.screenshot({path:'np_green.png'});
console.log(errs);await b.close()})();
