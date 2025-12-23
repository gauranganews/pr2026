# Быстрый деплой на Hugging Face Spaces

## Шаг 1: Создайте Space на Hugging Face

1. Зайдите на [huggingface.co](https://huggingface.co) и зарегистрируйтесь (или войдите)
2. Перейдите на страницу Spaces: https://huggingface.co/spaces
3. Нажмите кнопку **"Create new Space"**
4. Заполните форму:
   - **Owner**: ваш username
   - **Space name**: `astro-forecast-2026` (или любое другое название)
   - **License**: MIT
   - **Select the Space SDK**: выберите **Docker**
   - **Space hardware**: **CPU basic - Free**
   - Оставьте галочку на **Public**
5. Нажмите **"Create Space"**

## Шаг 2: Настройте переменные окружения

1. После создания Space, перейдите в **Settings** (вверху справа)
2. Найдите раздел **"Repository secrets"**
3. Добавьте следующие секреты (нажимайте **"Add a secret"** для каждого):

   > **Важно!** Используйте ваши реальные ключи из файла `.env`. Значения ниже - это названия переменных, а не реальные ключи.

   | Name | Value |
   |------|-------|
   | `ASTROLOGY_USER_ID` | Ваш User ID от AstrologyAPI |
   | `ASTROLOGY_API_KEY` | Ваш API Key от AstrologyAPI |
   | `OPENAI_API_KEY` | Ваш API Key от OpenAI |
   | `NODE_ENV` | `production` |
   | `PORT` | `7860` |

   **Где взять ключи:**
   - AstrologyAPI: https://astrologyapi.com/ (ваши ключи в файле `.env`)
   - OpenAI API: https://platform.openai.com/api-keys (ваш ключ в файле `.env`)

## Шаг 3: Загрузите код в Space

### Вариант A: Через Git (рекомендуется)

```bash
# Клонируйте ваш новый Space
git clone https://huggingface.co/spaces/YOUR_USERNAME/astro-forecast-2026
cd astro-forecast-2026

# Скопируйте файлы из этого проекта
# (измените путь на путь к вашему проекту)
cp -r /path/to/pr2026/.dockerignore .
cp -r /path/to/pr2026/Dockerfile .
cp -r /path/to/pr2026/package.json .
cp -r /path/to/pr2026/tsconfig.json .
cp -r /path/to/pr2026/src .
cp -r /path/to/pr2026/README_HF.md ./README.md

# Добавьте и запушьте
git add .
git commit -m "Initial commit: Astro Forecast Service"
git push
```

### Вариант B: Через веб-интерфейс

1. На странице вашего Space нажмите **"Files"** → **"Add file"**
2. Загрузите файлы:
   - `Dockerfile`
   - `package.json`
   - `tsconfig.json`
   - `.dockerignore`
   - Папку `src/` со всеми файлами
   - `README_HF.md` (переименуйте в `README.md`)

## Шаг 4: Дождитесь сборки

1. После push или загрузки файлов, Space автоматически начнет сборку
2. Вы увидите логи сборки в интерфейсе
3. Сборка занимает обычно 2-5 минут
4. Когда сборка завершится, статус изменится на **"Running"**

## Шаг 5: Используйте API!

Ваш API теперь доступен по адресу:

```
https://YOUR_USERNAME-astro-forecast-2026.hf.space
```

### Пример запроса:

```bash
curl -X POST https://YOUR_USERNAME-astro-forecast-2026.hf.space/api/forecast \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthPlace": "Moscow"
  }'
```

## Endpoints:

- **GET** `/` - информация о сервисе
- **GET** `/api/health` - проверка здоровья
- **POST** `/api/forecast` - получить астрологический прогноз

## Примечания:

- ✅ Hugging Face Spaces **бесплатный** для публичных проектов
- ✅ **Не засыпает** (в отличие от Render)
- ✅ Автоматическая **HTTPS**
- ✅ **Простой деплой** через Git
- ⚠️ CPU basic может быть медленнее платных опций
- ⚠️ Публичный Space виден всем (можно сделать приватным)

## Для Telegram Mini App:

Используйте URL вашего Space в качестве API endpoint:

```javascript
const API_URL = 'https://YOUR_USERNAME-astro-forecast-2026.hf.space';

async function getForecast(birthDate, birthTime, birthPlace) {
  const response = await fetch(`${API_URL}/api/forecast`, {
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

  return await response.json();
}
```

## Готово! 🎉

Ваш астрологический сервис работает и доступен в интернете!
