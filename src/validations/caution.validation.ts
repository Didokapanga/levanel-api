import { z } from 'zod';

export const createCautionSchema =
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

    deposited_at: z
      .string()
      .optional(),

    notes: z
      .string()
      .optional(),
});

export const updateCautionSchema =
  z.object({

    amount_remaining: z
      .number()
      .optional(),

    notes: z
      .string()
      .optional(),

    is_active: z
      .boolean()
      .optional(),
});