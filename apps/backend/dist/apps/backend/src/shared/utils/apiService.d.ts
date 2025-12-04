import { AxiosInstance, AxiosRequestConfig } from "@packages/shared-utils";
export interface ApiServiceConfig {
    baseUrl?: string;
    isProduction?: boolean;
    getToken?: () => string | null;
    onUnauthorized?: () => void;
}
export declare class BaseApiService {
    protected client: AxiosInstance;
    private config;
    constructor(config?: ApiServiceConfig);
    protected makeRequest<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T>;
    getServiceStatus(): Promise<unknown>;
    login(email: string, password: string): Promise<unknown>;
    getProfile(): Promise<unknown>;
}
export default BaseApiService;
