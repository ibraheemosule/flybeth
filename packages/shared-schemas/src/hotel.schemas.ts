import { z } from "zod";
import { contactInfoSchema } from "./flight.schemas";

// Hotel search schema
export const hotelSearchSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-in date"),
  checkOutDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid check-out date"),
  guests: z.object({
    adults: z
      .number()
      .min(1, "At least 1 adult required")
      .max(8, "Maximum 8 adults"),
    children: z.number().min(0).max(6).default(0),
    rooms: z
      .number()
      .min(1, "At least 1 room required")
      .max(5, "Maximum 5 rooms"),
  }),
  priceRange: z
    .object({
      min: z.number().min(0).optional(),
      max: z.number().min(0).optional(),
    })
    .optional(),
  starRating: z.number().min(1).max(5).optional(),
  amenities: z.array(z.string()).optional(),
});

// Hotel booking schema
export const hotelBookingSchema = z.object({
  hotelOfferId: z.string().min(1, "Hotel offer ID is required"),
  guestInfo: z.object({
    primaryGuest: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    }),
    additionalGuests: z
      .array(
        z.object({
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          age: z.number().min(0).max(120),
        })
      )
      .optional(),
  }),
  contactInfo: contactInfoSchema,
  specialRequests: z
    .string()
    .max(500, "Special requests must be under 500 characters")
    .optional(),
  paymentInfo: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
    billingAddress: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.string().min(1, "ZIP code is required"),
      country: z.string().min(1, "Country is required"),
    }),
  }),
});

// Business hotel booking schema
export const businessHotelBookingSchema = z.object({
  hotelOfferId: z.string().min(1, "Hotel offer ID is required"),
  corporateCode: z.string().optional(),
  guestInfo: z.object({
    primaryGuest: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
      employeeId: z.string().optional(),
    }),
  }),
  billingInfo: z.object({
    companyName: z.string().min(1, "Company name is required"),
    taxId: z.string().min(1, "Tax ID is required"),
    billingAddress: z.object({
      street: z.string().min(1, "Street address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zipCode: z.string().min(1, "ZIP code is required"),
      country: z.string().min(1, "Country is required"),
    }),
    contactPerson: z.object({
      name: z.string().min(1, "Contact person name is required"),
      email: z.string().email("Invalid email address"),
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    }),
  }),
  costCenter: z.string().optional(),
  approverEmail: z.string().email().optional(),
});

// Bulk hotel booking schema
export const bulkHotelBookingSchema = z.object({
  bookings: z
    .array(businessHotelBookingSchema)
    .min(1, "At least one booking required")
    .max(50, "Maximum 50 bookings per bulk request"),
  groupBookingId: z.string().optional(),
});

// Types
export type HotelSearchInput = z.infer<typeof hotelSearchSchema>;
export type HotelBookingInput = z.infer<typeof hotelBookingSchema>;
export type BusinessHotelBookingInput = z.infer<
  typeof businessHotelBookingSchema
>;
export type BulkHotelBookingInput = z.infer<typeof bulkHotelBookingSchema>;
