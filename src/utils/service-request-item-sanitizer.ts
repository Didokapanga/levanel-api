export const sanitizeServiceRequestItem =
(
  item: any
) => {

  return {

    id: item.id,

    request_id:
      item.request_id,

    item_reference:
      item.item_reference,

    item_type:
      item.item_type,

    item_status:
      item.item_status,

    parent_item_id:
      item.parent_item_id,

    customer_name:
      item.customer_name,

    airline_id:
      item.airline_id,

    system_id:
      item.system_id,

    ticket_number:
      item.ticket_number,

    pnr:
      item.pnr,

    route:
      item.route,

    travel_class:
      item.travel_class,

    departure_date:
      item.departure_date,

    issued_at:
      item.issued_at,

    tht_amount:
      item.tht_amount,

    tax_amount:
      item.tax_amount,

    partner_service_fee:
      item.partner_service_fee,

    service_fee:
      item.service_fee,

    cancellation_fee:
      item.cancellation_fee,

    modification_fee:
      item.modification_fee,

    commission_amount:
      item.commission_amount,

    airline_penalty:
      item.airline_penalty,

    refund_amount:
      item.refund_amount,

    ttc_amount:
      item.ttc_amount,

    debit_balance:
      item.debit_balance,

    notes:
      item.notes,

    created_at:
      item.created_at,
  };
};