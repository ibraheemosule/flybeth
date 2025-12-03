import { ApiResponse, User, formatError } from '@packages/shared-utils'

// Frontend-specific error types
export class FrontendApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'FrontendApiError'
  }
}

export class AuthenticationError extends FrontendApiError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTH_ERROR')
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends FrontendApiError {
  constructor(message = 'Access denied') {
    super(message, 403, 'ACCESS_DENIED')
    this.name = 'AuthorizationError'
  }
}

export class NetworkError extends FrontendApiError {
  constructor(message = 'Network error occurred') {
    super(message, 0, 'NETWORK_ERROR')
    this.name = 'NetworkError'
  }
}

// Frontend-specific error handling
export const createFrontendApiError = (error: any): FrontendApiError => {
  if (error.response) {
    const { status, data } = error.response
    
    if (status === 401) {
      return new AuthenticationError(data.message || 'Authentication required')
    }
    
    if (status === 403) {
      return new AuthorizationError(data.message || 'Access denied')
    }
    
    return new FrontendApiError(
      data.message || data.error || 'API request failed',
      status,
      data.code,
      data
    )
  }
  
  if (error.request) {
    return new NetworkError('Network error - no response received')
  }
  
  return new FrontendApiError(error.message || 'Unknown error occurred')
}

// Error display utilities for frontend
export const getErrorDisplayMessage = (error: unknown): string => {
  if (error instanceof AuthenticationError) {
    return 'Please log in to continue'
  }
  
  if (error instanceof AuthorizationError) {
    return 'You do not have permission to perform this action'
  }
  
  if (error instanceof NetworkError) {
    return 'Please check your internet connection and try again'
  }
  
  if (error instanceof FrontendApiError) {
    return error.message
  }
  
  return formatError(error)
}

// Retry utility for failed requests
export const retryRequest = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: any
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      
      // Don't retry on authentication/authorization errors
      if (error instanceof AuthenticationError || error instanceof AuthorizationError) {
        throw error
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt))
    }
  }
  
  throw lastError
}