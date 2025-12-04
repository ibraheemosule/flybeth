"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarUserController = void 0;
const car_helper_1 = require("../car-shared/car.helper");
const car_user_schemas_1 = require("./car-user.schemas");
class CarUserController {
    constructor() {
        // Create a new car rental with user limitations
        this.createCarRental = async (req, res) => {
            try {
                const bookingData = car_user_schemas_1.createCarRentalSchema.parse(req.body);
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                // Validate traveler limits for users
                if (bookingData.travelers.length > 6) {
                    return res.status(400).json({
                        success: false,
                        message: 'Maximum 6 travelers allowed for individual bookings'
                    });
                }
                // Validate pricing limits for users
                const servicePrice = bookingData.serviceDetails.price || bookingData.serviceDetails.totalPrice || 0;
                if (servicePrice > 5000) {
                    return res.status(400).json({
                        success: false,
                        message: 'Booking exceeds maximum price limit of $5,000 for individual bookings'
                    });
                }
                const booking = await this.carHelper.createCarRental({
                    userId,
                    type: bookingData.type,
                    serviceDetails: bookingData.serviceDetails,
                    travelers: bookingData.travelers,
                    contactInfo: bookingData.contactInfo,
                    paymentMethod: bookingData.paymentMethod,
                    specialRequests: bookingData.specialRequests
                });
                // Send confirmation email
                await this.carHelper.sendConfirmationEmail(booking.id);
                res.status(201).json({
                    success: true,
                    booking: {
                        id: booking.id,
                        bookingReference: booking.bookingReference,
                        type: booking.type,
                        status: booking.status,
                        travelers: booking.travelers,
                        pricing: booking.pricing,
                        contactInfo: booking.contactInfo
                    },
                    userLimits: {
                        maxTravelers: 6,
                        maxBookingValue: 5000
                    },
                    message: 'Booking created successfully. Confirmation email sent.'
                });
            }
            catch (error) {
                console.error('Create booking error:', error);
                res.status(400).json({
                    success: false,
                    message: 'Failed to create booking',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get user's bookings
        this.getBookings = async (req, res) => {
            try {
                const filters = bookingSearchSchema.parse(req.query);
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                const bookings = await this.carHelper.searchBookings({
                    ...filters,
                    userId
                });
                res.json({
                    success: true,
                    bookings: bookings.map(booking => ({
                        id: booking.id,
                        bookingReference: booking.bookingReference,
                        type: booking.type,
                        status: booking.status,
                        serviceDetails: booking.serviceDetails,
                        travelers: booking.travelers,
                        pricing: booking.pricing,
                        createdAt: booking.createdAt,
                        paymentStatus: booking.paymentStatus
                    })),
                    count: bookings.length,
                    message: 'Bookings retrieved successfully'
                });
            }
            catch (error) {
                console.error('Get bookings error:', error);
                res.status(400).json({
                    success: false,
                    message: 'Failed to get bookings',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Get booking details by ID or reference
        this.getBookingDetails = async (req, res) => {
            try {
                const { bookingId } = req.params;
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                let booking = await this.carHelper.getBookingById(bookingId);
                // If not found by ID, try by reference
                if (!booking) {
                    booking = await this.carHelper.getBookingByReference(bookingId);
                }
                if (!booking) {
                    return res.status(404).json({
                        success: false,
                        message: 'Booking not found'
                    });
                }
                // Verify ownership
                if (booking.userId !== userId) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied'
                    });
                }
                res.json({
                    success: true,
                    booking,
                    message: 'Booking details retrieved successfully'
                });
            }
            catch (error) {
                console.error('Get booking details error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to get booking details'
                });
            }
        };
        // Cancel booking
        this.cancelBooking = async (req, res) => {
            try {
                const { bookingId } = req.params;
                const { reason } = cancelBookingSchema.parse(req.body);
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                const booking = await this.carHelper.getBookingById(bookingId);
                if (!booking) {
                    return res.status(404).json({
                        success: false,
                        message: 'Booking not found'
                    });
                }
                // Verify ownership
                if (booking.userId !== userId) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied'
                    });
                }
                // Check if booking can be cancelled
                if (booking.status === 'cancelled' || booking.status === 'completed') {
                    return res.status(400).json({
                        success: false,
                        message: `Cannot cancel booking with status: ${booking.status}`
                    });
                }
                const cancelledBooking = await this.carHelper.cancelBooking(bookingId, reason);
                res.json({
                    success: true,
                    booking: cancelledBooking,
                    message: 'Booking cancelled successfully. Refund will be processed within 3-5 business days.'
                });
            }
            catch (error) {
                console.error('Cancel booking error:', error);
                res.status(400).json({
                    success: false,
                    message: 'Failed to cancel booking',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        };
        // Process payment for pending booking
        this.processPayment = async (req, res) => {
            try {
                const { bookingId } = req.params;
                const { paymentDetails } = req.body;
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                const booking = await this.carHelper.getBookingById(bookingId);
                if (!booking) {
                    return res.status(404).json({
                        success: false,
                        message: 'Booking not found'
                    });
                }
                // Verify ownership
                if (booking.userId !== userId) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied'
                    });
                }
                // Check if payment is needed
                if (booking.paymentStatus === 'paid') {
                    return res.status(400).json({
                        success: false,
                        message: 'Booking is already paid'
                    });
                }
                const paymentResult = await this.carHelper.processPayment(bookingId, paymentDetails);
                if (paymentResult.success) {
                    res.json({
                        success: true,
                        transactionId: paymentResult.transactionId,
                        message: 'Payment processed successfully. Booking confirmed.'
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: 'Payment failed',
                        error: paymentResult.error
                    });
                }
            }
            catch (error) {
                console.error('Process payment error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to process payment'
                });
            }
        };
        // Get booking statistics for user
        this.getBookingStats = async (req, res) => {
            try {
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                const stats = await this.carHelper.getBookingStats(userId);
                res.json({
                    success: true,
                    stats: {
                        ...stats,
                        userLimits: {
                            maxTravelers: 6,
                            maxBookingValue: 5000,
                            bulkBookingAvailable: false
                        }
                    },
                    message: 'Booking statistics retrieved successfully'
                });
            }
            catch (error) {
                console.error('Get booking stats error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to get booking statistics'
                });
            }
        };
        // Resend confirmation email
        this.resendConfirmation = async (req, res) => {
            try {
                const { bookingId } = req.params;
                const userId = req.user?.id || 'user_' + Date.now(); // Mock user ID
                const booking = await this.carHelper.getBookingById(bookingId);
                if (!booking) {
                    return res.status(404).json({
                        success: false,
                        message: 'Booking not found'
                    });
                }
                // Verify ownership
                if (booking.userId !== userId) {
                    return res.status(403).json({
                        success: false,
                        message: 'Access denied'
                    });
                }
                const emailSent = await this.carHelper.sendConfirmationEmail(bookingId);
                if (emailSent) {
                    res.json({
                        success: true,
                        message: 'Confirmation email sent successfully'
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: 'Failed to send confirmation email'
                    });
                }
            }
            catch (error) {
                console.error('Resend confirmation error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Failed to resend confirmation'
                });
            }
        };
        this.carHelper = car_helper_1.carHelper;
    }
}
exports.CarUserController = CarUserController;
