"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiService = void 0;
const shared_utils_1 = require("@packages/shared-utils");
class BaseApiService {
    constructor(config = {}) {
        this.config = {
            baseUrl: config.baseUrl || "http://localhost:5000",
            isProduction: config.isProduction || false,
            getToken: config.getToken || (() => null),
            onUnauthorized: config.onUnauthorized || (() => { }),
        };
        // Create axios instance with proper configuration
        this.client = shared_utils_1.axios.create({
            baseURL: this.config.isProduction ? this.config.baseUrl : "", // In dev, use relative URLs for proxy
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
        // Request interceptor to add auth token
        this.client.interceptors.request.use(config => {
            const token = this.config.getToken?.();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        // Response interceptor for error handling
        this.client.interceptors.response.use(response => response, error => {
            const message = error.response?.data?.message || error.message || "An error occurred";
            // Handle 401 errors
            if (error.response?.status === 401) {
                this.config.onUnauthorized?.();
            }
            throw new Error(`API Error: ${error.response?.status || 500} - ${message}`);
        });
    }
    // Generic request method using axios
    async makeRequest(endpoint, config) {
        const response = await this.client.request({
            url: endpoint,
            ...config,
        });
        return response.data;
    }
    // Common endpoints that all apps might use
    async getServiceStatus() {
        return this.makeRequest("/api/status", {
            method: "GET",
        });
    }
    async login(email, password) {
        return this.makeRequest("/api/auth/login", {
            method: "POST",
            data: { email, password },
        });
    }
    async getProfile() {
        return this.makeRequest("/api/auth/profile", {
            method: "GET",
        });
    }
}
exports.BaseApiService = BaseApiService;
exports.default = BaseApiService;
