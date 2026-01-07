import {
  createFlightsStore,
  type FlightsApiService,
} from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Interface for booking response
interface BookingResponse {
  id: string;
  details: any;
}

// Create an adapter to match the FlightsApiService interface
const flightsApiAdapter: FlightsApiService = {
  searchFlights: apiService.searchFlights.bind(apiService),
  getFlightDetails: apiService.getFlightDetails.bind(apiService),
  bookFlight: async bookingData => {
    const result = (await apiService.createBooking({
      type: "flight",
      ...bookingData,
    })) as BookingResponse;
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
