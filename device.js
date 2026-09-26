let currentDevice = null;
let galleryImages = [];

const AXES = ['os', 'wifi', 'battery', 'usb', 'price', 'performance'];
const MAX_GALLERY_IMAGES = 30;

function getDeviceIdFromUrl() {
    return new URLSearchParams(window.location.search).get('id');
}

initI18n(() => {
    loadDevice();
});
document.addEventListener('langchange', () => {
    if (currentDevice) renderLocalizedContent(currentDevice);
    updateStaticUI();
});

async function loadDevice() {
    const id = getDeviceIdFromUrl();
    const response = await fetch('devices.json');
    const devices = await response.json();
    const device = devices.find(d => d.id === id);

    if (!device) {
        document.getElementById('device-name').innerText = 'Device not found';
        updateStaticUI();
        return;
    }

    currentDevice = device;
    document.getElementById('page-title').innerText = `BoberLab | ${device.name}`;
    document.getElementById('device-name').innerText = device.name;

    updateStaticUI();
    renderBreadcrumb(device);
    renderHexagon(device.ratings || {});
    renderLocalizedContent(device);
    renderSpecs(device);
    await renderGallery(device);
}

function renderBreadcrumb(device) {
    const crumbType = document.getElementById('crumb-type');
    crumbType.innerText = typeLabel(device.type);
    crumbType.href = `index.html?type=${encodeURIComponent(device.type)}`;
    document.getElementById('crumb-name').innerText = device.name;
}

function renderLocalizedContent(device) {
    document.getElementById('description-text').innerText = localized(device.description);

    const prosList = document.getElementById('pros-list');
    prosList.innerHTML = '';
    localizedList(device.pros).forEach(text => {
        const li = document.createElement('li');
        li.innerText = text;
        prosList.appendChild(li);
    });

    const consList = document.getElementById('cons-list');
    consList.innerHTML = '';
    localizedList(device.cons).forEach(text => {
        const li = document.createElement('li');
        li.innerText = text;
        consList.appendChild(li);
    });

    const stepsEl = document.getElementById('instructions-steps');
    stepsEl.innerHTML = '';
    const steps = device.instructions ? localizedList(device.instructions.steps) : [];
    steps.forEach(text => {
        const li = document.createElement('li');
        li.innerText = text;
        stepsEl.appendChild(li);
    });

    const videoWrap = document.getElementById('instructions-video');
    const yt = device.instructions && device.instructions.youtube;
    if (yt) {
        const videoId = extractYoutubeId(yt);
        videoWrap.style.display = 'block';
        videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" title="${device.name}" allowfullscreen></iframe>`;
    } else {
        videoWrap.style.display = 'none';
        videoWrap.innerHTML = '';
    }
}

function extractYoutubeId(urlOrId) {
    const match = urlOrId.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : urlOrId;
}

function renderSpecs(d) {
    const rows = [
        ['th-cores', d.cores],
        ['th-tdp', d['core-tdp'] ? d['core-tdp'] + 'W' : '-'],
        ['th-nm', d.nm ? d.nm + 'nm' : '-'],
        ['th-ram', d.ram ? `${d.ram}GB ${d.ramtype || ''}`.trim() : '-'],
        ['th-rom', d.rom ? `${d.rom}GB ${d.romtype || ''}`.trim() : '-'],
        ['th-os', `${d.os} ➔ ${d.newos}`],
        ['th-power-orig', `${d.powerW}W / ${d.powerMax}W`],
        ['th-power-new', `${Math.max(0, d.powerW - 3)}W / ${Math.max(0, d.powerMax - 3)}W`],
        ['th-antu', d.antu || '-'],
        ['th-score', d.benchmark],
        ['th-sysbench', d.sysbench || '-'],
        ['th-ebay', `<a class="buy-btn" href="${d.ebay}" target="_blank" rel="noopener">${d.ebay}</a>`],
    ];
    const table = document.getElementById('specs-table');
    table.innerHTML = rows.map(([key, val]) =>
        `<tr><td data-i18n-key="${key}">${i18next.t(key)}</td><td>${val}</td></tr>`
    ).join('');
}

// --- Image gallery -------------------------------------------------------
// GitHub Pages serves static files with no directory listing, so we can't
// ask the server "how many images exist". Instead we probe 01.jpg, 02.jpg, ...
// sequentially and stop at the first one that fails to load.
function probeImage(src) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
}

