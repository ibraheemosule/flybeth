import {
  createFlightsStore,
  type FlightsApiService,
} from "@packages/shared-auth";
import apiService from "@/lib/api-service";

// Create an adapter to match the FlightsApiService interface
const flightsApiAdapter: FlightsApiService = {
  searchFlights: apiService.searchFlights.bind(apiService),
  getFlightDetails: async (flightId: string) => {
    // TODO: Implement getFlightDetails in apiService
    throw new Error("getFlightDetails not implemented");
  },
  bookFlight: async bookingData => {
    const result = await apiService.createBooking({
      type: "flight",
      ...bookingData,
    });
    return {
      bookingId: result.id,
      flight: result.details,
    };
  },
};

// Create the flights store using the shared factory
export const useFlightsStore = createFlightsStore(
  flightsApiAdapter,
  "b2c-flights"
);
