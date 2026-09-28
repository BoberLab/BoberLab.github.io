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
    if (currentDevice) {
        renderBreadcrumb(currentDevice);
        renderLocalizedContent(currentDevice);
        refreshDynamicLabels();
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

async function loadDevice() {
    const id = getDeviceIdFromUrl();
    let devices = [];
    try {
        const response = await fetch('data/devices.json');
        devices = await response.json();
    } catch (err) {
        console.error('Could not load devices.json:', err);
    }
    const device = devices.find(d => d.id === id);

    if (!device) {
        document.getElementById('device-name').textContent = 'Device not found';
        return;
    }

    currentDevice = device;
    document.title = `BoberLab | ${device.name}`;
    document.getElementById('device-name').textContent = device.name;

    renderBreadcrumb(device);
    renderHexagon(device.ratings || {});
    renderLocalizedContent(device);
    renderSpecs(device);
    await renderGallery(device);
}

function renderBreadcrumb(device) {
    const crumbType = document.getElementById('crumb-type');
    crumbType.textContent = i18next.t('cat-' + device.type, device.type);
    crumbType.href = `devices.html?type=${encodeURIComponent(device.type)}`;
    document.getElementById('crumb-name').textContent = device.name;
}

function renderLocalizedContent(device) {
    document.getElementById('description-text').textContent = localized(device.description);

    const prosList = document.getElementById('pros-list');
    prosList.innerHTML = '';
    localizedList(device.pros).forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        prosList.appendChild(li);
    });

    const consList = document.getElementById('cons-list');
    consList.innerHTML = '';
    localizedList(device.cons).forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        consList.appendChild(li);
    });

    const stepsEl = document.getElementById('instructions-steps');
    stepsEl.innerHTML = '';
    const steps = device.instructions ? localizedList(device.instructions.steps) : [];
    steps.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
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
        `<tr><td data-i18n="${key}">${i18next.t(key)}</td><td>${val}</td></tr>`
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
        t.alt = `${device.name} ${idx + 1}`;
        t.loading = 'lazy';
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
// Colors come from CSS classes (.hex-grid / .hex-label / .hex-area), so the
// chart follows the light/dark theme automatically.
function renderHexagon(ratings) {
    const size = 280;
    const cx = size / 2, cy = size / 2, r = 100;
    const n = AXES.length;
    const angleFor = i => -Math.PI / 2 + i * (2 * Math.PI / n);

    const point = (i, radius) => {
        const a = angleFor(i);
        return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
    };

    // Grid rings at 25/50/75/100%
    let gridPolys = '';
    [0.25, 0.5, 0.75, 1].forEach(frac => {
        const pts = AXES.map((_, i) => point(i, r * frac).join(',')).join(' ');
        gridPolys += `<polygon class="hex-grid" points="${pts}"/>`;
    });

    // Axis spokes + labels
    let spokes = '';
    let labels = '';
    AXES.forEach((axis, i) => {
        const [x, y] = point(i, r);
        spokes += `<line class="hex-grid" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"/>`;
        const [lx, ly] = point(i, r + 26);
        labels += `<text class="hex-label" x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" data-axis-label="${axis}">${i18next.t('axis-' + axis)}</text>`;
    });

    // Value polygon
    const valuePts = AXES.map((axis, i) => {
        const val = Math.max(0, Math.min(10, ratings[axis] || 0));
        const [x, y] = point(i, r * (val / 10));
        return `${x},${y}`;
    }).join(' ');

    document.getElementById('hexagon-wrap').innerHTML = `
    <svg viewBox="0 0 ${size} ${size}" width="100%" role="img" aria-label="${i18next.t('section-rating')}">
        ${gridPolys}
        ${spokes}
        <polygon class="hex-area" points="${valuePts}"/>
        ${labels}
    </svg>`;
}

// Labels generated by JS (spec rows, chart axes) aren't covered by the static
// data-i18n pass, so refresh them after a language change.
function refreshDynamicLabels() {
    document.querySelectorAll('#specs-table td[data-i18n]').forEach(td => {
        td.textContent = i18next.t(td.dataset.i18n);
    });
    document.querySelectorAll('[data-axis-label]').forEach(el => {
        el.textContent = i18next.t('axis-' + el.dataset.axisLabel);
    });
}