async function renderGallery(device) {
    const base = `devices/${device.id}/img/`;
    galleryImages = [];
    for (let i = 1; i <= MAX_GALLERY_IMAGES; i++) {
        const num = String(i).padStart(2, '0');
        const src = `${base}${num}.jpg`;
        const ok = await probeImage(src);
        if (!ok) break;
        galleryImages.push(src);
    }

    const mainImg = document.getElementById('gallery-main-img');
    const emptyEl = document.getElementById('gallery-empty');
    const thumbs = document.getElementById('gallery-thumbs');
    thumbs.innerHTML = '';

    if (galleryImages.length === 0) {
        mainImg.style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }

    emptyEl.style.display = 'none';
    mainImg.style.display = 'block';
    showMainImage(0);

    galleryImages.forEach((src, idx) => {
        const t = document.createElement('img');
        t.src = src;
        t.className = idx === 0 ? 'active' : '';
        t.onclick = () => showMainImage(idx);
        thumbs.appendChild(t);
    });
}

function showMainImage(idx) {
    const mainImg = document.getElementById('gallery-main-img');
    mainImg.src = galleryImages[idx];
    mainImg.alt = currentDevice ? currentDevice.name : '';
    mainImg.onclick = () => openLightbox(galleryImages[idx]);
    document.querySelectorAll('.gallery-thumbs img').forEach((t, i) => {
        t.classList.toggle('active', i === idx);
    });
}

function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}

// --- Hexagon rating chart ------------------------------------------------
function renderHexagon(ratings) {
    const size = 280;
    const cx = size / 2, cy = size / 2, r = 100;
    const n = AXES.length;
    const angleFor = i => -Math.PI / 2 + i * (2 * Math.PI / n);

    const point = (value, radius) => {
        const a = angleFor(value);
        return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
    };

    // Grid rings at 25/50/75/100%
    let gridPolys = '';
    [0.25, 0.5, 0.75, 1].forEach(frac => {
        const pts = AXES.map((_, i) => point(i, r * frac).join(',')).join(' ');
        gridPolys += `<polygon points="${pts}" fill="none" stroke="#d0d7de" stroke-width="1"/>`;
    });

    // Axis spokes + labels
    let spokes = '';
    let labels = '';
    AXES.forEach((axis, i) => {
        const [x, y] = point(i, r);
        spokes += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#d0d7de" stroke-width="1"/>`;
        const [lx, ly] = point(i, r + 26);
        labels += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="#57606a" data-axis-label="${axis}">${i18next.t('axis-' + axis)}</text>`;
    });

    // Value polygon
    const valuePts = AXES.map((axis, i) => {
        const val = Math.max(0, Math.min(10, ratings[axis] || 0));
        const [x, y] = point(i, r * (val / 10));
        return `${x},${y}`;
    }).join(' ');

    const svg = `
    <svg viewBox="0 0 ${size} ${size}" width="100%" height="auto">
        ${gridPolys}
        ${spokes}
        <polygon points="${valuePts}" fill="#0969da33" stroke="#0969da" stroke-width="2"/>
        ${labels}
    </svg>`;
    document.getElementById('hexagon-wrap').innerHTML = svg;
}

function updateStaticUI() {
    document.getElementById('site-title').innerText = i18next.t('site-title');
    document.getElementById('crumb-all').innerText = i18next.t('breadcrumb-all');
    document.getElementById('rating-title').innerText = i18next.t('section-rating');
    document.getElementById('pros-title').innerText = i18next.t('section-pros');
    document.getElementById('cons-title').innerText = i18next.t('section-cons');
    document.getElementById('specs-title').innerText = i18next.t('section-specs');
    document.getElementById('description-title').innerText = i18next.t('section-description');
    document.getElementById('instructions-title').innerText = i18next.t('section-instructions');
    document.getElementById('gallery-empty').innerText = i18next.t('gallery-empty');
    document.getElementById('back-link').innerText = i18next.t('back-link');
    document.getElementById('footer-project').innerText = i18next.t('footer-project');
    document.getElementById('footer-disclaimer').innerText = i18next.t('footer-disclaimer');

    if (currentDevice) {
        renderBreadcrumb(currentDevice);
        document.querySelectorAll('#specs-table td[data-i18n-key]').forEach(td => {
            td.innerText = i18next.t(td.dataset.i18nKey);
        });
        document.querySelectorAll('[data-axis-label]').forEach(el => {
            el.textContent = i18next.t('axis-' + el.dataset.axisLabel);
        });
    }
}
