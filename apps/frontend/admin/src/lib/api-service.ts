/**
 * Admin API service - extends base API service with admin-specific methods
 */

import { BaseApiService } from "@packages/shared-frontend";

class AdminApiService extends BaseApiService {
  constructor() {
    super({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.flybeth.com",
      storageKey: "flybeth-admin-auth",
      onUnauthorized: () => {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },
    });
  }

  // Override auth endpoints for Admin
  async login(credentials: { email: string; password: string }) {
    const response = await this.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/admin/auth/login", credentials);

    this.setAuthTokens(response);
    return response;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const response = await this.post<{
      accessToken: string;
      refreshToken: string;
      user: any;
    }>("/admin/auth/register", userData);

    this.setAuthTokens(response);
    return response;
  }

  async logout() {
    try {
      await this.post("/admin/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      this.clearAuthTokens();
    }
  }

  // Dashboard
  async getDashboardStats() {
    return this.get("/admin/dashboard/stats");
  }

  // User Management
  async getUsers(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/users${query}`);
  }

  async getAllUsers() {
    return this.get("/admin/users");
  }

  async getUserDetails(userId: string) {
    return this.get(`/admin/users/${userId}`);
  }

  async createUser(userData: any) {
    return this.post("/admin/users", userData);
  }

  async updateUser(userId: string, userData: any) {
    return this.put(`/admin/users/${userId}`, userData);
  }

  async deleteUser(userId: string) {
    return this.delete(`/admin/users/${userId}`);
  }

  async banUser(userId: string) {
    return this.post(`/admin/users/${userId}/ban`);
  }

  async unbanUser(userId: string) {
    return this.post(`/admin/users/${userId}/unban`);
  }

  // Booking Management
  async getBookings(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/bookings${query}`);
  }

  async getAllBookings() {
    return this.get("/admin/bookings");
  }

  async getBookingDetails(bookingId: string) {
    return this.get(`/admin/bookings/${bookingId}`);
  }

  async updateBooking(bookingId: string, bookingData: any) {
    return this.put(`/admin/bookings/${bookingId}`, bookingData);
  }

  async updateBookingStatus(bookingId: string, status: string) {
    return this.put(`/admin/bookings/${bookingId}/status`, { status });
  }

  async cancelBooking(bookingId: string, reason?: string) {
    return this.post(`/admin/bookings/${bookingId}/cancel`, { reason });
  }

  async refundBooking(bookingId: string, amount?: number) {
    return this.post(`/admin/bookings/${bookingId}/refund`, { amount });
  }

  // Content Management
  async getContent(type: string) {
    return this.get(`/admin/content/${type}`);
  }

  async updateContent(type: string, content: any) {
    return this.put(`/admin/content/${type}`, content);
  }

  async getFlights(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/flights${query}`);
  }

  async getHotels(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/hotels${query}`);
  }

  async getCars(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/cars${query}`);
  }

  async getPackages(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/packages${query}`);
  }

  async getAttractions(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/attractions${query}`);
  }

  // Content CRUD operations
  async createFlight(flightData: any) {
    return this.post("/admin/flights", flightData);
  }

  async updateFlight(flightId: string, flightData: any) {
    return this.put(`/admin/flights/${flightId}`, flightData);
  }

  async deleteFlight(flightId: string) {
    return this.delete(`/admin/flights/${flightId}`);
  }

  async createHotel(hotelData: any) {
    return this.post("/admin/hotels", hotelData);
  }

  async updateHotel(hotelId: string, hotelData: any) {
    return this.put(`/admin/hotels/${hotelId}`, hotelData);
  }

  async deleteHotel(hotelId: string) {
    return this.delete(`/admin/hotels/${hotelId}`);
  }

  // System settings
  async getSettings() {
    return this.get("/admin/settings");
  }

  async updateSettings(settings: any) {
    return this.put("/admin/settings", settings);
  }

  async getSystemSettings() {
    return this.get("/admin/system/settings");
  }

  async updateSystemSettings(settings: any) {
    return this.put("/admin/system/settings", settings);
  }

  async clearCache() {
    return this.post("/admin/system/cache/clear");
  }

  // Reports and Analytics
  async getReports(type: string, params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/reports/${type}${query}`);
  }

  async getRevenueStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/analytics/revenue${query}`);
  }

  async getUserStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/analytics/users${query}`);
  }

  async getBookingStats(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/analytics/bookings${query}`);
  }

  // System Management
  async getSystemLogs(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/system/logs${query}`);
  }

  // Partner Management
  async getPartners(params?: any) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.get(`/admin/partners${query}`);
  }

  async getPartnerDetails(partnerId: string) {
    return this.get(`/admin/partners/${partnerId}`);
  }

  async approvePartner(partnerId: string) {
    return this.post(`/admin/partners/${partnerId}/approve`);
  }

  async rejectPartner(partnerId: string, reason?: string) {
    return this.post(`/admin/partners/${partnerId}/reject`, { reason });
  }

  async suspendPartner(partnerId: string, reason?: string) {
    return this.post(`/admin/partners/${partnerId}/suspend`, { reason });
  }

  async reactivatePartner(partnerId: string) {
    return this.post(`/admin/partners/${partnerId}/reactivate`);
  }

  // User methods (for admin profile management)
  async getUserProfile() {
    return this.get("/admin/profile");
  }

  async updateUserProfile(profileData: any) {
    return this.put("/admin/profile", profileData);
  }
}

// Create and export singleton instance
const apiService = new AdminApiService();
export default apiService;
export { AdminApiService };
