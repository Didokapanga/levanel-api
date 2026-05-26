import { z } from 'zod';

export const createAirlineSchema =
  z.object({

    code: z
      .string()
      .min(2)
      .max(10),

    name: z
      .string()
      .min(2),

    logo: z
      .string()
      .optional(),

    country: z
      .string()
      .optional(),
});

export const updateAirlineSchema =
  createAirlineSchema.partial();