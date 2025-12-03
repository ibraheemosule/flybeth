export function formatDate(date) {
    return date.toLocaleDateString();
}
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export * from './jwt';
export * from './http';
// Re-export axios for frontend packages
export { default as axios } from 'axios';
// Common error types
export class ApiError extends Error {
    constructor(message, statusCode, code, details) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.name = 'ApiError';
    }
}
// Utility functions - backend safe (no DOM/browser APIs)
export const createApiError = (error) => {
    if (error.response) {
        const { status, data } = error.response;
        return new ApiError(data.message || data.error || 'API request failed', status, data.code, data);
    }
    if (error.request) {
        return new ApiError('Network error - no response received', 0, 'NETWORK_ERROR');
    }
    return new ApiError(error.message || 'Unknown error occurred');
};
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const debounce = (func, wait) => {
    let timeout;
    return ((...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    });
};
export const formatError = (error) => {
    if (error instanceof ApiError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unknown error occurred';
};
