"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = exports.generateBookingReference = exports.generateApiKey = exports.comparePassword = exports.hashPassword = exports.createLogger = exports.createHelmetMiddleware = exports.createCorsMiddleware = exports.RateLimiter = exports.CacheManager = exports.SessionManager = exports.RedisClient = exports.rateLimit = exports.createProxyMiddleware = exports.winston = exports.dotenvConfig = exports.helmet = exports.cors = exports.express = void 0;
// Import dependencies
const express_1 = __importDefault(require("express"));
exports.express = express_1.default;
const cors_1 = __importDefault(require("cors"));
exports.cors = cors_1.default;
const helmet_1 = __importDefault(require("helmet"));
exports.helmet = helmet_1.default;
const dotenv_1 = require("dotenv");
Object.defineProperty(exports, "dotenvConfig", { enumerable: true, get: function () { return dotenv_1.config; } });
const winston_1 = __importDefault(require("winston"));
exports.winston = winston_1.default;
const http_proxy_middleware_1 = require("http-proxy-middleware");
Object.defineProperty(exports, "createProxyMiddleware", { enumerable: true, get: function () { return http_proxy_middleware_1.createProxyMiddleware; } });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimit = express_rate_limit_1.default;
// Export Redis utilities
var redis_1 = require("./redis");
Object.defineProperty(exports, "RedisClient", { enumerable: true, get: function () { return redis_1.RedisClient; } });
Object.defineProperty(exports, "SessionManager", { enumerable: true, get: function () { return redis_1.SessionManager; } });
Object.defineProperty(exports, "CacheManager", { enumerable: true, get: function () { return redis_1.CacheManager; } });
Object.defineProperty(exports, "RateLimiter", { enumerable: true, get: function () { return redis_1.RateLimiter; } });
// Common middleware factory functions
const createCorsMiddleware = (options) => {
    return (0, cors_1.default)(options || {
        origin: process.env.CORS_ORIGIN || "http://localhost:5000",
        credentials: true,
    });
};
exports.createCorsMiddleware = createCorsMiddleware;
const createHelmetMiddleware = () => {
    return (0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    });
};
exports.createHelmetMiddleware = createHelmetMiddleware;
// Logger factory
const createLogger = (serviceName) => {
    return winston_1.default.createLogger({
        level: process.env.LOG_LEVEL || "info",
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
        defaultMeta: { service: serviceName },
        transports: [
            new winston_1.default.transports.File({
                filename: "logs/error.log",
                level: "error",
            }),
            new winston_1.default.transports.File({ filename: "logs/combined.log" }),
            new winston_1.default.transports.Console({
                format: winston_1.default.format.simple(),
            }),
        ],
    });
};
exports.createLogger = createLogger;
// Export authentication utilities (backend-only)
var auth_1 = require("./auth");
Object.defineProperty(exports, "hashPassword", { enumerable: true, get: function () { return auth_1.hashPassword; } });
Object.defineProperty(exports, "comparePassword", { enumerable: true, get: function () { return auth_1.comparePassword; } });
Object.defineProperty(exports, "generateApiKey", { enumerable: true, get: function () { return auth_1.generateApiKey; } });
Object.defineProperty(exports, "generateBookingReference", { enumerable: true, get: function () { return auth_1.generateBookingReference; } });
Object.defineProperty(exports, "AuthUtils", { enumerable: true, get: function () { return auth_1.AuthUtils; } });
