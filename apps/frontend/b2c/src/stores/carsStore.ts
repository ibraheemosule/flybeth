import { createCarsStore, type CarsApiService } from "@packages/shared-auth";
import apiService from "@/api-service/index";

// Create an adapter to match the CarsApiService interface
const carsApiAdapter: CarsApiService = {
  searchCars:
    apiService.searchCars?.bind(apiService) || (() => Promise.resolve([])),
  getCarDetails: async (carId: string) => {
    // TODO: Implement getCarDetails in apiService
    throw new Error("getCarDetails not implemented");
  },
  bookCar: async bookingData => {
    const result = (await apiService.createBooking?.({
      type: "car",
      ...bookingData,
    })) || { id: "mock-booking" };
    return {
      bookingId: result.id,
      car: result.details,
    };
  },
};

// Create the cars store using the shared factory
export const useCarsStore = createCarsStore(carsApiAdapter, "b2c-cars");
