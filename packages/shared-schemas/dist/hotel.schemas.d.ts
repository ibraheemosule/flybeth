import { z } from "zod";
export declare const hotelSearchSchema: z.ZodObject<{
    destination: z.ZodString;
    checkInDate: z.ZodString;
    checkOutDate: z.ZodString;
    guests: z.ZodObject<{
        adults: z.ZodNumber;
        children: z.ZodDefault<z.ZodNumber>;
        rooms: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        adults: number;
        children: number;
        rooms: number;
    }, {
        adults: number;
        rooms: number;
        children?: number | undefined;
    }>;
    priceRange: z.ZodOptional<z.ZodObject<{
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        min?: number | undefined;
        max?: number | undefined;
    }, {
        min?: number | undefined;
        max?: number | undefined;
    }>>;
    starRating: z.ZodOptional<z.ZodNumber>;
    amenities: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    destination: string;
    checkInDate: string;
    checkOutDate: string;
    guests: {
        adults: number;
        children: number;
        rooms: number;
    };
    priceRange?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    starRating?: number | undefined;
    amenities?: string[] | undefined;
}, {
    destination: string;
    checkInDate: string;
    checkOutDate: string;
    guests: {
        adults: number;
        rooms: number;
        children?: number | undefined;
    };
    priceRange?: {
        min?: number | undefined;
        max?: number | undefined;
    } | undefined;
    starRating?: number | undefined;
    amenities?: string[] | undefined;
}>;
export declare const hotelBookingSchema: z.ZodObject<{
    hotelOfferId: z.ZodString;
    guestInfo: z.ZodObject<{
        primaryGuest: z.ZodObject<{
            firstName: z.ZodString;
            lastName: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        }, {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        }>;
        additionalGuests: z.ZodOptional<z.ZodArray<z.ZodObject<{
            firstName: z.ZodString;
            lastName: z.ZodString;
            age: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            firstName: string;
            lastName: string;
            age: number;
        }, {
            firstName: string;
            lastName: string;
            age: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
        additionalGuests?: {
            firstName: string;
            lastName: string;
            age: number;
        }[] | undefined;
    }, {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
        additionalGuests?: {
            firstName: string;
            lastName: string;
            age: number;
        }[] | undefined;
    }>;
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
    specialRequests: z.ZodOptional<z.ZodString>;
    paymentInfo: z.ZodObject<{
        cardNumber: z.ZodString;
        expiryMonth: z.ZodNumber;
        expiryYear: z.ZodNumber;
        cvv: z.ZodString;
        cardholderName: z.ZodString;
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
    }, "strip", z.ZodTypeAny, {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    }, {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
    contactInfo: {
        email: string;
        phone: string;
    };
    hotelOfferId: string;
    guestInfo: {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
        additionalGuests?: {
            firstName: string;
            lastName: string;
            age: number;
        }[] | undefined;
    };
    specialRequests?: string | undefined;
}, {
    paymentInfo: {
        cardNumber: string;
        expiryMonth: number;
        expiryYear: number;
        cvv: string;
        cardholderName: string;
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
    contactInfo: {
        email: string;
        phone: string;
    };
    hotelOfferId: string;
    guestInfo: {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
        };
        additionalGuests?: {
            firstName: string;
            lastName: string;
            age: number;
        }[] | undefined;
    };
    specialRequests?: string | undefined;
}>;
export declare const businessHotelBookingSchema: z.ZodObject<{
    hotelOfferId: z.ZodString;
    corporateCode: z.ZodOptional<z.ZodString>;
    guestInfo: z.ZodObject<{
        primaryGuest: z.ZodObject<{
            firstName: z.ZodString;
            lastName: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
            employeeId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        }, {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        };
    }, {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        };
    }>;
    billingInfo: z.ZodObject<{
        companyName: z.ZodString;
        taxId: z.ZodString;
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
        contactPerson: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            name: string;
        }, {
            email: string;
            phone: string;
            name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        companyName: string;
        contactPerson: {
            email: string;
            phone: string;
            name: string;
        };
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId: string;
    }, {
        companyName: string;
        contactPerson: {
            email: string;
            phone: string;
            name: string;
        };
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId: string;
    }>;
    costCenter: z.ZodOptional<z.ZodString>;
    approverEmail: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    hotelOfferId: string;
    guestInfo: {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        };
    };
    billingInfo: {
        companyName: string;
        contactPerson: {
            email: string;
            phone: string;
            name: string;
        };
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId: string;
    };
    corporateCode?: string | undefined;
    costCenter?: string | undefined;
    approverEmail?: string | undefined;
}, {
    hotelOfferId: string;
    guestInfo: {
        primaryGuest: {
            email: string;
            firstName: string;
            lastName: string;
            phone: string;
            employeeId?: string | undefined;
        };
    };
    billingInfo: {
        companyName: string;
        contactPerson: {
            email: string;
            phone: string;
            name: string;
        };
        billingAddress: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        taxId: string;
    };
    corporateCode?: string | undefined;
    costCenter?: string | undefined;
    approverEmail?: string | undefined;
}>;
export declare const bulkHotelBookingSchema: z.ZodObject<{
    bookings: z.ZodArray<z.ZodObject<{
        hotelOfferId: z.ZodString;
        corporateCode: z.ZodOptional<z.ZodString>;
        guestInfo: z.ZodObject<{
            primaryGuest: z.ZodObject<{
                firstName: z.ZodString;
                lastName: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
                employeeId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            }, {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        }, {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        }>;
        billingInfo: z.ZodObject<{
            companyName: z.ZodString;
            taxId: z.ZodString;
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
            contactPerson: z.ZodObject<{
                name: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                email: string;
                phone: string;
                name: string;
            }, {
                email: string;
                phone: string;
                name: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        }, {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        }>;
        costCenter: z.ZodOptional<z.ZodString>;
        approverEmail: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        hotelOfferId: string;
        guestInfo: {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        };
        billingInfo: {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        };
        corporateCode?: string | undefined;
        costCenter?: string | undefined;
        approverEmail?: string | undefined;
    }, {
        hotelOfferId: string;
        guestInfo: {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        };
        billingInfo: {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        };
        corporateCode?: string | undefined;
        costCenter?: string | undefined;
        approverEmail?: string | undefined;
    }>, "many">;
    groupBookingId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    bookings: {
        hotelOfferId: string;
        guestInfo: {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        };
        billingInfo: {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        };
        corporateCode?: string | undefined;
        costCenter?: string | undefined;
        approverEmail?: string | undefined;
    }[];
    groupBookingId?: string | undefined;
}, {
    bookings: {
        hotelOfferId: string;
        guestInfo: {
            primaryGuest: {
                email: string;
                firstName: string;
                lastName: string;
                phone: string;
                employeeId?: string | undefined;
            };
        };
        billingInfo: {
            companyName: string;
            contactPerson: {
                email: string;
                phone: string;
                name: string;
            };
            billingAddress: {
                street: string;
                city: string;
                state: string;
                zipCode: string;
                country: string;
            };
            taxId: string;
        };
        corporateCode?: string | undefined;
        costCenter?: string | undefined;
        approverEmail?: string | undefined;
    }[];
    groupBookingId?: string | undefined;
}>;
export type HotelSearchInput = z.infer<typeof hotelSearchSchema>;
export type HotelBookingInput = z.infer<typeof hotelBookingSchema>;
export type BusinessHotelBookingInput = z.infer<typeof businessHotelBookingSchema>;
export type BulkHotelBookingInput = z.infer<typeof bulkHotelBookingSchema>;
//# sourceMappingURL=hotel.schemas.d.ts.map