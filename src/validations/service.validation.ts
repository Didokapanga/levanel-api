import { z } from 'zod';

export const createServiceSchema =
  z.object({

    name: z
      .string()
      .min(2),

    description: z
      .string()
      .optional(),

    color: z
      .string()
      .optional(),

    icon: z
      .string()
      .optional(),
});

export const updateServiceSchema =
  createServiceSchema.partial();