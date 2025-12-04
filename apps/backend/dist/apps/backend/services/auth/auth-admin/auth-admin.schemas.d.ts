import { z } from 'zod';
export declare const adminRegisterSchema: z.ZodObject<{
    email: z.ZodEffects<z.ZodString, string, string>;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["ADMIN", "SUPER_ADMIN", "SUPPORT"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: "ADMIN" | "SUPER_ADMIN" | "SUPPORT";
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: "ADMIN" | "SUPER_ADMIN" | "SUPPORT" | undefined;
}>;
export declare const adminLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const googleAuthSchema: z.ZodObject<{
    googleToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    googleToken: string;
}, {
    googleToken: string;
}>;
