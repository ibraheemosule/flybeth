"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = exports.connectRedis = void 0;
const shared_1 = require("../shared");
Object.defineProperty(exports, "RedisClient", { enumerable: true, get: function () { return shared_1.RedisClient; } });
const logger_1 = require("./logger");
const connectRedis = async () => {
    try {
        const redis = await shared_1.RedisClient.getInstance();
        logger_1.logger.info('Redis connected successfully', { service: 'redis-client' });
        return redis;
    }
    catch (error) {
        logger_1.logger.error('Failed to connect to Redis:', error);
        throw error;
    }
};
exports.connectRedis = connectRedis;
