"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const auth_index_routes_1 = __importDefault(require("../services/auth/auth-index/auth-index.routes"));
const flight_index_routes_1 = __importDefault(require("../services/flight/flight-index/flight-index.routes"));
const hotel_index_routes_1 = __importDefault(require("../services/hotel/hotel-index/hotel-index.routes"));
const car_index_routes_1 = __importDefault(require("../services/car/car-index/car-index.routes"));
const router = (0, express_1.Router)();
exports.apiRouter = router;
// Mount service routes
router.use("/api/auth", auth_index_routes_1.default);
router.use("/api/flights", flight_index_routes_1.default);
router.use("/api/hotels", hotel_index_routes_1.default);
router.use("/api/cars", car_index_routes_1.default);
// Health check endpoint for the entire API
router.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        services: {
            auth: "available",
            admin: "available",
            flights: "available",
            hotels: "available",
            cars: "available",
        },
    });
});
