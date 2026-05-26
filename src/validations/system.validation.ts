import { z } from 'zod';

export const createSystemSchema =
  z.object({

    name: z
      .string()
      .min(2),

    initial: z
      .string()
      .min(2)
      .max(10),

    description: z
      .string()
      .optional(),
});

export const updateSystemSchema =
  createSystemSchema.partial();