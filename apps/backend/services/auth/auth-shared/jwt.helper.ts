import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { config } from '@/config/env';

const googleClient = new OAuth2Client(config.google.clientId);

export class JwtProvider {
  // Token generation
  generateTokensForUser(user: any) {
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, userType: 'user' },
      config.jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, userType: 'user' },
      config.jwtRefreshSecret,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  generateTokensForBusiness(business: any) {
    const accessToken = jwt.sign(
      { businessId: business.id, email: business.email, userType: 'business' },
      config.jwtSecret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { businessId: business.id, userType: 'business' },
      config.jwtRefreshSecret,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  generateTokensForAdmin(admin: any) {
    const accessToken = jwt.sign(
      { 
        adminId: admin.id, 
        email: admin.email, 
        role: admin.role,
        userType: 'admin' 
      },
      config.jwtSecret,
      { expiresIn: '1h' } // Longer for admin sessions
    );

    const refreshToken = jwt.sign(
      { adminId: admin.id, role: admin.role, userType: 'admin' },
      config.jwtRefreshSecret,
      { expiresIn: '30d' }
    );

    return { accessToken, refreshToken };
  }

  // Token verification
  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, config.jwtSecret);
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, config.jwtRefreshSecret);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  // Google OAuth
  async verifyGoogleToken(credential: string): Promise<{
    email: string;
    firstName: string;
    lastName: string;
    googleId: string;
    avatar?: string;
    emailVerified: boolean;
  } | null> {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: config.google.clientId,
      });

      const payload = ticket.getPayload();
      if (!payload) return null;

      return {
        email: payload.email!,
        firstName: payload.given_name || '',
        lastName: payload.family_name || '',
        googleId: payload.sub,
        avatar: payload.picture,
        emailVerified: payload.email_verified || false,
      };
    } catch (error) {
      console.error('Google token verification error:', error);
      return null;
    }
  }
}

export const jwtHelper = new JwtProvider();