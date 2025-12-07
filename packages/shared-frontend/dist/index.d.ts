export * from "./components";
export * from "./hooks";
export * from "./types";
export * from "./api/base-api-service";
export * from "./api/errors";
export * from "./utils/storage-utils";
export * from "./utils/browser-utils";
export { http, HttpResponse } from "msw";
export { formatDate, capitalize, decodeJWT, isTokenExpired, getTimeUntilExpiry, getUserFromToken, hasRole, delay, debounce, formatError, } from "@packages/shared-utils";
export type { AuthTokens, ApiResponse, PaginatedResponse, } from "@packages/shared-utils";
export interface FrontendUser {
    id: string;
    email: string;
    role: string;
    permissions?: string[];
    profile?: {
        firstName?: string;
        lastName?: string;
        avatar?: string;
    };
    preferences?: {
        theme?: "light" | "dark";
        language?: string;
        timezone?: string;
        notifications?: {
            email?: boolean;
            push?: boolean;
            sms?: boolean;
        };
    };
    sessions?: {
        current?: {
            id: string;
            device: string;
            location: string;
            lastActivity: string;
        };
        active?: number;
    };
}
export interface AuthState {
    user: FrontendUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
