// Common API response type
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// User types
export interface BaseUser {
  id: string;
  email: string;
  userType: 'consumer' | 'business';
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

// Auth request/response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  userType: 'consumer' | 'business';
  businessName?: string;
  businessDescription?: string;
  businessWebsite?: string;
}

export interface AuthResponse {
  user: User;
  token?: string; // For mobile
  accessToken?: string; // For web
  refreshToken?: string; // For web
}

// Trip types
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
  price?: number; // Mobile naming
  totalAmount?: number; // Web naming
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingReference: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// JWT payload type
export interface JWTPayload {
  userId: string;
  email: string;
  userType: 'consumer' | 'business';
  iat?: number;
  exp?: number;
}