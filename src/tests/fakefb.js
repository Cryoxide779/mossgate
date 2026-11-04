/* test double for the Firebase modular SDK pieces fbnet.js uses; pages share state over BroadcastChannel */
(()=>{const bc=new BroadcastChannel('fakefb');let T={};const subs=[];let pushN=0;
const parts=p=>p.split('/').filter(Boolean);
const getAt=p=>{let n=T;for(const k of parts(p)){if(n==null||typeof n!=='object')return null;n=n[k]}return n??null};
function setAt(p,v,remote){const ks=parts(p);const before=JSON.stringify(T);if(!ks.length){T=v||{}}else{let n=T;for(const k of ks.slice(0,-1)){if(typeof n[k]!=='object'||n[k]==null)n[k]={};n=n[k]}if(v==null)delete n[ks.at(-1)];else n[ks.at(-1)]=JSON.parse(JSON.stringify(v))}
  if(!remote)bc.postMessage({k:'set',p,v});notify(before)}
const snaps=new Map();
function notify(){for(const s of subs)s.check()}
const snap=(key,val)=>({key,val:()=>val==null?null:JSON.parse(JSON.stringify(val)),exists:()=>val!=null,forEach:f=>{if(val&&typeof val==='object')for(const k of Object.keys(val))f(snap(k,val[k]))}});
bc.onmessage=e=>{const m=e.data;if(m.k==='set')setAt(m.p,m.v,true);else if(m.k==='hello')bc.postMessage({k:'dump',T});else if(m.k==='dump'&&!Object.keys(T).length){T=m.T;notify()}};
bc.postMessage({k:'hello'});
const ref=(db,p='')=>({path:parts(p).join('/'),key:parts(p).at(-1)});
const child=(r,k)=>ref(null,r.path+'/'+k);
const query=(r,...c)=>({...r,c});
const orderByChild=f=>({ob:f}),startAt=v=>({sa:v}),limitToLast=n=>({ll:n});
function children(q){const v=getAt(q.path)||{};let ent=Object.entries(v);const c=Object.assign({},...(q.c||[]));
  if(c.ob)ent.sort((a,b)=>(a[1][c.ob]??0)-(b[1][c.ob]??0));if(c.sa!=null)ent=ent.filter(e=>(e[1][c.ob]??0)>=c.sa);if(c.ll)ent=ent.slice(-c.ll);return ent}
function listen(q,kind,f){let prev=new Map();const s={check(){const now=new Map(children(q).map(([k,v])=>[k,JSON.stringify(v)]));
    for(const[k,v]of now){if(!prev.has(k)){if(kind==='add')f(snap(k,JSON.parse(v)))}else if(prev.get(k)!==v&&kind==='chg')f(snap(k,JSON.parse(v)))}
    if(kind==='rem')for(const[k,v]of prev)if(!now.has(k))f(snap(k,JSON.parse(v)));prev=now}};
  if(kind!=='add')prev=new Map(children(q).map(([k,v])=>[k,JSON.stringify(v)]));subs.push(s);s.check();return()=>{const i=subs.indexOf(s);if(i>=0)subs.splice(i,1)}}
const mods={
  'firebase-app':{initializeApp:c=>({c})},
  'firebase-auth':{getAuth:()=>({}),signInAnonymously:async()=>({user:{uid:'u'+Math.random().toString(36).slice(2,10)}})},
  'firebase-database':{getDatabase:()=>({}),ref,child,query,orderByChild,startAt,limitToLast,
    onValue:(r,f)=>{f(snap(r.key,r.path.startsWith('.info')?0:getAt(r.path)));return()=>{}},
    onChildAdded:(q,f)=>listen(q,'add',f),onChildChanged:(q,f)=>listen(q,'chg',f),onChildRemoved:(q,f)=>listen(q,'rem',f),
    set:async(r,v)=>setAt(r.path,v),remove:async r=>setAt(r.path,null),get:async q=>q.c?snap(q.key,Object.fromEntries(children(q))):snap(q.key,getAt(q.path)),
    push:r=>child(r,'e'+Date.now().toString(36)+(pushN++)+Math.random().toString(36).slice(2,5)),
    onDisconnect:r=>({remove:()=>{addEventListener('pagehide',()=>setAt(r.path,null))},cancel:async()=>{}})}};
window.__fbImport=async u=>{const m=u.match(/(firebase-[a-z]+)\.js$/);return mods[m[1]]};
window.__fakeT=()=>T;})();
