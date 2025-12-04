"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelper = exports.JwtProvider = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const env_1 = require("@/config/env");
const googleClient = new google_auth_library_1.OAuth2Client(env_1.config.google.clientId);
class JwtProvider {
    // Token generation
    generateTokensForUser(user) {
        const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, userType: 'user' }, env_1.config.jwtSecret, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user.id, userType: 'user' }, env_1.config.jwtRefreshSecret, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    generateTokensForBusiness(business) {
        const accessToken = jsonwebtoken_1.default.sign({ businessId: business.id, email: business.email, userType: 'business' }, env_1.config.jwtSecret, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign({ businessId: business.id, userType: 'business' }, env_1.config.jwtRefreshSecret, { expiresIn: '7d' });
        return { accessToken, refreshToken };
    }
    generateTokensForAdmin(admin) {
        const accessToken = jsonwebtoken_1.default.sign({
            adminId: admin.id,
            email: admin.email,
            role: admin.role,
            userType: 'admin'
        }, env_1.config.jwtSecret, { expiresIn: '1h' } // Longer for admin sessions
        );
        const refreshToken = jsonwebtoken_1.default.sign({ adminId: admin.id, role: admin.role, userType: 'admin' }, env_1.config.jwtRefreshSecret, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    // Token verification
    verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, env_1.config.jwtSecret);
        }
        catch (error) {
            throw new Error('Invalid access token');
        }
    }
    verifyRefreshToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, env_1.config.jwtRefreshSecret);
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    // Google OAuth
    async verifyGoogleToken(credential) {
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: env_1.config.google.clientId,
            });
            const payload = ticket.getPayload();
            if (!payload)
                return null;
            return {
                email: payload.email,
                firstName: payload.given_name || '',
                lastName: payload.family_name || '',
                googleId: payload.sub,
                avatar: payload.picture,
                emailVerified: payload.email_verified || false,
            };
        }
        catch (error) {
            console.error('Google token verification error:', error);
            return null;
        }
    }
}
exports.JwtProvider = JwtProvider;
exports.jwtHelper = new JwtProvider();
