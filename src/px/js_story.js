/* ---------- story: people of the Reach ---------- */
const NPCS={
  ysel:{name:'Ysel',title:'Pilgrim House Elder',x:300,sprite:'elder',
    lines:['I kept a Pilgrim House in MossGate for forty years. Now I keep a broken wagon and thirty frightened people.','The Ash Road runs east to CrestHollow. Every caravan that makes it there is a small miracle.','The alarms rang before anyone saw an attack. Remember that, if anyone asks you how it happened.']},
  ren:{train:['archery','light'],name:'Ren',title:'Free Road Scout',x:752,cls:'ashbow',look:{sex:0,build:0,face:4,hair:0,hairC:1,beard:1,skin:2,eye:2,outfit:1},eq:'a_start',
    lines:['The Free Road Companies pay me to keep this stretch open. Mostly I watch it get worse.','CrestHollow is just east of here. Follow the wagon ruts.','Saw a wisp out here last night. I swear it was humming a Concordance road chant.']},
  bram:{name:'Bram',title:'East Gate Watch',x:1530,cls:'ronin',look:{sex:0,build:2,face:2,hair:4,hairC:0,beard:4,skin:4,eye:0,outfit:3},eq:{chest:'warden',hands:'warden',feet:'warden'},
    lines:['East gate leads to Whisper Woods. Wipe your boots on the way back in. The moss spreads.','The Charter Hall keeps the peace in CrestHollow. Captain Holt keeps the gates.','I stood at the Broken Road when the dead started marching. I ran. Somebody had to live to build this wall.']},
  tamsin:{name:'Tamsin',title:'Founders’ Market',x:1210,shop:1,cls:'ronin',weap:'none',look:{sex:1,build:1,face:1,hair:3,hairC:2,beard:0,skin:1,eye:3,outfit:5},eq:{head:'wanderer',chest:'r_start',feet:'r_start'},
    lines:['Tonics, wraps, a little hope. Shardstone only, love.','The Merchant Compact used to guarantee every coin in the Reach. Now a shard is the only coin nobody can forge.','Prices go up every time a caravan fails to arrive. I hate it more than you do.']},
  pip:{name:'Pip',title:'Wayfarer House',x:1060,cls:'ronin',weap:'none',look:{sex:0,build:0,face:1,hair:1,hairC:3,beard:0,skin:0,eye:1,outfit:0},
    lines:['Are you a hero? You look a bit like a hero.','My mum stayed behind in MossGate to help with the seals. The captain says she is "unaccounted for". That is not the same as gone.','Tobin says the Veinways sing at night. I do not believe him. Mostly.']},
  holt:{train:['blade','heavy','medium'],name:'Captain Maren Holt',title:'Warden Successors',x:872,cls:'ronin',look:{sex:1,build:1,face:4,hair:6,hairC:7,beard:0,skin:3,eye:0,outfit:2},eq:{chest:'warden',hands:'warden',feet:'warden',weapon:'warden'},
    lines:['The Warden Orders kept the seals around things that could not be killed. What is left of us is trying to find out which seals still hold.','Every name on the Hollow Square board is someone still missing. Some of them we will find.','If you are staying in CrestHollow, you are working. That is the only rule.']},
  nell:{train:['nature','robes'],name:'Nell',title:'Herbalist',x:700,cls:'weaver',look:{sex:1,build:0,face:0,hair:2,hairC:6,beard:0,skin:2,eye:2,outfit:1},eq:{head:'moss',chest:'moss'},
    lines:['Mind the jars. That one bites.','Slimes are not pests, you know. Healthy ones eat rot and leave clean soil. It is the corrupted ones you have to worry about.','A tonic gives back four parts in ten of your strength. I have tried for five. The Veinways will not let me.']},
  hesk:{train:['paired','medium'],name:'Hesk',title:'Workyard Smith',x:618,cls:'ronin',weap:'none',look:{sex:0,build:2,face:2,hair:4,hairC:5,beard:5,skin:5,eye:3,outfit:4},eq:{hands:'husk',feet:'husk'},
    lines:['Hammer, anvil, heat. The rest is stubbornness.','We lost every good workshop in MossGate. Now the Workyard is a shed, three furnaces and me.','Bring me something worth working, and I will work it.']},
  wren:{train:['necro'],name:'Archivist Wren',title:'Lantern Annex',x:440,cls:'weaver',look:{sex:1,build:0,face:3,hair:2,hairC:4,beard:0,skin:6,eye:4,outfit:4},eq:{head:'wisp',chest:'wisp',weapon:'wisp'},
    lines:['The Lantern Archive kept maps, laws and histories. And, quietly, the patterns of every seal in MossGate. I saved what I could carry.','Records lie now. Signals lie. That is the first thing the Gatefall broke: our ability to trust what we were told.','The Veinways do not care about borders. Whatever escaped MossGate is following the currents.']},
  marga:{name:'Marga',title:'Caravan Exchange',x:310,cls:'ronin',weap:'none',look:{sex:1,build:2,face:1,hair:3,hairC:5,beard:0,skin:3,eye:3,outfit:3},eq:{chest:'a_start',feet:'a_start'},
    lines:['Nearly every bulk shipment leaving Ashveil Reach passes through this exchange. Freight, insurance, collateral. Nothing moves on promises any more.','Cargo has weight, route risk and an owner. Lose it and someone pays. Usually the escort.','The Ironfold Plains are past the south road. Iron comes north, timber and herbs go south. When the bridge closes, prices go mad.']},
  oswin:{name:'Oswin',title:'Bridgewarden',x:500,cls:'ronin',look:{sex:0,build:2,face:2,hair:4,hairC:4,beard:3,skin:2,eye:0,outfit:3},eq:{head:'warden',chest:'warden',feet:'warden'},
    lines:['The Great Bridge is the only decisive crossing toward the Ironfold Plains. I inspect it, I toll it, and I defend it.','Every flood season the river tries to take a pier. Every season the Bridgewrights put it back.','Toll is waived for refugees and for anyone carrying medicine. Do not make me regret it.']},
  dov:{name:'Dov',title:'Road Company',x:180,cls:'ashbow',look:{sex:0,build:1,face:4,hair:0,hairC:2,beard:1,skin:4,eye:2,outfit:1},eq:'a_start',
    lines:['The Free Road Companies keep the routes open. For a fee. Somebody has to pay for the blood.','Some say we should be a public service. Others say a monopoly. I say the wagons arrive.','Misty Fen Lake is east across the bridge. Ferries move cargo there when the roads are worse than the water.']},
  garr:{name:'Garr',title:'Logger’s Rest Foreman',x:450,cls:'ronin',weap:'none',look:{sex:0,build:2,face:2,hair:4,hairC:2,beard:4,skin:2,eye:0,outfit:1},eq:{head:'boar',chest:'boar',feet:'boar'},
    lines:['Timber feeds every wall in CrestHollow. We cut it sustainably or we cut it once.','The wolves were never this bold. Something pushed the packs out of their range.','Forest Slimes eat the rot off the fallen logs. Leave the clean ones be. They work for free.']},
  yenna:{name:'Yenna',title:'Grove Warden',x:190,cls:'weaver',look:{sex:1,build:0,face:3,hair:2,hairC:6,beard:0,skin:3,eye:2,outfit:1},eq:{head:'rotstag',chest:'rotstag'},
    lines:['The great oak’s roots once steadied the whole western forest. Now they carry something else.','Killing corruption is not the same as healing what it damaged. Remember that here.','The Rotstags sense corrupted growth long before we do. When they flee, listen.']},
  nib:{name:'Nib Gearwhistle',title:'Scrapcap Boss',x:250,sprite:'gob',gob:'gob',
    lines:['Mill’s ours. Squatter’s rights, salvage rights, and the right of nobody-else-wanted-it.','Scrapcaps fix what humans break. Then humans want it back. Funny, that.','You hear the wheel creak at night? That is the Sawtusk scratching. Not ghosts. Probably.']},
  rivet:{name:'Rivet',title:'Scrapcap Mechanic',x:380,sprite:'gob',gob:'gob',
    lines:['Sap gets in the gears. Sap gets in everything. Sap got in my lunch.','Bring me salvage and I will build you something that mostly works.','The sap slimes are not evil. They are just very, very sticky.']},
  tansy:{name:'Mother Tansy',title:'Mossroot Elder',x:300,sprite:'gob',gob:'mossgob',
    lines:['Take what the Hollow offers. Never the last cap, never the mother-root. That is the Accord.','The spirit of these tunnels keeps us as long as we keep the limits.','Humans name things and then think they own them. We just name things.']},
  pell:{name:'Pell',title:'Mossroot Handler',x:540,sprite:'gob',gob:'mossgob',
    lines:['Every creature in the Hollow has a reason for being cross with you. Learn the reason.','The rotstags come here to calve. Walk slow and they will let you pass.','A sporecap is only angry when the rot is in it. Clean ones just nod at you.']},
  alder:{name:'Brother Alder',title:'Purifier of the Lantern Order',x:180,cls:'weaver',look:{sex:0,build:0,face:1,hair:3,hairC:6,beard:2,skin:1,eye:1,outfit:3},eq:{head:'wisp',chest:'w_start'},
    lines:['Burn too much and the Reach dies with the rot. Burn too little and the rot reaches CrestHollow’s wells.','The rot follows the roots, and the roots follow the water.','I was sent to study it. I stayed because nobody else would.']},
  tilla:{name:'Tilla',title:'Reedfoot Ferrywoman',x:110,sprite:'gob',gob:'reed',
    lines:['Reedfoot goblins have fished this lake since before MossGate had walls. We are not leaving because the water turned sour.','Ferries move cargo here when the roads are worse than the water. Lately that is most days.','Mind the lurkers. They are guarding nests, not hunting you. Mostly.']},
  sef:{name:'Sef',title:'Spirit Worker',x:180,cls:'necro',look:{sex:1,build:0,face:4,hair:5,hairC:4,beard:0,skin:6,eye:4,outfit:4},eq:{head:'stalker',chest:'n_start',weapon:'n_start'},
    lines:['Marrowbog remembers everyone it drowned. I listen so it does not have to shout.','Necromancy is not a crime here. Carelessness is.','The old Concordance road runs under this water. Its orders still float up.']},
  ilse:{name:'Ilse',title:'Concord Surveyor',x:200,cls:'ashbow',weap:'none',look:{sex:1,build:1,face:0,hair:3,hairC:1,beard:0,skin:2,eye:1,outfit:5},eq:{head:'gob',chest:'a_start',feet:'a_start'},
    lines:['That beacon has been dead for years. Three weeks ago it started broadcasting a valid Concordance route signal.','A valid signal from a dead tower is either a miracle or a trap. My job is to find out which.','Rebuild it, and it could be the first outpost anyone has reclaimed since the Gatefall.']},
  ves:{name:'Captain Ves',title:'Free Road Company',x:90,cls:'ronin',look:{sex:0,build:1,face:4,hair:0,hairC:0,beard:2,skin:4,eye:3,outfit:2},eq:{head:'wanderer',chest:'raider',hands:'raider'},
    lines:['The Broken Road is the northern freight bottleneck. Whoever holds it holds the Reach by the throat.','The Freeband are refugees who learned that a toll pays better than begging. Knowing that does not make them right.','Lawful contracts or steel. I offer both.']},
  corwin:{name:'Corwin',title:'Exorcist',x:1060,cls:'necro',look:{sex:0,build:1,face:3,hair:4,hairC:5,beard:1,skin:1,eye:4,outfit:4},eq:'n_start',
    lines:['An exorcist names what does not belong. The Scar is full of things that do not belong.','A naturalist told me this is only an injured Veinway defending itself. We are both partly right. That frightens me more.','Shardstone sings if you hold it too long. Do not listen.']},
  tobin:{name:'Tobin',title:'Bard',x:226,cls:'ronin',weap:'none',look:{sex:0,build:1,face:3,hair:5,hairC:2,beard:2,skin:1,eye:1,outfit:5},eq:{head:'wanderer',chest:'wanderer'},
    lines:['~ The bells rang out before the foe, the seals unlocked from deep below ~','I am writing the ballad of the Gatefall. Every survivor tells it differently. That is the problem.','Pull up a log. The fire is free and the songs are cheap.']}
};

