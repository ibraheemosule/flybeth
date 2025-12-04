import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  class: "economy" | "business" | "first";
  seats: {
    total: number;
    available: number;
  };
}

export interface FlightsApiService {
  searchFlights: (searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    class?: "economy" | "business" | "first";
  }) => Promise<Flight[]>;
  getFlightDetails: (flightId: string) => Promise<Flight>;
  bookFlight: (bookingData: {
    flightId: string;
    passengers: number;
    seatPreferences?: string[];
  }) => Promise<{ bookingId: string; flight: Flight }>;
}

export interface FlightsState {
  flights: Flight[];
  selectedFlight: Flight | null;
  returnFlights: Flight[];
  selectedReturnFlight: Flight | null;
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    class?: "economy" | "business" | "first";
  } | null;
  isLoading: boolean;
  error: string | null;
  isRoundTrip: boolean;

  searchFlights: (params: {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    class?: "economy" | "business" | "first";
  }) => Promise<void>;
  selectFlight: (flight: Flight, isReturn?: boolean) => void;
  bookFlight: (bookingData: {
    flightId: string;
    returnFlightId?: string;
    passengers: number;
    seatPreferences?: string[];
  }) => Promise<{ bookingId: string; flight: Flight; returnFlight?: Flight }>;
  clearFlights: () => void;
  clearError: () => void;
  toggleTripType: () => void;
}

export function createFlightsStore(
  apiService: FlightsApiService,
  storeName: string = "flights"
) {
  return create<FlightsState>()(
    persist(
      (set, get) => ({
        flights: [],
        selectedFlight: null,
        returnFlights: [],
        selectedReturnFlight: null,
        searchParams: null,
        isLoading: false,
        error: null,
        isRoundTrip: false,

        searchFlights: async params => {
          set({
            isLoading: true,
            error: null,
            searchParams: params,
            isRoundTrip: !!params.returnDate,
          });

          try {
            const flights = await apiService.searchFlights(params);
            set({ flights, isLoading: false });

            // If round trip, search return flights
            if (params.returnDate) {
              const returnFlights = await apiService.searchFlights({
                ...params,
                from: params.to,
                to: params.from,
                departDate: params.returnDate,
                returnDate: undefined,
              });
              set({ returnFlights });
            }
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to search flights";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        selectFlight: (flight, isReturn = false) => {
          if (isReturn) {
            set({ selectedReturnFlight: flight });
          } else {
            set({ selectedFlight: flight });
          }
        },

        bookFlight: async bookingData => {
          set({ isLoading: true, error: null });

          try {
            const result = await apiService.bookFlight(bookingData);
            set({ isLoading: false });
            return result;
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to book flight";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        clearFlights: () => {
          set({
            flights: [],
            selectedFlight: null,
            returnFlights: [],
            selectedReturnFlight: null,
            searchParams: null,
          });
        },

        clearError: () => {
          set({ error: null });
        },

        toggleTripType: () => {
          const { isRoundTrip } = get();
          set({
            isRoundTrip: !isRoundTrip,
            returnFlights: [],
            selectedReturnFlight: null,
          });
        },
      }),
      {
        name: storeName,
      }
    )
  );
}
