/* ---------- classes ---------- */
/* Starter kits (the game is classless: a kit is only your first tools and first training).
   Keys stay ronin/shade/... so old saves keep working. */
const CLASSES={
  ronin:{name:"Ronin's Kit",weap:'katana',disc:'blade',armor:'light',desc:'Katana and a light haori. Starts trained in Bladecraft and Light Armor.'},
  shade:{name:"Shade's Kit",weap:'daggers',disc:'paired',armor:'light',desc:'Paired daggers and shadow wraps. Starts trained in Paired Blades and Light Armor.'},
  ashbow:{name:"Hunter's Kit",weap:'bow',disc:'archery',armor:'light',desc:'Shortbow and a leather jerkin. Starts trained in Archery and Light Armor.'},
  weaver:{name:"Mossweaver's Kit",weap:'staff',disc:'nature',armor:'robes',desc:'Sapling staff and a grove robe. Starts trained in Nature magic and Robes.'},
  necro:{name:"Gravecaller's Kit",weap:'tome',disc:'necro',armor:'robes',desc:'Grave primer and a mourning coat. Starts trained in Necromancy and Robes.'}};
const BASE={hp:78,hpG:13,mp:46,mpG:8,atk:11,atkG:3.8};
const WPN={katana:{cd:.36,m:1.1},daggers:{cd:.2,m:.78},bow:{cd:.42,m:1},tome:{cd:.48,m:.98},staff:{cd:.5,m:1.05},axe:{cd:.48,m:1.3},hammer:{cd:.62,m:1.55},spear:{cd:.4,m:1.1},shield:{cd:.34,m:.92}};
const WEAP_N={katana:'Katana',daggers:'Daggers',bow:'Bow',staff:'Staff',tome:'Tome',axe:'Axe',hammer:'Hammer',spear:'Spear',shield:'Sword & Shield'};
const WEAPS=Object.keys(WEAP_N);

/* ---------- creatures ----------
   Every creature here needs a matching GEAR entry with the same key (checked on load). */
const MOBS={
  moss:{name:'Moss Slime',kind:'slime',ai:'slime',hp:40,atk:8,exp:10,w:16,h:12,spd:18,shard:[2,5],aggro:60},
  husk:{name:'Ashen Husk',ai:'lunger',hp:120,atk:16,exp:28,w:12,h:26,spd:22,shard:[5,11],aggro:100},
  wisp:{name:'Ink Wisp',ai:'flyer',hp:70,atk:13,exp:20,w:14,h:14,spd:28,fly:1,shard:[4,8],aggro:150},
  wolf:{name:'Forest Wolf',kind:'quad',ai:'lunger',hp:70,atk:13,exp:18,w:22,h:14,spd:40,shard:[3,7],aggro:120},
  boar:{name:'Giant Boar',kind:'quad',ai:'lunger',hp:110,atk:15,exp:22,w:22,h:15,spd:26,shard:[4,8],aggro:70},
  rotstag:{name:'Rotstag',kind:'quad',ai:'lunger',passive:1,hp:130,atk:16,exp:26,w:22,h:26,spd:30,shard:[4,9],aggro:100},
  treant:{name:'Corrupted Treant',kind:'treant',ai:'lunger',elite:1,hp:520,atk:26,exp:120,w:26,h:46,spd:14,shard:[20,34],aggro:120,resp:25},
  bogslime:{name:'Bog Slime',kind:'slime',ai:'slime',hp:90,atk:13,exp:18,w:18,h:12,spd:16,shard:[3,7],aggro:60},
  lurker:{name:'Swamp Lurker',kind:'quad',ai:'lunger',hp:140,atk:20,exp:30,w:30,h:10,spd:30,shard:[5,10],aggro:90},
  stalker:{name:'Hollow Stalker',kind:'quad',ai:'lunger',stealth:1,hp:110,atk:22,exp:32,w:26,h:14,spd:48,shard:[5,11],aggro:140},
  gob:{name:'Scrapcap Goblin',kind:'gob',ai:'ranged',hp:80,atk:14,exp:22,w:12,h:18,spd:34,shard:[4,9],aggro:140},
  raider:{name:'Ashroad Freeband',kind:'gob',ai:'lunger',hp:120,atk:18,exp:30,w:12,h:18,spd:38,shard:[6,12],aggro:130},
  shardslime:{name:'Shard Slime',kind:'slime',ai:'slime',hp:150,atk:24,exp:36,w:18,h:12,spd:16,shard:[7,14],aggro:70},
  bear:{name:'Scarback Bear',kind:'quad',ai:'lunger',hp:320,atk:30,exp:70,w:32,h:24,spd:26,shard:[12,22],aggro:110},
  drake:{name:'Veinwing Drake',kind:'drake',ai:'flyer',fly:1,hp:130,atk:22,exp:40,w:18,h:14,spd:40,shard:[6,12],aggro:170},
  fiend:{name:'Veinfiend',kind:'gen',ai:'lunger',blink:1,hp:240,atk:30,exp:60,w:16,h:28,spd:34,shard:[9,16],aggro:150},
  scargob:{name:'Scar-Touched Goblin',kind:'gob',ai:'ranged',hp:150,atk:24,exp:45,w:12,h:18,spd:34,shard:[7,13],aggro:150},
  unbound:{name:'The Unbound',ai:'unbound',boss:1,hp:4200,atk:34,exp:1800,w:30,h:44,spd:30,shard:[100,160],resp:60,aggro:320},
  lantern:{name:'Lantern Slime',kind:'slime',ai:'slime',passive:1,hp:60,atk:10,exp:16,w:14,h:10,spd:18,shard:[3,6],aggro:50},
  warden:{name:'The Seal Warden',hp:2200,atk:30,exp:900,w:30,h:52,spd:26,boss:1,shard:[80,120],resp:40},
  sapslime:{name:'Sap Slime',kind:'slime',ai:'slime',hp:170,atk:22,exp:38,w:18,h:12,spd:18,shard:[7,13],aggro:80},
  sporecap:{name:'Sporecap',kind:'gen',ai:'lunger',hp:200,atk:25,exp:46,w:14,h:22,spd:22,shard:[8,15],aggro:110},
  rotfly:{name:'Rotfly',kind:'fly',ai:'flyer',fly:1,hp:150,atk:24,exp:44,w:16,h:12,spd:44,shard:[7,13],aggro:170},
  sawtusk:{name:'Sawtusk',kind:'quad',ai:'lunger',elite:1,bb:1,hp:1700,atk:36,exp:640,w:38,h:26,spd:30,shard:[60,90],aggro:150,resp:60},
  rotqueen:{name:'Rotfly Queen',kind:'fly',ai:'flyer',fly:1,elite:1,hp:720,atk:30,exp:280,w:26,h:20,spd:34,shard:[30,50],aggro:190,resp:45},
  rootheart:{name:'The Rootheart',kind:'treant',ai:'lunger',elite:1,bb:1,hp:3400,atk:42,exp:1500,w:28,h:48,spd:12,shard:[90,140],aggro:150,resp:90}};

/* ---------- gear ----------
   A gear set is drawn from its creature's look. pal = main, dark, light, accent, trim.
   head: kasa mosscap mask hood visor · chest: plain moss shroud ink plate · charm: knot eye sigil core keystone */
