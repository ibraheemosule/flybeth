"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = exports.RateLimiter = exports.CacheManager = exports.SessionManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const winston_1 = __importDefault(require("winston"));
// Create logger function for Redis
const createLogger = (serviceName) => {
    return winston_1.default.createLogger({
        level: process.env.LOG_LEVEL || 'info',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
        defaultMeta: { service: serviceName },
        transports: [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.simple()
            })
        ],
    });
};
const logger = createLogger('redis-client');
class RedisClient {
    static async getInstance() {
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
    static async connect() {
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
            this.instance = new ioredis_1.default(redisConfig);
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
        }
        catch (error) {
            logger.error('Failed to connect to Redis:', error);
            throw error;
        }
        finally {
            this.isConnecting = false;
        }
    }
    static async disconnect() {
        if (this.instance) {
            await this.instance.quit();
            this.instance = null;
            logger.info('Redis disconnected');
        }
    }
}
exports.RedisClient = RedisClient;
RedisClient.instance = null;
RedisClient.isConnecting = false;
// Session management utilities
class SessionManager {
    constructor() {
        this.redis = null;
        this.sessionPrefix = 'session:';
        this.defaultTTL = 3600; // 1 hour
    }
    async init() {
        this.redis = await RedisClient.getInstance();
    }
    async createSession(userId, sessionData, ttl) {
        if (!this.redis)
            await this.init();
        const sessionId = `${userId}:${Date.now()}:${Math.random().toString(36).substring(7)}`;
        const key = this.sessionPrefix + sessionId;
        await this.redis.setex(key, ttl || this.defaultTTL, JSON.stringify({
            ...sessionData,
            userId,
            createdAt: new Date().toISOString(),
            lastAccessedAt: new Date().toISOString()
        }));
        return sessionId;
    }
    async getSession(sessionId) {
        if (!this.redis)
            await this.init();
        const key = this.sessionPrefix + sessionId;
        const sessionData = await this.redis.get(key);
        if (sessionData) {
            const parsed = JSON.parse(sessionData);
            // Update last accessed time
            parsed.lastAccessedAt = new Date().toISOString();
            await this.redis.setex(key, this.defaultTTL, JSON.stringify(parsed));
            return parsed;
        }
        return null;
    }
    async updateSession(sessionId, updateData) {
        if (!this.redis)
            await this.init();
        const key = this.sessionPrefix + sessionId;
        const currentSession = await this.getSession(sessionId);
        if (currentSession) {
            const updatedSession = {
                ...currentSession,
                ...updateData,
                lastAccessedAt: new Date().toISOString()
            };
            await this.redis.setex(key, this.defaultTTL, JSON.stringify(updatedSession));
            return true;
        }
        return false;
    }
    async deleteSession(sessionId) {
        if (!this.redis)
            await this.init();
        const key = this.sessionPrefix + sessionId;
        const result = await this.redis.del(key);
        return result > 0;
    }
    async deleteAllUserSessions(userId) {
        if (!this.redis)
            await this.init();
        const pattern = `${this.sessionPrefix}${userId}:*`;
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) {
            return await this.redis.del(...keys);
        }
        return 0;
    }
}
exports.SessionManager = SessionManager;
// Cache utilities
class CacheManager {
    constructor() {
        this.redis = null;
        this.cachePrefix = 'cache:';
    }
    async init() {
        this.redis = await RedisClient.getInstance();
    }
    async get(key) {
        if (!this.redis)
            await this.init();
        const cacheKey = this.cachePrefix + key;
        const cached = await this.redis.get(cacheKey);
        return cached ? JSON.parse(cached) : null;
    }
    async set(key, value, ttlSeconds = 300) {
        if (!this.redis)
            await this.init();
        const cacheKey = this.cachePrefix + key;
        await this.redis.setex(cacheKey, ttlSeconds, JSON.stringify(value));
    }
    async del(key) {
        if (!this.redis)
            await this.init();
        const cacheKey = this.cachePrefix + key;
        const result = await this.redis.del(cacheKey);
        return result > 0;
    }
    async delPattern(pattern) {
        if (!this.redis)
            await this.init();
        const keys = await this.redis.keys(this.cachePrefix + pattern);
        if (keys.length > 0) {
            return await this.redis.del(...keys);
        }
        return 0;
    }
    // Cache with function execution
    async remember(key, fetcher, ttlSeconds = 300) {
        let cached = await this.get(key);
        if (cached !== null) {
            return cached;
        }
        const result = await fetcher();
        await this.set(key, result, ttlSeconds);
        return result;
    }
}
exports.CacheManager = CacheManager;
// Rate limiting utilities
class RateLimiter {
    constructor() {
        this.redis = null;
        this.rateLimitPrefix = 'rate_limit:';
    }
    async init() {
        this.redis = await RedisClient.getInstance();
    }
    async checkRateLimit(identifier, windowSeconds = 60, maxRequests = 100) {
        if (!this.redis)
            await this.init();
        const key = this.rateLimitPrefix + identifier;
        const current = await this.redis.get(key);
        const now = Date.now();
        if (!current) {
            await this.redis.setex(key, windowSeconds, '1');
            return {
                allowed: true,
                remaining: maxRequests - 1,
                resetTime: now + (windowSeconds * 1000)
            };
        }
        const count = parseInt(current);
        const ttl = await this.redis.ttl(key);
        const resetTime = now + (ttl * 1000);
        if (count >= maxRequests) {
            return {
                allowed: false,
                remaining: 0,
                resetTime
            };
        }
        await this.redis.incr(key);
        return {
            allowed: true,
            remaining: maxRequests - count - 1,
            resetTime
        };
    }
}
exports.RateLimiter = RateLimiter;
exports.default = RedisClient;
