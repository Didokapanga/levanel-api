import { z } from 'zod';

export const createCustomerPaymentSchema =
  z.object({

    request_id: z
      .uuid(),

    payment_method: z
      .string()
      .min(2),

    payment_type: z
      .enum([
        'payment',
        'refund',
        'adjustment'
      ]),

    amount: z
      .number()
      .positive(),

    currency: z
      .string()
      .default('USD')
      .optional(),

    observation: z
      .string()
      .optional(),
});

export const updateCustomerPaymentSchema =
  createCustomerPaymentSchema.partial();