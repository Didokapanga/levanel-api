export const sanitizeStock = (
  stock: any
) => {

  return {
    id: stock.id,

    contract_id:
      stock.contract_id,

    partner_name:
      stock.partner_name,

    contract_type:
      stock.contract_type,

    amount_initial:
      stock.amount_initial,

    amount_remaining:
      stock.amount_remaining,

    currency:
      stock.currency,

    purchased_at:
      stock.purchased_at,

    notes:
      stock.notes,

    is_active:
      stock.is_active,

    created_at:
      stock.created_at,

    updated_at:
      stock.updated_at,
  };
};