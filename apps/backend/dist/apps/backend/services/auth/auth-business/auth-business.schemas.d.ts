import { z } from 'zod';
export declare const businessRegisterSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    companyName: z.ZodString;
    representativeName: z.ZodString;
    businessType: z.ZodOptional<z.ZodEnum<["corporation", "llc", "partnership", "sole_proprietorship"]>>;
    industry: z.ZodOptional<z.ZodString>;
    businessPhone: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    companyName: string;
    representativeName: string;
    businessType?: "corporation" | "llc" | "partnership" | "sole_proprietorship" | undefined;
    industry?: string | undefined;
    website?: string | undefined;
    businessPhone?: string | undefined;
}, {
    email: string;
    password: string;
    companyName: string;
    representativeName: string;
    businessType?: "corporation" | "llc" | "partnership" | "sole_proprietorship" | undefined;
    industry?: string | undefined;
    website?: string | undefined;
    businessPhone?: string | undefined;
}>;
export declare const businessLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
