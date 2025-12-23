# Деплой сервиса

Этот сервис можно развернуть на различных платформах. Ниже приведены инструкции для популярных хостингов.

## Вариант 1: Railway (Рекомендуется - БЕСПЛАТНО)

Railway предоставляет $5 кредитов в месяц бесплатно.

### Шаги:

1. Зайдите на [railway.app](https://railway.app)
2. Нажмите "Start a New Project"
3. Выберите "Deploy from GitHub repo"
4. Выберите ваш репозиторий
5. Добавьте переменные окружения (используйте свои реальные ключи из .env):
   ```
   ASTROLOGY_USER_ID=your_user_id
   ASTROLOGY_API_KEY=your_astrology_api_key
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   PORT=3000
   ```
6. Railway автоматически развернет приложение
7. Получите публичный URL в настройках проекта

## Вариант 2: Render (БЕСПЛАТНО)

Render предоставляет бесплатный tier для веб-сервисов.

### Шаги:

1. Зайдите на [render.com](https://render.com)
2. Нажмите "New +" → "Web Service"
3. Подключите GitHub репозиторий
4. Настройки:
   - **Name**: astro-forecast-2026
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Добавьте переменные окружения (как выше)
6. Нажмите "Create Web Service"

⚠️ **Примечание**: Бесплатный tier Render засыпает после 15 минут неактивности и требует ~30 секунд для пробуждения.

## Вариант 3: Hugging Face Spaces (БЕСПЛАТНО) 🔥

Hugging Face Spaces предоставляет бесплатный хостинг для Docker приложений!

### Шаги:

1. Зайдите на [huggingface.co](https://huggingface.co) и зарегистрируйтесь
2. Перейдите в Spaces: https://huggingface.co/spaces
3. Нажмите "Create new Space"
4. Настройки:
   - **Space name**: astro-forecast-2026
   - **License**: MIT
   - **Select the Space SDK**: Docker
   - **Space hardware**: CPU basic (free)
5. После создания, добавьте переменные окружения в Settings → Repository secrets:
   - `ASTROLOGY_USER_ID`
   - `ASTROLOGY_API_KEY`
   - `OPENAI_API_KEY`
   - `NODE_ENV=production`
   - `PORT=7860` (Hugging Face использует порт 7860)
6. Склонируйте ваш Space:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/astro-forecast-2026
   cd astro-forecast-2026
   ```
7. Скопируйте файлы проекта:
   ```bash
   cp -r /path/to/pr2026/* .
   ```
8. Важно! Обновите порт в src/config/index.ts для Hugging Face:
   ```typescript
   port: parseInt(process.env.PORT || '7860', 10)
   ```
9. Запушьте в HF Space:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push
   ```
10. Space автоматически соберется и запустится!

**Ваш API будет доступен по адресу:**
`https://YOUR_USERNAME-astro-forecast-2026.hf.space/api/forecast`

⚠️ **Важно**: Hugging Face Spaces использует порт 7860 по умолчанию!

## Вариант 4: Vercel (для serverless функций)

Для Vercel нужно адаптировать под serverless архитектуру.

## Вариант 5: DigitalOcean App Platform

$5/месяц за базовый сервис.

## Вариант 5: Heroku

$5/месяц за базовый dyno (бесплатный tier убрали).

## Вариант 7: Docker на своем сервере

Если у вас есть VPS (например, от Hetzner, DigitalOcean):

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd pr2026

# Создайте .env файл
nano .env
# Вставьте переменные окружения

# Запустите с Docker Compose
docker-compose up -d

# Или просто с Docker
docker build -t astro-forecast .
docker run -d -p 3000:3000 --env-file .env astro-forecast
```

## Переменные окружения

Для любого варианта деплоя нужны эти переменные (замените на свои реальные ключи):

```env
ASTROLOGY_USER_ID=your_user_id
ASTROLOGY_API_KEY=your_astrology_api_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
PORT=3000
```

## Проверка после деплоя

После развертывания проверьте:

```bash
# Health check
curl https://your-app.railway.app/api/health

# Тестовый прогноз
curl -X POST https://your-app.railway.app/api/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthPlace": "Moscow"
  }'
```

## Рекомендация

**Лучшие бесплатные варианты:**
1. **Hugging Face Spaces** - стабильный бесплатный хостинг, не засыпает
2. **Railway** - простой деплой, $5 кредитов в месяц
3. **Render** - бесплатно, но засыпает после 15 минут неактивности
