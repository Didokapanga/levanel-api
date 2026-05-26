export const generateAdjustmentReference =
() => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `ADJ-${Date.now()}-${random}`;
};