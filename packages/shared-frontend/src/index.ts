// Re-export components
export * from "./components";

// Re-export hooks
export * from "./hooks";

// Re-export types
export * from "./types";

// API service exports
export * from "./api/base-api-service";

// Browser utilities
export * from "./utils/storage-utils";
export * from "./utils/browser-utils";

// MSW testing utilities - only export browser-safe parts
export { http, HttpResponse } from "msw";
// Note: Server and test setup should be imported separately in test files
// import { setupServer, setupMSW } from '@packages/shared-frontend/test/server'

// Re-export specific items from shared-utils
export {
  formatDate,
  capitalize,
  delay,
  debounce,
  formatError,
} from "@packages/shared-utils";

export type { ApiResponse, PaginatedResponse } from "@packages/shared-utils";

// Frontend-specific types
export interface FrontendUser {
  id: string;
  email: string;
  role: string;
  permissions?: string[];
  profile?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  preferences?: {
    theme?: "light" | "dark";
    language?: string;
    timezone?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
  };
}

export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

export interface LoadingState {
  isLoading: boolean;
  error?: AppError | null;
}
