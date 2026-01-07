import { create } from "zustand";
import type {
  HotelsState,
  HotelsApiService,
  HotelSearchParamState,
} from "./types";

export function createHotelsStore(
  apiService: HotelsApiService,
  storeName: string
) {
  return create<HotelsState>((set, get) => ({
    hotels: [],
    searchParams: null,
    selectedHotel: null,
    isLoading: false,
    error: null,
    searchHotels: async (params: any) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.searchHotels(params);
        set({ hotels: result, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
  }));
}
