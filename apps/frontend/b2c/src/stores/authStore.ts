import { createAuthStore, type AuthApiService } from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the AuthApiService interface
const authApiAdapter: AuthApiService = {
  login: apiService.login.bind(apiService),
  register: apiService.register.bind(apiService),
  logout: apiService.logout.bind(apiService),
};

// Create the auth store using the shared factory
export const useAuthStore = createAuthStore(authApiAdapter, "b2c-auth");
