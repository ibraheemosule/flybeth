import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  amenities: string[];
  images: string[];
  description?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface HotelsApiService {
  searchHotels: (searchParams: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => Promise<Hotel[]>;
  getHotelDetails: (hotelId: string) => Promise<Hotel>;
  bookHotel: (bookingData: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => Promise<{ bookingId: string; hotel: Hotel }>;
}

export interface HotelsState {
  hotels: Hotel[];
  selectedHotel: Hotel | null;
  searchParams: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  } | null;
  isLoading: boolean;
  error: string | null;

  searchHotels: (params: {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => Promise<void>;
  selectHotel: (hotel: Hotel) => void;
  bookHotel: (bookingData: {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
  }) => Promise<{ bookingId: string; hotel: Hotel }>;
  clearHotels: () => void;
  clearError: () => void;
}

export function createHotelsStore(
  apiService: HotelsApiService,
  storeName: string = "hotels"
) {
  return create<HotelsState>()(
    persist(
      set => ({
        hotels: [],
        selectedHotel: null,
        searchParams: null,
        isLoading: false,
        error: null,

        searchHotels: async params => {
          set({ isLoading: true, error: null, searchParams: params });

          try {
            const hotels = await apiService.searchHotels(params);
            set({ hotels, isLoading: false });
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to search hotels";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        selectHotel: hotel => {
          set({ selectedHotel: hotel });
        },

        bookHotel: async bookingData => {
          set({ isLoading: true, error: null });

          try {
            const result = await apiService.bookHotel(bookingData);
            set({ isLoading: false });
            return result;
          } catch (error: unknown) {
            const errorMessage =
              (error as any)?.response?.data?.message ||
              (error as Error)?.message ||
              "Failed to book hotel";
            set({ error: errorMessage, isLoading: false });
            throw error;
          }
        },

        clearHotels: () => {
          set({ hotels: [], selectedHotel: null, searchParams: null });
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
