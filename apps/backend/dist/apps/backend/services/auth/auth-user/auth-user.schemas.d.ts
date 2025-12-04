import { z } from 'zod';
export declare const userRegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string | undefined;
    phone?: string | undefined;
}, {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string | undefined;
    phone?: string | undefined;
}>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type UserRegisterRequest = z.infer<typeof userRegisterSchema>;
export type UserLoginRequest = z.infer<typeof userLoginSchema>;
