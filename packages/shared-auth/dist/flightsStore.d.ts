export interface Flight {
    id: string;
    airline: string;
    flightNumber: string;
    departure: {
        airport: string;
        city: string;
        time: string;
        date: string;
    };
    arrival: {
        airport: string;
        city: string;
        time: string;
        date: string;
    };
    duration: string;
    price: number;
    flightClass: "economy" | "business" | "first";
    seats: {
        total: number;
        available: number;
    };
}
export interface FlightsApiService {
    searchFlights: (searchParams: {
        from: string;
        to: string;
        departDate: string;
        returnDate?: string;
        passengers: number;
        flightClass?: "economy" | "business" | "first";
    }) => Promise<Flight[]>;
    getFlightDetails: (flightId: string) => Promise<Flight>;
    bookFlight: (bookingData: {
        flightId: string;
        passengers: number;
        seatPreferences?: string[];
    }) => Promise<{
        bookingId: string;
        flight: Flight;
    }>;
}
export interface FlightSearchParamState {
    from: string;
    to: string;
    departDate: string;
    returnDate?: string;
    passengers: number;
    flightClass?: "economy" | "business" | "first";
    tripType: "roundtrip" | "oneway" | "multicity";
}
export interface FlightsState {
    flights: Flight[];
    selectedFlight: Flight | null;
    returnFlights: Flight[];
    selectedReturnFlight: Flight | null;
    searchParams: FlightSearchParamState | null;
    isLoading: boolean;
    error: string | null;
    searchFlights: (params: FlightSearchParamState) => Promise<void>;
    selectFlight: (flight: Flight, isReturn?: boolean) => void;
    bookFlight: (bookingData: {
        flightId: string;
        returnFlightId?: string;
        passengers: number;
        seatPreferences?: string[];
    }) => Promise<{
        bookingId: string;
        flight: Flight;
        returnFlight?: Flight;
    }>;
    clearFlights: () => void;
    clearError: () => void;
}
export declare function createFlightsStore(apiService: FlightsApiService, storeName?: string): import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<FlightsState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<FlightsState, FlightsState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: FlightsState) => void) => () => void;
        onFinishHydration: (fn: (state: FlightsState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<FlightsState, FlightsState>>;
    };
}>;
//# sourceMappingURL=flightsStore.d.ts.map