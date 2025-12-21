# Руководство по использованию

## Запуск сервиса

1. Установите зависимости:
```bash
npm install
```

2. Настройте переменные окружения в `.env`:
```env
ASTROLOGY_USER_ID=648518
ASTROLOGY_API_KEY=your_api_key
OPENAI_API_KEY=your_openai_key
PORT=3000
```

3. Запустите сервер:
```bash
npm run dev
```

## Пример использования API

### Запрос прогноза

```bash
curl -X POST http://localhost:3000/api/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthPlace": "Москва"
  }'
```

### Параметры запроса

- **birthDate** (обязательный) - дата рождения в формате `YYYY-MM-DD`
- **birthTime** (обязательный) - время рождения в формате `HH:MM` (24-часовой формат)
- **birthPlace** (обязательный) - название города рождения
- **latitude** (опциональный) - широта места рождения
- **longitude** (опциональный) - долгота места рождения
- **timezone** (опциональный) - часовой пояс (смещение от UTC)

### Структура ответа

```json
{
  "success": true,
  "data": {
    "birthData": {
      "day": 15,
      "month": 5,
      "year": 1990,
      "hour": 14,
      "min": 30,
      "lat": 55.7558,
      "lon": 37.6173,
      "tzone": 3
    },
    "planets": {
      "sun": {
        "name": "Sun",
        "fullDegree": 54.5,
        "normDegree": 24.5,
        "speed": 0.95,
        "isRetro": "false",
        "sign": "Taurus",
        "signLord": "Venus",
        "nakshatra": "Mrigashirsha",
        "nakshatraLord": "Mars",
        "house": 10
      },
      "moon": { ... },
      "mars": { ... }
    },
    "periods": [
      {
        "planet": "Venus",
        "start": "2024-05-15",
        "end": "2044-05-15",
        "antardashas": [
          {
            "planet": "Venus",
            "start": "2024-05-15",
            "end": "2027-09-14"
          }
        ]
      }
    ],
    "forecast": "В 2026 году вас ожидает важный период под влиянием Венеры..."
  }
}
```

## Интеграция с Telegram Mini App

### Frontend пример (JavaScript)

```javascript
async function getAstroForecast(birthDate, birthTime, birthPlace) {
  const response = await fetch('http://your-server.com/api/forecast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      birthDate,
      birthTime,
      birthPlace
    })
  });

  const data = await response.json();
  return data;
}

// Использование
getAstroForecast('1990-05-15', '14:30', 'Москва')
  .then(result => {
    console.log('Прогноз:', result.data.forecast);
    console.log('Планеты:', result.data.planets);
    console.log('Периоды:', result.data.periods);
  });
```

### Пример для Telegram Mini App

```javascript
// В Telegram Mini App
import WebApp from '@twa-dev/sdk';

async function getForecastForUser() {
  // Получаем данные от пользователя через форму
  const birthDate = document.getElementById('birthDate').value;
  const birthTime = document.getElementById('birthTime').value;
  const birthPlace = document.getElementById('birthPlace').value;

  WebApp.MainButton.setText('Загрузка...');
  WebApp.MainButton.show();

  try {
    const response = await fetch('https://your-api.com/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        birthDate,
        birthTime,
        birthPlace
      })
    });

    const result = await response.json();

    if (result.success) {
      // Показываем результат пользователю
      displayForecast(result.data);
    } else {
      WebApp.showAlert('Ошибка: ' + result.error);
    }
  } catch (error) {
    WebApp.showAlert('Произошла ошибка при получении прогноза');
  } finally {
    WebApp.MainButton.hide();
  }
}

function displayForecast(data) {
  // Форматируем и показываем прогноз
  const forecastHTML = `
    <h2>Ваш прогноз на 2026 год</h2>
    <p>${data.forecast}</p>

    <h3>Ваши планеты:</h3>
    <ul>
      <li>Солнце: ${data.planets.sun.sign}</li>
      <li>Луна: ${data.planets.moon.sign}</li>
      <li>Асцендент: ${data.planets.ascendant.sign}</li>
    </ul>

    <h3>Периоды в 2026:</h3>
    ${formatPeriods(data.periods)}
  `;

  document.getElementById('result').innerHTML = forecastHTML;
}
```

## Тестирование

Проверьте работу сервиса:

```bash
# Health check
curl http://localhost:3000/api/health

# Тестовый запрос
curl -X POST http://localhost:3000/api/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthPlace": "Moscow"
  }'
```

## Обработка ошибок

Сервис возвращает ошибки в формате:

```json
{
  "success": false,
  "error": "Описание ошибки"
}
```

Возможные ошибки:
- `Missing required fields` - не указаны обязательные поля
- `Location not found` - не удалось найти указанное место
- `Failed to fetch planets` - ошибка при получении данных от AstrologyAPI
- `Failed to generate forecast` - ошибка при генерации прогноза через OpenAI

## Деплой

Для развертывания на production:

1. Соберите проект:
```bash
npm run build
```

2. Запустите production версию:
```bash
npm start
```

3. Используйте process manager (например, PM2):
```bash
pm2 start dist/index.js --name astro-forecast
```

## Переменные окружения для production

```env
NODE_ENV=production
PORT=3000
ASTROLOGY_USER_ID=your_user_id
ASTROLOGY_API_KEY=your_api_key
OPENAI_API_KEY=your_openai_key
```
