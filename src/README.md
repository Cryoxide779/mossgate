# MossGate source

The game is built from the files in `px/`. `assemble.py` joins them into one page:

- `mossgate-pixel.html` — the claude.ai artifact version
- `dbgp.html` — a debug copy that exposes `window.__T` for the tests
- `app/www/index.html` and `app/www/version.json` — the web/Android build (copy these into `../www/` to ship)

Build: run `python3 assemble.py` from this folder (it expects `px/` beside it and writes into `app/www/`).
Tests: the Playwright scripts in `tests/` load `dbgp.html` from the folder they run in; copy them next to the build output and run with `node`.