/* ---------- quests ---------- */
const QUESTS={
  m1:{main:1,title:'The Fallen Caravan',giver:'ysel',lv:1,
    offer:'You are on your feet. Good. The slimes came out of the ditches the moment the axle broke. Moss Slimes, fat on Veinway runoff, and they are eating our grain. Drive five of them off before they reach the wagons.',
    desc:'Protect Ysel’s wrecked caravan on the Ash Road.',goal:{t:'kill',mob:'moss',n:5,zone:'road',lab:'Moss Slimes driven off'},where:'The Ash Road, around the wrecked caravan',
    prog:'Five, I said. They are slow, but there are a great many of them.',
    done:'That will hold them. You fight like someone with nothing left to lose, and on this road that is most of us. Take these: Shardstone fragments, the only coin anyone trusts since the Merchant Compact fell.',reward:{exp:60,sh:15}},
  m2:{main:1,title:'Papers That Disagree',giver:'ysel',pre:'m1',
    offer:'One more thing. We carry a sealed MossGate lockbox, and three sets of travel papers for it. Each names a different owner. Each is stamped by the Concordance. Take the papers east to CrestHollow and give them to Captain Holt of the Warden Successors. If anyone can tell which one is real, it is her.',
    desc:'Carry the caravan’s contradictory papers to Captain Holt in CrestHollow.',goal:{t:'talk',npc:'holt'},where:'CrestHollow, east along the Ash Road',
    prog:'East, through the portal at the end of the road. CrestHollow is the first wall you will see.',
    done:'Three owners, three valid seals. That should be impossible. The Concordance never stamped anything twice. Welcome to CrestHollow, stranger. You have walked straight into the oldest question we have: who broke MossGate, and how did they make the city lie for them?',reward:{exp:90,sh:20}},
  m3:{main:1,title:'Lanterns in the Fen',giver:'holt',pre:'m2',lv:3,to:'wren',
    offer:'Lantern Archive couriers carried signals between the districts. When the Gatefall came, many drowned on the fen road. Their memories still drift there as Ink Wisps, each holding an ember of what it saw. Archivist Wren can read them. Bring her four from Misty Fen Lake, past Stonebridge through the south gate.',
    desc:'Gather Lantern Embers from Ink Wisps and bring them to Archivist Wren.',goal:{t:'collect',mob:'wisp',item:'Lantern Ember',n:4,p:.6},where:'Misty Fen Lake: CrestHollow south gate, then through Stonebridge',
    prog:'The wisps haunt Misty Fen Lake, past Stonebridge. Take the embers to Wren at the Lantern Annex, not to me.',
    done:'Still warm. Hush, listen... These are courier memories from the night itself. The ward-signals reported all clear while the towers were burning. The alarms rang before any attack was seen. And the sealed districts did not break open. They opened from the inside.',reward:{exp:220,sh:30,item:['wisp','charm',1]}},
  m4:{main:1,title:'The Dead Still March',giver:'holt',pre:'m3',lv:5,
    offer:'Opened from the inside. So someone gave the order. While Wren digs, I need the Broken Road cleared. The Concordance road wardens who died there still walk it, all ash and habit, stopping every wagon that passes. Disrupted death currents, Wren calls it. I call it my old patrol. Give them rest.',
    desc:'Lay the Ashen Husks on the Broken Road to rest.',goal:{t:'kill',mob:'husk',n:8,lab:'Husks laid to rest'},where:'The Broken Road: north gate, past the Old Watchtower',
    prog:'They were good wardens. Do not hesitate because of it. They would hate that.',
    done:'Thank you. I will carve their names on the Hollow Square board tonight, under "found". This came from a Warden cache on the road. It is yours.',reward:{exp:450,sh:50,item:['husk','chest',1]}},
  m5:{main:1,title:'The Seal Warden',giver:'holt',pre:'m4',lv:8,
    offer:'Beyond the Broken Road, at the heart of the Sundering Scar, stands a Seal Warden: a relic construct the Warden Orders built to guard a containment chamber. It is still following its last instruction, and it kills anything that comes near. If someone ordered the seals open, that construct heard the order. Break it, and bring Wren its core.',
    desc:'Enter the Scar Heart and stop the Seal Warden.',goal:{t:'kill',mob:'warden',n:1,lab:'Seal Warden stopped'},where:'Scar Heart, beyond the Outer Scar (sealed until Lv 10)',
    prog:'The Scar Heart will not let you through until you are ready. Its boundary shifts against the unprepared.',
    done:'It is down? Then the Orders’ last guardian rests. Take this: the construct’s own steel. Wield it better than we did. Now go to Wren with that core. She has been pacing since you left.',reward:{exp:1500,sh:150,item:['warden','weapon',2]}},
  m6:{main:1,title:'What Was Beneath',giver:'holt',pre:'m5',
    offer:'Wren is at the Lantern Annex with that core. Whatever she found, she would not tell me. She will tell you.',
    desc:'Learn what Archivist Wren found inside the Seal Warden’s core.',goal:{t:'talk',npc:'wren'},where:'CrestHollow, Lantern Annex',
    prog:'Wren is by the Lantern Annex. Go.',
    done:'Its last instruction was not "hold the seal". It was "release". Issued with a valid Concordance command, three days before the Gatefall. Someone inside MossGate opened the seals on purpose. And the chamber this Warden guarded is not empty any more. Whatever was beneath the city has woken. Rest while you can. Chapter II begins at the Scar.',reward:{exp:300,sp:1}},
  drill:{title:'Guard Drills',giver:'bram',pre:'m2',lv:1,
    offer:'You fight like someone who has never been taught to stop a blow. Out there, you will meet things that hit harder than you. So: hold Guard to block anything in front of you. It costs stamina, and if your stamina runs dry your guard breaks. Better: raise your guard just before a hit lands. Time it right and you parry: no damage, and whatever struck you staggers. Arrows and bolts fly back where they came from. Show me three parries.',
    desc:'Land three perfect parries. Raise your guard just before a hit lands.',goal:{t:'parry',n:3,lab:'Perfect parries'},where:'Anywhere outside the walls',
    prog:'Three parries. Guard just before the blow, not long before. Holding it up the whole time is a block, not a parry. And if you cannot block it, roll through it.',
    done:'Good. That is what kept me alive at the Broken Road. Remember: a staggered enemy takes heavier wounds, and heavy techniques break their stance faster.',reward:{exp:120,sh:20,pots:1}},
  w0:{title:'A Sustainable Cut',giver:'garr',lv:1,
    offer:'Every wall in CrestHollow is made of this forest. Fallen and storm-split timber first, live trees never. Gather five timber from the downed logs around the woods. Tap Gather, or press up, beside a log.',
    desc:'Gather timber from fallen logs for Logger’s Rest.',goal:{t:'gather',res:'timber',n:5},where:'Whisper Woods: look for fallen logs',
    prog:'Five timber. A stripped log grows back its usable wood after a while, so spread out.',done:'Clean cuts. Keep the timber, I only wanted to see you could do it right. Take it to the Workyard in CrestHollow and Hesk will show you what it is for.',reward:{exp:80,sh:15}},
  h1:{title:'First Forging',giver:'hesk',pre:'m2',lv:1,
    offer:'A blade you made yourself is worth three you found. Make something at my Workyard forge. Anything. Leather gloves from wolf or boar hide, an oak staff from timber, iron if you can find ore near the Old Watchtower.',
    desc:'Craft any item at a station.',goal:{t:'craft',n:1},where:'The Workyard forge in CrestHollow, or any station',
    prog:'Stand at the forge and choose a recipe. Hide comes from beasts, timber from fallen logs, ore from the northern hills.',done:'Your name is on it now. In this Reach that means something. People remember who made the gear that held.',reward:{exp:120,sh:20}},
  w1:{title:'Teeth in the Timber',giver:'garr',lv:2,
    offer:'Wolves have been hitting my cutters on the forest road. A pack this bold was pushed here by something worse, but I cannot fix that today. Drive off five of them so my crews can work.',
    desc:'Drive off the wolves harrying Logger’s Rest.',goal:{t:'kill',mob:'wolf',n:5,zone:'outskirts',lab:'Wolves driven off'},where:'Whisper Woods',
    prog:'Five wolves. They circle the clearing at dusk.',done:'Quiet again. Thank you. And... come here. We found something in a den after the pack scattered.',reward:{exp:140,sh:25}},
  w2:{title:'Raised by Hand',giver:'garr',pre:'w1',lv:3,
    offer:'A pup. The pack left it behind. It will not take scraps from us, but it might from whoever drove its pack off. It needs clean meat. Boars are plentiful in these woods.',
    desc:'Gather clean boar meat to win a wolf pup’s trust.',goal:{t:'collect',mob:'boar',item:'Clean Meat',n:4,p:.6},where:'Whisper Woods',
    prog:'Four cuts of clean meat. It is watching you, you know.',done:'Look at that. It ate from your hand. Trust, not a leash: that is how it works out here. Its name is Ash, if you want my opinion.',reward:{exp:160,comp:'wolf'}},
  o1:{title:'Herd Without a Home',giver:'yenna',lv:3,
    offer:'The Rotstags are fleeing the grove. Corrupted Moss Slimes are spreading the rot they can smell. Thin the corrupted growth, six of them, and the herd may return.',
    desc:'Clear corrupted Moss Slimes from Fallen Oak Grove.',goal:{t:'kill',mob:'moss',n:6,zone:'oak',lab:'Corrupted slimes cleared'},where:'Fallen Oak Grove',
    prog:'Six. The corrupted ones glitter when the light hits them.',done:'The herd is grazing again. One young stag keeps following your trail. They remember who cleared the path. If it chooses you, let it.',reward:{exp:180,comp:'rotstag'}},
  o2:{title:'The Heartwood',giver:'yenna',pre:'o1',lv:5,
    offer:'The treant by the great oak was the grove’s guardian. Something invasive has overtaken it. I cannot reach it through the corruption. You can break the hold by force. Do not mistake that for killing it.',
    desc:'Break the corruption’s hold on the grove’s guardian.',goal:{t:'kill',mob:'treant',n:1,lab:'Treant freed'},where:'Fallen Oak Grove, by the great oak',
    prog:'It stands by the great oak. Strike the corruption, not the tree.',done:'It has sunk back into sleep, not death. Purified. In a season it may wake as itself. Take this: heartwood it shed when the hold broke.',reward:{exp:500,sh:60,item:['treant','charm',2]}},
  f1:{title:'Toxic Bloom',giver:'tilla',lv:3,
    offer:'Something is blooming in the lake. The Bog Slimes filter it, which makes them the best samples. Bring me five and I can tell my people which channels are safe.',
    desc:'Collect Bloom Samples from Bog Slimes for the Reedfoot.',goal:{t:'collect',mob:'bogslime',item:'Bloom Sample',n:5,p:.6},where:'Misty Fen Lake or Marrowbog',
    prog:'Five samples. Sealed jars, please. I am not drinking this lake by accident.',done:'Shardstone dust. In the water. It is coming down from the Scar with the rain. Two tonics for your trouble.',reward:{exp:200,pots:2}},
  f2:{title:'Ferry Lanes',giver:'tilla',pre:'f1',lv:4,
    offer:'The lurkers moved their nests into the ferry channels. They guard eggs, they do not hate us, but my boats keep sinking. Drive three of them back from the lanes.',
    desc:'Drive the Swamp Lurkers out of the ferry channels.',goal:{t:'kill',mob:'lurker',n:3,lab:'Lurkers driven back'},where:'Misty Fen Lake or Marrowbog',
    prog:'Three. Watch the water around the pool.',done:'The lanes are open. Marga at Stonebridge will be glad to hear it.',reward:{exp:260,sh:35}},
  b1:{title:'Freight for the Fen',giver:'marga',lv:2,
    offer:'I have a crate of rope and tar bound for the Reedfoot ferry at Misty Fen Lake. The escort quit. You look like you do not quit. Carry it to Tilla.',
    desc:'Deliver Marga’s freight to Tilla at Misty Fen Lake.',goal:{t:'talk',npc:'tilla'},where:'Misty Fen Lake, east across the Great Bridge',
    prog:'East across the bridge. Tilla is the goblin with the bad hat.',done:'Rope and tar! Marga remembered. Tell her the ferry runs again, as long as the lurkers allow it.',reward:{exp:150,sh:30}},
  b2:{title:'Broken Bridge Season',giver:'oswin',lv:3,
    offer:'Floodwater cracked the second pier. The Bridgewrights have the skill, but not the coin for stone. Every traveler who uses this bridge owes it something. I am asking for fifty shards toward the repair fund.',
    desc:'Contribute to the Great Bridge repair fund.',goal:{t:'pay',n:50},where:'Stonebridge',
    prog:'Fifty shards, when you have them. The river is patient. We are not.',done:'Recorded in the bridge ledger under your name. That is how reputation works here. The Bridgewrights send these.',reward:{exp:220,pots:3}},
  g1:{title:'Phantom Orders',giver:'sef',lv:4,
    offer:'The wisps here are drowned couriers. They still carry delivery orders for a Concordance depot that has been underwater for years. Bring me four of their orders. I want to know who is still sending them.',
    desc:'Recover Phantom Orders from wisps in Marrowbog.',goal:{t:'collect',mob:'wisp',item:'Phantom Order',n:4,p:.6,zone:'bog'},where:'Marrowbog',
    prog:'Four orders. They float out of the wisps when they fade.',done:'Look at the seal. It is the same Concordance command seal Wren found in the Seal Warden. Someone used it here, too. Tell no one yet.',reward:{exp:280,sh:40}},
  g2:{title:'The Unremembered',giver:'sef',pre:'g1',lv:5,
    offer:'Hollow Stalkers hunt the eastern pools. Whatever touched them took their memories, and now they take ours. Four of them stalk the boardwalks. Stop them before they reach my door.',
    desc:'Stop the Hollow Stalkers on the Marrowbog boardwalks.',goal:{t:'kill',mob:'stalker',n:4,lab:'Stalkers stopped'},where:'Marrowbog',
    prog:'You will not see them until they are close. Listen for the silence.',done:'The bog feels louder already. Take this. It was in one of them, and it still does not make a sound.',reward:{exp:340,item:['stalker','charm',1]}},
  t1:{title:'Signal From the Dead',giver:'ilse',lv:3,
    offer:'The Scrapcap goblins stripped the tower’s signal assembly. I need four components back. Take them by force if you must, but they are salvagers, not thieves, so listen first.',
    desc:'Recover signal components from the Scrapcap goblins.',goal:{t:'collect',mob:'gob',item:'Signal Component',n:4,p:.6},where:'Old Watchtower',
    prog:'Four components. Brass and glass, about the size of your fist.',done:'They told you the beacon switched on by itself before they touched it? Then someone is broadcasting through a dead tower. Valid signals, false routes.',reward:{exp:220,sh:30}},
  t2:{title:'Mortar and Iron',giver:'ilse',pre:'t1',lv:4,
    offer:'To stabilize the tower I need timber, iron fittings and mortar. Stonebridge will sell them, for shards. Sixty will do it.',
    desc:'Fund the materials to stabilize the Old Watchtower.',goal:{t:'pay',n:60},where:'Old Watchtower',
    prog:'Sixty shards for materials. Every crew in the Reach is paid in shards now.',done:'Materials are on their way. When the crews finish, someone has to decide what this tower becomes.',reward:{exp:250}},
  t3:{title:'The Outpost Charter',giver:'ilse',pre:'t2',lv:4,
    offer:'The tower stands. Now it needs a charter. You did the work, so you choose what it serves. Whatever you pick, the core roads stay open to everyone.',
    desc:'Choose the charter for the restored Old Watchtower.',goal:{t:'talk',npc:'ilse'},where:'Old Watchtower',
    prog:'',done:'Four charters have been proposed. Each changes who comes here and what work they bring. Choose.',reward:{exp:300},
    choices:[{n:'Civic Watch',d:'Patrols and order. Safer roads, more Warden influence.',flag:'watch',reward:{item:['warden','head',2]}},
      {n:'Road Company Station',d:'Freight and contracts. Cheaper trade, less protection.',flag:'road',reward:{sh:120}},
      {n:'Research Annex',d:'Maps and records for the Lantern Archive.',flag:'annex',reward:{sp:1}},
      {n:'Creature Refuge',d:'Shelter for displaced creatures. A Lantern Slime chooses to stay with you.',flag:'refuge',reward:{comp:'lantern'}}]},
  r1:{title:'The Toll-Takers',giver:'ves',lv:6,
    offer:'The Ashroad Freeband are extorting every wagon on this road. Some of them would take honest contract work if their leaders let them. Break six of their enforcers and the rest might listen.',
    desc:'Break the Freeband enforcers holding the Broken Road.',goal:{t:'kill',mob:'raider',n:6,lab:'Enforcers broken'},where:'The Broken Road',
    prog:'Six. The ones in red kerchiefs.',done:'Three of them came to my camp asking about contracts. That is how a road reopens. One fight and a lot of paperwork.',reward:{exp:520,sh:60}},
  s1:{title:'Scar Pressure',giver:'corwin',lv:7,
    offer:'Shardstone is erupting through the crust. The Shard Slimes absorb the loose dust, which makes them carry it everywhere. Bring me five loose shards and I can measure how fast the pressure is rising.',
    desc:'Gather loose Shardstone from Shard Slimes.',goal:{t:'collect',mob:'shardslime',item:'Loose Shardstone',n:5,p:.6},where:'Outer Scar',
    prog:'Five shards. Wear gloves. Do not listen to them.',done:'Faster than I feared. The Scar is building toward something. Here, for your trouble.',reward:{exp:700,sh:70}},
  s2:{title:'The Overgrown Shrine',giver:'corwin',pre:'s1',lv:7,
    offer:'There is an overgrown travel shrine here, choked by Shardstone. If it can be attuned, it anchors this part of the Scar. Kneel there and let it learn you.',
    desc:'Attune the Overgrown Shrine in the Outer Scar.',goal:{t:'shrine',zone:'scar',n:1,lab:'Attune the Overgrown Shrine'},where:'Outer Scar',
    prog:'The shrine stands past the shard fields. Kneel and press up.',done:'It answered. The Veinway here is wounded, not dead. That changes everything I believed about this place.',reward:{exp:600,sp:1}},
  m7:{main:1,ch:2,title:'Three Seals',giver:'wren',pre:'m6',lv:8,
    offer:'Sef sent a runner from Marrowbog. She has found the same command seal on drowned delivery orders. The seal that told the Warden to release. Go to her. I need to know if this is coincidence or a pattern.',
    desc:'Ask Sef in Marrowbog about the drowned orders and their seal.',goal:{t:'talk',npc:'sef'},where:'Marrowbog, by the boardwalks',
    prog:'Sef is in Marrowbog. South gate, through Stonebridge and the fen.',
    done:'Not coincidence. Every phantom order routes the same way: to the Old Watchtower, then north. Someone is using a dead beacon to direct sealed cargo into the Scar. Ilse needs to hear this, and she needs proof.',reward:{exp:420,sh:40}},
  m8:{main:1,ch:2,title:'The Lit Tower',giver:'sef',pre:'m7',lv:8,to:'ilse',
    offer:'The wisps around the tower carry echoes of the beacon’s signal the way my drowned couriers carry orders. Bring Ilse three Signal Echoes. She can read route codes. I can only read the dead.',
    desc:'Gather Signal Echoes from the wisps around the Old Watchtower for Ilse.',goal:{t:'collect',mob:'wisp',item:'Signal Echo',n:3,p:.7,zone:'tower'},where:'Old Watchtower, north gate of CrestHollow',
    prog:'The tower wisps drift above the plateau. Three echoes.',
    done:'Decoded. Those are not caravan routes. They are coordinates inside the Inner Scar, past the shard fields, behind a doorway the Warden Orders sealed. It is open now. Someone opened it for the cargo.',reward:{exp:520,sh:50}},
  m9:{main:1,ch:2,title:'Into the Inner Scar',giver:'ilse',pre:'m8',lv:9,to:'corwin',
    offer:'The doorway is in the Outer Scar, partway along the shard fields. Go through. Find what the signal is pointing at, and bring back anything that carries a seal. Then find Corwin. If anyone can name what is in there, an exorcist can.',
    desc:'Enter the Inner Scar and find a record carrying a seal.',goal:{t:'lore',id:'innerB',n:1},where:'Inner Scar, through the doorway in the Outer Scar',
    prog:'Look for anything written. A seal-book, a ledger. It will glint.',
    done:'Lector Aurin’s seal. On requisitions dated last week. And the thing in the deep fields is the "cargo" they have been routing. The Orders called it an Unbound: a presence that could not be killed, only held. Someone has been feeding it.',reward:{exp:600,sp:1}},
  m10:{main:1,ch:2,title:'What Answers When Called',giver:'corwin',pre:'m9',lv:10,
    offer:'I cannot banish what I cannot name, and the Unbound has no name left. But it can be scattered. Break its form and whatever feeds it loses its prize, for a while. It hides behind shards and calls fiends from the cracks. Do not stand still.',
    desc:'Scatter The Unbound in the depths of the Inner Scar.',goal:{t:'kill',mob:'unbound',n:1,lab:'The Unbound scattered'},where:'Inner Scar, at the far end',
    prog:'It waits at the far end of the Inner Scar. Mind the shard volleys.',
    done:'Scattered, not destroyed. But it will take seasons to gather itself again. This fell from the mask when it broke. Wear it if you dare. Then take Wren what you found. She should hear it from you.',reward:{exp:1800,sh:160,item:['unbound','charm',2]}},
  m11:{main:1,ch:2,title:'The Third Keeper',giver:'corwin',pre:'m10',
    offer:'Take the Lector’s seal-book to Archivist Wren at the Lantern Annex. Whatever she says, listen to the part she does not say.',
    desc:'Bring the Lector’s seal-book to Archivist Wren.',goal:{t:'talk',npc:'wren'},where:'CrestHollow, Lantern Annex',
    prog:'Wren is at the Lantern Annex in CrestHollow.',
    done:'Lector Aurin was my teacher. The Archive split every seal pattern between three keepers: the Lector, the Warden-Captain and the Concordance Chair. No one keeper could open a containment alone. If his seal is moving, he is alive, or someone has his hand. And the Warden-Captain of MossGate on the night of the Gatefall... was Maren Holt’s mother. Chapter III begins with the three keepers.',reward:{exp:700,sp:1}},
  m12:{main:1,ch:3,title:'The Captain’s Daughter',giver:'wren',pre:'m11',lv:10,to:'holt',
    offer:'The Warden-Captain on the night of the Gatefall was Idra Holt. Maren’s mother. Maren has never once spoken of her to me. Go to her. Ask. Gently, if you know how.',
    desc:'Ask Captain Maren Holt about her mother, Warden-Captain Idra Holt.',goal:{t:'talk',npc:'holt'},where:'CrestHollow, the Warden barracks',
    prog:'Holt is at the barracks in CrestHollow.',
    done:'My mother led the western evacuation the night the city fell. Through Logger’s Rest, onto the old sawmill road. Nobody came out that way. Not her, not her company. The Scrapcap goblins squat in that mill now. If her people passed through, the goblins picked over whatever they left.',reward:{exp:900,sh:60}},
  m13:{main:1,ch:3,title:'Scrapcap Terms',giver:'holt',pre:'m12',lv:10,to:'nib',
    offer:'Go to the Abandoned Sawmill. The path leaves Whisper Woods past the old pillar. Talk to whoever runs the Scrapcaps. No blades out unless they draw first. They have more right to that mill than anyone alive.',
    desc:'Find the Scrapcap boss at the Abandoned Sawmill.',goal:{t:'talk',npc:'nib'},where:'Abandoned Sawmill, through Whisper Woods',
    prog:'The sawmill path leaves Whisper Woods, past the old pillar.',
    done:'A Warden locker? Sure, we found one. Iron, sealed, under the saw floor. And the saw floor is under the Sawtusk now. Big hog moved in when the wheel stopped turning. You want the locker, you help us get the mill turning first. Scrapcap terms.',reward:{exp:700}},
  m14:{main:1,ch:3,title:'Turn the Wheel',giver:'nib',pre:'m13',
    offer:'Gearbox wants feeding. Bring salvage, anything with a gear or a bolt in it. Six loads. Rivet will do the clever part. When the wheel turns, our workshop opens to you, and the hog will come out to complain.',
    desc:'Gather 6 Salvage so the Scrapcaps can restart the mill.',goal:{t:'gather',res:'salvage',n:6},where:'The mill grounds, the Watchtower, the Broken Road',
    prog:'Salvage piles glint around the mill and the old roads.',
    done:'Listen to that. The wheel turns, the saw sings, and the Sawtusk is very upset. The Scrapcap Workshop is yours to use now. Mind you, the hog is down on the far mill floor, past the pond. Your fight.',reward:{exp:1000,sh:80}},
  m15:{main:1,ch:3,title:'The Sawtusk',giver:'nib',pre:'m14',
    offer:'The hog has a saw blade grown into its back, from the night it charged the mill. It is mean, it is huge, and it is between you and that locker. Bring it down.',
    desc:'Defeat the Sawtusk on the far mill floor.',goal:{t:'kill',mob:'sawtusk',n:1,lab:'The Sawtusk brought down'},where:'Abandoned Sawmill, past the mill pond',
    prog:'The Sawtusk roams the far mill floor beyond the pond.',
    done:'Hog’s down! Locker’s yours, as promised. Warden steel, Warden seal. Inside: a captain’s field journal. The last page is water-stained, but you can read it: “Seal-ring given to the Mossroot elder for keeping. If I do not return, Maren must not come looking.” The Mossroot burrows are past Fallen Oak Grove.',reward:{exp:1600,sh:120,item:['sawtusk','charm',2]}},
  m16:{main:1,ch:3,title:'The Mossroot Accord',giver:'nib',pre:'m15',lv:10,to:'tansy',
    offer:'Mossroot goblins live in the Hollow past Fallen Oak Grove. Mushroom folk. They keep an Accord with something that lives in the tunnels. Go polite. Go slow. Take nothing that is not offered.',
    desc:'Ask Mother Tansy of Mossroot Hollow about the Warden-Captain’s ring.',goal:{t:'talk',npc:'tansy'},where:'Mossroot Hollow, past Fallen Oak Grove',
    prog:'Mossroot Hollow lies past the far edge of Fallen Oak Grove.',
    done:'Your captain left her ring with us, yes. A human who asked permission. We do not forget those. We kept it in the deep tunnel by the mother-root. Then the rot came up through the roots, and the deep tunnel sickened, and the Accord-spirit went to sleep. You want the ring? Help us wake her.',reward:{exp:800}},
  m17:{main:1,ch:3,title:'Wake the Accord',giver:'tansy',pre:'m16',
    offer:'The rot gets into the sporecaps and turns them cross. Clear the sick ones out of the Hollow, gently as you can. When the tunnels are quiet, the spirit will wake and show us where the rot went.',
    desc:'Clear rot-sick Sporecaps from Mossroot Hollow.',goal:{t:'kill',mob:'sporecap',n:6,zone:'mossroot',lab:'Rot-sick sporecaps cleared'},where:'Mossroot Hollow',
    prog:'The sick sporecaps wander the deeper burrows.',
    done:'Hear that? The tunnels are humming again. The spirit is awake, and she is not happy. The ring is not here. The rot carried it up the roots, east, into the Rotting Reach beyond Marrowbog. Something there has made a heart out of the rot, and your captain’s ring is in it.',reward:{exp:1500,sh:100,sp:1}},
  m18:{main:1,ch:3,title:'Rot at the Root',giver:'tansy',pre:'m17',lv:11,
    offer:'Past Marrowbog, the Rotting Reach. The Rootheart sits at the far end, where every sick root meets. Cut it out. Take back what it swallowed. Brother Alder of the Lantern Order camps at the Reach’s edge. He will tell you what the rot does to the careless.',
    desc:'Destroy the Rootheart in the Rotting Reach and recover the Warden-Captain’s ring.',goal:{t:'kill',mob:'rootheart',n:1,lab:'The Rootheart cut out'},where:'The Rotting Reach, past Marrowbog',
    prog:'The Rootheart waits at the far end of the Rotting Reach.',
    done:'The Accord thanks you, and the Hollow will remember you. Here. Your captain’s seal-ring, clean of rot. Take it to her daughter. She has waited long enough.',reward:{exp:2400,sh:180,item:['rootheart','head',2]}},
  m19:{main:1,ch:3,title:'Two of Three',giver:'tansy',pre:'m18',to:'holt',
    offer:'Go. A daughter should hold her mother’s ring before anyone else does.',
    desc:'Bring the Warden-Captain’s seal-ring to Maren Holt.',goal:{t:'talk',npc:'holt'},where:'CrestHollow, the Warden barracks',
    prog:'Holt is at the barracks in CrestHollow.',
    done:'Her ring. She gave it away so nobody could take it from her hand. That was her: stubborn to the last. So the Lector’s seal is moving and my mother’s seal is safe, with me. That leaves one keeper. The Concordance Chair. Wren will know who held that seat.',reward:{exp:1200,sh:100}},
  m20:{main:1,ch:3,title:'The Third Seal',giver:'holt',pre:'m19',to:'wren',
    offer:'Take what we know to Wren. Tell her the Warden seal is accounted for. Then ask her the question I cannot make myself ask.',
    desc:'Tell Archivist Wren the Warden seal is safe, and ask who held the Concordance Chair.',goal:{t:'talk',npc:'wren'},where:'CrestHollow, Lantern Annex',
    prog:'Wren is at the Lantern Annex.',
    done:'The Concordance Chair on the night of the Gatefall was Ossery Vale. He survived. He sits on the CrestHollow council today, and he countersigns every caravan charter that leaves this town. Last week he was in this room, asking very politely after the Lector’s seal-book. I told him it was lost. Chapter IV: The Concordance.',reward:{exp:2000,sh:200,sp:1}},
  mb1:{title:'First Bond',giver:'pell',pre:'m16',lv:7,
    offer:'You want a creature to walk with you? Then stop thinking like a hunter. Wear one down, or catch a gentle one unafraid, and offer it what it eats. Beasts take meat, slimes take herbs, sporecaps take mushrooms, goblins take salvage and spirits take shardstone. The Hollow makes them calmer. Befriend one.',
    desc:'Befriend any creature by offering it food.',goal:{t:'bond',n:1},where:'Anywhere; Mossroot Hollow is easiest',
    prog:'Break its poise or wear it down, then stand close and offer food.',done:'There. It chose you, and that means it can unchoose you. Feed it, fight beside it, and it will learn commands. Trust it fully and it will show you what it can really do.',reward:{exp:900,sh:60}},
  sc1:{title:'Sticky Business',giver:'rivet',pre:'m13',lv:9,
    offer:'Sap slimes keep crawling into the gear pit. Not evil, just sticky. Clear six of them off the mill grounds before they glue the whole place shut.',
    desc:'Clear Sap Slimes from the Abandoned Sawmill.',goal:{t:'kill',mob:'sapslime',n:6,zone:'sawmill',lab:'Sap slimes cleared'},where:'Abandoned Sawmill',
    prog:'They pool around the planks and the pond.',done:'Gears turn freely! I will build you something nice. Well. Something.',reward:{exp:900,sh:60,item:['sapslime','hands',1]}},
  sc2:{title:'Amber for the Gears',giver:'rivet',pre:'sc1',lv:9,
    offer:'Now I need the stuff. Sap slime amber makes the best gear grease in the Reach. Bring me four lumps of it.',
    desc:'Collect Amber Lumps from Sap Slimes.',goal:{t:'collect',mob:'sapslime',item:'Amber Lump',n:4,p:.6,zone:'sawmill'},where:'Abandoned Sawmill',
    prog:'Sap slimes drop their amber when they burst.',done:'Beautiful. Smell that? Pine and machinery. Take this, it fell off a Warden cart years ago.',reward:{exp:1000,sh:80,item:['warden','feet',2]}},
  mr1:{title:'Calving Season',giver:'pell',pre:'m16',lv:9,
    offer:'The wolves have been testing the calving grounds. Drive off five of them. Do not touch the rotstags. The herd is watching how you behave.',
    desc:'Drive wolves away from the Mossroot calving grounds.',goal:{t:'kill',mob:'wolf',n:5,zone:'mossroot',lab:'Wolves driven off'},where:'Mossroot Hollow',
    prog:'The wolves circle the far burrows.',done:'The herd saw that. Next time you walk the Hollow, they will not run. Trust is slow, and you just earned a little.',reward:{exp:1100,sh:70}},
  mr2:{title:'Never the Last Cap',giver:'tansy',pre:'m17',lv:10,
    offer:'The Accord allows a harvest, never a stripping. Gather dark mushrooms, five of them, and bring the Hollow’s share to the stillroom. Take only from patches that have more to give.',
    desc:'Gather 5 Dark Mushrooms within the Accord’s limits.',goal:{t:'gather',res:'mush',n:5},where:'Mossroot Hollow and Marrowbog',
    prog:'Mushroom patches regrow if you leave them a little.',done:'Well kept. The spirit noticed. She does not say thank you, but she remembers.',reward:{exp:1200,sh:90,pots:2}},
  rr1:{title:'Swatting the Swarm',giver:'alder',pre:'m17',lv:10,
    offer:'The rotflies carry the spores from pool to pool. Kill six and the spread slows for a season. Watch for the Queen. She is the one that does not die easily.',
    desc:'Kill Rotflies in the Rotting Reach.',goal:{t:'kill',mob:'rotfly',n:6,zone:'reach',lab:'Rotflies swatted'},where:'The Rotting Reach',
    prog:'They drone above the rot pools.',done:'Quieter already. The Order will hear your name from me.',reward:{exp:1400,sh:100}},
  rr2:{title:'Spore Samples',giver:'alder',pre:'rr1',lv:11,
    offer:'I need to know what the rot wants. Bring me four spore sacs from the sporecaps. Whole ones, if you can.',
    desc:'Collect Spore Sacs from Sporecaps in the Reach.',goal:{t:'collect',mob:'sporecap',item:'Spore Sac',n:4,p:.55,zone:'reach'},where:'The Rotting Reach',
    prog:'Sporecaps drop their sacs when they fall.',done:'These are not wild spores. They have been cultivated, bred for speed. Someone is growing this rot on purpose. Keep that to yourself for now.',reward:{exp:1600,sh:120,item:['rotqueen','charm',2]}},
  s_ren:{title:'Clear the Road',giver:'ren',lv:1,
    offer:'Easy, do not step in the camp. The stew is the only warm thing for miles. The Free Road pays me to keep this stretch open for refugee wagons, but slimes keep sprouting from the ditches. Clear six more on this road and the wagons can roll again.',
    desc:'Clear Moss Slimes from the Ash Road for Ren.',goal:{t:'kill',mob:'moss',n:6,zone:'road',lab:'Road slimes'},where:'The Ash Road',
    prog:'Six on this road, mind. The ones in Whisper Woods are someone else’s contract.',
    done:'First quiet I have heard out here in a month. Two tonics. Nell brews them in CrestHollow. Do not tell her I gave them away.',reward:{exp:70,pots:2}},
  s_nell:{title:'Clean Slime Gel',giver:'nell',pre:'m2',lv:2,
    offer:'The Moss Slimes in Whisper Woods carry a clean healing gel, so long as they have not eaten anything corrupted. It is the base of every tonic I make. Bring me six measures?',
    desc:'Gather Clean Slime Gel from Moss Slimes for Nell.',goal:{t:'collect',mob:'moss',item:'Slime Gel',n:6,p:.5},where:'Whisper Woods or the Ash Road',
    prog:'Clear gel, mind. If it is grey or glittering, leave it. That is Shard contamination.',
    done:'Six! Lovely, wobbly things. Three tonics from the last batch, on the house. Nell remembers her friends.',reward:{exp:150,pots:3}},
  s_wren:{title:'Attune the Fen Shrine',giver:'wren',pre:'m2',lv:3,
    offer:'There is a travel shrine at Misty Fen, anchoring a minor Veinway crossing. The Gatefall threw them all out of tune. If it still answers, it can be restored. Kneel there, press up at the shrine, and let it learn you.',
    desc:'Attune the travel shrine above the Misty Fen pool.',goal:{t:'shrine',zone:'falls',n:1,lab:'Attune the Fen Shrine'},where:'Misty Fen Lake',
    prog:'The shrine stands on the ledges past the pool. Kneel, press up, and let it learn you.',
    done:'It answered? Then the crossings can still be mended. The Archive taught its keepers a small discipline for listening to the currents. I can teach it to you. Spend it in your skill tree.',reward:{exp:180,sp:1}},
  s_hesk:{title:'Cinders for the Workyard',giver:'hesk',pre:'m2',lv:5,
    offer:'My furnaces run on coal and grief, and I am low on coal. The husks on the Broken Road carry cinders that still hold the heat of the night they burned. Bring me five and I will forge you something worth carrying. Do not look at me like that. They would want to be useful.',
    desc:'Collect Husk Cinders for Hesk at the Workyard.',goal:{t:'collect',mob:'husk',item:'Husk Cinder',n:5,p:.5},where:'The Broken Road',
    prog:'Five cinders. The husks keep them in their chests, where their hearts used to be.',
    done:'Feel that heat? Like they are still on patrol. Give me a moment... There. Forged for your hand and no one else’s.',reward:{exp:350,item:['START','weapon',2]}}
};
{const ZN={sawmill:['nib','rivet'],mossroot:['tansy','pell'],reach:['alder'],outskirts:['garr'],oak:['yenna'],falls:['tilla'],bog:['sef'],tower:['ilse'],gate:['ves'],scar:['corwin']};for(const z of ZONES)if(ZN[z.id])z.npcs.push(...ZN[z.id])}
for(const z of ZONES)for(const id of z.npcs)NPCS[id].x+=EDGE;
const QS=()=>pl.q||(pl.q={});
const qSt=k=>QS()[k];
function qAvail(k){const q=QUESTS[k];if(qSt(k))return false;return!q.pre||(qSt(q.pre)&&qSt(q.pre).s==='d')}
const qLvOk=k=>pl.lv>=(QUESTS[k].lv||1);
function qReady(k){const q=QUESTS[k],st=qSt(k);if(!st||st.s!=='a')return false;return q.goal.t==='talk'||(q.goal.t==='pay'?pl.shards>=q.goal.n:st.n>=q.goal.n)}
const qTurnIn=k=>{const q=QUESTS[k];return q.to||(q.goal.t==='talk'?q.goal.npc:q.giver)};
const qActive=()=>Object.keys(QUESTS).filter(k=>qSt(k)&&qSt(k).s==='a');
function npcMark(id){let m='';for(const k in QUESTS){const q=QUESTS[k],st=qSt(k);
    if(qTurnIn(k)===id&&qReady(k))return'?';
    if(q.giver===id&&qAvail(k)&&qLvOk(k))m='!';else if(!m&&st&&st.s==='a'&&(qTurnIn(k)===id))m='.'}return m}
