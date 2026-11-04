const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.5-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:12,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1}});T.pl.cr={id:null,wait:9999};T.pl.hp=T.pl.mhp=999999;
  const tz=T.ZONES.find(z=>z.id==='town');const po=tz.portals[tz.portals.length-1];T.pl.x=po.x;T.pl.y=T.topAt(po.x)});
await p.waitForTimeout(600);await p.screenshot({path:'dp_town.png'});
await ev(()=>{window.__T.openDeep()});await p.waitForTimeout(400);await p.screenshot({path:'dp_menu.png'});await ev(()=>window.__T.unpause('deepm'));
for(const n of [1,10,23,30,45,50,77,100]){await ev(n=>window.__T.deepEnter(n),n);await p.waitForTimeout(900);
  const info=await ev(()=>{const T=window.__T;T.pl.hp=T.pl.mhp=999999;return T.GZ.name+' | '+T.GZ.ch+' | mobs '+T.S.mobs.filter(m=>m.di!=null).map(m=>m.t+':'+m.lv).join(',')});console.log(n,info);
  if([1,10,50,77,100].includes(n)){await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.d.bb||q.d.boss)||T.S.mobs[2];if(m){T.pl.x=m.x-90;T.pl.y=m.y;m.aggro=4}});await p.waitForTimeout(1200);await p.screenshot({path:'dp_f'+n+'.png'})}}
await ev(()=>window.__T.deepEnter(5));await p.waitForTimeout(800);
await ev(()=>{const T=window.__T;for(const m of T.S.mobs)if(m.di!=null&&!m.dead)T.killMob(m)});await p.waitForTimeout(800);
console.log('after clear',await ev(()=>JSON.stringify(window.__T.DP())+' portals '+window.__T.GZ.portals.length));
await ev(()=>{const T=window.__T,st=T.GZ.portals[T.GZ.portals.length-1];T.pl.x=st.x;T.pl.y=st.y});await p.waitForTimeout(500);await p.screenshot({path:'dp_stair.png'});
console.log(errs);await b.close()})();
