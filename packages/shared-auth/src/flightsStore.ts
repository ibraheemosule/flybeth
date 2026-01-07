import { create } from "zustand";
import type {
  FlightsState,
  FlightsApiService,
  FlightSearchParamState,
} from "./types";

export function createFlightsStore(
  apiService: FlightsApiService,
  storeName: string
) {
  return create<FlightsState>((set, get) => ({
    flights: [],
    searchParams: {
      from: "",
      to: "",
      departure: "",
      passengers: 1,
      tripType: "round-trip",
    },
    isLoading: false,
    error: null,
    searchFlights: async (params: any) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.searchFlights(params);
        set({ flights: result, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    bookFlight: async (flightId: string, bookingData: any) => {
      set({ isLoading: true, error: null });
      try {
        await apiService.bookFlight({ flightId, ...bookingData });
        set({ isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    setSearchParams: (params: Partial<FlightSearchParamState>) => {
      set({ searchParams: { ...get().searchParams, ...params } });
    },
  }));
}
