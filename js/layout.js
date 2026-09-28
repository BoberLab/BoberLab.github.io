// Injects the shared site header (logo, main menu, language + theme controls)
// and footer into every page, so navigation lives in ONE place.
// Each page needs: <body data-page="home|devices|accessories">,
// <div id="site-header"></div> and <div id="site-footer"></div>.
(function () {
    const page = document.body.dataset.page || '';
    const CATEGORIES = ['smartphone', 'minipc', 'tvbox', 'tablet'];

    const cur = key => (page === key ? ' class="active" aria-current="page"' : '');

    const subItems = CATEGORIES.map(type =>
        `<li><a href="devices.html?type=${type}" data-i18n="cat-${type}"></a></li>`
    ).join('');

    const headerHtml = `
    <header class="site-header">
        <div class="container header-inner">
            <a class="brand" href="index.html">
                <img src="assets/logo.svg" alt="" width="44" height="44">
                <span>
                    <span class="brand-name">BoberLab</span>
                    <span class="brand-tag" data-i18n="tagline"></span>
                </span>
            </a>
            <button class="nav-toggle" id="nav-toggle" type="button"
                    aria-expanded="false" aria-controls="main-nav" data-i18n-aria="nav-menu">☰</button>
            <nav class="main-nav" id="main-nav">
                <ul>
                    <li><a href="index.html"${cur('home')} data-i18n="nav-home"></a></li>
                    <li class="has-sub">
                        <a href="devices.html"${cur('devices')} data-i18n="nav-devices"></a>
                        <ul class="sub">${subItems}</ul>
                    </li>
                    <li><a href="accessories.html"${cur('accessories')} data-i18n="nav-accessories"></a></li>
                </ul>
            </nav>
            <div class="nav-controls">
                <div class="lang-btns">
                    <button type="button" data-lang="en" onclick="changeLang('en')">EN</button>
                    <button type="button" data-lang="ru" onclick="changeLang('ru')">RU</button>
                    <button type="button" data-lang="pl" onclick="changeLang('pl')">PL</button>
                </div>
                <button type="button" class="theme-toggle" id="theme-toggle" onclick="toggleTheme()"></button>
            </div>
        </div>
    </header>`;

    const footerHtml = `
    <footer class="site-footer">
        <div class="container">
            <nav class="footer-nav">
                <a href="index.html" data-i18n="nav-home"></a>
                <a href="devices.html" data-i18n="nav-devices"></a>
                <a href="accessories.html" data-i18n="nav-accessories"></a>
            </nav>
            <p data-i18n="footer-project"></p>
            <p data-i18n="footer-disclaimer"></p>
        </div>
    </footer>`;

    const headerEl = document.getElementById('site-header');
    const footerEl = document.getElementById('site-footer');
    if (headerEl) headerEl.outerHTML = headerHtml;
    if (footerEl) footerEl.outerHTML = footerHtml;

    // Mobile menu toggle
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }
})();
