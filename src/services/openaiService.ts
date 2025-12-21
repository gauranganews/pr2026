import OpenAI from 'openai';
import { config } from '../config';
import { PlanetsResponse, MahaDasha } from '../types';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
  }

  private formatAstrologyData(planets: any, dashas: MahaDasha[]): string {
    let data = 'АСТРОЛОГИЧЕСКИЕ ДАННЫЕ:\n\n';

    // Форматируем планеты
    data += 'Положение планет:\n';
    if (planets.sun) {
      data += `- Солнце: ${planets.sun.sign} (${planets.sun.normDegree.toFixed(2)}°), Накшатра: ${planets.sun.nakshatra}\n`;
    }
    if (planets.moon) {
      data += `- Луна: ${planets.moon.sign} (${planets.moon.normDegree.toFixed(2)}°), Накшатра: ${planets.moon.nakshatra}\n`;
    }
    if (planets.mars) {
      data += `- Марс: ${planets.mars.sign} (${planets.mars.normDegree.toFixed(2)}°), Накшатра: ${planets.mars.nakshatra}\n`;
    }
    if (planets.mercury) {
      data += `- Меркурий: ${planets.mercury.sign} (${planets.mercury.normDegree.toFixed(2)}°), Накшатра: ${planets.mercury.nakshatra}\n`;
    }
    if (planets.jupiter) {
      data += `- Юпитер: ${planets.jupiter.sign} (${planets.jupiter.normDegree.toFixed(2)}°), Накшатра: ${planets.jupiter.nakshatra}\n`;
    }
    if (planets.venus) {
      data += `- Венера: ${planets.venus.sign} (${planets.venus.normDegree.toFixed(2)}°), Накшатра: ${planets.venus.nakshatra}\n`;
    }
    if (planets.saturn) {
      data += `- Сатурн: ${planets.saturn.sign} (${planets.saturn.normDegree.toFixed(2)}°), Накшатра: ${planets.saturn.nakshatra}\n`;
    }
    if (planets.ascendant) {
      data += `- Асцендент (Лагна): ${planets.ascendant.sign} (${planets.ascendant.normDegree.toFixed(2)}°)\n`;
    }

    // Форматируем периоды на 2026 год
    data += '\nПериоды (Махадаша) на 2026 год:\n';
    const periodsIn2026 = this.filterPeriodsFor2026(dashas);
    periodsIn2026.forEach((dasha) => {
      data += `- Махадаша ${dasha.planet}: ${dasha.start} - ${dasha.end}\n`;
      if (dasha.antardashas && dasha.antardashas.length > 0) {
        const antardashasIn2026 = dasha.antardashas.filter(ad => {
          const adStart = new Date(ad.start);
          const adEnd = new Date(ad.end);
          const year2026Start = new Date('2026-01-01');
          const year2026End = new Date('2026-12-31');
          return (adStart <= year2026End && adEnd >= year2026Start);
        });
        antardashasIn2026.forEach((ad) => {
          data += `  • Антардаша ${ad.planet}: ${ad.start} - ${ad.end}\n`;
        });
      }
    });

    return data;
  }

  private filterPeriodsFor2026(dashas: MahaDasha[]): MahaDasha[] {
    const year2026Start = new Date('2026-01-01');
    const year2026End = new Date('2026-12-31');

    return dashas.filter((dasha) => {
      const dashaStart = new Date(dasha.start);
      const dashaEnd = new Date(dasha.end);
      return dashaStart <= year2026End && dashaEnd >= year2026Start;
    });
  }

  async generateForecast(planets: any, dashas: MahaDasha[]): Promise<string> {
    try {
      const astrologyData = this.formatAstrologyData(planets, dashas);

      const prompt = `${astrologyData}\n\nПРОМПТ: Составь краткий астрологический прогноз на 2026 год для человека в один абзац. Объясни основные тенденции года и смены периодов. Чего ожидать и к чему готовится.`;

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Ты профессиональный астролог, специализирующийся на ведической астрологии. Создавай точные, но понятные прогнозы на основе астрологических данных.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || 'Не удалось создать прогноз.';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate forecast');
    }
  }
}

export const openaiService = new OpenAIService();
