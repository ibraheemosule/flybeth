"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleAuthSchema = exports.adminLoginSchema = exports.adminRegisterSchema = void 0;
const zod_1 = require("zod");
exports.adminRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email().refine(email => email.endsWith('@flybeth.com'), {
        message: 'Admin registration is only allowed for @flybeth.com domain'
    }),
    password: zod_1.z.string().min(8),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    role: zod_1.z.enum(['ADMIN', 'SUPER_ADMIN', 'SUPPORT']).default('ADMIN'),
});
exports.adminLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
exports.googleAuthSchema = zod_1.z.object({
    googleToken: zod_1.z.string().min(1),
});
