const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{const T=window.__T;T.beginWith({name:'A',cls:'ronin',look:{...T.DEF_LOOK}},{lv:1,exp:0,sh:0,pt:0,inv:[],eq:null,sk:{},zone:5,q:{},fl:{crIntro:1,hints:9}});const out=[];
 for(const L of[1,5,10,15,20,25,30,35]){T.pl.lv=L;for(const s of['weapon','head','chest','hands','feet','charm'])T.pl.eq[s]=T.makeItem('wolf',s,s==='weapon'?'katana':null,1,L);T.recalc();
  const m=T.spawnMob(['wolf',0,500],L),b=T.spawnMob(['subject9',0,500],L);const atk=T.atkPow?T.atkPow():0;
  out.push('L'+L+' pl hp '+T.pl.mhp+' atk '+atk+' def '+T.pl.gs.def+' | wolf hp '+m.mhp+' atk '+m.atk+' exp '+m.exp+' → hits '+(m.mhp/atk).toFixed(1)+' | boss hp '+b.mhp+' atk '+b.atk+' → hits '+(b.mhp/atk).toFixed(0))}
 return out.join('\n')}));await b.close()})();
