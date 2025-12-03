import * as jwt from 'jsonwebtoken';

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

export class AuthUtils {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  generateJWT(payload: JWTPayload): string {
    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: this.config.accessTokenExpiry || '1h'
    } as jwt.SignOptions);
  }

  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.config.refreshSecret, {
      expiresIn: this.config.refreshTokenExpiry || '7d'
    } as jwt.SignOptions);
  }

  verifyJWT(token: string): JWTPayload {
    return jwt.verify(token, this.config.jwtSecret) as JWTPayload;
  }

  verifyRefreshToken(token: string): JWTPayload {
    return jwt.verify(token, this.config.refreshSecret) as JWTPayload;
  }
}

export default AuthUtils;