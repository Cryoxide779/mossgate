"""Builds the itch.io upload from www/: a zip with index.html at its root.
The itch build drops the offline service worker (itch serves each upload from its own
folder and caches it itself) and keeps the icons for the page."""
import os, re, zipfile, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
www = os.path.join(root, 'www')
out = os.path.join(root, 'dist'); os.makedirs(out, exist_ok=True)
html = open(os.path.join(www, 'index.html'), encoding='utf-8').read()
sw = re.compile(r"if\('serviceWorker' in navigator.*?(?=</script>)", re.S)
html, n = sw.subn("", html)
if n != 1: sys.exit('service worker registration not found exactly once (%d)' % n)
html = html.replace('<link rel="manifest" href="manifest.webmanifest">', '')
z = os.path.join(out, 'mossgate-itch.zip')
with zipfile.ZipFile(z, 'w', zipfile.ZIP_DEFLATED) as f:
    f.writestr('index.html', html)
    for name in os.listdir(os.path.join(www, 'icons')):
        f.write(os.path.join(www, 'icons', name), 'icons/' + name)
print(z, os.path.getsize(z), 'bytes')
