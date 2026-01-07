/**
 * B2B API service - extends base API service with B2B-specific methods
 */

import { BaseApiService } from "@packages/shared-frontend";

class B2BApiService extends BaseApiService {
  constructor() {
    super({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.flybeth.com",
      storageKey: "flybeth-b2b-auth",
      onUnauthorized: () => {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },
    });
  }

  // Override auth endpoints for B2B
  async login(credentials: { email: string; password: string }) {
    const response = await this.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/partners/auth/login", credentials);

    this.setAuthTokens(response);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyName: string;
  }) {
    const response = await this.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/partners/auth/register", userData);

    this.setAuthTokens(response);
    return response;
  }

  async logout() {
    try {
      await this.post("/partners/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      this.clearAuthTokens();
    }
  }

  // Flight methods
  async searchFlights(searchParams: any) {
    return this.post("/flights/search", searchParams);
  }

  async getFlightDetails(flightId: string) {
    return this.get(`/flights/${flightId}`);
  }

  // Hotel methods
  async searchHotels(searchParams: any) {
    return this.post("/hotels/search", searchParams);
  }

  async getHotelDetails(hotelId: string) {
    return this.get(`/hotels/${hotelId}`);
  }

  // Car methods
  async searchCars(searchParams: any) {
    return this.post("/cars/search", searchParams);
  }

  async getCarDetails(carId: string) {
    return this.get(`/cars/${carId}`);
  }

  // Package methods
  async searchPackages(searchParams: any) {
    return this.post("/packages/search", searchParams);
  }

  async getPackageDetails(packageId: string) {
    return this.get(`/packages/${packageId}`);
  }

  // Attraction methods
  async searchAttractions(searchParams: any) {
    return this.post("/attractions/search", searchParams);
  }

  async getAttractionDetails(attractionId: string) {
    return this.get(`/attractions/${attractionId}`);
  }

  // Booking methods
  async createBooking(bookingData: any) {
    return this.post("/bookings", bookingData);
  }

  async getBookings() {
    return this.get("/bookings");
  }

  async getBookingDetails(bookingId: string) {
    return this.get(`/bookings/${bookingId}`);
  }

  async cancelBooking(bookingId: string) {
    return this.post(`/bookings/${bookingId}/cancel`);
  }

  // User methods
  async getUserProfile() {
    return this.get("/partners/profile");
  }

  async updateUserProfile(profileData: any) {
    return this.put("/partners/profile", profileData);
  }

  // B2B specific methods
  async getPartnerDashboard() {
    return this.get("/partners/dashboard");
  }

  async getCommissionReports(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/partners/commissions${query}`);
  }

  async getPartnerBookings(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/partners/bookings${query}`);
  }

  async getPartnerClients() {
    return this.get("/partners/clients");
  }

  async addPartnerClient(clientData: any) {
    return this.post("/partners/clients", clientData);
  }

  async updatePartnerClient(clientId: string, clientData: any) {
    return this.put(`/partners/clients/${clientId}`, clientData);
  }

  async getPartnerSettings() {
    return this.get("/partners/settings");
  }

  async updatePartnerSettings(settings: any) {
    return this.put("/partners/settings", settings);
  }
}

// Create and export singleton instance
const apiService = new B2BApiService();
export default apiService;
export { B2BApiService };
