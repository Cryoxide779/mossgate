/* ---------- contracts, freight and the market (Bible ch.2.7, 3.4–3.5: escrow, scarcity, transport, player vending) ---------- */
const BOARDS={town:{n:'Hollow Square Board',town:'CrestHollow',want:['ore','shard','fish','hide'],to:['stonebridge','outskirts','tower']},stonebridge:{n:'Caravan Exchange Board',town:'Stonebridge',want:['timber','herb','mush','salvage'],to:['town','tower']},
  outskirts:{n:'Logger\u2019s Rest Board',town:'Logger\u2019s Rest',want:['timber','hide','meat','herb'],to:['town'],kinds:{bounty:2,supply:2,freight:1}},
  tower:{n:'Watchtower Board',town:'Old Watchtower',want:['ore','salvage','timber','hide'],to:['town','stonebridge'],charter:1}};
const CHARTER_K={watch:{kinds:{bounty:3,supply:1,freight:1},bounty:1.25,txt:'Civic Watch charter: more bounties, better bounty pay.'},road:{kinds:{bounty:1,supply:1,freight:3},freight:1.25,txt:'Road Company charter: freight runs to every town.'},
  annex:{kinds:{bounty:1,supply:2,commission:2},want:['salvage','shard','mush','ore'],txt:'Research Annex charter: salvage and research supplies, commissions for instruments.'},refuge:{kinds:{supply:3,freight:1,bounty:0},want:['meat','herb','fish','hide'],txt:'Creature Refuge charter: food and care supplies, no culling bounties.'}};
const boardOpen=bid=>!BOARDS[bid].charter||!!(pl.flags&&pl.flags.t3);
const MATP={timber:4,herb:4,ore:6,mush:6,shard:14,fish:5,salvage:6,hide:6,meat:4};
const REP_T=[[0,'Unknown',0],[3,'Known',.05],[8,'Trusted',.1],[15,'Renowned',.2]];
for(const z of ZONES){if(z.id==='outskirts')z.stations.push({x:360+EDGE,k:'board',n:BOARDS.outskirts.n});if(z.id==='tower')z.stations.push({x:880+EDGE,k:'board',n:BOARDS.tower.n});if(z.id==='town')z.stations.push({x:900+EDGE,k:'board',n:BOARDS.town.n},{x:1160+EDGE,k:'stall',n:'Your Market Stall'});if(z.id==='stonebridge')z.stations.push({x:1290+EDGE,k:'board',n:BOARDS.stonebridge.n})}
const CON=()=>pl.con||(pl.con={boards:{},act:[],rep:0});
const repTier=()=>{let t=REP_T[0];for(const r of REP_T)if(CON().rep>=r[0])t=r;return t};
const cid=()=>Math.random().toString(36).slice(2,8);
function genContracts(bid){const L=[],lv=pl.lv,B=BOARDS[bid],ch=B.charter?CHARTER_K[pl.flags.t3]:null,K=(ch&&ch.kinds)||B.kinds||{bounty:2,supply:1,commission:1,freight:1},want=(ch&&ch.want)||B.want,rb=1+repTier()[2]+dRank('commerce')*.02;
  const zs=ZONES.filter(z=>!z.safe&&z.mobs.length&&z.lv[0]<=lv+1&&z.req<=lv).sort((a,b)=>b.lv[0]-a.lv[0]);
  for(let i=0;i<(K.bounty||0)&&zs.length;i++){const z=zs[Math.min(zs.length-1,i+Math.floor(Math.random()*2))],ms=[...new Set(z.mobs.map(m=>m[0]).filter(t=>!MOBS[t].boss&&!MOBS[t].passive))];if(!ms.length)continue;
    const t=ms[Math.floor(Math.random()*ms.length)],n=MOBS[t].elite?1:4+Math.floor(Math.random()*4);L.push({id:cid(),k:'bounty',mob:t,zone:z.id,n,c:0,pay:Math.round((n*(8+z.lv[1]*3)+(MOBS[t].elite?90:0))*rb*((ch&&ch.bounty)||1)),from:bid,
      t:MOBS[t].name+' bounty',d:`Mercenary work. Defeat ${n} ${MOBS[t].name}${n>1?'s':''} in ${z.name}. Payment is held in escrow by the board and released on proof.`})}
  for(let i=0;i<(K.supply||0);i++){const r=want[Math.floor(Math.random()*want.length)],n=3+Math.floor(Math.random()*5);if(L.some(c=>c.r===r))continue;L.push({id:cid(),k:'supply',r,n,pay:Math.round(n*MATP[r]*1.6*rb),from:bid,
    t:`${RES[r].n} wanted`,d:`${B.town} is short of ${RES[r].n.toLowerCase()}. Deliver ${n} to this board. Local scarcity makes it pay above market.`})}
  for(let i=0;i<(K.commission||0);i++){const pool=RECIPES.filter(R=>!R.use&&R.r<=Math.max(1,dRank(R.d)+1)),R=pool[Math.floor(Math.random()*pool.length)];if(R&&!L.some(c=>c.rcp===R.id))L.push({id:cid(),k:'commission',rcp:R.id,pay:Math.round((Object.values(R.need).reduce((a,b)=>a+b,0)*9+25)*rb),from:bid,
    t:`Commission: ${R.n}`,d:`A buyer wants a ${R.n} made by a known hand. Craft one and deliver it here. Drops do not count: it must carry a maker’s name.`})}
  const dests=B.to.filter(boardOpen);for(let i=0;i<(K.freight||0)&&dests.length;i++){const to=dests[i%dests.length],col=25+lv*5;if(L.some(c=>c.k==='freight'&&c.to===to))continue;L.push({id:cid(),k:'freight',to,col,pay:Math.round((45+lv*9)*rb*((ch&&ch.freight)||1)),from:bid,
    t:`Freight to ${BOARDS[to].town}`,d:`Carry a sealed crate to the ${BOARDS[to].n}. You post ${col} shards collateral, returned with your fee on delivery. Cargo slows you, and if you fall on the road the crate is lost with your collateral.`})}
  return L}
