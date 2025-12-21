# Astro Forecast Service 2026

Сервис для создания астрологических прогнозов на 2026 год для Telegram Mini App.

## Описание

Этот сервис принимает данные о рождении человека (дата, время и место рождения) и возвращает:
- Положение планет
- Астрологические периоды на 2026 год (Махадаша и Антардаша)
- Краткий астрологический прогноз, сгенерированный с помощью ChatGPT

## Используемые API

- **AstrologyAPI** - для получения астрологических данных (положение планет, периоды)
- **OpenAI GPT-4** - для генерации астрологического прогноза
- **Nominatim (OpenStreetMap)** - для геокодирования адресов

## Установка

```bash
# Установка зависимостей
npm install

# Создание .env файла
cp .env.example .env
# Отредактируйте .env файл и добавьте ваши API ключи
```

## Конфигурация

Создайте `.env` файл со следующими переменными:

```env
ASTROLOGY_USER_ID=your_user_id
ASTROLOGY_API_KEY=your_api_key
OPENAI_API_KEY=your_openai_key
PORT=3000
NODE_ENV=development
```

## Запуск

```bash
# Режим разработки
npm run dev

# Сборка проекта
npm run build

# Запуск production версии
npm start
```

## API Endpoints

### POST /api/forecast

Создает астрологический прогноз на 2026 год.

**Тело запроса:**
```json
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthPlace": "Москва",
  "latitude": 55.7558,
  "longitude": 37.6173,
  "timezone": 3
}
```

**Параметры:**
- `birthDate` (обязательный) - дата рождения в формате YYYY-MM-DD
- `birthTime` (обязательный) - время рождения в формате HH:MM
- `birthPlace` (обязательный) - место рождения
- `latitude` (опциональный) - широта места рождения
- `longitude` (опциональный) - долгота места рождения
- `timezone` (опциональный) - часовой пояс

**Пример ответа:**
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
        "sign": "Taurus",
        "normDegree": 24.5,
        "nakshatra": "Mrigashirsha"
      }
    },
    "periods": [
      {
        "planet": "Venus",
        "start": "2024-01-01",
        "end": "2027-12-31",
        "antardashas": []
      }
    ],
    "forecast": "Астрологический прогноз на 2026 год..."
  }
}
```

### GET /api/health

Проверка состояния сервера.

**Ответ:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Структура проекта

```
src/
  ├── config/          # Конфигурация приложения
  ├── types/           # TypeScript типы
  ├── services/        # Бизнес-логика
  │   ├── astrologyService.ts   # Работа с AstrologyAPI
  │   ├── openaiService.ts      # Работа с OpenAI
  │   ├── geocodeService.ts     # Геокодирование адресов
  │   └── forecastService.ts    # Основной сервис прогнозов
  ├── routes/          # API маршруты
  └── index.ts         # Входная точка приложения
```

## Технологии

- **Node.js** - среда выполнения
- **TypeScript** - типизированный JavaScript
- **Express** - веб-фреймворк
- **Axios** - HTTP клиент
- **OpenAI SDK** - для работы с GPT-4

## Лицензия

MIT
