import pets from '../../data/pets.json' assert { type: 'json' };
import { shuffle } from '../../js/helpers/index.js';

const cardsContainer = document.querySelector('.pets-cards');
const cards = document.querySelectorAll('.pet-card');
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
  cardsContainer.innerHTML = '';
  state.previous.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });
  state.current.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });
  state.current.forEach(id => {
    const pet = pets.find(pet => pet.id === id);
    cardsContainer.insertAdjacentElement('beforeend', createCardTemplate(pet));
  });
};

// сделать чтобы пред и след слайды никогда не повторялись
// min-height/width для картинок (превент прыжков)

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

const rerenderCards = () => {};

const handleNextClick = () => {
  state.previous = state.current;
  state.current = state.next;
  state.next = shuffle(petsId.filter(id => !state.current.includes(id))).slice(0, 3);
  console.log(state.previous, state.current, state.next, 'next');
  // initSlider();
  cardsContainer.style.left = '-182%';
};

const handlePrevClick = () => {
  state.next = state.current;
  state.current = state.previous;
  state.previous = shuffle(petsId.filter(id => !state.current.includes(id))).slice(0, 3);
  console.log(state.previous, state.current, state.next, 'prev');
  cardsContainer.style.left = '0';
};

initRandomIds();
initSlider();

cardsContainer.addEventListener('transitionend', () => {
  console.log(window.getComputedStyle(cardsContainer).width);
});

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
