export interface Hotel {
    id: string;
    name: string;
    description: string;
    location: string;
    address: string;
    city: string;
    country: string;
    rating: number;
    pricePerNight: number;
    amenities: string[];
    images: string[];
    available: boolean;
    totalRooms: number;
    availableRooms: number;
    coordinates?: {
        lat: number;
        lng: number;
    };
}
export interface SearchFilters {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    maxPrice?: number;
    minRating?: number;
    amenities?: string[];
}
export interface BookingDetails {
    hotelId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
    totalPrice: number;
}
declare class HotelHelper {
    private prisma;
    constructor();
    searchHotels(filters: SearchFilters): Promise<Hotel[]>;
    getHotelById(hotelId: string): Promise<Hotel | null>;
    checkAvailability(hotelId: string, checkIn: string, checkOut: string, guests: number): Promise<boolean>;
    getHotelPricing(hotelId: string, checkIn: string, checkOut: string, guests: number): Promise<{
        basePrice: number;
        totalNights: number;
        totalPrice: number;
        taxesAndFees: number;
        finalPrice: number;
    } | null>;
    reserveRoom(bookingDetails: BookingDetails, userId: string): Promise<{
        reservationId: string;
        expiresAt: string;
    }>;
    getPopularHotels(location: string, limit?: number): Promise<Hotel[]>;
    getAvailableAmenities(): string[];
}
export declare const hotelHelper: HotelHelper;
export {};
