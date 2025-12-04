export interface CarRental {
    id: string;
    userId: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    rentalReference: string;
    createdAt: string;
    updatedAt: string;
    serviceDetails: {
        carId: string;
        carType: string;
        category: string;
        transmission: 'automatic' | 'manual';
        fuelType: string;
        seats: number;
    };
    drivers: Driver[];
    dates: {
        pickupDate: string;
        returnDate: string;
        pickupTime: string;
        returnTime: string;
    };
    locations: {
        pickup: {
            address: string;
            city: string;
            country: string;
            airport?: boolean;
        };
        return: {
            address: string;
            city: string;
            country: string;
            airport?: boolean;
        };
    };
    pricing: {
        dailyRate: number;
        totalDays: number;
        basePrice: number;
        taxes: number;
        fees: number;
        insurance?: number;
        extras?: number;
        discount?: number;
        totalPrice: number;
        currency: string;
    };
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    paymentMethod?: string;
    transactionId?: string;
    contactInfo: {
        email: string;
        phone: string;
    };
    specialRequests?: string;
    extras?: string[];
    insurance?: boolean;
    corporateInfo?: {
        companyName: string;
        corporateId?: string;
        billingAddress: string;
        taxId?: string;
    };
}
export interface Driver {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth: string;
    documentType: 'drivingLicense' | 'passport' | 'nationalId';
    documentNumber: string;
    documentExpiry: string;
    licenseNumber: string;
    licenseIssueDate: string;
    licenseExpiryDate: string;
    licenseCountry: string;
}
interface CarRentalDetails {
    serviceDetails: {
        carId: string;
        carType: string;
        category: string;
    };
    drivers: Driver[];
    dates: {
        pickupDate: string;
        returnDate: string;
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
        insurance?: boolean;
        extras?: string[];
        specialRequests?: string;
    };
    pricing: {
        dailyRate: number;
        totalDays: number;
        basePrice: number;
        taxes: number;
        fees: number;
        totalPrice: number;
    };
}
interface CarRentalResponse {
    rentalId: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    confirmationNumber: string;
    drivers: Driver[];
    serviceDetails: any;
    pricing: any;
    createdAt: string;
    expiresAt?: string;
}
declare class CarHelper {
    private prisma;
    constructor();
    createCarRental(details: CarRentalDetails & {
        userId: string;
    }): Promise<CarRentalResponse>;
    getCarRentalById(rentalId: string): Promise<CarRentalResponse | null>;
    cancelCarRental(rentalId: string, userId: string): Promise<{
        success: boolean;
        message: string;
        refundAmount?: number;
    }>;
    getUserCarRentals(userId: string, limit?: number): Promise<CarRental[]>;
    updateCarRental(rentalId: string, updateData: Partial<CarRental>): Promise<CarRental | null>;
    searchAvailableCars(searchCriteria: {
        pickupLocation: string;
        returnLocation: string;
        pickupDate: string;
        returnDate: string;
        driverAge: number;
    }): Promise<any[]>;
    validateDriverLicense(licenseNumber: string, country: string): Promise<{
        valid: boolean;
        message: string;
    }>;
    calculateRentalPricing(carId: string, pickupDate: string, returnDate: string, extras?: string[]): Promise<{
        dailyRate: number;
        totalDays: number;
        basePrice: number;
        taxes: number;
        fees: number;
        extrasPrice: number;
        totalPrice: number;
    }>;
}
export declare const carHelper: CarHelper;
export {};
