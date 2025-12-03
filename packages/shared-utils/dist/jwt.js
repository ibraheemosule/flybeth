/**
 * Shared JWT utilities for frontend applications
 * No external dependencies required
 */
/**
 * Decode JWT token without verification (client-side only)
 * Note: This does NOT verify the token signature - use only for reading claims
 */
export function decodeJWT(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3)
            return null;
        const payload = parts[1];
        // Handle URL-safe base64 decoding
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decoded;
    }
    catch (error) {
        console.warn('Failed to decode JWT:', error);
        return null;
    }
}
/**
 * Check if JWT token is expired or will expire within buffer time
 */
export function isTokenExpired(token, bufferMinutes = 5) {
    try {
        const decoded = decodeJWT(token);
        if (!decoded || !decoded.exp)
            return true;
        const currentTime = Math.floor(Date.now() / 1000);
        const bufferTime = bufferMinutes * 60;
        return decoded.exp <= (currentTime + bufferTime);
    }
    catch (error) {
        return true;
    }
}
/**
 * Get time until token expiry in milliseconds
 */
export function getTimeUntilExpiry(token) {
    try {
        const decoded = decodeJWT(token);
        if (!decoded || !decoded.exp)
            return 0;
        const expiryTime = decoded.exp * 1000;
        return Math.max(0, expiryTime - Date.now());
    }
    catch (error) {
        return 0;
    }
}
/**
 * Extract user information from JWT token
 */
export function getUserFromToken(token) {
    try {
        const decoded = decodeJWT(token);
        if (!decoded)
            return null;
        return {
            userId: decoded.userId,
            userType: decoded.userType,
            email: decoded.email
        };
    }
    catch (error) {
        return null;
    }
}
/**
 * Check if user has specific role based on token
 */
export function hasRole(token, requiredRoles) {
    try {
        const decoded = decodeJWT(token);
        if (!decoded)
            return false;
        const userRoles = decoded.roles || [decoded.userType] || [];
        return requiredRoles.some(role => userRoles.includes(role) ||
            userRoles.map((r) => r.toUpperCase()).includes(role.toUpperCase()));
    }
    catch (error) {
        return false;
    }
}
