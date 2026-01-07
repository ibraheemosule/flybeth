import { create } from "zustand";
import type {
  AttractionsState,
  AttractionsApiService,
  AttractionSearchParamState,
} from "./types";

export function createAttractionsStore(
  apiService: AttractionsApiService,
  storeName: string
) {
  return create<AttractionsState>((set, get) => ({
    attractions: [],
    searchParams: {
      location: "",
      date: "",
      visitors: 1,
    },
    isLoading: false,
    error: null,
    searchAttractions: async (params: any) => {
      set({ isLoading: true, error: null });
      try {
        const result = await apiService.searchAttractions(params);
        set({ attractions: result, isLoading: false });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
      }
    },
  }));
}
