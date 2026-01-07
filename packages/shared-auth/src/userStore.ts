import { create } from "zustand";
import type {
  UserState,
  UserApiService,
  FrontendUser,
  UserBooking,
} from "./types";

export function createUserStore(apiService: UserApiService, storeName: string) {
  return create<UserState>((set, get) => ({
    profile: null,
    bookings: [],
    isLoading: false,
    error: null,
    loadProfile: async () => {
      set({ isLoading: true, error: null });
      try {
        const profile = await apiService.getUserProfile();
        set({ profile, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
    loadBookings: async () => {
      set({ isLoading: true, error: null });
      try {
        const bookings = await apiService.getUserBookings();
        set({ bookings, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
  }));
}
