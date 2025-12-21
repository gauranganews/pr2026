import dotenv from 'dotenv';

dotenv.config();

export const config = {
  astrology: {
    userId: process.env.ASTROLOGY_USER_ID || '',
    apiKey: process.env.ASTROLOGY_API_KEY || '',
    baseUrl: 'https://json.astrologyapi.com/v1',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
};
