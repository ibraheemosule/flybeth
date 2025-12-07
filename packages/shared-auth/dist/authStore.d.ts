import { FrontendUser } from "@packages/shared-frontend";
export interface AuthApiService {
    login: (email: string, password: string) => Promise<{
        user: FrontendUser;
        accessToken: string;
        refreshToken: string;
    }>;
    register: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => Promise<{
        user: FrontendUser;
        accessToken: string;
        refreshToken: string;
    }>;
    logout?: () => Promise<void>;
}
export interface AuthState {
    user: FrontendUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
    }) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    refreshTokens: () => Promise<void>;
    checkTokenValidity: () => boolean;
    isTokenValid: boolean;
    getTimeUntilExpiry: () => number;
}
export declare function createAuthStore(apiService: AuthApiService, storeName?: string): import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: FrontendUser | null;
            accessToken: string | null;
            refreshToken: string | null;
            isAuthenticated: boolean;
        }>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthState, {
            user: FrontendUser | null;
            accessToken: string | null;
            refreshToken: string | null;
            isAuthenticated: boolean;
        }>>;
    };
}>;
export type { FrontendUser };
//# sourceMappingURL=authStore.d.ts.map