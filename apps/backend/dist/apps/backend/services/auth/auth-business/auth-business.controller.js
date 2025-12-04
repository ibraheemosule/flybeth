"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessController = exports.BusinessController = void 0;
const zod_1 = require("zod");
const auth_helper_1 = require("../auth-shared/auth.helper");
const jwt_helper_1 = require("../auth-shared/jwt.helper");
const auth_business_schemas_1 = require("./auth-business.schemas");
class BusinessController {
    async register(req, res) {
        try {
            const validatedData = auth_business_schemas_1.businessRegisterSchema.parse(req.body);
            // Check if business already exists
            const existingBusiness = await auth_helper_1.authHelper.findBusinessByEmail(validatedData.email);
            if (existingBusiness) {
                return res.status(400).json({
                    success: false,
                    message: 'Business with this email already exists'
                });
            }
            // Business logic validation
            if (!this.isValidBusinessName(validatedData.companyName)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid company name format'
                });
            }
            // Create business
            const business = await auth_helper_1.authHelper.createBusiness(validatedData);
            // Generate tokens
            const tokens = jwt_helper_1.jwtHelper.generateTokensForBusiness(business);
            res.status(201).json({
                success: true,
                message: 'Business registered successfully',
                data: {
                    business,
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
            console.error('Business registration error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
    async login(req, res) {
        try {
            const validatedData = auth_business_schemas_1.businessLoginSchema.parse(req.body);
            // Find business
            const business = await auth_helper_1.authHelper.findBusinessByEmail(validatedData.email);
            if (!business || !business.password) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Check business status - business logic orchestration
            const statusCheck = await this.checkBusinessStatus(business);
            if (!statusCheck.isValid) {
                return res.status(401).json({
                    success: false,
                    message: statusCheck.message
                });
            }
            // Verify password
            const isPasswordValid = await auth_helper_1.authHelper.verifyPassword(validatedData.password, business.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }
            // Generate tokens
            const tokens = jwt_helper_1.jwtHelper.generateTokensForBusiness(business);
            // Remove password from response
            const { password, ...businessWithoutPassword } = business;
            res.json({
                success: true,
                message: 'Business login successful',
                data: {
                    business: businessWithoutPassword,
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
            console.error('Business login error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
    // Business logic methods - these orchestrate multiple service calls
    isValidBusinessName(name) {
        // Business logic for validating business name
        const minLength = 2;
        const maxLength = 100;
        const validPattern = /^[a-zA-Z0-9\s\.\-&']+$/;
        return name.length >= minLength &&
            name.length <= maxLength &&
            validPattern.test(name);
    }
    isValidTaxId(taxId) {
        // Business logic for validating tax ID
        const taxIdPattern = /^[0-9\-]+$/;
        return taxIdPattern.test(taxId) && taxId.length >= 9;
    }
    async checkBusinessStatus(business) {
        // Business logic orchestration - checking multiple conditions
        // Check if business is active
        if (!business.isActive) {
            return { isValid: false, message: 'Business account is deactivated' };
        }
        // Check verification status
        if (!business.isVerified) {
            return { isValid: false, message: 'Business account is not verified. Please verify your account first.' };
        }
        // Check subscription status (if applicable)
        if (business.subscriptionStatus === 'SUSPENDED') {
            return { isValid: false, message: 'Business account is suspended due to subscription issues' };
        }
        return { isValid: true };
    }
}
exports.BusinessController = BusinessController;
exports.businessController = new BusinessController();
