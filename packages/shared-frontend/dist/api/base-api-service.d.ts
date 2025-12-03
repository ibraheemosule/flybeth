import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from '@packages/shared-utils';
export interface ApiServiceConfig {
    baseUrl: string;
    isProduction: boolean;
    getToken: () => string | null;
    getRefreshToken?: () => string | null;
    onUnauthorized: () => void;
    onTokenRefresh?: (tokens: {
        accessToken: string;
        refreshToken?: string;
    }) => void;
    refreshEndpoint?: string;
}
export interface RefreshTokenResponse {
    success: boolean;
    accessToken: string;
    refreshToken?: string;
    message?: string;
}
/**
 * Base API Service with automatic token refresh and retry logic
 * Frontend-specific implementation with browser APIs
 */
export declare class BaseApiService {
    protected api: AxiosInstance;
    protected config: ApiServiceConfig;
    private isRefreshing;
    private failedQueue;
    constructor(config: ApiServiceConfig);
    private setupInterceptors;
    private refreshToken;
    private processQueue;
    /**
     * Check if current token is valid or needs refresh
     */
    isTokenValid(): boolean;
    /**
     * Manually refresh token
     */
    forceRefresh(): Promise<void>;
    /**
     * Make authenticated API request
     */
    makeRequest<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    /**
     * Get axios instance for advanced usage
     */
    getInstance(): AxiosInstance;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
}
