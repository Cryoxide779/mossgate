const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'gatherer',look:{...T.DEF_LOOK}},{lv:20,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{hints:9},mat:{}});T.pl.cr={id:null,wait:9999};
  for(const d of['smith','wood','leather','alchemy','cooking'])T.pl.dx[d]=99999});
// every new material has nodes somewhere, and gathering one works
console.log(await ev(()=>{const T=window.__T;const where={};for(const z of T.ZONES)for(const n of z.nodes||[])(where[n.r]=where[n.r]||[]).push(z.id);
  const miss=Object.keys(T.RES).filter(k=>!where[k]&&!['hide','meat','salvage','fish','shard'].includes(k));return 'missing nodes: '+JSON.stringify(miss)+'\n'+Object.entries(where).map(([k,v])=>k+':'+[...new Set(v)].length).join(' ')}));
const zi=id=>ev(id=>window.__T.ZONES.findIndex(z=>z.id===id),id);
for(const [z,r] of [['riversmeet','riverreed'],['quarry','copper'],['falls','kelp'],['bog','bogstone'],['scar','hollowglass']]){const i=await zi(z);
  await ev(([i,r])=>{const T=window.__T;T.enterZone(i);const n=T.Z.nodes.find(n=>n.r===r);T.pl.x=n.x;T.pl.y=T.topAt(n.x)-1;T.pl.hp=T.pl.mhp},[i,r]);await p.waitForTimeout(1500);
  await p.screenshot({path:`mt_${r}.png`,clip:{x:270,y:150,width:300,height:140}});
  console.log(r,await ev(r=>{const T=window.__T;const n=T.Z.nodes.find(n=>n.r===r);T.S.t+=2;T.gather(n);return T.pl.mat[r]},r))}
// craft every new recipe with plenty of materials
console.log(await ev(()=>{const T=window.__T;const out=[];for(const k in T.RES)T.pl.mat[k]=50;T.pl.bag=[];const R0=T.RECIPES.filter(r=>['ashbow','reedsandal','embercharm','copstaff','granmaul','irshield','shellshield','slateplate','riftknives','hglassstaff','limejerk'].includes(r.id));
  for(const R of R0){T.doCraft(R);const it=T.pl.bag[T.pl.bag.length-1];out.push(R.id+' → '+(it?T.itemName(it)+' '+JSON.stringify(it.st):T.S.craftMsg))}return out.join('\n')}));
await ev(()=>{const T=window.__T;T.enterZone(0);T.openCraft({k:'forge',n:'Workyard'});});await p.waitForTimeout(300);
await ev(()=>{const b=[...document.querySelectorAll('#craft [data-r],#craft [data-id],#craft button')].find(b=>/Copper Conduit/.test(b.textContent));if(b)b.click()});await p.waitForTimeout(300);await p.screenshot({path:'mt_craft.png'});
console.log('errs',errs);await b.close()})();
