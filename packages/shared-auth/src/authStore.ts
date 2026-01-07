import { create } from "zustand";
import type { AuthState, AuthApiService, FrontendUser } from "./types";

export function createAuthStore(apiService: AuthApiService, storeName: string) {
  return create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.login(email, password);
        set({ user: result.user, isAuthenticated: true, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    register: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.register(email, password);
        set({ user: result.user, isAuthenticated: true, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    logout: () => {
      apiService.logout();
      set({ user: null, isAuthenticated: false });
    },
  }));
}
