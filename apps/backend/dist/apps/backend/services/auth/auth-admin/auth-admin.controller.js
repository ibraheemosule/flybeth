"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.AdminController = void 0;
const zod_1 = require("zod");
const auth_helper_1 = require("../auth-shared/auth.helper");
const jwt_helper_1 = require("../auth-shared/jwt.helper");
const auth_admin_schemas_1 = require("./auth-admin.schemas");
class AdminController {
    async register(req, res) {
        try {
            const validatedData = auth_admin_schemas_1.adminRegisterSchema.parse(req.body);
            // Admin-specific business logic - domain validation
            if (!this.isValidAdminDomain(validatedData.email)) {
                return res.status(403).json({
                    success: false,
                    message: 'Admin registration is restricted to @flybeth.com email addresses'
                });
            }
            // Check if admin already exists
            const existingAdmin = await auth_helper_1.authHelper.findAdminByEmail(validatedData.email);
            if (existingAdmin) {
                return res.status(400).json({
                    success: false,
                    message: 'Admin with this email already exists'
                });
            }
            // Business logic for role validation
            if (!this.isValidAdminRole(validatedData.role)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid admin role specified'
                });
            }
            // Create admin
            const admin = await auth_helper_1.authHelper.createAdmin(validatedData);
            // Generate tokens with admin privileges
            const tokens = jwt_helper_1.jwtHelper.generateTokensForAdmin(admin);
            res.status(201).json({
                success: true,
                message: 'Admin registered successfully',
                data: {
                    admin,
                    ...tokens
                }
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors
                });
            }
            console.error('Admin registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
    async login(req, res) {
        try {
            const validatedData = auth_admin_schemas_1.adminLoginSchema.parse(req.body);
            // Find admin
            const admin = await auth_helper_1.authHelper.findAdminByEmail(validatedData.email);
            if (!admin || !admin.password) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Admin-specific business logic checks
            const accessCheck = await this.checkAdminAccess(admin);
            if (!accessCheck.isValid) {
                return res.status(401).json({
                    success: false,
                    message: accessCheck.message
                });
            }
            // Verify password
            const isPasswordValid = await auth_helper_1.authHelper.verifyPassword(validatedData.password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Generate tokens with admin privileges
            const tokens = jwt_helper_1.jwtHelper.generateTokensForAdmin(admin);
            // Remove password from response
            const { password, ...adminWithoutPassword } = admin;
            res.json({
                success: true,
                message: 'Admin login successful',
                data: {
                    admin: adminWithoutPassword,
                    ...tokens
                }
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors
                });
            }
            console.error('Admin login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
    async googleAuth(req, res) {
        try {
            const { credential } = req.body;
            if (!credential) {
                return res.status(400).json({
                    success: false,
                    message: 'Google credential is required'
                });
            }
            // Business logic orchestration - Google OAuth + admin validation
            const googleUser = await jwt_helper_1.jwtHelper.verifyGoogleToken(credential);
            if (!googleUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid Google token'
                });
            }
            // Admin domain validation
            if (!this.isValidAdminDomain(googleUser.email)) {
                return res.status(403).json({
                    success: false,
                    message: 'Admin access is restricted to @flybeth.com email addresses'
                });
            }
            // Find or create admin
            let admin = await auth_helper_1.authHelper.findAdminByEmail(googleUser.email);
            if (!admin) {
                // Create new admin from Google OAuth
                admin = await auth_helper_1.authHelper.createAdmin({
                    email: googleUser.email,
                    firstName: googleUser.firstName,
                    lastName: googleUser.lastName,
                    role: 'VIEWER', // Default role for Google OAuth admins
                    googleId: googleUser.googleId,
                    avatar: googleUser.avatar
                });
            }
            // Generate tokens
            const tokens = jwt_helper_1.jwtHelper.generateTokensForAdmin(admin);
            res.json({
                success: true,
                message: 'Google authentication successful',
                data: {
                    admin,
                    ...tokens
                }
            });
        }
        catch (error) {
            console.error('Google auth error:', error);
            res.status(500).json({
                success: false,
                message: 'Google authentication failed'
            });
        }
    }
    // Business logic methods for admin operations
    isValidAdminDomain(email) {
        // Business rule: Only @flybeth.com emails can be admins
        return email.endsWith('@flybeth.com');
    }
    isValidAdminRole(role) {
        // Business logic for role validation
        const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'VIEWER'];
        return validRoles.includes(role);
    }
    async checkAdminAccess(admin) {
        // Business logic orchestration for admin access
        // Check if admin is active
        if (!admin.isActive) {
            return { isValid: false, message: 'Admin account is deactivated' };
        }
        // Check admin permissions
        if (admin.role === 'SUSPENDED') {
            return { isValid: false, message: 'Admin access has been suspended' };
        }
        // Additional security check for admin domain
        if (!this.isValidAdminDomain(admin.email)) {
            return { isValid: false, message: 'Admin email domain is no longer authorized' };
        }
        return { isValid: true };
    }
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
