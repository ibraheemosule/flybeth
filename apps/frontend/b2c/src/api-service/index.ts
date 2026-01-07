/**
 * B2C API service - extends base API service with B2C-specific methods
 */

import { BaseApiService } from "@packages/shared-frontend";

class B2CApiService extends BaseApiService {
  constructor() {
    super({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.flybeth.com",
      storageKey: "flybeth-b2c-auth",
      onUnauthorized: () => {
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },
    });
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
  async getCurrentUser() {
    return this.get("/user/profile");
  }

  async getUserProfile() {
    return this.get("/user/profile");
  }

  async updateUserProfile(profileData: any) {
    return this.put("/user/profile", profileData);
  }

  async getUserBookings() {
    return this.get("/user/bookings");
  }

  // B2C specific methods
  async getWishlist() {
    return this.get("/user/wishlist");
  }

  async addToWishlist(itemId: string, itemType: string) {
    return this.post("/user/wishlist", { itemId, itemType });
  }

  async removeFromWishlist(itemId: string) {
    return this.delete(`/user/wishlist/${itemId}`);
  }

  async getRecommendations() {
    return this.get("/user/recommendations");
  }
}

// Create and export singleton instance
const apiService = new B2CApiService();
export default apiService;
export { B2CApiService };
