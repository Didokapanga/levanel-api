export const generateItemReference =
() => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `ITEM-${Date.now()}-${random}`;
};