const GEAR={
  wanderer:{set:"Wanderer's",drop:0,pal:['#9a7a52','#6e5536','#c4a474','#d4483a','#d4483a'],head:{n:'Straw Kasa',s:'kasa'},chest:{n:'Road Haori',s:'plain'},hands:{n:'Wrapped Hands'},feet:{n:'Road Sandals'},sandals:1,
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:"Wanderer's Katana",daggers:"Wanderer's Knives",bow:"Wanderer's Bow",staff:"Wanderer's Staff",tome:"Wanderer's Grimoire"}},
  moss:{set:'Moss Slime',drop:.12,pal:['#5d8a6a','#3e6650','#86b47f','#f2e6c8','#d4483a'],head:{n:'Moss Cap',s:'mosscap'},chest:{n:'Mosshide Vest',s:'moss'},hands:{n:'Spore Mitts'},feet:{n:'Squelch Boots'},
    charm:{n:"Mossling's Eye",s:'eye'},weap:{katana:'Mossbiter',daggers:'Sporefangs',bow:'Vinestring Bow',staff:'Moss-eye Staff',tome:'Sporebound Codex'}},
  husk:{set:'Ashen Husk',drop:.15,pal:['#3a3550','#26233a','#5a5574','#f2e6c8','#d4483a'],head:{n:'Cracked Husk Mask',s:'mask'},chest:{n:'Ashen Shroud',s:'shroud'},hands:{n:'Cinder Wraps'},feet:{n:'Gravewalk Boots'},
    charm:{n:'Ember Sigil',s:'sigil'},weap:{katana:'Husk Cleaver',daggers:'Ash Shivs',bow:'Gravebow',staff:'Cinder Rod',tome:'Ashen Litany'}},
  wisp:{set:'Ink Wisp',drop:.15,pal:['#221e36','#15131f','#3a3456','#f59a4a','#f59a4a'],head:{n:'Wisp Hood',s:'hood'},chest:{n:'Inkweave Robe',s:'ink'},hands:{n:'Smoke Gloves'},feet:{n:'Drift Boots'},
    charm:{n:'Ember Core',s:'core'},weap:{katana:'Inkfang',daggers:'Smokeneedles',bow:'Wispbow',staff:'Lantern of Ink',tome:'Ink-soaked Tome'}},
  warden:{set:"Warden's",drop:1,drops:2,pal:['#4a4766','#33304f','#6a6788','#86b47f','#d4483a'],head:{n:"Warden's Visor",s:'visor'},chest:{n:'Gatestone Plate',s:'plate'},hands:{n:'Warden Gauntlets'},feet:{n:'Bastion Greaves'},
    charm:{n:'Keystone of MossGate',s:'keystone'},weap:{katana:'Gate-slab Odachi',daggers:'Keystone Shards',bow:'Bastion Longbow',staff:'Gatestaff',tome:'Keystone Codex'}},
  wolf:{set:'Forest Wolf',drop:.13,pal:['#6a6a72','#45454e','#8e8e96','#efe4c8','#a83a2c'],head:{n:'Wolfpelt Hood',s:'pelt'},chest:{n:'Wolfhide Jerkin',s:'leather'},hands:{n:'Pawgrip Gloves'},feet:{n:'Packrunner Boots'},
    charm:{n:'Wolf Fang Cord',s:'fang'},weap:{katana:'Wolftooth Blade',daggers:'Fang Knives',bow:'Howlstring Bow',staff:'Packleader Staff',tome:'Moonhowl Grimoire'}},
  boar:{set:'Giant Boar',drop:.13,pal:['#6b4a33','#4a3222','#8f6a48','#e6d6b0','#c9502f'],head:{n:'Boarhide Cap',s:'pelt'},chest:{n:'Bristleback Coat',s:'plain'},hands:{n:'Rooting Gauntlets'},feet:{n:'Mudtrack Boots'},
    charm:{n:'Boar Tusk',s:'tusk'},weap:{katana:'Tuskcleaver',daggers:'Tusk Knives',bow:'Rootbow',staff:'Bristle Staff',tome:'Mudsoaked Ledger'}},
  rotstag:{set:'Rotstag',drop:.14,pal:['#7a6a52','#54483a','#a08e70','#d9c9a0','#86b47f'],head:{n:'Rotstag Crown',s:'antlers'},chest:{n:'Mossbark Mantle',s:'robe'},hands:{n:'Hoofbone Bracers'},feet:{n:'Grovestep Boots'},
    charm:{n:'Antler Tine',s:'antler'},weap:{katana:'Antler Blade',daggers:'Tine Knives',bow:'Stagbone Bow',staff:'Antler Staff',tome:'Grove Hymnal'}},
  treant:{set:'Heartwood',drop:.6,pal:['#55331d','#3b2416','#714426','#9bd04c','#6a8a3a'],head:{n:'Heartwood Circlet',s:'leafcrown'},chest:{n:'Barkplate',s:'plate'},hands:{n:'Rootbound Gauntlets'},feet:{n:'Taproot Greaves'},
    charm:{n:'Heartwood Knot',s:'bark'},weap:{katana:'Rootsplitter',daggers:'Thorn Knives',bow:'Heartwood Bow',staff:'Treant Limb',tome:'Book of Rings'}},
  bogslime:{set:'Bog Slime',drop:.12,pal:['#4a5a3a','#2e3a24','#6a7a4e','#c8d468','#8a6a48'],head:{n:'Bog Cap',s:'mosscap'},chest:{n:'Peatwrap Vest',s:'moss'},hands:{n:'Filter Mitts'},feet:{n:'Sinkproof Boots'},
    charm:{n:'Filtered Gel',s:'gel'},weap:{katana:'Bog-iron Blade',daggers:'Peat Knives',bow:'Reed Bow',staff:'Bogwood Staff',tome:'Drowned Ledger'}},
  lurker:{set:'Swamp Lurker',drop:.13,pal:['#3a5a4a','#24382e','#5a7a64','#d9c9a0','#c8d468'],head:{n:'Lurkerscale Mask',s:'shinobi'},chest:{n:'Scaleweave Wraps',s:'wraps'},hands:{n:'Webbed Grips'},feet:{n:'Wader Boots'},
    charm:{n:'Nest Scale',s:'scale'},weap:{katana:'Lurkertooth',daggers:'Scale Shivs',bow:'Swamp Bow',staff:'Reedstalk Staff',tome:'Tide Ledger'}},
  stalker:{set:'Hollow Stalker',drop:.14,pal:['#2a2a3a','#18182a','#44445a','#c9a8ff','#6ec6e2'],head:{n:'Hollow Hood',s:'hood'},chest:{n:'Unremembered Cloak',s:'ink'},hands:{n:'Silent Grips'},feet:{n:'Soundless Boots'},
    charm:{n:'Silent Claw',s:'claw'},weap:{katana:'Hollow Edge',daggers:'Quiet Knives',bow:'Nightstring Bow',staff:'Memoryless Staff',tome:'Blank Codex'}},
  gob:{set:'Scrapcap',drop:.14,pal:['#6a6a3a','#4a4a24','#8a8a4e','#c8a050','#d4483a'],head:{n:'Scrapcap Goggles',s:'goggles'},chest:{n:'Patchwork Apron',s:'leather'},hands:{n:'Riveted Gloves'},feet:{n:'Hobnail Boots'},
    charm:{n:'Lucky Cog',s:'cog'},weap:{katana:'Scrap Cutter',daggers:'Rivet Shivs',bow:'Spring Bow',staff:'Wrench Staff',tome:'Schematic Book'}},
  raider:{set:'Freeband',drop:.14,pal:['#5a3a2a','#3a2418','#7a5038','#d9c9a0','#b23a2e'],head:{n:'Freeband Kerchief',s:'shinobi'},chest:{n:'Toll-taker Coat',s:'haori'},hands:{n:'Cutpurse Gloves'},feet:{n:'Roadrunner Boots'},
    charm:{n:'Extortion Coin',s:'coin'},weap:{katana:'Toll Blade',daggers:'Cutpurse Knives',bow:'Ambush Bow',staff:'Road Staff',tome:'Ledger of Debts'}},
  shardslime:{set:'Shard Slime',drop:.13,pal:['#3a2a4e','#241838','#5a4278','#c9a8ff','#6ec6e2'],head:{n:'Shard Crown',s:'crystal'},chest:{n:'Crystalgel Vest',s:'moss'},hands:{n:'Insulated Mitts'},feet:{n:'Glassfoot Boots'},
    charm:{n:'Stabilized Shard',s:'shard'},weap:{katana:'Shardglass Blade',daggers:'Crystal Shivs',bow:'Resonant Bow',staff:'Shard Focus',tome:'Unstable Codex'}},
  bear:{set:'Scarback',drop:.22,pal:['#4a3a32','#2e241e','#6a5448','#c9a8ff','#8a4ab0'],head:{n:'Scarback Cowl',s:'pelt'},chest:{n:'Scarback Hideplate',s:'plate'},hands:{n:'Mauler Gauntlets'},feet:{n:'Bearpaw Greaves'},
    charm:{n:'Crystal Claw',s:'claw'},weap:{katana:'Mauler',daggers:'Claw Knives',bow:'Scarbow',staff:'Crystal Totem',tome:'Scar Journal'}},
  drake:{set:'Veinwing',drop:.14,pal:['#3a4a5a','#24303c','#5a7088','#6ec6e2','#c9a8ff'],head:{n:'Veinwing Crest',s:'feather'},chest:{n:'Glider Wraps',s:'wraps'},hands:{n:'Talon Grips'},feet:{n:'Updraft Boots'},
    charm:{n:'Veinwing Scale',s:'scale'},weap:{katana:'Drakefang',daggers:'Wingblades',bow:'Updraft Bow',staff:'Current Staff',tome:'Sky Ledger'}},
  lantern:{set:'Lantern Slime',drop:.12,pal:['#6a5a2a','#4a3e1c','#8a7a3e','#ffd27a','#f59a4a'],head:{n:'Glowcap',s:'mosscap'},chest:{n:'Lampwick Vest',s:'plain'},hands:{n:'Wickfinger Gloves'},feet:{n:'Ember Slippers'},
    charm:{n:'Lantern Core',s:'lamp'},weap:{katana:'Glimmer Blade',daggers:'Wick Knives',bow:'Beacon Bow',staff:'Lamplight Staff',tome:'Lit Manuscript'}},
  ironwork:{set:'Ironwork',drop:0,craft:1,pal:['#6a6a72','#45454e','#9aa0a8','#e3b04b','#d4483a'],head:{n:'Ironbound Helm',s:'visor'},chest:{n:'Iron Plate',s:'plate'},hands:{n:'Iron Gauntlets'},feet:{n:'Iron Greaves'},
    charm:{n:'Shardstone Charm',s:'shard'},weap:{katana:'Iron Katana',daggers:'Iron Knives',bow:'Ash Bow',staff:'Oak Staff',tome:'Bound Grimoire'}},
  leatherwork:{set:'Leatherwork',drop:0,craft:1,pal:['#8a5a38','#5a3a24','#a87a52','#e6d6b0','#3f6e4a'],head:{n:'Leather Hood',s:'pelt'},chest:{n:'Leather Jerkin',s:'leather'},hands:{n:'Leather Gloves'},feet:{n:'Leather Boots'},
    charm:{n:'Hide Cord',s:'fang'},weap:{katana:'Leather-wrapped Blade',daggers:'Skinning Knives',bow:'Hide Bow',staff:'Wrapped Staff',tome:'Bound Grimoire'}},
  shardsteel:{set:'Shardsteel',drop:0,craft:1,pal:['#4a3a6a','#2e2448','#7a6aa0','#c9a8ff','#6ec6e2'],head:{n:'Shardsteel Helm',s:'visor'},chest:{n:'Shardsteel Plate',s:'plate'},hands:{n:'Shardsteel Gauntlets'},feet:{n:'Shardsteel Greaves'},
    charm:{n:'Resonant Shard',s:'shard'},weap:{katana:'Shardsteel Blade',daggers:'Shardsteel Knives',bow:'Shardstring Bow',staff:'Shard-tipped Staff',tome:'Shardbound Codex'}},
  fiend:{set:'Veinfiend',drop:.15,pal:['#24142e','#120a18','#3a2448','#ff5a3a','#d9d2bc'],head:{n:'Fiendhorn Crown',s:'horns'},chest:{n:'Veincracked Robe',s:'ink'},hands:{n:'Claw Wraps'},feet:{n:'Ashwalker Boots'},
    charm:{n:'Burning Vein',s:'vein'},weap:{katana:'Veinrender',daggers:'Fiend Claws',bow:'Hellstring Bow',staff:'Ember Rod',tome:'Book of Calling'}},
  scargob:{set:'Scar-Touched',drop:.15,pal:['#3a2a4e','#241838','#5a4278','#c9a8ff','#8a7aa0'],head:{n:'Shardgrown Crest',s:'crystal'},chest:{n:'Crusted Jerkin',s:'leather'},hands:{n:'Crystal-knuckle Gloves'},feet:{n:'Glassgrit Boots'},
    charm:{n:'Scar Pebble',s:'shard'},weap:{katana:'Crystal Cutter',daggers:'Shard Shivs',bow:'Shardsling Bow',staff:'Prospector Staff',tome:'Prospector Notes'}},
  unbound:{set:'Unbound',drop:1,drops:2,pal:['#efe4d8','#1a1028','#c8bcb0','#c9a8ff','#2e1c44'],head:{n:'Mask of the Unbound',s:'mask'},chest:{n:'Voidshroud',s:'shroud'},hands:{n:'Hollow Grasp'},feet:{n:'Unmoored Steps'},
    charm:{n:'Shard of Silence',s:'void'},weap:{katana:'Unbound Edge',daggers:'Hollow Fangs',bow:'Silent Bow',staff:'Staff of the Unbound',tome:'The Unwritten'}},
  r_start:{set:'Ronin',drop:0,sandals:1,start:1,pal:['#2f3e66','#1e2847','#4a5c8a','#f2e6c8','#d4483a'],head:{n:'Hachimaki',nf:'Kanzashi Pin',s:'hachimaki'},chest:{n:'Ronin Haori',nf:'Ronin Kimono',s:'haori'},hands:{n:'Tsuka Wraps',nf:'Silk Tsuka Wraps'},feet:{n:'Waraji Sandals',nf:'Zori Sandals'},
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:'Ronin Blade',daggers:'Ronin Tanto',bow:'Ronin Yumi',staff:'Ronin Bo',tome:'Ronin Sutra'}},
  sapslime:{set:'Sap Slime',drop:.13,pal:['#8a5a1a','#5a3a10','#c08a2a','#ffd27a','#6a8a3a'],head:{n:'Resin Cap',s:'mosscap'},chest:{n:'Amberweave Vest',s:'moss'},hands:{n:'Sticky Mitts'},feet:{n:'Sapwalk Boots'},
    charm:{n:'Amber Bead',s:'gel'},weap:{katana:'Resinedge',daggers:'Amber Stings',bow:'Sapbow',staff:'Amber Rod',tome:'Pressed-Leaf Folio'}},
  sporecap:{set:'Sporecap',drop:.13,pal:['#6a3a4a','#44222e','#8a5464','#e8d8c8','#c8d468'],head:{n:'Sporecap Hat',s:'mosscap'},chest:{n:'Gillcloth Robe',s:'robe'},hands:{n:'Mycelium Wraps'},feet:{n:'Rootfoot Boots'},
    charm:{n:'Spore Pouch',s:'gel'},weap:{katana:'Stemcutter',daggers:'Spore Pins',bow:'Gillstring Bow',staff:'Sporing Staff',tome:'Book of Rot'}},
  rotfly:{set:'Rotfly',drop:.13,pal:['#3a2a3a','#241824','#5a4256','#d4483a','#9ab4c0'],head:{n:'Compound Visor',s:'goggles'},chest:{n:'Chitin Wraps',s:'wraps'},hands:{n:'Clinging Grips'},feet:{n:'Hover Boots'},
    charm:{n:'Wing Shard',s:'scale'},weap:{katana:'Stingblade',daggers:'Proboscis Pair',bow:'Droning Bow',staff:'Swarm Rod',tome:'Hive Ledger'}},
  sawtusk:{set:'Sawtusk',drop:1,drops:2,pal:['#5a3420','#3a2014','#7a4a2a','#a8b0b8','#ff8a3a'],head:{n:'Sawtusk Helm',s:'horns'},chest:{n:'Millhide Coat',s:'leather'},hands:{n:'Gearbound Gauntlets'},feet:{n:'Millstomp Boots'},
    charm:{n:'Sawtooth Tusk',s:'tusk'},weap:{katana:'Ripsaw Blade',daggers:'Tusk Hooks',bow:'Millwheel Bow',staff:'Drive-Shaft Staff',tome:'Foreman’s Ledger'}},
  rotqueen:{set:'Rotfly Queen',drop:.5,pal:['#4a2a3a','#2a1424','#6a3e52','#e05a4a','#c8d468'],head:{n:'Brood Crown',s:'crystal'},chest:{n:'Hive Mantle',s:'gown'},hands:{n:'Broodmother Grips'},feet:{n:'Swarmstep Boots'},
    charm:{n:'Queen’s Jelly',s:'gel'},weap:{katana:'Queen’s Sting',daggers:'Brood Needles',bow:'Swarmcaller',staff:'Hive Scepter',tome:'Royal Brood-Book'}},
  rootheart:{set:'Rootheart',drop:1,drops:2,pal:['#3a2a32','#241820','#5a4248','#c8d468','#a070c0'],head:{n:'Rootheart Crown',s:'antlers'},chest:{n:'Heartwood Mantle',s:'robe'},hands:{n:'Taproot Grips'},feet:{n:'Deep-Root Boots'},
    charm:{n:'Rotten Heartseed',s:'bark'},weap:{katana:'Heartwood Edge',daggers:'Rootfangs',bow:'Taproot Bow',staff:'Rootheart Staff',tome:'The Root Ledger'}},
  s_start:{set:'Shinobi',drop:0,start:1,pal:['#26222e','#16131c','#3d3848','#8f2a22','#5a2a6a'],head:{n:'Shinobi Mask',nf:'Shadow Veil',s:'shinobi'},chest:{n:'Shadow Wraps',nf:'Shadow Bodywrap',s:'wraps'},hands:{n:'Grip Wraps',nf:'Silk Grip Wraps'},feet:{n:'Tabi Boots',nf:'Kunoichi Tabi'},
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:'Shinobi-to',daggers:'Kunai Pair',bow:'Hankyu',staff:'Shinobi Staff',tome:'Scroll of Shadows'}},
  a_start:{set:'Hunter',drop:0,start:1,pal:['#6b4a33','#4a3222','#8f6a48','#e6d6b0','#3f6e4a'],head:{n:'Hunter Cap',nf:'Hawk Feather',s:'feather'},chest:{n:'Hunter Jerkin',nf:'Hunter Corset',s:'leather'},hands:{n:'Archer Bracers',nf:'Laced Bracers'},feet:{n:'Stalker Boots',nf:'Stalker Heels'},
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:'Hunter Machete',daggers:'Skinning Knives',bow:'Hunter Shortbow',staff:'Hunter Pole',tome:'Tracker Journal'}},
  w_start:{set:'Grove',drop:0,start:1,pal:['#3f6e4a','#2a4a32','#6a9a5a','#e6d6b0','#b8914f'],head:{n:'Leaf Circlet',nf:'Bloom Circlet',s:'leafcrown'},chest:{n:'Grove Robe',nf:'Grove Gown',s:'robe'},hands:{n:'Vine Cuffs',nf:'Petal Cuffs'},feet:{n:'Root Slippers',nf:'Moss Slippers'},
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:'Grove Blade',daggers:'Thorn Knives',bow:'Grove Bow',staff:'Sapling Staff',tome:'Grove Psalter'}},
  n_start:{set:'Grave',drop:0,start:1,pal:['#2a2036','#17121f','#45385a','#d9d2bc','#7a4aa0'],head:{n:'Grave Cowl',nf:'Mourning Veil',s:'cowl'},chest:{n:'Grave Coat',nf:'Grave Gown',s:'gown'},hands:{n:'Bone Rings',nf:'Bone Bangles'},feet:{n:'Barrow Boots',nf:'Barrow Heels'},
    charm:{n:'Red Cord Knot',s:'knot'},weap:{katana:'Grave Blade',daggers:'Bone Knives',bow:'Barrow Bow',staff:'Grave Staff',tome:'Grave Primer'}}};
