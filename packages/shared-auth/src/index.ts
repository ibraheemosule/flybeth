// Export all store factories
export { createAuthStore } from "./authStore";
export { createFlightsStore } from "./flightsStore";
export { createUserStore } from "./userStore";
export { createHotelsStore } from "./hotelsStore";
export { createCarsStore } from "./carsStore";
export { createPackagesStore } from "./packagesStore";
export { createAttractionsStore } from "./attractionsStore";

// Export all types
export type {
  // API Service interfaces
  AuthApiService,
  FlightsApiService,
  UserApiService,
  HotelsApiService,
  CarsApiService,
  PackagesApiService,
  AttractionsApiService,

  // State interfaces
  AuthState,
  FlightsState,
  UserState,
  HotelsState,
  CarsState,
  PackagesState,
  AttractionsState,

  // Search param interfaces
  FlightSearchParamState,
  CarSearchParamState,
  PackageSearchParamState,
  AttractionSearchParamState,

  // Entity types
  Flight,
  Hotel,
  Car,
  TravelPackage,
  Attraction,
  UserBooking,
  FrontendUser,
} from "./types";
