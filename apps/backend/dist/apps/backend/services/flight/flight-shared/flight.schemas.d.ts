import { z } from 'zod';
export declare const flightSearchSchema: z.ZodObject<{
    origin: z.ZodString;
    destination: z.ZodString;
    departureDate: z.ZodString;
    passengers: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    returnDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    origin: string;
    destination: string;
    departureDate: string;
    passengers: number;
    returnDate?: string | undefined;
}, {
    origin: string;
    destination: string;
    departureDate: string;
    passengers?: number | undefined;
    returnDate?: string | undefined;
}>;
export declare const flightBookingSchema: z.ZodObject<{
    flightId: z.ZodString;
    passengers: z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        dateOfBirth: z.ZodString;
        passportNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        passportNumber?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        passportNumber?: string | undefined;
    }>, "many">;
    contactInfo: z.ZodObject<{
        email: z.ZodString;
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
    }, {
        email: string;
        phone: string;
    }>;
}, "strip", z.ZodTypeAny, {
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        passportNumber?: string | undefined;
    }[];
    flightId: string;
    contactInfo: {
        email: string;
        phone: string;
    };
}, {
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        passportNumber?: string | undefined;
    }[];
    flightId: string;
    contactInfo: {
        email: string;
        phone: string;
    };
}>;
