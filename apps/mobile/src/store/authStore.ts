import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import {
  apiService,
  AuthResponse,
  SignupData,
  LoginData,
} from "../services/api";

interface User {
  id: string;
  email: string;
  userType: "CONSUMER" | "BUSINESS";
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,

  signup: async (data: SignupData) => {
    try {
      set({ isLoading: true, error: null });
      const response: AuthResponse = await apiService.signup(data);

      // Store token securely
      await SecureStore.setItemAsync("authToken", response.token);

      set({
        user: response.user,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Signup failed";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (data: LoginData) => {
    try {
      set({ isLoading: true, error: null });
      const response: AuthResponse = await apiService.login(data);

      // Store token securely
      await SecureStore.setItemAsync("authToken", response.token);

      set({
        user: response.user,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Login failed";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      // Remove token from secure storage
      await SecureStore.deleteItemAsync("authToken");
      set({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  checkAuthStatus: async () => {
    try {
      set({ isLoading: true });

      const token = await SecureStore.getItemAsync("authToken");

      if (!token) {
        set({ user: null, isLoading: false });
        return;
      }

      // Token exists, but we don't have user info stored
      // In a real app, you might want to validate the token with the server
      // For now, we'll just clear it and require re-login
      await SecureStore.deleteItemAsync("authToken");
      set({ user: null, isLoading: false });
    } catch (error) {
      console.error("Auth check error:", error);
      set({ user: null, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
