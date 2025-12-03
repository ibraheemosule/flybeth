import { z } from 'zod';

export const adminRegisterSchema = z.object({
  email: z.string().email().refine(email => email.endsWith('@flybeth.com'), {
    message: 'Admin registration is only allowed for @flybeth.com domain'
  }),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['ADMIN', 'SUPER_ADMIN', 'SUPPORT']).default('ADMIN'),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const googleAuthSchema = z.object({
  googleToken: z.string().min(1),
});