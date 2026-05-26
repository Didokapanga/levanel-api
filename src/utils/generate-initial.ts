export const generateInitial = (
  name: string
) => {

  const words = name
    .trim()
    .split(' ')
    .filter(word => word.length > 0);

  let initial = '';

  if (words.length === 1) {

    initial = words[0]!
      .substring(0, 3);

  } else {

    initial = words
      .map(word => word.charAt(0))
      .join('');
  }

  return initial.toUpperCase();
};