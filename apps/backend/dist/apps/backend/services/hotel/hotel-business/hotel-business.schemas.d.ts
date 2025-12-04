import { z } from 'zod';
export declare const businessHotelSearchSchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    checkIn: z.ZodOptional<z.ZodString>;
    checkOut: z.ZodOptional<z.ZodString>;
    guests: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    minRating: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    corporateId: z.ZodOptional<z.ZodString>;
    eventType: z.ZodOptional<z.ZodEnum<["conference", "meeting", "corporate_event", "training", "other"]>>;
}, "strip", z.ZodTypeAny, {
    location?: string | undefined;
    checkIn?: string | undefined;
    checkOut?: string | undefined;
    guests?: number | undefined;
    maxPrice?: number | undefined;
    minRating?: number | undefined;
    amenities?: string[] | undefined;
    corporateId?: string | undefined;
    eventType?: "other" | "conference" | "meeting" | "corporate_event" | "training" | undefined;
}, {
    location?: string | undefined;
    checkIn?: string | undefined;
    checkOut?: string | undefined;
    guests?: number | undefined;
    maxPrice?: number | undefined;
    minRating?: number | undefined;
    amenities?: string[] | undefined;
    corporateId?: string | undefined;
    eventType?: "other" | "conference" | "meeting" | "corporate_event" | "training" | undefined;
}>;
export declare const businessHotelBookingSchema: z.ZodObject<{
    hotelId: z.ZodString;
    checkIn: z.ZodString;
    checkOut: z.ZodString;
    guests: z.ZodNumber;
    roomType: z.ZodString;
    specialRequests: z.ZodOptional<z.ZodString>;
    corporateId: z.ZodOptional<z.ZodString>;
    eventType: z.ZodEnum<["conference", "meeting", "corporate_event", "training", "other"]>;
    billingInfo: z.ZodObject<{
        companyName: z.ZodString;
        taxId: z.ZodOptional<z.ZodString>;
        address: z.ZodString;
        contactPerson: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        address: string;
        companyName: string;
        phone: string;
        contactPerson: string;
        taxId?: string | undefined;
    }, {
        email: string;
        address: string;
        companyName: string;
        phone: string;
        contactPerson: string;
        taxId?: string | undefined;
    }>;
    requiresInvoice: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    checkIn: string;
    checkOut: string;
    guests: number;
    hotelId: string;
    roomType: string;
    eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
    billingInfo: {
        email: string;
        address: string;
        companyName: string;
        phone: string;
        contactPerson: string;
        taxId?: string | undefined;
    };
    requiresInvoice: boolean;
    specialRequests?: string | undefined;
    corporateId?: string | undefined;
}, {
    checkIn: string;
    checkOut: string;
    guests: number;
    hotelId: string;
    roomType: string;
    eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
    billingInfo: {
        email: string;
        address: string;
        companyName: string;
        phone: string;
        contactPerson: string;
        taxId?: string | undefined;
    };
    specialRequests?: string | undefined;
    corporateId?: string | undefined;
    requiresInvoice?: boolean | undefined;
}>;
export declare const bulkBookingSchema: z.ZodObject<{
    bookings: z.ZodArray<z.ZodObject<{
        hotelId: z.ZodString;
        checkIn: z.ZodString;
        checkOut: z.ZodString;
        guests: z.ZodNumber;
        roomType: z.ZodString;
        specialRequests: z.ZodOptional<z.ZodString>;
        corporateId: z.ZodOptional<z.ZodString>;
        eventType: z.ZodEnum<["conference", "meeting", "corporate_event", "training", "other"]>;
        billingInfo: z.ZodObject<{
            companyName: z.ZodString;
            taxId: z.ZodOptional<z.ZodString>;
            address: z.ZodString;
            contactPerson: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        }, {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        }>;
        requiresInvoice: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        checkIn: string;
        checkOut: string;
        guests: number;
        hotelId: string;
        roomType: string;
        eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
        billingInfo: {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        };
        requiresInvoice: boolean;
        specialRequests?: string | undefined;
        corporateId?: string | undefined;
    }, {
        checkIn: string;
        checkOut: string;
        guests: number;
        hotelId: string;
        roomType: string;
        eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
        billingInfo: {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        };
        specialRequests?: string | undefined;
        corporateId?: string | undefined;
        requiresInvoice?: boolean | undefined;
    }>, "many">;
    corporateDiscount: z.ZodOptional<z.ZodNumber>;
    paymentTerms: z.ZodDefault<z.ZodEnum<["immediate", "net15", "net30", "net45"]>>;
}, "strip", z.ZodTypeAny, {
    bookings: {
        checkIn: string;
        checkOut: string;
        guests: number;
        hotelId: string;
        roomType: string;
        eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
        billingInfo: {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        };
        requiresInvoice: boolean;
        specialRequests?: string | undefined;
        corporateId?: string | undefined;
    }[];
    paymentTerms: "immediate" | "net15" | "net30" | "net45";
    corporateDiscount?: number | undefined;
}, {
    bookings: {
        checkIn: string;
        checkOut: string;
        guests: number;
        hotelId: string;
        roomType: string;
        eventType: "other" | "conference" | "meeting" | "corporate_event" | "training";
        billingInfo: {
            email: string;
            address: string;
            companyName: string;
            phone: string;
            contactPerson: string;
            taxId?: string | undefined;
        };
        specialRequests?: string | undefined;
        corporateId?: string | undefined;
        requiresInvoice?: boolean | undefined;
    }[];
    corporateDiscount?: number | undefined;
    paymentTerms?: "immediate" | "net15" | "net30" | "net45" | undefined;
}>;
export type BusinessHotelSearchRequest = z.infer<typeof businessHotelSearchSchema>;
export type BusinessHotelBookingRequest = z.infer<typeof businessHotelBookingSchema>;
export type BulkBookingRequest = z.infer<typeof bulkBookingSchema>;
