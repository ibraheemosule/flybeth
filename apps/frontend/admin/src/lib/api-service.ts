import {
  BaseApiService,
  FrontendUser,
  ApiResponse,
  createFrontendApiError as createApiError,
} from "@packages/shared-frontend";
import { FrontendApiError as ApiError } from "@packages/shared-frontend";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any;
}

class ApiService extends BaseApiService {
  constructor() {
    const isProduction = process.env.NODE_ENV === "production";
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

    super({
      baseUrl,
      isProduction,
      getToken: () => this.getAuthState()?.accessToken || null,
      getRefreshToken: () => this.getAuthState()?.refreshToken || null,
      onUnauthorized: () => this.handleLogout(),
      onTokenRefresh: tokens => this.updateAuthTokens(tokens),
      refreshEndpoint: "/api/auth/refresh",
    });
  }

  private getAuthState(): AuthState | null {
    try {
      // Try cookie first (SSR compatible)
      if (typeof document !== "undefined") {
        const cookieAuth = this.getCookie("travel-admin-auth");
        if (cookieAuth) {
          return JSON.parse(cookieAuth);
        }
      }

      // Fallback to localStorage (CSR)
      if (typeof window !== "undefined") {
        const localAuth = localStorage.getItem("travel-admin-auth");
        if (localAuth) {
          const parsed = JSON.parse(localAuth);
          return parsed.state || parsed;
        }
      }

      return null;
    } catch (error) {
      console.error("Error parsing auth state:", error);
      return null;
    }
  }

  private updateAuthTokens(tokens: {
    accessToken: string;
    refreshToken?: string;
  }) {
    const currentState = this.getAuthState();
    if (currentState) {
      this.updateAuthState({
        ...currentState,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken || currentState.refreshToken,
      });
    }
  }

  private updateAuthState(newAuthState: AuthState) {
    try {
      const authData = JSON.stringify(newAuthState);

      // Update cookie (SSR compatible)
      if (typeof document !== "undefined") {
        document.cookie = `travel-admin-auth=${authData}; path=/; max-age=${
          7 * 24 * 60 * 60
        }; SameSite=Strict`;
      }

      // Update localStorage (CSR)
      if (typeof window !== "undefined") {
        const zustandData = {
          state: newAuthState,
          version: 0,
        };
        localStorage.setItem("travel-admin-auth", JSON.stringify(zustandData));
      }

      // Update Zustand store if available
      if (
        typeof window !== "undefined" &&
        (window as any).useAuthStore?.getState
      ) {
        const store = (window as any).useAuthStore.getState();
        store.setTokens(newAuthState.accessToken, newAuthState.refreshToken);
        if (newAuthState.user) {
          store.setUser(newAuthState.user);
        }
      }
    } catch (error) {
      console.error("Error updating auth state:", error);
    }
  }

  private getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop()?.split(";").shift() || "");
    }
    return null;
  }

  private handleLogout() {
    // Clear cookies
    if (typeof document !== "undefined") {
      document.cookie =
        "travel-admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("travel-admin-auth");
    }

    // Update Zustand store
    if (
      typeof window !== "undefined" &&
      (window as any).useAuthStore?.getState
    ) {
      const store = (window as any).useAuthStore.getState();
      store.logout();
    }

    // Redirect to login
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  }

  // Admin specific methods
  async login(
    email: string,
    password: string,
    mfaCode?: string
  ): Promise<{
    user: FrontendUser;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const response = await this.post("/api/auth/login", {
        email,
        password,
        mfaCode,
      });

      if (response.data.success) {
        const { user, accessToken, refreshToken } = response.data;

        // Update auth state
        this.updateAuthState({ accessToken, refreshToken, user });

        return { user, accessToken, refreshToken };
      } else {
        throw new ApiError(response.data.message || "Login failed");
      }
    } catch (error) {
      throw createApiError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.post("/api/auth/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      this.handleLogout();
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.get<ApiResponse<User>>("/api/auth/me");

      if (response.data.success && response.data.data) {
        return response.data.data;
      } else {
        throw new ApiError(response.data.message || "Failed to fetch user");
      }
    } catch (error) {
      throw createApiError(error);
    }
  }

  // Admin specific methods for system management
  async getUsers(params?: any) {
    try {
      const response = await this.get("/api/admin/users", { params });
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async createUser(userData: any) {
    try {
      const response = await this.post("/api/admin/users", userData);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async updateUser(userId: string, userData: any) {
    try {
      const response = await this.patch(`/api/admin/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async deleteUser(userId: string) {
    try {
      const response = await this.delete(`/api/admin/users/${userId}`);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async getSystemStats() {
    try {
      const response = await this.get("/api/admin/stats");
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async getAuditLogs(params?: any) {
    try {
      const response = await this.get("/api/admin/audit-logs", { params });
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async getAllBookings(params?: any) {
    try {
      const response = await this.get("/api/admin/bookings", { params });
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async updateBookingStatus(bookingId: string, status: string) {
    try {
      const response = await this.patch(
        `/api/admin/bookings/${bookingId}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async getSystemConfiguration() {
    try {
      const response = await this.get("/api/admin/config");
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async updateSystemConfiguration(config: any) {
    try {
      const response = await this.patch("/api/admin/config", config);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async getCompanies(params?: any) {
    try {
      const response = await this.get("/api/admin/companies", { params });
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async createCompany(companyData: any) {
    try {
      const response = await this.post("/api/admin/companies", companyData);
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async updateCompany(companyId: string, companyData: any) {
    try {
      const response = await this.patch(
        `/api/admin/companies/${companyId}`,
        companyData
      );
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }

  async suspendCompany(companyId: string) {
    try {
      const response = await this.patch(
        `/api/admin/companies/${companyId}/suspend`
      );
      return response.data;
    } catch (error) {
      throw createApiError(error);
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
export { ApiService };
