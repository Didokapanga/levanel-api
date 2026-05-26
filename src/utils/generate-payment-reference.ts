export const generatePaymentReference =
() => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `PAY-${Date.now()}-${random}`;
};