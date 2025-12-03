import { Request, Response } from 'express';
import { flightHelper, flightDataHelper } from '../flight-shared/flight.helper';
import { flightSearchSchema } from '../flight-shared/flight.schemas';

export class FlightBusinessController {
  async searchFlights(req: Request, res: Response) {
    try {
      const { origin, destination, departureDate, passengers = '1', returnDate, class: flightClass } = req.query;

      // Business logic validation for businesses
      if (!origin || !destination || !departureDate) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: origin, destination, departureDate'
        });
      }

      const passengerCount = parseInt(passengers as string);
      if (isNaN(passengerCount) || passengerCount < 1 || passengerCount > 50) { // Business limit: max 50 passengers
        return res.status(400).json({
          success: false,
          message: 'Passenger count must be between 1 and 50 for business users'
        });
      }

      const searchDate = new Date(departureDate as string);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (searchDate < today) {
        return res.status(400).json({
          success: false,
          message: 'Departure date cannot be in the past'
        });
      }

      // Data access through shared provider
      const flights = await flightHelper.searchFlights({
        origin: origin as string,
        destination: destination as string,
        departureDate: searchDate,
        passengers: passengerCount,
        returnDate: returnDate ? new Date(returnDate as string) : undefined,
      });

      // Business-specific enhancements
      const businessFlights = await this.enhanceFlightsForBusiness(flights);

      res.json({
        success: true,
        data: {
          flights: businessFlights,
          searchCriteria: {
            origin,
            destination,
            departureDate,
            passengers: passengerCount,
            class: flightClass,
          },
          businessFeatures: {
            maxPassengers: 50,
            bulkBooking: true,
            corporateRates: true,
            flexibleCancellation: true,
          }
        }
      });

    } catch (error) {
      console.error('Business flight search error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search flights'
      });
    }
  }

  async getFlightDetails(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const flight = await flightHelper.findFlightById(id);

      if (!flight) {
        return res.status(404).json({
          success: false,
          message: 'Flight not found'
        });
      }

      // Business-specific logic - corporate rates and features
      const corporatePrice = this.calculateCorporatePrice(flight.price);
      const availability = this.checkFlightAvailability(flight);

      res.json({
        success: true,
        data: {
          flight: {
            ...flight,
            corporatePrice,
            originalPrice: flight.price,
          },
          availability,
          businessFeatures: {
            corporateDiscount: flight.price - corporatePrice,
            flexibleCancellation: true,
            priorityBooking: true,
            invoicing: true,
          }
        }
      });

    } catch (error) {
      console.error('Get business flight details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get flight details'
      });
    }
  }

  async getFlightStats(req: Request, res: Response) {
    try {
      const { dateFrom, dateTo } = req.query;

      const fromDate = dateFrom ? new Date(dateFrom as string) : undefined;
      const toDate = dateTo ? new Date(dateTo as string) : undefined;

      if (fromDate && toDate && fromDate > toDate) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date range'
        });
      }

      // Business users get access to flight statistics
      const stats = await flightHelper.getFlightStats(fromDate, toDate);

      res.json({
        success: true,
        data: { 
          stats,
          businessInsights: {
            recommendations: this.generateBusinessRecommendations(stats),
            costOptimization: true,
          }
        }
      });

    } catch (error) {
      console.error('Get business flight stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Business-specific logic methods
  private async enhanceFlightsForBusiness(flights: any[]) {
    return await Promise.all(
      flights.map(async (flight) => {
        try {
          const airlineInfo = await flightDataHelper.getAirlineInfo(flight.airline);
          const corporatePrice = this.calculateCorporatePrice(flight.price);
          
          return {
            ...flight,
            airlineInfo,
            originalPrice: flight.price,
            corporatePrice,
            corporateDiscount: flight.price - corporatePrice,
            duration: this.calculateFlightDuration(flight.departureTime, flight.arrivalTime),
            priceCategory: this.categorizePriceForBusiness(corporatePrice),
            availabilityStatus: this.checkFlightAvailability(flight),
            businessFeatures: {
              invoicing: true,
              flexibleCancellation: true,
              prioritySupport: true,
            },
          };
        } catch (error) {
          console.error('Error enhancing business flight data:', error);
          return flight;
        }
      })
    );
  }

  private calculateCorporatePrice(originalPrice: number): number {
    // Business logic - corporate discount tiers
    if (originalPrice > 1000) {
      return originalPrice * 0.85; // 15% discount for premium flights
    }
    if (originalPrice > 500) {
      return originalPrice * 0.90; // 10% discount for standard flights
    }
    return originalPrice * 0.95; // 5% discount for budget flights
  }

  private checkFlightAvailability(flight: any): { available: boolean; seatsLeft: number; status: string } {
    const seatsLeft = flight.seats || 0;

    if (seatsLeft === 0) {
      return { available: false, seatsLeft: 0, status: 'SOLD_OUT' };
    }

    if (seatsLeft <= 10) { // Business users get priority for bulk booking
      return { available: true, seatsLeft, status: 'LIMITED' };
    }

    return { available: true, seatsLeft, status: 'AVAILABLE' };
  }

  private calculateFlightDuration(departureTime: Date, arrivalTime: Date): string {
    const diff = new Date(arrivalTime).getTime() - new Date(departureTime).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  }

  private categorizePriceForBusiness(price: number): string {
    if (price < 300) return 'BUDGET';
    if (price < 800) return 'STANDARD';
    if (price < 1500) return 'PREMIUM';
    return 'EXECUTIVE';
  }

  private generateBusinessRecommendations(stats: any): string[] {
    const recommendations = [];
    
    if (stats.averagePrice > 1000) {
      recommendations.push('Consider booking flights in advance for better corporate rates');
    }
    
    if (stats.totalFlights < 50) {
      recommendations.push('Low flight volume - consider consolidating travel dates');
    }
    
    recommendations.push('Review quarterly travel patterns for cost optimization');
    
    return recommendations;
  }
}

export const flightBusinessController = new FlightBusinessController();