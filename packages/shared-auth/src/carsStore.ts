import { create } from "zustand";
import type { CarsState, CarsApiService, CarSearchParamState } from "./types";

export function createCarsStore(apiService: CarsApiService, storeName: string) {
  return create<CarsState>((set, get) => ({
    cars: [],
    searchParams: {
      location: "",
      pickupDate: "",
      dropoffDate: "",
    },
    selectedCar: null,
    isLoading: false,
    error: null,
    searchCars: async (params: any) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.searchCars(params);
        set({ cars: result, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
  }));
}
