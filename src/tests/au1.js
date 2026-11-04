const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:780,height:360},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push('console: '+m.text())});
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:12,exp:0,sh:500,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1},tmin:true});T.pl.cr={id:null,wait:9999};T.pl.hp=T.pl.mhp=99999});
const Z=await ev(()=>window.__T.ZONES.map((z,i)=>[i,z.id,z.ww,z.x0||190]));const out=[];
for(const[i,id,ww]of Z){if(id==='home')continue;
  for(const f of [.15,.6]){await ev(([i,f,id])=>{const T=window.__T;if(id==='deep'){T.deepEnter(3,true)}else T.enterZone(i);const Zz=T.GZ;T.pl.x=Zz.x0+(Zz.x1-Zz.x0)*f;T.pl.y=T.topAt(T.pl.x)-2;T.pl.vy=0;T.pl.hp=T.pl.mhp},[i,f,id]);
    await p.waitForTimeout(f===.15?1400:500);
    const ft=await ev(()=>new Promise(r=>{let n=0,t0=performance.now(),mx=0,last=t0;function s(t){mx=Math.max(mx,t-last);last=t;if(++n<40)requestAnimationFrame(s);else r([(t-t0)/40,mx])}requestAnimationFrame(s)}));
    out.push(id+'@'+f+' avg '+ft[0].toFixed(1)+' max '+ft[1].toFixed(0));await p.screenshot({path:`audit/z_${String(i).padStart(2,'0')}_${id}_${f}.png`})}}
console.log(out.join('\n'));console.log('ERR',[...new Set(errs)].join('\n'));await b.close()})();
