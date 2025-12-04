import jwt from 'jsonwebtoken';
export declare class JwtProvider {
    generateTokensForUser(user: any): {
        accessToken: string;
        refreshToken: string;
    };
    generateTokensForBusiness(business: any): {
        accessToken: string;
        refreshToken: string;
    };
    generateTokensForAdmin(admin: any): {
        accessToken: string;
        refreshToken: string;
    };
    verifyAccessToken(token: string): string | jwt.JwtPayload;
    verifyRefreshToken(token: string): string | jwt.JwtPayload;
    verifyGoogleToken(credential: string): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        googleId: string;
        avatar?: string;
        emailVerified: boolean;
    } | null>;
}
export declare const jwtHelper: JwtProvider;
