import { Router, Request, Response } from 'express';
import { forecastService } from '../services/forecastService';
import { ForecastRequest } from '../types';

const router = Router();

router.post('/forecast', async (req: Request, res: Response) => {
  try {
    const { birthDate, birthTime, birthPlace, latitude, longitude, timezone } = req.body;

    // Валидация
    if (!birthDate || !birthTime || !birthPlace) {
      return res.status(400).json({
        error: 'Missing required fields: birthDate, birthTime, birthPlace',
      });
    }

    const forecastRequest: ForecastRequest = {
      birthDate,
      birthTime,
      birthPlace,
      latitude,
      longitude,
      timezone,
    };

    const result = await forecastService.generateForecast(forecastRequest);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Forecast endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
