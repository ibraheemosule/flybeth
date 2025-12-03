import { create } from 'zustand';
import { apiService, Trip, BookingData } from '../services/api';

interface TripStore {
  trips: Trip[];
  isLoading: boolean;
  error: string | null;
  bookTrip: (data: BookingData, isB2B?: boolean) => Promise<void>;
  getTrips: () => Promise<void>;
  clearError: () => void;
}

export const useTripStore = create<TripStore>((set, get) => ({
  trips: [],
  isLoading: false,
  error: null,

  bookTrip: async (data: BookingData, isB2B = false) => {
    try {
      set({ isLoading: true, error: null });
      
      const trip = isB2B 
        ? await apiService.bookTripB2B(data)
        : await apiService.bookTrip(data);
      
      set((state) => ({ 
        trips: [...state.trips, trip],
        isLoading: false,
        error: null
      }));
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Booking failed';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
      throw error;
    }
  },

  getTrips: async () => {
    try {
      set({ isLoading: true, error: null });
      const trips = await apiService.getTrips();
      set({ 
        trips, 
        isLoading: false,
        error: null 
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch trips';
      set({ 
        error: errorMessage, 
        isLoading: false 
      });
    }
  },

  clearError: () => set({ error: null }),
}));