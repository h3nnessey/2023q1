import '../../js/burger-menu.js';
import '../../js/overlay.js';
import pets from '../../data/pets.js';
import { createCardTemplate } from '../../js/helpers/index.js';
import {
  getArrayOfRandomIds,
  getCardsCount,
  getPagesCount,
  getPagesFromFlatArray,
} from '../../js/pagination-helpers/index.js';

const petsContainer = document.querySelector('.pets-cards');
const pageCounter = document.querySelector('.pets-controls__counter');
const nextBtn = document.querySelector('.btn-next');
const lastBtn = document.querySelector('.btn-last');
const prevBtn = document.querySelector('.btn-prev');
const firstBtn = document.querySelector('.btn-first');

const idPool = pets.reduce((acc, curr) => [...acc, curr.id], []);
const arrayOfRandomIds = getArrayOfRandomIds(idPool);

let currentPage, cardsCount, pages, pagesCount;

const initPagination = () => {
  currentPage = 1;
  cardsCount = getCardsCount();
  pagesCount = getPagesCount();
  pages = getPagesFromFlatArray(arrayOfRandomIds, cardsCount);
  renderPage(pages[0], true);
};

const rerenderPagination = () => {
  currentPage = 1;
  pages = getPagesFromFlatArray(arrayOfRandomIds, cardsCount);
  renderPage(pages[0]);
};

const renderPage = (pageIds, initial) => {
  const renderCard = id => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = createCardTemplate(pet);
    petsContainer.insertAdjacentElement('beforeend', petCard);
  };
  if (typeof initial === 'boolean' && initial) {
    pageIds.forEach(id => renderCard(id));
  } else {
    petsContainer.innerHTML = '';
    pageIds.forEach(id => renderCard(id));
  }
  toggleButtons();
  pageCounter.textContent = currentPage.toString();
};

const toggleButtons = () => {
  firstBtn.disabled = false;
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  lastBtn.disabled = false;
  if (currentPage >= pagesCount) {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  }
  if (currentPage <= 1) {
    firstBtn.disabled = true;
    prevBtn.disabled = true;
  }
};
const handleClick = () => {
  renderPage(pages[currentPage - 1]);
  toggleButtons();
};
const handleNextClick = () => {
  currentPage++;
  handleClick();
};
const handleLastClick = () => {
  currentPage = pagesCount;
  handleClick();
};
const handlePrevClick = () => {
  currentPage--;
  handleClick();
};
const handleFirstClick = () => {
  currentPage = 1;
  handleClick();
};

window.onload = initPagination;

// feature for more flexible breakpoints (not static)
window.addEventListener('resize', () => {
  const howMuchCardsShouldBe = getCardsCount();
  const howMuchPagesShouldBe = getPagesCount();

  if (cardsCount !== howMuchCardsShouldBe || pagesCount !== howMuchPagesShouldBe) {
    cardsCount = howMuchCardsShouldBe;
    pagesCount = howMuchPagesShouldBe;
    rerenderPagination();
  }
});

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
lastBtn.addEventListener('click', handleLastClick);
firstBtn.addEventListener('click', handleFirstClick);

// todo: если текущая страница существует при ререндере, то оставлять ее, если она больше - кидать на последнюю
