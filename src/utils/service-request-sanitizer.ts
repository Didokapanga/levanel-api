export const sanitizeServiceRequest = (
  request: any
) => {

  return {

    id: request.id,

    request_reference:
      request.request_reference,

    client_id:
      request.client_id,

    client_name:
      request.client_name,

    service_id:
      request.service_id,

    service_name:
      request.service_name,

    partner_id:
      request.partner_id,

    partner_name:
      request.partner_name,

    contract_id:
      request.contract_id,

    request_type:
      request.request_type,

    status:
      request.status,

    total_amount:
      request.total_amount,

    amount_paid:
      request.amount_paid,

    remaining_amount:
      Number(request.total_amount)
      -
      Number(request.amount_paid),

    service_revenue:
      request.service_revenue,

    external_cost:
      request.external_cost,

    currency:
      request.currency,

    observation:
      request.observation,

    requested_at:
      request.requested_at,

    completed_at:
      request.completed_at,

    created_at:
      request.created_at,

    updated_at:
      request.updated_at,
  };
};