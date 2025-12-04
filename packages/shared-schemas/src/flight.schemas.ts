import { z } from "zod";

// Common location schema
export const locationSchema = z.object({
  code: z.string().min(3, "Airport/city code must be at least 3 characters"),
  name: z.string().min(1, "Location name is required"),
  city: z.string().optional(),
  country: z.string().optional(),
});

// Passenger information schema
export const passengerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  passportNumber: z.string().optional(),
  nationality: z.string().min(2, "Nationality is required"),
});

// Contact information schema
export const contactInfoSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

// Flight search schema
export const flightSearchSchema = z.object({
  origin: z.string().min(3, "Origin is required"),
  destination: z.string().min(3, "Destination is required"),
  departureDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid departure date"),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid return date")
    .optional(),
  passengers: z
    .number()
    .min(1, "At least 1 passenger required")
    .max(9, "Maximum 9 passengers"),
  class: z
    .enum(["economy", "premium_economy", "business", "first"])
    .default("economy"),
  tripType: z
    .enum(["round_trip", "one_way", "multi_city"])
    .default("round_trip"),
});

// Flight booking schema
export const flightBookingSchema = z.object({
  flightOfferId: z.string().min(1, "Flight offer ID is required"),
  passengers: z
    .array(passengerSchema)
    .min(1, "At least one passenger required"),
  contactInfo: contactInfoSchema,
  paymentInfo: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
  }),
});

// Flight booking response schema
export const flightBookingResponseSchema = z.object({
  bookingReference: z.string(),
  status: z.enum(["confirmed", "pending", "failed"]),
  totalPrice: z.number().positive(),
  currency: z.string().length(3),
  passengers: z.array(passengerSchema),
  flights: z.array(
    z.object({
      flightNumber: z.string(),
      airline: z.string(),
      departure: z.object({
        airport: z.string(),
        time: z.string(),
      }),
      arrival: z.object({
        airport: z.string(),
        time: z.string(),
      }),
    })
  ),
});

// Types
export type LocationInput = z.infer<typeof locationSchema>;
export type PassengerInput = z.infer<typeof passengerSchema>;
export type ContactInfo = z.infer<typeof contactInfoSchema>;
export type FlightSearchInput = z.infer<typeof flightSearchSchema>;
export type FlightBookingInput = z.infer<typeof flightBookingSchema>;
export type FlightBookingResponse = z.infer<typeof flightBookingResponseSchema>;
