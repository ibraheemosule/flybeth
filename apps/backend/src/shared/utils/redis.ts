import Redis from 'ioredis';
import winston from 'winston';

// Create logger function for Redis
const createLogger = (serviceName: string) => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ],
  });
};

const logger = createLogger('redis-client');

class RedisClient {
  private static instance: Redis | null = null;
  private static isConnecting = false;

  static async getInstance(): Promise<Redis> {
    if (this.instance && this.instance.status === 'ready') {
      return this.instance;
    }

    if (this.isConnecting) {
      // Wait for ongoing connection
      while (this.isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      if (this.instance && this.instance.status === 'ready') {
        return this.instance;
      }
    }

    return this.connect();
  }

  private static async connect(): Promise<Redis> {
    this.isConnecting = true;
    
    try {
      const redisConfig = {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0'),
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        keepAlive: 30000,
        family: 4, // 4 (IPv4) or 6 (IPv6)
        connectTimeout: 10000,
        commandTimeout: 5000,
      };

      this.instance = new Redis(redisConfig);

      this.instance.on('connect', () => {
        logger.info('Redis connecting...');
      });

      this.instance.on('ready', () => {
        logger.info('Redis connection ready');
      });

      this.instance.on('error', (err) => {
        logger.error('Redis connection error:', err);
      });

      this.instance.on('close', () => {
        logger.warn('Redis connection closed');
      });

      this.instance.on('reconnecting', () => {
        logger.info('Redis reconnecting...');
      });

      await this.instance.connect();
      
      return this.instance;
    } catch (error) {
      logger.error('Failed to connect to Redis:', error);
      throw error;
    } finally {
      this.isConnecting = false;
    }
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
      logger.info('Redis disconnected');
    }
  }
}

// Session management utilities
export class SessionManager {
  private redis: Redis | null = null;
  private readonly sessionPrefix = 'session:';
  private readonly defaultTTL = 3600; // 1 hour

  async init(): Promise<void> {
    this.redis = await RedisClient.getInstance();
  }

  async createSession(userId: string, sessionData: any, ttl?: number): Promise<string> {
    if (!this.redis) await this.init();
    
    const sessionId = `${userId}:${Date.now()}:${Math.random().toString(36).substring(7)}`;
    const key = this.sessionPrefix + sessionId;
    
    await this.redis!.setex(key, ttl || this.defaultTTL, JSON.stringify({
      ...sessionData,
      userId,
      createdAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString()
    }));

    return sessionId;
  }

  async getSession(sessionId: string): Promise<any | null> {
    if (!this.redis) await this.init();
    
    const key = this.sessionPrefix + sessionId;
    const sessionData = await this.redis!.get(key);
    
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      // Update last accessed time
      parsed.lastAccessedAt = new Date().toISOString();
      await this.redis!.setex(key, this.defaultTTL, JSON.stringify(parsed));
      return parsed;
    }
    
    return null;
  }

  async updateSession(sessionId: string, updateData: any): Promise<boolean> {
    if (!this.redis) await this.init();
    
    const key = this.sessionPrefix + sessionId;
    const currentSession = await this.getSession(sessionId);
    
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        ...updateData,
        lastAccessedAt: new Date().toISOString()
      };
      
      await this.redis!.setex(key, this.defaultTTL, JSON.stringify(updatedSession));
      return true;
    }
    
    return false;
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    if (!this.redis) await this.init();
    
    const key = this.sessionPrefix + sessionId;
    const result = await this.redis!.del(key);
    return result > 0;
  }

  async deleteAllUserSessions(userId: string): Promise<number> {
    if (!this.redis) await this.init();
    
    const pattern = `${this.sessionPrefix}${userId}:*`;
    const keys = await this.redis!.keys(pattern);
    
    if (keys.length > 0) {
      return await this.redis!.del(...keys);
    }
    
    return 0;
  }
}

// Cache utilities
export class CacheManager {
  private redis: Redis | null = null;
  private readonly cachePrefix = 'cache:';

  async init(): Promise<void> {
    this.redis = await RedisClient.getInstance();
  }

  async get<T = any>(key: string): Promise<T | null> {
    if (!this.redis) await this.init();
    
    const cacheKey = this.cachePrefix + key;
    const cached = await this.redis!.get(cacheKey);
    
    return cached ? JSON.parse(cached) : null;
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    if (!this.redis) await this.init();
    
    const cacheKey = this.cachePrefix + key;
    await this.redis!.setex(cacheKey, ttlSeconds, JSON.stringify(value));
  }

  async del(key: string): Promise<boolean> {
    if (!this.redis) await this.init();
    
    const cacheKey = this.cachePrefix + key;
    const result = await this.redis!.del(cacheKey);
    return result > 0;
  }

  async delPattern(pattern: string): Promise<number> {
    if (!this.redis) await this.init();
    
    const keys = await this.redis!.keys(this.cachePrefix + pattern);
    
    if (keys.length > 0) {
      return await this.redis!.del(...keys);
    }
    
    return 0;
  }

  // Cache with function execution
  async remember<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    ttlSeconds: number = 300
  ): Promise<T> {
    let cached = await this.get<T>(key);
    
    if (cached !== null) {
      return cached;
    }
    
    const result = await fetcher();
    await this.set(key, result, ttlSeconds);
    return result;
  }
}

// Rate limiting utilities
export class RateLimiter {
  private redis: Redis | null = null;
  private readonly rateLimitPrefix = 'rate_limit:';

  async init(): Promise<void> {
    this.redis = await RedisClient.getInstance();
  }

  async checkRateLimit(
    identifier: string, 
    windowSeconds: number = 60, 
    maxRequests: number = 100
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    if (!this.redis) await this.init();
    
    const key = this.rateLimitPrefix + identifier;
    const current = await this.redis!.get(key);
    const now = Date.now();
    
    if (!current) {
      await this.redis!.setex(key, windowSeconds, '1');
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetTime: now + (windowSeconds * 1000)
      };
    }
    
    const count = parseInt(current);
    const ttl = await this.redis!.ttl(key);
    const resetTime = now + (ttl * 1000);
    
    if (count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime
      };
    }
    
    await this.redis!.incr(key);
    
    return {
      allowed: true,
      remaining: maxRequests - count - 1,
      resetTime
    };
  }
}

export { RedisClient };
export default RedisClient;