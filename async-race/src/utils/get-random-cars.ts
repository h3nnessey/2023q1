import { ICar } from '../types';

const getRandomHexValue = () =>
  Math.floor(Math.random() * 255)
    .toString(16)
    .padStart(2, '0');

const getRandomColor = (): string => {
  const r = getRandomHexValue();
  const g = getRandomHexValue();
  const b = getRandomHexValue();

  return `#${r}${g}${b}`;
};

const shuffleArray = (array: string[]): string[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const brands: string[] = [
  'Tesla',
  'Porsche',
  'Toyota',
  'Mazda',
  'Mercedes',
  'Lamborghini',
  'Ford',
  'Nissan',
  'Audi',
  'Dodge',
];
const models: string[] = [
  'Model S',
  '911',
  'Supra',
  'CX-9',
  'AMG GT',
  'Huracan',
  'Raptor',
  'Skyline',
  'R8',
  'Challenger',
];

export const getRandomCars = (): Omit<ICar, 'id'>[] => {
  const shuffledBrands: string[] = shuffleArray(
    Array(100)
      .fill(null)
      .map((_, index) => brands[index % brands.length])
  );

  const shuffledModels: string[] = shuffleArray(
    Array(100)
      .fill(null)
      .map((_, index) => models[index % models.length])
  );

  const initial: Omit<ICar, 'id'>[] = [];

  return shuffledBrands.reduce((acc, curr, index) => {
    const car = {
      name: `${curr} ${shuffledModels[index]}`,
      color: getRandomColor(),
    };

    return [...acc, car];
  }, initial);
};
