"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegisterSchema = void 0;
const zod_1 = require("zod");
exports.userRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    phone: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional()
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1)
});
