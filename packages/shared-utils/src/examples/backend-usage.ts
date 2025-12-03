/**
 * Example: Backend service using shared HTTP client
 * This would go in your backend services
 */

import { createServiceHttpClient, HttpClient, createApiError } from '@packages/shared-utils'

export class AuthServiceClient {
  private http: HttpClient

  constructor(baseURL?: string) {
    this.http = createServiceHttpClient('auth', baseURL)
  }

  async validateToken(token: string): Promise<{ valid: boolean; user?: any }> {
    try {
      this.http.setAuthToken(token)
      const response = await this.http.get('/api/auth/validate')
      return response.data
    } catch (error) {
      throw createApiError(error)
    }
  }

  async getUser(userId: string): Promise<any> {
    try {
      const response = await this.http.get(`/api/users/${userId}`)
      return response.data
    } catch (error) {
      throw createApiError(error)
    }
  }
}

export class FlightServiceClient {
  private http: HttpClient

  constructor(baseURL?: string) {
    this.http = createServiceHttpClient('flight', baseURL)
  }

  async searchFlights(query: any): Promise<any> {
    try {
      const response = await this.http.post('/api/flights/search', query)
      return response.data
    } catch (error) {
      throw createApiError(error)
    }
  }

  async bookFlight(bookingData: any, authToken: string): Promise<any> {
    try {
      this.http.setAuthToken(authToken)
      const response = await this.http.post('/api/flights/book', bookingData)
      return response.data
    } catch (error) {
      throw createApiError(error)
    }
  }
}

// Usage in your backend services:
// const authClient = new AuthServiceClient()
// const flightClient = new FlightServiceClient()
// 
// const user = await authClient.getUser('123')
// const flights = await flightClient.searchFlights({ origin: 'NYC', destination: 'LAX' })