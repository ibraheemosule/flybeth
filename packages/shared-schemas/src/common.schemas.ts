import { z } from "zod";

// Common schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

// Search filters
export const dateRangeSchema = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
});

export const priceRangeSchema = z.object({
  min: z.number().min(0).optional(),
  max: z.number().min(0).optional(),
});

// Booking status
export const bookingStatusSchema = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
  "refunded",
  "modified",
]);

// Currency schema
export const currencySchema = z
  .string()
  .length(3)
  .regex(/^[A-Z]{3}$/, "Invalid currency code");

// Address schema
export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

// Payment method schema
export const paymentMethodSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number().min(new Date().getFullYear()),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
  billingAddress: addressSchema.optional(),
});

// Trip creation schema (for frontend forms)
export const tripSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
  travelers: z
    .number()
    .min(1, "At least 1 traveler required")
    .max(10, "Maximum 10 travelers"),
  budget: z.number().min(0).optional(),
  preferences: z
    .object({
      accommodation: z.enum(["budget", "mid-range", "luxury"]).optional(),
      activities: z.array(z.string()).optional(),
      transportation: z.enum(["flight", "car", "train", "bus"]).optional(),
    })
    .optional(),
});

// API Response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  errors: z.array(z.string()).optional(),
});

export const paginatedResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(z.any()),
  pagination: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    pages: z.number(),
  }),
});

// Error schema
export const errorSchema = z.object({
  code: z.string(),
  message: z.string(),
  field: z.string().optional(),
});

// Types
export type PaginationInput = z.infer<typeof paginationSchema>;
export type DateRange = z.infer<typeof dateRangeSchema>;
export type PriceRange = z.infer<typeof priceRangeSchema>;
export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type Address = z.infer<typeof addressSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type TripInput = z.infer<typeof tripSchema>;
export type ApiResponse = z.infer<typeof apiResponseSchema>;
export type PaginatedResponse = z.infer<typeof paginatedResponseSchema>;
export type ApiError = z.infer<typeof errorSchema>;
