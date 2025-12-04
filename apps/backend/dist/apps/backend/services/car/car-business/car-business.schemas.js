"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkCarRentalSchema = exports.cancelBusinessCarRentalSchema = exports.businessCarRentalSearchSchema = exports.createBusinessCarRentalSchema = void 0;
const zod_1 = require("zod");
const car_user_schemas_1 = require("../car-user/car-user.schemas");
exports.createBusinessCarRentalSchema = zod_1.z.object({
    serviceDetails: zod_1.z.object({
        carId: zod_1.z.string().min(1),
        carType: zod_1.z.string().min(1),
        category: zod_1.z.string().min(1)
    }),
    drivers: zod_1.z.array(car_user_schemas_1.driverSchema).min(1).max(5), // Max 5 drivers for business rentals
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
    }),
    corporateInfo: zod_1.z.object({
        companyName: zod_1.z.string().min(1),
        corporateId: zod_1.z.string().optional(),
        billingAddress: zod_1.z.string().min(1),
        taxId: zod_1.z.string().optional(),
        contactPerson: zod_1.z.string().min(1),
        contactEmail: zod_1.z.string().email(),
        contactPhone: zod_1.z.string().min(1)
    })
});
exports.businessCarRentalSearchSchema = zod_1.z.object({
    pickupLocation: zod_1.z.string().optional(),
    returnLocation: zod_1.z.string().optional(),
    pickupDate: zod_1.z.string().optional(),
    returnDate: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    transmission: zod_1.z.enum(['automatic', 'manual']).optional(),
    fuelType: zod_1.z.string().optional(),
    minPrice: zod_1.z.number().optional(),
    maxPrice: zod_1.z.number().optional(),
    insurance: zod_1.z.boolean().optional(),
    companyName: zod_1.z.string().optional(),
    corporateId: zod_1.z.string().optional()
});
exports.cancelBusinessCarRentalSchema = zod_1.z.object({
    reason: zod_1.z.string().min(1),
    refundType: zod_1.z.enum(['full', 'partial', 'none']).optional(),
    refundAmount: zod_1.z.number().min(0).optional()
});
exports.bulkCarRentalSchema = zod_1.z.object({
    rentals: zod_1.z.array(exports.createBusinessCarRentalSchema).min(1).max(20),
    bulkDiscount: zod_1.z.number().min(0).max(0.5).optional(),
    corporateInfo: zod_1.z.object({
        companyName: zod_1.z.string().min(1),
        corporateId: zod_1.z.string().optional(),
        billingAddress: zod_1.z.string().min(1),
        taxId: zod_1.z.string().optional(),
        contactPerson: zod_1.z.string().min(1),
        contactEmail: zod_1.z.string().email(),
        contactPhone: zod_1.z.string().min(1)
    })
});
