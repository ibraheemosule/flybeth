import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
/**
 * Backend-safe HTTP client configuration
 * No browser-specific APIs (no localStorage, fetch, etc.)
 */
export interface HttpClientConfig {
    baseURL: string;
    timeout?: number;
    headers?: Record<string, string>;
    retryAttempts?: number;
    retryDelay?: number;
}
/**
 * Backend HTTP client for server-side API calls
 * No browser dependencies - safe for Node.js environments
 */
export declare class HttpClient {
    private client;
    private config;
    constructor(config: HttpClientConfig);
    private setupInterceptors;
    private shouldRetry;
    private delay;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    setAuthToken(token: string): void;
    clearAuthToken(): void;
    getInstance(): AxiosInstance;
}
export declare function createHttpClient(config: HttpClientConfig): HttpClient;
export declare function createServiceHttpClient(serviceName: string, baseURL?: string): HttpClient;
//# sourceMappingURL=http.d.ts.map