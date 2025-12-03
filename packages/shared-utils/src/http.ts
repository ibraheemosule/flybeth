import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

/**
 * Backend-safe HTTP client configuration
 * No browser-specific APIs (no localStorage, fetch, etc.)
 */
export interface HttpClientConfig {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
  retryAttempts?: number
  retryDelay?: number
}

/**
 * Backend HTTP client for server-side API calls
 * No browser dependencies - safe for Node.js environments
 */
export class HttpClient {
  private client: AxiosInstance
  private config: HttpClientConfig

  constructor(config: HttpClientConfig) {
    this.config = {
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    }

    this.client = axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as AxiosRequestConfig & { _retryCount?: number }
        
        if (!config || !this.shouldRetry(error)) {
          return Promise.reject(error)
        }

        config._retryCount = config._retryCount || 0

        if (config._retryCount < (this.config.retryAttempts || 3)) {
          config._retryCount++
          
          // Wait before retrying
          await this.delay(this.config.retryDelay || 1000)
          
          return this.client(config)
        }

        return Promise.reject(error)
      }
    )
  }

  private shouldRetry(error: AxiosError): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status < 600) ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ETIMEDOUT'
    )
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // HTTP methods
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }

  // Set auth token for requests
  setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  // Remove auth token
  clearAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization']
  }

  // Get the axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.client
  }
}

// Factory function to create HTTP clients
export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config)
}

// Default client factory for services
export function createServiceHttpClient(serviceName: string, baseURL?: string): HttpClient {
  return new HttpClient({
    baseURL: baseURL || process.env[`${serviceName.toUpperCase()}_SERVICE_URL`] || 'http://localhost:3000',
    headers: {
      'X-Service-Name': serviceName,
      'User-Agent': `${serviceName}-service/1.0.0`
    }
  })
}