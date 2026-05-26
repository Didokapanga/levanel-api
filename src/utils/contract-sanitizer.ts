export const sanitizeContract = (
  contract: any
) => {

  return {
    id: contract.id,

    partner_id: contract.partner_id,

    contract_type:
      contract.contract_type,

    status: contract.status,

    start_date:
      contract.start_date,

    end_date:
      contract.end_date,

    description:
      contract.description,

    is_active:
      contract.is_active,

    created_at:
      contract.created_at,

    updated_at:
      contract.updated_at,
  };
};