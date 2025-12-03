import { z } from 'zod';

export const businessRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().min(1),
  representativeName: z.string().min(1),
  businessType: z.enum(['corporation', 'llc', 'partnership', 'sole_proprietorship']).optional(),
  industry: z.string().optional(),
  businessPhone: z.string().optional(),
  website: z.string().url().optional(),
});

export const businessLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});