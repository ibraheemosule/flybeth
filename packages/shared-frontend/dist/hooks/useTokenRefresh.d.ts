export interface TokenRefreshStore {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    refreshTokens: () => Promise<void>;
    logout: () => Promise<void>;
    checkTokenValidity: () => Promise<boolean>;
    isTokenValid: boolean;
    getTimeUntilExpiry: () => number;
}
interface UseTokenRefreshOptions {
    /**
     * Auth store instance with required methods
     */
    authStore: TokenRefreshStore;
    /**
     * Whether to enable automatic refresh
     * @default true
     */
    enableAutoRefresh?: boolean;
    /**
     * Refresh buffer time in minutes before expiry
     * @default 5
     */
    refreshBufferMinutes?: number;
    /**
     * Whether to show notifications on refresh
     * @default false
     */
    showNotifications?: boolean;
    /**
     * Callback when token refresh succeeds
     */
    onRefreshSuccess?: () => void;
    /**
     * Callback when token refresh fails
     */
    onRefreshError?: (error: Error) => void;
    /**
     * Callback when user is logged out due to refresh failure
     */
    onLogout?: () => void;
}
export declare const useTokenRefresh: (options: UseTokenRefreshOptions) => {
    /**
     * Manually trigger a token refresh
     */
    refreshToken: () => Promise<void>;
    /**
     * Check if token is valid and refresh if needed
     */
    checkAndRefresh: () => Promise<boolean>;
    /**
     * Current token validity status
     */
    isTokenValid: boolean;
    /**
     * Time until token expires (in milliseconds)
     */
    timeUntilExpiry: number;
    /**
     * Whether a refresh is currently scheduled
     */
    isRefreshScheduled: boolean;
    /**
     * Cancel scheduled refresh
     */
    cancelScheduledRefresh: () => void;
};
export {};
