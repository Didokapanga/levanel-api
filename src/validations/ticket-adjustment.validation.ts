import { z }
from 'zod';

export const createTicketAdjustmentSchema =
  z.object({

    item_id:
      z.string().uuid(),

    adjustment_type:
      z.enum([
        'modification',
        'cancellation'
      ]),

    airline_fee:
      z.number()
      .min(0)
      .default(0),

    agency_fee:
      z.number()
      .min(0)
      .default(0),

    refund_amount:
      z.number()
      .min(0)
      .default(0),

    new_debit_balance:
      z.number()
      .min(0)
      .default(0),

    notes:
      z.string()
      .optional(),
  });

  export const updateTicketAdjustmentSchema =
  z.object({

    airline_fee:
      z.number()
      .min(0)
      .optional(),

    agency_fee:
      z.number()
      .min(0)
      .optional(),

    refund_amount:
      z.number()
      .min(0)
      .optional(),

    new_debit_balance:
      z.number()
      .min(0)
      .optional(),

    notes:
      z.string()
      .optional(),
  });