export interface JWTPayload {
    userId: string;
    email: string;
    userType: "CONSUMER" | "BUSINESS";
    iat: number;
    exp: number;
}
export interface AuthConfig {
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}
export declare class AuthUtils {
    private config;
    constructor(config: AuthConfig);
    hashPassword(password: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateJWT(payload: Omit<JWTPayload, "iat" | "exp">): string;
    generateRefreshToken(payload: Omit<JWTPayload, "iat" | "exp">): string;
    verifyJWT(token: string): JWTPayload;
    verifyRefreshToken(token: string): JWTPayload;
    generateApiKey(): string;
    generateBookingReference(): string;
}
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
export declare const generateApiKey: () => string;
export declare const generateBookingReference: () => string;
