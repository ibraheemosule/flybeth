import { create } from "zustand";
import apiService from "@/lib/api-service";

// Define Trip type locally for now
interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  totalAmount?: number;
}

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
  error: string | null;

  bookTrip: (data: {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
  }) => Promise<Trip>;
  fetchMyTrips: () => Promise<void>;
  getTripByReference: (reference: string) => Promise<Trip>;
  clearError: () => void;
}

export const useTripStore = create<TripState>(set => ({
  trips: [],
  currentTrip: null,
  isLoading: false,
  error: null,

  bookTrip: async data => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiService.createBooking(data);

      if (response.data.success) {
        const trip = response.data.data?.trip;
        if (trip) {
          set(state => ({
            trips: [trip, ...state.trips],
            currentTrip: trip,
            isLoading: false,
          }));
          return trip;
        }
      }

      throw new Error(response.data.message || "Trip booking failed");
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        "Trip booking failed";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  fetchMyTrips: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiService.getUserBookings();

      if (response.data.success) {
        const trips = response.data.data?.trips || [];
        set({
          trips,
          isLoading: false,
        });
      } else {
        throw new Error(response.data.message || "Failed to fetch trips");
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        "Failed to fetch trips";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  getTripByReference: async (reference: string) => {
    set({ isLoading: true, error: null });

    try {
      // TODO: Implement getTripByReference in apiService
      throw new Error("getTripByReference not implemented");
    } catch (error: unknown) {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        (error as Error)?.message ||
        "Trip not found";
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
