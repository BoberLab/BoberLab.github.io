// 1. Словари для i18next
const resources = {
  en: {
    translation: {
      "title": "My Home Lab Tests",
      "device": "Device Name",
      "cpu": "Processor",
      "power": "Power (Watts)",
      "score": "Benchmark Score"
    }
  },
  ru: {
    translation: {
      "title": "Тесты домашней лаборатории",
      "device": "Устройство",
      "cpu": "Процессор",
      "power": "Потребление (Ватт)",
      "score": "Баллы (Benchmark)"
    }
  }
};

let devicesData = [];

// 2. Инициализация i18next
i18next.init({
  lng: 'ru', // Язык по умолчанию
  fallbackLng: 'en',
  resources
}, function(err, t) {
  // Вызывается после загрузки переводов
  updateUI();
  loadDevices();
});

// 3. Функция перевода статических элементов интерфейса
function updateUI() {
  document.getElementById('main-title').innerText = i18next.t('title');
  document.getElementById('th-device').innerText = i18next.t('device');
  document.getElementById('th-cpu').innerText = i18next.t('cpu');
  document.getElementById('th-power').innerText = i18next.t('power');
  document.getElementById('th-score').innerText = i18next.t('score');
}

// 4. Загрузка JSON и рендер таблицы
async function loadDevices() {
  try {
    const response = await fetch('devices.json');
    devicesData = await response.json();
    renderTable();
  } catch (error) {
    console.error("Ошибка загрузки данных:", error);
  }
}

function renderTable() {
  const tbody = document.getElementById('table-body');
  tbody.innerHTML = ''; // Очищаем таблицу

  devicesData.forEach(device => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${device.name}</td>
      <td>${device.cpu}</td>
      <td>${device.powerW} W</td>
      <td>${device.score}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 5. Функция смены языка (вызывается по клику на кнопки)
function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    updateUI();
    // Если бы у нас были переводы самих данных (например, описания устройств), 
    // мы бы здесь снова вызвали renderTable()
  });
}
