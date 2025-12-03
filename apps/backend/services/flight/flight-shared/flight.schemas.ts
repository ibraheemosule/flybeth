import { z } from 'zod';

export const flightSearchSchema = z.object({
  origin: z.string().min(3).max(3),
  destination: z.string().min(3).max(3), 
  departureDate: z.string().datetime(),
  passengers: z.number().min(1).max(9).optional().default(1),
  returnDate: z.string().datetime().optional(),
});

export const flightBookingSchema = z.object({
  flightId: z.string().uuid(),
  passengers: z.array(z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    dateOfBirth: z.string().datetime(),
    passportNumber: z.string().optional(),
  })),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().min(1),
  }),
});