import { Request, Response } from 'express';
import { z } from 'zod';
import { authHelper } from '../auth-shared/auth.helper';
import { jwtHelper } from '../auth-shared/jwt.helper';
import { businessRegisterSchema, businessLoginSchema } from './auth-business.schemas';

export class BusinessController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = businessRegisterSchema.parse(req.body);

      // Check if business already exists
      const existingBusiness = await authHelper.findBusinessByEmail(validatedData.email);
      if (existingBusiness) {
        return res.status(400).json({
          success: false,
          message: 'Business with this email already exists'
        });
      }

      // Business logic validation
      if (!this.isValidBusinessName(validatedData.companyName)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid company name format'
        });
      }

      // Create business
      const business = await authHelper.createBusiness(validatedData);

      // Generate tokens
      const tokens = jwtHelper.generateTokensForBusiness(business);

      res.status(201).json({
        success: true,
        message: 'Business registered successfully',
        data: {
          business,
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

      console.error('Business registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = businessLoginSchema.parse(req.body);

      // Find business
      const business = await authHelper.findBusinessByEmail(validatedData.email);
      if (!business || !business.password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check business status - business logic orchestration
      const statusCheck = await this.checkBusinessStatus(business);
      if (!statusCheck.isValid) {
        return res.status(401).json({
          success: false,
          message: statusCheck.message
        });
      }

      // Verify password
      const isPasswordValid = await authHelper.verifyPassword(
        validatedData.password, 
        business.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate tokens
      const tokens = jwtHelper.generateTokensForBusiness(business);

      // Remove password from response
      const { password, ...businessWithoutPassword } = business;

      res.json({
        success: true,
        message: 'Business login successful',
        data: {
          business: businessWithoutPassword,
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

      console.error('Business login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Business logic methods - these orchestrate multiple service calls
  private isValidBusinessName(name: string): boolean {
    // Business logic for validating business name
    const minLength = 2;
    const maxLength = 100;
    const validPattern = /^[a-zA-Z0-9\s\.\-&']+$/;
    
    return name.length >= minLength && 
           name.length <= maxLength && 
           validPattern.test(name);
  }

  private isValidTaxId(taxId: string): boolean {
    // Business logic for validating tax ID
    const taxIdPattern = /^[0-9\-]+$/;
    return taxIdPattern.test(taxId) && taxId.length >= 9;
  }

  private async checkBusinessStatus(business: any): Promise<{ isValid: boolean; message?: string }> {
    // Business logic orchestration - checking multiple conditions
    
    // Check if business is active
    if (!business.isActive) {
      return { isValid: false, message: 'Business account is deactivated' };
    }

    // Check verification status
    if (!business.isVerified) {
      return { isValid: false, message: 'Business account is not verified. Please verify your account first.' };
    }

    // Check subscription status (if applicable)
    if (business.subscriptionStatus === 'SUSPENDED') {
      return { isValid: false, message: 'Business account is suspended due to subscription issues' };
    }

    return { isValid: true };
  }
}

export const businessController = new BusinessController();