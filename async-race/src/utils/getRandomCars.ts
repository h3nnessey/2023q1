import { ICar } from '../types';
import { shuffleArray } from './shuffleArray';
import { getRandomColor } from './get-random-color';

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
      .map(() => brands[Math.floor(Math.random() * brands.length)])
  );

  const shuffledModels: string[] = shuffleArray(
    Array(100)
      .fill(null)
      .map(() => models[Math.floor(Math.random() * models.length)])
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
