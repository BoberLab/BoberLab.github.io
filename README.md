# BoberLab.github.io

Main Home Page - https://boberlab.github.io/ 

Smart small home lab devices. Instructions, efficency. 

All devices tested and provided with instruction how to convert device into Smart Home Lab with minimal Power usage.

## Project structure

- `index.html` / `app.js` — main page: intro, type filters, sortable device table.
- `device.html` / `device.js` — per-device page (`device.html?id=<device id>`): rating hexagon, pros/cons, specs, description, install instructions.
- `i18n.js` — shared translations (English/Russian/Polish) and language-switch logic used by both pages.
- `style.css` — shared styles.
- `devices.json` — single source of truth for every device: specs, `ratings` (0–10 per axis), `description`/`pros`/`cons`/`instructions` in `en`/`ru`/`pl`.
- `devices/<id>/img/01.jpg`, `02.jpg`, ... — photos for a device, numbered sequentially starting at `01`. The device page detects how many exist automatically (it just tries loading each number in turn), so add/remove photos without touching any code.

## Adding a language

Add a new key (e.g. `de`) to `i18nResources` in `i18n.js`, a matching language button in `index.html`/`device.html`, and a matching key in each device's `description`/`pros`/`cons`/`instructions.steps` in `devices.json` (falls back to English if missing).


