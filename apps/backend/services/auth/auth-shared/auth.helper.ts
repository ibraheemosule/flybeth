import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { User, Business, Admin } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthProvider {
  // User operations
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  }) {
    const hashedPassword = await this.hashPassword(userData.password);
    
    return await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Business operations
  async findBusinessByEmail(email: string): Promise<Business | null> {
    return await prisma.business.findUnique({
      where: { email },
    });
  }

  async createBusiness(businessData: {
    email: string;
    password: string;
    companyName: string;
    representativeName: string;
    businessType?: string;
    industry?: string;
    businessPhone?: string;
    website?: string;
  }) {
    const hashedPassword = await this.hashPassword(businessData.password);
    
    return await prisma.business.create({
      data: {
        email: businessData.email,
        password: hashedPassword,
        companyName: businessData.companyName,
        representativeName: businessData.representativeName,
        businessType: businessData.businessType,
        industry: businessData.industry,
        businessPhone: businessData.businessPhone,
        website: businessData.website,
      },
      select: {
        id: true,
        email: true,
        companyName: true,
        representativeName: true,
        businessType: true,
        industry: true,
        businessPhone: true,
        website: true,
        isActive: true,
        verifiedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Admin operations
  async findAdminByEmail(email: string): Promise<Admin | null> {
    return await prisma.admin.findUnique({
      where: { email },
    });
  }

  async createAdmin(adminData: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    role?: string;
    googleId?: string;
    avatar?: string;
  }) {
    const hashedPassword = adminData.password 
      ? await this.hashPassword(adminData.password)
      : null;
    
    return await prisma.admin.create({
      data: {
        email: adminData.email,
        password: hashedPassword,
        firstName: adminData.firstName,
        lastName: adminData.lastName,
        role: adminData.role || 'ADMIN',
        googleId: adminData.googleId,
        avatar: adminData.avatar,
      },
      select: {
        id: true,
        email: true,
        password: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        googleId: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // Shared password operations
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Account status operations
  async isUserActive(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });
    return user?.isActive || false;
  }

  async isBusinessActive(businessId: string): Promise<boolean> {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { isActive: true, verifiedAt: true },
    });
    return business?.isActive && !!business?.verifiedAt || false;
  }

  async isAdminActive(adminId: string): Promise<boolean> {
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: { isActive: true },
    });
    return admin?.isActive || false;
  }
}

export const authHelper = new AuthProvider();