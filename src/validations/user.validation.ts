import { z } from 'zod';

export const createUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must contain at least 3 characters'),

  full_name: z
    .string()
    .min(3, 'Full name is required'),

  email: z
    .string()
    .email('Invalid email'),

  password: z
    .string()
    .min(6, 'Password must contain at least 6 characters'),

  role: z
    .enum(['admin', 'manager', 'accountant', 'agent'])
    .optional(),
});

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3)
    .optional(),

  full_name: z
    .string()
    .min(3)
    .optional(),

  email: z
    .string()
    .email()
    .optional(),

  password: z
    .string()
    .min(6)
    .optional(),

  role: z
    .enum(['admin', 'agent'])
    .optional(),

  is_active: z
    .boolean()
    .optional(),
});