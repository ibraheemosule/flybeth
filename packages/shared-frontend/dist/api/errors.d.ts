export declare class FrontendApiError extends Error {
    statusCode?: number | undefined;
    code?: string | undefined;
    details?: any | undefined;
    constructor(message: string, statusCode?: number | undefined, code?: string | undefined, details?: any | undefined);
}
export declare class AuthenticationError extends FrontendApiError {
    constructor(message?: string);
}
export declare class AuthorizationError extends FrontendApiError {
    constructor(message?: string);
}
export declare class NetworkError extends FrontendApiError {
    constructor(message?: string);
}
export declare const createFrontendApiError: (error: any) => FrontendApiError;
export declare const getErrorDisplayMessage: (error: unknown) => string;
export declare const retryRequest: <T>(fn: () => Promise<T>, maxRetries?: number, delayMs?: number) => Promise<T>;
