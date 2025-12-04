"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightBookingSchema = exports.flightSearchSchema = void 0;
const zod_1 = require("zod");
exports.flightSearchSchema = zod_1.z.object({
    origin: zod_1.z.string().min(3).max(3),
    destination: zod_1.z.string().min(3).max(3),
    departureDate: zod_1.z.string().datetime(),
    passengers: zod_1.z.number().min(1).max(9).optional().default(1),
    returnDate: zod_1.z.string().datetime().optional(),
});
exports.flightBookingSchema = zod_1.z.object({
    flightId: zod_1.z.string().uuid(),
    passengers: zod_1.z.array(zod_1.z.object({
        firstName: zod_1.z.string().min(1),
        lastName: zod_1.z.string().min(1),
        dateOfBirth: zod_1.z.string().datetime(),
        passportNumber: zod_1.z.string().optional(),
    })),
    contactInfo: zod_1.z.object({
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().min(1),
    }),
});
