export interface AuthApiService {
    login: (email: string, password: string) => Promise<any>;
    register: (email: string, password: string) => Promise<any>;
    logout: () => Promise<void>;
}
export interface FlightsApiService {
    searchFlights: (params: any) => Promise<any>;
    getFlightDetails: (flightId: string) => Promise<any>;
    bookFlight: (bookingData: any) => Promise<any>;
}
export interface UserApiService {
    getUserProfile: () => Promise<any>;
    updateUserProfile: (updates: any) => Promise<any>;
    getUserBookings: () => Promise<any>;
    cancelBooking: (bookingId: string) => Promise<any>;
    updatePreferences: (preferences: any) => Promise<any>;
}
export interface HotelsApiService {
    searchHotels: (params: any) => Promise<any>;
    getHotelDetails: (hotelId: string) => Promise<any>;
    bookHotel: (bookingData: any) => Promise<any>;
}
export interface CarsApiService {
    searchCars: (params: any) => Promise<any>;
    getCarDetails: (carId: string) => Promise<any>;
    bookCar: (bookingData: any) => Promise<any>;
}
export interface PackagesApiService {
    searchPackages: (params: any) => Promise<any>;
    getPackageDetails: (packageId: string) => Promise<any>;
    bookPackage: (bookingData: any) => Promise<any>;
}
export interface AttractionsApiService {
    searchAttractions: (params: any) => Promise<any>;
    getAttractionDetails: (attractionId: string) => Promise<any>;
    bookAttraction: (bookingData: any) => Promise<any>;
}
export interface AuthState {
    user: FrontendUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
export interface FlightsState {
    flights: Flight[];
    searchParams: FlightSearchParamState;
    isLoading: boolean;
    error: string | null;
    searchFlights: (params: any) => Promise<void>;
    bookFlight: (flightId: string, bookingData: any) => Promise<void>;
    setSearchParams: (params: Partial<FlightSearchParamState>) => void;
}
export interface FlightSearchParamState {
    from: string;
    to: string;
    departure: string;
    return?: string;
    passengers: number;
    tripType: string;
}
export interface HotelsState {
    hotels: Hotel[];
    isLoading: boolean;
    error: string | null;
    searchHotels: (params: any) => Promise<void>;
}
export interface UserState {
    profile: FrontendUser | null;
    bookings: UserBooking[];
    isLoading: boolean;
    error: string | null;
    loadProfile: () => Promise<void>;
    loadBookings: () => Promise<void>;
}
export interface CarsState {
    cars: Car[];
    searchParams: CarSearchParamState;
    isLoading: boolean;
    error: string | null;
    searchCars: (params: any) => Promise<void>;
}
export interface CarSearchParamState {
    location: string;
    pickupDate: string;
    dropoffDate: string;
}
export interface PackagesState {
    packages: TravelPackage[];
    searchParams: PackageSearchParamState;
    isLoading: boolean;
    error: string | null;
    searchPackages: (params: any) => Promise<void>;
}
export interface PackageSearchParamState {
    destination: string;
    date: string;
    passengers: number;
}
export interface AttractionsState {
    attractions: Attraction[];
    searchParams: AttractionSearchParamState;
    isLoading: boolean;
    error: string | null;
    searchAttractions: (params: any) => Promise<void>;
}
export interface AttractionSearchParamState {
    location: string;
    date: string;
    visitors: number;
}
export interface Flight {
    id: string;
    airline: string;
    flightNumber?: string;
    price: number;
    departure: {
        time: string;
        city: string;
        airport: string;
        date: string;
    };
    arrival: {
        time: string;
        city: string;
        airport: string;
        date: string;
    };
}
export interface Hotel {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
}
export interface Car {
    id: string;
    name: string;
    price: number;
    type: string;
}
export interface TravelPackage {
    id: string;
    name: string;
    price: number;
    destination: string;
}
export interface Attraction {
    id: string;
    name: string;
    price: number;
    location: string;
}
export interface UserBooking {
    id: string;
    type: string;
    status: string;
    details: any;
}
export interface FrontendUser {
    id: string;
    email: string;
    name?: string;
    role?: string;
}
//# sourceMappingURL=types.d.ts.map