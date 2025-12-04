import { z } from "zod";

// Car rental search schema
export const carRentalSearchSchema = z.object({
  pickupLocation: z.object({
    code: z.string().min(3, "Pickup location code is required"),
    name: z.string().min(1, "Pickup location name is required"),
    type: z.enum(["airport", "city", "hotel"]).default("airport"),
  }),
  returnLocation: z.object({
    code: z.string().min(3, "Return location code is required"),
    name: z.string().min(1, "Return location name is required"),
    type: z.enum(["airport", "city", "hotel"]).default("airport"),
  }),
  pickupDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid pickup date"),
  pickupTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid pickup time (HH:MM)"),
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid return date"),
  returnTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid return time (HH:MM)"),
  driverAge: z.number().min(18, "Driver must be at least 18 years old").max(99),
  carType: z
    .enum([
      "economy",
      "compact",
      "intermediate",
      "standard",
      "fullsize",
      "premium",
      "luxury",
      "suv",
      "convertible",
    ])
    .optional(),
});

// Car rental booking schema
export const carRentalBookingSchema = z.object({
  carOfferId: z.string().min(1, "Car offer ID is required"),
  primaryDriver: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    licenseNumber: z.string().min(1, "License number is required"),
    licenseCountry: z.string().min(2, "License country is required"),
    licenseExpiryDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid license expiry date"),
  }),
  additionalDrivers: z
    .array(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        dateOfBirth: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
        licenseNumber: z.string().min(1, "License number is required"),
        licenseCountry: z.string().min(2, "License country is required"),
      })
    )
    .optional(),
  addOns: z
    .array(
      z.enum(["gps", "child_seat", "additional_insurance", "wifi", "roof_rack"])
    )
    .optional(),
  paymentInfo: z.object({
    cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number"),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear()),
    cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
    cardholderName: z.string().min(1, "Cardholder name is required"),
  }),
});

// Business car rental schema
export const businessCarRentalSchema = z.object({
  serviceDetails: z.object({
    carType: z.enum([
      "economy",
      "compact",
      "intermediate",
      "standard",
      "fullsize",
      "premium",
      "luxury",
      "suv",
    ]),
    quantity: z.number().min(1).max(50),
    duration: z.number().min(1), // days
    pickupLocation: z.string().min(1),
    returnLocation: z.string().min(1),
  }),
  dates: z.object({
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date"),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date"),
    pickupTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid pickup time"),
    returnTime: z.string().regex(/^\d{2}:\d{2}$/, "Invalid return time"),
  }),
  locations: z.object({
    pickup: z.object({
      name: z.string().min(1, "Pickup location name is required"),
      address: z.string().min(1, "Pickup address is required"),
      coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    }),
    return: z.object({
      name: z.string().min(1, "Return location name is required"),
      address: z.string().min(1, "Return address is required"),
      coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    }),
  }),
  preferences: z.object({
    fuelPolicy: z
      .enum(["full_to_full", "full_to_empty", "same_to_same"])
      .default("full_to_full"),
    mileageLimit: z.enum(["unlimited", "limited"]).default("unlimited"),
    additionalEquipment: z.array(z.string()).optional(),
  }),
  pricing: z.object({
    baseRate: z.number().positive(),
    currency: z.string().length(3),
    taxesAndFees: z.number().nonnegative(),
    totalAmount: z.number().positive(),
    paymentTerms: z
      .enum(["immediate", "net_15", "net_30"])
      .default("immediate"),
  }),
  corporateInfo: z.object({
    companyName: z.string().min(1),
    contactPerson: z.string().min(1),
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    billingAddress: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(1),
      zipCode: z.string().min(1),
      country: z.string().min(1),
    }),
    taxId: z.string().optional(),
  }),
});

// Types
export type CarRentalSearchInput = z.infer<typeof carRentalSearchSchema>;
export type CarRentalBookingInput = z.infer<typeof carRentalBookingSchema>;
export type BusinessCarRentalInput = z.infer<typeof businessCarRentalSchema>;
