export const generateRequestReference =
() => {

  const random =
    Math.floor(
      1000 + Math.random() * 9000
    );

  return `SR-${Date.now()}-${random}`;
};