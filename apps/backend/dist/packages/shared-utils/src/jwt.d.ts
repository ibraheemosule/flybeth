/**
 * Shared JWT utilities for frontend applications
 * No external dependencies required
 */
export interface TokenPayload {
    exp: number;
    iat: number;
    userId: string;
    userType: string;
    email?: string;
    [key: string]: any;
}
/**
 * Decode JWT token without verification (client-side only)
 * Note: This does NOT verify the token signature - use only for reading claims
 */
export declare function decodeJWT(token: string): TokenPayload | null;
/**
 * Check if JWT token is expired or will expire within buffer time
 */
export declare function isTokenExpired(token: string, bufferMinutes?: number): boolean;
/**
 * Get time until token expiry in milliseconds
 */
export declare function getTimeUntilExpiry(token: string): number;
/**
 * Extract user information from JWT token
 */
export declare function getUserFromToken(token: string): {
    userId: string;
    userType: string;
    email?: string;
} | null;
/**
 * Check if user has specific role based on token
 */
export declare function hasRole(token: string, requiredRoles: string[]): boolean;
