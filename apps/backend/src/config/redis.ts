import { RedisClient } from '../shared';
import { logger } from './logger';
import { config } from './env';

export const connectRedis = async () => {
  try {
    const redis = await RedisClient.getInstance();
    logger.info('Redis connected successfully', { service: 'redis-client' });
    return redis;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export { RedisClient };