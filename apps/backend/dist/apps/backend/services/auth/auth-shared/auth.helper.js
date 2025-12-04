"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHelper = exports.AuthProvider = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthProvider {
    // User operations
    async findUserByEmail(email) {
        return await prisma.user.findUnique({
            where: { email },
        });
    }
    async createUser(userData) {
        const hashedPassword = await this.hashPassword(userData.password);
        return await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    // Business operations
    async findBusinessByEmail(email) {
        return await prisma.business.findUnique({
            where: { email },
        });
    }
    async createBusiness(businessData) {
        const hashedPassword = await this.hashPassword(businessData.password);
        return await prisma.business.create({
            data: {
                email: businessData.email,
                password: hashedPassword,
                companyName: businessData.companyName,
                representativeName: businessData.representativeName,
                businessType: businessData.businessType,
                industry: businessData.industry,
                businessPhone: businessData.businessPhone,
                website: businessData.website,
            },
            select: {
                id: true,
                email: true,
                companyName: true,
                representativeName: true,
                businessType: true,
                industry: true,
                businessPhone: true,
                website: true,
                isActive: true,
                verifiedAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    // Admin operations
    async findAdminByEmail(email) {
        return await prisma.admin.findUnique({
            where: { email },
        });
    }
    async createAdmin(adminData) {
        const hashedPassword = adminData.password
            ? await this.hashPassword(adminData.password)
            : null;
        return await prisma.admin.create({
            data: {
                email: adminData.email,
                password: hashedPassword,
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                role: adminData.role || 'ADMIN',
                googleId: adminData.googleId,
                avatar: adminData.avatar,
            },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                role: true,
                isActive: true,
                googleId: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    // Shared password operations
    async hashPassword(password) {
        return await bcrypt_1.default.hash(password, 12);
    }
    async verifyPassword(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    // Account status operations
    async isUserActive(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isActive: true },
        });
        return user?.isActive || false;
    }
    async isBusinessActive(businessId) {
        const business = await prisma.business.findUnique({
            where: { id: businessId },
            select: { isActive: true, verifiedAt: true },
        });
        return business?.isActive && !!business?.verifiedAt || false;
    }
    async isAdminActive(adminId) {
        const admin = await prisma.admin.findUnique({
            where: { id: adminId },
            select: { isActive: true },
        });
        return admin?.isActive || false;
    }
}
exports.AuthProvider = AuthProvider;
exports.authHelper = new AuthProvider();
