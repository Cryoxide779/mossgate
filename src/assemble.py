h=open('px/head.html').read().replace("@media (max-width:560px){#creator .panel","#creator,#inv,#tree,#quests,#craft,#board,#market,#crisis,#deepm,#gmenu,#mapov{place-items:stretch}\n@media (max-width:560px){#creator .panel")
a="[hidden]{display:none!important}"
h=h.replace(a,a+"\nbody:not(.playing) #hud,body:not(.playing) #tr,body:not(.playing) #expbar,body:not(.playing) #touch,body:not(.playing) #keys,body:not(.playing) #qtrack,body:not(.playing) #talkbtn,body:not(.playing) #crchip,body:not(.playing) #shoutbar{display:none!important}",1)
js="\n".join(open('px/'+f).read() for f in ['js_core.js','js_data.js','js_char.js','js_mobs.js','js_game.js','js_story.js','js_craft.js','js_trade.js','js_world.js','js_ch3.js','js_crisis.js','js_bond.js','js_deep.js','js_reach.js','js_arms.js','js_home.js','js_lab.js','js_quarry.js','js_under.js','js_ruins.js','js_den.js','js_siege.js','js_crest.js','js_whisper.js','js_stone.js','js_materials.js','js_fen.js','js_bog.js','js_watch.js','js_rift.js','js_more.js','js_regions.js','js_map.js','js_polish.js','js_save.js','js_ctl.js','js_render.js','js_ui.js'])
b="$('title').hidden=true;$('creator').hidden=true;S.started=true;catchUpMarket();enterZone("
assert js.count(b)==1;js=js.replace(b,"document.body.classList.add('playing');"+b)
full=h+"\n<script>\n(()=>{\n'use strict';\n"+js+"\n})();\n</script>\n"
open('mossgate-pixel.html','w').write(full)
i=full.rindex('})();');open('dbgp.html','w').write(full[:i]+"window.__T={pl,S,ZONES,enterZone,applyGear,makeItem,gainExp,openInv,openTree,useZone,ZCACHE,MSP,GEAR,GEAR_MISSING,killMob,qShrine,get Z(){return Z},MOBS,spawnMob,rebuildPA,recalc,setupClassUI,DEF_LOOK,buildChar,previewEq,START,beginWith,iconURL,itemName,dRank,dGain,techInfo,openTree,openMenu,atkPow,openMastery,MX,CAP,REGIONS,deepLv,ZBAND,openLore,openCtlEd,enterHome,homeUse,homeNear,FURN,HOME_TIERS,openArrange,openStash,openVisit,growTick,addFurn,beginWith,inp,NPCS,QUESTS,openTalk,qReward,renderDlg,get DLG(){return DLG},closeDlg,openQuests,unpause,RECIPES,doCraft,topAt,buildNodeArt,NODE_SPR,openBoard,openMarket,openLore,LORE,hurtPl,hitMob,weather,nightAmt,dayT,makeFolk,CON,ST,marketRoll,conTurnIn,boardList,openCraft,gather,nearNode,RES,CRISES,CR,crAct,startCrisis,crAdd,crTick,openCrisis,crPopulate,crUse,crNear,crDeliver,crBreak,crResolve,crLegacy,renderCrisis,openMap,useWay,qEvent,clueArt,memArt,CB,befriend,bondNear,compKill,addTrust,setCmd,actBond,compHTML,deepEnter,genFloor,openDeep,DP,netPeers,NET,netInit,netZone,get GZ(){return Z}};\n"+full[i:])
open('t3.js','w').write("(()=>{"+js+"})();")
# ---- web/app build (GitHub Pages + Android app) ----
import os,json,time
w=full.replace('<script>\n(()=>{\n\'use strict\';','<script>\n'+open('px/fbnet.js').read()+'\n</script>\n<script>\n(()=>{\n\'use strict\';',1)
w=w.replace('<title>MossGate Sidescroller</title>','<title>MossGate</title>',1)
head_add='<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#081214"><link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/icon-180.png"><meta name="mobile-web-app-capable" content="yes">'
w=w.replace('<link rel="preconnect"',head_add+'<link rel="preconnect"',1)
ver=time.strftime('%Y.%m.%d-%H%M')
sw_reg="<script>window.MG_BUILD='"+ver+"';if('serviceWorker' in navigator&&location.protocol==='https:'){addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}))}</script>\n"
w=w.replace('</body>',sw_reg+'</body>') if '</body>' in w else w+sw_reg
w='<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n'+w+'\n</html>\n'
os.makedirs('app/www',exist_ok=True)
open('app/www/index.html','w').write(w)
open('app/www/version.json','w').write(json.dumps({'build':ver}))
