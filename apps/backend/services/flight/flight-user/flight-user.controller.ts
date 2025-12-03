import { Request, Response } from 'express';
import { flightHelper, flightDataHelper } from '../flight-shared/flight.helper';
import { flightSearchSchema } from '../flight-shared/flight.schemas';

export class FlightUserController {
  async searchFlights(req: Request, res: Response) {
    try {
      const { origin, destination, departureDate, passengers = '1', returnDate } = req.query;

      // Business logic validation for users
      if (!origin || !destination || !departureDate) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: origin, destination, departureDate'
        });
      }

      const passengerCount = parseInt(passengers as string);
      if (isNaN(passengerCount) || passengerCount < 1 || passengerCount > 6) { // User limit: max 6 passengers
        return res.status(400).json({
          success: false,
          message: 'Passenger count must be between 1 and 6 for regular users'
        });
      }

      // Business logic - validate dates
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

    } catch (error) {
      console.error('User flight search error:', error);
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

    } catch (error) {
      console.error('Get user flight details error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get flight details'
      });
    }
  }

  // User-specific business logic methods
  private async enhanceFlightsForUsers(flights: any[]) {
    return await Promise.all(
      flights.map(async (flight) => {
        try {
          const airlineInfo = await flightDataHelper.getAirlineInfo(flight.airline);
          
          return {
            ...flight,
            airlineInfo,
            duration: this.calculateFlightDuration(flight.departureTime, flight.arrivalTime),
            priceCategory: this.categorizePriceForUsers(flight.price),
            availabilityStatus: this.checkFlightAvailability(flight),
            userFriendly: true,
          };
        } catch (error) {
          console.error('Error enhancing user flight data:', error);
          return flight;
        }
      })
    );
  }

  private checkFlightAvailability(flight: any): { available: boolean; seatsLeft: number; status: string } {
    const seatsLeft = flight.seats || 0;

    if (seatsLeft === 0) {
      return { available: false, seatsLeft: 0, status: 'SOLD_OUT' };
    }

    if (seatsLeft <= 5) {
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

  private categorizePriceForUsers(price: number): string {
    if (price < 200) return 'BUDGET';
    if (price < 500) return 'ECONOMY';
    if (price < 1000) return 'PREMIUM';
    return 'LUXURY';
  }
}

export const flightUserController = new FlightUserController();