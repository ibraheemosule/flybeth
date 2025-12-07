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
    }) => Promise<{
        bookingId: string;
        hotel: Hotel;
    }>;
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
    }) => Promise<{
        bookingId: string;
        hotel: Hotel;
    }>;
    clearHotels: () => void;
    clearError: () => void;
}
export declare function createHotelsStore(apiService: HotelsApiService, storeName?: string): import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<HotelsState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<HotelsState, HotelsState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: HotelsState) => void) => () => void;
        onFinishHydration: (fn: (state: HotelsState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<HotelsState, HotelsState>>;
    };
}>;
//# sourceMappingURL=hotelsStore.d.ts.map