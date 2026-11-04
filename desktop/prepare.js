// Copies the game from ../www into ./app for the desktop build:
// - the Silkscreen font is bundled instead of loaded from Google Fonts (works offline)
// - the browser-only service worker and web manifest are removed
const fs = require('fs');
const path = require('path');
const www = path.join(__dirname, '..', 'www');
const out = path.join(__dirname, 'app');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'icons'), { recursive: true });
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });

let html = fs.readFileSync(path.join(www, 'index.html'), 'utf8');
const swBefore = html.length;
html = html.replace(/if\('serviceWorker' in navigator[\s\S]*?(?=<\/script>)/, '');
if (html.length === swBefore) throw new Error('service worker registration not found');
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '');
html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com">', '');
const fontLink = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap">';
if (!html.includes(fontLink)) throw new Error('font link not found');
html = html.replace(fontLink, "<style>@font-face{font-family:'Silkscreen';font-style:normal;font-weight:400;font-display:block;src:url(fonts/silkscreen-400.woff2) format('woff2')}</style>");
fs.writeFileSync(path.join(out, 'index.html'), html);

const fontDir = path.join(__dirname, 'node_modules', '@fontsource', 'silkscreen', 'files');
const font = fs.readdirSync(fontDir).find(f => /latin-400-normal\.woff2$/.test(f) && !/ext/.test(f));
if (!font) throw new Error('Silkscreen font not found in ' + fontDir);
fs.copyFileSync(path.join(fontDir, font), path.join(out, 'fonts', 'silkscreen-400.woff2'));

for (const f of fs.readdirSync(path.join(www, 'icons'))) fs.copyFileSync(path.join(www, 'icons', f), path.join(out, 'icons', f));
fs.mkdirSync(path.join(__dirname, 'build'), { recursive: true });
fs.copyFileSync(path.join(www, 'icons', 'icon-512.png'), path.join(__dirname, 'build', 'icon.png'));
console.log('prepared desktop app:', Math.round(html.length / 1024), 'KB game, font', font);
