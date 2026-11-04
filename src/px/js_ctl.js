/* ---------- custom touch controls: move and resize every button, joystick size and mode ---------- */
const CTL_K='mossgate-ctl';
const CTL_DEF=()=>({b:{},op:1,stick:{mode:'float',s:1,x:.1,y:.8}});
let CTL=(()=>{try{const c=JSON.parse(localStorage.getItem(CTL_K)||'null');return c&&c.b?{...CTL_DEF(),...c,stick:{...CTL_DEF().stick,...(c.stick||{})}}:CTL_DEF()}catch(_){return CTL_DEF()}})();
const CTL_N={'b-atk':'Attack','b-jump':'Jump','b-s1':'Skill 1','b-s2':'Skill 2','b-s3':'Skill 3','b-roll':'Roll','b-guard':'Guard','b-pot':'Tonic'};
let CBASE={};
const pbs=()=>[...document.querySelectorAll('#pad .pb')];
function ctlSave(){try{localStorage.setItem(CTL_K,JSON.stringify(CTL))}catch(_){}}
function clearInline(b){for(const k of['position','left','top','right','bottom','width','height','fontSize'])b.style[k]=''}
function measureBase(){const tv=$('touch').hidden;$('touch').hidden=false;for(const b of pbs()){if(CBASE[b.id])continue;const hid=b.hidden;b.hidden=false;clearInline(b);const r=b.getBoundingClientRect();if(r.width<4){b.hidden=hid;continue}
    CBASE[b.id]={w:r.width,h:r.height,x:(r.left+r.width/2)/innerWidth,y:(r.top+r.height/2)/innerHeight,fs:parseFloat(getComputedStyle(b).fontSize)||9};b.hidden=hid}$('touch').hidden=tv}
function applyBtn(b){const c=CTL.b[b.id],B=CBASE[b.id];if(!c||!B){clearInline(b);return}const s=clamp(c.s||1,.5,1.8),w=B.w*s,h=B.h*s,x=c.x??B.x,y=c.y??B.y;
  Object.assign(b.style,{position:'fixed',right:'auto',bottom:'auto',width:w+'px',height:h+'px',left:clamp(x*innerWidth-w/2,0,innerWidth-w)+'px',top:clamp(y*innerHeight-h/2,0,innerHeight-h)+'px',fontSize:(B.fs*Math.min(1.3,Math.max(.8,s)))+'px'})}
function applyCtl(){if(!isTouch)return;measureBase();for(const b of pbs())applyBtn(b);$('touch').style.opacity=CTL.op;stick.style.transform=CTL.stick.s!==1?`scale(${CTL.stick.s})`:'';stickRest()}
function stickRest(){if(CTL.stick.mode==='fixed'||document.body.classList.contains('ctled')){stick.style.left=(CTL.stick.x*innerWidth)+'px';stick.style.top=(CTL.stick.y*innerHeight)+'px'}else{stick.style.left='80px';stick.style.top=(innerHeight-80)+'px'}knob.style.transform=''}
addEventListener('resize',()=>{CBASE={};setTimeout(applyCtl,60)});
/* editor */
let CE=null;
function openCtlEd(){if(!isTouch)return;if(!$('gmenu').hidden)$('gmenu').hidden=true;CE={sel:null,drag:null,hid:{}};S.paused=true;for(const k in inp)inp[k]=0;
  $('touch').hidden=false;measureBase();for(const b of pbs()){CE.hid[b.id]=b.hidden;b.hidden=false}document.body.classList.add('ctled');$('ctlbar').hidden=false;applyCtl();renderCtlBar()}
function closeCtlEd(){if(!CE)return;for(const b of pbs())b.hidden=CE.hid[b.id];document.body.classList.remove('ctled');$('ctlbar').hidden=true;pbs().forEach(b=>b.classList.remove('sel'));CE=null;ctlSave();applyCtl();
  setupClassUI();S.paused=['inv','tree','quests','prolog','craft','board','market','crisis','deepm','gmenu'].some(k=>$(k)&&!$(k).hidden)||!!DLG}
