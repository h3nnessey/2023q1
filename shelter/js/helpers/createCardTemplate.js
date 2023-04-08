import { petModal } from '../pet-modal.js';

const createCardTemplate = obj => {
  const modal = document.querySelector('.pet-modal');
  const overlay = document.querySelector('.overlay');
  const div = document.createElement('div');

  const cardContent = `
    <div class="pet-card__image-wrapper">
      <img src="${obj.img}" alt="${obj.type}" class="pet-card__image" />
    </div>
    <h3 class="pet-card__title">${obj.name}</h3>
    <button class="pet-card__action">Learn more</button>
  `;

  const handleCardClick = () => {
    // рефактор
    modal.classList.add('active');
    overlay.classList.add('active');
    petModal(obj.id);
  };

  div.classList.add('pets-cards__item', 'pet-card');
  div.dataset.id = obj.id;
  div.insertAdjacentHTML('afterbegin', cardContent);

  div.addEventListener('click', handleCardClick);

  return div;
};

export { createCardTemplate };
