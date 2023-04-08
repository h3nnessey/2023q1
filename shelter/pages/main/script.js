import pets from '../../data/pets.json' assert { type: 'json' };
import { shuffle } from '../../js/helpers';

const cards = document.querySelectorAll('.pet-card');
const nextBtn = document.querySelector('.pets-slider-btn__right');
const prevBtn = document.querySelector('.pets-slider-btn__left');

const petsId = shuffle(pets.map(pet => pet.id));
const cardsOnScreenCount = Array.from(cards).reduce(
  (acc, curr) => (window.getComputedStyle(curr).display === 'none' ? acc : acc + 1),
  0
);

let { previous, current, next } = {
  previous: [],
  current: [],
  next: [],
};

// сделать чтобы пред и след слайды никогда не повторялись
// сделать генерацию от кол-ва карточек на экране (считалка через редьюс на ресайзе с замыканием)
// сделать адаптивность для верстки после добавления слайдер трека

const initRandomIds = () => {
  previous = petsId.slice(0, 3);
  current = shuffle(petsId.filter(id => !previous.includes(id))).slice(0, 3);
  next = shuffle(petsId.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next, 'initial');
};

const handleNextClick = () => {
  previous = current;
  current = next;
  next = shuffle(petsId.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next, 'next');
};

const handlePrevClick = () => {
  next = current;
  current = previous;
  previous = shuffle(petsId.filter(id => !current.includes(id))).slice(0, 3);
  console.log(previous, current, next, 'prev');
};

initRandomIds();

nextBtn.addEventListener('click', handleNextClick);
prevBtn.addEventListener('click', handlePrevClick);
