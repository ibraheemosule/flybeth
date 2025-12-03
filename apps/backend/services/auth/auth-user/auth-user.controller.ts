import { Request, Response } from 'express';
import { z } from 'zod';
import { authHelper } from '../auth-shared/auth.helper';
import { jwtHelper } from '../auth-shared/jwt.helper';
import { userRegisterSchema, userLoginSchema } from './auth-user.schemas';

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = userRegisterSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await authHelper.findUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create user
      const user = await authHelper.createUser(validatedData);

      // Generate tokens
      const tokens = jwtHelper.generateTokensForUser(user);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user,
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

      console.error('User registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = userLoginSchema.parse(req.body);

      // Find user
      const user = await authHelper.findUserByEmail(validatedData.email);
      if (!user || !user.password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'User account is deactivated'
        });
      }

      // Verify password
      const isPasswordValid = await authHelper.verifyPassword(
        validatedData.password, 
        user.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Generate tokens
      const tokens = jwtHelper.generateTokensForUser(user);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      res.json({
        success: true,
        message: 'User login successful',
        data: {
          user: userWithoutPassword,
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

      console.error('User login error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

export const userController = new UserController();