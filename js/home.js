// Home page: category cards (with device counts) + sidebar rankings.
// Rankings are curated by hand in data/rankings.json as lists of device ids.
const CATEGORY_ICONS = { smartphone: '📱', minipc: '🖥️', tvbox: '📺', tablet: '🗒️' };
const CATEGORY_ORDER = ['smartphone', 'minipc', 'tvbox', 'tablet'];
const RANKING_KEYS = ['popular', 'powerful', 'stable', 'controllable'];
const MAX_RANKING_ITEMS = 5;

let devices = [];
let rankings = {};

initI18n(() => {
    loadHome();
});
document.addEventListener('langchange', renderHome);

async function loadHome() {
    try {
        const [devRes, rankRes] = await Promise.all([
            fetch('data/devices.json'),
            fetch('data/rankings.json')
        ]);
        devices = await devRes.json();
        rankings = rankRes.ok ? await rankRes.json() : {};
    } catch (err) {
        console.error('Could not load home page data:', err);
    }
    renderHome();
}

function renderHome() {
    renderCategories();
    renderMiniTable();
    renderRankings();
}

function renderCategories() {
    const grid = document.getElementById('cat-grid');
    grid.innerHTML = '';
    CATEGORY_ORDER.forEach(type => {
        const count = devices.filter(d => d.type === type).length;
        const a = document.createElement('a');
        a.className = 'card cat-card';
        a.href = `devices.html?type=${type}`;

        const icon = document.createElement('span');
        icon.className = 'cat-icon';
        icon.textContent = CATEGORY_ICONS[type];
        icon.setAttribute('aria-hidden', 'true');

        const name = document.createElement('span');
        name.className = 'cat-name';
        name.textContent = i18next.t('cat-' + type);

        const countEl = document.createElement('span');
        countEl.className = 'cat-count';
        countEl.textContent = i18next.t('count-label', { n: count });

        a.append(icon, name, countEl);
        grid.appendChild(a);
    });
}

// Shortened device list on the homepage: just enough to compare at a glance
// (full specs and filtering live on the Devices page).
function renderMiniTable() {
    const tbody = document.getElementById('home-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    devices.forEach(d => {
        const tr = document.createElement('tr');
        tr.className = `row-${d.type}`;

        const ramString = d.ram ? `${d.ram}GB ${d.ramtype || ''}`.trim() : '-';
        const romString = d.rom ? `${d.rom}GB ${d.romtype || ''}`.trim() : '-';
        const newPowerIdle = Math.max(0, d.powerW - 3);
        const newPowerMax = Math.max(0, d.powerMax - 3);

        tr.innerHTML = `
            <td><a class="device-link" href="device.html?id=${encodeURIComponent(d.id)}">${d.name}</a></td>
            <td>${d.cores}</td>
            <td>${ramString}</td>
            <td>${romString}</td>
            <td>${newPowerIdle}W / ${newPowerMax}W</td>
            <td>${d.sysbench || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderRankings() {
    RANKING_KEYS.forEach(key => {
        const list = document.getElementById('rank-' + key);
        if (!list) return;
        list.innerHTML = '';

        const ids = Array.isArray(rankings[key]) ? rankings[key] : [];
        const items = ids
            .map(id => devices.find(d => d.id === id))
            .filter(Boolean)
            .slice(0, MAX_RANKING_ITEMS);

        if (items.length === 0) {
            // Swap the <ol> for an empty-state message
            const li = document.createElement('li');
            li.className = 'rank-empty';
            li.style.listStyle = 'none';
            li.style.marginLeft = '-22px';
            li.textContent = i18next.t('rank-empty');
            list.appendChild(li);
            return;
        }

        items.forEach(d => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `device.html?id=${encodeURIComponent(d.id)}`;
            a.textContent = d.name;
            const small = document.createElement('small');
            small.textContent = i18next.t('cat-' + d.type, d.type);
            li.append(a, small);
            list.appendChild(li);
        });
    });
}
