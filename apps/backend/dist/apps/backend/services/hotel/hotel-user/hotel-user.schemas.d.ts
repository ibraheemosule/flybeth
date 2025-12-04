import { z } from 'zod';
export declare const hotelSearchSchema: z.ZodObject<{
    location: z.ZodOptional<z.ZodString>;
    checkIn: z.ZodOptional<z.ZodString>;
    checkOut: z.ZodOptional<z.ZodString>;
    guests: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    minRating: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    location?: string | undefined;
    checkIn?: string | undefined;
    checkOut?: string | undefined;
    guests?: number | undefined;
    maxPrice?: number | undefined;
    minRating?: number | undefined;
    amenities?: string[] | undefined;
}, {
    location?: string | undefined;
    checkIn?: string | undefined;
    checkOut?: string | undefined;
    guests?: number | undefined;
    maxPrice?: number | undefined;
    minRating?: number | undefined;
    amenities?: string[] | undefined;
}>;
export declare const hotelBookingSchema: z.ZodObject<{
    hotelId: z.ZodString;
    checkIn: z.ZodString;
    checkOut: z.ZodString;
    guests: z.ZodNumber;
    roomType: z.ZodString;
    specialRequests: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    checkIn: string;
    checkOut: string;
    guests: number;
    hotelId: string;
    roomType: string;
    specialRequests?: string | undefined;
}, {
    checkIn: string;
    checkOut: string;
    guests: number;
    hotelId: string;
    roomType: string;
    specialRequests?: string | undefined;
}>;
export type HotelSearchRequest = z.infer<typeof hotelSearchSchema>;
export type HotelBookingRequest = z.infer<typeof hotelBookingSchema>;
