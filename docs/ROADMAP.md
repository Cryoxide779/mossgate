# MossGate roadmap

## Regions and level bands
Ashveil Reach has 14 regions. Seven ship now (level cap 35). Each future region raises the cap by 5, up to 70.

| Levels | Region | Status | Region sheet |
|---|---|---|---|
| 1–5 | CrestHollow and the Ash Road | built to sheet: Riversmeet Crossing, Stonefield Plains, Mirefen Wetlands, The High Steps | cresthollow-ash-road.png |
| 5–10 | Whisper Woods | built to sheet: Whisperwood Village, Grove of Whispers, Moonpetal Lake, Thornveil Hollows, Elderwood Sanctuary | whisper-woods.png |
| 10–15 | Stonebridge | built to sheet: Ironvale and the Blackwheel Forges, Granite Peaks, Blackgate Pass, Rivermere Docks, Stonewatch Fort and Eastgate Pass, the Deepcut Quarry | stonebridge.png |
| 15–20 | Misty Fen Lake | built to sheet: Fenwater Port (ferries), Reedshore Village, Glasswater Reef, Serpent Islands and Lighthouse Spire, the Sunken Archive | misty-fen-lake.png |
| 20–25 | Marrowbog | built to sheet: Mudcarver Village, the Grasping Reeds, Fenwatch Outpost, Veilfen Hollows (the Thin Place choice), Rotmire Deep and the Sinking Spire | marrowbog.png |
| 25–30 | Old Watchtower | built, expand to sheet | old-watchtower.png |
| 30–35 | The Sundering Scar (launch endgame) | built, expand to sheet | hollow-scar.png |
| 35–40 | The Golden Plains | future, overview on proposed-regions.png | proposed-regions.png |
| 40–45 | Silverwood Wilds | future, overview on proposed-regions.png | proposed-regions.png |
| 45–50 | The Verdant Coast | future, overview on proposed-regions.png | proposed-regions.png |
| 50–55 | Emerald Isles | future, overview on proposed-regions.png | proposed-regions.png |
| 55–60 | Saltsong Desert | future, overview on proposed-regions.png | proposed-regions.png |
| 60–65 | Frostveil Expanse | future, overview on proposed-regions.png | proposed-regions.png |
| 65–70 | The Shattered Crown | future, overview on proposed-regions.png | proposed-regions.png |

Future region order is a placeholder; full region sheets will replace the overview as they are made.
Master map: `ashveil-reach-continent.png`. (`world-ashveil-reach.png` is an earlier concept and is not used.)

## Main story (one chapter per region)
I Papers That Disagree (CrestHollow) · II The Captain's Daughter (Whisper Woods) · III Concordance Freight (Stonebridge) ·
IV Lanterns in the Fen (Misty Fen Lake) · V Rot at the Root (Marrowbog) · VI The Lit Tower (Old Watchtower) · VII The Third Seal (Sundering Scar).
Epilogue hook for future regions: Ossery Vale, the Concordance Chair.

## Systems
- Level cap 35, then Mastery: experience becomes Mastery points (Might, Vigor, Focus, Fortune, Craft; 50 ranks each).
- Veinway Deep: floor level = floor × 0.7, up to the cap. Floors past the cap get tougher and pay Mastery.
- Roads to future regions are sealed waymarkers in the edge zones.
- Regional materials follow docs/design/material-usage-framework.txt: each built region gathers its own materials, and each region's workshops have a crafted set with a property (js_materials.js).
- Starting kits: Ronin, Shade, Hunter, Mossweaver, Gravecaller, Traveler, Scout, Guard, Aspirant, Gatherer.

## Next
1. Expand each built region to match its sheet. CrestHollow, Whisper Woods, Stonebridge, Misty Fen Lake and Marrowbog done; next Old Watchtower, then the Sundering Scar.
2. Future regions as their sheets are made.
3. Guilds and factions once online play (Firebase) is switched on.
