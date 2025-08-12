import z from "zod";
import { AuthProviders, IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be a string" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(50, { message: "Name must be at most 50 characters long" }),
  email: z.email({ error: "Email must be a valid email address" }).trim(),
  password: z
    .string({ error: "Password must be a string" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password must be at most 50 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/, {
      error:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
    .optional(),
  phone: z
    .string({ error: "Phone must be a string" })
    .trim()
    .min(10, { message: "Phone must be at least 10 characters long" })
    .max(15, { message: "Phone must be at most 15 characters long" })
    .optional(),
  picture: z
    .string({ error: "Picture must be a string" })
    .trim()
    .min(3, { message: "Picture must be at least 3 characters long" })
    .max(50, { message: "Picture must be at most 50 characters long" })
    .optional(),
  address: z
    .string({ error: "Address must be a string" })
    .trim()
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(50, { message: "Address must be at most 50 characters long" })
    .optional(),
  isDeleted: z.boolean({ error: "isDeleted must be a boolean" }).default(false),
  isActive: z
    .enum(Object.values(IsActive), {
      error: "Invalid isActive value",
    })
    .default(IsActive.ACTIVE),
  isVerified: z
    .boolean({ error: "isVerified must be a boolean" })
    .default(false),
  role: z.enum(Object.values(Role), { error: "Invalid role value" }),
  auths: z.array(
    z.object({
      provider: z.enum(Object.values(AuthProviders), {
        error: "Invalid provider value",
      }),
      providerId: z.string({ error: "Provider ID must be a string" }),
    })
  ),
});