function qObj(k){const q=QUESTS[k],g=q.goal,st=qSt(k)||{n:0};
  if(qReady(k)&&g.t!=='talk')return'Return to '+NPCS[qTurnIn(k)].name;
  if(g.t==='talk')return'Speak to '+NPCS[g.npc].name;
  if(g.t==='event')return st.n>=g.n?'Return to '+NPCS[qTurnIn(k)].name:g.lab;
  if(g.t==='bond')return'Creatures befriended '+st.n+'/'+g.n;
  if(g.t==='parry')return g.lab+' '+st.n+'/'+g.n;
  if(g.t==='lore')return st.n>=1?'Return to '+NPCS[qTurnIn(k)].name:'Read: '+LORE[g.id].t;
  if(g.t==='gather')return RES[g.res].n+' gathered '+st.n+'/'+g.n;
  if(g.t==='craft')return'Craft at a station '+st.n+'/'+g.n;
  if(g.t==='pay')return'Bring '+g.n+' shards ('+Math.min(pl.shards,g.n)+'/'+g.n+')';
  if(g.t==='collect')return g.item+' '+st.n+'/'+g.n;
  return g.lab+' '+st.n+'/'+g.n}
function qRewardTxt(q){const r=q.reward,o=[];if(q.choices)o.push('Your choice of outcome');if(r.comp)o.push('Companion: '+COMPS[r.comp].n);if(r.exp)o.push(r.exp+' EXP');if(r.sh)o.push(r.sh+' shards');if(r.pots)o.push(r.pots+' tonics');if(r.sp)o.push(r.sp+' skill point');
  if(r.item)o.push(RAR[r.item[2]].n+' '+(r.item[1]==='weapon'?'weapon':SLOT_N[r.item[1]].toLowerCase()));return o.join(' · ')}