const START={ronin:'r_start',shade:'s_start',ashbow:'a_start',weaver:'w_start',necro:'n_start'};
{const NOUN={axe:'Axe',hammer:'Maul',spear:'Spear',shield:'Bulwark'};for(const k in GEAR){const g=GEAR[k];if(!g.weap)continue;for(const w in NOUN)if(!g.weap[w])g.weap[w]=(g.set||'Wanderer')+' '+NOUN[w]}}
const GEAR_MISSING=Object.keys(MOBS).filter(k=>{const g=GEAR[k];return!g||!g.pal||!g.weap||!['head','chest','hands','feet','charm'].every(s=>g[s]&&g[s].n)||!WEAPS.every(w=>g.weap[w])});
const SLOTS=['head','chest','hands','feet','weapon','charm'],SLOT_N={head:'Head',chest:'Body',hands:'Hands',feet:'Feet',weapon:'Weapon',charm:'Charm'};
const RAR=[{n:'Common',c:'#f2e6c8',m:1},{n:'Fine',c:'#9bd04c',m:1.35},{n:'Rare',c:'#6ec6e2',m:1.8},{n:'Relic',c:'#f59a4a',m:2.5}];
const STAT_N={atk:'Attack',def:'Defense',hp:'Max HP',mp:'Max MP',crit:'Crit %'};
const SLOT_ST={weapon:['atk'],head:['def','mp'],chest:['def','hp'],hands:['atk','crit'],feet:['def','hp'],charm:['mp','crit','hp']};
const BASE_ST={atk:3,def:2,hp:10,mp:6,crit:1.5};
const gearDef=it=>{const g=GEAR[it.src]||GEAR.wanderer;return it.slot==='weapon'?{n:g.weap[it.weap]}:g[it.slot]};
const isFem=()=>typeof pl!=='undefined'&&pl.ch&&pl.ch.look&&pl.ch.look.sex===1;
const itemName=it=>{const d=gearDef(it);return isFem()&&d.nf?d.nf:d.n};
function itemStats(slot,r,lv){const st={};for(const k of SLOT_ST[slot])st[k]=Math.max(1,Math.round(BASE_ST[k]*(slot==='weapon'?1.4:1)*(k==='crit'?1+.08*(lv-1):1+.25*(lv-1))*RAR[r].m*rnd(.85,1.15)));return st}
function makeItem(src,slot,weap,r,lv=1){return{id:Math.random().toString(36).slice(2,9),src,slot,weap:slot==='weapon'?weap:null,r,lv,st:itemStats(slot,r,lv)}}
function rollRar(boss){const r=Math.random();if(boss)return r<.25?3:r<.75?2:1;return r<.02?3:r<.12?2:r<.42?1:0}
const itemValue=it=>Math.round(4*(it.lv||1)*RAR[it.r].m);
const BAG_MAX=24;

