import {
  createPackagesStore,
  type PackagesApiService,
} from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the PackagesApiService interface
const packagesApiAdapter: PackagesApiService = {
  searchPackages:
    apiService.searchPackages?.bind(apiService) || (() => Promise.resolve([])),
  getPackageDetails: async (packageId: string) => {
    // TODO: Implement getPackageDetails in apiService
    throw new Error("getPackageDetails not implemented");
  },
  bookPackage: async bookingData => {
    const result = (await apiService.createBooking?.({
      type: "package",
      ...bookingData,
    })) || { id: "mock-booking" };
    return {
      bookingId: result.id,
      package: result.details,
    };
  },
};

// Create the packages store using the shared factory
export const usePackagesStore = createPackagesStore(
  packagesApiAdapter,
  "b2c-packages"
);
