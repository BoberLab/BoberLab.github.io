// Shared translations + i18next bootstrap for all BoberLab pages.
// Supported UI languages: en (default/fallback), ru, pl.
const i18nResources = {
  en: {
    translation: {
      "site-title": "BoberLab",
      "nav-home": "Home",
      "nav-devices": "Devices",
      "nav-accessories": "Accessories",
      "nav-menu": "Menu",
      "tagline": "Old devices → home servers",
      "cat-smartphone": "Phones",
      "cat-minipc": "Mini PCs",
      "cat-tvbox": "TV Boxes",
      "cat-tablet": "Tablets",
      "cat-laptop": "Laptops",
      "cta-devices": "Browse devices",
      "cta-accessories": "Server accessories",
      "home-categories": "Browse by category",
      "home-all-devices": "All devices, at a glance",
      "count-label": "Devices: {{n}}",
      "rank-popular": "Most popular",
      "rank-powerful": "Most powerful",
      "rank-stable": "Most stable",
      "rank-controllable": "Most controllable",
      "rank-empty": "Coming soon.",
      "devices-title": "Devices",
      "acc-title": "Accessories for your server",
      "acc-intro": "Small parts that make an old device a much better server: extra USB ports, wired Ethernet, video output and charging while it runs 24/7.",
      "acc-note": "Buy links open a search on each marketplace, so availability and prices vary. Before buying, check that your device's USB-C port supports OTG / video output / power delivery, and that your OS has a driver for the hub's Ethernet chip.",
      "acc-all": "All",
      "acc-cat-hub": "USB hubs",
      "acc-cat-hdmi": "USB-C to HDMI",
      "acc-buy": "Find it on:",
      "acc-empty": "No accessories yet.",
      "nav-all": "All Devices",
      "intro-title": "Build your own home server out of any old (or half-broken) device",
      "intro-text": "We test and document how to turn old phones, mini PCs, tablets and TV boxes into real home‑lab servers for pennies. The goal: give budget devices from a drawer a second life and make them a genuine low‑cost alternative to Raspberry Pi and other purpose‑built home‑server boards costing $100+.",
      "filters-label": "Show:",
      "type-smartphone": "Phone",
      "type-minipc": "Mini PC",
      "type-tvbox": "TV Box",
      "type-tablet": "Tablet",
      "type-laptop": "Laptop",
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
      "th-sysbench": "Sysbench",
      "th-ebay": "eBay",
      "breadcrumb-all": "All Devices",
      "section-rating": "Rating",
      "axis-os": "OS",
      "axis-wifi": "Wi‑Fi",
      "axis-battery": "Battery control",
      "axis-usb": "USB support",
      "axis-price": "Price",
      "axis-performance": "Performance",
      "na": "N/A",
      "section-pros": "Pros",
      "section-cons": "Cons",
      "section-specs": "Specifications",
      "section-description": "Description",
      "section-instructions": "Instructions",
      "gallery-empty": "No photos yet for this device.",
      "back-link": "← Back to all devices",
      "theme-toggle-dark": "Dark",
      "theme-toggle-light": "Light",
      "footer-disclaimer": "BoberLab is an educational hobby project. Everything shown here is provided \"as is\" for informational purposes only. Any modification, rooting, flashing or re-purposing of a device is done entirely at your own risk — we take no responsibility for bricked devices, data loss or any other damage. Always keep backups.",
      "footer-project": "Built for homelab enthusiasts and beginner tinkerers who want a cheap way in."
    }
  },
  ru: {
    translation: {
      "site-title": "BoberLab",
      "nav-home": "Главная",
      "nav-devices": "Устройства",
      "nav-accessories": "Аксессуары",
      "nav-menu": "Меню",
      "tagline": "Старые устройства → домашние серверы",
      "cat-smartphone": "Телефоны",
      "cat-minipc": "Мини ПК",
      "cat-tvbox": "ТВ-боксы",
      "cat-tablet": "Планшеты",
      "cat-laptop": "Ноутбуки",
      "cta-devices": "Смотреть устройства",
      "cta-accessories": "Аксессуары для сервера",
      "home-categories": "Категории устройств",
      "home-all-devices": "Все устройства кратко",
      "count-label": "Устройств: {{n}}",
      "rank-popular": "Самые популярные",
      "rank-powerful": "Самые мощные",
      "rank-stable": "Самые стабильные",
      "rank-controllable": "Самые управляемые",
      "rank-empty": "Скоро появится.",
      "devices-title": "Устройства",
      "acc-title": "Аксессуары для сервера",
      "acc-intro": "Мелочи, которые делают из старого устройства гораздо более удобный сервер: дополнительные USB-порты, проводной Ethernet, видеовыход и зарядка во время работы 24/7.",
      "acc-note": "Ссылки на покупку открывают поиск на каждой площадке, поэтому наличие и цены могут отличаться. Перед покупкой проверьте, что USB-C порт вашего устройства поддерживает OTG / видеовыход / Power Delivery, а в вашей ОС есть драйвер для Ethernet-чипа хаба.",
      "acc-all": "Все",
      "acc-cat-hub": "USB-хабы",
      "acc-cat-hdmi": "USB-C → HDMI",
      "acc-buy": "Где найти:",
      "acc-empty": "Аксессуаров пока нет.",
      "nav-all": "Все устройства",
      "intro-title": "Собери домашний сервер из любого старого (или частично сломанного) устройства",
      "intro-text": "Здесь мы тестируем и показываем, как превратить старые телефоны, мини-ПК, планшеты и ТВ-боксы в настоящие домашние серверы за копейки. Цель — дать бюджетным устройствам из ящика вторую жизнь и составить реальную конкуренцию Raspberry Pi и другим специализированным платам для домашних серверов стоимостью от 100 долларов.",
      "filters-label": "Показать:",
      "type-smartphone": "Телефон",
      "type-minipc": "Мини ПК",
      "type-tvbox": "ТВ-бокс",
      "type-tablet": "Планшет",
      "type-laptop": "Ноутбук",
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
      "th-sysbench": "Sysbench",
      "th-ebay": "eBay",
      "breadcrumb-all": "Все устройства",
      "section-rating": "Рейтинг",
      "axis-os": "ОС",
      "axis-wifi": "Wi‑Fi",
      "axis-battery": "Контроль батареи",
      "axis-usb": "Поддержка USB",
      "axis-price": "Цена",
      "axis-performance": "Производительность",
      "na": "Н/Д",
      "section-pros": "Плюсы",
      "section-cons": "Минусы",
      "section-specs": "Характеристики",
      "section-description": "Описание",
      "section-instructions": "Инструкция",
      "gallery-empty": "Пока нет фото этого устройства.",
      "back-link": "← Ко всем устройствам",
      "theme-toggle-dark": "Тёмная",
      "theme-toggle-light": "Светлая",
      "footer-disclaimer": "BoberLab — образовательный любительский проект. Вся информация предоставлена «как есть» исключительно в ознакомительных целях. Любая модификация, рут, перепрошивка или переделка устройства выполняется исключительно на свой страх и риск — мы не несём ответственности за «окирпиченные» устройства, потерю данных или любой другой ущерб. Всегда делайте резервные копии.",
      "footer-project": "Сделано для энтузиастов homelab и начинающих программистов, которые ищут дешёвый вход в тему."
    }
  },
  pl: {
    translation: {
      "site-title": "BoberLab",
      "nav-home": "Strona główna",
      "nav-devices": "Urządzenia",
      "nav-accessories": "Akcesoria",
      "nav-menu": "Menu",
      "tagline": "Stare urządzenia → serwery domowe",
      "cat-smartphone": "Telefony",
      "cat-minipc": "Mini PC",
      "cat-tvbox": "TV Boxy",
      "cat-tablet": "Tablety",
      "cat-laptop": "Laptopy",
      "cta-devices": "Przeglądaj urządzenia",
      "cta-accessories": "Akcesoria do serwera",
      "home-categories": "Kategorie urządzeń",
      "home-all-devices": "Wszystkie urządzenia w skrócie",
      "count-label": "Urządzeń: {{n}}",
      "rank-popular": "Najpopularniejsze",
      "rank-powerful": "Najmocniejsze",
      "rank-stable": "Najstabilniejsze",
      "rank-controllable": "Najlepsza kontrola",
      "rank-empty": "Wkrótce.",
      "devices-title": "Urządzenia",
      "acc-title": "Akcesoria do serwera",
      "acc-intro": "Drobiazgi, dzięki którym stare urządzenie staje się znacznie lepszym serwerem: dodatkowe porty USB, przewodowy Ethernet, wyjście wideo i ładowanie podczas pracy 24/7.",
      "acc-note": "Linki zakupowe otwierają wyszukiwanie na każdej platformie, więc dostępność i ceny mogą się różnić. Przed zakupem sprawdź, czy port USB-C w Twoim urządzeniu obsługuje OTG / wyjście wideo / Power Delivery oraz czy Twój system ma sterownik do układu Ethernet w hubie.",
      "acc-all": "Wszystkie",
      "acc-cat-hub": "Huby USB",
      "acc-cat-hdmi": "USB-C na HDMI",
      "acc-buy": "Znajdź na:",
      "acc-empty": "Brak akcesoriów.",
      "nav-all": "Wszystkie urządzenia",
      "intro-title": "Zbuduj własny serwer domowy z dowolnego starego (lub częściowo zepsutego) urządzenia",
      "intro-text": "Testujemy i pokazujemy, jak zamienić stare telefony, mini PC, tablety i TV boxy w prawdziwe serwery domowe za grosze. Cel: dać sprzętowi z szuflady drugie życie i stworzyć realną konkurencję dla Raspberry Pi i innych dedykowanych płyt do serwerów domowych kosztujących 100$ i więcej.",
      "filters-label": "Pokaż:",
      "type-smartphone": "Telefon",
      "type-minipc": "Mini PC",
      "type-tvbox": "TV Box",
      "type-tablet": "Tablet",
      "type-laptop": "Laptop",
      "th-device": "Urządzenie",
      "th-cores": "Rdzenie/Wątki",
      "th-tdp": "TDP procesora",
      "th-nm": "Proces (nm)",
      "th-ram": "RAM",
      "th-rom": "ROM",
      "th-os": "System (Oryg. / Nowy)",
      "th-power-orig": "Pobór oryg. systemu (Spoczynek/Max)",
      "th-power-new": "Pobór nowego systemu (Spoczynek/Max)",
      "th-antu": "Antutu",
      "th-score": "Wynik Cinebench",
      "th-sysbench": "Sysbench",
      "th-ebay": "eBay",
      "breadcrumb-all": "Wszystkie urządzenia",
      "section-rating": "Ocena",
      "axis-os": "System",
      "axis-wifi": "Wi‑Fi",
      "axis-battery": "Kontrola baterii",
      "axis-usb": "Obsługa USB",
      "axis-price": "Cena",
      "axis-performance": "Wydajność",
      "na": "Brak danych",
      "section-pros": "Zalety",
      "section-cons": "Wady",
      "section-specs": "Specyfikacja",
      "section-description": "Opis",
      "section-instructions": "Instrukcja",
      "gallery-empty": "Brak jeszcze zdjęć tego urządzenia.",
      "back-link": "← Wróć do wszystkich urządzeń",
      "theme-toggle-dark": "Ciemny",
      "theme-toggle-light": "Jasny",
      "footer-disclaimer": "BoberLab to hobbystyczny projekt edukacyjny. Wszystkie informacje podane są „tak jak są” wyłącznie w celach informacyjnych. Jakiekolwiek modyfikacje, rootowanie, flashowanie lub przeróbka urządzenia odbywają się wyłącznie na własne ryzyko — nie ponosimy odpowiedzialności za \"zceglone\" urządzenia, utratę danych ani żadne inne szkody. Zawsze rób kopie zapasowe.",
      "footer-project": "Stworzone dla pasjonatów homelabu i początkujących programistów szukających taniego wejścia w temat."
    }
  }
};

