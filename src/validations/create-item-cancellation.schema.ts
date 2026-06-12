import { z } from 'zod';

export const createItemCancellationSchema =
  z.object({

    airline_penalty:
      z.number()
        .min(0),

    cancellation_fee:
      z.number()
        .min(0),

    refund_amount:
      z.number()
        .min(0),

    notes:
      z.string()
        .optional(),
  });