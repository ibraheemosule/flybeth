"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorSchema = exports.paginatedResponseSchema = exports.apiResponseSchema = exports.tripSchema = exports.paymentMethodSchema = exports.addressSchema = exports.currencySchema = exports.bookingStatusSchema = exports.priceRangeSchema = exports.dateRangeSchema = exports.paginationSchema = void 0;
var zod_1 = require("zod");
// Common schemas
exports.paginationSchema = zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(10),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("asc"),
});
// Search filters
exports.dateRangeSchema = zod_1.z.object({
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
});
exports.priceRangeSchema = zod_1.z.object({
    min: zod_1.z.number().min(0).optional(),
    max: zod_1.z.number().min(0).optional(),
});
// Booking status
exports.bookingStatusSchema = zod_1.z.enum([
    "pending",
    "confirmed",
    "cancelled",
    "completed",
    "refunded",
    "modified",
]);
// Currency schema
exports.currencySchema = zod_1.z
    .string()
    .length(3)
    .regex(/^[A-Z]{3}$/, "Invalid currency code");
// Address schema
exports.addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(1, "Street address is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    zipCode: zod_1.z.string().min(1, "ZIP code is required"),
    country: zod_1.z.string().min(1, "Country is required"),
});
// Payment method schema
exports.paymentMethodSchema = zod_1.z.object({
    cardNumber: zod_1.z.string().regex(/^\d{16}$/, "Invalid card number"),
    expiryMonth: zod_1.z.number().min(1).max(12),
    expiryYear: zod_1.z.number().min(new Date().getFullYear()),
    cvv: zod_1.z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
    cardholderName: zod_1.z.string().min(1, "Cardholder name is required"),
    billingAddress: exports.addressSchema.optional(),
});
// Trip creation schema (for frontend forms)
exports.tripSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1, "Destination is required"),
    startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
    endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
    travelers: zod_1.z
        .number()
        .min(1, "At least 1 traveler required")
        .max(10, "Maximum 10 travelers"),
    budget: zod_1.z.number().min(0).optional(),
    preferences: zod_1.z
        .object({
        accommodation: zod_1.z.enum(["budget", "mid-range", "luxury"]).optional(),
        activities: zod_1.z.array(zod_1.z.string()).optional(),
        transportation: zod_1.z.enum(["flight", "car", "train", "bus"]).optional(),
    })
        .optional(),
});
// API Response schemas
exports.apiResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string().optional(),
    data: zod_1.z.any().optional(),
    errors: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.paginatedResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    data: zod_1.z.array(zod_1.z.any()),
    pagination: zod_1.z.object({
        page: zod_1.z.number(),
        limit: zod_1.z.number(),
        total: zod_1.z.number(),
        pages: zod_1.z.number(),
    }),
});
// Error schema
exports.errorSchema = zod_1.z.object({
    code: zod_1.z.string(),
    message: zod_1.z.string(),
    field: zod_1.z.string().optional(),
});
//# sourceMappingURL=common.schemas.js.map