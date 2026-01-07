import { create } from "zustand";
import type {
  PackagesState,
  PackagesApiService,
  PackageSearchParamState,
} from "./types";

export function createPackagesStore(
  apiService: PackagesApiService,
  storeName: string
) {
  return create<PackagesState>((set, get) => ({
    packages: [],
    searchParams: {
      destination: "",
      date: "",
      passengers: 1,
    },
    isLoading: false,
    error: null,
    searchPackages: async (params: any) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.searchPackages(params);
        set({ packages: result, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
  }));
}
