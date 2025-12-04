import { Request, Response } from 'express';
export declare class HotelBusinessController {
    private hotelHelper;
    constructor();
    searchHotels: (req: Request, res: Response) => Promise<void>;
    getHotelDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createReservation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createBulkBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getCorporateAnalytics: (req: Request, res: Response) => Promise<void>;
    requestCustomRates: (req: Request, res: Response) => Promise<void>;
}
