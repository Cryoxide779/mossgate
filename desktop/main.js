// MossGate desktop: a window around the same game the web and Android versions run.
// Everything is bundled, so it plays fully offline. Saves live in this app's own storage.
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

app.setName('MossGate');
// Many Linux distributions block Chromium's sandbox helper for apps run from a plain folder (as itch and
// Steam do). The game only ever loads its own bundled files, so it runs without that helper on Linux.
if (process.platform === 'linux') app.commandLine.appendSwitch('no-sandbox');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 960,
    minHeight: 540,
    backgroundColor: '#081214',
    autoHideMenuBar: true,
    title: 'MossGate',
    icon: path.join(__dirname, 'app', 'icons', 'icon-512.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.setMenuBarVisibility(false);
  win.removeMenu();
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // F11 and Alt+Enter toggle fullscreen; the in-game fullscreen button works too
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11' || (input.key === 'Enter' && input.alt)) { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
  });
  // links (privacy page, etc.) open in the player's browser, never inside the game window
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); shell.openExternal(url); } });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => app.quit());
