import { axios, isTokenExpired } from '@packages/shared-utils';
/**
 * Base API Service with automatic token refresh and retry logic
 * Frontend-specific implementation with browser APIs
 */
export class BaseApiService {
    constructor(config) {
        this.isRefreshing = false;
        this.failedQueue = [];
        this.config = config;
        this.api = axios.create({
            baseURL: config.baseUrl,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        this.setupInterceptors();
    }
    setupInterceptors() {
        // Request interceptor to add auth token
        this.api.interceptors.request.use((config) => {
            const token = this.config.getToken();
            if (token && !config.url?.includes('/auth/refresh')) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));
        // Response interceptor for token refresh
        this.api.interceptors.response.use((response) => response, async (error) => {
            const originalRequest = error.config;
            if (error.response?.status === 401 && !originalRequest._retry) {
                if (originalRequest.url?.includes('/auth/refresh')) {
                    // Refresh token is also invalid
                    this.config.onUnauthorized();
                    return Promise.reject(error);
                }
                if (this.isRefreshing) {
                    // A refresh is already in progress, queue this request
                    return new Promise((resolve, reject) => {
                        this.failedQueue.push({ resolve, reject });
                    }).then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return this.api(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }
                originalRequest._retry = true;
                this.isRefreshing = true;
                try {
                    const refreshToken = this.config.getRefreshToken?.();
                    if (!refreshToken) {
                        this.config.onUnauthorized();
                        return Promise.reject(error);
                    }
                    const newTokens = await this.refreshToken(refreshToken);
                    // Update stored tokens
                    this.config.onTokenRefresh?.(newTokens);
                    // Process queued requests
                    this.processQueue(newTokens.accessToken, null);
                    // Retry original request
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    }
                    return this.api(originalRequest);
                }
                catch (refreshError) {
                    this.processQueue(null, refreshError);
                    this.config.onUnauthorized();
                    return Promise.reject(refreshError);
                }
                finally {
                    this.isRefreshing = false;
                }
            }
            return Promise.reject(error);
        });
    }
    async refreshToken(refreshToken) {
        const endpoint = this.config.refreshEndpoint || '/api/auth/refresh';
        // Use fetch for refresh to avoid circular interceptor calls
        const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });
        if (!response.ok) {
            throw new Error('Token refresh failed');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Token refresh failed');
        }
        return data;
    }
    processQueue(token, error) {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
        this.failedQueue = [];
    }
    /**
     * Check if current token is valid or needs refresh
     */
    isTokenValid() {
        const token = this.config.getToken();
        if (!token)
            return false;
        return !isTokenExpired(token, 5); // 5 minute buffer
    }
    /**
     * Manually refresh token
     */
    async forceRefresh() {
        const refreshToken = this.config.getRefreshToken?.();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        const newTokens = await this.refreshToken(refreshToken);
        this.config.onTokenRefresh?.(newTokens);
    }
    /**
     * Make authenticated API request
     */
    async makeRequest(url, config = {}) {
        return this.api.request({
            url,
            ...config,
        });
    }
    /**
     * Get axios instance for advanced usage
     */
    getInstance() {
        return this.api;
    }
    // Convenience methods
    async get(url, config) {
        return this.makeRequest(url, { ...config, method: 'GET' });
    }
    async post(url, data, config) {
        return this.makeRequest(url, { ...config, method: 'POST', data });
    }
    async put(url, data, config) {
        return this.makeRequest(url, { ...config, method: 'PUT', data });
    }
    async patch(url, data, config) {
        return this.makeRequest(url, { ...config, method: 'PATCH', data });
    }
    async delete(url, config) {
        return this.makeRequest(url, { ...config, method: 'DELETE' });
    }
}
