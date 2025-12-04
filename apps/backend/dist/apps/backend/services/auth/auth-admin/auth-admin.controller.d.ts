import { Request, Response } from 'express';
export declare class AdminController {
    register(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    googleAuth(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    private isValidAdminDomain;
    private isValidAdminRole;
    private checkAdminAccess;
}
export declare const adminController: AdminController;
