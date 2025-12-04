// Complete guide to absolute imports - SIMPLIFIED!
// You can now import everything from the ROOT of each package:

// ✅ @packages/shared-utils - All utilities from root
import {
  formatDate,
  formatPrice,
  BaseApiService,
  hashPassword,
  comparePassword,
  userSchema,
  tripSchema,
  USER_TYPES,
  API_ENDPOINTS,
} from "@packages/shared-utils";

// ✅ @packages/shared-config - All configurations from root
import {
  createViteConfig,
  createESLintConfig,
  createTailwindConfig,
} from "@shared-config";

// ✅ @shared-backend - All backend utilities from root
import {
  express,
  cors,
  createCorsMiddleware,
  createHelmetMiddleware,
  createLogger,
} from "@shared-backend";

// ✅ @shared-testing - All testing utilities from root
import {
  mockUsers,
  mockTrips,
  mockFlights,
  createMockUser,
  createMockTrip,
  renderWithProviders,
  apiMocks,
  mockLocalStorage,
} from "@shared-testing";

// NO MORE SUB-PATHS NEEDED!
// ❌ OLD: import { mockUser } from '@shared-testing/fixtures';
// ✅ NEW: import { mockUsers } from '@shared-testing';

// Example usage:
export const demonstrateSimplifiedImports = () => {
  // Using utilities
  const date = formatDate(new Date());
  const price = formatPrice(99.99);

  // Using test data
  const user = mockUsers.consumer;
  const trip = mockTrips.paris;

  // Using validation
  const isValidUser = userSchema.safeParse(user);

  console.log(`Date: ${date}, Price: ${price}`);
  console.log(`User: ${user.email}, Trip: ${trip.destination}`);
  console.log(`Valid: ${isValidUser.success}`);
};

export default demonstrateSimplifiedImports;
