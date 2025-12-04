import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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

export class AuthUtils {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  generateJWT(payload: Omit<JWTPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: this.config.jwtExpiresIn,
    } as jwt.SignOptions);
  }

  generateRefreshToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
    return jwt.sign(payload, this.config.refreshSecret, {
      expiresIn: this.config.refreshExpiresIn,
    } as jwt.SignOptions);
  }

  verifyJWT(token: string): JWTPayload {
    return jwt.verify(token, this.config.jwtSecret) as JWTPayload;
  }

  verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(token, this.config.refreshSecret) as JWTPayload;
  }

  generateApiKey(): string {
    return `tap_${uuidv4().replace(/-/g, "")}`;
  }

  generateBookingReference(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TR${timestamp}${random}`;
  }
}

// Standalone utility functions for environments where config isn't available
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateApiKey = (): string => {
  return `tap_${uuidv4().replace(/-/g, "")}`;
};

export const generateBookingReference = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TR${timestamp}${random}`;
};
