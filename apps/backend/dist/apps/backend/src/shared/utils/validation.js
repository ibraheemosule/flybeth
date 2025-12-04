"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b2bTripBookingSchema = exports.tripBookingSchema = exports.dateSchema = exports.loginSchema = exports.signupSchema = exports.nameSchema = exports.userTypeSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
// User validation schemas
exports.emailSchema = zod_1.z.string().email("Must be a valid email address");
exports.passwordSchema = zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number");
exports.userTypeSchema = zod_1.z.enum(["CONSUMER", "BUSINESS"]);
exports.nameSchema = zod_1.z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters");
// Authentication schemas
exports.signupSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    userType: exports.userTypeSchema,
    firstName: exports.nameSchema.optional(),
    lastName: exports.nameSchema.optional(),
    businessName: zod_1.z
        .string()
        .trim()
        .min(2, "Business name must be at least 2 characters")
        .max(100, "Business name must be less than 100 characters")
        .optional(),
    businessDescription: zod_1.z
        .string()
        .trim()
        .max(500, "Business description must be less than 500 characters")
        .optional(),
    businessWebsite: zod_1.z.string().url("Must be a valid URL").optional(),
});
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, "Password is required"),
});
// Trip booking schemas
exports.dateSchema = zod_1.z
    .string()
    .datetime("Must be a valid ISO 8601 date")
    .or(zod_1.z.date())
    .transform(date => new Date(date));
exports.tripBookingSchema = zod_1.z
    .object({
    destination: zod_1.z
        .string()
        .trim()
        .min(2, "Destination must be at least 2 characters")
        .max(100, "Destination must be less than 100 characters"),
    startDate: exports.dateSchema,
    endDate: exports.dateSchema,
    travelers: zod_1.z
        .number()
        .int()
        .min(1, "At least 1 traveler is required")
        .max(20, "Maximum 20 travelers allowed"),
})
    .refine(data => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.startDate >= today;
}, {
    message: "Start date must be in the future",
    path: ["startDate"],
})
    .refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});
exports.b2bTripBookingSchema = zod_1.z
    .object({
    destination: zod_1.z
        .string()
        .trim()
        .min(2, "Destination must be at least 2 characters")
        .max(100, "Destination must be less than 100 characters"),
    startDate: exports.dateSchema,
    endDate: exports.dateSchema,
    travelers: zod_1.z
        .number()
        .int()
        .min(1, "At least 1 traveler is required")
        .max(20, "Maximum 20 travelers allowed"),
    platformUserId: zod_1.z
        .string()
        .trim()
        .min(1, "Platform user ID is required")
        .max(100, "Platform user ID must be less than 100 characters"),
    platformUserEmail: exports.emailSchema,
})
    .refine(data => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return data.startDate >= today;
}, {
    message: "Start date must be in the future",
    path: ["startDate"],
})
    .refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
});
