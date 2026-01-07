/**
 * Base API service for external API calls
 * This service provides common HTTP functionality that can be extended by each app
 */

export class ApiError extends Error {
  constructor(message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiConfig {
  baseUrl?: string;
  getToken?: () => string | null;
  onUnauthorized?: () => void;
  storageKey?: string;
}

export class BaseApiService {
  protected baseUrl: string;
  protected getToken: () => string | null;
  protected onUnauthorized: () => void;
  protected storageKey: string;

  constructor(config: ApiConfig = {}) {
    this.baseUrl =
      config.baseUrl ||
      process.env.NEXT_PUBLIC_API_URL ||
      "https://api.flybeth.com";
    this.getToken = config.getToken || this.getAuthToken.bind(this);
    this.onUnauthorized =
      config.onUnauthorized || this.handleUnauthorized.bind(this);
    this.storageKey = config.storageKey || "flybeth-auth";
  }

  protected async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // Add authorization token if available
    const token = this.getToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders,
      });

      if (response.status === 401) {
        this.onUnauthorized();
        throw new ApiError("Unauthorized", 401, "UNAUTHORIZED");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData.code
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Network error: ${error.message}`);
    }
  }

  protected getAuthToken(): string | null {
    try {
      // Try cookie first (SSR compatible)
      if (typeof document !== "undefined") {
        const cookieAuth = this.getCookie(this.storageKey);
        if (cookieAuth) {
          const authState = JSON.parse(cookieAuth);
          return authState.accessToken;
        }
      }

      // Fallback to localStorage (CSR)
      if (typeof window !== "undefined") {
        const localAuth = localStorage.getItem(this.storageKey);
        if (localAuth) {
          const authState = JSON.parse(localAuth);
          return authState.state?.accessToken || authState.accessToken;
        }
      }

      return null;
    } catch (error) {
      console.warn("Error getting auth token:", error);
      return null;
    }
  }

  protected getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  protected setAuthTokens(tokens: {
    accessToken: string;
    refreshToken: string;
    user?: any;
  }) {
    const authState = { ...tokens };

    // Set in localStorage for client-side
    if (typeof window !== "undefined") {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify({ state: authState })
      );
    }

    // Set in cookie for SSR compatibility
    if (typeof document !== "undefined") {
      document.cookie = `${this.storageKey}=${JSON.stringify(
        authState
      )}; path=/; max-age=${7 * 24 * 60 * 60}`; // 7 days
    }
  }

  protected clearAuthTokens() {
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.storageKey);
    }

    // Clear cookie
    if (typeof document !== "undefined") {
      document.cookie = `${this.storageKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  protected handleUnauthorized() {
    this.clearAuthTokens();
    // Default behavior - apps can override this
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  // Base authentication methods that can be overridden
  async login(credentials: { email: string; password: string }) {
    const response = await this.makeRequest<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    this.setAuthTokens(response);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await this.makeRequest<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    this.setAuthTokens(response);
    return response;
  }

  async logout() {
    try {
      await this.makeRequest("/auth/logout", { method: "POST" });
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      this.clearAuthTokens();
    }
  }

  // Base CRUD methods
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest(endpoint);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest(endpoint, {
      method: "DELETE",
    });
  }
}

// Helper function to create API error
export function createApiError(
  message: string,
  status?: number,
  code?: string
) {
  return new ApiError(message, status, code);
}
