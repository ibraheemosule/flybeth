import { z } from "zod";

// User validation schemas
export const emailSchema = z.string().email("Must be a valid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  );

export const userTypeSchema = z.enum(["CONSUMER", "BUSINESS"]);

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters");

// Authentication schemas
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userType: userTypeSchema,
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters")
    .optional(),
  businessDescription: z
    .string()
    .trim()
    .max(500, "Business description must be less than 500 characters")
    .optional(),
  businessWebsite: z.string().url("Must be a valid URL").optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

// Trip booking schemas
export const dateSchema = z
  .string()
  .datetime("Must be a valid ISO 8601 date")
  .or(z.date())
  .transform(date => new Date(date));

export const tripBookingSchema = z
  .object({
    destination: z
      .string()
      .trim()
      .min(2, "Destination must be at least 2 characters")
      .max(100, "Destination must be less than 100 characters"),
    startDate: dateSchema,
    endDate: dateSchema,
    travelers: z
      .number()
      .int()
      .min(1, "At least 1 traveler is required")
      .max(20, "Maximum 20 travelers allowed"),
  })
  .refine(
    data => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.startDate >= today;
    },
    {
      message: "Start date must be in the future",
      path: ["startDate"],
    }
  )
  .refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

export const b2bTripBookingSchema = z
  .object({
    destination: z
      .string()
      .trim()
      .min(2, "Destination must be at least 2 characters")
      .max(100, "Destination must be less than 100 characters"),
    startDate: dateSchema,
    endDate: dateSchema,
    travelers: z
      .number()
      .int()
      .min(1, "At least 1 traveler is required")
      .max(20, "Maximum 20 travelers allowed"),
    platformUserId: z
      .string()
      .trim()
      .min(1, "Platform user ID is required")
      .max(100, "Platform user ID must be less than 100 characters"),
    platformUserEmail: emailSchema,
  })
  .refine(
    data => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.startDate >= today;
    },
    {
      message: "Start date must be in the future",
      path: ["startDate"],
    }
  )
  .refine(data => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

// Export types
export type SignupData = z.infer<typeof signupSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type TripBookingData = z.infer<typeof tripBookingSchema>;
export type B2BTripBookingData = z.infer<typeof b2bTripBookingSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
