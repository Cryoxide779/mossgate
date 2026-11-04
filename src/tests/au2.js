const {chromium}=require('playwright');
const VP=process.argv[2]||'780x360';const [vw,vh]=VP.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:1,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await p.screenshot({path:`audit/o_${VP}_title.png`});
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:9,exp:0,sh:500,pt:3,inv:[],eq:null,sk:{},zone:5,q:{m1:{s:'d'},m2:{s:'d'},m3:{s:'a',n:1}},mat:{herb:5,ore:4,timber:6,shard:3},fl:{crIntro:1},tmin:true,hm:{lot:0,tier:1,lay:['bed','chest',null,null,null,null,null],inv:{rug:1},stash:[],smat:{},grow:{}}});T.pl.cr={id:null,wait:9999};T.pl.bag=[T.makeItem('wolf','chest',null,1,5),T.makeItem('boar','weapon','axe',2,7),T.makeItem('wolf','head',null,0,3)]});
await p.waitForTimeout(600);
const shots=[['inv',()=>window.__T.openInv()],['tree',()=>window.__T.openTree()],['quests',()=>window.__T.openQuests()],['craft',()=>window.__T.openCraft({k:'forge',n:'Forge'})],['board',()=>window.__T.openBoard&&window.__T.openBoard({k:'board',n:'Board'})],['market',()=>window.__T.openMarket()],['deep',()=>window.__T.openDeep()],['menu',()=>window.__T.openMenu()],['map',()=>window.__T.openMap()],['arrange',()=>window.__T.openArrange()],['stash',()=>window.__T.openStash()],['talk',()=>window.__T.openTalk('tobin')],['ctl',()=>window.__T.openCtlEd()]];
for(const[n,f]of shots){try{await ev(f);await p.waitForTimeout(300);await p.screenshot({path:`audit/o_${VP}_${n}.png`})}catch(e){errs.push(n+': '+e.message.split('\n')[0])}
  await ev(()=>{const T=window.__T;if(T.DLG)T.closeDlg();for(const id of ['inv','tree','quests','craft','board','market','crisis','deepm','gmenu','mapov','arrange','stash','visit'])T.unpause(id);const c=document.getElementById('ctldone');if(c&&!document.getElementById('ctlbar').hidden)c.click()});await p.waitForTimeout(150)}
await ev(()=>{const T=window.__T;T.pl.hp=0;T.pl.mhp=10});await p.waitForTimeout(1500);await p.screenshot({path:`audit/o_${VP}_dead.png`});
console.log('ERR',errs.join('\n'));await b.close()})();