function qProgress(k,item){const q=QUESTS[k],st=qSt(k),g=q.goal,full=st.n>=g.n;
  S.nums.push({x:pl.x,y:pl.y-52,txt:(item||g.lab)+' '+st.n+'/'+g.n,t:-.25,c:full?'#ffd27a':'#c8d468'});
  if(full){[659,784,988].forEach((f,i)=>setTimeout(()=>tone(f,.18,'triangle',.04),i*90));banner('Objective complete',q.title)}save()}
function qKill(m){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.mob!==m.t||st.n>=g.n)continue;
  if(g.t==='kill'&&(!g.zone||g.zone===Z.id)){st.n++;qProgress(k)}
  else if(g.t==='collect'&&(!g.zone||g.zone===Z.id)&&Math.random()<(g.p||.5)){st.n++;qProgress(k,g.item)}}}
function qParry(){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='parry'&&st.n<g.n){st.n++;qProgress(k)}}}
function qLore(id){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='lore'&&g.id===id&&st.n<1){st.n=1;qProgress(k,'Found')}}}
function qGather(r,n){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='gather'&&g.res===r&&st.n<g.n){st.n=Math.min(g.n,st.n+n);qProgress(k,RES[r].n)}}}
function qCraft(){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='craft'&&st.n<g.n){st.n++;qProgress(k,'Crafted')}}}
function qShrine(){for(const k of qActive()){const g=QUESTS[k].goal,st=qSt(k);if(g.t==='shrine'&&g.zone===Z.id&&st.n<1){st.n=1;qProgress(k)}}}
function qReward(k,ci){const q=QUESTS[k];let r=q.reward;qSt(k).s='d';if(q.goal.t==='pay')pl.shards-=q.goal.n;
  if(q.choices&&ci!=null){const c=q.choices[ci];pl.flags=pl.flags||{};pl.flags[k]=c.flag;r={...r,...c.reward};banner((k==='t3'?'Charter: ':'Choice: ')+c.n,q.title)}if(r.fl){Object.assign(pl.flags,r.fl);setTimeout(()=>questFlag(r.fl),400)}
  if(r.comp){pl.comp=pl.comp||{own:[],act:null};if(!pl.comp.own.includes(r.comp))pl.comp.own.push(r.comp);CB();pl.comp.act=r.comp;spawnComp();setTimeout(()=>banner('Companion joined',COMPS[r.comp].n),2600)}
  if(r.sh)pl.shards+=r.sh;if(r.pots)pl.pots=Math.min(9,pl.pots+r.pots);if(r.sp)pl.bsp=(pl.bsp||0)+r.sp;
  if(r.item){const[s0,slot,rar]=r.item,src=s0==='START'?(START[pl.ch.cls]||'r_start'):s0,it=makeItem(src,slot,slot==='weapon'?WEAP():null,rar,Math.max(1,pl.lv));
    if(pl.bag.length<BAG_MAX)pl.bag.push(it);else S.drops.push({k:'gear',it,x:pl.x,y:pl.y-8,vx:0,vy:-160,t:0});S.nums.push({x:pl.x,y:pl.y-60,txt:itemName(it),t:-.5,c:RAR[rar].c})}
  if(r.exp)gainExp(r.exp);banner('Quest complete',q.title);sfx.lvl();
  hudK='';save()}

