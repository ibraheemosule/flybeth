import { createUserStore, type UserApiService } from "@packages/shared-auth";
import apiService from "@/api-service";

// Create an adapter to match the UserApiService interface
const userApiAdapter: UserApiService = {
  getUserProfile: apiService.getCurrentUser.bind(apiService),
  updateUserProfile: async updates => {
    // TODO: Implement updateUserProfile in apiService
    throw new Error("updateUserProfile not implemented");
  },
  getUserBookings: apiService.getUserBookings.bind(apiService),
  cancelBooking: apiService.cancelBooking.bind(apiService),
  updatePreferences: async preferences => {
    // TODO: Implement updatePreferences in apiService
    throw new Error("updatePreferences not implemented");
  },
};

// Create the user store using the shared factory
export const useUserStore = createUserStore(userApiAdapter, "b2c-user");
