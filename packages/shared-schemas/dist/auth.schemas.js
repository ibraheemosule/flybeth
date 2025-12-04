"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = exports.businessLoginSchema = exports.businessRegisterSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.registerSchema = exports.loginSchema = exports.phoneSchema = exports.passwordSchema = exports.emailSchema = void 0;
var zod_1 = require("zod");
// Common validation patterns
exports.emailSchema = zod_1.z.string().email("Invalid email address");
exports.passwordSchema = zod_1.z
    .string()
    .min(8, "Password must be at least 8 characters");
exports.phoneSchema = zod_1.z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number");
// User Authentication Schemas
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, "Password is required"),
});
exports.registerSchema = zod_1.z
    .object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    confirmPassword: zod_1.z.string(),
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    phone: exports.phoneSchema.optional(),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: exports.emailSchema,
});
exports.resetPasswordSchema = zod_1.z
    .object({
    token: zod_1.z.string().min(1, "Reset token is required"),
    password: exports.passwordSchema,
    confirmPassword: zod_1.z.string(),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
// Business Authentication Schemas
exports.businessRegisterSchema = zod_1.z
    .object({
    email: exports.emailSchema,
    password: exports.passwordSchema,
    confirmPassword: zod_1.z.string(),
    companyName: zod_1.z.string().min(1, "Company name is required"),
    contactName: zod_1.z.string().min(1, "Contact name is required"),
    phone: exports.phoneSchema,
    address: zod_1.z.object({
        street: zod_1.z.string().min(1, "Street address is required"),
        city: zod_1.z.string().min(1, "City is required"),
        state: zod_1.z.string().min(1, "State is required"),
        zipCode: zod_1.z.string().min(1, "ZIP code is required"),
        country: zod_1.z.string().min(1, "Country is required"),
    }),
    businessType: zod_1.z.enum(["travel_agency", "corporate", "tour_operator"]),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.businessLoginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: zod_1.z.string().min(1, "Password is required"),
});
// Admin Authentication Schemas
exports.adminLoginSchema = zod_1.z.object({
    email: exports.emailSchema.refine(function (email) { return email.endsWith("@flybeth.com"); }, "Admin access requires @flybeth.com email"),
    password: zod_1.z.string().min(1, "Password is required"),
});
//# sourceMappingURL=auth.schemas.js.map