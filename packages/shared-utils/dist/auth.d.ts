export interface AuthConfig {
    jwtSecret: string;
    refreshSecret: string;
    accessTokenExpiry?: string;
    refreshTokenExpiry?: string;
}
export interface JWTPayload {
    userId: string;
    email: string;
    userType: string;
}
export declare class AuthUtils {
    private config;
    constructor(config: AuthConfig);
    generateJWT(payload: JWTPayload): string;
    generateRefreshToken(payload: JWTPayload): string;
    verifyJWT(token: string): JWTPayload;
    verifyRefreshToken(token: string): JWTPayload;
}
export default AuthUtils;
//# sourceMappingURL=auth.d.ts.map