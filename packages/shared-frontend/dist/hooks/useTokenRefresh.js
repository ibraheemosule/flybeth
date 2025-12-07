import { useEffect, useCallback, useRef } from "react";
export const useTokenRefresh = (options) => {
    const { authStore, enableAutoRefresh = true, refreshBufferMinutes = 5, showNotifications = false, onRefreshSuccess, onRefreshError, onLogout, } = options;
    const { isAuthenticated, accessToken, refreshTokens, logout, checkTokenValidity, isTokenValid, getTimeUntilExpiry, } = authStore;
    const refreshTimeoutRef = useRef(null);
    const lastRefreshRef = useRef(0);
    const clearRefreshTimeout = useCallback(() => {
        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current);
            refreshTimeoutRef.current = null;
        }
    }, []);
    const scheduleTokenRefresh = useCallback(() => {
        if (!enableAutoRefresh || !isAuthenticated || !accessToken) {
            return;
        }
        clearRefreshTimeout();
        try {
            const timeUntilExpiry = getTimeUntilExpiry();
            const bufferTime = refreshBufferMinutes * 60 * 1000;
            const refreshTime = Math.max(1000, timeUntilExpiry - bufferTime);
            if (refreshTime > 0) {
                refreshTimeoutRef.current = setTimeout(() => {
                    performTokenRefresh();
                }, refreshTime);
            }
            else {
                // Token is already expired or about to expire
                performTokenRefresh();
            }
        }
        catch (error) {
            console.error("Error scheduling token refresh:", error);
        }
    }, [
        enableAutoRefresh,
        isAuthenticated,
        accessToken,
        refreshBufferMinutes,
        getTimeUntilExpiry,
    ]);
    const performTokenRefresh = useCallback(async () => {
        const now = Date.now();
        // Prevent rapid refresh attempts (min 30 seconds between attempts)
        if (now - lastRefreshRef.current < 30000) {
            return;
        }
        lastRefreshRef.current = now;
        try {
            if (showNotifications) {
                console.log("Refreshing authentication token...");
            }
            await refreshTokens();
            if (showNotifications) {
                console.log("Token refreshed successfully");
            }
            onRefreshSuccess?.();
            // Schedule next refresh
            scheduleTokenRefresh();
        }
        catch (error) {
            console.error("Token refresh failed:", error);
            onRefreshError?.(error);
            if (showNotifications) {
                console.error("Session expired. Please log in again.");
            }
            // Logout user and redirect
            try {
                await logout();
                onLogout?.();
            }
            catch (logoutError) {
                console.error("Logout failed:", logoutError);
            }
        }
    }, [
        refreshTokens,
        onRefreshSuccess,
        onRefreshError,
        onLogout,
        logout,
        showNotifications,
        scheduleTokenRefresh,
    ]);
    const manualRefresh = useCallback(async () => {
        return performTokenRefresh();
    }, [performTokenRefresh]);
    const checkAndRefreshIfNeeded = useCallback(async () => {
        if (!isAuthenticated || !accessToken) {
            return false;
        }
        try {
            const isValid = await checkTokenValidity();
            if (!isValid) {
                await performTokenRefresh();
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Token check failed:", error);
            return false;
        }
    }, [isAuthenticated, accessToken, checkTokenValidity, performTokenRefresh]);
    // Set up automatic refresh on mount and token changes
    useEffect(() => {
        if (enableAutoRefresh && isAuthenticated && accessToken) {
            scheduleTokenRefresh();
        }
        else {
            clearRefreshTimeout();
        }
        return () => {
            clearRefreshTimeout();
        };
    }, [
        enableAutoRefresh,
        isAuthenticated,
        accessToken,
        scheduleTokenRefresh,
        clearRefreshTimeout,
    ]);
    // Set up activity-based refresh check
    useEffect(() => {
        if (!enableAutoRefresh || !isAuthenticated) {
            return;
        }
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                // Check token when user returns to the page
                checkAndRefreshIfNeeded();
            }
        };
        const handleFocus = () => {
            // Check token when window gets focus
            checkAndRefreshIfNeeded();
        };
        const handleBeforeUnload = () => {
            // Clear timeout when page is unloading
            clearRefreshTimeout();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleFocus);
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [
        enableAutoRefresh,
        isAuthenticated,
        checkAndRefreshIfNeeded,
        clearRefreshTimeout,
    ]);
    return {
        /**
         * Manually trigger a token refresh
         */
        refreshToken: manualRefresh,
        /**
         * Check if token is valid and refresh if needed
         */
        checkAndRefresh: checkAndRefreshIfNeeded,
        /**
         * Current token validity status
         */
        isTokenValid: isTokenValid,
        /**
         * Time until token expires (in milliseconds)
         */
        timeUntilExpiry: getTimeUntilExpiry(),
        /**
         * Whether a refresh is currently scheduled
         */
        isRefreshScheduled: refreshTimeoutRef.current !== null,
        /**
         * Cancel scheduled refresh
         */
        cancelScheduledRefresh: clearRefreshTimeout,
    };
};
