"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelCarRentalSchema = exports.carSearchSchema = exports.createCarRentalSchema = exports.driverSchema = void 0;
const zod_1 = require("zod");
exports.driverSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string(),
    documentType: zod_1.z.enum(['drivingLicense', 'passport', 'nationalId']),
    documentNumber: zod_1.z.string().min(1),
    documentExpiry: zod_1.z.string(),
    licenseNumber: zod_1.z.string().min(1),
    licenseIssueDate: zod_1.z.string(),
    licenseExpiryDate: zod_1.z.string(),
    licenseCountry: zod_1.z.string().min(2)
});
exports.createCarRentalSchema = zod_1.z.object({
    serviceDetails: zod_1.z.object({
        carId: zod_1.z.string().min(1),
        carType: zod_1.z.string().min(1),
        category: zod_1.z.string().min(1)
    }),
    drivers: zod_1.z.array(exports.driverSchema).min(1).max(2), // Max 2 drivers for user rentals
    dates: zod_1.z.object({
        pickupDate: zod_1.z.string(),
        returnDate: zod_1.z.string(),
        pickupTime: zod_1.z.string(),
        returnTime: zod_1.z.string()
    }),
    locations: zod_1.z.object({
        pickup: zod_1.z.object({
            address: zod_1.z.string().min(1),
            city: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1)
        }),
        return: zod_1.z.object({
            address: zod_1.z.string().min(1),
            city: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1)
        })
    }),
    preferences: zod_1.z.object({
        insurance: zod_1.z.boolean().optional(),
        extras: zod_1.z.array(zod_1.z.string()).optional(),
        specialRequests: zod_1.z.string().optional()
    }).optional(),
    pricing: zod_1.z.object({
        dailyRate: zod_1.z.number().positive(),
        totalDays: zod_1.z.number().positive(),
        basePrice: zod_1.z.number().positive(),
        taxes: zod_1.z.number().min(0),
        fees: zod_1.z.number().min(0),
        totalPrice: zod_1.z.number().positive()
    })
});
exports.carSearchSchema = zod_1.z.object({
    pickupLocation: zod_1.z.string().optional(),
    returnLocation: zod_1.z.string().optional(),
    pickupDate: zod_1.z.string().optional(),
    returnDate: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    transmission: zod_1.z.enum(['automatic', 'manual']).optional(),
    fuelType: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().optional(),
    maxPrice: zod_1.z.number().optional(),
    insurance: zod_1.z.boolean().optional()
});
exports.cancelCarRentalSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1)
});
