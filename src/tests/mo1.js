const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack.split('\n').slice(0,3).join(' | ')));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:35,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false});T.pl.cr={id:null,wait:9999}});
const ids=['rootspine','mossfen','brambledeep','northhills','swport','tangle','mistfall','tidehollow','deepcurrent','hollowfen','witherbasin','highroad','northrange','emberroad','ashenexp','cindergates','fracplateau'];
for(const id of ids){const r=await ev(id=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id===id);const z=T.ZONES[i];const par=T.ZONES[z.portals[0].to];const back=par.portals.find(p=>p.to===i);
  T.enterZone(i);T.pl.x=z.ww*.5;T.pl.y=T.topAt(T.pl.x)-1;T.pl.hp=T.pl.mhp;const n=z.npcs[0];let q='';if(n){T.openTalk(n);q=[...document.querySelectorAll('#dlga button')].map(b=>b.dataset.a).join(',');T.closeDlg()}
  return id+' lv'+z.lv+' ch:'+z.ch+' from '+par.id+'@'+(back&&back.x)+' nodes:'+z.nodes.map(n=>n.r)+' mobs:'+[...new Set(T.S.mobs.map(m=>m.t+':'+m.lv))].join(',')+' npc '+n+' '+q},id);
  console.log(r);await p.waitForTimeout(1300);await p.screenshot({path:`mo_${id}.png`})}
console.log('errs',errs);await b.close()})();
