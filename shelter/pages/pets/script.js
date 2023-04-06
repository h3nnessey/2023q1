import '../../js/burger.js';
import pets from '../../data/pets.json' assert { type: 'json' };
import { createCardTemplate, shuffle, getPagesAndCardsCount } from '../../js/helpers/';

const petsContainer = document.querySelector('.pets-cards');
const nextBtn = document.querySelector('.btn-next');
const lastBtn = document.querySelector('.btn-last');
const prevBtn = document.querySelector('.btn-prev');
const firstBtn = document.querySelector('.btn-first');
const pageCounter = document.querySelector('.pets-controls__counter');
let currentPage = 1;

const generateArraysOfRandomIds = (subArraySize, arrLength) => {
  const size = 6;
  const result = [shuffle([1, 2, 3, 4, 5, 6, 7, 8])];
  const ids = [1, 2, 3, 4, 5, 6, 7, 8];

  for (let i = 1; i <= size; i += 1) {
    while (result.length !== 6) {
      let shuffledArr = shuffle(ids);
      let isNoRepeatInResult = result.every(item => item.toString() !== shuffledArr.toString());
      if (isNoRepeatInResult) {
        const prevArr = result.at(-1);
        let isNoIdsAtSamePosition = false;
        while (isNoIdsAtSamePosition !== true) {
          let shuffledArrAgain = shuffle(shuffledArr);
          const mappedShuffledArrAgain = shuffledArrAgain.map((id, i) => prevArr[i] !== id);
          isNoIdsAtSamePosition = mappedShuffledArrAgain.every(item => item === true);
          if (isNoIdsAtSamePosition) {
            result.push(shuffledArrAgain);
          }
        }
      }
    }
  }
  return result;
};

const randomPetsIdsForEachPage = generateArraysOfRandomIds();

console.log(randomPetsIdsForEachPage);

const toggleBtns = () => {
  firstBtn.disabled = false;
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  lastBtn.disabled = false;
  if (currentPage >= 6) {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  }
  if (currentPage <= 1) {
    firstBtn.disabled = true;
    prevBtn.disabled = true;
  }
};

const handleNextClick = () => {
  currentPage++;
  toggleBtns();
  randomPetsIdsForEachPage[currentPage - 1].forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.childNodes[idx].replaceWith(petCard);
  });
  pageCounter.textContent = currentPage.toString();
};

const handleLastClick = () => {
  currentPage = 6;
  toggleBtns();
  randomPetsIdsForEachPage[currentPage - 1].forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.childNodes[idx].replaceWith(petCard);
  });
  pageCounter.textContent = currentPage.toString();
};

const handlePrevClick = () => {
  currentPage--;
  toggleBtns();
  randomPetsIdsForEachPage[currentPage - 1].forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.childNodes[idx].replaceWith(petCard);
  });
  pageCounter.textContent = currentPage.toString();
};
const handleFirstClick = () => {
  currentPage = 1;
  toggleBtns();
  randomPetsIdsForEachPage[currentPage - 1].forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.childNodes[idx].replaceWith(petCard);
  });
  pageCounter.textContent = currentPage.toString();
};

window.onload = function () {
  randomPetsIdsForEachPage[0].forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.insertAdjacentElement('beforeend', petCard);
  });
  toggleBtns();
};

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
lastBtn.addEventListener('click', handleLastClick);
firstBtn.addEventListener('click', handleFirstClick);
