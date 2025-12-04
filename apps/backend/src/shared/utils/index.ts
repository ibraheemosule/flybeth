// Import dependencies
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config as dotenvConfig } from "dotenv";
import winston from "winston";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

// Re-export all common backend dependencies
export {
  express,
  cors,
  helmet,
  dotenvConfig,
  winston,
  createProxyMiddleware,
  rateLimit,
};
export type { Express, Request, Response, NextFunction } from "express";
export type { CorsOptions } from "cors";

// Export Redis utilities
export {
  RedisClient,
  SessionManager,
  CacheManager,
  RateLimiter,
} from "./redis";

// Export HTTP client utilities (backend-only)
export {
  HttpClient,
  createHttpClient,
  createServiceHttpClient,
  type HttpClientConfig,
} from "./http-client";

// Common middleware factory functions
export const createCorsMiddleware = (options?: any) => {
  return cors(
    options || {
      origin: process.env.CORS_ORIGIN || "http://localhost:5000",
      credentials: true,
    }
  );
};

export const createHelmetMiddleware = () => {
  return helmet({
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

// Logger factory
export const createLogger = (serviceName: string) => {
  return winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      new winston.transports.File({ filename: "logs/combined.log" }),
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });
};

// Export authentication utilities (backend-only)
export {
  hashPassword,
  comparePassword,
  generateApiKey,
  generateBookingReference,
  AuthUtils,
  type JWTPayload,
  type AuthConfig,
} from "./auth";
