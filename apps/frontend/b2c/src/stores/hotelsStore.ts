import {
  createHotelsStore,
  type HotelsApiService,
} from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the HotelsApiService interface
const hotelsApiAdapter: HotelsApiService = {
  searchHotels: apiService.searchHotels.bind(apiService),
  getHotelDetails: async (hotelId: string) => {
    // TODO: Implement getHotelDetails in apiService
    throw new Error("getHotelDetails not implemented");
  },
  bookHotel: async bookingData => {
    const result = await apiService.createBooking({
      type: "hotel",
      ...bookingData,
    });
    return {
      bookingId: result.id,
      hotel: result.details,
    };
  },
};

// Create the hotels store using the shared factory
export const useHotelsStore = createHotelsStore(hotelsApiAdapter, "b2c-hotels");
