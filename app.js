const resources = {
  en: {
    translation: {
      "title": "BoberLab: Device Benchmark Dashboard",
      "th-device": "Device",
      "th-cores": "Cores/Threads",
      "th-tdp": "CPU TDP",
      "th-nm": "Process (nm)",
      "th-ram": "RAM",
      "th-rom": "ROM",
      "th-os": "OS (Orig / New)",
      "th-power-orig": "Orig OS Power (Idle/Max)",
      "th-power-new": "New OS Power (Idle/Max)",
      "th-antu": "Antutu",
      "th-score": "Cinebench Score",
      "th-sysbench": "Sysbench"
    }
  },
  ru: {
    translation: {
      "title": "BoberLab: Сравнение устройств",
      "th-device": "Устройство",
      "th-cores": "Ядра/Потоки",
      "th-tdp": "TDP (Вт)",
      "th-nm": "Техпроцесс (нм)",
      "th-ram": "ОЗУ",
      "th-rom": "ПЗУ",
      "th-os": "ОС (Завод / Новая)",
      "th-power-orig": "Ориг. ОС Ватт (Простой/Макс)",
      "th-power-new": "Новая ОС Ватт (Простой/Макс)",
      "th-antu": "Antutu",
      "th-score": "Cinebench R15 Multi",
      "th-sysbench": "Sysbench"
    }
  }
};

let devicesData = [];
let activeFilters = ['smartphone', 'minipc', 'tvbox', 'tablet'];
let currentSort = { column: 'benchmark', direction: 'desc' };

i18next.init({ lng: 'ru', resources }, (err, t) => {
    updateUI();
    loadDevices();
});

async function loadDevices() {
    const response = await fetch('devices.json');
    devicesData = await response.json();
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    let filtered = devicesData.filter(d => activeFilters.includes(d.type));
    
    // Продвинутая сортировка, умеет сортировать ядра "8/16" как число 8
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
            <td><b>${d.name}</b><br><small>${d.cpu}</small></td>
            <td><b>${d.cores}</b></td>
            <td>${d['core-tdp'] ? d['core-tdp'] + 'W' : '-'}</td>
            <td>${d.nm ? d.nm + 'nm' : '-'}</td>
            <td>${ramString}</td>
            <td>${romString}</td>
            <td>${d.os} ➔ <b>${d.newos}</b></td>
            <td>${d.powerW}W / ${d.powerMax}W</td>
            <td><b>${newPowerIdle}W / ${newPowerMax}W</b></td>
            <td><b>${d.antu || '-'}</b></td>
            <td>${d.benchmark}</td>
            <td><b>${d.sysbench || '-'}</b></td>
            <td><a class="buy-btn" href="${d.ebay}" target="_blank">↗</a></td>
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

function updateUI() {
    document.getElementById('main-title').innerText = i18next.t('title');
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
}

function changeLang(l) { i18next.changeLanguage(l, updateUI); }

// 1. Get the browser's language (e.g., "en-US", "ru-RU")
const browserLang = navigator.language || navigator.userLanguage;

// 2. Extract just the 2-letter code (e.g., "en", "ru")
const shortLang = browserLang.split('-')[0];

// 3. Define the languages your app actually supports
const supportedLangs = ['en', 'ru'];

// 4. Check if the browser language is supported; if not, fallback to 'en'
const defaultLang = supportedLangs.includes(shortLang) ? shortLang : 'en';

// 5. Initialize i18next with the detected language
i18next.init({ lng: defaultLang, resources }, (err, t) => {
    updateUI();
    loadDevices();
});