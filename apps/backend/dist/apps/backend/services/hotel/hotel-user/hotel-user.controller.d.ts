import { Request, Response } from 'express';
export declare class HotelUserController {
    private hotelHelper;
    constructor();
    searchHotels: (req: Request, res: Response) => Promise<void>;
    getHotelDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    checkAvailability: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createReservation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getPopularHotels: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAmenities: (req: Request, res: Response) => Promise<void>;
}
