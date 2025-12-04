"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_user_routes_1 = require("../auth-user/auth-user.routes");
const auth_business_routes_1 = require("../auth-business/auth-business.routes");
const auth_admin_routes_1 = require("../auth-admin/auth-admin.routes");
const router = (0, express_1.Router)();
// Mount feature-specific routes
router.use('/user', auth_user_routes_1.userRoutes);
router.use('/business', auth_business_routes_1.businessRoutes);
router.use('/admin', auth_admin_routes_1.adminRoutes);
// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Auth service is healthy',
        features: {
            user: '/api/auth/user/*',
            business: '/api/auth/business/*',
            admin: '/api/auth/admin/*'
        }
    });
});
exports.default = router;
