/**
 * Shared constants for FlyBeth application
 * Used across frontend, backend, and mobile
 */

// User types
export const USER_TYPES = {
  CONSUMER: "CONSUMER",
  BUSINESS: "BUSINESS",
} as const;

// Trip statuses
export const TRIP_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  TRIPS: {
    BASE: "/trips",
    BOOK: "/trips/book",
    B2B_BOOK: "/trips/book/b2b",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
  },
  FLIGHTS: {
    SEARCH: "/flights/search",
    BOOK: "/flights/book",
  },
  HOTELS: {
    SEARCH: "/hotels/search",
    BOOK: "/hotels/book",
  },
  CARS: {
    SEARCH: "/cars/search",
    BOOK: "/cars/book",
  },
} as const;

// Validation limits
export const VALIDATION_LIMITS = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BUSINESS_NAME_MIN_LENGTH: 2,
  BUSINESS_NAME_MAX_LENGTH: 100,
  BUSINESS_DESCRIPTION_MAX_LENGTH: 500,
  DESTINATION_MIN_LENGTH: 2,
  DESTINATION_MAX_LENGTH: 100,
  TRAVELERS_MIN: 1,
  TRAVELERS_MAX: 20,
  PLATFORM_USER_ID_MAX_LENGTH: 100,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Must be a valid email address",
  INVALID_PASSWORD:
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH} characters long`,
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  TRIP_NOT_FOUND: "Trip not found",
  INVALID_DATE: "Invalid date format",
  PAST_DATE: "Date cannot be in the past",
  END_DATE_BEFORE_START: "End date must be after start date",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  USER_CREATED: "Account created successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  TRIP_BOOKED: "Trip booked successfully",
  PROFILE_UPDATED: "Profile updated successfully",
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Type exports
export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