/* ---------- companions (Bible: recruited by trust or questline, never random drops) ---------- */
const COMPS={wolf:{n:'Ash, Forest Wolf',mob:'wolf'},rotstag:{n:'Fern, Rotstag',mob:'rotstag'},lantern:{n:'Glim, Lantern Slime',mob:'lantern'}};
function spawnComp(){S.allies=S.allies.filter(a=>a.k!=='comp');const c=pl.comp&&pl.comp.act;if(!c||pl.dead)return;
  const bb=CB().b[c];if(!bb)return;S.allies.push({k:'comp',t:bb.t,fly:!!(MOBS[bb.t]&&MOBS[bb.t].fly),hx:pl.x,x:clamp(pl.x-pl.face*18,Z.x0+8,Z.x1-8),y:pl.y,vx:0,vy:0,onG:true,face:pl.face,life:1e9,cd:.5,atkT:0,mult:.45+.03*pl.lv,walk:0});cmdHud()}
function setComp(k){CB();pl.comp.act=pl.comp.act===k?null:k;spawnComp();cmdHud();sfx.pick();save()}

/* ---------- npc sprites ---------- */
const WT0={...WT};
function npcSprite(n){if(n.fr)return n.fr;if(n.sprite==='gob'){const G0=GOB_S[n.gob];n.fr={idle:[gobFrame(G0,'walk0'),gobFrame(G0,'walk1')],blink:gobFrame(G0,'walk0'),ax:12,ay:24,crop:[0,0,26,26]};return n.fr}const ch={cls:n.cls||'ronin',look:{sex:0,build:1,face:0,hair:0,hairC:0,beard:0,skin:2,eye:0,outfit:0,...n.look}},eq={};
  if(typeof n.eq==='string'){for(const sl of['head','chest','hands','feet','weapon'])eq[sl]={src:n.eq,slot:sl}}else for(const sl in n.eq||{})eq[sl]={src:n.eq[sl],slot:sl};
  const A=resolve(ch,eq);if(n.weap)A.weap=n.weap;const keep=WT;WT=A.wt||{...WT0};
  const am=A.weap==='staff'?'staff':A.weap==='tome'?'tome':'idle',sh=A.weap==='katana'?'full':null,F=o=>frame((P,Rc,E)=>body(P,Rc,E,A,o));
  n.fr={idle:[0,1].map(b=>F({bob:b,arm:am,sheath:sh,lf:1,lb:-1})),blink:F({bob:0,arm:am,sheath:sh,lf:1,lb:-1,blink:1})};WT=keep;return n.fr}
