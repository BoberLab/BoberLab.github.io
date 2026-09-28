let devicesData = [];
let activeFilters = [];
let allTypes = [];
let currentSort = { column: 'benchmark', direction: 'desc' };

initI18n(() => {
    loadDevices();
});
document.addEventListener('langchange', () => {
    updateHeading();
    updateFilterLabels();
});

async function loadDevices() {
    const response = await fetch('data/devices.json');
    devicesData = await response.json();

    // Filter list is built from whatever types exist in devices.json, so
    // adding e.g. "laptop" devices later needs no HTML edits.
    allTypes = [...new Set(devicesData.map(d => d.type))];

    // ?type=minipc (from the menu / breadcrumbs) pre-selects one category.
    const requested = new URLSearchParams(window.location.search).get('type');
    activeFilters = allTypes.includes(requested) ? [requested] : [...allTypes];

    buildFilters();
    updateHeading();
    updateFilterLabels();
    makeHeadersKeyboardAccessible();
    renderTable();
}

function updateHeading() {
    const requested = new URLSearchParams(window.location.search).get('type');
    const h1 = document.getElementById('page-heading');
    h1.textContent = allTypes.includes(requested)
        ? i18next.t('cat-' + requested, requested)
        : i18next.t('devices-title');
}

function buildFilters() {
    const wrap = document.getElementById('filters');
    wrap.innerHTML = '';
    allTypes.forEach(type => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = activeFilters.includes(type);
        checkbox.onchange = () => toggleFilter(type);
        const span = document.createElement('span');
        span.dataset.typeLabel = type;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' '));
        label.appendChild(span);
        wrap.appendChild(label);
    });
}

function updateFilterLabels() {
    document.querySelectorAll('#filters span[data-type-label]').forEach(span => {
        span.textContent = i18next.t('cat-' + span.dataset.typeLabel, span.dataset.typeLabel);
    });
}

// Sortable headers use onclick in the HTML; make them reachable by keyboard too.
function makeHeadersKeyboardAccessible() {
    document.querySelectorAll('th[onclick]').forEach(th => {
        th.tabIndex = 0;
        th.setAttribute('role', 'button');
        th.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                th.click();
            }
        });
    });
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    let filtered = devicesData.filter(d => activeFilters.includes(d.type));

    // Sorts "8/16" cores as the numeric core count.
    filtered.sort((a, b) => {
        let valA = a[currentSort.column];
        let valB = b[currentSort.column];

        if (currentSort.column === 'cores') {
            valA = parseInt(valA.split('/')[0]) || 0;
            valB = parseInt(valB.split('/')[0]) || 0;
        }

        return currentSort.direction === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    filtered.forEach(d => {
        const tr = document.createElement('tr');
        tr.className = `row-${d.type}`;

        const newPowerIdle = Math.max(0, d.powerW - 3);
        const newPowerMax = Math.max(0, d.powerMax - 3);
        const ramString = d.ram ? `${d.ram}GB ${d.ramtype}` : '-';
        const romString = d.rom ? `${d.rom}GB ${d.romtype}` : '-';

        tr.innerHTML = `
            <td><a class="device-link" href="device.html?id=${encodeURIComponent(d.id)}">${d.name}</a><br><small>${d.cpu}</small></td>
            <td class="col-cores"><b>${d.cores}</b></td>
            <td class="col-tdp">${d['core-tdp'] ? d['core-tdp'] + 'W' : '-'}</td>
            <td class="col-nm">${d.nm ? d.nm + 'nm' : '-'}</td>
            <td>${ramString}</td>
            <td>${romString}</td>
            <td>${d.os} ➔ <b>${d.newos}</b></td>
            <td class="col-power">${d.powerW}W / ${d.powerMax}W</td>
            <td class="col-power"><b>${newPowerIdle}W / ${newPowerMax}W</b></td>
            <td><b>${d.antu || '-'}</b></td>
            <td>${d.benchmark}</td>
            <td><b>${d.sysbench || '-'}</b></td>
            <td><a class="buy-btn" href="${d.ebay}" target="_blank" rel="noopener">↗</a></td>
        `;
        tbody.appendChild(tr);
    });
}

function sortTable(col) {
    if (currentSort.column === col) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = col;
        currentSort.direction = 'desc';
    }
    renderTable();
}

function toggleFilter(type) {
    if (activeFilters.includes(type)) {
        activeFilters = activeFilters.filter(t => t !== type);
    } else {
        activeFilters.push(type);
    }
    renderTable();
}
