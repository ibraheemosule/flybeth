import { z } from 'zod'

export const driverSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  dateOfBirth: z.string(),
  documentType: z.enum(['drivingLicense', 'passport', 'nationalId']),
  documentNumber: z.string().min(1),
  documentExpiry: z.string(),
  licenseNumber: z.string().min(1),
  licenseIssueDate: z.string(),
  licenseExpiryDate: z.string(),
  licenseCountry: z.string().min(2)
})

export const createCarRentalSchema = z.object({
  serviceDetails: z.object({
    carId: z.string().min(1),
    carType: z.string().min(1),
    category: z.string().min(1)
  }),
  drivers: z.array(driverSchema).min(1).max(2), // Max 2 drivers for user rentals
  dates: z.object({
    pickupDate: z.string(),
    returnDate: z.string(),
    pickupTime: z.string(),
    returnTime: z.string()
  }),
  locations: z.object({
    pickup: z.object({
      address: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1)
    }),
    return: z.object({
      address: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1)
    })
  }),
  preferences: z.object({
    insurance: z.boolean().optional(),
    extras: z.array(z.string()).optional(),
    specialRequests: z.string().optional()
  }).optional(),
  pricing: z.object({
    dailyRate: z.number().positive(),
    totalDays: z.number().positive(),
    basePrice: z.number().positive(),
    taxes: z.number().min(0),
    fees: z.number().min(0),
    totalPrice: z.number().positive()
  })
})

export const carSearchSchema = z.object({
  pickupLocation: z.string().optional(),
  returnLocation: z.string().optional(),
  pickupDate: z.string().optional(),
  returnDate: z.string().optional(),
  category: z.string().optional(),
  transmission: z.enum(['automatic', 'manual']).optional(),
  fuelType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  insurance: z.boolean().optional()
})

export const cancelCarRentalSchema = z.object({
  reason: z.string().min(1)
})