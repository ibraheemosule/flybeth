"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotel_user_routes_1 = __importDefault(require("../hotel-user/hotel-user.routes"));
const hotel_business_routes_1 = __importDefault(require("../hotel-business/hotel-business.routes"));
const router = (0, express_1.Router)();
// Mount feature-specific routes
router.use('/user', hotel_user_routes_1.default);
router.use('/business', hotel_business_routes_1.default);
// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'hotel-service',
        message: 'Hotel service is running',
        timestamp: new Date().toISOString(),
        features: {
            user: 'Individual bookings with user-friendly pricing',
            business: 'Corporate bookings with volume discounts'
        }
    });
});
exports.default = router;
