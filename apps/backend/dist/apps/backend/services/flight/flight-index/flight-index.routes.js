"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const flight_user_routes_1 = require("../flight-user/flight-user.routes");
const flight_business_routes_1 = require("../flight-business/flight-business.routes");
const router = (0, express_1.Router)();
// Mount user and business flight routes
router.use('/user', flight_user_routes_1.flightUserRoutes);
router.use('/business', flight_business_routes_1.flightBusinessRoutes);
// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Flight service is healthy',
        features: {
            user: '/api/flights/user/*',
            business: '/api/flights/business/*',
            shared: 'Shared flight search and data providers'
        }
    });
});
exports.default = router;
