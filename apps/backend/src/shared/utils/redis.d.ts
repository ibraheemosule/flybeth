import Redis from 'ioredis';
declare class RedisClient {
    private static instance;
    private static isConnecting;
    static getInstance(): Promise<Redis>;
    private static connect;
    static disconnect(): Promise<void>;
}
export declare class SessionManager {
    private redis;
    private readonly sessionPrefix;
    private readonly defaultTTL;
    init(): Promise<void>;
    createSession(userId: string, sessionData: any, ttl?: number): Promise<string>;
    getSession(sessionId: string): Promise<any | null>;
    updateSession(sessionId: string, updateData: any): Promise<boolean>;
    deleteSession(sessionId: string): Promise<boolean>;
    deleteAllUserSessions(userId: string): Promise<number>;
}
export declare class CacheManager {
    private redis;
    private readonly cachePrefix;
    init(): Promise<void>;
    get<T = any>(key: string): Promise<T | null>;
    set(key: string, value: any, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<boolean>;
    delPattern(pattern: string): Promise<number>;
    remember<T>(key: string, fetcher: () => Promise<T>, ttlSeconds?: number): Promise<T>;
}
export declare class RateLimiter {
    private redis;
    private readonly rateLimitPrefix;
    init(): Promise<void>;
    checkRateLimit(identifier: string, windowSeconds?: number, maxRequests?: number): Promise<{
        allowed: boolean;
        remaining: number;
        resetTime: number;
    }>;
}
export { RedisClient };
export default RedisClient;
