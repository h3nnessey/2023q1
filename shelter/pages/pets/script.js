import './burger.js';
import { fetchPets } from '../../js/fetchPets.js';

const pets = await fetchPets();

const shuffle = iterator => {
  const iteratorCopy = [...iterator];
  return iteratorCopy.sort((a, b) => 0.5 - Math.random());
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// {
//   "id": "1",
//   "name": "Jennifer",
//   "img": "../../assets/images/jennifer.png",
//   "type": "Dog",
//   "breed": "Labrador",
//   "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
//   "age": "2 months",
//   "inoculations": ["none"],
//   "diseases": ["none"],
//   "parasites": ["none"]
// }

function cardTemplate(card) {
  const div = document.createElement('div');
  const cardContent = `
    <div class="pet-card__image-wrapper">
      <img src="${card.img}" alt="${card.type}" class="pet-card__image" />
    </div>
    <h3 class="pet-card__title">${card.name}</h3>
    <button class="pet-card__action">Learn more</button>
  `;

  div.classList.add('pets-cards__item', 'pet-card');
  div.dataset.id = card.id;
  div.insertAdjacentHTML('afterbegin', cardContent);

  return div;
}

const petsContainer = document.querySelector('.pets-cards');
const nextBtn = document.querySelector('.btn-next');
const lastBtn = document.querySelector('.btn-last');
const pageCounter = document.querySelector('.pets-controls__counter');
let currentPage = 1;
pageCounter.textContent = currentPage.toString();

const handleNextClick = () => {
  const shuffledIds = shuffle(arr).map(item => item.toString());
  shuffledIds.forEach((id, idx) => {
    const pet = pets.find(pet => pet.id === id);
    const petCard = cardTemplate(pet);
    petsContainer.childNodes[idx].replaceWith(petCard);
  });
};

window.onload = pets.forEach(pet => petsContainer.insertAdjacentElement('beforeend', cardTemplate(pet)));
nextBtn.addEventListener('click', () => {
  if (currentPage + 1 === 6) {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  } else {
    currentPage++;
    pageCounter.textContent = currentPage.toString();
    handleNextClick();
  }
});
