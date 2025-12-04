"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
exports.createHttpClient = createHttpClient;
exports.createServiceHttpClient = createServiceHttpClient;
const axios_1 = __importDefault(require("axios"));
/**
 * Backend HTTP client for server-side API calls
 * No browser dependencies - safe for Node.js environments
 */
class HttpClient {
    constructor(config) {
        this.config = {
            timeout: 10000,
            retryAttempts: 3,
            retryDelay: 1000,
            ...config
        };
        this.client = axios_1.default.create({
            baseURL: this.config.baseURL,
            timeout: this.config.timeout,
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers
            }
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use((config) => config, (error) => Promise.reject(error));
        // Response interceptor with retry logic
        this.client.interceptors.response.use((response) => response, async (error) => {
            const config = error.config;
            if (!config || !this.shouldRetry(error)) {
                return Promise.reject(error);
            }
            config._retryCount = config._retryCount || 0;
            if (config._retryCount < (this.config.retryAttempts || 3)) {
                config._retryCount++;
                // Wait before retrying
                await this.delay(this.config.retryDelay || 1000);
                return this.client(config);
            }
            return Promise.reject(error);
        });
    }
    shouldRetry(error) {
        // Retry on network errors or 5xx server errors
        return (!error.response ||
            (error.response.status >= 500 && error.response.status < 600) ||
            error.code === 'ECONNABORTED' ||
            error.code === 'ETIMEDOUT');
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // HTTP methods
    async get(url, config) {
        return this.client.get(url, config);
    }
    async post(url, data, config) {
        return this.client.post(url, data, config);
    }
    async put(url, data, config) {
        return this.client.put(url, data, config);
    }
    async patch(url, data, config) {
        return this.client.patch(url, data, config);
    }
    async delete(url, config) {
        return this.client.delete(url, config);
    }
    // Set auth token for requests
    setAuthToken(token) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    // Remove auth token
    clearAuthToken() {
        delete this.client.defaults.headers.common['Authorization'];
    }
    // Get the axios instance for advanced usage
    getInstance() {
        return this.client;
    }
}
exports.HttpClient = HttpClient;
// Factory function to create HTTP clients
function createHttpClient(config) {
    return new HttpClient(config);
}
// Default client factory for services
function createServiceHttpClient(serviceName, baseURL) {
    return new HttpClient({
        baseURL: baseURL || process.env[`${serviceName.toUpperCase()}_SERVICE_URL`] || 'http://localhost:3000',
        headers: {
            'X-Service-Name': serviceName,
            'User-Agent': `${serviceName}-service/1.0.0`
        }
    });
}
