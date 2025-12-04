"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkBookingSchema = exports.businessHotelBookingSchema = exports.businessHotelSearchSchema = void 0;
const zod_1 = require("zod");
exports.businessHotelSearchSchema = zod_1.z.object({
    location: zod_1.z.string().optional(),
    checkIn: zod_1.z.string().optional(),
    checkOut: zod_1.z.string().optional(),
    guests: zod_1.z.number().min(1).max(100).optional(), // Business limit: up to 100 guests
    maxPrice: zod_1.z.number().min(0).optional(), // No price limit for business
    minRating: zod_1.z.number().min(1).max(5).optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
    corporateId: zod_1.z.string().optional(),
    eventType: zod_1.z.enum(['conference', 'meeting', 'corporate_event', 'training', 'other']).optional()
});
exports.businessHotelBookingSchema = zod_1.z.object({
    hotelId: zod_1.z.string().min(1),
    checkIn: zod_1.z.string().min(1),
    checkOut: zod_1.z.string().min(1),
    guests: zod_1.z.number().min(1).max(100), // Business limit: up to 100 guests
    roomType: zod_1.z.string().min(1),
    specialRequests: zod_1.z.string().optional(),
    corporateId: zod_1.z.string().optional(),
    eventType: zod_1.z.enum(['conference', 'meeting', 'corporate_event', 'training', 'other']),
    billingInfo: zod_1.z.object({
        companyName: zod_1.z.string().min(1),
        taxId: zod_1.z.string().optional(),
        address: zod_1.z.string().min(1),
        contactPerson: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().min(1)
    }),
    requiresInvoice: zod_1.z.boolean().default(true)
});
exports.bulkBookingSchema = zod_1.z.object({
    bookings: zod_1.z.array(exports.businessHotelBookingSchema).min(1).max(50), // Max 50 bookings at once
    corporateDiscount: zod_1.z.number().min(0).max(50).optional(), // Up to 50% corporate discount
    paymentTerms: zod_1.z.enum(['immediate', 'net15', 'net30', 'net45']).default('immediate')
});
