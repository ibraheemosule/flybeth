import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FrontendUser, isTokenExpired } from "@packages/shared-frontend";
import apiService from "@/lib/api-service";

interface AuthState {
  user: FrontendUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: FrontendUser | null) => void;
  setTokens: (accessToken: string | null, refreshToken?: string | null) => void;
  clearError: () => void;
  checkTokenValidity: () => boolean;
  refreshTokens: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const { user, accessToken, refreshToken } = await apiService.login(
            email,
            password
          );

          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Login failed",
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      signup: async data => {
        try {
          set({ isLoading: true, error: null });

          const { user, accessToken, refreshToken } = await apiService.register(
            data
          );

          set({
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Registration failed",
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiService.logout();
        } catch (error) {
          console.error("Logout API call failed:", error);
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      setUser: (user: FrontendUser | null) => {
        set({ user });
      },

      setTokens: (accessToken: string | null, refreshToken?: string | null) => {
        set({
          accessToken,
          refreshToken:
            refreshToken !== undefined ? refreshToken : get().refreshToken,
          isAuthenticated: !!accessToken,
        });
      },

      clearError: () => {
        set({ error: null });
      },

      checkTokenValidity: () => {
        const { accessToken } = get();
        if (!accessToken) return false;

        return !isTokenExpired(accessToken, 5); // 5 minute buffer
      },

      refreshTokens: async () => {
        try {
          set({ isLoading: true });
          await apiService.forceRefresh();
          set({ isLoading: false });
        } catch (error: any) {
          console.error("Token refresh failed:", error);
          get().logout();
          set({ isLoading: false, error: error.message || "Session expired" });
          throw error;
        }
      },
    }),
    {
      name: "flybeth-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => state => {
        // Check token validity on rehydration
        if (state?.accessToken && isTokenExpired(state.accessToken)) {
          // Token is expired, clear auth state
          state.logout();
        }
      },
    }
  )
);

// Utility function to get current auth state
export const getAuthState = () => useAuthStore.getState();

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  const state = useAuthStore.getState();
  return (
    state.isAuthenticated &&
    !!state.accessToken &&
    !isTokenExpired(state.accessToken)
  );
};

// Export the store for use in components
export default useAuthStore;
