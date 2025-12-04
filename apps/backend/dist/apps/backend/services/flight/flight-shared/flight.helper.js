"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flightDataHelper = exports.flightHelper = exports.FlightDataProvider = exports.FlightProvider = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FlightProvider {
    // Core flight data access
    async searchFlights(searchParams) {
        const { origin, destination, departureDate, passengers, returnDate } = searchParams;
        const endDate = new Date(departureDate);
        endDate.setDate(endDate.getDate() + 1);
        return await prisma.flight.findMany({
            where: {
                origin,
                destination,
                departureTime: {
                    gte: departureDate,
                    lt: endDate,
                },
                status: 'ACTIVE',
                seats: {
                    gte: passengers,
                },
            },
            orderBy: {
                price: 'asc',
            },
        });
    }
    async findFlightById(flightId) {
        return await prisma.flight.findUnique({
            where: { id: flightId },
        });
    }
    async getFlightsByRoute(origin, destination) {
        return await prisma.flight.findMany({
            where: { origin, destination },
            orderBy: { departureTime: 'asc' },
        });
    }
    async updateFlightSeats(flightId, seatsToBook) {
        return await prisma.flight.update({
            where: { id: flightId },
            data: {
                seats: {
                    decrement: seatsToBook,
                },
            },
        });
    }
    async getFlightStats(dateFrom, dateTo) {
        const where = dateFrom && dateTo ? {
            departureTime: {
                gte: dateFrom,
                lte: dateTo,
            }
        } : {};
        const [totalFlights, averagePrice, flightsByStatus] = await Promise.all([
            prisma.flight.count({ where }),
            prisma.flight.aggregate({
                where,
                _avg: { price: true },
            }),
            prisma.flight.groupBy({
                by: ['status'],
                where,
                _count: { status: true },
            }),
        ]);
        return {
            totalFlights,
            averagePrice: averagePrice._avg.price || 0,
            flightsByStatus,
        };
    }
}
exports.FlightProvider = FlightProvider;
// External data services
class FlightDataProvider {
    async getAirlineInfo(airlineCode) {
        try {
            const response = await this.callAirlineAPI(airlineCode);
            return {
                success: true,
                airline: response.airline,
                logo: response.logo,
                rating: response.rating,
            };
        }
        catch (error) {
            console.error('Airline info fetch error:', error);
            throw new Error('Failed to fetch airline information');
        }
    }
    async getAirportInfo(airportCode) {
        try {
            const response = await this.callAirportAPI(airportCode);
            return {
                success: true,
                airport: response.airport,
                city: response.city,
                country: response.country,
                timezone: response.timezone,
            };
        }
        catch (error) {
            console.error('Airport info fetch error:', error);
            throw new Error('Failed to fetch airport information');
        }
    }
    async checkFlightStatus(flightNumber, date) {
        try {
            const response = await this.callFlightStatusAPI(flightNumber, date);
            return {
                success: true,
                status: response.status,
                delay: response.delay,
                gate: response.gate,
                terminal: response.terminal,
            };
        }
        catch (error) {
            console.error('Flight status check error:', error);
            throw new Error('Failed to check flight status');
        }
    }
    async callAirlineAPI(airlineCode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    airline: `${airlineCode} Airlines`,
                    logo: `https://example.com/logos/${airlineCode.toLowerCase()}.png`,
                    rating: 4.2,
                });
            }, 500);
        });
    }
    async callAirportAPI(airportCode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    airport: `${airportCode} International Airport`,
                    city: 'Sample City',
                    country: 'Sample Country',
                    timezone: 'UTC+0',
                });
            }, 600);
        });
    }
    async callFlightStatusAPI(flightNumber, date) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'ON_TIME',
                    delay: 0,
                    gate: 'A12',
                    terminal: '1',
                });
            }, 400);
        });
    }
}
exports.FlightDataProvider = FlightDataProvider;
exports.flightHelper = new FlightProvider();
exports.flightDataHelper = new FlightDataProvider();