function npcFace(n){return pl.x<n.x?-1:1}
function drawMark(m,x,y){const b=Math.round(Math.sin(S.t*4)*1.5);y+=b;
  if(m==='!'||m==='?'){const c=m==='!'?'#ffd27a':'#9bd04c';g.fillStyle='#000';g.fillRect(x-3,y-9,6,13);g.fillStyle=c;
    if(m==='!'){g.fillRect(x-1,y-8,2,7);g.fillRect(x-1,y+1,2,2)}else{g.fillRect(x-2,y-8,4,1);g.fillRect(x+1,y-7,1,3);g.fillRect(x-1,y-4,2,1);g.fillRect(x-1,y-3,1,2);g.fillRect(x-1,y+1,2,2);g.fillRect(x-2,y-7,1,1)}
    g.save();g.globalCompositeOperation='lighter';glow(x,y-3,10,m==='!'?'255,210,120':'155,208,76',.25);g.restore()}
  else if(m==='.'){g.fillStyle='#000';g.fillRect(x-6,y-2,13,4);g.fillStyle='#9a927a';[-4,0,4].forEach(d=>g.fillRect(x+d,y-1,2,2))}}
function drawNpcs(cx,cy){for(const[lx,lt,ld]of Z.labels||[]){const x=ri(lx-cx);if(x<-60||x>W+60)continue;const y=ri(topAt(lx)-cy);g.globalAlpha=.8;ptext(lt.toUpperCase(),x,y-ld,'#e3b04b');g.globalAlpha=1}
  for(const id of Z.npcs){const n=NPCS[id],x=ri(n.x-cx),y=ri(n.y-cy);if(x<-40||x>W+40)continue;
    if(n.sprite!=='elder'){const fr=npcSprite(n),f=npcFace(n),ph=S.t+n.x*.01,img=(ph%4.3)<.12?fr.blink:fr.idle[Math.floor(ph*1.4)%2];
      g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x-6,y,12,1);g.save();g.translate(x,0);if(f<0)g.scale(-1,1);g.drawImage(img,-(fr.ax||24),y-(fr.ay||39));g.restore()}
    const m=npcMark(id);if(m)drawMark(m,x,y-(n.sprite==='elder'?40:n.sprite==='gob'?30:42));
    ptext(n.name,x,y+6,S.nearNpc===id?'#ffd27a':'#f2e6c8');barkTick(n,n.x,n.y,crBark(BARKS[id]||['...']));if(n.bub&&!DLG)bubble(x,y-(n.sprite==='gob'?30:n.sprite==='elder'?34:42),n.bub.txt)}}

