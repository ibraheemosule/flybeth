import { Request, Response } from 'express';
import { z } from 'zod';
import { authHelper } from '../auth-shared/auth.helper';
import { jwtHelper } from '../auth-shared/jwt.helper';
import { adminRegisterSchema, adminLoginSchema } from './auth-admin.schemas';

export class AdminController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = adminRegisterSchema.parse(req.body);

      // Admin-specific business logic - domain validation
      if (!this.isValidAdminDomain(validatedData.email)) {
        return res.status(403).json({
          success: false,
          message: 'Admin registration is restricted to @flybeth.com email addresses'
        });
      }

      // Check if admin already exists
      const existingAdmin = await authHelper.findAdminByEmail(validatedData.email);
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Admin with this email already exists'
        });
      }

      // Business logic for role validation
      if (!this.isValidAdminRole(validatedData.role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid admin role specified'
        });
      }

      // Create admin
      const admin = await authHelper.createAdmin(validatedData);

      // Generate tokens with admin privileges
      const tokens = jwtHelper.generateTokensForAdmin(admin);

      res.status(201).json({
        success: true,
        message: 'Admin registered successfully',
        data: {
          admin,
          ...tokens
        }
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      }

      console.error('Admin registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = adminLoginSchema.parse(req.body);

      // Find admin
      const admin = await authHelper.findAdminByEmail(validatedData.email);
      if (!admin || !admin.password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Admin-specific business logic checks
      const accessCheck = await this.checkAdminAccess(admin);
      if (!accessCheck.isValid) {
        return res.status(401).json({
          success: false,
          message: accessCheck.message
        });
      }

      // Verify password
      const isPasswordValid = await authHelper.verifyPassword(
        validatedData.password, 
        admin.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate tokens with admin privileges
      const tokens = jwtHelper.generateTokensForAdmin(admin);

      // Remove password from response
      const { password, ...adminWithoutPassword } = admin;

      res.json({
        success: true,
        message: 'Admin login successful',
        data: {
          admin: adminWithoutPassword,
          ...tokens
        }
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      }

      console.error('Admin login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async googleAuth(req: Request, res: Response) {
    try {
      const { credential } = req.body;

      if (!credential) {
        return res.status(400).json({
          success: false,
          message: 'Google credential is required'
        });
      }

      // Business logic orchestration - Google OAuth + admin validation
      const googleUser = await jwtHelper.verifyGoogleToken(credential);
      
      if (!googleUser) {
        return res.status(401).json({
          success: false,
          message: 'Invalid Google token'
        });
      }

      // Admin domain validation
      if (!this.isValidAdminDomain(googleUser.email)) {
        return res.status(403).json({
          success: false,
          message: 'Admin access is restricted to @flybeth.com email addresses'
        });
      }

      // Find or create admin
      let admin = await authHelper.findAdminByEmail(googleUser.email);
      
      if (!admin) {
        // Create new admin from Google OAuth
        admin = await authHelper.createAdmin({
          email: googleUser.email,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
          role: 'VIEWER', // Default role for Google OAuth admins
          googleId: googleUser.googleId,
          avatar: googleUser.avatar
        });
      }

      // Generate tokens
      const tokens = jwtHelper.generateTokensForAdmin(admin);

      res.json({
        success: true,
        message: 'Google authentication successful',
        data: {
          admin,
          ...tokens
        }
      });

    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({
        success: false,
        message: 'Google authentication failed'
      });
    }
  }

  // Business logic methods for admin operations
  private isValidAdminDomain(email: string): boolean {
    // Business rule: Only @flybeth.com emails can be admins
    return email.endsWith('@flybeth.com');
  }

  private isValidAdminRole(role: string): boolean {
    // Business logic for role validation
    const validRoles = ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'VIEWER'];
    return validRoles.includes(role);
  }

  private async checkAdminAccess(admin: any): Promise<{ isValid: boolean; message?: string }> {
    // Business logic orchestration for admin access
    
    // Check if admin is active
    if (!admin.isActive) {
      return { isValid: false, message: 'Admin account is deactivated' };
    }

    // Check admin permissions
    if (admin.role === 'SUSPENDED') {
      return { isValid: false, message: 'Admin access has been suspended' };
    }

    // Additional security check for admin domain
    if (!this.isValidAdminDomain(admin.email)) {
      return { isValid: false, message: 'Admin email domain is no longer authorized' };
    }

    return { isValid: true };
  }
}

export const adminController = new AdminController();