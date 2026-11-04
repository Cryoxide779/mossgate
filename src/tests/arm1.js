const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.stack));
await p.goto('file://'+process.cwd()+'/dbgp.html');await p.waitForTimeout(700);const ev=(f,a)=>p.evaluate(f,a);
await ev(()=>{const T=window.__T;T.beginWith({name:'Aya',cls:'ronin',look:{...T.DEF_LOOK,sex:1}},{lv:12,exp:0,sh:300,pt:3,inv:[],eq:null,sk:{},zone:0,q:{m1:{s:'d'},m2:{s:'d'}},fl:{crIntro:1},tmin:true});T.pl.cr={id:null,wait:9999};
  for(const d of['axes','hammer','polearm','shield','restore','ward','exorcism'])T.pl.dx[d]=99999;T.recalc();T.pl.hp=T.pl.mhp=5000;T.pl.mp=T.pl.mmp=999});
// sprite sheet of weapon frames
const url=await ev(()=>{const T=window.__T,c=document.createElement('canvas');c.width=4*64*3+20;c.height=4*44*3+20;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.fillStyle='#2a3a30';x.fillRect(0,0,c.width,c.height);
  ['axe','hammer','spear','shield'].forEach((w,r)=>{T.pl.eq.weapon=T.makeItem('r_start','weapon',w,0);T.rebuildPA();const PA=T.buildChar(T.pl.ch,T.pl.eq);[PA.idleS[0],PA.atk[0],PA.atk[1],PA.atk[2]].forEach((im,i)=>x.drawImage(im,10+i*192,10+r*132,192,126))});return c.toDataURL()});
require('fs').writeFileSync('arm_sheet.png',Buffer.from(url.split(',')[1],'base64'));
const res=[];
for(const [w,d] of [['axe','axes'],['hammer','hammer'],['spear','polearm'],['shield','shield']]){
  await ev(([w,d])=>{const T=window.__T;T.pl.eq.weapon=T.makeItem('r_start','weapon',w,0);T.recalc();T.rebuildPA();T.setupClassUI();T.pl.lo=[d+'1',d+'2',d+'U'];T.pl.sk[{axes:'x_ult',hammer:'h_ult',polearm:'p_ult',shield:'g_ult'}[d]]=1;T.recalc();
    const m=T.S.mobs.find(q=>!q.dead);T.pl.x=m.x-30;T.pl.y=m.y;T.pl.face=1;T.pl.mp=999},[w,d]);
  for(const k of ['attack','s1','s2','s3']){await ev(k=>{const T=window.__T;T.pl.cd=0;T.pl.slotCd=[0,0,0];T.inp[k]=1},k);await p.waitForTimeout(120);await ev(k=>{window.__T.inp[k]=0},k);await p.waitForTimeout(500)}
  if(w==='axe')await p.screenshot({path:'arm_axe.png'});
  res.push(w+' ok mp '+await ev(()=>Math.round(window.__T.pl.mp)));}
for(const d of ['restore','ward','exorcism']){
  await ev(d=>{const T=window.__T;T.pl.lo=[d+'1',d+'2',d+'U'];T.pl.sk[{restore:'e_ult',ward:'v_ult',exorcism:'o_ult'}[d]]=1;T.recalc();T.setupClassUI();T.pl.hp=T.pl.mhp*.4;T.pl.mp=999;T.enterZone(T.ZONES.findIndex(z=>z.id==='shrine'));T.pl.x=560;T.pl.y=T.topAt(560)},d);await p.waitForTimeout(400);
  for(const k of ['s1','s2','s3']){await ev(k=>{const T=window.__T;T.pl.slotCd=[0,0,0];T.inp[k]=1},k);await p.waitForTimeout(120);await ev(k=>{window.__T.inp[k]=0},k);await p.waitForTimeout(350)}
  await p.screenshot({path:'arm_'+d+'.png'});res.push(d+' hp '+await ev(()=>Math.round(window.__T.pl.hp)+'/'+window.__T.pl.mhp+' ward '+Math.round(window.__T.pl.wardHP||0)));}
console.log(res.join('\n'));console.log(errs);await b.close()})();
