import { Request, Response } from 'express';
export declare class FlightBusinessController {
    searchFlights(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getFlightDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getFlightStats(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private enhanceFlightsForBusiness;
    private calculateCorporatePrice;
    private checkFlightAvailability;
    private calculateFlightDuration;
    private categorizePriceForBusiness;
    private generateBusinessRecommendations;
}
export declare const flightBusinessController: FlightBusinessController;
