/**
 * Example: How to use shared HTTP utilities in backend services
 */

import { createServiceHttpClient, HttpClient, createApiError } from '@packages/shared-utils'

export class ExternalServiceClient {
  private http: HttpClient

  constructor() {
    // Backend gets axios through shared-utils
    this.http = createServiceHttpClient('external-api', process.env.EXTERNAL_API_URL)
  }

  async makeExternalCall(data: any): Promise<any> {
    try {
      const response = await this.http.post('/api/external', data)
      return response.data
    } catch (error) {
      throw createApiError(error)
    }
  }
}

// Usage in your backend services:
// const client = new ExternalServiceClient()
// const result = await client.makeExternalCall({ key: 'value' })