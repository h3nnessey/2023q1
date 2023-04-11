import '../../js/burger-menu.js';
import '../../js/overlay.js';
import { createCardTemplate, shuffle } from '../../js/helpers/index.js';
import { getPets } from '../../js/helpers/getPets.js';
import { getCardsCount } from '../../js/slider-helpers/index.js';

const slider = document.querySelector('.pets-slider__track');
let cardsContainer = document.querySelector('.pets-cards');
const nextBtn = document.querySelector('.pets-slider-btn__right');
const prevBtn = document.querySelector('.pets-slider-btn__left');
const sliderButtons = [nextBtn, prevBtn];

const pets = await getPets('../../data/pets.json');
const petsPool = shuffle(pets);

let state = {
  previous: [],
  current: [],
  next: [],
};

let cardsCount = getCardsCount();

const getRandomPetsWhichAreNotInCollection = collection => {
  const collectionIds = collection.map(item => item.id);
  return shuffle(petsPool.filter(pet => !collectionIds.includes(pet.id))).slice(0, cardsCount);
};

const initState = () => {
  state.previous = shuffle(petsPool.slice(0, cardsCount));
  state.current = getRandomPetsWhichAreNotInCollection(state.previous);
  state.next = getRandomPetsWhichAreNotInCollection(state.current);
};

const initSlider = () => {
  initState();
  renderCards(cardsContainer);

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

  cardsContainer.addEventListener('animationend', rerenderCards);
  nextBtn.addEventListener('click', handleNextClick);
  prevBtn.addEventListener('click', handlePrevClick);

  window.addEventListener('resize', () => {
    const howMuchCardsShouldBe = getCardsCount();
    if (cardsCount !== howMuchCardsShouldBe) {
      cardsCount = howMuchCardsShouldBe;
      rerenderSlider();
    }
  });
};

const rerenderSlider = () => {
  initState();
  cardsContainer.innerHTML = '';
  renderCards(cardsContainer);
};

const renderCards = container => {
  for (const array in state) {
    state[array].forEach(card => {
      container.insertAdjacentElement('beforeend', createCardTemplate(card));
    });
  }
};

const rerenderCards = () => {
  const newCardsContainer = document.createElement('div');
  newCardsContainer.classList.add('pets__cards', 'pets-cards');
  renderCards(newCardsContainer);
  cardsContainer.replaceWith(newCardsContainer);
  sliderButtons.forEach(btn => (btn.disabled = false));
};

const addSliderAnimation = direction => {
  cardsContainer.style.animation = `0.4s ease 0s 1 forwards slide-to-${direction}`;
};

const handleNextClick = () => {
  state.previous = state.current;
  state.current = state.next;
  state.next = getRandomPetsWhichAreNotInCollection(state.current);
  nextBtn.disabled = true;
  addSliderAnimation('right');
};

const handlePrevClick = () => {
  state.next = state.current;
  state.current = state.previous;
  state.previous = getRandomPetsWhichAreNotInCollection(state.current);
  prevBtn.disabled = true;
  addSliderAnimation('left');
};

initSlider();