function boardList(bid){const C=CON(),B=C.boards[bid];if(!B||Date.now()-B.at>8*60*1000||!B.list.length)C.boards[bid]={at:Date.now(),list:genContracts(bid)};return C.boards[bid].list}
const hasCargo=()=>CON().act.some(c=>c.k==='freight');
function conKill(m){for(const c of CON().act)if(c.k==='bounty'&&c.mob===m.t&&c.zone===Z.id&&c.c<c.n){c.c++;S.nums.push({x:pl.x,y:pl.y-60,txt:'CONTRACT '+c.c+'/'+c.n,t:-.4,c:'#e3b04b'})}}
function conDeath(){const C=CON(),lost=C.act.filter(c=>c.k==='freight');if(!lost.length)return;C.act=C.act.filter(c=>c.k!=='freight');setTimeout(()=>banner('Cargo lost','Collateral forfeited'),300);save()}
function conReady(c,bid){if(c.k==='bounty')return c.c>=c.n;if(c.k==='supply')return mat(c.r)>=c.n;if(c.k==='commission')return pl.bag.some(it=>it.rcp===c.rcp&&it.by);if(c.k==='freight')return bid===c.to;return false}
function conProg(c){if(c.k==='bounty')return`${c.c}/${c.n} defeated · ${ZONES.find(z=>z.id===c.zone).name}`;if(c.k==='supply')return`${Math.min(mat(c.r),c.n)}/${c.n} ${RES[c.r].n}`;
  if(c.k==='commission')return pl.bag.some(it=>it.rcp===c.rcp&&it.by)?'Crafted · deliver it':'Craft it at a station';return'Carrying · deliver to '+BOARDS[c.to].town}
function conTurnIn(c,bid){if(!conReady(c,bid))return;const C=CON();
  if(c.k==='supply')pl.mat[c.r]-=c.n;if(c.k==='commission'){const i=pl.bag.findIndex(it=>it.rcp===c.rcp&&it.by);pl.bag.splice(i,1)}
  let pay=Math.round(c.pay*crPayMul(c));if(c.k==='freight'){pay+=c.col;dGain('transport',20);crAdd('transport',15)}dGain('commerce',6);pl.shards+=pay;C.act=C.act.filter(x=>x!==c);C.rep++;const tier=repTier();
  banner(`Escrow released · +${pay} shards`,c.t);[659,784,988,1318].forEach((f,i)=>setTimeout(()=>tone(f,.15,'triangle',.04),i*80));
  if(REP_T.some(r=>r[0]===C.rep))setTimeout(()=>banner('Reputation · '+tier[1],'Contract pay +'+Math.round(tier[2]*100)+'%'),2600);save()}
