/* ---------- polish: objective guide, first-run touch hints ---------- */
/* Points the way to the next person the player needs: the turn-in for a finished tracked quest,
   the person a "talk" quest names, or the giver of the next main-story quest. Off-screen targets in
   this zone get an edge arrow; targets in another zone get an arrow toward the right exit. */
const NPC_ZONE={};
function npcZone(id){if(NPC_ZONE[id]!=null)return NPC_ZONE[id];const i=ZONES.findIndex(z=>!z.interior&&z.id!=='deep'&&(z.npcs||[]).includes(id));return NPC_ZONE[id]=i}
function guideTarget(){if(Z.id==='deep'||Z.interior)return null;
  const tr=tracked();for(const k of tr){if(qReady(k)){const n=qTurnIn(k);if(NPCS[n])return{npc:n,why:'done'}}}
  const m=tr.find(k=>QUESTS[k].goal.t==='talk');if(m)return{npc:QUESTS[m].goal.npc,why:'talk'};
  if(!qActive().some(k=>QUESTS[k].main)){const k=Object.keys(QUESTS).find(k=>QUESTS[k].main&&qAvail(k)&&pl.lv>=(QUESTS[k].lv||1)-1);if(k&&NPCS[QUESTS[k].giver])return{npc:QUESTS[k].giver,why:'new'}}
  return null}
let GPATH={k:'',hop:null};
function nextHop(from,to){if(from===to)return null;const key=from+'>'+to;if(GPATH.k===key)return GPATH.hop;
  const prev=new Map([[from,null]]),q=[from];while(q.length){const z=q.shift();if(z===to)break;for(const po of ZONES[z].portals||[]){const t=po.to;if(t==null||prev.has(t)||!ZONES[t]||ZONES[t].interior||ZONES[t].id==='deep')continue;prev.set(t,{z,po});q.push(t)}}
  let hop=null;if(prev.has(to)){let c=to;while(prev.get(c)&&prev.get(c).z!==from)c=prev.get(c).z;hop=prev.get(c)?prev.get(c).po:null}
  GPATH={k:key,hop};return hop}
function drawGuide(cx,cy){if(!pl.ch||S.paused&&!DLG||pl.dead)return;if(pl.flags&&pl.flags.noGuide)return;const t=guideTarget();if(!t)return;const zi=npcZone(t.npc);if(zi<0)return;
  let tx,label;if(zi===S.zone){const n=NPCS[t.npc];tx=n.x;label=n.name.split(' ').slice(-1)[0];if(Math.abs(n.x-pl.x)<26)return;const sx=n.x-cx;if(sx>8&&sx<W-8){
      const y=ri((n.y||standAt(n.x))-cy)-58+Math.sin(S.t*4)*2;g.fillStyle='#000';g.fillRect(ri(sx)-4,y-1,9,6);g.fillStyle=t.why==='done'?'#9bd04c':'#ffd27a';g.fillRect(ri(sx)-3,y,7,1);g.fillRect(ri(sx)-2,y+1,5,1);g.fillRect(ri(sx)-1,y+2,3,1);g.fillRect(ri(sx),y+3,1,1);return}}
  else{const po=nextHop(S.zone,zi);if(!po)return;tx=po.x;label=ZONES[po.to].name;if(Math.abs(po.x-pl.x)<20)return}
  const dir=Math.sign(tx-pl.x)||1,onScr=tx-cx>14&&tx-cx<W-14;if(onScr&&zi!==S.zone){const x=ri(tx-cx),y=ri(topAt(tx)-cy)-52+Math.sin(S.t*4)*2;ptext('▼ '+label.toUpperCase(),x,y,'#ffd27a');return}
  const ex=dir>0?W-10:10,ey=ri(H*.38),bob=ri(Math.sin(S.t*5)*1.5),ax=ex+dir*bob;g.save();g.globalAlpha=.92;
  const tri=(r,col)=>{g.fillStyle=col;for(let i=-r;i<=r;i++){const w=r+1-Math.abs(i);g.fillRect(dir>0?ax-r:ax+r+1-w,ey+i,w,1)}};tri(5,'#000');tri(4,t.why==='done'?'#9bd04c':'#ffd27a');
  g.restore();g.font='8px Silkscreen, monospace';const tw=g.measureText(label.toUpperCase()).width;ptext(label.toUpperCase(),dir>0?ri(ex-8-tw/2):ri(ex+8+tw/2),ey,'#f2e6c8')}
