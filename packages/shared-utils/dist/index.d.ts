export declare function formatDate(date: Date): string;
export declare function capitalize(str: string): string;
export * from './jwt';
export * from './http';
export { default as axios } from 'axios';
export type { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
export interface User {
    id: string;
    email: string;
    role: string;
    permissions?: string[];
    profile?: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
    };
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export declare class ApiError extends Error {
    statusCode?: number | undefined;
    code?: string | undefined;
    details?: any | undefined;
    constructor(message: string, statusCode?: number | undefined, code?: string | undefined, details?: any | undefined);
}
export declare const createApiError: (error: any) => ApiError;
export declare const delay: (ms: number) => Promise<void>;
export declare const debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => T;
export declare const formatError: (error: unknown) => string;
//# sourceMappingURL=index.d.ts.map