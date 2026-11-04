const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:667,height:375},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.5-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:10,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'},m3:{s:'d'},m8:{s:'d'},m9:{s:'d'}},fl:{crIntro:1},leg:{herd:'win',bridge:'fail',signal:'win',scar:'fail'}});T.pl.hp=T.pl.mhp=99999});
for(const [id,z,x] of [['signal',9,1000]]){
 await ev(([id,z,x])=>{const T=window.__T;T.startCrisis(id);T.crAct().st=2;T.enterZone(z);T.pl.x=x;T.pl.y=T.topAt(x)},[id,z,x]);await p.waitForTimeout(2100);await p.screenshot({path:'cv_'+id+'.png'})}
await ev(()=>{const T=window.__T;T.enterZone(7);T.pl.x=880+190-40;T.pl.y=T.topAt(T.pl.x)});await p.waitForTimeout(400);await p.screenshot({path:'cv_mem.png'});
console.log(errs);await b.close()})();
