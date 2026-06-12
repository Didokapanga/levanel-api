import { z } from 'zod';

export const createItemModificationSchema =
  z.object({

    modification_fee:
      z.number()
        .min(0),

    debit_balance:
      z.number()
        .min(0),

    customer_name:
      z.string()
        .min(2)
        .optional(),

    route:
      z.string()
        .optional(),

    travel_class:
      z.string()
        .optional(),

    departure_date:
      z.string()
        .optional(),

    notes:
      z.string()
        .optional(),
  });