import { Request, Response } from 'express';
export declare class FlightUserController {
    searchFlights(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getFlightDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private enhanceFlightsForUsers;
    private checkFlightAvailability;
    private calculateFlightDuration;
    private categorizePriceForUsers;
}
export declare const flightUserController: FlightUserController;
