export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}
export interface BaseUser {
    id: string;
    email: string;
    userType: "CONSUMER" | "BUSINESS";
}
export interface User extends BaseUser {
    firstName?: string;
    lastName?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AuthenticatedUser extends User {
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    apiKeyId?: string | null;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface SignupRequest {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    userType: "CONSUMER" | "BUSINESS";
    businessName?: string;
    businessDescription?: string;
    businessWebsite?: string;
}
export interface AuthResponse {
    user: User;
    token?: string;
    accessToken?: string;
    refreshToken?: string;
}
export interface TripBookingRequest {
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
}
export interface B2BBookingRequest extends TripBookingRequest {
    platformUserId: string;
    platformUserEmail: string;
}
export interface Trip {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    price?: number;
    totalAmount?: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    bookingReference: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface JWTPayload {
    userId: string;
    email: string;
    userType: "CONSUMER" | "BUSINESS";
    iat?: number;
    exp?: number;
}
