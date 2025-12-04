"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkHotelBookingSchema = exports.businessHotelBookingSchema = exports.hotelBookingSchema = exports.hotelSearchSchema = void 0;
var zod_1 = require("zod");
var flight_schemas_1 = require("./flight.schemas");
// Hotel search schema
exports.hotelSearchSchema = zod_1.z.object({
    destination: zod_1.z.string().min(1, "Destination is required"),
    checkInDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-in date"),
    checkOutDate: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-out date"),
    guests: zod_1.z.object({
        adults: zod_1.z
            .number()
            .min(1, "At least 1 adult required")
            .max(8, "Maximum 8 adults"),
        children: zod_1.z.number().min(0).max(6).default(0),
        rooms: zod_1.z
            .number()
            .min(1, "At least 1 room required")
            .max(5, "Maximum 5 rooms"),
    }),
    priceRange: zod_1.z
        .object({
        min: zod_1.z.number().min(0).optional(),
        max: zod_1.z.number().min(0).optional(),
    })
        .optional(),
    starRating: zod_1.z.number().min(1).max(5).optional(),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
});
// Hotel booking schema
exports.hotelBookingSchema = zod_1.z.object({
    hotelOfferId: zod_1.z.string().min(1, "Hotel offer ID is required"),
    guestInfo: zod_1.z.object({
        primaryGuest: zod_1.z.object({
            firstName: zod_1.z.string().min(1, "First name is required"),
            lastName: zod_1.z.string().min(1, "Last name is required"),
            email: zod_1.z.string().email("Invalid email address"),
            phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
        }),
        additionalGuests: zod_1.z
            .array(zod_1.z.object({
            firstName: zod_1.z.string().min(1, "First name is required"),
            lastName: zod_1.z.string().min(1, "Last name is required"),
            age: zod_1.z.number().min(0).max(120),
        }))
            .optional(),
    }),
    contactInfo: flight_schemas_1.contactInfoSchema,
    specialRequests: zod_1.z
        .string()
        .max(500, "Special requests must be under 500 characters")
        .optional(),
    paymentInfo: zod_1.z.object({
        cardNumber: zod_1.z.string().regex(/^\d{16}$/, "Invalid card number"),
        expiryMonth: zod_1.z.number().min(1).max(12),
        expiryYear: zod_1.z.number().min(new Date().getFullYear()),
        cvv: zod_1.z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
        cardholderName: zod_1.z.string().min(1, "Cardholder name is required"),
        billingAddress: zod_1.z.object({
            street: zod_1.z.string().min(1, "Street address is required"),
            city: zod_1.z.string().min(1, "City is required"),
            state: zod_1.z.string().min(1, "State is required"),
            zipCode: zod_1.z.string().min(1, "ZIP code is required"),
            country: zod_1.z.string().min(1, "Country is required"),
        }),
    }),
});
// Business hotel booking schema
exports.businessHotelBookingSchema = zod_1.z.object({
    hotelOfferId: zod_1.z.string().min(1, "Hotel offer ID is required"),
    corporateCode: zod_1.z.string().optional(),
    guestInfo: zod_1.z.object({
        primaryGuest: zod_1.z.object({
            firstName: zod_1.z.string().min(1, "First name is required"),
            lastName: zod_1.z.string().min(1, "Last name is required"),
            email: zod_1.z.string().email("Invalid email address"),
            phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
            employeeId: zod_1.z.string().optional(),
        }),
    }),
    billingInfo: zod_1.z.object({
        companyName: zod_1.z.string().min(1, "Company name is required"),
        taxId: zod_1.z.string().min(1, "Tax ID is required"),
        billingAddress: zod_1.z.object({
            street: zod_1.z.string().min(1, "Street address is required"),
            city: zod_1.z.string().min(1, "City is required"),
            state: zod_1.z.string().min(1, "State is required"),
            zipCode: zod_1.z.string().min(1, "ZIP code is required"),
            country: zod_1.z.string().min(1, "Country is required"),
        }),
        contactPerson: zod_1.z.object({
            name: zod_1.z.string().min(1, "Contact person name is required"),
            email: zod_1.z.string().email("Invalid email address"),
            phone: zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
        }),
    }),
    costCenter: zod_1.z.string().optional(),
    approverEmail: zod_1.z.string().email().optional(),
});
// Bulk hotel booking schema
exports.bulkHotelBookingSchema = zod_1.z.object({
    bookings: zod_1.z
        .array(exports.businessHotelBookingSchema)
        .min(1, "At least one booking required")
        .max(50, "Maximum 50 bookings per bulk request"),
    groupBookingId: zod_1.z.string().optional(),
});
//# sourceMappingURL=hotel.schemas.js.map