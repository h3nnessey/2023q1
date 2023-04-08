import { shuffle } from '../helpers';

const getCardsCount = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768) {
    return 8;
  }
  if (windowWidth > 320 && windowWidth <= 768) {
    return 6;
  }
  if (windowWidth <= 320) {
    return 3;
  }
};

const getPagesCount = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 768) {
    return 6;
  }
  if (windowWidth > 320 && windowWidth <= 768) {
    return 8;
  }
  if (windowWidth <= 320) {
    return 16;
  }
};

const getArrayOfRandomIds = idPool => {
  const shuffledIdPool = shuffle(idPool);
  const partials = [shuffledIdPool.slice(0, 3), shuffledIdPool.slice(3, 6), shuffledIdPool.slice(6, 8)];
  return Array(6)
    .fill(null)
    .map(() => partials.map(partial => shuffle(partial)).flat())
    .flat();
};

const getPagesFromFlatArray = (array, size) => {
  const pages = [];
  for (let i = 0; i < array.length; i += size) {
    const page = array.slice(i, i + size);
    pages.push(page);
  }
  return pages;
};

export { getPagesFromFlatArray, getArrayOfRandomIds, getPagesCount, getCardsCount };
