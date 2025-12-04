"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = exports.debounce = exports.delay = exports.createApiError = exports.ApiError = exports.axios = exports.tripSchema = exports.hotelSearchSchema = exports.flightSearchSchema = exports.registerSchema = exports.loginSchema = void 0;
exports.formatDate = formatDate;
exports.capitalize = capitalize;
exports.formatPrice = formatPrice;
function formatDate(date) {
    return date.toLocaleDateString();
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function formatPrice(amount, currency = "USD") {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(amount);
}
__exportStar(require("./jwt"), exports);
__exportStar(require("./constants"), exports);
// Re-export schemas from shared-schemas for convenience
var shared_schemas_1 = require("@packages/shared-schemas");
Object.defineProperty(exports, "loginSchema", { enumerable: true, get: function () { return shared_schemas_1.loginSchema; } });
Object.defineProperty(exports, "registerSchema", { enumerable: true, get: function () { return shared_schemas_1.registerSchema; } });
Object.defineProperty(exports, "flightSearchSchema", { enumerable: true, get: function () { return shared_schemas_1.flightSearchSchema; } });
Object.defineProperty(exports, "hotelSearchSchema", { enumerable: true, get: function () { return shared_schemas_1.hotelSearchSchema; } });
Object.defineProperty(exports, "tripSchema", { enumerable: true, get: function () { return shared_schemas_1.tripSchema; } });
__exportStar(require("./auth"), exports);
// Re-export axios for frontend packages
var axios_1 = require("axios");
Object.defineProperty(exports, "axios", { enumerable: true, get: function () { return __importDefault(axios_1).default; } });
// Common error types
class ApiError extends Error {
    constructor(message, statusCode, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = "ApiError";
    }
}
exports.ApiError = ApiError;
// Utility functions - backend safe (no DOM/browser APIs)
const createApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        return new ApiError(data.message || data.error || "API request failed", status, data.code, data);
    }
    if (error.request) {
        return new ApiError("Network error - no response received", 0, "NETWORK_ERROR");
    }
    return new ApiError(error.message || "Unknown error occurred");
};
exports.createApiError = createApiError;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
const debounce = (func, wait) => {
    let timeout;
    return ((...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    });
};
exports.debounce = debounce;
const formatError = (error) => {
    if (error instanceof ApiError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
};
exports.formatError = formatError;