/* ---------- skill trees ---------- */
const GATES=[1,3,6,9];
const TREES={
 ronin:[
  {id:'r_edge',t:0,col:0,n:'Honed Edge',k:'Passive',max:5,ic:'blade',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'r_stance',t:0,col:1,n:'Iron Stance',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'r_dash',t:1,col:0,req:['r_edge',2],n:'Swift Dash',k:'Upgrade',max:3,ic:'dash',fx:r=>({s1P:.15*r,s1cd:.15*r}),d:r=>`Dash deals +${15*r}% damage and recovers ${(.15*r).toFixed(2)}s faster`},
  {id:'r_wave',t:1,col:1,req:['r_stance',2],n:'Twin Crescent',k:'Upgrade',max:3,ic:'wave',fx:r=>({s2P:.15*r,twin:r>=3?1:0}),d:r=>`Wave deals +${15*r}% damage${r>=3?' and a second wave cuts behind you':''}`},
  {id:'r_blood',t:2,col:0,req:['r_dash',1],n:'Bloodletter',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'r_unbroken',t:2,col:1,req:['r_wave',1],n:'Unbroken',k:'Passive',max:3,ic:'heart',fx:r=>({hpP:.08*r}),d:r=>`+${8*r}% max HP`},
  {id:'r_ult',t:3,col:.5,req:['r_blood|r_unbroken',1],n:'Thousand Cuts',k:'Ultimate',max:3,ic:'ult',mp:30,cd:12,fx:()=>({}),d:r=>`Six slashes tear everything around you for ${90+30*r}% damage each. 30 MP, 12s cooldown`}],
 shade:[
  {id:'s_quick',t:0,col:0,n:'Quick Hands',k:'Passive',max:5,ic:'speed',fx:r=>({cdP:.05*r}),d:r=>`Strikes ${5*r}% faster`},
  {id:'s_step',t:0,col:1,n:'Shadowstep',k:'Passive',max:5,ic:'dash',fx:r=>({spd:.04*r}),d:r=>`+${4*r}% move speed`},
  {id:'s_flick',t:1,col:0,req:['s_quick',2],n:'Flicker Edge',k:'Upgrade',max:3,ic:'blade',fx:r=>({s1P:.15*r,s1cd:.1*r}),d:r=>`Flicker deals +${15*r}% damage and recovers ${(.1*r).toFixed(1)}s faster`},
  {id:'s_stars',t:1,col:1,req:['s_step',2],n:'Star Storm',k:'Upgrade',max:3,ic:'star',fx:r=>({s2P:.12*r,starsN:r>=3?2:r>=2?1:0}),d:r=>`Stars deal +${12*r}% damage${r>=2?`, +${r>=3?2:1} extra star${r>=3?'s':''}`:''}`},
  {id:'s_mark',t:2,col:0,req:['s_flick',1],n:"Assassin's Mark",k:'Passive',max:3,ic:'eye',fx:r=>({crit:4*r}),d:r=>`+${4*r}% critical chance`},
  {id:'s_venom',t:2,col:1,req:['s_stars',1],n:'Venom',k:'Passive',max:3,ic:'poison',fx:r=>({poison:.06*r}),d:r=>`Hits poison foes for ${6*r}% of your attack each second for 3s`},
  {id:'s_ult',t:3,col:.5,req:['s_mark|s_venom',1],n:'Shadow Dance',k:'Ultimate',max:3,ic:'ult',mp:28,cd:12,fx:()=>({}),d:r=>`Vanish and strike up to 5 nearby foes for ${220+40*r}% damage. 28 MP, 12s cooldown`}],
 ashbow:[
  {id:'a_aim',t:0,col:0,n:'Steady Aim',k:'Passive',max:5,ic:'bow',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'a_fleet',t:0,col:1,n:'Fleet Foot',k:'Passive',max:5,ic:'speed',fx:r=>({spd:.04*r}),d:r=>`+${4*r}% move speed`},
  {id:'a_rain',t:1,col:0,req:['a_aim',2],n:'Rain Volley',k:'Upgrade',max:3,ic:'star',fx:r=>({s1P:.1*r,volleyN:Math.max(0,r-1)}),d:r=>`Volley deals +${10*r}% damage${r>=2?`, +${r-1} arrow${r>2?'s':''}`:''}`},
  {id:'a_gale',t:1,col:1,req:['a_fleet',2],n:'Piercing Gale',k:'Upgrade',max:3,ic:'dash',fx:r=>({s2P:.2*r,s2cd:.2*r}),d:r=>`Pierce deals +${20*r}% damage and recovers ${(.2*r).toFixed(1)}s faster`},
  {id:'a_eye',t:2,col:0,req:['a_rain',1],n:'Eagle Eye',k:'Passive',max:3,ic:'eye',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'a_second',t:2,col:1,req:['a_gale',1],n:'Second Shot',k:'Passive',max:3,ic:'bow',fx:r=>({shot2:.12*r}),d:r=>`${12*r}% chance to loose a second arrow`},
  {id:'a_ult',t:3,col:.5,req:['a_eye|a_second',1],n:'Arrowstorm',k:'Ultimate',max:3,ic:'ult',mp:30,cd:12,fx:()=>({}),d:r=>`${14+4*r} arrows rain down on the ground ahead. 30 MP, 12s cooldown`}],
 necro:[
  {id:'n_pact',t:0,col:0,n:'Dark Pact',k:'Passive',max:5,ic:'skull',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'n_ward',t:0,col:1,n:'Bone Ward',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'n_horde',t:1,col:0,req:['n_pact',2],n:'Bone Horde',k:'Upgrade',max:3,ic:'skull',fx:r=>({s1P:.15*r,thrallN:r>=3?2:r>=2?1:0}),d:r=>`Thralls deal +${15*r}% damage${r>=2?`, +${r>=3?2:1} max thrall${r>=3?'s':''}`:''}`},
  {id:'n_siphon',t:1,col:1,req:['n_ward',2],n:'Soul Siphon',k:'Upgrade',max:3,ic:'drain',fx:r=>({s2P:.2*r,drainP:.1*r}),d:r=>`Drain deals +${20*r}% damage and heals ${30+10*r}% of it`},
  {id:'n_mark',t:2,col:0,req:['n_horde',1],n:'Death Mark',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'n_bloom',t:2,col:1,req:['n_siphon',1],n:'Corpse Bloom',k:'Passive',max:3,ic:'poison',fx:r=>({corpse:.25*r}),d:r=>`Slain foes burst for ${25*r}% of your attack around them`},
  {id:'n_ult',t:3,col:.5,req:['n_mark|n_bloom',1],n:'Army of the Fallen',k:'Ultimate',max:3,ic:'ult',mp:36,cd:14,fx:()=>({}),d:r=>`${4+r} wraiths rise and hunt your foes for 5s, hitting for ${120+20*r}%. 36 MP, 14s cooldown`}],
 weaver:[
  {id:'w_roots',t:0,col:0,n:'Deep Roots',k:'Passive',max:5,ic:'roots',fx:r=>({mpP:.06*r}),d:r=>`+${6*r}% max MP`},
  {id:'w_ward',t:0,col:1,n:'Moss Ward',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'w_blink',t:1,col:0,req:['w_roots',2],n:'Far Blink',k:'Upgrade',max:3,ic:'dash',fx:r=>({blinkD:14*r,s1P:.2*r}),d:r=>`Blink travels further and hits for +${20*r}%`},
  {id:'w_bramble',t:1,col:1,req:['w_ward',2],n:'Bramble Wall',k:'Upgrade',max:3,ic:'thorns',fx:r=>({thornsR:.1*r,s2P:.15*r}),d:r=>`Thorns reach ${10*r}% wider and deal +${15*r}% damage`},
  {id:'w_over',t:2,col:0,req:['w_blink',1],n:'Overgrowth',k:'Passive',max:3,ic:'leaf',fx:r=>({spellP:.12*r}),d:r=>`Moss bolts deal +${12*r}% damage`},
  {id:'w_bloom',t:2,col:1,req:['w_bramble',1],n:'Lifebloom',k:'Passive',max:3,ic:'heart',fx:r=>({regen:2*r}),d:r=>`Heal ${2*r} HP every second`},
  {id:'w_ult',t:3,col:.5,req:['w_over|w_bloom',1],n:'Verdant Wrath',k:'Ultimate',max:3,ic:'ult',mp:40,cd:14,fx:()=>({}),d:r=>`Thorns erupt under every foe on screen for ${250+50*r}% damage and root them. 40 MP, 14s cooldown`}]};
