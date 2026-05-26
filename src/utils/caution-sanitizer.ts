export const sanitizeCaution = (
  caution: any
) => {

  return {
    id: caution.id,

    contract_id:
      caution.contract_id,

    partner_name:
      caution.partner_name,

    contract_type:
      caution.contract_type,

    amount_initial:
      caution.amount_initial,

    amount_remaining:
      caution.amount_remaining,

    currency:
      caution.currency,

    deposited_at:
      caution.deposited_at,

    notes:
      caution.notes,

    is_active:
      caution.is_active,

    created_at:
      caution.created_at,

    updated_at:
      caution.updated_at,
  };
};