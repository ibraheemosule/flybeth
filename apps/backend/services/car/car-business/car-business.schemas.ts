import { z } from 'zod'
import { driverSchema } from '../car-user/car-user.schemas'

export const createBusinessCarRentalSchema = z.object({
  serviceDetails: z.object({
    carId: z.string().min(1),
    carType: z.string().min(1),
    category: z.string().min(1)
  }),
  drivers: z.array(driverSchema).min(1).max(5), // Max 5 drivers for business rentals
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
  }),
  corporateInfo: z.object({
    companyName: z.string().min(1),
    corporateId: z.string().optional(),
    billingAddress: z.string().min(1),
    taxId: z.string().optional(),
    contactPerson: z.string().min(1),
    contactEmail: z.string().email(),
    contactPhone: z.string().min(1)
  })
})

export const businessCarRentalSearchSchema = z.object({
  pickupLocation: z.string().optional(),
  returnLocation: z.string().optional(),
  pickupDate: z.string().optional(),
  returnDate: z.string().optional(),
  category: z.string().optional(),
  transmission: z.enum(['automatic', 'manual']).optional(),
  fuelType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  insurance: z.boolean().optional(),
  companyName: z.string().optional(),
  corporateId: z.string().optional()
})

export const cancelBusinessCarRentalSchema = z.object({
  reason: z.string().min(1),
  refundType: z.enum(['full', 'partial', 'none']).optional(),
  refundAmount: z.number().min(0).optional()
})

export const bulkCarRentalSchema = z.object({
  rentals: z.array(createBusinessCarRentalSchema).min(1).max(20),
  bulkDiscount: z.number().min(0).max(0.5).optional(),
  corporateInfo: z.object({
    companyName: z.string().min(1),
    corporateId: z.string().optional(),
    billingAddress: z.string().min(1),
    taxId: z.string().optional(),
    contactPerson: z.string().min(1),
    contactEmail: z.string().email(),
    contactPhone: z.string().min(1)
  })
})