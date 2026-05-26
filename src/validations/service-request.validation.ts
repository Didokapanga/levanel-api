import { z } from 'zod';

export const createServiceRequestSchema =
  z.object({

    client_id: z
      .uuid(),

    service_id: z
      .uuid(),

    partner_id: z
      .uuid()
      .optional(),

    contract_id: z
      .uuid()
      .optional(),

    request_type: z
      .string()
      .min(2),

    currency: z
      .string()
      .default('USD')
      .optional(),

    observation: z
      .string()
      .optional(),
});

export const updateServiceRequestSchema =
  z.object({

    status: z
      .enum([
        'pending',
        'confirmed',
        'completed',
        'cancelled'
      ])
      .optional(),

    observation: z
      .string()
      .optional(),

    completed_at: z
      .string()
      .optional(),
});