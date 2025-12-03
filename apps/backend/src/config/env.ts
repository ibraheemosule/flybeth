// Environment configuration
export const config = {
  port: parseInt(process.env.PORT || '3000'),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/travel_platform',
  
  // Redis
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret',
  jwtExpiry: process.env.JWT_EXPIRY || '1h',
  jwtRefreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
  
  // Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret',
  },
  
  // External APIs
  amadeus: {
    apiKey: process.env.AMADEUS_API_KEY || 'dummy-key',
    apiSecret: process.env.AMADEUS_API_SECRET || 'dummy-secret',
    baseUrl: process.env.AMADEUS_BASE_URL || 'https://test.api.amadeus.com',
  },
  
  // CORS
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003'],
  
  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // requests per window
  }
};