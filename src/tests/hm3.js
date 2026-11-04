const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:10,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,waynet:1,ways:{town:2,outskirts:2},seen:{town:1,hearth:1,outskirts:1}},tmin:true,hm:{lot:0,tier:0,lay:['bed','hstone','chest',null],inv:{},stash:[],smat:{},grow:{}}});T.pl.cr={id:null,wait:9999}});
await ev(()=>{const T=window.__T;T.enterZone(5);T.pl.x=500+190;T.pl.y=T.topAt(T.pl.x)});await p.waitForTimeout(300);
await ev(()=>window.__T.useWay());await p.waitForTimeout(300);await p.screenshot({path:'hm_map.png'});
console.log(await ev(()=>!!document.querySelector('[data-mhome]')));await ev(()=>document.querySelector('[data-mhome]').click());await p.waitForTimeout(900);
console.log(await ev(()=>window.__T.GZ.id+' sh '+window.__T.pl.shards));console.log('ERR',errs.join('\n'));await b.close()})();
