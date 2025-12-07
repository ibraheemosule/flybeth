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
    updatePreferences: (preferences: FrontendUser["preferences"]) => Promise<FrontendUser>;
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
    updatePreferences: (preferences: FrontendUser["preferences"]) => Promise<void>;
    clearError: () => void;
}
export declare function createUserStore(apiService: UserApiService, storeName?: string): import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<UserState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<UserState, UserState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: UserState) => void) => () => void;
        onFinishHydration: (fn: (state: UserState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<UserState, UserState>>;
    };
}>;
//# sourceMappingURL=userStore.d.ts.map