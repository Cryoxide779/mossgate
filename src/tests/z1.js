const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:420}});const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'Z',cls:'ronin',look:{...T.DEF_LOOK}},{lv:12,exp:0,sh:0,pt:3,inv:[],eq:{},sk:{},zone:5,q:{}})});
const shots=[[5,1010],[5,1480],[6,980],[6,300],[7,300],[7,730],[7,1150],[8,400],[8,900],[9,810],[9,300],[10,600],[10,1130],[1,700],[2,300]];
for(const [z,x] of shots){await p.evaluate(([z,x])=>{const T=window.__T;T.enterZone(z,x)},[z,x]);await p.waitForTimeout(700);await p.screenshot({path:`z_${z}_${x}.png`})}
console.log(errs);await b.close()})();
