const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
const r=await p.evaluate(()=>{const T=window.__T,Q=T.QUESTS,o=[];T.beginWith({name:'A',cls:'ronin',look:{...T.DEF_LOOK}},{lv:35,exp:0,sh:0,pt:3,inv:[],eq:null,sk:{},zone:5,q:{},fl:{crIntro:1,hints:9}});T.pl.cr={id:null,wait:9999};
 const zoneOf={};T.ZONES.forEach((z,i)=>(z.npcs||[]).forEach(n=>{if(zoneOf[n]==null)zoneOf[n]=i}));
 const talk=n=>{if(T.DLG)T.closeDlg();T.enterZone(zoneOf[n]);T.openTalk(n);const a=document.querySelector('[data-a^="done:"]')||document.querySelector('[data-a^="acc:"]');const r=a?a.dataset.a:'-';if(a)a.click();if(T.DLG)T.closeDlg();return r};
 const order=['m1','m2','m3','c1','m12','m13','m14','m15','m16','m17','c3a','c3b','c4a','c4b','m7','m18','m19','m8','m4','m9','m10','m11','m5','m6','m20'];
 for(const k of order){const q=Q[k];const a=talk(q.giver);const st=T.pl.q[k];if(!st){o.push(k+' NOT ACCEPTED ('+a+')');break}
   if(q.goal.t!=='talk')st.n=q.goal.n||1;const to=q.to||(q.goal.t==='talk'?q.goal.npc:q.giver);const d=talk(to);if(T.pl.q[k].s!=='d'){o.push(k+' NOT DONE at '+to+' ('+d+')');break}o.push(k+' ✓ ch'+q.ch+' '+q.title)}
 o.push('final lv '+T.pl.lv+' exp '+T.pl.exp+' mastery '+JSON.stringify(T.pl.mx));return o.join('\n')});
console.log(r,errs);await b.close()})();
