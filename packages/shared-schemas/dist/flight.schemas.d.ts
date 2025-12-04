import { z } from "zod";
export declare const locationSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    city?: string | undefined;
    country?: string | undefined;
}, {
    code: string;
    name: string;
    city?: string | undefined;
    country?: string | undefined;
}>;
export declare const passengerSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    dateOfBirth: z.ZodString;
    passportNumber: z.ZodOptional<z.ZodString>;
    nationality: z.ZodString;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber?: string | undefined;
}, {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber?: string | undefined;
}>;
export declare const contactInfoSchema: z.ZodObject<{
    email: z.ZodString;
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone: string;
}, {
    email: string;
    phone: string;
}>;
export declare const flightSearchSchema: z.ZodObject<{
    origin: z.ZodString;
    destination: z.ZodString;
    departureDate: z.ZodString;
    returnDate: z.ZodOptional<z.ZodString>;
    passengers: z.ZodNumber;
    class: z.ZodDefault<z.ZodEnum<["economy", "premium_economy", "business", "first"]>>;
    tripType: z.ZodDefault<z.ZodEnum<["round_trip", "one_way", "multi_city"]>>;
}, "strip", z.ZodTypeAny, {
    destination: string;
    origin: string;
    departureDate: string;
    passengers: number;
    class: "economy" | "premium_economy" | "business" | "first";
    tripType: "round_trip" | "one_way" | "multi_city";
    returnDate?: string | undefined;
}, {
    destination: string;
    origin: string;
    departureDate: string;
    passengers: number;
    returnDate?: string | undefined;
    class?: "economy" | "premium_economy" | "business" | "first" | undefined;
    tripType?: "round_trip" | "one_way" | "multi_city" | undefined;
}>;
export declare const flightBookingSchema: z.ZodObject<{
    flightOfferId: z.ZodString;
    passengers: z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        dateOfBirth: z.ZodString;
        passportNumber: z.ZodOptional<z.ZodString>;
        nationality: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
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
    paymentInfo: z.ZodObject<{
        cardNumber: z.ZodString;
        expiryMonth: z.ZodNumber;
        expiryYear: z.ZodNumber;
        cvv: z.ZodString;
        cardholderName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    }, {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    };
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }[];
    flightOfferId: string;
    contactInfo: {
        email: string;
        phone: string;
    };
}, {
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    };
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }[];
    flightOfferId: string;
    contactInfo: {
        email: string;
        phone: string;
    };
}>;
export declare const flightBookingResponseSchema: z.ZodObject<{
    bookingReference: z.ZodString;
    status: z.ZodEnum<["confirmed", "pending", "failed"]>;
    totalPrice: z.ZodNumber;
    currency: z.ZodString;
    passengers: z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        dateOfBirth: z.ZodString;
        passportNumber: z.ZodOptional<z.ZodString>;
        nationality: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }>, "many">;
    flights: z.ZodArray<z.ZodObject<{
        flightNumber: z.ZodString;
        airline: z.ZodString;
        departure: z.ZodObject<{
            airport: z.ZodString;
            time: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            airport: string;
            time: string;
        }, {
            airport: string;
            time: string;
        }>;
        arrival: z.ZodObject<{
            airport: z.ZodString;
            time: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            airport: string;
            time: string;
        }, {
            airport: string;
            time: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        flightNumber: string;
        airline: string;
        departure: {
            airport: string;
            time: string;
        };
        arrival: {
            airport: string;
            time: string;
        };
    }, {
        flightNumber: string;
        airline: string;
        departure: {
            airport: string;
            time: string;
        };
        arrival: {
            airport: string;
            time: string;
        };
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "confirmed" | "failed";
    currency: string;
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }[];
    bookingReference: string;
    totalPrice: number;
    flights: {
        flightNumber: string;
        airline: string;
        departure: {
            airport: string;
            time: string;
        };
        arrival: {
            airport: string;
            time: string;
        };
    }[];
}, {
    status: "pending" | "confirmed" | "failed";
    currency: string;
    passengers: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        passportNumber?: string | undefined;
    }[];
    bookingReference: string;
    totalPrice: number;
    flights: {
        flightNumber: string;
        airline: string;
        departure: {
            airport: string;
            time: string;
        };
        arrival: {
            airport: string;
            time: string;
        };
    }[];
}>;
export type LocationInput = z.infer<typeof locationSchema>;
export type PassengerInput = z.infer<typeof passengerSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type FlightSearchInput = z.infer<typeof flightSearchSchema>;
export type FlightBookingInput = z.infer<typeof flightBookingSchema>;
export type FlightBookingResponse = z.infer<typeof flightBookingResponseSchema>;
//# sourceMappingURL=flight.schemas.d.ts.map