const SUPPORTED_LANGS = ['en', 'ru', 'pl'];
const THEME_STORAGE_KEY = 'boberlab-theme';

function detectDefaultLang() {
  const browserLang = navigator.language || navigator.userLanguage || '';
  const short = browserLang.split('-')[0];
  return SUPPORTED_LANGS.includes(short) ? short : 'en';
}

// --- Theme (light/dark) --------------------------------------------------
// The <html> element already gets a best-guess data-theme attribute from an
// inline script in <head> (before this file even loads, to avoid a flash of
// the wrong theme). Everything here just keeps the toggle button in sync and
// lets the visitor override the guess, remembered per-browser via localStorage.

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeButton();
}

function updateThemeButton() {
  const btn = document.getElementById('theme-toggle');
  if (!btn || !window.i18next || !i18next.isInitialized) return;
  const theme = getCurrentTheme();
  btn.textContent = theme === 'dark'
    ? ('☀️ ' + i18next.t('theme-toggle-light'))
    : ('🌙 ' + i18next.t('theme-toggle-dark'));
}

function toggleTheme() {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch (e) { /* storage unavailable, theme just won't persist */ }
  applyTheme(next);
}

// If the visitor hasn't explicitly chosen a theme on this site, keep following
// their OS/browser theme live in case they flip it while the page is open.
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let stored = null;
    try { stored = localStorage.getItem(THEME_STORAGE_KEY); } catch (err) { /* ignore */ }
    if (stored !== 'dark' && stored !== 'light') {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// Fills every element carrying data-i18n="key" (text) or data-i18n-aria="key"
// (aria-label) with the current language. Static page text lives in the HTML
// as data attributes, so page scripts only handle dynamic content.
function applyTranslations() {
  document.documentElement.lang = i18next.language;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = i18next.t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    el.setAttribute('aria-label', i18next.t(el.dataset.i18nAria));
  });
}

function initI18n(onReady) {
  i18next.init({ lng: detectDefaultLang(), fallbackLng: 'en', resources: i18nResources }, (err, t) => {
    applyTranslations();
    if (onReady) onReady(t);
    document.querySelectorAll('.lang-btns button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === i18next.language);
    });
    updateThemeButton();
  });
}

function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    document.querySelectorAll('.lang-btns button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    applyTranslations();
    updateThemeButton();
    document.dispatchEvent(new CustomEvent('langchange'));
  });
}

// Pick the best-available localized string from an {en, ru, pl} object, falling
// back to English (or the first available language) if the current one is missing.
function localized(field) {
  if (!field) return '';
  return field[i18next.language] || field.en || Object.values(field)[0] || '';
}

function localizedList(field) {
  if (!field) return [];
  return field[i18next.language] || field.en || Object.values(field)[0] || [];
}

function typeLabel(t) {
  return i18next.t('type-' + t, t);
}
