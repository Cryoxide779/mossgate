/* ---------- companion bonding (Bible 3.15: trust, recruitment routes, creature careers) ---------- */
DISC.handling={n:'Handling',fam:'World',field:1,d:'Befriending, feeding and commanding creatures. Higher rank makes creatures more willing to follow you.'};FIELD_D.push('handling');
const TRUST_T=[[0,'Wary','#8d8aa3'],[20,'Familiar','#c8d468'],[50,'Bonded','#9bd04c'],[80,'Devoted','#ffd27a']];
const CMDS=['follow','attack','guard','stay'],CMD_N={follow:'Follow',attack:'Attack',guard:'Guard',stay:'Stay'},CMD_TIER={follow:0,stay:0,attack:1,guard:2};
const CMD_D={follow:'Stays close and fights what comes near.',attack:'Ranges ahead and hunts anything in sight. Hits faster.',guard:'Sticks to your side. You take 15% less damage while it is near.',stay:'Holds this spot and fights only what reaches it.'};
const FAM_OF=t=>{const d=MOBS[t];if(!d)return'beast';if(['husk','fiend','wisp','lantern'].includes(t))return'spirit';if(t==='sporecap'||d.kind==='treant')return'plant';if(d.kind==='slime')return'slime';if(d.fly)return'flyer';if(d.kind==='gob')return'gob';return'beast'};
const DIET={beast:'meat',slime:'herb',flyer:'meat',gob:'salvage',spirit:'shard',plant:'mush'};
const SPECIAL={beast:['Pounce','A heavy leap that staggers its target.'],slime:['Mend','Heals you when you are hurt.'],flyer:['Harry','Poisons its target with repeated stings.'],gob:['Scavenge','Finds salvage on the creatures you defeat together.'],spirit:['Hex','Breaks its target’s poise outright.'],plant:['Spore Cloud','Bursts spores over a group of enemies.']};
const NICKS=['Ash','Fern','Glim','Bramble','Nettle','Pip','Sorrel','Thistle','Moth','Rook','Ember','Cinder','Wick','Bracken','Dusk','Sable','Burr','Hob','Lichen','Tallow','Quill','Rue','Soot','Juniper'];
const NOT_BOND=t=>{const d=MOBS[t];return!d||d.boss||d.bb||t==='unbound'};
function CB(){const c=pl.comp||(pl.comp={own:[],act:null});c.b=c.b||{};c.cmd=c.cmd||'follow';
  for(const k of c.own)if(!c.b[k]&&COMPS[k])c.b[k]={t:COMPS[k].mob,n:COMPS[k].n,tr:35,lv:Math.max(1,pl.lv-2),xp:0};c.own=c.own.filter(k=>c.b[k]);if(c.act&&!c.b[c.act])c.act=null;return c}
const bondOf=id=>CB().b[id];
const tierOf=tr=>{let i=0;TRUST_T.forEach((t,j)=>{if(tr>=t[0])i=j});return i};
const actBond=()=>{const c=CB();return c.act?c.b[c.act]:null};
const compCmd=()=>CB().cmd;
function compMult(){const b=actBond();if(!b)return .4;return(.35+.03*b.lv)*(1+tierOf(b.tr)*.12)}
function compRange(){return{follow:140,attack:260,guard:90,stay:55}[compCmd()]}
function compGuard(){const c=CB(),a=S.allies.find(q=>q.k==='comp');return c.cmd==='guard'&&a&&Math.abs(a.x-pl.x)<40?.85:1}
function addTrust(b,n){if(!b)return;const before=tierOf(b.tr);b.tr=clamp(b.tr+n,0,100);const after=tierOf(b.tr);
  if(after>before){banner(b.n.split(',')[0]+' · '+TRUST_T[after][1],after===3?'Special unlocked: '+SPECIAL[FAM_OF(b.t)][0]:'New command: '+CMD_N[CMDS.find(k=>CMD_TIER[k]===after)]);[523,659,784].forEach((f,i)=>setTimeout(()=>tone(f,.2,'triangle',.04),i*110))}}
function compKill(m){const b=actBond(),a=S.allies.find(q=>q.k==='comp');if(!b||!a)return;addTrust(b,.6);b.xp+=Math.max(1,m.exp*.5);
  const nd=need(b.lv)*.4;if(b.xp>=nd&&b.lv<pl.lv){b.xp-=nd;b.lv++;S.nums.push({x:a.x,y:a.y-26,txt:'LV '+b.lv,t:-.2,c:'#9bd04c'})}else if(b.lv>=pl.lv)b.xp=Math.min(b.xp,nd);
  if(tierOf(b.tr)===3&&FAM_OF(b.t)==='gob'&&Math.random()<.3)addMat('salvage',1,m.x,m.y-12)}
