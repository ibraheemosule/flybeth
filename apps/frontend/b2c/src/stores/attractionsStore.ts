import {
  createAttractionsStore,
  type AttractionsApiService,
} from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the AttractionsApiService interface
const attractionsApiAdapter: AttractionsApiService = {
  searchAttractions:
    apiService.searchAttractions?.bind(apiService) ||
    (() => Promise.resolve([])),
  getAttractionDetails: async (attractionId: string) => {
    // TODO: Implement getAttractionDetails in apiService
    throw new Error("getAttractionDetails not implemented");
  },
  bookAttraction: async bookingData => {
    const result = (await apiService.createBooking?.({
      type: "attraction",
      ...bookingData,
    })) || { id: "mock-booking" };
    return {
      bookingId: result.id,
      attraction: result.details,
    };
  },
};

// Create the attractions store using the shared factory
export const useAttractionsStore = createAttractionsStore(
  attractionsApiAdapter,
  "b2c-attractions"
);
