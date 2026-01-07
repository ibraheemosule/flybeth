import {
  createFlightsStore,
  type FlightsApiService,
} from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the FlightsApiService interface
const flightsApiAdapter: FlightsApiService = {
  searchFlights: apiService.searchFlights.bind(apiService),
  getFlightDetails: apiService.getFlightDetails.bind(apiService),
  bookFlight: async bookingData => {
    const result = await apiService.createBooking({
      type: "flight",
      ...bookingData,
    });
    return {
      bookingId: (result as any).id,
      flight: (result as any).details,
    };
  },
};

// Create the flights store using the shared factory
export const useFlightsStore = createFlightsStore(
  flightsApiAdapter,
  "b2c-flights"
);