/* ---------- disciplines (Bible ch.4) ---------- */
const DISC={
  blade:{n:'Bladecraft',fam:'Martial',weap:'katana',tree:'ronin',t:[{n:'Dash',mp:8,cd:1.4,d:'Lunge through foes with a drawn cut.'},{n:'Wave',mp:14,cd:2.2,d:'Release a crescent of force that cuts through a line of foes.'}]},
  paired:{n:'Paired Blades',fam:'Martial',weap:'daggers',tree:'shade',t:[{n:'Flicker',mp:6,cd:.9,d:'Blink forward through foes with both blades.'},{n:'Stars',mp:12,cd:1.8,d:'Throw a fan of steel stars.'}]},
  archery:{n:'Archery',fam:'Martial',weap:'bow',tree:'ashbow',t:[{n:'Volley',mp:10,cd:1.6,d:'Loose a spread of arrows.'},{n:'Pierce',mp:16,cd:2.4,d:'A heavy shaft that passes through every foe in line.'}]},
  nature:{n:'Nature',fam:'Magical',weap:'staff',focus:1,tree:'weaver',t:[{n:'Blink',mp:10,cd:1.5,d:'Step through the living current, striking where you land.'},{n:'Thorns',mp:20,cd:2.6,d:'Thorns erupt from the ground around you.'}]},
  necro:{n:'Necromancy',fam:'Magical',weap:'tome',focus:1,tree:'necro',t:[{n:'Raise',mp:12,cd:2.5,d:'Raise a moss-bound thrall that fights beside you.'},{n:'Drain',mp:14,cd:2.4,d:'Pull vitality from the nearest foe ahead and keep part of it.'}]},
  robes:{n:'Robes',fam:'Armor',armor:1,d:'Unarmored and robes: mobility, quiet movement and fast focus recovery. Little protection.'},
  light:{n:'Light Armor',fam:'Armor',armor:1,d:'Evasion, speed and precise handling. Limited protection against sustained pressure.'},
  medium:{n:'Medium Armor',fam:'Armor',armor:1,d:'Balanced defense and endurance. Maximizes neither mobility nor protection.'},
  heavy:{n:'Heavy Armor',fam:'Armor',armor:1,d:'Protection and stability. Slower movement and slower focus recovery until trained.'}};
