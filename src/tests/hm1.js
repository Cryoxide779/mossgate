const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const r=Date.now.bind(Date);window.__off=0;Date.now=()=>r()+window.__off;const D=16*60*1000;const cur=((Date.now()/1000)/(16*60)+.42)%1;window.__off+=((.45-cur+1)%1)*D});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:10,exp:0,sh:3000,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'}},mat:{herb:10,shard:9,timber:30,mush:6,ore:9,hide:9,salvage:3},fl:{crIntro:1},tmin:true});T.pl.cr={id:null,wait:9999}});
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
const go=async(id,x)=>{const i=await zi(id);await ev(([i,x])=>{const T=window.__T;T.enterZone(i);T.pl.x=x+190;T.pl.y=T.topAt(T.pl.x);T.pl.hp=T.pl.mhp},[i,x])};
const talk=(n)=>ev(n=>{const T=window.__T;if(T.DLG)T.closeDlg();T.openTalk(n);const btn=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');if(a)a.click();if(T.DLG)T.closeDlg();return n+':'+btn.join(',')},n);
await go('town',1200);await p.waitForTimeout(400);await p.screenshot({path:'hm_town.png'});
await go('hearth',150);await p.waitForTimeout(500);await p.screenshot({path:'hm_street0.png'});
console.log(await talk('fenn'));console.log(await talk('fenn'));await p.waitForTimeout(600);console.log('home',await ev(()=>JSON.stringify(window.__T.pl.home)));
await go('hearth',300);await p.waitForTimeout(300);console.log('near',await ev(()=>JSON.stringify(window.__T.S.nearCr)),await ev(()=>document.getElementById('talkbtn').textContent));
await p.screenshot({path:'hm_street1.png'});
await ev(()=>window.__T.homeUse({k:'door'}));await p.waitForTimeout(900);console.log('zone',await ev(()=>window.__T.GZ.id+' '+window.__T.pl.x));
await ev(()=>{const T=window.__T;T.pl.x=T.GZ.x0+130;});await p.waitForTimeout(400);console.log('nearbed',await ev(()=>JSON.stringify(window.__T.S.nearCr)));await p.screenshot({path:'hm_room.png'});
// craft & buy furniture, upgrade
console.log(await talk('fenn'));
await ev(()=>{const T=window.__T;for(const id of ['f_hearth','f_bench','f_planter','f_shelf','f_lamp','f_rug','f_trophy','f_hstone'])T.doCraft(T.RECIPES.find(r=>r.id===id));});
console.log('inv',await ev(()=>JSON.stringify(window.__T.pl.home.inv)));
await ev(()=>{const T=window.__T;T.pl.q.hm2&&(T.pl.q.hm2.n=12)});console.log(await talk('fenn'));await p.waitForTimeout(600);console.log(await talk('fenn'));
await ev(()=>{const T=window.__T;T.pl.q.hm3&&(T.pl.q.hm3.n=1200)});console.log(await talk('fenn'));await p.waitForTimeout(600);console.log('tier',await ev(()=>JSON.stringify(window.__T.pl.home)));
await ev(()=>{const T=window.__T;const H=T.pl.home;H.lay=['bed','rug','hearth','bench','planter','lamp','shelf','trophy','hstone','chest'];H.grow={4:{n:4,t:Date.now()}}});
await ev(()=>window.__T.enterHome(null));await p.waitForTimeout(900);
for(const fx of [0,.35,.7]){await ev(f=>{const T=window.__T;T.pl.x=T.GZ.x0+40+f*(T.GZ.ww-2*190);},fx);await p.waitForTimeout(400);await p.screenshot({path:'hm_in'+fx+'.png'})}
await ev(()=>{const T=window.__T;T.pl.x=T.GZ.x0+56});await p.waitForTimeout(300);console.log('ledger',await ev(()=>JSON.stringify(window.__T.S.nearCr)));
await ev(()=>window.__T.openArrange());await p.waitForTimeout(200);await p.screenshot({path:'hm_arr.png'});
await ev(()=>document.querySelector('[data-as="1"]').click());await ev(()=>document.querySelector('[data-ab="plant"]').click());await ev(()=>document.querySelector('[data-ap="plant"]').click());console.log('lay',await ev(()=>JSON.stringify(window.__T.pl.home.lay)+' inv '+JSON.stringify(window.__T.pl.home.inv)));
await ev(()=>document.getElementById('arrclose').click());
await ev(()=>window.__T.homeUse({k:'furn',f:'bed',i:0}));console.log('buff',await ev(()=>JSON.stringify(window.__T.pl.buffs)));
await ev(()=>window.__T.homeUse({k:'furn',f:'planter',i:4}));console.log('herb',await ev(()=>window.__T.pl.mat.herb));
await ev(()=>window.__T.openStash());await ev(()=>document.querySelector('[data-sm="in"]').click());await p.waitForTimeout(200);await p.screenshot({path:'hm_stash.png'});console.log('smat',await ev(()=>JSON.stringify(window.__T.pl.home.smat)));
await ev(()=>document.getElementById('stclose').click());
console.log('paused',await ev(()=>window.__T.S.paused));

// save roundtrip
const sv=await ev(()=>{const T=window.__T;return localStorage.getItem('mossgate-px2')});console.log('saved?',!!sv, sv&&JSON.parse(sv).hm?'hm ok':'', sv&&JSON.parse(sv).zone);
await ev(()=>window.__T.homeUse({k:'hdoor'}));await p.waitForTimeout(900);console.log('back',await ev(()=>window.__T.GZ.id+' '+window.__T.pl.x));
console.log('ERR',errs.join('\n'));await b.close()})();
