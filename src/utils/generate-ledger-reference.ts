export const generateLedgerReference =
() => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `LED-${Date.now()}-${random}`;
};