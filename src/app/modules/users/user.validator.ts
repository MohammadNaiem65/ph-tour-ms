import z from 'zod';
import { IsActive, Role } from './user.interface';

export const createUserZodSchema = z.object({
    name: z
        .string({ error: 'Name must be string' })
        .trim()
        .min(2, { error: 'Name must be at least 2 characters long' })
        .max(20, { error: 'Name must be at most 20 characters long' }),
    email: z.email({ error: 'Invalid email address' }).trim(),
    password: z
        .string()
        .trim()
        .min(8, { error: 'The password must be at least 8 characters long' })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
                error: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
            }
        ),
    phone: z
        .string({ error: 'Phone Number must be string' })
        .trim()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message:
                'Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX',
        })
        .optional(),
    address: z
        .string({ error: 'Address must be string' })
        .trim()
        .max(200, { message: 'Address cannot exceed 200 characters.' })
        .optional(),
});

export const updateUserZodSchema = z.object({
    name: z
        .string({ error: 'Name must be string' })
        .trim()
        .min(2, { error: 'Name must be at least 2 characters long' })
        .max(20, { error: 'Name must be at most 20 characters long' })
        .optional(),
    password: z
        .string()
        .trim()
        .min(8, { error: 'The password must be at least 8 characters long' })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/,
            {
                error: 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
            }
        )
        .optional(),
    phone: z
        .string({ error: 'Phone Number must be string' })
        .trim()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message:
                'Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX',
        })
        .optional(),
    address: z
        .string({ error: 'Address must be string' })
        .trim()
        .max(200, { message: 'Address cannot exceed 200 characters.' })
        .optional(),
    isDeleted: z.boolean().optional(),
    isActive: z.enum(Object.values(IsActive)).optional(),
    isVerified: z.boolean().optional(),
    role: z.enum(Object.values(Role)).optional(),
});
