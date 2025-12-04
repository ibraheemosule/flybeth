"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessCarRentalSchema = exports.carRentalBookingSchema = exports.carRentalSearchSchema = void 0;
var zod_1 = require("zod");
// Car rental search schema
exports.carRentalSearchSchema = zod_1.z.object({
    pickupLocation: zod_1.z.object({
        code: zod_1.z.string().min(3, "Pickup location code is required"),
        name: zod_1.z.string().min(1, "Pickup location name is required"),
        type: zod_1.z.enum(["airport", "city", "hotel"]).default("airport"),
    }),
    returnLocation: zod_1.z.object({
        code: zod_1.z.string().min(3, "Return location code is required"),
        name: zod_1.z.string().min(1, "Return location name is required"),
        type: zod_1.z.enum(["airport", "city", "hotel"]).default("airport"),
    }),
    pickupDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid pickup date"),
    pickupTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid pickup time (HH:MM)"),
    returnDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid return date"),
    returnTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid return time (HH:MM)"),
    driverAge: zod_1.z.number().min(18, "Driver must be at least 18 years old").max(99),
    carType: zod_1.z
        .enum([
        "economy",
        "compact",
        "intermediate",
        "standard",
        "fullsize",
        "premium",
        "luxury",
        "suv",
        "convertible",
    ])
        .optional(),
});
// Car rental booking schema
exports.carRentalBookingSchema = zod_1.z.object({
    carOfferId: zod_1.z.string().min(1, "Car offer ID is required"),
    primaryDriver: zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required"),
        lastName: zod_1.z.string().min(1, "Last name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
        dateOfBirth: zod_1.z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
        licenseNumber: zod_1.z.string().min(1, "License number is required"),
        licenseCountry: zod_1.z.string().min(2, "License country is required"),
        licenseExpiryDate: zod_1.z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid license expiry date"),
    }),
    additionalDrivers: zod_1.z
        .array(zod_1.z.object({
        firstName: zod_1.z.string().min(1, "First name is required"),
        lastName: zod_1.z.string().min(1, "Last name is required"),
        dateOfBirth: zod_1.z
            .string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
        licenseNumber: zod_1.z.string().min(1, "License number is required"),
        licenseCountry: zod_1.z.string().min(2, "License country is required"),
    }))
        .optional(),
    addOns: zod_1.z
        .array(zod_1.z.enum(["gps", "child_seat", "additional_insurance", "wifi", "roof_rack"]))
        .optional(),
    paymentInfo: zod_1.z.object({
        cardNumber: zod_1.z.string().regex(/^\d{16}$/, "Invalid card number"),
        expiryMonth: zod_1.z.number().min(1).max(12),
        expiryYear: zod_1.z.number().min(new Date().getFullYear()),
        cvv: zod_1.z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
        cardholderName: zod_1.z.string().min(1, "Cardholder name is required"),
    }),
});
// Business car rental schema
exports.businessCarRentalSchema = zod_1.z.object({
    serviceDetails: zod_1.z.object({
        carType: zod_1.z.enum([
            "economy",
            "compact",
            "intermediate",
            "standard",
            "fullsize",
            "premium",
            "luxury",
            "suv",
        ]),
        quantity: zod_1.z.number().min(1).max(50),
        duration: zod_1.z.number().min(1), // days
        pickupLocation: zod_1.z.string().min(1),
        returnLocation: zod_1.z.string().min(1),
    }),
    dates: zod_1.z.object({
        startDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
        endDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
        pickupTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid pickup time"),
        returnTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/, "Invalid return time"),
    }),
    locations: zod_1.z.object({
        pickup: zod_1.z.object({
            name: zod_1.z.string().min(1, "Pickup location name is required"),
            address: zod_1.z.string().min(1, "Pickup address is required"),
            coordinates: zod_1.z.object({ lat: zod_1.z.number(), lng: zod_1.z.number() }).optional(),
        }),
        return: zod_1.z.object({
            name: zod_1.z.string().min(1, "Return location name is required"),
            address: zod_1.z.string().min(1, "Return address is required"),
            coordinates: zod_1.z.object({ lat: zod_1.z.number(), lng: zod_1.z.number() }).optional(),
        }),
    }),
    preferences: zod_1.z.object({
        fuelPolicy: zod_1.z
            .enum(["full_to_full", "full_to_empty", "same_to_same"])
            .default("full_to_full"),
        mileageLimit: zod_1.z.enum(["unlimited", "limited"]).default("unlimited"),
        additionalEquipment: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    pricing: zod_1.z.object({
        baseRate: zod_1.z.number().positive(),
        currency: zod_1.z.string().length(3),
        taxesAndFees: zod_1.z.number().nonnegative(),
        totalAmount: zod_1.z.number().positive(),
        paymentTerms: zod_1.z
            .enum(["immediate", "net_15", "net_30"])
            .default("immediate"),
    }),
    corporateInfo: zod_1.z.object({
        companyName: zod_1.z.string().min(1),
        contactPerson: zod_1.z.string().min(1),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/),
        billingAddress: zod_1.z.object({
            street: zod_1.z.string().min(1),
            city: zod_1.z.string().min(1),
            state: zod_1.z.string().min(1),
            zipCode: zod_1.z.string().min(1),
            country: zod_1.z.string().min(1),
        }),
        taxId: zod_1.z.string().optional(),
    }),
});
//# sourceMappingURL=car.schemas.js.map