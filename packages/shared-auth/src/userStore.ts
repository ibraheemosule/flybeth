import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FrontendUser } from "@packages/shared-frontend";

export interface UserBooking {
  id: string;
  type: "flight" | "hotel" | "car";
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  details: any;
  createdAt: string;
  totalAmount: number;
}

export interface UserApiService {
  getUserProfile: () => Promise<FrontendUser>;
  updateUserProfile: (updates: Partial<FrontendUser>) => Promise<FrontendUser>;
  getUserBookings: () => Promise<UserBooking[]>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updatePreferences: (
    preferences: FrontendUser["preferences"]
  ) => Promise<FrontendUser>;
}

export interface UserState {
  profile: FrontendUser | null;
  bookings: UserBooking[];
  isLoading: boolean;
  error: string | null;

  fetchUserProfile: () => Promise<void>;
  updateProfile: (updates: Partial<FrontendUser>) => Promise<void>;
  fetchBookings: () => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updatePreferences: (
    preferences: FrontendUser["preferences"]
  ) => Promise<void>;
  clearError: () => void;
}

export function createUserStore(
  apiService: UserApiService,
  storeName: string = "user"
) {
  return create<UserState>()(
    persist(
      (set, get) => ({
        profile: null,
        bookings: [],
        isLoading: false,
        error: null,

        fetchUserProfile: async () => {
          set({ isLoading: true, error: null });

          try {
            const profile = await apiService.getUserProfile();
            set({ profile, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to fetch user profile";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        updateProfile: async updates => {
          set({ isLoading: true, error: null });

          try {
            const profile = await apiService.updateUserProfile(updates);
            set({ profile, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to update profile";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        fetchBookings: async () => {
          set({ isLoading: true, error: null });

          try {
            const bookings = await apiService.getUserBookings();
            set({ bookings, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to fetch bookings";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        cancelBooking: async bookingId => {
          set({ isLoading: true, error: null });

          try {
            await apiService.cancelBooking(bookingId);
            const { bookings } = get();
            const updatedBookings = bookings.map(booking =>
              booking.id === bookingId
                ? { ...booking, status: "CANCELLED" as const }
                : booking
            );
            set({ bookings: updatedBookings, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to cancel booking";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        updatePreferences: async preferences => {
          set({ isLoading: true, error: null });

          try {
            const profile = await apiService.updatePreferences(preferences);
            set({ profile, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to update preferences";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        clearError: () => {
          set({ error: null });
        },
      }),
      {
        name: storeName,
      }
    )
  );
}
