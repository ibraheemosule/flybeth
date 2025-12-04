"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const car_user_routes_1 = __importDefault(require("../car-user/car-user.routes"));
const car_business_routes_1 = __importDefault(require("../car-business/car-business.routes"));
const router = (0, express_1.Router)();
// Mount feature-specific routes
router.use('/user', car_user_routes_1.default);
router.use('/business', car_business_routes_1.default);
// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        service: 'car-service',
        message: 'Car rental service is running',
        timestamp: new Date().toISOString(),
        features: {
            user: 'Individual car rentals with 2 driver limit and $1.5k value cap',
            business: 'Corporate car rentals with bulk features and unlimited value'
        }
    });
});
exports.default = router;
