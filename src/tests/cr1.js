const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);
const ev=(f,a)=>p.evaluate(f,a);const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:n+'.png'})};
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.5-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:5,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:6,q:{m1:{s:'d'},m2:{s:'d'}},mat:{timber:12,herb:9,hide:6,mush:3},fl:{crIntro:1}});T.pl.hp=T.pl.mhp=9999});
await ev(()=>{const T=window.__T;T.pl.cr.wait=0;T.crTick(.1)});
console.log('active',await ev(()=>JSON.stringify(window.__T.crAct())));
console.log('marks',await ev(()=>window.__T.S.mobs.filter(m=>m.cr).map(m=>m.d.name+':'+m.cr+':'+m.d.passive).join(',')));
// go near a clue
await ev(()=>{const T=window.__T;T.pl.x=330+190;T.pl.y=T.topAt(T.pl.x)});await shot('cr_clue');
console.log('near',await ev(()=>{const n=window.__T.crNear();return n&&n.k}));
await ev(()=>{const T=window.__T;T.crUse(T.crNear())});await shot('cr_panel');
await ev(()=>{const T=window.__T;T.closeCrisis&&0;T.unpause('crisis')});
// calm a mark
const calm=await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.cr==='mark'&&!q.dead);T.pl.x=m.x-10;T.pl.y=m.y;const n=T.crNear();if(n&&n.k==='calm'){T.crUse(n);return 'calmed '+T.crAct().rv}return 'no '+JSON.stringify(n&&n.k)});console.log(calm);
await ev(()=>{window.__T.crTick(420/1)});console.log('stage after time',await ev(()=>window.__T.crAct().st));
await ev(()=>{window.__T.crTick(420)});console.log('stage',await ev(()=>window.__T.crAct().st));
await ev(()=>{window.__T.enterZone(0)});console.log('outskirts crisis mobs',await ev(()=>window.__T.S.mobs.filter(m=>m.cr).map(m=>m.d.name+':'+m.cr+' hp'+m.mhp).join(',')));
await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.cr==='lt');T.pl.x=m.x-60;T.pl.y=m.y;m.aggro=5});await shot('cr_lt');
await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.cr==='lt');T.killMob(m)});console.log('after lt',await ev(()=>JSON.stringify(window.__T.crAct())));
// deliver
await ev(()=>{const T=window.__T;T.crDeliver('mat','timber');T.crDeliver('mat','herb');T.pl.mat.herb=10;T.pl.mat.mush=3;const R=T.RECIPES.find(r=>r.id==='calm');T.doCraft(R);T.crDeliver('rel','calm')});
console.log('rv',await ev(()=>{const C=window.__T.crAct();return C.st+' '+C.rv+' '+JSON.stringify(C.ln)}));
await ev(()=>{const T=window.__T;T.crAdd('combat',100)});console.log('break',await ev(()=>{const C=window.__T.crAct();return C.st+' th'+C.th}));
await ev(()=>{window.__T.enterZone(4)});console.log('road champ',await ev(()=>window.__T.S.mobs.filter(m=>m.cr==='champ').map(m=>m.d.name+' lv'+m.lv+' hp'+m.mhp).join(',')));
await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.cr==='champ');T.pl.x=m.x-70;T.pl.y=m.y;m.aggro=5});await shot('cr_champ');
await ev(()=>{const T=window.__T;T.openCrisis()});await shot('cr_panel2');await ev(()=>window.__T.unpause('crisis'));
await ev(()=>{const T=window.__T,m=T.S.mobs.find(q=>q.cr==='champ');T.killMob(m);T.crAdd('supply',60)});console.log('after champ',await ev(()=>{const C=window.__T.crAct();return C.st+' '+C.out}));
await ev(()=>{const T=window.__T;T.crAdd('supply',100)});console.log('legacy',await ev(()=>JSON.stringify(window.__T.pl.leg)+' cr '+JSON.stringify(window.__T.pl.cr)));
await ev(()=>{const T=window.__T;T.enterZone(6);T.pl.x=620+190-30;T.pl.y=T.topAt(T.pl.x)});await shot('cr_mem');
// failure path: bridge
await ev(()=>{const T=window.__T;T.pl.q.m3={s:'d'};T.startCrisis('bridge');T.crTick(420);T.crTick(420);T.crTick(420);T.crTick(300)});console.log('bridge',await ev(()=>{const C=window.__T.crAct();return C.st+' '+C.out}));
await ev(()=>{const T=window.__T;T.enterZone(1)});await shot('cr_flood');
console.log('save keys',await ev(()=>Object.keys(JSON.parse(localStorage.getItem('mossgate-px2')))));
console.log(errs);await b.close()})();
