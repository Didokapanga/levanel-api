import { z } from 'zod';

export const createServiceRequestItemSchema =
  z.object({

    request_id: z
      .uuid(),

    item_type: z
      .string(),

    customer_name: z
      .string()
      .min(2),

    airline_id: z
      .uuid()
      .optional(),

    system_id: z
      .uuid()
      .optional(),

    ticket_number: z
      .string()
      .optional(),

    pnr: z
      .string()
      .optional(),

    route: z
      .string()
      .optional(),

    travel_class: z
      .string()
      .optional(),

    departure_date: z
      .string()
      .optional(),

    issued_at: z
      .string()
      .optional(),

    tht_amount: z
      .number()
      .default(0),

    tax_amount: z
      .number()
      .default(0),

    partner_service_fee: z
      .number()
      .default(0),

    service_fee: z
      .number()
      .default(0),

    cancellation_fee: z
      .number()
      .default(0),

    modification_fee: z
      .number()
      .default(0),

    commission_amount: z
      .number()
      .default(0),

    notes: z
      .string()
      .optional(),
});

export const updateServiceRequestItemSchema =
  z.object({

    customer_name:
      z.string().optional(),

    route:
      z.string().optional(),

    travel_class:
      z.string().optional(),

    departure_date:
      z.string().optional(),

    notes:
      z.string().optional(),
  });
// export const updateServiceRequestItemSchema =
//   createServiceRequestItemSchema.partial();