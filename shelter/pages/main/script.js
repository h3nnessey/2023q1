import pets from '../../data/pets.js';
import { shuffle } from '../../js/helpers/index.js';

let cardsContainer = document.querySelector('.pets-cards');
const nextBtn = document.querySelector('.pets-slider-btn__right');
const prevBtn = document.querySelector('.pets-slider-btn__left');

const petsId = shuffle(pets.map(pet => pet.id));

let state = {
  previous: [],
  current: [],
  next: [],
};

const initRandomIds = () => {
  state.previous = petsId.slice(0, 3);
  state.current = shuffle(petsId.filter(id => !state.previous.includes(id))).slice(0, 3);
  state.next = shuffle(petsId.filter(id => !state.current.includes(id))).slice(0, 3);
  console.log(state.previous, state.current, state.next, 'initial');
};

const initSlider = () => {
  state.previous.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });
  state.current.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });
  state.next.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });

  cardsContainer.addEventListener('animationend', () => {
    rerenderCards();
  });
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

  state.previous.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    newCardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });

  state.current.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    newCardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });

  state.next.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    newCardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });

  cardsContainer.replaceWith(newCardsContainer);
};

const handleNextClick = () => {
  state.previous = state.current;
  state.current = state.next;
  state.next = shuffle(petsId.filter(id => !state.current.includes(id))).slice(0, 3);
  console.log(state.previous, state.current, state.next, 'next');

  cardsContainer.style.animation = '0.4s ease-in-out 0s 1 forwards slide-to-right';
};

const handlePrevClick = () => {
  state.next = state.current;
  state.current = state.previous;
  state.previous = shuffle(petsId.filter(id => !state.current.includes(id))).slice(0, 3);
  console.log(state.previous, state.current, state.next, 'prev');

  cardsContainer.style.animation = '0.4s ease-in-out 0s 1 forwards slide-to-left';
};

initRandomIds();
initSlider();

// for the first rerender when link to dom element is correct
cardsContainer.addEventListener('animationend', rerenderCards);

const mutationTarget = document.querySelector('.pets-slider__track');

const mutationConfig = {
  childList: true,
};

const mutationCallback = (mutationsList, observer) => {
  mutationsList.forEach(mutation => {
    if (mutation.type === 'childList') {
      cardsContainer.removeEventListener('animationend', rerenderCards);
      cardsContainer = document.querySelector('.pets-cards');
      cardsContainer.addEventListener('animationend', () => {
        rerenderCards();
      });
    }
  });
};
const mutationObserver = new MutationObserver(mutationCallback);

mutationObserver.observe(mutationTarget, mutationConfig);

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);

// todo: no repeat cards in prev and next, add min-width/min-height to pet image for prevent blinking, fix shadows (its hidden at Y-axis rn), refactor a whole file
