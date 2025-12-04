export declare class FlightProvider {
    searchFlights(searchParams: {
        origin: string;
        destination: string;
        departureDate: Date;
        passengers: number;
        returnDate?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        origin: string;
        destination: string;
        flightNumber: string;
        airline: string;
        departureTime: Date;
        arrivalTime: Date;
        price: number;
        currency: string;
        seats: number;
        aircraft: string | null;
    }[]>;
    findFlightById(flightId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        origin: string;
        destination: string;
        flightNumber: string;
        airline: string;
        departureTime: Date;
        arrivalTime: Date;
        price: number;
        currency: string;
        seats: number;
        aircraft: string | null;
    } | null>;
    getFlightsByRoute(origin: string, destination: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        origin: string;
        destination: string;
        flightNumber: string;
        airline: string;
        departureTime: Date;
        arrivalTime: Date;
        price: number;
        currency: string;
        seats: number;
        aircraft: string | null;
    }[]>;
    updateFlightSeats(flightId: string, seatsToBook: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        origin: string;
        destination: string;
        flightNumber: string;
        airline: string;
        departureTime: Date;
        arrivalTime: Date;
        price: number;
        currency: string;
        seats: number;
        aircraft: string | null;
    }>;
    getFlightStats(dateFrom?: Date, dateTo?: Date): Promise<{
        totalFlights: number;
        averagePrice: number;
        flightsByStatus: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.FlightGroupByOutputType, "status"[]> & {
            _count: {
                status: number;
            };
        })[];
    }>;
}
export declare class FlightDataProvider {
    getAirlineInfo(airlineCode: string): Promise<{
        success: boolean;
        airline: any;
        logo: any;
        rating: any;
    }>;
    getAirportInfo(airportCode: string): Promise<{
        success: boolean;
        airport: any;
        city: any;
        country: any;
        timezone: any;
    }>;
    checkFlightStatus(flightNumber: string, date: Date): Promise<{
        success: boolean;
        status: any;
        delay: any;
        gate: any;
        terminal: any;
    }>;
    private callAirlineAPI;
    private callAirportAPI;
    private callFlightStatusAPI;
}
export declare const flightHelper: FlightProvider;
export declare const flightDataHelper: FlightDataProvider;
