import { z } from 'zod'

export const hotelSearchSchema = z.object({
  location: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  guests: z.number().min(1).max(6).optional(), // User limit: max 6 guests
  maxPrice: z.number().min(0).max(1000).optional(), // User limit: max $1000 per night
  minRating: z.number().min(1).max(5).optional(),
  amenities: z.array(z.string()).optional()
})

export const hotelBookingSchema = z.object({
  hotelId: z.string().min(1),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  guests: z.number().min(1).max(6), // User limit: max 6 guests
  roomType: z.string().min(1),
  specialRequests: z.string().optional()
})

export type HotelSearchRequest = z.infer<typeof hotelSearchSchema>
export type HotelBookingRequest = z.infer<typeof hotelBookingSchema>