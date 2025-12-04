"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelBookingSchema = exports.hotelSearchSchema = void 0;
const zod_1 = require("zod");
exports.hotelSearchSchema = zod_1.z.object({
    location: zod_1.z.string().optional(),
    checkIn: zod_1.z.string().optional(),
    checkOut: zod_1.z.string().optional(),
    guests: zod_1.z.number().min(1).max(6).optional(), // User limit: max 6 guests
    maxPrice: zod_1.z.number().min(0).max(1000).optional(), // User limit: max $1000 per night
    minRating: zod_1.z.number().min(1).max(5).optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional()
});
exports.hotelBookingSchema = zod_1.z.object({
    hotelId: zod_1.z.string().min(1),
    checkIn: zod_1.z.string().min(1),
    checkOut: zod_1.z.string().min(1),
    guests: zod_1.z.number().min(1).max(6), // User limit: max 6 guests
    roomType: zod_1.z.string().min(1),
    specialRequests: zod_1.z.string().optional()
});
