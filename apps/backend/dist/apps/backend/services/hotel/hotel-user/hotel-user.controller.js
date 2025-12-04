"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelUserController = void 0;
const hotel_helper_1 = require("../hotel-shared/hotel.helper");
const hotel_user_schemas_1 = require("./hotel-user.schemas");
class HotelUserController {
    constructor() {
        this.hotelHelper = hotel_helper_1.hotelHelper;
        // Search hotels with user limitations
        this.searchHotels = async (req, res) => {
            try {
                const filters = hotel_user_schemas_1.hotelSearchSchema.parse(req.query);
                // Apply user-specific price limit
                if (filters.maxPrice && filters.maxPrice > 1000) {
                    filters.maxPrice = 1000;
                }
                const hotels = await this.hotelHelper.searchHotels(filters);
                // Filter out expensive hotels for users
                const userFriendlyHotels = hotels.filter(hotel => hotel.pricePerNight <= 1000);
                res.json({
                    success: true,
                    hotels: userFriendlyHotels,
                    count: userFriendlyHotels.length,
                    message: 'Hotels retrieved successfully'
                });
            }
            catch (error) {
                console.error('Hotel search error:', error);
                res.status(400).json({
                    success: false,
                    message: 'Invalid search parameters',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get hotel details with user-friendly pricing
        this.getHotelDetails = async (req, res) => {
            try {
                const { hotelId } = req.params;
                const { checkIn, checkOut, guests } = req.query;
                const hotel = await this.hotelHelper.getHotelById(hotelId);
                if (!hotel) {
                    return res.status(404).json({
                        success: false,
                        message: 'Hotel not found'
                    });
                }
                // Check if hotel is within user price range
                if (hotel.pricePerNight > 1000) {
                    return res.status(403).json({
                        success: false,
                        message: 'This hotel exceeds the maximum price limit for individual bookings'
                    });
                }
                let pricing = null;
                if (checkIn && checkOut && guests) {
                    const guestCount = parseInt(guests);
                    if (guestCount > 6) {
                        return res.status(400).json({
                            success: false,
                            message: 'Maximum 6 guests allowed for individual bookings'
                        });
                    }
                    pricing = await this.hotelHelper.getHotelPricing(hotelId, checkIn, checkOut, guestCount);
                }
                res.json({
                    success: true,
                    hotel,
                    pricing,
                    userLimits: {
                        maxGuests: 6,
                        maxPricePerNight: 1000
                    }
                });
            }
            catch (error) {
                console.error('Get hotel details error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to get hotel details'
                });
            }
        };
        // Check availability with user limitations
        this.checkAvailability = async (req, res) => {
            try {
                const { hotelId } = req.params;
                const { checkIn, checkOut, guests } = req.query;
                if (!checkIn || !checkOut || !guests) {
                    return res.status(400).json({
                        success: false,
                        message: 'checkIn, checkOut, and guests are required'
                    });
                }
                const guestCount = parseInt(guests);
                if (guestCount > 6) {
                    return res.status(400).json({
                        success: false,
                        message: 'Maximum 6 guests allowed for individual bookings'
                    });
                }
                const isAvailable = await this.hotelHelper.checkAvailability(hotelId, checkIn, checkOut, guestCount);
                res.json({
                    success: true,
                    available: isAvailable,
                    hotelId,
                    checkIn,
                    checkOut,
                    guests: guestCount
                });
            }
            catch (error) {
                console.error('Check availability error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to check availability'
                });
            }
        };
        // Create hotel reservation with user limitations
        this.createReservation = async (req, res) => {
            try {
                const bookingData = hotel_user_schemas_1.hotelBookingSchema.parse(req.body);
                const userId = req.user?.id;
                if (!userId) {
                    return res.status(401).json({
                        success: false,
                        message: 'User authentication required'
                    });
                }
                // Validate hotel exists and is within user limits
                const hotel = await this.hotelHelper.getHotelById(bookingData.hotelId);
                if (!hotel) {
                    return res.status(404).json({
                        success: false,
                        message: 'Hotel not found'
                    });
                }
                if (hotel.pricePerNight > 1000) {
                    return res.status(403).json({
                        success: false,
                        message: 'This hotel exceeds the maximum price limit for individual bookings'
                    });
                }
                // Get pricing
                const pricing = await this.hotelHelper.getHotelPricing(bookingData.hotelId, bookingData.checkIn, bookingData.checkOut, bookingData.guests);
                if (!pricing) {
                    return res.status(400).json({
                        success: false,
                        message: 'Unable to calculate pricing for this booking'
                    });
                }
                // Create reservation
                const reservation = await this.hotelHelper.reserveRoom({
                    hotelId: bookingData.hotelId,
                    checkIn: bookingData.checkIn,
                    checkOut: bookingData.checkOut,
                    guests: bookingData.guests,
                    roomType: bookingData.roomType,
                    totalPrice: pricing.finalPrice
                }, userId);
                res.status(201).json({
                    success: true,
                    reservation,
                    pricing,
                    message: 'Hotel reservation created successfully. Complete payment within 15 minutes.'
                });
            }
            catch (error) {
                console.error('Create reservation error:', error);
                res.status(400).json({
                    success: false,
                    message: 'Failed to create reservation',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get popular hotels with user-friendly options
        this.getPopularHotels = async (req, res) => {
            try {
                const { location } = req.query;
                if (!location) {
                    return res.status(400).json({
                        success: false,
                        message: 'Location is required'
                    });
                }
                const hotels = await this.hotelHelper.getPopularHotels(location, 10);
                // Filter for user-friendly prices
                const userFriendlyHotels = hotels.filter(hotel => hotel.pricePerNight <= 1000);
                res.json({
                    success: true,
                    hotels: userFriendlyHotels,
                    location,
                    message: 'Popular hotels retrieved successfully'
                });
            }
            catch (error) {
                console.error('Get popular hotels error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to get popular hotels'
                });
            }
        };
        // Get available amenities
        this.getAmenities = async (req, res) => {
            try {
                const amenities = this.hotelHelper.getAvailableAmenities();
                res.json({
                    success: true,
                    amenities,
                    message: 'Available amenities retrieved successfully'
                });
            }
            catch (error) {
                console.error('Get amenities error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to get amenities'
                });
            }
        };
        // Using imported helper instance
    }
}
exports.HotelUserController = HotelUserController;
