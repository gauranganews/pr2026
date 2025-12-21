import { astrologyService } from './astrologyService';
import { openaiService } from './openaiService';
import { geocodeService } from './geocodeService';
import { BirthData, ForecastRequest, ForecastResponse } from '../types';

class ForecastService {
  async generateForecast(request: ForecastRequest): Promise<ForecastResponse> {
    try {
      // 1. Получаем координаты места рождения, если не предоставлены
      let latitude = request.latitude;
      let longitude = request.longitude;
      let timezone = request.timezone;

      if (!latitude || !longitude) {
        const geocodeResult = await geocodeService.getCoordinates(request.birthPlace);
        latitude = geocodeResult.latitude;
        longitude = geocodeResult.longitude;
        timezone = geocodeResult.timezone;
      }

      // Если timezone не указан, получаем его
      if (timezone === undefined) {
        timezone = await geocodeService.getTimezone(latitude, longitude);
      }

      // 2. Парсим дату и время рождения
      const [year, month, day] = request.birthDate.split('-').map(Number);
      const [hour, min] = request.birthTime.split(':').map(Number);

      const birthData: BirthData = {
        day,
        month,
        year,
        hour,
        min,
        lat: latitude,
        lon: longitude,
        tzone: timezone,
      };

      // 3. Получаем астрологические данные
      console.log('Fetching astrology data for:', birthData);
      const { planets, vdasha } = await astrologyService.getCompleteAstroData(birthData);

      // 4. Генерируем прогноз через GPT
      console.log('Generating forecast...');
      const forecast = await openaiService.generateForecast(planets, vdasha.major_vdasha);

      // 5. Возвращаем результат
      return {
        birthData,
        planets,
        periods: vdasha.major_vdasha,
        forecast,
      };
    } catch (error) {
      console.error('Forecast generation error:', error);
      throw error;
    }
  }
}

export const forecastService = new ForecastService();