Object.assign(DISC,{
  logging:{n:'Logging',fam:'Gathering',field:1,d:'Fell and grade timber in Whisper Woods and Fallen Oak Grove.'},
  herbalism:{n:'Herbalism',fam:'Gathering',field:1,d:'Herbs and dark mushrooms from woods, lake margins and Marrowbog.'},
  mining:{n:'Mining',fam:'Gathering',field:1,d:'Iron ore from the northern hills and Shardstone from the Scar.'},
  fishing:{n:'Fishing',fam:'Gathering',field:1,d:'Fish from Misty Fen Lake, the river and the bog pools.'},
  salvage:{n:'Salvage',fam:'Gathering',field:1,d:'Reclaimed parts from caravans, ruins and the watchtower.'},
  hunting:{n:'Hunting',fam:'Gathering',field:1,d:'Hide and meat from beasts you bring down.'},
  investigation:{n:'Investigation',fam:'World',field:1,d:'Reading records, testimony and carvings. Lore you find levels it.'},
  commerce:{n:'Commerce',fam:'World',field:1,d:'Market sales and contracts. Each rank adds 2% to what buyers pay.'},
  transport:{n:'Transport',fam:'World',field:1,d:'Freight delivered. Each rank eases the burden of carried cargo.'},
  smith:{n:'Smithing',fam:'Crafting',craft:1,d:'Iron weapons, heavy armor and charms at a forge.'},
  wood:{n:'Woodworking',fam:'Crafting',craft:1,d:'Bows and staves at a forge or workbench.'},
  leather:{n:'Leatherworking',fam:'Crafting',craft:1,d:'Light armor and bound grimoires.'},
  alchemy:{n:'Alchemy',fam:'Crafting',craft:1,d:'Tonics and draughts at an herbalist\u2019s rack.'},
  cooking:{n:'Cooking',fam:'Crafting',craft:1,d:'Food that sustains you on the road, at any campfire.'}});