function renderCtlBar(){const sel=CE.sel,isStick=sel==='stick',c=sel&&!isStick?(CTL.b[sel]||{s:1}):null,pct=v=>Math.round(v*100);
  $('ctlbar').innerHTML=`<div class="cth"><b>Edit controls</b><span>${sel?(isStick?'Joystick':CTL_N[sel])+' selected':'Drag any button or the joystick to move it. Tap one to resize it.'}</span></div>
   <div class="ctrow">${sel&&!isStick?`<label>Size <input type="range" min="50" max="180" step="5" value="${pct(c.s||1)}" data-ct="size"><em>${pct(c.s||1)}%</em></label><button class="btn sm alt" data-ct="resetone">Reset button</button>`:''}
   ${isStick?`<label>Size <input type="range" min="60" max="160" step="5" value="${pct(CTL.stick.s)}" data-ct="ssize"><em>${pct(CTL.stick.s)}%</em></label>`:''}
   <label>Opacity <input type="range" min="25" max="100" step="5" value="${pct(CTL.op)}" data-ct="op"><em>${pct(CTL.op)}%</em></label>
   <span class="ctseg">Joystick <button class="btn sm${CTL.stick.mode==='float'?'':' alt'}" data-ct="float">Follows thumb</button><button class="btn sm${CTL.stick.mode==='fixed'?'':' alt'}" data-ct="fixed">Fixed</button></span></div>
   <div class="ctrow"><button class="btn sm alt" data-ct="resetall">${CE.askR?'Tap again to reset everything':'Reset all'}</button><button class="btn sm" data-ct="done">Done</button></div>`;
  pbs().forEach(b=>b.classList.toggle('sel',b.id===sel));stick.classList.toggle('sel',isStick)}
$('ctlbar').addEventListener('input',e=>{const t=e.target.dataset.ct;if(!t||!CE)return;const v=(+e.target.value)/100;
  if(t==='size'){const id=CE.sel,B=CBASE[id];CTL.b[id]={x:B.x,y:B.y,...(CTL.b[id]||{}),s:v};applyBtn($(id))}else if(t==='ssize'){CTL.stick.s=v;stick.style.transform=`scale(${v})`}else if(t==='op'){CTL.op=v;$('touch').style.opacity=v}
  const em=e.target.parentNode.querySelector('em');if(em)em.textContent=Math.round(v*100)+'%'});
$('ctlbar').addEventListener('click',e=>{const b=e.target.closest('[data-ct]');if(!b||!CE||b.tagName==='INPUT')return;const t=b.dataset.ct;
  if(t==='done')return closeCtlEd();if(t==='resetone'){delete CTL.b[CE.sel];applyBtn($(CE.sel))}if(t==='float'||t==='fixed'){CTL.stick.mode=t}
  if(t==='resetall'){if(!CE.askR){CE.askR=1;return renderCtlBar()}CTL=CTL_DEF();CE.sel=null;applyCtl()}CE.askR=0;renderCtlBar()});
document.addEventListener('pointerdown',e=>{if(!CE)return;const b=e.target.closest('#pad .pb');const onStick=!b&&Math.hypot(e.clientX-parseFloat(stick.style.left),e.clientY-parseFloat(stick.style.top))<58*CTL.stick.s;
  if(!b&&!onStick)return;e.preventDefault();e.stopPropagation();const r=b?b.getBoundingClientRect():null;
  CE.drag={id:b?b.id:'stick',pid:e.pointerId,ox:b?e.clientX-(r.left+r.width/2):e.clientX-parseFloat(stick.style.left),oy:b?e.clientY-(r.top+r.height/2):e.clientY-parseFloat(stick.style.top),sx:e.clientX,sy:e.clientY,moved:false};
  CE.sel=CE.drag.id;renderCtlBar()},true);
document.addEventListener('pointermove',e=>{if(!CE||!CE.drag||e.pointerId!==CE.drag.pid)return;e.preventDefault();const D=CE.drag;if(Math.hypot(e.clientX-D.sx,e.clientY-D.sy)>4)D.moved=true;if(!D.moved)return;
  const x=clamp((e.clientX-D.ox)/innerWidth,0,1),y=clamp((e.clientY-D.oy)/innerHeight,0,1);
  if(D.id==='stick'){CTL.stick.x=x;CTL.stick.y=y;if(CTL.stick.mode==='float')CTL.stick.mode='fixed';stickRest()}else{CTL.b[D.id]={s:1,...(CTL.b[D.id]||{}),x,y};applyBtn($(D.id))}},true);
['pointerup','pointercancel'].forEach(ev=>document.addEventListener(ev,e=>{if(!CE||!CE.drag||e.pointerId!==CE.drag.pid)return;const mv=CE.drag.moved;CE.drag=null;if(mv)renderCtlBar()},true));
{let ok=false;setInterval(()=>{const on=document.body.classList.contains('playing');if(on&&!ok){ok=true;CBASE={};applyCtl()}else if(!on)ok=false},300)}
