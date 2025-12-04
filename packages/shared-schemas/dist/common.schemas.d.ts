import { z } from "zod";
export declare const paginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const dateRangeSchema: z.ZodObject<{
    startDate: z.ZodString;
    endDate: z.ZodString;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
}, {
    startDate: string;
    endDate: string;
}>;
export declare const priceRangeSchema: z.ZodObject<{
    min: z.ZodOptional<z.ZodNumber>;
    max: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    min?: number | undefined;
    max?: number | undefined;
}, {
    min?: number | undefined;
    max?: number | undefined;
}>;
export declare const bookingStatusSchema: z.ZodEnum<["pending", "confirmed", "cancelled", "completed", "refunded", "modified"]>;
export declare const currencySchema: z.ZodString;
export declare const addressSchema: z.ZodObject<{
    street: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}, {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}>;
export declare const paymentMethodSchema: z.ZodObject<{
    cardNumber: z.ZodString;
    expiryMonth: z.ZodNumber;
    expiryYear: z.ZodNumber;
    cvv: z.ZodString;
    cardholderName: z.ZodString;
    billingAddress: z.ZodOptional<z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    cardNumber: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    cardholderName: string;
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    } | undefined;
}, {
    cardNumber: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    cardholderName: string;
    billingAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    } | undefined;
}>;
export declare const tripSchema: z.ZodObject<{
    destination: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    travelers: z.ZodNumber;
    budget: z.ZodOptional<z.ZodNumber>;
    preferences: z.ZodOptional<z.ZodObject<{
        accommodation: z.ZodOptional<z.ZodEnum<["budget", "mid-range", "luxury"]>>;
        activities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        transportation: z.ZodOptional<z.ZodEnum<["flight", "car", "train", "bus"]>>;
    }, "strip", z.ZodTypeAny, {
        accommodation?: "luxury" | "budget" | "mid-range" | undefined;
        activities?: string[] | undefined;
        transportation?: "flight" | "car" | "train" | "bus" | undefined;
    }, {
        accommodation?: "luxury" | "budget" | "mid-range" | undefined;
        activities?: string[] | undefined;
        transportation?: "flight" | "car" | "train" | "bus" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    startDate: string;
    endDate: string;
    destination: string;
    travelers: number;
    preferences?: {
        accommodation?: "luxury" | "budget" | "mid-range" | undefined;
        activities?: string[] | undefined;
        transportation?: "flight" | "car" | "train" | "bus" | undefined;
    } | undefined;
    budget?: number | undefined;
}, {
    startDate: string;
    endDate: string;
    destination: string;
    travelers: number;
    preferences?: {
        accommodation?: "luxury" | "budget" | "mid-range" | undefined;
        activities?: string[] | undefined;
        transportation?: "flight" | "car" | "train" | "bus" | undefined;
    } | undefined;
    budget?: number | undefined;
}>;
export declare const apiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    message: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodAny>;
    errors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    errors?: string[] | undefined;
}, {
    success: boolean;
    message?: string | undefined;
    data?: any;
    errors?: string[] | undefined;
}>;
export declare const paginatedResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodAny, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        pages: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        pages: number;
    }, {
        page: number;
        limit: number;
        total: number;
        pages: number;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}, {
    success: boolean;
    data: any[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}>;
export declare const errorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    field: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    field?: string | undefined;
}, {
    code: string;
    message: string;
    field?: string | undefined;
}>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type PriceRange = z.infer<typeof priceRangeSchema>;
export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type Address = z.infer<typeof addressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type TripInput = z.infer<typeof tripSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
export type ApiError = z.infer<typeof errorSchema>;
//# sourceMappingURL=common.schemas.d.ts.map