const COMBAT_D=['blade','paired','archery','nature','necro'],ARMOR_D=['robes','light','medium','heavy'];
const FIELD_D=['logging','herbalism','mining','fishing','salvage','hunting','investigation','commerce','transport'],CRAFT_D=['smith','wood','leather','alchemy','cooking'];
const WEAP_DISC={katana:'blade',daggers:'paired',bow:'archery',staff:'nature',tome:'necro'};
const TREE_DISC={ronin:'blade',shade:'paired',ashbow:'archery',weaver:'nature',necro:'necro'};
/* ---------- new arms and magic (Bible ch.7: axes, hammers, polearms, shields; ch.9–10: Restoration, Warding, Exorcism) ---------- */
Object.assign(TREES,{
 axes:[
  {id:'x_grip',t:0,col:0,n:'Woodsman’s Grip',k:'Passive',max:5,ic:'blade',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'x_hide',t:0,col:1,n:'Thick Hide',k:'Passive',max:5,ic:'heart',fx:r=>({hpP:.04*r}),d:r=>`+${4*r}% max HP`},
  {id:'x_cleave',t:1,col:0,req:['x_grip',2],n:'Wide Cleave',k:'Upgrade',max:3,ic:'blade',fx:r=>({s1P:.15*r,s1cd:.1*r}),d:r=>`Cleave deals +${15*r}% damage and recovers ${(.1*r).toFixed(1)}s faster`},
  {id:'x_hurl',t:1,col:1,req:['x_hide',2],n:'Returning Edge',k:'Upgrade',max:3,ic:'star',fx:r=>({s2P:.18*r}),d:r=>`Hurled axes deal +${18*r}% damage`},
  {id:'x_bleed',t:2,col:0,req:['x_cleave',1],n:'Bloodied Edge',k:'Passive',max:3,ic:'poison',fx:r=>({poison:.05*r}),d:r=>`Hits make foes bleed for ${5*r}% of your attack each second for 3s`},
  {id:'x_fury',t:2,col:1,req:['x_hurl',1],n:'Lumber Fury',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'x_ult',t:3,col:.5,req:['x_bleed|x_fury',1],n:'Whirlwind',k:'Ultimate',max:3,ic:'ult',mp:30,cd:12,fx:()=>({}),d:r=>`Spin for 1.4s, cutting everything near you for ${80+25*r}% damage each turn. 30 MP, 12s cooldown`}],
 hammer:[
  {id:'h_weight',t:0,col:0,n:'Dead Weight',k:'Passive',max:5,ic:'blade',fx:r=>({atkP:.05*r}),d:r=>`+${5*r}% attack`},
  {id:'h_iron',t:0,col:1,n:'Iron Frame',k:'Passive',max:5,ic:'shield',fx:r=>({def:4*r}),d:r=>`+${4*r} defense`},
  {id:'h_quake',t:1,col:0,req:['h_weight',2],n:'Deep Quake',k:'Upgrade',max:3,ic:'wave',fx:r=>({s1P:.15*r}),d:r=>`Quake deals +${15*r}% damage and stuns longer`},
  {id:'h_crush',t:1,col:1,req:['h_iron',2],n:'Bone Crusher',k:'Upgrade',max:3,ic:'blade',fx:r=>({s2P:.2*r,s2cd:.2*r}),d:r=>`Crush deals +${20*r}% damage and recovers ${(.2*r).toFixed(1)}s faster`},
  {id:'h_steady',t:2,col:0,req:['h_quake',1],n:'Unmovable',k:'Passive',max:3,ic:'shield',fx:r=>({blockP:.1*r}),d:r=>`Guarding costs ${10*r}% less stamina`},
  {id:'h_thump',t:2,col:1,req:['h_crush',1],n:'Concussion',k:'Passive',max:3,ic:'crit',fx:r=>({crit:2*r,atkP:.02*r}),d:r=>`+${2*r}% critical chance and +${2*r}% attack`},
  {id:'h_ult',t:3,col:.5,req:['h_steady|h_thump',1],n:'Earthbreaker',k:'Ultimate',max:3,ic:'ult',mp:32,cd:13,fx:()=>({}),d:r=>`Leap and shatter the ground, hitting everything nearby for ${280+60*r}% and stunning it. 32 MP, 13s cooldown`}],
 polearm:[
  {id:'p_reach',t:0,col:0,n:'Long Reach',k:'Passive',max:5,ic:'blade',fx:r=>({atkP:.04*r}),d:r=>`+${4*r}% attack`},
  {id:'p_foot',t:0,col:1,n:'Light Footing',k:'Passive',max:5,ic:'speed',fx:r=>({spd:.04*r}),d:r=>`+${4*r}% move speed`},
  {id:'p_lunge',t:1,col:0,req:['p_reach',2],n:'Driving Lunge',k:'Upgrade',max:3,ic:'dash',fx:r=>({s1P:.15*r,s1cd:.1*r}),d:r=>`Lunge deals +${15*r}% damage and recovers ${(.1*r).toFixed(1)}s faster`},
  {id:'p_jav',t:1,col:1,req:['p_foot',2],n:'Barbed Javelin',k:'Upgrade',max:3,ic:'star',fx:r=>({s2P:.18*r}),d:r=>`Javelins deal +${18*r}% damage`},
  {id:'p_set',t:2,col:0,req:['p_lunge',1],n:'Set Against Charge',k:'Passive',max:3,ic:'shield',fx:r=>({def:3*r,blockP:.08*r}),d:r=>`+${3*r} defense, guarding costs ${8*r}% less`},
  {id:'p_pin',t:2,col:1,req:['p_jav',1],n:'Pinning Point',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'p_ult',t:3,col:.5,req:['p_set|p_pin',1],n:'Phalanx',k:'Ultimate',max:3,ic:'ult',mp:28,cd:12,fx:()=>({}),d:r=>`Eight rapid thrusts down a long line, ${70+20*r}% damage each. 28 MP, 12s cooldown`}],
 shield:[
  {id:'g_wall',t:0,col:0,n:'Shield Wall',k:'Passive',max:5,ic:'shield',fx:r=>({def:4*r}),d:r=>`+${4*r} defense`},
  {id:'g_brace',t:0,col:1,n:'Braced Arm',k:'Passive',max:5,ic:'shield',fx:r=>({blockP:.06*r}),d:r=>`Guarding costs ${6*r}% less stamina`},
  {id:'g_bash',t:1,col:0,req:['g_wall',2],n:'Heavy Bash',k:'Upgrade',max:3,ic:'dash',fx:r=>({s1P:.2*r}),d:r=>`Shield Bash deals +${20*r}% damage and stuns longer`},
  {id:'g_bulw',t:1,col:1,req:['g_brace',2],n:'Iron Bulwark',k:'Upgrade',max:3,ic:'shield',fx:r=>({s2P:.25*r}),d:r=>`Bulwark lasts ${(.5*r).toFixed(1)}s longer and strikes back for +${25*r}%`},
  {id:'g_riposte',t:2,col:0,req:['g_bash',1],n:'Riposte',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'g_stal',t:2,col:1,req:['g_bulw',1],n:'Stalwart',k:'Passive',max:3,ic:'heart',fx:r=>({hpP:.07*r}),d:r=>`+${7*r}% max HP`},
  {id:'g_ult',t:3,col:.5,req:['g_riposte|g_stal',1],n:'Rampart',k:'Ultimate',max:3,ic:'ult',mp:30,cd:15,fx:()=>({}),d:r=>`For ${4+r}s, reflect every missile and take half damage. Ends with a shockwave for ${200+50*r}%. 30 MP, 15s cooldown`}],
 restore:[
  {id:'e_vigil',t:0,col:0,n:'Vigil',k:'Passive',max:5,ic:'roots',fx:r=>({mpP:.06*r}),d:r=>`+${6*r}% max MP`},
  {id:'e_balm',t:0,col:1,n:'Soothing Hands',k:'Passive',max:5,ic:'heart',fx:r=>({healP:.08*r}),d:r=>`Healing is ${8*r}% stronger`},
  {id:'e_mend',t:1,col:0,req:['e_vigil',2],n:'Swift Mend',k:'Upgrade',max:3,ic:'heart',fx:r=>({s1cd:.3*r,s1P:.1*r}),d:r=>`Mend recovers ${(.3*r).toFixed(1)}s faster and heals ${10*r}% more`},
  {id:'e_renew',t:1,col:1,req:['e_balm',2],n:'Deep Renewal',k:'Upgrade',max:3,ic:'leaf',fx:r=>({s2P:.2*r}),d:r=>`Renewal heals ${20*r}% more`},
  {id:'e_life',t:2,col:0,req:['e_mend',1],n:'Wellspring',k:'Passive',max:3,ic:'heart',fx:r=>({regen:2*r}),d:r=>`Heal ${2*r} HP every second`},
  {id:'e_kin',t:2,col:1,req:['e_renew',1],n:'Kindred Care',k:'Passive',max:3,ic:'heart',fx:r=>({hpP:.06*r}),d:r=>`+${6*r}% max HP; your heals also mend your companion`},
  {id:'e_ult',t:3,col:.5,req:['e_life|e_kin',1],n:'Sanctuary',k:'Ultimate',max:3,ic:'ult',mp:40,cd:20,fx:()=>({}),d:r=>`A circle of light heals you fully and makes you untouchable for ${1+r*.5}s. 40 MP, 20s cooldown`}],
 ward:[
  {id:'v_lines',t:0,col:0,n:'Ward Lines',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'v_focus',t:0,col:1,n:'Steady Focus',k:'Passive',max:5,ic:'roots',fx:r=>({wardP:.08*r}),d:r=>`Wards absorb ${8*r}% more`},
  {id:'v_aegis',t:1,col:0,req:['v_lines',2],n:'Layered Aegis',k:'Upgrade',max:3,ic:'shield',fx:r=>({s1P:.15*r,s1cd:.3*r}),d:r=>`Aegis absorbs ${15*r}% more and recovers ${(.3*r).toFixed(1)}s faster`},
  {id:'v_barrier',t:1,col:1,req:['v_focus',2],n:'Thorned Barrier',k:'Upgrade',max:3,ic:'thorns',fx:r=>({s2P:.2*r}),d:r=>`Barriers last longer and burn foes for +${20*r}%`},
  {id:'v_echo',t:2,col:0,req:['v_aegis',1],n:'Echoing Ward',k:'Passive',max:3,ic:'shield',fx:r=>({mpP:.05*r}),d:r=>`+${5*r}% max MP; a broken Aegis knocks foes back`},
  {id:'v_seal',t:2,col:1,req:['v_barrier',1],n:'Seal Craft',k:'Passive',max:3,ic:'crit',fx:r=>({spellP:.08*r,crit:2*r}),d:r=>`+${8*r}% spell damage and +${2*r}% critical chance`},
  {id:'v_ult',t:3,col:.5,req:['v_echo|v_seal',1],n:'Bastion',k:'Ultimate',max:3,ic:'ult',mp:36,cd:16,fx:()=>({}),d:r=>`A dome that absorbs ${60+20*r}% of your max HP and turns missiles back for 6s. 36 MP, 16s cooldown`}],
 exorcism:[
  {id:'o_rite',t:0,col:0,n:'Rite of Naming',k:'Passive',max:5,ic:'eye',fx:r=>({holyP:.08*r}),d:r=>`+${8*r}% damage to spirits and the restless dead`},
  {id:'o_salt',t:0,col:1,n:'Salt and Iron',k:'Passive',max:5,ic:'shield',fx:r=>({def:3*r}),d:r=>`+${3*r} defense`},
  {id:'o_cens',t:1,col:0,req:['o_rite',2],n:'Burning Censure',k:'Upgrade',max:3,ic:'star',fx:r=>({s1P:.15*r,s1cd:.1*r}),d:r=>`Censure deals +${15*r}% damage and recovers ${(.1*r).toFixed(1)}s faster`},
  {id:'o_circle',t:1,col:1,req:['o_salt',2],n:'Wider Circle',k:'Upgrade',max:3,ic:'thorns',fx:r=>({s2P:.18*r}),d:r=>`Banishing circles are wider and deal +${18*r}%`},
  {id:'o_vigil',t:2,col:0,req:['o_cens',1],n:'Exorcist’s Vigil',k:'Passive',max:3,ic:'crit',fx:r=>({crit:3*r}),d:r=>`+${3*r}% critical chance`},
  {id:'o_ward',t:2,col:1,req:['o_circle',1],n:'Hallowed Ground',k:'Passive',max:3,ic:'heart',fx:r=>({regen:1*r,holyP:.05*r}),d:r=>`Heal ${r} HP a second; +${5*r}% vs spirits`},
  {id:'o_ult',t:3,col:.5,req:['o_vigil|o_ward',1],n:'Final Rite',k:'Ultimate',max:3,ic:'ult',mp:38,cd:16,fx:()=>({}),d:r=>`Pillars of light fall on every foe in sight for ${200+50*r}% (triple against spirits). 38 MP, 16s cooldown`}]});
