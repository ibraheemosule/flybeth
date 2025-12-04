import { Request, Response } from 'express';
export declare class CarBusinessController {
    private carHelper;
    constructor();
    createCarRental: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createBulkBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookings: (req: Request, res: Response) => Promise<void>;
    getBookingDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    cancelBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    processPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    approveBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    modifyBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookingAnalytics: (req: Request, res: Response) => Promise<void>;
    generateReport: (req: Request, res: Response) => Promise<void>;
}