/* first-run touch hints: one short line at a time, each cleared by doing it */
const HINTS=[{k:'move',t:'Drag the left side of the screen to move',ok:()=>Math.abs(pl.x-(HINT0.x||pl.x))>60},
  {k:'talk',t:'Walk up to someone and tap the orange button to talk',ok:()=>!!DLG||qActive().length>0},
  {k:'atk',t:'Tap Slash to attack. Jump and Roll are beside it',ok:()=>!!pl.atk},
  {k:'menu',t:'Bag, skills, quests and the menu are along the top',ok:()=>HINT0.t>14}];
const HINT0={i:0,x:null,t:0};
function hintTick(dt){if(!pl.ch||!document.body.classList.contains('touch')&&!matchMedia('(pointer:coarse)').matches)return;pl.flags=pl.flags||{};if(pl.flags.hints==null&&(pl.lv>2||Object.keys(pl.q||{}).length>1))pl.flags.hints=HINTS.length;if(pl.flags.hints>=HINTS.length)return;
  if(S.paused){return}const i=pl.flags.hints|0,h=HINTS[i];if(HINT0.i!==i||HINT0.x==null){HINT0.i=i;HINT0.x=pl.x;HINT0.t=0}HINT0.t+=dt;
  if(HINT0.t>1.2&&h.ok()&&!($('zone').style.opacity>0.05)){pl.flags.hints=i+1;HINT0.x=null;save()}}
function drawHint(){if(!pl.ch||S.paused||!pl.flags||(pl.flags.hints|0)>=HINTS.length)return;if(!document.body.classList.contains('touch')&&!matchMedia('(pointer:coarse)').matches)return;
  if(HINT0.t<.6||+$('zone').style.opacity>.05)return;const h=HINTS[pl.flags.hints|0],a=Math.min(1,(HINT0.t-.6)*2);g.save();g.globalAlpha=a;g.font='8px Silkscreen, monospace';const tw=g.measureText(h.t).width+12,y=ri(H*.44);
  g.fillStyle='rgba(8,18,20,.82)';g.fillRect(ri(W/2-tw/2),y-6,ri(tw),12);g.fillStyle='rgba(155,208,76,.6)';g.fillRect(ri(W/2-tw/2),y-6,ri(tw),1);g.restore();g.save();g.globalAlpha=a;ptext(h.t,ri(W/2),y,'#f2e6c8');g.restore()}
/* keep the selected discipline tab in view when the tab strip scrolls sideways */
const _ot=openTree;openTree=function(...a){const r=_ot(...a);const s=document.querySelector('#dtabs .sel');if(s)s.scrollIntoView({inline:'nearest',block:'nearest'});return r};
/* leaving the app: save, pause behind the menu, quiet the audio; coming back: audio resumes */
document.addEventListener('visibilitychange',()=>{if(document.hidden){if(pl.ch&&$('title').hidden&&$('creator').hidden){try{save()}catch(_){}
    if(!S.paused&&!pl.dead&&$('gmenu').hidden)try{openMenu()}catch(_){}}try{AC&&AC.state==='running'&&AC.suspend()}catch(_){}}
  else{try{AC&&AC.state==='suspended'&&AC.resume()}catch(_){}}});
addEventListener('pagehide',()=>{if(pl.ch&&$('title').hidden&&$('creator').hidden)try{save()}catch(_){}});
/* ---------- top bar: shards, tonics, bag and a "more" button; everything else lives in a labelled drop-down ---------- */
/* companions: one tap to call your companion out or send it home */
function compOut(){const c=pl.comp;return!!(c&&c.act&&c.b&&c.b[c.act])}
function toggleComp(){const c=CB();if(!c.own.length){banner('No companions yet','Befriend a creature first');return}
  if(c.act){const b=c.b[c.act];c.last=c.act;setComp(c.act);banner('Sent home',b.n.split(',')[0]+' waits for you at home')}
  else{const id=c.last&&c.b[c.last]?c.last:c.own[0];setComp(id);banner('Called',c.b[id].n.split(',')[0]+' is at your side')}}