Object.assign(DISC,{
  axes:{n:'Axecraft',fam:'Martial',weap:'axe',tree:'axes',cast:1,t:[{n:'Cleave',mp:10,cd:1.8,d:'A wide, heavy sweep that cuts everything in front of you.'},{n:'Hurl',mp:14,cd:2.4,d:'Throw your axe in a spinning arc. It cuts on the way back too.'}]},
  hammer:{n:'Hammer & Mace',fam:'Martial',weap:'hammer',tree:'hammer',cast:1,t:[{n:'Quake',mp:12,cd:2.2,d:'Slam the ground. Shockwaves run both ways and stagger foes.'},{n:'Crush',mp:14,cd:2.6,d:'A charged overhead blow that shatters guard and poise.'}]},
  polearm:{n:'Spear & Polearm',fam:'Martial',weap:'spear',tree:'polearm',cast:1,t:[{n:'Lunge',mp:8,cd:1.4,d:'Drive forward behind the spear point, piercing a line of foes.'},{n:'Javelin',mp:12,cd:2,d:'Hurl a barbed javelin that passes through everything.'}]},
  shield:{n:'Shieldcraft',fam:'Martial',weap:'shield',tree:'shield',cast:1,t:[{n:'Bash',mp:8,cd:1.6,d:'Drive the shield forward, stunning what it hits.'},{n:'Bulwark',mp:12,cd:4,d:'Plant the shield: block everything in front for 2s, then strike back.'}]},
  restore:{n:'Restoration',fam:'Magical',weap:'staff',focus:1,tree:'restore',cast:1,t:[{n:'Mend',mp:14,cd:3,d:'Heal a quarter of your health, and your companion.'},{n:'Renewal',mp:18,cd:6,d:'Healing light for 6 seconds that also cleanses poison.'}]},
  ward:{n:'Warding',fam:'Magical',weap:'tome',focus:1,tree:'ward',cast:1,t:[{n:'Aegis',mp:14,cd:5,d:'A ward that absorbs damage for 8 seconds.'},{n:'Barrier',mp:16,cd:4,d:'Raise a ward line ahead that stops missiles and burns foes who cross it.'}]},
  exorcism:{n:'Exorcism',fam:'Magical',weap:'staff',focus:1,tree:'exorcism',cast:1,t:[{n:'Censure',mp:10,cd:1.4,d:'A bolt of naming light. Double damage to spirits and the restless dead.'},{n:'Banishing',mp:18,cd:3,d:'A circle of salt-light that burns and stuns spirits inside it.'}]}});
COMBAT_D.push('axes','hammer','polearm','shield','restore','ward','exorcism');
Object.assign(WEAP_DISC,{axe:'axes',hammer:'hammer',spear:'polearm',shield:'shield'});
Object.assign(TREE_DISC,{axes:'axes',hammer:'hammer',polearm:'polearm',shield:'shield',restore:'restore',ward:'ward',exorcism:'exorcism'});
const NODE_DISC={};for(const k in TREES)for(const n of TREES[k])NODE_DISC[n.id]=TREE_DISC[k];
const ARMOR_OF={robe:'robes',gown:'robes',ink:'robes',shroud:'robes',wraps:'light',leather:'light',haori:'light',plain:'medium',moss:'medium',plate:'heavy'};
const ARMOR_FX={robes:r=>({mpR:1.4+.05*r,spd:.03+.004*r}),light:r=>({spd:.05+.005*r,crit:1+.3*r}),medium:r=>({def:4+.7*r,hpP:.04+.006*r}),heavy:r=>({def:10+1.3*r,spd:-.15+.012*r,mpR:.7+.03*r,kbR:.4+.05*r})};
const ARMOR_TXT={robes:r=>`+${Math.round((.4+.05*r)*100)}% MP recovery · +${Math.round((.03+.004*r)*100)}% speed`,light:r=>`+${Math.round((.05+.005*r)*100)}% speed · +${(1+.3*r).toFixed(1)}% crit`,
  medium:r=>`+${(4+.7*r).toFixed(0)} defense · +${Math.round((.04+.006*r)*100)}% max HP`,heavy:r=>`+${(10+1.3*r).toFixed(0)} defense · ${Math.round((-.15+.012*r)*100)}% speed · ${Math.round((-.3+.03*r)*100)}% MP recovery · resists knockback`};
const TIER_N=['Untrained','Initiate','Initiate','Practitioner','Practitioner','Practitioner','Adept','Adept','Adept','Expert','Master'],DMAX=10;
const dNeed=r=>Math.floor(25*Math.pow(r,1.7)),dCum=r=>{let s=0;for(let i=1;i<=r;i++)s+=dNeed(i);return s};
const SM0={atkP:0,def:0,hpP:0,mpP:0,crit:0,spd:0,cdP:0,s1P:0,s1cd:0,s2P:0,s2cd:0,twin:0,starsN:0,volleyN:0,shot2:0,blinkD:0,thornsR:0,spellP:0,regen:0,poison:0,thrallN:0,drainP:0,corpse:0,healP:0,wardP:0,holyP:0,blockP:0};
