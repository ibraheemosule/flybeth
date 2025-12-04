/**
 * Shared constants for FlyBeth application
 * Used across frontend, backend, and mobile
 */
export declare const USER_TYPES: {
    readonly CONSUMER: "CONSUMER";
    readonly BUSINESS: "BUSINESS";
};
export declare const TRIP_STATUS: {
    readonly PENDING: "pending";
    readonly CONFIRMED: "confirmed";
    readonly CANCELLED: "cancelled";
    readonly COMPLETED: "completed";
};
export declare const API_ENDPOINTS: {
    readonly AUTH: {
        readonly SIGNUP: "/auth/signup";
        readonly LOGIN: "/auth/login";
        readonly LOGOUT: "/auth/logout";
        readonly REFRESH: "/auth/refresh";
    };
    readonly TRIPS: {
        readonly BASE: "/trips";
        readonly BOOK: "/trips/book";
        readonly B2B_BOOK: "/trips/book/b2b";
    };
    readonly USER: {
        readonly PROFILE: "/user/profile";
        readonly UPDATE: "/user/update";
    };
    readonly FLIGHTS: {
        readonly SEARCH: "/flights/search";
        readonly BOOK: "/flights/book";
    };
    readonly HOTELS: {
        readonly SEARCH: "/hotels/search";
        readonly BOOK: "/hotels/book";
    };
    readonly CARS: {
        readonly SEARCH: "/cars/search";
        readonly BOOK: "/cars/book";
    };
};
export declare const VALIDATION_LIMITS: {
    readonly PASSWORD_MIN_LENGTH: 8;
    readonly NAME_MIN_LENGTH: 2;
    readonly NAME_MAX_LENGTH: 50;
    readonly BUSINESS_NAME_MIN_LENGTH: 2;
    readonly BUSINESS_NAME_MAX_LENGTH: 100;
    readonly BUSINESS_DESCRIPTION_MAX_LENGTH: 500;
    readonly DESTINATION_MIN_LENGTH: 2;
    readonly DESTINATION_MAX_LENGTH: 100;
    readonly TRAVELERS_MIN: 1;
    readonly TRAVELERS_MAX: 20;
    readonly PLATFORM_USER_ID_MAX_LENGTH: 100;
};
export declare const ERROR_MESSAGES: {
    readonly INVALID_EMAIL: "Must be a valid email address";
    readonly INVALID_PASSWORD: "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    readonly PASSWORD_TOO_SHORT: "Password must be at least 8 characters long";
    readonly USER_NOT_FOUND: "User not found";
    readonly INVALID_CREDENTIALS: "Invalid email or password";
    readonly UNAUTHORIZED: "Unauthorized access";
    readonly FORBIDDEN: "Access forbidden";
    readonly TRIP_NOT_FOUND: "Trip not found";
    readonly INVALID_DATE: "Invalid date format";
    readonly PAST_DATE: "Date cannot be in the past";
    readonly END_DATE_BEFORE_START: "End date must be after start date";
};
export declare const SUCCESS_MESSAGES: {
    readonly USER_CREATED: "Account created successfully";
    readonly LOGIN_SUCCESS: "Login successful";
    readonly LOGOUT_SUCCESS: "Logout successful";
    readonly TRIP_BOOKED: "Trip booked successfully";
    readonly PROFILE_UPDATED: "Profile updated successfully";
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
};
export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES];
export type TripStatus = (typeof TRIP_STATUS)[keyof typeof TRIP_STATUS];
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
