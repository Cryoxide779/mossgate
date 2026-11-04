const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>{const T=window.__T,out=[];for(const z of T.ZONES){if(!z.tall)continue;const S=z.SEG.filter(s=>s.t!=='solid'||true);
  const wet=(s)=>(z.pools||[]).some(p=>s.x<p.x1&&s.x+s.w>p.x0&&s.bed);
  // reachable: start at portal x0 ground
  const px=z.portals[0].x;let start=-1;S.forEach((s,i)=>{if(px>=s.x&&px<=s.x+s.w&&!s.bed&&(start<0||s.y<S[start].y))start=i});if(start<0){out.push(z.id+' no start');continue}
  const seen=new Set([start]),q=[start];
  while(q.length){const a=S[q.shift()];const jr=wet(a)?33:44;S.forEach((b,i)=>{if(seen.has(i))return;const rise=a.y-b.y;const gap=Math.max(0,Math.max(a.x,b.x)-Math.min(a.x+a.w,b.x+b.w));
    let ok=false;if(rise<=jr&&rise>=0)ok=gap<=34;else if(rise<0)ok=gap<=34+Math.min(60,-rise*.4);
    if(b.t==='solid'&&a.t==='solid'&&Math.abs(rise)<1&&gap<=1)ok=true;if(ok){seen.add(i);q.push(i)}})}
  const sm=S.findIndex(s=>s.y===z.summit[1]&&z.summit[0]>=s.x&&z.summit[0]<=s.x+s.w);
  const slabs=S.map((s,i)=>i).filter(i=>z.seg[i][3]==='f'&&z.seg[i][2]<250+z.tall-60);const unr=slabs.filter(i=>!seen.has(i)).length;
  out.push(z.id+' summit '+(seen.has(sm)?'REACHABLE':'UNREACHABLE')+' high ledges unreachable '+unr+'/'+slabs.length)}return out.join('\n')}));await b.close()})();
