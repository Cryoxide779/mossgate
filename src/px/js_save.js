/* ---------- save transfer: move a character between devices (claude.ai, browser, Android app) ---------- */
const SAVE_K='mossgate-px2';
function svHash(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h.toString(16).padStart(8,'0')}
function saveCode(){if(pl.ch)save();const raw=localStorage.getItem(SAVE_K);if(!raw)return null;const b=btoa(unescape(encodeURIComponent(raw)));return'MG1.'+b+'.'+svHash(b)}
function readCode(txt){const t=String(txt||'').replace(/\s+/g,'');const m=t.match(/^MG1\.([A-Za-z0-9+/=]+)\.([0-9a-f]{8})$/);if(!m)return{err:'That does not look like a MossGate save code.'};
  if(svHash(m[1])!==m[2])return{err:'The code is incomplete or was changed. Copy the whole code again.'};
  try{const sv=JSON.parse(decodeURIComponent(escape(atob(m[1]))));if(!sv||!sv.ch||!sv.ch.name)return{err:'The code has no character in it.'};return{sv,raw:JSON.stringify(sv)}}catch(_){return{err:'The code could not be read.'}}}
let GM={msg:'',ask:null,code:''};
function openMenu(fromTitle){GM={msg:'',ask:null,code:'',title:!!fromTitle};if(fromTitle){$('gmenu').hidden=false}else pauseFor('gmenu');renderMenu()}
function closeMenu(){if(GM.title){$('gmenu').hidden=true;return}unpause('gmenu')}
const NATIVE=()=>!!(window.Capacitor&&window.Capacitor.isNativePlatform&&window.Capacitor.isNativePlatform());
const appPlugin=()=>NATIVE()&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
function toTitle(){if(pl.ch)save();try{if(typeof netLeave==='function')netLeave()}catch(_){}setTimeout(()=>location.reload(),150)}
function exitGame(){if(pl.ch)save();const A=appPlugin();if(A&&A.exitApp)A.exitApp();else toTitle()}
function renderMenu(){const sv=loadSave(),has=!!(sv&&sv.ch);
  $('gmgame').hidden=GM.title;$('gmgame').innerHTML=GM.title?'':`<div class="hdr"><span>Menu</span><small>Paused</small></div><div class="crbtns"><button class="btn sm" data-gm="resume">Resume</button><button class="btn sm alt" data-gm="map">Map</button><button class="btn sm alt" data-gm="save">Save now</button>${isTouch?'<button class="btn sm alt" data-gm="ctl">Edit controls</button>':''}<button class="btn sm alt" data-gm="title">${GM.askT?'Tap again: save and return to title':'Return to title'}</button>${NATIVE()?`<button class="btn sm alt" data-gm="exit">${GM.askX?'Tap again: save and exit':'Exit game'}</button>`:''}</div>${GM.saved?'<p class="crp" style="color:var(--moss)">Saved.</p>':''}`;
  $('gmexp').innerHTML=has?`<p class="crp">Your save lives on this device only. To move <b>${esc(sv.ch.name)}</b> (Lv ${sv.lv|0}) to another phone, browser or the Android app, copy this code and paste it there under Import.</p>
    <div class="crbtns"><button class="btn sm" data-gm="copy">Copy save code</button><button class="btn sm alt" data-gm="dl">Download save file</button><button class="btn sm alt" data-gm="show">Show code</button></div>
    ${GM.code?`<textarea class="gmcode" readonly>${GM.code}</textarea>`:''}`:'<p class="crp dim">No character saved on this device yet.</p>';
  $('gmimp').innerHTML=`<p class="crp">Paste a save code, or open a save file. This replaces the character on this device${has?' ('+esc(sv.ch.name)+')':''}.</p>
    <textarea class="gmcode" id="gmin" placeholder="MG1.…" spellcheck="false" autocomplete="off"></textarea>
    <div class="crbtns"><button class="btn sm" data-gm="imp">${GM.ask?'Tap again to replace '+esc(sv&&sv.ch?sv.ch.name:'save'):'Load this save'}</button><label class="btn sm alt gmfile">Open save file<input type="file" id="gmf" accept=".txt,.mgsave,text/plain" hidden></label></div>
    ${GM.msg?`<div class="${GM.err?'warn':'crp'}">${GM.msg}</div>`:''}`;
  if(GM.pending)$('gmin').value=GM.pending}
