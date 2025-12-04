# @packages/shared-schemas

Centralized Zod validation schemas for the FlyBeth application.

## 📖 Overview

This package contains all validation schemas used across the FlyBeth monorepo, ensuring consistency between frontend and backend validation logic.

## 🚀 Why Centralized Schemas?

### Problems Solved:

- **Schema Duplication**: No more identical schemas defined in multiple files
- **Type Inconsistency**: Frontend and backend always use the same validation rules
- **Maintenance Overhead**: Single place to update validation logic
- **Testing Complexity**: Centralized schemas are easier to test comprehensively

### Benefits:

- **Single Source of Truth**: All validation logic in one place
- **Type Safety**: Shared TypeScript types derived from schemas
- **Consistency**: Same validation across all apps
- **DRY Principle**: Don't repeat yourself

## 📁 Schema Organization

```
src/
├── auth.schemas.ts      # Authentication & user management
├── flight.schemas.ts    # Flight search & booking
├── hotel.schemas.ts     # Hotel search & booking
├── car.schemas.ts       # Car rental schemas
├── common.schemas.ts    # Shared/reusable schemas
└── index.ts            # Main export file
```

## 🔧 Usage

### Installation

Add to your app's package.json:

```json
{
  "dependencies": {
    "@packages/shared-schemas": "file:../../packages/shared-schemas"
  }
}
```

### Import Schemas

```typescript
import {
  loginSchema,
  registerSchema,
  flightSearchSchema,
  type LoginInput,
  type RegisterInput,
  type FlightSearchInput,
} from "@packages/shared-schemas";
```

### With React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@packages/shared-schemas";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    // data is fully typed and validated
  };

  // ...
};
```

### Backend Validation

```typescript
import { loginSchema, type LoginInput } from "@packages/shared-schemas";

app.post("/auth/login", async (req, res) => {
  try {
    const validData = loginSchema.parse(req.body);
    // validData is typed as LoginInput
    // proceed with authentication
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
  }
});
```

## 📚 Available Schemas

### Authentication

- `loginSchema` - User login validation
- `registerSchema` - User registration with password confirmation
- `businessRegisterSchema` - Business account registration
- `adminLoginSchema` - Admin login (requires @flybeth.com email)
- `forgotPasswordSchema` - Password reset request
- `resetPasswordSchema` - Password reset with token

### Flight Booking

- `flightSearchSchema` - Flight search parameters
- `flightBookingSchema` - Complete flight booking data
- `passengerSchema` - Passenger information
- `contactInfoSchema` - Contact details

### Hotel Booking

- `hotelSearchSchema` - Hotel search parameters
- `hotelBookingSchema` - Hotel booking data
- `businessHotelBookingSchema` - Business hotel booking
- `bulkHotelBookingSchema` - Bulk booking for businesses

### Car Rental

- `carRentalSearchSchema` - Car search parameters
- `carRentalBookingSchema` - Car rental booking
- `businessCarRentalSchema` - Business car rental

### Common/Reusable

- `addressSchema` - Standard address format
- `paymentMethodSchema` - Credit card information
- `paginationSchema` - API pagination parameters
- `tripSchema` - Trip planning form data
- `apiResponseSchema` - Standard API response format

## 🎯 Best Practices

### 1. Schema Composition

Reuse smaller schemas to build larger ones:

```typescript
const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  // ...
});

const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  address: addressSchema, // Reuse address schema
});
```

### 2. Common Validations

Use shared validation patterns:

```typescript
// Instead of repeating email validation everywhere
const emailSchema = z.string().email("Invalid email address");

// Use in multiple schemas
const loginSchema = z.object({
  email: emailSchema, // Consistent validation
  password: z.string().min(1),
});
```

### 3. Type Exports

Always export TypeScript types:

```typescript
export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;
```

### 4. Error Messages

Provide clear, user-friendly error messages:

```typescript
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter");
```

## 🔄 Migration Guide

### From Scattered Schemas

1. **Identify duplicate schemas** across your apps
2. **Move to shared-schemas** package
3. **Update imports** to use centralized version
4. **Remove duplicate definitions**
5. **Update types** to use exported types

### Example Migration

**Before:**

```typescript
// In multiple files
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

**After:**

```typescript
// Only in shared-schemas/src/auth.schemas.ts
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// In your components
import { loginSchema, type LoginInput } from "@packages/shared-schemas";
```

## 🧪 Testing

Schemas should be tested to ensure validation works correctly:

```typescript
import { loginSchema } from "@packages/shared-schemas";

describe("loginSchema", () => {
  it("should validate correct login data", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "password123",
    });
    expect(result.success).toBe(false);
  });
});
```

## 📈 Roadmap

- [ ] Add OpenAPI schema generation
- [ ] Create validation middleware for Express
- [ ] Add custom validation rules
- [ ] Generate documentation from schemas
- [ ] Add internationalization for error messages

---

**Happy validating! 🛡️**
