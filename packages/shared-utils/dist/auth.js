import * as jwt from 'jsonwebtoken';
export class AuthUtils {
    constructor(config) {
        this.config = config;
    }
    generateJWT(payload) {
        return jwt.sign(payload, this.config.jwtSecret, {
            expiresIn: this.config.accessTokenExpiry || '1h'
        });
    }
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.config.refreshSecret, {
            expiresIn: this.config.refreshTokenExpiry || '7d'
        });
    }
    verifyJWT(token) {
        return jwt.verify(token, this.config.jwtSecret);
    }
    verifyRefreshToken(token) {
        return jwt.verify(token, this.config.refreshSecret);
    }
}
export default AuthUtils;
