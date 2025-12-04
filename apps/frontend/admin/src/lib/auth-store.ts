import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiService } from "@/lib/api-service";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: "CONSUMER" | "BUSINESS";
  avatar?: string;
  preferences?: Record<string, any>;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number;
  tokenRefreshPromise: Promise<void> | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshTokens: () => Promise<void>;
  checkTokenValidity: () => Promise<boolean>;
  updateLastActivity: () => void;
  silentRefresh: () => Promise<void>;

  // Token management
  isTokenValid: () => boolean;
  getTimeUntilExpiry: () => number;
}

const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds
const ACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      lastActivity: Date.now(),
      tokenRefreshPromise: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.instance.post("/auth/login", {
            email,
            password,
          });

          if (response.data.success) {
            const { user, accessToken, refreshToken } = response.data.data;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              lastActivity: Date.now(),
            });

            // Set up automatic token refresh
            get().setupTokenRefresh();

            // Set up activity tracking
            get().setupActivityTracking();
          } else {
            throw new Error(response.data.message || "Login failed");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message || error.message || "Login failed";
          set({
            error: message,
            isLoading: false,
            isAuthenticated: false,
            user: null,
            accessToken: null,
            refreshToken: null,
          });
          throw error;
        }
      },

      signup: async data => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiService.instance.post(
            "/auth/register",
            data
          );

          if (response.data.success) {
            const { user, accessToken, refreshToken } = response.data.data;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
              lastActivity: Date.now(),
            });

            // Set up automatic token refresh
            get().setupTokenRefresh();

            // Set up activity tracking
            get().setupActivityTracking();
          } else {
            throw new Error(response.data.message || "Registration failed");
          }
        } catch (error: any) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          const { refreshToken } = get();

          // Call logout API if we have a refresh token
          if (refreshToken) {
            await apiService.instance.post("/auth/logout", { refreshToken });
          }
        } catch (error) {
          console.warn("Logout API call failed:", error);
        } finally {
          // Clear state regardless of API call result
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            tokenRefreshPromise: null,
          });

          // Clear timers
          get().clearRefreshTimer();
          get().clearActivityTimer();
        }
      },

      clearError: () => set({ error: null }),

      refreshTokens: async () => {
        const { refreshToken, tokenRefreshPromise } = get();

        // If refresh is already in progress, wait for it
        if (tokenRefreshPromise) {
          return tokenRefreshPromise;
        }

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const refreshPromise = (async () => {
          try {
            const response = await apiService.instance.post("/auth/refresh", {
              refreshToken,
            });

            if (response.data.success) {
              const {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              } = response.data.data;

              set({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken || refreshToken,
                lastActivity: Date.now(),
                tokenRefreshPromise: null,
              });

              // Set up next refresh
              get().setupTokenRefresh();
            } else {
              throw new Error(response.data.message || "Token refresh failed");
            }
          } catch (error: any) {
            console.error("Token refresh failed:", error);
            set({ tokenRefreshPromise: null });

            // If refresh fails, logout user
            await get().logout();
            throw error;
          }
        })();

        set({ tokenRefreshPromise: refreshPromise });
        return refreshPromise;
      },

      checkTokenValidity: async () => {
        const { accessToken, isAuthenticated } = get();

        if (!isAuthenticated || !accessToken) {
          return false;
        }

        // Check if token is about to expire
        if (apiService.isTokenExpiringSoon(accessToken)) {
          try {
            await get().refreshTokens();
            return true;
          } catch (error) {
            return false;
          }
        }

        return true;
      },

      updateLastActivity: () => {
        set({ lastActivity: Date.now() });
      },

      silentRefresh: async () => {
        const { accessToken, isAuthenticated } = get();

        if (!isAuthenticated || !accessToken) {
          return;
        }

        try {
          if (apiService.isTokenExpiringSoon(accessToken)) {
            await get().refreshTokens();
          }
        } catch (error) {
          console.warn("Silent refresh failed:", error);
        }
      },

      isTokenValid: () => {
        const { accessToken, isAuthenticated } = get();

        if (!isAuthenticated || !accessToken) {
          return false;
        }

        return !apiService.isTokenExpiringSoon(accessToken);
      },

      getTimeUntilExpiry: () => {
        const { accessToken } = get();

        if (!accessToken) {
          return 0;
        }

        try {
          const decoded = JSON.parse(atob(accessToken.split(".")[1]));
          const expiryTime = decoded.exp * 1000;
          return Math.max(0, expiryTime - Date.now());
        } catch (error) {
          return 0;
        }
      },

      // Internal methods (not exposed in interface)
      setupTokenRefresh: () => {
        const { accessToken } = get();

        if (!accessToken) return;

        try {
          const timeUntilExpiry = get().getTimeUntilExpiry();
          const refreshTime = Math.max(1000, timeUntilExpiry - REFRESH_BUFFER);

          setTimeout(() => {
            get().silentRefresh();
          }, refreshTime);
        } catch (error) {
          console.error("Error setting up token refresh:", error);
        }
      },

      setupActivityTracking: () => {
        const events = [
          "mousedown",
          "mousemove",
          "keypress",
          "scroll",
          "touchstart",
          "click",
        ];

        const activityHandler = () => {
          get().updateLastActivity();
        };

        // Add activity listeners
        events.forEach(event => {
          document.addEventListener(event, activityHandler, true);
        });

        // Check for inactivity
        const checkActivity = () => {
          const { lastActivity } = get();
          const timeSinceLastActivity = Date.now() - lastActivity;

          if (timeSinceLastActivity > ACTIVITY_TIMEOUT) {
            // User has been inactive, perform silent refresh or logout
            get()
              .silentRefresh()
              .catch(() => {
                console.warn("User inactive and token refresh failed");
              });
          }
        };

        // Check activity every 5 minutes
        setInterval(checkActivity, 5 * 60 * 1000);
      },

      clearRefreshTimer: () => {
        // Timer cleanup would happen here if we stored timer IDs
      },

      clearActivityTimer: () => {
        // Activity listener cleanup would happen here
      },
    }),
    {
      name: "flybeth-auth",
      storage: createJSONStorage(() => {
        return {
          getItem: name => {
            // Get from localStorage for client-side
            if (typeof window !== "undefined") {
              return localStorage.getItem(name);
            }
            return null;
          },
          setItem: (name, value) => {
            // Set in localStorage for client-side
            if (typeof window !== "undefined") {
              localStorage.setItem(name, value);

              // Also set in cookie for SSR
              const parsed = JSON.parse(value);
              document.cookie = `flybeth-auth=${encodeURIComponent(
                JSON.stringify(parsed.state)
              )};path=/;max-age=${7 * 24 * 60 * 60};SameSite=Lax`;
            }
          },
          removeItem: name => {
            if (typeof window !== "undefined") {
              localStorage.removeItem(name);
              // Clear cookie
              document.cookie = `flybeth-auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax`;
            }
          },
        };
      }),
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        lastActivity: state.lastActivity,
      }),
    }
  )
);

// Initialize activity tracking when store is hydrated
if (typeof window !== "undefined") {
  useAuthStore.getState().setupActivityTracking();
}

// Set up periodic token checks
if (typeof window !== "undefined") {
  setInterval(() => {
    useAuthStore.getState().checkTokenValidity().catch(console.error);
  }, 60000); // Check every minute
}
