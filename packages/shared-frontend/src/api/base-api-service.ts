import { axios, AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, decodeJWT, isTokenExpired } from '@packages/shared-utils'

export interface ApiServiceConfig {
  baseUrl: string
  isProduction: boolean
  getToken: () => string | null
  getRefreshToken?: () => string | null
  onUnauthorized: () => void
  onTokenRefresh?: (tokens: { accessToken: string; refreshToken?: string }) => void
  refreshEndpoint?: string
}

export interface RefreshTokenResponse {
  success: boolean
  accessToken: string
  refreshToken?: string
  message?: string
}

/**
 * Base API Service with automatic token refresh and retry logic
 * Frontend-specific implementation with browser APIs
 */
export class BaseApiService {
  protected api: AxiosInstance
  protected config: ApiServiceConfig
  private isRefreshing = false
  private failedQueue: Array<{
    resolve: (value: any) => void
    reject: (error: any) => void
  }> = []

  constructor(config: ApiServiceConfig) {
    this.config = config
    
    this.api = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = this.config.getToken()
        if (token && !config.url?.includes('/auth/refresh')) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor for token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (originalRequest.url?.includes('/auth/refresh')) {
            // Refresh token is also invalid
            this.config.onUnauthorized()
            return Promise.reject(error)
          }

          if (this.isRefreshing) {
            // A refresh is already in progress, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject })
            }).then(token => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`
              }
              return this.api(originalRequest)
            }).catch(err => {
              return Promise.reject(err)
            })
          }

          originalRequest._retry = true
          this.isRefreshing = true

          try {
            const refreshToken = this.config.getRefreshToken?.()
            if (!refreshToken) {
              this.config.onUnauthorized()
              return Promise.reject(error)
            }

            const newTokens = await this.refreshToken(refreshToken)
            
            // Update stored tokens
            this.config.onTokenRefresh?.(newTokens)

            // Process queued requests
            this.processQueue(newTokens.accessToken, null)

            // Retry original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
            }
            
            return this.api(originalRequest)
          } catch (refreshError) {
            this.processQueue(null, refreshError)
            this.config.onUnauthorized()
            return Promise.reject(refreshError)
          } finally {
            this.isRefreshing = false
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const endpoint = this.config.refreshEndpoint || '/api/auth/refresh'
    
    // Use fetch for refresh to avoid circular interceptor calls
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      throw new Error('Token refresh failed')
    }

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.message || 'Token refresh failed')
    }

    return data
  }

  private processQueue(token: string | null, error: any) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })
    
    this.failedQueue = []
  }

  /**
   * Check if current token is valid or needs refresh
   */
  public isTokenValid(): boolean {
    const token = this.config.getToken()
    if (!token) return false
    
    return !isTokenExpired(token, 5) // 5 minute buffer
  }

  /**
   * Manually refresh token
   */
  public async forceRefresh(): Promise<void> {
    const refreshToken = this.config.getRefreshToken?.()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const newTokens = await this.refreshToken(refreshToken)
    this.config.onTokenRefresh?.(newTokens)
  }

  /**
   * Make authenticated API request
   */
  public async makeRequest<T = any>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    return this.api.request<T>({
      url,
      ...config,
    })
  }

  /**
   * Get axios instance for advanced usage
   */
  public getInstance(): AxiosInstance {
    return this.api
  }

  // Convenience methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(url, { ...config, method: 'GET' })
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(url, { ...config, method: 'POST', data })
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(url, { ...config, method: 'PUT', data })
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(url, { ...config, method: 'PATCH', data })
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(url, { ...config, method: 'DELETE' })
  }
}