/* ---------- dialogue ---------- */
let DLG=null;
function drawPortrait(n){const c=$('dlgpv'),x=c.getContext('2d');x.imageSmoothingEnabled=false;x.clearRect(0,0,c.width,c.height);x.fillStyle='#0b1a1c';x.fillRect(0,0,c.width,c.height);
  if(n.sprite==='elder'){const t=document.createElement('canvas');t.width=40;t.height=44;const gl=Z.glows;Z.glows=[];elder(t.getContext('2d'),18,42);Z.glows=gl;x.drawImage(t,2,4,32,32,0,0,c.width,c.height)}
  else{const fr=npcSprite(n),cp=fr.crop||[12,2,28,28];x.drawImage(fr.idle[0],cp[0],cp[1],cp[2],cp[3],0,0,c.width,c.height)}}
function openTalk(id){if(DLG)return;DLG={id,line:0,view:'talk'};for(const k in inp)inp[k]=0;S.paused=true;$('dlg').hidden=false;$('dlgbg').hidden=false;$('talkbtn').hidden=true;S.tk2='';drawPortrait(NPCS[id]);renderDlg()}
function closeDlg(){DLG=null;$('dlg').hidden=true;$('dlgbg').hidden=true;unpause('dlg')}
function qBox(k,mode){const q=QUESTS[k];return`<div class="dq${q.main?' main':''}"><b>${q.main?'Main · ':''}${q.title}</b><span>${mode==='offer'?'Goal: '+(q.goal.t==='lore'?'Find and read a record':q.goal.t==='gather'?RES[q.goal.res].n+' ×'+q.goal.n:q.goal.t==='craft'?'Craft '+q.goal.n+' item':q.goal.t==='pay'?'Bring '+q.goal.n+' shards':q.goal.t==='talk'?'Speak to '+NPCS[q.goal.npc].name:q.goal.t==='collect'?q.goal.item+' ×'+q.goal.n:q.goal.lab+' ×'+q.goal.n)+' · '+q.where:qObj(k)}</span><span class="rw">Reward: ${qRewardTxt(q)}</span></div>`}
function renderDlg(){if(!DLG||DLG.lore)return;const id=DLG.id,n=NPCS[id],X=$('dlgx'),A=$('dlga');let txt='',box='',btn=[];
  $('dlgn').textContent=n.name;$('dlgt').textContent=n.title;
  const ks=Object.keys(QUESTS).sort((a,b)=>(QUESTS[b].main|0)-(QUESTS[a].main|0)),ready=ks.find(k=>qTurnIn(k)===id&&qReady(k)),avail=ks.find(k=>QUESTS[k].giver===id&&qAvail(k)&&qLvOk(k)),
    act=ks.find(k=>qSt(k)&&qSt(k).s==='a'&&(QUESTS[k].giver===id||qTurnIn(k)===id)),locked=ks.find(k=>QUESTS[k].giver===id&&qAvail(k)&&!qLvOk(k));
  if(DLG.view==='shop'){txt='Tonics are 20 shards each. You can carry nine. Want to sell old gear? Salvage it from your bag for shards first.';
    box=`<div class="dq"><b>Moss Tonic</b><span>Restores 40% HP · You carry ${pl.pots}/9 · Shards: ${pl.shards}</span></div>`;
    btn=[['buy','Buy tonic · 20',pl.shards<20||pl.pots>=9],['back','Back']];
    box+=`<div class="dq"><b>Common weapons · 40 each</b><span>Any weapon can be used by anyone. Using it trains its discipline.</span></div>`;btn.splice(1,0,...WEAPS.map(w=>['wb:'+w,WEAP_N[w]+' · 40',pl.shards<40||pl.bag.length>=BAG_MAX]))}
  else if(DLG.view==='train'){txt='I can teach you the fundamentals. After that, the only teacher is practice: use it in real fights and it will grow.';
    box=n.train.map(d=>`<div class="dq"><b>${DISC[d].n} · ${TIER_N[dRank(d)]} ${dRank(d)}</b><span>${DISC[d].d||DISC[d].t.map(t=>t.n).join(', ')+(DISC[d].focus?' · works with any weapon':' · needs '+(DISC[d].weap==='axe'?'an ':'a ')+WEAP_N[DISC[d].weap].toLowerCase())}</span></div>`).join('');
    btn=n.train.filter(d=>dRank(d)<1).map(d=>['tr:'+d,'Learn '+DISC[d].n+' · 30',pl.shards<30]);btn.push(['back','Back'])}
  else if(ready){const RQ=QUESTS[ready];txt=RQ.done;box=qBox(ready,'done');if(RQ.choices){box+=RQ.choices.map(c=>`<div class="dq"><b>${c.n}</b><span>${c.d}</span></div>`).join('');btn=RQ.choices.map((c,i)=>['done:'+ready+':'+i,c.n])}else btn=[['done:'+ready,'Complete quest']]}
  else if(avail){txt=QUESTS[avail].offer;box=qBox(avail,'offer');btn=[['acc:'+avail,'Accept'],['bye','Not now']]}
  else if(act){txt=QUESTS[act].giver===id?QUESTS[act].prog:'You carry word from '+NPCS[QUESTS[act].giver].name+'? Finish what you were asked, then come to me.';box=qBox(act,'prog');btn=[['bye','Farewell']]}
  else{txt=n.lines[DLG.line%n.lines.length];if(locked)box=`<div class="dq"><b>${QUESTS[locked].title}</b><span>Return at Lv ${QUESTS[locked].lv} and I will have work for you.</span></div>`;
    if(n.lines.length>1)btn.push(['more','More']);if(n.shop)btn.push(['shop','Trade']);btn.push(['bye','Farewell'])}
  if(n.shop&&DLG.view!=='shop'&&!btn.some(b=>b[0]==='shop'))btn.splice(btn.length-1,0,['shop','Trade']);
  if(n.train&&DLG.view==='talk'&&!ready&&!avail)btn.splice(btn.length-1,0,['train','Train']);
  X.innerHTML=`<p>${txt}</p>${box}`;A.innerHTML=btn.map(([a,l,d],i)=>`<button class="btn sm${i&&a!=='buy'?' alt':''}" data-a="${a}"${d?' disabled':''}>${l}</button>`).join('');X.scrollTop=0}
