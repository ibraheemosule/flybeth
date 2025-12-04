import { User, Business, Admin } from '@prisma/client';
export declare class AuthProvider {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(userData: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber?: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isActive: boolean;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBusinessByEmail(email: string): Promise<Business | null>;
    createBusiness(businessData: {
        email: string;
        password: string;
        companyName: string;
        representativeName: string;
        businessType?: string;
        industry?: string;
        businessPhone?: string;
        website?: string;
    }): Promise<{
        id: string;
        email: string;
        isActive: boolean;
        verifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        businessType: string | null;
        industry: string | null;
        website: string | null;
        businessPhone: string | null;
        representativeName: string;
    }>;
    findAdminByEmail(email: string): Promise<Admin | null>;
    createAdmin(adminData: {
        email: string;
        password?: string;
        firstName: string;
        lastName: string;
        role?: string;
        googleId?: string;
        avatar?: string;
    }): Promise<{
        id: string;
        email: string;
        password: string | null;
        firstName: string;
        lastName: string;
        isActive: boolean;
        googleId: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: string;
    }>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
    isUserActive(userId: string): Promise<boolean>;
    isBusinessActive(businessId: string): Promise<boolean>;
    isAdminActive(adminId: string): Promise<boolean>;
}
export declare const authHelper: AuthProvider;
