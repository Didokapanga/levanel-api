import { z } from 'zod';

export const createPartnerSchema =
  z.object({

    name: z
      .string()
      .min(2),

    type: z
      .enum(['agency', 'company']),

    // phone: z
    //   .string()
    //   .optional(),

    // email: z
    //   .string()
    //   .email()
    //   .optional()
    //   .or(z.literal('')),

    // address: z
    //   .string()
    //   .optional(),

});

export const updatePartnerSchema =
  createPartnerSchema.partial();