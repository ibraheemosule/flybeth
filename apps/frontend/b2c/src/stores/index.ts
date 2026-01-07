// Export all stores
export { useAuthStore } from "./authStore";
export { useHotelsStore } from "./hotelsStore";
export { useFlightsStore } from "./flightsStore";
export { useUserStore } from "./userStore";
export { useCarsStore } from "./carsStore";
export { usePackagesStore } from "./packagesStore";
export { useAttractionsStore } from "./attractionsStore";

// Export types for convenience
export type {
  AuthState,
  HotelsState,
  FlightsState,
  FlightSearchParamState,
  UserState,
  CarsState,
  PackagesState,
  AttractionsState,
  CarSearchParamState,
  PackageSearchParamState,
  AttractionSearchParamState,
  Hotel,
  Flight,
  Car,
  TravelPackage,
  Attraction,
  UserBooking,
  FrontendUser,
} from "@packages/shared-auth";
