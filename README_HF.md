---
title: Astro Forecast 2026
emoji: 🔮
colorFrom: purple
colorTo: blue
sdk: docker
pinned: false
app_port: 3000
---

# Astro Forecast Service 2026

Сервис для создания астрологических прогнозов на 2026 год.

## API

### POST /api/forecast

Создает астрологический прогноз на основе данных рождения.

**Request:**
```json
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthPlace": "Moscow"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "birthData": {...},
    "planets": {...},
    "periods": [...],
    "forecast": "..."
  }
}
```

### GET /api/health

Проверка состояния сервера.

## Использование

Отправьте POST запрос на `/api/forecast` с данными рождения для получения прогноза.
