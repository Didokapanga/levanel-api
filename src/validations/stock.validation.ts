import { z } from 'zod';

export const createStockSchema =
  z.object({

    contract_id: z
      .uuid(),

    amount_initial: z
      .number()
      .positive(),

    currency: z
      .string()
      .default('USD')
      .optional(),

    purchased_at: z
      .string()
      .optional(),

    notes: z
      .string()
      .optional(),
});

export const updateStockSchema =
  z.object({

    amount_remaining: z
      .number()
      .optional(),

    notes: z
      .string()
      .optional(),
});