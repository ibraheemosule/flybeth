// Export all stores
export { useAuthStore } from "./authStore";
export { useHotelsStore } from "./hotelsStore";
export { useFlightsStore } from "./flightsStore";
export { useUserStore } from "./userStore";

// Export types for convenience
export type {
  AuthState,
  HotelsState,
  FlightsState,
  UserState,
  Hotel,
  Flight,
  UserBooking,
  FrontendUser,
} from "@packages/shared-auth";
