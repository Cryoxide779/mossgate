const {chromium}=require('playwright');
const NOON=`(()=>{const r=Date.now.bind(Date),b=(Math.floor(r()/960000)+0.08)*960000,s=r();window.__off=0;Date.now=()=>b+window.__off+(r()-s)})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390}});await ctx.addInitScript(NOON);const p=await ctx.newPage();
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:45,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999}});
let zones=process.argv.slice(2);if(zones[0]==='ALL')zones=await ev(()=>window.__T.ZONES.filter(z=>(z.cache&&z.cache[1])||z.portals.some(p=>p.yy)).map(z=>z.id));
for(const id of zones){
 const info=await ev(id=>{const T=window.__T;const i=T.ZONES.findIndex(z=>z.id===id);const z=T.ZONES[i];T.enterZone(i);T.pl.hp=T.pl.mhp=99999;for(const m of T.S.mobs)m.dead=true;
   let tx,ty;if(z.cache&&z.cache[1]){tx=z.cache[0];ty=z.cache[1]}else{const po=z.portals.find(p=>p.yy);if(!po)return null;tx=po.x;ty=po.yy}
   const steps=z.SEG.filter(s=>s.plank&&s.y>=ty&&Math.abs(s.x+s.w/2-tx)<90).sort((a,b)=>b.y-a.y).map(s=>[s.x,s.w,s.y]);T.pl.x=tx-50;T.pl.y=T.topAt(T.pl.x);return {tx,ty,steps}},id);
 if(!info){continue}let ok=false;
 for(let it=0;it<80&&!ok;it++){
  const st=await ev(()=>{const T=window.__T;return{x:T.pl.x,y:T.pl.y,g:T.pl.onG}});
  if(Math.abs(st.y-info.ty)<1&&st.g){ok=true;break}
  // next step: lowest plank above current y
  const nxt=info.steps.filter(s=>s[2]<st.y-1).sort((a,b)=>b[2]-a[2])[0];if(!nxt)break;
  const cx=nxt[0]+nxt[1]/2,dir=cx>st.x?'ArrowRight':'ArrowLeft';
  if(!st.g){await p.waitForTimeout(60);continue}
  const onPlank=st.y<(await ev(x=>window.__T.topAt(x),st.x))-1;if(!onPlank&&Math.abs(cx-st.x)>30){await p.keyboard.down(dir);await p.waitForTimeout(Math.min(400,(Math.abs(cx-st.x)-35)/86*1000));await p.keyboard.up(dir);continue}
  await p.keyboard.down('z');await p.waitForTimeout(80);await p.keyboard.up('z');await p.keyboard.down(dir);await p.waitForTimeout(Math.min(320,Math.abs(cx-st.x)/86*1000+60));await p.keyboard.up(dir);await p.waitForTimeout(250);
 }
 {const st=await ev(()=>window.__T.pl.y);await p.waitForTimeout(500);const st2=await ev(()=>window.__T.pl.y);if(Math.abs(st2-info.ty)<2)ok=true}
 console.log(id,ok?'CLIMBED':'FAILED',JSON.stringify(await ev(()=>{const T=window.__T;return[Math.round(T.pl.x),Math.round(T.pl.y)]})),'target',info.tx,info.ty,'steps',info.steps.length);
 if(!ok)await p.screenshot({path:'vt_fail_'+id+'.png'});
}
await b.close()})();
