let devicesData = [];
let activeFilters = [];
let allTypes = [];
let currentSort = { column: 'benchmark', direction: 'desc' };

initI18n(() => {
    loadDevices();
});
document.addEventListener('langchange', updateStaticUI);

async function loadDevices() {
    const response = await fetch('devices.json');
    devicesData = await response.json();
    // Build the type-filter list dynamically from whatever types are present
    // in devices.json, so adding e.g. "laptop" devices later needs no HTML edits.
    allTypes = [...new Set(devicesData.map(d => d.type))];
    activeFilters = [...allTypes];
    buildFilters();
    updateStaticUI();
    renderTable();
}

function buildFilters() {
    const wrap = document.getElementById('filters');
    wrap.innerHTML = '';
    allTypes.forEach(type => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.onchange = () => toggleFilter(type);
        const span = document.createElement('span');
        span.dataset.typeLabel = type;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' '));
        label.appendChild(span);
        wrap.appendChild(label);
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

function updateStaticUI() {
    document.getElementById('site-title').innerText = i18next.t('site-title');
    document.getElementById('main-title').innerText = i18next.t('nav-all');
    document.getElementById('intro-title').innerText = i18next.t('intro-title');
    document.getElementById('intro-text').innerText = i18next.t('intro-text');
    document.getElementById('filters-label').innerText = i18next.t('filters-label');
    document.getElementById('th-device').innerText = i18next.t('th-device');
    document.getElementById('th-cores').innerText = i18next.t('th-cores');
    document.getElementById('th-tdp').innerText = i18next.t('th-tdp');
    document.getElementById('th-nm').innerText = i18next.t('th-nm');
    document.getElementById('th-ram').innerText = i18next.t('th-ram');
    document.getElementById('th-rom').innerText = i18next.t('th-rom');
    document.getElementById('th-os').innerText = i18next.t('th-os');
    document.getElementById('th-power-orig').innerText = i18next.t('th-power-orig');
    document.getElementById('th-power-new').innerText = i18next.t('th-power-new');
    document.getElementById('th-antu').innerText = i18next.t('th-antu');
    document.getElementById('th-score').innerText = i18next.t('th-score');
    document.getElementById('th-sysbench').innerText = i18next.t('th-sysbench');
    document.getElementById('th-ebay').innerText = i18next.t('th-ebay');
    document.getElementById('footer-project').innerText = i18next.t('footer-project');
    document.getElementById('footer-disclaimer').innerText = i18next.t('footer-disclaimer');
    document.querySelectorAll('#filters span[data-type-label]').forEach(span => {
        span.innerText = typeLabel(span.dataset.typeLabel);
    });
}
