import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FrontendUser } from "@packages/shared-frontend";

// Generic API service interface that different apps can implement
export interface AuthApiService {
  login: (
    email: string,
    password: string
  ) => Promise<{
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

  // Token refresh related functions - TODO: Implement properly
  refreshTokens: () => Promise<void>;
  checkTokenValidity: () => boolean;
  isTokenValid: boolean;
  getTimeUntilExpiry: () => number;
}

export function createAuthStore(
  apiService: AuthApiService,
  storeName: string = "auth"
) {
  return create<AuthState>()(
    persist(
      set => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        isTokenValid: false,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });

          try {
            const response = await apiService.login(email, password);

            const { user, accessToken, refreshToken } = response;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Login failed";
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        signup: async data => {
          set({ isLoading: true, error: null });

          try {
            const signupData = {
              ...data,
            };

            const response = await apiService.register(signupData);

            const { user, accessToken, refreshToken } = response;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Signup failed";
            set({
              error: errorMessage,
              isLoading: false,
            });
            throw error;
          }
        },

        logout: () => {
          if (apiService.logout) {
            apiService.logout().catch(console.error);
          }
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
          });
        },

        clearError: () => {
          set({ error: null });
        },

        // Token refresh related functions - TODO: Implement properly
        refreshTokens: async () => {
          // Stub implementation
          console.warn("refreshTokens not implemented");
        },

        checkTokenValidity: () => {
          // Stub implementation
          console.warn("checkTokenValidity not implemented");
          return false;
        },

        getTimeUntilExpiry: () => {
          // Stub implementation
          console.warn("getTimeUntilExpiry not implemented");
          return 0;
        },
      }),
      {
        name: `flybeth-${storeName}`,
        partialize: state => ({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  );
}

// Export types for convenience
export type { FrontendUser };
