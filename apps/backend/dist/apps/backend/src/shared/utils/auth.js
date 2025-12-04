"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBookingReference = exports.generateApiKey = exports.comparePassword = exports.hashPassword = exports.AuthUtils = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
class AuthUtils {
    constructor(config) {
        this.config = config;
    }
    async hashPassword(password) {
        const saltRounds = 12;
        return bcryptjs_1.default.hash(password, saltRounds);
    }
    async comparePassword(plainPassword, hashedPassword) {
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    generateJWT(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.jwtSecret, {
            expiresIn: this.config.jwtExpiresIn,
        });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.config.refreshSecret, {
            expiresIn: this.config.refreshExpiresIn,
        });
    }
    verifyJWT(token) {
        return jsonwebtoken_1.default.verify(token, this.config.jwtSecret);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.config.refreshSecret);
    }
    generateApiKey() {
        return `tap_${(0, uuid_1.v4)().replace(/-/g, "")}`;
    }
    generateBookingReference() {
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `TR${timestamp}${random}`;
    }
}
exports.AuthUtils = AuthUtils;
// Standalone utility functions for environments where config isn't available
const hashPassword = async (password) => {
    const saltRounds = 12;
    return bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (plainPassword, hashedPassword) => {
    return bcryptjs_1.default.compare(plainPassword, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateApiKey = () => {
    return `tap_${(0, uuid_1.v4)().replace(/-/g, "")}`;
};
exports.generateApiKey = generateApiKey;
const generateBookingReference = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `TR${timestamp}${random}`;
};
exports.generateBookingReference = generateBookingReference;
