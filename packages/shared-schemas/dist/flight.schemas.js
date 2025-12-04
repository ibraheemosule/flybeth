"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightBookingResponseSchema = exports.flightBookingSchema = exports.flightSearchSchema = exports.contactInfoSchema = exports.passengerSchema = exports.locationSchema = void 0;
var zod_1 = require("zod");
// Common location schema
exports.locationSchema = zod_1.z.object({
    code: zod_1.z.string().min(3, "Airport/city code must be at least 3 characters"),
    name: zod_1.z.string().min(1, "Location name is required"),
    city: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
});
// Passenger information schema
exports.passengerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    dateOfBirth: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    passportNumber: zod_1.z.string().optional(),
    nationality: zod_1.z.string().min(2, "Nationality is required"),
});
// Contact information schema
exports.contactInfoSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});
// Flight search schema
exports.flightSearchSchema = zod_1.z.object({
    origin: zod_1.z.string().min(3, "Origin is required"),
    destination: zod_1.z.string().min(3, "Destination is required"),
    departureDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid departure date"),
    returnDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid return date")
        .optional(),
    passengers: zod_1.z
        .number()
        .min(1, "At least 1 passenger required")
        .max(9, "Maximum 9 passengers"),
    class: zod_1.z
        .enum(["economy", "premium_economy", "business", "first"])
        .default("economy"),
    tripType: zod_1.z
        .enum(["round_trip", "one_way", "multi_city"])
        .default("round_trip"),
});
// Flight booking schema
exports.flightBookingSchema = zod_1.z.object({
    flightOfferId: zod_1.z.string().min(1, "Flight offer ID is required"),
    passengers: zod_1.z
        .array(exports.passengerSchema)
        .min(1, "At least one passenger required"),
    contactInfo: exports.contactInfoSchema,
    paymentInfo: zod_1.z.object({
        cardNumber: zod_1.z.string().regex(/^\d{16}$/, "Invalid card number"),
        expiryMonth: zod_1.z.number().min(1).max(12),
        expiryYear: zod_1.z.number().min(new Date().getFullYear()),
        cvv: zod_1.z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
        cardholderName: zod_1.z.string().min(1, "Cardholder name is required"),
    }),
});
// Flight booking response schema
exports.flightBookingResponseSchema = zod_1.z.object({
    bookingReference: zod_1.z.string(),
    status: zod_1.z.enum(["confirmed", "pending", "failed"]),
    totalPrice: zod_1.z.number().positive(),
    currency: zod_1.z.string().length(3),
    passengers: zod_1.z.array(exports.passengerSchema),
    flights: zod_1.z.array(zod_1.z.object({
        flightNumber: zod_1.z.string(),
        airline: zod_1.z.string(),
        departure: zod_1.z.object({
            airport: zod_1.z.string(),
            time: zod_1.z.string(),
        }),
        arrival: zod_1.z.object({
            airport: zod_1.z.string(),
            time: zod_1.z.string(),
        }),
    })),
});
//# sourceMappingURL=flight.schemas.js.map