let BOARD=null;
function openBoard(st){BOARD={bid:Z.id,sel:null,msg:''};pauseFor('board');renderBoard()}
function renderBoard(){if(!BOARD)return;if(!boardOpen(BOARD.bid)){$('bdname').textContent=BOARDS[BOARD.bid].n;$('bdrep').textContent='';$('bdlist').innerHTML='';$('bddet').innerHTML='<div class="dn">No charter yet</div><p>The board is bare. Once the tower has a charter, work will be posted here.</p>';return}const bid=BOARD.bid,B=BOARDS[bid],C=CONTR(),list=boardList(bid),tier=repTier();
  $('bdname').textContent=B.n;$('bdrep').textContent=`Reputation: ${tier[1]} (${C.rep}) · ${C.act.length}/3 active`+(B.charter?' · '+CHARTER_K[pl.flags.t3].txt:'');
  const tag=k=>({bounty:'Mercenary',supply:'Supply',commission:'Commission',freight:'Freight'})[k];
  const row=(c,act)=>`<button class="qi${BOARD.sel===c.id?' sel':''}" data-bc="${c.id}"><b>${c.t}</b><span>${tag(c.k)} · ${act?conProg(c):c.pay+' shards'+(c.k==='freight'?' + '+c.col+' collateral back':'')}${act&&conReady(c,bid)?' · <em class="ok">ready</em>':''}</span></button>`;
  $('bdlist').innerHTML=(C.act.length?'<div class="qh">Your contracts</div>'+C.act.map(c=>row(c,1)).join(''):'')+'<div class="qh">Posted here</div>'+list.map(c=>row(c,0)).join('');
  const c=C.act.find(x=>x.id===BOARD.sel)||list.find(x=>x.id===BOARD.sel)||C.act[0]||list[0],isAct=C.act.includes(c);BOARD.sel=c&&c.id;
  if(!c){$('bddet').innerHTML='<p>Nothing posted.</p>';return}
  let acts='';if(isAct){acts=`<button class="btn sm" data-bact="turn" ${conReady(c,bid)?'':'disabled'}>${c.k==='freight'?'Deliver crate':c.k==='bounty'?'Claim payment':'Deliver'}</button><button class="btn sm alt" data-bact="drop">Abandon${c.k==='freight'?' (lose collateral)':''}</button>`}
  else{const full=C.act.length>=3,poor=c.k==='freight'&&pl.shards<c.col;acts=`<button class="btn sm" data-bact="take" ${full||poor?'disabled':''}>${c.k==='freight'?'Post '+c.col+' collateral and take crate':'Accept contract'}</button>`+(full?'<div class="warn">You can hold 3 contracts at once.</div>':poor?'<div class="warn">Not enough shards for the collateral.</div>':'')}
  $('bddet').innerHTML=`<div class="dn">${c.t}</div><div class="dm">${tag(c.k)} · posted at ${BOARDS[c.from].town}${c.k==='freight'?' · deliver to '+BOARDS[c.to].town:''}</div><p>${c.d}</p>
    <p><b>Escrow</b>${c.pay} shards held by the board${c.k==='freight'?` · your collateral ${c.col}`:''}</p>${isAct?`<p><b>Progress</b>${conProg(c)}</p>`:''}${BOARD.msg?`<p style="color:var(--moss)">${BOARD.msg}</p>`:''}<div class="acts" style="justify-content:flex-start">${acts}</div>`}
function CONTR(){return CON()}
$('board').addEventListener('click',e=>{const b=e.target.closest('[data-bc],[data-bact],#bdclose');if(!b)return;
  if(b.id==='bdclose'){BOARD=null;return unpause('board')}const C=CON(),bid=BOARD.bid;BOARD.msg='';
  if(b.dataset.bc)BOARD.sel=b.dataset.bc;
  else{const L=boardList(bid),c=C.act.find(x=>x.id===BOARD.sel)||L.find(x=>x.id===BOARD.sel);if(!c)return;
    if(b.dataset.bact==='take'&&C.act.length<3){if(c.k==='freight'){if(pl.shards<c.col)return;pl.shards-=c.col}C.act.push(c);C.boards[bid].list=L.filter(x=>x!==c);BOARD.msg='Accepted. Payment is now held in escrow.';sfx.pick()}
    else if(b.dataset.bact==='turn')conTurnIn(c,bid);
    else if(b.dataset.bact==='drop'){C.act=C.act.filter(x=>x!==c);BOARD.msg='Contract abandoned.'}
    save()}
  renderBoard()});
