/* MossGate online play outside claude.ai (GitHub Pages + the Android app).
   Provides the same small room/db/user surface the game uses inside claude.ai, backed by
   Firebase Realtime Database with anonymous sign-in. Loaded only in the web/app build. */
(()=>{const ONLINE=false; /* set true once Firebase setup (README → Online play) is done */
if(!ONLINE||window.claude)return;
const CFG={apiKey:"AIzaSyCcVKSQbLl8Q6HA3L5-sufMbA8zf3pkIHc",authDomain:"mossgate-a3b56.firebaseapp.com",
  databaseURL:"https://mossgate-a3b56-default-rtdb.firebaseio.com",projectId:"mossgate-a3b56",
  storageBucket:"mossgate-a3b56.firebasestorage.app",messagingSenderId:"124414195175",appId:"1:124414195175:web:21fda3a4a8356b5e7df942"};
const V='10.14.1',IMP=window.__fbImport||(u=>import(u));
let boot=null;
function start(){if(boot)return boot;boot=(async()=>{
  const[A,U,D]=await Promise.all(['app','auth','database'].map(m=>IMP('https://www.gstatic.com/firebasejs/'+V+'/firebase-'+m+'.js')));
  const app=A.initializeApp(CFG),auth=U.getAuth(app),db=D.getDatabase(app);
  const cred=await Promise.race([U.signInAnonymously(auth),new Promise((_,j)=>setTimeout(()=>j(new Error('auth timeout')),12000))]);
  const uid=cred.user.uid,ME=uid+'_'+Math.random().toString(36).slice(2,7);let off=0;
  D.onValue(D.ref(db,'.info/serverTimeOffset'),s=>{off=s.val()||0});const now=()=>Date.now()+off;
  const safe=n=>String(n).replace(/[^A-Za-z0-9_-]/g,'_').slice(0,80);
  function room(name){const base='rooms/'+safe(name),pRef=D.ref(db,base+'/p'),eRef=D.ref(db,base+'/e'),myRef=D.child(pRef,ME);
    const peers=new Map(),ph=[],th={},unsub=[];let mine={},left=false,pend=null,last=0,timer=null;const t0=now();
    const me=()=>({peer:ME,by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,presence:mine,updatedAt:Date.now()});
    const list=()=>[me(),...peers.values()];
    const fire=(j,l,u)=>ph.forEach(f=>{try{f({peers:list(),joined:j,left:l,updated:u})}catch(_){}});
    const mk=s=>{const v=s.val()||{};return{peer:s.key,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,presence:v.d||{},updatedAt:v.s||0}};
    unsub.push(D.onChildAdded(pRef,s=>{if(s.key===ME)return;const p=mk(s);peers.set(s.key,p);fire([p],[],[])}));
    unsub.push(D.onChildChanged(pRef,s=>{if(s.key===ME)return;const p=mk(s);peers.set(s.key,p);fire([],[],[p])}));
    unsub.push(D.onChildRemoved(pRef,s=>{const p=peers.get(s.key);peers.delete(s.key);if(p)fire([],[p],[])}));
    unsub.push(D.onChildAdded(D.query(eRef,D.orderByChild('ts'),D.startAt(t0-500)),s=>{const v=s.val();if(!v||v.peer===ME)return;
      (th[v.t]||[]).forEach(f=>{try{f({peer:v.peer,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,topic:v.t,data:v.d})}catch(_){}})}));
    D.onDisconnect(myRef).remove();
    const flush=()=>{timer=null;if(left||!pend)return;last=Date.now();const d=pend;pend=null;D.set(myRef,{d,s:now()}).catch(()=>{})};
    return{name,
      presence:async p=>{if(left)return;mine={...mine,...p};pend=mine;const w=180-(Date.now()-last);if(w<=0)flush();else if(!timer)timer=setTimeout(flush,w)},
      emit:async(t,d)=>{if(left)return;(th[t]||[]).forEach(f=>{try{f({peer:ME,by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,topic:t,data:d})}catch(_){}});
        const r=D.push(eRef);await D.set(r,{t,d:d??null,peer:ME,ts:now()});setTimeout(()=>D.remove(r).catch(()=>{}),4000)},
      on:(t,f)=>{(th[t]=th[t]||[]).push(f);return()=>{th[t]=th[t].filter(x=>x!==f)}},
      peers:()=>list(),onPeers:f=>{ph.push(f);return()=>{const i=ph.indexOf(f);if(i>=0)ph.splice(i,1)}},
      connected:()=>true,onConnection:()=>()=>{},
      leave:async()=>{if(left)return;left=true;unsub.forEach(u=>{try{u()}catch(_){}});peers.clear();try{await D.onDisconnect(myRef).cancel();await D.remove(myRef)}catch(_){}}}}
  const lobby=room('lobby');lobby.join=async n=>room(n);
  /* tiny document store for the Veinway ledger */
  const coll=c=>{const R=D.ref(db,safe(c));const snapDoc=s=>({id:s.key,exists:s.exists(),data:()=>s.val()});
    return{doc:id=>{const r=D.child(R,safe(id));return{get:async()=>snapDoc(await D.get(r)),set:async v=>D.set(r,v)}},
      orderBy:(f,dir)=>({limit:n=>({get:async()=>{const s=await D.get(D.query(R,D.orderByChild(f),D.limitToLast(n)));const docs=[];s.forEach(c=>{docs.push(snapDoc(c))});if(dir==='desc')docs.reverse();return{docs}}})})}};
  return{lobby,db:{collection:coll},user:{id:async()=>uid}}})();boot.catch(e=>{console.warn('[MossGate online] offline:',e&&e.message)});return boot}
window.claude={use:async n=>{const B=await start();return n==='room'?B.lobby:n==='db'?B.db:n==='user'?B.user:null}};
})();
