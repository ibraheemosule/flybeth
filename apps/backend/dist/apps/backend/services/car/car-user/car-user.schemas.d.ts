import { z } from 'zod';
export declare const driverSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodString;
    documentType: z.ZodEnum<["drivingLicense", "passport", "nationalId"]>;
    documentNumber: z.ZodString;
    documentExpiry: z.ZodString;
    licenseNumber: z.ZodString;
    licenseIssueDate: z.ZodString;
    licenseExpiryDate: z.ZodString;
    licenseCountry: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    documentType: "drivingLicense" | "passport" | "nationalId";
    documentNumber: string;
    documentExpiry: string;
    licenseNumber: string;
    licenseIssueDate: string;
    licenseExpiryDate: string;
    licenseCountry: string;
    phone?: string | undefined;
}, {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    documentType: "drivingLicense" | "passport" | "nationalId";
    documentNumber: string;
    documentExpiry: string;
    licenseNumber: string;
    licenseIssueDate: string;
    licenseExpiryDate: string;
    licenseCountry: string;
    phone?: string | undefined;
}>;
export declare const createCarRentalSchema: z.ZodObject<{
    serviceDetails: z.ZodObject<{
        carId: z.ZodString;
        carType: z.ZodString;
        category: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        carId: string;
        carType: string;
        category: string;
    }, {
        carId: string;
        carType: string;
        category: string;
    }>;
    drivers: z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        dateOfBirth: z.ZodString;
        documentType: z.ZodEnum<["drivingLicense", "passport", "nationalId"]>;
        documentNumber: z.ZodString;
        documentExpiry: z.ZodString;
        licenseNumber: z.ZodString;
        licenseIssueDate: z.ZodString;
        licenseExpiryDate: z.ZodString;
        licenseCountry: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        documentType: "drivingLicense" | "passport" | "nationalId";
        documentNumber: string;
        documentExpiry: string;
        licenseNumber: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
        licenseCountry: string;
        phone?: string | undefined;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        documentType: "drivingLicense" | "passport" | "nationalId";
        documentNumber: string;
        documentExpiry: string;
        licenseNumber: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
        licenseCountry: string;
        phone?: string | undefined;
    }>, "many">;
    dates: z.ZodObject<{
        pickupDate: z.ZodString;
        returnDate: z.ZodString;
        pickupTime: z.ZodString;
        returnTime: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        returnDate: string;
        pickupDate: string;
        pickupTime: string;
        returnTime: string;
    }, {
        returnDate: string;
        pickupDate: string;
        pickupTime: string;
        returnTime: string;
    }>;
    locations: z.ZodObject<{
        pickup: z.ZodObject<{
            address: z.ZodString;
            city: z.ZodString;
            country: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            address: string;
            city: string;
            country: string;
        }, {
            address: string;
            city: string;
            country: string;
        }>;
        return: z.ZodObject<{
            address: z.ZodString;
            city: z.ZodString;
            country: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            address: string;
            city: string;
            country: string;
        }, {
            address: string;
            city: string;
            country: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        pickup: {
            address: string;
            city: string;
            country: string;
        };
        return: {
            address: string;
            city: string;
            country: string;
        };
    }, {
        pickup: {
            address: string;
            city: string;
            country: string;
        };
        return: {
            address: string;
            city: string;
            country: string;
        };
    }>;
    preferences: z.ZodOptional<z.ZodObject<{
        insurance: z.ZodOptional<z.ZodBoolean>;
        extras: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        specialRequests: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        specialRequests?: string | undefined;
        insurance?: boolean | undefined;
        extras?: string[] | undefined;
    }, {
        specialRequests?: string | undefined;
        insurance?: boolean | undefined;
        extras?: string[] | undefined;
    }>>;
    pricing: z.ZodObject<{
        dailyRate: z.ZodNumber;
        totalDays: z.ZodNumber;
        basePrice: z.ZodNumber;
        taxes: z.ZodNumber;
        fees: z.ZodNumber;
        totalPrice: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        basePrice: number;
        totalPrice: number;
        dailyRate: number;
        totalDays: number;
        fees: number;
        taxes: number;
    }, {
        basePrice: number;
        totalPrice: number;
        dailyRate: number;
        totalDays: number;
        fees: number;
        taxes: number;
    }>;
}, "strip", z.ZodTypeAny, {
    drivers: {
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        documentType: "drivingLicense" | "passport" | "nationalId";
        documentNumber: string;
        documentExpiry: string;
        licenseNumber: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
        licenseCountry: string;
        phone?: string | undefined;
    }[];
    serviceDetails: {
        carId: string;
        carType: string;
        category: string;
    };
    pricing: {
        basePrice: number;
        totalPrice: number;
        dailyRate: number;
        totalDays: number;
        fees: number;
        taxes: number;
    };
    dates: {
        returnDate: string;
        pickupDate: string;
        pickupTime: string;
        returnTime: string;
    };
    locations: {
        pickup: {
            address: string;
            city: string;
            country: string;
        };
        return: {
            address: string;
            city: string;
            country: string;
        };
    };
    preferences?: {
        specialRequests?: string | undefined;
        insurance?: boolean | undefined;
        extras?: string[] | undefined;
    } | undefined;
}, {
    drivers: {
        email: string;
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        documentType: "drivingLicense" | "passport" | "nationalId";
        documentNumber: string;
        documentExpiry: string;
        licenseNumber: string;
        licenseIssueDate: string;
        licenseExpiryDate: string;
        licenseCountry: string;
        phone?: string | undefined;
    }[];
    serviceDetails: {
        carId: string;
        carType: string;
        category: string;
    };
    pricing: {
        basePrice: number;
        totalPrice: number;
        dailyRate: number;
        totalDays: number;
        fees: number;
        taxes: number;
    };
    dates: {
        returnDate: string;
        pickupDate: string;
        pickupTime: string;
        returnTime: string;
    };
    locations: {
        pickup: {
            address: string;
            city: string;
            country: string;
        };
        return: {
            address: string;
            city: string;
            country: string;
        };
    };
    preferences?: {
        specialRequests?: string | undefined;
        insurance?: boolean | undefined;
        extras?: string[] | undefined;
    } | undefined;
}>;
export declare const carSearchSchema: z.ZodObject<{
    pickupLocation: z.ZodOptional<z.ZodString>;
    returnLocation: z.ZodOptional<z.ZodString>;
    pickupDate: z.ZodOptional<z.ZodString>;
    returnDate: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    transmission: z.ZodOptional<z.ZodEnum<["automatic", "manual"]>>;
    fuelType: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    insurance: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    returnDate?: string | undefined;
    maxPrice?: number | undefined;
    category?: string | undefined;
    pickupDate?: string | undefined;
    insurance?: boolean | undefined;
    pickupLocation?: string | undefined;
    returnLocation?: string | undefined;
    transmission?: "automatic" | "manual" | undefined;
    fuelType?: string | undefined;
    minPrice?: number | undefined;
}, {
    returnDate?: string | undefined;
    maxPrice?: number | undefined;
    category?: string | undefined;
    pickupDate?: string | undefined;
    insurance?: boolean | undefined;
    pickupLocation?: string | undefined;
    returnLocation?: string | undefined;
    transmission?: "automatic" | "manual" | undefined;
    fuelType?: string | undefined;
    minPrice?: number | undefined;
}>;
export declare const cancelCarRentalSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
