import { getPets, shuffle } from '../helpers/index.js';

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

const getNoRepeatIdsBetweenPages = initialArray => {
  const result = [initialArray];
  for (let i = 0; i < 6; i += 1) {
    while (result.length !== 6) {
      const prevArr = result.at(-1);
      const shuffledInitialArray = shuffle(initialArray);
      let isNoRepeatIdsAtSamePosition = false;
      while (isNoRepeatIdsAtSamePosition !== true) {
        const shuffledArr = shuffle(shuffledInitialArray);
        const mappedShuffledArrAgain = shuffledArr.map((id, i) => prevArr[i] !== id);
        isNoRepeatIdsAtSamePosition = mappedShuffledArrAgain.every(item => item === true);
        if (isNoRepeatIdsAtSamePosition) {
          result.push(shuffledArr);
        }
      }
    }
  }
  return result;
};

const getArrayOfRandomIds = idPool => {
  const shuffledIdPool = shuffle(idPool);
  const firstThree = shuffledIdPool.slice(0, 3);
  const secondThree = shuffledIdPool.slice(3, 6);
  const rest = shuffledIdPool.slice(6, 8);
  const firstThreeResult = getNoRepeatIdsBetweenPages(firstThree);
  const secondThreeResult = getNoRepeatIdsBetweenPages(secondThree);
  const restResult = getNoRepeatIdsBetweenPages(rest);
  const result = Array(6)
    .fill(null)
    .map((_, i) => {
      return [...firstThreeResult[i], ...secondThreeResult[i], ...restResult[i]].flat();
    })
    .flat();
  console.log(result);
  return result;
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
