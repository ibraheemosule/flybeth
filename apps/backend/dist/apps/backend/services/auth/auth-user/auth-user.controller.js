"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const zod_1 = require("zod");
const auth_helper_1 = require("../auth-shared/auth.helper");
const jwt_helper_1 = require("../auth-shared/jwt.helper");
const auth_user_schemas_1 = require("./auth-user.schemas");
class UserController {
    async register(req, res) {
        try {
            const validatedData = auth_user_schemas_1.userRegisterSchema.parse(req.body);
            // Check if user already exists
            const existingUser = await auth_helper_1.authHelper.findUserByEmail(validatedData.email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User with this email already exists'
                });
            }
            // Create user
            const user = await auth_helper_1.authHelper.createUser(validatedData);
            // Generate tokens
            const tokens = jwt_helper_1.jwtHelper.generateTokensForUser(user);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user,
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
            console.error('User registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
    async login(req, res) {
        try {
            const validatedData = auth_user_schemas_1.userLoginSchema.parse(req.body);
            // Find user
            const user = await auth_helper_1.authHelper.findUserByEmail(validatedData.email);
            if (!user || !user.password) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Check if user is active
            if (!user.isActive) {
                return res.status(401).json({
                    success: false,
                    message: 'User account is deactivated'
                });
            }
            // Verify password
            const isPasswordValid = await auth_helper_1.authHelper.verifyPassword(validatedData.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Generate tokens
            const tokens = jwt_helper_1.jwtHelper.generateTokensForUser(user);
            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            res.json({
                success: true,
                message: 'User login successful',
                data: {
                    user: userWithoutPassword,
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
            console.error('User login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
