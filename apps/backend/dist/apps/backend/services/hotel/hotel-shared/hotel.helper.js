"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hotelHelper = void 0;
const client_1 = require("@prisma/client");
class HotelHelper {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    // Core hotel search functionality
    async searchHotels(filters) {
        // Mock data for now - replace with actual database queries
        const mockHotels = [
            {
                id: '1',
                name: 'Grand Palace Hotel',
                description: 'Luxury hotel in the heart of the city',
                location: 'Downtown',
                address: '123 Main St',
                city: 'New York',
                country: 'USA',
                rating: 4.8,
                pricePerNight: 350,
                amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym'],
                images: ['hotel1.jpg', 'hotel1_2.jpg'],
                available: true,
                totalRooms: 200,
                availableRooms: 45,
                coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            {
                id: '2',
                name: 'Business Center Inn',
                description: 'Modern hotel perfect for business travelers',
                location: 'Financial District',
                address: '456 Business Ave',
                city: 'New York',
                country: 'USA',
                rating: 4.2,
                pricePerNight: 220,
                amenities: ['WiFi', 'Business Center', 'Conference Rooms', 'Restaurant'],
                images: ['hotel2.jpg'],
                available: true,
                totalRooms: 150,
                availableRooms: 30
            }
        ];
        let filteredHotels = mockHotels;
        if (filters.location) {
            filteredHotels = filteredHotels.filter(hotel => hotel.city.toLowerCase().includes(filters.location.toLowerCase()) ||
                hotel.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.maxPrice) {
            filteredHotels = filteredHotels.filter(hotel => hotel.pricePerNight <= filters.maxPrice);
        }
        if (filters.minRating) {
            filteredHotels = filteredHotels.filter(hotel => hotel.rating >= filters.minRating);
        }
        if (filters.guests) {
            filteredHotels = filteredHotels.filter(hotel => hotel.availableRooms > 0);
        }
        if (filters.amenities && filters.amenities.length > 0) {
            filteredHotels = filteredHotels.filter(hotel => filters.amenities.every(amenity => hotel.amenities.includes(amenity)));
        }
        return filteredHotels;
    }
    // Get hotel details by ID
    async getHotelById(hotelId) {
        const hotels = await this.searchHotels({});
        return hotels.find(hotel => hotel.id === hotelId) || null;
    }
    // Check hotel availability for specific dates
    async checkAvailability(hotelId, checkIn, checkOut, guests) {
        const hotel = await this.getHotelById(hotelId);
        if (!hotel)
            return false;
        // Mock availability check - replace with actual database logic
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        // Basic validation
        if (checkInDate < today || checkOutDate <= checkInDate)
            return false;
        if (guests > 4)
            return false; // Assuming max 4 guests per room
        if (hotel.availableRooms === 0)
            return false;
        return true;
    }
    // Get hotel pricing for date range
    async getHotelPricing(hotelId, checkIn, checkOut, guests) {
        const hotel = await this.getHotelById(hotelId);
        if (!hotel)
            return null;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const basePrice = hotel.pricePerNight;
        const totalPrice = basePrice * totalNights;
        const taxesAndFees = Math.round(totalPrice * 0.15); // 15% taxes and fees
        const finalPrice = totalPrice + taxesAndFees;
        return {
            basePrice,
            totalNights,
            totalPrice,
            taxesAndFees,
            finalPrice
        };
    }
    // Reserve hotel room (creates temporary hold)
    async reserveRoom(bookingDetails, userId) {
        // Mock reservation - replace with actual database logic
        const reservationId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes
        return {
            reservationId,
            expiresAt
        };
    }
    // Get popular hotels for a location
    async getPopularHotels(location, limit = 10) {
        const hotels = await this.searchHotels({ location });
        return hotels
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
    // Get hotel amenities list
    getAvailableAmenities() {
        return [
            'WiFi',
            'Pool',
            'Spa',
            'Restaurant',
            'Gym',
            'Business Center',
            'Conference Rooms',
            'Parking',
            'Pet Friendly',
            'Air Conditioning',
            'Room Service',
            'Concierge',
            'Laundry Service',
            'Airport Shuttle'
        ];
    }
}
exports.hotelHelper = new HotelHelper();
