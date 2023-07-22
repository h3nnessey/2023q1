const getRandomHexValue = () =>
  Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');

export const getRandomColor = (): string => {
  const r = getRandomHexValue();
  const g = getRandomHexValue();
  const b = getRandomHexValue();

  return `#${r}${g}${b}`;
};
