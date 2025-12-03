import { z } from 'zod'

export const businessHotelSearchSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().min(1).max(100).optional(), // Business limit: up to 100 guests
  maxPrice: z.number().min(0).optional(), // No price limit for business
  minRating: z.number().min(1).max(5).optional(),
  amenities: z.array(z.string()).optional(),
  corporateId: z.string().optional(),
  eventType: z.enum(['conference', 'meeting', 'corporate_event', 'training', 'other']).optional()
})

export const businessHotelBookingSchema = z.object({
  hotelId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.number().min(1).max(100), // Business limit: up to 100 guests
  roomType: z.string().min(1),
  specialRequests: z.string().optional(),
  corporateId: z.string().optional(),
  eventType: z.enum(['conference', 'meeting', 'corporate_event', 'training', 'other']),
  billingInfo: z.object({
    companyName: z.string().min(1),
    taxId: z.string().optional(),
    address: z.string().min(1),
    contactPerson: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1)
  }),
  requiresInvoice: z.boolean().default(true)
})

export const bulkBookingSchema = z.object({
  bookings: z.array(businessHotelBookingSchema).min(1).max(50), // Max 50 bookings at once
  corporateDiscount: z.number().min(0).max(50).optional(), // Up to 50% corporate discount
  paymentTerms: z.enum(['immediate', 'net15', 'net30', 'net45']).default('immediate')
})

export type BusinessHotelSearchRequest = z.infer<typeof businessHotelSearchSchema>
export type BusinessHotelBookingRequest = z.infer<typeof businessHotelBookingSchema>
export type BulkBookingRequest = z.infer<typeof bulkBookingSchema>