// Accessories page. Products live in data/accessories.json; categories are
// derived from the items themselves, so adding the first "hdmi" item makes the
// "USB-C to HDMI" filter appear automatically.
let accessories = [];
let activeCategory = 'all';

initI18n(() => {
    loadAccessories();
});
document.addEventListener('langchange', renderAccessories);

async function loadAccessories() {
    try {
        const response = await fetch('data/accessories.json');
        const data = await response.json();
        accessories = Array.isArray(data.items) ? data.items : [];
    } catch (err) {
        console.error('Could not load accessories.json:', err);
    }
    renderAccessories();
}

function categoryLabel(cat) {
    return i18next.t('acc-cat-' + cat, cat);
}

function renderAccessories() {
    renderChips();
    renderCards();
}

function renderChips() {
    const wrap = document.getElementById('acc-chips');
    wrap.innerHTML = '';

    const categories = [...new Set(accessories.map(a => a.category))];
    if (categories.length < 2) return; // a single category needs no filter

    [['all', i18next.t('acc-all')], ...categories.map(c => [c, categoryLabel(c)])].forEach(([key, label]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip' + (key === activeCategory ? ' active' : '');
        btn.textContent = label;
        btn.setAttribute('aria-pressed', String(key === activeCategory));
        btn.onclick = () => {
            activeCategory = key;
            renderAccessories();
        };
        wrap.appendChild(btn);
    });
}

function renderCards() {
    const grid = document.getElementById('acc-grid');
    grid.innerHTML = '';

    const items = accessories.filter(a => activeCategory === 'all' || a.category === activeCategory);
    if (items.length === 0) {
        const p = document.createElement('p');
        p.className = 'rank-empty';
        p.textContent = i18next.t('acc-empty');
        grid.appendChild(p);
        return;
    }

    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card acc-card';

        const media = document.createElement('div');
        media.className = 'acc-media';
        if (item.image) {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.loading = 'lazy';
            media.appendChild(img);
        } else {
            media.textContent = '🔌';
            media.setAttribute('aria-hidden', 'true');
        }

        const body = document.createElement('div');
        body.className = 'acc-body';

        const brand = document.createElement('p');
        brand.className = 'acc-brand';
        brand.textContent = `${item.brand || ''} · ${categoryLabel(item.category)}`;

        const title = document.createElement('h3');
        title.textContent = item.name;

        const tags = document.createElement('div');
        tags.className = 'acc-tags';
        (item.tags || []).forEach(t => {
            const s = document.createElement('span');
            s.textContent = t;
            tags.appendChild(s);
        });

        const desc = document.createElement('p');
        desc.className = 'acc-desc';
        desc.textContent = localized(item.description);

        const markets = document.createElement('div');
        markets.className = 'acc-markets';
        const label = document.createElement('span');
        label.className = 'label';
        label.textContent = i18next.t('acc-buy');
        markets.appendChild(label);
        (item.markets || []).forEach(m => {
            const a = document.createElement('a');
            a.className = 'btn small';
            a.href = m.url;
            a.target = '_blank';
            a.rel = 'noopener';
            a.textContent = `${m.name} ↗`;
            markets.appendChild(a);
        });

        body.append(brand, title, tags, desc, markets);
        card.append(media, body);
        grid.appendChild(card);
    });
}
