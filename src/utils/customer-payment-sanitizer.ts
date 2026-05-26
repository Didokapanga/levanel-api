export const sanitizeCustomerPayment =
(
  payment: any
) => {

  return {

    id: payment.id,

    request_id:
      payment.request_id,

    payment_reference:
      payment.payment_reference,

    payment_method:
      payment.payment_method,

    payment_type:
      payment.payment_type,

    amount:
      payment.amount,

    currency:
      payment.currency,

    payment_date:
      payment.payment_date,

    observation:
      payment.observation,

    created_at:
      payment.created_at,
  };
};