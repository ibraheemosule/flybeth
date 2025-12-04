import { Request, Response } from 'express';
export declare class BusinessController {
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private isValidBusinessName;
    private isValidTaxId;
    private checkBusinessStatus;
}
export declare const businessController: BusinessController;