$('dlga').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!DLG)return;const a=b.dataset.a;sfx.pick();
  if(a==='bye')return closeDlg();
  if(a==='more')DLG.line++;
  else if(a==='shop')DLG.view='shop';else if(a==='back')DLG.view='talk';
  else if(a==='buy'){if(pl.shards>=20&&pl.pots<9){pl.shards-=20;pl.pots++;save()}}
  else if(a==='train')DLG.view='train';
  else if(a.startsWith('tr:')){const d=a.slice(3);if(pl.shards>=30&&dRank(d)<1){pl.shards-=30;pl.dx[d]=Math.max(dXP(d),dCum(1));banner('Initiate · Rank 1',DISC[d].n);sfx.lvl();recalc();setupClassUI();save()}}
  else if(a.startsWith('wb:')){if(pl.shards>=40&&pl.bag.length<BAG_MAX){pl.shards-=40;const w=a.slice(3);pl.bag.push(makeItem('wanderer','weapon',w,0,1));S.nums.push({x:pl.x,y:pl.y-50,txt:WEAP_N[w].toUpperCase()+' BOUGHT',t:0,c:'#f2e6c8'});save()}}
  else if(a.startsWith('acc:')){const k=a.slice(4);QS()[k]={s:'a',n:0};if(tracked().length<3||QUESTS[k].main)setTrack(k,true);banner(QUESTS[k].main?'Main quest':'New quest',QUESTS[k].title);save();return closeDlg()}
  else if(a.startsWith('done:')){const[,k,ci]=a.split(':');qReward(k,ci==null?null:+ci);DLG.line=0}
  renderDlg()});

/* ---------- tracker + quest log ---------- */
let qtK='';
function tracked(){const act=qActive();if(!pl.track){pl.track=act.sort((a,b)=>(QUESTS[b].main|0)-(QUESTS[a].main|0)).slice(0,3)}pl.track=pl.track.filter(k=>act.includes(k));return pl.track}
function setTrack(k,on){tracked();if(on){if(!pl.track.includes(k)){pl.track.push(k);if(pl.track.length>3)pl.track.splice(pl.track.findIndex(q=>q!==k&&!QUESTS[q].main)>=0?pl.track.findIndex(q=>q!==k&&!QUESTS[q].main):0,1)}}else pl.track=pl.track.filter(q=>q!==k);qtK='';save()}
function qTrack(){const act=qActive(),tr=tracked(),k=(pl.tmin?'m':'')+act.length+'|'+tr.map(q=>q+qObj(q)).join('|');if(k===qtK)return;qtK=k;
  $('qtrack').hidden=!act.length;
  $('qtrack').innerHTML=`<button class="qt-h" data-tq="tog" aria-expanded="${!pl.tmin}"><span>Quests · ${act.length}</span><i>${pl.tmin?'+':'–'}</i></button>`+(pl.tmin?'':tr.map(q=>`<button class="qe${QUESTS[q].main?' main':''}${qReady(q)&&QUESTS[q].goal.t!=='talk'?' rd':''}" data-q="${q}"><b>${QUESTS[q].title}</b><span>${qObj(q)}</span></button>`).join('')+(act.length>tr.length?`<button class="qe more" data-tq="log"><span>${act.length-tr.length} untracked · pick in log</span></button>`:''))}
function openQuests(){pauseFor('quests');renderQuests()}
function renderQuests(){const act=qActive(),done=Object.keys(QUESTS).filter(k=>qSt(k)&&qSt(k).s==='d'),sel=S.qsel&&QUESTS[S.qsel]?S.qsel:(S.qsel&&S.qsel.startsWith('lore:')?null:act[0]||done[0]);
  const tr=tracked(),item=k=>`<button class="qi${QUESTS[k].main?' main':''}${k===sel?' sel':''}${qSt(k).s==='d'?' dn':''}" data-q="${k}"><b>${tr.includes(k)?'◆ ':''}${QUESTS[k].title}</b><span>${qSt(k).s==='d'?'Complete':qObj(k)}</span></button>`;
  $('qlist').innerHTML=(act.length?'<div class="qh">Active</div>'+act.map(item).join(''):'<div class="note">No active quests. Look for people marked with a gold ! and talk to them.</div>')+(done.length?'<div class="qh">Completed</div>'+done.map(item).join(''):'')+compHTML()+loreHTML();
  const mains=MAIN_ORDER,cur=mains.find(k=>!(qSt(k)&&qSt(k).s==='d')),chn=cur?QUESTS[cur].ch||1:7,cm=mains.filter(k=>(QUESTS[k].ch||1)===chn),md=cm.filter(k=>qSt(k)&&qSt(k).s==='d').length;$('qch').textContent=CH_NAMES[chn-1]+' · '+md+'/'+cm.length;
  if(S.qsel&&S.qsel.startsWith('lore:')){const l=LORE[S.qsel.slice(5)];$('qdet').innerHTML=`<div class="dn">${l.t}</div><div class="dm">Lore · ${ZONES.find(z=>z.id===l.z).name}</div><p>${l.txt}</p>`;return}
  if(!sel){$('qdet').innerHTML='<p>The Reach is quiet. For now.</p>';return}const q=QUESTS[sel],st=qSt(sel);
  $('qdet').innerHTML=`<div class="dn">${q.title}</div><div class="dm">${q.main?'Main story':'Side quest'} · From ${NPCS[q.giver].name}${st.s==='d'?' · Complete':''}</div><p>${q.desc}</p>
    ${st.s==='a'?`<p><b>Goal</b>${qObj(sel)}</p><p><b>Where</b>${q.where}</p><p><b>Turn in</b>${NPCS[qTurnIn(sel)].name}</p>`:''}<p><b>Reward</b>${qRewardTxt(q)}</p>${st.s==='a'?`<div class="acts" style="justify-content:flex-start"><button class="btn sm${tr.includes(sel)?' alt':''}" data-trk="${sel}">${tr.includes(sel)?'Stop tracking':'Track on screen'}</button></div><div class="note">Up to 3 quests show on screen.</div>`:''}`}
$('qlist').addEventListener('click',e=>{if(compClick(e))return renderQuests();const c=e.target.closest('[data-comp]');if(c){setComp(c.dataset.comp);return renderQuests()}const b=e.target.closest('[data-q]');if(!b)return;S.qsel=b.dataset.q;renderQuests()});
$('qdet').addEventListener('click',e=>{const b=e.target.closest('[data-trk]');if(!b)return;const k=b.dataset.trk;setTrack(k,!tracked().includes(k));sfx.pick();renderQuests()});
$('qbtn').onclick=()=>openQuests();$('qclose').onclick=()=>unpause('quests');$('qtrack').addEventListener('click',e=>{const b=e.target.closest('[data-tq],[data-q]');if(!b)return;if(b.dataset.tq==='tog'){pl.tmin=!pl.tmin;qtK='';save();return}if(b.dataset.q)S.qsel=b.dataset.q;openQuests()});
$('talkbtn').addEventListener('pointerdown',e=>{e.preventDefault();if(S.nearNpc)openTalk(S.nearNpc);else if(S.nearSt)openStation(S.nearSt);else if(S.nearLore)openLore(S.nearLore);else if(S.nearCr)crUse(S.nearCr);else if(S.nearNode)gather(S.nearNode)});
$('prgo').onclick=()=>{unpause('prolog');banner('Chapter I · The Ash Road','Speak to Ysel')};
addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;
  if(DLG){if(e.code==='Escape')closeDlg();else if(e.code==='Enter'||e.code==='KeyE'){const b=$('dlga').querySelector('button:not([disabled])');if(b)b.click()}e.preventDefault();return}
  if(e.code==='KeyL')$('quests').hidden?(S.started&&openQuests()):unpause('quests');
  if(e.code==='Escape'&&!$('quests').hidden)unpause('quests')});
