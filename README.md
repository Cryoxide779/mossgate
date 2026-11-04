# MossGate: Android and Play Store setup

This repository holds everything needed to publish MossGate on Google Play and keep updating it.

- `www/` is the game itself. It is published to GitHub Pages, and the Android app loads it from there.
  Push a new `www/index.html` and every player gets the update the next time they open the app,
  with no new Play Store release. It also works offline after the first launch.
- `.github/workflows/` builds everything for you on GitHub. You never need Android Studio.
- `assets/` holds the app icon and splash screen. `store/` holds the Play Store graphics and text.

## One-time setup

### 1. Create the repository
1. On GitHub, create a new **public** repository named **`mossgate`** under your account (Cryoxide779).
   It must be public for free GitHub Pages hosting.
2. Upload every file and folder from this package, including the hidden `.github` folder,
   to the `main` branch. (On the repository page: **Add file → Upload files**, then drag the whole
   folder contents in.)

If you use a different repository name, change the `url` in `capacitor.config.json` to match
`https://cryoxide779.github.io/<repo-name>/`.

### 2. Turn on hosting
1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Actions → Publish game update → Run workflow.**
3. After about a minute the game is live at **https://cryoxide779.github.io/mossgate/**.
   Open it on your phone to check it.

### 3. Fill in your contact address
Open `www/privacy.html` and replace both `CONTACT_EMAIL` entries with the address players and
Google should use to reach you. Commit the change. The privacy policy is then live at
**https://cryoxide779.github.io/mossgate/privacy.html**, which is the address the Play Console asks for.

### 4. Create your upload key (once)
1. **Actions → Create upload key (run once) → Run workflow.**
2. Open the finished run and download the **upload-key-KEEP-PRIVATE** artifact.
3. In **Settings → Secrets and variables → Actions → New repository secret**, add:
   - `ANDROID_KEYSTORE_BASE64`: the contents of `ANDROID_KEYSTORE_BASE64.txt`
   - `ANDROID_KEYSTORE_PASSWORD`: the contents of `ANDROID_KEYSTORE_PASSWORD.txt`
4. Store `upload.keystore` and the password somewhere private and safe, then delete the run's artifact.

Google Play App Signing holds the real signing key, so if this upload key is ever lost
Google can reset it. It is still much easier to keep it safe.

### 5. Build the app
**Actions → Build Android app → Run workflow.** When it finishes, the run has two downloads:
- **mossgate-test-apk**: install this on your phone to try the app right away.
- **mossgate-play-store-aab**: the signed bundle you upload to the Play Console.

## Google Play Console

1. Create the developer account (one-time $25 fee plus identity verification).
2. **Create app**: name *MossGate*, Game, Free.
3. **Store listing**: use the text in `store/STORE_LISTING.md`, the icon `store/icon-512.png`,
   the feature graphic `store/feature-graphic.png` and the screenshots in `store/screenshots/`.
4. **App content**: privacy policy URL from step 3. Data safety: *no data collected or shared* (while online play is off).
   Content rating questionnaire: fantasy violence, no blood, no user interaction or chat.
   Ads: none. Target audience: 13 and older.
5. **Testing → Closed testing**: create a track, upload the `.aab`, and add at least
   **12 testers** by email (a Google Group works well). They must stay opted in for
   **14 days in a row**. Google requires this for new personal developer accounts.
6. After the 14 days, apply for **Production access** from the dashboard, then release.

## Updating the game

- **Content updates** (new zones, quests, fixes, art): replace `www/index.html` and push.
  "Publish game update" runs by itself and players get it on their next launch.
- **App updates** (new icon, name or Android settings): bump `"version"` in `package.json`,
  run **Build Android app**, and upload the new `.aab` to the Play Console.

## Moving a save between devices
In the game, open the **menu (☰) → Export save → Copy save code**, then on the other device use
**Import a save** on the title screen and paste the code.

## Online play
The game is multiplayer: every zone is shared, so players see each other, fight the same creatures,
share kill credit and quest progress, revive each other and use quick chat. The Veinway Deep can be
played on open floors (others can join) or as a private solo descent.

Outside claude.ai (GitHub Pages and the Android app) the online layer runs on **Firebase**
(project `mossgate-a3b56`): anonymous sign-in plus the Realtime Database.
**It is currently switched off** (`ONLINE=false` in that script), so the app collects nothing.
To launch it: do the setup below, set `ONLINE=true`, update the privacy policy, and switch the
Play data safety and content rating answers to the ones listed here. The connection code is the
"MossGate online play" script near the top of `www/index.html`. If Firebase can't be reached the game
simply plays offline.

### One-time Firebase setup
1. Firebase console → **Build → Authentication → Get started → Sign-in method → Anonymous → Enable**.
2. **Build → Realtime Database → Create database**, location **United States (us-central1)**,
   start in **locked mode**. (Another location changes the `databaseURL` in that script.)
3. Realtime Database → **Rules** tab: replace everything with the contents of
   `firebase/database.rules.json` and **Publish**.

### Play data safety answers (only once online play is on)
- Data collected: **Yes**. Shared with third parties: **No** (Firebase is a service provider).
- **Personal info → Name**? No. **App activity → Other user-generated content**: Yes (character name),
  collected, not shared, required for online play, purpose *App functionality*.
- **Device or other IDs**: Yes (anonymous Firebase ID), purpose *App functionality*.
- Data is encrypted in transit: **Yes**. Users can request deletion: **Yes** (contact email).

## itch.io and desktop

- **itch.io (browser):** every "Publish game update" run also produces an **mossgate-itch** artifact.
  Download it and upload the zip inside to itch.io, ticked "played in the browser".
  Page text, settings and images are in `itch/` (`ITCH_PAGE.md` and `itch/media/`).
- **Desktop (Windows, macOS, Linux):** **Actions → Build desktop app → Run workflow.** When it finishes,
  download **MossGate-windows**, **MossGate-mac** and **MossGate-linux**. Each holds a zip ready for
  itch.io (tick the matching platform) or for a Steam depot.
- The macOS build is not notarized, so the first launch needs right-click → Open. Notarizing needs a paid
  Apple developer account and can be added to the workflow later.
