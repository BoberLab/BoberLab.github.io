# BoberLab.github.io

Main Home Page - https://boberlab.github.io/

Smart small home lab devices. Instructions, efficiency.

All devices tested and provided with instructions on how to convert a device into a Smart Home Lab with minimal power usage.

## Project structure

```
/
├─ index.html          Home: hero, category cards, sidebar rankings
├─ devices.html        Device table (filters, sorting, ?type=smartphone|minipc|tvbox|tablet)
├─ device.html         Single device page (?id=<device id>)
├─ accessories.html    Accessories with marketplace links
├─ assets/
│  └─ logo.svg         Beaver logo (also the favicon)
├─ css/style.css       All styles, light + dark theme variables
├─ js/
│  ├─ i18n.js          Translations (en/ru/pl), language + theme logic
│  ├─ layout.js        Shared header / menu / footer (edit the menu HERE only)
│  ├─ home.js  devices.js  device.js  accessories.js   One script per page
├─ data/
│  ├─ devices.json     Every device: specs, ratings, description/pros/cons/instructions (en/ru/pl)
│  ├─ rankings.json    Sidebar lists on the home page (device ids)
│  └─ accessories.json Accessories + marketplace links
└─ devices/<id>/img/01.jpg, 02.jpg, ...   Device photos (numbered from 01, detected automatically)
```

## Everyday tasks

- **Sidebar rankings:** edit `data/rankings.json`. Each list (`popular`, `powerful`, `stable`, `controllable`) holds device ids in order, e.g. `"powerful": ["oneplus8pro", "intel_n100"]`. Top 5 are shown; unknown ids are skipped; an empty list shows "Coming soon".
- **New accessory:** add an object to `data/accessories.json` (`category` is `hub` or `hdmi`; a category filter appears automatically once two categories exist). Optional `image` path, e.g. `assets/accessories/ugreen-15534.jpg`.
- **New device:** add an entry to `data/devices.json` and put photos in `devices/<id>/img/`.
- **New language:** add a key (e.g. `de`) to `i18nResources` in `js/i18n.js`, a button in `js/layout.js`, and a matching key in the `description`/`pros`/`cons`/`instructions.steps` fields (falls back to English if missing).
- **Local preview:** the site uses `fetch()`, so open it through a server, not by double-clicking: `python3 -m http.server 8080`.
