/**
 * Shared constants for FlyBeth frontend applications
 * Used across frontend and mobile applications
 */

export const PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 5,
};

// User types
export const USER_TYPES = {
  CONSUMER: "CONSUMER",
  BUSINESS: "BUSINESS",
} as const;

export const GENDERS = ["MALE", "FEMALE", "OTHER"] as const;
export const DOCUMENTS = ["PASSPORT", "ID_CARD", "VISA"] as const;

export const TRIP_TYPES = {
  ONE_WAY: "ONE_WAY",
  ROUND_TRIP: "ROUND_TRIP",
  MULTI_CITY: "MULTI_CITY",
} as const;

export const PASSENGER_TYPES = {
  ADULT: "ADULT",
  CHILD: "CHILD",
  INFANT: "INFANT",
} as const;

// Trip statuses
export const TRIP_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

// Validation constants
export const VALIDATION_LIMITS = {
  FIRST_NAME_MAX: 50,
  LAST_NAME_MAX: 50,
  EMAIL_MAX: 320,
  PASSWORD_MIN_LENGTH: 8,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  COMMENT_MAX: 500,
  DESCRIPTION_MAX: 1000,
  CITY_NAME_MAX: 100,
  AIRPORT_NAME_MAX: 100,
  HOTEL_NAME_MAX: 200,
  COUNTRY_NAME_MAX: 100,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  BUSINESS_NAME_MIN_LENGTH: 2,
  BUSINESS_NAME_MAX_LENGTH: 100,
  BUSINESS_DESCRIPTION_MAX_LENGTH: 500,
  DESTINATION_MIN_LENGTH: 2,
  DESTINATION_MAX_LENGTH: 100,
  TRAVELERS_MIN: 1,
  TRAVELERS_MAX: 20,
} as const;

// UI and validation messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PASSWORD:
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_LIMITS.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORDS_DONT_MATCH: "Passwords do not match",
  INVALID_CREDENTIALS: "Invalid email or password",
  NETWORK_ERROR: "Network error occurred. Please try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
  UNAUTHORIZED_ACCESS: "You don't have permission to access this resource",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
  INVALID_FORM_DATA: "Please check your input and try again",
  INVALID_DATE: "Invalid date format",
  PAST_DATE: "Date cannot be in the past",
  END_DATE_BEFORE_START: "End date must be after start date",
  SOLD_OUT_FLIGHT:
    "The airline has just sold the last available seat at this price.",
  UNKNOWN_ERROR: "An unknown error occurred",
  GET_FLIGHT_PRICING_FAILED: "Failed to get flight pricing",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: "Account created successfully",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  BOOKING_SUCCESS: "Booking completed successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  QUERY_SUCCESS: "Data retrieved successfully",
  FORM_SUBMITTED: "Form submitted successfully",
} as const;

// Type exports
export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];
