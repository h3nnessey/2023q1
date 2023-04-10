import pets from '../../data/pets.js';
import { shuffle } from '../../js/helpers/index.js';

const slider = document.querySelector('.pets-slider__track');
let cardsContainer = document.querySelector('.pets-cards');
const nextBtn = document.querySelector('.pets-slider-btn__right');
const prevBtn = document.querySelector('.pets-slider-btn__left');
const btns = [nextBtn, prevBtn];
const root = document.querySelector(':root');

const idPool = shuffle(pets.map(pet => pet.id));

let state = {
  previous: [],
  current: [],
  next: [],
};

const getCardsCount = () => {
  const windowWidth = window.innerWidth;
  if (windowWidth > 1279) {
    root.style.setProperty('--slider-left-initial', '-109%');
    root.style.setProperty('--slider-left-end', '-218%');
    return 3;
  }
  if (windowWidth >= 768 && windowWidth <= 1279) {
    root.style.setProperty('--slider-left-initial', '-107%');
    root.style.setProperty('--slider-left-end', '-214%');
    return 2;
  }
  if (windowWidth <= 767) {
    root.style.setProperty('--slider-left-initial', '-102%');
    root.style.setProperty('--slider-left-end', '-206%');
    return 1;
  }
};

let cardsCount = getCardsCount();

const initState = () => {
  state.previous = shuffle(idPool.slice(0, cardsCount));
  state.current = getRandomIdsWhichAreNotInCollection(state.previous);
  state.next = getRandomIdsWhichAreNotInCollection(state.current);
};

const initSlider = () => {
  initState();
  renderCards(cardsContainer);
  cardsContainer.addEventListener('animationend', rerenderCards);
};

const rerenderSlider = () => {
  initState();
  cardsContainer.innerHTML = '';
  renderCards(cardsContainer);
};

const renderCards = container => {
  for (const array in state) {
    state[array].forEach(id => {
      const pet = pets.find(pet => pet.id === id);
      container.insertAdjacentElement('beforeend', createCardTemplate(pet));
    });
  }
};

const createCardTemplate = obj => {
  const div = document.createElement('div');
  const cardContent = `
    <div class="pet-card__image-wrapper">
      <img src="${obj.img}" alt="${obj.type}" class="pet-card__image" />
    </div>
    <h3 class="pet-card__title">${obj.name}</h3>
    <button class="pet-card__action">Learn more</button>
  `;
  div.classList.add('pets-cards__item', 'pet-card');
  div.dataset.id = obj.id;
  div.insertAdjacentHTML('afterbegin', cardContent);
  return div;
};

const rerenderCards = () => {
  const newCardsContainer = document.createElement('div');
  newCardsContainer.classList.add('pets__cards', 'pets-cards');
  renderCards(newCardsContainer);
  cardsContainer.replaceWith(newCardsContainer);
  btns.forEach(btn => (btn.disabled = false));
};

const addSliderAnimation = direction => {
  cardsContainer.style.animation = `0.4s ease 0s 1 forwards slide-to-${direction}`;
};

const getRandomIdsWhichAreNotInCollection = collection => {
  return shuffle(idPool.filter(id => !collection.includes(id))).slice(0, cardsCount);
};

const handleNextClick = () => {
  state.previous = state.current;
  state.current = state.next;
  state.next = getRandomIdsWhichAreNotInCollection(state.current);
  nextBtn.disabled = true;
  addSliderAnimation('right');
};

const handlePrevClick = () => {
  state.next = state.current;
  state.current = state.previous;
  state.previous = getRandomIdsWhichAreNotInCollection(state.current);
  prevBtn.disabled = true;
  addSliderAnimation('left');
};

const mutationCallback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      cardsContainer.removeEventListener('animationend', rerenderCards);
      cardsContainer = document.querySelector('.pets-cards');
      cardsContainer.addEventListener('animationend', rerenderCards);
    }
  });
};

const mutationObserver = new MutationObserver(mutationCallback);

mutationObserver.observe(slider, {
  childList: true,
});

initSlider();

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);

window.addEventListener('resize', () => {
  const howMuchCardsShouldBe = getCardsCount();
  if (cardsCount !== howMuchCardsShouldBe) {
    cardsCount = howMuchCardsShouldBe;
    rerenderSlider();
  }
});

// todo: no repeat cards in prev and next, add min-width/min-height to pet image for prevent blinking, fix shadows (its hidden at Y-axis rn), refactor a whole file
// write fetch for get pets
// вынести в отдельный файл/файлы логику функции типа крейтов карточки и рандомайзера