/* market stall: list goods, simulated buyers react to price */
const ST=()=>pl.stall||(pl.stall={rent:false,list:[],earn:0,log:[],last:Date.now()});
function fairOf(L){return L.it?Math.round(itemValue(L.it)*4*(L.it.by?1.25:1)):Math.round(MATP[L.r]*L.q*1.3)}
function tickMarket(dt){const s=ST();if(!s.rent||!s.list.length)return;s.acc=(s.acc||0)+dt;if(s.acc<4)return;s.acc=0;s.last=Date.now();marketRoll(1)}
function marketRoll(ticks){const s=ST();for(let t=0;t<ticks;t++)for(const L of [...s.list]){const f=fairOf(L),p=clamp(.045*Math.pow(f/L.price,2.2),.003,.35);if(Math.random()<p){s.list=s.list.filter(x=>x!==L);s.earn+=Math.round(L.price*(1+.02*dRank('commerce')));dGain('commerce',4);
  const nm=L.it?itemName(L.it):L.q+' '+RES[L.r].n;s.log.unshift(nm+' sold for '+L.price);s.log=s.log.slice(0,5);if(S.started&&$('market').hidden)S.nums.push({x:pl.x,y:pl.y-62,txt:'SOLD '+nm.toUpperCase(),t:-.2,c:'#e3b04b'});tone(988,.08,'square',.025,200)}}}
function catchUpMarket(){const s=ST();if(!s.rent)return;const el=Math.min(30*60,(Date.now()-(s.last||Date.now()))/1000);if(el>8)marketRoll(Math.floor(el/4));s.last=Date.now()}
let MKT=null;
function openMarket(){catchUpMarket();MKT={tab:'gear',sel:null,price:1};pauseFor('market');renderMarket()}
function renderMarket(){if(!MKT)return;const s=ST();
  if(!s.rent){$('mklist').innerHTML='';$('mkdet').innerHTML=`<div class="dn">Founders’ Market stall</div><p>Rent a stall and other traders will buy what you list while you adventure. Price it fair and it moves. Price it high and you wait.</p><p><b>Rent</b>50 shards, once</p><div class="acts" style="justify-content:flex-start"><button class="btn sm" data-mk="rent" ${pl.shards<50?'disabled':''}>Rent the stall</button></div>`;$('mkhead').textContent='Not rented';return}
  $('mkhead').textContent=`${s.list.length}/6 listed · ${s.earn} shards waiting`;
  const goods=MKT.tab==='gear'?pl.bag.map((it,i)=>({it,i})):Object.keys(RES).filter(k=>mat(k)>0).map(r=>({r,q:mat(r)}));
  $('mklist').innerHTML=`<div class="dtabs"><button class="dtab${MKT.tab==='gear'?' sel':''}" data-mt="gear">Gear</button><button class="dtab${MKT.tab==='mat'?' sel':''}" data-mt="mat">Materials</button></div>`+
    (s.list.length?'<div class="qh">On your stall</div>'+s.list.map((L,i)=>`<button class="qi${MKT.sel==='L'+i?' sel':''}" data-ms="L${i}"><b>${L.it?itemName(L.it):L.q+' '+RES[L.r].n}</b><span>${L.price} shards · fair ${fairOf(L)}</span></button>`).join(''):'')+
    '<div class="qh">Your goods</div>'+(goods.length?goods.map((g2,i)=>`<button class="qi${MKT.sel==='G'+i?' sel':''}" data-ms="G${i}"><b>${g2.it?itemName(g2.it):RES[g2.r].n+' ×'+g2.q}</b><span>${g2.it?RAR[g2.it.r].n+(g2.it.by?' · crafted by '+g2.it.by:''):'Material'}</span></button>`).join(''):'<div class="note">Nothing to sell here.</div>');
  let det=`<div class="dn">Your stall</div><p><b>Earnings</b>${s.earn} shards</p><div class="acts" style="justify-content:flex-start"><button class="btn sm" data-mk="collect" ${s.earn?'':'disabled'}>Collect ${s.earn}</button></div>`+(s.log.length?'<ul class="mklog">'+s.log.map(x=>'<li>'+x+'</li>').join('')+'</ul>':'');
  if(MKT.sel&&MKT.sel[0]==='L'){const L=s.list[+MKT.sel.slice(1)];if(L)det=`<div class="dn">${L.it?itemName(L.it):L.q+' '+RES[L.r].n}</div><p><b>Listed</b>${L.price} shards · fair value ${fairOf(L)}</p><div class="acts" style="justify-content:flex-start"><button class="btn sm alt" data-mk="unlist">Take it back</button></div>`+det}
  if(MKT.sel&&MKT.sel[0]==='G'){const g2=goods[+MKT.sel.slice(1)];if(g2){const L0=g2.it?{it:g2.it}:{r:g2.r,q:g2.q},f=fairOf(L0),pr=k=>Math.max(1,Math.round(f*k));
    det=`<div class="dn">${g2.it?itemName(g2.it):RES[g2.r].n+' ×'+g2.q}</div><p>Fair value about <b style="color:var(--ember)">${f}</b> shards${g2.it&&g2.it.by?' (named crafts sell for more)':''}. Pick a price:</p>
      <div class="acts" style="justify-content:flex-start">${[[.8,'Quick sale'],[1,'Fair'],[1.35,'Premium']].map(([k,l])=>`<button class="btn sm${MKT.price===k?'':' alt'}" data-mp="${k}">${l} · ${pr(k)}</button>`).join('')}</div>
      <div class="acts" style="justify-content:flex-start"><button class="btn sm" data-mk="list" ${s.list.length>=6?'disabled':''}>List on stall</button></div>${s.list.length>=6?'<div class="warn">Your stall holds 6 listings.</div>':''}`+det}}
  $('mkdet').innerHTML=det}
