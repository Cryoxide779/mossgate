const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:10,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999}});
for(const t of ['bogslime','sapslime','shardslime']){
console.log(t,await ev(async t=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id==='road');T.enterZone(i);T.S.mobs.length=0;const x=T.pl.x+90;T.S.mobs.push(T.spawnMob([t,0,x,10]));const m=T.S.mobs[0];m.x=x;m.y=T.topAt(x);const h0=m.hp;
  T.pl.face=1;T.S.proj.push({k:'axe',x:T.pl.x+12,y:T.pl.y-19,vx:230,vy:0,t:0,life:1.1,mult:1.4,pierce:true,hit:new Set(),f:1,dl:0,ret:.5});await new Promise(r=>setTimeout(r,900));return h0+'->'+m.hp},t))}
await b.close()})();
