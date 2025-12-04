"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightUserController = exports.FlightUserController = void 0;
const flight_helper_1 = require("../flight-shared/flight.helper");
class FlightUserController {
    async searchFlights(req, res) {
        try {
            const { origin, destination, departureDate, passengers = '1', returnDate } = req.query;
            // Business logic validation for users
            if (!origin || !destination || !departureDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required parameters: origin, destination, departureDate'
                });
            }
            const passengerCount = parseInt(passengers);
            if (isNaN(passengerCount) || passengerCount < 1 || passengerCount > 6) { // User limit: max 6 passengers
                return res.status(400).json({
                    success: false,
                    message: 'Passenger count must be between 1 and 6 for regular users'
                });
            }
            // Business logic - validate dates
            const searchDate = new Date(departureDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (searchDate < today) {
                return res.status(400).json({
                    success: false,
                    message: 'Departure date cannot be in the past'
                });
            }
            // Data access through shared provider
            const flights = await flight_helper_1.flightHelper.searchFlights({
                origin: origin,
                destination: destination,
                departureDate: searchDate,
                passengers: passengerCount,
                returnDate: returnDate ? new Date(returnDate) : undefined,
            });
            // User-specific business logic - filter and enhance
            const userFlights = flights.filter(flight => flight.price <= 2000); // User price limit
            const enhancedFlights = await this.enhanceFlightsForUsers(userFlights);
            res.json({
                success: true,
                data: {
                    flights: enhancedFlights,
                    searchCriteria: {
                        origin,
                        destination,
                        departureDate,
                        passengers: passengerCount,
                    },
                    userLimits: {
                        maxPassengers: 6,
                        maxPrice: 2000,
                    }
                }
            });
        }
        catch (error) {
            console.error('User flight search error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to search flights'
            });
        }
    }
    async getFlightDetails(req, res) {
        try {
            const { id } = req.params;
            const flight = await flight_helper_1.flightHelper.findFlightById(id);
            if (!flight) {
                return res.status(404).json({
                    success: false,
                    message: 'Flight not found'
                });
            }
            // User-specific business logic - check if user can book
            if (flight.price > 2000) {
                return res.status(403).json({
                    success: false,
                    message: 'This flight exceeds user booking limits. Please contact support.'
                });
            }
            const availability = this.checkFlightAvailability(flight);
            res.json({
                success: true,
                data: {
                    flight,
                    availability,
                    bookingInfo: {
                        canBook: availability.available && flight.price <= 2000,
                        requiresApproval: false,
                    }
                }
            });
        }
        catch (error) {
            console.error('Get user flight details error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get flight details'
            });
        }
    }
    // User-specific business logic methods
    async enhanceFlightsForUsers(flights) {
        return await Promise.all(flights.map(async (flight) => {
            try {
                const airlineInfo = await flight_helper_1.flightDataHelper.getAirlineInfo(flight.airline);
                return {
                    ...flight,
                    airlineInfo,
                    duration: this.calculateFlightDuration(flight.departureTime, flight.arrivalTime),
                    priceCategory: this.categorizePriceForUsers(flight.price),
                    availabilityStatus: this.checkFlightAvailability(flight),
                    userFriendly: true,
                };
            }
            catch (error) {
                console.error('Error enhancing user flight data:', error);
                return flight;
            }
        }));
    }
    checkFlightAvailability(flight) {
        const seatsLeft = flight.seats || 0;
        if (seatsLeft === 0) {
            return { available: false, seatsLeft: 0, status: 'SOLD_OUT' };
        }
        if (seatsLeft <= 5) {
            return { available: true, seatsLeft, status: 'LIMITED' };
        }
        return { available: true, seatsLeft, status: 'AVAILABLE' };
    }
    calculateFlightDuration(departureTime, arrivalTime) {
        const diff = new Date(arrivalTime).getTime() - new Date(departureTime).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }
    categorizePriceForUsers(price) {
        if (price < 200)
            return 'BUDGET';
        if (price < 500)
            return 'ECONOMY';
        if (price < 1000)
            return 'PREMIUM';
        return 'LUXURY';
    }
}
exports.FlightUserController = FlightUserController;
exports.flightUserController = new FlightUserController();
