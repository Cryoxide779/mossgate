const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{const T=window.__T;const need=l=>Math.floor(30*Math.pow(l,1.85));const qlv={};
 const lvOf=k=>{if(qlv[k])return qlv[k];const q=T.QUESTS[k];return qlv[k]=q.lv||(q.pre&&T.QUESTS[q.pre]?lvOf(q.pre):1)};
 const out=[];for(const r of T.REGIONS.filter(r=>r.built)){let nd=0;for(let l=r.lv[0];l<r.lv[1];l++)nd+=need(l);
  const qs=Object.keys(T.QUESTS).filter(k=>{const l=lvOf(k);return l>=r.lv[0]&&l<r.lv[1]||(r.lv[1]===35&&l===35)});let qx=0;for(const k of qs){const q=T.QUESTS[k];qx+=(q.reward&&q.reward.exp)||0;if(q.choices)qx+=Math.max(...q.choices.map(c=>(c.reward&&c.reward.exp)||0))}
  const zs=T.ZONES.filter(z=>T.ZBAND[z.id]&&T.ZBAND[z.id][0]===r.id&&z.mobs.length);const base=zs.flatMap(z=>z.mobs.map(d=>T.MOBS[d[0]])).filter(d=>!d.bb&&!d.boss);const avg=base.reduce((a,d)=>a+d.exp,0)/Math.max(1,base.length);const mid=(r.lv[0]+r.lv[1])/2;const pk=avg*(1+.3*(mid-1))*(1+.04*(mid-1));
  out.push(r.n.padEnd(20)+' need '+String(nd).padStart(6)+' · '+String(qs.length).padStart(2)+' quests '+String(qx).padStart(6)+' ('+Math.round(qx/nd*100)+'%) · mob exp '+Math.round(pk)+' → ~'+Math.max(0,Math.round((nd-qx)/pk))+' kills')}
 return out.join('\n')}));await b.close()})();
