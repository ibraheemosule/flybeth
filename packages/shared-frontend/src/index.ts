// Re-export components
export * from './components';

// API and error handling
export * from './api/base-api-service'
export * from './api/errors'

// Browser utilities  
export * from './utils/storage-utils'
export * from './utils/browser-utils'

// Re-export only specific items from shared-utils to avoid conflicts
export { 
  formatDate, 
  capitalize, 
  decodeJWT, 
  isTokenExpired, 
  getTimeUntilExpiry,
  getUserFromToken,
  hasRole,
  User,
  AuthTokens,
  ApiResponse,
  PaginatedResponse,
  delay,
  debounce,
  formatError
} from '@packages/shared-utils'

// Frontend-specific types
export interface FrontendUser {
  id: string
  email: string
  role: string
  permissions?: string[]
  profile?: {
    firstName?: string
    lastName?: string
    avatar?: string
  }
  preferences?: {
    theme?: 'light' | 'dark'
    language?: string
    timezone?: string
    notifications?: {
      email?: boolean
      push?: boolean
      sms?: boolean
    }
  }
  sessions?: {
    current?: {
      id: string
      device: string
      location: string
      lastActivity: string
    }
    active?: number
  }
}

export interface AuthState {
  user: FrontendUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}