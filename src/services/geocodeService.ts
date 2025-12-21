import axios from 'axios';
import { GeocodeResult } from '../types';

class GeocodeService {
  async getCoordinates(place: string): Promise<GeocodeResult> {
    try {
      // Используем бесплатный geocoding API от Nominatim (OpenStreetMap)
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: place,
          format: 'json',
          limit: 1,
        },
        headers: {
          'User-Agent': 'AstroForecastService/1.0',
        },
      });

      if (!response.data || response.data.length === 0) {
        throw new Error(`Location not found: ${place}`);
      }

      const location = response.data[0];

      // Получаем часовой пояс (приблизительно по долготе)
      const timezone = this.getTimezoneFromLongitude(parseFloat(location.lon));

      return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
        timezone,
        formattedAddress: location.display_name,
      };
    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error(`Failed to geocode location: ${place}`);
    }
  }

  private getTimezoneFromLongitude(longitude: number): number {
    // Приблизительный расчет часового пояса по долготе
    // 15 градусов долготы = 1 час
    return Math.round(longitude / 15);
  }

  async getTimezone(latitude: number, longitude: number): Promise<number> {
    try {
      // Используем бесплатный API для получения часового пояса
      const response = await axios.get(`https://timeapi.io/api/TimeZone/coordinate`, {
        params: {
          latitude,
          longitude,
        },
      });

      if (response.data && response.data.currentUtcOffset) {
        const offset = response.data.currentUtcOffset;
        // Конвертируем формат "+03:00" в число 3
        const hours = parseFloat(offset.split(':')[0]);
        return hours;
      }

      // Fallback: приблизительный расчет
      return this.getTimezoneFromLongitude(longitude);
    } catch (error) {
      console.warn('Timezone API error, using approximation:', error);
      return this.getTimezoneFromLongitude(longitude);
    }
  }
}

export const geocodeService = new GeocodeService();
