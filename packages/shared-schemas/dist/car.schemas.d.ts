import { z } from "zod";
export declare const carRentalSearchSchema: z.ZodObject<{
    pickupLocation: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["airport", "city", "hotel"]>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        type: "city" | "airport" | "hotel";
        name: string;
    }, {
        code: string;
        name: string;
        type?: "city" | "airport" | "hotel" | undefined;
    }>;
    returnLocation: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["airport", "city", "hotel"]>>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        type: "city" | "airport" | "hotel";
        name: string;
    }, {
        code: string;
        name: string;
        type?: "city" | "airport" | "hotel" | undefined;
    }>;
    pickupDate: z.ZodString;
    pickupTime: z.ZodString;
    returnDate: z.ZodString;
    returnTime: z.ZodString;
    driverAge: z.ZodNumber;
    carType: z.ZodOptional<z.ZodEnum<["economy", "compact", "intermediate", "standard", "fullsize", "premium", "luxury", "suv", "convertible"]>>;
}, "strip", z.ZodTypeAny, {
    pickupLocation: {
        code: string;
        type: "city" | "airport" | "hotel";
        name: string;
    };
    returnLocation: {
        code: string;
        type: "city" | "airport" | "hotel";
        name: string;
    };
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    driverAge: number;
    carType?: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv" | "convertible" | undefined;
}, {
    pickupLocation: {
        code: string;
        name: string;
        type?: "city" | "airport" | "hotel" | undefined;
    };
    returnLocation: {
        code: string;
        name: string;
        type?: "city" | "airport" | "hotel" | undefined;
    };
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    driverAge: number;
    carType?: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv" | "convertible" | undefined;
}>;
export declare const carRentalBookingSchema: z.ZodObject<{
    carOfferId: z.ZodString;
    primaryDriver: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        dateOfBirth: z.ZodString;
        licenseNumber: z.ZodString;
        licenseCountry: z.ZodString;
        licenseExpiryDate: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
        licenseExpiryDate: string;
    }, {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
        licenseExpiryDate: string;
    }>;
    additionalDrivers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        dateOfBirth: z.ZodString;
        licenseNumber: z.ZodString;
        licenseCountry: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
    }, {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
    }>, "many">>;
    addOns: z.ZodOptional<z.ZodArray<z.ZodEnum<["gps", "child_seat", "additional_insurance", "wifi", "roof_rack"]>, "many">>;
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
    carOfferId: string;
    primaryDriver: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
        licenseExpiryDate: string;
    };
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    };
    additionalDrivers?: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
    }[] | undefined;
    addOns?: ("gps" | "child_seat" | "additional_insurance" | "wifi" | "roof_rack")[] | undefined;
}, {
    carOfferId: string;
    primaryDriver: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
        licenseExpiryDate: string;
    };
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
    };
    additionalDrivers?: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        licenseNumber: string;
        licenseCountry: string;
    }[] | undefined;
    addOns?: ("gps" | "child_seat" | "additional_insurance" | "wifi" | "roof_rack")[] | undefined;
}>;
export declare const businessCarRentalSchema: z.ZodObject<{
    serviceDetails: z.ZodObject<{
        carType: z.ZodEnum<["economy", "compact", "intermediate", "standard", "fullsize", "premium", "luxury", "suv"]>;
        quantity: z.ZodNumber;
        duration: z.ZodNumber;
        pickupLocation: z.ZodString;
        returnLocation: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pickupLocation: string;
        returnLocation: string;
        carType: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv";
        quantity: number;
        duration: number;
    }, {
        pickupLocation: string;
        returnLocation: string;
        carType: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv";
        quantity: number;
        duration: number;
    }>;
    dates: z.ZodObject<{
        startDate: z.ZodString;
        endDate: z.ZodString;
        pickupTime: z.ZodString;
        returnTime: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pickupTime: string;
        returnTime: string;
        startDate: string;
        endDate: string;
    }, {
        pickupTime: string;
        returnTime: string;
        startDate: string;
        endDate: string;
    }>;
    locations: z.ZodObject<{
        pickup: z.ZodObject<{
            name: z.ZodString;
            address: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                lat: z.ZodNumber;
                lng: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lat: number;
                lng: number;
            }, {
                lat: number;
                lng: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }, {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }>;
        return: z.ZodObject<{
            name: z.ZodString;
            address: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                lat: z.ZodNumber;
                lng: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lat: number;
                lng: number;
            }, {
                lat: number;
                lng: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }, {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        pickup: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        return: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
    }, {
        pickup: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        return: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
    }>;
    preferences: z.ZodObject<{
        fuelPolicy: z.ZodDefault<z.ZodEnum<["full_to_full", "full_to_empty", "same_to_same"]>>;
        mileageLimit: z.ZodDefault<z.ZodEnum<["unlimited", "limited"]>>;
        additionalEquipment: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        fuelPolicy: "full_to_full" | "full_to_empty" | "same_to_same";
        mileageLimit: "unlimited" | "limited";
        additionalEquipment?: string[] | undefined;
    }, {
        fuelPolicy?: "full_to_full" | "full_to_empty" | "same_to_same" | undefined;
        mileageLimit?: "unlimited" | "limited" | undefined;
        additionalEquipment?: string[] | undefined;
    }>;
    pricing: z.ZodObject<{
        baseRate: z.ZodNumber;
        currency: z.ZodString;
        taxesAndFees: z.ZodNumber;
        totalAmount: z.ZodNumber;
        paymentTerms: z.ZodDefault<z.ZodEnum<["immediate", "net_15", "net_30"]>>;
    }, "strip", z.ZodTypeAny, {
        baseRate: number;
        currency: string;
        taxesAndFees: number;
        totalAmount: number;
        paymentTerms: "immediate" | "net_15" | "net_30";
    }, {
        baseRate: number;
        currency: string;
        taxesAndFees: number;
        totalAmount: number;
        paymentTerms?: "immediate" | "net_15" | "net_30" | undefined;
    }>;
    corporateInfo: z.ZodObject<{
        companyName: z.ZodString;
        contactPerson: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
        billingAddress: z.ZodObject<{
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
        taxId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        phone: string;
        companyName: string;
        contactPerson: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId?: string | undefined;
    }, {
        email: string;
        phone: string;
        companyName: string;
        contactPerson: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    serviceDetails: {
        pickupLocation: string;
        returnLocation: string;
        carType: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv";
        quantity: number;
        duration: number;
    };
    dates: {
        pickupTime: string;
        returnTime: string;
        startDate: string;
        endDate: string;
    };
    locations: {
        pickup: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        return: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
    };
    preferences: {
        fuelPolicy: "full_to_full" | "full_to_empty" | "same_to_same";
        mileageLimit: "unlimited" | "limited";
        additionalEquipment?: string[] | undefined;
    };
    pricing: {
        baseRate: number;
        currency: string;
        taxesAndFees: number;
        totalAmount: number;
        paymentTerms: "immediate" | "net_15" | "net_30";
    };
    corporateInfo: {
        email: string;
        phone: string;
        companyName: string;
        contactPerson: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId?: string | undefined;
    };
}, {
    serviceDetails: {
        pickupLocation: string;
        returnLocation: string;
        carType: "economy" | "compact" | "intermediate" | "standard" | "fullsize" | "premium" | "luxury" | "suv";
        quantity: number;
        duration: number;
    };
    dates: {
        pickupTime: string;
        returnTime: string;
        startDate: string;
        endDate: string;
    };
    locations: {
        pickup: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        return: {
            address: string;
            name: string;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
    };
    preferences: {
        fuelPolicy?: "full_to_full" | "full_to_empty" | "same_to_same" | undefined;
        mileageLimit?: "unlimited" | "limited" | undefined;
        additionalEquipment?: string[] | undefined;
    };
    pricing: {
        baseRate: number;
        currency: string;
        taxesAndFees: number;
        totalAmount: number;
        paymentTerms?: "immediate" | "net_15" | "net_30" | undefined;
    };
    corporateInfo: {
        email: string;
        phone: string;
        companyName: string;
        contactPerson: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId?: string | undefined;
    };
}>;
export type CarRentalSearchInput = z.infer<typeof carRentalSearchSchema>;
export type CarRentalBookingInput = z.infer<typeof carRentalBookingSchema>;
export type BusinessCarRentalInput = z.infer<typeof businessCarRentalSchema>;
//# sourceMappingURL=car.schemas.d.ts.map