let compT=0;
function compTick(dt){const b=actBond();if(!b)return;compT+=dt;if(compT>=90){compT=0;addTrust(b,1)}
  const a=S.allies.find(q=>q.k==='comp');if(!a||tierOf(b.tr)<3)return;a.spc=Math.max(0,(a.spc??6)-dt);if(a.spc>0)return;const fam=FAM_OF(b.t);
  if(fam==='slime'){if(pl.hp<pl.mhp*.6){pl.hp=Math.min(pl.mhp,pl.hp+pl.mhp*.15);a.spc=14;S.nums.push({x:pl.x,y:pl.y-44,txt:'MEND',t:-.1,c:'#9bd04c'});for(let i=0;i<10;i++)S.parts.push({x:pl.x+rnd(-8,8),y:pl.y-rnd(4,30),vx:0,vy:-30,t:0,life:.7,c:'#9bd04c',g:-10,s:1})}return}
  if(fam==='gob')return;let tg=null,bd=90;for(const m of S.mobs){if(m.dead)continue;const d=Math.abs(m.x-a.x);if(d<bd&&Math.abs(m.y-a.y)<40){bd=d;tg=m}}if(!tg)return;a.spc=14;
  S.nums.push({x:a.x,y:a.y-28,txt:SPECIAL[fam][0].toUpperCase(),t:-.1,c:'#ffd27a'});
  if(fam==='beast'){a.x=tg.x-Math.sign(tg.x-a.x)*8;hitMob(tg,compMult()*3,a.face);if(!tg.dead)tg.stun=Math.max(tg.stun,.8)}
  else if(fam==='flyer'){tg.psn={t:5,a:0,dps:Math.max(1,Math.round(atkPow()*compMult()*.5))};hitMob(tg,compMult(),a.face)}
  else if(fam==='spirit'){tg.poise=0;hitMob(tg,compMult()*2,a.face)}
  else if(fam==='plant'){aoe(tg.x,tg.y-8,34,compMult()*1.5);for(let i=0;i<16;i++)S.parts.push({x:tg.x+rnd(-20,20),y:tg.y-rnd(4,24),vx:rnd(-20,20),vy:rnd(-30,0),t:0,life:.9,c:i%2?'#c8d468':'#8a5478',g:0,s:1})}}
function setCmd(k){const c=CB(),b=actBond();if(!b)return;if(tierOf(b.tr)<CMD_TIER[k]){banner('Not yet',b.n.split(',')[0]+' needs to trust you more');return}c.cmd=k;const a=S.allies.find(q=>q.k==='comp');if(a)a.hx=a.x;banner(CMD_N[k],b.n.split(',')[0]+' · '+CMD_D[k]);sfx.pick();cmdHud();save()}
function cycleCmd(){const b=actBond();if(!b)return;const ok=CMDS.filter(k=>tierOf(b.tr)>=CMD_TIER[k]),i=ok.indexOf(compCmd());setCmd(ok[(i+1)%ok.length])}
function cmdHud(){const b=actBond(),el=$('cmdbtn');el.hidden=!b;if(b){el.querySelector('span').textContent=CMD_N[compCmd()];el.style.setProperty('--tc',TRUST_T[tierOf(b.tr)][2])}}
/* befriending */
function bondNear(){const c=CB();if(c.own.length>=12)return null;for(const m of S.mobs){if(m.dead||m.cr||m.temp||NOT_BOND(m.t))continue;if(Math.abs(m.x-pl.x)>30||Math.abs(m.y-pl.y)>30)continue;
    if(m.stun>0||m.hp<m.mhp*.3||(m.d.passive&&!m.aggro))return{k:'bef',m}}return null}
function befChance(m){return clamp(.3+.04*dRank('handling')+(m.stun>0?.15:0)+(m.d.passive?.1:0)+(Z.id==='mossroot'?.2:0)-.05*Math.max(0,m.lv-pl.lv)-(m.d.elite?.2:0),.05,.92)}
function bondLabel(n){const r=DIET[FAM_OF(n.m.t)];return'Befriend · '+n.m.d.name+' ('+(mat(r)?'offer 1 '+RES[r].n:'needs 1 '+RES[r].n)+') '+Math.round(befChance(n.m)*100)+'%'}
function befriend(m){const r=DIET[FAM_OF(m.t)];if(mat(r)<1){banner('You need an offering','1 '+RES[r].n+' for a '+m.d.name);return}pl.mat[r]--;
  if(Math.random()<befChance(m)){m.dead=1;m.resp=m.d.resp||RESP_NORMAL;const c=CB(),id=m.t+'-'+cid(),nick=NICKS.filter(n=>!Object.values(c.b).some(b=>b.n.startsWith(n+',')))[Math.random()*20|0]||NICKS[Math.random()*NICKS.length|0];
    c.b[id]={t:m.t,n:nick+', '+m.d.name,tr:10,lv:Math.max(1,Math.min(pl.lv,m.lv)),xp:0};c.own.push(id);if(!c.act){c.act=id;spawnComp()}dGain('handling',30);qBond();
    for(let i=0;i<18;i++){const a=i/18*6.28;S.parts.push({x:m.x,y:m.y-m.d.h/2,vx:Math.cos(a)*50,vy:Math.sin(a)*50-20,t:0,life:.9,c:i%3?'#ff8aa0':'#ffd27a',g:-10,s:i%4?1:2})}
    S.nums.push({x:m.x,y:m.y-m.d.h-10,txt:'BEFRIENDED',t:-.2,c:'#ff8aa0'});banner(nick+' will follow you',m.d.name+' · open Quests to call or command');[523,659,784,1046].forEach((f,i)=>setTimeout(()=>tone(f,.2,'sine',.05),i*120))}
  else{m.aggro=8;m.stun=0;m.poise=m.mpoise;dGain('handling',8);S.nums.push({x:m.x,y:m.y-m.d.h-10,txt:'REFUSED',t:-.2,c:'#ff6b6b'});tone(180,.2,'square',.03,-60)}save()}
