import { Request, Response } from 'express';
export declare class CarUserController {
    private carHelper;
    constructor();
    createCarRental: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookings: (req: Request, res: Response) => Promise<void>;
    getBookingDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    cancelBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    processPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getBookingStats: (req: Request, res: Response) => Promise<void>;
    resendConfirmation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
