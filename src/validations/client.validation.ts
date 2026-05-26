import { z } from 'zod';

export const createClientSchema = z.object({
  name: z
    .string()
    .min(2, 'Name is required'),

  client_type: z
    .enum(['individual', 'company']),

  phone: z
    .string()
    .optional(),

  email: z
    .string()
    .email('Invalid email')
    .optional()
    .or(z.literal('')),

  address: z
    .string()
    .optional(),

  contact_person: z
    .string()
    .optional(),

  tax_number: z
    .string()
    .optional(),
});

export const updateClientSchema =
  createClientSchema.partial();