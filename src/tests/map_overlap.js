const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+(process.env.VW||590),height:+(process.env.VH||265)},deviceScaleFactor:1});const p=await ctx.newPage();
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:45,exp:0,sh:100,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1,hints:9},tmin:false,mat:{meat:20}});T.pl.cr={id:null,wait:9999};const s={};for(const z of T.ZONES)s[z.id]=1;T.pl.flags.seen=s});
await p.keyboard.press('m');await p.waitForTimeout(400);
const tabs=await ev(()=>[...document.querySelectorAll('#maptabs button')].map(b=>b.dataset.mv));
const report=async(name)=>{const r=await ev(()=>{const els=[...document.querySelectorAll('#mapgrid .mpr,#mapgrid .mpn,#mapgrid .mpx,#mapgrid .mpf')].map(e=>{const r=e.getBoundingClientRect();return{t:e.textContent.trim().slice(0,18),l:r.left,r:r.right,t2:r.top,b:r.bottom}});const g=document.querySelector('#mapgrid').getBoundingClientRect();
  let ov=[],out=[];for(let i=0;i<els.length;i++){const a=els[i];if(a.l<g.left-1||a.r>g.right+1||a.t2<g.top-1||a.b>g.bottom+1)out.push(a.t);for(let j=i+1;j<els.length;j++){const c=els[j];if(a.l<c.r-1&&c.l<a.r-1&&a.t2<c.b-1&&c.t2<a.b-1)ov.push(a.t+'×'+c.t)}}return{n:els.length,ov,out}});
  console.log(name.padEnd(12),'items',r.n,'overlaps',r.ov.length,r.ov.slice(0,4).join(' | '),'outside',r.out.length)};
for(const t of tabs){await ev(t=>document.querySelector(`#maptabs button[data-mv="${t}"]`).click(),t);await p.waitForTimeout(200);await report(t);if(t==='world'||t==='golden')await p.screenshot({path:'mp_'+t+'.png'})}
await b.close()})();
