import { z } from "zod";
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const userTypeSchema: z.ZodEnum<["CONSUMER", "BUSINESS"]>;
export declare const nameSchema: z.ZodString;
export declare const signupSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    userType: z.ZodEnum<["CONSUMER", "BUSINESS"]>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    businessName: z.ZodOptional<z.ZodString>;
    businessDescription: z.ZodOptional<z.ZodString>;
    businessWebsite: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    userType: "CONSUMER" | "BUSINESS";
    firstName?: string | undefined;
    lastName?: string | undefined;
    businessDescription?: string | undefined;
    businessName?: string | undefined;
    businessWebsite?: string | undefined;
}, {
    email: string;
    password: string;
    userType: "CONSUMER" | "BUSINESS";
    firstName?: string | undefined;
    lastName?: string | undefined;
    businessDescription?: string | undefined;
    businessName?: string | undefined;
    businessWebsite?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const dateSchema: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, Date, string | Date>;
export declare const tripBookingSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    destination: z.ZodString;
    startDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, Date, string | Date>;
    travelers: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
}>, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
}>, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
}>;
export declare const b2bTripBookingSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    destination: z.ZodString;
    startDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, Date, string | Date>;
    endDate: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodDate]>, Date, string | Date>;
    travelers: z.ZodNumber;
    platformUserId: z.ZodString;
    platformUserEmail: z.ZodString;
}, "strip", z.ZodTypeAny, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
    platformUserId: string;
    platformUserEmail: string;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
    platformUserId: string;
    platformUserEmail: string;
}>, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
    platformUserId: string;
    platformUserEmail: string;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
    platformUserId: string;
    platformUserEmail: string;
}>, {
    destination: string;
    travelers: number;
    startDate: Date;
    endDate: Date;
    platformUserId: string;
    platformUserEmail: string;
}, {
    destination: string;
    travelers: number;
    startDate: string | Date;
    endDate: string | Date;
    platformUserId: string;
    platformUserEmail: string;
}>;
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type TripBookingData = z.infer<typeof tripBookingSchema>;
export type B2BTripBookingData = z.infer<typeof b2bTripBookingSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
