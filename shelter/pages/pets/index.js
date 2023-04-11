import '../../js/burger-menu.js';
import '../../js/overlay.js';
import { createCardTemplate, getPets } from '../../js/helpers/index.js';
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

const pets = await getPets('../../data/pets.json');
const idPool = pets.map(pet => pet.id);
const arrayOfRandomIds = getArrayOfRandomIds(idPool);
const arrayOfPetsObjects = arrayOfRandomIds.map(id => pets.find(pet => pet.id === id));

let currentPage, cardsCount, pages, pagesCount;

const initPagination = () => {
  currentPage = 1;
  cardsCount = getCardsCount();
  pagesCount = getPagesCount();
  pages = getPagesFromFlatArray(arrayOfPetsObjects, cardsCount);
  renderPage(pages[0], true);

  nextBtn.addEventListener('click', handleNextClick);
  prevBtn.addEventListener('click', handlePrevClick);
  lastBtn.addEventListener('click', handleLastClick);
  firstBtn.addEventListener('click', handleFirstClick);

  window.addEventListener('resize', () => {
    const howMuchCardsShouldBe = getCardsCount();
    const howMuchPagesShouldBe = getPagesCount();

    if (cardsCount !== howMuchCardsShouldBe || pagesCount !== howMuchPagesShouldBe) {
      cardsCount = howMuchCardsShouldBe;
      pagesCount = howMuchPagesShouldBe;
      rerenderPagination();
    }
  });
};

const rerenderPagination = () => {
  pages = getPagesFromFlatArray(arrayOfPetsObjects, cardsCount);
  if (currentPage > pages.length) {
    currentPage = pages.length;
  }
  renderPage(pages[currentPage - 1]);
};

const renderPage = (page, initial) => {
  const renderCard = card => {
    petsContainer.insertAdjacentElement('beforeend', createCardTemplate(card));
  };
  if (typeof initial === 'boolean' && initial) {
    page.forEach(object => renderCard(object));
  } else {
    petsContainer.innerHTML = '';
    page.forEach(object => renderCard(object));
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

initPagination();
