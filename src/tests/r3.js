const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:420}});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'Z',cls:'ronin',look:{...T.DEF_LOOK}},{lv:8,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:5,q:{}});T.pl.eq.weapon=T.makeItem('r_start','weapon','katana',0,1)});
const out=[];
for(const [z,t] of [[0,'wolf'],[0,'boar'],[6,'rotstag'],[6,'treant'],[1,'lurker'],[8,'stalker'],[9,'gob'],[2,'raider'],[10,'bear'],[10,'drake'],[10,'shardslime'],[9,'lantern']]){
 const r=await p.evaluate(async([z,t])=>{const T=window.__T;T.enterZone(z);const m=T.S.mobs.find(m=>m.t===t);if(!m)return t+' MISSING';T.pl.x=m.x-60;T.pl.y=m.y;T.pl.hp=T.pl.mhp=9999;const hp0=T.pl.hp;
   await new Promise(r=>setTimeout(r,1800));const hurt=hp0-T.pl.hp,ep=T.S.eproj.length;T.killMob(m);return `${t} lv${m.lv} hurt:${hurt} eproj:${ep} st:${m.st}`},[z,t]);out.push(r);
 if(t==='treant'||t==='gob'||t==='bear'||t==='drake')await p.screenshot({path:'r3_'+t+'.png'})}
// drops
const drops=await p.evaluate(()=>{const T=window.__T;T.enterZone(0);let n=0,names=new Set();for(let i=0;i<120;i++){const m=T.S.mobs.find(q=>!q.dead&&q.t==='wolf');if(!m)break;T.killMob(m);Object.assign(m,T.spawnMob(m.def));}
  for(const d of T.S.drops)if(d.k==='gear'){n++;names.add(T.itemName(d.it))}return n+' '+[...names].slice(0,6).join(', ')});
console.log(out.join('\n'));console.log('wolf gear drops',drops);console.log(errs);await b.close()})();
