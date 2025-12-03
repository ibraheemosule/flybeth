import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class FlightProvider {
  // Core flight data access
  async searchFlights(searchParams: {
    origin: string;
    destination: string;
    departureDate: Date;
    passengers: number;
    returnDate?: Date;
  }) {
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

  async findFlightById(flightId: string) {
    return await prisma.flight.findUnique({
      where: { id: flightId },
    });
  }

  async getFlightsByRoute(origin: string, destination: string) {
    return await prisma.flight.findMany({
      where: { origin, destination },
      orderBy: { departureTime: 'asc' },
    });
  }

  async updateFlightSeats(flightId: string, seatsToBook: number) {
    return await prisma.flight.update({
      where: { id: flightId },
      data: {
        seats: {
          decrement: seatsToBook,
        },
      },
    });
  }

  async getFlightStats(dateFrom?: Date, dateTo?: Date) {
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

// External data services
export class FlightDataProvider {
  async getAirlineInfo(airlineCode: string) {
    try {
      const response = await this.callAirlineAPI(airlineCode);
      
      return {
        success: true,
        airline: response.airline,
        logo: response.logo,
        rating: response.rating,
      };
    } catch (error) {
      console.error('Airline info fetch error:', error);
      throw new Error('Failed to fetch airline information');
    }
  }

  async getAirportInfo(airportCode: string) {
    try {
      const response = await this.callAirportAPI(airportCode);
      
      return {
        success: true,
        airport: response.airport,
        city: response.city,
        country: response.country,
        timezone: response.timezone,
      };
    } catch (error) {
      console.error('Airport info fetch error:', error);
      throw new Error('Failed to fetch airport information');
    }
  }

  async checkFlightStatus(flightNumber: string, date: Date) {
    try {
      const response = await this.callFlightStatusAPI(flightNumber, date);
      
      return {
        success: true,
        status: response.status,
        delay: response.delay,
        gate: response.gate,
        terminal: response.terminal,
      };
    } catch (error) {
      console.error('Flight status check error:', error);
      throw new Error('Failed to check flight status');
    }
  }

  private async callAirlineAPI(airlineCode: string): Promise<any> {
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

  private async callAirportAPI(airportCode: string): Promise<any> {
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

  private async callFlightStatusAPI(flightNumber: string, date: Date): Promise<any> {
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

export const flightHelper = new FlightProvider();
export const flightDataHelper = new FlightDataProvider();