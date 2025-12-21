import express from 'express';
import cors from 'cors';
import { config } from './config';
import forecastRoutes from './routes/forecastRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', forecastRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Astro Forecast Service API',
    version: '1.0.0',
    endpoints: {
      forecast: 'POST /api/forecast',
      health: 'GET /api/health',
    },
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Environment: ${config.server.nodeEnv}`);
  console.log(`🔗 API available at http://localhost:${PORT}/api`);
});

export default app;
