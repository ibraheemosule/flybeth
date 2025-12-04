import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/services/api";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: "CONSUMER" | "BUSINESS";
}

interface AuthState {
  user: User | null;
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
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authApi.login({ email, password });

          if (response.data.success) {
            const { user, accessToken, refreshToken } = response.data.data;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error(response.data.message || "Login failed");
          }
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
            userType: "CONSUMER" as const,
          };

          const response = await authApi.signup(signupData);

          if (response.data.success) {
            const { user, accessToken, refreshToken } = response.data.data;

            set({
              user,
              accessToken,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error(response.data.message || "Signup failed");
          }
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
    }),
    {
      name: "flybeth-auth",
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
