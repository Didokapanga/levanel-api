export const sanitizeLedger =
(
  entry: any
) => {

  return {

    id: entry.id,

    ledger_reference:
      entry.ledger_reference,

    request_id:
      entry.request_id,

    item_id:
      entry.item_id,

    payment_id:
      entry.payment_id,

    service_id:
      entry.service_id,

    partner_id:
      entry.partner_id,

    client_id:
      entry.client_id,

    contract_id:
      entry.contract_id,

    source_module:
      entry.source_module,

    operation_type:
      entry.operation_type,

    entry_type:
      entry.entry_type,

    direction:
      entry.direction,

    amount:
      entry.amount,

    currency:
      entry.currency,

    description:
      entry.description,

    operation_date:
      entry.operation_date,

    created_at:
      entry.created_at,
  };
};