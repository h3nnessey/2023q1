import pets from '../../data/pets.json' assert { type: 'json' };
import { petModal } from '../pet-modal.js';

const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.pet-modal');

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
  div.addEventListener('click', () => {
    const pet = pets.find(pet => pet.id === obj.id);
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('modal-active');
    petModal(pet);
  });
  return div;
};

export { createCardTemplate };
