export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export * from './jwt';
export * from './http';

// Re-export axios for frontend packages
export { default as axios } from 'axios';
export type { 
  AxiosInstance, 
  AxiosResponse, 
  AxiosError, 
  AxiosRequestConfig 
} from 'axios';

// Common types and utilities
export interface User {
  id: string
  email: string
  role: string
  permissions?: string[]
  profile?: {
    firstName?: string
    lastName?: string
    avatar?: string
  }
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Common error types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Utility functions - backend safe (no DOM/browser APIs)
export const createApiError = (error: any): ApiError => {
  if (error.response) {
    const { status, data } = error.response
    return new ApiError(
      data.message || data.error || 'API request failed',
      status,
      data.code,
      data
    )
  }
  
  if (error.request) {
    return new ApiError('Network error - no response received', 0, 'NETWORK_ERROR')
  }
  
  return new ApiError(error.message || 'Unknown error occurred')
}

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: ReturnType<typeof setTimeout> | undefined

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

export const formatError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unknown error occurred'
}