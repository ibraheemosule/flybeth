"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessLoginSchema = exports.businessRegisterSchema = void 0;
const zod_1 = require("zod");
exports.businessRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    companyName: zod_1.z.string().min(1),
    representativeName: zod_1.z.string().min(1),
    businessType: zod_1.z.enum(['corporation', 'llc', 'partnership', 'sole_proprietorship']).optional(),
    industry: zod_1.z.string().optional(),
    businessPhone: zod_1.z.string().optional(),
    website: zod_1.z.string().url().optional(),
});
exports.businessLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
