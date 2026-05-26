export const sanitizeLedgerEntry = (
  entry: any
) => {

  return {
    id: entry.id,

    service_name:
      entry.service_name,

    source_module:
      entry.source_module,

    operation_reference:
      entry.operation_reference,

    operation_type:
      entry.operation_type,

    direction:
      entry.direction,

    amount:
      entry.amount,

    currency:
      entry.currency,

    partner_name:
      entry.partner_name,

    client_name:
      entry.client_name,

    description:
      entry.description,

    created_at:
      entry.created_at,
  };
};