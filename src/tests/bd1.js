const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.5-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:9,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:14,q:{m1:{s:'d'},m2:{s:'d'}},mat:{meat:5,mush:3,herb:3},fl:{crIntro:1},comp:{own:['wolf'],act:null}});T.pl.cr={id:null,wait:9999};T.pl.hp=T.pl.mhp=99999});
console.log('migrated',await ev(()=>JSON.stringify(window.__T.CB())));
let got=0;for(let k=0;k<8&&!got;k++){got=await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.t==='sporecap'&&!q.dead);if(!m)return 0;T.pl.x=m.x-12;T.pl.y=m.y;m.stun=2;const n=T.bondNear();if(!n)return 0;T.befriend(n.m);return Object.keys(T.CB().b).length>1?1:0});}
console.log('befriended',got,await ev(()=>JSON.stringify(window.__T.CB())));
await ev(()=>{const T=window.__T,c=T.CB(),id=c.own.find(k=>k.startsWith('sporecap'))||c.own[0];c.act=id;T.addTrust(c.b[id],85);T.setCmd('attack');T.enterZone(14)});
await p.waitForTimeout(1500);await p.screenshot({path:'bd_field.png'});
await ev(()=>{window.__T.openQuests()});await p.waitForTimeout(300);await p.screenshot({path:'bd_panel.png'});
await ev(()=>{const T=window.__T;T.unpause('quests');T.CB().act='wolf';T.CB().b.wolf.tr=90;T.enterZone(10);T.pl.x=700;T.pl.y=T.topAt(700)});await p.waitForTimeout(2500);await p.screenshot({path:'bd_fight.png'});
console.log(errs);await b.close()})();