$('market').addEventListener('click',e=>{const b=e.target.closest('[data-mk],[data-mt],[data-ms],[data-mp],#mkclose');if(!b)return;const s=ST();
  if(b.id==='mkclose'){MKT=null;return unpause('market')}
  if(b.dataset.mt){MKT.tab=b.dataset.mt;MKT.sel=null}else if(b.dataset.ms)MKT.sel=b.dataset.ms;else if(b.dataset.mp)MKT.price=+b.dataset.mp;
  else{const a=b.dataset.mk;
    if(a==='rent'&&pl.shards>=50){pl.shards-=50;s.rent=true;s.last=Date.now();sfx.lvl()}
    else if(a==='collect'){pl.shards+=s.earn;S.nums.push({x:pl.x,y:pl.y-50,v:s.earn,t:0,c:'#e3b04b'});s.earn=0;sfx.pick()}
    else if(a==='unlist'){const L=s.list[+MKT.sel.slice(1)];if(L){if(L.it){if(pl.bag.length>=BAG_MAX)return;pl.bag.push(L.it)}else pl.mat[L.r]=mat(L.r)+L.q;s.list=s.list.filter(x=>x!==L);MKT.sel=null}}
    else if(a==='list'&&s.list.length<6){const goods=MKT.tab==='gear'?pl.bag.map((it,i)=>({it,i})):Object.keys(RES).filter(k=>mat(k)>0).map(r=>({r,q:mat(r)})),g2=goods[+MKT.sel.slice(1)];if(g2){
      const L=g2.it?{it:g2.it}:{r:g2.r,q:g2.q};L.price=Math.max(1,Math.round(fairOf(L)*MKT.price));if(g2.it)pl.bag.splice(g2.i,1);else pl.mat[g2.r]=0;s.list.push(L);MKT.sel=null;sfx.pick()}}}
  save();renderMarket()});
function openStation(st){if(st.req&&!qd(st.req)){banner('Locked',st.n+' opens later in the story');return}{const cl=crClosed(st.k==='board'?'board':'station',Z.id);if(cl&&st.k!=='stall'){banner('Closed',cl);return}}if(st.k==='board')openBoard(st);else if(st.k==='stall')openMarket();else openCraft(st)}
