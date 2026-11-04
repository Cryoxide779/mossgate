(()=>{const ME='p'+Math.random().toString(36).slice(2,8);
function mk(name){const bc=new BroadcastChannel('mr-'+name),peers=new Map(),ph=[],th={};let mine={};
  const list=()=>[{peer:ME,by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,presence:mine,updatedAt:Date.now()},...[...peers.values()]];
  const fire=(j,l,u)=>ph.forEach(f=>f({peers:list(),joined:j,left:l,updated:u}));
  bc.onmessage=e=>{const m=e.data;if(m.peer===ME)return;
    if(m.k==='pres'){const had=peers.has(m.peer);const p={peer:m.peer,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,presence:m.p,updatedAt:Date.now()};peers.set(m.peer,p);fire(had?[]:[p],[],had?[p]:[]);if(m.hello)bc.postMessage({k:'pres',peer:ME,p:mine})}
    else if(m.k==='bye'){const p=peers.get(m.peer);peers.delete(m.peer);if(p)fire([],[p],[])}
    else if(m.k==='ev')(th[m.t]||[]).forEach(f=>f({peer:m.peer,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,topic:m.t,data:m.d}))};
  bc.postMessage({k:'pres',peer:ME,p:mine,hello:1});
  return{name,emit:async(t,d)=>{bc.postMessage({k:'ev',peer:ME,t,d});(th[t]||[]).forEach(f=>f({peer:ME,by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,topic:t,data:d}))},
    on:(t,f)=>{(th[t]=th[t]||[]).push(f);return()=>{}},presence:async p=>{mine={...mine,...p};bc.postMessage({k:'pres',peer:ME,p:mine})},peers:()=>list(),
    onPeers:f=>{ph.push(f);return()=>{}},connected:()=>true,onConnection:()=>()=>{},leave:async()=>{bc.postMessage({k:'bye',peer:ME});bc.close()}}}
const lobby=mk('lobby');lobby.join=async n=>mk(n);
window.claude={use:async n=>n==='room'?lobby:null}})();