addEventListener('keydown',e=>{if(e.code==='KeyC'&&!e.repeat&&e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'&&pl.ch&&S.started&&!S.paused)toggleComp()});
const MORE_ROWS=[['comptog',()=>compOut()?'Companion · out (tap to send home)':'Companion · home (tap to call)',1],['cmdbtn',()=>{const b=actBond();return b?'Command · '+CMD_N[compCmd()]:'Command'},1],['qbtn','Quests'],['mxbtn',()=>pl.mx&&pl.mx.pts?'Mastery · '+pl.mx.pts+' to spend':'Mastery'],['treebtn','Disciplines'],['mapbtn','Map'],['saybtn',()=>{const n=NET.cap?netPeers().length:0;return n?'Say · '+(n+1)+' here':'Say'},1],['sndbtn',()=>SND.on?'Sound · on':'Sound · off',1],['menubtn','Menu & saves'],['fs','Fullscreen']];
(()=>{const tr=$('tr'),more=document.createElement('button');more.className='ib px';more.id='morebtn';more.setAttribute('aria-label','More');more.setAttribute('aria-expanded','false');
  more.innerHTML='<svg viewBox="0 0 18 18" fill="#f2e6c8"><rect x="2" y="2" width="5" height="5"/><rect x="11" y="2" width="5" height="5"/><rect x="2" y="11" width="5" height="5"/><rect x="11" y="11" width="5" height="5"/></svg>';
  tr.insertBefore(more,$('bagbtn').nextSibling);
  const pn=document.createElement('div');pn.id='morepn';pn.className='px';pn.hidden=true;document.body.appendChild(pn);
  const mk=(id,svg)=>{const b=document.createElement('button');b.className='ib px';b.id=id;b.innerHTML=svg;return b};
  const extra={};extra.comptog=mk('comptog','<svg viewBox="0 0 18 18" fill="#9bd04c"><ellipse cx="9" cy="12" rx="4" ry="3.4"/><circle cx="4" cy="7" r="1.8"/><circle cx="7.4" cy="4" r="1.8"/><circle cx="10.6" cy="4" r="1.8"/><circle cx="14" cy="7" r="1.8"/></svg>');extra.mapbtn=mk('mapbtn','<svg viewBox="0 0 18 18" fill="none" stroke="#f2e6c8" stroke-width="2"><path d="M1.5 4l5-2 5 2 5-2v12l-5 2-5-2-5 2z"/><path d="M6.5 2v12M11.5 4v12"/></svg>');
  extra.mxbtn=mk('mxbtn','<svg viewBox="0 0 18 18" fill="none" stroke="#ffd27a" stroke-width="2"><path d="M9 1.5l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5L1.8 6.7l5-.6z"/></svg>');
  extra.saybtn=mk('saybtn','<svg viewBox="0 0 18 18" fill="none" stroke="#f2e6c8" stroke-width="2"><path d="M2 3h14v9H8l-4 3v-3H2z"/></svg>');
  for(const[id]of MORE_ROWS){let b=$(id)||extra[id];if(!b)continue;const row=b;row.classList.add('mrow');const lb=document.createElement('span');lb.className='mlb';row.appendChild(lb);pn.appendChild(row)}
  $('mapbtn').onclick=()=>{closeMore();openMap()};$('comptog').onclick=()=>toggleComp();$('mxbtn').onclick=()=>{closeMore();openMastery()};
  $('saybtn').addEventListener('click',e=>{e.stopPropagation();closeMore();$('shoutbar').classList.toggle('open')});
  more.addEventListener('click',e=>{e.stopPropagation();pn.hidden?openMore():closeMore()});
  pn.addEventListener('click',e=>{const r=e.target.closest('.mrow');if(!r)return;const row=MORE_ROWS.find(x=>x[0]===r.id);setTimeout(()=>{if(row&&row[2])labelMore();else closeMore()},0)});
  document.addEventListener('pointerdown',e=>{if(!pn.hidden&&!e.target.closest('#morepn,#morebtn'))closeMore()},true);
  $('saylist').addEventListener('click',()=>setTimeout(()=>$('shoutbar').classList.remove('open'),0));
  setInterval(()=>{more.classList.toggle('dot',$('treebtn').classList.contains('dot'));$('saybtn').hidden=!NET.cap;$('comptog').hidden=!(pl.comp&&pl.comp.own&&pl.comp.own.length);if(!pn.hidden)labelMore()},700)})();
function labelMore(){for(const[id,l]of MORE_ROWS){const b=$(id);if(!b)continue;const s=b.querySelector('.mlb');const t=typeof l==='function'?l():l;if(s&&s.textContent!==t)s.textContent=t}}
function openMore(){labelMore();$('morepn').hidden=false;$('morebtn').setAttribute('aria-expanded','true');$('morebtn').classList.add('on')}
function closeMore(){$('morepn').hidden=true;$('morebtn').setAttribute('aria-expanded','false');$('morebtn').classList.remove('on')}
/* banner(small, big): when a long line lands in the big slot and a short one in the small, swap them so the headline stays short */
const _bnr=banner;banner=function(s,t){if(t&&s&&String(t).length>28&&String(s).length<String(t).length)return _bnr(t,s);return _bnr(s,t)};
