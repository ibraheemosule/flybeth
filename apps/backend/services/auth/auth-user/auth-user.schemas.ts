import { z } from 'zod'

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional()
})

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export type UserRegisterRequest = z.infer<typeof userRegisterSchema>
export type UserLoginRequest = z.infer<typeof userLoginSchema>