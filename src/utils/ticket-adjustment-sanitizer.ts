export const sanitizeTicketAdjustment =
(
  adjustment: any
) => {

  return {

    id:
      adjustment.id,

    item_id:
      adjustment.item_id,

    adjustment_reference:
      adjustment.adjustment_reference,

    adjustment_type:
      adjustment.adjustment_type,

    adjustment_status:
      adjustment.adjustment_status,

    airline_fee:
      adjustment.airline_fee,

    agency_fee:
      adjustment.agency_fee,

    refund_amount:
      adjustment.refund_amount,

    new_debit_balance:
      adjustment.new_debit_balance,

    notes:
      adjustment.notes,

    created_at:
      adjustment.created_at,
  };
};