function qBond(){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='bond'&&st.n<g.n){st.n++;qProgress(k)}}}
/* sprite lookup for any creature */
function compSprite(t,a){const S2=MSP[t],atk=a.atkT>0,w=Math.floor(a.walk||0)%2;
  if(t==='moss'||SLIME_S[t])return[MSP[t][atk?2:w],13,19];
  if(t==='wisp')return[MSP.wisp[Math.floor(S.t*6)%3],18,19];
  if(t==='husk')return[MSP.husk[atk?'lunge':w?'walk1':'walk0'],16,36];
  if(S2&&(S2.kind==='fly'||S2.kind==='drake'))return[atk?S2.ch:S2.fl[Math.floor(S.t*12)%3],S2.ax,S2.ay];
  if(S2&&S2.kind==='gen')return[S2[atk?'lunge':w?'walk1':'walk0'],S2.ax,S2.ay];return[MSP.moss[0],13,19]}
/* companion panel */
function compHTML(){const c=CB(),own=c.own;if(!own.length)return'<div class="qh">Companions</div><div class="note">No companions yet. Break a creature’s poise or wear it down, then walk up and offer it food. Passive creatures can be befriended without a fight. Mossroot Hollow is the gentlest place to try.</div>';
  return'<div class="qh">Companions · '+own.length+'/12</div>'+own.map(id=>{const b=c.b[id],ti=tierOf(b.tr),T=TRUST_T[ti],fam=FAM_OF(b.t),act=c.act===id,r=DIET[fam],next=TRUST_T[ti+1];
    return`<div class="cmpc${act?' on':''}"><div class="cmph"><b>${b.n}</b><span>Lv ${b.lv} · ${fam}</span></div>
      <div class="cmpt"><i style="width:${b.tr}%;background:${T[2]}"></i></div><div class="cmpm"><span style="color:${T[2]}">${T[1]} · trust ${Math.floor(b.tr)}</span><span>${next?next[0]+' for '+next[1]:'Max trust'}</span></div>
      <div class="cmpm"><span>${ti>=3?'★ ':''}${SPECIAL[fam][0]}: ${SPECIAL[fam][1]}${ti>=3?'':' (Devoted)'}</span></div>
      <div class="crbtns"><button class="btn sm${act?' alt':''}" data-comp="${id}">${act?'Send home':'Call'}</button><button class="btn sm alt" data-cfeed="${id}" ${mat(r)&&!(b.fed&&Date.now()-b.fed<60000)?'':'disabled'}>Feed 1 ${RES[r].n} <small>${mat(r)}</small></button><button class="btn sm alt" data-crel="${id}">${S.relAsk===id?'Tap again to release':'Release'}</button></div>
      ${act?`<div class="crbtns">${CMDS.map(k=>`<button class="btn sm${c.cmd===k?'':' alt'}" data-ccmd="${k}" ${ti>=CMD_TIER[k]?'':'disabled'}>${CMD_N[k]}${ti>=CMD_TIER[k]?'':' · '+TRUST_T[CMD_TIER[k]][1]}</button>`).join('')}</div>`:''}</div>`}).join('')}
function compClick(e){const f=e.target.closest('[data-cfeed],[data-crel],[data-ccmd]');if(!f)return false;const c=CB();
  if(f.dataset.cfeed){const b=c.b[f.dataset.cfeed],r=DIET[FAM_OF(b.t)];if(mat(r)<1)return true;pl.mat[r]--;b.fed=Date.now();addTrust(b,8);dGain('handling',10);tone(660,.15,'sine',.04);S.relAsk=null}
  else if(f.dataset.crel){const id=f.dataset.crel;if(S.relAsk!==id)S.relAsk=id;else{c.own=c.own.filter(k=>k!==id);delete c.b[id];if(c.act===id){c.act=null;spawnComp()}S.relAsk=null;banner('Released','It returns to the wild')}}
  else setCmd(f.dataset.ccmd);cmdHud();save();return true}
$('cmdbtn').addEventListener('click',e=>{e.preventDefault();cycleCmd()});
