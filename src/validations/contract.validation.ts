import { z } from 'zod';

export const createContractSchema =
  z.object({

    partner_id: z
      .uuid(),

    contract_type: z
      .enum([
        'caution_only',
        'caution_stock',
        'agency'
      ]),

    status: z
      .enum([
        'active',
        'expired',
        'suspended',
        'terminated'
      ])
      .optional(),

    start_date: z
      .string()
      .optional(),

    end_date: z
      .string()
      .optional(),

    description: z
      .string()
      .optional(),
});

export const updateContractSchema =
  createContractSchema.partial();