async function copyText(t){try{await navigator.clipboard.writeText(t);return true}catch(_){}try{const a=document.createElement('textarea');a.value=t;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();const ok=document.execCommand('copy');a.remove();return ok}catch(_){return false}}
$('gmenu').addEventListener('click',async e=>{const b=e.target.closest('[data-gm],#gmclose');if(!b)return;if(b.id==='gmclose')return closeMenu();const k=b.dataset.gm;GM.err=0;GM.saved=0;
  if(k==='resume')return closeMenu();if(k==='map'){closeMenu();return openMap(false)}if(k==='ctl'){GM.title=true;return openCtlEd()}if(k==='save'){save();GM.saved=1;return renderMenu()}
  if(k==='title'){if(!GM.askT){GM.askT=1;return renderMenu()}return toTitle()}if(k==='exit'){if(!GM.askX){GM.askX=1;return renderMenu()}return exitGame()}GM.askT=GM.askX=0;
  if(k==='copy'){const c=saveCode();GM.code=c;GM.msg=(await copyText(c))?'Copied. Paste it into Import on your other device.':'Copy was blocked here. Use Show code and copy it by hand.';GM.err=0}
  else if(k==='show')GM.code=saveCode();
  else if(k==='dl'){const c=saveCode(),sv=loadSave(),fn='mossgate-'+String(sv.ch.name).replace(/[^a-z0-9]/gi,'')+'-lv'+(sv.lv|0)+'.mgsave';let dl=null;try{dl=window.claude&&window.claude.use?await window.claude.use('downloads'):null}catch(_){}
    if(dl){try{await dl.save({filename:fn,data:c});GM.msg='Save file offered for download.'}catch(_){GM.msg='The download was declined. Use Copy save code instead.'}renderMenu();return}try{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:'text/plain'}));a.download='mossgate-'+String(sv.ch.name).replace(/[^a-z0-9]/gi,'')+'-lv'+(sv.lv|0)+'.mgsave';document.body.appendChild(a);a.click();a.remove();GM.msg='Save file downloaded. If nothing appeared, use Copy save code instead.'}catch(_){GM.msg='Downloads are blocked here. Use Copy save code instead.'}}
  else if(k==='imp'){const txt=$('gmin').value||GM.pending||'';const r=readCode(txt);if(r.err){GM.msg=r.err;GM.err=1;GM.ask=null;GM.pending=txt;return renderMenu()}
    const cur=loadSave();if(cur&&cur.ch&&!GM.ask){GM.ask=1;GM.pending=txt;GM.msg='This will replace '+esc(cur.ch.name)+' on this device. Tap again to confirm.';return renderMenu()}
    localStorage.setItem(SAVE_K,r.raw);GM.msg='Loaded '+esc(r.sv.ch.name)+'. Restarting…';renderMenu();setTimeout(()=>location.reload(),700);return}
  renderMenu()});
$('gmenu').addEventListener('change',e=>{if(e.target.id!=='gmf')return;const f=e.target.files&&e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{GM.pending=String(rd.result||'').trim();GM.msg='File read. Tap Load this save.';GM.err=0;renderMenu()};rd.readAsText(f)});
$('menubtn').addEventListener('click',()=>openMenu(false));$('impbtn').addEventListener('click',()=>{initAudio();openMenu(true)});
/* Android back button: close whatever is open, otherwise open the menu */
(function(){const A=appPlugin();if(!A||!A.addListener)return;A.addListener('backButton',()=>{
  if(!$('gmenu').hidden){closeMenu();return}if(typeof DLG!=='undefined'&&DLG){closeDlg();return}
  for(const id of['inv','tree','quests','craft','board','market','crisis','deepm']){const el=$(id);if(el&&!el.hidden){if(id==='crisis')closeCrisis();else if(id==='deepm'){DEEPM=null;unpause('deepm')}else unpause(id);return}}
  if(!$('creator').hidden){$('creator').hidden=true;$('title').hidden=false;return}if(!$('title').hidden){A.exitApp();return}openMenu(false)})})();
addEventListener('keydown',e=>{if(e.code!=='Escape'||e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;if(!$('gmenu').hidden){closeMenu();return}if(pl.ch&&S.started&&!S.paused&&!pl.dead)openMenu(false)});
